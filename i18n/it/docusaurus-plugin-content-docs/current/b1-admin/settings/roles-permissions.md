---
title: "Ruoli e autorizzazioni"
description: "Configura i ruoli in B1 Admin per controllare cosa possono vedere e modificare membri dello staff e volontari, dalle donazioni e presenze fino a persone e gruppi."
---

# Ruoli e autorizzazioni

<div class="article-intro">

I ruoli ti permettono di controllare a cosa possono accedere i diversi utenti all'interno del tuo account ChurchApps. Puoi creare ruoli personalizzati per lo staff, i volontari e gli altri membri del team, ciascuno con il proprio livello di accesso, per mantenere sicuri i tuoi dati.

</div>

## Video di formazione {#training-video}

<YouTube id="ZzCIkinVMnE" title="Ruoli, autorizzazioni e invito del team in B1" next="Configurare servizi e presenze in B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso di Amministratore del dominio oppure un ruolo con l'autorizzazione a gestire i ruoli
- Tieni a portata di mano un elenco dei membri del team e delle aree a cui hanno bisogno di accedere
- Esamina le categorie di autorizzazioni disponibili qui sotto per pianificare i tuoi ruoli

</div>

## Accedere ai ruoli {#accessing-roles}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Impostazioni**.
2. Fai clic su **Ruoli**.
3. La pagina Ruoli mostra tutti i ruoli attualmente definiti per la tua chiesa. La colonna **Membri** indica quanti utenti ci sono in ciascun ruolo, e la riga **(Tutti)** mostra **Tutti gli utenti**.

## Creare un ruolo {#creating-a-role}

Fai clic su **Aggiungi ruolo** in cima alla pagina Ruoli. Il menu offre:

- **Aggiungi ruolo personalizzato** -- Apre un modulo **Modifica ruolo** sopra l'elenco. Inserisci un **Nome ruolo** e fai clic su **Salva**. Il nuovo ruolo parte senza alcuna autorizzazione.
- **Aggiungi ruolo "Contabilità"**, **Aggiungi ruolo "Personale della chiesa"**, **Aggiungi ruolo "Amministratore contenuti"** e **Aggiungi ruolo "Amministratore lezioni"** -- Ruoli già pronti con un insieme sensato di autorizzazioni già selezionate. B1 chiede conferma, poi crea il ruolo. Puoi modificarne le autorizzazioni in seguito, come per qualsiasi altro ruolo.

## Rinominare o eliminare un ruolo {#renaming-or-deleting-a-role}

Passa sopra la riga di un ruolo e fai clic su **Modifica**. Nel modulo **Modifica ruolo**, cambia il **Nome ruolo** e fai clic su **Salva**, oppure fai clic su **Elimina** e conferma per rimuovere il ruolo. Il ruolo **Amministratori del dominio** non può essere eliminato.

## Capire la pagina di un ruolo {#understanding-a-roles-page}

Fai clic sul nome di un ruolo per aprirne la pagina. Ha due pannelli:

- **Membri** (a sinistra) -- Le persone del ruolo, con nome ed email.
- **Modifica autorizzazioni** (a destra) -- Le autorizzazioni che puoi concedere al ruolo.

La riga **(Tutti)** apre una pagina per le autorizzazioni che si applicano a ogni utente della tua chiesa; non ha un elenco di membri.

## Aggiungere utenti a un ruolo {#adding-users-to-a-role}

1. Apri il ruolo e fai clic su **Aggiungi** nel pannello **Membri**. Si apre un modulo **Aggiungi a** per quel ruolo.
2. Digita un nome o un'email nella casella di ricerca e fai clic sul pulsante di ricerca.
3. Fai clic sul pulsante di aggiunta accanto alla persona. Viene aggiunta al ruolo immediatamente, e B1 ti propone di inviarle un'email di invito per poter accedere.
4. Se la persona non fa ancora parte della tua chiesa, fai clic su **Crea nuovo utente** sotto i risultati della ricerca, inserisci **Nome**, **Cognome** ed **Email**, e fai clic su **Salva**.

Per modificare il nome o l'email di un membro, fai clic sull'icona di modifica nella sua riga.

## Rimuovere utenti da un ruolo {#removing-users-from-a-role}

1. Apri il ruolo che contiene l'utente da rimuovere.
2. Trova la persona nell'elenco **Membri**.
3. Fai clic sull'icona di eliminazione nella sua riga e conferma.

La tua chiesa deve avere sempre almeno un Amministratore del dominio, quindi l'ultimo membro di **Amministratori del dominio** non può essere rimosso.

## Configurare le autorizzazioni {#configuring-permissions}

A ogni ruolo può essere concesso l'accesso ad aree specifiche di B1 Admin. Nel pannello **Modifica autorizzazioni**, le autorizzazioni sono raggruppate in sezioni che puoi espandere, come **Presenze**, **Contenuti**, **Donazioni**, **Moduli e piani**, **Lezioni**, **Messaggistica**, **Persone e gruppi** e **Attività**. Digita nella casella **Filtra autorizzazioni** per mostrare solo quelle che corrispondono.

