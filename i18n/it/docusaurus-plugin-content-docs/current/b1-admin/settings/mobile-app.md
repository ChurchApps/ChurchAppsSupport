---
title: "Impostazioni dell'app mobile"
---

# Impostazioni dell'app mobile

<div class="article-intro">

La pagina Impostazioni dell'app mobile ti permette di configurare le schede di navigazione che compaiono nell'**esperienza mobile di B1.church (PWA)** per i membri della tua chiesa. Puoi decidere quali schede sono visibili, a cosa rimandano e come vengono visualizzate.

</div>

:::info L'app mobile nativa B1 è obsoleta
Le schede configurate qui vengono distribuite tramite la [Progressive Web App (PWA) di B1.church](/docs/b1-church/getting-started/installing-pwa), che ha sostituito l'app mobile nativa B1. Condividi con i membri la pagina di installazione della tua chiesa, `https://yourchurchname.b1.church/mobile/install`: li guiderà nell'installazione dell'app sul loro dispositivo, senza bisogno di scaricarla dall'App Store o da Google Play.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione "Modifica impostazioni della chiesa". Se non hai accesso, vedi [Ruoli e permessi](./roles-permissions.md).
- Configura prima le tue [Impostazioni della chiesa](./church-settings.md), incluso il nome della chiesa e il branding

</div>

## Accedere alle impostazioni di navigazione

