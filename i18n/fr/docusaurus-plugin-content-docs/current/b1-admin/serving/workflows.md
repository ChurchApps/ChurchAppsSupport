---
title: "Flux de travail"
description: "Créez des tableaux de type Kanban dans B1 Admin pour faire progresser les personnes dans les étapes de suivi, avec des courriels, des textos automatiques et des déclencheurs qui ajoutent les personnes automatiquement."
---

# Flux de travail

<div class="article-intro">

Les flux de travail font progresser des personnes à travers une série d'étapes sur un tableau visuel. Chaque personne devient une carte qui passe d'une étape à la suivante : du suivi d'un visiteur qui se présente pour la première fois, au processus d'adhésion, en passant par le remerciement à un premier donateur, et tout autre cas où vous devez suivre de nombreuses personnes à travers les mêmes étapes. Une étape peut demander à un bénévole de faire quelque chose (téléphoner, avoir une conversation) **et** exécuter des actions automatisées par elle-même (envoyer un courriel ou un texto, attendre quelques jours, ajouter la personne à un groupe). Les flux de travail prennent donc en charge à la fois le suivi humain et les tâches répétitives qui l'entourent. Ils étendent les [tâches](./tasks.md) à un tableau Kanban glisser-déposer, afin que personne ne passe entre les mailles du filet.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Assurez-vous que les personnes que vous voulez suivre existent dans B1 Admin
- Familiarisez-vous avec le fonctionnement des [tâches](./tasks.md), car chaque carte d'un tableau est une tâche
- Pour utiliser l'action **Envoyer un courriel**, créez d'abord les modèles de courriel que vous voulez envoyer (gérés sous **Paramètres → Modèles de courriel**)
- Pour utiliser l'action **Envoyer un texto**, connectez d'abord un [fournisseur de messages texte](../settings/church-settings.md#texting)
- Vous aurez besoin de la permission appropriée pour les tâches. Consulter, modifier des cartes et gérer les flux de travail sont des niveaux d'autorisation distincts (voir [Rôles et autorisations](../settings/roles-permissions.md))

</div>

## Consulter les flux de travail

Ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche de B1 Admin), développez **Service**, puis cliquez sur **Flux de travail**. Vos flux de travail sont listés dans un tableau indiquant la **catégorie** et le **statut** (**Actif** ou **Inactif**) de chacun. Si vous utilisez des catégories, des onglets au-dessus de la liste permettent de la filtrer par catégorie. Cliquez sur un flux de travail pour ouvrir son tableau.

## Créer un flux de travail

