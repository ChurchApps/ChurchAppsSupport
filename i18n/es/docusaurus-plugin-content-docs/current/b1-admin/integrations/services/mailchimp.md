---
title: "Mailchimp"
description: "Sincronice las personas de B1 Admin y la membresía de grupos o listas guardadas con una audiencia de Mailchimp como etiquetas, con los pasos de configuración, importación inicial y solución de problemas."
---

# Mailchimp

<div class="article-intro">

Mantenga una audiencia de Mailchimp sincronizada con B1 automáticamente: las personas llegan con su nombre, correo electrónico y teléfono; la membresía en grupos y listas se convierte en etiquetas de Mailchimp; las personas eliminadas se archivan. La sincronización está integrada en B1: no hay un servicio de terceros, ni un cobro por tarea, y los cambios llegan casi en tiempo real en lugar de hacerlo en una programación nocturna.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Mailchimp](https://mailchimp.com) con la audiencia que desea que B1 administre
- Una **clave de API** de Mailchimp (Mailchimp: icono de perfil → **Account & billing → Extras → API keys**)
- Su **Audience ID** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Un usuario de B1Admin con el permiso **Edit Settings**

</div>

## Qué se sincroniza {#what-syncs}

| Cambio en B1 | Efecto en Mailchimp |
|---|---|
| Persona agregada o actualizada | Suscriptor agregado/actualizado (nombre, apellido, teléfono; los suscriptores nuevos llegan como `subscribed`) |
| Persona eliminada (o borrada por GDPR) | Suscriptor archivado |
| La persona se une a un grupo | Se agrega una etiqueta con el nombre del grupo |
| La persona sale de un grupo | Se elimina esa etiqueta |
| La persona entra en una lista guardada | Se agrega una etiqueta con el nombre de la lista |
| La persona sale de una lista guardada | Se elimina esa etiqueta |

**Las listas guardadas suelen ser mejor fuente de etiquetas.** Una [lista guardada](/docs/b1-admin/people/lists) de B1 es una audiencia basada en reglas que se reevalúa sola: "todos en el campus Norte", "miembros que aceptaron los correos pastorales". Apunte sus segmentos de Mailchimp a las etiquetas de lista y la sincronización los mantendrá; use las etiquetas de grupo para los envíos a equipos de ministerio.

La sincronización es **unidireccional** (B1 → Mailchimp) y solo modifica los campos estándar de Mailchimp, así que no puede entrar en conflicto con los campos de combinación ni los segmentos que administra dentro de Mailchimp.

## Configuración {#setup}

1. En B1Admin vaya a **Settings → Developer → Webhooks → New Webhook**.
2. Configure **Connector Type** como **Mailchimp**.
3. Pegue su **Mailchimp API Key** y su **Audience ID**. La clave se guarda cifrada y nunca se vuelve a mostrar.
4. Los eventos relevantes vienen preseleccionados; desmarque los que no quiera (por ejemplo, deje activados los eventos de personas pero omita las etiquetas de grupo).
5. Guarde. B1 verifica la clave y la audiencia con Mailchimp antes de aceptarlas: un error de escritura falla de inmediato y le indica el motivo.

En cualquier momento puede volver a abrir el webhook y hacer clic en **Send Test Event** para verificar de nuevo la conexión (en Mailchimp, esto comprueba su clave y su audiencia en lugar de enviar un suscriptor de muestra). Cada intento de sincronización queda registrado en el historial de entregas del webhook, con la respuesta real de Mailchimp, y las entregas fallidas se reintentan automáticamente con retroceso durante unos cinco días.

## Importación inicial {#initial-import}

El conector sincroniza los *cambios* desde el momento en que se activa; no completa retroactivamente su directorio existente. Para el día de la configuración:

1. En B1Admin vaya a **People**, busque las personas que desea (o ejecute una lista guardada) y haga clic en **Export** para descargar un CSV.
2. En Mailchimp use **Audience → Import contacts** para cargar el CSV, aplicando las etiquetas durante la importación.

Hacer la carga inicial con el importador de Mailchimp le permite mantener el control sobre el consentimiento: importe solo a personas que hayan aceptado realmente recibir sus correos. Importar masivamente todo un directorio como contactos suscritos puede infringir las condiciones de Mailchimp y las leyes antispam (CAN-SPAM/GDPR).

## Límites y notas {#limits--notes}

- **Sincronización unidireccional.** Las bajas, los rebotes y las ediciones hechas en Mailchimp no regresan a B1. Alguien que se da de baja en Mailchimp aún puede recibir correos enviados directamente desde B1: considere Mailchimp como la fuente de verdad para el consentimiento de correos masivos.
- **Las personas sin correo electrónico se omiten** (se registra así en el historial de entregas): los suscriptores de Mailchimp se identifican por correo electrónico.
- **Un cambio de correo electrónico crea un suscriptor nuevo.** Mailchimp identifica a las personas por correo electrónico, así que si cambia el correo de alguien en B1, se agrega con la dirección nueva; el suscriptor anterior se mantiene hasta que lo archive en Mailchimp.
- **Solo se sincronizan los campos estándar**: nombre, apellido y teléfono. El estado de membresía, el campus y los campos personalizados de B1 no se asignan a los campos de combinación de Mailchimp en esta versión; use etiquetas de lista para segmentar.
- **Los nombres de las etiquetas son los nombres de grupo o lista.** Si renombra un grupo o una lista, empezarán a etiquetarse con el nombre nuevo; la etiqueta anterior permanece en los suscriptores existentes hasta que la elimine en Mailchimp.
- **Los límites de contactos de Mailchimp siguen aplicando**: una sincronización que lleve una audiencia del plan gratuito por encima de su límite registrará errores `Member limit reached` en el historial de entregas.

## Otras recetas (Zapier / Make) {#other-recipes-zapier--make}

Cualquier cosa más allá de la sincronización de audiencias (etiquetar a los donantes con `donation.created`, la dirección inversa de Mailchimp → B1, o sincronizar con una plataforma de correo distinta, como Constant Contact o Brevo) sigue disponible a través de [Zapier](../zapier.md) o [Make](../make.md), que se activan con los mismos eventos de webhook:

- **Etiquetar donantes:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Bidireccional:** Mailchimp *New Subscriber* → B1 *Create Person*

Si antes conectó la sincronización de personas y grupos a través de Zapier, desactive esos Zaps después de activar el conector nativo: ejecutar ambos procesa cada evento dos veces y consume tareas de Zapier sin ningún beneficio.

## Solución de problemas {#troubleshooting}

- **Al guardar aparece "Mailchimp rejected the API key"**: la clave fue revocada o tiene un error de escritura. Las claves deben terminar en un sufijo de centro de datos, como `-us21`.
- **Al guardar aparece "audience not found"**: el Audience ID no existe en esa cuenta. Cópielo desde **Audience → Settings → Audience name and defaults** (no es el nombre de la audiencia).
- **Una persona nunca apareció en Mailchimp**: revise el historial de entregas del webhook. "Skipped: person has no email address" significa exactamente eso; un error `4xx` de Mailchimp muestra el motivo en el cuerpo de la respuesta.
- **Las entregas se detuvieron por completo**: después de varias entregas agotadas, el webhook se desactiva automáticamente. Corrija la causa (normalmente una clave revocada), vuelva a activarlo y use **Send Test Event** para confirmar.

## Vea también {#see-also}

- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks): el motor subyacente, el catálogo de eventos y la semántica de entrega y reintentos
- [Listas guardadas](/docs/b1-admin/people/lists): audiencias basadas en reglas que se corresponden de forma natural con las etiquetas de Mailchimp
- [Zapier (descripción general)](../zapier.md): para recetas más allá de la sincronización de audiencias
