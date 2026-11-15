---
title: "Planifier le calendrier"
description: "Configurez un calendrier hebdomadaire ou ponctuel dans le Calendrier de FreePlay Admin pour diffuser des listes de lecture, des plans de service ou des dossiers de fournisseur sur vos groupes d'écrans, avec des boucles par défaut en secours."
---

# Planifier le calendrier

<div class="article-intro">

La page **Calendrier** de FreePlay Admin contrôle ce que chaque groupe d'écrans diffuse et à quel moment. Ajoutez une planification pour une liste de lecture, un plan de service ou un dossier de fournisseur, et réglez-la pour qu'elle se répète chaque semaine ou qu'elle ne joue qu'une fois. Lorsque rien n'est planifié, la boucle par défaut du groupe est diffusée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez au moins un groupe d'écrans. Voir [Gérer les écrans et les groupes](./managing-screens.md#screen-groups)
- [Créez une liste de lecture](./building-playlists.md), ou configurez un type de plan dans B1 Admin

</div>

## Lire le calendrier {#reading-the-calendar}

1. Accédez à **Calendrier**.
2. Choisissez un groupe d'écrans parmi les onglets en haut. Chaque onglet indique le nombre de planifications du groupe.
3. La vue hebdomadaire va du lundi au dimanche, de 6 h à 22 h. Une ligne rouge marque l'heure actuelle.
4. Utilisez les flèches pour passer à la semaine précédente ou suivante, ou cliquez sur **Aujourd'hui** pour revenir à la semaine en cours.

Le sous-titre de la page indique le fuseau horaire utilisé pour le calendrier. Les planifications suivent le fuseau horaire de votre église, que vous définissez dans B1 Admin sous [Informations sur l'église](../../b1-admin/settings/church-settings.md#time-zone). Si votre église n'a pas de fuseau horaire défini, FreePlay utilise celui de votre campus. Le calendrier et vos téléviseurs utilisent le même fuseau horaire : un bloc placé à 9 h 00 dans le calendrier se lance à 9 h 00 à l'écran, même si votre ordinateur est réglé sur un autre fuseau horaire.

Les planifications sont codées par couleur selon leur type. Une légende explique les couleurs :

- **Boucle par défaut** - Fond hachuré, affiché derrière tout le reste lorsque le groupe a une boucle par défaut
- **Liste de lecture**
- **Plan de service**
- **Dossier de fournisseur**

Chaque bloc affiche son nom, et les blocs plus hauts affichent aussi les horaires, s'il se répète (**chaque semaine** ou **une fois**), et ce qui se passe lorsqu'il se termine plus tôt.

## Définir la boucle par défaut {#setting-the-default-loop}

La boucle par défaut est diffusée sur les écrans du groupe chaque fois que rien n'est planifié.

1. Sur la page **Calendrier**, cliquez sur **Boucle par défaut…** dans l'en-tête. Si une boucle par défaut est déjà définie, le bouton affiche **Boucle par défaut :** suivi du nom de la liste de lecture.
2. Choisissez une **Liste de lecture**, ou choisissez **Aucune — écran éteint**.
3. Cliquez sur **Enregistrer**.

## Ajouter une planification {#adding-a-schedule}

Il existe trois façons de commencer une nouvelle planification :

- Cliquez sur un emplacement vide du calendrier. Le formulaire s'ouvre avec ce jour et cette demi-heure déjà renseignés.
- Cliquez sur **Ajouter une planification** dans l'en-tête.
- Choisissez **Ajouter une planification** dans la palette de commandes (**Ctrl+K** ou **⌘K**).

Remplissez ensuite le formulaire :

1. **Diffuser** - Choisissez ce qui sera diffusé :
   - **Listes de lecture** - Toute liste de lecture que vous avez créée
   - **Plans de service** - Un type de plan de B1 Admin, marqué **(plan en cours)**. L'écran diffuse chaque semaine le plan en cours pour ce type de plan, y compris les leçons Go Curriculum (y compris les leçons personnalisées), qui utilisent le compte Go lié au ministère du type de plan
   - **Dossier de fournisseur…** - Ouvre **Choisir un dossier de fournisseur**. Parcourez jusqu'à un dossier et cliquez sur **Utiliser ce dossier**. Pour en choisir un autre plus tard, cliquez sur **Modifier**
2. **Répétition** - Sélectionnez les jours de la semaine où cette planification sera diffusée. Pour une seule date à la place, activez **Une fois** et choisissez la **Date**.
3. **Début** et **Fin** - Les heures de début et de fin de la planification.
4. **S'il se termine plus tôt** - Ce qu'il faut faire lorsque le contenu se termine avant l'heure de fin :
   - **Boucler jusqu'à l'heure de fin** - Recommence depuis le début. Idéal pour les boucles d'affichage, les annonces et les compte à rebours
   - **Rythme de l'enseignant** - Les diapositives attendent la télécommande de l'enseignant. La leçon reste affichée après l'heure de fin jusqu'à la dernière diapositive
   - **Lire une fois, puis revenir à la boucle par défaut**
5. Pour les planifications récurrentes, réglez **Débute le** sur la première date. Sous **Se termine**, choisissez **Jamais**, ou choisissez **À une date** et saisissez une **Date de fin**.
6. Cliquez sur **Enregistrer**.

:::info
**Rythme de l'enseignant** remplace l'ancienne option « garder la dernière diapositive ». Les planifications enregistrées avec cette option se diffusent désormais en rythme de l'enseignant.
:::

## Modifier ou supprimer une planification {#editing-or-deleting-a-schedule}

1. Cliquez sur le bloc de la planification dans le calendrier.
2. Modifiez n'importe quel champ et cliquez sur **Enregistrer**, ou cliquez sur **Supprimer** pour retirer la planification.

## Planifications qui se chevauchent {#overlapping-schedules}

Si deux planifications se chevauchent, le formulaire affiche un avertissement : **Chevauche une autre planification. Celle qui commence en dernier l'emporte.** Pendant que la planification la plus tardive est en cours, les écrans la diffusent. Lorsqu'elle se termine, ils reviennent à la planification précédente si celle-ci est toujours en cours.

## Comment les écrans prennent en compte les modifications {#how-screens-pick-up-changes}

Les écrans jumelés téléchargent tout ce qui est planifié pour les 7 prochains jours, et vérifient seuls s'il y a des modifications. Vous n'avez pas besoin de toucher au téléviseur après avoir modifié le calendrier. Pour savoir si un écran a tout ce qu'il lui faut, consultez **Prêt jusqu'au** sur la [page Écrans](./managing-screens.md).

## Articles connexes {#related-articles}

- **[Créer des listes de lecture](./building-playlists.md)** - Créer les listes de lecture que vous planifiez
- **[Lecture planifiée sur le téléviseur](./scheduled-playback.md)** - Comment fonctionnent les leçons en rythme de l'enseignant et la télécommande sur le téléviseur
- **[Gérer les écrans et les groupes](./managing-screens.md)** - Ajouter des groupes et vérifier les téléchargements de chaque écran
- **[Garder seulement une partie de chaque leçon](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Réduire chaque leçon planifiée d'un type de plan aux parties que votre salle diffuse
