---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Les Workflows font avancer les personnes à travers une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui se déplace d'une étape à la suivante -- du suivi des premiers visiteurs à un processus d'adhésion, à un remerciement des premiers donateurs, et tout ce où vous avez besoin de suivre de nombreuses personnes à travers le même ensemble d'étapes. Une étape peut demander à un bénévole de faire quelque chose (faire un appel, avoir une conversation) **et** exécuter des actions automatisées seule -- envoyer un email, attendre quelques jours, ajouter la personne à un groupe -- ainsi les Workflows gèrent à la fois le suivi humain et le travail fastidieux autour. Les Workflows étendent les [Tâches](./tasks.md) dans un tableau Kanban drag-and-drop pour que personne ne tombe entre les mailles du filet.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes que vous souhaitez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [Tâches](./tasks.md), puisque chaque carte sur un tableau est une tâche
- Pour utiliser l'action **Envoyer un email**, créez d'abord les modèles d'email que vous souhaitez envoyer (gérés sous **Messagerie → Gérer les modèles**)
- Vous aurez besoin de la permission Tâches appropriée. Visualiser, modifier les cartes et gérer les workflows sont des niveaux de permission séparés (voir [Rôles & Autorisations](../settings/roles-permissions.md))

</div>

## Affichage des Workflows

Accédez à **Service**, ouvrez la zone **Tâches** et sélectionnez **Workflows** dans le menu. Vous verrez vos workflows listés et regroupés par catégorie, avec les workflows actifs surlignés. Cliquez sur n'importe quel workflow pour ouvrir son tableau.

## Créer un Workflow

1. Sur la page Workflows, cliquez sur **Ajouter un Workflow**.
2. Choisissez comment commencer :
   - **Workflow vierge** -- commencez à partir de zéro et construisez vos propres étapes.
   - **À partir d'un modèle** -- commencez avec un ensemble prêt d'étapes que vous pouvez modifier. Les modèles intégrés incluent :
     - **Suivi des nouveaux visiteurs** -- Envoyer un email de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Classe d'adhésion** -- Exprimer l'intérêt → S'inscrire à la classe → Assister à la classe → Adhésion complète
     - **Remerciement du premier donateur** -- Envoyer un remerciement → Partager l'impact de la donation → Géré
3. Donnez un **Nom** au workflow.
4. Vous pouvez optionnellement assigner une **Catégorie** pour regrouper les workflows connexes. Vous pouvez créer une nouvelle catégorie directement à partir de la liste déroulante.
5. Laissez le workflow **Actif** pour que les personnes puissent y être ajoutées, ou réglez-le sur **Inactif** pour le masquer des listes d'ajout au workflow.
6. Cliquez sur **Enregistrer**.

:::tip
Utilisez le bouton **Dupliquer** sur la liste Workflows pour copier un workflow existant -- y compris ses étapes, ses actions automatisées et son routage -- comme point de départ pour un nouveau.
:::

## Construire le tableau avec des étapes

Chaque tableau de workflow est composé d'**étapes**, affichées en colonnes de gauche à droite. Ouvrez un workflow et utilisez **Ajouter une étape** pour créer chaque étape de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer :

- **Nom de l'étape** -- l'en-tête de la colonne (par exemple, "Appel de bienvenue" ou "En attente d'inscription").
- **Dû en (jours)** -- définit automatiquement une date d'échéance lorsqu'une carte entre dans cette étape. Les cartes passées leur date d'échéance sont marquées comme **En retard**.
- **Assigné par défaut** -- la personne ou le groupe auquel les nouvelles cartes sur cette étape sont automatiquement assignées.
- **Actions automatisées** -- les choses que le système fait seul lorsqu'une carte arrive (voir ci-dessous).
- **Routage** -- où la carte va quand elle quitte l'étape (voir [Routage](#routing-cards-with-outcomes-and-conditions)).

Glissez les colonnes d'étape dans l'ordre qui correspond à votre processus. L'ordre définit également le chemin par défaut qu'une carte prend quand aucun autre routage ne s'applique.

