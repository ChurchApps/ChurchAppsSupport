---
title: "Plans de service"
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date et un ministère spécifiques, ce qui facilite la coordination de vos équipes de bénévoles semaine après semaine et garantit que chaque service est complètement staffé.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et équipes dans la zone Service
- Assurez-vous que les bénévoles ont été ajoutés à votre [répertoire de personnes](../people/adding-people.md) et assignés aux équipes

</div>

## Accès aux plans

1. Naviguez vers **Service** depuis le menu principal.
2. Sélectionnez un **onglet de ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour voir la liste des plans pour ce type.
4. Cliquez sur un plan spécifique pour l'ouvrir.

:::info
L'accès complet d'administrateur n'est pas requis pour gérer les plans. Quiconque est membre d'un ministère peut naviguer vers Service et créer, modifier et planifier les plans pour son propre ministère sans avoir besoin de la permission Plans Modifier. Les éditeurs avec le rôle Plans Modifier peuvent gérer les plans dans chaque ministère.
:::

## Création d'un plan

1. Depuis la vue du type de plan, cliquez sur **Nouveau plan**.
2. Donnez au plan un nom ou utilisez la date comme nom. Sélectionnez la **date** du service.
3. Si vous souhaitez copier à partir d'un plan antérieur, choisissez les positions uniquement ou les positions et les assignations. Si vous ne voulez rien copier, choisissez rien. Vous pouvez aussi copier l'ordre du service de mon plan antérieur.
4. Enregistrez le plan. Vous pouvez maintenant commencer à assigner les membres de l'équipe et à construire l'[ordre du service](./service-order.md).

## La page de détail du plan

Quand vous ouvrez un plan, vous verrez deux onglets :

- **Assignations** -- Gérez quels membres de l'équipe sont assignés à ce plan. Vous pouvez ajouter des personnes de vos équipes existantes et voir qui a confirmé ou est toujours en attente.
- **[Ordre du service](./service-order.md)** -- Construisez l'ordre du service avec des éléments comme les chansons d'adoration, les prières, les annonces et le sermon.

## Assignation des membres de l'équipe

1. Ouvrez un plan et allez à l'onglet **Assignations**.
2. Cliquez sur **ajouter une position** pour l'étendre. Remplissez les informations dans le formulaire ajouter une position. Pour le nom de catégorie, ajoutez la catégorie que vous aimez.
3. Cliquez sur **Personnes nécessaires** et choisissez les bénévoles pour remplir cette position.
4. Ajoutez les membres de votre équipe en cliquant sur **Ajouter**.
5. Les membres assignés apparaîtront sous leur équipe avec leur statut d'assignation.
6. Cliquez sur notifier les bénévoles pour les notifier dans l'application B1 ou par email.

Chaque position affiche une puce de décompte (par exemple, "2/3") pour que vous puissiez voir combien de places sont remplies d'un coup d'œil. En haut de l'onglet Assignations, une barre de progression et une puce de résumé ("X de Y positions remplies") affichent votre staffing global pour le plan, en passant à **Complètement staffé** une fois que chaque position est couverte.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer les plans. De cette façon, vous aurez un bassin prêt de bénévoles pour assigner.
:::

## Paramètres du plan

Chaque plan a des paramètres supplémentaires que vous pouvez configurer en cliquant sur l'icône modifier (crayon) sur le plan. Ceux-ci incluent :

- **Délai d'inscription** — le nombre d'heures avant le service quand les inscriptions des bénévoles se ferment. Entrez un nombre négatif pour garder les inscriptions ouvertes passé l'heure de début du service.
- **Afficher les noms des bénévoles sur la page d'inscription** — quand cochée, les bénévoles peuvent voir qui d'autre s'est déjà inscrit pour chaque position.
- **Crayonné** — masque les assignations des bénévoles jusqu'à ce que vous soyez prêt à publier l'horaire.
- **Planifier automatiquement un remplacement quand un bénévole refuse** — quand cochée, si un bénévole assigné refuse sa position, B1 contactera automatiquement la personne suivante disponible sur la liste de l'équipe et demandera si elle peut servir. Cela continue dans la liste jusqu'à ce que quelqu'un accepte, gardant vos positions remplies sans suivi manuel.

