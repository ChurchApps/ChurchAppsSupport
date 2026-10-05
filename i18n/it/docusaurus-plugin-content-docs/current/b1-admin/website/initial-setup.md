---
title: "Configurazione Iniziale"
---

# Configurazione Iniziale

<div class="article-intro">

Ogni account B1 viene fornito con un sito web pronto all'uso. Questa guida ti guida attraverso la configurazione del dominio della tua chiesa, la configurazione dell'aspetto del tuo sito, la creazione delle tue prime pagine e l'organizzazione della tua navigazione.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1.church con accesso amministrativo
- Se stai utilizzando un dominio personalizzato, tieni pronte le credenziali di accesso del tuo provider DNS (ad es., GoDaddy, Cloudflare o AWS)
- Prepara il logo della tua chiesa in formato PNG con sfondo trasparente per i migliori risultati

</div>

## Configurazione del Dominio

La tua chiesa riceve automaticamente un sottodominio su B1.church (ad esempio, `tuachiesa.b1.church`). Puoi anche puntare il tuo dominio personalizzato al tuo sito B1.

1. Vai a **B1.church Admin** visitando admin.b1.church o facendo clic sul tuo menu a discesa del profilo e scegliendo **Cambia App**.
2. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
3. Apri la sezione **Informazioni Chiesa** per visualizzare il tuo sottodominio. Impostalo su qualcosa di breve e riconoscibile senza spazi.
4. Per utilizzare un dominio personalizzato, accedi al tuo provider DNS (come GoDaddy, Cloudflare o AWS) e aggiungi due record:
   - Un **record A** per il tuo dominio root che punta a `3.23.251.61`
   - Un **record CNAME** per `www` che punta a `proxy.b1.church`
5. Torna a B1.church Admin, aggiungi il tuo dominio personalizzato all'elenco, e fai clic su **Aggiungi** quindi **Salva**. Il tuo sito sarà accessibile dal tuo dominio personalizzato entro pochi minuti.

:::tip
Se non vedi l'opzione Impostazioni, chiedi alla persona che ha configurato il tuo account chiesa di concederti il permesso "Modifica Impostazioni Chiesa". Vedi [Ruoli e Permessi](../settings/roles-permissions.md) per i dettagli.
:::

## Creazione della Tua Prima Pagina

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Website** e fai clic su **Pages**.
2. Fai clic su **Aggiungi Pagina** nell'angolo in alto a destra.
3. Scegli **Vuoto** come tipo di pagina e denominalo "Home".
4. Fai clic su **Impostazioni Pagina** e imposta il percorso URL su `/` (una barra in avanti senza testo) per la tua home page. Le altre pagine usano `/nome-pagina`.
5. Fai clic su **Modifica Contenuto** per iniziare a costruire. Ogni pagina deve iniziare con una **Sezione** -- questo è il contenitore per tutti gli altri elementi.
6. Dopo aver aggiunto una sezione, fai clic di nuovo su **Aggiungi Contenuto** per inserire testo, immagini, video, schede, moduli e altro trascinandoli nella tua sezione.

:::info
Per istruzioni dettagliate su come lavorare con le pagine e la navigazione, vedi [Gestione Pagine](managing-pages). Per una guida completa all'editor visuale, vedi [Utilizzo dell'Editor di Pagine](page-editor).
:::

## Configurazione Aspetto del Sito

1. Nel menu Jump, scegli **Website > Aspetto**.
2. Usa la **Tavolozza Colori** per impostare i colori del tuo marchio per i toni primario, secondario e di accento.
3. Sotto **Impostazioni Tipografia**, scegli i tuoi caratteri di titolo e corpo dal browser dei caratteri.
4. Carica il logo della tua chiesa sotto **Logo** nelle Impostazioni Stile. Fornisci sia una versione con sfondo chiaro che con sfondo scuro.
5. Configura il tuo **Piè di Pagina Sito** con le informazioni di contatto e i link della tua chiesa.

:::info
Le modifiche che apportate in Aspetto si applicano a tutto il tuo sito web. Vedi la pagina [Aspetto](appearance) per istruzioni dettagliate su ogni impostazione.
:::

## Configurazione Navigazione

I tuoi link di navigazione appaiono nella visualizzazione Pagine Sito Web. Per organizzarli:

1. Fai clic su **Aggiungi** per creare un nuovo link di navigazione e puntarlo a una delle tue pagine.
2. Trascina e rilascia i link per riordinarli o annidarli sotto elementi padre.
3. Visualizza l'anteprima del tuo sito per confermare che la navigazione appaia corretta.

## Prossimi Passaggi

- [Gestione Pagine](managing-pages) -- Scopri come lavorare con le pagine e la navigazione in dettaglio
- [Aspetto](appearance) -- Metti a punto i colori, i caratteri e il layout del tuo sito
- [File](files) -- Carica immagini e documenti per il tuo sito web
