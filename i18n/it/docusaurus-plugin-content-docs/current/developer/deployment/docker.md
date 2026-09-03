---
title: "Self-Hosting con Docker"
---

# Self-Hosting con Docker

<div class="article-intro">

Esegui la tua istanza privata di B1 Admin, il portale dei membri B1, l'API e un database MySQL su qualsiasi macchina con Docker — un server domestico, una VPS da $5 o una casella on-prem. Un `docker compose up` crea e avvia tutto.

</div>

## Quick Start

<div class="prereqs">
<h4>Cosa Ti Serve</h4>

- [Docker Engine](https://docs.docker.com/engine/install/) con Compose v2 (incluso in Docker Desktop)
- ~4 GB di RAM disponibili durante la build iniziale
- Git o solo il file `docker-compose.yml` grezzo

</div>

```bash
git clone https://github.com/ChurchApps/B1Admin.git
cd B1Admin
docker compose up -d
```

La prima esecuzione richiede 10–20 minuti: crea B1Admin dal tuo clone e crea l'API e B1App direttamente dai loro repository GitHub. Gli avvii successivi sono secondi.

Quando tutti e quattro i servizi sono in uso:

1. Apri **http://localhost:3101** (B1 Admin).
2. Fai clic su **Register** e crea il tuo account. Il primo account è automaticamente un admin server.
3. Segui i prompt in-app per creare la tua prima chiesa.

Gli schemi del database vengono creati automaticamente dal container API all'avvio della migrazione — nessun SQL manuale richiesto.

| Servizio | URL |
|---------|-----|
| B1Admin (staff/admin) | http://localhost:3101 |
| B1App (portale dei membri / sito web) | http://localhost:3000 |
| API | http://localhost:8084 |
| MySQL | solo interno (`mysql:3306` sulla rete compose) |
