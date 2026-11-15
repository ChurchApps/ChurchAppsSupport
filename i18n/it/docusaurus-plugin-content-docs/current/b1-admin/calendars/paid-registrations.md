---
title: "Iscrizioni a pagamento"
description: "Configura in B1 Admin le iscrizioni agli eventi a pagamento: tipi di partecipante con prezzo, extra, codici sconto, liste d'attesa e raccolta dei pagamenti tramite il tuo fornitore di donazioni."
---

# Iscrizioni a pagamento

<div class="article-intro">

Le iscrizioni agli eventi possono andare oltre un semplice conteggio. Puoi definire tipi di partecipante con prezzo (come Adulto e Bambino), offrire extra facoltativi con prezzi e quantità propri, creare codici sconto e riscuotere il pagamento in fase di iscrizione tramite il fornitore di donazioni già in uso dalla tua chiesa. Quando un evento è al completo, una lista d'attesa facoltativa tiene in fila i membri interessati e li promuove automaticamente man mano che si liberano posti.

</div>

## Video di formazione {#training-video}

<YouTube id="eGSZv24Dlzk" title="Iscrizioni agli eventi ed eventi a pagamento in B1" next="Lanciare il sito web della tua chiesa in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Attiva prima le iscrizioni per l'evento -- vedi [Creare calendari](./creating-calendars.md#enabling-event-registration)
- Per raccogliere pagamenti online, la tua chiesa deve avere [le donazioni online configurate](../donations/online-giving-setup.md) (Stripe, PayPal o Kingdom Funding). Gli eventi gratuiti non richiedono alcuna configurazione delle donazioni. Senza donazioni online, le iscrizioni a pagamento funzionano comunque, ma le persone pagano direttamente la chiesa -- vedi [Chiese senza donazioni online](#churches-without-online-giving).

</div>

## Aprire le impostazioni di iscrizione {#opening-registration-settings}

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Calendari > Iscrizioni** e fai clic sul tuo evento (oppure fai clic sull'evento nel suo calendario e scegli **Gestisci iscrizioni**).
2. Fai clic su **Modifica impostazioni**. La scheda **Impostazioni iscrizione** mostra le opzioni di base -- **Abilita iscrizioni**, **Capienza**, **Attiva lista d'attesa**, **Apertura/Chiusura iscrizioni**, **Tag** e **Domande di iscrizione** -- con un pulsante **Salva impostazioni**.
3. Sotto le opzioni di base ci sono tre sezioni a fisarmonica: **Tipi di partecipante**, **Selezioni** e **Codici sconto**. Ciascuna ha un proprio pulsante **Salva**, separato da **Salva impostazioni**; B1 ti avvisa se provi a uscire con modifiche non salvate al loro interno. Fai clic su **Torna alle iscrizioni** per tornare all'elenco.

## Tipi di partecipante {#attendee-types}

I tipi di partecipante ti permettono di applicare prezzi diversi a diverse categorie di partecipanti -- e di limitare ciascuna separatamente.

1. Espandi la sezione a fisarmonica **Tipi di partecipante** e fai clic su **Aggiungi tipo**.
2. Inserisci un **Nome** (ad esempio "Adulto", "Bambino", "Studente").
3. Imposta un **Prezzo**. Usa 0 per un tipo gratuito.
4. Facoltativamente imposta una **Capienza** solo per questo tipo (ad esempio solo 20 posti Bambino). Lascia vuoto per nessun limite per tipo.
5. Facoltativamente imposta **Ordine** per controllare l'ordine in cui vengono elencati i tipi.
6. Fai clic su **Salva**.

Per rimuovere un tipo salvato, fai clic sulla sua icona di eliminazione e conferma; viene rimosso subito. Le selezioni e i codici sconto si rimuovono allo stesso modo.

Durante l'iscrizione, ogni partecipante sceglie un tipo; i tipi esauriti sono mostrati come **Esaurito** e non possono essere selezionati. Il registro mostra il tipo di ciascun partecipante e i conteggi progressivi per tipo.

## Selezioni {#selections}

Le selezioni sono extra facoltativi a pagamento -- magliette, piani pasto, potenziamenti per le attività.

1. Espandi la sezione a fisarmonica **Selezioni** e fai clic su **Aggiungi selezione**.
2. Inserisci un **Nome**, una **Descrizione** facoltativa e un **Prezzo** (0 viene mostrato come "Gratuito").
3. Facoltativamente imposta una **Capienza** (totale disponibile su tutte le iscrizioni) e una **Qtà max** (il massimo che una singola iscrizione può ordinarne).
4. Fai clic su **Salva**.

Chi si iscrive sceglie le quantità durante la registrazione, e i totali contano nella capienza, così non vendi mai più del disponibile.

## Codici sconto {#discount-codes}

1. Espandi la sezione a fisarmonica **Codici sconto** e fai clic su **Aggiungi codice sconto**.
2. Inserisci il **Codice** che chi si iscrive digiterà.
3. Scegli il **Tipo** -- **Percentuale** oppure **Importo** -- e il suo **Valore**.
4. Facoltativamente limita il codice con una **Data di inizio** / **Data di fine**, un **Minimo di membri** (numero minimo di partecipanti nell'iscrizione) e **Utilizzi massimi**.
5. Fai clic su **Salva**.

Ogni codice mostra un conteggio **Utilizzi** così puoi vedere quante volte è stato riscattato. Chi si iscrive riceve un riscontro immediato quando applica un codice -- inclusi messaggi chiari quando un codice è scaduto, non ancora attivo o richiede più partecipanti.

## Lista d'attesa {#waitlist}

Attiva **Attiva lista d'attesa** nella scheda Impostazioni iscrizione. Quando l'evento raggiunge la capienza:

- Ai nuovi iscritti viene offerto un posto in lista d'attesa invece di essere respinti. Completano la stessa iscrizione (il pagamento viene saltato finché sono in lista d'attesa).
- Quando qualcuno annulla, l'iscrizione più vecchia in lista d'attesa viene **promossa automaticamente** e riceve un'email che avvisa che si è liberato un posto. Se deve un saldo, l'email lo collega alle [Le mie iscrizioni](../../b1-church/events/my-registrations.md) sul sito B1 della tua chiesa, dove può completare il pagamento.
- Puoi promuovere manualmente qualcuno in qualsiasi momento con l'azione **Promuovi** su una riga in lista d'attesa -- utile dopo aver aumentato la capienza dell'evento.

:::info
Le iscrizioni promosse restano *in attesa* finché non viene pagato l'eventuale saldo; il pagamento (o l'assenza di importi da pagare) le conferma.
:::

## Il registro delle iscrizioni {#the-registration-roster}

Apri un evento dalla pagina Iscrizioni per vedere ogni iscrizione. Il titolo della scheda mostra quante iscrizioni occupano un posto rispetto alla capienza (ad esempio *Iscrizioni (18 / 20)*). Contano solo le iscrizioni in attesa e confermate; quando ci sono persone in lista d'attesa, il titolo aggiunge il conteggio (ad esempio *· 3 in lista d'attesa*), e lo stesso conteggio compare sotto la barra della capienza. Il numero più grande sopra la barra della capienza conta **persone** anziché iscrizioni -- tutti quelli presenti in ciascuna iscrizione in attesa o confermata -- quindi una famiglia di quattro persone conta come quattro. Il limite di capienza, invece, continua a contare le iscrizioni. La tabella mostra **Nome**, **Membri**, **Tipo** (il tipo di ciascun partecipante), **Pagati / Totale** (con un avviso di saldo quando restano somme da pagare), **Stato** e **Data**, oltre ai chip con il conteggio per tipo sopra la tabella.

