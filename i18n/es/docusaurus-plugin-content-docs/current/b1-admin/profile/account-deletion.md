---
title: "Revisión de Solicitudes de Eliminación de Cuenta"
---

# Revisión de Solicitudes de Eliminación de Cuenta

<div class="article-intro">

Cuando una iglesia tiene un Grupo de Aprobación de Directorios configurado, la eliminación de cuenta ya no ocurre instantáneamente — la solicitud de un miembro se convierte en una tarea que su grupo de aprobación revisa antes de que se elimine algo. Esta página explica cómo se realiza la solicitud, cómo aprobarla o rechazarla, y qué sucede en cada caso.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Un **Grupo de Aprobación de Directorios** debe estar configurado en **Móvil &rarr; Portal de miembros**. Sin uno, hacer clic en **Eliminar mi cuenta** en la página de Perfil aún eliminará la cuenta inmediatamente, sin paso de revisión. Consulte [Configuración de la Aplicación Móvil](../settings/mobile-app.md).
- Aprobar o rechazar una solicitud requiere el permiso **Personas &gt; Editar**.

</div>

## Cómo un Miembro Solicita la Eliminación

La eliminación de cuenta se solicita desde la página **Mi Perfil** — la misma página de cuenta compartida cubierta en [Administración de su Perfil](./managing-profile.md) — en su sección **Eliminación de Cuenta**. Cuando se configura un grupo de aprobación, confirmar la solicitud no elimina nada de inmediato. En su lugar:

1. Crea una tarea abierta titulada **"Solicitud de eliminación de cuenta"**, asignada al Grupo de Aprobación de Directorios, en **Servicio &rarr; Mi Trabajo**.
2. Deshabilita el botón **Eliminar mi cuenta** para esa persona y muestra un aviso de que la solicitud está esperando revisión.

Enviar una segunda solicitud mientras una ya está abierta solo reabre la misma tarea — una persona solo puede tener una solicitud de eliminación pendiente a la vez.

## Revisión de una Solicitud

1. Vaya a **Servicio &rarr; Mi Trabajo** (o **Asignado a Mis Grupos** en su panel, el mismo lugar donde aparecen [solicitudes de cambios de perfil](./approving-profile-changes.md)).
2. Abra la tarea titulada **"Solicitud de eliminación de cuenta de *Nombre*"**.
3. Verá dos acciones: **Aprobar eliminación** y **Rechazar**.

### Aprobación

Confirme **"¿Anonimizar permanentemente el registro de esta persona y eliminar su acceso? Esto no se puede deshacer."** Esto reemplaza la información personal de la persona con valores genéricos (la misma anonimización utilizada por la acción **Gestión de Datos &gt; Anonimizar** en el registro de una persona — consulte [Seguridad de Datos](../settings/data-security.md)) y elimina su acceso. La tarea se cierra automáticamente, y el miembro es notificado de que su solicitud fue aprobada.

### Rechazo

Rechazar requiere una razón, porque GDPR solo permite rechazar una solicitud de borrado por una excepción legal:

- **Retención legal** (donaciones, impuestos o registros de empleo)
- **Necesario para un reclamo legal**
- **Otro** — explique en el cuadro de texto (al menos 10 caracteres)

El miembro es notificado de la decisión junto con la razón que proporcionó, y puede reintentar su solicitud o escalar a una autoridad supervisora si no está de acuerdo.

:::info
Las iglesias tienen 30 días para responder a una solicitud de eliminación. La tarea vence en 28 días, y el grupo de aprobación recibe recordatorios automáticos si aún está abierta después de 21 y 27 días.
:::

:::tip
Las solicitudes de eliminación y cambio de perfil utilizan el mismo Grupo de Aprobación de Directorios y el mismo flujo de revisión basado en Tareas — consulte [Aprobación de Cambios de Perfil](./approving-profile-changes.md) si también necesita revisar solicitudes de actualización de directorios.
:::

## Artículos Relacionados

- [Administración de su Perfil](./managing-profile.md) — Donde los miembros solicitan la eliminación de su propia cuenta
- [Aprobación de Cambios de Perfil](./approving-profile-changes.md) — El flujo de revisión similar para solicitudes de actualización de directorios
- [Seguridad de Datos](../settings/data-security.md) — Cumplimiento de GDPR y anonimización iniciada por administrador
- [Configuración de la Aplicación Móvil](../settings/mobile-app.md) — Configuración del Grupo de Aprobación de Directorios
