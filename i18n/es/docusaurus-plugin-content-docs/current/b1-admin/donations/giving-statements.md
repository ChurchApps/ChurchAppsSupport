---
title: "Declaraciones de Ofrendas"
---

# Declaraciones de Ofrendas

<div class="article-intro">

Al final de cada año, tus donantes necesitan un resumen de sus ofrendas deducibles de impuestos para sus registros. B1 Admin hace que sea fácil generar estas declaraciones para todos los donantes a la vez, ahorrándote horas de trabajo manual.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Verifica que tus [fondos](funds.md) estén correctamente marcados como **Deducible de Impuestos** -- solo las donaciones a fondos deducibles de impuestos aparecen en las declaraciones
- Asegúrate de que todas las donaciones hayan sido [registradas](recording-donations.md) y cualquier transacción en línea haya sido [importada desde Stripe](stripe-import.md)

</div>

## Accediendo a las Declaraciones de Ofrendas

1. En **B1 Admin**, abre el **menú de sección** en la esquina superior izquierda y elige **Donaciones**.
2. Haz clic en **Declaraciones**.

## Generando Declaraciones

1. Selecciona el **año** del menú desplegable en la parte superior de la página. Puedes elegir el año actual o cualquiera de los cinco años anteriores.
2. La página muestra estadísticas de resumen para ese año, incluyendo:
   - **Total de donantes** -- el número de personas que dieron
   - **Total de donaciones** -- el número de registros de donación individuales
   - **Cantidad total** -- la cantidad combinada en dólares de todas las ofrendas

## Descargando Declaraciones

Tienes dos opciones para obtener declaraciones a tus donantes:

### Descargar como Archivos CSV

Haz clic en **Descargar ZIP** para descargar un archivo ZIP que contiene un archivo CSV individual para cada donante. Esto es útil si deseas enviar declaraciones por correo electrónico individualmente o importarlas en otro sistema.

### Imprimir Todas las Declaraciones

Haz clic en **Imprimir Todo** para abrir una vista imprimible de la declaración de cada donante en tu navegador. Desde allí, usa la función de impresión de tu navegador para enviarlas a una impresora. Cada declaración comienza en una página nueva para que estén listas para plegar y enviar por correo.

:::tip
Ejecuta tus declaraciones temprano en enero mientras tus registros están frescos. Verifica dos veces que tus fondos estén correctamente marcados como deducibles de impuestos antes de generar declaraciones -- solo las donaciones a fondos deducibles de impuestos se incluyen.
:::

:::info
Las declaraciones de ofrendas solo incluyen donaciones asignadas a fondos que tienen habilitada la configuración de **Deducible de Impuestos**. Si un fondo no está marcado como deducible de impuestos, sus donaciones no aparecerán en la declaración. Puedes gestionar esta configuración en la página de [Fondos](funds.md).
:::

## Formatos de Recibo para Canadá, Australia y Nueva Zelanda

Las iglesias fuera de Estados Unidos pueden cambiar la declaración al formato oficial de recibo de su país. Ve a **Configuración**, abre la sección de **Ofrendas**, y establece **Formato de Declaración** a **Canadá**, **Australia** o **Nueva Zelanda**, luego completa los campos que aparecen: tu número de registro (número de registro CRA, ABN o número de registro de caridad de Nueva Zelanda), la dirección de tu organización, el nombre de la persona autorizada para firmar recibos, y para Canadá la ciudad donde se emiten los recibos.

Las declaraciones entonces llevan la redacción que tu autoridad fiscal espera (para Canadá, "Recibo Oficial para Propósitos de Impuesto sobre la Renta" con la referencia CRA), un número de recibo en la forma `AÑO-IDDONANTE`, la cantidad elegible contada solo desde fondos deducibles de impuestos, y una línea separada para cualquier ofrenda a fondos no deducibles. Los donantes ven el mismo bloque de recibo cuando imprimen su propia declaración desde B1.church.

## Próximos Pasos

Si necesitas revisar detalles de donaciones antes de generar declaraciones, visita la página de [Reportes de Donaciones](donation-reports.md) o verifica [lotes](batches.md) individuales.
