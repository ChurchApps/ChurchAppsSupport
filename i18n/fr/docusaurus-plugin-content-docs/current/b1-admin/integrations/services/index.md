---
title: "Services connectés"
---

# Services connectés

<div class="article-intro">

La façon la plus rapide de connecter B1 à un autre outil de technologie d'église est généralement une recette Zapier ou Make — vous n'avez pas besoin d'une nouvelle infrastructure B1, et le tiers héberge le workflow. Cette page est une liste organisée de services que nous avons confirmés comme filables aujourd'hui, avec un court guide de configuration copier-coller pour chacun.

</div>

## En un coup d'œil

| Service | Catégorie | Pont | Ce que vous pouvez connecter |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier ou Make | Synchroniser les nouvelles personnes B1 / donateurs dans une audience Mailchimp |
| [Donorbox](./donorbox) | Donations | Zapier | Repousser les donations et donateurs Donorbox dans B1 |
| [Subsplash](./subsplash) | App / Donations | Zapier | Tirer les donations et personnes Subsplash dans B1 |
| [VOMO](./vomo) | Bénévolat | Zapier | Synchroniser les inscriptions de bénévoles entre les groupes B1 et les projets VOMO |
| [Clearstream](./clearstream) | SMS | Zapier | Déclencher un texte Clearstream à partir des événements B1; ingérer les réponses en tant que dossiers B1 |
| [Text In Church](./text-in-church) | SMS / Workflows | Zapier | Déclencher les workflows Text In Church à partir de B1; recevoir les données Connect Card |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier ou Make | Envoyer des SMS à partir de n'importe quel événement B1 |
| [Checkr](./checkr) | Vérifications d'antécédents | Make | Déclencher une vérification d'antécédents quand quelqu'un rejoint une équipe de service |

## Ce que tous ces éléments ont en commun

1. **Le côté B1 du câblage est identique** — créez une clé API avec les bons scopes dans **B1Admin → Paramètres → Développeur → Clés API**, puis soit laissez le pont enregistrer un webhook pour le déclencheur (Zapier / Make font cela automatiquement, nécessitent `settings:write`) ou appelez les points de terminaison REST B1 à partir d'une action en aval.
2. **Le pont vous facture, pas nous.** ChurchApps est gratuit; Zapier et Make ont tous deux des niveaux gratuits qui couvrent une poignée de recettes.
3. **Vous pouvez tester le câblage sans aller en direct.** Les deux ponts ont un bouton « Étape de test » qui déclenche le déclencheur une fois contre B1 et vous montre la forme des données avant que vous n'activiez la recette.

## Choisir un pont

- **Zapier** est plus convivial et a le plus grand catalogue d'applications — utilisez-le par défaut sauf si le coût est un problème.
- **Make** est moins cher à grande échelle et a une logique de routage/filtrage plus flexible — utilisez-le quand un seul workflow a fan-out, des conditions, ou beaucoup d'étapes.
- **Webhooks by Zapier** (utilisé pour le doc Mobile Message) est un adaptateur générique qui vous permet de POSTER à n'importe quel point de terminaison HTTP d'un Zap quand la destination n'est pas une application Zapier de première classe.

Si vous voulez quelque chose qui n'est pas sur cette liste, l'[API REST](/docs/developer/api) et les [webhooks](/docs/developer/api/webhooks) de B1 sont ouverts — vous pouvez construire un pont unique avec le [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) en quelques heures.

## Ce qui n'est pas ici (et pourquoi)

Plusieurs outils de technologie d'église populaires — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — n'ont pas d'application Zapier ou de module Make publiés aujourd'hui. Ils ont leurs propres API mais les connecter à B1 est un travail de code personnalisé, pas une recette, donc ils ne rentrent pas dans cette liste. Si un vendeur ajoute une application Zapier ou un module Make, nous ajouterons le doc.

Nous avons aussi délibérément ignoré les outils spécifiques à Planning Center-Services (musique, présentation), les produits ChMS concurrents, les consultants en migration, et les outils qui ne nettoient que les données spécifiques à PCO — aucun d'eux n'a un chemin de câblage utile dans B1.

## Voir aussi

- [Zapier (aperçu)](../zapier) — le côté B1 de chaque recette Zapier est identique; ce doc le couvre une fois
- [Make (aperçu)](../make) — idem pour les scénarios Make
- [Slack & Discord](../slack-discord) — notifications de chat sans aucun pont
- [Google Sheets](../google-sheets) — exports à la demande
- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — le catalogue d'événements sur lequel chaque recette s'appuie
