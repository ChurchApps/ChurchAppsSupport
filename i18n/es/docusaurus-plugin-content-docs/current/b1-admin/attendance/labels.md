---
title: "Diseñador de Etiquetas de Registro"
---

# Diseñador de Etiquetas de Registro

<div class="article-intro">

El Diseñador de Etiquetas le permite crear y personalizar las plantillas de etiquetas de nombres y comprobantes de recogida que se imprimen cuando las familias registran a sus hijos. Puede controlar exactamente qué información aparece en cada etiqueta, dónde se posiciona y cómo se ve.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure [Attendance](setup) y configure al menos un horario de servicio con registro habilitado
- Configure [Check-In](check-in) para que se impriman las etiquetas
- Necesita acceso administrativo a la sección Attendance

</div>

## Abriendo el Diseñador de Etiquetas

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda), expanda **Mobile**, y haga clic en **B1 CheckIn**. Luego haga clic en el botón **Design Labels** en la tarjeta Check-in Labels. Verá una lista de sus plantillas de etiquetas guardadas, separadas por tipo: **Nametag** y **Pickup Slip**.

## Tipos de Etiquetas

- **Nametag** — impreso y adherido al niño. Generalmente incluye el nombre del niño, su aula/sesión y un código de seguridad.
- **Pickup Slip** — entregado al padre o tutor. Generalmente incluye el código de seguridad y una lista de los niños que registró.

B1 comienza con una plantilla de etiqueta de nombre predeterminada y una plantilla de comprobante de recogida predeterminada de tamaño de 3.5 x 1.1 pulgadas.

## Crear una Plantilla de Etiqueta

1. Haga clic en **Add** y elija un punto de partida del menú: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"**, o **Blank**.
2. Una nueva plantilla se abre en el editor de etiquetas.

### Editor de Etiquetas

El editor muestra una vista previa a escala de la etiqueta en el tamaño configurado. En el panel izquierdo puede configurar:

- **Name** — el nombre de la plantilla (solo para su referencia)
- **Label Type** — Nametag o Pickup Slip
- **Width / Height** — tamaño de la etiqueta en pulgadas

### Añadiendo Bloques

Una etiqueta se construye a partir de bloques — piezas individuales de contenido posicionadas en el lienzo de la etiqueta. Haga clic en **Add Block** para insertar un nuevo bloque y elegir su tipo:

- **Field** — extrae un valor de datos en tiempo de impresión:
  - `person.displayName` — nombre completo de la persona
  - `sessions` — el servicio/aula en el que se registró
  - `securityCode` — código de seguridad de recogida generado aleatoriamente
  - `children` — lista de niños (para comprobantes de recogida)
  - `person.nametagNotes` — cualquier nota especial en el registro de la persona
  - `person.isBirthdayWeek` — verdadero si el cumpleaños de la persona (mes y día) está dentro de 3 días antes o después de la fecha de registro
  - `campus` — nombre del campus
- **Text** — texto estático que escribe (para encabezados, etiquetas o instrucciones)
- **Barcode** — código de barras que codifica el código de seguridad

### Posicionamiento de Bloques

Cada bloque tiene campos **X**, **Y**, **Width** y **Height** expresados como porcentajes del lienzo de la etiqueta (0-100). Ajuste estos para posicionar contenido con precisión. También puede configurar:

- **Font Size** — tamaño del texto en puntos
- **Bold** — alterna texto en negrita
- **Align** — alineación del texto a la izquierda, centro o derecha
- **Condition** — opcionalmente oculta el bloque si un campo está vacío (por ejemplo, solo muestra nametagNotes si tiene un valor). Esto también funciona con `person.isBirthdayWeek` para mostrar un gráfico o texto de cumpleaños solo en etiquetas de nombres para niños cuyo cumpleaños está a unos pocos días del registro.

### Guardando

Haga clic en **Save** para guardar la plantilla. La plantilla actualizada se usará la próxima vez que se impriman etiquetas en B1 Checkin.

## Reordenando Plantillas

Si tiene múltiples plantillas de etiqueta de nombre o comprobante de recogida, B1 Checkin usará la primera plantilla en la lista de forma predeterminada. Arrastre plantillas para reordenarlas.

## Eliminar una Plantilla

Haga clic en el icono de eliminación en cualquier fila de plantilla y confirme. Eliminar la última plantilla de un tipo restaura la plantilla predeterminada integrada.

:::tip
Haga una impresión de prueba después de editar una plantilla para confirmar que el diseño se ve bien antes de su próximo servicio.
:::

## Artículos Relacionados

- [Configuración de Registro](setup) — configure servicios y grupos para registro
- [Completando Registro](check-in) — el flujo de registro para familias
- [Iniciando B1 Checkin](../../b1-checkin/getting-started/) — la aplicación de quiosco Checkin
