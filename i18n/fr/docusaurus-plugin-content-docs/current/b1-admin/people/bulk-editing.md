---
title: "Modification en masse de personnes"
---

# Modification en masse de personnes

<div class="article-intro">
La modification en masse vous permet de mettre à jour plusieurs personnes à la fois, ce qui fait gagner du temps lorsque vous apportez la même modification à de nombreuses personnes. Vous pouvez mettre à jour le statut de membre, l'état civil, le sexe, les préférences de désinscription et les appartenances aux groupes en une seule opération.
</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission de gérer les données des personnes. Consultez [Rôles et permissions](./roles-permissions.md) pour plus de détails.
- Vous devriez déjà avoir ajouté ou importé les personnes que vous souhaitez modifier. Consultez [Ajouter des personnes](./adding-people.md) si nécessaire.
</div>

## Sélection de personnes pour la modification en masse

1. Accédez à **Personnes** dans B1 Admin
2. Utilisez les outils de recherche ou de filtrage pour trouver les personnes que vous souhaitez mettre à jour
3. Cochez les cases à côté du nom de chaque personne pour les sélectionner
   - Vous pouvez sélectionner des personnes individuellement
   - Ou utilisez la case à cocher de l'en-tête pour sélectionner toutes les personnes visibles sur la page actuelle
4. Une fois que vous avez sélectionné au moins une personne, le bouton **Actions en masse** apparaîtra

:::tip
Si vous devez mettre à jour un grand groupe de personnes en fonction de critères spécifiques, utilisez la fonctionnalité [Recherche IA](./ai-search.md) ou les filtres pour affiner d'abord votre liste, puis sélectionnez toutes les personnes correspondantes.
:::

## Actions en masse disponibles

Le menu **Actions en masse** propose plusieurs options :

### Mettre à jour le statut de membre

Mettez à jour le statut de membre pour toutes les personnes sélectionnées :

1. Cliquez sur **Actions en masse** → **Définir le statut de membre**
2. Choisissez le nouveau statut :
   - **Visiteur** -- Nouveaux participants ou participants occasionnels
   - **Participant régulier** -- Participants fréquents qui ne sont pas membres
   - **Membre** -- Membres officiels de l'église
   - **Personnel** -- Membres du personnel de l'église
   - **Inactif** -- Personnes qui ne participent plus
3. Choisissez le mode de mise à jour :
   - **Tout écraser** -- Remplacer le statut actuel pour toutes les personnes sélectionnées
   - **Mettre à jour uniquement les vides** -- Ne définir le statut que pour les personnes qui n'en ont pas
4. Cliquez sur **Mettre à jour**

### Mettre à jour l'état civil

Mettez à jour l'état civil en masse :

1. Cliquez sur **Actions en masse** → **Définir l'état civil**
2. Sélectionnez le nouveau statut :
   - **Inconnu**
   - **Célibataire**
   - **Marié**
   - **Divorcé**
   - **Veuf**
3. Choisissez si vous voulez écraser les valeurs existantes ou mettre à jour uniquement les champs vides
4. Cliquez sur **Mettre à jour**

### Mettre à jour le sexe

Mettez à jour les informations de sexe pour plusieurs personnes :

1. Cliquez sur **Actions en masse** → **Définir le sexe**
2. Sélectionnez la valeur :
   - **Non spécifié**
   - **Homme**
   - **Femme**
3. Choisissez le mode de mise à jour (écraser tout ou uniquement les vides)
4. Cliquez sur **Mettre à jour**

### Mettre à jour le statut de désinscription

Contrôlez si les personnes se sont désinscrites des communications :

1. Cliquez sur **Actions en masse** → **Définir désinscrits**
2. Choisissez :
   - **Non** -- Autoriser les communications (retirer la désinscription)
   - **Oui** -- Bloquer les communications (définir la désinscription)
3. Choisissez le mode de mise à jour
4. Cliquez sur **Mettre à jour**

:::warning
Soyez prudent lorsque vous modifiez le statut de désinscription. Les personnes qui se sont explicitement désinscrites ne devraient pas recevoir de communications à moins qu'elles n'aient donné un nouveau consentement.
:::

### Ajouter à un groupe

Ajoutez toutes les personnes sélectionnées à un ou plusieurs groupes :

1. Cliquez sur **Actions en masse** → **Ajouter à un groupe**
2. Recherchez et sélectionnez le(s) groupe(s) auxquels ajouter des personnes
3. Vous pouvez sélectionner plusieurs groupes pour ajouter des personnes à tous
4. Cliquez sur **Ajouter aux groupes**

