---
title: "Authentification et autorisations"
---

# Authentification et autorisations

<div class="article-intro">

L'API ChurchApps utilise une authentification basée sur JWT. Les utilisateurs se connectent pour recevoir un jeton qui encode leur identité, leur appartenance à une église et leurs autorisations. Cette page décrit le flux d'authentification, le modèle d'autorisations et la prise en charge d'OAuth.

</div>

## Flux de connexion

### Connexion standard

```
POST /membership/users/login
```

**Authentification :** Public

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

Le champ `token` est un JWT qui doit être envoyé sous la forme `Authorization: Bearer <token>` dans les requêtes suivantes.

### Contenu du jeton

Le JWT encode :
- `id` : ID de l'utilisateur
- `churchId` : église actuellement sélectionnée
- `personId` : fiche personne pour l'église sélectionnée
- Les tableaux d'autorisations par API

### Sélection de l'église

Un utilisateur peut appartenir à plusieurs églises. La réponse de connexion inclut toutes les églises avec leurs autorisations. Pour changer d'église, le client génère un nouveau JWT limité à une autre église, à partir des données de la réponse de connexion.

## Inscription des utilisateurs

### Inscrire un nouvel utilisateur

```
POST /membership/users/register
```

**Authentification :** Public

```json
{
  "email": "jane@example.com",
  "firstName": "Jane",
  "lastName": "Doe",
  "appName": "B1 Admin",
  "appUrl": "https://app.b1.church"
}
```

Crée un utilisateur avec un mot de passe temporaire et envoie un e-mail de bienvenue contenant un lien d'authentification. Le premier utilisateur inscrit sur une nouvelle instance reçoit automatiquement l'accès administrateur du serveur.

Deux champs facultatifs de piège à robots sont acceptés : `website` (un champ masqué de type « pot de miel » que les vrais utilisateurs laissent vide) et `fillMs` (durée d'ouverture du formulaire, en millisecondes). Si `website` est rempli ou si `fillMs` est inférieur à 2000, aucun compte n'est créé, mais l'endpoint renvoie tout de même une réponse `200` normale afin que les robots ne puissent pas savoir qu'ils ont été rejetés. Les clients qui omettent ces deux champs s'inscrivent normalement.

### Inscrire une nouvelle église

```
POST /membership/churches/add
```

**Authentification :** JWT

Après l'inscription d'un utilisateur, appelez cet endpoint pour créer une église et y associer l'utilisateur.

## Gestion des mots de passe

| Méthode | Chemin | Authentification | Description |
|--------|------|------|-------------|
| POST | `/membership/users/forgot` | Public | Envoyer un e-mail de réinitialisation du mot de passe. Corps : `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Définir un nouveau mot de passe à l'aide d'un GUID d'authentification provenant d'un e-mail de réinitialisation. Corps : `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Modifier le mot de passe de l'utilisateur actuel. Corps : `{ "newPassword": "..." }` |

## Modèle d'autorisations

Les autorisations sont organisées par module et attribuées aux utilisateurs par l'intermédiaire de rôles. Chaque autorisation a un **type de contenu** et une **action**.

### Référence des autorisations

| Section affichée | Type de contenu | Action | Description |
|----------------|--------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Enregistrer les membres à l'arrivée aux services |
| | Attendance | Edit | Modifier les enregistrements de présence |
| | Services | Edit | Gérer les services et les horaires de service |
| | Attendance | View | Consulter les enregistrements de présence |
| | Attendance | View Summary | Consulter les synthèses et rapports de présence |
| **Donations** | Donations | Edit | Créer et modifier les enregistrements de dons |
| | Settings | Edit | Modifier les paramètres de dons et de paiement |
| | Donations | View Summary | Consulter les rapports de synthèse des dons |
| | Donations | View | Consulter les enregistrements de dons individuels |
| **People and Groups** | Forms | Admin | Administration complète des formulaires |
| | Forms | Edit | Modifier les définitions de formulaires |
| | Plans | Edit | Modifier les plans de service |
| | Group Members | Edit | Ajouter ou retirer des membres de groupe |
| | Groups | Edit | Créer et modifier des groupes |
| | Households | Edit | Modifier les affectations de foyers |
| | People | Edit | Modifier toute fiche personne |
| | People | Edit Self | Modifier uniquement sa propre fiche personne |
| | Roles | Edit | Gérer les rôles et les affectations d'utilisateurs |
| | Group Members | View | Consulter les listes de membres des groupes |
| | People | View Members | Consulter uniquement les membres (pas les visiteurs) |
| | People | View | Consulter toutes les personnes |
| | Roles | View | Consulter les rôles et les affectations |
| | Settings | Edit | Modifier les paramètres de l'église |
| **Content** | Content | Edit | Modifier les pages, sections et éléments |
| | Settings | Edit | Modifier les paramètres de contenu |
| | StreamingServices | Edit | Gérer la configuration des services de diffusion en continu |
| | Chat | Host | Animer et modérer les sessions de chat |
| **Messaging** | Texting | Send | Envoyer des messages texte SMS |

### Vérification des autorisations

Dans les contrôleurs, les autorisations sont vérifiées à l'aide de la méthode `au.checkAccess()` :

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

### Administrateur du serveur

L'autorisation `Server.Admin` accorde un accès complet à toutes les églises. Elle est attribuée au premier utilisateur inscrit et peut être accordée à d'autres par l'intermédiaire du rôle d'administrateur du serveur.

## OAuth 2.0

L'API prend en charge OAuth 2.0 pour les intégrations tierces. Deux types de flux (grant types) sont disponibles.

### Flux du code d'autorisation

1. **Autoriser :** `POST /membership/oauth/authorize` (JWT requis)
   - Corps : `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "...", "code_challenge": "...", "code_challenge_method": "S256" }`
   - `code_challenge` / `code_challenge_method` (PKCE, `S256` uniquement) sont obligatoires pour les clients publics sans secret
   - Renvoie : `{ "code": "...", "state": "..." }`

2. **Échanger le code contre un jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "...", "code_verifier": "..." }`
   - Envoyez `code_verifier` lorsque l'étape d'autorisation a utilisé un `code_challenge` ; les clients publics omettent `client_secret`. Les corps au format JSON ou encodés en formulaire sont acceptés
   - Renvoie : `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Rafraîchir le jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Les jetons d'accès expirent après **12 heures**.

