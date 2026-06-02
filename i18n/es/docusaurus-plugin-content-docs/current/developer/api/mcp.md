---
title: "Servidor MCP"
---

# Servidor MCP

<div class="article-intro">

La API de B1 incluye un servidor [MCP (Protocolo de Contexto de Modelos)](https://modelcontextprotocol.io) en `/mcp`. Cualquier cliente MCP-consciente -- Claude Code, Claude Desktop, el SDK de Agentes de OpenAI, Cursor, o el tuyo propio -- puede conectarse a él y llamar a la API REST subyacente en nombre de un usuario de iglesia autenticado.

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Una [clave de API de B1](./api-keys) (`cak_…`) con los alcances que el cliente debe tener
- Un host de API de B1 accesible -- `https://api.churchapps.org` para iglesias alojadas, o tu propio despliegue
- Un cliente MCP. Ve [Claude](/docs/b1-admin/integrations/claude) y [ChatGPT](/docs/b1-admin/integrations/chatgpt) para configuración del usuario final

</div>

## Punto Final

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

| Aspecto | Valor |
|---|---|
| **Ruta** | `/mcp` (relativa al host de la API) |
| **Método** | `POST` solamente |
| **Transporte** | HTTP Streamable de MCP |
| **Modelo de Sesión** | Sin estado. Una nueva instancia de servidor MCP se construye por solicitud |
| **Autenticación** | Token de portador. Claves de API `cak_…` y JWTs de B1 ambas funcionan |

## Herramientas

Tres herramientas, todas genéricas: `list_endpoints`, `describe_endpoint`, y `api_call`.

## Auth Model

La solicitud MCP se ejecuta a través de `CustomAuthProvider.getUser()` -- el mismo camino que cada punto final autenticado de B1 usa. Un portador `cak_…` se resuelve a un `Principal` cuyos permisos son el RBAC actual de la persona emisora, **intersectado** con los alcances otorgados de la clave.
