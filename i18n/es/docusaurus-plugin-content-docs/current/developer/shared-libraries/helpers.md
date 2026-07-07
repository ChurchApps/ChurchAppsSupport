---
title: "Helpers"
---

# Helpers

<div class="article-intro">

El paquete `@churchapps/helpers` proporciona utilidades base utilizadas por todos los proyectos de ChurchApps, tanto frontend como backend. Incluye `DateHelper`, `ApiHelper`, `CurrencyHelper` y interfaces de TypeScript compartidas.

</div>

## Quién lo consume

Cada API de ChurchApps y cada aplicación web depende de este paquete directamente.

## Configuración para desarrollo local

Este paquete vive en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages):

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages && yarn install
yarn workspace @churchapps/helpers build
```

## Publicación

Los lanzamientos usan cambios en lugar de bumps de versión manual:

```bash
yarn changeset
yarn publish-all
```

## Artículos relacionados

- **[ApiHelper](./api-helper)** -- Utilidades del lado del servidor
- **[AppHelper](./app-helper)** -- Componentes React
