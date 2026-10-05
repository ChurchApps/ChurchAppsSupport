---
title: "Registro de Auditoría"
---

# Registro de Auditoría

<div class="article-intro">

El registro de auditoría rastrea todas las acciones y cambios significativos en tu sistema de gestión de iglesia. Úsalo para revisar la actividad de inicio de sesión, rastrear quién realizó cambios en registros de personas, monitorear actualizaciones de permisos y mantener responsabilidad en tu equipo.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Cuenta B1 Admin con acceso de administrador del servidor
- Navega a **Settings** para encontrar el Audit Log

</div>

## Visualización del Registro de Auditoría

1. Abre el [Menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin) y expande **Settings**.
2. Haz clic en **Audit Log**.
3. El registro muestra entradas recientes en una tabla con las siguientes columnas:
   - **Date** -- Cuándo ocurrió la acción.
   - **Category** -- El tipo de acción (código de colores para escaneo rápido).
   - **Action** -- Qué se hizo (por ejemplo, create, update, delete, login_success).
   - **Entity** -- El tipo e ID del registro que se vio afectado.
   - **IP Address** -- La dirección IP del usuario que realizó la acción.
   - **Details** -- Un resumen de los cambios específicos realizados.

## Filtrado del Registro

Usa los filtros en la parte superior de la página para reducir los resultados:

- **Category** -- Filtrar por tipo de acción:
  - **All Categories** -- Mostrar todo.
  - **Login** -- Inicios de sesión exitosos y fallidos.
  - **People** -- Creación, actualización o eliminación de registros de personas.
  - **Permissions** -- Otorgamiento y revocación de permisos.
  - **Donations** -- Cambios de registros de donaciones.
  - **Groups** -- Acciones de gestión de grupos.
  - **Forms** -- Actividad de envío de formularios.
  - **Settings** -- Cambios de configuración.
- **Start Date** -- Mostrar entradas a partir de esta fecha en adelante.
- **End Date** -- Mostrar entradas hasta esta fecha.

Haz clic en **Search** después de establecer tus filtros para actualizar los resultados.

## Comprensión de Categorías

Cada categoría tiene un código de color para identificación rápida:

- **Login** -- Chip azul. Rastrea intentos de inicio de sesión exitosos y fallidos.
- **People** -- Chip púrpura. Rastrea creaciones, actualizaciones y eliminaciones de registros de personas.
- **Permissions** -- Chip rojo. Rastrea cuándo se otorgan o revocan derechos de acceso.
- **Donations** -- Chip verde. Rastrea cambios de registros de donaciones.
- **Groups** -- Chip gris. Rastrea operaciones de gestión de grupos.
- **Forms** -- Chip naranja. Rastrea actividad de envío de formularios.
- **Settings** -- Chip amarillo. Rastrea cambios de configuración.

## Exportación del Registro

Cuando se muestran entradas de registro, aparece un botón **CSV download**. Haz clic en él para exportar los resultados filtrados actuales a una hoja de cálculo para revisión offline o mantenimiento de registros.

## Paginación

Usa los controles de paginación en la parte inferior de la tabla para navegar por los resultados. Puedes mostrar 25, 50 o 100 entradas por página.

:::info
Las entradas del registro de auditoría se retienen automáticamente durante un año. Las entradas más antiguas que 365 días se eliminan para mantener el sistema funcionando de manera eficiente.
:::

:::tip
Revisa el registro de auditoría regularmente, especialmente después de incorporar nuevos miembros del equipo o realizar cambios de configuración significativos. Ayuda a identificar actividad inesperada temprano.
:::

## Artículos Relacionados

- [Roles y Permisos](../settings/roles-permissions) -- Gestiona quién tiene acceso a qué
- [Data Security](../settings/data-security) -- Comprende cómo se protegen tus datos
- [Reports Overview](./index.md) -- Ver todos los informes disponibles
