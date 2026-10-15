---
title: "Importar datos"
---

# Importar datos

<div class="article-intro">

La herramienta B1 Transfer facilita traer tus datos existentes a B1, ya sea que empieces desde cero con una hoja de cálculo, migres desde otra plataforma de gestión de iglesias o importes registros de ofrendas. También puedes usarla para exportar o respaldar tus datos en cualquier momento.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesitas una cuenta activa de B1 Admin con acceso a **Settings**.
- Ten tus datos exportados y listos desde tu sistema anterior antes de empezar.
- Esta herramienta está pensada para la migración inicial de datos. Si ya llevas un tiempo usando B1, volver a importar puede crear registros duplicados.

</div>

## Acceder a la herramienta de transferencia

1. Inicia sesión en **B1 Admin**.
2. Abre el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expande **Settings** y haz clic en **Settings**.
3. Haz clic en el enlace **Import/Export** debajo del nombre de tu iglesia, en la parte superior del menú de configuración de la izquierda.
4. Esto abrirá la herramienta **B1 Transfer** en una pestaña nueva, en [transfer.b1.church](https://transfer.b1.church).

La herramienta de transferencia te guía en cuatro pasos: Source (origen), Preview (vista previa), Destination (destino) y Run (ejecución).

---

## Paso 1: elige tu origen

Selecciona de dónde provienen tus datos. Hay siete opciones:

- **B1 Database** — Extrae los datos directamente de tu iglesia en B1. Es útil para hacer una copia de respaldo o convertir tus datos a otro formato. Debes haber iniciado sesión para usar esta opción.
- **B1 Import Zip** — Un archivo zip en el formato propio de B1. Se usa principalmente para restaurar una exportación anterior de B1. Al cargar un B1 Export Zip de vuelta en **B1 Database** se restaura todo lo que contiene la exportación (consulta [Exportar datos](./exporting-data.md#exportación-completa-de-datos-desde-settings)). Si el archivo no se puede leer, la herramienta muestra el error en lugar de empezar de nuevo.
- **Breeze Import Zip** — Un archivo zip que contiene archivos exportados desde Breeze ChMS.
- **Planning Center Zip** — Un archivo zip o CSV exportado desde Planning Center.
- **Custom CSV / Excel** — Cualquier archivo CSV o Excel que contenga datos de personas. Después de subirlo, deberás asignar tus columnas a los campos de B1 antes de continuar con la importación.
- **Tithe.ly CSV** — Un archivo de exportación de personas o de ofrendas de Tithe.ly (se aceptan formatos CSV o Excel).
- **CCB / Pushpay CSV** — Un CSV de exportación de personas o de ofrendas de Church Community Builder o Pushpay.

Puedes arrastrar y soltar tu archivo en el área de carga, o hacer clic para buscarlo.

---

## Paso 1b: asigna tus campos (solo para Custom CSV / Excel)

Si seleccionaste **Custom CSV / Excel**, después de subir tu archivo la herramienta mostrará una pantalla de asignación de campos antes de pasar a la vista previa.

Cada columna de tu archivo aparece junto con un valor de ejemplo. Para cada columna, usa el menú desplegable para elegir el campo de B1 correspondiente. La herramienta detectará automáticamente nombres comunes de columnas como "First Name", "Email" o "Zip Code", pero debes revisar cada fila y corregir cualquier cosa que haya pasado por alto.

Los campos disponibles de B1 incluyen:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name: asigna a la persona a un grupo por su nombre
- **Custom Field (match by name)**: guarda la columna en uno de los [campos personalizados de personas](../settings/custom-fields.md) de tu iglesia. Aparece un cuadro **B1 field name**, completado con el encabezado de la columna. Cámbialo por el nombre del campo exactamente como aparece en B1 (no importa si son mayúsculas o minúsculas).
- **Form Answer (custom field)**: guarda el valor de esa columna como un campo personalizado asociado al registro de la persona. Si usas esta opción, se te pedirá que le pongas un nombre al formulario.

Las fechas pueden estar en formatos comunes como `9/17/1994` y se convierten automáticamente. En los campos personalizados, los campos de Sí/No aceptan valores como Yes, No, Y, N, True, False, 1 y 0, y los campos de opción múltiple aceptan el texto de la opción o su valor.

:::info
Crea tus campos personalizados de personas en B1 Admin antes de importar. Cuando termine la importación, el paso **Custom Fields** muestra los nombres de columna que no coinciden con ningún campo de B1 y cuenta los valores que no encajan con el tipo del campo. Esos valores se omiten y el resto de la importación se completa normalmente.
:::

Las columnas que no quieres importar pueden configurarse como **(Skip)**. Al menos un campo de nombre (First Name o Last Name) debe estar asignado antes de poder continuar.

Haz clic en **Confirm Mapping & Import** para pasar a la vista previa.

---

## Paso 2: revisa tus datos

Después de subir el archivo, la herramienta muestra una vista previa de todo lo que se importará. Usa las pestañas para revisar cada tipo de dato:

- **People** — Organizadas por hogar, con fotos si se incluyeron.
- **Groups** — Organizados por sede, servicio, horario y categoría.
- **Attendance** — Fechas de sesiones, grupos y número de visitas.
- **Donations** — Lotes, fondos, donantes y montos.
- **Forms** — Nombres de formularios y tipos de contenido.

Revisa esto con cuidado antes de continuar. Si algo no parece correcto, haz clic en **Start Over** y corrige tu archivo de origen.

---

## Paso 3: elige tu destino

Selecciona a dónde quieres enviar los datos:

- **B1 Database** — Importa directamente a la base de datos de B1 de tu iglesia. Después de seleccionarla, la herramienta mostrará un conteo final de los registros que se agregarán. Haz clic en **Start Transfer** para confirmar.
- **B1 Export Zip** — Descarga tus datos como un archivo zip en formato B1 que más adelante puede restaurarse con **B1 Import Zip**. Es útil para respaldos.
- **Breeze Export Zip** — Convierte tus datos al formato de Breeze.
- **Planning Center Zip** — Convierte tus datos al formato de Planning Center.

:::warning
El origen y el destino no pueden tener el mismo formato. Si coinciden, la herramienta te advertirá para evitar duplicados accidentales.
:::

---

## Paso 4: ejecución

La herramienta procesa la transferencia y muestra el progreso de cada paso:

- Campuses, Services y Times (sedes, servicios y horarios)
- People (personas)
- Photos (fotos)
- Groups y Group Members (grupos y miembros de grupos)
- Donations (donaciones)
- Attendance (asistencia)
- Forms, Questions, Answers y Form Submissions (formularios, preguntas, respuestas y envíos)
- Custom Fields (campos personalizados, cuando asignaste alguna columna de Custom Field)
- Compressing (comprimiendo; solo para destinos en archivo zip)

Cuando el destino es **B1 Database**, la tarjeta de progreso se titula **Import Progress** y termina con **Import Complete!** (o **Import Completed with Errors**). Para destinos en archivo zip, los mismos mensajes dicen **Export**.

:::warning
No cierres el navegador mientras la transferencia esté en curso. Espera hasta que todos los pasos aparezcan como completados.
:::

---

## Preparar un Breeze Import Zip

1. En Breeze, ve a **Settings** y haz clic en **Export** en la barra lateral izquierda.
2. Exporta tres archivos separados: **People**, **Tags** y **Contributions**.
3. Selecciona los tres archivos, haz clic derecho y comprímelos en un único archivo zip.
   - En un Mac: selecciona los archivos, haz clic derecho y elige **Compress**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Send to** y luego **Compressed (zipped) folder**.
4. Sube el archivo zip usando la opción **Breeze Import Zip** en el Paso 1.

La importación de Breeze transfiere automáticamente las personas, los grupos (tags) y los registros de donaciones.

---

## Preparar una exportación de Planning Center

1. Inicia sesión en Planning Center y abre el producto **People**.
2. En la barra lateral izquierda, haz clic en **Lists** y crea una lista que incluya a todas las personas que quieres traer. (Si ya tienes una lista de toda tu congregación, usa esa).
3. Abre la lista y usa su opción **export** para descargar tus personas como archivo **CSV**. Incluye los campos que quieres conservar: nombre, correo electrónico, teléfono, dirección, fecha de nacimiento, género y estado de membresía se asignan a B1.
4. Si Planning Center te entrega más de un archivo, selecciónalos todos, haz clic derecho y comprímelos en un único archivo zip.
   - En un Mac: selecciona los archivos, haz clic derecho y elige **Compress**.
   - En una PC: selecciona los archivos, haz clic derecho, elige **Send to** y luego **Compressed (zipped) folder**.
5. Sube el CSV o el zip usando la opción **Planning Center Zip** en el Paso 1.

Después de subirlo, continúa a la vista previa y confirma que tus personas y hogares se ven correctos antes de ejecutar la importación.

---

## Preparar una exportación de Tithe.ly

1. En Tithe.ly, exporta tus datos de **People** como archivo CSV o Excel. También puedes exportar un archivo **Giving** aparte si quieres traer registros de donaciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o de ofrendas, según los nombres de las columnas.
3. Sube el archivo usando la opción **Tithe.ly CSV** en el Paso 1.

:::info
Las exportaciones de Tithe.ly se pueden importar de un archivo a la vez. Ejecuta el proceso dos veces si necesitas importar por separado las personas y los registros de ofrendas.
:::

---

## Preparar una exportación de CCB o Pushpay

1. En Church Community Builder o Pushpay, exporta tus datos de **People** como archivo CSV. También puedes exportar un archivo aparte de ofrendas o contribuciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o de ofrendas, según los nombres de las columnas.
3. Sube el archivo usando la opción **CCB / Pushpay CSV** en el Paso 1.

---

## Después de importar

Una vez completada la transferencia, dedica unos minutos a verificar tus datos:

1. Revisa la página de [People](../people/adding-people.md) y verifica algunos perfiles al azar.
2. Confirma que los nombres, correos electrónicos, números de teléfono y direcciones se importaron correctamente.
3. Revisa que las conexiones entre miembros del hogar estén intactas. El rol de cada persona en el hogar (Head, Spouse, Child u Other) se conserva cuando el origen lo incluye: la columna **householdRole** en un B1 Import Zip, **Family Role** en Breeze o Tithe.ly, y **Family Position** en CCB / Pushpay. Roles como "Head of Household", "Primary", "Wife" o "Son" se convierten al rol equivalente de B1. Las importaciones de Planning Center y Custom CSV / Excel no tienen columna de rol, así que esas personas quedan como **Other**; puedes cambiar el rol desde el hogar de la persona en la página de [People](../people/adding-people.md#gestionar-hogares).
4. Revisa los grupos importados y los registros de ofrendas.

Si notas algún problema, puedes editar perfiles individuales desde la página People. También puedes volver a ejecutar la herramienta de transferencia para [exportar tus datos](exporting-data.md) como respaldo.
