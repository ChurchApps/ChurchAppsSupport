---
title: "Stili di Navigazione"
---

# Stili di Navigazione

<div class="article-intro">

Personalizza i colori della barra di navigazione del tuo sito web della chiesa per abbinare il tuo marchio. Puoi configurare i colori sia per sfondi solidi che per overlay trasparenti, dandoti il controllo completo su come appare la tua navigazione su diverse pagine.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso per gestire il tuo sito web della chiesa. Vedi [Ruoli e Autorizzazioni](../people/roles-permissions.md) per i dettagli.
- Tieni i tuoi colori del marchio pronti, inclusi i codici di colore esadecimali (ad es. #03A9F4).
- Comprendi la differenza tra gli stili di navigazione solida e trasparente sul tuo sito web.

</div>

## Comprensione delle Modalità di Navigazione

La navigazione del tuo sito web può apparire in due stili diversi a seconda della pagina:

- **Navigazione solida** -- Barra di navigazione con un colore di sfondo, tipicamente utilizzata sulle pagine di contenuto
- **Navigazione trasparente** -- Navigazione che si sovrappone al contenuto della pagina, tipicamente utilizzata su pagine con immagini hero o sfondi a schermo intero

Puoi personalizzare i colori per entrambe le modalità in modo indipendente.

## Accesso ai Stili di Navigazione

1. Accedi a **Sito Web** in B1 Admin
2. Fai clic su **Aspetto** nella barra laterale
3. Scorri fino alla sezione **Stili di Navigazione**
4. Fai clic su **Modifica Stili di Navigazione**

## Configurazione della Navigazione Solida

La navigazione solida appare con un colore di sfondo dietro la barra di navigazione. Puoi personalizzare:

### Colore di Sfondo

1. Attiva il pulsante **Override** per **Colore di Sfondo**
2. Fai clic sul selettore di colore
3. Scegli il tuo colore di sfondo desiderato
4. L'impostazione predefinita è bianco (#FFFFFF)

### Colore del Link

1. Attiva il pulsante **Override** per **Colore del Link**
2. Scegli il colore per il testo del link di navigazione
3. Questo influisce sui link nel loro stato predefinito
4. L'impostazione predefinita è grigio scuro (#555555)

### Colore di Hover del Link

1. Attiva il pulsante **Override** per **Colore di Hover del Link**
2. Scegli il colore in cui i link cambiano quando gli utenti passano il mouse su di essi
3. Questo fornisce feedback visivo per i link cliccabili
4. L'impostazione predefinita è blu chiaro (#03A9F4)

### Colore Attivo

1. Attiva il pulsante **Override** per **Colore Attivo**
2. Scegli il colore per il link della pagina attualmente attiva
3. Questo aiuta gli utenti a sapere in quale pagina si trovano
4. L'impostazione predefinita è blu chiaro (#03A9F4)

## Configurazione della Navigazione Trasparente

La navigazione trasparente si sovrappone al contenuto della tua pagina senza sfondo. Puoi personalizzare:

### Colore del Link

1. Attiva il pulsante **Override** per **Colore del Link**
2. Scegli un colore che contrasti bene con lo sfondo della tua pagina
3. Spesso i colori bianchi o chiari funzionano meglio su sfondi scuri
4. L'impostazione predefinita è grigio scuro (#555555)

### Colore di Hover del Link

1. Attiva il pulsante **Override** per **Colore di Hover del Link**
2. Scegli il colore dello stato di hover
3. Assicurati che sia visibile sullo sfondo della tua pagina
4. L'impostazione predefinita è blu chiaro (#03A9F4)

### Colore Attivo

1. Attiva il pulsante **Override** per **Colore Attivo**
2. Scegli il colore dell'indicatore della pagina attiva
3. Dovrebbe spiccare mantenendo comunque il tuo design
4. L'impostazione predefinita è blu chiaro (#03A9F4)

:::info
La navigazione trasparente non ha un'impostazione del colore di sfondo poiché si sovrappone direttamente al contenuto della pagina.
:::

## Salvataggio dei Tuoi Cambiamenti

1. Dopo aver configurato i tuoi colori, fai clic su **Salva Stili di Navigazione**
2. I tuoi cambiamenti si applicano immediatamente al tuo sito web live
3. Visita il tuo sito web per vedere la navigazione in entrambe le modalità

## Ripristino ai Valori Predefiniti

Se desideri tornare ai colori predefiniti:

1. Disattiva i pulsanti **Override** per qualsiasi colore personalizzato
2. Fai clic su **Salva Stili di Navigazione**
3. La navigazione ritorna allo schema di colore predefinito

Oppure fai clic su **Annulla** per scartare tutti i cambiamenti senza salvarli.

## Migliori Pratiche

### Contrasto dei Colori

- **Leggibilità** -- Assicurati che i colori dei link abbiano un contrasto sufficiente con lo sfondo
- **Conformità WCAG** -- Mira a un rapporto di contrasto di almeno 4.5:1 per l'accessibilità
- **Prova entrambe le modalità** -- Visualizza l'anteprima del tuo sito con navigazione sia solida che trasparente

### Coerenza del Marchio

- **Usa i tuoi colori del marchio** -- Abbina il tuo logo e il tema del sito web
- **Limita la tua tavolozza** -- Rimani fedele a 2-3 colori per un aspetto coerente
- **Considera le tue immagini** -- Se usi la navigazione trasparente, testala su sfondi di pagina tipici

### Stati di Hover e Attivo

- **Feedback chiaro** -- Rendi gli stati di hover ovviamente diversi dai link predefiniti
- **Distingui le pagine attive** -- Usa un colore distinto in modo che gli utenti sappiano dove si trovano
- **Transizioni fluide** -- Il sistema anima automaticamente i cambiamenti di colore

## Risoluzione dei Problemi

### I Colori Non Sembrano Giusti

- **Cancella la cache** -- La cache del browser potrebbe mostrare colori vecchi
- **Controlla i codici esadecimali** -- Assicurati di aver inserito codici di colore esadecimali validi
- **Prova su sfondi diversi** -- I colori possono sembrare diversi a seconda della pagina

### La Navigazione Non È Visibile

- **Modo trasparente** -- Se usi la navigazione trasparente su immagini chiare, il testo scuro potrebbe essere difficile da vedere
- **Soluzione** -- Regola i tuoi colori dei link o usa sfondi della pagina più scuri
- **Alternativa** -- Aggiungi un'ombra sottile o un overlay di sfondo all'area di navigazione

## Dettagli Tecnici

Gli stili di navigazione sono archiviati come JSON e applicati utilizzando le variabili CSS:

- I cambiamenti hanno effetto immediatamente senza ricostruire il sito
- I colori si propagano a tutti gli elementi di navigazione
- I sovrascritture sono facoltativi; i colori non impostati utilizzano i valori predefiniti del tema

## Articoli Correlati

- [Aspetto](./appearance.md) -- Personalizza l'aspetto generale del tuo sito web
- [Gestione delle Pagine](./managing-pages.md) -- Crea e organizza le pagine del tuo sito web
- [Editor di Pagina](./page-editor.md) -- Progetta i layout e i contenuti della pagina
