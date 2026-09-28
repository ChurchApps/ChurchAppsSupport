---
title: "Miembros del Grupo"
---

# Miembros del Grupo

<div class="article-intro">

Una vez que has creado un grupo, el siguiente paso es agregar miembros. Desde la página de detalles de un grupo puedes buscar personas, agregarlas al grupo, asignar líderes, enviar mensajes y exportar la lista de miembros. Administrar la membresía del grupo es esencial para coordinar pequeños grupos, comités y clases.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas al menos un grupo configurado en B1 Admin. Consulta [Crear Grupos](creating-groups.md) si aún no has creado uno.
- Las personas que deseas agregar ya deben existir en tu directorio de [Personas](../people/adding-people.md).

</div>

## Agregar Miembros a un Grupo

1. Ve a la página **Grupos** y haz clic en el grupo que deseas administrar.
2. Haz clic en la pestaña **Miembros**.
3. En el cuadro de búsqueda, escribe el nombre de la persona que deseas agregar.
4. Haz clic en **Agregar** junto al nombre de la persona en los resultados de búsqueda.
5. La persona ahora aparece en la lista de miembros del grupo.

:::tip
Deja el cuadro de búsqueda en blanco y haz clic en **Buscar** para navegar por tu directorio completo. Esto es útil si no estás seguro de la ortografía exacta del nombre de alguien.
:::

## Designar Líderes de Grupo

Los líderes de grupo tienen privilegios especiales: pueden editar el [calendario del grupo](group-calendar.md), administrar eventos y ayudar a coordinar el grupo.

1. En la lista de miembros del grupo, encuentra la persona que deseas hacer líder.
2. Haz clic en el **icono de llave verde** junto a su nombre.
3. La persona ahora está designada como líder de grupo.

Para eliminar el estado de líder, haz clic de nuevo en el icono de llave verde.

:::info
Cualquier miembro del grupo puede ver el calendario del grupo y los eventos, pero solo los líderes pueden agregar o editar eventos del calendario.
:::

## Enviar Mensajes a Miembros del Grupo

Puedes comunicarte con todos los miembros de un grupo directamente desde B1 Admin:

1. Desde la página de detalles del grupo, busca el área de mensajería.
2. Escribe tu mensaje en el cuadro de texto.
3. Haz clic en **Enviar**.

Tu mensaje se entregará a todos los miembros del grupo.

## Enviar Correos Electrónicos a Miembros del Grupo

Puedes enviar correos electrónicos formateados a todos los miembros de un grupo:

1. Desde la página de detalles del grupo, haz clic en el **icono de correo electrónico**.
2. Se abre el cuadro de diálogo Enviar Correo, que muestra cuántos miembros recibirán el correo y cuántos no tienen dirección de correo registrada.
3. Opcionalmente selecciona una **plantilla de correo** del menú desplegable, o escribe un mensaje desde cero. Haz clic en **Administrar Plantillas** para crear o editar plantillas.
4. Ingresa una **línea de asunto**. Puedes insertar campos de combinación haciendo clic en los chips de campos: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Escribe el **cuerpo del correo** usando el editor HTML. Los mismos campos de combinación están disponibles aquí.
6. Haz clic en **Enviar**.
7. Un resumen muestra cuántos correos se enviaron correctamente y cuántos miembros se omitieron (sin correo registrado).

:::tip
Crea plantillas de correo reutilizables para comunicaciones recurrentes como actualizaciones semanales, anuncios de eventos o solicitudes de oración. Las plantillas ahorran tiempo y garantizan mensajería coherente.
:::

### Activar Correo de Grupo para tu Iglesia

Todas las iglesias en B1 envían correo desde la misma dirección, por lo que comparten una reputación de envío. Para mantener el correo de todos fuera de carpetas de spam, el equipo de ChurchApps revisa cada iglesia una vez antes de que pueda enviar correo de grupo.

Si tu iglesia aún no ha sido revisada, el cuadro de diálogo Enviar Correo muestra **El correo de grupo necesita una revisión rápida** en lugar del editor de mensajes:

