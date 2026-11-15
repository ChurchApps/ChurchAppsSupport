---
title: "Modifica in blocco delle persone"
description: "Aggiorna stato di membership, stato civile, genere, esclusione dall'anagrafe, sede, campi personalizzati Sì/No o gruppi per molte persone in una volta in B1 Admin."
---

# Modifica in blocco delle persone

<div class="article-intro">
La modifica in blocco ti permette di aggiornare più persone insieme, risparmiando tempo quando applichi la stessa modifica a molti individui. Puoi aggiornare stato di membership, stato civile, genere, esclusione dall'anagrafe, sede, campi personalizzati Sì/No, appartenenze ai gruppi e flussi di lavoro in un'unica operazione, oppure eliminare persone.
</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso di gestire i dati delle persone. Vedi [Ruoli e permessi](./roles-permissions.md) per i dettagli.
- Dovresti aver già aggiunto o importato le persone che vuoi modificare. Se serve, vedi [Aggiungere persone](./adding-people.md).
</div>

## Selezionare le persone per la modifica in blocco {#selecting-people-for-bulk-editing}

1. Vai su **Persone** in B1 Admin
2. Usa gli strumenti di ricerca o i filtri per trovare le persone che vuoi aggiornare
3. Spunta le caselle per selezionare le persone
   - Nella vista **Nuclei familiari**, spuntare un nucleo seleziona tutti i suoi membri
   - Nella vista **Tabella** (cambia con il pulsante **Visualizza come**), puoi selezionare le persone una alla volta
   - Oppure usa la casella sopra l'elenco per selezionare tutte le persone visibili
4. Una volta selezionata almeno una persona, la barra sopra l'elenco mostra quante sono selezionate, insieme a **Cancella selezione** e a un pulsante **Azioni**

:::tip
Se devi aggiornare un gruppo numeroso di persone in base a criteri specifici, usa la funzione [Ricerca AI](./ai-search.md) o i filtri per restringere prima l'elenco, poi seleziona tutte le persone corrispondenti.
:::

## Azioni in blocco disponibili {#available-bulk-actions}

Il menu **Azioni** offre le opzioni seguenti. Ognuna apre una piccola finestra che indica quante persone verranno modificate; scegli un valore e clicca su **Applica**. Il nuovo valore sostituisce quello che ogni persona selezionata aveva prima. Al termine, un messaggio in fondo alla pagina conferma quante persone sono state aggiornate.

### Imposta stato di membership {#set-membership-status}

1. Clicca su **Azioni** → **Imposta stato di membership**
2. Scegli il nuovo **Stato di membership**:
   - **Visitatore** -- Persone alla prima visita o occasionali
   - **Ospite** -- Ospiti, come le famiglie registrate a un chiosco di check-in
   - **Frequentatore abituale** -- Frequentatori assidui che non sono membri
   - **Membro** -- Membri ufficiali della chiesa
   - **Staff** -- Membri dello staff della chiesa
   - **Inattivo** -- Persone che non frequentano più
   - **Deceduto** -- Persone che sono scomparse
3. Clicca su **Applica**

### Imposta stato civile {#set-marital-status}

1. Clicca su **Azioni** → **Imposta stato civile**
2. Scegli **Sconosciuto**, **Single**, **Sposato**, **Divorziato** o **Vedovo**
3. Clicca su **Applica**

### Imposta genere {#set-gender}

1. Clicca su **Azioni** → **Imposta genere**
2. Scegli **Non specificato**, **Maschio** o **Femmina**
3. Clicca su **Applica**

### Imposta esclusione dall'anagrafe {#set-directory-opt-out}

L'esclusione dall'anagrafe controlla se le persone compaiono nell'anagrafe dei membri, cioè nell'[anagrafe stampata](./print-directory.md) e nell'anagrafe dei membri dell'app B1. È la stessa impostazione di **Nascondi me dall'anagrafe dei membri** nella scheda di una persona.

1. Clicca su **Azioni** → **Imposta esclusione dall'anagrafe**
2. Scegli **Escluso Sì** per nascondere le persone selezionate dall'anagrafe, oppure **Escluso No** per mostrarle di nuovo
3. Clicca su **Applica**

:::warning
Le persone che hanno scelto di nascondersi dall'anagrafe devono restare nascoste, a meno che non chiedano di essere di nuovo inserite.
:::

### Imposta sede {#set-campus}

Questa opzione compare quando la tua chiesa ha configurato le [sedi](../settings/campuses.md).

1. Clicca su **Azioni** → **Imposta sede**
2. Scegli la sede
3. Clicca su **Applica**

### Imposta campo personalizzato {#set-custom-field}