1. Sur la page Flux de travail, cliquez sur **Ajouter un flux de travail**.
2. Choisissez comment démarrer :
   - **Flux de travail vierge** -- commencez à zéro et construisez vos propres étapes.
   - **À partir d'un modèle** -- commencez avec un ensemble d'étapes prêtes à l'emploi que vous pouvez modifier. Les modèles intégrés comprennent :
     - **Suivi d'un nouveau visiteur** -- Envoyer un courriel de bienvenue → Appel téléphonique personnel → Inviter à l'étape suivante → Connecté
     - **Cours d'adhésion** -- Exprimer son intérêt → S'inscrire au cours → Assister au cours → Terminer l'adhésion
     - **Remerciement au premier donateur** -- Envoyer une note de remerciement → Partager l'impact des dons → Intendance
     - **Confirmation d'affectation de service** -- Demander et attendre la réponse → Appeler le bénévole pour une demande sans réponse (voir [Confirmations d'affectation de service](#serving-assignment-confirmations))

   La construction des étapes d'un modèle peut prendre un moment. Pendant ce temps, le bouton **Ajouter un flux de travail** affiche **Création...** et ne peut pas être cliqué à nouveau, afin que vous n'obteniez pas de doublon. Si quelque chose ne fonctionne pas, la page affiche *« Le flux de travail n'a pas pu être créé. Veuillez réessayer. »*
3. Donnez un **nom** au flux de travail.
4. Facultativement, attribuez une **catégorie** pour regrouper les flux de travail liés. Vous pouvez créer une nouvelle catégorie directement depuis la liste déroulante.
   Pour un flux de travail vierge, vous choisissez aussi sa **finalité** : **Suivi de personnes** (le type habituel) ou **Confirmation d'affectation de service**. La finalité ne peut plus être modifiée une fois le flux de travail créé.
5. Laissez le flux de travail **Actif** pour que des personnes puissent y être ajoutées, ou réglez-le sur **Inactif** pour le masquer des listes d'ajout à un flux de travail.
6. Cliquez sur **Enregistrer**.

:::tip
Utilisez le bouton **Dupliquer** sur la liste des flux de travail pour copier un flux existant (y compris ses étapes, ses actions automatisées et son acheminement) comme point de départ d'un nouveau.
:::

## Construire le tableau avec des étapes

Chaque tableau de flux de travail est composé d'**étapes**, présentées comme des colonnes de gauche à droite. Ouvrez un flux de travail et utilisez **Ajouter une étape** pour créer chaque phase de votre processus.

Lorsque vous ajoutez ou modifiez une étape, vous pouvez configurer :

- **Nom de l'étape** -- l'en-tête de colonne (par exemple « Appel de bienvenue » ou « En attente d'inscription »).
- **Échéance (en jours)** -- définit automatiquement une date d'échéance lorsqu'une carte entre dans cette étape. Les cartes qui dépassent leur date d'échéance sont signalées comme **En retard**.
- **Assigné par défaut** -- la personne ou le groupe auquel les nouvelles cartes de cette étape sont automatiquement assignées. Lorsque l'assigné par défaut est une personne, elle reçoit une notification indiquant qu'une carte lui a été assignée.
- **Actions automatisées** -- ce que le système fait de lui-même lorsqu'une carte arrive (voir ci-dessous).
- **Acheminement** -- l'endroit où la carte va lorsqu'elle quitte l'étape (voir [Acheminer les cartes](#routing-cards-with-outcomes-and-conditions)).

Faites glisser les colonnes d'étapes dans l'ordre qui correspond à votre processus. L'ordre définit aussi le chemin par défaut emprunté par une carte lorsqu'aucun autre acheminement ne s'applique.

:::info
Enregistrez d'abord une nouvelle étape. Les actions automatisées et l'acheminement sont rattachés à l'étape ; l'éditeur ne déverrouille donc ces sections qu'une fois l'étape existante.
:::

## Actions automatisées

Chaque étape peut comporter une liste d'**actions automatisées** qui s'exécutent d'elles-mêmes au moment où une carte **entre** dans l'étape, avant que quiconque n'y touche. C'est ainsi qu'une étape à la fois sollicite un bénévole *et* prend en charge le travail de routine qui entoure le suivi.

Dans l'éditeur d'étape, ouvrez **Actions automatisées**, cliquez sur **Ajouter une action**, choisissez un type et remplissez ses paramètres. Ajoutez autant d'actions que nécessaire ; elles s'exécutent **de haut en bas, dans l'ordre**. Cliquez sur **Enregistrer** sur l'étape pour sauvegarder l'étape et toutes ses actions ensemble. Retirer une action avec son icône de corbeille prend effet immédiatement.

| Action | Ce qu'elle fait |
|---|---|
| **Envoyer un courriel** | Envoie à la personne un modèle de courriel de votre choix. Vous pouvez remplacer l'objet. |
| **Envoyer un texto** | Envoie à la personne un message que vous rédigez, par le [fournisseur de messages texte](../settings/church-settings.md#texting) de votre église. |
| **Attendre** | Met la carte en pause pendant un nombre de jours avant de continuer (voir ci-dessous). |
| **Ajouter à un groupe** | Ajoute la personne à un [groupe](../groups/index.md) que vous choisissez. |
| **Retirer d'un groupe** | Retire la personne d'un groupe que vous choisissez. |
| **Enregistrer la présence** | Marque la personne comme présente au service d'un groupe en cours (voir ci-dessous). |
| **Ajouter à un flux de travail** | Démarre la personne sur un autre flux de travail, utile pour passer d'un processus à l'autre. |
| **Ajouter une note** | Enregistre une note dans l'historique de la carte. |
| **Définir un champ** | Met à jour un champ de la fiche de la personne : statut de membre, état civil, genre, ville, province ou État, ou code postal. |
| **Webhook** | Envoie les détails de la carte à une adresse web externe (URL) que vous fournissez, pour la connexion à d'autres systèmes. |
| **Créer une tâche** | Crée une [tâche](./tasks.md) avec le titre et la description que vous saisissez, assignée à la personne de votre choix. |
| **Notifier une personne** | Envoie à un membre du personnel ou à un bénévole de votre choix un courriel et une notification B1 au sujet de la carte (voir ci-dessous). |

Une fois toutes les actions d'une étape terminées, la carte **reste sur cette étape** pour qu'une personne puisse la traiter, sauf si l'étape comporte un acheminement automatique qui la fait avancer (voir [Étapes entièrement automatisées](#fully-automated-steps)).

:::info
Les actions automatisées ne s'exécutent que lorsqu'une carte arrive par le flux normal : lorsqu'elle est ajoutée pour la première fois, lorsqu'un résultat ou un acheminement automatique l'amène, ou après la fin d'une attente. Elles ne se réexécutent **pas** lorsqu'un membre du personnel fait glisser manuellement une carte vers l'étape ou la renvoie, afin qu'une personne ne reçoive pas deux fois le même courriel.
:::

### Envoyer un courriel {#sending-email}

Choisissez **Envoyer un courriel**, sélectionnez l'un de vos modèles de courriel et, si vous le souhaitez, saisissez un objet personnalisé. Lorsqu'une carte entre dans l'étape, la personne reçoit ce courriel automatiquement. (Si la personne n'a pas d'adresse courriel au dossier, l'étape ignore simplement cette action.) Les [champs de fusion](../settings/email-templates.md#merge-fields) du modèle, comme `{{firstName}}`, sont remplacés par les renseignements propres à la personne. Si un déclencheur **Don · Créé** a lancé le flux de travail, les champs de don `{{amount}}`, `{{giftDate}}`, `{{fund}}` et `{{receipt}}` sont remplis à partir de ce don, même dans les étapes qui s'exécutent après une attente. Voir [Champs de fusion de don](../settings/email-templates.md#gift-merge-fields).

Lorsque le courriel part, l'historique de la carte enregistre **Courriel envoyé**. S'il ne peut pas être envoyé (par exemple parce que le courriel de votre église n'est pas encore approuvé ou que la limite quotidienne a été atteinte), aucune entrée « Courriel envoyé » n'est ajoutée.

:::info
Les courriels de flux de travail ne partent qu'après l'approbation de votre église pour l'envoi de courriels de groupe, et ils comptent dans la limite quotidienne de courriels de votre église. Voir [Activer les courriels de groupe pour votre église](../groups/group-members.md#turning-on-group-email-for-your-church). L'action **Envoyer un courriel** vous avertit dans l'éditeur d'étape lorsque ces courriels ne partiront pas : *« Le courriel de votre église n'a pas encore été approuvé... »* si l'approbation est toujours en attente, ou *« Le courriel de votre église est suspendu... »* si des messages récents ont fait l'objet de rebonds ou ont été signalés comme pourriels.
:::

### Enregistrer la présence

Choisissez **Enregistrer la présence**, puis cliquez sur **Choisir le groupe** pour sélectionner le groupe dont la présence doit être enregistrée. Lorsque l'action s'exécute, la personne est marquée présente au service en cours de ce groupe, exactement comme si elle avait pointé. Cela est utile avec un déclencheur qui ajoute les personnes au flux à mesure qu'elles arrivent, afin qu'elles soient comptées sans pointage séparé.

- La présence est mesurée au moment où la carte a été **créée**. Une **attente** antérieure dans le flux de travail ne la fera donc pas dépasser le service.
- Seules les heures de service dotées d'un jour et d'une heure de début sont prises en compte. Si aucun des horaires de service du groupe n'est en cours à ce moment-là, rien n'est enregistré, et l'historique de la carte indique **Aucun service planifié en cours : présence non enregistrée**.
- Lorsque la présence est enregistrée, l'historique de la carte affiche **Présence enregistrée**, suivi du nom du groupe. Relancer l'action pour le même service ne compte pas la personne une seconde fois.

### Notifier une personne

Choisissez **Notifier une personne**, cliquez sur **Choisir la personne** et, si vous le souhaitez, saisissez un **message**. Lorsqu'une carte entre dans l'étape, cette personne reçoit un courriel et une notification B1 contenant le nom de la personne de la carte, les noms du flux de travail et de l'étape, votre message et un lien pour ouvrir la carte. Utilisez-la pour prévenir un membre du personnel ou un responsable de ministère, par exemple : *« Prévenir le pasteur lorsqu'une personne atteint l'étape Entrevue d'adhésion. »* L'historique de la carte enregistre **Notifié**, suivi du nom de la personne.

### Envoyer un texto {#sending-a-text}

Choisissez **Envoyer un texto** et saisissez le **message texte** (jusqu'à 1 600 caractères). Si votre église a enregistré des [modèles de texto](../settings/email-templates.md), une liste **Partir d'un modèle** apparaît au-dessus de la zone. En en choisissant un, le texte du modèle est copié dans le message, et vous pouvez encore le modifier. L'étape conserve sa propre copie : les modifications ultérieures du modèle ne changent pas l'étape. Lorsqu'une carte entre dans l'étape, la personne reçoit ce texto sur son téléphone mobile. Pour personnaliser le message, cliquez sur une pastille sous la zone de message (**Prénom**, **Nom**, **Nom d'affichage** ou **Nom de l'église**) pour insérer `{{firstName}}`, `{{lastName}}`, `{{displayName}}` ou `{{churchName}}` à l'emplacement du curseur. Chacun est remplacé par les renseignements de la personne lors de l'envoi du texto. Les pastilles **Montant**, **Date du don**, **Fonds** et **Reçu** insèrent les champs de don, qui ne se remplissent que si un déclencheur **Don · Créé** a lancé le flux de travail. Par exemple : `Merci {{firstName}} pour votre don de {{amount}} au {{fund}} !`

- Si la personne n'a pas de téléphone mobile au dossier, aucun texto n'est envoyé et l'historique de la carte enregistre **Texto ignoré : aucun téléphone mobile**.
- Si la personne s'est désabonnée, aucun texto n'est envoyé et l'historique de la carte enregistre **Texto ignoré : désabonné**.
- Lorsque le texto part, l'historique de la carte enregistre **Texto envoyé**. Si l'envoi échoue (par exemple parce qu'aucun fournisseur de messages texte n'est connecté ou que votre église n'a plus de crédits de texto), l'échec est consigné dans l'historique de la carte, et les autres actions de l'étape s'exécutent tout de même.

:::warning
Les textos sont envoyés par le [fournisseur de messages texte](../settings/church-settings.md#texting) de votre église. Si aucun fournisseur n'est connecté, l'éditeur d'action vous avertit *« Aucun fournisseur de messages texte n'est configuré »*, et les textos ne partiront pas.
:::

### Attendre quelques jours (séquences progressives)

L'action **Attendre** retient une carte pendant le nombre de jours que vous définissez. Pendant l'attente, la carte s'affiche comme **Reportée**. B1 vérifie les attentes terminées toutes les 30 minutes ; une carte reprend donc dans la demi-heure qui suit la fin de son attente. Lorsque l'attente est terminée :

1. Toutes les **actions restantes de la même étape** s'exécutent. Vous pouvez ainsi construire une séquence progressive comme **Envoyer un courriel → Attendre 3 jours → Envoyer un courriel de rappel**.
2. Ensuite, si l'étape comporte un acheminement automatique, la carte avance. Sinon, elle reste sur l'étape pour qu'une personne la prenne en charge.

:::tip
Une **attente** au tout début d'une étape est un moyen simple de « retenir » une carte avant qu'elle ne soit présentée à un bénévole. Par exemple : *attendre 7 jours, puis un coach prend contact*.
:::

## Ajouter des personnes comme cartes

Il existe plusieurs façons de placer des personnes sur un tableau :

- **Depuis le tableau** -- Cliquez sur **Ajouter une carte** au bas d'une colonne d'étape et choisissez une personne. Vous pouvez aussi choisir un groupe ; chaque membre de ce groupe est alors ajouté comme carte.
- **Depuis la fiche d'une personne** -- Utilisez **Ajouter au flux de travail** sur la page d'une personne pour la placer sur un flux de travail.
- **Depuis la recherche de personnes** -- Sélectionnez plusieurs personnes et utilisez l'action groupée **Ajouter au flux de travail** pour toutes les ajouter en une fois.
- **Automatiquement avec un déclencheur** -- Ajoutez des personnes lorsqu'un événement se produit, comme la soumission d'un formulaire ou un premier don (voir [Déclencheurs](#triggers) ci-dessous).

Ajouter une personne à la main, ou avec une action d'étape **Ajouter à un flux de travail**, ne lui donne jamais une deuxième carte ouverte dans le même flux de travail. Si elle a déjà une carte ouverte, elle est ignorée (lors d'un ajout en lot, seules les personnes qui n'en ont pas reçoivent une nouvelle carte). Une fois leur carte fermée, vous pouvez les ajouter à nouveau. Les déclencheurs suivent plutôt leur propre paramètre **Une seule fois par personne**.

## Travailler sur le tableau {#working-the-board}

Ouvrez un flux de travail pour voir son tableau. Chaque carte affiche le nom de la personne, la personne à qui elle est assignée, et une pastille d'échéance ou de statut (**En retard** ou **Reportée**). Une colonne d'étape affiche aussi de petits badges pour les actions automatisées qu'elle exécute, ainsi que des annotations pour son acheminement. Vous obtenez ainsi une vue d'ensemble de la circulation des cartes.

- **Déplacer une carte** -- Faites glisser une carte d'une colonne à la suivante à mesure que la personne progresse.
- **Ouvrir une carte** -- Double-cliquez sur une carte (ou cliquez dessus) pour ouvrir son tiroir de détails, où vous pouvez changer d'étape, la réassigner, ajouter des notes et examiner ce qui s'est déjà passé.

Depuis le tiroir de la carte, vous pouvez :

- **Assigner** la carte à une autre personne ou un autre groupe.
- **Reporter** la carte de 1 jour, 3 jours ou 1 semaine pour masquer temporairement son échéance.
- **Renvoyer** à l'étape précédente, ou **Sauter** à l'étape suivante.
- **Épingler l'assignation** : conserver le même responsable sur la carte même lorsqu'elle passe d'une étape à l'autre. Par défaut, déplacer une carte vers une nouvelle étape la réassigne à l'assigné par défaut de cette étape. L'épinglage conserve la personne actuelle comme responsable tout au long du processus.
- **Terminer** la carte pour la clore, ou choisir un bouton **Résultat** si l'étape a des résultats configurés (voir [Acheminer les cartes](#routing-cards-with-outcomes-and-conditions)).
- **Retirer la carte** : enlever une carte du tableau sans la terminer, par exemple lorsqu'une personne a été ajoutée par erreur. Après confirmation, la carte est fermée et retirée de la liste de tout le monde. Aucun résultat, aucun acheminement ni aucune action d'étape ne s'exécute, et son historique est conservé avec une entrée **Retirée**. Pour une carte de [confirmation d'affectation de service](#serving-assignment-confirmations), la retirer ferme la demande de la même façon.
- **Ajouter des notes** et consulter l'**Activité** de la carte, un journal des actions automatisées exécutées (courriels envoyés, attentes, etc.), chacune avec sa date et son heure.

Pour une carte qui concerne une personne, le tiroir affiche aussi le téléphone mobile et le courriel de cette personne sous forme de liens cliquables pour l'appeler ou lui écrire, ainsi qu'un lien **Voir le profil** si vous avez l'autorisation de consulter les personnes. La personne à qui la carte est assignée voit le téléphone et le courriel même sans accès aux personnes.

Les notes sont enregistrées avec la carte. Toute personne qui peut ouvrir la carte, y compris la personne ou le groupe auquel elle est assignée, peut lire les notes et ajouter les siennes. Les personnes qui ne peuvent pas ouvrir la carte ne voient pas ses notes.

### Actions groupées

Cochez les cases de plusieurs cartes pour agir sur elles ensemble. Pour sélectionner toutes les cartes d'une étape d'un coup, cochez la case **Tout sélectionner** dans l'en-tête de la colonne de cette étape ; cochez-la à nouveau pour tout désélectionner. Une barre d'outils apparaît et vous permet de **Terminer**, **Reporter**, **Assigner** (réassigner) ou **Déplacer vers…** une autre étape pour toutes les cartes sélectionnées en même temps.

## Acheminer les cartes avec des résultats et des conditions {#routing-cards-with-outcomes-and-conditions}

L'acheminement détermine où va une carte lorsqu'elle quitte une étape. Ouvrez l'éditeur d'une étape pour configurer deux types d'acheminement.

### Boutons de résultat

Les résultats sont des boutons affichés dans le tiroir de la carte lorsque vous terminez une carte à cette étape. Au lieu d'un seul bouton **Terminer**, vous pouvez proposer des choix comme « A rejoint un groupe » ou « Pas intéressé ». Chaque résultat peut :

- Envoyer la carte vers **une autre étape** de ce flux de travail,
- **Transmettre la carte** à un flux de travail différent, ou
- **Fermer** la carte.

Cela permet à une seule décision d'orienter la personne vers différents chemins.

### Acheminement automatique (conditionnel)

Les routes automatiques font avancer une carte **dès qu'elle entre dans une étape** (et après la fin de ses actions automatisées), sans que personne ne clique, si la personne répond à un ensemble de conditions. Ajoutez une route, choisissez l'étape cible et définissez une ou plusieurs **conditions** (par exemple le campus, l'âge ou le statut de membre d'une personne). Les champs texte peuvent correspondre exactement, ou avec **contient**, **commence par** ou **se termine par**. Une route sans condition correspond à tout le monde.

Les conditions de date (date du jour, date de naissance ou anniversaire) peuvent comparer la date complète ou seulement une partie : le jour de la semaine, le **jour du mois**, le **mois** ou les années écoulées. Pour la date de naissance ou l'anniversaire d'une personne, **Jour du mois** propose une option relative **Aujourd'hui**. Ainsi, une condition comme *Date de naissance · Jour du mois = Aujourd'hui* correspond aux personnes dont l'anniversaire tombe aujourd'hui. **Mois** propose **Mois précédent**, **Mois en cours** et **Mois suivant**. Les valeurs relatives sont calculées selon le fuseau horaire de votre église, afin de correspondre au jour du calendrier de votre église plutôt qu'à celui du serveur.

Le groupe de conditions **Dons** comprend **Donateur régulier qui a cessé de donner**, qui trouve les personnes qui donnaient régulièrement puis ont cessé. Définissez trois nombres : *A donné au moins* **3** *fois sur les* **12** *dernières semaines, puis rien au cours des* **3** *dernières semaines* (ce sont les valeurs par défaut). Les semaines sont comptées à partir d'aujourd'hui, selon le fuseau horaire de votre église, et un don remboursé ne compte pas. Cette condition est surtout utile avec un [déclencheur planifié](#schedule-triggers), par exemple une règle hebdomadaire qui ajoute les donateurs qui ont cessé de donner à un tableau de suivi pastoral. La condition ne regarde que les dates des dons, jamais les montants, et les cartes et les alertes n'affichent jamais de montants. Comme elle révèle qui a cessé de donner, seules les personnes qui peuvent consulter les dons voient cette option et peuvent l'ajouter, la modifier ou la retirer.

Si les conditions d'une route ne peuvent pas être vérifiées pour une raison quelconque, cette route est considérée comme ne correspondant pas. La carte reste sur l'étape (ou suit une autre route qui correspond), au lieu de rester bloquée.

:::info
Sur le tableau, chaque colonne d'étape affiche de petites annotations décrivant son acheminement, par exemple une étiquette de résultat, ou « si correspond » suivi d'une flèche vers l'étape ou le flux de destination.
:::

## Étapes entièrement automatisées {#fully-automated-steps}

Vous pouvez faire fonctionner une étape entièrement d'elle-même, sans que personne ne la traite. Donnez à l'étape ses **actions automatisées** et ajoutez une **route automatique** (sans condition) pointant vers l'étape suivante. Lorsqu'une carte entre, les actions s'exécutent, puis la route la fait avancer immédiatement : la carte passe directement à travers.

:::tip
Combinez cela avec **Attendre** : *Envoyer un courriel de bienvenue → Attendre 3 jours → avancer automatiquement vers l'étape « Appel personnel ».* Le courriel et le calendrier sont gérés pour vous, et un bénévole ne voit la carte que lorsque le moment du contact humain est venu.
:::

## Déclencheurs {#triggers}

Les déclencheurs ajoutent automatiquement des personnes à un flux de travail lorsque quelque chose se produit, de sorte que vous n'avez jamais à ajouter des cartes à la main. Sur le tableau d'un flux de travail, cliquez sur l'onglet **Déclencheurs**, puis sur **Ajouter un déclencheur**. Il existe deux types de déclencheurs.

### Déclencheurs d'événement

Ils se déclenchent dès qu'un enregistrement change dans B1. Choisissez l'événement, puis ajoutez si vous le souhaitez des **conditions** pour que seules les personnes correspondantes soient ajoutées :

- **Personne · Créée / Mise à jour** -- par exemple, ajouter toute personne dont le statut devient *Visiteur* ou *Invité* (le statut attribué aux personnes qui s'inscrivent elles-mêmes).
- **Don · Créé** -- par exemple, ajouter un premier don ou un don important à un flux de remerciement (en filtrant selon le montant, le fonds ou le mode de paiement).
- **Groupe · Membre ajouté** / **Groupe · Créé**.
- **Formulaire · Soumis** -- ajouter toute personne qui soumet un formulaire choisi (idéal pour une carte « Je suis nouveau » ou « Me connecter »).

### Déclencheurs planifiés {#schedule-triggers}

Ils s'exécutent de façon récurrente (quotidiennement, hebdomadairement, mensuellement ou annuellement) selon un ensemble de conditions. Utilisez-les pour les démarches liées au temps, comme *toutes les personnes dont c'est l'anniversaire aujourd'hui* (Date de naissance · Jour du mois = **Aujourd'hui**, avec le mois réglé sur **Mois en cours**), ou un suivi *mensuel*. Même sans **Une seule fois par personne**, un déclencheur planifié n'ajoute pas à nouveau la même personne au cours d'une même période de répétition (un jour, une semaine, un mois ou une année, selon sa fréquence d'exécution).

Pour tout déclencheur, vous pouvez aussi définir :

- L'**étape de départ** sur laquelle atterrit la nouvelle carte (par défaut, la première étape).
- **Une seule fois par personne** : la même personne n'est pas ajoutée deux fois au flux de travail par le déclencheur. Avec cette option activée, toute personne qui a déjà une carte sur ce flux est ignorée.
  - **Ajouter à nouveau après la fermeture de sa carte** apparaît lorsque **Une seule fois par personne** est activé. Cochez-la pour que le déclencheur puisse ajouter à nouveau une personne une fois que sa carte précédente sur ce flux est fermée. Une personne n'a jamais deux cartes ouvertes en même temps sur le flux. Utilisez cette option pour les événements qui peuvent se produire plusieurs fois, comme un visiteur de retour ou un processus annuel.
- **Actif** : activer ou désactiver le déclencheur sans le supprimer.

:::tip
Associez un déclencheur **Formulaire · Soumis** au modèle **Suivi d'un nouveau visiteur** pour transformer votre formulaire « Carte de contact » ou « Je suis nouveau » en un processus de suivi automatique.
:::

## Confirmations d'affectation de service {#serving-assignment-confirmations}

Un type particulier de flux de travail peut assurer le suivi des [demandes de service](./plans.md#assigning-team-members) jusqu'à ce que chaque bénévole accepte ou refuse. Au lieu de personnes, chaque carte de ce tableau suit **une affectation** : une personne dans un poste sur un plan. Deux rôles ou deux services pour la même personne donnent lieu à des cartes distinctes. Cette fonction est facultative : rien ne change pour un plan tant que vous n'avez pas sélectionné un flux de confirmation dans ses paramètres.

### Configurer un flux de confirmation

1. Sur la page Flux de travail, cliquez sur **Ajouter un flux de travail** et choisissez le modèle **Confirmation d'affectation de service**. (Ou démarrez un **flux de travail vierge** et réglez sa **finalité** sur **Confirmation d'affectation de service**.) La création à partir du modèle exige l'autorisation d'envoyer des textos, car il comprend une étape de texto.
2. Examinez les étapes. Le modèle commence par :
   - **Demander et attendre la réponse** : envoie la demande de service par courriel et par texto, attend 2 jours, envoie un courriel de rappel, attend 1 jour de plus, puis fait avancer la carte automatiquement.
   - **Appeler le bénévole pour une demande sans réponse** : une étape où une personne appelle le bénévole, avec une échéance dans 1 jour. Définissez un **assigné par défaut** pour cette étape. S'il n'en a pas, la carte va au responsable du ministère, ou à l'équipe du ministère s'il n'y en a pas.
3. Modifiez les attentes, les messages et les étapes pour les adapter à votre église.
4. Ouvrez les [paramètres d'un plan](./plans.md#plan-settings) et choisissez ce flux de travail sous **Flux de confirmation**.

Ces flux de travail utilisent une action **Envoyer une demande de service** au lieu de **Envoyer un courriel** et **Envoyer un texto**. Choisissez **Courriel** ou **Message texte** et, si vous le souhaitez, rédigez un **message de demande**. La demande comprend toujours le rôle, le plan, la date du service et un lien pour répondre. Vous pouvez utiliser `{{planName}}`, `{{positionName}}` et `{{serviceDate}}` dans votre message. Laissez le message vide pour utiliser la demande par défaut. Les préférences de notification des bénévoles, leur consentement aux textos, votre fournisseur de messages texte et l'approbation de courriel de votre église s'appliquent tous, et toute tentative ignorée ou bloquée est consignée sur la carte. Les actions **Envoyer un courriel**, **Envoyer un texto** et **Ajouter à un flux de travail** ne sont pas disponibles sur ces tableaux.

L'onglet **Déclencheurs** d'un flux de confirmation explique comment les cartes sont démarrées, au lieu de proposer des déclencheurs. Ces flux n'apparaissent pas dans les listes **Ajouter à un flux de travail** des personnes.

### Comment les cartes sont démarrées et fermées

- Les cartes démarrent lorsque vous **notifiez** les bénévoles d'un plan publié (voir [Notifier les bénévoles](./plan-validation.md#notifying-volunteers)). Chaque nouvelle affectation sans réponse obtient une carte. Enregistrer, publier, copier ou remplir automatiquement un plan ne contacte personne de lui-même, et les plans à titre provisoire n'envoient rien.
- Les bénévoles reçoivent toujours l'alerte habituelle dans l'application. Le suivi par courriel et par texto provient du flux de travail.
- Lorsque le bénévole **accepte ou refuse**, sa carte se ferme automatiquement, ainsi que les tâches de suivi qui y sont liées.
- Le tiroir de la carte affiche le poste, la date du service et un lien vers le plan. Au lieu de **Terminer**, le bouton indique **Enregistrer le suivi effectué**. Cliquer dessus consigne qu'un suivi a été fait, mais la carte reste ouverte et assignée (affichée comme **En attente de réponse**) jusqu'à ce que le bénévole réponde ou que la date limite de réponse soit dépassée.
- La date limite de réponse correspond à la fin du dernier horaire de service auquel l'équipe du poste participe. Si le plan n'a aucun horaire correspondant, elle correspond à la fin de la journée de service. Si personne n'a répondu à ce moment-là, la carte se ferme avec **Date limite de réponse dépassée**, et une tâche **Examiner la demande de service sans réponse** est transmise au responsable actuel de la carte ou au responsable du ministère, afin que quelqu'un puisse décider comment pourvoir le poste. L'affectation reste **Non confirmée**.
- Retirer l'affectation, changer sa personne, son poste ou la date du plan, remettre le plan à l'état provisoire, ou passer le plan à un autre flux de confirmation ferme la carte. Une carte fermée n'est jamais rouverte par une nouvelle **notification** : ajoutez une nouvelle affectation pour envoyer une nouvelle demande.

:::info
Pour les demandes envoyées par un flux de confirmation, les [rappels aux bénévoles](./plans.md#volunteer-reminders) ne sont envoyés qu'aux bénévoles qui ont **accepté**. Les personnes qui attendent de répondre ne reçoivent donc pas de rappels en plus des suivis du flux de travail.
:::

## Mes cartes

Les bénévoles et le personnel n'ont pas besoin de parcourir chaque tableau pour trouver leur travail. La liste **Mes cartes** de la page **Mon travail** affiche chaque carte assignée à l'utilisateur actuel, tous flux de travail confondus. Pour y accéder, cliquez sur **Mes cartes** en haut de la page Flux de travail, ou ouvrez **Service > Mon travail** dans le menu de navigation rapide. En cliquant sur une carte, vous ouvrez son panneau de détails directement sur la page Mon travail, où vous pouvez la traiter ou la retirer sans quitter la page. Si vous pouvez consulter les flux de travail, le panneau comporte aussi un lien **Ouvrir le tableau du flux de travail** vers le tableau auquel appartient la carte.

## Rapports

Ouvrez un flux de travail et cliquez sur **Rapports** pour voir les statistiques de ce flux :

- **En retard** : le nombre de cartes ayant dépassé leur date d'échéance.
- **Cartes par étape** : le nombre de cartes actuellement présentes sur chaque étape, affiché sous forme de graphique en colonnes.
- **Terminées (30 jours)** : le débit des 30 derniers jours, affiché sous forme de graphique linéaire.

Utilisez ces indicateurs pour repérer les goulots d'étranglement, par exemple une étape où les cartes s'accumulent sans jamais avancer.

## Articles connexes

- [Tâches](./tasks.md) -- les éléments d'action individuels sur lesquels reposent les cartes de flux de travail
- [Formulaires](../forms/index.md) -- créer les formulaires qui peuvent déclencher des flux de travail
- [Groupes](../groups/index.md) -- les groupes dans lesquels une action « Ajouter à un groupe » peut placer des personnes
- [Plans de service](./plans.md) -- choisir un flux de confirmation pour les demandes de service d'un plan
- [Rôles et autorisations](../settings/roles-permissions.md) -- contrôler qui peut consulter, modifier et gérer les flux de travail
