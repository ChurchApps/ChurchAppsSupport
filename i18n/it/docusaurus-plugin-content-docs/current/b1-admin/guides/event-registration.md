---
title: "Guida: configurare la registrazione agli eventi"
description: "Configura un modulo di registrazione agli eventi in B1 Admin per raccogliere i dati dei partecipanti e pagamenti facoltativi, incorporarlo nel sito della chiesa e monitorare le iscrizioni."
---

# Configurare la registrazione agli eventi

<div class="article-intro">

Crea un modulo di registrazione agli eventi, raccogli i dati dei partecipanti e pagamenti facoltativi, incorporalo nel sito web della chiesa e gestisci le risposte man mano che arrivano. Alla fine avrai una pagina di registrazione da condividere per qualsiasi evento della chiesa.

</div>

:::info
**Due modi per gestire la registrazione agli eventi:** questa guida descrive la **registrazione tramite modulo** -- un modulo Autonomo con un proprio link pubblico, domande personalizzate e un campo di pagamento facoltativo. Per un evento nel tuo calendario, puoi invece usare la **registrazione agli eventi** integrata nel calendario -- vedi [Creare calendari](../calendars/creating-calendars.md#enabling-event-registration). Permette ai membri di iscriversi direttamente da [B1.church o dall'app B1](../../b1-church/events/registering.md) con capienza, date di apertura e chiusura, lista d'attesa, domande facoltative da un modulo e tipi di partecipante con prezzo (vedi [Iscrizioni a pagamento](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un account B1 Admin con accesso da amministratore
- Per riscuotere pagamenti: [Stripe deve essere configurato](../donations/online-giving-setup.md) prima

</div>

## Passo 1: crea un modulo Autonomo {#step-1-create-a-stand-alone-form}

I moduli Autonomi hanno un proprio URL pubblico accessibile a chiunque -- perfetti per la registrazione agli eventi.

Segui la guida [Creare moduli](../forms/creating-forms.md) per:

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegliere **Persone > Moduli** e fare clic su **Aggiungi modulo**
2. Dare al modulo il nome dell'evento (ad esempio "Iscrizione al ritiro degli uomini", "Iscrizione VBS")
3. In **Associato a**, scegliere **Autonomo** -- così il modulo avrà un proprio URL pubblico
4. Fare clic su **Salva**

## Passo 2: aggiungi le domande {#step-2-add-questions}

Costruisci i campi che ti servono dai partecipanti.

Segui la guida [Creare moduli](../forms/creating-forms.md#adding-questions) per aggiungere le domande:

1. Apri il modulo, vai alla scheda **Domande** e fai clic su **Aggiungi domanda** per ogni informazione che ti serve: nome, email, telefono, restrizioni alimentari, taglia della maglietta, contatto di emergenza, ecc.
2. Usa **Scelta multipla** per opzioni come le preferenze per i pasti o la scelta delle sessioni
3. Per riscuotere una quota, aggiungi una domanda di tipo **Pagamento** e scegli il suo **Fondo** e il suo **Importo**

:::warning
Il tipo di campo Pagamento richiede che Stripe sia configurato. Se non hai ancora attivato le donazioni online, consulta [Configurazione delle donazioni online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento.
:::

## Passo 3: configura le impostazioni del modulo {#step-3-configure-form-settings}

Controlla quando e come il modulo di registrazione è disponibile. Segui la sezione [Configurare le proprietà del modulo](../forms/creating-forms.md#configuring-form-properties) per:

1. Fare clic su **Modifica modulo** e, se la registrazione deve restare aperta solo per un periodo limitato, impostare **Imposta periodo di disponibilità del modulo** su **Sì** e scegliere le date di inizio e fine
2. Copiare l'**URL pubblico** mostrato sul lato sinistro della pagina del modulo -- puoi condividerlo direttamente. Fai clic su **Codice QR** accanto al modulo nell'elenco dei Moduli per scaricare un codice QR da usare su volantini e diapositive
3. Nella scheda **Membri del modulo**, aggiungi persone come **Amministratore** o **Solo visualizzazione** per aiutare a gestire le risposte, e attiva **Notifica email** per chiunque debba ricevere un'email per ogni nuova iscrizione

## Passo 4: incorpora nel sito web {#step-4-embed-on-your-website}

Rendi il modulo di registrazione facile da trovare aggiungendolo al sito web della chiesa.

Segui la guida [Editor delle pagine](../website/page-editor.md) per:

1. Aprire una pagina nell'editor del tuo sito B1 e fare clic su **Aggiungi contenuto**
2. Trascinare l'elemento **Modulo** in una sezione e scegliere il modulo di registrazione

:::tip
Condividi l'URL autonomo anche via email, sui social e nei bollettini della chiesa -- più posti lo mostrano, più iscrizioni riceverai.
:::

## Passo 5: gestisci le risposte {#step-5-manage-submissions}

Monitora le iscrizioni man mano che arrivano ed esporta i dati quando ti servono.

Segui la guida [Gestire le risposte](../forms/managing-submissions.md) per:

1. Esaminare le risposte man mano che arrivano nella scheda **Risposte al modulo**
2. Fare clic su **Esporta** per scaricare un CSV da usare nei fogli di calcolo, per il conteggio dei partecipanti o da condividere con i coordinatori dell'evento

## Hai finito! {#youre-done}

La tua registrazione all'evento è attiva. Condividi il link, incorporalo nel sito web e monitora le iscrizioni da B1 Admin. Quando l'evento è finito, esporta l'elenco definitivo per i tuoi registri.

## Articoli correlati {#related-articles}

- [Creare moduli](../forms/creating-forms.md) -- crea moduli con diversi tipi di campo
- [Gestire le risposte](../forms/managing-submissions.md) -- esamina ed esporta le risposte ai moduli
- [Editor delle pagine](../website/page-editor.md) -- incorpora i moduli nel tuo sito web
- [Configurazione delle donazioni online](../donations/online-giving-setup.md) -- necessaria per i campi di pagamento
