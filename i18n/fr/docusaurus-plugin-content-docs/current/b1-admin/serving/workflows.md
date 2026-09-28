---
title: "Flux de travail"
---

# Flux de travail

<div class="article-intro">

Les flux de travail font progresser les gens à travers une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui se déplace d'une étape à l'autre -- d'un suivi de nouveau visiteur, à un processus d'adhésion, à un merci pour un premier don, et tout ce où vous devez suivre de nombreuses personnes à travers le même ensemble d'étapes. Une étape peut demander à un bénévole de faire quelque chose (passer un appel, avoir une conversation) **et** exécuter des actions automatisées en soi -- envoyer un e-mail, attendre quelques jours, ajouter la personne à un groupe -- pour que les flux de travail gèrent à la fois le suivi humain et le travail routinier autour. Les flux de travail étendent les [Tâches](./tasks.md) dans un tableau Kanban avec glisser-déposer pour que rien et personne ne tombe à travers les mailles.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les gens que vous voulez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [Tâches](./tasks.md), car chaque carte du tableau est une tâche
- Pour utiliser l'action **Envoyer un e-mail**, créez d'abord les modèles d'e-mail que vous voulez envoyer (gérés sous **Messagerie → Gérer les modèles**)
- Vous aurez besoin de la permission Tâches appropriée. L'affichage, la modification des cartes et la gestion des flux de travail sont des niveaux de permission distincts (voir [Rôles et permissions](../settings/roles-permissions.md))

</div>

## Affichage des flux de travail

Accédez à **Serving** et sélectionnez **Workflows** dans le menu. Vous verrez vos flux de travail listés et groupés par catégorie, avec les flux de travail actifs mis en évidence. Cliquez sur n'importe quel flux de travail pour ouvrir son tableau.

## Création d'un flux de travail

1. Sur la page Workflows, cliquez sur **Add Workflow**.
2. Choisissez comment commencer:
   - **Blank workflow** -- commencez de zéro et construisez vos propres étapes.
   - **From a template** -- commencez avec un ensemble d'étapes prêt à l'emploi que vous pouvez modifier. Les modèles intégrés incluent:
     - **New Visitor Follow-up** -- Envoyer un e-mail de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Membership Class** -- Exprimer l'intérêt → S'inscrire à la classe → Assister à la classe → Compléter l'adhésion
     - **First-time Giver Thank-you** -- Envoyer une note de remerciement → Partager l'impact du don → Géré
3. Donnez au flux de travail un **Name**.
4. Éventuellement, attribuez une **Category** pour regrouper les flux de travail associés. Vous pouvez créer une nouvelle catégorie directement à partir de la liste déroulante.
5. Laissez le flux de travail **Active** pour que les gens puissent y être ajoutés, ou réglez-le sur **Inactive** pour le masquer des listes d'ajout au flux de travail.
6. Cliquez sur **Save**.

:::tip
Utilisez le bouton **Duplicate** sur la liste Workflows pour copier un flux de travail existant -- y compris ses étapes, actions automatisées et routage -- comme point de départ pour un nouveau.
:::

## Construire le tableau avec des étapes

Chaque tableau de flux de travail est composé d'**étapes**, affichées sous forme de colonnes de gauche à droite. Ouvrez un flux de travail et utilisez **Add Step** pour créer chaque étape de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer:

