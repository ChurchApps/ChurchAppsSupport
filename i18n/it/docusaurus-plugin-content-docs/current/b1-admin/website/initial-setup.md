---
title: "Configurazione Iniziale"
---

# Configurazione Iniziale

<div class="article-intro">

Ogni account B1 viene fornito con un sito web pronto all'uso. Questa guida ti guida attraverso la configurazione del dominio della tua chiesa, la personalizzazione dell'aspetto del tuo sito, la creazione delle tue prime pagine e l'organizzazione della navigazione.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1.church con accesso amministrativo
- Se usi un dominio personalizzato, prepara le credenziali di accesso del tuo provider DNS (es. GoDaddy, Cloudflare, o AWS)
- Prepara il logo della tua chiesa in formato PNG con sfondo trasparente per i migliori risultati

</div>

## Configurazione del Tuo Dominio

La tua chiesa riceve automaticamente un sottodominio su B1.church (ad esempio, `tuachiesa.b1.church`). Puoi anche puntare il tuo dominio personalizzato al tuo sito B1.

1. Vai a **B1.church Admin** visitando admin.b1.church o facendo clic nel menu a discesa del tuo profilo e scegliendo **Cambia App**.
2. Apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
3. Fai clic su **Gestisci** per visualizzare il tuo sottodominio. Impostalo su qualcosa di breve e riconoscibile senza spazi.
4. Per utilizzare un dominio personalizzato, accedi al tuo provider DNS (come GoDaddy, Cloudflare, o AWS) e aggiungi due record:
   - Un **record A** per il tuo dominio radice che punta a `3.23.251.61`
   - Un **record CNAME** per `www` che punta a `proxy.b1.church`
5. Torna a B1.church Admin, aggiungi il tuo dominio personalizzato all'elenco, e fai clic su **Aggiungi** poi **Salva**. Il tuo sito sarà accessibile dal tuo dominio personalizzato entro pochi minuti.

:::tip
Se non vedi l'opzione Impostazioni, chiedi alla persona che ha configurato il tuo account chiesa di concederti il permesso "Modifica Impostazioni Chiesa". Vedi [Ruoli e Autorizzazioni](../settings/roles-permissions.md) per i dettagli.
:::

## Creazione della Tua Prima Pagina

1. In B1 Admin, fai clic su **Sito Web** nel menu sinistro per aprire la vista Pagine del Sito Web.
2. Fai clic su **Aggiungi Pagina** nell'angolo in alto a destra.
3. Scegli **Vuoto** come tipo di pagina e chiamalo "Home".
4. Fai clic su **Impostazioni Pagina** e imposta il percorso URL su `/` (una barra in avanti senza testo) per la tua pagina iniziale. Altre pagine usano `/nome-pagina`.
5. Fai clic su **Modifica Contenuto** per iniziare a costruire. Ogni pagina deve iniziare con una **Sezione** -- questo è il contenitore per tutti gli altri elementi.
6. Dopo aver aggiunto una sezione, fai clic su **Aggiungi Contenuto** di nuovo per inserire testo, immagini, video, schede, moduli e altro trascinandoli nella tua sezione.

:::info
Per istruzioni dettagliate sul lavoro con pagine e navigazione, vedi [Gestione delle Pagine](managing-pages). Per una guida completa all'editor visivo, vedi [Utilizzo dell'Editor di Pagina](page-editor).
:::

## Configurazione dell'Aspetto del Sito

1. Dalla vista Pagine del Sito Web, fai clic sulla scheda **Aspetto** in cima.
2. Usa la **Tavolozza di Colori** per impostare i colori del tuo marchio per i toni primario, secondario e di accento.
3. Sotto **Impostazioni Tipografia**, scegli i tuoi caratteri per intestazioni e corpo dall'esploratore di caratteri.
4. Carica il logo della tua chiesa sotto **Logo** nelle Impostazioni di Stile. Fornisci sia una versione su sfondo chiaro che scuro.
5. Configura il tuo **Piè di Pagina del Sito** con le informazioni di contatto della tua chiesa e i link.

:::info
I cambiamenti che fai in Aspetto si applicano a tutto il tuo sito web. Vedi la pagina [Aspetto](appearance) per istruzioni dettagliate su ogni impostazione.
:::

## Configurazione della Navigazione

I tuoi link di navigazione appaiono nella vista Pagine del Sito Web. Per organizzarli:

1. Fai clic su **Aggiungi** per creare un nuovo link di navigazione e puntarlo a una delle tue pagine.
2. Trascina e rilascia i link per riordinarli o nidificarli sotto elementi genitori.
3. Visualizza l'anteprima del tuo sito per confermare che la navigazione abbia un bell'aspetto.

## Passaggi Successivi

- [Gestione delle Pagine](managing-pages) -- Scopri come lavorare in dettaglio con pagine e navigazione
- [Aspetto](appearance) -- Messa a punto dei colori, caratteri e layout del tuo sito
- [File](files) -- Carica immagini e documenti per il tuo sito web
