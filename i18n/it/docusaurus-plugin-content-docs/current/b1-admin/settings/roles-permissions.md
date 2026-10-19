---
title: "Ruoli e permessi"
---

# Ruoli e permessi

<div class="article-intro">

I ruoli ti permettono di controllare a cosa possono accedere i diversi utenti all'interno del tuo account ChurchApps. Puoi creare ruoli personalizzati per il personale, i volontari e gli altri membri del team, ciascuno con il proprio livello di accesso, per mantenere sicuri i tuoi dati.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso da Amministratore di dominio o un ruolo con il permesso di gestire i ruoli
- Procurati un elenco dei membri del team e delle aree a cui hanno bisogno di accedere
- Esamina le categorie di permessi disponibili qui sotto per pianificare i tuoi ruoli

</div>

## Accesso ai ruoli

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Fai clic su **Ruoli**.
3. La pagina Ruoli mostra tutti i ruoli attualmente definiti per la tua chiesa.

## Come è organizzata la pagina Ruoli

La pagina Ruoli è divisa in due riquadri:

- **Lato sinistro** -- Mostra l'elenco dei membri assegnati al ruolo selezionato.
- **Lato destro** -- Mostra le impostazioni dei permessi che puoi configurare per quel ruolo.

Fai clic su un nome di ruolo per visualizzare e gestire i suoi membri e permessi.

## Aggiungere utenti a un ruolo

1. Seleziona il ruolo a cui vuoi aggiungere membri.
2. Usa il **campo di ricerca** sul lato sinistro per trovare la persona che vuoi aggiungere.
3. Seleziona la persona dai risultati della ricerca.
4. Verrà aggiunta al ruolo immediatamente.

## Rimuovere utenti da un ruolo

1. Seleziona il ruolo che contiene l'utente che vuoi rimuovere.
2. Trova la persona nell'elenco dei membri sul lato sinistro.
3. Fai clic sul **pulsante di rimozione** accanto al suo nome.

## Configurare i permessi

Ogni ruolo può ricevere l'accesso a specifiche aree di B1 Admin. Nel riquadro **Modifica permessi**, i permessi sono raggruppati in sezioni che puoi espandere, come **Presenze**, **Contenuti**, **Donazioni**, **Moduli e piani**, **Lezioni**, **Messaggistica**, **Persone e gruppi** e **Attività**. Scrivi nella casella **Filtra permessi** per mostrare solo i permessi corrispondenti.

Seleziona o deseleziona un permesso per concederlo o revocarlo al ruolo.

### Permessi delle donazioni

La sezione **Donazioni** include questi permessi:

- **Visualizza riepiloghi delle donazioni** -- vedi la sezione Donazioni, incluse le pagine Riepilogo, Lotti, Fondi, Campagne ed Estratti conto delle donazioni.
- **Visualizza donazioni** -- vedi le singole donazioni, come i doni contenuti in un lotto.
- **Modifica donazioni** -- controllo completo: aggiungi, modifica ed elimina donazioni e lotti, e [chiudi e riapri i lotti](../donations/batches.md#closing-and-reopening-a-batch).
- **Inserisci donazioni** -- aggiungi lotti e inserisci, modifica o elimina donazioni, ma solo nei lotti ancora aperti. Chi ha solo questo permesso non può eliminare lotti, chiuderli o riaprirli, né modificare i doni arrivati tramite donazioni online.
- **Modifica impostazioni** -- gestisci le impostazioni delle donazioni.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi delle donazioni** vede solo la pagina **Lotti** sotto **Donazioni**. Assegna a un ruolo per il team di conteggio sia **Inserisci donazioni** sia **Visualizza donazioni**, così può aprire un lotto e vedere i doni che ha inserito. Vedi [Chi può modificare un lotto](../donations/batches.md#who-can-change-a-batch) per i dettagli.

### Solo nomi delle persone

La sezione **Persone e gruppi** include **Visualizza solo i nomi delle persone**. Usalo per i volontari che devono cercare persone per nome -- ad esempio per selezionare qualcuno in una casella di ricerca -- senza accesso alla rubrica completa. Con questo solo permesso, una persona:

- Può cercare persone per nome e vedere l'elenco delle persone aggiunte di recente, ma vede solo il nome, la foto e lo stato di appartenenza di ciascuna persona
- Non può cercare per email, vedere i recapiti o aprire la rubrica **Persone**

B1 Admin nasconde i link e i pulsanti che richiedono permessi che un ruolo non possiede. Ad esempio, l'elenco **Tutti i gruppi** è disponibile solo per chi può modificare i gruppi, visualizzare i membri dei gruppi o visualizzare le persone (gli altri vengono riportati alla Dashboard), la configurazione delle presenze compare solo con **Visualizza presenze** o **Modifica servizi**, il pulsante **Email** di un gruppo compare solo per chi ha **Modifica membri del gruppo** (il permesso necessario per inviare email al gruppo), la stampa dell'elenco di un gruppo richiede **Visualizza membri del gruppo** o la guida di quel gruppo, ed eliminare un evento del calendario richiede **Modifica contenuti** (oppure ritirare una tua richiesta in attesa).

:::warning
Gli **Amministratori di dominio** hanno pieno accesso a tutte le aree del tuo account ChurchApps. I loro permessi non possono essere modificati né limitati. Usa questo ruolo solo per i tuoi amministratori di massima fiducia.
:::

:::tip
Crea ruoli specifici come "Tesoriere" con accesso solo a **Donazioni**, "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, oppure "Volontario check-in" con accesso solo a **Presenze**. Questo segue il principio del privilegio minimo e mantiene sicuri i tuoi dati. Vedi [Protezione dei dati](./data-security.md) per saperne di più su come ChurchApps protegge le tue informazioni.
:::
