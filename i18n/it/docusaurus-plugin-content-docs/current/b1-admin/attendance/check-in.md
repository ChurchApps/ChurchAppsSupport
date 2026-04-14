---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supporta il check-in automatico alle funzioni attraverso l'app complementare **B1 Checkin**. I membri possono fare il check-in di se stessi e delle loro famiglie ai chioschi o ai dispositivi dedicati al loro arrivo, rendendo il processo rapido e riducendo il carico di lavoro sui vostri volontari. Ogni check-in viene automaticamente registrato come partecipazione.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I vostri campus, gli orari dei servizi e i gruppi devono essere configurati in [Impostazione della partecipazione](setup.md).
- Avete bisogno di [persone nel vostro database](../people/adding-people.md) con [nuclei familiari](../people/adding-people.md#managing-households) configurati in modo che le famiglie possano fare il check-in insieme.
- Avrete bisogno di un tablet e facoltativamente di una stampante per etichette Brother (vedi [raccomandazioni hardware](#recommended-hardware) sotto).

</div>

## Come funziona

L'app B1 Checkin si connette alla vostra configurazione di partecipazione di B1 Admin. Quando un membro fa il check-in, la sua partecipazione viene automaticamente registrata per il campus, l'orario del servizio e il gruppo corretti. Non è necessario inserire manualmente la partecipazione per chiunque utilizzi il sistema di check-in.

## Configurazione del Check-In

1. **Configurate prima la vostra struttura di partecipazione.** In B1 Admin, andate su **Partecipazione > Impostazione** e assicuratevi che i vostri campus, orari di servizio e gruppi siano al loro posto. L'app di check-in dipende da questa configurazione. Consultate [Impostazione della partecipazione](setup.md) per i dettagli.
2. **Installate l'app B1 Checkin** sui dispositivi che intendete utilizzare. L'app è disponibile sulle seguenti piattaforme:
   - **Android/Samsung Tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire Tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedete all'app B1 Checkin** utilizzando le credenziali dell'account della vostra chiesa.
4. **Selezionate il campus e l'orario del servizio** per l'incontro attuale.
5. I membri possono ora cercare il loro nome sul dispositivo e fare il check-in.

:::tip
Posizionate i dispositivi di check-in in luoghi visibili e facilmente accessibili, come gli ingressi della hall o i banchi di benvenuto. Un breve annuncio durante i servizi aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la vostra chiesa ha più campus, dovrete ripetere la configurazione per ogni campus in [Impostazione della partecipazione](setup.md). Ogni dispositivo di check-in può essere configurato per un campus diverso.
:::

## Hardware consigliato

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Budget:** Amazon Fire HD 10

**Stampanti** — il check-in funziona con le stampanti per etichette Brother per stampare i nomi:

- **Migliore:** Brother QL-1110NWB (supporta più tablet via Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet via WiFi)
- **Budget:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzioneranno per stampare i nomi.
:::

:::info
Seguire le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del vostro tablet. Potete trovare i driver delle stampanti Brother e le guide di configurazione sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzazione dell'aspetto del chiosco

Potete personalizzare l'aspetto dell'app B1 Checkin per adattarlo al marchio della vostra chiesa. In B1 Admin, andate su **Partecipazione > Tema del chiosco** per configurare:

### Colori

Personalizzate otto impostazioni di colore per adattarvi al vostro marchio della chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del marchio e colore del testo.
- **Secondario** e **Contrasto secondario** -- Colore accento e colore del testo.
- **Sfondo dell'intestazione** e **Sfondo dell'intestazione secondaria** -- Colori per le aree di intestazione del chiosco.
- **Sfondo del pulsante** e **Testo del pulsante** -- Colori per i pulsanti interattivi.

### Immagine di sfondo

Caricate un'immagine di sfondo facoltativa per le schermate di benvenuto e ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermata di inattività / Screensaver

Configurate uno screensaver che si attiva dopo un periodo di inattività:

1. Attivate o disattivate la schermata di inattività.
2. Impostate il **timeout** (quanti secondi di inattività prima che lo screensaver si avvii, minimo 10 secondi).
3. Aggiungete una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Utilizzate la schermata di inattività per visualizzare annunci, eventi imminenti o messaggi di benvenuto quando il chiosco non è in uso attivo.
:::

## Registrazione degli ospiti via codice QR

Il chiosco di check-in può visualizzare un codice QR che i visitatori scansionano per registrarsi e la loro famiglia sul proprio telefono. Questo velocizza il processo di check-in per i nuovi ospiti.

Quando un ospite scansiona il codice QR, viene portato a una [pagina di registrazione degli ospiti](../../b1-church/checkin/guest-registration) dove inserisce il suo nome, email e i membri della famiglia. Un volontario può quindi cercarlo sul chiosco e fare il check-in.

### Abilitare la registrazione degli ospiti con QR

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, andate su **Mobile** nella barra laterale sinistra (icona telefono).
2. Selezionate la scheda **Check-In**.
3. Attivate **Registrazione ospiti QR**.

:::note
Questa impostazione è sotto **Mobile**, non sotto Partecipazione > Tema del chiosco.
:::

## Cosa viene registrato

Ogni check-in crea un record di partecipazione in B1 Admin. Potete visualizzare questi record nelle schede [Partecipazione](tracking-attendance.md) e [Gruppi](../groups/group-members.md) proprio come la partecipazione inserita manualmente. Non c'è differenza nel modo in cui i dati appaiono — entrambi i metodi si inseriscono negli stessi report.
