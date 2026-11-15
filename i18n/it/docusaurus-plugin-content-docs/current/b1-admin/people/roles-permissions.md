---
title: "Assegnare ruoli"
description: "Assegna ruoli in B1 Admin per dare a personale e volontari accesso solo alle aree di persone, donazioni, presenze e gruppi di cui hanno bisogno."
---

# Assegnare ruoli

<div class="article-intro">

B1 Admin usa un sistema di permessi basato sui ruoli per controllare cosa può vedere e fare ogni utente del tuo team. Assegnando i ruoli puoi dare a personale e volontari accesso esattamente alle aree di cui hanno bisogno, e nient'altro. Una gestione corretta dei ruoli protegge i dati della chiesa e permette al team di lavorare in modo efficiente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso di **Amministratore di dominio** oppure un ruolo con il permesso di gestire le **Impostazioni** in B1 Admin.
- Le persone a cui vuoi assegnare i ruoli devono già esistere nell'anagrafe. Se devi prima aggiungerle, vedi [Aggiungere persone](adding-people.md).

</div>

## Capire i ruoli {#understanding-roles}

Un ruolo è un insieme di permessi che assegni a uno o più utenti. Ad esempio, potresti creare un ruolo "Team finanze" che concede l'accesso ai [registri delle donazioni](../donations/recording-donations.md), oppure un ruolo "Volontario check-in" che consente solo l'accesso alle [funzioni di presenza](../attendance/check-in.md).

Ogni ruolo controlla l'accesso ad aree specifiche di B1 Admin, tra cui:

- **Persone** -- visualizzare e modificare i profili dei membri. La sezione Note di una scheda persona richiede **Modifica persone**, mentre un permesso separato **Visualizza note riservate** controlla l'accesso alla sezione Note riservate (per la cura pastorale, la storia personale e note simili di natura sensibile). **Visualizza solo i nomi delle persone** permette di cercare le persone per nome (vedendo solo nome, foto e stato di membership) senza accedere all'anagrafe completa. Combinato con **Visualizza presenze** o **Modifica presenze**, consente a un volontario di aprire **Gruppi** e vedere gli elenchi delle classi per nome; con **Modifica presenze** può anche [registrare le presenze](../attendance/recording-attendance.md). Vedi [Solo nomi delle persone](../settings/roles-permissions.md#people-names-only).
- **Donazioni** -- gestire le offerte e i report finanziari. **Inserisci donazioni** è un'opzione più limitata per i team di conteggio: permette di inserire i doni, ma solo nei [lotti](../donations/batches.md#who-can-change-a-batch) ancora aperti.
- **Presenze** -- registrare e visualizzare i dati di presenza
- **Moduli** -- creare e gestire i [moduli personalizzati](../forms/creating-forms.md)
- **Gruppi** -- gestire le [appartenenze ai gruppi](../groups/group-members.md) e i calendari
- **Impostazioni** -- configurare le impostazioni generali della chiesa

:::warning
Gli **Amministratori di dominio** hanno accesso completo a ogni area di B1 Admin. I loro permessi non possono essere modificati né limitati. Usa questo ruolo solo per i tuoi amministratori principali.
:::

## Visualizzare e gestire i ruoli {#viewing-and-managing-roles}

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Impostazioni**.
2. Clicca su **Ruoli**.
3. Vedrai l'elenco di tutti i ruoli configurati per la tua chiesa, con una colonna **Membri** che indica quanti utenti ci sono in ciascun ruolo. Il ruolo **(Tutti)** si applica a tutti gli utenti.
4. Clicca su un ruolo qualsiasi per vederne i membri e i permessi.

## Aggiungere utenti a un ruolo {#adding-users-to-a-role}

1. Nel menu Jump, scegli **Impostazioni > Ruoli**.
2. Clicca sul ruolo a cui vuoi aggiungere un utente.
3. Nella sezione **Membri**, clicca su **Aggiungi**.
4. Cerca la persona per nome (oppure scegline una dalle **Persone recenti**), poi clicca sul suo nome o sull'icona di aggiunta accanto. Viene aggiunta subito al ruolo.

Al prossimo accesso, l'utente avrà tutti i permessi associati a quel ruolo.

## Modificare i permessi di un ruolo {#editing-role-permissions}

1. Nel menu Jump, scegli **Impostazioni > Ruoli**.
2. Clicca sul ruolo che vuoi modificare.
3. Nella sezione **Modifica permessi**, espandi un gruppo di permessi (come **Persone e gruppi**, **Donazioni** o **Presenze**) e seleziona o deseleziona i permessi che vuoi assegnare al ruolo. Ogni gruppo mostra quanti dei suoi permessi sono selezionati (ad esempio, **2 di 5**). Scrivi in **Filtra permessi** per trovare un permesso per nome.
4. Ogni modifica viene salvata non appena selezioni o deselezioni una casella.

:::tip
Segui il principio del privilegio minimo: assegna a ciascun ruolo solo i permessi di cui ha davvero bisogno. Così i tuoi dati restano protetti e si riduce il rischio di modifiche accidentali.
:::

## Esempi di ruoli comuni {#common-role-examples}

- **Personale di segreteria** -- accesso a Persone, Donazioni, Presenze e Moduli
- **Leader di gruppo** -- accesso solo a [Gruppi](../groups/creating-groups.md)
- **Volontari del check-in** -- il permesso di presenza **Checkin**, di cui ha bisogno l'account con cui si accede a un [chiosco di check-in](../attendance/check-in.md)
- **Team finanze** -- accesso a [Donazioni](../donations/recording-donations.md) e ai report
- **Team di conteggio** -- **Inserisci donazioni** e **Visualizza donazioni**, così i volontari possono inserire le offerte nei lotti aperti senza vedere i riepiloghi delle donazioni

Vedi [Ruoli e permessi](../settings/roles-permissions.md) per un approfondimento sui permessi relativi a donazioni e persone.
