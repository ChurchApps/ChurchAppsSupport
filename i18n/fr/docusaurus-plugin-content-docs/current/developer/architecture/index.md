---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Ces pages sont des cartes système inter-dépôts : elles documentent comment un système central de ChurchApps fonctionne de bout en bout — à travers les applications, les modules d'API, et les bibliothèques partagées — plutôt que la manière dont un projet individuel est configuré. Lisez-les avant de modifier le comportement d'un système ; lisez [Configuration](../setup/) pour faire tourner un projet, et la [section API](../api/) pour la référence au niveau des points de terminaison.

</div>

## L'écosystème en un coup d'œil

ChurchApps est constitué d'environ 20 dépôts indépendants (pas un monorepo). Les applications clientes parlent à un petit ensemble d'API backend via HTTPS et WebSocket, et partagent du code par le biais de paquets npm publiés sous la portée `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — monolithe modulaire central (AWS Lambda)│
│                                │            │                                              │
│  B1Admin    tableau de bord du personnel │   membership    attendance    content        │
│  B1App      portail des membres +         │ HTTPS  giving        messaging     doing          │
│             sites web d'église     │ ─────────▶ │                                              │
│  B1Checkin  kiosque de check-in    │ ◀───WS───▶ │   une base de données MySQL par module (6 au total) │
│  B1Mobile   (maintenance uniquement)│            └──────────────────────────────────────────────┘
│  FreePlay   lecteur de contenu TV  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — backend de Lessons.church         │
                │                             └──────────────────────────────────────────────┘
                │  code partagé via npm (@churchapps/*)
                ▼
   helpers (interfaces inter-applications) · apphelper (composants React) · apihelper (utilitaires Express/serveur)
```

Deux règles structurelles façonnent tout ce qui est documenté dans cette section :

1. **Les modules sont isolés.** Chaque module de l'Api possède sa base de données et ses tables ; les autres modules et applications n'atteignent ses données que par ses points de terminaison REST. Voir [Structure des modules](../api/module-structure).
2. **Le code partagé est diffusé sous forme de paquets npm.** Les applications n'importent jamais le code source les unes des autres ; tout ce qui est réutilisé traverse les frontières de dépôt via `@churchapps/helpers`, `@churchapps/apphelper`, ou `@churchapps/apihelper`. Voir [Bibliothèques partagées](../shared-libraries/).

## Cartes système

| Page | Ce qu'elle couvre | Périmètre |
|------|----------------|-------|
| [Notifications et rappels](./notifications) | Comment quoi que ce soit signale quelque chose à une personne : les deux portes de distribution, la chaîne d'escalade de canaux, et le moteur de rappel | Api (messaging), B1Admin, B1App |
| [Architecture temps réel](../realtime) | Le cadre de livraison WebSocket derrière le chat, la présence, et la livraison en application | Api (messaging), toutes les applications web |
| [Notifications push Web](../web-push) | Le canal de push navigateur : clés VAPID, stockage d'abonnements, livraison | Api (messaging), toutes les applications web |
| [Dons](./giving) | Fournisseurs de paiement et passerelles, flux de dons, fonds/lots, webhooks de passerelle | Api (giving), apphelper, B1App, B1Admin |
| [Inscriptions aux événements](./registrations) | Le modèle commercial d'inscription : types de participants, sélections, codes de réduction, paiements via la passerelle de dons, et la liste d'attente | Api (content + giving), B1App, B1Admin |
| [Présences (Check-Ins)](./check-ins) | Check-in kiosque et autonome, le modèle de données de présence, le routage des salles, la couche de sécurité des enfants, l'impression d'étiquettes | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Constructeur de site Web](./website-builder) | L'arbre page/section/élément, le contrat de type d'élément et les moteurs de rendu, le blog, les pages à accès restreint, le SEO, et la génération par IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routage du site Web et multi-site](./websites) | Comment une requête se résout vers une église et un site spécifique, le modèle de données multi-site `siteId`, et le bord Caddy pour les domaines personnalisés | B1App, Api (membership + content), B1Admin |
| [Intégrations](./integrations) | La surface d'extension : OAuth, clés API, webhooks, fournisseurs de contenu, MCP | Api, bibliothèques partagées, applications externes |
| [Journal d'audit et lots annulables](./audit-log) | Audit activé par défaut de chaque mutation au point de passage du contrôleur, et la couche de lots qui rend les importations et actions en masse annulables | Api (tous les modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Le service payant de stockage et de crédits SMS : identité JWT partagée, S2S par clé de service, les points de contact fournisseur texting et stockage, la facturation Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paquets texting/apihelper, B1Admin |

:::tip
Quand un changement modifie le fonctionnement de l'un de ces systèmes — pas seulement une page à l'intérieur d'une application — la carte système correspondante ici doit être mise à jour dans le même effort. Cela garde cette section digne de confiance en tant que premier arrêt pour les nouveaux contributeurs.
:::
