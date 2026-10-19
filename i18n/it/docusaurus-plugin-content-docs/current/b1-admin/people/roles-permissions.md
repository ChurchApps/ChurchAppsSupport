---
title: "Assegnare i ruoli"
---

# Assegnare i ruoli

<div class="article-intro">

B1 Admin usa un sistema di permessi basato sui ruoli per controllare cosa ogni utente del tuo team può vedere e fare. Assegnando i ruoli, puoi dare al personale e ai volontari accesso esattamente alle aree di cui hanno bisogno, e non di più. Una gestione accurata dei ruoli mantiene sicuri i dati della chiesa e permette al team di lavorare in modo efficiente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'accesso **Amministratore di dominio** oppure un ruolo con il permesso di gestire **Impostazioni** in B1 Admin.
- Le persone a cui vuoi assegnare i ruoli devono già esistere nella tua rubrica. Vedi [Aggiungere persone](adding-people.md) se devi prima aggiungerle.

</div>

## Comprendere i ruoli

Un ruolo è un insieme di permessi che assegni a uno o più utenti. Ad esempio, potresti creare un ruolo «Team Finanze» che concede l'accesso alle [registrazioni delle donazioni](../donations/recording-donations.md), oppure un ruolo «Volontario check-in» che consente solo l'accesso alle [funzioni di presenza](../attendance/check-in.md).

Ogni ruolo controlla l'accesso a specifiche aree di B1 Admin, tra cui:

- **Persone** -- visualizzare e modificare i profili dei membri. La sezione Note di una scheda persona richiede **Modifica persone**, mentre un permesso separato **Visualizza note riservate** controlla l'accesso alla sezione Note riservate (per la cura pastorale, la storia personale e note simili sensibili). **Visualizza solo i nomi delle persone** permette di cercare le persone per nome (vedendo solo nome, foto e stato di appartenenza) senza accedere alla rubrica completa.
- **Donazioni** -- gestire le offerte e i rendiconti finanziari. **Inserisci donazioni** è un'opzione più ristretta per i team di conteggio: permette di inserire le offerte, ma solo nei [lotti](../donations/batches.md#who-can-change-a-batch) ancora aperti.
- **Presenze** -- registrare e visualizzare i dati di presenza
- **Moduli** -- creare e gestire i [moduli personalizzati](../forms/creating-forms.md)
- **Gruppi** -- gestire le [appartenenze ai gruppi](../groups/group-members.md) e i calendari
- **Impostazioni** -- configurare le impostazioni valide per tutta la chiesa

:::warning
Gli **Amministratori di dominio** hanno pieno accesso a ogni area di B1 Admin. I loro permessi non possono essere modificati né limitati. Usa questo ruolo solo per i tuoi amministratori principali.
:::

## Visualizzare e gestire i ruoli

1. Apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Impostazioni**.
2. Fai clic su **Ruoli**.
3. Vedrai l'elenco di tutti i ruoli configurati per la tua chiesa.
4. Fai clic su un ruolo qualsiasi per vederne i membri e i permessi.

## Aggiungere utenti a un ruolo

1. Nel menu Jump, scegli **Impostazioni > Ruoli**.
2. Fai clic sul ruolo a cui vuoi aggiungere un utente.
3. Nella sezione **Membri**, cerca la persona per nome.
4. Fai clic su **Aggiungi** per assegnarla al ruolo.

L'utente avrà tutti i permessi associati a quel ruolo al suo prossimo accesso.

## Modificare i permessi di un ruolo

1. Nel menu Jump, scegli **Impostazioni > Ruoli**.
2. Fai clic sul ruolo che vuoi modificare.
3. Nella sezione **Permessi**, seleziona o deseleziona le aree a cui vuoi che il ruolo abbia accesso.
4. Fai clic su **Salva** per applicare le modifiche.

:::tip
Segui il principio del minimo privilegio — assegna a ogni ruolo solo i permessi di cui ha davvero bisogno. Questo mantiene sicuri i dati e riduce il rischio di modifiche accidentali.
:::

## Esempi comuni di ruoli

- **Personale d'ufficio** -- accesso a Persone, Donazioni, Presenze e Moduli
- **Leader di gruppo** -- accesso solo a [Gruppi](../groups/creating-groups.md)
- **Volontari check-in** -- accesso solo a [Presenze](../attendance/check-in.md)
- **Team Finanze** -- accesso a [Donazioni](../donations/recording-donations.md) e ai rendiconti
- **Team di conteggio** -- **Inserisci donazioni** e **Visualizza donazioni**, così i volontari possono inserire le offerte nei lotti aperti senza vedere i riepiloghi delle donazioni

Consulta [Ruoli e permessi](../settings/roles-permissions.md) per un approfondimento sui permessi relativi alle donazioni e alle persone.
