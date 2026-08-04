# MinistryStuff (Almacenamiento y Mensajería de Texto de Pago)

MinistryStuff.org es el servicio de pago independiente que financia las dos cosas que ChurchApps no puede regalar — almacenamiento masivo de archivos (1TB+) y créditos de SMS — como suscripciones mensuales de tarifa plana. ChurchApps en sí sigue siendo 100% gratuito; nada en B1 requiere una suscripción a MinistryStuff, y cada punto de integración es una interfaz de proveedor que un tercero también podría implementar.

## Componentes

| Pieza | Repositorio | Función |
|---|---|---|
| MinistryStuffApi | `MinistryStuffApi/` (puerto 8097 en desarrollo) | Facturación (Stripe), envío de SMS + libro de créditos (AWS End User Messaging), almacenamiento (S3 + contabilidad de cuota). Una única base de datos MySQL `ministrystuff`. |
| MinistryStuffWeb | `MinistryStuffWeb/` (puerto 3103 en desarrollo) | ministrystuff.org — marketing, precios y el portal de cuenta (planes, uso, redirecciones de Stripe Checkout/Customer Portal). |
| Proveedor de mensajería de texto | `Packages/texting` → `MinistryStuffProvider` | Registrado como `ministrystuff` junto con Clearstream/TextInChurch. |
| Interfaz de almacenamiento | `Packages/apihelper` → `IStorageProvider` / `StorageProviderFactory` | `ChurchAppsStorageProvider` (predeterminado, gratuito) envuelve el conmutador S3/disco original; `FileStorageHelper` delega al proveedor predeterminado sin cambios. |
| Conexión de la Api | Módulos de contenido y mensajería de `Api/` | `MinistryStuffStorageProvider` + `StorageResolver` (contenido), inyección de clave de servicio de `TextingConfigHelper` (mensajería), tabla `storageProviders`, endpoints `/content/storage/*` + `/messaging/texting/credits`. |

## Identidad y confianza

- Las mismas cuentas, las mismas iglesias: MinistryStuffApi verifica los JWT de ChurchApps con el `JWT_SECRET` compartido (patrón de aplicación hermana, como B1Transfer). El portal inicia sesión contra MembershipApi y acepta traspasos con `?jwt=`.
- Servidor a servidor (Api principal → MinistryStuffApi): encabezado `X-Service-Key` (`MINISTRYSTUFF_SERVICE_KEY`, en ambos lados) + `churchId` explícito. El derecho de uso siempre se verifica contra la suscripción de esa iglesia. Las iglesias nunca tienen credenciales de MinistryStuff — seleccionar el proveedor en B1Admin es todo lo que se necesita.

## Flujo de mensajería de texto

Enviar Mensaje de B1Admin → `TextingController` de Api → `getProvider("ministrystuff")` de `@churchapps/texting` → `/sms/send|/sms/sendBulk` de MinistryStuffApi → se debita el recuento de segmentos contra las `smsCreditGrants` del período actual → AWS End User Messaging (o `smsMode: mock` en desarrollo). Los créditos son un **límite estricto**: los créditos agotados rechazan por completo (`insufficient_credits`, mostrado como un aviso amigable de actualización en B1Admin) — nunca envíos parciales, nunca facturación por exceso. Las concesiones de crédito se emiten de forma idempotente por período de facturación desde los webhooks `invoice.paid` de Stripe. Las exclusiones voluntarias (`smsOptOuts`) se filtran antes de cada envío.

## Flujo de almacenamiento

La fila de proveedor de una iglesia (`content.storageProviders`, gestionada en B1Admin → Configuración → Almacenamiento de Archivos) selecciona a dónde van las cargas **nuevas**. `contentPath` es una URL absoluta por archivo, por lo que proveedores mixtos coexisten sin ninguna migración: los archivos antiguos siguen sirviéndose desde `content.churchapps.org`, los nuevos desde `content.ministrystuff.org`. Las cargas fluyen Api → `StorageResolver.forChurch` → `store`/`getUploadUrl` del proveedor (POST prefirmado con `content-length-range` en modo S3; alternativa base64 en modo disco/desarrollo); las eliminaciones se enrutan por la URL almacenada (`StorageResolver.forUrl`). Cuota = bytes del plan, contados desde `storageObjects` (reservas `stored` + `pending`); exceder la cuota bloquea las nuevas cargas (`storage_quota_exceeded`) — nunca se elimina ni se factura nada adicional. El nivel gratuito de ChurchApps permanece intacto (los mismos límites que antes; sin cuota a nivel de iglesia).

Nota de alcance: la selección de proveedor cubre el flujo de **archivos/recursos** de contenido (donde vive el contenido multimedia masivo). Las cargas de galería/logo/foto permanecen en el proveedor predeterminado — enumeran claves desde el almacenamiento y construyen URLs del lado del cliente, por lo que el enraizamiento por iglesia aún no aplica.

## Facturación

Stripe Checkout (alojado) para suscribirse, Stripe Customer Portal para actualizar tarjeta/cancelar/facturas — MinistryStuffWeb no tiene formularios de tarjeta. Una fila `subscriptions` por (iglesia, producto); los planes/niveles viven en el código (`MinistryStuffApi/src/helpers/Plans.ts`) con ids de precio de Stripe desde la configuración. El webhook (`/billing/webhook`, verificación de firma de cuerpo sin procesar, deduplicación de `webhookEvents`) impulsa el ciclo de vida de la suscripción: activa → vencida (período de gracia) → cancelada.

## Configuración de desarrollo

Ejecuta MinistryStuffApi (`yarn dev`, 8097; necesita `.env` con el `JWT_SECRET` compartido + `MINISTRYSTUFF_SERVICE_KEY`) y establece la misma clave de servicio en `Api/.env`. `Api/config/dev.json` ya apunta `ministryStuffApi` a `localhost:8097`. MinistryStuffWeb necesita `.env` con `VITE_STAGE=dev`. El desarrollo usa `smsMode: mock` y almacenamiento en disco — no se necesita AWS.
