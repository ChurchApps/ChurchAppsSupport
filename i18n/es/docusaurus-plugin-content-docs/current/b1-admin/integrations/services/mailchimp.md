---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Canaliza nuevas personas de B1, donantes, o miembros de grupos en una audiencia de Mailchimp para que la próxima serie de bienvenida, apelación de fin de año, o newsletter de voluntarios extraiga de una lista que siempre está actualizada. B1 no tiene sincronización integrada de Mailchimp -- el cableado vive completamente en Zapier (o Make): B1 dispara el evento, Mailchimp ingiere al suscriptor.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Mailchimp](https://mailchimp.com) con al menos una audiencia a la que deseas que se empujen personas de B1
- Una cuenta de [Zapier](https://zapier.com) (el nivel gratuito cubre iglesias pequeñas)
- Un usuario de B1 Admin con permiso **Editar configuración** para que puedas acuñar una clave API

</div>

## Qué puedes conectar

| Dirección | Disparador de B1 | Acción de Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Agregar/actualizar suscriptor |
| B1 → Mailchimp | `donation.created` | Agregar suscriptor a etiqueta (p. ej. "Donó en 2026") |
| B1 → Mailchimp | `group.member.added` | Agregar suscriptor a etiqueta con alcance a ese grupo |
| Mailchimp → B1 | Nuevo suscriptor | B1 *Crear persona* |

El lado de Mailchimp expone mucho más (campañas, segmentos, automatizaciones) -- consulta [los disparadores de Mailchimp en Zapier](https://zapier.com/apps/mailchimp/integrations) para la lista completa. Cualquier cosa mapeable del sobre de B1 es válida.

## Configuración

### 1. Acuña una clave API de B1

En B1 Admin ve a **Configuración → Desarrollador → Claves API → Nueva clave API**. Dale los alcances que el Zap necesita:

- `settings:write` — requerido para que el disparador registre su webhook
- `people:read` — para que el Zap pueda leer nombre/apellido, correo, etc.
- (Opcional) `people:write` si también planeas una dirección Mailchimp → B1

Guarda y copia la cadena `cak_…` -- se muestra solo una vez.

### 2. Construye el Zap

1. **Disparador:** `B1.church — Nueva persona`. En primer uso Zapier te pide *Iniciar sesión en B1.church*; pega la clave API.
2. **Acción:** `Mailchimp — Agregar/actualizar suscriptor`. Mapea la salida del disparador:
   - `data.contactInfo.email` → Dirección de correo
   - `data.name.first` → Nombre
   - `data.name.last` → Apellido
   - (Opcional) `data.id` → un campo de fusión de Mailchimp si deseas mantener el id de persona de B1 junto a él.
3. Activa el Zap. Zapier registra un webhook `person.created` en B1 -- verifica en **Configuración → Desarrollador → Webhooks** que aparezca una fila llamada "Zapier — person.created".

Eso es todo. Agrega una persona en B1 Admin para confirmar -- el nuevo suscriptor aparece en Mailchimp dentro de segundos.

## Recetas comunes

### Etiquetar donantes automáticamente

- **Disparador** — B1: Nueva donación
- **Acción** — B1: Buscar persona (búsqueda por `personId`) para obtener el correo
- **Acción** — Mailchimp: Agregar suscriptor a etiqueta (etiqueta `Gave-2026`)

### Soltar una serie de bienvenida específica del grupo

- **Disparador** — B1: Nuevo miembro del grupo, filtrado por `data.groupId`
- **Acción** — Mailchimp: Agregar suscriptor a etiqueta nombrada según el grupo; dispara tu automatización existente de esa etiqueta

### Bidireccional: nuevos registros de Mailchimp se convierten en contactos de B1

- **Disparador** — Mailchimp: Nuevo suscriptor
- **Acción** — B1: Crear persona (mapea Nombre/Apellido/Correo)

## Alternativa de Make

La [aplicación Mailchimp de Make](https://www.make.com/en/integrations/mailchimp) cubre 44 módulos -- el cableado es idéntico, con el disparador B1 *Ver eventos* reemplazando el de Zapier. Consulta el [documento de descripción general de Make](../make) para el lado de B1.

## Límites y notas

- **El nivel gratuito de Mailchimp limita contactos y audiencias** -- un Zap que inunda una audiencia gratuita pasando su límite comenzará a tener errores con `4xx Member limit reached`. Los registros de Mailchimp hacen esto obvio.
- **Mailchimp deduplicaa por correo**, así que volver a ejecutar un Zap en la misma persona de B1 la actualiza en su lugar; no crea duplicados.
- **Los cancelamientos de suscripción de Mailchimp no fluyen de vuelta a B1.** Si deseas que los cancelamientos de suscripción de Mailchimp limpien la preferencia "Enviar correo" de B1, construye explícitamente el Zap inverso.

## Solución de problemas

- **El Zap nunca se dispara** -- verifica `Configuración → Desarrollador → Webhooks` para la fila `Zapier — person.created`. Si está ausente, la clave API carecía de `settings:write` cuando el Zap se activó. Re-acuña, re-conecta, desactiva y activa el Zap.
- **Advertencia `Member exists` en agregar/actualizar** -- cambia la acción de *Agregar suscriptor* a *Agregar/actualizar suscriptor* (el verbo importa). La variante upsert es idempotente.
- **Nombre / apellido aparecen en blanco** -- `data.name.first` y `data.name.last` de B1 se rellenan solo si esos campos se establecen en la persona. Mapea `data.name.display` como alternativa.

## Ver también

- [Zapier (descripción general)](../zapier) -- el lado de B1 de cada receta de Zapier
- [Make (descripción general)](../make) -- la misma idea, constructor visual
- [Webhooks (referencia de desarrollador)](/docs/developer/api/webhooks#event-catalog)
