---
title: "Campus"
---

# Campus

<div class="article-intro">

Si tu iglesia se reúne en más de una ubicación, los **Campus** te permiten registrar a qué sede pertenece cada persona y cada grupo. Una vez configurados, los campus aparecen como opción en los perfiles de personas, en la configuración de asistencia y en el panel de Demografía. Las iglesias con varias sedes pueden filtrar, buscar y generar informes por campus en todo B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso **Editar configuración de la iglesia** para gestionar los campus. Consulta [Roles y permisos](./roles-permissions.md).

</div>

## Abrir la configuración de campus

En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elige **Configuración > Configuración** y haz clic en **Campus** en la lista de la izquierda para desplazarte a la sección **Campus**. También puedes ir directamente a **/settings/campuses**. Verás una lista de todos los campus configurados con su nombre, ubicación y zona horaria.

## Añadir un campus

1. Haz clic en **Añadir campus**.
2. Completa los datos del campus:
   - **Nombre** *(obligatorio)* -- el nombre que se muestra en todo B1 Admin (por ejemplo, "Campus Principal" o "Campus Norte").
   - **Dirección** -- la dirección física del campus (se usa solo como información; no es lo mismo que la dirección principal de tu iglesia en la Configuración de la iglesia).
   - **Ciudad / Estado / Código postal** -- la ubicación del campus.
   - **Zona horaria** -- la zona horaria IANA de este campus (por ejemplo, *America/Chicago*). Los [horarios de registro de entrada](../attendance/setup.md#setting-a-check-in-schedule) de los servicios de este campus se abren y cierran en esta zona horaria. Si está en **Ninguna**, se usa en su lugar la [Zona horaria](./church-settings.md#time-zone) de tu iglesia. Es útil cuando los campus están en zonas horarias distintas.
   - **Sitio web** -- una URL opcional para la presencia web propia de este campus.
3. Haz clic en **Guardar**.

## Editar un campus

Haz clic en cualquier fila de campus de la lista para abrir su editor en el panel de la derecha. Actualiza los campos y haz clic en **Guardar**.

## Eliminar un campus

Abre un campus para editarlo y haz clic en **Eliminar**. Se te pedirá confirmación. Eliminar un campus no quita a las personas asignadas a él: su campo de campus simplemente queda en blanco.

## Asignar personas a un campus

Después de crear los campus, el personal puede asignar una persona a un campus desde su perfil:

1. Abre el registro de una persona en **Personas**.
2. Haz clic en **Editar**.
3. Elige el campus en el menú desplegable **Campus**.
4. Haz clic en **Guardar**.

También puedes actualizar el campus de forma masiva desde la página de Personas. Selecciona varias personas, usa **Edición masiva** y establece el campo Campus para todas a la vez.

## Filtrar por campus

Una vez configurados los campus, puedes filtrar por campus en todo B1 Admin:

- **Búsqueda de personas** -- añade una condición de Campus en la búsqueda avanzada, o carga una [Lista guardada](../people/lists.md) limitada a un campus.
- **Demografía** -- el [panel de Demografía](../people/demographics.md) muestra un gráfico de dona de Campus cuando al menos una persona tiene un campus asignado.
- **Configuración de asistencia** -- cada horario de servicio en Asistencia se puede vincular a un campus.

:::tip
Las iglesias de una sola ubicación no necesitan configurar campus. Todas las funciones de campus son opcionales: si no existen campus, los campos y gráficos de campus simplemente no aparecen.
:::

## Artículos relacionados

- [Configuración de la iglesia](./church-settings.md) -- la dirección principal de tu iglesia y la identidad visual (separadas de las direcciones de los campus)
- [Demografía](../people/demographics.md) -- el gráfico de desglose por campus
- [Configuración de asistencia](../attendance/setup.md) -- vincula los horarios de servicio a un campus
- [Edición masiva](../people/bulk-editing.md) -- asigna un campus a muchas personas a la vez
