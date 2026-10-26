---
title: "Incorporación de Twilio para iglesias (borrador)"
description: "Borrador de la configuración de Twilio propiedad de la iglesia en B1, la orientación pública de inscripción, ejemplos de campañas y lista de verificación de aprobación."
---

# Borrador de incorporación de Twilio propiedad de la iglesia

:::caution Borrador para la integración propuesta
Este es un flujo de trabajo propuesto. B1 ya tiene una opción básica de **Twilio** en **Configuración > Mensajes de texto** (SID de cuenta, token de autenticación, número de origen y el webhook de STOP entrante) -- véase [Configuración de la iglesia: Mensajes de texto](../../b1-admin/settings/church-settings.md#texting). Los controles adicionales de configuración de B1, el mapeo del consentimiento y los pasos de validación que aparecen abajo son requisitos para una versión futura, no instrucciones para buscar configuraciones existentes. Lea la [propuesta técnica](./twilio-byok-proposal) para conocer el alcance y las dependencias. Las fuentes de Twilio se revisaron el 22 de octubre de 2026; verifique los requisitos vigentes antes de enviar una campaña.
:::

## La disposición recomendada

Su iglesia es dueña de su cuenta de pago de Twilio, su número telefónico, su Servicio de Mensajería, la facturación y el registro de campaña. B1 enviaría mensajes a través de esos recursos usando credenciales ingresadas de forma privada en la configuración de la iglesia. Mantenga al menos dos administradores apropiados de la iglesia con acceso a la cuenta de Twilio, active la seguridad de la cuenta y asigne a una persona responsable de los consentimientos, las respuestas entrantes y los avisos de rechazo.

La primera versión propuesta aquí cubre un número local de EE. UU. y un programa de mensajería de la iglesia claramente descrito. Los ejemplos de abajo usan la **Grace Community Church** ficticia y su programa **Grace Church Updates** para cambios de servicio, recordatorios de eventos y programación de voluntarios. Reemplace cada nombre, dominio, frecuencia, contacto y propósito por la práctica real de la iglesia. Estos son ejemplos específicos de la iglesia de las reglas de Twilio, no una campaña preaprobada ni una promesa de aprobación.

## 1. Preparar la experiencia pública de inscripción en B1

Publique una página como `https://www.example.org/text-updates` en el sitio web de B1 de la iglesia, con un formulario público de B1 incrustado o un enlace evidente a su formulario público independiente. Publique también `https://www.example.org/privacy` y `https://www.example.org/sms-terms`. Esas direcciones son marcadores de posición; envíe las URL reales y accesibles.

Para el formulario propuesto de inscripción por SMS:

| Configuración | Configuración recomendada |
|---|---|
| Acceso | Público/sin restricciones; activo durante la revisión y la inscripción continua; disponible sin iniciar sesión |
| Modo del formulario | Modo estándar al principio; el modo conversacional requiere el soporte explícito de consentimiento descrito en la propuesta técnica |
| Móvil | Claramente etiquetado con código de país; obligatorio solo al elegir la inscripción por SMS si se usa dentro de un formulario general de conexión/evento |
| Elección de SMS | Casilla opcional separada, desmarcada por defecto, asignada al programa específico y al campo de móvil |
| Avisos | Visibles junto a la opción de SMS: iglesia/programa, propósito y frecuencia de los mensajes, posibles tarifas, STOP, HELP, contacto de soporte y enlaces reales y clicables a la Política de privacidad y a los Términos de SMS |
| Otras acciones | Los invitados pueden enviar la tarjeta de conexión, registrarse en un evento o solicitar información sin inscribirse en SMS |
| Evidencia | Guardar programa, número exacto, consentimiento seleccionado, envío de origen, hora del servidor y versión del aviso/política; una respuesta común de formulario por sí sola no inscribe a nadie hoy |
| Automatización de personas/grupos | Mantener desactivada la creación automática de personas y la asignación a grupos en un piloto inicial de inscripción, salvo que se revise según las reglas de coincidencia existentes de la iglesia. La asignación a un grupo nunca es la autorización de SMS |
| Automatizaciones existentes | No inscriba a todos los que envían formularios ni a todos los miembros de un grupo en un flujo de trabajo de mensajes de texto. Solo el mapeo de consentimiento verificado propuesto puede autorizar ese programa |
| Mensaje de agradecimiento | Confirme que se recibió el formulario sin afirmar que hubo inscripción en SMS cuando la casilla fue rechazada o la confirmación/revisión sigue pendiente |

Una casilla de verificación existente puede ilustrar el formulario, pero B1 todavía necesita el registro de consentimientos y las puertas de envío. El renderizador compartido actual muestra las descripciones como texto plano; escribir Markdown o una URL allí no basta para garantizar que los enlaces de políticas sean clicables. La implementación debe ofrecer un control de consentimiento accesible con enlaces reales. Véanse [crear formularios de B1](../../b1-admin/forms/creating-forms) y la [propuesta técnica](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

Twilio exige un consentimiento voluntario y verificable. No incluya el SMS dentro de términos de membresía obligatorios, permisos de correo o teléfono, consentimiento de donación ni inscripción a eventos. Un número móvil en una tarjeta de visitante no es por sí mismo consentimiento para SMS. Véanse los [requisitos de consentimiento voluntario](https://www.twilio.com/docs/api/errors/30923) de Twilio y las [recomendaciones de campaña](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Texto de ejemplo para la inscripción

Use esto solo después de que la iglesia elija los propósitos, el remitente y la frecuencia reales. La casilla es opcional y empieza desmarcada; los nombres de las políticas deben ser enlaces en el formulario renderizado.

> Sí, quiero que Grace Community Church me envíe mensajes de texto a través de Grace Church Updates sobre cambios de servicio, eventos de la iglesia y horarios de voluntarios desde [número registrado de la iglesia]. Espere hasta 4 mensajes al mes. Pueden aplicarse tarifas de mensajes y datos. Responda STOP para darse de baja o HELP para recibir ayuda. La inscripción en SMS es opcional y no es necesaria para asistir, registrarse ni dar. Consulte nuestra Política de privacidad y nuestros Términos de SMS. Preguntas: [correo o teléfono de soporte de la iglesia].

"Hasta 4" es un compromiso de ejemplo, no un límite prescrito por Twilio. Reemplácelo por una frecuencia que la iglesia pueda cumplir realmente; si la frecuencia varía, dígalo con veracidad y describa la cadencia esperada. Mantenga las solicitudes promocionales o los programas ministeriales adicionales fuera de esta casilla, a menos que sus propósitos y consentimientos se hayan evaluado por separado.

Para un formulario general de visitantes o eventos, enviarlo con esta casilla desmarcada debe seguir funcionando. Un formulario exclusivo de SMS puede explicar que marcarla solicita la inscripción, pero nunca debe hacer que los servicios no relacionados de la iglesia dependan de la inscripción. Confirme el comportamiento real tanto en el teléfono como en el escritorio.

### Contenido de políticas que hay que preparar

La página de privacidad de la iglesia debe explicar qué información recopila para los mensajes de texto, cómo la usa y la protege, y sus prácticas de conservación y contacto. Debe afirmar claramente que los números móviles y los consentimientos de mensajería no se venden ni se comparten con terceros ni con afiliados para su uso de marketing o promocional. Explique con precisión el procesamiento necesario por parte de proveedores de servicios; no afirme que la iglesia nunca usa un encargado de tratamiento mientras usa B1 y Twilio. La [orientación sobre políticas de privacidad](https://www.twilio.com/docs/api/errors/30908) de Twilio y las [recomendaciones de campaña](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) son la referencia para esta distinción.

Los Términos de SMS deben identificar a la iglesia y el programa, los propósitos, la frecuencia real, los posibles cargos por mensajes, las instrucciones de STOP/HELP, el contacto de soporte y el enlace de privacidad; incluya cualquier aviso adicional que solicite la revisión actual de Twilio. Haga coincidir exactamente los enlaces de políticas de la página de inscripción con las URL enviadas en la campaña. Desde el 30 de junio de 2026, Twilio exige URL públicas y dedicadas de privacidad y de términos para los nuevos registros de campaña por API; su flujo de la Consola también las solicita. [Requisito de Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Estos son requisitos de contenido que deben aplicarse a las políticas reales de la iglesia; no reemplazan sus prácticas de privacidad existentes ni son una política genérica para pegar sin verificarla.

## 2. Registrar la iglesia y su programa de mensajería en Twilio

1. Cree o use una **cuenta de pago propiedad de la iglesia** y un número local de EE. UU. capaz de enviar SMS. Use el nombre legal de la iglesia, su EIN o registro comercial, dirección, sitio web y representante autorizado de forma coherente. No sustituya la identidad de ChurchApps ni la información de otra iglesia.
2. Siga el flujo de registro de Marca de Twilio para clientes directos según el tipo de entidad real de la iglesia. Para una organización sin fines de lucro elegible, use la [orientación de registro para organizaciones sin fines de lucro](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Los casos de caridad/501(c)(3) dependen de la elegibilidad; el nombre de una iglesia por sí solo no establece la aprobación ni la exención de Twilio.
3. Cree un Servicio de Mensajería dedicado y envíe la campaña A2P 10DLC correspondiente. Elija el caso de uso que coincida con veracidad con los mensajes reales y con las opciones disponibles para esa Marca aprobada; los ejemplos aquí no prescriben un código universal de caso de uso para iglesias.
4. Proporcione la URL pública de inscripción, las URL de las políticas, la descripción completa del consentimiento y del flujo de mensajes, y los mensajes de muestra solicitados. Incluya todos los métodos de inscripción reales; ajuste las declaraciones de enlaces incrustados y de números telefónicos para que coincidan con el contenido real. No indique inscripción por palabra clave ni doble confirmación a menos que ese flujo exista y se haya probado.
5. Asocie el número remitente con el servicio y la campaña aprobada. Espere a que se verifiquen tanto la campaña **como el registro completo del número** antes de enviar mensajes.

Mantenga estos pasos en la propia Consola de Twilio de la iglesia. La integración propuesta de B1 no envía registros para las iglesias. La [guía rápida de registro](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) y el [recurso de campaña](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) de Twilio explican los campos de registro y el estado. Un número pendiente puede seguir bloqueando el envío aun después de aprobada la campaña. [Registro de números](https://www.twilio.com/docs/api/errors/30035)

### Ejemplo de descripción de campaña

> Grace Community Church usa Grace Church Updates para enviar cambios en el horario de los servicios, recordatorios de eventos de la iglesia y avisos de programación de voluntarios a las personas que eligen este programa en nuestro sitio web público de la iglesia. Enviamos no más de cuatro mensajes al mes en el marco de este programa. Los destinatarios pueden dejar de recibir estos mensajes en cualquier momento. Este programa no incluye contactos comprados, promociones de terceros ni solicitudes de recaudación de fondos.

Este ejemplo solo corresponde a una iglesia que realmente cumple esos límites y exclusiones. Si los recordatorios de voluntarios por sí solos superan la frecuencia prometida, cambie el diseño del programa y el aviso antes de enviarlo.

### Ejemplo de descripción del flujo de mensajes

> Los visitantes abren [URL real de inscripción de la iglesia], ingresan su número móvil y seleccionan de forma independiente la casilla opcional de Grace Church Updates. Está desmarcada al abrir el formulario. El aviso identifica a Grace Community Church, describe los cambios de servicio, los recordatorios de eventos y los horarios de voluntarios, indica el límite mensual y las posibles tarifas, y explica STOP y HELP. La Política de privacidad y los Términos de SMS que se muestran enlazan a [URL real de privacidad] y [URL real de términos de SMS]. Rechazar el SMS no impide asistir, registrarse en un evento, dar ni usar el formulario general de conexión. B1 registra la selección afirmativa, el número telefónico, la hora de envío y la versión del aviso. Solo enviamos este programa a los suscriptores documentados y suprimimos las bajas antes de cualquier otro envío.

Adapte ese párrafo al flujo implementado. Si se usa confirmación por teléfono o revisión del personal, describa el estado pendiente y el paso exacto de activación. Si se usan otros métodos, incluya cada uno y su evidencia. Cuando la inscripción está detrás de un inicio de sesión o se realiza en papel, Twilio pide evidencia pública y redactada de la experiencia real de consentimiento; nunca exponga formularios completados ni datos de miembros. [Orientación sobre consentimiento verificable](https://www.twilio.com/docs/api/errors/30923)

### Ejemplos de mensajes salientes

Estas son muestras ficticias para adaptar; use URL reales de la iglesia y reemplace los valores entre corchetes antes de enviar. La API de campañas de Twilio acepta de dos a cinco muestras. Las muestras deben identificar a la iglesia, reflejar el propósito declarado e incluir una instrucción de baja. [Campos de muestra de campaña](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: El servicio del domingo comenzará a las [hora] debido a [motivo]. Detalles: [URL del sitio web de la iglesia]. Responda STOP para dejar de recibir mensajes.
```

```text
Grace Community Church: Le recordamos que [evento de la iglesia] será el [fecha] a las [hora]. Información: [URL del evento de la iglesia]. Responda STOP para dejar de recibir mensajes.
```

```text
Grace Community Church: Está programado para servir en [equipo] este [día]. Por favor revise su plan: [URL del portal de la iglesia en B1]. Responda STOP para dejar de recibir mensajes.
```

Las URL entre corchetes describen variables de muestra; los ejemplos enviados deben mostrar el dominio real de la iglesia y el estilo real de los enlaces. Un enlace a un plan puede requerir inicio de sesión, pero la página de inscripción y las políticas usadas para la revisión deben poder consultarse públicamente. No incluya notas privadas, información de niños ni detalles identificables de miembros en las muestras de aprobación. Mantenga el contenido de muestra coherente con lo que realmente envían las plantillas de B1; no prometa una bandeja de respuestas ni un comportamiento de recordatorio que no esté disponible.

### Respuestas a STOP, START y HELP

Use la Opción de Baja Avanzada de Twilio para Servicios de Mensajería para estas confirmaciones y personalice la identidad de la iglesia/programa y los datos de soporte. Intención de respuesta de ejemplo:

- **STOP:** Confirmar que Grace Church Updates ha dejado de enviar mensajes y explicar la forma compatible de reanudarlos.
- **START:** Confirmar la reanudación de ese mismo programa, incluidas su identidad, cadencia/tarifas e instrucciones de ayuda y baja según lo exija el flujo configurado.
- **HELP:** Identificar a Grace Community Church y dar el contacto de soporte real y las instrucciones de baja.

No envíe una segunda confirmación de B1 cuando Twilio ya respondió. Una respuesta HELP no equivale a inscripción. START no debe inscribir a nadie en programas adicionales de la iglesia ni mostrarlo en el directorio de miembros. [Opción de Baja Avanzada de Twilio](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Revisar el paquete de aprobación antes de enviarlo

- [ ] La información legal real de la iglesia y de la Marca, la identidad del sitio web y el propósito de la campaña coinciden.
- [ ] La página de inscripción y el formulario activo se abren sin inicio de sesión en una ventana privada del navegador, incluso en un dispositivo móvil.
- [ ] La casilla de SMS empieza desmarcada y puede rechazarse mientras se completa la acción principal del visitante o del evento.
- [ ] El propósito del programa, el remitente, la frecuencia real, los posibles cargos, STOP, HELP, el contacto de soporte y los enlaces clicables de las políticas aparecen junto a la opción de SMS.
- [ ] Las URL exactas de privacidad y de términos enviadas a Twilio son públicas, funcionan sin credenciales e identifican a la misma iglesia y programa. El contenido de las políticas coincide con el procesamiento real.
- [ ] Cada mensaje de muestra coincide con el programa, con la identidad real del remitente y con el comportamiento esperado de enlaces o números telefónicos. La campaña describe cada método real de inscripción.
- [ ] Las capturas de pantalla redactadas muestran el formulario en blanco, la casilla y los avisos, y los enlaces de las políticas tal como los verán los revisores. La evidencia no contiene registros de miembros ni claves.
- [ ] La iglesia tiene una forma operativa de conservar la evidencia de consentimiento y de respetar las bajas antes de enviar, incluidas las solicitudes recibidas por teléfono o correo.

Estas revisiones reducen discrepancias evitables; Twilio y sus socios de revisión toman la decisión de aprobación. Mantenga disponibles las URL reales de la página de inscripción y de las políticas después de la aprobación, no solo durante la revisión.

## 4. Conectar y validar la futura integración de B1

Una vez publicada la integración, su configuración propuesta de Mensajes de texto debe recopilar el SID de cuenta de la iglesia, el SID/secreto de API Key dedicado, el token de autenticación separado para el webhook, el SID del Servicio de Mensajería y el remitente seleccionado. Cree las claves solo en la Consola de la iglesia e ingrese los secretos únicamente en la configuración privada de B1. [Orientación sobre claves de API de Twilio](https://www.twilio.com/docs/iam/api-keys)

Copie las URL de webhook de entrada y de estado de entrega específicas de la iglesia que proporciona B1 en la configuración correspondiente del servicio de Twilio. Active la Opción de Baja Avanzada y compruebe que los mensajes entrantes llegan al webhook configurado. B1 debe mostrar verificaciones separadas de credenciales, propiedad del servicio y del remitente, campaña verificada, registro completo del número, verificación de entrada y prueba de entrega. Una credencial guardada o una solicitud de API aceptada no es la entrega final.

Si B1 no puede verificar mediante programa una señal de registro, confírmela directamente en la Consola; la interfaz debe etiquetar el resultado fechado como confirmado por el administrador. Resuelva el estado pendiente o fallido antes de activar los textos de producción. Use una prueba separada y solicitada explícitamente, enviada a un adulto real que dio su consentimiento como destinatario de prueba, y luego:

1. Confirme que una inscripción documentada que coincida crea el registro correcto de consentimiento de teléfono y programa; rechazar o cambiar de teléfono no debe inscribir silenciosamente a un destinatario.
2. Envíe una prueba, confirme la recepción y compare el estado de B1 con el Message SID de Twilio y el resultado de la entrega.
3. Responda STOP y compruebe que los textos manuales, los textos a grupos, los flujos de trabajo y los recordatorios omiten ese teléfono. La visibilidad en el directorio no debe cambiar.
4. Ejecute el flujo documentado de reinscripción en el mismo programa y la respuesta HELP; verifique que no haya confirmaciones duplicadas ni cambios de preferencias no relacionados.

## 5. Mantener el programa

Designe a un responsable de la iglesia que supervise el estado de la campaña y de la cuenta, las alertas de saldo y facturación, los fallos de mensajes y las respuestas entrantes en Twilio. La primera versión propuesta de B1 no tiene una bandeja de SMS conversacional, así que publique y supervise un contacto de ayuda real y revise las respuestas, en lugar de suponer que el personal las ve en B1.

Conserve el historial de consentimientos y bajas, las versiones actuales de los avisos y de las políticas, los identificadores de campaña y la evidencia de aprobación redactada en registros controlados por la iglesia. Nunca pegue claves ni listas de destinatarios en tickets de soporte públicos. Cuando cambien un número, un servicio, las credenciales, el flujo de inscripción, la frecuencia o el propósito, vuelva a revisar la integración y actualice el registro y el consentimiento cuando sea necesario antes de reanudar. Revise con cuidado los números compartidos por un mismo hogar y los números que cambiaron; la elegibilidad depende del teléfono y del programa que consintieron, no del registro de cada miembro de la familia.

Ante un rechazo, lea el error real de Twilio, corrija la inconsistencia específica tanto en el sitio web como en el envío, y vuelva a enviar desde la Consola de la iglesia. Para remitentes no registrados o pendientes, espere a que se complete el registro en lugar de rotar números para evitarlo. Use la [guía de resolución de problemas de registro de Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) y la referencia de códigos de error suministrada. No prometa un plazo de respuesta fijo.
