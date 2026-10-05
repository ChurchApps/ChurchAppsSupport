---
title: "Connessione a Provider"
---

# Connessione a Provider

<div class="article-intro">

Prima di poter navigare il contenuto da un provider, devi connetterti ad esso. Alcuni provider richiedono l'autenticazione tramite un codice QR o un login tramite email, mentre altri possono essere collegati con un singolo clic.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Installa e avvia FreePlay -- vedi [Guida Introduttiva](../getting-started/)
- Tieni il telecomando della TV pronto per la navigazione
- Per i provider che richiedono il login, tieni disponibili le tue credenziali di account

</div>

:::tip Stai configurando B1 Admin + FreePlay insieme?
La nostra **<a href="/guides/freeplay-b1admin" target="_blank">guida passo-passo</a>** ti guida attraverso il collegamento di B1 Admin, la programmazione di una lezione e la connessione di FreePlay — il tutto in un unico posto. Aprila in una nuova scheda per seguire insieme.
:::

## Navigazione di Provider Disponibili

1. Apri **Settings** nella parte inferiore della barra laterale, quindi seleziona **Providers** per aprire la schermata **Content Providers**
2. Vedrai una griglia di schede provider, ognuna che mostra il logo e il nome del provider
3. I provider collegati visualizzano un badge verde **Connected** sotto il loro nome
4. I provider che non sono ancora disponibili mostrano un'etichetta **Coming Soon**

## Connessione Senza Autenticazione

Alcuni provider non richiedono un login. Quando selezioni uno di questi provider, FreePlay si connette immediatamente e apre il browser di contenuto. Non sono necessarie credenziali.

## Autenticazione Device Flow (Codice QR)

Alcuni provider utilizzano un device flow, simile a come accedi alle app di streaming su una TV:

1. Seleziona la scheda del provider sulla schermata **Content Providers**
2. FreePlay visualizza un codice QR e un URL di verifica
3. Scansiona il codice QR con il tuo telefono, o visita l'URL visualizzato su qualsiasi dispositivo
4. Inserisci il codice dell'utente mostrato sullo schermo della TV
5. Completa il processo di accesso sul tuo telefono o computer
6. FreePlay rileva l'accesso riuscito e visualizza **Connected!**
7. Il browser di contenuto si apre automaticamente

:::info
Un indicatore **Waiting for authorization** pulsante mostra che FreePlay sta controllando il tuo login. Il codice scade dopo diversi minuti, quindi completa il processo rapidamente.
:::

**Go Curriculum** utilizza lo stesso modello di accesso con codice QR -- scansiona il codice e accedi con il tuo account gocurriculum.com per connetterti.

## Login Modulo

Altri provider utilizzano un login email e password tradizionale:

1. Seleziona la scheda del provider
2. Inserisci la tua **Email** e **Password** usando la tastiera su schermo
3. Seleziona il pulsante **Sign In**
4. Se le tue credenziali sono corrette, FreePlay visualizza **Connected!** e apre il browser di contenuto

:::tip
Usa il pad direzionale sul telecomando per spostarti tra il campo email, il campo password e il pulsante sign-in. Premi **Select** su un campo di testo per aprire la tastiera su schermo.
:::

## Ricerca di un Provider sulla Tua Rete

**FreeShow** è trovato sulla tua rete locale invece di tramite un sign-in: FreePlay esegue la ricerca in rete, elenca ogni computer che esegue FreeShow che trova, e si connette a quello che selezioni (scegli **Scan Again** se nessuno appare).

## Impostazioni del Provider

Selezionando una scheda provider che mostra il badge **Connected** si apre la sua schermata **Provider Settings**:

- **Browse Library** -- Mostra o nascondi la biblioteca di contenuto di questo provider nella barra laterale
- **Auto-Download Today's Lesson** -- Usa questo provider come fonte della lezione di oggi e pre-scarica i suoi file (mostrato solo per provider che offrono una lezione corrente)
- **Use for Announcements** -- Scegli una cartella da questo provider da ripetere dall'elemento **Announcements** nella barra laterale. Vedi [Announcements](./announcements)
- **Check for Announcement Updates** -- Mostrato una volta scelta una cartella di annunci; scarica i nuovi diapositive e rimuove quelle eliminate
- **Disconnect** -- Rimuovi la connessione

## Disconnessione da un Provider

Per disconnetterti da un provider a cui ti sei già collegato:

1. Vai alla schermata **Content Providers** (**Settings** > **Providers**)
2. Seleziona la scheda del provider che mostra il badge **Connected**
3. Sulla schermata **Provider Settings**, seleziona **Disconnect**

Dopo la disconnessione, il contenuto del provider non apparirà più nella tua barra laterale. Se stavi usando una delle sue cartelle per gli annunci, quei diapositive vengono rimossi anche.

:::warning
La disconnessione rimuove l'autenticazione salvata dal tuo dispositivo. Dovrai accedere di nuovo se desideri riconnetterti in seguito.
:::

## Articoli Correlati

- **[Navigazione e Scaricamento di Contenuto](./browsing-content)** - Naviga cartelle e riproduci contenuto dopo la connessione
- **[Announcements](./announcements)** - Ripeti una cartella di diapositive da un provider collegato
- **[Panoramica Content Providers](./index.md)** - Vedi tutti i provider disponibili
