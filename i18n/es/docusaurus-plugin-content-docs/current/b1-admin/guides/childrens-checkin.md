---
title: "Guía: Configurar el registro de entrada del ministerio infantil"
---

# Configurar el registro de entrada del ministerio infantil

<div class="article-intro">

Esta guía le acompaña en todo lo necesario para tener un sistema de registro de entrada infantil funcionando en su iglesia: desde ingresar familias a la base de datos, hasta configurar grupos según la edad e imprimir gafetes el domingo por la mañana. Al final, los padres podrán registrar a sus hijos en un quiosco con tableta y recibir una etiqueta de seguridad que coincida.

</div>

## Video de capacitación

<YouTube id="Ep9CBUcJwPI" title="Setting Up Children's Check-In in B1" next="Recording and Tracking Attendance in B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cree su cuenta de iglesia en [admin.b1.church](https://admin.b1.church)
- Asegúrese de tener acceso de administrador: consulte [Roles y permisos](../people/roles-permissions.md) si lo necesita
- Opcional: prepare un archivo CSV de familias si está migrando desde otro sistema

</div>

## Paso 1: Agregar familias a su base de datos

Antes de que el registro de entrada pueda funcionar, el sistema necesita conocer a sus familias. Cada niño debe estar vinculado a un padre mediante la función de hogar.

Siga la guía de [Agregar personas](../people/adding-people.md) para agregar al menos una familia. Asegúrese de:

- Agregar primero al padre o los padres
- Agregar a cada hijo
- Vincularlos en el mismo hogar usando el [editor de hogares](../people/adding-people.md#managing-households)

:::tip
Si tiene más de unas cuantas familias para agregar, use la herramienta de [importación CSV](../people/importing-data.md) en lugar de agregarlas una por una. Puede importar todo su directorio en minutos.
:::

## Paso 2: Crear grupos infantiles

Los grupos definen las clases a las que se registran los niños. Normalmente querrá un grupo por rango de edad.

Siga la guía de [Crear grupos](../groups/creating-groups.md) para crear grupos como:

- **Cuna** (de 0 a 2 años)
- **Preescolar** (de 3 a 5 años)
- **Primaria** (de 6 a 10 años)

Puede ajustar los nombres y los rangos de edad para que coincidan con la estructura de su ministerio.

## Paso 3: Configurar campus y servicios

El registro de entrada está vinculado a horarios de servicio específicos. Necesita al menos un campus y un servicio configurados.

Siga la guía de [Configuración de asistencia](../attendance/setup.md) para:

1. Agregar su campus (por ejemplo, "Campus principal")
2. Agregar un servicio (por ejemplo, "Mañana del domingo")
3. Configurar el horario de servicio (por ejemplo, "9:00 a. m.") y, opcionalmente, un [horario de registro](../attendance/setup.md#setting-a-check-in-schedule) para que el registro se abra automáticamente antes de cada servicio y se cierre después
4. Asignar los grupos infantiles al servicio

## Paso 4: Configurar la aplicación de registro

Ahora conecte todo instalando la aplicación de registro en una tableta.

1. Instale la **aplicación B1 Checkin**: consulte el artículo [Registro de entrada](../attendance/check-in.md) para los enlaces de descarga
2. Inicie sesión con sus credenciales de B1 Admin
3. Seleccione su campus y horario de servicio

Consulte el artículo completo de [Registro de entrada](../attendance/check-in.md) para los pasos detallados de configuración.

## Paso 5: Conseguir su hardware

Necesita una tableta para el quiosco y, opcionalmente, una impresora de etiquetas Brother para los gafetes.

Como mínimo:

- **Una tableta Android o Amazon Fire**: consulte [tabletas recomendadas](../attendance/check-in.md#recommended-hardware)
- **Una impresora de etiquetas Brother**: la QL-1110NWB es recomendable por su compatibilidad con Bluetooth y WiFi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Las impresoras de otras marcas no funcionarán.
:::

## Paso 6: Realizar una prueba de registro

Antes del domingo por la mañana, haga una prueba:

1. Abra la aplicación B1 Checkin en su tableta
2. Seleccione su campus y el horario de servicio correcto
3. Busque a una de las familias que agregó
4. Registre la entrada de un niño y verifique:
   - La asistencia aparece en B1 Admin en **Asistencia**
   - Si usa una impresora, un gafete se imprime correctamente

:::tip
Capacite a sus voluntarios de bienvenida sobre el proceso de registro antes de comenzar. Normalmente basta con un recorrido rápido de 5 minutos.
:::

## ¡Listo!

El registro de entrada de su ministerio infantil está listo. Los padres pueden buscar a su familia, seleccionar a sus hijos y registrarlos en el quiosco. La asistencia se registra automáticamente en B1 Admin.

## Artículos relacionados

- [Agregar personas](../people/adding-people.md): agregue más familias conforme vayan visitando
- [Crear grupos](../groups/creating-groups.md): administre los grupos de sus niños
- [Configuración de asistencia](../attendance/setup.md): configure campus y servicios
- [Registro de entrada](../attendance/check-in.md): configuración detallada de la aplicación de registro y del hardware
- [Seguimiento de asistencia](../attendance/tracking-attendance.md): vea los informes de registro
