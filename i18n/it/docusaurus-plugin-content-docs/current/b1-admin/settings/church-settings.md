---
title: "Impostazioni della chiesa"
---

# Impostazioni della chiesa

<div class="article-intro">

La pagina Impostazioni della chiesa è dove configuri le informazioni di base della tua chiesa, i recapiti e l'identità visiva. Questi dati vengono usati in tutti gli strumenti ChurchApps, compresi il tuo sito B1.church e l'app mobile B1.

</div>

## Video di formazione

<YouTube id="634zSbzDkYA" title="Configurare le informazioni e l'identità visiva della chiesa in B1" next="Ruoli, permessi e invito del team in B1" nextUrl="/docs/b1-admin/settings/roles-permissions" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso "Modifica impostazioni della chiesa". Vedi [Ruoli e permessi](./roles-permissions.md) se non hai accesso.
- Tieni pronti l'indirizzo, i recapiti e il logo della chiesa

</div>

## Modificare le informazioni della chiesa

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), espandi **Impostazioni** e clicca su **Impostazioni**.
2. Nella sezione **Informazioni sulla chiesa** (in cima alla pagina), clicca su **Modifica**.
3. Aggiorna uno qualsiasi dei seguenti campi:
   - **Nome della chiesa** -- Il nome visualizzato in tutti i prodotti ChurchApps.
   - **Indirizzo** -- L'indirizzo fisico della tua chiesa.
   - **Recapiti** -- Numero di telefono, email e altri dettagli di contatto.
   - **Fuso orario** -- Il fuso orario della tua chiesa. Vedi [Fuso orario](#time-zone) più sotto.
4. Clicca su **Salva** per applicare le modifiche.

## Configurare il sottodominio

La tua chiesa ottiene un sottodominio gratuito su **tuachiesa.1.church**. È l'indirizzo web dove membri e visitatori possono accedere alla presenza online della chiesa.

1. Nella pagina Impostazioni, clicca su **Modifica** nella sezione **Informazioni sulla chiesa** e individua il campo **Sottodominio**.
2. Inserisci il sottodominio che preferisci (ad esempio "chiesagrazia" per chiesagrazia.1.church).
3. Salva le modifiche.

:::info
Il tuo sottodominio deve essere unico tra tutte le chiese ChurchApps. Se il nome che preferisci è già in uso, prova ad aggiungere la tua città o la regione (ad esempio "chiesagrazia-milano").
:::

Se vuoi che i visitatori raggiungano il tuo sito con un tuo dominio (ad esempio **`www.chiesagrazia.org`**), vedi [Dominio personalizzato](./custom-domain.md).

## Configurare l'identità visiva

Personalizza come la tua chiesa appare in tutti gli strumenti ChurchApps:

1. Carica il **logo della chiesa** cliccando sull'area del logo e selezionando un file immagine.
2. Aggiungi eventuali **immagini della chiesa** aggiuntive usate sul tuo sito web e nell'[app mobile](./mobile-app.md).

:::tip
Per risultati migliori, usa un logo con sfondo trasparente in formato PNG. Così apparirà bene sia su sfondi chiari sia su sfondi scuri.
:::

## Primo giorno della settimana

Scegli da quale giorno iniziano i tuoi calendari. Il menu a tendina **Primo giorno della settimana** nella sezione Informazioni sulla chiesa è impostato di default su **Domenica**, ma può essere impostato su qualsiasi giorno. Una volta modificato, viene rispettato nelle griglie dei calendari di B1 Admin e nel portale dei membri di B1.church -- i calendari dei gruppi, i calendari curati e l'editor degli eventi impaginano tutti le settimane a partire dal giorno che scegli.

## Fuso orario {#time-zone}

Il menu a tendina **Fuso orario** nella sezione **Informazioni sulla chiesa** imposta il fuso orario della tua chiesa (ad esempio *Europe/Rome*). Scegli **Nessuno** per lasciarlo vuoto. Una volta salvato, il fuso orario compare nel riepilogo delle Informazioni sulla chiesa.

B1 usa questo fuso orario per gli orari validi per tutta la chiesa, come i promemoria degli eventi e le programmazioni sui tuoi TV di [FreePlay](../../freeplay/scheduled-mode/scheduling-the-calendar.md). Le [pianificazioni del check-in](../attendance/setup.md#setting-a-check-in-schedule) vengono misurate prima di tutto nel fuso orario della [sede](./campuses.md) del culto, e usano il fuso orario della chiesa solo quando quella sede non ne ha uno. Se tutte le tue sedi si trovano nello stesso fuso orario, impostalo sia sulla chiesa sia su ogni sede.

## Regione (formato di data e telefono)

L'impostazione **Regione** controlla il modo in cui date e orari vengono scritti in tutto B1. Per impostazione predefinita le date usano il formato degli Stati Uniti (ad esempio "28 set 2026" e "9/28/2026"). Le chiese al di fuori degli USA possono passare al proprio formato -- ad esempio scegliendo Italiano (Italia) vengono mostrate date come "28 set 2026" e "28/09/2026".

1. Nella pagina Impostazioni, clicca su **Regione** nell'elenco a sinistra, poi clicca su **Modifica** nella sezione **Regione**.
2. Scegli la tua regione dal menu a tendina **Regione**. Ogni opzione mostra una data di esempio così puoi vedere esattamente come appariranno le date.
3. Clicca su **Salva**.

La sezione Regione mostra poi la regione selezionata, un esempio del **Formato data** e il formato dei tuoi **Numeri di telefono**.

### Formato dei numeri di telefono

La stessa sezione Regione contiene l'impostazione **Numeri di telefono**, che controlla come vengono inseriti i numeri di telefono nella scheda di una persona:

- **Internazionale (con prefisso paese)** -- l'impostazione predefinita. I campi telefono mostrano un selettore con la bandiera del paese e salvano i numeri con il prefisso (ad esempio +39 333 555 1234).
- **Locale (come digitato)** -- i campi telefono diventano semplici caselle di testo e salvano i numeri esattamente come li digiti, senza aggiungere il prefisso (ad esempio 333 555 1234). Scegli questa opzione se la tua chiesa scrive i numeri in un formato locale e non vuoi che B1 aggiunga un prefisso.

Quando è selezionato **Locale**, la sezione Regione mostra anche "Numeri di telefono locali" accanto alla tua regione.

:::tip
Gli SMS funzionano meglio quando i numeri includono il prefisso del paese. Se invii SMS da B1, mantieni il formato **Internazionale**, oppure assicurati che i numeri digitati in modalità Locale includano il prefisso.
:::

La tua regione si applica a date e orari in tutto B1 Admin e sul tuo sito B1.church e nel portale dei membri, compresi sermoni, articoli del blog, calendari dei gruppi e piani di servizio, così i membri vedono le date nello stesso formato del tuo staff.

## Messaggistica SMS {#texting}

Collega un fornitore di SMS per inviare messaggi di testo a una persona o a un intero gruppo da B1 Admin. Gli SMS vengono inviati tramite il tuo account personale presso il fornitore, quindi si applicano i suoi prezzi e i suoi limiti.

1. Nella pagina Impostazioni, clicca su **Messaggistica SMS** nell'elenco a sinistra, poi clicca su **Modifica** nella sezione **Messaggistica SMS**.
2. Scegli un **Fornitore**:
   - **Clearstream** -- inserisci una **Chiave API**. Creala in Impostazioni account Clearstream, alla voce Chiavi API.
   - **Text In Church** -- inserisci una **Chiave API**. Chiedi prima al supporto di Text In Church l'accesso API per sviluppatori, poi crea una chiave in Impostazioni account > sezione API per sviluppatori.
   - **Nalo Solutions** (Ghana) -- inserisci la chiave di autenticazione del tuo account Nalo Solutions come **Chiave API**, e un **ID mittente** (fino a 11 caratteri) che Nalo ti ha approvato.
   - **Twilio** -- usa il tuo account Twilio della chiesa; Twilio ti fattura direttamente. Copia l'**Account SID** e l'**Auth Token** dalla [Console Twilio](https://console.twilio.com), e inserisci un **Numero mittente** -- un numero di telefono Twilio registrato per A2P 10DLC, in un formato come `+15551234567`. Dopo il salvataggio, incolla l'URL del webhook in arrivo (vedi sotto) nel campo **Quando arriva un messaggio** del numero in Twilio, così anche le risposte STOP vengono registrate in B1.
3. Clicca su **Salva**.

Per interrompere l'invio di SMS, imposta **Fornitore** su **Nessuno** e salva. Questo rimuove il fornitore salvato.

### Disattivare le persone che rispondono STOP

Una volta salvato un fornitore, riapri la sezione Messaggistica SMS con **Modifica**. Sotto le impostazioni del fornitore, un campo in sola lettura **URL del webhook dei messaggi in arrivo (STOP)** mostra un indirizzo web unico per la tua chiesa. Clicca sul campo per selezionare l'indirizzo, copialo e incollalo nell'impostazione del webhook dei messaggi in arrivo (risposte) del tuo fornitore. Funziona con tutti i fornitori sopra elencati che possono inoltrare le risposte ricevute a un webhook.

Da quel momento, quando qualcuno risponde **STOP** (oppure STOPALL, UNSUBSCRIBE, CANCEL, END, QUIT, OPTOUT o REVOKE) a uno dei tuoi messaggi, B1 trova tutte le persone con quel numero di cellulare, le segna come disiscritte e disattiva i loro promemoria via SMS. Vengono poi saltate dagli SMS di gruppo. Le altre risposte vengono ignorate.

:::info
Questo usa la stessa impostazione di disiscrizione di **Nascondimi dalla rubrica dei membri**, quindi anche chi risponde STOP compare come **Nascosto dalla rubrica** nel proprio profilo. Il campo compare solo quando è selezionato il fornitore salvato -- se cambi il menu a tendina su un altro fornitore, salva prima per rivedere di nuovo l'URL.
:::

Una volta collegato un fornitore, il personale con il permesso di inviare SMS vede un pulsante **SMS** (**Invia SMS a questo gruppo**) nella pagina di un gruppo e il pulsante **Invia SMS** nella pagina di una persona con un cellulare. Scrivi il tuo messaggio e clicca su **Invia**. La finestra conta i caratteri e i segmenti SMS. Per un gruppo, mostra quanti membri riceveranno il messaggio prima dell'invio:

- I membri senza un cellulare registrato vengono saltati.
- I membri che hanno scelto **Nascondimi dalla rubrica dei membri** vengono conteggiati come disiscritti e saltati.
- I familiari che condividono un numero di cellulare ricevono il messaggio una sola volta.

### Personalizzare gli SMS con i campi di unione {#personalizing-texts-with-merge-fields}

Sotto la casella del messaggio, la finestra SMS mostra dei chip segnaposto: **Nome**, **Cognome**, **Nome visualizzato** e **Nome della chiesa**. Clicca su un chip per inserire il suo segnaposto (`{{firstName}}`, `{{lastName}}`, `{{displayName}}` o `{{churchName}}`) nel punto del cursore. Quando l'SMS viene inviato, ogni segnaposto viene sostituito con i dati del destinatario, quindi un SMS di gruppo come `Ciao {{firstName}}, ci vediamo domenica!` raggiunge ogni membro con il proprio nome. I segnaposto funzionano sia per gli SMS di gruppo sia per quelli a una singola persona. Gli SMS a un gruppo offrono anche un chip **Nome del gruppo** (`{{groupName}}`), sostituito con il nome del gruppo.

Per riutilizzare un messaggio, salvalo come [modello di testo](./email-templates.md#text-templates) (un modello di email con la categoria **Testo**) e scegline uno da **Carica modello (facoltativo)** in cima alla finestra SMS.

:::info
Il limite di 1.600 caratteri si applica al messaggio mentre lo digiti. Dopo che i segnaposto sono stati sostituiti, un testo più lungo di 1.600 caratteri viene troncato a quella lunghezza.
:::

Gli SMS possono anche essere inviati automaticamente da un passaggio di un [flusso di lavoro](../serving/workflows.md#sending-a-text) con l'azione **Invia SMS**, che usa lo stesso fornitore e gli stessi segnaposto.

## Archiviazione dei file

Per impostazione predefinita, i file che carichi sul tuo sito web (tramite [File](../website/files.md)) e in altre aree di contenuto usano l'archiviazione gratuita ospitata da B1, fino a 100 MB. Se ti serve più spazio, puoi invece collegare il tuo spazio di archiviazione cloud -- i nuovi caricamenti vanno direttamente al tuo account, senza limiti della piattaforma.

1. Nella pagina Impostazioni, clicca su **Archiviazione file** nell'elenco a sinistra, poi clicca su **Modifica** nella sezione **Archiviazione file**.
2. Scegli un fornitore: **Google Drive**, **Dropbox**, **OneDrive** oppure un **bucket compatibile con S3** (AWS S3, Cloudflare R2, Backblaze B2, ecc.).
3. Per Google Drive, Dropbox o OneDrive, clicca su **Connetti** e accedi per autorizzare l'accesso. Per un bucket compatibile con S3, inserisci la tua chiave di accesso, il segreto, il nome del bucket e l'URL pubblico di base.
4. Clicca su **Salva**.

:::info
Questo riguarda solo i nuovi caricamenti nei File del sito web e nelle aree di contenuto simili. Le immagini delle gallerie, le miniature, i loghi e le foto delle persone restano sempre sull'archiviazione predefinita di B1.
:::

## Promozione di classe

Se tieni traccia della **Classe** dei bambini e dei ragazzi, B1 può far salire automaticamente di un anno tutti in una data che scegli (ad esempio il 1° agosto), senza che tu debba modificare ogni scheda a mano.

1. Nella pagina Impostazioni, clicca su **Promozione di classe** nell'elenco a sinistra, poi clicca su **Modifica** nella sezione **Promozione di classe**.
2. Attiva l'interruttore (mostra **Attivo**) e scegli il **Mese** e il **Giorno** in cui promuovere le classi ogni anno. In quella data, chiunque abbia una classe sale di una classe, e i ragazzi dell'ultimo anno diventano **Diplomati**.
3. Salva le modifiche.

Per interrompere la promozione automatica, disattiva l'interruttore così mostra **Disattivo** e salva. La data di promozione viene rimossa e le classi non cambieranno più da sole.

## Iscrizione dei volontari {#volunteer-signup}

Per impostazione predefinita, i membri che sfogliano le [iscrizioni dei volontari](../../b1-church/serving/volunteer-signup.md) vedono ogni settimana futura con posizioni aperte. Se l'elenco diventa lungo, puoi mostrare solo la settimana successiva per ogni tipo di piano.

1. Nella pagina Impostazioni, clicca su **Iscrizione dei volontari** nell'elenco a sinistra, poi clicca su **Modifica** nella sezione **Iscrizione dei volontari**.
2. Attiva **Mostra solo la settimana successiva per ogni tipo di piano**.
3. Salva le modifiche.

Con questa opzione attiva, ogni tipo di piano mostra solo il suo piano futuro successivo. La settimana seguente compare quando quella data è passata. La riga **Settimane mostrate** della sezione mostra **Solo la settimana successiva per ogni tipo di piano** oppure **Tutte le settimane future**.

## Privacy delle donazioni {#giving-privacy}

Le persone con accesso alle donazioni normalmente vedono i totali delle donazioni di una persona nella sua [scheda persona](../people/adding-people.md#editing-details). Se preferisci non avere gli importi a schermo ogni volta che si apre una scheda, puoi nasconderli finché qualcuno non lo chiede.

1. Nella pagina Impostazioni, clicca su **Privacy delle donazioni** nell'elenco a sinistra, poi clicca su **Modifica** nella sezione **Privacy delle donazioni**.
2. Attiva **Nascondi le donazioni nelle schede persona finché non si clicca**.
3. Salva le modifiche.

Con questa opzione attiva, la scheda delle donazioni nella scheda di una persona dice "Le donazioni sono nascoste nelle schede persona." Clicca su **Mostra donazioni** per caricare e visualizzare le donazioni di quella persona. Si nasconde di nuovo quando apri un'altra persona. Chi può vedere le donazioni non cambia: solo le persone con accesso alle donazioni vedono mai la scheda.

## Importazione ed esportazione

Il link **Importa/Esporta** sotto il nome della tua chiesa nella pagina Impostazioni apre uno strumento dedicato in una nuova finestra del browser. Usalo per:

- Importare dati dei membri da un altro sistema di gestione della chiesa.
- Esportare i tuoi dati ChurchApps per backup o migrazione.

È particolarmente utile quando stai configurando la chiesa per la prima volta e devi trasferire le schede esistenti in ChurchApps.

:::warning
Quando importi dei dati, fai sempre prima un backup delle schede esistenti. Le operazioni di importazione aggiungono dati al sistema e possono creare voci duplicate se eseguite più volte.
:::
