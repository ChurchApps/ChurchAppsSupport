---
title: "Modifier des personnes en masse"
description: "Mettez à jour en une seule fois le statut d'appartenance, la situation matrimoniale, le genre, le retrait de l'annuaire, le campus, les champs personnalisés Oui/Non ou les groupes de nombreuses personnes dans B1 Admin."
---

# Modifier des personnes en masse

<div class="article-intro">
La modification en masse vous permet de mettre à jour plusieurs personnes à la fois, ce qui vous fait gagner du temps lorsque vous appliquez la même modification à de nombreuses personnes. Vous pouvez modifier en une seule opération le statut d'appartenance, la situation matrimoniale, le genre, le retrait de l'annuaire, le campus, les champs personnalisés Oui/Non, les appartenances aux groupes et les flux de travail, ou supprimer des personnes.
</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation de gérer les données des personnes. Consultez [Rôles et autorisations](./roles-permissions.md) pour plus de détails.
- Vous devez avoir déjà ajouté ou importé les personnes que vous souhaitez modifier. Consultez [Ajouter des personnes](./adding-people.md) si nécessaire.
</div>

## Sélectionner les personnes à modifier en masse {#selecting-people-for-bulk-editing}

1. Accédez à **Personnes** dans B1 Admin
2. Utilisez la recherche ou les outils de filtrage pour trouver les personnes à mettre à jour
3. Cochez les cases pour sélectionner des personnes
   - Dans la vue **Foyers**, cocher un foyer sélectionne toutes les personnes qui le composent
   - Dans la vue **Tableau** (à changer avec le bouton **Afficher sous forme**), vous pouvez sélectionner les personnes une à une
   - Ou utilisez la case au-dessus de la liste pour sélectionner toutes les personnes visibles
4. Dès que vous avez sélectionné au moins une personne, la barre au-dessus de la liste indique le nombre de personnes sélectionnées, avec **Effacer la sélection** et un bouton **Actions**

:::tip
Si vous devez mettre à jour un grand groupe de personnes selon des critères précis, utilisez la fonctionnalité [Recherche IA](./ai-search.md) ou des filtres pour réduire d'abord votre liste, puis sélectionnez toutes les personnes correspondantes.
:::

## Actions de masse disponibles {#available-bulk-actions}

Le menu **Actions** propose les options ci-dessous. Chacune ouvre une petite boîte de dialogue qui indique combien de personnes seront modifiées ; choisissez une valeur et cliquez sur **Appliquer**. La nouvelle valeur remplace celle que chaque personne sélectionnée avait auparavant. Une fois l'opération terminée, un message en bas de page confirme le nombre de personnes mises à jour.

### Définir le statut d'appartenance {#set-membership-status}

1. Cliquez sur **Actions** → **Définir le statut d'appartenance**
2. Choisissez le nouveau **Statut d'appartenance** :
   - **Visiteur** -- Personnes venues pour la première fois ou occasionnellement
   - **Invité** -- Invités, comme les familles inscrites sur une borne de pointage
   - **Participant régulier** -- Participants assidus qui ne sont pas membres
   - **Membre** -- Membres officiels de l'église
   - **Personnel** -- Membres du personnel de l'église
   - **Inactif** -- Personnes qui ne fréquentent plus l'église
   - **Décédé** -- Personnes décédées
3. Cliquez sur **Appliquer**

### Définir la situation matrimoniale {#set-marital-status}

1. Cliquez sur **Actions** → **Définir la situation matrimoniale**
2. Choisissez **Inconnue**, **Célibataire**, **Marié(e)**, **Divorcé(e)** ou **Veuf/Veuve**
3. Cliquez sur **Appliquer**

### Définir le genre {#set-gender}

1. Cliquez sur **Actions** → **Définir le genre**
2. Choisissez **Non précisé**, **Homme** ou **Femme**
3. Cliquez sur **Appliquer**

### Définir le retrait de l'annuaire {#set-directory-opt-out}

Le retrait de l'annuaire détermine si les personnes apparaissent dans l'annuaire des membres -- l'[annuaire imprimé](./print-directory.md) et l'annuaire des membres de l'application B1. Il s'agit du même paramètre que **Me masquer de l'annuaire des membres** sur la fiche d'une personne.

1. Cliquez sur **Actions** → **Définir le retrait de l'annuaire**
2. Choisissez **Retiré Oui** pour masquer les personnes sélectionnées de l'annuaire, ou **Retiré Non** pour les afficher à nouveau
3. Cliquez sur **Appliquer**

:::warning
Les personnes qui ont choisi de se masquer de l'annuaire doivent rester masquées, sauf si elles demandent à y figurer à nouveau.
:::

### Définir le campus {#set-campus}

Cette option n'apparaît que si votre église a configuré des [campus](../settings/campuses.md).

1. Cliquez sur **Actions** → **Définir le campus**
2. Choisissez le campus
3. Cliquez sur **Appliquer**

### Définir un champ personnalisé {#set-custom-field}

