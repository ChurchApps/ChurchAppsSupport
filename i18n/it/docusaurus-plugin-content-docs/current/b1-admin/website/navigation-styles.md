---
title: "Stili di Navigazione"
---

# Stili di Navigazione

<div class="article-intro">

Personalizza i colori della barra di navigazione del tuo sito web della chiesa per abbinarli al tuo marchio. Puoi configurare i colori sia per gli sfondi solidi che per le sovrapposizioni trasparenti, dandoti il controllo completo su come appare la tua navigazione su diverse pagine.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso di gestire il sito web della tua chiesa. Consulta [Ruoli e Permessi](../people/roles-permissions.md) per i dettagli.
- Tieni pronti i colori del tuo marchio, inclusi i codici colore esadecimali (ad esempio, #03A9F4).
- Comprendi la differenza tra gli stili di navigazione solida e trasparente sul tuo sito web.

</div>

## Comprensione delle Modalità di Navigazione

La navigazione del tuo sito web può apparire in due stili diversi a seconda della pagina:

- **Navigazione solida** -- Barra di navigazione con un colore di sfondo, tipicamente utilizzata nelle pagine di contenuto
- **Navigazione trasparente** -- Navigazione che si sovrappone al contenuto della pagina, tipicamente utilizzata su pagine con immagini hero o sfondi a schermo intero

Puoi personalizzare i colori per entrambe le modalità indipendentemente.

## Accesso agli Stili di Navigazione

1. Vai a **Sito Web** in B1 Admin
2. Clicca su **Aspetto** nella barra laterale
3. Scorri fino alla sezione **Stili di Navigazione**
4. Clicca su **Modifica Stili di Navigazione**

## Configurazione della Navigazione Solida

La navigazione solida appare con un colore di sfondo dietro la barra di navigazione. Puoi personalizzare:

### Colore di Sfondo

1. Attiva l'interruttore **Override** per **Colore di Sfondo**
2. Clicca sul selettore colori
3. Scegli il colore di sfondo desiderato
4. L'impostazione predefinita è bianco (#FFFFFF)

### Colore dei Link

1. Attiva l'interruttore **Override** per **Colore dei Link**
2. Scegli il colore per il testo dei link di navigazione
3. Questo influisce sui link nel loro stato predefinito
4. L'impostazione predefinita è grigio scuro (#555555)

### Colore dei Link al Passaggio del Mouse

1. Attiva l'interruttore **Override** per **Colore dei Link al Passaggio del Mouse**
2. Scegli il colore in cui i link cambiano quando gli utenti ci passano sopra
3. Questo fornisce feedback visivo per i link cliccabili
4. L'impostazione predefinita è azzurro (#03A9F4)

### Colore Attivo

1. Attiva l'interruttore **Override** per **Colore Attivo**
2. Scegli il colore per il link della pagina attualmente attiva
3. Questo aiuta gli utenti a sapere su quale pagina si trovano
4. L'impostazione predefinita è azzurro (#03A9F4)

## Configurazione della Navigazione Trasparente

La navigazione trasparente si sovrappone al contenuto della tua pagina senza sfondo. Puoi personalizzare:

### Colore dei Link

1. Attiva l'interruttore **Override** per **Colore dei Link**
2. Scegli un colore che contrasti bene con lo sfondo della tua pagina
3. Spesso i colori bianchi o chiari funzionano meglio su sfondi scuri
4. L'impostazione predefinita è grigio scuro (#555555)

### Colore dei Link al Passaggio del Mouse

1. Attiva l'interruttore **Override** per **Colore dei Link al Passaggio del Mouse**
2. Scegli il colore dello stato al passaggio del mouse
3. Assicurati che sia visibile contro lo sfondo della tua pagina
4. L'impostazione predefinita è azzurro (#03A9F4)

### Colore Attivo

1. Attiva l'interruttore **Override** per **Colore Attivo**
2. Scegli il colore dell'indicatore della pagina attiva
3. Dovrebbe risaltare pur adattandosi al tuo design
4. L'impostazione predefinita è azzurro (#03A9F4)

:::info
La navigazione trasparente non ha un'impostazione del colore di sfondo poiché si sovrappone direttamente al contenuto della pagina.
:::

## Salvataggio delle Modifiche

1. Dopo aver configurato i tuoi colori, clicca su **Salva Stili di Navigazione**
2. Le tue modifiche si applicano immediatamente al tuo sito web live
3. Visita il tuo sito web per vedere la navigazione in entrambe le modalità

## Ripristino delle Impostazioni Predefinite

Se vuoi tornare ai colori predefiniti:

1. Disattiva gli interruttori **Override** per eventuali colori personalizzati
2. Clicca su **Salva Stili di Navigazione**
3. La navigazione torna allo schema di colori predefinito

Oppure clicca su **Annulla** per scartare tutte le modifiche senza salvare.

## Migliori Pratiche

### Contrasto dei Colori

- **Leggibilità** -- Assicurati che i colori dei link abbiano abbastanza contrasto con lo sfondo
- **Conformità WCAG** -- Punta ad almeno un rapporto di contrasto 4.5:1 per l'accessibilità
- **Testa entrambe le modalità** -- Visualizza in anteprima il tuo sito con navigazione sia solida che trasparente

### Coerenza del Marchio

- **Usa i colori del tuo marchio** -- Abbina il tuo logo e il tema del sito web
- **Limita la tua palette** -- Attieniti a 2-3 colori per un aspetto coerente
- **Considera le tue immagini** -- Se usi la navigazione trasparente, testala contro sfondi di pagine tipiche

### Stati al Passaggio del Mouse e Attivi

- **Feedback chiaro** -- Rendi gli stati al passaggio del mouse ovviamente diversi dai link predefiniti
- **Distingui le pagine attive** -- Usa un colore distinto affinché gli utenti sappiano dove si trovano
- **Transizioni fluide** -- Il sistema anima automaticamente i cambiamenti di colore

## Risoluzione dei Problemi

### I Colori Non Sembrano Corretti

- **Cancella la cache** -- La cache del browser potrebbe mostrare vecchi colori
- **Controlla i codici esadecimali** -- Assicurati di aver inserito codici colore esadecimali validi
- **Testa su sfondi diversi** -- I colori possono apparire diversi a seconda della pagina

### Navigazione Non Visibile

- **Modalità trasparente** -- Se usi la navigazione trasparente su immagini chiare, il testo scuro potrebbe essere difficile da vedere
- **Soluzione** -- Regola i colori dei link o usa sfondi di pagina più scuri
- **Alternativa** -- Aggiungi un'ombra sottile o una sovrapposizione di sfondo all'area di navigazione

## Dettagli Tecnici

Gli stili di navigazione sono memorizzati come JSON e applicati utilizzando variabili CSS:

- Le modifiche hanno effetto immediato senza ricostruire il sito
- I colori si propagano a tutti gli elementi di navigazione
- Gli override sono opzionali; i colori non impostati usano i valori predefiniti del tema

## Articoli Correlati

- [Aspetto](./appearance.md) -- Personalizza l'aspetto generale del tuo sito web
- [Gestione delle Pagine](./managing-pages.md) -- Crea e organizza le pagine del tuo sito web
- [Editor di Pagine](./page-editor.md) -- Progetta layout e contenuti delle pagine
