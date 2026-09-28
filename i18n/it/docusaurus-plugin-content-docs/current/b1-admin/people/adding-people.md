---
title: "Aggiunta di Persone"
---

# Aggiunta di Persone

<div class="article-intro">

La sezione Persone è il fondamento di B1 Admin - è il database dei membri della tua chiesa. Ogni altra funzione (gruppi, frequenza, donazioni, moduli) si ricollega ai record delle persone. Questa guida ti guida attraverso l'aggiunta di qualcuno al tuo database, la modifica dei suoi dettagli e il collegamento dei familiari nei nuclei familiari.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno di un account B1 Admin attivo con l'autorizzazione per gestire le persone. Consulta [Ruoli e Autorizzazioni](roles-permissions.md) se non sei sicuro del tuo livello di accesso.
- Se stai aggiungendo più di una manciata di persone, considera invece di usare lo strumento [Importazione CSV](importing-data.md).

</div>

## Aggiunta di una Persona

1. Naviga sul dashboard B1.church Admin.
2. Apri il **menu della sezione** nell'angolo in alto a sinistra e scegli **Persone**.
3. Fai clic sul pulsante **Aggiungi Persona** nell'angolo in alto a destra.
4. Compila il nome, cognome e indirizzo email della persona, quindi fai clic su **Aggiungi**.

La pagina del profilo della persona si aprirà, pronta per aggiungere più dettagli.

:::tip
Se stai migrando da un altro sistema di gestione della chiesa, la funzione [Importazione Dati](importing-data.md) ti permette di portare l'intera directory da un file CSV - molto più veloce che aggiungere persone una alla volta.
:::

### Avvisi di Duplicati

Se l'indirizzo email (o, quando si crea una persona dal modulo completo di Modifica, il numero di telefono o il nome/cognome/data di nascita corrispondenti) corrisponde a qualcuno già nel tuo database, appare una finestra di dialogo **Possibile Duplicato** prima che il nuovo record venga salvato. Elenca ogni persona corrispondente insieme a email, telefono e data di nascita in modo da poter confrontare.

- Fai clic su **Usa Esistente** accanto a una corrispondenza per usare il record di quella persona invece di creare uno nuovo.
- Fai clic su **Crea Comunque** per aggiungere la nuova persona anche se è stata trovata una possibile corrispondenza.

Questo controlla solo i duplicati quando stai creando una persona completamente nuova - la modifica di un record esistente non lo attiva mai. Previene solo i nuovi duplicati; non unisce due record che già esistono.

## Modifica dei Dettagli

1. Sulla pagina del profilo della persona, fai clic sulla **matita di modifica** accanto al suo nome.
2. Compila informazioni aggiuntive come secondo nome, stato di iscrizione, date, indirizzo, numeri di telefono e (per bambini e studenti) grado scolastico e scuola.
3. Fai clic su **Salva** per memorizzare le informazioni personali.

Il profilo include anche diverse schede per informazioni correlate:

- **Note** - Aggiungi note sulla persona (cura pastorale, follow-up, ecc.)
- **Gruppi** - Visualizza e gestisci [iscrizioni ai gruppi](../groups/group-members.md)
- **Frequenza** - Visualizza la cronologia individuale delle visite di questa persona, incluso il campus, il servizio, l'ora del servizio, il gruppo e una colonna **Registrato** con l'ora di check-in del chiosco (mostrato come un trattino per i giorni registrati senza check-in del chiosco). Per i trend a livello di chiesa piuttosto che la cronologia di una persona, vedi [Tracciamento della Frequenza](../attendance/tracking-attendance.md)
- **Donazioni** - Visualizza [cronologia di donazione](../donations/recording-donations.md)

## Lavoro con i Moduli

Puoi compilare moduli personalizzati direttamente dal profilo di una persona. Questi sono moduli definiti dall'utente che puoi costruire seguendo la guida [Creazione di Moduli](../forms/creating-forms.md).

1. Nel profilo della persona, fai clic sul menu a discesa **Moduli** per selezionare un modulo.
2. Fai clic su **Aggiungi Modulo** per aprirlo.
3. Riempi i dettagli del modulo e fai clic su **Salva**.

Una volta inviato un modulo, fai clic sull'**icona di stampa** accanto per stampare le risposte compilate di quella persona.

:::info
I moduli collegati al profilo di una persona utilizzano il tipo di modulo **Persone**. Se hai bisogno di un modulo autonomo (come una registrazione a un evento), vedi l'opzione [Modulo Autonomo](../forms/creating-forms.md) nella guida dei moduli.
:::

:::tip
Se hai bisogno di tracciare solo uno o due extra di informazioni sulle persone - una data, un numero, una risposta sì/no - usa [Campi Personalizzati](../settings/custom-fields.md) invece di un modulo. Sono più veloci da compilare e sono ricercabili direttamente in Ricerca Avanzata.
:::

## Gestione dei Nuclei Familiari

I nuclei familiari ti permettono di collegare i familiari insieme. Ciò è particolarmente utile per il [check-in](../attendance/check-in.md), dove un genitore può registrare tutti i suoi figli in una volta.

1. Nel profilo di una persona, fai clic sulla **matita di modifica** accanto al nome del nucleo familiare.
2. Si aprirà l'editor del nucleo familiare. Seleziona il **ruolo nel nucleo familiare** per la persona attuale (ad es., Capo, Coniuge, Figlio).
3. Fai clic su **Aggiungi** per aggiungere un altro membro del nucleo familiare.
4. Digita il nome della persona nella casella di ricerca e fai clic su **Cerca**.
5. Quando la persona appare nei risultati della ricerca, fai clic su **Seleziona**.
6. Scegli il suo ruolo nel nucleo familiare e fai clic su **Salva** per completare la configurazione del nucleo familiare.
