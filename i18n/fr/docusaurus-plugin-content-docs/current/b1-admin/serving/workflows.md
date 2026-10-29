---
title: "Flux de travail"
---

# Flux de travail

<div class="article-intro">

Les flux de travail font passer les personnes par une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui se déplace d'une étape à la suivante -- du suivi d'un visiteur de première fois, à un processus d'adhésion, jusqu'au remerciement d'un premier donateur, et à toute autre situation où vous devez suivre de nombreuses personnes à travers les mêmes étapes. Une étape peut demander à un bénévole de faire quelque chose (passer un appel, avoir une conversation) **et** exécuter des actions automatisées de son propre chef -- envoyer un e-mail ou un texto, attendre quelques jours, ajouter la personne à un groupe -- de sorte que les flux de travail prennent en charge à la fois le suivi humain et les tâches répétitives qui l'entourent. Les flux de travail étendent les [Tâches](./tasks.md) à un tableau Kanban glisser-déposer afin que personne ne passe entre les mailles du filet.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes que vous voulez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [Tâches](./tasks.md), puisque chaque carte d'un tableau est une tâche
- Pour utiliser l'action **Envoyer un e-mail**, créez d'abord les modèles d'e-mail que vous souhaitez envoyer (gérés sous **Paramètres → Modèles d'e-mail**)
- Pour utiliser l'action **Envoyer un texto**, connectez d'abord un [fournisseur de messagerie texte](../settings/church-settings.md#texting)
- Vous aurez besoin de l'autorisation Tâches appropriée. Consulter, modifier les cartes et gérer les flux de travail sont des niveaux d'autorisation distincts (voir [Rôles et autorisations](../settings/roles-permissions.md))

</div>

## Consulter les flux de travail

Ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Service**, puis cliquez sur **Flux de travail**. Vos flux de travail sont listés dans un tableau affichant la **Catégorie** et le **Statut** (**Actif** ou **Inactif**) de chacun. Si vous utilisez des catégories, des onglets au-dessus de la liste vous permettent de la filtrer par catégorie. Cliquez sur un flux de travail pour ouvrir son tableau.

## Créer un flux de travail

1. Sur la page Flux de travail, cliquez sur **Ajouter un flux de travail**.
2. Choisissez comment commencer :
   - **Flux de travail vierge** -- partez de zéro et construisez vos propres étapes.
   - **À partir d'un modèle** -- partez d'un ensemble d'étapes prêtes à l'emploi que vous pouvez modifier. Les modèles intégrés comprennent :
     - **Suivi d'un nouveau visiteur** -- Envoyer un e-mail de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Cours d'adhésion** -- Exprimer son intérêt → S'inscrire au cours → Assister au cours → Terminer l'adhésion
     - **Remerciement au premier donateur** -- Envoyer une note de remerciement → Partager l'impact du don → Intendance
     - **Confirmation d'affectation de service** -- Demander et attendre la réponse → Appeler le bénévole au sujet d'une demande sans réponse (voir [Confirmations d'affectation de service](#serving-assignment-confirmations))

   La création des étapes d'un modèle peut prendre un moment. Pendant ce temps, le bouton **Ajouter un flux de travail** affiche **Création...** et ne peut pas être cliqué à nouveau, de sorte que vous n'obtiendrez pas de doublon. Si quelque chose ne fonctionne pas, la page affiche *« Le flux de travail n'a pas pu être créé. Veuillez réessayer. »*
3. Donnez un **nom** au flux de travail.
4. Attribuez facultativement une **catégorie** pour regrouper des flux de travail apparentés. Vous pouvez créer une nouvelle catégorie directement depuis la liste déroulante.
   Pour un flux de travail vierge, vous choisissez aussi sa **Finalité du flux de travail** : **Suivi des personnes** (le type habituel) ou **Confirmation d'affectation de service**. La finalité ne peut pas être modifiée après la création du flux de travail.
5. Laissez le flux de travail **Actif** pour que des personnes puissent y être ajoutées, ou réglez-le sur **Inactif** pour le masquer des listes d'ajout à un flux de travail.
6. Cliquez sur **Enregistrer**.

:::tip
Utilisez le bouton **Dupliquer** de la liste des flux de travail pour copier un flux de travail existant -- y compris ses étapes, ses actions automatisées et son acheminement -- comme point de départ d'un nouveau.
:::

## Construire le tableau avec des étapes

Chaque tableau de flux de travail est composé d'**étapes**, présentées comme des colonnes de gauche à droite. Ouvrez un flux de travail et utilisez **Ajouter une étape** pour créer chaque phase de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer :

- **Nom de l'étape** -- l'intitulé de la colonne (par exemple « Appel de bienvenue » ou « En attente d'inscription »).
- **Échéance dans (jours)** -- définit automatiquement une date d'échéance lorsqu'une carte entre dans cette étape. Les cartes qui dépassent leur date d'échéance sont signalées comme **En retard**.
- **Responsable par défaut** -- la personne ou le groupe auquel les nouvelles cartes de cette étape sont automatiquement assignées. Lorsque le responsable par défaut est une personne, elle reçoit une notification indiquant qu'une carte lui a été assignée.
- **Actions automatisées** -- ce que le système fait de lui-même lorsqu'une carte arrive (voir ci-dessous).
- **Acheminement** -- où la carte va lorsqu'elle quitte l'étape (voir [Acheminement](#routing-cards-with-outcomes-and-conditions)).

Faites glisser les colonnes d'étapes pour les placer dans l'ordre de votre processus. L'ordre définit aussi le chemin par défaut qu'emprunte une carte lorsqu'aucun autre acheminement ne s'applique.

:::info
Enregistrez d'abord une nouvelle étape. Les actions automatisées et l'acheminement sont rattachés à l'étape ; l'éditeur ne débloque donc ces sections qu'une fois l'étape créée.
:::

## Actions automatisées

Chaque étape peut comporter une liste d'**actions automatisées** qui s'exécutent d'elles-mêmes au moment où une carte **entre** dans l'étape -- avant que quiconque n'y touche. C'est ainsi qu'une étape à la fois incite un bénévole à agir *et* prend en charge le travail routinier autour du suivi.

Dans l'éditeur d'étape, ouvrez **Actions automatisées**, cliquez sur **Ajouter une action**, choisissez un type et remplissez ses paramètres. Ajoutez-en autant que nécessaire ; elles s'exécutent **de haut en bas, dans l'ordre**. Cliquez sur **Enregistrer** sur l'étape pour sauvegarder l'étape et toutes ses actions ensemble. Retirer une action avec son icône de corbeille prend effet immédiatement.

| Action | Ce qu'elle fait |
|---|---|
| **Envoyer un e-mail** | Envoie à la personne un modèle d'e-mail de votre choix. Vous pouvez remplacer l'objet. |
| **Envoyer un texto** | Envoie à la personne un message que vous rédigez, par l'intermédiaire du [fournisseur de messagerie texte](../settings/church-settings.md#texting) de votre église. |
| **Attendre** | Met la carte en pause pendant un nombre de jours avant de continuer (voir ci-dessous). |
| **Ajouter au groupe** | Ajoute la personne à un [groupe](../groups/index.md) que vous choisissez. |
| **Retirer du groupe** | Retire la personne d'un groupe que vous choisissez. |
| **Enregistrer la présence** | Marque la personne présente à l'horaire de service d'un groupe qui est en cours (voir ci-dessous). |
| **Ajouter à un flux de travail** | Démarre la personne sur un autre flux de travail -- utile pour passer d'un processus à l'autre. |
| **Ajouter une note** | Consigne une note dans l'historique de la carte. |
| **Définir un champ** | Met à jour un champ de la fiche de la personne : Statut de membre, État civil, Sexe, Ville, Province ou Code postal. |
| **Webhook** | Envoie les détails de la carte à une adresse web externe (URL) que vous fournissez, pour la connexion à d'autres systèmes. |
| **Créer une tâche** | Crée une [tâche](./tasks.md) avec le titre et la description que vous saisissez, assignée à la personne de votre choix. |
| **Notifier une personne** | Envoie à un membre du personnel ou à un bénévole que vous choisissez un e-mail et une notification B1 au sujet de la carte (voir ci-dessous). |

Une fois que toutes les actions d'une étape sont terminées, la carte **reste sur cette étape** afin qu'une personne puisse la traiter -- à moins que l'étape n'ait un acheminement automatique qui la fait avancer (voir [Étapes entièrement automatisées](#fully-automated-steps)).

:::info
Les actions automatisées ne s'exécutent que lorsqu'une carte arrive par le flux normal -- lorsqu'elle est ajoutée pour la première fois, lorsqu'un résultat ou un acheminement automatique la fait entrer, ou après la fin d'une attente. Elles **ne** se réexécutent **pas** lorsqu'un membre du personnel fait glisser manuellement une carte sur l'étape ou la renvoie, afin qu'une personne ne reçoive pas deux fois le même e-mail.
:::

### Envoyer un e-mail

Choisissez **Envoyer un e-mail**, sélectionnez l'un de vos modèles d'e-mail et, si vous le souhaitez, saisissez un objet personnalisé. Lorsqu'une carte entre dans l'étape, la personne reçoit cet e-mail automatiquement. (Si la personne n'a pas d'adresse e-mail enregistrée, l'étape ignore simplement cette action.) Les [champs de fusion](../settings/email-templates.md#merge-fields) du modèle, comme `{{firstName}}`, sont remplacés par les renseignements propres à la personne.

Lorsque l'e-mail part, l'historique de la carte enregistre **E-mail envoyé**. S'il ne peut pas être envoyé -- par exemple parce que l'e-mail de votre église n'est pas encore approuvé ou que la limite quotidienne a été atteinte -- aucune entrée « E-mail envoyé » n'est ajoutée.

:::info
Les e-mails de flux de travail ne sont envoyés qu'après que votre église a été approuvée pour envoyer des e-mails de groupe, et ils comptent dans la limite quotidienne d'e-mails de votre église. Consultez [Activer l'e-mail de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). L'action **Envoyer un e-mail** vous avertit dans l'éditeur d'étape lorsque ces e-mails ne seront pas envoyés : *« L'e-mail de votre église n'a pas encore été approuvé... »* si l'approbation est toujours en attente, ou *« L'e-mail de votre église est suspendu... »* si des messages récents ont été rejetés ou signalés comme pourriel.
:::

### Enregistrer la présence

Choisissez **Enregistrer la présence** et cliquez sur **Choisir le groupe** pour sélectionner le groupe dont la présence doit être enregistrée. Lorsque l'action s'exécute, la personne est marquée présente à l'horaire de service de ce groupe qui est en cours -- exactement comme si elle s'était enregistrée. C'est utile avec un déclencheur qui ajoute des personnes au flux de travail à mesure qu'elles arrivent, afin qu'elles soient comptées sans enregistrement séparé.

- La présence est mesurée au moment où la carte a été **créée**, de sorte qu'une **Attente** placée plus tôt dans le flux de travail ne la fera pas dépasser le service.
- Seuls les horaires de service ayant un jour et une heure de début sont pris en compte. Si aucun des horaires de service du groupe n'est en cours à ce moment-là, rien n'est enregistré et l'historique de la carte indique **Aucun service planifié en cours -- présence non enregistrée**.
- Lorsque la présence est enregistrée, l'historique de la carte affiche **Présence enregistrée** suivi du nom du groupe. Relancer l'action pour le même service ne compte pas la personne deux fois.

### Notifier une personne

Choisissez **Notifier une personne**, cliquez sur **Choisir une personne** et, si vous le souhaitez, saisissez un **Message**. Lorsqu'une carte entre dans l'étape, cette personne reçoit un e-mail et une notification B1 contenant le nom de la personne sur la carte, les noms du flux de travail et de l'étape, votre message et un lien pour ouvrir la carte. Utilisez-la pour prévenir un membre du personnel ou un responsable de ministère -- par exemple *« Avise le pasteur lorsqu'une personne atteint l'étape Entrevue d'adhésion. »* L'historique de la carte enregistre **Notifié** suivi du nom de la personne.

### Envoyer un texto {#sending-a-text}

Choisissez **Envoyer un texto** et saisissez le **Message texte** (jusqu'à 1 600 caractères). Lorsqu'une carte entre dans l'étape, la personne reçoit ce texto sur son téléphone mobile. Pour personnaliser le message, cliquez sur une puce sous la zone de message -- **Prénom**, **Nom**, **Nom d'affichage** ou **Nom de l'église** -- pour insérer `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}` à l'emplacement de votre curseur. Chacun est remplacé par les renseignements de la personne au moment de l'envoi du texto.

- Si la personne n'a pas de téléphone mobile enregistré, aucun texto n'est envoyé et l'historique de la carte affiche **Texto ignoré : aucun téléphone mobile**.
- Si la personne s'est désabonnée, aucun texto n'est envoyé et l'historique de la carte affiche **Texto ignoré : désabonné**.
- Lorsque le texto part, l'historique de la carte affiche **Texto envoyé**. Si l'envoi échoue -- par exemple parce qu'aucun fournisseur de messagerie texte n'est connecté ou que votre église n'a plus de crédits de messagerie -- l'échec est consigné dans l'historique de la carte, et les autres actions de l'étape s'exécutent tout de même.

:::warning
Les textos sont envoyés par le [fournisseur de messagerie texte](../settings/church-settings.md#texting) propre à votre église. Si aucun fournisseur n'est connecté, l'éditeur d'action affiche *« Aucun fournisseur de messagerie texte n'est configuré »* et les textos ne seront pas envoyés.
:::

### Attendre quelques jours (séquences d'envoi)

L'action **Attendre** met une carte en pause pendant le nombre de jours que vous définissez. Pendant l'attente, la carte s'affiche comme **Mise en veille**. B1 vérifie les attentes terminées toutes les 30 minutes ; une carte reprend donc dans la demi-heure qui suit la fin de son attente. Une fois l'attente terminée :

1. Toutes les **autres actions de la même étape** s'exécutent -- vous pouvez ainsi construire une séquence d'envoi comme **Envoyer un e-mail → Attendre 3 jours → Envoyer un e-mail de rappel**.
2. Ensuite, si l'étape a un acheminement automatique, la carte poursuit son chemin ; sinon, elle reste sur l'étape pour qu'une personne la prenne en charge.

:::tip
Une **Attente** au tout début d'une étape est une façon simple de « retenir » une carte avant qu'elle ne soit présentée à un bénévole -- par exemple *Attendre 7 jours, puis un coach prend contact*.
:::

## Ajouter des personnes comme cartes

Il existe plusieurs façons de placer des personnes sur un tableau :

- **Depuis le tableau** -- Cliquez sur **Ajouter une carte** au bas d'une colonne d'étape et choisissez une personne. Vous pouvez aussi choisir un groupe, et chaque membre de ce groupe est ajouté comme carte.
- **Depuis la fiche d'une personne** -- Utilisez **Ajouter à un flux de travail** sur la page d'une personne pour l'inscrire à un flux de travail.
- **Depuis la recherche de personnes** -- Sélectionnez plusieurs personnes et utilisez l'action en lot **Ajouter à un flux de travail** pour toutes les ajouter en une fois.
- **Automatiquement avec un déclencheur** -- Ajoutez des personnes lorsqu'un événement se produit, comme une soumission de formulaire ou un premier don (voir [Déclencheurs](#triggers) ci-dessous).

Ajouter quelqu'un à la main, ou avec une action d'étape **Ajouter à un flux de travail**, ne lui donne jamais une deuxième carte ouverte sur le même flux de travail. Si la personne a déjà une carte ouverte, elle est ignorée (lors d'un ajout en lot, seules les personnes sans carte reçoivent une nouvelle carte). Une fois sa carte fermée, vous pouvez à nouveau l'ajouter. Les déclencheurs suivent plutôt leur propre paramètre **Une seule fois par personne**.

## Travailler sur le tableau

Ouvrez un flux de travail pour voir son tableau. Chaque carte affiche le nom de la personne, la personne à qui elle est assignée, et une pastille d'échéance ou de statut (**En retard** ou **Mise en veille**). Une colonne d'étape affiche aussi de petits badges pour toutes les actions automatisées qu'elle exécute, et des annotations pour son acheminement, ce qui vous donne une carte d'un coup d'œil de la façon dont les cartes circulent.

- **Déplacer une carte** -- Faites glisser une carte d'une colonne à la suivante à mesure que la personne progresse.
- **Ouvrir une carte** -- Double-cliquez sur une carte (ou cliquez dessus) pour ouvrir son tiroir de détails, où vous pouvez changer l'étape, la réassigner, ajouter des notes et consulter ce qui s'est déjà passé.

Depuis le tiroir de la carte, vous pouvez :

- **Assigner** la carte à une autre personne ou à un autre groupe.
- **Mettre en veille** la carte pendant 1 jour, 3 jours ou 1 semaine pour masquer temporairement son échéance.
- **Renvoyer** à l'étape précédente ou **Passer** à l'étape suivante.
- **Épingler l'assignation** -- conserver le même responsable sur la carte même lorsqu'elle passe d'une étape à l'autre. Par défaut, déplacer une carte vers une nouvelle étape la réassigne au responsable par défaut de cette étape ; l'épinglage garde la personne actuelle responsable tout au long du processus.
- **Terminer** la carte pour la compléter, ou choisir un bouton **Résultat** si l'étape a des résultats configurés (voir [Acheminement](#routing-cards-with-outcomes-and-conditions)).
- **Retirer la carte** -- retirer une carte du tableau sans la terminer, par exemple lorsqu'une personne a été ajoutée par erreur. Une fois la suppression confirmée, la carte est fermée et retirée de la liste de tout le monde. Aucun résultat, aucun acheminement ni aucune action d'étape ne s'exécute, et son historique est conservé avec une entrée **Retirée**. Pour une [confirmation d'affectation de service](#serving-assignment-confirmations), retirer la carte ferme la demande de la même façon.
- **Ajouter des notes** et consulter l'**Activité** de la carte -- un journal des actions automatisées exécutées (e-mails envoyés, attentes, etc.), chacune avec la date et l'heure où elle s'est produite.

Pour une carte concernant une personne, le tiroir affiche aussi le téléphone mobile et l'e-mail de cette personne sous forme de liens sur lesquels vous pouvez cliquer pour l'appeler ou lui écrire, ainsi qu'un lien **Voir le profil** si vous avez l'autorisation de consulter les personnes. La personne à qui la carte est assignée voit le téléphone et l'e-mail même sans accès aux Personnes.

Les notes sont enregistrées avec la carte. Toute personne qui peut ouvrir la carte -- y compris la personne ou le groupe auquel elle est assignée -- peut lire les notes et ajouter les siennes. Les personnes qui ne peuvent pas ouvrir la carte ne peuvent pas voir ses notes.

### Actions en lot

Cochez les cases de plusieurs cartes pour agir sur elles ensemble. Pour sélectionner toutes les cartes d'une étape à la fois, cochez la case **Tout sélectionner** dans l'en-tête de la colonne de cette étape ; cochez-la à nouveau pour tout désélectionner. Une barre d'outils apparaît et vous permet de **Terminer**, **Mettre en veille**, **Assigner** (réassigner) ou **Déplacer vers…** une autre étape pour toutes les cartes sélectionnées à la fois.

## Acheminer les cartes avec des résultats et des conditions {#routing-cards-with-outcomes-and-conditions}

L'acheminement détermine où va une carte lorsqu'elle quitte une étape. Ouvrez l'éditeur d'une étape pour configurer deux types d'acheminement.

### Boutons de résultat

Les résultats sont des boutons affichés dans le tiroir de la carte lorsque vous terminez une carte sur cette étape. Au lieu d'un seul bouton **Terminer**, vous pouvez proposer des choix comme « S'est joint à un groupe » ou « Pas intéressé ». Chaque résultat peut :

- Envoyer la carte vers **une autre étape** de ce flux de travail,
- **Transférer la carte** à un tout autre flux de travail, ou
- **Fermer** la carte.

Cela permet à une seule décision d'orienter la personne vers différents chemins.

### Acheminement automatique (conditionnel)

Les routes automatiques font avancer une carte **dès qu'elle entre dans une étape** (et après la fin de ses actions automatisées), sans que personne n'ait à cliquer, si la personne correspond à un ensemble de conditions. Ajoutez une route, choisissez l'étape cible et définissez une ou plusieurs **conditions** (par exemple le campus, l'âge ou le statut de membre d'une personne). Les champs texte peuvent correspondre exactement ou avec **contient**, **commence par** ou **se termine par**. Une route sans condition correspond à tout le monde.

Les conditions de date (Date du jour, Date de naissance ou Anniversaire de mariage) peuvent comparer la date complète ou seulement une partie -- le jour de la semaine, le **Jour du mois**, le **Mois**, ou les années écoulées. Pour la date de naissance ou l'anniversaire de mariage d'une personne, **Jour du mois** propose une option relative **Aujourd'hui**, de sorte qu'une condition comme *Date de naissance · Jour du mois = Aujourd'hui* correspond aux personnes dont l'anniversaire tombe aujourd'hui. **Mois** propose **Mois précédent**, **Mois en cours** et **Mois suivant**. Les valeurs relatives comme celles-ci sont calculées selon le fuseau horaire de votre église, afin qu'elles correspondent au jour du calendrier de votre église plutôt qu'à celui du serveur.

Le groupe de conditions **Dons** comprend **Donateur régulier en baisse**, qui trouve les personnes qui donnaient régulièrement et qui ont ensuite cessé. Définissez trois nombres : *A donné au moins* **3** *fois sur les 12 dernières semaines, puis rien dans les 3 dernières semaines* (ce sont les valeurs par défaut). Les semaines sont comptées à reculons à partir d'aujourd'hui, dans le fuseau horaire de votre église, et un don remboursé ne compte pas. Cette condition est surtout utile avec un [déclencheur planifié](#schedule-triggers) -- par exemple une règle hebdomadaire qui ajoute les donateurs en baisse à un tableau de suivi de soins pastoraux. La condition ne regarde que les dates de dons, jamais les montants, et les cartes et les alertes n'affichent jamais de montants. Comme elle révèle qui a cessé de donner, seules les personnes qui peuvent voir les dons voient cette option et peuvent l'ajouter, la modifier ou la retirer.

Si les conditions d'une route ne peuvent pas être vérifiées pour une raison quelconque, cette route est considérée comme ne correspondant pas. La carte reste sur l'étape (ou suit une autre route qui correspond) au lieu de rester bloquée.

:::info
Sur le tableau, chaque colonne d'étape affiche de petites annotations qui décrivent son acheminement -- par exemple une étiquette de résultat ou « si correspond » suivi d'une flèche vers l'étape ou le flux de travail de destination.
:::

## Étapes entièrement automatisées {#fully-automated-steps}

Vous pouvez faire fonctionner une étape entièrement de manière autonome, sans que personne ne la traite. Donnez à l'étape ses **actions automatisées** et ajoutez une **route automatique** (sans condition) pointant vers l'étape suivante. Lorsqu'une carte entre, les actions s'exécutent, puis la route la fait avancer immédiatement -- la carte traverse l'étape directement.

:::tip
Combinez cela avec **Attendre** : *Envoyer un e-mail de bienvenue → Attendre 3 jours → passer automatiquement à l'étape « Appel personnel ».* L'e-mail et le calendrier sont pris en charge pour vous, et un bénévole ne voit la carte qu'au moment de la prise de contact humaine.
:::

## Déclencheurs {#triggers}

Les déclencheurs ajoutent automatiquement des personnes à un flux de travail lorsqu'un événement se produit, afin que vous n'ayez jamais à ajouter des cartes à la main. Sur le tableau d'un flux de travail, cliquez sur l'onglet **Déclencheurs**, puis sur **Ajouter un déclencheur**. Il en existe deux types :

### Déclencheurs d'événement

Ils se déclenchent dès qu'un enregistrement change dans B1. Choisissez l'événement, puis ajoutez facultativement des **conditions** pour que seules les personnes correspondantes soient ajoutées :

- **Personne · Créée / Mise à jour** -- par exemple ajouter quiconque dont le statut devient *Visiteur* ou *Invité* (le statut donné aux personnes qui s'inscrivent elles-mêmes).
- **Don · Créé** -- par exemple ajouter un premier don ou un don important à un flux de travail de remerciement (en filtrant par montant, fonds ou mode de paiement).
- **Groupe · Membre ajouté** / **Groupe · Créé**.
- **Formulaire · Soumis** -- ajouter quiconque soumet un formulaire choisi (idéal pour une carte « Je suis nouveau » ou « Connexion »).

### Déclencheurs planifiés {#schedule-triggers}

Ils s'exécutent de façon récurrente -- quotidiennement, hebdomadairement, mensuellement ou annuellement -- selon un ensemble de conditions. Utilisez-les pour des démarches dans le temps, comme *toutes les personnes dont c'est l'anniversaire aujourd'hui* (Date de naissance · Jour du mois = **Aujourd'hui**, avec le mois correspondant au **Mois en cours**) ou une vérification *mensuelle*. Même sans **Une seule fois par personne**, un déclencheur planifié n'ajoute pas la même personne à nouveau pendant une même période de répétition (un jour, une semaine, un mois ou une année, selon la fréquence d'exécution).

Pour tout déclencheur, vous pouvez aussi définir :

- L'**Étape de départ** sur laquelle atterrit la nouvelle carte (par défaut la première étape).
- **Une seule fois par personne** -- pour que la même personne ne soit pas ajoutée deux fois au flux de travail par le déclencheur. Avec cette option activée, toute personne qui a déjà une carte sur ce flux de travail est ignorée.
  - **Ajouter à nouveau après la fermeture de sa carte** -- apparaît lorsque **Une seule fois par personne** est activé. Cochez-la pour permettre au déclencheur d'ajouter à nouveau une personne une fois sa carte précédente sur ce flux de travail fermée. Une personne n'a jamais deux cartes ouvertes sur le flux de travail en même temps. Utilisez cette option pour des événements qui peuvent se produire plusieurs fois, comme un visiteur de retour ou un processus annuel.
- **Actif** -- activez ou désactivez le déclencheur sans le supprimer.

:::tip
Associez un déclencheur **Formulaire · Soumis** au modèle **Suivi d'un nouveau visiteur** pour transformer votre formulaire « Carte de contact » ou « Je suis nouveau » en un pipeline de suivi automatique.
:::

## Confirmations d'affectation de service {#serving-assignment-confirmations}

Un type particulier de flux de travail peut assurer le suivi des [demandes de service](./plans.md#assigning-team-members) jusqu'à ce que chaque bénévole accepte ou refuse. Au lieu de personnes, chaque carte de ce tableau suit **une affectation** -- une personne dans un poste sur un plan. Deux rôles ou deux services pour la même personne ont des cartes distinctes. Cette fonction est facultative : rien ne change pour un plan tant que vous ne sélectionnez pas un flux de travail de confirmation dans ses paramètres.

### Le configurer

1. Sur la page Flux de travail, cliquez sur **Ajouter un flux de travail** et choisissez le modèle **Confirmation d'affectation de service**. (Ou démarrez un **Flux de travail vierge** et réglez sa **Finalité du flux de travail** sur **Confirmation d'affectation de service**.) Créer à partir du modèle exige l'autorisation d'envoyer des textos, puisqu'il comprend une étape de texto.
2. Examinez les étapes. Le modèle commence avec :
   - **Demander et attendre la réponse** -- envoie la demande de service par e-mail et par texto, attend 2 jours, envoie un e-mail de rappel, attend 1 jour de plus, puis fait avancer la carte automatiquement.
   - **Appeler le bénévole au sujet d'une demande sans réponse** -- une étape pour qu'une personne appelle le bénévole, avec une échéance dans 1 jour. Définissez un **Responsable par défaut** sur cette étape. S'il n'en a pas, la carte va au responsable du ministère, ou à l'équipe du ministère s'il n'y en a pas.
3. Modifiez les attentes, les messages et les étapes pour les adapter à votre église.
4. Ouvrez les [paramètres d'un plan](./plans.md#plan-settings) et choisissez ce flux de travail sous **Flux de travail de confirmation**.

Ces flux de travail utilisent une action **Envoyer une demande de service** au lieu de **Envoyer un e-mail** et **Envoyer un texto**. Choisissez **E-mail** ou **Message texte** et, si vous le souhaitez, rédigez un **Message de demande**. La demande comprend toujours le rôle, le plan, la date du service et un lien pour répondre ; vous pouvez utiliser `{{planName}}`, `{{positionName}}` et `{{serviceDate}}` dans votre message. Laissez le message vide pour utiliser la demande par défaut. Les préférences de notification des bénévoles, leur consentement aux textos, votre fournisseur de messagerie texte et l'approbation de l'e-mail de votre église s'appliquent tous, et toute tentative ignorée ou bloquée est consignée sur la carte. Les actions **Envoyer un e-mail**, **Envoyer un texto** et **Ajouter à un flux de travail** ne sont pas disponibles sur ces tableaux.

L'onglet **Déclencheurs** d'un flux de travail de confirmation explique comment les cartes sont démarrées plutôt que de proposer des déclencheurs, et ces flux de travail n'apparaissent pas dans les listes **Ajouter à un flux de travail** des personnes.

### Comment les cartes sont démarrées et fermées

- Les cartes démarrent lorsque vous **Notifiez** les bénévoles d'un plan publié (voir [Aviser les bénévoles](./plan-validation.md#notifying-volunteers)). Chaque nouvelle affectation sans réponse reçoit une seule carte. Enregistrer, publier, copier ou remplir automatiquement un plan ne contacte personne par lui-même, et les plans mis en attente n'envoient rien.
- Les bénévoles reçoivent toujours l'alerte habituelle dans l'application. Le suivi par e-mail et par texto provient du flux de travail.
- Lorsque le bénévole **accepte ou refuse**, sa carte se ferme automatiquement, ainsi que toutes les tâches de suivi qui y sont liées.
- Le tiroir de la carte affiche le poste, la date du service et un lien vers le plan. Au lieu de **Terminer**, le bouton indique **Enregistrer le suivi effectué**. Cliquer dessus enregistre qu'un suivi a été fait, mais la carte reste ouverte et assignée (affichée comme **En attente de réponse**) jusqu'à ce que le bénévole réponde ou que la date limite de réponse soit dépassée.
- La date limite de réponse est la fin du dernier horaire de service auquel l'équipe du poste participe. Si le plan n'a pas d'horaire correspondant, c'est la fin de la journée du service. Si personne n'a répondu d'ici là, la carte se ferme avec **Date limite de réponse dépassée** et une tâche **Examiner la demande de service sans réponse** est envoyée au responsable actuel de la carte ou au responsable du ministère afin que quelqu'un puisse décider comment couvrir le poste. L'affectation reste **Non confirmée**.
- Retirer l'affectation, modifier sa personne, son poste ou la date du plan, remettre le plan en attente, ou faire passer le plan à un autre flux de travail de confirmation ferme la carte. Une carte fermée n'est jamais rouverte par un autre **Notifier** ; ajoutez une nouvelle affectation pour envoyer une nouvelle demande.

:::info
Pour les demandes envoyées par un flux de travail de confirmation, les [rappels aux bénévoles](./plans.md#volunteer-reminders) ne sont envoyés qu'aux bénévoles qui ont **accepté**, afin que les personnes en attente de réponse ne reçoivent pas de rappels en plus des suivis du flux de travail.
:::

## Mes cartes

Les bénévoles et le personnel n'ont pas besoin de fouiller dans chaque tableau pour trouver leur travail. La liste **Mes cartes** de la page **Mon travail** affiche chaque carte assignée à l'utilisateur actuel, tous flux de travail confondus. Pour y accéder, cliquez sur **Mes cartes** en haut de la page Flux de travail, ou ouvrez **Service > Mon travail** dans le menu Accès rapide. Cliquer sur une carte ouvre le tableau auquel elle appartient.

## Rapports

Ouvrez un flux de travail et cliquez sur **Rapports** pour voir les analyses de ce flux de travail :

- **En retard** -- le nombre de cartes qui ont dépassé leur date d'échéance.
- **Cartes par étape** -- le nombre de cartes actuellement sur chaque étape, présenté sous forme de graphique en colonnes.
- **Terminées (30 jours)** -- le débit des 30 derniers jours, présenté sous forme de graphique linéaire.

Utilisez ces éléments pour repérer les goulots d'étranglement -- par exemple une étape où les cartes s'accumulent sans jamais avancer.

## Articles connexes

- [Tâches](./tasks.md) -- les actions individuelles sur lesquelles reposent les cartes de flux de travail
- [Formulaires](../forms/index.md) -- créez les formulaires qui peuvent déclencher des flux de travail
- [Groupes](../groups/index.md) -- les groupes dans lesquels une action « Ajouter au groupe » peut placer des personnes
- [Plans de service](./plans.md) -- choisissez un flux de travail de confirmation pour les demandes de service d'un plan
- [Rôles et autorisations](../settings/roles-permissions.md) -- contrôlez qui peut consulter, modifier et gérer les flux de travail
