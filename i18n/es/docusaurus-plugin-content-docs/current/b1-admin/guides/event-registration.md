---
title: "Guía: Configurar el registro de eventos"
description: "Configure un formulario de registro de eventos en B1 Admin para recopilar datos de los asistentes y pagos opcionales, incrustarlo en el sitio web de su iglesia y hacer seguimiento de las inscripciones."
---

# Configurar el registro de eventos

<div class="article-intro">

Cree un formulario de registro de eventos, recopile la información de los asistentes y pagos opcionales, insértelo en el sitio web de su iglesia y gestione las inscripciones a medida que llegan. Al final, tendrá una página de registro que podrá compartir para cualquier evento de la iglesia.

</div>

:::info
**Dos formas de gestionar el registro de eventos:** Esta guía explica el **registro mediante formularios**, que le ofrece control total sobre los campos personalizados y la recopilación de pagos. Para eventos más sencillos en los que solo necesita saber quién asistirá, use el **registro nativo de eventos** integrado en el calendario. Consulte [Creación de calendarios](../calendars/creating-calendars.md#enabling-event-registration) para ver las instrucciones de configuración. Con el registro nativo, los miembros pueden inscribirse directamente desde [B1.church o la aplicación B1](../../b1-church/events/registering.md), con control de capacidad, periodos de fechas y confirmaciones por correo electrónico.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de B1 Admin con acceso de administrador
- Para recopilar pagos: [Stripe debe estar configurado](../donations/online-giving-setup.md) primero

</div>

## Paso 1: Cree un formulario independiente

Los formularios independientes tienen su propia URL pública a la que cualquier persona puede acceder, lo cual es ideal para el registro de eventos.

Siga la guía [Creación de formularios](../forms/creating-forms.md) para:

1. Ir a Formularios y hacer clic en Agregar formulario
2. Elegir el tipo "Independiente": esto le dará a su formulario su propia URL pública
3. Asignarle el nombre del evento (por ejemplo, "Inscripción al retiro de hombres", "Inscripción a la VBS")

## Paso 2: Agregue preguntas

Diseñe los campos que necesita recopilar de los participantes.

Siga la guía [Creación de formularios](../forms/creating-forms.md#adding-questions) para agregar sus preguntas:

1. Vaya a la pestaña Preguntas y agregue los campos para la información que necesita: nombre, correo electrónico, teléfono, restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.
2. Use Opción múltiple para opciones como preferencias de comida o selección de sesiones

:::warning
El tipo de campo Pago requiere que Stripe esté configurado. Si todavía no ha configurado las donaciones en línea, consulte [Configuración de donaciones en línea](../donations/online-giving-setup.md) antes de agregar campos de pago.
:::

## Paso 3: Configure los ajustes del formulario

Controle cuándo y cómo estará disponible su formulario de registro.

1. Establezca fechas de disponibilidad si el registro solo debe estar abierto durante un periodo limitado
2. Copie la URL pública: puede compartirla directamente
3. Agregue miembros del formulario con roles de Administrador o Solo lectura para ayudar a gestionar las inscripciones

## Paso 4: Incrústelo en su sitio web

Haga que el formulario de registro sea fácil de encontrar agregándolo al sitio web de su iglesia.

Siga la guía [Administración de páginas](../website/managing-pages.md) para:

1. En el editor de su sitio web de B1, agregue una nueva sección a una página y seleccione el elemento Formulario
2. Elija su formulario de registro de la lista

:::tip
Comparta también la URL independiente por correo electrónico, redes sociales y boletines de la iglesia. Cuantos más lugares la muestren, más inscripciones recibirá.
:::

## Paso 5: Gestione las inscripciones

Haga seguimiento de los registros a medida que llegan y exporte los datos cuando los necesite.

Siga la guía [Administración de respuestas](../forms/managing-submissions.md) para:

1. Revisar las respuestas a medida que llegan en la pestaña Respuestas
2. Exportar a CSV para hojas de cálculo, control del número de asistentes o para compartir con los coordinadores del evento

## ¡Listo!

Su registro de eventos ya está activo. Comparta el enlace, insértelo en su sitio web y haga seguimiento de las inscripciones desde B1 Admin. Cuando termine el evento, exporte la lista final para sus registros.

## Artículos relacionados

- [Creación de formularios](../forms/creating-forms.md): cree formularios con diferentes tipos de campos
- [Administración de respuestas](../forms/managing-submissions.md): revise y exporte las respuestas de los formularios
- [Administración de páginas](../website/managing-pages.md): inserte formularios en su sitio web
- [Configuración de donaciones en línea](../donations/online-giving-setup.md): necesario para los campos de pago
