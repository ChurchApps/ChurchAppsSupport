---
title: "Guida: lancia il sito web della tua chiesa"
description: "Configura un sito web per la chiesa in B1 Admin: costruisci la home page, abbina colori e logo, aggiungi le pagine principali, collega un dominio personalizzato e aggiungi i moduli per le donazioni."
---

# Lancia il sito web della tua chiesa

<div class="article-intro">

B1.church include un completo costruttore di siti web senza costi aggiuntivi. Questa guida ti accompagna nella creazione del sito web della tua chiesa da zero -- configurando la home page, l'aspetto generale, aggiungendo le pagine principali e, facoltativamente, collegando i moduli per le donazioni online e le iscrizioni agli eventi.

</div>

## Video di formazione {#training-video}

<YouTube id="aA4UahZpmXg" title="Lanciare il sito web della tua chiesa in B1" next="Modificare pagine e navigazione in B1" nextUrl="/docs/b1-admin/website/page-editor" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Tieni pronto il logo della chiesa (un PNG con sfondo trasparente funziona meglio)
- Scegli 2-3 colori del marchio per il tuo sito
- Se usi un dominio personalizzato (ad esempio tuachiesa.org), ti serve l'accesso al tuo provider DNS (GoDaddy, Cloudflare, ecc.)
- Se vuoi le donazioni online sul tuo sito, completa prima la [Configurazione delle donazioni online](../donations/online-giving-setup.md) (Stripe)

</div>

## Passo 1: configurazione iniziale del sito {#step-1-initial-website-setup}

Inizia creando la home page e la struttura di base del sito.

Segui la guida [Configurazione iniziale del sito](../website/initial-setup.md) per:

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegliere **Sito web > Pagine**
2. Fare clic su **Aggiungi pagina**, scegliere **Vuota**, inserire "Home" come **Titolo della pagina** e fare clic su **Salva**. In **Impostazioni pagina**, impostare il **Percorso URL** su `/`
3. Fare clic su **Modifica contenuto**, aggiungere una **Sezione**, poi aggiungere il tuo banner principale, il messaggio di benvenuto, il nome e lo slogan della chiesa e le altre informazioni essenziali

:::tip
Parti da zero? Un [Modello di sito](../website/managing-pages.md#starting-from-a-site-template) crea una serie di pagine già pronte (home, chi siamo, connettiti, dona e altre) con i link di navigazione già collegati -- sostituisci il contenuto segnaposto con il tuo.
:::

## Passo 2: configura l'aspetto {#step-2-configure-appearance}

Imposta l'identità visiva del sito -- colori, font, logo e piè di pagina.

Segui la guida [Aspetto](../website/appearance.md) per:

1. Nel menu Jump, scegliere **Sito web > Aspetto**
2. In **Logo**, caricare un **Logo per sfondo chiaro** e un **Logo per sfondo scuro**
3. In **Tavolozza dei colori**, impostare i colori del marchio e fare clic su **Salva tavolozza**, poi scegliere i **Font**
4. Usare **Navigazione** per definire lo stile della barra di navigazione e **Piè di pagina del sito** per costruire il piè di pagina che compare su ogni pagina

:::tip
Mantieni semplice la tavolozza dei colori -- di solito bastano un colore principale e un colore di accento. Il costruttore del sito si occupa del resto.
:::

## Passo 3: aggiungi le pagine di contenuto {#step-3-add-content-pages}

Crea le pagine di cui i visitatori hanno più bisogno.

Segui la guida [Gestire le pagine](../website/managing-pages.md) per creare pagine come:

- **Chi siamo** -- la storia della tua chiesa, le sue convinzioni e la sua leadership
- **Predicazioni** -- collegamento alla tua [libreria di predicazioni](../sermons/managing-sermons.md)
- **Eventi** -- eventi in programma e iscrizioni
- **Dona** -- pagina delle donazioni online (richiede la [configurazione di Stripe](../donations/online-giving-setup.md))
- **Contatti** -- sede, orari dei culti e recapiti

## Passo 4: collega il tuo dominio {#step-4-connect-your-domain}

Se vuoi usare un tuo nome di dominio (come tuachiesa.org) invece dell'URL predefinito di B1:

Segui la guida [Dominio personalizzato](../settings/custom-domain.md) per:

1. Presso il tuo provider di domini, aggiungere un record **CNAME** per `www` che punti a `proxy.b1.church` (oppure un record **A** per il dominio principale che punti a `3.23.251.61`)
2. Nel menu Jump, scegliere **Impostazioni > Impostazioni**, fare clic su **Modifica** nella sezione **Domini**, digitare il tuo dominio e fare clic su **Salva**

:::info
Configura prima il DNS: B1 salva subito il dominio, ma non caricherà il tuo sito (né otterrà il certificato SSL) finché il DNS non punta a B1. Le modifiche DNS possono richiedere da qualche minuto a qualche ora. L'URL predefinito di B1 continua a funzionare per tutto il tempo.
:::

## Passo 5: aggiungi donazioni e moduli {#step-5-add-giving-and-forms}

Arricchisci il sito con elementi interattivi:

- **Donazioni online** -- Aggiungi un elemento **Donazione** così i membri possono donare direttamente dal tuo sito web. Vedi [Configurazione delle donazioni online](../donations/online-giving-setup.md) per configurare prima Stripe.
- **Moduli di iscrizione** -- Incorpora [moduli Autonomi](../forms/creating-forms.md) per iscrizioni agli eventi, schede visitatori o candidature di volontariato con l'elemento **Modulo**. Vedi l'[Editor delle pagine](../website/page-editor.md) per capire come aggiungere elementi a qualsiasi pagina.

## Hai finito! {#youre-done}

Il sito web della tua chiesa è online. Condividi l'URL con la comunità e sui social. Puoi aggiornare i contenuti, aggiungere nuove pagine e modificare l'aspetto in qualsiasi momento dalla sezione **Sito web** di B1 Admin.

## Articoli correlati {#related-articles}

- [Configurazione iniziale del sito](../website/initial-setup.md) -- procedura dettagliata di configurazione
- [Gestire le pagine](../website/managing-pages.md) -- aggiungi e modifica le pagine
- [Aspetto](../website/appearance.md) -- colori, logo e layout
- [Editor delle pagine](../website/page-editor.md) -- aggiungi sezioni, testi, immagini, moduli e donazioni
- [Dominio personalizzato](../settings/custom-domain.md) -- usa il tuo indirizzo web
- [Gestire i file](../website/files.md) -- carica immagini e documenti
- [Configurazione delle donazioni online](../donations/online-giving-setup.md) -- configura Stripe
- [Creare moduli](../forms/creating-forms.md) -- crea moduli di iscrizione e sondaggi
