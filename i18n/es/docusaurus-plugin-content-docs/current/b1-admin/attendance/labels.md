---
title: "Diseñador de Etiquetas Check-In"
---

# Diseñador de Etiquetas Check-In

<div class="article-intro">

El Diseñador de Etiquetas te permite crear y personalizar las plantillas de gafetes de identificación y comprobantes de recogida que se imprimen cuando las familias cumplen check-in de sus hijos. Puedes controlar exactamente qué información aparece en cada etiqueta, dónde está posicionada y cómo se ve.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Configura [Asistencia](setup) y establece al menos un horario de servicio con check-in habilitado
- Configura [Check-In](check-in) para que se impriman las etiquetas
- Necesitas acceso administrativo a la sección de Asistencia

</div>

## Abriendo el Diseñador de Etiquetas

En B1 Admin, ve a **Asistencia** en la barra lateral izquierda y selecciona **Etiquetas**. Verás una lista de tus plantillas de etiquetas guardadas, separadas por tipo: **Gafete de Identificación** y **Comprobante de Recogida**.

## Tipos de Etiquetas

- **Gafete de Identificación** — impreso y colocado en el niño. Generalmente incluye el nombre del niño, su clase/sesión y un código de seguridad.
- **Comprobante de Recogida** — entregado al padre o tutor. Generalmente incluye el código de seguridad y una lista de los niños que cumplieron check-in.

B1 comienza con una plantilla de gafete de identificación predeterminada y un comprobante de recogida predeterminado ajustados para etiquetas térmicas estándar de 3,5 × 1,1 pulgadas.

## Creando una Plantilla de Etiqueta

1. Haz clic en **Agregar Gafete de Identificación** o **Agregar Comprobante de Recogida** (o usa el menú desplegable para elegir).
2. Una nueva plantilla se abre en el editor de etiquetas.

### Editor de Etiquetas

El editor muestra una vista previa escalada de la etiqueta en el tamaño configurado. En el panel izquierdo puedes configurar:

- **Nombre** — el nombre de la plantilla (solo para tu referencia)
- **Tipo de Etiqueta** — Gafete de Identificación o Comprobante de Recogida
- **Ancho / Alto** — tamaño de la etiqueta en pulgadas

### Agregando Bloques

Una etiqueta se construye a partir de bloques — piezas individuales de contenido posicionadas en el lienzo de la etiqueta. Haz clic en **Agregar Bloque** para insertar un nuevo bloque y elige su tipo:

- **Campo** — extrae un valor de datos en el momento de la impresión:
  - `person.displayName` — el nombre completo de la persona
  - `sessions` — el servicio/clase en el que cumplieron check-in
  - `securityCode` — el código de seguridad de recogida generado aleatoriamente
  - `children` — lista de niños (para comprobantes de recogida)
  - `person.nametagNotes` — notas especiales en el registro de la persona
  - `campus` — el nombre del campus
- **Texto** — texto estático que escribes (para títulos, etiquetas o instrucciones)
- **Código de Barras** — un código de barras que codifica el código de seguridad

### Posicionando Bloques

Cada bloque tiene campos **X**, **Y**, **Ancho** y **Alto** expresados como porcentajes del lienzo de la etiqueta (0–100). Ajusta estos para posicionar el contenido con precisión. También puedes establecer:

- **Tamaño de Fuente** — tamaño del texto en puntos
- **Negrita** — alternar texto en negrita
- **Alineación** — alineación del texto a la izquierda, centro o derecha
- **Condición** — opcionalmente oculta el bloque si un campo está vacío (por ejemplo, solo mostrar nametagNotes si tiene un valor)

### Guardando

Haz clic en **Guardar** para guardar la plantilla. La plantilla actualizada se usará la próxima vez que se impriman etiquetas en B1 Checkin.

## Reordenando Plantillas

Si tienes varias plantillas de gafete de identificación o comprobante de recogida, B1 Checkin usará la primera plantilla de la lista de forma predeterminada. Arrastra las plantillas para reordenarlas.

## Eliminando una Plantilla

Haz clic en el icono de eliminar en cualquier fila de plantilla y confirma. Eliminar la última plantilla de un tipo restaura la plantilla integrada predeterminada.

:::tip
Haz una prueba de impresión después de editar una plantilla para confirmar que el diseño se ve bien antes de tu próximo servicio.
:::

## Artículos Relacionados

- [Configuración de Check-In](setup) — configura servicios y grupos para check-in
- [Completando Check-In](check-in) — el flujo de check-in para familias
- [B1 Checkin Primeros Pasos](../../b1-checkin/getting-started/) — la aplicación de quiosco Checkin
