---
title: "Campus"
description: "Configure los campus en B1 Admin para registrar a qué sede pertenece cada persona y grupo, y luego filtre personas, asistencia y demografía por ubicación."
---

# Campus

<div class="article-intro">

Si su iglesia se reúne en más de una ubicación, los **Campus** le permiten registrar a qué sede pertenece cada persona y cada grupo. Una vez configurados, los campus aparecen como opción en los perfiles de personas, en la configuración de asistencia y en el panel de Demografía. Las iglesias con varias sedes pueden filtrar, buscar y generar informes por campus en todo B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesita el permiso **Editar configuración de la iglesia** para administrar los campus. Consulte [Roles y permisos](./roles-permissions.md).

</div>

## Abrir la configuración de campus {#opening-campus-settings}

En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elija **Configuración > Configuración** y haga clic en **Campus** en la lista de la izquierda para desplazarse a la sección **Campus**. También puede ir directamente a **/settings/campuses**. Verá una lista de todos los campus configurados con su nombre, ubicación y zona horaria.

## Agregar un campus {#adding-a-campus}

1. Haga clic en **Agregar campus**.
2. Complete los datos del campus:
   - **Nombre** *(obligatorio)* — el nombre que se muestra en todo B1 Admin (por ejemplo, "Campus principal" o "Campus norte").
   - **Dirección** y **Línea de dirección 2** — la dirección postal del campus (se usa solo como información; no es lo mismo que la dirección principal de su iglesia en la Configuración de la iglesia).
   - **Ciudad / Estado / Código postal** — la ubicación del campus.
   - **Zona horaria** — la zona horaria IANA de este campus (por ejemplo, *America/Chicago*). Los [horarios de registro](../attendance/setup.md#setting-a-check-in-schedule) de los servicios de este campus se abren y cierran en esta zona horaria. Si está en **Ninguna**, se usa en su lugar la [Zona horaria](./church-settings.md#time-zone) de su iglesia. Es útil cuando los campus están en zonas horarias distintas.
   - **Sitio web** — una URL opcional para la presencia web propia de este campus.
3. Haga clic en **Guardar**.

La lista muestra el **Nombre**, la **Ubicación** (ciudad y estado) y la **Zona horaria** de cada campus, y el elemento **Campus** de la lista de la izquierda muestra cuántas sedes tiene.

## Editar un campus {#editing-a-campus}

Haga clic en cualquier fila de campus de la lista para abrir su editor en el panel de la derecha. Actualice los campos y haga clic en **Guardar**, o en **Cancelar** para cerrar el editor sin guardar.

## Eliminar un campus {#deleting-a-campus}

Abra un campus para editarlo y haga clic en **Eliminar**. Se le pedirá que confirme. Eliminar un campus no quita a las personas asignadas a él: su campo de campus simplemente queda en blanco.

## Asignar personas a un campus {#assigning-people-to-a-campus}

Después de crear los campus, el personal puede asignar una persona a un campus desde su perfil:

1. Abra el registro de una persona en **Personas**.
2. Haga clic en **Editar**.
3. Elija el campus en el menú desplegable **Campus**.
4. Haga clic en **Guardar**.

También puede actualizar el campus en lote desde la página de Personas. Seleccione varias personas, use **Edición masiva** y establezca el campo Campus para todas a la vez.

## Filtrar por campus {#filtering-by-campus}

Una vez configurados los campus, puede filtrar en todo B1 Admin por campus:

- **Búsqueda de personas** — agregue una condición de Campus en la búsqueda avanzada, o cargue una [Lista guardada](../people/lists.md) limitada a un campus.
- **Demografía** — el [panel de Demografía](../people/demographics.md) muestra un gráfico de anillo por Campus cuando al menos una persona tiene un campus asignado.
- **Configuración de asistencia** — cada horario de servicio de Asistencia puede vincularse a un campus.

:::tip
Las iglesias con una sola ubicación no necesitan configurar campus. Todas las funciones de campus son opcionales: si no existen campus, los campos y gráficos de campus simplemente no aparecen.
:::

## Artículos relacionados {#related-articles}

- [Configuración de la iglesia](./church-settings.md) — su dirección principal y su marca (separada de las direcciones de los campus)
- [Demografía](../people/demographics.md) — el gráfico de desglose por Campus
- [Configuración de asistencia](../attendance/setup.md) — vincule horarios de servicio a un campus
- [Edición masiva](../people/bulk-editing.md) — asigne un campus a muchas personas a la vez