- Fai clic sull'icona dei dettagli di una riga per aprire la finestra **Dettagli iscrizione** -- membri, selezioni, pagato/saldo e una tabella **Pagamenti** che elenca ogni addebito (importo, metodo, data).
- **Esporta CSV** scarica l'intero registro con colonne per membri, tipi di partecipante, selezioni, pagato/totale/saldo, stato e una colonna per ogni domanda di iscrizione.
- **Aggiungi partecipante** registra un'iscrizione fatta di persona o per telefono per qualsiasi persona della tua chiesa. Scegli la persona e, per un evento a pagamento, il suo tipo di partecipante. Il suo addebito non viene effettuato: un'iscrizione a pagamento viene salvata come **in attesa** con l'intero importo come saldo dovuto. Se la tua chiesa ha le donazioni online, la persona può pagare da [Le mie iscrizioni](../../b1-church/events/my-registrations.md); altrimenti riscuoti di persona. Per aggiungere partecipanti ti serve il permesso Modifica iscrizioni.

:::info
I rimborsi non vengono elaborati all'interno di B1. Se devi rimborsare un'iscrizione a pagamento annullata, emetti il rimborso dalla dashboard del tuo fornitore di donazioni (ad esempio Stripe).
:::

## Come funzionano i pagamenti {#how-payment-works}

I pagamenti passano dallo stesso gateway di donazioni che la tua chiesa usa già -- i dati della carta vanno direttamente al fornitore e non passano mai dai server di B1. I prezzi vengono sempre calcolati sul server a partire dai tipi, dalle selezioni e dai codici sconto configurati, quindi chi si iscrive non può alterare il totale. I membri che hanno effettuato l'accesso possono pagare con una carta salvata. Gli ospiti inseriscono una carta al momento del pagamento e devono spuntare la casella **Non sono un robot** prima di pagare.

### Chiese senza donazioni online {#churches-without-online-giving}

Se la tua chiesa non ha un fornitore di donazioni configurato, gli eventi a pagamento possono comunque accettare iscrizioni. Il passaggio di pagamento comunica a chi si iscrive che il pagamento online non è disponibile e che può pagare direttamente la chiesa, e un pulsante **Iscriviti e paga più tardi** salva l'iscrizione. Viene salvata come **in attesa** con l'intero importo come saldo dovuto, e compare nel registro con un avviso di saldo. Riscuoti il denaro nel modo in cui la tua chiesa lo fa normalmente.

:::info
B1 non ha modo di segnare come ricevuto un pagamento offline. Il saldo dovuto resta nel registro e nella scheda [Le mie iscrizioni](../../b1-church/events/my-registrations.md) di chi si è iscritto anche dopo che hai riscosso, quindi tieni una tua registrazione di chi ha pagato.
:::

## Articoli correlati {#related-articles}

- [Creare calendari](./creating-calendars.md#enabling-event-registration) — attiva le iscrizioni e le impostazioni di base
- [Configurazione delle donazioni online](../donations/online-giving-setup.md) — configura il gateway di pagamento usato al checkout
- [Iscriversi agli eventi](../../b1-church/events/registering.md) — cosa vedono i membri quando si iscrivono
- [Le mie iscrizioni](../../b1-church/events/my-registrations.md) — come i membri pagano i saldi e modificano le iscrizioni
