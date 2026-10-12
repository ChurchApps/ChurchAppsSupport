---
title: "Crear formularios"
---

# Crear formularios

<div class="article-intro">

Cree formularios personalizados para recopilar información de su congregación. Puede crear formularios para inscripciones a eventos, encuestas, tarjetas de visitantes, solicitudes de membresía y más. Los formularios pueden vincularse a personas de su base de datos o usarse como páginas independientes con su propia URL pública.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para los formularios de **Personas** (vinculados a registros de personas), primero necesita tener [personas en su base de datos](../people/adding-people.md).
- Para los formularios que recopilan **pagos**, debe tener [Stripe configurado para las donaciones en línea](../donations/online-giving-setup.md).

</div>

## Crear un formulario nuevo

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expanda **People** y haga clic en **Forms**.
2. Haga clic en **Add Form**.
3. Escriba un **nombre** para su formulario.
4. Elija el tipo de formulario en el menú desplegable:
   - **People** — Asocia las respuestas con [registros de personas](../people/adding-people.md) de su base de datos.
   - **Stand Alone** — Crea un formulario independiente con su propia URL pública, ideal para inscripciones externas.
5. Haga clic en **Save** para crear el formulario.

Su nuevo formulario aparecerá en la lista. Haga clic en él para empezar a agregar preguntas.

## Imprimir un formulario en blanco

¿Necesita una copia en papel para entregar, por ejemplo, una tarjeta de visitante en la mesa de bienvenida, o un formulario que alguien sin acceso a internet pueda completar a mano? Haga clic en **Print** junto a un formulario en la lista principal de Forms para abrir una vista previa y, luego, haga clic en **Print**. Los campos en blanco se imprimen con una línea o una casilla para cada pregunta, de modo que las personas puedan completarlos a mano. Las preguntas obligatorias se marcan con un asterisco. En la parte superior de la página aparece el logotipo de su iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si ha subido uno), seguido del nombre de su iglesia y, debajo, el nombre del formulario. No hay otras opciones de impresión: se imprime todo el formulario o nada.

## Agregar preguntas

1. Abra su formulario y vaya a la pestaña **Questions**.
2. Haga clic en **Add Question**.
3. Seleccione un **tipo de campo** en el menú desplegable Provider. Los tipos disponibles incluyen:
   - **Textbox** — Para respuestas de texto breves
   - **Date** — Para seleccionar fechas
   - **Email** — Para direcciones de correo electrónico
   - **Phone Number** — Para números de teléfono
   - **Multiple Choice** — Para elegir entre opciones predefinidas
   - **Payment** — Para recopilar pagos
4. Escriba un **Title** y, opcionalmente, una **Description** para la pregunta.
5. Marque **Require an answer** si el campo es obligatorio.
6. Haga clic en **Save**.
7. Repita el proceso para agregar más preguntas.

:::warning
El tipo de campo **Payment** requiere que Stripe esté configurado. Si todavía no ha configurado las donaciones en línea, consulte [Configuración de donaciones en línea](../donations/online-giving-setup.md) antes de agregar campos de pago.
:::

## Administrar los miembros del formulario

1. Abra su formulario y vaya a la pestaña **Form Members**.
2. Busque a una persona y agréguela con un rol:
   - **Admin** — Puede editar el formulario y ver todas las respuestas.
   - **View Only** — Puede ver las respuestas, pero no puede editar el formulario.

## Agregar automáticamente a las personas que envían el formulario a un grupo

Cuando está activada la opción **Create a person record from submissions**, también puede vincular el formulario a un grupo para que cada persona que lo envíe se agregue automáticamente a la lista de miembros de ese grupo:

1. Abra los **Details** de su formulario y active **Create a person record from submissions**.
2. En **Add submitters to a group**, seleccione el grupo al que desea agregar a las personas que envían el formulario, o deje la opción en **None**.
3. Haga clic en **Save**.

Cada vez que alguien envía el formulario, la persona encontrada o recién creada se agrega al grupo (las personas que ya son miembros del grupo se omiten). Esto resulta útil en casos como un formulario de inscripción a un campamento que debe crear automáticamente la lista de participantes del grupo del campamento.

### Enviar un correo electrónico de seguimiento

Con la opción **Create a person record from submissions** activada, también puede enviar un correo electrónico a cada persona que envíe el formulario. Complete **Follow-up Email Subject** y **Follow-up Email Body** en los detalles del formulario. En ambos campos puede usar los marcadores `{firstName}` y `{churchName}`. El correo solo se envía cuando se completan ambos campos.

:::info
Los correos de seguimiento solo se envían después de que su iglesia haya sido aprobada para enviar correos de grupo, y cuentan para el límite diario de correos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicar un formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haga clic en **Duplicate** junto al formulario en la lista de Forms y confirme. B1 crea una copia exacta del formulario, incluidas todas las preguntas, que luego puede renombrar y editar de forma independiente.

:::tip
Duplicar es muy útil para eventos recurrentes en los que las preguntas de inscripción no cambian de un año a otro. Duplique el formulario del año anterior, actualice el nombre y las fechas, y listo.
:::

## Configurar las propiedades del formulario

Puede actualizar el nombre y la configuración de su formulario en cualquier momento. En los formularios Stand Alone también verá una **URL pública** única que puede compartir con cualquier persona, junto con un campo **Description**: un texto que aparece encima de las preguntas en la página pública del formulario, útil para explicar a las personas para qué sirve antes de que empiecen a completarlo.

Use el campo **Thank You Message** para definir lo que ven las personas después de enviar el formulario, incluso en la página de la URL pública. Si lo deja en blanco, verán el mensaje "Thank you for submitting the form!".

:::tip
Los formularios Stand Alone son ideales para inscripciones a eventos. Comparta la URL pública por correo electrónico o redes sociales, o inserte el formulario directamente en el sitio web de su iglesia.
:::

:::info
Para insertar un formulario en su sitio web de B1, vaya al editor de su sitio web, agregue una nueva sección y seleccione el elemento **Form**. Luego, elija el formulario que desea mostrar. Consulte [Administrar páginas](../website/managing-pages.md) para obtener más detalles sobre la edición de su sitio web.
:::
