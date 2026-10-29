---
title: "Authentification et autorisations"
---

# Authentification et autorisations

<div class="article-intro">

L'API ChurchApps utilise une authentification basée sur JWT. Les utilisateurs se connectent pour recevoir un jeton qui encode leur identité, leur appartenance à l'église et leurs autorisations. Cette page couvre le flux d'authentification, le modèle d'autorisations et la prise en charge d'OAuth.

</div>

## Flux de connexion

### Connexion standard

```
POST /membership/users/login
```

**Authentification :** Publique

Accepte l'un des trois types d'identifiants :

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

Le champ `token` est un JWT qui doit être envoyé sous la forme `Authorization: Bearer <token>` pour les requêtes suivantes.

### Connexion en deux étapes

Les utilisateurs peuvent activer la connexion en deux étapes par application d'authentification (TOTP). Pour ces utilisateurs, une connexion par `email` + `password`, `authGuid` ou SSO ne renvoie pas de jeton. Elle répond plutôt par un défi :

```json
{ "mfaRequired": true, "mfaToken": "<challenge-token>" }
```

Le jeton de défi est valide pendant 5 minutes. Renvoyez-le au même point de terminaison avec le code :

```json
{ "mfaToken": "<challenge-token>", "mfaCode": "123456" }
```

`mfaCode` peut être le code actuel à 6 chiffres de l'application d'authentification ou l'un des dix codes de secours à usage unique de l'utilisateur. Un code erroné renvoie `Invalid code`, et les échecs répétés sont limités en nombre par compte. Une reconnexion par `jwt` n'est jamais soumise à un défi, afin que les sessions existantes continuent de se renouveler. L'objet `user` de la réponse de connexion contient `mfaEnabled`.

Points de terminaison en libre-service (utilisateur connecté seulement, sous `/membership/users/mfa`) :

