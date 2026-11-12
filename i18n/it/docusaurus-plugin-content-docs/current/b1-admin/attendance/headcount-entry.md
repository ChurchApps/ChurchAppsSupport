---
title: "Conteggio presenze e andamento"
description: "Inserisci un conteggio totale per un culto o un gruppo in B1 Admin senza un elenco nominativo, poi osserva questi totali settimana per settimana nel report Andamento conteggi."
---

# Conteggio presenze e andamento

<div class="article-intro">

I conteggi ti permettono di registrare un semplice totale di presenze -- per un culto, un orario di culto o un gruppo -- senza registrare un elenco nominativo. Usalo quando ti serve solo sapere "quante persone erano presenti", e abbinalo al report Andamento conteggi per osservare quel numero nel tempo.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, i culti e gli orari dei culti devono essere configurati. Consulta [Configurazione Presenze](setup.md).
- Inserire un conteggio richiede il permesso **Presenze &gt; Modifica**; visualizzare il report dell'andamento richiede **Presenze &gt; Visualizza**. Consulta [Ruoli e permessi](../settings/roles-permissions.md).

</div>

:::info
I conteggi sono un'alternativa solo totale a [Registrare le presenze](recording-attendance.md). Se devi sapere **chi** ha partecipato -- ad esempio per ricontattare le persone che non si sono più viste -- continua a usare le presenze nominative per sessione nelle Sessioni di un gruppo. I conteggi memorizzano solo un numero.
:::

## Registrare un conteggio {#recording-a-headcount}

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Presenze**.
2. Fai clic su **Inserisci conteggio** nella colonna di sinistra.
3. Compila il modulo:
   - **Culto** *(obbligatorio)*
   - **Orario del culto** -- lascialo su **Tutti gli orari del culto** per registrare un totale su tutti gli orari del culto
   - **Gruppo** -- facoltativo; vengono elencati solo i gruppi con il tracciamento delle presenze attivo. Lascia vuoto per "Nessun gruppo (intero culto)."
   - **Data**
   - **Conteggio** -- il numero totale di persone presenti (un numero intero, 0 o più)
4. Fai clic su **Salva**.

La tabella **Conteggi recenti** accanto al modulo elenca le ultime voci inserite con data, culto, orario del culto, gruppo e conteggio. Fai clic su una riga per ricaricarla nel modulo se devi correggerla o eliminarla.

## Report Andamento conteggi {#headcount-trend-report}

1. Dalla stessa pagina **Presenze**, fai clic su **Tutti gli anni** nella colonna di sinistra, poi seleziona la scheda **Andamento conteggi**.
2. Il report viene eseguito all'apertura della scheda. Per restringerlo, scegli un **Campus**, un **Culto**, un **Orario del culto** o un **Gruppo** e fai clic su **Esegui report**. Non c'è un filtro per data -- il report copre ogni settimana che ha un conteggio.

Il report mostra i conteggi registrati sommati per settimana, sia come grafico a linee sia come tabella -- lo stesso stile di report usato dalle schede [Andamento presenze e Presenze per gruppo](tracking-attendance.md). I conteggi inseriti per la settimana in corso compaiono anche sotto **Conteggi di questa settimana** nella pagina principale Presenze.

## Pagine correlate {#related-pages}

- [Registrare le presenze](recording-attendance.md) -- presenze nominative per persona, per sessione
- [Monitorare le presenze](tracking-attendance.md) -- report sull'andamento delle presenze e dei gruppi
- [Configurazione Presenze](setup.md) -- configura campus, culti e orari dei culti
