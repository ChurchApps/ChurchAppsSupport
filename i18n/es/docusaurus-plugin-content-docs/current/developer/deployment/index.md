---
title: "Despliegue"
---

# Despliegue

<div class="article-intro">

ChurchApps utiliza diferentes estrategias de despliegue dependiendo del tipo de proyecto. Las APIs se despliegan en AWS Lambda, las aplicaciones web se despliegan como sitios estáticos en S3 con CloudFront, y las aplicaciones móviles se construyen y distribuyen a través de Expo EAS y las tiendas de aplicaciones.

</div>

## Despliegue por Tipo de Proyecto

| Tipo de Proyecto | Objetivo de Despliegue | Herramientas |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (tiempo de ejecución Node.js 22.x) |
| [Aplicaciones Web](./web-apps) | S3 + CloudFront | Compilación estática, sincronización S3, invalidación de CloudFront |
| [Aplicaciones Móviles](./mobile) | Tiendas de Aplicaciones | Expo EAS Build + Actualizaciones OTA |
| FreeShow | Descarga Directa | Electron Builder (binarios multiplataforma) |

## Entornos

| Entorno | Propósito |
|-------------|---------|
| `dev` | Desarrollo local |
| `demo` | Instancia de demostración pública |
| `staging` | Pruebas previas a la producción |
| `prod` | Producción |

:::info
Cada entorno tiene su propio conjunto de puntos de conexión de API, bases de datos y configuración. Los ajustes específicos del entorno se gestionan a través de archivos `.env` localmente y AWS SSM Parameter Store en entornos desplegados.
:::
