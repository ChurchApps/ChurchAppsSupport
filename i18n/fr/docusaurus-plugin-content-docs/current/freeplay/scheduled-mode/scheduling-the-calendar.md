---
title: "Planifier le calendrier"
---

# Planifier le calendrier

<div class="article-intro">

La page **Calendrier** dans FreePlay Admin contrôle ce que chaque groupe d'écrans diffuse et quand. Ajoutez une programmation pour une liste de lecture, un plan de service ou un dossier de fournisseur, et réglez-la pour qu'elle se répète chaque semaine ou pour qu'elle ne joue qu'une seule fois. Lorsqu'aucune programmation n'est prévue, la boucle par défaut du groupe est diffusée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez au moins un groupe d'écrans. Consultez [Gérer les écrans et les groupes](./managing-screens#screen-groups)
- [Créez une liste de lecture](./building-playlists), ou configurez un type de plan dans B1 Admin

</div>

## Lire le calendrier

1. Allez à **Calendrier**.
2. Choisissez un groupe d'écrans parmi les onglets en haut de la page. Chaque onglet indique le nombre de programmations du groupe.
3. La vue hebdomadaire va du lundi au dimanche, de 6 h à 22 h. Une ligne rouge indique l'heure actuelle.
4. Utilisez les flèches pour passer à la semaine précédente ou suivante, ou cliquez sur **Aujourd'hui** pour revenir à cette semaine.

Le sous-titre de la page indique le fuseau horaire utilisé pour le calendrier. Les programmations suivent le fuseau horaire de votre église, que vous définissez dans B1 Admin sous [Renseignements sur l'église](../../b1-admin/settings/church-settings.md#time-zone). Si votre église n'a pas de fuseau horaire défini, FreePlay utilise le fuseau horaire de votre campus. Le calendrier et vos téléviseurs utilisent le même fuseau horaire : un bloc placé à 9 h 00 sur le calendrier se diffuse à 9 h 00 à l'écran, même si votre ordinateur est réglé sur un autre fuseau horaire.

Les programmations sont codées par couleur selon leur type. Une légende explique les couleurs :

- **Boucle par défaut** - Arrière-plan hachuré, affiché derrière tout le reste lorsque le groupe a une boucle par défaut
- **Liste de lecture**
- **Plan de service**
- **Dossier de fournisseur**

Chaque bloc affiche son nom ; les blocs plus hauts affichent aussi les heures, si la programmation se répète (**chaque semaine** ou **une fois**) et ce qui se passe lorsqu'elle se termine plus tôt.

## Définir la boucle par défaut

La boucle par défaut est diffusée sur les écrans du groupe chaque fois qu'aucune programmation n'est prévue.

1. Sur la page **Calendrier**, cliquez sur **Boucle par défaut…** dans l'en-tête. Si une boucle par défaut est déjà définie, le bouton affiche **Boucle par défaut :** suivi du nom de la liste de lecture.
2. Choisissez une **liste de lecture**, ou choisissez **Aucune -- l'écran s'éteint**.
3. Cliquez sur **Enregistrer**.

## Ajouter une programmation

Il existe trois façons de commencer une nouvelle programmation :

- Cliquez sur un espace vide du calendrier. Le formulaire s'ouvre avec ce jour et cette demi-heure déjà remplis.
- Cliquez sur **Ajouter une programmation** dans l'en-tête.
- Choisissez **Ajouter une programmation** dans la palette de commandes (**Ctrl+K** ou **⌘K**).

Remplissez ensuite le formulaire :

1. **Diffuser** - Choisissez ce qui sera diffusé :
   - **Listes de lecture** - Toute liste de lecture que vous avez créée
   - **Plans de service** - Un type de plan de B1 Admin, marqué **(plan actuel)**. L'écran diffuse chaque semaine le plan actuel de ce type de plan, y compris les leçons Go Curriculum (même celles qui ont été personnalisées), qui utilisent le compte Go lié au ministère du type de plan
   - **Dossier de fournisseur…** - Ouvre **Choisir un dossier de fournisseur**. Parcourez jusqu'à un dossier et cliquez sur **Utiliser ce dossier**. Pour choisir un autre dossier plus tard, cliquez sur **Changer**
2. **Répétition** - Sélectionnez les jours de la semaine où la programmation sera diffusée. Pour une date unique, activez **Une fois** et choisissez la **date**.
3. **Début** et **Fin** - Les heures auxquelles la programmation commence et se termine.
4. **Si elle se termine plus tôt** - Ce qu'il faut faire lorsque le contenu est épuisé avant l'heure de fin :
   - **Boucler jusqu'à l'heure de fin** - Recommence depuis le début. Idéal pour les boucles d'affichage, les annonces et les comptes à rebours
   - **Rythmé par l'enseignant** - Les diapositives attendent la télécommande de l'enseignant. La leçon reste à l'écran après l'heure de fin jusqu'à la dernière diapositive
   - **Jouer une fois, puis revenir à la boucle par défaut**
5. Pour les programmations récurrentes, réglez **Commence le** à la première date. Sous **Se termine**, choisissez **Jamais**, ou choisissez **À une date** et saisissez une **date de fin**.
6. Cliquez sur **Enregistrer**.

:::info
**Rythmé par l'enseignant** a remplacé l'ancienne option « maintenir la dernière diapositive ». Les programmations enregistrées avec cette option sont maintenant lues en mode rythmé par l'enseignant.
:::

## Modifier ou supprimer une programmation

1. Cliquez sur le bloc de la programmation dans le calendrier.
2. Modifiez n'importe quel champ et cliquez sur **Enregistrer**, ou cliquez sur **Supprimer** pour retirer la programmation.

## Programmations qui se chevauchent

Si deux programmations se chevauchent, le formulaire affiche un avertissement : **Chevauche une autre programmation. Celle qui commence plus tard l'emporte.** Pendant que la programmation la plus tardive est en cours, les écrans la diffusent. Lorsqu'elle se termine, ils reviennent à la programmation précédente si celle-ci est toujours en cours.

## Comment les écrans prennent en compte les modifications

Les écrans jumelés téléchargent tout ce qui est programmé pour les 7 prochains jours, et ils vérifient eux-mêmes les changements. Vous n'avez pas besoin de toucher au téléviseur après avoir modifié le calendrier. Pour vérifier qu'un écran a tout ce dont il a besoin, consultez **Prêt jusqu'au** sur la [page Écrans](./managing-screens).

## Articles connexes

- **[Créer des listes de lecture](./building-playlists)** - Créez les listes de lecture que vous programmez
- **[Lecture programmée sur le téléviseur](./scheduled-playback)** - Comment fonctionnent les leçons rythmées par l'enseignant et la télécommande sur le téléviseur
- **[Gérer les écrans et les groupes](./managing-screens)** - Ajouter des groupes et vérifier les téléchargements de chaque écran
- **[Ne garder qu'une partie de chaque leçon](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Réduire chaque leçon programmée d'un type de plan aux parties diffusées dans votre salle
