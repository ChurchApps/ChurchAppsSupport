---
title: "Points de terminaison de messagerie"
---

# Points de terminaison de messagerie

<div class="article-intro">

Le module Messagerie gère les conversations en temps réel, les messages de chat, les notifications push, l'envoi de SMS et d'e-mails, les connexions WebSocket, la messagerie privée, l'enregistrement des appareils et les fournisseurs de messagerie texte. Il fournit la couche de communication utilisée par toutes les applications ChurchApps, aussi bien pour le chat du flux en direct que pour les notifications asynchrones.

</div>

**Chemin de base :** `/messaging`

## Conversations

Chemin de base : `/messaging/conversations`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Charger les conversations par identifiants séparés par des virgules, avec les premiers et derniers messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Charger les conversations d'un contenu avec les messages paginés (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtenir les conversations de type publication pour les groupes de l'utilisateur actuel |
| GET | `/posts/group/:groupId` | JWT | — | Obtenir les conversations de type publication pour un groupe précis |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Obtenir ou créer la conversation actuelle pour un contenu (déchiffre automatiquement contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Charger les conversations par type de contenu et identifiant |
| GET | `/:churchId/:id` | Public | — | Charger une conversation par identifiant |
| POST | `/` | JWT | — | Créer ou mettre à jour des conversations (par lot) |
| POST | `/start` | JWT | — | Démarrer une nouvelle conversation avec un message de commentaire initial |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer une conversation |

### Contrôle d'accès aux notes de personne

Les conversations avec `contentType: "person"` (l'onglet Notes d'une fiche de personne) ou `contentType: "personConfidential"` (la section Notes confidentielles) sont protégées sur chaque chemin de lecture et d'écriture, y compris sur les routes publiques ci-dessus, qui renvoient `401` pour ces types de contenu. `person` exige la permission MembershipApi **Personnes / Modifier** ; `personConfidential` exige **Personnes / Voir les notes confidentielles**. Pour les clés API à portée limitée, `people:write` couvre les deux actions (l'utilisateur de la clé doit tout de même détenir la permission du rôle sous-jacent).

### Contrôle d'accès aux notes de groupe et d'événement {#group-and-event-notes-access-control}

Deux autres types de notes sont protégés de la même façon, sur chaque chemin de lecture et d'écriture (y compris les routes publiques ci-dessus), et ne sont jamais ouverts à une publication anonyme :

