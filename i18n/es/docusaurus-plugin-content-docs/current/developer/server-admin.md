---
title: "Administración del Servidor"
---

# Administración del Servidor

<div class="article-intro">

Las características de administración del servidor en ChurchApps están disponibles solo para usuarios con el permiso **Server.Admin**. Estas herramientas se utilizan para operaciones de plataforma, soporte y resolución de problemas en todas las iglesias del sistema.

</div>

:::warning Acceso Restringido
Las características descritas en esta página requieren permiso **Server.Admin** y no están disponibles para administradores de iglesias regulares. Están destinadas únicamente para operadores de plataforma y personal de soporte.
:::

## Accediendo a la Administración del Servidor

Los usuarios con permiso Server.Admin pueden acceder al panel de administración del servidor desde B1 Admin:

1. Inicia sesión en [admin.b1.church](https://admin.b1.church)
2. Abre el [menú Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expande **Configuración**, y haz clic en **Server Admin**. (También puedes ir directamente a `admin.b1.church/admin`.)
3. El panel de administración del servidor tiene secciones para Iglesias, Usuarios, Suplantar Usuario, Trabajos de Fondo, Commons, Tendencias de Uso, Búsquedas de Traducción, Salud del Servidor, y Migraciones de Base de Datos

## Suplantación de Usuario

La característica de suplantación permite a los administradores del servidor iniciar sesión como otro usuario para fines de soporte y resolución de problemas. Esto es útil cuando se investigan problemas reportados por usuarios o se ayuda a iglesias a configurar sus sistemas.

### Cómo Suplantar a un Usuario

1. Abre la sección **Suplantar Usuario** del panel de administración del servidor
2. Ingresa el nombre o dirección de correo electrónico del usuario en el campo de búsqueda
3. Haz clic en **Buscar** o presiona Enter
4. De los resultados de búsqueda, haz clic en el usuario que deseas suplantar
5. Confirma la suplantación en el diálogo que aparece
6. Serás registrado como ese usuario y redirigido a su cuenta

### Notas Importantes

- La suplantación crea una nueva sesión con los permisos y acceso a iglesia del usuario objetivo
- Tu sesión de administrador original termina cuando suplanta a otro usuario
- Todas las acciones tomadas mientras se suplanta se registran en el rastro de auditoría
- Para volver a tu cuenta de administrador, cierra sesión e inicia sesión nuevamente con tus credenciales
- Usa la suplantación solo cuando sea necesario para fines de soporte e informa siempre a los usuarios cuando accedas a sus cuentas para soporte

### Punto Final de API

La característica de suplantación está respaldada por el punto final `/users/:userId/impersonate` en la API de Pertenencia. Ver [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para detalles técnicos.

### Consideraciones de Seguridad

- La suplantación requiere permiso Server.Admin - este permiso debe otorgarse con moderación y solo a operadores de plataforma confiables
- Todos los eventos de suplantación se registran con el ID de usuario administrador e ID de usuario objetivo
- Las iglesias no reciben notificación cuando ocurre la suplantación, así que establece políticas claras sobre cuándo y cómo debe usarse esta característica
- Considera documentar eventos de suplantación en tu sistema de tickets de soporte para responsabilidad

## Moderación de Commons

Commons es la cola de moderación compartida para contenido enviado por usuarios en todos los productos — canciones de WorshipCommons, lecciones de Lessons.church, plantillas de FreeShow, y plantillas del constructor de sitios web B1 fluyen a través de la misma cola en lugar de herramientas de revisión separadas por producto.

### Accediendo a Commons

1. Navega a la pestaña **Commons** en el panel de administración del servidor.
2. Verás tres sub-pestañas: **Cola**, **Reportes**, y **Activos**.

Un rol de **editor de música** limitado también puede ver la pestaña Cola, pero se bloquea de aprobar envíos que cambien los derechos o licencia de una canción.

### Cola

La Cola lista cada envío pendiente en todos los productos, filtrable por producto y tipo de activo. Cada fila muestra si el envío es un activo nuevo, una edición por su autor original, o una edición por un tercero, junto con el historial de aprobación del remitente y cuánto tiempo ha estado esperando el envío (marcado una vez que pasa 72 horas).

Haz clic en **Revisar** para abrir un cajón con diffs a nivel de campo, previsualizaciones de archivo, y una vista previa incrustada de solo lectura del elemento. Usa los atajos de teclado **a**/**r** para aprobar o rechazar, y **j**/**k** para pasar al siguiente o anterior envío sin dejar el cajón. Rechazar requiere seleccionar una razón (por ejemplo calidad, duplicado, licencia, ccli, ia, o fuera de tema) y una nota.

### Reportes

La pestaña Reportes maneja derechos de autor y reportes de política/calidad archivados contra activos ya publicados, divididos en colas separadas de Derechos de Autor y Política y Otros más un historial Resuelto. Reclama un reporte para comenzar a trabajarlo, luego resuélvelo con una resolución (sostenido, desestimado, o duplicado) y una acción (ninguno, no publicar, o eliminar).

### Activos

La pestaña Activos es un navegador buscable de contenido publicado con acciones para **Destacar** un activo (lo resalta en la página de inicio del producto), **No publicar**/**Republicar** lo, o **Eliminar** lo (con una razón de derechos de autor o política).

Para canciones específicamente, este es también donde una canción se vuelve **Sunday-ready** y elegible para aparecer en la búsqueda de canciones de B1 Admin de una iglesia: un revisor abre el activo y marca cada clave publicada como **Escuchado** una vez que lo ha escuchado y confirmado que la partitura, acordes, y diapositivas están todas presentes. Una canción solo se vuelve Sunday-ready una vez que cada clave está marcada.

:::info
La moderación de Commons es solo personal — las iglesias individuales nunca ven esta cola. El único lugar donde el B1 Admin de una iglesia individual toca datos de Commons es la sección "WorshipCommons — free" de la [búsqueda de canciones](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que solo muestra canciones que ya han pasado por este proceso de revisión.
:::

Ver la página de [arquitectura de Content Commons](/docs/developer/architecture/commons) para el modelo de datos subyacente y ciclo de vida de envío.

## Aprobación de Correo Electrónico de Grupo

Las iglesias no pueden enviar correo electrónico escrito por iglesia (correo electrónico de grupo, seguimientos de formulario, correos electrónicos de flujo de trabajo, e invitaciones de cuenta) hasta que un administrador del servidor las apruebe. Esto evita que iglesias registradas por bot usen la dirección de envío ChurchApps compartida para spam.

1. Abre la pestaña **Iglesias** en el panel de administración del servidor.
2. Cada iglesia muestra un chip de **Correo Electrónico de Grupo**: **Aprobado** (verde) o **No aprobado** (esbozado).
3. Haz clic en el chip y confirma para aprobar la iglesia, o para revocar una aprobación.

El personal de la iglesia pide aprobación con el botón **Solicitar revisión** en el diálogo Enviar Correo Electrónico de B1 Admin. La solicitud se envía por correo electrónico a la dirección de soporte e lista el nombre, ID, fecha de registro, ubicación, y quién preguntó de la iglesia. Una iglesia puede enviar una solicitud por semana. Ver [Límites de correo electrónico redactado por iglesia](/docs/developer/architecture/notifications#church-authored-email-limits) para la asignación diaria y la pausa automática en rebotes y quejas.

## Migraciones de Base de Datos

Los despliegues no cambian la base de datos. Las bases de datos hospedadas solo aceptan conexiones desde dentro de la red de Api, por lo que después de una versión que agrega una migración, un administrador del servidor la aplica desde la pestaña **Database Migrations**. (Las instalaciones autohospedadas de Docker aún ejecutan migraciones automáticamente cuando comienza el contenedor de Api.)

La pestaña muestra el entorno actual y una fila por módulo (pertenencia, asistencia, donaciones, etc.) con su estado, el número de migraciones aplicadas y pendientes, y la última aplicada.

- **Run Pending Migrations** aplica cada migración pendiente, un módulo a la vez, en orden. Se detiene en el primer fallo y muestra lo que se aplicó para cada módulo.
- Un módulo marcado **No history** tiene una base de datos que precede al seguimiento de migraciones. Nunca se ejecuta automáticamente, porque eso reproduciría migraciones de datos antiguas en tablas en vivo. Haz clic en **Check Schema** en ese módulo en su lugar. Api compara las tablas, columnas, e índices que cada migración crea con la base de datos en vivo y marca cada migración como **Already applied**, **Missing**, **Partly applied**, o **Data only**. Nada se cambia por la comprobación.
- En los resultados de la comprobación, **Record as Already Applied** escribe las migraciones detectadas en el historial de migraciones sin ejecutarlas (después de una confirmación). Todo hasta la última migración **Already applied** se registra, incluyendo las **Data only** en ese rango; los **Missing** permanecen pendientes y luego pueden ejecutarse normalmente con **Run Pending Migrations**.
- Una migración **Partly applied** bloquea el registro. Si es seguro ejecutar la migración nuevamente (léela primero), marca **Re-run** para que permanezca pendiente y se ejecute nuevamente desde el principio.

El panel de administración del servidor y el CLI (`yarn migrate:up`) utilizan el mismo migrador Kysely y tabla `kysely_migration`, por lo que siempre están de acuerdo en lo que se ha aplicado. Los puntos finales de respaldo son `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect`, y `POST .../:module/baseline`, todos solo Server.Admin.

## Páginas Relacionadas

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Modelo de permiso y autenticación JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API de gestión de usuarios e iglesias
- [Audit Log](/docs/b1-admin/reports/audit-log) — Ver registros de actividad para una iglesia
- [Content Commons Architecture](/docs/developer/architecture/commons) — Modelo de activo compartido y ciclo de vida de moderación
