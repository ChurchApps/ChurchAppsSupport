---
title: "Architecture"
description: "Cartes systémiques inter-dépôts montrant le fonctionnement des dons, des enregistrements d'arrivée, des notifications et des sites web dans B1 Admin, B1.church et l'Api, avant toute modification."
---

# Architecture

<div class="article-intro">

Ces pages sont des cartes systémiques inter-dépôts : elles décrivent de bout en bout le fonctionnement d'un système central de ChurchApps, à travers les applications, les modules de l'API et les bibliothèques partagées, plutôt que la configuration d'un projet donné. Lisez-les avant de modifier le comportement d'un système. Consultez [Installation](../setup/index.md) pour faire démarrer un projet, et la [section API](../api/index.md) pour la référence au niveau des points de terminaison.

</div>

## L'écosystème en un coup d'œil

ChurchApps compte environ 20 dépôts indépendants (et non un monorepo). Les applications clientes communiquent avec un petit ensemble d'API backend via HTTPS et WebSocket, et partagent du code via des paquets npm publiés sous le scope `@churchapps`.

```
┌────────────────────────────────┐            ┌──────────────────────────────────────────────┐
│  Clients                       │            │  Api — core modular monolith (AWS Lambda)    │
│                                │            │                                              │
│  B1Admin    staff dashboard    │   HTTPS    │   membership    attendance    content        │
│  B1App      member portal +    │ ─────────▶ │   giving        messaging     doing          │
│             church websites    │            │                                              │
│  B1Checkin  check-in kiosk     │ ◀───WS───▶ │   one MySQL database per module (6 total)    │
│                                │            └──────────────────────────────────────────────┘
│  FreePlay   TV content player  │            ┌──────────────────────────────────────────────┐
└───────────────┬────────────────┘            │  LessonsApi — Lessons.church backend         │
                │                             └──────────────────────────────────────────────┘
                │  shared code via npm (@churchapps/*)
                ▼
   helpers (cross-app interfaces) · apphelper (React components) · apihelper (Express/server utilities)
```

Deux règles structurelles déterminent tout ce qui est documenté dans cette section :

1. **Les modules sont isolés.** Chaque module de l'Api possède sa propre base de données et ses tables ; les autres modules et applications n'accèdent à ses données que via ses points de terminaison REST. Voir [Structure des modules](../api/module-structure.md).
2. **Le code partagé est livré sous forme de paquets npm.** Les applications n'importent jamais le code source des unes des autres ; tout élément réutilisé traverse les frontières des dépôts via `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`. Voir [Bibliothèques partagées](../shared-libraries/index.md).

## Cartes systémiques

| Page | Ce qu'elle couvre | Périmètre |
|------|----------------|-------|
| [Notifications et rappels](./notifications.md) | Comment un élément quelconque transmet un message à une personne : les deux portes d'envoi, la chaîne d'escalade des canaux et le moteur de rappels | Api (messagerie), B1Admin, B1App |
| [Architecture temps réel](../realtime.md) | Le cadre de diffusion WebSocket qui sous-tend le chat, la présence et la diffusion dans l'application | Api (messagerie), toutes les applications web |
| [Notifications push web](../web-push.md) | Le canal de notifications push du navigateur : clés VAPID, stockage des abonnements, livraison | Api (messagerie), toutes les applications web |
| [Dons](./giving.md) | Fournisseurs de paiement et passerelles, flux de dons, fonds/lots, webhooks des passerelles | Api (dons), apphelper, B1App, B1Admin |
| [Inscriptions aux événements](./registrations.md) | Le modèle commercial des inscriptions : types de participants, sélections, codes de réduction, paiements via la passerelle de dons, et liste d'attente | Api (contenu + dons), B1App, B1Admin |
| [Enregistrements d'arrivée](./check-ins.md) | Enregistrement d'arrivée en borne et en libre-service, modèle de données de présence, acheminement vers les salles, couche de sécurité pour les enfants, impression des étiquettes | B1Checkin, B1App, B1Admin, Api (présence + adhésion) |
| [Créateur de sites web](./website-builder.md) | L'arborescence page/section/élément, le contrat des types d'éléments et leurs moteurs de rendu, le blog, les pages à accès restreint, le SEO et la génération par IA | Api (contenu), AskApi, helpers/apphelper, B1Admin, B1App |
| [Routage des sites web et multisite](./websites.md) | Comment une requête est résolue vers une église et un site donné, le modèle de données multisite `siteId`, et le point d'entrée Caddy pour les domaines personnalisés | B1App, Api (adhésion + contenu), B1Admin |
| [Intégrations](./integrations.md) | La surface d'extension : OAuth, clés d'API, webhooks, fournisseurs de contenu, MCP | Api, bibliothèques partagées, applications externes |
| [Journal d'audit et lots annulables](./audit-log.md) | Audit activé par défaut de chaque modification au point de passage obligé des contrôleurs, et couche de lots qui rend les imports et les actions en masse annulables | Api (tous les modules), B1Admin, B1Transfer |
| [MinistryStuff](./ministrystuff.md) | Le service payant de stockage et de crédits SMS : identité par JWT partagé, S2S par clé de service, points d'intégration des fournisseurs SMS et de stockage, facturation Stripe | MinistryStuffApi, MinistryStuffWeb, Api (contenu + messagerie), paquets texting/apihelper, B1Admin |
| [Stockage apporté par vos soins (BYOS)](./byos-storage.md) | Les églises relient Google Drive, Dropbox, OneDrive ou un bucket compatible S3 pour les téléversements au-delà des 100 Mo gratuits : connexion OAuth, formats de téléversement par fournisseur, redirection publique de téléchargement | Api (contenu + adhésion), paquets helpers/apphelper, B1Admin, B1App |
| [Content Commons](./commons.md) | La structure partagée d'actifs et de soumissions qui sous-tend le contenu généré par les utilisateurs entre produits, et la file de modération unique réservée au personnel dans l'Administration serveur de B1Admin | Api (module commons), B1Admin, WorshipCommons, Lessons.church, FreeShow |

:::tip
Lorsqu'une modification change le fonctionnement de l'un de ces systèmes, et pas seulement une page dans une application, la carte systémique correspondante doit être mise à jour dans le même travail. Cela garantit que cette section reste fiable comme premier point de repère pour les nouveaux contributeurs.
:::

## Propositions

Ces documents décrivent des travaux proposés soumis à examen, et non un comportement du produit déjà disponible.

| Proposition | Ce qu'elle couvre |
|---|---|
| [Twilio BYOK](./twilio-byok-proposal.md) | Compte, clés, service et numéro de téléphone appartenant à l'église ; périmètre d'intégration, consentement, livraison, estimations et contrôles de mise en production |
| [Ébauche d'intégration Twilio pour les églises](./twilio-byok-onboarding-draft.md) | Paramètres proposés du formulaire d'inscription B1, exemples de campagnes propres aux églises, et listes de contrôle d'approbation et d'exploitation |
