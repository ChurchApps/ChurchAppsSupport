---
title: "Configurazione delle presenze"
---

# Configurazione delle presenze

<div class="article-intro">

Prima di poter tracciare le presenze, dovete dire a B1 Admin le ubicazioni fisiche della vostra chiesa, quando avvengono i servizi, e quali gruppi si incontrano a ogni servizio. Questa configurazione una tantum crea la struttura che alimenta tutto il tracciamento e la segnalazione delle presenze in tutta la vostra chiesa.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Avete bisogno di un account B1 Admin attivo con il permesso di gestire le presenze. Vedere [Ruoli e permessi](../people/roles-permissions.md) se siete incerti sul vostro livello di accesso.
- Se intendete assegnare gruppi agli orari dei servizi, assicuratevi che i vostri [gruppi siano creati](../groups/creating-groups.md) prima.

</div>

## Concetti chiave

- **Campus** -- un'ubicazione fisica dove la vostra chiesa si incontra (ad es., "Campus principale", "Campus nord"). I campus vengono gestiti in **Impostazioni**.
- **Servizio** -- una riunione ricorrente presso un campus (ad es., "Servizio domenicale", "Infrasettimanale").
- **Orario del servizio** -- un'ora specifica in cui avviene un servizio (ad es., "9:00 AM", "11:00 AM").
- **Gruppo programmato** -- un gruppo assegnato a un orario di servizio specifico. Le presenze vengono tracciato nel contesto di quel servizio.
- **Gruppo non programmato** -- un gruppo che traccia le presenze su suo conto, senza essere legato a un orario di servizio.

## Configurazione della struttura delle presenze

1. Aprite **B1 Admin**, aprite il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), ed espandete **Persone**.
2. Fate clic su **Presenze**. La scheda **Configurazione** è selezionata per impostazione predefinita.
3. Fate clic su **Gestisci campus** (in alto a destra del pannello Configurazione). Questo vi porta a **Impostazioni → Campus**. Fate clic su **Aggiungi campus**, inserite il nome della vostra ubicazione (l'indirizzo e il fuso orario sono opzionali), e fate clic su **Salva**.
4. Tornate a **Persone → Presenze → Configurazione**. Il vostro campus appare ora nella tabella di configurazione.
5. Fate clic sul **pulsante + nella colonna Servizio** sotto il vostro campus. Inserite un nome di servizio come "Servizio domenicale" e fate clic su **Salva**.
6. Fate clic sul **pulsante + nella colonna Ora** sotto il servizio. Inserite un'ora come "9:00 AM" e fate clic su **Salva**. Ripetete per ogni orario di servizio.
7. Per collegare un gruppo a un orario di servizio, aprite il gruppo da **Persone > Gruppi**, fate clic sulla matita **Modifica**, e utilizzate **Aggiungi orario del servizio** -- vedere la sezione successiva.

### Abilitazione del tracciamento delle presenze su un gruppo

Prima che un gruppo possa avere le presenze registrate, il tracciamento delle presenze deve essere attivato per quel gruppo.

1. Nel menu Jump, scegliete **Persone > Gruppi** e selezionate il gruppo.
2. Fate clic sull'icona della matita **Modifica**.
3. Impostate **Monitoraggio delle presenze** su **Sì**.
4. Fate clic su **Salva**.

:::tip
Se avete assegnato il gruppo a un orario di servizio nel passaggio precedente, utilizzate anche l'opzione **Aggiungi orario del servizio** sulla schermata di modifica del gruppo per collegarlo al servizio corretto. Questo assicura che le sessioni siano collegate al campus e all'ora corretti.
:::

:::tip
Se un gruppo si incontra al di fuori di un servizio regolare -- come un piccolo gruppo infrasettimanale che traccia le proprie presenze -- potete lasciarlo come gruppo non programmato. Apparirà comunque nella scheda Gruppi per la segnalazione delle presenze.
:::

## Modifica della vostra configurazione

Potete aggiornare la vostra configurazione in qualsiasi momento. Selezionate un campus, un orario di servizio, o un gruppo e fate clic su **Modifica** per cambiare i dettagli, o **Elimina** per rimuoverlo.

:::info
La rimozione di un orario di servizio non elimina i record di presenze passati. I vostri dati storici vengono preservati anche se cambiate la vostra pianificazione.
:::

## Cosa fare dopo

Una volta che i vostri campus, orari dei servizi, e gruppi sono al loro posto, siete pronti a iniziare [registrazione delle presenze](recording-attendance.md) manualmente o configurare [auto check-in](check-in.md) per i vostri servizi.
