---
title: "Campus"
---

# Campus

<div class="article-intro">

Si tu iglesia se reúne en más de una ubicación, los **Campus** te permiten registrar a qué sede pertenece cada persona y cada grupo. Una vez configurados, los campus aparecen como opción en los perfiles de personas, en la configuración de asistencia y en el panel de Demografía. Las iglesias con varias sedes pueden filtrar, buscar y generar informes por campus en todo B1 Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas el permiso **Edit Church Settings** para gestionar los campus. Consulta [Roles y permisos](./roles-permissions.md).

</div>

## Abrir la configuración de campus

En B1 Admin, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), elige **Settings > Settings** y haz clic en **Campuses** en la lista de la izquierda para desplazarte a la sección **Campuses**. También puedes ir directamente a **/settings/campuses**. Verás una lista de todos los campus configurados con su nombre, ubicación y zona horaria.

## Agregar un campus

1. Haz clic en **Add Campus**.
2. Completa los datos del campus:
   - **Name** *(obligatorio)*: el nombre que se muestra en todo B1 Admin (por ejemplo, "Campus principal" o "Campus Norte").
   - **Address**: la dirección del campus (se usa solo como información; no es la misma que la dirección principal de tu iglesia en Church Settings).
   - **City / State / Zip**: la ubicación del campus.
   - **Time Zone**: la zona horaria IANA de este campus (por ejemplo, *America/Chicago*). Los [horarios de registro](../attendance/setup.md#setting-a-check-in-schedule) de los servicios de este campus se abren y cierran según esta zona horaria. Si está configurada como **None**, se usa en su lugar la [zona horaria](./church-settings.md#time-zone) de tu iglesia. Es útil cuando los campus están en zonas horarias distintas.
   - **Website**: una URL opcional para el sitio web propio de este campus.
3. Haz clic en **Save**.

## Editar un campus

Haz clic en cualquier fila de campus de la lista para abrir su editor en el panel de la derecha. Actualiza los campos y haz clic en **Save**.

## Eliminar un campus

Abre un campus para editarlo y haz clic en **Delete**. Se te pedirá que confirmes. Eliminar un campus no quita a las personas asignadas a él; simplemente su campo de campus queda en blanco.

## Asignar personas a un campus

Después de crear los campus, el personal puede asignar una persona a un campus desde su perfil:

1. Abre el registro de la persona en **People**.
2. Haz clic en **Edit**.
3. Elige el campus en el menú desplegable **Campus**.
4. Haz clic en **Save**.

También puedes actualizar el campus de varias personas a la vez desde la página de People. Selecciona varias personas, usa **Bulk Edit** y establece el campo Campus para todas a la vez.

## Filtrar por campus

Una vez configurados los campus, puedes filtrar por campus en todo B1 Admin:

- **Búsqueda de personas**: agrega una condición de Campus en la búsqueda avanzada, o carga una [lista guardada](../people/lists.md) limitada a un campus.
- **Demographics**: el [panel de Demografía](../people/demographics.md) muestra un gráfico de anillo de Campus cuando al menos una persona tiene un campus asignado.
- **Attendance Setup**: cada horario de servicio en Attendance puede vincularse a un campus.

:::tip
Las iglesias con una sola ubicación no necesitan configurar campus. Todas las funciones de campus son opcionales; si no existen campus, los campos y gráficos correspondientes simplemente no aparecen.
:::

## Artículos relacionados

- [Church Settings](./church-settings.md): la dirección principal de tu iglesia y su marca (separada de las direcciones de campus)
- [Demografía](../people/demographics.md): el gráfico de desglose por campus
- [Configuración de asistencia](../attendance/setup.md): vincula los horarios de servicio a un campus
- [Edición masiva](../people/bulk-editing.md): asigna un campus a muchas personas a la vez
