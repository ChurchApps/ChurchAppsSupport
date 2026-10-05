---
title: "Connexion aux fournisseurs"
---

# Connexion aux fournisseurs

<div class="article-intro">

Avant de pouvoir parcourir le contenu d'un fournisseur, vous devez vous y connecter. Certains fournisseurs nécessitent une authentification via un code QR ou une connexion par email, tandis que d'autres peuvent être connectés avec un seul clic.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez et lancez FreePlay -- voir [Démarrage](../getting-started/)
- Ayez votre télécommande TV prête pour la navigation
- Pour les fournisseurs nécessitant une connexion, ayez vos identifiants de compte disponibles

</div>

:::tip Configuration de B1 Admin + FreePlay ensemble ?
Notre **<a href="/guides/freeplay-b1admin" target="_blank">guide étape par étape</a>** vous guide à travers la liaison de B1 Admin, la programmation d'une leçon, et la connexion de FreePlay — tout en un seul endroit. Ouvrez-le dans un nouvel onglet pour suivre.
:::

## Navigation des fournisseurs disponibles

1. Ouvrez **Settings** en bas de la barre latérale, puis sélectionnez **Providers** pour ouvrir l'écran **Content Providers**
2. Vous verrez une grille de cartes de fournisseurs, chacune affichant le logo et le nom du fournisseur
3. Les fournisseurs connectés affichent un badge **Connected** vert en dessous de leur nom
4. Les fournisseurs qui ne sont pas encore disponibles affichent un label **Coming Soon**

## Connexion sans authentification

Certains fournisseurs ne nécessitent pas de connexion. Quand vous sélectionnez l'un de ces fournisseurs, FreePlay se connecte immédiatement et ouvre le navigateur de contenu. Aucun identifiant n'est nécessaire.

## Authentification par flux d'appareil (code QR)

Certains fournisseurs utilisent un flux d'appareil, similaire à la façon dont vous vous connectez aux applications de streaming sur un téléviseur :

1. Sélectionnez la carte du fournisseur sur l'écran **Content Providers**
2. FreePlay affiche un code QR et une URL de vérification
3. Scannez le code QR avec votre téléphone, ou visitez l'URL affichée sur n'importe quel appareil
4. Entrez le code utilisateur affiché sur l'écran TV
5. Complétez le processus de connexion sur votre téléphone ou ordinateur
6. FreePlay détecte la connexion réussie et affiche **Connected!**
7. Le navigateur de contenu s'ouvre automatiquement

:::info
Un indicateur **Waiting for authorization** pulsant montre que FreePlay vérifie votre connexion. Le code expire après plusieurs minutes, donc complétez le processus rapidement.
:::

**Go Curriculum** utilise ce même motif de connexion par code QR -- scannez le code et connectez-vous avec votre compte gocurriculum.com pour vous connecter.

## Connexion par formulaire

D'autres fournisseurs utilisent une connexion email et mot de passe traditionnels :

1. Sélectionnez la carte du fournisseur
2. Entrez votre **Email** et **Password** en utilisant le clavier à l'écran
3. Sélectionnez le bouton **Sign In**
4. Si vos identifiants sont corrects, FreePlay affiche **Connected!** et ouvre le navigateur de contenu

:::tip
Utilisez le pavé directionnel de votre télécommande pour vous déplacer entre le champ email, le champ mot de passe, et le bouton de connexion. Appuyez sur **Select** sur un champ de texte pour ouvrir le clavier à l'écran.
:::

## Trouver un fournisseur sur votre réseau

**FreeShow** est trouvé sur votre réseau local au lieu d'une connexion : FreePlay recherche le réseau, énumère chaque ordinateur exécutant FreeShow qu'il trouve, et se connecte à celui que vous sélectionnez (choisissez **Scan Again** si aucun n'apparaît).

## Paramètres du fournisseur

Sélectionner une carte de fournisseur qui affiche le badge **Connected** ouvre son écran **Provider Settings** :

- **Browse Library** -- Afficher ou masquer la bibliothèque de contenu de ce fournisseur dans la barre latérale
- **Auto-Download Today's Lesson** -- Utilisez ce fournisseur comme source de la leçon d'aujourd'hui et pré-téléchargez ses fichiers (uniquement affiché pour les fournisseurs qui offrent une leçon actuelle)
- **Use for Announcements** -- Choisissez un dossier de ce fournisseur pour boucler à partir de l'article **Announcements** dans la barre latérale. Voir [Annonces](./announcements)
- **Check for Announcement Updates** -- Affiché une fois qu'un dossier d'annonces est choisi ; télécharge de nouvelles diapositives et en supprime les supprimées
- **Disconnect** -- Supprimer la connexion

## Déconnexion d'un fournisseur

Pour vous déconnecter d'un fournisseur auquel vous vous êtes déjà connecté :

1. Allez à l'écran **Content Providers** (**Settings** > **Providers**)
2. Sélectionnez la carte du fournisseur qui affiche le badge **Connected**
3. Sur l'écran **Provider Settings**, sélectionnez **Disconnect**

Après la déconnexion, le contenu du fournisseur n'apparaîtra plus dans votre barre latérale. Si vous utilisiez l'un de ses dossiers pour les annonces, ces diapositives sont également supprimées.

:::warning
La déconnexion supprime l'authentification enregistrée de votre appareil. Vous devrez vous connecter à nouveau si vous souhaitez vous reconnecter plus tard.
:::

## Articles connexes

- **[Parcourir et télécharger du contenu](./browsing-content)** - Naviguer dans les dossiers et lire le contenu après la connexion
- **[Annonces](./announcements)** - Boucler un dossier de diapositives d'un fournisseur connecté
- **[Aperçu des fournisseurs de contenu](./index.md)** - Voir tous les fournisseurs disponibles
