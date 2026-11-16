---
title: "Configurazione del check-in self-service con B1 Checkin e B1 Admin"
sidebar_label: "Check-In"
description: "Configura il check-in self-service per i culti con l'app B1 Checkin in B1 Admin, con dispositivi, account kiosk, programmi, personalizzazione e registrazione ospiti tramite QR."
---

# Check-In {#check-in}

<div class="article-intro">

B1 Admin supporta il check-in self-service ai culti tramite l'app complementare **B1 Checkin**. I membri possono registrare se stessi e le proprie famiglie presso i kiosk o i dispositivi dedicati al loro arrivo, rendendo il processo rapido e riducendo il carico di lavoro dei volontari. Ogni check-in viene registrato automaticamente come presenza.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- I tuoi campus, gli orari dei culti e i gruppi devono essere configurati in [Configurazione Presenze](setup.md).
- Ti servono [persone nel tuo database](../people/adding-people.md) con [famiglie](../people/adding-people.md#managing-households) configurate, così le famiglie possono registrarsi insieme.
- Ti servirà un tablet e, facoltativamente, una stampante per etichette Brother (vedi [consigli sull'hardware](#recommended-hardware) più sotto).

</div>

## Come funziona {#how-it-works}

L'app B1 Checkin si collega alla configurazione delle presenze di B1 Admin. Quando un membro si registra, la sua presenza viene registrata automaticamente sul campus, sull'orario del culto e sul gruppo corretti. Non è necessario inserire manualmente le presenze per chi utilizza il sistema di check-in.

## Configurare il check-in {#setting-up-check-in}

1. **Configura prima la struttura delle presenze.** In B1 Admin, vai su **Persone > Presenze** e fai clic su **Configurazione** per assicurarti che campus, orari dei culti e gruppi siano impostati. L'app di check-in si basa su questa configurazione. Facoltativamente, assegna a ogni orario di culto un [programma di check-in](setup.md#setting-a-check-in-schedule), così il check-in si apre e si chiude automaticamente ogni settimana. I programmi usano il fuso orario del campus del culto, oppure il fuso orario della tua chiesa se il campus non ne ha uno impostato; il kiosk elenca come **Chiuso** gli orari dei culti la cui finestra è chiusa e indica alle famiglie quando il check-in apre. Consulta [Configurazione Presenze](setup.md) per i dettagli.
2. **Installa l'app B1 Checkin** sui dispositivi che intendi usare. L'app è disponibile sulle seguenti piattaforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablet Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablet Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Accedi all'app B1 Checkin** usando un account che abbia il permesso di presenze **Checkin** (o **Modifica presenze**). Consulta [Account kiosk per il check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Seleziona il campus e l'orario del culto** per il raduno in corso.
5. I membri possono ora cercare il proprio nome sul dispositivo e registrarsi.

:::tip
Posiziona i dispositivi di check-in in punti visibili e facilmente raggiungibili, come gli ingressi della hall o le postazioni di accoglienza. Un breve annuncio durante i culti aiuta i membri a sapere che questa opzione è disponibile.
:::

:::tip
Se la tua chiesa ha più campus, dovrai ripetere la configurazione per ciascun campus in [Configurazione Presenze](setup.md). Ogni dispositivo di check-in può essere configurato per un campus diverso.
:::

## Hardware consigliato {#recommended-hardware}

**Tablet** — uno qualsiasi di questi funziona bene con l'app:

- **Compatto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Schermo grande:** Samsung Galaxy Tab A8 10.5"
- **Economico:** Amazon Fire HD 10

**Stampanti** — il check-in funziona con le stampanti per etichette Brother per stampare i cartellini con il nome:

- **Migliore:** Brother QL-1110NWB (supporta più tablet via Bluetooth e WiFi)
- **Buona:** Brother QL-810W (supporta più tablet via WiFi)
- **Economica:** Brother QL-1100 (solo WiFi)

**Etichette:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Solo le stampanti per etichette Brother sono compatibili con l'app B1 Checkin. Altre marche di stampanti non funzioneranno per stampare i cartellini con il nome.
:::

:::info
Segui le istruzioni di configurazione della stampante per collegarla alla stessa rete WiFi del tablet. Puoi trovare i driver e le guide di configurazione delle stampanti Brother sul [sito di supporto Brother](https://support.brother.com).
:::

## Personalizzare l'aspetto del kiosk {#customizing-the-kiosk-appearance}

Puoi personalizzare l'aspetto dell'app B1 Checkin per adattarlo all'identità visiva della tua chiesa. In B1 Admin, vai su **Mobile > B1 CheckIn** (oppure fai clic su **Kiosk** nella pagina Presenze) e usa la scheda **Tema kiosk**. Fai clic su **Salva** nella scheda dopo aver apportato modifiche.

### Colori {#colors}

Il kiosk usa gli stessi colori dell'app della tua chiesa. Impostali in **Mobile > Tema app**; la scheda Tema kiosk non ha impostazioni colore proprie.

### Immagine di sfondo {#background-image}

In **Immagine di sfondo**, fai clic su **Carica immagine** per aggiungere uno sfondo facoltativo per le schermate di benvenuto e di ricerca del kiosk. La dimensione consigliata è 1920x1080 pixel. Usa **Cambia immagine** o **Rimuovi** per sostituirla o eliminarla.

### Schermo di inattività / Salvaschermo {#idle-screen--screensaver}

Configura un salvaschermo che si attiva dopo un periodo di inattività:

1. Apri **Schermo di inattività / Salvaschermo** e attiva **Abilita schermo di inattività**.
2. Imposta **Timeout (secondi)** -- quanti secondi di inattività devono passare prima che parta il salvaschermo (minimo 10).
3. Fai clic su **Aggiungi diapositiva** per ogni diapositiva, fai clic su **Carica** per scegliere la sua immagine e imposta la **Durata (s)** (minimo 3 secondi).

:::tip
Usa lo schermo di inattività per mostrare annunci, eventi in programma o messaggi di benvenuto quando il kiosk non è in uso.
:::

## Registrazione ospiti tramite codice QR {#guest-registration-via-qr-code}

Il kiosk di check-in può mostrare un codice QR che i visitatori scansionano per registrare se stessi e la propria famiglia con il proprio telefono. Questo accelera il check-in per gli ospiti alla prima visita.

Quando un ospite scansiona il codice QR, viene indirizzato a una [pagina di registrazione ospiti](../../b1-church/checkin/guest-registration.md) dove inserisce i nomi della propria famiglia e gli altri dati che scegli di richiedere. Un volontario può poi cercarlo sul kiosk e registrarlo.

### Attivare la registrazione ospiti tramite QR {#enabling-qr-guest-registration}

Per attivare la visualizzazione del codice QR:

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **B1 CheckIn**.
3. Attiva **Registrazione ospiti QR** e fai clic su **Salva**.

:::note
Questa impostazione si trova in **Mobile > B1 CheckIn** (la stessa pagina della scheda **Tema kiosk**), non in Presenze. L'azione **Kiosk** nella pagina Presenze contiene un collegamento a questa pagina.
:::

Una volta attivato l'interruttore, le altre opzioni qui sotto compaiono nella stessa scheda **Registrazione ospiti QR**. Fai clic su **Salva** nella scheda dopo aver modificato una qualsiasi di esse.

### Scegliere i campi di iscrizione {#choosing-sign-up-fields}

L'elenco **Campi di iscrizione** controlla ciò che chiede il modulo di registrazione. **Nome** e **Cognome** sono sempre presenti nel modulo e sempre obbligatori per ogni membro della famiglia. Per ogni altro campo, attiva **Includi** per aggiungerlo al modulo, poi attiva **Obbligatorio** se gli ospiti devono compilarlo. **Obbligatorio** può essere attivato solo per un campo incluso, e disattivare **Includi** lo cancella.

| Campo | Richiesto a | Incluso per impostazione predefinita |
|-------|-----------|---------------------|
| **Titolo** | Ogni membro della famiglia, come menu a tendina davanti al nome (Sig., Sig.ra, Sig.na, Ms, Dott., Prof., Rev., Pastore) | No |
| **Email** | Ogni membro della famiglia. Se obbligatorio, solo il contatto principale deve compilarla. | Sì (facoltativo) |
| **Telefono** | Ogni membro della famiglia. Se obbligatorio, solo il contatto principale deve compilarlo. | Sì (facoltativo) |
| **Ruolo nel nucleo familiare** | Ogni membro della famiglia dopo il contatto principale -- Coniuge, Figlio o Altro. Il contatto principale è il capofamiglia di un nuovo nucleo. Chi non ha un ruolo viene salvato come Altro. | Sì (facoltativo) |
| **Indirizzo di casa** | Una volta per la famiglia -- via, indirizzo riga 2, città, provincia e CAP. Se obbligatorio, tutto tranne la riga 2 dell'indirizzo deve essere compilato. L'indirizzo viene salvato per ogni membro della famiglia. | No |
| **Data di nascita** | Ogni membro della famiglia | No |
| **Genere** | Ogni membro della famiglia | No |
| **Stato civile** | Solo il contatto principale | No |
| **Classe** | Ogni membro della famiglia (dalla scuola materna alla 12ª, o Diplomato) | No |
| **Commenti** | Una volta, in una casella sotto i membri della famiglia (fino a 1.000 caratteri) | No |
| **Foto** | Ogni membro della famiglia, con un pulsante **Aggiungi foto** che apre uno strumento di ritaglio. La foto diventa la foto profilo della nuova persona. Se obbligatoria, solo il contatto principale deve aggiungerne una. | No |

I campi disattivati non vengono mai salvati, anche se qualcuno li invia all'iscrizione in altro modo. I commenti vengono salvati come nota nella scheda del contatto principale (pubblicata come "Iscrizione ospite"), così puoi leggerli nella sezione **Note** del suo profilo.

### Aggiungere gli ospiti a un gruppo {#adding-guests-to-a-group}

Usa **Aggiungi i nuovi ospiti al gruppo** per inserire automaticamente tutti coloro che si iscrivono in uno dei tuoi gruppi -- ad esempio un gruppo "Nuovi arrivati" o un gruppo per l'evento di questo fine settimana. Scegli **Nessuno** (predefinito) per saltare questa opzione. Gli ospiti non vedono né scelgono mai il gruppo; viene impostato solo qui. Cambialo prima di ogni evento così puoi seguire insieme gli ospiti di quell'evento.

### Registrare le presenze {#recording-attendance}

Quando è selezionato un gruppo, compare l'interruttore **Registra anche le presenze**. Attivalo per segnare gli ospiti come presenti nel momento stesso in cui si iscrivono, così non devi registrarli separatamente.

Le presenze vengono registrate solo se l'iscrizione avviene durante uno degli orari **programmati** dei culti del gruppo selezionato:

- Il gruppo deve essere collegato a uno o più orari di culto, e tali orari devono avere un [programma di check-in](setup.md#setting-a-check-in-schedule) (un **Giorno** e un **Orario di inizio**).
- "Durante" significa all'interno della finestra di check-in di quell'orario del culto -- dai minuti **Apri check-in** prima dell'inizio fino ai minuti **Chiudi check-in** dopo la fine (o dopo l'inizio, se non è impostato un orario di fine; senza orario di fine né minuti di chiusura, fino alla fine di quel giorno), nello stesso fuso orario usato dal programma di check-in.
- Ogni membro della famiglia viene segnato come presente nel gruppo per ciascuno dei suoi orari di culto aperti in quel momento, nella data odierna.
- Le iscrizioni in qualsiasi altro momento, o per un gruppo i cui orari di culto non hanno un programma, vengono aggiunte al gruppo ma non vengono conteggiate come presenze.

### Foto di intestazione {#header-photo}

In **Foto di intestazione**, fai clic su **Cambia foto** per scegliere o caricare un'immagine (ritagliata a formato 16:9) da mostrare in alto nella pagina di registrazione al posto dell'icona predefinita. Fai clic su **Rimuovi** per tornare all'icona.

### Condividere il link di registrazione {#sharing-the-registration-link}

Una volta attivata la Registrazione ospiti QR, in fondo alla scheda compare la sezione **Condividi codice QR di registrazione**. Questo ti offre due modi per portare gli ospiti al modulo di registrazione oltre al codice QR del kiosk:

- **Copia link** — copia l'URL di registrazione così puoi incollarlo sul sito web della chiesa, nelle email o ovunque online.
- **Scarica PNG** — scarica il codice QR come immagine che puoi stampare su volantini, bollettini o cartelli.

:::tip
Aggiungi il link di registrazione alla pagina "Pianifica la tua visita" o "Sono nuovo" del sito web della chiesa, così gli ospiti possono registrarsi ancora prima di arrivare.
:::

### Cosa succede dopo che un ospite si iscrive {#what-happens-after-a-guest-signs-up}

B1 cerca innanzitutto le persone già presenti in **Persone**. Un membro della famiglia viene abbinato a una persona esistente quando esattamente una persona ha lo stesso nome e la stessa email o lo stesso numero di telefono. Un bambino inserito senza email o telefono viene abbinato per nome all'interno del nucleo familiare abbinato. Le persone abbinate vengono riutilizzate così come sono -- l'iscrizione non modifica mai i loro dati né lo stato di membership -- e chiunque sia nuovo entra nel nucleo familiare abbinato.

Quando nessuno corrisponde, l'iscrizione crea un nuovo nucleo familiare con il cognome del contatto principale e una scheda persona per ogni membro della famiglia. Tutti i nuovi vengono aggiunti a **Persone** con lo stato di membership **Visitatore**, con il contatto principale come capofamiglia.

Le persone abbinate e quelle nuove vengono aggiunte al gruppo che hai scelto (se non ne fanno già parte) e, se attivato, vedono registrata la loro presenza. I commenti vengono salvati come nota sul contatto principale.

Per dare seguito automaticamente, aggiungi un [trigger del flusso di lavoro](../serving/workflows.md#triggers) come **Persona · Creata** con la condizione *Stato di membership è Visitatore*, oppure **Gruppo · Membro aggiunto** per il gruppo che hai scelto sopra.

## Cosa viene registrato {#what-gets-recorded}

Ogni check-in crea un record di presenza in B1 Admin. Puoi visualizzare questi record nella pagina [Presenze](tracking-attendance.md) e nelle [sessioni](../groups/group-members.md) di ciascun gruppo, esattamente come le presenze inserite manualmente. Non c'è alcuna differenza nel modo in cui i dati appaiono: entrambi i metodi alimentano gli stessi report.
