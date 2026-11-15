---
title: "Guida: Registrare le presenze in chiesa"
description: "Registra le presenze in chiesa in B1 Admin configurando sedi e orari dei culti, registrandole manualmente o tramite self check-in, e consultando i report."
---

# Registrare le presenze in chiesa

<div class="article-intro">

Configura la rilevazione delle presenze per i tuoi culti e gruppi: dalla configurazione delle sedi e degli orari dei culti, alla registrazione manuale o tramite l'app self check-in, fino alla consultazione delle tendenze nei report. Alla fine, avrai un quadro completo di chi partecipa e quando.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Account B1 Admin con accesso amministratore
- [Persone aggiunte alla tua anagrafica](../people/adding-people.md)
- [Gruppi creati](../groups/creating-groups.md) per i ministeri che vuoi monitorare

</div>

## Passaggio 1: Configura sedi e culti {#step-1-configure-campuses--services}

Definisci dove e quando si riunisce la tua chiesa.

Segui la guida [Configurazione presenze](../attendance/setup.md) per:

1. Nel [menu Jump](../introduction.md#getting-around-with-the-jump-menu), scegli **Persone > Presenze** e clicca su **Configurazione**
2. Aggiungi la tua sede (ad esempio, "Sede principale") e i suoi culti
3. Aggiungi gli orari dei culti (ad esempio, "Domenica 9:00", "Domenica 11:00", "Mercoledì 19:00")

## Passaggio 2: Attiva la rilevazione delle presenze nei gruppi {#step-2-enable-group-attendance-tracking}

Attiva la rilevazione delle presenze per i gruppi che vuoi monitorare.

Segui la guida [Creare gruppi](../groups/creating-groups.md) per:

1. Apri ogni gruppo che vuoi monitorare, clicca su **Modifica** e imposta **Registra presenze** su **Sì**
2. Se il gruppo si riunisce durante un culto, scegli l'orario in **Aggiungi orario del culto** e clicca sul pulsante con il segno più, così le presenze vengono registrate sul culto giusto, poi clicca su **Salva**

:::info
Non tutti i gruppi hanno bisogno della rilevazione delle presenze. Attivala per i gruppi in cui vuoi monitorare la partecipazione: classi per bambini, piccoli gruppi, scuola domenicale, ecc.
:::

## Passaggio 3: Registra le presenze manualmente {#step-3-record-attendance-manually}

Spunta chi ha partecipato a ogni culto e gruppo.

Segui la guida [Registrare le presenze](../attendance/recording-attendance.md) per:

1. Apri un gruppo, clicca su **Tutte le sessioni** nella sezione **Sessioni**, clicca su **Nuova** e scegli l'**Orario del culto** e la **Data della sessione**. Spunta **Aggiungi anche per gli altri _N_ gruppi in _orario del culto_** per creare in una sola volta le sessioni di tutte le classi in quell'orario di culto.
2. Spunta chi ha partecipato e clicca su **Salva presenze**

Se ti serve solo un totale invece dei nomi (ad esempio, per il culto principale), clicca su **Inserisci numero presenti** nella pagina **Presenze** — vedi [Inserimento del numero di presenti](../attendance/headcount-entry.md).

:::tip
La registrazione manuale funziona benissimo per i culti per adulti, i piccoli gruppi e ogni situazione in cui un chiosco di check-in non è pratico.
:::

## Passaggio 4: Configura il self check-in (facoltativo) {#step-4-set-up-self-check-in-optional}

Permetti ai membri di registrarsi da soli tramite un chiosco con tablet.

Segui la guida [Check-in](../attendance/check-in.md) per:

1. Installa l'app B1 Checkin su un tablet per il check-in self-service
2. I membri cercano il proprio nome e registrano da soli sé stessi e la propria famiglia
3. Le presenze registrate con il check-in compaiono insieme a quelle inserite manualmente, senza differenze nei dati

:::info
Per una configurazione completa del ministero dei bambini, comprensiva di hardware e stampante, vedi la [Guida al check-in dei bambini](./childrens-checkin.md).
:::

## Passaggio 5: Consulta i report sulle presenze {#step-5-view-attendance-reports}

Osserva il quadro generale della partecipazione in tutta la chiesa.

Segui la guida [Report sulle presenze](../reports/attendance-reports.md). Nella pagina **Presenze**, clicca su **Tutti gli anni** per trovare questi report come schede:

1. **Andamento presenze** — osserva le presenze nel tempo per individuare crescita o calo
2. **Andamento numero presenti** — grafico dei totali di presenti che hai inserito a mano
3. **Presenze gruppi** — vedi chi ha partecipato a ogni sessione di gruppo in un intervallo di date, con download in CSV

Per un conteggio giornaliero di un singolo gruppo, apri il report **Presenze giornaliere dei gruppi** all'indirizzo **admin.b1.church/reports/dailyGroupAttendance**.

:::info
I report sulle presenze combinano sia le presenze registrate manualmente sia quelle del self check-in. I dati appaiono allo stesso modo: entrambi i metodi alimentano gli stessi report.
:::

## Hai finito! {#youre-done}

La rilevazione delle presenze è configurata. Che tu registri le presenze manualmente, usi l'app di check-in o entrambe le cose, tutti i dati confluiscono negli stessi report, così hai un quadro chiaro della partecipazione in tutta la chiesa.

## Articoli correlati {#related-articles}

- [Configurazione presenze](../attendance/setup.md) — configura sedi e culti
- [Inserimento del numero di presenti](../attendance/headcount-entry.md) — registra i totali senza nomi
- [Registrare le presenze](../attendance/recording-attendance.md) — registra le presenze manualmente
- [Monitorare le presenze](../attendance/tracking-attendance.md) — consulta le tendenze di presenza
- [Check-in](../attendance/check-in.md) — app di check-in self-service
- [Creare gruppi](../groups/creating-groups.md) — configura i gruppi con la rilevazione delle presenze
- [Report sulle presenze](../reports/attendance-reports.md) — consulta le tendenze di presenza
- [Guida al check-in dei bambini](./childrens-checkin.md) — configurazione completa del check-in per il ministero dei bambini
