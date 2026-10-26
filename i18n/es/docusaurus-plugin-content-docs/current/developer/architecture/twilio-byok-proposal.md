---
title: "Twilio BYOK (Propuesta)"
description: "Integración propuesta de Twilio de propiedad de la iglesia, modelo de consentimiento, alcance de implementación y criterios de lanzamiento."
---

# Propuesta de integración de Twilio BYOK

:::caution Propuesta: no es una integración disponible
Este es un diseño para la revisión de los mantenedores, basado en el código fuente público y la documentación de Twilio revisados el 22 de octubre de 2026. Desde entonces se ha lanzado un proveedor básico de Twilio (`@churchapps/texting` 0.6.0 y **Configuración > Mensajes de texto** en B1 Admin): la iglesia introduce su Account SID, Auth Token y un número De (el proveedor también acepta un Messaging Service SID que empiece por `MG`, pero la columna `fromNumber` sigue siendo `varchar(20)`, demasiado corta para un SID de 34 caracteres), los textos se envían con una solicitud por destinatario a través de la API de mensajes de Twilio, y las respuestas STOP llegan a B1 mediante el webhook de entrada existente. Consulte [Configuración de la iglesia: Mensajes de texto](../../b1-admin/settings/church-settings.md#texting). El modelo de consentimiento, el manejo de Advanced Opt-Out, el estado de entrega y las comprobaciones de preparación de la configuración que aparecen a continuación siguen siendo propuestas, no comportamiento implementado. El [borrador de incorporación de iglesias](./twilio-byok-onboarding-draft) contiene una propuesta de guía de configuración y ejemplos específicos para iglesias.
:::

## Ruta recomendada

Añadir Twilio al sistema de proveedores de mensajes de texto existente de B1 usando **una cuenta de Twilio propiedad de la iglesia, credenciales de API, un Messaging Service y un número de teléfono capaz de enviar SMS**. La iglesia registra su propia entidad legal y su campaña de mensajería, paga a Twilio directamente, mantiene el consentimiento de los destinatarios y gestiona la aprobación en la Consola de Twilio. ChurchApps aporta la integración y la documentación.

Empiece con un programa de mensajería, un Messaging Service y un remitente local de EE. UU. de 10DLC por iglesia de B1. Admita textos individuales, textos a grupos, textos de flujos de trabajo y recordatorios de suscripción mediante las pantallas existentes de B1. Un primer programa razonable cubre cambios de servicio, recordatorios de eventos y programación de voluntarios, siempre que los tres estén descritos en el consentimiento de esa iglesia y en la campaña aprobada. La mensajería de recaudación de fondos o promocional requiere un alcance y un consentimiento evaluados por separado; no la añada en silencio a este programa.

| Responsabilidad | Iglesia | B1 / ChurchApps |
|---|---|---|
| Cuenta de Twilio, facturación, propiedad de números | Son propietarios y los administran | No aprovisiona una cuenta de plataforma ni revende créditos |
| Marca, campaña, registro de números | Envía información precisa de la iglesia; gestiona la revisión y las correcciones | Explica los requisitos previos y lee la información de preparación disponible |
| Página de registro, políticas, finalidad de los mensajes | Los publica y los mantiene | Proporciona controles de formulario compatibles, ejemplos y registros de consentimiento |
| Elegibilidad de los destinatarios y manejo de STOP | Revisa las pruebas de consentimiento y las solicitudes recibidas fuera de SMS | Aplica el consentimiento, la supresión, los permisos y los webhooks firmados |
| Entrega y soporte | Vigila los errores de Twilio, el estado de la cuenta y las respuestas entrantes | Muestra el estado de envío y de entrega sin prometer garantías de aprobación |

Se aplaza una cuenta matriz de Twilio propiedad de ChurchApps, las subcuentas de clientes, la compra de números, las presentaciones a Trust Hub, la facturación, una bandeja de conversaciones, MMS/WhatsApp, el envío internacional y el registro de números gratuitos (toll-free). Los números gratuitos son una ruta separada de remitente verificado, no un atajo para el registro. Estos límites mantienen la primera versión alineada con el modelo existente de B1 de traer su propio proveedor.

## Base existente y brechas

Las siguientes observaciones están ligadas a instantáneas del código fuente, y no a una suposición sobre lo que está desplegado actualmente:

| Componente | Comportamiento existente | Implicación |
|---|---|---|
| [Registro y contrato de proveedores](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` tiene envíos individuales y masivos, validación, capacidades opcionales de suscriptor o lista, y un ID de mensaje del proveedor en los resultados. No hay ningún adaptador de Twilio registrado. | Añadir Twilio en `@churchapps/texting`; no necesita crear suscriptores ni listas gestionadas por el proveedor. |
| [Configuración de mensajes de texto](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church y Nalo se pueden seleccionar; MinistryStuff está restringido por funciones. La edición y el guardado del remitente son específicos de Nalo en este momento. | Añadir campos explícitos de Twilio, validación, guardado del remitente y ayuda de incorporación. Una entrada en el desplegable por sí sola no basta. |
| [Controlador](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) y [puerta de enlace del módulo](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Las credenciales están cifradas y enmascaradas; los envíos manuales y automatizados resuelven el proveedor de la iglesia. Los envíos a grupos eliminan los números de teléfono compartidos duplicados. | Reutilizar estas rutas y preservar la autorización. Colocar las nuevas puertas de consentimiento y preparación en una ruta común del servidor para que los flujos de trabajo no puedan saltárselas. |
| [Ayudante de STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Analiza `From`/`Body` con formato Twilio; valida un token de URL de la iglesia; establece `person.optedOut` y desactiva los recordatorios SMS. Las demás respuestas se ignoran. | Es un buen punto de partida, pero no un webhook de Twilio completo. Añadir firmas de Twilio y un estado de suscripción SMS independiente. |
| [Esquema de mensajería](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Almacena `apiKey`, `apiSecret` y un `fromNumber` de 20 caracteres; los registros de entrega guardan el éxito o error inmediato, no los ID de proveedor ni los estados finales de entrega. | Un remitente en E.164 encaja; un SID de Messaging Service de 34 caracteres necesita su propio campo. Añadir almacenamiento durable del ID y del estado del mensaje del proveedor. |
| [Página pública de formularios](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [renderizador compartido de formularios](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) y [controlador de envíos](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Existen formularios sin restricciones y casillas opcionales. Las descripciones son texto plano. Los envíos conservan las respuestas, pero la ruta de mensajes de texto no tiene un registro de consentimiento específico de la campaña. | Añadir un control configurado de consentimiento SMS con enlaces reales a las políticas y captura de pruebas en el servidor; una casilla genérica o la pertenencia a un grupo no deben autorizar SMS automáticamente. |

La [documentación de configuración de la iglesia](../../b1-admin/settings/church-settings#texting) para usuarios finales también explica que la marca actual de exclusión comparte valor con la privacidad del directorio. Este acoplamiento es un problema para el lanzamiento: responder START nunca debe cambiar la visibilidad en el directorio.

## Diseño de configuración y credenciales

Use campos de configuración explícitos y aditivos, en lugar de sobrecargar `fromNumber` o guardar datos estructurados en una cadena de clave de API:

| Campo | Propósito propuesto |
|---|---|
| `accountSid` | Identificador de la cuenta/proyecto de Twilio de propiedad de la iglesia (`AC…`) |
| `apiKey`, `apiSecret` | SID de la clave de API de Twilio (`SK…`) dedicada y su secreto para el acceso de envío a la API; cifrados y enmascarados |
| `webhookAuthToken` | Auth Token de la cuenta que usa el SDK de Twilio para validar las firmas entrantes; cifrado y enmascarado por separado |
| `messagingServiceSid` | Messaging Service de la iglesia (`MG…`, 34 caracteres) |
| `fromNumber` | Número compatible con SMS seleccionado en formato E.164, verificado como remitente en esa cuenta/servicio |
| Configuración del programa | ID estable del programa, nombre, finalidades permitidas, URL de registro/políticas y versión de la divulgación |

Twilio [prefiere las claves de API para la autenticación REST](https://www.twilio.com/docs/iam/api-keys). Use los permisos de clave más restringidos y probados que cubran el envío y las comprobaciones de configuración de solo lectura necesarias. El Auth Token de la cuenta sigue siendo necesario para la [comprobación estándar de firma de webhook de Twilio](https://www.twilio.com/docs/usage/security). Explique esta distinción en la interfaz: un secreto de API no es un Auth Token de webhook. Mantenga las credenciales exclusivamente en el almacén de configuración del servidor, nunca en páginas públicas, respuestas de formularios, solicitudes de envío desde el navegador ni incidencias de soporte.

La iglesia crea y gestiona estos recursos en la Consola. La acción de validación de B1 solo debe leer el servicio, los remitentes y la información de registro configurados. No debe comprar números, crear campañas, cambiar la configuración de Twilio ni enviar un mensaje de prueba como efecto secundario. Proporcione una acción aparte de envío de prueba explícita, limitada a un destinatario elegible que haya dado su consentimiento.

Conserve las credenciales enmascaradas solo al editar el mismo proveedor guardado. Cambiar a Twilio debe exigir sus propias credenciales y borrar los valores obsoletos específicos del proveedor; no traslade una clave enmascarada de Clearstream o Nalo a una configuración de Twilio.

Limite cada carga o actualización a la iglesia de B1 autenticada. Vincule las devoluciones de llamada a una integración guardada y a la cuenta/servicio/remitente de Twilio esperados, y rechace las asignaciones cruzadas en conflicto entre iglesias. La rotación de credenciales y la desconexión del proveedor deben invalidar la preparación y pausar los envíos en cola, sin borrar el consentimiento ni los registros históricos de entrega.

## El consentimiento y la supresión son trabajo obligatorio para el lanzamiento

Introduzca registros de suscripción vinculados al teléfono para el programa de Twilio, además de eventos de consentimiento/supresión solo de adición. El mínimo sugerido como prueba es: ID de la iglesia, ID del programa, teléfono normalizado, asociación opcional y verificada con una persona, acción afirmativa, ID del formulario/envío de origen o prueba externa revisada, marca de tiempo del servidor, texto y versión de la divulgación, URL de origen, URL de las políticas y eventos de retirada/reinicio. Limite el acceso y la retención según la política de seguridad de datos existente de la iglesia.

Use estados como `unknown`, `pending`, `active` y `suppressed`. Los números móviles existentes, los contactos importados, la asistencia, los donativos, la pertenencia a grupos, `person.optedOut = false` y `allowSms` no son consentimiento afirmativo para el programa. Importar un consentimiento documentado debe ser una acción auditada y con permisos, con un origen registrado; una migración no debe inscribir a todo el mundo.

Para el flujo web inicial, use el modo estándar de formulario público de B1. Añada una pregunta de consentimiento SMS configurada explícitamente, que empiece desmarcada, siga siendo opcional, muestre enlaces de políticas en los que se pueda hacer clic, y se asigne a un programa y un campo de móvil. Valide esa asignación en el servidor y guarde una copia de la divulgación mostrada al guardar una respuesta afirmativa. Nunca derive el consentimiento de las etiquetas arbitrarias de las preguntas, de la IA conversacional ni de la pertenencia a un flujo de trabajo. Habilite un equivalente conversacional solo después de probar su interacción afirmativa explícita y el registro de pruebas.

Un envío sin marcar no crea ninguna suscripción y no debe retirar el consentimiento existente de otra persona. Vincule el consentimiento al teléfono enviado; el personal puede resolver las asociaciones de personas ambiguas sin fusionar registros de hogares. Un número móvil cambiado necesita su propio consentimiento. En los formularios anónimos, aplique controles contra el abuso y haga explícito cualquier paso de verificación de la titularidad del número o de doble confirmación; una casilla marcada por sí sola no prueba quién es el propietario de un teléfono. Si se usa una confirmación, deje la suscripción pendiente hasta completarla y describa ese flujo exacto en los materiales de registro.

En Twilio, separe la supresión de SMS de la visibilidad en el directorio. Migre de forma conservadora cualquier exclusión heredada a un registro de supresión; deje a los demás destinatarios heredados como `unknown`. Una inscripción nueva, explícita y documentada puede establecer el consentimiento SMS mientras la privacidad del directorio permanece sin cambios. Conserve el comportamiento de otros proveedores hasta que sus migraciones se revisen por separado.

En cada envío real, exija que la integración de la iglesia esté habilitada y lista, que exista consentimiento vigente del programa para el teléfono exacto, que no haya supresión a nivel de teléfono y que el llamador tenga el permiso existente. Los recordatorios respetan además `allowSms`, las preferencias por categoría y las horas de silencio. Vuelva a comprobar después de encolar, resuelva los campos de combinación, normalice y valide los números, y elimine duplicados por teléfono. STOP suprime todos los envíos del servicio o programa, incluidos los manuales y los de flujos de trabajo; también debe cubrir a cada persona que comparta ese teléfono.

Muestre de forma coherente la identidad de la iglesia y la instrucción de STOP en la ruta común de envío de Twilio, y previsualice el recuento final de SMS y segmentos. La expansión de campos de combinación y el manejo de la longitud deben preservar esos elementos; no trunque en silencio la instrucción de baja. Mantenga alineados los ejemplos con las plantillas reales de recordatorios y de flujos de trabajo.

## Envíos, respuestas y estado de entrega de Twilio

Implemente `TwilioProvider.sendMessage` a través de la API de mensajes con el Messaging Service y el remitente seleccionados. Devuelva un SID de mensaje del proveedor y un resultado de aceptado/enviado; la aceptación HTTP no es la entrega al teléfono. Un envío a grupo usa resultados por destinatario en el orden de entrada.

Limite la concurrencia de salida tanto para `sendBulk` como para los envíos individuales: la rama actual de campos de combinación distribuye llamadas a `sendMessage`. Persista la intención de envío y el trabajo reclamable para los grupos que no caben en un presupuesto de solicitud; reutilice el modelo de despliegue existente en lugar de exigir a las iglesias que ejecuten otro servicio. Reintente los fallos transitorios conocidos o por límite de frecuencia con retroceso exponencial. Trate los tiempos de espera ambiguos como resultados desconocidos que deben conciliarse, no como una instrucción de reenviar a ciegas y arriesgar mensajes y cargos duplicados.

Configure URL de devolución de llamada de entrada y de estado específicas para cada iglesia. Valide `X-Twilio-Signature` con el SDK, la URL externa exacta configurada, los parámetros originales del formulario y el Auth Token de la cuenta correspondiente. Un URL secreta por sí sola no basta. Asocie las devoluciones de llamada a los registros guardados de iglesia/cuenta/mensaje, gestione los duplicados y las devoluciones que llegan antes de que se confirme el resultado del envío, y evite que los eventos antiguos sobrescriban un estado terminal. Devuelva TwiML vacío como acuse de recibo de un mensaje entrante y una respuesta de éxito adecuada para los eventos de estado. [Seguridad de Twilio](https://www.twilio.com/docs/usage/security), [devoluciones de llamada de estado](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Recomiende **Advanced Opt-Out** de Messaging Service. Twilio gestiona las confirmaciones de STOP/START/HELP; B1 consume los eventos `OptOutType` autenticados sin enviar confirmaciones duplicadas. STOP registra la supresión de inmediato. START restaura solo una suscripción conocida a este mismo programa divulgado, con un nuevo evento de reinicio; no debe inscribir a un teléfono nuevo en mensajes no relacionados ni activar preferencias de recordatorios. HELP no inscribe a nadie. Las demás respuestas entrantes quedan fuera del alcance de la bandeja de B1; las iglesias necesitan una forma documentada de supervisarlas en Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Guarde el SID del mensaje de Twilio, la vinculación cuenta/servicio, la hora de envío, el estado final/código de error y la hora de la devolución de llamada junto con el registro de entrega. Muestre con precisión los estados en cola/aceptado, entregado, fallido, no entregado o desconocido. Mantenga el contrato de respuesta existente para los demás proveedores y defina si los recuentos agregados de éxito representan envío o entrega.

## Preparación de la configuración y validación de la aprobación

Muestre puntos de control distintos para las credenciales, la titularidad del servicio/remitente, la verificación de la campaña, el registro del número, las comprobaciones del webhook y una prueba de humo entregada. Nunca muestre una sola insignia verde de "aprobado" solo porque las credenciales funcionen.

Para los números locales de EE. UU., lea el [recurso de campaña Usa2p](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) del servicio y exija que la campaña correspondiente esté `VERIFIED`. Verifique por separado que el teléfono seleccionado esté asociado a ese servicio y haya completado el registro del número: una campaña aprobada puede tener un número todavía pendiente. Cuando una API de lectura compatible no exponga una señal necesaria, muestre **se requiere verificación manual en la Consola** y registre la confirmación fechada del administrador de la iglesia como tal; no la etiquete como verificada por API. Los eventos automáticos de registro de números pueden quedar para un seguimiento posterior. [Errores de registro de números](https://www.twilio.com/docs/api/errors/30035), [eventos de registro A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Exija comprobaciones vigentes antes de habilitar los envíos; registre cuándo y cómo se comprobó la preparación, caduque las comprobaciones obsoletas y pause ante credenciales revocadas, remitentes cambiados, fallos de registro o errores persistentes de la cuenta. Que una prueba de humo se entregue confirma la ruta probada, no la aprobación universal de la operadora ni el consentimiento del destinatario. El borrador complementario especifica las comprobaciones operativas previas a la presentación, previas al lanzamiento y continuas de la iglesia.

## Plan de repositorios y lanzamiento

La [guía de contribución de la organización](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) dirige las solicitudes de funciones de B1 a ChurchAppsSupport y las PR de implementación a los repositorios responsables. Use una única solicitud central de función y enlace las PR de implementación enfocadas a ella:

1. **ChurchAppsSupport:** revisar este diseño y su borrador de incorporación antes de presentar Twilio como una función disponible para el usuario.
2. **Packages:** añadir el adaptador de Twilio, la configuración e interfaces compartidas explícitas, y el renderizado del formulario de consentimiento SMS donde lo compartan B1Admin/B1App. Incluya changesets y publique mediante el flujo de lanzamiento existente antes de actualizar a los consumidores.
3. **Api:** añadir migraciones aditivas para los metadatos de integración, el consentimiento/la supresión y los estados de entrega; implementar la validación de la configuración, las puertas de envío compartidas, la captura de pruebas de formularios, el manejo de webhooks y la persistencia del despacho.
4. **B1Admin:** añadir la interfaz de configuración y preparación de Twilio, la gestión de programas y consentimientos, el guardado de remitentes consciente del proveedor y los informes de entrega precisos. No exponer ninguna anulación del consentimiento SMS mediante ediciones ordinarias de personas.
5. **B1App:** verificar la experiencia pública de formularios y páginas, y los enlaces a políticas, frente a los controles compartidos, incluidos los visitantes anónimos y los que usan el móvil. No se necesita un cliente de navegador aparte para Twilio.
6. **ChurchAppsSupport:** después del lanzamiento, convertir el borrador de incorporación en páginas de ayuda y configuración compatibles, añadir capturas de pantalla reales, enlazarlo desde la configuración de Mensajes de texto y organizar las traducciones.

Despliegue primero el esquema y los paquetes compartidos, y después los consumidores. Limite Twilio a una pequeña prueba piloto con participación voluntaria; los proveedores existentes deben seguir funcionando. El rollback desactiva el despacho de Twilio y cancela los trabajos no enviados, pero conserva las exclusiones y las pruebas; no debe cambiar automáticamente a los destinatarios a otro proveedor ni a otro remitente.

## Estimación de esfuerzo

Estimación de planificación para un colaborador familiarizado con el ecosistema; no se usaron credenciales de producción ni SMS reales en esta evaluación:

| Trabajo | Días de desarrollo |
|---|---|
| Adaptador, extensiones de configuración y de esquema, interfaz de configuración | 2–3 |
| Consentimiento por teléfono y programa, supresión independiente, puertas de envío compartidas, integración del formulario público | 3–5 |
| Devoluciones de llamada firmadas, persistencia de entregas, despacho acotado y durable | 2–3 |
| Interfaz de preparación, guía para iglesias, pruebas de integración y de regresión, correcciones de la prueba piloto | 3–4 |
| **Alcance de lanzamiento recomendado** | **10–15 en total** |

Una prueba de concepto básica del adaptador y de la configuración toma aproximadamente de 1 a 2 días. Una estimación solo de remitente excluye el trabajo de consentimiento y de incorporación necesario para esta recomendación. El tiempo de revisión externa de Twilio y de las operadoras es aparte y variable; el proyecto no debe prometer una fecha ni un resultado de aprobación.

## Criterios de aceptación

- [ ] La iglesia es propietaria y paga la cuenta, el servicio, el remitente registrado y la campaña; no se requiere una cuenta de Twilio gestionada por ChurchApps.
- [ ] Las credenciales están cifradas y enmascaradas, limitadas al inquilino, son rotables y no aparecen en los registros ni en el contenido público; la validación es de solo lectura.
- [ ] El consentimiento opcional desmarcado muestra enlaces reales a las políticas y guarda en el servidor la prueba del programa, el teléfono y la divulgación; rechazar el consentimiento sigue permitiendo la acción principal del formulario.
- [ ] Todas las rutas manuales, de grupo, de campos de combinación, de flujos de trabajo y de recordatorios aplican la misma puerta de elegibilidad de Twilio. Los destinatarios desconocidos, sin consentimiento, con teléfono cambiado o suprimidos se omiten con un motivo útil; el renderizado preserva la identidad de la iglesia y las instrucciones de STOP después de la expansión y del manejo de longitud.
- [ ] La privacidad heredada del directorio no inscribe a destinatarios; STOP/START nunca cambian la visibilidad en el directorio ni preferencias no relacionadas. Los casos de teléfono compartido y de asignación entre iglesias están probados.
- [ ] Se prueban STOP/START/HELP firmados, firmas no válidas, cuentas o servicios incorrectos, eventos duplicados, envíos de formulario repetidos y asignaciones de consentimiento falsificadas.
- [ ] Se prueban el tamaño de grupo y los tiempos de espera, los límites de frecuencia, los fallos parciales, los resultados ambiguos, las carreras entre devoluciones de llamada y los eventos de entrega fuera de orden, sin envíos duplicados.
- [ ] La aprobación de la campaña y el registro completado del número son distintos de la validación de credenciales. La evidencia manual está claramente etiquetada; una preparación obsoleta o revocada bloquea los envíos.
- [ ] Una iglesia piloto revisa su página de registro, las rutas de formulario rechazadas y aceptadas, las URL exactas de las políticas y a un destinatario de prueba que dé su consentimiento a través del envío, la entrega, la supresión por STOP y la nueva suscripción permitida.
- [ ] Las configuraciones y el comportamiento de envío existentes de Clearstream, Text In Church y Nalo pasan las comprobaciones de regresión; el texto de ayuda distingue las propuestas de las funciones lanzadas.
