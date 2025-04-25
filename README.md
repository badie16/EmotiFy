# EmotiFy - Application d'Analyse d'Émotions

EmotiFy est une application web qui permet aux utilisateurs d'analyser les émotions présentes dans un texte grâce à l'intelligence artificielle.

## Fonctionnalités

- Interface épurée et responsive
- Zone de saisie de texte
- Analyse des émotions avec le modèle GoEmotions de Hugging Face
- Visualisation des résultats avec des graphiques colorés (camembert/barres)
- Historique des analyses
- Export PDF des résultats
- API publique avec clé d'accès

## Technologies utilisées

### Frontend
- React avec Vite
- Tailwind CSS pour le style
- Recharts pour les visualisations
- React Router pour la navigation
- Axios pour les requêtes HTTP

### Backend
- Node.js avec Express
- PostgreSQL via Supabase
- Hugging Face Inference API pour l'analyse des émotions

## Installation et démarrage

### Prérequis
- Node.js (v14 ou supérieur)
- npm ou yarn
- Compte Supabase
- Compte Hugging Face (pour la clé API)

### Frontend

1. Accédez au dossier frontend :
```bash
cd frontend
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier .env à la racine du dossier frontend avec :
```
VITE_API_URL=http://localhost:3001/api
```

4. Démarrez le serveur de développement :
```bash
npm run dev
```

### Backend

1. Accédez au dossier backend :
```bash
cd backend
```

2. Installez les dépendances :
```bash
npm install
```

3. Créez un fichier .env à la racine du dossier backend avec :
```
PORT=3001
HUGGING_FACE_API_KEY=votre_clé_api_hugging_face
SUPABASE_CONNECTION_STRING=votre_chaîne_de_connexion_supabase
```

4. Démarrez le serveur :
```bash
npm run dev
```

## Déploiement

### Frontend
Le frontend peut être déployé sur Vercel, Netlify ou tout autre service d'hébergement statique.

### Backend
Le backend peut être déployé sur Render, Heroku ou tout autre service d'hébergement pour Node.js.

## Licence
Ce projet est sous licence MIT.