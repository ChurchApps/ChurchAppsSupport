---
title: "Impostazioni dell'app mobile"
---

# Impostazioni dell'app mobile

<div class="article-intro">

La pagina Impostazioni dell'app mobile ti permette di configurare i tab di navigazione che appaiono nell'**esperienza mobile B1.church (PWA)** per i tuoi membri della chiesa. Controlli quali tab sono visibili, a cosa si collegano e come vengono visualizzati.

</div>

:::info L'app mobile B1 nativa è deprecata
I tab configurati qui sono forniti attraverso l'[App web progressiva B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), che ha sostituito l'app mobile nativa B1. Condividi la tua pagina di installazione della chiesa, `https://yourchurchname.b1.church/mobile/install`, con i membri; ti guida attraverso l'installazione dell'app sul loro dispositivo, senza necessità di download da App Store o Google Play.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- È necessaria l'autorizzazione "Modifica impostazioni della chiesa". Vedi [Roles & Permissions](./roles-permissions.md) se non hai accesso.
- Configura prima le tue [Church Settings](./church-settings.md), incluso il nome della tua chiesa e il marchio

</div>

## Accesso alle impostazioni di navigazione

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) e espandi **Mobile**.
2. Fai clic su **Navigation** (`/mobile/navigation`).
3. La pagina di navigazione visualizza i tuoi tab dell'app attuali.

## Aggiunta di un nuovo tab

1. Fai clic sul pulsante **Add Tab** in cima alla pagina.
2. Compila i dettagli del tab:
   - **Name** -- L'etichetta che appare sul tab (ad esempio, "Sermons" o "Give").
   - **Icon** -- Fai clic sul selezionatore di icone per scegliere un'icona per il tuo tab. Puoi anche caricare un'immagine personalizzata.
   - **Tab Type** -- Scegli tra opzioni come Bible, Live Stream, Donation, Website, e altro.
   - **URL** -- Immetti l'indirizzo web a cui il tab deve collegarsi.
   - **Visibility** -- Controlla chi può vedere questo tab (tutti, solo i membri, ecc.).
3. Fai clic su **Save Tab** per aggiungerlo alla tua app.

## Modifica di un tab esistente

1. Fai clic su qualsiasi tab esistente nell'elenco **App Tabs**.
2. Aggiorna il nome del tab, l'icona, l'URL, il tipo o le impostazioni di visibilità.
3. Fai clic su **Save Tab** per applicare le tue modifiche.

## Riordinamento dei tab

Puoi modificare l'ordine in cui i tab appaiono nell'app mobile. Trascina e rilascia i tab nell'elenco per riordinarli. L'ordine mostrato su questa pagina corrisponde all'ordine che i tuoi membri vedranno nell'app.

:::info
Alcuni tab possono apparire automaticamente quando si soddisfano determinate condizioni, ad esempio un tab Live Stream può apparire quando uno stream è attivo. I tab aggiunti manualmente ti danno pieno controllo su ciò che i tuoi membri vedono in ogni momento.
:::

:::tip
Mantieni il numero di tab gestibile. Da tre a cinque tab funziona bene per la maggior parte delle chiese. Troppi tab possono rendere confusa la navigazione per i tuoi membri.
:::

## Impostazioni della directory dei membri e della messaggistica

L'elemento **Member portal** nella stessa sezione Mobile contiene le impostazioni che controllano la directory dei membri e la messaggistica privata nell'esperienza B1.church:

- **Directory Approval Group** -- Il gruppo che rivede gli aggiornamenti della directory dei membri, e [richieste di eliminazione dell'account](../profile/account-deletion.md), prima che abbiano effetto.
- **Show in Directory** -- Chi può apparire nella directory dei membri (Solo staff fino a Tutti).
- **Visibility Preference** -- Imposta il valore predefinito a livello di chiesa per i membri che non hanno ancora scelto la loro impostazione. **Address**, **Phone Number**, e **Email** hanno ognuno il loro menu a discesa, con i cinque stessi livelli disponibili ovunque la visibilità sia configurata:
  - **Everyone** -- visibile a chiunque, inclusi i visitatori anonimi
  - **Members** -- visibile solo alle persone con un record Member o Staff
  - **Groups Only** -- visibile solo alle persone che condividono un gruppo con questa persona
  - **My Group Leaders and Staff** -- visibile solo ai leader di un gruppo a cui questa persona appartiene, più lo staff
  - **Staff Only** -- visibile solo allo staff con il permesso People > View, e alla persona stessa

  I membri possono ignorare questi valori predefiniti per il loro record dalla scheda **Privacy** del loro profilo nel B1.church PWA, vedi [Editing Your Profile](/docs/b1-church/getting-started/me-page).
- **Minimum Age for Private Messages** -- Un controllo di sicurezza per i bambini. B1 non aprirà una conversazione di **nuovo** messaggio privato quando una persona è sotto questa età, in base alla loro data di nascita (il ruolo del nucleo familiare viene utilizzato come fallback quando non è presente una data di nascita nel file). Le persone sotto l'età rimangono completamente visibili nella directory, solo la messaggistica diretta è bloccata, **in entrambe le direzioni**, per tutti incluso lo staff. Le conversazioni di gruppo e la messaggistica ai genitori di un bambino continuano a funzionare. Le opzioni sono Off, 13, 16, o 18; il valore predefinito è **18**. Le conversazioni esistenti non sono influenzate.

:::tip
Poiché il controllo dell'età minima si basa sulle date di nascita, assicurati che le date di nascita siano compilate per i bambini nella tua congregazione. Questa impostazione appartiene alla stessa famiglia di controlli di sicurezza per bambini come [check-in safety controls](../attendance/checkin-safety.md).
:::

### Prompt di accesso della schermata iniziale

I visitatori che aprono la [schermata iniziale](/docs/b1-church/getting-started/navigating#home) dell'app senza accedere vedono un breve prompt, per impostazione predefinita, *"Sign in to see your groups, giving, and more."*, accanto a un pulsante **Sign In**. Le impostazioni **Home screen sign-in prompt** sulla stessa pagina Member portal (`/mobile/b1-mobile`) ti permettono di cambiarla:

- **Show sign-in prompt on the app home screen** -- Disattiva questa opzione per nascondere sia il prompt che il pulsante **Sign In** dalla schermata iniziale. I visitatori possono comunque accedere dal menu dell'app.
- **Sign-in prompt text** -- Sostituisci il testo predefinito con il tuo messaggio (fino a 150 caratteri). Lascialo vuoto per utilizzare il valore predefinito. Questa casella è disabilitata mentre il prompt è disattivato.

Fai clic su **Save** per applicare. Il salvataggio aggiorna le impostazioni memorizzate nella cache dell'app, quindi il cambiamento appare la prossima volta che la schermata iniziale si carica.

## Dove appaiono questi tab

I tab che configuri qui vengono visualizzati nel **B1.church PWA** che i tuoi membri installano da qualsiasi pagina su `https://yourchurchname.b1.church`. I cambiamenti che apporti su questa pagina si riflettono la prossima volta che un membro apre l'app. (I tab vengono anche renderizzati dall'app mobile nativa legacy [B1 Mobile](/docs/b1-mobile/) per i membri che la eseguono ancora, ma quell'app è deprecata e non viene più aggiornata.)

## Passaggi successivi

- [Church Settings](./church-settings.md) -- Configura le informazioni della tua chiesa e il marchio
- [Roles & Permissions](./roles-permissions.md) -- Gestisci l'accesso per il tuo team
