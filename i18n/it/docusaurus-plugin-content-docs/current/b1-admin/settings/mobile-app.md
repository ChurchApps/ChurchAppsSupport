---
title: "Impostazioni dell'app mobile"
---

# Impostazioni dell'app mobile {#mobile-app-settings}

<div class="article-intro">

La pagina Impostazioni dell'app mobile ti permette di configurare le schede di navigazione che compaiono nell'**esperienza mobile B1.church (PWA)** per i membri della tua chiesa. Controlli quali schede sono visibili, dove portano e come vengono visualizzate.

</div>

:::info L'app nativa B1 Mobile è obsoleta
Le schede configurate qui vengono distribuite tramite la [Progressive Web App (PWA) di B1.church](/docs/b1-church/getting-started/installing-pwa), che ha sostituito l'app nativa B1 Mobile. Condividi con i membri la pagina di installazione della tua chiesa — `https://yourchurchname.b1.church/mobile/install` — che li guida nell'installazione dell'app sul loro dispositivo, senza bisogno di scaricarla dall'App Store o da Google Play.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve il permesso "Modifica impostazioni della chiesa". Consulta [Ruoli e permessi](./roles-permissions.md) se non hai l'accesso.
- Configura prima le tue [Impostazioni della chiesa](./church-settings.md), incluso il nome della chiesa e il branding

</div>

## Accedere alle impostazioni di navigazione {#accessing-navigation-settings}

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **Navigazione** (`/mobile/navigation`).
3. La pagina Navigazione mostra le schede attuali della tua app.

## Aggiungere una nuova scheda {#adding-a-new-tab}

