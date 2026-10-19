---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App es la aplicación pública para los miembros de la iglesia, creada con Next.js. Ofrece la experiencia de miembro, incluidos los perfiles, los directorios de grupos, la transmisión en vivo y las páginas de donación.

</div>

<div class="prereqs">
<h4>Antes de empezar</h4>

- Instala **Node.js 22+** y **Git** -- consulta [Requisitos previos](../setup/prerequisites)
- Configura el destino de tu API (demo o local) -- consulta [Variables de entorno](../setup/environment-variables)

</div>

:::warning
B1App requiere Node.js 22 o posterior. Las versiones anteriores no son compatibles.
:::

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Instalar las dependencias

```bash
cd B1App
npm install
```

### 3. Configurar las variables de entorno

```bash
cp dotenv.sample.txt .env
```

Abre `.env` y configura las URL de los endpoints `NEXT_PUBLIC_*_API`. Pueden apuntar a la API de demostración compartida (`https://api.demo.churchapps.org`) o a tu instancia local de la API. El archivo de ejemplo puede seguir mencionando las URL de staging retiradas; reemplázalas.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor de desarrollo de Next.js se inicia en [http://localhost:3301](http://localhost:3301).

## Comandos principales

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Inicia el servidor de desarrollo de Next.js en el puerto 3301 |
| `npm run build` | Compilación de producción mediante Next.js |
| `npm run test` | Ejecuta las pruebas de extremo a extremo con Playwright |
| `npm run lint` | Ejecuta el linter de Next.js |

## Variables de entorno principales

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URL de los endpoints de la API para cada módulo |

:::info
El script `postinstall` copia los archivos de idioma y CSS de `@churchapps/apphelper`. Si los componentes se ven sin estilos después de la instalación, ejecuta `npm run postinstall` manualmente.
:::

## Pila tecnológica

- **Next.js 16** con TypeScript
- **React 19** para los componentes de la interfaz
- **Material-UI 7** como sistema de diseño
- **React Query 5** para el estado del servidor
- **`@churchapps/apphelper*`** paquetes para los componentes compartidos

## Despliegue

Las compilaciones de producción se despliegan en **S3 + CloudFront**:

1. `npm run build` genera la compilación optimizada de Next.js
2. La salida de la compilación se sincroniza con un bucket de S3
3. Se lanza una invalidación de CloudFront para servir la nueva versión

:::tip
Para obtener instrucciones detalladas de despliegue, consulta la guía [Despliegue de aplicaciones web](../deployment/web-apps).
:::
