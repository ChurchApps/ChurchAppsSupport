---
title: "Google Sheets"
description: "Conecte B1 Admin con Google Sheets mediante el complemento B1 Export para extraer personas, donaciones, grupos y asistencia a pestañas de hojas de cálculo cuando lo necesite."
---

# Google Sheets

<div class="article-intro">

**B1 Export** es el complemento oficial de Google Sheets para B1.church. Agrega una barra lateral a cualquier hoja de cálculo que exporta personas, donaciones, grupos o asistencia de su iglesia en B1 a pestañas con nombre, cuando usted lo necesite, con un solo clic. El complemento se ejecuta por completo dentro de la cuenta de Google del usuario; no interactúa con los servidores de ChurchApps más allá de las llamadas de solo lectura a la API que hace cada exportación.

</div>

:::caution Todavía no disponible
El complemento B1 Export todavía no se ha publicado en Google Workspace Marketplace, así que hoy no se puede instalar. Mientras tanto, exporte las personas desde B1Admin (consulte [Exportación de datos](../people/exporting-data.md)) e importe el CSV en Google Sheets. Todo lo que aparece a continuación describe cómo funcionará el complemento una vez publicado.
:::

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Una cuenta de Google con acceso de edición a la hoja de cálculo en la que desea exportar
- Un administrador de la iglesia (o alguien con acceso de lectura a los datos que desea exportar) que pueda crear una clave de API de B1
- El complemento B1 Export instalado desde Google Workspace Marketplace

</div>

## Qué exporta {#what-it-exports}

| Elemento del menú | Pestaña de la hoja | Datos |
|---|---|---|
| Export People | `B1 People` | ID, Display Name, First, Last, Email, Membership Status |
| Export Donations | `B1 Donations` | ID, Person ID, Date, Amount, Method, Batch ID |
| Export Groups | `B1 Groups` | ID, Name, Category, Member Count |
| Export Attendance | `B1 Attendance` | ID, Person ID, Visit Date, Service ID, Group ID |

Cada exportación **reemplaza** el contenido de su pestaña con nombre: al volver a ejecutar una exportación obtiene una copia nueva, no filas agregadas. Las demás pestañas de la hoja de cálculo no se modifican.

## Configuración {#setup}

### 1. Cree una clave de API de B1 con los permisos correctos {#1-create-a-b1-api-key-with-the-right-scopes}

1. En B1Admin vaya a **Settings → Developer → API Keys**.
2. Haga clic en **New API Key**, póngale el nombre "Sheets Export" y otorgue los permisos **read** para lo que vaya a exportar:
   - `people:read` para la exportación de Personas
   - `donations:read` para Donaciones
   - `groups:read` para Grupos
   - `attendance:read` para Asistencia
3. Una clave que solo hace exportaciones **no** necesita `settings:write`; ese permiso es solo para los conectores que registran webhooks (Zapier / Make). Mantenga esta clave lo más limitada posible.
4. Guarde y copie la clave `cak_…`.

### 2. Instale el complemento {#2-install-the-add-on}

1. Abra la hoja de cálculo en la que desea exportar.
2. **Extensions → Add-ons → Get add-ons**.
3. Busque **B1 Export** e instálelo. Google le pedirá que otorgue acceso a sus hojas y a HTTP externo (para que el complemento pueda llamar a la API de B1).

Después de la instalación, aparecerá una entrada **B1 Export** en el menú **Extensions** de cada hoja de cálculo que abra con esta cuenta de Google.

### 3. Conecte la clave {#3-connect-the-key}

1. **Extensions → B1 Export → Connect…** (o **B1 Export → Connect…** desde la barra de menú después de la primera vez que lo abra).
2. Pegue la clave de API en la barra lateral, deje la Base URL como `https://api.churchapps.org` (a menos que esté haciendo pruebas en el entorno de staging) y haga clic en **Save**.
3. Haga clic en **Test Connection**: un mensaje verde "Connection OK" confirma que la clave funciona.

La clave se guarda en las **propiedades por usuario** (`PropertiesService.getUserProperties()`): está vinculada a su cuenta de Google, nunca se escribe en la hoja de cálculo y no es visible para otros editores de la hoja.

