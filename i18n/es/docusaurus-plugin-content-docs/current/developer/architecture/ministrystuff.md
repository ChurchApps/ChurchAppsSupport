# MinistryStuff (Almacenamiento Pagado y Mensajería por Texto)

MinistryStuff.org es el servicio pagado separado que financia las dos cosas que ChurchApps no puede regalar — almacenamiento de archivos en masa (1TB+) y créditos de SMS — como suscripciones de tarifa plana mensual. ChurchApps en sí permanece 100% gratuito; nada en B1 requiere una suscripción MinistryStuff, y cada punto de integración es una costura de proveedor que un tercero también podría implementar.

## Componentes

| Pieza | Repo | Rol |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (puerto 8097 dev) | Facturación (Stripe), envío de SMS + libro mayor de crédito (AWS End User Messaging), almacenamiento (S3 + contabilidad de cuota). Una sola base de datos MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (puerto 3103 dev) | ministrystuff.org — marketing, precios y el portal de cuenta (planes, uso, redirecciones de Stripe Checkout/Customer Portal). |
| Proveedor de mensajería por texto | `Packages/texting` → `MinistryStuffProvider` | Registrado como `ministrystuff` junto a Clearstream/TextInChurch. |
| Costura de almacenamiento | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (predeterminado, gratuito) envuelve el cambio S3/disco original; `FileStorageHelper` delega al proveedor predeterminado sin cambios. |
| Cableado de Api | `Api/` módulos de contenido + mensajería | `MinistryStuffStorageProvider` + `StorageResolver` (contenido), inyección de `TextingConfigHelper` de clave de servicio (mensajería), tabla `storageProviders`, puntos finales `/content/storage/*` + `/messaging/texting/credits`. |

## Identidad y confianza

- Mismas cuentas, mismas iglesias: MinistryStuffApi verifica JWTs de ChurchApps con el `JWT_SECRET` compartido (patrón de aplicación hermana, como B1Transfer). El portal inicia sesión contra MembershipApi y acepta entregas `?jwt=`.
- Servidor a servidor (Api central → MinistryStuffApi): encabezado `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, ambos lados) + `churchId` explícito. El derecho siempre se comprueba contra la suscripción de esa iglesia. Las iglesias nunca poseen credenciales MinistryStuff — seleccionar el proveedor en B1Admin es todo lo que se necesita.

## Flujo de mensajería por texto

B1Admin Enviar Texto → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → recuento de segmentos debitado contra `smsCreditGrants` del período actual → AWS End User Messaging (o `smsMode: mock` en dev). Los créditos son un **alto duro**: créditos agotados rechazan en su totalidad (`insufficient_credits`, mostrados como un aviso amigable de actualización en B1Admin) — nunca envíos parciales, nunca facturación por exceso. Los subsidios de crédito se emiten de forma idempotente por período de facturación desde webhooks `invoice.paid` de Stripe. Las no inclusiones (`smsOptOuts`) se filtran antes de cada envío.

## Flujo de almacenamiento

La fila de proveedor de una iglesia (`content.storageProviders`, administrada en B1Admin → Configuración → Almacenamiento de Archivos) selecciona dónde van las **nuevas** subidas. `contentPath` es una URL absoluta por archivo, por lo que los proveedores mixtos coexisten sin migración cero: los archivos antiguos siguen sirviendo desde `content.churchapps.org`, los nuevos desde `content.ministrystuff.org`. Los flujos de subida Api → `StorageResolver.forChurch` → proveedor `store`/`getUploadUrl` (POST presignado con `content-length-range` en modo S3; alternativa base64 en modo disco/dev); las eliminaciones se enrutan por la URL almacenada (`StorageResolver.forUrl`). Cuota = bytes del plan, contados desde `storageObjects` (reservaciones `stored` + `pending`); la cuota excedida bloquea nuevas subidas (`storage_quota_exceeded`) — nada se elimina o factura nunca más. El nivel gratuito de ChurchApps no se toca (los mismos límites que antes; sin cuota de toda la iglesia).

Nota de alcance: la selección del proveedor cubre el flujo de **archivos/recursos** de contenido (donde vive la media de masa). Las subidas de galería/logo/foto permanecen en el proveedor predeterminado — enumeran claves del almacenamiento y construyen URLs en el lado del cliente, por lo que el enraizamiento por iglesia no se aplica aún.

La misma costura también impulsa [Traer Tu Propio Almacenamiento](./byos-storage): las iglesias pueden vincular Google Drive, Dropbox, OneDrive o su propio depósito compatible con S3 en su lugar de un plan MinistryStuff.

## Facturación

Stripe Checkout (hospedado) para suscribir, Stripe Customer Portal para actualización de tarjeta/cancelar/facturas — MinistryStuffWeb no tiene formularios de tarjeta. Una fila `subscriptions` por (iglesia, producto); planes/niveles viven en código (`MinistryStuffApi/src/helpers/Plans.ts`) con ids de precios de Stripe de la configuración. Webhook (`/billing/webhook`, verificación de firma de cuerpo crudo, deduplicación `webhookEvents`) impulsa el ciclo de vida de la suscripción: activo → vencido (gracia) → cancelado.

## Configuración de Dev

Ejecuta MinistryStuffApi (`yarn dev`, 8097; necesita `.env` con el `JWT_SECRET` compartido + `MINISTRYSTUFF_SERVICE_KEY`) y establece la misma clave de servicio en `Api/.env`. `Api/config/dev.json` ya apunta `ministryStuffApi` a `localhost:8097`. MinistryStuffWeb necesita `.env` con `VITE_STAGE=dev`. Dev usa `smsMode: mock` y almacenamiento en disco — no se necesita AWS.
