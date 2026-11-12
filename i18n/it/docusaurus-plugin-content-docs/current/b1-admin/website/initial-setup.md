---
title: "Primi passi con il sito web di B1 Admin"
sidebar_label: "Configurazione iniziale"
description: "Configura il sito web della tua chiesa in B1 Admin: collega un sottodominio o un dominio personalizzato, crea la home page, scegli i colori del brand e il logo, e costruisci la navigazione."
---

# Configurazione iniziale

<div class="article-intro">

Ogni account B1 include già un sito web pronto all'uso. Questa guida ti accompagna nella configurazione del dominio della chiesa, nella personalizzazione dell'aspetto del sito, nella creazione delle prime pagine e nell'organizzazione della navigazione.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve un account B1.church con accesso amministrativo
- Se usi un dominio personalizzato, tieni pronte le credenziali di accesso del tuo provider DNS (ad esempio GoDaddy, Cloudflare o AWS)
- Prepara il logo della chiesa in formato PNG con sfondo trasparente, per i risultati migliori

</div>

## Configurare il dominio {#setting-up-your-domain}

La tua chiesa riceve automaticamente un sottodominio su B1.church (ad esempio, `yourchurch.b1.church`). Puoi anche collegare il tuo dominio personalizzato al tuo sito B1.

1. Vai su **B1.church Admin** visitando admin.b1.church oppure facendo clic sul menu a tendina del tuo profilo e scegliendo **Cambia app**.
2. Apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
3. Apri la sezione **Informazioni sulla chiesa** per visualizzare il tuo sottodominio. Impostalo su qualcosa di breve e riconoscibile, senza spazi.
4. Per usare un dominio personalizzato, accedi al tuo provider DNS (come GoDaddy, Cloudflare o AWS) e aggiungi due record:
   - Un **record A** per il dominio principale che punta a `3.23.251.61`
   - Un **record CNAME** per `www` che punta a `proxy.b1.church`
5. Torna in B1.church Admin, apri la sezione **Domini** nella stessa pagina Impostazioni, aggiungi il tuo dominio personalizzato all'elenco e fai clic su **Aggiungi**, poi su **Salva**. Il tuo sito sarà accessibile dal dominio personalizzato nel giro di pochi minuti.

:::tip
Se non vedi la voce Impostazioni, chiedi alla persona che ha configurato l'account della chiesa di concederti l'autorizzazione "Modifica impostazioni chiesa". Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md) per i dettagli.
:::

## Creare la prima pagina {#creating-your-first-page}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Sito web** e fai clic su **Pagine**.
2. Fai clic su **Aggiungi pagina** in alto a destra.
3. Scegli **Vuota** come tipo di pagina, inserisci "Home" come **Titolo della pagina** e fai clic su **Salva**.
4. Fai clic su **Impostazioni pagina** nella riga della nuova pagina e cambia il **Percorso URL** in `/` (una barra senza altro testo) per la tua home page. Le altre pagine usano `/page-name`.
5. Fai clic su **Modifica contenuto** per iniziare a costruire. Ogni pagina deve iniziare con una **Sezione** — è il contenitore per tutti gli altri elementi. Fai clic su **Aggiungi contenuto** e trascina **Sezione** nella pagina, poi scegli un layout di sezione già pronto oppure una **Sezione vuota**.
6. Dopo aver aggiunto una sezione, fai di nuovo clic su **Aggiungi contenuto** per inserire testo, immagini, video, schede, moduli e altro, trascinandoli nella tua sezione.

:::info
Per istruzioni dettagliate su pagine e navigazione, vedi [Gestire le pagine](./managing-pages.md). Per una guida completa all'editor visuale, vedi [Usare l'editor di pagina](./page-editor.md).
:::

## Configurare l'aspetto del sito {#configuring-site-appearance}

1. Nel menu di salto, scegli **Sito web > Aspetto**.
2. Usa la **Tavolozza dei colori** per impostare i colori del brand — le tonalità chiara di base, d'accento e scura, oltre ai colori dei pulsanti primario e secondario — poi fai clic su **Salva tavolozza**.
3. In **Caratteri**, scegli i caratteri per i titoli e per il testo dal selettore dei font e fai clic su **Salva caratteri**.
4. Carica il logo della chiesa in **Logo** nelle Impostazioni di stile. Fornisci sia una versione per sfondo chiaro sia una per sfondo scuro, poi fai clic su **Salva modifiche**.
5. Fai clic su **Piè di pagina del sito** per aprire il piè di pagina nell'editor dei blocchi e aggiungere i recapiti e i collegamenti della tua chiesa.

:::info
Le modifiche fatte in Aspetto si applicano a tutto il sito web. Vedi la pagina [Aspetto](./appearance.md) per istruzioni dettagliate su ogni impostazione.
:::

## Configurare la navigazione {#setting-up-navigation}

I collegamenti di navigazione compaiono nella vista Pagine del sito. Per organizzarli:

1. Nel pannello **Navigazione principale**, fai clic su **Aggiungi**, inserisci il **Testo del collegamento** e il percorso della pagina (ad esempio, `/about`) come **URL**, poi fai clic su **Salva**.
2. Trascina i collegamenti per riordinarli o per annidarli sotto le voci padre.
3. Visualizza in anteprima il sito per verificare che la navigazione appaia corretta.

## Passaggi successivi {#next-steps}

- [Gestire le pagine](./managing-pages.md) -- Scopri come lavorare con pagine e navigazione nel dettaglio
- [Aspetto](./appearance.md) -- Metti a punto colori, caratteri e layout del sito
- [File](./files.md) -- Carica immagini e documenti per il tuo sito
