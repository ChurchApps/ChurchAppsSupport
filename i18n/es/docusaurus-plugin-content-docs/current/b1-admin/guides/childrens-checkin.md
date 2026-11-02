---
title: "Guía: configurar el registro de entrada del ministerio infantil"
---

# Configurar el registro de entrada del ministerio infantil

<div class="article-intro">

Esta guía le explica todo lo necesario para poner en marcha un sistema de registro de entrada infantil en su iglesia: desde ingresar a las familias en la base de datos, hasta configurar grupos según la edad y imprimir gafetes el domingo por la mañana. Al final, los padres podrán registrar a sus hijos en un quiosco de tableta y recibir una etiqueta de seguridad que coincida.

</div>

## Video de capacitación

<YouTube id="Ep9CBUcJwPI" title="Configuración del registro de entrada infantil en B1" next="Registro y seguimiento de asistencia en B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cree la cuenta de su iglesia en [admin.b1.church](https://admin.b1.church)
- Asegúrese de tener acceso de administrador; consulte [Roles y permisos](../people/roles-permissions.md) si lo necesita
- Opcional: prepare un archivo CSV con las familias si está migrando desde otro sistema

</div>

## Paso 1: agregar familias a su base de datos

Antes de que el registro de entrada pueda funcionar, el sistema necesita conocer a sus familias. Cada niño debe estar vinculado a un padre o madre mediante la función de hogar.

Siga la guía de [Agregar personas](../people/adding-people.md) para agregar al menos una familia. Asegúrese de:

- Agregar primero a los padres
- Agregar a cada hijo
- Vincularlos en el mismo hogar usando el [editor de hogares](../people/adding-people.md#managing-households)

:::tip
Si tiene más de unas cuantas familias por agregar, use la herramienta de [importación CSV](../people/importing-data.md) en lugar de agregarlas una por una. Puede importar todo su directorio en minutos.
:::

## Paso 2: crear grupos infantiles

Los grupos definen las clases a las que se registran los niños. Normalmente conviene tener un grupo por rango de edad.

Siga la guía de [Creación de grupos](../groups/creating-groups.md) para crear grupos como:

- **Cuna** (de 0 a 2 años)
- **Preescolar** (de 3 a 5 años)
- **Primaria** (de 6 a 10 años)

Puede ajustar los nombres y los rangos de edad para que coincidan con la estructura de su ministerio.

## Paso 3: configurar campus y servicios

El registro de entrada está vinculado a horarios de servicio específicos. Necesita tener configurados al menos un campus y un servicio.

Siga la guía de [Configuración de asistencia](../attendance/setup.md) para:

1. Agregar su campus (por ejemplo, "Campus principal")
2. Agregar un servicio (por ejemplo, "Domingo por la mañana")
3. Establecer el horario del servicio (por ejemplo, "9:00 a. m.") y, opcionalmente, un [horario de registro](../attendance/setup.md#setting-a-check-in-schedule) para que el registro se abra automáticamente antes de cada servicio y se cierre después de él
4. Asignar los grupos infantiles al servicio

## Paso 4: configurar la aplicación de registro de entrada

Ahora conecte todo instalando la aplicación de registro de entrada en una tableta.

1. Instale la **aplicación B1 Checkin**; consulte el artículo de [Registro de entrada](../attendance/check-in.md) para los enlaces de descarga
2. Inicie sesión con sus credenciales de B1 Admin
3. Seleccione su campus y su horario de servicio

Consulte el artículo completo de [Registro de entrada](../attendance/check-in.md) para ver los pasos detallados de configuración.

## Paso 5: conseguir su hardware

Necesita una tableta para el quiosco y, opcionalmente, una impresora de etiquetas Brother para los gafetes.

Como mínimo:

- **Una tableta Android o Amazon Fire**; consulte las [tabletas recomendadas](../attendance/check-in.md#recommended-hardware)
- **Una impresora de etiquetas Brother**; se recomienda la QL-1110NWB por su compatibilidad con Bluetooth y WiFi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Las impresoras de otras marcas no funcionarán.
:::

## Paso 6: realizar una prueba de registro de entrada

Antes del domingo por la mañana, haga una prueba:

1. Abra la aplicación B1 Checkin en su tableta
2. Seleccione su campus y el horario de servicio correcto
3. Busque a una de las familias que agregó
4. Registre la entrada de un niño y verifique:
   - Que la asistencia aparezca en B1 Admin, en **Asistencia**
   - Si usa impresora, que el gafete se imprima correctamente

:::tip
Capacite a los voluntarios de su equipo de bienvenida sobre el proceso de registro antes de empezar. Normalmente basta con una explicación rápida de 5 minutos.
:::

## ¡Listo!

El registro de entrada de su ministerio infantil ya está listo. Los padres pueden buscar a su familia, seleccionar a sus hijos y registrarlos en el quiosco. La asistencia se registra automáticamente en B1 Admin.

## Artículos relacionados

- [Agregar personas](../people/adding-people.md) — agregue más familias conforme vengan de visita
- [Creación de grupos](../groups/creating-groups.md) — administre los grupos de sus niños
- [Configuración de asistencia](../attendance/setup.md) — configure campus y servicios
- [Registro de entrada](../attendance/check-in.md) — configuración detallada de la aplicación y el hardware
- [Seguimiento de asistencia](../attendance/tracking-attendance.md) — vea los informes de registro de entrada
