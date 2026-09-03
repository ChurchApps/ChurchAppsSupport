---
title: "Concepteur d'Étiquettes de Pointage"
---

# Concepteur d'Étiquettes de Pointage

<div class="article-intro">

Le Concepteur d'Étiquettes vous permet de créer et de personnaliser les modèles de badges de nom et de bordereaux de récupération qui s'impriment lorsque les familles pointent leurs enfants. Vous pouvez contrôler exactement quelles informations apparaissent sur chaque étiquette, où elle est positionnée et comment elle se présente.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez la [Participation](setup) et configurez au moins un créneau horaire de service avec le pointage activé
- Configurez le [Pointage](check-in) pour que les étiquettes s'impriment
- Vous avez besoin d'un accès administratif à la section Participation

</div>

## Ouverture du Concepteur d'Étiquettes

Dans B1 Admin, cliquez sur le **menu de section** dans le coin supérieur gauche (le nom de la section actuelle avec la petite flèche à côté) et choisissez **Mobile**. Dans la barre de navigation, sélectionnez **B1 CheckIn**, puis cliquez sur le bouton **Concevoir les Étiquettes** sur la carte Étiquettes de Pointage. Vous verrez une liste de vos modèles d'étiquettes enregistrés, séparés par type : **Badge** et **Bordereau de Récupération**.

## Types d'Étiquettes

- **Badge** — imprimé et attaché à l'enfant. Comprend généralement le nom de l'enfant, sa classe/séance et un code de sécurité.
- **Bordereau de Récupération** — donné au parent ou au tuteur. Comprend généralement le code de sécurité et une liste des enfants qu'il a pointés.

B1 vous commence avec un modèle de badge par défaut et un modèle de bordereau de récupération par défaut dimensionné pour des étiquettes thermiques standard de 3,5 × 1,1 pouces.

## Création d'un Modèle d'Étiquette

1. Cliquez sur **Ajouter Badge** ou **Ajouter Bordereau de Récupération** (ou utilisez la liste déroulante pour choisir).
2. Un nouveau modèle s'ouvre dans l'éditeur d'étiquettes.

### Éditeur d'Étiquettes

L'éditeur affiche un aperçu mis à l'échelle de l'étiquette à la taille configurée. Le long du panneau de gauche, vous pouvez configurer :

- **Nom** — le nom du modèle (pour votre référence uniquement)
- **Type d'Étiquette** — Badge ou Bordereau de Récupération
- **Largeur / Hauteur** — taille d'étiquette en pouces

### Ajout de Blocs

Une étiquette est construite à partir de blocs — des éléments de contenu individuels positionnés sur la toile d'étiquette. Cliquez sur **Ajouter un Bloc** pour insérer un nouveau bloc et choisissez son type :

- **Champ** — récupère une valeur de données au moment de l'impression :
  - `person.displayName` — le nom complet de la personne
  - `sessions` — le service/classe dans lequel il s'est pointé
  - `securityCode` — le code de sécurité de récupération généré aléatoirement
  - `children` — liste des enfants (pour les bordereaux de récupération)
  - `person.nametagNotes` — toutes les notes spéciales sur le dossier de la personne
  - `campus` — le nom du campus
- **Texte** — du texte statique que vous tapez (pour les titres, les étiquettes ou les instructions)
- **Code-barres** — un code-barres encodant le code de sécurité

### Positionnement des Blocs

Chaque bloc a des champs **X**, **Y**, **Largeur** et **Hauteur** exprimés en pourcentages de la toile d'étiquette (0–100). Ajustez-les pour positionner le contenu avec précision. Vous pouvez également définir :

- **Taille de Police** — taille du texte en points
- **Gras** — basculer le texte en gras
- **Aligner** — alignement du texte à gauche, au centre ou à droite
- **Condition** — masquer éventuellement le bloc si un champ est vide (par exemple, afficher uniquement nametagNotes s'il a une valeur)

### Sauvegarde

Cliquez sur **Enregistrer** pour enregistrer le modèle. Le modèle mis à jour sera utilisé la prochaine fois que des étiquettes seront imprimées dans B1 Checkin.

## Réorganisation des Modèles

Si vous avez plusieurs modèles de badge ou de bordereau de récupération, B1 Checkin utilisera le premier modèle de la liste par défaut. Faites glisser les modèles pour les réorganiser.

## Suppression d'un Modèle

Cliquez sur l'icône de suppression sur n'importe quelle ligne de modèle et confirmez. La suppression du dernier modèle d'un type restaure le modèle par défaut intégré.

:::tip
Faites un test d'impression après avoir modifié un modèle pour confirmer que la mise en page semble correcte avant votre prochain service.
:::

## Articles Connexes

- [Configuration du Pointage](setup) — configurer les services et les groupes pour le pointage
- [Effectuer le Pointage](check-in) — le flux de pointage pour les familles
- [Bien Démarrer avec B1 Checkin](../../b1-checkin/getting-started/) — l'application borne Checkin
