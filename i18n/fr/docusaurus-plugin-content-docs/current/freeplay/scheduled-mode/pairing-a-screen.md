---
title: "Associer un écran"
---

# Associer un écran

<div class="article-intro">

Pour placer un téléviseur sur un calendrier, associez-le à **FreePlay Admin**. Le téléviseur affiche un code de quatre lettres. Vous saisissez ce code sur [admin.freeplay.church](https://admin.freeplay.church) et choisissez le groupe d'écrans dont le calendrier doit être suivi. Vous ne le faites qu'une seule fois par téléviseur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez et lancez FreePlay sur le téléviseur. Consultez [Premiers pas](../getting-started/)
- Disposez d'un identifiant ChurchApps pour votre église afin de vous connecter à FreePlay Admin
- Facultativement, [créez une playlist](./building-playlists) et [planifiez-la](./scheduling-the-calendar) d'abord, afin que le téléviseur ait tout de suite quelque chose à lire

</div>

## Afficher le code sur le téléviseur

1. Sur le téléviseur, ouvrez **Paramètres** en bas de la barre latérale.
2. Sélectionnez **Associer à un calendrier**. La ligne affiche **Non associé** tant que le téléviseur n'est pas associé.
3. L'écran **Associer cet écran** affiche un code QR et un code d'association de quatre lettres, avec le message **Scannez avec votre téléphone, ou rendez-vous sur freeplay.church/pair et saisissez ce code**.
4. Sous le code, **En attente de confirmation** pulse pendant que FreePlay attend que vous terminiez l'association.

Le code est valable 15 minutes, et un compte à rebours affiché sous le code indique le temps restant. Lorsque le temps est écoulé, FreePlay affiche automatiquement un nouveau code. Vous pouvez aussi sélectionner **Générer un nouveau code** pour en obtenir un neuf, ou **Annuler** pour revenir aux Paramètres.

## Associer dans FreePlay Admin

1. Scannez le code QR avec votre téléphone, ou rendez-vous sur **freeplay.church/pair** depuis n'importe quel ordinateur ou téléphone. Connectez-vous si vous y êtes invité. FreePlay Admin ouvre le formulaire **Associer un écran** avec le code déjà rempli.
   - Vous pouvez aussi ouvrir le formulaire vous-même. Allez dans **Écrans** dans FreePlay Admin et cliquez sur **Associer un écran**.
2. Vérifiez le **Code d'association**. Ce sont les quatre lettres affichées sur le téléviseur.
3. Saisissez un **Libellé** pour distinguer ce téléviseur des autres, par exemple « Hall gauche ». Ce champ est facultatif.
4. Sous **Groupe**, choisissez le groupe d'écrans dont le calendrier doit suivre ce téléviseur. Pour en créer un nouveau, choisissez **+ Nouveau groupe** et saisissez un **Nom du nouveau groupe**.
5. Sous **Mode**, laissez **Planifié** sélectionné. Le téléviseur diffusera selon le calendrier du groupe, de lui-même.
6. Cliquez sur **Associer**.

Le téléviseur affiche **Connecté !** puis **Chargement de votre planning...**. Il télécharge ce qui est planifié et commence la lecture. Consultez [Lecture planifiée sur le téléviseur](./scheduled-playback).

:::info
Si FreePlay Admin affiche **Ce code ne correspond à aucun téléviseur**, vérifiez le code sur l'écran. S'il a expiré, utilisez le nouveau code affiché actuellement par le téléviseur.
:::

### Planifié ou manuel

Le paramètre **Mode** propose deux options :

- **Planifié** - Diffuse selon le calendrier du groupe, de lui-même. Personne n'a besoin d'appuyer sur Démarrer.
- **Manuel** - Quelqu'un choisit le contenu avec la télécommande. Un écran en mode manuel apparaît toujours dans votre liste **Écrans**, mais il ne suit pas de calendrier : le champ **Groupe** est donc désactivé.

Vous pouvez changer le mode d'un écran plus tard depuis **Modifier** sur la [page Écrans](./managing-screens).

## Associer à un plan de service à la place

Le code affiché sur l'écran **Associer cet écran** fonctionne aussi dans B1 Admin. Si vous le saisissez là-bas et choisissez un type de plan sous **Afficher les plans pour**, le téléviseur suit ce type de plan dans le [Mode Plan](../plan-mode/) au lieu d'un calendrier. Consultez [Associer votre appareil](../plan-mode/device-pairing).

## Modifier ou dissocier depuis le téléviseur {#changing-or-unpairing-from-the-tv}

Une fois le téléviseur associé, la ligne **Associer à un calendrier** dans **Paramètres** affiche le nom du groupe d'écrans qu'il suit. Sélectionnez la ligne pour ouvrir la boîte de dialogue **Associé à**, qui propose trois options :

- **Conserver** - Ferme la boîte de dialogue. Rien ne change.
- **Dissocier** - Arrête de suivre un calendrier. FreePlay ouvre l'écran **Fournisseurs de contenu**.
- **Associer à un autre calendrier** - Dissocie, puis affiche un nouveau code d'association pour que vous puissiez réassocier le téléviseur.

:::warning
Dissocier supprime les fichiers que FreePlay a téléchargés pour ce calendrier.
:::

## Dissocier depuis FreePlay Admin

1. Allez dans **Écrans** et cliquez sur le libellé de l'écran.
2. Cliquez sur **Plus**, puis sur **Dissocier**.
3. Cliquez à nouveau sur **Dissocier** pour confirmer.

Le téléviseur affiche de nouveau un code d'association. Associez-le à nouveau quand vous le souhaitez.

## Articles connexes

- **[Gérer les écrans et les groupes](./managing-screens)** - Renommer un écran, le déplacer dans un autre groupe ou vérifier ses téléchargements
- **[Planifier le calendrier](./scheduling-the-calendar)** - Décider ce que diffusent les écrans du groupe
- **[Choisir un mode d'association](../getting-started/pairing-modes)** - Comparer le mode Planifié avec le Mode Plan et la navigation manuelle dans les fournisseurs
