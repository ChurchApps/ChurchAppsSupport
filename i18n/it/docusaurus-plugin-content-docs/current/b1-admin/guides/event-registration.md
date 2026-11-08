---
title: "Guida: Configurare la registrazione agli eventi"
description: "Configura un modulo di registrazione agli eventi in B1 Admin per raccogliere i dati dei partecipanti e i pagamenti facoltativi, incorporarlo nel sito web della tua chiesa e monitorare le iscrizioni."
---

# Configurare la registrazione agli eventi

<div class="article-intro">

Crea un modulo di registrazione agli eventi, raccogli le informazioni dei partecipanti e i pagamenti facoltativi, incorporalo nel sito web della tua chiesa e gestisci le iscrizioni man mano che arrivano. Al termine, avrai una pagina di registrazione condivisibile per qualsiasi evento della chiesa.

</div>

:::info
**Due modi per gestire la registrazione agli eventi:** questa guida descrive la **registrazione tramite modulo**, che ti offre il pieno controllo sui campi personalizzati e sulla raccolta dei pagamenti. Per eventi più semplici, in cui ti serve solo sapere chi partecipa, usa la **registrazione nativa agli eventi** integrata nel calendario -- per le istruzioni di configurazione, consulta [Creare calendari](../calendars/creating-calendars.md#enabling-event-registration). La registrazione nativa permette ai membri di iscriversi direttamente da [B1.church o dalla B1 App](../../b1-church/events/registering.md), con monitoraggio della capienza, intervalli di date ed email di conferma.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso amministrativo
- Per raccogliere pagamenti: [Stripe deve essere configurato](../donations/online-giving-setup.md) prima

</div>

## Passaggio 1: Creare un modulo autonomo

I moduli autonomi hanno un proprio URL pubblico accessibile a chiunque -- perfetti per la registrazione agli eventi.

Segui la guida [Creare moduli](../forms/creating-forms.md) per:

1. Accedere a Moduli e fare clic su Aggiungi modulo
2. Scegliere il tipo "Autonomo" -- in questo modo il modulo avrà un proprio URL pubblico
3. Assegnargli il nome dell'evento (ad esempio "Registrazione al ritiro degli uomini", "Iscrizione VBS")

## Passaggio 2: Aggiungere le domande

Costruisci i campi che ti servono per raccogliere le informazioni dai partecipanti.

Segui la guida [Creare moduli](../forms/creating-forms.md#adding-questions) per aggiungere le domande:

1. Vai alla scheda Domande e aggiungi i campi per le informazioni che ti servono: nome, email, telefono, restrizioni alimentari, taglia della maglietta, contatto di emergenza, ecc.
2. Usa la Scelta multipla per opzioni come le preferenze per i pasti o la selezione delle sessioni

:::warning
Il tipo di campo Pagamento richiede la configurazione di Stripe. Se non hai ancora configurato le donazioni online, consulta [Configurazione delle donazioni online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento.
:::

## Passaggio 3: Configurare le impostazioni del modulo

Controlla quando e come il modulo di registrazione è disponibile.

1. Imposta le date di disponibilità se la registrazione deve restare aperta solo per un periodo limitato
2. Copia l'URL pubblico -- puoi condividerlo direttamente
3. Aggiungi membri al modulo con i ruoli Amministratore o Solo visualizzazione per aiutarti a gestire le iscrizioni

## Passaggio 4: Incorporare nel tuo sito web

Rendi il modulo di registrazione facile da trovare aggiungendolo al sito web della tua chiesa.

Segui la guida [Gestire le pagine](../website/managing-pages.md) per:

1. Nell'editor del sito web B1, aggiungi una nuova sezione a una pagina e seleziona l'elemento Modulo
2. Scegli il tuo modulo di registrazione dall'elenco

:::tip
Condividi anche l'URL autonomo via email, sui social media e nei bollettini della chiesa -- più sono i luoghi in cui è visibile, più iscrizioni riceverai.
:::

## Passaggio 5: Gestire le iscrizioni

Monitora le registrazioni man mano che arrivano ed esporta i dati quando ne hai bisogno.

Segui la guida [Gestire le risposte](../forms/managing-submissions.md) per:

1. Esaminare le risposte man mano che arrivano nella scheda Risposte
2. Esportare in CSV per fogli di calcolo, conteggio dei partecipanti o condivisione con i coordinatori dell'evento

## Operazione completata!

La tua registrazione all'evento è attiva. Condividi il link, incorporalo nel tuo sito web e monitora le iscrizioni da B1 Admin. Al termine dell'evento, esporta l'elenco finale per i tuoi archivi.

## Articoli correlati

- [Creare moduli](../forms/creating-forms.md) -- crea moduli con diversi tipi di campo
- [Gestire le risposte](../forms/managing-submissions.md) -- esamina ed esporta le risposte ai moduli
- [Gestire le pagine](../website/managing-pages.md) -- incorpora i moduli nel tuo sito web
- [Configurazione delle donazioni online](../donations/online-giving-setup.md) -- necessario per i campi di pagamento
