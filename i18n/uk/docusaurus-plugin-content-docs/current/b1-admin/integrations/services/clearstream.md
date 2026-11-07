---
title: "Clearstream"
---

# Clearstream

<div class="article-intro">

Activa un mensaje de texto de [Clearstream](https://clearstream.io) desde cualquier evento de B1 — nueva persona, nuevo regalo, envío de formulario, actualización del calendario — y recupera las respuestas como registros de B1. La aplicación de Zapier de Clearstream admite ambas direcciones, así que toda la configuración es una receta y no código personalizado.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de [Clearstream](https://clearstream.io) con al menos una lista y una cuota de SMS
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Editar configuración**

</div>

## Lo que puedes configurar

| Dirección | Disparador | Acción |
|---|---|---|
| B1 → Clearstream | B1 `person.created` | Clearstream: Crear/Actualizar suscriptor + Enviar texto a número |
| B1 → Clearstream | B1 `donation.created` | Clearstream: Enviar texto a lista (p. ej., notificar al equipo de finanzas) |
| B1 → Clearstream | B1 `form.submission.created` | Clearstream: Enviar texto a una lista de enrutamiento (p. ej., equipo de peticiones de oración) |
| Clearstream → B1 | Nuevo texto entrante | B1: Crear persona; etiquetar con la palabra clave que enviaron por texto |

Las acciones de Clearstream en Zapier: *Enviar texto a número*, *Enviar texto a lista*, *Crear/Actualizar suscriptor*, *Agregar suscriptor a flujo de trabajo automatizado*, *Agregar etiqueta a suscriptor*, *Quitar suscriptor de lista*.

## Configuración

### 1. Crear una clave de API de B1

**Configuración → Desarrollador → Claves de API → Nueva clave de API**:

- `settings:write` — necesario para que B1 registre el webhook del disparador
- `people:read` — necesario para buscar a la persona del evento (`personId` → nombre/teléfono/correo)
- (Opcional) `people:write` si las respuestas de Clearstream deben crear contactos en B1

### 2. Crear el Zap de "enviar texto por nuevo regalo"

1. **Disparador** — B1.church: Nueva donación
2. **Acción** — B1.church: Buscar persona (el `personId` de la donación)
3. **Acción** — Clearstream: Enviar texto a número. Usa el teléfono de la persona del paso 2 como destinatario y redacta el mensaje (`"¡Gracias por tu regalo, {first}! …"`).

Activa el Zap. B1 registra el webhook de donaciones al activarse; verás `Zapier — donation.created` aparecer en **Configuración → Desarrollador → Webhooks**.

### 3. (Opcional) Recuperar las respuestas como registros de B1

1. **Disparador** — Clearstream: Nuevo texto entrante
2. **Acción** — Filtrar por Zapier con la palabra clave — p. ej., continuar solo si el cuerpo del texto empieza con `PRAY`
3. **Acción** — B1.church: Buscar persona (por teléfono)
4. **Acción** — Filtro / Ruta — si no se encuentra, crearla; en cualquier caso, guardar el cuerpo del texto en algún lugar (Slack, una hoja de Google o un envío de formulario de B1 mediante Webhooks by Zapier).

## Recetas comunes

### Aviso al equipo de voluntarios

- **Disparador** — B1.church: Nuevo envío de formulario (filtrado por el id del formulario de peticiones de oración)
- **Acción** — Clearstream: Enviar texto a lista, donde la lista es tu equipo pastoral de guardia. Redacta el cuerpo como `Nueva petición de oración: {data.questions.0.answer}`.

### Secuencia de seguimiento para visitantes primerizos

- **Disparador** — B1.church: Nueva persona, filtrada por una etiqueta de persona de B1 "Visitante primerizo"
- **Acción** — Clearstream: Agregar suscriptor a flujo de trabajo automatizado. Asigna el id del flujo de trabajo a una serie de textos de 7 días preconfigurada.

### Unión a un grupo por palabra clave

- **Disparador** — Clearstream: Nuevo texto entrante (filtrado por la palabra clave `MENS`)
- **Acción** — B1.church: Buscar persona (por teléfono); bifurcación si no se encuentra → Crear persona
- **Acción** — B1.church: Agregar miembro del grupo al grupo del Ministerio de Hombres

## Límites y notas

- **Clearstream mide los SMS por mensaje.** Cada acción de Enviar texto consume uno o más créditos según la longitud y la cantidad de destinatarios; revisa la cuota de tu plan.
- **El teléfono debe estar en formato E.164** (p. ej., `+15555550199`) para *Enviar texto a número*. El registro de persona de B1 guarda lo que se haya introducido; usa un paso *Formatter by Zapier — Numbers → Format Phone Number* si no puedes garantizar el formato.
- **B1 no requiere ningún encabezado** — la autenticación de Clearstream se gestiona completamente dentro de su conexión de Zapier.

## Solución de problemas

- **El disparador nunca se activa** — `Configuración → Desarrollador → Webhooks` debería mostrar una fila `Zapier — <evento>` después de activar el Zap. Si no aparece, a la clave de API de B1 le falta `settings:write`. Genera una nueva y vuelve a conectar.
- **Clearstream devuelve "Invalid phone number"** — el campo de destinatario no está en E.164. Agrega un paso Format Phone Number.
- **Enviar texto a lista falla con `403`** — el usuario de la API de Clearstream no tiene permiso para esa lista, o el id de la lista es incorrecto. Los ids de las listas aparecen en la página de detalle de la lista en Clearstream.

## Ver también

- [Text In Church](./text-in-church) — plataforma de SMS alternativa, con una estructura de configuración similar
- [Mobile Message](./mobile-message) — para iglesias fuera de EE. UU.
- [Zapier (descripción general)](../zapier) — lado de B1 de cada receta de Zapier
- [Documentación de la API de Clearstream](https://api-docs.clearstream.io/) — para integraciones personalizadas más allá de la aplicación de Zapier
