---
title: "Exportar Datos"
---

# Exportar Datos

<div class="article-intro">

B1 Admin te permite exportar los datos de tu iglesia para que puedas usarlos en hojas de cálculo, compartirlos con tu equipo o mantener una copia de seguridad. Ya sea que necesites una lista rápida de nombres y correos electrónicos o una exportación completa de la base de datos, hay opciones que se adaptan a tus necesidades.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta B1 Admin activa con permiso para ver los datos que deseas exportar. Ver [Roles & Permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Para una exportación completa de la base de datos, necesitas acceso al área de **Configuración**.

</div>

## Exportar desde la Página de Personas

La forma más rápida de exportar tu directorio es directamente desde la página de **People**:

1. Abre el [menú Saltar](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda de B1 Admin), expande **People**, y haz clic en **People**.
2. Usa la barra de búsqueda o filtros para reducir los resultados que deseas exportar (o déjalo sin filtrar para exportar a todos). Ver [Buscar Personas](searching-people.md) para consejos de filtrado.
3. Usa el **selector de columnas** para elegir qué columnas deseas incluir en la exportación (por ejemplo, Nombre, Correo Electrónico, Teléfono, Dirección).
4. Haz clic en el botón **Exportar**.
5. Un archivo CSV se descargará a tu computadora con los datos actualmente mostrados en la tabla.

:::tip
Personaliza tus columnas antes de exportar. El archivo CSV incluirá exactamente las columnas que tienes visibles, para que puedas adaptar la exportación a tus necesidades sin editar el archivo después.
:::

## Exportación Completa de Datos desde Configuración

Para una exportación completa de todos tus datos B1 (no solo personas), usa la herramienta de exportación en Configuración:

1. En el menú Saltar, elige **Configuración > Configuración**.
2. Haz clic en el botón **Importar/Exportar** en la esquina superior derecha del encabezado de la página.
3. Selecciona **B1 Database** del menú desplegable **Fuente de Datos**.
4. Revisa la vista previa de datos y haz clic en **Continuar al Destino**.
5. Selecciona **Zip de Exportación B1** como destino de exportación.
6. Monitorea el progreso de la exportación hasta que todos los elementos muestren marcas de verificación verdes.
7. El archivo de exportación se descargará automáticamente. Busca el archivo `B1Export` en tu carpeta de descargas.
8. Descomprime el archivo para acceder a archivos CSV individuales (como `people.csv`) que puedes abrir en Excel, Google Sheets, o Numbers.

:::info
Las exportaciones de datos completos incluyen personas, grupos, donaciones, asistencia, y más -- todo en tu base de datos B1. Esta también es una gran forma de crear una copia de seguridad periódica de tus registros de iglesia.
:::

## Exportar Datos de Grupo

También puedes exportar listas de miembros para grupos individuales. Desde la página de **Grupos**, abre un grupo y haz clic en el **icono de descarga** para exportar la lista de miembros de ese grupo. Ver [Miembros del Grupo](../groups/group-members.md) para más detalles.

:::info
Los archivos CSV exportados funcionan con todas las aplicaciones principales de hojas de cálculo incluyendo Microsoft Excel, Google Sheets, y Apple Numbers.
:::
