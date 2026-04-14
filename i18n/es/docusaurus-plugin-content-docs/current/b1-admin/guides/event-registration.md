---
title: "Guía: Configuración del Registro de Eventos"
---

# Configuración del Registro de Eventos

<div class="article-intro">

Cree un formulario de registro de eventos, recopile información de asistentes y pagos opcionales, incrústelo en su sitio web de iglesia y gestione los envíos a medida que lleguen. Al final, tendrá una página de registro compartible para cualquier evento de iglesia.

</div>

:::info
**Dos formas de manejar el registro de eventos:** Esta guía cubre el **registro basado en formularios**, que le brinda control total sobre campos personalizados y recopilación de pagos. Para eventos más simples donde solo necesita rastrear quién viene, use el **registro de eventos nativo** integrado en el calendario -- consulte [Creación de Calendarios](../calendars/creating-calendars.md#enabling-event-registration) para instrucciones de configuración. El registro nativo permite que los miembros se inscriban directamente desde el [sitio web B1](../../b1-church/events/registering) y la [aplicación móvil](../../b1-mobile/events/registering) con seguimiento de capacidad, ventanas de fecha y confirmaciones por correo electrónico.
:::

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Cuenta B1 Admin con acceso administrativo
- Para recopilar pagos: [Stripe debe estar configurado](../donations/online-giving-setup.md) primero

</div>

## Paso 1: Crear un Formulario Independiente

Los formularios independientes tienen su propia URL pública que cualquiera puede acceder — perfecto para registro de eventos.

Siga la guía de [Creación de Formularios](../forms/creating-forms.md) para:

1. Navegue a Formularios y haga clic en Agregar Formulario
2. Elija el tipo "Independiente" — esto le da a su formulario su propia URL pública
3. Nómbrelo según el evento (por ejemplo, "Registro del Retiro de Hombres", "Inscripción de VBS")

## Paso 2: Agregar Preguntas

Construya los campos que necesita para recopilar información de los inscritos.

Siga la guía de [Creación de Formularios](../forms/creating-forms.md#adding-questions) para agregar sus preguntas:

1. Vaya a la pestaña de Preguntas y agregue campos para la información que necesita: nombre, correo electrónico, teléfono, restricciones dietéticas, tamaño de camiseta, contacto de emergencia, etc.
2. Use Opción Múltiple para opciones como preferencias de comidas o selecciones de sesión

:::warning
El tipo de campo de Pago requiere que Stripe esté configurado. Si aún no ha configurado donaciones en línea, consulte [Configuración de Donaciones en Línea](../donations/online-giving-setup.md) antes de agregar campos de pago.
:::

## Paso 3: Configurar la Configuración del Formulario

Controle cuándo y cómo está disponible su formulario de registro.

1. Establezca fechas de disponibilidad si el registro solo debe estar abierto durante un período limitado
2. Copie la URL pública — puede compartirla directamente
3. Agregue miembros del formulario con roles de Administrador o Solo Ver para ayudar a gestionar los envíos

## Paso 4: Incrustar en Su Sitio Web

Facilite el acceso al formulario de registro agregándolo a su sitio web de iglesia.

Siga la guía de [Gestión de Páginas](../website/managing-pages.md) para:

1. En el editor del sitio web B1, agregue una nueva sección a una página y seleccione el elemento Formulario
2. Elija su formulario de registro de la lista

:::tip
Comparta la URL independiente por correo electrónico, redes sociales y boletines de la iglesia también — cuanto más lugares sea visible, más inscripciones obtendrá.
:::

## Paso 5: Gestionar Envíos

Rastreee registros a medida que llegan y exporte datos cuando lo necesite.

Siga la guía de [Gestión de Envíos](../forms/managing-submissions.md) para:

1. Revise las respuestas a medida que lleguen en la pestaña Envíos
2. Exporte a CSV para hojas de cálculo, seguimiento de asistencia o compartir con coordinadores de eventos

## ¡Terminado!

Su registro de eventos está activo. Comparta el enlace, incrústelo en su sitio web y rastreee inscripciones desde B1 Admin. Cuando el evento termine, exporte la lista final para sus registros.

## Artículos Relacionados

- [Creación de Formularios](../forms/creating-forms.md) — crear formularios con diferentes tipos de campos
- [Gestión de Envíos](../forms/managing-submissions.md) — revisar y exportar respuestas de formularios
- [Gestión de Páginas](../website/managing-pages.md) — incrustar formularios en su sitio web
- [Configuración de Donaciones en Línea](../donations/online-giving-setup.md) — requerido para campos de pago