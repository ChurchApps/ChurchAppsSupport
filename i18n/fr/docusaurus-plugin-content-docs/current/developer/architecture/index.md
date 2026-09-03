---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Ces pages sont des cartes de systèmes inter-repo : elles documentent comment un système central de ChurchApps fonctionne de bout en bout — dans les applications, les modules API, et les bibliothèques partagées — plutôt que comment un seul projet est configuré. Lisez-les avant de modifier le comportement d'un système ; lisez [Configuration](../setup/) pour mettre un projet en place et la section [API](../api/) pour la référence au niveau du point de terminaison.

</div>

## L'écosystème en un coup d'œil

ChurchApps est ~20 référentiels indépendants (pas un monorepo). Les applications client parlent à un petit ensemble d'API backend sur HTTPS et WebSocket, et partagent du code via des paquets npm publiés sous la portée `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — monolithe modulaire principal (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    tableau de bord du personnel    │   membership    attendance    content        │
│  B1App      portail des membres +          │   giving        messaging     doing          │
│             sites web d'église             │                                              │
│  B1Checkin  borne de pointage     │ ◀───WS───▶ │   une base de données MySQL par module (6 au total)    │
│  B1Mobile   (maintenance uniquement) │            └──────────────────────────────────────────────┘
│  FreePlay   lecteur de contenu TV  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────────┘            │  LessonsApi — Backend Lessons.church         │
                │                             └──────────────────────────────────────────────┘
                │  code partagé via npm (@churchapps/*)
                ▼
   helpers (interfaces cross-app) · apphelper (composants React) · apihelper (utilitaires Express/serveur)
```

Deux règles structurelles façonnent tout ce qui est documenté dans cette section :

1. **Les modules sont isolés.** Chaque module Api possède sa base de données et ses tables ; d'autres modules et applications n'accèdent à ses données que via ses points de terminaison REST. Voir [Structure du Module](../api/module-structure).
2. **Le code partagé s'expédie comme paquets npm.** Les applications n'importent jamais la source les unes des autres; tout ce qui est réutilisé traverse les limites du repo via `@churchapps/helpers`, `@churchapps/apphelper`, ou `@churchapps/apihelper`. Voir [Bibliothèques Partagées](../shared-libraries/).

## Cartes de systèmes

| Page | Ce qu'elle couvre | Couvre |
|------|----------------|-------|
| [Notifications et Rappels](./notifications) | Comment n'importe quoi dit à une personne quelque chose : les deux portes de dispatch, la chaîne d'escalade des canaux, et le moteur de rappel | Api (messaging), B1Admin, B1App |
| [Architecture en Temps Réel](../realtime) | Le cadre de livraison WebSocket derrière le chat, la présence, et la livraison in-app | Api (messaging), toutes les applications web |
| [Notifications Push Web](../web-push) | Le canal push du navigateur : clés VAPID, stockage des abonnements, livraison | Api (messaging), toutes les applications web |
| [Dons](./giving) | Fournisseurs et passerelles de paiement, flux de donations, fonds/lots, webhooks de passerelle | Api (giving), apphelper, B1App, B1Admin |
| [Inscriptions d'Événement](./registrations) | Le modèle commerce d'inscription: types de participants, sélections, codes de réduction, paiements via la passerelle de dons, et la liste d'attente | Api (content + giving), B1App, B1Admin |
| [Pointages](./check-ins) | Borne et auto-pointage, le modèle de données de participation, routage de salle, la couche de sécurité des enfants, impression d'étiquettes | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Générateur de Site Web](./website-builder) | L'arborescence page/section/élément, le contrat et les rendus de type d'élément, blog, pages d'accès contrôlé, SEO, et génération d'IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routage et Multi-Site du Site Web](./websites) | Comment une requête se résout en une église et un site spécifique, le modèle de données `siteId` multi-site, et l'edge de domaine personnalisé Caddy | B1App, Api (membership + content), B1Admin |
| [Intégrations](./integrations) | La surface d'extension : OAuth, clés API, webhooks, fournisseurs de contenu, MCP | Api, bibliothèques partagées, applications externes |
| [Journal d'Audit et Lots Annulables](./audit-log) | Audit par défaut de chaque mutation au point d'étranglement du contrôleur, et la couche de lot qui rend les importations et les actions en masse annulables | Api (tous les modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Le service de stockage payant et de crédit textos : identité JWT partagée, S2S clé de service, les sérums du fournisseur de textos et de stockage, facturation Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paquets textos/apihelper, B1Admin |
| [Apportez Votre Propre Stockage](./byos-storage) | Les églises lient Google Drive, Dropbox, OneDrive ou un bucket compatible S3 pour les téléchargements au-delà de 100 Mo libres : connexion OAuth, formes de téléchargement par fournisseur, la redirection de téléchargement public | Api (content + membership), paquets helpers/apphelper, B1Admin, B1App |
| [Communs de Contenu](./commons) | La colonne vertébrale d'actif/soumission partagée derrière le contenu généré par l'utilisateur inter-produit, et la file d'attente de modération réservée au personnel unique dans B1Admin Server Admin | Api (commons module), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Lorsqu'un changement modifie le fonctionnement de l'un de ces systèmes — pas seulement une page à l'intérieur d'une application — la carte du système correspondante ici devrait être mise à jour dans le même effort. Cela maintient cette section fiable comme premier arrêt pour les nouveaux contributeurs.
:::
