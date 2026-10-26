---
title: "Planifier le calendrier"
---

# Planifier le calendrier

<div class="article-intro">

La page **Calendar** de FreePlay Admin contrôle ce que diffuse chaque groupe d'écrans et à quel moment. Ajoutez une programmation pour une liste de lecture, un plan de culte ou un dossier de fournisseur, et réglez-la pour qu'elle se répète chaque semaine ou pour qu'elle ne soit jouée qu'une seule fois. Lorsque rien n'est programmé, la boucle par défaut du groupe est diffusée.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Créez au moins un groupe d'écrans. Voir [Gérer les écrans et les groupes](./managing-screens#screen-groups)
- [Créez une liste de lecture](./building-playlists), ou disposez d'un type de plan configuré dans B1 Admin

</div>

## Lire le calendrier

1. Allez dans **Calendar**.
2. Choisissez un groupe d'écrans dans les onglets en haut. Chaque onglet indique le nombre de programmations du groupe.
3. La vue hebdomadaire va du lundi au dimanche, de 6 h à 22 h. Une ligne rouge indique l'heure actuelle.
4. Utilisez les flèches pour passer à la semaine précédente ou suivante, ou cliquez sur **Today** pour revenir à cette semaine.

Le sous-titre de la page indique le fuseau horaire utilisé pour le calendrier. Les programmations suivent le fuseau horaire de votre église, que vous définissez dans B1 Admin sous [Informations sur l'église](../../b1-admin/settings/church-settings.md#time-zone). Si votre église n'a pas de fuseau horaire défini, FreePlay utilise celui de votre campus. Le calendrier et vos téléviseurs utilisent le même fuseau horaire : un bloc placé à 9 h 00 sur le calendrier se lance à 9 h 00 sur l'écran, même si votre ordinateur est réglé sur un autre fuseau horaire.

Les programmations sont colorées selon leur type. Une légende explique les couleurs :

- **Default loop** - Arrière-plan hachuré, affiché derrière tout le reste lorsque le groupe a une boucle par défaut
- **Playlist** (liste de lecture)
- **Service plan** (plan de culte)
- **Provider folder** (dossier de fournisseur)

Chaque bloc affiche son nom ; les blocs plus hauts affichent aussi les heures, s'ils se répètent (**weekly** ou **once**) et ce qui se passe lorsque le contenu se termine plus tôt.

## Définir la boucle par défaut

La boucle par défaut est diffusée sur les écrans du groupe chaque fois que rien n'est programmé.

1. Sur la page **Calendar**, cliquez sur **Default loop…** dans l'en-tête. Si une boucle par défaut est déjà définie, le bouton affiche **Default loop:** suivi du nom de la liste de lecture.
2. Choisissez une **Playlist**, ou choisissez **None — screen goes dark** (aucune — l'écran s'éteint).
3. Cliquez sur **Save**.

## Ajouter une programmation

Il existe trois façons de créer une nouvelle programmation :

- Cliquez sur un emplacement vide du calendrier. Le formulaire s'ouvre avec ce jour et cette demi-heure déjà renseignés.
- Cliquez sur **Add schedule** dans l'en-tête.
- Choisissez **Add schedule** dans la palette de commandes (**Ctrl+K** ou **⌘K**).

Remplissez ensuite le formulaire :

1. **Play** - Choisissez ce qui est diffusé :
   - **Playlists** - N'importe quelle liste de lecture que vous avez créée
   - **Service plans** - Un type de plan de B1 Admin, marqué **(current plan)**. L'écran diffuse chaque semaine le plan en cours pour ce type de plan, y compris les leçons Go Curriculum (même celles que vous avez personnalisées), qui utilisent l'identifiant Go lié au ministère du type de plan
   - **Provider folder…** - Ouvre **Choose a provider folder**. Parcourez jusqu'à un dossier et cliquez sur **Use this folder**. Pour choisir un autre dossier plus tard, cliquez sur **Change**
2. **Repeats** - Sélectionnez les jours de la semaine où cette programmation est diffusée. Pour une date unique, activez **One time** et choisissez la **Date**.
3. **Start** et **End** - Les heures de début et de fin de la programmation.
4. **If it finishes early** - Ce qu'il faut faire lorsque le contenu se termine avant l'heure de fin :
   - **Loop until the end time** - Recommence depuis le début. Idéal pour les boucles d'affichage, les annonces et les compte à rebours
   - **Teacher paced** - Les diapositives attendent la télécommande de l'enseignant. La leçon reste affichée au-delà de l'heure de fin jusqu'à la dernière diapositive
   - **Play once, then go back to the default loop** (diffuser une fois, puis revenir à la boucle par défaut)
5. Pour les programmations récurrentes, définissez **Starts** sur la première date. Sous **Ends**, choisissez **Never** ou choisissez **On date** et saisissez une **End date**.
6. Cliquez sur **Save**.

:::info
**Teacher paced** remplace l'ancienne option « hold the last slide » (maintenir la dernière diapositive). Les programmations enregistrées avec cette option sont désormais diffusées en mode teacher paced.
:::

## Modifier ou supprimer une programmation

1. Cliquez sur le bloc de la programmation dans le calendrier.
2. Modifiez le champ souhaité et cliquez sur **Save**, ou cliquez sur **Delete** pour supprimer la programmation.

## Programmations qui se chevauchent

Si deux programmations se chevauchent, le formulaire affiche un avertissement : **Overlaps another schedule. The one that starts later wins.** (Chevauche une autre programmation. Celle qui commence en dernier l'emporte.) Pendant que la programmation la plus tardive est en cours, les écrans la diffusent. Lorsqu'elle se termine, ils reviennent à la programmation précédente si celle-ci est toujours en cours.

## Comment les écrans prennent en compte les modifications

Les écrans associés téléchargent tout ce qui est programmé pour les 7 jours suivants, et vérifient eux-mêmes les modifications. Vous n'avez pas besoin de toucher au téléviseur après avoir modifié le calendrier. Pour savoir quand un écran dispose de tout ce dont il a besoin, consultez **Ready through** sur la [page Écrans](./managing-screens).

## Articles connexes

- **[Créer des listes de lecture](./building-playlists)** - Créez les listes de lecture que vous programmez
- **[Lecture programmée sur le téléviseur](./scheduled-playback)** - Comment fonctionnent les leçons en mode teacher paced et la télécommande sur le téléviseur
- **[Gérer les écrans et les groupes](./managing-screens)** - Ajouter des groupes et vérifier les téléchargements de chaque écran
