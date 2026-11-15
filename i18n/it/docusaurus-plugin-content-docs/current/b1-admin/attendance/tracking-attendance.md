---
title: "Monitorare le presenze"
description: "Consulta gli andamenti delle presenze, filtra i report per campus, culto o gruppo ed esporta le presenze di gruppo dalla pagina Presenze in B1 Admin."
---

# Monitorare le presenze

<div class="article-intro">

Una volta configurati campus, orari dei culti e gruppi, B1 Admin ti permette di consultare facilmente i dati sulle presenze e individuare gli andamenti. La pagina Presenze si apre con un riepilogo delle presenze di questa settimana, e i suoi report **Tutti gli anni** offrono due viste principali -- la scheda **Andamento presenze** per gli andamenti a livello di chiesa e la scheda **Presenze per gruppo** per il dettaglio a livello di gruppo -- oltre alla scheda **Andamento conteggi** per i [totali dei conteggi](headcount-entry.md). Usa questi strumenti per capire i modelli di crescita, individuare un calo di partecipazione e prendere decisioni basate sui dati per la tua chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- La struttura delle presenze deve essere configurata con almeno un campus e un orario del culto. Consulta [Configurazione Presenze](setup.md) se non l'hai ancora fatto.
- Le presenze devono essere registrate prima che i report mostrino dei risultati. I dati possono provenire dall'[inserimento manuale](recording-attendance.md) o dal [check-in self-service](check-in.md).

</div>

## Visualizzare gli andamenti delle presenze {#viewing-attendance-trends}

1. Apri **B1 Admin**, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Persone** e fai clic su **Presenze**.
2. Fai clic su **Tutti gli anni** nella colonna di sinistra. La scheda **Andamento presenze** è selezionata per impostazione predefinita.
3. Il report viene eseguito automaticamente all'apertura della scheda e mostra le presenze totali per ogni settimana.

:::tip
Per una rapida occhiata alla settimana in corso, la pagina principale Presenze mostra quante persone sono nella sala questa settimana, una suddivisione per sala (gruppo), eventuali ospiti e un grafico a barre di 13 settimane dei check-in -- senza bisogno di un report.
:::

## Filtrare i dati {#filtering-your-data}

Usa i filtri nel riquadro **Filtra report** per restringere i risultati, poi fai clic su **Esegui report**:

- **Campus** -- seleziona un campus per vedere le presenze solo di quella sede.
- **Culto** -- limita il report a un solo culto.
- **Orario del culto** -- scegli un orario del culto per approfondire un particolare raduno.
- **Gruppo** -- mostra le presenze di un singolo gruppo.
- **Data di inizio** e **Data di fine** -- l'intervallo di date da includere. Per impostazione predefinita il report copre l'ultimo anno, da un anno fa fino a oggi, e la data di fine è inclusa per intero.

Il report mostra un grafico a barre e una tabella con le visite totali per settimana. Usa l'icona di stampa per stamparlo oppure **Opzioni di download** per salvare i dati. Ogni settimana è etichettata con la data della domenica di quella settimana. La tabella ha anche una colonna **Date delle sessioni** che elenca le date effettive di quella settimana in cui ci sono state presenze (ad esempio, "27/9, 30/9"), così puoi vedere quando un raduno infrasettimanale viene conteggiato nella stessa settimana della domenica.

:::info
I report si eseguono automaticamente ogni volta che apri la scheda Andamento presenze, così vedrai sempre numeri aggiornati senza dover cliccare su un pulsante di aggiornamento.
:::

## Presenze per gruppo {#group-attendance}

La scheda **Presenze per gruppo** mostra chi ha partecipato a ogni sessione di gruppo. È utile quando vuoi monitorare una specifica classe, un team di ministero o un piccolo gruppo invece di guardare i numeri complessivi dei culti.

1. Nei report **Tutti gli anni**, seleziona la scheda **Presenze per gruppo**.
2. Facoltativamente scegli un **Campus** e un **Culto**.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre dalla scorsa domenica fino a oggi.
4. Fai clic su **Esegui report**.

I risultati sono raggruppati per data della sessione, poi per orario del culto e gruppo, con le persone che hanno partecipato elencate sotto ciascun gruppo. Orari dei culti, gruppi e nomi sono ordinati alfabeticamente, così ogni intestazione compare una sola volta. La riga di ciascuna persona mostra anche una colonna **Registrato** con l'ora in cui è stata registrata la presenza (vuota quando non c'è un orario in archivio) e una colonna **Stato di membership** (ad esempio Membro o Visitatore), così puoi individuare subito gli ospiti.

Per scaricare i dati, fai clic su **Opzioni di download** e scegli **Riepilogo**. Il file CSV ha una riga per ogni membro del gruppo, ordinate per gruppo e poi per nome, e una colonna per ogni sessione datata nell'intervallo (ad esempio "Domenica - 9:00 (2026-09-27)") contrassegnata come **presente** o **assente**.

:::tip
Le presenze di gruppo sono particolarmente utili per i leader dei [piccoli gruppi](../groups/creating-groups.md) che vogliono monitorare il coinvolgimento all'interno del proprio gruppo nel tempo.
:::

## Suggerimenti per usare i dati sulle presenze {#tips-for-using-attendance-data}

- Esamina gli andamenti ogni mese per individuare presto i modelli stagionali.
- Confronta i dati a livello di campus per capire quali sedi stanno crescendo.
- Usa i report a livello di gruppo per ricontattare i [gruppi](../groups/group-members.md) che mostrano un calo di presenze.
- Combina le indicazioni sulle presenze con lo strumento [Ricerca AI](../people/ai-search.md) per trovare le persone che non si sono viste di recente.

## Pagine correlate {#related-pages}

- [Registrare le presenze](recording-attendance.md) -- inserisci manualmente le presenze per una sessione di gruppo
- [Conteggio presenze e andamento](headcount-entry.md) -- un'alternativa più semplice basata sui totali, con il proprio grafico settimanale dell'andamento
- [Check-In](check-in.md) -- configura il check-in self-service così le presenze vengono registrate automaticamente
