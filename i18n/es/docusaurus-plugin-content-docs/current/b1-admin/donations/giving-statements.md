---
title: "Estados de donaciones"
---

# Estados de donaciones

<div class="article-intro">

Al final de cada año, tus donantes necesitan un resumen de sus donaciones deducibles de impuestos para sus registros. B1 Admin facilita generar estos estados para todos los donantes a la vez, lo que te ahorra horas de trabajo manual.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Verifica que tus [fondos](funds.md) estén marcados correctamente como **Tax Deductible**: solo las donaciones a fondos deducibles de impuestos aparecen en los estados
- Asegúrate de que todas las donaciones se hayan [registrado](recording-donations.md) y que las transacciones en línea se hayan [importado desde Stripe](stripe-import.md)

</div>

## Acceder a los estados de donaciones

1. En **B1 Admin**, abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda) y expande **Donations**.
2. Haz clic en **Giving Statements**. Se abre la página **Batch Giving Statements**.

## Generar los estados

1. En el panel **Select Year**, elige el **Year** en el menú desplegable. Puedes elegir el año en curso o cualquiera de los cinco años anteriores.
2. La página solo carga las donaciones con fecha dentro de ese año (del 1 de enero al 31 de diciembre), así que se abre rápido aunque tu iglesia tenga muchos años de historial de donaciones. Al elegir otro año, el resumen se actualiza con las donaciones de ese año. El panel **Summary** debajo del año muestra estadísticas de ese año, incluyendo:
   - **Total Donors**: el número de personas que dieron
   - **Total Donations**: el número de registros de donación individuales
   - **Total Amount**: el monto total en dólares de todas las donaciones

## Descargar los estados

El panel **Download Options** te ofrece dos opciones para entregar los estados a tus donantes:

### Descargar como archivos CSV

En **Individual CSV Files**, haz clic en **Download ZIP** para descargar un archivo ZIP que contiene un archivo CSV individual por cada donante. Esto es útil si quieres enviar los estados por correo electrónico uno por uno o importarlos a otro sistema.

### Imprimir todos los estados

En **Printable Statements**, haz clic en **Print All** (el botón muestra el número de estados) para abrir en tu navegador una vista imprimible del estado de cada donante para el año seleccionado. Desde ahí, usa la función de impresión de tu navegador para enviarlos a una impresora. Cada estado comienza en una página nueva, listo para doblar y enviar por correo, y los estados se ordenan por apellido y luego por nombre del donante.

Si subiste un **Light Background Logo** en [Website > Appearance](../website/appearance.md), se imprime centrado en la parte superior de cada estado, encima del título. Esto aplica tanto a **Print All** como a un estado individual impreso desde el registro de un donante.

:::tip
Genera tus estados a principios de enero, mientras tus registros están frescos. Verifica bien que tus fondos estén marcados correctamente como deducibles de impuestos antes de generar los estados: solo se incluyen las donaciones a fondos deducibles.
:::

:::info
Los estados de donaciones solo incluyen las donaciones asignadas a fondos que tienen activada la configuración **Tax Deductible**. Si un fondo no está marcado como deducible de impuestos, sus donaciones no aparecerán en el estado. Puedes administrar esta configuración en la página [Fondos](funds.md).
:::

## Formatos de recibo para Canadá, Australia y Nueva Zelanda

Las iglesias fuera de Estados Unidos pueden cambiar el estado al formato oficial de recibo de su país. Haz clic en **Statement format** en la parte superior de la página Giving Statements (o ve a **Settings** y abre la sección **Giving**), y establece **Statement Format** en **Canada**, **Australia** o **New Zealand**. Luego completa los campos que aparecen: tu número de registro (número de registro de la CRA, ABN o número de registro de organización benéfica de Nueva Zelanda), la dirección de tu organización, el nombre de la persona autorizada para firmar los recibos y, en el caso de Canadá, la ciudad donde se emiten los recibos.

Los estados incluyen entonces el texto que exige tu autoridad tributaria (en Canadá, "Official Receipt for Income Tax Purposes" con la referencia de la CRA), un número de recibo con el formato `YEAR-DONORID`, el monto elegible contado solo a partir de fondos deducibles de impuestos y una línea aparte para los regalos a fondos no deducibles. Los donantes ven el mismo bloque de recibo cuando imprimen su propio estado desde B1.church.

## Lo que los miembros ven en B1.church

La misma sección de configuración **Giving** controla lo que los miembros ven en su propia página de donaciones en B1.church:

- **Member Giving History** determina qué años pueden ver los miembros. **All years** es el valor predeterminado. **Through 2025** (o cualquier otro año) se detiene en ese año, así que los miembros no pueden ver ni imprimir un año posterior hasta que lo permitas. Usa esta opción para retener el año en curso mientras terminas las correcciones y los reembolsos. **Hidden** elimina por completo el historial de donaciones, los totales anuales y la impresión de estados. Los miembros pueden seguir donando.
- **Giving Note** es un mensaje breve que se muestra en la página de donaciones del miembro y en su historial, y se imprime al pie de cada estado de donaciones, incluidos los que imprimes aquí. Úsalo para cosas como tu política de reembolsos.

Estas configuraciones solo cambian lo que ven los miembros. Desde esta página puedes seguir imprimiendo cualquier año.

## Siguientes pasos

Si necesitas revisar los detalles de las donaciones antes de generar los estados, visita la página [Informes de donaciones](donation-reports.md) o revisa los [lotes](batches.md) individuales.
