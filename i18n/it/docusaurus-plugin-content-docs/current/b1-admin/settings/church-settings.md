---
title: "Impostazioni della chiesa"
description: "Imposta nome, indirizzo, sottodominio, fuso orario, formato regionale, fornitore di SMS e archiviazione dei file della tua chiesa nella pagina Impostazioni della chiesa di B1 Admin."
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni della chiesa è dove configuri le informazioni di base della tua chiesa, i recapiti e l'identità visiva. Questi dati vengono usati in tutti gli strumenti ChurchApps, incluso il tuo sito web B1.church e l'app B1.

</div>

## Video di formazione {#training-video}

<YouTube id="634zSbzDkYA" title="Configurare le informazioni della chiesa e l'identità visiva in B1" next="Ruoli, autorizzazioni e invito del team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione "Modifica impostazioni chiesa". Vedi [Ruoli e autorizzazioni](./roles-permissions.md) se non hai accesso.
- Tieni pronti l'indirizzo, i recapiti e il logo della chiesa

</div>

## Modificare le informazioni della chiesa {#editing-your-church-information}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e fai clic su **Impostazioni**.
2. Nella sezione **Informazioni sulla chiesa** (in cima alla pagina), fai clic su **Modifica**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Nome della chiesa** *(obbligatorio)* -- Il nome mostrato in tutti i prodotti ChurchApps.
   - **Sottodominio** *(obbligatorio)* -- Il tuo indirizzo web B1 gratuito. Vedi [Impostare il sottodominio](#setting-up-your-subdomain) più sotto.
   - **Indirizzo riga 1**, **Indirizzo riga 2**, **Città**, **Provincia**, **CAP** e **Paese** -- L'indirizzo fisico della chiesa.
   - **Primo giorno della settimana** -- Vedi [Primo giorno della settimana](#first-day-of-week) più sotto.
   - **Fuso orario** -- Il fuso orario della tua chiesa. Vedi [Fuso orario](#time-zone) più sotto.
4. Fai clic su **Salva** per applicare le modifiche, oppure su **Annulla** per scartarle.

Il nome della chiesa, il sottodominio e l'indirizzo compaiono anche nel pannello in alto a sinistra della pagina Impostazioni.

## Impostare il sottodominio {#setting-up-your-subdomain}

La tua chiesa riceve un sottodominio gratuito su **yourchurch.b1.church**. È l'indirizzo web con cui membri e visitatori raggiungono la presenza online della chiesa.

1. Nella pagina Impostazioni, fai clic su **Modifica** nella sezione **Informazioni sulla chiesa** e individua il campo **Sottodominio**.
2. Inserisci il sottodominio che preferisci (ad esempio, "gracechurch" per gracechurch.b1.church).
3. Salva le modifiche.

:::info
Il tuo sottodominio deve essere unico tra tutte le chiese ChurchApps. Se il nome che preferisci è già preso, prova ad aggiungere la tua città o la provincia (ad esempio, "gracechurch-dallas").
:::

Se vuoi che i visitatori raggiungano il tuo sito con un dominio tuo (ad esempio, **`www.gracechurch.org`**), vedi [Dominio personalizzato](./custom-domain.md).

## Configurare l'identità visiva {#configuring-branding}

Il logo e i colori non si impostano nella pagina Impostazioni. Carica il logo della chiesa e scegli i colori in **Sito web > Aspetto** -- vedi [Logo e identità visiva](../website/appearance.md#logo-and-branding). I colori usati dall'app B1, dal portale membri e dal chiosco di check-in si impostano in **Mobile > Tema dell'app** -- vedi [Tema dell'app](./mobile-app.md#app-theme).

## Generali (contatto di assistenza) {#general-support-contact}

La sezione **Generali** contiene il tuo **Contatto di assistenza**: l'indirizzo email o il collegamento al modulo di contatto che le persone usano per raggiungere la chiesa. Fai clic su **Modifica** nella sezione **Generali**, inseriscilo nel campo **Collegamento** e fai clic su **Salva**. Finché non ne imposti uno, la sezione mostra **Non impostato**.

## Primo giorno della settimana {#first-day-of-week}

Scegli da quale giorno iniziano i tuoi calendari. Il menu a discesa **Primo giorno della settimana** nella sezione Informazioni sulla chiesa è impostato di default su **Domenica**, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene rispettato in tutte le griglie dei calendari di B1 Admin e del portale membri di B1.church -- calendari dei gruppi, calendari curati ed editor degli eventi disporranno le settimane a partire dal giorno che scegli.

## Fuso orario {#time-zone}

Il menu a discesa **Fuso orario**, nella sezione **Informazioni sulla chiesa**, imposta il fuso orario della tua chiesa (ad esempio, *America/Chicago*). Scegli **Nessuno** per lasciarlo vuoto. Una volta salvato, il fuso orario compare nel riepilogo delle Informazioni sulla chiesa.

B1 usa questo fuso orario per gli orari validi per tutta la chiesa, come i promemoria degli eventi e i calendari sulle tue TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). I [calendari di check-in](../attendance/setup.md#setting-a-check-in-schedule) sono misurati nel fuso orario del [campus](./campuses.md) del servizio, e usano il fuso orario della chiesa solo quando il campus non ne ha uno. Se i tuoi campus si trovano tutti nello stesso fuso orario, impostalo sia sulla chiesa sia su ciascun campus.

## Regione (formato di data e telefono) {#region-date-and-phone-format}

L'impostazione **Regione** controlla come vengono scritte date e orari in tutto B1. Per impostazione predefinita le date usano il formato statunitense (ad esempio, "Sep 28, 2026" e "9/28/2026"). Le chiese al di fuori degli Stati Uniti possono passare al proprio formato -- ad esempio, scegliendo Inglese (Regno Unito) vengono mostrate invece "28 Sept 2026" e "28/09/2026".

1. Nella pagina Impostazioni, fai clic su **Regione** nell'elenco a sinistra, poi su **Modifica** nella sezione **Regione**.
2. Scegli la tua regione dal menu a discesa **Regione**. Ogni opzione mostra una data di esempio, così puoi vedere esattamente come appariranno le date.
3. Fai clic su **Salva**.

La sezione Regione mostra poi la regione selezionata, un esempio del **Formato data** e il formato dei tuoi **Numeri di telefono**.

### Formato dei numeri di telefono {#phone-number-format}

La stessa sezione Regione contiene l'impostazione **Numeri di telefono**, che controlla come vengono inseriti i numeri di telefono nella scheda di una persona:

- **Internazionale (con prefisso paese)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso (ad esempio, +1 918 555 1234).
- **Locale (come digitato)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere il prefisso (ad esempio, 0701 234 5678). Scegli questa opzione se la tua chiesa scrive i numeri in formato locale e non vuoi che B1 aggiunga un prefisso.

Quando è selezionato **Locale**, la sezione Regione mostra anche "Numeri di telefono locali" accanto alla tua regione.

:::tip
Gli SMS funzionano meglio quando i numeri includono il prefisso del paese. Se invii SMS da B1, mantieni il formato **Internazionale**, oppure assicurati che i numeri digitati in modalità Locale includano il prefisso del paese.
:::

La tua regione si applica alle date e agli orari in tutto B1 Admin, nel tuo sito web B1.church e nel portale membri, incluse prediche, articoli del blog, calendari dei gruppi e piani di servizio, così i membri vedono le date nello stesso formato del personale.

## Messaggi di testo {#texting}

Collega un fornitore di SMS per inviare messaggi a una persona o a un intero gruppo da B1 Admin. I messaggi vengono inviati tramite il tuo account presso il fornitore, quindi si applicano le sue tariffe e i suoi limiti.

1. Nella pagina Impostazioni, fai clic su **Messaggi di testo** nell'elenco a sinistra, poi su **Modifica** nella sezione **Messaggi di testo**.
2. Scegli un **Fornitore**:
   - **Clearstream** -- inserisci una **Chiave API**. Creala nelle impostazioni del tuo account Clearstream, nella sezione Chiavi API.
   - **Text In Church** -- inserisci una **Chiave API**. Chiedi prima al supporto di Text In Church l'accesso API per sviluppatori, poi crea una chiave in Impostazioni account > sezione API per sviluppatori.
   - **Nalo Solutions** (Ghana) -- inserisci la chiave di autenticazione del tuo account Nalo Solutions come **Chiave API**, e un **ID mittente** (fino a 11 caratteri) approvato da Nalo per te.
   - **Twilio** -- usa l'account Twilio della tua chiesa; Twilio ti addebita direttamente i costi. Copia l'**Account SID** e l'**Auth Token** dalla [Console Twilio](https://console.twilio.com), e inserisci un **Numero mittente** -- un numero di telefono Twilio registrato per A2P 10DLC, in un formato come `+15551234567`. Dopo il salvataggio, incolla l'URL del webhook in arrivo (vedi sotto) nel webhook **Arriva un messaggio** del numero in Twilio, così anche le risposte STOP vengono registrate in B1.
3. Fai clic su **Salva**.

Per interrompere gli SMS, imposta **Fornitore** su **Nessuno** e salva. Questo rimuove il fornitore salvato.

### Disiscrivere le persone che rispondono STOP {#opting-out-people-who-reply-stop}

Una volta salvato un fornitore, riapri la sezione Messaggi di testo con **Modifica**. Sotto le impostazioni del fornitore, un campo di sola lettura **URL del webhook per i messaggi in arrivo (STOP)** mostra un indirizzo web unico per la tua chiesa. Fai clic sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione del webhook per i messaggi in arrivo (risposte) del tuo fornitore di SMS. Funziona con tutti i fornitori sopra elencati che possono inoltrare le risposte in arrivo a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (oppure STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi messaggi, B1 trova tutte le persone il cui numero di cellulare corrisponde, le contrassegna come disiscritte e disattiva i loro promemoria via SMS. Vengono poi saltate dagli SMS di gruppo. Le altre risposte vengono ignorate.

:::info
Questo usa la stessa impostazione di disiscrizione di **Nascondimi dall'elenco membri**, quindi chi risponde STOP compare anche come **Nascosto dall'elenco** nel proprio profilo. Il campo compare solo quando il fornitore salvato è selezionato -- se cambi il menu a discesa su un altro fornitore, salva prima per rivedere di nuovo l'URL.
:::

Quando un fornitore è collegato, il personale autorizzato a inviare SMS vede un pulsante **Messaggio** nella pagina di un gruppo (**Invia SMS a questo gruppo**) e di una persona con un cellulare (**Invia messaggio di testo**). Scrivi il messaggio e fai clic su **Invia**. La finestra conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima dell'invio:

- I membri senza un cellulare registrato vengono saltati.
- I membri che hanno scelto **Nascondimi dall'elenco membri** sono considerati disiscritti e vengono saltati.
- I familiari che condividono lo stesso numero di cellulare ricevono il messaggio una sola volta.

### Personalizzare i messaggi con i campi unione {#personalizing-texts-with-merge-fields}

Sotto la casella del messaggio, la finestra SMS mostra delle etichette segnaposto: **Nome**, **Cognome**, **Nome visualizzato** e **Nome della chiesa**. Fai clic su un'etichetta per inserire il suo segnaposto (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` oppure `{{churchName}}`) nel punto del cursore. Quando il messaggio viene inviato, ogni segnaposto viene sostituito con i dati del destinatario, quindi un messaggio di gruppo come `Hi {{firstName}}, see you Sunday!` arriva a ogni membro con il suo nome. I segnaposto funzionano sia per i messaggi di gruppo sia per quelli a una singola persona. Per i messaggi di gruppo è disponibile anche l'etichetta **Nome gruppo** (`{{groupName}}`), che viene sostituita con il nome del gruppo.

Per riutilizzare un messaggio, salvalo come [modello di testo](./email-templates.md#text-templates) (un modello di email con la categoria **Testo**) e selezionalo da **Carica modello (facoltativo)** in cima alla finestra SMS.

:::info
Il limite di 1.600 caratteri si applica al messaggio così come lo digiti. Dopo che i segnaposto sono stati compilati, qualsiasi testo oltre i 1.600 caratteri viene troncato a quella lunghezza.
:::

I messaggi possono essere inviati anche automaticamente da un passaggio di un [flusso di lavoro](../serving/workflows.md#sending-a-text) con l'azione **Invia SMS**, che usa lo stesso fornitore e gli stessi segnaposto.

## Archiviazione file {#file-storage}

Per impostazione predefinita, i file che carichi nel tuo sito web (tramite [File](../website/files.md)) e in altre aree di contenuto usano l'archiviazione gratuita ospitata da B1, fino a 100 MB. Se ti serve più spazio, puoi collegare invece il tuo servizio cloud -- i nuovi caricamenti vanno allora direttamente nel tuo account, senza limiti della piattaforma.

1. Nella pagina Impostazioni, fai clic su **Archiviazione file** nell'elenco a sinistra, poi su **Modifica** nella sezione **Archiviazione file**.
2. Scegli un **Fornitore**: **Google Drive**, **Dropbox** oppure **Bucket compatibile S3 (S3, R2, B2)** (AWS S3, Cloudflare R2, Backblaze B2, ecc.). **ChurchApps (gratuito)** è l'archiviazione integrata.
3. Per Google Drive o Dropbox, fai clic su **Collega account** e accedi per autorizzare l'accesso. Dopo un collegamento riuscito compare il distintivo **Account collegato**; devi collegare un account prima di poter salvare. Per un bucket compatibile S3, inserisci **ID chiave di accesso**, **Chiave di accesso segreta**, **Bucket**, **Endpoint** (lascialo vuoto per AWS), **Regione** e **Base URL pubblico**. **Bucket** e **Base URL pubblico** sono obbligatori, e il bucket deve consentire letture pubbliche e caricamenti CORS da B1.
4. Fai clic su **Salva**.

Per tornare all'archiviazione gratuita, scegli **ChurchApps (gratuito)** e salva. I file già caricati restano dove sono.

:::info
Questo riguarda solo i nuovi caricamenti nei File del sito web e in aree di contenuto simili. Le immagini delle gallerie, le miniature, i loghi e le foto delle persone restano sempre sull'archiviazione predefinita di B1.
:::

## Donazioni {#giving}

La sezione **Donazioni** collega il tuo fornitore di pagamenti e imposta la valuta della tua chiesa per le donazioni online e le iscrizioni a pagamento. Vedi [Configurazione delle donazioni online](../donations/online-giving-setup.md). Compare solo per le persone che possono modificare le impostazioni delle donazioni.

## Check-in {#check-in}

La sezione **Check-in** imposta l'**Applicazione del rapporto volontari** -- se il check-in si limita ad avvisare (**Avvisa (consenti con conferma)**) oppure blocca il check-in (**Blocca (impedisci il check-in)**) quando in una sala mancano volontari. Vedi [Rapporti dei volontari](../attendance/checkin-safety.md#volunteer-ratios). Il collegamento **Chiosco di check-in, QR ed etichette** sotto di essa apre le impostazioni del chiosco nella pagina Mobile.

## Passaggio di classe {#grade-promotion}

Se registri la **Classe** di bambini e ragazzi, B1 può far salire automaticamente di una classe tutti in una data che scegli (ad esempio, il 1° agosto), senza che tu debba modificare ogni profilo a mano.

1. Nella pagina Impostazioni, fai clic su **Passaggio di classe** nell'elenco a sinistra, poi su **Modifica** nella sezione **Passaggio di classe**.
2. Attiva l'interruttore (mostra **Attivo**) e scegli il **Mese** e il **Giorno** in cui far salire le classi ogni anno. In quella data, tutti quelli con una classe passano alla classe successiva, e i ragazzi dell'ultimo anno diventano **Diplomati**.
3. Salva le modifiche.

Per interrompere il passaggio automatico, disattiva l'interruttore (così mostra **Disattivo**) e salva. La data di passaggio viene rimossa e le classi non cambieranno più da sole.

## Iscrizione dei volontari {#volunteer-signup}

Per impostazione predefinita, i membri che sfogliano le [iscrizioni dei volontari](../../b1-church/serving/volunteer-signup.md) vedono ogni settimana futura con posizioni libere. Se l'elenco diventa lungo, puoi mostrare solo la settimana successiva per ogni tipo di piano.

1. Nella pagina Impostazioni, fai clic su **Iscrizione dei volontari** nell'elenco a sinistra, poi su **Modifica** nella sezione **Iscrizione dei volontari**.
2. Attiva **Mostra solo la settimana successiva di ogni tipo di piano**.
3. Salva le modifiche.

Con questa opzione attiva, ogni tipo di piano mostra solo il suo prossimo piano futuro. La settimana successiva compare quando quella data è passata. La riga **Settimane mostrate** della sezione riporta **Solo la settimana successiva di ogni tipo di piano** oppure **Tutte le settimane future**.

## Privacy delle donazioni {#giving-privacy}

Le persone con accesso alle donazioni normalmente vedono i totali delle donazioni di una persona nella sua [scheda persona](../people/adding-people.md#editing-details). Se preferisci non avere gli importi sempre sullo schermo ogni volta che si apre una scheda, puoi nasconderli finché qualcuno non li richiede.

1. Nella pagina Impostazioni, fai clic su **Privacy delle donazioni** nell'elenco a sinistra, poi su **Modifica** nella sezione **Privacy delle donazioni**.
2. Attiva **Nascondi le donazioni nelle schede persona fino al clic**.
3. Salva le modifiche.

Con questa opzione attiva, la scheda delle donazioni nella scheda persona dice "Le donazioni sono nascoste nelle schede persona." Fai clic su **Mostra donazioni** per caricare e visualizzare le donazioni di quella persona. Si nasconde di nuovo quando apri un'altra persona. Non cambia chi può vedere le donazioni: solo le persone con accesso alle donazioni vedono la scheda.

## Importa ed esporta {#import-and-export}

Il collegamento **Importa/Esporta** sotto il nome della chiesa nella pagina Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per scopi di backup o migrazione.

È particolarmente utile quando stai configurando la chiesa per la prima volta e devi trasferire le schede esistenti in ChurchApps.

:::warning
Quando importi dei dati, esegui sempre prima il backup delle schede esistenti. Le operazioni di importazione aggiungono dati al sistema e possono creare voci duplicate se eseguite più volte.
:::
