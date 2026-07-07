---
title: "Architecture en temps réel"
---

# Architecture en temps réel

<div class="article-intro">

ChurchApps utilise un seul cadre de livraison basé sur WebSocket pour chaque surface en temps réel -- chat de groupe, messages privés, notes de contenu, le chat de diffusion en direct et présence/participation. Cette page documente le protocole, le serveur et les primitives client que les consommateurs utilisent.

</div>

## Vue d'ensemble

```
┌────────────────────┐                ┌────────────────────────────┐
│ Browser / B1Admin  │                │  MessagingApi (Lambda)     │
│ Browser / B1App    │ ─── WS ─────▶  │  ┌───────────────────────┐ │
│  - SocketHelper    │                │  │ SocketHelper (server) │ │
│  - SubscriptionMgr │   POST /msg ──▶│  │ MessageController     │ │
│  - ConversationStore│  POST /conn ─▶│  │ ConnectionController  │ │
│  - PresenceStore   │ ◀── action ──  │  │ DeliveryHelper        │ │
└────────────────────┘                │  └───────────────────────┘ │
                                      └────────────────────────────┘
```

Le protocole a trois composantes :

1. **Un seul WebSocket persistant** par onglet de navigateur, ouvert par `SocketHelper`.
2. **Lignes de connexion** (`POST /messaging/connections`) enregistrées dans la table `connections` -- elles marquent un tuple `(socketId, churchId, conversationId)` comme abonné à une salle.
3. **Fan-out côté serveur** par `DeliveryHelper.sendConversationMessages()` -- quand un message est sauvegardé (`POST /messaging/messages/send`), le serveur lit les lignes de connexion correspondantes et pousse un payload typé vers chaque socket ouvert.

Il n'y a pas de Socket.IO, pas de fallback long-polling, et pas de microservice séparé. Le WebSocket s'exécute dans le même processus que l'API REST (`web` Lambda pour HTTP, `socket` Lambda pour WebSocket sur AWS ; un processus combiné localement et sur Railway).

## Ports et transport

| Environnement | HTTP | WebSocket |
|-------------|------|-----------|
| Développement local   | `8084` | `ws://localhost:8087` (serveur WebSocket séparé) |
| Railway / hôtes un seul port | partagé | serveur HTTP partagé (`SocketHelper.attachToServer()`) |
| AWS Lambda  | API Gateway HTTP | API Gateway WebSocket (routes `$connect` / `$disconnect` / `$default`) |

Le sélecteur de transport est la configuration `deliveryProvider` :

- `local` → bibliothèque brute `ws` ; les clients se connectent à `MessagingApiSocket` de `CommonEnvironmentHelper`.
- `aws` → API Gateway WebSocket ; le serveur envoie les payloads aux connexions actives via `@aws-sdk/client-apigatewaymanagementapi`.

Le client n'a jamais besoin de savoir lequel est utilisé -- il parle du même protocole JSON de toute façon.

## Protocole de fil

Chaque trame est JSON de forme `PayloadInterface` :

```typescript
interface PayloadInterface {
  churchId: string;
  conversationId: string;  // la « salle » -- généralement un UUID, parfois « alerts » ou « content-{type}-{id} »
  action: PayloadAction;
  data: unknown;
}

type PayloadAction =
  | "socketId"            // serveur → client, après la connexion, porte le socketId à utiliser pour les jointures de salle
  | "message"             // serveur → client, nouveau message
  | "deleteMessage"       // serveur → client, message supprimé
  | "privateMessage"      // serveur → client, ping de compte de badge au destinataire salle « alerts » quand un message direct s'intensifie ; le corps du message lui-même arrive via l'action ordinaire « message » dans la conversation ouverte
  | "reaction"            // serveur → client, réaction emoji basculée sur un message ; les données sont { messageId, conversationId, personId, emoji, added } (added=false signifie supprimé). Diffusion à la salle de conversation par POST /messaging/messages/:messageId/reactions
  | "conversationActivity"// serveur → client, signal secondaire « quelque chose s'est produit » pour les abonnés de la salle de contenu
  | "attendance"          // serveur → client, liste des spectateurs / snapshot de présence
  | "notification"        // serveur → client, notification générique (comptages, etc.)
  | "reconnect"           // interne au client, distribué localement par SocketHelper après la fin d'une nouvelle poignée socketId suite à une chute -- soit une reconnexion avec backoff exponentiel après une fermeture inattendue, soit une reconnexion immédiate déclenchée par la sonde de reprise (focus/visibilité/en ligne du tab) ; jamais envoyé par le serveur
  | "alert" | "callout";  // hérité, voir la référence du point de terminaison Connections
```

