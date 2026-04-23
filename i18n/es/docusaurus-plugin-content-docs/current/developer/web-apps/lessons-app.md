---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp es la aplicación de gestión de contenido de lecciones para [Lessons.church](https://lessons.church). Proporciona una interfaz para crear, organizar y publicar planes de estudios de lecciones de iglesia, construida con Next.js y React.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js 22+** y **Git** -- ver [Requisitos Previos](../setup/prerequisites)
- Configurar su objetivo de API (preparación o local) -- ver [Variables de Entorno](../setup/environment-variables)

</div>

:::warning
LessonsApp requiere Node.js 22 o posterior. Las versiones anteriores no se admiten.
:::

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Instalar dependencias

```bash
cd LessonsApp
npm install
```

### 3. Configurar variables de entorno

Copie el archivo de muestra de entorno a `.env` y configure los puntos de conexión de API:

```bash
cp dotenv.sample.txt .env
```

Actualice las URLs de punto de conexión de API para apuntar a la API de preparación o su instancia de API local.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor de desarrollo de Next.js se inicia en [http://localhost:3501](http://localhost:3501).

## Comandos Clave

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo de Next.js en puerto 3501 |
| `npm run build` | Compilación de producción a través de Next.js |

## Pila Tecnológica

- **Next.js 16** con TypeScript
- **React 19** para componentes de interfaz de usuario
- Paquetes `@churchapps/apphelper*` para componentes compartidos

:::info
LessonsApp se comunica con el backend de **LessonsApi**, que es una API separada de la API principal de ChurchApps. Asegúrese de que su entorno esté configurado con el punto de conexión correcto de Lessons API.
:::

## Despliegue

Las compilaciones de producción se despliegan en **S3 + CloudFront**:

1. `npm run build` genera la compilación optimizada de Next.js
2. La salida de compilación se sincroniza a un grupo S3
3. Se activa la invalidación de CloudFront para servir la nueva versión

:::tip
Para instrucciones de despliegue detalladas, ver la guía [Despliegue de Aplicación Web](../deployment/web-apps).
:::
