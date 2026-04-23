---
title: "Authentification et permissions"
---

# Authentification et permissions

<div class="article-intro">

L'API ChurchApps utilise l'authentification basée sur JWT. Les utilisateurs se connectent pour recevoir un jeton qui encode leur identité, leur appartenance à l'église et leurs permissions. Cette page couvre le flux d'authentification, le modèle de permissions et le support OAuth.

</div>

## Flux de connexion

### Connexion standard

```
POST /membership/users/login
```

**Authentification :** Public

Accepte l'un des trois types de credentials :

| Champ | Description |
|-------|-------------|
| `email` + `password` | Connexion standard email/mot de passe |
| `jwt` | Réauthentification avec un JWT existant |
| `authGuid` | Lien d'authentification unique (utilisé dans les e-mails de bienvenue/réinitialisation) |

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

Le champ `token` est un JWT qui doit être envoyé en tant que `Authorization: Bearer <token>` sur les requêtes ultérieures.

### Contenu du jeton

Le JWT encode :
- `id` — ID utilisateur
- `churchId` — Église actuellement sélectionnée
- `personId` — Enregistrement de personne pour l'église sélectionnée
- Tableaux de permissions par API

### Sélection d'église

Les utilisateurs peuvent appartenir à plusieurs églises. La réponse de connexion inclut toutes les églises avec leurs permissions. Pour changer d'église, le client génère un nouveau JWT limité à une église différente à partir des données de réponse de connexion.

## Enregistrement d'utilisateur

### Enregistrer un nouvel utilisateur

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

Crée un utilisateur avec un mot de passe temporaire et envoie un e-mail de bienvenue avec un lien d'authentification. Le premier utilisateur enregistré sur une nouvelle instance reçoit automatiquement un accès administrateur serveur.

### Enregistrer une nouvelle église

```
POST /membership/churches/add
```

**Authentification :** JWT

Après l'enregistrement d'un utilisateur, appelez ce endpoint pour créer une église et associer l'utilisateur à celle-ci.

## Gestion des mots de passe

| Méthode | Chemin | Authentification | Description |
|---------|--------|------------------|-------------|
| POST | `/membership/users/forgot` | Public | Envoyer un e-mail de réinitialisation de mot de passe. Corps : `{ "userEmail": "...", "appName": "...", "appUrl": "..." }` |
| POST | `/membership/users/setPasswordGuid` | Public | Définir un nouveau mot de passe à l'aide d'un GUID d'authentification à partir d'un e-mail de réinitialisation. Corps : `{ "authGuid": "...", "newPassword": "..." }` |
| POST | `/membership/users/updatePassword` | JWT | Modifier le mot de passe de l'utilisateur actuel. Corps : `{ "newPassword": "..." }` |

## Modèle de permissions

Les permissions sont organisées par module et assignées aux utilisateurs via des rôles. Chaque permission a un **type de contenu** et une **action**.

### Référence des permissions

| Section d'affichage | Type de contenu | Action | Description |
|------------------|-----------------|--------|-------------|
| **Attendance** | Attendance | Checkin | Enregistrer les membres aux services |
| | Attendance | Edit | Éditer les enregistrements de présence |
| | Services | Edit | Gérer les services et les horaires de service |
| | Attendance | View | Afficher les enregistrements de présence |
| | Attendance | View Summary | Afficher les résumés et rapports de présence |
| **Donations** | Donations | Edit | Créer et éditer les enregistrements de donation |
| | Settings | Edit | Éditer les paramètres de donation/paiement |
| | Donations | View Summary | Afficher les rapports de résumé de donation |
| | Donations | View | Afficher les enregistrements de donation individuels |
| **Personnes et groupes** | Forms | Admin | Administration complète des formulaires |
| | Forms | Edit | Éditer les définitions de formulaires |
| | Plans | Edit | Éditer les plans de service |
| | Group Members | Edit | Ajouter/supprimer les membres du groupe |
| | Groups | Edit | Créer et éditer les groupes |
| | Households | Edit | Éditer les assignments de ménage |
| | People | Edit | Éditer n'importe quel enregistrement de personne |
| | People | Edit Self | Éditer uniquement votre propre enregistrement de personne |
| | Roles | Edit | Gérer les rôles et les assignments d'utilisateurs |
| | Group Members | View | Afficher les listes de membres du groupe |
| | People | View Members | Afficher uniquement les membres (pas les visiteurs) |
| | People | View | Afficher toutes les personnes |
| | Roles | View | Afficher les rôles et les assignments |
| | Settings | Edit | Éditer les paramètres de l'église |
| **Content** | Content | Edit | Éditer les pages, sections, éléments |
| | Settings | Edit | Éditer les paramètres de contenu |
| | StreamingServices | Edit | Gérer la configuration des services de streaming |
| | Chat | Host | Animer/modérer les sessions de chat |
| **Messaging** | Texting | Send | Envoyer des messages SMS texte |

