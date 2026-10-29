---
title: "Despliegue"
---

# Despliegue

<div class="article-intro">

ChurchApps usa distintas estrategias de despliegue según el tipo de proyecto: las API se despliegan en AWS Lambda, las aplicaciones web se despliegan como sitios estáticos en S3 con CloudFront, y las aplicaciones móviles se compilan y distribuyen mediante Expo EAS y las tiendas de aplicaciones.

</div>

## Despliegue según el tipo de proyecto

| Tipo de proyecto | Destino de despliegue | Herramientas |
|-------------|-------------------|---------|
| [API](./apis) | AWS Lambda | Serverless Framework v3 (runtime Node.js 24.x) |
| [Aplicaciones web](./web-apps) | S3 + CloudFront | Compilación estática, sincronización con S3, invalidación de CloudFront |
| [Aplicaciones móviles](./mobile) | Tiendas de aplicaciones | Expo EAS Build + actualizaciones OTA |
| [Autoalojamiento (Railway)](./railway-template) | Railway | Plantilla de un clic: MySQL + Api + B1Admin + B1App |
| [Autoalojamiento (Docker)](./docker) | Cualquier host de Docker | Instalador de una línea; imágenes precompiladas de GHCR + Caddy, actualización/copia de seguridad/reversión con `./deploy/b1` |
| [Proxy Caddy para dominios personalizados](./caddy-proxy) | EC2 de Windows (IP elástica `3.23.251.61`) | Caddyfile estático + servicio WinSW + sincronización programada del mapa |
| FreeShow | Descarga directa | Electron Builder (binarios multiplataforma) |

## Entornos

| Entorno | Propósito |
|-------------|-------------|
| `dev` | Desarrollo local |
| `demo` | Instancia de demostración pública; se despliega en cada push a `main`, por lo que sirve también como prueba previa a producción |
| `prod` | Producción |

:::info
Cada entorno tiene su propio conjunto de endpoints de API, bases de datos y configuración. La configuración específica de cada entorno se administra mediante archivos `.env` en local y AWS SSM Parameter Store en los entornos desplegados.
:::
