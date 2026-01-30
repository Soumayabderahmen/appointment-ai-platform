# Startup Studio Platform

## Description

**Startup Studio Platform** est une plateforme web complète destinée à accompagner les startups de l’idéation jusqu’à la phase d’accélération. Elle combine la **gestion des coachs, investisseurs et startups**, l’intégration d’**agents IA personnalisés**, ainsi que des **workflows automatisés** afin d’optimiser les interactions et la prise de décision.

La plateforme prend en charge plusieurs types d’utilisateurs : **Administrateurs, Coachs, Startups** et **Utilisateurs génériques**, et propose des fonctionnalités avancées telles que la réservation de rendez-vous, la génération de rapports PDF et les notifications en temps réel.

> 📌 Ce projet est un projet personnel à but démonstratif et portfolio. Toutes les données sensibles ou personnelles ont été supprimées ou anonymisées.

---

## Fonctionnalités principales

### Administrateur

* Gestion des profils des coachs et investisseurs.  
* Configuration des rôles et permissions.  
* Suivi des performances des agents IA.  
* Export de rapports et statistiques analytiques.

### Coach

* Définition des plages horaires disponibles.  
* Réception de notifications pour confirmer ou refuser les rendez-vous.  
* Consultation de l’historique des interactions avec les startups.

### Startup

* Réservation de créneaux horaires avec les coachs.  
* Consultation des profils publics des investisseurs.  
* Configuration et souscription aux agents IA personnalisés.  
* Visualisation des statistiques et export de rapports PDF.

### Utilisateur générique

* Inscription, connexion et réinitialisation du mot de passe.  
* Déconnexion automatique après une période d’inactivité.

---

## Intelligence Artificielle (IA)

La plateforme intègre des **agents IA personnalisés** permettant de :

* Recommander des investisseurs ou coachs pertinents aux startups.  
* Générer automatiquement des rapports analytiques et des résumés.  
* Répondre aux questions des utilisateurs en utilisant le concept de  
  **RAG (Retrieval-Augmented Generation)**, combinant connaissances internes et sources externes.

---

## Automatisation des workflows (n8n)

Le projet utilise **n8n** pour automatiser plusieurs tâches clés :

* **Envoi d’emails** : notifications automatiques pour les rendez-vous et mises à jour.  
* **Upload de fichiers** : stockage automatique des documents et rapports sur Google Drive.  
* **Génération de Google Slides** : création automatique de présentations synthétiques.  
* **Auto-remplissage via lien** : récupération et intégration automatique des données à partir de liens partagés.

Ces automatisations réduisent le travail manuel et améliorent la fiabilité et la rapidité des processus.

---

## Technologies utilisées

* **Frontend** : Vue.js ou React  
* **Backend** : Laravel (API REST)  
* **Base de données** : MySQL / PostgreSQL  
* **Intelligence Artificielle** : Agents personnalisés, RAG  
* **Automatisation** : n8n  
* **Notifications** : temps réel  
* **PDF** : génération de rapports analytiques

---

