---
title: "Bibliotecas Compartidas"
---

# Bibliotecas Compartidas

<div class="article-intro">

El código compartido de ChurchApps se publica en npm bajo el alcance `@churchapps/*`. Estos paquetes proporcionan utilidades comunes, ayudantes del lado del servidor y componentes React que son consumidos por todos los proyectos de ChurchApps como dependencias npm regulares.

</div>

## Paquetes

| Paquete | Descripción | Utilizado Por |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Utilidades base (DateHelper, ApiHelper, etc.) | Todos los proyectos |
| [`@churchapps/apihelper`](./api-helper) | Utilidades del servidor Express.js | Todas las APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartidos y utilidades | Todas las aplicaciones web |

## Desarrollo Local con `npm link`

Cuando desarrolla una biblioteca compartida junto con un proyecto que la consume, use `npm link` para probar cambios sin publicar en npm:

```bash
# Compilar y vincular la biblioteca
cd Helpers && npm run build && npm link

# Vincularla en el proyecto consumidor
cd ../Api && npm link @churchapps/helpers
```

Esto crea un enlace simbólico desde la carpeta `node_modules/@churchapps/helpers` del proyecto consumidor a su salida de compilación local, por lo que los cambios se reflejan inmediatamente después de recompilar.

:::tip
Recuerde ejecutar `npm run build` en el proyecto de biblioteca después de hacer cambios -- el proyecto consumidor lee de la carpeta compilada `dist/`, no del origen.
:::

:::warning
Las conexiones `npm link` se restablecen cada vez que ejecuta `npm install` en el proyecto consumidor. Deberá volver a ejecutar el comando `npm link @churchapps/<package>` después de instalar dependencias.
:::
