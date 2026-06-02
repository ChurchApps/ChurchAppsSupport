---
title: "Make"
---

# Make

<div class="article-intro">

[Make](https://www.make.com) (anteriormente Integromat) es una plataforma de automatización de flujos de trabajo visuales — similar en espíritu a Zapier, con lógica más flexible y una factura más económica a escala. La aplicación oficial de B1.church Make te permite construir "escenarios" que reaccionan al instante a eventos de B1 y escriben registros de vuelta a B1.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de [Make](https://www.make.com) (el nivel gratuito cubre flujos de trabajo pequeños)
- Un administrador de iglesia con el permiso **Editar Configuración** en B1Admin
- Una idea aproximada del escenario que deseas construir

</div>

## Módulos

| Tipo | Qué | Evento / punto final B1 |
|---|---|---|
| **Disparador instantáneo** | Ver eventos | cualquier evento de B1 suscrito (`person.created`, `donation.created`, …) |
| **Acción** | Crear persona | agrega una nueva persona |
| **Acción** | Agregar donación | registra una donación |
| **Acción** | Agregar miembro de grupo | agrega una persona a un grupo |
| **Búsqueda** | Buscar personas | encuentra personas por nombre o correo |

El disparador instantáneo te permite elegir qué evento escuchar — un módulo de disparador por escenario, configurado por evento.

## Configuración

### 1. Crear una clave de API B1

1. En B1Admin ve a **Configuración → Desarrollador → Claves de API**.
2. Haz clic en **Nueva Clave de API**, nómbrala "Make", y otorga los alcances que necesitas.
3. **Incluye `settings:write`** si alguno de tus escenarios usa el disparador instantáneo — Make registra un webhook en tu nombre cuando el escenario se activa.
4. También otorga los alcances que los módulos de acción necesitan (p. ej. `donations:write` para el módulo Agregar donación).
5. Guarda y copia la clave `cak_…`.

### 2. Instalar la conexión

1. En Make, construye un nuevo escenario y coloca el módulo de disparador **B1.church** en el lienzo.
2. Cuando se te pida, **Crear una conexión**. Pega la clave de API en el campo *Clave de API* y deja *URL base de API* como `https://api.churchapps.org` (a menos que estés probando contra staging).
3. Haz clic en **Guardar** — Make prueba la clave leyendo tu perfil de iglesia.

La conexión se guarda en tu cuenta de Make y se reutiliza en escenarios.

### 3. Configurar el disparador

1. Abre la configuración del módulo **Ver eventos**.
2. Elige el evento que deseas — p. ej. `donation.created`.
3. Guarda. Make genera una URL de webhook única y la almacena internamente.

### 4. Agregar módulos posteriores

Coloca cualquiera de los cientos de módulos de aplicaciones de Make en el lienzo — Mailchimp, Google Sheets, Slack, HubSpot, tu propio punto final HTTP, etc. Asigna la salida del disparador (`event`, `churchId`, `data.id`, `data.amount`, …) a sus campos de entrada. Los módulos aplanar / iterador / enrutador / agregador de Make te permiten construir flujos de ramificación y paralelos que serían difíciles en Zapier.

### 5. Activar el escenario

Alterna **Activo** en el encabezado del escenario. Make llama a `POST /membership/webhooks` de B1 para registrar la URL. A partir de ese momento, cada evento de B1 coincidente fluye a través del escenario en tiempo real.

Desactivar el escenario llama a `DELETE /membership/webhooks/{id}` para que no haya suscripciones huérfanas.

## Recetas Comunes

### Sincronizar donaciones a una hoja de Google para revisión de finanzas

- **Disparador** — B1: Ver eventos (`donation.created`)
- **Acción** — Google Sheets: Agregar una fila. Asigna `data.donationDate`, `data.amount`, `data.personId`, `data.method`, `data.batchId` a las columnas de la hoja.

### Notificación Slack condicional por cantidad de donación

- **Disparador** — B1: Ver eventos (`donation.created`)
- **Enrutador**:
  - Rama A — Filtro: `data.amount >= 1000` → Slack: publicar a `#major-gifts`
  - Rama B — fallthrough → Slack: publicar a `#donations`

### Persona nueva → CRM + correo de bienvenida + Slack

- **Disparador** — B1: Ver eventos (`person.created`)
- **Acción** — HubSpot: Crear contacto
- **Acción** — Mailgun: Enviar correo de bienvenida
- **Acción** — Slack: Notificar `#new-people` (en paralelo — usa el enrutador de Make)

## Cómo Funciona el Disparador Instantáneo

El disparador instantáneo es respaldado por webhook, no por sondeo — cuando se activa, Make llama a `POST /membership/webhooks` con su URL generada y el evento que elegiste. Cuando el evento se dispara en B1, B1 POST la envolvente a la URL de Make y tu escenario se ejecuta en segundos. Desactivar el escenario elimina el webhook.

El disparador solo se activa para eventos que ocurren **mientras el escenario está activo**. No hay relleno hacia atrás.

## Límites y Notas

- **Un evento por módulo Ver eventos.** Para escuchar varios eventos en un escenario, coloca múltiples módulos de disparador en escenarios separados (o usa un único módulo con la lista de eventos unida — ve a continuación).
- **La verificación de firma no está expuesta** — Make no pasa `X-B1-Signature` a través del escenario; el límite de confianza es la URL de webhook impredecible por escenario de Make. Esta es la práctica normal de Make. Si necesitas verificaciones de firma explícitas, construye una integración personalizada con el [SDK](/docs/developer/api/webhooks#sdk-support) en su lugar.
- **Recuento de operación** — cada llamada de API desde un módulo de acción se cuenta en tu cuota de operaciones de Make, no en nada del lado de B1.

## Solución de Problemas

- **La prueba de conexión falla** — la mayoría de las veces un error tipográfico en la clave de API. Vuelve a copiarla de B1Admin (la clave completa solo se muestra una vez; si la has perdido, crea una clave nueva).
- **El módulo disparador no se activa** — verifica **Configuración → Desarrollador → Webhooks** en B1Admin. Si no ves una fila "Make — &lt;event&gt;" después de activar el escenario, la clave no tiene `settings:write`. Actualiza la clave y reactiva.
- **La acción devuelve `403 Forbidden`** — la clave de API carece del alcance para ese punto final. Por ejemplo, Agregar donación necesita `donations:write`. Actualiza la clave en B1Admin y vuelve a probar.

## Personalizar la Aplicación

La aplicación B1.church Make es código abierto — las definiciones JSON viven en el repositorio `B1Integrations/Make/`. Si necesitas un módulo que no existe (p. ej. una nueva acción para un punto final que no hemos cubierto), abre un problema o PR allí.

## Ver También

- [Zapier](./zapier) — el mismo patrón con una interfaz más simple y un catálogo de aplicaciones más grande
- [Slack y Discord](./slack-discord) — notificaciones de chat integradas sin Make
- [Webhooks (referencia de desarrollador)](/docs/developer/api/webhooks)
