---
title: "API"
---

# API

<div class="article-intro">

API-ul ChurchApps este un **monolit modular** -- o singură bază de cod care deservește șase module de date, fiecare cu propria bază de date. Această arhitectură oferă avantajele organizaționale ale microserviciilor (limite clare, depozite de date independente) împreună cu simplitatea operațională a unei singure implementări.

</div>

## Module

| Modul | Scop |
|--------|---------|
| **Membership** | Persoane, grupuri, gospodării, permisiuni |
| **Attendance** | Servicii, sesiuni, înregistrări de check-in |
| **Content** | Pagini, secțiuni, elemente, streaming |
| **Giving** | Donații, fonduri, procesarea plăților |
| **Messaging** | Conversații, notificări, e-mail |
| **Doing** | Sarcini, planuri, atribuiri |

## Stack tehnologic

- **Runtime:** Node.js 24.x cu TypeScript (module ES)
- **Framework:** Express
- **Injecție de dependențe:** Inversify (rutare bazată pe decoratori)
- **Bază de date:** MySQL -- o bază de date per modul, fiecare cu propriul pool de conexiuni
- **Autentificare:** autentificare bazată pe JWT prin `CustomAuthProvider`
- **Implementare:** AWS Lambda prin Serverless Framework v3

## Porturi

| Protocol | Port | Descriere |
|----------|------|-------------|
| HTTP | `8084` | API REST principal |
| WebSocket | `8087` | Conexiuni socket în timp real |

## Funcții Lambda

Când este implementat în AWS, API-ul rulează ca șase funcții Lambda:

- **`web`** -- Gestionează toate cererile HTTP
- **`socket`** -- Administrează conexiunile WebSocket
- **`timer15Min`** -- Rulează la fiecare 30 de minute pentru notificările prin e-mail (numele este unul istoric)
- **`timerMidnight`** -- Rulează zilnic pentru e-mailurile de rezumat și sarcinile de întreținere
- **`timerScheduledTasks`** -- Rulează zilnic pentru automatizările programate și procesarea fluxurilor de lucru restante
- **`timerWebhooks`** -- Rulează la fiecare minut pentru a livra webhook-urile de ieșire aflate în coadă

## Biblioteci partajate

API-ul depinde de două pachete partajate ChurchApps:

- **[`@churchapps/helpers`](../shared-libraries/helpers)** -- Utilitare de bază (DateHelper, ApiHelper etc.)
- **[`@churchapps/apihelper`](../shared-libraries/api-helper)** -- Utilitare pentru serverul Express, inclusiv autentificare, funcții ajutătoare pentru baze de date și integrări AWS

:::info
API-ul utilizează module ES (`"type": "module"` în `package.json`). Asigurați-vă că importurile folosesc sintaxa modulelor ES.
:::

## În această secțiune

- **[Configurare locală](./local-setup)** -- Clonați, configurați și rulați API-ul local
- **[Baza de date](./database)** -- Arhitectura cu o bază de date per modul, scripturi de schemă și modele de acces la date
- **[Structura modulelor](./module-structure)** -- Controlere, repository-uri, modele și autentificare
- **[Chei API](./api-keys)** -- Token-uri de acces personale pentru scripturi și conectori
- **[Aplicații conectate (OAuth)](./connected-apps)** -- Fluxul OAuth multi-tenant pentru aplicații terțe
- **[Webhook-uri](./webhooks)** -- Trimiterea notificărilor de evenimente către sisteme externe
- **[Server MCP](./mcp)** -- Endpoint pentru Model Context Protocol, care expune API-ul asistenților AI
- **[Referință endpoint-uri](./endpoints/)** -- Documentația completă a REST API-ului pentru toate modulele
