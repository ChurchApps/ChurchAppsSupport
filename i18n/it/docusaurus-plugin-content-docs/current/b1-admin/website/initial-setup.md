---
title: "Configurazione iniziale"
---

# Configurazione iniziale

<div class="article-intro">

Ogni account B1 viene fornito con un sito web pronto all'uso. Questa guida ti accompagna nella configurazione del dominio della tua chiesa, nella configurazione dell'aspetto del tuo sito, nella creazione delle tue prime pagine e nell'organizzazione della navigazione.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account B1.church con accesso amministrativo
- Se usi un dominio personalizzato, tieni pronti i tuoi dati di accesso al provider DNS (es. GoDaddy, Cloudflare o AWS)
- Prepara il logo della tua chiesa in formato PNG con sfondo trasparente per i migliori risultati

</div>

## Configurare il tuo dominio

La tua chiesa riceve automaticamente un sottodominio su B1.church (ad esempio, `yourchurch.b1.church`). Puoi anche puntare il tuo dominio personalizzato al tuo sito B1.

1. Vai su **B1.church Admin** visitando admin.b1.church o cliccando il menu a tendina del profilo e scegliendo **Switch App**.
2. Clicca **Dashboard** nella barra laterale sinistra, poi seleziona **Settings** dal menu a tendina.
3. Clicca **Manage** per visualizzare il tuo sottodominio. Impostalo su qualcosa di breve e riconoscibile senza spazi.
4. Per usare un dominio personalizzato, accedi al tuo provider DNS (come GoDaddy, Cloudflare o AWS) e aggiungi due record:
   - Un **record A** per il tuo dominio root che punta a `3.23.251.61`
   - Un **record CNAME** per `www` che punta a `proxy.b1.church`
5. Torna a B1.church Admin, aggiungi il tuo dominio personalizzato alla lista e clicca **Add** poi **Save**. Il tuo sito sarà accessibile dal tuo dominio personalizzato in pochi minuti.

:::tip
Se non vedi l'opzione Settings, chiedi alla persona che ha configurato l'account della tua chiesa di concederti il permesso "Edit Church Settings". Vedi [Ruoli e permessi](../settings/roles-permissions.md) per i dettagli.
:::

## Creare la tua prima pagina

1. In B1 Admin, clicca **Website** nel menu a sinistra per aprire la vista Website Pages.
2. Clicca **Add Page** nell'angolo in alto a destra.
3. Scegli **Blank** come tipo di pagina e chiamala "Home".
4. Clicca **Page Settings** e imposta il percorso URL su `/` (una barra senza testo) per la tua home page. Le altre pagine usano `/nome-pagina`.
5. Clicca **Edit Content** per iniziare a costruire. Ogni pagina deve iniziare con una **Section** -- questo è il contenitore per tutti gli altri elementi.
6. Dopo aver aggiunto una sezione, clicca di nuovo **Add Content** per inserire testo, immagini, video, schede, moduli e altro trascinandoli nella tua sezione.

:::info
Per istruzioni dettagliate su come lavorare con pagine, navigazione e tipi di pagina, vedi [Gestione pagine](managing-pages).
:::

## Configurare l'aspetto del sito

1. Dalla vista Website Pages, clicca la scheda **Appearance** in cima.
2. Usa la **Color Palette** per impostare i colori del tuo brand per i toni primari, secondari e accent.
3. In **Typography Settings**, scegli i font per titoli e testo del corpo dal browser dei font.
4. Carica il logo della tua chiesa in **Logo** nelle Style Settings. Fornisci sia la versione per sfondo chiaro che per sfondo scuro.
5. Configura il tuo **Site Footer** con le informazioni di contatto e i link della tua chiesa.

:::info
Le modifiche che fai in Appearance si applicano su tutto il tuo sito web. Vedi la pagina [Aspetto](appearance) per istruzioni dettagliate su ogni impostazione.
:::

## Configurare la navigazione

I tuoi link di navigazione appaiono nella barra laterale sinistra della vista Website Pages. Per organizzarli:

1. Clicca **Add** per creare un nuovo link di navigazione e puntalo a una delle tue pagine.
2. Trascina e rilascia i link per riordinarli o annidarli sotto elementi padre.
3. Visualizza l'anteprima del tuo sito per confermare che la navigazione appaia corretta.

## Prossimi passi

- [Gestione pagine](managing-pages) -- Scopri come lavorare con pagine e navigazione in dettaglio
- [Aspetto](appearance) -- Regola finemente colori, font e layout del tuo sito
- [File](files) -- Carica immagini e documenti per il tuo sito web
