---
title: "Diseñador de etiquetas de registro de entrada"
description: "Personalice las plantillas de credenciales y comprobantes de recogida que se imprimen en el registro de entrada en B1 Admin, incluidos los campos, la posición y las condiciones de cumpleaños o notas."
---

# Diseñador de etiquetas de registro de entrada

<div class="article-intro">

El Diseñador de etiquetas le permite crear y personalizar las plantillas de credenciales y comprobantes de recogida que se imprimen cuando las familias registran a sus hijos. Puede controlar exactamente qué información aparece en cada etiqueta, dónde se posiciona y cómo se ve.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configure la [Asistencia](./setup.md) y habilite al menos un horario de servicio con registro de entrada
- Configure el [Registro de entrada](./check-in.md) para que las etiquetas se impriman
- Necesita el permiso **Editar asistencia**

</div>

## Abrir el Diseñador de etiquetas {#opening-the-label-designer}

En B1 Admin, abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), despliegue **Móvil** y haga clic en **Etiquetas**. También puede hacer clic en **B1 CheckIn** y luego en **Diseñar etiquetas** en la tarjeta **Etiquetas de registro de entrada**.

La página **Etiquetas de registro de entrada** muestra sus plantillas guardadas con su **Nombre**, **Tipo** (**Credencial** o **Comprobante de recogida**) y **Tamaño**. Si todavía no ha creado ninguna, aparece el texto **No hay plantillas de etiquetas**, y B1 Checkin imprime su credencial y comprobante de recogida integrados.

## Tipos de etiqueta {#label-types}

- **Credencial**: se imprime y se coloca en el niño. Normalmente incluye el nombre del niño, su aula o sesión y un código de seguridad.
- **Comprobante de recogida**: se entrega al padre o tutor. Normalmente incluye el código de seguridad y una lista de los niños que registró.

Ambas plantillas iniciales están dimensionadas para etiquetas térmicas estándar de 3.5 × 1.1 pulgadas (Brother DK-1201).

## Crear una plantilla de etiqueta {#creating-a-label-template}

1. Haga clic en **Añadir etiqueta** y elija un punto de partida: **Credencial 3.5" x 1.1"**, **Comprobante de recogida 3.5" x 1.1"** o **En blanco**.
2. La plantilla se abre en el editor de etiquetas, con una vista previa de la etiqueta llena con datos de ejemplo.

### Editor de etiquetas {#label-editor}

En la parte superior del editor puede configurar:

- **Nombre**: el nombre de la plantilla (solo para su referencia; obligatorio)
- **Tipo**: Credencial o Comprobante de recogida
- **Ancho (in)** / **Alto (in)**: tamaño de la etiqueta en pulgadas

### Añadir bloques {#adding-blocks}

Una etiqueta se compone de bloques: piezas individuales de contenido colocadas en la etiqueta. Haga clic en un botón del panel **Añadir bloque** para agregar uno:

- **Campos**: toman un valor en el momento de imprimir. Las credenciales ofrecen **Nombre para mostrar**, **Nombre**, **Apellido**, **Apodo**, **Notas de la credencial** (las notas del registro de la persona), **Cumpleaños esta semana** (verdadero cuando el cumpleaños de la persona cae dentro de los 3 días antes o después de la fecha de registro), **Sesiones** (los horarios de servicio y salas en los que se registraron), **Código de seguridad**, **Fecha** y **Nombre de la iglesia**. Los comprobantes de recogida ofrecen **Niños**, **Niños y alergias**, **Código de seguridad**, **Fecha** y **Nombre de la iglesia**.
- **Texto**: texto fijo que usted escribe (para títulos, etiquetas o instrucciones)
- **Código de barras**: un código de barras Code 128 o Code 39 de un campo, como el código de seguridad
- **Código QR**: un código QR de un campo
- **Caja**: un rectángulo con color de relleno y borde opcionales

### Posicionar y dar estilo a los bloques {#positioning-and-styling-blocks}

Arrastre un bloque en la etiqueta para moverlo, o haga clic en él y use el panel **Propiedades**. **X**, **Y**, **A** (ancho) y **H** (alto) son porcentajes de la etiqueta (0-100). Según el bloque, también puede configurar:

- **Tamaño de fuente**: tamaño del texto, en relación con la altura de la etiqueta
- **Negrita** y **Cursiva**
- **Alineación**: Izquierda, Centro o Derecha
- **Simbología** y **Valor**: para códigos de barras y códigos QR
- **Relleno** y **Borde**: para cajas
- **Condición**: **Siempre** muestra el bloque. Elija un campo para mostrar el bloque solo cuando ese campo **No está vacío**, **Está vacío**, **Es igual a** o **No es igual a** un valor. Por ejemplo, muestre las notas de la credencial solo cuando estén completadas, o muestre un gráfico de cumpleaños solo cuando **Cumpleaños esta semana** sea igual a `true`.

Haga clic en **Eliminar bloque** para borrar el bloque seleccionado.

### Guardar {#saving}

Haga clic en **Guardar** para guardar la plantilla, o en **Cancelar** para descartar sus cambios. B1 Checkin usa la plantilla actualizada la próxima vez que cargue su configuración.

## Elegir la plantilla predeterminada {#choosing-the-default-template}

Si tiene más de una plantilla del mismo tipo, haga clic en **Establecer como predeterminada** en la que B1 Checkin debe imprimir. Aparecerá una insignia **Predeterminada**, y cualquier otra plantilla de ese tipo deja de ser la predeterminada. Si ninguna plantilla de un tipo está marcada como predeterminada, el quiosco usa la primera.

## Eliminar una plantilla {#deleting-a-template}

Haga clic en **Eliminar** en la fila de la plantilla y confirme. Si elimina todas las plantillas de un tipo, B1 Checkin vuelve a la etiqueta integrada para ese tipo.

:::tip
Haga una impresión de prueba después de editar una plantilla para confirmar que el diseño se ve bien antes de su próximo servicio.
:::

## Artículos relacionados {#related-articles}

- [Configuración de asistencia](./setup.md): configure los servicios y grupos para el registro de entrada
- [Registro de entrada](./check-in.md): configure el quiosco de B1 Checkin
- [Introducción a B1 Checkin](../../b1-checkin/getting-started/index.md): la app del quiosco de registro de entrada
