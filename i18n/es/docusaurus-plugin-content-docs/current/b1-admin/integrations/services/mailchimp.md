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
- Un usuario de B1 Admin con permiso **Editar Configuración** para que puedas acuñar una clave API

</div>

## Qué puedes conectar

| Dirección | Disparador de B1 | Acción de Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Agregar/Actualizar Suscriptor |
| B1 → Mailchimp | `donation.created` | Agregar Suscriptor a Etiqueta (p. ej. "Donó en 2026") |
| B1 → Mailchimp | `group.member.added` | Agregar Suscriptor a Etiqueta con alcance a ese grupo |
| Mailchimp → B1 | Nuevo Suscriptor | B1 *Crear Persona* |

El lado de Mailchimp expone mucho más (campañas, segmentos, automatizaciones) -- consulta [los disparadores de Mailchimp en Zapier](https://zapier.com/apps/mailchimp/integrations) para la lista completa. Cualquier cosa mapeable del sobre de B1 es válida.

## Configuración

### 1. Acuña una clave API de B1

En B1 Admin ve a **Configuración → Desarrollador → Claves API → Nueva Clave API**. Dale los alcances que el Zap necesita:

- `settings:write` — requerido para que el disparador registre su webhook
- `people:read` — para que el Zap pueda leer nombre/apellido, correo, etc.
- (Opcional) `people:write` si también planeas una dirección Mailchimp → B1

Guarda y copia la cadena `cak_…` -- se muestra solo una vez.

### 2. Construye el Zap

1. **Disparador:** `B1 Church — Nueva Persona`. En primer uso Zapier te pide *Iniciar Sesión en B1 Church*; pega la clave API.
2. **Acción:** `Mailchimp — Agregar/Actualizar Suscriptor`. Mapea la salida del disparador:
   - `data.contactInfo.email` → Dirección de Correo
   - `data.name.first` → Nombre
   - `data.name.last` → Apellido
   - (Opcional) `data.id` → un campo de fusión de Mailchimp si deseas mantener el id de persona de B1 junto a él.
3. Activa el Zap. Zapier registra un webhook `person.created` en B1 -- verifica en **Configuración → Desarrollador → Webhooks** que aparezca una fila llamada "Zapier — person.created".

Eso es todo. Agrega una persona en B1 Admin para confirmar -- el nuevo suscriptor aparece en Mailchimp dentro de segundos.

## Recetas comunes

### Etiquetar donantes automáticamente

- **Disparador** — B1: Nueva Donación
- **Acción** — B1: Buscar Persona (búsqueda por `personId`) para obtener el correo
- **Acción** — Mailchimp: Agregar Suscriptor a Etiqueta (etiqueta `Gave-2026`)

### Soltar una serie de bienvenida específica del grupo

- **Disparador** — B1: Nuevo Miembro del Grupo, filtrado por `data.groupId`
- **Acción** — Mailchimp: Agregar Suscriptor a Etiqueta nombrada según el grupo; dispara tu automatización existente de esa etiqueta

### Bidireccional: nuevos registros de Mailchimp se convierten en contactos de B1

- **Disparador** — Mailchimp: Nuevo Suscriptor
- **Acción** — B1: Crear Persona (mapea Nombre/Apellido/Correo)

## Alternativa de Make

La [aplicación Mailchimp de Make](https://www.make.com/en/integrations/mailchimp) cubre 44 módulos -- el cableado es idéntico, con el disparador B1 *Ver Eventos* reemplazando el de Zapier. Consulta el [documento de Descripción General de Make](../make) para el lado de B1.

## Límites y notas

- **El nivel gratuito de Mailchimp limita contactos y audiencias** -- un Zap que inunda una audiencia gratuita pasando su límite comenzará a tener errores con `4xx Member limit reached`. Los registros de Mailchimp hacen esto obvio.
- **Mailchimp deduplica por correo**, así que volver a ejecutar un Zap en la misma persona de B1 la actualiza en su lugar; no crea duplicados.
- **Los cancelamientos de suscripción de Mailchimp no fluyen de vuelta a B1.** Si deseas que los cancelamientos de suscripción de Mailchimp limpien la preferencia "Enviar Correo" de B1, construye explícitamente el Zap inverso.

## Solución de problemas

- **El Zap nunca se dispara** -- verifica `Configuración → Desarrollador → Webhooks` para la fila `Zapier — person.created`. Si está ausente, la clave API carecía de `settings:write` cuando el Zap se activó. Re-acuña, re-conecta, desactiva y activa el Zap.
- **Advertencia `Member exists` en agregar/actualizar** -- cambia la acción de *Agregar Suscriptor* a *Agregar/Actualizar Suscriptor* (el verbo importa). La variante upsert es idempotente.
- **Nombre / apellido aparecen en blanco** -- `data.name.first` y `data.name.last` de B1 se rellenan solo si esos campos se establecen en la persona. Mapea `data.name.display` como alternativa.

## Ver también

- [Zapier (Descripción General)](../zapier) -- el lado de B1 de cada receta de Zapier
- [Make (Descripción General)](../make) -- la misma idea, constructor visual
- [Webhooks (Referencia de Desarrollador)](/docs/developer/api/webhooks#event-catalog)
