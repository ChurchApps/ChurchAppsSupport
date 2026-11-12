---
title: "Guía: configurar el registro a eventos"
description: "Configure un formulario de registro de eventos en B1 Admin para recopilar los datos de los asistentes y pagos opcionales, insertarlo en el sitio web de su iglesia y dar seguimiento a las inscripciones."
---

# Configurar el registro a eventos

<div class="article-intro">

Cree un formulario de registro de eventos, recopile la información de los asistentes y los pagos opcionales, insértelo en el sitio web de su iglesia y administre los envíos a medida que llegan. Al final, tendrá una página de registro que puede compartir para cualquier evento de la iglesia.

</div>

:::info
**Dos formas de manejar el registro a eventos:** esta guía cubre el **registro mediante formularios**: un formulario Independiente con su propio enlace público, preguntas personalizadas y un campo de pago opcional. Para un evento en su calendario, puede usar en cambio el **registro a eventos** integrado en el calendario; consulte [Creación de calendarios](../calendars/creating-calendars.md#enabling-event-registration). Permite que los miembros se inscriban directamente desde [B1.church o la App de B1](../../b1-church/events/registering.md), con capacidad, fechas de apertura y cierre, lista de espera, preguntas de registro opcionales de un formulario y tipos de asistente con precio (consulte [Registros de pago](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador
- Para cobrar pagos: primero [Stripe debe estar configurado](../donations/online-giving-setup.md)

</div>

## Paso 1: crear un formulario Independiente {#step-1-create-a-stand-alone-form}

Los formularios Independientes tienen su propia URL pública a la que cualquiera puede acceder, ideal para el registro a eventos.

Siga la guía de [Crear formularios](../forms/creating-forms.md) para:

1. En el [menú Jump](../introduction.md#getting-around-with-the-jump-menu), elija **Personas > Formularios** y haga clic en **Añadir formulario**
2. Nómbrelo según el evento (por ejemplo, "Inscripción al retiro de hombres", "Inscripción a VBS")
3. En **Asociar con**, elija **Independiente**; esto le da a su formulario su propia URL pública
4. Haga clic en **Guardar**

## Paso 2: añadir preguntas {#step-2-add-questions}

Construya los campos que necesita recopilar de quienes se inscriben.

Siga la guía de [Crear formularios](../forms/creating-forms.md#adding-questions) para añadir sus preguntas:

1. Abra el formulario, vaya a la pestaña **Preguntas** y haga clic en **Añadir pregunta** por cada dato que necesite: nombre, correo electrónico, teléfono, restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.
2. Use **Opción múltiple** para opciones como preferencias de comida o selección de sesiones
3. Para cobrar una cuota, añada una pregunta de **Pago** y elija su **Fondo** y su **Monto**

:::warning
El tipo de campo Pago requiere que Stripe esté configurado. Si todavía no ha configurado la donación en línea, consulte [Configuración de donación en línea](../donations/online-giving-setup.md) antes de añadir campos de pago.
:::

## Paso 3: configurar los ajustes del formulario {#step-3-configure-form-settings}

Controle cuándo y cómo está disponible su formulario de registro. Siga la sección [Configurar las propiedades del formulario](../forms/creating-forms.md#configuring-form-properties) para:

1. Haga clic en **Editar formulario** y, si el registro debe estar abierto solo por un tiempo limitado, configure **Configurar periodo de disponibilidad del formulario** en **Sí** y seleccione las fechas de inicio y fin
2. Copie la **URL pública** que aparece en el lado izquierdo de la página del formulario; puede compartirla directamente. Haga clic en **Código QR** junto al formulario en la lista de Formularios para descargar un código QR para folletos y diapositivas
3. En la pestaña **Miembros del formulario**, añada personas como **Administrador** o **Solo ver** para ayudar a administrar los envíos, y active **Notificación por correo electrónico** para quienes deban recibir un correo por cada nuevo registro

## Paso 4: insertar en su sitio web {#step-4-embed-on-your-website}

Haga que el formulario de registro sea fácil de encontrar añadiéndolo al sitio web de su iglesia.

Siga la guía del [Editor de páginas](../website/page-editor.md) para:

1. Abra una página en el editor de su sitio web de B1 y haga clic en **Añadir contenido**
2. Arrastre el elemento **Formulario** a una sección y elija su formulario de registro

:::tip
Comparta también la URL independiente por correo electrónico, redes sociales y boletines de la iglesia: cuanto más visible esté, más inscripciones recibirá.
:::

## Paso 5: administrar los envíos {#step-5-manage-submissions}

Dé seguimiento a los registros a medida que llegan y exporte los datos cuando los necesite.

Siga la guía de [Administrar envíos](../forms/managing-submissions.md) para:

1. Revisar las respuestas a medida que llegan en la pestaña **Envíos del formulario**
2. Hacer clic en **Exportar** para descargar un CSV para hojas de cálculo, el conteo de asistentes o para compartirlo con los coordinadores del evento

## ¡Listo! {#youre-done}

Su registro de evento ya está activo. Comparta el enlace, insértelo en su sitio web y dé seguimiento a las inscripciones desde B1 Admin. Cuando termine el evento, exporte la lista final para sus registros.

## Artículos relacionados {#related-articles}

- [Crear formularios](../forms/creating-forms.md): cree formularios con distintos tipos de campos
- [Administrar envíos](../forms/managing-submissions.md): revise y exporte las respuestas de los formularios
- [Editor de páginas](../website/page-editor.md): inserte formularios en su sitio web
- [Configuración de donación en línea](../donations/online-giving-setup.md): necesaria para los campos de pago
