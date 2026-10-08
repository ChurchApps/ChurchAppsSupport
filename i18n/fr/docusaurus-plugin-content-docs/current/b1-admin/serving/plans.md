---
title: "Plans de service"
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date et un ministère spécifiques, ce qui facilite la coordination de vos équipes de bénévoles semaine après semaine et garantit que chaque service est entièrement pourvu en personnel.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et équipes dans la zone Service
- Assurez-vous que les bénévoles ont été ajoutés à votre [répertoire de personnes](../people/adding-people.md) et assignés à des équipes

</div>

## Accès aux plans

1. Dans B1 Admin, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), développez **Service**, et cliquez sur **Plans**.
2. Sélectionnez un **onglet ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour voir la liste des plans de ce type.
4. Cliquez sur un plan spécifique pour l'ouvrir.

:::info
L'accès complet en tant qu'administrateur n'est pas requis pour gérer les plans. N'importe qui qui est membre d'un ministère peut naviguer vers Service et créer, modifier et planifier les plans de son propre ministère sans avoir besoin de la permission Plans Edit. Les éditeurs avec le rôle Plans Edit peuvent gérer les plans sur chaque ministère.
:::

## Création d'un plan

1. À partir de la vue du type de plan, cliquez sur **Nouveau plan**.
2. Donnez au plan un nom ou utilisez la date comme nom. Sélectionnez la **date** du service.
3. Si vous souhaitez copier à partir d'un plan antérieur, choisissez positions uniquement ou positions et assignations. Si vous ne souhaitez pas copier, choisissez simplement rien. Vous pouvez également copier l'ordre de service du plan précédent. Lorsque vous copiez à partir d'un plan précédent, le nouveau plan conserve aussi les **Notes** et la **Date limite d'inscription** de ce plan, ce qui vous évite de les saisir de nouveau chaque semaine. Vous pouvez modifier l'un ou l'autre dans les paramètres du nouveau plan.
4. Enregistrez le plan. Vous pouvez maintenant commencer à assigner des membres d'équipe et à construire l'[ordre de service](./service-order.md).

## La page de détail du plan

Lorsque vous ouvrez un plan, vous verrez deux onglets :

- **Assignations** -- Gérez quels membres d'équipe sont assignés à ce plan. Vous pouvez ajouter des personnes de vos équipes existantes et voir qui a confirmé ou qui est en attente.
- **[Ordre de service](./service-order.md)** -- Construisez l'ordre de service avec des éléments comme les chansons d'adoration, les prières, les annonces et le sermon.

## Assignation des membres d'équipe

