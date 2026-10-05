---
title: "Assegnazione di Ruoli"
---

# Assegnazione di Ruoli

<div class="article-intro">

B1 Admin utilizza un sistema di autorizzazioni basato su ruoli per controllare cosa ogni utente del tuo team può vedere e fare. Assegnando ruoli, puoi dare al personale e ai volontari accesso esattamente alle aree di cui hanno bisogno -- e niente di più. La corretta gestione dei ruoli mantiene i tuoi dati di chiesa al sicuro mentre consente al tuo team di lavorare in modo efficiente.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di accesso **Domain Admin** o di un ruolo con autorizzazione per gestire **Settings** in B1 Admin.
- Le persone a cui desideri assegnare i ruoli devono già esistere nella tua directory. Vedi [Aggiunta di Persone](adding-people.md) se hai bisogno di aggiungerle per primo.

</div>

## Comprensione dei Ruoli

Un ruolo è un insieme di autorizzazioni che assegni a uno o più utenti. Ad esempio, potresti creare un ruolo "Finance Team" che concede accesso ai [record di donazione](../donations/recording-donations.md), oppure un ruolo "Check-In Volunteer" che consente accesso solo alle [funzionalità di presence](../attendance/check-in.md).

Ogni ruolo controlla l'accesso a aree specifiche di B1 Admin, incluse:

- **People** -- visualizzazione e modifica dei profili dei membri. La scheda Notes su un record di persona richiede **Edit People**, e un'autorizzazione separata **View Confidential Notes** controlla l'accesso alla sezione Note Confidenziali (per la cura pastorale, la storia personale e note sensibili simili).
- **Donations** -- gestione dei contributi e rapporti finanziari
- **Attendance** -- registrazione e visualizzazione dei dati di presenza
- **Forms** -- creazione e gestione di [moduli personalizzati](../forms/creating-forms.md)
- **Groups** -- gestione dei [memberships di gruppo](../groups/group-members.md) e calendari
- **Settings** -- configurazione delle impostazioni a livello di chiesa

:::warning
Gli **Domain Admins** hanno accesso completo a ogni area di B1 Admin. Le loro autorizzazioni non possono essere modificate o limitate. Usa questo ruolo solo per i tuoi amministratori primari.
:::

## Visualizzazione e Gestione dei Ruoli

1. Apri il [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra di B1 Admin) ed espandi **Settings**.
2. Fai clic su **Roles**.
3. Vedrai un elenco di tutti i ruoli configurati per la tua chiesa.
4. Fai clic su qualsiasi ruolo per visualizzare i suoi membri e le autorizzazioni.

## Aggiunta di Utenti a un Ruolo

1. Nel Jump menu, scegli **Settings > Roles**.
2. Fai clic sul ruolo a cui desideri aggiungere un utente.
3. Nella sezione **Members**, cerca la persona per nome.
4. Fai clic su **Add** per assegnarla al ruolo.

L'utente avrà ora tutte le autorizzazioni associate a quel ruolo al prossimo accesso.

## Modifica delle Autorizzazioni del Ruolo

1. Nel Jump menu, scegli **Settings > Roles**.
2. Fai clic sul ruolo che desideri modificare.
3. Nella sezione **Permissions**, seleziona o deseleziona le aree a cui desideri che il ruolo acceda.
4. Fai clic su **Save** per applicare le tue modifiche.

:::tip
Segui il principio del privilegio minimo -- dai a ogni ruolo solo le autorizzazioni di cui ha veramente bisogno. Questo mantiene i tuoi dati al sicuro e riduce la possibilità di cambiamenti accidentali.
:::

## Esempi di Ruoli Comuni

- **Office Staff** -- accesso a People, Donations, Attendance, e Forms
- **Group Leaders** -- accesso solo a [Groups](../groups/creating-groups.md)
- **Check-In Volunteers** -- accesso solo a [Attendance](../attendance/check-in.md)
- **Finance Team** -- accesso a [Donations](../donations/recording-donations.md) e reporting
