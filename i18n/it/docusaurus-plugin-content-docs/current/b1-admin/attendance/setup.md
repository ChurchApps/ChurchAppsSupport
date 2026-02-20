---
title: "Configurazione presenze"
---

# Configurazione presenze

<div class="article-intro">

Prima di poter monitorare le presenze, devi comunicare a B1 Admin le sedi fisiche della tua chiesa, quando si svolgono i servizi e quali gruppi si riuniscono a ogni servizio. Questa configurazione una tantum crea la struttura che alimenta tutto il monitoraggio e la reportistica delle presenze nella tua chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di gestire le presenze. Consulta [Ruoli e permessi](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se intendi assegnare gruppi agli orari dei servizi, assicurati che i tuoi [gruppi siano già creati](../groups/creating-groups.md).

</div>

## Concetti chiave

- **Sede** -- un luogo fisico dove la tua chiesa si riunisce (es. "Sede principale," "Sede nord").
- **Orario di servizio** -- un incontro ricorrente presso una sede (es. "Domenica 9:00," "Mercoledì 19:00").
- **Gruppo programmato** -- un gruppo assegnato a un orario di servizio specifico. Le presenze vengono monitorate nel contesto di quel servizio.
- **Gruppo non programmato** -- un gruppo che monitora le presenze autonomamente, senza essere legato a un orario di servizio.

## Configurare la struttura delle presenze

1. Apri **B1 Admin** e clicca su **Attendance** nella barra laterale.
2. Seleziona la scheda **Setup**.
3. Clicca su **Add Campus** e inserisci il nome della tua sede. Clicca su **Save**.
4. Con la tua sede selezionata, clicca su **Add Service Time**. Inserisci un nome come "Sunday 9:00 AM" e clicca su **Save**.
5. Ripeti per ogni orario di servizio in quella sede.
6. Per assegnare un gruppo a un orario di servizio, seleziona l'orario di servizio e clicca su **Add Group**. Scegli il gruppo dall'elenco e clicca su **Save**.

:::tip
Se un gruppo si riunisce al di fuori di un servizio regolare -- come un piccolo gruppo infrasettimanale che monitora le proprie presenze -- puoi lasciarlo come gruppo non programmato. Apparirà comunque nella scheda Gruppi per la reportistica delle presenze.
:::

## Modificare la configurazione

Puoi aggiornare la tua configurazione in qualsiasi momento. Seleziona una sede, un orario di servizio o un gruppo e clicca su **Edit** per modificarne i dettagli, o su **Delete** per rimuoverlo.

:::info
La rimozione di un orario di servizio non elimina i record di presenze passati. I tuoi dati storici vengono conservati anche se modifichi il tuo programma.
:::

## Prossimi passi

Una volta che le tue sedi, gli orari dei servizi e i gruppi sono configurati, sei pronto per iniziare a [monitorare le presenze](tracking-attendance.md) o configurare il [check-in autonomo](check-in.md) per i tuoi servizi.