## Rappels aux bénévoles

B1 peut automatiquement rappeler les bénévoles à l'avance des services pour lesquels ils sont planifiés, pour que vous n'ayez pas à chasser votre équipe chaque semaine. Les rappels vont à **tout le monde planifié** — à la fois ceux qui ont confirmé et ceux qui n'ont pas encore répondu — par email et comme une notification dans l'application/push. Chaque rappel inclut la ou les position(s) du bénévole, la date du service, les notes du plan et votre message personnalisé.

Le timing et le contenu des rappels sont définis par **type de plan**, pour que chaque type de service puisse garder son propre horaire.

1. Depuis la zone **Service**, sélectionnez le ministère qui contient le type de plan.
2. Cliquez sur l'**icône modifier (crayon)** à côté du type de plan.
3. Dans la section **Rappels**, définissez :
   - **Jours de rappel avant le service** — une liste séparée par des virgules du nombre de jours à l'avance à envoyer, par exemple `7,1,0`. Utilisez `0` pour envoyer un rappel le jour du service. Laissez ce champ vide pour désactiver les rappels pour ce type de plan.
   - **Message de rappel personnalisé** *(optionnel)* — texte supplémentaire ajouté au rappel, comme "Arrivez 30 minutes à l'avance pour les répétitions".
4. Enregistrez le type de plan.

Les nouveaux types de plan rappellent les bénévoles **2 jours avant** chaque service par défaut jusqu'à ce que vous changiez cela.

:::tip
Les bénévoles qui n'ont pas encore confirmé obtiennent des boutons **Accepter** et **Refuser** directement à l'intérieur de l'email de rappel, pour qu'ils puissent répondre sans se connecter.
:::

:::info
Chaque rappel est envoyé une fois. Les plans qui sont toujours crayonnés (pas encore envoyés à l'équipe) ne déclenchent pas de rappels.
:::

## Association de groupes à un type de plan

Sous la liste des plans sur la page du type de plan, la section **Groupes** vous permet de décider quels groupes peuvent voir les plans pour ce type de plan depuis leur portail de membres. C'est un moyen rapide de présenter les services à venir aux bonnes équipes sans leur donner l'accès administrateur.

1. Sur la page du type de plan, faites défiler jusqu'à la section **Groupes**.
2. Cliquez sur **Ajouter un groupe** et choisissez un groupe dans le menu déroulant.
3. Dans la colonne **Affiche**, choisissez si les membres de ce groupe doivent voir les plans **Passés**, **Futurs** ou **Les deux** pour ce type de plan.
4. Répétez pour associer des groupes supplémentaires, ou cliquez sur l'icône poubelle pour supprimer un groupe.

:::info
Seuls les groupes marqués comme **Standard** apparaissent dans le sélecteur. Les membres d'un groupe associé voient automatiquement les plans de ce type de plan sur l'onglet [Plans](/docs/b1-church/plans/) dans le portail des membres B1 — limité à la fenêtre passé/futur/les deux que vous avez sélectionnée.
:::

## Impression des plans

Vous pouvez imprimer un plan pour la distribution à votre équipe. Ouvrez le plan, ouvrez l'onglet ordre du service et utilisez l'option **Imprimer** pour générer une version imprimable qui inclut les assignations et l'ordre du service. Ceci est utile pour la distribution aux répétitions ou l'affichage dans une zone commune.

:::info
Les plans sont organisés par ministère. Assurez-vous d'être sur l'onglet du ministère correct avant de créer ou d'afficher les plans.
:::

## Prochaines étapes

- Utilisez l'[Aperçu des plans](./plans-overview.md) pour voir toutes les assignations à venir sur plusieurs semaines dans une grille et repérer les positions non remplies — et assigner les bénévoles directement depuis la grille
- Enregistrez la structure d'un plan comme [Modèle de plan](./plan-templates.md) pour pouvoir l'appliquer aux plans futurs en un seul clic
- Construisez votre [Ordre du service](./service-order.md) avec les chansons, les lectures et autres éléments
- Ajoutez des [chansons](./songs.md) de votre bibliothèque directement dans l'ordre du service
- Utilisez les [Tâches](./tasks.md) pour assigner les éléments d'action de suivi aux membres de l'équipe
