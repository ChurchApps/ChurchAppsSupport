---
title: "Assegnare i ruoli"
---

# Assegnare i ruoli

<div class="article-intro">

B1 Admin usa un sistema di permessi basato sui ruoli per controllare ciò che ogni utente del tuo team può vedere e fare. Assegnando dei ruoli, puoi dare a collaboratori e volontari accesso esattamente alle aree di cui hanno bisogno — e nulla di più. Una gestione corretta dei ruoli protegge i dati della tua chiesa e permette al team di lavorare in modo efficiente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso di **Amministratore di dominio** oppure un ruolo con il permesso di gestire le **Impostazioni** in B1 Admin.
- Le persone a cui vuoi assegnare dei ruoli devono già esistere nel tuo elenco. Consulta [Aggiungere persone](adding-people.md) se devi prima aggiungerle.

</div>

## Capire i ruoli

Un ruolo è un insieme di permessi che assegni a uno o più utenti. Ad esempio, puoi creare un ruolo "Team Finanze" che concede l'accesso ai [registri delle donazioni](../donations/recording-donations.md), oppure un ruolo "Volontario check-in" che consente solo l'accesso alle [funzionalità di presenza](../attendance/check-in.md).

Ogni ruolo controlla l'accesso a specifiche aree di B1 Admin, tra cui:

- **Persone** -- visualizzare e modificare le schede dei membri. La sezione Note di una scheda persona richiede il permesso **Modifica persone**, mentre un permesso separato **Visualizza note riservate** controlla l'accesso alla sezione Note riservate (per la cura pastorale, la storia personale e note simili di carattere sensibile). **Visualizza solo i nomi delle persone** permette di cercare le persone per nome (vedendo solo nome, foto e stato di appartenenza) senza accedere all'elenco completo. Combinato con **Visualizza presenze** o **Modifica presenze**, permette a un volontario di aprire **Gruppi** e vedere gli elenchi delle classi per nome; con **Modifica presenze** può anche [registrare le presenze](../attendance/recording-attendance.md). Vedi [Persone — solo nomi](../settings/roles-permissions.md#people-names-only).
- **Donazioni** -- gestire le offerte e i report finanziari. **Inserisci donazioni** è un'opzione più limitata per i team di conteggio: permette di inserire le offerte, ma solo nei [lotti](../donations/batches.md#who-can-change-a-batch) ancora aperti.
- **Presenze** -- registrare e visualizzare i dati delle presenze
- **Moduli** -- creare e gestire i [moduli personalizzati](../forms/creating-forms.md)
- **Gruppi** -- gestire le [appartenenze ai gruppi](../groups/group-members.md) e i calendari
- **Impostazioni** -- configurare le impostazioni di tutta la chiesa

:::warning
Gli **Amministratori di dominio** hanno pieno accesso a ogni area di B1 Admin. I loro permessi non possono essere modificati né limitati. Usa questo ruolo solo per i tuoi amministratori principali.
:::

## Visualizzare e gestire i ruoli

1. Apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Impostazioni**.
2. Clicca su **Ruoli**.
3. Vedrai l'elenco di tutti i ruoli configurati per la tua chiesa, con una colonna **Membri** che indica quanti utenti sono in ciascun ruolo.
4. Clicca su un ruolo qualsiasi per vederne i membri e i permessi.

## Aggiungere utenti a un ruolo

1. Nel menu di navigazione rapida, scegli **Impostazioni > Ruoli**.
2. Clicca sul ruolo a cui vuoi aggiungere un utente.
3. Nella sezione **Membri**, cerca la persona per nome.
4. Clicca su **Aggiungi** per assegnarla al ruolo.

L'utente avrà tutti i permessi associati a quel ruolo al suo prossimo accesso.

## Modificare i permessi di un ruolo

1. Nel menu di navigazione rapida, scegli **Impostazioni > Ruoli**.
2. Clicca sul ruolo che vuoi modificare.
3. Nella sezione **Permessi**, seleziona o deseleziona le aree a cui il ruolo deve avere accesso. Ogni gruppo di permessi mostra quanti dei suoi permessi sono selezionati (ad esempio **2 di 5**).
4. Ogni modifica viene salvata non appena selezioni o deselezioni una casella.

:::tip
Segui il principio del privilegio minimo — assegna a ogni ruolo solo i permessi di cui ha davvero bisogno. Questo protegge i tuoi dati e riduce la possibilità di modifiche accidentali.
:::

## Esempi comuni di ruoli

- **Personale d'ufficio** -- accesso a Persone, Donazioni, Presenze e Moduli
- **Responsabili di gruppo** -- accesso solo a [Gruppi](../groups/creating-groups.md)
- **Volontari del check-in** -- accesso solo a [Presenze](../attendance/check-in.md)
- **Team finanze** -- accesso a [Donazioni](../donations/recording-donations.md) e ai report
- **Team di conteggio** -- **Inserisci donazioni** e **Visualizza donazioni**, così i volontari possono inserire l'offerta nei lotti aperti senza vedere i riepiloghi delle offerte

Consulta [Ruoli e permessi](../settings/roles-permissions.md) per un approfondimento sui permessi relativi a donazioni e persone.
