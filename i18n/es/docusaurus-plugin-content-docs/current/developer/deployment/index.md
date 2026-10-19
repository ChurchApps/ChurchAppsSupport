---
title: "Despliegue"
---

# Despliegue

<div class="article-intro">

ChurchApps usa distintas estrategias de despliegue según el tipo de proyecto: las APIs se despliegan en AWS Lambda, las aplicaciones web se despliegan como sitios estáticos en S3 con CloudFront, y las aplicaciones móviles se compilan y distribuyen mediante Expo EAS y las tiendas de aplicaciones.

</div>

## Despliegue por tipo de proyecto

| Tipo de proyecto | Destino de despliegue | Herramientas |
|-------------|-------------------|---------|
| [APIs](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 22.x) |
| [Aplicaciones web](./web-apps) | S3 + CloudFront | Compilación estática, sincronización con S3, invalidación de CloudFront |
| [Aplicaciones móviles](./mobile) | Tiendas de aplicaciones | Expo EAS Build + actualizaciones OTA |
| [Alojamiento propio (Railway)](./railway-template) | Railway | Plantilla de un clic: MySQL + Api + B1Admin + B1App |
| [Alojamiento propio (Docker)](./docker) | Cualquier host de Docker | Instalador de una línea; imágenes precompiladas en GHCR + Caddy, `./deploy/b1` para actualizar, respaldar y revertir |
| [Proxy de dominio personalizado con Caddy](./caddy-proxy) | EC2 de Windows (IP elástica `3.23.251.61`) | Caddyfile estático + servicio WinSW + sincronización programada de mapas |
| FreeShow | Descarga directa | Electron Builder (binarios multiplataforma) |

## Entornos

| Entorno | Propósito |
|-------------|---------|
| `dev` | Desarrollo local |
| `demo` | Instancia pública de demostración; se despliega en cada push a `main`, por lo que sirve también para pruebas previas a producción |
| `prod` | Producción |

:::info
Cada entorno tiene su propio conjunto de endpoints de API, bases de datos y configuración. Los ajustes específicos de cada entorno se administran mediante archivos `.env` en local y mediante AWS SSM Parameter Store en los entornos desplegados.
:::
