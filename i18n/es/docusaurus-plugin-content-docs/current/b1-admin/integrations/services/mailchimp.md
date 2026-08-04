---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Envíe nuevas personas, donantes o miembros de grupo de B1 a una audiencia de Mailchimp para que la próxima serie de bienvenida, apelación de fin de año o boletín de voluntarios se extraiga de una lista que siempre está actualizada. B1 no tiene una sincronización integrada con Mailchimp — la conexión vive completamente en Zapier (o Make): B1 dispara el evento, Mailchimp ingiere al suscriptor.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Mailchimp](https://mailchimp.com) con al menos una audiencia a la que desee enviar personas de B1
- Una cuenta de [Zapier](https://zapier.com) (el nivel gratuito cubre iglesias pequeñas)
- Un usuario de B1Admin con permiso de **Editar Configuración** para poder generar una clave API

</div>

## Qué Puede Conectar

| Dirección | Disparador de B1 | Acción de Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Agregar/Actualizar Suscriptor |
| B1 → Mailchimp | `donation.created` | Agregar Suscriptor a Etiqueta (por ejemplo, "Donó en 2026") |
| B1 → Mailchimp | `group.member.added` | Agregar Suscriptor a Etiqueta específica de ese grupo |
| Mailchimp → B1 | Nuevo Suscriptor | B1 *Crear Persona* |

El lado de Mailchimp expone mucho más (campañas, segmentos, automatizaciones) — consulte los [disparadores de Zapier de Mailchimp](https://zapier.com/apps/mailchimp/integrations) para ver la lista completa. Cualquier cosa que se pueda mapear desde el sobre de B1 es válida.

## Configuración

### 1. Genere una clave API de B1

En B1Admin vaya a **Configuración → Desarrollador → Claves API → Nueva Clave API**. Asígnele los alcances que necesite el Zap:

- `settings:write` — requerido para que el disparador registre su webhook
- `people:read` — para que el Zap pueda leer nombre/apellido, correo electrónico, etc.
- (Opcional) `people:write` si también planea una dirección Mailchimp → B1

Guarde y copie la cadena `cak_…` — solo se muestra una vez.

### 2. Construya el Zap

1. **Disparador:** `B1.church — Nueva Persona`. En el primer uso Zapier le pide *Iniciar sesión en B1.church*; pegue la clave API.
2. **Acción:** `Mailchimp — Agregar/Actualizar Suscriptor`. Mapee la salida del disparador:
   - `data.contactInfo.email` → Dirección de Correo Electrónico
   - `data.name.first` → Nombre
   - `data.name.last` → Apellido
   - (Opcional) `data.id` → un campo de combinación de Mailchimp si desea conservar el id de persona de B1 junto a los demás.
3. Active el Zap. Zapier registra un webhook de `person.created` en B1 — verifique en **Configuración → Desarrollador → Webhooks** que aparezca una fila llamada "Zapier — person.created".

Eso es todo. Agregue una persona en B1Admin para confirmar — el nuevo suscriptor aparece en Mailchimp en segundos.

## Recetas Comunes

### Etiquetar donantes automáticamente

- **Disparador** — B1: Nueva Donación
- **Acción** — B1: Buscar Persona (búsqueda por `personId`) para obtener el correo electrónico
- **Acción** — Mailchimp: Agregar Suscriptor a Etiqueta (etiqueta `Gave-2026`)

### Iniciar una serie de bienvenida específica de un grupo

- **Disparador** — B1: Nuevo Miembro de Grupo, filtrado por `data.groupId`
- **Acción** — Mailchimp: Agregar Suscriptor a Etiqueta con el nombre del grupo; dispare su automatización existente a partir de esa etiqueta

### Bidireccional: los nuevos registros de Mailchimp se convierten en contactos de B1

- **Disparador** — Mailchimp: Nuevo Suscriptor
- **Acción** — B1: Crear Persona (mapee Nombre/Apellido/Correo electrónico)

## Alternativa con Make

La [aplicación de Mailchimp en Make](https://www.make.com/en/integrations/mailchimp) cubre 44 módulos — la conexión es idéntica, con el disparador *Observar Eventos* de B1 reemplazando al de Zapier. Consulte el [documento de resumen de Make](../make) para el lado de B1.

## Límites y Notas

- **El nivel gratuito de Mailchimp limita los contactos y audiencias** — un Zap que sature una audiencia gratuita más allá de su límite comenzará a fallar con `4xx Member limit reached`. Los registros de Mailchimp lo dejan claro.
- **Mailchimp deduplica por correo electrónico**, así que volver a ejecutar un Zap sobre la misma persona de B1 la actualiza en su lugar; no crea duplicados.
- **Las cancelaciones de suscripción de Mailchimp no fluyen de vuelta a B1.** Si desea que las cancelaciones de Mailchimp borren la preferencia "Enviar Correo" de B1, construya el Zap inverso explícitamente.

## Solución de Problemas

- **El Zap nunca se activa** — verifique `Configuración → Desarrollador → Webhooks` para la fila `Zapier — person.created`. Si no está presente, a la clave API le faltaba `settings:write` cuando se activó el Zap. Vuelva a generarla, vuelva a conectar, active y desactive el Zap.
- **Advertencia `Member exists` en Agregar/Actualizar** — cambie la acción de *Agregar Suscriptor* a *Agregar/Actualizar Suscriptor* (el verbo importa). La variante de upsert es idempotente.
- **El nombre / apellido llegan en blanco** — `data.name.first` y `data.name.last` de B1 solo se completan si esos campos están configurados en la persona. Mapee `data.name.display` como alternativa.

## Vea También

- [Zapier (resumen)](../zapier) — el lado de B1 de cada receta de Zapier
- [Make (resumen)](../make) — la misma idea, con un generador visual
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks#event-catalog)
