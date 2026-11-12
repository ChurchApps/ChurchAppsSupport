---
title: "Make"
description: "Connectez B1 Admin à Make pour automatiser vos flux de travail : créez une clé API, configurez le déclencheur et les actions B1.church, et résolvez les erreurs courantes."
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (anciennement Integromat) est une plateforme visuelle d'automatisation de flux de travail — proche de Zapier dans son esprit, avec une logique plus souple et une facture moins élevée à grande échelle. L'application officielle B1.church pour Make vous permet de créer des « scénarios » qui réagissent instantanément aux événements B1 et y écrivent des enregistrements.

</div>

:::caution Pas encore disponible
L'application B1.church pour Make n'est pas encore publiée dans le répertoire d'applications de Make : vous ne pouvez donc pas ajouter les modules **B1.church** décrits ci-dessous à un scénario aujourd'hui. D'ici là, utilisez [Zapier](./zapier.md), ou appelez l'[API REST](/docs/developer/api) de B1 depuis le module **HTTP — Effectuer une requête** de Make avec une [clé API](/docs/developer/api/api-keys). Tout ce qui suit décrit le fonctionnement de l'application une fois publiée.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Make](https://www.make.com) (l'offre gratuite couvre les petits flux de travail)
- Un administrateur d'église disposant de l'autorisation **Modifier les paramètres** dans B1Admin
- Une idée générale du scénario que vous souhaitez créer

</div>

## Modules {#modules}

| Type | Quoi | Événement / point de terminaison B1 |
|---|---|---|
| **Déclencheur instantané** | Surveiller les événements | tout événement B1 auquel vous êtes abonné (`person.created`, `donation.created`, …) |
| **Action** | Créer une personne | ajoute une nouvelle personne |
| **Action** | Ajouter un don | enregistre un don |
| **Action** | Ajouter un membre de groupe | ajoute une personne à un groupe |
| **Recherche** | Rechercher des personnes | trouve des personnes par nom ou par courriel |

Le déclencheur instantané vous permet de choisir l'événement à surveiller — un seul module déclencheur par scénario, configuré pour chaque événement.

## Configuration {#setup}

### 1. Créer une clé API B1 {#1-create-a-b1-api-key}

1. Dans B1Admin, allez dans **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, nommez-la « Make », et accordez les autorisations dont vous avez besoin.
3. **Incluez `settings:write`** si l'un de vos scénarios utilise le déclencheur instantané — Make enregistre un webhook en votre nom lorsque le scénario est activé.
4. Accordez également les autorisations nécessaires aux modules d'action (par exemple `donations:write` pour le module Ajouter un don).
5. Enregistrez et copiez la clé `cak_…`.

### 2. Installer la connexion {#2-install-the-connection}

1. Dans Make, créez un nouveau scénario et déposez le module déclencheur **B1.church** sur le canevas.
2. Lorsque vous y êtes invité, **créez une connexion**. Collez la clé API dans le champ *Clé API* et laissez le champ *URL de base de l'API* sur `https://api.churchapps.org` (sauf si vous testez sur l'environnement de préproduction).
3. Cliquez sur **Enregistrer** — Make teste la clé en lisant le profil de votre église.

La connexion est enregistrée dans votre compte Make et réutilisée d'un scénario à l'autre.

### 3. Configurer le déclencheur {#3-configure-the-trigger}

1. Ouvrez les paramètres du module **Surveiller les événements**.
2. Choisissez l'événement souhaité — par exemple `donation.created`.
3. Enregistrez. Make génère une URL de webhook unique et la stocke en interne.

### 4. Ajouter les modules en aval {#4-add-downstream-modules}

Déposez sur le canevas l'un des centaines de modules d'applications de Make — Mailchimp, Google Sheets, Slack, HubSpot, votre propre point de terminaison HTTP, etc. Associez la sortie du déclencheur (`event`, `churchId`, `data.id`, `data.amount`, …) aux champs de saisie. Les modules Aplatir / Itérateur / Routeur / Agrégateur de Make vous permettent de construire des flux en embranchement et en parallèle, difficiles à réaliser avec Zapier.

### 5. Activer le scénario {#5-turn-the-scenario-on}

Basculez sur **Actif** dans l'en-tête du scénario. Make appelle `POST /membership/webhooks` de B1 pour enregistrer l'URL. À partir de ce moment, chaque événement B1 correspondant parcourt le scénario en temps réel.

