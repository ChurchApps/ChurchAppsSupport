---
title: "Lecture planifiée sur le téléviseur"
---

# Lecture planifiée sur le téléviseur

<div class="article-intro">

Une fois qu'un téléviseur est jumelé à un calendrier, FreePlay le fait fonctionner pour vous. Il télécharge la semaine à venir, change de contenu aux heures prévues et continue de lire depuis son propre stockage si la connexion Internet est coupée. Un enseignant ou un bénévole peut toujours mettre en pause, passer au suivant et naviguer avec la télécommande du téléviseur.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- [Jumeler le téléviseur à un calendrier](./pairing-a-screen)
- [Placer du contenu dans le calendrier](./scheduling-the-calendar), ou définir une boucle par défaut pour le groupe de l'écran

</div>

## Ce que fait le téléviseur de lui-même

- **S'ouvre directement sur l'horaire** -- Lorsqu'un téléviseur jumelé démarre FreePlay, il passe directement au lecteur planifié
- **Télécharge à l'avance** -- FreePlay télécharge chaque fichier planifié pour les 7 prochains jours, ainsi que la boucle par défaut, et lit à partir de ces téléchargements
- **Joue selon l'horloge** -- À chaque heure de début prévue, l'écran passe à ce contenu. Lorsque rien n'est planifié, il joue la boucle par défaut du groupe
- **Vérifie les changements** -- FreePlay vérifie régulièrement FreePlay Admin pour les changements du calendrier et télécharge tout élément nouveau
- **Corrige les fichiers défectueux** -- Si un fichier téléchargé ne peut pas être lu, FreePlay l'ignore et le télécharge à nouveau

Avant l'arrivée des premiers fichiers, l'écran affiche **Chargement de l'horaire...** ou **Téléchargement de X fichiers sur Y**. Si rien n'est planifié et que le groupe n'a pas de boucle par défaut, il affiche **Rien n'est planifié pour le moment**.

## Le panneau d'information

Appuyez sur **Sélectionner** sur la télécommande pour ouvrir le panneau d'information. Il se ferme de lui-même après quelques secondes. Le panneau affiche :

- **En haut à droite** -- **Prêt jusqu'au** suivi d'une date lorsque tout ce qui précède cette date est téléchargé, ou **Téléchargement en cours** tant que des fichiers arrivent encore. En dessous, le nombre de fichiers téléchargés et une barre de progression
- **En bas à gauche** -- Le nom de ce qui est lu (ou **Boucle par défaut**), quel élément est à l'écran, et ce qui vient ensuite et à quelle heure
- **Dernière vérification** -- Le moment où FreePlay a vérifié pour la dernière fois les changements du calendrier

Le panneau comporte aussi trois boutons :

- **Épingler cette liste de lecture** -- Garde le contenu actuel en boucle et ignore le calendrier. Sélectionnez **Désépingler la liste de lecture** pour revenir à l'horaire
- **Parcourir le contenu** -- Quitte le lecteur planifié pour parcourir vos fournisseurs de contenu connectés
- **Paramètres** -- Ouvre les paramètres de FreePlay, où vous pouvez [dissocier ou jumeler à un autre calendrier](./pairing-a-screen#changing-or-unpairing-from-the-tv)

:::tip
Pour revenir à l'horaire après avoir parcouru le contenu, appuyez sur **Retour** sur la télécommande depuis l'écran **Fournisseurs de contenu**, ou ouvrez **Paramètres**, sélectionnez **Jumeler à un calendrier** et choisissez **Retour à l'horaire**. Un téléviseur jumelé revient aussi au lecteur planifié chaque fois que FreePlay repasse au premier plan, et il s'ouvre toujours sur le lecteur planifié.
:::

## Touches de la télécommande

| Touche de la télécommande | Action |
|---|---|
| **Sélectionner** | Ouvrir le panneau d'information |
| **Lecture/Pause** | Mettre en pause ou reprendre. Une icône de lecture s'affiche pendant la pause |
| **Flèche droite** | Diapositive ou vidéo suivante |
| **Flèche gauche** | Diapositive ou vidéo précédente |
| **Flèche haut** | Ouvrir la vue d'ensemble des diapositives pour passer à n'importe quelle diapositive |
| **Avance rapide** | Avancer de 10 secondes dans une vidéo |
| **Retour rapide** | Reculer de 10 secondes dans une vidéo |
| **Retour** | Fermer la vue d'ensemble des diapositives ou le panneau d'information, ou ouvrir le panneau d'information |

Suivant et précédent restent dans le contenu en cours de lecture. Ils ne reviennent au premier élément depuis le dernier que lorsque l'horaire est configuré pour boucler. L'avance rapide et le retour rapide ne fonctionnent que pendant une vidéo. Ils ne font rien sur une diapositive.

### Aller à une diapositive

Appuyez sur **Haut** pour ouvrir la vue d'ensemble des diapositives. Elle affiche chaque élément de la liste de lecture ou de la leçon en cours. Déplacez-vous jusqu'à celui que vous voulez et appuyez sur **Sélectionner** pour y aller directement.

## Leçons à rythme enseignant

Lorsqu'un horaire est réglé sur **Au rythme de l'enseignant**, les diapositives d'image ne passent pas à la suivante toutes seules. L'enseignant avance avec la **flèche droite**. Une vidéo se joue jusqu'à la fin, puis passe à l'élément suivant.

Une leçon au rythme de l'enseignant reste à l'écran au-delà de son heure de fin prévue jusqu'à ce que l'enseignant atteigne la dernière diapositive et qu'elle se termine. L'écran passe alors à ce qui est prévu ensuite. Cela évite qu'un cours qui dépasse l'heure soit coupé au milieu de la leçon.

## Présenter depuis un navigateur

Vous pouvez aussi lire le calendrier d'un écran dans un navigateur web. Dans FreePlay Admin, ouvrez l'écran depuis la page **Écrans** et cliquez sur **Présenter dans le navigateur**. Le navigateur suit le calendrier de cet écran de la même façon que le téléviseur, et la barre de contrôle indique ce qui vient ensuite. Utilisez **Espace** pour mettre en pause, **←** / **→** pour passer, **F** pour le plein écran et **Échap** pour quitter.

## Articles connexes

- **[Planifier le calendrier](./scheduling-the-calendar)** - Définir ce qui joue et ce qui se passe lorsque le contenu se termine plus tôt
- **[Gérer les écrans et les groupes](./managing-screens)** - Vérifier les téléchargements de chaque écran depuis FreePlay Admin
- **[Lecture du contenu](../content-providers/playing-content)** - Commandes du lecteur lorsque vous lisez vous-même le contenu
