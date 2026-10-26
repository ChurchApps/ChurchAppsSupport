---
title: "Crear formularios"
---

# Crear formularios

<div class="article-intro">

Crea formularios personalizados para recopilar información de tu congregación. Puedes crear formularios para inscripciones a eventos, encuestas, tarjetas de visitantes, solicitudes de membresía y más. Los formularios pueden vincularse a personas de tu base de datos o usarse como páginas independientes con su propia URL pública.

</div>

## Video de capacitación

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para formularios de **Personas** (vinculados a registros de personas), primero necesitas [personas en tu base de datos](../people/adding-people.md).
- Para formularios que recopilan **pagos**, debes tener [Stripe configurado para ofrendas en línea](../donations/online-giving-setup.md).

</div>

## Crear un nuevo formulario

1. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **Personas** y haz clic en **Formularios**.
2. Haz clic en **Agregar formulario**.
3. Escribe un **nombre** para tu formulario.
4. Elige el tipo de formulario en el menú desplegable **Asociar con**:
   - **Personas**: asocia los envíos con los [registros de personas](../people/adding-people.md) de tu base de datos. Los formularios de personas se completan desde el registro de una persona, por lo que no tienen un enlace para compartir.
   - **Independiente**: crea un formulario independiente con su propia URL pública, ideal para inscripciones externas. Solo los formularios independientes ofrecen una [foto de encabezado](#adding-a-header-photo), un [código QR](#sharing-a-form-with-a-qr-code), un [grupo vinculado](#linking-a-form-to-a-group) y **Crear un registro de persona a partir de los envíos**.
5. Haz clic en **Guardar** para crear el formulario.

Tu nuevo formulario aparecerá en la lista. Haz clic en él para empezar a agregar preguntas.

## Imprimir un formulario en blanco {#printing-a-blank-form}

¿Necesitas una copia impresa para repartir, por ejemplo una tarjeta de visitante en la mesa de bienvenida, o un formulario que alguien sin acceso a internet pueda completar a mano? Haz clic en **Imprimir** junto a un formulario en la lista principal de Formularios para abrir una vista previa y luego haz clic en **Imprimir**. Los campos en blanco se imprimen con una línea o una casilla para cada pregunta, para que las personas puedan completarlos a mano; las preguntas obligatorias se marcan con un asterisco. En la parte superior de la página aparece el logotipo de tu iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si lo has subido), con el nombre de tu iglesia debajo, seguido del nombre del formulario. No hay otras opciones de impresión: se imprime todo el formulario o nada.

## Compartir un formulario con un código QR {#sharing-a-form-with-a-qr-code}

Los formularios independientes tienen un enlace **Código QR** junto a ellos en la lista principal de Formularios (los formularios archivados no lo tienen). Haz clic en él para abrir un código QR de la URL pública del formulario, con el enlace mostrado debajo. Haz clic en **Descargar PNG** para guardar el código como una imagen que puedes imprimir en los boletines o mostrar en las diapositivas. Quien lo escanee abrirá el formulario en su teléfono.

## Agregar preguntas {#adding-questions}

1. Abre tu formulario y ve a la pestaña **Preguntas**.
2. Haz clic en **Agregar pregunta**.
3. Selecciona un **tipo de campo** en el menú desplegable Proveedor. Los tipos disponibles incluyen:
   - **Campo de texto**: para respuestas cortas de texto
   - **Fecha**: para seleccionar fechas
   - **Correo electrónico**: para direcciones de correo electrónico
   - **Número de teléfono**: para ingresar teléfonos
   - **Opción múltiple**: para elegir entre opciones predefinidas
   - **Pago**: para recopilar pagos
4. Escribe un **Título** y, opcionalmente, una **Descripción** para la pregunta. La descripción aparece debajo de la pregunta cuando las personas completan el formulario, así que úsala para dar pistas como "Incluye cualquier alergia que debamos conocer".
5. Marca **Requiere una respuesta** si el campo es obligatorio.
6. Haz clic en **Guardar**.
7. Repite el proceso para agregar más preguntas.

:::warning
El tipo de campo **Pago** requiere que Stripe esté configurado. Si todavía no has configurado las ofrendas en línea, consulta [Configuración de ofrendas en línea](../donations/online-giving-setup.md) antes de agregar campos de pago.
:::

## Administrar los miembros del formulario {#managing-form-members}

1. Abre tu formulario y ve a la pestaña **Miembros del formulario**.
2. Busca a una persona y agrégala con un rol:
   - **Administrador**: puede editar el formulario y ver todos los envíos.
   - **Solo lectura**: puede ver los envíos, pero no puede editar el formulario.

## Vincular un formulario a un grupo {#linking-a-form-to-a-group}

