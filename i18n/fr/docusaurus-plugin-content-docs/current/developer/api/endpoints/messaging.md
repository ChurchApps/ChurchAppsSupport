---
title: "Points de terminaison de la messagerie"
---

# Points de terminaison de la messagerie

<div class="article-intro">

Le module de messagerie gère les conversations en temps réel, les messages de chat, les notifications push, la livraison SMS/e-mail, les connexions WebSocket, la messagerie privée, l'enregistrement des appareils et les fournisseurs de texting. Il fournit la couche de communication utilisée dans toutes les applications ChurchApps pour le chat en direct et les notifications asynchrones.

</div>

**Chemin de base :** `/messaging`

## Conversations

Chemin de base : `/messaging/conversations`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-----------|
| GET | `/timeline/ids?ids=` | JWT | — | Charger les conversations par des ID séparés par des virgules avec les premiers/derniers messages |
| GET | `/messages/:contentType/:contentId` | JWT | — | Charger les conversations pour le contenu avec les messages paginés (`?page=&limit=`) |
| GET | `/posts` | JWT | — | Obtenir les conversations de type post pour les groupes de l'utilisateur actuel |
| GET | `/posts/group/:groupId` | JWT | — | Obtenir les conversations de type post pour un groupe spécifique |
| GET | `/current/:churchId/:contentType/:contentId` | Public | — | Obtenir ou créer la conversation actuelle pour le contenu (déchiffre automatiquement contentId) |
| GET | `/:churchId/:contentType/:contentId` | Public | — | Charger les conversations par type de contenu et ID |
| GET | `/:churchId/:id` | Public | — | Charger une seule conversation par ID |
| POST | `/` | JWT | — | Créer ou mettre à jour les conversations (lot) |
| POST | `/start` | JWT | — | Démarrer une nouvelle conversation avec un message de commentaire initial |
| DELETE | `/:churchId/:id` | JWT | — | Supprimer une conversation |

### Contrôle d'accès aux notes de personnes

Les conversations avec `contentType: "person"` (l'onglet Notes sur un dossier de personne) ou `contentType: "personConfidential"` (la section Notes confidentielles) sont vérouillées sur chaque chemin de lecture et d'écriture, y compris les routes autrement publiques ci-dessus, qui retournent `401` pour ces types de contenu. `person` nécessite la permission MembershipApi **Personnes / Modifier** ; `personConfidential` nécessite **Personnes / Afficher les notes confidentielles**. Pour les clés API délimitées, `people:write` porte les deux actions (l'utilisateur de la clé doit toujours détenir la permission de rôle sous-jacente).

### Exemple : Démarrer une conversation

\\\
POST /messaging/conversations/start
Authorization: Bearer <token>

{
  "groupId": "group-123",
  "contentType": "group",
  "contentId": "group-123",
  "title": "Weekly Discussion",
  "comment": "Welcome to this week's discussion thread!"
}
\\\

## Messages

Chemin de base : `/messaging/messages`

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-----------|
| GET | `/conversation/:conversationId` | JWT | — | Charger tous les messages d'une conversation |
| GET | `/catchup/:churchId/:conversationId` | Public | — | Charger tous les messages d'une conversation (rattrapage public pour le chat en direct) |
| GET | `/:churchId/:id` | Public | — | Charger un seul message par ID |
| POST | `/` | JWT | — | Enregistrer les messages (lot). Envoie les mises à jour en temps réel et déclenche les notifications. |
| POST | `/send` | Public | — | Envoyer les messages (lot, public). Envoie les mises à jour en temps réel via WebSocket |

## Appareils

Chemin de base : `/messaging/devices`

Gère l'enregistrement des appareils pour les notifications push et l'appairage de contenu.

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-----------|
| POST | `/enroll` | JWT | — | Inscrire ou mettre à jour un appareil (enregistrement push mobile) |
| POST | `/enrollAnon` | Public | — | Inscrire un appareil anonyme et générer un code d'appairage à 4 caractères |
| POST | `/` | Public | — | Enregistrer les appareils (lot) |
| GET | `/pair/:pairingCode` | JWT | — | Appairer un appareil en utilisant son code d'appairage |
| GET | `/:churchId` | JWT | — | Charger tous les appareils d'une église |

## Pages connexes

- [Architecture en temps réel](../../realtime) -- Protocole WebSocket, abonnements aux salles et cadre de livraison unifié
- [Notifications push Web](../../web-push) -- Inscription et livraison des notifications push du navigateur
- [Points de terminaison d'adhésion](./membership) -- Personnes, groupes, rôles et identité centrale
