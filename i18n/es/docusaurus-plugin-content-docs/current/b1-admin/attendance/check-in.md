---
title: "Check-in"
---

# Check-in

<div class="article-intro">

B1 Admin soporta el auto check-in en los servicios a trav\u00e9s de la aplicaci\u00f3n complementaria **B1 Checkin**. Los miembros pueden registrarse a s\u00ed mismos y a sus familias en quioscos o dispositivos dedicados cuando llegan, haciendo el proceso r\u00e1pido y reduciendo la carga de trabajo de sus voluntarios. Cada check-in se registra autom\u00e1ticamente como asistencia.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Sus sedes, horarios de servicio y grupos deben estar configurados en [Configuraci\u00f3n de asistencia](setup.md).
- Necesita [personas en su base de datos](../people/adding-people.md) con [hogares](../people/adding-people.md#administrar-hogares) configurados para que las familias puedan registrarse juntas.
- Necesitar\u00e1 una tablet y opcionalmente una impresora de etiquetas Brother (consulte las [recomendaciones de hardware](#hardware-recomendado) a continuaci\u00f3n).

</div>

## C\u00f3mo funciona

La aplicaci\u00f3n B1 Checkin se conecta a su configuraci\u00f3n de asistencia de B1 Admin. Cuando un miembro se registra, su asistencia se graba autom\u00e1ticamente en la sede, horario de servicio y grupo correctos. No necesita ingresar la asistencia manualmente para nadie que use el sistema de check-in.

## Configurar el check-in

1. **Configure primero su estructura de asistencia.** En B1 Admin, vaya a **Asistencia > Configuraci\u00f3n** y aseg\u00farese de que sus sedes, horarios de servicio y grupos est\u00e9n en su lugar. La aplicaci\u00f3n de check-in depende de esta configuraci\u00f3n. Consulte [Configuraci\u00f3n de asistencia](setup.md) para m\u00e1s detalles.
2. **Instale la aplicaci\u00f3n B1 Checkin** en los dispositivos que planea usar. La aplicaci\u00f3n est\u00e1 disponible en las siguientes plataformas:
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Inicie sesi\u00f3n en la aplicaci\u00f3n B1 Checkin** usando las credenciales de la cuenta de su iglesia.
4. **Seleccione la sede y el horario de servicio** para la reuni\u00f3n actual.
5. Los miembros ahora pueden buscar su nombre en el dispositivo y registrarse.

:::tip
Coloque los dispositivos de check-in en ubicaciones visibles y de f\u00e1cil acceso, como las entradas del vest\u00edbulo o los escritorios de bienvenida. Un breve anuncio durante los servicios ayuda a que los miembros sepan que la opci\u00f3n est\u00e1 disponible.
:::

:::tip
Si su iglesia tiene m\u00faltiples sedes, necesitar\u00e1 repetir la configuraci\u00f3n para cada sede en [Configuraci\u00f3n de asistencia](setup.md). Cada dispositivo de check-in puede configurarse para una sede diferente.
:::

## Hardware recomendado

**Tablets** -- cualquiera de estas funciona bien con la aplicaci\u00f3n:

- **Compacta:** Samsung Galaxy Tab A7 Lite 8.7"
- **Pantalla grande:** Samsung Galaxy Tab A8 10.5"
- **Econ\u00f3mica:** Amazon Fire HD 10

**Impresoras** -- el check-in funciona con impresoras de etiquetas Brother para imprimir credenciales de identificaci\u00f3n:

- **Mejor:** Brother QL-1110NWB (soporta m\u00faltiples tablets v\u00eda Bluetooth y WiFi)
- **Buena:** Brother QL-810W (soporta m\u00faltiples tablets v\u00eda WiFi)
- **Econ\u00f3mica:** Brother QL-1100 (solo WiFi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo las impresoras de etiquetas Brother son compatibles con la aplicaci\u00f3n B1 Checkin. Otras marcas de impresoras no funcionar\u00e1n para imprimir credenciales de identificaci\u00f3n.
:::

:::info
Siga las instrucciones de configuraci\u00f3n de su impresora para conectarla a la misma red WiFi que su tablet. Puede encontrar los controladores e instrucciones de configuraci\u00f3n de impresoras Brother en el [sitio de soporte de Brother](https://support.brother.com).
:::

## Qu\u00e9 se registra

Cada check-in crea un registro de asistencia en B1 Admin. Puede ver estos registros en las pesta\u00f1as de [Asistencia](tracking-attendance.md) y [Grupos](../groups/group-members.md) de la misma manera que la asistencia ingresada manualmente. No hay diferencia en c\u00f3mo aparecen los datos -- ambos m\u00e9todos alimentan los mismos reportes.
