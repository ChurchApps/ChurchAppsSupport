---
title: "Estados de donación"
description: "Cree estados de donación de fin de año para cada donante en B1 Admin, luego descárguelos como archivos CSV o imprímalos para enviarlos por correo con los totales deducibles de impuestos."
---

# Estados de donación

<div class="article-intro">

Al final de cada año, sus donantes necesitan un resumen de sus donaciones deducibles de impuestos para sus registros. B1 Admin facilita generar estos estados para todos los donantes a la vez, ahorrándole horas de trabajo manual.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Verifique que sus [fondos](funds.md) estén correctamente marcados como **Deducible de impuestos**: solo las donaciones a fondos deducibles aparecen en los estados
- Asegúrese de que todas las donaciones se hayan [registrado](recording-donations.md) y que las transacciones en línea se hayan [importado desde Stripe](stripe-import.md)

</div>

## Acceder a los estados de donación {#accessing-giving-statements}

1. En **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y despliegue **Donaciones**.
2. Haga clic en **Estados de donación**. Se abre la página **Estados de donación por lote**.

## Generar los estados {#generating-statements}

1. En el panel **Seleccionar año**, elija el **Año** en el menú desplegable. Puede elegir el año actual o cualquiera de los cinco años anteriores.
2. La página carga solo las donaciones con fecha en ese año (del 1 de enero al 31 de diciembre), por lo que se abre rápido incluso si su iglesia tiene muchos años de historial de donaciones. Cuando elige otro año, el resumen se actualiza con las donaciones de ese año. El panel **Resumen** debajo del año muestra estadísticas de ese año, contando las mismas donaciones que incluyen los estados (las donaciones hechas solo a fondos no deducibles se omiten):
   - **Total de donantes**: el número de personas que donaron
   - **Total de donaciones**: el número de registros de donación individuales
   - **Monto total**: el monto combinado de sus donativos

## Descargar los estados {#downloading-statements}

El panel **Opciones de descarga** le ofrece dos opciones para hacer llegar los estados a sus donantes:

### Descargar como archivos CSV {#download-as-csv-files}

En **Archivos CSV individuales**, haga clic en **Descargar ZIP** (el botón muestra el número de archivos) para descargar un archivo ZIP que contiene un archivo CSV individual por cada donante. Esto resulta útil si desea enviar los estados por correo electrónico de forma individual o importarlos a otro sistema.

### Imprimir todos los estados {#print-all-statements}

En **Estados imprimibles**, haga clic en **Imprimir todos** (el botón muestra el número de estados) para abrir en su navegador una vista imprimible del estado de cada donante para el año seleccionado. Desde ahí, use la función de impresión de su navegador para enviarlos a una impresora. Cada estado comienza en una página nueva para que estén listos para doblar y enviar por correo, y los estados están ordenados por el apellido del donante y luego por el nombre.

Si ha subido un **Logotipo para fondo claro** en [Sitio web > Apariencia](../website/appearance.md), se imprime centrado en la parte superior de cada estado, encima del título del estado. Esto aplica a **Imprimir todos**, al estado de un solo donante impreso desde su registro, y a los estados que los miembros imprimen por sí mismos desde la página de **Donaciones** de B1.church.

:::tip
Genere sus estados a principios de enero, mientras sus registros aún están frescos. Verifique dos veces que sus fondos estén correctamente marcados como deducibles de impuestos antes de generar los estados: solo se incluyen las donaciones a fondos deducibles.
:::

:::info
Los estados de donación solo incluyen donaciones asignadas a fondos que tienen activada la configuración **Deducible de impuestos**. Si un fondo no está marcado como deducible de impuestos, sus donaciones no aparecerán en el estado. Puede administrar esta configuración en la página de [Fondos](funds.md).
:::

## Formatos de recibo para Canadá, Australia y Nueva Zelanda {#receipt-formats-for-canada-australia-and-new-zealand}

Las iglesias fuera de Estados Unidos pueden cambiar el estado al formato oficial de recibo de su país. Haga clic en **Formato del estado** en la parte superior de la página de Estados de donación (o vaya a **Configuración** y abra la sección **Donaciones**), y configure **Formato del estado** (que comienza en **Estándar**) como **Canadá - recibo oficial de la CRA**, **Australia** o **Nueva Zelanda**. Luego complete los campos que aparecen: su número de registro (**Número de registro de la CRA**, **ABN** o **Número de registro de organización benéfica de NZ**), la **Dirección de la organización**, el **Nombre del firmante autorizado** y, para Canadá, la **Ciudad de emisión**. Haga clic en **Guardar**.

Los estados incluyen entonces la redacción que espera su autoridad fiscal (en Canadá, "Recibo oficial para fines del impuesto sobre la renta" con la referencia de la CRA), un número de recibo con el formato `YEAR-DONORID`, el monto elegible contado solo de los fondos deducibles de impuestos, y una línea separada para cualquier donativo a fondos no deducibles. Los donantes ven el mismo bloque de recibo cuando imprimen su propio estado desde B1.church.

## Lo que ven los miembros en B1.church {#what-members-see-in-b1church}

La misma sección de configuración de **Donaciones** controla lo que los miembros ven en su propia página de donaciones en B1.church:

- **Historial de donaciones de miembros** determina qué años pueden ver los miembros. **Todos los años** es la opción predeterminada. **Hasta 2025** (o cualquier otro año) se detiene en ese año, de modo que los miembros no pueden ver ni imprimir un año posterior hasta que usted lo permita. Úselo para retener el año actual mientras termina las correcciones y reembolsos. **Oculto** elimina por completo el historial de donaciones, los totales anuales y la impresión de estados. Los miembros pueden seguir donando.
- **Nota de donación** es un breve mensaje que se muestra en la página de donaciones del miembro y en su historial, y que se imprime al final de cada estado de donación, incluidos los estados que imprime desde aquí. Úselo para cosas como su política de reembolsos.

Estas configuraciones solo cambian lo que ven los miembros. Usted puede seguir imprimiendo cualquier año desde esta página.

## Próximos pasos {#next-steps}

Si necesita revisar los detalles de las donaciones antes de generar los estados, visite la página de [Informes de donaciones](donation-reports.md) o revise los [lotes](batches.md) individuales.
