---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Si usas Subsplash para tu aplicación de iglesia, donaciones, o formularios pero deseas B1 como el sistema de registro para personas y donaciones, la aplicación de Zapier de Subsplash puede canalizar donaciones, nuevos perfiles y respuestas de formularios a B1 en tiempo real. Ten en cuenta que la aplicación de Zapier de Subsplash está actualmente **solo disparadores** — el cableado es unidireccional (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de Subsplash en un plan que incluye acceso **API + Zapier** (verifica con tu gerente de éxito del cliente de Subsplash — estos se cierran detrás del nivel de plan)
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con permiso **Editar Configuración**

</div>

## Qué Puedes Conectar

Todos los disparadores a continuación son de Subsplash. Las acciones son de B1.

| Disparador de Subsplash | Acción de B1 |
|---|---|
| Nueva donación | Buscar persona → Agregar donación (Crear persona si falta) |
| Nuevo compromiso | Agregar donación (con `notes` = "Compromiso: …") |
| Nueva persona creada | Crear persona |
| Perfil de persona actualizado | (sin acción directa de B1 — registra en una hoja de Google para revisión manual) |
| Nueva respuesta de formulario | Crear persona + (opcionalmente) Agregar miembro de grupo basado en el formulario |

Subsplash → B1 es la única dirección que la aplicación de Subsplash soporta en este momento.

## Configuración

### 1. Crear una clave de API B1

En B1Admin: **Configuración → Desarrollador → Claves de API → Nueva Clave de API**. Alcances:

- `people:read` — para buscar el donante por correo
- `people:write` — para crearlo si no existe
- `donations:write` — para registrar el regalo
- (Sin `settings:write` necesario — Subsplash, no B1, es propietaria del disparador aquí.)

### 2. Conectar Subsplash a Zapier

Sigue la [guía de integración de Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration). Emiten un token de API desde dentro del panel de Subsplash que Zapier usa para autenticar el lado del disparador.

### 3. Construir el Zap "registrar una donación"

1. **Disparador** — Subsplash: Nueva donación
2. **Acción** — B1.church: Buscar persona (por correo)
3. **Filtro / ruta** — bifurca en "persona encontrada":
   - **Encontrada:** B1.church: Agregar donación. Asigna cantidad, fecha, fondo, método = "En línea", notas = id de transacción de Subsplash.
   - **No encontrada:** B1.church: Crear persona → B1.church: Agregar donación (usando la nueva id de persona).

Activa el Zap. Las futuras donaciones de Subsplash fluyen a **B1Admin → Donaciones** dentro de segundos.

## Recetas Comunes

### Enviar un agradecimiento cuando llega un regalo de primera vez

- **Disparador** — Subsplash: Nueva donación
- **Acción** — Filtro por Zapier: continuar solo si es el primer regalo del donante (usa una *tabla de búsqueda* en correo de donante contra una hoja de Google de donantes anteriores, o un paso *Rutas* de Zapier en la fecha de creación del donante)
- **Acción** — Mailchimp / SMTP / SendGrid: enviar mensaje de agradecimiento de primer regalo
- **Acción** — B1.church: Agregar donación (como siempre)

### Filtrar compromisos del flujo de donación regular

- **Disparador** — Subsplash: Nuevo compromiso
- **Acción** — B1.church: Agregar donación con `notes = "Compromiso — Subsplash"` y un fondo llamado `Compromisos` (separado de tu fondo operativo) para que puedas reportar compromisos independientemente en **B1Admin → Donaciones → Reportes**.

### Sincronizar nuevos usuarios de aplicación como personas de B1

- **Disparador** — Subsplash: Nueva persona creada
- **Acción** — B1.church: Crear persona, rellenando nombre, correo, teléfono. Etiqueta en B1 agregando la nueva persona a un grupo como "Usuarios de aplicación de Subsplash".

## Límites y Notas

- **La aplicación de Zapier de Subsplash es solo disparadores.** Si deseas cambios del lado de B1 (p. ej. una nueva persona de B1 que también llegue a Subsplash), necesitarías construir ese puente desde los disparadores de la aplicación de Zapier de B1 llamando a la API REST de Subsplash a través de una acción *Webhooks por Zapier — POST* personalizada. Eso es una integración personalizada, no una receta.
- **El acceso a la API está controlado por plan.** Si la conexión de Zapier falla con `403 Forbidden`, tu plan de Subsplash probablemente no incluya acceso a la API — contacta a tu gerente de éxito del cliente.
- **La asignación de fondo es manual.** Subsplash pasa un nombre de campaña o categoría; B1 necesita una id de fondo numérica. Ya sea codificar el fondo en el Zap o mantener una *tabla de búsqueda* de Zapier mapeando campañas de Subsplash a fondos de B1.

## Solución de Problemas

- **Ningún disparador se activa después de una donación** — verifica en el panel de Zapier de Subsplash que la conexión aún muestra *Conectado*. Si el token de API fue rotado en el lado de Subsplash, el Zap se detiene silenciosamente; reconecta.
- **B1 *Agregar donación* falla con 422** — la mayoría de las veces un `fundId` faltante o no reconocido. Lista tus fondos a través de **B1Admin → Donaciones → Fondos** y copia la id exacta en el paso de Zap.
- **El primer regalo se dispara dos veces** — Subsplash ocasionalmente re-entrega un disparador si Zapier se perdió su reconocimiento. Agrega un *Filtro por Zapier* en la id de donación (Subsplash envía una en la carga) para descartar duplicados.

## Ver También

- [Donorbox](./donorbox) — la misma forma de receta, plataforma de donación diferente
- [Zapier (descripción general)](../zapier) — lado B1 de cada receta de Zapier
- [Guía de integración de Zapier de Subsplash](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentos de Subsplash)
