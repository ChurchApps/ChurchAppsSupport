---
title: "AppHelper"
---

# AppHelper

<div class="article-intro">

El paquete `@churchapps/apphelper` proporciona componentes React compartidos y utilidades para todas las aplicaciones web de ChurchApps. Expone módulos de características a través de puntos de entrada de subvía.

</div>

## Puntos de entrada

| Punto de entrada | Contenidos |
|-------------|----------|
| `@churchapps/apphelper` | Componentes principales |
| `@churchapps/apphelper/login` | Inicio de sesión |
| `@churchapps/apphelper/donations` | Donaciones |
| `@churchapps/apphelper/forms` | Formularios |
| `@churchapps/apphelper/website` | Constructor de sitios web |

## Configuración para desarrollo local

Este paquete vive en el espacio de trabajo [Packages](https://github.com/ChurchApps/Packages):

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages && yarn install
cd apphelper && yarn dev
```

## Artículos relacionados

- **[Helpers](./helpers)** -- Paquete de utilidades base
