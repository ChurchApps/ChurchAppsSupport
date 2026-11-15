---
title: "Crear formularios"
description: "Cree formularios personalizados en B1 Admin para inscripciones a eventos, encuestas y tarjetas de visitantes, y compártalos por enlace, código QR o impresión."
---

# Crear formularios

<div class="article-intro">

Cree formularios personalizados para recopilar información de su congregación. Puede crear formularios para inscripciones a eventos, encuestas, tarjetas de visitantes, solicitudes de membresía y más. Los formularios pueden vincularse a personas de su base de datos o usarse como páginas independientes con su propia URL pública.

</div>

## Video de capacitación {#training-video}

<YouTube id="UZ4dGCNIFw4" title="Creación de formularios y administración de envíos en B1" next="Lanzamiento del sitio web de su iglesia en B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para los formularios de **Personas** (vinculados a registros de personas), primero necesita [personas en su base de datos](../people/adding-people.md).
- Para los formularios que cobran **pagos**, debe tener [Stripe configurado para la donación en línea](../donations/online-giving-setup.md).

</div>

## Crear un formulario nuevo {#creating-a-new-form}

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), despliegue **Personas** y haga clic en **Formularios**.
2. Haga clic en **Añadir formulario**.
3. Introduzca un **nombre** para su formulario.
4. Elija el tipo de formulario en el menú desplegable **Asociar con**:
   - **Personas**: asocia los envíos con los [registros de personas](../people/adding-people.md) de su base de datos. Los formularios de personas se completan desde el registro de una persona, así que no tienen un enlace para compartir.
   - **Independiente**: crea un formulario independiente con su propia URL pública, ideal para inscripciones externas. Solo los formularios Independientes ofrecen una [foto de encabezado](#adding-a-header-photo), un [código QR](#sharing-a-form-with-a-qr-code), un [grupo vinculado](#linking-a-form-to-a-group) y **Crear un registro de persona a partir de los envíos**.
5. Para un formulario Independiente, puede completar el resto de sus [propiedades](#configuring-form-properties) ahora o más adelante.
6. Haga clic en **Guardar** para crear el formulario.

Su nuevo formulario aparecerá en la lista. Haga clic en él para empezar a añadir preguntas.

## Imprimir un formulario en blanco {#printing-a-blank-form}

¿Necesita una copia en papel para entregar, por ejemplo una tarjeta de visitante en el módulo de bienvenida, o un formulario que alguien sin acceso a internet pueda llenar a mano? Haga clic en **Imprimir** junto a un formulario en la lista principal de Formularios para abrir una vista previa y luego haga clic en **Imprimir**. Los campos en blanco se imprimen con una línea o una casilla para cada pregunta, de modo que las personas puedan completarlos a mano; las preguntas obligatorias se marcan con un asterisco. En la parte superior de la página aparece el logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si ha subido uno) con el nombre de su iglesia debajo, y luego el nombre del formulario. No hay otras opciones de impresión: se imprime todo el formulario o nada.

## Compartir un formulario con un código QR {#sharing-a-form-with-a-qr-code}

Los formularios Independientes tienen un enlace **Código QR** junto a ellos en la lista principal de Formularios (los formularios archivados no lo tienen). Haga clic en él para abrir un código QR de la URL pública del formulario, con el enlace mostrado debajo. Haga clic en **Descargar PNG** para guardar el código como imagen que puede imprimir en boletines o mostrar en diapositivas. Cualquiera que lo escanee abre el formulario en su teléfono.

## Añadir preguntas {#adding-questions}

1. Abra su formulario y vaya a la pestaña **Preguntas**.
2. Haga clic en **Añadir pregunta**.
3. Seleccione un **Tipo de campo**:
   - **Cuadro de texto**: para respuestas de texto cortas
   - **Número entero** y **Decimal**: para números
   - **Fecha**: para seleccionar fechas
   - **Sí/No**: para una respuesta de sí o no
   - **Correo electrónico**: para direcciones de correo electrónico
   - **Número de teléfono**: para ingresar teléfonos
   - **Área de texto**: para respuestas más largas
   - **Opción múltiple**: para elegir una de varias opciones
   - **Casilla de verificación**: para marcar cualquier número de opciones
   - **Pago**: para cobrar pagos
4. Introduzca un **Título** y una **Descripción** opcional para la pregunta. La descripción aparece debajo de la pregunta cuando las personas llenan el formulario, así que úsela para dar pistas como "Incluya cualquier alergia que debamos conocer".
5. Complete los campos adicionales del tipo que eligió:
   - Para las preguntas de texto, número, fecha, correo electrónico y teléfono, un **Texto de ejemplo** opcional muestra un texto de muestra dentro del cuadro vacío.
   - Para **Opción múltiple** y **Casilla de verificación**, añada cada opción en **Opciones**: introduzca un **Valor** (lo que se guarda) y un **Texto** (lo que ven las personas), luego haga clic en el botón de añadir. Haga clic en el icono de eliminar para quitar una opción.
   - Para **Pago**, elija el **Fondo** al que va el dinero y el **Monto**.
6. Marque **Requerir respuesta a esta pregunta** si el campo es obligatorio. (Las preguntas de pago no tienen esta opción).
7. Haga clic en **Guardar**.
8. Repita para añadir más preguntas.

La pestaña **Preguntas** enumera cada pregunta con su tipo y si es obligatoria. Haga clic en el título de una pregunta para editarla, o haga clic en **Eliminar** en el formulario de la pregunta y confirme para quitarla. Use las flechas **Subir** y **Bajar** de una fila para cambiar el orden en que aparecen las preguntas.

:::warning
El tipo de campo **Pago** requiere que Stripe esté configurado. Si todavía no ha configurado la donación en línea, consulte [Configuración de donación en línea](../donations/online-giving-setup.md) antes de añadir campos de pago. Las personas que paguen en un formulario sin iniciar sesión deben marcar la casilla **No soy un robot** antes de que se acepte la tarjeta.
:::

## Administrar miembros del formulario {#managing-form-members}

Los formularios Independientes tienen una pestaña **Miembros del formulario** para dar acceso solo a ese formulario.

1. Abra su formulario y vaya a la pestaña **Miembros del formulario**.
2. En **Añadir persona**, busque a una persona y haga clic en el icono de añadir junto a su nombre. Los nuevos miembros empiezan como **Solo ver**.
3. En la columna **Permiso**, haga clic en el rol que desee:
   - **Administrador**: puede editar el formulario y ver todos los envíos.
   - **Solo ver**: puede ver los envíos, pero no puede editar el formulario.
4. Active **Notificación por correo electrónico** para cualquiera que deba recibir un correo cada vez que se envíe el formulario.

Para quitar a alguien del formulario, haga clic en **Quitar** en su fila y confirme.

## Vincular un formulario a un grupo {#linking-a-form-to-a-group}

Puede vincular cualquier formulario Independiente a un grupo; por ejemplo, un formulario de peticiones de oración para un grupo pequeño, o una autorización médica para un viaje juvenil:

1. Abra el formulario y haga clic en **Editar formulario** (o haga clic en **Editar** junto al formulario en la lista de Formularios).
2. En **Grupo vinculado**, seleccione el grupo, o déjelo en **Ninguno**.
3. Haga clic en **Guardar**.

Una vez vinculado un formulario:

- **Los miembros del grupo** ven el formulario en una sección de **Formularios** en la página del grupo en B1.church mientras el formulario está abierto, con un botón **Completar** que lo abre (consulte [Detalles del grupo](../../b1-church/groups/group-details.md#linked-forms)).
- **Los líderes del grupo** también ven los formularios cerrados, y pueden leer las respuestas de cada envío e imprimirlas (un envío o **Imprimir todos**). Los líderes solo pueden ver las respuestas; no pueden editar el formulario a menos que también sean [miembros del formulario](#managing-form-members).
- **En B1 Admin**, la página del grupo muestra una sección de **Formularios vinculados** que enumera cada formulario vinculado como **Abierto** o **Cerrado**. Aparece para los líderes del grupo y para las personas que pueden administrar formularios. Consulte [Miembros del grupo](../groups/group-members.md#linked-forms).

Un formulario está cerrado cuando queda fuera de su periodo de disponibilidad. Los formularios archivados no se muestran en la página del grupo.

### Añadir automáticamente a quienes envían al grupo {#automatically-adding-submitters-to-a-group}

Vincular un formulario a un grupo no añade a nadie por sí solo. Para añadir a todas las personas que envían el formulario a la lista del grupo vinculado, marque también **Crear un registro de persona a partir de los envíos** en la configuración del formulario y haga clic en **Guardar**.

Cada vez que alguien envía el formulario, la persona relacionada o recién creada se añade al grupo (se omiten los miembros que ya están en el grupo). Esto es útil para cosas como un formulario de inscripción a un campamento que debe crear automáticamente la lista del grupo del campamento.

### Enviar un correo de seguimiento {#sending-a-follow-up-email}

Con **Crear un registro de persona a partir de los envíos** marcado, también puede enviar un correo electrónico a cada persona que envíe el formulario. Complete el **Asunto del correo de seguimiento** y el **Cuerpo del correo de seguimiento** en la configuración del formulario. Puede usar las etiquetas `{firstName}` y `{churchName}` en ambos. El correo solo se envía cuando ambos campos están completos.

:::info
Los correos de seguimiento solo se envían después de que su iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicar un formulario {#duplicating-a-form}

Para reutilizar un formulario como punto de partida para uno nuevo, haga clic en **Duplicar** junto al formulario en la lista de Formularios y confirme. Aparece un mensaje de **Formulario duplicado**, y B1 crea una copia exacta del formulario, incluidas todas las preguntas, que luego puede renombrar y editar de forma independiente.

:::tip
Duplicar es útil para eventos recurrentes donde las preguntas de inscripción se mantienen de un año a otro. Duplique el formulario del año pasado, actualice el nombre y las fechas, y estará listo.
:::

## Configurar las propiedades del formulario {#configuring-form-properties}

Puede actualizar el nombre y la configuración de su formulario en cualquier momento: abra el formulario y haga clic en **Editar formulario** en el lado izquierdo de la página, o haga clic en **Editar** junto al formulario en la lista de Formularios. En el lado izquierdo de la página del formulario aparecen el tipo de formulario (**Personas** o **Independiente**) y, para los formularios Independientes, si es **Público** o **Restringido**, además de su **URL pública** única, que puede compartir con cualquiera.

Las opciones de **Editar formulario** son:

- **Nombre del formulario**: el nombre que se muestra en B1 Admin y en la parte superior del formulario.
- **Descripción** *(Independiente)*: texto que se muestra encima de las preguntas en la página pública del formulario, útil para explicar a las personas para qué sirve el formulario antes de que empiecen a llenarlo.
- **Foto de encabezado** *(Independiente)*: consulte [Añadir una foto de encabezado](#adding-a-header-photo).
- **Acceso al formulario** *(Independiente)*: **Público** permite que cualquiera con el enlace llene el formulario; **Restringido** requiere que las personas inicien sesión en el sitio de su iglesia antes de poder abrirlo.
- **Configurar periodo de disponibilidad del formulario** *(Independiente)*: elija **Sí** y establezca una **Fecha de inicio de disponibilidad** y una **Fecha de fin de disponibilidad** para aceptar envíos solo entre esas fechas. Fuera de ellas, el formulario está cerrado.
- **Mensaje de agradecimiento**: lo que ven las personas después de enviar el formulario (consulte más abajo).
- **Modo de visualización**: **Estándar** muestra todas las preguntas en una sola página; **Conversacional (una pregunta a la vez)** las muestra una por una.
- **Crear un registro de persona a partir de los envíos** *(Independiente)*, **Grupo vinculado** y los campos del correo de seguimiento: consulte [Vincular un formulario a un grupo](#linking-a-form-to-a-group) y [Enviar un correo de seguimiento](#sending-a-follow-up-email).

Haga clic en **Guardar** para conservar sus cambios. Para eliminar un formulario de forma permanente, haga clic en **Eliminar** en la configuración del formulario y confirme; si quiere conservarlo pero ocultarlo de la lista, [archívelo](./index.md#what-you-can-do).

### Añadir una foto de encabezado {#adding-a-header-photo}

Los formularios Independientes pueden mostrar una **Foto de encabezado** en la parte superior del formulario. En los detalles del formulario, haga clic en el recuadro de la foto o en **Añadir foto**, luego elija o suba una imagen (se recorta a un formato 16:9). Haga clic en **Guardar**. La foto aparece debajo del nombre del formulario, encima de la descripción, en la página de URL pública del formulario y en cualquier lugar donde se inserte el formulario con el elemento **Formulario** del sitio web. Use **Cambiar foto** para reemplazarla o **Quitar** para eliminarla.

Use el campo **Mensaje de agradecimiento** para definir lo que ven las personas después de enviar el formulario, incluso en la página de URL pública del formulario. Si lo deja en blanco, verán "¡Gracias por enviar el formulario!"

:::tip
Los formularios Independientes son ideales para inscripciones a eventos. Comparta la URL pública por correo electrónico o redes sociales, o inserte el formulario directamente en el sitio web de su iglesia.
:::

:::info
Para insertar un formulario en su sitio web de B1, vaya al editor de su sitio web, añada una nueva sección y seleccione el elemento **Formulario**. Luego elija el formulario que desea mostrar. Consulte [Administrar páginas](../website/managing-pages.md) para más detalles sobre cómo editar su sitio web.
:::
