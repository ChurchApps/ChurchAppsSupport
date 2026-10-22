---
title: "Authentification et autorisations"
---

# Authentification et autorisations {#authentication--permissions}

<div class="article-intro">

L'API ChurchApps utilise une authentification basée sur JWT. Les utilisateurs se connectent pour recevoir un jeton qui encode leur identité, leur appartenance à une église et leurs autorisations. Cette page décrit le flux d'authentification, le modèle d'autorisations et la prise en charge d'OAuth.

</div>

## Flux de connexion {#login-flow}

### Connexion standard {#standard-login}

```
POST /membership/users/login
```

**Auth :** Public

Accepte l'un des trois types d'identifiants suivants :

| Champ | Description |
|-------|-------------|
| `email` + `password` | Connexion standard par e-mail et mot de passe |
| `jwt` | Réauthentification avec un JWT existant |
| `authGuid` | Lien d'authentification à usage unique (utilisé dans les e-mails de bienvenue et de réinitialisation) |

**Réponse :**

```json
{
  "user": {
    "id": "abc-123",
    "firstName": "Jane",
    "lastName": "Doe",
    "email": "jane@example.com"
  },
  "churches": [
    {
      "church": { "id": "church-1", "name": "First Church", "subDomain": "firstchurch" },
      "person": { "id": "person-1", "membershipStatus": "Member" },
      "groups": [{ "id": "group-1", "name": "Choir", "leader": false }],
      "apis": [
        {
          "keyName": "MembershipApi",
          "permissions": [
            { "contentType": "People", "action": "View" },
            { "contentType": "People", "action": "Edit" }
          ]
        }
      ]
    }
  ],
  "token": "<jwt-token>"
}
```

Le champ `token` est un JWT qui doit être envoyé sous la forme `Authorization: Bearer <token>` dans les requêtes suivantes.

### Contenu du jeton {#token-contents}

Le JWT encode :
- `id` — ID de l'utilisateur
- `churchId` — Église actuellement sélectionnée
- `personId` — Fiche de la personne pour l'église sélectionnée
- Tableaux d'autorisations par API

### Sélection de l'église {#church-selection}

Les utilisateurs peuvent appartenir à plusieurs églises. La réponse de connexion inclut toutes les églises avec leurs autorisations. Pour changer d'église, le client génère un nouveau JWT limité à une autre église, à partir des données de la réponse de connexion.

## Inscription des utilisateurs {#user-registration}

### Inscrire un nouvel utilisateur {#register-a-new-user}

```
POST /membership/users/register
```

**Auth :** Public

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Crée un utilisateur avec un mot de passe temporaire et envoie un e-mail de bienvenue contenant un lien d'authentification. Le premier utilisateur inscrit sur une nouvelle instance reçoit automatiquement l'accès administrateur serveur.

