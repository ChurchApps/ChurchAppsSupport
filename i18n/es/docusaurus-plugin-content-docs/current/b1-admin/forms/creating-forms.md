---
title: "Crear formularios"
---

# Crear formularios

<div class="article-intro">

Crea formularios personalizados para recopilar información de tu congregación. Puedes crear formularios para inscripciones a eventos, encuestas, tarjetas de visitantes, solicitudes de membresía y más. Los formularios pueden vincularse a personas de tu base de datos o usarse como páginas independientes con su propia URL pública.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para los formularios de **People** (vinculados a registros de personas), primero necesitas [personas en tu base de datos](../people/adding-people.md).
- Para los formularios que recopilan **pagos**, debes tener [Stripe configurado para las ofrendas en línea](../donations/online-giving-setup.md).

</div>

## Crear un nuevo formulario

1. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **People** y haz clic en **Forms**.
2. Haz clic en **Add Form**.
3. Escribe un **nombre** para tu formulario.
4. Elige el tipo de formulario en el menú desplegable:
   - **People** — Asocia las respuestas con [registros de personas](../people/adding-people.md) en tu base de datos.
   - **Stand Alone** — Crea un formulario independiente con su propia URL pública, ideal para inscripciones externas.
5. Haz clic en **Save** para crear el formulario.

Tu nuevo formulario aparecerá en la lista. Haz clic en él para empezar a agregar preguntas.

## Imprimir un formulario en blanco

¿Necesitas una copia en papel para repartir, por ejemplo una tarjeta de visitante en la mesa de bienvenida, o un formulario que alguien sin acceso a internet pueda llenar a mano? Haz clic en **Print** junto a un formulario en la lista principal de Forms para abrir una vista previa y luego haz clic en **Print**. Los campos en blanco se imprimen con una línea o una casilla para cada pregunta, para que las personas puedan completarlos a mano; las preguntas obligatorias están marcadas con un asterisco. En la parte superior de la página aparece el logo de tu iglesia (el **Light Background Logo** de [Website > Appearance](../website/appearance.md), si lo has subido) con el nombre de tu iglesia debajo, y luego el nombre del formulario. No hay otras opciones de impresión: imprimes todo el formulario o nada.

## Agregar preguntas

1. Abre tu formulario y ve a la pestaña **Questions**.
2. Haz clic en **Add Question**.
3. Selecciona un **field type** en el menú desplegable Provider. Los tipos disponibles incluyen:
   - **Textbox** — Para respuestas de texto corto
   - **Date** — Para selección de fechas
   - **Email** — Para direcciones de correo electrónico
   - **Phone Number** — Para ingresar números de teléfono
   - **Multiple Choice** — Para elegir entre opciones predefinidas
   - **Payment** — Para recopilar pagos
4. Escribe un **Title** y una **Description** opcional para la pregunta. La descripción aparece debajo de la pregunta cuando las personas llenan el formulario, así que úsala para dar indicaciones como "Incluye cualquier alergia que debamos conocer".
5. Marca **Require an answer** si el campo es obligatorio.
6. Haz clic en **Save**.
7. Repite el proceso para agregar más preguntas.

:::warning
El tipo de campo **Payment** requiere que Stripe esté configurado. Si todavía no has configurado las ofrendas en línea, consulta [Configuración de ofrendas en línea](../donations/online-giving-setup.md) antes de agregar campos de pago.
:::

## Gestionar los miembros del formulario

1. Abre tu formulario y ve a la pestaña **Form Members**.
2. Busca a una persona y agrégala con un rol:
   - **Admin** — Puede editar el formulario y ver todas las respuestas.
   - **View Only** — Puede ver las respuestas, pero no puede editar el formulario.

## Agregar automáticamente a quienes envían el formulario a un grupo

Cuando **Create a person record from submissions** está habilitado, también puedes vincular el formulario a un grupo para que cada persona que envíe el formulario se agregue automáticamente a la lista de miembros de ese grupo:

1. Abre los **Details** de tu formulario y activa **Create a person record from submissions**.
2. En **Add submitters to a group**, selecciona el grupo al que se agregarán las personas que envíen el formulario, o déjalo en **None**.
3. Haz clic en **Save**.

Cada vez que alguien envía el formulario, la persona encontrada o recién creada se agrega al grupo (los miembros que ya pertenecen al grupo se omiten). Esto es útil para cosas como un formulario de inscripción a un campamento que debe crear automáticamente la lista del grupo del campamento.

### Enviar un correo de seguimiento

Con **Create a person record from submissions** activado, también puedes enviar un correo electrónico a cada persona que envíe el formulario. Completa **Follow-up Email Subject** y **Follow-up Email Body** en los detalles del formulario. Puedes usar los marcadores `{firstName}` y `{churchName}` en ambos campos. El correo solo se envía cuando ambos campos están completos.

:::info
Los correos de seguimiento solo se envían después de que tu iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos electrónicos de tu iglesia. Consulta [Activar el correo de grupo para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicar un formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haz clic en **Duplicate** junto al formulario en la lista de Forms y confirma. B1 crea una copia exacta del formulario, incluidas todas las preguntas, que puedes renombrar y editar de forma independiente.

:::tip
Duplicar es útil para eventos recurrentes en los que las preguntas de inscripción se mantienen de un año a otro. Duplica el formulario del año pasado, actualiza el nombre y las fechas, y listo.
:::

## Configurar las propiedades del formulario

Puedes actualizar el nombre y la configuración de tu formulario en cualquier momento. En los formularios Stand Alone, también verás una **public URL** única que puedes compartir con cualquiera, junto con un campo **Description** (texto que se muestra encima de las preguntas en la página pública del formulario, útil para explicar a las personas para qué sirve el formulario antes de que empiecen a llenarlo).

Usa el campo **Thank You Message** para definir lo que las personas ven después de enviar el formulario, incluida la página de la URL pública. Si lo dejas en blanco, verán "Thank you for submitting the form!".

:::tip
Los formularios Stand Alone son ideales para inscripciones a eventos. Comparte la URL pública por correo electrónico o redes sociales, o incrusta el formulario directamente en el sitio web de tu iglesia.
:::

:::info
Para incrustar un formulario en tu sitio web de B1, ve al editor de tu sitio web, agrega una nueva sección y selecciona el elemento **Form**. Luego elige el formulario que quieres mostrar. Consulta [Gestionar páginas](../website/managing-pages.md) para obtener detalles sobre cómo editar tu sitio web.
:::