Définissez en une fois la valeur Oui/Non d'un [champ personnalisé](../settings/custom-fields.md) pour toutes les personnes sélectionnées :

1. Cliquez sur **Actions** → **Définir un champ personnalisé**.
2. Choisissez le **Champ personnalisé** Oui/Non que vous souhaitez définir.
3. Choisissez la **Valeur** (**Oui** ou **Non**) à appliquer.
4. Cliquez sur **Appliquer**.

:::info
Seuls les champs personnalisés Oui/Non sont disponibles pour cette action de masse. Pour définir d'autres types de champs, modifiez chaque personne individuellement. Si votre église ne dispose d'aucun champ personnalisé Oui/Non, la boîte de dialogue l'indique.
:::

### Ajouter à un groupe {#add-to-group}

1. Cliquez sur **Actions** → **Ajouter à un groupe**
2. Choisissez le **Groupe** auquel ajouter les personnes. Pour les placer plutôt dans un tout nouveau groupe, cochez **Créer un nouveau groupe** et saisissez un **Nom du nouveau groupe**.
3. Cliquez sur **Appliquer**

Chaque personne est ajoutée comme membre ordinaire du groupe. Vous pourrez ensuite promouvoir certaines personnes au rang de responsable de groupe depuis la page [Membres du groupe](../groups/group-members.md). Pour ajouter des personnes à plusieurs groupes, répétez l'opération pour chaque groupe.

### Retirer d'un groupe {#remove-from-group}

1. Cliquez sur **Actions** → **Retirer d'un groupe**
2. Choisissez le **Groupe** duquel retirer les personnes
3. Cliquez sur **Appliquer**

:::info
Cette action se limite à retirer les personnes du groupe. Elle ne supprime pas leurs fiches de personnes.
:::

### Ajouter à un flux de travail {#add-to-workflow}

Ajoutez les personnes sélectionnées à un [flux de travail](../serving/workflows.md) sous forme de fiches :

1. Cliquez sur **Actions** → **Ajouter à un flux de travail**
2. Choisissez le flux de travail
3. Cliquez sur **Appliquer**

### Supprimer des personnes {#delete-people}

Supprimez les personnes sélectionnées de la base de données de votre église :

1. Cliquez sur **Actions** → **Supprimer**
2. La boîte de dialogue **Supprimer les personnes sélectionnées** vous demande de confirmer le nombre de personnes qui seront supprimées
3. Cliquez sur **Supprimer**

:::danger
Les personnes supprimées disparaissent de votre annuaire, de vos groupes et de vos recherches. N'utilisez cette action que si vous êtes certain de vouloir retirer ces personnes de votre système.
:::

Vous ne pouvez pas vous sélectionner vous-même : vous ne pouvez donc pas supprimer ou modifier en masse votre propre fiche.


## Bonnes pratiques {#best-practices}

- **Commencez petit** -- Testez les opérations de masse sur quelques fiches d'abord pour vous assurer que vous faites les bonnes modifications
- **Utilisez les filtres** -- Réduisez votre liste avec des filtres ou la recherche IA avant de sélectionner les personnes, pour ne mettre à jour que les bonnes personnes
- **Vérifiez vos sélections** -- Relisez les personnes sélectionnées avant d'appliquer des modifications de masse
- **Documentez les changements importants** -- Conservez des notes sur les mises à jour de masse au cas où vous devriez vous y reporter plus tard
- **Coordonnez-vous avec votre équipe** -- Prévenez les autres administrateurs lorsque vous effectuez de grandes modifications de masse

## Cas d'utilisation courants {#common-use-cases}

### Mettre à jour les nouveaux membres {#updating-new-members}

Après un cours d'intégration des membres, passez tous les participants au statut Membre :

1. Recherchez les personnes qui ont suivi le cours
2. Sélectionnez-les toutes
3. Utilisez **Actions** → **Définir le statut d'appartenance** → **Membre**

### Organiser les petits groupes {#organizing-small-groups}

Ajoutez plusieurs personnes à un nouveau petit groupe :

1. Recherchez les personnes que vous souhaitez dans le groupe
2. Sélectionnez-les
3. Utilisez **Actions** → **Ajouter à un groupe** et sélectionnez le petit groupe

### Nettoyer les données {#cleaning-up-data}

Marquez comme inactif un groupe d'anciens participants :

1. Ouvrez la recherche **Avancée** et filtrez les personnes à mettre à jour (par exemple, toutes celles qui n'ont pas fréquenté l'église récemment)
2. Sélectionnez-les
3. Utilisez **Actions** → **Définir le statut d'appartenance** → **Inactif**

## Articles connexes {#related-articles}

- [Rechercher des personnes](./searching-people.md) -- Trouver les personnes à modifier
- [Recherche IA](./ai-search.md) -- Utiliser le langage naturel pour trouver des groupes de personnes précis
- [Membres du groupe](../groups/group-members.md) -- Gérer l'appartenance aux groupes
- [Exporter des données](./exporting-data.md) -- Exporter les données des personnes avant de procéder à des modifications de masse
