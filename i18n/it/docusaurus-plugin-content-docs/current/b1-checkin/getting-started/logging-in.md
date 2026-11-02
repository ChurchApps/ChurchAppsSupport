---
title: "Accesso"
---

# Accesso

<div class="article-intro">

Prima che il chiosco possa essere usato per il check-in, devi accedere con un account ChurchApps che abbia accesso alla tua chiesa. Questa pagina descrive il primo accesso, la selezione della chiesa, il comportamento dell'accesso automatico e come disconnettersi.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Installa B1 Church Checkin sul tuo tablet Android (vedi [Per iniziare](./index.md))
- Tieni pronti l'email e la password del tuo account ChurchApps
- L'account deve avere il permesso **Checkin** (oppure **Modifica presenze**) nella tua chiesa. Un amministratore lo aggiunge in B1 Admin, in **Impostazioni > Ruoli** — vedi [Account per il chiosco di check-in](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Primo accesso

1. Apri l'app B1 Church Checkin. Dopo la schermata di avvio, vedrai la schermata di accesso con il logo di B1 Church Checkin.
2. Inserisci il tuo **indirizzo email** nel primo campo.
3. Inserisci la tua **password** nel secondo campo.
4. Tocca il pulsante **Accedi**.

L'app verifica le tue credenziali e ti accede. Se l'email o la password sono errate, vedrai un messaggio di errore in fondo alla schermata.

Se l'account ha attivo l'[accesso a due fattori](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), l'app chiede a questo punto un codice. Inserisci il codice a 6 cifre dall'app di autenticazione del titolare dell'account, oppure uno dei suoi codici di backup, e tocca di nuovo **Accedi**. Ti serve il codice solo per questo primo accesso; dopo, il chiosco resta connesso.

:::info
È la stessa email e la stessa password che usi per B1 Admin o per qualsiasi altro prodotto ChurchApps. Non ti serve un account separato per il chiosco di check-in.
:::

## Selezionare la tua chiesa

Dopo un accesso riuscito, l'app carica le chiese in cui il tuo account ha il permesso **Checkin** o **Modifica presenze**. Le chiese in cui hai solo altri permessi vengono escluse. Se non ne rimane nessuna, l'app mostra **Nessun accesso al check-in** e ti chiede di far aggiungere al tuo amministratore il permesso Checkin a uno dei tuoi ruoli. Ogni chiesa è mostrata come una scheda con il nome e il logo della chiesa (se è stato configurato in B1 Admin).

- Se il tuo account è collegato a **una sola chiesa**, vedrai comunque la schermata di selezione. Tocca la tua chiesa per continuare.
- Se il tuo account è collegato a **più chiese**, tocca la chiesa che questo chiosco deve servire.

Una volta selezionata la chiesa, l'app carica l'identità visiva e le impostazioni di aspetto di quella chiesa. Il logo della tua chiesa comparirà nell'intestazione di tutte le schermate successive.

## Accesso automatico nelle visite successive

Dopo il primo accesso riuscito, l'app conserva sul tablet un token di accesso sicuro e la chiesa selezionata. Non memorizza la tua password. Nelle aperture successive:

- L'app ti riconnette automaticamente con il token salvato.
- Se in precedenza avevi selezionato una chiesa, ne ripristina la selezione e ti porta direttamente alla **schermata dei culti**.
- Se l'accesso salvato non è più valido, l'app torna alla schermata di accesso così puoi accedere di nuovo.

:::tip
Poiché il chiosco accede automaticamente, devi inserire le credenziali una sola volta durante la configurazione iniziale. Dopo di che, il tablet può essere acceso e sarà pronto all'uso.
:::

## Impostazioni amministratore

Le impostazioni amministratore sono volutamente nascoste, così i membri della chiesa che usano il chiosco non possono modificare la configurazione per sbaglio. Per accedervi:

1. Tocca il **logo della chiesa** nell'intestazione **sette volte** di seguito, rapidamente (entro due secondi).
2. Se è stato impostato un PIN del chiosco, inseriscilo quando richiesto.
3. Si apre la schermata **Impostazioni amministratore** con le seguenti opzioni:
   - **Cambia culto** — cambia l'orario del culto selezionato
   - **Cambia stampante** — apri le [impostazioni della stampante](./printer-setup) per cercare e selezionare una stampante
   - **Imposta/Cambia PIN** — imposta o aggiorna il PIN del chiosco che protegge l'accesso amministratore
   - **Esci** — disconnettiti e torna alla schermata di accesso

:::warning
Disconnettersi cancella tutte le credenziali salvate e la selezione della chiesa. Dovrai inserire di nuovo email e password per usare di nuovo il chiosco. Disconnettiti solo quando devi cambiare account o riconfigurare il chiosco.
:::

## Passi successivi

Una volta effettuato l'accesso, puoi [configurare una stampante](./printer-setup) oppure andare direttamente al [flusso di check-in](../check-in/).
