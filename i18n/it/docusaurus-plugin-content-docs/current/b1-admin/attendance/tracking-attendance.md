---
title: "Monitoraggio delle presenze"
---

# Monitoraggio delle presenze

<div class="article-intro">

Una volta configurati i campus, gli orari dei servizi e i gruppi, B1 Admin rende facile esaminare i dati di presenze e individuare tendenze. La pagina Presenze fornisce due viste di reporting -- la scheda **Andamento presenze** per tendenze a livello di chiesa e la scheda **Presenze per gruppo** per dettagli a livello di gruppo. Utilizzate questi strumenti per comprendere i modelli di crescita, identificare il calo del coinvolgimento, e prendere decisioni basate sui dati per la vostra chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- La vostra struttura di presenze deve essere configurata con almeno un campus e un orario di servizio. Vedere [Configurazione delle presenze](setup.md) se non l'avete ancora fatto.
- I dati di presenze devono essere registrati prima che i report mostrino risultati. I dati possono provenire da [inserimento manuale](recording-attendance.md) o [auto check-in](check-in.md).

</div>

## Visualizzazione degli andamenti di presenze

1. Aprite **B1 Admin**, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandete **Persone**, e fate clic su **Presenze**.
2. Fate clic sulla scheda **Andamento presenze**.
3. Il report si esegue automaticamente quando si apre la scheda, mostrando il totale delle presenze per ogni settimana.

## Filtraggio dei vostri dati

Utilizzate i filtri nella casella **Filtro report** per restringere i risultati, quindi fate clic su **Esegui report**:

- **Campus** -- selezionate un campus per vedere le presenze solo per quella ubicazione.
- **Servizio** -- limitate il report a un servizio.
- **Orario del servizio** -- scegliete un orario di servizio per approfondire una riunione particolare.
- **Gruppo** -- mostra le presenze per un singolo gruppo.
- **Data di inizio** e **Data di fine** -- l'intervallo di date da includere. Per impostazione predefinita il report copre l'anno passato, da un anno fa fino ad oggi, e la data di fine è inclusa per intero.

Il report mostra un grafico a barre e una tabella di visite totali per settimana. Ogni settimana è etichettata con la data della domenica di quella settimana. La tabella ha anche una colonna **Date sessioni** che elenca le date effettive di quella settimana che avevano presenze (ad esempio, "27/9, 30/9"), in modo da poter vedere quando una riunione infrasettimanale è contata nella stessa settimana della domenica.

:::info
I report si eseguono automaticamente ogni volta che aprite la scheda Andamento presenze, quindi vedrete sempre numeri aggiornati senza dover fare clic su un pulsante di aggiornamento.
:::

## Presenze per gruppo

La scheda **Presenze per gruppo** mostra chi ha frequentato ogni sessione di gruppo. Ciò è utile quando volete monitorare una classe specifica, un team di ministero, o un piccolo gruppo piuttosto che osservare i numeri complessivi dei servizi.

1. Selezionate la scheda **Presenze per gruppo**.
2. Opzionalmente scegliete un **Campus** e un **Servizio**.
3. Impostate la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre la domenica scorsa fino ad oggi.
4. Fate clic su **Esegui report**.

I risultati sono raggruppati per data di sessione, poi per orario di servizio e gruppo, con le persone che hanno frequentato elencate sotto ogni gruppo. Gli orari dei servizi, i gruppi, e i nomi sono ordinati alfabeticamente in modo che ogni intestazione appaia una sola volta. La riga di ogni persona mostra anche una colonna **Registrato all'accesso** con l'ora in cui le loro presenze sono state registrate (vuota quando nessuna ora è in archivio) e una colonna **Stato di iscrizione** (ad esempio, Membro o Visitatore), in modo da poter individuare gli ospiti a colpo d'occhio.

Per scaricare i dati, fate clic su **Opzioni di download** e scegliete **Riepilogo**. Il CSV ha una riga per membro del gruppo, ordinato per gruppo e poi per nome, e una colonna per ogni sessione datata nell'intervallo (ad esempio, "Domenica - 9:00 AM (26-09-2026)") marcata **presente** o **assente**.

:::tip
Le presenze per gruppo sono particolarmente preziose per i leader di [piccoli gruppi](../groups/creating-groups.md) che desiderano tracciare il coinvolgimento all'interno del loro gruppo nel tempo.
:::

## Suggerimenti per l'utilizzo dei dati di presenze

- Rivedete le tendenze mensilmente per cogliere i modelli stagionali presto.
- Confrontate i dati a livello di campus per comprendere quali ubicazioni stanno crescendo.
- Utilizzate i report a livello di gruppo per seguire [gruppi](../groups/group-members.md) che mostrano un calo di presenze.
- Combinate gli insight sulle presenze con lo strumento [Ricerca AI](../people/ai-search.md) per trovare persone che non hanno frequentato di recente.

## Pagine correlate

- [Registrazione delle presenze](recording-attendance.md) -- inserite manualmente le presenze per una sessione di gruppo
- [Conteggio dei presenti e andamento](headcount-entry.md) -- un'alternativa più semplice di conteggio totale, con il suo grafico di andamento settimanale
- [Check-In](check-in.md) -- configurate l'auto check-in in modo che le presenze vengano registrate automaticamente
