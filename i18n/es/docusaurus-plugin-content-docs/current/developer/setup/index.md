---
title: "Configuración"
---

# Configuración

<div class="article-intro">

Esta sección le guía para configurar un entorno de desarrollo local para los proyectos de ChurchApps. Puede apuntar su frontend a las API de demostración compartidas para un desarrollo rápido, o ejecutar la pila completa de forma local para trabajo en el backend.

</div>

## Dos enfoques

Hay dos formas de desarrollar localmente, según cuánta pila necesite:

### 1. Apunte a las API de demostración (la más sencilla)

Si trabaja en un **proyecto de frontend** (app web, app móvil o app de escritorio), la vía más rápida es apuntar su app local a las API de demostración compartidas. No se requiere configurar una base de datos ni un backend.

La URL base de la API de demostración es:

```
https://api.demo.churchapps.org
```

Cada módulo de la API está disponible en una ruta debajo de esta base, por ejemplo:

```
https://api.demo.churchapps.org/membership
https://api.demo.churchapps.org/attendance
https://api.demo.churchapps.org/giving
```

El entorno de demostración ejecuta el código más reciente de `main`, y sus datos de ejemplo se vuelven a cargar cada noche, así que no espere que lo que cree allí dure. (El antiguo entorno de staging, `api.staging.churchapps.org`, ya se retiró. Algunos archivos `.env` de ejemplo todavía pueden listar URLs de staging; reemplácelas por las URLs de demostración o locales).

:::tip
Este enfoque le permite empezar a hacer cambios en el frontend en minutos. Es la vía recomendada para la mayoría de los colaboradores.
:::

### 2. Ejecutar todo de forma local

Si necesita modificar código de la API o trabajar sin conexión, puede ejecutar la pila completa de forma local. Esto requiere MySQL 8.0+ y configuración adicional. Consulte la guía de [configuración local de la API](../api/local-setup) para instrucciones detalladas.

## Primeros pasos

Siga estas páginas en orden:

1. **[Requisitos previos](prerequisites)** -- Instale las herramientas necesarias (Node.js, Git, MySQL, etc.)
2. **[Descripción general del proyecto](project-overview)** -- Conozca qué proyectos existen y qué hace cada uno
3. **[Variables de entorno](environment-variables)** -- Configure sus archivos `.env` para conectar todo entre sí

:::info
Cada proyecto de ChurchApps es un repositorio Git independiente. Solo necesita clonar el proyecto o los proyectos específicos en los que desea trabajar.
:::
