---
title: "Digital Signage"
---

# Digital Signage {#digital-signage}

<div class="article-intro">

Invia i contenuti delle tue lezioni a una TV nell'atrio o nel corridoio tramite un feed di digital signage. Ogni tipo di piano ha un URL del feed che riproduce sempre i contenuti del piano attuale, quindi non c'è nulla da aggiornare settimana dopo settimana. Se le tue TV usano FreePlay, puoi invece programmare il tipo di piano direttamente in FreePlay Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Imposta un [tipo di piano](./plans.md) con [Lessons.church](../../b1-church/content/lessons.md) o altri contenuti di lezione programmati
- Disponi di un account [SignPresenter](https://www.signpresenter.com) e di un dispositivo configurato per visualizzarlo, oppure di una TV con [FreePlay](../../freeplay/)

</div>

## Ottenere l'URL del feed {#getting-the-feed-url}

1. Vai su **Servizio**, seleziona il ministero che contiene il tuo tipo di piano e fai clic sul tipo di piano per aprirlo.
2. Fai clic su **Digital Signage** (l'icona della TV) in alto nella pagina del tipo di piano.
3. Nella finestra **Feed Digital Signage**, fai clic sul pulsante di copia accanto a **Feed Url**.

:::info
L'URL del feed è legato al tipo di piano, non a un singolo piano. Segue automaticamente il piano impostato come attuale per quel tipo di piano, quindi devi configurarlo una sola volta.
:::

## Collegarsi a SignPresenter {#connecting-to-signpresenter}

Il feed è progettato per funzionare con [SignPresenter](https://www.signpresenter.com), un'app di digital signage di terze parti. Incolla l'URL copiato in SignPresenter come feed esterno per visualizzare i contenuti della lezione attuale su uno schermo collegato.

Per la configurazione passo passo all'interno di SignPresenter, consulta [la guida di SignPresenter per Lessons.church](https://support.signpresenter.com/topics/lessons-dot-church.html). La finestra contiene anche un link a queste istruzioni.

## Usare invece le TV FreePlay {#using-freeplay-tvs-instead}

Se i tuoi schermi usano [FreePlay](../../freeplay/), non ti serve l'URL del feed. La finestra **Feed Digital Signage** contiene un link a **admin.freeplay.church/calendar**, dove puoi programmare questo tipo di piano sulle tue TV FreePlay:

1. Fai clic sul link **admin.freeplay.church/calendar** nella finestra. FreePlay Admin usa lo stesso accesso di B1 Admin.
2. Scegli il gruppo di schermi per le tue TV e fai clic su **Aggiungi pianificazione**.
3. In **Riproduci**, scegli il tuo tipo di piano da **Piani di servizio**. È contrassegnato con **(piano attuale)**.
4. Imposta i giorni e gli orari, quindi fai clic su **Salva**.

Le TV riproducono ogni settimana il piano attuale per quel tipo di piano, agli orari che hai impostato. Questo funziona anche con le lezioni di Go Curriculum, inclusi i piani che hai personalizzato. FreePlay accede con l'account Go Curriculum collegato al ministero in **Fornitori di contenuti** (vedi [Programmare le lezioni](./scheduling-lessons.md)), oppure con la connessione Go Curriculum della chiesa se il ministero non ne ha una. Consulta [Programmare il calendario](../../freeplay/scheduled-mode/scheduling-the-calendar) per tutte le opzioni e [Associare uno schermo](../../freeplay/scheduled-mode/pairing-a-screen) per aggiungere una TV.

:::note
L'URL del feed non include i contenuti multimediali di Go Curriculum, perché tali contenuti richiedono l'accesso Go Curriculum della tua chiesa. Per mostrare una lezione Go Curriculum su una TV nell'atrio o in aula, usa FreePlay.
:::

## Passaggi successivi {#next-steps}

- Gestisci i piani che alimentano questo display di digital signage nella pagina [Piani](./plans.md)
- Programma i contenuti con [Lessons.church](./scheduling-lessons.md)
- Inserisci le TV FreePlay in un calendario con [Modalità programmata](../../freeplay/scheduled-mode/)
