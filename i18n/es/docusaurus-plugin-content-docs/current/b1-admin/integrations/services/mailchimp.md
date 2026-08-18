---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Mantén una audiencia de Mailchimp sincronizada con B1 automáticamente: las personas se añaden con su nombre, correo electrónico y teléfono; la pertenencia a grupos y listas se convierte en etiquetas de Mailchimp; las personas eliminadas se archivan. La sincronización está integrada en B1 — sin servicio de terceros, sin medición por tarea y los cambios llegan en tiempo casi real en lugar de en un horario nocturno.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Mailchimp](https://mailchimp.com) con la audiencia que deseas que B1 gestione
- Una **clave API** de Mailchimp (Mailchimp: icono de perfil → **Cuenta y facturación → Extras → Claves API**)
- Tu **ID de Audiencia** (Mailchimp: **Audiencia → Configuración → Nombre de audiencia y valores predeterminados**)
- Un usuario de B1Admin con permiso de **Editar Configuración**

</div>

## Qué se Sincroniza

| Cambio en B1 | Efecto en Mailchimp |
|---|---|
| Persona agregada o actualizada | Suscriptor agregado/actualizado (nombre, apellido, teléfono; los nuevos suscriptores llegan como `subscribed`) |
| Persona eliminada (o borrada por GDPR) | Suscriptor archivado |
| Persona se une a un grupo | Se añade etiqueta nombrada según el grupo |
| Persona abandona un grupo | Se elimina esa etiqueta |
| Persona entra en una lista guardada | Se añade etiqueta nombrada según la lista |
| Persona abandona una lista guardada | Se elimina esa etiqueta |

**Las listas guardadas suelen ser una mejor fuente de etiquetas.** Una [lista guardada](/docs/b1-admin/people/lists) de B1 es una audiencia basada en reglas que se reevalúa a sí misma — "todos en el campus Norte", "miembros que optaron por recibir correos pastorales". Apunta tus segmentos de Mailchimp a etiquetas de lista y la sincronización las mantiene; usa etiquetas de grupo para envíos de equipos ministeriales.

La sincronización es **unidireccional** (B1 → Mailchimp) y solo toca campos estándar de Mailchimp, por lo que no puede entrar en conflicto con campos de combinación o segmentos que gestiones dentro de Mailchimp.

## Configuración

1. En B1Admin ve a **Configuración → Desarrollador → Webhooks → Añadir Webhook**.
2. Establece **Tipo de Conector** a **Mailchimp**.
3. Pega tu **Clave API de Mailchimp** e **ID de Audiencia**. La clave se almacena encriptada y nunca se vuelve a mostrar.
4. Los eventos relevantes están preseleccionados; desmarca cualquiera que no desees (por ejemplo, mantén activados los eventos de persona pero omite las etiquetas de grupo).
5. Guarda. B1 verifica la clave y la audiencia contra Mailchimp antes de aceptar — un error mecanográfico falla inmediatamente con una razón.

Usa **Enviar Prueba** en cualquier momento para reverificar la conexión. Cada intento de sincronización se registra en el historial de entregas del webhook con la respuesta real de Mailchimp, y los envíos fallidos se reintentarán automáticamente con retroceso durante aproximadamente cinco días.

## Importación Inicial

El conector sincroniza *cambios* a partir del momento en que está activado; no realiza una carga previa de tu directorio existente. Para el día de configuración:

1. En B1Admin ve a **Personas**, busca las personas que deseas (u ejecuta una lista guardada), y haz clic en **Exportar** para descargar un CSV.
2. En Mailchimp usa **Audiencia → Importar contactos** para cargar el CSV, aplicando cualquier etiqueta durante la importación.

Realizar la carga inicial a través del importador de Mailchimp te mantiene en control de la pregunta de consentimiento — solo importa personas que realmente han aceptado recibir tus correos electrónicos. La importación masiva de un directorio completo como contactos suscritos puede violar los términos de Mailchimp y la ley anti-spam (CAN-SPAM/GDPR).

## Límites y Notas

- **Sincronización unidireccional.** Las desuscripciones, rebotes y ediciones realizadas en Mailchimp no fluyen de vuelta a B1. Alguien que se desuscribe en Mailchimp aún puede recibir correo enviado directamente desde B1 — trata Mailchimp como la fuente de verdad para el consentimiento de correo masivo.
- **Las personas sin dirección de correo electrónico se omiten** (registrado como tal en el historial de entregas) — los suscriptores de Mailchimp se identifican por correo electrónico.
- **Los cambios de dirección de correo electrónico crean un nuevo suscriptor.** Mailchimp identifica a las personas por correo electrónico, así que cambiar el correo de alguien en B1 los añade bajo la nueva dirección; el suscriptor anterior permanece hasta que lo archives en Mailchimp.
- **Solo se sincronizan campos estándar** — nombre, apellido, teléfono. El estado de membresía, campus y campos personalizados de B1 no se asignan a campos de combinación de Mailchimp en esta versión; usa etiquetas de lista para segmentar en su lugar.
- **Los nombres de etiquetas son los nombres de grupo/lista.** Renombrar un grupo o lista comienza a etiquetar bajo el nuevo nombre; la etiqueta antigua permanece en los suscriptores existentes hasta que se elimine en Mailchimp.
- **Los límites de contacto de Mailchimp aún se aplican** — una sincronización que empuje una audiencia de nivel gratuito más allá de su límite registrará errores de `Límite de miembros alcanzado` en el historial de entregas.

## Otras Recetas (Zapier / Make)

Cualquier cosa más allá de la sincronización de audiencias — etiquetar donantes en `donation.created`, una dirección inversa de Mailchimp → B1, o sincronizar a una plataforma de correo diferente completamente (Constant Contact, Brevo, etc.) — aún está disponible a través de [Zapier](../zapier) o [Make](../make), que se activan en los mismos eventos de webhook:

- **Etiquetar donantes:** B1 *Nueva Donación* → B1 *Buscar Persona* → Mailchimp *Añadir Suscriptor a Etiqueta* (`Dio-2026`)
- **Bidireccional:** Mailchimp *Nuevo Suscriptor* → B1 *Crear Persona*

Si anteriormente conectaste sincronización de persona/grupo a través de Zapier, desactiva esos Zaps después de habilitar el conector nativo — ejecutar ambos duplica el procesamiento de cada evento y gasta tareas de Zapier para nada.

## Solución de Problemas

- **La guardia falla con "Mailchimp rechazó la clave API"** — la clave fue revocada o fue escrita incorrectamente. Las claves deben terminar con un sufijo de centro de datos como `-us21`.
- **La guardia falla con "audiencia no encontrada"** — el ID de Audiencia no existe bajo esa cuenta. Cópialo de **Audiencia → Configuración → Nombre de audiencia y valores predeterminados** (no es el nombre de la audiencia).
- **Una persona nunca apareció en Mailchimp** — verifica el historial de entregas del webhook. "Omitido: la persona no tiene dirección de correo electrónico" significa exactamente eso; un `4xx` de Mailchimp muestra la razón en el cuerpo de la respuesta.
- **Los envíos se detuvieron completamente** — después de entregas agotadas repetidas el webhook se desactiva automáticamente. Arregla la causa (generalmente una clave revocada), reactívalo, y usa **Enviar Prueba** para confirmar.

## Ver También

- [Webhooks (referencia de desarrollador)](/docs/developer/api/webhooks) — el motor subyacente, catálogo de eventos, semántica de entrega/reintento
- [Listas Guardadas](/docs/b1-admin/people/lists) — audiencias basadas en reglas que se asignan naturalmente a etiquetas de Mailchimp
- [Zapier (descripción general)](../zapier) — para recetas más allá de sincronización de audiencias
