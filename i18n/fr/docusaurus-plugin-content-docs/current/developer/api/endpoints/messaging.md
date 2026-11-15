---
title: "Points de terminaison de messagerie"
description: "Référence des points de terminaison de l'API de messagerie ChurchApps : conversations, règles d'accès aux notes, messages texte, modèles de courriel, notifications et appareils."
---

# Points de terminaison de messagerie

<div class="article-intro">

Le module Messagerie gère les conversations en temps réel, les messages de discussion, les notifications push, la livraison de SMS et de courriels, les connexions WebSocket, la messagerie privée, l'enregistrement des appareils et les fournisseurs de messages texte. Il fournit la couche de communication utilisée par toutes les applications ChurchApps, à la fois pour le chat des diffusions en direct et pour les notifications asynchrones.

</div>

**Chemin de base :** `/messaging`

## Conversations {#conversations}

Chemin de base : `/messaging/conversations`

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Charge des conversations par identifiants séparés par des virgules, avec les premiers et derniers messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Charge les conversations d'un contenu avec des messages paginés (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Récupère les conversations de type publication des groupes de l'utilisateur courant |
| GET | `/posts/group/:groupId` | JWT | — | Récupère les conversations de type publication d'un groupe précis |
| GET | `/notes/feed?section=&limit=&before=` | JWT | — | Notes les plus récentes de tous les enregistrements pour la page Notes de B1 Admin. `section` vaut `people`, `groups`, `events` ou `workflows` (400 sinon) ; `limit` vaut 25 par défaut (max 100) ; `before` est le curseur de la page précédente. Chaque note respecte encore la règle de son propre type (People Edit / permission des notes confidentielles, responsables du groupe, lecteurs de l'événement, lecteurs de la fiche de processus), de sorte que les appelants ne voient que les notes qu'ils pourraient ouvrir. Le texte des notes est tronqué à 300 caractères |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Récupère ou crée la conversation courante d'un contenu (déchiffre automatiquement contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Charge les conversations selon le type et l'identifiant du contenu |
| GET | `/:churchId/:id` | Public | — | Charge une conversation unique par identifiant |
| POST | `/` | JWT | — | Crée ou met à jour des conversations (par lot) |
| POST | `/start` | JWT | — | Démarre une nouvelle conversation avec un premier message de commentaire |
| DELETE | `/:churchId/:id` | JWT | — | Supprime une conversation |

### Contrôle d'accès aux notes de personne {#person-notes-access-control}

Les conversations de `contentType: "person"` (l'onglet Notes d'une fiche de personne) ou de `contentType: "personConfidential"` (la section Notes confidentielles) sont protégées sur chaque chemin de lecture et d'écriture, y compris sur les routes publiques ci-dessus, qui renvoient `401` pour ces types de contenu. `person` exige l'autorisation **People / Edit** de MembershipApi ; `personConfidential` exige **People / View Confidential Notes**. Pour les clés API à portée limitée, `people:write` couvre les deux actions (l'utilisateur de la clé doit toujours détenir l'autorisation de rôle sous-jacente).

### Contrôle d'accès aux notes de groupe et d'événement {#group-and-event-notes-access-control}

Deux autres types de notes sont protégés de la même façon, sur chaque chemin de lecture et d'écriture (y compris les routes publiques ci-dessus), et ne sont jamais ouverts à la publication anonyme :

- **`groupNote`** (`contentId` = identifiant du groupe) -- le fil **Notes du responsable** d'un groupe. Seuls les responsables de ce groupe (`leaderGroupIds` dans le JWT) peuvent lire ou publier. Aucune autorisation du personnel n'accorde l'accès, y compris `content.edit` et les autorisations d'appartenance aux groupes.
- **`eventNote`** (`contentId` = identifiant de l'événement) -- les notes d'un événement du calendrier. Le personnel disposant de `content.edit` ou de **Calendars / Admin** peut toujours lire et publier. Sinon, l'accès suit le `notesViewRole` (lecture) et le `notesPostRole` (publication) de l'événement : `staff` (valeur par défaut, utilisée lorsque le champ vaut `null`) n'autorise personne d'autre, `leaders` autorise les responsables du groupe de l'événement, et `members` autorise les membres et responsables du groupe de l'événement. Un événement sans `groupId` est réservé au personnel.

### Contrôle d'accès aux notes des fiches de processus {#workflow-card-notes-access-control}

Les conversations de `contentType: "workflowCard"` (les notes d'une fiche de processus, où `contentId` est l'identifiant de la tâche de la fiche) ne sont lisibles et modifiables que par une personne pouvant ouvrir cette fiche : un utilisateur disposant de l'autorisation DoingApi **Tasks / View**, ou la personne ou le groupe auquel la fiche est assignée, créée ou qui la concerne. Tous les autres reçoivent `401` sur chaque chemin de lecture, y compris les routes publiques ci-dessus. La conversation d'une fiche est rattachée via la fiche elle-même avec `POST /doing/tasks/:id/conversation` (corps `{ "conversationId": "..." }` ; la première conversation rattachée l'emporte), que peuvent appeler les éditeurs de la fiche et son assigné.

### Exemple : démarrer une conversation {#example-start-a-conversation}

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

## Messages {#messages}

Chemin de base : `/messaging/messages`

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Charge tous les messages d'une conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Charge tous les messages d'une conversation (rattrapage public pour le chat en direct) |
| GET | `/:churchId/:id` | Public | — | Charge un message unique par identifiant |
| POST | `/` | JWT | — | Enregistre des messages (par lot). Envoie des mises à jour en temps réel et déclenche des notifications. La modification d'un message existant exige d'en être l'auteur ou de détenir `content.edit` ; l'auteur enregistré ne peut jamais être réassigné |
| POST | `/send` | Public | — | Envoie des messages (par lot, public). Envoie des mises à jour en temps réel via WebSocket et déclenche des notifications |
| POST | `/setCallout` | JWT | — | (ancien) Diffuse un message d'encadré en temps réel. Aucun client actif ; le chat des diffusions en direct n'affiche plus les encadrés |
| DELETE | `/:churchId/:id` | JWT | — | Supprime un message et diffuse la suppression en temps réel. Voir [Modération des messages](#message-moderation) |

### Modération des messages {#message-moderation}

La suppression d'un message est autorisée pour :

- l'auteur du message ;
- le personnel disposant de `content.edit` (partout dans l'église) ;
- les **responsables de groupe**, pour les conversations de `contentType` `group` ou `groupAnnouncement` dont le `contentId` est un groupe qu'ils dirigent (`leaderGroupIds` dans le JWT).

Les conversations de notes de personne (`person` / `personConfidential`) ne sont jamais modérées par les responsables — elles utilisent les autorisations de notes (`people.edit`, `people.viewConfidentialNotes`).

Les responsables ne peuvent que supprimer, sans modifier : réécrire le message d'un autre membre reste réservé à l'auteur et au personnel disposant de `content.edit`.

### Exemple : envoyer un message {#example-send-a-message}

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

## Messages privés {#private-messages}

Chemin de base : `/messaging/privatemessages`

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charge tous les messages privés de l'utilisateur courant (inclut le dernier message de chaque conversation, marque tout comme lu) |
| GET | `/existing/:personId` | JWT | — | Trouve une conversation privée existante avec une personne précise |
| GET | `/:id` | JWT | — | Charge un message privé par identifiant (efface la notification s'il est adressé à l'utilisateur courant) |
| POST | `/` | JWT | — | Envoie des messages privés (par lot). Déclenche une notification push au destinataire |

## Notifications {#notifications}

Chemin de base : `/messaging/notifications`

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Récupère le nombre de notifications non lues de l'utilisateur courant |
| GET | `/my` | JWT | — | Charge toutes les notifications de l'utilisateur courant (marque tout comme lu) |
| GET | `/tmpEmail` | Public | — | Déclenche le récapitulatif quotidien des notifications par courriel (point de terminaison de débogage/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Charge les notifications d'une personne précise |
| GET | `/:churchId/:id` | JWT | — | Charge une notification par identifiant |
| POST | `/` | JWT | — | Crée ou met à jour des notifications (par lot) |
| POST | `/create` | JWT | — | Crée des notifications pour plusieurs personnes. Corps : `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marque toutes les notifications d'une personne comme lues |
| POST | `/sendTest` | JWT | — | Envoie une notification push de test. Corps : `{ personId, title }` |
| POST | `/ping` | Public | — | Crée une notification à partir d'un déclencheur externe. Corps : `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Supprime une notification |
| GET | `/groupPreview/:groupId` | JWT | `groupMembers.edit` | Compte le nombre de membres d'un groupe qu'un envoi push atteindrait |
| GET | `/churchPreview` | JWT | `content.edit` | Compte le nombre de personnes qu'un envoi push à tous les utilisateurs de l'application atteindrait |
| POST | `/group/send` | JWT | `groupMembers.edit` | Envoie immédiatement un push aux membres d'un groupe |

### Exemple : créer des notifications {#example-create-notifications}

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

## Notifications programmées {#scheduled-notifications}

Chemin de base : `/messaging/scheduledNotifications`

Pushes programmés à l'avance. `audience` vaut `church` (tous les utilisateurs de l'application ; exige `content.edit`) ou `group` (exige `groupMembers.edit` et un `groupId`). Le titre est limité à 80 caractères et le message à 240. Une ligne échue est envoyée par le minuteur d'une minute.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | `groupMembers.edit` ou `content.edit` | Liste les notifications programmées et récentes de l'église |
| POST | `/` | JWT | selon l'audience | Crée une notification programmée, ou la met à jour lorsque `id` est défini. Corps : `{ id?, audience, groupId?, title, message, link?, imageUrl?, sendAt }`. La mise à jour d'une notification qui n'est plus en attente renvoie 409 |
| POST | `/:id/sendNow` | JWT | selon l'audience | Envoie maintenant une notification en attente. Renvoie 409 si elle a déjà été envoyée, annulée ou est en cours d'envoi |
| DELETE | `/:id` | JWT | selon l'audience | Annule une notification en attente, ou retire de la liste une notification envoyée, en échec ou annulée. Renvoie 409 pendant son envoi |
| DELETE | `/` | JWT | `groupMembers.edit` ou `content.edit` | Supprime toutes les notifications envoyées, en échec et annulées pour les audiences auxquelles l'utilisateur peut envoyer. Renvoie `{ deleted }` |

## Préférences de notification {#notification-preferences}

Chemin de base : `/messaging/notificationpreferences`

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/categories` | JWT | — | Liste les catégories de notification avec leurs canaux par défaut et autorisés |
| GET | `/my` | JWT | — | Charge les préférences de notification de l'utilisateur courant (crée les valeurs par défaut s'il n'en existe aucune) |
| POST | `/` | JWT | — | Enregistre les préférences de l'utilisateur courant. Corps : l'un quelconque de `allowPush`, `allowSms`, `emailFrequency`, `masterMute`, `quietHoursStart`, `quietHoursEnd`, `timeZone`, `maxPushPerDay`, plus `overrides: [{ categoryKey, channel, optedIn }]` facultatif (le canal peut être `push`, `email`, `in_app` ou `sms` ; les catégories verrouillées sont ignorées). `allowSms` est l'accord du membre pour les rappels par texto. Le corps au format tableau de lignes (ancien format) est toujours accepté |

## Connexions {#connections}

Chemin de base : `/messaging/connections`

Gère les connexions WebSocket/temps réel pour le chat, les conversations de groupe, les messages privés et les diffusions en direct. Voir [Architecture temps réel](../../realtime.md) pour le protocole de bout en bout.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Charge toutes les connexions d'une conversation |
| POST | `/` | Public | — | Enregistre des connexions (par lot). Déclenche une diffusion de présence sur la conversation. Éléments du corps : `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Met à jour le nom affiché d'une connexion via son identifiant de socket. Corps : `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Retire une connexion d'une conversation. Déclenche une diffusion de présence |
| POST | `/tmpSendAlert` | Public | — | Envoie une alerte de notification aux connexions d'une personne. Corps : `{ churchId, personId }` |

## Appareils {#devices}

Chemin de base : `/messaging/devices`

Gère l'enregistrement des appareils pour les notifications push et le jumelage de contenu (par ex. l'application Lessons sur les écrans de télévision).

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Inscrit ou met à jour un appareil (enregistrement push mobile). Correspond par jeton FCM ou identifiant d'appareil |
| POST | `/enrollAnon` | Public | — | Inscrit un appareil anonyme et génère un code de jumelage à 4 caractères |
| POST | `/` | Public | — | Enregistre des appareils (par lot) |
| GET | `/pair/:pairingCode` | JWT | — | Jumelle un appareil à l'aide de son code de jumelage. `?contentType=&contentId=` facultatif pour assigner un contenu |
| GET | `/status/:deviceId` | Public | — | Vérifie l'état de jumelage d'un appareil |
| GET | `/:churchId` | JWT | — | Charge tous les appareils d'une église |
| GET | `/:churchId/person/:personId` | JWT | — | Charge tous les appareils d'une personne |
| GET | `/:churchId/:id` | JWT | — | Charge un appareil par identifiant |
| DELETE | `/:churchId/:id` | JWT | — | Supprime un appareil |

### Exemple : inscrire un appareil {#example-enroll-a-device}

```
POST /messaging/devices/enroll
Authorization: Bearer <token>

{
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "deviceInfo": "iOS 17, iPhone 15"
}
```

```json
{
  "id": "device-001",
  "churchId": "church-789",
  "fcmToken": "firebase-token-abc123",
  "appName": "B1App",
  "label": "John's iPhone",
  "registrationDate": "2026-02-17T10:00:00.000Z",
  "lastActiveDate": "2026-02-17T10:00:00.000Z"
}
```

## Contenus des appareils {#device-contents}

Chemin de base : `/messaging/devicecontents`

Gère les assignations de contenu pour les appareils jumelés (par ex. la leçon affichée sur un téléviseur).

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Charge les assignations de contenu d'un appareil |
| POST | `/` | JWT | — | Enregistre les assignations de contenu d'appareils (par lot) |
| DELETE | `/:id` | JWT | — | Supprime une assignation de contenu d'appareil |

## Messages texte {#texting}

Chemin de base : `/messaging/texting`

Gère les fournisseurs de SMS, l'envoi de messages texte de groupe et le suivi des livraisons.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/providers` | JWT | — | Charge les fournisseurs de messages texte de l'église (les identifiants sont masqués) |
| GET | `/status` | JWT | — | `{ enabled }` — indique si l'église a un fournisseur de messages texte activé. Tout utilisateur connecté de l'église ; sert à n'afficher les options **Texto** que lorsque des textos peuvent être envoyés |
| GET | `/inboundUrl` | JWT | `texting.send` ou `settings.edit` | `{ url }` — l'URL du webhook entrant (STOP) de l'église à coller chez le fournisseur |
| POST | `/inbound/:churchId/:token` | Public | — | Webhook de messages entrants du fournisseur. `token` est un HMAC de l'identifiant de l'église. Une réponse qui est exactement un mot d'arrêt (`STOP`, `STOPALL`, `UNSUBSCRIBE`, `CANCEL`, `END`, `QUIT`, `OPTOUT`, `REVOKE`) marque chaque personne correspondante comme `optedOut` et désactive son `allowSms`. Renvoie `{ optedOut: <count> }` ; les autres réponses renvoient `{ optedOut: 0 }` |
| GET | `/preview/:groupId` | JWT | — | Prévisualise les destinataires d'un texto de groupe (nombre de destinataires éligibles, désabonnés, sans téléphone) |
| GET | `/sent` | JWT | — | Charge tous les enregistrements de textos envoyés par l'église |
| GET | `/sent/:id/details` | JWT | — | Charge un texto envoyé avec les journaux de livraison par destinataire |
| POST | `/providers` | JWT | — | Enregistre les fournisseurs de messages texte (par lot). Chiffre les identifiants API |
| POST | `/send` | JWT | — | Envoie un SMS à tous les membres éligibles d'un groupe. Corps : `{ groupId, message }`. Les champs de fusion (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) sont résolus pour chaque destinataire |
| POST | `/sendPerson` | JWT | — | Envoie un SMS à une seule personne. Corps : `{ personId, phoneNumber, message }`. Les champs de fusion sont résolus, et c'est le texte résolu qui est journalisé |
| DELETE | `/providers/:id` | JWT | — | Supprime un fournisseur de messages texte |

### Exemple : envoyer un texto de groupe {#example-send-group-text}

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

## Modèles de courriel {#email-templates}

Chemin de base : `/messaging/emailTemplates`

Gère les modèles de courriel réutilisables et l'envoi de courriels à partir de modèles aux groupes.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/` | JWT | — | Charge tous les modèles de courriel de l'église |
| GET | `/:id` | JWT | — | Charge un modèle de courriel par identifiant |
| GET | `/sendStatus` | JWT | `groupMembers.edit` ou `tasks.admin` | Le statut des courriels de groupe de l'église : `{ approved, paused, remaining, requested }`. La boîte de dialogue Envoyer un courriel de B1Admin et l'action **Envoyer un courriel** des workflows s'en servent pour avertir lorsque les courriels ne partiront pas |
| POST | `/requestApproval` | JWT | `groupMembers.edit` | Demande au support d'approuver l'église pour les courriels de groupe (au plus une fois par église et par semaine) |
| GET | `/preview/:groupId` | JWT | — | Prévisualise la livraison de courriels pour un groupe (nombre de destinataires éligibles, membres sans courriel) |
| POST | `/` | JWT | — | Crée ou met à jour des modèles de courriel (par lot) |
| POST | `/send` | JWT | — | Envoie un courriel à partir d'un modèle à tous les membres d'un groupe. Corps : `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Supprime un modèle de courriel |

### Exemple : envoyer un courriel à un groupe {#example-send-email-to-group}

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

## Adresses IP bloquées {#blocked-ips}

Chemin de base : `/messaging/blockedips`

(ancien) Blocage d'adresses IP pour le chat des diffusions en direct. Le client B1App n'appelle plus `POST /` — le blocage IP a été supprimé lors de la migration vers la livraison unifiée. La route `/clear` est toujours appelée de serveur à serveur par `StreamingServiceController` lorsque les services de diffusion sont enregistrés.

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| POST | `/` | JWT | — | (ancien) Enregistre des adresses IP bloquées (par lot). Aucun client actif |
| POST | `/clear` | JWT | — | Supprime toutes les adresses IP bloquées pour des services précis. Corps : `[{ serviceId, churchId }]` |

## Journaux de livraison {#delivery-logs}

Chemin de base : `/messaging/deliverylogs`

Suit l'état de livraison des messages envoyés (SMS, notifications push, courriels).

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Charge les journaux de livraison selon le type et l'identifiant du contenu |
| GET | `/person/:personId` | JWT | — | Charge les journaux de livraison d'une personne. `?startDate=&endDate=` facultatif pour filtrer |
| GET | `/recent` | JWT | — | Charge les journaux de livraison récents de l'église. `?limit=` facultatif (100 par défaut) |
| GET | `/:id` | JWT | — | Charge un journal de livraison par identifiant |

## Pages connexes {#related-pages}

- [Architecture temps réel](../../realtime.md) -- Protocole WebSocket, abonnements aux salles et cadre de livraison unifié
- [Notifications push web](../../web-push.md) -- Inscription et livraison des notifications push du navigateur
- [Points de terminaison Membership](./membership.md) -- Personnes, groupes, rôles et identité de base
- [Points de terminaison Attendance](./attendance.md) -- Suivi des services et des visites
- [Authentification et autorisations](./authentication.md) -- Flux de connexion, JWT, OAuth, modèle d'autorisations
- [Structure des modules](../module-structure.md) -- Modèles d'organisation du code
