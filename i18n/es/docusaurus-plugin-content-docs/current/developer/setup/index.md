---
title: "Configuración"
---

# Configuración

<div class="article-intro">

Esta sección lo guiará a través de la configuración de un entorno de desarrollo local para proyectos de ChurchApps. Puede apuntar su frontend en las APIs de preparación compartidas para desarrollo rápido, o ejecutar la pila completa localmente para trabajo de backend.

</div>

## Dos Enfoques

Hay dos formas de desarrollar localmente, según cuánta pila necesite:

### 1. Apuntar a APIs de Preparación (Lo Más Fácil)

Si está trabajando en un **proyecto frontend** (aplicación web, aplicación móvil o aplicación de escritorio), el camino más rápido es apuntar su aplicación local en las APIs de preparación compartidas. No se requiere configuración de base de datos o backend.

La URL base de API de preparación es:

```
https://api.staging.churchapps.org
```

Cada módulo de API está disponible en una ruta bajo esta base, por ejemplo:

```
https://api.staging.churchapps.org/membership
https://api.staging.churchapps.org/attendance
https://api.staging.churchapps.org/giving
```

:::tip
Este enfoque le permite comenzar a hacer cambios frontend en minutos. Es el camino recomendado para la mayoría de los contribuyentes.
:::

### 2. Ejecutar Todo Localmente

Si necesita modificar código de API o trabajar sin conexión, puede ejecutar la pila completa localmente. Esto requiere MySQL 8.0+ y configuración adicional. Ver la guía [configuración local de API](../api/local-setup) para instrucciones detalladas.

## Comenzar

Siga estas páginas en orden:

1. **[Requisitos Previos](prerequisites)** -- Instalar las herramientas requeridas (Node.js, Git, MySQL, etc.)
2. **[Descripción General del Proyecto](project-overview)** -- Entender qué proyectos existen y qué hacen
3. **[Variables de Entorno](environment-variables)** -- Configurar sus archivos `.env` para conectar todo

:::info
Cada proyecto de ChurchApps es un repositorio independiente de Git. Solo necesita clonar el/los proyecto(s) específico(s) en el que desea trabajar.
:::