1. In B1 Admin, apri il [menu di accesso rapido](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **Navigazione** (`/mobile/navigation`).
3. La pagina Navigazione mostra le schede attuali della tua app.

## Aggiungere una nuova scheda

1. Fai clic sul pulsante **Aggiungi scheda** in cima alla pagina.
2. Compila i dettagli della scheda:
   - **Nome** -- L'etichetta che compare sulla scheda (ad esempio, "Predicazioni" o "Offerte").
   - **Icona** -- Fai clic sul selettore di icone per scegliere un'icona per la scheda.
   - **Immagine** -- Fai clic su **Seleziona immagine** (o **Cambia immagine**) per assegnare alla scheda una foto. Le schede con una foto compaiono come riquadri fotografici nella schermata Home dell'app; vedi [Riquadri della schermata Home](#home-screen-tiles).
   - **Tipo di scheda** -- Scegli tra opzioni come Bibbia, Diretta streaming, Donazione, Sito web e altre.
   - **URL** -- Inserisci l'indirizzo web a cui la scheda deve rimandare.
   - **Visibilità** -- Controlla chi può vedere questa scheda (tutti, solo i membri, ecc.). Per una scheda **Elenco dei membri**, questa impostazione controlla solo chi vede la scheda; chi può aprire l'elenco è definito dall'opzione **Mostra nell'elenco** nella pagina Portale membri (vedi [Impostazioni dell'elenco dei membri e della messaggistica](#member-directory--messaging-settings)).
3. Fai clic su **Salva scheda** per aggiungerla alla tua app.

## Modificare una scheda esistente

1. Fai clic su una scheda qualsiasi nell'elenco **Schede dell'app**.
2. Aggiorna il nome, l'icona, l'URL, il tipo o le impostazioni di visibilità della scheda.
3. Fai clic su **Salva scheda** per applicare le modifiche.

## Riordinare le schede

Puoi cambiare l'ordine in cui le schede compaiono nell'app mobile. Trascina le schede nell'elenco per riordinarle. L'ordine mostrato in questa pagina corrisponde all'ordine in cui i membri le vedranno nell'app.

:::info
Alcune schede possono comparire automaticamente quando si verificano determinate condizioni: ad esempio, una scheda Diretta streaming può apparire quando una diretta è attiva. Le schede aggiunte manualmente ti danno il pieno controllo su ciò che i membri vedono in ogni momento.
:::

:::tip
Mantieni il numero di schede gestibile. Da tre a cinque schede funzionano bene nella maggior parte delle chiese. Troppe schede possono rendere confusa la navigazione per i membri.
:::

## Impostazioni dell'elenco dei membri e della messaggistica

La voce **Portale membri**, nella stessa sezione Mobile, contiene le impostazioni che regolano l'elenco dei membri e la messaggistica privata nell'esperienza B1.church:

- **Gruppo di approvazione dell'elenco** -- Il gruppo che esamina gli aggiornamenti dell'elenco dei membri e le [richieste di eliminazione dell'account](../profile/account-deletion.md) prima che diventino effettive.
- **Mostra nell'elenco** -- Chi può aprire l'elenco dei membri e chi vi è incluso: **Solo amministratori**, **Membri e superiori** (impostazione predefinita), **Frequentatori abituali e superiori** oppure **Visitatori e superiori**. Le persone il cui stato di appartenenza è inferiore al livello scelto non vedono l'elenco e non vi compaiono. **Solo amministratori** chiude l'elenco a tutti tranne al personale con l'autorizzazione Persone > Visualizza (uno stato di appartenenza Personale da solo non basta), che può sempre aprire l'elenco e vedere tutti, indipendentemente da questa impostazione. Gli ospiti non vi sono mai inclusi, perché chiunque si registri online parte come ospite.
- **Preferenza di visibilità** -- Imposta il valore predefinito per l'intera chiesa per i membri che non hanno ancora scelto la propria impostazione. **Indirizzo**, **Numero di telefono** ed **Email** hanno ciascuno un proprio menu a tendina, con gli stessi cinque livelli disponibili ovunque sia configurata la visibilità:
  - **Tutti** -- visibile a chiunque, inclusi i visitatori anonimi
  - **Membri** -- visibile solo alle persone con una scheda Membro o Personale
  - **Solo gruppi** -- visibile solo alle persone che condividono un gruppo con questa persona, oltre al personale
  - **Leader dei miei gruppi e personale** -- visibile solo ai leader di un gruppo a cui appartiene questa persona, oltre al personale
  - **Solo personale** -- visibile solo al personale (chiunque abbia lo stato di appartenenza Personale o l'autorizzazione Persone > Visualizza) e alla persona stessa

  Nei livelli di visibilità, "personale" indica chiunque abbia lo stato di appartenenza Personale o l'autorizzazione Persone > Visualizza. Le modifiche ai gruppi hanno effetto immediato: chi entra in un gruppo o diventa leader di un gruppo può vedere i dettagli di quel gruppo marcati come **Solo gruppi** o **Leader dei miei gruppi e personale**, senza dover uscire e rientrare.

  I membri possono sovrascrivere queste impostazioni predefinite per la propria scheda dalla scheda **Privacy** del proprio profilo nella PWA di B1.church; vedi [Modificare il proprio profilo](/docs/b1-church/getting-started/me-page).
- **Età minima per i messaggi privati** -- Un controllo a tutela dei minori. B1 non apre una **nuova** conversazione privata quando una delle due persone è al di sotto di questa età, in base alla data di nascita (se non è registrata alcuna data di nascita si usa il ruolo familiare come alternativa). Le persone al di sotto dell'età restano pienamente visibili nell'elenco: viene bloccata solo la messaggistica diretta, **in entrambe le direzioni**, per chiunque, personale compreso. Le conversazioni di gruppo e la messaggistica con i genitori di un minore continuano a funzionare. Le opzioni sono Disattivato, 13, 16 o 18; il valore predefinito è **18**. Le conversazioni esistenti non vengono modificate.

:::tip
Poiché il controllo sull'età minima si basa sulle date di nascita, assicurati che le date di nascita siano inserite per i bambini della tua comunità. Questa impostazione fa parte della stessa famiglia di controlli di sicurezza dei minori dei [controlli di sicurezza del check-in](../attendance/checkin-safety.md).
:::

### Richiesta di accesso nella schermata Home

I visitatori che aprono la [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app senza aver effettuato l'accesso vedono una breve richiesta, che per impostazione predefinita dice *"Accedi per vedere i tuoi gruppi, le offerte e altro."*, accanto a un pulsante **Accedi**. Le impostazioni **Richiesta di accesso nella schermata Home** nella stessa pagina Portale membri (`/mobile/b1-mobile`) ti permettono di modificarla:

- **Mostra la richiesta di accesso nella schermata Home dell'app** -- Disattiva questa opzione per nascondere sia la richiesta sia il pulsante **Accedi** dalla schermata Home. I visitatori possono comunque accedere dal menu dell'app.
- **Testo della richiesta di accesso** -- Sostituisci la formulazione predefinita con un tuo messaggio (fino a 150 caratteri). Lascia il campo vuoto per usare quella predefinita. Questa casella è disabilitata mentre la richiesta è disattivata.

Fai clic su **Salva** per applicare. Un messaggio **Salvato** conferma la modifica. Il salvataggio aggiorna le impostazioni in cache dell'app, quindi la modifica compare la volta successiva in cui viene caricata la schermata Home.

### Riquadri della schermata Home

Le schede che hanno una foto (vedi **Immagine** in [Aggiungere una nuova scheda](#adding-a-new-tab)) compaiono nella [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app come riquadri fotografici, in una sezione intestata con il nome della tua chiesa. Sono inclusi anche una scheda Versetto del giorno, se le assegni una foto. Le schede con foto compaiono comunque anche nella barra delle schede.

L'impostazione **Riquadri della schermata Home** nella stessa pagina Portale membri (`/mobile/b1-mobile`) controlla come sono disposti questi riquadri. Scegli un **Layout**:

- **Griglia** -- Due riquadri per riga (impostazione predefinita). Quando il numero di riquadri è dispari, il primo riquadro occupa tutta la larghezza.
- **Riga scorrevole** -- Una riga di riquadri che i membri scorrono lateralmente.
- **Scorrimento automatico** -- La stessa riga scorrevole, ma si muove anche da sola, avanzando di un riquadro circa ogni quattro secondi e tornando all'inizio alla fine. Si ferma quando un membro tocca, passa sopra o si sposta con il tasto Tab nella riga, e riprende poco dopo. Sui dispositivi impostati per ridurre il movimento, la riga resta ferma e funziona come **Riga scorrevole**.
- **Elenco** -- Un elenco con una piccola miniatura della foto accanto al nome di ogni scheda.

Fai clic su **Salva** per applicare.

### Sezioni della schermata Home

I membri che hanno effettuato l'accesso vedono sempre la propria cronologia delle presenze e i moduli inviati nella [pagina Me](/docs/b1-church/getting-started/me-page). Gli interruttori **Sezioni della schermata Home** nella stessa pagina Portale membri (`/mobile/b1-mobile`) possono mostrarle anche nella schermata Home:

- **Mostra le mie presenze nella Home** -- Aggiunge una sezione **Le mie presenze** con il numero di volte in cui il membro ha partecipato negli ultimi 90 giorni, le sue due visite più recenti e un link **Cronologia** alla lista completa delle sue presenze.
- **Mostra i miei moduli nella Home** -- Aggiunge una sezione **I miei moduli** con le due invii di modulo più recenti del membro e un link **Tutti i moduli**.

Entrambe sono disattivate per impostazione predefinita. Una sezione compare solo per i membri che hanno effettuato l'accesso e hanno almeno un elemento da mostrare. Fai clic su **Salva** per applicare.

## Dove compaiono queste schede

Le schede che configuri qui vengono visualizzate nella **PWA di B1.church** che i tuoi membri installano da qualsiasi pagina di `https://yourchurchname.b1.church`. Le modifiche apportate in questa pagina vengono riflesse la volta successiva in cui un membro apre l'app.

Su un telefono, la barra delle schede in basso mostra **Home**, fino a tre delle tue schede e **Altro**; su un computer, l'intestazione mostra fino a cinque schede. Le schermate integrate (come Predicazioni, Offerte o Gruppi) ricevono prima i propri spazi, e le schede **Pagina interna** riempiono gli spazi rimasti liberi. Le schede **URL esterno** e **Versetto del giorno** non ricevono mai uno spazio. Ogni scheda, incluse quelle che non trovano posto, è elencata nella pagina **Altro** dell'app. Vedi [Navigare in B1App](/docs/b1-church/getting-started/navigating) per ciò che vedono i membri. (Le schede vengono visualizzate anche dalla vecchia [app nativa B1 Mobile](/docs/b1-mobile/) per i membri che la usano ancora, ma quell'app è obsoleta e non viene più aggiornata.)

## Passaggi successivi

- [Impostazioni della chiesa](./church-settings.md) -- Configura le informazioni e il branding della tua chiesa
- [Ruoli e permessi](./roles-permissions.md) -- Gestisci gli accessi per il tuo team
