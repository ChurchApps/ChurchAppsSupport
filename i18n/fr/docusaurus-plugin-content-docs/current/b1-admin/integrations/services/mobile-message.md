---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) est une API SMS australienne — populaire auprès des églises AU car elle offre des numéros locaux et des tarifs compétitifs au AU où Clearstream et Text In Church sont US-centriques. Mobile Message n'a pas d'application Zapier de première classe aujourd'hui, mais elle publie une API REST publique, donc vous pouvez connecter les événements B1 aux textes Mobile Message via **Webhooks by Zapier** (ou le module HTTP de Make) en quelques minutes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mobile Message](https://mobilemessage.com.au) avec un ID d'expéditeur enregistré et des identifiants API (nom d'utilisateur API + mot de passe sous *Compte → Paramètres API*)
- Un compte [Zapier](https://zapier.com) (ou [Make](https://www.make.com))
- Un utilisateur B1Admin avec la permission **Modifier les paramètres**

</div>

## Ce que vous pouvez connecter

L'API de Mobile Message est « envoyer des SMS » — pas de déclencheurs, juste du texte sortant. Donc les recettes sont toutes B1 → SMS :

| Direction | Déclencheur B1 | Résultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | SMS de bienvenue à la nouvelle personne |
| B1 → Mobile Message | `donation.created` | SMS de remerciement au donateur |
| B1 → Mobile Message | `form.submission.created` | Appeler l'équipe de garde |
| B1 → Mobile Message | `event.created` | Rappel de diffusion à une liste |

## Configuration

### 1. Créer une clé API B1

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — pour que le webhook de déclencheur s'enregistre
- `people:read` — pour rechercher le numéro de téléphone du destinataire à partir d'un `personId`

### 2. Créer le Zap avec Webhooks by Zapier

1. **Déclencheur** — B1.church : choisissez l'événement que vous voulez (par exemple Nouveau don).
2. **Action** — B1.church : Trouver une personne (en utilisant `data.personId`) pour obtenir le numéro de téléphone et le nom.
3. **Action** — Webhooks by Zapier : **POST**. Configurez comme ci-dessous.

Paramètres de l'étape POST :

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Type de charge utile** — JSON
- **Données** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Merci pour votre don, {{step2_first_name}}!",
        "sender": "VotreEglise"
      }
    ]
  }
  ```
- **En-têtes** — `Content-Type: application/json` (Webhooks by Zapier ajoute cela automatiquement)
- **Authentification de base** — définissez le champ *Authentification de base* sur `<api_username>|<api_password>` (Zapier convertit cela en bon en-tête `Authorization: Basic …`)

Activez le Zap. Envoyez un test de don dans B1Admin pour vérifier qu'un texte arrive.

## Recettes courantes

### Rappels d'événements le matin de

- **Déclencheur** — Horaire par Zapier (quotidien, 7h)
- **Action** — B1.church : Trouver des événements pour aujourd'hui (ou utilisez une étape Trouver avec un filtre de date fixe, ou stockez la liste des événements d'aujourd'hui dans une Google Sheet)
- **Action** — Webhooks by Zapier : POST à Mobile Message avec la liste des événements à un groupe d'abonnés enregistré

### Utiliser le point de terminaison de lot pour une diffusion de liste

L'endpoint `/v1/messages` de Mobile Message accepte jusqu'à 10 000 messages par appel. Pour diffuser à un groupe B1 :

- **Déclencheur** — B1.church : Nouvelle soumission de formulaire (filtrez sur un formulaire spécifique)
- **Action** — B1.church : Énumérer les membres du groupe pour un groupe cible (via une étape *Webhooks by Zapier — GET* sur `/membership/groupmembers?groupId=…`)
- **Action** — Formatrice par Zapier → Utilitaires → Transformer la réponse en un tableau `messages`
- **Action** — Webhooks by Zapier : POST le tableau complet à `/v1/messages`

### Alternative Make

Si vous préférez Make, déposez le module **HTTP — Effectuer une demande** après le déclencheur B1 Watch Events, configurez-le de la même façon (POST, Authentification de base, corps JSON). Voir l'[aperçu Make](../make) pour le côté B1.

## Limites et remarques

- **L'authentification de base est la seule méthode d'authentification** — Mobile Message émet un nom d'utilisateur et un mot de passe à partir du tableau de bord. Traiter les deux comme des secrets.
- **`sender` doit être un ID d'expéditeur enregistré** sur votre compte Mobile Message, sinon l'envoi retournera `400 Expéditeur invalide`. Les réglementations australiennes nécessitent l'enregistrement de l'expéditeur.
- **Les numéros de téléphone australiens** peuvent être `0412345678` (local) ou `+61412345678` (international). L'API accepte les deux, mais normalisez sur `+61…` si vous envoyez aussi à l'étranger.
- **Jusqu'à 10 000 messages par demande** — utile pour les diffusions, mais une seule livraison de webhook B1 rarement émet une liste aussi grande; réservez le point de terminaison de lot pour les Zaps programmés en masse.

## Dépannage

- **POST retourne `401 Non autorisé`** — les identifiants d'authentification de base sont incorrects. Re-copiez du tableau de bord Mobile Message *Compte → Paramètres API*. Remarquez que le nom d'utilisateur est votre email de compte par défaut, pas une clé API séparée.
- **POST retourne `400 Expéditeur invalide`** — la valeur `sender` n'est pas un ID d'expéditeur enregistré sur votre compte. Enregistrez-le d'abord dans le tableau de bord Mobile Message.
- **Le texte arrive mais est tronqué** — Mobile Message divise les messages sur ~160 caractères en plusieurs parties; vous êtes facturé par partie. Vérifiez le corps de la réponse — il vous indique le nombre de parties.

## Voir aussi

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — fournisseurs SMS alternatifs avec des applications Zapier natives (aucune étape Webhooks-by-Zapier nécessaire)
- [Zapier (aperçu)](../zapier) — côté B1 de chaque recette Zapier
- [Docs API Mobile Message](https://mobilemessage.com.au/api-documentation)
