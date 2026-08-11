---
title: "Impostazione presenze"
---

# Impostazione presenze

<div class="article-intro">

Prima di poter tracciare le presenze, devi dire a B1 Admin le posizioni fisiche della tua chiesa, quando avvengono i servizi, e quali gruppi si incontrano a ogni servizio. Questa configurazione una tantum crea la struttura che alimenta il tracciamento e il reporting delle presenze in tutta la tua chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di gestire le presenze. Vedi [Ruoli e autorizzazioni](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se intendi assegnare gruppi agli orari di servizio, assicurati che i tuoi [gruppi siano creati](../groups/creating-groups.md) per primi.

</div>

## Concetti chiave

- **Campus** -- una posizione fisica dove la tua chiesa si riunisce (ad es., "Campus principale", "Campus nord"). I campus sono gestiti in **Impostazioni**.
- **Servizio** -- una riunione ricorrente in un campus (ad es., "Servizio domenicale", "Infrasettimanale").
- **Ora di servizio** -- un'ora specifica in cui un servizio avviene (ad es., "9:00 AM", "11:00 AM").
- **Gruppo programmato** -- un gruppo assegnato a un'ora di servizio specifica. Le presenze vengono tracciate nel contesto di quel servizio.
- **Gruppo non programmato** -- un gruppo che traccia le presenze da solo, senza essere legato a un ora di servizio.

## Configurazione della tua struttura di presenze

1. Apri **B1 Admin**, fai clic sul **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia), e scegli **Persone**.
2. Nella barra di navigazione, fai clic sulla scheda **Presenze**. La scheda **Impostazione** è selezionata per impostazione predefinita.
3. Fai clic su **Gestisci campus** (in alto a destra del pannello Impostazione). Questo ti porta a **Impostazioni → Campus**. Fai clic su **Aggiungi campus**, immetti il nome della tua posizione (indirizzo e fuso orario sono facoltativi), e fai clic su **Salva**.
4. Ritorna a **Persone → Presenze → Impostazione**. Il tuo campus ora appare nella tabella di impostazione.
5. Fai clic sul **pulsante + nella colonna Servizio** sotto il tuo campus. Immetti un nome di servizio come "Servizio domenicale" e fai clic su **Salva**.
6. Fai clic sul **pulsante + nella colonna Ora** sotto il servizio. Immetti un ora come "9:00 AM" e fai clic su **Salva**. Ripeti per ogni ora di servizio.
7. Per connettere un gruppo a un'ora di servizio, apri il gruppo dalla scheda **Gruppi**, fai clic sulla matita **Modifica**, e usa **Aggiungi ora di servizio** — vedi la prossima sezione.

### Abilitazione del tracciamento delle presenze su un gruppo

Prima che un gruppo possa avere presenze registrate, il tracciamento delle presenze deve essere attivato per quel gruppo.

1. Fai clic su **Gruppi** nella barra laterale e seleziona il gruppo.
2. Fai clic sull'icona della matita **Modifica**.
3. Imposta **Traccia presenze** a **Sì**.
4. Fai clic su **Salva**.

:::tip
Se hai assegnato il gruppo a un'ora di servizio nel passaggio precedente, usa anche l'opzione **Aggiungi ora di servizio** sulla schermata di modifica del gruppo per collegarlo all'ora corretta. Questo assicura che le sessioni siano collegate al campus e all'ora corretti.
:::

:::tip
Se un gruppo si riunisce al di fuori di un servizio regolare -- come un piccolo gruppo infrasettimanale che traccia le sue presenze -- puoi lasciarlo come gruppo non programmato. Apparirà comunque sulla scheda Gruppi per il reporting delle presenze.
:::

## Modifica della tua configurazione

Puoi aggiornare la tua configurazione in qualsiasi momento. Seleziona un campus, ora di servizio o gruppo e fai clic su **Modifica** per modificarne i dettagli, o **Elimina** per rimuoverlo.

:::info
La rimozione di un'ora di servizio non cancella i record di presenze passati. I tuoi dati storici vengono preservati anche se cambi il tuo programma.
:::

## Prossimi passi

Una volta che i tuoi campus, orari di servizio e gruppi sono in posizione, sei pronto per iniziare a [registrare le presenze](recording-attendance.md) manualmente o a configurare [l'auto check-in](check-in.md) per i tuoi servizi.
