---
title: "Estados de Contribuciones"
---

# Estados de Contribuciones

<div class="article-intro">

Al final de cada año, tus donantes necesitan un resumen de sus contribuciones deducibles de impuestos para sus registros. B1 Admin hace fácil generar estos estados para todos los donantes a la vez, ahorrándote horas de trabajo manual.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Verifica que tus [fondos](funds.md) están correctamente marcados como **Deducibles de Impuestos** -- solo las donaciones a fondos deducibles de impuestos aparecen en estados
- Asegúrate de que todas las donaciones han sido [registradas](recording-donations.md) y que cualquier transacción en línea ha sido [importada desde Stripe](stripe-import.md)

</div>

## Accediendo a Estados de Contribuciones

1. En **B1 Admin**, abre el [menú Salto](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda) y expande **Donaciones**.
2. Haz clic en **Estados de Contribuciones**.

## Generando Estados

1. Selecciona el **año** del menú desplegable en la parte superior de la página. Puedes elegir el año actual o cualquiera de los cinco años anteriores.
2. La página muestra estadísticas de resumen para ese año, incluyendo:
   - **Donantes totales** -- el número de personas que dieron
   - **Donaciones totales** -- el número de registros de donación individuales
   - **Monto total** -- la cantidad combinada en dólares de todas las contribuciones

## Descargando Estados

Tienes dos opciones para enviar estados a tus donantes:

### Descargar como Archivos CSV

Haz clic en **Descargar ZIP** para descargar un archivo ZIP que contiene un archivo CSV individual para cada donante. Esto es útil si deseas enviar estados por correo electrónico individualmente o importarlos en otro sistema.

### Imprimir Todos los Estados

Haz clic en **Imprimir Todo** para abrir una vista imprimible de la declaración de cada donante en tu navegador. Desde allí, usa la función de impresión de tu navegador para enviarlos a una impresora. Cada estado comienza en una nueva página para que estén listos para doblar y enviar por correo.

:::tip
Ejecuta tus estados a principios de enero mientras tus registros están frescos. Verifica que tus fondos estén correctamente marcados como deducibles de impuestos antes de generar estados -- solo las donaciones a fondos deducibles de impuestos se incluyen.
:::

:::info
Los estados de contribuciones solo incluyen donaciones asignadas a fondos que tienen la configuración **Deducible de Impuestos** habilitada. Si un fondo no está marcado como deducible de impuestos, sus donaciones no aparecerán en el estado. Puedes administrar esta configuración en la página [Fondos](funds.md).
:::

## Formatos de Recepción para Canadá, Australia y Nueva Zelanda

Las iglesias fuera de los Estados Unidos pueden cambiar la declaración al diseño oficial de recepción de su país. Ve a **Configuración**, abre la sección **Donaciones**, y establece **Formato de Estado** a **Canadá**, **Australia** o **Nueva Zelanda**, luego completa los campos que aparecen: tu número de registro (número de registro CRA, ABN o número de registro de caridad de NZ), la dirección de tu organización, el nombre de la persona autorizada para firmar recibos, y para Canadá la ciudad donde se emiten los recibos.

Los estados luego llevan la redacción que tu autoridad fiscal espera (para Canadá, "Recepción Oficial para Propósitos de Impuestos sobre la Renta" con la referencia CRA), un número de recepción en la forma `AÑO-IDDONANTE`, la cantidad elegible contada solo desde fondos deducibles de impuestos, y una línea separada para cualquier regalo a fondos no deducibles. Los donantes ven el mismo bloque de recepción cuando imprimen su propio estado desde B1.church.

## Próximos Pasos

Si necesitas revisar detalles de donación antes de generar estados, visita la página [Reportes de Donaciones](donation-reports.md) o verifica [lotes](batches.md) individuales.
