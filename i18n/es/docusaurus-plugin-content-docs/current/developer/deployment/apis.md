---
title: "Despliegue de API"
---

# Despliegue de API

<div class="article-intro">

Las APIs de ChurchApps se despliegan como funciones de AWS Lambda utilizando Serverless Framework. Esta página cubre el flujo de compilación, despliegue y configuración para entornos de preparación y producción.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configurar la API localmente -- ver [Configuración Local de API](../api/local-setup)
- Configurar credenciales de AWS en su máquina
- Asegúrese de tener acceso a la cuenta de AWS de destino

</div>

## Compilación

Las APIs se compilan para producción utilizando una configuración TypeScript dedicada:

```bash
npm run build:prod
```

Esto utiliza `tsconfig.prod.json` para compilar el proyecto para el tiempo de ejecución de Lambda.

## Despliegue

Desplegar en preparación:

```bash
npm run deploy-staging
```

Desplegar en producción:

```bash
npm run deploy-prod
```

## Lo Que Se Crea

Cada despliegue de API crea o actualiza las siguientes funciones de AWS Lambda:

| Función | Propósito |
|---------|---------|
| `web` | Controlador de solicitud HTTP a través de API Gateway |
| `socket` | Controlador de conexión de WebSocket |
| `timer15Min` | Tarea programada que se ejecuta cada 15 minutos |
| `timerMidnight` | Tarea programada que se ejecuta diariamente a medianoche |

## Configuración de Entorno

En entornos desplegados, la configuración se lee desde **AWS SSM Parameter Store** en lugar de archivos `.env`. Esto mantiene los secretos fuera del paquete de despliegue y permite cambios de configuración sin redeploying.

:::warning
Nunca confirme credenciales de producción al repositorio. Toda la configuración sensible debe almacenarse en AWS SSM Parameter Store y accederse en tiempo de ejecución.
:::

:::tip
Para probar un despliegue sin afectar la producción, siempre despliega primero en preparación usando `npm run deploy-staging` y verifica los cambios antes de promover a producción.
:::

## Artículos Relacionados

- **[Configuración Local de API](../api/local-setup)** -- Configuración de la API para desarrollo
- **[Estructura de Módulo](../api/module-structure)** -- Comprensión de la arquitectura de funciones de Lambda
- **[Despliegue de Aplicación Web](./web-apps)** -- Despliegue de aplicaciones frontend
