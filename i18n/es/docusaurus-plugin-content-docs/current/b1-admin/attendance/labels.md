---
title: "Diseñador de Etiquetas de Registro"
---

# Diseñador de Etiquetas de Registro

<div class="article-intro">

El Diseñador de Etiquetas le permite crear y personalizar las plantillas de pulseras y comprobantes de recogida que se imprimen cuando las familias registran a sus hijos. Puede controlar exactamente qué información aparece en cada etiqueta, dónde se posiciona y cómo se ve.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configure [Asistencia](setup) y configure al menos una hora de servicio con el registro habilitado
- Configure [Registro](check-in) para que las etiquetas se impriman
- Necesita acceso administrativo a la sección Asistencia

</div>

## Abrir el Diseñador de Etiquetas

En B1 Admin, vaya a **Asistencia** en la barra lateral izquierda y seleccione **Etiquetas**. Verá una lista de sus plantillas de etiquetas guardadas, separadas por tipo: **Pulsera** y **Comprobante de Recogida**.

## Tipos de Etiqueta

- **Pulsera** — se imprime y se adhiere al niño. Típicamente incluye el nombre del niño, su aula/sesión y un código de seguridad.
- **Comprobante de Recogida** — se entrega al padre o tutor. Típicamente incluye el código de seguridad y una lista de los niños que registró.

B1 le proporciona una plantilla de pulsera predeterminada y una plantilla de comprobante de recogida predeterminada de tamaño estándar de 3.5 × 1.1 pulgadas.

## Crear una Plantilla de Etiqueta

1. Haga clic en **Agregar Pulsera** o **Agregar Comprobante de Recogida** (o use el menú desplegable para elegir).
2. Una nueva plantilla se abre en el editor de etiquetas.

### Editor de Etiquetas

El editor muestra una vista previa escalada de la etiqueta en el tamaño configurado. En el panel izquierdo puede configurar:

- **Nombre** — el nombre de la plantilla (solo para su referencia)
- **Tipo de Etiqueta** — Pulsera o Comprobante de Recogida
- **Ancho / Alto** — tamaño de etiqueta en pulgadas

### Agregar Bloques

Una etiqueta se construye a partir de bloques: piezas de contenido individuales posicionadas en el lienzo de etiqueta. Haga clic en **Agregar Bloque** para insertar un nuevo bloque y elija su tipo:

- **Campo** — extrae un valor de datos en el momento de impresión:
  - `person.displayName` — el nombre completo de la persona
  - `sessions` — el servicio/aula en el que se registraron
  - `securityCode` — el código de seguridad de recogida generado aleatoriamente
  - `children` — lista de niños (para comprobantes de recogida)
  - `person.nametagNotes` — cualquier nota especial en el registro de la persona
  - `campus` — el nombre del campus
- **Texto** — texto estático que escriba (para encabezados, etiquetas o instrucciones)
- **Código de Barras** — un código de barras que codifica el código de seguridad

### Posicionar Bloques

Cada bloque tiene campos **X**, **Y**, **Ancho** y **Alto** expresados como porcentajes del lienzo de etiqueta (0–100). Ajuste estos para posicionar el contenido con precisión. También puede establecer:

- **Tamaño de Fuente** — tamaño de texto en puntos
- **Negrita** — alternar texto en negrita
- **Alineación** — alineación de texto izquierda, centro o derecha
- **Condición** -- opcionalmente ocultar el bloque si un campo está vacío (por ejemplo, solo mostrar nametagNotes si tiene un valor)

### Guardar

Haga clic en **Guardar** para guardar la plantilla. La plantilla actualizada se usará la próxima vez que se impriman etiquetas en B1 Checkin.

## Reordenar Plantillas

Si tiene múltiples plantillas de pulsera o comprobante de recogida, B1 Checkin usará la primera plantilla de la lista de forma predeterminada. Arrastra plantillas para reordenarlas.

## Eliminar una Plantilla

Haga clic en el icono de eliminar en cualquier fila de plantilla y confirme. Eliminar la última plantilla de un tipo restaura la plantilla integrada predeterminada.

:::tip
Realice una impresión de prueba después de editar una plantilla para confirmar que el diseño se ve bien antes de su próximo servicio.
:::

## Artículos Relacionados

- [Configuración de Registro](setup) — configure servicios y grupos para registro
- [Completar Registro](check-in) — el flujo de registro para familias
- [Introducción a B1 Checkin](../../b1-checkin/getting-started/index) — la aplicación de quiosco Checkin