Puedes vincular cualquier formulario independiente a un grupo, por ejemplo, un formulario de peticiones de oración para un grupo pequeño, o una autorización médica para un viaje de jóvenes:

1. Abre los **Detalles** de tu formulario.
2. En **Grupo vinculado**, selecciona el grupo, o déjalo en **Ninguno**.
3. Haz clic en **Guardar**.

Una vez que el formulario está vinculado:

- **Los miembros del grupo** ven el formulario en una sección **Formularios** en la página del grupo en B1.church mientras el formulario esté abierto, con un botón **Completar** que lo abre (consulta [Detalles del grupo](../../b1-church/groups/group-details.md#linked-forms)).
- **Los líderes del grupo** también ven los formularios cerrados, y pueden leer las respuestas de cada envío e imprimirlas (un envío o **Imprimir todo**). Los líderes solo pueden ver las respuestas; no pueden editar el formulario a menos que también sean [miembros del formulario](#managing-form-members).
- **En B1 Admin**, la página del grupo muestra una sección **Formularios vinculados** que enumera cada formulario vinculado como **Abierto** o **Cerrado**. Aparece para los líderes del grupo y para las personas que pueden administrar formularios. Consulta [Miembros del grupo](../groups/group-members.md#linked-forms).

Un formulario se cierra cuando está fuera de su período de disponibilidad. Los formularios archivados no se muestran en la página del grupo.

### Agregar automáticamente a quienes envían el formulario a un grupo {#automatically-adding-submitters-to-a-group}

Vincular un formulario a un grupo no agrega a nadie por sí solo. Para agregar a cada persona que envíe el formulario a la lista del grupo vinculado, también activa **Crear un registro de persona a partir de los envíos** en los detalles del formulario y haz clic en **Guardar**.

Cada vez que alguien envía el formulario, la persona encontrada o recién creada se agrega al grupo (los miembros que ya están en el grupo se omiten). Esto es útil para casos como un formulario de inscripción a un campamento que debe crear automáticamente la lista de participantes del grupo del campamento.

### Enviar un correo electrónico de seguimiento

Con **Crear un registro de persona a partir de los envíos** activado, también puedes enviar un correo electrónico a cada persona que envíe el formulario. Completa **Asunto del correo de seguimiento** y **Cuerpo del correo de seguimiento** en los detalles del formulario. Puedes usar las etiquetas `{firstName}` y `{churchName}` en ambos. El correo solo se envía cuando ambos campos están completos.

:::info
Los correos de seguimiento solo se envían después de que tu iglesia haya sido aprobada para enviar correos electrónicos de grupo, y cuentan para el límite diario de correos de tu iglesia. Consulta [Activar el correo electrónico de grupo para tu iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicar un formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haz clic en **Duplicar** junto al formulario en la lista de Formularios y confirma. B1 crea una copia exacta del formulario, incluidas todas las preguntas, que puedes renombrar y editar de forma independiente.

:::tip
Duplicar es útil para eventos recurrentes en los que las preguntas de inscripción se mantienen de un año a otro. Duplica el formulario del año pasado, actualiza el nombre y las fechas, ¡y listo!
:::

## Configurar las propiedades del formulario

Puedes actualizar el nombre y la configuración de tu formulario en cualquier momento. En los formularios independientes, también verás una **URL pública** única que puedes compartir con cualquiera, junto con un campo **Descripción**: texto que se muestra encima de las preguntas en la página pública del formulario, útil para explicar a las personas para qué es el formulario antes de que empiecen a completarlo.

### Agregar una foto de encabezado {#adding-a-header-photo}

Los formularios independientes pueden mostrar una **Foto de encabezado** en la parte superior del formulario. En los detalles del formulario, haz clic en el recuadro de la foto o en **Agregar foto**, luego elige o sube una imagen (se recorta a una proporción de 16:9). Haz clic en **Guardar**. La foto aparece debajo del nombre del formulario, encima de la descripción, en la página de la URL pública del formulario y dondequiera que el formulario esté insertado mediante el elemento **Formulario** del sitio web. Usa **Cambiar foto** para reemplazarla o **Quitar** para eliminarla.

Usa el campo **Mensaje de agradecimiento** para definir lo que las personas ven después de enviar el formulario, incluso en la página de la URL pública del formulario. Si lo dejas en blanco, verán "¡Gracias por enviar el formulario!".

:::tip
Los formularios independientes son ideales para inscripciones a eventos. Comparte la URL pública por correo electrónico, redes sociales o insértala directamente en el sitio web de tu iglesia.
:::

:::info
Para insertar un formulario en tu sitio web de B1, ve al editor de tu sitio web, agrega una nueva sección y selecciona el elemento **Formulario**. Luego elige el formulario que quieres mostrar. Consulta [Administrar páginas](../website/managing-pages.md) para obtener más detalles sobre cómo editar tu sitio web.
:::
