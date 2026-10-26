---
title: "Segnaletica digitale"
---

# Segnaletica digitale

<div class="article-intro">

Invia i contenuti delle tue lezioni a una TV nell'atrio o nel corridoio tramite un feed di segnaletica digitale. Ogni tipo di piano ha un URL di feed che riproduce sempre i contenuti del piano attuale, quindi non c'è nulla da aggiornare settimana dopo settimana. Se le tue TV usano FreePlay, puoi invece pianificare il tipo di piano su di esse in FreePlay Admin.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Configura un [tipo di piano](./plans.md) con [Lessons.church](../../b1-church/content/lessons.md) o altri contenuti di lezione pianificati
- Disponi di un account [SignPresenter](https://www.signpresenter.com) e di un dispositivo configurato per visualizzarlo, oppure di una TV con [FreePlay](../../freeplay/)

</div>

## Ottenere l'URL del feed

1. Vai su **Serving**, seleziona il ministero che contiene il tuo tipo di piano e clicca sul tipo di piano per aprirlo.
2. Clicca su **Digital Signage** (l'icona della TV) in alto nella pagina del tipo di piano.
3. Nella finestra **Digital Signage Feed**, clicca sul pulsante di copia accanto a **Feed Url**.

:::info
L'URL del feed è legato al tipo di piano, non a un singolo piano. Segue automaticamente il piano pianificato come attuale per quel tipo di piano, quindi devi configurarlo una sola volta.
:::

## Collegamento a SignPresenter

Il feed è progettato per funzionare con [SignPresenter](https://www.signpresenter.com), un'app di segnaletica digitale di terze parti. Incolla l'URL copiato in SignPresenter come feed esterno per visualizzare i contenuti della lezione attuale su uno schermo collegato.

Per la configurazione passo dopo passo all'interno di SignPresenter, consulta la [guida di SignPresenter per Lessons.church](https://support.signpresenter.com/topics/lessons-dot-church.html). Anche la finestra di dialogo contiene un link a queste istruzioni.

## Usare invece le TV FreePlay

Se i tuoi schermi usano [FreePlay](../../freeplay/), non hai bisogno dell'URL del feed. La finestra **Digital Signage Feed** contiene un link a **admin.freeplay.church/calendar**, dove puoi pianificare questo tipo di piano sulle tue TV FreePlay:

1. Clicca sul link **admin.freeplay.church/calendar** nella finestra di dialogo. FreePlay Admin usa lo stesso accesso di B1 Admin.
2. Scegli il gruppo di schermi per le tue TV e clicca su **Add schedule**.
3. In **Play**, scegli il tuo tipo di piano da **Service plans**. È contrassegnato con **(current plan)**.
4. Imposta i giorni e gli orari, quindi clicca su **Save**.

Le TV riproducono ogni settimana il piano attuale per quel tipo di piano, agli orari che hai impostato. Funziona anche con le lezioni di Go Curriculum, inclusi i piani che hai personalizzato. FreePlay accede con l'account Go Curriculum collegato al ministero in **Content Providers** (vedi [Pianificare le lezioni](./scheduling-lessons.md)), oppure con la connessione Go Curriculum della chiesa se il ministero non ne ha una. Consulta [Pianificazione del calendario](../../freeplay/scheduled-mode/scheduling-the-calendar) per tutte le opzioni e [Associazione di uno schermo](../../freeplay/scheduled-mode/pairing-a-screen) per aggiungere una TV.

:::note
L'URL del feed non include i contenuti multimediali di Go Curriculum, perché questi richiedono l'accesso a Go Curriculum della tua chiesa. Per mostrare una lezione di Go Curriculum su una TV dell'atrio o di un'aula, usa FreePlay.
:::

## Prossimi passi

- Gestisci i piani che alimentano questo display di segnaletica nella pagina [Plans](./plans.md)
- Pianifica i contenuti con [Lessons.church](./scheduling-lessons.md)
- Inserisci le TV FreePlay in un calendario con [Scheduled Mode](../../freeplay/scheduled-mode/)
