---
title: "Lecture planifiée sur le téléviseur"
description: "Une TV FreePlay appairée télécharge la semaine suivante et lit selon l'horloge, même hors ligne. Panneau d'informations, boutons et épinglage."
---

# Lecture planifiée sur le téléviseur

<div class="article-intro">

Une fois qu'un téléviseur est associé à un calendrier, FreePlay le fait fonctionner pour vous. Il télécharge la semaine à venir, change de contenu aux heures prévues et continue de jouer depuis son propre stockage si la connexion Internet est coupée. Un enseignant ou un bénévole peut toujours mettre en pause, passer et naviguer avec la télécommande du téléviseur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Associer le téléviseur à un calendrier](./pairing-a-screen.md)
- [Mettre quelque chose au calendrier](./scheduling-the-calendar.md), ou définir une boucle par défaut pour le groupe de l'écran

</div>

## Ce que fait le téléviseur de lui-même

- **S'ouvre directement sur le calendrier** - Lorsqu'un téléviseur associé lance FreePlay, il va directement au lecteur planifié
- **Télécharge à l'avance** - FreePlay télécharge chaque fichier prévu pour les 7 prochains jours, ainsi que la boucle par défaut, et lit à partir de ces téléchargements
- **Joue selon l'horloge** - À chaque heure de début prévue, l'écran passe à ce contenu. Lorsque rien n'est prévu, il joue la boucle par défaut du groupe
- **Vérifie les changements** - FreePlay consulte régulièrement FreePlay Admin pour détecter les changements de calendrier et télécharge tout élément nouveau
- **Répare les fichiers défectueux** - Si un fichier téléchargé ne se lit pas, FreePlay le saute et le télécharge à nouveau

Avant l'arrivée des premiers fichiers, l'écran affiche **Chargement de l'horaire...** ou **Téléchargement de X fichiers sur Y**. Si rien n'est prévu et que le groupe n'a pas de boucle par défaut, il affiche **Rien n'est prévu pour le moment**.

## Le panneau d'informations

Appuyez sur **Sélectionner** sur la télécommande pour ouvrir le panneau d'informations. Il se ferme automatiquement après quelques secondes. Le panneau affiche :

- **En haut à droite** - **Prêt jusqu'au** suivi d'une date lorsque tout jusqu'à cette date est téléchargé, ou **Téléchargement en cours** tant que des fichiers arrivent encore. En dessous, le nombre de fichiers téléchargés et une barre de progression
- **En bas à gauche** - Le nom de ce qui est en cours de lecture (ou **Boucle par défaut**), l'élément affiché à l'écran, et ce qui vient ensuite et à quelle heure
- **Dernière vérification** - Le moment où FreePlay a vérifié pour la dernière fois les changements du calendrier

Le panneau comporte aussi trois boutons :

- **Épingler cette liste de lecture** - Garde le contenu actuel en boucle et ignore le calendrier. Sélectionnez **Désépingler la liste de lecture** pour revenir au calendrier
- **Parcourir le contenu** - Quitte le lecteur planifié pour parcourir vos fournisseurs connectés
- **Paramètres** - Ouvre les paramètres de FreePlay, où vous pouvez [dissocier ou associer à un autre calendrier](./pairing-a-screen.md#changing-or-unpairing-from-the-tv)

:::tip
Pour revenir au calendrier après avoir parcouru le contenu, appuyez sur **Retour** de la télécommande depuis l'écran **Fournisseurs de contenu**, ou ouvrez **Paramètres**, sélectionnez **Associer à un calendrier** et choisissez **Retour au calendrier**. Un téléviseur associé revient aussi au lecteur planifié chaque fois que FreePlay repasse au premier plan, et il s'ouvre toujours sur le lecteur planifié.
:::

## Commandes de la télécommande

| Bouton de la télécommande | Action |
|---|---|
| **Sélectionner** | Ouvrir le panneau d'informations |
| **Lecture/Pause** | Mettre en pause ou reprendre. Une icône de lecture s'affiche pendant la pause |
| **Flèche droite** | Diapositive ou vidéo suivante |
| **Flèche gauche** | Diapositive ou vidéo précédente |
| **Flèche haut** | Ouvrir l'aperçu des diapositives pour aller à n'importe quelle diapositive |
| **Avance rapide** | Avancer de 10 secondes dans une vidéo |
| **Retour rapide** | Reculer de 10 secondes dans une vidéo |
| **Retour** | Fermer l'aperçu des diapositives ou le panneau d'informations, ou ouvrir le panneau d'informations |

Les touches suivant et précédent restent dans le contenu en cours de lecture. Elles ne reviennent au premier élément depuis le dernier que lorsque le calendrier est réglé en boucle. L'avance rapide et le retour rapide ne fonctionnent que pendant une vidéo ; ils ne font rien sur une diapositive.

### Aller à une diapositive

Appuyez sur **Haut** pour ouvrir l'aperçu des diapositives. Il affiche chaque élément de la liste de lecture ou de la leçon en cours. Déplacez-vous jusqu'à celui que vous voulez et appuyez sur **Sélectionner** pour y aller directement.

## Leçons à rythme enseignant

Lorsqu'un calendrier est réglé sur **Rythme enseignant**, les diapositives d'image ne passent pas à la suivante toutes seules. L'enseignant avance avec la **flèche droite**. Une vidéo se lit jusqu'à la fin, puis passe à l'élément suivant.

Une leçon à rythme enseignant reste à l'écran au-delà de son heure de fin prévue, jusqu'à ce que l'enseignant atteigne la dernière diapositive et qu'elle se termine. L'écran passe alors à ce qui est prévu ensuite. Ainsi, une classe qui dépasse l'heure n'est pas coupée au milieu de la leçon.

## Présenter depuis un navigateur {#presenting-from-a-browser}

Vous pouvez aussi lire le calendrier d'un écran dans un navigateur web. Dans FreePlay Admin, ouvrez l'écran depuis la page **Écrans** et cliquez sur **Présenter dans le navigateur**. Le navigateur suit le calendrier de cet écran de la même façon que le téléviseur, et la barre de commandes indique ce qui vient ensuite. Utilisez **Espace** pour mettre en pause, **←** / **→** pour passer, **F** pour le plein écran et **Échap** pour quitter.

## Articles connexes

- **[Planifier le calendrier](./scheduling-the-calendar.md)** - Définir ce qui est lu et ce qui se passe lorsque le contenu se termine plus tôt
- **[Gérer les écrans et les groupes](./managing-screens.md)** - Vérifier les téléchargements de chaque écran depuis FreePlay Admin
- **[Lire du contenu](../content-providers/playing-content.md)** - Commandes du lecteur lorsque vous lisez vous-même le contenu
