---
title: "Impostazioni della chiesa"
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni della chiesa è dove configuri le informazioni di base della tua chiesa, i dati di contatto e il branding. Questi dati vengono usati in tutti gli strumenti ChurchApps, incluso il tuo sito B1.church e l'app B1 Mobile.

</div>

## Video tutorial

<YouTube id="634zSbzDkYA" title="Configurare le informazioni e il branding della chiesa in B1" next="Ruoli, permessi e invito del team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso "Modifica impostazioni della chiesa". Vedi [Ruoli e permessi](./roles-permissions.md) se non hai accesso.
- Tieni pronti l'indirizzo, i recapiti e il logo della tua chiesa

</div>

## Modificare le informazioni della chiesa

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e clicca su **Impostazioni**.
2. Nella sezione **Informazioni chiesa** (in cima alla pagina), clicca su **Modifica**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Nome della chiesa** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Indirizzo** -- L'indirizzo fisico della tua chiesa.
   - **Informazioni di contatto** -- Numero di telefono, email e altri recapiti.
   - **Fuso orario** -- Il fuso orario della tua chiesa. Vedi [Fuso orario](#time-zone) più sotto.
4. Clicca su **Salva** per applicare le modifiche.

## Configurare il sottodominio

La tua chiesa riceve un sottodominio gratuito su **tuachiesa.1.church**. Questo è l'indirizzo web con cui membri e visitatori possono accedere alla presenza online della chiesa.

1. Nella pagina Impostazioni, clicca su **Modifica** nella sezione **Informazioni chiesa** e individua il campo **Sottodominio**.
2. Inserisci il sottodominio che preferisci (ad esempio "gracechurch" per gracechurch.1.church).
3. Salva le modifiche.

:::info
Il sottodominio deve essere unico tra tutte le chiese ChurchApps. Se il nome che preferisci è già in uso, prova ad aggiungere la tua città o il tuo stato (ad esempio "gracechurch-dallas").
:::

Se vuoi che i visitatori raggiungano il tuo sito con un dominio tuo (ad esempio **`www.gracechurch.org`**), vedi [Dominio personalizzato](./custom-domain.md).

## Configurare il branding

Personalizza il modo in cui la tua chiesa appare in tutti gli strumenti ChurchApps:

1. Carica il **logo della chiesa** cliccando sull'area del logo e selezionando un file immagine.
2. Aggiungi eventuali **immagini della chiesa** aggiuntive da usare sul tuo sito web e nell'[app mobile](./mobile-app.md).

:::tip
Per risultati migliori, usa un logo con sfondo trasparente in formato PNG. In questo modo appare bene sia su sfondi chiari sia su sfondi scuri.
:::

## Primo giorno della settimana

Scegli da quale giorno iniziano i tuoi calendari. Il menu a tendina **Primo giorno della settimana** nella sezione Informazioni chiesa è impostato di default su **domenica**, ma può essere cambiato con qualsiasi altro giorno. Una volta modificato, l'impostazione viene applicata alle griglie dei calendari in B1 Admin e nel portale membri di B1.church: i calendari dei gruppi, i calendari curati e l'editor degli eventi visualizzano tutti le settimane a partire dal giorno che scegli.

## Fuso orario

Il menu a tendina **Fuso orario** nella sezione **Informazioni chiesa** imposta il fuso orario della tua chiesa (ad esempio *America/Chicago*). Scegli **Nessuno** per lasciarlo vuoto. Una volta salvato, il fuso orario compare nel riepilogo delle Informazioni chiesa.

B1 usa questo fuso orario per gli orari validi per tutta la chiesa, come i promemoria degli eventi e i programmi sui tuoi TV [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Gli orari di [check-in](../attendance/setup.md#setting-a-check-in-schedule) sono calcolati prima di tutto sul fuso orario della [sede](./campuses.md) del servizio, e usano il fuso orario della chiesa solo quando la sede non ne ha uno. Se tutte le tue sedi si trovano nello stesso fuso orario, impostalo sia sulla chiesa sia su ciascuna sede.

## Regione (formato di date e numeri di telefono)

L'impostazione **Regione** controlla il modo in cui date e orari vengono scritti in tutto B1. Per impostazione predefinita le date usano il formato statunitense (ad esempio "28 set 2026" e "9/28/2026"). Le chiese al di fuori degli USA possono passare al proprio formato: ad esempio, scegliendo Inglese (Regno Unito) le date appaiono come "28 Sept 2026" e "28/09/2026".

1. Nella pagina Impostazioni, clicca su **Regione** nell'elenco a sinistra, quindi clicca su **Modifica** nella sezione **Regione**.
2. Scegli la tua regione dal menu a tendina **Regione**. Ogni opzione mostra una data di esempio, così puoi vedere esattamente come appariranno le date.
3. Clicca su **Salva**.

La sezione Regione mostra quindi la regione selezionata, un esempio del **Formato data** e il formato dei tuoi **Numeri di telefono**.

### Formato dei numeri di telefono

La stessa sezione Regione contiene l'impostazione **Numeri di telefono**, che controlla come vengono inseriti i numeri di telefono nell'anagrafica di una persona:

- **Internazionale (con prefisso paese)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso internazionale (ad esempio +1 918 555 1234).
- **Locale (come digitato)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere il prefisso (ad esempio 0701 234 5678). Scegli questa opzione se la tua chiesa scrive i numeri in formato locale e non vuole che B1 aggiunga il prefisso.

Quando è selezionato **Locale**, la sezione Regione mostra anche "Numeri di telefono locali" accanto alla regione.

:::tip
L'invio di SMS funziona meglio quando i numeri includono il prefisso internazionale. Se invii SMS da B1, mantieni il formato **Internazionale**, oppure assicurati che i numeri digitati in modalità Locale includano il prefisso.
:::

La regione si applica a date e orari in tutto B1 Admin e sul sito B1.church e nel portale membri, inclusi predicazioni, articoli del blog, calendari dei gruppi e piani di servizio, così i membri vedono le date nello stesso formato del personale.

## Messaggi di testo (SMS)

Collega un fornitore di SMS per inviare messaggi a una persona o a un intero gruppo da B1 Admin. Gli SMS vengono inviati tramite il tuo account presso il fornitore, quindi si applicano i suoi prezzi e limiti.

1. Nella pagina Impostazioni, clicca su **Messaggi di testo** nell'elenco a sinistra, quindi clicca su **Modifica** nella sezione **Messaggi di testo**.
2. Scegli un **Fornitore**:
   - **Clearstream** -- inserisci una **Chiave API**. Creala nelle Impostazioni account di Clearstream, sotto Chiavi API.
   - **Text In Church** -- inserisci una **Chiave API**. Chiedi prima l'accesso all'API per sviluppatori al supporto di Text In Church, poi crea una chiave nella sezione Account > API per sviluppatori.
   - **Nalo Solutions** (Ghana) -- inserisci la chiave di autenticazione del tuo account Nalo Solutions come **Chiave API**, e un **ID mittente** (fino a 11 caratteri) approvato da Nalo per te.
   - **Twilio** -- usa il tuo account Twilio; Twilio ti addebita direttamente i costi. Copia l'**Account SID** e l'**Auth Token** dalla [Console Twilio](https://console.twilio.com) e inserisci un **Numero di invio** -- un numero di telefono Twilio registrato per A2P 10DLC, in un formato come `+15551234567`. Dopo aver salvato, incolla l'URL webhook dei messaggi in arrivo (vedi sotto) nel webhook **A message comes in** del numero in Twilio, così anche le risposte STOP vengono registrate in B1.
3. Clicca su **Salva**.

Per interrompere l'invio di SMS, imposta **Fornitore** su **Nessuno** e salva. Questo rimuove il fornitore salvato.

### Escludere le persone che rispondono STOP

Una volta salvato un fornitore, riapri la sezione Messaggi di testo con **Modifica**. Sotto le impostazioni del fornitore compare il campo di sola lettura **URL webhook per STOP in arrivo**, con un indirizzo web unico per la tua chiesa. Clicca sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione webhook dei messaggi in arrivo (risposte) del tuo fornitore. Funziona con tutti i fornitori elencati sopra che possono inoltrare le risposte in arrivo a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (oppure STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi messaggi, B1 trova tutte le persone con quel numero di cellulare, le contrassegna come escluse e disattiva i loro promemoria via SMS. Vengono poi saltate negli invii di messaggi di gruppo. Le altre risposte vengono ignorate.

:::info
Questa funzione usa la stessa impostazione di esclusione di **Nascondi me dalla rubrica dei membri**, quindi chi risponde STOP compare anche come **Nascosto dalla rubrica** nel proprio profilo. Il campo compare solo quando è selezionato il fornitore salvato -- se cambi il menu a tendina su un altro fornitore, salva prima per rivedere l'URL.
:::

Una volta collegato un fornitore, il personale autorizzato a inviare messaggi vede un pulsante **Invia messaggio** nella pagina di un gruppo (**Invia messaggio a questo gruppo**) e di una persona con un cellulare (**Invia messaggio di testo**). Scrivi il messaggio e clicca su **Invia**. La finestra conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima dell'invio:

- I membri senza un cellulare registrato vengono saltati.
- I membri che hanno scelto **Nascondi me dalla rubrica dei membri** vengono conteggiati come esclusi e saltati.
- I familiari che condividono un numero di cellulare ricevono il messaggio una sola volta.

### Personalizzare i messaggi con i campi unione

Sotto la casella del messaggio, la finestra di invio mostra dei segnaposto: **Nome**, **Cognome**, **Nome visualizzato** e **Nome della chiesa**. Clicca su un segnaposto per inserire il relativo testo (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) nel punto del cursore. Al momento dell'invio, ogni segnaposto viene sostituito con i dati del destinatario, quindi un messaggio di gruppo come `Ciao {{firstName}}, ci vediamo domenica!` raggiunge ogni membro con il proprio nome. I segnaposto funzionano sia per i messaggi di gruppo sia per quelli a una singola persona. I messaggi a un gruppo offrono anche il segnaposto **Nome del gruppo** (`{{groupName}}`), che viene sostituito con il nome del gruppo.

Per riutilizzare un messaggio, salvalo come [modello di testo](./email-templates.md#text-templates) (un modello email con la categoria **Testo**) e selezionalo da **Carica modello (facoltativo)** in cima alla finestra di invio.

:::info
Il limite di 1.600 caratteri si applica al messaggio come lo scrivi. Dopo che i segnaposto sono stati sostituiti, un testo più lungo di 1.600 caratteri viene troncato a quella lunghezza.
:::

I messaggi possono essere inviati anche automaticamente da un passaggio di un [flusso di lavoro](../serving/workflows.md#sending-a-text) con l'azione **Invia messaggio di testo**, che usa lo stesso fornitore e gli stessi segnaposto.

## Archiviazione file

Per impostazione predefinita, i file che carichi sul tuo sito web (tramite [File](../website/files.md)) e in altre aree di contenuto usano l'archiviazione gratuita ospitata da B1, fino a 100 MB. Se ti serve più spazio, puoi collegare un tuo servizio di archiviazione cloud: i nuovi caricamenti vanno direttamente sul tuo account, senza limiti della piattaforma.

1. Nella pagina Impostazioni, clicca su **Archiviazione file** nell'elenco a sinistra, quindi clicca su **Modifica** nella sezione **Archiviazione file**.
2. Scegli un fornitore: **Google Drive**, **Dropbox**, **OneDrive** oppure un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, clicca su **Connetti** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la tua access key, la secret, il nome del bucket e l'URL base pubblico.
4. Clicca su **Salva**.

:::info
Questa impostazione riguarda solo i nuovi caricamenti nei File del sito web e in aree di contenuto simili. Le immagini delle gallerie, le miniature, i loghi e le foto delle persone restano sempre sull'archiviazione predefinita di B1.
:::

## Promozione di classe

Se registri la **Classe** per bambini e studenti, B1 può far salire automaticamente di classe tutti in una data che scegli (ad esempio il 1° agosto), invece di richiederti di modificare ogni profilo a mano.

1. Nella pagina Impostazioni, clicca su **Promozione di classe** nell'elenco a sinistra, quindi clicca su **Modifica** nella sezione **Promozione di classe**.
2. Attiva l'interruttore (mostra **Attivato**) e scegli il **Mese** e il **Giorno** in cui promuovere le classi ogni anno. In quella data, tutti quelli con una classe passano alla classe successiva, e i ragazzi di 12ª diventano **Diplomati**.
3. Salva le modifiche.

Per interrompere la promozione automatica, disattiva l'interruttore in modo che mostri **Disattivato** e salva. La data di promozione viene rimossa e le classi non cambieranno più da sole.

## Iscrizione ai volontari {#volunteer-signup}

Per impostazione predefinita, i membri che consultano le [iscrizioni dei volontari](../../b1-church/serving/volunteer-signup.md) vedono tutte le settimane future con posizioni aperte. Se l'elenco diventa lungo, puoi mostrare solo la settimana successiva per ogni tipo di piano.

1. Nella pagina Impostazioni, clicca su **Iscrizione volontari** nell'elenco a sinistra, quindi clicca su **Modifica** nella sezione **Iscrizione volontari**.
2. Attiva **Mostra solo la settimana successiva per ogni tipo di piano**.
3. Salva le modifiche.

Con questa opzione attiva, ogni tipo di piano mostra solo il suo prossimo piano futuro. La settimana successiva compare quando la data attuale è passata. La riga **Settimane mostrate** della sezione riporta **Solo la settimana successiva per ogni tipo di piano** oppure **Tutte le settimane future**.

## Riservatezza delle offerte {#giving-privacy}

Le persone con accesso alle donazioni normalmente vedono i totali delle offerte di una persona nella sua [scheda personale](../people/adding-people.md#editing-details). Se preferisci non mostrare gli importi ogni volta che viene aperta una scheda, puoi nasconderli finché qualcuno non li richiede.

1. Nella pagina Impostazioni, clicca su **Riservatezza offerte** nell'elenco a sinistra, quindi clicca su **Modifica** nella sezione **Riservatezza offerte**.
2. Attiva **Nascondi le offerte nelle schede delle persone fino al clic**.
3. Salva le modifiche.

Con questa opzione attiva, la scheda delle offerte nella scheda di una persona dice "Le offerte sono nascoste nelle schede delle persone." Clicca su **Mostra offerte** per caricare e visualizzare le offerte di quella persona. Il dato si nasconde di nuovo quando apri un'altra persona. Non cambia chi può vedere le offerte: solo le persone con accesso alle donazioni vedono la scheda.

## Importazione ed esportazione

Il link **Importa/Esporta** sotto il nome della chiesa nella pagina Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare i dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per backup o migrazione.

È particolarmente utile quando stai configurando la chiesa per la prima volta e devi trasferire in ChurchApps le anagrafiche già esistenti.

:::warning
Prima di importare dati, fai sempre un backup delle anagrafiche esistenti. Le operazioni di importazione aggiungono dati al sistema e possono creare duplicati se vengono eseguite più volte.
:::
