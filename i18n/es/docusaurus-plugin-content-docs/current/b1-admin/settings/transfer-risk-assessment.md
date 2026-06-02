---
title: "Evaluación de riesgo de transferencia"
---

# Evaluación de riesgo de transferencia

<div class="article-intro">

Este documento registra la evaluación de ChurchApps de riesgos asociados con transferencias internacionales de datos personales desde el Reino Unido/EEA a los Estados Unidos, según lo requerido bajo UK GDPR y EU GDPR. Este es un registro de cumplimiento interno mantenido por ChurchApps como procesador de datos.

</div>

**Última revisión:** Abril de 2026

## 1. Detalles de transferencia

| Elemento | Detalle |
|---|---|
| **Exportador de datos** | Iglesias que usan ChurchApps (Controladores de datos) ubicadas en el Reino Unido/EEA |
| **Importador de datos** | ChurchApps (Procesador de datos), operando desde los Estados Unidos |
| **Categorías de sujetos de datos** | Miembros de iglesia, asistentes, visitantes, donantes, voluntarios, niños (gestionados por padres/administradores) |
| **Categorías de datos personales** | Nombres, direcciones de correo electrónico, números de teléfono, direcciones postales, fechas de nacimiento, género, estado civil, fotos de perfil, registros de donación, registros de asistencia, membresías de grupo, asignaciones de voluntarios, historial de mensajería |
| **Datos sensibles** | Ninguno recopilado intencionalmente. No se almacenan datos de salud, datos biométricos ni antecedentes penales. ChurchApps nunca almacena detalles de cuentas financieras (tarjetas de crédito, cuentas bancarias) -- estas son manejadas directamente por Stripe. |
| **Propósito de la transferencia** | Proporcionar servicios de software de gestión de iglesia (gestión de miembros, donaciones, seguimiento de asistencia, comunicaciones, programación de voluntarios, registro de eventos) |
| **País de destino** | Estados Unidos |
| **Mecanismo de transferencia** | Cláusulas contractuales estándar de la UE (SCCs) y Apéndice de transferencia de datos internacional del Reino Unido (IDTA), incorporadas a través de la Adenda de procesamiento de datos de AWS |

## 2. Subprocesadores

| Subprocesador | Rol | Ubicación | Mecanismo de transferencia |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Alojamiento de infraestructura, almacenamiento de datos, entrega de contenido (región us-east-2) | Estados Unidos | AWS DPA con SCCs (incluidas automáticamente en los términos de servicio de AWS) |
| **Stripe** | Procesamiento de pagos para donaciones | Estados Unidos | Stripe DPA con SCCs |

Los datos de tarjetas de crédito y cuentas bancarias se transmiten directamente desde el navegador del usuario a Stripe y nunca se almacenan en o se transmiten a través de servidores de ChurchApps.

## 3. Evaluación de riesgo

### 3.1 Encriptación

- **En tránsito:** Todos los datos están encriptados utilizando TLS/HTTPS para todas las comunicaciones entre usuarios y servidores de ChurchApps.
- **En reposo:** Los datos almacenados en AWS se encriptan en reposo usando encriptación administrada por AWS.

### 3.2 Controles de acceso

- El acceso al servidor de producción se limita a dos individuos que son miembros de la junta directiva de ChurchApps.
- Los desarrolladores, voluntarios y otros miembros de la junta no tienen acceso a servidores de producción ni bases de datos.
- Los servidores de base de datos están detrás de un firewall y no son directamente accesibles desde Internet.
- Los datos de la iglesia se separan lógicamente -- cada iglesia solo puede acceder a sus propios datos a través de controles de acceso a nivel de aplicación.

### 3.3 Segregación de datos

Los datos se distribuyen en seis bases de datos independientes (Membresía, Donaciones, Asistencia, Mensajería, Hacer, Contenido). La compensación de una base de datos no expone datos de las otras. Por ejemplo, la base de datos de Donaciones contiene montos de donaciones y fechas pero no los nombres o información de contacto de los donantes (almacenados en Membresía).

### 3.4 Minimización de datos

- No se almacena información de tarjeta de crédito o cuenta bancaria (manejada por Stripe).
- Las contraseñas se almacenan usando hash unidireccional y no se pueden recuperar.
- Las iglesias controlan qué datos recopilan de sus miembros.

### 3.5 Derechos del sujeto de datos

ChurchApps proporciona herramientas técnicas que permiten a las iglesias cumplir con solicitudes de sujetos de datos:

- **Acceso y portabilidad:** Exportación completa de datos en formato JSON legible por máquina.
- **Eliminación:** Anonimización en las seis bases de datos, reemplazando datos personales con valores genéricos mientras se conservan registros agregados requeridos para reportes financieros.
- **Restricción:** El estado de membresía inactivo excluye individuos de búsqueda, directorio, reportes y mensajería mientras retiene su registro.
- **Rectificación:** Los miembros y administradores pueden editar información personal a través de la aplicación.

### 3.6 Notificación de incumplimiento

ChurchApps se compromete a notificar a las iglesias afectadas dentro de 72 horas después de enterarse de un incumplimiento de datos personales, como se documenta en los [Términos de servicio](https://churchapps.org/terms) (Sección 11.6).

### 3.7 Riesgo de acceso del gobierno estadounidense

El riesgo principal asociado con datos alojados en EE.UU. es el acceso potencial de autoridades del gobierno estadounidense bajo la sección 702 de FISA u Orden ejecutiva 12333. Este riesgo se evalúa como **bajo** por las siguientes razones:

- ChurchApps procesa datos de membresía y asistencia de iglesia, no datos de valor de inteligencia.
- Los sujetos de datos son miembros de iglesia y asistentes -- no categorías típicamente dirigidas por programas de vigilancia.
- No se almacena datos personales sensibles (salud, cuentas financieras, opiniones políticas).
- El DPA de AWS incluye compromisos con respecto a solicitudes de acceso del gobierno e informes de transparencia.
- El Marco de privacidad de datos UE-EE.UU. (establecido en 2023) proporciona protecciones adicionales para transferencias de datos a organizaciones estadounidenses certificadas.

## 4. Conclusión general de riesgo

El riesgo para los sujetos de datos de esta transferencia internacional se evalúa como **bajo**. La combinación de:

- Cláusulas contractuales estándar como mecanismo de transferencia legal
- Encriptación en tránsito y en reposo
- Controles de acceso estricto con solo dos individuos autorizados
- Segregación de datos en bases de datos independientes
- Sin almacenamiento de detalles de cuentas financieras
- Baja sensibilidad y bajo valor de inteligencia de los datos procesados
- Herramientas técnicas para ejercer todos los derechos del sujeto de datos

proporciona medidas complementarias adecuadas para asegurar que los datos transferidos reciban un nivel de protección esencialmente equivalente al garantizado dentro del Reino Unido/EEA.

## 5. Programa de revisión

Esta evaluación será revisada anualmente o cuando hay un cambio material en el procesamiento de datos, subprocesadores o marco legal que rige transferencias internacionales de datos.
