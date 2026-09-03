---
title: "Architettura Website Builder"
---

# Architettura Website Builder

<div class="article-intro">

Ogni sito web della chiesa servito da B1App viene reso da un albero di contenuti — pagine, sezioni, elementi — archiviati in ContentApi e modificati visivamente in B1Admin. Una libreria di componenti condivisa esegue il rendering sia dell'anteprima dell'editor che del sito live, un catalogo di tipi di elementi definisce cosa può apparire su una pagina e un servizio AI separato può generare o riscrivere quell'albero.

</div>

## Panoramica

Un albero di pagine/sezioni/elementi viene memorizzato in ContentApi. Ogni nodo contiene le sue impostazioni come un blob JSON `answers`. Lo stesso componente apphelper esegue il rendering sia nell'editor drag-and-drop di B1Admin che nel sito pubblico renderizzato dal server in B1App.

## Tre Regole

1. **Un albero, due renderer.** Lo stesso albero è usato per l'editor e il sito live.
2. **Il contratto vive in `@churchapps/helpers`.** `ElementTypes.ts` è il singolo catalogo.
3. **Il sito pubblico legge endpoint anonimi.** Tutto ciò di cui B1App ha bisogno è pubblico.
