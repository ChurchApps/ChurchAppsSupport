---
title: "Bibliotecas Compartidas"
---

# Bibliotecas Compartidas

<div class="article-intro">

El código compartido de ChurchApps se publica en npm bajo el alcance `@churchapps/*`. Todos los paquetes compartidos viven en un único repositorio -- [Packages](https://github.com/ChurchApps/Packages) -- gestionado como un espacio de trabajo Yarn (Berry) y versionado con [changesets](https://github.com/changesets/changesets).

</div>

## Paquetes

| Paquete | Descripción | Usado Por |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Capa de base: funciones auxiliares sin dependencia de framework y las interfaces TypeScript compartidas que forman el contrato de datos entre aplicaciones | Todos los proyectos |
| [`@churchapps/apihelper`](./api-helper) | Utilidades Express del lado del servidor: auth, controladores base, acceso a base de datos, integraciones de AWS y correo | Todas las APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartidos y módulos de características (login, donaciones, formularios, markdown, sitio web) | Todas las aplicaciones web |
| `@churchapps/content-providers` | Abstracción sobre proveedores de contenido de terceros (Lessons.church, Planning Center, Dropbox, y otros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de herramientas para construir integraciones de B1.church: verificación de webhook, cliente REST tipado, ayudantes de OAuth | Desarrolladores de integración externos |
| `@churchapps/texting` | Abstracción de proveedor SMS (Text In Church, Clearstream, Mutual Ministry) | Api |

La dirección de dependencia es estrictamente descendente: las aplicaciones dependen de `apihelper` y `apphelper`, que declaran `@churchapps/helpers` como una **dependencia par** para que cada aplicación resuelva exactamente una copia de él.

## Configuración del Espacio de Trabajo

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

El repositorio usa Yarn Berry (el campo `packageManager` raíz es autoritativo) con un único lockfile. `yarn build` compila cada paquete en orden de dependencia; `yarn test` ejecuta todas las pruebas de paquete.

## Lanzamiento con Changesets

Cada cambio a un paquete se envía con un changeset:

1. Ejecuta `yarn changeset` en la raíz del espacio de trabajo. Elige el/los paquete(s) que tocaste, el tipo de incremento (patch = corrección, minor = nueva exportación o característica, major = cambio disruptivo), y escribe un resumen de una línea -- se convierte en la entrada del CHANGELOG.
2. Confirma el archivo `.changeset/*.md` generado junto con tu cambio de código. Un hook de pre-commit bloquea confirmaciones que cambien el código fuente de un paquete sin un changeset preparado.
3. Cuando estés listo para publicar, ejecuta `yarn publish-all` en la raíz. Esto consume los changesets pendientes (incrementando versiones, escribiendo CHANGELOGs, sincronizando rangos de dependencia interna), compila todo en orden de dependencia, y publica los paquetes incrementados en npm. Luego confirma y haz push de los incrementos de versión.

:::warning
Nunca ejecutes un `npm publish` crudo dentro de un solo paquete -- omite el orden de compilación y la contabilidad de versión que maneja el script de lanzamiento. Publicar requiere una cuenta npm con derechos de publicación en el alcance `@churchapps`.
:::

## Desarrollo Local Contra una Aplicación Consumidora

Dentro del espacio de trabajo, los paquetes se compilan directamente contra sus hermanos -- no se necesita vinculación. Para probar una compilación de paquete no publicada dentro de una aplicación consumidora (B1Admin, B1App, etc.), agrega un portal Yarn temporal en el consumidor:

```bash
# en el proyecto consumidor
yarn link ../Packages/helpers
# ... prueba ...
yarn unlink ../Packages/helpers && yarn install
```

Compila el paquete primero (`yarn build` en la raíz del espacio de trabajo) -- el consumidor lee la salida compilada de `dist/`, no el código fuente.

:::warning
`yarn link` escribe una resolución de portal en el `package.json` del consumidor. Nunca la confirmes -- siempre haz `yarn unlink` y reinstala cuando termines.
:::
