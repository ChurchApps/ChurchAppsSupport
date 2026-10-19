---
title: "B1 Admin"
---

# B1 Admin

<div class="article-intro">

B1Admin es el panel de administración de la iglesia: una aplicación de una sola página en React, creada con Vite y Material-UI. El personal de la iglesia la usa para gestionar personas, grupos, asistencia, donaciones, contenido y más.

</div>

<div class="prereqs">
<h4>Antes de comenzar</h4>

- Instala **Node.js 22+** y **Git**; consulta [Requisitos previos](../setup/prerequisites)
- Configura el destino de tu API (demo o local); consulta [Variables de entorno](../setup/environment-variables)

</div>

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/B1Admin.git
```

### 2. Instalar las dependencias

```bash
cd B1Admin
npm install
```

### 3. Configurar las variables de entorno

```bash
cp dotenv.sample.txt .env
```

Abre `.env` y configura los endpoints de la API. Puedes apuntarlos a la API de demostración compartida (`https://api.demo.churchapps.org`) o a tu instancia local de la API. El archivo de ejemplo todavía puede incluir URL de staging retiradas; reemplázalas.

### 4. Iniciar el servidor de desarrollo

```bash
npm start
```

Esto inicia el servidor de desarrollo de Vite. La aplicación estará disponible en tu navegador, con reemplazo de módulos en caliente (HMR) habilitado.

## Variables de entorno principales

| Variable | Descripción |
|----------|-------------|
| `REACT_APP_STAGE` | Nombre del entorno (por ejemplo, `demo` como en el archivo de ejemplo, `prod` o `selfhost`) |
| `PORT` | Puerto del servidor de desarrollo (predeterminado: `3101`) |
| `REACT_APP_*_API` | URL de los endpoints de la API para cada módulo |

:::info
El script `postinstall` copia los archivos de idioma y CSS de `@churchapps/apphelper`. Si los componentes se ven sin estilos, ejecuta `npm run postinstall` manualmente.
:::

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor de desarrollo de Vite |
| `npm run build` | Compilación de producción con Vite |
| `npm run test` | Ejecuta las pruebas de extremo a extremo con Playwright |
| `npm run lint` | Ejecuta ESLint con corrección automática |

## Stack tecnológico

- **React 19** con TypeScript
- **Vite** para las herramientas de compilación y el servidor de desarrollo
- **Material-UI 7** para los componentes de la interfaz
- **React Query 5** para el estado del servidor
- **`@churchapps/apphelper*`**: paquetes compartidos para los componentes comunes

## Despliegue

Las compilaciones de producción se despliegan en **S3 + CloudFront**:

1. `npm run build` genera los recursos estáticos
2. Los recursos se sincronizan con un bucket de S3
3. Se activa la invalidación de CloudFront para servir la nueva versión

:::tip
Para instrucciones de despliegue más detalladas, consulta la guía [Despliegue de aplicaciones web](../deployment/web-apps).
:::
