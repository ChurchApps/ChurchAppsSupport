---
title: "Assegnare i ruoli"
---

# Assegnare i ruoli

<div class="article-intro">

B1 Admin usa un sistema di permessi basato sui ruoli per controllare cosa ciascun utente del tuo team può vedere e fare. Assegnando i ruoli, puoi dare a personale e volontari accesso esattamente alle aree di cui hanno bisogno, e nient'altro. Una corretta gestione dei ruoli protegge i dati della tua chiesa e permette al tuo team di lavorare in modo efficiente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso **Amministratore di dominio** oppure un ruolo con il permesso di gestire le **Impostazioni** in B1 Admin.
- Le persone a cui vuoi assegnare dei ruoli devono già esistere nella tua rubrica. Vedi [Aggiungere persone](adding-people.md) se devi prima aggiungerle.

</div>

## Capire i ruoli

Un ruolo è un insieme di permessi che assegni a uno o più utenti. Ad esempio, potresti creare un ruolo "Team finanze" che concede l'accesso ai [registri delle donazioni](../donations/recording-donations.md), oppure un ruolo "Volontario check-in" che consente solo l'accesso alle [funzioni di presenza](../attendance/check-in.md).

Ogni ruolo controlla l'accesso ad aree specifiche di B1 Admin, tra cui:

- **Persone** -- visualizzazione e modifica dei profili dei membri. La sezione Note di una scheda persona richiede **Modifica persone**, mentre un permesso separato **Visualizza note riservate** controlla l'accesso alla sezione Note riservate (per cura pastorale, storia personale e note simili sensibili). **Visualizza solo i nomi delle persone** permette di cercare le persone per nome (vedendo solo nome, foto e stato di appartenenza) senza accedere alla rubrica completa. Combinato con **Visualizza presenze** o **Modifica presenze**, permette a un volontario di aprire **Gruppi** e vedere gli elenchi delle classi per nome; con **Modifica presenze** può anche [registrare le presenze](../attendance/recording-attendance.md). Vedi [Solo nomi delle persone](../settings/roles-permissions.md#people-names-only).
- **Donazioni** -- gestione delle offerte e dei report finanziari. **Inserisci donazioni** è un'opzione più ristretta per i team di conteggio: permette di inserire offerte, ma solo nei [lotti](../donations/batches.md#who-can-change-a-batch) ancora aperti.
- **Presenze** -- registrazione e visualizzazione dei dati di presenza
- **Moduli** -- creazione e gestione dei [moduli personalizzati](../forms/creating-forms.md)
- **Gruppi** -- gestione delle [appartenenze ai gruppi](../groups/group-members.md) e dei calendari
- **Impostazioni** -- configurazione delle impostazioni valide per tutta la chiesa

:::warning
Gli **Amministratori di dominio** hanno pieno accesso a ogni area di B1 Admin. I loro permessi non possono essere modificati né limitati. Usa questo ruolo solo per i tuoi amministratori principali.
:::

## Visualizzare e gestire i ruoli

1. Apri il [menu di navigazione rapida](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Impostazioni**.
2. Clicca su **Ruoli**.
3. Vedrai un elenco di tutti i ruoli configurati per la tua chiesa, con una colonna **Membri** che mostra quanti utenti sono in ciascun ruolo.
4. Clicca su un ruolo qualsiasi per vederne i membri e i permessi.

## Aggiungere utenti a un ruolo

1. Nel menu di navigazione rapida, scegli **Impostazioni > Ruoli**.
2. Clicca sul ruolo a cui vuoi aggiungere un utente.
3. Nella sezione **Membri**, cerca la persona per nome.
4. Clicca su **Aggiungi** per assegnarla al ruolo.

Al prossimo accesso, l'utente avrà tutti i permessi associati a quel ruolo.

## Modificare i permessi di un ruolo

1. Nel menu di navigazione rapida, scegli **Impostazioni > Ruoli**.
2. Clicca sul ruolo che vuoi modificare.
3. Nella sezione **Permessi**, seleziona o deseleziona le aree a cui vuoi che il ruolo abbia accesso. Ogni gruppo di permessi mostra quanti dei suoi permessi sono selezionati (ad esempio **2 di 5**).
4. Ogni modifica viene salvata non appena selezioni o deselezioni una casella.

:::tip
Segui il principio del privilegio minimo -- assegna a ciascun ruolo solo i permessi di cui ha davvero bisogno. Questo mantiene sicuri i tuoi dati e riduce il rischio di modifiche accidentali.
:::

## Esempi comuni di ruoli

- **Personale d'ufficio** -- accesso a Persone, Donazioni, Presenze e Moduli
- **Leader di gruppo** -- accesso solo a [Gruppi](../groups/creating-groups.md)
- **Volontari del check-in** -- il permesso di presenza **Checkin**, che serve all'account con cui si accede a un [chiosco di check-in](../attendance/check-in.md)
- **Team finanze** -- accesso a [Donazioni](../donations/recording-donations.md) e ai report
- **Team di conteggio** -- **Inserisci donazioni** e **Visualizza donazioni**, così i volontari possono inserire l'offerta nei lotti aperti senza vedere i riepiloghi delle offerte

Per un approfondimento sui permessi relativi a donazioni e persone, vedi [Ruoli e permessi](../settings/roles-permissions.md).
