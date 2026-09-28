---
title: "Revisione delle richieste di eliminazione dell'account"
---

# Revisione delle richieste di eliminazione dell'account

<div class="article-intro">

Quando una chiesa ha un Gruppo di approvazione della directory configurato, l'eliminazione dell'account non avviene più istantaneamente — la richiesta di un membro diventa un'attività che il tuo gruppo di approvazione esamina prima che qualsiasi cosa venga rimossa. Questa pagina spiega come viene effettuata la richiesta, come approvarla o rifiutarla e cosa accade in ciascun caso.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Un **Gruppo di approvazione della directory** deve essere configurato sotto **Mobile → Member portal**. Senza uno, facendo clic su **Elimina il mio account** nella pagina del profilo l'account viene comunque eliminato immediatamente, senza fase di revisione. Vedi [Impostazioni dell'app mobile](../settings/mobile-app.md).
- L'approvazione o il rifiuto di una richiesta richiede l'autorizzazione **Persone > Modifica**.

</div>

## Come un membro richiede l'eliminazione

L'eliminazione dell'account viene richiesta dalla pagina **My Profile** — la stessa pagina di account condiviso trattata in [Gestione del tuo profilo](./managing-profile.md) — nella sua sezione **Account Deletion**. Quando è configurato un gruppo di approvazione, la conferma della richiesta non elimina nulla immediatamente. Invece:

1. Crea un'attività aperta intitolata **"Account deletion request"**, assegnata al Gruppo di approvazione della directory, in **Serving → My Work**.
2. Disabilita il pulsante **Elimina il mio account** per quella persona e mostra un avviso che la richiesta è in attesa di revisione.

L'invio di una seconda richiesta mentre una è già aperta semplicemente riapre la stessa attività — una persona può avere solo una richiesta di eliminazione in sospeso alla volta.

## Revisione di una richiesta

1. Vai a **Serving → My Work** (o **Assigned to My Groups** sulla tua dashboard, lo stesso posto dove appaiono le [richieste di modifica del profilo](./approving-profile-changes.md)).
2. Apri l'attività intitolata **"Account deletion request from *Name*"**.
3. Vedrai due azioni: **Approve deletion** e **Decline**.

### Approvazione

Conferma **"Permanently anonymize this person's record and remove their login? This cannot be undone."** Questo sostituisce le informazioni personali della persona con valori generici (lo stesso anonimato utilizzato dall'azione **Data Management > Anonymize** nel record di una persona — vedi [Data Security](../settings/data-security.md)) e rimuove il suo login. L'attività si chiude automaticamente e il membro riceve una notifica che la sua richiesta è stata approvata.

### Rifiuto

Il rifiuto richiede un motivo, poiché il GDPR consente di rifiutare una richiesta di cancellazione solo per un'eccezione legale:

- **Conservazione legale** (donazioni, tasse o registri di impiego)
- **Necessario per un reclamo legale**
- **Altro** — spiega nella casella di testo (almeno 10 caratteri)

Il membro viene informato della decisione insieme al motivo che hai fornito e può inviare nuovamente la sua richiesta o fare ricorso a un'autorità di vigilanza se non è d'accordo.

:::info
Le chiese hanno 30 giorni per rispondere a una richiesta di eliminazione. L'attività scade tra 28 giorni e il gruppo di approvazione riceve promemoria automatici se è ancora aperta dopo 21 e 27 giorni.
:::

:::tip
Le richieste di eliminazione e modifica del profilo utilizzano lo stesso Gruppo di approvazione della directory e lo stesso flusso di revisione basato su attività — vedi [Approving Profile Changes](./approving-profile-changes.md) se devi anche revisionare le richieste di aggiornamento della directory.
:::

## Articoli correlati

- [Gestione del tuo profilo](./managing-profile.md) — Dove i membri richiedono l'eliminazione del loro account
- [Approving Profile Changes](./approving-profile-changes.md) — Il flusso di revisione del gruppo di approvazione simile per le richieste di aggiornamento della directory
- [Data Security](../settings/data-security.md) — Conformità GDPR e anonimizzazione avviata dall'amministratore
- [Impostazioni dell'app mobile](../settings/mobile-app.md) — Configurazione del Gruppo di approvazione della directory