1. Haz clic en **Solicitar revisión**. Se notifica al equipo de soporte de ChurchApps.
2. El cuadro de diálogo cambia a **Revisión solicitada**. Puedes cerrarlo.
3. El correo de grupo generalmente se activa dentro de un día hábil. Abre el cuadro de diálogo Enviar Correo nuevamente después de eso para enviar tu mensaje.

Hasta que tu iglesia sea aprobada, B1 tampoco envía [correos de seguimiento de formularios](../forms/creating-forms.md#sending-a-follow-up-email) ni el paso **Enviar correo** en [flujos de trabajo](../serving/workflows.md).

:::info Límites de envío
Después de la aprobación, una iglesia puede enviar hasta 150 correos escritos por la iglesia al día. El límite aumenta a medida que tu iglesia construye un historial de envío limpio, hasta 2,000 al día. Si los mensajes recientes fueron rechazados o marcados como spam, el correo de grupo se pausa y el cuadro de diálogo te pide que contactes al soporte. Si un envío excedería tu límite diario, B1 no lo envía y muestra un error.
:::

## Exportar Datos de Grupo

Para descargar la lista de miembros del grupo como archivo:

1. Desde la página de detalles del grupo, haz clic en el **icono de descarga**.
2. Se descargará un archivo CSV que contiene la información de miembros del grupo en tu computadora.

Para imprimir una hoja de asistencia para una clase, usa en su lugar **Imprimir Hoja de Asistencia** -- consulta [Imprimir una Hoja de Asistencia](../attendance/recording-attendance.md#printing-a-roll-sheet).

Una exportación CSV es útil para importar datos en otras herramientas o mantener registros sin conexión. Para más opciones de exportación, consulta [Exportar Datos](../people/exporting-data.md).

## Enviar Notificaciones Push a Miembros del Grupo

Puedes enviar una notificación push directamente a todos los miembros del grupo que tengan la aplicación B1.church instalada en su dispositivo con notificaciones push habilitadas.

1. Desde la página de detalles del grupo, haz clic en el **icono de campana** en la barra de herramientas del encabezado (junto a los iconos de correo y SMS).
2. Se abre un cuadro de diálogo que muestra cuántos miembros de tu grupo tienen push habilitado.
3. Completa los detalles de la notificación:
   - **Título** *(requerido)* -- Un resumen breve, hasta 80 caracteres.
   - **Mensaje** *(requerido)* -- El cuerpo de la notificación, hasta 240 caracteres.
   - **Abrir enlace o URL de volante** *(opcional)* -- Una ruta de aplicación relativa (por ejemplo, `/mobile/groups`) o una URL completa `https://` que se abre cuando se toca la notificación.
   - **URL de Imagen** *(opcional)* -- Una URL `https://` a una imagen que aparece junto a la notificación en dispositivos compatibles.
4. Una vista previa en vivo muestra cómo aparecerá la notificación en el dispositivo.
5. Haz clic en **Enviar Notificación**.

:::info
Las notificaciones push se entregan solo a miembros del grupo que tengan la PWA B1.church instalada y no hayan deshabilitado las notificaciones push. Los miembros sin un dispositivo push registrado o con push desactivado se cuentan como omitidos, y el resumen de envío muestra cuántos se alcanzaron frente a los omitidos.
:::

:::tip
Después de enviar, el cuadro de diálogo muestra cuántas notificaciones se pusieron en cola correctamente. Si la mayoría de los miembros se muestran como omitidos, recuérdales que visiten su sitio B1.church, lo instalen como una aplicación de pantalla de inicio y permitan notificaciones cuando se les solicite.
:::

## Eliminar Miembros

Para eliminar a alguien de un grupo, localiza su nombre en la lista de miembros y haz clic en el botón **eliminar** junto a su entrada.

:::info
Eliminar a una persona de un grupo no las elimina de tu directorio de la iglesia. Aún aparecerán en la sección [Personas](../people/adding-people.md) y pueden volver a agregarse al grupo en cualquier momento.
:::
