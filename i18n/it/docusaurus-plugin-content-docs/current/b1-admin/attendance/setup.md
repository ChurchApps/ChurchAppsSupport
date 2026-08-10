---
title: "Configurazione presenze"
---

# Configurazione presenze

<div class="article-intro">

Prima di poter monitorare le presenze, devi indicare a B1 Admin le sedi fisiche della tua chiesa, quando si svolgono i servizi e quali gruppi si riuniscono in ogni servizio. Questa configurazione iniziale crea la struttura che alimenta tutto il monitoraggio e la reportistica delle presenze della tua chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con i permessi per gestire le presenze. Vedi [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se prevedi di assegnare gruppi agli orari dei servizi, assicurati che i tuoi [gruppi siano stati creati](../groups/creating-groups.md) prima.

</div>

## Concetti chiave

- **Sede** -- una sede fisica dove la tua chiesa si riunisce (es. "Sede principale", "Sede nord"). Le sedi vengono gestite in **Impostazioni**.
- **Servizio** -- un incontro ricorrente in una sede (es. "Servizio domenicale", "Infrasettimanale").
- **Orario del servizio** -- un orario specifico in cui si svolge un servizio (es. "9:00", "11:00").
- **Gruppo programmato** -- un gruppo assegnato a un orario di servizio specifico. Le presenze vengono monitorate nel contesto di quel servizio.
- **Gruppo non programmato** -- un gruppo che monitora le presenze autonomamente, senza essere legato a un orario di servizio.

## Configurare la struttura delle presenze

1. Apri **B1 Admin**, clicca sul **menu delle sezioni** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Persone**.
2. Nella barra di navigazione, clicca sulla scheda **Presenze**. La scheda **Configurazione** è selezionata per impostazione predefinita.
3. Clicca **Gestisci sedi** (in alto a destra nel pannello Configurazione). Questo ti porta a **Impostazioni → Sedi**. Clicca **Aggiungi sede**, inserisci il nome della tua sede (indirizzo e fuso orario sono facoltativi) e clicca **Salva**.
4. Torna a **Persone → Presenze → Configurazione**. La tua sede appare ora nella tabella di configurazione.
5. Clicca il **pulsante + nella colonna Servizio** sotto la tua sede. Inserisci un nome di servizio come "Servizio domenicale" e clicca **Salva**.
6. Clicca il **pulsante + nella colonna Orario** sotto il servizio. Inserisci un orario come "9:00" e clicca **Salva**. Ripeti per ogni orario di servizio.
7. Per collegare un gruppo a un orario di servizio, apri il gruppo dalla scheda **Gruppi**, clicca la matita **Modifica** e usa **Aggiungi orario servizio** — vedi la sezione successiva.

### Abilitare il monitoraggio presenze su un gruppo

Prima che un gruppo possa avere le presenze registrate, il monitoraggio presenze deve essere attivato per quel gruppo.

1. Clicca **Gruppi** nella barra laterale e seleziona il gruppo.
2. Clicca l'icona **Modifica** (matita).
3. Imposta **Monitora presenze** su **Sì**.
4. Clicca **Salva**.

:::tip
Se hai assegnato il gruppo a un orario di servizio nel passaggio precedente, usa anche l'opzione **Aggiungi orario servizio** nella schermata di modifica del gruppo per collegarlo al servizio corretto. Questo garantisce che le sessioni siano collegate alla sede e all'orario giusti.
:::

:::tip
Se un gruppo si riunisce al di fuori di un servizio regolare -- come un piccolo gruppo infrasettimanale che monitora le proprie presenze -- puoi lasciarlo come gruppo non programmato. Apparirà comunque nella scheda Gruppi per la reportistica delle presenze.
:::

## Modificare la configurazione

Puoi aggiornare la configurazione in qualsiasi momento. Seleziona una sede, un orario di servizio o un gruppo e clicca **Modifica** per cambiarne i dettagli, oppure **Elimina** per rimuoverlo.

:::info
La rimozione di un orario di servizio non cancella i record di presenze passati. I dati storici vengono preservati anche se modifichi il tuo programma.
:::

## Cosa viene dopo

Una volta che le sedi, gli orari dei servizi e i gruppi sono configurati, sei pronto per iniziare a [registrare le presenze](recording-attendance.md) manualmente o configurare il [check-in self-service](check-in.md) per i tuoi servizi.
