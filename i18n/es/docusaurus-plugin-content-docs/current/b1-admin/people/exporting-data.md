---
title: "Exportar Datos"
---

# Exportar Datos

<div class="article-intro">

B1 Admin te permite exportar datos de tu iglesia para que puedas usarlo en hojas de cálculo, compartirlo con tu equipo o mantener una copia de seguridad. Ya sea que necesites una lista rápida de nombres y correos electrónicos o una exportación completa de la base de datos, hay opciones que se adaptan a tus necesidades.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con permiso para ver los datos que deseas exportar. Ver [Roles y Permisos](roles-permissions.md) si no estás seguro de tu nivel de acceso.
- Para una exportación completa de la base de datos, necesitas acceso al área de **Configuración**.

</div>

## Exportar desde la Página de Personas

La forma más rápida de exportar tu directorio es directamente desde la página **Personas**:

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Personas**.
2. Usa la barra de búsqueda o filtros para reducir los resultados que deseas exportar (o déjalo sin filtrar para exportar a todos). Ver [Buscar Personas](searching-people.md) para consejos sobre filtrado.
3. Usa el **selector de columnas** para elegir qué columnas deseas incluir en la exportación (por ejemplo, Nombre, Correo Electrónico, Teléfono, Dirección).
4. Haz clic en el botón **Exportar**.
5. Un archivo CSV se descargará a tu computadora con los datos actualmente mostrados en la tabla.

:::tip
Personaliza tus columnas antes de exportar. El archivo CSV incluirá exactamente las columnas que tienes visibles, para que puedas adaptar la exportación a tus necesidades sin editar el archivo después.
:::

## Exportación de Datos Completa desde Configuración

Para una exportación completa de todos tus datos de B1 (no solo personas), usa la herramienta de exportación en Configuración:

1. Abre el **menú de sección** en la esquina superior izquierda y elige **Configuración**.
2. Haz clic en **Importar/Exportar** en la navegación superior.
3. Selecciona **Base de Datos B1** del menú desplegable **Fuente de Datos**.
4. Revisa la vista previa de datos y haz clic en **Continuar a Destino**.
5. Selecciona **Zip de Exportación B1** como destino de exportación.
6. Monitorea el progreso de exportación hasta que todos los elementos muestren marcas de verificación verdes.
7. El archivo de exportación se descargará automáticamente. Busca el archivo `B1Export` en tu carpeta de descargas.
8. Descomprime el archivo para acceder a archivos CSV individuales (como `people.csv`) que puedas abrir en Excel, Google Sheets o Numbers.

:::info
Las exportaciones completas de datos incluyen personas, grupos, donaciones, asistencia y más -- todo en tu base de datos B1. Esta es también una excelente manera de crear una copia de seguridad periódica de tus registros de iglesia.
:::

## Exportar Datos de Grupo

También puedes exportar listas de miembros para grupos individuales. Desde la página **Grupos**, abre un grupo y haz clic en el **icono de descargar** para exportar la lista de miembros de ese grupo. Ver [Miembros del Grupo](../groups/group-members.md) para más detalles.

:::info
Los archivos CSV exportados funcionan con todas las aplicaciones de hoja de cálculo principales, incluyendo Microsoft Excel, Google Sheets y Apple Numbers.
:::
