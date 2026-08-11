---
title: "Traer Tu Propio Almacenamiento"
---

# Traer Tu Propio Almacenamiento (BYOS)

Las iglesias obtienen ~100 MB de almacenamiento de archivos alojados gratuitos (las superficies `/content/files`: Archivos del Sitio Web, recursos del grupo). BYOS permite que una iglesia vincule su propio almacenamiento en la nube — **Google Drive, Dropbox, OneDrive, o cualquier depósito compatible con S3 (AWS S3, Cloudflare R2, Backblaze B2)** — para que las nuevas subidas aterricen en la cuenta de la iglesia sin tope de la plataforma. ChurchApps permanece gratuito; la cuenta propia de la iglesia es el límite.

## La costura del proveedor

BYOS reutiliza la costura de almacenamiento construida para [MinistryStuff](./ministrystuff): `IStorageProvider` (`Packages/apihelper`) resuelta por iglesia por `StorageResolver` desde la tabla `content.storageProviders`. A diferencia de los proveedores singleton `churchapps`/`ministrystuff`, los proveedores BYOS sostienen credenciales por iglesia, por lo que `StorageResolver.forChurch` construye una instancia por solicitud de la fila de la iglesia. Las implementaciones viven junto al resolver en `Api/src/modules/content/helpers/`: `GoogleDriveStorageProvider`, `DropboxStorageProvider`, `OneDriveStorageProvider`, `S3CompatibleStorageProvider`, más `ByosAuth` (intercambio de token OAuth + actualización de un solo vuelo — Dropbox rota tokens de actualización, por lo que los refrescos se deduplican de la misma manera que `ProviderProxyController`).

`storageProviders` lleva las credenciales: `accessToken`/`refreshToken`/`tokenExpiresAt` (encriptado, trío OAuth) o `apiKey`/`apiSecret` + `settings` JSON (`{endpoint, region, bucket, publicBase}`, S3). Los tokens nunca llegan al cliente — `GET /content/storage/providers` enmascara secretos y devuelve un booleano `connected`.

## Flujo de subida

El mismo contrato de tres pasos que antes, con una forma de presignatura extendida. `POST /content/files/postUrl` devuelve `PresignedPostData` que ahora opcionalmente lleva `method`, `rawBody`, `headers`, `chunkSize` y `externalIdField`:

| Proveedor | Presignar | El cliente envía bytes |
|---|---|---|
| churchapps (predeterminado) | POST presignado de S3 | formulario de múltiples partes (heredado) |
| Google Drive | sesión de subida reanudable (`drive.file` scope) | PUT único al URI de sesión |
| Dropbox | `files/get_temporary_upload_link` (4h) | POST crudo |
| OneDrive | `createUploadSession` (approot) | PUT dividido (20 MiB, Graph 320 KiB-múltiple) |
| S3-compatible | PUT presignado (B2 no tiene políticas POST) | PUT crudo |

`FileHelper.uploadPresignedFile` (`@churchapps/helpers`) maneja todas las formas y devuelve el id de archivo del proveedor cuando la respuesta lo lleva (Drive). El cliente lo pasa como `externalId` en el registro `POST /content/files`; `files.provider` + `files.externalId` registran dónde viven los bytes (id de archivo de Drive; ruta para los otros). La verificación de cuota de 100 MB solo se aplica cuando el proveedor resuelto es `churchapps`.

## Descargas públicas

Las nubes de consumidor no se pueden hotlinkar (los enlaces de Drive se quedan sin cuota, los enlaces de Dropbox/OneDrive expiran), así que para el trío OAuth `contentPath` apunta a una ruta Api estable: `GET /content/files/download/:id` (anónimo) carga la fila de archivos, acuña un enlace directo de corta duración a través del `getDownloadUrl` del proveedor (`webContentLink` / `get_temporary_link` / `@microsoft.graph.downloadUrl`), lo almacena en caché en memoria durante 30 minutos, y 302-redirecciona con `Cache-Control: max-age=300`. El ancho de banda fluye navegador↔proveedor, nunca a través de la Api. S3-compatible salta el redireccionamiento por completo — `contentPath` es la URL `publicBase + key` estable (el depósito debe permitir lectura pública y CORS PUT).

Las eliminaciones y descargas se enrutan por `files.provider` (`StorageResolver.forFile`); las filas heredadas sin él se retraen al enrutamiento de prefijo de URL. Los cambios de nombre son solo para la base de datos para archivos BYOS (los bytes se dirigen por `externalId`, no por nombre). La desconexión de un proveedor que aún tiene archivos desactiva suavemente la fila (mantiene tokens para que las descargas/eliminaciones sigan funcionando) en lugar de eliminarla.

## Conectar (B1Admin → Configuración → Almacenamiento de Archivos)

El trío OAuth usa el mismo flujo de relé que los proveedores de contenido: ventana emergente → consentimiento del proveedor → `{membershipApi}/oauth/relay/callback` → B1Admin sondea la sesión de relé → `POST /content/storage/exchange` realiza el intercambio de lado del servidor de código→token (los secretos del cliente nunca salen del servidor; Google `GOOGLE_DRIVE_CLIENT_SECRET`, OneDrive `ONEDRIVE_CLIENT_SECRET`, Dropbox es un cliente público PKCE). Los ids de cliente viven en `B1Admin/src/settings/components/byosProviders.ts` y `Api .../ByosAuth.ts`. Los alcances son deliberadamente mínimos: Google `drive.file` (solo archivos creados por aplicación — sin verificación de alcance restringido), OneDrive `Files.ReadWrite.AppFolder`, acceso a la carpeta de aplicación de Dropbox. S3 es un formulario de credencial simple.

Nota de alcance: BYOS cubre solo las superficies `/content/files`. Las imágenes de galería, miniaturas, logos y fotos de personas permanecen en el proveedor predeterminado (pequeñas, servidas por CDN, optimizadas para imagen).
