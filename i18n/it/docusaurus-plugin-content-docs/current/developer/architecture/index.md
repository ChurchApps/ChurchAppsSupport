---
title: "Panoramica Architettura"
---

# Panoramica Architettura

<div class="article-intro">

ChurchApps è un'architettura modulare multi-tenant costruita su Node.js, Typescript, MySQL e React. Ogni modulo (Membership, Giving, Attendance, ecc.) gestisce il suo database, gli endpoint REST e i webhook, indipendenti ma interconnessi attraverso un registry centrale.

</div>

## Componenti Chiave

- **Api** (`packages/api`) — Il server Node.js/Express con moduli per ogni dominio
- **Database** — MySQL per ogni modulo, con schema auto-generato
- **B1Admin** (`apps/b1-admin`) — L'interfaccia React per gli amministratori di chiesa
- **B1 Member Portal** — L'interfaccia React per i membri della chiesa

## Moduli

I moduli principali includono:

- **Membership** — Persone, Famiglie, Gruppi, Ruoli e Permessi
- **Attendance** — Check-in dei Bambini, Tracking della Partecipazione
- **Giving** — Donazioni, Fondi, Campagne
- **Content** — File, Pagine del Sito Web, Blog
- **Serving** — Piani di Servizio, Attività, Flussi di Lavoro

Ogni modulo comunica via webhook e API pubblica.
