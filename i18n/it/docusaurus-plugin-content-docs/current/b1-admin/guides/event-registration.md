---
title: "Guida: Configurare la Registrazione agli Eventi"
---

# Configurare la Registrazione agli Eventi

<div class="article-intro">

Crea un modulo di registrazione per eventi, raccogli informazioni sui partecipanti e pagamenti opzionali, incorporalo nel sito web della tua chiesa e gestisci le iscrizioni man mano che arrivano. Alla fine, avrai una pagina di registrazione condivisibile per qualsiasi evento della chiesa.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Account B1 Admin con accesso amministratore
- Per raccogliere pagamenti: [Stripe deve essere configurato](../donations/online-giving-setup.md) prima

</div>

## Passaggio 1: Crea un Modulo Stand Alone

I moduli Stand Alone hanno il proprio URL pubblico accessibile a chiunque — perfetti per la registrazione agli eventi.

Segui la guida [Creare Moduli](../forms/creating-forms.md) per:

1. Vai a Moduli e clicca Aggiungi Modulo
2. Scegli il tipo "Stand Alone" — questo dà al tuo modulo il proprio URL pubblico
3. Assegnagli il nome dell'evento (es. "Iscrizione Ritiro Uomini", "Iscrizione VBS")

## Passaggio 2: Aggiungi Domande

Costruisci i campi necessari per raccogliere informazioni dai partecipanti.

Segui la guida [Creare Moduli](../forms/creating-forms.md#adding-questions) per aggiungere le domande:

1. Vai alla scheda Domande e aggiungi campi per le informazioni necessarie: nome, email, telefono, restrizioni alimentari, taglia maglietta, contatto di emergenza, ecc.
2. Usa Scelta Multipla per opzioni come preferenze pasto o selezione sessioni

:::warning
Il tipo di campo Pagamento richiede che Stripe sia configurato. Se non hai ancora configurato le donazioni online, consulta [Configurazione Donazioni Online](../donations/online-giving-setup.md) prima di aggiungere campi di pagamento.
:::

## Passaggio 3: Configura le Impostazioni del Modulo

Controlla quando e come il tuo modulo di registrazione è disponibile.

1. Imposta le date di disponibilità se la registrazione deve essere aperta solo per un periodo limitato
2. Copia l'URL pubblico — puoi condividerlo direttamente
3. Aggiungi membri del modulo con ruoli Admin o Solo Visualizzazione per aiutare a gestire le iscrizioni

## Passaggio 4: Incorpora nel Tuo Sito Web

Rendi il modulo di registrazione facile da trovare aggiungendolo al sito web della tua chiesa.

Segui la guida [Gestione Pagine](../website/managing-pages.md) per:

1. Nel tuo editor del sito B1, aggiungi una nuova sezione a una pagina e seleziona l'elemento Modulo
2. Scegli il tuo modulo di registrazione dalla lista

:::tip
Condividi l'URL standalone anche via email, social media e bollettini della chiesa — più posti è visibile, più iscrizioni otterrai.
:::

## Passaggio 5: Gestisci le Iscrizioni

Monitora le registrazioni man mano che arrivano ed esporta i dati quando ne hai bisogno.

Segui la guida [Gestione Iscrizioni](../forms/managing-submissions.md) per:

1. Esamina le risposte man mano che arrivano nella scheda Iscrizioni
2. Esporta in CSV per fogli di calcolo, conteggio partecipanti o condivisione con i coordinatori dell'evento

## Fatto!

La registrazione al tuo evento è attiva. Condividi il link, incorporalo nel tuo sito web e monitora le iscrizioni da B1 Admin. Quando l'evento è finito, esporta la lista finale per i tuoi archivi.

## Articoli Correlati

- [Creare Moduli](../forms/creating-forms.md) — crea moduli con diversi tipi di campo
- [Gestione Iscrizioni](../forms/managing-submissions.md) — esamina ed esporta le risposte ai moduli
- [Gestione Pagine](../website/managing-pages.md) — incorpora moduli nel tuo sito web
- [Configurazione Donazioni Online](../donations/online-giving-setup.md) — necessario per i campi di pagamento
