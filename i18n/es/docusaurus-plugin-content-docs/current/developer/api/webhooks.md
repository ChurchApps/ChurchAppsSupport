---
title: "Webhooks"
---

# Webhooks

<div class="article-intro">

Los webhooks permiten a una iglesia enviar notificaciones en tiempo real a herramientas de terceros -- plataformas de automatización (Zapier, Make, n8n), CRM, sistemas contables, o cualquier cosa que acepte un POST HTTP. Cuando una persona, grupo u hogar cambia en B1, B1 envía un payload JSON firmado a cada URL suscrita a ese evento.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Un administrador de la iglesia con el permiso **Editar Configuración de la Iglesia** registra y gestiona webhooks
- Tu punto final receptor debe ser accesible sobre **HTTPS** en una dirección pública
- Ten una forma de almacenar el secreto de firma de manera segura -- solo se muestra una vez

</div>

## Descripción General

Los webhooks son **solo salientes**: B1 llama a tu punto final, no al revés. Cada webhook es una suscripción por iglesia que consiste en una URL de destino, un secreto de firma y una lista de eventos suscritos.

La entrega utiliza un **buzón duradero**: cuando ocurre un evento suscrito, B1 registra una fila de entrega y un trabajador de fondo hace POST dentro de aproximadamente un minuto. Las entregas fallidas se reintentan con retroceso exponencial. Nada se pierde si una entrega es lenta o tu punto final está brevemente inactivo.

## Registrando un Webhook

### En B1Admin

Ve a **Configuración → Webhooks → Nuevo Webhook**. Ingresa un nombre, la URL de payload y selecciona los eventos a los que suscribirse. Al guardar, el **secreto de firma se muestra una sola vez** -- cópialo inmediatamente y almacénalo con tu integración. Nunca se muestra de nuevo (puedes rotarlo más tarde, pero no puedes recuperar el original).

### Vía la API

Todos los puntos finales están bajo la ruta base del módulo de Membership `/membership/webhooks` y requieren un JWT de un administrador de iglesia con el permiso `Settings / Edit`, **o una [clave de API](./api-keys) acuñada con el alcance `settings:write`**. Las mismas rutas aceptan ambas.

## Catálogo de Eventos

Los nombres de eventos siguen el patrón `{entity}.{action}`. Obtén la lista en vivo desde `GET /membership/webhooks/events`.

| Evento | Se dispara cuando |
|---|---|
| `person.created` | Se agrega una persona |
| `person.updated` | Se cambia un registro de persona |
| `person.destroyed` | Se elimina una persona |
| `group.created` | Se agrega un grupo |
| `group.updated` | Se cambia un grupo |
| `group.destroyed` | Se elimina un grupo |

## Formato de Payload

Cada entrega es un `POST` HTTP con un cuerpo JSON y estos encabezados.

## Requisitos de URL

Porque las URLs de webhook son suministradas por la iglesia, B1 refuerza protecciones contra falsificación de solicitudes del lado del servidor. Una URL de webhook es rechazada -- al registrarse y re-verificarse antes de cada entrega -- si:

- no utiliza **`https`**
- apunta a `localhost`, un nombre de host `.local` / `.internal`, o
- se resuelve a una dirección IP **privada, loopback, link-local o de metadatos en la nube**

Tu punto final debe ser un servicio HTTPS públicamente accesible.
