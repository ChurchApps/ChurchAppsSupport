---
title: "Bibliotecas compartidas"
---

# Bibliotecas compartidas

<div class="article-intro">

El código compartido de ChurchApps se publica en npm bajo el scope `@churchapps/*`. Todos los paquetes compartidos viven en un único repositorio -- [Packages](https://github.com/ChurchApps/Packages) -- gestionado como un espacio de trabajo de Yarn (Berry) y versionado con [changesets](https://github.com/changesets/changesets).

</div>

## Paquetes

| Paquete | Descripción | Utilizado por |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Capa de base: funciones auxiliares sin dependencia de framework e interfaces compartidas de TypeScript que forman el contrato de datos entre aplicaciones | Todos los proyectos |
| [`@churchapps/apihelper`](./api-helper) | Utilidades Express del lado del servidor: autenticación, controladores base, acceso a base de datos, integraciones de AWS y correo electrónico | Todas las APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartidos y módulos de características (inicio de sesión, donaciones, formularios, markdown, sitio web) | Todas las aplicaciones web |
| `@churchapps/content-providers` | Abstracción sobre proveedores de contenido de terceros (Lessons.church, Planning Center, Dropbox y otros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de herramientas para crear integraciones de B1.church: verificación de webhook, cliente REST escrito, ayudantes de OAuth | Desarrolladores de integraciones externas |
| `@churchapps/texting` | Abstracción del proveedor de SMS (Text In Church, Clearstream, Mutual Ministry) | Api |

La dirección de dependencia es estrictamente descendente: las aplicaciones dependen de `apihelper` y `apphelper`, que declaran `@churchapps/helpers` como **dependencia peer** para que cada aplicación resuelva exactamente una copia.

## Configuración del espacio de trabajo

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

El repositorio utiliza Yarn Berry (el campo `packageManager` raíz es la autoridad) con un único lockfile. `yarn build` construye todos los paquetes en orden de dependencias; `yarn test` ejecuta todas las pruebas de paquetes.

## Lanzamiento con Changesets

Cada cambio en un paquete viene con un changeset:

1. Ejecute `yarn changeset` en la raíz del espacio de trabajo. Elija el/los paquete(s) que tocó, el tipo de bump (patch = arreglo, minor = nueva exportación o característica, major = cambio importante), y escriba un resumen de una línea -- se convierte en la entrada del CHANGELOG.
2. Confirme el archivo generado `.changeset/*.md` junto con su cambio de código. Un hook preconfirmación bloquea confirmaciones que cambien el código fuente de un paquete sin un changeset preparado.
3. Cuando esté listo para publicar, ejecute `yarn publish-all` en la raíz. Esto consume changesets pendientes (incrementando versiones, escribiendo CHANGELOGs, sincronizando rangos de dependencia interna), construye todo en orden de dependencias, y publica los paquetes incrementados en npm. Luego confirme y haga push de los incrementos de versión.

:::warning
Nunca ejecute un `npm publish` sin procesar dentro de un paquete individual -- omite el orden de construcción y la contabilidad de versión que el script de lanzamiento maneja. La publicación requiere una cuenta npm con derechos de publicación en el scope `@churchapps`.
:::

## Desarrollo local contra una aplicación consumidora

Dentro del espacio de trabajo, los paquetes se construyen directamente contra sus hermanos -- no se necesita enlace. Para probar una construcción de paquete no publicada dentro de una aplicación consumidora (B1Admin, B1App, etc.), agregue un portal de Yarn temporal en el consumidor:

```bash
# en el proyecto consumidor
yarn link ../Packages/helpers
# ... pruebe ...
yarn unlink ../Packages/helpers && yarn install
```

Construya el paquete primero (`yarn build` en la raíz del espacio de trabajo) -- el consumidor lee la salida compilada `dist/`, no el código fuente.

:::warning
`yarn link` escribe una resolución de portal en el `package.json` del consumidor. Nunca lo confirme -- siempre `yarn unlink` e reinstale cuando haya terminado.
:::
