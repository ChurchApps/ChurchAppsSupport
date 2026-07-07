---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

El paquete `@churchapps/apihelper` proporciona utilidades del lado del servidor para todas las APIs de Express de ChurchApps. Incluye la clase controladora base, autenticación JWT, utilidades de base de datos e integraciones de AWS.

</div>

## Lo que se incluye

- **CustomBaseController** -- clase base para controladores de API
- **Auth** -- autenticación JWT vía `CustomAuthProvider`
- **Utilidades de base de datos** -- ayudantes de MySQL
- **Integraciones de AWS** -- `AwsHelper` para S3 y SSM Parameter Store
- **Email** -- `EmailHelper` con soporte SES y SMTP
- **Carga de configuración** -- `EnvironmentBase`

## Configuración para desarrollo local

Este paquete vive en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages):

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages && yarn install
yarn workspace @churchapps/apihelper build
```

## Artículos relacionados

- **[Helpers](./helpers)** -- Paquete de utilidades base
- **[Configuración local de API](../api/local-setup)**
