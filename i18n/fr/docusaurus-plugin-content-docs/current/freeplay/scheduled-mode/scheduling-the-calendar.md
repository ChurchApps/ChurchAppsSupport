---
title: "Planifier le calendrier"
---

# Planifier le calendrier

<div class="article-intro">

La page **Calendrier** de FreePlay Admin détermine ce que chaque groupe d'écrans diffuse et à quel moment. Ajoutez une programmation pour une liste de lecture, un plan de culte ou un dossier de fournisseur, et réglez-la pour qu'elle se répète chaque semaine ou ne joue qu'une seule fois. Lorsque rien n'est programmé, la boucle par défaut du groupe est diffusée.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Créez au moins un groupe d'écrans. Voir [Gérer les écrans et les groupes](./managing-screens#screen-groups)
- [Créez une liste de lecture](./building-playlists), ou configurez un type de plan dans B1 Admin

</div>

## Lire le calendrier

1. Allez sur **Calendrier**.
2. Choisissez un groupe d'écrans parmi les onglets en haut. Chaque onglet indique le nombre de programmations du groupe.
3. La vue hebdomadaire va du lundi au dimanche, de 6 h à 22 h. Une ligne rouge marque l'heure actuelle.
4. Utilisez les flèches pour passer à la semaine précédente ou suivante, ou cliquez sur **Aujourd'hui** pour revenir à cette semaine.

Le sous-titre de la page indique le fuseau horaire utilisé pour le calendrier. Les programmations suivent le fuseau horaire de votre église. Si votre église n'a pas de fuseau horaire défini, FreePlay utilise celui de votre campus.

Les programmations sont colorées selon leur type. Une légende explique les couleurs :

- **Boucle par défaut** -- Fond hachuré, affiché derrière tout le reste lorsque le groupe a une boucle par défaut
- **Liste de lecture**
- **Plan de culte**
- **Dossier de fournisseur**

Chaque bloc affiche son nom ; les blocs plus hauts affichent aussi les heures, s'ils se répètent (**chaque semaine** ou **une fois**) et ce qui se passe lorsque le contenu se termine plus tôt.

## Définir la boucle par défaut

La boucle par défaut est diffusée sur les écrans du groupe chaque fois que rien n'est programmé.

1. Sur la page **Calendrier**, cliquez sur **Boucle par défaut** dans l'en-tête. Si une boucle par défaut est déjà définie, le bouton affiche **Boucle par défaut :** suivi du nom de la liste de lecture.
2. Choisissez une **Liste de lecture**, ou choisissez **Aucune -- l'écran s'éteint**.
3. Cliquez sur **Enregistrer**.

## Ajouter une programmation

Il existe trois façons de créer une nouvelle programmation :

- Cliquez sur un emplacement vide du calendrier. Le formulaire s'ouvre avec ce jour et cette demi-heure déjà renseignés.
- Cliquez sur **Ajouter une programmation** dans l'en-tête.
- Choisissez **Ajouter une programmation** dans la palette de commandes (**Ctrl+K** ou **⌘K**).

Remplissez ensuite le formulaire :

1. **Diffuser** -- Choisissez ce qui sera diffusé :
   - **Listes de lecture** -- Toute liste de lecture que vous avez créée
   - **Plans de culte** -- Un type de plan de B1 Admin, marqué **(plan actuel)**. L'écran diffuse chaque semaine le plan en cours pour ce type de plan
   - **Dossier de fournisseur** -- Ouvre **Choisir un dossier de fournisseur**. Parcourez jusqu'à un dossier et cliquez sur **Utiliser ce dossier**. Pour en choisir un autre plus tard, cliquez sur **Modifier**
2. **Répétition** -- Sélectionnez les jours de la semaine où la programmation sera diffusée. Pour une date unique, activez **Une fois** et choisissez la **Date**.
3. **Début** et **Fin** -- Les heures de début et de fin de la programmation.
4. **Si elle se termine plus tôt** -- Ce qu'il faut faire lorsque le contenu se termine avant l'heure de fin :
   - **Boucler jusqu'à l'heure de fin** -- Recommence depuis le début. Idéal pour les boucles de signalétique, les annonces et les compte à rebours
   - **Rythme de l'enseignant** -- Les diapositives attendent la télécommande de l'enseignant. La leçon reste affichée après l'heure de fin, jusqu'à la dernière diapositive
   - **Diffuser une fois, puis revenir à la boucle par défaut**
5. Pour les programmations répétitives, réglez **Commence le** sur la première date. Sous **Se termine**, choisissez **Jamais**, ou choisissez **À une date** et saisissez une **Date de fin**.
6. Cliquez sur **Enregistrer**.

:::info
**Rythme de l'enseignant** a remplacé l'ancienne option « maintenir la dernière diapositive ». Les programmations enregistrées avec cette option s'exécutent désormais en rythme de l'enseignant.
:::

## Modifier ou supprimer une programmation

1. Cliquez sur le bloc de la programmation dans le calendrier.
2. Modifiez les champs souhaités puis cliquez sur **Enregistrer**, ou cliquez sur **Supprimer** pour retirer la programmation.

## Programmations qui se chevauchent

Si deux programmations se chevauchent, le formulaire affiche un avertissement : **Chevauche une autre programmation. Celle qui commence plus tard l'emporte.** Pendant que la programmation la plus tardive est en cours, les écrans la diffusent. Lorsqu'elle se termine, ils reviennent à la programmation antérieure si celle-ci est toujours en cours.

## Comment les écrans prennent en compte les changements

Les écrans appairés téléchargent tout ce qui est programmé pour les 7 jours suivants et vérifient seuls s'il y a des changements. Vous n'avez pas besoin de toucher au téléviseur après avoir modifié le calendrier. Pour savoir quand un écran dispose de tout ce dont il a besoin, consultez **Prêt jusqu'au** sur la [page Écrans](./managing-screens).

## Articles connexes

- **[Créer des listes de lecture](./building-playlists)** -- Créer les listes de lecture que vous programmez
- **[Lecture programmée sur le téléviseur](./scheduled-playback)** -- Comment les leçons en rythme de l'enseignant et la télécommande fonctionnent sur le téléviseur
- **[Gérer les écrans et les groupes](./managing-screens)** -- Ajouter des groupes et vérifier les téléchargements de chaque écran
