---
title: "Diseñador de Etiquetas de Registración"
---

# Diseñador de Etiquetas de Registración

<div class="article-intro">

El Diseñador de Etiquetas te permite crear y personalizar las plantillas de identificador de nombre y recibo de recogida que se imprimen cuando las familias registran a sus niños. Puedes controlar exactamente qué información aparece en cada etiqueta, dónde se posiciona y cómo se ve.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configura [Asistencia](setup) y configura al menos un horario de servicio con registración habilitada
- Configura [Registración](check-in) para que las etiquetas se impriman
- Necesitas acceso administrativo a la sección Asistencia

</div>

## Abrir el Diseñador de Etiquetas

En B1 Admin, haz clic en el **menú de sección** en la esquina superior izquierda (el nombre de la sección actual con la flecha pequeña al lado) y elige **Móvil**. En la barra de navegación, selecciona **B1 CheckIn**, luego haz clic en el botón **Diseñar Etiquetas** en la tarjeta de Etiquetas de Registración. Verás una lista de tus plantillas de etiquetas guardadas, separadas por tipo: **Identificador** y **Recibo de Recogida**.

## Tipos de Etiquetas

- **Identificador** — impreso y adherido al niño. Típicamente incluye el nombre del niño, su aula/sesión y un código de seguridad.
- **Recibo de Recogida** — dado al padre o tutor. Típicamente incluye el código de seguridad y una lista de los niños que registraron.

B1 te proporciona una plantilla de identificador predeterminada y una plantilla de recibo de recogida predeterminada dimensionadas para etiquetas térmicas estándar de 3.5 × 1.1 pulgadas.

## Crear una Plantilla de Etiqueta

1. Haz clic en **Agregar Identificador** o **Agregar Recibo de Recogida** (o usa el menú desplegable para elegir).
2. Una nueva plantilla se abre en el editor de etiquetas.

### Editor de Etiquetas

El editor muestra una vista previa escalada de la etiqueta en el tamaño configurado. En el panel izquierdo puedes configurar:

- **Nombre** — el nombre de la plantilla (solo para tu referencia)
- **Tipo de Etiqueta** — Identificador o Recibo de Recogida
- **Ancho / Alto** — tamaño de etiqueta en pulgadas

### Agregar Bloques

Una etiqueta se construye a partir de bloques — piezas individuales de contenido posicionadas en el lienzo de etiqueta. Haz clic en **Agregar Bloque** para insertar un nuevo bloque y elige su tipo:

- **Campo** — extrae un valor de datos en tiempo de impresión:
  - `person.displayName` — nombre completo de la persona
  - `sessions` — el servicio/aula en el que se registraron
  - `securityCode` — el código de seguridad de recogida generado aleatoriamente
  - `children` — lista de niños (para recibos de recogida)
  - `person.nametagNotes` — cualquier nota especial en el registro de la persona
  - `campus` — el nombre de la sede
- **Texto** — texto estático que escribes (para títulos, etiquetas o instrucciones)
- **Código de Barras** — un código de barras que codifica el código de seguridad

### Posicionar Bloques

Cada bloque tiene campos **X**, **Y**, **Ancho** y **Alto** expresados como porcentajes del lienzo de etiqueta (0–100). Ajusta estos para posicionar contenido con precisión. También puedes establecer:

- **Tamaño de Fuente** — tamaño de texto en puntos
- **Negrita** — alternar texto en negrita
- **Alineación** — alineación de texto izquierda, centro o derecha
- **Condición** — opcionalmente oculta el bloque si un campo está vacío (por ejemplo, solo mostrar nametagNotes si tiene un valor)

### Guardar

Haz clic en **Guardar** para guardar la plantilla. La plantilla actualizada se usará la próxima vez que se impriman etiquetas en B1 Checkin.

## Reordenar Plantillas

Si tienes múltiples plantillas de identificador o recibo de recogida, B1 Checkin usará la primera plantilla en la lista de forma predeterminada. Arrastra las plantillas para reordenarlas.

## Eliminar una Plantilla

Haz clic en el icono de eliminar en cualquier fila de plantilla y confirma. Eliminar la última plantilla de un tipo restaura la plantilla predeterminada incorporada.

:::tip
Haz una prueba de impresión después de editar una plantilla para confirmar que el diseño se ve bien antes de tu próximo servicio.
:::

## Artículos Relacionados

- [Configuración de Registración](setup) — configura servicios y grupos para registración
- [Completar Registración](check-in) — el flujo de registración para familias
- [Inicio Rápido de B1 Checkin](../../b1-checkin/getting-started/) — la aplicación de quiosco Checkin
