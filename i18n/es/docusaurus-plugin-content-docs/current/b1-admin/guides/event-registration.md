---
title: "Guía: Configurar el registro de eventos"
---

# Configurar el registro de eventos

<div class="article-intro">

Crea un formulario de registro de eventos, recopila información de los asistentes y pagos opcionales, insértalo en el sitio web de tu iglesia y gestiona las respuestas a medida que lleguen. Al finalizar, tendrás una página de registro compartible para cualquier evento de la iglesia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cuenta de B1 Admin con acceso de administrador
- Para cobrar pagos: [Stripe debe estar configurado](../donations/online-giving-setup.md) primero

</div>

## Paso 1: Crear un formulario independiente

Los formularios independientes tienen su propia URL pública a la que cualquiera puede acceder — perfecto para el registro de eventos.

Sigue la guía [Crear formularios](../forms/creating-forms.md) para:

1. Navegar a Formularios y hacer clic en Agregar formulario
2. Elegir el tipo "Independiente" — esto le da a tu formulario su propia URL pública
3. Nombrarlo según el evento (por ejemplo, "Registro del Retiro de Hombres", "Inscripción a la Escuela Bíblica de Vacaciones")

## Paso 2: Agregar preguntas

Construye los campos que necesitas recopilar de los participantes.

Sigue la guía [Crear formularios](../forms/creating-forms.md#agregar-preguntas) para agregar tus preguntas:

1. Ve a la pestaña de Preguntas y agrega campos para la información que necesitas: nombre, correo electrónico, teléfono, restricciones alimentarias, talla de camiseta, contacto de emergencia, etc.
2. Usa Opción múltiple para opciones como preferencias de comida o selección de sesiones

:::warning
El tipo de campo de Pago requiere que Stripe esté configurado. Si aún no has configurado las donaciones en línea, consulta [Configuración de donaciones en línea](../donations/online-giving-setup.md) antes de agregar campos de pago.
:::

## Paso 3: Configurar los ajustes del formulario

Controla cuándo y cómo tu formulario de registro está disponible.

1. Establece fechas de disponibilidad si el registro solo debe estar abierto por un tiempo limitado
2. Copia la URL pública — puedes compartirla directamente
3. Agrega miembros del formulario con roles de Administrador o Solo lectura para ayudar a gestionar las respuestas

## Paso 4: Insertar en tu sitio web

Haz que el formulario de registro sea fácil de encontrar agregándolo al sitio web de tu iglesia.

Sigue la guía [Gestionar páginas](../website/managing-pages.md) para:

1. En el editor de tu sitio web B1, agregar una nueva sección a una página y seleccionar el elemento de Formulario
2. Elegir tu formulario de registro de la lista

:::tip
Comparte también la URL independiente por correo electrónico, redes sociales y boletines de la iglesia — cuantos más lugares sea visible, más inscripciones obtendrás.
:::

## Paso 5: Gestionar las respuestas

Rastrea los registros a medida que lleguen y exporta los datos cuando los necesites.

Sigue la guía [Gestionar respuestas](../forms/managing-submissions.md) para:

1. Revisar las respuestas a medida que lleguen en la pestaña de Respuestas
2. Exportar a CSV para hojas de cálculo, seguimiento de asistentes o compartir con los coordinadores del evento

## ¡Listo!

Tu registro de eventos está en línea. Comparte el enlace, insértalo en tu sitio web y rastrea las inscripciones desde B1 Admin. Cuando el evento termine, exporta la lista final para tus registros.

## Artículos relacionados

- [Crear formularios](../forms/creating-forms.md) — crear formularios con diferentes tipos de campos
- [Gestionar respuestas](../forms/managing-submissions.md) — revisar y exportar respuestas de formularios
- [Gestionar páginas](../website/managing-pages.md) — insertar formularios en tu sitio web
- [Configuración de donaciones en línea](../donations/online-giving-setup.md) — requerido para campos de pago
