---
title: "Bibliotecas compartidas"
---

# Bibliotecas compartidas

<div class="article-intro">

El código compartido de ChurchApps se publica en npm bajo el ámbito `@churchapps/*`. Todos los paquetes compartidos viven en un único repositorio -- [Packages](https://github.com/ChurchApps/Packages) -- gestionado como un workspace de Yarn (Berry) y versionado con [changesets](https://github.com/changesets/changesets).

</div>

## Paquetes

| Paquete | Descripción | Utilizado por |
|---------|-------------|---------------|
| [`@churchapps/helpers`](./helpers) | Capa base: funciones auxiliares independientes de frameworks e interfaces TypeScript compartidas que forman el contrato de datos entre aplicaciones | Todos los proyectos |
| [`@churchapps/apihelper`](./api-helper) | Utilidades de Express del lado del servidor: autenticación, controladores base, acceso a bases de datos, integraciones con AWS y correo electrónico | Todas las APIs |
| [`@churchapps/apphelper`](./app-helper) | Componentes de React y módulos de funcionalidades compartidos (inicio de sesión, donaciones, formularios, markdown, sitio web) | Todas las aplicaciones web |
| `@churchapps/content-providers` | Capa de abstracción sobre proveedores de contenido de terceros (Lessons.church, Planning Center, Dropbox y otros) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Kit de herramientas para crear integraciones de B1.church: verificación de webhooks, cliente REST tipado, ayudantes de OAuth | Desarrolladores externos de integraciones |
| `@churchapps/texting` | Abstracción de proveedores de SMS (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

La dirección de las dependencias es estrictamente descendente: las aplicaciones dependen de `apihelper` y `apphelper`, que declaran `@churchapps/helpers` como **dependencia de pares** para que cada aplicación resuelva exactamente una copia de él.

## Configuración del workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

El repositorio usa Yarn Berry (el campo raíz `packageManager` es la referencia) con un único archivo de bloqueo. `yarn build` compila todos los paquetes en orden de dependencias; `yarn test` ejecuta las pruebas de todos los paquetes.

## Publicación con Changesets

Cada cambio en un paquete se publica con un changeset:

1. Ejecute `yarn changeset` en la raíz del workspace. Seleccione el o los paquetes que modificó, el tipo de incremento (patch = corrección, minor = nueva exportación o funcionalidad, major = cambio incompatible) y escriba un resumen de una línea: se convertirá en la entrada del CHANGELOG.
2. Confirme el archivo `.changeset/*.md` generado junto con su cambio de código. Un hook de pre-commit bloquea los commits que cambian el código fuente de un paquete sin un changeset preparado.
3. Cuando esté listo para publicar, ejecute `yarn publish-all` en la raíz. Esto consume los changesets pendientes (incrementando versiones, escribiendo los CHANGELOG y sincronizando los rangos de dependencias internas), compila todo en orden de dependencias y publica en npm los paquetes con versión incrementada. Después, confirme y suba los cambios de versión.

:::warning
Nunca ejecute un `npm publish` directo dentro de un paquete individual: se salta el orden de compilación y la contabilidad de versiones que gestiona el script de publicación. Publicar requiere una cuenta de npm con permisos de publicación en el ámbito `@churchapps`.
:::

## Desarrollo local contra una aplicación que lo consume

Dentro del workspace, los paquetes se compilan directamente contra sus hermanos, sin necesidad de enlazarlos. Para probar una compilación de un paquete no publicado dentro de una aplicación consumidora (B1Admin, B1App, etc.), añada un portal temporal de Yarn en el consumidor:

```bash
# en el proyecto consumidor
yarn link ../Packages/helpers
# ... pruebas ...
yarn unlink ../Packages/helpers && yarn install
```

Compile primero el paquete (`yarn build` en la raíz del workspace): el consumidor lee la salida compilada de `dist/`, no el código fuente.

:::warning
`yarn link` escribe una resolución de portal en el `package.json` del consumidor. Nunca lo confirme: ejecute siempre `yarn unlink` y reinstale cuando termine.
:::
