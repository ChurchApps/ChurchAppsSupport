---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Ces pages sont des cartes de système inter-référentiels : elles documentent comment un système ChurchApps central fonctionne de bout en bout -- dans les applications, les modules API et les bibliothèques partagées -- plutôt que comment un seul projet est configuré. Lisez-les avant de modifier le comportement d'un système ; lisez [Configuration](../setup/) pour faire fonctionner un projet et la [section API](../api/) pour la référence au niveau du point d'extrémité.

</div>

## L'écosystème en coup d'œil

ChurchApps est ~20 référentiels indépendants (pas un monorepo). Les applications clientes parlent à un petit ensemble d'APIs backend sur HTTPS et WebSocket, et partagent le code via les packages npm publiés sous l'étendue `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│  B1Mobile   (maintenance-only) │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Deux règles structurelles façonnent tout documenté dans cette section :

1. **Les modules sont isolés.** Chaque module Api possède sa base de données et ses tables ; les autres modules et applications atteignent ses données uniquement via ses points d'extrémité REST. Voir [Structure du module](../api/module-structure).
2. **Le code partagé se livre en tant que packages npm.** Les applications ne s'importent jamais le code source les unes des autres ; tout ce qui est réutilisé traverse les limites du référentiel via `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Voir [Bibliothèques partagées](../shared-libraries/).

## Cartes du système

| Page | Ce qu'elle couvre | Portées |
|------|----------------|-------|
| [Notifications et rappels](./notifications) | Comment quelque chose raconte quelque chose à une personne : les deux portes de répartition, la chaîne d'escalade des canaux et le moteur de rappel | Api (messaging), B1Admin, B1App |
| [Architecture temps réel](../realtime) | Le cadre de livraison WebSocket derrière le chat, la présence et la livraison en application | Api (messaging), toutes les applications web |
| [Notifications Web Push](../web-push) | Le canal push du navigateur : clés VAPID, stockage d'abonnement, livraison | Api (messaging), toutes les applications web |
| [Contributions](./giving) | Fournisseurs de paiement et passerelles, flux de donation, fonds/lots, webhooks de passerelle | Api (giving), apphelper, B1App, B1Admin |
| [Enregistrements d'événements](./registrations) | Le modèle de commerce d'enregistrement : types de participant, sélections, codes de remise, paiements via la passerelle de donation et la liste d'attente | Api (content + giving), B1App, B1Admin |
| [Enregistrements](./check-ins) | Enregistrement de borne et auto-enregistrement, modèle de données de participation, routage de salle, couche de sécurité des enfants, impression d'étiquettes | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Constructeur de site Web](./website-builder) | L'arbre page/section/élément, le contrat de type d'élément et les rendus, blog, pages gated d'accès, SEO et génération AI | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routage du site Web et multi-site](./websites) | Comment une demande se résout en une église et un site spécifique, le modèle de données `siteId` multi-site et le bord de domaine personnalisé Caddy | B1App, Api (membership + content), B1Admin |
| [Intégrations](./integrations) | La surface d'extension : OAuth, clés API, webhooks, fournisseurs de contenu, MCP | Api, bibliothèques partagées, applications externes |
| [Journal d'audit et lots annulables](./audit-log) | Audit par défaut activé de chaque mutation au point d'étranglement du contrôleur, et la couche de lot qui rend les importations et les actions en masse annulables | Api (tous les modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Le service de stockage et crédit de textos rémunérés : identité JWT partagée, S2S de clé de service, coutures de fournisseur de textos et stockage, facturation Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), packages texting/apihelper, B1Admin |
| [Apportez votre propre stockage](./byos-storage) | Les églises lient Google Drive, Dropbox, OneDrive ou un seau compatible S3 pour les uploads au-delà du 100MB libre : connexion OAuth, formes de upload par fournisseur, redirection de téléchargement public | Api (content + membership), packages helpers/apphelper, B1Admin, B1App |

:::tip
Lorsqu'un changement modifie le fonctionnement de l'un de ces systèmes -- pas seulement une page à l'intérieur d'une application -- la carte du système correspondante ici devrait être mise à jour dans le même effort. Cela maintient cette section digne de confiance comme premier arrêt pour les nouveaux contributeurs.
:::