### Comment les permissions sont vérifiées

Dans les contrôleurs, les permissions sont vérifiées à l'aide de la méthode `au.checkAccess()` :

```typescript
// Exiger une permission spécifique
if (!au.checkAccess(Permissions.people.edit)) return this.json({}, 401);

// Ou dans actionWrapper — le système CRUD vérifie automatiquement
crudSettings: {
  permissions: {
    view: Permissions.people.view,
    edit: Permissions.people.edit
  }
}
```

### Administrateur serveur

La permission `Server.Admin` accorde un accès complet à toutes les églises. Elle est assignée au premier utilisateur enregistré et peut être accordée à d'autres via le rôle d'administrateur serveur.

## OAuth 2.0

L'API supporte OAuth 2.0 pour les intégrations tiers. Deux types de concession sont disponibles.

### Flux de code d'autorisation

1. **Autoriser :** `POST /membership/oauth/authorize` (JWT requis)
   - Corps : `{ "client_id": "...", "redirect_uri": "...", "response_type": "code", "scope": "...", "state": "..." }`
   - Retourne : `{ "code": "...", "state": "..." }`

2. **Échanger le code contre un jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "authorization_code", "code": "...", "client_id": "...", "client_secret": "...", "redirect_uri": "..." }`
   - Retourne : `{ "access_token": "...", "token_type": "Bearer", "expires_in": 43200, "refresh_token": "...", "scope": "..." }`

3. **Rafraîchir le jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "refresh_token", "refresh_token": "...", "client_id": "...", "client_secret": "..." }`

Les jetons d'accès expirent après **12 heures**.

### Flux de code d'appareil (RFC 8628)

Pour les appareils sans navigateur (applications TV, kiosques) :

1. **Demander un code d'appareil :** `POST /membership/oauth/device/authorize` (Public)
   - Corps : `{ "client_id": "...", "scope": "..." }`
   - Retourne : `{ "device_code": "...", "user_code": "ABCD-1234", "verification_uri": "https://app.b1.church/device", "expires_in": 900, "interval": 5 }`

2. **L'utilisateur entre le code** à l'URI de vérification et approuve ou refuse

3. **Demander un jeton :** `POST /membership/oauth/token` (Public)
   - Corps : `{ "grant_type": "urn:ietf:params:oauth:grant-type:device_code", "device_code": "...", "client_id": "..." }`
   - Retourne `authorization_pending` jusqu'à l'approbation, puis retourne le jeton d'accès

### Gestion des clients OAuth

| Méthode | Chemin | Authentification | Permission | Description |
|---------|--------|------------------|------------|-------------|
| GET | `/membership/oauth/clients` | JWT | Server.Admin | Lister tous les clients OAuth |
| GET | `/membership/oauth/clients/:id` | JWT | Server.Admin | Obtenir un client par ID |
| GET | `/membership/oauth/clients/clientId/:clientId` | JWT | — | Obtenir un client par ID client (secret masqué) |
| POST | `/membership/oauth/clients` | JWT | Server.Admin | Créer ou mettre à jour un client |
| DELETE | `/membership/oauth/clients/:id` | JWT | Server.Admin | Supprimer un client |

### Endpoints d'approbation d'appareil

| Méthode | Chemin | Authentification | Description |
|---------|--------|------------------|-------------|
| GET | `/membership/oauth/device/pending/:userCode` | JWT | Obtenir les informations du code d'appareil en attente pour l'UI d'approbation |
| POST | `/membership/oauth/device/approve` | JWT | Approuver une autorisation d'appareil. Corps : `{ "user_code": "...", "church_id": "..." }` |
| POST | `/membership/oauth/device/deny` | JWT | Refuser une autorisation d'appareil. Corps : `{ "user_code": "..." }` |

## Endpoints publics vs authentifiés

L'API utilise deux fonctions wrapper qui déterminent les exigences d'authentification :

- **`actionWrapper`** — Exige un JWT valide. L'objet utilisateur authentifié (`au`) est disponible avec `churchId`, `userId` et les vérifications de permissions.
- **`actionWrapperAnon`** -- Aucune authentification requise. Utilisé pour la connexion, l'enregistrement, les recherches de contenu public et les récepteurs de webhooks.

Dans les tableaux d'endpoints tout au long de cette documentation, ceux-ci sont indiqués comme **JWT** et **Public** respectivement dans la colonne Authentification.

## Pages connexes

- [Structure du module](../module-structure) — Comment les contrôleurs, repositories et modèles sont organisés
- [Configuration locale](../local-setup) — Exécuter l'API localement pour le développement
