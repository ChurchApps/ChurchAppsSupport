---
title: "Revisione delle Richieste di Cancellazione dell'Account"
---

# Revisione delle Richieste di Cancellazione dell'Account

<div class="article-intro">

Quando una chiesa ha un Gruppo di Approvazione della Directory configurato, la cancellazione dell'account non avviene più istantaneamente - la richiesta di un membro diventa un'attività che il tuo gruppo di approvazione esamina prima di rimuovere qualsiasi cosa. Questa pagina spiega come viene fatta la richiesta, come approvarla o rifiutarla, e cosa accade in ciascun caso.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Un **Gruppo di Approvazione della Directory** deve essere configurato in **Mobile → Portale dei Membri**. Senza uno, fare clic su **Elimina il mio account** nella pagina del Profilo elimina comunque l'account immediatamente, senza alcun passaggio di revisione. Vedi [Impostazioni dell'App Mobile](../settings/mobile-app.md).
- L'approvazione o il rifiuto di una richiesta richiede l'autorizzazione **Persone > Modifica**.

</div>

## Come un Membro Richiede la Cancellazione

La cancellazione dell'account è richiesta dalla pagina **Il Mio Profilo** — la stessa pagina di account condivisa descritta in [Gestione del Tuo Profilo](./managing-profile.md) — nella sua sezione **Cancellazione dell'Account**. Quando un gruppo di approvazione è configurato, la conferma della richiesta non elimina nulla immediatamente. Invece:

1. Crea un'attività aperta intitolata **"Richiesta di cancellazione dell'account"**, assegnata al Gruppo di Approvazione della Directory, in **Servizio → Attività**.
2. Disabilita il pulsante **Elimina il mio account** per quella persona e mostra un avviso che la richiesta è in attesa di revisione.

L'invio di una seconda richiesta mentre una è già aperta semplicemente riaprirà la stessa attività - una persona può avere solo una richiesta di cancellazione in sospeso alla volta.

## Revisione di una Richiesta

1. Vai a **Servizio → Attività** (o **Assegnato ai Miei Gruppi** nel tuo dashboard, lo stesso posto dove appaiono le [richieste di cambio del profilo](./approving-profile-changes.md)).
2. Apri l'attività intitolata **"Richiesta di cancellazione dell'account da *Nome*"**.
3. Vedrai due azioni: **Approva cancellazione** e **Rifiuta**.

### Approvazione

Conferma **"Anonimizzare permanentemente il record di questa persona e rimuovere il suo accesso? Questo non può essere annullato."** Questo sostituisce le informazioni personali della persona con valori generici (la stessa anonimizzazione utilizzata dall'azione **Gestione Dati > Anonimizza** nel record di una persona — vedi [Sicurezza dei Dati](../settings/data-security.md)) e rimuove il suo accesso. L'attività si chiude automaticamente e il membro viene notificato che la sua richiesta è stata approvata.

### Rifiuto

Il rifiuto richiede un motivo, perché il GDPR consente solo di rifiutare una richiesta di cancellazione per un'eccezione legale:

- **Conservazione legale** (donazioni, imposte, o record di impiego)
- **Necessario per un'affermazione legale**
- **Altro** — spiega nella casella di testo (almeno 10 caratteri)

Il membro viene notificato della decisione insieme al motivo che hai fornito, e può rinviare la sua richiesta o escalare a un'autorità di controllo se non è d'accordo.

:::info
Le chiese hanno 30 giorni per rispondere a una richiesta di cancellazione. L'attività è dovuta tra 28 giorni e il gruppo di approvazione riceve promemoria automatici se è ancora aperto dopo 21 e 27 giorni.
:::

:::tip
Le richieste di cancellazione e cambio del profilo utilizzano lo stesso Gruppo di Approvazione della Directory e lo stesso flusso di revisione basato su Attività — vedi [Approvazione dei Cambiamenti del Profilo](./approving-profile-changes.md) se hai anche bisogno di rivedere le richieste di aggiornamento della directory.
:::

## Articoli Correlati

- [Gestione del Tuo Profilo](./managing-profile.md) — Dove i membri richiedono la cancellazione del loro account
- [Approvazione dei Cambiamenti del Profilo](./approving-profile-changes.md) — Il flusso di revisione simile per le richieste di aggiornamento della directory
- [Sicurezza dei Dati](../settings/data-security.md) — Conformità GDPR e anonimizzazione avviata dall'amministratore
- [Impostazioni dell'App Mobile](../settings/mobile-app.md) — Configurazione del Gruppo di Approvazione della Directory
