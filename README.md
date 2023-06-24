# Bot Discord en JavaScript avec discord.js

Ce dépôt contient le code source d'un bot Discord codé en JavaScript utilisant la librairie [discord.js](https://discord.js.org/). Le bot est conçu pour être exécuté après avoir installé les dépendances nécessaires et configuré le fichier `config.js` avec un token d'authentification valide. Il ne contient actuellement que peu de commande comme ping, ban ou kick mais il sera alimenté au fur et à mesure du temps.

## Prérequis

Avant de pouvoir exécuter le bot, assurez-vous d'avoir les éléments suivants :

- Node.js (version 14 ou supérieure) installé sur votre machine.
- Une copie du code source de ce dépôt.

## Installation

1. Clonez ce dépôt sur votre machine en utilisant la commande suivante : `git clone`

2. Accédez au répertoire du bot : `cd Discord_Bot`

3. Installez les dépendances en exécutant la commande suivante `npm init` suivi de `npm install discord.js fs`

## Configuration

Avant de pouvoir lancer le bot, vous devez configurer le fichier `config.js` avec votre token d'authentification Discord. Voici comment procéder :

1. Ouvrez le fichier `config.js` dans un éditeur de texte.

2. Remplacez la valeur du token par votre token d'authentification Discord entre les guillemets. Par exemple :

```javascript
module.exports = {
  token: 'votre_token_ici'
};
