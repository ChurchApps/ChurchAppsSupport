---
title: "Miembros del Grupo"
---

# Miembros del Grupo

<div class="article-intro">

Una vez que haya creado un grupo, el siguiente paso es agregar miembros. Desde la página de detalles de un grupo puede buscar personas, agregarlas al grupo, asignar líderes, enviar mensajes y exportar la lista de miembros. Administrar la membresía del grupo es esencial para coordinar grupos pequeños, comités y clases.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesita al menos un grupo configurado en B1 Admin. Vea [Crear Grupos](creating-groups.md) si aún no ha creado uno.
- Las personas que desea agregar ya deben existir en su directorio de [Personas](../people/adding-people.md).

</div>

## Agregar Miembros a un Grupo

1. Navegue a la página de **Grupos** y haga clic en el grupo que desea administrar.
2. Haga clic en la pestaña **Miembros**.
3. En el cuadro de búsqueda, escriba el nombre de la persona que desea agregar.
4. Haga clic en **Agregar** junto al nombre de la persona en los resultados de búsqueda.
5. La persona ahora aparece en la lista de miembros del grupo.

:::tip
Deje el cuadro de búsqueda en blanco y haga clic en **Buscar** para explorar su directorio completo. Esto es útil si no está seguro de la ortografía exacta del nombre de alguien.
:::

## Designar Líderes de Grupo

Los líderes del grupo tienen privilegios especiales: pueden editar el [calendario del grupo](group-calendar.md), administrar eventos y ayudar a coordinar el grupo.

1. En la lista de miembros del grupo, encuentre la persona que desea convertir en líder.
2. Haga clic en el **icono de llave verde** junto a su nombre.
3. La persona ahora está designada como líder del grupo.

Para eliminar el estado de líder, haga clic nuevamente en el icono de llave verde.

:::info
Cualquier miembro del grupo puede ver el calendario y los eventos del grupo, pero solo los líderes pueden agregar o editar eventos del calendario.
:::

## Enviar Mensajes a Miembros del Grupo

Puede comunicarse con todos los miembros de un grupo directamente desde B1 Admin:

1. Desde la página de detalles del grupo, busque el área de mensajería.
2. Escriba su mensaje en el cuadro de texto.
3. Haga clic en **Enviar**.

Su mensaje se entregará a todos los miembros del grupo.

## Enviar Correos Electrónicos a Miembros del Grupo

Puede enviar correos electrónicos formateados a todos los miembros de un grupo:

1. Desde la página de detalles del grupo, haga clic en el **icono de correo electrónico**.
2. Se abre el diálogo Enviar Correo Electrónico, mostrando cuántos miembros recibirán el correo y cuántos no tienen dirección de correo electrónico archivada.
3. Opcionalmente, seleccione una **plantilla de correo electrónico** en la lista desplegable o redacte un mensaje desde cero. Haga clic en **Administrar Plantillas** para crear o editar plantillas.
4. Ingrese una **línea de asunto**. Puede insertar campos de combinación haciendo clic en los chips de campo: `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}`, `{{churchName}}`.
5. Redacte el **cuerpo del correo electrónico** usando el editor HTML. Los mismos campos de combinación están disponibles aquí.
6. Haga clic en **Enviar**.
7. Un resumen muestra cuántos correos se enviaron exitosamente y cuántos miembros se omitieron (sin correo electrónico archivado).

:::tip
Cree plantillas de correo electrónico reutilizables para comunicaciones recurrentes como actualizaciones semanales, anuncios de eventos o solicitudes de oración. Las plantillas ahorran tiempo y garantizan mensajería coherente.
:::

## Exportar Datos del Grupo

Para descargar la lista de miembros del grupo como archivo:

1. Desde la página de detalles del grupo, haga clic en el **icono de descarga**.
2. Se descargará un archivo CSV con la información de miembros del grupo en su computadora.

Esto es útil para crear listas impresas, importar datos a otras herramientas o mantener registros sin conexión. Para más opciones de exportación, vea [Exportar Datos](../people/exporting-data.md).

## Enviar Notificaciones Automáticas a Miembros del Grupo

Puede enviar una notificación automática directamente a todos los miembros del grupo que tengan la aplicación B1.church instalada en su dispositivo con notificaciones automáticas habilitadas.

1. Desde la página de detalles del grupo, haga clic en el **icono de campana** en la barra de herramientas del encabezado (junto a los iconos de correo electrónico y SMS).
2. Se abre un diálogo mostrando cuántos miembros de su grupo tienen las notificaciones automáticas habilitadas.
3. Complete los detalles de la notificación:
   - **Título** *(requerido)* -- Un resumen breve, hasta 80 caracteres.
   - **Mensaje** *(requerido)* -- El cuerpo de la notificación, hasta 240 caracteres.
   - **Abrir enlace o URL de volante** *(opcional)* -- Una ruta de aplicación relativa (por ejemplo, `/mobile/groups`) o una URL completa `https://` que se abre cuando se toca la notificación.
   - **URL de imagen** *(opcional)* -- Una URL `https://` a una imagen que aparece junto a la notificación en dispositivos compatibles.
4. Una vista previa en vivo muestra cómo aparecerá la notificación en el dispositivo.
5. Haga clic en **Enviar Notificación**.

:::info
Las notificaciones automáticas se entregan solo a miembros del grupo que tienen la PWA B1.church instalada y no han deshabilitado las notificaciones automáticas. Los miembros sin un dispositivo de notificación registrado o con las notificaciones desactivadas se cuentan como omitidos, y el resumen de envío muestra cuántos fueron alcanzados frente a los omitidos.
:::

:::tip
Después de enviar, el diálogo muestra cuántas notificaciones se pusieron en cola exitosamente. Si la mayoría de los miembros muestran omisiones, recuérdeles que visiten su sitio B1.church, instalen como una aplicación de pantalla de inicio y permitan notificaciones cuando se solicite.
:::

## Eliminar Miembros

Para eliminar a alguien de un grupo, localice su nombre en la lista de miembros y haga clic en el botón de **eliminar** junto a su entrada.

:::info
Eliminar a una persona de un grupo no los elimina de su directorio de la iglesia. Todavía aparecerán en la sección de [Personas](../people/adding-people.md) y pueden volver a agregarse al grupo en cualquier momento.
:::
