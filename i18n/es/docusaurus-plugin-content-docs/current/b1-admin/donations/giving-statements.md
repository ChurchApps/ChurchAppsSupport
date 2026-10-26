---
title: "Estados de cuenta de donaciones"
---

# Estados de cuenta de donaciones

<div class="article-intro">

Al final de cada año, sus donantes necesitan un resumen de sus donativos deducibles de impuestos para sus registros. B1 Admin facilita generar estos estados de cuenta para todos los donantes a la vez, ahorrándole horas de trabajo manual.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Verifique que sus [fondos](funds.md) estén correctamente marcados como **Deducibles de impuestos**; solo las donaciones a fondos deducibles aparecen en los estados de cuenta
- Asegúrese de que todas las donaciones hayan sido [registradas](recording-donations.md) y que las transacciones en línea hayan sido [importadas desde Stripe](stripe-import.md)

</div>

## Acceder a los estados de cuenta de donaciones

1. En **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expanda **Donaciones**.
2. Haga clic en **Estados de cuenta de donaciones**. Se abre la página **Estados de cuenta de donaciones por lote**.

## Generar los estados de cuenta

1. En el panel **Seleccionar año**, elija el **Año** del menú desplegable. Puede elegir el año en curso o cualquiera de los cinco años anteriores.
2. La página carga solo las donaciones con fecha en ese año (del 1 de enero al 31 de diciembre), por lo que se abre rápido aunque su iglesia tenga muchos años de historial de donaciones. Cuando elige otro año, el resumen se actualiza con las donaciones de ese año. El panel **Resumen** debajo del año muestra estadísticas de ese año, incluyendo:
   - **Total de donantes**: el número de personas que dieron
   - **Total de donaciones**: el número de registros de donaciones individuales
   - **Monto total**: el monto combinado de todas las donaciones

## Descargar los estados de cuenta

El panel **Opciones de descarga** le ofrece dos opciones para hacer llegar los estados de cuenta a sus donantes:

### Descargar como archivos CSV

En **Archivos CSV individuales**, haga clic en **Descargar ZIP** para descargar un archivo ZIP que contiene un archivo CSV individual por cada donante. Esto es útil si desea enviar los estados de cuenta por correo electrónico uno por uno o importarlos a otro sistema.

### Imprimir todos los estados de cuenta

En **Estados de cuenta imprimibles**, haga clic en **Imprimir todos** (el botón muestra el número de estados de cuenta) para abrir en su navegador una vista imprimible del estado de cuenta de cada donante para el año seleccionado. Desde allí, use la función de impresión de su navegador para enviarlos a la impresora. Cada estado de cuenta comienza en una página nueva para que estén listos para doblar y enviar por correo, y están ordenados por apellido del donante y luego por nombre.

Si ha subido un **Logotipo para fondo claro** en [Sitio web > Apariencia](../website/appearance.md), se imprime centrado en la parte superior de cada estado de cuenta, encima del título. Esto aplica tanto a **Imprimir todos** como al estado de cuenta de un solo donante impreso desde su registro.

:::tip
Genere sus estados de cuenta temprano en enero, mientras sus registros están frescos. Verifique bien que sus fondos estén correctamente marcados como deducibles de impuestos antes de generar los estados de cuenta; solo se incluyen las donaciones a fondos deducibles.
:::

:::info
Los estados de cuenta de donaciones solo incluyen las donaciones asignadas a fondos que tienen activada la configuración **Deducible de impuestos**. Si un fondo no está marcado como deducible de impuestos, sus donaciones no aparecerán en el estado de cuenta. Puede administrar esta configuración en la página de [Fondos](funds.md).
:::

## Formatos de recibo para Canadá, Australia y Nueva Zelanda

Las iglesias fuera de Estados Unidos pueden cambiar el estado de cuenta al diseño oficial de recibo de su país. Haga clic en **Formato del estado de cuenta** en la parte superior de la página de Estados de cuenta de donaciones (o vaya a **Configuración** y abra la sección **Donaciones**), y configure **Formato del estado de cuenta** como **Canadá**, **Australia** o **Nueva Zelanda**; luego complete los campos que aparecen: su número de registro (número de registro de la CRA, ABN o número de registro de organización benéfica de Nueva Zelanda), la dirección de su organización, el nombre de la persona autorizada para firmar recibos y, en el caso de Canadá, la ciudad donde se emiten los recibos.

Los estados de cuenta incluirán entonces el texto que espera su autoridad tributaria (en Canadá, "Recibo oficial para fines del impuesto sobre la renta", con la referencia de la CRA), un número de recibo con el formato `AÑO-IDDONANTE`, el monto elegible contado solo a partir de fondos deducibles de impuestos y una línea separada para cualquier donativo a fondos no deducibles. Los donantes ven el mismo bloque de recibo cuando imprimen su propio estado de cuenta desde B1.church.

## Lo que los miembros ven en B1.church

La misma sección de **Donaciones** de la configuración controla lo que los miembros ven en su propia página de donaciones en B1.church:

- **Historial de donaciones de miembros** determina qué años pueden ver los miembros. **Todos los años** es la opción predeterminada. **Hasta 2025** (o cualquier otro año) se detiene en ese año, así que los miembros no pueden ver ni imprimir un año posterior hasta que usted lo permita. Use esto para retener el año en curso mientras termina las correcciones y los reembolsos. **Oculto** elimina por completo el historial de donaciones, los totales anuales y la impresión de estados de cuenta. Los miembros siguen pudiendo dar.
- **Nota de donación** es un mensaje breve que se muestra en la página de donaciones del miembro y en su historial, y se imprime al final de cada estado de cuenta, incluidos los que imprime aquí. Úselo para cosas como su política de reembolsos.

Estas configuraciones solo cambian lo que ven los miembros. Usted puede seguir imprimiendo cualquier año desde esta página.

## Siguientes pasos

Si necesita revisar los detalles de las donaciones antes de generar los estados de cuenta, visite la página de [Informes de donaciones](donation-reports.md) o revise los [lotes](batches.md) individuales.
