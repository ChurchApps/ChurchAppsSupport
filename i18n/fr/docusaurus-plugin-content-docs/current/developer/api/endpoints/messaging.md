---
title: "Points de terminaison Messaging"
---

# Points de terminaison Messaging

<div class="article-intro">

Le module Messaging gère les conversations en temps réel, les messages de discussion, les notifications push, l'envoi de SMS et d'e-mails, les connexions WebSocket, les messages privés, l'enregistrement des appareils et les fournisseurs de SMS. Il fournit la couche de communication utilisée par toutes les applications ChurchApps, à la fois pour le chat des diffusions en direct et pour les notifications asynchrones.

</div>

**Chemin de base :** `/messaging`

## Conversations

Chemin de base : `/messaging/conversations`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Charger les conversations à partir d'IDs séparés par des virgules, avec les premiers et derniers messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Charger les conversations d'un contenu avec des messages paginés (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtenir les conversations de type publication des groupes de l'utilisateur actuel |
| GET | `/posts/group/:groupId` | JWT | — | Obtenir les conversations de type publication d'un groupe précis |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Les notes les plus récentes de tous les dossiers, pour la page Notes de B1 Admin. `section` vaut `people`, `groups`, `events` ou `workflows` (400 sinon) ; `limit` vaut 25 par défaut (100 au maximum) ; `before` est le curseur de la page précédente. Chaque note respecte encore la règle de son propre type (People Edit / permission des notes confidentielles, responsables du groupe, personnes ayant accès à l'événement, personnes ayant accès à la carte de workflow), de sorte que les appelants ne voient que les notes qu'ils pourraient ouvrir. Le texte des notes est tronqué à 300 caractères |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Obtenir ou créer la conversation en cours pour un contenu (décode automatiquement le contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Charger les conversations par type de contenu et ID |
| GET | `/:churchId/:id` | Public | — | Charger une conversation par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour des conversations (par lot) |
| POST | `/start` | JWT | — | Démarrer une nouvelle conversation avec un commentaire initial |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer une conversation |

### Contrôle d'accès aux notes de personne

