---
title: "Points d'extrémité de la messagerie"
---

# Points d'extrémité de la messagerie

<div class="article-intro">

Le module Messagerie gère les conversations en temps réel, les messages de chat, les notifications push, la livraison SMS/email, les connexions WebSocket, la messagerie privée, l'enregistrement des appareils et les fournisseurs de textos. Il fournit la couche de communication utilisée dans toutes les applications ChurchApps pour les conversations de chat en direct et les notifications asynchrones.

</div>

**Chemin de base :** `/messaging`

## Conversations

Chemin de base : `/messaging/conversations`

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| GET | `/timeline/ids?ids=` | JWT | — | Charger des conversations par IDs séparés par des virgules avec premiers/derniers messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Charger les conversations pour le contenu avec les messages paginés (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtenir les conversations de type post pour les groupes de l'utilisateur actuel |
| GET | `/posts/group/:groupId` | JWT | — | Obtenir les conversations de type post pour un groupe spécifique |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Obtenir ou créer la conversation actuelle pour le contenu (déchiffrage auto contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Charger les conversations par type de contenu et ID |
| GET | `/:churchId/:id` | Public | — | Charger une conversation unique par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour les conversations (par lots) |
| POST | `/start` | JWT | — | Démarrer une nouvelle conversation avec un message de commentaire initial |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer une conversation |

### Contrôle d'accès des notes de personne

Les conversations avec `contentType: "person"` (l'onglet Notes sur un enregistrement de personne) ou `contentType: "personConfidential"` (la section Notes confidentielles) sont bloquées sur chaque chemin de lecture et d'écriture, y compris les itinéraires autrement publics ci-dessus, qui retournent `401` pour ces types de contenu. `person` requiert la permission MembershipApi **Personnes / Édition** ; `personConfidential` requiert **Personnes / Afficher les notes confidentielles**. Pour les clés API délimitées, `people:write` porte les deux actions (l'utilisateur de la clé doit toujours détenir la permission de rôle sous-jacente).

### Exemple : Démarrer une conversation

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
|--------|--------|------|------------|-------------|
| GET | `/conversation/:conversationId` | JWT | — | Charger tous les messages pour une conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Charger tous les messages pour une conversation (catchup public pour chat en direct) |
| GET | `/:churchId/:id` | Public | — | Charger un message unique par ID |
| POST | `/` | JWT | — | Enregistrer les messages (par lots). Envoie les mises à jour en temps réel et déclenche les notifications |
| POST | `/send` | Public | — | Envoyer les messages (par lots, public). Envoie les mises à jour en temps réel via WebSocket et déclenche les notifications |
| POST | `/setCallout` | JWT | — | (hérité) Diffuser un message de callout en temps réel. Pas de client actif ; le chat en direct ne rend plus les callouts |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer un message et diffuser la suppression en temps réel |

### Exemple : Envoyer un message

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
|--------|--------|------|------------|-------------|
| GET | `/` | JWT | — | Charger tous les messages privés pour l'utilisateur actuel (inclut le dernier message par conversation, marque tous comme lus) |
| GET | `/existing/:personId` | JWT | — | Trouver une conversation privée existante avec une personne spécifique |
| GET | `/:id` | JWT | — | Charger un message privé par ID (efface la notification si adressée à l'utilisateur actuel) |
| POST | `/` | JWT | — | Envoyer des messages privés (par lots). Déclenche une notification push au destinataire |

## Notifications

Chemin de base : `/messaging/notifications`

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| GET | `/unreadCount` | JWT | — | Obtenir le nombre de notifications non lues pour l'utilisateur actuel |
| GET | `/my` | JWT | — | Charger toutes les notifications pour l'utilisateur actuel (marque tous comme lus) |
| GET | `/tmpEmail` | Public | — | Déclencher le digest de notification email quotidien (endpoint debug/cron) |
| GET | `/:churchId/person/:personId` | JWT | — | Charger les notifications pour une personne spécifique |
| GET | `/:churchId/:id` | JWT | — | Charger une notification par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour les notifications (par lots) |
| POST | `/create` | JWT | — | Créer des notifications pour plusieurs personnes. Corps : `{ peopleIds, contentType, contentId, message, link }` |
| POST | `/markRead/:churchId/:personId` | JWT | — | Marquer toutes les notifications comme lues pour une personne |
| POST | `/sendTest` | JWT | — | Envoyer une notification push de test. Corps : `{ personId, title }` |
| POST | `/ping` | Public | — | Créer une notification à partir d'un déclencheur externe. Corps : `{ personId, churchId, contentType, contentId, message, triggeredByPersonId }` |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer une notification |

### Exemple : Créer des notifications

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

Étend CRUD standard. La classe de base fournit POST `/` (créer ou mettre à jour, aucune permission requise).

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| POST | `/` | JWT | — | Créer ou mettre à jour les préférences de notification (à partir de la classe de base CRUD) |
| GET | `/my` | JWT | — | Charger les préférences de notification pour l'utilisateur actuel (crée automatiquement les valeurs par défaut si aucune n'existe) |

## Connexions

Chemin de base : `/messaging/connections`

Gère les connexions WebSocket/temps réel pour le chat, les conversations de groupe, les messages privés et le streaming en direct. Voir [Architecture temps réel](../../realtime) pour le protocole de bout en bout.

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| GET | `/:churchId/:conversationId` | Public | — | Charger toutes les connexions pour une conversation |
| POST | `/` | Public | — | Enregistrer les connexions (par lots). Déclenche une diffusion de présence sur la conversation. Éléments du corps : `{ churchId, conversationId, socketId, displayName?, personId? }` |
| POST | `/setName` | Public | — | Mettre à jour le nom d'affichage pour une connexion par ID de socket. Corps : `{ socketId, name }` |
| DELETE | `/:churchId/:conversationId/:socketId` | Public | — | Supprimer une connexion d'une conversation. Déclenche une diffusion de présence |
| POST | `/tmpSendAlert` | Public | — | Envoyer une alerte de notification aux connexions d'une personne. Corps : `{ churchId, personId }` |

## Appareils

Chemin de base : `/messaging/devices`

Gère l'enregistrement des appareils pour les notifications push et l'appairage du contenu (par exemple, l'application Lessons sur les affichages TV).

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| POST | `/enroll` | JWT | — | Inscrire ou mettre à jour un appareil (enregistrement push mobile). Correspond par jeton FCM ou ID d'appareil |
| POST | `/enrollAnon` | Public | — | Inscrire un appareil anonyme et générer un code d'appairage de 4 caractères |
| POST | `/` | Public | — | Enregistrer les appareils (par lots) |
| GET | `/pair/:pairingCode` | JWT | — | Appairer un appareil en utilisant son code d'appairage. `?contentType=&contentId=` optionnel pour assigner le contenu |
| GET | `/status/:deviceId` | Public | — | Vérifier l'état d'appairage d'un appareil |
| GET | `/:churchId` | JWT | — | Charger tous les appareils d'une église |
| GET | `/:churchId/person/:personId` | JWT | — | Charger tous les appareils d'une personne |
| GET | `/:churchId/:id` | JWT | — | Charger un appareil par ID |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer un appareil |

### Exemple : Inscrire un appareil

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

## Contenu de l'appareil

Chemin de base : `/messaging/devicecontents`

Gère les affectations de contenu pour les appareils appairés (par exemple, quelle leçon est affichée sur une TV).

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| GET | `/deviceId/:deviceId` | JWT | — | Charger les affectations de contenu pour un appareil |
| POST | `/` | JWT | — | Enregistrer les affectations de contenu d'appareil (par lots) |
| DELETE | `/:id` | JWT | — | Supprimer une affectation de contenu d'appareil |

## Textos

Chemin de base : `/messaging/texting`

Gère les fournisseurs de SMS, la messagerie textuelle de groupe et le suivi de la livraison.

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| GET | `/providers` | JWT | — | Charger les fournisseurs de textos pour l'église (les identifiants sont masqués) |
| GET | `/preview/:groupId` | JWT | — | Aperçu des destinataires pour un texte de groupe (nombre d'éligibles, refusés, sans téléphone) |
| GET | `/sent` | JWT | — | Charger tous les enregistrements de messages texte envoyés pour l'église |
| GET | `/sent/:id/details` | JWT | — | Charger un texte envoyé avec des journaux de livraison par destinataire |
| POST | `/providers` | JWT | — | Enregistrer les fournisseurs de textos (par lots). Chiffre les identifiants API |
| POST | `/send` | JWT | — | Envoyer un SMS à tous les membres éligibles d'un groupe. Corps : `{ groupId, message }` |
| POST | `/sendPerson` | JWT | — | Envoyer un SMS à une seule personne. Corps : `{ personId, phoneNumber, message }` |
| DELETE | `/providers/:id` | JWT | — | Supprimer un fournisseur de textos |

### Exemple : Envoyer un texte de groupe

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

## Modèles d'email

Chemin de base : `/messaging/emailTemplates`

Gère les modèles d'email réutilisables et l'envoi d'emails basés sur des modèles aux groupes.

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| GET | `/` | JWT | — | Charger tous les modèles d'email pour l'église |
| GET | `/:id` | JWT | — | Charger un seul modèle d'email par ID |
| GET | `/preview/:groupId` | JWT | — | Aperçu de la livraison d'email pour un groupe (nombre de destinataires éligibles, membres sans email) |
| POST | `/` | JWT | — | Créer ou mettre à jour les modèles d'email (par lots) |
| POST | `/send` | JWT | — | Envoyer un email modèle à tous les membres d'un groupe. Corps : `{ groupId, subject, htmlContent }` |
| DELETE | `/:id` | JWT | — | Supprimer un modèle d'email |

### Exemple : Envoyer un email au groupe

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

**Champs de fusion supportés :** `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`

## IPs bloquées

Chemin de base : `/messaging/blockedips`

(hérité) Blocage d'IP pour le chat en direct. Le client B1App n'appelle plus `POST /` -- le blocage d'IP a été supprimé lors de la migration de livraison unifiée. L'itinéraire `/clear` est toujours invoqué serveur-à-serveur par `StreamingServiceController` lors de l'enregistrement des services de streaming.

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| POST | `/` | JWT | — | (hérité) Enregistrer les IPs bloquées (par lots). Pas de client actif |
| POST | `/clear` | JWT | — | Effacer tous les IPs bloquées pour des services spécifiques. Corps : `[{ serviceId, churchId }]` |

## Journaux de livraison

Chemin de base : `/messaging/deliverylogs`

Suit l'état de livraison des messages envoyés (SMS, notifications push, email).

| Méthode | Chemin | Auth | Permission | Description |
|--------|--------|------|------------|-------------|
| GET | `/content/:contentType/:contentId` | JWT | — | Charger les journaux de livraison par type de contenu et ID |
| GET | `/person/:personId` | JWT | — | Charger les journaux de livraison pour une personne. `?startDate=&endDate=` optionnel pour filtrer |
| GET | `/recent` | JWT | — | Charger les journaux de livraison récents pour l'église. `?limit=` optionnel (par défaut 100) |
| GET | `/:id` | JWT | — | Charger un journal de livraison par ID |

## Pages connexes

- [Architecture temps réel](../../realtime) -- Protocole WebSocket, abonnements aux salles et le cadre de livraison unifiée
- [Notifications push Web](../../web-push) -- Inscription aux notifications push du navigateur et livraison
- [Points d'extrémité des membres](./membership) -- Personnes, groupes, rôles et identité de base
- [Points d'extrémité de participation](./attendance) -- Service et suivi des visites
- [Authentification & Permissions](./authentication) -- Flux de connexion, JWT, OAuth, modèle de permission
- [Structure du module](../module-structure) -- Modèles d'organisation du code
