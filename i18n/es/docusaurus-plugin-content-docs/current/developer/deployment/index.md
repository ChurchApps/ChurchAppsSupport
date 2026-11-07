---
title: "Despliegue"
description: "Encuentre dónde se despliega cada proyecto de ChurchApps, desde las API en AWS Lambda y las aplicaciones web en S3 hasta las compilaciones móviles de Expo y B1 Admin autoalojado en Railway o Docker."
---

# Despliegue

<div class="article-intro">

ChurchApps usa diferentes estrategias de despliegue según el tipo de proyecto. Las API se despliegan en AWS Lambda, las aplicaciones web se despliegan como sitios estáticos en S3 con CloudFront, y las aplicaciones móviles se compilan y distribuyen mediante Expo EAS y las tiendas de aplicaciones.

</div>

## Despliegue según el tipo de proyecto

| Tipo de proyecto | Destino de despliegue | Herramientas |
|------------------|-----------------------|--------------|
| [API](./apis.md) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Aplicaciones web](./web-apps.md) | S3 + CloudFront | Compilación estática, sincronización con S3, invalidación de CloudFront |
| [Aplicaciones móviles](./mobile.md) | Tiendas de aplicaciones | Expo EAS Build + actualizaciones OTA |
| [Autoalojamiento (Railway)](./railway-template.md) | Railway | Plantilla de un clic: MySQL + Api + B1Admin + B1App |
| [Autoalojamiento (Docker)](./docker.md) | Cualquier host Docker | Instalador de una línea; imágenes precompiladas en GHCR + Caddy, `./deploy/b1` para actualizar, respaldar y revertir |
| [Proxy de dominio personalizado con Caddy](./caddy-proxy.md) | EC2 de Windows (IP elástica `3.23.251.61`) | Caddyfile estático + servicio WinSW + sincronización programada del mapa |
| FreeShow | Descarga directa | Electron Builder (binarios multiplataforma) |

## Entornos

| Entorno | Propósito |
|---------|-----------|
| `dev` | Desarrollo local |
| `demo` | Instancia pública de demostración; se despliega en cada envío a `main`, así que también sirve para pruebas previas a producción |
| `prod` | Producción |

:::info
Cada entorno tiene su propio conjunto de endpoints de API, bases de datos y configuración. La configuración específica de cada entorno se administra mediante archivos `.env` en local y mediante AWS SSM Parameter Store en los entornos desplegados.
:::
