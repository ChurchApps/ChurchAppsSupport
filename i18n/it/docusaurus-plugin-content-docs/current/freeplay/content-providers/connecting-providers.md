---
title: "Connessione ai Provider"
---

# Connessione ai Provider

<div class="article-intro">

Prima di poter sfogliare i contenuti di un provider, devi connetterti ad esso. Alcuni provider richiedono l'autenticazione tramite un codice QR o un login via email, mentre altri possono essere collegati con un solo clic.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa e avvia FreePlay -- vedi [Per Iniziare](../getting-started/)
- Tieni pronto il telecomando della TV per la navigazione
- Per i provider che richiedono il login, tieni a disposizione le credenziali del tuo account

</div>

:::tip Stai configurando B1 Admin + FreePlay insieme?
La nostra **<a href="/guides/freeplay-b1admin" target="_blank">guida passo passo</a>** illustra come collegare B1 Admin, programmare una lezione e connettere FreePlay -- tutto in un unico posto. Aprila in una nuova scheda per seguirla insieme.
:::

## Sfogliare i Provider Disponibili

1. Apri la schermata **Content Providers** dalla barra laterale (seleziona l'icona **Providers** in basso)
2. Vedrai una griglia di schede provider, ciascuna con il logo e il nome del provider
3. I provider connessi mostrano un badge verde **Connected** sotto il loro nome
4. I provider non ancora disponibili mostrano l'etichetta **Coming Soon**

## Connessione Senza Autenticazione

Alcuni provider non richiedono un login. Quando selezioni uno di questi provider, FreePlay si connette immediatamente e apre il browser dei contenuti. Non sono necessarie credenziali.

## Autenticazione con Device Flow (Codice QR)

Alcuni provider utilizzano un device flow, simile al modo in cui accedi alle app di streaming su una TV:

1. Seleziona la scheda del provider nella schermata **Content Providers**
2. FreePlay mostra un codice QR e un URL di verifica
3. Scansiona il codice QR con il telefono, oppure visita l'URL indicato da qualsiasi dispositivo
4. Inserisci il codice utente mostrato sullo schermo della TV
5. Completa la procedura di accesso sul telefono o sul computer
6. FreePlay rileva l'accesso riuscito e mostra **Connected!**
7. Il browser dei contenuti si apre automaticamente

:::info
Un indicatore pulsante **Waiting for authorization** mostra che FreePlay sta verificando il tuo accesso. Il codice scade dopo alcuni minuti, quindi completa la procedura tempestivamente.
:::

**Go Curriculum** utilizza lo stesso schema di accesso con codice QR -- scansiona il codice e accedi con il tuo account gocurriculum.com per connetterti.

## Login con Modulo

Altri provider utilizzano un login tradizionale con email e password:

1. Seleziona la scheda del provider
2. Inserisci la tua **Email** e **Password** utilizzando la tastiera a schermo
3. Seleziona il pulsante **Sign In**
4. Se le credenziali sono corrette, FreePlay mostra **Connected!** e apre il browser dei contenuti

:::tip
Usa il tasto direzionale del telecomando per spostarti tra il campo email, il campo password e il pulsante di accesso. Premi **Select** su un campo di testo per aprire la tastiera a schermo.
:::

## Disconnessione da un Provider

Per disconnetterti da un provider a cui sei già connesso:

1. Vai alla schermata **Content Providers**
2. Seleziona la scheda del provider che mostra il badge **Connected**
3. Un messaggio di conferma chiede se vuoi disconnetterti
4. Scegli **Disconnect** per rimuovere la connessione

Dopo la disconnessione, i contenuti del provider non appariranno più nella barra laterale.

:::warning
La disconnessione rimuove l'autenticazione salvata dal dispositivo. Dovrai accedere di nuovo se vuoi riconnetterti in seguito.
:::

## Articoli Correlati

- **[Sfogliare e Scaricare Contenuti](./browsing-content)** - Naviga tra le cartelle e riproduci i contenuti dopo la connessione
- **[Panoramica dei Content Provider](./index.md)** - Vedi tutti i provider disponibili
