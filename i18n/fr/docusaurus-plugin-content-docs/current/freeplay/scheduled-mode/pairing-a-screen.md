---
title: "Jumeler un écran"
---

# Jumeler un écran

<div class="article-intro">

Pour afficher un calendrier sur un téléviseur, jumelez-le avec **FreePlay Admin**. Le téléviseur affiche un code à quatre lettres. Vous saisissez ce code sur [admin.freeplay.church](https://admin.freeplay.church) et choisissez le groupe d'écrans dont le calendrier doit être suivi. Vous ne faites cette opération qu'une seule fois par téléviseur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez et lancez FreePlay sur le téléviseur. Consultez [Premiers pas](../getting-started/)
- Ayez un compte ChurchApps pour votre église afin de vous connecter à FreePlay Admin
- Facultatif : [créez une liste de lecture](./building-playlists) et [planifiez-la](./scheduling-the-calendar) d'abord, afin que le téléviseur ait quelque chose à lire immédiatement

</div>

## Afficher le code sur le téléviseur

1. Sur le téléviseur, ouvrez **Paramètres** au bas de la barre latérale.
2. Sélectionnez **Jumeler à un calendrier**. La ligne affiche **Non jumelé** tant que le téléviseur n'est pas jumelé.
3. L'écran **Jumeler cet écran** affiche un code QR et un code de jumelage à quatre lettres, avec le message **Scannez avec votre téléphone, ou allez sur freeplay.church/pair et saisissez ce code**.
4. Sous le code, **En attente de confirmation** pulse pendant que FreePlay attend que vous terminiez le jumelage.

Le code est valide 15 minutes, et un compte à rebours sous celui-ci indique le temps restant. Lorsque le temps est écoulé, FreePlay affiche automatiquement un nouveau code. Vous pouvez aussi sélectionner **Générer un nouveau code** pour en obtenir un frais, ou **Annuler** pour revenir aux Paramètres.

## Jumeler dans FreePlay Admin

1. Scannez le code QR avec votre téléphone, ou allez sur **freeplay.church/pair** depuis n'importe quel ordinateur ou téléphone. Connectez-vous si vous y êtes invité. FreePlay Admin ouvre le formulaire **Jumeler un écran** avec le code déjà saisi.
   - Vous pouvez aussi ouvrir le formulaire vous-même. Rendez-vous dans **Écrans** dans FreePlay Admin et cliquez sur **Jumeler un écran**.
2. Vérifiez le **code de jumelage**. Ce sont les quatre lettres affichées sur le téléviseur.
3. Saisissez une **étiquette** pour distinguer ce téléviseur des autres, par exemple « Hall gauche ». Ce champ est facultatif.
4. Sous **Groupe**, choisissez le groupe d'écrans dont ce téléviseur doit suivre le calendrier. Pour en créer un nouveau, choisissez **＋ Nouveau groupe…** et saisissez un **Nom du nouveau groupe**.
5. Sous **Mode**, laissez **Planifié** sélectionné. Le téléviseur jouera selon le calendrier du groupe, de lui-même.
6. Cliquez sur **Jumeler**.

Le téléviseur affiche **Connecté !** puis **Chargement de votre horaire...**. Il télécharge ce qui est planifié et commence la lecture. Consultez [Lecture planifiée sur le téléviseur](./scheduled-playback).

:::info
Si FreePlay Admin affiche **Ce code ne correspond à aucun téléviseur**, vérifiez le code à l'écran. S'il a expiré, utilisez le nouveau code que le téléviseur affiche maintenant.
:::

### Planifié ou manuel

L'option **Mode** a deux choix :

- **Planifié** -- Joue selon le calendrier du groupe, de lui-même. Personne n'a besoin d'appuyer sur Démarrer.
- **Manuel** -- Quelqu'un choisit le contenu avec la télécommande. Un écran manuel apparaît toujours dans votre liste **Écrans**, mais il ne suit pas de calendrier ; le champ **Groupe** est donc désactivé.

Vous pouvez changer le mode d'un écran plus tard depuis **Modifier** sur la [page Écrans](./managing-screens).

## Jumeler à un plan de service plutôt

Le code de la page **Jumeler cet écran** fonctionne aussi dans B1 Admin. Si vous le saisissez là-bas et choisissez un type de plan sous **Afficher les plans pour**, le téléviseur suit ce type de plan dans le [Mode plan](../plan-mode/) au lieu d'un calendrier. Consultez [Jumeler votre appareil](../plan-mode/device-pairing).

## Changer ou dissocier depuis le téléviseur {#changing-or-unpairing-from-the-tv}

Une fois le téléviseur jumelé, la ligne **Jumeler à un calendrier** dans **Paramètres** affiche le nom du groupe d'écrans qu'il suit. Sélectionnez la ligne pour ouvrir la boîte de dialogue **Jumelé à**, qui propose trois options :

- **Retour à l'horaire** -- Ferme la boîte de dialogue et revient au lecteur planifié. Le jumelage ne change pas.
- **Dissocier** -- Arrête de suivre un calendrier. FreePlay ouvre l'écran **Fournisseurs de contenu**.
- **Jumeler à un autre calendrier** -- Dissocie, puis affiche un nouveau code de jumelage pour que vous puissiez jumeler de nouveau le téléviseur.

:::warning
Dissocier supprime les fichiers que FreePlay a téléchargés pour ce calendrier.
:::

## Dissocier depuis FreePlay Admin

1. Allez dans **Écrans** et cliquez sur l'étiquette de l'écran.
2. Cliquez sur **Plus**, puis sur **Dissocier**.
3. Cliquez de nouveau sur **Dissocier** pour confirmer.

Le téléviseur revient à l'affichage d'un code de jumelage. Jumelez-le à nouveau chaque fois que vous le souhaitez.

## Articles connexes

- **[Gérer les écrans et les groupes](./managing-screens)** - Renommer un écran, le déplacer dans un autre groupe ou vérifier ses téléchargements
- **[Planifier le calendrier](./scheduling-the-calendar)** - Décider ce que jouent les écrans du groupe
- **[Choisir un mode de jumelage](../getting-started/pairing-modes)** - Comparer le mode planifié, le mode plan et la consultation des fournisseurs par vous-même
