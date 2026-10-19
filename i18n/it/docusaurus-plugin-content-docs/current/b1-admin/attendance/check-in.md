---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supporta il self check-in ai servizi tramite l'app complementare **B1 Checkin**. I membri possono registrare se stessi e le proprie famiglie su chioschi o dispositivi dedicati all'arrivo, rendendo il processo rapido e riducendo il carico di lavoro dei tuoi volontari. Ogni check-in viene registrato automaticamente come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Le tue sedi, gli orari dei servizi e i gruppi devono essere configurati in [Configurazione presenze](setup.md).
- Ti servono [persone nel tuo database](../people/adding-people.md) con i [nuclei familiari](../people/adding-people.md#managing-households) impostati, così le famiglie possono fare il check-in insieme.
- Ti servirà un tablet e, facoltativamente, una stampante per etichette Brother (vedi [consigli sull'hardware](#recommended-hardware) più sotto).

</div>

## Come funziona

L'app B1 Checkin si collega alla tua configurazione delle presenze in B1 Admin. Quando un membro fa il check-in, la sua presenza viene registrata automaticamente per la sede, l'orario del servizio e il gruppo corretti. Non devi inserire manualmente la presenza per chi usa il sistema di check-in.

## Configurare il check-in

1. **Configura prima la struttura delle presenze.** In B1 Admin, vai su **Persone > Presenze** e clicca su **Configurazione** per assicurarti che le tue sedi, gli orari dei servizi e i gruppi siano impostati. L'app di check-in si basa su questa configurazione. Facoltativamente, assegna a ogni orario di servizio una [pianificazione del check-in](setup.md#setting-a-check-in-schedule) così il check-in si apre e si chiude automaticamente ogni settimana. Le pianificazioni usano il fuso orario della tua chiesa, oppure quello della tua sede se la chiesa non ne ha impostato uno; il chiosco nasconde gli orari di servizio la cui finestra è chiusa e informa le famiglie quando il check-in non è ancora aperto. Vedi [Configurazione presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi usare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** usando le credenziali dell'account della tua chiesa.
4. **Seleziona la sede e l'orario del servizio** per il raduno in corso.
5. I membri possono ora cercare il proprio nome sul dispositivo e fare il check-in.

:::tip
Colloca i dispositivi di check-in in punti visibili e facili da raggiungere, come gli ingressi dell'atrio o le postazioni di accoglienza. Un breve annuncio durante i servizi aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più sedi, dovrai ripetere la configurazione per ciascuna sede in [Configurazione presenze](setup.md). Ogni dispositivo di check-in può essere configurato per una sede diversa.
:::

## Hardware consigliato {#recommended-hardware}

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Grande schermo:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — i check-in funzionano con le stampanti per etichette Brother per stampare i cartellini con il nome:

- **Migliore:** Brother QL-1110NWB (supporta più tablet via Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet via WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzioneranno per stampare i cartellini con il nome.
:::

:::info
Segui le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del tuo tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzare l'aspetto del chiosco

Puoi personalizzare l'aspetto dell'app B1 Checkin per adattarla all'identità visiva della tua chiesa. In B1 Admin, vai su **Mobile > B1 CheckIn** e usa la scheda **Tema del chiosco** per configurare:

### Colori

Personalizza le otto impostazioni di colore per adattarle all'identità visiva della tua chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del marchio e il suo colore del testo.
- **Secondario** e **Contrasto secondario** -- Colore di accento e il suo colore del testo.
- **Sfondo intestazione** e **Sfondo sottointestazione** -- Colori delle aree di intestazione del chiosco.
- **Sfondo pulsante** e **Testo pulsante** -- Colori dei pulsanti interattivi.

### Immagine di sfondo

Carica un'immagine di sfondo facoltativa per le schermate di benvenuto e di ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermo inattivo / Salvaschermo

Configura un salvaschermo che si attiva dopo un periodo di inattività:

1. Attiva o disattiva lo schermo inattivo con l'interruttore **on** o **off**.
2. Imposta il **timeout** (quanti secondi di inattività prima che parta il salvaschermo, minimo 10 secondi).
3. Aggiungi una o più **slide** -- ogni slide ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa lo schermo inattivo per mostrare annunci, eventi in programma o messaggi di benvenuto quando il chiosco non è in uso.
:::

## Registrazione degli ospiti tramite codice QR

Il chiosco di check-in può mostrare un codice QR che i visitatori scansionano per registrare se stessi e la propria famiglia dal proprio telefono. Questo accelera il check-in per gli ospiti alla prima visita.

Quando un ospite scansiona il codice QR, viene portato a una [pagina di registrazione ospiti](../../b1-church/checkin/guest-registration) dove inserisce nome, email e familiari. Un volontario può poi cercarlo sul chiosco e fare il check-in.

### Attivare la registrazione QR degli ospiti

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Clicca su **B1 CheckIn**.
3. Attiva **Registrazione ospiti QR** e clicca su **Salva**.

:::note
Questa impostazione si trova in **Mobile > B1 CheckIn** (la stessa pagina della scheda **Tema del chiosco**), non in Attendance. L'azione **Chiosco** nella pagina Presenze contiene un collegamento a questa pagina.
:::

### Condividere il link di registrazione

Una volta attivata la **Registrazione ospiti QR**, sotto l'interruttore compare la sezione **Condividi il codice QR di registrazione**. Questo offre due modi, oltre al codice QR del chiosco, per portare gli ospiti al modulo di registrazione:

- **Copia link** — copia l'URL di registrazione così puoi incollarlo sul sito web della tua chiesa, nelle email o ovunque online.
- **Scarica PNG** — scarica il codice QR come immagine che puoi stampare su volantini, bollettini o cartelli.

:::tip
Aggiungi il link di registrazione alla pagina "Pianifica la tua visita" o "Sono nuovo" del sito web della tua chiesa così gli ospiti possono registrarsi ancora prima di arrivare.
:::

## Cosa viene registrato

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nella pagina [Presenze](tracking-attendance.md) e nelle sessioni di ogni [gruppo](../groups/group-members.md), esattamente come le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati appaiono — entrambi i metodi alimentano gli stessi report.
