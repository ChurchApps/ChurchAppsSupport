---
title: "Configurazione del self check-in con B1 Checkin e B1 Admin"
sidebar_label: "Check-In"
description: "Configura il self check-in per le celebrazioni con l'app B1 Checkin in B1 Admin, includendo dispositivi, account kiosk, programmazioni, personalizzazione grafica e registrazione degli ospiti tramite codice QR."
---

# Check-In

<div class="article-intro">

B1 Admin supporta il self check-in durante le celebrazioni tramite l'app complementare **B1 Checkin**. I membri possono registrare il proprio arrivo e quello dei familiari presso i kiosk o su dispositivi dedicati, rendendo il processo più rapido e riducendo il carico di lavoro dei volontari. Ogni check-in viene registrato automaticamente come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Le sedi, gli orari delle celebrazioni e i gruppi devono essere configurati in [Configurazione presenze](setup.md).
- Devi avere [persone nel database](../people/adding-people.md) con i [nuclei familiari](../people/adding-people.md#managing-households) configurati, così che le famiglie possano registrarsi insieme.
- Ti servirà un tablet e, facoltativamente, una stampante per etichette Brother (vedi [raccomandazioni hardware](#recommended-hardware) più avanti).

</div>

## Come funziona

L'app B1 Checkin si collega alla configurazione delle presenze di B1 Admin. Quando un membro effettua il check-in, la sua presenza viene registrata automaticamente nella sede, nell'orario della celebrazione e nel gruppo corretti. Non è necessario inserire manualmente le presenze per chi utilizza il sistema di check-in.

## Configurazione del check-in

1. **Configura prima di tutto la struttura delle presenze.** In B1 Admin, vai su **Persone > Presenze** e fai clic su **Configurazione** per assicurarti che sedi, orari delle celebrazioni e gruppi siano impostati. L'app di check-in si basa su questa configurazione. Facoltativamente, assegna a ogni orario una [programmazione del check-in](setup.md#setting-a-check-in-schedule), in modo che il check-in si apra e si chiuda automaticamente ogni settimana. Le programmazioni usano il fuso orario della sede della celebrazione oppure, se la sede non ne ha uno, il fuso orario della tua chiesa. Il kiosk mostra come **Chiuso** gli orari la cui finestra di check-in è chiusa e indica alle famiglie quando il check-in aprirà. Per maggiori dettagli, consulta [Configurazione presenze](setup.md).
2. **Installa l'app B1 Checkin** sui dispositivi che intendi utilizzare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** con un account che disponga del permesso di presenza **Checkin** (oppure **Modifica presenze**). Vedi [Account kiosk per il check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Seleziona la sede e l'orario della celebrazione** per il raduno in corso.
5. Ora i membri possono cercare il proprio nome sul dispositivo ed effettuare il check-in.

:::tip
Posiziona i dispositivi di check-in in luoghi visibili e facilmente raggiungibili, come l'ingresso della hall o il banco di accoglienza. Un breve annuncio durante le celebrazioni aiuta i membri a sapere che questa possibilità è disponibile.
:::

:::tip
Se la tua chiesa ha più sedi, dovrai ripetere la configurazione per ciascuna sede in [Configurazione presenze](setup.md). Ogni dispositivo di check-in può essere configurato per una sede diversa.
:::

## Hardware consigliato

**Tablet** — qualsiasi modello tra questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8,7"
- **Schermo grande:** Samsung Galaxy Tab A8 10,5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — il check-in funziona con le stampanti per etichette Brother per la stampa dei cartellini con il nome:

- **Migliore:** Brother QL-1110NWB (supporta più tablet tramite Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet tramite WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Le stampanti di altre marche non funzioneranno per la stampa dei cartellini con il nome.
:::

:::info
Segui le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzazione dell'aspetto del kiosk

Puoi personalizzare l'aspetto dell'app B1 Checkin per adattarla all'identità visiva della tua chiesa. In B1 Admin, vai su **Mobile > B1 CheckIn** e usa la scheda **Tema del kiosk** per configurare:

### Colori

Personalizza otto impostazioni di colore per adattarle all'identità visiva della tua chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del marchio e il relativo colore del testo.
- **Secondario** e **Contrasto secondario** -- Colore d'accento e il relativo colore del testo.
- **Sfondo intestazione** e **Sfondo sottointestazione** -- Colori delle aree di intestazione del kiosk.
- **Sfondo pulsanti** e **Testo pulsanti** -- Colori dei pulsanti interattivi.

### Immagine di sfondo

Carica un'immagine di sfondo facoltativa per le schermate di benvenuto e di ricerca del kiosk. La dimensione consigliata è 1920x1080 pixel.

### Schermata di inattività / Salvaschermo

Configura un salvaschermo che si attiva dopo un periodo di inattività:

1. Attiva o disattiva la schermata di inattività.
2. Imposta il **timeout** (quanti secondi di inattività prima che si avvii il salvaschermo, minimo 10 secondi).
3. Aggiungi una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa la schermata di inattività per mostrare annunci, eventi in programma o messaggi di benvenuto quando il kiosk non è in uso.
:::

## Registrazione degli ospiti tramite codice QR

Il kiosk di check-in può mostrare un codice QR che i visitatori scansionano per registrare sé stessi e la propria famiglia direttamente sul proprio telefono. Questo accelera il processo di check-in per gli ospiti alla prima visita.

Quando un ospite scansiona il codice QR, viene indirizzato a una [pagina di registrazione degli ospiti](../../b1-church/checkin/guest-registration.md), dove inserisce i nomi dei familiari e gli altri dati che hai scelto di richiedere. Un volontario può poi cercarlo sul kiosk ed effettuare il suo check-in.

### Attivazione della registrazione ospiti tramite QR

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **B1 CheckIn**.
3. Attiva **Registrazione ospiti QR** e fai clic su **Salva**.

:::note
Questa impostazione si trova in **Mobile > B1 CheckIn** (nella stessa pagina della scheda **Tema del kiosk**), non in Presenze. L'azione **Kiosk** nella pagina Presenze contiene un collegamento a questa pagina.
:::

Una volta attivato l'interruttore, le altre opzioni qui sotto compaiono nella stessa scheda **Registrazione ospiti QR**. Dopo aver modificato una qualsiasi di queste opzioni, fai clic su **Salva** nella scheda.

### Scelta dei campi di iscrizione

La lista **Campi di iscrizione** controlla le informazioni richieste dal modulo di registrazione. **Nome** e **Cognome** sono sempre presenti nel modulo e sono sempre obbligatori per ogni membro della famiglia. Per ogni altro campo, attiva **Includi** per aggiungerlo al modulo, poi attiva **Obbligatorio** se gli ospiti devono compilarlo. **Obbligatorio** può essere attivato solo per un campo incluso, e disattivare **Includi** lo deseleziona automaticamente.

| Campo | Richiesto per | Incluso per impostazione predefinita |
|-------|---------------|--------------------------------------|
| **Titolo** | Ogni membro della famiglia, come menu a tendina davanti al nome (Sig., Sig.ra, Sig.na, Dott., Dott.ssa, Prof., Rev., Pastore) | No |
| **Email** | Solo il referente principale | Sì (facoltativo) |
| **Telefono** | Ogni membro della famiglia. Se obbligatorio, deve compilarlo solo il referente principale. | Sì (facoltativo) |
| **Ruolo nel nucleo familiare** | Ogni membro della famiglia dopo il referente principale -- Coniuge, Figlio o Altro. Il referente principale è il capofamiglia di un nuovo nucleo. Chi non ha un ruolo viene salvato come Altro. | Sì (facoltativo) |
| **Indirizzo di residenza** | Una sola volta per la famiglia -- via, indirizzo aggiuntivo, città, provincia e CAP. Se obbligatorio, tutti i campi tranne l'indirizzo aggiuntivo devono essere compilati. L'indirizzo viene salvato per ogni membro della famiglia. | No |
| **Data di nascita** | Ogni membro della famiglia | No |
| **Sesso** | Ogni membro della famiglia | No |
| **Stato civile** | Solo il referente principale | No |
| **Classe** | Ogni membro della famiglia (dalla scuola materna alla 12ª classe, oppure Diplomato) | No |
| **Commenti** | Una volta sola, in una casella sotto i membri della famiglia (fino a 1.000 caratteri) | No |

I campi disattivati non vengono mai salvati, anche se qualcuno li invia in altro modo al modulo di iscrizione. I commenti vengono salvati come nota nella scheda del referente principale (pubblicata come "Iscrizione ospite"), così puoi leggerli nella sezione **Note** del suo profilo.

### Aggiunta degli ospiti a un gruppo

Usa **Aggiungi i nuovi ospiti al gruppo** per inserire automaticamente tutti coloro che si iscrivono in uno dei tuoi gruppi -- ad esempio un gruppo "Nuovi arrivati" o un gruppo per l'evento di questo fine settimana. Scegli **Nessuno** (impostazione predefinita) per non fare nulla. Gli ospiti non vedono né scelgono il gruppo: viene impostato solo qui. Modificalo prima di ogni evento, così puoi seguire insieme gli ospiti di quell'evento.

### Registrazione delle presenze

Quando è selezionato un gruppo, compare l'interruttore **Registra anche la presenza**. Attivalo per segnare gli ospiti come presenti nel momento in cui si iscrivono, senza doverli registrare separatamente.

La presenza viene registrata solo se l'iscrizione avviene durante uno degli orari **programmati** dei gruppi selezionati:

- Il gruppo deve essere collegato a uno o più orari di celebrazione, e tali orari devono avere una [programmazione del check-in](setup.md#setting-a-check-in-schedule) (un **Giorno** e un **Orario di inizio**).
- "Durante" significa all'interno della finestra di check-in di quell'orario -- dai minuti di **Apertura check-in** prima dell'inizio fino ai minuti di **Chiusura check-in** dopo la fine (oppure dopo l'inizio, se non è impostato un orario di fine; se non sono impostati né l'orario di fine né i minuti di chiusura, fino alla fine di quel giorno), nello stesso fuso orario utilizzato dalla programmazione del check-in.
- Ogni membro della famiglia viene segnato come presente nel gruppo per ciascuno dei suoi orari di celebrazione aperti in quel momento, nella data odierna.
- Le iscrizioni effettuate in qualsiasi altro momento, oppure per un gruppo i cui orari non hanno una programmazione, vengono aggiunte al gruppo ma non vengono conteggiate come presenze.

### Foto di intestazione

In **Foto di intestazione**, fai clic su **Cambia foto** per scegliere o caricare un'immagine (ritagliata in formato 16:9) da mostrare in cima alla pagina di registrazione al posto dell'icona predefinita. Fai clic su **Rimuovi** per tornare all'icona.

### Condivisione del link di registrazione

Una volta attivata la registrazione ospiti tramite QR, nella parte inferiore della scheda compare la sezione **Condividi il codice QR di registrazione**. Questo ti offre due modi, oltre al codice QR del kiosk, per portare gli ospiti al modulo di registrazione:

- **Copia link** — copia l'URL di registrazione così puoi incollarlo sul sito web della tua chiesa, nelle email o in qualsiasi altro punto online.
- **Scarica PNG** — scarica il codice QR come immagine da stampare su volantini, bollettini o cartelli.

:::tip
Aggiungi il link di registrazione alla pagina "Pianifica la tua visita" o "Sono nuovo" del sito web della tua chiesa, così gli ospiti possono registrarsi ancora prima di arrivare.
:::

### Cosa succede dopo l'iscrizione di un ospite

B1 cerca innanzitutto le persone già presenti in **Persone**. Un familiare viene associato a una persona esistente quando una sola persona ha lo stesso nome e la stessa email o lo stesso telefono. Un bambino inserito senza email o telefono viene associato in base al nome, all'interno del nucleo familiare già associato. Le persone associate vengono riutilizzate così come sono -- l'iscrizione non modifica mai i loro dati o lo stato di membro -- e chiunque sia nuovo entra a far parte del nucleo familiare associato.

Quando nessuno corrisponde, l'iscrizione crea un nuovo nucleo familiare con il cognome del referente principale, con una scheda persona per ogni membro della famiglia. Tutti i nuovi membri vengono aggiunti a **Persone** con lo stato di membro **Visitatore**, e il referente principale ne diventa il capofamiglia.

Sia le persone associate sia quelle nuove vengono aggiunte al gruppo scelto (se non ne fanno già parte) e, se l'opzione è attiva, la loro presenza viene registrata. I commenti vengono salvati come nota sul referente principale.

Per effettuare un follow-up automatico, aggiungi un [trigger di flusso di lavoro](../serving/workflows.md#triggers), ad esempio **Persona · Creata** con la condizione *Stato di membro è Visitatore*, oppure **Gruppo · Membro aggiunto** per il gruppo scelto sopra.

## Cosa viene registrato

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nella pagina [Presenze](tracking-attendance.md) e nelle [sessioni di ciascun gruppo](../groups/group-members.md), esattamente come le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati vengono visualizzati: entrambi i metodi alimentano gli stessi report.