### Poignée de main

1. Le client ouvre le socket et envoie la chaîne littérale `"getId"`.
2. Le serveur répond avec `{ action: "socketId", data: "<id>" }`.
3. Le client stocke le `socketId` et l'utilise comme troisième coordonnée de chaque abonnement de salle.

### Rejoindre une salle

Une « salle » est juste un tuple `(churchId, conversationId)`. Pour s'abonner, le client envoie une ligne `Connection` :

```http
POST /messaging/connections
[
  {
    "churchId": "CHU00000001",
    "conversationId": "CON123…",
    "socketId": "abc123",
    "personId": null,            // optionnel ; null pour les spectateurs anonymes de diffusion en direct
    "displayName": "Anonymous4823"
  }
]
```

L'envoi déclenche également une diffusion `attendance` sur la conversation pour que les abonnés existants apprennent qu'un nouveau spectateur a rejoint.

### Envoyer un message

`POST /messaging/messages/send` (anonyme autorisé) ou `POST /messaging/messages/` (authentification requise) :

```json
[
  { "churchId": "CHU00000001", "conversationId": "CON123…", "displayName": "John Smith", "content": "Hello!", "messageType": "comment" }
]
```

Le serveur sauvegarde le message, puis `DeliveryHelper.sendConversationMessages()` cherche chaque ligne de connexion pour ce `conversationId` et envoie à chaque socket une trame `{ action: "message", data: <message> }`.

Pour les conversations liées au contenu (par ex., notes attachées à une personne), une seconde diffusion avec `action: "conversationActivity"` se déclenche sur la salle synthétique `"content-{type}-{id}"` afin que les consommateurs de liste sachent rafraîchir sans maintenir la conversation sous-jacente ouverte.

### Quitter une salle

```http
DELETE /messaging/connections/:churchId/:conversationId/:socketId
```

Efface la ligne de connexion et déclenche une diffusion d'attendance finale.

## Composants côté serveur

| Fichier | Rôle |
|------|------|
| `Api/src/modules/messaging/helpers/SocketHelper.ts` | Possède le `WebSocketServer`. Assigne `socketId` lors de la connexion. Exécute une battement de ping/pong de 30s (`startHeartbeat`) qui `terminate()`s et nettoie toute connexion qui manque une pong. Nettoie les sockets morts et déclenche une diffusion d'attendance à la déconnexion. Expose `getLiveSocketIds()` et `reapStaleConnections()`, utilisées par le travail de minuterie de 30 minutes pour supprimer les lignes `connections` obsolètes -- localement en vérifiant les socketIds qui sont toujours vivants dans le processus, sur AWS comme un backstop TTL de 24h pour les événements `$disconnect` manqués (API Gateway limite les connexions à ~2h, donc cela ne peut pas récolter une connection vivante) |
| `Api/src/modules/messaging/helpers/DeliveryHelper.ts` | `sendConversationMessages(payload)` lit les connexions pour la salle et route chaque trame vers le socket local ou la connexion API Gateway AWS. `sendAttendance(churchId, conversationId)` construit et diffuse le snapshot du spectateur |
| `Api/src/modules/messaging/controllers/ConnectionController.ts` | `POST /` rejoint, `DELETE /:churchId/:conversationId/:socketId` quitte, `POST /setName` met à jour le nom d'affichage |
| `Api/src/modules/messaging/controllers/MessageController.ts` | `POST /send` (anonyme) et `POST /` (authentifié) sauvegardent puis fan out |
| `Api/src/modules/messaging/repositories/ConnectionRepo.ts` | `loadForConversation(churchId, conversationId)` est la source de vérité pour qui est abonné |

## Primitives côté client (`@churchapps/apphelper`)

Les cinq primitives sont des singletons statiques dans `apphelper/src/helpers/`. Elles coopèrent pour que chaque onglet ouvre **un seul** WebSocket peu importe combien de composants sont montés sur la page.

### `SocketHelper`

Possède la seule connexion WebSocket. L'`init()` réentrant est idempotent -- plusieurs composants peuvent l'appeler sans ouvrir de sockets dupliquées. Expose :