| Point de terminaison | Description |
|----------|-------------|
| `GET /status` | `{ enabled, backupCodesLeft }` |
| `POST /setup` | Démarre la configuration ; renvoie `{ secret, otpauthUrl }` pour le code QR |
| `POST /enable` | Corps `{ code }` ; active la fonction et renvoie `{ backupCodes }` une seule fois |
| `POST /disable` | Corps `{ code }` (code de l'application ou code de secours) ; la désactive |
| `POST /reset/:userId` | Server.Admin seulement ; la désactive pour un autre utilisateur |

Les secrets sont stockés chiffrés et les codes de secours sont stockés sous forme de hachages. L'activation, la désactivation et la réinitialisation sont inscrites dans le journal d'audit.

### Contenu du jeton

Le JWT encode :
- `id` — ID de l'utilisateur
- `churchId` — Église actuellement sélectionnée
- `personId` — Fiche de personne pour l'église sélectionnée
- Tableaux d'autorisations par API

### Sélection de l'église

Les utilisateurs peuvent appartenir à plusieurs églises. La réponse de connexion inclut toutes les églises avec leurs autorisations. Pour changer d'église, le client génère un nouveau JWT limité à une autre église à partir des données de la réponse de connexion.

## Inscription des utilisateurs

### Inscrire un nouvel utilisateur

```
POST /membership/users/register
```

**Authentification :** Publique

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Crée un utilisateur avec un mot de passe temporaire et envoie un e-mail de bienvenue contenant un lien d'authentification. Le premier utilisateur inscrit sur une nouvelle instance reçoit automatiquement l'accès d'administrateur serveur.

Deux champs facultatifs de piège à robots sont acceptés : `website` (un champ masqué de type leurre, que les vrais utilisateurs laissent vide) et `fillMs` (durée d'ouverture du formulaire, en millisecondes). Si `website` est rempli ou si `fillMs` est inférieur à 2000, aucun compte n'est créé, mais le point de terminaison renvoie tout de même une réponse `200` normale afin que les robots ne puissent pas savoir qu'ils ont été rejetés. Les clients qui omettent les deux champs s'inscrivent normalement.

### Inscrire une nouvelle église

```
POST /membership/churches/add
```

**Authentification :** JWT

Après avoir inscrit un utilisateur, appelez ce point de terminaison pour créer une église et y associer l'utilisateur.

## Gestion des mots de passe

| Méthode | Chemin | Authentification | Description |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Publique | Envoie un e-mail de réinitialisation du mot de passe. Corps : `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Publique | Définit un nouveau mot de passe à l'aide d'un GUID d'authentification provenant d'un e-mail de réinitialisation. Corps : `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Modifie le mot de passe de l'utilisateur actuel. Corps : `{ "newPassword": "..." }` |

## Modèle d'autorisations

Les autorisations sont organisées par module et attribuées aux utilisateurs par l'intermédiaire de rôles. Chaque autorisation possède un **type de contenu** et une **action**.

### Référence des autorisations

| Section affichée | Type de contenu | Action | Description |
|----------------|--------------|--------|-------------|
| **Présence** | Attendance | Checkin | Enregistrer les membres aux services |
| | Attendance | Edit | Modifier les fiches de présence |
| | Services | Edit | Gérer les services et les horaires de service |
| | Attendance | View | Voir les fiches de présence |
| | Attendance | View Summary | Voir les sommaires et les rapports de présence |
| **Dons** | Donations | Edit | Créer et modifier les fiches de dons |
| | Settings | Edit | Modifier les paramètres de dons et de paiement |
| | Donations | View Summary | Voir les rapports sommaires des dons |
| | Donations | View | Voir les fiches de dons individuelles |
| **Personnes et groupes** | Forms | Admin | Administration complète des formulaires |
| | Forms | Edit | Modifier les définitions de formulaires |
| | Plans | Edit | Modifier les plans de service |
| | Group Members | Edit | Ajouter ou retirer des membres de groupe |
| | Groups | Edit | Créer et modifier les groupes |
| | Households | Edit | Modifier les affectations aux foyers |
| | People | Edit | Modifier n'importe quelle fiche de personne |
| | People | Edit Self | Modifier seulement sa propre fiche de personne |
| | Roles | Edit | Gérer les rôles et les affectations d'utilisateurs |
| | Group Members | View | Voir les listes de membres des groupes |
| | People | View Members | Voir seulement les membres (pas les visiteurs) |
| | People | View | Voir toutes les personnes |
| | Roles | View | Voir les rôles et les affectations |
| | Settings | Edit | Modifier les paramètres de l'église |
| **Contenu** | Content | Edit | Modifier les pages, les sections et les éléments |
| | Settings | Edit | Modifier les paramètres de contenu |
| | StreamingServices | Edit | Gérer la configuration des services de diffusion |
| | Chat | Host | Animer et modérer les sessions de chat |
| **Messagerie** | Texting | Send | Envoyer des messages texte SMS |

### Comment les autorisations sont vérifiées

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

### Administrateur serveur

L'autorisation `Server.Admin` accorde un accès complet à toutes les églises. Elle est attribuée au premier utilisateur inscrit et peut être accordée à d'autres par l'intermédiaire du rôle d'administrateur serveur.

## OAuth 2.0

L'API prend en charge OAuth 2.0 pour les intégrations tierces. Deux types de subventions sont disponibles.

### Flux du code d'autorisation

1. **Autoriser :** `POST /membership/oauth/authorize` (JWT requis)
   - Corps : `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, `S256` seulement) sont obligatoires pour les clients publics sans secret
   - Renvoie : `{ "code": "...", "state": "..." }`

2. **Échanger le code contre un jeton :** `POST /membership/oauth/token` (Publique)
   - Corps : `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Envoyez `code_verifier` lorsque l'étape d'autorisation a utilisé un `code_challenge` ; les clients publics omettent `client_secret`. Les corps JSON ou encodés en formulaire sont acceptés
   - Renvoie : `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Jeton de rafraîchissement :** `POST /membership/oauth/token` (Publique)
   - Corps : `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Les jetons d'accès expirent après **12 heures**.

### Flux du code d'appareil (RFC 8628)

Pour les appareils sans navigateur (applications de téléviseur, bornes) :

1. **Demander un code d'appareil :** `POST /membership/oauth/device/authorize` (Publique)
   - Corps : `{ "client_id": "...", "scope": "..." }`
   - Renvoie : `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utilisateur saisit le code** sur l'URI de vérification et approuve ou refuse

3. **Interroger pour obtenir le jeton :** `POST /membership/oauth/token` (Publique)
   - Corps : `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Renvoie `authorization_pending` jusqu'à l'approbation, puis renvoie le jeton d'accès

### Gestion des clients OAuth

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------------|-------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lister tous les clients OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtenir un client par ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtenir un client par ID client (secret masqué) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Créer ou mettre à jour un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Supprimer un client |
| POST | `/membership/oauth/register` | Publique | — | Enregistrement dynamique de client (RFC 7591) pour les clients publics comme les connecteurs MCP. Consultez [Applications connectées](../connected-apps#dynamic-client-registration) |

### Points de terminaison d'approbation d'appareil

| Méthode | Chemin | Authentification | Description |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtenir les renseignements sur le code d'appareil en attente pour l'interface d'approbation |
| POST | `/membership/oauth/device/approve` | JWT | Approuver une autorisation d'appareil. Corps : `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Refuser une autorisation d'appareil. Corps : `{ "user_code": "..." }` |

## Points de terminaison publics et authentifiés

L'API utilise deux fonctions d'enveloppement qui déterminent les exigences d'authentification :

- **`actionWrapper`** — Exige un JWT valide. L'objet utilisateur authentifié (`au`) est disponible avec `churchId`, `userId` et les vérifications d'autorisations.
- **`actionWrapperAnon`** — Aucune authentification requise. Utilisé pour la connexion, l'inscription, les consultations publiques de contenu et les récepteurs de webhooks.

Dans les tableaux des points de terminaison de cette documentation, ceux-ci sont indiqués par **JWT** et **Publique** respectivement dans la colonne Authentification.

## Pages connexes

- [Structure des modules](../module-structure) — Comment les contrôleurs, les dépôts et les modèles sont organisés
- [Installation locale](../local-setup) — Exécuter l'API localement pour le développement
