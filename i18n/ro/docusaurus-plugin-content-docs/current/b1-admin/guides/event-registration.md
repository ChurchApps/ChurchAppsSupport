---
title: "Guía: Configurar el registro de eventos"
description: "Configure un formulario de registro de eventos en B1 Admin para recopilar datos de los asistentes y pagos opcionales, insértelo en el sitio web de su iglesia y haga seguimiento de las inscripciones."
---

# Configurar el registro de eventos

<div class="article-intro">

Cree un formulario de registro de eventos, recopile la información de los asistentes y pagos opcionales, insértelo en el sitio web de su iglesia y gestione las inscripciones a medida que llegan. Al terminar, tendrá una página de registro que puede compartir para cualquier evento de la iglesia.

</div>

:::info
**Dos formas de gestionar el registro de eventos:** Esta guía cubre el **registro mediante formularios**, que le da control total sobre los campos personalizados y la recopilación de pagos. Para eventos más sencillos en los que solo necesita saber quién asistirá, use el **registro nativo de eventos** integrado en el calendario; consulte [Creating Calendars](../calendars/creating-calendars.md#enabling-event-registration) para las instrucciones de configuración. El registro nativo permite a los miembros inscribirse directamente desde [B1.church o la aplicación B1](../../b1-church/events/registering.md), con control de capacidad, periodos de fechas y confirmaciones por correo electrónico.
:::

<div class="prereqs">
<h4>Antes de empezar</h4>

- Una cuenta de B1 Admin con acceso de administrador
- Para recopilar pagos: [Stripe debe estar configurado](../donations/online-giving-setup.md) primero

</div>

## Paso 1: Crear un formulario independiente

Los formularios independientes tienen su propia URL pública a la que cualquiera puede acceder, lo que los hace ideales para el registro de eventos.

Siga la guía [Creating Forms](../forms/creating-forms.md) para:

1. Ir a Forms y hacer clic en Add Form
2. Elegir el tipo "Stand Alone": así su formulario tendrá su propia URL pública
3. Ponerle el nombre del evento (por ejemplo, "Registro al retiro de hombres" o "Inscripción a la VBS")

## Paso 2: Añadir preguntas

Configure los campos que necesita recopilar de los inscritos.

Siga la guía [Creating Forms](../forms/creating-forms.md#adding-questions) para añadir sus preguntas:

1. Vaya a la pestaña Questions y añada campos para la información que necesita: nombre, correo electrónico, teléfono, restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.
2. Use Multiple Choice para opciones como preferencias de comida o selección de sesiones

:::warning
El tipo de campo Payment requiere que Stripe esté configurado. Si todavía no ha configurado las donaciones en línea, consulte [Online Giving Setup](../donations/online-giving-setup.md) antes de añadir campos de pago.
:::

## Paso 3: Configurar los ajustes del formulario

Controle cuándo y cómo está disponible su formulario de registro.

1. Establezca las fechas de disponibilidad si el registro solo debe estar abierto durante un periodo limitado
2. Copie la URL pública: puede compartirla directamente
3. Añada miembros del formulario con los roles Admin o View Only para ayudar a gestionar las inscripciones

## Paso 4: Insertar en su sitio web

Haga que el formulario de registro sea fácil de encontrar añadiéndolo al sitio web de su iglesia.

Siga la guía [Managing Pages](../website/managing-pages.md) para:

1. En el editor de su sitio web de B1, añada una nueva sección a una página y seleccione el elemento Form
2. Elija su formulario de registro de la lista

:::tip
Comparta también la URL independiente por correo electrónico, redes sociales y boletines de la iglesia: cuanto más visible sea, más inscripciones recibirá.
:::

## Paso 5: Gestionar las inscripciones

Haga seguimiento de los registros a medida que llegan y exporte los datos cuando lo necesite.

Siga la guía [Managing Submissions](../forms/managing-submissions.md) para:

1. Revisar las respuestas a medida que llegan en la pestaña Submissions
2. Exportar a CSV para hojas de cálculo, control del número de asistentes o para compartirlas con los coordinadores del evento

## ¡Listo!

Su registro de evento ya está activo. Comparta el enlace, insértelo en su sitio web y haga seguimiento de las inscripciones desde B1 Admin. Cuando termine el evento, exporte la lista final para sus archivos.

## Artículos relacionados

- [Creating Forms](../forms/creating-forms.md): cree formularios con distintos tipos de campos
- [Managing Submissions](../forms/managing-submissions.md): revise y exporte las respuestas de los formularios
- [Managing Pages](../website/managing-pages.md): inserte formularios en su sitio web
- [Online Giving Setup](../donations/online-giving-setup.md): necesario para los campos de pago
