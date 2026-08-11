---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supporta l'auto check-in ai servizi attraverso l'app companion **B1 Checkin**. I membri possono fare il check-in di sé stessi e delle loro famiglie in chioschi o su dispositivi dedicati al loro arrivo, rendendo il processo veloce e riducendo il carico di lavoro sui tuoi volontari. Ogni check-in viene registrato automaticamente come presenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, orari di servizio e gruppi devono essere configurati in [Impostazioni presenze](setup.md).
- Hai bisogno di [persone nel tuo database](../people/adding-people.md) con [famiglie](../people/adding-people.md#managing-households) impostate in modo che le famiglie possano fare il check-in insieme.
- Avrai bisogno di un tablet e facoltativamente di una stampante di etichette Brother (vedi [raccomandazioni hardware](#recommended-hardware) sotto).

</div>

## Come funziona

L'app B1 Checkin si connette alla configurazione delle presenze di B1 Admin. Quando un membro fa il check-in, le sue presenze vengono registrate automaticamente rispetto al campus, all'ora di servizio e al gruppo corretti. Non è necessario immettere manualmente le presenze per nessuno che utilizzi il sistema di check-in.

## Configurazione del Check-In

1. **Configura prima la tua struttura di presenze.** In B1 Admin, vai a **Presenze > Impostazioni** e assicurati che i tuoi campus, orari di servizio e gruppi siano in posizione. L'app di check-in dipende da questa configurazione. Vedi [Impostazioni presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi utilizzare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** utilizzando le credenziali dell'account della tua chiesa.
4. **Seleziona il campus e l'ora di servizio** per la riunione attuale.
5. I membri possono ora cercare il loro nome sul dispositivo e fare il check-in.

:::tip
Posiziona i dispositivi di check-in in luoghi visibili e facili da raggiungere come ingressi della hall o banchi di accoglienza. Un breve annuncio durante i servizi aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più campus, dovrai ripetere la configurazione per ogni campus in [Impostazioni presenze](setup.md). Ogni dispositivo di check-in può essere configurato per un campus diverso.
:::

## Hardware consigliato

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Stampanti** — i check-in funzionano con stampanti di etichette Brother per stampare tag con i nomi:

- **Migliore:** Brother QL-1110NWB (supporta più tablet via Bluetooth e WiFi)
- **Buono:** Brother QL-810W (supporta più tablet via WiFi)
- **Budget:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti di etichette Brother sono compatibili con l'app B1 Checkin. Altri marchi di stampanti non funzioneranno per la stampa di tag con i nomi.
:::

:::info
Segui le istruzioni di configurazione della tua stampante per connetterla alla stessa rete WiFi del tuo tablet. Puoi trovare i driver e le guide di configurazione della stampante Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzazione dell'aspetto del chiosco

Puoi personalizzare l'aspetto e l'atmosfera dell'app B1 Checkin per corrispondere al branding della tua chiesa. In B1 Admin, vai a **Presenze > Tema chiosco** per configurare:

### Colori

Personalizza otto impostazioni di colore per corrispondere al branding della tua chiesa:

- **Primario** e **Contrasto primario** -- Colore del marchio principale e il suo colore del testo.
- **Secondario** e **Contrasto secondario** -- Colore accento e il suo colore del testo.
- **Colore di sfondo dell'intestazione** e **Colore di sfondo del sottotitolo** -- Colori per le aree di intestazione del chiosco.
- **Colore di sfondo del pulsante** e **Colore del testo del pulsante** -- Colori per i pulsanti interattivi.

### Immagine di sfondo

Carica un'immagine di sfondo opzionale per le schermate di benvenuto e ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermata inattiva / Screensaver

Configura uno screensaver che si attiva dopo un periodo di inattività:

1. Attiva o disattiva lo schermo di inattività **on** o **off**.
2. Imposta il **timeout** (quanti secondi di inattività prima che inizi lo screensaver, minimo 10 secondi).
3. Aggiungi una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa lo schermo inattivo per visualizzare annunci, eventi imminenti o messaggi di benvenuto quando il chiosco non è in uso attivo.
:::

## Registrazione dei guest tramite codice QR

Il chiosco di check-in può visualizzare un codice QR che i visitatori scansionano per registrare se stessi e la loro famiglia sul loro telefono. Questo accelera il processo di check-in per i nuovi ospiti.

Quando un ospite scansiona il codice QR, viene portato a una [pagina di registrazione per gli ospiti](../../b1-church/checkin/guest-registration) dove inserisce il nome, l'email e i componenti della famiglia. Un volontario può quindi cercarli sul chiosco e fare il loro check-in.

### Abilitazione della registrazione dei guest tramite QR

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Mobile**.
2. Seleziona la scheda **B1 CheckIn**.
3. Attiva **Registrazione guest QR** e fai clic su **Salva**.

:::note
Questa impostazione è sotto **Mobile**, non sotto Presenze > Tema chiosco.
:::

### Condivisione del link di registrazione

Una volta abilitata la registrazione dei guest tramite QR, viene visualizzata una sezione **Condividi codice QR di registrazione** sotto l'interruttore. Questo ti offre due modi per portare i guest al modulo di registrazione oltre al codice QR del chiosco:

- **Copia link** — copia l'URL di registrazione in modo da poterlo incollare sul sito web della tua chiesa, nelle email o in qualsiasi luogo online.
- **Scarica PNG** — scarica il codice QR come immagine che puoi stampare su volantini, bollettini o cartelli.

:::tip
Aggiungi il link di registrazione al "Piano la tua visita" o alla pagina "Sono nuovo" del sito web della tua chiesa in modo che i guest possano registrarsi prima ancora di arrivare.
:::

## Cosa viene registrato

Ogni check-in crea un record di presenze in B1 Admin. Puoi visualizzare questi record sulle schede [Presenze](tracking-attendance.md) e [Gruppi](../groups/group-members.md) proprio come le presenze immesse manualmente. Non c'è differenza in come i dati appaiono — entrambi i metodi si alimentano nei stessi rapporti.