Les conversations de `contentType: "person"` (l'onglet Notes d'une fiche personne) ou de `contentType: "personConfidential"` (la section Notes confidentielles) sont protégées sur chaque chemin de lecture et d'écriture, y compris les routes publiques ci-dessus, qui renvoient `401` pour ces types de contenu. `person` exige la permission **People / Edit** de MembershipApi ; `personConfidential` exige **People / View Confidential Notes**. Pour les clés d'API limitées, `people:write` couvre les deux actions (l'utilisateur de la clé doit toujours détenir la permission de rôle sous-jacente).

### Contrôle d'accès aux notes de groupe et d'événement {#group-and-event-notes-access-control}

Deux autres types de notes sont protégés de la même manière, sur chaque chemin de lecture et d'écriture (y compris les routes publiques ci-dessus), et ne sont jamais ouverts à une publication anonyme :

- **`groupNote`** (`contentId` = ID du groupe) — le flux **Leader notes** d'un groupe. Seuls les responsables de ce groupe (`leaderGroupIds` dans le JWT) peuvent lire ou publier. Aucune permission de personnel n'y donne accès, y compris `content.edit` et les permissions liées à l'appartenance au groupe.
- **`eventNote`** (`contentId` = ID de l'événement) — les notes d'un événement du calendrier. Le personnel disposant de `content.edit` ou de **Calendars / Admin** peut toujours lire et publier. Sinon, l'accès suit les champs `notesViewRole` (lecture) et `notesPostRole` (publication) de l'événement : `staff` (valeur par défaut, utilisée lorsque le champ vaut `null`) n'autorise personne d'autre, `leaders` autorise les responsables du groupe de l'événement, et `members` autorise les membres et les responsables du groupe de l'événement. Un événement sans `groupId` est réservé au personnel.

### Contrôle d'accès aux notes de carte de workflow

Les conversations de `contentType: "workflowCard"` (les notes d'une carte de workflow, où `contentId` est l'ID de la tâche de la carte) ne peuvent être lues et écrites que par quelqu'un qui peut ouvrir cette carte : un utilisateur disposant de la permission DoingApi **Tasks / View**, ou la personne ou le groupe auquel la carte est assignée, qui l'a créée ou qui la concerne. Toute autre personne reçoit `401` sur chaque chemin de lecture, y compris les routes publiques ci-dessus. La conversation d'une carte est rattachée via la carte elle-même avec `POST /doing/tasks/:id/conversation` (corps `{ "conversationId": "..." }` ; la première conversation rattachée l'emporte), ce que peuvent faire les éditeurs de la carte et son assigné.

### Exemple : démarrer une conversation

```
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
```

```json
{
  "id": "conv-456",
  "churchId": "church-789",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "dateCreated": "2026-02-17T10:00:00.000Z",
  "visibility": "public",
  "allowAnonymousPosts": false,
  "groupId": "group-123"
}
```

## Messages

Chemin de base : `/messaging/messages`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Charger tous les messages d'une conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Charger tous les messages d'une conversation (rattrapage public pour le chat en direct) |
| GET | `/:churchId/:id` | Public | — | Charger un message par ID |
| POST | `/` | JWT | — | Enregistrer des messages (par lot). Envoie des mises à jour en temps réel et déclenche les notifications. Modifier un message existant exige d'en être l'auteur ou de détenir `content.edit` ; l'auteur enregistré ne peut jamais être réassigné |
| POST | `/send` | Public | — | Envoyer des messages (par lot, public). Envoie des mises à jour en temps réel via WebSocket et déclenche les notifications |
| POST | `/setCallout` | JWT | — | (ancien) Diffuser en temps réel un message de mise en avant. Aucun client actif ; le chat du direct ne l'affiche plus |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer un message et diffuser la suppression en temps réel. Voir [Modération des messages](#message-moderation) |

### Modération des messages {#message-moderation}

La suppression d'un message est autorisée pour :

- l'auteur du message ;
- le personnel disposant de `content.edit` (dans toute l'église) ;
- les **responsables de groupe**, pour les conversations de `contentType` `group` ou `groupAnnouncement` dont le `contentId` est un groupe qu'ils dirigent (`leaderGroupIds` dans le JWT).

Les conversations de notes de personne (`person` / `personConfidential`) ne sont jamais modérées par les responsables : elles utilisent les permissions de notes (`people.edit`, `people.viewConfidentialNotes`).

Les responsables peuvent seulement supprimer, pas modifier : réécrire le message d'un autre membre reste réservé à l'auteur et au personnel disposant de `content.edit`.

### Exemple : envoyer un message

```
POST /messaging/messages/send

[
  {
    "churchId": "church-789",
    "conversationId": "conv-456",
    "personId": "person-123",
    "displayName": "John Smith",
    "content": "Hello everyone!",
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
    "displayName": "John Smith",
    "timeSent": "2026-02-17T10:05:00.000Z",
    "content": "Hello everyone!",
    "messageType": "comment"
  }
]
```

## Messages privés

Chemin de base : `/messaging/privatemessages`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charger tous les messages privés de l'utilisateur actuel (inclut le dernier message de chaque conversation, marque tout comme lu) |
| GET | `/existing/:personId` | JWT | — | Trouver une conversation privée existante avec une personne précise |
| GET | `/:id` | JWT | — | Charger un message privé par ID (efface la notification si le message est adressé à l'utilisateur actuel) |
| POST | `/` | JWT | — | Envoyer des messages privés (par lot). Déclenche une notification push pour le destinataire |

## Notifications

Chemin de base : `/messaging/notifications`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtenir le nombre de notifications non lues de l'utilisateur actuel |
| GET | `/my` | JWT | — | Charger toutes les notifications de l'utilisateur actuel (marque tout comme lu) |
| GET | `/tmpEmail` | Public | — | Déclencher le récapitulatif quotidien des notifications par e-mail (point de terminaison de débogage ou cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Charger les notifications d'une personne précise |
| GET | `/:churchId/:id` | JWT | — | Charger une notification par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour des notifications (par lot) |
| POST | `/create` | JWT | — | Créer des notifications pour plusieurs personnes. Corps : `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marquer toutes les notifications d'une personne comme lues |
| POST | `/sendTest` | JWT | — | Envoyer une notification push de test. Corps : `{ personId, title }` |
| POST | `/ping` | Public | — | Créer une notification à partir d'un déclencheur externe. Corps : `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer une notification |

### Exemple : créer des notifications

```
POST /messaging/notifications/create
Authorization: Bearer <token>

{
  "peopleIds": ["person-123", "person-456"],
  "contentType": "group",
  "contentId": "group-789",
  "message": "New event posted in your group",
  "link": "/groups/group-789"
}
```

## Préférences de notification

Chemin de base : `/messaging/notificationpreferences`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Lister les catégories de notification avec leurs canaux par défaut et autorisés |
| GET | `/my` | JWT | — | Charger les préférences de notification de l'utilisateur actuel (crée les valeurs par défaut si aucune n'existe) |
| POST | `/` | JWT | — | Enregistrer les préférences de l'utilisateur actuel. Corps : n'importe lequel de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus `overrides: [{ categoryKey, channel, optedIn }]` facultatif (channel peut valoir `push`, `email`, `in_app` ou `sms` ; les catégories verrouillées sont ignorées). `allowSms` correspond à l'accord du membre pour recevoir des rappels par SMS. Un corps sous forme de tableau de lignes reste accepté |

## Connexions

Chemin de base : `/messaging/connections`

Gère les connexions WebSocket et en temps réel pour le chat, les conversations de groupe, les messages privés et la diffusion en direct. Voir [Architecture temps réel](../../realtime) pour le protocole de bout en bout.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Charger toutes les connexions d'une conversation |
| POST | `/` | Public | — | Enregistrer des connexions (par lot). Déclenche une diffusion de la présence sur la conversation. Éléments du corps : `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Mettre à jour le nom affiché d'une connexion à partir de son ID de socket. Corps : `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Retirer une connexion d'une conversation. Déclenche une diffusion de la présence |
| POST | `/tmpSendAlert` | Public | — | Envoyer une alerte de notification aux connexions d'une personne. Corps : `{ churchId, personId }` |

## Appareils

Chemin de base : `/messaging/devices`

Gère l'enregistrement des appareils pour les notifications push et l'appairage de contenu (par exemple, l'application Lessons sur les écrans de télévision).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Enregistrer ou mettre à jour un appareil (inscription push mobile). Correspond par jeton FCM ou par ID d'appareil |
| POST | `/enrollAnon` | Public | — | Enregistrer un appareil anonyme et générer un code d'appairage à 4 caractères |
| POST | `/` | Public | — | Enregistrer des appareils (par lot) |
| GET | `/pair/:pairingCode` | JWT | — | Appairer un appareil à l'aide de son code d'appairage. `?contentType=&contentId=` facultatifs pour assigner du contenu |
| GET | `/status/:deviceId` | Public | — | Vérifier l'état d'appairage d'un appareil |
| GET | `/:churchId` | JWT | — | Charger tous les appareils d'une église |
| GET | `/:churchId/person/:personId` | JWT | — | Charger tous les appareils d'une personne |
| GET | `/:churchId/:id` | JWT | — | Charger un appareil par ID |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer un appareil |

### Exemple : enregistrer un appareil

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1Mobile",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Contenus des appareils

Chemin de base : `/messaging/devicecontents`

Gère les attributions de contenu pour les appareils appairés (par exemple, la leçon affichée sur un téléviseur).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Charger les attributions de contenu d'un appareil |
| POST | `/` | JWT | — | Enregistrer les attributions de contenu d'appareils (par lot) |
| DELETE | `/:id` | JWT | — | Supprimer une attribution de contenu d'appareil |

## SMS

Chemin de base : `/messaging/texting`

Gère les fournisseurs de SMS, l'envoi de SMS groupés et le suivi des livraisons.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Charger les fournisseurs de SMS de l'église (les identifiants sont masqués) |
| GET | `/status` | JWT | — | `{ enabled }` — indique si l'église dispose d'un fournisseur de SMS activé. Accessible à tout utilisateur connecté de l'église ; sert à n'afficher les options **Text** que lorsque l'envoi de SMS est possible |
| GET | `/inboundUrl` | JWT | `texting.send` ou `settings.edit` | `{ url }` — l'URL du webhook entrant (STOP) de l'église, à coller chez le fournisseur |
| POST | `/inbound/:churchId/:token` | Public | — | Webhook de message entrant du fournisseur. `token` est un HMAC de l'ID de l'église. Une réponse qui correspond exactement à un mot d'arrêt (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marque toutes les personnes correspondantes `optedOut` et désactive leur `allowSms`. Renvoie `{ optedOut: <count> }` ; les autres réponses renvoient `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Prévisualiser les destinataires d'un SMS groupé (nombre de personnes éligibles, ayant refusé, sans téléphone) |
| GET | `/sent` | JWT | — | Charger tous les enregistrements de SMS envoyés par l'église |
| GET | `/sent/:id/details` | JWT | — | Charger un SMS envoyé avec le journal de livraison par destinataire |
| POST | `/providers` | JWT | — | Enregistrer les fournisseurs de SMS (par lot). Chiffre les identifiants d'API |
| POST | `/send` | JWT | — | Envoyer un SMS à tous les membres éligibles d'un groupe. Corps : `{ groupId, message }`. Les champs de fusion (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sont résolus pour chaque destinataire |
| POST | `/sendPerson` | JWT | — | Envoyer un SMS à une seule personne. Corps : `{ personId, phoneNumber, message }`. Les champs de fusion sont résolus, et c'est le texte résolu qui est enregistré dans le journal |
| DELETE | `/providers/:id` | JWT | — | Supprimer un fournisseur de SMS |

### Exemple : envoyer un SMS à un groupe

```
POST /messaging/texting/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "message": "Reminder: Service starts at 10 AM this Sunday!"
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

Gère les modèles d'e-mail réutilisables et l'envoi d'e-mails à partir de modèles à des groupes.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charger tous les modèles d'e-mail de l'église |
| GET | `/:id` | JWT | — | Charger un modèle d'e-mail par ID |
| GET | `/sendStatus` | JWT | `groupMembers.edit` ou `tasks.admin` | Statut d'envoi d'e-mails aux groupes de l'église : `{ approved, paused, remaining, requested }`. La boîte de dialogue Send Email de B1Admin et l'action de workflow **Send email** s'en servent pour avertir lorsque l'e-mail ne partira pas |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Demander au support d'approuver l'église pour l'envoi d'e-mails aux groupes (au plus une fois par église et par semaine) |
| GET | `/preview/:groupId` | JWT | — | Prévisualiser la livraison d'e-mails à un groupe (nombre de destinataires éligibles, membres sans e-mail) |
| POST | `/` | JWT | — | Créer ou mettre à jour des modèles d'e-mail (par lot) |
| POST | `/send` | JWT | — | Envoyer un e-mail à partir d'un modèle à tous les membres d'un groupe. Corps : `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Supprimer un modèle d'e-mail |

### Exemple : envoyer un e-mail à un groupe

```
POST /messaging/emailTemplates/send
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "subject": "This Week's Update - {{churchName}}",
  "htmlContent": "<p>Hello {{firstName}},</p><p>Here's what's happening this week...</p>"
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

## IP bloquées

Chemin de base : `/messaging/blockedips`

(ancien) Blocage d'adresses IP pour le chat du direct. Le client B1App n'appelle plus `POST /` : le blocage d'IP a été supprimé lors de la migration vers la diffusion unifiée. La route `/clear` est encore invoquée de serveur à serveur par `StreamingServiceController` lorsque les services de diffusion sont enregistrés.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (ancien) Enregistrer des IP bloquées (par lot). Aucun client actif |
| POST | `/clear` | JWT | — | Effacer toutes les IP bloquées pour des services précis. Corps : `[{ serviceId, churchId }]` |

## Journaux de livraison

Chemin de base : `/messaging/deliverylogs`

Suit l'état de livraison des messages envoyés (SMS, notifications push, e-mails).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Charger les journaux de livraison par type de contenu et ID |
| GET | `/person/:personId` | JWT | — | Charger les journaux de livraison d'une personne. Filtres facultatifs `?startDate=&endDate=` |
| GET | `/recent` | JWT | — | Charger les journaux de livraison récents de l'église. `?limit=` facultatif (100 par défaut) |
| GET | `/:id` | JWT | — | Charger un journal de livraison par ID |

## Pages connexes

- [Architecture temps réel](../../realtime) -- Protocole WebSocket, abonnements aux salles et framework de diffusion unifié
- [Notifications web push](../../web-push) -- Inscription et livraison des notifications push du navigateur
- [Points de terminaison Membership](./membership) -- Personnes, groupes, rôles et identité de base
- [Points de terminaison Attendance](./attendance) -- Suivi des services et des visites
- [Authentification et permissions](./authentication) -- Flux de connexion, JWT, OAuth, modèle de permissions
- [Structure des modules](../module-structure) -- Modèles d'organisation du code
