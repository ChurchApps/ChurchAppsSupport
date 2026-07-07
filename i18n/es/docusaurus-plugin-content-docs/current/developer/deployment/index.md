---
title: "Implementación"
---

# Implementación

<div class="article-intro">

ChurchApps utiliza diferentes estrategias de implementación según el tipo de proyecto. Las APIs se implementan en AWS Lambda, las aplicaciones web se implementan como sitios estáticos en S3 con CloudFront.

</div>

## Implementación por tipo de proyecto

| Tipo de proyecto | Objetivo | Herramientas |
|-------------|---------|---------|
| APIs | AWS Lambda | Serverless Framework v3 |
| Aplicaciones web | S3 + CloudFront | Compilación estática, sincronización de S3 |
| Aplicaciones móviles | Tiendas de aplicaciones | Expo EAS Build |
| FreeShow | Descarga directa | Electron Builder |

## Entornos

| Entorno | Propósito |
|-------------|---------|
| `dev` | Desarrollo local |
| `demo` | Instancia de demostración pública |
| `staging` | Pruebas de preproducción |
| `prod` | Producción |
