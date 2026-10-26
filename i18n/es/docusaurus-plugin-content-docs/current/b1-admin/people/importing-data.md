---
title: "Importar datos"
---

# Importar datos

<div class="article-intro">

La herramienta B1 Transfer facilita traer tus datos existentes a B1, ya sea que empieces desde cero con una hoja de cálculo, migres desde otra plataforma de administración de iglesias o importes registros de donaciones. También puede usarse para exportar o respaldar tus datos en cualquier momento.

</div>

## Video de capacitación

<YouTube id="G-VnhzACYIU" title="Importing Your People Database in B1" next="Searching People and Building Lists in B1" nextUrl="/docs/b1-admin/people/searching-people" />

<div class="prereqs">
<h4>Antes de empezar</h4>

- Necesitas una cuenta activa de B1 Admin con acceso a **Configuración**.
- Ten tus datos exportados y listos desde tu sistema anterior antes de empezar.
- Esta herramienta está pensada para la migración inicial de datos. Si ya llevas un tiempo usando B1, volver a importar podría crear registros duplicados.

</div>

## Acceder a la herramienta de transferencia

1. Inicia sesión en **B1 Admin**.
2. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Configuración** y haz clic en **Configuración**.
3. Haz clic en el enlace **Importar/Exportar** debajo del nombre de tu iglesia, en la parte superior del menú de configuración de la izquierda.
4. Esto abrirá la herramienta **B1 Transfer** en una nueva pestaña, en [transfer.b1.church](https://transfer.b1.church).

La herramienta de transferencia te guía por cuatro pasos: Origen, Vista previa, Destino y Ejecutar.

---

## Paso 1: Elige tu origen

Selecciona de dónde vienen tus datos. Hay siete opciones:

- **Base de datos de B1**: obtiene datos directamente de tu iglesia en B1. Es útil para hacer una copia de seguridad o convertir tus datos a otro formato. Debes haber iniciado sesión para usar esta opción.
- **Archivo ZIP de importación de B1**: un archivo zip en el formato propio de B1. Se usa principalmente para restaurar una exportación anterior de B1. Cargar un archivo ZIP de exportación de B1 en la **Base de datos de B1** restaura todo lo que contiene la exportación (consulta [Exportar datos](./exporting-data.md#full-data-export-from-settings)). Si el archivo no se puede leer, la herramienta muestra el error en lugar de empezar de nuevo.
- **Archivo ZIP de importación de Breeze**: un archivo zip que contiene archivos exportados desde Breeze ChMS.
- **Archivo ZIP de Planning Center**: un archivo zip o CSV exportado desde Planning Center.
- **CSV / Excel personalizado**: cualquier archivo CSV o Excel que contenga datos de personas. Después de cargarlo, asignarás tus columnas a los campos de B1 antes de continuar con la importación.
- **CSV de Tithe.ly**: un archivo de exportación de personas o de ofrendas de Tithe.ly (se aceptan formatos CSV o Excel).
- **CSV de CCB / Pushpay**: una exportación CSV de personas o de ofrendas de Church Community Builder o Pushpay.

Puedes arrastrar y soltar tu archivo en el área de carga, o hacer clic para buscarlo.

---

## Paso 1b: Asigna tus campos (solo CSV / Excel personalizado)

Si seleccionaste **CSV / Excel personalizado**, después de cargar tu archivo la herramienta mostrará una pantalla de asignación de campos antes de pasar a la vista previa.

Cada columna de tu archivo aparece junto con un valor de muestra. Para cada columna, usa el menú desplegable para elegir el campo de B1 correspondiente. La herramienta detecta automáticamente nombres de columna comunes como "First Name", "Email" o "Zip Code", pero debes revisar cada fila y corregir lo que no haya identificado.

Los campos disponibles de B1 incluyen:

- Nombre, Apellidos, Segundo nombre, Apodo, Nombre para mostrar, Título/Prefijo, Sufijo
- Correo electrónico, Teléfono de casa, Teléfono móvil, Teléfono del trabajo
- Dirección línea 1, Dirección línea 2, Ciudad, Estado, Código postal
- Fecha de nacimiento, Aniversario, Género, Estado civil, Estado de membresía
- Nombre del hogar o de la familia
- Nombre del grupo: asigna a la persona a un grupo por nombre
- **Campo personalizado (coincidir por nombre)**: guarda la columna en uno de tus [campos personalizados de personas](../settings/custom-fields.md) de la iglesia. Aparece un cuadro de **Nombre del campo de B1**, con el encabezado de la columna ya escrito. Cámbialo por el nombre del campo exactamente como aparece en B1 (no importan las mayúsculas).
- **Respuesta de formulario (campo personalizado)**: guarda el valor de esa columna como un campo personalizado asociado al registro de la persona. Si usas esta opción, se te pedirá que le pongas un nombre al formulario.

Las fechas pueden estar en formatos comunes como `9/17/1994` y se convierten automáticamente. Para los campos personalizados, los campos de Sí/No aceptan valores como Yes, No, Y, N, True, False, 1 y 0, y los campos de opción múltiple aceptan el texto de la opción o su valor.

:::info
Crea tus campos personalizados de personas en B1 Admin antes de importar. Cuando termine la importación, el paso **Campos personalizados** enumera los nombres de columna que no coinciden con ningún campo de B1 y cuenta los valores que no se ajustan al tipo del campo. Esos valores se omiten, y el resto de la importación se completa normalmente.
:::

Las columnas que no quieras importar pueden configurarse como **(Omitir)**. Al menos un campo de nombre (Nombre o Apellidos) debe estar asignado antes de continuar.

Haz clic en **Confirmar asignación e importar** para pasar a la vista previa.

---

## Paso 2: Vista previa de tus datos

Después de cargar el archivo, la herramienta muestra una vista previa de todo lo que se importará. Usa las pestañas para revisar cada tipo de dato:

- **Personas**: agrupadas por hogar, con fotos si se incluyeron.
- **Grupos**: organizados por campus, servicio, horario y categoría.
- **Asistencia**: fechas de sesión, grupos y número de visitas.
- **Donaciones**: lotes, fondos, donantes y montos.
- **Formularios**: nombres de formularios y tipos de contenido.

Revisa esto con cuidado antes de continuar. Si algo no se ve bien, haz clic en **Empezar de nuevo** y corrige tu archivo de origen.

---

## Paso 3: Elige tu destino

Selecciona a dónde quieres que vayan los datos:

- **Base de datos de B1**: importa directamente a la base de datos de B1 de tu iglesia. Después de seleccionar esta opción, la herramienta mostrará el conteo final de registros que se agregarán. Haz clic en **Iniciar transferencia** para confirmar.
- **Archivo ZIP de exportación de B1**: descarga tus datos como un archivo zip en formato B1 que más adelante puedes restaurar con **Archivo ZIP de importación de B1**. Es útil para copias de seguridad.
- **Exportación ZIP de Breeze**: convierte tus datos al formato de Breeze.
- **Exportación ZIP de Planning Center**: convierte tus datos al formato de Planning Center.

:::warning
El origen y el destino no pueden ser el mismo formato. Si coinciden, la herramienta te advertirá para evitar duplicar los datos por error.
:::

---

## Paso 4: Ejecutar

La herramienta procesa la transferencia y muestra el progreso de cada paso:

- Campus, servicios y horarios
- Personas
- Fotos
- Grupos y miembros de grupos
- Donaciones
- Asistencia
- Formularios, preguntas, respuestas y envíos de formularios
- Campos personalizados (cuando asignaste columnas de Campo personalizado)
- Compresión (solo para destinos de archivo zip)

Cuando el destino es **Base de datos de B1**, la tarjeta de progreso se titula **Progreso de importación** y termina con **¡Importación completada!** (o **La importación se completó con errores**). Para destinos de archivo zip, los mismos mensajes dicen **Exportación**.

:::info
Al restaurar un **Archivo ZIP de importación de B1**, los registros que apuntan a algo que ya no está en el archivo se omiten en lugar de detener la importación: membresías de grupo de personas o grupos que no están en el zip, asistencia de grupos o personas eliminados, y vínculos entre grupos y horarios de servicio eliminados. Las sesiones de asistencia que nunca estuvieron asociadas a un horario de servicio sí se restauran. Del mismo modo, al exportar, una foto que no se puede descargar o leer se omite para que el paso de **Fotos** continúe.
:::

:::warning
No cierres tu navegador mientras la transferencia está en curso. Espera hasta que todos los pasos aparezcan como completados.
:::

---

## Preparar un archivo ZIP de importación de Breeze

1. En Breeze, ve a **Settings** (Configuración) y haz clic en **Export** (Exportar) en la barra lateral izquierda.
2. Exporta tres archivos separados: **People** (Personas), **Tags** (Etiquetas) y **Contributions** (Contribuciones).
3. Selecciona los tres archivos, haz clic derecho y compímelos en un único archivo zip.
   - En una Mac: selecciona los archivos, haz clic derecho y elige **Comprimir**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Enviar a** y luego **Carpeta comprimida (en zip)**.
4. Sube el archivo zip usando la opción **Archivo ZIP de importación de Breeze** del Paso 1.

La importación de Breeze transfiere automáticamente a las personas, los grupos (etiquetas) y los registros de donaciones.

---

## Preparar una exportación de Planning Center

1. Inicia sesión en Planning Center y abre el producto **People** (Personas).
2. En la barra lateral izquierda, haz clic en **Lists** (Listas) y crea una lista que incluya a todas las personas que quieras traer. (Si ya tienes una lista de toda tu congregación, usa esa).
3. Abre la lista y usa su opción de **export** (exportar) para descargar tus personas como archivo **CSV**. Incluye los campos que quieras conservar: nombre, correo electrónico, teléfono, dirección, fecha de nacimiento, género y estado de membresía se asignan todos a B1.
4. Si Planning Center te entrega más de un archivo, selecciónalos todos, haz clic derecho y compímelos en un único zip.
   - En una Mac: selecciona los archivos, haz clic derecho y elige **Comprimir**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Enviar a** y luego **Carpeta comprimida (en zip)**.
5. Sube el CSV o el zip usando la opción **Archivo ZIP de Planning Center** del Paso 1.

Después de cargarlo, continúa a la vista previa y confirma que tus personas y hogares se ven bien antes de ejecutar la importación.

---

## Preparar una exportación de Tithe.ly

1. En Tithe.ly, exporta tus datos de **People** (Personas) como archivo CSV o Excel. También puedes exportar un archivo aparte de **Giving** (Ofrendas) si quieres traer registros de donaciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o de ofrendas según los nombres de las columnas.
3. Sube el archivo usando la opción **CSV de Tithe.ly** del Paso 1.

:::info
Las exportaciones de Tithe.ly se importan de a un archivo a la vez. Ejecuta el proceso dos veces si necesitas importar por separado a las personas y los registros de ofrendas.
:::

---

## Preparar una exportación de CCB o Pushpay

1. En Church Community Builder o Pushpay, exporta tus datos de **People** (Personas) como archivo CSV. También puedes exportar un archivo aparte de ofrendas o contribuciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o de ofrendas según los nombres de las columnas.
3. Sube el archivo usando la opción **CSV de CCB / Pushpay** del Paso 1.

---

## Después de importar

Una vez completada la transferencia, tómate unos minutos para verificar tus datos:

1. Revisa la página de [Personas](../people/adding-people.md) y verifica algunos perfiles al azar.
2. Confirma que los nombres, correos electrónicos, números de teléfono y direcciones se importaron correctamente.
3. Verifica que las conexiones de los hogares sigan intactas. El rol de cada persona en el hogar (Jefe de familia, Cónyuge, Hijo u Otro) se conserva cuando el origen lo tiene: la columna **householdRole** en un Archivo ZIP de importación de B1, **Family Role** en Breeze o Tithe.ly, y **Family Position** en CCB / Pushpay. Roles como "Head of Household", "Primary", "Wife" o "Son" se convierten al rol de B1 correspondiente. Las importaciones de Planning Center y de CSV / Excel personalizado no tienen columna de rol, así que esas personas se asignan a **Otro**; puedes cambiar el rol desde el hogar de la persona en la página de [Personas](../people/adding-people.md#managing-households).
4. Revisa los grupos y los registros de ofrendas importados.

Si notas problemas, puedes editar perfiles individuales desde la página de Personas. También puedes volver a ejecutar la herramienta de transferencia para [exportar tus datos](exporting-data.md) como respaldo.
