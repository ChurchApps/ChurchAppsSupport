---
title: "Concepteur d'étiquettes d'enregistrement"
---

# Concepteur d'étiquettes d'enregistrement

<div class="article-intro">

Le Concepteur d'étiquettes vous permet de créer et de personnaliser les modèles de badges et de reçus de retrait qui s'impriment quand les familles enregistrent leurs enfants. Vous pouvez contrôler exactement les informations qui apparaissent sur chaque étiquette, où elle est positionnée et son apparence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez la [Présence](setup) et configurez au moins une heure de service avec l'enregistrement activé
- Configurez l'[Enregistrement](check-in) pour que les étiquettes s'impriment
- Vous avez besoin d'un accès administrateur à la section Présence

</div>

## Ouverture du Concepteur d'étiquettes

Dans B1 Admin, cliquez sur le **menu de section** dans le coin supérieur gauche (le nom de la section actuelle avec la petite flèche à côté) et choisissez **Mobile**. Dans la barre de navigation, sélectionnez **B1 CheckIn**, puis cliquez sur le bouton **Concevoir les étiquettes** sur la carte Étiquettes d'enregistrement. Vous verrez une liste de vos modèles d'étiquettes enregistrés, séparés par type : **Badge** et **Reçu de retrait**.

## Types d'étiquettes

- **Badge** — imprimé et attaché à l'enfant. Comprend généralement le nom de l'enfant, sa classe/session et un code de sécurité.
- **Reçu de retrait** — remis au parent ou tuteur. Comprend généralement le code de sécurité et une liste des enfants qu'il a enregistrés.

B1 vous démarre avec un modèle de badge par défaut et un modèle de reçu de retrait par défaut dimensionné pour les étiquettes thermiques standard 3,5 × 1,1 pouces.

## Création d'un modèle d'étiquette

1. Cliquez sur **Ajouter un badge** ou **Ajouter un reçu de retrait** (ou utilisez la liste déroulante pour choisir).
2. Un nouveau modèle s'ouvre dans l'éditeur d'étiquettes.

### Éditeur d'étiquettes

L'éditeur affiche un aperçu à l'échelle de l'étiquette à la taille configurée. Dans le panneau gauche, vous pouvez configurer :

- **Nom** — le nom du modèle (pour votre référence uniquement)
- **Type d'étiquette** — Badge ou Reçu de retrait
- **Largeur / Hauteur** — taille de l'étiquette en pouces

### Ajout de blocs

Une étiquette est construite à partir de blocs — des éléments individuels de contenu positionnés sur le canevas d'étiquette. Cliquez sur **Ajouter un bloc** pour insérer un nouveau bloc et choisir son type :

- **Champ** — tire une valeur de données au moment de l'impression :
  - `person.displayName` — le nom complet de la personne
  - `sessions` — le service/classe dans lequel elle s'est enregistrée
  - `securityCode` — le code de sécurité de retrait généré aléatoirement
  - `children` — liste des enfants (pour les reçus de retrait)
  - `person.nametagNotes` — toute note spéciale sur le dossier de la personne
  - `campus` — le nom du campus
- **Texte** — texte statique que vous tapez (pour les en-têtes, les étiquettes ou les instructions)
- **Code-barres** — un code-barres codant le code de sécurité

### Positionnement des blocs

Chaque bloc a des champs **X**, **Y**, **Largeur** et **Hauteur** exprimés en pourcentages du canevas d'étiquette (0–100). Ajustez-les pour positionner le contenu avec précision. Vous pouvez aussi définir :

- **Taille de police** — taille du texte en points
- **Gras** — activer le texte gras
- **Alignement** — alignement du texte à gauche, au centre ou à droite
- **Condition** — masquer éventuellement le bloc si un champ est vide (par exemple, afficher uniquement nametagNotes s'il a une valeur)

### Enregistrement

Cliquez sur **Enregistrer** pour enregistrer le modèle. Le modèle mis à jour sera utilisé la prochaine fois que les étiquettes seront imprimées dans B1 Checkin.

## Réorganisation des modèles

Si vous avez plusieurs modèles de badge ou de reçu de retrait, B1 Checkin utilisera par défaut le premier modèle de la liste. Faites glisser les modèles pour les réorganiser.

## Suppression d'un modèle

Cliquez sur l'icône de suppression sur toute ligne de modèle et confirmez. La suppression du dernier modèle d'un type restaure le modèle intégré par défaut.

:::tip
Faites un test d'impression après avoir modifié un modèle pour confirmer que la mise en page a l'air correcte avant votre prochain service.
:::

## Articles connexes

- [Configuration de l'enregistrement](setup) — configurez les services et les groupes pour l'enregistrement
- [Réalisation de l'enregistrement](check-in) — le flux d'enregistrement pour les familles
- [Prise en main de B1 Checkin](../../b1-checkin/getting-started/) — l'application de kiosque Checkin