- **Step Name** -- l'en-tête de la colonne (par exemple, "Welcome Call" ou "Awaiting Registration").
- **Due in (days)** -- définit automatiquement une date d'échéance lorsqu'une carte entre dans cette étape. Les cartes après leur date d'échéance sont marquées comme **Overdue**.
- **Default assignee** -- la personne ou le groupe auquel les nouvelles cartes sur cette étape sont automatiquement assignées.
- **Automated actions** -- les choses que le système fait tout seul lorsqu'une carte arrive (voir ci-dessous).
- **Routing** -- où va la carte lorsqu'elle quitte l'étape (voir [Routage](#routing-cards-with-outcomes-and-conditions)).

Glissez les colonnes d'étapes dans l'ordre qui correspond à votre processus. L'ordre définit également le chemin par défaut qu'une carte emprunte lorsqu'aucun autre routage ne s'applique.

:::info
Enregistrez d'abord une nouvelle étape. Les actions automatisées et le routage s'attachent à l'étape, donc l'éditeur déverrouille ces sections une fois que l'étape existe.
:::

## Actions automatisées

Chaque étape peut porter une liste d'**actions automatisées** qui s'exécutent d'elles-mêmes au moment où une carte **entre** dans l'étape -- avant que quiconque ne la touche. C'est ainsi qu'une étape à la fois invite un bénévole *et* s'occupe du travail routinier autour du suivi.

Dans l'éditeur d'étape, ouvrez **Automated actions**, cliquez sur **Add Action**, choisissez un type, remplissez ses paramètres, et cliquez sur l'icône d'enregistrement sur cette action. Ajoutez autant que vous en avez besoin; ils s'exécutent **de haut en bas dans l'ordre**.

| Action | Ce qu'il fait |
|---|---|
| **Send email** | Envoie à la personne un modèle d'e-mail que vous choisissez. Vous pouvez remplacer la ligne d'objet. |
| **Wait** | Met en pause la carte pendant un nombre de jours avant de continuer (voir ci-dessous). |
| **Add to group** | Ajoute la personne à un [groupe](../groups/index.md) que vous choisissez. |
| **Add to workflow** | Commence la personne sur un autre flux de travail -- utile pour passer entre les processus. |
| **Add note** | Enregistre une note dans l'historique de la carte. |
| **Set field** | Met à jour un champ sur le dossier de la personne: Membership Status, Marital Status, Gender, City, State, or Zip. |
| **Webhook** | Envoie les détails de la carte à une adresse web externe (URL) que vous fournissez, pour se connecter à d'autres systèmes. |

Après que toutes les actions d'une étape se terminent, la carte **repose sur cette étape** pour que une personne puisse la traiter -- à moins que l'étape n'ait une route automatique qui l'avance (voir [Étapes entièrement automatisées](#fully-automated-steps)).

:::info
Les actions automatisées ne s'exécutent que lorsqu'une carte arrive par le flux normal -- lorsqu'elle est d'abord ajoutée, lorsqu'un résultat ou une route automatique l'apporte, ou après l'attente se termine. Ils **ne** se réexécutent pas lorsqu'un membre du personnel fait glisser manuellement une carte sur l'étape ou la renvoie, pour que une personne ne reçoive pas le même e-mail deux fois.
:::

### Envoyer un e-mail

Choisissez **Send email**, choisissez l'un de vos modèles d'e-mail, et éventuellement tapez un objet personnalisé. Lorsqu'une carte entre dans l'étape, la personne reçoit cet e-mail automatiquement. (Si la personne n'a pas d'adresse e-mail dans le dossier, l'étape saute simplement cette action.)

:::info
Les e-mails des flux de travail ne sortent qu'après que votre église a été approuvée pour envoyer des e-mails groupés, et ils comptent vers la limite d'e-mails quotidienne de votre église. Voir [Activation de la messagerie groupée pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Attendre quelques jours (séquences d'égouttement)

L'action **Wait** maintient une carte pendant le nombre de jours que vous définissez. Pendant qu'elle attend, la carte s'affiche comme **Snoozed**. Lorsque l'attente est terminée:

1. Toutes les **actions restantes sur la même étape** s'exécutent -- pour que vous puissiez construire une égouttement comme **Send email → Wait 3 days → Send a reminder email**.
2. Ensuite, si l'étape a une route automatique, la carte avance; sinon, elle repose sur l'étape pour qu'une personne la prenne.

:::tip
Une **attente** au tout début d'une étape est un moyen simple de "tenir" une carte avant qu'elle ne remonte à un bénévole -- par exemple, *Attendre 7 jours, puis un entraîneur se contacte*.
:::

## Ajout de personnes en tant que cartes

Il y a plusieurs façons de mettre des gens sur un tableau:

- **From the board** -- Cliquez sur **Add Card** au bas d'une colonne d'étape et choisissez une personne. Vous pouvez également choisir un groupe, et chaque membre du groupe est ajouté en tant que carte.
- **From a person's record** -- Utilisez **Add to Workflow** sur la page d'une personne pour les déposer sur un flux de travail.
- **From People search** -- Sélectionnez plusieurs personnes et utilisez l'action en masse **Add to Workflow** pour les ajouter tous à la fois.
- **Automatically with a trigger** -- Ajoutez les gens quand quelque chose se passe, comme une soumission de formulaire ou un premier don (voir [Déclencheurs](#triggers) ci-dessous).

## Exploitation du tableau

Ouvrez un flux de travail pour voir son tableau. Chaque carte affiche le nom de la personne, à qui elle est assignée, et une puce de date d'échéance ou de statut (**Overdue** ou **Snoozed**). Une colonne d'étape affiche également de petits insignes pour toutes les actions automatisées qu'elle exécute et des annotations pour son routage, vous donnant une vue d'ensemble de la façon dont les cartes circulent.

- **Move a card** -- Glissez une carte d'une colonne à la suivante au fur et à mesure que la personne progresse.
- **Open a card** -- Double-cliquez sur une carte (ou cliquez dessus) pour ouvrir son tiroir de détails, où vous pouvez changer l'étape, la réassigner, ajouter des notes, et examiner ce qui s'est déjà passé.

À partir du tiroir de la carte, vous pouvez:

- **Assign** la carte à une personne ou un groupe différent.
- **Snooze** la carte pendant 1 jour, 3 jours ou 1 semaine pour masquer temporairement sa date d'échéance.
- **Send Back** à l'étape précédente ou **Skip** à l'étape suivante.
- **Pin assignment** -- gardez le même propriétaire sur la carte même lorsqu'elle se déplace entre les étapes. Par défaut, le déplacement d'une carte à une nouvelle étape la réassigne à l'assigné par défaut de cette étape; l'épinglage garde la personne actuelle responsable tout au long.
- **Complete** la carte pour la terminer, ou choisissez un bouton **Outcome** si l'étape a des résultats configurés (voir [Routage](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** et examinez l'**history** de la carte -- y compris un journal des actions automatisées qui se sont exécutées (e-mails envoyés, attentes, etc.).

### Actions en masse

Sélectionnez les cases à cocher sur plusieurs cartes pour les traiter ensemble. Une barre d'outils apparaît vous permettant de **Complete**, **Snooze**, **Reassign**, ou **Move** toutes les cartes sélectionnées vers une autre étape à la fois.

## Routage des cartes avec résultats et conditions

Le routage contrôle où va une carte lorsqu'elle quitte une étape. Ouvrez l'éditeur d'une étape pour configurer deux types de routage.

### Boutons de résultat

Les résultats sont des boutons affichés sur le tiroir de la carte lorsque vous terminez une carte sur cette étape. Au lieu d'un seul bouton **Complete**, vous pouvez proposer des choix comme "Joined a Group" ou "Not Interested." Chaque résultat peut:

- Envoyer la carte à **une autre étape** dans ce flux de travail,
- **Hand the card off** à un flux de travail entièrement différent, ou
- **Close** la carte.

Cela permet à une décision de brancher la personne vers des chemins différents.

### Routage automatique (conditionnel)

Les itinéraires automatiques déplacent une carte **au moment où elle entre dans une étape** (et après l'exécution de ses actions automatisées), sans que quiconque clique, si la personne correspond à un ensemble de conditions. Ajoutez une route, choisissez l'étape cible, et définissez une ou plusieurs **conditions** (par exemple, le campus, l'âge ou le statut d'adhésion d'une personne). Une route sans conditions correspond à tout le monde.

:::info
Sur le tableau, chaque colonne d'étape affiche de petites annotations décrivant son routage -- par exemple, une étiquette de résultat ou "if matches" suivie d'une flèche vers l'étape de destination ou le flux de travail.
:::

## Étapes entièrement automatisées

Vous pouvez faire fonctionner une étape entièrement d'elle-même, sans que quiconque ne la traite. Donnez à l'étape ses **actions automatisées** et ajoutez une **route automatique** (sans conditions) pointant vers l'étape suivante. Lorsqu'une carte entre, les actions s'exécutent, puis la route l'avance immédiatement -- la carte passe directement.

:::tip
Combinez cela avec **Wait**: *Send welcome email → Wait 3 days → automatically advance to the "Personal call" step.* L'e-mail et le timing sont gérés pour vous, et un bénévole ne voit la carte que lorsqu'il est temps pour le contact humain.
:::

## Déclencheurs

Les déclencheurs ajoutent des gens à un flux de travail automatiquement lorsque quelque chose se passe, pour que vous n'ayez jamais à ajouter des cartes à la main. Sur un tableau de flux de travail, cliquez sur l'onglet **Triggers**, puis sur **Add Trigger**. Il y a deux types:

### Déclencheurs d'événements

Déclenchent dès qu'un enregistrement change dans B1. Choisissez l'événement, puis ajoutez éventuellement des **conditions** pour que seules les personnes correspondantes soient ajoutées:

- **Person · Created / Updated** -- par exemple, ajouter quiconque dont le statut devient *Visitor*.
- **Donation · Created** -- par exemple, ajouter un premier don ou un gros don à un flux de travail de remerciement (correspondre au montant, au fonds ou à la méthode).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- ajouter quiconque soumet un formulaire choisi (idéal pour une carte "I'm New" ou "Connect").

### Déclencheurs d'horaire

S'exécutent sur une base récurrente -- quotidienne, hebdomadaire, mensuelle ou annuelle -- par rapport à un ensemble de conditions. Utilisez-les pour les efforts de sensibilisation basés sur le temps, comme *tout le monde dont l'anniversaire d'adhésion est aujourd'hui* ou un *check-in mensuel*.

Pour n'importe quel déclencheur, vous pouvez également définir:

- L'**étape d'entrée** sur laquelle la nouvelle carte commence (par défaut, la première étape).
- **Once per person** -- pour que la même personne ne soit pas ajoutée deux fois au flux de travail par le déclencheur.
- **Active** -- allumez ou éteignez le déclencheur sans le supprimer.

:::tip
Associez un déclencheur **Form · Submitted** au modèle **New Visitor Follow-up** pour transformer votre formulaire "Connect Card" ou "I'm New" en un pipeline de suivi automatique.
:::

## Mes cartes

Les bénévoles et le personnel n'ont pas besoin de fouiller dans chaque tableau pour trouver leur travail. La page **My Cards** (liée à partir de la page Workflows) répertorie chaque carte assignée à l'utilisateur actuel sur tous les flux de travail. Cliquez sur une carte pour ouvrir le tableau auquel elle appartient.

## Rapports

Ouvrez un flux de travail et cliquez sur **Reports** pour voir les analyses de ce flux de travail:

- **Overdue** -- le nombre de cartes au-delà de leur date d'échéance.
- **Cards per Step** -- combien de cartes se trouvent actuellement sur chaque étape, affichées sous forme de graphique en colonnes.
- **Completed (30 days)** -- le débit au cours des 30 derniers jours, affiché sous forme de graphique en lignes.

Utilisez ces pour repérer les goulots d'étranglement -- par exemple, une étape où les cartes s'accumulent et n'avancent jamais.

## Articles connexes

- [Tasks](./tasks.md) -- les éléments d'action individuels sur lesquels les cartes de flux de travail sont construites
- [Forms](../forms/index.md) -- construisez les formulaires qui peuvent déclencher les flux de travail
- [Groups](../groups/index.md) -- les groupes qu'une action "Add to group" peut placer les gens dans
- [Roles & Permissions](../settings/roles-permissions.md) -- contrôler qui peut afficher, modifier et gérer les flux de travail
