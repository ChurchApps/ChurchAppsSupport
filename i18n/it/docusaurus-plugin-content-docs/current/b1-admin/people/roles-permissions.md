---
title: "Assegnazione di ruoli"
---

# Assegnazione di ruoli

<div class="article-intro">

B1 Admin utilizza un sistema di autorizzazioni basato sui ruoli per controllare ciò che ogni utente nel tuo team può vedere e fare. Assegnando i ruoli, puoi dare allo staff e ai volontari accesso esattamente alle aree di cui hanno bisogno -- e nulla di più. La corretta gestione dei ruoli mantiene i dati della tua chiesa al sicuro mentre potenzia il tuo team a lavorare in modo efficiente.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno dell'accesso **Domain Admin** o di un ruolo con il permesso di gestire **Impostazioni** in B1 Admin.
- Le persone a cui desideri assegnare i ruoli devono già esistere nella tua directory. Vedi [Aggiunta di persone](adding-people.md) se hai bisogno di aggiungerle per prima cosa.

</div>

## Comprensione dei ruoli

Un ruolo è un insieme di autorizzazioni che assegni a uno o più utenti. Ad esempio, potresti creare un ruolo "Team di finanza" che concede accesso ai [record di donazione](../donations/recording-donations.md), o un ruolo "Volontario Check-In" che consente solo accesso alle [funzioni di presenze](../attendance/check-in.md).

Ogni ruolo controlla l'accesso a aree specifiche di B1 Admin, incluse:

- **Persone** -- visualizzazione e modifica dei profili dei membri. La scheda Note su un record di persona richiede **Modifica persone**, e un'autorizzazione **Visualizza note riservate** separata controlla l'accesso alla sezione Note riservate (per cura pastorale, cronologia personale e note sensibili simili).
- **Donazioni** -- gestione dei contributi e rapporti finanziari
- **Presenze** -- registrazione e visualizzazione dei dati di presenze
- **Moduli** -- creazione e gestione di [moduli personalizzati](../forms/creating-forms.md)
- **Gruppi** -- gestione di [iscrizioni ai gruppi](../groups/group-members.md) e calendari
- **Impostazioni** -- configurazione delle impostazioni a livello di chiesa

:::warning
Gli **Admin di dominio** hanno accesso completo a ogni area di B1 Admin. Le loro autorizzazioni non possono essere modificate o limitate. Usa questo ruolo solo per i tuoi amministratori principali.
:::

## Visualizzazione e gestione dei ruoli

1. Apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
2. Fai clic su **Ruoli** nella navigazione superiore.
3. Vedrai un elenco di tutti i ruoli configurati per la tua chiesa.
4. Fai clic su qualsiasi ruolo per visualizzare i suoi membri e autorizzazioni.

## Aggiunta di utenti a un ruolo

1. Vai a **Impostazioni** quindi **Ruoli**.
2. Fai clic sul ruolo a cui desideri aggiungere un utente.
3. Nella sezione **Membri**, cerca la persona per nome.
4. Fai clic su **Aggiungi** per assegnarla al ruolo.

L'utente ora avrà tutte le autorizzazioni associate a quel ruolo la prossima volta che accederà.

## Modifica delle autorizzazioni del ruolo

1. Vai a **Impostazioni** quindi **Ruoli**.
2. Fai clic sul ruolo che desideri modificare.
3. Nella sezione **Autorizzazioni**, spunta o deseleziona le aree a cui desideri che il ruolo abbia accesso.
4. Fai clic su **Salva** per applicare le tue modifiche.

:::tip
Segui il principio del minimo privilegio -- dai a ogni ruolo solo le autorizzazioni di cui ha veramente bisogno. Questo mantiene i tuoi dati al sicuro e riduce la possibilità di modifiche accidentali.
:::

## Esempi di ruoli comuni

- **Staff dell'ufficio** -- accesso a Persone, Donazioni, Presenze e Moduli
- **Leader di gruppo** -- accesso a [Gruppi](../groups/creating-groups.md) solo
- **Volontari Check-In** -- accesso a [Presenze](../attendance/check-in.md) solo
- **Team di finanza** -- accesso a [Donazioni](../donations/recording-donations.md) e reporting
