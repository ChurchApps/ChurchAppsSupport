---
title: "Estados de donación"
---

# Estados de donación

<div class="article-intro">

Al final de cada año, sus donantes necesitan un resumen de sus donativos deducibles de impuestos para sus registros. B1 Admin facilita generar estos estados para todos los donantes a la vez, lo que le ahorra horas de trabajo manual.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Verifique que sus [fondos](funds.md) estén marcados correctamente como **Deducible de impuestos** -- solo las donaciones a fondos deducibles de impuestos aparecen en los estados
- Asegúrese de que todas las donaciones hayan sido [registradas](recording-donations.md) y que las transacciones en línea hayan sido [importadas desde Stripe](stripe-import.md)

</div>

## Acceder a los estados de donación

1. En **B1 Admin**, abra el [menú de salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Donaciones**.
2. Haga clic en **Estados de donación**. Se abre la página **Estados de donación por lotes**.

## Generar los estados

1. En el panel **Seleccionar año**, elija el **Año** del menú desplegable. Puede elegir el año actual o cualquiera de los cinco años anteriores.
2. La página carga solo las donaciones fechadas en ese año (del 1 de enero al 31 de diciembre), por lo que se abre rápidamente aunque su iglesia tenga muchos años de historial de donaciones. Cuando elige otro año, el resumen se actualiza con las donaciones de ese año. El panel **Resumen** debajo del año muestra estadísticas de ese año, incluido:
   - **Total de donantes** -- el número de personas que dieron
   - **Total de donaciones** -- el número de registros de donación individuales
   - **Monto total** -- el monto combinado en dólares de todas las donaciones

## Descargar los estados

El panel **Opciones de descarga** le ofrece dos opciones para entregar los estados a sus donantes:

### Descargar como archivos CSV

En **Archivos CSV individuales**, haga clic en **Descargar ZIP** para descargar un archivo ZIP que contiene un archivo CSV individual por cada donante. Esto es útil si desea enviar los estados por correo electrónico uno a uno o importarlos a otro sistema.

### Imprimir todos los estados

En **Estados imprimibles**, haga clic en **Imprimir todos** (el botón muestra el número de estados) para abrir en su navegador una vista imprimible de cada estado de donante del año seleccionado. Desde ahí, use la función de impresión de su navegador para enviarlos a una impresora. Cada estado comienza en una página nueva, así quedan listos para doblar y enviar por correo, y los estados están ordenados por apellido del donante y luego por nombre.

Si ha subido un **Logotipo para fondo claro** en [Sitio web > Apariencia](../website/appearance.md), este se imprime centrado en la parte superior de cada estado, encima del título del estado. Esto aplica tanto a **Imprimir todos** como al estado de un solo donante impreso desde su registro.

:::tip
Genere sus estados temprano en enero, mientras los registros están frescos. Verifique con cuidado que sus fondos estén marcados correctamente como deducibles de impuestos antes de generar los estados: solo se incluyen las donaciones a fondos deducibles de impuestos.
:::

:::info
Los estados de donación solo incluyen donaciones asignadas a fondos que tienen activada la opción **Deducible de impuestos**. Si un fondo no está marcado como deducible de impuestos, sus donaciones no aparecerán en el estado. Puede administrar esta opción en la página de [Fondos](funds.md).
:::

## Formatos de recibo para Canadá, Australia y Nueva Zelanda

Las iglesias fuera de los Estados Unidos pueden cambiar el estado al diseño oficial de recibo de su país. Haga clic en **Formato del estado** en la parte superior de la página de Estados de donación (o vaya a **Configuración** y abra la sección **Donaciones**), y establezca **Formato del estado** en **Canadá**, **Australia** o **Nueva Zelanda**. Luego complete los campos que aparecen: su número de registro (número de registro de la CRA, ABN o número de registro de organización benéfica de NZ), la dirección de su organización, el nombre de la persona autorizada a firmar recibos y, en el caso de Canadá, la ciudad donde se emiten los recibos.

Los estados incluyen entonces el texto que exige su autoridad tributaria (para Canadá, "Recibo oficial para fines del impuesto sobre la renta", con la referencia de la CRA), un número de recibo con el formato `AÑO-DONORID`, el monto elegible contado solo de fondos deducibles de impuestos, y una línea aparte para cualquier donativo a fondos no deducibles. Los donantes ven el mismo bloque de recibo cuando imprimen su propio estado desde B1.church.

## Próximos pasos

Si necesita revisar los detalles de las donaciones antes de generar los estados, visite la página de [Informes de donaciones](donation-reports.md) o revise los [lotes](batches.md) individuales.
