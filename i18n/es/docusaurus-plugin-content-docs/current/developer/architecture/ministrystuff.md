# MinistryStuff (Almacenamiento Pagado y Mensajería de Texto)

MinistryStuff.org es el servicio pagado separado que financia las dos cosas que ChurchApps no puede regalar — almacenamiento masivo de archivos (1 TB+) y créditos de SMS — como suscripciones mensuales de tarifa plana. ChurchApps en sí se mantiene 100% gratis; nada en B1 requiere una suscripción de MinistryStuff, y cada punto de integración es una costura de proveedor que un tercero también podría implementar.

## Componentes

| Pieza | Repo | Rol |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (puerto 8097 dev) | Facturación (Stripe), envío de SMS + libro mayor de crédito (AWS End User Messaging), almacenamiento (S3 + contabilidad de cuota). Base de datos MySQL única `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (puerto 3103 dev) | ministrystuff.org — marketing, precios y el portal de cuenta (planes, uso, redirecciones de Stripe Checkout/Customer Portal). |
| Proveedor de mensajería de texto | `Packages/texting` → `MinistryStuffProvider` | Registrado como `ministrystuff` junto a Clearstream/TextInChurch. |
| Costura de almacenamiento | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (predeterminado, gratis) envuelve el interruptor S3/disco original; `FileStorageHelper` delega al proveedor predeterminado sin cambios. |
| Cableado de Api | módulos de contenido + mensajería de `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (contenido), inyección de servicio `TextingConfigHelper` (mensajería), tabla `storageProviders`, extremos `/content/storage/*` + `/messaging/texting/credits`. |

## Identidad y confianza

- Las mismas cuentas, las mismas iglesias: MinistryStuffApi verifica ChurchApps JWTs con el `JWT_SECRET` compartido (patrón de aplicación hermana, como B1Transfer). El portal inicia sesión contra MembershipApi y acepta transferencias `?jwt=`.
- Servidor a servidor (Api central → MinistryStuffApi): encabezado `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, ambos lados) + `churchId` explícito. El derecho siempre se verifica contra la suscripción de esa iglesia. Las iglesias nunca mantienen credenciales de MinistryStuff — seleccionar el proveedor en B1Admin es todo lo que se necesita.

## Flujo de mensajería de texto

B1Admin Enviar Texto → Api `TextingController` → `@churchapps/texting` `getProvider("ministrystuff")` → MinistryStuffApi `/sms/send|/sms/sendBulk` → segmento de créditos debitados contra los `smsCreditGrants` del período actual → AWS End User Messaging (o `smsMode: mock` en dev). Los créditos son una **parada dura**: los créditos agotados rechazan por completo (`insufficient_credits`, mostrado como una solicitud de actualización amigable en B1Admin) — nunca envíos parciales, nunca facturación de sobrecosto. Los créditos se emiten de manera idempotente por período de facturación desde webhooks `invoice.paid` de Stripe. Los exclusiones (`smsOptOuts`) se filtran antes de cada envío.

Otros caminos alcanzan la misma costura de proveedor sin pasar por `TextingController`: alertas de registro de asistencia (`CheckinController` → `MessagingModuleGateway.sendBulkText`) y el paso de acción del flujo de trabajo **Enviar Texto** (`Api/src/modules/doing/helpers/StepActionHelper.ts` `sendText` → `MessagingModuleGateway.sendPersonText`, que escribe `sentTexts` + filas `deliveryLogs` con un remitente nulo). Los campos de fusión (`{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}`) se resuelven por destinatario por `MergeFieldHelper.resolve` y el resultado se limita a 1,600 caracteres. En `TextingController` un mensaje de grupo que contiene `{{` se envía como un `sendMessage` por destinatario en lugar de un único `sendBulk`; un mensaje sin marcadores de posición aún se envía como un envío masivo único.

## Flujo de almacenamiento

La fila de proveedor de una iglesia (`content.storageProviders`, administrada en B1Admin → Configuración → Almacenamiento de Archivos) selecciona dónde van las **nuevas** cargas. `contentPath` es una URL absoluta por archivo, así los proveedores mixtos coexisten con migración cero: los archivos antiguos continúan sirviendo desde `content.churchapps.org`, los nuevos desde `content.ministrystuff.org`. Los flujos de carga Api → `StorageResolver.forChurch` → proveedor `store`/`getUploadUrl` (POST presignado con `content-length-range` en modo S3; respaldo base64 en modo disco/dev); las eliminaciones se enrutan por la URL almacenada (`StorageResolver.forUrl`). Cuota = bytes de plan, contado de `storageObjects` (reservas `stored` + `pending`); exceso de cuota bloquea nuevas cargas (`storage_quota_exceeded`) — nada nunca se elimina o se factura extra. El nivel gratuito de ChurchApps no se toca (los mismos límites que antes; ninguna cuota de iglesia).

Nota de alcance: la selección de proveedor cubre el flujo de **archivos/recursos** de contenido (donde vive el medio masivo). Las cargas de galería/logotipo/foto permanecen en el proveedor predeterminado — enumera claves del almacenamiento y construye URLs del lado del cliente, así el enraizamiento por iglesia no se aplica aún.

La misma costura también potencia [Llevar Su Propio Almacenamiento](./byos-storage): las iglesias pueden vincular Google Drive, Dropbox, OneDrive o su propio cubo compatible con S3 en lugar de un plan de MinistryStuff.

## Facturación

Stripe Checkout (alojado) para suscribirse, Portal de Cliente de Stripe para actualización de tarjeta/cancelación/facturas — MinistryStuffWeb no tiene formularios de tarjeta. Una fila `subscriptions` por (iglesia, producto); los planes/niveles viven en código (`MinistryStuffApi/src/helpers/Plans.ts`) con ids de precio de Stripe de configuración. El webhook (`/billing/webhook`, verificación de firma de cuerpo crudo, dedup `webhookEvents`) impulsa el ciclo de vida de la suscripción: activo → past_due (gracia) → cancelado.

## Configuración de desarrollo

Ejecute MinistryStuffApi (`yarn dev`, 8097; necesita `.env` con el `JWT_SECRET` compartido + `MINISTRYSTUFF_SERVICE_KEY`) y establezca la misma clave de servicio en `Api/.env`. `Api/config/dev.json` ya apunta `ministryStuffApi` a `localhost:8097`. MinistryStuffWeb necesita `.env` con `VITE_STAGE=dev`. Dev usa `smsMode: mock` y almacenamiento en disco — sin AWS necesario.