Chaque personne sera ajoutée en tant que membre régulier du ou des groupes sélectionnés. Vous pouvez ensuite promouvoir des individus au rang de responsables de groupe si nécessaire depuis la page [Membres du groupe](../groups/group-members.md).

### Retirer d'un groupe

Retirez toutes les personnes sélectionnées d'un ou plusieurs groupes :

1. Cliquez sur **Actions en masse** → **Retirer d'un groupe**
2. Recherchez et sélectionnez le(s) groupe(s) desquels retirer des personnes
3. Vous pouvez sélectionner plusieurs groupes
4. Cliquez sur **Retirer des groupes**

:::info
Cette action retire uniquement les personnes des groupes spécifiés. Elle ne supprime pas leurs dossiers de personnes.
:::

### Supprimer des personnes

Supprimez définitivement les personnes sélectionnées de votre base de données d'église :

1. Cliquez sur **Actions en masse** → **Supprimer**
2. Passez en revue la liste des personnes qui seront supprimées
3. Tapez **DELETE** dans le champ de confirmation
4. Cliquez sur **Confirmer la suppression**

:::danger
La suppression de personnes est permanente et ne peut pas être annulée. Cela supprimera toutes leurs données, y compris :
- Informations personnelles
- Appartenances aux groupes
- Dossiers de présence
- Historique des dons
- Soumissions de formulaires

N'utilisez cette action que si vous êtes absolument certain de vouloir retirer ces personnes de votre système.
:::

## Résultats de la modification en masse

Après avoir terminé une action en masse, vous verrez un résumé indiquant :

- **Total sélectionné** -- Combien de personnes ont été incluses dans l'opération
- **Mise à jour réussie** -- Combien d'enregistrements ont été modifiés
- **Échec** -- Tous les enregistrements qui n'ont pas pu être mis à jour (le cas échéant)
- **Inchangé** -- Enregistrements qui n'avaient pas besoin de modifications (par exemple, lors de l'utilisation du mode "mettre à jour uniquement les vides")

Si des mises à jour ont échoué, vous verrez les détails de l'erreur expliquant pourquoi.

## Meilleures pratiques

- **Commencez petit** -- Testez les opérations en masse sur quelques enregistrements d'abord pour vous assurer que vous apportez les bonnes modifications
- **Utilisez les filtres** -- Affinez votre liste avec des filtres ou une recherche IA avant de sélectionner des personnes pour vous assurer que vous ne mettez à jour que les bonnes personnes
- **Vérifiez deux fois les sélections** -- Passez en revue les personnes sélectionnées avant d'appliquer des modifications en masse
- **Utilisez le mode "mettre à jour uniquement les vides"** -- Lorsque vous souhaitez remplir des données manquantes sans écraser les informations existantes
- **Documentez les changements majeurs** -- Gardez des notes sur les mises à jour en masse au cas où vous auriez besoin de vous y référer plus tard
- **Coordonnez-vous avec votre équipe** -- Informez les autres administrateurs lorsque vous effectuez de grandes modifications en masse

## Cas d'utilisation courants

### Mise à jour de nouveaux membres

Après une classe de membre, mettez à jour tous les participants au statut Membre :

1. Recherchez les personnes qui ont assisté à la classe
2. Sélectionnez-les toutes
3. Utilisez **Actions en masse** → **Définir le statut de membre** → **Membre**

### Organisation de petits groupes

Ajoutez plusieurs personnes à un nouveau petit groupe :

1. Recherchez les personnes que vous souhaitez dans le groupe
2. Sélectionnez-les
3. Utilisez **Actions en masse** → **Ajouter à un groupe** et sélectionnez le petit groupe

### Nettoyage des données

Remplissez l'état civil manquant pour les couples mariés :

1. Filtrez les personnes mariées (en utilisant les informations du foyer)
2. Sélectionnez celles ayant un état civil vide
3. Utilisez **Actions en masse** → **Définir l'état civil** → **Marié** → **Mettre à jour uniquement les vides**

## Articles connexes

- [Recherche de personnes](./searching-people.md) -- Trouvez des personnes à modifier
- [Recherche IA](./ai-search.md) -- Utilisez le langage naturel pour trouver des groupes spécifiques de personnes
- [Membres du groupe](../groups/group-members.md) -- Gérez l'appartenance aux groupes
- [Exportation de données](./exporting-data.md) -- Exportez les données des personnes avant d'effectuer des modifications en masse
