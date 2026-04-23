---
title: "Despliegue de Aplicación Web"
---

# Despliegue de Aplicación Web

<div class="article-intro">

Las aplicaciones web de ChurchApps se despliegan como sitios estáticos en **Amazon S3** con **CloudFront** como el CDN. Los despliegues se automatizan a través de GitHub Actions, pero también se pueden ejecutar manualmente cuando sea necesario.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configurar la aplicación web localmente y verificar que se compila -- ver [Aplicaciones Web](../web-apps/)
- Configurar credenciales de AWS con acceso a S3 y CloudFront
- Conocer el nombre del grupo S3 de destino e ID de distribución de CloudFront

</div>

## Pasos de Despliegue

1. **Compilar la aplicación** -- generar la salida estática:

   ```bash
   npm run build
   ```

2. **Sincronizar a S3** -- cargar la salida de compilación al grupo S3:

   ```bash
   aws s3 sync build/ s3://bucket-name
   ```

3. **Invalidar CloudFront** -- limpiar la caché de CDN para que los usuarios reciban la versión más reciente:

   ```bash
   aws cloudfront create-invalidation --distribution-id YOUR_DIST_ID --paths "/*"
   ```

## Despliegues Automatizados

Los flujos de trabajo de GitHub Actions manejan el despliegue automáticamente al hacer un push a la rama `main`. El flujo de trabajo realiza los tres pasos anteriores -- compilación, sincronización S3 e invalidación de CloudFront -- sin intervención manual.

:::info
Normalmente no necesita ejecutar estos comandos manualmente. Fusionar una solicitud de extracción en `main` activa la canalización de despliegue automatizada.
:::

:::tip
Si necesita verificar una compilación localmente antes de desplegar, ejecute `npm run build` e inspeccione la salida en el directorio `build/`. Puede servirla localmente con cualquier servidor de archivos estáticos para confirmar que todo funciona.
:::

## Artículos Relacionados

- **[Aplicaciones Web](../web-apps/)** -- Guías de configuración para B1Admin, B1App y LessonsApp
- **[Despliegue de API](./apis)** -- Despliegue de las APIs backend
- **[Despliegue Móvil](./mobile)** -- Despliegue de aplicaciones móviles a tiendas de aplicaciones
