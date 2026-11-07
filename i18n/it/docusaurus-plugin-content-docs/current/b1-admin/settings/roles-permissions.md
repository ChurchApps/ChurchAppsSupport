---
title: "Ruoli e permessi"
description: "Configura i ruoli in B1 Admin per decidere cosa staff e volontari possono vedere e modificare, dalle donazioni e presenze alle persone e ai gruppi."
---

# Ruoli e permessi

<div class="article-intro">

I ruoli ti permettono di controllare cosa possono fare i diversi utenti all'interno del tuo account ChurchApps. Puoi creare ruoli personalizzati per personale, volontari e altri membri del team, ciascuno con il proprio livello di accesso per mantenere sicuri i tuoi dati.

</div>

## Video di formazione

<YouTube id="ZzCIkinVMnE" title="Ruoli, permessi e invito del team in B1" next="Configurare culti e presenze in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso **Amministratore di dominio** oppure un ruolo con il permesso di gestire i ruoli
- Tieni pronto un elenco dei membri del team e delle aree a cui devono accedere
- Esamina le categorie di permessi disponibili qui sotto per pianificare i tuoi ruoli

</div>

## Accedere ai ruoli

1. In B1 Admin, apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Clicca su **Ruoli**.
3. La pagina Ruoli mostra tutti i ruoli attualmente definiti per la tua chiesa. La colonna **Membri** indica quanti utenti sono in ciascun ruolo, e la riga **(Tutti)** mostra **Tutti gli utenti**.

## Capire la pagina Ruoli

La pagina Ruoli è divisa in due pannelli:

- **Lato sinistro** -- Mostra l'elenco dei membri assegnati al ruolo selezionato.
- **Lato destro** -- Mostra le impostazioni dei permessi che puoi configurare per quel ruolo.

Clicca sul nome di un ruolo qualsiasi per vedere e gestire i suoi membri e i suoi permessi.

## Aggiungere utenti a un ruolo

1. Seleziona il ruolo a cui vuoi aggiungere dei membri.
2. Usa il **campo di ricerca** sul lato sinistro per trovare la persona che vuoi aggiungere.
3. Seleziona la persona dai risultati della ricerca.
4. Verrà aggiunta al ruolo immediatamente.

## Rimuovere utenti da un ruolo

1. Seleziona il ruolo che contiene l'utente che vuoi rimuovere.
2. Trova la persona nell'elenco dei membri sul lato sinistro.
3. Clicca sul **pulsante rimuovi** accanto al suo nome.

## Configurare i permessi

Ogni ruolo può ricevere l'accesso a specifiche aree di B1 Admin. Nel pannello **Modifica permessi**, i permessi sono raggruppati in sezioni che puoi espandere, come **Presenze**, **Contenuti**, **Donazioni**, **Moduli e piani**, **Lezioni**, **Messaggistica**, **Persone e gruppi** e **Attività**. Digita nella casella **Filtra permessi** per mostrare solo i permessi corrispondenti.

Seleziona o deseleziona un permesso per concederlo o rimuoverlo dal ruolo. Ogni intestazione di sezione mostra quanti dei suoi permessi ha il ruolo, ad esempio **2 di 5**, e il conteggio si aggiorna man mano che selezioni e deselezioni le caselle.

### Permessi per le donazioni

La sezione **Donazioni** contiene questi permessi:

