---
title: "Aggiunta di persone"
---

# Aggiunta di persone

<div class="article-intro">

La sezione Persone è il fondamento di B1 Admin -- è il database dei membri della tua chiesa. Ogni altra funzione (gruppi, presenze, donazioni, moduli) si riallaccia ai record delle persone. Questa guida ti guida attraverso l'aggiunta di qualcuno al tuo database, la modifica dei suoi dettagli e il collegamento dei membri della famiglia nei nuclei familiari.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con autorizzazione per gestire le persone. Vedi [Ruoli e autorizzazioni](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se stai aggiungendo più di una manciata di persone, considera l'utilizzo dello strumento [Importazione CSV](importing-data.md).

</div>

## Aggiunta di una persona

1. Accedi al dashboard B1.church Admin.
2. Fai clic su **Persone** nella barra laterale sinistra.
3. Fai clic sul pulsante **Aggiungi persona** nell'angolo in alto a destra.
4. Compila il nome, il cognome e l'indirizzo email della persona, quindi fai clic su **Aggiungi**.

La pagina del profilo della persona si aprirà, pronta per aggiungere altri dettagli.

:::tip
Se stai migrando da un altro sistema di gestione della chiesa, la funzione [Importa dati](importing-data.md) ti consente di importare l'intera directory da un file CSV -- molto più veloce che aggiungere persone una per una.
:::

## Modifica dei dettagli

1. Nella pagina del profilo della persona, fai clic sulla **matita di modifica** accanto al loro nome.
2. Compila informazioni aggiuntive come nome del mezzo, stato di appartenenza, date, indirizzo e numeri di telefono.
3. Fai clic su **Salva** per archiviare le informazioni personali.

Il profilo include anche diverse schede per le informazioni correlate:

- **Note** — Aggiungi note sulla persona (cura pastorale, follow-up, ecc.)
- **Gruppi** — Visualizza e gestisci [le appartenenze ai gruppi](../groups/group-members.md)
- **Presenze** — Visualizza i [record di presenze](../attendance/tracking-attendance.md)
- **Donazioni** — Visualizza la [cronologia delle donazioni](../donations/recording-donations.md)

## Utilizzo dei moduli

Puoi compilare moduli personalizzati direttamente dal profilo di una persona. Si tratta di moduli definiti dall'utente che puoi creare seguendo la guida [Creazione di moduli](../forms/creating-forms.md).

1. Nel profilo della persona, fai clic sul menu a discesa **Moduli** per selezionare un modulo.
2. Fai clic su **Aggiungi modulo** per aprirlo.
3. Compila i dettagli del modulo e fai clic su **Salva**.

:::info
I moduli collegati al profilo di una persona utilizzano il tipo di modulo **Persone**. Se hai bisogno di un modulo autonomo (come una registrazione di un evento), vedi l'opzione [modulo autonomo](../forms/creating-forms.md) nella guida dei moduli.
:::

:::tip
Se hai bisogno di tracciare solo una o due parti aggiuntive di informazioni sulle persone -- una data, un numero, una risposta sì/no -- usa [Campi personalizzati](../settings/custom-fields.md) invece di un modulo. Sono più veloci da compilare e sono ricercabili direttamente nella Ricerca avanzata.
:::

## Gestione dei nuclei familiari

I nuclei familiari ti consentono di collegare i membri della famiglia. Questo è particolarmente utile per il [check-in](../attendance/check-in.md), dove un genitore può fare il check-in di tutti i suoi figli in una sola volta.

1. Nel profilo di una persona, fai clic sulla **matita di modifica** accanto al nome del nucleo familiare.
2. L'editor del nucleo familiare si aprirà. Seleziona il **ruolo del nucleo familiare** per la persona attuale (ad es. Capo, Coniuge, Figlio).
3. Fai clic su **Aggiungi** per aggiungere un altro membro del nucleo familiare.
4. Digita il nome della persona nella casella di ricerca e fai clic su **Cerca**.
5. Quando la persona appare nei risultati della ricerca, fai clic su **Seleziona**.
6. Scegli il loro ruolo nel nucleo familiare e fai clic su **Salva** per completare la configurazione del nucleo familiare.
