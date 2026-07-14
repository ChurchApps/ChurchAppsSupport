# MinistryStuff (Almacenamiento Pagado y Texting)

MinistryStuff.org es el servicio pagado separado que financia las dos cosas que ChurchApps no puede regalar — almacenamiento masivo de archivos (1TB+) y créditos SMS — como suscripciones mensuales de tarifa plana. ChurchApps en sí sigue siendo 100% gratuito; nada en B1 requiere una suscripción de MinistryStuff, y cada punto de integración es un proveedor que un tercero también podría implementar.

## Componentes

| Pieza | Repositorio | Rol |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (puerto 8097 dev) | Facturación (Stripe), envío SMS + ledger de créditos (AWS End User Messaging), almacenamiento (S3 + contabilidad de cuota). Base de datos MySQL única `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (puerto 3103 dev) | ministrystuff.org — marketing, precios, y el portal de cuenta (planes, uso, redirecciones de Stripe Checkout/Customer Portal). |
| Proveedor de texting | `Packages/texting` → `MinistryStuffProvider` | Registrado como `ministrystuff` junto a Clearstream/TextInChurch. |
| Proveedor de almacenamiento | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (predeterminado, gratuito) envuelve el cambio original S3/disco; `FileStorageHelper` delega al proveedor predeterminado sin cambios. |
| Cableado de Api | `Api/` módulos de contenido + mensajería | `MinistryStuffStorageProvider` + `StorageResolver` (contenido), inyección de clave de servicio `TextingConfigHelper` (mensajería), tabla `storageProviders`, endpoints `/content/storage/*` + `/messaging/texting/credits`. |

## Identidad y confianza

- Mismas cuentas, mismas iglesias: MinistryStuffApi verifica JWTs de ChurchApps con el `JWT_SECRET` compartido (patrón de aplicación hermana, como B1Transfer). El portal inicia sesión contra MembershipApi y acepta entregas `?jwt=`.
- Servidor a servidor (Api central → MinistryStuffApi): encabezado `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, ambos lados) + `churchId` explícito. El derecho siempre se verifica contra la suscripción de esa iglesia. Las iglesias nunca mantienen credenciales de MinistryStuff — seleccionar el proveedor en B1 Admin es todo lo que se necesita.

## Flujo de texting

B1 Admin Enviar Texto → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → recuento de segmentos debitado contra los `smsCreditGrants` del período actual → AWS End User Messaging (o `smsMode: mock` en dev). Los créditos son un **punto de parada duro**: los créditos agotados rechazan al por mayor (`insufficient_credits`, surfaced como un prompt de actualización amigable en B1 Admin) — nunca envíos parciales, nunca facturación de exceso. Los grants de crédito se emiten idempotentemente por período de facturación desde webhooks de Stripe `invoice.paid`. Los opt-outs (`smsOptOuts`) se filtran antes de cada envío.

## Flujo de almacenamiento

La fila del proveedor de una iglesia (`content.storageProviders`, gestionada en B1 Admin → Configuración → Almacenamiento de Archivos) selecciona dónde van las **nuevas** subidas. `contentPath` es una URL absoluta por archivo, así que los proveedores mixtos coexisten sin migración: los archivos antiguos siguen sirviendo desde `content.churchapps.org`, los nuevos desde `content.ministrystuff.org`. Las subidas fluyen Api → `StorageResolver.forChurch` → proveedor `store`/`getUploadUrl` (POST pre-firmado con `content-length-range` en modo S3; reserva base64 en modo disco/dev); las eliminaciones se enrutan por la URL almacenada (`StorageResolver.forUrl`). Cuota = bytes de plan, contados desde `storageObjects` (reservas `stored` + `pending`); cuota excedida bloquea nuevas subidas (`storage_quota_exceeded`) — nada se elimina nunca ni se factura extra. El nivel gratuito de ChurchApps permanece sin cambios (mismos límites que antes; sin cuota de toda la iglesia).

Nota de alcance: la selección del proveedor cubre el flujo de **archivos/recursos** de contenido (donde vive el contenido masivo). Las subidas de galería/logo/foto permanecen en el proveedor predeterminado — ellas listan claves de almacenamiento y construyen URLs lado del cliente, así que el enraizamiento por iglesia no se aplica todavía.

## Facturación

Stripe Checkout (hospedado) para suscribirse, Stripe Customer Portal para actualización de tarjeta/cancelación/facturas — MinistryStuffWeb no tiene formularios de tarjeta. Una fila de `subscriptions` por (iglesia, producto); planes/tiers viven en código (`MinistryStuffApi/src/helpers/Plans.ts`) con precios de Stripe del config. Webhook (`/billing/webhook`, verificación de firma de cuerpo crudo, dedup de `webhookEvents`) impulsa el ciclo de vida de la suscripción: activo → past_due (gracia) → cancelado.

## Configuración de dev

Ejecuta MinistryStuffApi (`yarn dev`, 8097; necesita `.env` con el `JWT_SECRET` compartido + `MINISTRYSTUFF_SERVICE_KEY`) y establece la misma clave de servicio en `Api/.env`. `Api/config/dev.json` ya apunta `ministryStuffApi` a `localhost:8097`. MinistryStuffWeb necesita `.env` con `VITE_STAGE=dev`. Dev usa `smsMode: mock` y almacenamiento en disco — no se necesita AWS.