Désactiver le scénario appelle `DELETE /membership/webhooks/{id}` afin qu'aucun abonnement orphelin ne subsiste.

## Recettes courantes {#common-recipes}

### Synchroniser les dons vers un Google Sheet pour la revue financière {#sync-donations-to-a-google-sheet-for-finance-review}

- **Déclencheur** — B1 : Surveiller les événements (`donation.created`)
- **Action** — Google Sheets : Ajouter une ligne. Associez `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` aux colonnes de la feuille.

### Notification Slack conditionnelle selon le montant du don {#conditional-slack-notification-by-donation-amount}

- **Déclencheur** — B1 : Surveiller les événements (`donation.created`)
- **Routeur** :
  - Branche A — Filtre : `data.amount >= 1000` → Slack : publier dans `#major-gifts`
  - Branche B — par défaut → Slack : publier dans `#donations`

### Nouvelle personne → CRM + courriel de bienvenue + Slack {#new-person--crm--welcome-email--slack}

- **Déclencheur** — B1 : Surveiller les événements (`person.created`)
- **Action** — HubSpot : Créer un contact
- **Action** — Mailgun : Envoyer un courriel de bienvenue
- **Action** — Slack : Avertir `#new-people` (en parallèle — utilisez le routeur de Make)

## Fonctionnement du déclencheur instantané {#how-the-instant-trigger-works}

Le déclencheur instantané repose sur un webhook, et non sur une interrogation périodique : lors de l'activation, Make appelle `POST /membership/webhooks` avec son URL générée et l'événement choisi. Lorsque l'événement se produit dans B1, B1 envoie l'enveloppe à l'URL de Make, et votre scénario s'exécute en quelques secondes. Désactiver le scénario supprime le webhook.

Le déclencheur ne se déclenche que pour les événements qui surviennent **pendant que le scénario est actif**. Il n'y a pas de rattrapage des événements passés.

## Limites et remarques {#limits--notes}

- **Un événement par module Surveiller les événements.** Pour écouter plusieurs événements, créez un scénario par événement.
- **La vérification de signature n'est pas exposée** — Make ne transmet pas `X-B1-Signature` au scénario ; la limite de confiance est l'URL de webhook propre à chaque scénario, impossible à deviner. C'est une pratique courante avec Make. Si vous avez besoin de vérifications de signature explicites, créez plutôt une intégration sur mesure avec le [SDK](/docs/developer/api/webhooks#sdk-support).
- **Nombre d'opérations** — chaque appel d'API effectué par un module d'action est décompté de votre quota d'opérations Make, et non de quoi que ce soit côté B1.

## Dépannage {#troubleshooting}

- **Le test de connexion échoue** — le plus souvent, il s'agit d'une faute de frappe dans la clé API. Recopiez-la depuis B1Admin (la clé complète n'est affichée qu'une seule fois ; si vous l'avez perdue, créez-en une nouvelle).
- **Le module déclencheur ne s'active pas** — vérifiez **Paramètres → Développeur → Webhooks** dans B1Admin. Si vous ne voyez pas de ligne « Make — &lt;événement&gt; » après l'activation du scénario, la clé ne comporte pas `settings:write`. Mettez la clé à jour et réactivez le scénario.
- **L'action renvoie `403 Forbidden`** — la clé API ne comporte pas l'autorisation nécessaire pour ce point de terminaison. Par exemple, Ajouter un don nécessite `donations:write`. Mettez la clé à jour dans B1Admin et refaites le test.

## Module manquant ? {#missing-a-module}

Si vous avez besoin d'un module qui n'existe pas (par exemple, une nouvelle action pour un point de terminaison que nous n'avons pas encore couvert), écrivez à [support@churchapps.org](mailto:support@churchapps.org). En attendant, le module **HTTP — Effectuer une requête** de Make peut appeler n'importe quel point de terminaison de B1 avec un en-tête `Authorization: Bearer cak_…`.

## Voir aussi {#see-also}

- [Zapier](./zapier.md) — même principe, avec une interface plus simple et un catalogue d'applications plus vaste
- [Slack et Discord](./slack-discord.md) — notifications de messagerie intégrées, sans Make
- [Webhooks (référence développeur)](/docs/developer/api/webhooks)
