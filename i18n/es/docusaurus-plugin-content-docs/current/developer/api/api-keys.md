---
title: "Claves de API"
---

# Claves de API

<div class="article-intro">

Las claves de API (tokens de acceso personal) son la forma más simple de autenticarse contra la API de B1. Una clave está vinculada a una persona específica en una iglesia específica y hereda los permisos de esa persona, estrechados por un conjunto opcional de alcances.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Un administrador de la iglesia con el permiso **Editar Configuración** crea y gestiona claves
- La clave sin procesar se muestra **una sola vez** en la creación -- almacénala en algún lugar seguro inmediatamente
- Todas las solicitudes de API deben usar **HTTPS**

</div>

## Formato de Clave

Una clave de API de B1 se ve así:

```
cak_<prefix>.<secret>
```

- `cak_` -- identificador fijo
- `<prefix>` -- segmento de búsqueda pública de 8 caracteres
- `<secret>` -- secreto de 48 caracteres

## Creando una Clave

1. Inicia sesión en B1Admin como un usuario con **Editar Configuración**.
2. Abre **Configuración → Desarrollador → Claves de API**.
3. Haz clic en **Nueva Clave de API** y **Guardar**.
4. La clave se muestra **una sola vez** en un diálogo.

## Cómo Difiere de OAuth

Las claves de API son apropiadas cuando **tu iglesia es la única que usa la integración**. Para un conector que necesita acceder a muchas iglesias, usa [OAuth](./connected-apps) en su lugar.
