---
title: "Despliegue de la API"
---

# Despliegue de la API

<div class="article-intro">

Las APIs de ChurchApps se despliegan como funciones de AWS Lambda usando Serverless Framework. Esta página cubre el flujo de compilación, despliegue y configuración para los entornos de demostración y producción.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura la API localmente; consulta [Configuración local de la API](../api/local-setup)
- Configura tus credenciales de AWS en tu equipo
- Asegúrate de tener acceso a la cuenta de AWS de destino

</div>

## Compilar

Las APIs se compilan para producción usando una configuración dedicada de TypeScript:

```bash
npm run build:prod
```

Esto usa `tsconfig.prod.json` para compilar el proyecto para el runtime de Lambda.

## Desplegar

Para desplegar en el entorno de demostración:

```bash
npm run deploy-demo
```

Para desplegar en producción:

```bash
npm run deploy-prod
```

En la práctica, la API se despliega mediante GitHub Actions: **Deploy Demo** se ejecuta con cada push a `main`, y **Deploy Prod** se inicia manualmente (workflow dispatch). Ya no existe un entorno de staging.

## Migraciones de base de datos

**Deploy Prod** aplica las migraciones de base de datos pendientes como parte del despliegue. Las bases de datos de producción solo aceptan conexiones desde dentro de la VPC, así que justo después de `serverless deploy` el flujo de trabajo invoca la función Lambda `migrate` (`api-Prod-migrate`), que ejecuta las migraciones pendientes de cada módulo y devuelve `{ ok, environment, modules }`. Si algún módulo falla o es rechazado (por ejemplo, una base de datos sin historial de migraciones), el trabajo falla para que el esquema nunca quede por detrás del código. **Rollback Prod** solo revierte el código de Lambda; las migraciones permanecen aplicadas, así que mantenlas aditivas. Consulta [Administración del servidor: migraciones de base de datos](../server-admin#database-migrations) para revisar el estado o ejecutar migraciones manualmente.

## Qué se crea

Cada despliegue de la API crea o actualiza las siguientes funciones de AWS Lambda:

| Función | Propósito |
|----------|---------|
| `web` | Manejador de solicitudes HTTP mediante API Gateway |
| `socket` | Manejador de conexiones WebSocket |
| `timer15Min` | Tarea programada que se ejecuta cada 30 minutos (el nombre es histórico) |
| `timerMidnight` | Tarea programada que se ejecuta diariamente a medianoche |
| `migrate` | Aplica las migraciones de base de datos pendientes; invocada por el flujo de trabajo Desplegar a producción |

## Configuración del entorno

En los entornos desplegados, la configuración se lee desde **AWS SSM Parameter Store** en lugar de archivos `.env`. Esto mantiene los secretos fuera del paquete de despliegue y permite cambiar la configuración sin volver a desplegar.

:::warning
Nunca incluyas credenciales de producción en el repositorio. Toda la configuración sensible debe almacenarse en AWS SSM Parameter Store y leerse en tiempo de ejecución.
:::

:::tip
Cada merge a `main` se despliega primero en el entorno de demostración. Verifica tu cambio allí (por ejemplo, en [demo.b1.church](https://demo.b1.church)) antes de ejecutar Desplegar a producción.
:::

## Artículos relacionados

- **[Configuración local de la API](../api/local-setup)**: cómo configurar la API para desarrollo
- **[Estructura de módulos](../api/module-structure)**: cómo funciona la arquitectura de funciones Lambda
- **[Despliegue de aplicaciones web](./web-apps)**: cómo desplegar las aplicaciones frontend
