---
title: "Points de terminaison de messagerie"
description: "Référence des points de terminaison de l'API de messagerie de ChurchApps : conversations, règles d'accès aux notes, SMS, modèles d'e-mail, notifications et appareils."
---

# Points de terminaison de messagerie

<div class="article-intro">

Le module Messagerie gère les conversations en temps réel, les messages de discussion, les notifications push, l'envoi de SMS et d'e-mails, les connexions WebSocket, les messages privés, l'enregistrement des appareils et les fournisseurs de SMS. Il constitue la couche de communication utilisée par toutes les applications ChurchApps, aussi bien pour le clavardage des diffusions en direct que pour les notifications asynchrones.

</div>

**Chemin de base :** `/messaging`

## Conversations

Chemin de base : `/messaging/conversations`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Charge les conversations à partir d'identifiants séparés par des virgules, avec les premier et dernier messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Charge les conversations associées à un contenu, avec les messages paginés (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtient les conversations de type publication pour les groupes de l'utilisateur actuel |
| GET | `/posts/group/:groupId` | JWT | — | Obtient les conversations de type publication pour un groupe précis |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Les notes les plus récentes, tous enregistrements confondus, pour la page Notes de B1 Admin. `section` vaut `people`, `groups`, `events` ou `workflows` (sinon erreur 400) ; `limit` vaut 25 par défaut (maximum 100) ; `before` est le curseur de la page précédente. Chaque note est encore soumise à la règle de son propre type (autorisation de modification des personnes ou notes confidentielles, responsables du groupe, spectateurs de l'événement, spectateurs de la carte de flux de travail), de sorte que les appelants ne voient que les notes qu'ils pourraient ouvrir. Le texte des notes est tronqué à 300 caractères |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Obtient ou crée la conversation active pour un contenu (déchiffre automatiquement contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Charge les conversations selon le type de contenu et l'identifiant |
| GET | `/:churchId/:id` | Public | — | Charge une conversation unique par identifiant |
| POST | `/` | JWT | — | Crée ou met à jour des conversations (par lot) |
| POST | `/start` | JWT | — | Démarre une nouvelle conversation avec un commentaire initial |
| DELETE | `/:churchId/:id` | JWT | — | Supprime une conversation |

### Contrôle d'accès aux notes des personnes

Les conversations dont `contentType` vaut `"person"` (l'onglet Notes d'une fiche de personne) ou `"personConfidential"` (la section Notes confidentielles) sont contrôlées sur chaque chemin de lecture et d'écriture, y compris les routes publiques ci-dessus, qui renvoient `401` pour ces types de contenu. `person` exige l'autorisation **Personnes / Modifier** de MembershipApi ; `personConfidential` exige **Personnes / Voir les notes confidentielles**. Pour les clés d'API à portée limitée, `people:write` couvre les deux actions (l'utilisateur de la clé doit toutefois détenir lui-même l'autorisation du rôle sous-jacent).

### Contrôle d'accès aux notes de groupe et d'événement {#group-and-event-notes-access-control}

Deux autres types de notes sont contrôlés de la même façon, sur chaque chemin de lecture et d'écriture (y compris les routes publiques ci-dessus), et ne sont jamais ouverts à la publication anonyme :

- **`groupNote`** (`contentId` = identifiant du groupe) -- le fil **Notes des responsables** d'un groupe. Seuls les responsables de ce groupe (`leaderGroupIds` dans le JWT) peuvent lire ou publier. Aucune autorisation du personnel ne donne accès, y compris `content.edit` et les autorisations liées à l'appartenance aux groupes.
- **`eventNote`** (`contentId` = identifiant de l'événement) -- les notes associées à un événement du calendrier. Le personnel disposant de `content.edit` ou de **Calendriers / Administrateur** peut toujours lire et publier. Sinon, l'accès dépend du champ `notesViewRole` (lecture) et `notesPostRole` (publication) de l'événement : `staff` (la valeur par défaut, utilisée lorsque le champ vaut `null`) n'ouvre l'accès à personne d'autre, `leaders` ouvre l'accès aux responsables du groupe de l'événement, et `members` ouvre l'accès aux membres et responsables du groupe de l'événement. Un événement sans `groupId` est réservé au personnel.

### Contrôle d'accès aux notes des cartes de flux de travail

Les conversations dont `contentType` vaut `"workflowCard"` (les notes d'une carte de flux de travail, où `contentId` est l'identifiant de la tâche associée à la carte) ne peuvent être lues et modifiées que par une personne pouvant ouvrir cette carte : un utilisateur disposant de l'autorisation DoingApi **Tâches / Voir**, ou la personne ou le groupe auquel la carte est assignée, qui l'a créée ou qui en est l'objet. Toute autre personne reçoit `401` sur chaque chemin de lecture, y compris les routes publiques ci-dessus. La conversation d'une carte est rattachée via la carte elle-même avec `POST /doing/tasks/:id/conversation` (corps `{ "conversationId": "..." }` ; la première conversation rattachée est retenue), appel que peuvent effectuer les éditeurs de la carte et son assigné.

### Exemple : démarrer une conversation

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Discussion hebdomadaire",
  "comment": "Bienvenue dans le fil de discussion de cette semaine !"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Discussion hebdomadaire",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Messages

Chemin de base : `/messaging/messages`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Charge tous les messages d'une conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Charge tous les messages d'une conversation (rattrapage public pour le clavardage en direct) |
| GET | `/:churchId/:id` | Public | — | Charge un message unique par identifiant |
| POST | `/` | JWT | — | Enregistre des messages (par lot). Envoie des mises à jour en temps réel et déclenche des notifications. Modifier un message existant exige d'en être l'auteur ou de détenir `content.edit` ; l'auteur enregistré ne peut jamais être réassigné |
| POST | `/send` | Public | — | Envoie des messages (par lot, public). Envoie des mises à jour en temps réel via WebSocket et déclenche des notifications |
| POST | `/setCallout` | JWT | — | (ancien) Diffuse en temps réel un message d'encadré. Aucun client actif ; le clavardage des diffusions en direct n'affiche plus les encadrés |
| DELETE | `/:churchId/:id` | JWT | — | Supprime un message et diffuse la suppression en temps réel. Voir [Modération des messages](#message-moderation) |

### Modération des messages

La suppression d'un message est autorisée pour :

- l'auteur du message ;
- le personnel disposant de `content.edit` (dans toute l'église) ;
- les **responsables de groupe**, pour les conversations dont `contentType` vaut `group` ou `groupAnnouncement` et dont `contentId` est un groupe qu'ils dirigent (`leaderGroupIds` dans le JWT).

Les conversations de notes de personnes (`person` / `personConfidential`) ne sont jamais modérées par les responsables : elles suivent les autorisations relatives aux notes (`people.edit`, `people.viewConfidentialNotes`).

Les responsables peuvent supprimer sans pouvoir modifier : réécrire le message d'un autre membre reste réservé à son auteur et au personnel disposant de `content.edit`.

### Exemple : envoyer un message

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "Jean Tremblay",
    "content": "Bonjour à tous !",
    "messageType": "comment"
  }
]
```

```json
[
  {
    "id": "msg-001",
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "Jean Tremblay",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Bonjour à tous !",
    "messageType": "comment"
  }
]
```

## Messages privés

Chemin de base : `/messaging/privatemessages`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Charge tous les messages privés de l'utilisateur actuel (inclut le dernier message de chaque conversation, marque tout comme lu) |
| GET | `/existing/:personId` | JWT | — | Trouve une conversation privée existante avec une personne précise |
| GET | `/:id` | JWT | — | Charge un message privé par identifiant (efface la notification s'il est adressé à l'utilisateur actuel) |
| POST | `/` | JWT | — | Envoie des messages privés (par lot). Déclenche une notification push au destinataire |

## Notifications

Chemin de base : `/messaging/notifications`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtient le nombre de notifications non lues de l'utilisateur actuel |
| GET | `/my` | JWT | — | Charge toutes les notifications de l'utilisateur actuel (marque tout comme lu) |
| GET | `/tmpEmail` | Public | — | Déclenche l'envoi du résumé quotidien des notifications par e-mail (point de terminaison de débogage ou de tâche planifiée) |
| GET | `/:churchId/person/:personId` | JWT | — | Charge les notifications d'une personne précise |
| GET | `/:churchId/:id` | JWT | — | Charge une notification par identifiant |
| POST | `/` | JWT | — | Crée ou met à jour des notifications (par lot) |
| POST | `/create` | JWT | — | Crée des notifications pour plusieurs personnes. Corps : `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marque toutes les notifications d'une personne comme lues |
| POST | `/sendTest` | JWT | — | Envoie une notification push de test. Corps : `{ personId, title }` |
| POST | `/ping` | Public | — | Crée une notification à partir d'un déclencheur externe. Corps : `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Supprime une notification |

### Exemple : créer des notifications

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "Un nouvel événement a été publié dans votre groupe",
  "link": "/groups/group-789"
}
```

## Préférences de notification

Chemin de base : `/messaging/notificationpreferences`

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/categories` | JWT | — | Liste les catégories de notification avec leurs canaux par défaut et autorisés |
| GET | `/my` | JWT | — | Charge les préférences de notification de l'utilisateur actuel (crée automatiquement les valeurs par défaut s'il n'en existe pas) |
| POST | `/` | JWT | — | Enregistre les préférences de l'utilisateur actuel. Corps : l'un quelconque des champs `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, ainsi que `overrides: [{ categoryKey, channel, optedIn }]` facultatif (le canal peut être `push`, `email`, `in_app` ou `sms` ; les catégories verrouillées sont ignorées). `allowSms` correspond à l'accord du membre pour recevoir des rappels par SMS. Un corps au format tableau de lignes, de l'ancien format, reste accepté |

## Connexions

Chemin de base : `/messaging/connections`

Gère les connexions WebSocket et en temps réel pour le clavardage, les conversations de groupe, les messages privés et la diffusion en direct. Voir [Architecture en temps réel](../../realtime.md) pour le protocole de bout en bout.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Charge toutes les connexions d'une conversation |
| POST | `/` | Public | — | Enregistre des connexions (par lot). Déclenche une diffusion de la présence sur la conversation. Éléments du corps : `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Met à jour le nom affiché d'une connexion à partir de son identifiant de socket. Corps : `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Retire une connexion d'une conversation. Déclenche une diffusion de la présence |
| POST | `/tmpSendAlert` | Public | — | Envoie une alerte de notification aux connexions d'une personne. Corps : `{ churchId, personId }` |

## Appareils

Chemin de base : `/messaging/devices`

Gère l'enregistrement des appareils pour les notifications push et l'association de contenu (par exemple, l'application Lessons sur les écrans de télévision).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| POST | `/enroll` | JWT | — | Enregistre ou met à jour un appareil (inscription push mobile). La correspondance se fait par jeton FCM ou identifiant d'appareil |
| POST | `/enrollAnon` | Public | — | Enregistre un appareil anonyme et génère un code d'association à 4 caractères |
| POST | `/` | Public | — | Enregistre des appareils (par lot) |
| GET | `/pair/:pairingCode` | JWT | — | Associe un appareil à l'aide de son code d'association. `?contentType=&contentId=` facultatif pour assigner du contenu |
| GET | `/status/:deviceId` | Public | — | Vérifie l'état d'association d'un appareil |
| GET | `/:churchId` | JWT | — | Charge tous les appareils d'une église |
| GET | `/:churchId/person/:personId` | JWT | — | Charge tous les appareils d'une personne |
| GET | `/:churchId/:id` | JWT | — | Charge un appareil par identifiant |
| DELETE | `/:churchId/:id` | JWT | — | Supprime un appareil |

### Exemple : enregistrer un appareil

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "iPhone de Jean",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "iPhone de Jean",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Contenus des appareils

Chemin de base : `/messaging/devicecontents`

Gère les affectations de contenu des appareils associés (par exemple, la leçon affichée sur un téléviseur).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Charge les affectations de contenu d'un appareil |
| POST | `/` | JWT | — | Enregistre les affectations de contenu des appareils (par lot) |
| DELETE | `/:id` | JWT | — | Supprime une affectation de contenu d'appareil |

## SMS

Chemin de base : `/messaging/texting`

Gère les fournisseurs de SMS, l'envoi de textos aux groupes et le suivi des livraisons.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/providers` | JWT | — | Charge les fournisseurs de SMS de l'église (les identifiants sont masqués) |
| GET | `/status` | JWT | — | `{ enabled }` — indique si l'église dispose d'un fournisseur de SMS activé. Accessible à tout utilisateur connecté de l'église ; sert à n'afficher les options **Texto** que lorsque l'envoi de textos est possible |
| GET | `/inboundUrl` | JWT | `texting.send` ou `settings.edit` | `{ url }` — l'URL du webhook entrant (STOP) de l'église, à coller dans le fournisseur |
| POST | `/inbound/:churchId/:token` | Public | — | Webhook de réception des messages du fournisseur. `token` est un HMAC de l'identifiant de l'église. Une réponse qui correspond exactement à un mot d'arrêt (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marque chaque personne correspondante comme `optedOut` et désactive son `allowSms`. Renvoie `{ optedOut: <nombre> }` ; les autres réponses renvoient `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Aperçu des destinataires d'un texto de groupe (nombre de personnes admissibles, désabonnées, sans numéro de téléphone) |
| GET | `/sent` | JWT | — | Charge tous les enregistrements de textos envoyés par l'église |
| GET | `/sent/:id/details` | JWT | — | Charge un texto envoyé avec les journaux de livraison par destinataire |
| POST | `/providers` | JWT | — | Enregistre les fournisseurs de SMS (par lot). Chiffre les identifiants d'API |
| POST | `/send` | JWT | — | Envoie un SMS à tous les membres admissibles d'un groupe. Corps : `{ groupId, message }`. Les champs de fusion (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sont résolus pour chaque destinataire |
| POST | `/sendPerson` | JWT | — | Envoie un SMS à une seule personne. Corps : `{ personId, phoneNumber, message }`. Les champs de fusion sont résolus, et c'est le texte résolu qui est journalisé |
| DELETE | `/providers/:id` | JWT | — | Supprime un fournisseur de SMS |

### Exemple : envoyer un texto à un groupe

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Rappel : le culte commence à 10 h ce dimanche !"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 42,
  "successCount": 40,
  "failCount": 2,
  "optedOutCount": 5,
  "noPhoneCount": 3
}
```

## Modèles d'e-mail

Chemin de base : `/messaging/emailTemplates`

Gère les modèles d'e-mail réutilisables et l'envoi d'e-mails basés sur des modèles aux groupes.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/` | JWT | — | Charge tous les modèles d'e-mail de l'église |
| GET | `/:id` | JWT | — | Charge un modèle d'e-mail par identifiant |
| GET | `/sendStatus` | JWT | `groupMembers.edit` ou `tasks.admin` | État de l'envoi d'e-mails de groupe de l'église : `{ approved, paused, remaining, requested }`. La boîte de dialogue Envoyer un e-mail de B1Admin et l'action **Envoyer un e-mail** des flux de travail s'en servent pour avertir lorsque les e-mails ne partiront pas |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Demande au soutien d'approuver l'église pour l'envoi d'e-mails de groupe (au plus une fois par église et par semaine) |
| GET | `/preview/:groupId` | JWT | — | Aperçu de la livraison d'e-mails à un groupe (nombre de destinataires admissibles, membres sans adresse e-mail) |
| POST | `/` | JWT | — | Crée ou met à jour des modèles d'e-mail (par lot) |
| POST | `/send` | JWT | — | Envoie un e-mail basé sur un modèle à tous les membres d'un groupe. Corps : `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Supprime un modèle d'e-mail |

### Exemple : envoyer un e-mail à un groupe

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "Mise à jour de la semaine - {{churchName}}",
  "htmlContent": "<p>Bonjour {{firstName}},</p><p>Voici ce qui se passe cette semaine...</p>"
}
```

```json
{
  "totalMembers": 50,
  "recipientCount": 45,
  "successCount": 44,
  "failCount": 1,
  "noEmailCount": 5
}
```

**Champs de fusion pris en charge :** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## Adresses IP bloquées

Chemin de base : `/messaging/blockedips`

(ancien) Blocage d'adresses IP pour le clavardage des diffusions en direct. Le client B1App n'appelle plus `POST /` — le blocage IP a été retiré lors de la migration vers la diffusion unifiée. La route `/clear` est toujours appelée de serveur à serveur par `StreamingServiceController` lorsque des services de diffusion sont enregistrés.

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| POST | `/` | JWT | — | (ancien) Enregistre les adresses IP bloquées (par lot). Aucun client actif |
| POST | `/clear` | JWT | — | Efface toutes les adresses IP bloquées pour des services précis. Corps : `[{ serviceId, churchId }]` |

## Journaux de livraison

Chemin de base : `/messaging/deliverylogs`

Suit l'état de livraison des messages envoyés (SMS, notifications push, e-mails).

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Charge les journaux de livraison selon le type de contenu et l'identifiant |
| GET | `/person/:personId` | JWT | — | Charge les journaux de livraison d'une personne. `?startDate=&endDate=` facultatif pour filtrer |
| GET | `/recent` | JWT | — | Charge les journaux de livraison récents de l'église. `?limit=` facultatif (100 par défaut) |
| GET | `/:id` | JWT | — | Charge un journal de livraison par identifiant |

## Pages connexes

- [Architecture en temps réel](../../realtime.md) -- protocole WebSocket, abonnements aux salles et cadre de diffusion unifié
- [Notifications push Web](../../web-push.md) -- inscription et livraison des notifications push dans le navigateur
- [Points de terminaison des membres](./membership.md) -- personnes, groupes, rôles et identité de base
- [Points de terminaison de présence](./attendance.md) -- suivi des services et des visites
- [Authentification et autorisations](./authentication.md) -- flux de connexion, JWT, OAuth, modèle d'autorisation
- [Structure du module](../module-structure.md) -- modèles d'organisation du code
