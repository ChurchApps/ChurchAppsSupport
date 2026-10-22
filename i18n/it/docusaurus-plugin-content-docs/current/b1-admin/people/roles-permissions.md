---
title: "Assegnare i ruoli"
---

# Assegnare i ruoli {#assigning-roles}

<div class="article-intro">

B1 Admin utilizza un sistema di permessi basato sui ruoli per controllare cosa può vedere e fare ogni utente del tuo team. Assegnando i ruoli, puoi dare a personale e volontari accesso esattamente alle aree di cui hanno bisogno, e nient'altro. Una gestione corretta dei ruoli mantiene sicuri i dati della tua chiesa e permette al tuo team di lavorare in modo efficiente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso **Domain Admin** o un ruolo con il permesso di gestire le **Impostazioni** in B1 Admin.
- Le persone a cui vuoi assegnare i ruoli devono già esistere nella tua rubrica. Consulta [Aggiungere persone](adding-people.md) se devi prima aggiungerle.

</div>

## Capire i ruoli {#understanding-roles}

Un ruolo è un insieme di permessi che assegni a uno o più utenti. Ad esempio, potresti creare un ruolo "Team Finanze" che concede l'accesso alle [registrazioni delle donazioni](../donations/recording-donations.md), oppure un ruolo "Volontario Check-In" che consente solo l'accesso alle [funzioni di presenza](../attendance/check-in.md).

Ogni ruolo controlla l'accesso ad aree specifiche di B1 Admin, tra cui:

- **Persone** -- visualizzare e modificare i profili dei membri. La sezione Note di una scheda persona richiede **Modifica persone**, mentre un permesso separato, **Visualizza note riservate**, controlla l'accesso alla sezione Note riservate (per l'assistenza pastorale, la storia personale e note simili sensibili). **Visualizza solo i nomi delle persone** permette di cercare qualcuno per nome (vedendo solo nome, foto e stato di membro) senza accesso alla rubrica completa. Combinato con **Visualizza presenze** o **Modifica presenze**, permette a un volontario di aprire **Gruppi** e vedere gli elenchi delle classi per nome; con **Modifica presenze** può anche [registrare le presenze](../attendance/recording-attendance.md). Vedi [Solo nomi delle persone](../settings/roles-permissions.md#people-names-only).
- **Donazioni** -- gestire i contributi e i report finanziari. **Inserisci donazioni** è un'opzione più limitata per i team di conteggio: permette di inserire offerte, ma solo nei [lotti](../donations/batches.md#who-can-change-a-batch) ancora aperti.
- **Presenze** -- registrare e visualizzare i dati di presenza
- **Moduli** -- creare e gestire i [moduli personalizzati](../forms/creating-forms.md)
- **Gruppi** -- gestire le [appartenenze ai gruppi](../groups/group-members.md) e i calendari
- **Impostazioni** -- configurare le impostazioni generali della chiesa

:::warning
I **Domain Admin** hanno accesso completo a ogni area di B1 Admin. I loro permessi non possono essere modificati o limitati. Usa questo ruolo solo per i tuoi amministratori di fiducia.
:::

## Visualizzare e gestire i ruoli {#viewing-and-managing-roles}

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Impostazioni**.
2. Fai clic su **Ruoli**.
3. Vedrai un elenco di tutti i ruoli configurati per la tua chiesa.
4. Fai clic su un ruolo qualsiasi per visualizzarne i membri e i permessi.

## Aggiungere utenti a un ruolo {#adding-users-to-a-role}

1. Nel menu Jump, scegli **Impostazioni > Ruoli**.
2. Fai clic sul ruolo a cui vuoi aggiungere un utente.
3. Nella sezione **Membri**, cerca la persona per nome.
4. Fai clic su **Aggiungi** per assegnarla al ruolo.

L'utente avrà tutti i permessi associati a quel ruolo al suo prossimo accesso.

## Modificare i permessi di un ruolo {#editing-role-permissions}

1. Nel menu Jump, scegli **Impostazioni > Ruoli**.
2. Fai clic sul ruolo che vuoi modificare.
3. Nella sezione **Permessi**, seleziona o deseleziona le aree a cui vuoi che il ruolo abbia accesso.
4. Fai clic su **Salva** per applicare le modifiche.

:::tip
Segui il principio del privilegio minimo: assegna a ogni ruolo solo i permessi di cui ha realmente bisogno. Questo mantiene sicuri i dati e riduce il rischio di modifiche accidentali.
:::

## Esempi comuni di ruoli {#common-role-examples}

- **Personale di segreteria** -- accesso a Persone, Donazioni, Presenze e Moduli
- **Responsabili di gruppo** -- accesso solo a [Gruppi](../groups/creating-groups.md)
- **Volontari del check-in** -- accesso solo a [Presenze](../attendance/check-in.md)
- **Team Finanze** -- accesso a [Donazioni](../donations/recording-donations.md) e ai report
- **Team di conteggio** -- **Inserisci donazioni** e **Visualizza donazioni**, così i volontari possono inserire le offerte nei lotti aperti senza vedere i riepiloghi delle donazioni

Consulta [Ruoli e permessi](../settings/roles-permissions.md) per un approfondimento sui permessi relativi a donazioni e persone.
