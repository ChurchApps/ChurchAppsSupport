---
title: "Concepteur d'étiquettes d'enregistrement"
---

# Concepteur d'étiquettes d'enregistrement

<div class="article-intro">

Le concepteur d'étiquettes vous permet de créer et de personnaliser les modèles de badge de nom et de bordereau de récupération qui s'impriment quand les familles enregistrent leurs enfants. Vous pouvez contrôler exactement quelles informations apparaissent sur chaque étiquette, où elle est positionnée et à quoi elle ressemble.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez l'[Enregistrement](setup) et configurez au moins une heure de service avec l'enregistrement activé
- Configurez l'[Enregistrement](check-in) pour que les étiquettes s'impriment
- Vous devez avoir un accès administratif à la section Enregistrement

</div>

## Ouverture du concepteur d'étiquettes

Dans B1 Admin, allez à **Enregistrement** dans la barre latérale gauche et sélectionnez **Étiquettes**. Vous verrez une liste de vos modèles d'étiquettes enregistrés, séparés par type : **Badge** et **Bordereau de récupération**.

## Types d'étiquettes

- **Badge** — imprimé et attaché à l'enfant. Inclut généralement le nom de l'enfant, sa classe/session et un code de sécurité.
- **Bordereau de récupération** — remis au parent ou au tuteur. Inclut généralement le code de sécurité et une liste des enfants qu'ils ont enregistrés.

B1 vous démarre avec un modèle de badge par défaut et un modèle de bordereau de récupération par défaut dimensionné pour les étiquettes thermiques standard de 3,5 × 1,1 pouces.

## Création d'un modèle d'étiquette

1. Cliquez sur **Ajouter un badge** ou **Ajouter un bordereau de récupération** (ou utilisez la liste déroulante pour choisir).
2. Un nouveau modèle s'ouvre dans l'éditeur d'étiquettes.

### Éditeur d'étiquettes

L'éditeur affiche un aperçu à l'échelle de l'étiquette à la taille configurée. Dans le panneau gauche, vous pouvez configurer :

- **Nom** — le nom du modèle (pour votre référence uniquement)
- **Type d'étiquette** — Badge ou Bordereau de récupération
- **Largeur / Hauteur** — taille de l'étiquette en pouces

### Ajouter des blocs

Une étiquette est construite à partir de blocs -- des pièces individuelles de contenu positionnées sur le canevas de l'étiquette. Cliquez sur **Ajouter un bloc** pour insérer un nouveau bloc et choisir son type :

- **Champ** — récupère une valeur de données au moment de l'impression :
  - `person.displayName` — le nom complet de la personne
  - `sessions` — le service/classe pour lequel ils se sont enregistrés
  - `securityCode` — le code de sécurité de récupération généré aléatoirement
  - `children` — liste des enfants (pour les bordeaux de récupération)
  - `person.nametagNotes` — toute note spéciale sur le dossier de la personne
  - `campus` — le nom du campus
- **Texte** — texte statique que vous tapez (pour les en-têtes, les étiquettes ou les instructions)
- **Code-barres** — un code-barres codant le code de sécurité

### Positionnement des blocs

Chaque bloc a des champs **X**, **Y**, **Largeur** et **Hauteur** exprimés en pourcentages du canevas de l'étiquette (0-100). Ajustez-les pour positionner le contenu avec précision. Vous pouvez également définir :

- **Taille de police** — taille du texte en points
- **Gras** -- basculer le texte en gras
- **Alignement** — alignement du texte à gauche, au centre ou à droite
- **Condition** -- masquer éventuellement le bloc si un champ est vide (par exemple, afficher uniquement nametagNotes s'il a une valeur)

### Enregistrement

Cliquez sur **Enregistrer** pour enregistrer le modèle. Le modèle mis à jour sera utilisé la prochaine fois que les étiquettes seront imprimées dans B1 Checkin.

## Réorganisation des modèles

Si vous avez plusieurs modèles de badge ou de bordereau de récupération, B1 Checkin utilisera par défaut le premier modèle de la liste. Faites glisser les modèles pour les réorganiser.

## Suppression d'un modèle

Cliquez sur l'icône de suppression sur n'importe quelle ligne de modèle et confirmez. La suppression du dernier modèle d'un type restaure le modèle intégré par défaut.

:::tip
Effectuez un essai d'impression après la modification d'un modèle pour confirmer que la mise en page a l'air correcte avant votre prochain service.
:::

## Articles connexes

- [Configuration de l'enregistrement](setup) — configurer les services et les groupes pour l'enregistrement
- [Effectuer l'enregistrement](check-in) — le flux d'enregistrement pour les familles
- [B1 Checkin Prise en main](../../b1-checkin/getting-started/index) — l'application kiosque Checkin
