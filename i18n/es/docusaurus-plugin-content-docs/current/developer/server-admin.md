---
title: "Administración del servidor"
---

# Administración del servidor

<div class="article-intro">

Las funciones de administración del servidor de ChurchApps solo están disponibles para los usuarios con el permiso **Server.Admin**. Estas herramientas se usan para las operaciones de la plataforma, el soporte y la solución de problemas en todas las iglesias del sistema.

</div>

:::warning Acceso restringido
Las funciones descritas en esta página requieren el permiso **Server.Admin** y no están disponibles para los administradores de iglesias comunes. Están pensadas solo para los operadores de la plataforma y el personal de soporte.
:::

## Acceder a la administración del servidor

Los usuarios con el permiso Server.Admin pueden acceder al panel de administración del servidor desde B1 Admin:

1. Inicia sesión en [admin.b1.church](https://admin.b1.church)
2. Abre el [menú Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), expande **Configuración** y haz clic en **Administración del servidor**. (También puedes ir directamente a `admin.b1.church/admin`.)
3. El panel de administración del servidor muestra sus secciones a la izquierda, en tres grupos: **Directorio** (Iglesias, Usuarios, Suplantar usuario), **Operaciones** (Trabajos en segundo plano, Commons, Tendencias de uso) y **Sistema** (Búsquedas de traducción, Estado del servidor, Migraciones de base de datos)

## Suplantación de usuarios

La función de suplantación permite a los administradores del servidor iniciar sesión como otro usuario con fines de soporte y solución de problemas. Es útil al investigar incidencias reportadas por usuarios o al ayudar a las iglesias a configurar sus sistemas.

### Cómo suplantar a un usuario

1. Abre la sección **Suplantar usuario** del panel de administración del servidor
2. Escribe el nombre o la dirección de correo del usuario en el campo de búsqueda
3. Haz clic en **Buscar** o pulsa Intro
4. En los resultados de búsqueda, haz clic en el usuario que quieras suplantar
5. Confirma la suplantación en el cuadro de diálogo que aparece
6. Quedarás conectado como ese usuario y serás redirigido a su cuenta

### Notas importantes

- La suplantación crea una sesión nueva con los permisos y el acceso a iglesias del usuario de destino
- Tu sesión de administrador original termina al suplantar a otro usuario
- Todas las acciones realizadas mientras se está suplantando quedan registradas en el registro de auditoría
- Para volver a tu cuenta de administrador, cierra sesión y vuelve a iniciar sesión con tus credenciales
- Usa la suplantación solo cuando sea necesario para soporte y avisa siempre a los usuarios cuando accedas a su cuenta por motivos de soporte

### Endpoint de la API

La función de suplantación se apoya en el endpoint `/users/:userId/impersonate` de la API de Membership. Consulta [Endpoints de Membership](/docs/developer/api/endpoints/membership#users) para los detalles técnicos.

### Consideraciones de seguridad

- La suplantación requiere el permiso Server.Admin; este permiso debe concederse con moderación y solo a operadores de plataforma de confianza
- Todos los eventos de suplantación se registran con el ID del administrador y el ID del usuario de destino
- Las iglesias no reciben notificación cuando se produce una suplantación, así que establece políticas claras sobre cuándo y cómo debe usarse esta función
- Considera documentar los eventos de suplantación en tu sistema de tickets de soporte para garantizar la rendición de cuentas

## Moderación de Commons

Commons es la cola de moderación compartida para el contenido enviado por los usuarios en todos los productos: las canciones de WorshipCommons, las lecciones de Lessons.church, las plantillas de FreeShow y las plantillas del creador de sitios web de B1 pasan todas por la misma cola, en lugar de por herramientas de revisión separadas para cada producto.

### Acceder a Commons

1. Ve a la pestaña **Commons** del panel de administración del servidor.
2. Verás tres subpestañas: **Cola**, **Informes** y **Recursos**.

Un rol limitado de **editor de música** también puede ver la pestaña Queue, pero no puede aprobar envíos que cambien los derechos o la licencia de una canción.

### Queue

La pestaña Queue muestra todos los envíos pendientes de todos los productos, filtrables por producto y tipo de recurso. Cada fila indica si el envío es un recurso nuevo, una edición de su autor original o una edición de un tercero, junto con el historial de aprobaciones de quien envió y el tiempo que lleva esperando (se marca cuando supera las 72 horas).

Haz clic en **Revisar** para abrir un panel con las diferencias campo por campo, las vistas previas de archivos y una vista previa de solo lectura del elemento. Usa los atajos de teclado **a**/**r** para aprobar o rechazar, y **j**/**k** para pasar al envío siguiente o anterior sin salir del panel. Para rechazar es obligatorio seleccionar un motivo (por ejemplo, calidad, duplicado, licencia, ccli, ia o fuera de tema) y escribir una nota.

### Reports

La pestaña Reports gestiona los informes de derechos de autor y de política/calidad presentados contra recursos ya publicados, divididos en las colas separadas Copyright y Policy & Other, además del historial Resolved. Reclama un informe para empezar a trabajarlo y luego resuélvelo con una resolución (upheld, dismissed o duplicate) y una acción (none, unpublish o remove).

### Assets

La pestaña Assets es un explorador con búsqueda del contenido publicado, con acciones para **Destacar** un recurso (lo destaca en la página de inicio del producto), **Despublicar**/**Republicar** o **Eliminar** (con un motivo de derechos de autor o de política).

En el caso de las canciones, aquí también es donde una canción pasa a estar **Lista para el domingo** y puede aparecer en la búsqueda de canciones de B1 Admin de una iglesia: un revisor abre el recurso y marca cada tonalidad publicada como **Escuchado** una vez que la ha escuchado completa y ha confirmado que la partitura, los acordes y las diapositivas están todos presentes. Una canción solo queda Sunday-ready cuando se han marcado todas sus tonalidades.

:::info
La moderación de Commons es solo para el personal: las iglesias individuales nunca ven esta cola. El único lugar en el que B1 Admin de una iglesia individual usa datos de Commons es la sección "WorshipCommons — free" de la [búsqueda de canciones](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que solo muestra canciones que ya han pasado por este proceso de revisión.
:::

Consulta la página [Arquitectura de Content Commons](/docs/developer/architecture/commons) para ver el modelo de datos subyacente y el ciclo de vida de los envíos.

## Aprobación del correo de grupo

Las iglesias no pueden enviar correo redactado por ellas (correo de grupo, seguimientos de formularios, correos de flujos de trabajo e invitaciones de cuenta) hasta que un administrador del servidor lo apruebe. Así se evita que iglesias registradas por bots usen la dirección de envío compartida de ChurchApps para hacer spam.

1. Abre la pestaña **Iglesias** del panel de administración del servidor.
2. Cada iglesia muestra una etiqueta **Correo de grupo**: **Aprobado** (verde) o **No aprobado** (con borde).
3. Haz clic en la etiqueta y confirma para aprobar la iglesia o para revocar una aprobación.

El personal de la iglesia solicita la aprobación con el botón **Solicitar revisión** del cuadro de diálogo Send Email de B1 Admin. La solicitud se envía por correo a la dirección de soporte e incluye el nombre de la iglesia, su ID, la fecha de registro, la ubicación y quién la pidió. Una iglesia puede enviar una solicitud por semana. Consulta [Límites del correo redactado por la iglesia](/docs/developer/architecture/notifications#church-authored-email-limits) para ver la cuota diaria y la pausa automática por rebotes y quejas.

## Migraciones de base de datos {#database-migrations}

El flujo **Deploy Prod** aplica por sí mismo las migraciones pendientes. Las bases de datos alojadas solo aceptan conexiones desde dentro de la red de la API, así que un runner de GitHub no puede alcanzarlas; en su lugar, justo después de `serverless deploy`, el flujo invoca la función Lambda `migrate` de la API (`api-Prod-migrate`), que ejecuta las migraciones pendientes de cada módulo con el mismo runner que esta pestaña y hace fallar el despliegue si algún módulo da error o es rechazado. **Rollback Prod** revierte solo el código de la Lambda; las migraciones ya aplicadas permanecen aplicadas. La pestaña **Migraciones de base de datos** sirve para consultar el estado, ejecutar lo que un despliegue no haya ejecutado (por ejemplo, en el entorno de demostración, cuyo despliegue no migra) y establecer una línea base en los módulos sin historial. (Las instalaciones autoalojadas con Docker siguen ejecutando las migraciones automáticamente cuando arranca el contenedor de la API).

La pestaña muestra el entorno actual y una fila por módulo (membership, attendance, giving, etc.) con su estado, el número de migraciones aplicadas y pendientes, y la última aplicada.

- **Ejecutar migraciones pendientes** aplica todas las migraciones pendientes, un módulo a la vez, en orden. Se detiene en el primer fallo y muestra lo aplicado en cada módulo.
- Un módulo marcado como **Sin historial** tiene una base de datos anterior al seguimiento de migraciones. Nunca se ejecuta automáticamente, porque eso reproduciría migraciones de datos antiguas sobre tablas en producción. Haz clic en **Comprobar esquema** en ese módulo. La API compara las tablas, columnas e índices que crea cada migración con la base de datos en producción y marca cada migración como **Ya aplicada**, **Faltante**, **Parcialmente aplicada** o **Solo datos**. La comprobación no cambia nada.
- En los resultados de la comprobación, **Registrar como ya aplicadas** escribe las migraciones detectadas en el historial de migraciones sin ejecutarlas (tras una confirmación). Se registra todo hasta la última migración **Ya aplicada**, incluidas las **Solo datos** dentro de ese rango; las **Faltante** permanecen pendientes y después pueden ejecutarse normalmente con **Ejecutar migraciones pendientes**.
- Una migración **Parcialmente aplicada** bloquea el registro. Si la migración puede volver a ejecutarse con seguridad (léela primero), marca **Volver a ejecutar** para que siga pendiente y se ejecute de nuevo desde el principio.

El panel de administración del servidor y la CLI (`yarn migrate:up`) usan el mismo migrador de Kysely y la misma tabla `kysely_migration`, así que siempre coinciden en lo que se ha aplicado. Los endpoints que lo respaldan son `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` y `POST .../:module/baseline`, todos exclusivos de Server.Admin.

## Páginas relacionadas

- [Autenticación y permisos](/docs/developer/api/endpoints/authentication) — Modelo de permisos y autenticación JWT
- [Endpoints de Membership](/docs/developer/api/endpoints/membership) — API de gestión de usuarios e iglesias
- [Registro de auditoría](/docs/b1-admin/reports/audit-log) — Ver los registros de actividad de una iglesia
- [Arquitectura de Content Commons](/docs/developer/architecture/commons) — Modelo de recursos compartidos y ciclo de vida de la moderación