### Flux du code d'appareil (RFC 8628)

Pour les appareils sans navigateur (applications TV, bornes) :

1. **Demander un code d'appareil :** `POST /membership/oauth/device/authorize` (Public)
   - Corps : `{ "client_id": "...", "scope": "..." }`
   - Renvoie : `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utilisateur saisit le code** à l'adresse de vérification, puis approuve ou refuse la demande

3. **Interroger pour obtenir le jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Renvoie `authorization_pending` tant que la demande n'est pas approuvée, puis renvoie le jeton d'accès

### Gestion des clients OAuth

| Méthode | Chemin | Authentification | Autorisation | Description |
|--------|------|------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lister tous les clients OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtenir un client par son ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtenir un client par son ID client (secret masqué) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Créer ou mettre à jour un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Supprimer un client |
| POST | `/membership/oauth/register` | Public | — | Enregistrement dynamique de client (RFC 7591) pour les clients publics, comme les connecteurs MCP. Voir [Applications connectées](../connected-apps#dynamic-client-registration) |

### Points de terminaison d'approbation d'appareil

| Méthode | Chemin | Authentification | Description |
|--------|------|------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtenir les informations du code d'appareil en attente pour l'interface d'approbation |
| POST | `/membership/oauth/device/approve` | JWT | Approuver une autorisation d'appareil. Corps : `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Refuser une autorisation d'appareil. Corps : `{ "user_code": "..." }` |

## Points de terminaison publics et authentifiés

L'API utilise deux fonctions d'encapsulation qui déterminent les exigences d'authentification :

- **`actionWrapper`** : exige un JWT valide. L'objet utilisateur authentifié (`au`) est disponible avec `churchId`, `userId` et les vérifications d'autorisations.
- **`actionWrapperAnon`** : aucune authentification requise. Utilisé pour la connexion, l'inscription, les consultations de contenu public et les récepteurs de webhooks.

Dans les tableaux de points de terminaison de cette documentation, ces types sont indiqués respectivement par **JWT** et **Public** dans la colonne Authentification.

## Pages connexes

- [Structure du module](../module-structure) — Organisation des contrôleurs, des dépôts et des modèles
- [Configuration locale](../local-setup) — Exécuter l'API localement pour le développement
