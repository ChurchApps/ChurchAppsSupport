---
title: "Workflows"
---

# Workflows

<div class="article-intro">

Les workflows font progresser des personnes à travers une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui passe d'une étape à la suivante : du suivi d'un premier visiteur à un processus d'adhésion, en passant par le remerciement d'un premier donateur, et tout autre cas où vous devez suivre de nombreuses personnes à travers les mêmes étapes. Une étape peut demander à un bénévole de faire quelque chose (passer un appel, avoir une conversation) **et** exécuter elle-même des actions automatisées — envoyer un e-mail ou un SMS, attendre quelques jours, ajouter la personne à un groupe — si bien que les workflows prennent en charge à la fois le suivi humain et les tâches répétitives qui l'entourent. Les workflows étendent les [tâches](./tasks.md) en un tableau Kanban glisser-déposer afin que personne ne passe entre les mailles du filet.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes que vous souhaitez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [tâches](./tasks.md), car chaque carte d'un tableau est une tâche
- Pour utiliser l'action **Send email**, créez d'abord les modèles d'e-mail que vous souhaitez envoyer (gérés sous **Settings → Email Templates**)
- Pour utiliser l'action **Send text**, connectez d'abord un [fournisseur de SMS](../settings/church-settings.md#texting)
- Vous aurez besoin de l'autorisation Tasks appropriée. L'affichage, la modification des cartes et la gestion des workflows correspondent à des niveaux d'autorisation distincts (voir [Rôles et autorisations](../settings/roles-permissions.md))

</div>

## Afficher les workflows

Ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Serving**, puis cliquez sur **Workflows**. Vos workflows sont listés dans un tableau indiquant pour chacun sa **Category** et son **Status** (**Active** ou **Inactive**). Si vous utilisez des catégories, des onglets au-dessus de la liste permettent de la filtrer par catégorie. Cliquez sur un workflow pour ouvrir son tableau.

## Créer un workflow

1. Sur la page Workflows, cliquez sur **Add Workflow**.
2. Choisissez le mode de démarrage :
   - **Blank workflow** -- partez de zéro et construisez vos propres étapes.
   - **From a template** -- partez d'un ensemble d'étapes prêtes à l'emploi que vous pouvez modifier. Les modèles intégrés comprennent :
     - **New Visitor Follow-up** -- Envoyer un e-mail de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Membership Class** -- Exprimer son intérêt → S'inscrire au cours → Assister au cours → Devenir membre
     - **First-time Giver Thank-you** -- Envoyer une note de remerciement → Partager l'impact du don → Intendance
     - **Serving Assignment Confirmation** -- Envoyer la demande et attendre la réponse → Appeler le bénévole pour une demande sans réponse (voir [Confirmations des affectations de service](#serving-assignment-confirmations))

   La création des étapes d'un modèle peut prendre un moment. Pendant ce temps, le bouton **Add Workflow** affiche **Creating...** et ne peut pas être cliqué à nouveau, afin d'éviter tout doublon. Si quelque chose ne fonctionne pas, la page affiche *« Le workflow n'a pas pu être créé. Veuillez réessayer. »*
3. Donnez un **Name** au workflow.
4. Attribuez éventuellement une **Category** pour regrouper les workflows apparentés. Vous pouvez créer une nouvelle catégorie directement depuis la liste déroulante.
   Pour un workflow vierge, vous choisissez également sa **Workflow purpose** : **People follow-up** (le type habituel) ou **Serving assignment confirmation**. Cette finalité ne peut pas être modifiée une fois le workflow créé.
5. Laissez le workflow **Active** pour pouvoir y ajouter des personnes, ou passez-le en **Inactive** pour le masquer des listes d'ajout à un workflow.
6. Cliquez sur **Save**.

:::tip
Utilisez le bouton **Duplicate** de la liste des workflows pour copier un workflow existant — y compris ses étapes, ses actions automatisées et son routage — comme point de départ d'un nouveau workflow.
:::

## Construire le tableau avec des étapes

Chaque tableau de workflow est composé d'**étapes**, affichées sous forme de colonnes de gauche à droite. Ouvrez un workflow et utilisez **Add Step** pour créer chaque phase de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer :

- **Step Name** -- l'en-tête de colonne (par exemple « Appel de bienvenue » ou « En attente d'inscription »).
- **Due in (days)** -- définit automatiquement une échéance lorsqu'une carte entre dans cette étape. Les cartes dépassant leur échéance sont signalées comme **Overdue**.
- **Default assignee** -- la personne ou le groupe auquel les nouvelles cartes de cette étape sont automatiquement affectées. Lorsque l'assignataire par défaut est une personne, elle reçoit une notification indiquant qu'une carte lui a été attribuée.
- **Automated actions** -- ce que le système fait de lui-même lorsqu'une carte arrive (voir ci-dessous).
- **Routing** -- la destination de la carte lorsqu'elle quitte l'étape (voir [Routage](#routing-cards-with-outcomes-and-conditions)).

Faites glisser les colonnes d'étapes dans l'ordre qui correspond à votre processus. L'ordre définit également le chemin par défaut emprunté par une carte lorsqu'aucun autre routage ne s'applique.

:::info
Enregistrez d'abord la nouvelle étape. Les actions automatisées et le routage sont rattachés à l'étape ; l'éditeur ne débloque ces sections qu'une fois l'étape existante.
:::

## Actions automatisées

Chaque étape peut comporter une liste d'**actions automatisées** qui s'exécutent d'elles-mêmes au moment où une carte **entre** dans l'étape — avant que quiconque n'y touche. C'est ainsi qu'une étape à la fois sollicite un bénévole *et* prend en charge les tâches de routine qui entourent le suivi.

Dans l'éditeur d'étape, ouvrez **Automated actions**, cliquez sur **Add Action**, choisissez un type et renseignez ses paramètres. Ajoutez-en autant que nécessaire ; elles s'exécutent **de haut en bas, dans l'ordre**. Cliquez sur **Save** sur l'étape pour enregistrer l'étape et toutes ses actions ensemble. La suppression d'une action avec son icône de corbeille prend effet immédiatement.

| Action | Ce qu'elle fait |
|---|---|
| **Send email** | Envoie à la personne un modèle d'e-mail de votre choix. Vous pouvez remplacer l'objet. |
| **Send text** | Envoie à la personne un message que vous rédigez, via le [fournisseur de SMS](../settings/church-settings.md#texting) de votre église. |
| **Wait** | Met la carte en pause pendant un nombre de jours donné avant de poursuivre (voir ci-dessous). |
| **Add to group** | Ajoute la personne à un [groupe](../groups/index.md) que vous choisissez. |
| **Remove from group** | Retire la personne d'un groupe que vous choisissez. |
| **Record Attendance** | Marque la personne présente au créneau de service en cours d'un groupe (voir ci-dessous). |
| **Add to workflow** | Lance la personne sur un autre workflow — utile pour passer le relais entre des processus. |
| **Add note** | Enregistre une note dans l'historique de la carte. |
| **Set field** | Met à jour un champ de la fiche de la personne : Membership Status, Marital Status, Gender, City, State ou Zip. |
| **Webhook** | Envoie les détails de la carte à une adresse web externe (URL) que vous indiquez, pour la connexion à d'autres systèmes. |
| **Create task** | Crée une [tâche](./tasks.md) avec le titre et la description que vous saisissez, affectée à la personne de votre choix. |
| **Notify Person** | Envoie à un membre du personnel ou à un bénévole que vous choisissez un e-mail et une notification B1 concernant la carte (voir ci-dessous). |

Une fois toutes les actions d'une étape terminées, la carte **reste sur cette étape** afin qu'une personne puisse la traiter — sauf si l'étape comporte un routage automatique qui la fait avancer (voir [Étapes entièrement automatisées](#fully-automated-steps)).

:::info
Les actions automatisées ne s'exécutent que lorsqu'une carte arrive par le flux normal : lorsqu'elle est ajoutée pour la première fois, lorsqu'un résultat ou un routage automatique la fait entrer, ou après la fin d'une attente (Wait). Elles **ne** se réexécutent **pas** lorsqu'un membre du personnel fait glisser manuellement une carte sur l'étape ou la renvoie, afin qu'une personne ne reçoive pas deux fois le même e-mail.
:::

### Envoyer un e-mail

Choisissez **Send email**, sélectionnez l'un de vos modèles d'e-mail et, si vous le souhaitez, saisissez un objet personnalisé. Lorsqu'une carte entre dans l'étape, la personne reçoit automatiquement cet e-mail. (Si la personne n'a pas d'adresse e-mail enregistrée, l'étape ignore simplement cette action.) Les [champs de fusion](../settings/email-templates.md#merge-fields) du modèle, tels que `{{firstName}}`, sont remplacés par les informations propres à la personne.

Lorsque l'e-mail est envoyé, l'historique de la carte enregistre **Email sent**. S'il ne peut pas être envoyé — par exemple parce que l'adresse e-mail de votre église n'est pas encore approuvée ou que la limite quotidienne a été atteinte — aucune entrée « Email sent » n'est ajoutée.

:::info
Les e-mails de workflow ne sont envoyés qu'après que votre église a été approuvée pour envoyer des e-mails de groupe, et ils comptent dans la limite quotidienne d'e-mails de votre église. Consultez [Activer l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). L'action **Send email** vous avertit dans l'éditeur d'étape lorsque ces e-mails ne seront pas envoyés : *« L'e-mail de votre église n'a pas encore été approuvé... »* si l'approbation est en attente, ou *« L'e-mail de votre église est suspendu... »* si des messages récents ont fait l'objet de rebonds ou ont été signalés comme spam.
:::

### Enregistrer une présence

Choisissez **Record Attendance**, puis cliquez sur **Pick group** pour choisir le groupe dont la présence doit être enregistrée. Lorsque l'action s'exécute, la personne est marquée présente au créneau de service en cours de ce groupe, exactement comme si elle s'était enregistrée à l'accueil. C'est utile avec un déclencheur qui ajoute les personnes au workflow à mesure qu'elles arrivent, afin qu'elles soient comptées sans enregistrement séparé.

- La présence est mesurée au moment où la carte a été **créée**, si bien qu'une étape **Wait** située plus tôt dans le workflow ne la repoussera pas au-delà du service.
- Seuls les créneaux de service disposant d'un jour et d'une heure de début sont pris en compte. Si aucun créneau du groupe n'est en cours à ce moment-là, rien n'est enregistré et l'historique de la carte indique **No scheduled service in progress — attendance not recorded**.
- Lorsque la présence est enregistrée, l'historique de la carte affiche **Attendance recorded** suivi du nom du groupe. Relancer l'action pour le même service ne compte pas la personne une seconde fois.

### Notifier une personne

Choisissez **Notify Person**, cliquez sur **Pick person** et, si vous le souhaitez, saisissez un **Message**. Lorsqu'une carte entre dans l'étape, cette personne reçoit un e-mail et une notification B1 contenant le nom de la personne figurant sur la carte, les noms du workflow et de l'étape, votre message et un lien pour ouvrir la carte. Utilisez cette option pour prévenir un membre du personnel ou un responsable de ministère — par exemple, *« Prévenir le pasteur lorsqu'une personne atteint l'étape Entretien d'adhésion. »* L'historique de la carte enregistre **Notified** suivi du nom de la personne.

### Envoyer un SMS

Choisissez **Send Text** et saisissez le **Text message** (jusqu'à 1 600 caractères). Lorsqu'une carte entre dans l'étape, la personne reçoit ce SMS sur son téléphone mobile. Vous pouvez personnaliser le message avec `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}`, remplacés par les informations de la personne au moment de l'envoi du SMS.

- Si la personne n'a pas de téléphone mobile enregistré, aucun SMS n'est envoyé et l'historique de la carte indique **Text skipped: no mobile phone**.
- Si la personne s'est désabonnée, aucun SMS n'est envoyé et l'historique de la carte indique **Text skipped: opted out**.
- Lorsque le SMS est envoyé, l'historique de la carte enregistre **Text sent**. Si l'envoi échoue — par exemple parce qu'aucun fournisseur de SMS n'est connecté ou que votre église n'a plus de crédits SMS — l'échec est consigné dans l'historique de la carte et les autres actions de l'étape s'exécutent tout de même.

:::warning
Les SMS sont envoyés par le fournisseur de SMS propre à votre église ([fournisseur de SMS](../settings/church-settings.md#texting)). Si aucun fournisseur n'est connecté, l'éditeur d'action affiche *« Aucun fournisseur de SMS n'est configuré »* et les SMS ne seront pas envoyés.
:::

### Attendre quelques jours (séquences de relance)

L'action **Wait** maintient une carte pendant le nombre de jours que vous avez défini. Pendant l'attente, la carte apparaît comme **Snoozed**. B1 vérifie les attentes terminées toutes les 30 minutes : une carte reprend donc son cheminement dans la demi-heure qui suit la fin de son attente. Une fois l'attente terminée :

1. Les **actions restantes de la même étape** s'exécutent — vous pouvez ainsi construire une séquence de relance du type **Send email → Wait 3 days → Send a reminder email**.
2. Ensuite, si l'étape comporte un routage automatique, la carte avance ; sinon, elle reste sur l'étape pour qu'une personne la prenne en charge.

:::tip
Un **Wait** placé au tout début d'une étape est un moyen simple de « retenir » une carte avant qu'elle n'apparaisse à un bénévole — par exemple, *Attendre 7 jours, puis un coach prend contact*.
:::

## Ajouter des personnes comme cartes

Il existe plusieurs façons de placer des personnes sur un tableau :

- **Depuis le tableau** -- Cliquez sur **Add Card** en bas d'une colonne d'étape et choisissez une personne. Vous pouvez aussi choisir un groupe ; chaque membre de ce groupe est alors ajouté comme carte.
- **Depuis la fiche d'une personne** -- Utilisez **Add to Workflow** sur la page d'une personne pour l'ajouter à un workflow.
- **Depuis la recherche de personnes** -- Sélectionnez plusieurs personnes et utilisez l'action groupée **Add to Workflow** pour les ajouter toutes en une fois.
- **Automatiquement avec un déclencheur** -- Ajoutez des personnes lorsqu'un événement se produit, comme la soumission d'un formulaire ou un premier don (voir [Déclencheurs](#triggers) ci-dessous).

## Travailler sur le tableau

Ouvrez un workflow pour voir son tableau. Chaque carte affiche le nom de la personne, son assignataire, ainsi qu'une étiquette d'échéance ou de statut (**Overdue** ou **Snoozed**). Une colonne d'étape affiche également de petits badges pour les actions automatisées qu'elle exécute et des annotations pour son routage, ce qui vous donne une vue d'ensemble du cheminement des cartes.

- **Déplacer une carte** -- Faites glisser une carte d'une colonne à la suivante au fur et à mesure de l'avancement de la personne.
- **Ouvrir une carte** -- Double-cliquez sur une carte (ou cliquez dessus) pour ouvrir son tiroir de détails, où vous pouvez changer d'étape, la réaffecter, ajouter des notes et consulter ce qui s'est déjà passé.

Depuis le tiroir de la carte, vous pouvez :

- **Assign** la carte à une autre personne ou un autre groupe.
- **Snooze** la carte pendant 1 jour, 3 jours ou 1 semaine pour masquer temporairement son échéance.
- **Send Back** la carte à l'étape précédente ou **Skip** vers l'étape suivante.
- **Pin assignment** -- conserver le même responsable sur la carte même lorsqu'elle change d'étape. Par défaut, déplacer une carte vers une nouvelle étape la réaffecte à l'assignataire par défaut de cette étape ; l'épingler conserve la personne actuelle comme responsable tout au long du parcours.
- **Complete** la carte pour la terminer, ou choisir un bouton **Outcome** si l'étape dispose de résultats configurés (voir [Routage](#routing-cards-with-outcomes-and-conditions)).
- **Add notes** et consulter l'**Activity** de la carte -- un journal des actions automatisées exécutées (e-mails envoyés, attentes, etc.), chacune avec la date et l'heure à laquelle elle a eu lieu.

Pour une carte concernant une personne, le tiroir affiche également son téléphone mobile et son e-mail sous forme de liens sur lesquels vous pouvez cliquer pour l'appeler ou lui écrire, ainsi qu'un lien **View profile** si vous êtes autorisé à consulter les personnes. La personne à qui la carte est affectée voit le téléphone et l'e-mail même sans accès à People.

Les notes sont enregistrées avec la carte. Toute personne pouvant ouvrir la carte — y compris la personne ou le groupe auquel elle est affectée — peut lire les notes et en ajouter. Les personnes qui ne peuvent pas ouvrir la carte ne voient pas ses notes.

### Actions groupées

Cochez les cases de plusieurs cartes pour agir sur elles ensemble. Pour sélectionner toutes les cartes d'une étape d'un coup, cochez la case **Select all** dans l'en-tête de la colonne de cette étape ; cochez-la à nouveau pour tout désélectionner. Une barre d'outils apparaît et vous permet de **Complete**, **Snooze**, **Assign** (réaffecter) ou **Move to…** une autre étape pour toutes les cartes sélectionnées en une seule fois.

## Router les cartes avec des résultats et des conditions

Le routage détermine où va une carte lorsqu'elle quitte une étape. Ouvrez l'éditeur d'une étape pour configurer deux types de routage.

### Boutons de résultat

Les résultats sont des boutons affichés dans le tiroir de la carte lorsque vous terminez une carte sur cette étape. Au lieu d'un unique bouton **Complete**, vous pouvez proposer des choix tels que « A rejoint un groupe » ou « Pas intéressé ». Chaque résultat peut :

- Envoyer la carte vers **une autre étape** de ce workflow,
- **Transférer la carte** vers un workflow différent, ou
- **Fermer** la carte.

Cela permet à une seule décision d'orienter la personne vers différents parcours.

### Routage automatique (conditionnel)

Les routages automatiques font avancer une carte **dès son entrée dans une étape** (et après la fin de ses actions automatisées), sans que personne n'ait à cliquer, si la personne remplit un ensemble de conditions. Ajoutez un routage, choisissez l'étape cible et définissez une ou plusieurs **conditions** (par exemple, le campus, l'âge ou le statut d'adhésion d'une personne). Les champs texte peuvent être comparés exactement ou avec **contains**, **starts with** ou **ends with**. Un routage sans condition correspond à tout le monde.

Les conditions de date (Today's Date, Birth Date ou Anniversary) peuvent comparer la date complète ou seulement une partie — le jour de la semaine, le **Day of Month**, le **Month** ou le nombre d'années écoulées. Pour la date de naissance ou l'anniversaire d'une personne, **Day of Month** propose une option relative **Today**, si bien qu'une condition telle que *Birth Date · Day of Month = Today* correspond aux personnes dont l'anniversaire tombe aujourd'hui. **Month** propose **Previous Month**, **Current Month** et **Next Month**. Les valeurs relatives de ce type sont calculées selon le fuseau horaire de votre église, afin qu'elles correspondent au jour du calendrier de votre église et non à celui du serveur.

Si les conditions d'un routage ne peuvent pas être vérifiées pour une raison quelconque, ce routage est considéré comme non applicable. La carte reste sur l'étape (ou suit un autre routage qui correspond), au lieu de rester bloquée.

:::info
Sur le tableau, chaque colonne d'étape affiche de petites annotations décrivant son routage — par exemple un libellé de résultat ou « if matches » suivi d'une flèche vers l'étape ou le workflow de destination.
:::

## Étapes entièrement automatisées

Vous pouvez faire fonctionner une étape entièrement seule, sans que personne ne s'en occupe. Donnez-lui ses **actions automatisées** et ajoutez un **routage automatique** (sans condition) pointant vers l'étape suivante. Lorsqu'une carte entre, les actions s'exécutent, puis le routage la fait avancer immédiatement : la carte traverse l'étape sans s'arrêter.

:::tip
Combinez cela avec **Wait** : *Envoyer l'e-mail de bienvenue → Attendre 3 jours → passer automatiquement à l'étape « Appel personnel ».* L'e-mail et le timing sont gérés pour vous, et un bénévole ne voit la carte que lorsqu'il est temps de faire le contact humain.
:::

## Déclencheurs

Les déclencheurs ajoutent automatiquement des personnes à un workflow lorsqu'un événement se produit, si bien que vous n'avez jamais à ajouter les cartes à la main. Sur le tableau d'un workflow, cliquez sur l'onglet **Triggers**, puis sur **Add Trigger**. Il existe deux types :

### Déclencheurs d'événement

Ils se déclenchent dès qu'un enregistrement change dans B1. Choisissez l'événement, puis ajoutez éventuellement des **conditions** afin que seules les personnes correspondantes soient ajoutées :

- **Person · Created / Updated** -- par exemple, ajouter toute personne dont le statut devient *Visitor* ou *Guest* (le statut attribué aux personnes qui s'inscrivent elles-mêmes).
- **Donation · Created** -- par exemple, ajouter un premier don ou un don important à un workflow de remerciement (selon le montant, le fonds ou le mode de paiement).
- **Group · Member Joined** / **Group · Created**.
- **Form · Submitted** -- ajoute toute personne qui soumet un formulaire choisi (idéal pour une carte « Je suis nouveau » ou « Connect »).

### Déclencheurs planifiés

Ils s'exécutent de façon récurrente — quotidiennement, chaque semaine, chaque mois ou chaque année — selon un ensemble de conditions. Utilisez-les pour des contacts liés au temps, comme *toutes les personnes dont c'est l'anniversaire aujourd'hui* (Birth Date · Day of Month = **Today**, avec le mois réglé sur **Current Month**) ou un suivi *mensuel*. Même sans **Only once per person**, un déclencheur planifié n'ajoute pas à nouveau la même personne au cours d'une même période de répétition (un jour, une semaine, un mois ou une année, selon sa fréquence d'exécution).

Pour tout déclencheur, vous pouvez également définir :

- La **Starting step** sur laquelle atterrit la nouvelle carte (par défaut, la première étape).
- **Only once per person** -- pour que la même personne ne soit pas ajoutée deux fois au workflow par le déclencheur. Lorsque cette option est activée, les personnes qui ont déjà une carte sur ce workflow sont ignorées.
  - **Add again after their card is closed** -- apparaît lorsque **Only once per person** est activé. Cochez-la pour permettre au déclencheur de rajouter une personne une fois sa carte précédente sur ce workflow fermée. Une personne n'aura jamais deux cartes ouvertes simultanément sur le workflow. Utilisez cette option pour des événements pouvant se produire plusieurs fois, comme un visiteur de retour ou un processus annuel.
- **Active** -- activer ou désactiver le déclencheur sans le supprimer.

:::tip
Associez un déclencheur **Form · Submitted** au modèle **New Visitor Follow-up** pour transformer votre formulaire « Connect Card » ou « Je suis nouveau » en un parcours de suivi automatique.
:::

## Confirmations des affectations de service

Un type particulier de workflow peut assurer le suivi des [demandes de service](./plans.md#assigning-team-members) jusqu'à ce que chaque bénévole accepte ou refuse. Au lieu de personnes, chaque carte de ce tableau suit **une affectation** — une personne sur un poste donné dans un plan donné. Deux rôles ou deux services pour une même personne donnent lieu à des cartes distinctes. Cette option est facultative : rien ne change pour un plan tant que vous n'avez pas sélectionné un workflow de confirmation dans ses paramètres.

### Mettre en place un workflow

1. Sur la page Workflows, cliquez sur **Add Workflow** et choisissez le modèle **Serving Assignment Confirmation**. (Ou partez d'un **Blank workflow** et définissez sa **Workflow purpose** sur **Serving assignment confirmation**.) La création à partir du modèle nécessite l'autorisation d'envoyer des SMS, puisqu'il comprend une étape de SMS.
2. Vérifiez les étapes. Le modèle comprend :
   - **Request and wait for response** -- envoie la demande de service par e-mail et par SMS, attend 2 jours, envoie un e-mail de rappel, attend 1 jour supplémentaire, puis fait avancer la carte automatiquement.
   - **Call volunteer about unanswered request** -- une étape pour qu'une personne appelle le bénévole, avec une échéance à 1 jour. Définissez un **Default assignee** sur cette étape. Si aucun n'est défini, la carte revient au responsable du ministère ou à l'équipe du ministère s'il n'y en a pas.
3. Modifiez les délais d'attente, les messages et les étapes selon les besoins de votre église.
4. Ouvrez les [paramètres d'un plan](./plans.md#plan-settings) et choisissez ce workflow sous **Confirmation workflow**.

Ces workflows utilisent une action **Send serving request** au lieu de **Send email** et **Send text**. Choisissez **Email** ou **Text message** et, si vous le souhaitez, rédigez un **Request message**. La demande comprend toujours le poste, le plan, la date du service et un lien pour répondre ; vous pouvez utiliser `{{planName}}`, `{{positionName}}` et `{{serviceDate}}` dans votre message. Laissez le message vide pour utiliser la demande par défaut. Les préférences de notification des bénévoles, leur consentement aux SMS, votre fournisseur de SMS et l'approbation de l'e-mail de votre église s'appliquent tous, et toute tentative ignorée ou bloquée est consignée sur la carte. **Send email**, **Send text** et **Add to workflow** ne sont pas disponibles sur ces tableaux.

L'onglet **Triggers** d'un workflow de confirmation explique comment les cartes sont lancées au lieu de proposer des déclencheurs, et ces workflows n'apparaissent pas dans les listes **Add to Workflow** des personnes.

### Comment les cartes sont lancées et fermées

- Les cartes sont créées lorsque vous cliquez sur **Notify** pour les bénévoles d'un plan publié (voir [Notifier les bénévoles](./plan-validation.md#notifying-volunteers)). Chaque nouvelle affectation sans réponse reçoit une seule carte. Enregistrer, publier, copier ou remplir automatiquement un plan ne contacte personne par lui-même, et les plans en mode « crayon » n'envoient rien.
- Les bénévoles reçoivent toujours l'alerte habituelle dans l'application. Le suivi par e-mail et par SMS est assuré par le workflow.
- Lorsque le bénévole **accepte ou refuse**, sa carte se ferme automatiquement, ainsi que les tâches de suivi qui lui sont liées.
- Le tiroir de la carte affiche le poste, la date du service et un lien vers le plan. À la place de **Complete**, le bouton indique **Record follow-up done**. Un clic enregistre qu'un suivi a été effectué, mais la carte reste ouverte et affectée (affichée comme **Awaiting response**) jusqu'à ce que le bénévole réponde ou que la date limite de réponse soit dépassée.
- La date limite de réponse correspond à la fin du dernier créneau de service auquel l'équipe du poste participe. Si le plan ne comporte aucun créneau correspondant, elle correspond à la fin de la journée de service. Si personne n'a répondu à ce moment-là, la carte se ferme avec **Response deadline passed** et une tâche **Review unanswered serving request** est transmise au responsable actuel de la carte ou au responsable du ministère afin que quelqu'un décide comment couvrir le poste. L'affectation reste **Unconfirmed**.
- Supprimer l'affectation, modifier sa personne, son poste ou la date du plan, repasser le plan en mode « crayon » ou changer le plan pour un autre workflow de confirmation ferme la carte. Une carte fermée n'est jamais rouverte par un autre **Notify** ; ajoutez une nouvelle affectation pour envoyer une nouvelle demande.

:::info
Pour les demandes envoyées via un workflow de confirmation, les [rappels aux bénévoles](./plans.md#volunteer-reminders) ne sont envoyés qu'aux bénévoles qui ont **accepté**, afin que les personnes qui attendent de répondre ne reçoivent pas de rappels en plus des relances du workflow.
:::

## Mes cartes

Les bénévoles et le personnel n'ont pas besoin de parcourir chaque tableau pour trouver leur travail. La liste **My Cards** de la page **My Work** affiche toutes les cartes affectées à l'utilisateur actuel, tous workflows confondus. Pour y accéder, cliquez sur **My Cards** en haut de la page Workflows, ou ouvrez **Serving > My Work** dans le menu Jump. Cliquer sur une carte ouvre le tableau auquel elle appartient.

## Rapports

Ouvrez un workflow et cliquez sur **Reports** pour voir les statistiques de ce workflow :

- **Overdue** -- le nombre de cartes dont l'échéance est dépassée.
- **Cards per Step** -- le nombre de cartes actuellement présentes sur chaque étape, affiché sous forme de graphique en colonnes.
- **Completed (30 days)** -- le débit sur les 30 derniers jours, affiché sous forme de graphique en courbe.

Utilisez-les pour repérer les goulets d'étranglement, par exemple une étape où les cartes s'accumulent sans jamais avancer.

## Articles connexes

- [Tâches](./tasks.md) -- les actions individuelles sur lesquelles reposent les cartes de workflow
- [Formulaires](../forms/index.md) -- créez les formulaires qui peuvent déclencher des workflows
- [Groupes](../groups/index.md) -- les groupes dans lesquels une action « Add to group » peut placer des personnes
- [Plans de service](./plans.md) -- choisissez un workflow de confirmation pour les demandes de service d'un plan
- [Rôles et autorisations](../settings/roles-permissions.md) -- contrôlez qui peut consulter, modifier et gérer les workflows
