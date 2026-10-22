---
title: "Ruoli e permessi"
---

# Ruoli e permessi {#roles--permissions}

<div class="article-intro">

I ruoli ti permettono di controllare cosa possono accedere i diversi utenti all'interno del tuo account ChurchApps. Puoi creare ruoli personalizzati per personale, volontari e altri membri del team, ognuno con il proprio livello di accesso per proteggere i tuoi dati.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso Domain Admin o un ruolo con il permesso di gestire i ruoli
- Tieni a portata di mano un elenco dei membri del team e delle aree a cui ciascuno deve accedere
- Esamina le categorie di permessi disponibili qui sotto per pianificare i tuoi ruoli

</div>

## Accedere ai ruoli {#accessing-roles}

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Fai clic su **Ruoli**.
3. La pagina Ruoli mostra tutti i ruoli attualmente definiti per la tua chiesa.

## Capire la pagina Ruoli {#understanding-the-roles-page}

La pagina Ruoli è divisa in due pannelli:

- **Lato sinistro** -- Mostra l'elenco dei membri assegnati al ruolo selezionato.
- **Lato destro** -- Mostra le impostazioni dei permessi che puoi configurare per quel ruolo.

Fai clic sul nome di un ruolo per visualizzarne e gestirne i membri e i permessi.

## Aggiungere utenti a un ruolo {#adding-users-to-a-role}

1. Seleziona il ruolo a cui vuoi aggiungere membri.
2. Usa il **campo di ricerca** a sinistra per trovare la persona che vuoi aggiungere.
3. Seleziona la persona dai risultati della ricerca.
4. Verrà aggiunta al ruolo immediatamente.

## Rimuovere utenti da un ruolo {#removing-users-from-a-role}

1. Seleziona il ruolo che contiene l'utente che vuoi rimuovere.
2. Trova la persona nell'elenco dei membri a sinistra.
3. Fai clic sul **pulsante di rimozione** accanto al suo nome.

## Configurare i permessi {#configuring-permissions}

A ogni ruolo si può concedere l'accesso a specifiche aree di B1 Admin. Nel pannello **Modifica permessi** i permessi sono raggruppati in sezioni che puoi espandere, come **Presenze**, **Contenuti**, **Donazioni**, **Moduli e piani**, **Lezioni**, **Messaggistica**, **Persone e gruppi** e **Attività**. Digita nella casella **Filtra permessi** per mostrare solo i permessi corrispondenti.

Seleziona o deseleziona un permesso per concederlo o rimuoverlo dal ruolo.

### Permessi delle donazioni {#donations-permissions}

La sezione **Donazioni** contiene questi permessi:

- **Visualizza riepiloghi delle donazioni** -- vedere la sezione Donazioni, incluse le pagine Riepilogo, Lotti, Fondi, Campagne ed Estratti conto delle donazioni.
- **Visualizza donazioni** -- vedere le singole donazioni, come i doni all'interno di un lotto.
- **Modifica donazioni** -- controllo completo: aggiungere, modificare ed eliminare donazioni e lotti, e [chiudere e riaprire i lotti](../donations/batches.md#closing-and-reopening-a-batch).
- **Inserisci donazioni** -- aggiungere lotti e inserire, modificare o eliminare donazioni, ma solo nei lotti ancora aperti. Chi ha solo questo permesso non può eliminare lotti, chiuderli o riaprirli, né modificare i doni arrivati tramite donazioni online.
- **Modifica impostazioni** -- gestire le impostazioni delle donazioni.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi delle donazioni** vede solo la pagina **Lotti** sotto **Donazioni**. Assegna a un ruolo del team di conteggio sia **Inserisci donazioni** sia **Visualizza donazioni**, così possono aprire un lotto e vedere i doni che hanno inserito. Consulta [Chi può modificare un lotto](../donations/batches.md#who-can-change-a-batch) per i dettagli.

### Solo nomi delle persone {#people-names-only}

La sezione **Persone e gruppi** include **Visualizza solo i nomi delle persone**. Usalo per i volontari che devono cercare persone per nome, ad esempio per sceglierne una in una casella di ricerca, senza accesso alla rubrica completa. Con questo solo permesso, una persona:

- Può cercare persone per nome e vedere l'elenco delle persone aggiunte di recente, ma vede solo nome, foto e stato di membro di ciascuna persona
- Non può cercare per email, vedere i recapiti o aprire la rubrica **Persone**

Abbina **Visualizza solo i nomi delle persone** a **Visualizza presenze** o **Modifica presenze** per i volontari che registrano le presenze in classe. La voce **Persone** nel loro menu apre quindi **Gruppi**, dove possono aprire l'elenco **Tutti i gruppi** e vedere i nomi dei membri e le sessioni di ogni classe. Con **Modifica presenze** possono anche [registrare le presenze](../attendance/recording-attendance.md) e aggiungere visitatori cercandone il nome. I nomi non sono link ai profili delle persone, e i gruppi riservati restano nascosti a meno che il volontario non ne sia membro.

B1 Admin nasconde i link e i pulsanti che richiedono permessi che un ruolo non ha. Ad esempio, l'elenco **Tutti i gruppi** è disponibile solo per chi può modificare i gruppi, visualizzare i membri dei gruppi o visualizzare le persone, oppure per chi ha **Visualizza solo i nomi delle persone** insieme a **Visualizza presenze** o **Modifica presenze** (gli altri vengono rimandati alla Dashboard). La configurazione delle presenze compare solo con **Visualizza presenze** o **Modifica servizi**. Il pulsante **Email** di un gruppo compare solo per chi ha **Modifica membri del gruppo** (il permesso necessario per inviare email di gruppo), la stampa dell'elenco di un gruppo richiede **Visualizza membri del gruppo** oppure essere il responsabile di quel gruppo, ed eliminare un evento del calendario richiede **Modifica contenuti** (oppure ritirare la tua richiesta in sospeso).

:::warning
I **Domain Admin** hanno accesso completo a tutte le aree del tuo account ChurchApps. I loro permessi non possono essere modificati o limitati. Usa questo ruolo solo per i tuoi amministratori di massima fiducia.
:::

:::tip
Crea ruoli specifici come "Tesoriere" con solo accesso a **Donazioni**, "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, oppure "Volontario check-in" con solo accesso a **Presenze**. Questo segue il principio del privilegio minimo e protegge i tuoi dati. Consulta [Sicurezza dei dati](./data-security.md) per saperne di più su come ChurchApps protegge le tue informazioni.
:::
