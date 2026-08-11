---
title: "Sedes"
---

# Sedes

<div class="article-intro">

Si tu iglesia se reúne en más de una ubicación, **Sedes** te permiten rastrear a qué sitio pertenece cada persona y grupo. Una vez configuradas, las sedes aparecen como una opción en perfiles de personas, en configuración de asistencia y en el panel de Demografía. Las iglesias de múltiples sitios pueden filtrar, buscar e informar por sede en todo B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas el permiso **Editar Configuración de Iglesia** para administrar sedes. Ver [Roles y Permisos](./roles-permissions.md).

</div>

## Abrir Configuración de Sede

En B1 Admin, abre el **menú de sección** en la esquina superior izquierda (el nombre de la sección con la flecha pequeña), elige **Configuración** y selecciona **Sedes** de la navegación de Configuración. Verás una lista de todas las sedes configuradas con su nombre, ubicación y zona horaria.

## Agregar una Sede

1. Haz clic en **Agregar Sede** (o el botón **+** si aún no existen sedes).
2. Completa los detalles de la sede:
   - **Nombre** *(obligatorio)* — el nombre de visualización mostrado en todo B1 Admin (por ejemplo, "Sede Principal" o "Sede Norte").
   - **Dirección** — la dirección de calle de la sede (usada para visualización informativa; no es lo mismo que tu dirección principal de iglesia en Configuración de Iglesia).
   - **Ciudad / Estado / Código Postal** — la ubicación de la sede.
   - **Zona Horaria** — la zona horaria IANA para esta sede (por ejemplo, *America/Chicago*). Útil cuando las sedes están en diferentes zonas horarias.
   - **Sitio Web** — una URL opcional para la presencia web propia de esta sede.
3. Haz clic en **Guardar**.

## Editar una Sede

Haz clic en cualquier fila de sede en la lista para abrir su editor en el panel a la derecha. Actualiza los campos y haz clic en **Guardar**.

## Eliminar una Sede

Abre una sede para edición y haz clic en **Eliminar**. Se te pedirá que confirmes. Eliminar una sede no elimina las personas asignadas a la misma — su campo de sede simplemente se vuelve en blanco.

## Asignar Personas a una Sede

Después de crear sedes, el personal puede asignar una persona a una sede desde su perfil:

1. Abre un registro de persona en **Personas**.
2. Haz clic en **Editar**.
3. Elige la sede desde el menú desplegable **Sede**.
4. Haz clic en **Guardar**.

También puedes actualizar la sede en bloque desde la página de Personas. Selecciona múltiples personas, usa **Edición Masiva** y establece el campo Sede para todos a la vez.

## Filtrar por Sede

Una vez que las sedes están configuradas, puedes filtrar en B1 Admin por sede:

- **Búsqueda de personas** — agrega una condición de Sede en la búsqueda avanzada, o carga una [Lista Guardada](../people/lists.md) delimitada a una sede.
- **Demografía** — el panel de [Demografía](../people/demographics.md) muestra un gráfico de Sede cuando al menos una persona tiene una sede asignada.
- **Configuración de Asistencia** — cada tiempo de servicio en Asistencia puede estar vinculado a una sede.

:::tip
Las iglesias de ubicación única no necesitan configurar sedes. Todas las características de sede son opcionales — si no existen sedes, los campos y gráficos de sede simplemente no aparecen.
:::

## Artículos Relacionados

- [Configuración de Iglesia](./church-settings.md) — tu dirección principal de iglesia y marca (separado de las direcciones de sede)
- [Demografía](../people/demographics.md) — el gráfico de desglose de Sede
- [Configuración de Asistencia](../attendance/setup.md) — vincula tiempos de servicio a una sede
- [Edición Masiva](../people/bulk-editing.md) — asigna sede a muchas personas a la vez
