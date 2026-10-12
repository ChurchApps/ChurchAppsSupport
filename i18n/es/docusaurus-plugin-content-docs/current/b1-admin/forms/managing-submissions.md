---
title: "Administrar las respuestas"
---

# Administrar las respuestas

<div class="article-intro">

Una vez que su formulario esté activo, empezarán a llegar respuestas. La pestaña **Form Submissions** le permite revisar cada respuesta, saber quién ha enviado el formulario y usar los datos para dar seguimiento a su congregación a tiempo.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Cree un formulario](./creating-forms.md) con al menos una pregunta
- Comparta el formulario mediante su URL pública o insértelo en su [sitio web](../website/managing-pages.md)

</div>

## Ver las respuestas

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **People** y haga clic en **Forms**.
2. Haga clic en el formulario que desea revisar.
3. Vaya a la pestaña **Form Submissions**.

Verá una lista de todas las respuestas recibidas para ese formulario. Cada respuesta muestra la información de la persona y la fecha de envío, seguidas de una columna por cada pregunta del formulario. Si su formulario tiene muchas preguntas, desplácese horizontalmente por la tabla para ver el resto de las columnas.

## Revisar respuestas individuales

Haga clic en cualquier respuesta para ver todos los detalles. Verá todas las respuestas que la persona dio a cada pregunta del formulario.

Haga clic en el **icono de impresora** junto a la respuesta para imprimir las respuestas completadas de esa persona. Es útil para un archivo en papel o para una autorización firmada que necesite conservar. La impresión muestra en la parte superior el logotipo de su iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si ha subido uno), con el nombre de su iglesia debajo. Esto es distinto de [imprimir un formulario en blanco](./creating-forms.md#printing-a-blank-form): aquí se imprimen las respuestas ya enviadas por una persona, no una copia vacía. El mismo icono de impresión aparece en cualquier lugar donde se muestre una respuesta, incluido el [perfil de una persona](../people/adding-people.md#working-with-forms).

## Cambiar la persona asociada a una respuesta

Si una respuesta está vinculada a la persona equivocada (por ejemplo, dos miembros de una familia comparten una dirección de correo electrónico), puede moverla a la persona correcta o desvincularla.

1. En la pestaña **Form Submissions**, haga clic en el icono **Change person** (dos flechas) junto al nombre de la persona. El mismo icono aparece junto a una respuesta en el [perfil de una persona](../people/adding-people.md#working-with-forms).
2. En el cuadro de diálogo **Change person**, busque a la persona correcta y haga clic en **Move to this person**.
3. O bien, haga clic en **Unlink (Anonymous)** para separar la respuesta de cualquier persona. Entonces aparecerá como **Anonymous**.

Solo cambia el vínculo. Las respuestas siguen siendo las mismas, y no se vuelven a enviar correos de seguimiento.

:::info
En los formularios configurados para crear un registro de persona, cuando alguien ha iniciado sesión en el sitio de su iglesia al enviar el formulario, la respuesta se vincula a su propio registro, incluso si otra persona de su base de datos comparte su correo electrónico. Cuando [combina dos registros de personas](../people/adding-people.md), las respuestas de formularios de la persona eliminada pasan a la persona que conserva.
:::

## Cómo se recopilan las respuestas

Las respuestas pueden llegar por varios canales:

- **URL pública** -- Si su formulario tiene una URL pública (formularios Stand Alone), cualquier persona con el enlace puede enviar una respuesta. Comparta la URL por correo electrónico, redes sociales o mensajes de texto.
- **Insertado en su sitio web** -- Los formularios insertados en su sitio web de B1 recopilan respuestas automáticamente cuando los visitantes los completan.
- **Uso interno** -- El personal y los voluntarios también pueden enviar formularios en nombre de otras personas directamente desde B1 Admin.

:::tip
Revise con frecuencia la pestaña **Form Submissions** de formularios como las tarjetas de visitantes o las peticiones de oración, para poder dar seguimiento de inmediato.
:::

## Usar los datos de las respuestas

Los datos recopilados mediante los formularios pueden ayudarle a:

- Hacer un seguimiento de las inscripciones a eventos y planificar en consecuencia
- Dar seguimiento a visitantes o nuevos miembros
- Recopilar opiniones en encuestas para la planificación de ministerios
- Procesar pagos de eventos o programas

:::info
Los miembros del formulario con el rol **Admin** o **View Only** pueden acceder a la pestaña **Form Submissions**. Asegúrese de que las personas adecuadas de su equipo tengan acceso a los formularios que necesitan, gestionando los roles en la pestaña **Form Members**.
:::

:::tip
Si un formulario **Stand Alone** está configurado para crear un registro de persona, cualquier respuesta vinculada a una persona existente también aparece en la sección **Forms** de la página de esa persona en People, no solo en los formularios de tipo People.
:::

## Próximos pasos

- Aprenda a crear y personalizar formularios en [Crear formularios](./creating-forms.md)
- Agregue a las personas de las respuestas de formularios a su [directorio de personas](../people/adding-people.md) para darles seguimiento
- [Agregue automáticamente a las personas que envían el formulario a un grupo](./creating-forms.md#automatically-adding-submitters-to-a-group) para que un formulario de inscripción Stand Alone cree su propia lista de participantes
