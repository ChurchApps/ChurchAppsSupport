---
title: "B1App"
---

# B1App

<div class="article-intro">

B1App es la aplicación de miembro de iglesia de cara al público construida con Next.js. Proporciona la experiencia del miembro incluyendo perfiles, directorios de grupos, transmisión en directo y páginas de donación.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Instalar **Node.js 22+** y **Git** -- ver [Requisitos Previos](../setup/prerequisites)
- Configurar su objetivo de API (preparación o local) -- ver [Variables de Entorno](../setup/environment-variables)

</div>

:::warning
B1App requiere Node.js 22 o posterior. Las versiones anteriores no se admiten.
:::

## Configuración

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/B1App.git
```

### 2. Instalar dependencias

```bash
cd B1App
npm install
```

### 3. Configurar variables de entorno

```bash
cp dotenv.sample.txt .env
```

Abra `.env` y configure las URL de punto de conexión `NEXT_PUBLIC_*_API`. Estas pueden apuntar a la API de preparación o su instancia de API local.

### 4. Iniciar el servidor de desarrollo

```bash
npm run dev
```

El servidor de desarrollo de Next.js se inicia en [http://localhost:3301](http://localhost:3301).

## Comandos Clave

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo de Next.js en puerto 3301 |
| `npm run build` | Compilación de producción a través de Next.js |
| `npm run test` | Ejecutar pruebas de extremo a extremo con Playwright |
| `npm run lint` | Ejecutar linting de Next.js |

## Variables de Entorno Clave

| Variable | Descripción |
|----------|-------------|
| `NEXT_PUBLIC_*_API` | URLs de punto de conexión de API para cada módulo |

:::info
El script `postinstall` copia archivos de configuración regional y CSS de `@churchapps/apphelper`. Si los componentes se ven sin estilos después de instalar, ejecute `npm run postinstall` manualmente.
:::

## Pila Tecnológica

- **Next.js 16** con TypeScript
- **React 19** para componentes de interfaz de usuario
- **Material-UI 7** para sistema de diseño
- **React Query 5** para estado del servidor
- Paquetes `@churchapps/apphelper*` para componentes compartidos

## Despliegue

Las compilaciones de producción se despliegan en **S3 + CloudFront**:

1. `npm run build` genera la compilación de Next.js optimizada
2. La salida de compilación se sincroniza a un grupo S3
3. Se activa la invalidación de CloudFront para servir la nueva versión

:::tip
Para instrucciones de despliegue detalladas, ver la guía [Despliegue de Aplicación Web](../deployment/web-apps).
:::
