---
title: "Guía: configurar el registro de entrada del ministerio infantil"
description: "Configure el registro de entrada infantil en B1 Admin: vincule familias, cree grupos por edad, configure los servicios e imprima credenciales para el quiosco de B1 Checkin."
---

# Configurar el registro de entrada del ministerio infantil

<div class="article-intro">

Esta guía le explica todo lo necesario para poner en marcha un sistema de registro de entrada infantil en su iglesia: desde ingresar las familias en la base de datos, hasta configurar grupos adecuados para cada edad e imprimir credenciales el domingo por la mañana. Al final, los padres podrán registrar a sus hijos en un quiosco de tableta y recibir una etiqueta de seguridad que coincida.

</div>

## Video de capacitación {#training-video}

<YouTube id="Ep9CBUcJwPI" title="Configuración del registro de entrada infantil en B1" next="Registro y seguimiento de la asistencia en B1" nextUrl="/docs/b1-admin/attendance/recording-attendance" />

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Cree la cuenta de su iglesia en [admin.b1.church](https://admin.b1.church)
- Asegúrese de tener acceso de administrador; consulte [Roles y permisos](../people/roles-permissions.md) si lo necesita
- Opcional: prepare un archivo CSV con las familias si migra desde otro sistema

</div>

## Paso 1: añadir familias a su base de datos {#step-1-add-families-to-your-database}

Antes de que el registro de entrada pueda funcionar, el sistema necesita conocer a sus familias. Cada niño debe estar vinculado a un padre o tutor mediante la función de hogares.

Siga la guía de [Añadir personas](../people/adding-people.md) para añadir al menos una familia. Asegúrese de:

- Añadir primero a los padres
- Añadir a cada niño
- Vincularlos en el mismo hogar usando el [editor de hogares](../people/adding-people.md#managing-households)

:::tip
Si tiene más de unas pocas familias para añadir, use la herramienta de [Importación CSV](../people/importing-data.md) en lugar de añadirlas una por una. Puede importar todo su directorio en pocos minutos.
:::

## Paso 2: crear grupos infantiles {#step-2-create-childrens-groups}

Los grupos definen las clases a las que se registran los niños. Normalmente querrá un grupo por rango de edad.

Siga la guía de [Crear grupos](../groups/creating-groups.md) para crear grupos como:

- **Guardería** (de 0 a 2 años)
- **Preescolar** (de 3 a 5 años)
- **Primaria** (de 6 a 10 años)

Puede ajustar los nombres y los rangos de edad para que coincidan con la estructura de su ministerio. Luego abra la configuración de cada grupo (haga clic en **Editar** en la página del grupo) y:

- Configure **Registrar asistencia** en **Sí** para que el grupo pueda registrar entradas
- Active **Imprimir credencial** (y **Recogida por padres** si imprime etiquetas de recogida)
- Opcionalmente, configure los límites de **Edad y grado** para que el quiosco sugiera la sala correcta; consulte [Seguridad en el registro de entrada](../attendance/checkin-safety.md)

## Paso 3: configurar campus y servicios {#step-3-configure-campuses-and-services}

El registro de entrada está vinculado a horarios de servicio específicos. Necesita al menos un campus y un servicio configurados.

Siga la guía de [Configuración de asistencia](../attendance/setup.md) para:

1. Vaya a **Personas > Asistencia** y haga clic en **Configuración**
2. Añada su campus (por ejemplo, "Campus principal")
3. Añada un servicio (por ejemplo, "Domingo por la mañana")
4. Añada el horario de servicio (por ejemplo, "9:00 AM") y, opcionalmente, un [horario de registro](../attendance/setup.md#setting-a-check-in-schedule) para que el registro se abra automáticamente antes de cada servicio y se cierre después de él
5. Vincule cada grupo infantil al horario de servicio: abra el grupo, haga clic en **Editar**, elija el horario en **Añadir horario de servicio** y haga clic en el botón de más

## Paso 4: configurar la app de registro de entrada {#step-4-set-up-the-check-in-app}

Ahora conecte todo instalando la app de registro de entrada en una tableta.

1. Instale la **app B1 Checkin**; consulte el artículo de [Registro de entrada](../attendance/check-in.md) para los enlaces de descarga
2. Inicie sesión con una cuenta que tenga el permiso de asistencia **Checkin** (o **Editar asistencia**); consulte [Cuentas de quiosco de registro de entrada](../settings/roles-permissions.md#check-in-kiosk-accounts)
3. Seleccione su campus y su horario de servicio

Consulte el artículo completo de [Registro de entrada](../attendance/check-in.md) para los pasos detallados de configuración.

## Paso 5: conseguir el equipo {#step-5-get-your-hardware}

Necesita una tableta para el quiosco y, opcionalmente, una impresora de etiquetas Brother para las credenciales.

Como mínimo:
- **Una tableta iPad, Android o Amazon Fire**: consulte las [tabletas recomendadas](../attendance/check-in.md#recommended-hardware)
- **Una impresora de etiquetas Brother**: se recomienda la QL-1110NWB por su compatibilidad con Bluetooth y WiFi
- **Etiquetas Brother DK-1201** (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la app B1 Checkin. Las impresoras de otras marcas no funcionarán.
:::

## Paso 6: realizar una prueba de registro de entrada {#step-6-run-a-test-check-in}

Antes del domingo por la mañana, haga una prueba:

1. Abra la app B1 Checkin en su tableta
2. Seleccione su campus y el horario de servicio correcto
3. Busque una de las familias que añadió
4. Registre a un niño y verifique:
   - Que la asistencia aparezca en B1 Admin en **Personas > Asistencia**
   - Si usa una impresora, que la credencial se imprima correctamente

:::tip
Capacite a los voluntarios de su equipo de bienvenida sobre el proceso de registro de entrada antes del lanzamiento. Por lo general, basta con una presentación rápida de 5 minutos.
:::

## ¡Listo! {#youre-done}

El registro de entrada de su ministerio infantil ya está listo. Los padres pueden buscar a su familia, seleccionar a sus hijos y registrarlos en el quiosco. La asistencia se registra automáticamente en B1 Admin.

## Artículos relacionados {#related-articles}

- [Añadir personas](../people/adding-people.md): añada más familias conforme visiten la iglesia
- [Crear grupos](../groups/creating-groups.md): administre los grupos infantiles
- [Configuración de asistencia](../attendance/setup.md): configure campus y servicios
- [Registro de entrada](../attendance/check-in.md): configuración detallada de la app de registro y del equipo
- [Seguimiento de asistencia](../attendance/tracking-attendance.md): vea los informes de registro de entrada
