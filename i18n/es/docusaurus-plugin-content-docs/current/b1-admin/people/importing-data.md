---
title: "Importar Datos"
---

# Importar Datos

<div class="article-intro">

La herramienta B1 Transfer facilita traer tus datos existentes a B1, ya sea que estés comenzando desde cero con una hoja de cálculo, migrando desde otra plataforma de administración de iglesia o importando registros de donaciones. También se puede usar para exportar o hacer una copia de seguridad de tus datos en cualquier momento.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con acceso a **Configuración**.
- Ten tus datos exportados y listos desde tu sistema anterior antes de comenzar.
- Esta herramienta está destinada a migración de datos inicial. Si ya has estado usando B1 por un tiempo, importar nuevamente puede crear registros duplicados.

</div>

## Accediendo a la Herramienta de Transferencia

1. Inicia sesión en **B1 Admin**.
2. Abre el **menú de sección** en la esquina superior izquierda (el nombre de sección con la pequeña flecha) y elige **Configuración**.
3. Haz clic en el botón **Importar/Exportar** en la esquina superior derecha del encabezado de la página.
4. Esto abrirá la herramienta **B1 Transfer** en una nueva pestaña en [transfer.b1.church](https://transfer.b1.church).

La herramienta de transferencia te guía a través de cuatro pasos: Origen, Vista Previa, Destino y Ejecutar.

---

## Paso 1 - Elige tu Origen

Selecciona de dónde vienen tus datos. Hay siete opciones:

- **Base de Datos B1** -- Extrae datos directamente de tu iglesia B1 existente. Útil para hacer una copia de seguridad o convertir tus datos a otro formato. Debes estar conectado para usar esta opción.
- **B1 Import Zip** -- Un archivo zip en el formato propio de B1. Esto se usa principalmente para restaurar una exportación de B1 anterior.
- **Breeze Import Zip** -- Un archivo zip que contiene archivos exportados de Breeze ChMS.
- **Planning Center Zip** -- Un archivo zip o CSV exportado desde Planning Center.
- **CSV / Excel Personalizado** -- Cualquier archivo CSV o Excel que contenga datos de personas. Después de cargar, asignarás tus columnas a campos B1 antes de que proceda la importación.
- **Tithe.ly CSV** -- Un archivo de exportación de personas o donaciones de Tithe.ly (se acepta formato CSV o Excel).
- **CCB / Pushpay CSV** -- Una persona o CSV de exportación de donaciones de Church Community Builder o Pushpay.

Puedes arrastrar y soltar tu archivo en el área de carga, o hacer clic para buscarlo.

---

## Paso 1b - Asignar tus Campos (Solo CSV / Excel Personalizado)

Si seleccionaste **CSV / Excel Personalizado**, después de cargar tu archivo la herramienta mostrará una pantalla de asignación de campos antes de pasar a la vista previa.

Cada columna de tu archivo se enumera junto con un valor de muestra. Para cada columna, usa el menú desplegable para elegir el campo B1 correspondiente. La herramienta detectará automáticamente nombres de columnas comunes como "Nombre", "Correo" o "Código Postal", pero debes revisar cada fila y corregir cualquier cosa que haya pasado por alto.

Los campos B1 disponibles incluyen:

- Nombre, Apellido, Segundo Nombre, Apodo, Nombre Mostrado, Título/Prefijo, Sufijo
- Correo, Teléfono de Casa, Teléfono Móvil, Teléfono de Trabajo
- Línea de Dirección 1, Línea de Dirección 2, Ciudad, Estado, Código Postal
- Fecha de Nacimiento, Aniversario, Género, Estado Civil, Estado de Membresía
- Nombre de Hogar/Familia
- Nombre de Grupo -- asigna la persona a un grupo por nombre
- **Campo Personalizado (coincidencia por nombre)** -- guarda la columna en uno de los [campos de persona personalizados](../settings/custom-fields.md) de tu iglesia. Aparece un cuadro **Nombre de campo B1**, relleno con el encabezado de columna. Cámbialo al nombre exacto del campo tal como aparece en B1 (las mayúsculas no importan).
- **Respuesta de Formulario (campo personalizado)** -- guarda el valor de esa columna como un campo personalizado adjunto al registro de la persona. Si usas esta opción, se te pedirá que des un nombre al formulario.

Las fechas pueden estar en formatos comunes como `9/17/1994` y se convierten automáticamente. Para campos personalizados, los campos Sí/No aceptan valores como Sí, No, S, N, Verdadero, Falso, 1 y 0, y los campos de opción múltiple aceptan el texto de opción o su valor.

:::info
Crea tus campos de persona personalizados en B1 Admin antes de importar. Cuando la importación finaliza, el paso **Campos Personalizados** enumera cualquier nombre de columna que no coincida con un campo B1 y cuenta cualquier valor que no se ajuste al tipo del campo. Esos valores se omiten y el resto de la importación se completa.
:::

Las columnas que no deseas importar se pueden configurar como **(Saltar)**. Al menos un campo de nombre (Nombre o Apellido) debe asignarse antes de que puedas continuar.

Haz clic en **Confirmar Asignación e Importar** para proceder a la vista previa.

---

## Paso 2 - Vista Previa de tus Datos

Después de cargar, la herramienta muestra una vista previa de todo lo que se importará. Usa las pestañas para revisar cada tipo de dato:

- **Personas** -- Enumeras por hogar, con fotos si se incluyen.
- **Grupos** -- Organizados por campus, servicio, hora y categoría.
- **Asistencia** -- Fechas de sesión, grupos y conteos de visitas.
- **Donaciones** -- Lotes, fondos, donantes y montos.
- **Formularios** -- Nombres de formularios y tipos de contenido.

Revisa esto cuidadosamente antes de proceder. Si algo se ve mal, haz clic en **Empezar de Nuevo** y corrige tu archivo de origen.

---

## Paso 3 - Elige tu Destino

Selecciona dónde deseas que vayan los datos:

- **Base de Datos B1** -- Importa directamente a la base de datos B1 de tu iglesia. Después de seleccionar esto, la herramienta mostrará un conteo final de registros a agregar. Haz clic en **Iniciar Transferencia** para confirmar.
- **B1 Export Zip** -- Descarga tus datos como un archivo zip en formato B1. Bueno para copias de seguridad.
- **Breeze Export Zip** -- Convierte tus datos a formato Breeze.
- **Planning Center Zip** -- Convierte tus datos a formato Planning Center.

:::warning
El origen y el destino no pueden ser el mismo formato. Si coinciden, la herramienta te advertirá para prevenir duplicación accidental.
:::

---

## Paso 4 - Ejecutar

La herramienta procesa la transferencia y muestra el progreso para cada paso:

- Campus, Servicios y Horas
- Personas
- Fotos
- Grupos y Miembros de Grupo
- Donaciones
- Asistencia
- Formularios, Preguntas, Respuestas y Envíos de Formularios
- Campos Personalizados (cuando asignaste alguna columna de Campo Personalizado)
- Comprimiendo (solo para destinos de archivo zip)

:::warning
No cierres tu navegador mientras la transferencia se ejecuta. Espera hasta que todos los pasos aparezcan como completados.
:::

---

## Preparando un Breeze Import Zip

1. En Breeze, ve a **Configuración** y haz clic en **Exportar** en la barra lateral izquierda.
2. Exporta tres archivos separados: **Personas**, **Etiquetas** y **Contribuciones**.
3. Selecciona los tres archivos, haz clic derecho y comprime en un archivo zip único.
   - En una Mac: selecciona los archivos, haz clic derecho y elige **Comprimir**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Enviar a**, luego **Carpeta comprimida (zipeada)**.
4. Carga el archivo zip usando la opción **Breeze Import Zip** en el Paso 1.

La importación de Breeze transfiere personas, grupos (etiquetas) y registros de donación automáticamente.

---

## Preparando una Exportación de Planning Center

1. Inicia sesión en Planning Center y abre el producto **Personas**.
2. En la barra lateral izquierda, haz clic en **Listas** y crea una lista que incluya a todos los que deseas traer. (Si ya tienes una lista de toda tu congregación, usa esa.)
3. Abre la lista y usa su opción **exportar** para descargar tus personas como un archivo **CSV**. Incluye los campos que deseas mantener: nombre, correo, teléfono, dirección, fecha de nacimiento, género y estado de membresía se asignan todos a B1.
4. Si Planning Center te da más de un archivo, selecciona todos, haz clic derecho y comprime en un zip único.
   - En una Mac: selecciona los archivos, haz clic derecho y elige **Comprimir**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Enviar a**, luego **Carpeta comprimida (zipeada)**.
5. Carga el CSV o zip usando la opción **Planning Center Zip** en el Paso 1.

Después de cargar, continúa a la vista previa y confirma que tus personas y hogares se ven bien antes de ejecutar la importación.

---

## Preparando una Exportación de Tithe.ly

1. En Tithe.ly, exporta tus datos de **Personas** como un archivo CSV o Excel. También puedes exportar un archivo **Donaciones** separado si deseas traer registros de donación.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o donaciones basado en los nombres de columnas.
3. Carga el archivo usando la opción **Tithe.ly CSV** en el Paso 1.

:::info
Las exportaciones de Tithe.ly se pueden importar un archivo a la vez. Ejecuta el proceso dos veces si necesitas importar registros de personas y donaciones por separado.
:::

---

## Preparando una Exportación de CCB o Pushpay

1. En Church Community Builder o Pushpay, exporta tus datos de **Personas** como un archivo CSV. También puedes exportar un archivo de donaciones/contribuciones separado.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o donaciones basado en los nombres de columnas.
3. Carga el archivo usando la opción **CCB / Pushpay CSV** en el Paso 1.

---

## Después de Importar

Una vez que la transferencia se completa, dedica unos minutos a verificar tus datos:

1. Navega por la página [Personas](../people/adding-people.md) y verifica un par de perfiles.
2. Confirma que nombres, correos, números de teléfono y direcciones llegaron correctamente.
3. Verifica que las conexiones de hogares estén intactas.
4. Revisa cualquier grupo importado y registros de donaciones.

Si notas problemas, puedes editar perfiles individuales desde la página Personas. También puedes ejecutar la herramienta de transferencia nuevamente para [exportar tus datos](exporting-data.md) como copia de seguridad.
