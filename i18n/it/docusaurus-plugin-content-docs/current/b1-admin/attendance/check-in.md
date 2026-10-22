---
title: "Check-In"
---

# Check-In {#check-in}

<div class="article-intro">

B1 Admin supporta il self check-in durante i culti tramite l'app complementare **B1 Checkin**. I membri possono registrare se stessi e le proprie famiglie quando arrivano, usando chioschi o dispositivi dedicati. Il processo diventa così rapido e riduce il carico di lavoro dei volontari. Ogni check-in viene registrato automaticamente come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I campus, gli orari dei culti e i gruppi devono essere configurati in [Configurazione delle presenze](setup.md).
- Ti servono [persone nel tuo database](../people/adding-people.md) con [nuclei familiari](../people/adding-people.md#managing-households) impostati, così le famiglie possono fare il check-in insieme.
- Ti serviranno un tablet e, facoltativamente, una stampante di etichette Brother (vedi [consigli sull'hardware](#recommended-hardware) più sotto).

</div>

## Come funziona {#how-it-works}

L'app B1 Checkin si collega alla configurazione delle presenze di B1 Admin. Quando un membro effettua il check-in, la sua presenza viene registrata automaticamente sul campus, sull'orario del culto e sul gruppo corretti. Non devi inserire manualmente le presenze per chi usa il sistema di check-in.

## Configurare il check-in {#setting-up-check-in}

1. **Configura prima la struttura delle presenze.** In B1 Admin vai su **Persone > Presenze** e fai clic su **Configurazione** per assicurarti che campus, orari dei culti e gruppi siano impostati. L'app di check-in si basa su questa configurazione. Facoltativamente, assegna a ogni orario del culto una [pianificazione del check-in](setup.md#setting-a-check-in-schedule), così il check-in si apre e si chiude automaticamente ogni settimana. Le pianificazioni usano il fuso orario del campus del culto oppure, se il campus non ne ha uno, il fuso orario della tua chiesa. Il chiosco mostra come **Chiuso** gli orari dei culti la cui finestra di check-in è chiusa e indica alle famiglie quando il check-in si apre. Vedi [Configurazione delle presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi usare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** con le credenziali dell'account della tua chiesa.
4. **Seleziona il campus e l'orario del culto** per l'adunanza in corso.
5. I membri possono ora cercare il proprio nome sul dispositivo ed effettuare il check-in.

:::tip
Posiziona i dispositivi di check-in in punti visibili e facilmente raggiungibili, come gli ingressi della hall o le postazioni di accoglienza. Un breve annuncio durante i culti aiuta i membri a sapere che questa opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più campus, dovrai ripetere la configurazione per ciascun campus in [Configurazione delle presenze](setup.md). Ogni dispositivo di check-in può essere configurato per un campus diverso.
:::

## Hardware consigliato {#recommended-hardware}

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — il check-in funziona con le stampanti di etichette Brother per stampare i cartellini con il nome:

- **Migliore:** Brother QL-1110NWB (supporta più tablet tramite Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet tramite WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti di etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzionano per stampare i cartellini con il nome.
:::

:::info
Segui le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzare l'aspetto del chiosco {#customizing-the-kiosk-appearance}

Puoi personalizzare l'aspetto e la sensazione dell'app B1 Checkin in modo che corrispondano all'identità visiva della tua chiesa. In B1 Admin vai su **Mobile > B1 CheckIn** e usa la scheda **Tema del chiosco** per configurare:

### Colori {#colors}

Personalizza otto impostazioni di colore per adattarle all'identità visiva della chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del marchio e il colore del suo testo.
- **Secondario** e **Contrasto secondario** -- Colore di accento e il colore del suo testo.
- **Sfondo intestazione** e **Sfondo sottointestazione** -- Colori delle aree di intestazione del chiosco.
- **Sfondo pulsante** e **Testo pulsante** -- Colori dei pulsanti interattivi.

### Immagine di sfondo {#background-image}

Carica un'immagine di sfondo facoltativa per le schermate di benvenuto e di ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermata inattiva / Salvaschermo {#idle-screen-screensaver}

Configura un salvaschermo che si attiva dopo un periodo di inattività:

1. Attiva o disattiva la schermata inattiva.
2. Imposta il **timeout** (quanti secondi di inattività prima che si avvii il salvaschermo, minimo 10 secondi).
3. Aggiungi una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa la schermata inattiva per mostrare annunci, eventi in programma o messaggi di benvenuto quando il chiosco non è in uso.
:::

## Registrazione degli ospiti tramite codice QR {#guest-registration-via-qr-code}

Il chiosco di check-in può mostrare un codice QR che i visitatori scansionano per registrare se stessi e la propria famiglia con il proprio telefono. Questo accelera il check-in per gli ospiti alla prima visita.

Quando un ospite scansiona il codice QR, viene indirizzato a una [pagina di registrazione ospiti](../../b1-church/checkin/guest-registration) dove inserisce nome, email e familiari. Un volontario può poi cercarlo sul chiosco ed effettuarne il check-in.

### Attivare la registrazione ospiti tramite QR {#enabling-qr-guest-registration}

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **B1 CheckIn**.
3. Attiva **Registrazione ospiti QR** e fai clic su **Salva**.

:::note
Questa impostazione si trova in **Mobile > B1 CheckIn** (la stessa pagina della scheda **Tema del chiosco**), non in Presenze. L'azione **Chiosco** nella pagina Presenze contiene un collegamento a questa pagina.
:::

### Condividere il link di registrazione {#sharing-the-registration-link}

Una volta attivata la registrazione ospiti tramite QR, sotto l'interruttore compare la sezione **Condividi il codice QR di registrazione**. Questo offre due modi, oltre al codice QR del chiosco, per far arrivare gli ospiti al modulo di registrazione:

- **Copia link** -- copia l'URL di registrazione così puoi incollarlo sul sito della chiesa, nelle email o in qualsiasi punto online.
- **Scarica PNG** -- scarica il codice QR come immagine da stampare su volantini, bollettini o cartelli.

:::tip
Aggiungi il link di registrazione alla pagina "Pianifica la tua visita" o "Sono nuovo" del sito della chiesa, così gli ospiti possono registrarsi ancora prima di arrivare.
:::

## Cosa viene registrato {#what-gets-recorded}

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nella pagina [Presenze](tracking-attendance.md) e nelle [sessioni di ogni gruppo](../groups/group-members.md), proprio come per le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati appaiono: entrambi i metodi alimentano gli stessi rapporti.
