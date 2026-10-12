---
title: "Modification en masse des personnes"
---

# Modification en masse des personnes

<div class="article-intro">
La modification en masse vous permet de mettre à jour plusieurs personnes à la fois, ce qui vous fait gagner du temps lorsque vous appliquez le même changement à de nombreuses personnes. Vous pouvez modifier le statut d'adhésion, le statut matrimonial, le genre, les préférences de désinscription et l'appartenance aux groupes en une seule opération.
</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer les données des personnes. Voir [Roles & Permissions](./roles-permissions.md) pour plus de détails.
- Vous devez déjà avoir ajouté ou importé les personnes que vous voulez modifier. Voir [Adding People](./adding-people.md) si nécessaire.
</div>

## Sélectionner les personnes pour la modification en masse

1. Accédez à **People** dans B1 Admin
2. Utilisez les outils de recherche ou de filtre pour trouver les personnes que vous voulez mettre à jour
3. Cochez les cases pour sélectionner les personnes
   - Dans la vue **Households**, cocher un ménage sélectionne toutes les personnes qui le composent
   - Dans la vue **Table** (à basculer avec le sélecteur **View as**), vous pouvez sélectionner les personnes une par une
   - Vous pouvez aussi utiliser la case au-dessus de la liste pour sélectionner toutes les personnes visibles
4. Dès que vous avez sélectionné au moins une personne, la barre au-dessus de la liste indique combien de personnes sont sélectionnées, avec **Clear Selection** et un bouton **Actions**

:::tip
Si vous devez mettre à jour un grand groupe de personnes selon des critères précis, utilisez la fonctionnalité [AI Search](./ai-search.md) ou les filtres pour affiner d'abord votre liste, puis sélectionnez toutes les personnes correspondantes.
:::

## Actions en masse disponibles

Le menu **Actions** propose plusieurs options :

### Mettre à jour le statut d'adhésion

Mettez à jour le statut d'adhésion de toutes les personnes sélectionnées :

1. Cliquez sur **Actions** → **Set Membership Status**
2. Choisissez le nouveau statut :
   - **Visitor** -- Visiteurs occasionnels ou de première fois
   - **Guest** -- Invités, comme les familles enregistrées sur une borne d'enregistrement
   - **Regular Attendee** -- Participants réguliers qui ne sont pas membres
   - **Member** -- Membres officiels de l'église
   - **Staff** -- Membres du personnel de l'église
   - **Inactive** -- Personnes qui ne fréquentent plus l'église
   - **Deceased** -- Personnes décédées
3. Choisissez le mode de mise à jour :
   - **Overwrite all** -- Remplacer le statut actuel de toutes les personnes sélectionnées
   - **Only update empty** -- Définir le statut uniquement pour les personnes qui n'en ont pas
4. Cliquez sur **Update**

### Mettre à jour le statut matrimonial

Mettez à jour le statut matrimonial en masse :

1. Cliquez sur **Actions** → **Set Marital Status**
2. Sélectionnez le nouveau statut :
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Choisissez si vous voulez écraser les valeurs existantes ou ne mettre à jour que les champs vides
4. Cliquez sur **Update**

### Mettre à jour le genre

Mettez à jour les informations de genre pour plusieurs personnes :

1. Cliquez sur **Actions** → **Set Gender**
2. Sélectionnez la valeur :
   - **Unspecified**
   - **Male**
   - **Female**
3. Choisissez le mode de mise à jour (tout remplacer ou seulement les champs vides)
4. Cliquez sur **Update**

### Mettre à jour le statut de désinscription

Contrôlez si les personnes ont choisi de ne pas recevoir de communications :

1. Cliquez sur **Actions** → **Set Directory Opt-Out**
2. Choisissez :
   - **No** -- Autoriser les communications (retirer la désinscription)
   - **Yes** -- Bloquer les communications (définir la désinscription)
3. Choisissez le mode de mise à jour
4. Cliquez sur **Update**

:::warning
Soyez prudent lorsque vous modifiez le statut de désinscription. Les personnes qui se sont explicitement désinscrites ne doivent pas recevoir de communications sans nouveau consentement de leur part.
:::

### Définir un champ personnalisé

Définissez une valeur Oui/Non pour un [champ personnalisé](../settings/custom-fields.md) pour toutes les personnes sélectionnées en une seule fois :

1. Cliquez sur **Actions** → **Set Custom Field**.
2. Choisissez le champ personnalisé Oui/Non que vous voulez définir.
3. Choisissez la valeur (**Yes** ou **No**) à appliquer.
4. Cliquez sur **Update**.

