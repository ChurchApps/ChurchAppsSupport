---
title: "Administración del servidor"
---

# Administración del servidor

<div class="article-intro">

Las funciones de administración del servidor de ChurchApps solo están disponibles para usuarios con el permiso **Server.Admin**. Estas herramientas se usan para las operaciones de la plataforma, el soporte y la solución de problemas en todas las iglesias del sistema.

</div>

:::warning Acceso restringido
Las funciones descritas en esta página requieren el permiso **Server.Admin** y no están disponibles para los administradores de iglesias comunes. Están destinadas únicamente a operadores de la plataforma y personal de soporte.
:::

## Acceso a la administración del servidor

Los usuarios con el permiso Server.Admin pueden acceder al panel de administración del servidor desde B1 Admin:

1. Inicie sesión en [admin.b1.church](https://admin.b1.church)
2. Abra el [menú Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expanda **Settings** y haga clic en **Server Admin**. (También puede ir directamente a `admin.b1.church/admin`.)
3. El panel de Server Admin muestra sus secciones en la parte izquierda, en tres grupos: **Directory** (Churches, Users, Impersonate User), **Operations** (Background Jobs, Commons, Usage Trends) y **System** (Translation Lookups, Server Health, Database Migrations)

## Restablecer la verificación en dos pasos

Si un usuario tiene activada la [verificación en dos pasos](../b1-admin/profile/managing-profile.md#two-factor-sign-in) y ha perdido tanto su teléfono como sus códigos de respaldo, un administrador del servidor puede desactivarla:

1. Abra la sección **Users** del panel de Server Admin y busque al usuario.
2. Los usuarios con verificación en dos pasos muestran una insignia **Two-factor on**. Haga clic en **Reset 2FA** junto a ella.
3. Confirme el aviso. Hágalo solo después de confirmar con quién está hablando.

Después, el usuario puede iniciar sesión solo con su contraseña y volver a configurar la verificación en dos pasos desde su perfil. Los restablecimientos se registran en el registro de auditoría como `mfa_reset`. El endpoint es `POST /membership/users/mfa/reset/:userId` y requiere Server.Admin.

## Suplantación de usuarios

La función de suplantación permite a los administradores del servidor iniciar sesión como otro usuario con fines de soporte y solución de problemas. Es útil para investigar incidencias reportadas por usuarios o para ayudar a las iglesias a configurar sus sistemas.

### Cómo suplantar a un usuario

1. Abra la sección **Impersonate User** del panel de Server Admin
2. Introduzca el nombre o la dirección de correo electrónico del usuario en el campo de búsqueda
3. Haga clic en **Search** o pulse Enter
4. En los resultados de búsqueda, haga clic en el usuario que desea suplantar
5. Confirme la suplantación en el cuadro de diálogo que aparece
6. Se iniciará sesión como ese usuario y será redirigido a su cuenta

### Notas importantes

- La suplantación crea una nueva sesión con los permisos y el acceso a iglesias del usuario de destino
- Su sesión de administrador original termina al suplantar a otro usuario
- Todas las acciones realizadas mientras se suplanta quedan registradas en el registro de auditoría
- Para volver a su cuenta de administrador, cierre sesión e inicie sesión de nuevo con sus credenciales
- Use la suplantación solo cuando sea necesario para fines de soporte, e informe siempre a los usuarios cuando acceda a sus cuentas por motivos de soporte

### Endpoint de API

La función de suplantación se respalda con el endpoint `/users/:userId/impersonate` de la API de Membership. Consulte [Endpoints de Membership](/docs/developer/api/endpoints/membership#users) para los detalles técnicos.

### Consideraciones de seguridad

- La suplantación requiere el permiso Server.Admin: este permiso debe otorgarse con moderación y solo a operadores de plataforma de confianza
- Todos los eventos de suplantación se registran con el ID del administrador y el ID del usuario de destino
- Las iglesias no reciben notificación cuando se produce una suplantación, así que establezca políticas claras sobre cuándo y cómo debe usarse esta función
- Considere documentar los eventos de suplantación en su sistema de tickets de soporte para tener trazabilidad

## Moderación de Commons

Commons es la cola de moderación compartida para el contenido enviado por los usuarios en distintos productos: las canciones de WorshipCommons, las lecciones de Lessons.church, las plantillas de FreeShow y las plantillas del creador de sitios web de B1 pasan todas por la misma cola, en lugar de por herramientas de revisión separadas para cada producto.

### Acceso a Commons

1. Vaya a la pestaña **Commons** del panel de Server Admin.
2. Verá tres subpestañas: **Queue**, **Reports** y **Assets**.

Un rol limitado de **editor de música** también puede ver la pestaña Queue, pero no puede aprobar envíos que cambien los derechos o la licencia de una canción.

### Queue

La cola muestra todos los envíos pendientes de todos los productos, filtrables por producto y tipo de recurso. Cada fila indica si el envío es un recurso nuevo, una edición de su autor original o una edición de un tercero, así como el historial de aprobaciones del remitente y el tiempo que lleva en espera (se marca cuando supera las 72 horas).

Haga clic en **Review** para abrir un cajón con diferencias por campo, vistas previas de archivos y una vista previa de solo lectura incrustada del elemento. Use los atajos de teclado **a** / **r** para aprobar o rechazar, y **j** / **k** para pasar al envío siguiente o anterior sin salir del cajón. Para rechazar es necesario seleccionar un motivo (por ejemplo, calidad, duplicado, licencia, ccli, ai o fuera de tema) y escribir una nota.

### Reports

La pestaña Reports gestiona los reportes de derechos de autor y de políticas o calidad presentados contra recursos ya publicados, separados en las colas Copyright y Policy & Other, además de un historial Resolved. Reclame un reporte para empezar a trabajarlo y luego resuélvalo con una resolución (upheld, dismissed o duplicate) y una acción (none, unpublish o remove).

### Assets

La pestaña Assets es un explorador con búsqueda del contenido publicado, con acciones para **Feature** un recurso (lo destaca en la página de inicio del producto), **Unpublish** / **Republish** o **Remove** (con un motivo de derechos de autor o de política).

En el caso de las canciones, aquí también es donde una canción pasa a estar **Sunday-ready** y puede aparecer en la búsqueda de canciones de B1 Admin de una iglesia: el revisor abre el recurso y marca cada tonalidad publicada como **Listened** una vez que la ha escuchado completa y ha confirmado que la partitura, los acordes y las diapositivas están todos presentes. Una canción solo se considera Sunday-ready cuando todas sus tonalidades están marcadas.

:::info
La moderación de Commons es exclusiva del personal: las iglesias individuales nunca ven esta cola. El único punto en el que el B1 Admin de una iglesia individual utiliza datos de Commons es la sección "WorshipCommons — free" de la [búsqueda de canciones](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que solo muestra canciones que ya han pasado por este proceso de revisión.
:::

Consulte la página [Arquitectura de Content Commons](/docs/developer/architecture/commons) para ver el modelo de datos subyacente y el ciclo de vida de los envíos.

## Aprobación del correo de grupo

Las iglesias no pueden enviar correo redactado por la iglesia (correo de grupo, seguimientos de formularios, correos de flujos de trabajo e invitaciones de cuenta) hasta que un administrador del servidor lo apruebe. Así se evita que las iglesias registradas por bots usen la dirección de envío compartida de ChurchApps para hacer spam.

1. Abra la pestaña **Churches** del panel de Server Admin.
2. Cada iglesia muestra un distintivo **Group Email**: **Approved** (verde) o **Not approved** (con borde).
3. Haga clic en el distintivo y confirme para aprobar la iglesia o para revocar una aprobación.

El personal de la iglesia solicita la aprobación con el botón **Request review** del cuadro de diálogo Send Email de B1 Admin. La solicitud se envía por correo a la dirección de soporte e incluye el nombre de la iglesia, su ID, la fecha de registro, la ubicación y quién la pidió. Una iglesia puede enviar una solicitud por semana. Consulte [Límites de correo redactado por la iglesia](/docs/developer/architecture/notifications#church-authored-email-limits) para ver la asignación diaria y la pausa automática por rebotes y quejas.

## Migraciones de base de datos

El flujo de trabajo **Deploy Prod** aplica por sí mismo las migraciones pendientes. Las bases de datos alojadas solo aceptan conexiones desde dentro de la red de la Api, por lo que un runner de GitHub no puede alcanzarlas; en su lugar, justo después de `serverless deploy`, el flujo invoca la función Lambda `migrate` de la Api (`api-Prod-migrate`), que ejecuta las migraciones pendientes de todos los módulos con el mismo ejecutor que esta pestaña y hace fallar el despliegue si algún módulo da error o es rechazado. **Rollback Prod** revierte solo el código de la Lambda; las migraciones aplicadas siguen aplicadas. La pestaña **Database Migrations** sirve para consultar el estado, ejecutar lo que un despliegue no haya ejecutado (por ejemplo, en el entorno de demostración, cuyo despliegue no migra), y establecer una línea base en los módulos sin historial. (Las instalaciones autoalojadas con Docker siguen ejecutando las migraciones automáticamente al arrancar el contenedor de la Api.)

La pestaña muestra el entorno actual y una fila por módulo (membership, attendance, giving, etc.) con su estado, el número de migraciones aplicadas y pendientes, y la última aplicada.

- **Run Pending Migrations** aplica todas las migraciones pendientes, un módulo a la vez, en orden. Se detiene en el primer fallo y muestra lo aplicado en cada módulo.
- Un módulo marcado como **No history** tiene una base de datos anterior al seguimiento de migraciones. Nunca se ejecuta automáticamente, porque eso volvería a reproducir migraciones de datos antiguas sobre tablas activas. En su lugar, haga clic en **Check Schema** en ese módulo. La Api compara las tablas, columnas e índices que crea cada migración con la base de datos activa y marca cada migración como **Already applied**, **Missing**, **Partly applied** o **Data only**. La comprobación no cambia nada.
- En los resultados de la comprobación, **Record as Already Applied** registra las migraciones detectadas en el historial de migraciones sin ejecutarlas (previa confirmación). Se registra todo hasta la última migración **Already applied**, incluidas las **Data only** de ese rango; las **Missing** permanecen pendientes y después pueden ejecutarse normalmente con **Run Pending Migrations**.
- Una migración **Partly applied** impide el registro. Si la migración es segura para volver a ejecutarla (léala primero), marque **Re-run** para que siga pendiente y se ejecute de nuevo desde el principio.

El panel de Server Admin y la CLI (`yarn migrate:up`) usan el mismo migrador de Kysely y la misma tabla `kysely_migration`, así que siempre coinciden en lo que se ha aplicado. Los endpoints de respaldo son `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` y `POST .../:module/baseline`, todos solo para Server.Admin.

## Páginas relacionadas

- [Autenticación y permisos](/docs/developer/api/endpoints/authentication) — Modelo de permisos y autenticación JWT
- [Endpoints de Membership](/docs/developer/api/endpoints/membership) — API de gestión de usuarios e iglesias
- [Registro de auditoría](/docs/b1-admin/reports/audit-log) — Ver el registro de actividad de una iglesia
- [Arquitectura de Content Commons](/docs/developer/architecture/commons) — Modelo de recursos compartidos y ciclo de vida de la moderación
