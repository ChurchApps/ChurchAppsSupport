---
title: "Helpers"
---

# Helpers

<div class="article-intro">

El paquete `@churchapps/helpers` proporciona utilidades base usadas por todos los proyectos de ChurchApps, tanto frontend como backend. Es independiente de framework e incluye ayudantes comunes como `DateHelper`, `ApiHelper`, `CurrencyHelper`, más las interfaces TypeScript compartidas que forman el contrato de datos entre aplicaciones y APIs.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **Node.js** y **Git** -- consulta [Requisitos Previos](../setup/prerequisites)
- Familiarízate con la configuración del [espacio de trabajo Packages](./index.md) y el flujo de lanzamiento

</div>

## Quién Consume Esto

Cada API de ChurchApps (la Api principal, AskApi, y LessonsApi) y cada frontend web (B1Admin, B1App, B1Transfer, LessonsApp) depende de este paquete directamente. Los frontends también obtienen muchas de sus exportaciones (`ApiHelper`, `DateHelper`, `UserHelper`, y otras interfaces) re-exportadas a través de [`@churchapps/apphelper`](./app-helper). Los otros paquetes compartidos lo declaran como una dependencia par para que cada aplicación resuelva exactamente una copia.

## Configuración para Desarrollo Local

Este paquete vive en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages) junto con las otras bibliotecas compartidas:

1. Clona el espacio de trabajo:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instala dependencias en la raíz del espacio de trabajo:

   ```bash
   cd Packages && yarn install
   ```

3. Compila (compila TypeScript a `dist/`):

   ```bash
   yarn workspace @churchapps/helpers build
   ```

   O ejecuta `yarn build` en la raíz para compilar cada paquete en orden de dependencia.

Para probar cambios dentro de un proyecto consumidor, usa un portal Yarn temporal -- consulta [Desarrollo Local Contra una Aplicación Consumidora](./index.md#local-development-against-a-consuming-app).

## Publicación

Los lanzamientos pasan por changesets en lugar de incrementos de versión manuales:

1. Ejecuta `yarn changeset` en la raíz del espacio de trabajo y selecciona `@churchapps/helpers` con el tipo de incremento apropiado; confirma el archivo changeset generado con tu cambio.
2. Cuando estés listo para lanzar, ejecuta `yarn publish-all` en la raíz -- incrementa versiones, escribe CHANGELOGs, compila en orden de dependencia, y publica en npm.

Las nuevas interfaces compartidas van en `helpers/src/interfaces/` y se re-exportan a través del barril del paquete. El catálogo de tipos de elemento del generador de sitios web (`ElementTypes.ts` — 35 tipos con sus esquemas de respuestas) también vive aquí; es el contrato compartido por los renderizadores de apphelper, los formularios del editor de B1Admin, y los prompts de generación de IA (consulta [Arquitectura del Generador de Sitios Web](../architecture/website-builder)).

:::warning
Dado que este paquete es usado por cada proyecto de ChurchApps, los cambios aquí tienen un amplio impacto. Un lanzamiento de `helpers` incrementa automáticamente `apihelper` y `apphelper` para que sus rangos de dependencia se mantengan actualizados. Prueba con un portal Yarn en al menos una API consumidora y una aplicación web consumidora antes de publicar.
:::

## Artículos Relacionados

- **[ApiHelper](./api-helper)** -- Utilidades del lado del servidor que dependen de este paquete
- **[AppHelper](./app-helper)** -- Componentes React que dependen de este paquete
- **[Descripción General de Bibliotecas Compartidas](./index.md)** -- Configuración del espacio de trabajo, flujo de lanzamiento, y flujo de trabajo de enlace local
