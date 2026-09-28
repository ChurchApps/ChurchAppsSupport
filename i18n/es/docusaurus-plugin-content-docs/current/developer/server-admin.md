---
title: "Administración del Servidor"
---

# Administración del Servidor

<div class="article-intro">

Las características de administración del servidor en ChurchApps están disponibles solo para usuarios con permiso **Server.Admin**. Estas herramientas se utilizan para operaciones de plataforma, soporte y resolución de problemas en todas las iglesias del sistema.

</div>

:::warning Acceso Restringido
Las características descritas en esta página requieren permiso **Server.Admin** y no están disponibles para administradores de iglesia regulares. Están destinadas solo para operadores de plataforma y personal de soporte.
:::

## Accediendo a Server Admin

Los usuarios con permiso Server.Admin pueden acceder al panel de administración del servidor desde B1 Admin:

1. Inicia sesión en [admin.b1.church](https://admin.b1.church)
2. Abre **Configuración**, luego haz clic en **Server Admin** en el menú Configuración. (También puedes ir directamente a `admin.b1.church/admin`.)
3. El panel Server Admin tiene secciones para Iglesias, Usuarios, Suplantar Usuario, Trabajos en Segundo Plano, Commons, Tendencias de Uso, Búsquedas de Traducción, Salud del Servidor y Migraciones de Base de Datos

## Suplantación de Usuario

La característica de suplantación permite a los administradores del servidor iniciar sesión como otro usuario con fines de soporte y solución de problemas. Esto es útil cuando se investigan problemas reportados por usuarios o se ayuda a las iglesias a configurar sus sistemas.

### Cómo Suplantar a un Usuario

1. Abre la sección **Suplantar Usuario** del panel Server Admin
2. Ingresa el nombre o correo electrónico del usuario en el campo de búsqueda
3. Haz clic en **Buscar** o presiona Enter
4. Desde los resultados de búsqueda, haz clic en el usuario que deseas suplantar
5. Confirma la suplantación en el diálogo que aparece
6. Iniciarás sesión como ese usuario y serás redirigido a su cuenta

### Notas Importantes

- La suplantación crea una nueva sesión con los permisos y acceso a iglesia del usuario objetivo
- Tu sesión de administrador original finaliza cuando suplanta a otro usuario
- Todas las acciones realizadas mientras está suplantado se registran en el registro de auditoría
- Para volver a tu cuenta de administrador, cierra sesión e inicia sesión nuevamente con tus credenciales
- Usa la suplantación solo cuando sea necesario para propósitos de soporte e informa siempre a los usuarios cuando accedas a sus cuentas para soporte

### Punto Final de API

La característica de suplantación está respaldada por el punto final `/users/:userId/impersonate` en la API de Membresía. Ver [Puntos Finales de Membresía](/docs/developer/api/endpoints/membership#users) para detalles técnicos.

### Consideraciones de Seguridad

- La suplantación requiere permiso Server.Admin - este permiso debe otorgarse con cuidado y solo a operadores de plataforma de confianza
- Todos los eventos de suplantación se registran con el ID de usuario administrador e ID de usuario objetivo
- Las iglesias no se notifican cuando ocurre la suplantación, así que establece políticas claras para cuándo y cómo debe usarse esta característica
- Considera documentar eventos de suplantación en tu sistema de tickets de soporte para responsabilidad

## Moderación de Commons

Commons es la cola de moderación compartida para contenido enviado por usuarios en todos los productos —canciones WorshipCommons, lecciones Lessons.church, plantillas FreeShow y plantillas del constructor de sitios web B1— todas fluyen a través de la misma cola en lugar de herramientas de revisión separadas por producto.

### Accediendo a Commons

1. Navega a la pestaña **Commons** en el panel Server Admin.
2. Verás tres sub-pestañas: **Cola**, **Reportes** y **Activos**.

Un rol limitado de **editor de música** también puede ver la pestaña Cola, pero está bloqueado de aprobar envíos que cambien los derechos o licencias de una canción.

### Cola

La Cola enumera cada envío pendiente en todos los productos, filtrables por producto y tipo de activo. Cada fila muestra si el envío es un activo nuevo, una edición por su autor original o una edición por un tercero, junto con el historial de aprobación del remitente y cuánto tiempo el envío ha estado esperando (marcado una vez que pasa 72 horas).

Haz clic en **Revisar** para abrir un cajón con diffs a nivel de campo, vistas previas de archivos y una vista previa integrada de solo lectura del artículo. Usa los atajos de teclado **a**/**r** para aprobar o rechazar, y **j**/**k** para pasar al siguiente o anterior envío sin salir del cajón. Rechazar requiere seleccionar una razón (por ejemplo, calidad, duplicado, licencia, ccli, ai u off-topic) y una nota.

### Reportes

La pestaña Reportes maneja reportes de derechos de autor y de política/calidad presentados contra activos ya publicados, divididos en colas separadas de Derechos de Autor y Política y Otros más un historial Resuelto. Reclama un reporte para empezar a trabajar, luego resuélvelo con una resolución (confirmado, desestimado o duplicado) y una acción (nada, despublicar o remover).

### Activos

La pestaña Activos es un navegador de contenido publicado con búsqueda y acciones para **Destacar** un activo (lo resalta en la página de inicio del producto), **Despublicar**/**Republicar** o **Remover** (con una razón de derechos de autor o política).

Para canciones específicamente, este es también el lugar donde una canción se convierte en **Sunday-ready** y elegible para aparecer en la búsqueda de canciones de B1 Admin de una iglesia: un revisor abre el activo y marca cada clave publicada como **Escuchada** una vez que la ha escuchado y confirmado que la partitura, acordes y diapositivas están todos presentes. Una canción solo se vuelve Sunday-ready una vez que cada clave está marcada.

:::info
La moderación de Commons es solo para el personal —las iglesias individuales nunca ven esta cola. El único lugar donde el B1 Admin de una iglesia individual toca datos de Commons es la sección "WorshipCommons — gratis" de la [búsqueda de canciones](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons), que solo muestra canciones que ya han pasado este proceso de revisión.
:::

Ver la página [Arquitectura de Content Commons](/docs/developer/architecture/commons) para el modelo de datos subyacente y ciclo de vida de envío.

## Aprobación de Correo Electrónico de Grupo

Las iglesias no pueden enviar correo electrónico escrito por la iglesia (correo electrónico de grupo, seguimientos de formularios, correos electrónicos de flujo de trabajo e invitaciones de cuenta) hasta que un administrador del servidor los apruebe. Esto evita que iglesias registradas por bots usen la dirección de envío compartida de ChurchApps para spam.

1. Abre la pestaña **Iglesias** en el panel Server Admin.
2. Cada iglesia muestra un chip **Correo Electrónico de Grupo**: **Aprobado** (verde) o **No aprobado** (delineado).
3. Haz clic en el chip y confirma para aprobar la iglesia, o para revocar una aprobación.

El personal de la iglesia solicita aprobación con el botón **Solicitar revisión** en el diálogo Enviar Correo Electrónico de B1 Admin. La solicitud se envía por correo electrónico a la dirección de soporte y enumera el nombre de la iglesia, ID, fecha de registro, ubicación y quién lo solicitó. Una iglesia puede enviar una solicitud por semana. Ver [Límites de correo electrónico escrito por la iglesia](/docs/developer/architecture/notifications#church-authored-email-limits) para la asignación diaria y la pausa automática en rebotes y quejas.

## Migraciones de Base de Datos

Los despliegues no cambian la base de datos. Las bases de datos alojadas solo aceptan conexiones desde dentro de la red de la Api, por lo que después de un lanzamiento que agrega una migración, un administrador del servidor la aplica desde la pestaña **Migraciones de Base de Datos**. (Las instalaciones Docker autohospedadas aún ejecutan migraciones automáticamente cuando se inicia el contenedor Api.)

La pestaña muestra el entorno actual y una fila por módulo (membresía, asistencia, donaciones, etc.) con su estado, el número de migraciones aplicadas y pendientes, y la última aplicada.

- **Ejecutar Migraciones Pendientes** aplica cada migración pendiente, un módulo a la vez, en orden. Se detiene en la primera falla y muestra lo que fue aplicado para cada módulo.
- Un módulo marcado **Sin historial** tiene una base de datos anterior al seguimiento de migración. Nunca se ejecuta automáticamente, porque eso repetiría migraciones antiguas de datos sobre tablas en vivo. Haz clic en **Verificar Esquema** en ese módulo en su lugar. La Api compara las tablas, columnas e índices que cada migración crea con la base de datos en vivo y marca cada migración **Ya aplicada**, **Faltante**, **Parcialmente aplicada** o **Solo datos**. Nada es cambiado por la verificación.
- En los resultados de la verificación, **Registrar como Ya Aplicada** escribe las migraciones detectadas en el historial de migración sin ejecutarlas. Las faltantes permanecen pendientes y pueden ejecutarse normalmente.
- Una migración **Parcialmente aplicada** bloquea el registro. Si la migración es segura para ejecutar nuevamente (léela primero), marca **Re-ejecutar** para que permanezca pendiente y se ejecute nuevamente desde el principio.

El panel Server Admin y la CLI (`yarn migrate:up`) usan el mismo migrador Kysely y tabla `kysely_migration`, por lo que siempre están de acuerdo sobre lo que ha sido aplicado. Los puntos finales de respaldo son `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` y `POST .../:module/baseline`, todos solo Server.Admin.

## Páginas Relacionadas

- [Autenticación y Permisos](/docs/developer/api/endpoints/authentication) — Modelo de permisos y autenticación JWT
- [Puntos Finales de Membresía](/docs/developer/api/endpoints/membership) — API de gestión de usuarios e iglesias
- [Registro de Auditoría](/docs/b1-admin/reports/audit-log) — Ver registros de actividad de una iglesia
- [Arquitectura de Content Commons](/docs/developer/architecture/commons) — Modelo de activo compartido y ciclo de vida de moderación
