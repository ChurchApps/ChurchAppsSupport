---
title: "Helpers"
---

# Helpers

<div class="article-intro">

El paquete `@churchapps/helpers` proporciona utilidades base utilizadas por todos los proyectos de ChurchApps, tanto frontend como backend. Es agnóstico respecto del marco e incluye ayudantes comunes como `DateHelper`, `ApiHelper`, `CurrencyHelper` y otras utilidades compartidas.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js** y **Git** -- ver [Requisitos Previos](../setup/prerequisites)
- Familiarizarse con el flujo de trabajo [npm link](./index.md) para desarrollo local

</div>

## Configuración para Desarrollo Local

1. Clonar el repositorio:

   ```bash
   git clone https://github.com/ChurchApps/Helpers.git
   ```

2. Instalar dependencias:

   ```bash
   cd Helpers && npm install
   ```

3. Compilar el paquete (compila TypeScript a `dist/`):

   ```bash
   npm run build
   ```

4. Ponerlo disponible para vinculación local:

   ```bash
   npm link
   ```

Luego puede vincularlo en cualquier proyecto consumidor:

```bash
cd ../YourProject && npm link @churchapps/helpers
```

## Publicación

Para publicar una nueva versión en npm:

1. Actualizar la versión en `package.json`
2. Publicar:

   ```bash
   npm publish --access=public
   ```

:::warning
Dado que este paquete es utilizado por cada proyecto de ChurchApps, los cambios aquí tienen un amplio impacto. Pruebe exhaustivamente con `npm link` en al menos una API consumidora y una aplicación web consumidora antes de publicar.
:::

## Artículos Relacionados

- **[ApiHelper](./api-helper)** -- Utilidades del lado del servidor que dependen de este paquete
- **[AppHelper](./app-helper)** -- Componentes React que dependen de este paquete
- **[Descripción General de Bibliotecas Compartidas](./index.md)** -- Flujo de trabajo `npm link` y descripción general del paquete
