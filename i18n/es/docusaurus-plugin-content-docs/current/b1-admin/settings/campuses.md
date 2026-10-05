---
title: "Sedes"
---

# Sedes

<div class="article-intro">

Si tu iglesia se reúne en más de una ubicación, **Sedes** te permite rastrear qué sitio pertenece cada persona y grupo. Una vez configuradas, las sedes aparecen como una opción en los perfiles de personas, en la configuración de asistencia y en el panel de Demografía. Las iglesias multisitio pueden filtrar, buscar e informar por sede en todo B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso **Editar configuración de iglesia** para administrar sedes. Ver [Roles y permisos](./roles-permissions.md).

</div>

## Abrir configuración de sedes

En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elige **Configuración > Configuración**, y selecciona la tarjeta **Sedes**. También puedes ir directamente a **/settings/campuses**. Verás una lista de todas las sedes configuradas con su nombre, ubicación y zona horaria.

## Agregar una sede

1. Haz clic en **Agregar sede** (o el botón **+** si aún no existen sedes).
2. Completa los detalles de la sede:
   - **Nombre** *(requerido)* — el nombre de visualización que se muestra en todo B1 Admin (por ejemplo, "Sede principal" o "Sede norte").
   - **Dirección** — la dirección de la calle de la sede (utilizada para visualización informativa; no es lo mismo que tu dirección de iglesia principal en Configuración de iglesia).
   - **Ciudad / Estado / Código postal** — la ubicación de la sede.
   - **Zona horaria** — la zona horaria IANA para esta sede (por ejemplo, *America/Chicago*). Útil cuando las sedes están en diferentes zonas horarias.
   - **Sitio web** — una URL opcional para la presencia web propia de esta sede.
3. Haz clic en **Guardar**.

## Editar una sede

Haz clic en cualquier fila de sede en la lista para abrir su editor en el panel a la derecha. Actualiza los campos y haz clic en **Guardar**.

## Eliminar una sede

Abre una sede para editar y haz clic en **Eliminar**. Se te pedirá que confirmes. Eliminar una sede no elimina a las personas asignadas a ella: su campo de sede simplemente se queda en blanco.

## Asignar personas a una sede

Después de crear sedes, el personal puede asignar a una persona a una sede desde su perfil:

1. Abre el registro de una persona en **Personas**.
2. Haz clic en **Editar**.
3. Elige la sede del menú desplegable **Sede**.
4. Haz clic en **Guardar**.

También puedes actualizar la sede en lote desde la página Personas. Selecciona múltiples personas, usa **Edición en lote**, y establece el campo Sede para todos a la vez.

## Filtrar por sede

Una vez que las sedes estén configuradas, puedes filtrar en todo B1 Admin por sede:

- **Búsqueda de personas**: agrega una condición de Sede en la búsqueda avanzada, o carga una [Lista guardada](../people/lists.md) limitada a una sede.
- **Demografía**: el [panel de Demografía](../people/demographics.md) muestra un gráfico de dona de Sede cuando al menos una persona tiene una sede asignada.
- **Configuración de asistencia**: cada tiempo de servicio en Asistencia puede estar vinculado a una sede.

:::tip
Las iglesias de ubicación única no necesitan configurar sedes. Todas las características de sede son opcionales: si no existen sedes, los campos y gráficos de sede simplemente no aparecen.
:::

## Artículos relacionados

- [Configuración de iglesia](./church-settings.md) — tu dirección de iglesia principal y marca (separado de direcciones de sede)
- [Demografía](../people/demographics.md) — el gráfico de desglose de Sede
- [Configuración de asistencia](../attendance/setup.md) — vincula tiempos de servicio a una sede
- [Edición en lote](../people/bulk-editing.md) — asigna sede a muchas personas a la vez
