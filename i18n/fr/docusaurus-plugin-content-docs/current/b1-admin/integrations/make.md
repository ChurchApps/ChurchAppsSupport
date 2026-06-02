---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (anciennement Integromat) est une plate-forme d'automatisation des workflows visuels — similaire à Zapier, avec une logique plus flexible et une facture moins chère à grande échelle. L'application Make officielle B1.church vous permet de créer des « scénarios » qui réagissent instantanément aux événements B1 et écrivent les records en retour dans B1.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Un compte [Make](https://www.make.com) (le niveau gratuit couvre les petits workflows)
- Un administrateur de l'église avec la permission **Modifier les paramètres** dans B1Admin
- Une idée approximative du scénario que vous souhaitez créer

</div>

## Modules

| Type | Quoi | Événement / point de terminaison B1 |
|---|---|---|
| **Déclencheur instantané** | Surveiller les événements | tout événement B1 abonné (`person.created`, `donation.created`, …) |
| **Action** | Créer une personne | ajoute une nouvelle personne |
| **Action** | Ajouter une donation | enregistre une donation |
| **Action** | Ajouter un membre de groupe | ajoute une personne à un groupe |
| **Recherche** | Rechercher des personnes | trouve des personnes par nom ou email |

Le déclencheur instantané vous permet de choisir quel événement écouter — un module de déclencheur par scénario, configuré par événement.

## Configuration

### 1. Créer une clé API B1

1. Dans B1Admin allez à **Paramètres → Développeur → Clés API**.
2. Cliquez sur **Nouvelle clé API**, nommez-la « Make », et accordez les scopes dont vous avez besoin.
3. **Incluez `settings:write`** si l'un de vos scénarios utilise le déclencheur instantané — Make enregistre un webhook en votre nom quand le scénario s'active.
4. Accordez aussi les scopes que les modules d'action ont besoin (par exemple `donations:write` pour le module Ajouter une donation).
5. Enregistrez et copiez la clé `cak_…`.

### 2. Installer la connexion

1. Dans Make, créez un nouveau scénario et mettez le module de déclenchement **B1.church** sur la toile.
2. Quand demandé, **Créer une connexion**. Collez la clé API dans le champ *Clé API* et laissez *URL de base API* comme `https://api.churchapps.org` (sauf si vous testez sur staging).
3. Cliquez sur **Enregistrer** — Make teste la clé en lisant votre profil d'église.

La connexion est enregistrée sur votre compte Make et réutilisée dans les scénarios.

### 3. Configurer le déclencheur

1. Ouvrez les paramètres du module **Surveiller les événements**.
2. Choisissez l'événement que vous voulez — par exemple `donation.created`.
3. Enregistrez. Make génère une URL de webhook unique et la stocke en interne.

### 4. Ajouter des modules en aval

Mettez l'un des centaines de modules d'applications de Make sur la toile — Mailchimp, Google Sheets, Slack, HubSpot, votre propre point de terminaison HTTP, etc. Mappez la sortie du déclencheur (`event`, `churchId`, `data.id`, `data.amount`, …) dans leurs champs d'entrée. Les modules d'aplatissement / itérateur / routeur / agrégateur de Make vous permettent de créer des flux ramifiés et parallèles qui seraient difficiles dans Zapier.

### 5. Activer le scénario

Basculez **Actif** dans l'en-tête du scénario. Make appelle `POST /membership/webhooks` de B1 pour enregistrer l'URL. À partir de ce moment, chaque événement B1 correspondant flux à travers le scénario en temps réel.

Désactiver le scénario appelle `DELETE /membership/webhooks/{id}` donc il n'y a pas d'abonnements orphelins.

## Recettes courantes

### Synchroniser les donations dans une Google Sheet pour examen financier

- **Déclencheur** — B1 : Surveiller les événements (`donation.created`)
- **Action** — Google Sheets : Ajouter une ligne. Mappez `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` dans les colonnes du tableur.

### Notification Slack conditionnelle par montant de donation

- **Déclencheur** — B1 : Surveiller les événements (`donation.created`)
- **Routeur**:
  - Branche A — Filtre: `data.amount >= 1000` → Slack : poster sur `#major-gifts`
  - Branche B — fallthrough → Slack : poster sur `#donations`

### Nouvelle personne → CRM + email de bienvenue + Slack

- **Déclencheur** — B1 : Surveiller les événements (`person.created`)
- **Action** — HubSpot : Créer un contact
- **Action** — Mailgun : Envoyer un email de bienvenue
- **Action** — Slack : Notifier `#new-people` (en parallèle — utiliser le routeur de Make)

## Fonctionnement du déclencheur instantané

Le déclencheur instantané est basé sur webhooks, pas sur le polling — quand activé, Make appelle `POST /membership/webhooks` avec son URL générée et l'événement que vous avez choisi. Quand l'événement se déclenche dans B1, B1 POSTE l'enveloppe à l'URL de Make et votre scénario s'exécute en quelques secondes. Désactiver le scénario supprime le webhook.

Le déclencheur ne se déclenche que pour les événements qui se produisent **pendant que le scénario est actif**. Il n'y a pas de remplissage rétroactif.

## Limites et remarques

- **Un événement par module Surveiller les événements.** Pour écouter plusieurs événements dans un scénario, mettez plusieurs modules de déclenchement dans des scénarios séparés (ou utilisez un seul module avec la liste d'événements unifiée — voir ci-dessous).
- **La vérification de signature n'est pas exposée** — Make ne passe pas `X-B1-Signature` au scénario; la limite de confiance est l'URL de webhook indevinable par scénario de Make. C'est normal pour la pratique de Make. Si vous avez besoin de vérifications de signature explicites, créez une intégration personnalisée avec le [SDK](/docs/developer/api/webhooks#sdk-support) à la place.
- **Compte d'opération** — chaque appel API d'un module d'action compte contre votre quota d'opérations Make, pas contre quoi que ce soit du côté B1.

## Dépannage

- **Le test de connexion échoue** — le plus souvent une typo dans la clé API. Recopiez-la de B1Admin (la clé complète n'est affichée qu'une fois; si vous l'avez perdue, créez une nouvelle clé).
- **Le module de déclencheur ne s'active pas** — vérifiez **Paramètres → Développeur → Webhooks** dans B1Admin. Si vous ne voyez pas une ligne « Make — &lt;event&gt; » après activation du scénario, la clé manque `settings:write`. Mettez à jour la clé et réactivez.
- **L'action retourne `403 Forbidden`** — la clé API manque du scope pour ce point de terminaison. Par exemple, Ajouter une donation a besoin `donations:write`. Mettez à jour la clé dans B1Admin et re-testez.

## Personnaliser l'application

L'application Make B1.church est open source — les définitions JSON vivent dans le dépôt `B1Integrations/Make/`. Si vous avez besoin d'un module qui n'existe pas (par exemple une nouvelle action pour un point de terminaison que nous n'avons pas couvert), ouvrez une issue ou PR là.

## Voir aussi

- [Zapier](./zapier) — même motif avec une UI plus simple et un plus grand catalogue d'applications
- [Slack & Discord](./slack-discord) — notifications de chat intégrées sans Make
- [Webhooks (référence développeur)](/docs/developer/api/webhooks)
