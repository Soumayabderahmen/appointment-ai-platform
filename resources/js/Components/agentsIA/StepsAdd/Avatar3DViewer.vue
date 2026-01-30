<template>
  <div>
    <!-- Tabs -->
    <div class="tabs">
      <button :class="{ active: activeTab === 'full' }" @click="activeTab = 'full'">Avatar complet</button>
      <button :class="{ active: activeTab === 'head' }" @click="activeTab = 'head'">Tête seulement</button>
    </div>

    <div class="viewer-wrapper">
      <div ref="threeContainer" class="three-viewer"></div>

      <button class="btn-play" :disabled="isLoading || !buffer" @click="playSpeech">
        🎤 Faire parler l'avatar
      </button>

      <div v-if="error" class="text-danger mt-2">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, watch } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const props = defineProps({
  glbUrl: { type: String, required: true },
  audioUrl: { type: String, required: true }
})

const activeTab = ref('full')
const threeContainer = ref(null)
let scene, camera, renderer, controls, mixer, model, clock
let mouthMesh = null
let source = null, analyser = null, dataArray = null
const audioContext = new (window.AudioContext || window.webkitAudioContext)()
const buffer = ref(null)
const error = ref(null)
const isLoading = ref(true)
let animationFrameId = null

// Mémorise la visibilité originale pour pouvoir la restaurer
const originalVisibility = new Map()

// Noms courants des meshes “tête” chez Ready Player Me
// (Tu peux ajuster la liste selon ton GLB)
const HEAD_WHITELIST = new Set([
  'Wolf3D_Head',
  'Wolf3D_Teeth',
  'Wolf3D_TeethLower',
  'Wolf3D_EyeLeft',
  'Wolf3D_EyeRight',
  'Wolf3D_Hair',
  'Wolf3D_Beard',
  'Wolf3D_Glasses',
  'Wolf3D_Tongue'
])

onMounted(async () => {
  initThree()
  await loadAudio()
})
function isHeadPart(node) {
  if (!(node.isMesh || node.isSkinnedMesh)) return false
  const n = (node.name || '').toLowerCase()
  const m = node.material
  const matName = (Array.isArray(m) ? m[0]?.name : m?.name || '').toLowerCase()

  // Noms RPM fréquents + fallback par regex + nom de matériau
  const nameMatch = /(head|eye|teeth|hair|beard|glasses|tongue)/i.test(node.name)
  const matMatch  = /(eye|iris|pupil)/i.test(matName)

  return nameMatch || matMatch
}

onUnmounted(() => {
  cancelAnimationFrame(animationFrameId)
  renderer?.dispose()
  controls?.dispose()
  if (source) source.stop()
  audioContext.close()
})

// Active/désactive l’affichage “tête seulement” sans zoom ni déplacement
watch(activeTab, (tab) => {
  if (!model) return
  setHeadOnlyMode(tab === 'head')
})

async function loadAudio() {
  try {
    isLoading.value = true
    const response = await fetch(props.audioUrl)
    const arrayBuffer = await response.arrayBuffer()
    buffer.value = await audioContext.decodeAudioData(arrayBuffer)
    error.value = null
  } catch (err) {
    console.error('Erreur audio :', err)
    error.value = '⚠️ Impossible de lire l’audio'
    buffer.value = null
  } finally {
    isLoading.value = false
  }
}

function initThree() {
  // Dimensions du conteneur
  const w = threeContainer.value.clientWidth
  const h = threeContainer.value.clientHeight
const ORIGINAL_FOV = 45
camera = new THREE.PerspectiveCamera(ORIGINAL_FOV, w / h, 0.1, 1000)
camera.userData.originalFov = ORIGINAL_FOV
  // Scene + camera
  scene = new THREE.Scene()
  scene.background = new THREE.Color(0xf5f5f5)

  camera = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
  camera.position.set(0, 1.6, 2) // distance fixe (pas de zoom)

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(w, h)
  // (optionnel) meilleure gestion des couleurs
  if (THREE?.SRGBColorSpace) renderer.outputColorSpace = THREE.SRGBColorSpace
  threeContainer.value.appendChild(renderer.domElement)

  // Lumières
  scene.add(new THREE.AmbientLight(0xffffff, 1.5))
  const dirLight = new THREE.DirectionalLight(0xffffff, 1)
  dirLight.position.set(0, 10, 10)
  scene.add(dirLight)

  // Contrôles
  controls = new OrbitControls(camera, renderer.domElement)
  controls.enableDamping = true
  controls.dampingFactor = 0.1
  // ⚠️ On NE fixe PAS controls.target ici : centerOnVisible() s’en charge

  // Chargement GLB
  const loader = new GLTFLoader()
  loader.load(
    props.glbUrl,
    (gltf) => {
      model = gltf.scene
      scene.add(model)

      // Sauvegarde de la visibilité initiale
      model.traverse((child) => {
        if (child.isMesh || child.isSkinnedMesh) {
          originalVisibility.set(child.uuid, child.visible)
        }
      })

      // Animations
      if (gltf.animations.length > 0) {
        mixer = new THREE.AnimationMixer(model)
        mixer.clipAction(gltf.animations[0]).play()
      }

      // Mesh tête pour morphTargets
      model.traverse((child) => {
        if ((child.isSkinnedMesh || child.isMesh) && child.name === 'Wolf3D_Head') {
          mouthMesh = child
          console.log('✅ Mesh tête :', child.name)
          console.log('🧠 Visèmes :', Object.keys(child.morphTargetDictionary || {}))
        }
      })

      // ⛔ On ne déplace pas le modèle (pas de model.position.sub(center))

      clock = new THREE.Clock()

      // Centrer la vue sur ce qui est visible (avatar complet par défaut)
      centerOnVisible()

      // Go render
      animate()
    },
    undefined,
    (err) => console.error('Erreur chargement GLB :', err)
  )

  // Resize
  window.addEventListener('resize', onResize)
}

