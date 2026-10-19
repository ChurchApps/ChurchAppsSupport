---
title: "Lecture planifiée sur le téléviseur"
---

# Lecture planifiée sur le téléviseur

<div class="article-intro">

Une fois qu'un téléviseur est associé à un calendrier, FreePlay le fait fonctionner pour vous. Il télécharge la semaine à venir, change de contenu aux heures prévues, et continue de lire depuis son propre stockage si la connexion Internet est coupée. Un enseignant ou un bénévole peut toujours mettre en pause, passer au suivant et naviguer avec la télécommande du téléviseur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Associer le téléviseur à un calendrier](./pairing-a-screen)
- [Ajouter du contenu au calendrier](./scheduling-the-calendar), ou définir une boucle par défaut pour le groupe de l'écran

</div>

## Ce que fait le téléviseur de lui-même

- **Ouvre directement le planning** - Lorsqu'un téléviseur associé démarre FreePlay, il passe directement au lecteur planifié
- **Télécharge à l'avance** - FreePlay télécharge tous les fichiers planifiés pour les 7 prochains jours, ainsi que la boucle par défaut, et lit à partir de ces téléchargements
- **Lit selon l'horloge** - À chaque heure de début prévue, l'écran passe à ce contenu. Lorsque rien n'est planifié, il lit la boucle par défaut du groupe
- **Vérifie les changements** - FreePlay vérifie régulièrement les modifications du calendrier dans FreePlay Admin et télécharge tout élément nouveau
- **Corrige les fichiers défectueux** - Si un fichier téléchargé ne peut pas être lu, FreePlay le saute et le télécharge à nouveau

Avant l'arrivée des premiers fichiers, l'écran affiche **Chargement du planning...** ou **Téléchargement de X fichiers sur Y**. Si rien n'est planifié et que le groupe n'a pas de boucle par défaut, il affiche **Rien n'est planifié pour le moment**.

## Le panneau d'information

Appuyez sur **OK** sur la télécommande pour ouvrir le panneau d'information. Il se ferme automatiquement après quelques secondes. Le panneau affiche :

- **En haut à droite** - **Prêt jusqu'au** suivi d'une date lorsque tout jusqu'à cette date est téléchargé, ou **Téléchargement en cours** tant que des fichiers arrivent encore. En dessous, le nombre de fichiers téléchargés et une barre de progression
- **En bas à gauche** - Le nom de ce qui est en cours de lecture (ou **Boucle par défaut**), l'élément affiché à l'écran, et ce qui vient ensuite et à quelle heure
- **Dernière vérification** - Le moment où FreePlay a vérifié pour la dernière fois les modifications du planning

Le panneau comporte aussi trois boutons :

- **Épingler cette liste de lecture** - Garder le contenu en cours en boucle et ignorer le calendrier. Sélectionnez **Désépingler la liste** pour revenir au planning
- **Parcourir le contenu** - Quitter le lecteur planifié pour parcourir vos fournisseurs connectés
- **Paramètres** - Ouvrir les paramètres de FreePlay, où vous pouvez [dissocier ou associer un autre calendrier](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Pour revenir au planning après avoir parcouru le contenu, fermez puis rouvrez FreePlay. Un téléviseur associé s'ouvre toujours sur le lecteur planifié.
:::

## Commandes de la télécommande

| Touche de la télécommande | Action |
|---|---|
| **OK** | Ouvrir le panneau d'information |
| **Lecture/Pause** | Mettre en pause ou reprendre. Une icône de lecture s'affiche pendant la pause |
| **Flèche droite** | Diapositive ou vidéo suivante |
| **Flèche gauche** | Diapositive ou vidéo précédente |
| **Flèche haut** | Ouvrir la vue d'ensemble des diapositives pour aller à n'importe laquelle |
| **Avance rapide** | Avancer de 10 secondes dans une vidéo |
| **Retour rapide** | Reculer de 10 secondes dans une vidéo |
| **Retour** | Fermer la vue d'ensemble des diapositives ou le panneau d'information, ou ouvrir le panneau d'information |

Suivant et précédent restent dans le contenu en cours de lecture. Ils ne reviennent au premier élément depuis le dernier que lorsque le planning est défini en boucle. Avance rapide et Retour rapide ne fonctionnent que pendant une vidéo. Ils sont sans effet sur une diapositive.

### Aller à une diapositive

Appuyez sur **Haut** pour ouvrir la vue d'ensemble des diapositives. Elle affiche chaque élément de la liste de lecture ou de la leçon en cours. Déplacez-vous jusqu'à celui que vous voulez et appuyez sur **OK** pour y aller directement.

## Leçons à rythme imposé par l'enseignant

Lorsqu'un planning est défini sur **Rythme imposé par l'enseignant**, les diapositives d'image ne passent pas à la suivante toutes seules. L'enseignant avance avec la **flèche droite**. Une vidéo se joue jusqu'à la fin, puis passe à l'élément suivant.

Une leçon à rythme imposé par l'enseignant reste à l'écran au-delà de son heure de fin prévue, jusqu'à ce que l'enseignant atteigne la dernière diapositive et qu'elle se termine. L'écran passe alors à ce qui est prévu ensuite. Cela évite qu'une classe qui dépasse l'heure ne soit coupée en plein milieu de la leçon.

## Présenter depuis un navigateur {#presenting-from-a-browser}

Vous pouvez aussi lire le calendrier d'un écran dans un navigateur web. Dans FreePlay Admin, ouvrez l'écran depuis la page **Écrans** et cliquez sur **Présenter dans le navigateur**. Le navigateur suit le calendrier de cet écran de la même manière que le téléviseur, et la barre de commandes affiche ce qui arrive ensuite. Utilisez **Espace** pour mettre en pause, **←** / **→** pour passer, **F** pour le plein écran et **Échap** pour quitter.

## Articles connexes

- **[Planifier le calendrier](./scheduling-the-calendar)** - Définir ce qui est lu et ce qui se passe lorsque le contenu se termine plus tôt
- **[Gérer les écrans et les groupes](./managing-screens)** - Vérifier les téléchargements de chaque écran depuis FreePlay Admin
- **[Lire le contenu](../content-providers/playing-content)** - Commandes du lecteur lorsque vous lisez vous-même du contenu
