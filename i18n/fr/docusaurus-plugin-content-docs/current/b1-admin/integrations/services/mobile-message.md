---
title: "Mobile Message"
description: "Reliez les événements de B1 Admin à Mobile Message, une API SMS australienne, à l'aide des webhooks Zapier ou Make pour envoyer des messages de bienvenue, de remerciement pour un don et des rappels."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) est une API SMS australienne, appréciée des églises australiennes car elle propose des numéros locaux et une tarification australienne compétitive, là où Clearstream et Text In Church sont davantage centrés sur les États-Unis. Mobile Message ne dispose pas aujourd'hui d'une application Zapier de premier plan, mais il publie une API REST publique : vous pouvez donc relier les événements B1 aux SMS Mobile Message via **Webhooks by Zapier** (ou le module HTTP de Make) en quelques minutes.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Mobile Message](https://mobilemessage.com.au) avec un identifiant d'expéditeur enregistré et des identifiants d'API (nom d'utilisateur et mot de passe d'API sous *Compte → Paramètres de l'API*)
- Un compte [Zapier](https://zapier.com) (ou [Make](https://www.make.com))
- Un utilisateur B1Admin disposant de l'autorisation **Modifier les paramètres**

</div>

## Ce que vous pouvez configurer {#what-you-can-wire-up}

L'API de Mobile Message est conçue pour « envoyer des SMS » : aucun déclencheur, seulement des messages sortants. Toutes les recettes vont donc de B1 vers les SMS :

| Sens | Déclencheur B1 | Résultat |
|---|---|---|
| B1 → Mobile Message | `person.created` | Message de bienvenue à la nouvelle personne |
| B1 → Mobile Message | `donation.created` | Message de remerciement au donateur |
| B1 → Mobile Message | `form.submission.created` | Alerter l'équipe de garde |
| B1 → Mobile Message | `event.created` | Diffusion d'un rappel à une liste |

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-mint-a-b1-api-key}

**Paramètres → Développeur → Clés API → Nouvelle clé API** :

- `settings:write` — pour que le webhook du déclencheur puisse s'enregistrer
- `people:read` — pour retrouver le numéro de téléphone du destinataire à partir d'un `personId`

### 2. Créer le Zap avec Webhooks by Zapier {#2-build-the-zap-with-webhooks-by-zapier}

1. **Déclencheur** — B1.church : choisissez l'événement souhaité (par exemple Nouveau don).
2. **Action** — B1.church : Rechercher une personne (à l'aide de `data.personId`) pour obtenir le numéro de téléphone et le nom.
3. **Action** — Webhooks by Zapier : **POST**. Configurez comme indiqué ci-dessous.

Les paramètres de l'étape POST :

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Type de charge utile** — JSON
- **Données** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **En-têtes** — `Content-Type: application/json` (Webhooks by Zapier l'ajoute automatiquement)
- **Authentification de base** — renseignez le champ *Basic Auth* avec `<api_username>|<api_password>` (Zapier convertit cela en en-tête `Authorization: Basic …` approprié)

Activez le Zap. Envoyez un don test dans B1Admin pour vérifier qu'un SMS arrive.

## Recettes courantes {#common-recipes}

### Rappels d'événements le matin même {#event-reminders-the-morning-of}

- **Déclencheur** — Planification par Zapier (tous les jours, à 7 h)
- **Action** — conservez la liste des événements du jour dans un Google Sheet (ou dans une autre application que Zapier peut lire) et recherchez les lignes du jour — l'application Zapier de B1 n'a pas d'action pour rechercher des événements
- **Action** — Webhooks by Zapier : POST vers Mobile Message avec la liste des événements, pour un groupe d'abonnés enregistré

### Utiliser le point de terminaison par lots pour une diffusion à une liste {#use-the-batch-endpoint-for-a-list-broadcast}

Le point de terminaison `/v1/messages` de Mobile Message accepte jusqu'à 10 000 messages par appel. Pour diffuser un message à un groupe B1 :

- **Déclencheur** — B1.church : Nouvelle soumission de formulaire (filtrée sur un formulaire précis)
- **Action** — Webhooks by Zapier : GET `/membership/groupmembers?groupId=…` pour lister les membres du groupe cible (l'application Zapier de B1 n'a pas d'action de liste pour cela ; envoyez la clé API sous forme d'en-tête `Authorization: Bearer cak_…`)
- **Action** — Formatter by Zapier → Utilitaires → Transformer la réponse en lignes distinctes dans un tableau `messages`
- **Action** — Webhooks by Zapier : POST du tableau complet vers `/v1/messages`

### Solution de rechange avec Make {#make-alternative}

Si vous préférez Make, ajoutez le module **HTTP — Effectuer une requête** après le déclencheur Surveiller les événements de B1, et configurez-le de la même façon (POST, authentification de base, corps JSON). Consultez la [présentation de Make](../make.md) pour le volet B1 — notez que l'application B1.church pour Make n'est pas encore publiée.

## Limites et remarques {#limits--notes}

- **L'authentification de base est la seule méthode d'authentification** — Mobile Message émet un nom d'utilisateur et un mot de passe depuis son tableau de bord. Traitez les deux comme des secrets.
- **`sender` doit être un identifiant d'expéditeur enregistré** sur votre compte Mobile Message, faute de quoi l'envoi renverra `400 Invalid sender`. La réglementation australienne exige l'enregistrement de l'expéditeur.
- **Les numéros de téléphone australiens** peuvent être saisis sous la forme `0412345678` (local) ou `+61412345678` (international). L'API accepte les deux, mais normalisez sur `+61…` si vous envoyez aussi à l'étranger.
- **Jusqu'à 10 000 messages par requête** — utile pour les diffusions, mais une seule livraison de webhook B1 produira rarement une liste aussi longue ; réservez le point de terminaison par lots aux Zaps planifiés en masse.

## Dépannage {#troubleshooting}

- **Le POST renvoie `401 Unauthorized`** — les identifiants d'authentification de base sont erronés. Recopiez-les depuis le tableau de bord de Mobile Message, *Compte → Paramètres de l'API*. Notez que le nom d'utilisateur correspond par défaut à votre adresse courriel de compte, et non à une clé API distincte.
- **Le POST renvoie `400 Invalid sender`** — la valeur de `sender` n'est pas un identifiant d'expéditeur enregistré sur votre compte. Enregistrez-la d'abord dans le tableau de bord de Mobile Message.
- **Le SMS arrive tronqué** — Mobile Message découpe les messages de plus d'environ 160 caractères en plusieurs parties, et vous êtes facturé par partie. Consultez le corps de la réponse : il indique le nombre de parties.

## Voir aussi {#see-also}

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — autres fournisseurs SMS disposant d'applications Zapier natives (aucune étape Webhooks by Zapier nécessaire)
- [Zapier (présentation)](../zapier.md) — volet B1 de chaque recette Zapier
- [Documentation de l'API Mobile Message](https://mobilemessage.com.au/api-documentation)