1. Ouvrez un plan et allez à l'onglet **Assignations**.
2. Cliquez sur **ajouter Position** pour l'développer. Remplissez les informations du formulaire ajouter une position. Pour le nom de catégorie, ajoutez la catégorie que vous souhaitez. Pour permettre à n'importe qui dans votre église de remplir la position (pas seulement les membres d'une équipe), laissez **Groupe de bénévoles** défini sur **Aucun**.
3. Cliquez sur **Personnes nécessaires** et choisissez les bénévoles pour remplir cette position. Si la position a un **Groupe de bénévoles**, vous choisissez parmi les membres de ce groupe. Si son Groupe de bénévoles est défini sur **Aucun**, vous pouvez plutôt rechercher n'importe qui dans votre église.
4. Ajoutez les membres de votre liste d'équipe en cliquant sur **Ajouter**.
5. Les membres assignés apparaîtront sous leur équipe avec leur statut d'assignation.
6. Cliquez sur notifier les bénévoles pour les notifier dans l'application B1 ou par e-mail.

Chaque position affiche une puce de décompte (par exemple, « 2/3 ») pour que vous puissiez voir combien de places sont remplies en un coup d'œil. En haut de l'onglet Assignations, une barre de progression et une puce de résumé (« X sur Y positions remplies ») affichent votre personnel global pour le plan, passant à **Entièrement pourvu** une fois que chaque position est couverte.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer les plans. De cette façon, vous aurez un pool de bénévoles prêt à assigner.
:::

## Paramètres du plan

Chaque plan a des paramètres supplémentaires que vous pouvez configurer en cliquant sur l'icône édition (crayon) du plan. Ceux-ci incluent :

- **Date limite de inscription** -- Le nombre d'heures avant le service lorsque les inscriptions de bénévoles se ferment. Entrez un nombre négatif pour garder les inscriptions ouvertes au-delà de l'heure de début du service.
- **Afficher les noms des bénévoles sur la page d'inscription** -- Lorsque coché, les bénévoles connectés peuvent voir qui d'autre est déjà inscrit pour chaque position sur la page d'inscription de B1.church. Les noms ne sont jamais affichés aux visiteurs qui ne sont pas connectés.
- **Crayon** -- Masque les assignations aux bénévoles jusqu'à ce que vous soyez prêt à publier le calendrier.
- **Planifier automatiquement un remplacement quand un bénévole décline** -- Lorsque coché, si un bénévole assigné décline sa position, B1 contactera automatiquement la prochaine personne disponible sur la liste d'équipe et demandera si elle peut servir. Cela continue dans la liste jusqu'à ce que quelqu'un accepte, gardant vos positions remplies sans suivi manuel.

## Rappels pour les bénévoles

B1 peut automatiquement rappeler aux bénévoles les services pour lesquels ils sont planifiés, afin que vous n'ayez pas à chasser votre équipe chaque semaine. Les rappels vont à **tous ceux qui sont planifiés** -- à la fois ceux qui ont confirmé et ceux qui n'ont pas encore répondu -- par e-mail et comme notification dans l'application/push. Chaque rappel inclut la position(s) du bénévole, la date du service, les notes du plan et votre message personnalisé.

Le calendrier et le contenu des rappels sont définis par **type de plan**, afin que chaque type de service puisse garder son propre calendrier.

1. À partir de la zone **Service**, sélectionnez le ministère qui contient le type de plan.
2. Cliquez sur l'**icône édition (crayon)** à côté du type de plan.
3. Dans la section **Rappels**, définissez :
   - **Jours de rappel avant le service** -- Une liste séparée par des virgules du nombre de jours à l'avance à envoyer, par exemple `7,1,0`. Utilisez `0` pour envoyer un rappel le jour du service. Laissez ce champ vide pour désactiver les rappels pour ce type de plan.
   - **Message de rappel personnalisé** *(optionnel)* -- Texte supplémentaire ajouté au rappel, tel que « Arrivez 30 minutes plus tôt pour répéter ».
4. Enregistrez le type de plan.

Les nouveaux types de plan rappellent aux bénévoles **2 jours avant** chaque service par défaut jusqu'à ce que vous changiez cela.

:::tip
Les bénévoles qui n'ont pas encore confirmé obtiennent les boutons **Accepter** et **Décliner** directement dans l'e-mail de rappel, afin qu'ils puissent répondre sans se connecter.
:::

:::info
Chaque rappel est envoyé une fois. Les plans qui sont toujours au crayon (pas encore envoyés à l'équipe) ne déclenchent pas de rappels.
:::

## Association de groupes avec un type de plan

Sous la liste des plans sur la page du type de plan, la section **Groupes** vous permet de décider quels groupes peuvent voir les plans de ce type de plan à partir de leur portail de membre. C'est un moyen rapide de montrer les services à venir aux bonnes équipes sans leur donner un accès administrateur.

1. Sur la page du type de plan, faites défiler jusqu'à la section **Groupes**.
2. Cliquez sur **Ajouter un groupe** et choisissez un groupe dans le menu déroulant.
3. Dans la colonne **Affiche**, choisissez si les membres de ce groupe devraient voir les plans **Passés**, **Futurs** ou **Les deux** pour ce type de plan.
4. Répétez pour associer des groupes supplémentaires, ou cliquez sur l'icône poubelle pour supprimer un groupe.

:::info
Seuls les groupes marqués comme **Standard** apparaissent dans le sélecteur. Les membres d'un groupe associé voient automatiquement les plans de ce type de plan sur la page du groupe dans le portail de membre B1 -- limités à la fenêtre passé/futur/les deux que vous avez sélectionnée.
:::

Si les plans sont des leçons Lessons.church, les membres du groupe associé voient également une carte **Leçon de cette semaine** sur la page du groupe (ligne inférieure, verset et une question pour les parents). Associez un groupe parent ici et définissez le filtre sur **Passé** afin que la leçon d'aujourd'hui soit incluse. Les équipes de bénévoles utilisent généralement **Futur** ou **Les deux**.

## Impression des plans

Vous pouvez imprimer un plan pour le distribuer à votre équipe. Ouvrez le plan, ouvrez l'onglet ordre de service et utilisez l'option **Imprimer** pour générer une version imprimable qui inclut les assignations et l'ordre de service. Le haut de l'impression affiche le nom de votre église et le nom du plan, afin que les pages détachées soient faciles à identifier. Ceci est utile pour la distribution aux répétitions ou l'affichage dans un endroit commun.

:::info
Les plans sont organisés par ministère. Assurez-vous que vous êtes sur le bon onglet ministère avant de créer ou afficher les plans.
:::

## Prochaines étapes

- Utilisez l'[Aperçu des plans](./plans-overview.md) pour voir toutes les assignations à venir sur plusieurs semaines en une seule grille et repérer les positions non remplies -- et assigner des bénévoles directement depuis la grille
- Enregistrez la structure d'un plan comme un [Modèle de plan](./plan-templates.md) pour pouvoir le marquer sur les plans futurs en un clic
- Construisez votre [Ordre de service](./service-order.md) avec des chansons, des lectures et d'autres éléments
- Ajoutez [chansons](./songs.md) de votre bibliothèque directement dans l'ordre de service
- Utilisez [Tâches](./tasks.md) pour assigner des éléments d'action de suivi aux membres de l'équipe
- Affichez le contenu de la leçon actuelle sur un téléviseur du hall d'accueil avec [Signalétique numérique](./digital-signage.md)
