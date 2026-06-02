---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Canaliza nuevas personas de B1, donantes o miembros de grupo en una audiencia de Mailchimp para que la siguiente serie de bienvenida, apelación de fin de año, o boletín de voluntarios tire de una lista que siempre está actualizada. El cableado vive completamente en Zapier (o Make) — B1 dispara el evento, Mailchimp ingiere el suscriptor.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Mailchimp](https://mailchimp.com) con al menos una audiencia en la que deseas empujar personas de B1
- Una cuenta de [Zapier](https://zapier.com) (el nivel gratuito cubre iglesias pequeñas)
- Un usuario de B1Admin con permiso **Editar Configuración** para que puedas crear una clave de API

</div>

## Qué Puedes Conectar

| Dirección | Disparador de B1 | Acción de Mailchimp |
|---|---|---|
| B1 → Mailchimp | `person.created` | Agregar/actualizar suscriptor |
| B1 → Mailchimp | `donation.created` | Agregar suscriptor a etiqueta (p. ej. "Dio en 2026") |
| B1 → Mailchimp | `group.member.added` | Agregar suscriptor a etiqueta limitada a ese grupo |
| Mailchimp → B1 | Nuevo suscriptor | B1 *Crear persona* |

El lado de Mailchimp expone mucho más (campañas, segmentos, automatizaciones) — ve [disparadores de Zapier de Mailchimp](https://zapier.com/apps/mailchimp/integrations) para la lista completa. Cualquier cosa asignable desde la envolvente de B1 es juego justo.

## Configuración

### 1. Crear una clave de API B1

En B1Admin ve a **Configuración → Desarrollador → Claves de API → Nueva Clave de API**. Dale los alcances que necesita el Zap:

- `settings:write` — requerido para que el disparador registre su webhook
- `people:read` — para que el Zap pueda leer nombre/apellido, correo, etc.
- (Opcional) `people:write` si también planeas una dirección de Mailchimp → B1

Guarda y copia la cadena `cak_…` — solo se muestra una vez.

### 2. Construir el Zap

1. **Disparador:** `B1.church — Nueva persona`. En el primer uso Zapier te pide que *Inicies sesión en B1.church*; pega la clave de API.
2. **Acción:** `Mailchimp — Agregar/actualizar suscriptor`. Asigna la salida del disparador:
   - `data.contactInfo.email` → Dirección de correo
   - `data.name.first` → Nombre
   - `data.name.last` → Apellido
   - (Opcional) `data.id` → un campo de fusión de Mailchimp si deseas mantener la id de persona de B1 junto a.
3. Activa el Zap. Zapier registra un webhook `person.created` en B1 — verifica en **Configuración → Desarrollador → Webhooks** que aparece una fila llamada "Zapier — person.created".

Eso es todo. Agrega una persona en B1Admin para confirmar — el nuevo suscriptor aparece en Mailchimp dentro de segundos.

## Recetas Comunes

### Etiquetar donantes automáticamente

- **Disparador** — B1: Nueva donación
- **Acción** — B1: Buscar persona (búsqueda por `personId`) para obtener el correo
- **Acción** — Mailchimp: Agregar suscriptor a etiqueta (etiqueta `Dio-2026`)

### Soltar una serie de bienvenida específica del grupo

- **Disparador** — B1: Nuevo miembro de grupo, filtrado por `data.groupId`
- **Acción** — Mailchimp: Agregar suscriptor a etiqueta nombrada según el grupo; dispara tu automatización existente en esa etiqueta

### Bidireccional: nuevos registros de Mailchimp se convierten en contactos de B1

- **Disparador** — Mailchimp: Nuevo suscriptor
- **Acción** — B1: Crear persona (asigna Nombre/Apellido/Correo)

## Alternativa de Make

La [aplicación de Mailchimp](https://www.make.com/en/integrations/mailchimp) de Make cubre 44 módulos — el cableado es idéntico, con el disparador B1 *Ver eventos* reemplazando el de Zapier. Ve el [documento de descripción general de Make](../make) para el lado B1.

## Límites y Notas

- **El nivel gratuito de Mailchimp limita contactos y audiencias** — un Zap que inunda una audiencia gratuita pasada su límite comenzará a errar con `4xx Member limit reached`. Los registros de Mailchimp dejan esto obvio.
- **Mailchimp deduplica por correo**, así que volver a ejecutar un Zap en la misma persona de B1 los actualiza en su lugar; no crea duplicados.
- **Las bajas de Mailchimp no fluyen de vuelta a B1.** Si deseas que las bajas de Mailchimp limpien la preferencia de "Enviar correo" de B1, construye el Zap inverso explícitamente.

## Solución de Problemas

- **El Zap nunca se activa** — verifica `Configuración → Desarrollador → Webhooks` para la fila `Zapier — person.created`. Si ausente, la clave de API estaba falta `settings:write` cuando el Zap se activó. Recrea, reconecta, alterna el Zap apagado y encendido.
- **Advertencia `Member exists` en agregar/actualizar** — cambia la acción de *Agregar suscriptor* a *Agregar/actualizar suscriptor* (el verbo importa). La variante de upsert es idempotente.
- **Nombre/apellido viene en blanco** — `data.name.first` y `data.name.last` de B1 solo se rellenan si esos campos se establecen en la persona. Asigna `data.name.display` como alternativa.

## Ver También

- [Zapier (descripción general)](../zapier) — el lado B1 de cada receta de Zapier
- [Make (descripción general)](../make) — misma idea, constructor visual
- [Webhooks (referencia de desarrollador)](/docs/developer/api/webhooks#event-catalog)
