---
title: "Services connectés"
description: "Connectez B1 Admin à Mailchimp, Donorbox, Subsplash, VOMO, Clearstream et d'autres outils grâce aux recettes Zapier ou Make, avec un guide de configuration pour chacun."
---

# Services connectés

<div class="article-intro">

Le moyen le plus rapide de relier B1 à un autre outil technologique d'église est généralement une recette Zapier ou Make : vous n'avez besoin d'aucune nouvelle infrastructure B1, et le tiers héberge le flux de travail. Cette page présente une liste sélectionnée de services dont nous avons confirmé qu'ils peuvent être reliés dès aujourd'hui, avec un guide de configuration court à copier-coller pour chacun.

</div>

## En bref {#at-a-glance}

| Service | Catégorie | Passerelle | Ce que vous pouvez relier |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Courriel | Intégrée à B1 (onglet Webhooks) | Maintenir une audience Mailchimp synchronisée avec les personnes, groupes et listes enregistrées de B1 |
| [Donorbox](./donorbox.md) | Dons | Zapier | Renvoyer les dons et donateurs Donorbox vers B1 |
| [Subsplash](./subsplash.md) | Application / Dons | Zapier | Importer les dons et les personnes de Subsplash dans B1 |
| [VOMO](./vomo.md) | Bénévolat | Zapier | Synchroniser les inscriptions de bénévoles entre les groupes B1 et les projets VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Déclencher un SMS Clearstream à partir d'événements B1 ; intégrer les réponses comme enregistrements B1 |
| [Text In Church](./text-in-church.md) | SMS / Flux de travail | Zapier | Déclencher des flux de travail Text In Church depuis B1 ; recevoir les données de la fiche de contact |
| [Mobile Message](./mobile-message.md) | SMS (Australie) | Webhooks by Zapier ou Make | Envoyer des SMS à partir de n'importe quel événement B1 |
| [Checkr](./checkr.md) | Vérifications d'antécédents | Make | Lancer une vérification d'antécédents lorsqu'une personne rejoint une équipe de service |

## Ce que tous ces services ont en commun {#what-all-of-these-have-in-common}

1. **Le volet B1 de la liaison est identique** — créez une clé API avec les bonnes portées dans **B1Admin → Paramètres → Développeur → Clés API**, puis laissez soit la passerelle enregistrer un webhook pour le déclencheur (Zapier / Make le font automatiquement, avec `settings:write`), soit appelez les points de terminaison REST de B1 depuis une action en aval. L'application Zapier de B1.church exige `settings:write` sur chaque clé, car elle vérifie la clé par rapport à la liste des webhooks de B1 lors de la connexion. (Mailchimp fait exception : sa synchronisation est intégrée à B1 et se configure dans l'onglet **Webhooks**, sans clé API ni passerelle.)
2. **La passerelle vous facture, pas nous.** ChurchApps est gratuit ; Zapier et Make proposent tous deux des offres gratuites qui couvrent quelques recettes.
3. **Vous pouvez tester la liaison sans la mettre en production.** Zapier dispose d'un bouton « Tester l'étape » qui récupère des données d'exemple depuis B1 et vous montre la structure des données avant d'activer la recette.

## Choisir une passerelle {#picking-a-bridge}

- **Zapier** est plus convivial et propose un catalogue d'applications plus vaste — utilisez-le par défaut, sauf si le coût pose problème.
- **Make** est moins cher à grande échelle et offre une logique de routage et de filtrage plus souple — utilisez-le lorsqu'un flux de travail comporte des ramifications, des conditions ou de nombreuses étapes.
- **Webhooks by Zapier** (utilisé pour la documentation Mobile Message) est un adaptateur générique qui vous permet d'envoyer des requêtes POST vers n'importe quel point de terminaison HTTP depuis un Zap lorsque la destination n'est pas une application Zapier de premier plan.

Si vous cherchez quelque chose qui ne figure pas dans cette liste, l'[API REST](/docs/developer/api) et les [webhooks](/docs/developer/api/webhooks) de B1 sont ouverts : vous pouvez créer une passerelle sur mesure avec le [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) en quelques heures.

## Ce qui ne figure pas ici (et pourquoi) {#whats-not-here-and-why}

Plusieurs outils technologiques d'église populaires — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — ne disposent pas, à ce jour, d'application Zapier ou de module Make publié. Ils ont leurs propres API, mais les relier à B1 relève d'un développement sur mesure et non d'une simple recette ; ils ne correspondent donc pas à cette liste. Si un éditeur ajoute une application Zapier ou un module Make, nous ajouterons la documentation correspondante.

Nous avons aussi délibérément écarté les outils propres à Planning Center Services (musique, présentation), les logiciels concurrents de gestion de la vie de l'église, les consultants en migration et les outils qui ne nettoient que les données spécifiques à PCO — aucun d'entre eux n'offre de liaison utile avec B1.

## Voir aussi {#see-also}

- [Zapier (présentation)](../zapier.md) — le volet B1 de chaque recette Zapier est identique ; cette documentation le couvre une seule fois
- [Make (présentation)](../make.md) — idem pour les scénarios Make
- [Slack et Discord](../slack-discord.md) — notifications de messagerie sans aucune passerelle
- [Google Sheets](../google-sheets.md) — exportations à la demande
- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — le catalogue d'événements sur lequel repose chaque recette
