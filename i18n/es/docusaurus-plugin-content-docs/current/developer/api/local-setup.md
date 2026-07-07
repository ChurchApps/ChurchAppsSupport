---
title: "Configuración local de API"
---

# Configuración local de API

<div class="article-intro">

Esta guía te acompaña en la configuración de la API de ChurchApps para el desarrollo local. Clonarás el repositorio, configurarás las conexiones de la base de datos, inicializarás el esquema e iniciarás el servidor de desarrollo con recarga en caliente.

</div>

## Configuración paso a paso

### 1. Clonar el repositorio

```bash
git clone https://github.com/ChurchApps/Api.git
```

### 2. Instalar dependencias

```bash
cd Api
yarn install
```

### 3. Configurar variables de entorno

```bash
cp .env.sample .env
```

### 4. Inicializar las bases de datos

```bash
npm run initdb
```

### 5. Iniciar el servidor de desarrollo

```bash
npm run dev
```

## Comandos clave

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Iniciar servidor de desarrollo con recarga en caliente |
| `npm run build` | Compilar TypeScript |
| `npm run test` | Ejecutar pruebas con Jest |
