---
title: "Configurazione iniziale"
---

# Configurazione iniziale

<div class="article-intro">

Ogni account B1 viene fornito con un sito Web pronto all'uso. Questa guida ti guida attraverso la configurazione del tuo dominio chiesa, la configurazione dell'aspetto del tuo sito, la creazione delle tue prime pagine e l'organizzazione della tua navigazione.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1.church con accesso amministrativo
- Se utilizzi un dominio personalizzato, prepara le credenziali di accesso del tuo provider DNS (ad esempio GoDaddy, Cloudflare o AWS)
- Prepara il logo della tua chiesa in formato PNG con uno sfondo trasparente per i migliori risultati

</div>

## Configurazione del tuo dominio

La tua chiesa riceve automaticamente un sottodominio su B1.church (ad esempio, `tuachiesa.b1.church`). Puoi anche puntare il tuo dominio personalizzato al tuo sito B1.

1. Vai ad **Amministrazione B1.church** visitando admin.b1.church o facendo clic sul menu a discesa del tuo profilo e scegliendo **Cambia app**.
2. Apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
3. Apri la sezione **Informazioni chiesa** per visualizzare il tuo sottodominio. Impostalo su qualcosa di breve e riconoscibile senza spazi.
4. Per utilizzare un dominio personalizzato, accedi al tuo provider DNS (come GoDaddy, Cloudflare o AWS) e aggiungi due record:
   - Un **record A** per il tuo dominio principale che punta a `3.23.251.61`
   - Un **record CNAME** per `www` che punta a `proxy.b1.church`
5. Torna all'amministrazione B1.church, aggiungi il tuo dominio personalizzato all'elenco e fai clic su **Aggiungi** quindi su **Salva**. Il tuo sito sarà accessibile dal tuo dominio personalizzato entro pochi minuti.

:::tip
Se non vedi l'opzione Impostazioni, chiedi alla persona che ha configurato il tuo account chiesa di concederti il permesso "Modifica impostazioni chiesa". Vedi [Ruoli e permessi](../settings/roles-permissions.md) per i dettagli.
:::

## Creazione della tua prima pagina

1. In B1 Admin, fai clic su **Sito Web** nel menu a sinistra per aprire la vista Pagine sito Web.
2. Fai clic su **Aggiungi pagina** nell'angolo in alto a destra.
3. Scegli **Vuoto** come tipo di pagina e denominalo "Home".
4. Fai clic su **Impostazioni pagina** e imposta il percorso URL su `/` (una barra in avanti senza testo) per la tua home page. Altre pagine utilizzano `/nome-pagina`.
5. Fai clic su **Modifica contenuto** per iniziare a creare. Ogni pagina deve iniziare con una **Sezione** -- questo è il contenitore per tutti gli altri elementi.
6. Dopo aver aggiunto una sezione, fai clic su **Aggiungi contenuto** di nuovo per inserire testo, immagini, video, carte, moduli e altro trascinandoli nella tua sezione.

:::info
Per istruzioni dettagliate su come utilizzare le pagine e la navigazione, vedi [Gestione pagine](managing-pages). Per una guida completa all'editor visivo, vedi [Utilizzo dell'editor pagine](page-editor).
:::

## Configurazione dell'aspetto del sito

1. Dalla vista Pagine sito Web, fai clic sulla scheda **Aspetto** in alto.
2. Utilizza la **Tavolozza dei colori** per impostare i colori del tuo marchio per i toni primari, secondari e di accento.
3. In **Impostazioni tipografia**, scegli i tuoi caratteri di intestazione e corpo dal browser dei caratteri.
4. Carica il logo della tua chiesa in **Logo** nelle impostazioni di stile. Fornisci sia una versione con sfondo chiaro che una versione con sfondo scuro.
5. Configura il **Piè di pagina del sito** con le informazioni di contatto della tua chiesa e i link.

:::info
I cambiamenti che fai in Aspetto si applicano a tutto il tuo sito Web. Vedi la pagina [Aspetto](appearance) per istruzioni dettagliate su ogni impostazione.
:::

## Configurazione della navigazione

I tuoi link di navigazione appaiono nella vista Pagine sito Web. Per organizzarli:

1. Fai clic su **Aggiungi** per creare un nuovo link di navigazione e puntarlo a una delle tue pagine.
2. Trascinare e rilasciare i link per riordinarli o nidificarli sotto elementi padre.
3. Visualizza in anteprima il tuo sito per confermare che la navigazione appaia corretta.

## Passaggi successivi

- [Gestione pagine](managing-pages) -- Scopri come utilizzare le pagine e la navigazione in dettaglio
- [Aspetto](appearance) -- Perfeziona i colori, i caratteri e il layout del tuo sito
- [File](files) -- Carica immagini e documenti per il tuo sito Web
