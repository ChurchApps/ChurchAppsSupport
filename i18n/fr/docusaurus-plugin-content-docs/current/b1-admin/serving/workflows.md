---
title: "Flux de travail"
---

# Flux de travail {#workflows}

<div class="article-intro">

Les flux de travail font progresser les personnes à travers une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui passe d'une étape à la suivante : du suivi d'un premier visiteur à un processus d'adhésion, en passant par un message de remerciement pour un premier don, et tout autre cas où vous devez suivre de nombreuses personnes à travers les mêmes étapes. Une étape peut demander à un bénévole d'agir (passer un appel, avoir une conversation) **et** exécuter elle-même des actions automatisées (envoyer un e-mail ou un texto, attendre quelques jours, ajouter la personne à un groupe). Les flux de travail gèrent donc à la fois le suivi humain et les tâches répétitives qui l'entourent. Ils étendent les [Tâches](./tasks.md) à un tableau Kanban par glisser-déposer, afin que rien ni personne ne passe entre les mailles du filet.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes que vous souhaitez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [Tâches](./tasks.md), car chaque carte d'un tableau est une tâche
- Pour utiliser l'action **Envoyer un e-mail**, créez d'abord les modèles d'e-mail que vous souhaitez envoyer (gérés sous **Paramètres → Modèles d'e-mail**)
- Pour utiliser l'action **Envoyer un texto**, connectez d'abord un [fournisseur de SMS](../settings/church-settings.md#texting)
- Vous aurez besoin de l'autorisation Tâches appropriée. Afficher, modifier les cartes et gérer les flux de travail sont des niveaux d'autorisation distincts (voir [Rôles et permissions](../settings/roles-permissions.md))

</div>

## Afficher les flux de travail {#viewing-workflows}

Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Service** et cliquez sur **Flux de travail**. Vos flux de travail sont listés dans un tableau indiquant la **Catégorie** et le **Statut** de chacun (**Actif** ou **Inactif**). Si vous utilisez des catégories, des onglets au-dessus de la liste vous permettent de la filtrer par catégorie. Cliquez sur un flux de travail pour ouvrir son tableau.

## Créer un flux de travail {#creating-a-workflow}

1. Sur la page Flux de travail, cliquez sur **Ajouter un flux de travail**.
2. Choisissez comment commencer :
   - **Flux de travail vierge** : partez de zéro et créez vos propres étapes.
   - **À partir d'un modèle** : partez d'un ensemble d'étapes prêt à l'emploi que vous pouvez modifier. Les modèles intégrés comprennent :
     - **Suivi des nouveaux visiteurs** : Envoyer un e-mail de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Cours d'adhésion** : Manifester son intérêt → S'inscrire au cours → Assister au cours → Finaliser l'adhésion
     - **Remerciement au premier donateur** : Envoyer une note de remerciement → Partager l'impact du don → Intendance
3. Donnez un **Nom** au flux de travail.
4. Vous pouvez éventuellement attribuer une **Catégorie** pour regrouper les flux de travail liés. Vous pouvez créer une nouvelle catégorie directement depuis la liste déroulante.
5. Laissez le flux de travail **Actif** pour que des personnes puissent y être ajoutées, ou réglez-le sur **Inactif** pour le masquer des listes d'ajout à un flux de travail.
6. Cliquez sur **Enregistrer**.

:::tip
Utilisez le bouton **Dupliquer** dans la liste des flux de travail pour copier un flux existant, y compris ses étapes, ses actions automatisées et son routage, et l'utiliser comme point de départ d'un nouveau.
:::

## Construire le tableau avec des étapes {#building-the-board-with-steps}

Chaque tableau de flux de travail se compose d'**étapes**, affichées sous forme de colonnes de gauche à droite. Ouvrez un flux de travail et utilisez **Ajouter une étape** pour créer chaque phase de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer :

- **Nom de l'étape** : l'en-tête de la colonne (par exemple, « Appel de bienvenue » ou « En attente d'inscription »).
- **Échéance dans (jours)** : définit automatiquement une date d'échéance lorsqu'une carte entre dans cette étape. Les cartes dont la date d'échéance est dépassée sont signalées comme **En retard**.
- **Responsable par défaut** : la personne ou le groupe auquel les nouvelles cartes de cette étape sont automatiquement assignées. Lorsque le responsable par défaut est une personne, elle reçoit une notification indiquant qu'une carte lui a été assignée.
- **Actions automatisées** : les actions que le système effectue de lui-même lorsqu'une carte arrive (voir ci-dessous).
- **Routage** : l'étape vers laquelle la carte est dirigée lorsqu'elle quitte l'étape (voir [Routage](#routing-cards-with-outcomes-and-conditions)).

Faites glisser les colonnes d'étapes dans l'ordre qui correspond à votre processus. L'ordre définit aussi le chemin par défaut emprunté par une carte lorsqu'aucun autre routage ne s'applique.

:::info
Enregistrez d'abord une nouvelle étape. Les actions automatisées et le routage sont rattachés à l'étape ; l'éditeur ne déverrouille donc ces sections qu'une fois l'étape créée.
:::

## Actions automatisées {#automated-actions}

Chaque étape peut contenir une liste d'**actions automatisées** qui s'exécutent d'elles-mêmes dès qu'une carte **entre** dans l'étape, avant que quiconque n'intervienne. C'est ainsi qu'une étape à la fois sollicite un bénévole *et* prend en charge les tâches courantes qui entourent le suivi.

Dans l'éditeur d'étape, ouvrez **Actions automatisées**, cliquez sur **Ajouter une action**, choisissez un type, renseignez ses paramètres, puis cliquez sur l'icône d'enregistrement de cette action. Ajoutez-en autant que nécessaire ; elles s'exécutent **de haut en bas, dans l'ordre**.

| Action | Ce qu'elle fait |
|---|---|
| **Envoyer un e-mail** | Envoie à la personne un modèle d'e-mail de votre choix. Vous pouvez remplacer l'objet. |
| **Envoyer un texto** | Envoie à la personne un message que vous rédigez, via le [fournisseur de SMS](../settings/church-settings.md#texting) de votre église. |
| **Attendre** | Met la carte en pause pendant un nombre de jours avant de continuer (voir ci-dessous). |
| **Ajouter au groupe** | Ajoute la personne à un [groupe](../groups/index.md) de votre choix. |
| **Retirer du groupe** | Retire la personne d'un groupe de votre choix. |
| **Ajouter au flux de travail** | Démarre le parcours de la personne dans un autre flux de travail, utile pour passer d'un processus à un autre. |
| **Ajouter une note** | Enregistre une note dans l'historique de la carte. |
| **Définir un champ** | Met à jour un champ de la fiche de la personne : Statut d'adhésion, État civil, Genre, Ville, Région ou Code postal. |
| **Webhook** | Envoie les détails de la carte à une adresse web externe (URL) que vous fournissez, pour la connexion à d'autres systèmes. |
| **Créer une tâche** | Crée une [tâche](./tasks.md) avec le titre et la description que vous saisissez, assignée à la personne de votre choix. |

Une fois toutes les actions d'une étape terminées, la carte **reste sur cette étape** afin qu'une personne puisse la traiter, sauf si l'étape possède un routage automatique qui la fait avancer (voir [Étapes entièrement automatisées](#fully-automated-steps)).

:::info
Les actions automatisées ne s'exécutent que lorsqu'une carte arrive par le flux normal : lorsqu'elle est ajoutée pour la première fois, lorsqu'un résultat ou un routage automatique la fait entrer, ou après la fin d'une attente. Elles ne se relancent **pas** lorsqu'un membre du personnel fait glisser manuellement une carte vers l'étape ou la renvoie, afin qu'une personne ne reçoive pas deux fois le même e-mail.
:::

### Envoyer un e-mail {#sending-email}

Choisissez **Envoyer un e-mail**, sélectionnez l'un de vos modèles d'e-mail et, si vous le souhaitez, saisissez un objet personnalisé. Lorsqu'une carte entre dans l'étape, la personne reçoit automatiquement cet e-mail. (Si la personne n'a pas d'adresse e-mail enregistrée, l'étape ignore simplement cette action.) Les [champs de fusion](../settings/email-templates.md#merge-fields) du modèle, comme `{{firstName}}`, sont remplacés par les informations propres à la personne.

:::info
Les e-mails des flux de travail ne sont envoyés qu'une fois que votre église a été approuvée pour envoyer des e-mails de groupe, et ils comptent dans la limite quotidienne d'e-mails de votre église. Voir [Activer les e-mails de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

### Envoyer un texto {#sending-a-text}

Choisissez **Envoyer un texto** et saisissez le **Message texte** (jusqu'à 1 600 caractères). Lorsqu'une carte entre dans l'étape, la personne reçoit ce texto sur son téléphone mobile. Vous pouvez personnaliser le message avec `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`, qui sont remplacés par les informations de la personne lors de l'envoi.

- Si la personne n'a pas de téléphone mobile enregistré, aucun texto n'est envoyé et l'historique de la carte indique **Texto ignoré : aucun téléphone mobile**.
- Si la personne s'est désabonnée, aucun texto n'est envoyé et l'historique de la carte indique **Texto ignoré : désabonné**.
- Lorsque le texto est envoyé, l'historique de la carte indique **Texto envoyé**. Si l'envoi échoue, par exemple parce qu'aucun fournisseur de SMS n'est connecté ou que votre église n'a plus de crédits de SMS, l'échec est consigné dans l'historique de la carte et les autres actions de l'étape s'exécutent tout de même.

:::warning
Les textos sont envoyés via le [fournisseur de SMS](../settings/church-settings.md#texting) propre à votre église. Si aucun fournisseur n'est connecté, l'éditeur d'action affiche l'avertissement *« Aucun fournisseur de SMS n'est configuré »* et les textos ne seront pas envoyés.
:::

### Attendre quelques jours (séquences de relance) {#waiting-a-few-days-drip-sequences}

L'action **Attendre** maintient une carte pendant le nombre de jours que vous avez défini. Pendant l'attente, la carte s'affiche comme **En sommeil**. B1 vérifie les attentes terminées toutes les 30 minutes : une carte reprend donc son cours dans la demi-heure qui suit la fin de son attente. Une fois l'attente terminée :

1. Les **autres actions de la même étape** s'exécutent : vous pouvez ainsi créer une relance du type **Envoyer un e-mail → Attendre 3 jours → Envoyer un e-mail de rappel**.
2. Ensuite, si l'étape possède un routage automatique, la carte avance ; sinon, elle reste sur l'étape jusqu'à ce qu'une personne la prenne en charge.

:::tip
Une action **Attendre** placée au tout début d'une étape permet de « retenir » une carte avant qu'elle ne soit présentée à un bénévole, par exemple *Attendre 7 jours, puis un coach prend contact*.
:::

## Ajouter des personnes comme cartes {#adding-people-as-cards}

Plusieurs méthodes permettent d'ajouter des personnes à un tableau :

- **Depuis le tableau** : cliquez sur **Ajouter une carte** au bas d'une colonne d'étape et choisissez une personne. Vous pouvez aussi choisir un groupe ; chaque membre de ce groupe est alors ajouté comme carte.
- **Depuis la fiche d'une personne** : utilisez **Ajouter au flux de travail** sur la page d'une personne pour la placer dans un flux de travail.
- **Depuis la recherche de personnes** : sélectionnez plusieurs personnes et utilisez l'action groupée **Ajouter au flux de travail** pour toutes les ajouter en une fois.
- **Automatiquement avec un déclencheur** : ajoutez des personnes lorsqu'un événement se produit, comme la soumission d'un formulaire ou un premier don (voir [Déclencheurs](#triggers) ci-dessous).

## Travailler sur le tableau {#working-the-board}

Ouvrez un flux de travail pour voir son tableau. Chaque carte affiche le nom de la personne, son responsable, ainsi qu'une étiquette d'échéance ou de statut (**En retard** ou **En sommeil**). Une colonne d'étape affiche aussi de petits badges pour les actions automatisées qu'elle exécute et des annotations pour son routage, ce qui vous donne un aperçu immédiat de la circulation des cartes.

- **Déplacer une carte** : faites glisser une carte d'une colonne à la suivante à mesure que la personne progresse.
- **Ouvrir une carte** : double-cliquez sur une carte (ou cliquez dessus) pour ouvrir son panneau de détails, où vous pouvez changer l'étape, la réassigner, ajouter des notes et consulter ce qui s'est déjà passé.

Depuis le panneau de la carte, vous pouvez :

- **Assigner** la carte à une autre personne ou à un autre groupe.
- **Mettre en sommeil** la carte pendant 1 jour, 3 jours ou 1 semaine pour masquer temporairement sa date d'échéance.
- **Renvoyer** à l'étape précédente ou **Passer** à l'étape suivante.
- **Épingler l'assignation** : conserver le même responsable sur la carte même lorsqu'elle passe d'une étape à l'autre. Par défaut, déplacer une carte vers une nouvelle étape la réassigne au responsable par défaut de cette étape ; l'épingler maintient la personne actuelle responsable tout au long du processus.
- **Terminer** la carte pour la clôturer, ou choisir un bouton **Résultat** si l'étape en comporte (voir [Routage](#routing-cards-with-outcomes-and-conditions)).
- **Ajouter des notes** et consulter l'**Activité** de la carte, un journal des actions automatisées exécutées (e-mails envoyés, attentes, etc.).

Pour une carte concernant une personne, le panneau affiche également son téléphone mobile et son e-mail sous forme de liens sur lesquels vous pouvez cliquer pour l'appeler ou lui écrire, ainsi qu'un lien **Voir la fiche** si vous êtes autorisé à consulter les personnes. La personne à qui la carte est assignée voit le téléphone et l'e-mail, même sans accès à Personnes.

Les notes sont enregistrées avec la carte. Toute personne qui peut ouvrir la carte, y compris la personne ou le groupe auquel elle est assignée, peut lire les notes et en ajouter. Les personnes qui ne peuvent pas ouvrir la carte ne voient pas ses notes.

### Actions groupées {#bulk-actions}

Cochez les cases de plusieurs cartes pour agir sur elles ensemble. Une barre d'outils apparaît et vous permet de **Terminer**, **Mettre en sommeil**, **Assigner** (réassigner) ou **Déplacer vers…** une autre étape pour toutes les cartes sélectionnées à la fois.

## Routage des cartes avec résultats et conditions {#routing-cards-with-outcomes-and-conditions}

Le routage détermine où va une carte lorsqu'elle quitte une étape. Ouvrez l'éditeur d'étape pour configurer deux types de routage.

### Boutons de résultat {#outcome-buttons}

Les résultats sont des boutons affichés dans le panneau de la carte lorsque vous la terminez sur cette étape. Au lieu d'un unique bouton **Terminer**, vous pouvez proposer des choix tels que « A rejoint un groupe » ou « Pas intéressé ». Chaque résultat peut :

- Envoyer la carte vers **une autre étape** de ce flux de travail,
- **Transférer la carte** à un autre flux de travail, ou
- **Clôturer** la carte.

Cela permet à une seule décision d'orienter la personne vers différents parcours.

### Routage automatique (conditionnel) {#automatic-routing-conditional}

Les routes automatiques font avancer une carte **dès qu'elle entre dans une étape** (et après la fin de ses actions automatisées), sans que personne ne clique, si la personne correspond à un ensemble de conditions. Ajoutez une route, choisissez l'étape cible et définissez une ou plusieurs **conditions** (par exemple, le site, l'âge ou le statut d'adhésion d'une personne). Les champs texte peuvent correspondre exactement ou avec **contient**, **commence par** ou **se termine par**. Une route sans condition correspond à tout le monde.

Si les conditions d'une route ne peuvent pas être vérifiées pour une raison quelconque, cette route est considérée comme ne correspondant pas. La carte reste sur l'étape (ou suit une autre route qui correspond) au lieu de rester bloquée.

:::info
Sur le tableau, chaque colonne d'étape affiche de petites annotations décrivant son routage, par exemple un libellé de résultat ou « si correspond » suivi d'une flèche vers l'étape ou le flux de travail de destination.
:::

## Étapes entièrement automatisées {#fully-automated-steps}

Vous pouvez faire fonctionner une étape entièrement de manière autonome, sans que personne ne la traite. Donnez-lui ses **actions automatisées** et ajoutez une **route automatique** (sans condition) pointant vers l'étape suivante. Lorsqu'une carte entre, les actions s'exécutent, puis la route la fait avancer immédiatement : la carte traverse l'étape sans s'arrêter.

:::tip
Combinez cela avec **Attendre** : *Envoyer un e-mail de bienvenue → Attendre 3 jours → passer automatiquement à l'étape « Appel personnel »*. L'e-mail et le délai sont gérés pour vous, et un bénévole ne voit la carte que lorsque le moment du contact humain est venu.
:::

## Déclencheurs {#triggers}

Les déclencheurs ajoutent automatiquement des personnes à un flux de travail lorsqu'un événement se produit, de sorte que vous n'avez jamais à ajouter les cartes à la main. Sur le tableau d'un flux de travail, cliquez sur l'onglet **Déclencheurs**, puis sur **Ajouter un déclencheur**. Il en existe deux types :

### Déclencheurs d'événement {#event-triggers}

Ils se déclenchent dès qu'un enregistrement change dans B1. Choisissez l'événement, puis ajoutez éventuellement des **conditions** afin que seules les personnes correspondantes soient ajoutées :

- **Personne · Créée / Modifiée** : par exemple, ajouter toute personne dont le statut devient *Visiteur*.
- **Don · Créé** : par exemple, ajouter un premier don ou un don important à un flux de remerciement (en filtrant selon le montant, le fonds ou le mode de paiement).
- **Groupe · Membre ajouté** / **Groupe · Créé**.
- **Formulaire · Soumis** : ajouter toute personne qui soumet un formulaire choisi (idéal pour une carte « Je suis nouveau » ou « Me connecter »).

### Déclencheurs planifiés {#schedule-triggers}

Ils s'exécutent de façon récurrente (quotidienne, hebdomadaire, mensuelle ou annuelle) selon un ensemble de conditions. Utilisez-les pour des relances liées au temps, comme *toutes les personnes dont l'anniversaire d'adhésion tombe aujourd'hui* ou un suivi *mensuel*.

Pour tout déclencheur, vous pouvez aussi définir :

- L'**étape de départ** sur laquelle la nouvelle carte arrive (par défaut, la première étape).
- **Une seule fois par personne** : pour que la même personne ne soit pas ajoutée deux fois au flux de travail par le déclencheur.
- **Actif** : activer ou désactiver le déclencheur sans le supprimer.

:::tip
Associez un déclencheur **Formulaire · Soumis** au modèle **Suivi des nouveaux visiteurs** pour transformer votre formulaire « Carte de contact » ou « Je suis nouveau » en un pipeline de suivi automatique.
:::

## Mes cartes {#my-cards}

Les bénévoles et le personnel n'ont pas besoin de fouiller chaque tableau pour trouver leur travail. La liste **Mes cartes** de la page **Mon travail** affiche toutes les cartes assignées à l'utilisateur actuel, tous flux de travail confondus. Pour y accéder, cliquez sur **Mes cartes** en haut de la page Flux de travail, ou ouvrez **Service > Mon travail** dans le menu Jump. Cliquer sur une carte ouvre le tableau auquel elle appartient.

## Rapports {#reports}

Ouvrez un flux de travail et cliquez sur **Rapports** pour voir les statistiques de ce flux :

- **En retard** : le nombre de cartes dont la date d'échéance est dépassée.
- **Cartes par étape** : le nombre de cartes actuellement présentes sur chaque étape, affiché sous forme de graphique en colonnes.
- **Terminées (30 jours)** : le débit des 30 derniers jours, affiché sous forme de graphique linéaire.

Utilisez-les pour repérer les goulots d'étranglement, par exemple une étape où les cartes s'accumulent sans jamais avancer.

## Articles connexes {#related-articles}

- [Tâches](./tasks.md) : les actions individuelles sur lesquelles reposent les cartes des flux de travail
- [Formulaires](../forms/index.md) : créez les formulaires pouvant déclencher des flux de travail
- [Groupes](../groups/index.md) : les groupes dans lesquels une action « Ajouter au groupe » peut placer des personnes
- [Rôles et permissions](../settings/roles-permissions.md) : contrôlez qui peut consulter, modifier et gérer les flux de travail
