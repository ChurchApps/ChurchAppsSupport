---
title: "Configurazione della Presenza"
---

# Configurazione della Presenza

<div class="article-intro">

Prima di poter tracciare la presenza, devi dire a B1 Admin le sedi fisiche della tua chiesa, quando avvengono i servizi e quali gruppi si incontrano ad ogni servizio. Questa configurazione una tantum crea la struttura che alimenta tutto il tracciamento e la rendicontazione della presenza in tutta la tua chiesa.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di gestire la presenza. Vedi [Ruoli e Autorizzazioni](../people/roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se hai intenzione di assegnare gruppi ai tempi dei servizi, assicurati che i tuoi [gruppi siano creati](../groups/creating-groups.md) prima.

</div>

## Concetti Chiave

- **Campus** - una sede fisica dove la tua chiesa si riunisce (ad es. "Campus Principale", "Campus Nord"). I campus vengono gestiti sotto **Impostazioni**.
- **Servizio** - una riunione ricorrente in un campus (ad es. "Servizio della Domenica", "Riunione Settimanale").
- **Tempo di Servizio** - un'ora specifica in cui avviene un servizio (ad es. "9:00", "11:00").
- **Gruppo Programmato** - un gruppo assegnato a un tempo di servizio specifico. La presenza viene tracciata nel contesto di quel servizio.
- **Gruppo Non Programmato** - un gruppo che traccia la presenza autonomamente, senza essere legato a un tempo di servizio.

## Configurazione della Tua Struttura di Presenza

1. Apri **B1 Admin**, fai clic sul **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia), e scegli **Persone**.
2. Nella barra di navigazione, fai clic sulla scheda **Presenza**. La scheda **Configurazione** è selezionata per impostazione predefinita.
3. Fai clic su **Gestisci Campus** (in alto a destra nel pannello Configurazione). Questo ti porta a **Impostazioni → Campus**. Fai clic su **Aggiungi Campus**, inserisci il nome della tua sede (l'indirizzo e il fuso orario sono facoltativi), e fai clic su **Salva**.
4. Torna a **Persone → Presenza → Configurazione**. Il tuo campus ora appare nella tabella di configurazione.
5. Fai clic sul **pulsante + nella colonna Servizio** sotto il tuo campus. Inserisci un nome di servizio come "Servizio della Domenica" e fai clic su **Salva**.
6. Fai clic sul **pulsante + nella colonna Ora** sotto il servizio. Inserisci un'ora come "9:00" e fai clic su **Salva**. Ripeti per ogni tempo di servizio.
7. Per collegare un gruppo a un tempo di servizio, apri il gruppo dalla scheda **Gruppi**, fai clic sulla matita **Modifica**, e usa **Aggiungi Tempo di Servizio** — vedi la sezione successiva.

### Abilitazione del Tracciamento della Presenza su un Gruppo

Prima che un gruppo possa avere la presenza registrata, il Tracciamento della Presenza deve essere attivato per quel gruppo.

1. Apri il **menu della sezione** nell'angolo in alto a sinistra e scegli **Persone**, quindi fai clic sulla scheda **Gruppi** e seleziona il gruppo.
2. Fai clic sulla matita dell'icona **Modifica**.
3. Imposta **Traccia Presenza** su **Sì**.
4. Fai clic su **Salva**.

:::tip
Se hai assegnato il gruppo a un tempo di servizio nel passaggio precedente, usa anche l'opzione **Aggiungi Tempo di Servizio** nella schermata di modifica del gruppo per collegarlo al servizio corretto. Questo garantisce che le sessioni siano collegate al campus e all'ora corretti.
:::

:::tip
Se un gruppo si riunisce al di fuori di un servizio regolare - come un piccolo gruppo tra la settimana che traccia la sua stessa presenza - puoi lasciarlo come un gruppo non programmato. Apparirà comunque nella scheda Gruppi per la rendicontazione della presenza.
:::

## Modifica della Tua Configurazione

Puoi aggiornare la tua configurazione in qualsiasi momento. Seleziona un campus, tempo di servizio o gruppo e fai clic su **Modifica** per cambiare i suoi dettagli, o **Elimina** per rimuoverlo.

:::info
La rimozione di un tempo di servizio non elimina i record di presenza passati. I tuoi dati storici vengono preservati anche se cambi il tuo programma.
:::

## Cosa c'è Dopo

Una volta che i tuoi campus, tempi di servizio e gruppi sono in posizione, sei pronto per iniziare la [registrazione della presenza](recording-attendance.md) manuale o configurare l'[auto check-in](check-in.md) per i tuoi servizi.
