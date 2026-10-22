---
title: "Señalización digital"
---

# Señalización digital

<div class="article-intro">

Envía el contenido de tus lecciones a un televisor del vestíbulo o de un pasillo mediante un feed de señalización digital. Cada tipo de plan tiene una URL de feed que siempre muestra el contenido del plan actual, así que no hay nada que actualizar semana tras semana. Si tus televisores usan FreePlay, puedes programar el tipo de plan en ellos desde FreePlay Admin.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Configura un [tipo de plan](./plans.md) con [Lessons.church](../../b1-church/content/lessons.md) o con otro contenido de lecciones programado
- Ten una cuenta de [SignPresenter](https://www.signpresenter.com) y un dispositivo configurado para mostrarla, o un televisor con [FreePlay](../../freeplay/)

</div>

## Obtener la URL del feed

1. Ve a **Serving**, selecciona el ministerio que contiene tu tipo de plan y haz clic en el tipo de plan para abrirlo.
2. Haz clic en **Digital Signage** (el ícono de televisor) en la parte superior de la página del tipo de plan.
3. En el cuadro de diálogo **Digital Signage Feed**, haz clic en el botón de copiar junto a **Feed Url**.

:::info
La URL del feed está vinculada al tipo de plan, no a un plan específico. Se actualiza automáticamente con el plan que esté programado como actual para ese tipo de plan, así que solo necesitas configurarlo una vez.
:::

## Conectar con SignPresenter

El feed está diseñado para funcionar con [SignPresenter](https://www.signpresenter.com), una aplicación de señalización digital de terceros. Pega la URL copiada en SignPresenter como un feed externo para mostrar el contenido actual de tus lecciones en una pantalla conectada.

Para la configuración paso a paso dentro de SignPresenter, consulta [la guía de Lessons.church de SignPresenter](https://support.signpresenter.com/topics/lessons-dot-church.html). El cuadro de diálogo también enlaza a estas instrucciones.

## Usar televisores de FreePlay en su lugar

Si tus pantallas usan [FreePlay](../../freeplay/), no necesitas la URL del feed. El cuadro de diálogo **Digital Signage Feed** enlaza a **admin.freeplay.church/calendar**, donde puedes programar este tipo de plan en tus televisores de FreePlay:

1. Haz clic en el enlace **admin.freeplay.church/calendar** del cuadro de diálogo. FreePlay Admin usa el mismo inicio de sesión que B1 Admin.
2. Elige el grupo de pantallas de tus televisores y haz clic en **Add schedule**.
3. En **Play**, elige tu tipo de plan en **Service plans**. Está marcado como **(current plan)**.
4. Configura los días y las horas, y luego haz clic en **Save**.

Los televisores reproducen cada semana el plan actual de ese tipo de plan, a las horas que configuraste. Esto también funciona con las lecciones de Go Curriculum, incluidos los planes que hayas personalizado. FreePlay inicia sesión con la cuenta de Go Curriculum vinculada al ministerio en **Content Providers** (consulta [Programar lecciones](./scheduling-lessons.md)), o con la conexión de Go Curriculum de la iglesia si el ministerio no tiene una. Consulta [Programar el calendario](../../freeplay/scheduled-mode/scheduling-the-calendar) para ver todas las opciones, y [Vincular una pantalla](../../freeplay/scheduled-mode/pairing-a-screen) para agregar un televisor.

:::note
La URL del feed no incluye el contenido multimedia de Go Curriculum, porque ese contenido requiere el inicio de sesión de Go Curriculum de tu iglesia. Para mostrar una lección de Go Curriculum en un televisor del vestíbulo o de un salón, usa FreePlay.
:::

## Próximos pasos

- Administra los planes que alimentan esta pantalla de señalización en la página de [Plans](./plans.md)
- Programa el contenido con [Lessons.church](./scheduling-lessons.md)
- Coloca los televisores de FreePlay en un calendario con el [modo programado](../../freeplay/scheduled-mode/)
