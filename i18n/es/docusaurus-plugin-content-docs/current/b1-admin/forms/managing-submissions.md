---
title: "Administrar envíos"
---

# Administrar envíos

<div class="article-intro">

Una vez que tu formulario esté activo, comenzarán a llegar envíos. La pestaña **Envíos del formulario** te permite revisar cada respuesta, hacer seguimiento de quién ha enviado el formulario y usar los datos para dar seguimiento a tu congregación de manera oportuna.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Crea un formulario](./creating-forms.md) con al menos una pregunta
- Comparte el formulario mediante su URL pública o insértalo en tu [sitio web](../website/managing-pages.md)

</div>

## Ver los envíos

1. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **Personas** y haz clic en **Formularios**.
2. Haz clic en el formulario que quieres revisar.
3. Ve a la pestaña **Envíos del formulario**.

Verás una lista de todas las respuestas recibidas para ese formulario. Cada envío muestra la información de quien respondió y la fecha de envío, seguida de una columna para cada pregunta del formulario. Si tu formulario tiene muchas preguntas, desplázate horizontalmente en la tabla para ver el resto de las columnas.

## Revisar envíos individuales

Haz clic en cualquier envío para ver todos los detalles. Verás todas las respuestas que la persona dio a cada pregunta del formulario.

Haz clic en el **ícono de impresión** junto al envío para imprimir las respuestas completadas de esa persona, útil para un archivo en papel o una autorización firmada que necesitas tener a mano. La impresión muestra el logotipo de tu iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si lo has subido) centrado en la parte superior, con el nombre de tu iglesia debajo. Las impresiones siempre usan texto oscuro sobre fondo blanco, incluso si usas B1 Admin en modo oscuro. Esto es diferente de [imprimir un formulario en blanco](./creating-forms.md#printing-a-blank-form): imprime las respuestas ya enviadas por una persona, no una copia vacía. El mismo ícono de impresión aparece en cualquier lugar donde se muestre un envío, incluido el [perfil de una persona](../people/adding-people.md#working-with-forms).

## Cambiar la persona asociada a un envío

Si un envío está vinculado a la persona equivocada, por ejemplo cuando dos miembros de una familia comparten una dirección de correo electrónico, puedes moverlo a la persona correcta o desvincularlo.

1. En la pestaña **Envíos del formulario**, haz clic en el ícono **Cambiar persona** (dos flechas) junto al nombre de la persona. El mismo ícono aparece junto a un envío en el [perfil de una persona](../people/adding-people.md#working-with-forms).
2. En el diálogo **Cambiar persona**, busca a la persona correcta y haz clic en **Mover a esta persona**.
3. O haz clic en **Desvincular (Anónimo)** para separar el envío de cualquier persona. Entonces aparecerá como **Anónimo**.

Solo cambia el vínculo. Las respuestas se mantienen igual, y no se vuelven a enviar correos de seguimiento.

:::info
En los formularios configurados para crear un registro de persona, cuando alguien ha iniciado sesión en el sitio de tu iglesia mientras envía el formulario, el envío se vincula a su propio registro, incluso si otra persona de tu base de datos comparte su correo electrónico. Cuando [combinas dos registros de personas](../people/adding-people.md), los envíos de formularios de la persona eliminada se trasladan a la persona que conservas.
:::

## Cómo se recopilan los envíos

Los envíos pueden llegar por varios canales:

- **URL pública**: si tu formulario tiene una URL pública (formularios independientes), cualquier persona con el enlace puede enviar una respuesta. Comparte la URL por correo electrónico, redes sociales o mensajes de texto.
- **Insertado en tu sitio web**: los formularios insertados en tu sitio web de B1 recopilan envíos automáticamente cuando los visitantes los completan.
- **Uso interno**: el personal y los voluntarios también pueden enviar formularios en nombre de otras personas directamente desde B1 Admin.

:::tip
Revisa con regularidad la pestaña **Envíos del formulario** de formularios como las tarjetas de visitantes o las peticiones de oración, para que puedas dar seguimiento a tiempo.
:::

## Usar los datos de los envíos

Los datos recopilados mediante los formularios pueden ayudarte a:

- Dar seguimiento a las inscripciones a eventos y planificar en consecuencia
- Dar seguimiento a visitantes o nuevos miembros
- Recopilar comentarios de encuestas para la planificación ministerial
- Procesar pagos de eventos o programas

:::info
Los miembros del formulario con los roles **Administrador** o **Solo lectura** pueden acceder a la pestaña **Envíos del formulario**. Asegúrate de que las personas adecuadas de tu equipo tengan acceso a los formularios que necesitan, administrando los roles en la pestaña **Miembros del formulario**.
:::

:::info
Si un formulario independiente está [vinculado a un grupo](./creating-forms.md#linking-a-form-to-a-group), los líderes de ese grupo pueden leer e imprimir sus envíos desde la página del grupo en B1.church, sin necesidad de ser miembros del formulario. Los líderes también pueden leer allí las respuestas a las preguntas de inscripción de los eventos de su grupo. Consulta [Detalles del grupo](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Si un formulario **independiente** está configurado para crear un registro de persona, cualquier envío que coincida con una persona existente también aparece en la sección **Formularios** de la página de esa persona en Personas, no solo en los formularios de tipo Personas.
:::

## Próximos pasos

- Aprende a crear y personalizar formularios en [Crear formularios](./creating-forms.md)
- Agrega a las personas de los envíos de formularios a tu [directorio de personas](../people/adding-people.md) para dar seguimiento continuo
- [Vincula un formulario a un grupo](./creating-forms.md#linking-a-form-to-a-group) para que sus líderes puedan leer las respuestas, o [agrega automáticamente a quienes envían el formulario al grupo](./creating-forms.md#automatically-adding-submitters-to-a-group) para que un formulario de inscripción independiente cree su propia lista de participantes
