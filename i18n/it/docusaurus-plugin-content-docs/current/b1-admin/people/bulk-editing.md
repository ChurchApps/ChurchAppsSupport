---
title: "Modifica in blocco delle persone"
---

# Modifica in blocco delle persone

<div class="article-intro">
La modifica in blocco ti consente di aggiornare più persone contemporaneamente, risparmiando tempo quando si effettua la stessa modifica a molti individui. Puoi aggiornare lo stato di appartenenza, lo stato civile, il genere, le preferenze di opt-out e le appartenenze ai gruppi in un'unica operazione.
</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno del permesso per gestire i dati delle persone. Vedi [Ruoli e permessi](./roles-permissions.md) per i dettagli.
- Dovresti aver già aggiunto o importato le persone che vuoi modificare. Vedi [Aggiungere persone](./adding-people.md) se necessario.
</div>

## Selezionare persone per la modifica in blocco

1. Naviga su **Persone** in B1 Admin
2. Usa la ricerca o gli strumenti di filtro per trovare le persone che vuoi aggiornare
3. Seleziona le caselle accanto al nome di ogni persona per selezionarle
   - Puoi selezionare le persone individualmente
   - Oppure usa la casella di selezione nell'intestazione per selezionare tutte le persone visibili nella pagina corrente
4. Una volta selezionata almeno una persona, apparirà il pulsante **Azioni in blocco**

:::tip
Se devi aggiornare un grande gruppo di persone in base a criteri specifici, usa la funzione [Ricerca IA](./ai-search.md) o i filtri per restringere prima il tuo elenco, quindi seleziona tutte le persone corrispondenti.
:::

## Azioni in blocco disponibili

Il menu **Azioni in blocco** fornisce diverse opzioni:

### Aggiorna stato di appartenenza

Aggiorna lo stato di appartenenza per tutte le persone selezionate:

1. Clicca su **Azioni in blocco** → **Imposta stato di appartenenza**
2. Scegli il nuovo stato:
   - **Visitatore** -- Partecipanti per la prima volta o occasionali
   - **Partecipante regolare** -- Partecipanti frequenti che non sono membri
   - **Membro** -- Membri ufficiali della chiesa
   - **Staff** -- Membri dello staff della chiesa
   - **Inattivo** -- Persone che non partecipano più
3. Scegli la modalità di aggiornamento:
   - **Sovrascrivi tutto** -- Sostituisci lo stato corrente per tutte le persone selezionate
   - **Aggiorna solo vuoti** -- Imposta lo stato solo per le persone che non ne hanno uno
4. Clicca su **Aggiorna**

### Aggiorna stato civile

Aggiorna lo stato civile in blocco:

1. Clicca su **Azioni in blocco** → **Imposta stato civile**
2. Seleziona il nuovo stato:
   - **Sconosciuto**
   - **Singolo**
   - **Sposato**
   - **Divorziato**
   - **Vedovo**
3. Scegli se sovrascrivere i valori esistenti o aggiornare solo i campi vuoti
4. Clicca su **Aggiorna**

### Aggiorna genere

Aggiorna le informazioni sul genere per più persone:

1. Clicca su **Azioni in blocco** → **Imposta genere**
2. Seleziona il valore:
   - **Non specificato**
   - **Maschio**
   - **Femmina**
3. Scegli la modalità di aggiornamento (sovrascrivi tutto o solo vuoti)
4. Clicca su **Aggiorna**

### Aggiorna stato di opt-out

Controlla se le persone hanno scelto di non ricevere comunicazioni:

1. Clicca su **Azioni in blocco** → **Imposta opt-out**
2. Scegli:
   - **No** -- Consenti comunicazioni (rimuovi opt-out)
   - **Sì** -- Blocca comunicazioni (imposta opt-out)
3. Scegli la modalità di aggiornamento
4. Clicca su **Aggiorna**

:::warning
Fai attenzione quando cambi lo stato di opt-out. Le persone che hanno esplicitamente scelto di non ricevere comunicazioni non dovrebbero riceverle a meno che non abbiano dato un nuovo consenso.
:::

### Aggiungi al gruppo

Aggiungi tutte le persone selezionate a uno o più gruppi:

1. Clicca su **Azioni in blocco** → **Aggiungi al gruppo**
2. Cerca e seleziona il/i gruppo/i a cui aggiungere le persone
3. Puoi selezionare più gruppi per aggiungere persone a tutti
4. Clicca su **Aggiungi ai gruppi**

