import{_ as Vn,h as mo,a as W,o as G,b as f,f as Ie,F as _t,e as Et,t as he,G as dc,r as Mt,k as hc,Q as cu,D as fc,n as We,m as Yn,j as it,w as ct,v as It,g as _s,d as Vi,p as gn,i as lr,c as rn,y as Cr,q as Fa,T as Oa,H as uu,C as du,U as hu,M as xi,l as tt,V as fu,X as pu}from"./app-xZFo10Vc.js";const mu={name:"Step1Infos",props:{agent:{type:Object,required:!0},newTag:{type:String,default:""},categories:{type:Array,default:()=>[]}},emits:["update:agent","update:newTag","add-tag","remove-tag","add-sous-titre","add-responsibility"],data(){return{localCategories:[],localSubcategories:[],catError:"",subError:""}},mounted(){var s;this.localCategories=Array.isArray(this.categories)?this.categories:[],(s=this.agent)!=null&&s.category_id&&this.fetchSubcategories(this.agent.category_id)},watch:{categories(s){var e;this.localCategories=Array.isArray(s)?s:[],(e=this.agent)!=null&&e.category_id&&this.setSubcategoriesFromLocal(this.agent.category_id)},"agent.category_id"(s){s?this.fetchSubcategories(s):this.localSubcategories=[]}},methods:{onCategoryChange(s){const e=s?Number(s):null,t={...this.agent,category_id:e,subcategory_id:null};this.$emit("update:agent",t),this.fetchSubcategories(e)},onSubcategoryChange(s){const e=s?Number(s):null,t={...this.agent,subcategory_id:e};this.$emit("update:agent",t)},setSubcategoriesFromLocal(s){this.subError="";const e=Number(s),t=this.localCategories.find(i=>Number(i.id)===e);let n=[];return t&&(Array.isArray(t.subcategories)?n=t.subcategories:Array.isArray(t.souscategories)&&(n=t.souscategories)),this.localSubcategories=n.map(i=>({id:Number(i.id),name:i.name||i.titre||i.label||""})),this.localSubcategories.length>0},async fetchSubcategories(s){if(this.localSubcategories=[],!!s&&!this.setSubcategoriesFromLocal(s))try{const{data:e}=await mo.get(`/api/categories/${s}/subcategories`);this.localSubcategories=Array.isArray(e==null?void 0:e.data)?e.data:Array.isArray(e)?e:[]}catch{this.subError="Impossible de charger les sous-catégories.",this.localSubcategories=[]}},updateAgent(s,e){const t={...this.agent};t[s]=e,this.$emit("update:agent",t)},updateSousTitre(s,e,t){const n={...this.agent};n.sousTitres=[...n.sousTitres||[]],n.sousTitres[s]={...n.sousTitres[s],[e]:t},this.$emit("update:agent",n)},updateResponsabilite(s,e,t){var i;const n={...this.agent};n.sousTitres=[...n.sousTitres||[]],n.sousTitres[s]={...n.sousTitres[s],responsabilites:[...((i=n.sousTitres[s])==null?void 0:i.responsabilites)||[]]},n.sousTitres[s].responsabilites[e]=t,this.$emit("update:agent",n)}}},gu={class:"row"},_u={class:"col-12 mb-4"},vu=["value"],xu={class:"col-12 mb-4"},yu=["value"],bu=["value"],Su={key:0,class:"form-text text-danger mt-1"},Mu={key:0,class:"col-12 mb-4"},Tu=["value"],Eu=["value"],Au={key:0,class:"form-text text-danger mt-1"},wu={class:"col-lg-6 col-md-6 col-12 mb-4"},Cu={class:"d-flex flex-wrap"},Ru={class:"form-check me-3"},Pu=["checked"],Iu={class:"form-check"},Lu=["checked"],Du={class:"col-12 mb-4"},Uu={class:"input-group mb-4"},Nu=["value"],Fu={class:"tags"},Ou={class:"me-2"},ku=["onClick"],Bu={class:"col-12 mb-4"},Vu=["value"],zu={class:"col-12 mb-4"},Hu={class:"card card-1"},Gu={class:"form-control"},Wu={class:"col-12 mb-4"},Xu=["value","onInput"],qu=["value","onInput"],ju=["onClick"];function Yu(s,e,t,n,i,r){return G(),W("div",gu,[e[23]||(e[23]=f("div",{class:"col-12 mb-4"},[f("h4",null,"Paramétrez les Informations de votre agent IA"),f("p",{class:"text-orange fw-bold"},"*Représente un champ obligatoire")],-1)),f("div",_u,[e[10]||(e[10]=f("label",{class:"form-label"},"Nom de l'agent IA*",-1)),f("input",{type:"text",class:"form-control",value:t.agent.nom,onInput:e[0]||(e[0]=o=>r.updateAgent("nom",o.target.value)),placeholder:"Entrez un nom",required:""},null,40,vu)]),f("div",xu,[e[12]||(e[12]=f("label",{class:"form-label"},"Domaine d'expertise*",-1)),f("select",{class:"form-select",value:t.agent.category_id||"",onChange:e[1]||(e[1]=o=>r.onCategoryChange(o.target.value)),required:""},[e[11]||(e[11]=f("option",{value:"",disabled:""},"Sélectionnez un Domaine d'expertise",-1)),(G(!0),W(_t,null,Et(i.localCategories,o=>(G(),W("option",{key:o.id,value:o.id},he(o.name),9,bu))),128))],40,yu),i.catError?(G(),W("div",Su,he(i.catError),1)):Ie("",!0)]),i.localSubcategories.length?(G(),W("div",Mu,[e[14]||(e[14]=f("label",{class:"form-label"},"Sous Domaine d'expertise*",-1)),f("select",{class:"form-select",value:t.agent.subcategory_id||"",onChange:e[2]||(e[2]=o=>r.onSubcategoryChange(o.target.value)),required:""},[e[13]||(e[13]=f("option",{value:"",disabled:""},"Sélectionnez une Sous Domaine",-1)),(G(!0),W(_t,null,Et(i.localSubcategories,o=>(G(),W("option",{key:o.id,value:o.id},he(o.name),9,Eu))),128))],40,Tu),i.subError?(G(),W("div",Au,he(i.subError),1)):Ie("",!0)])):Ie("",!0),f("div",wu,[e[17]||(e[17]=f("label",{class:"form-label"},"Type d'agent*",-1)),f("div",Cu,[f("div",Ru,[f("input",{type:"radio",id:"public",name:"type",class:"form-check-input",checked:t.agent.type==="public",onChange:e[3]||(e[3]=o=>r.updateAgent("type","public")),required:""},null,40,Pu),e[15]||(e[15]=f("label",{for:"public",class:"form-label"},"Agent IA public",-1))]),f("div",Iu,[f("input",{type:"radio",id:"private",name:"type",class:"form-check-input",checked:t.agent.type==="privé"||t.agent.type==="private",onChange:e[4]||(e[4]=o=>r.updateAgent("type","privé")),required:""},null,40,Lu),e[16]||(e[16]=f("label",{for:"private",class:"form-label"},"Agent IA privé",-1))])])]),f("div",Du,[e[19]||(e[19]=f("label",{class:"form-label"},"Ajouter des tags",-1)),f("div",Uu,[f("input",{type:"text",class:"form-control",value:t.newTag,onInput:e[5]||(e[5]=o=>s.$emit("update:newTag",o.target.value)),onKeyup:e[6]||(e[6]=dc(o=>s.$emit("add-tag"),["enter"])),placeholder:"Entrer un tag"},null,40,Nu),f("button",{class:"btn btn-primary rounded-15",onClick:e[7]||(e[7]=o=>s.$emit("add-tag"))},"Ajouter")]),f("div",Fu,[(G(!0),W(_t,null,Et(t.agent.tags,(o,a)=>(G(),W("button",{key:a,class:"tagBtn btn"},[f("span",Ou,"#"+he(o),1),f("button",{class:"btn btnTrash p-0",onClick:l=>s.$emit("remove-tag",a)},e[18]||(e[18]=[f("i",{class:"ti ti-circle-x text-danger"},null,-1)]),8,ku)]))),128))])]),f("div",Bu,[e[20]||(e[20]=f("label",{class:"form-label"},"Description de l'agent IA",-1)),f("textarea",{class:"form-control",value:t.agent.description,onInput:e[8]||(e[8]=o=>r.updateAgent("description",o.target.value)),rows:"4",placeholder:"Décrire votre agent..."},null,40,Vu)]),f("div",zu,[f("div",Hu,[f("div",Gu,[(G(!0),W(_t,null,Et(t.agent.sousTitres,(o,a)=>(G(),W("div",{key:a},[f("div",Wu,[e[21]||(e[21]=f("label",{class:"form-label"},"Sous Titre*",-1)),f("input",{class:"form-control",value:o.titre,onInput:l=>r.updateSousTitre(a,"titre",l.target.value),placeholder:"Sous-titre ex: Génération de leads"},null,40,Xu)]),(G(!0),W(_t,null,Et(o.responsabilites,(l,c)=>(G(),W("div",{key:c,class:"col-12 mb-4"},[e[22]||(e[22]=f("label",{class:"form-label"},"Responsabilité*",-1)),f("input",{class:"form-control",value:o.responsabilites[c],onInput:u=>r.updateResponsabilite(a,c,u.target.value),placeholder:"Responsabilité liée"},null,40,qu)]))),128)),f("button",{type:"button",class:"btn btn-primary rounded-15 me-2",onClick:l=>s.$emit("add-responsibility",a)}," + Ajouter une responsabilité ",8,ju)]))),128)),f("button",{type:"button",class:"btn btn-primary rounded-15 ms-2",onClick:e[9]||(e[9]=o=>s.$emit("add-sous-titre"))}," + Ajouter un sous-titre ")])])])])}const Ku=Vn(mu,[["render",Yu]]),Zu={name:"Step2Personnalite",props:{personnalite:{type:Object,required:!0},tonalites:{type:Object,required:!0},generatedPrompt:{type:String,default:""},agent:{type:Object,required:!0},showUseButton:{type:Boolean,default:!1}},emits:["update:personnalite","update:tonalites","update:generatedPrompt","update-sliders","improve-prompt","use-generated-prompt","copy-prompt"],methods:{updatePersonnalite(s,e){const t={...this.personnalite};t[s]=e,this.$emit("update:personnalite",t)},updateTonalite(s,e){const t={...this.tonalites};t[s]={...t[s],value:parseFloat(e)},this.$emit("update:tonalites",t),this.$emit("update-sliders")},formatPercentage(s){return s=parseFloat(s),isNaN(s)?"0.00":s.toFixed(2)}}},Ju={class:"row"},$u={class:"col-12 mb-4"},Qu=["value"],ed={class:"col-12 mb-4"},td=["value"],nd={class:"col-12 mb-4"},id={class:"row g-3 bg-white p-4 rounded"},sd={class:"personality-slider p-3 rounded bg-light shadow-sm"},rd=["for"],od=["id","value","onInput"],ad={class:"text-end small text-muted"},ld={class:"col-12 mb-4"},cd={class:"d-flex flex-column"},ud={class:"form-check mb-3 border p-3 rounded"},dd=["checked"],hd={class:"form-check mb-3 border p-3 rounded"},fd=["checked"],pd={class:"form-check mb-3 border p-3 rounded"},md=["checked"],gd={class:"col-12 mb-4"},_d=["value"],vd={class:"col-12 mb-4"},xd=["value"],yd={key:0,class:"mt-2 d-flex gap-2"},bd={class:"col-12 mb-4"};function Sd(s,e,t,n,i,r){return G(),W("div",Ju,[e[19]||(e[19]=f("div",{class:"col-12 mb-4"},[f("h4",null,"Paramétrez la Personnalité et Comportement de l'agent IA"),f("p",{class:"text-orange fw-bold"},"*Représente un champ obligatoire")],-1)),f("div",$u,[e[10]||(e[10]=f("label",{class:"form-label"},"Rôle de l'agent IA*",-1)),f("input",{type:"text",class:"form-control",value:t.personnalite.role,onInput:e[0]||(e[0]=o=>r.updatePersonnalite("role",o.target.value)),placeholder:"Rôle de l'agent IA",required:""},null,40,Qu)]),f("div",ed,[e[11]||(e[11]=f("label",{class:"form-label"},"Mission principale*",-1)),f("textarea",{class:"form-control",rows:"4",value:t.personnalite.mission,onInput:e[1]||(e[1]=o=>r.updatePersonnalite("mission",o.target.value)),placeholder:"Décrire la mission de l'agent IA",required:""},null,40,td)]),f("div",nd,[e[12]||(e[12]=f("label",{class:"form-label fw-bold mb-3"},"Tonalité & Personnalité (PCM)*",-1)),f("div",id,[(G(!0),W(_t,null,Et(t.tonalites,(o,a)=>(G(),W("div",{class:"col-md-4",key:o.id},[f("div",sd,[f("label",{for:a,class:"form-label"},he(a),9,rd),f("p",null,he(a)+": "+he(o.value)+"%",1),f("input",{type:"range",class:"form-range custom-slider",id:a,min:"0",max:"16.67",step:"0.01",value:t.tonalites[a].value,onInput:l=>r.updateTonalite(a,l.target.value)},null,40,od),f("div",ad,he(r.formatPercentage(o.value))+"%",1)])]))),128))])]),f("div",ld,[e[16]||(e[16]=f("label",{class:"form-label"},"Style de réponse attendu*",-1)),f("div",cd,[f("div",ud,[f("input",{type:"radio",id:"synthetique",name:"style_reponse",class:"form-check-input",checked:t.personnalite.style_reponse==="Synthetique",onChange:e[2]||(e[2]=o=>r.updatePersonnalite("style_reponse","Synthetique")),required:""},null,40,dd),e[13]||(e[13]=f("label",{for:"synthetique",class:"form-check-label ms-2"},"Synthétique",-1))]),f("div",hd,[f("input",{type:"radio",id:"detailee",name:"style_reponse",class:"form-check-input",checked:t.personnalite.style_reponse==="Detailee",onChange:e[3]||(e[3]=o=>r.updatePersonnalite("style_reponse","Detailee")),required:""},null,40,fd),e[14]||(e[14]=f("label",{for:"detailee",class:"form-check-label ms-2"},"Détailée",-1))]),f("div",pd,[f("input",{type:"radio",id:"schematique",name:"style_reponse",class:"form-check-input",checked:t.personnalite.style_reponse==="Schematique",onChange:e[4]||(e[4]=o=>r.updatePersonnalite("style_reponse","Schematique")),required:""},null,40,md),e[15]||(e[15]=f("label",{for:"schematique",class:"form-check-label ms-2"},"Schématique",-1))])])]),f("div",gd,[e[17]||(e[17]=f("label",{class:"form-label"},"Contraintes spécifiques",-1)),f("textarea",{class:"form-control",value:t.personnalite.contraintes_specifiques,onInput:e[5]||(e[5]=o=>r.updatePersonnalite("contraintes_specifiques",o.target.value)),rows:"4",placeholder:"Ajouter des contraintes spécifiques"},null,40,_d)]),f("div",vd,[e[18]||(e[18]=f("label",{class:"form-label fw-bold"},"Prompt système",-1)),f("textarea",{class:"form-control",rows:"12",value:t.generatedPrompt,onInput:e[6]||(e[6]=o=>s.$emit("update:generatedPrompt",o.target.value)),placeholder:"Le prompt système sera généré ici"},null,40,xd),t.showUseButton?(G(),W("div",yd,[f("button",{class:"btn btn-success",onClick:e[7]||(e[7]=o=>s.$emit("use-generated-prompt"))}," ✅ Utiliser ce prompt "),f("button",{class:"btn btn-outline-secondary",onClick:e[8]||(e[8]=o=>s.$emit("copy-prompt"))}," 📋 Copier le prompt ")])):Ie("",!0)]),f("div",bd,[f("button",{class:"btn btn-primary",onClick:e[9]||(e[9]=o=>s.$emit("improve-prompt"))}," 🤖 Générer Prompt Système avec IA ")])])}const Md=Vn(Zu,[["render",Sd]]);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */const aa="179",zi={ROTATE:0,DOLLY:1,PAN:2},Fi={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Td=0,ka=1,Ed=2,pc=1,Ad=2,Dn=3,Bn=0,Xt=1,vn=2,$n=0,Hi=1,Ba=2,Va=3,za=4,wd=5,hi=100,Cd=101,Rd=102,Pd=103,Id=104,Ld=200,Dd=201,Ud=202,Nd=203,go=204,_o=205,Fd=206,Od=207,kd=208,Bd=209,Vd=210,zd=211,Hd=212,Gd=213,Wd=214,vo=0,xo=1,yo=2,qi=3,bo=4,So=5,Mo=6,To=7,mc=0,Xd=1,qd=2,Qn=0,jd=1,Yd=2,Kd=3,Zd=4,Jd=5,$d=6,Qd=7,Ha="attached",eh="detached",gc=300,ji=301,Yi=302,Eo=303,Ao=304,Sr=306,Ki=1e3,Jn=1001,gr=1002,Vt=1003,_c=1004,ms=1005,Zt=1006,cr=1007,Nn=1008,bn=1009,vc=1010,xc=1011,bs=1012,la=1013,gi=1014,hn=1015,Cs=1016,ca=1017,ua=1018,Ss=1020,yc=35902,bc=1021,Sc=1022,on=1023,Ms=1026,Ts=1027,da=1028,ha=1029,Mc=1030,fa=1031,pa=1033,ur=33776,dr=33777,hr=33778,fr=33779,wo=35840,Co=35841,Ro=35842,Po=35843,Io=36196,Lo=37492,Do=37496,Uo=37808,No=37809,Fo=37810,Oo=37811,ko=37812,Bo=37813,Vo=37814,zo=37815,Ho=37816,Go=37817,Wo=37818,Xo=37819,qo=37820,jo=37821,pr=36492,Yo=36494,Ko=36495,Tc=36283,Zo=36284,Jo=36285,$o=36286,th=2200,nh=2201,ih=2202,Es=2300,As=2301,Rr=2302,Oi=2400,ki=2401,_r=2402,ma=2500,sh=2501,rh=0,Ec=1,Qo=2,oh=3200,ah=3201,Ac=0,lh=1,Zn="",Lt="srgb",Ht="srgb-linear",vr="linear",ht="srgb",yi=7680,Ga=519,ch=512,uh=513,dh=514,wc=515,hh=516,fh=517,ph=518,mh=519,ea=35044,Wa="300 es",xn=2e3,xr=2001;class ti{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});const n=this._listeners;n[e]===void 0&&(n[e]=[]),n[e].indexOf(t)===-1&&n[e].push(t)}hasEventListener(e,t){const n=this._listeners;return n===void 0?!1:n[e]!==void 0&&n[e].indexOf(t)!==-1}removeEventListener(e,t){const n=this._listeners;if(n===void 0)return;const i=n[e];if(i!==void 0){const r=i.indexOf(t);r!==-1&&i.splice(r,1)}}dispatchEvent(e){const t=this._listeners;if(t===void 0)return;const n=t[e.type];if(n!==void 0){e.target=this;const i=n.slice(0);for(let r=0,o=i.length;r<o;r++)i[r].call(this,e);e.target=null}}}const Ut=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"];let Xa=1234567;const vs=Math.PI/180,Zi=180/Math.PI;function fn(){const s=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,n=Math.random()*4294967295|0;return(Ut[s&255]+Ut[s>>8&255]+Ut[s>>16&255]+Ut[s>>24&255]+"-"+Ut[e&255]+Ut[e>>8&255]+"-"+Ut[e>>16&15|64]+Ut[e>>24&255]+"-"+Ut[t&63|128]+Ut[t>>8&255]+"-"+Ut[t>>16&255]+Ut[t>>24&255]+Ut[n&255]+Ut[n>>8&255]+Ut[n>>16&255]+Ut[n>>24&255]).toLowerCase()}function Ke(s,e,t){return Math.max(e,Math.min(t,s))}function ga(s,e){return(s%e+e)%e}function gh(s,e,t,n,i){return n+(s-e)*(i-n)/(t-e)}function _h(s,e,t){return s!==e?(t-s)/(e-s):0}function xs(s,e,t){return(1-t)*s+t*e}function vh(s,e,t,n){return xs(s,e,1-Math.exp(-t*n))}function xh(s,e=1){return e-Math.abs(ga(s,e*2)-e)}function yh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*(3-2*s))}function bh(s,e,t){return s<=e?0:s>=t?1:(s=(s-e)/(t-e),s*s*s*(s*(s*6-15)+10))}function Sh(s,e){return s+Math.floor(Math.random()*(e-s+1))}function Mh(s,e){return s+Math.random()*(e-s)}function Th(s){return s*(.5-Math.random())}function Eh(s){s!==void 0&&(Xa=s);let e=Xa+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Ah(s){return s*vs}function wh(s){return s*Zi}function Ch(s){return(s&s-1)===0&&s!==0}function Rh(s){return Math.pow(2,Math.ceil(Math.log(s)/Math.LN2))}function Ph(s){return Math.pow(2,Math.floor(Math.log(s)/Math.LN2))}function Ih(s,e,t,n,i){const r=Math.cos,o=Math.sin,a=r(t/2),l=o(t/2),c=r((e+n)/2),u=o((e+n)/2),d=r((e-n)/2),h=o((e-n)/2),m=r((n-e)/2),_=o((n-e)/2);switch(i){case"XYX":s.set(a*u,l*d,l*h,a*c);break;case"YZY":s.set(l*h,a*u,l*d,a*c);break;case"ZXZ":s.set(l*d,l*h,a*u,a*c);break;case"XZX":s.set(a*u,l*_,l*m,a*c);break;case"YXY":s.set(l*m,a*u,l*_,a*c);break;case"ZYZ":s.set(l*_,l*m,a*u,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+i)}}function un(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return s/4294967295;case Uint16Array:return s/65535;case Uint8Array:return s/255;case Int32Array:return Math.max(s/2147483647,-1);case Int16Array:return Math.max(s/32767,-1);case Int8Array:return Math.max(s/127,-1);default:throw new Error("Invalid component type.")}}function ut(s,e){switch(e.constructor){case Float32Array:return s;case Uint32Array:return Math.round(s*4294967295);case Uint16Array:return Math.round(s*65535);case Uint8Array:return Math.round(s*255);case Int32Array:return Math.round(s*2147483647);case Int16Array:return Math.round(s*32767);case Int8Array:return Math.round(s*127);default:throw new Error("Invalid component type.")}}const _a={DEG2RAD:vs,RAD2DEG:Zi,generateUUID:fn,clamp:Ke,euclideanModulo:ga,mapLinear:gh,inverseLerp:_h,lerp:xs,damp:vh,pingpong:xh,smoothstep:yh,smootherstep:bh,randInt:Sh,randFloat:Mh,randFloatSpread:Th,seededRandom:Eh,degToRad:Ah,radToDeg:wh,isPowerOfTwo:Ch,ceilPowerOfTwo:Rh,floorPowerOfTwo:Ph,setQuaternionFromProperEuler:Ih,normalize:ut,denormalize:un};class Be{constructor(e=0,t=0){Be.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){const t=this.x,n=this.y,i=e.elements;return this.x=i[0]*t+i[3]*n+i[6],this.y=i[1]*t+i[4]*n+i[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y;return t*t+n*n}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){const n=Math.cos(t),i=Math.sin(t),r=this.x-e.x,o=this.y-e.y;return this.x=r*n-o*i+e.x,this.y=r*i+o*n+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}}class Qt{constructor(e=0,t=0,n=0,i=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=n,this._w=i}static slerpFlat(e,t,n,i,r,o,a){let l=n[i+0],c=n[i+1],u=n[i+2],d=n[i+3];const h=r[o+0],m=r[o+1],_=r[o+2],v=r[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d;return}if(a===1){e[t+0]=h,e[t+1]=m,e[t+2]=_,e[t+3]=v;return}if(d!==v||l!==h||c!==m||u!==_){let g=1-a;const p=l*h+c*m+u*_+d*v,A=p>=0?1:-1,E=1-p*p;if(E>Number.EPSILON){const R=Math.sqrt(E),P=Math.atan2(R,p*A);g=Math.sin(g*P)/R,a=Math.sin(a*P)/R}const b=a*A;if(l=l*g+h*b,c=c*g+m*b,u=u*g+_*b,d=d*g+v*b,g===1-a){const R=1/Math.sqrt(l*l+c*c+u*u+d*d);l*=R,c*=R,u*=R,d*=R}}e[t]=l,e[t+1]=c,e[t+2]=u,e[t+3]=d}static multiplyQuaternionsFlat(e,t,n,i,r,o){const a=n[i],l=n[i+1],c=n[i+2],u=n[i+3],d=r[o],h=r[o+1],m=r[o+2],_=r[o+3];return e[t]=a*_+u*d+l*m-c*h,e[t+1]=l*_+u*h+c*d-a*m,e[t+2]=c*_+u*m+a*h-l*d,e[t+3]=u*_-a*d-l*h-c*m,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,n,i){return this._x=e,this._y=t,this._z=n,this._w=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){const n=e._x,i=e._y,r=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(n/2),u=a(i/2),d=a(r/2),h=l(n/2),m=l(i/2),_=l(r/2);switch(o){case"XYZ":this._x=h*u*d+c*m*_,this._y=c*m*d-h*u*_,this._z=c*u*_+h*m*d,this._w=c*u*d-h*m*_;break;case"YXZ":this._x=h*u*d+c*m*_,this._y=c*m*d-h*u*_,this._z=c*u*_-h*m*d,this._w=c*u*d+h*m*_;break;case"ZXY":this._x=h*u*d-c*m*_,this._y=c*m*d+h*u*_,this._z=c*u*_+h*m*d,this._w=c*u*d-h*m*_;break;case"ZYX":this._x=h*u*d-c*m*_,this._y=c*m*d+h*u*_,this._z=c*u*_-h*m*d,this._w=c*u*d+h*m*_;break;case"YZX":this._x=h*u*d+c*m*_,this._y=c*m*d+h*u*_,this._z=c*u*_-h*m*d,this._w=c*u*d-h*m*_;break;case"XZY":this._x=h*u*d-c*m*_,this._y=c*m*d-h*u*_,this._z=c*u*_+h*m*d,this._w=c*u*d+h*m*_;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){const n=t/2,i=Math.sin(n);return this._x=e.x*i,this._y=e.y*i,this._z=e.z*i,this._w=Math.cos(n),this._onChangeCallback(),this}setFromRotationMatrix(e){const t=e.elements,n=t[0],i=t[4],r=t[8],o=t[1],a=t[5],l=t[9],c=t[2],u=t[6],d=t[10],h=n+a+d;if(h>0){const m=.5/Math.sqrt(h+1);this._w=.25/m,this._x=(u-l)*m,this._y=(r-c)*m,this._z=(o-i)*m}else if(n>a&&n>d){const m=2*Math.sqrt(1+n-a-d);this._w=(u-l)/m,this._x=.25*m,this._y=(i+o)/m,this._z=(r+c)/m}else if(a>d){const m=2*Math.sqrt(1+a-n-d);this._w=(r-c)/m,this._x=(i+o)/m,this._y=.25*m,this._z=(l+u)/m}else{const m=2*Math.sqrt(1+d-n-a);this._w=(o-i)/m,this._x=(r+c)/m,this._y=(l+u)/m,this._z=.25*m}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let n=e.dot(t)+1;return n<1e-8?(n=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=n):(this._x=0,this._y=-e.z,this._z=e.y,this._w=n)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=n),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(Ke(this.dot(e),-1,1)))}rotateTowards(e,t){const n=this.angleTo(e);if(n===0)return this;const i=Math.min(1,t/n);return this.slerp(e,i),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){const n=e._x,i=e._y,r=e._z,o=e._w,a=t._x,l=t._y,c=t._z,u=t._w;return this._x=n*u+o*a+i*c-r*l,this._y=i*u+o*l+r*a-n*c,this._z=r*u+o*c+n*l-i*a,this._w=o*u-n*a-i*l-r*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);const n=this._x,i=this._y,r=this._z,o=this._w;let a=o*e._w+n*e._x+i*e._y+r*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=n,this._y=i,this._z=r,this;const l=1-a*a;if(l<=Number.EPSILON){const m=1-t;return this._w=m*o+t*this._w,this._x=m*n+t*this._x,this._y=m*i+t*this._y,this._z=m*r+t*this._z,this.normalize(),this}const c=Math.sqrt(l),u=Math.atan2(c,a),d=Math.sin((1-t)*u)/c,h=Math.sin(t*u)/c;return this._w=o*d+this._w*h,this._x=n*d+this._x*h,this._y=i*d+this._y*h,this._z=r*d+this._z*h,this._onChangeCallback(),this}slerpQuaternions(e,t,n){return this.copy(e).slerp(t,n)}random(){const e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),n=Math.random(),i=Math.sqrt(1-n),r=Math.sqrt(n);return this.set(i*Math.sin(e),i*Math.cos(e),r*Math.sin(t),r*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}}class D{constructor(e=0,t=0,n=0){D.prototype.isVector3=!0,this.x=e,this.y=t,this.z=n}set(e,t,n){return n===void 0&&(n=this.z),this.x=e,this.y=t,this.z=n,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(qa.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(qa.setFromAxisAngle(e,t))}applyMatrix3(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[3]*n+r[6]*i,this.y=r[1]*t+r[4]*n+r[7]*i,this.z=r[2]*t+r[5]*n+r[8]*i,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=e.elements,o=1/(r[3]*t+r[7]*n+r[11]*i+r[15]);return this.x=(r[0]*t+r[4]*n+r[8]*i+r[12])*o,this.y=(r[1]*t+r[5]*n+r[9]*i+r[13])*o,this.z=(r[2]*t+r[6]*n+r[10]*i+r[14])*o,this}applyQuaternion(e){const t=this.x,n=this.y,i=this.z,r=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*i-a*n),u=2*(a*t-r*i),d=2*(r*n-o*t);return this.x=t+l*c+o*d-a*u,this.y=n+l*u+a*c-r*d,this.z=i+l*d+r*u-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){const t=this.x,n=this.y,i=this.z,r=e.elements;return this.x=r[0]*t+r[4]*n+r[8]*i,this.y=r[1]*t+r[5]*n+r[9]*i,this.z=r[2]*t+r[6]*n+r[10]*i,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){const n=e.x,i=e.y,r=e.z,o=t.x,a=t.y,l=t.z;return this.x=i*l-r*a,this.y=r*o-n*l,this.z=n*a-i*o,this}projectOnVector(e){const t=e.lengthSq();if(t===0)return this.set(0,0,0);const n=e.dot(this)/t;return this.copy(e).multiplyScalar(n)}projectOnPlane(e){return Pr.copy(this).projectOnVector(e),this.sub(Pr)}reflect(e){return this.sub(Pr.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){const t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;const n=this.dot(e)/t;return Math.acos(Ke(n,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){const t=this.x-e.x,n=this.y-e.y,i=this.z-e.z;return t*t+n*n+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,n){const i=Math.sin(t)*e;return this.x=i*Math.sin(n),this.y=Math.cos(t)*e,this.z=i*Math.cos(n),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,n){return this.x=e*Math.sin(t),this.y=n,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){const t=this.setFromMatrixColumn(e,0).length(),n=this.setFromMatrixColumn(e,1).length(),i=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=n,this.z=i,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){const e=Math.random()*Math.PI*2,t=Math.random()*2-1,n=Math.sqrt(1-t*t);return this.x=n*Math.cos(e),this.y=t,this.z=n*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}}const Pr=new D,qa=new Qt;class qe{constructor(e,t,n,i,r,o,a,l,c){qe.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c)}set(e,t,n,i,r,o,a,l,c){const u=this.elements;return u[0]=e,u[1]=i,u[2]=a,u[3]=t,u[4]=r,u[5]=l,u[6]=n,u[7]=o,u[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],this}extractBasis(e,t,n){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),n.setFromMatrix3Column(this,2),this}setFromMatrix4(e){const t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[3],l=n[6],c=n[1],u=n[4],d=n[7],h=n[2],m=n[5],_=n[8],v=i[0],g=i[3],p=i[6],A=i[1],E=i[4],b=i[7],R=i[2],P=i[5],I=i[8];return r[0]=o*v+a*A+l*R,r[3]=o*g+a*E+l*P,r[6]=o*p+a*b+l*I,r[1]=c*v+u*A+d*R,r[4]=c*g+u*E+d*P,r[7]=c*p+u*b+d*I,r[2]=h*v+m*A+_*R,r[5]=h*g+m*E+_*P,r[8]=h*p+m*b+_*I,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8];return t*o*u-t*a*c-n*r*u+n*a*l+i*r*c-i*o*l}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=u*o-a*c,h=a*l-u*r,m=c*r-o*l,_=t*d+n*h+i*m;if(_===0)return this.set(0,0,0,0,0,0,0,0,0);const v=1/_;return e[0]=d*v,e[1]=(i*c-u*n)*v,e[2]=(a*n-i*o)*v,e[3]=h*v,e[4]=(u*t-i*l)*v,e[5]=(i*r-a*t)*v,e[6]=m*v,e[7]=(n*l-c*t)*v,e[8]=(o*t-n*r)*v,this}transpose(){let e;const t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){const t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,n,i,r,o,a){const l=Math.cos(r),c=Math.sin(r);return this.set(n*l,n*c,-n*(l*o+c*a)+o+e,-i*c,i*l,-i*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Ir.makeScale(e,t)),this}rotate(e){return this.premultiply(Ir.makeRotation(-e)),this}translate(e,t){return this.premultiply(Ir.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,n,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<9;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<9;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e}clone(){return new this.constructor().fromArray(this.elements)}}const Ir=new qe;function Cc(s){for(let e=s.length-1;e>=0;--e)if(s[e]>=65535)return!0;return!1}function ws(s){return document.createElementNS("http://www.w3.org/1999/xhtml",s)}function Lh(){const s=ws("canvas");return s.style.display="block",s}const ja={};function Gi(s){s in ja||(ja[s]=!0,console.warn(s))}function Dh(s,e,t){return new Promise(function(n,i){function r(){switch(s.clientWaitSync(e,s.SYNC_FLUSH_COMMANDS_BIT,0)){case s.WAIT_FAILED:i();break;case s.TIMEOUT_EXPIRED:setTimeout(r,t);break;default:n()}}setTimeout(r,t)})}const Ya=new qe().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),Ka=new qe().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Uh(){const s={enabled:!0,workingColorSpace:Ht,spaces:{},convert:function(i,r,o){return this.enabled===!1||r===o||!r||!o||(this.spaces[r].transfer===ht&&(i.r=On(i.r),i.g=On(i.g),i.b=On(i.b)),this.spaces[r].primaries!==this.spaces[o].primaries&&(i.applyMatrix3(this.spaces[r].toXYZ),i.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(i.r=Wi(i.r),i.g=Wi(i.g),i.b=Wi(i.b))),i},workingToColorSpace:function(i,r){return this.convert(i,this.workingColorSpace,r)},colorSpaceToWorking:function(i,r){return this.convert(i,r,this.workingColorSpace)},getPrimaries:function(i){return this.spaces[i].primaries},getTransfer:function(i){return i===Zn?vr:this.spaces[i].transfer},getLuminanceCoefficients:function(i,r=this.workingColorSpace){return i.fromArray(this.spaces[r].luminanceCoefficients)},define:function(i){Object.assign(this.spaces,i)},_getMatrix:function(i,r,o){return i.copy(this.spaces[r].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(i){return this.spaces[i].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(i=this.workingColorSpace){return this.spaces[i].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(i,r){return Gi("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),s.workingToColorSpace(i,r)},toWorkingColorSpace:function(i,r){return Gi("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),s.colorSpaceToWorking(i,r)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],n=[.3127,.329];return s.define({[Ht]:{primaries:e,whitePoint:n,transfer:vr,toXYZ:Ya,fromXYZ:Ka,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:Lt},outputColorSpaceConfig:{drawingBufferColorSpace:Lt}},[Lt]:{primaries:e,whitePoint:n,transfer:ht,toXYZ:Ya,fromXYZ:Ka,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:Lt}}}),s}const Qe=Uh();function On(s){return s<.04045?s*.0773993808:Math.pow(s*.9478672986+.0521327014,2.4)}function Wi(s){return s<.0031308?s*12.92:1.055*Math.pow(s,.41666)-.055}let bi;class Nh{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let n;if(e instanceof HTMLCanvasElement)n=e;else{bi===void 0&&(bi=ws("canvas")),bi.width=e.width,bi.height=e.height;const i=bi.getContext("2d");e instanceof ImageData?i.putImageData(e,0,0):i.drawImage(e,0,0,e.width,e.height),n=bi}return n.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){const t=ws("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,e.width,e.height);const i=n.getImageData(0,0,e.width,e.height),r=i.data;for(let o=0;o<r.length;o++)r[o]=On(r[o]/255)*255;return n.putImageData(i,0,0),t}else if(e.data){const t=e.data.slice(0);for(let n=0;n<t.length;n++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[n]=Math.floor(On(t[n]/255)*255):t[n]=On(t[n]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}}let Fh=0;class va{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Fh++}),this.uuid=fn(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){const t=this.data;return t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];const n={uuid:this.uuid,url:""},i=this.data;if(i!==null){let r;if(Array.isArray(i)){r=[];for(let o=0,a=i.length;o<a;o++)i[o].isDataTexture?r.push(Lr(i[o].image)):r.push(Lr(i[o]))}else r=Lr(i);n.url=r}return t||(e.images[this.uuid]=n),n}}function Lr(s){return typeof HTMLImageElement<"u"&&s instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&s instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&s instanceof ImageBitmap?Nh.getDataURL(s):s.data?{data:Array.from(s.data),width:s.width,height:s.height,type:s.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}let Oh=0;const Dr=new D;class Dt extends ti{constructor(e=Dt.DEFAULT_IMAGE,t=Dt.DEFAULT_MAPPING,n=Jn,i=Jn,r=Zt,o=Nn,a=on,l=bn,c=Dt.DEFAULT_ANISOTROPY,u=Zn){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Oh++}),this.uuid=fn(),this.name="",this.source=new va(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=n,this.wrapT=i,this.magFilter=r,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new Be(0,0),this.repeat=new Be(1,1),this.center=new Be(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new qe,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=u,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(Dr).x}get height(){return this.source.getSize(Dr).y}get depth(){return this.source.getSize(Dr).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}i&&n&&i.isVector2&&n.isVector2||i&&n&&i.isVector3&&n.isVector3||i&&n&&i.isMatrix3&&n.isMatrix3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];const n={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(n.userData=this.userData),t||(e.textures[this.uuid]=n),n}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==gc)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Ki:e.x=e.x-Math.floor(e.x);break;case Jn:e.x=e.x<0?0:1;break;case gr:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Ki:e.y=e.y-Math.floor(e.y);break;case Jn:e.y=e.y<0?0:1;break;case gr:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}}Dt.DEFAULT_IMAGE=null;Dt.DEFAULT_MAPPING=gc;Dt.DEFAULT_ANISOTROPY=1;class ot{constructor(e=0,t=0,n=0,i=1){ot.prototype.isVector4=!0,this.x=e,this.y=t,this.z=n,this.w=i}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,n,i){return this.x=e,this.y=t,this.z=n,this.w=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){const t=this.x,n=this.y,i=this.z,r=this.w,o=e.elements;return this.x=o[0]*t+o[4]*n+o[8]*i+o[12]*r,this.y=o[1]*t+o[5]*n+o[9]*i+o[13]*r,this.z=o[2]*t+o[6]*n+o[10]*i+o[14]*r,this.w=o[3]*t+o[7]*n+o[11]*i+o[15]*r,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);const t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,n,i,r;const l=e.elements,c=l[0],u=l[4],d=l[8],h=l[1],m=l[5],_=l[9],v=l[2],g=l[6],p=l[10];if(Math.abs(u-h)<.01&&Math.abs(d-v)<.01&&Math.abs(_-g)<.01){if(Math.abs(u+h)<.1&&Math.abs(d+v)<.1&&Math.abs(_+g)<.1&&Math.abs(c+m+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;const E=(c+1)/2,b=(m+1)/2,R=(p+1)/2,P=(u+h)/4,I=(d+v)/4,F=(_+g)/4;return E>b&&E>R?E<.01?(n=0,i=.707106781,r=.707106781):(n=Math.sqrt(E),i=P/n,r=I/n):b>R?b<.01?(n=.707106781,i=0,r=.707106781):(i=Math.sqrt(b),n=P/i,r=F/i):R<.01?(n=.707106781,i=.707106781,r=0):(r=Math.sqrt(R),n=I/r,i=F/r),this.set(n,i,r,t),this}let A=Math.sqrt((g-_)*(g-_)+(d-v)*(d-v)+(h-u)*(h-u));return Math.abs(A)<.001&&(A=1),this.x=(g-_)/A,this.y=(d-v)/A,this.z=(h-u)/A,this.w=Math.acos((c+m+p-1)/2),this}setFromMatrixPosition(e){const t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=Ke(this.x,e.x,t.x),this.y=Ke(this.y,e.y,t.y),this.z=Ke(this.z,e.z,t.z),this.w=Ke(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=Ke(this.x,e,t),this.y=Ke(this.y,e,t),this.z=Ke(this.z,e,t),this.w=Ke(this.w,e,t),this}clampLength(e,t){const n=this.length();return this.divideScalar(n||1).multiplyScalar(Ke(n,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,n){return this.x=e.x+(t.x-e.x)*n,this.y=e.y+(t.y-e.y)*n,this.z=e.z+(t.z-e.z)*n,this.w=e.w+(t.w-e.w)*n,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}}class kh extends ti{constructor(e=1,t=1,n={}){super(),n=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Zt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},n),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=n.depth,this.scissor=new ot(0,0,e,t),this.scissorTest=!1,this.viewport=new ot(0,0,e,t);const i={width:e,height:t,depth:n.depth},r=new Dt(i);this.textures=[];const o=n.count;for(let a=0;a<o;a++)this.textures[a]=r.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(n),this.depthBuffer=n.depthBuffer,this.stencilBuffer=n.stencilBuffer,this.resolveDepthBuffer=n.resolveDepthBuffer,this.resolveStencilBuffer=n.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=n.depthTexture,this.samples=n.samples,this.multiview=n.multiview}_setTextureOptions(e={}){const t={minFilter:Zt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let n=0;n<this.textures.length;n++)this.textures[n].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,n=1){if(this.width!==e||this.height!==t||this.depth!==n){this.width=e,this.height=t,this.depth=n;for(let i=0,r=this.textures.length;i<r;i++)this.textures[i].image.width=e,this.textures[i].image.height=t,this.textures[i].image.depth=n,this.textures[i].isArrayTexture=this.textures[i].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,n=e.textures.length;t<n;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;const i=Object.assign({},e.textures[t].image);this.textures[t].source=new va(i)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}}class _i extends kh{constructor(e=1,t=1,n={}){super(e,t,n),this.isWebGLRenderTarget=!0}}class Rc extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}}class Bh extends Dt{constructor(e=null,t=1,n=1,i=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:n,depth:i},this.magFilter=Vt,this.minFilter=Vt,this.wrapR=Jn,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}class Jt{constructor(e=new D(1/0,1/0,1/0),t=new D(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t+=3)this.expandByPoint(an.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,n=e.count;t<n;t++)this.expandByPoint(an.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,n=e.length;t<n;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){const n=an.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(n),this.max.copy(e).add(n),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);const n=e.geometry;if(n!==void 0){const r=n.getAttribute("position");if(t===!0&&r!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=r.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,an):an.fromBufferAttribute(r,o),an.applyMatrix4(e.matrixWorld),this.expandByPoint(an);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Us.copy(e.boundingBox)):(n.boundingBox===null&&n.computeBoundingBox(),Us.copy(n.boundingBox)),Us.applyMatrix4(e.matrixWorld),this.union(Us)}const i=e.children;for(let r=0,o=i.length;r<o;r++)this.expandByObject(i[r],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,an),an.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,n;return e.normal.x>0?(t=e.normal.x*this.min.x,n=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,n=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,n+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,n+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,n+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,n+=e.normal.z*this.min.z),t<=-e.constant&&n>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(os),Ns.subVectors(this.max,os),Si.subVectors(e.a,os),Mi.subVectors(e.b,os),Ti.subVectors(e.c,os),zn.subVectors(Mi,Si),Hn.subVectors(Ti,Mi),si.subVectors(Si,Ti);let t=[0,-zn.z,zn.y,0,-Hn.z,Hn.y,0,-si.z,si.y,zn.z,0,-zn.x,Hn.z,0,-Hn.x,si.z,0,-si.x,-zn.y,zn.x,0,-Hn.y,Hn.x,0,-si.y,si.x,0];return!Ur(t,Si,Mi,Ti,Ns)||(t=[1,0,0,0,1,0,0,0,1],!Ur(t,Si,Mi,Ti,Ns))?!1:(Fs.crossVectors(zn,Hn),t=[Fs.x,Fs.y,Fs.z],Ur(t,Si,Mi,Ti,Ns))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,an).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(an).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(wn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),wn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),wn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),wn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),wn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),wn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),wn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),wn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(wn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}}const wn=[new D,new D,new D,new D,new D,new D,new D,new D],an=new D,Us=new Jt,Si=new D,Mi=new D,Ti=new D,zn=new D,Hn=new D,si=new D,os=new D,Ns=new D,Fs=new D,ri=new D;function Ur(s,e,t,n,i){for(let r=0,o=s.length-3;r<=o;r+=3){ri.fromArray(s,r);const a=i.x*Math.abs(ri.x)+i.y*Math.abs(ri.y)+i.z*Math.abs(ri.z),l=e.dot(ri),c=t.dot(ri),u=n.dot(ri);if(Math.max(-Math.max(l,c,u),Math.min(l,c,u))>a)return!1}return!0}const Vh=new Jt,as=new D,Nr=new D;class Mn{constructor(e=new D,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){const n=this.center;t!==void 0?n.copy(t):Vh.setFromPoints(e).getCenter(n);let i=0;for(let r=0,o=e.length;r<o;r++)i=Math.max(i,n.distanceToSquared(e[r]));return this.radius=Math.sqrt(i),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){const t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){const n=this.center.distanceToSquared(e);return t.copy(e),n>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;as.subVectors(e,this.center);const t=as.lengthSq();if(t>this.radius*this.radius){const n=Math.sqrt(t),i=(n-this.radius)*.5;this.center.addScaledVector(as,i/n),this.radius+=i}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Nr.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(as.copy(e.center).add(Nr)),this.expandByPoint(as.copy(e.center).sub(Nr))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}}const Cn=new D,Fr=new D,Os=new D,Gn=new D,Or=new D,ks=new D,kr=new D;class Rs{constructor(e=new D,t=new D(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Cn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);const n=t.dot(this.direction);return n<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,n)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){const t=Cn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Cn.copy(this.origin).addScaledVector(this.direction,t),Cn.distanceToSquared(e))}distanceSqToSegment(e,t,n,i){Fr.copy(e).add(t).multiplyScalar(.5),Os.copy(t).sub(e).normalize(),Gn.copy(this.origin).sub(Fr);const r=e.distanceTo(t)*.5,o=-this.direction.dot(Os),a=Gn.dot(this.direction),l=-Gn.dot(Os),c=Gn.lengthSq(),u=Math.abs(1-o*o);let d,h,m,_;if(u>0)if(d=o*l-a,h=o*a-l,_=r*u,d>=0)if(h>=-_)if(h<=_){const v=1/u;d*=v,h*=v,m=d*(d+o*h+2*a)+h*(o*d+h+2*l)+c}else h=r,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;else h=-r,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;else h<=-_?(d=Math.max(0,-(-o*r+a)),h=d>0?-r:Math.min(Math.max(-r,-l),r),m=-d*d+h*(h+2*l)+c):h<=_?(d=0,h=Math.min(Math.max(-r,-l),r),m=h*(h+2*l)+c):(d=Math.max(0,-(o*r+a)),h=d>0?r:Math.min(Math.max(-r,-l),r),m=-d*d+h*(h+2*l)+c);else h=o>0?-r:r,d=Math.max(0,-(o*h+a)),m=-d*d+h*(h+2*l)+c;return n&&n.copy(this.origin).addScaledVector(this.direction,d),i&&i.copy(Fr).addScaledVector(Os,h),m}intersectSphere(e,t){Cn.subVectors(e.center,this.origin);const n=Cn.dot(this.direction),i=Cn.dot(Cn)-n*n,r=e.radius*e.radius;if(i>r)return null;const o=Math.sqrt(r-i),a=n-o,l=n+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){const t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;const n=-(this.origin.dot(e.normal)+e.constant)/t;return n>=0?n:null}intersectPlane(e,t){const n=this.distanceToPlane(e);return n===null?null:this.at(n,t)}intersectsPlane(e){const t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let n,i,r,o,a,l;const c=1/this.direction.x,u=1/this.direction.y,d=1/this.direction.z,h=this.origin;return c>=0?(n=(e.min.x-h.x)*c,i=(e.max.x-h.x)*c):(n=(e.max.x-h.x)*c,i=(e.min.x-h.x)*c),u>=0?(r=(e.min.y-h.y)*u,o=(e.max.y-h.y)*u):(r=(e.max.y-h.y)*u,o=(e.min.y-h.y)*u),n>o||r>i||((r>n||isNaN(n))&&(n=r),(o<i||isNaN(i))&&(i=o),d>=0?(a=(e.min.z-h.z)*d,l=(e.max.z-h.z)*d):(a=(e.max.z-h.z)*d,l=(e.min.z-h.z)*d),n>l||a>i)||((a>n||n!==n)&&(n=a),(l<i||i!==i)&&(i=l),i<0)?null:this.at(n>=0?n:i,t)}intersectsBox(e){return this.intersectBox(e,Cn)!==null}intersectTriangle(e,t,n,i,r){Or.subVectors(t,e),ks.subVectors(n,e),kr.crossVectors(Or,ks);let o=this.direction.dot(kr),a;if(o>0){if(i)return null;a=1}else if(o<0)a=-1,o=-o;else return null;Gn.subVectors(this.origin,e);const l=a*this.direction.dot(ks.crossVectors(Gn,ks));if(l<0)return null;const c=a*this.direction.dot(Or.cross(Gn));if(c<0||l+c>o)return null;const u=-a*Gn.dot(kr);return u<0?null:this.at(u/o,r)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}}class Ye{constructor(e,t,n,i,r,o,a,l,c,u,d,h,m,_,v,g){Ye.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,n,i,r,o,a,l,c,u,d,h,m,_,v,g)}set(e,t,n,i,r,o,a,l,c,u,d,h,m,_,v,g){const p=this.elements;return p[0]=e,p[4]=t,p[8]=n,p[12]=i,p[1]=r,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=u,p[10]=d,p[14]=h,p[3]=m,p[7]=_,p[11]=v,p[15]=g,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new Ye().fromArray(this.elements)}copy(e){const t=this.elements,n=e.elements;return t[0]=n[0],t[1]=n[1],t[2]=n[2],t[3]=n[3],t[4]=n[4],t[5]=n[5],t[6]=n[6],t[7]=n[7],t[8]=n[8],t[9]=n[9],t[10]=n[10],t[11]=n[11],t[12]=n[12],t[13]=n[13],t[14]=n[14],t[15]=n[15],this}copyPosition(e){const t=this.elements,n=e.elements;return t[12]=n[12],t[13]=n[13],t[14]=n[14],this}setFromMatrix3(e){const t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,n){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),n.setFromMatrixColumn(this,2),this}makeBasis(e,t,n){return this.set(e.x,t.x,n.x,0,e.y,t.y,n.y,0,e.z,t.z,n.z,0,0,0,0,1),this}extractRotation(e){const t=this.elements,n=e.elements,i=1/Ei.setFromMatrixColumn(e,0).length(),r=1/Ei.setFromMatrixColumn(e,1).length(),o=1/Ei.setFromMatrixColumn(e,2).length();return t[0]=n[0]*i,t[1]=n[1]*i,t[2]=n[2]*i,t[3]=0,t[4]=n[4]*r,t[5]=n[5]*r,t[6]=n[6]*r,t[7]=0,t[8]=n[8]*o,t[9]=n[9]*o,t[10]=n[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){const t=this.elements,n=e.x,i=e.y,r=e.z,o=Math.cos(n),a=Math.sin(n),l=Math.cos(i),c=Math.sin(i),u=Math.cos(r),d=Math.sin(r);if(e.order==="XYZ"){const h=o*u,m=o*d,_=a*u,v=a*d;t[0]=l*u,t[4]=-l*d,t[8]=c,t[1]=m+_*c,t[5]=h-v*c,t[9]=-a*l,t[2]=v-h*c,t[6]=_+m*c,t[10]=o*l}else if(e.order==="YXZ"){const h=l*u,m=l*d,_=c*u,v=c*d;t[0]=h+v*a,t[4]=_*a-m,t[8]=o*c,t[1]=o*d,t[5]=o*u,t[9]=-a,t[2]=m*a-_,t[6]=v+h*a,t[10]=o*l}else if(e.order==="ZXY"){const h=l*u,m=l*d,_=c*u,v=c*d;t[0]=h-v*a,t[4]=-o*d,t[8]=_+m*a,t[1]=m+_*a,t[5]=o*u,t[9]=v-h*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){const h=o*u,m=o*d,_=a*u,v=a*d;t[0]=l*u,t[4]=_*c-m,t[8]=h*c+v,t[1]=l*d,t[5]=v*c+h,t[9]=m*c-_,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){const h=o*l,m=o*c,_=a*l,v=a*c;t[0]=l*u,t[4]=v-h*d,t[8]=_*d+m,t[1]=d,t[5]=o*u,t[9]=-a*u,t[2]=-c*u,t[6]=m*d+_,t[10]=h-v*d}else if(e.order==="XZY"){const h=o*l,m=o*c,_=a*l,v=a*c;t[0]=l*u,t[4]=-d,t[8]=c*u,t[1]=h*d+v,t[5]=o*u,t[9]=m*d-_,t[2]=_*d-m,t[6]=a*u,t[10]=v*d+h}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose(zh,e,Hh)}lookAt(e,t,n){const i=this.elements;return Yt.subVectors(e,t),Yt.lengthSq()===0&&(Yt.z=1),Yt.normalize(),Wn.crossVectors(n,Yt),Wn.lengthSq()===0&&(Math.abs(n.z)===1?Yt.x+=1e-4:Yt.z+=1e-4,Yt.normalize(),Wn.crossVectors(n,Yt)),Wn.normalize(),Bs.crossVectors(Yt,Wn),i[0]=Wn.x,i[4]=Bs.x,i[8]=Yt.x,i[1]=Wn.y,i[5]=Bs.y,i[9]=Yt.y,i[2]=Wn.z,i[6]=Bs.z,i[10]=Yt.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){const n=e.elements,i=t.elements,r=this.elements,o=n[0],a=n[4],l=n[8],c=n[12],u=n[1],d=n[5],h=n[9],m=n[13],_=n[2],v=n[6],g=n[10],p=n[14],A=n[3],E=n[7],b=n[11],R=n[15],P=i[0],I=i[4],F=i[8],M=i[12],S=i[1],C=i[5],Z=i[9],q=i[13],X=i[2],j=i[6],B=i[10],Q=i[14],V=i[3],ee=i[7],oe=i[11],pe=i[15];return r[0]=o*P+a*S+l*X+c*V,r[4]=o*I+a*C+l*j+c*ee,r[8]=o*F+a*Z+l*B+c*oe,r[12]=o*M+a*q+l*Q+c*pe,r[1]=u*P+d*S+h*X+m*V,r[5]=u*I+d*C+h*j+m*ee,r[9]=u*F+d*Z+h*B+m*oe,r[13]=u*M+d*q+h*Q+m*pe,r[2]=_*P+v*S+g*X+p*V,r[6]=_*I+v*C+g*j+p*ee,r[10]=_*F+v*Z+g*B+p*oe,r[14]=_*M+v*q+g*Q+p*pe,r[3]=A*P+E*S+b*X+R*V,r[7]=A*I+E*C+b*j+R*ee,r[11]=A*F+E*Z+b*B+R*oe,r[15]=A*M+E*q+b*Q+R*pe,this}multiplyScalar(e){const t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){const e=this.elements,t=e[0],n=e[4],i=e[8],r=e[12],o=e[1],a=e[5],l=e[9],c=e[13],u=e[2],d=e[6],h=e[10],m=e[14],_=e[3],v=e[7],g=e[11],p=e[15];return _*(+r*l*d-i*c*d-r*a*h+n*c*h+i*a*m-n*l*m)+v*(+t*l*m-t*c*h+r*o*h-i*o*m+i*c*u-r*l*u)+g*(+t*c*d-t*a*m-r*o*d+n*o*m+r*a*u-n*c*u)+p*(-i*a*u-t*l*d+t*a*h+i*o*d-n*o*h+n*l*u)}transpose(){const e=this.elements;let t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,n){const i=this.elements;return e.isVector3?(i[12]=e.x,i[13]=e.y,i[14]=e.z):(i[12]=e,i[13]=t,i[14]=n),this}invert(){const e=this.elements,t=e[0],n=e[1],i=e[2],r=e[3],o=e[4],a=e[5],l=e[6],c=e[7],u=e[8],d=e[9],h=e[10],m=e[11],_=e[12],v=e[13],g=e[14],p=e[15],A=d*g*c-v*h*c+v*l*m-a*g*m-d*l*p+a*h*p,E=_*h*c-u*g*c-_*l*m+o*g*m+u*l*p-o*h*p,b=u*v*c-_*d*c+_*a*m-o*v*m-u*a*p+o*d*p,R=_*d*l-u*v*l-_*a*h+o*v*h+u*a*g-o*d*g,P=t*A+n*E+i*b+r*R;if(P===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);const I=1/P;return e[0]=A*I,e[1]=(v*h*r-d*g*r-v*i*m+n*g*m+d*i*p-n*h*p)*I,e[2]=(a*g*r-v*l*r+v*i*c-n*g*c-a*i*p+n*l*p)*I,e[3]=(d*l*r-a*h*r-d*i*c+n*h*c+a*i*m-n*l*m)*I,e[4]=E*I,e[5]=(u*g*r-_*h*r+_*i*m-t*g*m-u*i*p+t*h*p)*I,e[6]=(_*l*r-o*g*r-_*i*c+t*g*c+o*i*p-t*l*p)*I,e[7]=(o*h*r-u*l*r+u*i*c-t*h*c-o*i*m+t*l*m)*I,e[8]=b*I,e[9]=(_*d*r-u*v*r-_*n*m+t*v*m+u*n*p-t*d*p)*I,e[10]=(o*v*r-_*a*r+_*n*c-t*v*c-o*n*p+t*a*p)*I,e[11]=(u*a*r-o*d*r-u*n*c+t*d*c+o*n*m-t*a*m)*I,e[12]=R*I,e[13]=(u*v*i-_*d*i+_*n*h-t*v*h-u*n*g+t*d*g)*I,e[14]=(_*a*i-o*v*i-_*n*l+t*v*l+o*n*g-t*a*g)*I,e[15]=(o*d*i-u*a*i+u*n*l-t*d*l-o*n*h+t*a*h)*I,this}scale(e){const t=this.elements,n=e.x,i=e.y,r=e.z;return t[0]*=n,t[4]*=i,t[8]*=r,t[1]*=n,t[5]*=i,t[9]*=r,t[2]*=n,t[6]*=i,t[10]*=r,t[3]*=n,t[7]*=i,t[11]*=r,this}getMaxScaleOnAxis(){const e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],n=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],i=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,n,i))}makeTranslation(e,t,n){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,n,0,0,0,1),this}makeRotationX(e){const t=Math.cos(e),n=Math.sin(e);return this.set(1,0,0,0,0,t,-n,0,0,n,t,0,0,0,0,1),this}makeRotationY(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,0,n,0,0,1,0,0,-n,0,t,0,0,0,0,1),this}makeRotationZ(e){const t=Math.cos(e),n=Math.sin(e);return this.set(t,-n,0,0,n,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){const n=Math.cos(t),i=Math.sin(t),r=1-n,o=e.x,a=e.y,l=e.z,c=r*o,u=r*a;return this.set(c*o+n,c*a-i*l,c*l+i*a,0,c*a+i*l,u*a+n,u*l-i*o,0,c*l-i*a,u*l+i*o,r*l*l+n,0,0,0,0,1),this}makeScale(e,t,n){return this.set(e,0,0,0,0,t,0,0,0,0,n,0,0,0,0,1),this}makeShear(e,t,n,i,r,o){return this.set(1,n,r,0,e,1,o,0,t,i,1,0,0,0,0,1),this}compose(e,t,n){const i=this.elements,r=t._x,o=t._y,a=t._z,l=t._w,c=r+r,u=o+o,d=a+a,h=r*c,m=r*u,_=r*d,v=o*u,g=o*d,p=a*d,A=l*c,E=l*u,b=l*d,R=n.x,P=n.y,I=n.z;return i[0]=(1-(v+p))*R,i[1]=(m+b)*R,i[2]=(_-E)*R,i[3]=0,i[4]=(m-b)*P,i[5]=(1-(h+p))*P,i[6]=(g+A)*P,i[7]=0,i[8]=(_+E)*I,i[9]=(g-A)*I,i[10]=(1-(h+v))*I,i[11]=0,i[12]=e.x,i[13]=e.y,i[14]=e.z,i[15]=1,this}decompose(e,t,n){const i=this.elements;let r=Ei.set(i[0],i[1],i[2]).length();const o=Ei.set(i[4],i[5],i[6]).length(),a=Ei.set(i[8],i[9],i[10]).length();this.determinant()<0&&(r=-r),e.x=i[12],e.y=i[13],e.z=i[14],ln.copy(this);const c=1/r,u=1/o,d=1/a;return ln.elements[0]*=c,ln.elements[1]*=c,ln.elements[2]*=c,ln.elements[4]*=u,ln.elements[5]*=u,ln.elements[6]*=u,ln.elements[8]*=d,ln.elements[9]*=d,ln.elements[10]*=d,t.setFromRotationMatrix(ln),n.x=r,n.y=o,n.z=a,this}makePerspective(e,t,n,i,r,o,a=xn,l=!1){const c=this.elements,u=2*r/(t-e),d=2*r/(n-i),h=(t+e)/(t-e),m=(n+i)/(n-i);let _,v;if(l)_=r/(o-r),v=o*r/(o-r);else if(a===xn)_=-(o+r)/(o-r),v=-2*o*r/(o-r);else if(a===xr)_=-o/(o-r),v=-o*r/(o-r);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=h,c[12]=0,c[1]=0,c[5]=d,c[9]=m,c[13]=0,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,n,i,r,o,a=xn,l=!1){const c=this.elements,u=2/(t-e),d=2/(n-i),h=-(t+e)/(t-e),m=-(n+i)/(n-i);let _,v;if(l)_=1/(o-r),v=o/(o-r);else if(a===xn)_=-2/(o-r),v=-(o+r)/(o-r);else if(a===xr)_=-1/(o-r),v=-r/(o-r);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=u,c[4]=0,c[8]=0,c[12]=h,c[1]=0,c[5]=d,c[9]=0,c[13]=m,c[2]=0,c[6]=0,c[10]=_,c[14]=v,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){const t=this.elements,n=e.elements;for(let i=0;i<16;i++)if(t[i]!==n[i])return!1;return!0}fromArray(e,t=0){for(let n=0;n<16;n++)this.elements[n]=e[n+t];return this}toArray(e=[],t=0){const n=this.elements;return e[t]=n[0],e[t+1]=n[1],e[t+2]=n[2],e[t+3]=n[3],e[t+4]=n[4],e[t+5]=n[5],e[t+6]=n[6],e[t+7]=n[7],e[t+8]=n[8],e[t+9]=n[9],e[t+10]=n[10],e[t+11]=n[11],e[t+12]=n[12],e[t+13]=n[13],e[t+14]=n[14],e[t+15]=n[15],e}}const Ei=new D,ln=new Ye,zh=new D(0,0,0),Hh=new D(1,1,1),Wn=new D,Bs=new D,Yt=new D,Za=new Ye,Ja=new Qt;class Sn{constructor(e=0,t=0,n=0,i=Sn.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=n,this._order=i}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,n,i=this._order){return this._x=e,this._y=t,this._z=n,this._order=i,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,n=!0){const i=e.elements,r=i[0],o=i[4],a=i[8],l=i[1],c=i[5],u=i[9],d=i[2],h=i[6],m=i[10];switch(t){case"XYZ":this._y=Math.asin(Ke(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-u,m),this._z=Math.atan2(-o,r)):(this._x=Math.atan2(h,c),this._z=0);break;case"YXZ":this._x=Math.asin(-Ke(u,-1,1)),Math.abs(u)<.9999999?(this._y=Math.atan2(a,m),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-d,r),this._z=0);break;case"ZXY":this._x=Math.asin(Ke(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(-d,m),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,r));break;case"ZYX":this._y=Math.asin(-Ke(d,-1,1)),Math.abs(d)<.9999999?(this._x=Math.atan2(h,m),this._z=Math.atan2(l,r)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(Ke(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-u,c),this._y=Math.atan2(-d,r)):(this._x=0,this._y=Math.atan2(a,m));break;case"XZY":this._z=Math.asin(-Ke(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(h,c),this._y=Math.atan2(a,r)):(this._x=Math.atan2(-u,m),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,n===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,n){return Za.makeRotationFromQuaternion(e),this.setFromRotationMatrix(Za,t,n)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return Ja.setFromEuler(this),this.setFromQuaternion(Ja,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}}Sn.DEFAULT_ORDER="XYZ";class Pc{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}}let Gh=0;const $a=new D,Ai=new Qt,Rn=new Ye,Vs=new D,ls=new D,Wh=new D,Xh=new Qt,Qa=new D(1,0,0),el=new D(0,1,0),tl=new D(0,0,1),nl={type:"added"},qh={type:"removed"},wi={type:"childadded",child:null},Br={type:"childremoved",child:null};class bt extends ti{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:Gh++}),this.uuid=fn(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=bt.DEFAULT_UP.clone();const e=new D,t=new Sn,n=new Qt,i=new D(1,1,1);function r(){n.setFromEuler(t,!1)}function o(){t.setFromQuaternion(n,void 0,!1)}t._onChange(r),n._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:n},scale:{configurable:!0,enumerable:!0,value:i},modelViewMatrix:{value:new Ye},normalMatrix:{value:new qe}}),this.matrix=new Ye,this.matrixWorld=new Ye,this.matrixAutoUpdate=bt.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Pc,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.multiply(Ai),this}rotateOnWorldAxis(e,t){return Ai.setFromAxisAngle(e,t),this.quaternion.premultiply(Ai),this}rotateX(e){return this.rotateOnAxis(Qa,e)}rotateY(e){return this.rotateOnAxis(el,e)}rotateZ(e){return this.rotateOnAxis(tl,e)}translateOnAxis(e,t){return $a.copy(e).applyQuaternion(this.quaternion),this.position.add($a.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(Qa,e)}translateY(e){return this.translateOnAxis(el,e)}translateZ(e){return this.translateOnAxis(tl,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(Rn.copy(this.matrixWorld).invert())}lookAt(e,t,n){e.isVector3?Vs.copy(e):Vs.set(e,t,n);const i=this.parent;this.updateWorldMatrix(!0,!1),ls.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?Rn.lookAt(ls,Vs,this.up):Rn.lookAt(Vs,ls,this.up),this.quaternion.setFromRotationMatrix(Rn),i&&(Rn.extractRotation(i.matrixWorld),Ai.setFromRotationMatrix(Rn),this.quaternion.premultiply(Ai.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(nl),wi.child=e,this.dispatchEvent(wi),wi.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let n=0;n<arguments.length;n++)this.remove(arguments[n]);return this}const t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(qh),Br.child=e,this.dispatchEvent(Br),Br.child=null),this}removeFromParent(){const e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),Rn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),Rn.multiply(e.parent.matrixWorld)),e.applyMatrix4(Rn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(nl),wi.child=e,this.dispatchEvent(wi),wi.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let n=0,i=this.children.length;n<i;n++){const o=this.children[n].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,n=[]){this[e]===t&&n.push(this);const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].getObjectsByProperty(e,t,n);return n}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,e,Wh),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(ls,Xh,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);const t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].traverseVisible(e)}traverseAncestors(e){const t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);const t=this.children;for(let n=0,i=t.length;n<i;n++)t[n].updateMatrixWorld(e)}updateWorldMatrix(e,t){const n=this.parent;if(e===!0&&n!==null&&n.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){const i=this.children;for(let r=0,o=i.length;r<o;r++)i[r].updateWorldMatrix(!1,!0)}}toJSON(e){const t=e===void 0||typeof e=="string",n={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},n.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});const i={};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.castShadow===!0&&(i.castShadow=!0),this.receiveShadow===!0&&(i.receiveShadow=!0),this.visible===!1&&(i.visible=!1),this.frustumCulled===!1&&(i.frustumCulled=!1),this.renderOrder!==0&&(i.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(i.userData=this.userData),i.layers=this.layers.mask,i.matrix=this.matrix.toArray(),i.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(i.matrixAutoUpdate=!1),this.isInstancedMesh&&(i.type="InstancedMesh",i.count=this.count,i.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(i.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(i.type="BatchedMesh",i.perObjectFrustumCulled=this.perObjectFrustumCulled,i.sortObjects=this.sortObjects,i.drawRanges=this._drawRanges,i.reservedRanges=this._reservedRanges,i.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),i.instanceInfo=this._instanceInfo.map(a=>({...a})),i.availableInstanceIds=this._availableInstanceIds.slice(),i.availableGeometryIds=this._availableGeometryIds.slice(),i.nextIndexStart=this._nextIndexStart,i.nextVertexStart=this._nextVertexStart,i.geometryCount=this._geometryCount,i.maxInstanceCount=this._maxInstanceCount,i.maxVertexCount=this._maxVertexCount,i.maxIndexCount=this._maxIndexCount,i.geometryInitialized=this._geometryInitialized,i.matricesTexture=this._matricesTexture.toJSON(e),i.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(i.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(i.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(i.boundingBox=this.boundingBox.toJSON()));function r(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?i.background=this.background.toJSON():this.background.isTexture&&(i.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(i.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){i.geometry=r(e.geometries,this.geometry);const a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){const l=a.shapes;if(Array.isArray(l))for(let c=0,u=l.length;c<u;c++){const d=l[c];r(e.shapes,d)}else r(e.shapes,l)}}if(this.isSkinnedMesh&&(i.bindMode=this.bindMode,i.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(r(e.skeletons,this.skeleton),i.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){const a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(r(e.materials,this.material[l]));i.material=a}else i.material=r(e.materials,this.material);if(this.children.length>0){i.children=[];for(let a=0;a<this.children.length;a++)i.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){i.animations=[];for(let a=0;a<this.animations.length;a++){const l=this.animations[a];i.animations.push(r(e.animations,l))}}if(t){const a=o(e.geometries),l=o(e.materials),c=o(e.textures),u=o(e.images),d=o(e.shapes),h=o(e.skeletons),m=o(e.animations),_=o(e.nodes);a.length>0&&(n.geometries=a),l.length>0&&(n.materials=l),c.length>0&&(n.textures=c),u.length>0&&(n.images=u),d.length>0&&(n.shapes=d),h.length>0&&(n.skeletons=h),m.length>0&&(n.animations=m),_.length>0&&(n.nodes=_)}return n.object=i,n;function o(a){const l=[];for(const c in a){const u=a[c];delete u.metadata,l.push(u)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let n=0;n<e.children.length;n++){const i=e.children[n];this.add(i.clone())}return this}}bt.DEFAULT_UP=new D(0,1,0);bt.DEFAULT_MATRIX_AUTO_UPDATE=!0;bt.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;const cn=new D,Pn=new D,Vr=new D,In=new D,Ci=new D,Ri=new D,il=new D,zr=new D,Hr=new D,Gr=new D,Wr=new ot,Xr=new ot,qr=new ot;class dn{constructor(e=new D,t=new D,n=new D){this.a=e,this.b=t,this.c=n}static getNormal(e,t,n,i){i.subVectors(n,t),cn.subVectors(e,t),i.cross(cn);const r=i.lengthSq();return r>0?i.multiplyScalar(1/Math.sqrt(r)):i.set(0,0,0)}static getBarycoord(e,t,n,i,r){cn.subVectors(i,t),Pn.subVectors(n,t),Vr.subVectors(e,t);const o=cn.dot(cn),a=cn.dot(Pn),l=cn.dot(Vr),c=Pn.dot(Pn),u=Pn.dot(Vr),d=o*c-a*a;if(d===0)return r.set(0,0,0),null;const h=1/d,m=(c*l-a*u)*h,_=(o*u-a*l)*h;return r.set(1-m-_,_,m)}static containsPoint(e,t,n,i){return this.getBarycoord(e,t,n,i,In)===null?!1:In.x>=0&&In.y>=0&&In.x+In.y<=1}static getInterpolation(e,t,n,i,r,o,a,l){return this.getBarycoord(e,t,n,i,In)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(r,In.x),l.addScaledVector(o,In.y),l.addScaledVector(a,In.z),l)}static getInterpolatedAttribute(e,t,n,i,r,o){return Wr.setScalar(0),Xr.setScalar(0),qr.setScalar(0),Wr.fromBufferAttribute(e,t),Xr.fromBufferAttribute(e,n),qr.fromBufferAttribute(e,i),o.setScalar(0),o.addScaledVector(Wr,r.x),o.addScaledVector(Xr,r.y),o.addScaledVector(qr,r.z),o}static isFrontFacing(e,t,n,i){return cn.subVectors(n,t),Pn.subVectors(e,t),cn.cross(Pn).dot(i)<0}set(e,t,n){return this.a.copy(e),this.b.copy(t),this.c.copy(n),this}setFromPointsAndIndices(e,t,n,i){return this.a.copy(e[t]),this.b.copy(e[n]),this.c.copy(e[i]),this}setFromAttributeAndIndices(e,t,n,i){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,n),this.c.fromBufferAttribute(e,i),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return cn.subVectors(this.c,this.b),Pn.subVectors(this.a,this.b),cn.cross(Pn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return dn.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return dn.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,n,i,r){return dn.getInterpolation(e,this.a,this.b,this.c,t,n,i,r)}containsPoint(e){return dn.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return dn.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){const n=this.a,i=this.b,r=this.c;let o,a;Ci.subVectors(i,n),Ri.subVectors(r,n),zr.subVectors(e,n);const l=Ci.dot(zr),c=Ri.dot(zr);if(l<=0&&c<=0)return t.copy(n);Hr.subVectors(e,i);const u=Ci.dot(Hr),d=Ri.dot(Hr);if(u>=0&&d<=u)return t.copy(i);const h=l*d-u*c;if(h<=0&&l>=0&&u<=0)return o=l/(l-u),t.copy(n).addScaledVector(Ci,o);Gr.subVectors(e,r);const m=Ci.dot(Gr),_=Ri.dot(Gr);if(_>=0&&m<=_)return t.copy(r);const v=m*c-l*_;if(v<=0&&c>=0&&_<=0)return a=c/(c-_),t.copy(n).addScaledVector(Ri,a);const g=u*_-m*d;if(g<=0&&d-u>=0&&m-_>=0)return il.subVectors(r,i),a=(d-u)/(d-u+(m-_)),t.copy(i).addScaledVector(il,a);const p=1/(g+v+h);return o=v*p,a=h*p,t.copy(n).addScaledVector(Ci,o).addScaledVector(Ri,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}}const Ic={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Xn={h:0,s:0,l:0},zs={h:0,s:0,l:0};function jr(s,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?s+(e-s)*6*t:t<1/2?e:t<2/3?s+(e-s)*6*(2/3-t):s}class ze{constructor(e,t,n){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,n)}set(e,t,n){if(t===void 0&&n===void 0){const i=e;i&&i.isColor?this.copy(i):typeof i=="number"?this.setHex(i):typeof i=="string"&&this.setStyle(i)}else this.setRGB(e,t,n);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=Lt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,Qe.colorSpaceToWorking(this,t),this}setRGB(e,t,n,i=Qe.workingColorSpace){return this.r=e,this.g=t,this.b=n,Qe.colorSpaceToWorking(this,i),this}setHSL(e,t,n,i=Qe.workingColorSpace){if(e=ga(e,1),t=Ke(t,0,1),n=Ke(n,0,1),t===0)this.r=this.g=this.b=n;else{const r=n<=.5?n*(1+t):n+t-n*t,o=2*n-r;this.r=jr(o,r,e+1/3),this.g=jr(o,r,e),this.b=jr(o,r,e-1/3)}return Qe.colorSpaceToWorking(this,i),this}setStyle(e,t=Lt){function n(r){r!==void 0&&parseFloat(r)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let i;if(i=/^(\w+)\(([^\)]*)\)/.exec(e)){let r;const o=i[1],a=i[2];switch(o){case"rgb":case"rgba":if(r=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(255,parseInt(r[1],10))/255,Math.min(255,parseInt(r[2],10))/255,Math.min(255,parseInt(r[3],10))/255,t);if(r=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setRGB(Math.min(100,parseInt(r[1],10))/100,Math.min(100,parseInt(r[2],10))/100,Math.min(100,parseInt(r[3],10))/100,t);break;case"hsl":case"hsla":if(r=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return n(r[4]),this.setHSL(parseFloat(r[1])/360,parseFloat(r[2])/100,parseFloat(r[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(i=/^\#([A-Fa-f\d]+)$/.exec(e)){const r=i[1],o=r.length;if(o===3)return this.setRGB(parseInt(r.charAt(0),16)/15,parseInt(r.charAt(1),16)/15,parseInt(r.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(r,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=Lt){const n=Ic[e.toLowerCase()];return n!==void 0?this.setHex(n,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=On(e.r),this.g=On(e.g),this.b=On(e.b),this}copyLinearToSRGB(e){return this.r=Wi(e.r),this.g=Wi(e.g),this.b=Wi(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=Lt){return Qe.workingToColorSpace(Nt.copy(this),e),Math.round(Ke(Nt.r*255,0,255))*65536+Math.round(Ke(Nt.g*255,0,255))*256+Math.round(Ke(Nt.b*255,0,255))}getHexString(e=Lt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=Qe.workingColorSpace){Qe.workingToColorSpace(Nt.copy(this),t);const n=Nt.r,i=Nt.g,r=Nt.b,o=Math.max(n,i,r),a=Math.min(n,i,r);let l,c;const u=(a+o)/2;if(a===o)l=0,c=0;else{const d=o-a;switch(c=u<=.5?d/(o+a):d/(2-o-a),o){case n:l=(i-r)/d+(i<r?6:0);break;case i:l=(r-n)/d+2;break;case r:l=(n-i)/d+4;break}l/=6}return e.h=l,e.s=c,e.l=u,e}getRGB(e,t=Qe.workingColorSpace){return Qe.workingToColorSpace(Nt.copy(this),t),e.r=Nt.r,e.g=Nt.g,e.b=Nt.b,e}getStyle(e=Lt){Qe.workingToColorSpace(Nt.copy(this),e);const t=Nt.r,n=Nt.g,i=Nt.b;return e!==Lt?`color(${e} ${t.toFixed(3)} ${n.toFixed(3)} ${i.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(n*255)},${Math.round(i*255)})`}offsetHSL(e,t,n){return this.getHSL(Xn),this.setHSL(Xn.h+e,Xn.s+t,Xn.l+n)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,n){return this.r=e.r+(t.r-e.r)*n,this.g=e.g+(t.g-e.g)*n,this.b=e.b+(t.b-e.b)*n,this}lerpHSL(e,t){this.getHSL(Xn),e.getHSL(zs);const n=xs(Xn.h,zs.h,t),i=xs(Xn.s,zs.s,t),r=xs(Xn.l,zs.l,t);return this.setHSL(n,i,r),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){const t=this.r,n=this.g,i=this.b,r=e.elements;return this.r=r[0]*t+r[3]*n+r[6]*i,this.g=r[1]*t+r[4]*n+r[7]*i,this.b=r[2]*t+r[5]*n+r[8]*i,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}}const Nt=new ze;ze.NAMES=Ic;let jh=0;class yn extends ti{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:jh++}),this.uuid=fn(),this.name="",this.type="Material",this.blending=Hi,this.side=Bn,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=go,this.blendDst=_o,this.blendEquation=hi,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new ze(0,0,0),this.blendAlpha=0,this.depthFunc=qi,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Ga,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=yi,this.stencilZFail=yi,this.stencilZPass=yi,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(const t in e){const n=e[t];if(n===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}const i=this[t];if(i===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}i&&i.isColor?i.set(n):i&&i.isVector3&&n&&n.isVector3?i.copy(n):this[t]=n}}toJSON(e){const t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});const n={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};n.uuid=this.uuid,n.type=this.type,this.name!==""&&(n.name=this.name),this.color&&this.color.isColor&&(n.color=this.color.getHex()),this.roughness!==void 0&&(n.roughness=this.roughness),this.metalness!==void 0&&(n.metalness=this.metalness),this.sheen!==void 0&&(n.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(n.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(n.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(n.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(n.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(n.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(n.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(n.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(n.shininess=this.shininess),this.clearcoat!==void 0&&(n.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(n.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(n.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(n.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(n.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,n.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.dispersion!==void 0&&(n.dispersion=this.dispersion),this.iridescence!==void 0&&(n.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(n.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(n.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(n.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(n.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(n.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(n.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(n.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(n.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(n.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(n.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(n.lightMap=this.lightMap.toJSON(e).uuid,n.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(n.aoMap=this.aoMap.toJSON(e).uuid,n.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(n.bumpMap=this.bumpMap.toJSON(e).uuid,n.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(n.normalMap=this.normalMap.toJSON(e).uuid,n.normalMapType=this.normalMapType,n.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(n.displacementMap=this.displacementMap.toJSON(e).uuid,n.displacementScale=this.displacementScale,n.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(n.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(n.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(n.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(n.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(n.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(n.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(n.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(n.combine=this.combine)),this.envMapRotation!==void 0&&(n.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(n.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(n.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(n.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(n.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(n.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(n.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(n.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(n.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(n.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(n.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(n.size=this.size),this.shadowSide!==null&&(n.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(n.sizeAttenuation=this.sizeAttenuation),this.blending!==Hi&&(n.blending=this.blending),this.side!==Bn&&(n.side=this.side),this.vertexColors===!0&&(n.vertexColors=!0),this.opacity<1&&(n.opacity=this.opacity),this.transparent===!0&&(n.transparent=!0),this.blendSrc!==go&&(n.blendSrc=this.blendSrc),this.blendDst!==_o&&(n.blendDst=this.blendDst),this.blendEquation!==hi&&(n.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(n.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(n.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(n.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(n.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(n.blendAlpha=this.blendAlpha),this.depthFunc!==qi&&(n.depthFunc=this.depthFunc),this.depthTest===!1&&(n.depthTest=this.depthTest),this.depthWrite===!1&&(n.depthWrite=this.depthWrite),this.colorWrite===!1&&(n.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(n.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Ga&&(n.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(n.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(n.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==yi&&(n.stencilFail=this.stencilFail),this.stencilZFail!==yi&&(n.stencilZFail=this.stencilZFail),this.stencilZPass!==yi&&(n.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(n.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(n.rotation=this.rotation),this.polygonOffset===!0&&(n.polygonOffset=!0),this.polygonOffsetFactor!==0&&(n.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(n.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(n.linewidth=this.linewidth),this.dashSize!==void 0&&(n.dashSize=this.dashSize),this.gapSize!==void 0&&(n.gapSize=this.gapSize),this.scale!==void 0&&(n.scale=this.scale),this.dithering===!0&&(n.dithering=!0),this.alphaTest>0&&(n.alphaTest=this.alphaTest),this.alphaHash===!0&&(n.alphaHash=!0),this.alphaToCoverage===!0&&(n.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(n.premultipliedAlpha=!0),this.forceSinglePass===!0&&(n.forceSinglePass=!0),this.wireframe===!0&&(n.wireframe=!0),this.wireframeLinewidth>1&&(n.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(n.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(n.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(n.flatShading=!0),this.visible===!1&&(n.visible=!1),this.toneMapped===!1&&(n.toneMapped=!1),this.fog===!1&&(n.fog=!1),Object.keys(this.userData).length>0&&(n.userData=this.userData);function i(r){const o=[];for(const a in r){const l=r[a];delete l.metadata,o.push(l)}return o}if(t){const r=i(e.textures),o=i(e.images);r.length>0&&(n.textures=r),o.length>0&&(n.images=o)}return n}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;const t=e.clippingPlanes;let n=null;if(t!==null){const i=t.length;n=new Array(i);for(let r=0;r!==i;++r)n[r]=t[r].clone()}return this.clippingPlanes=n,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}}class pi extends yn{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new ze(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.combine=mc,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}}const Tt=new D,Hs=new Be;let Yh=0;class zt{constructor(e,t,n=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:Yh++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=n,this.usage=ea,this.updateRanges=[],this.gpuType=hn,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,n){e*=this.itemSize,n*=t.itemSize;for(let i=0,r=this.itemSize;i<r;i++)this.array[e+i]=t.array[n+i];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,n=this.count;t<n;t++)Hs.fromBufferAttribute(this,t),Hs.applyMatrix3(e),this.setXY(t,Hs.x,Hs.y);else if(this.itemSize===3)for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix3(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyMatrix4(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyMatrix4(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.applyNormalMatrix(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)Tt.fromBufferAttribute(this,t),Tt.transformDirection(e),this.setXYZ(t,Tt.x,Tt.y,Tt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let n=this.array[e*this.itemSize+t];return this.normalized&&(n=un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.array[e*this.itemSize+t]=n,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=un(t,this.array)),t}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=un(t,this.array)),t}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=un(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=un(t,this.array)),t}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,n){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.array[e+0]=t,this.array[e+1]=n,this}setXYZ(e,t,n,i){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),i=ut(i,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e*=this.itemSize,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),i=ut(i,this.array),r=ut(r,this.array)),this.array[e+0]=t,this.array[e+1]=n,this.array[e+2]=i,this.array[e+3]=r,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){const e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==ea&&(e.usage=this.usage),e}}class Lc extends zt{constructor(e,t,n){super(new Uint16Array(e),t,n)}}class Dc extends zt{constructor(e,t,n){super(new Uint32Array(e),t,n)}}class kn extends zt{constructor(e,t,n){super(new Float32Array(e),t,n)}}let Kh=0;const nn=new Ye,Yr=new bt,Pi=new D,Kt=new Jt,cs=new Jt,Pt=new D;class Tn extends ti{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:Kh++}),this.uuid=fn(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Cc(e)?Dc:Lc)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,n=0){this.groups.push({start:e,count:t,materialIndex:n})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){const t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);const n=this.attributes.normal;if(n!==void 0){const r=new qe().getNormalMatrix(e);n.applyNormalMatrix(r),n.needsUpdate=!0}const i=this.attributes.tangent;return i!==void 0&&(i.transformDirection(e),i.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return nn.makeRotationFromQuaternion(e),this.applyMatrix4(nn),this}rotateX(e){return nn.makeRotationX(e),this.applyMatrix4(nn),this}rotateY(e){return nn.makeRotationY(e),this.applyMatrix4(nn),this}rotateZ(e){return nn.makeRotationZ(e),this.applyMatrix4(nn),this}translate(e,t,n){return nn.makeTranslation(e,t,n),this.applyMatrix4(nn),this}scale(e,t,n){return nn.makeScale(e,t,n),this.applyMatrix4(nn),this}lookAt(e){return Yr.lookAt(e),Yr.updateMatrix(),this.applyMatrix4(Yr.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(Pi).negate(),this.translate(Pi.x,Pi.y,Pi.z),this}setFromPoints(e){const t=this.getAttribute("position");if(t===void 0){const n=[];for(let i=0,r=e.length;i<r;i++){const o=e[i];n.push(o.x,o.y,o.z||0)}this.setAttribute("position",new kn(n,3))}else{const n=Math.min(e.length,t.count);for(let i=0;i<n;i++){const r=e[i];t.setXYZ(i,r.x,r.y,r.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Jt);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new D(-1/0,-1/0,-1/0),new D(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let n=0,i=t.length;n<i;n++){const r=t[n];Kt.setFromBufferAttribute(r),this.morphTargetsRelative?(Pt.addVectors(this.boundingBox.min,Kt.min),this.boundingBox.expandByPoint(Pt),Pt.addVectors(this.boundingBox.max,Kt.max),this.boundingBox.expandByPoint(Pt)):(this.boundingBox.expandByPoint(Kt.min),this.boundingBox.expandByPoint(Kt.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new Mn);const e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new D,1/0);return}if(e){const n=this.boundingSphere.center;if(Kt.setFromBufferAttribute(e),t)for(let r=0,o=t.length;r<o;r++){const a=t[r];cs.setFromBufferAttribute(a),this.morphTargetsRelative?(Pt.addVectors(Kt.min,cs.min),Kt.expandByPoint(Pt),Pt.addVectors(Kt.max,cs.max),Kt.expandByPoint(Pt)):(Kt.expandByPoint(cs.min),Kt.expandByPoint(cs.max))}Kt.getCenter(n);let i=0;for(let r=0,o=e.count;r<o;r++)Pt.fromBufferAttribute(e,r),i=Math.max(i,n.distanceToSquared(Pt));if(t)for(let r=0,o=t.length;r<o;r++){const a=t[r],l=this.morphTargetsRelative;for(let c=0,u=a.count;c<u;c++)Pt.fromBufferAttribute(a,c),l&&(Pi.fromBufferAttribute(e,c),Pt.add(Pi)),i=Math.max(i,n.distanceToSquared(Pt))}this.boundingSphere.radius=Math.sqrt(i),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){const e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}const n=t.position,i=t.normal,r=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new zt(new Float32Array(4*n.count),4));const o=this.getAttribute("tangent"),a=[],l=[];for(let F=0;F<n.count;F++)a[F]=new D,l[F]=new D;const c=new D,u=new D,d=new D,h=new Be,m=new Be,_=new Be,v=new D,g=new D;function p(F,M,S){c.fromBufferAttribute(n,F),u.fromBufferAttribute(n,M),d.fromBufferAttribute(n,S),h.fromBufferAttribute(r,F),m.fromBufferAttribute(r,M),_.fromBufferAttribute(r,S),u.sub(c),d.sub(c),m.sub(h),_.sub(h);const C=1/(m.x*_.y-_.x*m.y);isFinite(C)&&(v.copy(u).multiplyScalar(_.y).addScaledVector(d,-m.y).multiplyScalar(C),g.copy(d).multiplyScalar(m.x).addScaledVector(u,-_.x).multiplyScalar(C),a[F].add(v),a[M].add(v),a[S].add(v),l[F].add(g),l[M].add(g),l[S].add(g))}let A=this.groups;A.length===0&&(A=[{start:0,count:e.count}]);for(let F=0,M=A.length;F<M;++F){const S=A[F],C=S.start,Z=S.count;for(let q=C,X=C+Z;q<X;q+=3)p(e.getX(q+0),e.getX(q+1),e.getX(q+2))}const E=new D,b=new D,R=new D,P=new D;function I(F){R.fromBufferAttribute(i,F),P.copy(R);const M=a[F];E.copy(M),E.sub(R.multiplyScalar(R.dot(M))).normalize(),b.crossVectors(P,M);const C=b.dot(l[F])<0?-1:1;o.setXYZW(F,E.x,E.y,E.z,C)}for(let F=0,M=A.length;F<M;++F){const S=A[F],C=S.start,Z=S.count;for(let q=C,X=C+Z;q<X;q+=3)I(e.getX(q+0)),I(e.getX(q+1)),I(e.getX(q+2))}}computeVertexNormals(){const e=this.index,t=this.getAttribute("position");if(t!==void 0){let n=this.getAttribute("normal");if(n===void 0)n=new zt(new Float32Array(t.count*3),3),this.setAttribute("normal",n);else for(let h=0,m=n.count;h<m;h++)n.setXYZ(h,0,0,0);const i=new D,r=new D,o=new D,a=new D,l=new D,c=new D,u=new D,d=new D;if(e)for(let h=0,m=e.count;h<m;h+=3){const _=e.getX(h+0),v=e.getX(h+1),g=e.getX(h+2);i.fromBufferAttribute(t,_),r.fromBufferAttribute(t,v),o.fromBufferAttribute(t,g),u.subVectors(o,r),d.subVectors(i,r),u.cross(d),a.fromBufferAttribute(n,_),l.fromBufferAttribute(n,v),c.fromBufferAttribute(n,g),a.add(u),l.add(u),c.add(u),n.setXYZ(_,a.x,a.y,a.z),n.setXYZ(v,l.x,l.y,l.z),n.setXYZ(g,c.x,c.y,c.z)}else for(let h=0,m=t.count;h<m;h+=3)i.fromBufferAttribute(t,h+0),r.fromBufferAttribute(t,h+1),o.fromBufferAttribute(t,h+2),u.subVectors(o,r),d.subVectors(i,r),u.cross(d),n.setXYZ(h+0,u.x,u.y,u.z),n.setXYZ(h+1,u.x,u.y,u.z),n.setXYZ(h+2,u.x,u.y,u.z);this.normalizeNormals(),n.needsUpdate=!0}}normalizeNormals(){const e=this.attributes.normal;for(let t=0,n=e.count;t<n;t++)Pt.fromBufferAttribute(e,t),Pt.normalize(),e.setXYZ(t,Pt.x,Pt.y,Pt.z)}toNonIndexed(){function e(a,l){const c=a.array,u=a.itemSize,d=a.normalized,h=new c.constructor(l.length*u);let m=0,_=0;for(let v=0,g=l.length;v<g;v++){a.isInterleavedBufferAttribute?m=l[v]*a.data.stride+a.offset:m=l[v]*u;for(let p=0;p<u;p++)h[_++]=c[m++]}return new zt(h,u,d)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;const t=new Tn,n=this.index.array,i=this.attributes;for(const a in i){const l=i[a],c=e(l,n);t.setAttribute(a,c)}const r=this.morphAttributes;for(const a in r){const l=[],c=r[a];for(let u=0,d=c.length;u<d;u++){const h=c[u],m=e(h,n);l.push(m)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;const o=this.groups;for(let a=0,l=o.length;a<l;a++){const c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){const e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){const l=this.parameters;for(const c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};const t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});const n=this.attributes;for(const l in n){const c=n[l];e.data.attributes[l]=c.toJSON(e.data)}const i={};let r=!1;for(const l in this.morphAttributes){const c=this.morphAttributes[l],u=[];for(let d=0,h=c.length;d<h;d++){const m=c[d];u.push(m.toJSON(e.data))}u.length>0&&(i[l]=u,r=!0)}r&&(e.data.morphAttributes=i,e.data.morphTargetsRelative=this.morphTargetsRelative);const o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));const a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;const t={};this.name=e.name;const n=e.index;n!==null&&this.setIndex(n.clone());const i=e.attributes;for(const c in i){const u=i[c];this.setAttribute(c,u.clone(t))}const r=e.morphAttributes;for(const c in r){const u=[],d=r[c];for(let h=0,m=d.length;h<m;h++)u.push(d[h].clone(t));this.morphAttributes[c]=u}this.morphTargetsRelative=e.morphTargetsRelative;const o=e.groups;for(let c=0,u=o.length;c<u;c++){const d=o[c];this.addGroup(d.start,d.count,d.materialIndex)}const a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());const l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}}const sl=new Ye,oi=new Rs,Gs=new Mn,rl=new D,Ws=new D,Xs=new D,qs=new D,Kr=new D,js=new D,ol=new D,Ys=new D;class $t extends bt{constructor(e=new Tn,t=new pi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}getVertexPosition(e,t){const n=this.geometry,i=n.attributes.position,r=n.morphAttributes.position,o=n.morphTargetsRelative;t.fromBufferAttribute(i,e);const a=this.morphTargetInfluences;if(r&&a){js.set(0,0,0);for(let l=0,c=r.length;l<c;l++){const u=a[l],d=r[l];u!==0&&(Kr.fromBufferAttribute(d,e),o?js.addScaledVector(Kr,u):js.addScaledVector(Kr.sub(t),u))}t.add(js)}return t}raycast(e,t){const n=this.geometry,i=this.material,r=this.matrixWorld;i!==void 0&&(n.boundingSphere===null&&n.computeBoundingSphere(),Gs.copy(n.boundingSphere),Gs.applyMatrix4(r),oi.copy(e.ray).recast(e.near),!(Gs.containsPoint(oi.origin)===!1&&(oi.intersectSphere(Gs,rl)===null||oi.origin.distanceToSquared(rl)>(e.far-e.near)**2))&&(sl.copy(r).invert(),oi.copy(e.ray).applyMatrix4(sl),!(n.boundingBox!==null&&oi.intersectsBox(n.boundingBox)===!1)&&this._computeIntersections(e,t,oi)))}_computeIntersections(e,t,n){let i;const r=this.geometry,o=this.material,a=r.index,l=r.attributes.position,c=r.attributes.uv,u=r.attributes.uv1,d=r.attributes.normal,h=r.groups,m=r.drawRange;if(a!==null)if(Array.isArray(o))for(let _=0,v=h.length;_<v;_++){const g=h[_],p=o[g.materialIndex],A=Math.max(g.start,m.start),E=Math.min(a.count,Math.min(g.start+g.count,m.start+m.count));for(let b=A,R=E;b<R;b+=3){const P=a.getX(b),I=a.getX(b+1),F=a.getX(b+2);i=Ks(this,p,e,n,c,u,d,P,I,F),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const _=Math.max(0,m.start),v=Math.min(a.count,m.start+m.count);for(let g=_,p=v;g<p;g+=3){const A=a.getX(g),E=a.getX(g+1),b=a.getX(g+2);i=Ks(this,o,e,n,c,u,d,A,E,b),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}else if(l!==void 0)if(Array.isArray(o))for(let _=0,v=h.length;_<v;_++){const g=h[_],p=o[g.materialIndex],A=Math.max(g.start,m.start),E=Math.min(l.count,Math.min(g.start+g.count,m.start+m.count));for(let b=A,R=E;b<R;b+=3){const P=b,I=b+1,F=b+2;i=Ks(this,p,e,n,c,u,d,P,I,F),i&&(i.faceIndex=Math.floor(b/3),i.face.materialIndex=g.materialIndex,t.push(i))}}else{const _=Math.max(0,m.start),v=Math.min(l.count,m.start+m.count);for(let g=_,p=v;g<p;g+=3){const A=g,E=g+1,b=g+2;i=Ks(this,o,e,n,c,u,d,A,E,b),i&&(i.faceIndex=Math.floor(g/3),t.push(i))}}}}function Zh(s,e,t,n,i,r,o,a){let l;if(e.side===Xt?l=n.intersectTriangle(o,r,i,!0,a):l=n.intersectTriangle(i,r,o,e.side===Bn,a),l===null)return null;Ys.copy(a),Ys.applyMatrix4(s.matrixWorld);const c=t.ray.origin.distanceTo(Ys);return c<t.near||c>t.far?null:{distance:c,point:Ys.clone(),object:s}}function Ks(s,e,t,n,i,r,o,a,l,c){s.getVertexPosition(a,Ws),s.getVertexPosition(l,Xs),s.getVertexPosition(c,qs);const u=Zh(s,e,t,n,Ws,Xs,qs,ol);if(u){const d=new D;dn.getBarycoord(ol,Ws,Xs,qs,d),i&&(u.uv=dn.getInterpolatedAttribute(i,a,l,c,d,new Be)),r&&(u.uv1=dn.getInterpolatedAttribute(r,a,l,c,d,new Be)),o&&(u.normal=dn.getInterpolatedAttribute(o,a,l,c,d,new D),u.normal.dot(n.direction)>0&&u.normal.multiplyScalar(-1));const h={a,b:l,c,normal:new D,materialIndex:0};dn.getNormal(Ws,Xs,qs,h.normal),u.face=h,u.barycoord=d}return u}class Ps extends Tn{constructor(e=1,t=1,n=1,i=1,r=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:n,widthSegments:i,heightSegments:r,depthSegments:o};const a=this;i=Math.floor(i),r=Math.floor(r),o=Math.floor(o);const l=[],c=[],u=[],d=[];let h=0,m=0;_("z","y","x",-1,-1,n,t,e,o,r,0),_("z","y","x",1,-1,n,t,-e,o,r,1),_("x","z","y",1,1,e,n,t,i,o,2),_("x","z","y",1,-1,e,n,-t,i,o,3),_("x","y","z",1,-1,e,t,n,i,r,4),_("x","y","z",-1,-1,e,t,-n,i,r,5),this.setIndex(l),this.setAttribute("position",new kn(c,3)),this.setAttribute("normal",new kn(u,3)),this.setAttribute("uv",new kn(d,2));function _(v,g,p,A,E,b,R,P,I,F,M){const S=b/I,C=R/F,Z=b/2,q=R/2,X=P/2,j=I+1,B=F+1;let Q=0,V=0;const ee=new D;for(let oe=0;oe<B;oe++){const pe=oe*C-q;for(let Oe=0;Oe<j;Oe++){const st=Oe*S-Z;ee[v]=st*A,ee[g]=pe*E,ee[p]=X,c.push(ee.x,ee.y,ee.z),ee[v]=0,ee[g]=0,ee[p]=P>0?1:-1,u.push(ee.x,ee.y,ee.z),d.push(Oe/I),d.push(1-oe/F),Q+=1}}for(let oe=0;oe<F;oe++)for(let pe=0;pe<I;pe++){const Oe=h+pe+j*oe,st=h+pe+j*(oe+1),rt=h+(pe+1)+j*(oe+1),Y=h+(pe+1)+j*oe;l.push(Oe,st,Y),l.push(st,rt,Y),V+=6}a.addGroup(m,V,M),m+=V,h+=Q}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Ps(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}}function Ji(s){const e={};for(const t in s){e[t]={};for(const n in s[t]){const i=s[t][n];i&&(i.isColor||i.isMatrix3||i.isMatrix4||i.isVector2||i.isVector3||i.isVector4||i.isTexture||i.isQuaternion)?i.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][n]=null):e[t][n]=i.clone():Array.isArray(i)?e[t][n]=i.slice():e[t][n]=i}}return e}function Bt(s){const e={};for(let t=0;t<s.length;t++){const n=Ji(s[t]);for(const i in n)e[i]=n[i]}return e}function Jh(s){const e=[];for(let t=0;t<s.length;t++)e.push(s[t].clone());return e}function Uc(s){const e=s.getRenderTarget();return e===null?s.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:Qe.workingColorSpace}const $h={clone:Ji,merge:Bt};var Qh=`void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`,ef=`void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;class ei extends yn{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Qh,this.fragmentShader=ef,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=Ji(e.uniforms),this.uniformsGroups=Jh(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){const t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(const i in this.uniforms){const o=this.uniforms[i].value;o&&o.isTexture?t.uniforms[i]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[i]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[i]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[i]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[i]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[i]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[i]={type:"m4",value:o.toArray()}:t.uniforms[i]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;const n={};for(const i in this.extensions)this.extensions[i]===!0&&(n[i]=!0);return Object.keys(n).length>0&&(t.extensions=n),t}}class Nc extends bt{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Ye,this.projectionMatrix=new Ye,this.projectionMatrixInverse=new Ye,this.coordinateSystem=xn,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}}const qn=new D,al=new Be,ll=new Be;class Ft extends Nc{constructor(e=50,t=1,n=.1,i=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=n,this.far=i,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){const t=.5*this.getFilmHeight()/e;this.fov=Zi*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){const e=Math.tan(vs*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return Zi*2*Math.atan(Math.tan(vs*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,n){qn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(qn.x,qn.y).multiplyScalar(-e/qn.z),qn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),n.set(qn.x,qn.y).multiplyScalar(-e/qn.z)}getViewSize(e,t){return this.getViewBounds(e,al,ll),t.subVectors(ll,al)}setViewOffset(e,t,n,i,r,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=this.near;let t=e*Math.tan(vs*.5*this.fov)/this.zoom,n=2*t,i=this.aspect*n,r=-.5*i;const o=this.view;if(this.view!==null&&this.view.enabled){const l=o.fullWidth,c=o.fullHeight;r+=o.offsetX*i/l,t-=o.offsetY*n/c,i*=o.width/l,n*=o.height/c}const a=this.filmOffset;a!==0&&(r+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(r,r+i,t,t-n,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}}const Ii=-90,Li=1;class tf extends bt{constructor(e,t,n){super(),this.type="CubeCamera",this.renderTarget=n,this.coordinateSystem=null,this.activeMipmapLevel=0;const i=new Ft(Ii,Li,e,t);i.layers=this.layers,this.add(i);const r=new Ft(Ii,Li,e,t);r.layers=this.layers,this.add(r);const o=new Ft(Ii,Li,e,t);o.layers=this.layers,this.add(o);const a=new Ft(Ii,Li,e,t);a.layers=this.layers,this.add(a);const l=new Ft(Ii,Li,e,t);l.layers=this.layers,this.add(l);const c=new Ft(Ii,Li,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){const e=this.coordinateSystem,t=this.children.concat(),[n,i,r,o,a,l]=t;for(const c of t)this.remove(c);if(e===xn)n.up.set(0,1,0),n.lookAt(1,0,0),i.up.set(0,1,0),i.lookAt(-1,0,0),r.up.set(0,0,-1),r.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===xr)n.up.set(0,-1,0),n.lookAt(-1,0,0),i.up.set(0,-1,0),i.lookAt(1,0,0),r.up.set(0,0,1),r.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(const c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();const{renderTarget:n,activeMipmapLevel:i}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());const[r,o,a,l,c,u]=this.children,d=e.getRenderTarget(),h=e.getActiveCubeFace(),m=e.getActiveMipmapLevel(),_=e.xr.enabled;e.xr.enabled=!1;const v=n.texture.generateMipmaps;n.texture.generateMipmaps=!1,e.setRenderTarget(n,0,i),e.render(t,r),e.setRenderTarget(n,1,i),e.render(t,o),e.setRenderTarget(n,2,i),e.render(t,a),e.setRenderTarget(n,3,i),e.render(t,l),e.setRenderTarget(n,4,i),e.render(t,c),n.texture.generateMipmaps=v,e.setRenderTarget(n,5,i),e.render(t,u),e.setRenderTarget(d,h,m),e.xr.enabled=_,n.texture.needsPMREMUpdate=!0}}class Fc extends Dt{constructor(e=[],t=ji,n,i,r,o,a,l,c,u){super(e,t,n,i,r,o,a,l,c,u),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}}class nf extends _i{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;const n={width:e,height:e,depth:1},i=[n,n,n,n,n,n];this.texture=new Fc(i),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;const n={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},i=new Ps(5,5,5),r=new ei({name:"CubemapFromEquirect",uniforms:Ji(n.uniforms),vertexShader:n.vertexShader,fragmentShader:n.fragmentShader,side:Xt,blending:$n});r.uniforms.tEquirect.value=t;const o=new $t(i,r),a=t.minFilter;return t.minFilter===Nn&&(t.minFilter=Zt),new tf(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,n=!0,i=!0){const r=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,n,i);e.setRenderTarget(r)}}class mi extends bt{constructor(){super(),this.isGroup=!0,this.type="Group"}}const sf={type:"move"};class Zr{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new mi,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new mi,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new D,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new D),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new mi,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new D,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new D),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){const t=this._hand;if(t)for(const n of e.hand.values())this._getHandJoint(t,n)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,n){let i=null,r=null,o=null;const a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(const v of e.hand.values()){const g=t.getJointPose(v,n),p=this._getHandJoint(c,v);g!==null&&(p.matrix.fromArray(g.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=g.radius),p.visible=g!==null}const u=c.joints["index-finger-tip"],d=c.joints["thumb-tip"],h=u.position.distanceTo(d.position),m=.02,_=.005;c.inputState.pinching&&h>m+_?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&h<=m-_&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(r=t.getPose(e.gripSpace,n),r!==null&&(l.matrix.fromArray(r.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,r.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(r.linearVelocity)):l.hasLinearVelocity=!1,r.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(r.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(i=t.getPose(e.targetRaySpace,n),i===null&&r!==null&&(i=r),i!==null&&(a.matrix.fromArray(i.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,i.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(i.linearVelocity)):a.hasLinearVelocity=!1,i.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(i.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(sf)))}return a!==null&&(a.visible=i!==null),l!==null&&(l.visible=r!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){const n=new mi;n.matrixAutoUpdate=!1,n.visible=!1,e.joints[t.jointName]=n,e.add(n)}return e.joints[t.jointName]}}class rf extends bt{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Sn,this.environmentIntensity=1,this.environmentRotation=new Sn,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){const t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}}class of{constructor(e,t){this.isInterleavedBuffer=!0,this.array=e,this.stride=t,this.count=e!==void 0?e.length/t:0,this.usage=ea,this.updateRanges=[],this.version=0,this.uuid=fn()}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.array=new e.array.constructor(e.array),this.count=e.count,this.stride=e.stride,this.usage=e.usage,this}copyAt(e,t,n){e*=this.stride,n*=t.stride;for(let i=0,r=this.stride;i<r;i++)this.array[e+i]=t.array[n+i];return this}set(e,t=0){return this.array.set(e,t),this}clone(e){e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=this.array.slice(0).buffer);const t=new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]),n=new this.constructor(t,this.stride);return n.setUsage(this.usage),n}onUpload(e){return this.onUploadCallback=e,this}toJSON(e){return e.arrayBuffers===void 0&&(e.arrayBuffers={}),this.array.buffer._uuid===void 0&&(this.array.buffer._uuid=fn()),e.arrayBuffers[this.array.buffer._uuid]===void 0&&(e.arrayBuffers[this.array.buffer._uuid]=Array.from(new Uint32Array(this.array.buffer))),{uuid:this.uuid,buffer:this.array.buffer._uuid,type:this.array.constructor.name,stride:this.stride}}}const kt=new D;class xa{constructor(e,t,n,i=!1){this.isInterleavedBufferAttribute=!0,this.name="",this.data=e,this.itemSize=t,this.offset=n,this.normalized=i}get count(){return this.data.count}get array(){return this.data.array}set needsUpdate(e){this.data.needsUpdate=e}applyMatrix4(e){for(let t=0,n=this.data.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyMatrix4(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}applyNormalMatrix(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.applyNormalMatrix(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}transformDirection(e){for(let t=0,n=this.count;t<n;t++)kt.fromBufferAttribute(this,t),kt.transformDirection(e),this.setXYZ(t,kt.x,kt.y,kt.z);return this}getComponent(e,t){let n=this.array[e*this.data.stride+this.offset+t];return this.normalized&&(n=un(n,this.array)),n}setComponent(e,t,n){return this.normalized&&(n=ut(n,this.array)),this.data.array[e*this.data.stride+this.offset+t]=n,this}setX(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset]=t,this}setY(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+1]=t,this}setZ(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+2]=t,this}setW(e,t){return this.normalized&&(t=ut(t,this.array)),this.data.array[e*this.data.stride+this.offset+3]=t,this}getX(e){let t=this.data.array[e*this.data.stride+this.offset];return this.normalized&&(t=un(t,this.array)),t}getY(e){let t=this.data.array[e*this.data.stride+this.offset+1];return this.normalized&&(t=un(t,this.array)),t}getZ(e){let t=this.data.array[e*this.data.stride+this.offset+2];return this.normalized&&(t=un(t,this.array)),t}getW(e){let t=this.data.array[e*this.data.stride+this.offset+3];return this.normalized&&(t=un(t,this.array)),t}setXY(e,t,n){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this}setXYZ(e,t,n,i){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),i=ut(i,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this}setXYZW(e,t,n,i,r){return e=e*this.data.stride+this.offset,this.normalized&&(t=ut(t,this.array),n=ut(n,this.array),i=ut(i,this.array),r=ut(r,this.array)),this.data.array[e+0]=t,this.data.array[e+1]=n,this.data.array[e+2]=i,this.data.array[e+3]=r,this}clone(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return new zt(new this.array.constructor(t),this.itemSize,this.normalized)}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.clone(e)),new xa(e.interleavedBuffers[this.data.uuid],this.itemSize,this.offset,this.normalized)}toJSON(e){if(e===void 0){console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");const t=[];for(let n=0;n<this.count;n++){const i=n*this.data.stride+this.offset;for(let r=0;r<this.itemSize;r++)t.push(this.data.array[i+r])}return{itemSize:this.itemSize,type:this.array.constructor.name,array:t,normalized:this.normalized}}else return e.interleavedBuffers===void 0&&(e.interleavedBuffers={}),e.interleavedBuffers[this.data.uuid]===void 0&&(e.interleavedBuffers[this.data.uuid]=this.data.toJSON(e)),{isInterleavedBufferAttribute:!0,itemSize:this.itemSize,data:this.data.uuid,offset:this.offset,normalized:this.normalized}}}const cl=new D,ul=new ot,dl=new ot,af=new D,hl=new Ye,Zs=new D,Jr=new Mn,fl=new Ye,$r=new Rs;class lf extends $t{constructor(e,t){super(e,t),this.isSkinnedMesh=!0,this.type="SkinnedMesh",this.bindMode=Ha,this.bindMatrix=new Ye,this.bindMatrixInverse=new Ye,this.boundingBox=null,this.boundingSphere=null}computeBoundingBox(){const e=this.geometry;this.boundingBox===null&&(this.boundingBox=new Jt),this.boundingBox.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zs),this.boundingBox.expandByPoint(Zs)}computeBoundingSphere(){const e=this.geometry;this.boundingSphere===null&&(this.boundingSphere=new Mn),this.boundingSphere.makeEmpty();const t=e.getAttribute("position");for(let n=0;n<t.count;n++)this.getVertexPosition(n,Zs),this.boundingSphere.expandByPoint(Zs)}copy(e,t){return super.copy(e,t),this.bindMode=e.bindMode,this.bindMatrix.copy(e.bindMatrix),this.bindMatrixInverse.copy(e.bindMatrixInverse),this.skeleton=e.skeleton,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}raycast(e,t){const n=this.material,i=this.matrixWorld;n!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),Jr.copy(this.boundingSphere),Jr.applyMatrix4(i),e.ray.intersectsSphere(Jr)!==!1&&(fl.copy(i).invert(),$r.copy(e.ray).applyMatrix4(fl),!(this.boundingBox!==null&&$r.intersectsBox(this.boundingBox)===!1)&&this._computeIntersections(e,t,$r)))}getVertexPosition(e,t){return super.getVertexPosition(e,t),this.applyBoneTransform(e,t),t}bind(e,t){this.skeleton=e,t===void 0&&(this.updateMatrixWorld(!0),this.skeleton.calculateInverses(),t=this.matrixWorld),this.bindMatrix.copy(t),this.bindMatrixInverse.copy(t).invert()}pose(){this.skeleton.pose()}normalizeSkinWeights(){const e=new ot,t=this.geometry.attributes.skinWeight;for(let n=0,i=t.count;n<i;n++){e.fromBufferAttribute(t,n);const r=1/e.manhattanLength();r!==1/0?e.multiplyScalar(r):e.set(1,0,0,0),t.setXYZW(n,e.x,e.y,e.z,e.w)}}updateMatrixWorld(e){super.updateMatrixWorld(e),this.bindMode===Ha?this.bindMatrixInverse.copy(this.matrixWorld).invert():this.bindMode===eh?this.bindMatrixInverse.copy(this.bindMatrix).invert():console.warn("THREE.SkinnedMesh: Unrecognized bindMode: "+this.bindMode)}applyBoneTransform(e,t){const n=this.skeleton,i=this.geometry;ul.fromBufferAttribute(i.attributes.skinIndex,e),dl.fromBufferAttribute(i.attributes.skinWeight,e),cl.copy(t).applyMatrix4(this.bindMatrix),t.set(0,0,0);for(let r=0;r<4;r++){const o=dl.getComponent(r);if(o!==0){const a=ul.getComponent(r);hl.multiplyMatrices(n.bones[a].matrixWorld,n.boneInverses[a]),t.addScaledVector(af.copy(cl).applyMatrix4(hl),o)}}return t.applyMatrix4(this.bindMatrixInverse)}}class Oc extends bt{constructor(){super(),this.isBone=!0,this.type="Bone"}}class kc extends Dt{constructor(e=null,t=1,n=1,i,r,o,a,l,c=Vt,u=Vt,d,h){super(null,o,a,l,c,u,i,r,d,h),this.isDataTexture=!0,this.image={data:e,width:t,height:n},this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}}const pl=new Ye,cf=new Ye;class ya{constructor(e=[],t=[]){this.uuid=fn(),this.bones=e.slice(0),this.boneInverses=t,this.boneMatrices=null,this.boneTexture=null,this.init()}init(){const e=this.bones,t=this.boneInverses;if(this.boneMatrices=new Float32Array(e.length*16),t.length===0)this.calculateInverses();else if(e.length!==t.length){console.warn("THREE.Skeleton: Number of inverse bone matrices does not match amount of bones."),this.boneInverses=[];for(let n=0,i=this.bones.length;n<i;n++)this.boneInverses.push(new Ye)}}calculateInverses(){this.boneInverses.length=0;for(let e=0,t=this.bones.length;e<t;e++){const n=new Ye;this.bones[e]&&n.copy(this.bones[e].matrixWorld).invert(),this.boneInverses.push(n)}}pose(){for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&n.matrixWorld.copy(this.boneInverses[e]).invert()}for(let e=0,t=this.bones.length;e<t;e++){const n=this.bones[e];n&&(n.parent&&n.parent.isBone?(n.matrix.copy(n.parent.matrixWorld).invert(),n.matrix.multiply(n.matrixWorld)):n.matrix.copy(n.matrixWorld),n.matrix.decompose(n.position,n.quaternion,n.scale))}}update(){const e=this.bones,t=this.boneInverses,n=this.boneMatrices,i=this.boneTexture;for(let r=0,o=e.length;r<o;r++){const a=e[r]?e[r].matrixWorld:cf;pl.multiplyMatrices(a,t[r]),pl.toArray(n,r*16)}i!==null&&(i.needsUpdate=!0)}clone(){return new ya(this.bones,this.boneInverses)}computeBoneTexture(){let e=Math.sqrt(this.bones.length*4);e=Math.ceil(e/4)*4,e=Math.max(e,4);const t=new Float32Array(e*e*4);t.set(this.boneMatrices);const n=new kc(t,e,e,on,hn);return n.needsUpdate=!0,this.boneMatrices=t,this.boneTexture=n,this}getBoneByName(e){for(let t=0,n=this.bones.length;t<n;t++){const i=this.bones[t];if(i.name===e)return i}}dispose(){this.boneTexture!==null&&(this.boneTexture.dispose(),this.boneTexture=null)}fromJSON(e,t){this.uuid=e.uuid;for(let n=0,i=e.bones.length;n<i;n++){const r=e.bones[n];let o=t[r];o===void 0&&(console.warn("THREE.Skeleton: No bone found with UUID:",r),o=new Oc),this.bones.push(o),this.boneInverses.push(new Ye().fromArray(e.boneInverses[n]))}return this.init(),this}toJSON(){const e={metadata:{version:4.7,type:"Skeleton",generator:"Skeleton.toJSON"},bones:[],boneInverses:[]};e.uuid=this.uuid;const t=this.bones,n=this.boneInverses;for(let i=0,r=t.length;i<r;i++){const o=t[i];e.bones.push(o.uuid);const a=n[i];e.boneInverses.push(a.toArray())}return e}}class ta extends zt{constructor(e,t,n,i=1){super(e,t,n),this.isInstancedBufferAttribute=!0,this.meshPerAttribute=i}copy(e){return super.copy(e),this.meshPerAttribute=e.meshPerAttribute,this}toJSON(){const e=super.toJSON();return e.meshPerAttribute=this.meshPerAttribute,e.isInstancedBufferAttribute=!0,e}}const Di=new Ye,ml=new Ye,Js=[],gl=new Jt,uf=new Ye,us=new $t,ds=new Mn;class df extends $t{constructor(e,t,n){super(e,t),this.isInstancedMesh=!0,this.instanceMatrix=new ta(new Float32Array(n*16),16),this.instanceColor=null,this.morphTexture=null,this.count=n,this.boundingBox=null,this.boundingSphere=null;for(let i=0;i<n;i++)this.setMatrixAt(i,uf)}computeBoundingBox(){const e=this.geometry,t=this.count;this.boundingBox===null&&(this.boundingBox=new Jt),e.boundingBox===null&&e.computeBoundingBox(),this.boundingBox.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Di),gl.copy(e.boundingBox).applyMatrix4(Di),this.boundingBox.union(gl)}computeBoundingSphere(){const e=this.geometry,t=this.count;this.boundingSphere===null&&(this.boundingSphere=new Mn),e.boundingSphere===null&&e.computeBoundingSphere(),this.boundingSphere.makeEmpty();for(let n=0;n<t;n++)this.getMatrixAt(n,Di),ds.copy(e.boundingSphere).applyMatrix4(Di),this.boundingSphere.union(ds)}copy(e,t){return super.copy(e,t),this.instanceMatrix.copy(e.instanceMatrix),e.morphTexture!==null&&(this.morphTexture=e.morphTexture.clone()),e.instanceColor!==null&&(this.instanceColor=e.instanceColor.clone()),this.count=e.count,e.boundingBox!==null&&(this.boundingBox=e.boundingBox.clone()),e.boundingSphere!==null&&(this.boundingSphere=e.boundingSphere.clone()),this}getColorAt(e,t){t.fromArray(this.instanceColor.array,e*3)}getMatrixAt(e,t){t.fromArray(this.instanceMatrix.array,e*16)}getMorphAt(e,t){const n=t.morphTargetInfluences,i=this.morphTexture.source.data.data,r=n.length+1,o=e*r+1;for(let a=0;a<n.length;a++)n[a]=i[o+a]}raycast(e,t){const n=this.matrixWorld,i=this.count;if(us.geometry=this.geometry,us.material=this.material,us.material!==void 0&&(this.boundingSphere===null&&this.computeBoundingSphere(),ds.copy(this.boundingSphere),ds.applyMatrix4(n),e.ray.intersectsSphere(ds)!==!1))for(let r=0;r<i;r++){this.getMatrixAt(r,Di),ml.multiplyMatrices(n,Di),us.matrixWorld=ml,us.raycast(e,Js);for(let o=0,a=Js.length;o<a;o++){const l=Js[o];l.instanceId=r,l.object=this,t.push(l)}Js.length=0}}setColorAt(e,t){this.instanceColor===null&&(this.instanceColor=new ta(new Float32Array(this.instanceMatrix.count*3).fill(1),3)),t.toArray(this.instanceColor.array,e*3)}setMatrixAt(e,t){t.toArray(this.instanceMatrix.array,e*16)}setMorphAt(e,t){const n=t.morphTargetInfluences,i=n.length+1;this.morphTexture===null&&(this.morphTexture=new kc(new Float32Array(i*this.count),i,this.count,da,hn));const r=this.morphTexture.source.data.data;let o=0;for(let c=0;c<n.length;c++)o+=n[c];const a=this.geometry.morphTargetsRelative?1:1-o,l=i*e;r[l]=a,r.set(n,l+1)}updateMorphTargets(){}dispose(){this.dispatchEvent({type:"dispose"}),this.morphTexture!==null&&(this.morphTexture.dispose(),this.morphTexture=null)}}const Qr=new D,hf=new D,ff=new qe;class Kn{constructor(e=new D(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,n,i){return this.normal.set(e,t,n),this.constant=i,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,n){const i=Qr.subVectors(n,t).cross(hf.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(i,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){const e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){const n=e.delta(Qr),i=this.normal.dot(n);if(i===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;const r=-(e.start.dot(this.normal)+this.constant)/i;return r<0||r>1?null:t.copy(e.start).addScaledVector(n,r)}intersectsLine(e){const t=this.distanceToPoint(e.start),n=this.distanceToPoint(e.end);return t<0&&n>0||n<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){const n=t||ff.getNormalMatrix(e),i=this.coplanarPoint(Qr).applyMatrix4(e),r=this.normal.applyMatrix3(n).normalize();return this.constant=-i.dot(r),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}}const ai=new Mn,pf=new Be(.5,.5),$s=new D;class ba{constructor(e=new Kn,t=new Kn,n=new Kn,i=new Kn,r=new Kn,o=new Kn){this.planes=[e,t,n,i,r,o]}set(e,t,n,i,r,o){const a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(n),a[3].copy(i),a[4].copy(r),a[5].copy(o),this}copy(e){const t=this.planes;for(let n=0;n<6;n++)t[n].copy(e.planes[n]);return this}setFromProjectionMatrix(e,t=xn,n=!1){const i=this.planes,r=e.elements,o=r[0],a=r[1],l=r[2],c=r[3],u=r[4],d=r[5],h=r[6],m=r[7],_=r[8],v=r[9],g=r[10],p=r[11],A=r[12],E=r[13],b=r[14],R=r[15];if(i[0].setComponents(c-o,m-u,p-_,R-A).normalize(),i[1].setComponents(c+o,m+u,p+_,R+A).normalize(),i[2].setComponents(c+a,m+d,p+v,R+E).normalize(),i[3].setComponents(c-a,m-d,p-v,R-E).normalize(),n)i[4].setComponents(l,h,g,b).normalize(),i[5].setComponents(c-l,m-h,p-g,R-b).normalize();else if(i[4].setComponents(c-l,m-h,p-g,R-b).normalize(),t===xn)i[5].setComponents(c+l,m+h,p+g,R+b).normalize();else if(t===xr)i[5].setComponents(l,h,g,b).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),ai.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{const t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),ai.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(ai)}intersectsSprite(e){ai.center.set(0,0,0);const t=pf.distanceTo(e.center);return ai.radius=.7071067811865476+t,ai.applyMatrix4(e.matrixWorld),this.intersectsSphere(ai)}intersectsSphere(e){const t=this.planes,n=e.center,i=-e.radius;for(let r=0;r<6;r++)if(t[r].distanceToPoint(n)<i)return!1;return!0}intersectsBox(e){const t=this.planes;for(let n=0;n<6;n++){const i=t[n];if($s.x=i.normal.x>0?e.max.x:e.min.x,$s.y=i.normal.y>0?e.max.y:e.min.y,$s.z=i.normal.z>0?e.max.z:e.min.z,i.distanceToPoint($s)<0)return!1}return!0}containsPoint(e){const t=this.planes;for(let n=0;n<6;n++)if(t[n].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}}class Bc extends yn{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new ze(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}}const yr=new D,br=new D,_l=new Ye,hs=new Rs,Qs=new Mn,eo=new D,vl=new D;class Sa extends bt{constructor(e=new Tn,t=new Bc){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[0];for(let i=1,r=t.count;i<r;i++)yr.fromBufferAttribute(t,i-1),br.fromBufferAttribute(t,i),n[i]=n[i-1],n[i]+=yr.distanceTo(br);e.setAttribute("lineDistance",new kn(n,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Line.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),Qs.copy(n.boundingSphere),Qs.applyMatrix4(i),Qs.radius+=r,e.ray.intersectsSphere(Qs)===!1)return;_l.copy(i).invert(),hs.copy(e.ray).applyMatrix4(_l);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,u=n.index,h=n.attributes.position;if(u!==null){const m=Math.max(0,o.start),_=Math.min(u.count,o.start+o.count);for(let v=m,g=_-1;v<g;v+=c){const p=u.getX(v),A=u.getX(v+1),E=er(this,e,hs,l,p,A,v);E&&t.push(E)}if(this.isLineLoop){const v=u.getX(_-1),g=u.getX(m),p=er(this,e,hs,l,v,g,_-1);p&&t.push(p)}}else{const m=Math.max(0,o.start),_=Math.min(h.count,o.start+o.count);for(let v=m,g=_-1;v<g;v+=c){const p=er(this,e,hs,l,v,v+1,v);p&&t.push(p)}if(this.isLineLoop){const v=er(this,e,hs,l,_-1,m,_-1);v&&t.push(v)}}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function er(s,e,t,n,i,r,o){const a=s.geometry.attributes.position;if(yr.fromBufferAttribute(a,i),br.fromBufferAttribute(a,r),t.distanceSqToSegment(yr,br,eo,vl)>n)return;eo.applyMatrix4(s.matrixWorld);const c=e.ray.origin.distanceTo(eo);if(!(c<e.near||c>e.far))return{distance:c,point:vl.clone().applyMatrix4(s.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:s}}const xl=new D,yl=new D;class mf extends Sa{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){const e=this.geometry;if(e.index===null){const t=e.attributes.position,n=[];for(let i=0,r=t.count;i<r;i+=2)xl.fromBufferAttribute(t,i),yl.fromBufferAttribute(t,i+1),n[i]=i===0?0:n[i-1],n[i+1]=n[i]+xl.distanceTo(yl);e.setAttribute("lineDistance",new kn(n,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}}class gf extends Sa{constructor(e,t){super(e,t),this.isLineLoop=!0,this.type="LineLoop"}}class Vc extends yn{constructor(e){super(),this.isPointsMaterial=!0,this.type="PointsMaterial",this.color=new ze(16777215),this.map=null,this.alphaMap=null,this.size=1,this.sizeAttenuation=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.alphaMap=e.alphaMap,this.size=e.size,this.sizeAttenuation=e.sizeAttenuation,this.fog=e.fog,this}}const bl=new Ye,na=new Rs,tr=new Mn,nr=new D;class _f extends bt{constructor(e=new Tn,t=new Vc){super(),this.isPoints=!0,this.type="Points",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}raycast(e,t){const n=this.geometry,i=this.matrixWorld,r=e.params.Points.threshold,o=n.drawRange;if(n.boundingSphere===null&&n.computeBoundingSphere(),tr.copy(n.boundingSphere),tr.applyMatrix4(i),tr.radius+=r,e.ray.intersectsSphere(tr)===!1)return;bl.copy(i).invert(),na.copy(e.ray).applyMatrix4(bl);const a=r/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=n.index,d=n.attributes.position;if(c!==null){const h=Math.max(0,o.start),m=Math.min(c.count,o.start+o.count);for(let _=h,v=m;_<v;_++){const g=c.getX(_);nr.fromBufferAttribute(d,g),Sl(nr,g,l,i,e,t,this)}}else{const h=Math.max(0,o.start),m=Math.min(d.count,o.start+o.count);for(let _=h,v=m;_<v;_++)nr.fromBufferAttribute(d,_),Sl(nr,_,l,i,e,t,this)}}updateMorphTargets(){const t=this.geometry.morphAttributes,n=Object.keys(t);if(n.length>0){const i=t[n[0]];if(i!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let r=0,o=i.length;r<o;r++){const a=i[r].name||String(r);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=r}}}}}function Sl(s,e,t,n,i,r,o){const a=na.distanceSqToPoint(s);if(a<t){const l=new D;na.closestPointToPoint(s,l),l.applyMatrix4(n);const c=i.ray.origin.distanceTo(l);if(c<i.near||c>i.far)return;r.push({distance:c,distanceToRay:Math.sqrt(a),point:l,index:e,face:null,faceIndex:null,barycoord:null,object:o})}}class zc extends Dt{constructor(e,t,n=gi,i,r,o,a=Vt,l=Vt,c,u=Ms,d=1){if(u!==Ms&&u!==Ts)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");const h={width:e,height:t,depth:d};super(h,i,r,o,a,l,u,n,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new va(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){const t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}}class Mr extends Tn{constructor(e=1,t=1,n=1,i=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:n,heightSegments:i};const r=e/2,o=t/2,a=Math.floor(n),l=Math.floor(i),c=a+1,u=l+1,d=e/a,h=t/l,m=[],_=[],v=[],g=[];for(let p=0;p<u;p++){const A=p*h-o;for(let E=0;E<c;E++){const b=E*d-r;_.push(b,-A,0),v.push(0,0,1),g.push(E/a),g.push(1-p/l)}}for(let p=0;p<l;p++)for(let A=0;A<a;A++){const E=A+c*p,b=A+c*(p+1),R=A+1+c*(p+1),P=A+1+c*p;m.push(E,b,P),m.push(b,R,P)}this.setIndex(m),this.setAttribute("position",new kn(_,3)),this.setAttribute("normal",new kn(v,3)),this.setAttribute("uv",new kn(g,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new Mr(e.width,e.height,e.widthSegments,e.heightSegments)}}class Ma extends yn{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new ze(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new ze(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=Ac,this.normalScale=new Be(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Sn,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}}class En extends Ma{constructor(e){super(),this.isMeshPhysicalMaterial=!0,this.defines={STANDARD:"",PHYSICAL:""},this.type="MeshPhysicalMaterial",this.anisotropyRotation=0,this.anisotropyMap=null,this.clearcoatMap=null,this.clearcoatRoughness=0,this.clearcoatRoughnessMap=null,this.clearcoatNormalScale=new Be(1,1),this.clearcoatNormalMap=null,this.ior=1.5,Object.defineProperty(this,"reflectivity",{get:function(){return Ke(2.5*(this.ior-1)/(this.ior+1),0,1)},set:function(t){this.ior=(1+.4*t)/(1-.4*t)}}),this.iridescenceMap=null,this.iridescenceIOR=1.3,this.iridescenceThicknessRange=[100,400],this.iridescenceThicknessMap=null,this.sheenColor=new ze(0),this.sheenColorMap=null,this.sheenRoughness=1,this.sheenRoughnessMap=null,this.transmissionMap=null,this.thickness=0,this.thicknessMap=null,this.attenuationDistance=1/0,this.attenuationColor=new ze(1,1,1),this.specularIntensity=1,this.specularIntensityMap=null,this.specularColor=new ze(1,1,1),this.specularColorMap=null,this._anisotropy=0,this._clearcoat=0,this._dispersion=0,this._iridescence=0,this._sheen=0,this._transmission=0,this.setValues(e)}get anisotropy(){return this._anisotropy}set anisotropy(e){this._anisotropy>0!=e>0&&this.version++,this._anisotropy=e}get clearcoat(){return this._clearcoat}set clearcoat(e){this._clearcoat>0!=e>0&&this.version++,this._clearcoat=e}get iridescence(){return this._iridescence}set iridescence(e){this._iridescence>0!=e>0&&this.version++,this._iridescence=e}get dispersion(){return this._dispersion}set dispersion(e){this._dispersion>0!=e>0&&this.version++,this._dispersion=e}get sheen(){return this._sheen}set sheen(e){this._sheen>0!=e>0&&this.version++,this._sheen=e}get transmission(){return this._transmission}set transmission(e){this._transmission>0!=e>0&&this.version++,this._transmission=e}copy(e){return super.copy(e),this.defines={STANDARD:"",PHYSICAL:""},this.anisotropy=e.anisotropy,this.anisotropyRotation=e.anisotropyRotation,this.anisotropyMap=e.anisotropyMap,this.clearcoat=e.clearcoat,this.clearcoatMap=e.clearcoatMap,this.clearcoatRoughness=e.clearcoatRoughness,this.clearcoatRoughnessMap=e.clearcoatRoughnessMap,this.clearcoatNormalMap=e.clearcoatNormalMap,this.clearcoatNormalScale.copy(e.clearcoatNormalScale),this.dispersion=e.dispersion,this.ior=e.ior,this.iridescence=e.iridescence,this.iridescenceMap=e.iridescenceMap,this.iridescenceIOR=e.iridescenceIOR,this.iridescenceThicknessRange=[...e.iridescenceThicknessRange],this.iridescenceThicknessMap=e.iridescenceThicknessMap,this.sheen=e.sheen,this.sheenColor.copy(e.sheenColor),this.sheenColorMap=e.sheenColorMap,this.sheenRoughness=e.sheenRoughness,this.sheenRoughnessMap=e.sheenRoughnessMap,this.transmission=e.transmission,this.transmissionMap=e.transmissionMap,this.thickness=e.thickness,this.thicknessMap=e.thicknessMap,this.attenuationDistance=e.attenuationDistance,this.attenuationColor.copy(e.attenuationColor),this.specularIntensity=e.specularIntensity,this.specularIntensityMap=e.specularIntensityMap,this.specularColor.copy(e.specularColor),this.specularColorMap=e.specularColorMap,this}}class vf extends yn{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=oh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}}class xf extends yn{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}}function ir(s,e){return!s||s.constructor===e?s:typeof e.BYTES_PER_ELEMENT=="number"?new e(s):Array.prototype.slice.call(s)}function yf(s){return ArrayBuffer.isView(s)&&!(s instanceof DataView)}function bf(s){function e(i,r){return s[i]-s[r]}const t=s.length,n=new Array(t);for(let i=0;i!==t;++i)n[i]=i;return n.sort(e),n}function Ml(s,e,t){const n=s.length,i=new s.constructor(n);for(let r=0,o=0;o!==n;++r){const a=t[r]*e;for(let l=0;l!==e;++l)i[o++]=s[a+l]}return i}function Hc(s,e,t,n){let i=1,r=s[0];for(;r!==void 0&&r[n]===void 0;)r=s[i++];if(r===void 0)return;let o=r[n];if(o!==void 0)if(Array.isArray(o))do o=r[n],o!==void 0&&(e.push(r.time),t.push(...o)),r=s[i++];while(r!==void 0);else if(o.toArray!==void 0)do o=r[n],o!==void 0&&(e.push(r.time),o.toArray(t,t.length)),r=s[i++];while(r!==void 0);else do o=r[n],o!==void 0&&(e.push(r.time),t.push(o)),r=s[i++];while(r!==void 0)}class Is{constructor(e,t,n,i){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=i!==void 0?i:new t.constructor(n),this.sampleValues=t,this.valueSize=n,this.settings=null,this.DefaultSettings_={}}evaluate(e){const t=this.parameterPositions;let n=this._cachedIndex,i=t[n],r=t[n-1];e:{t:{let o;n:{i:if(!(e<i)){for(let a=n+2;;){if(i===void 0){if(e<r)break i;return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}if(n===a)break;if(r=i,i=t[++n],e<i)break t}o=t.length;break n}if(!(e>=r)){const a=t[1];e<a&&(n=2,r=a);for(let l=n-2;;){if(r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(n===l)break;if(i=r,r=t[--n-1],e>=r)break t}o=n,n=0;break n}break e}for(;n<o;){const a=n+o>>>1;e<t[a]?o=a:n=a+1}if(i=t[n],r=t[n-1],r===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===void 0)return n=t.length,this._cachedIndex=n,this.copySampleValue_(n-1)}this._cachedIndex=n,this.intervalChanged_(n,r,i)}return this.interpolate_(n,r,e,i)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i;for(let o=0;o!==i;++o)t[o]=n[r+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}}class Sf extends Is{constructor(e,t,n,i){super(e,t,n,i),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:Oi,endingEnd:Oi}}intervalChanged_(e,t,n){const i=this.parameterPositions;let r=e-2,o=e+1,a=i[r],l=i[o];if(a===void 0)switch(this.getSettings_().endingStart){case ki:r=e,a=2*t-n;break;case _r:r=i.length-2,a=t+i[r]-i[r+1];break;default:r=e,a=n}if(l===void 0)switch(this.getSettings_().endingEnd){case ki:o=e,l=2*n-t;break;case _r:o=1,l=n+i[1]-i[0];break;default:o=e-1,l=t}const c=(n-t)*.5,u=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-n),this._offsetPrev=r*u,this._offsetNext=o*u}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=this._offsetPrev,d=this._offsetNext,h=this._weightPrev,m=this._weightNext,_=(n-t)/(i-t),v=_*_,g=v*_,p=-h*g+2*h*v-h*_,A=(1+h)*g+(-1.5-2*h)*v+(-.5+h)*_+1,E=(-1-m)*g+(1.5+m)*v+.5*_,b=m*g-m*v;for(let R=0;R!==a;++R)r[R]=p*o[u+R]+A*o[c+R]+E*o[l+R]+b*o[d+R];return r}}class Gc extends Is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,u=(n-t)/(i-t),d=1-u;for(let h=0;h!==a;++h)r[h]=o[c+h]*d+o[l+h]*u;return r}}class Mf extends Is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e){return this.copySampleValue_(e-1)}}class pn{constructor(e,t,n,i){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=ir(t,this.TimeBufferType),this.values=ir(n,this.ValueBufferType),this.setInterpolation(i||this.DefaultInterpolation)}static toJSON(e){const t=e.constructor;let n;if(t.toJSON!==this.toJSON)n=t.toJSON(e);else{n={name:e.name,times:ir(e.times,Array),values:ir(e.values,Array)};const i=e.getInterpolation();i!==e.DefaultInterpolation&&(n.interpolation=i)}return n.type=e.ValueTypeName,n}InterpolantFactoryMethodDiscrete(e){return new Mf(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Gc(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Sf(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case Es:t=this.InterpolantFactoryMethodDiscrete;break;case As:t=this.InterpolantFactoryMethodLinear;break;case Rr:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){const n="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(n);return console.warn("THREE.KeyframeTrack:",n),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return Es;case this.InterpolantFactoryMethodLinear:return As;case this.InterpolantFactoryMethodSmooth:return Rr}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]+=e}return this}scale(e){if(e!==1){const t=this.times;for(let n=0,i=t.length;n!==i;++n)t[n]*=e}return this}trim(e,t){const n=this.times,i=n.length;let r=0,o=i-1;for(;r!==i&&n[r]<e;)++r;for(;o!==-1&&n[o]>t;)--o;if(++o,r!==0||o!==i){r>=o&&(o=Math.max(o,1),r=o-1);const a=this.getValueSize();this.times=n.slice(r,o),this.values=this.values.slice(r*a,o*a)}return this}validate(){let e=!0;const t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);const n=this.times,i=this.values,r=n.length;r===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==r;a++){const l=n[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(i!==void 0&&yf(i))for(let a=0,l=i.length;a!==l;++a){const c=i[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){const e=this.times.slice(),t=this.values.slice(),n=this.getValueSize(),i=this.getInterpolation()===Rr,r=e.length-1;let o=1;for(let a=1;a<r;++a){let l=!1;const c=e[a],u=e[a+1];if(c!==u&&(a!==1||c!==e[0]))if(i)l=!0;else{const d=a*n,h=d-n,m=d+n;for(let _=0;_!==n;++_){const v=t[d+_];if(v!==t[h+_]||v!==t[m+_]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];const d=a*n,h=o*n;for(let m=0;m!==n;++m)t[h+m]=t[d+m]}++o}}if(r>0){e[o]=e[r];for(let a=r*n,l=o*n,c=0;c!==n;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*n)):(this.times=e,this.values=t),this}clone(){const e=this.times.slice(),t=this.values.slice(),n=this.constructor,i=new n(this.name,e,t);return i.createInterpolant=this.createInterpolant,i}}pn.prototype.ValueTypeName="";pn.prototype.TimeBufferType=Float32Array;pn.prototype.ValueBufferType=Float32Array;pn.prototype.DefaultInterpolation=As;class ts extends pn{constructor(e,t,n){super(e,t,n)}}ts.prototype.ValueTypeName="bool";ts.prototype.ValueBufferType=Array;ts.prototype.DefaultInterpolation=Es;ts.prototype.InterpolantFactoryMethodLinear=void 0;ts.prototype.InterpolantFactoryMethodSmooth=void 0;class Wc extends pn{constructor(e,t,n,i){super(e,t,n,i)}}Wc.prototype.ValueTypeName="color";class $i extends pn{constructor(e,t,n,i){super(e,t,n,i)}}$i.prototype.ValueTypeName="number";class Tf extends Is{constructor(e,t,n,i){super(e,t,n,i)}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(n-t)/(i-t);let c=e*a;for(let u=c+a;c!==u;c+=4)Qt.slerpFlat(r,0,o,c-a,o,c,l);return r}}class Qi extends pn{constructor(e,t,n,i){super(e,t,n,i)}InterpolantFactoryMethodLinear(e){return new Tf(this.times,this.values,this.getValueSize(),e)}}Qi.prototype.ValueTypeName="quaternion";Qi.prototype.InterpolantFactoryMethodSmooth=void 0;class ns extends pn{constructor(e,t,n){super(e,t,n)}}ns.prototype.ValueTypeName="string";ns.prototype.ValueBufferType=Array;ns.prototype.DefaultInterpolation=Es;ns.prototype.InterpolantFactoryMethodLinear=void 0;ns.prototype.InterpolantFactoryMethodSmooth=void 0;class es extends pn{constructor(e,t,n,i){super(e,t,n,i)}}es.prototype.ValueTypeName="vector";class ia{constructor(e="",t=-1,n=[],i=ma){this.name=e,this.tracks=n,this.duration=t,this.blendMode=i,this.uuid=fn(),this.duration<0&&this.resetDuration()}static parse(e){const t=[],n=e.tracks,i=1/(e.fps||1);for(let o=0,a=n.length;o!==a;++o)t.push(Af(n[o]).scale(i));const r=new this(e.name,e.duration,t,e.blendMode);return r.uuid=e.uuid,r}static toJSON(e){const t=[],n=e.tracks,i={name:e.name,duration:e.duration,tracks:t,uuid:e.uuid,blendMode:e.blendMode};for(let r=0,o=n.length;r!==o;++r)t.push(pn.toJSON(n[r]));return i}static CreateFromMorphTargetSequence(e,t,n,i){const r=t.length,o=[];for(let a=0;a<r;a++){let l=[],c=[];l.push((a+r-1)%r,a,(a+1)%r),c.push(0,1,0);const u=bf(l);l=Ml(l,1,u),c=Ml(c,1,u),!i&&l[0]===0&&(l.push(r),c.push(c[0])),o.push(new $i(".morphTargetInfluences["+t[a].name+"]",l,c).scale(1/n))}return new this(e,-1,o)}static findByName(e,t){let n=e;if(!Array.isArray(e)){const i=e;n=i.geometry&&i.geometry.animations||i.animations}for(let i=0;i<n.length;i++)if(n[i].name===t)return n[i];return null}static CreateClipsFromMorphTargetSequences(e,t,n){const i={},r=/^([\w-]*?)([\d]+)$/;for(let a=0,l=e.length;a<l;a++){const c=e[a],u=c.name.match(r);if(u&&u.length>1){const d=u[1];let h=i[d];h||(i[d]=h=[]),h.push(c)}}const o=[];for(const a in i)o.push(this.CreateFromMorphTargetSequence(a,i[a],t,n));return o}static parseAnimation(e,t){if(console.warn("THREE.AnimationClip: parseAnimation() is deprecated and will be removed with r185"),!e)return console.error("THREE.AnimationClip: No animation in JSONLoader data."),null;const n=function(d,h,m,_,v){if(m.length!==0){const g=[],p=[];Hc(m,g,p,_),g.length!==0&&v.push(new d(h,g,p))}},i=[],r=e.name||"default",o=e.fps||30,a=e.blendMode;let l=e.length||-1;const c=e.hierarchy||[];for(let d=0;d<c.length;d++){const h=c[d].keys;if(!(!h||h.length===0))if(h[0].morphTargets){const m={};let _;for(_=0;_<h.length;_++)if(h[_].morphTargets)for(let v=0;v<h[_].morphTargets.length;v++)m[h[_].morphTargets[v]]=-1;for(const v in m){const g=[],p=[];for(let A=0;A!==h[_].morphTargets.length;++A){const E=h[_];g.push(E.time),p.push(E.morphTarget===v?1:0)}i.push(new $i(".morphTargetInfluence["+v+"]",g,p))}l=m.length*o}else{const m=".bones["+t[d].name+"]";n(es,m+".position",h,"pos",i),n(Qi,m+".quaternion",h,"rot",i),n(es,m+".scale",h,"scl",i)}}return i.length===0?null:new this(r,l,i,a)}resetDuration(){const e=this.tracks;let t=0;for(let n=0,i=e.length;n!==i;++n){const r=this.tracks[n];t=Math.max(t,r.times[r.times.length-1])}return this.duration=t,this}trim(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].trim(0,this.duration);return this}validate(){let e=!0;for(let t=0;t<this.tracks.length;t++)e=e&&this.tracks[t].validate();return e}optimize(){for(let e=0;e<this.tracks.length;e++)this.tracks[e].optimize();return this}clone(){const e=[];for(let t=0;t<this.tracks.length;t++)e.push(this.tracks[t].clone());return new this.constructor(this.name,this.duration,e,this.blendMode)}toJSON(){return this.constructor.toJSON(this)}}function Ef(s){switch(s.toLowerCase()){case"scalar":case"double":case"float":case"number":case"integer":return $i;case"vector":case"vector2":case"vector3":case"vector4":return es;case"color":return Wc;case"quaternion":return Qi;case"bool":case"boolean":return ts;case"string":return ns}throw new Error("THREE.KeyframeTrack: Unsupported typeName: "+s)}function Af(s){if(s.type===void 0)throw new Error("THREE.KeyframeTrack: track type undefined, can not parse");const e=Ef(s.type);if(s.times===void 0){const t=[],n=[];Hc(s.keys,t,n,"value"),s.times=t,s.values=n}return e.parse!==void 0?e.parse(s):new e(s.name,s.times,s.values,s.interpolation)}const Fn={enabled:!1,files:{},add:function(s,e){this.enabled!==!1&&(this.files[s]=e)},get:function(s){if(this.enabled!==!1)return this.files[s]},remove:function(s){delete this.files[s]},clear:function(){this.files={}}};class wf{constructor(e,t,n){const i=this;let r=!1,o=0,a=0,l;const c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=n,this.abortController=new AbortController,this.itemStart=function(u){a++,r===!1&&i.onStart!==void 0&&i.onStart(u,o,a),r=!0},this.itemEnd=function(u){o++,i.onProgress!==void 0&&i.onProgress(u,o,a),o===a&&(r=!1,i.onLoad!==void 0&&i.onLoad())},this.itemError=function(u){i.onError!==void 0&&i.onError(u)},this.resolveURL=function(u){return l?l(u):u},this.setURLModifier=function(u){return l=u,this},this.addHandler=function(u,d){return c.push(u,d),this},this.removeHandler=function(u){const d=c.indexOf(u);return d!==-1&&c.splice(d,2),this},this.getHandler=function(u){for(let d=0,h=c.length;d<h;d+=2){const m=c[d],_=c[d+1];if(m.global&&(m.lastIndex=0),m.test(u))return _}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}}const Cf=new wf;class is{constructor(e){this.manager=e!==void 0?e:Cf,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){const n=this;return new Promise(function(i,r){n.load(e,i,t,r)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}}is.DEFAULT_MATERIAL_NAME="__DEFAULT";const Ln={};class Rf extends Error{constructor(e,t){super(e),this.response=t}}class Xc extends is{constructor(e){super(e),this.mimeType="",this.responseType="",this._abortController=new AbortController}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=Fn.get(`file:${e}`);if(r!==void 0)return this.manager.itemStart(e),setTimeout(()=>{t&&t(r),this.manager.itemEnd(e)},0),r;if(Ln[e]!==void 0){Ln[e].push({onLoad:t,onProgress:n,onError:i});return}Ln[e]=[],Ln[e].push({onLoad:t,onProgress:n,onError:i});const o=new Request(e,{headers:new Headers(this.requestHeader),credentials:this.withCredentials?"include":"same-origin",signal:typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal}),a=this.mimeType,l=this.responseType;fetch(o).then(c=>{if(c.status===200||c.status===0){if(c.status===0&&console.warn("THREE.FileLoader: HTTP Status 0 received."),typeof ReadableStream>"u"||c.body===void 0||c.body.getReader===void 0)return c;const u=Ln[e],d=c.body.getReader(),h=c.headers.get("X-File-Size")||c.headers.get("Content-Length"),m=h?parseInt(h):0,_=m!==0;let v=0;const g=new ReadableStream({start(p){A();function A(){d.read().then(({done:E,value:b})=>{if(E)p.close();else{v+=b.byteLength;const R=new ProgressEvent("progress",{lengthComputable:_,loaded:v,total:m});for(let P=0,I=u.length;P<I;P++){const F=u[P];F.onProgress&&F.onProgress(R)}p.enqueue(b),A()}},E=>{p.error(E)})}}});return new Response(g)}else throw new Rf(`fetch for "${c.url}" responded with ${c.status}: ${c.statusText}`,c)}).then(c=>{switch(l){case"arraybuffer":return c.arrayBuffer();case"blob":return c.blob();case"document":return c.text().then(u=>new DOMParser().parseFromString(u,a));case"json":return c.json();default:if(a==="")return c.text();{const d=/charset="?([^;"\s]*)"?/i.exec(a),h=d&&d[1]?d[1].toLowerCase():void 0,m=new TextDecoder(h);return c.arrayBuffer().then(_=>m.decode(_))}}}).then(c=>{Fn.add(`file:${e}`,c);const u=Ln[e];delete Ln[e];for(let d=0,h=u.length;d<h;d++){const m=u[d];m.onLoad&&m.onLoad(c)}}).catch(c=>{const u=Ln[e];if(u===void 0)throw this.manager.itemError(e),c;delete Ln[e];for(let d=0,h=u.length;d<h;d++){const m=u[d];m.onError&&m.onError(c)}this.manager.itemError(e)}).finally(()=>{this.manager.itemEnd(e)}),this.manager.itemStart(e)}setResponseType(e){return this.responseType=e,this}setMimeType(e){return this.mimeType=e,this}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}const Ui=new WeakMap;class Pf extends is{constructor(e){super(e)}load(e,t,n,i){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Fn.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)r.manager.itemStart(e),setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0);else{let d=Ui.get(o);d===void 0&&(d=[],Ui.set(o,d)),d.push({onLoad:t,onError:i})}return o}const a=ws("img");function l(){u(),t&&t(this);const d=Ui.get(this)||[];for(let h=0;h<d.length;h++){const m=d[h];m.onLoad&&m.onLoad(this)}Ui.delete(this),r.manager.itemEnd(e)}function c(d){u(),i&&i(d),Fn.remove(`image:${e}`);const h=Ui.get(this)||[];for(let m=0;m<h.length;m++){const _=h[m];_.onError&&_.onError(d)}Ui.delete(this),r.manager.itemError(e),r.manager.itemEnd(e)}function u(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Fn.add(`image:${e}`,a),r.manager.itemStart(e),a.src=e,a}}class If extends is{constructor(e){super(e)}load(e,t,n,i){const r=new Dt,o=new Pf(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){r.image=a,r.needsUpdate=!0,t!==void 0&&t(r)},n,i),r}}class Tr extends bt{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new ze(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){const t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}}const to=new Ye,Tl=new D,El=new D;class Ta{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new Be(512,512),this.mapType=bn,this.map=null,this.mapPass=null,this.matrix=new Ye,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new ba,this._frameExtents=new Be(1,1),this._viewportCount=1,this._viewports=[new ot(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){const t=this.camera,n=this.matrix;Tl.setFromMatrixPosition(e.matrixWorld),t.position.copy(Tl),El.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(El),t.updateMatrixWorld(),to.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(to,t.coordinateSystem,t.reversedDepth),t.reversedDepth?n.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):n.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),n.multiply(to)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){const e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}}class Lf extends Ta{constructor(){super(new Ft(50,1,.5,500)),this.isSpotLightShadow=!0,this.focus=1,this.aspect=1}updateMatrices(e){const t=this.camera,n=Zi*2*e.angle*this.focus,i=this.mapSize.width/this.mapSize.height*this.aspect,r=e.distance||t.far;(n!==t.fov||i!==t.aspect||r!==t.far)&&(t.fov=n,t.aspect=i,t.far=r,t.updateProjectionMatrix()),super.updateMatrices(e)}copy(e){return super.copy(e),this.focus=e.focus,this}}class Df extends Tr{constructor(e,t,n=0,i=Math.PI/3,r=0,o=2){super(e,t),this.isSpotLight=!0,this.type="SpotLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.distance=n,this.angle=i,this.penumbra=r,this.decay=o,this.map=null,this.shadow=new Lf}get power(){return this.intensity*Math.PI}set power(e){this.intensity=e/Math.PI}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.angle=e.angle,this.penumbra=e.penumbra,this.decay=e.decay,this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}const Al=new Ye,fs=new D,no=new D;class Uf extends Ta{constructor(){super(new Ft(90,1,.5,500)),this.isPointLightShadow=!0,this._frameExtents=new Be(4,2),this._viewportCount=6,this._viewports=[new ot(2,1,1,1),new ot(0,1,1,1),new ot(3,1,1,1),new ot(1,1,1,1),new ot(3,0,1,1),new ot(1,0,1,1)],this._cubeDirections=[new D(1,0,0),new D(-1,0,0),new D(0,0,1),new D(0,0,-1),new D(0,1,0),new D(0,-1,0)],this._cubeUps=[new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,1,0),new D(0,0,1),new D(0,0,-1)]}updateMatrices(e,t=0){const n=this.camera,i=this.matrix,r=e.distance||n.far;r!==n.far&&(n.far=r,n.updateProjectionMatrix()),fs.setFromMatrixPosition(e.matrixWorld),n.position.copy(fs),no.copy(n.position),no.add(this._cubeDirections[t]),n.up.copy(this._cubeUps[t]),n.lookAt(no),n.updateMatrixWorld(),i.makeTranslation(-fs.x,-fs.y,-fs.z),Al.multiplyMatrices(n.projectionMatrix,n.matrixWorldInverse),this._frustum.setFromProjectionMatrix(Al,n.coordinateSystem,n.reversedDepth)}}class Nf extends Tr{constructor(e,t,n=0,i=2){super(e,t),this.isPointLight=!0,this.type="PointLight",this.distance=n,this.decay=i,this.shadow=new Uf}get power(){return this.intensity*4*Math.PI}set power(e){this.intensity=e/(4*Math.PI)}dispose(){this.shadow.dispose()}copy(e,t){return super.copy(e,t),this.distance=e.distance,this.decay=e.decay,this.shadow=e.shadow.clone(),this}}class Ea extends Nc{constructor(e=-1,t=1,n=1,i=-1,r=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=n,this.bottom=i,this.near=r,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,n,i,r,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=n,this.view.offsetY=i,this.view.width=r,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){const e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),n=(this.right+this.left)/2,i=(this.top+this.bottom)/2;let r=n-e,o=n+e,a=i+t,l=i-t;if(this.view!==null&&this.view.enabled){const c=(this.right-this.left)/this.view.fullWidth/this.zoom,u=(this.top-this.bottom)/this.view.fullHeight/this.zoom;r+=c*this.view.offsetX,o=r+c*this.view.width,a-=u*this.view.offsetY,l=a-u*this.view.height}this.projectionMatrix.makeOrthographic(r,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){const t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}}class Ff extends Ta{constructor(){super(new Ea(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}}class qc extends Tr{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(bt.DEFAULT_UP),this.updateMatrix(),this.target=new bt,this.shadow=new Ff}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}}class Of extends Tr{constructor(e,t){super(e,t),this.isAmbientLight=!0,this.type="AmbientLight"}}class ys{static extractUrlBase(e){const t=e.lastIndexOf("/");return t===-1?"./":e.slice(0,t+1)}static resolveURL(e,t){return typeof e!="string"||e===""?"":(/^https?:\/\//i.test(t)&&/^\//.test(e)&&(t=t.replace(/(^https?:\/\/[^\/]+).*/i,"$1")),/^(https?:)?\/\//i.test(e)||/^data:.*,.*$/i.test(e)||/^blob:.*$/i.test(e)?e:t+e)}}const io=new WeakMap;class kf extends is{constructor(e){super(e),this.isImageBitmapLoader=!0,typeof createImageBitmap>"u"&&console.warn("THREE.ImageBitmapLoader: createImageBitmap() not supported."),typeof fetch>"u"&&console.warn("THREE.ImageBitmapLoader: fetch() not supported."),this.options={premultiplyAlpha:"none"},this._abortController=new AbortController}setOptions(e){return this.options=e,this}load(e,t,n,i){e===void 0&&(e=""),this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);const r=this,o=Fn.get(`image-bitmap:${e}`);if(o!==void 0){if(r.manager.itemStart(e),o.then){o.then(c=>{if(io.has(o)===!0)i&&i(io.get(o)),r.manager.itemError(e),r.manager.itemEnd(e);else return t&&t(c),r.manager.itemEnd(e),c});return}return setTimeout(function(){t&&t(o),r.manager.itemEnd(e)},0),o}const a={};a.credentials=this.crossOrigin==="anonymous"?"same-origin":"include",a.headers=this.requestHeader,a.signal=typeof AbortSignal.any=="function"?AbortSignal.any([this._abortController.signal,this.manager.abortController.signal]):this._abortController.signal;const l=fetch(e,a).then(function(c){return c.blob()}).then(function(c){return createImageBitmap(c,Object.assign(r.options,{colorSpaceConversion:"none"}))}).then(function(c){return Fn.add(`image-bitmap:${e}`,c),t&&t(c),r.manager.itemEnd(e),c}).catch(function(c){i&&i(c),io.set(l,c),Fn.remove(`image-bitmap:${e}`),r.manager.itemError(e),r.manager.itemEnd(e)});Fn.add(`image-bitmap:${e}`,l),r.manager.itemStart(e)}abort(){return this._abortController.abort(),this._abortController=new AbortController,this}}class Bf extends Ft{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}}class Vf{constructor(e=!0){this.autoStart=e,this.startTime=0,this.oldTime=0,this.elapsedTime=0,this.running=!1}start(){this.startTime=performance.now(),this.oldTime=this.startTime,this.elapsedTime=0,this.running=!0}stop(){this.getElapsedTime(),this.running=!1,this.autoStart=!1}getElapsedTime(){return this.getDelta(),this.elapsedTime}getDelta(){let e=0;if(this.autoStart&&!this.running)return this.start(),0;if(this.running){const t=performance.now();e=(t-this.oldTime)/1e3,this.oldTime=t,this.elapsedTime+=e}return e}}class zf{constructor(e,t,n){this.binding=e,this.valueSize=n;let i,r,o;switch(t){case"quaternion":i=this._slerp,r=this._slerpAdditive,o=this._setAdditiveIdentityQuaternion,this.buffer=new Float64Array(n*6),this._workIndex=5;break;case"string":case"bool":i=this._select,r=this._select,o=this._setAdditiveIdentityOther,this.buffer=new Array(n*5);break;default:i=this._lerp,r=this._lerpAdditive,o=this._setAdditiveIdentityNumeric,this.buffer=new Float64Array(n*5)}this._mixBufferRegion=i,this._mixBufferRegionAdditive=r,this._setIdentity=o,this._origIndex=3,this._addIndex=4,this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,this.useCount=0,this.referenceCount=0}accumulate(e,t){const n=this.buffer,i=this.valueSize,r=e*i+i;let o=this.cumulativeWeight;if(o===0){for(let a=0;a!==i;++a)n[r+a]=n[a];o=t}else{o+=t;const a=t/o;this._mixBufferRegion(n,r,0,a,i)}this.cumulativeWeight=o}accumulateAdditive(e){const t=this.buffer,n=this.valueSize,i=n*this._addIndex;this.cumulativeWeightAdditive===0&&this._setIdentity(),this._mixBufferRegionAdditive(t,i,0,e,n),this.cumulativeWeightAdditive+=e}apply(e){const t=this.valueSize,n=this.buffer,i=e*t+t,r=this.cumulativeWeight,o=this.cumulativeWeightAdditive,a=this.binding;if(this.cumulativeWeight=0,this.cumulativeWeightAdditive=0,r<1){const l=t*this._origIndex;this._mixBufferRegion(n,i,l,1-r,t)}o>0&&this._mixBufferRegionAdditive(n,i,this._addIndex*t,1,t);for(let l=t,c=t+t;l!==c;++l)if(n[l]!==n[l+t]){a.setValue(n,i);break}}saveOriginalState(){const e=this.binding,t=this.buffer,n=this.valueSize,i=n*this._origIndex;e.getValue(t,i);for(let r=n,o=i;r!==o;++r)t[r]=t[i+r%n];this._setIdentity(),this.cumulativeWeight=0,this.cumulativeWeightAdditive=0}restoreOriginalState(){const e=this.valueSize*3;this.binding.setValue(this.buffer,e)}_setAdditiveIdentityNumeric(){const e=this._addIndex*this.valueSize,t=e+this.valueSize;for(let n=e;n<t;n++)this.buffer[n]=0}_setAdditiveIdentityQuaternion(){this._setAdditiveIdentityNumeric(),this.buffer[this._addIndex*this.valueSize+3]=1}_setAdditiveIdentityOther(){const e=this._origIndex*this.valueSize,t=this._addIndex*this.valueSize;for(let n=0;n<this.valueSize;n++)this.buffer[t+n]=this.buffer[e+n]}_select(e,t,n,i,r){if(i>=.5)for(let o=0;o!==r;++o)e[t+o]=e[n+o]}_slerp(e,t,n,i){Qt.slerpFlat(e,t,e,t,e,n,i)}_slerpAdditive(e,t,n,i,r){const o=this._workIndex*r;Qt.multiplyQuaternionsFlat(e,o,e,t,e,n),Qt.slerpFlat(e,t,e,t,e,o,i)}_lerp(e,t,n,i,r){const o=1-i;for(let a=0;a!==r;++a){const l=t+a;e[l]=e[l]*o+e[n+a]*i}}_lerpAdditive(e,t,n,i,r){for(let o=0;o!==r;++o){const a=t+o;e[a]=e[a]+e[n+o]*i}}}const Aa="\\[\\]\\.:\\/",Hf=new RegExp("["+Aa+"]","g"),wa="[^"+Aa+"]",Gf="[^"+Aa.replace("\\.","")+"]",Wf=/((?:WC+[\/:])*)/.source.replace("WC",wa),Xf=/(WCOD+)?/.source.replace("WCOD",Gf),qf=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",wa),jf=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",wa),Yf=new RegExp("^"+Wf+Xf+qf+jf+"$"),Kf=["material","materials","bones","map"];class Zf{constructor(e,t,n){const i=n||lt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,i)}getValue(e,t){this.bind();const n=this._targetGroup.nCachedObjects_,i=this._bindings[n];i!==void 0&&i.getValue(e,t)}setValue(e,t){const n=this._bindings;for(let i=this._targetGroup.nCachedObjects_,r=n.length;i!==r;++i)n[i].setValue(e,t)}bind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].bind()}unbind(){const e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,n=e.length;t!==n;++t)e[t].unbind()}}class lt{constructor(e,t,n){this.path=t,this.parsedPath=n||lt.parseTrackName(t),this.node=lt.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,n){return e&&e.isAnimationObjectGroup?new lt.Composite(e,t,n):new lt(e,t,n)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(Hf,"")}static parseTrackName(e){const t=Yf.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);const n={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},i=n.nodeName&&n.nodeName.lastIndexOf(".");if(i!==void 0&&i!==-1){const r=n.nodeName.substring(i+1);Kf.indexOf(r)!==-1&&(n.nodeName=n.nodeName.substring(0,i),n.objectName=r)}if(n.propertyName===null||n.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return n}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){const n=e.skeleton.getBoneByName(t);if(n!==void 0)return n}if(e.children){const n=function(r){for(let o=0;o<r.length;o++){const a=r[o];if(a.name===t||a.uuid===t)return a;const l=n(a.children);if(l)return l}return null},i=n(e.children);if(i)return i}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)e[t++]=n[i]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++]}_setValue_array_setNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){const n=this.resolvedProperty;for(let i=0,r=n.length;i!==r;++i)n[i]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node;const t=this.parsedPath,n=t.objectName,i=t.propertyName;let r=t.propertyIndex;if(e||(e=lt.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(n){let c=t.objectIndex;switch(n){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let u=0;u<e.length;u++)if(e[u].name===c){c=u;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[n]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[n]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}const o=e[i];if(o===void 0){const c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+i+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(r!==void 0){if(i==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[r]!==void 0&&(r=e.morphTargetDictionary[r])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=r}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=i;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}}lt.Composite=Zf;lt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};lt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};lt.prototype.GetterByBindingType=[lt.prototype._getValue_direct,lt.prototype._getValue_array,lt.prototype._getValue_arrayElement,lt.prototype._getValue_toArray];lt.prototype.SetterByBindingTypeAndVersioning=[[lt.prototype._setValue_direct,lt.prototype._setValue_direct_setNeedsUpdate,lt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_array,lt.prototype._setValue_array_setNeedsUpdate,lt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_arrayElement,lt.prototype._setValue_arrayElement_setNeedsUpdate,lt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[lt.prototype._setValue_fromArray,lt.prototype._setValue_fromArray_setNeedsUpdate,lt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];class Jf{constructor(e,t,n=null,i=t.blendMode){this._mixer=e,this._clip=t,this._localRoot=n,this.blendMode=i;const r=t.tracks,o=r.length,a=new Array(o),l={endingStart:Oi,endingEnd:Oi};for(let c=0;c!==o;++c){const u=r[c].createInterpolant(null);a[c]=u,u.settings=l}this._interpolantSettings=l,this._interpolants=a,this._propertyBindings=new Array(o),this._cacheIndex=null,this._byClipCacheIndex=null,this._timeScaleInterpolant=null,this._weightInterpolant=null,this.loop=nh,this._loopCount=-1,this._startTime=null,this.time=0,this.timeScale=1,this._effectiveTimeScale=1,this.weight=1,this._effectiveWeight=1,this.repetitions=1/0,this.paused=!1,this.enabled=!0,this.clampWhenFinished=!1,this.zeroSlopeAtStart=!0,this.zeroSlopeAtEnd=!0}play(){return this._mixer._activateAction(this),this}stop(){return this._mixer._deactivateAction(this),this.reset()}reset(){return this.paused=!1,this.enabled=!0,this.time=0,this._loopCount=-1,this._startTime=null,this.stopFading().stopWarping()}isRunning(){return this.enabled&&!this.paused&&this.timeScale!==0&&this._startTime===null&&this._mixer._isActiveAction(this)}isScheduled(){return this._mixer._isActiveAction(this)}startAt(e){return this._startTime=e,this}setLoop(e,t){return this.loop=e,this.repetitions=t,this}setEffectiveWeight(e){return this.weight=e,this._effectiveWeight=this.enabled?e:0,this.stopFading()}getEffectiveWeight(){return this._effectiveWeight}fadeIn(e){return this._scheduleFading(e,0,1)}fadeOut(e){return this._scheduleFading(e,1,0)}crossFadeFrom(e,t,n=!1){if(e.fadeOut(t),this.fadeIn(t),n===!0){const i=this._clip.duration,r=e._clip.duration,o=r/i,a=i/r;e.warp(1,o,t),this.warp(a,1,t)}return this}crossFadeTo(e,t,n=!1){return e.crossFadeFrom(this,t,n)}stopFading(){const e=this._weightInterpolant;return e!==null&&(this._weightInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}setEffectiveTimeScale(e){return this.timeScale=e,this._effectiveTimeScale=this.paused?0:e,this.stopWarping()}getEffectiveTimeScale(){return this._effectiveTimeScale}setDuration(e){return this.timeScale=this._clip.duration/e,this.stopWarping()}syncWith(e){return this.time=e.time,this.timeScale=e.timeScale,this.stopWarping()}halt(e){return this.warp(this._effectiveTimeScale,0,e)}warp(e,t,n){const i=this._mixer,r=i.time,o=this.timeScale;let a=this._timeScaleInterpolant;a===null&&(a=i._lendControlInterpolant(),this._timeScaleInterpolant=a);const l=a.parameterPositions,c=a.sampleValues;return l[0]=r,l[1]=r+n,c[0]=e/o,c[1]=t/o,this}stopWarping(){const e=this._timeScaleInterpolant;return e!==null&&(this._timeScaleInterpolant=null,this._mixer._takeBackControlInterpolant(e)),this}getMixer(){return this._mixer}getClip(){return this._clip}getRoot(){return this._localRoot||this._mixer._root}_update(e,t,n,i){if(!this.enabled){this._updateWeight(e);return}const r=this._startTime;if(r!==null){const l=(e-r)*n;l<0||n===0?t=0:(this._startTime=null,t=n*l)}t*=this._updateTimeScale(e);const o=this._updateTime(t),a=this._updateWeight(e);if(a>0){const l=this._interpolants,c=this._propertyBindings;switch(this.blendMode){case sh:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulateAdditive(a);break;case ma:default:for(let u=0,d=l.length;u!==d;++u)l[u].evaluate(o),c[u].accumulate(i,a)}}}_updateWeight(e){let t=0;if(this.enabled){t=this.weight;const n=this._weightInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopFading(),i===0&&(this.enabled=!1))}}return this._effectiveWeight=t,t}_updateTimeScale(e){let t=0;if(!this.paused){t=this.timeScale;const n=this._timeScaleInterpolant;if(n!==null){const i=n.evaluate(e)[0];t*=i,e>n.parameterPositions[1]&&(this.stopWarping(),t===0?this.paused=!0:this.timeScale=t)}}return this._effectiveTimeScale=t,t}_updateTime(e){const t=this._clip.duration,n=this.loop;let i=this.time+e,r=this._loopCount;const o=n===ih;if(e===0)return r===-1?i:o&&(r&1)===1?t-i:i;if(n===th){r===-1&&(this._loopCount=0,this._setEndings(!0,!0,!1));e:{if(i>=t)i=t;else if(i<0)i=0;else{this.time=i;break e}this.clampWhenFinished?this.paused=!0:this.enabled=!1,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e<0?-1:1})}}else{if(r===-1&&(e>=0?(r=0,this._setEndings(!0,this.repetitions===0,o)):this._setEndings(this.repetitions===0,!0,o)),i>=t||i<0){const a=Math.floor(i/t);i-=t*a,r+=Math.abs(a);const l=this.repetitions-r;if(l<=0)this.clampWhenFinished?this.paused=!0:this.enabled=!1,i=e>0?t:0,this.time=i,this._mixer.dispatchEvent({type:"finished",action:this,direction:e>0?1:-1});else{if(l===1){const c=e<0;this._setEndings(c,!c,o)}else this._setEndings(!1,!1,o);this._loopCount=r,this.time=i,this._mixer.dispatchEvent({type:"loop",action:this,loopDelta:a})}}else this.time=i;if(o&&(r&1)===1)return t-i}return i}_setEndings(e,t,n){const i=this._interpolantSettings;n?(i.endingStart=ki,i.endingEnd=ki):(e?i.endingStart=this.zeroSlopeAtStart?ki:Oi:i.endingStart=_r,t?i.endingEnd=this.zeroSlopeAtEnd?ki:Oi:i.endingEnd=_r)}_scheduleFading(e,t,n){const i=this._mixer,r=i.time;let o=this._weightInterpolant;o===null&&(o=i._lendControlInterpolant(),this._weightInterpolant=o);const a=o.parameterPositions,l=o.sampleValues;return a[0]=r,l[0]=t,a[1]=r+e,l[1]=n,this}}const $f=new Float32Array(1);class Qf extends ti{constructor(e){super(),this._root=e,this._initMemoryManager(),this._accuIndex=0,this.time=0,this.timeScale=1}_bindAction(e,t){const n=e._localRoot||this._root,i=e._clip.tracks,r=i.length,o=e._propertyBindings,a=e._interpolants,l=n.uuid,c=this._bindingsByRootAndName;let u=c[l];u===void 0&&(u={},c[l]=u);for(let d=0;d!==r;++d){const h=i[d],m=h.name;let _=u[m];if(_!==void 0)++_.referenceCount,o[d]=_;else{if(_=o[d],_!==void 0){_._cacheIndex===null&&(++_.referenceCount,this._addInactiveBinding(_,l,m));continue}const v=t&&t._propertyBindings[d].binding.parsedPath;_=new zf(lt.create(n,m,v),h.ValueTypeName,h.getValueSize()),++_.referenceCount,this._addInactiveBinding(_,l,m),o[d]=_}a[d].resultBuffer=_.buffer}}_activateAction(e){if(!this._isActiveAction(e)){if(e._cacheIndex===null){const n=(e._localRoot||this._root).uuid,i=e._clip.uuid,r=this._actionsByClip[i];this._bindAction(e,r&&r.knownActions[0]),this._addInactiveAction(e,i,n)}const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];r.useCount++===0&&(this._lendBinding(r),r.saveOriginalState())}this._lendAction(e)}}_deactivateAction(e){if(this._isActiveAction(e)){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.useCount===0&&(r.restoreOriginalState(),this._takeBackBinding(r))}this._takeBackAction(e)}}_initMemoryManager(){this._actions=[],this._nActiveActions=0,this._actionsByClip={},this._bindings=[],this._nActiveBindings=0,this._bindingsByRootAndName={},this._controlInterpolants=[],this._nActiveControlInterpolants=0;const e=this;this.stats={actions:{get total(){return e._actions.length},get inUse(){return e._nActiveActions}},bindings:{get total(){return e._bindings.length},get inUse(){return e._nActiveBindings}},controlInterpolants:{get total(){return e._controlInterpolants.length},get inUse(){return e._nActiveControlInterpolants}}}}_isActiveAction(e){const t=e._cacheIndex;return t!==null&&t<this._nActiveActions}_addInactiveAction(e,t,n){const i=this._actions,r=this._actionsByClip;let o=r[t];if(o===void 0)o={knownActions:[e],actionByRoot:{}},e._byClipCacheIndex=0,r[t]=o;else{const a=o.knownActions;e._byClipCacheIndex=a.length,a.push(e)}e._cacheIndex=i.length,i.push(e),o.actionByRoot[n]=e}_removeInactiveAction(e){const t=this._actions,n=t[t.length-1],i=e._cacheIndex;n._cacheIndex=i,t[i]=n,t.pop(),e._cacheIndex=null;const r=e._clip.uuid,o=this._actionsByClip,a=o[r],l=a.knownActions,c=l[l.length-1],u=e._byClipCacheIndex;c._byClipCacheIndex=u,l[u]=c,l.pop(),e._byClipCacheIndex=null;const d=a.actionByRoot,h=(e._localRoot||this._root).uuid;delete d[h],l.length===0&&delete o[r],this._removeInactiveBindingsForAction(e)}_removeInactiveBindingsForAction(e){const t=e._propertyBindings;for(let n=0,i=t.length;n!==i;++n){const r=t[n];--r.referenceCount===0&&this._removeInactiveBinding(r)}}_lendAction(e){const t=this._actions,n=e._cacheIndex,i=this._nActiveActions++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackAction(e){const t=this._actions,n=e._cacheIndex,i=--this._nActiveActions,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_addInactiveBinding(e,t,n){const i=this._bindingsByRootAndName,r=this._bindings;let o=i[t];o===void 0&&(o={},i[t]=o),o[n]=e,e._cacheIndex=r.length,r.push(e)}_removeInactiveBinding(e){const t=this._bindings,n=e.binding,i=n.rootNode.uuid,r=n.path,o=this._bindingsByRootAndName,a=o[i],l=t[t.length-1],c=e._cacheIndex;l._cacheIndex=c,t[c]=l,t.pop(),delete a[r],Object.keys(a).length===0&&delete o[i]}_lendBinding(e){const t=this._bindings,n=e._cacheIndex,i=this._nActiveBindings++,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_takeBackBinding(e){const t=this._bindings,n=e._cacheIndex,i=--this._nActiveBindings,r=t[i];e._cacheIndex=i,t[i]=e,r._cacheIndex=n,t[n]=r}_lendControlInterpolant(){const e=this._controlInterpolants,t=this._nActiveControlInterpolants++;let n=e[t];return n===void 0&&(n=new Gc(new Float32Array(2),new Float32Array(2),1,$f),n.__cacheIndex=t,e[t]=n),n}_takeBackControlInterpolant(e){const t=this._controlInterpolants,n=e.__cacheIndex,i=--this._nActiveControlInterpolants,r=t[i];e.__cacheIndex=i,t[i]=e,r.__cacheIndex=n,t[n]=r}clipAction(e,t,n){const i=t||this._root,r=i.uuid;let o=typeof e=="string"?ia.findByName(i,e):e;const a=o!==null?o.uuid:e,l=this._actionsByClip[a];let c=null;if(n===void 0&&(o!==null?n=o.blendMode:n=ma),l!==void 0){const d=l.actionByRoot[r];if(d!==void 0&&d.blendMode===n)return d;c=l.knownActions[0],o===null&&(o=c._clip)}if(o===null)return null;const u=new Jf(this,o,t,n);return this._bindAction(u,c),this._addInactiveAction(u,a,r),u}existingAction(e,t){const n=t||this._root,i=n.uuid,r=typeof e=="string"?ia.findByName(n,e):e,o=r?r.uuid:e,a=this._actionsByClip[o];return a!==void 0&&a.actionByRoot[i]||null}stopAllAction(){const e=this._actions,t=this._nActiveActions;for(let n=t-1;n>=0;--n)e[n].stop();return this}update(e){e*=this.timeScale;const t=this._actions,n=this._nActiveActions,i=this.time+=e,r=Math.sign(e),o=this._accuIndex^=1;for(let c=0;c!==n;++c)t[c]._update(i,e,r,o);const a=this._bindings,l=this._nActiveBindings;for(let c=0;c!==l;++c)a[c].apply(o);return this}setTime(e){this.time=0;for(let t=0;t<this._actions.length;t++)this._actions[t].time=0;return this.update(e)}getRoot(){return this._root}uncacheClip(e){const t=this._actions,n=e.uuid,i=this._actionsByClip,r=i[n];if(r!==void 0){const o=r.knownActions;for(let a=0,l=o.length;a!==l;++a){const c=o[a];this._deactivateAction(c);const u=c._cacheIndex,d=t[t.length-1];c._cacheIndex=null,c._byClipCacheIndex=null,d._cacheIndex=u,t[u]=d,t.pop(),this._removeInactiveBindingsForAction(c)}delete i[n]}}uncacheRoot(e){const t=e.uuid,n=this._actionsByClip;for(const o in n){const a=n[o].actionByRoot,l=a[t];l!==void 0&&(this._deactivateAction(l),this._removeInactiveAction(l))}const i=this._bindingsByRootAndName,r=i[t];if(r!==void 0)for(const o in r){const a=r[o];a.restoreOriginalState(),this._removeInactiveBinding(a)}}uncacheAction(e,t){const n=this.existingAction(e,t);n!==null&&(this._deactivateAction(n),this._removeInactiveAction(n))}}class wl{constructor(e=1,t=0,n=0){this.radius=e,this.phi=t,this.theta=n}set(e,t,n){return this.radius=e,this.phi=t,this.theta=n,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=Ke(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,n){return this.radius=Math.sqrt(e*e+t*t+n*n),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,n),this.phi=Math.acos(Ke(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}}class ep extends ti{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}}function Cl(s,e,t,n){const i=tp(n);switch(t){case bc:return s*e;case da:return s*e/i.components*i.byteLength;case ha:return s*e/i.components*i.byteLength;case Mc:return s*e*2/i.components*i.byteLength;case fa:return s*e*2/i.components*i.byteLength;case Sc:return s*e*3/i.components*i.byteLength;case on:return s*e*4/i.components*i.byteLength;case pa:return s*e*4/i.components*i.byteLength;case ur:case dr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case hr:case fr:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Co:case Po:return Math.max(s,16)*Math.max(e,8)/4;case wo:case Ro:return Math.max(s,8)*Math.max(e,8)/2;case Io:case Lo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*8;case Do:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case Uo:return Math.floor((s+3)/4)*Math.floor((e+3)/4)*16;case No:return Math.floor((s+4)/5)*Math.floor((e+3)/4)*16;case Fo:return Math.floor((s+4)/5)*Math.floor((e+4)/5)*16;case Oo:return Math.floor((s+5)/6)*Math.floor((e+4)/5)*16;case ko:return Math.floor((s+5)/6)*Math.floor((e+5)/6)*16;case Bo:return Math.floor((s+7)/8)*Math.floor((e+4)/5)*16;case Vo:return Math.floor((s+7)/8)*Math.floor((e+5)/6)*16;case zo:return Math.floor((s+7)/8)*Math.floor((e+7)/8)*16;case Ho:return Math.floor((s+9)/10)*Math.floor((e+4)/5)*16;case Go:return Math.floor((s+9)/10)*Math.floor((e+5)/6)*16;case Wo:return Math.floor((s+9)/10)*Math.floor((e+7)/8)*16;case Xo:return Math.floor((s+9)/10)*Math.floor((e+9)/10)*16;case qo:return Math.floor((s+11)/12)*Math.floor((e+9)/10)*16;case jo:return Math.floor((s+11)/12)*Math.floor((e+11)/12)*16;case pr:case Yo:case Ko:return Math.ceil(s/4)*Math.ceil(e/4)*16;case Tc:case Zo:return Math.ceil(s/4)*Math.ceil(e/4)*8;case Jo:case $o:return Math.ceil(s/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function tp(s){switch(s){case bn:case vc:return{byteLength:1,components:1};case bs:case xc:case Cs:return{byteLength:2,components:1};case ca:case ua:return{byteLength:2,components:4};case gi:case la:case hn:return{byteLength:4,components:1};case yc:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${s}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:aa}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__=aa);/**
 * @license
 * Copyright 2010-2025 Three.js Authors
 * SPDX-License-Identifier: MIT
 */function jc(){let s=null,e=!1,t=null,n=null;function i(r,o){t(r,o),n=s.requestAnimationFrame(i)}return{start:function(){e!==!0&&t!==null&&(n=s.requestAnimationFrame(i),e=!0)},stop:function(){s.cancelAnimationFrame(n),e=!1},setAnimationLoop:function(r){t=r},setContext:function(r){s=r}}}function np(s){const e=new WeakMap;function t(a,l){const c=a.array,u=a.usage,d=c.byteLength,h=s.createBuffer();s.bindBuffer(l,h),s.bufferData(l,c,u),a.onUploadCallback();let m;if(c instanceof Float32Array)m=s.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)m=s.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?m=s.HALF_FLOAT:m=s.UNSIGNED_SHORT;else if(c instanceof Int16Array)m=s.SHORT;else if(c instanceof Uint32Array)m=s.UNSIGNED_INT;else if(c instanceof Int32Array)m=s.INT;else if(c instanceof Int8Array)m=s.BYTE;else if(c instanceof Uint8Array)m=s.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)m=s.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:h,type:m,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:d}}function n(a,l,c){const u=l.array,d=l.updateRanges;if(s.bindBuffer(c,a),d.length===0)s.bufferSubData(c,0,u);else{d.sort((m,_)=>m.start-_.start);let h=0;for(let m=1;m<d.length;m++){const _=d[h],v=d[m];v.start<=_.start+_.count+1?_.count=Math.max(_.count,v.start+v.count-_.start):(++h,d[h]=v)}d.length=h+1;for(let m=0,_=d.length;m<_;m++){const v=d[m];s.bufferSubData(c,v.start*u.BYTES_PER_ELEMENT,u,v.start,v.count)}l.clearUpdateRanges()}l.onUploadCallback()}function i(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function r(a){a.isInterleavedBufferAttribute&&(a=a.data);const l=e.get(a);l&&(s.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){const u=e.get(a);(!u||u.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}const c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");n(c.buffer,a,l),c.version=a.version}}return{get:i,remove:r,update:o}}var ip=`#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`,sp=`#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`,rp=`#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`,op=`#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,ap=`#ifdef USE_ALPHATEST
	#ifdef ALPHA_TO_COVERAGE
	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;
	#else
	if ( diffuseColor.a < alphaTest ) discard;
	#endif
#endif`,lp=`#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`,cp=`#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`,up=`#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`,dp=`#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif
	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {
		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
	float getIndirectIndex( const in int i ) {
		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );
	}
#endif
#ifdef USE_BATCHING_COLOR
	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {
		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;
	}
#endif`,hp=`#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif`,fp=`vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`,pp=`vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`,mp=`float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`,gp=`#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`,_p=`#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`,vp=`#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#ifdef ALPHA_TO_COVERAGE
		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			if ( clipOpacity == 0.0 ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			float unionClipOpacity = 1.0;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );
			}
			#pragma unroll_loop_end
			clipOpacity *= 1.0 - unionClipOpacity;
		#endif
		diffuseColor.a *= clipOpacity;
		if ( diffuseColor.a == 0.0 ) discard;
	#else
		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
		}
		#pragma unroll_loop_end
		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
			bool clipped = true;
			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
			}
			#pragma unroll_loop_end
			if ( clipped ) discard;
		#endif
	#endif
#endif`,xp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`,yp=`#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`,bp=`#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`,Sp=`#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`,Mp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`,Tp=`#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	varying vec3 vColor;
#endif`,Ep=`#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif
#ifdef USE_BATCHING_COLOR
	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );
	vColor.xyz *= batchingColor.xyz;
#endif`,Ap=`#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`,wp=`#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`,Cp=`vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT
	vec3 transformedTangent = objectTangent;
#endif
#ifdef USE_BATCHING
	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = bm * transformedTangent;
	#endif
#endif
#ifdef USE_INSTANCING
	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;
	#ifdef USE_TANGENT
		transformedTangent = im * transformedTangent;
	#endif
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`,Rp=`#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`,Pp=`#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`,Ip=`#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE
		emissiveColor = sRGBTransferEOTF( emissiveColor );
	#endif
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`,Lp=`#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`,Dp="gl_FragColor = linearToOutputTexel( gl_FragColor );",Up=`vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}`,Np=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`,Fp=`#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`,Op=`#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`,kp=`#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`,Bp=`#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`,Vp=`#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`,zp=`#ifdef USE_FOG
	varying float vFogDepth;
#endif`,Hp=`#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`,Gp=`#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`,Wp=`#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`,Xp=`#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`,qp=`LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`,jp=`varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`,Yp=`uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
	if ( cutoffDistance > 0.0 ) {
		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
	}
	return distanceFalloff;
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`,Kp=`#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`,Zp=`ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`,Jp=`varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`,$p=`BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`,Qp=`varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`,em=`PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_DISPERSION
	material.dispersion = dispersion;
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;
#endif`,tm=`struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`,nm=`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`,im=`#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`,sm=`#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`,rm=`#if defined( USE_LOGDEPTHBUF )
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`,om=`#if defined( USE_LOGDEPTHBUF )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,am=`#ifdef USE_LOGDEPTHBUF
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`,lm=`#ifdef USE_LOGDEPTHBUF
	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
#endif`,cm=`#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`,um=`#ifdef USE_MAP
	uniform sampler2D map;
#endif`,dm=`#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`,hm=`#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`,fm=`float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`,pm=`#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`,mm=`#ifdef USE_INSTANCING_MORPH
	float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;
	}
#endif`,gm=`#if defined( USE_MORPHCOLORS )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`,_m=`#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,vm=`#ifdef USE_MORPHTARGETS
	#ifndef USE_INSTANCING_MORPH
		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
	#endif
	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;
	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;
		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );
	}
#endif`,xm=`#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
	}
#endif`,ym=`float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`,bm=`#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`,Sm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Mm=`#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`,Tm=`#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`,Em=`#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`,Am=`#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`,wm=`#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`,Cm=`#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`,Rm=`#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`,Pm=`#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`,Im=`vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;
const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );
const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );
vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}
vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}
vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}
float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}
float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}
vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`,Lm=`#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`,Dm=`vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_BATCHING
	mvPosition = batchingMatrix * mvPosition;
#endif
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`,Um=`#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`,Nm=`#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`,Fm=`float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`,Om=`#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`,km=`#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );
		#ifdef USE_REVERSEDEPTHBUF
			return step( depth, compare );
		#else
			return step( compare, depth );
		#endif
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		#ifdef USE_REVERSEDEPTHBUF
			float hard_shadow = step( distribution.x, compare );
		#else
			float hard_shadow = step( compare , distribution.x );
		#endif
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		float shadow = 1.0;
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );
		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );			dp += shadowBias;
			vec3 bd3D = normalize( lightToPosition );
			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );
			#else
				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
			#endif
		}
		return mix( 1.0, shadow, shadowIntensity );
	}
#endif`,Bm=`#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`,Vm=`#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`,zm=`float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`,Hm=`#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`,Gm=`#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	mat4 getBoneMatrix( const in float i ) {
		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );
	}
#endif`,Wm=`#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`,Xm=`#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`,qm=`float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`,jm=`#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`,Ym=`#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`,Km=`#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 CineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);
const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);
vec3 agxDefaultContrastApprox( vec3 x ) {
	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;
	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;
}
vec3 AgXToneMapping( vec3 color ) {
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);
	const float AgxMinEv = - 12.47393;	const float AgxMaxEv = 4.026069;
	color *= toneMappingExposure;
	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;
	color = AgXInsetMatrix * color;
	color = max( color, 1e-10 );	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );
	color = clamp( color, 0.0, 1.0 );
	color = agxDefaultContrastApprox( color );
	color = AgXOutsetMatrix * color;
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );
	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;
	color = clamp( color, 0.0, 1.0 );
	return color;
}
vec3 NeutralToneMapping( vec3 color ) {
	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;
	color *= toneMappingExposure;
	float x = min( color.r, min( color.g, color.b ) );
	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;
	color -= offset;
	float peak = max( color.r, max( color.g, color.b ) );
	if ( peak < StartCompression ) return color;
	float d = 1. - StartCompression;
	float newPeak = 1. - d * d / ( peak + d - StartCompression );
	color *= newPeak / peak;
	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );
	return mix( color, vec3( newPeak ), g );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`,Zm=`#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`,Jm=`#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec4 transmittedLight;
		vec3 transmittance;
		#ifdef USE_DISPERSION
			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );
			for ( int i = 0; i < 3; i ++ ) {
				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;
				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];
			}
			transmittedLight.a /= 3.0;
		#else
			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		#endif
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`,$m=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,Qm=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`,eg=`#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`,tg=`#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_BATCHING
		worldPosition = batchingMatrix * worldPosition;
	#endif
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;const ng=`varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`,ig=`uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,sg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,rg=`#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,og=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`,ag=`uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,lg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`,cg=`#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	#ifdef USE_REVERSEDEPTHBUF
		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];
	#else
		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;
	#endif
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#elif DEPTH_PACKING == 3202
		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );
	#elif DEPTH_PACKING == 3203
		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );
	#endif
}`,ug=`#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <skinbase_vertex>
	#include <morphinstance_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`,dg=`#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`,hg=`varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`,fg=`uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`,pg=`uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,mg=`uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,gg=`#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`,_g=`uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,vg=`#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,xg=`#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,yg=`#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`,bg=`#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Sg=`#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`,Mg=`#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`,Tg=`#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Eg=`#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Ag=`#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`,wg=`#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_DISPERSION
	uniform float dispersion;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Cg=`#define TOON
varying vec3 vViewPosition;
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Rg=`#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`,Pg=`uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`,Ig=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`,Lg=`#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <batching_vertex>
	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`,Dg=`uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,Ug=`uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix[ 3 ];
	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`,Ng=`uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`,je={alphahash_fragment:ip,alphahash_pars_fragment:sp,alphamap_fragment:rp,alphamap_pars_fragment:op,alphatest_fragment:ap,alphatest_pars_fragment:lp,aomap_fragment:cp,aomap_pars_fragment:up,batching_pars_vertex:dp,batching_vertex:hp,begin_vertex:fp,beginnormal_vertex:pp,bsdfs:mp,iridescence_fragment:gp,bumpmap_pars_fragment:_p,clipping_planes_fragment:vp,clipping_planes_pars_fragment:xp,clipping_planes_pars_vertex:yp,clipping_planes_vertex:bp,color_fragment:Sp,color_pars_fragment:Mp,color_pars_vertex:Tp,color_vertex:Ep,common:Ap,cube_uv_reflection_fragment:wp,defaultnormal_vertex:Cp,displacementmap_pars_vertex:Rp,displacementmap_vertex:Pp,emissivemap_fragment:Ip,emissivemap_pars_fragment:Lp,colorspace_fragment:Dp,colorspace_pars_fragment:Up,envmap_fragment:Np,envmap_common_pars_fragment:Fp,envmap_pars_fragment:Op,envmap_pars_vertex:kp,envmap_physical_pars_fragment:Kp,envmap_vertex:Bp,fog_vertex:Vp,fog_pars_vertex:zp,fog_fragment:Hp,fog_pars_fragment:Gp,gradientmap_pars_fragment:Wp,lightmap_pars_fragment:Xp,lights_lambert_fragment:qp,lights_lambert_pars_fragment:jp,lights_pars_begin:Yp,lights_toon_fragment:Zp,lights_toon_pars_fragment:Jp,lights_phong_fragment:$p,lights_phong_pars_fragment:Qp,lights_physical_fragment:em,lights_physical_pars_fragment:tm,lights_fragment_begin:nm,lights_fragment_maps:im,lights_fragment_end:sm,logdepthbuf_fragment:rm,logdepthbuf_pars_fragment:om,logdepthbuf_pars_vertex:am,logdepthbuf_vertex:lm,map_fragment:cm,map_pars_fragment:um,map_particle_fragment:dm,map_particle_pars_fragment:hm,metalnessmap_fragment:fm,metalnessmap_pars_fragment:pm,morphinstance_vertex:mm,morphcolor_vertex:gm,morphnormal_vertex:_m,morphtarget_pars_vertex:vm,morphtarget_vertex:xm,normal_fragment_begin:ym,normal_fragment_maps:bm,normal_pars_fragment:Sm,normal_pars_vertex:Mm,normal_vertex:Tm,normalmap_pars_fragment:Em,clearcoat_normal_fragment_begin:Am,clearcoat_normal_fragment_maps:wm,clearcoat_pars_fragment:Cm,iridescence_pars_fragment:Rm,opaque_fragment:Pm,packing:Im,premultiplied_alpha_fragment:Lm,project_vertex:Dm,dithering_fragment:Um,dithering_pars_fragment:Nm,roughnessmap_fragment:Fm,roughnessmap_pars_fragment:Om,shadowmap_pars_fragment:km,shadowmap_pars_vertex:Bm,shadowmap_vertex:Vm,shadowmask_pars_fragment:zm,skinbase_vertex:Hm,skinning_pars_vertex:Gm,skinning_vertex:Wm,skinnormal_vertex:Xm,specularmap_fragment:qm,specularmap_pars_fragment:jm,tonemapping_fragment:Ym,tonemapping_pars_fragment:Km,transmission_fragment:Zm,transmission_pars_fragment:Jm,uv_pars_fragment:$m,uv_pars_vertex:Qm,uv_vertex:eg,worldpos_vertex:tg,background_vert:ng,background_frag:ig,backgroundCube_vert:sg,backgroundCube_frag:rg,cube_vert:og,cube_frag:ag,depth_vert:lg,depth_frag:cg,distanceRGBA_vert:ug,distanceRGBA_frag:dg,equirect_vert:hg,equirect_frag:fg,linedashed_vert:pg,linedashed_frag:mg,meshbasic_vert:gg,meshbasic_frag:_g,meshlambert_vert:vg,meshlambert_frag:xg,meshmatcap_vert:yg,meshmatcap_frag:bg,meshnormal_vert:Sg,meshnormal_frag:Mg,meshphong_vert:Tg,meshphong_frag:Eg,meshphysical_vert:Ag,meshphysical_frag:wg,meshtoon_vert:Cg,meshtoon_frag:Rg,points_vert:Pg,points_frag:Ig,shadow_vert:Lg,shadow_frag:Dg,sprite_vert:Ug,sprite_frag:Ng},de={common:{diffuse:{value:new ze(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new qe}},envmap:{envMap:{value:null},envMapRotation:{value:new qe},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new qe}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new qe}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new qe},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new qe},normalScale:{value:new Be(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new qe},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new qe}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new qe}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new qe}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new ze(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new ze(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0},uvTransform:{value:new qe}},sprite:{diffuse:{value:new ze(16777215)},opacity:{value:1},center:{value:new Be(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new qe},alphaMap:{value:null},alphaMapTransform:{value:new qe},alphaTest:{value:0}}},_n={basic:{uniforms:Bt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.fog]),vertexShader:je.meshbasic_vert,fragmentShader:je.meshbasic_frag},lambert:{uniforms:Bt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)}}]),vertexShader:je.meshlambert_vert,fragmentShader:je.meshlambert_frag},phong:{uniforms:Bt([de.common,de.specularmap,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.fog,de.lights,{emissive:{value:new ze(0)},specular:{value:new ze(1118481)},shininess:{value:30}}]),vertexShader:je.meshphong_vert,fragmentShader:je.meshphong_frag},standard:{uniforms:Bt([de.common,de.envmap,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.roughnessmap,de.metalnessmap,de.fog,de.lights,{emissive:{value:new ze(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag},toon:{uniforms:Bt([de.common,de.aomap,de.lightmap,de.emissivemap,de.bumpmap,de.normalmap,de.displacementmap,de.gradientmap,de.fog,de.lights,{emissive:{value:new ze(0)}}]),vertexShader:je.meshtoon_vert,fragmentShader:je.meshtoon_frag},matcap:{uniforms:Bt([de.common,de.bumpmap,de.normalmap,de.displacementmap,de.fog,{matcap:{value:null}}]),vertexShader:je.meshmatcap_vert,fragmentShader:je.meshmatcap_frag},points:{uniforms:Bt([de.points,de.fog]),vertexShader:je.points_vert,fragmentShader:je.points_frag},dashed:{uniforms:Bt([de.common,de.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:je.linedashed_vert,fragmentShader:je.linedashed_frag},depth:{uniforms:Bt([de.common,de.displacementmap]),vertexShader:je.depth_vert,fragmentShader:je.depth_frag},normal:{uniforms:Bt([de.common,de.bumpmap,de.normalmap,de.displacementmap,{opacity:{value:1}}]),vertexShader:je.meshnormal_vert,fragmentShader:je.meshnormal_frag},sprite:{uniforms:Bt([de.sprite,de.fog]),vertexShader:je.sprite_vert,fragmentShader:je.sprite_frag},background:{uniforms:{uvTransform:{value:new qe},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:je.background_vert,fragmentShader:je.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new qe}},vertexShader:je.backgroundCube_vert,fragmentShader:je.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:je.cube_vert,fragmentShader:je.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:je.equirect_vert,fragmentShader:je.equirect_frag},distanceRGBA:{uniforms:Bt([de.common,de.displacementmap,{referencePosition:{value:new D},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:je.distanceRGBA_vert,fragmentShader:je.distanceRGBA_frag},shadow:{uniforms:Bt([de.lights,de.fog,{color:{value:new ze(0)},opacity:{value:1}}]),vertexShader:je.shadow_vert,fragmentShader:je.shadow_frag}};_n.physical={uniforms:Bt([_n.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new qe},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new qe},clearcoatNormalScale:{value:new Be(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new qe},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new qe},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new qe},sheen:{value:0},sheenColor:{value:new ze(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new qe},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new qe},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new qe},transmissionSamplerSize:{value:new Be},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new qe},attenuationDistance:{value:0},attenuationColor:{value:new ze(0)},specularColor:{value:new ze(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new qe},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new qe},anisotropyVector:{value:new Be},anisotropyMap:{value:null},anisotropyMapTransform:{value:new qe}}]),vertexShader:je.meshphysical_vert,fragmentShader:je.meshphysical_frag};const sr={r:0,b:0,g:0},li=new Sn,Fg=new Ye;function Og(s,e,t,n,i,r,o){const a=new ze(0);let l=r===!0?0:1,c,u,d=null,h=0,m=null;function _(E){let b=E.isScene===!0?E.background:null;return b&&b.isTexture&&(b=(E.backgroundBlurriness>0?t:e).get(b)),b}function v(E){let b=!1;const R=_(E);R===null?p(a,l):R&&R.isColor&&(p(R,1),b=!0);const P=s.xr.getEnvironmentBlendMode();P==="additive"?n.buffers.color.setClear(0,0,0,1,o):P==="alpha-blend"&&n.buffers.color.setClear(0,0,0,0,o),(s.autoClear||b)&&(n.buffers.depth.setTest(!0),n.buffers.depth.setMask(!0),n.buffers.color.setMask(!0),s.clear(s.autoClearColor,s.autoClearDepth,s.autoClearStencil))}function g(E,b){const R=_(b);R&&(R.isCubeTexture||R.mapping===Sr)?(u===void 0&&(u=new $t(new Ps(1,1,1),new ei({name:"BackgroundCubeMaterial",uniforms:Ji(_n.backgroundCube.uniforms),vertexShader:_n.backgroundCube.vertexShader,fragmentShader:_n.backgroundCube.fragmentShader,side:Xt,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),u.geometry.deleteAttribute("normal"),u.geometry.deleteAttribute("uv"),u.onBeforeRender=function(P,I,F){this.matrixWorld.copyPosition(F.matrixWorld)},Object.defineProperty(u.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),i.update(u)),li.copy(b.backgroundRotation),li.x*=-1,li.y*=-1,li.z*=-1,R.isCubeTexture&&R.isRenderTargetTexture===!1&&(li.y*=-1,li.z*=-1),u.material.uniforms.envMap.value=R,u.material.uniforms.flipEnvMap.value=R.isCubeTexture&&R.isRenderTargetTexture===!1?-1:1,u.material.uniforms.backgroundBlurriness.value=b.backgroundBlurriness,u.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,u.material.uniforms.backgroundRotation.value.setFromMatrix4(Fg.makeRotationFromEuler(li)),u.material.toneMapped=Qe.getTransfer(R.colorSpace)!==ht,(d!==R||h!==R.version||m!==s.toneMapping)&&(u.material.needsUpdate=!0,d=R,h=R.version,m=s.toneMapping),u.layers.enableAll(),E.unshift(u,u.geometry,u.material,0,0,null)):R&&R.isTexture&&(c===void 0&&(c=new $t(new Mr(2,2),new ei({name:"BackgroundMaterial",uniforms:Ji(_n.background.uniforms),vertexShader:_n.background.vertexShader,fragmentShader:_n.background.fragmentShader,side:Bn,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),i.update(c)),c.material.uniforms.t2D.value=R,c.material.uniforms.backgroundIntensity.value=b.backgroundIntensity,c.material.toneMapped=Qe.getTransfer(R.colorSpace)!==ht,R.matrixAutoUpdate===!0&&R.updateMatrix(),c.material.uniforms.uvTransform.value.copy(R.matrix),(d!==R||h!==R.version||m!==s.toneMapping)&&(c.material.needsUpdate=!0,d=R,h=R.version,m=s.toneMapping),c.layers.enableAll(),E.unshift(c,c.geometry,c.material,0,0,null))}function p(E,b){E.getRGB(sr,Uc(s)),n.buffers.color.setClear(sr.r,sr.g,sr.b,b,o)}function A(){u!==void 0&&(u.geometry.dispose(),u.material.dispose(),u=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(E,b=1){a.set(E),l=b,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(E){l=E,p(a,l)},render:v,addToRenderList:g,dispose:A}}function kg(s,e){const t=s.getParameter(s.MAX_VERTEX_ATTRIBS),n={},i=h(null);let r=i,o=!1;function a(S,C,Z,q,X){let j=!1;const B=d(q,Z,C);r!==B&&(r=B,c(r.object)),j=m(S,q,Z,X),j&&_(S,q,Z,X),X!==null&&e.update(X,s.ELEMENT_ARRAY_BUFFER),(j||o)&&(o=!1,b(S,C,Z,q),X!==null&&s.bindBuffer(s.ELEMENT_ARRAY_BUFFER,e.get(X).buffer))}function l(){return s.createVertexArray()}function c(S){return s.bindVertexArray(S)}function u(S){return s.deleteVertexArray(S)}function d(S,C,Z){const q=Z.wireframe===!0;let X=n[S.id];X===void 0&&(X={},n[S.id]=X);let j=X[C.id];j===void 0&&(j={},X[C.id]=j);let B=j[q];return B===void 0&&(B=h(l()),j[q]=B),B}function h(S){const C=[],Z=[],q=[];for(let X=0;X<t;X++)C[X]=0,Z[X]=0,q[X]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:C,enabledAttributes:Z,attributeDivisors:q,object:S,attributes:{},index:null}}function m(S,C,Z,q){const X=r.attributes,j=C.attributes;let B=0;const Q=Z.getAttributes();for(const V in Q)if(Q[V].location>=0){const oe=X[V];let pe=j[V];if(pe===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(pe=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(pe=S.instanceColor)),oe===void 0||oe.attribute!==pe||pe&&oe.data!==pe.data)return!0;B++}return r.attributesNum!==B||r.index!==q}function _(S,C,Z,q){const X={},j=C.attributes;let B=0;const Q=Z.getAttributes();for(const V in Q)if(Q[V].location>=0){let oe=j[V];oe===void 0&&(V==="instanceMatrix"&&S.instanceMatrix&&(oe=S.instanceMatrix),V==="instanceColor"&&S.instanceColor&&(oe=S.instanceColor));const pe={};pe.attribute=oe,oe&&oe.data&&(pe.data=oe.data),X[V]=pe,B++}r.attributes=X,r.attributesNum=B,r.index=q}function v(){const S=r.newAttributes;for(let C=0,Z=S.length;C<Z;C++)S[C]=0}function g(S){p(S,0)}function p(S,C){const Z=r.newAttributes,q=r.enabledAttributes,X=r.attributeDivisors;Z[S]=1,q[S]===0&&(s.enableVertexAttribArray(S),q[S]=1),X[S]!==C&&(s.vertexAttribDivisor(S,C),X[S]=C)}function A(){const S=r.newAttributes,C=r.enabledAttributes;for(let Z=0,q=C.length;Z<q;Z++)C[Z]!==S[Z]&&(s.disableVertexAttribArray(Z),C[Z]=0)}function E(S,C,Z,q,X,j,B){B===!0?s.vertexAttribIPointer(S,C,Z,X,j):s.vertexAttribPointer(S,C,Z,q,X,j)}function b(S,C,Z,q){v();const X=q.attributes,j=Z.getAttributes(),B=C.defaultAttributeValues;for(const Q in j){const V=j[Q];if(V.location>=0){let ee=X[Q];if(ee===void 0&&(Q==="instanceMatrix"&&S.instanceMatrix&&(ee=S.instanceMatrix),Q==="instanceColor"&&S.instanceColor&&(ee=S.instanceColor)),ee!==void 0){const oe=ee.normalized,pe=ee.itemSize,Oe=e.get(ee);if(Oe===void 0)continue;const st=Oe.buffer,rt=Oe.type,Y=Oe.bytesPerElement,ce=rt===s.INT||rt===s.UNSIGNED_INT||ee.gpuType===la;if(ee.isInterleavedBufferAttribute){const ae=ee.data,Le=ae.stride,De=ee.offset;if(ae.isInstancedInterleavedBuffer){for(let O=0;O<V.locationSize;O++)p(V.location+O,ae.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ae.meshPerAttribute*ae.count)}else for(let O=0;O<V.locationSize;O++)g(V.location+O);s.bindBuffer(s.ARRAY_BUFFER,st);for(let O=0;O<V.locationSize;O++)E(V.location+O,pe/V.locationSize,rt,oe,Le*Y,(De+pe/V.locationSize*O)*Y,ce)}else{if(ee.isInstancedBufferAttribute){for(let ae=0;ae<V.locationSize;ae++)p(V.location+ae,ee.meshPerAttribute);S.isInstancedMesh!==!0&&q._maxInstanceCount===void 0&&(q._maxInstanceCount=ee.meshPerAttribute*ee.count)}else for(let ae=0;ae<V.locationSize;ae++)g(V.location+ae);s.bindBuffer(s.ARRAY_BUFFER,st);for(let ae=0;ae<V.locationSize;ae++)E(V.location+ae,pe/V.locationSize,rt,oe,pe*Y,pe/V.locationSize*ae*Y,ce)}}else if(B!==void 0){const oe=B[Q];if(oe!==void 0)switch(oe.length){case 2:s.vertexAttrib2fv(V.location,oe);break;case 3:s.vertexAttrib3fv(V.location,oe);break;case 4:s.vertexAttrib4fv(V.location,oe);break;default:s.vertexAttrib1fv(V.location,oe)}}}}A()}function R(){F();for(const S in n){const C=n[S];for(const Z in C){const q=C[Z];for(const X in q)u(q[X].object),delete q[X];delete C[Z]}delete n[S]}}function P(S){if(n[S.id]===void 0)return;const C=n[S.id];for(const Z in C){const q=C[Z];for(const X in q)u(q[X].object),delete q[X];delete C[Z]}delete n[S.id]}function I(S){for(const C in n){const Z=n[C];if(Z[S.id]===void 0)continue;const q=Z[S.id];for(const X in q)u(q[X].object),delete q[X];delete Z[S.id]}}function F(){M(),o=!0,r!==i&&(r=i,c(r.object))}function M(){i.geometry=null,i.program=null,i.wireframe=!1}return{setup:a,reset:F,resetDefaultState:M,dispose:R,releaseStatesOfGeometry:P,releaseStatesOfProgram:I,initAttributes:v,enableAttribute:g,disableUnusedAttributes:A}}function Bg(s,e,t){let n;function i(c){n=c}function r(c,u){s.drawArrays(n,c,u),t.update(u,n,1)}function o(c,u,d){d!==0&&(s.drawArraysInstanced(n,c,u,d),t.update(u,n,d))}function a(c,u,d){if(d===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(n,c,0,u,0,d);let m=0;for(let _=0;_<d;_++)m+=u[_];t.update(m,n,1)}function l(c,u,d,h){if(d===0)return;const m=e.get("WEBGL_multi_draw");if(m===null)for(let _=0;_<c.length;_++)o(c[_],u[_],h[_]);else{m.multiDrawArraysInstancedWEBGL(n,c,0,u,0,h,0,d);let _=0;for(let v=0;v<d;v++)_+=u[v]*h[v];t.update(_,n,1)}}this.setMode=i,this.render=r,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function Vg(s,e,t,n){let i;function r(){if(i!==void 0)return i;if(e.has("EXT_texture_filter_anisotropic")===!0){const I=e.get("EXT_texture_filter_anisotropic");i=s.getParameter(I.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else i=0;return i}function o(I){return!(I!==on&&n.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(I){const F=I===Cs&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(I!==bn&&n.convert(I)!==s.getParameter(s.IMPLEMENTATION_COLOR_READ_TYPE)&&I!==hn&&!F)}function l(I){if(I==="highp"){if(s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.HIGH_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.HIGH_FLOAT).precision>0)return"highp";I="mediump"}return I==="mediump"&&s.getShaderPrecisionFormat(s.VERTEX_SHADER,s.MEDIUM_FLOAT).precision>0&&s.getShaderPrecisionFormat(s.FRAGMENT_SHADER,s.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp";const u=l(c);u!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",u,"instead."),c=u);const d=t.logarithmicDepthBuffer===!0,h=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),m=s.getParameter(s.MAX_TEXTURE_IMAGE_UNITS),_=s.getParameter(s.MAX_VERTEX_TEXTURE_IMAGE_UNITS),v=s.getParameter(s.MAX_TEXTURE_SIZE),g=s.getParameter(s.MAX_CUBE_MAP_TEXTURE_SIZE),p=s.getParameter(s.MAX_VERTEX_ATTRIBS),A=s.getParameter(s.MAX_VERTEX_UNIFORM_VECTORS),E=s.getParameter(s.MAX_VARYING_VECTORS),b=s.getParameter(s.MAX_FRAGMENT_UNIFORM_VECTORS),R=_>0,P=s.getParameter(s.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:r,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:d,reversedDepthBuffer:h,maxTextures:m,maxVertexTextures:_,maxTextureSize:v,maxCubemapSize:g,maxAttributes:p,maxVertexUniforms:A,maxVaryings:E,maxFragmentUniforms:b,vertexTextures:R,maxSamples:P}}function zg(s){const e=this;let t=null,n=0,i=!1,r=!1;const o=new Kn,a=new qe,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(d,h){const m=d.length!==0||h||n!==0||i;return i=h,n=d.length,m},this.beginShadows=function(){r=!0,u(null)},this.endShadows=function(){r=!1},this.setGlobalState=function(d,h){t=u(d,h,0)},this.setState=function(d,h,m){const _=d.clippingPlanes,v=d.clipIntersection,g=d.clipShadows,p=s.get(d);if(!i||_===null||_.length===0||r&&!g)r?u(null):c();else{const A=r?0:n,E=A*4;let b=p.clippingState||null;l.value=b,b=u(_,h,E,m);for(let R=0;R!==E;++R)b[R]=t[R];p.clippingState=b,this.numIntersection=v?this.numPlanes:0,this.numPlanes+=A}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=n>0),e.numPlanes=n,e.numIntersection=0}function u(d,h,m,_){const v=d!==null?d.length:0;let g=null;if(v!==0){if(g=l.value,_!==!0||g===null){const p=m+v*4,A=h.matrixWorldInverse;a.getNormalMatrix(A),(g===null||g.length<p)&&(g=new Float32Array(p));for(let E=0,b=m;E!==v;++E,b+=4)o.copy(d[E]).applyMatrix4(A,a),o.normal.toArray(g,b),g[b+3]=o.constant}l.value=g,l.needsUpdate=!0}return e.numPlanes=v,e.numIntersection=0,g}}function Hg(s){let e=new WeakMap;function t(o,a){return a===Eo?o.mapping=ji:a===Ao&&(o.mapping=Yi),o}function n(o){if(o&&o.isTexture){const a=o.mapping;if(a===Eo||a===Ao)if(e.has(o)){const l=e.get(o).texture;return t(l,o.mapping)}else{const l=o.image;if(l&&l.height>0){const c=new nf(l.height);return c.fromEquirectangularTexture(s,o),e.set(o,c),o.addEventListener("dispose",i),t(c.texture,o.mapping)}else return null}}return o}function i(o){const a=o.target;a.removeEventListener("dispose",i);const l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function r(){e=new WeakMap}return{get:n,dispose:r}}const Bi=4,Rl=[.125,.215,.35,.446,.526,.582],fi=20,so=new Ea,Pl=new ze;let ro=null,oo=0,ao=0,lo=!1;const di=(1+Math.sqrt(5))/2,Ni=1/di,Il=[new D(-di,Ni,0),new D(di,Ni,0),new D(-Ni,0,di),new D(Ni,0,di),new D(0,di,-Ni),new D(0,di,Ni),new D(-1,1,-1),new D(1,1,-1),new D(-1,1,1),new D(1,1,1)],Gg=new D;class Ll{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,n=.1,i=100,r={}){const{size:o=256,position:a=Gg}=r;ro=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),ao=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);const l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,n,i,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Nl(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=Ul(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(ro,oo,ao),this._renderer.xr.enabled=lo,e.scissorTest=!1,rr(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===ji||e.mapping===Yi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),ro=this._renderer.getRenderTarget(),oo=this._renderer.getActiveCubeFace(),ao=this._renderer.getActiveMipmapLevel(),lo=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;const n=t||this._allocateTargets();return this._textureToCubeUV(e,n),this._applyPMREM(n),this._cleanup(n),n}_allocateTargets(){const e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,n={magFilter:Zt,minFilter:Zt,generateMipmaps:!1,type:Cs,format:on,colorSpace:Ht,depthBuffer:!1},i=Dl(e,t,n);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Dl(e,t,n);const{_lodMax:r}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Wg(r)),this._blurMaterial=Xg(r,e,t)}return i}_compileMaterial(e){const t=new $t(this._lodPlanes[0],e);this._renderer.compile(t,so)}_sceneToCubeUV(e,t,n,i,r){const l=new Ft(90,1,t,n),c=[1,-1,1,1,1,1],u=[1,1,1,-1,-1,-1],d=this._renderer,h=d.autoClear,m=d.toneMapping;d.getClearColor(Pl),d.toneMapping=Qn,d.autoClear=!1,d.state.buffers.depth.getReversed()&&(d.setRenderTarget(i),d.clearDepth(),d.setRenderTarget(null));const v=new pi({name:"PMREM.Background",side:Xt,depthWrite:!1,depthTest:!1}),g=new $t(new Ps,v);let p=!1;const A=e.background;A?A.isColor&&(v.color.copy(A),e.background=null,p=!0):(v.color.copy(Pl),p=!0);for(let E=0;E<6;E++){const b=E%3;b===0?(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x+u[E],r.y,r.z)):b===1?(l.up.set(0,0,c[E]),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y+u[E],r.z)):(l.up.set(0,c[E],0),l.position.set(r.x,r.y,r.z),l.lookAt(r.x,r.y,r.z+u[E]));const R=this._cubeSize;rr(i,b*R,E>2?R:0,R,R),d.setRenderTarget(i),p&&d.render(g,l),d.render(e,l)}g.geometry.dispose(),g.material.dispose(),d.toneMapping=m,d.autoClear=h,e.background=A}_textureToCubeUV(e,t){const n=this._renderer,i=e.mapping===ji||e.mapping===Yi;i?(this._cubemapMaterial===null&&(this._cubemapMaterial=Nl()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=Ul());const r=i?this._cubemapMaterial:this._equirectMaterial,o=new $t(this._lodPlanes[0],r),a=r.uniforms;a.envMap.value=e;const l=this._cubeSize;rr(t,0,0,3*l,2*l),n.setRenderTarget(t),n.render(o,so)}_applyPMREM(e){const t=this._renderer,n=t.autoClear;t.autoClear=!1;const i=this._lodPlanes.length;for(let r=1;r<i;r++){const o=Math.sqrt(this._sigmas[r]*this._sigmas[r]-this._sigmas[r-1]*this._sigmas[r-1]),a=Il[(i-r-1)%Il.length];this._blur(e,r-1,r,o,a)}t.autoClear=n}_blur(e,t,n,i,r){const o=this._pingPongRenderTarget;this._halfBlur(e,o,t,n,i,"latitudinal",r),this._halfBlur(o,e,n,n,i,"longitudinal",r)}_halfBlur(e,t,n,i,r,o,a){const l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");const u=3,d=new $t(this._lodPlanes[i],c),h=c.uniforms,m=this._sizeLods[n]-1,_=isFinite(r)?Math.PI/(2*m):2*Math.PI/(2*fi-1),v=r/_,g=isFinite(r)?1+Math.floor(u*v):fi;g>fi&&console.warn(`sigmaRadians, ${r}, is too large and will clip, as it requested ${g} samples when the maximum is set to ${fi}`);const p=[];let A=0;for(let I=0;I<fi;++I){const F=I/v,M=Math.exp(-F*F/2);p.push(M),I===0?A+=M:I<g&&(A+=2*M)}for(let I=0;I<p.length;I++)p[I]=p[I]/A;h.envMap.value=e.texture,h.samples.value=g,h.weights.value=p,h.latitudinal.value=o==="latitudinal",a&&(h.poleAxis.value=a);const{_lodMax:E}=this;h.dTheta.value=_,h.mipInt.value=E-n;const b=this._sizeLods[i],R=3*b*(i>E-Bi?i-E+Bi:0),P=4*(this._cubeSize-b);rr(t,R,P,3*b,2*b),l.setRenderTarget(t),l.render(d,so)}}function Wg(s){const e=[],t=[],n=[];let i=s;const r=s-Bi+1+Rl.length;for(let o=0;o<r;o++){const a=Math.pow(2,i);t.push(a);let l=1/a;o>s-Bi?l=Rl[o-s+Bi-1]:o===0&&(l=0),n.push(l);const c=1/(a-2),u=-c,d=1+c,h=[u,u,d,u,d,d,u,u,d,d,u,d],m=6,_=6,v=3,g=2,p=1,A=new Float32Array(v*_*m),E=new Float32Array(g*_*m),b=new Float32Array(p*_*m);for(let P=0;P<m;P++){const I=P%3*2/3-1,F=P>2?0:-1,M=[I,F,0,I+2/3,F,0,I+2/3,F+1,0,I,F,0,I+2/3,F+1,0,I,F+1,0];A.set(M,v*_*P),E.set(h,g*_*P);const S=[P,P,P,P,P,P];b.set(S,p*_*P)}const R=new Tn;R.setAttribute("position",new zt(A,v)),R.setAttribute("uv",new zt(E,g)),R.setAttribute("faceIndex",new zt(b,p)),e.push(R),i>Bi&&i--}return{lodPlanes:e,sizeLods:t,sigmas:n}}function Dl(s,e,t){const n=new _i(s,e,t);return n.texture.mapping=Sr,n.texture.name="PMREM.cubeUv",n.scissorTest=!0,n}function rr(s,e,t,n,i){s.viewport.set(e,t,n,i),s.scissor.set(e,t,n,i)}function Xg(s,e,t){const n=new Float32Array(fi),i=new D(0,1,0);return new ei({name:"SphericalGaussianBlur",defines:{n:fi,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${s}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:n},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:i}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ul(){return new ei({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Nl(){return new ei({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Ca(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:$n,depthTest:!1,depthWrite:!1})}function Ca(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function qg(s){let e=new WeakMap,t=null;function n(a){if(a&&a.isTexture){const l=a.mapping,c=l===Eo||l===Ao,u=l===ji||l===Yi;if(c||u){let d=e.get(a);const h=d!==void 0?d.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==h)return t===null&&(t=new Ll(s)),d=c?t.fromEquirectangular(a,d):t.fromCubemap(a,d),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),d.texture;if(d!==void 0)return d.texture;{const m=a.image;return c&&m&&m.height>0||u&&m&&i(m)?(t===null&&(t=new Ll(s)),d=c?t.fromEquirectangular(a):t.fromCubemap(a),d.texture.pmremVersion=a.pmremVersion,e.set(a,d),a.addEventListener("dispose",r),d.texture):null}}}return a}function i(a){let l=0;const c=6;for(let u=0;u<c;u++)a[u]!==void 0&&l++;return l===c}function r(a){const l=a.target;l.removeEventListener("dispose",r);const c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:n,dispose:o}}function jg(s){const e={};function t(n){if(e[n]!==void 0)return e[n];let i;switch(n){case"WEBGL_depth_texture":i=s.getExtension("WEBGL_depth_texture")||s.getExtension("MOZ_WEBGL_depth_texture")||s.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":i=s.getExtension("EXT_texture_filter_anisotropic")||s.getExtension("MOZ_EXT_texture_filter_anisotropic")||s.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":i=s.getExtension("WEBGL_compressed_texture_s3tc")||s.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":i=s.getExtension("WEBGL_compressed_texture_pvrtc")||s.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:i=s.getExtension(n)}return e[n]=i,i}return{has:function(n){return t(n)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(n){const i=t(n);return i===null&&Gi("THREE.WebGLRenderer: "+n+" extension not supported."),i}}}function Yg(s,e,t,n){const i={},r=new WeakMap;function o(d){const h=d.target;h.index!==null&&e.remove(h.index);for(const _ in h.attributes)e.remove(h.attributes[_]);h.removeEventListener("dispose",o),delete i[h.id];const m=r.get(h);m&&(e.remove(m),r.delete(h)),n.releaseStatesOfGeometry(h),h.isInstancedBufferGeometry===!0&&delete h._maxInstanceCount,t.memory.geometries--}function a(d,h){return i[h.id]===!0||(h.addEventListener("dispose",o),i[h.id]=!0,t.memory.geometries++),h}function l(d){const h=d.attributes;for(const m in h)e.update(h[m],s.ARRAY_BUFFER)}function c(d){const h=[],m=d.index,_=d.attributes.position;let v=0;if(m!==null){const A=m.array;v=m.version;for(let E=0,b=A.length;E<b;E+=3){const R=A[E+0],P=A[E+1],I=A[E+2];h.push(R,P,P,I,I,R)}}else if(_!==void 0){const A=_.array;v=_.version;for(let E=0,b=A.length/3-1;E<b;E+=3){const R=E+0,P=E+1,I=E+2;h.push(R,P,P,I,I,R)}}else return;const g=new(Cc(h)?Dc:Lc)(h,1);g.version=v;const p=r.get(d);p&&e.remove(p),r.set(d,g)}function u(d){const h=r.get(d);if(h){const m=d.index;m!==null&&h.version<m.version&&c(d)}else c(d);return r.get(d)}return{get:a,update:l,getWireframeAttribute:u}}function Kg(s,e,t){let n;function i(h){n=h}let r,o;function a(h){r=h.type,o=h.bytesPerElement}function l(h,m){s.drawElements(n,m,r,h*o),t.update(m,n,1)}function c(h,m,_){_!==0&&(s.drawElementsInstanced(n,m,r,h*o,_),t.update(m,n,_))}function u(h,m,_){if(_===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(n,m,0,r,h,0,_);let g=0;for(let p=0;p<_;p++)g+=m[p];t.update(g,n,1)}function d(h,m,_,v){if(_===0)return;const g=e.get("WEBGL_multi_draw");if(g===null)for(let p=0;p<h.length;p++)c(h[p]/o,m[p],v[p]);else{g.multiDrawElementsInstancedWEBGL(n,m,0,r,h,0,v,0,_);let p=0;for(let A=0;A<_;A++)p+=m[A]*v[A];t.update(p,n,1)}}this.setMode=i,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=u,this.renderMultiDrawInstances=d}function Zg(s){const e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function n(r,o,a){switch(t.calls++,o){case s.TRIANGLES:t.triangles+=a*(r/3);break;case s.LINES:t.lines+=a*(r/2);break;case s.LINE_STRIP:t.lines+=a*(r-1);break;case s.LINE_LOOP:t.lines+=a*r;break;case s.POINTS:t.points+=a*r;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function i(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:i,update:n}}function Jg(s,e,t){const n=new WeakMap,i=new ot;function r(o,a,l){const c=o.morphTargetInfluences,u=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,d=u!==void 0?u.length:0;let h=n.get(a);if(h===void 0||h.count!==d){let M=function(){I.dispose(),n.delete(a),a.removeEventListener("dispose",M)};h!==void 0&&h.texture.dispose();const m=a.morphAttributes.position!==void 0,_=a.morphAttributes.normal!==void 0,v=a.morphAttributes.color!==void 0,g=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],A=a.morphAttributes.color||[];let E=0;m===!0&&(E=1),_===!0&&(E=2),v===!0&&(E=3);let b=a.attributes.position.count*E,R=1;b>e.maxTextureSize&&(R=Math.ceil(b/e.maxTextureSize),b=e.maxTextureSize);const P=new Float32Array(b*R*4*d),I=new Rc(P,b,R,d);I.type=hn,I.needsUpdate=!0;const F=E*4;for(let S=0;S<d;S++){const C=g[S],Z=p[S],q=A[S],X=b*R*4*S;for(let j=0;j<C.count;j++){const B=j*F;m===!0&&(i.fromBufferAttribute(C,j),P[X+B+0]=i.x,P[X+B+1]=i.y,P[X+B+2]=i.z,P[X+B+3]=0),_===!0&&(i.fromBufferAttribute(Z,j),P[X+B+4]=i.x,P[X+B+5]=i.y,P[X+B+6]=i.z,P[X+B+7]=0),v===!0&&(i.fromBufferAttribute(q,j),P[X+B+8]=i.x,P[X+B+9]=i.y,P[X+B+10]=i.z,P[X+B+11]=q.itemSize===4?i.w:1)}}h={count:d,texture:I,size:new Be(b,R)},n.set(a,h),a.addEventListener("dispose",M)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(s,"morphTexture",o.morphTexture,t);else{let m=0;for(let v=0;v<c.length;v++)m+=c[v];const _=a.morphTargetsRelative?1:1-m;l.getUniforms().setValue(s,"morphTargetBaseInfluence",_),l.getUniforms().setValue(s,"morphTargetInfluences",c)}l.getUniforms().setValue(s,"morphTargetsTexture",h.texture,t),l.getUniforms().setValue(s,"morphTargetsTextureSize",h.size)}return{update:r}}function $g(s,e,t,n){let i=new WeakMap;function r(l){const c=n.render.frame,u=l.geometry,d=e.get(l,u);if(i.get(d)!==c&&(e.update(d),i.set(d,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),i.get(l)!==c&&(t.update(l.instanceMatrix,s.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,s.ARRAY_BUFFER),i.set(l,c))),l.isSkinnedMesh){const h=l.skeleton;i.get(h)!==c&&(h.update(),i.set(h,c))}return d}function o(){i=new WeakMap}function a(l){const c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:r,dispose:o}}const Yc=new Dt,Fl=new zc(1,1),Kc=new Rc,Zc=new Bh,Jc=new Fc,Ol=[],kl=[],Bl=new Float32Array(16),Vl=new Float32Array(9),zl=new Float32Array(4);function ss(s,e,t){const n=s[0];if(n<=0||n>0)return s;const i=e*t;let r=Ol[i];if(r===void 0&&(r=new Float32Array(i),Ol[i]=r),e!==0){n.toArray(r,0);for(let o=1,a=0;o!==e;++o)a+=t,s[o].toArray(r,a)}return r}function Ct(s,e){if(s.length!==e.length)return!1;for(let t=0,n=s.length;t<n;t++)if(s[t]!==e[t])return!1;return!0}function Rt(s,e){for(let t=0,n=e.length;t<n;t++)s[t]=e[t]}function Er(s,e){let t=kl[e];t===void 0&&(t=new Int32Array(e),kl[e]=t);for(let n=0;n!==e;++n)t[n]=s.allocateTextureUnit();return t}function Qg(s,e){const t=this.cache;t[0]!==e&&(s.uniform1f(this.addr,e),t[0]=e)}function e_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;s.uniform2fv(this.addr,e),Rt(t,e)}}function t_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(s.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Ct(t,e))return;s.uniform3fv(this.addr,e),Rt(t,e)}}function n_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;s.uniform4fv(this.addr,e),Rt(t,e)}}function i_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;s.uniformMatrix2fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,n))return;zl.set(n),s.uniformMatrix2fv(this.addr,!1,zl),Rt(t,n)}}function s_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;s.uniformMatrix3fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,n))return;Vl.set(n),s.uniformMatrix3fv(this.addr,!1,Vl),Rt(t,n)}}function r_(s,e){const t=this.cache,n=e.elements;if(n===void 0){if(Ct(t,e))return;s.uniformMatrix4fv(this.addr,!1,e),Rt(t,e)}else{if(Ct(t,n))return;Bl.set(n),s.uniformMatrix4fv(this.addr,!1,Bl),Rt(t,n)}}function o_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1i(this.addr,e),t[0]=e)}function a_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;s.uniform2iv(this.addr,e),Rt(t,e)}}function l_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;s.uniform3iv(this.addr,e),Rt(t,e)}}function c_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;s.uniform4iv(this.addr,e),Rt(t,e)}}function u_(s,e){const t=this.cache;t[0]!==e&&(s.uniform1ui(this.addr,e),t[0]=e)}function d_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(s.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Ct(t,e))return;s.uniform2uiv(this.addr,e),Rt(t,e)}}function h_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(s.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Ct(t,e))return;s.uniform3uiv(this.addr,e),Rt(t,e)}}function f_(s,e){const t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(s.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Ct(t,e))return;s.uniform4uiv(this.addr,e),Rt(t,e)}}function p_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i);let r;this.type===s.SAMPLER_2D_SHADOW?(Fl.compareFunction=wc,r=Fl):r=Yc,t.setTexture2D(e||r,i)}function m_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture3D(e||Zc,i)}function g_(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTextureCube(e||Jc,i)}function __(s,e,t){const n=this.cache,i=t.allocateTextureUnit();n[0]!==i&&(s.uniform1i(this.addr,i),n[0]=i),t.setTexture2DArray(e||Kc,i)}function v_(s){switch(s){case 5126:return Qg;case 35664:return e_;case 35665:return t_;case 35666:return n_;case 35674:return i_;case 35675:return s_;case 35676:return r_;case 5124:case 35670:return o_;case 35667:case 35671:return a_;case 35668:case 35672:return l_;case 35669:case 35673:return c_;case 5125:return u_;case 36294:return d_;case 36295:return h_;case 36296:return f_;case 35678:case 36198:case 36298:case 36306:case 35682:return p_;case 35679:case 36299:case 36307:return m_;case 35680:case 36300:case 36308:case 36293:return g_;case 36289:case 36303:case 36311:case 36292:return __}}function x_(s,e){s.uniform1fv(this.addr,e)}function y_(s,e){const t=ss(e,this.size,2);s.uniform2fv(this.addr,t)}function b_(s,e){const t=ss(e,this.size,3);s.uniform3fv(this.addr,t)}function S_(s,e){const t=ss(e,this.size,4);s.uniform4fv(this.addr,t)}function M_(s,e){const t=ss(e,this.size,4);s.uniformMatrix2fv(this.addr,!1,t)}function T_(s,e){const t=ss(e,this.size,9);s.uniformMatrix3fv(this.addr,!1,t)}function E_(s,e){const t=ss(e,this.size,16);s.uniformMatrix4fv(this.addr,!1,t)}function A_(s,e){s.uniform1iv(this.addr,e)}function w_(s,e){s.uniform2iv(this.addr,e)}function C_(s,e){s.uniform3iv(this.addr,e)}function R_(s,e){s.uniform4iv(this.addr,e)}function P_(s,e){s.uniform1uiv(this.addr,e)}function I_(s,e){s.uniform2uiv(this.addr,e)}function L_(s,e){s.uniform3uiv(this.addr,e)}function D_(s,e){s.uniform4uiv(this.addr,e)}function U_(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);Ct(n,r)||(s.uniform1iv(this.addr,r),Rt(n,r));for(let o=0;o!==i;++o)t.setTexture2D(e[o]||Yc,r[o])}function N_(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);Ct(n,r)||(s.uniform1iv(this.addr,r),Rt(n,r));for(let o=0;o!==i;++o)t.setTexture3D(e[o]||Zc,r[o])}function F_(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);Ct(n,r)||(s.uniform1iv(this.addr,r),Rt(n,r));for(let o=0;o!==i;++o)t.setTextureCube(e[o]||Jc,r[o])}function O_(s,e,t){const n=this.cache,i=e.length,r=Er(t,i);Ct(n,r)||(s.uniform1iv(this.addr,r),Rt(n,r));for(let o=0;o!==i;++o)t.setTexture2DArray(e[o]||Kc,r[o])}function k_(s){switch(s){case 5126:return x_;case 35664:return y_;case 35665:return b_;case 35666:return S_;case 35674:return M_;case 35675:return T_;case 35676:return E_;case 5124:case 35670:return A_;case 35667:case 35671:return w_;case 35668:case 35672:return C_;case 35669:case 35673:return R_;case 5125:return P_;case 36294:return I_;case 36295:return L_;case 36296:return D_;case 35678:case 36198:case 36298:case 36306:case 35682:return U_;case 35679:case 36299:case 36307:return N_;case 35680:case 36300:case 36308:case 36293:return F_;case 36289:case 36303:case 36311:case 36292:return O_}}class B_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.setValue=v_(t.type)}}class V_{constructor(e,t,n){this.id=e,this.addr=n,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=k_(t.type)}}class z_{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,n){const i=this.seq;for(let r=0,o=i.length;r!==o;++r){const a=i[r];a.setValue(e,t[a.id],n)}}}const co=/(\w+)(\])?(\[|\.)?/g;function Hl(s,e){s.seq.push(e),s.map[e.id]=e}function H_(s,e,t){const n=s.name,i=n.length;for(co.lastIndex=0;;){const r=co.exec(n),o=co.lastIndex;let a=r[1];const l=r[2]==="]",c=r[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===i){Hl(t,c===void 0?new B_(a,s,e):new V_(a,s,e));break}else{let d=t.map[a];d===void 0&&(d=new z_(a),Hl(t,d)),t=d}}}class mr{constructor(e,t){this.seq=[],this.map={};const n=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let i=0;i<n;++i){const r=e.getActiveUniform(t,i),o=e.getUniformLocation(t,r.name);H_(r,o,this)}}setValue(e,t,n,i){const r=this.map[t];r!==void 0&&r.setValue(e,n,i)}setOptional(e,t,n){const i=t[n];i!==void 0&&this.setValue(e,n,i)}static upload(e,t,n,i){for(let r=0,o=t.length;r!==o;++r){const a=t[r],l=n[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,i)}}static seqWithValue(e,t){const n=[];for(let i=0,r=e.length;i!==r;++i){const o=e[i];o.id in t&&n.push(o)}return n}}function Gl(s,e,t){const n=s.createShader(e);return s.shaderSource(n,t),s.compileShader(n),n}const G_=37297;let W_=0;function X_(s,e){const t=s.split(`
`),n=[],i=Math.max(e-6,0),r=Math.min(e+6,t.length);for(let o=i;o<r;o++){const a=o+1;n.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return n.join(`
`)}const Wl=new qe;function q_(s){Qe._getMatrix(Wl,Qe.workingColorSpace,s);const e=`mat3( ${Wl.elements.map(t=>t.toFixed(4))} )`;switch(Qe.getTransfer(s)){case vr:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",s),[e,"LinearTransferOETF"]}}function Xl(s,e,t){const n=s.getShaderParameter(e,s.COMPILE_STATUS),r=(s.getShaderInfoLog(e)||"").trim();if(n&&r==="")return"";const o=/ERROR: 0:(\d+)/.exec(r);if(o){const a=parseInt(o[1]);return t.toUpperCase()+`

`+r+`

`+X_(s.getShaderSource(e),a)}else return r}function j_(s,e){const t=q_(e);return[`vec4 ${s}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function Y_(s,e){let t;switch(e){case jd:t="Linear";break;case Yd:t="Reinhard";break;case Kd:t="Cineon";break;case Zd:t="ACESFilmic";break;case $d:t="AgX";break;case Qd:t="Neutral";break;case Jd:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+s+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}const or=new D;function K_(){Qe.getLuminanceCoefficients(or);const s=or.x.toFixed(4),e=or.y.toFixed(4),t=or.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${s}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function Z_(s){return[s.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",s.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(gs).join(`
`)}function J_(s){const e=[];for(const t in s){const n=s[t];n!==!1&&e.push("#define "+t+" "+n)}return e.join(`
`)}function $_(s,e){const t={},n=s.getProgramParameter(e,s.ACTIVE_ATTRIBUTES);for(let i=0;i<n;i++){const r=s.getActiveAttrib(e,i),o=r.name;let a=1;r.type===s.FLOAT_MAT2&&(a=2),r.type===s.FLOAT_MAT3&&(a=3),r.type===s.FLOAT_MAT4&&(a=4),t[o]={type:r.type,location:s.getAttribLocation(e,o),locationSize:a}}return t}function gs(s){return s!==""}function ql(s,e){const t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return s.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function jl(s,e){return s.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}const Q_=/^[ \t]*#include +<([\w\d./]+)>/gm;function sa(s){return s.replace(Q_,tv)}const ev=new Map;function tv(s,e){let t=je[e];if(t===void 0){const n=ev.get(e);if(n!==void 0)t=je[n],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,n);else throw new Error("Can not resolve #include <"+e+">")}return sa(t)}const nv=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function Yl(s){return s.replace(nv,iv)}function iv(s,e,t,n){let i="";for(let r=parseInt(e);r<parseInt(t);r++)i+=n.replace(/\[\s*i\s*\]/g,"[ "+r+" ]").replace(/UNROLLED_LOOP_INDEX/g,r);return i}function Kl(s){let e=`precision ${s.precision} float;
	precision ${s.precision} int;
	precision ${s.precision} sampler2D;
	precision ${s.precision} samplerCube;
	precision ${s.precision} sampler3D;
	precision ${s.precision} sampler2DArray;
	precision ${s.precision} sampler2DShadow;
	precision ${s.precision} samplerCubeShadow;
	precision ${s.precision} sampler2DArrayShadow;
	precision ${s.precision} isampler2D;
	precision ${s.precision} isampler3D;
	precision ${s.precision} isamplerCube;
	precision ${s.precision} isampler2DArray;
	precision ${s.precision} usampler2D;
	precision ${s.precision} usampler3D;
	precision ${s.precision} usamplerCube;
	precision ${s.precision} usampler2DArray;
	`;return s.precision==="highp"?e+=`
#define HIGH_PRECISION`:s.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:s.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function sv(s){let e="SHADOWMAP_TYPE_BASIC";return s.shadowMapType===pc?e="SHADOWMAP_TYPE_PCF":s.shadowMapType===Ad?e="SHADOWMAP_TYPE_PCF_SOFT":s.shadowMapType===Dn&&(e="SHADOWMAP_TYPE_VSM"),e}function rv(s){let e="ENVMAP_TYPE_CUBE";if(s.envMap)switch(s.envMapMode){case ji:case Yi:e="ENVMAP_TYPE_CUBE";break;case Sr:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ov(s){let e="ENVMAP_MODE_REFLECTION";if(s.envMap)switch(s.envMapMode){case Yi:e="ENVMAP_MODE_REFRACTION";break}return e}function av(s){let e="ENVMAP_BLENDING_NONE";if(s.envMap)switch(s.combine){case mc:e="ENVMAP_BLENDING_MULTIPLY";break;case Xd:e="ENVMAP_BLENDING_MIX";break;case qd:e="ENVMAP_BLENDING_ADD";break}return e}function lv(s){const e=s.envMapCubeUVHeight;if(e===null)return null;const t=Math.log2(e)-2,n=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),7*16)),texelHeight:n,maxMip:t}}function cv(s,e,t,n){const i=s.getContext(),r=t.defines;let o=t.vertexShader,a=t.fragmentShader;const l=sv(t),c=rv(t),u=ov(t),d=av(t),h=lv(t),m=Z_(t),_=J_(r),v=i.createProgram();let g,p,A=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(g=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(gs).join(`
`),g.length>0&&(g+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_].filter(gs).join(`
`),p.length>0&&(p+=`
`)):(g=[Kl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+u:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(gs).join(`
`),p=[Kl(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,_,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+u:"",t.envMap?"#define "+d:"",h?"#define CUBEUV_TEXEL_WIDTH "+h.texelWidth:"",h?"#define CUBEUV_TEXEL_HEIGHT "+h.texelHeight:"",h?"#define CUBEUV_MAX_MIP "+h.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGDEPTHBUF":"",t.reversedDepthBuffer?"#define USE_REVERSEDEPTHBUF":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Qn?"#define TONE_MAPPING":"",t.toneMapping!==Qn?je.tonemapping_pars_fragment:"",t.toneMapping!==Qn?Y_("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",je.colorspace_pars_fragment,j_("linearToOutputTexel",t.outputColorSpace),K_(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(gs).join(`
`)),o=sa(o),o=ql(o,t),o=jl(o,t),a=sa(a),a=ql(a,t),a=jl(a,t),o=Yl(o),a=Yl(a),t.isRawShaderMaterial!==!0&&(A=`#version 300 es
`,g=[m,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+g,p=["#define varying in",t.glslVersion===Wa?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Wa?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);const E=A+g+o,b=A+p+a,R=Gl(i,i.VERTEX_SHADER,E),P=Gl(i,i.FRAGMENT_SHADER,b);i.attachShader(v,R),i.attachShader(v,P),t.index0AttributeName!==void 0?i.bindAttribLocation(v,0,t.index0AttributeName):t.morphTargets===!0&&i.bindAttribLocation(v,0,"position"),i.linkProgram(v);function I(C){if(s.debug.checkShaderErrors){const Z=i.getProgramInfoLog(v)||"",q=i.getShaderInfoLog(R)||"",X=i.getShaderInfoLog(P)||"",j=Z.trim(),B=q.trim(),Q=X.trim();let V=!0,ee=!0;if(i.getProgramParameter(v,i.LINK_STATUS)===!1)if(V=!1,typeof s.debug.onShaderError=="function")s.debug.onShaderError(i,v,R,P);else{const oe=Xl(i,R,"vertex"),pe=Xl(i,P,"fragment");console.error("THREE.WebGLProgram: Shader Error "+i.getError()+" - VALIDATE_STATUS "+i.getProgramParameter(v,i.VALIDATE_STATUS)+`

Material Name: `+C.name+`
Material Type: `+C.type+`

Program Info Log: `+j+`
`+oe+`
`+pe)}else j!==""?console.warn("THREE.WebGLProgram: Program Info Log:",j):(B===""||Q==="")&&(ee=!1);ee&&(C.diagnostics={runnable:V,programLog:j,vertexShader:{log:B,prefix:g},fragmentShader:{log:Q,prefix:p}})}i.deleteShader(R),i.deleteShader(P),F=new mr(i,v),M=$_(i,v)}let F;this.getUniforms=function(){return F===void 0&&I(this),F};let M;this.getAttributes=function(){return M===void 0&&I(this),M};let S=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return S===!1&&(S=i.getProgramParameter(v,G_)),S},this.destroy=function(){n.releaseStatesOfProgram(this),i.deleteProgram(v),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=W_++,this.cacheKey=e,this.usedTimes=1,this.program=v,this.vertexShader=R,this.fragmentShader=P,this}let uv=0;class dv{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){const t=e.vertexShader,n=e.fragmentShader,i=this._getShaderStage(t),r=this._getShaderStage(n),o=this._getShaderCacheForMaterial(e);return o.has(i)===!1&&(o.add(i),i.usedTimes++),o.has(r)===!1&&(o.add(r),r.usedTimes++),this}remove(e){const t=this.materialCache.get(e);for(const n of t)n.usedTimes--,n.usedTimes===0&&this.shaderCache.delete(n.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){const t=this.materialCache;let n=t.get(e);return n===void 0&&(n=new Set,t.set(e,n)),n}_getShaderStage(e){const t=this.shaderCache;let n=t.get(e);return n===void 0&&(n=new hv(e),t.set(e,n)),n}}class hv{constructor(e){this.id=uv++,this.code=e,this.usedTimes=0}}function fv(s,e,t,n,i,r,o){const a=new Pc,l=new dv,c=new Set,u=[],d=i.logarithmicDepthBuffer,h=i.vertexTextures;let m=i.precision;const _={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function v(M){return c.add(M),M===0?"uv":`uv${M}`}function g(M,S,C,Z,q){const X=Z.fog,j=q.geometry,B=M.isMeshStandardMaterial?Z.environment:null,Q=(M.isMeshStandardMaterial?t:e).get(M.envMap||B),V=Q&&Q.mapping===Sr?Q.image.height:null,ee=_[M.type];M.precision!==null&&(m=i.getMaxPrecision(M.precision),m!==M.precision&&console.warn("THREE.WebGLProgram.getParameters:",M.precision,"not supported, using",m,"instead."));const oe=j.morphAttributes.position||j.morphAttributes.normal||j.morphAttributes.color,pe=oe!==void 0?oe.length:0;let Oe=0;j.morphAttributes.position!==void 0&&(Oe=1),j.morphAttributes.normal!==void 0&&(Oe=2),j.morphAttributes.color!==void 0&&(Oe=3);let st,rt,Y,ce;if(ee){const at=_n[ee];st=at.vertexShader,rt=at.fragmentShader}else st=M.vertexShader,rt=M.fragmentShader,l.update(M),Y=l.getVertexShaderID(M),ce=l.getFragmentShaderID(M);const ae=s.getRenderTarget(),Le=s.state.buffers.depth.getReversed(),De=q.isInstancedMesh===!0,O=q.isBatchedMesh===!0,Re=!!M.map,_e=!!M.matcap,w=!!Q,Ze=!!M.aoMap,ve=!!M.lightMap,He=!!M.bumpMap,Ee=!!M.normalMap,et=!!M.displacementMap,ye=!!M.emissiveMap,Ve=!!M.metalnessMap,At=!!M.roughnessMap,vt=M.anisotropy>0,T=M.clearcoat>0,x=M.dispersion>0,k=M.iridescence>0,J=M.sheen>0,te=M.transmission>0,K=vt&&!!M.anisotropyMap,Ce=T&&!!M.clearcoatMap,le=T&&!!M.clearcoatNormalMap,Te=T&&!!M.clearcoatRoughnessMap,Ae=k&&!!M.iridescenceMap,se=k&&!!M.iridescenceThicknessMap,ge=J&&!!M.sheenColorMap,Fe=J&&!!M.sheenRoughnessMap,we=!!M.specularMap,fe=!!M.specularColorMap,Xe=!!M.specularIntensityMap,L=te&&!!M.transmissionMap,re=te&&!!M.thicknessMap,ue=!!M.gradientMap,be=!!M.alphaMap,ne=M.alphaTest>0,$=!!M.alphaHash,Me=!!M.extensions;let Ge=Qn;M.toneMapped&&(ae===null||ae.isXRRenderTarget===!0)&&(Ge=s.toneMapping);const mt={shaderID:ee,shaderType:M.type,shaderName:M.name,vertexShader:st,fragmentShader:rt,defines:M.defines,customVertexShaderID:Y,customFragmentShaderID:ce,isRawShaderMaterial:M.isRawShaderMaterial===!0,glslVersion:M.glslVersion,precision:m,batching:O,batchingColor:O&&q._colorsTexture!==null,instancing:De,instancingColor:De&&q.instanceColor!==null,instancingMorph:De&&q.morphTexture!==null,supportsVertexTextures:h,outputColorSpace:ae===null?s.outputColorSpace:ae.isXRRenderTarget===!0?ae.texture.colorSpace:Ht,alphaToCoverage:!!M.alphaToCoverage,map:Re,matcap:_e,envMap:w,envMapMode:w&&Q.mapping,envMapCubeUVHeight:V,aoMap:Ze,lightMap:ve,bumpMap:He,normalMap:Ee,displacementMap:h&&et,emissiveMap:ye,normalMapObjectSpace:Ee&&M.normalMapType===lh,normalMapTangentSpace:Ee&&M.normalMapType===Ac,metalnessMap:Ve,roughnessMap:At,anisotropy:vt,anisotropyMap:K,clearcoat:T,clearcoatMap:Ce,clearcoatNormalMap:le,clearcoatRoughnessMap:Te,dispersion:x,iridescence:k,iridescenceMap:Ae,iridescenceThicknessMap:se,sheen:J,sheenColorMap:ge,sheenRoughnessMap:Fe,specularMap:we,specularColorMap:fe,specularIntensityMap:Xe,transmission:te,transmissionMap:L,thicknessMap:re,gradientMap:ue,opaque:M.transparent===!1&&M.blending===Hi&&M.alphaToCoverage===!1,alphaMap:be,alphaTest:ne,alphaHash:$,combine:M.combine,mapUv:Re&&v(M.map.channel),aoMapUv:Ze&&v(M.aoMap.channel),lightMapUv:ve&&v(M.lightMap.channel),bumpMapUv:He&&v(M.bumpMap.channel),normalMapUv:Ee&&v(M.normalMap.channel),displacementMapUv:et&&v(M.displacementMap.channel),emissiveMapUv:ye&&v(M.emissiveMap.channel),metalnessMapUv:Ve&&v(M.metalnessMap.channel),roughnessMapUv:At&&v(M.roughnessMap.channel),anisotropyMapUv:K&&v(M.anisotropyMap.channel),clearcoatMapUv:Ce&&v(M.clearcoatMap.channel),clearcoatNormalMapUv:le&&v(M.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Te&&v(M.clearcoatRoughnessMap.channel),iridescenceMapUv:Ae&&v(M.iridescenceMap.channel),iridescenceThicknessMapUv:se&&v(M.iridescenceThicknessMap.channel),sheenColorMapUv:ge&&v(M.sheenColorMap.channel),sheenRoughnessMapUv:Fe&&v(M.sheenRoughnessMap.channel),specularMapUv:we&&v(M.specularMap.channel),specularColorMapUv:fe&&v(M.specularColorMap.channel),specularIntensityMapUv:Xe&&v(M.specularIntensityMap.channel),transmissionMapUv:L&&v(M.transmissionMap.channel),thicknessMapUv:re&&v(M.thicknessMap.channel),alphaMapUv:be&&v(M.alphaMap.channel),vertexTangents:!!j.attributes.tangent&&(Ee||vt),vertexColors:M.vertexColors,vertexAlphas:M.vertexColors===!0&&!!j.attributes.color&&j.attributes.color.itemSize===4,pointsUvs:q.isPoints===!0&&!!j.attributes.uv&&(Re||be),fog:!!X,useFog:M.fog===!0,fogExp2:!!X&&X.isFogExp2,flatShading:M.flatShading===!0&&M.wireframe===!1,sizeAttenuation:M.sizeAttenuation===!0,logarithmicDepthBuffer:d,reversedDepthBuffer:Le,skinning:q.isSkinnedMesh===!0,morphTargets:j.morphAttributes.position!==void 0,morphNormals:j.morphAttributes.normal!==void 0,morphColors:j.morphAttributes.color!==void 0,morphTargetsCount:pe,morphTextureStride:Oe,numDirLights:S.directional.length,numPointLights:S.point.length,numSpotLights:S.spot.length,numSpotLightMaps:S.spotLightMap.length,numRectAreaLights:S.rectArea.length,numHemiLights:S.hemi.length,numDirLightShadows:S.directionalShadowMap.length,numPointLightShadows:S.pointShadowMap.length,numSpotLightShadows:S.spotShadowMap.length,numSpotLightShadowsWithMaps:S.numSpotLightShadowsWithMaps,numLightProbes:S.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:M.dithering,shadowMapEnabled:s.shadowMap.enabled&&C.length>0,shadowMapType:s.shadowMap.type,toneMapping:Ge,decodeVideoTexture:Re&&M.map.isVideoTexture===!0&&Qe.getTransfer(M.map.colorSpace)===ht,decodeVideoTextureEmissive:ye&&M.emissiveMap.isVideoTexture===!0&&Qe.getTransfer(M.emissiveMap.colorSpace)===ht,premultipliedAlpha:M.premultipliedAlpha,doubleSided:M.side===vn,flipSided:M.side===Xt,useDepthPacking:M.depthPacking>=0,depthPacking:M.depthPacking||0,index0AttributeName:M.index0AttributeName,extensionClipCullDistance:Me&&M.extensions.clipCullDistance===!0&&n.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Me&&M.extensions.multiDraw===!0||O)&&n.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:n.has("KHR_parallel_shader_compile"),customProgramCacheKey:M.customProgramCacheKey()};return mt.vertexUv1s=c.has(1),mt.vertexUv2s=c.has(2),mt.vertexUv3s=c.has(3),c.clear(),mt}function p(M){const S=[];if(M.shaderID?S.push(M.shaderID):(S.push(M.customVertexShaderID),S.push(M.customFragmentShaderID)),M.defines!==void 0)for(const C in M.defines)S.push(C),S.push(M.defines[C]);return M.isRawShaderMaterial===!1&&(A(S,M),E(S,M),S.push(s.outputColorSpace)),S.push(M.customProgramCacheKey),S.join()}function A(M,S){M.push(S.precision),M.push(S.outputColorSpace),M.push(S.envMapMode),M.push(S.envMapCubeUVHeight),M.push(S.mapUv),M.push(S.alphaMapUv),M.push(S.lightMapUv),M.push(S.aoMapUv),M.push(S.bumpMapUv),M.push(S.normalMapUv),M.push(S.displacementMapUv),M.push(S.emissiveMapUv),M.push(S.metalnessMapUv),M.push(S.roughnessMapUv),M.push(S.anisotropyMapUv),M.push(S.clearcoatMapUv),M.push(S.clearcoatNormalMapUv),M.push(S.clearcoatRoughnessMapUv),M.push(S.iridescenceMapUv),M.push(S.iridescenceThicknessMapUv),M.push(S.sheenColorMapUv),M.push(S.sheenRoughnessMapUv),M.push(S.specularMapUv),M.push(S.specularColorMapUv),M.push(S.specularIntensityMapUv),M.push(S.transmissionMapUv),M.push(S.thicknessMapUv),M.push(S.combine),M.push(S.fogExp2),M.push(S.sizeAttenuation),M.push(S.morphTargetsCount),M.push(S.morphAttributeCount),M.push(S.numDirLights),M.push(S.numPointLights),M.push(S.numSpotLights),M.push(S.numSpotLightMaps),M.push(S.numHemiLights),M.push(S.numRectAreaLights),M.push(S.numDirLightShadows),M.push(S.numPointLightShadows),M.push(S.numSpotLightShadows),M.push(S.numSpotLightShadowsWithMaps),M.push(S.numLightProbes),M.push(S.shadowMapType),M.push(S.toneMapping),M.push(S.numClippingPlanes),M.push(S.numClipIntersection),M.push(S.depthPacking)}function E(M,S){a.disableAll(),S.supportsVertexTextures&&a.enable(0),S.instancing&&a.enable(1),S.instancingColor&&a.enable(2),S.instancingMorph&&a.enable(3),S.matcap&&a.enable(4),S.envMap&&a.enable(5),S.normalMapObjectSpace&&a.enable(6),S.normalMapTangentSpace&&a.enable(7),S.clearcoat&&a.enable(8),S.iridescence&&a.enable(9),S.alphaTest&&a.enable(10),S.vertexColors&&a.enable(11),S.vertexAlphas&&a.enable(12),S.vertexUv1s&&a.enable(13),S.vertexUv2s&&a.enable(14),S.vertexUv3s&&a.enable(15),S.vertexTangents&&a.enable(16),S.anisotropy&&a.enable(17),S.alphaHash&&a.enable(18),S.batching&&a.enable(19),S.dispersion&&a.enable(20),S.batchingColor&&a.enable(21),S.gradientMap&&a.enable(22),M.push(a.mask),a.disableAll(),S.fog&&a.enable(0),S.useFog&&a.enable(1),S.flatShading&&a.enable(2),S.logarithmicDepthBuffer&&a.enable(3),S.reversedDepthBuffer&&a.enable(4),S.skinning&&a.enable(5),S.morphTargets&&a.enable(6),S.morphNormals&&a.enable(7),S.morphColors&&a.enable(8),S.premultipliedAlpha&&a.enable(9),S.shadowMapEnabled&&a.enable(10),S.doubleSided&&a.enable(11),S.flipSided&&a.enable(12),S.useDepthPacking&&a.enable(13),S.dithering&&a.enable(14),S.transmission&&a.enable(15),S.sheen&&a.enable(16),S.opaque&&a.enable(17),S.pointsUvs&&a.enable(18),S.decodeVideoTexture&&a.enable(19),S.decodeVideoTextureEmissive&&a.enable(20),S.alphaToCoverage&&a.enable(21),M.push(a.mask)}function b(M){const S=_[M.type];let C;if(S){const Z=_n[S];C=$h.clone(Z.uniforms)}else C=M.uniforms;return C}function R(M,S){let C;for(let Z=0,q=u.length;Z<q;Z++){const X=u[Z];if(X.cacheKey===S){C=X,++C.usedTimes;break}}return C===void 0&&(C=new cv(s,S,M,r),u.push(C)),C}function P(M){if(--M.usedTimes===0){const S=u.indexOf(M);u[S]=u[u.length-1],u.pop(),M.destroy()}}function I(M){l.remove(M)}function F(){l.dispose()}return{getParameters:g,getProgramCacheKey:p,getUniforms:b,acquireProgram:R,releaseProgram:P,releaseShaderCache:I,programs:u,dispose:F}}function pv(){let s=new WeakMap;function e(o){return s.has(o)}function t(o){let a=s.get(o);return a===void 0&&(a={},s.set(o,a)),a}function n(o){s.delete(o)}function i(o,a,l){s.get(o)[a]=l}function r(){s=new WeakMap}return{has:e,get:t,remove:n,update:i,dispose:r}}function mv(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.material.id!==e.material.id?s.material.id-e.material.id:s.z!==e.z?s.z-e.z:s.id-e.id}function Zl(s,e){return s.groupOrder!==e.groupOrder?s.groupOrder-e.groupOrder:s.renderOrder!==e.renderOrder?s.renderOrder-e.renderOrder:s.z!==e.z?e.z-s.z:s.id-e.id}function Jl(){const s=[];let e=0;const t=[],n=[],i=[];function r(){e=0,t.length=0,n.length=0,i.length=0}function o(d,h,m,_,v,g){let p=s[e];return p===void 0?(p={id:d.id,object:d,geometry:h,material:m,groupOrder:_,renderOrder:d.renderOrder,z:v,group:g},s[e]=p):(p.id=d.id,p.object=d,p.geometry=h,p.material=m,p.groupOrder=_,p.renderOrder=d.renderOrder,p.z=v,p.group=g),e++,p}function a(d,h,m,_,v,g){const p=o(d,h,m,_,v,g);m.transmission>0?n.push(p):m.transparent===!0?i.push(p):t.push(p)}function l(d,h,m,_,v,g){const p=o(d,h,m,_,v,g);m.transmission>0?n.unshift(p):m.transparent===!0?i.unshift(p):t.unshift(p)}function c(d,h){t.length>1&&t.sort(d||mv),n.length>1&&n.sort(h||Zl),i.length>1&&i.sort(h||Zl)}function u(){for(let d=e,h=s.length;d<h;d++){const m=s[d];if(m.id===null)break;m.id=null,m.object=null,m.geometry=null,m.material=null,m.group=null}}return{opaque:t,transmissive:n,transparent:i,init:r,push:a,unshift:l,finish:u,sort:c}}function gv(){let s=new WeakMap;function e(n,i){const r=s.get(n);let o;return r===void 0?(o=new Jl,s.set(n,[o])):i>=r.length?(o=new Jl,r.push(o)):o=r[i],o}function t(){s=new WeakMap}return{get:e,dispose:t}}function _v(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new D,color:new ze};break;case"SpotLight":t={position:new D,direction:new D,color:new ze,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new D,color:new ze,distance:0,decay:0};break;case"HemisphereLight":t={direction:new D,skyColor:new ze,groundColor:new ze};break;case"RectAreaLight":t={color:new ze,position:new D,halfWidth:new D,halfHeight:new D};break}return s[e.id]=t,t}}}function vv(){const s={};return{get:function(e){if(s[e.id]!==void 0)return s[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new Be,shadowCameraNear:1,shadowCameraFar:1e3};break}return s[e.id]=t,t}}}let xv=0;function yv(s,e){return(e.castShadow?2:0)-(s.castShadow?2:0)+(e.map?1:0)-(s.map?1:0)}function bv(s){const e=new _v,t=vv(),n={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)n.probe.push(new D);const i=new D,r=new Ye,o=new Ye;function a(c){let u=0,d=0,h=0;for(let M=0;M<9;M++)n.probe[M].set(0,0,0);let m=0,_=0,v=0,g=0,p=0,A=0,E=0,b=0,R=0,P=0,I=0;c.sort(yv);for(let M=0,S=c.length;M<S;M++){const C=c[M],Z=C.color,q=C.intensity,X=C.distance,j=C.shadow&&C.shadow.map?C.shadow.map.texture:null;if(C.isAmbientLight)u+=Z.r*q,d+=Z.g*q,h+=Z.b*q;else if(C.isLightProbe){for(let B=0;B<9;B++)n.probe[B].addScaledVector(C.sh.coefficients[B],q);I++}else if(C.isDirectionalLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),C.castShadow){const Q=C.shadow,V=t.get(C);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,n.directionalShadow[m]=V,n.directionalShadowMap[m]=j,n.directionalShadowMatrix[m]=C.shadow.matrix,A++}n.directional[m]=B,m++}else if(C.isSpotLight){const B=e.get(C);B.position.setFromMatrixPosition(C.matrixWorld),B.color.copy(Z).multiplyScalar(q),B.distance=X,B.coneCos=Math.cos(C.angle),B.penumbraCos=Math.cos(C.angle*(1-C.penumbra)),B.decay=C.decay,n.spot[v]=B;const Q=C.shadow;if(C.map&&(n.spotLightMap[R]=C.map,R++,Q.updateMatrices(C),C.castShadow&&P++),n.spotLightMatrix[v]=Q.matrix,C.castShadow){const V=t.get(C);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,n.spotShadow[v]=V,n.spotShadowMap[v]=j,b++}v++}else if(C.isRectAreaLight){const B=e.get(C);B.color.copy(Z).multiplyScalar(q),B.halfWidth.set(C.width*.5,0,0),B.halfHeight.set(0,C.height*.5,0),n.rectArea[g]=B,g++}else if(C.isPointLight){const B=e.get(C);if(B.color.copy(C.color).multiplyScalar(C.intensity),B.distance=C.distance,B.decay=C.decay,C.castShadow){const Q=C.shadow,V=t.get(C);V.shadowIntensity=Q.intensity,V.shadowBias=Q.bias,V.shadowNormalBias=Q.normalBias,V.shadowRadius=Q.radius,V.shadowMapSize=Q.mapSize,V.shadowCameraNear=Q.camera.near,V.shadowCameraFar=Q.camera.far,n.pointShadow[_]=V,n.pointShadowMap[_]=j,n.pointShadowMatrix[_]=C.shadow.matrix,E++}n.point[_]=B,_++}else if(C.isHemisphereLight){const B=e.get(C);B.skyColor.copy(C.color).multiplyScalar(q),B.groundColor.copy(C.groundColor).multiplyScalar(q),n.hemi[p]=B,p++}}g>0&&(s.has("OES_texture_float_linear")===!0?(n.rectAreaLTC1=de.LTC_FLOAT_1,n.rectAreaLTC2=de.LTC_FLOAT_2):(n.rectAreaLTC1=de.LTC_HALF_1,n.rectAreaLTC2=de.LTC_HALF_2)),n.ambient[0]=u,n.ambient[1]=d,n.ambient[2]=h;const F=n.hash;(F.directionalLength!==m||F.pointLength!==_||F.spotLength!==v||F.rectAreaLength!==g||F.hemiLength!==p||F.numDirectionalShadows!==A||F.numPointShadows!==E||F.numSpotShadows!==b||F.numSpotMaps!==R||F.numLightProbes!==I)&&(n.directional.length=m,n.spot.length=v,n.rectArea.length=g,n.point.length=_,n.hemi.length=p,n.directionalShadow.length=A,n.directionalShadowMap.length=A,n.pointShadow.length=E,n.pointShadowMap.length=E,n.spotShadow.length=b,n.spotShadowMap.length=b,n.directionalShadowMatrix.length=A,n.pointShadowMatrix.length=E,n.spotLightMatrix.length=b+R-P,n.spotLightMap.length=R,n.numSpotLightShadowsWithMaps=P,n.numLightProbes=I,F.directionalLength=m,F.pointLength=_,F.spotLength=v,F.rectAreaLength=g,F.hemiLength=p,F.numDirectionalShadows=A,F.numPointShadows=E,F.numSpotShadows=b,F.numSpotMaps=R,F.numLightProbes=I,n.version=xv++)}function l(c,u){let d=0,h=0,m=0,_=0,v=0;const g=u.matrixWorldInverse;for(let p=0,A=c.length;p<A;p++){const E=c[p];if(E.isDirectionalLight){const b=n.directional[d];b.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),d++}else if(E.isSpotLight){const b=n.spot[m];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(g),b.direction.setFromMatrixPosition(E.matrixWorld),i.setFromMatrixPosition(E.target.matrixWorld),b.direction.sub(i),b.direction.transformDirection(g),m++}else if(E.isRectAreaLight){const b=n.rectArea[_];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(g),o.identity(),r.copy(E.matrixWorld),r.premultiply(g),o.extractRotation(r),b.halfWidth.set(E.width*.5,0,0),b.halfHeight.set(0,E.height*.5,0),b.halfWidth.applyMatrix4(o),b.halfHeight.applyMatrix4(o),_++}else if(E.isPointLight){const b=n.point[h];b.position.setFromMatrixPosition(E.matrixWorld),b.position.applyMatrix4(g),h++}else if(E.isHemisphereLight){const b=n.hemi[v];b.direction.setFromMatrixPosition(E.matrixWorld),b.direction.transformDirection(g),v++}}}return{setup:a,setupView:l,state:n}}function $l(s){const e=new bv(s),t=[],n=[];function i(u){c.camera=u,t.length=0,n.length=0}function r(u){t.push(u)}function o(u){n.push(u)}function a(){e.setup(t)}function l(u){e.setupView(t,u)}const c={lightsArray:t,shadowsArray:n,camera:null,lights:e,transmissionRenderTarget:{}};return{init:i,state:c,setupLights:a,setupLightsView:l,pushLight:r,pushShadow:o}}function Sv(s){let e=new WeakMap;function t(i,r=0){const o=e.get(i);let a;return o===void 0?(a=new $l(s),e.set(i,[a])):r>=o.length?(a=new $l(s),o.push(a)):a=o[r],a}function n(){e=new WeakMap}return{get:t,dispose:n}}const Mv=`void main() {
	gl_Position = vec4( position, 1.0 );
}`,Tv=`uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;function Ev(s,e,t){let n=new ba;const i=new Be,r=new Be,o=new ot,a=new vf({depthPacking:ah}),l=new xf,c={},u=t.maxTextureSize,d={[Bn]:Xt,[Xt]:Bn,[vn]:vn},h=new ei({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new Be},radius:{value:4}},vertexShader:Mv,fragmentShader:Tv}),m=h.clone();m.defines.HORIZONTAL_PASS=1;const _=new Tn;_.setAttribute("position",new zt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));const v=new $t(_,h),g=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=pc;let p=this.type;this.render=function(P,I,F){if(g.enabled===!1||g.autoUpdate===!1&&g.needsUpdate===!1||P.length===0)return;const M=s.getRenderTarget(),S=s.getActiveCubeFace(),C=s.getActiveMipmapLevel(),Z=s.state;Z.setBlending($n),Z.buffers.depth.getReversed()?Z.buffers.color.setClear(0,0,0,0):Z.buffers.color.setClear(1,1,1,1),Z.buffers.depth.setTest(!0),Z.setScissorTest(!1);const q=p!==Dn&&this.type===Dn,X=p===Dn&&this.type!==Dn;for(let j=0,B=P.length;j<B;j++){const Q=P[j],V=Q.shadow;if(V===void 0){console.warn("THREE.WebGLShadowMap:",Q,"has no shadow.");continue}if(V.autoUpdate===!1&&V.needsUpdate===!1)continue;i.copy(V.mapSize);const ee=V.getFrameExtents();if(i.multiply(ee),r.copy(V.mapSize),(i.x>u||i.y>u)&&(i.x>u&&(r.x=Math.floor(u/ee.x),i.x=r.x*ee.x,V.mapSize.x=r.x),i.y>u&&(r.y=Math.floor(u/ee.y),i.y=r.y*ee.y,V.mapSize.y=r.y)),V.map===null||q===!0||X===!0){const pe=this.type!==Dn?{minFilter:Vt,magFilter:Vt}:{};V.map!==null&&V.map.dispose(),V.map=new _i(i.x,i.y,pe),V.map.texture.name=Q.name+".shadowMap",V.camera.updateProjectionMatrix()}s.setRenderTarget(V.map),s.clear();const oe=V.getViewportCount();for(let pe=0;pe<oe;pe++){const Oe=V.getViewport(pe);o.set(r.x*Oe.x,r.y*Oe.y,r.x*Oe.z,r.y*Oe.w),Z.viewport(o),V.updateMatrices(Q,pe),n=V.getFrustum(),b(I,F,V.camera,Q,this.type)}V.isPointLightShadow!==!0&&this.type===Dn&&A(V,F),V.needsUpdate=!1}p=this.type,g.needsUpdate=!1,s.setRenderTarget(M,S,C)};function A(P,I){const F=e.update(v);h.defines.VSM_SAMPLES!==P.blurSamples&&(h.defines.VSM_SAMPLES=P.blurSamples,m.defines.VSM_SAMPLES=P.blurSamples,h.needsUpdate=!0,m.needsUpdate=!0),P.mapPass===null&&(P.mapPass=new _i(i.x,i.y)),h.uniforms.shadow_pass.value=P.map.texture,h.uniforms.resolution.value=P.mapSize,h.uniforms.radius.value=P.radius,s.setRenderTarget(P.mapPass),s.clear(),s.renderBufferDirect(I,null,F,h,v,null),m.uniforms.shadow_pass.value=P.mapPass.texture,m.uniforms.resolution.value=P.mapSize,m.uniforms.radius.value=P.radius,s.setRenderTarget(P.map),s.clear(),s.renderBufferDirect(I,null,F,m,v,null)}function E(P,I,F,M){let S=null;const C=F.isPointLight===!0?P.customDistanceMaterial:P.customDepthMaterial;if(C!==void 0)S=C;else if(S=F.isPointLight===!0?l:a,s.localClippingEnabled&&I.clipShadows===!0&&Array.isArray(I.clippingPlanes)&&I.clippingPlanes.length!==0||I.displacementMap&&I.displacementScale!==0||I.alphaMap&&I.alphaTest>0||I.map&&I.alphaTest>0||I.alphaToCoverage===!0){const Z=S.uuid,q=I.uuid;let X=c[Z];X===void 0&&(X={},c[Z]=X);let j=X[q];j===void 0&&(j=S.clone(),X[q]=j,I.addEventListener("dispose",R)),S=j}if(S.visible=I.visible,S.wireframe=I.wireframe,M===Dn?S.side=I.shadowSide!==null?I.shadowSide:I.side:S.side=I.shadowSide!==null?I.shadowSide:d[I.side],S.alphaMap=I.alphaMap,S.alphaTest=I.alphaToCoverage===!0?.5:I.alphaTest,S.map=I.map,S.clipShadows=I.clipShadows,S.clippingPlanes=I.clippingPlanes,S.clipIntersection=I.clipIntersection,S.displacementMap=I.displacementMap,S.displacementScale=I.displacementScale,S.displacementBias=I.displacementBias,S.wireframeLinewidth=I.wireframeLinewidth,S.linewidth=I.linewidth,F.isPointLight===!0&&S.isMeshDistanceMaterial===!0){const Z=s.properties.get(S);Z.light=F}return S}function b(P,I,F,M,S){if(P.visible===!1)return;if(P.layers.test(I.layers)&&(P.isMesh||P.isLine||P.isPoints)&&(P.castShadow||P.receiveShadow&&S===Dn)&&(!P.frustumCulled||n.intersectsObject(P))){P.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse,P.matrixWorld);const q=e.update(P),X=P.material;if(Array.isArray(X)){const j=q.groups;for(let B=0,Q=j.length;B<Q;B++){const V=j[B],ee=X[V.materialIndex];if(ee&&ee.visible){const oe=E(P,ee,M,S);P.onBeforeShadow(s,P,I,F,q,oe,V),s.renderBufferDirect(F,null,q,oe,P,V),P.onAfterShadow(s,P,I,F,q,oe,V)}}}else if(X.visible){const j=E(P,X,M,S);P.onBeforeShadow(s,P,I,F,q,j,null),s.renderBufferDirect(F,null,q,j,P,null),P.onAfterShadow(s,P,I,F,q,j,null)}}const Z=P.children;for(let q=0,X=Z.length;q<X;q++)b(Z[q],I,F,M,S)}function R(P){P.target.removeEventListener("dispose",R);for(const F in c){const M=c[F],S=P.target.uuid;S in M&&(M[S].dispose(),delete M[S])}}}const Av={[vo]:xo,[yo]:Mo,[bo]:To,[qi]:So,[xo]:vo,[Mo]:yo,[To]:bo,[So]:qi};function wv(s,e){function t(){let L=!1;const re=new ot;let ue=null;const be=new ot(0,0,0,0);return{setMask:function(ne){ue!==ne&&!L&&(s.colorMask(ne,ne,ne,ne),ue=ne)},setLocked:function(ne){L=ne},setClear:function(ne,$,Me,Ge,mt){mt===!0&&(ne*=Ge,$*=Ge,Me*=Ge),re.set(ne,$,Me,Ge),be.equals(re)===!1&&(s.clearColor(ne,$,Me,Ge),be.copy(re))},reset:function(){L=!1,ue=null,be.set(-1,0,0,0)}}}function n(){let L=!1,re=!1,ue=null,be=null,ne=null;return{setReversed:function($){if(re!==$){const Me=e.get("EXT_clip_control");$?Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.ZERO_TO_ONE_EXT):Me.clipControlEXT(Me.LOWER_LEFT_EXT,Me.NEGATIVE_ONE_TO_ONE_EXT),re=$;const Ge=ne;ne=null,this.setClear(Ge)}},getReversed:function(){return re},setTest:function($){$?ae(s.DEPTH_TEST):Le(s.DEPTH_TEST)},setMask:function($){ue!==$&&!L&&(s.depthMask($),ue=$)},setFunc:function($){if(re&&($=Av[$]),be!==$){switch($){case vo:s.depthFunc(s.NEVER);break;case xo:s.depthFunc(s.ALWAYS);break;case yo:s.depthFunc(s.LESS);break;case qi:s.depthFunc(s.LEQUAL);break;case bo:s.depthFunc(s.EQUAL);break;case So:s.depthFunc(s.GEQUAL);break;case Mo:s.depthFunc(s.GREATER);break;case To:s.depthFunc(s.NOTEQUAL);break;default:s.depthFunc(s.LEQUAL)}be=$}},setLocked:function($){L=$},setClear:function($){ne!==$&&(re&&($=1-$),s.clearDepth($),ne=$)},reset:function(){L=!1,ue=null,be=null,ne=null,re=!1}}}function i(){let L=!1,re=null,ue=null,be=null,ne=null,$=null,Me=null,Ge=null,mt=null;return{setTest:function(at){L||(at?ae(s.STENCIL_TEST):Le(s.STENCIL_TEST))},setMask:function(at){re!==at&&!L&&(s.stencilMask(at),re=at)},setFunc:function(at,An,mn){(ue!==at||be!==An||ne!==mn)&&(s.stencilFunc(at,An,mn),ue=at,be=An,ne=mn)},setOp:function(at,An,mn){($!==at||Me!==An||Ge!==mn)&&(s.stencilOp(at,An,mn),$=at,Me=An,Ge=mn)},setLocked:function(at){L=at},setClear:function(at){mt!==at&&(s.clearStencil(at),mt=at)},reset:function(){L=!1,re=null,ue=null,be=null,ne=null,$=null,Me=null,Ge=null,mt=null}}}const r=new t,o=new n,a=new i,l=new WeakMap,c=new WeakMap;let u={},d={},h=new WeakMap,m=[],_=null,v=!1,g=null,p=null,A=null,E=null,b=null,R=null,P=null,I=new ze(0,0,0),F=0,M=!1,S=null,C=null,Z=null,q=null,X=null;const j=s.getParameter(s.MAX_COMBINED_TEXTURE_IMAGE_UNITS);let B=!1,Q=0;const V=s.getParameter(s.VERSION);V.indexOf("WebGL")!==-1?(Q=parseFloat(/^WebGL (\d)/.exec(V)[1]),B=Q>=1):V.indexOf("OpenGL ES")!==-1&&(Q=parseFloat(/^OpenGL ES (\d)/.exec(V)[1]),B=Q>=2);let ee=null,oe={};const pe=s.getParameter(s.SCISSOR_BOX),Oe=s.getParameter(s.VIEWPORT),st=new ot().fromArray(pe),rt=new ot().fromArray(Oe);function Y(L,re,ue,be){const ne=new Uint8Array(4),$=s.createTexture();s.bindTexture(L,$),s.texParameteri(L,s.TEXTURE_MIN_FILTER,s.NEAREST),s.texParameteri(L,s.TEXTURE_MAG_FILTER,s.NEAREST);for(let Me=0;Me<ue;Me++)L===s.TEXTURE_3D||L===s.TEXTURE_2D_ARRAY?s.texImage3D(re,0,s.RGBA,1,1,be,0,s.RGBA,s.UNSIGNED_BYTE,ne):s.texImage2D(re+Me,0,s.RGBA,1,1,0,s.RGBA,s.UNSIGNED_BYTE,ne);return $}const ce={};ce[s.TEXTURE_2D]=Y(s.TEXTURE_2D,s.TEXTURE_2D,1),ce[s.TEXTURE_CUBE_MAP]=Y(s.TEXTURE_CUBE_MAP,s.TEXTURE_CUBE_MAP_POSITIVE_X,6),ce[s.TEXTURE_2D_ARRAY]=Y(s.TEXTURE_2D_ARRAY,s.TEXTURE_2D_ARRAY,1,1),ce[s.TEXTURE_3D]=Y(s.TEXTURE_3D,s.TEXTURE_3D,1,1),r.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ae(s.DEPTH_TEST),o.setFunc(qi),He(!1),Ee(ka),ae(s.CULL_FACE),Ze($n);function ae(L){u[L]!==!0&&(s.enable(L),u[L]=!0)}function Le(L){u[L]!==!1&&(s.disable(L),u[L]=!1)}function De(L,re){return d[L]!==re?(s.bindFramebuffer(L,re),d[L]=re,L===s.DRAW_FRAMEBUFFER&&(d[s.FRAMEBUFFER]=re),L===s.FRAMEBUFFER&&(d[s.DRAW_FRAMEBUFFER]=re),!0):!1}function O(L,re){let ue=m,be=!1;if(L){ue=h.get(re),ue===void 0&&(ue=[],h.set(re,ue));const ne=L.textures;if(ue.length!==ne.length||ue[0]!==s.COLOR_ATTACHMENT0){for(let $=0,Me=ne.length;$<Me;$++)ue[$]=s.COLOR_ATTACHMENT0+$;ue.length=ne.length,be=!0}}else ue[0]!==s.BACK&&(ue[0]=s.BACK,be=!0);be&&s.drawBuffers(ue)}function Re(L){return _!==L?(s.useProgram(L),_=L,!0):!1}const _e={[hi]:s.FUNC_ADD,[Cd]:s.FUNC_SUBTRACT,[Rd]:s.FUNC_REVERSE_SUBTRACT};_e[Pd]=s.MIN,_e[Id]=s.MAX;const w={[Ld]:s.ZERO,[Dd]:s.ONE,[Ud]:s.SRC_COLOR,[go]:s.SRC_ALPHA,[Vd]:s.SRC_ALPHA_SATURATE,[kd]:s.DST_COLOR,[Fd]:s.DST_ALPHA,[Nd]:s.ONE_MINUS_SRC_COLOR,[_o]:s.ONE_MINUS_SRC_ALPHA,[Bd]:s.ONE_MINUS_DST_COLOR,[Od]:s.ONE_MINUS_DST_ALPHA,[zd]:s.CONSTANT_COLOR,[Hd]:s.ONE_MINUS_CONSTANT_COLOR,[Gd]:s.CONSTANT_ALPHA,[Wd]:s.ONE_MINUS_CONSTANT_ALPHA};function Ze(L,re,ue,be,ne,$,Me,Ge,mt,at){if(L===$n){v===!0&&(Le(s.BLEND),v=!1);return}if(v===!1&&(ae(s.BLEND),v=!0),L!==wd){if(L!==g||at!==M){if((p!==hi||b!==hi)&&(s.blendEquation(s.FUNC_ADD),p=hi,b=hi),at)switch(L){case Hi:s.blendFuncSeparate(s.ONE,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ba:s.blendFunc(s.ONE,s.ONE);break;case Va:s.blendFuncSeparate(s.ZERO,s.ONE_MINUS_SRC_COLOR,s.ZERO,s.ONE);break;case za:s.blendFuncSeparate(s.DST_COLOR,s.ONE_MINUS_SRC_ALPHA,s.ZERO,s.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}else switch(L){case Hi:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE_MINUS_SRC_ALPHA,s.ONE,s.ONE_MINUS_SRC_ALPHA);break;case Ba:s.blendFuncSeparate(s.SRC_ALPHA,s.ONE,s.ONE,s.ONE);break;case Va:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case za:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",L);break}A=null,E=null,R=null,P=null,I.set(0,0,0),F=0,g=L,M=at}return}ne=ne||re,$=$||ue,Me=Me||be,(re!==p||ne!==b)&&(s.blendEquationSeparate(_e[re],_e[ne]),p=re,b=ne),(ue!==A||be!==E||$!==R||Me!==P)&&(s.blendFuncSeparate(w[ue],w[be],w[$],w[Me]),A=ue,E=be,R=$,P=Me),(Ge.equals(I)===!1||mt!==F)&&(s.blendColor(Ge.r,Ge.g,Ge.b,mt),I.copy(Ge),F=mt),g=L,M=!1}function ve(L,re){L.side===vn?Le(s.CULL_FACE):ae(s.CULL_FACE);let ue=L.side===Xt;re&&(ue=!ue),He(ue),L.blending===Hi&&L.transparent===!1?Ze($n):Ze(L.blending,L.blendEquation,L.blendSrc,L.blendDst,L.blendEquationAlpha,L.blendSrcAlpha,L.blendDstAlpha,L.blendColor,L.blendAlpha,L.premultipliedAlpha),o.setFunc(L.depthFunc),o.setTest(L.depthTest),o.setMask(L.depthWrite),r.setMask(L.colorWrite);const be=L.stencilWrite;a.setTest(be),be&&(a.setMask(L.stencilWriteMask),a.setFunc(L.stencilFunc,L.stencilRef,L.stencilFuncMask),a.setOp(L.stencilFail,L.stencilZFail,L.stencilZPass)),ye(L.polygonOffset,L.polygonOffsetFactor,L.polygonOffsetUnits),L.alphaToCoverage===!0?ae(s.SAMPLE_ALPHA_TO_COVERAGE):Le(s.SAMPLE_ALPHA_TO_COVERAGE)}function He(L){S!==L&&(L?s.frontFace(s.CW):s.frontFace(s.CCW),S=L)}function Ee(L){L!==Td?(ae(s.CULL_FACE),L!==C&&(L===ka?s.cullFace(s.BACK):L===Ed?s.cullFace(s.FRONT):s.cullFace(s.FRONT_AND_BACK))):Le(s.CULL_FACE),C=L}function et(L){L!==Z&&(B&&s.lineWidth(L),Z=L)}function ye(L,re,ue){L?(ae(s.POLYGON_OFFSET_FILL),(q!==re||X!==ue)&&(s.polygonOffset(re,ue),q=re,X=ue)):Le(s.POLYGON_OFFSET_FILL)}function Ve(L){L?ae(s.SCISSOR_TEST):Le(s.SCISSOR_TEST)}function At(L){L===void 0&&(L=s.TEXTURE0+j-1),ee!==L&&(s.activeTexture(L),ee=L)}function vt(L,re,ue){ue===void 0&&(ee===null?ue=s.TEXTURE0+j-1:ue=ee);let be=oe[ue];be===void 0&&(be={type:void 0,texture:void 0},oe[ue]=be),(be.type!==L||be.texture!==re)&&(ee!==ue&&(s.activeTexture(ue),ee=ue),s.bindTexture(L,re||ce[L]),be.type=L,be.texture=re)}function T(){const L=oe[ee];L!==void 0&&L.type!==void 0&&(s.bindTexture(L.type,null),L.type=void 0,L.texture=void 0)}function x(){try{s.compressedTexImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function k(){try{s.compressedTexImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function J(){try{s.texSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function te(){try{s.texSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function K(){try{s.compressedTexSubImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ce(){try{s.compressedTexSubImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function le(){try{s.texStorage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Te(){try{s.texStorage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function Ae(){try{s.texImage2D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function se(){try{s.texImage3D(...arguments)}catch(L){console.error("THREE.WebGLState:",L)}}function ge(L){st.equals(L)===!1&&(s.scissor(L.x,L.y,L.z,L.w),st.copy(L))}function Fe(L){rt.equals(L)===!1&&(s.viewport(L.x,L.y,L.z,L.w),rt.copy(L))}function we(L,re){let ue=c.get(re);ue===void 0&&(ue=new WeakMap,c.set(re,ue));let be=ue.get(L);be===void 0&&(be=s.getUniformBlockIndex(re,L.name),ue.set(L,be))}function fe(L,re){const be=c.get(re).get(L);l.get(re)!==be&&(s.uniformBlockBinding(re,be,L.__bindingPointIndex),l.set(re,be))}function Xe(){s.disable(s.BLEND),s.disable(s.CULL_FACE),s.disable(s.DEPTH_TEST),s.disable(s.POLYGON_OFFSET_FILL),s.disable(s.SCISSOR_TEST),s.disable(s.STENCIL_TEST),s.disable(s.SAMPLE_ALPHA_TO_COVERAGE),s.blendEquation(s.FUNC_ADD),s.blendFunc(s.ONE,s.ZERO),s.blendFuncSeparate(s.ONE,s.ZERO,s.ONE,s.ZERO),s.blendColor(0,0,0,0),s.colorMask(!0,!0,!0,!0),s.clearColor(0,0,0,0),s.depthMask(!0),s.depthFunc(s.LESS),o.setReversed(!1),s.clearDepth(1),s.stencilMask(4294967295),s.stencilFunc(s.ALWAYS,0,4294967295),s.stencilOp(s.KEEP,s.KEEP,s.KEEP),s.clearStencil(0),s.cullFace(s.BACK),s.frontFace(s.CCW),s.polygonOffset(0,0),s.activeTexture(s.TEXTURE0),s.bindFramebuffer(s.FRAMEBUFFER,null),s.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),s.bindFramebuffer(s.READ_FRAMEBUFFER,null),s.useProgram(null),s.lineWidth(1),s.scissor(0,0,s.canvas.width,s.canvas.height),s.viewport(0,0,s.canvas.width,s.canvas.height),u={},ee=null,oe={},d={},h=new WeakMap,m=[],_=null,v=!1,g=null,p=null,A=null,E=null,b=null,R=null,P=null,I=new ze(0,0,0),F=0,M=!1,S=null,C=null,Z=null,q=null,X=null,st.set(0,0,s.canvas.width,s.canvas.height),rt.set(0,0,s.canvas.width,s.canvas.height),r.reset(),o.reset(),a.reset()}return{buffers:{color:r,depth:o,stencil:a},enable:ae,disable:Le,bindFramebuffer:De,drawBuffers:O,useProgram:Re,setBlending:Ze,setMaterial:ve,setFlipSided:He,setCullFace:Ee,setLineWidth:et,setPolygonOffset:ye,setScissorTest:Ve,activeTexture:At,bindTexture:vt,unbindTexture:T,compressedTexImage2D:x,compressedTexImage3D:k,texImage2D:Ae,texImage3D:se,updateUBOMapping:we,uniformBlockBinding:fe,texStorage2D:le,texStorage3D:Te,texSubImage2D:J,texSubImage3D:te,compressedTexSubImage2D:K,compressedTexSubImage3D:Ce,scissor:ge,viewport:Fe,reset:Xe}}function Cv(s,e,t,n,i,r,o){const a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new Be,u=new WeakMap;let d;const h=new WeakMap;let m=!1;try{m=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function _(T,x){return m?new OffscreenCanvas(T,x):ws("canvas")}function v(T,x,k){let J=1;const te=vt(T);if((te.width>k||te.height>k)&&(J=k/Math.max(te.width,te.height)),J<1)if(typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&T instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&T instanceof ImageBitmap||typeof VideoFrame<"u"&&T instanceof VideoFrame){const K=Math.floor(J*te.width),Ce=Math.floor(J*te.height);d===void 0&&(d=_(K,Ce));const le=x?_(K,Ce):d;return le.width=K,le.height=Ce,le.getContext("2d").drawImage(T,0,0,K,Ce),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+te.width+"x"+te.height+") to ("+K+"x"+Ce+")."),le}else return"data"in T&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+te.width+"x"+te.height+")."),T;return T}function g(T){return T.generateMipmaps}function p(T){s.generateMipmap(T)}function A(T){return T.isWebGLCubeRenderTarget?s.TEXTURE_CUBE_MAP:T.isWebGL3DRenderTarget?s.TEXTURE_3D:T.isWebGLArrayRenderTarget||T.isCompressedArrayTexture?s.TEXTURE_2D_ARRAY:s.TEXTURE_2D}function E(T,x,k,J,te=!1){if(T!==null){if(s[T]!==void 0)return s[T];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+T+"'")}let K=x;if(x===s.RED&&(k===s.FLOAT&&(K=s.R32F),k===s.HALF_FLOAT&&(K=s.R16F),k===s.UNSIGNED_BYTE&&(K=s.R8)),x===s.RED_INTEGER&&(k===s.UNSIGNED_BYTE&&(K=s.R8UI),k===s.UNSIGNED_SHORT&&(K=s.R16UI),k===s.UNSIGNED_INT&&(K=s.R32UI),k===s.BYTE&&(K=s.R8I),k===s.SHORT&&(K=s.R16I),k===s.INT&&(K=s.R32I)),x===s.RG&&(k===s.FLOAT&&(K=s.RG32F),k===s.HALF_FLOAT&&(K=s.RG16F),k===s.UNSIGNED_BYTE&&(K=s.RG8)),x===s.RG_INTEGER&&(k===s.UNSIGNED_BYTE&&(K=s.RG8UI),k===s.UNSIGNED_SHORT&&(K=s.RG16UI),k===s.UNSIGNED_INT&&(K=s.RG32UI),k===s.BYTE&&(K=s.RG8I),k===s.SHORT&&(K=s.RG16I),k===s.INT&&(K=s.RG32I)),x===s.RGB_INTEGER&&(k===s.UNSIGNED_BYTE&&(K=s.RGB8UI),k===s.UNSIGNED_SHORT&&(K=s.RGB16UI),k===s.UNSIGNED_INT&&(K=s.RGB32UI),k===s.BYTE&&(K=s.RGB8I),k===s.SHORT&&(K=s.RGB16I),k===s.INT&&(K=s.RGB32I)),x===s.RGBA_INTEGER&&(k===s.UNSIGNED_BYTE&&(K=s.RGBA8UI),k===s.UNSIGNED_SHORT&&(K=s.RGBA16UI),k===s.UNSIGNED_INT&&(K=s.RGBA32UI),k===s.BYTE&&(K=s.RGBA8I),k===s.SHORT&&(K=s.RGBA16I),k===s.INT&&(K=s.RGBA32I)),x===s.RGB&&k===s.UNSIGNED_INT_5_9_9_9_REV&&(K=s.RGB9_E5),x===s.RGBA){const Ce=te?vr:Qe.getTransfer(J);k===s.FLOAT&&(K=s.RGBA32F),k===s.HALF_FLOAT&&(K=s.RGBA16F),k===s.UNSIGNED_BYTE&&(K=Ce===ht?s.SRGB8_ALPHA8:s.RGBA8),k===s.UNSIGNED_SHORT_4_4_4_4&&(K=s.RGBA4),k===s.UNSIGNED_SHORT_5_5_5_1&&(K=s.RGB5_A1)}return(K===s.R16F||K===s.R32F||K===s.RG16F||K===s.RG32F||K===s.RGBA16F||K===s.RGBA32F)&&e.get("EXT_color_buffer_float"),K}function b(T,x){let k;return T?x===null||x===gi||x===Ss?k=s.DEPTH24_STENCIL8:x===hn?k=s.DEPTH32F_STENCIL8:x===bs&&(k=s.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):x===null||x===gi||x===Ss?k=s.DEPTH_COMPONENT24:x===hn?k=s.DEPTH_COMPONENT32F:x===bs&&(k=s.DEPTH_COMPONENT16),k}function R(T,x){return g(T)===!0||T.isFramebufferTexture&&T.minFilter!==Vt&&T.minFilter!==Zt?Math.log2(Math.max(x.width,x.height))+1:T.mipmaps!==void 0&&T.mipmaps.length>0?T.mipmaps.length:T.isCompressedTexture&&Array.isArray(T.image)?x.mipmaps.length:1}function P(T){const x=T.target;x.removeEventListener("dispose",P),F(x),x.isVideoTexture&&u.delete(x)}function I(T){const x=T.target;x.removeEventListener("dispose",I),S(x)}function F(T){const x=n.get(T);if(x.__webglInit===void 0)return;const k=T.source,J=h.get(k);if(J){const te=J[x.__cacheKey];te.usedTimes--,te.usedTimes===0&&M(T),Object.keys(J).length===0&&h.delete(k)}n.remove(T)}function M(T){const x=n.get(T);s.deleteTexture(x.__webglTexture);const k=T.source,J=h.get(k);delete J[x.__cacheKey],o.memory.textures--}function S(T){const x=n.get(T);if(T.depthTexture&&(T.depthTexture.dispose(),n.remove(T.depthTexture)),T.isWebGLCubeRenderTarget)for(let J=0;J<6;J++){if(Array.isArray(x.__webglFramebuffer[J]))for(let te=0;te<x.__webglFramebuffer[J].length;te++)s.deleteFramebuffer(x.__webglFramebuffer[J][te]);else s.deleteFramebuffer(x.__webglFramebuffer[J]);x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer[J])}else{if(Array.isArray(x.__webglFramebuffer))for(let J=0;J<x.__webglFramebuffer.length;J++)s.deleteFramebuffer(x.__webglFramebuffer[J]);else s.deleteFramebuffer(x.__webglFramebuffer);if(x.__webglDepthbuffer&&s.deleteRenderbuffer(x.__webglDepthbuffer),x.__webglMultisampledFramebuffer&&s.deleteFramebuffer(x.__webglMultisampledFramebuffer),x.__webglColorRenderbuffer)for(let J=0;J<x.__webglColorRenderbuffer.length;J++)x.__webglColorRenderbuffer[J]&&s.deleteRenderbuffer(x.__webglColorRenderbuffer[J]);x.__webglDepthRenderbuffer&&s.deleteRenderbuffer(x.__webglDepthRenderbuffer)}const k=T.textures;for(let J=0,te=k.length;J<te;J++){const K=n.get(k[J]);K.__webglTexture&&(s.deleteTexture(K.__webglTexture),o.memory.textures--),n.remove(k[J])}n.remove(T)}let C=0;function Z(){C=0}function q(){const T=C;return T>=i.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+T+" texture units while this GPU supports only "+i.maxTextures),C+=1,T}function X(T){const x=[];return x.push(T.wrapS),x.push(T.wrapT),x.push(T.wrapR||0),x.push(T.magFilter),x.push(T.minFilter),x.push(T.anisotropy),x.push(T.internalFormat),x.push(T.format),x.push(T.type),x.push(T.generateMipmaps),x.push(T.premultiplyAlpha),x.push(T.flipY),x.push(T.unpackAlignment),x.push(T.colorSpace),x.join()}function j(T,x){const k=n.get(T);if(T.isVideoTexture&&Ve(T),T.isRenderTargetTexture===!1&&T.isExternalTexture!==!0&&T.version>0&&k.__version!==T.version){const J=T.image;if(J===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if(J.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{ce(k,T,x);return}}else T.isExternalTexture&&(k.__webglTexture=T.sourceTexture?T.sourceTexture:null);t.bindTexture(s.TEXTURE_2D,k.__webglTexture,s.TEXTURE0+x)}function B(T,x){const k=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){ce(k,T,x);return}t.bindTexture(s.TEXTURE_2D_ARRAY,k.__webglTexture,s.TEXTURE0+x)}function Q(T,x){const k=n.get(T);if(T.isRenderTargetTexture===!1&&T.version>0&&k.__version!==T.version){ce(k,T,x);return}t.bindTexture(s.TEXTURE_3D,k.__webglTexture,s.TEXTURE0+x)}function V(T,x){const k=n.get(T);if(T.version>0&&k.__version!==T.version){ae(k,T,x);return}t.bindTexture(s.TEXTURE_CUBE_MAP,k.__webglTexture,s.TEXTURE0+x)}const ee={[Ki]:s.REPEAT,[Jn]:s.CLAMP_TO_EDGE,[gr]:s.MIRRORED_REPEAT},oe={[Vt]:s.NEAREST,[_c]:s.NEAREST_MIPMAP_NEAREST,[ms]:s.NEAREST_MIPMAP_LINEAR,[Zt]:s.LINEAR,[cr]:s.LINEAR_MIPMAP_NEAREST,[Nn]:s.LINEAR_MIPMAP_LINEAR},pe={[ch]:s.NEVER,[mh]:s.ALWAYS,[uh]:s.LESS,[wc]:s.LEQUAL,[dh]:s.EQUAL,[ph]:s.GEQUAL,[hh]:s.GREATER,[fh]:s.NOTEQUAL};function Oe(T,x){if(x.type===hn&&e.has("OES_texture_float_linear")===!1&&(x.magFilter===Zt||x.magFilter===cr||x.magFilter===ms||x.magFilter===Nn||x.minFilter===Zt||x.minFilter===cr||x.minFilter===ms||x.minFilter===Nn)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),s.texParameteri(T,s.TEXTURE_WRAP_S,ee[x.wrapS]),s.texParameteri(T,s.TEXTURE_WRAP_T,ee[x.wrapT]),(T===s.TEXTURE_3D||T===s.TEXTURE_2D_ARRAY)&&s.texParameteri(T,s.TEXTURE_WRAP_R,ee[x.wrapR]),s.texParameteri(T,s.TEXTURE_MAG_FILTER,oe[x.magFilter]),s.texParameteri(T,s.TEXTURE_MIN_FILTER,oe[x.minFilter]),x.compareFunction&&(s.texParameteri(T,s.TEXTURE_COMPARE_MODE,s.COMPARE_REF_TO_TEXTURE),s.texParameteri(T,s.TEXTURE_COMPARE_FUNC,pe[x.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(x.magFilter===Vt||x.minFilter!==ms&&x.minFilter!==Nn||x.type===hn&&e.has("OES_texture_float_linear")===!1)return;if(x.anisotropy>1||n.get(x).__currentAnisotropy){const k=e.get("EXT_texture_filter_anisotropic");s.texParameterf(T,k.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(x.anisotropy,i.getMaxAnisotropy())),n.get(x).__currentAnisotropy=x.anisotropy}}}function st(T,x){let k=!1;T.__webglInit===void 0&&(T.__webglInit=!0,x.addEventListener("dispose",P));const J=x.source;let te=h.get(J);te===void 0&&(te={},h.set(J,te));const K=X(x);if(K!==T.__cacheKey){te[K]===void 0&&(te[K]={texture:s.createTexture(),usedTimes:0},o.memory.textures++,k=!0),te[K].usedTimes++;const Ce=te[T.__cacheKey];Ce!==void 0&&(te[T.__cacheKey].usedTimes--,Ce.usedTimes===0&&M(x)),T.__cacheKey=K,T.__webglTexture=te[K].texture}return k}function rt(T,x,k){return Math.floor(Math.floor(T/k)/x)}function Y(T,x,k,J){const K=T.updateRanges;if(K.length===0)t.texSubImage2D(s.TEXTURE_2D,0,0,0,x.width,x.height,k,J,x.data);else{K.sort((se,ge)=>se.start-ge.start);let Ce=0;for(let se=1;se<K.length;se++){const ge=K[Ce],Fe=K[se],we=ge.start+ge.count,fe=rt(Fe.start,x.width,4),Xe=rt(ge.start,x.width,4);Fe.start<=we+1&&fe===Xe&&rt(Fe.start+Fe.count-1,x.width,4)===fe?ge.count=Math.max(ge.count,Fe.start+Fe.count-ge.start):(++Ce,K[Ce]=Fe)}K.length=Ce+1;const le=s.getParameter(s.UNPACK_ROW_LENGTH),Te=s.getParameter(s.UNPACK_SKIP_PIXELS),Ae=s.getParameter(s.UNPACK_SKIP_ROWS);s.pixelStorei(s.UNPACK_ROW_LENGTH,x.width);for(let se=0,ge=K.length;se<ge;se++){const Fe=K[se],we=Math.floor(Fe.start/4),fe=Math.ceil(Fe.count/4),Xe=we%x.width,L=Math.floor(we/x.width),re=fe,ue=1;s.pixelStorei(s.UNPACK_SKIP_PIXELS,Xe),s.pixelStorei(s.UNPACK_SKIP_ROWS,L),t.texSubImage2D(s.TEXTURE_2D,0,Xe,L,re,ue,k,J,x.data)}T.clearUpdateRanges(),s.pixelStorei(s.UNPACK_ROW_LENGTH,le),s.pixelStorei(s.UNPACK_SKIP_PIXELS,Te),s.pixelStorei(s.UNPACK_SKIP_ROWS,Ae)}}function ce(T,x,k){let J=s.TEXTURE_2D;(x.isDataArrayTexture||x.isCompressedArrayTexture)&&(J=s.TEXTURE_2D_ARRAY),x.isData3DTexture&&(J=s.TEXTURE_3D);const te=st(T,x),K=x.source;t.bindTexture(J,T.__webglTexture,s.TEXTURE0+k);const Ce=n.get(K);if(K.version!==Ce.__version||te===!0){t.activeTexture(s.TEXTURE0+k);const le=Qe.getPrimaries(Qe.workingColorSpace),Te=x.colorSpace===Zn?null:Qe.getPrimaries(x.colorSpace),Ae=x.colorSpace===Zn||le===Te?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Ae);let se=v(x.image,!1,i.maxTextureSize);se=At(x,se);const ge=r.convert(x.format,x.colorSpace),Fe=r.convert(x.type);let we=E(x.internalFormat,ge,Fe,x.colorSpace,x.isVideoTexture);Oe(J,x);let fe;const Xe=x.mipmaps,L=x.isVideoTexture!==!0,re=Ce.__version===void 0||te===!0,ue=K.dataReady,be=R(x,se);if(x.isDepthTexture)we=b(x.format===Ts,x.type),re&&(L?t.texStorage2D(s.TEXTURE_2D,1,we,se.width,se.height):t.texImage2D(s.TEXTURE_2D,0,we,se.width,se.height,0,ge,Fe,null));else if(x.isDataTexture)if(Xe.length>0){L&&re&&t.texStorage2D(s.TEXTURE_2D,be,we,Xe[0].width,Xe[0].height);for(let ne=0,$=Xe.length;ne<$;ne++)fe=Xe[ne],L?ue&&t.texSubImage2D(s.TEXTURE_2D,ne,0,0,fe.width,fe.height,ge,Fe,fe.data):t.texImage2D(s.TEXTURE_2D,ne,we,fe.width,fe.height,0,ge,Fe,fe.data);x.generateMipmaps=!1}else L?(re&&t.texStorage2D(s.TEXTURE_2D,be,we,se.width,se.height),ue&&Y(x,se,ge,Fe)):t.texImage2D(s.TEXTURE_2D,0,we,se.width,se.height,0,ge,Fe,se.data);else if(x.isCompressedTexture)if(x.isCompressedArrayTexture){L&&re&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,we,Xe[0].width,Xe[0].height,se.depth);for(let ne=0,$=Xe.length;ne<$;ne++)if(fe=Xe[ne],x.format!==on)if(ge!==null)if(L){if(ue)if(x.layerUpdates.size>0){const Me=Cl(fe.width,fe.height,x.format,x.type);for(const Ge of x.layerUpdates){const mt=fe.data.subarray(Ge*Me/fe.data.BYTES_PER_ELEMENT,(Ge+1)*Me/fe.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,Ge,fe.width,fe.height,1,ge,mt)}x.clearLayerUpdates()}else t.compressedTexSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,se.depth,ge,fe.data)}else t.compressedTexImage3D(s.TEXTURE_2D_ARRAY,ne,we,fe.width,fe.height,se.depth,0,fe.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else L?ue&&t.texSubImage3D(s.TEXTURE_2D_ARRAY,ne,0,0,0,fe.width,fe.height,se.depth,ge,Fe,fe.data):t.texImage3D(s.TEXTURE_2D_ARRAY,ne,we,fe.width,fe.height,se.depth,0,ge,Fe,fe.data)}else{L&&re&&t.texStorage2D(s.TEXTURE_2D,be,we,Xe[0].width,Xe[0].height);for(let ne=0,$=Xe.length;ne<$;ne++)fe=Xe[ne],x.format!==on?ge!==null?L?ue&&t.compressedTexSubImage2D(s.TEXTURE_2D,ne,0,0,fe.width,fe.height,ge,fe.data):t.compressedTexImage2D(s.TEXTURE_2D,ne,we,fe.width,fe.height,0,fe.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):L?ue&&t.texSubImage2D(s.TEXTURE_2D,ne,0,0,fe.width,fe.height,ge,Fe,fe.data):t.texImage2D(s.TEXTURE_2D,ne,we,fe.width,fe.height,0,ge,Fe,fe.data)}else if(x.isDataArrayTexture)if(L){if(re&&t.texStorage3D(s.TEXTURE_2D_ARRAY,be,we,se.width,se.height,se.depth),ue)if(x.layerUpdates.size>0){const ne=Cl(se.width,se.height,x.format,x.type);for(const $ of x.layerUpdates){const Me=se.data.subarray($*ne/se.data.BYTES_PER_ELEMENT,($+1)*ne/se.data.BYTES_PER_ELEMENT);t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,$,se.width,se.height,1,ge,Fe,Me)}x.clearLayerUpdates()}else t.texSubImage3D(s.TEXTURE_2D_ARRAY,0,0,0,0,se.width,se.height,se.depth,ge,Fe,se.data)}else t.texImage3D(s.TEXTURE_2D_ARRAY,0,we,se.width,se.height,se.depth,0,ge,Fe,se.data);else if(x.isData3DTexture)L?(re&&t.texStorage3D(s.TEXTURE_3D,be,we,se.width,se.height,se.depth),ue&&t.texSubImage3D(s.TEXTURE_3D,0,0,0,0,se.width,se.height,se.depth,ge,Fe,se.data)):t.texImage3D(s.TEXTURE_3D,0,we,se.width,se.height,se.depth,0,ge,Fe,se.data);else if(x.isFramebufferTexture){if(re)if(L)t.texStorage2D(s.TEXTURE_2D,be,we,se.width,se.height);else{let ne=se.width,$=se.height;for(let Me=0;Me<be;Me++)t.texImage2D(s.TEXTURE_2D,Me,we,ne,$,0,ge,Fe,null),ne>>=1,$>>=1}}else if(Xe.length>0){if(L&&re){const ne=vt(Xe[0]);t.texStorage2D(s.TEXTURE_2D,be,we,ne.width,ne.height)}for(let ne=0,$=Xe.length;ne<$;ne++)fe=Xe[ne],L?ue&&t.texSubImage2D(s.TEXTURE_2D,ne,0,0,ge,Fe,fe):t.texImage2D(s.TEXTURE_2D,ne,we,ge,Fe,fe);x.generateMipmaps=!1}else if(L){if(re){const ne=vt(se);t.texStorage2D(s.TEXTURE_2D,be,we,ne.width,ne.height)}ue&&t.texSubImage2D(s.TEXTURE_2D,0,0,0,ge,Fe,se)}else t.texImage2D(s.TEXTURE_2D,0,we,ge,Fe,se);g(x)&&p(J),Ce.__version=K.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function ae(T,x,k){if(x.image.length!==6)return;const J=st(T,x),te=x.source;t.bindTexture(s.TEXTURE_CUBE_MAP,T.__webglTexture,s.TEXTURE0+k);const K=n.get(te);if(te.version!==K.__version||J===!0){t.activeTexture(s.TEXTURE0+k);const Ce=Qe.getPrimaries(Qe.workingColorSpace),le=x.colorSpace===Zn?null:Qe.getPrimaries(x.colorSpace),Te=x.colorSpace===Zn||Ce===le?s.NONE:s.BROWSER_DEFAULT_WEBGL;s.pixelStorei(s.UNPACK_FLIP_Y_WEBGL,x.flipY),s.pixelStorei(s.UNPACK_PREMULTIPLY_ALPHA_WEBGL,x.premultiplyAlpha),s.pixelStorei(s.UNPACK_ALIGNMENT,x.unpackAlignment),s.pixelStorei(s.UNPACK_COLORSPACE_CONVERSION_WEBGL,Te);const Ae=x.isCompressedTexture||x.image[0].isCompressedTexture,se=x.image[0]&&x.image[0].isDataTexture,ge=[];for(let $=0;$<6;$++)!Ae&&!se?ge[$]=v(x.image[$],!0,i.maxCubemapSize):ge[$]=se?x.image[$].image:x.image[$],ge[$]=At(x,ge[$]);const Fe=ge[0],we=r.convert(x.format,x.colorSpace),fe=r.convert(x.type),Xe=E(x.internalFormat,we,fe,x.colorSpace),L=x.isVideoTexture!==!0,re=K.__version===void 0||J===!0,ue=te.dataReady;let be=R(x,Fe);Oe(s.TEXTURE_CUBE_MAP,x);let ne;if(Ae){L&&re&&t.texStorage2D(s.TEXTURE_CUBE_MAP,be,Xe,Fe.width,Fe.height);for(let $=0;$<6;$++){ne=ge[$].mipmaps;for(let Me=0;Me<ne.length;Me++){const Ge=ne[Me];x.format!==on?we!==null?L?ue&&t.compressedTexSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me,0,0,Ge.width,Ge.height,we,Ge.data):t.compressedTexImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me,Xe,Ge.width,Ge.height,0,Ge.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):L?ue&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me,0,0,Ge.width,Ge.height,we,fe,Ge.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me,Xe,Ge.width,Ge.height,0,we,fe,Ge.data)}}}else{if(ne=x.mipmaps,L&&re){ne.length>0&&be++;const $=vt(ge[0]);t.texStorage2D(s.TEXTURE_CUBE_MAP,be,Xe,$.width,$.height)}for(let $=0;$<6;$++)if(se){L?ue&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,ge[$].width,ge[$].height,we,fe,ge[$].data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Xe,ge[$].width,ge[$].height,0,we,fe,ge[$].data);for(let Me=0;Me<ne.length;Me++){const mt=ne[Me].image[$].image;L?ue&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me+1,0,0,mt.width,mt.height,we,fe,mt.data):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me+1,Xe,mt.width,mt.height,0,we,fe,mt.data)}}else{L?ue&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,0,0,we,fe,ge[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,0,Xe,we,fe,ge[$]);for(let Me=0;Me<ne.length;Me++){const Ge=ne[Me];L?ue&&t.texSubImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me+1,0,0,we,fe,Ge.image[$]):t.texImage2D(s.TEXTURE_CUBE_MAP_POSITIVE_X+$,Me+1,Xe,we,fe,Ge.image[$])}}}g(x)&&p(s.TEXTURE_CUBE_MAP),K.__version=te.version,x.onUpdate&&x.onUpdate(x)}T.__version=x.version}function Le(T,x,k,J,te,K){const Ce=r.convert(k.format,k.colorSpace),le=r.convert(k.type),Te=E(k.internalFormat,Ce,le,k.colorSpace),Ae=n.get(x),se=n.get(k);if(se.__renderTarget=x,!Ae.__hasExternalTextures){const ge=Math.max(1,x.width>>K),Fe=Math.max(1,x.height>>K);te===s.TEXTURE_3D||te===s.TEXTURE_2D_ARRAY?t.texImage3D(te,K,Te,ge,Fe,x.depth,0,Ce,le,null):t.texImage2D(te,K,Te,ge,Fe,0,Ce,le,null)}t.bindFramebuffer(s.FRAMEBUFFER,T),ye(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,J,te,se.__webglTexture,0,et(x)):(te===s.TEXTURE_2D||te>=s.TEXTURE_CUBE_MAP_POSITIVE_X&&te<=s.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&s.framebufferTexture2D(s.FRAMEBUFFER,J,te,se.__webglTexture,K),t.bindFramebuffer(s.FRAMEBUFFER,null)}function De(T,x,k){if(s.bindRenderbuffer(s.RENDERBUFFER,T),x.depthBuffer){const J=x.depthTexture,te=J&&J.isDepthTexture?J.type:null,K=b(x.stencilBuffer,te),Ce=x.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,le=et(x);ye(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,le,K,x.width,x.height):k?s.renderbufferStorageMultisample(s.RENDERBUFFER,le,K,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,K,x.width,x.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,Ce,s.RENDERBUFFER,T)}else{const J=x.textures;for(let te=0;te<J.length;te++){const K=J[te],Ce=r.convert(K.format,K.colorSpace),le=r.convert(K.type),Te=E(K.internalFormat,Ce,le,K.colorSpace),Ae=et(x);k&&ye(x)===!1?s.renderbufferStorageMultisample(s.RENDERBUFFER,Ae,Te,x.width,x.height):ye(x)?a.renderbufferStorageMultisampleEXT(s.RENDERBUFFER,Ae,Te,x.width,x.height):s.renderbufferStorage(s.RENDERBUFFER,Te,x.width,x.height)}}s.bindRenderbuffer(s.RENDERBUFFER,null)}function O(T,x){if(x&&x.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(s.FRAMEBUFFER,T),!(x.depthTexture&&x.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");const J=n.get(x.depthTexture);J.__renderTarget=x,(!J.__webglTexture||x.depthTexture.image.width!==x.width||x.depthTexture.image.height!==x.height)&&(x.depthTexture.image.width=x.width,x.depthTexture.image.height=x.height,x.depthTexture.needsUpdate=!0),j(x.depthTexture,0);const te=J.__webglTexture,K=et(x);if(x.depthTexture.format===Ms)ye(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_ATTACHMENT,s.TEXTURE_2D,te,0);else if(x.depthTexture.format===Ts)ye(x)?a.framebufferTexture2DMultisampleEXT(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0,K):s.framebufferTexture2D(s.FRAMEBUFFER,s.DEPTH_STENCIL_ATTACHMENT,s.TEXTURE_2D,te,0);else throw new Error("Unknown depthTexture format")}function Re(T){const x=n.get(T),k=T.isWebGLCubeRenderTarget===!0;if(x.__boundDepthTexture!==T.depthTexture){const J=T.depthTexture;if(x.__depthDisposeCallback&&x.__depthDisposeCallback(),J){const te=()=>{delete x.__boundDepthTexture,delete x.__depthDisposeCallback,J.removeEventListener("dispose",te)};J.addEventListener("dispose",te),x.__depthDisposeCallback=te}x.__boundDepthTexture=J}if(T.depthTexture&&!x.__autoAllocateDepthBuffer){if(k)throw new Error("target.depthTexture not supported in Cube render targets");const J=T.texture.mipmaps;J&&J.length>0?O(x.__webglFramebuffer[0],T):O(x.__webglFramebuffer,T)}else if(k){x.__webglDepthbuffer=[];for(let J=0;J<6;J++)if(t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[J]),x.__webglDepthbuffer[J]===void 0)x.__webglDepthbuffer[J]=s.createRenderbuffer(),De(x.__webglDepthbuffer[J],T,!1);else{const te=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer[J];s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,K)}}else{const J=T.texture.mipmaps;if(J&&J.length>0?t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer[0]):t.bindFramebuffer(s.FRAMEBUFFER,x.__webglFramebuffer),x.__webglDepthbuffer===void 0)x.__webglDepthbuffer=s.createRenderbuffer(),De(x.__webglDepthbuffer,T,!1);else{const te=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,K=x.__webglDepthbuffer;s.bindRenderbuffer(s.RENDERBUFFER,K),s.framebufferRenderbuffer(s.FRAMEBUFFER,te,s.RENDERBUFFER,K)}}t.bindFramebuffer(s.FRAMEBUFFER,null)}function _e(T,x,k){const J=n.get(T);x!==void 0&&Le(J.__webglFramebuffer,T,T.texture,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,0),k!==void 0&&Re(T)}function w(T){const x=T.texture,k=n.get(T),J=n.get(x);T.addEventListener("dispose",I);const te=T.textures,K=T.isWebGLCubeRenderTarget===!0,Ce=te.length>1;if(Ce||(J.__webglTexture===void 0&&(J.__webglTexture=s.createTexture()),J.__version=x.version,o.memory.textures++),K){k.__webglFramebuffer=[];for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer[le]=[];for(let Te=0;Te<x.mipmaps.length;Te++)k.__webglFramebuffer[le][Te]=s.createFramebuffer()}else k.__webglFramebuffer[le]=s.createFramebuffer()}else{if(x.mipmaps&&x.mipmaps.length>0){k.__webglFramebuffer=[];for(let le=0;le<x.mipmaps.length;le++)k.__webglFramebuffer[le]=s.createFramebuffer()}else k.__webglFramebuffer=s.createFramebuffer();if(Ce)for(let le=0,Te=te.length;le<Te;le++){const Ae=n.get(te[le]);Ae.__webglTexture===void 0&&(Ae.__webglTexture=s.createTexture(),o.memory.textures++)}if(T.samples>0&&ye(T)===!1){k.__webglMultisampledFramebuffer=s.createFramebuffer(),k.__webglColorRenderbuffer=[],t.bindFramebuffer(s.FRAMEBUFFER,k.__webglMultisampledFramebuffer);for(let le=0;le<te.length;le++){const Te=te[le];k.__webglColorRenderbuffer[le]=s.createRenderbuffer(),s.bindRenderbuffer(s.RENDERBUFFER,k.__webglColorRenderbuffer[le]);const Ae=r.convert(Te.format,Te.colorSpace),se=r.convert(Te.type),ge=E(Te.internalFormat,Ae,se,Te.colorSpace,T.isXRRenderTarget===!0),Fe=et(T);s.renderbufferStorageMultisample(s.RENDERBUFFER,Fe,ge,T.width,T.height),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+le,s.RENDERBUFFER,k.__webglColorRenderbuffer[le])}s.bindRenderbuffer(s.RENDERBUFFER,null),T.depthBuffer&&(k.__webglDepthRenderbuffer=s.createRenderbuffer(),De(k.__webglDepthRenderbuffer,T,!0)),t.bindFramebuffer(s.FRAMEBUFFER,null)}}if(K){t.bindTexture(s.TEXTURE_CUBE_MAP,J.__webglTexture),Oe(s.TEXTURE_CUBE_MAP,x);for(let le=0;le<6;le++)if(x.mipmaps&&x.mipmaps.length>0)for(let Te=0;Te<x.mipmaps.length;Te++)Le(k.__webglFramebuffer[le][Te],T,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,Te);else Le(k.__webglFramebuffer[le],T,x,s.COLOR_ATTACHMENT0,s.TEXTURE_CUBE_MAP_POSITIVE_X+le,0);g(x)&&p(s.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(Ce){for(let le=0,Te=te.length;le<Te;le++){const Ae=te[le],se=n.get(Ae);let ge=s.TEXTURE_2D;(T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(ge=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(ge,se.__webglTexture),Oe(ge,Ae),Le(k.__webglFramebuffer,T,Ae,s.COLOR_ATTACHMENT0+le,ge,0),g(Ae)&&p(ge)}t.unbindTexture()}else{let le=s.TEXTURE_2D;if((T.isWebGL3DRenderTarget||T.isWebGLArrayRenderTarget)&&(le=T.isWebGL3DRenderTarget?s.TEXTURE_3D:s.TEXTURE_2D_ARRAY),t.bindTexture(le,J.__webglTexture),Oe(le,x),x.mipmaps&&x.mipmaps.length>0)for(let Te=0;Te<x.mipmaps.length;Te++)Le(k.__webglFramebuffer[Te],T,x,s.COLOR_ATTACHMENT0,le,Te);else Le(k.__webglFramebuffer,T,x,s.COLOR_ATTACHMENT0,le,0);g(x)&&p(le),t.unbindTexture()}T.depthBuffer&&Re(T)}function Ze(T){const x=T.textures;for(let k=0,J=x.length;k<J;k++){const te=x[k];if(g(te)){const K=A(T),Ce=n.get(te).__webglTexture;t.bindTexture(K,Ce),p(K),t.unbindTexture()}}}const ve=[],He=[];function Ee(T){if(T.samples>0){if(ye(T)===!1){const x=T.textures,k=T.width,J=T.height;let te=s.COLOR_BUFFER_BIT;const K=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT,Ce=n.get(T),le=x.length>1;if(le)for(let Ae=0;Ae<x.length;Ae++)t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,null),t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,null,0);t.bindFramebuffer(s.READ_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer);const Te=T.texture.mipmaps;Te&&Te.length>0?t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer[0]):t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglFramebuffer);for(let Ae=0;Ae<x.length;Ae++){if(T.resolveDepthBuffer&&(T.depthBuffer&&(te|=s.DEPTH_BUFFER_BIT),T.stencilBuffer&&T.resolveStencilBuffer&&(te|=s.STENCIL_BUFFER_BIT)),le){s.framebufferRenderbuffer(s.READ_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);const se=n.get(x[Ae]).__webglTexture;s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0,s.TEXTURE_2D,se,0)}s.blitFramebuffer(0,0,k,J,0,0,k,J,te,s.NEAREST),l===!0&&(ve.length=0,He.length=0,ve.push(s.COLOR_ATTACHMENT0+Ae),T.depthBuffer&&T.resolveDepthBuffer===!1&&(ve.push(K),He.push(K),s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,He)),s.invalidateFramebuffer(s.READ_FRAMEBUFFER,ve))}if(t.bindFramebuffer(s.READ_FRAMEBUFFER,null),t.bindFramebuffer(s.DRAW_FRAMEBUFFER,null),le)for(let Ae=0;Ae<x.length;Ae++){t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglMultisampledFramebuffer),s.framebufferRenderbuffer(s.FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.RENDERBUFFER,Ce.__webglColorRenderbuffer[Ae]);const se=n.get(x[Ae]).__webglTexture;t.bindFramebuffer(s.FRAMEBUFFER,Ce.__webglFramebuffer),s.framebufferTexture2D(s.DRAW_FRAMEBUFFER,s.COLOR_ATTACHMENT0+Ae,s.TEXTURE_2D,se,0)}t.bindFramebuffer(s.DRAW_FRAMEBUFFER,Ce.__webglMultisampledFramebuffer)}else if(T.depthBuffer&&T.resolveDepthBuffer===!1&&l){const x=T.stencilBuffer?s.DEPTH_STENCIL_ATTACHMENT:s.DEPTH_ATTACHMENT;s.invalidateFramebuffer(s.DRAW_FRAMEBUFFER,[x])}}}function et(T){return Math.min(i.maxSamples,T.samples)}function ye(T){const x=n.get(T);return T.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&x.__useRenderToTexture!==!1}function Ve(T){const x=o.render.frame;u.get(T)!==x&&(u.set(T,x),T.update())}function At(T,x){const k=T.colorSpace,J=T.format,te=T.type;return T.isCompressedTexture===!0||T.isVideoTexture===!0||k!==Ht&&k!==Zn&&(Qe.getTransfer(k)===ht?(J!==on||te!==bn)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",k)),x}function vt(T){return typeof HTMLImageElement<"u"&&T instanceof HTMLImageElement?(c.width=T.naturalWidth||T.width,c.height=T.naturalHeight||T.height):typeof VideoFrame<"u"&&T instanceof VideoFrame?(c.width=T.displayWidth,c.height=T.displayHeight):(c.width=T.width,c.height=T.height),c}this.allocateTextureUnit=q,this.resetTextureUnits=Z,this.setTexture2D=j,this.setTexture2DArray=B,this.setTexture3D=Q,this.setTextureCube=V,this.rebindTextures=_e,this.setupRenderTarget=w,this.updateRenderTargetMipmap=Ze,this.updateMultisampleRenderTarget=Ee,this.setupDepthRenderbuffer=Re,this.setupFrameBufferTexture=Le,this.useMultisampledRTT=ye}function Rv(s,e){function t(n,i=Zn){let r;const o=Qe.getTransfer(i);if(n===bn)return s.UNSIGNED_BYTE;if(n===ca)return s.UNSIGNED_SHORT_4_4_4_4;if(n===ua)return s.UNSIGNED_SHORT_5_5_5_1;if(n===yc)return s.UNSIGNED_INT_5_9_9_9_REV;if(n===vc)return s.BYTE;if(n===xc)return s.SHORT;if(n===bs)return s.UNSIGNED_SHORT;if(n===la)return s.INT;if(n===gi)return s.UNSIGNED_INT;if(n===hn)return s.FLOAT;if(n===Cs)return s.HALF_FLOAT;if(n===bc)return s.ALPHA;if(n===Sc)return s.RGB;if(n===on)return s.RGBA;if(n===Ms)return s.DEPTH_COMPONENT;if(n===Ts)return s.DEPTH_STENCIL;if(n===da)return s.RED;if(n===ha)return s.RED_INTEGER;if(n===Mc)return s.RG;if(n===fa)return s.RG_INTEGER;if(n===pa)return s.RGBA_INTEGER;if(n===ur||n===dr||n===hr||n===fr)if(o===ht)if(r=e.get("WEBGL_compressed_texture_s3tc_srgb"),r!==null){if(n===ur)return r.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(r=e.get("WEBGL_compressed_texture_s3tc"),r!==null){if(n===ur)return r.COMPRESSED_RGB_S3TC_DXT1_EXT;if(n===dr)return r.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(n===hr)return r.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(n===fr)return r.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(n===wo||n===Co||n===Ro||n===Po)if(r=e.get("WEBGL_compressed_texture_pvrtc"),r!==null){if(n===wo)return r.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(n===Co)return r.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(n===Ro)return r.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(n===Po)return r.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(n===Io||n===Lo||n===Do)if(r=e.get("WEBGL_compressed_texture_etc"),r!==null){if(n===Io||n===Lo)return o===ht?r.COMPRESSED_SRGB8_ETC2:r.COMPRESSED_RGB8_ETC2;if(n===Do)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:r.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(n===Uo||n===No||n===Fo||n===Oo||n===ko||n===Bo||n===Vo||n===zo||n===Ho||n===Go||n===Wo||n===Xo||n===qo||n===jo)if(r=e.get("WEBGL_compressed_texture_astc"),r!==null){if(n===Uo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:r.COMPRESSED_RGBA_ASTC_4x4_KHR;if(n===No)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:r.COMPRESSED_RGBA_ASTC_5x4_KHR;if(n===Fo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:r.COMPRESSED_RGBA_ASTC_5x5_KHR;if(n===Oo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:r.COMPRESSED_RGBA_ASTC_6x5_KHR;if(n===ko)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:r.COMPRESSED_RGBA_ASTC_6x6_KHR;if(n===Bo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:r.COMPRESSED_RGBA_ASTC_8x5_KHR;if(n===Vo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:r.COMPRESSED_RGBA_ASTC_8x6_KHR;if(n===zo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:r.COMPRESSED_RGBA_ASTC_8x8_KHR;if(n===Ho)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:r.COMPRESSED_RGBA_ASTC_10x5_KHR;if(n===Go)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:r.COMPRESSED_RGBA_ASTC_10x6_KHR;if(n===Wo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:r.COMPRESSED_RGBA_ASTC_10x8_KHR;if(n===Xo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:r.COMPRESSED_RGBA_ASTC_10x10_KHR;if(n===qo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:r.COMPRESSED_RGBA_ASTC_12x10_KHR;if(n===jo)return o===ht?r.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:r.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(n===pr||n===Yo||n===Ko)if(r=e.get("EXT_texture_compression_bptc"),r!==null){if(n===pr)return o===ht?r.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:r.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(n===Yo)return r.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(n===Ko)return r.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(n===Tc||n===Zo||n===Jo||n===$o)if(r=e.get("EXT_texture_compression_rgtc"),r!==null){if(n===pr)return r.COMPRESSED_RED_RGTC1_EXT;if(n===Zo)return r.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(n===Jo)return r.COMPRESSED_RED_GREEN_RGTC2_EXT;if(n===$o)return r.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return n===Ss?s.UNSIGNED_INT_24_8:s[n]!==void 0?s[n]:null}return{convert:t}}class $c extends Dt{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}}const Pv=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,Iv=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`;class Lv{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){const n=new $c(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=n}}getMesh(e){if(this.texture!==null&&this.mesh===null){const t=e.cameras[0].viewport,n=new ei({vertexShader:Pv,fragmentShader:Iv,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new $t(new Mr(20,20),n)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}}class Dv extends ti{constructor(e,t){super();const n=this;let i=null,r=1,o=null,a="local-floor",l=1,c=null,u=null,d=null,h=null,m=null,_=null;const v=new Lv,g={},p=t.getContextAttributes();let A=null,E=null;const b=[],R=[],P=new Be;let I=null;const F=new Ft;F.viewport=new ot;const M=new Ft;M.viewport=new ot;const S=[F,M],C=new Bf;let Z=null,q=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(Y){let ce=b[Y];return ce===void 0&&(ce=new Zr,b[Y]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(Y){let ce=b[Y];return ce===void 0&&(ce=new Zr,b[Y]=ce),ce.getGripSpace()},this.getHand=function(Y){let ce=b[Y];return ce===void 0&&(ce=new Zr,b[Y]=ce),ce.getHandSpace()};function X(Y){const ce=R.indexOf(Y.inputSource);if(ce===-1)return;const ae=b[ce];ae!==void 0&&(ae.update(Y.inputSource,Y.frame,c||o),ae.dispatchEvent({type:Y.type,data:Y.inputSource}))}function j(){i.removeEventListener("select",X),i.removeEventListener("selectstart",X),i.removeEventListener("selectend",X),i.removeEventListener("squeeze",X),i.removeEventListener("squeezestart",X),i.removeEventListener("squeezeend",X),i.removeEventListener("end",j),i.removeEventListener("inputsourceschange",B);for(let Y=0;Y<b.length;Y++){const ce=R[Y];ce!==null&&(R[Y]=null,b[Y].disconnect(ce))}Z=null,q=null,v.reset();for(const Y in g)delete g[Y];e.setRenderTarget(A),m=null,h=null,d=null,i=null,E=null,rt.stop(),n.isPresenting=!1,e.setPixelRatio(I),e.setSize(P.width,P.height,!1),n.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(Y){r=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(Y){a=Y,n.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(Y){c=Y},this.getBaseLayer=function(){return h!==null?h:m},this.getBinding=function(){return d},this.getFrame=function(){return _},this.getSession=function(){return i},this.setSession=async function(Y){if(i=Y,i!==null){if(A=e.getRenderTarget(),i.addEventListener("select",X),i.addEventListener("selectstart",X),i.addEventListener("selectend",X),i.addEventListener("squeeze",X),i.addEventListener("squeezestart",X),i.addEventListener("squeezeend",X),i.addEventListener("end",j),i.addEventListener("inputsourceschange",B),p.xrCompatible!==!0&&await t.makeXRCompatible(),I=e.getPixelRatio(),e.getSize(P),typeof XRWebGLBinding<"u"&&(d=new XRWebGLBinding(i,t)),d!==null&&"createProjectionLayer"in XRWebGLBinding.prototype){let ae=null,Le=null,De=null;p.depth&&(De=p.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,ae=p.stencil?Ts:Ms,Le=p.stencil?Ss:gi);const O={colorFormat:t.RGBA8,depthFormat:De,scaleFactor:r};h=d.createProjectionLayer(O),i.updateRenderState({layers:[h]}),e.setPixelRatio(1),e.setSize(h.textureWidth,h.textureHeight,!1),E=new _i(h.textureWidth,h.textureHeight,{format:on,type:bn,depthTexture:new zc(h.textureWidth,h.textureHeight,Le,void 0,void 0,void 0,void 0,void 0,void 0,ae),stencilBuffer:p.stencil,colorSpace:e.outputColorSpace,samples:p.antialias?4:0,resolveDepthBuffer:h.ignoreDepthValues===!1,resolveStencilBuffer:h.ignoreDepthValues===!1})}else{const ae={antialias:p.antialias,alpha:!0,depth:p.depth,stencil:p.stencil,framebufferScaleFactor:r};m=new XRWebGLLayer(i,t,ae),i.updateRenderState({baseLayer:m}),e.setPixelRatio(1),e.setSize(m.framebufferWidth,m.framebufferHeight,!1),E=new _i(m.framebufferWidth,m.framebufferHeight,{format:on,type:bn,colorSpace:e.outputColorSpace,stencilBuffer:p.stencil,resolveDepthBuffer:m.ignoreDepthValues===!1,resolveStencilBuffer:m.ignoreDepthValues===!1})}E.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await i.requestReferenceSpace(a),rt.setContext(i),rt.start(),n.isPresenting=!0,n.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(i!==null)return i.environmentBlendMode},this.getDepthTexture=function(){return v.getDepthTexture()};function B(Y){for(let ce=0;ce<Y.removed.length;ce++){const ae=Y.removed[ce],Le=R.indexOf(ae);Le>=0&&(R[Le]=null,b[Le].disconnect(ae))}for(let ce=0;ce<Y.added.length;ce++){const ae=Y.added[ce];let Le=R.indexOf(ae);if(Le===-1){for(let O=0;O<b.length;O++)if(O>=R.length){R.push(ae),Le=O;break}else if(R[O]===null){R[O]=ae,Le=O;break}if(Le===-1)break}const De=b[Le];De&&De.connect(ae)}}const Q=new D,V=new D;function ee(Y,ce,ae){Q.setFromMatrixPosition(ce.matrixWorld),V.setFromMatrixPosition(ae.matrixWorld);const Le=Q.distanceTo(V),De=ce.projectionMatrix.elements,O=ae.projectionMatrix.elements,Re=De[14]/(De[10]-1),_e=De[14]/(De[10]+1),w=(De[9]+1)/De[5],Ze=(De[9]-1)/De[5],ve=(De[8]-1)/De[0],He=(O[8]+1)/O[0],Ee=Re*ve,et=Re*He,ye=Le/(-ve+He),Ve=ye*-ve;if(ce.matrixWorld.decompose(Y.position,Y.quaternion,Y.scale),Y.translateX(Ve),Y.translateZ(ye),Y.matrixWorld.compose(Y.position,Y.quaternion,Y.scale),Y.matrixWorldInverse.copy(Y.matrixWorld).invert(),De[10]===-1)Y.projectionMatrix.copy(ce.projectionMatrix),Y.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{const At=Re+ye,vt=_e+ye,T=Ee-Ve,x=et+(Le-Ve),k=w*_e/vt*At,J=Ze*_e/vt*At;Y.projectionMatrix.makePerspective(T,x,k,J,At,vt),Y.projectionMatrixInverse.copy(Y.projectionMatrix).invert()}}function oe(Y,ce){ce===null?Y.matrixWorld.copy(Y.matrix):Y.matrixWorld.multiplyMatrices(ce.matrixWorld,Y.matrix),Y.matrixWorldInverse.copy(Y.matrixWorld).invert()}this.updateCamera=function(Y){if(i===null)return;let ce=Y.near,ae=Y.far;v.texture!==null&&(v.depthNear>0&&(ce=v.depthNear),v.depthFar>0&&(ae=v.depthFar)),C.near=M.near=F.near=ce,C.far=M.far=F.far=ae,(Z!==C.near||q!==C.far)&&(i.updateRenderState({depthNear:C.near,depthFar:C.far}),Z=C.near,q=C.far),C.layers.mask=Y.layers.mask|6,F.layers.mask=C.layers.mask&3,M.layers.mask=C.layers.mask&5;const Le=Y.parent,De=C.cameras;oe(C,Le);for(let O=0;O<De.length;O++)oe(De[O],Le);De.length===2?ee(C,F,M):C.projectionMatrix.copy(F.projectionMatrix),pe(Y,C,Le)};function pe(Y,ce,ae){ae===null?Y.matrix.copy(ce.matrixWorld):(Y.matrix.copy(ae.matrixWorld),Y.matrix.invert(),Y.matrix.multiply(ce.matrixWorld)),Y.matrix.decompose(Y.position,Y.quaternion,Y.scale),Y.updateMatrixWorld(!0),Y.projectionMatrix.copy(ce.projectionMatrix),Y.projectionMatrixInverse.copy(ce.projectionMatrixInverse),Y.isPerspectiveCamera&&(Y.fov=Zi*2*Math.atan(1/Y.projectionMatrix.elements[5]),Y.zoom=1)}this.getCamera=function(){return C},this.getFoveation=function(){if(!(h===null&&m===null))return l},this.setFoveation=function(Y){l=Y,h!==null&&(h.fixedFoveation=Y),m!==null&&m.fixedFoveation!==void 0&&(m.fixedFoveation=Y)},this.hasDepthSensing=function(){return v.texture!==null},this.getDepthSensingMesh=function(){return v.getMesh(C)},this.getCameraTexture=function(Y){return g[Y]};let Oe=null;function st(Y,ce){if(u=ce.getViewerPose(c||o),_=ce,u!==null){const ae=u.views;m!==null&&(e.setRenderTargetFramebuffer(E,m.framebuffer),e.setRenderTarget(E));let Le=!1;ae.length!==C.cameras.length&&(C.cameras.length=0,Le=!0);for(let _e=0;_e<ae.length;_e++){const w=ae[_e];let Ze=null;if(m!==null)Ze=m.getViewport(w);else{const He=d.getViewSubImage(h,w);Ze=He.viewport,_e===0&&(e.setRenderTargetTextures(E,He.colorTexture,He.depthStencilTexture),e.setRenderTarget(E))}let ve=S[_e];ve===void 0&&(ve=new Ft,ve.layers.enable(_e),ve.viewport=new ot,S[_e]=ve),ve.matrix.fromArray(w.transform.matrix),ve.matrix.decompose(ve.position,ve.quaternion,ve.scale),ve.projectionMatrix.fromArray(w.projectionMatrix),ve.projectionMatrixInverse.copy(ve.projectionMatrix).invert(),ve.viewport.set(Ze.x,Ze.y,Ze.width,Ze.height),_e===0&&(C.matrix.copy(ve.matrix),C.matrix.decompose(C.position,C.quaternion,C.scale)),Le===!0&&C.cameras.push(ve)}const De=i.enabledFeatures;if(De&&De.includes("depth-sensing")&&i.depthUsage=="gpu-optimized"&&d){const _e=d.getDepthInformation(ae[0]);_e&&_e.isValid&&_e.texture&&v.init(_e,i.renderState)}if(De&&De.includes("camera-access")&&(e.state.unbindTexture(),d))for(let _e=0;_e<ae.length;_e++){const w=ae[_e].camera;if(w){let Ze=g[w];Ze||(Ze=new $c,g[w]=Ze);const ve=d.getCameraImage(w);Ze.sourceTexture=ve}}}for(let ae=0;ae<b.length;ae++){const Le=R[ae],De=b[ae];Le!==null&&De!==void 0&&De.update(Le,ce,c||o)}Oe&&Oe(Y,ce),ce.detectedPlanes&&n.dispatchEvent({type:"planesdetected",data:ce}),_=null}const rt=new jc;rt.setAnimationLoop(st),this.setAnimationLoop=function(Y){Oe=Y},this.dispose=function(){}}}const ci=new Sn,Uv=new Ye;function Nv(s,e){function t(g,p){g.matrixAutoUpdate===!0&&g.updateMatrix(),p.value.copy(g.matrix)}function n(g,p){p.color.getRGB(g.fogColor.value,Uc(s)),p.isFog?(g.fogNear.value=p.near,g.fogFar.value=p.far):p.isFogExp2&&(g.fogDensity.value=p.density)}function i(g,p,A,E,b){p.isMeshBasicMaterial||p.isMeshLambertMaterial?r(g,p):p.isMeshToonMaterial?(r(g,p),d(g,p)):p.isMeshPhongMaterial?(r(g,p),u(g,p)):p.isMeshStandardMaterial?(r(g,p),h(g,p),p.isMeshPhysicalMaterial&&m(g,p,b)):p.isMeshMatcapMaterial?(r(g,p),_(g,p)):p.isMeshDepthMaterial?r(g,p):p.isMeshDistanceMaterial?(r(g,p),v(g,p)):p.isMeshNormalMaterial?r(g,p):p.isLineBasicMaterial?(o(g,p),p.isLineDashedMaterial&&a(g,p)):p.isPointsMaterial?l(g,p,A,E):p.isSpriteMaterial?c(g,p):p.isShadowMaterial?(g.color.value.copy(p.color),g.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function r(g,p){g.opacity.value=p.opacity,p.color&&g.diffuse.value.copy(p.color),p.emissive&&g.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.bumpMap&&(g.bumpMap.value=p.bumpMap,t(p.bumpMap,g.bumpMapTransform),g.bumpScale.value=p.bumpScale,p.side===Xt&&(g.bumpScale.value*=-1)),p.normalMap&&(g.normalMap.value=p.normalMap,t(p.normalMap,g.normalMapTransform),g.normalScale.value.copy(p.normalScale),p.side===Xt&&g.normalScale.value.negate()),p.displacementMap&&(g.displacementMap.value=p.displacementMap,t(p.displacementMap,g.displacementMapTransform),g.displacementScale.value=p.displacementScale,g.displacementBias.value=p.displacementBias),p.emissiveMap&&(g.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,g.emissiveMapTransform)),p.specularMap&&(g.specularMap.value=p.specularMap,t(p.specularMap,g.specularMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest);const A=e.get(p),E=A.envMap,b=A.envMapRotation;E&&(g.envMap.value=E,ci.copy(b),ci.x*=-1,ci.y*=-1,ci.z*=-1,E.isCubeTexture&&E.isRenderTargetTexture===!1&&(ci.y*=-1,ci.z*=-1),g.envMapRotation.value.setFromMatrix4(Uv.makeRotationFromEuler(ci)),g.flipEnvMap.value=E.isCubeTexture&&E.isRenderTargetTexture===!1?-1:1,g.reflectivity.value=p.reflectivity,g.ior.value=p.ior,g.refractionRatio.value=p.refractionRatio),p.lightMap&&(g.lightMap.value=p.lightMap,g.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,g.lightMapTransform)),p.aoMap&&(g.aoMap.value=p.aoMap,g.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,g.aoMapTransform))}function o(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform))}function a(g,p){g.dashSize.value=p.dashSize,g.totalSize.value=p.dashSize+p.gapSize,g.scale.value=p.scale}function l(g,p,A,E){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.size.value=p.size*A,g.scale.value=E*.5,p.map&&(g.map.value=p.map,t(p.map,g.uvTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function c(g,p){g.diffuse.value.copy(p.color),g.opacity.value=p.opacity,g.rotation.value=p.rotation,p.map&&(g.map.value=p.map,t(p.map,g.mapTransform)),p.alphaMap&&(g.alphaMap.value=p.alphaMap,t(p.alphaMap,g.alphaMapTransform)),p.alphaTest>0&&(g.alphaTest.value=p.alphaTest)}function u(g,p){g.specular.value.copy(p.specular),g.shininess.value=Math.max(p.shininess,1e-4)}function d(g,p){p.gradientMap&&(g.gradientMap.value=p.gradientMap)}function h(g,p){g.metalness.value=p.metalness,p.metalnessMap&&(g.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,g.metalnessMapTransform)),g.roughness.value=p.roughness,p.roughnessMap&&(g.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,g.roughnessMapTransform)),p.envMap&&(g.envMapIntensity.value=p.envMapIntensity)}function m(g,p,A){g.ior.value=p.ior,p.sheen>0&&(g.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),g.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(g.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,g.sheenColorMapTransform)),p.sheenRoughnessMap&&(g.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,g.sheenRoughnessMapTransform))),p.clearcoat>0&&(g.clearcoat.value=p.clearcoat,g.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(g.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,g.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(g.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,g.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(g.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,g.clearcoatNormalMapTransform),g.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===Xt&&g.clearcoatNormalScale.value.negate())),p.dispersion>0&&(g.dispersion.value=p.dispersion),p.iridescence>0&&(g.iridescence.value=p.iridescence,g.iridescenceIOR.value=p.iridescenceIOR,g.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],g.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(g.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,g.iridescenceMapTransform)),p.iridescenceThicknessMap&&(g.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,g.iridescenceThicknessMapTransform))),p.transmission>0&&(g.transmission.value=p.transmission,g.transmissionSamplerMap.value=A.texture,g.transmissionSamplerSize.value.set(A.width,A.height),p.transmissionMap&&(g.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,g.transmissionMapTransform)),g.thickness.value=p.thickness,p.thicknessMap&&(g.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,g.thicknessMapTransform)),g.attenuationDistance.value=p.attenuationDistance,g.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(g.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(g.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,g.anisotropyMapTransform))),g.specularIntensity.value=p.specularIntensity,g.specularColor.value.copy(p.specularColor),p.specularColorMap&&(g.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,g.specularColorMapTransform)),p.specularIntensityMap&&(g.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,g.specularIntensityMapTransform))}function _(g,p){p.matcap&&(g.matcap.value=p.matcap)}function v(g,p){const A=e.get(p).light;g.referencePosition.value.setFromMatrixPosition(A.matrixWorld),g.nearDistance.value=A.shadow.camera.near,g.farDistance.value=A.shadow.camera.far}return{refreshFogUniforms:n,refreshMaterialUniforms:i}}function Fv(s,e,t,n){let i={},r={},o=[];const a=s.getParameter(s.MAX_UNIFORM_BUFFER_BINDINGS);function l(A,E){const b=E.program;n.uniformBlockBinding(A,b)}function c(A,E){let b=i[A.id];b===void 0&&(_(A),b=u(A),i[A.id]=b,A.addEventListener("dispose",g));const R=E.program;n.updateUBOMapping(A,R);const P=e.render.frame;r[A.id]!==P&&(h(A),r[A.id]=P)}function u(A){const E=d();A.__bindingPointIndex=E;const b=s.createBuffer(),R=A.__size,P=A.usage;return s.bindBuffer(s.UNIFORM_BUFFER,b),s.bufferData(s.UNIFORM_BUFFER,R,P),s.bindBuffer(s.UNIFORM_BUFFER,null),s.bindBufferBase(s.UNIFORM_BUFFER,E,b),b}function d(){for(let A=0;A<a;A++)if(o.indexOf(A)===-1)return o.push(A),A;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function h(A){const E=i[A.id],b=A.uniforms,R=A.__cache;s.bindBuffer(s.UNIFORM_BUFFER,E);for(let P=0,I=b.length;P<I;P++){const F=Array.isArray(b[P])?b[P]:[b[P]];for(let M=0,S=F.length;M<S;M++){const C=F[M];if(m(C,P,M,R)===!0){const Z=C.__offset,q=Array.isArray(C.value)?C.value:[C.value];let X=0;for(let j=0;j<q.length;j++){const B=q[j],Q=v(B);typeof B=="number"||typeof B=="boolean"?(C.__data[0]=B,s.bufferSubData(s.UNIFORM_BUFFER,Z+X,C.__data)):B.isMatrix3?(C.__data[0]=B.elements[0],C.__data[1]=B.elements[1],C.__data[2]=B.elements[2],C.__data[3]=0,C.__data[4]=B.elements[3],C.__data[5]=B.elements[4],C.__data[6]=B.elements[5],C.__data[7]=0,C.__data[8]=B.elements[6],C.__data[9]=B.elements[7],C.__data[10]=B.elements[8],C.__data[11]=0):(B.toArray(C.__data,X),X+=Q.storage/Float32Array.BYTES_PER_ELEMENT)}s.bufferSubData(s.UNIFORM_BUFFER,Z,C.__data)}}}s.bindBuffer(s.UNIFORM_BUFFER,null)}function m(A,E,b,R){const P=A.value,I=E+"_"+b;if(R[I]===void 0)return typeof P=="number"||typeof P=="boolean"?R[I]=P:R[I]=P.clone(),!0;{const F=R[I];if(typeof P=="number"||typeof P=="boolean"){if(F!==P)return R[I]=P,!0}else if(F.equals(P)===!1)return F.copy(P),!0}return!1}function _(A){const E=A.uniforms;let b=0;const R=16;for(let I=0,F=E.length;I<F;I++){const M=Array.isArray(E[I])?E[I]:[E[I]];for(let S=0,C=M.length;S<C;S++){const Z=M[S],q=Array.isArray(Z.value)?Z.value:[Z.value];for(let X=0,j=q.length;X<j;X++){const B=q[X],Q=v(B),V=b%R,ee=V%Q.boundary,oe=V+ee;b+=ee,oe!==0&&R-oe<Q.storage&&(b+=R-oe),Z.__data=new Float32Array(Q.storage/Float32Array.BYTES_PER_ELEMENT),Z.__offset=b,b+=Q.storage}}}const P=b%R;return P>0&&(b+=R-P),A.__size=b,A.__cache={},this}function v(A){const E={boundary:0,storage:0};return typeof A=="number"||typeof A=="boolean"?(E.boundary=4,E.storage=4):A.isVector2?(E.boundary=8,E.storage=8):A.isVector3||A.isColor?(E.boundary=16,E.storage=12):A.isVector4?(E.boundary=16,E.storage=16):A.isMatrix3?(E.boundary=48,E.storage=48):A.isMatrix4?(E.boundary=64,E.storage=64):A.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",A),E}function g(A){const E=A.target;E.removeEventListener("dispose",g);const b=o.indexOf(E.__bindingPointIndex);o.splice(b,1),s.deleteBuffer(i[E.id]),delete i[E.id],delete r[E.id]}function p(){for(const A in i)s.deleteBuffer(i[A]);o=[],i={},r={}}return{bind:l,update:c,dispose:p}}class Ov{constructor(e={}){const{canvas:t=Lh(),context:n=null,depth:i=!0,stencil:r=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:u="default",failIfMajorPerformanceCaveat:d=!1,reversedDepthBuffer:h=!1}=e;this.isWebGLRenderer=!0;let m;if(n!==null){if(typeof WebGLRenderingContext<"u"&&n instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");m=n.getContextAttributes().alpha}else m=o;const _=new Uint32Array(4),v=new Int32Array(4);let g=null,p=null;const A=[],E=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Qn,this.toneMappingExposure=1,this.transmissionResolutionScale=1;const b=this;let R=!1;this._outputColorSpace=Lt;let P=0,I=0,F=null,M=-1,S=null;const C=new ot,Z=new ot;let q=null;const X=new ze(0);let j=0,B=t.width,Q=t.height,V=1,ee=null,oe=null;const pe=new ot(0,0,B,Q),Oe=new ot(0,0,B,Q);let st=!1;const rt=new ba;let Y=!1,ce=!1;const ae=new Ye,Le=new D,De=new ot,O={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0};let Re=!1;function _e(){return F===null?V:1}let w=n;function Ze(y,U){return t.getContext(y,U)}try{const y={alpha:!0,depth:i,stencil:r,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:u,failIfMajorPerformanceCaveat:d};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${aa}`),t.addEventListener("webglcontextlost",ue,!1),t.addEventListener("webglcontextrestored",be,!1),t.addEventListener("webglcontextcreationerror",ne,!1),w===null){const U="webgl2";if(w=Ze(U,y),w===null)throw Ze(U)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(y){throw console.error("THREE.WebGLRenderer: "+y.message),y}let ve,He,Ee,et,ye,Ve,At,vt,T,x,k,J,te,K,Ce,le,Te,Ae,se,ge,Fe,we,fe,Xe;function L(){ve=new jg(w),ve.init(),we=new Rv(w,ve),He=new Vg(w,ve,e,we),Ee=new wv(w,ve),He.reversedDepthBuffer&&h&&Ee.buffers.depth.setReversed(!0),et=new Zg(w),ye=new pv,Ve=new Cv(w,ve,Ee,ye,He,we,et),At=new Hg(b),vt=new qg(b),T=new np(w),fe=new kg(w,T),x=new Yg(w,T,et,fe),k=new $g(w,x,T,et),se=new Jg(w,He,Ve),le=new zg(ye),J=new fv(b,At,vt,ve,He,fe,le),te=new Nv(b,ye),K=new gv,Ce=new Sv(ve),Ae=new Og(b,At,vt,Ee,k,m,l),Te=new Ev(b,k,He),Xe=new Fv(w,et,He,Ee),ge=new Bg(w,ve,et),Fe=new Kg(w,ve,et),et.programs=J.programs,b.capabilities=He,b.extensions=ve,b.properties=ye,b.renderLists=K,b.shadowMap=Te,b.state=Ee,b.info=et}L();const re=new Dv(b,w);this.xr=re,this.getContext=function(){return w},this.getContextAttributes=function(){return w.getContextAttributes()},this.forceContextLoss=function(){const y=ve.get("WEBGL_lose_context");y&&y.loseContext()},this.forceContextRestore=function(){const y=ve.get("WEBGL_lose_context");y&&y.restoreContext()},this.getPixelRatio=function(){return V},this.setPixelRatio=function(y){y!==void 0&&(V=y,this.setSize(B,Q,!1))},this.getSize=function(y){return y.set(B,Q)},this.setSize=function(y,U,z=!0){if(re.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}B=y,Q=U,t.width=Math.floor(y*V),t.height=Math.floor(U*V),z===!0&&(t.style.width=y+"px",t.style.height=U+"px"),this.setViewport(0,0,y,U)},this.getDrawingBufferSize=function(y){return y.set(B*V,Q*V).floor()},this.setDrawingBufferSize=function(y,U,z){B=y,Q=U,V=z,t.width=Math.floor(y*z),t.height=Math.floor(U*z),this.setViewport(0,0,y,U)},this.getCurrentViewport=function(y){return y.copy(C)},this.getViewport=function(y){return y.copy(pe)},this.setViewport=function(y,U,z,H){y.isVector4?pe.set(y.x,y.y,y.z,y.w):pe.set(y,U,z,H),Ee.viewport(C.copy(pe).multiplyScalar(V).round())},this.getScissor=function(y){return y.copy(Oe)},this.setScissor=function(y,U,z,H){y.isVector4?Oe.set(y.x,y.y,y.z,y.w):Oe.set(y,U,z,H),Ee.scissor(Z.copy(Oe).multiplyScalar(V).round())},this.getScissorTest=function(){return st},this.setScissorTest=function(y){Ee.setScissorTest(st=y)},this.setOpaqueSort=function(y){ee=y},this.setTransparentSort=function(y){oe=y},this.getClearColor=function(y){return y.copy(Ae.getClearColor())},this.setClearColor=function(){Ae.setClearColor(...arguments)},this.getClearAlpha=function(){return Ae.getClearAlpha()},this.setClearAlpha=function(){Ae.setClearAlpha(...arguments)},this.clear=function(y=!0,U=!0,z=!0){let H=0;if(y){let N=!1;if(F!==null){const ie=F.texture.format;N=ie===pa||ie===fa||ie===ha}if(N){const ie=F.texture.type,me=ie===bn||ie===gi||ie===bs||ie===Ss||ie===ca||ie===ua,Se=Ae.getClearColor(),xe=Ae.getClearAlpha(),Ne=Se.r,ke=Se.g,Pe=Se.b;me?(_[0]=Ne,_[1]=ke,_[2]=Pe,_[3]=xe,w.clearBufferuiv(w.COLOR,0,_)):(v[0]=Ne,v[1]=ke,v[2]=Pe,v[3]=xe,w.clearBufferiv(w.COLOR,0,v))}else H|=w.COLOR_BUFFER_BIT}U&&(H|=w.DEPTH_BUFFER_BIT),z&&(H|=w.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),w.clear(H)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",ue,!1),t.removeEventListener("webglcontextrestored",be,!1),t.removeEventListener("webglcontextcreationerror",ne,!1),Ae.dispose(),K.dispose(),Ce.dispose(),ye.dispose(),At.dispose(),vt.dispose(),k.dispose(),fe.dispose(),Xe.dispose(),J.dispose(),re.dispose(),re.removeEventListener("sessionstart",mn),re.removeEventListener("sessionend",Pa),ni.stop()};function ue(y){y.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),R=!0}function be(){console.log("THREE.WebGLRenderer: Context Restored."),R=!1;const y=et.autoReset,U=Te.enabled,z=Te.autoUpdate,H=Te.needsUpdate,N=Te.type;L(),et.autoReset=y,Te.enabled=U,Te.autoUpdate=z,Te.needsUpdate=H,Te.type=N}function ne(y){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",y.statusMessage)}function $(y){const U=y.target;U.removeEventListener("dispose",$),Me(U)}function Me(y){Ge(y),ye.remove(y)}function Ge(y){const U=ye.get(y).programs;U!==void 0&&(U.forEach(function(z){J.releaseProgram(z)}),y.isShaderMaterial&&J.releaseShaderCache(y))}this.renderBufferDirect=function(y,U,z,H,N,ie){U===null&&(U=O);const me=N.isMesh&&N.matrixWorld.determinant()<0,Se=iu(y,U,z,H,N);Ee.setMaterial(H,me);let xe=z.index,Ne=1;if(H.wireframe===!0){if(xe=x.getWireframeAttribute(z),xe===void 0)return;Ne=2}const ke=z.drawRange,Pe=z.attributes.position;let $e=ke.start*Ne,dt=(ke.start+ke.count)*Ne;ie!==null&&($e=Math.max($e,ie.start*Ne),dt=Math.min(dt,(ie.start+ie.count)*Ne)),xe!==null?($e=Math.max($e,0),dt=Math.min(dt,xe.count)):Pe!=null&&($e=Math.max($e,0),dt=Math.min(dt,Pe.count));const St=dt-$e;if(St<0||St===1/0)return;fe.setup(N,H,Se,z,xe);let gt,pt=ge;if(xe!==null&&(gt=T.get(xe),pt=Fe,pt.setIndex(gt)),N.isMesh)H.wireframe===!0?(Ee.setLineWidth(H.wireframeLinewidth*_e()),pt.setMode(w.LINES)):pt.setMode(w.TRIANGLES);else if(N.isLine){let Ue=H.linewidth;Ue===void 0&&(Ue=1),Ee.setLineWidth(Ue*_e()),N.isLineSegments?pt.setMode(w.LINES):N.isLineLoop?pt.setMode(w.LINE_LOOP):pt.setMode(w.LINE_STRIP)}else N.isPoints?pt.setMode(w.POINTS):N.isSprite&&pt.setMode(w.TRIANGLES);if(N.isBatchedMesh)if(N._multiDrawInstances!==null)Gi("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),pt.renderMultiDrawInstances(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount,N._multiDrawInstances);else if(ve.get("WEBGL_multi_draw"))pt.renderMultiDraw(N._multiDrawStarts,N._multiDrawCounts,N._multiDrawCount);else{const Ue=N._multiDrawStarts,xt=N._multiDrawCounts,nt=N._multiDrawCount,qt=xe?T.get(xe).bytesPerElement:1,vi=ye.get(H).currentProgram.getUniforms();for(let jt=0;jt<nt;jt++)vi.setValue(w,"_gl_DrawID",jt),pt.render(Ue[jt]/qt,xt[jt])}else if(N.isInstancedMesh)pt.renderInstances($e,St,N.count);else if(z.isInstancedBufferGeometry){const Ue=z._maxInstanceCount!==void 0?z._maxInstanceCount:1/0,xt=Math.min(z.instanceCount,Ue);pt.renderInstances($e,St,xt)}else pt.render($e,St)};function mt(y,U,z){y.transparent===!0&&y.side===vn&&y.forceSinglePass===!1?(y.side=Xt,y.needsUpdate=!0,Ds(y,U,z),y.side=Bn,y.needsUpdate=!0,Ds(y,U,z),y.side=vn):Ds(y,U,z)}this.compile=function(y,U,z=null){z===null&&(z=y),p=Ce.get(z),p.init(U),E.push(p),z.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),y!==z&&y.traverseVisible(function(N){N.isLight&&N.layers.test(U.layers)&&(p.pushLight(N),N.castShadow&&p.pushShadow(N))}),p.setupLights();const H=new Set;return y.traverse(function(N){if(!(N.isMesh||N.isPoints||N.isLine||N.isSprite))return;const ie=N.material;if(ie)if(Array.isArray(ie))for(let me=0;me<ie.length;me++){const Se=ie[me];mt(Se,z,N),H.add(Se)}else mt(ie,z,N),H.add(ie)}),p=E.pop(),H},this.compileAsync=function(y,U,z=null){const H=this.compile(y,U,z);return new Promise(N=>{function ie(){if(H.forEach(function(me){ye.get(me).currentProgram.isReady()&&H.delete(me)}),H.size===0){N(y);return}setTimeout(ie,10)}ve.get("KHR_parallel_shader_compile")!==null?ie():setTimeout(ie,10)})};let at=null;function An(y){at&&at(y)}function mn(){ni.stop()}function Pa(){ni.start()}const ni=new jc;ni.setAnimationLoop(An),typeof self<"u"&&ni.setContext(self),this.setAnimationLoop=function(y){at=y,re.setAnimationLoop(y),y===null?ni.stop():ni.start()},re.addEventListener("sessionstart",mn),re.addEventListener("sessionend",Pa),this.render=function(y,U){if(U!==void 0&&U.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(R===!0)return;if(y.matrixWorldAutoUpdate===!0&&y.updateMatrixWorld(),U.parent===null&&U.matrixWorldAutoUpdate===!0&&U.updateMatrixWorld(),re.enabled===!0&&re.isPresenting===!0&&(re.cameraAutoUpdate===!0&&re.updateCamera(U),U=re.getCamera()),y.isScene===!0&&y.onBeforeRender(b,y,U,F),p=Ce.get(y,E.length),p.init(U),E.push(p),ae.multiplyMatrices(U.projectionMatrix,U.matrixWorldInverse),rt.setFromProjectionMatrix(ae,xn,U.reversedDepth),ce=this.localClippingEnabled,Y=le.init(this.clippingPlanes,ce),g=K.get(y,A.length),g.init(),A.push(g),re.enabled===!0&&re.isPresenting===!0){const ie=b.xr.getDepthSensingMesh();ie!==null&&Ar(ie,U,-1/0,b.sortObjects)}Ar(y,U,0,b.sortObjects),g.finish(),b.sortObjects===!0&&g.sort(ee,oe),Re=re.enabled===!1||re.isPresenting===!1||re.hasDepthSensing()===!1,Re&&Ae.addToRenderList(g,y),this.info.render.frame++,Y===!0&&le.beginShadows();const z=p.state.shadowsArray;Te.render(z,y,U),Y===!0&&le.endShadows(),this.info.autoReset===!0&&this.info.reset();const H=g.opaque,N=g.transmissive;if(p.setupLights(),U.isArrayCamera){const ie=U.cameras;if(N.length>0)for(let me=0,Se=ie.length;me<Se;me++){const xe=ie[me];La(H,N,y,xe)}Re&&Ae.render(y);for(let me=0,Se=ie.length;me<Se;me++){const xe=ie[me];Ia(g,y,xe,xe.viewport)}}else N.length>0&&La(H,N,y,U),Re&&Ae.render(y),Ia(g,y,U);F!==null&&I===0&&(Ve.updateMultisampleRenderTarget(F),Ve.updateRenderTargetMipmap(F)),y.isScene===!0&&y.onAfterRender(b,y,U),fe.resetDefaultState(),M=-1,S=null,E.pop(),E.length>0?(p=E[E.length-1],Y===!0&&le.setGlobalState(b.clippingPlanes,p.state.camera)):p=null,A.pop(),A.length>0?g=A[A.length-1]:g=null};function Ar(y,U,z,H){if(y.visible===!1)return;if(y.layers.test(U.layers)){if(y.isGroup)z=y.renderOrder;else if(y.isLOD)y.autoUpdate===!0&&y.update(U);else if(y.isLight)p.pushLight(y),y.castShadow&&p.pushShadow(y);else if(y.isSprite){if(!y.frustumCulled||rt.intersectsSprite(y)){H&&De.setFromMatrixPosition(y.matrixWorld).applyMatrix4(ae);const me=k.update(y),Se=y.material;Se.visible&&g.push(y,me,Se,z,De.z,null)}}else if((y.isMesh||y.isLine||y.isPoints)&&(!y.frustumCulled||rt.intersectsObject(y))){const me=k.update(y),Se=y.material;if(H&&(y.boundingSphere!==void 0?(y.boundingSphere===null&&y.computeBoundingSphere(),De.copy(y.boundingSphere.center)):(me.boundingSphere===null&&me.computeBoundingSphere(),De.copy(me.boundingSphere.center)),De.applyMatrix4(y.matrixWorld).applyMatrix4(ae)),Array.isArray(Se)){const xe=me.groups;for(let Ne=0,ke=xe.length;Ne<ke;Ne++){const Pe=xe[Ne],$e=Se[Pe.materialIndex];$e&&$e.visible&&g.push(y,me,$e,z,De.z,Pe)}}else Se.visible&&g.push(y,me,Se,z,De.z,null)}}const ie=y.children;for(let me=0,Se=ie.length;me<Se;me++)Ar(ie[me],U,z,H)}function Ia(y,U,z,H){const N=y.opaque,ie=y.transmissive,me=y.transparent;p.setupLightsView(z),Y===!0&&le.setGlobalState(b.clippingPlanes,z),H&&Ee.viewport(C.copy(H)),N.length>0&&Ls(N,U,z),ie.length>0&&Ls(ie,U,z),me.length>0&&Ls(me,U,z),Ee.buffers.depth.setTest(!0),Ee.buffers.depth.setMask(!0),Ee.buffers.color.setMask(!0),Ee.setPolygonOffset(!1)}function La(y,U,z,H){if((z.isScene===!0?z.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[H.id]===void 0&&(p.state.transmissionRenderTarget[H.id]=new _i(1,1,{generateMipmaps:!0,type:ve.has("EXT_color_buffer_half_float")||ve.has("EXT_color_buffer_float")?Cs:bn,minFilter:Nn,samples:4,stencilBuffer:r,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:Qe.workingColorSpace}));const ie=p.state.transmissionRenderTarget[H.id],me=H.viewport||C;ie.setSize(me.z*b.transmissionResolutionScale,me.w*b.transmissionResolutionScale);const Se=b.getRenderTarget(),xe=b.getActiveCubeFace(),Ne=b.getActiveMipmapLevel();b.setRenderTarget(ie),b.getClearColor(X),j=b.getClearAlpha(),j<1&&b.setClearColor(16777215,.5),b.clear(),Re&&Ae.render(z);const ke=b.toneMapping;b.toneMapping=Qn;const Pe=H.viewport;if(H.viewport!==void 0&&(H.viewport=void 0),p.setupLightsView(H),Y===!0&&le.setGlobalState(b.clippingPlanes,H),Ls(y,z,H),Ve.updateMultisampleRenderTarget(ie),Ve.updateRenderTargetMipmap(ie),ve.has("WEBGL_multisampled_render_to_texture")===!1){let $e=!1;for(let dt=0,St=U.length;dt<St;dt++){const gt=U[dt],pt=gt.object,Ue=gt.geometry,xt=gt.material,nt=gt.group;if(xt.side===vn&&pt.layers.test(H.layers)){const qt=xt.side;xt.side=Xt,xt.needsUpdate=!0,Da(pt,z,H,Ue,xt,nt),xt.side=qt,xt.needsUpdate=!0,$e=!0}}$e===!0&&(Ve.updateMultisampleRenderTarget(ie),Ve.updateRenderTargetMipmap(ie))}b.setRenderTarget(Se,xe,Ne),b.setClearColor(X,j),Pe!==void 0&&(H.viewport=Pe),b.toneMapping=ke}function Ls(y,U,z){const H=U.isScene===!0?U.overrideMaterial:null;for(let N=0,ie=y.length;N<ie;N++){const me=y[N],Se=me.object,xe=me.geometry,Ne=me.group;let ke=me.material;ke.allowOverride===!0&&H!==null&&(ke=H),Se.layers.test(z.layers)&&Da(Se,U,z,xe,ke,Ne)}}function Da(y,U,z,H,N,ie){y.onBeforeRender(b,U,z,H,N,ie),y.modelViewMatrix.multiplyMatrices(z.matrixWorldInverse,y.matrixWorld),y.normalMatrix.getNormalMatrix(y.modelViewMatrix),N.onBeforeRender(b,U,z,H,y,ie),N.transparent===!0&&N.side===vn&&N.forceSinglePass===!1?(N.side=Xt,N.needsUpdate=!0,b.renderBufferDirect(z,U,H,N,y,ie),N.side=Bn,N.needsUpdate=!0,b.renderBufferDirect(z,U,H,N,y,ie),N.side=vn):b.renderBufferDirect(z,U,H,N,y,ie),y.onAfterRender(b,U,z,H,N,ie)}function Ds(y,U,z){U.isScene!==!0&&(U=O);const H=ye.get(y),N=p.state.lights,ie=p.state.shadowsArray,me=N.state.version,Se=J.getParameters(y,N.state,ie,U,z),xe=J.getProgramCacheKey(Se);let Ne=H.programs;H.environment=y.isMeshStandardMaterial?U.environment:null,H.fog=U.fog,H.envMap=(y.isMeshStandardMaterial?vt:At).get(y.envMap||H.environment),H.envMapRotation=H.environment!==null&&y.envMap===null?U.environmentRotation:y.envMapRotation,Ne===void 0&&(y.addEventListener("dispose",$),Ne=new Map,H.programs=Ne);let ke=Ne.get(xe);if(ke!==void 0){if(H.currentProgram===ke&&H.lightsStateVersion===me)return Na(y,Se),ke}else Se.uniforms=J.getUniforms(y),y.onBeforeCompile(Se,b),ke=J.acquireProgram(Se,xe),Ne.set(xe,ke),H.uniforms=Se.uniforms;const Pe=H.uniforms;return(!y.isShaderMaterial&&!y.isRawShaderMaterial||y.clipping===!0)&&(Pe.clippingPlanes=le.uniform),Na(y,Se),H.needsLights=ru(y),H.lightsStateVersion=me,H.needsLights&&(Pe.ambientLightColor.value=N.state.ambient,Pe.lightProbe.value=N.state.probe,Pe.directionalLights.value=N.state.directional,Pe.directionalLightShadows.value=N.state.directionalShadow,Pe.spotLights.value=N.state.spot,Pe.spotLightShadows.value=N.state.spotShadow,Pe.rectAreaLights.value=N.state.rectArea,Pe.ltc_1.value=N.state.rectAreaLTC1,Pe.ltc_2.value=N.state.rectAreaLTC2,Pe.pointLights.value=N.state.point,Pe.pointLightShadows.value=N.state.pointShadow,Pe.hemisphereLights.value=N.state.hemi,Pe.directionalShadowMap.value=N.state.directionalShadowMap,Pe.directionalShadowMatrix.value=N.state.directionalShadowMatrix,Pe.spotShadowMap.value=N.state.spotShadowMap,Pe.spotLightMatrix.value=N.state.spotLightMatrix,Pe.spotLightMap.value=N.state.spotLightMap,Pe.pointShadowMap.value=N.state.pointShadowMap,Pe.pointShadowMatrix.value=N.state.pointShadowMatrix),H.currentProgram=ke,H.uniformsList=null,ke}function Ua(y){if(y.uniformsList===null){const U=y.currentProgram.getUniforms();y.uniformsList=mr.seqWithValue(U.seq,y.uniforms)}return y.uniformsList}function Na(y,U){const z=ye.get(y);z.outputColorSpace=U.outputColorSpace,z.batching=U.batching,z.batchingColor=U.batchingColor,z.instancing=U.instancing,z.instancingColor=U.instancingColor,z.instancingMorph=U.instancingMorph,z.skinning=U.skinning,z.morphTargets=U.morphTargets,z.morphNormals=U.morphNormals,z.morphColors=U.morphColors,z.morphTargetsCount=U.morphTargetsCount,z.numClippingPlanes=U.numClippingPlanes,z.numIntersection=U.numClipIntersection,z.vertexAlphas=U.vertexAlphas,z.vertexTangents=U.vertexTangents,z.toneMapping=U.toneMapping}function iu(y,U,z,H,N){U.isScene!==!0&&(U=O),Ve.resetTextureUnits();const ie=U.fog,me=H.isMeshStandardMaterial?U.environment:null,Se=F===null?b.outputColorSpace:F.isXRRenderTarget===!0?F.texture.colorSpace:Ht,xe=(H.isMeshStandardMaterial?vt:At).get(H.envMap||me),Ne=H.vertexColors===!0&&!!z.attributes.color&&z.attributes.color.itemSize===4,ke=!!z.attributes.tangent&&(!!H.normalMap||H.anisotropy>0),Pe=!!z.morphAttributes.position,$e=!!z.morphAttributes.normal,dt=!!z.morphAttributes.color;let St=Qn;H.toneMapped&&(F===null||F.isXRRenderTarget===!0)&&(St=b.toneMapping);const gt=z.morphAttributes.position||z.morphAttributes.normal||z.morphAttributes.color,pt=gt!==void 0?gt.length:0,Ue=ye.get(H),xt=p.state.lights;if(Y===!0&&(ce===!0||y!==S)){const Ot=y===S&&H.id===M;le.setState(H,y,Ot)}let nt=!1;H.version===Ue.__version?(Ue.needsLights&&Ue.lightsStateVersion!==xt.state.version||Ue.outputColorSpace!==Se||N.isBatchedMesh&&Ue.batching===!1||!N.isBatchedMesh&&Ue.batching===!0||N.isBatchedMesh&&Ue.batchingColor===!0&&N.colorTexture===null||N.isBatchedMesh&&Ue.batchingColor===!1&&N.colorTexture!==null||N.isInstancedMesh&&Ue.instancing===!1||!N.isInstancedMesh&&Ue.instancing===!0||N.isSkinnedMesh&&Ue.skinning===!1||!N.isSkinnedMesh&&Ue.skinning===!0||N.isInstancedMesh&&Ue.instancingColor===!0&&N.instanceColor===null||N.isInstancedMesh&&Ue.instancingColor===!1&&N.instanceColor!==null||N.isInstancedMesh&&Ue.instancingMorph===!0&&N.morphTexture===null||N.isInstancedMesh&&Ue.instancingMorph===!1&&N.morphTexture!==null||Ue.envMap!==xe||H.fog===!0&&Ue.fog!==ie||Ue.numClippingPlanes!==void 0&&(Ue.numClippingPlanes!==le.numPlanes||Ue.numIntersection!==le.numIntersection)||Ue.vertexAlphas!==Ne||Ue.vertexTangents!==ke||Ue.morphTargets!==Pe||Ue.morphNormals!==$e||Ue.morphColors!==dt||Ue.toneMapping!==St||Ue.morphTargetsCount!==pt)&&(nt=!0):(nt=!0,Ue.__version=H.version);let qt=Ue.currentProgram;nt===!0&&(qt=Ds(H,U,N));let vi=!1,jt=!1,rs=!1;const yt=qt.getUniforms(),en=Ue.uniforms;if(Ee.useProgram(qt.program)&&(vi=!0,jt=!0,rs=!0),H.id!==M&&(M=H.id,jt=!0),vi||S!==y){Ee.buffers.depth.getReversed()&&y.reversedDepth!==!0&&(y._reversedDepth=!0,y.updateProjectionMatrix()),yt.setValue(w,"projectionMatrix",y.projectionMatrix),yt.setValue(w,"viewMatrix",y.matrixWorldInverse);const Gt=yt.map.cameraPosition;Gt!==void 0&&Gt.setValue(w,Le.setFromMatrixPosition(y.matrixWorld)),He.logarithmicDepthBuffer&&yt.setValue(w,"logDepthBufFC",2/(Math.log(y.far+1)/Math.LN2)),(H.isMeshPhongMaterial||H.isMeshToonMaterial||H.isMeshLambertMaterial||H.isMeshBasicMaterial||H.isMeshStandardMaterial||H.isShaderMaterial)&&yt.setValue(w,"isOrthographic",y.isOrthographicCamera===!0),S!==y&&(S=y,jt=!0,rs=!0)}if(N.isSkinnedMesh){yt.setOptional(w,N,"bindMatrix"),yt.setOptional(w,N,"bindMatrixInverse");const Ot=N.skeleton;Ot&&(Ot.boneTexture===null&&Ot.computeBoneTexture(),yt.setValue(w,"boneTexture",Ot.boneTexture,Ve))}N.isBatchedMesh&&(yt.setOptional(w,N,"batchingTexture"),yt.setValue(w,"batchingTexture",N._matricesTexture,Ve),yt.setOptional(w,N,"batchingIdTexture"),yt.setValue(w,"batchingIdTexture",N._indirectTexture,Ve),yt.setOptional(w,N,"batchingColorTexture"),N._colorsTexture!==null&&yt.setValue(w,"batchingColorTexture",N._colorsTexture,Ve));const tn=z.morphAttributes;if((tn.position!==void 0||tn.normal!==void 0||tn.color!==void 0)&&se.update(N,z,qt),(jt||Ue.receiveShadow!==N.receiveShadow)&&(Ue.receiveShadow=N.receiveShadow,yt.setValue(w,"receiveShadow",N.receiveShadow)),H.isMeshGouraudMaterial&&H.envMap!==null&&(en.envMap.value=xe,en.flipEnvMap.value=xe.isCubeTexture&&xe.isRenderTargetTexture===!1?-1:1),H.isMeshStandardMaterial&&H.envMap===null&&U.environment!==null&&(en.envMapIntensity.value=U.environmentIntensity),jt&&(yt.setValue(w,"toneMappingExposure",b.toneMappingExposure),Ue.needsLights&&su(en,rs),ie&&H.fog===!0&&te.refreshFogUniforms(en,ie),te.refreshMaterialUniforms(en,H,V,Q,p.state.transmissionRenderTarget[y.id]),mr.upload(w,Ua(Ue),en,Ve)),H.isShaderMaterial&&H.uniformsNeedUpdate===!0&&(mr.upload(w,Ua(Ue),en,Ve),H.uniformsNeedUpdate=!1),H.isSpriteMaterial&&yt.setValue(w,"center",N.center),yt.setValue(w,"modelViewMatrix",N.modelViewMatrix),yt.setValue(w,"normalMatrix",N.normalMatrix),yt.setValue(w,"modelMatrix",N.matrixWorld),H.isShaderMaterial||H.isRawShaderMaterial){const Ot=H.uniformsGroups;for(let Gt=0,wr=Ot.length;Gt<wr;Gt++){const ii=Ot[Gt];Xe.update(ii,qt),Xe.bind(ii,qt)}}return qt}function su(y,U){y.ambientLightColor.needsUpdate=U,y.lightProbe.needsUpdate=U,y.directionalLights.needsUpdate=U,y.directionalLightShadows.needsUpdate=U,y.pointLights.needsUpdate=U,y.pointLightShadows.needsUpdate=U,y.spotLights.needsUpdate=U,y.spotLightShadows.needsUpdate=U,y.rectAreaLights.needsUpdate=U,y.hemisphereLights.needsUpdate=U}function ru(y){return y.isMeshLambertMaterial||y.isMeshToonMaterial||y.isMeshPhongMaterial||y.isMeshStandardMaterial||y.isShadowMaterial||y.isShaderMaterial&&y.lights===!0}this.getActiveCubeFace=function(){return P},this.getActiveMipmapLevel=function(){return I},this.getRenderTarget=function(){return F},this.setRenderTargetTextures=function(y,U,z){const H=ye.get(y);H.__autoAllocateDepthBuffer=y.resolveDepthBuffer===!1,H.__autoAllocateDepthBuffer===!1&&(H.__useRenderToTexture=!1),ye.get(y.texture).__webglTexture=U,ye.get(y.depthTexture).__webglTexture=H.__autoAllocateDepthBuffer?void 0:z,H.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(y,U){const z=ye.get(y);z.__webglFramebuffer=U,z.__useDefaultFramebuffer=U===void 0};const ou=w.createFramebuffer();this.setRenderTarget=function(y,U=0,z=0){F=y,P=U,I=z;let H=!0,N=null,ie=!1,me=!1;if(y){const xe=ye.get(y);if(xe.__useDefaultFramebuffer!==void 0)Ee.bindFramebuffer(w.FRAMEBUFFER,null),H=!1;else if(xe.__webglFramebuffer===void 0)Ve.setupRenderTarget(y);else if(xe.__hasExternalTextures)Ve.rebindTextures(y,ye.get(y.texture).__webglTexture,ye.get(y.depthTexture).__webglTexture);else if(y.depthBuffer){const Pe=y.depthTexture;if(xe.__boundDepthTexture!==Pe){if(Pe!==null&&ye.has(Pe)&&(y.width!==Pe.image.width||y.height!==Pe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Ve.setupDepthRenderbuffer(y)}}const Ne=y.texture;(Ne.isData3DTexture||Ne.isDataArrayTexture||Ne.isCompressedArrayTexture)&&(me=!0);const ke=ye.get(y).__webglFramebuffer;y.isWebGLCubeRenderTarget?(Array.isArray(ke[U])?N=ke[U][z]:N=ke[U],ie=!0):y.samples>0&&Ve.useMultisampledRTT(y)===!1?N=ye.get(y).__webglMultisampledFramebuffer:Array.isArray(ke)?N=ke[z]:N=ke,C.copy(y.viewport),Z.copy(y.scissor),q=y.scissorTest}else C.copy(pe).multiplyScalar(V).floor(),Z.copy(Oe).multiplyScalar(V).floor(),q=st;if(z!==0&&(N=ou),Ee.bindFramebuffer(w.FRAMEBUFFER,N)&&H&&Ee.drawBuffers(y,N),Ee.viewport(C),Ee.scissor(Z),Ee.setScissorTest(q),ie){const xe=ye.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_CUBE_MAP_POSITIVE_X+U,xe.__webglTexture,z)}else if(me){const xe=U;for(let Ne=0;Ne<y.textures.length;Ne++){const ke=ye.get(y.textures[Ne]);w.framebufferTextureLayer(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0+Ne,ke.__webglTexture,z,xe)}}else if(y!==null&&z!==0){const xe=ye.get(y.texture);w.framebufferTexture2D(w.FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,xe.__webglTexture,z)}M=-1},this.readRenderTargetPixels=function(y,U,z,H,N,ie,me,Se=0){if(!(y&&y.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let xe=ye.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe){Ee.bindFramebuffer(w.FRAMEBUFFER,xe);try{const Ne=y.textures[Se],ke=Ne.format,Pe=Ne.type;if(!He.textureFormatReadable(ke)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!He.textureTypeReadable(Pe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}U>=0&&U<=y.width-H&&z>=0&&z<=y.height-N&&(y.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Se),w.readPixels(U,z,H,N,we.convert(ke),we.convert(Pe),ie))}finally{const Ne=F!==null?ye.get(F).__webglFramebuffer:null;Ee.bindFramebuffer(w.FRAMEBUFFER,Ne)}}},this.readRenderTargetPixelsAsync=async function(y,U,z,H,N,ie,me,Se=0){if(!(y&&y.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let xe=ye.get(y).__webglFramebuffer;if(y.isWebGLCubeRenderTarget&&me!==void 0&&(xe=xe[me]),xe)if(U>=0&&U<=y.width-H&&z>=0&&z<=y.height-N){Ee.bindFramebuffer(w.FRAMEBUFFER,xe);const Ne=y.textures[Se],ke=Ne.format,Pe=Ne.type;if(!He.textureFormatReadable(ke))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!He.textureTypeReadable(Pe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");const $e=w.createBuffer();w.bindBuffer(w.PIXEL_PACK_BUFFER,$e),w.bufferData(w.PIXEL_PACK_BUFFER,ie.byteLength,w.STREAM_READ),y.textures.length>1&&w.readBuffer(w.COLOR_ATTACHMENT0+Se),w.readPixels(U,z,H,N,we.convert(ke),we.convert(Pe),0);const dt=F!==null?ye.get(F).__webglFramebuffer:null;Ee.bindFramebuffer(w.FRAMEBUFFER,dt);const St=w.fenceSync(w.SYNC_GPU_COMMANDS_COMPLETE,0);return w.flush(),await Dh(w,St,4),w.bindBuffer(w.PIXEL_PACK_BUFFER,$e),w.getBufferSubData(w.PIXEL_PACK_BUFFER,0,ie),w.deleteBuffer($e),w.deleteSync(St),ie}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(y,U=null,z=0){const H=Math.pow(2,-z),N=Math.floor(y.image.width*H),ie=Math.floor(y.image.height*H),me=U!==null?U.x:0,Se=U!==null?U.y:0;Ve.setTexture2D(y,0),w.copyTexSubImage2D(w.TEXTURE_2D,z,0,0,me,Se,N,ie),Ee.unbindTexture()};const au=w.createFramebuffer(),lu=w.createFramebuffer();this.copyTextureToTexture=function(y,U,z=null,H=null,N=0,ie=null){ie===null&&(N!==0?(Gi("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),ie=N,N=0):ie=0);let me,Se,xe,Ne,ke,Pe,$e,dt,St;const gt=y.isCompressedTexture?y.mipmaps[ie]:y.image;if(z!==null)me=z.max.x-z.min.x,Se=z.max.y-z.min.y,xe=z.isBox3?z.max.z-z.min.z:1,Ne=z.min.x,ke=z.min.y,Pe=z.isBox3?z.min.z:0;else{const tn=Math.pow(2,-N);me=Math.floor(gt.width*tn),Se=Math.floor(gt.height*tn),y.isDataArrayTexture?xe=gt.depth:y.isData3DTexture?xe=Math.floor(gt.depth*tn):xe=1,Ne=0,ke=0,Pe=0}H!==null?($e=H.x,dt=H.y,St=H.z):($e=0,dt=0,St=0);const pt=we.convert(U.format),Ue=we.convert(U.type);let xt;U.isData3DTexture?(Ve.setTexture3D(U,0),xt=w.TEXTURE_3D):U.isDataArrayTexture||U.isCompressedArrayTexture?(Ve.setTexture2DArray(U,0),xt=w.TEXTURE_2D_ARRAY):(Ve.setTexture2D(U,0),xt=w.TEXTURE_2D),w.pixelStorei(w.UNPACK_FLIP_Y_WEBGL,U.flipY),w.pixelStorei(w.UNPACK_PREMULTIPLY_ALPHA_WEBGL,U.premultiplyAlpha),w.pixelStorei(w.UNPACK_ALIGNMENT,U.unpackAlignment);const nt=w.getParameter(w.UNPACK_ROW_LENGTH),qt=w.getParameter(w.UNPACK_IMAGE_HEIGHT),vi=w.getParameter(w.UNPACK_SKIP_PIXELS),jt=w.getParameter(w.UNPACK_SKIP_ROWS),rs=w.getParameter(w.UNPACK_SKIP_IMAGES);w.pixelStorei(w.UNPACK_ROW_LENGTH,gt.width),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,gt.height),w.pixelStorei(w.UNPACK_SKIP_PIXELS,Ne),w.pixelStorei(w.UNPACK_SKIP_ROWS,ke),w.pixelStorei(w.UNPACK_SKIP_IMAGES,Pe);const yt=y.isDataArrayTexture||y.isData3DTexture,en=U.isDataArrayTexture||U.isData3DTexture;if(y.isDepthTexture){const tn=ye.get(y),Ot=ye.get(U),Gt=ye.get(tn.__renderTarget),wr=ye.get(Ot.__renderTarget);Ee.bindFramebuffer(w.READ_FRAMEBUFFER,Gt.__webglFramebuffer),Ee.bindFramebuffer(w.DRAW_FRAMEBUFFER,wr.__webglFramebuffer);for(let ii=0;ii<xe;ii++)yt&&(w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,ye.get(y).__webglTexture,N,Pe+ii),w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,ye.get(U).__webglTexture,ie,St+ii)),w.blitFramebuffer(Ne,ke,me,Se,$e,dt,me,Se,w.DEPTH_BUFFER_BIT,w.NEAREST);Ee.bindFramebuffer(w.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else if(N!==0||y.isRenderTargetTexture||ye.has(y)){const tn=ye.get(y),Ot=ye.get(U);Ee.bindFramebuffer(w.READ_FRAMEBUFFER,au),Ee.bindFramebuffer(w.DRAW_FRAMEBUFFER,lu);for(let Gt=0;Gt<xe;Gt++)yt?w.framebufferTextureLayer(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,tn.__webglTexture,N,Pe+Gt):w.framebufferTexture2D(w.READ_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,tn.__webglTexture,N),en?w.framebufferTextureLayer(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,Ot.__webglTexture,ie,St+Gt):w.framebufferTexture2D(w.DRAW_FRAMEBUFFER,w.COLOR_ATTACHMENT0,w.TEXTURE_2D,Ot.__webglTexture,ie),N!==0?w.blitFramebuffer(Ne,ke,me,Se,$e,dt,me,Se,w.COLOR_BUFFER_BIT,w.NEAREST):en?w.copyTexSubImage3D(xt,ie,$e,dt,St+Gt,Ne,ke,me,Se):w.copyTexSubImage2D(xt,ie,$e,dt,Ne,ke,me,Se);Ee.bindFramebuffer(w.READ_FRAMEBUFFER,null),Ee.bindFramebuffer(w.DRAW_FRAMEBUFFER,null)}else en?y.isDataTexture||y.isData3DTexture?w.texSubImage3D(xt,ie,$e,dt,St,me,Se,xe,pt,Ue,gt.data):U.isCompressedArrayTexture?w.compressedTexSubImage3D(xt,ie,$e,dt,St,me,Se,xe,pt,gt.data):w.texSubImage3D(xt,ie,$e,dt,St,me,Se,xe,pt,Ue,gt):y.isDataTexture?w.texSubImage2D(w.TEXTURE_2D,ie,$e,dt,me,Se,pt,Ue,gt.data):y.isCompressedTexture?w.compressedTexSubImage2D(w.TEXTURE_2D,ie,$e,dt,gt.width,gt.height,pt,gt.data):w.texSubImage2D(w.TEXTURE_2D,ie,$e,dt,me,Se,pt,Ue,gt);w.pixelStorei(w.UNPACK_ROW_LENGTH,nt),w.pixelStorei(w.UNPACK_IMAGE_HEIGHT,qt),w.pixelStorei(w.UNPACK_SKIP_PIXELS,vi),w.pixelStorei(w.UNPACK_SKIP_ROWS,jt),w.pixelStorei(w.UNPACK_SKIP_IMAGES,rs),ie===0&&U.generateMipmaps&&w.generateMipmap(xt),Ee.unbindTexture()},this.copyTextureToTexture3D=function(y,U,z=null,H=null,N=0){return Gi('WebGLRenderer: copyTextureToTexture3D function has been deprecated. Use "copyTextureToTexture" instead.'),this.copyTextureToTexture(y,U,z,H,N)},this.initRenderTarget=function(y){ye.get(y).__webglFramebuffer===void 0&&Ve.setupRenderTarget(y)},this.initTexture=function(y){y.isCubeTexture?Ve.setTextureCube(y,0):y.isData3DTexture?Ve.setTexture3D(y,0):y.isDataArrayTexture||y.isCompressedArrayTexture?Ve.setTexture2DArray(y,0):Ve.setTexture2D(y,0),Ee.unbindTexture()},this.resetState=function(){P=0,I=0,F=null,Ee.reset(),fe.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return xn}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;const t=this.getContext();t.drawingBufferColorSpace=Qe._getDrawingBufferColorSpace(e),t.unpackColorSpace=Qe._getUnpackColorSpace()}}function Ql(s,e){if(e===rh)return console.warn("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Geometry already defined as triangles."),s;if(e===Qo||e===Ec){let t=s.getIndex();if(t===null){const o=[],a=s.getAttribute("position");if(a!==void 0){for(let l=0;l<a.count;l++)o.push(l);s.setIndex(o),t=s.getIndex()}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Undefined position attribute. Processing not possible."),s}const n=t.count-2,i=[];if(e===Qo)for(let o=1;o<=n;o++)i.push(t.getX(0)),i.push(t.getX(o)),i.push(t.getX(o+1));else for(let o=0;o<n;o++)o%2===0?(i.push(t.getX(o)),i.push(t.getX(o+1)),i.push(t.getX(o+2))):(i.push(t.getX(o+2)),i.push(t.getX(o+1)),i.push(t.getX(o)));i.length/3!==n&&console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unable to generate correct amount of triangles.");const r=s.clone();return r.setIndex(i),r.clearGroups(),r}else return console.error("THREE.BufferGeometryUtils.toTrianglesDrawMode(): Unknown draw mode:",e),s}class kv extends is{constructor(e){super(e),this.dracoLoader=null,this.ktx2Loader=null,this.meshoptDecoder=null,this.pluginCallbacks=[],this.register(function(t){return new Gv(t)}),this.register(function(t){return new Wv(t)}),this.register(function(t){return new Qv(t)}),this.register(function(t){return new ex(t)}),this.register(function(t){return new tx(t)}),this.register(function(t){return new qv(t)}),this.register(function(t){return new jv(t)}),this.register(function(t){return new Yv(t)}),this.register(function(t){return new Kv(t)}),this.register(function(t){return new Hv(t)}),this.register(function(t){return new Zv(t)}),this.register(function(t){return new Xv(t)}),this.register(function(t){return new $v(t)}),this.register(function(t){return new Jv(t)}),this.register(function(t){return new Vv(t)}),this.register(function(t){return new nx(t)}),this.register(function(t){return new ix(t)})}load(e,t,n,i){const r=this;let o;if(this.resourcePath!=="")o=this.resourcePath;else if(this.path!==""){const c=ys.extractUrlBase(e);o=ys.resolveURL(c,this.path)}else o=ys.extractUrlBase(e);this.manager.itemStart(e);const a=function(c){i?i(c):console.error(c),r.manager.itemError(e),r.manager.itemEnd(e)},l=new Xc(this.manager);l.setPath(this.path),l.setResponseType("arraybuffer"),l.setRequestHeader(this.requestHeader),l.setWithCredentials(this.withCredentials),l.load(e,function(c){try{r.parse(c,o,function(u){t(u),r.manager.itemEnd(e)},a)}catch(u){a(u)}},n,a)}setDRACOLoader(e){return this.dracoLoader=e,this}setKTX2Loader(e){return this.ktx2Loader=e,this}setMeshoptDecoder(e){return this.meshoptDecoder=e,this}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}parse(e,t,n,i){let r;const o={},a={},l=new TextDecoder;if(typeof e=="string")r=JSON.parse(e);else if(e instanceof ArrayBuffer)if(l.decode(new Uint8Array(e,0,4))===Qc){try{o[Je.KHR_BINARY_GLTF]=new sx(e)}catch(d){i&&i(d);return}r=JSON.parse(o[Je.KHR_BINARY_GLTF].content)}else r=JSON.parse(l.decode(e));else r=e;if(r.asset===void 0||r.asset.version[0]<2){i&&i(new Error("THREE.GLTFLoader: Unsupported asset. glTF versions >=2.0 are supported."));return}const c=new _x(r,{path:t||this.resourcePath||"",crossOrigin:this.crossOrigin,requestHeader:this.requestHeader,manager:this.manager,ktx2Loader:this.ktx2Loader,meshoptDecoder:this.meshoptDecoder});c.fileLoader.setRequestHeader(this.requestHeader);for(let u=0;u<this.pluginCallbacks.length;u++){const d=this.pluginCallbacks[u](c);d.name||console.error("THREE.GLTFLoader: Invalid plugin found: missing name"),a[d.name]=d,o[d.name]=!0}if(r.extensionsUsed)for(let u=0;u<r.extensionsUsed.length;++u){const d=r.extensionsUsed[u],h=r.extensionsRequired||[];switch(d){case Je.KHR_MATERIALS_UNLIT:o[d]=new zv;break;case Je.KHR_DRACO_MESH_COMPRESSION:o[d]=new rx(r,this.dracoLoader);break;case Je.KHR_TEXTURE_TRANSFORM:o[d]=new ox;break;case Je.KHR_MESH_QUANTIZATION:o[d]=new ax;break;default:h.indexOf(d)>=0&&a[d]===void 0&&console.warn('THREE.GLTFLoader: Unknown extension "'+d+'".')}}c.setExtensions(o),c.setPlugins(a),c.parse(n,i)}parseAsync(e,t){const n=this;return new Promise(function(i,r){n.parse(e,t,i,r)})}}function Bv(){let s={};return{get:function(e){return s[e]},add:function(e,t){s[e]=t},remove:function(e){delete s[e]},removeAll:function(){s={}}}}const Je={KHR_BINARY_GLTF:"KHR_binary_glTF",KHR_DRACO_MESH_COMPRESSION:"KHR_draco_mesh_compression",KHR_LIGHTS_PUNCTUAL:"KHR_lights_punctual",KHR_MATERIALS_CLEARCOAT:"KHR_materials_clearcoat",KHR_MATERIALS_DISPERSION:"KHR_materials_dispersion",KHR_MATERIALS_IOR:"KHR_materials_ior",KHR_MATERIALS_SHEEN:"KHR_materials_sheen",KHR_MATERIALS_SPECULAR:"KHR_materials_specular",KHR_MATERIALS_TRANSMISSION:"KHR_materials_transmission",KHR_MATERIALS_IRIDESCENCE:"KHR_materials_iridescence",KHR_MATERIALS_ANISOTROPY:"KHR_materials_anisotropy",KHR_MATERIALS_UNLIT:"KHR_materials_unlit",KHR_MATERIALS_VOLUME:"KHR_materials_volume",KHR_TEXTURE_BASISU:"KHR_texture_basisu",KHR_TEXTURE_TRANSFORM:"KHR_texture_transform",KHR_MESH_QUANTIZATION:"KHR_mesh_quantization",KHR_MATERIALS_EMISSIVE_STRENGTH:"KHR_materials_emissive_strength",EXT_MATERIALS_BUMP:"EXT_materials_bump",EXT_TEXTURE_WEBP:"EXT_texture_webp",EXT_TEXTURE_AVIF:"EXT_texture_avif",EXT_MESHOPT_COMPRESSION:"EXT_meshopt_compression",EXT_MESH_GPU_INSTANCING:"EXT_mesh_gpu_instancing"};class Vv{constructor(e){this.parser=e,this.name=Je.KHR_LIGHTS_PUNCTUAL,this.cache={refs:{},uses:{}}}_markDefs(){const e=this.parser,t=this.parser.json.nodes||[];for(let n=0,i=t.length;n<i;n++){const r=t[n];r.extensions&&r.extensions[this.name]&&r.extensions[this.name].light!==void 0&&e._addNodeRef(this.cache,r.extensions[this.name].light)}}_loadLight(e){const t=this.parser,n="light:"+e;let i=t.cache.get(n);if(i)return i;const r=t.json,l=((r.extensions&&r.extensions[this.name]||{}).lights||[])[e];let c;const u=new ze(16777215);l.color!==void 0&&u.setRGB(l.color[0],l.color[1],l.color[2],Ht);const d=l.range!==void 0?l.range:0;switch(l.type){case"directional":c=new qc(u),c.target.position.set(0,0,-1),c.add(c.target);break;case"point":c=new Nf(u),c.distance=d;break;case"spot":c=new Df(u),c.distance=d,l.spot=l.spot||{},l.spot.innerConeAngle=l.spot.innerConeAngle!==void 0?l.spot.innerConeAngle:0,l.spot.outerConeAngle=l.spot.outerConeAngle!==void 0?l.spot.outerConeAngle:Math.PI/4,c.angle=l.spot.outerConeAngle,c.penumbra=1-l.spot.innerConeAngle/l.spot.outerConeAngle,c.target.position.set(0,0,-1),c.add(c.target);break;default:throw new Error("THREE.GLTFLoader: Unexpected light type: "+l.type)}return c.position.set(0,0,0),Un(c,l),l.intensity!==void 0&&(c.intensity=l.intensity),c.name=t.createUniqueName(l.name||"light_"+e),i=Promise.resolve(c),t.cache.add(n,i),i}getDependency(e,t){if(e==="light")return this._loadLight(t)}createNodeAttachment(e){const t=this,n=this.parser,r=n.json.nodes[e],a=(r.extensions&&r.extensions[this.name]||{}).light;return a===void 0?null:this._loadLight(a).then(function(l){return n._getNodeRef(t.cache,a,l)})}}class zv{constructor(){this.name=Je.KHR_MATERIALS_UNLIT}getMaterialType(){return pi}extendParams(e,t,n){const i=[];e.color=new ze(1,1,1),e.opacity=1;const r=t.pbrMetallicRoughness;if(r){if(Array.isArray(r.baseColorFactor)){const o=r.baseColorFactor;e.color.setRGB(o[0],o[1],o[2],Ht),e.opacity=o[3]}r.baseColorTexture!==void 0&&i.push(n.assignTexture(e,"map",r.baseColorTexture,Lt))}return Promise.all(i)}}class Hv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_EMISSIVE_STRENGTH}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name].emissiveStrength;return r!==void 0&&(t.emissiveIntensity=r),Promise.resolve()}}class Gv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_CLEARCOAT}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];if(o.clearcoatFactor!==void 0&&(t.clearcoat=o.clearcoatFactor),o.clearcoatTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatMap",o.clearcoatTexture)),o.clearcoatRoughnessFactor!==void 0&&(t.clearcoatRoughness=o.clearcoatRoughnessFactor),o.clearcoatRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"clearcoatRoughnessMap",o.clearcoatRoughnessTexture)),o.clearcoatNormalTexture!==void 0&&(r.push(n.assignTexture(t,"clearcoatNormalMap",o.clearcoatNormalTexture)),o.clearcoatNormalTexture.scale!==void 0)){const a=o.clearcoatNormalTexture.scale;t.clearcoatNormalScale=new Be(a,a)}return Promise.all(r)}}class Wv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_DISPERSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.dispersion=r.dispersion!==void 0?r.dispersion:0,Promise.resolve()}}class Xv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IRIDESCENCE}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.iridescenceFactor!==void 0&&(t.iridescence=o.iridescenceFactor),o.iridescenceTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceMap",o.iridescenceTexture)),o.iridescenceIor!==void 0&&(t.iridescenceIOR=o.iridescenceIor),t.iridescenceThicknessRange===void 0&&(t.iridescenceThicknessRange=[100,400]),o.iridescenceThicknessMinimum!==void 0&&(t.iridescenceThicknessRange[0]=o.iridescenceThicknessMinimum),o.iridescenceThicknessMaximum!==void 0&&(t.iridescenceThicknessRange[1]=o.iridescenceThicknessMaximum),o.iridescenceThicknessTexture!==void 0&&r.push(n.assignTexture(t,"iridescenceThicknessMap",o.iridescenceThicknessTexture)),Promise.all(r)}}class qv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SHEEN}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[];t.sheenColor=new ze(0,0,0),t.sheenRoughness=0,t.sheen=1;const o=i.extensions[this.name];if(o.sheenColorFactor!==void 0){const a=o.sheenColorFactor;t.sheenColor.setRGB(a[0],a[1],a[2],Ht)}return o.sheenRoughnessFactor!==void 0&&(t.sheenRoughness=o.sheenRoughnessFactor),o.sheenColorTexture!==void 0&&r.push(n.assignTexture(t,"sheenColorMap",o.sheenColorTexture,Lt)),o.sheenRoughnessTexture!==void 0&&r.push(n.assignTexture(t,"sheenRoughnessMap",o.sheenRoughnessTexture)),Promise.all(r)}}class jv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_TRANSMISSION}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.transmissionFactor!==void 0&&(t.transmission=o.transmissionFactor),o.transmissionTexture!==void 0&&r.push(n.assignTexture(t,"transmissionMap",o.transmissionTexture)),Promise.all(r)}}class Yv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_VOLUME}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.thickness=o.thicknessFactor!==void 0?o.thicknessFactor:0,o.thicknessTexture!==void 0&&r.push(n.assignTexture(t,"thicknessMap",o.thicknessTexture)),t.attenuationDistance=o.attenuationDistance||1/0;const a=o.attenuationColor||[1,1,1];return t.attenuationColor=new ze().setRGB(a[0],a[1],a[2],Ht),Promise.all(r)}}class Kv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_IOR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const i=this.parser.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=i.extensions[this.name];return t.ior=r.ior!==void 0?r.ior:1.5,Promise.resolve()}}class Zv{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_SPECULAR}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];t.specularIntensity=o.specularFactor!==void 0?o.specularFactor:1,o.specularTexture!==void 0&&r.push(n.assignTexture(t,"specularIntensityMap",o.specularTexture));const a=o.specularColorFactor||[1,1,1];return t.specularColor=new ze().setRGB(a[0],a[1],a[2],Ht),o.specularColorTexture!==void 0&&r.push(n.assignTexture(t,"specularColorMap",o.specularColorTexture,Lt)),Promise.all(r)}}class Jv{constructor(e){this.parser=e,this.name=Je.EXT_MATERIALS_BUMP}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return t.bumpScale=o.bumpFactor!==void 0?o.bumpFactor:1,o.bumpTexture!==void 0&&r.push(n.assignTexture(t,"bumpMap",o.bumpTexture)),Promise.all(r)}}class $v{constructor(e){this.parser=e,this.name=Je.KHR_MATERIALS_ANISOTROPY}getMaterialType(e){const n=this.parser.json.materials[e];return!n.extensions||!n.extensions[this.name]?null:En}extendMaterialParams(e,t){const n=this.parser,i=n.json.materials[e];if(!i.extensions||!i.extensions[this.name])return Promise.resolve();const r=[],o=i.extensions[this.name];return o.anisotropyStrength!==void 0&&(t.anisotropy=o.anisotropyStrength),o.anisotropyRotation!==void 0&&(t.anisotropyRotation=o.anisotropyRotation),o.anisotropyTexture!==void 0&&r.push(n.assignTexture(t,"anisotropyMap",o.anisotropyTexture)),Promise.all(r)}}class Qv{constructor(e){this.parser=e,this.name=Je.KHR_TEXTURE_BASISU}loadTexture(e){const t=this.parser,n=t.json,i=n.textures[e];if(!i.extensions||!i.extensions[this.name])return null;const r=i.extensions[this.name],o=t.options.ktx2Loader;if(!o){if(n.extensionsRequired&&n.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setKTX2Loader must be called before loading KTX2 textures");return null}return t.loadTextureImage(e,r.source,o)}}class ex{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_WEBP}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class tx{constructor(e){this.parser=e,this.name=Je.EXT_TEXTURE_AVIF}loadTexture(e){const t=this.name,n=this.parser,i=n.json,r=i.textures[e];if(!r.extensions||!r.extensions[t])return null;const o=r.extensions[t],a=i.images[o.source];let l=n.textureLoader;if(a.uri){const c=n.options.manager.getHandler(a.uri);c!==null&&(l=c)}return n.loadTextureImage(e,o.source,l)}}class nx{constructor(e){this.name=Je.EXT_MESHOPT_COMPRESSION,this.parser=e}loadBufferView(e){const t=this.parser.json,n=t.bufferViews[e];if(n.extensions&&n.extensions[this.name]){const i=n.extensions[this.name],r=this.parser.getDependency("buffer",i.buffer),o=this.parser.options.meshoptDecoder;if(!o||!o.supported){if(t.extensionsRequired&&t.extensionsRequired.indexOf(this.name)>=0)throw new Error("THREE.GLTFLoader: setMeshoptDecoder must be called before loading compressed files");return null}return r.then(function(a){const l=i.byteOffset||0,c=i.byteLength||0,u=i.count,d=i.byteStride,h=new Uint8Array(a,l,c);return o.decodeGltfBufferAsync?o.decodeGltfBufferAsync(u,d,h,i.mode,i.filter).then(function(m){return m.buffer}):o.ready.then(function(){const m=new ArrayBuffer(u*d);return o.decodeGltfBuffer(new Uint8Array(m),u,d,h,i.mode,i.filter),m})})}else return null}}class ix{constructor(e){this.name=Je.EXT_MESH_GPU_INSTANCING,this.parser=e}createNodeMesh(e){const t=this.parser.json,n=t.nodes[e];if(!n.extensions||!n.extensions[this.name]||n.mesh===void 0)return null;const i=t.meshes[n.mesh];for(const c of i.primitives)if(c.mode!==sn.TRIANGLES&&c.mode!==sn.TRIANGLE_STRIP&&c.mode!==sn.TRIANGLE_FAN&&c.mode!==void 0)return null;const o=n.extensions[this.name].attributes,a=[],l={};for(const c in o)a.push(this.parser.getDependency("accessor",o[c]).then(u=>(l[c]=u,l[c])));return a.length<1?null:(a.push(this.parser.createNodeMesh(e)),Promise.all(a).then(c=>{const u=c.pop(),d=u.isGroup?u.children:[u],h=c[0].count,m=[];for(const _ of d){const v=new Ye,g=new D,p=new Qt,A=new D(1,1,1),E=new df(_.geometry,_.material,h);for(let b=0;b<h;b++)l.TRANSLATION&&g.fromBufferAttribute(l.TRANSLATION,b),l.ROTATION&&p.fromBufferAttribute(l.ROTATION,b),l.SCALE&&A.fromBufferAttribute(l.SCALE,b),E.setMatrixAt(b,v.compose(g,p,A));for(const b in l)if(b==="_COLOR_0"){const R=l[b];E.instanceColor=new ta(R.array,R.itemSize,R.normalized)}else b!=="TRANSLATION"&&b!=="ROTATION"&&b!=="SCALE"&&_.geometry.setAttribute(b,l[b]);bt.prototype.copy.call(E,_),this.parser.assignFinalMaterial(E),m.push(E)}return u.isGroup?(u.clear(),u.add(...m),u):m[0]}))}}const Qc="glTF",ps=12,ec={JSON:1313821514,BIN:5130562};class sx{constructor(e){this.name=Je.KHR_BINARY_GLTF,this.content=null,this.body=null;const t=new DataView(e,0,ps),n=new TextDecoder;if(this.header={magic:n.decode(new Uint8Array(e.slice(0,4))),version:t.getUint32(4,!0),length:t.getUint32(8,!0)},this.header.magic!==Qc)throw new Error("THREE.GLTFLoader: Unsupported glTF-Binary header.");if(this.header.version<2)throw new Error("THREE.GLTFLoader: Legacy binary file detected.");const i=this.header.length-ps,r=new DataView(e,ps);let o=0;for(;o<i;){const a=r.getUint32(o,!0);o+=4;const l=r.getUint32(o,!0);if(o+=4,l===ec.JSON){const c=new Uint8Array(e,ps+o,a);this.content=n.decode(c)}else if(l===ec.BIN){const c=ps+o;this.body=e.slice(c,c+a)}o+=a}if(this.content===null)throw new Error("THREE.GLTFLoader: JSON content not found.")}}class rx{constructor(e,t){if(!t)throw new Error("THREE.GLTFLoader: No DRACOLoader instance provided.");this.name=Je.KHR_DRACO_MESH_COMPRESSION,this.json=e,this.dracoLoader=t,this.dracoLoader.preload()}decodePrimitive(e,t){const n=this.json,i=this.dracoLoader,r=e.extensions[this.name].bufferView,o=e.extensions[this.name].attributes,a={},l={},c={};for(const u in o){const d=ra[u]||u.toLowerCase();a[d]=o[u]}for(const u in e.attributes){const d=ra[u]||u.toLowerCase();if(o[u]!==void 0){const h=n.accessors[e.attributes[u]],m=Xi[h.componentType];c[d]=m.name,l[d]=h.normalized===!0}}return t.getDependency("bufferView",r).then(function(u){return new Promise(function(d,h){i.decodeDracoFile(u,function(m){for(const _ in m.attributes){const v=m.attributes[_],g=l[_];g!==void 0&&(v.normalized=g)}d(m)},a,c,Ht,h)})})}}class ox{constructor(){this.name=Je.KHR_TEXTURE_TRANSFORM}extendTexture(e,t){return(t.texCoord===void 0||t.texCoord===e.channel)&&t.offset===void 0&&t.rotation===void 0&&t.scale===void 0||(e=e.clone(),t.texCoord!==void 0&&(e.channel=t.texCoord),t.offset!==void 0&&e.offset.fromArray(t.offset),t.rotation!==void 0&&(e.rotation=t.rotation),t.scale!==void 0&&e.repeat.fromArray(t.scale),e.needsUpdate=!0),e}}class ax{constructor(){this.name=Je.KHR_MESH_QUANTIZATION}}class eu extends Is{constructor(e,t,n,i){super(e,t,n,i)}copySampleValue_(e){const t=this.resultBuffer,n=this.sampleValues,i=this.valueSize,r=e*i*3+i;for(let o=0;o!==i;o++)t[o]=n[r+o];return t}interpolate_(e,t,n,i){const r=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=a*2,c=a*3,u=i-t,d=(n-t)/u,h=d*d,m=h*d,_=e*c,v=_-c,g=-2*m+3*h,p=m-h,A=1-g,E=p-h+d;for(let b=0;b!==a;b++){const R=o[v+b+a],P=o[v+b+l]*u,I=o[_+b+a],F=o[_+b]*u;r[b]=A*R+E*P+g*I+p*F}return r}}const lx=new Qt;class cx extends eu{interpolate_(e,t,n,i){const r=super.interpolate_(e,t,n,i);return lx.fromArray(r).normalize().toArray(r),r}}const sn={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6},Xi={5120:Int8Array,5121:Uint8Array,5122:Int16Array,5123:Uint16Array,5125:Uint32Array,5126:Float32Array},tc={9728:Vt,9729:Zt,9984:_c,9985:cr,9986:ms,9987:Nn},nc={33071:Jn,33648:gr,10497:Ki},uo={SCALAR:1,VEC2:2,VEC3:3,VEC4:4,MAT2:4,MAT3:9,MAT4:16},ra={POSITION:"position",NORMAL:"normal",TANGENT:"tangent",TEXCOORD_0:"uv",TEXCOORD_1:"uv1",TEXCOORD_2:"uv2",TEXCOORD_3:"uv3",COLOR_0:"color",WEIGHTS_0:"skinWeight",JOINTS_0:"skinIndex"},jn={scale:"scale",translation:"position",rotation:"quaternion",weights:"morphTargetInfluences"},ux={CUBICSPLINE:void 0,LINEAR:As,STEP:Es},ho={OPAQUE:"OPAQUE",MASK:"MASK",BLEND:"BLEND"};function dx(s){return s.DefaultMaterial===void 0&&(s.DefaultMaterial=new Ma({color:16777215,emissive:0,metalness:1,roughness:1,transparent:!1,depthTest:!0,side:Bn})),s.DefaultMaterial}function ui(s,e,t){for(const n in t.extensions)s[n]===void 0&&(e.userData.gltfExtensions=e.userData.gltfExtensions||{},e.userData.gltfExtensions[n]=t.extensions[n])}function Un(s,e){e.extras!==void 0&&(typeof e.extras=="object"?Object.assign(s.userData,e.extras):console.warn("THREE.GLTFLoader: Ignoring primitive type .extras, "+e.extras))}function hx(s,e,t){let n=!1,i=!1,r=!1;for(let c=0,u=e.length;c<u;c++){const d=e[c];if(d.POSITION!==void 0&&(n=!0),d.NORMAL!==void 0&&(i=!0),d.COLOR_0!==void 0&&(r=!0),n&&i&&r)break}if(!n&&!i&&!r)return Promise.resolve(s);const o=[],a=[],l=[];for(let c=0,u=e.length;c<u;c++){const d=e[c];if(n){const h=d.POSITION!==void 0?t.getDependency("accessor",d.POSITION):s.attributes.position;o.push(h)}if(i){const h=d.NORMAL!==void 0?t.getDependency("accessor",d.NORMAL):s.attributes.normal;a.push(h)}if(r){const h=d.COLOR_0!==void 0?t.getDependency("accessor",d.COLOR_0):s.attributes.color;l.push(h)}}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l)]).then(function(c){const u=c[0],d=c[1],h=c[2];return n&&(s.morphAttributes.position=u),i&&(s.morphAttributes.normal=d),r&&(s.morphAttributes.color=h),s.morphTargetsRelative=!0,s})}function fx(s,e){if(s.updateMorphTargets(),e.weights!==void 0)for(let t=0,n=e.weights.length;t<n;t++)s.morphTargetInfluences[t]=e.weights[t];if(e.extras&&Array.isArray(e.extras.targetNames)){const t=e.extras.targetNames;if(s.morphTargetInfluences.length===t.length){s.morphTargetDictionary={};for(let n=0,i=t.length;n<i;n++)s.morphTargetDictionary[t[n]]=n}else console.warn("THREE.GLTFLoader: Invalid extras.targetNames length. Ignoring names.")}}function px(s){let e;const t=s.extensions&&s.extensions[Je.KHR_DRACO_MESH_COMPRESSION];if(t?e="draco:"+t.bufferView+":"+t.indices+":"+fo(t.attributes):e=s.indices+":"+fo(s.attributes)+":"+s.mode,s.targets!==void 0)for(let n=0,i=s.targets.length;n<i;n++)e+=":"+fo(s.targets[n]);return e}function fo(s){let e="";const t=Object.keys(s).sort();for(let n=0,i=t.length;n<i;n++)e+=t[n]+":"+s[t[n]]+";";return e}function oa(s){switch(s){case Int8Array:return 1/127;case Uint8Array:return 1/255;case Int16Array:return 1/32767;case Uint16Array:return 1/65535;default:throw new Error("THREE.GLTFLoader: Unsupported normalized accessor component type.")}}function mx(s){return s.search(/\.jpe?g($|\?)/i)>0||s.search(/^data\:image\/jpeg/)===0?"image/jpeg":s.search(/\.webp($|\?)/i)>0||s.search(/^data\:image\/webp/)===0?"image/webp":s.search(/\.ktx2($|\?)/i)>0||s.search(/^data\:image\/ktx2/)===0?"image/ktx2":"image/png"}const gx=new Ye;class _x{constructor(e={},t={}){this.json=e,this.extensions={},this.plugins={},this.options=t,this.cache=new Bv,this.associations=new Map,this.primitiveCache={},this.nodeCache={},this.meshCache={refs:{},uses:{}},this.cameraCache={refs:{},uses:{}},this.lightCache={refs:{},uses:{}},this.sourceCache={},this.textureCache={},this.nodeNamesUsed={};let n=!1,i=-1,r=!1,o=-1;if(typeof navigator<"u"){const a=navigator.userAgent;n=/^((?!chrome|android).)*safari/i.test(a)===!0;const l=a.match(/Version\/(\d+)/);i=n&&l?parseInt(l[1],10):-1,r=a.indexOf("Firefox")>-1,o=r?a.match(/Firefox\/([0-9]+)\./)[1]:-1}typeof createImageBitmap>"u"||n&&i<17||r&&o<98?this.textureLoader=new If(this.options.manager):this.textureLoader=new kf(this.options.manager),this.textureLoader.setCrossOrigin(this.options.crossOrigin),this.textureLoader.setRequestHeader(this.options.requestHeader),this.fileLoader=new Xc(this.options.manager),this.fileLoader.setResponseType("arraybuffer"),this.options.crossOrigin==="use-credentials"&&this.fileLoader.setWithCredentials(!0)}setExtensions(e){this.extensions=e}setPlugins(e){this.plugins=e}parse(e,t){const n=this,i=this.json,r=this.extensions;this.cache.removeAll(),this.nodeCache={},this._invokeAll(function(o){return o._markDefs&&o._markDefs()}),Promise.all(this._invokeAll(function(o){return o.beforeRoot&&o.beforeRoot()})).then(function(){return Promise.all([n.getDependencies("scene"),n.getDependencies("animation"),n.getDependencies("camera")])}).then(function(o){const a={scene:o[0][i.scene||0],scenes:o[0],animations:o[1],cameras:o[2],asset:i.asset,parser:n,userData:{}};return ui(r,a,i),Un(a,i),Promise.all(n._invokeAll(function(l){return l.afterRoot&&l.afterRoot(a)})).then(function(){for(const l of a.scenes)l.updateMatrixWorld();e(a)})}).catch(t)}_markDefs(){const e=this.json.nodes||[],t=this.json.skins||[],n=this.json.meshes||[];for(let i=0,r=t.length;i<r;i++){const o=t[i].joints;for(let a=0,l=o.length;a<l;a++)e[o[a]].isBone=!0}for(let i=0,r=e.length;i<r;i++){const o=e[i];o.mesh!==void 0&&(this._addNodeRef(this.meshCache,o.mesh),o.skin!==void 0&&(n[o.mesh].isSkinnedMesh=!0)),o.camera!==void 0&&this._addNodeRef(this.cameraCache,o.camera)}}_addNodeRef(e,t){t!==void 0&&(e.refs[t]===void 0&&(e.refs[t]=e.uses[t]=0),e.refs[t]++)}_getNodeRef(e,t,n){if(e.refs[t]<=1)return n;const i=n.clone(),r=(o,a)=>{const l=this.associations.get(o);l!=null&&this.associations.set(a,l);for(const[c,u]of o.children.entries())r(u,a.children[c])};return r(n,i),i.name+="_instance_"+e.uses[t]++,i}_invokeOne(e){const t=Object.values(this.plugins);t.push(this);for(let n=0;n<t.length;n++){const i=e(t[n]);if(i)return i}return null}_invokeAll(e){const t=Object.values(this.plugins);t.unshift(this);const n=[];for(let i=0;i<t.length;i++){const r=e(t[i]);r&&n.push(r)}return n}getDependency(e,t){const n=e+":"+t;let i=this.cache.get(n);if(!i){switch(e){case"scene":i=this.loadScene(t);break;case"node":i=this._invokeOne(function(r){return r.loadNode&&r.loadNode(t)});break;case"mesh":i=this._invokeOne(function(r){return r.loadMesh&&r.loadMesh(t)});break;case"accessor":i=this.loadAccessor(t);break;case"bufferView":i=this._invokeOne(function(r){return r.loadBufferView&&r.loadBufferView(t)});break;case"buffer":i=this.loadBuffer(t);break;case"material":i=this._invokeOne(function(r){return r.loadMaterial&&r.loadMaterial(t)});break;case"texture":i=this._invokeOne(function(r){return r.loadTexture&&r.loadTexture(t)});break;case"skin":i=this.loadSkin(t);break;case"animation":i=this._invokeOne(function(r){return r.loadAnimation&&r.loadAnimation(t)});break;case"camera":i=this.loadCamera(t);break;default:if(i=this._invokeOne(function(r){return r!=this&&r.getDependency&&r.getDependency(e,t)}),!i)throw new Error("Unknown type: "+e);break}this.cache.add(n,i)}return i}getDependencies(e){let t=this.cache.get(e);if(!t){const n=this,i=this.json[e+(e==="mesh"?"es":"s")]||[];t=Promise.all(i.map(function(r,o){return n.getDependency(e,o)})),this.cache.add(e,t)}return t}loadBuffer(e){const t=this.json.buffers[e],n=this.fileLoader;if(t.type&&t.type!=="arraybuffer")throw new Error("THREE.GLTFLoader: "+t.type+" buffer type is not supported.");if(t.uri===void 0&&e===0)return Promise.resolve(this.extensions[Je.KHR_BINARY_GLTF].body);const i=this.options;return new Promise(function(r,o){n.load(ys.resolveURL(t.uri,i.path),r,void 0,function(){o(new Error('THREE.GLTFLoader: Failed to load buffer "'+t.uri+'".'))})})}loadBufferView(e){const t=this.json.bufferViews[e];return this.getDependency("buffer",t.buffer).then(function(n){const i=t.byteLength||0,r=t.byteOffset||0;return n.slice(r,r+i)})}loadAccessor(e){const t=this,n=this.json,i=this.json.accessors[e];if(i.bufferView===void 0&&i.sparse===void 0){const o=uo[i.type],a=Xi[i.componentType],l=i.normalized===!0,c=new a(i.count*o);return Promise.resolve(new zt(c,o,l))}const r=[];return i.bufferView!==void 0?r.push(this.getDependency("bufferView",i.bufferView)):r.push(null),i.sparse!==void 0&&(r.push(this.getDependency("bufferView",i.sparse.indices.bufferView)),r.push(this.getDependency("bufferView",i.sparse.values.bufferView))),Promise.all(r).then(function(o){const a=o[0],l=uo[i.type],c=Xi[i.componentType],u=c.BYTES_PER_ELEMENT,d=u*l,h=i.byteOffset||0,m=i.bufferView!==void 0?n.bufferViews[i.bufferView].byteStride:void 0,_=i.normalized===!0;let v,g;if(m&&m!==d){const p=Math.floor(h/m),A="InterleavedBuffer:"+i.bufferView+":"+i.componentType+":"+p+":"+i.count;let E=t.cache.get(A);E||(v=new c(a,p*m,i.count*m/u),E=new of(v,m/u),t.cache.add(A,E)),g=new xa(E,l,h%m/u,_)}else a===null?v=new c(i.count*l):v=new c(a,h,i.count*l),g=new zt(v,l,_);if(i.sparse!==void 0){const p=uo.SCALAR,A=Xi[i.sparse.indices.componentType],E=i.sparse.indices.byteOffset||0,b=i.sparse.values.byteOffset||0,R=new A(o[1],E,i.sparse.count*p),P=new c(o[2],b,i.sparse.count*l);a!==null&&(g=new zt(g.array.slice(),g.itemSize,g.normalized)),g.normalized=!1;for(let I=0,F=R.length;I<F;I++){const M=R[I];if(g.setX(M,P[I*l]),l>=2&&g.setY(M,P[I*l+1]),l>=3&&g.setZ(M,P[I*l+2]),l>=4&&g.setW(M,P[I*l+3]),l>=5)throw new Error("THREE.GLTFLoader: Unsupported itemSize in sparse BufferAttribute.")}g.normalized=_}return g})}loadTexture(e){const t=this.json,n=this.options,r=t.textures[e].source,o=t.images[r];let a=this.textureLoader;if(o.uri){const l=n.manager.getHandler(o.uri);l!==null&&(a=l)}return this.loadTextureImage(e,r,a)}loadTextureImage(e,t,n){const i=this,r=this.json,o=r.textures[e],a=r.images[t],l=(a.uri||a.bufferView)+":"+o.sampler;if(this.textureCache[l])return this.textureCache[l];const c=this.loadImageSource(t,n).then(function(u){u.flipY=!1,u.name=o.name||a.name||"",u.name===""&&typeof a.uri=="string"&&a.uri.startsWith("data:image/")===!1&&(u.name=a.uri);const h=(r.samplers||{})[o.sampler]||{};return u.magFilter=tc[h.magFilter]||Zt,u.minFilter=tc[h.minFilter]||Nn,u.wrapS=nc[h.wrapS]||Ki,u.wrapT=nc[h.wrapT]||Ki,u.generateMipmaps=!u.isCompressedTexture&&u.minFilter!==Vt&&u.minFilter!==Zt,i.associations.set(u,{textures:e}),u}).catch(function(){return null});return this.textureCache[l]=c,c}loadImageSource(e,t){const n=this,i=this.json,r=this.options;if(this.sourceCache[e]!==void 0)return this.sourceCache[e].then(d=>d.clone());const o=i.images[e],a=self.URL||self.webkitURL;let l=o.uri||"",c=!1;if(o.bufferView!==void 0)l=n.getDependency("bufferView",o.bufferView).then(function(d){c=!0;const h=new Blob([d],{type:o.mimeType});return l=a.createObjectURL(h),l});else if(o.uri===void 0)throw new Error("THREE.GLTFLoader: Image "+e+" is missing URI and bufferView");const u=Promise.resolve(l).then(function(d){return new Promise(function(h,m){let _=h;t.isImageBitmapLoader===!0&&(_=function(v){const g=new Dt(v);g.needsUpdate=!0,h(g)}),t.load(ys.resolveURL(d,r.path),_,void 0,m)})}).then(function(d){return c===!0&&a.revokeObjectURL(l),Un(d,o),d.userData.mimeType=o.mimeType||mx(o.uri),d}).catch(function(d){throw console.error("THREE.GLTFLoader: Couldn't load texture",l),d});return this.sourceCache[e]=u,u}assignTexture(e,t,n,i){const r=this;return this.getDependency("texture",n.index).then(function(o){if(!o)return null;if(n.texCoord!==void 0&&n.texCoord>0&&(o=o.clone(),o.channel=n.texCoord),r.extensions[Je.KHR_TEXTURE_TRANSFORM]){const a=n.extensions!==void 0?n.extensions[Je.KHR_TEXTURE_TRANSFORM]:void 0;if(a){const l=r.associations.get(o);o=r.extensions[Je.KHR_TEXTURE_TRANSFORM].extendTexture(o,a),r.associations.set(o,l)}}return i!==void 0&&(o.colorSpace=i),e[t]=o,o})}assignFinalMaterial(e){const t=e.geometry;let n=e.material;const i=t.attributes.tangent===void 0,r=t.attributes.color!==void 0,o=t.attributes.normal===void 0;if(e.isPoints){const a="PointsMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Vc,yn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,l.sizeAttenuation=!1,this.cache.add(a,l)),n=l}else if(e.isLine){const a="LineBasicMaterial:"+n.uuid;let l=this.cache.get(a);l||(l=new Bc,yn.prototype.copy.call(l,n),l.color.copy(n.color),l.map=n.map,this.cache.add(a,l)),n=l}if(i||r||o){let a="ClonedMaterial:"+n.uuid+":";i&&(a+="derivative-tangents:"),r&&(a+="vertex-colors:"),o&&(a+="flat-shading:");let l=this.cache.get(a);l||(l=n.clone(),r&&(l.vertexColors=!0),o&&(l.flatShading=!0),i&&(l.normalScale&&(l.normalScale.y*=-1),l.clearcoatNormalScale&&(l.clearcoatNormalScale.y*=-1)),this.cache.add(a,l),this.associations.set(l,this.associations.get(n))),n=l}e.material=n}getMaterialType(){return Ma}loadMaterial(e){const t=this,n=this.json,i=this.extensions,r=n.materials[e];let o;const a={},l=r.extensions||{},c=[];if(l[Je.KHR_MATERIALS_UNLIT]){const d=i[Je.KHR_MATERIALS_UNLIT];o=d.getMaterialType(),c.push(d.extendParams(a,r,t))}else{const d=r.pbrMetallicRoughness||{};if(a.color=new ze(1,1,1),a.opacity=1,Array.isArray(d.baseColorFactor)){const h=d.baseColorFactor;a.color.setRGB(h[0],h[1],h[2],Ht),a.opacity=h[3]}d.baseColorTexture!==void 0&&c.push(t.assignTexture(a,"map",d.baseColorTexture,Lt)),a.metalness=d.metallicFactor!==void 0?d.metallicFactor:1,a.roughness=d.roughnessFactor!==void 0?d.roughnessFactor:1,d.metallicRoughnessTexture!==void 0&&(c.push(t.assignTexture(a,"metalnessMap",d.metallicRoughnessTexture)),c.push(t.assignTexture(a,"roughnessMap",d.metallicRoughnessTexture))),o=this._invokeOne(function(h){return h.getMaterialType&&h.getMaterialType(e)}),c.push(Promise.all(this._invokeAll(function(h){return h.extendMaterialParams&&h.extendMaterialParams(e,a)})))}r.doubleSided===!0&&(a.side=vn);const u=r.alphaMode||ho.OPAQUE;if(u===ho.BLEND?(a.transparent=!0,a.depthWrite=!1):(a.transparent=!1,u===ho.MASK&&(a.alphaTest=r.alphaCutoff!==void 0?r.alphaCutoff:.5)),r.normalTexture!==void 0&&o!==pi&&(c.push(t.assignTexture(a,"normalMap",r.normalTexture)),a.normalScale=new Be(1,1),r.normalTexture.scale!==void 0)){const d=r.normalTexture.scale;a.normalScale.set(d,d)}if(r.occlusionTexture!==void 0&&o!==pi&&(c.push(t.assignTexture(a,"aoMap",r.occlusionTexture)),r.occlusionTexture.strength!==void 0&&(a.aoMapIntensity=r.occlusionTexture.strength)),r.emissiveFactor!==void 0&&o!==pi){const d=r.emissiveFactor;a.emissive=new ze().setRGB(d[0],d[1],d[2],Ht)}return r.emissiveTexture!==void 0&&o!==pi&&c.push(t.assignTexture(a,"emissiveMap",r.emissiveTexture,Lt)),Promise.all(c).then(function(){const d=new o(a);return r.name&&(d.name=r.name),Un(d,r),t.associations.set(d,{materials:e}),r.extensions&&ui(i,d,r),d})}createUniqueName(e){const t=lt.sanitizeNodeName(e||"");return t in this.nodeNamesUsed?t+"_"+ ++this.nodeNamesUsed[t]:(this.nodeNamesUsed[t]=0,t)}loadGeometries(e){const t=this,n=this.extensions,i=this.primitiveCache;function r(a){return n[Je.KHR_DRACO_MESH_COMPRESSION].decodePrimitive(a,t).then(function(l){return ic(l,a,t)})}const o=[];for(let a=0,l=e.length;a<l;a++){const c=e[a],u=px(c),d=i[u];if(d)o.push(d.promise);else{let h;c.extensions&&c.extensions[Je.KHR_DRACO_MESH_COMPRESSION]?h=r(c):h=ic(new Tn,c,t),i[u]={primitive:c,promise:h},o.push(h)}}return Promise.all(o)}loadMesh(e){const t=this,n=this.json,i=this.extensions,r=n.meshes[e],o=r.primitives,a=[];for(let l=0,c=o.length;l<c;l++){const u=o[l].material===void 0?dx(this.cache):this.getDependency("material",o[l].material);a.push(u)}return a.push(t.loadGeometries(o)),Promise.all(a).then(function(l){const c=l.slice(0,l.length-1),u=l[l.length-1],d=[];for(let m=0,_=u.length;m<_;m++){const v=u[m],g=o[m];let p;const A=c[m];if(g.mode===sn.TRIANGLES||g.mode===sn.TRIANGLE_STRIP||g.mode===sn.TRIANGLE_FAN||g.mode===void 0)p=r.isSkinnedMesh===!0?new lf(v,A):new $t(v,A),p.isSkinnedMesh===!0&&p.normalizeSkinWeights(),g.mode===sn.TRIANGLE_STRIP?p.geometry=Ql(p.geometry,Ec):g.mode===sn.TRIANGLE_FAN&&(p.geometry=Ql(p.geometry,Qo));else if(g.mode===sn.LINES)p=new mf(v,A);else if(g.mode===sn.LINE_STRIP)p=new Sa(v,A);else if(g.mode===sn.LINE_LOOP)p=new gf(v,A);else if(g.mode===sn.POINTS)p=new _f(v,A);else throw new Error("THREE.GLTFLoader: Primitive mode unsupported: "+g.mode);Object.keys(p.geometry.morphAttributes).length>0&&fx(p,r),p.name=t.createUniqueName(r.name||"mesh_"+e),Un(p,r),g.extensions&&ui(i,p,g),t.assignFinalMaterial(p),d.push(p)}for(let m=0,_=d.length;m<_;m++)t.associations.set(d[m],{meshes:e,primitives:m});if(d.length===1)return r.extensions&&ui(i,d[0],r),d[0];const h=new mi;r.extensions&&ui(i,h,r),t.associations.set(h,{meshes:e});for(let m=0,_=d.length;m<_;m++)h.add(d[m]);return h})}loadCamera(e){let t;const n=this.json.cameras[e],i=n[n.type];if(!i){console.warn("THREE.GLTFLoader: Missing camera parameters.");return}return n.type==="perspective"?t=new Ft(_a.radToDeg(i.yfov),i.aspectRatio||1,i.znear||1,i.zfar||2e6):n.type==="orthographic"&&(t=new Ea(-i.xmag,i.xmag,i.ymag,-i.ymag,i.znear,i.zfar)),n.name&&(t.name=this.createUniqueName(n.name)),Un(t,n),Promise.resolve(t)}loadSkin(e){const t=this.json.skins[e],n=[];for(let i=0,r=t.joints.length;i<r;i++)n.push(this._loadNodeShallow(t.joints[i]));return t.inverseBindMatrices!==void 0?n.push(this.getDependency("accessor",t.inverseBindMatrices)):n.push(null),Promise.all(n).then(function(i){const r=i.pop(),o=i,a=[],l=[];for(let c=0,u=o.length;c<u;c++){const d=o[c];if(d){a.push(d);const h=new Ye;r!==null&&h.fromArray(r.array,c*16),l.push(h)}else console.warn('THREE.GLTFLoader: Joint "%s" could not be found.',t.joints[c])}return new ya(a,l)})}loadAnimation(e){const t=this.json,n=this,i=t.animations[e],r=i.name?i.name:"animation_"+e,o=[],a=[],l=[],c=[],u=[];for(let d=0,h=i.channels.length;d<h;d++){const m=i.channels[d],_=i.samplers[m.sampler],v=m.target,g=v.node,p=i.parameters!==void 0?i.parameters[_.input]:_.input,A=i.parameters!==void 0?i.parameters[_.output]:_.output;v.node!==void 0&&(o.push(this.getDependency("node",g)),a.push(this.getDependency("accessor",p)),l.push(this.getDependency("accessor",A)),c.push(_),u.push(v))}return Promise.all([Promise.all(o),Promise.all(a),Promise.all(l),Promise.all(c),Promise.all(u)]).then(function(d){const h=d[0],m=d[1],_=d[2],v=d[3],g=d[4],p=[];for(let A=0,E=h.length;A<E;A++){const b=h[A],R=m[A],P=_[A],I=v[A],F=g[A];if(b===void 0)continue;b.updateMatrix&&b.updateMatrix();const M=n._createAnimationTracks(b,R,P,I,F);if(M)for(let S=0;S<M.length;S++)p.push(M[S])}return new ia(r,void 0,p)})}createNodeMesh(e){const t=this.json,n=this,i=t.nodes[e];return i.mesh===void 0?null:n.getDependency("mesh",i.mesh).then(function(r){const o=n._getNodeRef(n.meshCache,i.mesh,r);return i.weights!==void 0&&o.traverse(function(a){if(a.isMesh)for(let l=0,c=i.weights.length;l<c;l++)a.morphTargetInfluences[l]=i.weights[l]}),o})}loadNode(e){const t=this.json,n=this,i=t.nodes[e],r=n._loadNodeShallow(e),o=[],a=i.children||[];for(let c=0,u=a.length;c<u;c++)o.push(n.getDependency("node",a[c]));const l=i.skin===void 0?Promise.resolve(null):n.getDependency("skin",i.skin);return Promise.all([r,Promise.all(o),l]).then(function(c){const u=c[0],d=c[1],h=c[2];h!==null&&u.traverse(function(m){m.isSkinnedMesh&&m.bind(h,gx)});for(let m=0,_=d.length;m<_;m++)u.add(d[m]);return u})}_loadNodeShallow(e){const t=this.json,n=this.extensions,i=this;if(this.nodeCache[e]!==void 0)return this.nodeCache[e];const r=t.nodes[e],o=r.name?i.createUniqueName(r.name):"",a=[],l=i._invokeOne(function(c){return c.createNodeMesh&&c.createNodeMesh(e)});return l&&a.push(l),r.camera!==void 0&&a.push(i.getDependency("camera",r.camera).then(function(c){return i._getNodeRef(i.cameraCache,r.camera,c)})),i._invokeAll(function(c){return c.createNodeAttachment&&c.createNodeAttachment(e)}).forEach(function(c){a.push(c)}),this.nodeCache[e]=Promise.all(a).then(function(c){let u;if(r.isBone===!0?u=new Oc:c.length>1?u=new mi:c.length===1?u=c[0]:u=new bt,u!==c[0])for(let d=0,h=c.length;d<h;d++)u.add(c[d]);if(r.name&&(u.userData.name=r.name,u.name=o),Un(u,r),r.extensions&&ui(n,u,r),r.matrix!==void 0){const d=new Ye;d.fromArray(r.matrix),u.applyMatrix4(d)}else r.translation!==void 0&&u.position.fromArray(r.translation),r.rotation!==void 0&&u.quaternion.fromArray(r.rotation),r.scale!==void 0&&u.scale.fromArray(r.scale);if(!i.associations.has(u))i.associations.set(u,{});else if(r.mesh!==void 0&&i.meshCache.refs[r.mesh]>1){const d=i.associations.get(u);i.associations.set(u,{...d})}return i.associations.get(u).nodes=e,u}),this.nodeCache[e]}loadScene(e){const t=this.extensions,n=this.json.scenes[e],i=this,r=new mi;n.name&&(r.name=i.createUniqueName(n.name)),Un(r,n),n.extensions&&ui(t,r,n);const o=n.nodes||[],a=[];for(let l=0,c=o.length;l<c;l++)a.push(i.getDependency("node",o[l]));return Promise.all(a).then(function(l){for(let u=0,d=l.length;u<d;u++)r.add(l[u]);const c=u=>{const d=new Map;for(const[h,m]of i.associations)(h instanceof yn||h instanceof Dt)&&d.set(h,m);return u.traverse(h=>{const m=i.associations.get(h);m!=null&&d.set(h,m)}),d};return i.associations=c(r),r})}_createAnimationTracks(e,t,n,i,r){const o=[],a=e.name?e.name:e.uuid,l=[];jn[r.path]===jn.weights?e.traverse(function(h){h.morphTargetInfluences&&l.push(h.name?h.name:h.uuid)}):l.push(a);let c;switch(jn[r.path]){case jn.weights:c=$i;break;case jn.rotation:c=Qi;break;case jn.translation:case jn.scale:c=es;break;default:switch(n.itemSize){case 1:c=$i;break;case 2:case 3:default:c=es;break}break}const u=i.interpolation!==void 0?ux[i.interpolation]:As,d=this._getArrayFromAccessor(n);for(let h=0,m=l.length;h<m;h++){const _=new c(l[h]+"."+jn[r.path],t.array,d,u);i.interpolation==="CUBICSPLINE"&&this._createCubicSplineTrackInterpolant(_),o.push(_)}return o}_getArrayFromAccessor(e){let t=e.array;if(e.normalized){const n=oa(t.constructor),i=new Float32Array(t.length);for(let r=0,o=t.length;r<o;r++)i[r]=t[r]*n;t=i}return t}_createCubicSplineTrackInterpolant(e){e.createInterpolant=function(n){const i=this instanceof Qi?cx:eu;return new i(this.times,this.values,this.getValueSize()/3,n)},e.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline=!0}}function vx(s,e,t){const n=e.attributes,i=new Jt;if(n.POSITION!==void 0){const a=t.json.accessors[n.POSITION],l=a.min,c=a.max;if(l!==void 0&&c!==void 0){if(i.set(new D(l[0],l[1],l[2]),new D(c[0],c[1],c[2])),a.normalized){const u=oa(Xi[a.componentType]);i.min.multiplyScalar(u),i.max.multiplyScalar(u)}}else{console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.");return}}else return;const r=e.targets;if(r!==void 0){const a=new D,l=new D;for(let c=0,u=r.length;c<u;c++){const d=r[c];if(d.POSITION!==void 0){const h=t.json.accessors[d.POSITION],m=h.min,_=h.max;if(m!==void 0&&_!==void 0){if(l.setX(Math.max(Math.abs(m[0]),Math.abs(_[0]))),l.setY(Math.max(Math.abs(m[1]),Math.abs(_[1]))),l.setZ(Math.max(Math.abs(m[2]),Math.abs(_[2]))),h.normalized){const v=oa(Xi[h.componentType]);l.multiplyScalar(v)}a.max(l)}else console.warn("THREE.GLTFLoader: Missing min/max properties for accessor POSITION.")}}i.expandByVector(a)}s.boundingBox=i;const o=new Mn;i.getCenter(o.center),o.radius=i.min.distanceTo(i.max)/2,s.boundingSphere=o}function ic(s,e,t){const n=e.attributes,i=[];function r(o,a){return t.getDependency("accessor",o).then(function(l){s.setAttribute(a,l)})}for(const o in n){const a=ra[o]||o.toLowerCase();a in s.attributes||i.push(r(n[o],a))}if(e.indices!==void 0&&!s.index){const o=t.getDependency("accessor",e.indices).then(function(a){s.setIndex(a)});i.push(o)}return Qe.workingColorSpace!==Ht&&"COLOR_0"in n&&console.warn(`THREE.GLTFLoader: Converting vertex colors from "srgb-linear" to "${Qe.workingColorSpace}" not supported.`),Un(s,e),vx(s,e,t),Promise.all(i).then(function(){return e.targets!==void 0?hx(s,e.targets,t):s})}const sc={type:"change"},Ra={type:"start"},tu={type:"end"},ar=new Rs,rc=new Kn,xx=Math.cos(70*_a.DEG2RAD),wt=new D,Wt=2*Math.PI,ft={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},po=1e-6;class yx extends ep{constructor(e,t=null){super(e,t),this.state=ft.NONE,this.target=new D,this.cursor=new D,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:zi.ROTATE,MIDDLE:zi.DOLLY,RIGHT:zi.PAN},this.touches={ONE:Fi.ROTATE,TWO:Fi.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new D,this._lastQuaternion=new Qt,this._lastTargetPosition=new D,this._quat=new Qt().setFromUnitVectors(e.up,new D(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new wl,this._sphericalDelta=new wl,this._scale=1,this._panOffset=new D,this._rotateStart=new Be,this._rotateEnd=new Be,this._rotateDelta=new Be,this._panStart=new Be,this._panEnd=new Be,this._panDelta=new Be,this._dollyStart=new Be,this._dollyEnd=new Be,this._dollyDelta=new Be,this._dollyDirection=new D,this._mouse=new Be,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Sx.bind(this),this._onPointerDown=bx.bind(this),this._onPointerUp=Mx.bind(this),this._onContextMenu=Px.bind(this),this._onMouseWheel=Ax.bind(this),this._onKeyDown=wx.bind(this),this._onTouchStart=Cx.bind(this),this._onTouchMove=Rx.bind(this),this._onMouseDown=Tx.bind(this),this._onMouseMove=Ex.bind(this),this._interceptControlDown=Ix.bind(this),this._interceptControlUp=Lx.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(sc),this.update(),this.state=ft.NONE}update(e=null){const t=this.object.position;wt.copy(t).sub(this.target),wt.applyQuaternion(this._quat),this._spherical.setFromVector3(wt),this.autoRotate&&this.state===ft.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let n=this.minAzimuthAngle,i=this.maxAzimuthAngle;isFinite(n)&&isFinite(i)&&(n<-Math.PI?n+=Wt:n>Math.PI&&(n-=Wt),i<-Math.PI?i+=Wt:i>Math.PI&&(i-=Wt),n<=i?this._spherical.theta=Math.max(n,Math.min(i,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(n+i)/2?Math.max(n,this._spherical.theta):Math.min(i,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let r=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{const o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),r=o!=this._spherical.radius}if(wt.setFromSpherical(this._spherical),wt.applyQuaternion(this._quatInverse),t.copy(this.target).add(wt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){const a=wt.length();o=this._clampDistance(a*this._scale);const l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),r=!!l}else if(this.object.isOrthographicCamera){const a=new D(this._mouse.x,this._mouse.y,0);a.unproject(this.object);const l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),r=l!==this.object.zoom;const c=new D(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=wt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(ar.origin.copy(this.object.position),ar.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(ar.direction))<xx?this.object.lookAt(this.target):(rc.setFromNormalAndCoplanarPoint(this.object.up,this.target),ar.intersectPlane(rc,this.target))))}else if(this.object.isOrthographicCamera){const o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),r=!0)}return this._scale=1,this._performCursorZoom=!1,r||this._lastPosition.distanceToSquared(this.object.position)>po||8*(1-this._lastQuaternion.dot(this.object.quaternion))>po||this._lastTargetPosition.distanceToSquared(this.target)>po?(this.dispatchEvent(sc),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?Wt/60*this.autoRotateSpeed*e:Wt/60/60*this.autoRotateSpeed}_getZoomScale(e){const t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){wt.setFromMatrixColumn(t,0),wt.multiplyScalar(-e),this._panOffset.add(wt)}_panUp(e,t){this.screenSpacePanning===!0?wt.setFromMatrixColumn(t,1):(wt.setFromMatrixColumn(t,0),wt.crossVectors(this.object.up,wt)),wt.multiplyScalar(e),this._panOffset.add(wt)}_pan(e,t){const n=this.domElement;if(this.object.isPerspectiveCamera){const i=this.object.position;wt.copy(i).sub(this.target);let r=wt.length();r*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*r/n.clientHeight,this.object.matrix),this._panUp(2*t*r/n.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/n.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/n.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;const n=this.domElement.getBoundingClientRect(),i=e-n.left,r=t-n.top,o=n.width,a=n.height;this._mouse.x=i/o*2-1,this._mouse.y=-(r/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Wt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Wt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-Wt*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._rotateStart.set(n,i)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panStart.set(n,i)}}_handleTouchStartDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyStart.set(0,r)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{const n=this._getSecondPointerPosition(e),i=.5*(e.pageX+n.x),r=.5*(e.pageY+n.y);this._rotateEnd.set(i,r)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);const t=this.domElement;this._rotateLeft(Wt*this._rotateDelta.x/t.clientHeight),this._rotateUp(Wt*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{const t=this._getSecondPointerPosition(e),n=.5*(e.pageX+t.x),i=.5*(e.pageY+t.y);this._panEnd.set(n,i)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){const t=this._getSecondPointerPosition(e),n=e.pageX-t.x,i=e.pageY-t.y,r=Math.sqrt(n*n+i*i);this._dollyEnd.set(0,r),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);const o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new Be,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){const t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){const t=e.deltaMode,n={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:n.deltaY*=16;break;case 2:n.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(n.deltaY*=10),n}}function bx(s){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(s.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(s)&&(this._addPointer(s),s.pointerType==="touch"?this._onTouchStart(s):this._onMouseDown(s)))}function Sx(s){this.enabled!==!1&&(s.pointerType==="touch"?this._onTouchMove(s):this._onMouseMove(s))}function Mx(s){switch(this._removePointer(s),this._pointers.length){case 0:this.domElement.releasePointerCapture(s.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(tu),this.state=ft.NONE;break;case 1:const e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Tx(s){let e;switch(s.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case zi.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(s),this.state=ft.DOLLY;break;case zi.ROTATE:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ft.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ft.ROTATE}break;case zi.PAN:if(s.ctrlKey||s.metaKey||s.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(s),this.state=ft.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(s),this.state=ft.PAN}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(Ra)}function Ex(s){switch(this.state){case ft.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(s);break;case ft.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(s);break;case ft.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(s);break}}function Ax(s){this.enabled===!1||this.enableZoom===!1||this.state!==ft.NONE||(s.preventDefault(),this.dispatchEvent(Ra),this._handleMouseWheel(this._customWheelEvent(s)),this.dispatchEvent(tu))}function wx(s){this.enabled!==!1&&this._handleKeyDown(s)}function Cx(s){switch(this._trackPointer(s),this._pointers.length){case 1:switch(this.touches.ONE){case Fi.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(s),this.state=ft.TOUCH_ROTATE;break;case Fi.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(s),this.state=ft.TOUCH_PAN;break;default:this.state=ft.NONE}break;case 2:switch(this.touches.TWO){case Fi.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(s),this.state=ft.TOUCH_DOLLY_PAN;break;case Fi.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(s),this.state=ft.TOUCH_DOLLY_ROTATE;break;default:this.state=ft.NONE}break;default:this.state=ft.NONE}this.state!==ft.NONE&&this.dispatchEvent(Ra)}function Rx(s){switch(this._trackPointer(s),this.state){case ft.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(s),this.update();break;case ft.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(s),this.update();break;case ft.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(s),this.update();break;case ft.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(s),this.update();break;default:this.state=ft.NONE}}function Px(s){this.enabled!==!1&&s.preventDefault()}function Ix(s){s.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Lx(s){s.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}const Dx={class:"tabs"},Ux={class:"viewer-wrapper"},Nx=["disabled"],Fx={key:0,class:"text-danger mt-2"},Ox={__name:"Avatar3DViewer",props:{glbUrl:{type:String,required:!0},audioUrl:{type:String,required:!0}},setup(s){const e=s,t=Mt("full"),n=Mt(null);let i,r,o,a,l,c,u,d=null,h=null,m=null,_=null;const v=new(window.AudioContext||window.webkitAudioContext),g=Mt(null),p=Mt(null),A=Mt(!0);let E=null;const b=new Map;hc(async()=>{I(),await P()});function R(j){var oe;if(!(j.isMesh||j.isSkinnedMesh))return(!1)(j.name||"").toLowerCase();const B=j.material,Q=(Array.isArray(B)?(oe=B[0])==null?void 0:oe.name:(B==null?void 0:B.name)||"").toLowerCase(),V=/(head|eye|teeth|hair|beard|glasses|tongue)/i.test(j.name),ee=/(eye|iris|pupil)/i.test(Q);return V||ee}cu(()=>{cancelAnimationFrame(E),o==null||o.dispose(),a==null||a.dispose(),h&&h.stop(),v.close()}),fc(t,j=>{c&&F(j==="head")});async function P(){try{A.value=!0;const B=await(await fetch(e.audioUrl)).arrayBuffer();g.value=await v.decodeAudioData(B),p.value=null}catch(j){console.error("Erreur audio :",j),p.value="⚠️ Impossible de lire l’audio",g.value=null}finally{A.value=!1}}function I(){const j=n.value.clientWidth,B=n.value.clientHeight,Q=45;r=new Ft(Q,j/B,.1,1e3),r.userData.originalFov=Q,i=new rf,i.background=new ze(16119285),r=new Ft(45,j/B,.1,1e3),r.position.set(0,1.6,2),o=new Ov({antialias:!0,alpha:!0}),o.setPixelRatio(window.devicePixelRatio),o.setSize(j,B),o.outputColorSpace=Lt,n.value.appendChild(o.domElement),i.add(new Of(16777215,1.5));const V=new qc(16777215,1);V.position.set(0,10,10),i.add(V),a=new yx(r,o.domElement),a.enableDamping=!0,a.dampingFactor=.1,new kv().load(e.glbUrl,oe=>{c=oe.scene,i.add(c),c.traverse(pe=>{(pe.isMesh||pe.isSkinnedMesh)&&b.set(pe.uuid,pe.visible)}),oe.animations.length>0&&(l=new Qf(c),l.clipAction(oe.animations[0]).play()),c.traverse(pe=>{(pe.isSkinnedMesh||pe.isMesh)&&pe.name==="Wolf3D_Head"&&(d=pe,console.log("✅ Mesh tête :",pe.name),console.log("🧠 Visèmes :",Object.keys(pe.morphTargetDictionary||{})))}),u=new Vf,S(),q()},void 0,oe=>console.error("Erreur chargement GLB :",oe)),window.addEventListener("resize",X)}function F(j){c&&(c.traverse(B=>{if(B.isMesh||B.isSkinnedMesh)if(j)B.visible=R(B);else{const Q=b.get(B.uuid);B.visible=typeof Q=="boolean"?Q:!0}}),S(),j?M(1.25,{min:22,max:48}):(r.fov=r.userData.originalFov??45,r.updateProjectionMatrix()))}function M(j=1.25,B={min:20,max:55}){if(!c)return;const Q=new Jt,V=new Jt;let ee=!1;if(c.traverse(ce=>{(ce.isMesh||ce.isSkinnedMesh)&&ce.visible&&(ce.updateWorldMatrix(!0,!1),V.setFromObject(ce),ee?Q.union(V):(Q.copy(V),ee=!0))}),!ee)return;const oe=Q.getSize(new D),pe=Q.getCenter(new D),Oe=r.position.distanceTo(pe),st=oe.y*j;let rt=2*Math.atan(st/2/Oe),Y=_a.radToDeg(rt);Y=Math.min(Math.max(Y,B.min),B.max),r.fov=Y,r.updateProjectionMatrix()}function S(){const j=new Jt,B=new Jt;let Q=!1;if(c.traverse(ee=>{(ee.isMesh||ee.isSkinnedMesh)&&ee.visible&&(ee.updateWorldMatrix(!0,!1),B.setFromObject(ee),Q?j.union(B):(j.copy(B),Q=!0))}),!Q)return;const V=j.getCenter(new D);a.target.copy(V),r.lookAt(V)}function C(){if(!g.value){p.value="⚠️ Aucun audio chargé";return}h&&h.stop(),h=v.createBufferSource(),h.buffer=g.value,m=v.createAnalyser(),m.fftSize=1024,_=new Uint8Array(m.frequencyBinCount),h.connect(m),m.connect(v.destination),h.start()}let Z=0;function q(){E=requestAnimationFrame(q);const j=u.getDelta();if(l&&l.update(j),d&&m&&_){m.getByteTimeDomainData(_);let B=0;for(let Oe=0;Oe<_.length;Oe++){const st=(_[Oe]-128)/128;B+=st*st}const Q=Math.sqrt(B/_.length);Z+=(Q-Z)*.2;const V=Math.min(Z*25,1),ee=d.morphTargetDictionary,oe=d.morphTargetInfluences,pe=ee==null?void 0:ee.mouthOpen;pe!==void 0&&(oe[pe]=V)}a.update(),o.render(i,r)}function X(){if(!n.value||!o||!r)return;const j=n.value.clientWidth,B=n.value.clientHeight;o.setSize(j,B),r.aspect=j/B,r.updateProjectionMatrix(),S()}return(j,B)=>(G(),W("div",null,[f("div",Dx,[f("button",{class:We({active:t.value==="full"}),onClick:B[0]||(B[0]=Q=>t.value="full")},"Avatar complet",2),f("button",{class:We({active:t.value==="head"}),onClick:B[1]||(B[1]=Q=>t.value="head")},"Tête seulement",2)]),f("div",Ux,[f("div",{ref_key:"threeContainer",ref:n,class:"three-viewer"},null,512),f("button",{class:"btn-play",disabled:A.value||!g.value,onClick:C}," 🎤 Faire parler l'avatar ",8,Nx),p.value?(G(),W("div",Fx,he(p.value),1)):Ie("",!0)])]))}},nu=Vn(Ox,[["__scopeId","data-v-e64d9fd6"]]),kx={name:"Step3AvatarVoix",components:{Avatar3DViewer:nu},props:{avatarTab:{type:String,default:"prompt"},voiceFromDb:{type:Object,default:null},selectedTypes:{type:Array,default:()=>[]},avatar:{type:Object,required:!0},voix:{type:Object,required:!0},isLoading:{type:Boolean,default:!1},resembleVoices:{type:Array,default:()=>[]},customVoices:{type:Array,default:()=>[]},customVoicesLoading:{type:Boolean,default:!1},customVoicesError:{type:String,default:null},agent:{type:Object,required:!0},languesDisponibles:{type:Array,default:()=>[]},availableTypes:{type:Array,default:()=>[]},iframeUrl:{type:String,default:""},selectedVoiceData:{type:Object,default:null},loadingLanguages:{type:Boolean,default:!1}},emits:["update:avatarTab","update:selectedTypes","update:avatar","update:voix","update:isLoading","update:resembleVoices","update-avatar-prompt","generate-avatar-prompt-system","handle-rpm-message","load-resemble-voices","ecouter-voix-resemble","ecouter-voix","selectionner-voix","handle-voice-upload","creer-voix","preview-selected-voice","on-language-change","test-lip-sync","get-slider-label","afficher-nom-langue","stop-current-audio","update:customVoices","update:customVoicesLoading","update:customVoicesError","open-sandbox-3d"],data(){return{voiceCreating:!1,glbProcessing:!1}},mounted(){this.$emit("load-resemble-voices"),this.loadCustomVoices()},computed:{voixIA(){var s;return((s=this.voix.voixDisponibles)==null?void 0:s.filter(e=>e.type==="custom"))||[]},isLocalGlbFile(){return this.avatar.glbUrl&&this.avatar.glbUrl.startsWith("avatars/")},selectedVoiceInfo(){return this.voix.selectedVoice?this.voix.selectedVoiceType==="resemble"?this.resembleVoices.find(s=>s.id===this.voix.selectedVoice):this.voix.selectedVoiceType==="custom"?this.customVoices.find(s=>s.id===this.voix.selectedVoice):null:null}},methods:{async onGlbUrlInput(s){this.updateAvatar("glbUrl",s),this.isValidGlbUrl(s)&&!this.glbProcessing&&setTimeout(()=>{this.avatar.glbUrl===s&&this.downloadAndReplaceUrl(s)},2e3)},goToThreeTab(){this.isLocalGlbFile?(this.$emit("update:avatarTab","three"),typeof toast<"u"&&toast.success("👁️ Passage à l'aperçu 3D !")):typeof toast<"u"&&toast.warning("Veuillez d'abord sauvegarder votre avatar GLB")},goToSandbox3D(){if(!this.isLocalGlbFile){typeof toast<"u"&&toast.warning("Veuillez d'abord sauvegarder votre avatar GLB");return}this.$emit("open-sandbox-3d",{glbUrl:`/storage/${this.avatar.glbUrl}`,voiceFromDb:this.voiceFromDb||null})},async onGlbUrlPaste(s){s.preventDefault();const e=(s.clipboardData||window.clipboardData).getData("text");this.isValidGlbUrl(e)?(this.updateAvatar("glbUrl",e),await this.downloadAndReplaceUrl(e)):this.updateAvatar("glbUrl",e)},playSelectedVoice(){const s=this.voix.selectedVoice,e=this.selectedVoiceInfo,t=this.voix.selectedVoiceType;if(!s||!e){toast.warning("⚠️ Aucune voix sélectionnée.");return}this.voix.isPlaying=!0,t==="custom"?this.playCustomVoice(e):t==="resemble"?this.playResembleVoice(e.id):(toast.warning("⚠️ Type de voix non reconnu."),this.voix.isPlaying=!1)},async downloadAndReplaceUrl(s){if(!this.glbProcessing){this.glbProcessing=!0;try{const e=await axios.post("/api/agentia/process-glb-url",{glb_url:s});e.data.success?(this.updateAvatar("glbUrl",e.data.local_path),typeof toast<"u"&&toast.success(`✅ Fichier GLB sauvegardé : ${e.data.file_name}`)):typeof toast<"u"&&toast.error("❌ "+e.data.message)}catch(e){console.error("Erreur téléchargement GLB:",e),typeof toast<"u"&&toast.error("❌ Impossible de télécharger le fichier GLB")}finally{this.glbProcessing=!1}}},isValidGlbUrl(s){return!s||typeof s!="string"?!1:s.includes("models.readyplayer.me")||s.includes("readyplayer.me")||s.startsWith("http")&&s.includes(".glb")},getFileName(s){if(!s)return"";const e=s.split("/");return e[e.length-1]},goToVoiceTab(){this.isLocalGlbFile?(this.$emit("update:avatarTab","voix"),typeof toast<"u"&&toast.success("🎤 Passons maintenant à la configuration de la voix !")):typeof toast<"u"&&toast.warning("Veuillez d'abord sauvegarder votre avatar GLB")},getAvatarClass(s){switch(s){case"female":return"bg-danger bg-opacity-25 text-danger";case"male":return"bg-primary bg-opacity-25 text-primary";default:return"bg-secondary bg-opacity-25 text-secondary"}},getAvatarIcon(s){switch(s){case"female":return"fas fa-user-circle";case"male":return"fas fa-user-circle";default:return"fas fa-robot"}},updateAvatar(s,e){const t={...this.avatar};t[s]=e,this.$emit("update:avatar",t),s!=="glbUrl"&&this.$emit("update-avatar-prompt")},toggleSelectedType(s){let e=[...this.selectedTypes];const t=e.indexOf(s);t>-1?e.splice(t,1):e.push(s),this.$emit("update:selectedTypes",e),this.$emit("update-avatar-prompt")},async loadCustomVoices(){this.$emit("update:customVoicesLoading",!0);try{const s=await axios.get("/api/agentia/custom-voices");s.data.success?(this.$emit("update:customVoices",s.data.voices),console.log(`✅ ${s.data.count} voix personnalisées chargées`)):typeof toast<"u"&&toast.error("Erreur lors du chargement des voix personnalisées")}catch(s){console.error("❌ Erreur chargement voix personnalisées:",s),typeof toast<"u"&&toast.error("Impossible de charger les voix personnalisées")}finally{this.$emit("update:customVoicesLoading",!1)}},playCustomVoice(s){let e=null;if(s.audio_url&&typeof s.audio_url=="string"?e=s.audio_url:s.file_path instanceof File||s.file_path instanceof Blob?e=URL.createObjectURL(s.file_path):console.warn("⚠️ file_path non valide :",s.file_path),!e){toast.warning("⚠️ Aucun fichier audio trouvé pour cette voix personnalisée."),this.voix.isPlaying=!1;return}const t=new Audio(e);this.voix.playingVoice=s.id,t.play().then(()=>{console.log(`🎧 Lecture de la voix personnalisée : ${s.voice_name}`)}).catch(n=>{toast.error("❌ Erreur lors de la lecture audio."),console.error(n),this.voix.isPlaying=!1}),t.onended=()=>{this.voix.isPlaying=!1,this.voix.playingVoice=null,s.audio_url||URL.revokeObjectURL(e)},t.onerror=()=>{toast.error("❌ Impossible de lire la voix personnalisée."),this.voix.isPlaying=!1,this.voix.playingVoice=null}},async playResembleVoice(s){this.$emit("ecouter-voix-resemble",s)},selectVoice(s,e){this.voix.selectedVoice=s,this.voix.selectedVoiceType=e;let t="";if(e==="resemble"){const n=this.resembleVoices.find(i=>i.id===s);t=(n==null?void 0:n.name)||s}else if(e==="custom"){const n=this.customVoices.find(i=>i.id===s);t=(n==null?void 0:n.voice_name)||s}this.$emit("selectionner-voix",s),typeof toast<"u"&&toast.success(`✅ Voix sélectionnée: ${t}`)},playCustomVoice(s){let e=null;if(s.audio_url?e=s.audio_url:(s.file_path instanceof File||s.file_path instanceof Blob)&&(e=URL.createObjectURL(s.file_path)),!e){toast.warning("⚠️ Aucun fichier audio trouvé."),this.voix.isPlaying=!1;return}const t=new Audio(e);this.voix.playingVoice=s.id,t.play().then(()=>{console.log(`Lecture : ${s.voice_name}`)}).catch(n=>{toast.error("Erreur lecture audio"),console.error(n),this.voix.isPlaying=!1}),t.onended=()=>{this.voix.isPlaying=!1,this.voix.playingVoice=null,s.audio_url||URL.revokeObjectURL(e)},t.onerror=()=>{toast.error("Erreur de lecture"),this.voix.isPlaying=!1,this.voix.playingVoice=null}},async createCustomVoice(){var e,t,n,i;if(!this.voix.customVoiceFile){typeof toast<"u"&&toast.error("Veuillez sélectionner un fichier audio");return}if(!((e=this.voix.nom)!=null&&e.trim())){typeof toast<"u"&&toast.error("Veuillez donner un nom à votre voix");return}this.voiceCreating=!0;const s=new FormData;s.append("voice_file",this.voix.customVoiceFile),s.append("voice_name",this.voix.nom.trim()),s.append("description",this.voix.description||"Voix personnalisée"),s.append("language",this.voix.langue),s.append("settings[vitesse]",((t=this.voix.settings)==null?void 0:t.vitesse)||1),s.append("settings[intonation]",((n=this.voix.settings)==null?void 0:n.intonation)||1),s.append("settings[volume]",((i=this.voix.settings)==null?void 0:i.volume)||1);try{const r=await axios.post("/api/agentia/create-custom-voice",s,{headers:{"Content-Type":"multipart/form-data"}});r.data.success?(typeof toast<"u"&&toast.success("✅ Voix personnalisée créée avec succès !"),this.voix.customVoiceFile=null,this.voix.nom="",this.voix.description="",await this.loadCustomVoices(),this.selectVoice(r.data.voice.id,"custom")):typeof toast<"u"&&toast.error("❌ Erreur lors de la création de la voix")}catch(r){console.error("❌ Erreur création voix:",r),typeof toast<"u"&&toast.error("❌ Erreur réseau lors de la création")}finally{this.voiceCreating=!1}},handleVoiceUpload(s){const e=s.target.files[0];if(e){if(!e.type.startsWith("audio/")){typeof toast<"u"&&toast.error("❌ Veuillez sélectionner un fichier audio valide");return}if(e.size>10*1024*1024){typeof toast<"u"&&toast.error("❌ Le fichier est trop volumineux (max 10MB)");return}this.voix.customVoiceFile=e,typeof toast<"u"&&toast.success(`📁 Fichier sélectionné: ${e.name}`)}},stopCurrentAudio(){this.voix.isPlaying=!1,this.voix.playingVoice=null},updateVoixSettings(s,e){const t={...this.voix};s==="langue"?(t.langue=e,this.$emit("on-language-change")):(t.settings={...t.settings},t.settings[s]=parseFloat(e)),this.$emit("update:voix",t)},getSliderLabel(s,e){const n={vitesse:{0:"Très lent",.5:"Lent",1:"Normal",1.5:"Rapide",2:"Très rapide"},intonation:{0:"Monotone",.5:"Neutre",1:"Équilibré",1.5:"Expressif",2:"Très expressif"},volume:{0:"Très faible",.5:"Faible",1:"Normal",1.5:"Fort",2:"Très fort"}}[s],r=Object.keys(n).map(Number).reduce((o,a)=>Math.abs(a-e)<Math.abs(o-e)?a:o);return n[r]},afficherNomLangue(s){return{fr:"Français",en:"English",es:"Español",de:"Deutsch",it:"Italiano"}[s]||s.toUpperCase()}}},Bx={class:"row"},Vx={class:"col-12 mb-4"},zx={class:"nav nav-tabs border-0 bg-light p-2 rounded-3"},Hx={class:"nav-item"},Gx={class:"nav-item"},Wx={class:"nav-item"},Xx={class:"nav-item"},qx={class:"col-md-6 mb-3"},jx=["value"],Yx={class:"col-md-6 mb-3"},Kx=["value"],Zx={class:"col-md-6 mb-3"},Jx=["value"],$x={class:"col-md-6 mb-3"},Qx=["value"],e0={class:"col-md-12 mb-3"},t0=["id","value","checked","onChange"],n0=["for"],i0={key:0,class:"col-md-6 mb-3"},s0=["value"],r0={key:1,class:"col-md-6 mb-3"},o0=["value"],a0={key:2,class:"col-md-6 mb-3"},l0=["value"],c0={key:3,class:"col-md-6 mb-3"},u0=["value"],d0={key:4,class:"col-md-6 mb-3"},h0=["value"],f0={key:5,class:"col-md-6 mb-3"},p0=["value"],m0={key:6,class:"col-md-6 mb-3"},g0=["value"],_0={class:"col-12 mb-3"},v0=["value"],x0={class:"col-12 mt-3"},y0={key:7,class:"col-12 mt-4"},b0={class:"mt-4"},S0={class:"position-relative"},M0=["disabled"],T0={key:0,class:"position-absolute end-0 top-50 translate-middle-y me-3"},E0={key:1,class:"position-absolute end-0 top-50 translate-middle-y me-3"},A0={key:0,class:"mt-2 text-primary small"},w0={key:1,class:"mt-2 text-success small"},C0={class:"mt-4 text-center"},R0=["disabled"],P0={key:0,class:"text-muted small mt-2"},I0={key:1,class:"text-success small mt-2"},L0={class:"mt-3 text-center"},D0=["disabled"],U0={class:"mt-4"},N0={class:"position-relative"},F0=["disabled"],O0={key:0,class:"position-absolute end-0 top-50 translate-middle-y me-3"},k0={key:1,class:"position-absolute end-0 top-50 translate-middle-y me-3"},B0={key:0,class:"mt-2 text-primary small"},V0={key:1,class:"mt-2 text-success small"},z0={class:"mt-4 text-center"},H0=["disabled"],G0={key:0,class:"text-muted small mt-2"},W0={key:1,class:"text-success small mt-2"},X0={class:"mt-3 text-center"},q0=["disabled"],j0={key:2,class:"voice-selection-container"},Y0={class:"mb-4"},K0={key:0,class:"text-center py-5"},Z0={key:1,class:"row g-3"},J0={class:"voice-avatar mb-3"},$0={class:"voice-name"},Q0={class:"voice-desc small"},ey={class:"voice-language mb-3"},ty={class:"badge bg-primary"},ny={class:"voice-actions d-grid gap-2"},iy=["onClick","disabled"],sy={key:0,class:"fas fa-play"},ry={key:1,class:"fas fa-spinner fa-spin"},oy=["onClick"],ay={key:2,class:"text-center py-5 text-muted"},ly={class:"mb-4"},cy={class:"d-flex justify-content-between align-items-center mb-3"},uy={key:0,class:"text-center py-5"},dy={key:1,class:"row g-3"},hy={class:"voice-name"},fy={class:"voice-desc small"},py={class:"voice-meta mb-3"},my={class:"badge bg-success"},gy={class:"text-muted ms-2"},_y={class:"voice-actions d-grid gap-2"},vy=["onClick","disabled"],xy={key:0,class:"fas fa-play"},yy={key:1,class:"fas fa-spinner fa-spin"},by=["onClick"],Sy={key:2,class:"text-center py-5 border-2 border-dashed rounded"},My={class:"bg-light rounded p-4 mb-4"},Ty={class:"row g-3 mb-4"},Ey={class:"col-md-6"},Ay={class:"col-md-6"},wy=["value"],Cy={class:"mb-4"},Ry={class:"mb-4"},Py={class:"text-center"},Iy={class:"text-muted small"},Ly={class:"text-center"},Dy=["disabled"],Uy={key:0,class:"fas fa-spinner fa-spin me-2"},Ny={key:1,class:"fas fa-plus me-2"},Fy={key:0,class:"settings-section"},Oy={class:"row g-4 mb-4"},ky={class:"col-md-4"},By={class:"setting-group text-center"},Vy={class:"slider-container"},zy=["value"],Hy={class:"text-center mt-2"},Gy={class:"text-muted fw-medium"},Wy={class:"col-md-4"},Xy={class:"setting-group text-center"},qy={class:"slider-container"},jy=["value"],Yy={class:"text-center mt-2"},Ky={class:"text-muted fw-medium"},Zy={class:"col-md-4"},Jy={class:"setting-group text-center"},$y={class:"slider-container"},Qy=["value"],eb={class:"text-center mt-2"},tb={class:"text-muted fw-medium"},nb={key:0,class:"text-center mb-4"},ib=["disabled"],sb={key:0,class:"fas fa-play me-2"},rb={key:1,class:"fas fa-spinner fa-spin me-2"},ob={class:"col-md-12"},ab=["value"],lb={key:1,class:"selected-voice-info mb-4"},cb={class:"alert alert-primary border-0 d-flex justify-content-between align-items-center"},ub={class:"fw-medium mb-1"},db={key:0,class:"text-muted"},hb={class:"text-muted small mb-0"},fb=["disabled"],pb={key:0,class:"fas fa-play me-1"},mb={key:1,class:"fas fa-spinner fa-spin me-1"},gb={key:2,class:"text-center"},_b={key:0,class:"mt-4 p-3 rounded bg-light border"},vb={class:"fw-semibold mb-2"},xb={class:"text-muted small"},yb=["src"];function bb(s,e,t,n,i,r){var a;const o=Yn("Avatar3DViewer");return G(),W("div",Bx,[e[111]||(e[111]=f("div",{class:"col-12 mb-4"},[f("h4",{class:"fw-bold"},"Créez un Avatar 3D & Voix pour votre Agent IA")],-1)),f("div",Vx,[f("ul",zx,[f("li",Hx,[f("button",{class:We(["nav-link",{active:t.avatarTab==="prompt"}]),onClick:e[0]||(e[0]=l=>s.$emit("update:avatarTab","prompt"))}," Créer un avatar à partir d'un prompt ",2)]),f("li",Gx,[f("button",{class:We(["nav-link",{active:t.avatarTab==="image"}]),onClick:e[1]||(e[1]=l=>s.$emit("update:avatarTab","image"))}," Créer un avatar à partir d'une image ",2)]),f("li",Wx,[f("button",{class:We(["nav-link",{active:t.avatarTab==="voix"}]),onClick:e[2]||(e[2]=l=>s.$emit("update:avatarTab","voix"))}," Créer une Voix ",2)]),f("li",Xx,[f("button",{class:We(["nav-link",{active:t.avatarTab==="three"}]),onClick:e[3]||(e[3]=l=>s.$emit("update:avatarTab","three"))}," Voir l'avatar en 3D ",2)])])]),t.avatarTab==="prompt"?(G(),W(_t,{key:0},[f("div",qx,[e[42]||(e[42]=f("label",{class:"form-label"},"Nom de L'avatar",-1)),f("input",{class:"form-control",value:t.avatar.avatar_name,onInput:e[4]||(e[4]=l=>r.updateAvatar("avatar_name",l.target.value)),placeholder:"Nom de l'avatar 3D"},null,40,jx)]),f("div",Yx,[e[43]||(e[43]=f("label",{class:"form-label"},"Domaine de L'avatar",-1)),f("input",{class:"form-control",value:t.avatar.avatar_domaine,onInput:e[5]||(e[5]=l=>r.updateAvatar("avatar_domaine",l.target.value)),placeholder:"Domaine de l'avatar"},null,40,Kx)]),f("div",Zx,[e[45]||(e[45]=f("label",{class:"form-label"},"Genre",-1)),f("select",{class:"form-select",value:t.avatar.gender,onChange:e[6]||(e[6]=l=>r.updateAvatar("gender",l.target.value))},e[44]||(e[44]=[f("option",{value:"male"},"Homme",-1),f("option",{value:"female"},"Femme",-1),f("option",{value:"neutral"},"Neutre",-1)]),40,Jx)]),f("div",$x,[e[47]||(e[47]=f("label",{class:"form-label"},"Morphologie",-1)),f("select",{class:"form-select",value:t.avatar.body_type,onChange:e[7]||(e[7]=l=>r.updateAvatar("body_type",l.target.value))},e[46]||(e[46]=[f("option",{value:"full_body"},"Corps complet",-1),f("option",{value:"generic"},"Standard",-1)]),40,Qx)]),f("div",e0,[e[48]||(e[48]=f("label",{class:"form-label d-block"},"Composants personnalisés",-1)),(G(!0),W(_t,null,Et(t.availableTypes,l=>(G(),W("div",{class:"form-check d-inline-block me-3",key:l.value},[f("input",{class:"form-check-input",type:"checkbox",id:l.value,value:l.value,checked:t.selectedTypes.includes(l.value),onChange:c=>r.toggleSelectedType(l.value)},null,40,t0),f("label",{class:"form-check-label",for:l.value},he(l.label),9,n0)]))),128))]),t.selectedTypes&&t.selectedTypes.includes("outfit")?(G(),W("div",i0,[e[50]||(e[50]=f("label",{class:"form-label"},"Outfit",-1)),f("select",{class:"form-select",value:t.avatar.outfit,onChange:e[8]||(e[8]=l=>r.updateAvatar("outfit",l.target.value))},e[49]||(e[49]=[f("option",{value:""},"-- Choisir --",-1),f("option",{value:"CyberNinjaOutfit01"},"Cyber Ninja",-1),f("option",{value:"BusinessSuit01"},"Costume Business",-1),f("option",{value:"StreetWear01"},"Tenue Décontractée",-1)]),40,s0)])):Ie("",!0),t.selectedTypes&&t.selectedTypes.includes("hair")?(G(),W("div",r0,[e[52]||(e[52]=f("label",{class:"form-label"},"Hair",-1)),f("select",{class:"form-select",value:t.avatar.hair,onChange:e[9]||(e[9]=l=>r.updateAvatar("hair",l.target.value))},e[51]||(e[51]=[f("option",{value:""},"-- Choisir --",-1),f("option",{value:"ShortCurly"},"Cheveux courts bouclés",-1),f("option",{value:"LongStraight"},"Longs et lisses",-1),f("option",{value:"Bald"},"Chauve",-1)]),40,o0)])):Ie("",!0),t.selectedTypes&&t.selectedTypes.includes("glasses")?(G(),W("div",a0,[e[54]||(e[54]=f("label",{class:"form-label"},"Glasses",-1)),f("select",{class:"form-select",value:t.avatar.glasses,onChange:e[10]||(e[10]=l=>r.updateAvatar("glasses",l.target.value))},e[53]||(e[53]=[f("option",{value:""},"-- Choisir --",-1),f("option",{value:"CyberGlasses"},"Cyber",-1),f("option",{value:"Round"},"Rondes",-1),f("option",{value:"SunGlasses"},"Solaires",-1)]),40,l0)])):Ie("",!0),t.selectedTypes&&t.selectedTypes.includes("top")?(G(),W("div",c0,[e[56]||(e[56]=f("label",{class:"form-label"},"Top",-1)),f("select",{class:"form-select",value:t.avatar.top,onChange:e[11]||(e[11]=l=>r.updateAvatar("top",l.target.value))},e[55]||(e[55]=[f("option",{value:""},"-- Choisir --",-1),f("option",{value:"Hoodie01"},"Sweat à capuche",-1),f("option",{value:"ShirtBusiness"},"Chemise business",-1),f("option",{value:"TShirtPlain"},"T-shirt simple",-1)]),40,u0)])):Ie("",!0),t.selectedTypes&&t.selectedTypes.includes("facemask")?(G(),W("div",d0,[e[58]||(e[58]=f("label",{class:"form-label"},"Facemask",-1)),f("select",{class:"form-select",value:t.avatar.facemask,onChange:e[12]||(e[12]=l=>r.updateAvatar("facemask",l.target.value))},e[57]||(e[57]=[f("option",{value:""},"-- Choisir --",-1),f("option",{value:"Surgical"},"Chirurgical",-1),f("option",{value:"GasMask"},"Masque à gaz",-1),f("option",{value:"Futuristic"},"Futuriste",-1)]),40,h0)])):Ie("",!0),t.selectedTypes&&t.selectedTypes.includes("facewear")?(G(),W("div",f0,[e[60]||(e[60]=f("label",{class:"form-label"},"Facewear",-1)),f("select",{class:"form-select",value:t.avatar.facewear,onChange:e[13]||(e[13]=l=>r.updateAvatar("facewear",l.target.value))},e[59]||(e[59]=[f("option",{value:""},"-- Choisir --",-1),f("option",{value:"Eyepatch"},"Cache-œil",-1),f("option",{value:"Piercing"},"Piercing",-1),f("option",{value:"None"},"Aucun",-1)]),40,p0)])):Ie("",!0),t.selectedTypes&&t.selectedTypes.includes("hero_character")?(G(),W("div",m0,[e[62]||(e[62]=f("label",{class:"form-label"},"Hero Character",-1)),f("select",{class:"form-select",value:t.avatar.hero_character,onChange:e[14]||(e[14]=l=>r.updateAvatar("hero_character",l.target.value))},e[61]||(e[61]=[f("option",{value:""},"-- Choisir --",-1),f("option",{value:"Samurai"},"Samouraï",-1),f("option",{value:"CyberKnight"},"Cyber Chevalier",-1),f("option",{value:"SpaceRanger"},"Ranger Galactique",-1)]),40,g0)])):Ie("",!0),f("div",_0,[e[63]||(e[63]=f("label",{class:"form-label"},"Prompt",-1)),f("textarea",{class:"form-control",rows:"3",value:t.avatar.avatar_prompt,onInput:e[15]||(e[15]=l=>r.updateAvatar("avatar_prompt",l.target.value)),placeholder:"Décrivez votre avatar idéal..."},null,40,v0)]),f("div",x0,[f("button",{class:"btn btn-outline-primary w-100 py-2",onClick:e[16]||(e[16]=l=>s.$emit("generate-avatar-prompt-system"))}," ✨ Générer le Prompt Système de l'avatar ")]),t.iframeUrl?(G(),W("div",y0,[e[73]||(e[73]=f("p",{class:"fw-bold"},"Aperçu :",-1)),e[74]||(e[74]=f("iframe",{id:"rpm-frame",allow:"camera *; microphone *",src:"https://readyplayer.me/avatar?frameApi",style:{width:"100%",height:"600px",border:"none"}},null,-1)),f("div",b0,[e[68]||(e[68]=f("p",{class:"form-label"},"Fichier GLB de l'avatar :",-1)),f("div",S0,[ct(f("input",{"onUpdate:modelValue":e[17]||(e[17]=l=>t.avatar.glbUrl=l),onPaste:e[18]||(e[18]=l=>r.onGlbUrlPaste(l)),onInput:e[19]||(e[19]=l=>r.onGlbUrlInput(l.target.value)),class:We(["form-control",{"border-primary bg-light":i.glbProcessing,"border-success bg-success-subtle":r.isLocalGlbFile}]),placeholder:"Collez votre lien ReadyPlayerMe ici...",disabled:i.glbProcessing},null,42,M0),[[It,t.avatar.glbUrl]]),i.glbProcessing?(G(),W("div",T0,e[64]||(e[64]=[f("i",{class:"fas fa-spinner fa-spin text-primary"},null,-1)]))):r.isLocalGlbFile?(G(),W("div",E0,e[65]||(e[65]=[f("i",{class:"fas fa-check-circle text-success"},null,-1)]))):Ie("",!0)]),i.glbProcessing?(G(),W("div",A0,e[66]||(e[66]=[f("i",{class:"fas fa-download me-2"},null,-1),it(" Téléchargement et sauvegarde en cours... ")]))):r.isLocalGlbFile?(G(),W("div",w0,[e[67]||(e[67]=f("i",{class:"fas fa-check-circle me-2"},null,-1)),it(" Fichier GLB sauvegardé : "+he(r.getFileName(t.avatar.glbUrl)),1)])):Ie("",!0)]),f("div",C0,[f("button",{onClick:e[20]||(e[20]=(...l)=>r.goToVoiceTab&&r.goToVoiceTab(...l)),class:We(["btn btn-primary btn-lg px-4 py-3",{"opacity-50":!r.isLocalGlbFile}]),disabled:!r.isLocalGlbFile},[e[69]||(e[69]=f("i",{class:"fas fa-microphone me-2"},null,-1)),it(" "+he(r.isLocalGlbFile?"Configurer la voix":"Sauvegardez d'abord votre avatar"),1)],10,R0),r.isLocalGlbFile?(G(),W("p",I0,e[71]||(e[71]=[f("i",{class:"fas fa-check-circle me-1"},null,-1),it(" Avatar prêt ! Passez à la configuration vocale ")]))):(G(),W("p",P0,e[70]||(e[70]=[f("i",{class:"fas fa-info-circle me-1"},null,-1),it(" Collez d'abord votre lien GLB ReadyPlayerMe pour continuer ")])))]),f("div",L0,[f("button",{onClick:e[21]||(e[21]=(...l)=>r.goToSandbox3D&&r.goToSandbox3D(...l)),class:We(["btn btn-outline-dark px-4 py-2",{"opacity-50":!r.isLocalGlbFile}]),disabled:!r.isLocalGlbFile},[e[72]||(e[72]=f("i",{class:"fas fa-cube me-2"},null,-1)),it(" "+he(r.isLocalGlbFile?"Voir en 3D":"Avatar non prêt"),1)],10,D0)]),e[75]||(e[75]=it("> "))])):Ie("",!0)],64)):Ie("",!0),t.avatarTab==="image"?(G(),W(_t,{key:1},[e[85]||(e[85]=f("iframe",{id:"rpm-frame",allow:"camera *; microphone *",src:"https://braindcode-startup-studio.readyplayer.me/avatar?frameApi&photoUpload",style:{width:"100%",height:"600px",border:"none"}},null,-1)),f("div",U0,[e[80]||(e[80]=f("p",{class:"form-label"},"Fichier GLB de l'avatar :",-1)),f("div",N0,[ct(f("input",{"onUpdate:modelValue":e[22]||(e[22]=l=>t.avatar.glbUrl=l),onPaste:e[23]||(e[23]=l=>r.onGlbUrlPaste(l)),onInput:e[24]||(e[24]=l=>r.onGlbUrlInput(l.target.value)),class:We(["form-control",{"border-primary bg-light":i.glbProcessing,"border-success bg-success-subtle":r.isLocalGlbFile}]),placeholder:"Collez votre lien ReadyPlayerMe ici...",disabled:i.glbProcessing},null,42,F0),[[It,t.avatar.glbUrl]]),i.glbProcessing?(G(),W("div",O0,e[76]||(e[76]=[f("i",{class:"fas fa-spinner fa-spin text-primary"},null,-1)]))):r.isLocalGlbFile?(G(),W("div",k0,e[77]||(e[77]=[f("i",{class:"fas fa-check-circle text-success"},null,-1)]))):Ie("",!0)]),i.glbProcessing?(G(),W("div",B0,e[78]||(e[78]=[f("i",{class:"fas fa-download me-2"},null,-1),it(" Téléchargement et sauvegarde en cours... ")]))):r.isLocalGlbFile?(G(),W("div",V0,[e[79]||(e[79]=f("i",{class:"fas fa-check-circle me-2"},null,-1)),it(" Fichier GLB sauvegardé : "+he(r.getFileName(t.avatar.glbUrl)),1)])):Ie("",!0)]),f("div",z0,[f("button",{onClick:e[25]||(e[25]=(...l)=>r.goToVoiceTab&&r.goToVoiceTab(...l)),class:We(["btn btn-primary btn-lg px-4 py-3",{"opacity-50":!r.isLocalGlbFile}]),disabled:!r.isLocalGlbFile},[e[81]||(e[81]=f("i",{class:"fas fa-microphone me-2"},null,-1)),it(" "+he(r.isLocalGlbFile?"Configurer la voix":"Sauvegardez d'abord votre avatar"),1)],10,H0),r.isLocalGlbFile?(G(),W("p",W0,e[83]||(e[83]=[f("i",{class:"fas fa-check-circle me-1"},null,-1),it(" Avatar prêt ! Passez à la configuration vocale ")]))):(G(),W("p",G0,e[82]||(e[82]=[f("i",{class:"fas fa-info-circle me-1"},null,-1),it(" Collez d'abord votre lien GLB ReadyPlayerMe pour continuer ")])))]),f("div",X0,[f("button",{onClick:e[26]||(e[26]=(...l)=>r.goToThreeTab&&r.goToThreeTab(...l)),class:We(["btn btn-outline-dark px-4 py-2",{"opacity-50":!r.isLocalGlbFile}]),disabled:!r.isLocalGlbFile},[e[84]||(e[84]=f("i",{class:"fas fa-cube me-2"},null,-1)),it(" "+he(r.isLocalGlbFile?"Voir en 3D":"Avatar non prêt"),1)],10,q0)])],64)):Ie("",!0),t.avatarTab==="voix"?(G(),W("div",j0,[e[108]||(e[108]=_s('<div class="text-center mb-4" data-v-7d94b60d><div class="alert alert-info d-inline-flex align-items-center mb-3" data-v-7d94b60d><i class="fas fa-sync-alt text-primary me-2 fa-spin" data-v-7d94b60d></i><span class="small" data-v-7d94b60d>L&#39;IA synchronisera automatiquement votre voix avec chaque slide</span></div><h4 class="fw-semibold" data-v-7d94b60d>Choisir, importer ou créer une voix IA</h4></div>',1)),f("div",Y0,[e[88]||(e[88]=f("h5",{class:"fw-semibold text-secondary mb-3"},"Voix IA disponibles",-1)),t.isLoading?(G(),W("div",K0,e[86]||(e[86]=[f("i",{class:"fas fa-spinner fa-spin fa-3x text-primary"},null,-1),f("p",{class:"mt-3 text-muted"},"Chargement des voix IA...",-1)]))):t.resembleVoices.length>0?(G(),W("div",Z0,[(G(!0),W(_t,null,Et(t.resembleVoices,l=>(G(),W("div",{key:l.id,class:"col-md-3"},[f("div",{class:We(["voice-card h-100",{"voice-selected":t.voix.selectedVoice===l.id}])},[f("div",J0,[f("div",{class:We(["avatar-circle",r.getAvatarClass(l.gender)])},[f("i",{class:We(r.getAvatarIcon(l.gender))},null,2)],2)]),f("h6",$0,he(l.name),1),f("p",Q0,he(l.description),1),f("div",ey,[f("span",ty,he(l.language),1)]),f("div",ny,[f("button",{class:"btn btn-outline-primary btn-sm",onClick:c=>r.playResembleVoice(l.id),disabled:t.voix.isPlaying},[!t.voix.isPlaying||t.voix.playingVoice!==l.id?(G(),W("i",sy)):t.voix.playingVoice===l.id?(G(),W("i",ry)):Ie("",!0),it(" "+he(t.voix.isPlaying&&t.voix.playingVoice===l.id?"Lecture...":"Écouter"),1)],8,iy),f("button",{class:"btn btn-primary btn-sm",onClick:c=>r.selectVoice(l.id,"resemble")}," Sélectionner ",8,oy)])],2)]))),128))])):(G(),W("div",ay,e[87]||(e[87]=[f("i",{class:"fas fa-exclamation-circle fa-2x mb-3"},null,-1),f("p",null,"Aucune voix IA disponible",-1)])))]),f("div",ly,[f("div",cy,[e[90]||(e[90]=f("h5",{class:"fw-semibold text-secondary"},"Mes voix personnalisées",-1)),f("button",{onClick:e[27]||(e[27]=(...l)=>r.loadCustomVoices&&r.loadCustomVoices(...l)),class:"btn btn-outline-secondary btn-sm"},e[89]||(e[89]=[f("i",{class:"fas fa-refresh me-1"},null,-1),it(" Actualiser ")]))]),t.customVoicesLoading?(G(),W("div",uy,e[91]||(e[91]=[f("i",{class:"fas fa-spinner fa-spin fa-3x text-success"},null,-1),f("p",{class:"mt-3 text-muted"},"Chargement des voix personnalisées...",-1)]))):t.customVoices.length>0?(G(),W("div",dy,[(G(!0),W(_t,null,Et(t.customVoices,l=>(G(),W("div",{key:l.id,class:"col-md-3"},[f("div",{class:We(["voice-card voice-card-custom h-100",{"voice-selected":t.voix.selectedVoice===l.id}])},[e[92]||(e[92]=f("div",{class:"voice-avatar mb-3"},[f("div",{class:"avatar-circle bg-success bg-opacity-25 text-success"},[f("i",{class:"fas fa-microphone"})])],-1)),f("h6",hy,he(l.voice_name),1),f("p",fy,he(l.voice_description),1),f("div",py,[f("span",my,he(l.language||"fr"),1),f("small",gy,he(l.created_at),1)]),f("div",_y,[f("button",{class:"btn btn-outline-success btn-sm",onClick:c=>r.playCustomVoice(l),disabled:t.voix.isPlaying},[!t.voix.isPlaying||t.voix.playingVoice!==l.id?(G(),W("i",xy)):t.voix.playingVoice===l.id?(G(),W("i",yy)):Ie("",!0),it(" "+he(t.voix.isPlaying&&t.voix.playingVoice===l.id?"Lecture...":"Écouter"),1)],8,vy),f("button",{class:"btn btn-success btn-sm",onClick:c=>r.selectVoice(l.id,"custom")}," Sélectionner ",8,by)])],2)]))),128))])):(G(),W("div",Sy,e[93]||(e[93]=[f("i",{class:"fas fa-microphone fa-3x text-muted mb-3"},null,-1),f("h6",{class:"fw-semibold mb-2"},"Aucune voix personnalisée",-1),f("p",{class:"text-muted small"},"Créez votre première voix personnalisée ci-dessous",-1)])))]),f("div",My,[e[97]||(e[97]=f("h5",{class:"fw-semibold mb-4"},"Créer une voix personnalisée",-1)),f("div",Ty,[f("div",Ey,[e[94]||(e[94]=f("label",{class:"form-label"},"Nom de la Voix",-1)),ct(f("input",{type:"text","onUpdate:modelValue":e[28]||(e[28]=l=>t.voix.nom=l),class:"form-control",placeholder:"Ex: Ma voix professionnelle"},null,512),[[It,t.voix.nom]])]),f("div",Ay,[e[95]||(e[95]=f("label",{class:"form-label"},"Langue",-1)),ct(f("select",{"onUpdate:modelValue":e[29]||(e[29]=l=>t.voix.langue=l),class:"form-select"},[(G(!0),W(_t,null,Et(t.languesDisponibles,l=>(G(),W("option",{key:l.value,value:l.value},he(l.label),9,wy))),128))],512),[[Vi,t.voix.langue]])])]),f("div",Cy,[e[96]||(e[96]=f("label",{class:"form-label"},"Description de la Voix",-1)),ct(f("textarea",{"onUpdate:modelValue":e[30]||(e[30]=l=>t.voix.description=l),rows:"3",class:"form-control",placeholder:"Décrivez le style et l'usage de cette voix..."},null,512),[[It,t.voix.description]])]),f("div",Ry,[f("div",{class:We(["upload-area border-2 border-dashed rounded p-4",{"border-success bg-success-subtle":t.voix.customVoiceFile}]),onClick:e[32]||(e[32]=l=>s.$refs.fileInput.click())},[f("div",Py,[f("i",{class:We(["fas fa-cloud-upload-alt fa-3x mb-3",t.voix.customVoiceFile?"text-success":"text-muted"])},null,2),f("h6",{class:We(t.voix.customVoiceFile?"text-success":"")},he(t.voix.customVoiceFile?t.voix.customVoiceFile.name:"Glissez votre fichier audio ici"),3),f("p",Iy,he(t.voix.customVoiceFile?"Fichier sélectionné":"Formats supportés: MP3, WAV (max 10MB)"),1)]),f("input",{ref:"fileInput",type:"file",accept:".mp3,.wav",onChange:e[31]||(e[31]=(...l)=>r.handleVoiceUpload&&r.handleVoiceUpload(...l)),class:"d-none"},null,544)],2)]),f("div",Ly,[f("button",{class:"btn btn-success btn-lg px-5",onClick:e[33]||(e[33]=(...l)=>r.createCustomVoice&&r.createCustomVoice(...l)),disabled:!t.voix.customVoiceFile||i.voiceCreating},[i.voiceCreating?(G(),W("i",Uy)):(G(),W("i",Ny)),it(" "+he(i.voiceCreating?"Création en cours...":t.voix.customVoiceFile?"Créer ma voix":"Sélectionner un fichier"),1)],8,Dy)])]),t.voix.selectedVoice?(G(),W("div",Fy,[e[104]||(e[104]=f("h5",{class:"fw-semibold text-center mb-4"},"Réglages vocaux",-1)),f("div",Oy,[f("div",ky,[f("div",By,[e[99]||(e[99]=f("label",{class:"setting-label fw-semibold"},"Vitesse",-1)),f("div",Vy,[f("input",{type:"range",min:"0",max:"2",step:"0.1",value:t.voix.settings.vitesse,onInput:e[34]||(e[34]=l=>r.updateVoixSettings("vitesse",l.target.value)),class:"voice-slider form-range"},null,40,zy),e[98]||(e[98]=f("div",{class:"slider-labels d-flex justify-content-between small text-muted"},[f("span",null,"Lent"),f("span",null,"Normal"),f("span",null,"Rapide")],-1))]),f("div",Hy,[f("small",Gy,he(r.getSliderLabel("vitesse",t.voix.settings.vitesse)),1)])])]),f("div",Wy,[f("div",Xy,[e[101]||(e[101]=f("label",{class:"setting-label fw-semibold"},"Intonation",-1)),f("div",qy,[f("input",{type:"range",min:"0",max:"2",step:"0.1",value:t.voix.settings.intonation,onInput:e[35]||(e[35]=l=>r.updateVoixSettings("intonation",l.target.value)),class:"voice-slider form-range"},null,40,jy),e[100]||(e[100]=f("div",{class:"slider-labels d-flex justify-content-between small text-muted"},[f("span",null,"Neutre"),f("span",null,"Équilibré"),f("span",null,"Expressif")],-1))]),f("div",Yy,[f("small",Ky,he(r.getSliderLabel("intonation",t.voix.settings.intonation)),1)])])]),f("div",Zy,[f("div",Jy,[e[103]||(e[103]=f("label",{class:"setting-label fw-semibold"},"Volume",-1)),f("div",$y,[f("input",{type:"range",min:"0",max:"2",step:"0.1",value:t.voix.settings.volume,onInput:e[36]||(e[36]=l=>r.updateVoixSettings("volume",l.target.value)),class:"voice-slider form-range"},null,40,Qy),e[102]||(e[102]=f("div",{class:"slider-labels d-flex justify-content-between small text-muted"},[f("span",null,"Faible"),f("span",null,"Normal"),f("span",null,"Fort")],-1))]),f("div",eb,[f("small",tb,he(r.getSliderLabel("volume",t.voix.settings.volume)),1)])])])]),t.voix.selectedVoice?(G(),W("div",nb,[f("button",{class:"btn btn-outline-primary btn-sm",onClick:e[37]||(e[37]=(...l)=>r.playSelectedVoice&&r.playSelectedVoice(...l)),disabled:t.voix.isPlaying},[t.voix.isPlaying?(G(),W("i",rb)):(G(),W("i",sb)),it(" "+he(t.voix.isPlaying?"Lecture en cours...":"Tester avec mes paramètres"),1)],8,ib)])):Ie("",!0)])):Ie("",!0),f("div",ob,[e[105]||(e[105]=f("label",{class:"form-label"},"Choisir la Langue",-1)),ct(f("select",{class:"form-select","onUpdate:modelValue":e[38]||(e[38]=l=>t.voix.langue=l),onChange:e[39]||(e[39]=l=>r.updateVoixSettings("langue",l.target.value))},[(G(!0),W(_t,null,Et(t.languesDisponibles,l=>(G(),W("option",{key:l.value,value:l.value},he(l.label),9,ab))),128))],544),[[Vi,t.voix.langue]])]),t.voix.selectedVoice&&r.selectedVoiceInfo?(G(),W("div",lb,[f("div",cb,[f("div",null,[e[106]||(e[106]=f("h6",{class:"fw-semibold mb-2"},[f("i",{class:"fas fa-check-circle me-2"}),it(" Voix sélectionnée ")],-1)),f("p",ub,[it(he(r.selectedVoiceInfo.name||r.selectedVoiceInfo.voice_name)+" ",1),r.selectedVoiceInfo.description||r.selectedVoiceInfo.voice_description?(G(),W("span",db," ("+he(r.selectedVoiceInfo.description||r.selectedVoiceInfo.voice_description)+") ",1)):Ie("",!0)]),f("p",hb,"Langue: "+he(r.afficherNomLangue(r.selectedVoiceInfo.language||t.voix.langue)),1)]),f("button",{class:"btn btn-outline-primary btn-sm",onClick:e[40]||(e[40]=l=>s.$emit("preview-selected-voice")),disabled:t.voix.isPlaying},[t.voix.isPlaying?(G(),W("i",mb)):(G(),W("i",pb)),it(" "+he(t.voix.isPlaying?"Lecture...":"Écouter"),1)],8,fb)])])):Ie("",!0),t.voix.selectedVoice?(G(),W("div",gb,[f("button",{class:"btn btn-info px-4",onClick:e[41]||(e[41]=l=>s.$emit("test-lip-sync"))},e[107]||(e[107]=[f("i",{class:"fas fa-magic me-2"},null,-1),it(" Tester la synchronisation labiale ")]))])):Ie("",!0)])):Ie("",!0),t.avatarTab==="three"?(G(),W(_t,{key:3},[e[110]||(e[110]=f("h5",{class:"fw-bold mb-3"},"Aperçu 3D de l'avatar",-1)),gn(o,{glbUrl:`/storage/${t.avatar.glbUrl}`,audioUrl:((a=t.voiceFromDb)==null?void 0:a.audio_url)||""},null,8,["glbUrl","audioUrl"]),t.voiceFromDb?(G(),W("div",_b,[f("h6",vb,[e[109]||(e[109]=f("i",{class:"fas fa-volume-up me-2"},null,-1)),it(" Voix associée : "+he(t.voiceFromDb.voice_name),1)]),f("p",xb,he(t.voiceFromDb.voice_description),1),f("audio",{src:t.voiceFromDb.audio_url,controls:"",class:"w-100 mt-2"}," Votre navigateur ne supporte pas la lecture audio. ",8,yb)])):Ie("",!0)],64)):Ie("",!0)])}const Sb=Vn(kx,[["render",bb],["__scopeId","data-v-7d94b60d"]]),Mb={name:"Step4Rag",emits:["select-source","files-selected","url-config","internal-config","note-submit","api-config","collab-config"],data(){return{selectedSource:null,urlConfig:{target:"",depth:"single"},urlError:null,_debounceTimer:null,internalConfig:{type:"sheets",url:"",sql:{host:"",port:3306,db:"",user:"",pass:""}},noteConfig:{title:"",content:"",format:"markdown"},apiConfig:{url:"",key:"",structure:""},collabConfig:{platform:"notion",id:"",token:""},accepted:".pdf,.doc,.docx,.txt",files:[],isDragOver:!1,urlConfig:{target:"",depth:"single"},urlError:null,internalConfig:{type:"sheets",url:"",sql:{host:"",port:3306,db:"",user:"",pass:""}},noteConfig:{title:"",content:""},apiConfig:{url:"",key:"",structure:""},collabConfig:{platform:"notion",id:"",token:""},icons:{pdf:`
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <path d="M30 4H14a4 4 0 0 0-4 4v32a4 4 0 0 0 4 4h20a4 4 0 0 0 4-4V12z" fill="#e8f2ff"/>
            <path d="M30 4v8a4 4 0 0 0 4 4h8" fill="none" stroke="#1b78f2" stroke-width="2"/>
            <path d="M13 30h22M13 36h14" stroke="#1b78f2" stroke-width="2"/>
            <rect x="10" y="10" width="18" height="12" rx="2" fill="#1b78f2"/>
            <text x="19" y="20" text-anchor="middle" font-size="8" fill="#fff" font-weight="700">PDF</text>
          </svg>`,globe:`
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M4 24h40M24 4c6 6 9 14 9 20s-3 14-9 20c-6-6-9-14-9-20S18 10 24 4Z" fill="none" stroke="#1b78f2" stroke-width="2"/>
          </svg>`,db:`
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <ellipse cx="24" cy="10" rx="14" ry="6" fill="#1b78f2"/>
            <path d="M10 10v14c0 3.3 6.3 6 14 6s14-2.7 14-6V10" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M10 24c0 3.3 6.3 6 14 6s14-2.7 14-6M10 18c0 3.3 6.3 6 14 6s14-2.7 14-6" fill="none" stroke="#1b78f2" stroke-width="2"/>
          </svg>`,note:`
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <rect x="8" y="6" width="28" height="36" rx="4" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M16 14h12M16 20h16M16 26h10" stroke="#1b78f2" stroke-width="2"/>
            <path d="M36 30l4 8-8-4z" fill="#1b78f2"/>
          </svg>`,code:`
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M19 16l-7 8 7 8M29 16l7 8-7 8" fill="none" stroke="#1b78f2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>`,tools:`
          <svg viewBox="0 0 48 48" width="48" height="48" aria-hidden="true">
            <circle cx="24" cy="24" r="20" fill="#e8f2ff" stroke="#1b78f2" stroke-width="2"/>
            <path d="M28 14l6 6-12 12-6-6z" fill="none" stroke="#1b78f2" stroke-width="2"/>
            <path d="M20 28l-6 6" stroke="#1b78f2" stroke-width="2" stroke-linecap="round"/>
          </svg>`}}},computed:{canSubmitUrl(){return this.urlConfig.target&&!this.urlError},urlStatusMsg(){return this.urlError?"":"👍 URL valide — sera incluse automatiquement lors de l’ajout de l’agent"}},methods:{_debounce(s,e=600){clearTimeout(this._debounceTimer),this._debounceTimer=setTimeout(s,e)},onNoteInput(){this._debounce(()=>{this.emitNote()})},emitNote(){!this.noteConfig.title&&!this.noteConfig.content||this.$emit("note-submit",{title:(this.noteConfig.title||"").trim(),content:(this.noteConfig.content||"").trim(),format:this.noteConfig.format||"markdown"})},resetNote(){this.noteConfig={title:"",content:"",format:"markdown"},this.$emit("note-submit",{title:"",content:"",format:"markdown"})},emitApi(){this.$emit("api-config",{url:(this.apiConfig.url||"").trim(),api_key:(this.apiConfig.key||"").trim(),structure:this.apiConfig.structure||""})},resetApi(){this.apiConfig={url:"",key:"",structure:""},this.$emit("api-config",{url:"",api_key:"",structure:""})},emitInternalAuto(){var t,n;const s=((t=this.internalConfig)==null?void 0:t.type)||null,e={type:s,url:((n=this.internalConfig)==null?void 0:n.url)||null};if(s==="sql"){const i=this.internalConfig.sql||{};e.sql={host:i.host||"",port:Number.isFinite(+i.port)?+i.port:3306,db:i.db||"",user:i.user||"",pass:i.pass||""}}this.$emit("internal-config",e)},onSelect(s){this.selectedSource=s,this.$emit("select-source",s)},formatDate(s){try{return new Date(s).toLocaleDateString("fr-FR")}catch{return s||"—"}},onDepthChange(){this.validateUrl(),this.autoSendUrl()},onUrlInput(){this._debounce(()=>{this.validateUrl(),this.autoSendUrl()})},validateUrl(){this.urlError=null;const s=this.urlConfig.target;if(s)try{const e=new URL(s);if(!/^https?:$/.test(e.protocol))throw new Error}catch{this.urlError="URL invalide. Utilisez un lien commençant par http(s)://"}},autoSendUrl(){!this.urlConfig.target||this.urlError||this.$emit("url-config",{...this.urlConfig})},resetUrl(){this.urlConfig={target:"",depth:"single"},this.urlError=null,this.$emit("url-config",{target:"",depth:"single"})},triggerFileSelect(){var s;(s=this.$refs.fileInput)==null||s.click()},onFilesSelected(s){const e=Array.from(s.target.files||[]);this.addFiles(e),s.target.value=""},onDragOver(){this.isDragOver=!0},onDragLeave(){this.isDragOver=!1},onDrop(s){this.isDragOver=!1;const e=Array.from(s.dataTransfer.files||[]);this.files=[...this.files,...e],this.$emit("files-change",this.files)},async emitFiles(){var e;if(!this.files.length)return;const s=new FormData;s.append("file",this.files[0]),s.append("agent_i_a_id",this.agentId),s.append("type_label","Fichier PDF"),s.append("config",JSON.stringify({}));try{const t=await axios.post("/api/agentia/rag-sources/file",s,{headers:{"Content-Type":"multipart/form-data"}});console.log("Fichier envoyé",t.data)}catch(t){console.error(((e=t.response)==null?void 0:e.data)||t)}},addFiles(s){const t=["pdf","doc","docx","txt"],n=[];for(const i of s){const r=(i.name.split(".").pop()||"").toLowerCase();if(!t.includes(r)){console.warn(`Extension non autorisée: ${i.name}`);continue}if(i.size>52428800){console.warn(`Fichier trop volumineux (>50MB): ${i.name}`);continue}n.push(i)}this.files=[...this.files,...n],this.$emit("files-selected",this.files)},humanSize(s){if(!s&&s!==0)return"";const e=1024,t=["B","KB","MB","GB"],n=Math.floor(Math.log(s)/Math.log(e));return(s/Math.pow(e,n)).toFixed(1)+" "+t[n]},validateUrl(){this.urlError=null;const s=this.urlConfig.target;if(s)try{const e=new URL(s);if(!/^https?:$/.test(e.protocol))throw new Error}catch{this.urlError="URL invalide. Utilisez un lien commençant par http(s)://"}},emitUrlConfig(){this.validateUrl(),!this.urlError&&this.$emit("url-config",{...this.urlConfig})},resetUrl(){this.urlConfig={target:"",depth:"single"},this.urlError=null},emitInternal(){this.$emit("internal-config",JSON.parse(JSON.stringify(this.internalConfig)))},resetInternal(){this.internalConfig={type:"sheets",url:"",sql:{host:"",port:3306,db:"",user:"",pass:""}}},clearFiles(){this.files=[],this.$emit("files-change",this.files)},emitNote(){this.$emit("note-submit",{...this.noteConfig})},resetNote(){this.noteConfig={title:"",content:""}},emitApi(){this.$emit("api-config",{...this.apiConfig})},resetApi(){this.apiConfig={url:"",key:"",structure:""}},emitCollab(){this.$emit("collab-config",{...this.collabConfig})},resetCollab(){this.collabConfig={platform:"notion",id:"",token:""}}},watch:{"internalConfig.type"(s){this._debounce(()=>this.emitInternalAuto())},"internalConfig.url"(s){this._debounce(()=>this.emitInternalAuto())},apiConfig:{deep:!0,handler(){this._debounce(()=>this.emitApi())}},"internalConfig.sql.host"(s){this._debounce(()=>this.emitInternalAuto())},"internalConfig.sql.port"(s){this._debounce(()=>this.emitInternalAuto())},"internalConfig.sql.db"(s){this._debounce(()=>this.emitInternalAuto())},"internalConfig.sql.user"(s){this._debounce(()=>this.emitInternalAuto())},"internalConfig.sql.pass"(s){this._debounce(()=>this.emitInternalAuto())}}},Tb={class:"row"},Eb={class:"rag-wrapper"},Ab={class:"rag-grid"},wb=["innerHTML"],Cb=["innerHTML"],Rb=["innerHTML"],Pb=["innerHTML"],Ib=["innerHTML"],Lb=["innerHTML"],Db={key:0,class:"config-wrapper mt-4"},Ub=["accept"],Nb={key:0,class:"file-list mt-3"},Fb={class:"fname"},Ob={class:"fsize"},kb={class:"mt-3 d-flex gap-2"},Bb=["disabled"],Vb={key:1,class:"config-wrapper mt-4"},zb={key:0,class:"invalid-feedback mb-2"},Hb={key:1,class:"text-muted d-block mb-2"},Gb={class:"select-wrap mb-1"},Wb={class:"mt-2"},Xb={key:2,class:"config-wrapper mt-4"},qb={class:"select-wrap mb-3"},jb={class:"mt-3 d-flex gap-2"},Yb={key:3,class:"config-wrapper mt-4"},Kb={class:"mt-3 d-flex gap-2"},Zb={key:4,class:"config-wrapper mt-4"},Jb={class:"mt-3 d-flex gap-2"},$b={key:5,class:"config-wrapper mt-4"},Qb={class:"select-wrap mb-3"},eS={class:"mt-2 d-flex gap-2"};function tS(s,e,t,n,i,r){return G(),W("div",Tb,[e[82]||(e[82]=f("div",{class:"col-12 mb-4"},[f("h4",null,"Sources de Connaissances RAG"),f("p",{class:"text-orange fw-bold"}," Ajoutez les sources de données que votre agent IA pourra utiliser pour enrichir ses réponses ")],-1)),f("div",Eb,[e[81]||(e[81]=_s('<div class="rag-header d-flex align-items-start gap-3 mb-4" data-v-56c875ab><div class="rag-badge" data-v-56c875ab><span class="plus" data-v-56c875ab>+</span></div><div data-v-56c875ab><h4 class="mb-1 fw-semibold" data-v-56c875ab>Ajouter une Source de Connaissances</h4><p class="text-muted mb-0" data-v-56c875ab>Sélectionnez le type de contenu à indexer pour votre agent IA</p></div></div>',1)),f("div",Ab,[f("button",{class:We(["rag-card",{active:i.selectedSource==="files"}]),onClick:e[0]||(e[0]=o=>r.onSelect("files")),type:"button"},[f("span",{class:"icon",innerHTML:i.icons.pdf},null,8,wb),e[38]||(e[38]=f("div",{class:"title"},"Fichiers",-1)),e[39]||(e[39]=f("div",{class:"sub"},"PDF",-1)),e[40]||(e[40]=f("div",{class:"desc"},"Documents, manuels, guides",-1))],2),f("button",{class:We(["rag-card",{active:i.selectedSource==="url"}]),onClick:e[1]||(e[1]=o=>r.onSelect("url")),type:"button"},[f("span",{class:"icon",innerHTML:i.icons.globe},null,8,Cb),e[41]||(e[41]=f("div",{class:"title"},"URL / Site Web",-1)),e[42]||(e[42]=f("div",{class:"sub"},"Pages web, articles",-1)),e[43]||(e[43]=f("div",{class:"desc"},"Documentation en ligne",-1))],2),f("button",{class:We(["rag-card",{active:i.selectedSource==="internal"}]),onClick:e[2]||(e[2]=o=>r.onSelect("internal")),type:"button"},[f("span",{class:"icon",innerHTML:i.icons.db},null,8,Rb),e[44]||(e[44]=f("div",{class:"title"},"Données Internes",-1)),e[45]||(e[45]=f("div",{class:"sub"},"CRM, Google Sheets",-1)),e[46]||(e[46]=f("div",{class:"desc"},"Bases de données",-1))],2),f("button",{class:We(["rag-card",{active:i.selectedSource==="notes"}]),onClick:e[3]||(e[3]=o=>r.onSelect("notes")),type:"button"},[f("span",{class:"icon",innerHTML:i.icons.note},null,8,Pb),e[47]||(e[47]=f("div",{class:"title"},"Notes Manuelles",-1)),e[48]||(e[48]=f("div",{class:"sub"},"Instructions spécifiques",-1)),e[49]||(e[49]=f("div",{class:"desc"},"Règles métier",-1))],2),f("button",{class:We(["rag-card",{active:i.selectedSource==="api"}]),onClick:e[4]||(e[4]=o=>r.onSelect("api")),type:"button"},[f("span",{class:"icon",innerHTML:i.icons.code},null,8,Ib),e[50]||(e[50]=f("div",{class:"title"},"API Externe",-1)),e[51]||(e[51]=f("div",{class:"sub"},"Données JSON",-1)),e[52]||(e[52]=f("div",{class:"desc"},"Intégrations temps réel",-1))],2),f("button",{class:We(["rag-card",{active:i.selectedSource==="collab"}]),onClick:e[5]||(e[5]=o=>r.onSelect("collab")),type:"button"},[f("span",{class:"icon",innerHTML:i.icons.tools},null,8,Lb),e[53]||(e[53]=f("div",{class:"title"},"Notion / Airtable",-1)),e[54]||(e[54]=f("div",{class:"sub"},"Bases de connaissances",-1)),e[55]||(e[55]=f("div",{class:"desc"},"Outils collaboratifs",-1))],2)]),i.selectedSource==="files"?(G(),W("div",Db,[e[57]||(e[57]=f("div",{class:"config-title"},"Configuration - Fichiers",-1)),f("div",{class:We(["dropzone",{"is-dragover":i.isDragOver}]),onDragover:e[7]||(e[7]=lr((...o)=>r.onDragOver&&r.onDragOver(...o),["prevent"])),onDragleave:e[8]||(e[8]=lr((...o)=>r.onDragLeave&&r.onDragLeave(...o),["prevent"])),onDrop:e[9]||(e[9]=lr((...o)=>r.onDrop&&r.onDrop(...o),["prevent"])),onClick:e[10]||(e[10]=(...o)=>r.triggerFileSelect&&r.triggerFileSelect(...o))},[e[56]||(e[56]=_s('<div class="cloud" data-v-56c875ab> ...svg... </div><div class="dz-text" data-v-56c875ab><div class="dz-bold" data-v-56c875ab>Glissez vos fichiers ici</div><div class="dz-or" data-v-56c875ab>ou cliquez pour sélectionner</div><div class="dz-small" data-v-56c875ab>PDF, DOCX, TXT — Max 50 MB par fichier</div></div>',2)),f("input",{ref:"fileInput",type:"file",class:"d-none",multiple:"",accept:i.accepted,onChange:e[6]||(e[6]=(...o)=>r.onFilesSelected&&r.onFilesSelected(...o))},null,40,Ub)],34),i.files.length?(G(),W("ul",Nb,[(G(!0),W(_t,null,Et(i.files,(o,a)=>(G(),W("li",{key:a,class:"file-item"},[f("span",Fb,he(o.name),1),f("span",Ob,he(r.humanSize(o.size)),1)]))),128))])):Ie("",!0),f("div",kb,[f("button",{class:"btn btn-outline-secondary",onClick:e[11]||(e[11]=(...o)=>r.clearFiles&&r.clearFiles(...o)),disabled:!i.files.length},"Effacer",8,Bb)])])):Ie("",!0),i.selectedSource==="url"?(G(),W("div",Vb,[e[60]||(e[60]=f("div",{class:"config-title"},"Configuration - URL / Site Web",-1)),e[61]||(e[61]=f("label",{class:"form-label small mb-1"},"URL à indexer",-1)),ct(f("input",{"onUpdate:modelValue":e[12]||(e[12]=o=>i.urlConfig.target=o),class:We(["form-control","mb-1",i.urlError?"is-invalid":""]),type:"text",placeholder:"https://votre-site.com/documentation",onInput:e[13]||(e[13]=(...o)=>r.onUrlInput&&r.onUrlInput(...o))},null,34),[[It,i.urlConfig.target,void 0,{trim:!0}]]),i.urlError?(G(),W("div",zb,he(i.urlError),1)):i.urlConfig.target?(G(),W("small",Hb,he(r.urlStatusMsg),1)):Ie("",!0),e[62]||(e[62]=f("label",{class:"form-label small mb-1"},"Profondeur de crawl",-1)),f("div",Gb,[ct(f("select",{"onUpdate:modelValue":e[14]||(e[14]=o=>i.urlConfig.depth=o),class:"form-select",onChange:e[15]||(e[15]=(...o)=>r.onDepthChange&&r.onDepthChange(...o))},e[58]||(e[58]=[_s('<option value="single" data-v-56c875ab>Page unique</option><option value="site" data-v-56c875ab>Tout le site (même domaine)</option><option value="path" data-v-56c875ab>Même chemin (sous-pages)</option><option value="sitemap" data-v-56c875ab>Depuis sitemap.xml</option><option value="levels-2" data-v-56c875ab>Jusqu’à 2 niveaux</option><option value="levels-3" data-v-56c875ab>Jusqu’à 3 niveaux</option>',6)]),544),[[Vi,i.urlConfig.depth]]),e[59]||(e[59]=f("span",{class:"chev"},"▾",-1))]),f("div",Wb,[f("button",{class:"btn btn-outline-secondary",onClick:e[16]||(e[16]=(...o)=>r.resetUrl&&r.resetUrl(...o))},"Réinitialiser")])])):Ie("",!0),i.selectedSource==="internal"?(G(),W("div",Xb,[e[65]||(e[65]=f("div",{class:"config-title"},"Configuration - Données Internes",-1)),e[66]||(e[66]=f("label",{class:"form-label small mb-1"},"Type de source",-1)),f("div",qb,[ct(f("select",{"onUpdate:modelValue":e[17]||(e[17]=o=>i.internalConfig.type=o),class:"form-select"},e[63]||(e[63]=[f("option",{value:"sheets"},"Google Sheets",-1)]),512),[[Vi,i.internalConfig.type]]),e[64]||(e[64]=f("span",{class:"chev"},"▾",-1))]),e[67]||(e[67]=f("label",{class:"form-label small mb-1"},"URL ou ID de la source",-1)),ct(f("input",{"onUpdate:modelValue":e[18]||(e[18]=o=>i.internalConfig.url=o),type:"text",class:"form-control mb-3",placeholder:"ID Google Sheets / Chaîne de connexion / URL API"},null,512),[[It,i.internalConfig.url,void 0,{trim:!0}]]),f("div",jb,[f("button",{class:"btn btn-outline-secondary",onClick:e[19]||(e[19]=(...o)=>r.resetInternal&&r.resetInternal(...o))},"Réinitialiser")])])):Ie("",!0),i.selectedSource==="notes"?(G(),W("div",Yb,[e[68]||(e[68]=f("div",{class:"config-title"},"Configuration - Notes Manuelles",-1)),e[69]||(e[69]=f("label",{class:"form-label small mb-1"},"Titre de la note",-1)),ct(f("input",{"onUpdate:modelValue":e[20]||(e[20]=o=>i.noteConfig.title=o),onInput:e[21]||(e[21]=(...o)=>r.onNoteInput&&r.onNoteInput(...o)),type:"text",class:"form-control mb-3",placeholder:"Ex: Règles de pricing"},null,544),[[It,i.noteConfig.title,void 0,{trim:!0}]]),e[70]||(e[70]=f("label",{class:"form-label small mb-1"},"Contenu",-1)),ct(f("textarea",{"onUpdate:modelValue":e[22]||(e[22]=o=>i.noteConfig.content=o),onInput:e[23]||(e[23]=(...o)=>r.onNoteInput&&r.onNoteInput(...o)),class:"form-control",rows:"6",placeholder:"Saisissez vos instructions ou règles métier..."},null,544),[[It,i.noteConfig.content,void 0,{trim:!0}]]),f("div",Kb,[f("button",{class:"btn btn-outline-secondary",onClick:e[24]||(e[24]=(...o)=>r.resetNote&&r.resetNote(...o))},"Effacer")])])):Ie("",!0),i.selectedSource==="api"?(G(),W("div",Zb,[e[71]||(e[71]=f("div",{class:"config-title"},"Configuration - API Externe",-1)),e[72]||(e[72]=f("label",{class:"form-label small mb-1"},"URL de l'API",-1)),ct(f("input",{"onUpdate:modelValue":e[25]||(e[25]=o=>i.apiConfig.url=o),onInput:e[26]||(e[26]=(...o)=>r.emitApi&&r.emitApi(...o)),type:"text",class:"form-control mb-3",placeholder:"https://api.exemple.com/data"},null,544),[[It,i.apiConfig.url,void 0,{trim:!0}]]),e[73]||(e[73]=f("label",{class:"form-label small mb-1"},"Clé d’authentification",-1)),ct(f("input",{"onUpdate:modelValue":e[27]||(e[27]=o=>i.apiConfig.key=o),onInput:e[28]||(e[28]=(...o)=>r.emitApi&&r.emitApi(...o)),type:"text",class:"form-control mb-3",placeholder:"Votre clé API"},null,544),[[It,i.apiConfig.key,void 0,{trim:!0}]]),e[74]||(e[74]=f("label",{class:"form-label small mb-1"},"Structure JSON attendue",-1)),ct(f("textarea",{"onUpdate:modelValue":e[29]||(e[29]=o=>i.apiConfig.structure=o),onInput:e[30]||(e[30]=(...o)=>r.emitApi&&r.emitApi(...o)),class:"form-control",rows:"4",placeholder:'{"data":[{"title":"","content":""}]}'},null,544),[[It,i.apiConfig.structure,void 0,{trim:!0}]]),f("div",Jb,[f("button",{class:"btn btn-outline-secondary",onClick:e[31]||(e[31]=(...o)=>r.resetApi&&r.resetApi(...o))},"Réinitialiser")])])):Ie("",!0),i.selectedSource==="collab"?(G(),W("div",$b,[e[77]||(e[77]=f("div",{class:"config-title"},"Configuration - Notion / Airtable",-1)),e[78]||(e[78]=f("label",{class:"form-label small mb-1"},"Plateforme",-1)),f("div",Qb,[ct(f("select",{"onUpdate:modelValue":e[32]||(e[32]=o=>i.collabConfig.platform=o),class:"form-select"},e[75]||(e[75]=[f("option",{value:"notion"},"Notion",-1)]),512),[[Vi,i.collabConfig.platform]]),e[76]||(e[76]=f("span",{class:"chev"},"▾",-1))]),e[79]||(e[79]=f("label",{class:"form-label small mb-1"},"ID de la base / page",-1)),ct(f("input",{"onUpdate:modelValue":e[33]||(e[33]=o=>i.collabConfig.id=o),onInput:e[34]||(e[34]=(...o)=>r.emitCollab&&r.emitCollab(...o)),type:"text",class:"form-control mb-3",placeholder:"ID ou URL de votre base"},null,544),[[It,i.collabConfig.id,void 0,{trim:!0}]]),e[80]||(e[80]=f("label",{class:"form-label small mb-1"},"Token d’accès",-1)),ct(f("input",{"onUpdate:modelValue":e[35]||(e[35]=o=>i.collabConfig.token=o),onInput:e[36]||(e[36]=(...o)=>r.emitCollab&&r.emitCollab(...o)),type:"text",class:"form-control mb-3",placeholder:"Token d'intégration"},null,544),[[It,i.collabConfig.token,void 0,{trim:!0}]]),f("div",eS,[f("button",{class:"btn btn-outline-secondary",onClick:e[37]||(e[37]=(...o)=>r.resetCollab&&r.resetCollab(...o))},"Réinitialiser")])])):Ie("",!0)])])}const nS=Vn(Mb,[["render",tS],["__scopeId","data-v-56c875ab"]]),iS={name:"Step5N8N",props:{previewBase:{type:String,default:""},apiProjectsUrl:{type:String,default:"/api/n8n/projects"},apiProjectWorkflowsBase:{type:String,default:"/api/n8n/projects"},scenarios:{type:Array,default:()=>[]},autoOpenFirstProject:{type:Boolean,default:!0},defaultProjectId:{type:String,default:""},title:{type:String,default:""},mission:{type:String,default:""}},emits:["update:title","update:mission","select-workflow","customize","preview"],setup(s,{emit:e}){const t=rn({get:()=>s.title,set:O=>e("update:title",O)}),n=rn({get:()=>s.mission,set:O=>e("update:mission",O)}),i=(O,Re)=>{var _e,w;return((w=(_e=O==null?void 0:O.response)==null?void 0:_e.data)==null?void 0:w.message)||(O==null?void 0:O.message)||Re},r={personal:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/user.svg",team:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/users.svg",Gmail:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-gmail.svg",Slack:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-slack.svg",Stripe:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-stripe.svg","Google Sheets":"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/file-spreadsheet.svg",Notion:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/brand-notion.svg",PDF:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/file-text.svg",_default:"https://raw.githubusercontent.com/tabler/tabler-icons/refs/heads/master/icons/route.svg"},o=O=>r[O]||r._default,a=O=>String(O||"").replace(/<!--[\s\S]*?-->/g,"").replace(/<\/?[^>]+>/g,"").replace(/[#*_`>]+/g,"").trim(),l=O=>{try{return JSON.stringify(O??{},null,2)}catch{return String(O??"")}};function c(O,Re=""){const _e=a(O||Re||"").replace(/\r\n/g,`
`);if(!_e)return"";const w=/(^|\n)\s*(?:##\s*)?(Objectif|Objectifs|But|Goal|Purpose)\b[^\n]*\n/i,Ze=_e.match(w);if(!Ze)return(_e.split(/\n{2,}/).find(vt=>vt.trim().length)||"").trim();const ve=(Ze.index??0)+Ze[0].length,He=_e.slice(ve),et=/(^|\n)\s*(?:##\s*)?(Webhook|Contrat(?:\s*\([^)]*\))?|Entrée|Inputs?|Exemple|Examples?|Output|Sortie|Notes?)\b/ig.exec(He),ye=et?ve+et.index:_e.length;let Ve=_e.slice(ve,ye).trim();return Ve=Ve.replace(/^\s*json\s*$/im,"").trim(),Ve=Ve.replace(/^\s*[-–•]\s*$/gm,"").trim(),Ve}const u=Mt(!1),d=Mt(""),h=Mt([]),m=Mt(""),_=Mt(""),v=rn(()=>{const O=new Set(h.value.map(Re=>Re.type).filter(Boolean));return Array.from(O)}),g=rn(()=>{const O=m.value.toLowerCase();return h.value.filter(Re=>{const _e=!O||(Re.name||"").toLowerCase().includes(O),w=!_.value||Re.type===_.value;return _e&&w})});async function p(){u.value=!0,d.value="";try{const{data:O}=await mo.get(s.apiProjectsUrl);if(h.value=(O==null?void 0:O.data)??O??[],await uu(),h.value.length>0&&!R.value){let Re=null;s.defaultProjectId&&(Re=h.value.find(_e=>String(_e.id)===String(s.defaultProjectId))||null),!Re&&s.autoOpenFirstProject&&(Re=h.value[0]),Re&&M(Re)}}catch(O){d.value=i(O,"Erreur de chargement des projets")}finally{u.value=!1}}hc(p);const A=Mt(!1),E=Mt(""),b=Mt([]),R=Mt(""),P=Mt(""),I=Mt(0),F=O=>{const Re=Array.isArray(O.tags)?O.tags:[],_e=Re.map(et=>typeof et=="string"?et:(et==null?void 0:et.name)||"").filter(Boolean),w=_e[0]||"Général",Ze=Re.length>1?_e.slice(1):["n8n"],ve=O.params||{},He=Array.isArray(ve==null?void 0:ve.contract)?ve.contract:[],Ee=Array.isArray(ve==null?void 0:ve.nodes_parameters)?ve.nodes_parameters:Array.isArray(O.nodes_parameters)?O.nodes_parameters:[];return{id:String(O.id??O._id??Math.random().toString(36).slice(2)),title:O.name||"Sans nom",domain:w,tools:Ze,icon:o(Ze[0]||w),workflowId:String(O.id??""),previewUrl:O.editorUrl?`${O.editorUrl}?readOnly=true`:"",editorUrl:O.editorUrl||"",descRaw:O.description||"",descText:a(O.description||""),webhookUrl:O.webhook_url||"",webhookTestUrl:O.webhook_test_url||"",webhookMethod:(O.webhook_method||"").toUpperCase(),paramsContract:He,paramsNodes:Ee}};async function M(O){if(!(!O||!O.id)){R.value=O.id,P.value=O.name||"",Z.value="",q.value="",X.clear(),A.value=!0,E.value="",b.value=[];try{const _e=`${s.apiProjectWorkflowsBase.replace(/\/+$/,"")}/${encodeURIComponent(O.id)}/workflows?with_details=1`,{data:w}=await mo.get(_e),Ze=(w==null?void 0:w.data)??w??[];b.value=Ze.map(F),I.value++}catch(Re){E.value=i(Re,"Erreur de chargement des workflows")}finally{A.value=!1}}}const S=Mt("");function C(O){S.value=O.workflowId,e("select-workflow",{workflowId:O.workflowId,name:O.title,editorUrl:O.editorUrl,webhookUrl:O.webhookUrl,webhookTestUrl:O.webhookTestUrl,webhookMethod:O.webhookMethod,contract:O.paramsContract,paramsNodes:O.paramsNodes,projectId:R.value,projectName:P.value}),e("update:title",O.title||"");const _e=c(O.descRaw,O.descText)||O.descText||O.domain||"";e("update:mission",_e)}const Z=Mt(""),q=Mt(""),X=Cr(new Set),j=rn(()=>{const O=new Set(b.value.map(Re=>Re.domain).filter(Boolean));return Array.from(O)}),B=rn(()=>{const O=new Set;return b.value.forEach(Re=>(Re.tools||[]).forEach(_e=>O.add(_e))),Array.from(O)}),Q=rn(()=>{const O={};return b.value.forEach(Re=>(Re.tools||[]).forEach(_e=>{O[_e]=(O[_e]||0)+1})),Object.entries(O).sort((Re,_e)=>_e[1]-Re[1]).slice(0,8).map(([Re])=>Re)}),V=rn(()=>{const O=Z.value.toLowerCase(),Re=X.size>0;return b.value.filter(_e=>{const w=!O||(_e.title||"").toLowerCase().includes(O)||(_e.domain||"").toLowerCase().includes(O)||(_e.descText||"").toLowerCase().includes(O)||(_e.tools||[]).some(He=>(He||"").toLowerCase().includes(O))||Array.isArray(_e.paramsContract)&&_e.paramsContract.some(He=>(He.name||"").toLowerCase().includes(O)||(He.type||"").toLowerCase().includes(O)||(He.description||"").toLowerCase().includes(O)),Ze=!q.value||_e.domain===q.value,ve=!Re||Array.from(X).every(He=>(_e.tools||[]).includes(He));return w&&Ze&&ve})}),ee=Cr(new Set),oe=Cr(new Set);function pe(O){ee.has(O.id)?ee.delete(O.id):ee.add(O.id),e("preview",O)}const Oe=O=>ee.has(O);function st(O){oe.has(O.id)?oe.delete(O.id):oe.add(O.id)}const rt=O=>oe.has(O);function Y(O){return O.previewUrl?O.previewUrl:s.previewBase&&O.workflowId?`${s.previewBase.replace(/\/+$/,"")}/${encodeURIComponent(O.workflowId)}?readOnly=true`:""}function ce(O){e("customize",O)}function ae(O){X.has(O)?X.delete(O):X.add(O)}function Le(){X.clear(),q.value="",Z.value=""}fc(R,()=>{ee.clear(),oe.clear()});async function De(O){try{await navigator.clipboard.writeText(String(O||""))}catch{}}return{titleProxy:t,missionProxy:n,loadingProjects:u,errorProjects:d,projects:h,qProject:m,typeFilter:_,projectTypes:v,filteredProjects:g,fetchProjects:p,loadWorkflowsOf:M,pickIcon:o,loadingWf:A,errorWf:E,workflows:b,selectedProjectId:R,selectedProjectName:P,iframeKey:I,q:Z,domain:q,selectedTools:X,domains:j,allTools:B,topTools:Q,filtered:V,toggleTool:ae,clearTools:Le,onCustomize:ce,togglePreview:pe,isOpen:Oe,getPreviewSrc:Y,toggleParams:st,isParamsOpen:rt,copy:De,pretty:l,selectedWorkflowId:S,selectWorkflow:C}}},sS={class:"max-w-[1100px] mx-auto px-4 sm:px-6 py-8"},rS={key:0,class:"mt-6"},oS={class:"mb-3"},aS={class:"text-slate-600 text-sm"},lS={class:"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between mb-5"},cS={class:"flex gap-3 w-full sm:w-auto"},uS={class:"relative w-full sm:w-72"},dS={class:"relative"},hS=["value"],fS={class:"flex items-center gap-2"},pS={key:0,class:"mb-4 text-red-600 text-sm"},mS=["aria-busy"],gS={class:"flex-1"},_S={class:"flex items-center gap-2"},vS=["src"],xS={class:"text-[16px] text-slate-800 font-bold leading-snug",style:{color:"#005183"}},yS={class:"mt-3 text-[14px] leading-6 space-y-1.5"},bS={class:"text-[#0093EE] font-semibold"},SS={class:"text-[#0093EE] font-medium"},MS={key:0,class:"mt-2 text-[13px] text-slate-600 clamp-3"},TS={key:1,class:"mt-2 text-[12px] bg-slate-50 border rounded p-2"},ES={class:"flex items-center justify-between gap-2"},AS={class:"truncate"},wS={class:"break-all"},CS=["onClick"],RS={key:0,class:"mt-1 truncate"},PS={class:"break-all"},IS={class:"mt-3 grid grid-cols-1 gap-3"},LS=["onClick","disabled"],DS=["onClick"],US={key:0,class:"mt-3"},NS={key:0,class:"rounded-lg overflow-hidden border"},FS=["src"],OS={key:1,class:"text-xs text-slate-500 p-3 bg-slate-50 rounded"},kS={key:0,class:"mt-3 space-y-3"},BS={key:0,class:"bg-[#F7FAFF] border rounded-lg p-3"},VS={class:"space-y-1"},zS={class:"font-semibold"},HS={class:"ml-1 text-slate-500"},GS={key:0,class:"ml-2 inline-block px-2 py-[2px] text-[11px] rounded bg-green-100 text-green-800"},WS={key:1,class:"ml-2 inline-block px-2 py-[2px] text-[11px] rounded bg-slate-100 text-slate-700"},XS={key:2,class:"text-slate-600"},qS={key:1,class:"bg-slate-50 border rounded-lg p-3"},jS={class:"space-y-2"},YS={class:"mb-1"},KS={class:"font-semibold"},ZS={class:"ml-2 text-slate-500"},JS={class:"codeblock"},$S={key:2,class:"text-[13px] text-slate-500"};function QS(s,e,t,n,i,r){return G(),W("section",sS,[e[18]||(e[18]=f("header",{class:"mb-3"},[f("h4",null,"Paramétrez un outil pour votre agent IA avec les scénarios d’automatisation n8n")],-1)),e[19]||(e[19]=f("label",{class:"form-label"},[it("Titre de l’outil "),f("span",{class:"text-orange fw-bold"},"*")],-1)),ct(f("input",{"onUpdate:modelValue":e[0]||(e[0]=o=>n.titleProxy=o),type:"text",class:"form-control mb-4",placeholder:"Entrer un titre"},null,512),[[It,n.titleProxy,void 0,{trim:!0}]]),e[20]||(e[20]=f("label",{class:"form-label"},[it("Mission principale de l’outil "),f("span",{class:"text-orange fw-bold"},"*")],-1)),ct(f("textarea",{"onUpdate:modelValue":e[1]||(e[1]=o=>n.missionProxy=o),class:"form-control mb-4",rows:"4",placeholder:"Entrer la mission..."},null,512),[[It,n.missionProxy,void 0,{trim:!0}]]),n.selectedProjectId?(G(),W("div",rS,[f("header",oS,[e[7]||(e[7]=f("h5",{class:"text-orange fw-bold"},"Indexez un scénario existant",-1)),f("p",aS,[e[6]||(e[6]=it("Projet : ")),f("strong",null,he(n.selectedProjectName),1)])]),f("div",lS,[f("div",cS,[f("label",uS,[ct(f("input",{"onUpdate:modelValue":e[2]||(e[2]=o=>n.q=o),type:"text",placeholder:"Chercher (nom, domaine, outils, description, champs…)",class:"w-full h-10 pl-9 pr-3 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,.05)] focus:outline-none focus:ring-2 focus:ring-[#0093EE]"},null,512),[[It,n.q,void 0,{trim:!0}]]),e[8]||(e[8]=f("svg",{class:"w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400",viewBox:"0 0 24 24",fill:"none"},[f("path",{d:"M21 21l-4.3-4.3M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1))]),f("div",dS,[ct(f("select",{"onUpdate:modelValue":e[3]||(e[3]=o=>n.domain=o),class:"appearance-none w-44 h-10 pl-3 pr-9 rounded-2xl border border-slate-200 bg-white shadow-[0_2px_8px_rgba(0,0,0,.05)] focus:outline-none focus:ring-2 focus:ring-[#0093EE]"},[e[9]||(e[9]=f("option",{value:""},"Filtre",-1)),(G(!0),W(_t,null,Et(n.domains,o=>(G(),W("option",{key:o,value:o},he(o),9,hS))),128))],512),[[Vi,n.domain]]),e[10]||(e[10]=f("svg",{class:"w-4 h-4 absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none",viewBox:"0 0 24 24",fill:"none"},[f("path",{d:"M6 9l6 6 6-6",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1))])]),f("div",fS,[f("button",{onClick:e[4]||(e[4]=(...o)=>n.clearTools&&n.clearTools(...o)),class:"px-3 h-10 rounded-2xl border"},"Effacer filtres"),f("button",{onClick:e[5]||(e[5]=o=>n.loadWorkflowsOf({id:n.selectedProjectId,name:n.selectedProjectName})),class:"px-3 h-10 rounded-2xl bg-[#0093EE] text-white"}," Actualiser ")])]),n.errorWf?(G(),W("div",pS,"Erreur: "+he(n.errorWf),1)):Ie("",!0),f("div",{class:"grid gap-4 sm:gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3","aria-busy":n.loadingWf},[(G(!0),W(_t,null,Et(n.filtered,o=>(G(),W("article",{key:o.id,class:"bg-white rounded-[18px] border border-slate-100 shadow-[0_10px_28px_rgba(0,83,135,.12)] overflow-hidden p-5 flex flex-col"},[f("div",gS,[f("div",_S,[o.icon?(G(),W("img",{key:0,src:o.icon,alt:"",class:"w-5 h-5 opacity-80"},null,8,vS)):Ie("",!0),f("h3",xS,he(o.title),1)]),f("div",yS,[f("div",null,[e[11]||(e[11]=f("span",{class:"font-extrabold text-slate-700",style:{color:"#0093EE"}},"Domaine :",-1)),f("span",bS,he(o.domain),1)]),f("div",null,[e[12]||(e[12]=f("span",{class:"font-extrabold text-slate-700",style:{color:"#0093EE"}},"Outils :",-1)),f("span",SS,he((o.tools||[]).join(" + ")),1)]),o.descText?(G(),W("div",MS,he(o.descText),1)):Ie("",!0),o.webhookUrl?(G(),W("div",TS,[f("div",ES,[f("div",AS,[e[13]||(e[13]=f("span",{class:"font-semibold"},"Webhook (prod):",-1)),f("code",wS,he(o.webhookMethod||"POST")+" "+he(o.webhookUrl),1)]),f("button",{class:"ml-2 text-[#0093EE] underline text-xs shrink-0",onClick:a=>n.copy(o.webhookUrl)},"Copier",8,CS)]),o.webhookTestUrl?(G(),W("div",RS,[e[14]||(e[14]=f("span",{class:"font-semibold"},"Webhook (test):",-1)),f("code",PS,he(o.webhookMethod||"POST")+" "+he(o.webhookTestUrl),1)])):Ie("",!0)])):Ie("",!0)])]),f("div",IS,[f("button",{onClick:a=>n.selectWorkflow(o),disabled:n.selectedWorkflowId===o.workflowId,class:"inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-emerald-600 disabled:opacity-60 hover:brightness-110 text-white font-semibold transition"},he(n.selectedWorkflowId===o.workflowId?"Sélectionné ✓":"Sélectionner"),9,LS),f("button",{onClick:a=>n.toggleParams(o),class:"inline-flex items-center justify-center gap-2 h-10 rounded-lg bg-white border hover:bg-slate-50 text-slate-700 font-semibold transition"},he(n.isParamsOpen(o.id)?"Masquer paramètres":"Voir paramètres"),9,DS)]),gn(Oa,{name:"fade"},{default:Fa(()=>[n.isOpen(o.id)?(G(),W("div",US,[n.getPreviewSrc(o)?(G(),W("div",NS,[(G(),W("iframe",{key:n.iframeKey,src:n.getPreviewSrc(o),class:"w-full h-[420px]",referrerpolicy:"no-referrer"},null,8,FS))])):(G(),W("div",OS,e[15]||(e[15]=[it(" Configure "),f("code",null,"previewBase",-1),it(" ou fournis "),f("code",null,"previewUrl",-1),it(". ")])))])):Ie("",!0)]),_:2},1024),gn(Oa,{name:"fade"},{default:Fa(()=>[n.isParamsOpen(o.id)?(G(),W("div",kS,[o.paramsContract&&o.paramsContract.length?(G(),W("div",BS,[e[16]||(e[16]=f("div",{class:"font-semibold mb-2"},"Contract (entrées attendues)",-1)),f("ul",VS,[(G(!0),W(_t,null,Et(o.paramsContract,a=>(G(),W("li",{key:a.name,class:"text-[13px]"},[f("span",zS,he(a.name),1),f("span",HS,"("+he(a.type||"string")+")",1),a.required?(G(),W("span",GS,"obligatoire")):(G(),W("span",WS,"optionnel")),a.description?(G(),W("div",XS,"— "+he(a.description),1)):Ie("",!0)]))),128))])])):Ie("",!0),o.paramsNodes&&o.paramsNodes.length?(G(),W("div",qS,[e[17]||(e[17]=f("div",{class:"font-semibold mb-2"},"Paramètres des nœuds",-1)),f("div",jS,[(G(!0),W(_t,null,Et(o.paramsNodes,a=>(G(),W("div",{key:a.name+"_"+a.type,class:"text-[13px]"},[f("div",YS,[f("span",KS,he(a.name||"Node"),1),f("span",ZS,he(a.type),1)]),f("pre",JS,he(n.pretty(a.parameters)),1)]))),128))])])):Ie("",!0),(!o.paramsContract||!o.paramsContract.length)&&(!o.paramsNodes||!o.paramsNodes.length)?(G(),W("div",$S," Aucun paramètre exposé par l’API pour ce workflow. ")):Ie("",!0)])):Ie("",!0)]),_:2},1024)]))),128))],8,mS)])):Ie("",!0)])}const eM=Vn(iS,[["render",QS],["__scopeId","data-v-ec9c9fcc"]]),oc={name:"IconBrain",template:"<svg ... />"},ac={name:"IconAvatar",template:"<svg ... />"},lc={name:"IconMic",template:"<svg ... />"},cc={name:"IconPlug",template:"<svg ... />"},uc={name:"IconFlow",template:"<svg ... />"},tM={name:"IconBill",template:"<svg ... />"},nM={name:"IconTag",template:"<svg ... />"},iM={name:"IconWallet",template:"<svg ... />"},sM={name:"Step6ModelEco",components:{IconBrain:oc,IconAvatar:ac,IconMic:lc,IconPlug:cc,IconFlow:uc,IconBill:tM,IconTag:nM,IconWallet:iM},setup(){const s=rn(()=>{var o,a,l,c,u;return{std_price:((o=e.value.find(d=>d.key==="std"))==null?void 0:o.price)||0,avatar_price:((a=e.value.find(d=>d.key==="avatar"))==null?void 0:a.price)||0,voice_price:((l=e.value.find(d=>d.key==="voice"))==null?void 0:l.price)||0,apis_price:((c=e.value.find(d=>d.key==="apis"))==null?void 0:c.price)||0,n8n_price:((u=e.value.find(d=>d.key==="n8n"))==null?void 0:u.price)||0,price_startup:n.value,total_price:t.value,creator_share:i.value,platform_share:r.value}}),e=Mt([{key:"std",label:"Agent IA standard",price:4.9,icon:oc},{key:"avatar",label:"Avatar 3D animé",price:9,icon:ac},{key:"voice",label:"Voix personnalisée (clonée)",price:6,icon:lc},{key:"apis",label:"API externes connectées (max 3)",price:4,icon:cc},{key:"n8n",label:"Scénarios N8N actifs (jusqu’à 5)",price:7,icon:uc}]),t=rn(()=>e.value.reduce((o,a)=>o+Number(a.price||0),0)),n=Mt(9.9),i=rn(()=>+(n.value*.7).toFixed(2)),r=rn(()=>+(n.value*.3).toFixed(2));return{features:e,totalCost:t,priceStartup:n,creatorShare:i,platformShare:r,pricing:s}}},rM={class:"max-w-[1100px] mx-auto px-4 sm:px-6 py-8"},oM={class:"mt-2 space-y-3"},aM={class:"flex items-center gap-3"},lM={class:"w-9 h-9 rounded-xl bg-slate-50 flex items-center justify-center text-slate-600"},cM={class:"text-[15px] font-semibold text-slate-800"},uM={class:"flex items-center gap-2"},dM=["onUpdate:modelValue"],hM={class:"bg-white rounded-[16px] border border-slate-100 shadow px-5 py-4 grid grid-cols-[1fr_auto] gap-3 items-center"},fM={class:"text-[15px] font-extrabold text-[#0B74C7]"};function pM(s,e,t,n,i,r){return G(),W("section",rM,[e[2]||(e[2]=f("h4",{class:"mb-2"},"Configurez la tarification de l’abonnement pour votre Agent IA",-1)),e[3]||(e[3]=f("p",{class:"text-orange fw-bold"},"Coût mensuel créateur",-1)),e[4]||(e[4]=f("div",{class:"px-5 text-[13px] text-slate-500 font-semibold grid grid-cols-[1fr_auto] gap-2"},[f("div",null,"Fonctionnalité activée"),f("div",null,"Coût / mois HT")],-1)),f("ul",oM,[(G(!0),W(_t,null,Et(n.features,o=>(G(),W("li",{key:o.key,class:"bg-white rounded-[16px] border border-slate-100 shadow px-5 py-4 grid grid-cols-[1fr_auto] gap-3 items-center"},[f("div",aM,[f("div",lM,[(G(),du(hu(o.icon),{class:"w-5 h-5"}))]),f("div",cM,he(o.label),1)]),f("div",uM,[ct(f("input",{"onUpdate:modelValue":a=>o.price=a,type:"number",step:"0.1",min:"0",class:"w-24 h-9 text-right rounded-lg border border-slate-200 px-2 text-[14px] focus:outline-none focus:ring-2 focus:ring-[#0093EE]"},null,8,dM),[[It,o.price,void 0,{number:!0}]]),e[0]||(e[0]=f("span",{class:"text-[15px] font-bold text-slate-700"},"€",-1))])]))),128)),f("li",hM,[e[1]||(e[1]=f("div",{class:"text-[15px] font-bold text-[#0B74C7]"},"Total à payer",-1)),f("div",fM,he(n.totalCost.toFixed(2))+" € HT / mois ",1)])])])}const mM=Vn(sM,[["render",pM]]),gM={name:"Step7Final",components:{Avatar3DViewer:nu},props:{avatar:{type:Object,default:()=>({glbUrl:""})},voiceFromDb:{type:Object,default:null},initialTab:{type:String,default:"avatar"},agentName:{type:String,default:"Agent IA – MarketingGPT"},agentShortName:{type:String,default:"Marketing GPT"},avatarUrl:{type:String,default:"https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=200&q=80&auto=format"}},data(){return{activeTab:this.initialTab,inputText:"",messages:[{role:"user",text:"Ceci est un message test"},{role:"agent",text:"Ceci est une réponse test"}],systemPrompt:"Tu es un expert en stratégie marketing B2B pour startups. Tu analyses les besoins, proposes des solutions concrètes et actionnables.",scenario:["Réception input utilisateur","Analyse contexte marketing","Appel APIs externes","Génération recommandations"],apis:["API 1","API 2","API 3","API 4"]}},computed:{voiceAudioUrl(){var s;return((s=this.voiceFromDb)==null?void 0:s.audio_url)||""},glbUrlResolved(){var e;const s=((e=this.avatar)==null?void 0:e.glbUrl)||"";return s?/^https?:\/\//i.test(s)||s.startsWith("/")?s:`/storage/${s}`:""},hasGlb(){return!!this.glbUrlResolved}},watch:{initialTab(s){this.activeTab=s},"avatar.glbUrl"(s){s&&(this.activeTab="avatar")}},methods:{openAvatar3D(){this.activeTab="avatar"},sendMessage(){const s=(this.inputText||"").trim();s&&(this.messages.push({role:"user",text:s}),this.inputText="",setTimeout(()=>{this.messages.push({role:"agent",text:"Réponse simulée (sandbox) : bonne réception ✅"})},300))}}},_M={class:"max-w-[1100px] mx-auto px-4 sm:px-6 py-8"},vM={class:"mt-3 flex gap-8 text-[15px] font-semibold"},xM={key:0,class:"absolute left-0 -bottom-[2px] h-[3px] w-full bg-[#FF7A00] rounded-full"},yM={key:0,class:"absolute left-0 -bottom-[2px] h-[3px] w-full bg-[#FF7A00] rounded-full"},bM={key:0,class:"mt-5 grid gap-6 lg:grid-cols-[2fr,1fr]"},SM={class:"bg-white rounded-[16px] border border-slate-100 shadow-[0_10px_28px_rgba(0,83,135,.12)] p-5"},MM={key:0},TM={key:1,class:"text-slate-500 text-sm"},EM={class:"bg-[#F7FAFF] rounded-[16px] border border-slate-200 shadow-[0_10px_28px_rgba(0,83,135,.08)] p-5"},AM={class:"font-semibold mb-2 flex items-center gap-2"},wM={class:"text-[#0B74C7]"},CM={class:"text-slate-600 text-sm"},RM=["src"],PM={key:1,class:"text-slate-600 text-sm"},IM={key:1,class:"mt-5 grid gap-6 lg:grid-cols-[2fr,1fr]"},LM={class:"bg-white rounded-[16px] border border-slate-100 shadow-[0_10px_28px_rgba(0,83,135,.12)] overflow-hidden"},DM={class:"px-5 py-4 border-b border-slate-100 flex items-center gap-3"},UM=["src"],NM={class:"font-semibold text-slate-800"},FM={class:"p-5 h-[360px] overflow-y-auto bg-white"},OM={class:"max-w-[80%] rounded-xl px-4 py-2 text-white bg-[#3FA6F1] shadow text-[14px] leading-5"},kM={class:"px-5 pb-5"},BM={class:"flex items-center gap-2 bg-white border border-slate-200 rounded-xl px-3 py-2"},VM={class:"bg-[#EAF6FF] rounded-[16px] border border-[#B6E0FF] shadow-[0_10px_28px_rgba(0,83,135,.08)] p-5"},zM={class:"text-[#FF6A00] font-semibold"},HM={class:"mt-3"},GM={class:"text-slate-700 text-[14px] mt-1 whitespace-pre-line"},WM={class:"mt-4"},XM={class:"list-decimal ml-5 mt-1 text-slate-700 text-[14px] space-y-1"},qM={class:"mt-4"},jM={class:"flex gap-2 mt-2 flex-wrap"};function YM(s,e,t,n,i,r){const o=Yn("Avatar3DViewer");return G(),W("section",_M,[e[15]||(e[15]=f("h2",{class:"text-[22px] sm:text-[26px] font-semibold text-slate-800"}," Testez votre agent IA ",-1)),f("div",vM,[f("button",{class:We(["text-slate-600 relative pb-2",i.activeTab==="avatar"?"text-[#FF7A00]":""]),onClick:e[0]||(e[0]=a=>i.activeTab="avatar")},[e[5]||(e[5]=it(" Voir l’avatar final ")),i.activeTab==="avatar"?(G(),W("span",xM)):Ie("",!0)],2),f("button",{class:We(["text-slate-600 relative pb-2",i.activeTab==="sandbox"?"text-[#FF7A00]":""]),onClick:e[1]||(e[1]=a=>i.activeTab="sandbox")},[e[6]||(e[6]=it(" Tester l’Agent IA (Sandbox) ")),i.activeTab==="sandbox"?(G(),W("span",yM)):Ie("",!0)],2)]),i.activeTab==="avatar"?(G(),W("div",bM,[f("div",SM,[e[7]||(e[7]=f("h5",{class:"text-[16px] font-bold mb-3"},"Aperçu 3D de l'avatar",-1)),r.hasGlb?(G(),W("div",MM,[gn(o,{glbUrl:r.glbUrlResolved,audioUrl:r.voiceAudioUrl},null,8,["glbUrl","audioUrl"])])):(G(),W("div",TM," Aucun modèle 3D n’est sélectionné pour l’instant. "))]),f("div",EM,[t.voiceFromDb?(G(),W(_t,{key:0},[f("h6",AM,[e[8]||(e[8]=f("svg",{class:"w-4 h-4 text-slate-600",viewBox:"0 0 24 24",fill:"none"},[f("rect",{x:"9",y:"3",width:"6",height:"10",rx:"3",stroke:"currentColor","stroke-width":"2"}),f("path",{d:"M5 11a7 7 0 0 0 14 0M12 18v3",stroke:"currentColor","stroke-width":"2","stroke-linecap":"round"})],-1)),e[9]||(e[9]=it(" Voix associée : ")),f("span",wM,he(t.voiceFromDb.voice_name),1)]),f("p",CM,he(t.voiceFromDb.voice_description),1),f("audio",{src:t.voiceFromDb.audio_url,controls:"",class:"w-full mt-3"}," Votre navigateur ne supporte pas la lecture audio. ",8,RM)],64)):(G(),W("div",PM," Aucune voix n’est liée à cet avatar pour le moment. "))])])):(G(),W("div",IM,[f("div",LM,[f("div",DM,[f("img",{src:t.avatarUrl,alt:"",class:"w-9 h-9 rounded-full ring-2 ring-sky-100 object-cover"},null,8,UM),f("div",NM,he(t.agentName),1)]),f("div",FM,[(G(!0),W(_t,null,Et(i.messages,(a,l)=>(G(),W("div",{key:l,class:We(["mb-3 flex",(a.role==="user","justify-start")])},[f("div",OM,he(a.text),1)],2))),128))]),f("div",kM,[f("div",BM,[ct(f("input",{"onUpdate:modelValue":e[2]||(e[2]=a=>i.inputText=a),type:"text",placeholder:"Message",onKeydown:e[3]||(e[3]=dc(lr((...a)=>r.sendMessage&&r.sendMessage(...a),["prevent"]),["enter"])),class:"flex-1 outline-none text-[14px] placeholder:text-slate-400"},null,544),[[It,i.inputText]]),e[11]||(e[11]=_s('<button class="p-1.5 rounded-md text-slate-500 hover:bg-slate-50" title="Emoji"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="2"></circle><circle cx="9" cy="10" r="1" fill="currentColor"></circle><circle cx="15" cy="10" r="1" fill="currentColor"></circle><path d="M8 14a4 4 0 0 0 8 0" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button><button class="p-1.5 rounded-md text-slate-500 hover:bg-slate-50" title="Pièce jointe"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="none"><path d="M7 12.5V8a5 5 0 1 1 10 0v8a4 4 0 0 1-8 0V9.5" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button><button class="p-1.5 rounded-md text-slate-500 hover:bg-slate-50" title="Micro"><svg viewBox="0 0 24 24" class="w-5 h-5" fill="none"><rect x="9" y="3" width="6" height="10" rx="3" stroke="currentColor" stroke-width="2"></rect><path d="M5 11a7 7 0 0 0 14 0M12 18v3" stroke="currentColor" stroke-width="2" stroke-linecap="round"></path></svg></button>',3)),f("button",{onClick:e[4]||(e[4]=(...a)=>r.sendMessage&&r.sendMessage(...a)),class:"inline-flex items-center justify-center gap-2 h-9 px-3 rounded-lg bg-[#0093EE] text-white font-semibold hover:brightness-110 transition",title:"Envoyer"},e[10]||(e[10]=[f("svg",{viewBox:"0 0 24 24",class:"w-4 h-4",fill:"currentColor"},[f("path",{d:"M3 12l18-9-6 9 6 9-18-9z"})],-1)]))])])]),f("aside",VM,[f("div",zM,"Informations générales sur l’agent “"+he(t.agentShortName)+"”",1),f("div",HM,[e[12]||(e[12]=f("div",{class:"font-semibold text-slate-800"},"Prompt système",-1)),f("p",GM,he(i.systemPrompt),1)]),f("div",WM,[e[13]||(e[13]=f("div",{class:"font-semibold text-slate-800"},"Scénario N8N",-1)),f("ol",XM,[(G(!0),W(_t,null,Et(i.scenario,(a,l)=>(G(),W("li",{key:l},he(a),1))),128))])]),f("div",qM,[e[14]||(e[14]=f("div",{class:"font-semibold text-slate-800"},"APIs Connectées",-1)),f("div",jM,[(G(!0),W(_t,null,Et(i.apis,(a,l)=>(G(),W("span",{key:l,class:"bg-[#FF7A00] text-white text-[12px] font-bold px-3 py-1 rounded-full"},he(a),1))),128))])])])]))])}const KM=Vn(gM,[["render",YM]]),ZM={name:"AddAgent",components:{Step1Infos:Ku,Step2Personnalite:Md,Step3AvatarVoix:Sb,Step4Rag:nS,Step5N8N:eM,Step6ModelEco:mM,Step7Final:KM},props:{categories:{type:Array,default:()=>[]}},data(){return{agentPricing:{features:[],price_startup:0,total_cost:0,creator_share:0,platform_share:0},currentStep:1,SANDBOX_STEP:7,sandboxAvatar:{glbUrl:""},ragFiles:[],uploadingRag:!1,ragFiles:[],ragUrl:"",ragUrlDepth:"single",internalConfig:null,noteConfig:{title:"",content:"",format:"markdown"},externalApi:{url:"",api_key:"",structure:""},collabConfig:{platform:"notion",id:"",token:""},agent:{nom:"",description:"",type:"",tags:[],category_id:null,subcategory_id:null,sousTitres:[{titre:"",responsabilites:[""]}]},newTag:"",personnalite:{role:"",mission:"",tonalite_id:null,style_reponse:"Synthétique",contraintes_specifiques:""},tonalites:{travaillomane:{id:1,value:16.67},perseverant:{id:2,value:16.67},empathique:{id:3,value:16.67},reveur:{id:4,value:16.67},promoteur:{id:5,value:16.67},rebelle:{id:6,value:16.67}},generatedPrompt:"",promptAmeliore:"",showUseButton:!1,avatarTab:"prompt",selectedTypes:[],avatar:{avatar_name:"",avatar_domaine:"",outfit:"",hair:"",glasses:"",top:"",facewear:"",facemask:"",hero_character:"",glbUrl:"",gender:"male",body_type:"full_body",avatar_prompt:"",glbData:null,sourceImage:null,previewUrl:"",imageFile:null},voix:{selectedVoice:"",langue:"fr",settings:{vitesse:1,intonation:1,volume:1},customVoiceFile:null,isPlaying:!1,currentAudio:null,playingVoice:null},n8nTool:{title:"",mission:"",workflow:{id:"",editor_url:"",webhook_url:"",webhook_test_url:"",webhook_method:"",contract:[],params_nodes:[],project_id:"",project_name:""}},audioContext:null,audioSource:null,gainNode:null,audioBuffer:null,startTime:0,pauseTime:0,isPaused:!1,isLoading:!1,resembleVoices:[],customVoices:[],languesDisponibles:[{value:"fr",label:"Français"},{value:"en",label:"Anglais"},{value:"es",label:"Espagnol"},{value:"de",label:"Allemand"},{value:"it",label:"Italien"}],availableTypes:[{label:"Outfit",value:"outfit"},{label:"Hair",value:"hair"},{label:"Glasses",value:"glasses"},{label:"Top",value:"top"},{label:"Facewear",value:"facewear"},{label:"Facemask",value:"facemask"},{label:"Hero Character",value:"hero_character"}],loadingLanguages:!1,settingsTimeout:null,testTexts:{fr:"Bonjour, je suis une voix générée par l'intelligence artificielle.",en:"Hello, I am a voice generated by artificial intelligence.",es:"Hola, soy una voz generada por inteligencia artificial.",de:"Hallo, ich bin eine Stimme, die von künstlicher Intelligenz generiert wurde.",it:"Ciao, sono una voce generata dall'intelligenza artificiale.",pt:"Olá, sou uma voz gerada por inteligência artificial.",nl:"Hallo, ik ben een stem gegenereerd door kunstmatige intelligentie.",ru:"Привет, я голос, созданный искусственным интеллектом.",ja:"こんにちは、私は人工知能によって生成された音声です。",ko:"안녕하세요, 저는 인공지능으로 생성된 음성입니다.",zh:"你好，我是由人工智能生成的声音。",ar:"مرحباً، أنا صوت مُولد بواسطة الذكاء الاصطناعي."},audioPlayer:null,iframeUrl:"",customVoicesLoading:!1,customVoicesError:null,voiceFromDb:null}},computed:{selectedVoiceData(){if(!this.voix.selectedVoice)return null;const s=this.resembleVoices.find(e=>e.id===this.voix.selectedVoice);return s||this.voixIA.find(e=>e.id===this.voix.selectedVoice)||null},voixIA(){return[...this.resembleVoices,...this.customVoices]},currentTestText(){return this.testTexts[this.voix.langue]||this.testTexts.en||"Hello, I am an AI voice."}},mounted(){window.addEventListener("message",this.handleRPMMessage),this.loadResembleVoices(),this.fetchLanguesDisponibles(),this.initAudioContext()},beforeUnmount(){window.removeEventListener("message",this.handleRPMMessage),this.stopCurrentAudio(),this.cleanupAudioContext()},methods:{onSelectWorkflow(s){this.n8nTool.title=this.n8nTool.title||"",this.n8nTool.mission=this.n8nTool.mission||"",this.n8nTool.workflow={id:(s==null?void 0:s.workflowId)||"",editor_url:(s==null?void 0:s.editorUrl)||"",webhook_url:(s==null?void 0:s.webhookUrl)||"",webhook_test_url:(s==null?void 0:s.webhookTestUrl)||"",webhook_method:(s==null?void 0:s.webhookMethod)||"",contract:Array.isArray(s==null?void 0:s.contract)?s.contract:[],params_nodes:Array.isArray(s==null?void 0:s.paramsNodes)?s.paramsNodes:[],project_id:(s==null?void 0:s.projectId)||"",project_name:(s==null?void 0:s.projectName)||""},console.log("✅ n8nTool prêt :",this.n8nTool)},openSandbox3D(s){const e=(s==null?void 0:s.glbUrl)||"";this.sandboxAvatar.glbUrl=e.startsWith("/storage/")?e:e?`/storage/${e}`:"",s!=null&&s.voiceFromDb&&(this.voiceFromDb=s.voiceFromDb),this.currentStep=this.SANDBOX_STEP,this.$nextTick(()=>{var t,n;(n=(t=this.$refs.sandbox)==null?void 0:t.openAvatar3D)==null||n.call(t)})},onRagFilesChange(s){const e=["application/pdf","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document","text/plain"];this.ragFiles=s.filter(t=>e.includes(t.type)||t.name.match(/\.(pdf|docx?|txt)$/i)),console.log("📎 RAG files:",this.ragFiles.map(t=>`${t.name} (${t.size})`))},initAudioContext(){try{this.audioContext=new(window.AudioContext||window.webkitAudioContext),this.gainNode=this.audioContext.createGain(),this.gainNode.connect(this.audioContext.destination),console.log("🎵 AudioContext initialisé")}catch(s){console.error("❌ Erreur AudioContext:",s),tt.error("Votre navigateur ne supporte pas Web Audio API")}},loadCustomVoices(){this.customVoicesLoading=!0,axios.get("/api/agentia/custom-voices").then(s=>{s.data.success?(this.customVoices=s.data.voices,console.log(`✅ ${s.data.voices.length} voix personnalisées chargées`)):this.customVoicesError="Erreur lors du chargement des voix"}).catch(s=>{console.error("❌ Erreur API custom voices:",s),this.customVoicesError="Erreur de connexion au serveur"}).finally(()=>{this.customVoicesLoading=!1})},cleanupAudioContext(){this.audioContext&&this.audioContext.state!=="closed"&&(this.audioContext.close(),this.audioContext=null),this.audioSource=null,this.gainNode=null,this.audioBuffer=null},async generateVoiceSample(s,e=null){var t,n,i;try{const r=e||this.currentTestText,o=(t=document.head.querySelector('meta[name="csrf-token"]'))==null?void 0:t.content,a={voice_id:s,text:r,language:this.voix.langue,settings:{speed:this.voix.settings.vitesse,pitch:this.voix.settings.intonation,volume:this.voix.settings.volume}};console.log("🎵 Création clip Resemble:",a),console.log("🌍 Texte traduit:",r);const l=await axios.post("/api/agentia/generate-sample",a,{headers:{"X-CSRF-TOKEN":o,"Content-Type":"application/json"},timeout:3e4});if(l.data.success&&l.data.audio_url)return await(await fetch(l.data.audio_url)).arrayBuffer();if(l.status===202&&l.data.clip_uuid)return console.log("🔄 Clip en traitement, polling..."),await this.pollClipStatus(l.data.clip_uuid);throw new Error(l.data.message||"Erreur création clip")}catch(r){throw console.error("❌ Erreur génération:",r),new Error(((i=(n=r.response)==null?void 0:n.data)==null?void 0:i.message)||r.message)}},onLanguageChange(){console.log("🌍 Langue changée vers:",this.voix.langue),console.log("📝 Nouveau texte de test:",this.currentTestText),tt.info(`Langue changée: ${this.afficherNomLangue(this.voix.langue)}
Texte de test mis à jour automatiquement.`),this.stopCurrentAudio(),this.voix.selectedVoice&&this.voix.playingVoice&&setTimeout(()=>{this.previewSelectedVoice()},500)},async testWithCustomText(s){if(!this.voix.selectedVoice){tt.warning("Sélectionnez une voix d'abord");return}try{await this.playVoice(this.voix.selectedVoice,s),tt.success("Test avec texte personnalisé lancé!")}catch(e){tt.error("Erreur lors du test: "+e.message)}},showToast(s,e="success"){tt[e](s)},onVoiceSelected(s){this.voix.selectedVoice=s},onVoiceSettingsChanged(s){this.voix.settings={...this.voix.settings,...s}},async pollClipStatus(s,e=10){for(let t=1;t<=e;t++)try{console.log(`🔄 Polling tentative ${t}/${e}`);const n=await axios.get(`/api/agentia/clip-status/${s}`);if(n.data.success&&n.data.audio_url)return console.log("✅ Clip prêt!"),await(await fetch(n.data.audio_url)).arrayBuffer();if(n.status===202){await new Promise(i=>setTimeout(i,3e3));continue}throw new Error(n.data.message||"Erreur polling")}catch{if(t===e)throw new Error("Timeout: Le clip n'est pas prêt après "+e+" tentatives");await new Promise(i=>setTimeout(i,3e3))}},async createAudioBuffer(s){try{return this.audioContext||this.initAudioContext(),await this.audioContext.decodeAudioData(s)}catch(e){throw console.error("❌ Erreur décodage audio:",e),new Error("Impossible de décoder les données audio")}},setupAudioNodes(s){if(!this.audioContext||!s)return null;if(this.audioSource)try{this.audioSource.stop()}catch{}return this.audioSource=this.audioContext.createBufferSource(),this.audioSource.buffer=s,this.gainNode.gain.value=this.voix.settings.volume,this.audioSource.connect(this.gainNode),this.audioSource.onended=()=>{this.handleAudioEnd()},this.audioSource},handleAudioEnd(){this.voix.isPlaying=!1,this.voix.playingVoice=null,this.isPaused=!1,this.startTime=0,this.pauseTime=0,this.audioSource=null,console.log("🎵 Lecture terminée")},async playVoice(s,e=null){try{this.stopVoice(),this.resembleVoices.find(n=>n.id===s)?await this.playResembleVoice(s,e):await this.playDefaultVoice(s)}catch(t){console.error("❌ Erreur lecture voix:",t),tt.error(t.message||"Erreur lors de la lecture de la voix"),this.handleAudioEnd()}},async playResembleVoice(s,e=null){this.voix.isPlaying=!0,this.voix.playingVoice=s;try{const t=await this.generateVoiceSample(s,e);this.audioBuffer=await this.createAudioBuffer(t);const n=this.setupAudioNodes(this.audioBuffer);n&&(this.startTime=this.audioContext.currentTime,n.start(0),console.log("🎵 Lecture Resemble démarrée:",s))}catch(t){throw this.handleAudioEnd(),t}},playDefaultVoice(){if(console.log("🎯 ID sélectionné :",this.voix.selectedVoice),console.log("🎧 voixIA:",this.voixIA),!Array.isArray(this.voixIA)){console.warn("❌ voixIA non définie ou mal formatée");return}const s=this.voixIA.find(n=>n.id===this.voix.selectedVoice);if(!s){tt.warning("⚠️ Voix introuvable.");return}let e=null;if(s.audio_url&&typeof s.audio_url=="string")e=s.audio_url;else if(s.file_path instanceof File||s.file_path instanceof Blob)e=URL.createObjectURL(s.file_path);else{console.warn("❌ Fichier audio introuvable ou invalide :",s.file_path),tt.warning("⚠️ Aucun fichier audio valide pour cette voix.");return}console.log("🔊 Lancement audio depuis :",e);const t=new Audio(e);t.play().then(()=>{console.log(`🎵 Lecture de ${s.voice_name||"voix personnalisée"}...`)}).catch(n=>{console.error("❌ Erreur de lecture audio :",n),tt.error("Erreur lors de la lecture de l'audio.")}),t.onended=()=>{console.log("✅ Lecture terminée."),s.audio_url||URL.revokeObjectURL(e)},t.onerror=()=>{tt.error("⚠️ Impossible de lire le fichier audio.")}},stopVoice(){if(this.audioSource){try{this.audioSource.stop()}catch{}this.audioSource=null}this.voix.currentAudio&&(this.voix.currentAudio.pause(),this.voix.currentAudio=null),this.audioPlayer&&(this.audioPlayer.pause(),this.audioPlayer=null),this.handleAudioEnd(),console.log("⏹️ Lecture arrêtée")},pauseVoice(){this.voix.isPlaying&&this.audioSource&&!this.isPaused&&(this.audioSource.stop(),this.pauseTime=this.audioContext.currentTime-this.startTime,this.isPaused=!0,this.voix.isPlaying=!1,console.log("⏸️ Lecture en pause"))},resumeVoice(){if(this.isPaused&&this.audioBuffer){const s=this.setupAudioNodes(this.audioBuffer);s&&(this.startTime=this.audioContext.currentTime-this.pauseTime,s.start(0,this.pauseTime),this.voix.isPlaying=!0,this.isPaused=!1,console.log("▶️ Lecture reprise"))}},async ecouterVoixResemble(s){await this.playVoice(s)},async ecouterVoix(s){await this.playVoice(s)},async previewSelectedVoice(){if(!this.voix.selectedVoice){tt.warning("Aucune voix sélectionnée");return}console.log("🎵 Prévisualisation avec texte traduit:",this.currentTestText),await this.playVoice(this.voix.selectedVoice,this.currentTestText)},async testLipSync(){if(!this.voix.selectedVoice){tt.warning("Sélectionnez une voix pour tester la synchronisation");return}const s="Test de synchronisation labiale avec Ready Player Me. Cette phrase permet de vérifier la correspondance entre les mouvements des lèvres et la voix générée.";try{await this.playVoice(this.voix.selectedVoice,s),tt.success("🎭 Test de synchronisation labiale démarré")}catch{tt.error("Erreur lors du test de synchronisation")}},stopCurrentAudio(){this.stopVoice()},updateAudioSettings(){this.gainNode&&(this.gainNode.gain.value=this.voix.settings.volume),this.settingsTimeout&&clearTimeout(this.settingsTimeout),this.settingsTimeout=setTimeout(()=>{if(this.voix.isPlaying&&this.voix.playingVoice){const s=this.voix.playingVoice;this.stopVoice(),setTimeout(()=>{this.playVoice(s)},100)}},500)},nextStep(){this.currentStep<6&&(this.currentStep+=1)},prevStep(){this.currentStep>1&&(this.currentStep-=1)},goToStep(s){s>=1&&s<=7&&(this.currentStep=s)},handleFinalStep(){this.currentStep===6?this.submitForm():this.nextStep()},addTag(){this.newTag.trim()&&!this.agent.tags.includes(this.newTag.trim())&&(this.agent.tags.push(this.newTag.trim()),this.newTag="")},removeTag(s){this.agent.tags.splice(s,1)},addSousTitre(){this.agent.sousTitres.push({titre:"",responsabilites:[""]})},addResponsibility(s){this.agent.sousTitres[s].responsabilites.push("")},updateSliders(){const s=Object.values(this.tonalites).reduce((e,t)=>e+parseFloat(t.value),0);if(s>100){const t=(s-100)/6;Object.keys(this.tonalites).forEach(n=>{this.tonalites[n].value=Math.max(0,Math.min(16.67,this.tonalites[n].value-t))})}},improvePromptWithGPT(){const s=this.generatePrompt();if(!s.trim()){tt.error("Le prompt système est vide.");return}axios.post("/api/agentia/generate-prompt",{prompt:s}).then(e=>{this.promptAmeliore=e.data.improvedPrompt,this.showUseButton=!0,tt.success("Prompt IA généré avec succès !")}).catch(()=>{tt.error("Erreur lors de la génération du prompt par l'IA.")})},useGeneratedPrompt(){this.generatedPrompt=this.promptAmeliore,this.showUseButton=!1,tt.success("Le prompt IA est maintenant utilisé.")},copyPromptToClipboard(){const s=this.generatedPrompt||this.generatePrompt();navigator.clipboard.writeText(s),tt.success("Prompt copié dans le presse-papiers")},getCategoryLabel(){const e=(Array.isArray(this.categories)?this.categories:[]).find(t=>String(t.id)===String(this.agent.category_id));return(e==null?void 0:e.name)||"Non spécifiée"},getSubcategoryLabel(){const s=this.agent.subcategory_id;if(!s)return null;const e=Array.isArray(this.categories)?this.categories:[],t=e.find(n=>String(n.id)===String(this.agent.category_id));if(t&&Array.isArray(t.subcategories)){const n=t.subcategories.find(i=>String(i.id)===String(s));if(n)return n.name}for(const n of e){const i=(n.subcategories||[]).find(r=>String(r.id)===String(s));if(i)return i.name}return null},generatePrompt(){const s=this.getCategoryLabel(),e=this.getSubcategoryLabel(),t=e?`
Sous-catégorie : ${e}
`:"";return`Tu es ${this.agent.nom}, un expert ${this.personnalite.role} spécialisé dans la catégorie « ${s} ».${t}
## Ton rôle
                 ${this.personnalite.mission}.

                ## Ta personnalité
                Ta personnalité est influencée par la tonalité suivante :
                - **Tonalité :** Travaillomane: ${this.tonalites.travaillomane.value}%,
                  Perseverant: ${this.tonalites.perseverant.value}%,
                  Empathique: ${this.tonalites.empathique.value}%,
                  Reveur: ${this.tonalites.reveur.value}%,
                  Promoteur: ${this.tonalites.promoteur.value}%,
                  Rebelle: ${this.tonalites.rebelle.value}%.

                ## Tes réponses doivent être de style :
                ${this.personnalite.style_reponse} : Explications complètes avec exemples.

                ## Contraintes système
                ${this.personnalite.contraintes_specifiques}
            `},updateAvatarPrompt(){const s=this.selectedTypes.join(", ");this.avatar.avatar_prompt=`
Je souhaite créer un avatar 3D Ready Player Me avec les caractéristiques suivantes :
- Nom : ${this.avatar.avatar_name||"Non spécifié"}
- Genre : ${this.avatar.gender||"Non spécifié"}
- Morphologie : ${this.avatar.body_type||"Non spécifié"}
- Types sélectionnés : ${s||"Aucun"}
- Détails :
  - Outfit : ${this.avatar.outfit||"-"}
  - Hair : ${this.avatar.hair||"-"}
  - Glasses : ${this.avatar.glasses||"-"}
  - Top : ${this.avatar.top||"-"}
  - Facewear : ${this.avatar.facewear||"-"}
  - Facemask : ${this.avatar.facemask||"-"}
  - Héros : ${this.avatar.hero_character||"-"}

Merci de générer un prompt professionnel à intégrer dans une URL Ready Player Me.
            `.trim()},async generateAvatarPromptSystem(){var s;try{this.updateAvatarPrompt();const e=(s=document.head.querySelector('meta[name="csrf-token"]'))==null?void 0:s.content,t=await axios.post("/api/agentia/generate-avatar-prompt",{avatar_name:this.avatar.avatar_name,avatar_prompt:this.avatar.avatar_prompt,gender:this.avatar.gender,body_type:this.avatar.body_type,outfit:this.avatar.outfit,facemask:this.avatar.facemask,hair:this.avatar.hair,glasses:this.avatar.glasses,top:this.avatar.top,facewear:this.avatar.facewear,hero_character:this.avatar.hero_character,selected_types:this.selectedTypes},{headers:{"X-CSRF-TOKEN":e}});this.avatar.system_prompt=t.data.prompt,this.avatar.avatar_prompt=t.data.prompt,this.iframeUrl=t.data.preview_url}catch(e){console.error("Erreur lors de la génération du prompt système:",e)}},handleRPMMessage(s){if(!s.data||s.data.source!=="readyplayerme")return;const{eventName:e,data:t}=s.data;if(e==="v1.frame.ready"){console.log("✅ ReadyPlayerMe prêt");const n=document.getElementById("rpm-frame");n&&(n.contentWindow.postMessage({target:"readyplayerme",type:"subscribe",eventName:"v1.user.set"},"*"),n.contentWindow.postMessage({target:"readyplayerme",type:"subscribe",eventName:"v1.avatar.exported"},"*"))}e==="v1.user.set"&&(console.log("👤 Bouton NEXT cliqué"),setTimeout(()=>{this.triggerExport()},1500)),e==="v1.avatar.exported"&&(console.log("✅ Avatar exporté :",t.url),this.avatar.glbUrl=t.url)},triggerExport(){const s=document.getElementById("rpm-frame");s&&(s.contentWindow.postMessage({target:"readyplayerme",type:"request",eventName:"v1.avatar.export"},"*"),console.log("📤 Export demandé"))},async loadResembleVoices(){this.isLoading=!0;try{const s=await axios.get("/api/agentia/resemble-voices");if(!s.data)throw new Error("Données voix non reçues");this.resembleVoices=s.data.map(e=>({id:e.id,nom:e.name,name:e.name,description:e.description,gender:e.gender,type:e.gender,language:e.language||"fr",avatar_class:this.getAvatarClass(e.gender),icon:this.getAvatarIcon(e.gender),isDefault:e.is_default||!1,supported_languages:e.supported_languages||["fr"]})),console.log("✅ Voix Resemble chargées:",this.resembleVoices.length)}catch(s){console.error("❌ Erreur de chargement des voix:",s)}finally{this.isLoading=!1}},getAvatarClass(s){switch(s){case"female":return"bg-pink-100 text-pink-500";case"male":return"bg-blue-100 text-blue-500";default:return"bg-gray-100 text-gray-500"}},getAvatarIcon(s){switch(s){case"female":return"fas fa-user-circle";case"male":return"fas fa-user-circle";default:return"fas fa-robot"}},selectionnerVoix(s){this.voix.selectedVoice=s;const e=this.voixIA.find(t=>t.id===s);tt.success(`Voix sélectionnée: ${(e==null?void 0:e.nom)||s}`)},handleVoiceUpload(s){const e=s.target.files[0];if(e){if(!e.type.startsWith("audio/")){tt.error("Veuillez sélectionner un fichier audio valide");return}if(e.size>10*1024*1024){tt.error("Le fichier est trop volumineux (max 10MB)");return}this.voix.customVoiceFile=e,tt.success(`Fichier vocal uploadé: ${e.name}`)}},async creerVoix(){var e;if(!this.voix.customVoiceFile){tt.error("Veuillez sélectionner un fichier audio");return}const s=new FormData;s.append("voice_file",this.voix.customVoiceFile),s.append("voice_name",`Voix Custom ${Date.now()}`),s.append("description","Voix personnalisée uploadée");try{const t=(e=document.head.querySelector('meta[name="csrf-token"]'))==null?void 0:e.content;(await axios.post("/api/agentia/create-custom-voice",s,{headers:{"Content-Type":"multipart/form-data","X-CSRF-TOKEN":t}})).data.success?(tt.success("Voix personnalisée créée avec succès!"),await this.loadResembleVoices()):tt.error("Erreur lors de la création de la voix")}catch(t){console.error("Erreur création voix:",t),tt.error("Erreur lors de la création de la voix personnalisée")}},onLanguageChange(){console.log("Langue changée:",this.voix.langue)},getSliderLabel(s,e){var n;return((n={vitesse:{.5:"Très lent",.75:"Lent",1:"Normal",1.25:"Rapide",1.5:"Très rapide"},intonation:{.5:"Monotone",.75:"Peu expressif",1:"Normal",1.25:"Expressif",1.5:"Très expressif"},volume:{.25:"Très faible",.5:"Faible",.75:"Modéré",1:"Normal",1.25:"Fort"}}[s])==null?void 0:n[e])||e.toString()},afficherNomLangue(s){return{fr:"Français",en:"English",es:"Español",de:"Deutsch",it:"Italiano"}[s]||s.toUpperCase()},async fetchLanguesDisponibles(){this.loadingLanguages=!0;try{this.languesDisponibles=[{value:"fr",label:"Français"},{value:"en",label:"Anglais"},{value:"es",label:"Espagnol"},{value:"de",label:"Allemand"},{value:"it",label:"Italien"}]}catch(s){console.error("Erreur chargement langues :",s)}finally{this.loadingLanguages=!1}},appendDeep(s,e,t=""){e!=null&&(Array.isArray(e)?e.forEach((n,i)=>{const r=t?`${t}[${i}]`:`${i}`;this.appendDeep(s,n,r)}):e instanceof File||e instanceof Blob?s.append(t,e):typeof e=="object"?Object.entries(e).forEach(([n,i])=>{const r=t?`${t}[${n}]`:n;this.appendDeep(s,i,r)}):s.append(t,e))},async submitForm(){var i,r,o,a,l,c,u,d,h,m;if(!this.agent.nom||!this.agent.tags||!this.agent.type){tt.error("Veuillez remplir tous les champs obligatoires.");return}const s=_=>{if(_==null)return _;if(fu(_)&&(_=pu(_)),Array.isArray(_))return _.map(s);if(_ instanceof File||_ instanceof Blob)return _;if(typeof _=="object")try{return JSON.parse(JSON.stringify(_))}catch{const v={};for(const g in _)v[g]=s(_[g]);return v}return _},t=[...this.resembleVoices,...this.customVoices].find(_=>_.id===this.voix.selectedVoice),n=new FormData;if(this.appendDeep(n,{nom:this.agent.nom,category_id:this.agent.category_id,subcategory_id:this.agent.subcategory_id,description:this.agent.description,type:this.agent.type,tags:this.agent.tags,sous_titres:this.agent.sousTitres}),this.appendDeep(n,{role:this.personnalite.role,mission:this.personnalite.mission,tonalite_id:this.personnalite.tonalite_id,style_reponse:this.personnalite.style_reponse,contraintes_specifiques:this.personnalite.contraintes_specifiques,tonalites:{travaillomane:this.tonalites.travaillomane.value,perseverant:this.tonalites.perseverant.value,empathique:this.tonalites.empathique.value,reveur:this.tonalites.reveur.value,promoteur:this.tonalites.promoteur.value,rebelle:this.tonalites.rebelle.value}}),this.appendDeep(n,{avatar_name:this.avatar.avatar_name,avatar_domaine:this.avatar.avatar_domaine,avatar_prompt:this.avatar.avatar_prompt,gender:this.avatar.gender,body_type:this.avatar.body_type,selected_types:this.selectedTypes,outfit:this.avatar.outfit,facemask:this.avatar.facemask,hair:this.avatar.hair,glasses:this.avatar.glasses,top:this.avatar.top,facewear:this.avatar.facewear,hero_character:this.avatar.hero_character,avatar_glb_url:this.avatar.glbUrl||null}),t){const v=/^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(t.id)?t.id:crypto.randomUUID();this.appendDeep(n,{voice_id:v,voice_language:this.voix.langue,voice_settings:this.voix.settings,custom_voice_file:this.voix.customVoiceFile})}{const _=[],v=g=>{!g||!g.workflow||!g.workflow.id||_.push({title:g.title||"",mission:g.mission||"",workflow_id:g.workflow.id||"",editor_url:g.workflow.editor_url||"",webhook_url:g.workflow.webhook_url||"",webhook_test_url:g.workflow.webhook_test_url||"",webhook_method:g.workflow.webhook_method||"",contract:s(g.workflow.contract||[]),project_id:g.workflow.project_id||"",project_name:g.workflow.project_name||""})};Array.isArray(this.n8nTools)&&this.n8nTools.length?this.n8nTools.forEach(v):v(this.n8nTool),_.length&&this.appendDeep(n,{n8n_tools:_})}if((i=this.internalConfig)!=null&&i.type){const _=this.internalConfig.type,v={type:_,url:this.internalConfig.url||null};_==="sql"&&this.internalConfig.sql&&(v.sql={host:this.internalConfig.sql.host||"",port:this.internalConfig.sql.port||3306,db:this.internalConfig.sql.db||"",user:this.internalConfig.sql.user||"",pass:this.internalConfig.sql.pass||""}),this.appendDeep(n,{internal:v})}if((r=this.ragFiles)!=null&&r.length)if(this.ragFiles.length>1)for(const _ of this.ragFiles)n.append("rag_files[]",_);else n.append("file",this.ragFiles[0]);if(this.ragUrl&&(n.append("rag_url",this.ragUrl),n.append("rag_url_depth",this.ragUrlDepth||"single"),n.append("rag_type_label","URL")),(o=this.noteConfig)!=null&&o.title&&((a=this.noteConfig)!=null&&a.content)&&(n.append("note[title]",this.noteConfig.title),n.append("note[content]",this.noteConfig.content),n.append("note[format]",this.noteConfig.format||"markdown")),(l=this.externalApi)!=null&&l.url&&((c=this.externalApi)!=null&&c.structure)){const _=typeof this.externalApi.structure=="string"?this.externalApi.structure:JSON.stringify(this.externalApi.structure);n.append("external_api[url]",this.externalApi.url),this.externalApi.api_key&&n.append("external_api[api_key]",this.externalApi.api_key),n.append("external_api[structure]",_)}if(((u=this.collabConfig)==null?void 0:u.platform)==="notion"&&this.collabConfig.id&&this.appendDeep(n,{collab:{platform:"notion",id:this.collabConfig.id,token:this.collabConfig.token||""}}),this.$refs.step6){const _=s(this.$refs.step6.pricing);this.appendDeep(n,{agent_pricing:{std_price:_.std_price,avatar_price:_.avatar_price,voice_price:_.voice_price,apis_price:_.apis_price,n8n_price:_.n8n_price,price_startup:_.price_startup,total_price:_.total_price,creator_share:_.creator_share,platform_share:_.platform_share}})}try{this.isSubmitting=!0;for(const[v,g]of n.entries())console.log(v,g instanceof File?"(file)":g);const _=await axios.post("/api/agentia/",n);this.agent.id=((d=_.data.agent)==null?void 0:d.id)??this.agent.id,this.avatar.id=((h=_.data.avatar)==null?void 0:h.id)??this.avatar.id,tt.success("✅ Agent IA créé avec succès !"),Array.isArray(_.data.rag_sources)&&_.data.rag_sources.length&&tt.success(`📚 ${_.data.rag_sources.length} source(s) RAG ajoutée(s).`),_.data.glb_url&&tt.success("🧬 Avatar 3D sauvegardé."),this.ragFiles=[]}catch(_){console.error("Erreur API :",_);let v="❌ Une erreur est survenue lors de la création de l’Agent IA.";if((m=_==null?void 0:_.response)!=null&&m.data){const g=_.response.data;if(g.message&&(v=g.message),g.errors&&typeof g.errors=="object"){const p=Object.keys(g.errors)[0];p&&g.errors[p]&&g.errors[p][0]&&(v=g.errors[p][0])}}tt.error(v)}finally{this.isSubmitting=!1}}}},JM={class:"mt-3 formulaire"},$M={class:"col-12"},QM={class:"card card-1"},eT={class:"card-body px-lg-4 px-md-3 px-2"},tT={class:"bs-stepper wizard-numbered shadow-none mt-2"},nT={class:"bs-stepper-header border-0 px-lg-5 px-md-4 px-2"},iT={class:"bs-stepper-content px-2"};function sT(s,e,t,n,i,r){const o=Yn("Step1Infos"),a=Yn("Step2Personnalite"),l=Yn("Step3AvatarVoix"),c=Yn("Step4Rag"),u=Yn("Step5N8N"),d=Yn("Step6ModelEco");return G(),W("div",JM,[f("div",$M,[f("div",QM,[f("div",eT,[f("div",tT,[f("div",nT,[f("div",{class:We(["step",{active:i.currentStep===1}]),"data-target":"#account-details"},[f("button",{type:"button",class:"step-trigger p-0",onClick:e[0]||(e[0]=h=>r.goToStep(1))},e[30]||(e[30]=[f("span",{class:"bs-stepper-circle shadow-none mx-0"},"1",-1)]))],2),f("div",{class:We(["line",{"active-line":i.currentStep>=1}])},null,2),f("div",{class:We(["step",{active:i.currentStep===2}]),"data-target":"#personal-info"},[f("button",{type:"button",class:"step-trigger p-0",onClick:e[1]||(e[1]=h=>r.goToStep(2))},e[31]||(e[31]=[f("span",{class:"bs-stepper-circle"},"2",-1)]))],2),f("div",{class:We(["line",{"active-line":i.currentStep>=2}])},null,2),f("div",{class:We(["step",{active:i.currentStep===3}]),"data-target":"#social-links"},[f("button",{type:"button",class:"step-trigger p-0",onClick:e[2]||(e[2]=h=>r.goToStep(3))},e[32]||(e[32]=[f("span",{class:"bs-stepper-circle"},"3",-1)]))],2),f("div",{class:We(["line",{"active-line":i.currentStep>=3}])},null,2),f("div",{class:We(["step",{active:i.currentStep===4}]),"data-target":"#rag-links"},[f("button",{type:"button",class:"step-trigger p-0",onClick:e[3]||(e[3]=h=>r.goToStep(4))},e[33]||(e[33]=[f("span",{class:"bs-stepper-circle"},"4",-1)]))],2),f("div",{class:We(["line",{"active-line":i.currentStep>=4}])},null,2),f("div",{class:We(["step",{active:i.currentStep===5}]),"data-target":"#rag-links"},[f("button",{type:"button",class:"step-trigger p-0",onClick:e[4]||(e[4]=h=>r.goToStep(5))},e[34]||(e[34]=[f("span",{class:"bs-stepper-circle"},"5",-1)]))],2),f("div",{class:We(["line",{"active-line":i.currentStep>=5}])},null,2),f("div",{class:We(["step",{active:i.currentStep===6}]),"data-target":"#rag-links"},[f("button",{type:"button",class:"step-trigger p-0",onClick:e[5]||(e[5]=h=>r.goToStep(6))},e[35]||(e[35]=[f("span",{class:"bs-stepper-circle"},"6",-1)]))],2)]),f("div",iT,[ct(gn(o,{agent:i.agent,"onUpdate:agent":e[6]||(e[6]=h=>i.agent=h),categories:t.categories,newTag:i.newTag,"onUpdate:newTag":e[7]||(e[7]=h=>i.newTag=h),onAddTag:r.addTag,onRemoveTag:r.removeTag,onAddSousTitre:r.addSousTitre,onAddResponsibility:r.addResponsibility},null,8,["agent","categories","newTag","onAddTag","onRemoveTag","onAddSousTitre","onAddResponsibility"]),[[xi,i.currentStep===1]]),ct(gn(a,{personnalite:i.personnalite,"onUpdate:personnalite":e[8]||(e[8]=h=>i.personnalite=h),tonalites:i.tonalites,"onUpdate:tonalites":e[9]||(e[9]=h=>i.tonalites=h),generatedPrompt:i.generatedPrompt,"onUpdate:generatedPrompt":e[10]||(e[10]=h=>i.generatedPrompt=h),agent:i.agent,showUseButton:i.showUseButton,onUpdateSliders:r.updateSliders,onImprovePrompt:r.improvePromptWithGPT,onUseGeneratedPrompt:r.useGeneratedPrompt,onCopyPrompt:r.copyPromptToClipboard},null,8,["personnalite","tonalites","generatedPrompt","agent","showUseButton","onUpdateSliders","onImprovePrompt","onUseGeneratedPrompt","onCopyPrompt"]),[[xi,i.currentStep===2]]),ct(gn(l,{avatarTab:i.avatarTab,"onUpdate:avatarTab":e[11]||(e[11]=h=>i.avatarTab=h),selectedTypes:i.selectedTypes,"onUpdate:selectedTypes":e[12]||(e[12]=h=>i.selectedTypes=h),avatar:i.avatar,"onUpdate:avatar":e[13]||(e[13]=h=>i.avatar=h),voix:i.voix,"onUpdate:voix":e[14]||(e[14]=h=>i.voix=h),isLoading:i.isLoading,"onUpdate:isLoading":e[15]||(e[15]=h=>i.isLoading=h),resembleVoices:i.resembleVoices,"onUpdate:resembleVoices":e[16]||(e[16]=h=>i.resembleVoices=h),customVoices:i.customVoices,"onUpdate:customVoices":e[17]||(e[17]=h=>i.customVoices=h),customVoicesLoading:i.customVoicesLoading,"onUpdate:customVoicesLoading":e[18]||(e[18]=h=>i.customVoicesLoading=h),customVoicesError:i.customVoicesError,"onUpdate:customVoicesError":e[19]||(e[19]=h=>i.customVoicesError=h),agent:i.agent,voixIA:r.voixIA,languesDisponibles:i.languesDisponibles,availableTypes:i.availableTypes,iframeUrl:i.iframeUrl,selectedVoiceData:r.selectedVoiceData,loadingLanguages:i.loadingLanguages,"custom-voices":i.customVoices,"custom-voices-loading":i.customVoicesLoading,"custom-voices-error":i.customVoicesError,"voice-from-db":i.voiceFromDb,onUpdateAvatarPrompt:r.updateAvatarPrompt,onGenerateAvatarPromptSystem:r.generateAvatarPromptSystem,onHandleRpmMessage:r.handleRPMMessage,onLoadResembleVoices:r.loadResembleVoices,onEcouterVoixResemble:r.ecouterVoixResemble,onEcouterVoix:r.ecouterVoix,onSelectionnerVoix:r.selectionnerVoix,onHandleVoiceUpload:r.handleVoiceUpload,onCreerVoix:r.creerVoix,onPreviewSelectedVoice:r.previewSelectedVoice,onOnLanguageChange:r.onLanguageChange,onTestLipSync:r.testLipSync,onGetSliderLabel:r.getSliderLabel,onAfficherNomLangue:r.afficherNomLangue,onStopCurrentAudio:r.stopCurrentAudio,onRefreshCustomVoices:r.loadCustomVoices,onShowToast:r.showToast,onVoiceSelected:r.onVoiceSelected,onVoiceSettingsChanged:r.onVoiceSettingsChanged,onOpenSandbox3d:s.handleOpenSandbox3D},null,8,["avatarTab","selectedTypes","avatar","voix","isLoading","resembleVoices","customVoices","customVoicesLoading","customVoicesError","agent","voixIA","languesDisponibles","availableTypes","iframeUrl","selectedVoiceData","loadingLanguages","custom-voices","custom-voices-loading","custom-voices-error","voice-from-db","onUpdateAvatarPrompt","onGenerateAvatarPromptSystem","onHandleRpmMessage","onLoadResembleVoices","onEcouterVoixResemble","onEcouterVoix","onSelectionnerVoix","onHandleVoiceUpload","onCreerVoix","onPreviewSelectedVoice","onOnLanguageChange","onTestLipSync","onGetSliderLabel","onAfficherNomLangue","onStopCurrentAudio","onRefreshCustomVoices","onShowToast","onVoiceSelected","onVoiceSettingsChanged","onOpenSandbox3d"]),[[xi,i.currentStep===3]]),ct(gn(c,{onFilesSelected:r.onRagFilesChange,onFilesChange:r.onRagFilesChange,onUrlConfig:e[20]||(e[20]=h=>{i.ragUrl=h.target,i.ragUrlDepth=h.depth}),onInternalConfig:e[21]||(e[21]=h=>i.internalConfig=h),onNoteSubmit:e[22]||(e[22]=h=>i.noteConfig=h),onApiConfig:e[23]||(e[23]=h=>i.externalApi=h),onCollabConfig:e[24]||(e[24]=h=>i.collabConfig=h)},null,8,["onFilesSelected","onFilesChange"]),[[xi,i.currentStep===4]]),ct(gn(u,{previewBase:"https://n8n.braindcode.com/embed","api-projects-url":"/api/n8n/projects?only_personal=1",onSelectWorkflow:r.onSelectWorkflow,title:i.n8nTool.title,"onUpdate:title":e[25]||(e[25]=h=>i.n8nTool.title=h),mission:i.n8nTool.mission,"onUpdate:mission":e[26]||(e[26]=h=>i.n8nTool.mission=h),"auto-open-first-project":!0,"default-project-id":"PJIQt6ioQ3BaQbhr"},null,8,["onSelectWorkflow","title","mission"]),[[xi,i.currentStep===5]]),ct(gn(d,{modelValue:i.agentPricing,"onUpdate:modelValue":e[27]||(e[27]=h=>i.agentPricing=h),ref:"step6"},null,8,["modelValue"]),[[xi,i.currentStep===6]]),f("div",{class:We(["col-12 mb-4 mt-4 d-flex",{"justify-content-between":i.currentStep>1,"justify-content-end":i.currentStep===1}])},[i.currentStep>1?(G(),W("button",{key:0,class:"btn btn-primary fs-sm px-3 py-2",onClick:e[28]||(e[28]=(...h)=>r.prevStep&&r.prevStep(...h))},"Précédent")):Ie("",!0),f("button",{class:"btn btn-primary fs-sm px-3 py-2",onClick:e[29]||(e[29]=(...h)=>r.handleFinalStep&&r.handleFinalStep(...h))},he(i.currentStep===6?"Ajouter":"Suivant"),1)],2)])])])])])])}const oT=Vn(ZM,[["render",sT]]);export{oT as default};
