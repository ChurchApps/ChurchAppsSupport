---
title: "Associer un écran"
---

# Associer un écran

<div class="article-intro">

Pour placer un téléviseur sur un calendrier, associez-le à **FreePlay Admin**. Le téléviseur affiche un code de quatre lettres. Vous saisissez ce code sur [admin.freeplay.church](https://admin.freeplay.church) et choisissez le groupe d'écrans dont le calendrier doit être suivi. Vous ne faites cette opération qu'une seule fois par téléviseur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez et lancez FreePlay sur le téléviseur. Voir [Pour commencer](../getting-started/)
- Ayez un compte ChurchApps pour votre église afin de vous connecter à FreePlay Admin
- Facultativement, [créez une liste de lecture](./building-playlists) et [planifiez-la](./scheduling-the-calendar) d'abord, afin que le téléviseur ait quelque chose à lire immédiatement

</div>

## Afficher le code sur le téléviseur

1. Sur le téléviseur, ouvrez **Paramètres** au bas du panneau latéral.
2. Sélectionnez **Associer à un calendrier**. La ligne affiche **Non associé** tant que le téléviseur n'est pas associé.
3. L'écran **Associer cet écran** affiche un code QR et un code d'association de quatre lettres, avec le message **Scannez avec votre téléphone, ou allez à freeplay.church/pair et saisissez ce code**.
4. Sous le code, **En attente de confirmation** clignote pendant que FreePlay attend que vous terminiez l'association.

Le code est valable 15 minutes, et un compte à rebours sous le code indique le temps restant. Lorsque le temps est écoulé, FreePlay affiche automatiquement un nouveau code. Vous pouvez aussi sélectionner **Générer un nouveau code** pour en obtenir un neuf, ou **Annuler** pour revenir aux Paramètres.

## Associer dans FreePlay Admin

1. Scannez le code QR avec votre téléphone, ou allez à **freeplay.church/pair** sur n'importe quel ordinateur ou téléphone. Connectez-vous si on vous le demande. FreePlay Admin ouvre le formulaire **Associer un écran** avec le code déjà saisi.
   - Vous pouvez aussi ouvrir le formulaire vous-même. Allez à **Écrans** dans FreePlay Admin et cliquez sur **Associer un écran**.
2. Vérifiez le **code d'association**. Ce sont les quatre lettres affichées sur le téléviseur.
3. Saisissez un **libellé** pour distinguer ce téléviseur des autres, par exemple « Hall gauche ». Ce champ est facultatif.
4. Sous **Groupe**, choisissez le groupe d'écrans dont ce téléviseur doit suivre le calendrier. Pour en créer un nouveau, choisissez **＋ Nouveau groupe…** et saisissez un **nom du nouveau groupe**.
5. Sous **Mode**, laissez **Planifié** sélectionné. Le téléviseur jouera selon le calendrier du groupe, de façon autonome.
6. Cliquez sur **Associer**.

Le téléviseur affiche **Connecté !** puis **Chargement de votre horaire...**. Il télécharge le contenu planifié et commence la lecture. Voir [Lecture planifiée sur le téléviseur](./scheduled-playback).

:::info
Si FreePlay Admin indique **Ce code ne correspond à aucun téléviseur**, vérifiez le code affiché à l'écran. S'il a expiré, utilisez le nouveau code que le téléviseur affiche maintenant.
:::

### Planifié ou manuel

Le paramètre **Mode** propose deux options :

- **Planifié** - Joue selon le calendrier du groupe, de façon autonome. Personne n'a besoin d'appuyer sur Démarrer.
- **Manuel** - Une personne choisit le contenu avec la télécommande. Un écran manuel apparaît toujours dans votre liste **Écrans**, mais il ne suit pas de calendrier ; le champ **Groupe** est donc désactivé.

Vous pouvez changer le mode d'un écran plus tard depuis **Modifier** sur la [page Écrans](./managing-screens).

## Associer à un plan de service à la place

Le code de l'écran **Associer cet écran** fonctionne aussi dans B1 Admin. Si vous le saisissez là-bas et choisissez un type de plan sous **Afficher les plans pour**, le téléviseur suit ce type de plan dans le [Mode plan](../plan-mode/) au lieu d'un calendrier. Voir [Associer votre appareil](../plan-mode/device-pairing).

## Changer ou dissocier depuis le téléviseur {#changing-or-unpairing-from-the-tv}

Une fois le téléviseur associé, la ligne **Associer à un calendrier** dans **Paramètres** affiche le nom du groupe d'écrans qu'il suit. Sélectionnez cette ligne pour ouvrir la boîte de dialogue **Associé à**, qui propose trois options :

- **Retour au calendrier** - Ferme la boîte de dialogue et revient au lecteur planifié. L'association ne change pas.
- **Dissocier** - Arrête de suivre un calendrier. FreePlay ouvre l'écran **Fournisseurs de contenu**.
- **Associer à un autre calendrier** - Dissocie, puis affiche un nouveau code d'association pour que vous puissiez associer à nouveau le téléviseur.

:::warning
Dissocier supprime les fichiers que FreePlay a téléchargés pour ce calendrier.
:::

## Dissocier depuis FreePlay Admin

1. Allez à **Écrans** et cliquez sur le libellé de l'écran.
2. Cliquez sur **Plus**, puis sur **Dissocier**.
3. Cliquez de nouveau sur **Dissocier** pour confirmer.

Le téléviseur revient à l'affichage d'un code d'association. Associez-le à nouveau quand vous le souhaitez.

## Articles connexes

- **[Gérer les écrans et les groupes](./managing-screens)** - Renommer un écran, le déplacer dans un autre groupe ou vérifier ses téléchargements
- **[Planifier le calendrier](./scheduling-the-calendar)** - Décider ce que jouent les écrans du groupe
- **[Choisir un mode d'association](../getting-started/pairing-modes)** - Comparer le mode planifié, le mode plan et la navigation manuelle chez les fournisseurs