Ogni persona verrà aggiunta come membro regolare del/i gruppo/i selezionato/i. Puoi successivamente promuovere individui a leader di gruppo se necessario dalla pagina [Membri del gruppo](../groups/group-members.md).

### Rimuovi dal gruppo

Rimuovi tutte le persone selezionate da uno o più gruppi:

1. Clicca su **Azioni in blocco** → **Rimuovi dal gruppo**
2. Cerca e seleziona il/i gruppo/i da cui rimuovere le persone
3. Puoi selezionare più gruppi
4. Clicca su **Rimuovi dai gruppi**

:::info
Questa azione rimuove solo le persone dai gruppi specificati. Non elimina i loro record personali.
:::

### Elimina persone

Elimina definitivamente le persone selezionate dal tuo database della chiesa:

1. Clicca su **Azioni in blocco** → **Elimina**
2. Rivedi l'elenco delle persone che verranno eliminate
3. Digita **DELETE** nel campo di conferma
4. Clicca su **Conferma eliminazione**

:::danger
L'eliminazione delle persone è permanente e non può essere annullata. Questo rimuoverà tutti i loro dati inclusi:
- Informazioni personali
- Appartenenze ai gruppi
- Record di presenza
- Cronologia delle donazioni
- Invii di moduli

Usa questa azione solo se sei assolutamente certo di voler rimuovere queste persone dal tuo sistema.
:::

## Risultati della modifica in blocco

Dopo aver completato un'azione in blocco, vedrai un riepilogo che mostra:

- **Totale selezionato** -- Quante persone sono state incluse nell'operazione
- **Aggiornate con successo** -- Quanti record sono stati modificati
- **Fallite** -- Eventuali record che non sono stati aggiornati (se applicabile)
- **Non modificate** -- Record che non necessitavano di modifiche (ad es., quando si usa la modalità "aggiorna solo vuoti")

Se alcuni aggiornamenti sono falliti, vedrai i dettagli dell'errore che spiegano il motivo.

## Migliori pratiche

- **Inizia in piccolo** -- Testa le operazioni in blocco su pochi record prima per assicurarti di effettuare le modifiche corrette
- **Usa i filtri** -- Restringi il tuo elenco con filtri o ricerca IA prima di selezionare le persone per assicurarti di aggiornare solo gli individui giusti
- **Controlla due volte le selezioni** -- Rivedi le persone selezionate prima di applicare modifiche in blocco
- **Usa la modalità "aggiorna solo vuoti"** -- Quando vuoi compilare dati mancanti senza sovrascrivere informazioni esistenti
- **Documenta le modifiche importanti** -- Conserva note sugli aggiornamenti in blocco nel caso tu debba farvi riferimento in seguito
- **Coordina con il tuo team** -- Informa gli altri amministratori quando effettui grandi modifiche in blocco

## Casi d'uso comuni

### Aggiornamento di nuovi membri

Dopo un corso di appartenenza, aggiorna tutti i partecipanti allo stato di Membro:

1. Cerca le persone che hanno partecipato al corso
2. Selezionale tutte
3. Usa **Azioni in blocco** → **Imposta stato di appartenenza** → **Membro**

### Organizzazione di piccoli gruppi

Aggiungi più persone a un nuovo piccolo gruppo:

1. Cerca le persone che vuoi nel gruppo
2. Selezionale
3. Usa **Azioni in blocco** → **Aggiungi al gruppo** e seleziona il piccolo gruppo

### Pulizia dei dati

Compila lo stato civile mancante per le coppie sposate:

1. Filtra per persone sposate (usando informazioni sulla famiglia)
2. Seleziona quelle con stato civile vuoto
3. Usa **Azioni in blocco** → **Imposta stato civile** → **Sposato** → **Aggiorna solo vuoti**

## Articoli correlati

- [Ricerca di persone](./searching-people.md) -- Trova persone da modificare
- [Ricerca IA](./ai-search.md) -- Usa il linguaggio naturale per trovare gruppi specifici di persone
- [Membri del gruppo](../groups/group-members.md) -- Gestisci l'appartenenza ai gruppi
- [Esportazione di dati](./exporting-data.md) -- Esporta dati delle persone prima di effettuare modifiche in blocco
