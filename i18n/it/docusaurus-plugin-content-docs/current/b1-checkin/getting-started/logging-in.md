---
title: "Accedere a B1 Church Checkin"
sidebar_label: "Accesso"
description: "Accedi all'app kiosk B1 Church Checkin, scegli la tua chiesa e scopri l'accesso automatico, le impostazioni amministrative e la disconnessione sul tablet per il check-in."
---

# Accesso

<div class="article-intro">

Prima di poter usare il kiosk per il check-in, devi accedere con un account ChurchApps che abbia accesso alla tua chiesa. Questa pagina spiega il primo accesso, la selezione della chiesa, il comportamento dell'accesso automatico e come disconnettersi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa B1 Church Checkin sul tuo tablet Android (vedi [Per iniziare](./index.md))
- Tieni a portata di mano l'email e la password del tuo account ChurchApps
- L'account deve avere l'autorizzazione **Checkin** (o **Modifica presenze**) per la tua chiesa. Un amministratore la aggiunge in B1 Admin, in **Impostazioni > Ruoli**. Vedi [Account per il kiosk di check-in](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Primo accesso

1. Apri l'app B1 Church Checkin. Dopo la schermata di avvio vedrai la schermata di accesso con il logo di B1 Church Checkin.
2. Inserisci la tua **email** nel primo campo.
3. Inserisci la tua **password** nel secondo campo.
4. Tocca il pulsante **Accedi**.

L'app verifica le tue credenziali e ti fa accedere. Se email o password non sono corrette, vedrai un messaggio di errore in fondo alla schermata.

Se per l'account è attiva la [verifica in due passaggi](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), l'app ti chiederà poi un codice. Inserisci il codice a 6 cifre dell'app di autenticazione del titolare dell'account, oppure uno dei suoi codici di backup, e tocca di nuovo **Accedi**. Il codice serve solo per il primo accesso; dopodiché il kiosk resta connesso.

:::info
Sono le stesse email e password che usi per B1 Admin o per qualsiasi altro prodotto ChurchApps. Non ti serve un account separato per il kiosk di check-in.
:::

## Selezionare la tua chiesa

Dopo un accesso riuscito, l'app carica le chiese in cui il tuo account ha l'autorizzazione **Checkin** o **Modifica presenze**. Le chiese in cui hai solo altre autorizzazioni non vengono incluse. Se non ne resta nessuna, l'app mostra **Nessun accesso al check-in** e ti chiede di far aggiungere l'autorizzazione Checkin a uno dei tuoi ruoli dall'amministratore della chiesa. Ogni chiesa è mostrata come una scheda con il nome e il logo della chiesa (se configurato in B1 Admin).

- Se il tuo account è collegato a **una sola chiesa**, vedrai comunque la schermata di selezione. Tocca la tua chiesa per continuare.
- Se il tuo account è collegato a **più chiese**, tocca quella che vuoi che questo kiosk serva.

Una volta selezionata la chiesa, l'app carica il branding e l'aspetto di quella chiesa. Il logo della tua chiesa comparirà nell'intestazione in tutte le schermate successive.

## Accesso automatico nelle visite successive

Dopo il primo accesso riuscito, l'app conserva sul tablet un token di accesso sicuro e la chiesa selezionata. Non memorizza la tua password. Alle aperture successive:

- L'app ti riconnette automaticamente con il token salvato.
- Se in precedenza avevi selezionato una chiesa, ne ripristina la selezione e ti porta direttamente alla **schermata dei servizi**.
- Se l'accesso salvato non è più valido, l'app torna alla schermata di accesso così potrai accedere di nuovo.

:::tip
Poiché il kiosk accede automaticamente, ti basta inserire le credenziali una sola volta durante la configurazione iniziale. Dopodiché, il tablet può essere acceso e sarà subito pronto all'uso.
:::

## Impostazioni amministrative

Le impostazioni amministrative sono volutamente nascoste, così i membri della chiesa che usano il kiosk non possono modificare la configurazione per sbaglio. Per accedervi:

1. Tocca il **logo della chiesa** nell'intestazione **sette volte** in rapida successione (entro due secondi).
2. Se è impostato un PIN del kiosk, inseriscilo quando richiesto.
3. Si aprirà la schermata **Impostazioni amministrative** con le seguenti opzioni:
   - **Cambia servizio**: passa all'orario di servizio selezionato
   - **Cambia stampante**: apri le [impostazioni della stampante](./printer-setup.md) per cercare e selezionare una stampante
   - **Imposta PIN amministratore** (oppure **Cambia PIN amministratore** una volta impostato): imposta o aggiorna il PIN del kiosk che protegge l'accesso amministrativo
   - **Comunicazione di emergenza**: invia un messaggio di testo ai tutori di ogni nucleo familiare registrato (vedi [Comunicazione di emergenza](../check-in/checking-out.md#emergency-broadcast))
   - **Modalità postazione presidiata**: un interruttore che aggiunge a questa postazione il check-out, l'assistenza per la chiamata, la ristampa e la modifica dei profili (vedi [Check-out](../check-in/checking-out.md))
   - **Esci**: disconnettiti e torna alla schermata di accesso

   Tocca **Torna al kiosk** per tornare al check-in.

:::warning
Uscire cancella tutte le credenziali salvate e la selezione della chiesa. Dovrai inserire di nuovo email e password per usare di nuovo il kiosk. Esci solo quando devi cambiare account o riconfigurare il kiosk.
:::

## Passaggi successivi

Una volta effettuato l'accesso, puoi [configurare una stampante](./printer-setup.md) oppure passare direttamente al [flusso di lavoro del check-in](../check-in/index.md).
