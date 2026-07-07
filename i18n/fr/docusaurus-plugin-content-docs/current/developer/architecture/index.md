---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Ces pages sont des cartes de système inter-repos : elles documentent comment un système ChurchApps core fonctionne de bout en bout — sur les applications, les modules d'API, et les bibliothèques partagées — plutôt que la manière dont un seul projet est configuré. Les lire avant de changer le comportement d'un système ; lire [Configuration](../setup/) pour obtenir un projet en cours d'exécution et la [section API](../api/) pour la référence au niveau du point de terminaison.

</div>

## L'écosystème d'un coup d'œil

ChurchApps est ~20 dépôts indépendants (pas un monorepo). Les applications client parlent à un petit ensemble d'API de fond sur HTTPS et WebSocket, et partagent le code via les packages npm publiés sous la portée `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — monolithe modulaire core (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    tableau de bord du personnel    │   membership    attendance    content        │
│  B1App      portail des membres +           │   giving        messaging     doing          │
│             sites web d'église    │ HTTPS   │                                              │
│  B1Checkin  kiosque presqu'un     │ ─────────▶ │   une base de données MySQL par module (6 total)    │
│  B1Mobile   (maintenance-only)    │            │                                              │
│  FreePlay   lecteur contenu TV    │            │                                              │
└───────────────┬────────────────┘            └──────────────────────────────────────────────┘
                │                             ┌──────────────────────────────────────────────┐
                │ code partagé via npm (@churchapps/*)
                ▼
   aides (interfaces inter-applications) · apphelper (composants React) · apihelper (utilitaires Express/serveur)

                                            │  LessonsApi — fond de Lessons.church         │
                                            └──────────────────────────────────────────────┘
```

Deux règles structurelles façonnent tout ce qui est documenté dans cette section :

1. **Les modules sont isolés.** Chaque module Api possède sa base de données et ses tables ; les autres modules et applications n'atteignent ses données que via ses points de terminaison REST. Voir [Structure des modules](../api/module-structure).
2. **Le code partagé navire en tant que packages npm.** Les applications ne s'importent jamais mutuellement ; tout ce qui est réutilisé traverse les limites du dépôt via `@churchapps/helpers`, `@churchapps/apphelper`, ou `@churchapps/apihelper`. Voir [Bibliothèques partagées](../shared-libraries/).

## Cartes de système

| Page | Ce qu'elle couvre | Portées |
|------|----------------|-------|
| [Notifications et rappels](./notifications) | Comment quelque chose dit à une personne quelque chose : les deux portes de dispatch, la chaîne d'escalade de canal, et le moteur de rappel | Api (messagerie), B1Admin, B1App |
| [Architecture en temps réel](../realtime) | Le cadre de livraison WebSocket derrière le chat, la présence, et la livraison en application | Api (messagerie), toutes les applications web |
| [Notifications de poussée Web](../web-push) | Le canal de poussée du navigateur : clés VAPID, stockage d'abonnement, livraison | Api (messagerie), toutes les applications web |
| [Dons](./giving) | Fournisseurs de paiement et passerelles, flux de dons, fonds/lots, webhooks de passerelle | Api (giving), apphelper, B1App, B1Admin |
| [Inscriptions à l'événement](./registrations) | Le modèle commercial d'inscription : types de participants, sélections, codes de réduction, paiements via la passerelle de dons, et la liste d'attente | Api (contenu + giving), B1App, B1Admin |
| [Présences](./check-ins) | Kiosque et présence automatique, le modèle de données de présence, routage de salle, la couche de sécurité des enfants, impression d'étiquette | B1Checkin, B1App, B1Admin, Api (présence + adhésion) |
| [Constructeur de site Web](./website-builder) | L'arbre page/section/élément, le contrat de type d'élément et les rendeurs, blog, pages gated-accès, SEO, génération IA, et formulaires conversationnels | Api (contenu), AskApi, aides/apphelper, B1Admin, B1App |
| [Routage du site Web et multi-site](./websites) | Comment une demande se résout à une église et un site spécifique, le modèle de données `siteId` multi-site, et le bord personnalisé Caddy statique | B1App, Api (adhésion + contenu), B1Admin |
| [Intégrations](./integrations) | La surface d'extension : OAuth, clés API, webhooks, fournisseurs de contenu, MCP | Api, bibliothèques partagées, applications externes |
| [Journal d'audit et lots annulables](./audit-log) | Audit par défaut-activé de chaque mutation au point de stranglulation du contrôleur, et la couche de lot qui rend les importations et les actions en masse annulables | Api (tous modules), B1Admin, B1Transfer |

:::tip
Quand un changement altère le fonctionnement de l'un de ces systèmes — pas seulement une page à l'intérieur d'une application — la carte de système appairée ici devrait être mise à jour dans le même effort. Cela maintient cette section digne de confiance en tant que premier arrêt pour les nouveaux contributeurs.
:::