1. Fai clic sul pulsante **Aggiungi scheda** in alto nella pagina.
2. Compila i dettagli della scheda:
   - **Nome** -- l'etichetta che compare sulla scheda (ad esempio "Predica" o "Dona").
   - **Icona** -- Fai clic sul selettore dell'icona per scegliere un'icona per la scheda.
   - **Immagine** -- Fai clic su **Seleziona immagine** (o **Cambia immagine**) per assegnare alla scheda una foto. Le schede con una foto compaiono come riquadri fotografici nella schermata Home dell'app: vedi [Riquadri della schermata Home](#home-screen-tiles).
   - **Tipo di scheda** -- Scegli tra opzioni come Bibbia, Diretta streaming, Donazione, Sito web e altre.
   - **URL** -- Inserisci l'indirizzo web a cui deve collegarsi la scheda.
   - **Visibilità** -- Controlla chi può vedere questa scheda (tutti, solo membri, ecc.). Per una scheda **Rubrica dei membri**, questa impostazione controlla solo chi vede la scheda stessa; chi può aprire la rubrica è stabilito da **Mostra nella rubrica** nella pagina Portale membri (vedi [Impostazioni della rubrica dei membri e della messaggistica](#member-directory--messaging-settings)).
3. Fai clic su **Salva scheda** per aggiungerla alla tua app.

## Modificare una scheda esistente {#editing-an-existing-tab}

1. Fai clic su una qualsiasi scheda esistente nell'elenco **Schede dell'app**.
2. Aggiorna il nome, l'icona, l'URL, il tipo o le impostazioni di visibilità della scheda.
3. Fai clic su **Salva scheda** per applicare le modifiche.

## Riordinare le schede {#reordering-tabs}

Puoi cambiare l'ordine in cui le schede compaiono nell'app mobile. Trascina le schede nell'elenco per riordinarle. L'ordine mostrato in questa pagina corrisponde all'ordine che vedranno i tuoi membri nell'app.

:::info
Alcune schede possono comparire automaticamente quando si verificano determinate condizioni: ad esempio, una scheda Diretta streaming può apparire quando una diretta è attiva. Le schede aggiunte manualmente ti danno il controllo completo su ciò che i membri vedono in ogni momento.
:::

:::tip
Mantieni il numero di schede gestibile. Da tre a cinque schede funzionano bene per la maggior parte delle chiese. Troppe schede possono rendere la navigazione confusa per i membri.
:::

## Impostazioni della rubrica dei membri e della messaggistica {#member-directory--messaging-settings}

La voce **Portale membri**, nella stessa sezione Mobile, contiene le impostazioni che regolano la rubrica dei membri e la messaggistica privata nell'esperienza B1.church:

- **Gruppo di approvazione della rubrica** -- Il gruppo che esamina gli aggiornamenti della rubrica dei membri e le [richieste di eliminazione dell'account](../profile/account-deletion.md) prima che abbiano effetto.
- **Mostra nella rubrica** -- Chi può aprire la rubrica dei membri e chi vi è elencato: **Solo personale**, **Membri e personale** (predefinito), **Frequentanti abituali e superiori** oppure **Tutti (inclusi i visitatori)**. Le persone il cui stato di membro è inferiore al livello scelto non vedono la rubrica e non vi compaiono. Il personale con il permesso Persone > Visualizza può sempre aprire la rubrica e vedere tutti, indipendentemente da questa impostazione.
- **Preferenza di visibilità** -- Imposta il valore predefinito per l'intera chiesa per i membri che non hanno ancora scelto la propria impostazione. **Indirizzo**, **Numero di telefono** ed **Email** hanno ciascuno un menu a discesa, con gli stessi cinque livelli disponibili ovunque si configuri la visibilità:
  - **Tutti** -- visibile a chiunque, inclusi i visitatori anonimi
  - **Membri** -- visibile solo a persone con un record di Membro o Personale
  - **Solo gruppi** -- visibile solo a persone che condividono un gruppo con questa persona
  - **I miei responsabili di gruppo e il personale** -- visibile solo ai responsabili di un gruppo di cui questa persona fa parte, oltre al personale
  - **Solo personale** -- visibile solo al personale con il permesso Persone > Visualizza e alla persona stessa

  I membri possono sostituire questi valori predefiniti per il proprio record dalla scheda **Privacy** del proprio profilo nella PWA di B1.church: vedi [Modificare il tuo profilo](/docs/b1-church/getting-started/me-page).
- **Età minima per i messaggi privati** -- Un controllo per la sicurezza dei minori. B1 non apre una **nuova** conversazione privata quando una delle due persone è al di sotto di questa età, in base alla data di nascita (il ruolo nel nucleo familiare viene usato come riserva quando non è registrata alcuna data di nascita). Le persone sotto questa età restano completamente visibili nella rubrica: viene bloccata solo la messaggistica diretta, in **entrambe le direzioni**, per tutti, personale compreso. Le conversazioni di gruppo e la messaggistica con i genitori di un minore continuano a funzionare. Le opzioni sono Disattivato, 13, 16 o 18; il valore predefinito è **18**. Le conversazioni esistenti non sono interessate.

:::tip
Poiché il controllo dell'età minima si basa sulle date di nascita, assicurati di inserire le date di nascita dei bambini della tua comunità. Questa impostazione fa parte della stessa famiglia di controlli di sicurezza dei minori dei [controlli di sicurezza del check-in](../attendance/checkin-safety.md).
:::

### Messaggio di accesso nella schermata Home {#home-screen-sign-in-prompt}

I visitatori che aprono la [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app senza accedere vedono un breve messaggio, per impostazione predefinita *"Accedi per vedere i tuoi gruppi, le donazioni e altro."*, accanto a un pulsante **Accedi**. Le impostazioni **Messaggio di accesso nella schermata Home**, nella stessa pagina Portale membri (`/mobile/b1-mobile`), ti permettono di modificarlo:

- **Mostra il messaggio di accesso nella schermata Home dell'app** -- Disattivalo per nascondere sia il messaggio sia il pulsante **Accedi** dalla schermata Home. I visitatori possono comunque accedere dal menu dell'app.
- **Testo del messaggio di accesso** -- Sostituisci il testo predefinito con un tuo messaggio (fino a 150 caratteri). Lascialo vuoto per usare quello predefinito. Questa casella è disabilitata quando il messaggio è disattivato.

Fai clic su **Salva** per applicare. Il salvataggio aggiorna le impostazioni memorizzate nella cache dell'app, quindi la modifica compare la prossima volta che si carica la schermata Home.

### Riquadri della schermata Home {#home-screen-tiles}

Le schede che hanno una foto (vedi **Immagine** in [Aggiungere una nuova scheda](#adding-a-new-tab)) compaiono nella [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app come riquadri fotografici, in una sezione intitolata con il nome della tua chiesa. Vi rientra anche una scheda Versetto del giorno, se le assegni una foto. Le schede con foto compaiono comunque anche nella barra delle schede.

L'impostazione **Riquadri della schermata Home**, nella stessa pagina Portale membri (`/mobile/b1-mobile`), controlla come sono disposti questi riquadri. Scegli un **Layout**:

- **Griglia** -- Due riquadri per riga (predefinito). Quando il numero di riquadri è dispari, il primo riquadro occupa tutta la larghezza.
- **Riga scorrevole** -- Una riga di riquadri che i membri scorrono lateralmente.
- **Elenco** -- Un elenco con una piccola miniatura della foto accanto al nome di ogni scheda.

Fai clic su **Salva** per applicare.

## Dove compaiono queste schede {#where-these-tabs-appear}

Le schede che configuri qui vengono visualizzate nella **PWA B1.church** che i tuoi membri installano da qualsiasi pagina di `https://yourchurchname.b1.church`. Le modifiche apportate in questa pagina si riflettono la prossima volta che un membro apre l'app.

Su un telefono, la barra delle schede in basso mostra **Home**, fino a tre delle tue schede e **Altro**; su un computer, l'intestazione mostra fino a cinque schede. Le schermate integrate (come Prediche, Donazioni o Gruppi) ottengono prima i loro posti, e le schede **Pagina interna** riempiono gli eventuali posti rimasti liberi. Le schede **URL esterno** e **Versetto del giorno** non ottengono mai un posto. Ogni scheda, incluse quelle che non trovano posto, è elencata nella pagina **Altro** dell'app. Consulta [Navigare in B1App](/docs/b1-church/getting-started/navigating) per vedere cosa vedono i membri. (Le schede vengono visualizzate anche dalla [app nativa B1 Mobile](/docs/b1-mobile/) per i membri che la usano ancora, ma quell'app è obsoleta e non viene più aggiornata.)

## Passaggi successivi {#next-steps}

- [Impostazioni della chiesa](./church-settings.md) -- Configura le informazioni e il branding della tua chiesa
- [Ruoli e permessi](./roles-permissions.md) -- Gestisci l'accesso per il tuo team