Seleziona o deseleziona un'autorizzazione per concederla o toglierla al ruolo. Ogni modifica viene salvata subito; non c'è un pulsante Salva. Nota che **Modifica impostazioni chiesa**, che apre la pagina Impostazioni, si trova nella sezione **Contenuti**. L'intestazione di ogni sezione mostra quante delle sue autorizzazioni possiede il ruolo, ad esempio **2 su 5**, e il conteggio si aggiorna man mano che selezioni e deselezioni le caselle.

### Autorizzazioni per le donazioni {#donations-permissions}

La sezione **Donazioni** contiene queste autorizzazioni:

- **Visualizza riepiloghi donazioni** -- vedere la sezione Donazioni, incluse le pagine Riepilogo, Lotti, Fondi, Campagne ed Estratti conto delle donazioni.
- **Visualizza donazioni** -- vedere le singole donazioni, come le offerte contenute in un lotto.
- **Modifica donazioni** -- controllo completo: aggiungere, modificare ed eliminare donazioni e lotti, e [chiudere e riaprire i lotti](../donations/batches.md#closing-and-reopening-a-batch).
- **Inserisci donazioni** -- aggiungere lotti e inserire, modificare o eliminare donazioni, ma solo nei lotti ancora aperti. Chi ha solo questa autorizzazione non può eliminare lotti, chiuderli o riaprirli, né modificare le offerte arrivate tramite le donazioni online.
- **Modifica impostazioni** -- gestire le impostazioni delle donazioni.

Chi ha **Inserisci donazioni** ma non **Visualizza riepiloghi donazioni** vede solo la pagina **Lotti** sotto **Donazioni**. Assegna a un team di conteggio sia **Inserisci donazioni** sia **Visualizza donazioni**, così può aprire un lotto e vedere le offerte che ha inserito. Vedi [Chi può modificare un lotto](../donations/batches.md#who-can-change-a-batch) per i dettagli.

### Solo nomi delle persone {#people-names-only}

La sezione **Persone e gruppi** include **Visualizza solo i nomi delle persone**. Usala per i volontari che devono cercare le persone per nome — ad esempio, per selezionare qualcuno in una casella di ricerca — senza accesso all'intera anagrafica. Con questa sola autorizzazione, una persona:

- Può cercare le persone per nome e vedere l'elenco delle persone aggiunte di recente, ma vede solo il nome, la foto e lo stato di appartenenza di ciascuna persona
- Non può cercare per email, vedere i recapiti o aprire l'**anagrafica** delle Persone

Abbina **Visualizza solo i nomi delle persone** a **Visualizza presenze** o **Modifica presenze** per i volontari che registrano le presenze alle lezioni. Nel loro menu, **Persone** apre allora **Gruppi**, dove possono aprire l'elenco **Tutti i gruppi** e vedere i nomi dei membri e le sessioni di ciascuna classe. Con **Modifica presenze** possono anche [registrare le presenze](../attendance/recording-attendance.md) e aggiungere visitatori cercandoli per nome. I nomi non sono collegamenti alle schede delle persone, e i gruppi riservati restano nascosti a meno che il volontario non ne sia membro.

B1 Admin nasconde i collegamenti e i pulsanti che richiedono autorizzazioni che un ruolo non ha. Ad esempio, l'elenco **Tutti i gruppi** è disponibile solo per chi può modificare i gruppi, visualizzare i membri dei gruppi o visualizzare le persone, oppure per chi ha **Visualizza solo i nomi delle persone** insieme a **Visualizza presenze** o **Modifica presenze** (gli altri vengono rimandati alla Dashboard); la configurazione delle presenze compare solo con **Modifica servizi**; il pulsante **Email** di un gruppo compare solo per chi ha **Modifica membri del gruppo** (l'autorizzazione necessaria per inviare email di gruppo); stampare l'elenco di un gruppo richiede **Visualizza membri del gruppo** oppure essere il responsabile di quel gruppo; eliminare un evento del calendario richiede **Modifica contenuti** (oppure ritirare la propria richiesta in attesa).

### Account del chiosco di check-in {#check-in-kiosk-accounts}

L'account che accede a un chiosco [B1 Checkin](../../b1-checkin/getting-started/logging-in.md) ha bisogno dell'autorizzazione **Check-in** nella sezione **Presenze** (oppure **Modifica presenze**). Con la sola **Check-in**, il chiosco può cercare le famiglie per nome o telefono, registrarne l'ingresso e l'uscita, e mostrare chi può ritirare un bambino, senza accesso all'anagrafica delle Persone.

Il check-in non viene più concesso tramite la riga **(Tutti)**. Far parte di un ruolo con altre autorizzazioni non permette a nessuno di gestire il chiosco; aggiungi **Check-in** a un ruolo come "Volontari del check-in" e inserisci lì gli account dei chioschi.

:::warning
Gli **Amministratori del dominio** hanno pieno accesso a tutte le aree del tuo account ChurchApps. Le loro autorizzazioni non possono essere modificate né limitate. Usa questo ruolo solo per gli amministratori di maggiore fiducia.
:::

:::tip
Crea ruoli specifici come "Tesoriere" con il solo accesso a **Donazioni**, "Team di conteggio" con **Inserisci donazioni** e **Visualizza donazioni**, oppure "Volontario del check-in" con il solo accesso a **Presenze**. È il principio del privilegio minimo, e mantiene sicuri i tuoi dati. Vedi [Sicurezza dei dati](./data-security.md) per saperne di più su come ChurchApps protegge le tue informazioni.
:::
