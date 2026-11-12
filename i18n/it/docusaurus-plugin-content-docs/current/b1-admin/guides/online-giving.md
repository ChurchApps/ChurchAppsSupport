---
title: "Guida: configura le offerte online"
description: "Configura le offerte online in B1 Admin creando i fondi per le donazioni, collegando Stripe e aggiungendo una pagina Dona al tuo sito B1.church per i membri."
---

# Configura le offerte online

<div class="article-intro">

Ti accompagniamo in tutto ciò che serve per accettare donazioni online nella tua chiesa -- dalla creazione dei fondi per le donazioni, al collegamento di Stripe per l'elaborazione dei pagamenti, fino alla condivisione della pagina delle donazioni con la tua comunità. Alla fine, i membri potranno donare online tramite il tuo sito web e l'app mobile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account B1 Admin con accesso da amministratore -- vedi [Ruoli e permessi](../people/roles-permissions.md)
- Un account Stripe (creane uno gratuitamente su [stripe.com](https://stripe.com) se ti serve)

</div>

## Passo 1: crea i fondi per le donazioni {#step-1-create-donation-funds}

I fondi sono le categorie a cui i donatori possono destinare le offerte. Ti serve almeno un fondo prima di poter accettare donazioni.

Segui la guida [Fondi](../donations/funds.md) per configurare le categorie di donazione:

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegliere **Donazioni > Fondi** e fare clic su **Aggiungi fondo**
2. Crea i fondi più comuni (ad esempio "Fondo generale", "Fondo edificio", "Missioni")
3. Seleziona **Fiscalmente deducibile** sui fondi le cui offerte devono comparire nelle ricevute di fine anno, e lascia selezionato **Visibile ai donatori** sui fondi che i donatori devono poter scegliere online

:::tip
Puoi aggiungere altri fondi in qualsiasi momento. Inizia dalle categorie di donazione più comuni.
:::

## Passo 2: collega Stripe {#step-2-connect-stripe}

Stripe gestisce tutta l'elaborazione dei pagamenti. Collegherai il tuo account Stripe a B1 Admin così le donazioni confluiscono nel tuo conto bancario.

Segui la guida [Configurazione delle donazioni online](../donations/online-giving-setup.md) per collegare Stripe:

1. Accedi alla tua dashboard Stripe e vai su **Sviluppatori > Chiavi API** per trovare la tua Chiave pubblicabile e la tua Chiave segreta
2. In B1 Admin, vai su **Impostazioni**, fai clic su **Modifica** nella sezione **Donazioni** e imposta il **Fornitore** su **Stripe**
3. Incolla la Chiave pubblicabile in **Chiave pubblica** e la Chiave segreta in **Chiave segreta**, verifica la **Valuta** e fai clic su **Salva**

B1 supporta anche **Kingdom Funding** e **Paystack** (per le chiese in Africa) come fornitori di donazioni -- vedi [Configurazione delle donazioni online](../donations/online-giving-setup.md).

:::warning
Stripe mostra la tua Chiave segreta una sola volta. Copiala e salvala prima di uscire dalla dashboard Stripe. Se la perdi, dovrai generarne una nuova.
:::

## Passo 3: aggiungi una pagina Dona al tuo sito web {#step-3-add-a-giving-page-to-your-website}

Rendi accessibili le donazioni aggiungendo una pagina dedicata al tuo sito B1.

Segui le guide [Configurazione delle donazioni online](../donations/online-giving-setup.md) e [Gestire le pagine](../website/managing-pages.md) per:

1. Aggiungere una scheda **Donazione** al tuo sito B1.church (oppure un elemento **Donazione** a una pagina nel costruttore del sito)
2. Il tuo URL per le donazioni sarà: `https://yoursubdomain.b1.church/donate`
3. I membri possono donare senza effettuare l'accesso (pagina pubblica) oppure accedere per usare i metodi di pagamento salvati e vedere lo storico delle donazioni
4. Per indirizzare i donatori direttamente a un fondo, fai clic su **Link per donare** accanto a quel fondo in **Donazioni > Fondi** per copiare un link (oppure scaricare un codice QR) con fondo e importo già preimpostati

## Passo 4: fai una donazione di prova {#step-4-make-a-test-donation}

Prima di annunciarlo alla comunità, verifica che tutto funzioni.

1. Fai una piccola donazione di prova per verificare che l'intero flusso funzioni
2. Controlla che la donazione compaia in B1 Admin, in **Donazioni > Lotti**

:::tip
Per verificare senza addebiti reali, puoi salvare prima le chiavi di test di Stripe e poi sostituirle con le chiavi live in **Impostazioni > Donazioni** prima di annunciarlo alla comunità.
:::

## Passo 5: annuncia alla comunità {#step-5-announce-to-your-congregation}

Fai sapere ai membri che possono donare online.

1. Condividi l'URL per le donazioni tramite il sito web, le newsletter via email, i bollettini e i social
2. I membri possono donare anche tramite l'[app B1](../../b1-church/giving/index.md) -- la funzione di donazione è integrata

:::info
I membri che accedono possono salvare i metodi di pagamento, impostare donazioni ricorrenti e vedere lo storico delle donazioni. Anche le donazioni anonime sono possibili -- senza accesso.
:::

## Passo 6: gestione continuativa {#step-6-ongoing-management}

Mantieni aggiornati i registri delle donazioni e genera report durante l'anno.

1. Le offerte online vengono registrate automaticamente. Usa [Importazione Stripe](../donations/stripe-import.md) per recuperare eventuali transazioni Stripe che non si sono sincronizzate -- fai clic su **Anteprima** per vedere cosa manca, poi su **Importa mancanti**
2. [Consulta i report sulle donazioni](../donations/donation-reports.md) in **Donazioni > Riepilogo** per monitorare gli andamenti e i totali per fondo
3. Controlla **Donazioni > Donazioni fallite** per le donazioni ricorrenti il cui pagamento è stato rifiutato, e fai clic su **Riprova** quando il donatore aggiorna il metodo di pagamento
4. [Genera le ricevute di donazione di fine anno](../donations/giving-statements.md) per la documentazione fiscale dei tuoi donatori

:::tip
Prima di chiudere ogni mese, esegui un'anteprima di Importazione Stripe così i tuoi registri corrispondono a Stripe. Vedi la [Guida ai report di fine anno](./year-end-reports.md) per l'intero processo di fine anno.
:::

## Hai finito! {#youre-done}

La tua chiesa ora accetta donazioni online. I membri possono donare tramite il tuo sito web, l'app B1 o qualsiasi dispositivo con un browser web. Tutte le donazioni vengono tracciate automaticamente in B1 Admin.

## Articoli correlati {#related-articles}

- [Fondi](../donations/funds.md) -- crea e gestisci le categorie di donazione
- [Lotti](../donations/batches.md) -- organizza le donazioni in gruppi
- [Registrare le donazioni](../donations/recording-donations.md) -- inserisci manualmente le donazioni in contanti e con assegno
- [Importazione Stripe](../donations/stripe-import.md) -- importa le transazioni online in B1 Admin
- [Report sulle donazioni](../donations/donation-reports.md) -- consulta andamenti e totali delle donazioni
- [Ricevute di donazione](../donations/giving-statements.md) -- genera le ricevute fiscali di fine anno
- [Fare donazioni](../../b1-church/giving/making-donations.md) -- l'esperienza di donazione dei membri su B1.church e nell'app B1
