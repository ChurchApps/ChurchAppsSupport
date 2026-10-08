---
title: "Lotti di Donazioni"
---

# Lotti di Donazioni

<div class="article-intro">

I lotti raggruppano le tue donazioni insieme per un tracciamento e una riconciliazione più facili. Un lotto tipico rappresenta una singola raccolta, come un'offerta domenicale o un evento speciale. L'uso di lotti ti aiuta a rimanere organizzato e rende semplice verificare che i tuoi record corrispondano ai depositi effettivi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati di aver [configurato i tuoi fondi](funds.md) così che siano disponibili quando registri le donazioni
- Avrai bisogno di accesso alla sezione **Donazioni** in B1 Admin

</div>

## La Pagina dei Lotti

Quando navighi a **Donazioni > Lotti**, vedrai un elenco di tutti i tuoi lotti. Ogni riga visualizza:

- **Nome** -- l'etichetta che hai dato al lotto
- **Data** -- la data della raccolta
- **Donazioni** -- il numero di donazioni individuali nel lotto
- **Totale** -- l'importo in dollari combinato

L'intestazione in alto mostra statistiche di riepilogo incluso il numero totale di lotti, il numero totale di donazioni in tutti i lotti, e l'importo totale in dollari.

## Creazione di un Nuovo Lotto

1. Fai clic su **Aggiungi Lotto** nella parte superiore della pagina.
2. Inserisci un nome descrittivo (ad es., "Offerta Domenicale - Feb 9").
3. Seleziona la data della raccolta.
4. Fai clic su **Salva**.

Il tuo nuovo lotto appare nell'elenco, pronto per aggiungere le donazioni.

## Utilizzo dei Lotti

- **Visualizza donazioni** -- fai clic su un nome di lotto per aprirlo e vedere tutte le donazioni individuali che contiene. Da lì puoi aggiungere, modificare, o rimuovere le donazioni.
- **Modifica i dettagli del lotto** -- fai clic sul pulsante **Modifica** su una riga di lotto per cambiarne il nome o la data.
- **Ordina** -- usa le intestazioni delle colonne per ordinare i lotti per nome o data.
- **Esporta** -- fai clic su **Esporta** per scaricare il tuo elenco di lotti come un foglio di calcolo (CSV).

## Stampa di un Lotto

Apri un lotto e fai clic sull'icona **Stampa** (stampante) nella parte superiore dell'elenco di donazioni per stampare una copia cartacea per il tuo team di conteggio o i record di deposito. La stampa include:

- Il nome della tua chiesa, il nome del lotto e la data del lotto
- Ogni donazione nel lotto, con il nome del donatore, il metodo, le note, la data e l'importo (i doni rimborsati sono barruti e contrassegnati come rimborsati)
- **Sottototali Fondo** -- il totale dato a ogni fondo nel lotto
- **Totale Lotto** -- l'importo combinato per l'intero lotto

L'icona Stampa appare solo una volta che il lotto ha almeno una donazione.

### Stampa di Più Lotti in Una Volta

Per stampare in un colpo solo tutti i lotti di un periodo -- ad esempio, tutti i depositi del mese scorso -- fai clic sull'icona **Stampa** (stampante) nell'intestazione dell'elenco **Lotti**, accanto a **Esporta**. Si apre la pagina **Stampa Lotti** con una **Data di inizio** e una **Data di fine** che per impostazione predefinita coprono gli ultimi 30 giorni. Modifica una delle due date per scegliere un intervallo diverso.

Ogni lotto con data compresa nell'intervallo (incluse la data di inizio e quella di fine) viene stampato in ordine di data, un lotto per pagina, con lo stesso layout della stampa di un singolo lotto. I lotti senza donazioni vengono esclusi, e se nessuno dei lotti nell'intervallo ha donazioni vedrai "Nessun lotto con donazioni in questo intervallo di date." Fai clic su **Stampa** per aprire la finestra di stampa del tuo browser, oppure su **Chiudi** per tornare all'elenco dei lotti.

## Esportazione di un Lotto a QuickBooks Online

Apri un lotto e fai clic su **Esporta per QuickBooks** per scaricare il lotto come una voce di giornale che QuickBooks Online può importare (**Impostazioni > Importa Dati > Voci di Giornale**). Il file contiene un debito a **Fondi Non Depositati** per il totale del lotto e un credito per ogni fondo, usando il nome di ogni fondo come nome dell'account. QuickBooks ti chiede di abbinare questi nomi al tuo piano dei conti durante l'importazione, quindi nomina i tuoi fondi come il tuo contabile nomina gli account di reddito, o mappali una volta all'importazione.

:::tip
Nomina i tuoi lotti coerentemente così sono facili da trovare in seguito. Includere la data e il tipo di raccolta (ad es., "Domenica AM - 2025-02-09") mantiene il tuo elenco organizzato mentre cresce.
:::

## Passaggi Successivi

Una volta che hai un lotto, vedi [Registrazione di Donazioni](recording-donations.md) per imparare come aggiungere le donazioni individuali ad esso. Puoi anche [importare le transazioni Stripe](stripe-import.md) per creare automaticamente lotti da donazioni online.
