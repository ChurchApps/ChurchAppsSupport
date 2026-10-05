---
title: "Creación de formularios"
---

# Creación de formularios

<div class="article-intro">

Cree formularios personalizados para recopilar información de su congregación. Puede crear formularios para registros de eventos, encuestas, tarjetas de visitantes, solicitudes de membresía y más. Los formularios se pueden vincular a personas en su base de datos o usarse como páginas independientes con su propia URL pública.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para formularios de **People** (vinculados a registros de personas), necesita [personas en su base de datos](../people/adding-people.md) primero.
- Para formularios que recopilan **payments**, debe tener [Stripe configurado para donaciones en línea](../donations/online-giving-setup.md).

</div>

## Crear un nuevo formulario

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin), expanda **People** y haga clic en **Forms**.
2. Haga clic en **Add Form**.
3. Ingrese un **nombre** para su formulario.
4. Elija el tipo de formulario del menú desplegable:
   - **People** — Asocia los envíos con [registros de personas](../people/adding-people.md) en su base de datos.
   - **Stand Alone** — Crea un formulario independiente con su propia URL pública, ideal para registros externos.
5. Haga clic en **Save** para crear el formulario.

Su nuevo formulario aparecerá en la lista. Haga clic en él para comenzar a añadir preguntas.

## Imprimir un formulario en blanco

¿Necesita una copia en papel para distribuir; para una tarjeta de visitante en la mesa de bienvenida o un formulario que alguien sin acceso a Internet pueda completar a mano? Haga clic en el **icono de impresión** junto a un formulario en la lista principal de Formularios para abrir una vista previa y luego haga clic en **Print**. Los campos en blanco se imprimen con un subrayado o casilla de verificación para cada pregunta para que las personas puedan completarlos a mano; las preguntas requeridas se marcan con un asterisco. El nombre de su iglesia se imprime en la parte superior del nombre del formulario. No hay otras opciones de impresión; imprima todo el formulario o nada.

## Agregar preguntas

1. Abra su formulario y vaya a la pestaña **Questions**.
2. Haga clic en **Add Question**.
3. Seleccione un **tipo de campo** del menú desplegable Proveedor. Los tipos disponibles incluyen:
   - **Textbox** — Para respuestas de texto corto
   - **Date** — Para selecciones de fecha
   - **Email** — Para direcciones de correo electrónico
   - **Phone Number** — Para entrada de teléfono
   - **Multiple Choice** — Para seleccionar entre opciones predefinidas
   - **Payment** — Para recopilar pagos
4. Ingrese un **Title** y una **Description** opcional para la pregunta.
5. Marque **Require an answer** si el campo es obligatorio.
6. Haga clic en **Save**.
7. Repita para añadir más preguntas.

:::warning
El tipo de campo **Payment** requiere que Stripe esté configurado. Si aún no ha configurado donaciones en línea, vea [Configuración de donaciones en línea](../donations/online-giving-setup.md) antes de añadir campos de pago.
:::

## Gestionar miembros del formulario

1. Abra su formulario y vaya a la pestaña **Form Members**.
2. Busque una persona y agréguela con un rol:
   - **Admin** — Puede editar el formulario y ver todos los envíos.
   - **View Only** — Puede ver los envíos pero no puede editar el formulario.

## Agregar automáticamente a los remitentes a un grupo

Cuando **Create a person record from submissions** está habilitado, también puede vincular el formulario a un grupo para que cada remitente se agregue automáticamente a la lista de ese grupo:

1. Abra **Details** de su formulario y active **Create a person record from submissions**.
2. En **Add submitters to a group**, seleccione el grupo al que añadir remitentes o déjelo en **None**.
3. Haga clic en **Save**.

Cada vez que alguien envía el formulario, la persona coincidente o recién creada se agrega al grupo (los miembros del grupo existentes se omiten). Esto es útil para cosas como un formulario de inscripción a un campamento que debe construir automáticamente la lista del campamento.

### Envío de un correo electrónico de seguimiento

Con **Create a person record from submissions** activado, también puede enviar un correo electrónico a cada persona que envíe el formulario. Complete **Follow-up Email Subject** y **Follow-up Email Body** en los detalles del formulario. Puede usar los tokens `{firstName}` y `{churchName}` en ambos. El correo electrónico solo se envía cuando ambos campos están completados.

:::info
Los correos electrónicos de seguimiento solo se envían después de que su iglesia haya sido aprobada para enviar correos electrónicos de grupo, y cuentan para el límite diario de correo electrónico de su iglesia. Vea [Activar el correo electrónico del grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicar un formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haga clic en el **icono Duplicate** (icono de copia) junto al formulario en la lista de Formularios. B1 crea una copia exacta del formulario, incluyendo todas las preguntas, que luego puede renombrar y editar independientemente.

:::tip
La duplicación es práctica para eventos recurrentes donde las preguntas de registro siguen siendo las mismas año tras año. Duplique el formulario del año pasado, actualice el nombre y las fechas, y está listo.
:::

## Configurar las propiedades del formulario

Puede actualizar el nombre y la configuración de su formulario en cualquier momento. Para formularios Stand Alone, también verá una **URL pública** única que puede compartir con cualquiera, junto con un campo **Description**; texto mostrado encima de las preguntas en la página del formulario público, útil para decirle a las personas para qué es el formulario antes de que comiencen a completarlo.

Use el campo **Thank You Message** para establecer lo que las personas ven después de enviar el formulario, incluso en la página de URL pública del formulario. Si lo deja en blanco, verán "¡Gracias por enviar el formulario!"

:::tip
Los formularios Stand Alone son excelentes para registros de eventos. Comparta la URL pública por correo electrónico, redes sociales o incruste el formulario directamente en su sitio web de la iglesia.
:::

:::info
Para incrustar un formulario en su sitio web B1, vaya a su editor de sitios web, agregue una nueva sección y seleccione el elemento **Form**. Luego elija el formulario que desea mostrar. Vea [Gestionar páginas](../website/managing-pages.md) para obtener detalles sobre cómo editar su sitio web.
:::
