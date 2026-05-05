---
title: "Registro de auditoría"
---

# Registro de auditoría

<div class="article-intro">

El registro de auditoría rastrea todas las acciones y cambios significativos en todo tu sistema de gestión de iglesia. Úsalo para revisar la actividad de inicio de sesión, rastrear quién hizo cambios en los registros de personas, monitorear actualizaciones de permisos y mantener la responsabilidad en todo tu equipo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador del servidor
- Navega a **Configuración** para encontrar el Registro de auditoría

</div>

## Visualización del registro de auditoría

1. Ve a **Configuración** en B1 Admin.
2. Selecciona **Registro de auditoría**.
3. El registro muestra entradas recientes en una tabla con las siguientes columnas:
   - **Fecha** -- Cuándo ocurrió la acción.
   - **Categoría** -- El tipo de acción (con código de color para escaneo rápido).
   - **Acción** -- Qué se hizo (por ejemplo, crear, actualizar, eliminar, login_success).
   - **Entidad** -- El tipo e ID del registro que fue afectado.
   - **Dirección IP** -- La dirección IP del usuario que realizó la acción.
   - **Detalles** -- Un resumen de los cambios específicos realizados.

## Filtrado del registro

Usa los filtros en la parte superior de la página para reducir los resultados:

- **Categoría** -- Filtrar por tipo de acción:
  - **Todas las categorías** -- Mostrar todo.
  - **Inicio de sesión** -- Éxitos y fallos de inicio de sesión.
  - **Personas** -- Creación, actualización o eliminación de registros de personas.
  - **Permisos** -- Otorgamiento y revocación de permisos.
  - **Donaciones** -- Cambios en registros de donaciones.
  - **Grupos** -- Acciones de gestión de grupos.
  - **Formularios** -- Actividad de envío de formularios.
  - **Configuración** -- Cambios de configuración.
- **Fecha de inicio** -- Mostrar entradas desde esta fecha en adelante.
- **Fecha de fin** -- Mostrar entradas hasta esta fecha.

Haz clic en **Buscar** después de establecer tus filtros para actualizar los resultados.

## Comprensión de categorías

Cada categoría tiene código de color para identificación rápida:

- **Inicio de sesión** -- Chip azul. Rastrea intentos de inicio de sesión exitosos y fallidos.
- **Personas** -- Chip morado. Rastrea creaciones, actualizaciones y eliminaciones de registros de personas.
- **Permisos** -- Chip rojo. Rastrea cuándo se otorgan o revocan derechos de acceso.
- **Donaciones** -- Chip verde. Rastrea cambios en registros de donaciones.
- **Grupos** -- Chip gris. Rastrea operaciones de gestión de grupos.
- **Formularios** -- Chip naranja. Rastrea actividad de envío de formularios.
- **Configuración** -- Chip amarillo. Rastrea cambios de configuración.

## Exportación del registro

Cuando se muestran entradas del registro, aparece un botón de **descarga CSV**. Haz clic en él para exportar los resultados filtrados actuales a una hoja de cálculo para revisión fuera de línea o mantenimiento de registros.

## Paginación

Usa los controles de paginación en la parte inferior de la tabla para navegar por los resultados. Puedes mostrar 25, 50 o 100 entradas por página.

:::info
Las entradas del registro de auditoría se retienen automáticamente por un año. Las entradas de más de 365 días se eliminan para mantener el sistema funcionando bien.
:::

:::tip
Revisa el registro de auditoría regularmente, especialmente después de incorporar nuevos miembros del equipo o hacer cambios significativos de configuración. Ayuda a identificar actividad inesperada tempranamente.
:::

## Artículos relacionados

- [Roles y permisos](../settings/roles-permissions) -- Gestiona quién tiene acceso a qué
- [Seguridad de datos](../settings/data-security) -- Entiende cómo se protegen tus datos
- [Resumen de reportes](./index.md) -- Ver todos los reportes disponibles
