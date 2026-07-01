---
title: "Concepteur d'étiquettes d'accueil"
---

# Concepteur d'étiquettes d'accueil

<div class="article-intro">

Le concepteur d'étiquettes vous permet de créer et de personnaliser les modèles de badges nominatifs et de bordereaux de récupération qui s'impriment lors de l'accueil des enfants par les familles. Vous pouvez contrôler exactement quelles informations apparaissent sur chaque étiquette, leur position et leur apparence.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez la [Présence](setup) et configurez au moins un créneau horaire avec l'accueil activé
- Configurez l'[Accueil](check-in) pour que les étiquettes s'impriment
- Vous devez avoir un accès administrateur à la section Présence

</div>

## Ouverture du concepteur d'étiquettes

Dans B1 Admin, allez à **Présence** dans la barre latérale gauche et sélectionnez **Étiquettes**. Vous verrez une liste de vos modèles d'étiquettes enregistrés, séparés par type : **Badge nominatif** et **Bordereau de récupération**.

## Types d'étiquettes

- **Badge nominatif** — imprimé et attaché à l'enfant. Inclut généralement le nom de l'enfant, sa classe/session et un code de sécurité.
- **Bordereau de récupération** — remis au parent ou au tuteur. Inclut généralement le code de sécurité et une liste des enfants qu'ils ont accueillis.

B1 vous propose par défaut un badge nominatif et un modèle de bordereau de récupération dimensionnés pour des étiquettes thermiques standard de 3,5 × 1,1 pouces.

## Création d'un modèle d'étiquette

1. Cliquez sur **Ajouter un badge nominatif** ou **Ajouter un bordereau de récupération** (ou utilisez la liste déroulante pour choisir).
2. Un nouveau modèle s'ouvre dans l'éditeur d'étiquettes.

### Éditeur d'étiquettes

L'éditeur affiche un aperçu à l'échelle de l'étiquette à la taille configurée. Sur le panneau gauche, vous pouvez configurer :

- **Nom** — le nom du modèle (pour votre référence uniquement)
- **Type d'étiquette** — Badge nominatif ou Bordereau de récupération
- **Largeur / Hauteur** — taille de l'étiquette en pouces

### Ajout de blocs

Une étiquette est construite à partir de blocs — des éléments individuels de contenu positionnés sur le canevas de l'étiquette. Cliquez sur **Ajouter un bloc** pour insérer un nouveau bloc et choisir son type :

- **Champ** — extrait une valeur de données au moment de l'impression :
  - `person.displayName` — le nom complet de la personne
  - `sessions` — le service/classe pour lequel elle s'est enregistrée
  - `securityCode` — le code de sécurité généré aléatoirement
  - `children` — liste des enfants (pour les bordereaux de récupération)
  - `person.nametagNotes` — toutes les notes spéciales sur le dossier de la personne
  - `campus` — le nom du campus
- **Texte** — texte statique que vous tapez (pour les titres, les étiquettes ou les instructions)
- **Code-barres** — un code-barres codant le code de sécurité

### Positionnement des blocs

Chaque bloc a des champs **X**, **Y**, **Largeur** et **Hauteur** exprimés en pourcentages du canevas de l'étiquette (0–100). Ajustez-les pour positionner le contenu précisément. Vous pouvez aussi configurer :

- **Taille de police** — taille du texte en points
- **Gras** — activer le texte gras
- **Alignement** — alignement du texte à gauche, au centre ou à droite
- **Condition** — masquer optionnellement le bloc si un champ est vide (par exemple, afficher nametagNotes uniquement s'il a une valeur)

### Enregistrement

Cliquez sur **Enregistrer** pour enregistrer le modèle. Le modèle mis à jour sera utilisé la prochaine fois que les étiquettes seront imprimées dans B1 Checkin.

## Réorganisation des modèles

Si vous avez plusieurs modèles de badges nominatifs ou de bordereaux de récupération, B1 Checkin utilisera le premier modèle de la liste par défaut. Faites glisser les modèles pour les réorganiser.

## Suppression d'un modèle

Cliquez sur l'icône de suppression sur n'importe quelle ligne de modèle et confirmez. La suppression du dernier modèle d'un type restaure le modèle par défaut intégré.

:::tip
Faites un test d'impression après avoir modifié un modèle pour confirmer que la mise en page semble correcte avant votre prochain service.
:::

## Articles connexes

- [Configuration de l'accueil](setup) — configurer les services et les groupes pour l'accueil
- [Terminer l'accueil](check-in) — le flux d'accueil pour les familles
- [B1 Checkin Premiers pas](../../b1-checkin/getting-started/) — l'application Checkin kiosk
