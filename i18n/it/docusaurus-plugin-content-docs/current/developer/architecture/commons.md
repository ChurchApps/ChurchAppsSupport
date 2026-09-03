---
title: "Commons"
---

# Commons

<div class="article-intro">

Il modulo Commons contiene i model e i controller condivisi per le entità di base — Persone, Famiglie e Contatti — utilizzate in tutti gli altri moduli.

</div>

## Struttura

Le persone sono il nucleo: ogni persona ha un record di persona, una famiglia opzionale (radicata nel genitore della famiglia) e contatti (email, telefono, indirizzo).

Nei controller della membership, le rotte CRUD standard operano su persone/famiglie/contatti e producono eventi via webhook.

## Relazioni

- Una persona appartiene a una famiglia (opzionale)
- Una famiglia ha molte persone
- I contatti sono collegati a persone o famiglie