Deux champs facultatifs de piège à robots sont acceptés : `website` (un champ de leurre caché que les vrais utilisateurs laissent vide) et `fillMs` (durée d'ouverture du formulaire, en millisecondes). Si `website` est renseigné ou si `fillMs` est inférieur à 2000, aucun compte n'est créé, mais le point de terminaison renvoie tout de même un `200` d'apparence normale, afin que les robots ne puissent pas savoir qu'ils ont été rejetés. Les clients qui omettent ces deux champs s'inscrivent normalement.

### Inscrire une nouvelle église {#register-a-new-church}

```
POST /membership/churches/add
```

**Auth :** JWT

Après l'inscription d'un utilisateur, appelez ce point de terminaison pour créer une église et y associer l'utilisateur.

## Gestion des mots de passe {#password-management}

| Méthode | Chemin | Auth | Description |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Envoie un e-mail de réinitialisation du mot de passe. Corps : `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Définit un nouveau mot de passe à l'aide d'un GUID d'authentification issu d'un e-mail de réinitialisation. Corps : `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Modifie le mot de passe de l'utilisateur actuel. Corps : `{ "newPassword": "..." }` |

## Modèle d'autorisations {#permission-model}

Les autorisations sont organisées par module et attribuées aux utilisateurs via des rôles. Chaque autorisation possède un **type de contenu** et une **action**.

### Référence des autorisations {#permission-reference}

| Section affichée | Type de contenu | Action | Description |
|----------------|--------------|--------|-------------|
| **Présences** | Attendance | Checkin | Enregistrer les membres aux services |
| | Attendance | Edit | Modifier les enregistrements de présence |
| | Services | Edit | Gérer les services et les horaires de service |
| | Attendance | View | Consulter les enregistrements de présence |
| | Attendance | View Summary | Consulter les synthèses et rapports de présence |
| **Dons** | Donations | Edit | Créer et modifier les enregistrements de dons |
| | Settings | Edit | Modifier les paramètres de dons et de paiement |
| | Donations | View Summary | Consulter les rapports de synthèse des dons |
| | Donations | View | Consulter les enregistrements de dons individuels |
| **Personnes et groupes** | Forms | Admin | Administration complète des formulaires |
| | Forms | Edit | Modifier les définitions de formulaires |
| | Plans | Edit | Modifier les plans de service |
| | Group Members | Edit | Ajouter/retirer des membres de groupe |
| | Groups | Edit | Créer et modifier des groupes |
| | Households | Edit | Modifier les affectations de foyer |
| | People | Edit | Modifier n'importe quelle fiche personne |
| | People | Edit Self | Modifier uniquement sa propre fiche personne |
| | Roles | Edit | Gérer les rôles et les attributions aux utilisateurs |
| | Group Members | View | Consulter les listes de membres de groupe |
| | People | View Members | Consulter uniquement les membres (pas les visiteurs) |
| | People | View | Consulter toutes les personnes |
| | Roles | View | Consulter les rôles et leurs attributions |
| | Settings | Edit | Modifier les paramètres de l'église |
| **Contenu** | Content | Edit | Modifier les pages, sections et éléments |
| | Settings | Edit | Modifier les paramètres de contenu |
| | StreamingServices | Edit | Gérer la configuration des services de diffusion en direct |
| | Chat | Host | Animer/modérer les sessions de chat |
| **Messagerie** | Texting | Send | Envoyer des SMS |

### Comment les autorisations sont vérifiées {#how-permissions-are-checked}

Dans les contrôleurs, les autorisations sont vérifiées avec la méthode `au.checkAccess()` :

```typescript
// Require specific permission
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Or within actionWrapper — the CRUD system checks automatically
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Administrateur serveur {#server-admin}

L'autorisation `Server.Admin` accorde un accès complet à toutes les églises. Elle est attribuée au premier utilisateur inscrit et peut être accordée à d'autres via le rôle d'administrateur serveur.

## OAuth 2.0 {#oauth-20}

L'API prend en charge OAuth 2.0 pour les intégrations tierces. Deux types d'autorisation sont disponibles.

### Flux du code d'autorisation {#authorization-code-flow}

1. **Autoriser :** `POST /membership/oauth/authorize` (JWT requis)
   - Corps : `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, `S256` uniquement) sont requis pour les clients publics sans secret
   - Renvoie : `{ "code": "...", "state": "..." }`

2. **Échanger le code contre un jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Envoyez `code_verifier` lorsque l'étape d'autorisation a utilisé un `code_challenge` ; les clients publics omettent `client_secret`. Les corps au format JSON ou encodés en formulaire sont acceptés
   - Renvoie : `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Actualiser le jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Les jetons d'accès expirent après **12 heures**.

### Flux du code d'appareil (RFC 8628) {#device-code-flow-rfc-8628}

Pour les appareils sans navigateur (applications TV, bornes) :

1. **Demander un code d'appareil :** `POST /membership/oauth/device/authorize` (Public)
   - Corps : `{ "client_id": "...", "scope": "..." }`
   - Renvoie : `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utilisateur saisit le code** sur l'URI de vérification puis approuve ou refuse

3. **Interroger pour obtenir le jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Renvoie `authorization_pending` tant que la demande n'est pas approuvée, puis renvoie le jeton d'accès

### Gestion des clients OAuth {#oauth-client-management}

| Méthode | Chemin | Auth | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Liste tous les clients OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Récupère un client par son ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Récupère un client par son ID client (secret masqué) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Crée ou met à jour un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Supprime un client |
| POST | `/membership/oauth/register` | Public | — | Enregistrement dynamique de client (RFC 7591) pour les clients publics tels que les connecteurs MCP. Voir [Applications connectées](../connected-apps#dynamic-client-registration) |

### Points de terminaison d'approbation des appareils {#device-approval-endpoints}

| Méthode | Chemin | Auth | Description |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Récupère les informations du code d'appareil en attente pour l'interface d'approbation |
| POST | `/membership/oauth/device/approve` | JWT | Approuve une autorisation d'appareil. Corps : `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Refuse une autorisation d'appareil. Corps : `{ "user_code": "..." }` |

## Points de terminaison publics et authentifiés {#public-vs-authenticated-endpoints}

L'API utilise deux fonctions d'enveloppe qui déterminent les exigences d'authentification :

- **`actionWrapper`** — Exige un JWT valide. L'objet utilisateur authentifié (`au`) est disponible avec `churchId`, `userId` et les vérifications d'autorisations.
- **`actionWrapperAnon`** — Aucune authentification requise. Utilisé pour la connexion, l'inscription, les consultations de contenu public et les récepteurs de webhooks.

Dans les tableaux de points de terminaison de cette documentation, ces valeurs sont indiquées par **JWT** et **Public** respectivement dans la colonne Auth.

## Pages connexes {#related-pages}

- [Structure du module](../module-structure) — Organisation des contrôleurs, des dépôts et des modèles
- [Installation locale](../local-setup) — Exécuter l'API localement pour le développement
