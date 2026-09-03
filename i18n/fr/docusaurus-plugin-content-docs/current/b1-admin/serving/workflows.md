---
title: "Flux de Travail"
---

# Flux de Travail

<div class="article-intro">

Les Flux de Travail déplacent les personnes à travers une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui se déplace d'une étape à l'autre -- d'un suivi d'invité première fois, à un processus d'adhésion, à une présentation de première donation, et n'importe quoi d'autre où vous devez suivre de nombreuses personnes à travers le même ensemble d'étapes. Une étape peut demander à un bénévole de faire quelque chose (faire un appel, avoir une conversation) **et** exécuter des actions automatisées par elle-même -- envoyer un e-mail, attendre quelques jours, ajouter la personne à un groupe -- donc les Flux de Travail gèrent à la fois le suivi humain et le travail non créatif autour. Les Flux de Travail étendent [Tâches](./tasks.md) dans un tableau Kanban glisser-déposer pour que rien et personne ne tombe à travers les fentes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes que vous voulez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [Tâches](./tasks.md), car chaque carte sur un tableau est une tâche
- Pour utiliser l'action **Envoyer un e-mail**, créez d'abord les modèles d'e-mail que vous voulez envoyer (gérés sous **Messaging → Gérer les Modèles**)
- Vous aurez besoin de la permission Tâches appropriée. Voir, modifier des cartes et gérer les flux de travail sont des niveaux de permission séparés (voir [Rôles et Permissions](../settings/roles-permissions.md))

</div>

## Affichage des Flux de Travail

Naviguez vers **Serving**, ouvrez la zone **Tâches**, et sélectionnez **Flux de Travail** dans le menu. Vous verrez vos flux de travail listés et regroupés par catégorie, les flux de travail actifs mis en évidence. Cliquez sur n'importe quel flux de travail pour ouvrir son tableau.

## Création d'un Flux de Travail

1. Sur la page Flux de Travail, cliquez sur **Ajouter un Flux de Travail**.
2. Choisissez comment commencer :
   - **Flux de travail vierge** -- commencez à partir de zéro et construisez vos propres étapes.
   - **À partir d'un modèle** -- commencez avec un ensemble d'étapes prêt-à-l'emploi que vous pouvez modifier. Les modèles intégrés incluent :
     - **Suivi d'Invité Nouveau** -- Envoyer un e-mail de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Cours d'Adhésion** -- Exprimer l'intérêt → S'inscrire à la classe → Assister à la classe → Adhésion Complète
     - **Présentation de Première Donation** -- Envoyer une note de remerciement → Partager l'impact des dons → Géré
3. Donnez au flux de travail un **Nom**.
4. Assignez éventuellement une **Catégorie** pour regrouper les flux de travail connexes. Vous pouvez créer une nouvelle catégorie directement à partir de la liste déroulante.
5. Laissez le flux de travail **Actif** pour que les gens puissent y être ajoutés, ou réglez-le sur **Inactif** pour le masquer des listes d'ajout au flux de travail.
6. Cliquez sur **Enregistrer**.

:::tip
Utilisez le bouton **Dupliquer** sur la liste Flux de Travail pour copier un flux de travail existant -- incluant ses étapes, actions automatisées et routage -- comme point de départ pour en créer un nouveau.
:::

## Construction du Tableau avec des Étapes

Chaque tableau de flux de travail est composé d'**étapes**, affichées en colonnes de gauche à droite. Ouvrez un flux de travail et utilisez **Ajouter une Étape** pour créer chaque étape de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer :

- **Nom de l'Étape** -- l'en-tête de colonne (par exemple, "Appel de Bienvenue" ou "En Attente d'Inscription").
- **Dû dans (jours)** -- définit automatiquement une date d'échéance lorsqu'une carte entre dans cette étape. Les cartes dépassant leur date d'échéance sont signalées comme **En Retard**.
- **Assigné par défaut** -- la personne ou le groupe auquel les nouvelles cartes sur cette étape sont automatiquement assignées.
- **Actions automatisées** -- les choses que le système fait seul lorsqu'une carte arrive (voir ci-dessous).
- **Routage** -- où la carte va lorsqu'elle quitte l'étape (voir [Routage](#routage-des-cartes-avec-résultats-et-conditions)).

Faites glisser les colonnes d'étape dans l'ordre qui correspond à votre processus. L'ordre définit aussi le chemin par défaut qu'une carte prend lorsqu'aucun autre routage ne s'applique.

:::info
Enregistrez d'abord une nouvelle étape. Les actions automatisées et le routage s'attachent à l'étape, donc l'éditeur déverrouille ces sections une fois que l'étape existe.
:::
