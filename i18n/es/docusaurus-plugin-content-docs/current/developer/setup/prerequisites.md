---
title: "Requisitos Previos"
---

# Requisitos Previos

<div class="article-intro">

Las herramientas que necesita dependen de qué proyectos planea en los que trabajar. Esta página enumera todo el software requerido organizado por área de desarrollo, desde los requisitos universales hasta las cadenas de herramientas específicas de la plataforma.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Revisar la [Descripción General del Proyecto](./project-overview) para determinar qué proyectos desea en los que trabajar
- Tener acceso de administrador en su máquina de desarrollo para instalar software

</div>

## Todos los Proyectos

Estos son requeridos independientemente de qué proyecto trabaje:

| Herramienta | Versión | Notas |
|------|---------|-------|
| **Node.js** | 20+ | Versión 22+ requerida para B1App y LessonsApp (Next.js 16) |
| **npm** | Viene con Node.js | Se utiliza como gestor de paquetes en todos los proyectos |
| **Git** | Más Reciente | Cada proyecto es un repositorio separado |

:::tip
Utilice un gestor de versiones de Node como [nvm](https://github.com/nvm-sh/nvm) (macOS/Linux) o [nvm-windows](https://github.com/coreybutler/nvm-windows) (Windows) para cambiar entre versiones de Node fácilmente.
:::

## Desarrollo de API Backend

Si planea ejecutar la API localmente (en lugar de apuntar a preparación):

| Herramienta | Versión | Notas |
|------|---------|-------|
| **MySQL** | 8.0+ | Cada módulo de API utiliza su propia base de datos |

Necesitará seis bases de datos para la API principal: `membership`, `attendance`, `content`, `giving`, `messaging` y `doing`. La API incluye scripts para inicializar el esquema -- ver la guía [configuración local de API](../api/local-setup).

## Desarrollo de Aplicación Móvil

Para B1Mobile, B1Checkin, LessonsScreen u otras aplicaciones React Native / Expo:

| Herramienta | Versión | Notas |
|------|---------|-------|
| **Expo CLI** | Más Reciente | Instalar globalmente: `npm install -g expo-cli` |
| **Android Studio** | Más Reciente | Requerido para desarrollo de Android (incluye SDK de Android) |
| **Xcode** | Más Reciente | Requerido para desarrollo de iOS (solo macOS) |

:::info
Puede utilizar la aplicación Expo Go en un dispositivo físico para pruebas rápidas sin Android Studio o Xcode. Sin embargo, compilar binarios de producción requiere las cadenas de herramientas nativas.
:::

## Desarrollo de FreeShow (Aplicación de Escritorio)

FreeShow tiene dependencias de compilación nativa adicionales porque compila módulos de Node nativos (como `canvas`):

### Todas las Plataformas

| Herramienta | Versión | Notas |
|------|---------|-------|
| **Python** | 3.12 | Requerido por `node-gyp` para compilación de módulos nativos |
| **setuptools** | Más Reciente | Instalar vía `pip install setuptools` |

### Windows

| Herramienta | Notas |
|------|-------|
| **Visual Studio** | La edición Community es suficiente |
| **"Desktop development with C++" workload** | Seleccionar durante la instalación de Visual Studio |
| **Windows 10 SDK** | Incluido en la carga de trabajo de C++; asegúrese de que esté marcado |

Puede instalar las herramientas de compilación de Visual Studio a través de la línea de comando:

```bash
npm install --global windows-build-tools
```

O instale Visual Studio Community y seleccione la carga de trabajo "Desktop development with C++" durante la instalación.

### Linux

```bash
sudo apt-get install libfontconfig1-dev
```

### macOS

Las Herramientas de Línea de Comando de Xcode suelen ser suficientes:

```bash
xcode-select --install
```

## Verificar Su Instalación

Ejecute estos comandos para confirmar que todo está instalado:

```bash
node --version    # Debe imprimir v20.x.x o superior
npm --version     # Debe imprimir 10.x.x o superior
git --version     # Debe imprimir git version 2.x.x
mysql --version   # Solo se necesita para desarrollo local de API
```

## Próximos Pasos

- **[Descripción General del Proyecto](./project-overview)** -- Ver todos los proyectos y qué hacen
- **[Variables de Entorno](./environment-variables)** -- Configurar sus archivos `.env`
