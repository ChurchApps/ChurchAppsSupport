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

- **Sede** -- una sede fisica dove la tua chiesa si riunisce (es. "Sede principale", "Sede nord").
- **Orario del servizio** -- un incontro ricorrente in una sede (es. "Domenica 9:00", "Mercoledì 19:00").
- **Gruppo programmato** -- un gruppo assegnato a un orario di servizio specifico. Le presenze vengono monitorate nel contesto di quel servizio.
- **Gruppo non programmato** -- un gruppo che monitora le presenze autonomamente, senza essere legato a un orario di servizio.

## Configurare la struttura delle presenze

1. Apri **B1 Admin** e clicca su **Presenze** nella barra laterale.
2. Seleziona la scheda **Configurazione**.
3. Clicca **Aggiungi sede** e inserisci il nome della tua sede. Clicca **Salva**.
4. Con la sede selezionata, clicca **Aggiungi orario servizio**. Inserisci un nome come "Domenica 9:00" e clicca **Salva**.
5. Ripeti per ogni orario di servizio in quella sede.
6. Per assegnare un gruppo a un orario di servizio, seleziona l'orario del servizio e clicca **Aggiungi gruppo**. Scegli il gruppo dall'elenco e clicca **Salva**.

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
