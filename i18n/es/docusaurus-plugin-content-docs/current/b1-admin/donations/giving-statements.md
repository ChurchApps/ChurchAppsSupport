---
title: "Estados de cuenta de donaciones"
description: "Cree estados de cuenta anuales de donaciones para cada donante en B1 Admin, y descárguelos como archivos CSV o imprímalos para enviarlos por correo con los totales deducibles de impuestos."
---

# Estados de cuenta de donaciones

<div class="article-intro">

Al final de cada año, sus donantes necesitan un resumen de sus donaciones deducibles de impuestos para sus registros. B1 Admin facilita generar estos estados de cuenta para todos los donantes a la vez, ahorrándole horas de trabajo manual.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Verifique que sus [fondos](funds.md) estén correctamente marcados como **Tax Deductible**; solo las donaciones a fondos deducibles aparecen en los estados de cuenta
- Asegúrese de que todas las donaciones hayan sido [registradas](recording-donations.md) y de que las transacciones en línea se hayan [importado desde Stripe](stripe-import.md)

</div>

## Acceder a los estados de cuenta de donaciones

1. En **B1 Admin**, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expanda **Donations**.
2. Haga clic en **Giving Statements**. Se abre la página **Batch Giving Statements**.

## Generar los estados de cuenta

1. En el panel **Select Year**, elija el **Year** en el menú desplegable. Puede elegir el año en curso o cualquiera de los cinco años anteriores.
2. La página carga solo las donaciones con fecha en ese año (del 1 de enero al 31 de diciembre), así que se abre con rapidez aunque su iglesia tenga muchos años de historial de donaciones. Cuando elige otro año, el resumen se actualiza con las donaciones de ese año. El panel **Summary** debajo del año muestra estadísticas de ese año, entre ellas:
   - **Total Donors** -- el número de personas que dieron
   - **Total Donations** -- el número de registros de donaciones individuales
   - **Total Amount** -- el monto combinado de todas las donaciones

## Descargar los estados de cuenta

El panel **Download Options** le ofrece dos opciones para hacer llegar los estados de cuenta a sus donantes:

### Descargar como archivos CSV

En **Individual CSV Files**, haga clic en **Download ZIP** para descargar un archivo ZIP que contiene un archivo CSV individual por cada donante. Esto es útil si desea enviar los estados de cuenta por correo electrónico uno por uno o importarlos a otro sistema.

### Imprimir todos los estados de cuenta

En **Printable Statements**, haga clic en **Print All** (el botón muestra el número de estados de cuenta) para abrir en su navegador una vista imprimible del estado de cuenta de cada donante para el año seleccionado. Desde allí, use la función de impresión de su navegador para enviarlos a la impresora. Cada estado de cuenta comienza en una página nueva para que esté listo para doblar y enviar por correo, y están ordenados por apellido del donante y luego por nombre.

Si ha subido un **Light Background Logo** en [Sitio web > Apariencia](../website/appearance.md), se imprime centrado en la parte superior de cada estado de cuenta, encima del título. Esto se aplica a **Print All**, al estado de cuenta de un solo donante impreso desde su registro, y a los estados de cuenta que los miembros imprimen por su cuenta desde la página **Giving** de B1.church.

:::tip
Genere sus estados de cuenta a principios de enero, mientras sus registros están recientes. Revise bien que sus fondos estén correctamente marcados como deducibles de impuestos antes de generarlos; solo se incluyen las donaciones a fondos deducibles.
:::

:::info
Los estados de cuenta de donaciones solo incluyen las donaciones asignadas a fondos que tienen activada la opción **Tax Deductible**. Si un fondo no está marcado como deducible de impuestos, sus donaciones no aparecerán en el estado de cuenta. Puede administrar esta opción en la página de [Fondos](funds.md).
:::

## Formatos de recibo para Canadá, Australia y Nueva Zelanda

Las iglesias fuera de Estados Unidos pueden cambiar el estado de cuenta al diseño oficial de recibo de su país. Haga clic en **Statement format** en la parte superior de la página de Giving Statements (o vaya a **Settings** y abra la sección **Giving**), y configure **Statement Format** como **Canada**, **Australia** o **New Zealand**. Luego complete los campos que aparecen: su número de registro (número de registro de la CRA, ABN o número de registro de organización benéfica de Nueva Zelanda), la dirección de su organización, el nombre de la persona autorizada para firmar recibos y, en el caso de Canadá, la ciudad donde se emiten los recibos.

Los estados de cuenta incluirán entonces el texto que espera su autoridad tributaria (en Canadá, "Official Receipt for Income Tax Purposes", con la referencia de la CRA), un número de recibo con el formato `AÑO-DONORID`, el monto elegible contado solo a partir de los fondos deducibles de impuestos y una línea aparte para cualquier donativo a fondos no deducibles. Los donantes ven el mismo bloque de recibo cuando imprimen su propio estado de cuenta desde B1.church.

## Lo que los miembros ven en B1.church {#what-members-see-in-b1church}

La misma sección **Giving** de la configuración controla lo que los miembros ven en su propia página de donaciones en B1.church:

- **Member Giving History** determina qué años pueden ver los miembros. **All years** es la opción predeterminada. **Through 2025** (o cualquier otro año) se detiene en ese año, así que los miembros no pueden ver ni imprimir un año posterior hasta que usted lo permita. Use esta opción para retener el año en curso mientras termina las correcciones y los reembolsos. **Hidden** elimina por completo el historial de donaciones, los totales anuales y la impresión de estados de cuenta. Los miembros siguen pudiendo dar.
- **Giving Note** es un mensaje breve que se muestra en la página de donaciones del miembro y en su historial, y se imprime al pie de cada estado de cuenta, incluidos los que imprime desde esta página. Úselo para cosas como su política de reembolsos.

Estas opciones solo cambian lo que ven los miembros. Usted puede seguir imprimiendo cualquier año desde esta página.

## Próximos pasos

Si necesita revisar los detalles de las donaciones antes de generar los estados de cuenta, visite la página de [Informes de donaciones](donation-reports.md) o consulte los [lotes](batches.md) individuales.