## Cómo ejecutar una exportación {#running-an-export}

Puede hacerlo de cualquiera de estas formas:

- **Desde el menú**: **Extensions → B1 Export → Export People** (o Donations / Groups / Attendance)
- **Desde la barra lateral**: abra la barra lateral (Connect…) y haga clic en el botón del conjunto de datos correspondiente

Un aviso confirma cuando termina: "_N_ fila(s) escrita(s) en 'B1 People'."

## Cómo crear informes a partir de los datos {#building-reports-on-top}

Las pestañas exportadas son datos normales de Google Sheets. Cree sus propios análisis haciendo referencia a esas pestañas:

- Una **pestaña de resumen** con `=SUMIF('B1 Donations'!E:E, "card", 'B1 Donations'!D:D)` para totalizar las donaciones con tarjeta
- Una **vista filtrada** solo de miembros con `=FILTER('B1 People'!A:F, 'B1 People'!F:F = "Member")`
- Un **gráfico** de tendencias de asistencia que tome datos de `B1 Attendance`

Al volver a ejecutar la exportación se actualiza la pestaña subyacente, y sus fórmulas se actualizan automáticamente.

## Programación de exportaciones recurrentes {#scheduling-recurring-exports}

El complemento funciona a demanda de forma predeterminada. Para exportaciones semanales o mensuales, use los disparadores basados en tiempo integrados de Apps Script:

1. **Extensions → Apps Script** en la hoja de cálculo (esto abre el script vinculado al complemento).
2. Haga clic en el icono **⏰ Triggers** en la barra lateral izquierda.
3. Haga clic en **Add Trigger** para `exportPeople` (o cualquier otra función de exportación): elija *Time-driven*, *Week timer*, por ejemplo, *Every Monday 6am*.

La exportación se ejecuta en segundo plano con su cuenta de Google. Si la clave de API se rota o se revoca, el disparador le enviará un correo electrónico la próxima vez que falle.

## Permisos y privacidad {#permissions--privacy}

- El complemento solicita únicamente `spreadsheets.currentonly` (solo puede tocar la hoja de cálculo que tiene abierta) y `script.external_request` (para que `UrlFetchApp` pueda llamar a la API de B1). **No** accede a su Drive, Gmail ni a otros datos de Google.
- La clave de API de B1 se guarda por usuario: otros editores de la misma hoja de cálculo no pueden verla.
- Todas las llamadas a la API de B1 se hacen por HTTPS con `Authorization: Bearer cak_…`.

## Solución de problemas {#troubleshooting}

- **"No API key set"**: abra **Extensions → B1 Export → Connect…** y pegue la clave.
- **"B1 rejected the API key (401)"**: la clave fue eliminada o es incorrecta. Cree una clave nueva y péguela.
- **"This API key lacks permission for /giving/donations (403)"**: la clave no tiene `donations:read`. Los permisos no se pueden cambiar en una clave existente, así que cree una nueva clave con los permisos correctos en B1Admin.
- **La hoja no se actualiza** después de ejecutar la exportación: asegúrese de estar mirando el nombre de pestaña *correcto* (`B1 People`, etc.). La exportación crea la pestaña si no existía.
- **"Quota exceeded"**: Apps Script impone cuotas diarias por usuario para `UrlFetchApp` (normalmente miles de llamadas al día). Una iglesia grande con muchos registros puede necesitar dividir las exportaciones en varios días, o usar [Make](./make.md) o una integración personalizada para una sincronización de gran volumen.

## ¿Falta una columna? {#missing-a-column}

Si quiere una columna que no exportamos, un conjunto de datos adicional o un formato de salida diferente, escriba a [support@churchapps.org](mailto:support@churchapps.org).

## Vea también {#see-also}

- [Zapier](./zapier.md): para sincronización en tiempo real en lugar de exportación a demanda
- [Make](./make.md): para sincronización con transformaciones más complejas
- [Claves de API (referencia para desarrolladores)](/docs/developer/api/api-keys)
