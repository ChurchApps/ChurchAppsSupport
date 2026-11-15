---
title: "Stili di navigazione"
description: "Personalizza i colori delle barre di navigazione del sito web in versione piena e trasparente in B1 Admin, inclusi gli stati di collegamento, passaggio del mouse e attivo per il sito della tua chiesa."
---

# Stili di navigazione

<div class="article-intro">

Personalizza i colori della barra di navigazione del sito web della tua chiesa per adattarli al brand. Puoi configurare i colori sia per gli sfondi pieni sia per le sovrapposizioni trasparenti, con il pieno controllo sull'aspetto della navigazione nelle diverse pagine.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione a modificare i contenuti del sito web. Vedi [Ruoli e autorizzazioni](../settings/roles-permissions.md) per i dettagli.
- Tieni pronti i colori del brand, inclusi i codici colore esadecimali (ad esempio #03A9F4).
- Comprendi la differenza tra gli stili di navigazione pieno e trasparente del tuo sito.

</div>

## Capire le modalità di navigazione {#understanding-navigation-modes}

La navigazione del sito web può apparire in due stili diversi a seconda della pagina:

- **Navigazione piena** -- Barra di navigazione con uno sfondo colorato, usata tipicamente nelle pagine di contenuto
- **Navigazione trasparente** -- Navigazione sovrapposta al contenuto della pagina, usata tipicamente nelle pagine con immagini di intestazione o sfondi a schermo intero

Puoi personalizzare i colori per entrambe le modalità in modo indipendente.

## Accedere agli stili di navigazione {#accessing-navigation-styles}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Sito web**
2. Fai clic su **Aspetto**
3. Nell'elenco **Impostazioni di stile**, fai clic su **Navigazione**

L'editor **Stile di navigazione** ha due schede: **Intestazione (piena)** e **Intestazione sopra l'hero (trasparente)**.

## Configurare la navigazione piena {#configuring-solid-navigation}

La navigazione piena appare con un colore di sfondo dietro la barra di navigazione. Queste impostazioni si trovano nella scheda **Intestazione (piena)**. Ogni colore è facoltativo: finché il suo interruttore **Sostituisci** è spento, la navigazione mantiene i colori normali del sito. Puoi personalizzare:

### Colore di sfondo {#background-color}

1. Attiva l'interruttore **Sostituisci** per **Colore di sfondo**
2. Fai clic sul selettore dei colori
3. Scegli il colore di sfondo desiderato (il selettore parte dal bianco, #FFFFFF)

### Colore dei collegamenti {#link-color}

1. Attiva l'interruttore **Sostituisci** per **Colore dei collegamenti**
2. Scegli il colore del testo dei collegamenti di navigazione
3. Questo influisce sui collegamenti nel loro stato predefinito (il selettore parte dal grigio scuro, #555555)

### Colore dei collegamenti al passaggio del mouse {#link-hover-color}

1. Attiva l'interruttore **Sostituisci** per **Colore dei collegamenti al passaggio del mouse**
2. Scegli il colore in cui cambiano i collegamenti quando l'utente vi passa sopra
3. Questo offre un riscontro visivo per i collegamenti cliccabili (il selettore parte dall'azzurro chiaro, #03A9F4)

### Colore attivo {#active-color}

1. Attiva l'interruttore **Sostituisci** per **Colore del collegamento attivo**
2. Scegli il colore del collegamento della pagina corrente
3. Questo aiuta l'utente a capire in quale pagina si trova (il selettore parte dall'azzurro chiaro, #03A9F4)

## Configurare la navigazione trasparente {#configuring-transparent-navigation}

La navigazione trasparente si sovrappone al contenuto della pagina senza sfondo. Queste impostazioni si trovano nella scheda **Intestazione sopra l'hero (trasparente)**. Finché un interruttore **Sostituisci** è spento, quel colore corrisponde automaticamente al colore del testo della sezione hero. Puoi personalizzare:

### Colore dei collegamenti {#link-color-1}

1. Attiva l'interruttore **Sostituisci** per **Colore dei collegamenti**
2. Scegli un colore che contrasti bene con lo sfondo della pagina
3. Spesso il bianco o i colori chiari funzionano meglio su sfondi scuri

### Colore dei collegamenti al passaggio del mouse {#link-hover-color-1}

1. Attiva l'interruttore **Sostituisci** per **Colore dei collegamenti al passaggio del mouse**
2. Scegli il colore dello stato di passaggio del mouse
3. Assicurati che sia visibile sullo sfondo della pagina

### Colore attivo {#active-color-1}

1. Attiva l'interruttore **Sostituisci** per **Colore del collegamento attivo**
2. Scegli il colore dell'indicatore della pagina attiva
3. Deve risaltare pur restando coerente con il tuo design

:::info
La navigazione trasparente non ha un'impostazione di colore di sfondo, perché si sovrappone direttamente al contenuto della pagina.
:::

## Salvare le modifiche {#saving-your-changes}

1. Dopo aver configurato i colori, fai clic su **Salva navigazione**
2. Le modifiche si applicano subito al sito web online
3. Visita il tuo sito per vedere la navigazione in entrambe le modalità

## Ripristinare i valori predefiniti {#resetting-to-defaults}

Se vuoi tornare ai colori predefiniti:

1. Disattiva gli interruttori **Sostituisci** di eventuali colori personalizzati
2. Fai clic su **Salva navigazione**
3. La navigazione torna ai colori normali del sito (e, sopra un hero, al colore del testo dell'hero)

Oppure fai clic su **Annulla** per scartare tutte le modifiche senza salvarle.

## Buone pratiche {#best-practices}

### Contrasto dei colori {#color-contrast}

- **Leggibilità** -- Assicurati che i colori dei collegamenti abbiano un contrasto sufficiente con lo sfondo
- **Conformità WCAG** -- Punta ad almeno un rapporto di contrasto 4,5:1 per l'accessibilità
- **Prova entrambe le modalità** -- Visualizza in anteprima il sito con la navigazione piena e quella trasparente

### Coerenza con il brand {#brand-consistency}

- **Usa i colori del brand** -- Abbinali al logo e al tema del sito web
- **Limita la tavolozza** -- Resta su 2-3 colori per un aspetto coerente
- **Considera le immagini** -- Se usi la navigazione trasparente, provala sugli sfondi di pagina tipici

### Stati di passaggio del mouse e attivo {#hover-and-active-states}

- **Riscontro chiaro** -- Rendi gli stati di passaggio del mouse nettamente diversi dai collegamenti normali
- **Distingui le pagine attive** -- Usa un colore distinto così gli utenti sanno dove si trovano
- **Transizioni fluide** -- Il sistema anima automaticamente i cambi di colore

## Risoluzione dei problemi {#troubleshooting}

### I colori non sembrano corretti {#colors-dont-look-right}

- **Svuota la cache** -- La cache del browser potrebbe mostrare i vecchi colori
- **Controlla i codici esadecimali** -- Verifica di aver inserito codici colore esadecimali validi
- **Prova su sfondi diversi** -- I colori possono apparire diversi a seconda della pagina

### La navigazione non è visibile {#navigation-not-visible}

- **Modalità trasparente** -- Se usi la navigazione trasparente sopra immagini chiare, il testo scuro potrebbe essere difficile da vedere
- **Soluzione** -- Regola i colori dei collegamenti oppure usa sfondi di pagina più scuri
- **Alternativa** -- Aggiungi un'ombra leggera o una sovrapposizione di sfondo nell'area della navigazione

## Dettagli tecnici {#technical-details}

Gli stili di navigazione sono memorizzati in formato JSON e applicati tramite variabili CSS:

- Le modifiche hanno effetto immediato, senza ricostruire il sito
- I colori si propagano a tutti gli elementi di navigazione
- Le sostituzioni sono facoltative; i colori non impostati usano i valori predefiniti del tema

## Articoli correlati {#related-articles}

- [Aspetto](./appearance.md) -- Personalizza l'aspetto complessivo del sito web
- [Gestire le pagine](./managing-pages.md) -- Crea e organizza le pagine del sito web
- [Editor di pagina](./page-editor.md) -- Progetta i layout e i contenuti delle pagine
