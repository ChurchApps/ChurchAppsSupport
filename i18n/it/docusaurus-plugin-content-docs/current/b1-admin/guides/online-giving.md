---
title: "Guida: Configurare le offerte online"
description: "Configura le offerte online in B1 Admin creando i fondi per le donazioni, collegando Stripe e aggiungendo una pagina Dona al tuo sito B1.church per i membri."
---

# Configurare le offerte online

<div class="article-intro">

Ecco tutto ciò che serve per accettare donazioni online nella tua chiesa: dalla creazione dei fondi per le donazioni, al collegamento di Stripe per l'elaborazione dei pagamenti, fino alla condivisione della pagina delle offerte con la comunità. Al termine, i membri potranno donare online tramite il tuo sito web e l'app mobile.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account B1 Admin con accesso amministrativo — vedi [Ruoli e permessi](../people/roles-permissions.md)
- Un account Stripe (creane uno gratuitamente su [stripe.com](https://stripe.com) se necessario)

</div>

## Passaggio 1: Creare i fondi per le donazioni

I fondi sono le categorie a cui i donatori possono destinare le proprie offerte. Ti serve almeno un fondo prima di poter accettare donazioni.

Segui la guida [Fondi](../donations/funds.md) per configurare le categorie di offerta:

1. Crea i fondi più comuni (ad esempio "Fondo generale", "Fondo edificio", "Missioni")
2. Contrassegna in modo appropriato i fondi detraibili dalle tasse: questo influisce sugli estratti conto annuali delle offerte

:::tip
Puoi aggiungere altri fondi in qualsiasi momento. Inizia con le categorie di offerta più comuni.
:::

## Passaggio 2: Collegare Stripe

Stripe gestisce tutta l'elaborazione dei pagamenti. Collegherai il tuo account Stripe a B1 Admin in modo che le donazioni confluiscano sul tuo conto bancario.

Segui la guida [Configurazione delle offerte online](../donations/online-giving-setup.md) per collegare Stripe:

1. Accedi alla dashboard di Stripe e recupera la tua Chiave pubblicabile e la tua Chiave segreta
2. In B1 Admin, vai su Impostazioni e inserisci entrambe le chiavi

:::warning
Stripe mostra la Chiave segreta una sola volta. Copiala e salvala prima di lasciare la dashboard di Stripe. Se la perdi, dovrai generarne una nuova.
:::

## Passaggio 3: Aggiungere una pagina delle offerte al sito web

Rendi accessibili le offerte aggiungendo una pagina di donazione al tuo sito B1.

Segui le guide [Configurazione delle offerte online](../donations/online-giving-setup.md) e [Gestione delle pagine](../website/managing-pages.md) per:

1. Aggiungere una scheda "Dona" al tuo sito B1.church
2. L'URL per le offerte sarà: `https://yoursubdomain.b1.church/donate`
3. I membri possono donare senza effettuare l'accesso (pagina pubblica) oppure accedere per salvare i metodi di pagamento e consultare lo storico delle donazioni

## Passaggio 4: Effettuare una donazione di prova

Prima di annunciare la novità alla comunità, verifica che tutto funzioni.

1. Effettua una piccola donazione di prova per verificare che il flusso funzioni dall'inizio alla fine
2. Controlla che la donazione compaia in B1 Admin, nella sezione Donazioni

:::tip
Se vuoi verificare senza addebiti reali, usa prima la modalità test di Stripe, poi passa alla modalità live prima di annunciare la novità alla comunità.
:::

## Passaggio 5: Annunciare la novità alla comunità

Fai sapere ai membri che possono donare online.

1. Condividi l'URL delle offerte tramite il tuo sito web, le newsletter via email, i bollettini e i social media
2. I membri possono anche donare tramite la [B1 App](../../b1-church/giving/index.md): la funzione di offerta è integrata

:::info
I membri che effettuano l'accesso possono salvare i metodi di pagamento, configurare donazioni ricorrenti e consultare lo storico delle offerte. È possibile anche donare in forma anonima: non serve alcun accesso.
:::

## Passaggio 6: Gestione continua

Mantieni aggiornati i registri delle donazioni e genera report durante tutto l'anno.

1. [Importa le transazioni Stripe](../donations/stripe-import.md) regolarmente (settimanalmente o mensilmente) per mantenere aggiornati i registri
2. [Consulta i report sulle donazioni](../donations/donation-reports.md) per monitorare l'andamento e i totali delle offerte per fondo
3. [Genera gli estratti conto annuali delle offerte](../donations/giving-statements.md) per la documentazione fiscale dei donatori

:::tip
Esegui le importazioni da Stripe almeno una volta al mese, così i tuoi registri restano aggiornati. Consulta la [Guida ai report di fine anno](./year-end-reports.md) per il processo completo di fine anno.
:::

## Hai finito!

La tua chiesa ora accetta donazioni online. I membri possono donare tramite il tuo sito web, la B1 App o da qualsiasi dispositivo con un browser web. Tutte le donazioni vengono registrate automaticamente in B1 Admin.

## Articoli correlati

- [Fondi](../donations/funds.md): crea e gestisci le categorie di donazione
- [Lotti](../donations/batches.md): organizza le donazioni in gruppi
- [Registrare le donazioni](../donations/recording-donations.md): inserisci manualmente le offerte in contanti e con assegno
- [Importazione Stripe](../donations/stripe-import.md): importa le transazioni online in B1 Admin
- [Report sulle donazioni](../donations/donation-reports.md): consulta l'andamento e i totali delle offerte
- [Estratti conto delle offerte](../donations/giving-statements.md): genera gli estratti conto fiscali annuali
- [Effettuare donazioni](../../b1-church/giving/making-donations.md): l'esperienza di donazione dei membri su B1.church e nella B1 App
