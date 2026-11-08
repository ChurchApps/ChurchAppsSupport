---
title: "Provider di terze parti"
description: "Aggiungi un feed di curriculum in Open Lesson Format nella pagina Provider esterni di Lessons.church, poi modificalo o eliminalo, così la tua chiesa può pianificare le sue lezioni."
---

# Provider di terze parti

<div class="article-intro">

Lessons.church supporta provider di curriculum esterni tramite l'Open Lesson Format. Questo significa che la tua chiesa può collegare curriculum di altre organizzazioni e pianificarlo per le tue classi accanto alla libreria integrata, così il tuo team dispone di curriculum da più fonti in un unico posto.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Accedi a Lessons.church con un account che può gestire le pianificazioni delle classi della tua chiesa
- Ottieni l'URL del feed dal provider esterno che vuoi collegare. Deve restituire lezioni nel formato [Open Lesson Format](./open-lesson-format.md)

</div>

## Aggiungere un provider

1. Fai clic su **External Providers** nella navigazione di Lessons.church. Si apre la pagina **External Lesson Providers**.
2. Fai clic su **Add Provider**. Se non ne hai ancora aggiunto nessuno, fai clic invece su **Add First Provider**.
3. Inserisci un **Provider Name**. Questo è il nome che il tuo team vede quando sceglie il provider.
4. Inserisci l'**API URL**. Questo è l'indirizzo in cui il provider pubblica il suo curriculum nell'Open Lesson Format.
5. Fai clic su **Save**.

Il provider viene aggiunto solo per la tua chiesa. Appare poi come opzione in **Provider** quando [pianifichi una lezione](../classrooms/scheduling-lessons.md) per una classe, e in **Source** quando crei un [piano annuale](./managing-year-plans.md).

## Gestire i provider

La pagina **External Lesson Providers** elenca tutti i provider che la tua chiesa ha aggiunto. Per modificarne uno:

- **Modifica** -- Fai clic sull'icona **Edit provider** (matita), cambia il **Provider Name** o l'**API URL**, quindi fai clic su **Save**.
- **Elimina** -- Fai clic sull'icona **Edit provider**, poi fai clic sull'icona di eliminazione (cestino) e conferma.

## Che cos'è l'Open Lesson Format?

L'Open Lesson Format è uno schema standardizzato che descrive i contenuti del curriculum -- programmi, studi, lezioni, sedi, sezioni e azioni -- in modo strutturato. Qualsiasi organizzazione che pubblica i propri contenuti in questo formato può essere aggiunta come provider in Lessons.church.

Se sei un fornitore di contenuti interessato a rendere disponibile il tuo curriculum tramite Lessons.church, puoi trovare la documentazione completa dello schema nella guida [Open Lesson Format](./open-lesson-format.md).

## Perché usare i provider di terze parti?

- **Più scelta per le chiese** -- Le chiese possono consultare una gamma più ampia di curriculum senza uscire dalla piattaforma.
- **Un unico posto per tutto** -- Volontari e coordinatori non devono visitare più siti web per trovare e pianificare le lezioni.
- **Configurazione semplice** -- Aggiungere un provider richiede solo un nome e un URL del feed. Non è necessario inserire dati manualmente né caricare file.

:::info
I contenuti di terze parti sono gestiti dal provider esterno. Se noti contenuti mancanti o non aggiornati di un provider, il problema potrebbe dover essere risolto da parte loro.
:::

:::tip
Per scoprire come appaiono le lezioni di un provider esterno una volta pianificate, consulta [Provider esterni](../browsing/external-providers.md) nella sezione Browsing.
:::
