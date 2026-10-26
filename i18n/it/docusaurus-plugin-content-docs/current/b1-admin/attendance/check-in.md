---
title: "Check-In"
---

# Check-In

<div class="article-intro">

B1 Admin supporta il self check-in durante le funzioni tramite l'app complementare **B1 Checkin**. I membri possono registrare se stessi e le proprie famiglie su chioschi o dispositivi dedicati al loro arrivo, rendendo il processo rapido e riducendo il carico di lavoro dei volontari. Ogni check-in viene registrato automaticamente come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, gli orari delle funzioni e i gruppi devono essere configurati in [Configurazione delle presenze](setup.md).
- Ti servono [persone nel tuo database](../people/adding-people.md) con [nuclei familiari](../people/adding-people.md#managing-households) impostati, così che le famiglie possano fare il check-in insieme.
- Ti serviranno un tablet e, facoltativamente, una stampante per etichette Brother (vedi [consigli sull'hardware](#recommended-hardware) più sotto).

</div>

## Come funziona

L'app B1 Checkin si collega alla configurazione delle presenze di B1 Admin. Quando un membro effettua il check-in, la sua presenza viene registrata automaticamente con il campus, l'orario della funzione e il gruppo corretti. Non devi inserire manualmente le presenze per chi usa il sistema di check-in.

## Configurare il check-in

1. **Configura prima la struttura delle presenze.** In B1 Admin, vai su **Persone > Presenze** e fai clic su **Configurazione** per assicurarti che campus, orari delle funzioni e gruppi siano impostati. L'app di check-in si basa su questa configurazione. Facoltativamente, assegna a ogni orario della funzione una [pianificazione del check-in](setup.md#setting-a-check-in-schedule) in modo che il check-in si apra e si chiuda automaticamente ogni settimana. Le pianificazioni usano il fuso orario del campus della funzione, oppure il fuso orario della tua chiesa se il campus non ne ha uno impostato; il chiosco elenca come **Chiuso** gli orari delle funzioni la cui finestra è chiusa e comunica alle famiglie quando il check-in si apre. Vedi [Configurazione delle presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi usare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** usando le credenziali account della tua chiesa.
4. **Seleziona il campus e l'orario della funzione** per il raduno in corso.
5. I membri possono ora cercare il proprio nome sul dispositivo ed effettuare il check-in.

:::tip
Colloca i dispositivi di check-in in punti visibili e facilmente raggiungibili, come gli ingressi della hall o i banchi di accoglienza. Un breve annuncio durante le funzioni aiuta i membri a sapere che l'opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più campus, dovrai ripetere la configurazione per ciascun campus in [Configurazione delle presenze](setup.md). Ogni dispositivo di check-in può essere configurato per un campus diverso.
:::

## Hardware consigliato

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
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzioneranno per stampare i cartellini con il nome.
:::

:::info
Segui le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzare l'aspetto del chiosco

Puoi personalizzare l'aspetto dell'app B1 Checkin per adattarlo all'identità visiva della tua chiesa. In B1 Admin, vai su **Mobile > B1 CheckIn** e usa la scheda **Tema del chiosco** per configurare:

### Colori

Personalizza otto impostazioni di colore per adattarle all'identità della tua chiesa:

- **Primario** e **Contrasto primario** -- Colore principale del marchio e il suo colore del testo.
- **Secondario** e **Contrasto secondario** -- Colore d'accento e il suo colore del testo.
- **Sfondo intestazione** e **Sfondo sottointestazione** -- Colori delle aree di intestazione del chiosco.
- **Sfondo pulsanti** e **Testo pulsanti** -- Colori dei pulsanti interattivi.

### Immagine di sfondo

Carica un'immagine di sfondo facoltativa per le schermate di benvenuto e di ricerca del chiosco. La dimensione consigliata è 1920x1080 pixel.

### Schermo inattivo / Salvaschermo

Configura un salvaschermo che si attiva dopo un periodo di inattività:

1. Attiva o disattiva lo schermo inattivo.
2. Imposta il **timeout** (quanti secondi di inattività prima che si avvii il salvaschermo, minimo 10 secondi).
3. Aggiungi una o più **diapositive** -- ogni diapositiva ha un'immagine e una durata di visualizzazione (minimo 3 secondi).

:::tip
Usa lo schermo inattivo per mostrare annunci, eventi in programma o messaggi di benvenuto quando il chiosco non è in uso.
:::

## Registrazione degli ospiti tramite codice QR

Il chiosco di check-in può mostrare un codice QR che i visitatori scansionano per registrare se stessi e la propria famiglia sul proprio telefono. Questo velocizza il check-in per gli ospiti alla prima visita.

Quando un ospite scansiona il codice QR, viene portato a una [pagina di registrazione ospiti](../../b1-church/checkin/guest-registration) dove inserisce i nomi della propria famiglia e gli altri dati che hai scelto di richiedere. Un volontario può poi cercarlo sul chiosco ed effettuare il check-in.

### Attivare la registrazione ospiti tramite QR

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **B1 CheckIn**.
3. Attiva **Registrazione ospiti tramite QR** e fai clic su **Salva**.

:::note
Questa impostazione si trova in **Mobile > B1 CheckIn** (la stessa pagina della scheda **Tema del chiosco**), non in Presenze. L'azione **Chiosco** nella pagina Presenze contiene un link a questa pagina.
:::

Una volta attivato l'interruttore, le altre opzioni qui sotto compaiono nella stessa scheda **Registrazione ospiti tramite QR**. Fai clic su **Salva** nella scheda dopo aver modificato una qualsiasi di esse.

### Scegliere i campi di iscrizione

La lista **Campi di iscrizione** controlla cosa chiede il modulo di registrazione. **Nome** e **Cognome** sono sempre presenti nel modulo e sempre obbligatori per ogni membro della famiglia. Per ogni altro campo, attiva **Includi** per aggiungerlo al modulo, poi attiva **Obbligatorio** se gli ospiti devono compilarlo. **Obbligatorio** può essere attivato solo per un campo incluso, e disattivare **Includi** lo deseleziona.

| Campo | Richiesto a | Incluso per impostazione predefinita |
|-------|-------------|--------------------------------------|
| **Email** | Solo al referente principale | Sì (facoltativo) |
| **Telefono** | Solo al referente principale | Sì (facoltativo) |
| **Indirizzo di casa** | Una volta per la famiglia -- via, indirizzo riga 2, città, stato e CAP. Quando obbligatorio, tutto tranne l'indirizzo riga 2 deve essere compilato. L'indirizzo viene salvato su ogni membro della famiglia. | No |
| **Data di nascita** | Ogni membro della famiglia | No |
| **Sesso** | Ogni membro della famiglia | No |
| **Stato civile** | Solo al referente principale | No |
| **Classe** | Ogni membro della famiglia (dalla scuola materna alla 12ª, o Diplomato) | No |
| **Commenti** | Una volta, in una casella sotto i membri della famiglia (fino a 1.000 caratteri) | No |

I campi disattivati non vengono mai salvati, anche se qualcuno li invia all'iscrizione in altro modo. I commenti vengono salvati come nota sulla scheda del referente principale (pubblicata come "Iscrizione ospite"), così puoi leggerli nella sezione **Note** del suo profilo.

### Aggiungere gli ospiti a un gruppo

Usa **Aggiungi i nuovi ospiti al gruppo** per inserire automaticamente tutti coloro che si iscrivono in uno dei tuoi gruppi -- ad esempio un gruppo "Nuovi arrivati" o un gruppo per l'evento di questo fine settimana. Scegli **Nessuno** (predefinito) per saltare questo passaggio. Gli ospiti non vedono né scelgono mai il gruppo; viene impostato solo qui. Cambialo prima di ogni evento così puoi seguire insieme gli ospiti di quell'evento.

### Registrare le presenze

Quando viene selezionato un gruppo, compare l'interruttore **Registra anche la presenza**. Attivalo per segnare gli ospiti come presenti nel momento in cui si iscrivono, così non devi effettuare il check-in separatamente.

La presenza viene registrata solo se l'iscrizione avviene durante uno degli orari **programmati** delle funzioni del gruppo selezionato:

- Il gruppo deve essere collegato a una o più funzioni, e tali orari devono avere una [pianificazione del check-in](setup.md#setting-a-check-in-schedule) (un **Giorno** e un **Orario di inizio**).
- "Durante" significa all'interno della finestra di check-in di quell'orario della funzione -- da **Apri check-in** minuti prima dell'inizio fino a **Chiudi check-in** minuti dopo la fine (o dopo l'inizio, se non è impostato un orario di fine), nello stesso fuso orario usato dalla pianificazione del check-in.
- Ogni membro della famiglia viene segnato come presente nel gruppo per ciascuno dei suoi orari di funzione aperti in quel momento, nella data odierna.
- Le iscrizioni in qualsiasi altro momento, o per un gruppo i cui orari di funzione non hanno una pianificazione, vengono aggiunte al gruppo ma non conteggiate come presenze.

### Foto di intestazione

In **Foto di intestazione**, fai clic su **Cambia foto** per scegliere o caricare un'immagine (ritagliata in formato 16:9) da mostrare in cima alla pagina di registrazione al posto dell'icona predefinita. Fai clic su **Rimuovi** per tornare all'icona.

### Condividere il link di registrazione

Una volta attivata la registrazione ospiti tramite QR, nella parte bassa della scheda compare la sezione **Condividi codice QR di registrazione**. Questo ti offre due modi per portare gli ospiti al modulo di registrazione, oltre al codice QR del chiosco:

- **Copia link** -- copia l'URL di registrazione così puoi incollarlo sul sito web della chiesa, nelle email o ovunque online.
- **Scarica PNG** -- scarica il codice QR come immagine che puoi stampare su volantini, bollettini o cartelli.

:::tip
Aggiungi il link di registrazione alla pagina "Pianifica la tua visita" o "Sono nuovo" del sito web della chiesa così gli ospiti possono registrarsi ancora prima di arrivare.
:::

### Cosa succede dopo che un ospite si iscrive

Ogni iscrizione crea un nuovo nucleo familiare che prende il cognome del referente principale, con una scheda persona per ogni membro della famiglia. Tutti vengono aggiunti a **Persone** con lo stato di membership **Visitatore**, con il referente principale come capofamiglia.

Per dare seguito automaticamente, aggiungi un [trigger di flusso di lavoro](../serving/workflows.md#triggers) come **Persona · Creata** con la condizione *Stato di membership è Visitatore*, oppure **Gruppo · Membro aggiunto** per il gruppo che hai scelto sopra.

## Cosa viene registrato

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nella pagina [Presenze](tracking-attendance.md) e nelle [sessioni di ogni gruppo](../groups/group-members.md) esattamente come le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati vengono mostrati: entrambi i metodi alimentano gli stessi report.
