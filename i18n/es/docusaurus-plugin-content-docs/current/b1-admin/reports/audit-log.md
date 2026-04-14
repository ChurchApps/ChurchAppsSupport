---
title: "Registro de Auditoría"
---

# Registro de Auditoría

<div class="article-intro">

El registro de auditoría rastrea todas las acciones y cambios significativos en su sistema de gestión de iglesia. Úselo para revisar actividad de inicio de sesión, rastrear quién hizo cambios en registros de personas, monitorear actualizaciones de permisos y mantener responsabilidad en su equipo.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Cuenta B1 Admin con acceso de administrador del servidor
- Navegue a **Settings** (Configuración) para encontrar el Registro de Auditoría

</div>

## Visualización del Registro de Auditoría

1. Vaya a **Settings** (Configuración) en B1 Admin.
2. Seleccione **Audit Log** (Registro de Auditoría).
3. El registro muestra entradas recientes en una tabla con las siguientes columnas:
   - **Date** (Fecha) -- Cuándo ocurrió la acción.
   - **Category** (Categoría) -- El tipo de acción (codificado por color para escaneo rápido).
   - **Action** (Acción) -- Qué se hizo (ej. crear, actualizar, eliminar, login_success).
   - **Entity** (Entidad) -- El tipo e ID del registro que fue afectado.
   - **IP Address** (Dirección IP) -- La dirección IP del usuario que realizó la acción.
   - **Details** (Detalles) -- Un resumen de los cambios específicos realizados.

## Filtrado del Registro

Use los filtros en la parte superior de la página para estrechar los resultados:

- **Category** (Categoría) -- Filtrar por tipo de acción:
  - **All Categories** (Todas las Categorías) -- Mostrar todo.
  - **Login** (Inicio de Sesión) -- Éxitos y fallos de inicio de sesión.
  - **People** (Personas) -- Creación, actualización o eliminación de registros de personas.
  - **Permissions** (Permisos) -- Otorgamiento y revocación de permisos.
  - **Donations** (Donaciones) -- Cambios en registros de donaciones.
  - **Groups** (Grupos) -- Acciones de administración de grupos.
  - **Forms** (Formularios) -- Actividad de envío de formularios.
  - **Settings** (Configuración) -- Cambios de configuración.
- **Start Date** (Fecha de Inicio) -- Mostrar entradas desde esta fecha en adelante.
- **End Date** (Fecha de Fin) -- Mostrar entradas hasta esta fecha.

Haga clic en **Search** (Buscar) después de establecer sus filtros para actualizar los resultados.

## Comprensión de Categorías

Cada categoría está codificada por color para identificación rápida:

- **Login** (Inicio de Sesión) -- Chip azul. Rastrea intentos de inicio de sesión exitosos y fallidos.
- **People** (Personas) -- Chip púrpura. Rastrea creación, actualización y eliminación de registros de personas.
- **Permissions** (Permisos) -- Chip rojo. Rastrea cuándo se otorgan o revocan derechos de acceso.
- **Donations** (Donaciones) -- Chip verde. Rastrea cambios en registros de donaciones.
- **Groups** (Grupos) -- Chip gris. Rastrea operaciones de administración de grupos.
- **Forms** (Formularios) -- Chip naranja. Rastrea actividad de envío de formularios.
- **Settings** (Configuración) -- Chip amarillo. Rastrea cambios de configuración.

## Exportación del Registro

Cuando se muestran entradas del registro, aparece un botón **CSV download** (Descargar CSV). Haga clic en él para exportar los resultados filtrados actuales a una hoja de cálculo para revisión sin conexión o mantenimiento de registros.

## Paginación

Use los controles de paginación en la parte inferior de la tabla para navegar por los resultados. Puede mostrar 25, 50 o 100 entradas por página.

:::info
Las entradas del registro de auditoría se retienen automáticamente durante un año. Las entradas más antiguas que 365 días se eliminan para mantener el sistema funcionando correctamente.
:::

:::tip
Revise el registro de auditoría regularmente, especialmente después de incorporar nuevos miembros del equipo o hacer cambios de configuración significativos. Ayuda a identificar actividad inesperada temprano.
:::

## Artículos Relacionados

- [Roles & Permissions](../settings/roles-permissions) -- Administrar quién tiene acceso a qué
- [Data Security](../settings/data-security) -- Entender cómo están protegidos sus datos
- [Reports Overview](./index) -- Ver todos los reportes disponibles
