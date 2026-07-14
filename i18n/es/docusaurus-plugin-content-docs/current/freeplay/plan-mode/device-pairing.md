---
title: "Vincular tu Dispositivo"
---

# Vincular tu Dispositivo

<div class="article-intro">

Para usar el Plan Mode, necesitas vincular tu TV con un tipo de plan en B1 Admin. FreePlay genera un código de vinculación único que enlaza el dispositivo con el plan de tu iglesia, permitiendo la entrega automática de contenido cada semana.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala e inicia FreePlay -- consulta [Primeros Pasos](../getting-started/)
- Elige **Pair to Plan** desde la [pantalla de modo de vinculación](../getting-started/pairing-modes.md)
- Ten acceso a **B1 Admin** en una computadora o teléfono para completar la vinculación

</div>

## Generar el Código de Vinculación

1. Desde la pantalla **Select Pairing Mode**, elige **Pair to Plan**
2. FreePlay contacta al servidor y genera un código de vinculación corto
3. El código aparece en caracteres grandes en el centro de la pantalla
4. Debajo del código, un indicador pulsante muestra **Waiting for connection**

El código se muestra como caracteres individuales para facilitar su lectura desde el otro lado de la sala.

## Ingresar el Código en B1 Admin

1. En una computadora o teléfono, ve a la dirección mostrada debajo del código en el TV (o escanea el código QR en pantalla) — esto abre la página **Authorize Device** en B1 Admin
2. Ingresa el código de vinculación si aún no se completó desde el código QR
3. Bajo **Show Plans For**, elige el tipo de plan que deseas que esta pantalla siga (por ejemplo, "Sunday Service"). Déjalo en **None** si solo deseas que la pantalla esté disponible para explorar contenido o notificaciones, sin ningún plan vinculado
4. Aprueba el dispositivo

FreePlay consulta el servidor cada pocos segundos, verificando si la vinculación se completó. Una vez que **B1 Admin** confirma la conexión, el TV se mueve automáticamente a la pantalla de descarga del plan.

:::tip
Los dispositivos también se pueden vincular desde **Profile → Devices → Add Device** en B1 Admin usando el mismo código -- ofrece el mismo selector de tipo de plan **Show Plans For**.
:::

## Descargar Contenido del Plan

Después de la vinculación, FreePlay carga el plan actual para ese tipo de plan. Muestra:

- El nombre del plan y la fecha del servicio
- El nombre de la lección asociada (si el plan incluye contenido de lección)
- Un indicador de progreso que muestra **Downloading item X of Y**

Cuando todos los archivos multimedia estén descargados, aparece el botón **Start Plan**. Presiona **Select** en tu control remoto para comenzar la reproducción.

:::tip
El plan se actualiza automáticamente cada hora. Si el plan se actualiza durante el día, FreePlay recoge los cambios sin ninguna intervención manual.
:::

## Alternativa: Buscar por Nombre de Iglesia

Si prefieres no usar el flujo de código de vinculación, puedes seleccionar **or search by church name** en la parte inferior de la pantalla de vinculación. Esto te lleva a la pantalla de búsqueda de iglesia donde puedes encontrar tu iglesia y conectarte a un aula en su lugar.

## Si la Vinculación Falla

Si el código de vinculación no se puede generar (por ejemplo, debido a un problema de red), verás un mensaje de error con un botón **Try Again**. Asegúrate de que tu TV esté conectado a internet e inténtalo de nuevo.

:::warning
Los códigos de vinculación expiran después de un período determinado. Si esperas demasiado tiempo, genera un nuevo código regresando a la pantalla de vinculación.
:::

## Artículos Relacionados

- **[Plan Mode Overview](./index.md)** - Comprender cómo el Plan Mode se diferencia del Classroom Mode
- **[Playing Lessons](../classroom-mode/playing-lessons)** - Los controles del reproductor son los mismos en ambos modos
