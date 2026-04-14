---
title: `"Evaluación de Riesgo de Transferencia`"
---

# Evaluación de Riesgo de Transferencia

<div class="article-intro">

Este documento registra la evaluación de ChurchApps de riesgos asociados con transferencias internacionales de datos personales del Reino Unido/EEA a los Estados Unidos, según lo requerido por UK GDPR y EU GDPR. Este es un registro de cumplimiento interno mantenido por ChurchApps como procesador de datos.

</div>

**Last reviewed:** (Última revisión) Abril 2026

## 1. Detalles de Transferencia

| Elemento | Detalle |
|---|---|
| **Data Exporter** (Exportador de Datos) | Iglesias usando ChurchApps (Controladores de Datos) ubicadas en UK/EEA |
| **Data Importer** (Importador de Datos) | ChurchApps (Procesador de Datos), operando desde los Estados Unidos |
| **Categories of Data Subjects** (Categorías de Sujetos de Datos) | Miembros de iglesia, asistentes, visitantes, donantes, voluntarios, niños (administrados por padres/administradores) |
| **Categories of Personal Data** (Categorías de Datos Personales) | Nombres, direcciones de correo electrónico, números de teléfono, direcciones postales, fechas de nacimiento, género, estado civil, fotos de perfil, registros de donaciones, registros de asistencia, membresías de grupos, asignaciones de voluntarios, historial de mensajería |
| **Sensitive Data** (Datos Sensibles) | Ninguno intencionalmente recopilado. No se almacena datos de salud, datos biométricos o antecedentes penales. Los detalles de cuentas financieras (tarjetas de crédito, cuentas bancarias) nunca se almacenan por ChurchApps -- estos se manejan directamente por Stripe. |
| **Purpose of Transfer** (Propósito de Transferencia) | Provisión de servicios de software de gestión de iglesia (gestión de miembros, donaciones, seguimiento de asistencia, comunicaciones, programación de voluntarios, registro de eventos) |
| **Destination Country** (País de Destino) | Estados Unidos |
| **Transfer Mechanism** (Mecanismo de Transferencia) | EU Standard Contractual Clauses (SCCs) e International Data Transfer Addendum (IDTA) del Reino Unido, incorporados a través del AWS Data Processing Addendum |

## 2. Sub-Procesadores

| Sub-Procesador | Rol | Ubicación | Mecanismo de Transferencia |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Hosting de infraestructura, almacenamiento de datos, entrega de contenido (región us-east-2) | Estados Unidos | AWS DPA con SCCs (automáticamente incluido en AWS Service Terms) |
| **Stripe** | Procesamiento de pagos para donaciones | Estados Unidos | Stripe DPA con SCCs |

Los datos de tarjeta de crédito y cuenta bancaria se transmiten directamente desde el navegador del usuario a Stripe y nunca se almacenan o transmiten a través de servidores de ChurchApps.

## 3. Evaluación de Riesgo

### 3.1 Encriptación

- **In transit** (En tránsito): Todos los datos se encriptan usando TLS/HTTPS para todas las comunicaciones entre usuarios y servidores de ChurchApps.
- **At rest** (En reposo): Los datos almacenados en AWS se encriptan en reposo usando encriptación administrada por AWS.

### 3.2 Controles de Acceso

- El acceso al servidor de producción se limita a dos individuos que son miembros de la junta directiva de ChurchApps.
- Los desarrolladores, voluntarios y otros miembros de la junta no tienen acceso a servidores de producción o bases de datos.
- Los servidores de base de datos están detrás de un cortafuegos y no son directamente accesibles desde internet.
- Los datos de iglesia se segregan lógicamente -- cada iglesia solo puede acceder a sus propios datos a través de controles de acceso a nivel de aplicación.

### 3.3 Segregación de Datos

Los datos se distribuyen en seis bases de datos independientes (Membership, Giving, Attendance, Messaging, Doing, Content). La comprensión de una base de datos no expone datos de las otras. Por ejemplo, la base de datos Giving contiene montos de donación y fechas pero no los nombres o información de contacto de donantes (almacenados en Membership).

### 3.4 Minimización de Datos

- Sin información de tarjeta de crédito o cuenta bancaria se almacena (manejado por Stripe).
- Las contraseñas se almacenan usando hashing unidireccional y no pueden recuperarse.
- Las iglesias controlan qué datos recopilan de sus miembros.

### 3.5 Derechos de Sujetos de Datos

ChurchApps proporciona herramientas técnicas que habilitan iglesias para cumplir solicitudes de sujetos de datos:

- **Access & Portability** (Acceso y Portabilidad): Exportación completa de datos en formato JSON legible por máquina.
- **Erasure** (Borrado): Anonimización en todas las seis bases de datos, reemplazando datos personales con valores genéricos mientras se preservan registros agregados requeridos para reportes financieros.
- **Restriction** (Restricción): Estado de membresía inactivo excluye individuos de búsqueda, directorio, reportes y mensajería mientras retiene su registro.
- **Rectification** (Rectificación): Miembros y administradores pueden editar información personal a través de la aplicación.

### 3.6 Notificación de Incumplimiento

ChurchApps se compromete a notificar iglesias afectadas dentro de 72 horas de enterarse de un incumplimiento de datos personales, como se documenta en los [Terms of Service](https://churchapps.org/terms) (Sección 11.6).

### 3.7 Riesgo de Acceso del Gobierno de EE.UU.

El riesgo principal asociado con datos alojados en EE.UU. es posible acceso por autoridades del gobierno estadounidense bajo FISA Section 702 o Executive Order 12333. Este riesgo se evalúa como **bajo** por las siguientes razones:

- ChurchApps procesa datos de membresía de iglesia y asistencia, no datos de valor de inteligencia.
- Los sujetos de datos son miembros de iglesia y asistentes -- no categorías típicamente enfocadas por programas de vigilancia.
- Sin datos personales sensibles (salud, cuentas financieras, opiniones políticas) se almacena.
- El DPA de AWS incluye compromisos respecto a solicitudes de acceso del gobierno y reportes de transparencia.
- El EU-US Data Privacy Framework (establecido 2023) proporciona salvaguardas adicionales para transferencias de datos a organizaciones estadounidenses certificadas.

## 4. Conclusión de Riesgo General

El riesgo a sujetos de datos de esta transferencia internacional se evalúa como **bajo**. La combinación de:

- Standard Contractual Clauses como mecanismo de transferencia legal
- Encriptación en tránsito y en reposo
- Controles de acceso estricto con solo dos individuos autorizados
- Segregación de datos en bases de datos independientes
- Sin almacenamiento de detalles de cuentas financieras
- Baja sensibilidad y bajo valor de inteligencia de los datos procesados
- Herramientas técnicas para ejercer todos los derechos de sujetos de datos

proporciona medidas suplementarias adecuadas para asegurar que los datos transferidos reciben un nivel de protección esencialmente equivalente a aquel garantizado dentro del UK/EEA.

## 5. Cronograma de Revisión

Esta evaluación será revisada anualmente o cuando hay un cambio material al procesamiento de datos, sub-procesadores o marco legal que rige transferencias de datos internacionales.