:::info
Enregistrez d'abord une nouvelle étape. Les actions automatisées et le routage s'attachent à l'étape, donc l'éditeur déverrouille ces sections une fois que l'étape existe.
:::

## Actions automatisées

Chaque étape peut avoir une liste d'**actions automatisées** qui s'exécutent seules au moment où une carte **entre** dans l'étape -- avant que n'importe qui la touche. C'est comment une étape à la fois incite un bénévole *et* s'occupe du travail routinier autour du suivi.

Dans l'éditeur d'étape, ouvrez **Actions automatisées**, cliquez sur **Ajouter une action**, choisissez un type, remplissez ses paramètres et cliquez sur l'icône d'enregistrement sur cette action. Ajoutez autant que vous en avez besoin ; elles s'exécutent **de haut en bas dans l'ordre**.

| Action | Ce qu'elle fait |
|---|---|
| **Envoyer un email** | Envoie à la personne un modèle d'email que vous choisissez. Vous pouvez remplacer la ligne d'objet. |
| **Attendre** | Met en pause la carte pendant un nombre de jours avant de continuer (voir ci-dessous). |
| **Ajouter à un groupe** | Ajoute la personne à un [groupe](../groups/index.md) que vous choisissez. |
| **Ajouter à un workflow** | Démarre la personne sur un autre workflow -- utile pour se transmettre entre les processus. |
| **Ajouter une note** | Enregistre une note dans l'historique de la carte. |
| **Définir un champ** | Met à jour un champ sur le registre de la personne : Statut d'adhésion, État matrimonial, Sexe, Ville, État ou Code postal. |
| **Webhook** | Envoie les détails de la carte à une adresse Web externe (URL) que vous fournissez, pour la connexion à d'autres systèmes. |

Après que toutes les actions d'une étape se terminent, la carte **repose sur cette étape** pour qu'une personne la travaille -- à moins que l'étape ait un itinéraire automatique qui la déplace (voir [Étapes entièrement automatisées](#fully-automated-steps)).

:::info
Les actions automatisées s'exécutent uniquement quand une carte arrive par le flux normal -- quand elle est ajoutée en premier, quand un résultat ou itinéraire automatique l'apporte, ou après qu'une attente se termine. Elles ne **se réexécutent pas** quand un membre du personnel déplace manuellement une carte sur l'étape ou la renvoie, donc une personne ne recevra pas le même email deux fois.
:::

### Envoyer un email

Choisissez **Envoyer un email**, choisissez l'un de vos modèles d'email, et optionnellement tapez un sujet personnalisé. Quand une carte entre dans l'étape, la personne reçoit cet email automatiquement. (Si la personne n'a pas d'adresse email enregistrée, l'étape ignore simplement cette action.)

### Attendre quelques jours (séquences goutte à goutte)

L'action **Attendre** maintient une carte pendant le nombre de jours que vous définissez. Pendant qu'elle attend, la carte s'affiche comme **En attente**. Quand l'attente est terminée :

1. Tout **actions restantes sur la même étape** s'exécute -- vous pouvez donc construire une goutte comme **Envoyer un email → Attendre 3 jours → Envoyer un email de rappel**.
2. Ensuite, si l'étape a un itinéraire automatique, la carte avance ; sinon elle repose sur l'étape pour qu'une personne la récupère.

:::tip
Une **Attente** au tout début d'une étape est un moyen simple de "maintenir" une carte avant qu'elle ne remonte à un bénévole -- par exemple, *Attendre 7 jours, puis un entraîneur la contacte*.
:::

## Ajouter des personnes comme cartes

Il y a plusieurs façons de mettre les personnes sur un tableau :

