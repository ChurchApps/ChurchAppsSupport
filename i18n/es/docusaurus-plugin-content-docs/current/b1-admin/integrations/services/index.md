---
title: "Servicios conectados"
description: "Conecte B1 Admin con Mailchimp, Donorbox, Subsplash, VOMO, Clearstream y otras herramientas mediante recetas de Zapier o Make, con guías de configuración para cada una."
---

# Servicios conectados

<div class="article-intro">

La forma más rápida de conectar B1 con otra herramienta tecnológica para iglesias suele ser una receta de Zapier o Make: no necesita nueva infraestructura de B1, y el tercero aloja el flujo de trabajo. Esta página es una lista seleccionada de servicios que hemos confirmado que se pueden conectar hoy, con una guía de configuración breve para copiar y pegar en cada caso.

</div>

## Vista general {#at-a-glance}

| Servicio | Categoría | Puente | Qué puede conectar |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | Correo electrónico | Integrado en B1 (pestaña Webhooks) | Mantener una audiencia de Mailchimp sincronizada con personas, grupos y listas guardadas de B1 |
| [Donorbox](./donorbox.md) | Donaciones | Zapier | Enviar las donaciones y los donantes de Donorbox a B1 |
| [Subsplash](./subsplash.md) | Aplicación / Donaciones | Zapier | Traer las donaciones y las personas de Subsplash a B1 |
| [VOMO](./vomo.md) | Voluntariado | Zapier | Sincronizar las inscripciones de voluntarios entre los grupos de B1 y los proyectos de VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Enviar un mensaje de Clearstream a partir de eventos de B1; recibir las respuestas como registros de B1 |
| [Text In Church](./text-in-church.md) | SMS / Flujos de trabajo | Zapier | Activar flujos de trabajo de Text In Church desde B1; recibir datos de Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (AU) | Webhooks by Zapier o Make | Enviar SMS a partir de cualquier evento de B1 |
| [Checkr](./checkr.md) | Verificaciones de antecedentes | Make | Iniciar una verificación de antecedentes cuando alguien se une a un equipo de servicio |

## Lo que todos tienen en común {#what-all-of-these-have-in-common}

1. **El lado de B1 de la conexión es idéntico**: cree una clave de API con los permisos correctos en **B1Admin → Settings → Developer → API Keys**, y luego deje que el puente registre un webhook para el disparador (Zapier / Make lo hacen automáticamente y requieren `settings:write`), o llame a los endpoints REST de B1 desde una acción posterior. La aplicación de Zapier de B1.church necesita `settings:write` en cada clave, porque verifica la clave contra la lista de webhooks de B1 al conectarla. (Mailchimp es la excepción: su sincronización está integrada en B1 y se configura en la pestaña **Webhooks**, sin clave de API ni puente).
2. **El puente le cobra a usted, no a nosotros.** ChurchApps es gratuito; Zapier y Make tienen planes gratuitos que cubren algunas recetas.
3. **Puede probar la conexión sin ponerla en producción.** Zapier tiene un botón "Test step" que obtiene datos de muestra de B1 y le muestra la estructura de los datos antes de activar la receta.

## Cómo elegir un puente {#picking-a-bridge}

- **Zapier** es más amigable y tiene un catálogo de aplicaciones más amplio: úselo como opción predeterminada, a menos que el costo sea un problema.
- **Make** es más económico a gran escala y tiene una lógica de enrutamiento y filtros más flexible: úselo cuando un solo flujo de trabajo tenga bifurcaciones, condiciones o muchos pasos.
- **Webhooks by Zapier** (usado en el documento de Mobile Message) es un adaptador genérico que le permite enviar POST a cualquier endpoint HTTP desde un Zap cuando el destino no es una aplicación de Zapier de primera clase.

Si busca algo que no aparece en esta lista, la [API REST](/docs/developer/api) y los [webhooks](/docs/developer/api/webhooks) de B1 están abiertos: puede crear un puente a medida con el [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) en unas pocas horas.

## Lo que no está aquí (y por qué) {#whats-not-here-and-why}

Varias herramientas tecnológicas populares para iglesias (Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe) no tienen hoy una aplicación publicada de Zapier ni un módulo de Make. Tienen sus propias API, pero conectarlas con B1 es un trabajo de código personalizado, no una receta, así que no encajan en esta lista. Si un proveedor agrega una aplicación de Zapier o un módulo de Make, agregaremos la guía.

También omitimos deliberadamente las herramientas específicas de Planning Center Services (música, presentaciones), los productos ChMS de la competencia, los consultores de migración y las herramientas que solo limpian datos específicos de PCO: ninguna de ellas tiene una ruta de conexión útil con B1.

## Vea también {#see-also}

- [Zapier (descripción general)](../zapier.md): el lado de B1 de cada receta de Zapier es idéntico; esta guía lo cubre una sola vez
- [Make (descripción general)](../make.md): lo mismo para los escenarios de Make
- [Slack y Discord](../slack-discord.md): notificaciones de chat sin ningún puente
- [Google Sheets](../google-sheets.md): exportaciones a demanda
- [Webhooks (referencia para desarrolladores)](/docs/developer/api/webhooks): el catálogo de eventos en el que se basan todas las recetas
