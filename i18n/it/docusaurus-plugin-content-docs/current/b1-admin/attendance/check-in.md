---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supporta l'auto check-in dei servizi attraverso l'app companion **B1 Checkin**. I membri possono fare il check-in di se stessi e delle loro famiglie presso i chioschi o i dispositivi dedicati quando arrivano, rendendo il processo veloce e riducendo il carico di lavoro sui vostri volontari. Ogni check-in viene automaticamente registrato come presenze.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I vostri campus, gli orari dei servizi e i gruppi devono essere configurati in [Configurazione delle presenze](setup.md).
- Avete bisogno di [persone nel vostro database](../people/adding-people.md) con [nuclei familiari](../people/adding-people.md#managing-households) configurati in modo che le famiglie possano fare il check-in insieme.
- Avrete bisogno di un tablet e opzionalmente di una stampante di etichette Brother (vedere [raccomandazioni hardware](#recommended-hardware) sotto).

</div>

## Come funziona

L'app B1 Checkin si connette alla configurazione delle presenze di B1 Admin. Quando un membro fa il check-in, le sue presenze vengono automaticamente registrate nel campus corretto, nell'orario del servizio e nel gruppo. Non è necessario inserire manualmente le presenze per chiunque utilizzi il sistema di check-in.

## Configurazione del Check-In

1. **Configurate prima la vostra struttura di presenze.** In B1 Admin, andate a **Presenze > Configurazione** e assicuratevi che i vostri campus, gli orari dei servizi e i gruppi siano al loro posto. L'app di check-in si basa su questa configurazione. Vedere [Configurazione delle presenze](setup.md) per i dettagli.
2. **Installate l'app B1 Checkin** sui dispositivi che intendete utilizzare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedete all'app B1 Checkin** utilizzando le credenziali dell'account della vostra chiesa.
4. **Selezionate il campus e l'orario del servizio** per la riunione attuale.
5. I membri possono ora cercare il loro nome sul dispositivo e fare il check-in.

:::tip
Posizionate i dispositivi di check-in in luoghi visibili e facilmente raggiungibili come gli ingressi della lobby o i banchi di accoglienza. Un breve annuncio durante i servizi aiuta i membri a conoscere questa opzione.
:::

:::tip
Se la vostra chiesa ha più campus, dovrete ripetere la configurazione per ogni campus in [Configurazione delle presenze](setup.md). Ogni dispositivo di check-in può essere configurato per un campus diverso.
:::

## Hardware consigliato

**Tablet** — qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Grande schermo:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — i check-in funzionano con stampanti di etichette Brother per stampare le targhette con i nomi:

- **Migliore:** Brother QL-1110NWB (supporta più tablet via Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet via WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti di etichette Brother sono compatibili con l'app B1 Checkin. Altri marchi di stampanti non funzioneranno per la stampa delle targhette con i nomi.
:::

:::info
Seguite le istruzioni di configurazione della vostra stampante per collegarla alla stessa rete WiFi del vostro tablet. Potete trovare i driver della stampante Brother e le guide di configurazione nel [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzazione dell'aspetto del chiosco

Potete personalizzare l'aspetto e l'atmosfera dell'app B1 Checkin per adattarla al marchio della vostra chiesa. In B1 Admin, andate a **Mobile > B1 CheckIn** e utilizzate la scheda **Tema del chiosco** per configurare:

### Colori

Personalizzate otto impostazioni di colore per adattarvi al marchio della vostra chiesa:

- **Primario** e **Contrasto primario** -- Colore del marchio principale e il colore del testo corrispondente.
- **Secondario** e **Contrasto secondario** -- Colore di accento e il colore del testo corrispondente.
- **Sfondo intestazione** e **Sfondo sottointestazione** -- Colori per le aree dell'intestazione del chiosco.
- **Sfondo pulsante** e **Testo pulsante** -- Colori per i pulsanti interattivi.

### Immagine di sfondo

Caricate un'immagine di sfondo opzionale per le schermate di benvenuto e ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermata inattiva / Salvaschermo

Configurate un salvaschermo che si attiva dopo un periodo di inattività:

1. Attivate o disattivate la schermata inattiva **on** oppure **off**.
2. Impostate il **timeout** (quanti secondi di inattività prima che il salvaschermo si avvii, minimo 10 secondi).
3. Aggiungete una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Utilizzate la schermata inattiva per visualizzare annunci, eventi imminenti o messaggi di benvenuto quando il chiosco non è attivamente utilizzato.
:::

## Registrazione dei visitatori tramite codice QR

Il chiosco di check-in può visualizzare un codice QR che i visitatori scansionano per registrarsi insieme alla loro famiglia sul loro telefono. Questo velocizza il processo di check-in per i visitatori al primo accesso.

Quando un visitatore scansiona il codice QR, viene portato a una [pagina di registrazione dei visitatori](../../b1-church/checkin/guest-registration) dove inserisce il suo nome, email e i membri della famiglia. Un volontario può quindi cercarli sul chiosco e farli fare il check-in.

### Abilitazione della registrazione dei visitatori tramite QR

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandete **Mobile**.
2. Fate clic su **B1 CheckIn**.
3. Attivate **Registrazione visitatori QR** e fate clic su **Salva**.

:::note
Questa impostazione è sotto **Mobile > B1 CheckIn** (la stessa pagina della scheda **Tema del chiosco**), non sotto Presenze.
:::

### Condivisione del collegamento di registrazione

Una volta abilitata la registrazione dei visitatori QR, una sezione **Condividi codice QR di registrazione** appare sotto l'interruttore. Ciò vi dà due modi per portare i visitatori al modulo di registrazione oltre al codice QR del chiosco:

- **Copia collegamento** — copia l'URL di registrazione in modo da poterlo incollare sul sito web della vostra chiesa, nelle email o ovunque online.
- **Scarica PNG** — scarica il codice QR come immagine che potete stampare su volantini, bollettini o insegne.

:::tip
Aggiungete il collegamento di registrazione alla pagina "Piano la tua visita" o "Sono nuovo" del sito web della vostra chiesa in modo che i visitatori possano registrarsi prima ancora di arrivare.
:::

## Cosa viene registrato

Ogni check-in crea un record di presenze in B1 Admin. Potete visualizzare questi record nelle schede [Presenze](tracking-attendance.md) e [Gruppi](../groups/group-members.md) proprio come le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati appaiono -- entrambi i metodi alimentano gli stessi report.
