---
title: "Registro de auditoría"
---

# Registro de auditoría

<div class="article-intro">

El registro de auditoría rastrea todas las acciones y cambios significativos en tu sistema de gestión de iglesia. Úsalo para revisar actividad de inicio de sesión, rastrear quién realizó cambios en registros de personas, monitorear actualizaciones de permisos y mantener responsabilidad en tu equipo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador del servidor
- Navega a **Configuración** para encontrar el Registro de auditoría

</div>

## Ver el registro de auditoría

1. Ve a **Configuración** en B1 Admin.
2. Selecciona **Registro de auditoría**.
3. El registro muestra entradas recientes en una tabla con las siguientes columnas:
   - **Fecha** -- Cuándo ocurrió la acción.
   - **Categoría** -- El tipo de acción (codificado por color para escaneo rápido).
   - **Acción** -- Qué se hizo (p. ej., create, update, delete, login_success).
   - **Entidad** -- El tipo e ID del registro que fue afectado.
   - **Dirección IP** -- La dirección IP del usuario que realizó la acción.
   - **Detalles** -- Un resumen de los cambios específicos realizados.

## Filtrar el registro

Usa los filtros en la parte superior de la página para reducir los resultados:

- **Categoría** -- Filtra por tipo de acción:
  - **Todas las categorías** -- Muestra todo.
  - **Inicio de sesión** -- Inicios de sesión exitosos y fallidos.
  - **Personas** -- Creación, actualización o eliminación de registros de persona.
  - **Permisos** -- Otorgamiento y revocación de permisos.
  - **Donaciones** -- Cambios en registros de donación.
  - **Grupos** -- Acciones de gestión de grupo.
  - **Formularios** -- Actividad de envío de formulario.
  - **Configuración** -- Cambios de configuración.
- **Fecha de inicio** -- Muestra entradas desde esta fecha en adelante.
- **Fecha de fin** -- Muestra entradas hasta esta fecha.

Haz clic en **Buscar** después de establecer tus filtros para actualizar los resultados.

## Entendiendo categorías

Cada categoría está codificada por color para identificación rápida:

- **Inicio de sesión** -- Chip azul. Rastrea intentos de inicio de sesión exitosos y fallidos.
- **Personas** -- Chip púrpura. Rastrea creaciones, actualizaciones y eliminaciones de registros de persona.
- **Permisos** -- Chip rojo. Rastrea cuándo se otorgan o revocan derechos de acceso.
- **Donaciones** -- Chip verde. Rastrea cambios en registros de donación.
- **Grupos** -- Chip gris. Rastrea operaciones de gestión de grupo.
- **Formularios** -- Chip naranja. Rastrea actividad de envío de formulario.
- **Configuración** -- Chip amarillo. Rastrea cambios de configuración.

## Exportar el registro

Cuando se muestran entradas de registro, aparece un botón de **descarga CSV**. Haz clic para exportar los resultados filtrados actuales a una hoja de cálculo para revisión fuera de línea o mantenimiento de registros.

## Paginación

Usa los controles de paginación en la parte inferior de la tabla para navegar a través de los resultados. Puedes mostrar 25, 50 o 100 entradas por página.

:::info
Las entradas del registro de auditoría se conservan automáticamente durante un año. Las entradas más antiguas que 365 días se eliminan para mantener el sistema con buen rendimiento.
:::

:::tip
Revisa el registro de auditoría regularmente, especialmente después de incorporar nuevos miembros del equipo o hacer cambios de configuración significativos. Ayuda a identificar actividad inesperada temprano.
:::

## Artículos relacionados

- [Roles y permisos](../settings/roles-permissions) -- Gestiona quién tiene acceso a qué
- [Seguridad de datos](../settings/data-security) -- Entiende cómo se protegen tus datos
- [Descripción general de reportes](./index.md) -- Ve todos los reportes disponibles