- **Visualizza riepiloghi donazioni** -- vedere la sezione Donazioni, comprese le pagine Riepilogo, Lotti, Fondi, Campagne e Ricevute di donazione.
- **Visualizza donazioni** -- vedere le singole donazioni, come le offerte all'interno di un lotto.
- **Modifica donazioni** -- controllo completo: aggiungere, modificare ed eliminare donazioni e lotti, e [chiudere e riaprire i lotti](../donations/batches.md#closing-and-reopening-a-batch).
- **Inserisci donazioni** -- aggiungere lotti e inserire, modificare o eliminare donazioni, ma solo nei lotti ancora aperti. Chi ha solo questo permesso non può eliminare lotti, chiuderli o riaprirli, né modificare le offerte arrivate tramite le donazioni online.
- **Modifica impostazioni** -- gestire le impostazioni delle donazioni.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi donazioni** vede solo la pagina **Lotti** sotto **Donazioni**. Dai a un ruolo di team di conteggio sia **Inserisci donazioni** sia **Visualizza donazioni**, così possono aprire un lotto e vedere le offerte che hanno inserito. Per i dettagli, vedi [Chi può modificare un lotto](../donations/batches.md#who-can-change-a-batch).

### Solo nomi delle persone {#people-names-only}

La sezione **Persone e gruppi** include **Visualizza solo i nomi delle persone**. Usalo per i volontari che devono cercare le persone per nome -- ad esempio per scegliere qualcuno in una casella di ricerca -- senza accedere alla rubrica completa. Con questo permesso da solo, una persona:

- Può cercare le persone per nome e vedere l'elenco delle persone aggiunte di recente, ma vede solo il nome, la foto e lo stato di appartenenza di ciascuna persona
- Non può cercare per email, vedere i recapiti o aprire la rubrica **Persone**

Abbina **Visualizza solo i nomi delle persone** a **Visualizza presenze** o **Modifica presenze** per i volontari che fanno l'appello delle classi. **Persone** nel loro menu apre quindi **Gruppi**, dove possono aprire l'elenco **Tutti i gruppi** e vedere i nomi dei membri e le sessioni di ciascuna classe. Con **Modifica presenze** possono anche [registrare le presenze](../attendance/recording-attendance.md) e aggiungere visitatori cercandone i nomi. I nomi non sono link alle schede delle persone, e i gruppi riservati restano nascosti a meno che il volontario non ne sia membro.

B1 Admin nasconde i link e i pulsanti che richiedono permessi che un ruolo non ha. Ad esempio, l'elenco **Tutti i gruppi** è disponibile solo per chi può modificare i gruppi, visualizzare i membri dei gruppi o visualizzare le persone, oppure per chi ha **Visualizza solo i nomi delle persone** insieme a **Visualizza presenze** o **Modifica presenze** (gli altri vengono riportati alla Dashboard); la configurazione delle presenze compare solo con **Modifica culti**; il pulsante **Email** di un gruppo compare solo per chi ha **Modifica membri del gruppo** (il permesso necessario per inviare email di gruppo); stampare l'elenco di un gruppo richiede **Visualizza membri del gruppo** oppure essere il leader di quel gruppo; eliminare un evento del calendario richiede **Modifica contenuti** (oppure ritirare una tua richiesta in sospeso).

### Account del chiosco di check-in {#check-in-kiosk-accounts}

L'account che accede a un chiosco [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) ha bisogno del permesso **Checkin** nella sezione **Presenze** (oppure **Modifica presenze**). Con il solo **Checkin**, il chiosco può cercare le famiglie per nome o telefono, registrarne il check-in e il check-out, e mostrare chi può ritirare un bambino, senza accedere alla rubrica Persone.

Il check-in non viene più concesso tramite la riga **(Tutti)**. Essere in un ruolo con altri permessi non permette a qualcuno di gestire il chiosco; aggiungi **Checkin** a un ruolo come "Volontari del check-in" e inserisci lì gli account del chiosco.

:::warning
Gli **Amministratori di dominio** hanno pieno accesso a tutte le aree del tuo account ChurchApps. I loro permessi non possono essere modificati né limitati. Usa questo ruolo solo per i tuoi amministratori di massima fiducia.
:::

:::tip
Crea ruoli specifici come "Tesoriere" con il solo accesso a **Donazioni**, "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, oppure "Volontario del check-in" con il solo accesso a **Presenze**. Questo segue il principio del privilegio minimo e mantiene sicuri i tuoi dati. Per saperne di più su come ChurchApps protegge le tue informazioni, vedi [Sicurezza dei dati](./data-security.md).
:::
