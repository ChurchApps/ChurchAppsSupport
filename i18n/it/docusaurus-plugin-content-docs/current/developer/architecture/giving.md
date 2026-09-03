---
title: "Giving"
---

# Giving

<div class="article-intro">

Il modulo Giving traccia le donazioni e gli impegni. Le donazioni vengono registrate manualmente, online tramite il checkout di B1 o importate da gateway di pagamento; i fondi organizzano i flussi di cassa e il reporting.

</div>

## Modello di Dati

Le donazioni appartengono a una persona e a un fondo. I fondi sono configurati per chiesa e supportano rapporti per fondo.

## Flussi di Registrazione

Le donazioni vengono registrate tramite API quando inviate online, tramite importazione in batch o manualmente in B1 Admin. Ogni registrazione di donazione attiva i webhook dell'evento `donation.created`.

## Campagne

Le campagne raggruppano le donazioni verso un obiettivo (ad esempio, un fondo di costruzione) e tracciano gli impegni insieme alle donazioni effettive.
