---
title: "Creación de formularios"
---

# Creación de formularios

<div class="article-intro">

Cree formularios personalizados para recopilar información de su congregación. Puede crear formularios para inscripciones a eventos, encuestas, tarjetas de visitante, solicitudes de membresía y más. Los formularios pueden estar vinculados a personas de su base de datos o usarse como páginas independientes con su propia URL pública.

</div>

## Video de capacitación

<YouTube id="sr9wxEj9ghQ" title="Creación de formularios y administración de respuestas en B1" next="Lanzamiento del sitio web de su iglesia en B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Para los formularios de **Personas** (vinculados a registros de personas), primero necesita [personas en su base de datos](../people/adding-people.md).
- Para los formularios que recopilan **pagos**, debe tener [Stripe configurado para las donaciones en línea](../donations/online-giving-setup.md).

</div>

## Crear un nuevo formulario

1. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la esquina superior izquierda de B1 Admin), expanda **Personas** y haga clic en **Formularios**.
2. Haga clic en **Agregar formulario**.
3. Escriba un **nombre** para su formulario.
4. Elija el tipo de formulario en el menú desplegable **Asociar con**:
   - **Personas**: asocia las respuestas con [registros de personas](../people/adding-people.md) de su base de datos. Los formularios de Personas se llenan desde el registro de una persona, por lo que no tienen un enlace para compartir.
   - **Independiente**: crea un formulario propio con su propia URL pública, ideal para inscripciones externas. Solo los formularios Independientes ofrecen una [foto de encabezado](#adding-a-header-photo), un [código QR](#sharing-a-form-with-a-qr-code), un [grupo vinculado](#linking-a-form-to-a-group) y **Crear un registro de persona a partir de las respuestas**.
5. Haga clic en **Guardar** para crear el formulario.

Su nuevo formulario aparecerá en la lista. Haga clic en él para empezar a agregar preguntas.

## Imprimir un formulario en blanco {#printing-a-blank-form}

¿Necesita una copia en papel para entregar, por ejemplo una tarjeta de visitante en la mesa de bienvenida, o un formulario que alguien sin acceso a internet pueda llenar a mano? Haga clic en **Imprimir**, junto a un formulario en la lista principal de Formularios, para abrir una vista previa y luego haga clic en **Imprimir**. Los campos en blanco se imprimen con una línea o casilla para cada pregunta, de modo que las personas puedan completarlos a mano; las preguntas obligatorias se marcan con un asterisco. En la parte superior de la página aparece el logotipo de su iglesia (el **Logotipo para fondo claro** de [Sitio web > Apariencia](../website/appearance.md), si lo subió), con el nombre de su iglesia debajo, y luego el nombre del formulario. No hay otras opciones de impresión: se imprime el formulario completo o nada.

## Compartir un formulario con un código QR {#sharing-a-form-with-a-qr-code}

Los formularios Independientes tienen un enlace **Código QR** junto a ellos en la lista principal de Formularios (los formularios archivados no lo tienen). Haga clic en él para abrir un código QR de la URL pública del formulario, con el enlace debajo. Haga clic en **Descargar PNG** para guardar el código como imagen que puede imprimir en los boletines o mostrar en las diapositivas. Quien lo escanee abrirá el formulario en su teléfono.

## Agregar preguntas {#adding-questions}

1. Abra su formulario y vaya a la pestaña **Preguntas**.
2. Haga clic en **Agregar pregunta**.
3. Seleccione un **tipo de campo** en el menú desplegable Proveedor. Los tipos disponibles incluyen:
   - **Cuadro de texto**: para respuestas cortas de texto
   - **Fecha**: para seleccionar fechas
   - **Correo electrónico**: para direcciones de correo electrónico
   - **Número de teléfono**: para ingresar teléfonos
   - **Opción múltiple**: para elegir entre opciones predefinidas
   - **Pago**: para cobrar pagos
4. Escriba un **Título** y una **Descripción** opcional para la pregunta. La descripción aparece debajo de la pregunta cuando las personas llenan el formulario, así que úsela para dar pistas como "Incluya cualquier alergia que debamos conocer".
5. Marque **Requerir una respuesta** si el campo es obligatorio.
6. Haga clic en **Guardar**.
7. Repita para agregar más preguntas.

:::warning
El tipo de campo **Pago** requiere que Stripe esté configurado. Si todavía no ha configurado las donaciones en línea, consulte [Configuración de donaciones en línea](../donations/online-giving-setup.md) antes de agregar campos de pago. Quienes paguen en un formulario sin iniciar sesión deben marcar la casilla **No soy un robot** antes de que se acepte la tarjeta.
:::

## Administrar miembros del formulario {#managing-form-members}

1. Abra su formulario y vaya a la pestaña **Miembros del formulario**.
2. Busque a una persona y agréguela con un rol:
   - **Administrador**: puede editar el formulario y ver todas las respuestas.
   - **Solo lectura**: puede ver las respuestas, pero no puede editar el formulario.

## Vincular un formulario a un grupo {#linking-a-form-to-a-group}

Puede vincular cualquier formulario Independiente a un grupo, por ejemplo, un formulario de peticiones de oración para un grupo pequeño, o una autorización médica para un viaje juvenil:

1. Abra los **Detalles** de su formulario.
2. En **Grupo vinculado**, seleccione el grupo, o déjelo en **Ninguno**.
3. Haga clic en **Guardar**.

Una vez vinculado el formulario:

- Los **miembros del grupo** ven el formulario en una sección **Formularios** de la página del grupo en B1.church mientras el formulario esté abierto, con un botón **Llenar** que lo abre (consulte [Detalles del grupo](../../b1-church/groups/group-details.md#linked-forms)).
- Los **líderes del grupo** también ven los formularios cerrados, y pueden leer las respuestas de cada envío e imprimirlas (una respuesta o **Imprimir todo**). Los líderes solo pueden ver las respuestas: no pueden editar el formulario a menos que también sean [miembros del formulario](#managing-form-members).
- **En B1 Admin**, la página del grupo muestra una sección **Formularios vinculados** que enumera cada formulario vinculado como **Abierto** o **Cerrado**. Aparece para los líderes del grupo y para las personas que pueden administrar formularios. Consulte [Miembros del grupo](../groups/group-members.md#linked-forms).

Un formulario está cerrado cuando está fuera de su periodo de disponibilidad. Los formularios archivados no se muestran en la página del grupo.

### Agregar automáticamente a quienes envían el formulario a un grupo {#automatically-adding-submitters-to-a-group}

Vincular un formulario a un grupo no agrega a nadie por sí solo. Para agregar a todas las personas que envían el formulario a la lista del grupo vinculado, active también **Crear un registro de persona a partir de las respuestas** en los detalles del formulario y haga clic en **Guardar**.

Cada vez que alguien envía el formulario, la persona encontrada o recién creada se agrega al grupo (los miembros que ya están en el grupo se omiten). Esto es útil para casos como un formulario de inscripción a un campamento que debe crear automáticamente la lista del grupo del campamento.

### Enviar un correo de seguimiento {#sending-a-follow-up-email}

Con **Crear un registro de persona a partir de las respuestas** activado, también puede enviar un correo electrónico a cada persona que envíe el formulario. Complete **Asunto del correo de seguimiento** y **Cuerpo del correo de seguimiento** en los detalles del formulario. Puede usar las etiquetas `{firstName}` y `{churchName}` en ambos. El correo solo se envía cuando ambos campos están completos.

:::info
Los correos de seguimiento solo se envían después de que su iglesia haya sido aprobada para enviar correo de grupo, y cuentan para el límite diario de correos de su iglesia. Consulte [Activar el correo de grupo para su iglesia](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicar un formulario

Para reutilizar un formulario como punto de partida para uno nuevo, haga clic en **Duplicar** junto al formulario en la lista de Formularios y confirme. B1 crea una copia exacta del formulario, incluidas todas las preguntas, que puede renombrar y editar de forma independiente.

:::tip
Duplicar es útil para eventos recurrentes en los que las preguntas de inscripción no cambian de un año a otro. Duplique el formulario del año pasado, actualice el nombre y las fechas, y listo.
:::

## Configurar las propiedades del formulario

Puede actualizar el nombre y la configuración de su formulario en cualquier momento. En los formularios Independientes también verá una **URL pública** única que puede compartir con cualquiera, junto con un campo **Descripción**: texto que se muestra encima de las preguntas en la página pública del formulario, útil para explicar a las personas para qué sirve antes de que empiecen a llenarlo.

### Agregar una foto de encabezado {#adding-a-header-photo}

Los formularios Independientes pueden mostrar una **Foto de encabezado** en la parte superior. En los detalles del formulario, haga clic en el recuadro de la foto o en **Agregar foto**, luego elija o suba una imagen (se recorta a una forma de 16:9). Haga clic en **Guardar**. La foto aparece debajo del nombre del formulario, encima de la descripción, en la página de la URL pública del formulario y en cualquier lugar donde el formulario esté incrustado con el elemento **Formulario** del sitio web. Use **Cambiar foto** para reemplazarla o **Quitar** para eliminarla.

Use el campo **Mensaje de agradecimiento** para definir lo que las personas ven después de enviar el formulario, incluido en la página de la URL pública. Si lo deja en blanco, verán "¡Gracias por enviar el formulario!".

:::tip
Los formularios Independientes son ideales para inscripciones a eventos. Comparta la URL pública por correo electrónico o redes sociales, o incruste el formulario directamente en el sitio web de su iglesia.
:::

:::info
Para incrustar un formulario en su sitio web de B1, vaya al editor del sitio web, agregue una nueva sección y seleccione el elemento **Formulario**. Luego elija el formulario que desea mostrar. Consulte [Administrar páginas](../website/managing-pages.md) para más detalles sobre cómo editar su sitio web.
:::
