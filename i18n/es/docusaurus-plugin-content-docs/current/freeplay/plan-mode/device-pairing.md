---
title: "Emparejar tu dispositivo"
---

# Emparejar tu dispositivo

<div class="article-intro">

Para usar el modo plan, necesitas emparejar tu TV con un tipo de plan en B1 Admin. FreePlay genera un código de emparejamiento único que vincula el dispositivo al plan de tu iglesia, lo que permite la entrega automática de contenido cada semana.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala e inicia FreePlay -- consulta [Primeros pasos](../getting-started/)
- Elige **Pair to Plan** en la [pantalla de modo de emparejamiento](../getting-started/pairing-modes.md)
- Ten acceso a **B1 Admin** en una computadora o teléfono para completar el emparejamiento

</div>

## Generar el código de emparejamiento

1. En la pantalla **Select Pairing Mode**, elige **Pair to Plan**
2. FreePlay contacta al servidor y genera un código de emparejamiento corto
3. El código aparece en caracteres grandes en el centro de la pantalla
4. Debajo del código, un indicador pulsante muestra **Waiting for connection**

El código se muestra en caracteres individuales para facilitar la lectura desde el otro lado de la sala.

## Ingresar el código en B1 Admin

1. En una computadora o teléfono, ve a la dirección que se muestra debajo del código en la TV (o escanea el código QR en pantalla); esto abre la página **Authorize Device** en B1 Admin
2. Ingresa el código de emparejamiento si no se completó automáticamente desde el código QR
3. En **Show Plans For**, elige el tipo de plan que quieres que siga esta pantalla (por ejemplo, "Sunday Service"). Déjalo en **None** si solo quieres que la pantalla esté disponible para explorar contenido o notificaciones, sin ningún plan vinculado
4. Aprueba el dispositivo

FreePlay consulta al servidor cada pocos segundos para verificar si el emparejamiento se ha completado. Una vez que **B1 Admin** confirma la conexión, la TV pasa automáticamente a la pantalla de descarga del plan.

:::tip
Los dispositivos también se pueden emparejar desde **Profile → Devices → Add Device** en B1 Admin usando el mismo código; ofrece el mismo selector de tipo de plan **Show Plans For**.
:::

## Descargar el contenido del plan

Después del emparejamiento, FreePlay carga el plan actual para ese tipo de plan. Muestra:

- El nombre del plan y la fecha del servicio
- El nombre de la lección asociada (si el plan incluye contenido de lección)
- Un indicador de progreso que muestra **Downloading item X of Y**

Cuando se han descargado todos los archivos multimedia, aparece el botón **Start Plan**. Presiona **Select** en tu control remoto para comenzar la reproducción.

:::tip
El plan se actualiza automáticamente cada hora. Si el plan se actualiza durante el día, FreePlay recoge los cambios sin ninguna intervención manual.
:::

## Alternativa: buscar por nombre de iglesia

Si prefieres no usar el flujo del código de emparejamiento, puedes seleccionar **or search by church name** en la parte inferior de la pantalla de emparejamiento. Esto te lleva a la pantalla de búsqueda de iglesias, donde puedes encontrar tu iglesia y conectarte a un salón en su lugar.

## Si el emparejamiento falla

Si el código de emparejamiento no se puede generar (por ejemplo, debido a un problema de red), verás un mensaje de error con un botón **Try Again**. Asegúrate de que tu TV esté conectada a internet e inténtalo de nuevo.

:::warning
Los códigos de emparejamiento caducan después de un período determinado. Si esperas demasiado, genera un nuevo código volviendo a la pantalla de emparejamiento.
:::

## Artículos relacionados

- **[Descripción general del modo plan](./index.md)** - Comprende en qué se diferencia el modo plan del modo salón
- **[Reproducir lecciones](../classroom-mode/playing-lessons)** - Los controles del reproductor son los mismos en ambos modos
