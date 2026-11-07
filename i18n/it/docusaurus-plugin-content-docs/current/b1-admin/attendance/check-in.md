---
title: "Configurazione Self Check-In con B1 Checkin e B1 Admin"
sidebar_label: "Check-In"
description: "Imposta il self check-in per i culti con l'app B1 Checkin in B1 Admin: dispositivi, account kiosk, orari, branding e registrazione ospiti tramite QR."
---

# Check-In

<div class="article-intro">

B1 Admin supporta il self check-in durante i culti tramite l'app complementare **B1 Checkin**. I membri possono registrare se stessi e le proprie famiglie presso i chioschi o i dispositivi dedicati all'arrivo, rendendo il processo rapido e riducendo il carico di lavoro dei volontari. Ogni check-in viene registrato automaticamente come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Le tue sedi, gli orari dei culti e i gruppi devono essere configurati in [Configurazione presenze](setup.md).
- Ti servono [persone nel tuo database](../people/adding-people.md) con i [nuclei familiari](../people/adding-people.md#managing-households) impostati, così le famiglie possono registrarsi insieme.
- Ti serviranno un tablet e, facoltativamente, una stampante per etichette Brother (vedi [consigli sull'hardware](#recommended-hardware) più sotto).

</div>

## Come funziona

L'app B1 Checkin si collega alla configurazione delle presenze di B1 Admin. Quando un membro effettua il check-in, la sua presenza viene registrata automaticamente sulla sede, l'orario del culto e il gruppo corretti. Non è necessario inserire manualmente le presenze per chi utilizza il sistema di check-in.

## Configurare il check-in

1. **Configura prima la struttura delle presenze.** In B1 Admin, vai su **Persone > Presenze** e clicca su **Configurazione** per assicurarti che le sedi, gli orari dei culti e i gruppi siano impostati. L'app di check-in si basa su questa configurazione. Facoltativamente, assegna a ogni orario di culto una [pianificazione del check-in](setup.md#setting-a-check-in-schedule), in modo che il check-in si apra e si chiuda automaticamente ogni settimana. Le pianificazioni usano il fuso orario della sede del culto oppure, se la sede non ne ha impostato uno, il fuso orario della tua chiesa; il chiosco mostra come **Chiuso** gli orari di culto la cui finestra è chiusa e indica alle famiglie quando il check-in si aprirà. Vedi [Configurazione presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi utilizzare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** con un account che disponga del permesso di presenze **Checkin** (oppure **Modifica presenze**). Vedi [Account per il chiosco di check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Seleziona la sede e l'orario del culto** per l'incontro in corso.
5. I membri possono ora cercare il proprio nome sul dispositivo ed effettuare il check-in.

:::tip
Colloca i dispositivi di check-in in punti visibili e facilmente raggiungibili, come gli ingressi della hall o le postazioni di accoglienza. Un breve annuncio durante i culti aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più sedi, dovrai ripetere la configurazione per ciascuna sede in [Configurazione presenze](setup.md). Ogni dispositivo di check-in può essere configurato per una sede diversa.
:::

## Hardware consigliato {#recommended-hardware}

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — il check-in funziona con le stampanti per etichette Brother per stampare i cartellini con il nome:

- **Migliore:** Brother QL-1110NWB (supporta più tablet tramite Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet tramite WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzionano per la stampa dei cartellini con il nome.
:::

:::info
Segui le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzare l'aspetto del chiosco

Puoi personalizzare l'aspetto dell'app B1 Checkin per adattarlo all'identità visiva della tua chiesa. In B1 Admin, vai su **Mobile > B1 CheckIn** e usa la scheda **Tema del chiosco** per configurare:

### Colori

Personalizza otto impostazioni di colore per adattarle all'identità della tua chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del brand e il suo colore del testo.
- **Secondario** e **Contrasto secondario** -- Colore di accento e il suo colore del testo.
- **Sfondo intestazione** e **Sfondo sottointestazione** -- Colori delle aree di intestazione del chiosco.
- **Sfondo pulsanti** e **Testo pulsanti** -- Colori dei pulsanti interattivi.

### Immagine di sfondo

Carica un'immagine di sfondo facoltativa per le schermate di benvenuto e di ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermata di inattività / Salvaschermo

Configura un salvaschermo che si attiva dopo un periodo di inattività:

1. Attiva o disattiva la schermata di inattività.
2. Imposta il **timeout** (quanti secondi di inattività prima che si avvii il salvaschermo, minimo 10 secondi).
3. Aggiungi una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa la schermata di inattività per mostrare annunci, eventi in programma o messaggi di benvenuto quando il chiosco non è in uso.
:::

## Registrazione degli ospiti tramite codice QR {#guest-registration-via-qr-code}

Il chiosco di check-in può mostrare un codice QR che i visitatori scansionano per registrare autonomamente se stessi e la propria famiglia sul proprio telefono. Questo velocizza il check-in per gli ospiti che vengono per la prima volta.

Quando un ospite scansiona il codice QR, viene indirizzato a una [pagina di registrazione ospiti](../../b1-church/checkin/guest-registration.md) dove inserisce i nomi della propria famiglia e gli altri dati che hai scelto di richiedere. Un volontario può poi cercarlo sul chiosco ed effettuare il check-in.

### Attivare la registrazione ospiti tramite QR

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Clicca su **B1 CheckIn**.
3. Attiva **Registrazione ospiti QR** e clicca su **Salva**.

:::note
Questa impostazione si trova in **Mobile > B1 CheckIn** (la stessa pagina della scheda **Tema del chiosco**), non in Presenze. L'azione **Chiosco** nella pagina Presenze contiene un collegamento a questa pagina.
:::

Una volta attivato l'interruttore, le altre opzioni qui sotto compaiono nella stessa scheda **Registrazione ospiti QR**. Clicca su **Salva** nella scheda dopo aver modificato una qualsiasi di esse.

### Scegliere i campi di iscrizione

L'elenco **Campi di iscrizione** controlla cosa chiede il modulo di registrazione. **Nome** e **Cognome** sono sempre presenti nel modulo e sempre obbligatori per ogni membro della famiglia. Per ogni altro campo, attiva **Includi** per aggiungerlo al modulo, poi attiva **Obbligatorio** se gli ospiti devono compilarlo. **Obbligatorio** può essere attivato solo per un campo incluso, e disattivare **Includi** lo azzera.

| Campo | Richiesto a | Incluso di default |
|-------|-----------|---------------------|
| **Email** | Solo il contatto principale | Sì (facoltativo) |
| **Telefono** | Solo il contatto principale | Sì (facoltativo) |
| **Indirizzo di casa** | Una volta per la famiglia -- via, indirizzo riga 2, città, provincia e CAP. Se obbligatorio, devono essere compilati tutti i campi tranne la riga 2 dell'indirizzo. L'indirizzo viene salvato per ogni membro della famiglia. | No |
| **Data di nascita** | Ogni membro della famiglia | No |
| **Sesso** | Ogni membro della famiglia | No |
| **Stato civile** | Solo il contatto principale | No |
| **Classe** | Ogni membro della famiglia (da Prescuola a 12, oppure Diplomato) | No |
| **Commenti** | Una volta, in una casella sotto i membri della famiglia (fino a 1.000 caratteri) | No |

I campi disattivati non vengono mai salvati, anche se qualcuno li invia all'iscrizione in un altro modo. I commenti vengono salvati come nota nella scheda del contatto principale (pubblicata come "Iscrizione ospite"), così puoi leggerli nella sezione **Note** del suo profilo.

### Aggiungere gli ospiti a un gruppo

Usa **Aggiungi i nuovi ospiti al gruppo** per inserire automaticamente tutti coloro che si iscrivono in uno dei tuoi gruppi -- ad esempio un gruppo "Nuovi arrivati" o un gruppo per l'evento di questo fine settimana. Scegli **Nessuno** (l'impostazione predefinita) per saltare questo passaggio. Gli ospiti non vedono né scelgono mai il gruppo; viene impostato solo qui. Cambialo prima di ogni evento, così puoi seguire insieme gli ospiti di quell'evento.

### Registrare le presenze

Quando viene selezionato un gruppo, compare l'interruttore **Registra anche le presenze**. Attivalo per segnare gli ospiti come presenti nel momento in cui si iscrivono, così non dovrai effettuare il check-in separatamente.

Le presenze vengono registrate solo quando l'iscrizione avviene durante uno degli orari **pianificati** dei culti del gruppo selezionato:

- Il gruppo deve essere collegato a uno o più orari di culto, e tali orari devono avere una [pianificazione del check-in](setup.md#setting-a-check-in-schedule) (un **Giorno** e un **Orario di inizio**).
- "Durante" significa all'interno della finestra di check-in di quell'orario di culto -- da **Apri check-in** minuti prima dell'inizio fino a **Chiudi check-in** minuti dopo la fine (o dopo l'inizio, se non è impostato un orario di fine), nello stesso fuso orario usato dalla pianificazione del check-in.
- Ogni membro della famiglia viene segnato presente nel gruppo per ciascuno dei suoi orari di culto che è aperto in quel momento, nella data odierna.
- Le iscrizioni effettuate in qualsiasi altro momento, o per un gruppo i cui orari di culto non hanno una pianificazione, vengono aggiunte al gruppo ma non vengono conteggiate come presenze.

### Foto di intestazione

In **Foto di intestazione**, clicca su **Cambia foto** per scegliere o caricare un'immagine (ritagliata in formato 16:9) da mostrare in cima alla pagina di registrazione al posto dell'icona predefinita. Clicca su **Rimuovi** per tornare all'icona.

### Condividere il link di registrazione

Una volta attivata la registrazione ospiti tramite QR, nella parte inferiore della scheda compare la sezione **Condividi codice QR di registrazione**. Questo ti offre due modi, oltre al codice QR del chiosco, per portare gli ospiti al modulo di registrazione:

- **Copia link** — copia l'URL di registrazione così puoi incollarlo sul sito web della chiesa, nelle email o in qualsiasi altro punto online.
- **Scarica PNG** — scarica il codice QR come immagine che puoi stampare su volantini, bollettini o cartelli.

:::tip
Aggiungi il link di registrazione alla pagina "Pianifica la tua visita" o "Sono nuovo" del sito web della chiesa, così gli ospiti possono registrarsi ancora prima di arrivare.
:::

### Cosa succede dopo che un ospite si iscrive

B1 cerca per prima cosa le persone già presenti in **Persone**. Un membro della famiglia viene abbinato a una persona esistente quando esattamente una persona ha lo stesso nome e la stessa email o lo stesso numero di telefono. Un bambino inserito senza email né telefono viene abbinato in base al nome all'interno del nucleo familiare abbinato. Le persone abbinate vengono riutilizzate così come sono -- l'iscrizione non modifica mai i loro dati o lo stato di appartenenza -- e chiunque sia nuovo entra a far parte del nucleo familiare abbinato.

Quando non viene trovata alcuna corrispondenza, l'iscrizione crea un nuovo nucleo familiare con il cognome del contatto principale e una scheda persona per ogni membro della famiglia. Tutti i nuovi vengono aggiunti a **Persone** con lo stato di appartenenza **Visitatore**, con il contatto principale come capofamiglia.

Sia le persone abbinate sia quelle nuove vengono aggiunte al gruppo scelto (se non ne fanno già parte) e, se attivato, viene registrata la loro presenza. I commenti vengono salvati come nota nel contatto principale.

Per dare seguito automaticamente, aggiungi un [trigger del flusso di lavoro](../serving/workflows.md#triggers) come **Persona · Creata** con la condizione *Stato di appartenenza è Visitatore*, oppure **Gruppo · Membro aggiunto** per il gruppo che hai scelto sopra.

## Cosa viene registrato

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nella pagina [Presenze](tracking-attendance.md) e nelle [sessioni di ciascun gruppo](../groups/group-members.md) esattamente come le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati vengono visualizzati: entrambi i metodi alimentano gli stessi report.
