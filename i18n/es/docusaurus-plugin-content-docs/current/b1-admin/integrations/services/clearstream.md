---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Dispara un mensaje de texto [Clearstream](https://clearstream.io) desde cualquier evento de B1 — persona nueva, regalo nuevo, envío de formulario, actualización de calendario — e importa respuestas de vuelta como registros de B1. La aplicación Zapier de Clearstream expone ambas direcciones, así que el cableado completo es una receta y no código personalizado.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Clearstream](https://clearstream.io) con al menos una lista y una asignación de SMS
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con permiso **Editar Configuración**

</div>

## Qué Puedes Conectar

| Dirección | Disparador | Acción |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Crear/actualizar suscriptor + Enviar texto a número |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Enviar texto a lista (p. ej. notificar al equipo de finanzas) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Enviar texto a una lista de enrutamiento (p. ej. equipo de solicitudes de oración) |
| Clearstream → B1 | Nuevo texto entrante | B1: Crear persona; etiquetar con la palabra clave que textearon |

Las acciones de Zapier de Clearstream: *Enviar texto a número*, *Enviar texto a lista*, *Crear/actualizar suscriptor*, *Agregar suscriptor a flujo de trabajo automatizado*, *Agregar etiqueta a suscriptor*, *Eliminar suscriptor de lista*.

## Configuración

### 1. Crear una clave de API B1

**Configuración → Desarrollador → Claves de API → Nueva Clave de API**:

- `settings:write` — requerido para que B1 registre el webhook de disparador
- `people:read` — necesario para buscar a la persona del evento (`personId` → nombre/teléfono/correo)
- (Opcional) `people:write` si las respuestas de Clearstream deben crear contactos de B1

### 2. Construir el Zap "textear en nuevo regalo"

1. **Disparador** — B1.church: Nueva donación
2. **Acción** — B1.church: Buscar persona (el `personId` de la donación)
3. **Acción** — Clearstream: Enviar texto a número. Usa el teléfono de la persona del paso 2 como destinatario, redacta el mensaje (`"¡Gracias por tu regalo, {first}! …"`).

Activa el Zap. B1 registra el webhook de donación al activar; verás `Zapier — donation.created` aparecer en **Configuración → Desarrollador → Webhooks**.

### 3. (Opcional) Importar respuestas de vuelta como registros de B1

1. **Disparador** — Clearstream: Nuevo texto entrante
2. **Acción** — Filtro por Zapier en la palabra clave — p. ej. continuar solo si el cuerpo del texto comienza con `PRAY`
3. **Acción** — B1.church: Buscar persona (por teléfono)
4. **Acción** — Filtro / ruta — si no se encuentra, crear; de cualquier forma, archivar el cuerpo del texto en algún lugar (Slack, hoja de Google, o un envío de formulario de B1 a través de webhooks por Zapier).

## Recetas Comunes

### Paginación de equipo de voluntarios

- **Disparador** — B1.church: Nuevo envío de formulario (filtrado en el id del formulario de solicitud de oración)
- **Acción** — Clearstream: Enviar texto a lista, donde la lista es tu equipo pastoral de guardia. Redacta el cuerpo como `Nueva solicitud de oración: {data.questions.0.answer}`.

### Secuencia de seguimiento de visitante por primera vez

- **Disparador** — B1.church: Nueva persona, filtrada en una etiqueta de persona de B1 "Visitante por primera vez"
- **Acción** — Clearstream: Agregar suscriptor a flujo de trabajo automatizado. Asigna la id de flujo de trabajo a un goteo de texto preestablecido de 7 días.

### Unirse a grupo impulsado por palabra clave

- **Disparador** — Clearstream: Nuevo texto entrante (filtro a palabra clave `MENS`)
- **Acción** — B1.church: Buscar persona (por teléfono); bifurcar en no encontrado → Crear persona
- **Acción** — B1.church: Agregar miembro de grupo al grupo de ministerio de hombres

## Límites y Notas

- **Clearstream mide SMS por mensaje.** Cada acción de envío de texto consume uno o más créditos dependiendo de la longitud y número de destinatarios — verifica la asignación de tu plan.
- **El teléfono debe estar en formato E.164** (p. ej. `+15555550199`) para *Enviar texto a número*. El registro de persona de B1 almacena lo que se ingresó; usa un paso *Formateador por Zapier — Números → Formatear número de teléfono* si no puedes garantizar el formato.
- **No se requiere encabezado del lado de B1** — la autenticación de Clearstream vive completamente dentro de su conexión de Zapier.

## Solución de Problemas

- **El disparador nunca se activa** — `Configuración → Desarrollador → Webhooks` debería mostrar una fila `Zapier — <event>` después de activar el Zap. Si no, la clave de API B1 carece de `settings:write`. Recrea y reconecta.
- **Clearstream devuelve "Número de teléfono inválido"** — el campo de destinatario no está en E.164. Agrega un paso de formato de número de teléfono.
- **Enviar texto a lista falla con `403`** — el usuario de API de Clearstream carece de permiso para esa lista, o la id de lista es incorrecta. Las ids de lista son visibles en la página de detalle de lista de Clearstream.

## Ver También

- [Text In Church](./text-in-church) — plataforma SMS alternativa, forma de cableado similar
- [Mobile Message](./mobile-message) — para iglesias fuera de EE. UU.
- [Zapier (descripción general)](../zapier) — lado B1 de cada receta de Zapier
- [Documentos de API de Clearstream](https://api-docs.clearstream.io/) — para integraciones personalizadas más allá de la aplicación de Zapier
