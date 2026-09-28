---
title: "Plans de service"
---

# Plans de service

<div class="article-intro">

Les plans de service organisent qui sert et quand. Chaque plan est lié à une date spécifique et un ministère, ce qui rend facile la coordination de vos équipes de bénévoles semaine après semaine et le maintien d'un personnel complet pour chaque service.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos ministères et équipes dans la zone Service
- Assurez-vous que les bénévoles ont été ajoutés à votre [annuaire des personnes](../people/adding-people.md) et assignés aux équipes

</div>

## Accès aux plans

1. Accédez à **Service** à partir du menu principal.
2. Sélectionnez un **onglet ministère** en haut de la page.
3. Cliquez sur un **type de plan** pour voir la liste des plans pour ce type.
4. Cliquez sur un plan spécifique pour l'ouvrir.

:::info
L'accès administrateur complet n'est pas nécessaire pour gérer les plans. Toute personne qui est membre d'un ministère peut accéder à Service et créer, modifier et programmer des plans pour son propre ministère sans avoir besoin de la permission Plans Edit. Les éditeurs avec le rôle Plans Edit peuvent gérer les plans dans tous les ministères.
:::

## Créer un plan

1. À partir de la vue du type de plan, cliquez sur **Nouveau plan**.
2. Donnez un nom au plan ou utilisez la date comme nom. Sélectionnez la **date** du service.
3. Si vous souhaitez copier à partir d'un plan précédent, choisissez positions uniquement ou positions et affectations. Si vous ne voulez pas copier, ne choisissez rien. Vous pouvez également copier l'ordre du service de mon plan précédent.
4. Enregistrez le plan. Vous pouvez maintenant commencer à assigner des membres d'équipe et à construire l'[ordre du service](./service-order.md).

## La page de détails du plan

Lorsque vous ouvrez un plan, vous verrez deux onglets :

- **Affectations** -- Gérez les membres d'équipe assignés à ce plan. Vous pouvez ajouter des personnes de vos équipes existantes et voir qui a confirmé ou qui est encore en attente.
- **[Ordre du service](./service-order.md)** -- Construisez l'ordre du service avec des éléments comme les chansons de culte, les prières, les annonces et le sermon.

## Affecter des membres d'équipe

1. Ouvrez un plan et accédez à l'onglet **Affectations**.
2. Cliquez sur **ajouter un poste** pour le développer. Remplissez les informations dans le formulaire d'ajout d'un poste. Pour le nom de la catégorie, ajoutez n'importe quelle catégorie que vous aimez.
3. Cliquez sur **Personnes nécessaires** et choisissez les bénévoles pour remplir ce poste. Si le poste a un **groupe de bénévoles**, vous choisissez parmi les membres de ce groupe. Si son groupe de bénévoles est défini sur **Aucun**, vous pouvez plutôt chercher n'importe qui dans votre église.
4. Ajoutez des membres de votre liste d'équipe en cliquant sur **Ajouter**.
5. Les membres assignés apparaîtront sous leur équipe avec leur statut d'affectation.
6. Cliquez sur notifier les bénévoles pour les notifier dans l'application B1 ou par e-mail.

Chaque poste affiche une puce de comptage (par exemple, "2/3") afin que vous puissiez voir d'un coup d'œil combien de postes sont remplis. En haut de l'onglet Affectations, une barre de progression et une puce de résumé ("X sur Y postes remplis") affichent votre personnel global pour le plan, devenant **Complètement doté** une fois que chaque poste est couvert.

:::tip
Configurez vos équipes dans les paramètres du ministère avant de créer les plans. De cette façon, vous aurez un pool prêt de bénévoles à assigner.
:::

## Paramètres du plan

Chaque plan a des paramètres supplémentaires que vous pouvez configurer en cliquant sur l'icône d'édition (crayon) sur le plan. Ceux-ci incluent :

- **Délai d'inscription** — le nombre d'heures avant le service lorsque les inscriptions des bénévoles se ferment. Entrez un nombre négatif pour garder les inscriptions ouvertes après l'heure de début du service.
- **Afficher les noms des bénévoles sur la page d'inscription** — lorsque cette option est cochée, les bénévoles peuvent voir qui d'autre s'est déjà inscrit pour chaque poste.
- **Crayon dedans** — masque les affectations des bénévoles jusqu'à ce que vous soyez prêt à publier le calendrier.
- **Programmer automatiquement un remplacement lorsqu'un bénévole refuse** — lorsque cette option est cochée, si un bénévole assigné refuse son poste B1 contactera automatiquement la prochaine personne disponible sur la liste de l'équipe et lui demandera si elle peut servir. Cela continue dans la liste jusqu'à ce que quelqu'un accepte, gardant vos postes remplis sans suivi manuel.

