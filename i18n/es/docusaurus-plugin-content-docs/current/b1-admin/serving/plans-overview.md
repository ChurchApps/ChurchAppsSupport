---
title: "Descripción General de Planes"
---

# Descripción General de Planes

<div class="article-intro">

La Descripción General de Planes te da una vista de pájaro de todas tus asignaciones de voluntarios en múltiples fechas de servicio de una vez. En lugar de abrir cada plan individualmente, puedes ver quién está sirviendo en cada posición en las próximas semanas en una sola cuadrícula -- y detectar rápidamente cualquier brecha que aún necesite llenar.

</div>

<div class="prereqs">
<h4>Antes de Empezar</h4>

- Crea al menos un Ministerio y Tipo de Plan en el área de Servicio
- Crea [planes de servicio](./plans.md) con fechas y asignaciones de voluntarios
- Asegúrate de que tus voluntarios hayan sido añadidos a tu [directorio de personas](../people/adding-people.md)

</div>

## Acceder a la Descripción General

1. En B1 Admin, abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expande **Servicio** y haz clic en **Planes**.
2. Selecciona una **pestaña de ministerio** en la parte superior de la página.
3. Haz clic en **Descripción General** junto al tipo de plan en la lista **Tipos de Plan**, o abre el tipo de plan y haz clic en **Descripción General** en la parte superior de la página.

La descripción general cubre el tipo de plan desde el que la abriste. Haz clic en el nombre del tipo de plan en la parte superior de la descripción general para volver a su lista de planes.

## Leer la Cuadrícula de Descripción General

La descripción general muestra una cuadrícula donde:

- **Filas** representan cada posición (por ejemplo, "Música: Guitarra", "Técnica: Proyección") agrupadas por categoría
- **Columnas** representan fechas de servicio próximas (por ejemplo, "14 de Abril", "21 de Abril")
- **Celdas** muestran el nombre del voluntario asignado a esa posición en esa fecha

Las celdas resaltadas en **rojo** están sin llenar -- no se ha asignado ningún voluntario aún. Esto facilita ver las brechas de personal de un vistazo sin abrir cada plan individualmente.

:::tip
Los nombres de voluntarios se muestran en formato abreviado (nombre y inicial del apellido, por ejemplo, "John D.") para mantener la cuadrícula compacta cuando tienes muchas posiciones.
:::

## Asignar Voluntarios Directamente desde la Descripción General

No necesitas abrir planes individuales para llenar ranuras vacías. Haz clic en cualquier celda de la cuadrícula para abrir un panel de asignación para esa posición y fecha. Desde allí puedes:

- Seleccionar una persona de tu equipo para asignar a la posición
- Hacer clic en **Eliminar** al lado de cualquiera ya asignado para quitarlo de esa ranura
- Guardar el cambio sin salir de la descripción general

Esto hace posible estar sirviendo un cronograma completo en una sola pasada -- trabaja en semanas y posiciones sin navegar dentro y fuera de planes individuales.

## Auto-Programación desde la Descripción General

Haz clic en **Auto-Programación** para que B1 llene cada ranura abierta y sin llenar en la cuadrícula actual a la vez. Para cada plan en vista, extrae candidatos del grupo vinculado a cada posición y llena las ranuras vacías automáticamente, informando cuántos de los planes visibles fue capaz de llenar. Los planes se llenan uno a la vez para que el mismo voluntario no sea reservado dos veces en dos fechas diferentes en la misma pasada.

:::info
Auto-Programación solo llena ranuras que ya están vacías -- nunca reemplaza una asignación existente.
:::

## Enviar Correo a Todos los Programados

Haz clic en **Enviar Correo a Voluntarios** para enviar una notificación a cada voluntario asignado en cualquier lugar del rango de fechas actualmente filtrado y ministerio, en una acción, en lugar de enviar correo plan por plan. B1 informa cuántos correos fueron enviados y cuántos fallaron.

## Enviar Mensaje de Texto a Todos los Programados {#texting-everyone-scheduled}

Si tu iglesia tiene un [proveedor de mensajes de texto](../settings/church-settings.md#texting) conectado y puedes editar planes y enviar mensajes de texto, aparece un botón **Enviar Texto a Voluntarios** en la parte superior de la descripción general.

1. Haz clic en **Enviar Texto a Voluntarios**.
2. El cuadro de diálogo muestra cuántos voluntarios recibirán el texto (por ejemplo, "12 de 14 voluntarios recibirán este texto"), además de cuántos han optado por no recibir textos y cuántos no tienen un número de teléfono registrado.
3. Escribe tu **Mensaje**. Puedes hacer clic en un marcador de posición para insertar el nombre de cada voluntario o el nombre de tu iglesia.
4. Haz clic en **Enviar**. B1 informa cuántos textos fueron enviados.

Cada voluntario asignado en el rango de fechas recibe un texto en el número de móvil de su perfil, incluso si sirve en varias fechas. Las personas que comparten un número de teléfono (como un teléfono familiar) reciben solo un texto. Los voluntarios que respondieron STOP a un texto anterior se omiten.

:::info
Los textos se envían a través del proveedor de mensajes de texto de tu iglesia, por lo que se aplica su tarifa. Si tu iglesia se queda sin créditos de mensajes de texto, el envío se detiene y el cuadro de diálogo te lo indica. Un solo envío llega a un máximo de 200 voluntarios; reduce el rango de fechas si tienes más.
:::

## Resaltar el Horario de un Voluntario

Usa el menú desplegable **Resaltar** para elegir una persona de tu equipo -- cada celda donde está asignada se resalta en la cuadrícula, para que puedas ver en todas partes donde ya están sirviendo antes de añadirlos a otra ranura. Elige **Todos** para apagar el resaltado.

## Filtrar la Descripción General

Puedes ajustar lo que la descripción general muestra usando los controles situados encima de la cuadrícula. La cuadrícula se actualiza en cuanto los cambias.

- **Todas las posiciones / Solo sin llenar** -- Elige **Solo sin llenar** para ocultar las filas donde cada fecha ya está llena, para que puedas enfocarte solo en posiciones que aún necesitan un voluntario.
- **Fecha de Inicio / Fecha de Finalización** -- Por defecto la descripción general muestra 12 semanas en el futuro. Ingresa fechas personalizadas para expandir o reducir el rango.

## Exportar a CSV

Haz clic en **Exportar CSV** para descargar la cuadrícula actual como una hoja de cálculo. La exportación incluye todas las posiciones y asignaciones de voluntarios para el rango de fechas filtrado, facilitando compartir con líderes de ministerio o imprimir para reuniones de planificación.

:::info
La exportación CSV refleja los filtros que están actualmente aplicados -- solo las fechas y tipo de plan mostrados en la cuadrícula se incluyen en la descarga.
:::

## Artículos Relacionados

- [Planes de Servicio](./plans.md) -- Crea y gestiona planes de servicio individuales
- [Orden del Servicio](./service-order.md) -- Construye el orden del servicio dentro de un plan
- [Programar Lecciones](./scheduling-lessons.md) -- Programa lecciones junto con tus planes de servicio
