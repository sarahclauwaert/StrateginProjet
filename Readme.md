# Application d'authentification Node.js avec MongoDB

Cette application Node.js utilise Express, Mongoose, et JWT pour créer une API sécurisée avec des fonctionnalités d'inscription, de connexion, et d'affichage de la liste des utilisateurs.

## Prérequis

- Node.js installé sur votre machine
- Accès à une base de données MongoDB

## Installation

1. Clonez le repository:

   ```bash
   git clone "https://github.com/sarahclauwaert/StrateginProjet.git"


2. Installer les dépendances:

cd strateginProjet
npm install

3. Lancer l'application:

npm start

4. Accédez à l'application dans votre navigateur:

http://localhost:5000

Vous pouvez ensuite utilisez les routes suivantes:

Inscription: http://localhost:5000/register
Connexion: http://localhost:5000/login
Liste des utilisateurs: http://localhost:5000/user

5. Structure du Projet

public/: Dossier contenant les fichiers statiques (style.css).
views/: Dossier contenant les fichiers de modèle EJS (login.ejs, register.ejs, user.ejs).
config.js: Fichier de configuration pour la connexion à MongoDB.
index.js: Fichier principal de l'application Express.

Auteur:
Clauwaert Sarah