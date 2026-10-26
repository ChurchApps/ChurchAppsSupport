---
title: "Report sulle presenze"
---

# Report sulle presenze

<div class="article-intro">

B1 Admin offre tre report sulle presenze per aiutarti a capire come le persone partecipano ai tuoi servizi e ai tuoi gruppi. Ogni report offre una prospettiva diversa sui dati di presenza, dalle tendenze generali alle suddivisioni giornaliere.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Assicurati che le presenze siano [registrate in modo costante](../attendance/tracking-attendance.md) per i tuoi servizi e i tuoi gruppi
- Verifica che i tuoi [gruppi](../groups/creating-groups.md) e i servizi siano configurati in B1 Admin
- Ti servono i [permessi](../settings/roles-permissions.md) appropriati per accedere ai report

</div>

## Tendenza delle presenze

Il report Tendenza delle presenze mostra come cambiano nel tempo le presenze ai tuoi servizi.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/attendanceTrend** nel browser (i report non hanno una voce nel menu di navigazione — salvare l'indirizzo nei preferiti è il modo più semplice per tornarci). Lo stesso report è disponibile anche nella pagina Presenze: clicca su **Tutti gli anni**, poi scegli la scheda **Tendenza delle presenze**.
2. Facoltativamente, seleziona un **Campus**, un **Servizio**, un **Orario del servizio** o un **Gruppo** per filtrare i risultati.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre l'ultimo anno, da un anno fa fino a oggi, e la data di fine è inclusa per intero. Clicca su **Esegui report**.
4. Il report mostra un grafico a barre e una tabella con il totale delle visite per settimana. Ogni settimana è etichettata con la data della domenica di quella settimana, e la colonna **Date delle sessioni** della tabella elenca le date effettive di quella settimana in cui c'erano presenze (ad esempio "27/9, 30/9").

Questo report è utile per individuare schemi come cali stagionali, trend di crescita o l'impatto di eventi speciali.

## Presenze per gruppo

Il report Presenze per gruppo mostra chi ha partecipato a ciascuna sessione di gruppo in un intervallo di date.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/groupAttendance** nel browser, oppure nella pagina Presenze clicca su **Tutti gli anni** e scegli la scheda **Presenze per gruppo**.
2. Facoltativamente, seleziona un **Campus** e un **Servizio**.
3. Imposta la **Data di inizio** e la **Data di fine**. Per impostazione predefinita il report copre dall'ultima domenica fino a oggi, e la data di fine è inclusa per intero.
4. Clicca su **Esegui report**.

I risultati sono raggruppati per data della sessione, poi per orario del servizio, poi per gruppo, con sotto ciascun gruppo le persone che hanno partecipato. Orari del servizio, gruppi e nomi sono ordinati in ordine alfabetico. Accanto al nome di ogni persona, la colonna **Registrato alle** mostra l'orario in cui è stata registrata la presenza (vuoto quando non c'è un orario disponibile) e la colonna **Stato di appartenenza** mostra il suo stato, come Membro o Visitatore.

Per scaricare un foglio di calcolo, clicca su **Opzioni di download** e scegli **Riepilogo**. Il file CSV contiene:

- Una riga per ogni membro di ciascun gruppo che si è riunito nell'intervallo di date, ordinate per gruppo e poi per nome.
- Il nome della persona e il nome del gruppo nelle prime colonne.
- Una colonna per ogni sessione con data, denominata con il servizio, l'orario del servizio e la data (ad esempio "Domenica - 9:00 (2026-09-27)"), con ogni persona contrassegnata come **presente** o **assente**.

Usa questo report per confrontare le presenze tra i gruppi e individuare quali gruppi stanno crescendo o richiedono attenzione.

## Presenze giornaliere per gruppo

Il report Presenze giornaliere per gruppo (intitolato **Presenze per gruppo per giorno**) fornisce un conteggio giorno per giorno di quante persone hanno partecipato a un gruppo.

1. Vai direttamente all'indirizzo **admin.b1.church/reports/dailyGroupAttendance** nel browser.
2. Usa i menu a tendina **Campus**, **Servizio** e **Orario del servizio** per restringere l'elenco, poi scegli il **Gruppo** che vuoi esaminare.
3. Esegui il report. Elenca ogni giorno in cui il gruppo si è riunito, dal più vecchio al più recente, con la **Data** e il numero di **Partecipanti** registrati quel giorno.

Questo report offre un dettaglio granulare, utile per capire le variazioni di settimana in settimana o per individuare giorni specifici con presenze insolitamente alte o basse.

:::tip
Usa il report Tendenza delle presenze per una panoramica generale e il report Presenze giornaliere per gruppo quando devi approfondire date specifiche.
:::

## Usi pratici

- **Pianificazione** -- Usa le tendenze delle presenze per pianificare posti a sedere, personale e risorse per i prossimi servizi.
- **Attività di sensibilizzazione** -- Individua tempestivamente i cali di presenza per poter contattare i membri.
- **Relazioni per il consiglio** -- Includi i dati sulle presenze nelle relazioni periodiche alla dirigenza per mostrare lo stato del ministero.
- **Valutazione degli eventi** -- Confronta le presenze prima e dopo eventi speciali per misurarne l'impatto.

:::warning
I dati sulle presenze vengono registrati tramite i processi di check-in dei tuoi gruppi e servizi. Se le presenze non vengono registrate in modo costante, i report non rifletteranno con precisione la partecipazione reale. Consulta [Monitorare le presenze](../attendance/tracking-attendance.md) per le istruzioni di configurazione.
:::