:::info
Seuls les champs personnalisés Oui/Non sont disponibles pour cette action en masse. Pour définir d'autres types de champs, modifiez chaque personne individuellement.
:::

### Ajouter à un groupe

Ajoutez toutes les personnes sélectionnées à un ou plusieurs groupes :

1. Cliquez sur **Actions** → **Add to Group**
2. Recherchez et sélectionnez le ou les groupes auxquels ajouter les personnes
3. Vous pouvez sélectionner plusieurs groupes pour y ajouter les personnes en une fois
4. Cliquez sur **Add to Groups**

Chaque personne est ajoutée en tant que membre ordinaire du ou des groupes sélectionnés. Vous pourrez ensuite promouvoir certaines personnes en tant que leaders de groupe depuis la page [Group Members](../groups/group-members.md).

### Retirer d'un groupe

Retirez toutes les personnes sélectionnées d'un ou plusieurs groupes :

1. Cliquez sur **Actions** → **Remove from Group**
2. Recherchez et sélectionnez le ou les groupes dont retirer les personnes
3. Vous pouvez sélectionner plusieurs groupes
4. Cliquez sur **Remove from Groups**

:::info
Cette action retire uniquement les personnes des groupes indiqués. Elle ne supprime pas leurs fiches de personne.
:::

### Supprimer des personnes

Supprimez définitivement les personnes sélectionnées de la base de données de votre église :

1. Cliquez sur **Actions** → **Delete**
2. La boîte de dialogue **Delete Selected People** vous demande de confirmer le nombre de personnes qui seront supprimées
3. Cliquez sur **Delete**

:::danger
La suppression de personnes est définitive et ne peut pas être annulée. Toutes leurs données seront supprimées, notamment :
- Les informations personnelles
- Les appartenances aux groupes
- Les enregistrements de présence
- L'historique des dons
- Les soumissions de formulaires

N'utilisez cette action que si vous êtes absolument certain de vouloir retirer ces personnes de votre système.
:::

## Résultats de la modification en masse

Une fois une action en masse terminée, vous voyez un résumé indiquant :

- **Total selected** -- Le nombre de personnes incluses dans l'opération
- **Successfully updated** -- Le nombre d'enregistrements modifiés
- **Failed** -- Les enregistrements qui n'ont pas pu être mis à jour (le cas échéant)
- **Unchanged** -- Les enregistrements qui n'avaient pas besoin de modification (par exemple, en mode « only update empty »)

Si certaines mises à jour ont échoué, vous voyez le détail des erreurs et leur motif.

## Bonnes pratiques

- **Commencez petit** -- Testez d'abord les opérations en masse sur quelques enregistrements pour vérifier que vous faites les bonnes modifications
- **Utilisez les filtres** -- Affinez votre liste avec des filtres ou la recherche IA avant de sélectionner les personnes, pour ne mettre à jour que les bonnes personnes
- **Vérifiez deux fois la sélection** -- Relisez les personnes sélectionnées avant d'appliquer des modifications en masse
- **Utilisez le mode « only update empty »** -- Lorsque vous voulez compléter des données manquantes sans écraser les informations existantes
- **Documentez les changements importants** -- Gardez des notes sur les mises à jour en masse au cas où vous en auriez besoin plus tard
- **Coordonnez-vous avec votre équipe** -- Prévenez les autres administrateurs lorsque vous effectuez de grosses modifications en masse

## Cas d'utilisation courants

### Mettre à jour les nouveaux membres

Après un cours d'intégration, passez au statut Member tous les participants :

1. Recherchez les personnes qui ont suivi le cours
2. Sélectionnez-les toutes
3. Utilisez **Actions** → **Set Membership Status** → **Member**

### Organiser les petits groupes

Ajoutez plusieurs personnes à un nouveau petit groupe :

1. Recherchez les personnes que vous voulez dans le groupe
2. Sélectionnez-les
3. Utilisez **Actions** → **Add to Group** et sélectionnez le petit groupe

### Nettoyer les données

Complétez le statut matrimonial manquant pour les couples mariés :

1. Filtrez les personnes mariées (à l'aide des informations du ménage)
2. Sélectionnez celles dont le statut matrimonial est vide
3. Utilisez **Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Articles connexes

- [Searching People](./searching-people.md) -- Trouver les personnes à modifier
- [AI Search](./ai-search.md) -- Utiliser le langage naturel pour trouver des groupes précis de personnes
- [Group Members](../groups/group-members.md) -- Gérer l'appartenance aux groupes
- [Exporting Data](./exporting-data.md) -- Exporter les données des personnes avant les modifications en masse
