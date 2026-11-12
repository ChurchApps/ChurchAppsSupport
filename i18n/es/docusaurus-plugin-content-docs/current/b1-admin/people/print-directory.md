---
title: "Imprimir directorio"
description: "Genere un directorio de miembros imprimible, agrupado por hogar, desde B1 Admin, con fotos, información de contacto y cumpleaños, en tamaño carta."
---

# Imprimir directorio

<div class="article-intro">

La función Print Directory genera un directorio de miembros imprimible y con formato para su iglesia. Organiza a los miembros por hogar, incluye información de contacto y fotos, y está diseñado para verse profesional cuando se imprime en papel tamaño carta estándar.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con permiso para ver personas.
- Las personas de su directorio deben tener fotos e información de contacto completas para obtener mejores resultados.

</div>

## Cómo abrir Print Directory {#opening-the-print-directory}

1. Vaya a **People** en B1 Admin.
2. Haga clic en **Print Directory** en el encabezado de la página People.
3. Print Directory se abre en una nueva pestaña del navegador y empieza a cargar los datos de su directorio.
4. Después de unos 1.5 segundos, aparecerá automáticamente el cuadro de diálogo de impresión de su navegador.

:::tip
El directorio se abre en una pestaña separada para que pueda imprimirlo sin salir de la página People. Cuando se cierra el cuadro de diálogo de impresión, esa pestaña cambia a la página People, así que puede cerrarla o seguir trabajando allí.
:::

## Qué se incluye {#what-gets-included}

Print Directory incluye a todos los **miembros activos** de su iglesia. En concreto:

- Las personas con estado de membresía **Inactive**, **Visitor** o **Deceased** se excluyen automáticamente.
- Las personas que se han **excluido** del directorio también quedan fuera.
- Todas las demás personas se agrupan por **hogar**.

### Imprimir solo sus resultados de búsqueda {#printing-only-your-search-results}

Después de hacer una búsqueda en la página People (una búsqueda rápida, una [Búsqueda avanzada](./searching-people.md#advanced-search), una [Lista guardada](./lists.md) o una [Búsqueda con IA](./ai-search.md)), el botón **Print Directory** cambia a **Print Results**. Al hacer clic, se imprime un directorio solo con las personas de sus resultados, en lugar de toda la iglesia, usando el mismo diseño.

Al imprimir resultados de búsqueda, el filtro de estado de membresía mencionado arriba no se aplica: se incluye a todas las personas que buscó, incluidos los Visitors o las personas Inactive. Las personas que se han excluido del directorio siguen quedando fuera. Para volver a imprimir el directorio completo, borre primero su búsqueda.

## Diseño del directorio {#directory-layout}

El directorio impreso tiene dos partes:

### Portada {#cover-page}

La primera página incluye:
- El logotipo de su iglesia, si tiene uno configurado
- El nombre de su iglesia
- El título "Member Directory"
- El año en curso
- La ciudad y el estado de su iglesia
- La fecha de impresión y el conteo de hogares incluidos

### Listados de miembros {#member-listings}

Las páginas restantes enumeran los hogares en orden alfabético por apellido. Cada tarjeta de hogar muestra:

- **Fotos**: miniaturas circulares de cada miembro del hogar, con su nombre debajo
- **Nombre para mostrar del hogar**: por ejemplo, "The Smith Family", "John & Jane Doe" o solo el nombre de la persona en el caso de personas individuales
- **Dirección**: calle, ciudad, estado y código postal
- **Teléfono**: el número de casa, o un número móvil si nadie del hogar tiene número de casa
- **Correo electrónico**: dirección de correo electrónico principal
- **Cumpleaños**: el nombre de pila y el cumpleaños de cada miembro (mes y día)
- **Aniversario**: si está registrado

Los hogares se organizan en **secciones alfabéticas** (A, B, C, ...) con un encabezado decorativo antes de cada grupo de letras. Dos tarjetas de hogar aparecen una al lado de la otra en cada fila.

## Configuración de impresión {#print-settings}

El directorio tiene el formato de **papel tamaño carta** (8.5" × 11") con márgenes de 0.5 pulgadas. Cuando aparezca el cuadro de diálogo de impresión del navegador:

- Deje el tamaño de papel en **Letter**
- Active **Background graphics** (a veces llamado "Print backgrounds") en la configuración de impresión de su navegador si quiere que los encabezados de sección se impriman con su color
- Se recomienda la orientación vertical (Portrait)

:::info
El directorio respeta los saltos de página: las tarjetas de hogar y los encabezados de sección no se dividirán entre páginas.
:::

## Artículos relacionados {#related-articles}

- [Búsqueda de personas](./searching-people.md): filtre su directorio antes de imprimir
- [Exportación de datos](./exporting-data.md): exporte los datos del directorio como hoja de cálculo
- [Cómo agregar personas](./adding-people.md): agregue o actualice los registros de miembros
