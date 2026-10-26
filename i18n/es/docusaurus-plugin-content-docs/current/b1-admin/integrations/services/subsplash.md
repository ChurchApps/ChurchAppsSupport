---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Si usas Subsplash para tu aplicación de la iglesia, las ofrendas o los formularios, pero quieres que B1 sea el sistema principal de registro de personas y donaciones, la aplicación de Zapier de Subsplash puede enviar donaciones, perfiles nuevos y respuestas de formularios a B1 en tiempo real. Ten en cuenta que la aplicación de Zapier de Subsplash actualmente **solo tiene disparadores**: la conexión es de un solo sentido (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Una cuenta de Subsplash con un plan que incluya acceso a **API + Zapier** (consulta con tu Gerente de Éxito del Cliente de Subsplash; estas funciones dependen del nivel del plan)
- Una cuenta de [Zapier](https://zapier.com)
- Un usuario de B1Admin con el permiso **Editar configuración**

</div>

## Qué puedes conectar

Todos los disparadores siguientes son de Subsplash. Las acciones son de B1.

| Disparador de Subsplash | Acción en B1 |
|---|---|
| Nueva donación | Buscar persona → Agregar donación (Crear persona si no existe) |
| Nuevo compromiso de donación | Agregar donación (con `notes` = "Compromiso: …") |
| Nueva persona creada | Crear persona |
| Perfil de persona actualizado | (no hay una acción directa en B1; regístralo en una hoja de Google para revisión manual) |
| Nueva respuesta de formulario | Crear persona + (opcionalmente) Agregar miembro al grupo según el formulario |

Por ahora, Subsplash → B1 es la única dirección que admite la aplicación de Subsplash.

## Configuración

### 1. Crea una clave de API de B1

En B1Admin: **Configuración → Desarrollador → Claves de API → Nueva clave de API**. Permisos (scopes):

- `people:read`: para buscar al donante por correo electrónico
- `people:write`: para crearlo si no existe
- `donations:write`: para registrar la donación
- (No se necesita `settings:write`; aquí el disparador lo controla Subsplash, no B1).

### 2. Conecta Subsplash con Zapier

Sigue la [guía de integración de Subsplash con Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash emite un token de API desde el Panel de Subsplash que Zapier usa para autenticar el lado del disparador.

### 3. Crea el Zap de "registrar una donación"

1. **Disparador:** Subsplash: Nueva donación
2. **Acción:** B1.church: Buscar persona (por correo electrónico)
3. **Filtro / Ruta:** bifurca según "persona encontrada":
   - **Encontrada:** B1.church: Agregar donación. Asigna monto, fecha, fondo, método = "En línea" y notas = id de la transacción de Subsplash.
   - **No encontrada:** B1.church: Crear persona → B1.church: Agregar donación (usando el id de la persona recién creada).

Activa el Zap. Las donaciones futuras de Subsplash llegarán a **B1Admin → Donaciones** en segundos.

## Recetas comunes

### Envía un agradecimiento cuando llega una primera ofrenda

- **Disparador:** Subsplash: Nueva donación
- **Acción:** Filtro de Zapier: continúa solo si es la primera ofrenda del donante (usa una *Tabla de búsqueda* con el correo electrónico del donante contra una hoja de Google con los donantes anteriores, o un paso *Rutas* de Zapier basado en la fecha de creación del donante)
- **Acción:** Mailchimp / SMTP / SendGrid: envía el mensaje de agradecimiento por la primera ofrenda
- **Acción:** B1.church: Agregar donación (como de costumbre)

### Separa las promesas del flujo regular de ofrendas

- **Disparador:** Subsplash: Nuevo compromiso de donación
- **Acción:** B1.church: Agregar donación con `notes = "Compromiso: Subsplash"` y un fondo llamado `Compromisos` (separado de tu fondo operativo) para que puedas informar sobre los compromisos por separado en **B1Admin → Donaciones → Resumen**.

### Sincroniza a los nuevos usuarios de la aplicación como personas de B1

- **Disparador:** Subsplash: Nueva persona creada
- **Acción:** B1.church: Crear persona, completando nombre, correo electrónico y teléfono. Etiqueta en B1 agregando a la nueva persona a un grupo como "Usuarios de la aplicación Subsplash".

## Límites y notas

- **La aplicación de Zapier de Subsplash solo tiene disparadores.** Si quieres cambios del lado de B1 (por ejemplo, que una nueva persona de B1 también aparezca en Subsplash), tendrías que construir ese puente desde los disparadores de la aplicación de Zapier de B1 llamando a la API REST de Subsplash mediante una acción personalizada *Webhooks by Zapier: POST*. Eso es una integración personalizada, no una receta.
- **El acceso a la API depende del plan.** Si la conexión de Zapier falla con `403 Forbidden`, es probable que tu plan de Subsplash no incluya acceso a la API; contacta a tu Gerente de Éxito del Cliente.
- **La asignación de fondos es manual.** Subsplash envía el nombre de una campaña o categoría, y B1 necesita un id numérico de fondo. Puedes fijar el fondo en el Zap o mantener una *Tabla de búsqueda* de Zapier que asigne las campañas de Subsplash a los fondos de B1.

## Solución de problemas

- **Ningún disparador se activa después de una donación:** verifica en el panel de Zapier de Subsplash que la conexión todavía aparezca como *Conectada*. Si el token de API se rotó del lado de Subsplash, el Zap se detiene en silencio; vuelve a conectarlo.
- ***Agregar donación* de B1 falla con 422:** casi siempre se debe a un `fundId` faltante o no reconocido. Lista tus fondos en **B1Admin → Donaciones → Fondos** y copia el id exacto en el paso del Zap.
- **La primera ofrenda activa el disparador dos veces:** Subsplash ocasionalmente vuelve a enviar un disparador si Zapier no recibió su confirmación. Agrega un *Filtro de Zapier* sobre el id de la donación (Subsplash lo envía en la carga) para descartar duplicados.

## Consulta también

- [Donorbox](./donorbox): la misma forma de receta, con una plataforma de donaciones distinta
- [Zapier (descripción general)](../zapier): el lado de B1 de cada receta de Zapier
- [Guía de integración de Subsplash con Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (documentación de Subsplash)
