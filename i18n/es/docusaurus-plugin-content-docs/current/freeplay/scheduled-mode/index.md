---
title: "Modo programado"
---

# Modo programado

<div class="article-intro">

El modo programado permite que un TV de FreePlay funcione por sí solo. Creas listas de reproducción y las colocas en un calendario en **FreePlay Admin**, en [admin.freeplay.church](https://admin.freeplay.church). Cada TV emparejado con ese calendario descarga la semana siguiente y reproduce lo que esté programado, según la hora, sin que nadie pulse Start. Como los archivos ya están descargados, la reproducción continúa aunque se caiga el Wi-Fi.

</div>

:::tip
FreePlay Admin usa tu inicio de sesión de ChurchApps, el mismo que usas en B1 Admin. No hay que crear una cuenta aparte.
:::

## Cómo encaja todo

FreePlay Admin tiene cuatro páginas principales, que aparecen en la parte superior del sitio:

- **[Screens](./managing-screens)**: los TV emparejados, su estado y los **grupos de pantallas** a los que pertenecen. Las pantallas de un grupo comparten un calendario y un bucle predeterminado
- **[Playlists](./building-playlists)**: bucles de imágenes y vídeos que eliges de tus proveedores de contenido
- **[Calendar](./scheduling-the-calendar)**: lo que reproduce cada grupo de pantallas, y cuándo
- **[Providers](./building-playlists#connecting-providers)**: las fuentes de contenido de las que toman material tus listas. Conectas cada una una sola vez para toda la iglesia

Cuando no hay nada programado, las pantallas de un grupo reproducen su **bucle predeterminado**. Si el grupo no tiene bucle predeterminado, las pantallas se quedan en negro.

## En qué se diferencia del modo de plan

- **[Modo de plan](../plan-mode/)** sigue un tipo de plan de servicio de B1 Admin. Alguien pulsa **Start Plan** en el TV, y la lección se reproduce cuando lo hace
- **El modo programado** sigue un calendario. El contenido empieza y se detiene a las horas que tú fijas, así que funciona bien para las pantallas de vestíbulo, los bucles de anuncios y las aulas en las que la lección debe estar en pantalla antes de que llegue nadie

Una entrada del calendario también puede reproducir un plan de servicio. Elige el tipo de plan en **Service plans** al añadir una programación, y la pantalla reproducirá el plan que esté vigente en B1 Admin esa semana. Esto incluye las lecciones de Go Curriculum, incluso las que hayas personalizado en el plan. La pantalla usa el inicio de sesión de Go Curriculum vinculado al ministerio del tipo de plan en B1 Admin, o la conexión de Go Curriculum de la iglesia si el ministerio no tiene ninguna.

## Primeros pasos

Hasta que completes cada uno de estos pasos, la página **Screens** muestra una lista de verificación **Get started** con un enlace para cada paso:

1. **Conectar un proveedor**: vincula Dropbox, OneDrive, Lessons.church u otra fuente en la página **Providers**
2. **Crear una lista de reproducción**: elige imágenes y vídeos de un proveedor
3. **Colocarla en el calendario**: decide qué se reproduce y cuándo, o define un bucle predeterminado para el grupo
4. **Emparejar una pantalla**: introduce el código de cuatro letras que aparece en el TV

Haz clic en **Hide** para ocultar la lista de verificación.

:::tip
Pulsa **Ctrl+K** (**⌘K** en un Mac), o haz clic en el cuadro de búsqueda de la cabecera, para abrir la paleta de comandos. Desde ahí puedes ir a cualquier página o iniciar una acción como **Pair screen**, **Add playlist** o **Add schedule**.
:::

## En esta sección

- **[Emparejar una pantalla](./pairing-a-screen)**: muestra el código en el TV y empárejalo en FreePlay Admin
- **[Gestionar pantallas y grupos](./managing-screens)**: revisa el estado y las descargas, y organiza las pantallas en grupos
- **[Conectar proveedores y crear listas de reproducción](./building-playlists)**: vincula fuentes de contenido y crea bucles de imágenes y vídeos
- **[Programar el calendario](./scheduling-the-calendar)**: decide qué se reproduce y cuándo, y qué pasa cuando termina antes de tiempo
- **[Reproducción programada en el TV](./scheduled-playback)**: lo que hace el TV por su cuenta y cómo usar el mando durante la reproducción
