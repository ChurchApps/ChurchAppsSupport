---
title: "Iscrizioni a pagamento"
description: "Configura in B1 Admin le iscrizioni a pagamento: tipi di partecipante con prezzo, extra, codici sconto, liste d'attesa e incasso tramite il fornitore di donazioni."
---

# Iscrizioni a pagamento

<div class="article-intro">

Le iscrizioni agli eventi possono andare oltre un semplice conteggio dei partecipanti. Puoi definire tipi di partecipante con prezzo (come Adulto e Bambino), offrire extra facoltativi con i propri prezzi e quantità, creare codici sconto e riscuotere il pagamento al momento dell'iscrizione tramite il fornitore di donazioni già in uso nella chiesa. Quando un evento si riempie, una lista d'attesa facoltativa tiene in fila le persone interessate e le promuove automaticamente man mano che si liberano posti.

</div>

## Video di formazione

<YouTube id="eGSZv24Dlzk" title="Event Registration and Paid Events in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Attiva prima l'iscrizione sull'evento -- vedi [Creazione di calendari](./creating-calendars.md#enabling-event-registration)
- Per riscuotere pagamenti online, la chiesa deve avere [le donazioni online configurate](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Gli eventi gratuiti non richiedono alcuna configurazione delle donazioni. Senza donazioni online le iscrizioni a pagamento funzionano comunque, ma le persone pagano direttamente la chiesa -- vedi [Chiese senza donazioni online](#churches-without-online-giving).

</div>

## Aprire le impostazioni di iscrizione

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Calendari > Iscrizioni** e apri il tuo evento (oppure aprilo dal suo calendario).
2. La scheda **Impostazioni di iscrizione** mostra le basi -- **Attiva iscrizione**, **Capienza**, **Apertura/Chiusura iscrizioni**, **Tag** e **Domande di iscrizione**.
3. Sotto le basi ci sono tre sezioni a fisarmonica: **Tipi di partecipante**, **Selezioni** e **Codici sconto**.

## Tipi di partecipante

I tipi di partecipante ti permettono di applicare prezzi diversi per categorie diverse di partecipanti, e di limitare ciascuna separatamente.

1. Espandi la sezione **Tipi di partecipante** e fai clic su **Aggiungi tipo**.
2. Inserisci un **Nome** (ad esempio "Adulto", "Bambino", "Studente").
3. Imposta un **Prezzo**. Usa 0 per un tipo gratuito.
4. Facoltativamente imposta una **Capienza** solo per questo tipo (ad esempio solo 20 posti Bambino). Lascia vuoto per nessun limite per tipo.
5. Fai clic su **Salva**.

Durante l'iscrizione, ogni partecipante sceglie un tipo; i tipi esauriti sono indicati come **Esaurito** e non possono essere selezionati. L'elenco mostra il tipo di ogni partecipante e i conteggi progressivi per tipo.

## Selezioni

Le selezioni sono extra facoltativi a pagamento -- magliette, piani pasto, potenziamenti delle attività.

1. Espandi la sezione **Selezioni** e fai clic su **Aggiungi selezione**.
2. Inserisci un **Nome**, una **Descrizione** facoltativa e un **Prezzo** (0 viene mostrato come "Gratuito").
3. Facoltativamente imposta una **Capienza** (totale disponibile su tutte le iscrizioni) e una **Qtà massima** (il massimo che una singola iscrizione può ordinare).
4. Fai clic su **Salva**.

Chi si iscrive sceglie le quantità durante la registrazione, e i totali contano sulla capienza, così non si vende mai più del disponibile.

## Codici sconto

1. Espandi la sezione **Codici sconto** e fai clic su **Aggiungi codice sconto**.
2. Inserisci il **Codice** che chi si iscrive digiterà.
3. Scegli il **Tipo** -- **Percentuale** oppure **Importo** -- e il relativo **Valore**.
4. Facoltativamente limita il codice con una **Data di inizio** / **Data di fine**, un **Min. membri** (numero minimo di partecipanti nell'iscrizione) e **Utilizzi massimi**.
5. Fai clic su **Salva**.

Ogni codice mostra un conteggio **Utilizzi**, così puoi vedere quante volte è stato usato. Chi si iscrive riceve un riscontro immediato quando applica un codice, compresi messaggi chiari se il codice è scaduto, non ancora attivo o richiede più partecipanti.

## Lista d'attesa {#waitlist}

Attiva **Attiva lista d'attesa** nella scheda Impostazioni di iscrizione. Quando l'evento raggiunge la capienza:

- Chi si iscrive riceve un posto in lista d'attesa invece di essere respinto. Completa la stessa iscrizione (il pagamento viene saltato finché è in lista d'attesa).
- Quando qualcuno annulla, l'iscrizione in lista d'attesa più vecchia viene **promossa automaticamente** e riceve un'email che informa che si è liberato un posto. Se deve un saldo, l'email lo porta a [Le mie iscrizioni](../../b1-church/events/my-registrations.md) sul sito B1 della chiesa, dove può completare il pagamento.
- Puoi promuovere manualmente qualcuno in qualsiasi momento con l'azione **Promuovi** su una riga in lista d'attesa -- utile dopo aver aumentato la capienza dell'evento.

:::info
Le iscrizioni promosse restano *in attesa* finché il saldo non viene pagato; il pagamento (o l'assenza di somme dovute) le conferma.
:::

## L'elenco delle iscrizioni {#the-registration-roster}

Apri un evento dalla pagina Iscrizioni per vedere tutte le iscrizioni. Il titolo della scheda mostra quante iscrizioni occupano un posto rispetto alla capienza (ad esempio *Iscrizioni (18 / 20)*). Contano solo le iscrizioni in attesa e confermate; quando ci sono persone in lista d'attesa, il titolo aggiunge il conteggio (ad esempio *· 3 in lista d'attesa*) e lo stesso conteggio compare sotto la barra della capienza. Il numero più grande sopra la barra della capienza conta le **persone** anziché le iscrizioni -- tutti i membri di ogni iscrizione in attesa o confermata -- quindi una famiglia di quattro conta come quattro. Il limite di capienza, però, continua a contare le iscrizioni. La tabella mostra **Nome**, **Membri**, **Tipo** (il tipo di ciascun partecipante), **Pagato / Totale** (con un avviso di saldo quando del denaro è ancora dovuto), **Stato** e **Data**, oltre ai conteggi per tipo sopra la tabella.

- Fai clic sull'icona dei dettagli di una riga per aprire la finestra **Dettagli iscrizione** -- membri, selezioni, pagato/saldo e una tabella **Pagamenti** con ogni addebito (importo, metodo, data).
- **Esporta CSV** scarica l'elenco completo con colonne per membri, tipi di partecipante, selezioni, totale/pagato/saldo, stato e una colonna per ogni domanda di iscrizione.
- **Aggiungi partecipante** registra un'iscrizione offline o telefonica per una persona qualsiasi della chiesa. Scegli la persona e, per un evento a pagamento, il suo tipo di partecipante. La sua carta non viene addebitata: un'iscrizione a pagamento viene salvata come **in attesa** con l'intero importo come saldo dovuto. Se la chiesa ha le donazioni online, la persona può pagare da [Le mie iscrizioni](../../b1-church/events/my-registrations.md); altrimenti riscuoti di persona. Per aggiungere partecipanti ti serve il permesso Modifica iscrizioni.

:::info
I rimborsi non vengono elaborati all'interno di B1. Se devi rimborsare un'iscrizione a pagamento annullata, emetti il rimborso dalla dashboard del tuo fornitore di pagamenti (ad esempio Stripe).
:::

## Come funzionano i pagamenti

I pagamenti passano dallo stesso gateway di donazioni che la chiesa usa già -- i dati della carta vanno direttamente al fornitore e non passano mai dai server di B1. I prezzi vengono sempre calcolati sul server a partire dai tipi, dalle selezioni e dai codici sconto configurati, così chi si iscrive non può manipolare il totale. I membri che hanno effettuato l'accesso possono pagare con una carta salvata. Gli ospiti inseriscono una carta al checkout e devono spuntare la casella **Non sono un robot** prima di pagare.

### Chiese senza donazioni online {#churches-without-online-giving}

Se la chiesa non ha un fornitore di donazioni configurato, gli eventi a pagamento possono comunque ricevere iscrizioni. Il passaggio di pagamento informa chi si iscrive che il pagamento online non è disponibile e che può pagare direttamente la chiesa, e un pulsante **Iscriviti e paga più tardi** salva l'iscrizione. Viene salvata come **in attesa** con l'intero importo come saldo dovuto, e compare nell'elenco con un avviso di saldo. Riscuoti il denaro nel modo in cui la chiesa normalmente lo fa.

:::info
B1 non ha modo di segnare un pagamento offline come ricevuto. Il saldo dovuto resta nell'elenco e nella scheda [Le mie iscrizioni](../../b1-church/events/my-registrations.md) di chi si è iscritto anche dopo che hai riscosso il pagamento, quindi tieni un tuo registro di chi ha pagato.
:::

## Articoli correlati

- [Creazione di calendari](./creating-calendars.md#enabling-event-registration) — attiva le iscrizioni e le impostazioni di base
- [Configurazione delle donazioni online](../donations/online-giving-setup.md) — configura il gateway di pagamento usato al checkout
- [Iscriversi agli eventi](../../b1-church/events/registering.md) — cosa vedono i membri quando si iscrivono
- [Le mie iscrizioni](../../b1-church/events/my-registrations.md) — come i membri pagano i saldi e modificano le iscrizioni
