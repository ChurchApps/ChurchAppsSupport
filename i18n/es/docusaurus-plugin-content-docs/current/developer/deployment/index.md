---
title: "Implementación"
---

# Implementación

<div class="article-intro">

ChurchApps utiliza diferentes estrategias de implementación según el tipo de proyecto. Las APIs se implementan en AWS Lambda, las aplicaciones web se implementan como sitios estáticos en S3 con CloudFront, y las aplicaciones móviles se construyen y distribuyen a través de Expo EAS y las tiendas de aplicaciones.

</div>

## Implementación por Tipo de Proyecto

| Tipo de Proyecto | Objetivo de Implementación | Herramientas |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [Aplicaciones Web](./web-apps) | S3 + CloudFront | Compilación estática, sincronización S3, invalidación de CloudFront |
| [Aplicaciones Móviles](./mobile) | Tiendas de Aplicaciones | Expo EAS Build + Actualizaciones OTA |
| [Auto-Alojamiento (Railway)](./railway-template) | Railway | Plantilla de un clic: MySQL + Api + B1Admin + B1App |
| [Auto-Alojamiento (Docker)](./docker) | Cualquier host Docker | `docker compose up` desde el repositorio B1Admin |
| [Proxy de Dominio Personalizado Caddy](./caddy-proxy) | Windows EC2 (IP Elástica `3.23.251.61`) | Caddyfile estático + servicio WinSW + sincronización de mapa programada |
| FreeShow | Descarga directa | Electron Builder (binarios multiplataforma) |

## Entornos

| Entorno | Propósito |
|-------------|---------|
| `dev` | Desarrollo local |
| `demo` | Instancia de demostración pública |
| `staging` | Pruebas de preproducción |
| `prod` | Producción |

:::info
Cada entorno tiene su propio conjunto de puntos finales de API, bases de datos, y configuración. Los ajustes específicos de entorno se gestionan a través de archivos `.env` localmente y AWS SSM Parameter Store en entornos implementados.
:::
