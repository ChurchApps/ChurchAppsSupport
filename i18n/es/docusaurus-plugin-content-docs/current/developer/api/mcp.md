---
title: "Servidor MCP"
---

# Servidor MCP

<div class="article-intro">

La API de B1 proporciona un servidor MCP en `/mcp`. Cualquier cliente compatible con MCP puede conectarse a él e invocar la API REST subyacente en nombre de un usuario de iglesia autenticado.

</div>

## Punto final

```
POST /mcp
Content-Type: application/json
Accept: application/json, text/event-stream
Authorization: Bearer cak_<prefix>.<secret>
```

## Desarrollo local

El punto final de MCP se monta cuando la API se ejecuta localmente:

```bash
cd Api
npm run dev
```

## Relacionado

- [Claves API](./api-keys)
- [Webhooks](./webhooks)
