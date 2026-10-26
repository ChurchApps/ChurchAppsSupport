---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Ces pages sont des cartes transversales des systèmes : elles décrivent comment un système central de ChurchApps fonctionne de bout en bout — à travers les applications, les modules d'API et les bibliothèques partagées — plutôt que la configuration d'un projet isolé. Lisez-les avant de modifier le comportement d'un système ; lisez [Installation](../setup/) pour faire tourner un projet et la [section API](../api/) pour la référence des points de terminaison.

</div>

## L'écosystème en un coup d'œil

ChurchApps compte environ 20 dépôts indépendants (il ne s'agit pas d'un monorepo). Les applications clientes communiquent avec un petit ensemble d'API backend via HTTPS et WebSocket, et partagent du code via des paquets npm publiés sous le scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — noyau modulaire (AWS Lambda)          │
│                                │            │                                              │
│  B1Admin    tableau de bord    │   HTTPS    │   membership    attendance    content        │
│             du personnel       │ ─────────▶ │   giving        messaging     doing          │
│  B1App      portail membre +   │            │                                              │
│             sites d'église     │            │   une base MySQL par module (6 au total)     │
│  B1Checkin  kiosque d'accueil  │ ◀───WS───▶ │                                              │
│  B1Mobile   (maintenance seule)│            └──────────────────────────────────────────────┘
│  FreePlay   lecteur de contenu │            ┌──────────────────────────────────────────────┐
│             TV                 │            │  LessonsApi — backend de Lessons.church      │
└───────────────┬────────────────┘            └──────────────────────────────────────────────┘
                │
                │  code partagé via npm (@churchapps/*)
                ▼
   helpers (interfaces inter-applications) · apphelper (composants React) · apihelper (utilitaires Express/serveur)
```

Deux règles structurelles façonnent tout ce qui est documenté dans cette section :

1. **Les modules sont isolés.** Chaque module d'API possède sa base de données et ses tables ; les autres modules et applications n'accèdent à ses données que via ses points de terminaison REST. Voir [Structure des modules](../api/module-structure).
2. **Le code partagé est livré sous forme de paquets npm.** Les applications n'importent jamais le code source les unes des autres ; tout ce qui est réutilisé traverse les frontières des dépôts via `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Voir [Bibliothèques partagées](../shared-libraries/).

## Cartes des systèmes

| Page | Ce qu'elle couvre | Porte sur |
|------|-------------------|-----------|
| [Notifications et rappels](./notifications) | Comment quelque chose informe une personne : les deux portes d'envoi, la chaîne d'escalade des canaux et le moteur de rappels | Api (messaging), B1Admin, B1App |
| [Temps réel](../realtime) | La couche de diffusion WebSocket derrière le chat, la présence et la diffusion dans l'application | Api (messaging), toutes les applications web |
| [Notifications push web](../web-push) | Le canal push du navigateur : clés VAPID, stockage des abonnements, envoi | Api (messaging), toutes les applications web |
| [Dons](./giving) | Fournisseurs et passerelles de paiement, flux de dons, fonds et lots, webhooks des passerelles | Api (giving), apphelper, B1App, B1Admin |
| [Inscriptions aux événements](./registrations) | Le modèle commercial des inscriptions : types de participants, sélections, codes de réduction, paiements via la passerelle de dons, et liste d'attente | Api (content + giving), B1App, B1Admin |
| [Pointage](./check-ins) | Pointage au kiosque et en libre-service, modèle de données de présence, acheminement vers les salles, couche de sécurité des enfants, impression des étiquettes | B1Checkin, B1App, B1Admin, Api (attendance + membership) |
| [Constructeur de site web](./website-builder) | L'arbre page / section / élément, le contrat et les moteurs de rendu des types d'éléments, le blog, les pages à accès restreint, le référencement et la génération par IA | Api (content), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routage des sites et multisite](./websites) | Comment une requête est associée à une église et à un site précis, le modèle de données multisite `siteId`, et le proxy Caddy des domaines personnalisés | B1App, Api (membership + content), B1Admin |
| [Intégrations](./integrations) | La surface d'extension : OAuth, clés d'API, webhooks, fournisseurs de contenu, MCP | Api, bibliothèques partagées, applications externes |
| [Journal d'audit et lots annulables](./audit-log) | Audit activé par défaut de chaque modification au point de passage des contrôleurs, et la couche de lots qui rend annulables les imports et les actions en masse | Api (tous les modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff) | Le service payant de stockage et de crédits de messagerie : identité par JWT partagé, S2S par clé de service, les points d'intégration des fournisseurs de messagerie et de stockage, facturation Stripe | MinistryStuffApi, MinistryStuffWeb, Api (content + messaging), paquets texting/apihelper, B1Admin |
| [Stockage apporté par l'église](./byos-storage) | Les églises relient Google Drive, Dropbox, OneDrive ou un bucket compatible S3 pour les envois au-delà des 100 Mo gratuits : connexion OAuth, formes d'envoi par fournisseur, redirection publique de téléchargement | Api (content + membership), paquets helpers/apphelper, B1Admin, B1App |
| [Contenus communautaires](./commons) | Le socle commun des ressources et soumissions derrière les contenus générés par les utilisateurs inter-produits, et la file de modération unique réservée au personnel dans B1Admin Server Admin | Api (module commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Lorsqu'une modification change le fonctionnement de l'un de ces systèmes — et pas seulement une page dans une application — la carte de système correspondante ici doit être mise à jour dans le même effort. Cela garde cette section fiable comme premier point de repère pour les nouveaux contributeurs.
:::

## Propositions

Ces documents décrivent des travaux proposés pour examen, et non un comportement produit déjà disponible.

| Proposition | Ce qu'elle couvre |
|---|---|
| [BYOK Twilio](./twilio-byok-proposal) | Compte, clés, service et numéro de téléphone appartenant à l'église ; périmètre d'intégration, consentement, envoi, estimations et contrôles de mise en production |
| [Brouillon d'intégration d'église Twilio](./twilio-byok-onboarding-draft) | Paramètres proposés du formulaire d'inscription B1, exemples de campagnes propres à chaque église, et listes de contrôle d'approbation et d'exploitation |
