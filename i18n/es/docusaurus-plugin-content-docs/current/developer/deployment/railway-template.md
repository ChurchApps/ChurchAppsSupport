---
title: "Auto-Alojamiento en Railway"
---

# Auto-Alojamiento en Railway

<div class="article-intro">

ChurchApps publica una plantilla de un clic en [Railway](https://railway.com) que le da a tu iglesia su propia instancia privada de B1 Admin, el portal de miembros de B1, la API y una base de datos MySQL -- todo ejecutándose en infraestructura que posees y pagas directamente. Esta guía te pone en vivo en aproximadamente 15 minutos y luego te guía a través de la configuración post-despliegue que la mayoría de iglesias eventualmente desean.

</div>

## Inicio Rápido

[![Desplegar en Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Haz clic en el botón **Desplegar en Railway** arriba.
2. Inicia sesión en Railway (o crea una cuenta gratuita) y agrega un método de pago.
3. Haz clic en **Desplegar** sin cambiar nada -- cada variable tiene un valor predeterminado sensato.
4. Espera 5-10 minutos para que los cuatro servicios se vuelvan verdes.
5. Abre la URL del servicio **B1Admin**, haz clic en **Registrarse** y crea tu cuenta. La primera cuenta es automáticamente un administrador del servidor.
6. Sigue las indicaciones en la aplicación para crear tu primera iglesia.

Eso es. Ahora tienes una instancia de ChurchApps completamente funcional. Todo lo que sigue es opcional.

:::tip
El despliegue está actualmente en **beta**. Si encuentras algo que los documentos no cubren, abre una incidencia en [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) con registros de despliegue adjuntos.
:::

## Qué Se Despliega

La plantilla aprovisiona cuatro servicios en un único proyecto de Railway:

| Servicio | Propósito |
|---------|---------|
| **MySQL** | Almacena todos los datos |
| **Api** | Backend para membresía, contenido, donaciones, asistencia, etc. |
| **B1Admin** | Aplicación web de personal/administrador |
| **B1App** | Aplicación web orientada a miembros y sitio web de iglesia |

## Costos

Rangos del mundo real para una iglesia pequeña (menos de 200 miembros, tráfico ligero):

| Componente | Costo aproximado mensual |
|-----------|---------------------|
| Base de Railway | $5 |
| MySQL | $5 + ~$1 almacenamiento |
| 3 servicios web | $3-10 combinados |
| Volumen de 1 GB | $0.25 |
| **Total** | **~$15-25/mes** |

Los costos escalan linealmente con el tráfico, cargas de fotos y tamaño de base de datos.
