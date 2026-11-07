---
title: "Requisitos previos"
description: "Instala Node.js, npm, Git y las herramientas de tu plataforma antes de trabajar en proyectos de ChurchApps como B1 Admin, Lessons.church, FreePlay o la API."
---

# Requisitos previos

<div class="article-intro">

Las herramientas que necesita dependen de los proyectos en los que planee trabajar. Esta página enumera todo el software requerido, organizado por área de desarrollo, desde los requisitos universales hasta las cadenas de herramientas específicas de cada plataforma.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Revise la [Descripción general del proyecto](./project-overview.md) para determinar en qué proyectos quiere trabajar
- Tenga acceso de administrador en su equipo de desarrollo para instalar software

</div>

## Todos los proyectos

Estos son necesarios sin importar en qué proyecto trabaje:

| Herramienta | Versión | Notas |
|-------------|---------|-------|
| **Node.js** | 20+ | Se requiere la versión 22+ para B1App y LessonsApp (Next.js 16); 24+ para la API |
| **npm** | Incluido con Node.js | Se usa como gestor de paquetes en todos los proyectos |
| **Git** | Última versión | Cada proyecto es un repositorio separado |

:::tip
Use un gestor de versiones de Node como [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para cambiar entre versiones de Node fácilmente.
:::

## Desarrollo del backend (API)

Si planea ejecutar la API localmente (en lugar de apuntar a las API de demostración):

| Herramienta | Versión | Notas |
|-------------|---------|-------|
| **MySQL** | 8.0+ | Cada módulo de la API usa su propia base de datos |

Necesitará seis bases de datos para la API principal: `membership`, `attendance`, `content`, `giving`, `messaging` y `doing`. La API incluye scripts para inicializar el esquema; consulte la guía de [configuración local de la API](../api/local-setup.md).

## Desarrollo de aplicaciones móviles

Para B1Mobile, B1Checkin, LessonsScreen u otras aplicaciones de React Native / Expo:

| Herramienta | Versión | Notas |
|-------------|---------|-------|
| **Expo CLI** | Última versión | Instalación global: `npm install -g expo-cli` |
| **Android Studio** | Última versión | Requerido para desarrollo en Android (incluye el SDK de Android) |
| **Xcode** | Última versión | Requerido para desarrollo en iOS (solo macOS) |

:::info
Puede usar la aplicación Expo Go en un dispositivo físico para pruebas rápidas sin Android Studio ni Xcode. Sin embargo, para compilar binarios de producción se requieren las cadenas de herramientas nativas.
:::

## Desarrollo de FreeShow (aplicación de escritorio)

FreeShow tiene dependencias de compilación nativas adicionales porque compila módulos nativos de Node (como `canvas`):

### Todas las plataformas

| Herramienta | Versión | Notas |
|-------------|---------|-------|
| **Python** | 3.12 | Requerido por `node-gyp` para compilar módulos nativos |
| **setuptools** | Última versión | Instalar con `pip install setuptools` |

### Windows

| Herramienta | Notas |
|-------------|-------|
| **Visual Studio** | La edición Community es suficiente |
| **Carga de trabajo "Desarrollo de escritorio con C++"** | Selecciónela durante la instalación de Visual Studio |
| **Windows 10 SDK** | Incluido en la carga de trabajo de C++; asegúrese de que esté marcado |

Puede instalar las herramientas de compilación de Visual Studio desde la línea de comandos:

```bash
npm install --global windows-build-tools
```

O instale Visual Studio Community y seleccione la carga de trabajo "Desarrollo de escritorio con C++" durante la instalación.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Normalmente bastan las herramientas de línea de comandos de Xcode:

```bash
xcode-select --install
```

## Verificar su instalación

Ejecute estos comandos para confirmar que todo está instalado:

```bash
node --version    # Debe mostrar v20.x.x o superior
npm --version     # Debe mostrar 10.x.x o superior
git --version     # Debe mostrar git version 2.x.x
mysql --version   # Solo se necesita para el desarrollo local de la API
```

## Próximos pasos

- **[Descripción general del proyecto](./project-overview.md)**: vea todos los proyectos y lo que hace cada uno
- **[Variables de entorno](./environment-variables.md)**: configure sus archivos `.env`
