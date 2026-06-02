---
title: "Aplicaciones Conectadas y OAuth"
---

# Aplicaciones Conectadas y OAuth

<div class="article-intro">

La API de B1 soporta OAuth 2.0 para que una aplicación de terceros pueda solicitar permiso a cada administrador de la iglesia para acceder a sus datos -- sin que la iglesia comparta una contraseña o clave de API. Una **Aplicación Conectada** es un token OAuth que un administrador de la iglesia ha aprobado; revocarla corta el acceso de la aplicación de terceros en un clic. Usa este camino para conectores SaaS multiinquilino. Para una integración de una sola iglesia, prefiere [Claves de API](./api-keys).

</div>

<div class="prereqs">
<h4>Antes de Comenzar</h4>

- Un **cliente** OAuth debe ser registrado (actualmente por un administrador del servidor B1) antes de que las iglesias puedan otorgarle acceso
- Todos los puntos finales de OAuth viven bajo el módulo Membership: `/membership/oauth/...`
- Los tokens de acceso son JWTs -- llevan los permisos del usuario filtrados por los alcances otorgados

</div>

## Conceptos

| Término | Significado |
|---|---|
| **Cliente OAuth** | La aplicación de terceros en sí -- identificada por `client_id`, asegurada por `client_secret`. Registrada una vez con B1, compartida en todas las iglesias que la instalen. |
| **Aplicación Conectada** | Un par específico `(client, church-admin)` donde el administrador ha otorgado acceso al cliente. Cada Aplicación Conectada está respaldada por un token de actualización de OAuth. |
| **Token de Acceso** | Un JWT de corta duración (≈ 7 días) que el cliente usa para llamadas de API. |
| **Token de Actualización** | Una cadena opaca de larga duración (≈ 90 días) que el cliente usa para acuñar nuevos tokens de acceso. |
| **Alcance** | Estrecha lo que el token de acceso puede hacer. |

## SDK Support

El paquete `@churchapps/integration-sdk` envuelve cada flujo de OAuth con ayudantes tipados -- `B1OAuthClient.exchangeCode()`, `.refresh()`, `.startDeviceFlow()`, `.pollDeviceToken()`, `.awaitDeviceToken()`.
