---
title: "Sedes"
---

# Sedes

<div class="article-intro">

Si tu iglesia se reúne en más de una ubicación, las **Sedes** te permiten registrar qué sitio pertenece a cada persona y grupo. Una vez configuradas, las sedes aparecen como una opción en los perfiles de personas, en la configuración de asistencia y en el panel de Datos Demográficos. Las iglesias multi-sedes pueden filtrar, buscar e informar por sede en todo B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas el permiso de **Editar Configuración de Iglesia** para administrar sedes. Ve [Roles y Permisos](./roles-permissions.md).

</div>

## Abriendo Configuración de Sedes

En B1 Admin, ve a **Configuración** en la barra lateral izquierda y selecciona **Sedes** de la navegación Configuración. Verás una lista de todas las sedes configuradas con su nombre, ubicación y zona horaria.

## Agregando una Sede

1. Haz clic en **Agregar Sede** (o el botón **+** si no existen sedes aún).
2. Completa los detalles de la sede:
   - **Nombre** *(obligatorio)* — el nombre mostrado en todo B1 Admin (por ejemplo, "Sede Principal" o "Sede Norte").
   - **Dirección** — la dirección de calle de la sede (usada para exhibición informativa; no es lo mismo que tu dirección principal de iglesia en Configuración de Iglesia).
   - **Ciudad / Estado / Código Postal** — la ubicación de la sede.
   - **Zona Horaria** — la zona horaria IANA para esta sede (por ejemplo, *America/Chicago*). Útil cuando las sedes están en diferentes zonas horarias.
   - **Sitio Web** — una URL opcional para la presencia web propia de esta sede.
3. Haz clic en **Guardar**.

## Editando una Sede

Haz clic en cualquier fila de sede en la lista para abrir su editor en el panel a la derecha. Actualiza los campos y haz clic en **Guardar**.

## Eliminando una Sede

Abre una sede para editarla y haz clic en **Eliminar**. Se te pedirá que confirmes. Eliminar una sede no elimina a las personas asignadas a ella -- su campo de sede simplemente se queda en blanco.

## Asignando Personas a una Sede

Después de crear sedes, el personal puede asignar a una persona a una sede desde su perfil:

1. Abre el registro de una persona en **Personas**.
2. Haz clic en **Editar**.
3. Elige la sede del menú desplegable **Sede**.
4. Haz clic en **Guardar**.

También puedes actualizar la sede en lote desde la página Personas. Selecciona múltiples personas, usa **Edición en Lote** y establece el campo Sede para todos a la vez.

## Filtrar por Sede

Una vez que las sedes estén configuradas, puedes filtrar en todo B1 Admin por sede:

- **Búsqueda de Personas** -- agrega una condición de Sede en la búsqueda avanzada, o carga una [Lista Guardada](../people/lists.md) limitada a una sede.
- **Datos Demográficos** -- el [panel de Datos Demográficos](../people/demographics.md) muestra un gráfico circular de Sedes cuando al menos una persona tiene una sede asignada.
- **Configuración de Asistencia** -- cada horario de servicio en Asistencia puede estar vinculado a una sede.

:::tip
Las iglesias de una sola ubicación no necesitan configurar sedes. Todas las características de sedes son opcionales -- si no existen sedes, los campos de sede y los gráficos simplemente no aparecen.
:::

## Artículos Relacionados

- [Configuración de Iglesia](./church-settings.md) -- tu dirección principal de iglesia y marca (separada de las direcciones de sede)
- [Datos Demográficos](../people/demographics.md) -- el gráfico de desglose de Sedes
- [Configuración de Asistencia](../attendance/setup.md) -- vincula horarios de servicio a una sede
- [Edición en Lote](../people/bulk-editing.md) -- asigna sede a muchas personas a la vez
