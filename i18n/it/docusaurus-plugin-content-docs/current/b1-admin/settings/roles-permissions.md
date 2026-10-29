---
title: "Ruoli e permessi"
---

# Ruoli e permessi

<div class="article-intro">

I ruoli ti permettono di controllare cosa possono fare i diversi utenti all'interno del tuo account ChurchApps. Puoi creare ruoli personalizzati per il personale, i volontari e gli altri membri del team, ciascuno con il proprio livello di accesso per proteggere i tuoi dati.

</div>

## Video tutorial

<YouTube id="ZzCIkinVMnE" title="Ruoli, permessi e invito del team in B1" next="Configurare servizi e presenze in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso di Amministratore di dominio oppure un ruolo con il permesso di gestire i ruoli
- Tieni pronto un elenco dei membri del team e delle aree a cui devono accedere
- Consulta le categorie di permessi disponibili qui sotto per pianificare i tuoi ruoli

</div>

## Accedere ai ruoli

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Clicca su **Ruoli**.
3. La pagina Ruoli mostra tutti i ruoli definiti per la tua chiesa. La colonna **Membri** indica quanti utenti ci sono in ogni ruolo, e la riga **(Tutti)** mostra **Tutti gli utenti**.

## Come è organizzata la pagina Ruoli

La pagina Ruoli è divisa in due pannelli:

- **Lato sinistro** -- Mostra l'elenco dei membri assegnati al ruolo selezionato.
- **Lato destro** -- Mostra le impostazioni dei permessi che puoi configurare per quel ruolo.

Clicca sul nome di un ruolo per vedere e gestire i suoi membri e i suoi permessi.

## Aggiungere utenti a un ruolo

1. Seleziona il ruolo a cui vuoi aggiungere membri.
2. Usa il **campo di ricerca** sul lato sinistro per trovare la persona che ti interessa.
3. Seleziona la persona dai risultati della ricerca.
4. Verrà aggiunta al ruolo immediatamente.

## Rimuovere utenti da un ruolo

1. Seleziona il ruolo che contiene l'utente da rimuovere.
2. Trova la persona nell'elenco dei membri sul lato sinistro.
3. Clicca sul **pulsante di rimozione** accanto al suo nome.

## Configurare i permessi

A ogni ruolo si può concedere l'accesso a specifiche aree di B1 Admin. Nel pannello **Modifica permessi** i permessi sono raggruppati in sezioni che puoi espandere, come **Presenze**, **Contenuti**, **Donazioni**, **Moduli e piani**, **Lezioni**, **Messaggistica**, **Persone e gruppi** e **Attività**. Scrivi nella casella **Filtra permessi** per mostrare solo i permessi corrispondenti.

Seleziona o deseleziona un permesso per concederlo o rimuoverlo dal ruolo. Ogni intestazione di sezione mostra quanti dei suoi permessi ha il ruolo, ad esempio **2 su 5**, e il conteggio si aggiorna man mano che selezioni o deselezioni le caselle.

### Permessi Donazioni

La sezione **Donazioni** contiene questi permessi:

- **Visualizza riepiloghi donazioni** -- vedere la sezione Donazioni, incluse le pagine Riepilogo, Lotti, Fondi, Campagne ed Estratti conto delle offerte.
- **Visualizza donazioni** -- vedere le singole donazioni, come le offerte contenute in un lotto.
- **Modifica donazioni** -- controllo completo: aggiungere, modificare ed eliminare donazioni e lotti, e [chiudere e riaprire i lotti](../donations/batches.md#closing-and-reopening-a-batch).
- **Inserisci donazioni** -- aggiungere lotti e inserire, modificare o eliminare donazioni, ma solo nei lotti ancora aperti. Chi ha solo questo permesso non può eliminare lotti, chiuderli o riaprirli, né modificare le offerte arrivate tramite donazioni online.
- **Modifica impostazioni** -- gestire le impostazioni delle donazioni.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi donazioni** vede solo la pagina **Lotti** sotto **Donazioni**. Assegna a un team di conteggio sia **Inserisci donazioni** sia **Visualizza donazioni**, così possono aprire un lotto e vedere le offerte che hanno inserito. Vedi [Chi può modificare un lotto](../donations/batches.md#who-can-change-a-batch) per i dettagli.

### Solo nomi delle persone

La sezione **Persone e gruppi** include **Visualizza solo i nomi delle persone**. Usalo per i volontari che devono cercare le persone per nome -- ad esempio per sceglierne una in un campo di ricerca -- senza accesso alla rubrica completa. Con questo solo permesso, una persona:

- Può cercare persone per nome e vedere l'elenco delle persone aggiunte di recente, ma vede solo il nome, la foto e lo stato di appartenenza di ciascuna persona
- Non può cercare per email, vedere i recapiti o aprire la **rubrica** delle persone

Abbina **Visualizza solo i nomi delle persone** a **Visualizza presenze** o **Modifica presenze** per i volontari che fanno l'appello in classe. La voce **Persone** del loro menu apre allora **Gruppi**, dove possono aprire l'elenco **Tutti i gruppi** e vedere i nomi dei membri e le sessioni di ogni classe. Con **Modifica presenze** possono anche [registrare le presenze](../attendance/recording-attendance.md) e aggiungere visitatori cercandoli per nome. I nomi non sono collegamenti alle schede delle persone, e i gruppi riservati restano nascosti se il volontario non ne è membro.

B1 Admin nasconde i link e i pulsanti che richiedono permessi che un ruolo non ha. Ad esempio, l'elenco **Tutti i gruppi** è disponibile solo per chi può modificare i gruppi, visualizzare i membri dei gruppi o visualizzare le persone, oppure per chi ha **Visualizza solo i nomi delle persone** insieme a **Visualizza presenze** o **Modifica presenze** (gli altri vengono rimandati alla Dashboard). La configurazione delle presenze compare solo con **Visualizza presenze** o **Modifica servizi**. Il pulsante **Email** di un gruppo compare solo per chi ha **Modifica membri del gruppo** (il permesso necessario per inviare email di gruppo). Stampare l'elenco di un gruppo richiede **Visualizza membri del gruppo** oppure essere il leader di quel gruppo, e eliminare un evento del calendario richiede **Modifica contenuti** (oppure ritirare una tua richiesta in sospeso).

:::warning
Gli **Amministratori di dominio** hanno pieno accesso a tutte le aree del tuo account ChurchApps. I loro permessi non possono essere modificati né limitati. Usa questo ruolo solo per gli amministratori di cui ti fidi di più.
:::

:::tip
Crea ruoli specifici come "Tesoriere" con il solo accesso a **Donazioni**, "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, oppure "Volontario check-in" con il solo accesso a **Presenze**. Questo segue il principio del minimo privilegio e mantiene sicuri i tuoi dati. Vedi [Sicurezza dei dati](./data-security.md) per saperne di più su come ChurchApps protegge le tue informazioni.
:::
