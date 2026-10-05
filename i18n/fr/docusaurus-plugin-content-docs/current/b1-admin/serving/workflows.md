---
title: "Flux de travail"
---

# Flux de travail

<div class="article-intro">

Les flux de travail font avancer les gens à travers une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui se déplace d'une étape à la suivante -- d'un suivi de premier visiteur, à un processus d'adhésion, à un remerciement de premier donateur, et tout ce qui nécessite de suivre de nombreuses personnes à travers le même ensemble d'étapes. Une étape peut demander à un bénévole de faire quelque chose (passer un appel, avoir une conversation) **et** exécuter des actions automatisées d'elle-même -- envoyer un e-mail ou un texte, attendre quelques jours, ajouter la personne à un groupe -- donc les flux de travail gèrent à la fois le suivi humain et le travail de routine autour. Les flux de travail étendent les [Tâches](./tasks.md) sur un tableau Kanban glisser-déposer pour que personne et aucun ne tombe à travers les failles.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes que vous voulez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [Tâches](./tasks.md), puisque chaque carte sur un tableau est une tâche
- Pour utiliser l'action **Envoyer un e-mail**, créez d'abord les modèles d'e-mail que vous voulez envoyer (gérés sous **Messagerie → Gérer les modèles**)
- Pour utiliser l'action **Envoyer un texte**, connectez d'abord un [fournisseur de SMS](../settings/church-settings.md#texting)
- Vous aurez besoin de l'autorisation appropriée pour les tâches. Afficher, modifier les cartes et gérer les flux de travail sont des niveaux d'autorisation distincts (voir [Rôles et autorisations](../settings/roles-permissions.md))

</div>

## Affichage des flux de travail

Ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Service**, et cliquez sur **Flux de travail**. Vous verrez vos flux de travail listés et groupés par catégorie, les flux de travail actifs étant mis en surbrillance. Cliquez sur n'importe quel flux de travail pour ouvrir son tableau.

## Création d'un flux de travail

1. Sur la page Flux de travail, cliquez sur **Ajouter un flux de travail**.
2. Choisissez comment commencer :
   - **Flux de travail vierge** -- commencez à zéro et construisez vos propres étapes.
   - **À partir d'un modèle** -- commencez avec un ensemble d'étapes prédéfini que vous pouvez modifier. Les modèles intégrés incluent :
     - **Suivi de nouveau visiteur** -- Envoyer un e-mail de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Classe d'adhésion** -- Exprimer l'intérêt → S'inscrire au cours → Assister au cours → Compléter l'adhésion
     - **Remerciement de premier donateur** -- Envoyer une note de remerciement → Partager l'impact du don → Econome
3. Donnez au flux de travail un **Nom**.
4. Attribuez optionnellement une **Catégorie** pour regrouper les flux de travail connexes. Vous pouvez créer une nouvelle catégorie directement à partir de la liste déroulante.
5. Laissez le flux de travail **Actif** pour que des gens puissent y être ajoutés, ou mettez-le à **Inactif** pour le masquer des listes d'ajout au flux de travail.
6. Cliquez sur **Enregistrer**.

:::tip
Utilisez le bouton **Dupliquer** sur la liste Flux de travail pour copier un flux de travail existant -- y compris ses étapes, actions automatisées et routage -- comme point de départ pour un nouveau.
:::

## Construire le tableau avec des étapes

Chaque tableau de flux de travail est composé d'**étapes**, affichées sous forme de colonnes de gauche à droite. Ouvrez un flux de travail et utilisez **Ajouter une étape** pour créer chaque étape de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer :

- **Nom de l'étape** -- le titre de la colonne (par exemple, « Appel de bienvenue » ou « En attente d'enregistrement »).
- **Échéance (jours)** -- définit automatiquement une date d'échéance lorsqu'une carte entre dans cette étape. Les cartes passées leur date d'échéance sont signalées comme **En retard**.
- **Responsable par défaut** -- la personne ou le groupe aux lesquels les nouvelles cartes de cette étape sont automatiquement attribuées.
- **Actions automatisées** -- les choses que le système fait de lui-même lorsqu'une carte arrive (voir ci-dessous).
- **Routage** -- où la carte va lorsqu'elle quitte l'étape (voir [Routage](#routing-cards-with-outcomes-and-conditions)).

Faites glisser les colonnes d'étape dans l'ordre qui correspond à votre processus. L'ordre définit également le chemin par défaut qu'une carte prend lorsqu'aucun autre routage ne s'applique.

:::info
Enregistrez d'abord une nouvelle étape. Les actions automatisées et le routage s'attachent à l'étape, l'éditeur déverrouille donc ces sections une fois que l'étape existe.
:::

## Actions automatisées

Chaque étape peut comporter une liste d'**actions automatisées** qui s'exécutent d'elles-mêmes au moment où une carte **entre** dans l'étape -- avant que quelqu'un ne la touche. C'est ainsi qu'une étape incite à la fois un bénévole *et* s'occupe du travail de routine autour du suivi.

Dans l'éditeur d'étape, ouvrez **Actions automatisées**, cliquez sur **Ajouter une action**, choisissez un type, remplissez ses paramètres, et cliquez sur l'icône d'enregistrement sur cette action. Ajoutez-en autant que vous le souhaitez ; elles s'exécutent **de haut en bas dans l'ordre**.

| Action | Ce qu'il fait |
|---|---|
| **Envoyer un e-mail** | Envoie un modèle d'e-mail que vous choisissez à la personne. Vous pouvez remplacer la ligne d'objet. |
| **Envoyer un texte** | Envoie un SMS à la personne, par le biais du [fournisseur de SMS](../settings/church-settings.md#texting) de votre église. |
| **Attendre** | Met la carte en pause pendant un nombre de jours avant de continuer (voir ci-dessous). |
| **Ajouter au groupe** | Ajoute la personne à un [groupe](../groups/index.md) que vous choisissez. |
| **Retirer du groupe** | Retire la personne d'un groupe que vous choisissez. |
| **Ajouter au flux de travail** | Lance la personne sur un autre flux de travail -- utile pour la transmission entre les processus. |
| **Ajouter une note** | Enregistre une note dans l'historique de la carte. |
| **Définir le champ** | Met à jour un champ sur le dossier de la personne : Statut d'adhésion, Statut matrimonial, Genre, Ville, État ou Code postal. |
| **Webhook** | Envoie les détails de la carte à une adresse web externe (URL) que vous fournissez, pour la connexion à d'autres systèmes. |
| **Créer une tâche** | Crée une [tâche](./tasks.md) avec le titre et la description que vous entrez, attribuée à la personne que vous choisissez. |

Après que toutes les actions d'une étape soient terminées, la carte **repose sur cette étape** pour qu'une personne puisse la traiter -- sauf si l'étape a un itinéraire automatique qui la fait avancer (voir [Étapes entièrement automatisées](#fully-automated-steps)).

:::info
Les actions automatisées ne s'exécutent que lorsqu'une carte arrive par le flux normal -- lorsqu'elle est ajoutée pour la première fois, lorsqu'un résultat ou un itinéraire automatique l'apporte, ou après qu'une attente soit terminée. Elles ne se **réexécutent pas** lorsqu'un membre du personnel déplace manuellement une carte vers l'étape ou la renvoie, donc une personne ne recevra pas le même e-mail deux fois.
:::

### Envoi d'e-mail

Choisissez **Envoyer un e-mail**, sélectionnez l'un de vos modèles d'e-mail et tapez optionnellement un objet personnalisé. Lorsqu'une carte entre dans l'étape, la personne reçoit automatiquement cet e-mail. (Si la personne n'a pas d'adresse e-mail archivée, l'étape ignore simplement cette action.) Les [champs de fusion](../settings/email-templates.md#merge-fields) du modèle, tels que `{{firstName}}`, sont remplis avec les détails de la personne.

:::info
Les e-mails de flux de travail ne sont envoyés qu'après que votre église a été approuvée pour envoyer un e-mail de groupe, et ils s'ajoutent à la limite quotidienne d'e-mails de votre église. Voir [Activation de l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Envoi d'un texte

Choisissez **Envoyer un texte** et tapez le **Message texte** (jusqu'à 1600 caractères). Lorsqu'une carte entre dans l'étape, la personne reçoit ce texte sur son téléphone mobile. Vous pouvez personnaliser le message avec `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, ou `{{churchName}}`, qui sont remplis avec les détails de la personne lorsque le texte est envoyé.

- Si la personne n'a pas de numéro de téléphone mobile archivé, l'action est ignorée.
- Si la personne s'est désabonnée, aucun texte n'est envoyé et l'historique de la carte enregistre **Texte ignoré : désabonné**.
- Lorsque le texte est envoyé, l'historique de la carte enregistre **Texte envoyé**. Si l'envoi échoue -- par exemple, parce qu'aucun fournisseur de SMS n'est connecté ou que votre église n'a pas de crédits de SMS -- l'échec est consigné dans l'historique de la carte et les actions restantes de l'étape continuent quand même de s'exécuter.

:::warning
Les textes sont envoyés par le biais du [fournisseur de SMS](../settings/church-settings.md#texting) de votre église. Si aucun fournisseur n'est connecté, l'éditeur d'actions avertit *« Aucun fournisseur de SMS n'est configuré »* et les textes ne seront pas envoyés.
:::

### Attendre quelques jours (séquences de goutte à goutte)

L'action **Attendre** maintient une carte pendant le nombre de jours que vous définissez. Pendant qu'elle attend, la carte s'affiche comme **En attente**. Lorsque l'attente est terminée :

1. Toute action restante **sur la même étape** s'exécute -- vous pouvez ainsi construire une goutte à goutte comme **Envoyer un e-mail → Attendre 3 jours → Envoyer un e-mail de rappel**.
2. Ensuite, si l'étape a un itinéraire automatique, la carte avance ; sinon, elle repose sur l'étape pour qu'une personne la reprenne.

:::tip
Une **Attente** au tout début d'une étape est un moyen simple de « maintenir » une carte avant qu'elle ne soit affichée à un bénévole -- par exemple, *Attendre 7 jours, puis un entraîneur vous contacte*.
:::

## Ajout de personnes en tant que cartes

Il y a plusieurs façons de mettre les gens sur un tableau :

- **À partir du tableau** -- Cliquez sur **Ajouter une carte** en bas d'une colonne d'étape et sélectionnez une personne. Vous pouvez également sélectionner un groupe, et chaque membre de ce groupe est ajouté en tant que carte.
- **À partir du dossier d'une personne** -- Utilisez **Ajouter au flux de travail** sur la page d'une personne pour la placer sur un flux de travail.
- **À partir de la recherche de personnes** -- Sélectionnez plusieurs personnes et utilisez l'action en masse **Ajouter au flux de travail** pour les ajouter toutes à la fois.
- **Automatiquement avec un déclencheur** -- Ajoutez des personnes lorsque quelque chose se passe, comme une soumission de formulaire ou un premier don (voir [Déclencheurs](#triggers) ci-dessous).

## Travailler le tableau

Ouvrez un flux de travail pour voir son tableau. Chaque carte affiche le nom de la personne, à qui elle est attribuée, et une puce d'échéance ou de statut (**En retard** ou **En attente**). Une colonne d'étape affiche également de petits badges pour toute action automatisée qu'elle exécute et des annotations pour son routage, vous donnant une carte en coup d'œil de la façon dont les cartes circulent.

- **Déplacer une carte** -- Faites glisser une carte d'une colonne à la suivante à mesure que la personne progresse.
- **Ouvrir une carte** -- Double-cliquez sur une carte (ou cliquez dessus) pour ouvrir son tiroir de détails, où vous pouvez modifier l'étape, la réattribuer, ajouter des notes et examiner ce qui s'est déjà passé.

À partir du tiroir de la carte, vous pouvez :

- **Attribuer** la carte à une autre personne ou un autre groupe.
- **Mettre en attente** la carte pendant 1 jour, 3 jours ou 1 semaine pour masquer temporairement sa date d'échéance.
- **Envoyer en arrière** à l'étape précédente ou **Ignorer** à l'étape suivante.
- **Épingler l'affectation** -- gardez le même propriétaire sur la carte même si elle se déplace entre les étapes. Par défaut, le déplacement d'une carte vers une nouvelle étape la réattribue au responsable par défaut de cette étape ; l'épinglage garde la personne actuelle responsable tout au long.
- **Terminer** la carte pour la finir, ou choisir un bouton **Résultat** si l'étape a des résultats configurés (voir [Routage](#routing-cards-with-outcomes-and-conditions)).
- **Ajouter des notes** et examiner l'**historique** de la carte -- y compris un journal des actions automatisées qui ont été exécutées (e-mails envoyés, attentes, etc.).

### Actions en masse

Cochez les cases sur plusieurs cartes pour agir sur elles ensemble. Une barre d'outils apparaît vous permettant de **Terminer**, **Mettre en attente**, **Réattribuer**, ou **Déplacer** toutes les cartes sélectionnées vers une autre étape à la fois.

## Routage des cartes avec résultats et conditions

Le routage contrôle où va une carte lorsqu'elle quitte une étape. Ouvrez l'éditeur d'une étape pour configurer deux types de routage.

### Boutons de résultat

Les résultats sont des boutons affichés dans le tiroir de la carte lorsque vous terminez une carte sur cette étape. Au lieu d'un seul bouton **Terminer**, vous pouvez offrir des choix comme « Rejoint un groupe » ou « Pas intéressé ». Chaque résultat peut :

- Envoyer la carte vers **une autre étape** de ce flux de travail,
- **Transférer la carte** à un flux de travail complètement différent, ou
- **Fermer** la carte.

Cela permet à une décision de brancher la personne sur différents chemins.

### Routage automatique (conditionnel)

Les itinéraires automatiques déplacent une carte vers l'avant **dès qu'elle entre dans une étape** (et après que ses actions automatisées soient terminées), sans que quelqu'un ne clique, si la personne correspond à un ensemble de conditions. Ajoutez un itinéraire, choisissez l'étape cible et définissez une ou plusieurs **conditions** (par exemple, le campus, l'âge ou le statut d'adhésion d'une personne). Un itinéraire sans conditions correspond à tous.

:::info
Sur le tableau, chaque colonne d'étape affiche de petites annotations décrivant son routage -- par exemple, un libellé de résultat ou « si correspond » suivi d'une flèche vers l'étape ou le flux de travail de destination.
:::

## Étapes entièrement automatisées

Vous pouvez faire fonctionner une étape entièrement de manière autonome, sans que quelqu'un ne la travaille. Donnez à l'étape ses **actions automatisées** et ajoutez un **itinéraire automatique** (sans conditions) pointant vers l'étape suivante. Lorsqu'une carte entre, les actions s'exécutent, puis l'itinéraire l'avance immédiatement -- la carte passe directement.

:::tip
Combinez ceci avec **Attendre** : *Envoyer un e-mail de bienvenue → Attendre 3 jours → avancer automatiquement vers l'étape « Appel personnel »*. L'e-mail et l'horaire sont traités pour vous, et un bénévole ne voit la carte que lorsqu'il est temps pour le toucher humain.
:::

## Déclencheurs

Les déclencheurs ajoutent automatiquement des personnes à un flux de travail lorsque quelque chose se passe, de sorte que vous n'ayez jamais à ajouter des cartes à la main. Sur un tableau de flux de travail, cliquez sur l'onglet **Déclencheurs**, puis sur **Ajouter un déclencheur**. Il y a deux types :

### Déclencheurs d'événement

Se déclencher dès qu'un dossier change dans B1. Choisissez l'événement, puis ajoutez optionnellement des **conditions** pour que seules les personnes correspondantes soient ajoutées :

- **Personne · Créée / Mise à jour** -- par exemple, ajouter toute personne dont le statut devient *Visiteur*.
- **Don · Créé** -- par exemple, ajouter un don initial ou important à un flux de travail de remerciement (correspondance sur montant, fonds ou méthode).
- **Groupe · Membre rejoint** / **Groupe · Créé**.
- **Formulaire · Soumis** -- ajouter toute personne qui soumet un formulaire choisi (idéal pour une fiche « Je suis nouveau » ou « Se connecter »).

### Déclencheurs de calendrier

S'exécuter de manière récurrente -- quotidiennement, hebdomadairement, mensuellement ou annuellement -- contre un ensemble de conditions. Utilisez-les pour la sensibilisation basée sur le temps, comme *tous ceux dont l'anniversaire d'adhésion est aujourd'hui* ou une *vérification mensuelle*.

Pour tout déclencheur, vous pouvez également définir :

- L'**étape d'entrée** sur laquelle la nouvelle carte commence (par défaut, la première étape).
- **Une fois par personne** -- pour que la même personne ne soit pas ajoutée au flux de travail deux fois par le déclencheur.
- **Actif** -- activez ou désactivez le déclencheur sans le supprimer.

:::tip
Associez un déclencheur **Formulaire · Soumis** au modèle **Suivi de nouveau visiteur** pour transformer votre formulaire « Fiche de connexion » ou « Je suis nouveau » en un pipeline de suivi automatique.
:::

## Mes cartes

Les bénévoles et le personnel n'ont pas besoin de fouiller chaque tableau pour trouver leur travail. La page **Mes cartes** (liée depuis la page Flux de travail) répertorie toutes les cartes attribuées à l'utilisateur actuel dans tous les flux de travail. Cliquer sur une carte ouvre le tableau auquel elle appartient.

## Rapports

Ouvrez un flux de travail et cliquez sur **Rapports** pour voir l'analyse de ce flux de travail :

- **En retard** -- le nombre de cartes passées leur date d'échéance.
- **Cartes par étape** -- le nombre de cartes actuellement sur chaque étape, affiché sous forme de diagramme en colonnes.
- **Terminé (30 jours)** -- le débit au cours des 30 derniers jours, affiché sous forme de diagramme linéaire.

Utilisez-les pour repérer les goulots d'étranglement -- par exemple, une étape où les cartes s'accumulent et ne progressent jamais.

## Articles connexes

- [Tâches](./tasks.md) -- les éléments d'action individuels sur lesquels les cartes de flux de travail sont construites
- [Formulaires](../forms/index.md) -- créer les formulaires qui peuvent déclencher les flux de travail
- [Groupes](../groups/index.md) -- les groupes dans lesquels une action « Ajouter au groupe » peut placer les personnes
- [Rôles et autorisations](../settings/roles-permissions.md) -- contrôler qui peut afficher, modifier et gérer les flux de travail

