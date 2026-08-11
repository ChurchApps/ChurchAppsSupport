---
title: "Aggiunta di persone"
---

# Aggiunta di persone

<div class="article-intro">

La sezione Persone è la base di B1 Admin — è il database dei membri della tua chiesa. Ogni altra funzione (gruppi, presenze, donazioni, moduli) è collegata ai record delle persone. Questa guida ti guida attraverso l'aggiunta di qualcuno al tuo database, la modifica dei loro dettagli e il collegamento dei componenti della famiglia in famiglie.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con il permesso di gestire le persone. Vedi [Ruoli e autorizzazioni](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se stai aggiungendo più di pochi persone, considera l'uso dello strumento [Importazione CSV](importing-data.md).

</div>

## Aggiunta di una persona

1. Vai al dashboard B1.church Admin.
2. Apri il **menu sezione** nell'angolo in alto a sinistra e scegli **Persone**.
3. Fai clic sul pulsante **Aggiungi persona** nell'angolo in alto a destra.
4. Riempi il nome e il cognome della persona e l'indirizzo email, quindi fai clic su **Aggiungi**.

La pagina del profilo della persona si aprirà, pronta per aggiungere altri dettagli.

:::tip
Se stai eseguendo la migrazione da un altro sistema di gestione della chiesa, la funzione [Importazione dati](importing-data.md) ti permette di portare l'intera tua directory da un file CSV — molto più veloce dell'aggiunta di persone una per una.
:::

## Modifica dettagli

1. Sulla pagina del profilo della persona, fai clic sulla **matita di modifica** accanto al loro nome.
2. Riempi le informazioni aggiuntive come nome di mezzo, stato di iscrizione, date, indirizzo, numeri di telefono e (per bambini e studenti) grado e scuola.
3. Fai clic su **Salva** per archiviare le informazioni personali.

Il profilo include anche diverse schede per informazioni correlate:

- **Note** — Aggiungi note sulla persona (cura pastorale, follow-up, ecc.)
- **Gruppi** — Visualizza e gestisci [iscrizioni ai gruppi](../groups/group-members.md)
- **Presenze** — Visualizza [record di presenze](../attendance/tracking-attendance.md)
- **Donazioni** — Visualizza [cronologia donazioni](../donations/recording-donations.md)

## Lavorare con i moduli

Puoi compilare moduli personalizzati direttamente dal profilo di una persona. Questi sono moduli definiti dall'utente che puoi creare seguendo la guida [Creazione di moduli](../forms/creating-forms.md).

1. Sul profilo della persona, fai clic sul **dropdown Moduli** per selezionare un modulo.
2. Fai clic su **Aggiungi modulo** per aprirlo.
3. Riempi i dettagli del modulo e fai clic su **Salva**.

:::info
I moduli collegati al profilo di una persona utilizzano il tipo di modulo **Persone**. Se hai bisogno di un modulo autonomo (come una registrazione dell'evento), vedi l'opzione [Modulo autonomo](../forms/creating-forms.md) nella guida dei moduli.
:::

:::tip
Se hai solo bisogno di tracciare uno o due pezzi di informazione aggiuntiva sulle persone — una data, un numero, una risposta sì/no — usa [Campi personalizzati](../settings/custom-fields.md) al posto di un modulo. Sono più veloci da compilare e sono ricercabili direttamente nella Ricerca avanzata.
:::

## Gestione delle famiglie

Le famiglie ti permettono di collegare insieme i componenti della famiglia. Questo è particolarmente utile per il [check-in](../attendance/check-in.md), dove un genitore può fare il check-in di tutti i suoi figli in una volta.

1. Sul profilo di una persona, fai clic sulla **matita di modifica** accanto al nome della famiglia.
2. L'editor della famiglia si aprirà. Seleziona il **ruolo famigliare** per la persona attuale (ad es., Capo, Coniuge, Bambino).
3. Fai clic su **Aggiungi** per aggiungere un altro membro della famiglia.
4. Digita il nome della persona nella casella di ricerca e fai clic su **Ricerca**.
5. Quando la persona appare nei risultati di ricerca, fai clic su **Seleziona**.
6. Scegli il loro ruolo famigliare e fai clic su **Salva** per completare la configurazione della famiglia.
