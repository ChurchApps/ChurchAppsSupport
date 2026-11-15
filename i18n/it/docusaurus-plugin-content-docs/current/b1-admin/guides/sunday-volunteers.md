---
title: "Guida: Gestire i volontari della domenica"
description: "Configura team di volontari, piani di servizio settimanali, ordine del culto e compiti domenicali in B1 Admin, così i volontari vedono e rispondono alle assegnazioni su B1.church e nell'app mobile."
---

# Gestire i volontari della domenica

<div class="article-intro">

Configura i tuoi team di volontari, crea i piani di servizio settimanali, assegna le posizioni, costruisci l'ordine del culto con i canti di lode e assegna i compiti della domenica. Alla fine, i tuoi volontari vedranno le loro assegnazioni sul sito B1 e nell'app mobile, e potranno accettarle o rifiutarle direttamente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso amministratore
- Volontari [aggiunti alla tua anagrafica](../people/adding-people.md)

</div>

## Passaggio 1: Crea i team di volontari {#step-1-create-volunteer-teams}

Organizza i volontari in team, così puoi gestire le assegnazioni per area di ministero. I team si trovano all'interno di un ministero nell'area Servizio.

Segui le guide [Servizio](../serving/index.md) e [Membri del gruppo](../groups/group-members.md) per:

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **Servizio > Piani** e clicca su **Aggiungi ministero** per creare un ministero (ad esempio, "Domenica mattina")
2. Seleziona la scheda del ministero e clicca su **Crea team di servizio** (oppure **Nuovo team di servizio**) per aggiungere team come "Team di lode", "Audio e media", "Accoglienza", "Volontari del ministero bambini"
3. Apri ogni team e aggiungi i volontari cercando il loro nome nella casella **Aggiungi persona**

:::tip
Nomina i leader del team con l'icona a stella (**Rendi leader**) nell'elenco dei membri del team. I leader possono gestire il calendario del proprio gruppo e coordinare il team.
:::

## Passaggio 2: Costruisci la tua libreria di canti {#step-2-build-your-song-library}

Aggiungi i canti di lode così potrai inserirli nei piani di servizio ogni settimana.

Segui la guida [Canti](../serving/songs.md) per:

1. Nel menu Jump, scegli **Servizio > Canti**, clicca su **Aggiungi canto** e cerca nel database dei canti per titolo o autore (oppure clicca su **Crea manualmente**)
2. Per ogni canto, aggiungi gli arrangiamenti con testo e tonalità
3. Aggiungi link esterni a esecuzioni su YouTube, schemi di accordi o spartiti, e carica l'audio delle prove se ce l'hai

:::info
I canti aggiunti qui possono essere inseriti in qualsiasi piano di servizio in seguito. Costruisci la libreria una volta sola e riutilizzala ogni settimana.
:::

## Passaggio 3: Crea un piano di servizio {#step-3-create-a-service-plan}

I piani sono le assegnazioni settimanali che indicano dove sono necessari i volontari.

Segui la guida [Piani](../serving/plans.md) per:

