---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supporta il check-in self-service durante i servizi tramite l'app companion **B1 Checkin**. I membri possono registrare la propria presenza e quella delle loro famiglie presso chioschi o dispositivi dedicati al loro arrivo, rendendo il processo rapido e riducendo il carico di lavoro dei volontari. Ogni check-in viene automaticamente registrato come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Le sedi, gli orari dei servizi e i gruppi devono essere configurati nella [Configurazione presenze](setup.md).
- È necessario avere [persone nel database](../people/adding-people.md) con [nuclei familiari](../people/adding-people.md#managing-households) configurati affinché le famiglie possano registrarsi insieme.
- Avrai bisogno di un tablet e, opzionalmente, di una stampante di etichette Brother (vedi le [raccomandazioni hardware](#recommended-hardware) di seguito).

</div>

## Come funziona

L'app B1 Checkin si connette alla configurazione delle presenze di B1 Admin. Quando un membro effettua il check-in, la sua presenza viene automaticamente registrata per la sede, l'orario del servizio e il gruppo corretti. Non è necessario inserire manualmente la presenza per chi utilizza il sistema di check-in.

## Configurazione del check-in

1. **Configura prima la struttura delle presenze.** In B1 Admin, vai su **Presenze > Configurazione** e assicurati che le sedi, gli orari dei servizi e i gruppi siano configurati. L'app di check-in si basa su questa configurazione. Vedi [Configurazione presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi utilizzare. L'app è disponibile sulle seguenti piattaforme:
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** utilizzando le credenziali dell'account della tua chiesa.
4. **Seleziona la sede e l'orario del servizio** per la riunione corrente.
5. I membri possono ora cercare il proprio nome sul dispositivo ed effettuare il check-in.

:::tip
Posiziona i dispositivi di check-in in punti visibili e facilmente accessibili, come gli ingressi della hall o i banchi di accoglienza. Un breve annuncio durante i servizi aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più sedi, dovrai ripetere la configurazione per ogni sede nella [Configurazione presenze](setup.md). Ogni dispositivo di check-in può essere configurato per una sede diversa.
:::

## Hardware consigliato

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — i check-in funzionano con stampanti di etichette Brother per la stampa dei badge:

- **Migliore:** Brother QL-1110NWB (supporta più tablet via Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet via WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (29 mm x 90 mm)

:::warning
Solo le stampanti di etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzioneranno per la stampa dei badge.
:::

:::info
Segui le istruzioni di configurazione della tua stampante per collegarla alla stessa rete WiFi del tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzazione dell'aspetto del chiosco

Puoi personalizzare l'aspetto dell'app B1 Checkin per adattarlo al branding della tua chiesa. In B1 Admin, vai su **Presenze > Tema chiosco** per configurare:

### Colori

Personalizza otto impostazioni di colore per adattarle al branding della tua chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del brand e il suo colore testo.
- **Secondario** e **Contrasto secondario** -- Colore di accento e il suo colore testo.
- **Sfondo intestazione** e **Sfondo sotto-intestazione** -- Colori per le aree dell'intestazione del chiosco.
- **Sfondo pulsante** e **Testo pulsante** -- Colori per i pulsanti interattivi.

### Immagine di sfondo

Carica un'immagine di sfondo opzionale per le schermate di benvenuto e ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermata di inattività / Screensaver

Configura uno screensaver che si attiva dopo un periodo di inattività:

1. Attiva o disattiva la schermata di inattività.
2. Imposta il **timeout** (quanti secondi di inattività prima che lo screensaver si avvii, minimo 10 secondi).
3. Aggiungi una o più **slide** -- ogni slide ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa la schermata di inattività per mostrare annunci, eventi in programma o messaggi di benvenuto quando il chiosco non è in uso attivo.
:::

## Registrazione ospiti tramite codice QR

Il chiosco di check-in può mostrare un codice QR che i visitatori scansionano per registrare sé stessi e la propria famiglia dal proprio telefono. Questo velocizza il processo di check-in per gli ospiti alla prima visita.

Quando un ospite scansiona il codice QR, viene indirizzato a una [pagina di registrazione ospiti](../../b1-church/checkin/guest-registration) dove inserisce nome, email e membri della famiglia. Un volontario può poi cercarlo sul chiosco ed effettuare il check-in.

### Abilitare la registrazione ospiti tramite QR

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, vai su **Mobile** nella barra laterale sinistra (icona telefono).
2. Seleziona la scheda **Check-In**.
3. Attiva **Registrazione ospiti QR**.

:::note
Questa impostazione si trova sotto **Mobile**, non sotto Presenze > Tema chiosco.
:::

## Cosa viene registrato

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nelle schede [Presenze](tracking-attendance.md) e [Gruppi](../groups/group-members.md) esattamente come le presenze inserite manualmente. Non c'è differenza nella visualizzazione dei dati — entrambi i metodi alimentano gli stessi report.
