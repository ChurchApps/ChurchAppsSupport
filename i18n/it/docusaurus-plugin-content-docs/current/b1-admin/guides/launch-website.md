---
title: "Guida: Lancia il sito web della tua chiesa"
---

# Lancia il sito web della tua chiesa

<div class="article-intro">

B1.church include un costruttore di siti web completo senza costi aggiuntivi. Questa guida ti accompagna nella creazione del sito web della tua chiesa da zero: configurazione della home page, personalizzazione dell'aspetto, aggiunta delle pagine principali e, facoltativamente, collegamento delle donazioni online e dei moduli di iscrizione agli eventi.

</div>

## Video di formazione

<YouTube id="aA4UahZpmXg" title="Lanciare il sito web della tua chiesa in B1" next="Modificare pagine e navigazione in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Tieni pronto il logo della tua chiesa (un PNG con sfondo trasparente funziona meglio)
- Scegli 2–3 colori del marchio per il tuo sito
- Se usi un dominio personalizzato (ad esempio miachiesa.it), assicurati di avere accesso al tuo provider DNS (GoDaddy, Cloudflare, ecc.)
- Se vuoi le donazioni online sul tuo sito, completa prima la [Configurazione delle donazioni online](../donations/online-giving-setup.md) (Stripe)

</div>

## Passaggio 1: Configurazione iniziale del sito web

Inizia creando la home page e la struttura di base del sito.

Segui la guida [Configurazione iniziale del sito web](../website/initial-setup.md) per:

1. Accedere a **Sito web** in B1 Admin
2. Creare la home page con una sezione hero, un messaggio di benvenuto e le informazioni principali
3. Aggiungere il nome e lo slogan della tua chiesa

## Passaggio 2: Configurare l'aspetto

Imposta l'identità visiva del sito -- colori, caratteri, logo e piè di pagina.

Segui la guida [Aspetto](../website/appearance.md) per:

1. Caricare il logo della tua chiesa
2. Impostare i colori principale e di accento
3. Configurare la barra di navigazione e il piè di pagina
4. Visualizzare l'anteprima delle modifiche

:::tip
Mantieni semplice la tua tavolozza di colori -- di solito bastano un colore principale e un colore di accento. Il costruttore di siti web si occuperà del resto.
:::

## Passaggio 3: Aggiungere le pagine di contenuto

Crea le pagine di cui i tuoi visitatori hanno più bisogno.

Segui la guida [Gestire le pagine](../website/managing-pages.md) per creare pagine come:

- **Chi siamo** -- La storia della tua chiesa, le sue convinzioni e la sua guida
- **Predicazioni** -- Collegamento alla tua [libreria di predicazioni](../sermons/managing-sermons.md)
- **Eventi** -- Eventi in programma e iscrizioni
- **Dona** -- Pagina delle donazioni online (richiede la [configurazione di Stripe](../donations/online-giving-setup.md))
- **Contatti** -- Sede, orari dei culti e recapiti

## Passaggio 4: Collegare il tuo dominio

Se vuoi usare un tuo nome di dominio (come miachiesa.it) invece dell'URL predefinito di B1:

1. Vai su **Impostazioni** in B1 Admin e apri la sezione **Domini**
2. Inserisci il tuo dominio personalizzato
3. Aggiorna i record DNS presso il tuo provider di dominio perché puntino a B1

:::info
Le modifiche DNS possono richiedere fino a 48 ore per propagarsi. Il sito potrebbe non essere raggiungibile subito dal tuo dominio personalizzato. L'URL predefinito di B1 continuerà a funzionare nel frattempo.
:::

## Passaggio 5: Aggiungere donazioni e moduli

Arricchisci il sito con elementi interattivi:

- **Donazioni online** -- Aggiungi una sezione per le donazioni, così i membri possono donare direttamente dal sito web. Vedi [Configurazione delle donazioni online](../donations/online-giving-setup.md) per configurare prima Stripe.
- **Moduli di iscrizione** -- Incorpora [moduli indipendenti](../forms/creating-forms.md) per iscrizioni a eventi, schede visitatori o candidature di volontariato. Vedi [Gestire le pagine](../website/managing-pages.md) per sapere come aggiungere un elemento modulo a qualsiasi pagina.

## Fatto!

Il sito web della tua chiesa è online. Condividi l'URL con la tua comunità e sui social media. Puoi aggiornare i contenuti, aggiungere nuove pagine e modificare l'aspetto in qualsiasi momento dalla dashboard di B1 Admin.

## Articoli correlati

- [Configurazione iniziale del sito web](../website/initial-setup.md) -- procedura dettagliata di configurazione
- [Gestire le pagine](../website/managing-pages.md) -- aggiungi e modifica le pagine
- [Aspetto](../website/appearance.md) -- colori, logo e layout
- [Gestire i file](../website/files.md) -- carica immagini e documenti
- [Configurazione delle donazioni online](../donations/online-giving-setup.md) -- configura Stripe
- [Creare moduli](../forms/creating-forms.md) -- crea moduli di iscrizione e sondaggi
