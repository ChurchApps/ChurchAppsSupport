---
title: "Revisión de Solicitudes de Eliminación de Cuenta"
---

# Revisión de Solicitudes de Eliminación de Cuenta

<div class="article-intro">

Cuando una iglesia tiene un Grupo de Aprobación de Directorio configurado, la eliminación de cuenta ya no sucede instantáneamente: la solicitud de un miembro se convierte en una tarea que tu grupo de aprobación revisa antes de que se elimine algo. Esta página explica cómo se realiza la solicitud, cómo aprobarla o rechazarla, y qué sucede en cada caso.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Un **Grupo de Aprobación de Directorio** debe estar configurado en **Móvil &rarr; Portal de Miembros**. Sin uno, hacer clic en **Eliminar mi cuenta** en la página de Perfil aún elimina la cuenta inmediatamente, sin paso de revisión. Consulta [Configuración de Aplicación Móvil](../settings/mobile-app.md).
- Aprobar o rechazar una solicitud requiere el permiso **Personas &gt; Editar**.

</div>

## Cómo un Miembro Solicita la Eliminación

La eliminación de cuenta se solicita desde la página de **Mi Perfil** -- la misma página de cuenta compartida cubierta en [Gestionar Tu Perfil](./managing-profile.md) -- bajo su sección **Eliminación de Cuenta**. Cuando un grupo de aprobación está configurado, confirmar la solicitud no elimina nada de inmediato. En su lugar:

1. Crea una tarea abierta titulada **"Solicitud de eliminación de cuenta"**, asignada al Grupo de Aprobación de Directorio, bajo **Sirviendo &rarr; Tareas**.
2. Desactiva el botón **Eliminar mi cuenta** para esa persona y muestra un aviso de que la solicitud está pendiente de revisión.

Enviar una segunda solicitud mientras una ya está abierta simplemente reabre la misma tarea -- una persona solo puede tener una solicitud de eliminación pendiente a la vez.

## Revisar una Solicitud

1. Ve a **Sirviendo &rarr; Tareas** (o **Asignado a Mis Grupos** en tu panel de control, el mismo lugar donde aparecen las [solicitudes de cambio de perfil](./approving-profile-changes.md)).
2. Abre la tarea titulada **"Solicitud de eliminación de cuenta de *Nombre*"**.
3. Verás dos acciones: **Aprobar eliminación** y **Rechazar**.

### Aprobando

Confirma **"¿Anonimizar permanentemente el registro de esta persona y eliminar su acceso? Esto no se puede deshacer."** Esto reemplaza la información personal de la persona con valores genéricos (la misma anonimización utilizada por la acción **Gestión de Datos &gt; Anonimizar** en el registro de una persona -- consulta [Seguridad de Datos](../settings/data-security.md)) y elimina su acceso. La tarea se cierra automáticamente y el miembro recibe una notificación de que su solicitud fue aprobada.

### Rechazando

Rechazar requiere una razón, porque GDPR solo permite rechazar una solicitud de eliminación por una excepción legal:

- **Retención Legal** (donaciones, impuestos o registros de empleo)
- **Necesario para una reclamación legal**
- **Otro** -- explica en el cuadro de texto (al menos 10 caracteres)

El miembro recibe una notificación de la decisión junto con la razón que diste, y puede reenviar su solicitud o escalar a una autoridad supervisora si no está de acuerdo.

:::info
Las iglesias tienen 30 días para responder a una solicitud de eliminación. La tarea vence en 28 días y el grupo de aprobación recibe recordatorios automáticos si todavía está abierta después de 21 y 27 días.
:::

:::tip
Las solicitudes de eliminación y cambio de perfil utilizan el mismo Grupo de Aprobación de Directorio y el mismo flujo de revisión basado en Tareas -- consulta [Aprobando Cambios de Perfil](./approving-profile-changes.md) si también necesitas revisar solicitudes de actualización de directorio.
:::

## Artículos Relacionados

- [Gestionar Tu Perfil](./managing-profile.md) -- Donde los miembros solicitan la eliminación de su propia cuenta
- [Aprobando Cambios de Perfil](./approving-profile-changes.md) -- El flujo de revisión similar para solicitudes de actualización de directorio
- [Seguridad de Datos](../settings/data-security.md) -- Cumplimiento de GDPR y anonimización iniciada por administrador
- [Configuración de Aplicación Móvil](../settings/mobile-app.md) -- Configurar el Grupo de Aprobación de Directorio