- `init()` -- ouvrir (ou réutiliser) le socket et compléter la poignée de main `getId`. Se résout une fois que la poignée de main se termine ou, après un timeout de 5s, une fois que la boucle de retry en arrière-plan a pris le relais ; elle ne rejette jamais, donc les appelants n'ont pas besoin de spécial-caser une première connexion échouée.
- `addHandler(action, id, fn)` / `removeHandler(id)` -- enregistrer/désenregistrer les auditeurs par `action`. Plusieurs gestionnaires peuvent écouter la même action.
- `setPersonChurch({ personId, churchId })` -- pour les appelants authentifiés ; déclenche un abonnement à la salle `"alerts"` pour que les notifications push arrivent sur ce socket.
- `onSocketIdReady(fn)` -- se déclenche sur chaque nouveau socketId, pas seulement le premier -- la poignée de main initiale et chaque reconnexion ultérieure. Utilisé par `SubscriptionManager` pour vider les jointures en attente.
- `checkConnection()` -- invoqué par les auditeurs de reprise ci-dessous ; se reconnecte immédiatement si le socket est déjà fermé, ou envoie une sonde de vivacité s'il semble ouvert.

**Cycle de vie de la reconnexion.** Une fermeture inattendue programme une reconnexion avec backoff exponentiel (1s, doublant jusqu'à un plafond de 30s). `SocketHelper` écoute également `online`, `focus`, `pageshow` et `visibilitychange` sur `window`/`document` pour détecter un tab repris : si le socket est déjà fermé, il se reconnecte immédiatement et réinitialise le backoff ; s'il semble ouvert, il envoie une sonde de vivacité `"getId"` et force une reconnexion si aucune trame n'arrive dans les 3s -- cela rattrape les sockets demi-ouverts laissés après qu'un OS mobile suspend l'application. En cas de re-poignée de main réussie, `SocketHelper` distribue l'action locale `"reconnect"` (voir [Protocole de fil](#protocole-de-fil)) à chaque gestionnaire enregistré pour cette action.

### `SubscriptionManager`

Adhésion à la salle comptée par référence. Plusieurs composants s'abonnant à la même conversation n'enregistrent qu'une seule ligne de connexion côté serveur.

```typescript
import { SubscriptionManager } from "@churchapps/apphelper";

await SubscriptionManager.joinRoom(conversationId, churchId, personId, displayName);
// ... composant rend, reçoit les trames de socket via ConversationStore.subscribe ...
await SubscriptionManager.leaveRoom(conversationId, churchId);
```

Trois comportements que les consommateurs obtiennent gratuitement :

- **Départ débounced (300 ms)** -- survit au double montage/démontage et aux cycles de remontage courts du mode StrictMode React sans faire tomber l'abonnement côté serveur ; `reset()` annule également tous les départs débounced en attente.
- **Reconnect rejoin** -- `SubscriptionManager` se souvient du `personId`/`displayName` utilisé pour rejoindre chaque salle, donc au événement `"reconnect"` de `SocketHelper` (et à chaque appel `onSocketIdReady`) il re-envoie chaque ligne de connexion active avec l'identité intacte. Les rejointures sont dédupliquées par socketId pour que la même reconnexion ne re-envoie pas une salle deux fois.
- **SocketId avec liaison tardive** -- `joinRoom` enregistre l'intention avant que le socket ne termine sa poignée de main ; le vrai `POST /connections` se déclenche sur `onSocketIdReady`.

### `ConversationStore`

Cache en mémoire indexé par `conversationId`. Enregistre les gestionnaires de socket `message` / `deleteMessage` / `privateMessage` exactement une fois et applique les trames entrantes à toutes les conversations actuellement ouvertes.

```typescript
import { ConversationStore } from "@churchapps/apphelper";

const conv = await ConversationStore.loadByConversationId(conversationId, churchId);
// ↑ utilise /messages/conversation/:id quand authentifié, /messages/catchup/:churchId/:id quand anonyme

const unsubscribe = ConversationStore.subscribe(conversationId, (conv) => {
  setMessages(conv.messages);  // re-rendre avec le dernier snapshot
});
// ...
unsubscribe();
ConversationStore.forget(conversationId);  // nettoyage explicite optionnel
```

Les appelants authentifiés obtiennent également **l'hydratation des personnes** -- les `personId`s sur les messages entrants sont résolus à des objets `PersonInterface` via une recherche mise en cache `GET /people/ids`. Les appelants anonymes ignorent cela.

Au événement `"reconnect"` de `SocketHelper`, `ConversationStore` recherche à nouveau chaque conversation qui a actuellement des auditeurs `subscribe` actifs, récupérant les messages manqués pendant que le socket était arrêté. Les conversations anonymes ignorent ce rattrapage si leur `churchId` n'a jamais été enregistré (le point de terminaison de rattrapage en nécessite un).

### `PresenceStore`

Reflète le motif du `ConversationStore` pour l'action `attendance`. Les abonnés reçoivent un `PresenceSnapshot { conversationId, totalViewers, viewers }` chaque fois que le serveur rediffuse la présence. Les snapshots identiques sont dédupliqués avant notification, donc les tempêtes de reconnexion ne déclenchent pas de re-rendus inutiles.

```typescript
import { PresenceStore } from "@churchapps/apphelper";

const unsubscribe = PresenceStore.subscribe(conversationId, (snapshot) => {
  setViewerCount(snapshot.totalViewers);
});
```

### `NotificationService`

Démarrage de haut niveau pour les appelants **authentifiés**. Enveloppe `SocketHelper.init()`, définit le contexte personne/église (qui rejoint automatiquement la salle `"alerts"`), et appelle `ConversationStore.ensureHandlers()` / `PresenceStore.ensureHandlers()` / `SubscriptionManager.setupRejoin()` exactement une fois. Il enregistre également son propre gestionnaire `"reconnect"` qui recharge les comptages de notification/PM, pour que les badges se rétablissent après une connexion abandonnée.

```typescript
await NotificationService.getInstance().initialize(userContext);
```

Les flux anonymes (le chat de diffusion en direct est l'exemple canonique) ignorent `NotificationService` et appellent directement les primitives -- voir `B1App/src/helpers/StreamChatManager.ts` pour une implémentation de référence.

## Chat de diffusion en direct

La diffusion en direct est le plus grand consommateur anonyme du cadre. Il utilise deux `contentType`s pour la portée de la salle :

- `streamingLive` -- l'onglet de chat public sur `/stream` (une salle par `streamingService`).
- `streamingLiveHost` -- une salle privée visible uniquement au personnel avec la permission `contentApi.chat.host`. L'id de la salle est chiffré sur le serveur (`GET /streamingServices/:id/hostChat`) afin que le scraping occasionnel ne le révèle pas.

`B1App/src/helpers/StreamChatManager.ts` démarre les deux salles via les primitives unifiées -- il n'y a plus de code de socket spécifique à la diffusion en direct.

## Motifs et pièges

- **N'ouvrez pas votre propre WebSocket.** `SocketHelper` est un singleton pour une raison. Si vous avez besoin d'écouter une action personnalisée, enregistrez un gestionnaire sur le socket existant via `SocketHelper.addHandler`.
- **Ne contournez pas `SubscriptionManager`.** Les appels directs `POST /connections` fonctionnent mais perdent le comptage par référence, le départ débounced et la reconnect rejoin. Le chat de groupe et les consommateurs de PM passent tous par `SubscriptionManager`.
- **Les ids de gestionnaire doivent être uniques par action.** `SocketHelper.addHandler(action, id, fn)` indexe par `(action, id)` ; réutiliser le même id pour deux auditeurs remplace le premier. Les magasins unifiés utilisent des ids comme `"ConversationStore-Message"` et `"PresenceStore-Attendance"` pour rester clairs des ids des consommateurs.
- **Les ids de salle sont des chaînes opaques.** La plupart sont des UUID de conversation, mais le système supporte également `"alerts"` (notifications par personne), `"content-{type}-{id}"` (salles d'activité synthétiques), et les ids chiffrés `streamingLiveHost`.
- **L'authentification est vérifiée à la limite REST, pas au socket.** Rejoindre une salle par `POST /connections` est autorisé anonyme ; le contrôle d'accès se fait au moment de l'envoi de message (le contrôleur de message décide quel `messageType`s un appelant anonyme peut envoyer).

## Pages connexes

- [Architecture des notifications](./architecture/notifications) -- L'entonnoir d'escalade in-app/push/e-mail sur lequel ce transport se nourrit
- [Points de terminaison de messagerie](./api/endpoints/messaging) -- Surface REST complète pour les messages, conversations, connexions, appareils
- [Notifications Web Push](./web-push) -- Push du navigateur, séparé de la livraison de socket dans la page
- [AppHelper](./shared-libraries/app-helper) -- Le package npm qui envoie les primitives client
- [Structure du module](./api/module-structure) -- Comment le module de messagerie est organisé côté serveur