1. Nel menu Jump, scegli **Servizio > Piani**, seleziona la scheda del tuo ministero e apri il tipo di piano (clicca su **Crea tipo di piano** se non ne hai ancora uno)
2. Clicca su **Nuovo piano** e scegli la **Data del servizio**. Per configurare più domeniche in una volta, copia da un piano precedente, scegli **Ripeti ogni** e **Frequenza**, e inserisci quanti piani creare in **Numero di piani**
3. Nella pagina del piano, clicca su **Gestisci team di servizio**, clicca su **Aggiungi posizione** per aggiungere ciascuna posizione, poi clicca sul link **Persone necessarie** per assegnare i volontari
4. Nel pannello **Convalida**, clicca sul link **Notifica _N_ volontario/i** così i volontari ricevono le richieste (vedi [Notificare i volontari](../serving/plan-validation.md#notifying-volunteers)). Un punto verde sulla foto di un volontario indica che ha accettato, un punto rosso che ha rifiutato; il riquadro **Risposte** nella pagina del piano conta gli accettati, i in attesa e i rifiutati
5. Attiva i [promemoria per i volontari](../serving/plans.md#volunteer-reminders) per il tipo di piano, così i volontari ricevono un promemoria tramite notifica push, email o SMS prima di ogni servizio

## Passaggio 4: Costruisci l'ordine del culto {#step-4-build-the-service-order}

Definisci la sequenza del tuo servizio dall'inizio alla fine.

Segui la guida [Ordine del culto](../serving/service-order.md) per:

1. Apri il tuo piano e clicca su **Modifica ordine del culto** nella sezione **Ordine del culto**
2. Clicca su **Aggiungi** per inserire sezioni, canti (dalla tua libreria) e elementi come preghiere, letture della Scrittura, annunci, predica, offerta e benedizione finale
3. Trascina gli elementi per riordinare la sequenza del servizio

:::info
Gli ordini del culto sono specifici per ogni piano. Le modifiche qui non influiscono sugli altri piani né sulla libreria principale dei canti.
:::

## Passaggio 5: Assegna i compiti della domenica {#step-5-assign-sunday-tasks}

Tieni traccia delle responsabilità occasionali della domenica, così nulla viene dimenticato.

Segui la guida [Compiti](../serving/tasks.md) per:

1. Crea compiti per responsabilità come "Preparare gli elementi della comunione", "Stampare i bollettini" o "Allestire l'impianto audio"
2. Assegna ogni compito alla persona o al gruppo responsabile
3. I compiti compaiono in **Servizio > Il mio lavoro**, nella dashboard di chi li riceve e nell'app mobile

:::info
B1 Admin non crea più compiti con una pianificazione ricorrente. Per i processi ripetitivi che fanno passare le persone attraverso dei passaggi, usa i [Flussi di lavoro](../serving/workflows.md) con un trigger a pianificazione.
:::

## Passaggio 6: Attiva l'iscrizione autonoma (facoltativo) {#step-6-enable-self-service-signup-optional}

Permetti ai volontari di iscriversi autonomamente alle posizioni, invece di attendere le assegnazioni dell'amministratore.

1. Quando crei un piano, oppure in **Modifica dettagli** nella pagina del piano, imposta una **Scadenza iscrizioni (ore prima del servizio)** per decidere quando chiude l'iscrizione autonoma. Le ore sono calcolate a ritroso dal primo orario di servizio del piano. Lascia vuoto per nessuna scadenza. I nuovi piani partono con la scadenza del piano precedente.
2. Facoltativamente, seleziona **Mostra i nomi dei volontari nella pagina di iscrizione** (in **Modifica dettagli**) per permettere ai volontari connessi di vedere chi altro si è iscritto.
3. Nella finestra **Aggiungi una posizione** di ciascuna posizione, seleziona **Consenti iscrizione autonoma** per renderla disponibile all'iscrizione autonoma.
4. Aggiungi una **Descrizione** a ciascuna posizione, così i volontari sanno in cosa consiste il ruolo.

Una volta create le posizioni con iscrizione autonoma, compariranno automaticamente nelle pagine di iscrizione dei volontari su [B1.church e nell'app B1](../../b1-church/serving/volunteer-signup.md). I membri possono sfogliare le posizioni aperte, vedere quanti posti restano e iscriversi con un solo clic.

:::tip
Combina posizioni assegnate dall'amministratore e posizioni ad iscrizione autonoma nello stesso piano. Ad esempio, assegna direttamente il responsabile della lode, ma lascia che gli accoglienti e chi serve il caffè si scelgano da soli.
:::

## Passaggio 7: Avvisa i volontari {#step-7-let-volunteers-know}

I volontari assegnati vedono automaticamente i propri piani e possono rispondere.

1. I volontari vedono i propri piani su [B1.church e nell'app B1](../../b1-church/plans/viewing-plans.md)
2. Possono accettare o rifiutare le assegnazioni direttamente dal telefono o dal computer
3. Possono indicare le date di indisponibilità per le settimane in cui non sono disponibili
4. I piani possono essere stampati per le prove o affissi dietro le quinte
5. I volontari possono sfogliare e iscriversi alle posizioni aperte tramite la [pagina di iscrizione dei volontari](../../b1-church/serving/volunteer-signup.md)

:::tip
Le notifiche push nell'app B1 avvisano i volontari quando ricevono nuove assegnazioni o quando i piani cambiano.
:::

## Hai finito! {#youre-done}

Il tuo sistema di gestione dei volontari è configurato. Ogni settimana, crea un nuovo piano, assegna le posizioni, e il tuo team vede tutto dal telefono o dal computer.

## Articoli correlati {#related-articles}

- [Servizio](../serving/index.md) — configura ministeri e team di servizio
- [Membri del gruppo](../groups/group-members.md) — aggiungi e gestisci i membri del team
- [Piani](../serving/plans.md) — crea e gestisci i piani di servizio
- [Ordine del culto](../serving/service-order.md) — costruisci la sequenza del servizio
- [Canti](../serving/songs.md) — gestisci la tua libreria di canti di lode
- [Compiti](../serving/tasks.md) — assegna azioni a persone o gruppi
- [Flussi di lavoro](../serving/workflows.md) — fai passare le persone attraverso processi ripetibili con trigger e passaggi automatici
- [Visualizzare i piani](../../b1-church/plans/viewing-plans.md) — come i volontari vedono i propri piani
- [Iscrizione dei volontari](../../b1-church/serving/volunteer-signup.md) — come i membri scelgono autonomamente le posizioni di volontariato