Imposta in una sola volta il valore Sì/No di un [campo personalizzato](../settings/custom-fields.md) per tutte le persone selezionate:

1. Clicca su **Azioni** → **Imposta campo personalizzato**.
2. Scegli il **Campo personalizzato** Sì/No che vuoi impostare.
3. Scegli il **Valore** (**Sì** o **No**) da applicare.
4. Clicca su **Applica**.

:::info
Per questa azione in blocco sono disponibili solo i campi personalizzati Sì/No. Per impostare altri tipi di campo, modifica ogni persona singolarmente. Se la tua chiesa non ha campi personalizzati Sì/No, la finestra lo segnala.
:::

### Aggiungi al gruppo {#add-to-group}

1. Clicca su **Azioni** → **Aggiungi al gruppo**
2. Scegli il **Gruppo** a cui aggiungere le persone. Per inserirle invece in un gruppo nuovo, spunta **Crea nuovo gruppo** e scrivi un **Nuovo nome gruppo**.
3. Clicca su **Applica**

Ogni persona viene aggiunta come membro normale del gruppo. In seguito puoi promuovere singole persone a leader di gruppo dalla pagina [Membri del gruppo](../groups/group-members.md). Per aggiungere le persone a più gruppi, ripeti l'operazione per ciascun gruppo.

### Rimuovi dal gruppo {#remove-from-group}

1. Clicca su **Azioni** → **Rimuovi dal gruppo**
2. Scegli il **Gruppo** da cui rimuovere le persone
3. Clicca su **Applica**

:::info
Questa azione rimuove soltanto le persone dal gruppo. Non elimina le loro schede.
:::

### Aggiungi a flusso di lavoro {#add-to-workflow}

Aggiungi le persone selezionate a un [flusso di lavoro](../serving/workflows.md) come schede:

1. Clicca su **Azioni** → **Aggiungi a flusso di lavoro**
2. Scegli il flusso di lavoro
3. Clicca su **Applica**

### Elimina persone {#delete-people}

Elimina le persone selezionate dal database della chiesa:

1. Clicca su **Azioni** → **Elimina**
2. La finestra **Elimina persone selezionate** ti chiede di confermare quante persone verranno eliminate
3. Clicca su **Elimina**

:::danger
Le persone eliminate scompaiono dall'anagrafe, dai gruppi e dalle ricerche. Usa questa azione solo se sei certo di voler rimuovere queste persone dal sistema.
:::

Non puoi selezionare te stesso, quindi non puoi eliminare o modificare in blocco la tua scheda.


## Buone pratiche {#best-practices}

- **Inizia con poco** -- Prova le operazioni in blocco su pochi record prima, per essere sicuro di fare le modifiche giuste
- **Usa i filtri** -- Restringi l'elenco con filtri o con la ricerca AI prima di selezionare le persone, così aggiorni solo gli individui giusti
- **Ricontrolla le selezioni** -- Rivedi le persone selezionate prima di applicare le modifiche in blocco
- **Documenta le modifiche importanti** -- Tieni note sugli aggiornamenti in blocco, nel caso ti servano in seguito
- **Coordinati con il team** -- Avvisa gli altri amministratori quando fai modifiche in blocco di grandi dimensioni

## Casi d'uso comuni {#common-use-cases}

### Aggiornare i nuovi membri {#updating-new-members}

Dopo un corso per nuovi membri, imposta come Membro lo stato di tutti i partecipanti:

1. Cerca le persone che hanno frequentato il corso
2. Selezionale tutte
3. Usa **Azioni** → **Imposta stato di membership** → **Membro**

### Organizzare i piccoli gruppi {#organizing-small-groups}

Aggiungi più persone a un nuovo piccolo gruppo:

1. Cerca le persone che vuoi nel gruppo
2. Selezionale
3. Usa **Azioni** → **Aggiungi al gruppo** e scegli il piccolo gruppo

### Pulire i dati {#cleaning-up-data}

Segna come inattivo un gruppo di ex frequentatori:

1. Apri la ricerca **Avanzata** e filtra le persone che vuoi aggiornare (ad esempio, tutte quelle che non frequentano da tempo)
2. Selezionale
3. Usa **Azioni** → **Imposta stato di membership** → **Inattivo**

## Articoli correlati {#related-articles}

- [Cercare persone](./searching-people.md) -- Trova le persone da modificare
- [Ricerca AI](./ai-search.md) -- Usa il linguaggio naturale per trovare gruppi specifici di persone
- [Membri del gruppo](../groups/group-members.md) -- Gestisci le appartenenze ai gruppi
- [Esportare dati](./exporting-data.md) -- Esporta i dati delle persone prima di fare modifiche in blocco
