---
title: "Google Sheets"
---

# Google Sheets

<div class="article-intro">

**B1 Export** es el complemento oficial de Google Sheets para B1.church. Agrega una barra lateral a cualquier hoja de cálculo que exporte Personas, Donaciones, Grupos o Asistencia de tu iglesia B1 a pestañas nombradas — bajo demanda, con un clic. El complemento se ejecuta completamente dentro de la cuenta de Google del usuario; nada sobre él toca los servidores de ChurchApps más allá de las llamadas de API de solo lectura que cada exportación realiza.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una cuenta de Google con acceso de edición a la hoja de cálculo en la que deseas exportar
- Un administrador de iglesia (o alguien con acceso de lectura a los datos que deseas exportar) capaz de crear una clave de API B1
- El complemento B1 Export instalado desde Google Workspace Marketplace

</div>

## Qué Exporta

| Elemento del menú | Pestaña de hoja | Datos |
|---|---|---|
| Exportar Personas | `B1 People` | ID, Nombre para mostrar, Nombre, Apellido, Correo electrónico, Estado de membresía |
| Exportar Donaciones | `B1 Donations` | ID, ID de persona, Fecha, Cantidad, Método, ID de lote |
| Exportar Grupos | `B1 Groups` | ID, Nombre, Categoría, Número de miembros |
| Exportar Asistencia | `B1 Attendance` | ID, ID de persona, Fecha de visita, ID de servicio, ID de grupo |

Cada exportación **reemplaza** el contenido de su pestaña nombrada — volver a ejecutar una exportación te da una instantánea nueva, no filas añadidas. Otras pestañas en la hoja de cálculo no se ven afectadas.

## Configuración

### 1. Crear una clave de API B1 con los alcances correctos

1. En B1Admin ve a **Configuración → Desarrollador → Claves de API**.
2. Haz clic en **Nueva Clave de API**, nómbrala "Sheets Export", y otorga los alcances de **lectura** para lo que planeas exportar:
   - `people:read` para la exportación de Personas
   - `donations:read` para Donaciones
   - `groups:read` para Grupos
   - `attendance:read` para Asistencia
3. Una clave que solo hace exportaciones **no necesita** `settings:write` — ese alcance es solo para conectores que registran webhooks (Zapier / Make). Mantén esta clave estrecha.
4. Guarda y copia la clave `cak_…`.

### 2. Instalar el complemento

1. Abre la hoja de cálculo en la que deseas exportar.
2. **Extensiones → Complementos → Obtener complementos**.
3. Busca **B1 Export** e instálalo. Google te pide que otorgues acceso a tus hojas y a HTTP externo (para que el complemento pueda llamar a la API B1).

Después de la instalación, una entrada **B1 Export** aparece bajo el menú **Extensiones** de cada hoja de cálculo que abras con esta cuenta de Google.

### 3. Conectar la clave

1. **Extensiones → B1 Export → Conectar…** (o **B1 Export → Conectar…** desde la barra de menú después de la primera apertura).
2. Pega la clave de API en la barra lateral, deja la URL base como `https://api.churchapps.org` (a menos que estés probando contra staging), y haz clic en **Guardar**.
3. Haz clic en **Probar conexión** — un "Conexión OK" en verde confirma que la clave funciona.

La clave se almacena en **propiedades por usuario** (`PropertiesService.getUserProperties()`) — está vinculada a tu cuenta de Google, nunca se escribe en la hoja, y nunca es visible para otros editores de la hoja de cálculo.

## Ejecutar una Exportación

Ya sea:

- **Desde el menú** — **Extensiones → B1 Export → Exportar Personas** (o Donaciones / Grupos / Asistencia)
- **Desde la barra lateral** — abre la barra lateral (Conectar…) y haz clic en el botón del conjunto de datos apropiado

Un tostado confirma cuando está completo — "_N_ fila(s) escriba en 'B1 People'."

## Construir Reportes Encima

Las pestañas exportadas son datos simples de Google Sheets. Construye tu propio análisis en pestañas que hacen referencia:

- Una **pestaña de resumen** con `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` para totalizar regalos con tarjeta
- Una **vista filtrada** de solo miembros con `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Un **gráfico** de tendencias de asistencia que extrae de `B1 Attendance`

Volver a ejecutar la exportación actualiza la pestaña subyacente; tus fórmulas se actualizan automáticamente.

## Programar Exportaciones Recurrentes

El complemento está bajo demanda por defecto. Para exportaciones semanales o mensuales, usa los disparadores de tiempo integrados de Apps Script:

1. **Extensiones → Apps Script** en la hoja de cálculo (esto abre el script vinculado del complemento).
2. Haz clic en el icono **⏰ Disparadores** en la barra lateral izquierda.
3. **Agregar disparador** para `exportPeople` (o cualquier función de exportación) — elige *Controlado por tiempo*, *Temporizador de semana*, p. ej. *Cada lunes a las 6am*.

La exportación se ejecuta en segundo plano bajo tu cuenta de Google. Si la clave de API se rota o revoca, el disparador te envía un correo la próxima vez que falla.

## Permisos y Privacidad

- El complemento solicita solo `spreadsheets.currentonly` (solo puede tocar la hoja de cálculo en la que está abierto) y `script.external_request` (para que `UrlFetchApp` pueda llamar a la API B1). **No ve** tu Drive, Gmail u otros datos de Google.
- La clave de API B1 se almacena por usuario — otros editores de la misma hoja de cálculo no pueden verla.
- Todas las llamadas de API B1 se realizan por HTTPS con `Authorization: Bearer cak_…`.

## Solución de Problemas

- **"No hay clave de API configurada"** — abre **Extensiones → B1 Export → Conectar…** y pega la clave.
- **"B1 rechazó la clave de API (401)"** — la clave fue revocada o es incorrecta. Recrea y vuelve a pegar.
- **"Esta clave de API carece de permiso para /giving/donations (403)"** — la clave no tiene `donations:read`. Actualiza los alcances de la clave en B1Admin.
- **La hoja no se actualiza** después de ejecutar — asegúrate de que estés mirando el nombre de pestaña *correcto* (`B1 People` etc.). La exportación crea la pestaña si no existía.
- **"Cuota excedida"** — Apps Script impone cuotas diarias por usuario en `UrlFetchApp` (típicamente miles de llamadas por día). Una iglesia grande con muchos registros puede necesitar dividir exportaciones en múltiples días o usar [Make](./make) / una integración personalizada para sincronización de alto volumen.

## Personalizar el Complemento

El complemento es código abierto — el proyecto de Apps Script vive en el repositorio `B1Integrations/GoogleSheetsAddon/`. Si quieres una columna que no exportamos, un conjunto de datos adicional, o un formato de salida diferente, abre un problema o PR allí.

## Ver También

- [Zapier](./zapier) — para sincronización en tiempo real en lugar de exportación bajo demanda
- [Make](./make) — para sincronización con transformaciones más complejas
- [Claves de API (referencia de desarrollador)](/docs/developer/api/api-keys)
