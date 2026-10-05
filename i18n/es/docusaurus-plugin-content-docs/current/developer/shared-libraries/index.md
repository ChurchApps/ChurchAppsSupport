---
title: "Librerías Compartidas"
---

# Librerías Compartidas

<div class="article-intro">

El código compartido de ChurchApps se publica en npm bajo el alcance `@churchapps/*`. Todos los paquetes compartidos viven en un solo repositorio -- [Packages](https://github.com/ChurchApps/Packages) -- administrado como un espacio de trabajo de Yarn (Berry) y versionado con [changesets](https://github.com/changesets/changesets).

</div>

## Paquetes

| Paquete | Descripción | Utilizado Por |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Capa de fundación: funciones auxiliares sin marco de trabajo y las interfaces TypeScript compartidas que forman el contrato de datos entre aplicaciones | Todos los proyectos |
| [`@churchapps/apihelper`](./api-helper) | Utilidades del lado del servidor Express: autenticación, controladores base, acceso a base de datos, integraciones AWS y correo electrónico | Todas las APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes React compartidos y módulos de características (inicio de sesión, donaciones, formularios, markdown, sitio web) | Todas las aplicaciones web |
| `@churchapps/content-providers` | Abstracción sobre proveedores de contenido de terceros (Lessons.church, Planning Center, Dropbox, y otros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de herramientas para construir integraciones B1.church: verificación de webhook, cliente REST tipado, auxiliares OAuth | Desarrolladores de integración externos |
| `@churchapps/texting` | Abstracción de proveedor de SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

La dirección de dependencia es estrictamente descendente: las aplicaciones dependen de `apihelper` y `apphelper`, que declaran `@churchapps/helpers` como una **dependencia de pares** para que cada aplicación resuelva exactamente una copia de ella.

## Configuración del Espacio de Trabajo

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

El repo usa Yarn Berry (el campo `packageManager` raíz es definitivo) con un solo archivo de bloqueo. `yarn build` construye todos los paquetes en orden de dependencia; `yarn test` ejecuta todas las pruebas de paquete.

## Liberación con Changesets

Cada cambio en un paquete se envía con un changeset:

1. Ejecuta `yarn changeset` en la raíz del espacio de trabajo. Elige los paquetes que tocaste, el tipo de golpe (patch = arreglo, minor = nueva exportación o característica, major = ruptura), y escribe un resumen de una línea -- se convierte en la entrada CHANGELOG.
2. Confirma el archivo `.changeset/*.md` generado junto con tu cambio de código. Un gancho de pre-confirmación bloquea confirmaciones que cambian la fuente de un paquete sin un changeset preparado.
3. Cuando esté listo para publicar, ejecuta `yarn publish-all` en la raíz. Esto consume changesets pendientes (golpeando versiones, escribiendo CHANGELOGs, sincronizando rangos de dependencia internos), construye todo en orden de dependencia, y publica los paquetes golpeados en npm. Luego confirma y presiona los golpes de versión.

:::warning
Nunca ejecutes un `npm publish` sin procesar dentro de un paquete único -- salta el orden de construcción y la contabilidad de versión que el script de liberación maneja. La publicación requiere una cuenta npm con derechos de publicación al alcance `@churchapps`.
:::

## Desarrollo Local Contra una Aplicación Consumidor

Dentro del espacio de trabajo, los paquetes construyen directamente contra sus hermanos -- no se necesita vinculación. Para probar una compilación de paquete no publicada dentro de una aplicación consumidor (B1Admin, B1App, etc.), agrega un portal Yarn temporal en el consumidor:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Construye el paquete primero (`yarn build` en la raíz del espacio de trabajo) -- el consumidor lee la salida compilada `dist/`, no la fuente.

:::warning
`yarn link` escribe una resolución de portal en el `package.json` del consumidor. Nunca la confirmes -- siempre `yarn unlink` y reinstala cuando termines.
:::