function setHeadOnlyMode(enabled) {
  if (!model) return

  model.traverse((child) => {
    if (!(child.isMesh || child.isSkinnedMesh)) return
    if (enabled) {
      child.visible = isHeadPart(child) // tête + yeux + dents + cheveux…
    } else {
      const was = originalVisibility.get(child.uuid)
      child.visible = typeof was === 'boolean' ? was : true
    }
  })

  // Centre sur le contenu visible
  centerOnVisible()

  // Cadrage : portrait serré en "tête", FOV d'origine en "complet"
  if (enabled) {
    framePortraitFOV(1.25, { min: 22, max: 48 })  // ajuste si tu veux plus/moins serré
  } else {
    camera.fov = camera.userData.originalFov ?? 45
    camera.updateProjectionMatrix()
  }
}
// Ajuste le FOV pour cadrer serré la bbox visible (portrait), sans changer la distance caméra
function framePortraitFOV(padding = 1.25, clamp = { min: 20, max: 55 }) {
  if (!model) return

  // BBox des objets visibles
  const box = new THREE.Box3()
  const temp = new THREE.Box3()
  let hasAny = false
  model.traverse((child) => {
    if ((child.isMesh || child.isSkinnedMesh) && child.visible) {
      child.updateWorldMatrix(true, false)
      temp.setFromObject(child)
      if (!hasAny) { box.copy(temp); hasAny = true } else { box.union(temp) }
    }
  })
  if (!hasAny) return

  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())

  // garde la distance actuelle, on joue UNIQUEMENT sur le FOV
  const distance = camera.position.distanceTo(center)

  // cible un cadrage en hauteur (portrait)
  const targetHeight = size.y * padding
  // FOV nécessaire (en radians -> degrés)
  let fovRad = 2 * Math.atan((targetHeight / 2) / distance)
  let fovDeg = THREE.MathUtils.radToDeg(fovRad)

  // clamp pour éviter des valeurs extrêmes
  fovDeg = Math.min(Math.max(fovDeg, clamp.min), clamp.max)

  camera.fov = fovDeg
  camera.updateProjectionMatrix()
}

function centerOnVisible() {
  // calcule la bbox de tout ce qui est VISIBLE
  const box = new THREE.Box3()
  const tempBox = new THREE.Box3()
  let hasAny = false

  model.traverse((child) => {
    if ((child.isMesh || child.isSkinnedMesh) && child.visible) {
      child.updateWorldMatrix(true, false)
      tempBox.setFromObject(child)
      if (!hasAny) {
        box.copy(tempBox); hasAny = true
      } else {
        box.union(tempBox)
      }
    }
  })

  if (!hasAny) return

  const center = box.getCenter(new THREE.Vector3())
  // on ne “zoome” pas : on garde la position de la caméra
  controls.target.copy(center)
  camera.lookAt(center)
}


function playSpeech() {
  if (!buffer.value) {
    error.value = '⚠️ Aucun audio chargé'
    return
  }
  if (source) source.stop()

  source = audioContext.createBufferSource()
  source.buffer = buffer.value

  analyser = audioContext.createAnalyser()
  analyser.fftSize = 1024
  dataArray = new Uint8Array(analyser.frequencyBinCount)

  source.connect(analyser)
  analyser.connect(audioContext.destination)
  source.start()
}

let mouthSmooth = 0
function animate() {
  animationFrameId = requestAnimationFrame(animate)
  const delta = clock.getDelta()
  if (mixer) mixer.update(delta)

  // Synchronisation bouche ~ volume
  if (mouthMesh && analyser && dataArray) {
    analyser.getByteTimeDomainData(dataArray)
    let sum = 0
    for (let i = 0; i < dataArray.length; i++) {
      const v = (dataArray[i] - 128) / 128
      sum += v * v
    }
    const rawVolume = Math.sqrt(sum / dataArray.length)
    mouthSmooth += (rawVolume - mouthSmooth) * 0.2
    const amplified = Math.min(mouthSmooth * 25, 1)

    const dict = mouthMesh.morphTargetDictionary
    const influences = mouthMesh.morphTargetInfluences
    const mouthIndex = dict?.['mouthOpen']
    if (mouthIndex !== undefined) influences[mouthIndex] = amplified
  }

  controls.update()
  renderer.render(scene, camera)
}
function onResize() {
  if (!threeContainer.value || !renderer || !camera) return
  const w = threeContainer.value.clientWidth
  const h = threeContainer.value.clientHeight
  renderer.setSize(w, h)
  camera.aspect = w / h
  camera.updateProjectionMatrix()
  // Recentrer sur le contenu visible (tête seule ou avatar complet)
  centerOnVisible()
}


</script>

<style scoped>
.tabs { display: flex; gap: 10px; margin-bottom: 10px; }
.tabs button { padding: 8px 12px; border: 1px solid #ccc; background: white; cursor: pointer; }
.tabs button.active { background: #4c6fff; color: white; }
.viewer-wrapper { position: relative; width: 100%; height: 600px; }
.three-viewer { width: 100%; height: 100%; border-radius: 12px; background: #f5f5f5; overflow: hidden; }
.btn-play {
  position: absolute; bottom: 20px; left: 20px;
  padding: 10px 20px; font-weight: 600; background-color: #4c6fff;
  color: white; border: none; border-radius: 8px; cursor: pointer;
}
</style>