- **À partir du tableau** -- Cliquez sur **Ajouter une carte** en bas d'une colonne d'étape et choisissez une personne. Vous pouvez aussi choisir un groupe, et chaque membre du groupe est ajouté comme une carte.
- **À partir du registre d'une personne** -- Utilisez **Ajouter au Workflow** sur la page d'une personne pour la déposer sur un workflow.
- **À partir de la recherche Personnes** -- Sélectionnez plusieurs personnes et utilisez l'action en masse **Ajouter au Workflow** pour les ajouter toutes à la fois.
- **Automatiquement avec un déclencheur** -- Ajoutez des personnes quand quelque chose se passe, comme une soumission de formulaire ou un premier don (voir [Déclencheurs](#triggers) ci-dessous).

## Travailler le tableau

Ouvrez un workflow pour voir son tableau. Chaque carte affiche le nom de la personne, à qui elle est assignée, et une puce de date d'échéance ou de statut (**En retard** ou **En attente**). Une colonne d'étape affiche également de petits badges pour toutes les actions automatisées qu'elle exécute et les annotations pour son routage, vous donnant une carte à la première vue de comment les cartes circulent.

- **Déplacer une carte** -- Glissez une carte d'une colonne à la suivante au fur et à mesure que la personne progresse.
- **Ouvrir une carte** -- Double-cliquez sur une carte (ou cliquez dessus) pour ouvrir son tiroir de détails, où vous pouvez changer l'étape, la réassigner, ajouter des notes et examiner ce qui s'est déjà passé.

À partir du tiroir de carte, vous pouvez :

- **Assigner** la carte à une autre personne ou groupe.
- **Mettre en attente** la carte pendant 1 jour, 3 jours ou 1 semaine pour masquer temporairement sa date d'échéance.
- **Renvoyer** à l'étape précédente ou **Ignorer** à l'étape suivante.
- **Épingler l'assignation** -- gardez le même propriétaire sur la carte même quand elle se déplace entre les étapes. Par défaut, déplacer une carte vers une nouvelle étape la réassigne à l'assigné par défaut de cette étape ; épingler garde la personne actuelle responsable tout au long.
- **Compléter** la carte pour la terminer, ou choisir un bouton **Résultat** si l'étape a des résultats configurés (voir [Routage](#routing-cards-with-outcomes-and-conditions)).
- **Ajouter des notes** et examiner l'**historique** de la carte -- y compris un journal des actions automatisées qui se sont exécutées (emails envoyés, attentes, etc.).

### Actions en masse

Sélectionnez les cases à cocher sur plusieurs cartes pour agir sur elles ensemble. Une barre d'outils apparaît vous permettant de **Compléter**, **Mettre en attente**, **Réassigner** ou **Déplacer** toutes les cartes sélectionnées vers une autre étape à la fois.

## Routage des cartes avec résultats et conditions

Le routage contrôle où une carte va quand elle quitte une étape. Ouvrez un éditeur d'étape pour configurer deux types de routage.

### Boutons de résultat

Les résultats sont des boutons affichés sur le tiroir de carte quand vous terminez une carte sur cette étape. Au lieu d'un seul bouton **Compléter**, vous pouvez offrir des choix comme "Rejoindre un groupe" ou "Pas intéressé." Chaque résultat peut :

- Envoyer la carte vers **une autre étape** dans ce workflow,
- **Se transmettre** la carte vers un workflow différent dans son intégrité, ou
- **Fermer** la carte.

Cela permet à une décision de brancher la personne vers différents chemins.

### Routage automatique (conditionnel)

Les itinéraires automatiques déplacent une carte à **l'instant où elle entre dans une étape** (et après que ses actions automatisées se terminent), sans que personne clique, si la personne correspond à un ensemble de conditions. Ajoutez un itinéraire, choisissez l'étape cible et définissez une ou plusieurs **conditions** (par exemple, le campus, l'âge ou le statut d'adhésion d'une personne). Un itinéraire sans conditions correspond à tous.

:::info
Sur le tableau, chaque colonne d'étape affiche de petites annotations décrivant son routage -- par exemple, une étiquette de résultat ou "si correspond" suivi d'une flèche vers l'étape de destination ou le workflow.
:::

## Étapes entièrement automatisées

Vous pouvez faire fonctionner une étape entièrement seule, sans que personne ne la travaille. Donnez à l'étape ses **actions automatisées** et ajoutez un **itinéraire automatique** (sans conditions) pointant vers l'étape suivante. Quand une carte entre, les actions s'exécutent, puis l'itinéraire l'avance immédiatement -- la carte passe directement.

:::tip
Combinez ceci avec **Attendre** : *Envoyer un email de bienvenue → Attendre 3 jours → avancer automatiquement vers l'étape "Appel personnel".* L'email et le timing sont gérés pour vous, et un bénévole ne voit la carte que lorsqu'il est temps pour le toucher humain.
:::

## Déclencheurs

Les déclencheurs ajoutent des personnes à un workflow automatiquement quand quelque chose se passe, vous n'avez jamais besoin d'ajouter des cartes à la main. Sur un tableau de workflow, cliquez sur l'onglet **Déclencheurs**, puis **Ajouter un déclencheur**. Il y a deux types :

### Déclencheurs d'événement

S'activent dès qu'un enregistrement change dans B1. Choisissez l'événement, puis optionnellement ajoutez des **conditions** pour que seules les personnes correspondantes soient ajoutées :

- **Personne · Créée / Mise à jour** -- par ex. ajouter n'importe qui dont le statut devient *Visiteur*.
- **Don · Créé** -- par ex. ajouter un premier ou grand don à un workflow de remerciement (correspondre sur le montant, le fonds ou la méthode).
- **Groupe · Membre rejoint** / **Groupe · Créé**.
- **Formulaire · Soumis** -- ajouter n'importe qui qui soumet un formulaire choisi (parfait pour une carte "Je suis nouveau" ou "Se connecter").

### Déclencheurs programmés

S'exécutent sur une base récurrente -- quotidien, hebdomadaire, mensuel ou annuel -- contre un ensemble de conditions. Utilisez-les pour la sensibilisation basée sur le temps comme *tout le monde dont l'anniversaire d'adhésion est aujourd'hui* ou un *vérification mensuelle*.

Pour n'importe quel déclencheur, vous pouvez aussi définir :

- L'**étape d'entrée** sur laquelle la nouvelle carte démarre (par défaut la première étape).
- **Une fois par personne** -- pour que la même personne ne soit pas ajoutée au workflow deux fois par le déclencheur.
- **Actif** -- activez ou désactivez le déclencheur sans le supprimer.

:::tip
Associez un déclencheur **Formulaire · Soumis** au modèle **Suivi des nouveaux visiteurs** pour transformer votre formulaire "Carte de connexion" ou "Je suis nouveau" en un pipeline de suivi automatique.
:::

## Mes cartes

Les bénévoles et le personnel n'ont pas besoin de creuser à travers chaque tableau pour trouver leur travail. La page **Mes cartes** (liée à partir de la page Workflows) liste chaque carte assignée à l'utilisateur actuel sur tous les workflows. Cliquer sur une carte ouvre le tableau auquel elle appartient.

## Rapports

Ouvrez un workflow et cliquez sur **Rapports** pour voir des analyses pour ce workflow :

- **En retard** -- le nombre de cartes passées leur date d'échéance.
- **Cartes par étape** -- combien de cartes se trouvent actuellement sur chaque étape, affichées en graphique en barres.
- **Complétées (30 jours)** -- débit au cours des 30 derniers jours, affiché en graphique linéaire.

Utilisez ceci pour repérer les goulots -- par exemple, une étape où les cartes s'accumulent et ne progressent jamais.

## Articles connexes

- [Tâches](./tasks.md) -- les éléments d'action individuels sur lesquels les cartes de workflow sont construites
- [Automations](./automations.md) -- créer des tâches récurrentes selon un calendrier
- [Formulaires](../forms/index.md) -- construire les formulaires qui peuvent déclencher les workflows
- [Groupes](../groups/index.md) -- les groupes dans lesquels une action "Ajouter à un groupe" peut placer des personnes
- [Rôles & Autorisations](../settings/roles-permissions.md) -- contrôler qui peut voir, modifier et gérer les workflows
