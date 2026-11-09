---
title: "Creación de formularios"
description: "Cree formularios personalizados en B1 Admin para inscripciones a eventos, encuestas y tarjetas de visitante, y compártalos por enlace, código QR o impresos."
---

# Creación de formularios

<div class="article-intro">

Cree formularios personalizados para recopilar información de su congregación. Puede crear formularios para inscripciones a eventos, encuestas, tarjetas de visitante, solicitudes de membresía y mucho más. Los formularios pueden vincularse a personas de su base de datos o usarse como páginas independientes con su propia URL pública.

</div>

## Video de capacitación

<YouTube id="UZ4dGCNIFw4" title="Creación de formularios y administración de respuestas en B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para los formularios de **People** (vinculados a registros de personas), primero necesita tener [personas en su base de datos](../people/adding-people.md).
- Para los formularios que cobran **pagos**, debe tener [Stripe configurado para las donaciones en línea](../donations/online-giving-setup.md).

</div>

## Crear un nuevo formulario

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin), expanda **People** y haga clic en **Forms**.
2. Haga clic en **Add Form**.
3. Escriba un **nombre** para su formulario.
4. Elija el tipo de formulario en el menú desplegable **Associate With**:
   - **People** — Asocia las respuestas con los [registros de personas](../people/adding-people.md) de su base de datos. Los formularios de People se completan desde el registro de una persona, así que no tienen un enlace para compartir.
   - **Stand Alone** — Crea un formulario independiente con su propia URL pública, ideal para inscripciones externas. Solo los formularios Stand Alone ofrecen una [foto de encabezado](#adding-a-header-photo), un [código QR](#sharing-a-form-with-a-qr-code), un [grupo vinculado](#linking-a-form-to-a-group) y **Create a person record from submissions**.
5. Haga clic en **Save** para crear el formulario.

Su nuevo formulario aparecerá en la lista. Haga clic en él para empezar a agregar preguntas.

## Imprimir un formulario en blanco {#printing-a-blank-form}

¿Necesita una copia en papel para entregar, por ejemplo, una tarjeta de visitante en la mesa de bienvenida, o un formulario que alguien sin acceso a internet pueda llenar a mano? Haga clic en **Print** junto a un formulario en la lista principal de Forms para abrir una vista previa y luego haga clic en **Print**. Los campos en blanco se imprimen con una línea o una casilla para cada pregunta, para que las personas puedan completarlos a mano; las preguntas obligatorias se marcan con un asterisco. En la parte superior de la página aparece el logotipo de su iglesia (el **Light Background Logo** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno), con el nombre de su iglesia debajo, y después el nombre del formulario. No hay otras opciones de impresión: se imprime todo el formulario o nada.

## Compartir un formulario con un código QR {#sharing-a-form-with-a-qr-code}

Los formularios Stand Alone tienen un enlace **QR Code** junto a ellos en la lista principal de Forms (los formularios archivados no lo tienen). Haga clic en él para abrir un código QR de la URL pública del formulario, con el enlace mostrado debajo. Haga clic en **Download PNG** para guardar el código como imagen que pueda imprimir en los boletines o mostrar en las diapositivas. Quien lo escanee abrirá el formulario en su teléfono.

## Agregar preguntas {#adding-questions}

1. Abra su formulario y vaya a la pestaña **Questions**.
2. Haga clic en **Add Question**.
3. Seleccione un **tipo de campo** del menú desplegable Provider. Los tipos disponibles incluyen:
   - **Textbox** — Para respuestas de texto corto
   - **Date** — Para seleccionar fechas
   - **Email** — Para direcciones de correo electrónico
   - **Phone Number** — Para introducir un número de teléfono
   - **Multiple Choice** — Para elegir entre opciones predefinidas
   - **Payment** — Para cobrar pagos
4. Escriba un **Title** y una **Description** opcional para la pregunta. La descripción aparece debajo de la pregunta cuando las personas completan el formulario, así que úsela para dar pistas como "Incluya cualquier alergia que debamos conocer".
5. Marque **Require an answer** si el campo es obligatorio.
6. Haga clic en **Save**.
7. Repita para agregar más preguntas.

:::warning
El tipo de campo **Payment** requiere que Stripe esté configurado. Si todavía no ha configurado las donaciones en línea, consulte [Configuración de donaciones en línea](../donations/online-giving-setup.md) antes de agregar campos de pago. Las personas que paguen en un formulario sin iniciar sesión deben marcar la casilla **I'm not a robot** antes de que se acepte la tarjeta.
:::

## Administrar miembros del formulario {#managing-form-members}

1. Abra su formulario y vaya a la pestaña **Form Members**.
2. Busque a una persona y agréguela con un rol:
   - **Admin** — Puede editar el formulario y ver todas las respuestas.
   - **View Only** — Puede ver las respuestas, pero no puede editar el formulario.

## Vincular un formulario a un grupo {#linking-a-form-to-a-group}

Puede vincular cualquier formulario Stand Alone a un grupo, por ejemplo, un formulario de peticiones de oración para un grupo pequeño, o una autorización médica para un viaje juvenil:

1. Abra los **Details** de su formulario.
2. En **Linked group**, seleccione el grupo o déjelo en **None**.
3. Haga clic en **Save**.

Una vez vinculado un formulario:

- **Los miembros del grupo** ven el formulario en una sección **Forms** de la página del grupo en B1.church mientras el formulario esté abierto, con un botón **Fill out** que lo abre (consulte [Detalles del grupo](../../b1-church/groups/group-details.md#linked-forms)).
- **Los líderes del grupo** también ven los formularios cerrados, y pueden leer las respuestas de cada envío e imprimirlas (una respuesta o **Print all**). Los líderes solo pueden ver las respuestas; no pueden editar el formulario a menos que también sean [miembros del formulario](#managing-form-members).
- **En B1 Admin**, la página del grupo muestra una sección **Linked forms** que enumera cada formulario vinculado como **Open** o **Closed**. Aparece para los líderes del grupo y para las personas que pueden administrar formularios. Consulte [Miembros del grupo](../groups/group-members.md#linked-forms).

Un formulario está cerrado cuando queda fuera de su periodo de disponibilidad. Los formularios archivados no se muestran en la página del grupo.

### Agregar automáticamente a quienes envían el formulario a un grupo {#automatically-adding-submitters-to-a-group}

Vincular un formulario a un grupo no agrega a nadie por sí solo. Para añadir a cada persona que envíe el formulario a la lista del grupo vinculado, active también **Create a person record from submissions** en los detalles del formulario y haga clic en **Save**.

Cada vez que alguien envía el formulario, la persona encontrada o recién creada se añade al grupo (los miembros que ya están en el grupo se omiten). Esto resulta útil para cosas como un formulario de inscripción a un campamento que debe generar automáticamente la lista del grupo del campamento.

### Enviar un correo de seguimiento {#sending-a-follow-up-email}

Con **Create a person record from submissions** activado, también puede enviar un correo electrónico a cada persona que envíe el formulario. Complete **Follow-up Email Subject** y **Follow-up Email Body** en los detalles del formulario. Puede usar las etiquetas `{firstName}` y `{churchName}` en ambos campos. El correo solo se envía cuando ambos campos están completos.

:::info
Los correos de seguimiento solo se envían después de que su iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos electrónicos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicar un formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haga clic en **Duplicate** junto al formulario en la lista de Forms y confirme. B1 crea una copia exacta del formulario, incluidas todas las preguntas, que luego puede renombrar y editar de forma independiente.

:::tip
Duplicar es útil para eventos recurrentes en los que las preguntas de inscripción no cambian de un año a otro. Duplique el formulario del año pasado, actualice el nombre y las fechas, y listo.
:::

## Configurar las propiedades del formulario

Puede actualizar el nombre y los ajustes de su formulario en cualquier momento. En los formularios Stand Alone, también verá una **public URL** única que puede compartir con cualquier persona, junto con un campo **Description**: texto que se muestra encima de las preguntas en la página pública del formulario, útil para explicar a las personas para qué sirve antes de que empiecen a completarlo.

### Agregar una foto de encabezado {#adding-a-header-photo}

Los formularios Stand Alone pueden mostrar una **Header Photo** en la parte superior del formulario. En los detalles del formulario, haga clic en el recuadro de la foto o en **Add Photo**, y luego elija o suba una imagen (se recorta a un formato de 16:9). Haga clic en **Save**. La foto aparece debajo del nombre del formulario, encima de la descripción, en la página de la URL pública del formulario y en cualquier lugar donde el formulario esté insertado con el elemento **Form** del sitio web. Use **Change Photo** para reemplazarla o **Remove** para quitarla.

Use el campo **Thank You Message** para definir lo que las personas ven después de enviar el formulario, incluso en la página de la URL pública del formulario. Si lo deja en blanco, verán "¡Gracias por enviar el formulario!"

:::tip
Los formularios Stand Alone son ideales para las inscripciones a eventos. Comparta la URL pública por correo electrónico o en redes sociales, o inserte el formulario directamente en el sitio web de su iglesia.
:::

:::info
Para insertar un formulario en su sitio web de B1, vaya al editor de su sitio web, agregue una nueva sección y seleccione el elemento **Form**. Luego elija el formulario que desea mostrar. Consulte [Administrar páginas](../website/managing-pages.md) para más detalles sobre cómo editar su sitio web.
:::
