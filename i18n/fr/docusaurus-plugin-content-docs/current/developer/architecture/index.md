---
title: "Architecture"
---

# Architecture

<div class="article-intro">

Ces pages sont des cartes de système multidépôts : elles documentent comment un système ChurchApps central fonctionne de bout en bout -- à travers les applications, les modules API et les bibliothèques partagées -- plutôt que comment un seul projet est configuré. Lisez-les avant de modifier le comportement d'un système ; lisez [Configuration](../setup/) pour exécuter un projet et la section [API](../api/) pour la référence au niveau des points de terminaison.

</div>

## L'écosystème en un coup d'œil

ChurchApps est environ 20 dépôts indépendants (pas un monorepo). Les applications clientes communiquent avec un petit ensemble d'API backend via HTTPS et WebSocket, et partagent du code via des packages npm publiés sous le scope `@churchapps`.

## Deux règles structurelles

1. **Les modules sont isolés.** Chaque module Api possède sa base de données et ses tables ; d'autres modules et applications accèdent à ses données uniquement via ses points de terminaison REST.
2. **Le code partagé est livré sous forme de packages npm.** Les applications n'importent jamais le code source l'une de l'autre ; tout ce qui est réutilisé franchit les frontières des dépôts via `@churchapps/helpers`, `@churchapps/apphelper` ou `@churchapps/apihelper`.

## Cartes de système

Voir les pages suivantes pour des systèmes core spécifiques :

- [Notifications et rappels](./notifications)
- [Architecture en temps réel](../realtime)
- [Notifications push Web](../web-push)
- [Donner](./giving)
- [Registrations d'événements](./registrations)
- [Enregistrements](./check-ins)
- [Constructeur de site web](./website-builder)
- [Routage du site web et multi-site](./websites)
- [Intégrations](./integrations)
- [Audit et lots annulables](./audit-log)
- [MinistryStuff](./ministrystuff)
- [Stockage apporté par l'utilisateur](./byos-storage)
- [Contenu Commons](./commons)

:::tip
Quand une modification modifie le fonctionnement d'un de ces systèmes -- pas seulement une page à l'intérieur d'une application -- la carte de système correspondante ici doit être mise à jour dans le même effort.
:::
