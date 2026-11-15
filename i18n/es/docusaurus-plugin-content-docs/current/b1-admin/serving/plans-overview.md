---
title: "Resumen de planes"
description: "Obtenga una vista panorámica de las asignaciones de voluntarios de muchas fechas de servicio en B1 Admin, detecte puestos sin cubrir y llene o envíe correos a su equipo desde una sola cuadrícula."
---

# Resumen de planes

<div class="article-intro">

El Resumen de planes le ofrece una vista panorámica de todas sus asignaciones de voluntarios en varias fechas de servicio a la vez. En lugar de abrir cada plan por separado, puede ver quién sirve en cada puesto a lo largo de las próximas semanas en una sola cuadrícula, y detectar rápidamente los huecos que todavía deben cubrirse.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Cree al menos un Ministerio y un Tipo de plan en el área de Servicio
- Cree [planes de servicio](./plans.md) con fechas y asignaciones de voluntarios
- Asegúrese de que sus voluntarios se hayan agregado a su [directorio de personas](../people/adding-people.md)

</div>

## Acceder al resumen {#accessing-the-overview}

1. En B1 Admin, abra el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Servicio** y haga clic en **Planes**.
2. Seleccione una **pestaña de ministerio** en la parte superior de la página.
3. Haga clic en **Resumen** junto al tipo de plan en la lista **Tipos de plan**, o abra el tipo de plan y haga clic en **Resumen** en la parte superior de la página.

El resumen abarca el tipo de plan desde el que lo abrió. Haga clic en el nombre del tipo de plan en la parte superior del resumen para volver a su lista de planes.

## Leer la cuadrícula del resumen {#reading-the-overview-grid}

El resumen muestra una cuadrícula donde:

- Las **filas** representan cada puesto (por ejemplo, "Música: Guitarra", "Técnico: Proyección") agrupados por categoría
- Las **columnas** representan las próximas fechas de servicio (por ejemplo, "14 abr", "21 abr")
- Las **celdas** muestran el nombre del voluntario asignado a ese puesto en esa fecha

Las celdas resaltadas en **rojo** no están cubiertas: todavía no se ha asignado ningún voluntario. Así es fácil ver los huecos de personal de un vistazo, sin abrir cada plan individualmente.

:::tip
Los nombres de los voluntarios se muestran en formato abreviado (nombre y la inicial del apellido, por ejemplo, "Juan P.") para que la cuadrícula sea compacta cuando hay muchos puestos.
:::

## Asignar voluntarios directamente desde el resumen {#assigning-volunteers-directly-from-the-overview}

No necesita abrir cada plan para llenar los espacios vacíos. Haga clic en cualquier celda de la cuadrícula para abrir un panel de asignación para ese puesto y esa fecha. Desde ahí puede:

- Hacer clic en el nombre de un miembro del equipo para asignarlo al puesto (o, en un puesto sin Grupo de voluntarios, buscar a cualquier persona de su iglesia)
- Hacer clic en el icono **Quitar** (X) junto a cualquier persona ya asignada, y confirmar, para sacarla de ese espacio
- Hacer clic en **Listo** para cerrar el panel sin salir del resumen

Esto permite programar un calendario completo en una sola pasada: trabajar por semanas y puestos sin entrar y salir de cada plan individual.

## Asignación automática desde el resumen {#auto-scheduling-from-the-overview}

Haga clic en **Asignación automática** y confirme para que B1 llene de una vez todos los espacios abiertos de la cuadrícula actual. Para cada plan visible, toma candidatos del grupo vinculado a cada puesto y llena los espacios vacíos automáticamente, e informa cuántos de los planes visibles pudo llenar (por ejemplo, "Se programaron automáticamente 3 de 4 planes"). Los puestos sin Grupo de voluntarios se omiten. Los planes se llenan uno a uno para que el mismo voluntario no quede doblemente programado en dos fechas durante la misma pasada.

:::info
La asignación automática solo llena los espacios que ya están vacíos; nunca reemplaza una asignación existente.
:::

## Enviar correo a todas las personas programadas {#emailing-everyone-scheduled}

Haga clic en **Enviar correo a voluntarios** y confirme para enviar una notificación a cada voluntario asignado en cualquier punto del rango de fechas y del ministerio filtrados actualmente, en una sola acción, en lugar de enviar correos plan por plan. B1 informa cuántos correos se enviaron y cuántos fallaron.

## Enviar mensajes de texto a todas las personas programadas {#texting-everyone-scheduled}

Si su iglesia tiene conectado un [proveedor de mensajes de texto](../settings/church-settings.md#texting) y usted puede tanto editar planes como enviar mensajes, aparece un botón **Enviar mensaje a voluntarios** en la parte superior del resumen.

1. Haga clic en **Enviar mensaje a voluntarios**.
2. El diálogo muestra cuántos voluntarios recibirán el mensaje (por ejemplo, "12 de 14 voluntarios recibirán este mensaje"), además de cuántos han cancelado la suscripción a los mensajes y cuántos no tienen número de teléfono registrado.
3. Escriba su **Mensaje**. Puede hacer clic en un marcador para insertar el nombre de cada voluntario o el nombre de su iglesia.
4. Haga clic en **Enviar**. B1 informa cuántos mensajes se enviaron.

Cada voluntario asignado en el rango de fechas recibe un mensaje en el número de celular de su perfil, aunque sirva en varias fechas. Las personas que comparten un número de teléfono (como el teléfono de una familia) reciben solo un mensaje. Los voluntarios que respondieron STOP a un mensaje anterior se omiten.

:::info
Los mensajes se envían a través del propio proveedor de mensajes de texto de su iglesia, por lo que se aplica su tarifa. Si su iglesia se queda sin créditos de mensajes, el envío se detiene y el diálogo se lo indica. Un solo envío llega a un máximo de 200 voluntarios; reduzca el rango de fechas si tiene más.
:::

## Resaltar el calendario de un voluntario {#highlighting-a-volunteers-schedule}

Use el menú desplegable **Resaltar** para elegir a una persona de su equipo: cada celda donde está asignada se destaca en la cuadrícula, para que pueda ver en qué otros lugares ya sirve antes de agregarla a otro espacio. Elija **Todos** para desactivar el resaltado.

## Filtrar el resumen {#filtering-the-overview}

Puede ajustar lo que muestra el resumen con los controles encima de la cuadrícula. La cuadrícula se actualiza en cuanto los cambia.

- **Todos los puestos / Solo sin cubrir** — Elija **Solo sin cubrir** para ocultar las filas en las que todas las fechas ya están cubiertas, y concentrarse solo en los puestos que todavía necesitan un voluntario.
- **Fecha de inicio / Fecha de fin** — De forma predeterminada, el resumen muestra 12 semanas hacia el futuro. Escriba fechas personalizadas para ampliar o reducir el rango.

## Exportar a CSV {#exporting-to-csv}

Haga clic en **Exportar CSV** para descargar la cuadrícula actual como hoja de cálculo. La exportación incluye todos los puestos y asignaciones de voluntarios del rango de fechas filtrado, lo que facilita compartirla con los líderes de ministerio o imprimirla para las reuniones de planificación.

:::info
La exportación CSV refleja los filtros aplicados en ese momento: solo se incluyen en la descarga las fechas y el tipo de plan que se muestran en la cuadrícula.
:::

## Artículos relacionados {#related-articles}

- [Planes de servicio](./plans.md) — Cree y administre planes de servicio individuales
- [Orden del servicio](./service-order.md) — Construya el orden del servicio dentro de un plan
- [Programar lecciones](./scheduling-lessons.md) — Programe lecciones junto con sus planes de servicio
