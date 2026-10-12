---
title: "Modifica multipla delle persone"
---

# Modifica multipla delle persone

<div class="article-intro">
La modifica multipla ti permette di aggiornare più persone contemporaneamente, risparmiando tempo quando devi applicare la stessa modifica a molti individui. Puoi aggiornare lo stato di appartenenza, lo stato civile, il genere, le preferenze di esclusione dalle comunicazioni e le appartenenze ai gruppi in un'unica operazione.
</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione per gestire i dati delle persone. Consulta [Ruoli e permessi](./roles-permissions.md) per i dettagli.
- Dovresti aver già aggiunto o importato le persone che vuoi modificare. Consulta [Aggiungere persone](./adding-people.md) se necessario.
</div>

## Selezionare le persone per la modifica multipla

1. Vai su **People** in B1 Admin
2. Usa gli strumenti di ricerca o i filtri per trovare le persone che vuoi aggiornare
3. Seleziona le caselle per scegliere le persone
   - Nella vista **Households**, selezionare un nucleo familiare seleziona tutte le persone che ne fanno parte
   - Nella vista **Table** (da cambiare con l'interruttore **View as**), puoi selezionare le persone una per una
   - Oppure usa la casella sopra l'elenco per selezionare tutte le persone visibili
4. Una volta selezionata almeno una persona, la barra sopra l'elenco mostra quante persone sono selezionate, insieme a **Clear Selection** e a un pulsante **Actions**

:::tip
Se devi aggiornare un gruppo numeroso di persone in base a criteri specifici, usa la funzione [AI Search](./ai-search.md) oppure i filtri per restringere prima l'elenco, poi seleziona tutte le persone corrispondenti.
:::

## Azioni multiple disponibili

Il menu **Actions** offre diverse opzioni:

### Aggiornare lo stato di appartenenza

Aggiorna lo stato di appartenenza di tutte le persone selezionate:

1. Fai clic su **Actions** → **Set Membership Status**
2. Scegli il nuovo stato:
   - **Visitor** -- Visitatori alla prima visita o occasionali
   - **Guest** -- Ospiti, come le famiglie registrate a un kiosk di check-in
   - **Regular Attendee** -- Frequentatori abituali che non sono membri
   - **Member** -- Membri ufficiali della chiesa
   - **Staff** -- Collaboratori della chiesa
   - **Inactive** -- Persone che non frequentano più
   - **Deceased** -- Persone che sono decedute
3. Scegli la modalità di aggiornamento:
   - **Overwrite all** -- Sostituisce lo stato attuale di tutte le persone selezionate
   - **Only update empty** -- Imposta lo stato solo per le persone che non ne hanno uno
4. Fai clic su **Update**

### Aggiornare lo stato civile

Aggiorna lo stato civile in blocco:

1. Fai clic su **Actions** → **Set Marital Status**
2. Seleziona il nuovo stato:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Scegli se sovrascrivere i valori esistenti o aggiornare solo i campi vuoti
4. Fai clic su **Update**

### Aggiornare il genere

Aggiorna le informazioni sul genere per più persone:

1. Fai clic su **Actions** → **Set Gender**
2. Seleziona il valore:
   - **Unspecified**
   - **Male**
   - **Female**
3. Scegli la modalità di aggiornamento (sovrascrivi tutto oppure solo i campi vuoti)
4. Fai clic su **Update**

### Aggiornare lo stato di esclusione dalle comunicazioni

Controlla se le persone hanno scelto di escludersi dalle comunicazioni:

1. Fai clic su **Actions** → **Set Directory Opt-Out**
2. Scegli:
   - **No** -- Consenti le comunicazioni (rimuove l'esclusione)
   - **Sì** -- Blocca le comunicazioni (imposta l'esclusione)
3. Scegli la modalità di aggiornamento
4. Fai clic su **Update**

:::warning
Fai attenzione quando modifichi lo stato di esclusione dalle comunicazioni. Le persone che hanno scelto esplicitamente di escludersi non dovrebbero ricevere comunicazioni, a meno che non abbiano dato un nuovo consenso.
:::

### Impostare un campo personalizzato

Imposta un valore Sì/No di un [campo personalizzato](../settings/custom-fields.md) per tutte le persone selezionate in una volta sola:

1. Fai clic su **Actions** → **Set Custom Field**.
2. Scegli il campo personalizzato Sì/No che vuoi impostare.
3. Scegli il valore (**Sì** o **No**) da applicare.
4. Fai clic su **Update**.

:::info
Per questa azione multipla sono disponibili solo i campi personalizzati Sì/No. Per impostare altri tipi di campo, modifica ogni persona individualmente.
:::

### Aggiungere a un gruppo

Aggiungi tutte le persone selezionate a uno o più gruppi:

1. Fai clic su **Actions** → **Add to Group**
2. Cerca e seleziona il gruppo o i gruppi a cui aggiungere le persone
3. Puoi selezionare più gruppi per aggiungere le persone a tutti
4. Fai clic su **Add to Groups**

Ogni persona verrà aggiunta come membro normale del gruppo o dei gruppi selezionati. In seguito, se necessario, puoi promuovere alcune persone a leader del gruppo dalla pagina [Membri del gruppo](../groups/group-members.md).

### Rimuovere da un gruppo

Rimuovi tutte le persone selezionate da uno o più gruppi:

1. Fai clic su **Actions** → **Remove from Group**
2. Cerca e seleziona il gruppo o i gruppi da cui rimuovere le persone
3. Puoi selezionare più gruppi
4. Fai clic su **Remove from Groups**

:::info
Questa azione rimuove le persone solo dai gruppi indicati. Non elimina le loro schede persona.
:::

### Eliminare persone

Elimina definitivamente le persone selezionate dal database della tua chiesa:

1. Fai clic su **Actions** → **Elimina**
2. La finestra **Delete Selected People** chiede di confermare quante persone verranno eliminate
3. Fai clic su **Elimina**

:::danger
L'eliminazione delle persone è definitiva e non può essere annullata. Verranno rimossi tutti i loro dati, tra cui:
- Informazioni personali
- Appartenenze ai gruppi
- Registrazioni di presenza
- Cronologia delle donazioni
- Invii di moduli

Usa questa azione solo se sei assolutamente certo di voler rimuovere queste persone dal sistema.
:::

## Risultati della modifica multipla

Al termine di un'azione multipla, vedrai un riepilogo che mostra:

- **Total selected** -- Quante persone sono state incluse nell'operazione
- **Successfully updated** -- Quanti record sono stati modificati
- **Failed** -- Eventuali record che non è stato possibile aggiornare (se applicabile)
- **Unchanged** -- Record che non richiedevano modifiche (ad esempio, con la modalità "only update empty")

Se alcuni aggiornamenti non sono riusciti, vedrai i dettagli dell'errore che ne spiegano il motivo.

## Buone pratiche

- **Inizia in piccolo** -- Prova le operazioni multiple su pochi record prima, per essere sicuro di applicare le modifiche corrette
- **Usa i filtri** -- Restringi l'elenco con filtri o con AI Search prima di selezionare le persone, per essere sicuro di aggiornare solo le persone giuste
- **Ricontrolla la selezione** -- Verifica le persone selezionate prima di applicare modifiche multiple
- **Usa la modalità "only update empty"** -- Quando vuoi completare i dati mancanti senza sovrascrivere le informazioni esistenti
- **Documenta le modifiche importanti** -- Conserva note sugli aggiornamenti multipli, nel caso ti servano in seguito
- **Coordinati con il tuo team** -- Avvisa gli altri amministratori quando esegui modifiche multiple di grandi dimensioni

## Casi d'uso comuni

### Aggiornare i nuovi membri

Dopo un corso per i membri, imposta come **Member** tutti i partecipanti:

1. Cerca le persone che hanno frequentato il corso
2. Selezionale tutte
3. Usa **Actions** → **Set Membership Status** → **Member**

### Organizzare i piccoli gruppi

Aggiungi più persone a un nuovo piccolo gruppo:

1. Cerca le persone che vuoi inserire nel gruppo
2. Selezionale
3. Usa **Actions** → **Add to Group** e seleziona il piccolo gruppo

### Pulire i dati

Completa lo stato civile mancante per le coppie sposate:

1. Filtra le persone sposate (usando le informazioni sul nucleo familiare)
2. Seleziona quelle con lo stato civile vuoto
3. Usa **Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Articoli correlati

- [Cercare persone](./searching-people.md) -- Trova le persone da modificare
- [AI Search](./ai-search.md) -- Usa il linguaggio naturale per trovare gruppi specifici di persone
- [Membri del gruppo](../groups/group-members.md) -- Gestisci l'appartenenza ai gruppi
- [Esportare i dati](./exporting-data.md) -- Esporta i dati delle persone prima di fare modifiche multiple