## Rappels aux bénévoles

B1 peut automatiquement rappeler aux bénévoles les services pour lesquels ils sont programmés, afin que vous n'ayez pas à courir après votre équipe chaque semaine. Les rappels vont à **tous les programmés** — à la fois ceux qui ont confirmé et ceux qui n'ont pas encore répondu — par e-mail et par notification dans l'application/push. Chaque rappel inclut le(s) poste(s) du bénévole, la date du service, les notes du plan et votre message personnalisé.

Le timing et le contenu des rappels sont définis par **type de plan**, afin que chaque type de service puisse conserver son propre calendrier.

1. À partir de la zone **Service**, sélectionnez le ministère qui contient le type de plan.
2. Cliquez sur l'icône **édition (crayon)** à côté du type de plan.
3. Dans la section **Rappels**, définissez :
   - **Rappel jours avant le service** — une liste séparée par des virgules du nombre de jours à l'avance pour envoyer, par exemple `7,1,0`. Utilisez `0` pour envoyer un rappel le jour du service. Laissez ce champ vide pour désactiver les rappels pour ce type de plan.
   - **Message de rappel personnalisé** *(optionnel)* — texte supplémentaire ajouté au rappel, comme "Arrivez 30 minutes à l'avance pour la répétition."
4. Enregistrez le type de plan.

Les nouveaux types de plan rappellent aux bénévoles **2 jours avant** chaque service par défaut jusqu'à ce que vous changiez cela.

:::tip
Les bénévoles qui n'ont pas encore confirmé obtiennent les boutons **Accepter** et **Refuser** directement dans le e-mail de rappel, afin qu'ils puissent répondre sans se connecter.
:::

:::info
Chaque rappel est envoyé une seule fois. Les plans qui sont toujours en crayon (pas encore envoyés à l'équipe) ne déclenchent pas de rappels.
:::

## Associer des groupes à un type de plan

Sous la liste des plans sur la page du type de plan, la section **Groupes** vous permet de décider quels groupes peuvent voir les plans pour ce type de plan à partir de leur portail des membres. C'est un moyen rapide de surfacer les services à venir aux bonnes équipes sans leur donner un accès administrateur.

1. Sur la page du type de plan, faites défiler vers le bas jusqu'à la section **Groupes**.
2. Cliquez sur **Ajouter un groupe** et choisissez un groupe dans le menu déroulant.
3. Dans la colonne **Affiche**, choisissez si les membres de ce groupe doivent voir **Passé**, **Futur** ou **Les deux** plans pour ce type de plan.
4. Répétez pour associer des groupes supplémentaires, ou cliquez sur l'icône de la corbeille pour supprimer un groupe.

:::info
Seuls les groupes étiquetés **Standard** apparaissent dans le sélecteur. Les membres d'un groupe associé voient automatiquement les plans de ce type de plan sur la page du groupe dans le portail des membres B1 — limités à la fenêtre passé/futur/les deux que vous avez sélectionnée.
:::

Si les plans sont des leçons Lessons.church, les membres du groupe associé voient également une carte **Leçon de cette semaine** sur la page du groupe (dernière ligne, verset et une question pour les parents). Associez un groupe de parents ici et définissez le filtre sur **Passé** afin que la leçon d'aujourd'hui soit incluse. Les équipes de bénévoles utilisent généralement **Futur** ou **Les deux**.

## Imprimer les plans

Vous pouvez imprimer un plan pour le distribuer à votre équipe. Ouvrez le plan, ouvrez l'onglet ordre du service et utilisez l'option **Imprimer** pour générer une version imprimable qui inclut les affectations et l'ordre du service. C'est utile pour distribuer lors des répétitions ou afficher dans une zone commune.

:::info
Les plans sont organisés par ministère. Assurez-vous d'être sur le bon onglet de ministère avant de créer ou d'afficher les plans.
:::

## Étapes suivantes

- Utilisez l'[Aperçu des plans](./plans-overview.md) pour voir toutes les affectations à venir sur plusieurs semaines en une seule grille et repérer les postes non pourvus — et assigner des bénévoles directement à partir de la grille
- Enregistrez la structure d'un plan en tant que [Modèle de plan](./plan-templates.md) afin de pouvoir l'estamper sur les plans futurs en un clic
- Construisez votre [Ordre du service](./service-order.md) avec des chansons, des lectures et d'autres éléments
- Ajoutez [chansons](./songs.md) de votre bibliothèque directement dans l'ordre du service
- Utilisez [Tâches](./tasks.md) pour assigner des éléments d'action de suivi aux membres de l'équipe
- Afficher le contenu de la leçon actuelle sur un téléviseur dans le hall avec [Signalisation numérique](./digital-signage.md)