- **`groupNote`** (`contentId` = identifiant du groupe) -- le fil **Notes des responsables** d'un groupe. Seuls les responsables de ce groupe (`leaderGroupIds` dans le JWT) peuvent lire ou publier. Aucune permission du personnel n'accorde l'accès, y compris `content.edit` et les permissions d'appartenance aux groupes.
- **`eventNote`** (`contentId` = identifiant de l'événement) -- les notes d'un événement de calendrier. Le personnel disposant de `content.edit` ou de **Calendriers / Administration** peut toujours lire et publier. Sinon, l'accès suit `notesViewRole` (lecture) et `notesPostRole` (publication) de l'événement : `staff` (la valeur par défaut, utilisée lorsque le champ est `null`) n'autorise personne d'autre, `leaders` autorise les responsables du groupe de l'événement, et `members` autorise les membres et responsables du groupe de l'événement. Un événement sans `groupId` est réservé au personnel.

### Contrôle d'accès aux notes des cartes de workflow

Les conversations avec `contentType: "workflowCard"` (les notes d'une carte de workflow, où `contentId` est l'identifiant de la tâche de la carte) ne peuvent être lues et modifiées que par une personne pouvant ouvrir cette carte : un utilisateur disposant de la permission DoingApi **Tâches / Voir**, ou la personne ou le groupe auquel la carte est assignée, par qui elle a été créée ou qui la concerne. Toute autre personne reçoit `401` sur chaque chemin de lecture, y compris les routes publiques ci-dessus. La conversation d'une carte est rattachée par la carte elle-même, avec `POST /doing/tasks/:id/conversation` (corps `{ "conversationId": "..." }` ; la première conversation rattachée l'emporte), que peuvent appeler les éditeurs de la carte et son assigné.

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
| GET | `/:churchId/:id` | Public | — | Charger un message par identifiant |
| POST | `/` | JWT | — | Enregistrer des messages (par lot). Envoie des mises à jour en temps réel et déclenche des notifications. La modification d'un message existant exige d'en être l'auteur ou de détenir `content.edit` ; l'auteur enregistré ne peut jamais être modifié |
| POST | `/send` | Public | — | Envoyer des messages (par lot, public). Envoie des mises à jour en temps réel via WebSocket et déclenche des notifications |
| POST | `/setCallout` | JWT | — | (ancien) Diffuser un message d'encadré en temps réel. Aucun client actif ; le chat du flux en direct n'affiche plus les encadrés |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer un message et diffuser la suppression en temps réel. Voir [Modération des messages](#message-moderation) |

### Modération des messages {#message-moderation}

La suppression d'un message est autorisée pour :

- l'auteur du message ;
- le personnel disposant de `content.edit` (dans toute l'église) ;
- les **responsables de groupe**, pour les conversations de `contentType` `group` ou `groupAnnouncement` dont le `contentId` est un groupe qu'ils dirigent (`leaderGroupIds` dans le JWT).

Les conversations de notes de personne (`person` / `personConfidential`) ne sont jamais modérées par les responsables ; elles utilisent à la place les permissions de notes (`people.edit`, `people.viewConfidentialNotes`).

Les responsables ne peuvent que supprimer, pas modifier : réécrire le message d'un autre membre reste réservé à l'auteur et au personnel disposant de `content.edit`.

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
| GET | `/existing/:personId` | JWT | — | Trouver une conversation privée existante avec une personne donnée |
| GET | `/:id` | JWT | — | Charger un message privé par identifiant (efface la notification si le message est adressé à l'utilisateur actuel) |
| POST | `/` | JWT | — | Envoyer des messages privés (par lot). Déclenche une notification push pour le destinataire |

## Notifications

Chemin de base : `/messaging/notifications`

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtenir le nombre de notifications non lues de l'utilisateur actuel |
| GET | `/my` | JWT | — | Charger toutes les notifications de l'utilisateur actuel (marque tout comme lu) |
| GET | `/tmpEmail` | Public | — | Déclencher le récapitulatif quotidien des notifications par e-mail (point de terminaison de débogage/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Charger les notifications d'une personne donnée |
| GET | `/:churchId/:id` | JWT | — | Charger une notification par identifiant |
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
| POST | `/` | JWT | — | Enregistrer les préférences de l'utilisateur actuel. Corps : l'un quelconque de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus `overrides: [{ categoryKey, channel, optedIn }]` facultatif (le canal peut être `push`, `email`, `in_app` ou `sms` ; les catégories verrouillées sont ignorées). `allowSms` est l'accord du membre pour recevoir les rappels par SMS. Un corps au format ancien, sous forme de tableau de lignes, est toujours accepté |

## Connexions

Chemin de base : `/messaging/connections`

Gère les connexions WebSocket/temps réel pour le chat, les conversations de groupe, les messages privés et le flux en direct. Voir [Architecture temps réel](../../realtime) pour le protocole de bout en bout.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Charger toutes les connexions d'une conversation |
| POST | `/` | Public | — | Enregistrer des connexions (par lot). Déclenche une diffusion de présence sur la conversation. Éléments du corps : `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Mettre à jour le nom affiché d'une connexion à partir de son identifiant de socket. Corps : `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Retirer une connexion d'une conversation. Déclenche une diffusion de présence |
| POST | `/tmpSendAlert` | Public | — | Envoyer une alerte de notification aux connexions d'une personne. Corps : `{ churchId, personId }` |

## Appareils

Chemin de base : `/messaging/devices`

Gère l'enregistrement des appareils pour les notifications push et le couplage de contenu (par ex. l'application Lessons sur les téléviseurs).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Inscrire ou mettre à jour un appareil (enregistrement push mobile). Correspondance par jeton FCM ou identifiant d'appareil |
| POST | `/enrollAnon` | Public | — | Inscrire un appareil anonyme et générer un code de couplage à 4 caractères |
| POST | `/` | Public | — | Enregistrer des appareils (par lot) |
| GET | `/pair/:pairingCode` | JWT | — | Coupler un appareil à l'aide de son code de couplage. `?contentType=&contentId=` facultatif pour attribuer du contenu |
| GET | `/status/:deviceId` | Public | — | Vérifier l'état de couplage d'un appareil |
| GET | `/:churchId` | JWT | — | Charger tous les appareils d'une église |
| GET | `/:churchId/person/:personId` | JWT | — | Charger tous les appareils d'une personne |
| GET | `/:churchId/:id` | JWT | — | Charger un appareil par identifiant |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer un appareil |

### Exemple : inscrire un appareil

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

Gère les attributions de contenu pour les appareils couplés (par ex. quelle leçon est affichée sur un téléviseur).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Charger les attributions de contenu d'un appareil |
| POST | `/` | JWT | — | Enregistrer les attributions de contenu d'appareils (par lot) |
| DELETE | `/:id` | JWT | — | Supprimer une attribution de contenu d'appareil |

## Messagerie texte

Chemin de base : `/messaging/texting`

Gère les fournisseurs de SMS, la messagerie texte de groupe et le suivi des envois.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Charger les fournisseurs de messagerie texte de l'église (les identifiants sont masqués) |
| GET | `/status` | JWT | — | `{ enabled }` — indique si l'église dispose d'un fournisseur de messagerie texte activé. Accessible à tout utilisateur connecté de l'église ; sert à n'afficher les options **Texte** que lorsque les textos peuvent être envoyés |
| GET | `/inboundUrl` | JWT | `texting.send` ou `settings.edit` | `{ url }` — l'URL du webhook entrant (STOP) de l'église, à coller dans le fournisseur |
| POST | `/inbound/:churchId/:token` | Public | — | Webhook de message entrant du fournisseur. `token` est un HMAC de l'identifiant de l'église. Une réponse qui est exactement un mot d'arrêt (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marque chaque personne correspondante comme `optedOut` et désactive son `allowSms`. Renvoie `{ optedOut: <count> }` ; les autres réponses renvoient `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Prévisualiser les destinataires d'un texto de groupe (nombre de personnes éligibles, désabonnées et sans téléphone) |
| GET | `/sent` | JWT | — | Charger tous les enregistrements de textos envoyés de l'église |
| GET | `/sent/:id/details` | JWT | — | Charger un texto envoyé avec les journaux de livraison par destinataire |
| POST | `/providers` | JWT | — | Enregistrer les fournisseurs de messagerie texte (par lot). Chiffre les identifiants API |
| POST | `/send` | JWT | — | Envoyer un SMS à tous les membres éligibles d'un groupe. Corps : `{ groupId, message }`. Les champs de fusion (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sont résolus pour chaque destinataire |
| POST | `/sendPerson` | JWT | — | Envoyer un SMS à une seule personne. Corps : `{ personId, phoneNumber, message }`. Les champs de fusion sont résolus, et c'est le texte résolu qui est enregistré dans le journal |
| DELETE | `/providers/:id` | JWT | — | Supprimer un fournisseur de messagerie texte |

### Exemple : envoyer un texto à un groupe

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

Gère les modèles d'e-mail réutilisables et l'envoi d'e-mails à partir de modèles aux groupes.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charger tous les modèles d'e-mail de l'église |
| GET | `/:id` | JWT | — | Charger un modèle d'e-mail par identifiant |
| GET | `/preview/:groupId` | JWT | — | Prévisualiser l'envoi d'un e-mail à un groupe (nombre de destinataires éligibles, membres sans e-mail) |
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

## Adresses IP bloquées

Chemin de base : `/messaging/blockedips`

(ancien) Blocage d'adresses IP pour le chat du flux en direct. Le client B1App n'appelle plus `POST /` : le blocage IP a été supprimé lors de la migration vers la diffusion unifiée. La route `/clear` est toujours appelée de serveur à serveur par `StreamingServiceController` lors de l'enregistrement des services de diffusion.

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (ancien) Enregistrer des adresses IP bloquées (par lot). Aucun client actif |
| POST | `/clear` | JWT | — | Effacer toutes les adresses IP bloquées pour des services précis. Corps : `[{ serviceId, churchId }]` |

## Journaux de livraison

Chemin de base : `/messaging/deliverylogs`

Suit l'état de livraison des messages envoyés (SMS, notifications push, e-mails).

| Méthode | Chemin | Auth | Permission | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Charger les journaux de livraison par type et identifiant de contenu |
| GET | `/person/:personId` | JWT | — | Charger les journaux de livraison d'une personne. `?startDate=&endDate=` facultatif pour filtrer |
| GET | `/recent` | JWT | — | Charger les journaux de livraison récents de l'église. `?limit=` facultatif (100 par défaut) |
| GET | `/:id` | JWT | — | Charger un journal de livraison par identifiant |

## Pages connexes

- [Architecture temps réel](../../realtime) -- protocole WebSocket, abonnements aux salles et cadre de diffusion unifié
- [Notifications push web](../../web-push) -- inscription et envoi des notifications push du navigateur
- [Points de terminaison d'adhésion](./membership) -- personnes, groupes, rôles et identité de base
- [Points de terminaison de présence](./attendance) -- suivi des services et des visites
- [Authentification et permissions](./authentication) -- flux de connexion, JWT, OAuth, modèle de permissions
- [Structure des modules](../module-structure) -- schémas d'organisation du code
