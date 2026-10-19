---
title: "LessonsApp"
---

# LessonsApp

<div class="article-intro">

LessonsApp es la aplicación de gestión de contenido de lecciones de [Lessons.church](https://lessons.church). Ofrece una interfaz para crear, organizar y publicar currículos de lecciones para iglesias, desarrollada con Next.js y React.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **Node.js 22+** y **Git**; consulta [Requisitos previos](../setup/prerequisites)
- Configura el destino de tu API (LessonsApi local); consulta [Variables de entorno](../setup/environment-variables)

</div>

:::warning
LessonsApp requiere Node.js 22 o posterior. Las versiones anteriores no son compatibles.
:::

## Configuración

### 1. Clona el repositorio

```bash
git clone https://github.com/ChurchApps/LessonsApp.git
```

### 2. Instala las dependencias

```bash
cd LessonsApp
npm install
```

### 3. Configura las variables de entorno

Copia el archivo de ejemplo de entorno a `.env` y configura los endpoints de la API:

```bash
cp dotenv.sample.txt .env
```

Actualiza las URL de los endpoints de la API para que apunten a tu instancia local de LessonsApi (`http://localhost:8090`). La API de lecciones de staging ya no está disponible, así que reemplaza cualquier URL `api.staging.lessons.church` que quede en el archivo de ejemplo.

### 4. Inicia el servidor de desarrollo

```bash
npm run dev
```

El servidor de desarrollo de Next.js se inicia en [http://localhost:3501](http://localhost:3501).

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo de Next.js en el puerto 3501 |
| `npm run build` | Compilación de producción mediante Next.js |

## Stack tecnológico

- **Next.js 16** con TypeScript
- **React 19** para los componentes de la interfaz
- Paquetes **`@churchapps/apphelper*`** para componentes compartidos

:::info
LessonsApp se comunica con el backend **LessonsApi**, que es una API separada de la API principal de ChurchApps. Asegúrate de que tu entorno esté configurado con el endpoint correcto de la API de lecciones.
:::

## Despliegue

Las compilaciones de producción se despliegan en **S3 + CloudFront**:

1. `npm run build` genera la compilación optimizada de Next.js
2. La salida de la compilación se sincroniza con un bucket de S3
3. Se activa una invalidación de CloudFront para servir la nueva versión

:::tip
Para instrucciones de despliegue detalladas, consulta la guía [Despliegue de aplicaciones web](../deployment/web-apps).
:::
