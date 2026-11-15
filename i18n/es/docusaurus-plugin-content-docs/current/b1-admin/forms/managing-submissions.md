---
title: "Administrar envíos"
description: "Revise, imprima y reasigne los envíos de formularios en B1 Admin, moviendo las respuestas a la persona correcta y dando seguimiento a las tarjetas de visitantes y las peticiones de oración."
---

# Administrar envíos

<div class="article-intro">

Una vez que su formulario esté activo, empezarán a llegar envíos. La pestaña **Envíos del formulario** le permite revisar cada respuesta, saber quién ha enviado y usar los datos para dar seguimiento a su congregación de forma oportuna.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- [Cree un formulario](./creating-forms.md) con al menos una pregunta
- Comparta el formulario mediante su URL pública o insértelo en su [sitio web](../website/managing-pages.md)

</div>

## Ver los envíos {#viewing-submissions}

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), despliegue **Personas** y haga clic en **Formularios**.
2. Haga clic en el formulario que desea revisar.
3. Vaya a la pestaña **Envíos del formulario**.

La pestaña tiene dos tarjetas:

- **Resumen de envíos del formulario**: para cada pregunta de opción múltiple, casilla de verificación y Sí/No, un recuento de cuántas personas eligieron cada respuesta.
- **Resultados de envíos del formulario**: una tabla con cada respuesta, con un conteo de envíos. Cada fila muestra para quién es el envío (**Enviado para** en los formularios de Personas, **Enviado por** en los formularios Independientes, o **Anónimo**) y la **Fecha de envío**, seguida de una columna por cada pregunta del formulario, en el orden del formulario. Si su formulario tiene muchas preguntas, desplace la tabla horizontalmente para ver el resto de las columnas. Haga clic en el nombre de una persona para abrir su registro.

Haga clic en **Exportar** en cualquiera de las tarjetas para descargar las respuestas como archivo CSV, con una fila por envío. Haga clic en el icono de **Imprimir** (impresora) para imprimir el resumen y la tabla de resultados, encabezados con el nombre de su iglesia.

## Revisar envíos individuales {#reviewing-individual-submissions}

Para leer o imprimir las respuestas de una persona, abra su registro en [Personas](../people/adding-people.md#working-with-forms) y haga clic en el formulario en su sección **Formularios**. Verá todas las respuestas que dio, una pregunta por línea.

Haga clic en el **icono de impresión** junto al envío para imprimir las respuestas completadas de esa persona, útil para un archivo en papel o una autorización firmada que necesite tener a mano. La impresión muestra el logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno) centrado en la parte superior, con el nombre de su iglesia debajo. Las impresiones siempre usan texto oscuro sobre una página blanca, incluso si usa B1 Admin en modo oscuro. Esto es distinto de [imprimir un formulario en blanco](./creating-forms.md#printing-a-blank-form); imprime las respuestas ya enviadas de una persona, no una copia vacía.

## Cambiar la persona de un envío {#changing-the-person-on-a-submission}

Si un envío está vinculado a la persona equivocada, por ejemplo, dos miembros de la familia comparten una dirección de correo electrónico, puede moverlo a la persona correcta o desvincularlo.

1. En la pestaña **Envíos del formulario**, haga clic en el icono **Cambiar persona** (dos flechas) junto al nombre de la persona. El mismo icono aparece junto a un envío en el [perfil de una persona](../people/adding-people.md#working-with-forms).
2. En el cuadro de diálogo **Cambiar persona**, busque a la persona correcta y haga clic en **Mover a esta persona**.
3. O haga clic en **Desvincular (Anónimo)** para separar el envío de cualquier persona. Entonces aparecerá como **Anónimo**.

Solo cambia el vínculo. Las respuestas siguen igual, y no se vuelven a enviar correos de seguimiento.

:::info
En los formularios configurados para crear un registro de persona, cuando alguien ha iniciado sesión en el sitio de su iglesia al enviar, el envío se vincula a su propio registro, incluso si otra persona de su base de datos comparte su correo electrónico. Cuando [fusiona dos registros de personas](../people/adding-people.md), los envíos de formularios de la persona eliminada se mueven a la persona que conserva.
:::

## Cómo se recopilan los envíos {#how-submissions-are-collected}

Los envíos pueden llegar por varios canales:

- **URL pública**: si su formulario tiene una URL pública (formularios Independientes), cualquiera con el enlace puede enviar una respuesta. Comparta la URL por correo electrónico, redes sociales o mensajes de texto.
- **Insertado en su sitio web**: los formularios insertados en su sitio web de B1 recopilan envíos automáticamente cuando los visitantes los llenan.
- **Uso interno**: el personal puede completar los formularios de Personas para alguien desde el registro de esa persona en B1 Admin. Consulte [Trabajar con formularios](../people/adding-people.md#working-with-forms).

:::tip
Revise periódicamente la pestaña **Envíos del formulario** de formularios como las tarjetas de visitantes o las peticiones de oración, para poder dar seguimiento a tiempo.
:::

## Usar los datos de los envíos {#using-submission-data}

Los datos recopilados mediante formularios pueden ayudarle a:

- Dar seguimiento a las inscripciones a eventos y planificar en consecuencia
- Dar seguimiento a visitantes o nuevos miembros
- Recopilar comentarios de encuestas para la planificación ministerial
- Procesar pagos de eventos o programas

:::info
Los miembros del formulario con los roles **Administrador** o **Solo ver** pueden acceder a la pestaña **Envíos del formulario**. Asegúrese de que las personas adecuadas de su equipo tengan acceso a los formularios que necesitan, administrando los roles en la pestaña **Miembros del formulario**.
:::

:::info
Si un formulario Independiente está [vinculado a un grupo](./creating-forms.md#linking-a-form-to-a-group), los líderes de ese grupo pueden leer e imprimir sus envíos desde la página del grupo en B1.church, sin ser miembros del formulario. Los líderes también pueden leer allí las respuestas a las preguntas de inscripción de los eventos de su grupo. Consulte [Detalles del grupo](../../b1-church/groups/group-details.md#linked-forms).
:::

:::tip
Si un formulario **Independiente** está configurado para crear un registro de persona, los envíos que coincidan con una persona existente también aparecen en la sección **Formularios** de la página de esa persona en Personas, no solo los formularios de tipo Personas.
:::

## Próximos pasos {#next-steps}

- Aprenda a crear y personalizar formularios en [Crear formularios](./creating-forms.md)
- Añada personas a partir de los envíos de formularios a su [directorio de personas](../people/adding-people.md) para dar seguimiento continuo
- [Vincule un formulario a un grupo](./creating-forms.md#linking-a-form-to-a-group) para que sus líderes puedan leer las respuestas, o [añada automáticamente a quienes envían al grupo](./creating-forms.md#automatically-adding-submitters-to-a-group) para que un formulario de inscripción independiente cree su propia lista
