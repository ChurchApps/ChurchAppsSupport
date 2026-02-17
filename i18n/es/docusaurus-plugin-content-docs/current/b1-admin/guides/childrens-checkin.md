---
title: "Guía: Configurar el registro del ministerio infantil"
---

# Configurar el registro del ministerio infantil

<div class="article-intro">

Esta guía te lleva paso a paso a través de todo lo necesario para poner en funcionamiento un sistema de registro infantil en tu iglesia — desde ingresar familias en la base de datos, hasta configurar grupos por edad, hasta imprimir etiquetas de identificación el domingo por la mañana. Al finalizar, los padres podrán registrar a sus hijos en una tableta de quiosco y recibir una etiqueta de seguridad correspondiente.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Crea tu cuenta de iglesia en [admin.b1.church](https://admin.b1.church)
- Asegúrate de tener acceso de administrador — consulta [Roles y permisos](../people/roles-permissions.md) si es necesario
- Opcional: Prepara un archivo CSV de familias si estás migrando desde otro sistema

</div>

## Paso 1: Agregar familias a tu base de datos

Antes de que el registro pueda funcionar, el sistema necesita conocer a tus familias. Cada niño necesita estar vinculado a un padre a través de la función de hogar.

Sigue la guía [Agregar personas](../people/adding-people.md) para agregar al menos una familia. Asegúrate de:

- Agregar primero al padre o los padres
- Agregar a cada niño
- Vincularlos en el mismo hogar usando el [editor de hogares](../people/adding-people.md#administrar-hogares)

:::tip
Si tienes más de unas pocas familias para agregar, usa la herramienta de [Importación CSV](../people/importing-data.md) en lugar de agregarlas una por una. Puedes importar todo tu directorio en minutos.
:::

## Paso 2: Crear grupos infantiles

Los grupos definen las clases a las que se registran los niños. Normalmente querrás un grupo por rango de edad.

Sigue la guía [Crear grupos](../groups/creating-groups.md) para crear grupos como:

- **Guardería** (edades 0-2)
- **Preescolar** (edades 3-5)
- **Primaria** (edades 6-10)

Puedes ajustar los nombres y rangos de edad para que coincidan con la estructura de tu ministerio.

## Paso 3: Configurar campus y servicios

El registro está vinculado a horarios de servicio específicos. Necesitas al menos un campus y un servicio configurado.

Sigue la guía [Configuración de asistencia](../attendance/setup.md) para:

1. Agregar tu campus (por ejemplo, "Campus Principal")
2. Agregar un servicio (por ejemplo, "Domingo por la Mañana")
3. Configurar el horario del servicio (por ejemplo, "9:00 AM")
4. Asignar tus grupos infantiles al servicio

## Paso 4: Configurar la aplicación de registro

Ahora conecta todo instalando la aplicación de registro en una tableta.

1. Instala la **aplicación B1 Checkin** — consulta el artículo [Registro](../attendance/check-in.md) para enlaces de descarga
2. Inicia sesión con tus credenciales de B1 Admin
3. Selecciona tu campus y horario de servicio

Consulta el artículo completo de [Registro](../attendance/check-in.md) para los pasos detallados de configuración.

## Paso 5: Obtener tu hardware

Necesitas una tableta para el quiosco y opcionalmente una impresora de etiquetas Brother para las etiquetas de identificación.

Como mínimo:
- **Una tableta Android o Amazon Fire** — consulta las [tabletas recomendadas](../attendance/check-in.md#hardware-recomendado)
- **Una impresora de etiquetas Brother** — se recomienda la QL-1110NWB por su compatibilidad con Bluetooth y WiFi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicación B1 Checkin. Otras marcas de impresoras no funcionarán.
:::

## Paso 6: Hacer un registro de prueba

Antes del domingo por la mañana, haz una prueba:

1. Abre la aplicación B1 Checkin en tu tableta
2. Selecciona tu campus y el horario de servicio correcto
3. Busca una de las familias que agregaste
4. Registra a un niño y verifica:
   - Que la asistencia aparezca en B1 Admin en **Asistencia**
   - Si usas una impresora, que la etiqueta de identificación se imprima correctamente

:::tip
Capacita a tus voluntarios del equipo de bienvenida en el proceso de registro antes del lanzamiento. Por lo general, basta con un recorrido rápido de 5 minutos.
:::

## ¡Listo!

El registro de tu ministerio infantil está listo. Los padres pueden buscar a su familia, seleccionar a sus hijos y registrarse en el quiosco. La asistencia se registra automáticamente en B1 Admin.

## Artículos relacionados

- [Agregar personas](../people/adding-people.md) — agregar más familias conforme visiten
- [Crear grupos](../groups/creating-groups.md) — gestionar tus grupos infantiles
- [Configuración de asistencia](../attendance/setup.md) — configurar campus y servicios
- [Registro](../attendance/check-in.md) — configuración detallada de la aplicación de registro y hardware
- [Seguimiento de asistencia](../attendance/tracking-attendance.md) — ver informes de registro
