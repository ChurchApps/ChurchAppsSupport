---
title: "Check-in"
---

# Check-in

<div class="article-intro">

B1 Admin supporta il self check-in durante le funzioni tramite l'app complementare **B1 Checkin**. I membri possono registrare sé stessi e le proprie famiglie all'arrivo, usando dei kiosk o dispositivi dedicati. Il processo diventa così più rapido e riduce il carico di lavoro dei volontari. Ogni check-in viene registrato automaticamente come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, gli orari delle funzioni e i gruppi devono essere configurati in [Configurazione presenze](setup.md).
- Ti servono [persone nel tuo database](../people/adding-people.md) con [nuclei familiari](../people/adding-people.md#managing-households) impostati, così che le famiglie possano effettuare il check-in insieme.
- Ti serviranno un tablet e, facoltativamente, una stampante per etichette Brother (vedi [consigli sull'hardware](#recommended-hardware) più sotto).

</div>

## Come funziona

L'app B1 Checkin si collega alla configurazione delle presenze di B1 Admin. Quando un membro effettua il check-in, la sua presenza viene registrata automaticamente sul campus, sull'orario della funzione e sul gruppo corretti. Non devi inserire manualmente le presenze di chi utilizza il sistema di check-in.

## Configurare il check-in

1. **Configura prima la struttura delle presenze.** In B1 Admin, vai su **Persone > Presenze** e clicca su **Configurazione** per assicurarti che campus, orari delle funzioni e gruppi siano impostati. L'app di check-in si basa su questa configurazione. Facoltativamente, puoi assegnare a ogni orario di funzione una [pianificazione del check-in](setup.md#setting-a-check-in-schedule), così che il check-in si apra e si chiuda automaticamente ogni settimana. Le pianificazioni usano il fuso orario del campus della funzione oppure, se il campus non ne ha uno impostato, il fuso orario della tua chiesa. Il kiosk mostra come **Chiuso** gli orari di funzione la cui finestra è chiusa e comunica alle famiglie quando il check-in si apre. Per maggiori dettagli, vedi [Configurazione presenze](setup.md).
2. **Installa l'app B1 Checkin** sui dispositivi che intendi usare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** usando le credenziali dell'account della tua chiesa.
4. **Seleziona il campus e l'orario della funzione** per l'adunanza in corso.
5. I membri possono ora cercare il proprio nome sul dispositivo ed effettuare il check-in.

:::tip
Colloca i dispositivi di check-in in posizioni visibili e facilmente raggiungibili, come l'ingresso della hall o il banco di accoglienza. Un breve annuncio durante le funzioni aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più campus, dovrai ripetere la configurazione per ciascun campus in [Configurazione presenze](setup.md). Ogni dispositivo di check-in può essere configurato per un campus diverso.
:::

## Hardware consigliato

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — il check-in funziona con le stampanti per etichette Brother, per stampare i cartellini con i nomi:

- **Migliore:** Brother QL-1110NWB (supporta più tablet tramite Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet tramite WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Le stampanti di altre marche non funzioneranno per stampare i cartellini con i nomi.
:::

:::info
Segui le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzare l'aspetto del kiosk

Puoi personalizzare l'aspetto dell'app B1 Checkin per adattarlo all'identità visiva della tua chiesa. In B1 Admin, vai su **Mobile > B1 CheckIn** e usa la scheda **Tema del kiosk** per configurare:

### Colori

Personalizza le otto impostazioni di colore per adattarle all'identità della tua chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del marchio e il relativo colore del testo.
- **Secondario** e **Contrasto secondario** -- Colore di accento e il relativo colore del testo.
- **Sfondo dell'intestazione** e **Sfondo della sottointestazione** -- Colori delle aree di intestazione del kiosk.
- **Sfondo dei pulsanti** e **Testo dei pulsanti** -- Colori dei pulsanti interattivi.

### Immagine di sfondo

Carica un'immagine di sfondo facoltativa per le schermate di benvenuto e di ricerca del kiosk. La dimensione consigliata è 1920x1080 pixel.

### Schermo inattivo / Salvaschermo

Configura un salvaschermo che si attiva dopo un periodo di inattività:

1. Attiva o disattiva lo schermo inattivo.
2. Imposta il **timeout** (quanti secondi di inattività prima che il salvaschermo parta; minimo 10 secondi).
3. Aggiungi una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa lo schermo inattivo per mostrare annunci, eventi in programma o messaggi di benvenuto quando il kiosk non è in uso.
:::

## Registrazione degli ospiti tramite codice QR

Il kiosk di check-in può mostrare un codice QR che i visitatori scansionano per registrare sé stessi e la propria famiglia sul proprio telefono. Questo accelera il check-in per gli ospiti alla prima visita.

Quando un ospite scansiona il codice QR, viene indirizzato a una [pagina di registrazione degli ospiti](../../b1-church/checkin/guest-registration), dove inserisce i nomi della propria famiglia e gli altri dati che hai scelto di richiedere. Un volontario può poi cercarlo sul kiosk ed effettuare il check-in.

### Attivare la registrazione QR per gli ospiti

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Clicca su **B1 CheckIn**.
3. Attiva **Registrazione QR per gli ospiti** e clicca su **Salva**.

:::note
Questa impostazione si trova in **Mobile > B1 CheckIn** (la stessa pagina della scheda **Tema del kiosk**), non in Presenze. L'azione **Kiosk** nella pagina Presenze contiene un collegamento a questa pagina.
:::

Una volta attivato l'interruttore, le altre opzioni descritte sotto compaiono nella stessa scheda **Registrazione QR per gli ospiti**. Clicca su **Salva** nella scheda dopo aver modificato una qualsiasi di esse.

### Scegliere i campi di iscrizione

La lista **Campi di iscrizione** controlla cosa chiede il modulo di registrazione. **Nome** e **Cognome** sono sempre presenti nel modulo e sempre obbligatori per ogni membro della famiglia. Per ciascuno degli altri campi, attiva **Includi** per aggiungerlo al modulo, quindi attiva **Obbligatorio** se gli ospiti devono compilarlo. **Obbligatorio** può essere attivato solo per un campo incluso, e disattivare **Includi** lo deseleziona.

| Campo | Richiesto a | Incluso per impostazione predefinita |
|-------|-------------|--------------------------------------|
| **Email** | Solo al referente principale | Sì (facoltativo) |
| **Telefono** | Solo al referente principale | Sì (facoltativo) |
| **Indirizzo di casa** | Una sola volta per la famiglia -- via, indirizzo riga 2, città, provincia e CAP. Se obbligatorio, tutti i campi tranne l'indirizzo riga 2 devono essere compilati. L'indirizzo viene salvato per ogni membro della famiglia. | No |
| **Data di nascita** | Ogni membro della famiglia | No |
| **Sesso** | Ogni membro della famiglia | No |
| **Stato civile** | Solo al referente principale | No |
| **Classe** | Ogni membro della famiglia (dalla scuola materna alla 12ª, oppure Diplomato) | No |
| **Commenti** | Una sola volta, in una casella sotto i membri della famiglia (fino a 1.000 caratteri) | No |

I campi che disattivi non vengono mai salvati, anche se qualcuno li invia all'iscrizione in altro modo. I commenti vengono salvati come nota nella scheda del referente principale (pubblicata come "Iscrizione ospite"), così puoi leggerli nella sezione **Note** del suo profilo.

### Aggiungere gli ospiti a un gruppo

Usa **Aggiungi i nuovi ospiti al gruppo** per inserire automaticamente tutti coloro che si iscrivono in uno dei tuoi gruppi -- ad esempio un gruppo "Nuovi arrivati" o un gruppo per l'evento di questo fine settimana. Scegli **Nessuno** (predefinito) per saltare questa opzione. Gli ospiti non vedono né scelgono mai il gruppo; viene impostato solo qui. Cambialo prima di ogni evento, così da poter seguire insieme gli ospiti di quell'evento.

### Registrare le presenze

Quando un gruppo è selezionato, compare l'interruttore **Registra anche le presenze**. Attivalo per segnare gli ospiti come presenti nel momento in cui si iscrivono, così non devi effettuare il check-in separatamente.

Le presenze vengono registrate solo se l'iscrizione avviene durante uno degli orari **programmati** dei gruppi selezionati:

- Il gruppo deve essere collegato a uno o più orari di funzione, e tali orari devono avere una [pianificazione del check-in](setup.md#setting-a-check-in-schedule) (un **Giorno** e un **Orario di inizio**).
- "Durante" significa all'interno della finestra di check-in di quell'orario di funzione -- da **Apri il check-in** minuti prima dell'inizio fino a **Chiudi il check-in** minuti dopo la fine (o dopo l'inizio, se non è impostato un orario di fine), nello stesso fuso orario usato dalla pianificazione del check-in.
- Ogni membro della famiglia risulta presente nel gruppo per ciascuno dei suoi orari di funzione che sono aperti in quel momento, nella data odierna.
- Le iscrizioni effettuate in qualsiasi altro momento, oppure per un gruppo i cui orari di funzione non hanno una pianificazione, vengono aggiunte al gruppo ma non vengono conteggiate come presenze.

### Foto di intestazione

In **Foto di intestazione**, clicca su **Cambia foto** per scegliere o caricare un'immagine (ritagliata in formato 16:9) da mostrare in cima alla pagina di registrazione al posto dell'icona predefinita. Clicca su **Rimuovi** per tornare all'icona.

### Condividere il link di registrazione

Una volta attivata la registrazione QR per gli ospiti, in fondo alla scheda compare la sezione **Condividi il codice QR di registrazione**. Questo ti offre due modi per portare gli ospiti al modulo di registrazione, oltre al codice QR del kiosk:

- **Copia link** -- copia l'URL di registrazione così puoi incollarlo sul sito web della chiesa, nelle email o in qualsiasi punto online.
- **Scarica PNG** -- scarica il codice QR come immagine che puoi stampare su volantini, bollettini o cartelloni.

:::tip
Aggiungi il link di registrazione alla pagina "Pianifica la tua visita" o "Sono nuovo" del sito web della tua chiesa, così gli ospiti possono registrarsi ancora prima di arrivare.
:::

### Cosa succede dopo l'iscrizione di un ospite

B1 cerca prima le persone che sono già presenti in **Persone**. Un membro della famiglia viene associato a una persona esistente quando esattamente una persona ha lo stesso nome e la stessa email o lo stesso telefono. Un bambino inserito senza email o telefono viene associato in base al nome, all'interno del nucleo familiare già associato. Le persone associate vengono riutilizzate così come sono -- l'iscrizione non modifica mai i loro dati o il loro stato di appartenenza -- e chi è nuovo entra nel nucleo familiare associato.

Quando non viene trovata alcuna corrispondenza, l'iscrizione crea un nuovo nucleo familiare con il cognome del referente principale, con una scheda persona per ogni membro della famiglia. Tutti i nuovi vengono aggiunti a **Persone** con lo stato di appartenenza **Visitatore**, e il referente principale è il capofamiglia.

Sia le persone associate sia quelle nuove vengono aggiunte al gruppo che hai scelto (se non ne fanno già parte) e, se attivata, la loro presenza viene registrata. I commenti vengono salvati come nota nella scheda del referente principale.

Per dare seguito in automatico, aggiungi un [trigger di flusso di lavoro](../serving/workflows.md#triggers) come **Persona · Creata** con la condizione *Stato di appartenenza è Visitatore*, oppure **Gruppo · Membro aggiunto** per il gruppo che hai scelto sopra.

## Cosa viene registrato

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nella pagina [Presenze](tracking-attendance.md) e nelle [sessioni di ciascun gruppo](../groups/group-members.md), esattamente come le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati vengono mostrati: entrambi i metodi alimentano gli stessi report.
