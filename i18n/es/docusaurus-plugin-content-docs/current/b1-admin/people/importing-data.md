---
title: "Importar datos"
---

# Importar datos

<div class="article-intro">

La herramienta B1 Transfer facilita traer sus datos existentes a B1, ya sea que empiece desde cero con una hoja de cálculo, que migre desde otra plataforma de gestión de iglesias o que importe registros de donaciones. También puede usarse para exportar o respaldar sus datos en cualquier momento.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Necesita una cuenta activa de B1 Admin con acceso a **Settings**.
- Tenga sus datos exportados y listos desde su sistema anterior antes de comenzar.
- Esta herramienta está pensada para la migración inicial de datos. Si ya lleva un tiempo usando B1, volver a importar podría crear registros duplicados.

</div>

## Acceder a la herramienta de transferencia

1. Inicie sesión en **B1 Admin**.
2. Abra el [menú Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra de búsqueda en la parte superior izquierda), expanda **Settings** y haga clic en **Settings**.
3. Haga clic en el enlace **Import/Export** debajo del nombre de su iglesia, en la parte superior del menú de configuración de la izquierda.
4. Esto abrirá la herramienta **B1 Transfer** en una nueva pestaña, en [transfer.b1.church](https://transfer.b1.church).

La herramienta de transferencia le guía a través de cuatro pasos: Source, Preview, Destination y Run.

---

## Paso 1 - Elegir el origen

Seleccione de dónde provienen sus datos. Hay siete opciones:

- **B1 Database** — Extrae los datos directamente de su iglesia en B1. Es útil para hacer una copia de seguridad o convertir sus datos a otro formato. Debe haber iniciado sesión para usar esta opción.
- **B1 Import Zip** — Un archivo zip en el formato propio de B1. Se usa principalmente para restaurar una exportación anterior de B1.
- **Breeze Import Zip** — Un archivo zip que contiene archivos exportados de Breeze ChMS.
- **Planning Center Zip** — Un archivo zip o CSV exportado desde Planning Center.
- **Custom CSV / Excel** — Cualquier archivo CSV o Excel que contenga datos de personas. Después de subirlo, deberá asignar sus columnas a los campos de B1 antes de continuar con la importación.
- **Tithe.ly CSV** — Un archivo de exportación de personas o de donaciones de Tithe.ly (se aceptan formatos CSV o Excel).
- **CCB / Pushpay CSV** — Un CSV de exportación de personas o de donaciones de Church Community Builder o Pushpay.

Puede arrastrar y soltar su archivo en el área de carga, o hacer clic para buscarlo.

---

## Paso 1b - Asignar los campos (solo para Custom CSV / Excel)

Si seleccionó **Custom CSV / Excel**, después de subir su archivo, la herramienta mostrará una pantalla de asignación de campos antes de pasar a la vista previa.

Cada columna de su archivo aparece junto a un valor de ejemplo. Para cada columna, use el menú desplegable para elegir el campo de B1 correspondiente. La herramienta detecta automáticamente nombres de columna comunes como "First Name", "Email" o "Zip Code", pero debe revisar cada fila y corregir cualquier error que haya pasado por alto.

Los campos disponibles de B1 incluyen:

- First Name, Last Name, Middle Name, Nickname, Display Name, Title/Prefix, Suffix
- Email, Home Phone, Mobile Phone, Work Phone
- Address Line 1, Address Line 2, City, State, Zip Code
- Birth Date, Anniversary, Gender, Marital Status, Membership Status
- Household/Family Name
- Group Name — asigna la persona a un grupo por su nombre
- **Custom Field (match by name)** — guarda la columna en uno de los [campos personalizados de personas](../settings/custom-fields.md) de su iglesia. Aparece un cuadro **B1 field name**, con el encabezado de la columna ya escrito. Cámbielo por el nombre exacto del campo tal como aparece en B1 (no importa si son mayúsculas o minúsculas).
- **Form Answer (custom field)** — guarda el valor de esa columna como un campo personalizado asociado al registro de la persona. Si usa esta opción, se le pedirá que asigne un nombre al formulario.

Las fechas pueden estar en formatos comunes como `9/17/1994` y se convierten automáticamente. En los campos personalizados, los campos de Sí/No aceptan valores como Yes, No, Y, N, True, False, 1 y 0, y los campos de opción múltiple aceptan el texto de la opción o su valor.

:::info
Cree sus campos personalizados de personas en B1 Admin antes de importar. Cuando termine la importación, el paso **Custom Fields** muestra los nombres de columna que no coinciden con ningún campo de B1 y cuenta los valores que no encajan en el tipo del campo. Esos valores se omiten, y el resto de la importación se completa igualmente.
:::

Las columnas que no desea importar pueden configurarse como **(Skip)**. Debe asignar al menos un campo de nombre (First Name o Last Name) antes de poder continuar.

Haga clic en **Confirm Mapping & Import** para pasar a la vista previa.

---

## Paso 2 - Revisar los datos

Después de subir el archivo, la herramienta muestra una vista previa de todo lo que se importará. Use las pestañas para revisar cada tipo de dato:

- **People** — Listadas por hogar, con fotos si se incluyeron.
- **Groups** — Organizados por campus, servicio, horario y categoría.
- **Attendance** — Fechas de sesiones, grupos y número de visitas.
- **Donations** — Lotes, fondos, donantes e importes.
- **Forms** — Nombres de formularios y tipos de contenido.

Revise esto con atención antes de continuar. Si algo no parece correcto, haga clic en **Start Over** y corrija su archivo de origen.

---

## Paso 3 - Elegir el destino

Seleccione a dónde desea enviar los datos:

- **B1 Database** — Importa directamente a la base de datos de su iglesia en B1. Después de seleccionar esta opción, la herramienta mostrará el número final de registros que se agregarán. Haga clic en **Start Transfer** para confirmar.
- **B1 Export Zip** — Descarga sus datos como un archivo zip en formato B1. Es ideal para copias de seguridad.
- **Breeze Export Zip** — Convierte sus datos al formato de Breeze.
- **Planning Center Zip** — Convierte sus datos al formato de Planning Center.

:::warning
El origen y el destino no pueden ser el mismo formato. Si coinciden, la herramienta le advertirá para evitar duplicaciones accidentales.
:::

---

## Paso 4 - Ejecutar

La herramienta procesa la transferencia y muestra el progreso de cada paso:

- Campuses, Services y Times
- People
- Photos
- Groups y Group Members
- Donations
- Attendance
- Forms, Questions, Answers y Form Submissions
- Custom Fields (cuando asignó columnas de Custom Field)
- Compressing (solo para destinos de archivo zip)

Cuando el destino es **B1 Database**, la tarjeta de progreso se titula **Import Progress** y termina con **Import Complete!** (o **Import Completed with Errors**). En los destinos de archivo zip, los mismos mensajes dicen **Export**.

:::warning
No cierre su navegador mientras la transferencia esté en curso. Espere hasta que todos los pasos aparezcan como completados.
:::

---

## Preparar un archivo zip de importación de Breeze

1. En Breeze, vaya a **Settings** y haga clic en **Export** en la barra lateral izquierda.
2. Exporte tres archivos por separado: **People**, **Tags** y **Contributions**.
3. Seleccione los tres archivos, haga clic derecho y comprímalos en un solo archivo zip.
   - En un Mac: seleccione los archivos, haga clic derecho y elija **Compress**.
   - En una PC: seleccione los archivos, haga clic derecho, elija **Send to** y luego **Compressed (zipped) folder**.
4. Suba el archivo zip con la opción **Breeze Import Zip** del Paso 1.

La importación de Breeze transfiere automáticamente personas, grupos (tags) y registros de donaciones.

---

## Preparar una exportación de Planning Center

1. Inicie sesión en Planning Center y abra el producto **People**.
2. En la barra lateral izquierda, haga clic en **Lists** y cree una lista que incluya a todas las personas que desea traer. (Si ya tiene una lista de toda su congregación, use esa.)
3. Abra la lista y use su opción **export** para descargar sus personas como archivo **CSV**. Incluya los campos que desea conservar: nombre, correo electrónico, teléfono, dirección, fecha de nacimiento, género y estado de membresía se transfieren a B1.
4. Si Planning Center le entrega más de un archivo, selecciónelos todos, haga clic derecho y comprímalos en un solo zip.
   - En un Mac: seleccione los archivos, haga clic derecho y elija **Compress**.
   - En una PC: seleccione los archivos, haga clic derecho, elija **Send to** y luego **Compressed (zipped) folder**.
5. Suba el CSV o el zip con la opción **Planning Center Zip** del Paso 1.

Después de subirlo, continúe a la vista previa y confirme que sus personas y hogares se ven bien antes de ejecutar la importación.

---

## Preparar una exportación de Tithe.ly

1. En Tithe.ly, exporte sus datos de **People** como archivo CSV o Excel. También puede exportar un archivo de **Giving** aparte si desea traer registros de donaciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o de donaciones, según los nombres de las columnas.
3. Suba el archivo con la opción **Tithe.ly CSV** del Paso 1.

:::info
Las exportaciones de Tithe.ly se importan de a un archivo por vez. Ejecute el proceso dos veces si necesita importar personas y donaciones por separado.
:::

---

## Preparar una exportación de CCB o Pushpay

1. En Church Community Builder o Pushpay, exporte sus datos de **People** como archivo CSV. También puede exportar un archivo aparte de donaciones o contribuciones.
2. La herramienta detectará automáticamente si el archivo contiene datos de personas o de donaciones, según los nombres de las columnas.
3. Suba el archivo con la opción **CCB / Pushpay CSV** del Paso 1.

---

## Después de importar

Una vez completada la transferencia, dedique unos minutos a verificar sus datos:

1. Revise la página de [People](../people/adding-people.md) y compruebe algunos perfiles al azar.
2. Confirme que los nombres, correos electrónicos, números de teléfono y direcciones se importaron correctamente.
3. Verifique que las conexiones de los hogares sigan intactas. El rol de hogar de cada persona (Head, Spouse, Child u Other) se conserva cuando el origen lo incluye: la columna **householdRole** en un B1 Import Zip, **Family Role** en Breeze o Tithe.ly, y **Family Position** en CCB / Pushpay. Roles como "Head of Household", "Primary", "Wife" o "Son" se convierten al rol equivalente de B1. Las importaciones de Planning Center y de Custom CSV / Excel no tienen columna de rol, por lo que esas personas se asignan a **Other**; puede cambiar el rol desde el hogar de la persona en la página de [People](../people/adding-people.md#managing-households).
4. Revise los grupos y los registros de donaciones importados.

Si nota algún problema, puede editar perfiles individuales desde la página People. También puede volver a ejecutar la herramienta de transferencia para [exportar sus datos](exporting-data.md) como copia de seguridad.
