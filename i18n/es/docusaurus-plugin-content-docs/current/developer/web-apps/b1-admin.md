---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin es el panel de administración de la iglesia -- una aplicación de una sola página React construida con Vite y Material-UI. El personal de la iglesia la utiliza para gestionar personas, grupos, asistencia, donaciones, contenido y más.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js 22+** y **Git** -- ver [Requisitos Previos](../setup/prerequisites)
- Configurar su objetivo de API (preparación o local) -- ver [Variables de Entorno](../setup/environment-variables)

</div>

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Instalar dependencias

```bash
cd B1Admin
npm install
```

### 3. Configurar variables de entorno

```bash
cp dotenv.sample.txt .env
```

Abra `.env` y configure los puntos de conexión de API. Puede apuntarlos a la API de preparación o a su instancia de API local.

### 4. Iniciar el servidor de desarrollo

```bash
npm start
```

Esto inicia el servidor de desarrollo de Vite. La aplicación estará disponible en su navegador con reemplazo de módulo en caliente habilitado.

## Variables de Entorno Clave

| Variable | Descripción |
|----------|-------------|
| `REACT_APP_STAGE` | Nombre de entorno (p. ej., `local`, `staging`, `prod`) |
| `PORT` | Puerto del servidor de desarrollo (predeterminado: `3101`) |
| `REACT_APP_*_API` | URLs de punto de conexión de API para cada módulo |

:::info
El script `postinstall` copia archivos de configuración regional y CSS de `@churchapps/apphelper`. Si los componentes se ven sin estilos, ejecute `npm run postinstall` manualmente.
:::

## Comandos Clave

| Comando | Descripción |
|---------|-------------|
| `npm start` | Iniciar servidor de desarrollo Vite |
| `npm run build` | Compilación de producción a través de Vite |
| `npm run test` | Ejecutar pruebas de extremo a extremo con Playwright |
| `npm run lint` | Ejecutar ESLint con auto-corrección |

## Pila Tecnológica

- **React 19** con TypeScript
- **Vite** para herramientas de compilación y servidor de desarrollo
- **Material-UI 7** para componentes de interfaz de usuario
- **React Query 5** para estado del servidor
- Paquetes `@churchapps/apphelper*` para componentes compartidos

## Despliegue

Las compilaciones de producción se despliegan en **S3 + CloudFront**:

1. `npm run build` genera activos estáticos
2. Los activos se sincronizan a un grupo S3
3. Se activa la invalidación de CloudFront para servir la nueva versión

:::tip
Para instrucciones de despliegue detalladas, ver la guía [Despliegue de Aplicación Web](../deployment/web-apps).
:::
