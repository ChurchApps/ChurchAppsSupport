---
title: "Impostazioni dell'app mobile"
description: "Configura le schede di navigazione, i riquadri della schermata Home, il messaggio di accesso e le impostazioni di privacy della rubrica dei membri per l'app dei membri B1.church in B1 Admin."
---

# Impostazioni dell'app mobile

<div class="article-intro">

La pagina Impostazioni dell'app mobile ti permette di configurare le schede di navigazione che compaiono nell'**esperienza mobile B1.church (PWA)** per i membri della tua chiesa. Puoi controllare quali schede sono visibili, a cosa rimandano e come vengono visualizzate.

</div>

## Video di formazione

<YouTube id="ydY7WGK16fE" title="Personalizzare l'app dei membri della tua chiesa in B1" />

:::info
Le schede configurate qui compaiono nell'app B1, che i membri possono [installare come Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Condividi con i membri la pagina di installazione della tua chiesa — `https://yourchurchname.b1.church/mobile/install` — che li guida nell'installazione dell'app sul proprio dispositivo, senza bisogno di scaricarla dall'App Store o da Google Play.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione "Modifica impostazioni della chiesa". Consulta [Ruoli e permessi](./roles-permissions.md) se non hai accesso.
- Configura prima le tue [Impostazioni della chiesa](./church-settings.md), incluso il nome della chiesa e il branding

</div>

## Accedere alle impostazioni di navigazione

1. In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **Navigazione** (`/mobile/navigation`).
3. La pagina Navigazione mostra le schede attuali della tua app.

## Aggiungere una nuova scheda

1. Fai clic sul pulsante **Aggiungi scheda** in alto nella pagina.
2. Compila i dettagli della scheda:
   - **Nome** -- L'etichetta che compare sulla scheda (ad esempio "Predicazioni" o "Offerte").
   - **Icona** -- Fai clic sul selettore dell'icona per scegliere un'icona per la scheda.
   - **Immagine** -- Fai clic su **Seleziona immagine** (o **Cambia immagine**) per assegnare alla scheda una foto. Le schede con una foto compaiono come riquadri fotografici nella schermata Home dell'app -- vedi [Riquadri della schermata Home](#home-screen-tiles).
   - **Tipo di scheda** -- Scegli tra opzioni come Bibbia, Diretta streaming, Donazione, Sito web e altre.
   - **URL** -- Inserisci l'indirizzo web a cui la scheda deve rimandare.
   - **Visibilità** -- Controlla chi può vedere questa scheda (tutti, solo i membri, ecc.). Per una scheda **Rubrica dei membri**, questo controlla solo chi vede la scheda stessa; chi può aprire la rubrica è stabilito da **Mostra nella rubrica** nella pagina Portale membri (vedi [Impostazioni di rubrica dei membri e messaggistica](#member-directory--messaging-settings)).
3. Fai clic su **Salva scheda** per aggiungerla alla tua app.

## Modificare una scheda esistente

1. Fai clic su una qualsiasi scheda nell'elenco **Schede dell'app**.
2. Aggiorna nome, icona, URL, tipo o impostazioni di visibilità della scheda.
3. Fai clic su **Salva scheda** per applicare le modifiche.

## Riordinare le schede

Puoi cambiare l'ordine in cui le schede compaiono nell'app mobile. Trascina le schede nell'elenco per riordinarle. L'ordine mostrato in questa pagina corrisponde a quello che vedranno i membri nell'app.

:::info
Alcune schede possono comparire automaticamente quando si verificano determinate condizioni -- ad esempio, una scheda Diretta streaming può apparire quando una trasmissione è attiva. Le schede aggiunte manualmente ti danno il pieno controllo su ciò che i membri vedono in ogni momento.
:::

:::tip
Mantieni il numero di schede gestibile. Da tre a cinque schede funzionano bene per la maggior parte delle chiese. Troppe schede possono rendere la navigazione confusa per i membri.
:::

## Impostazioni di rubrica dei membri e messaggistica

La voce **Portale membri**, nella stessa sezione Mobile, contiene le impostazioni che regolano la rubrica dei membri e la messaggistica privata nell'esperienza B1.church:

- **Gruppo di approvazione della rubrica** -- Il gruppo che esamina gli aggiornamenti della rubrica dei membri e le [richieste di eliminazione dell'account](../profile/account-deletion.md) prima che diventino effettivi.
- **Mostra nella rubrica** -- Chi può aprire la rubrica dei membri e chi vi è elencato: **Solo amministratori**, **Membri e superiori** (l'impostazione predefinita), **Frequentatori abituali e superiori** oppure **Visitatori e superiori**. Le persone il cui stato di appartenenza è inferiore al livello scelto non vedono la rubrica e non vi compaiono. **Solo amministratori** chiude la rubrica a tutti tranne al personale con il permesso Persone > Visualizza (il solo stato di appartenenza Staff non basta), che può sempre aprire la rubrica e vedere tutti, qualunque sia questa impostazione. Gli ospiti non sono mai inclusi, poiché chiunque si registri online parte come ospite.
- **Preferenza di visibilità** -- Imposta il valore predefinito per l'intera chiesa, per i membri che non hanno ancora scelto la propria impostazione. **Indirizzo**, **Numero di telefono** ed **Email** hanno ciascuno un proprio menu a tendina, con gli stessi cinque livelli disponibili ovunque si configuri la visibilità:
  - **Tutti** -- visibile a chiunque, inclusi i visitatori anonimi
  - **Membri** -- visibile solo alle persone con un record di Membro o Staff
  - **Solo gruppi** -- visibile solo alle persone che condividono un gruppo con questa persona, più il personale
  - **I miei leader di gruppo e il personale** -- visibile solo ai leader di un gruppo a cui questa persona appartiene, più il personale
  - **Solo personale** -- visibile solo al personale (chiunque abbia lo stato di appartenenza Staff o il permesso Persone > Visualizza) e alla persona stessa

  "Personale" in questi livelli indica chiunque abbia lo stato di appartenenza Staff o il permesso Persone > Visualizza. Le modifiche ai gruppi hanno effetto immediato: chi entra in un gruppo, o viene nominato leader di gruppo, può vedere i dettagli corrispondenti ai livelli **Solo gruppi** o **I miei leader di gruppo e il personale** dei membri di quel gruppo, senza uscire e rientrare nell'account.

  I membri possono sostituire questi valori predefiniti per il proprio record dalla scheda **Privacy** del loro profilo nella PWA B1.church -- vedi [Modificare il tuo profilo](/docs/b1-church/getting-started/me-page).
- **Età minima per i messaggi privati** -- Un controllo per la sicurezza dei minori. B1 non aprirà una **nuova** conversazione privata se una delle due persone è al di sotto di questa età, in base alla data di nascita (in mancanza di data di nascita, si usa il ruolo nel nucleo familiare). Le persone sotto l'età restano completamente visibili nella rubrica -- viene bloccata solo la messaggistica diretta, in **entrambe le direzioni**, per tutti, incluso il personale. Le conversazioni di gruppo e la messaggistica con i genitori di un minore continuano a funzionare. Le opzioni sono Disattivata, 13, 16 o 18; il valore predefinito è **18**. Le conversazioni esistenti non sono interessate.

:::tip
Poiché il controllo dell'età minima si basa sulle date di nascita, assicurati che siano compilate per i bambini della tua comunità. Questa impostazione appartiene alla stessa famiglia di controlli per la sicurezza dei minori dei [controlli di sicurezza del check-in](../attendance/checkin-safety.md).
:::

### Messaggio di accesso nella schermata Home

I visitatori che aprono la [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app senza accedere vedono un breve messaggio -- per impostazione predefinita, *"Accedi per vedere i tuoi gruppi, le donazioni e altro."* -- accanto a un pulsante **Accedi**. Le impostazioni **Messaggio di accesso nella schermata Home**, nella stessa pagina Portale membri (`/mobile/b1-mobile`), ti permettono di modificarlo:

- **Mostra il messaggio di accesso nella schermata Home** -- Disattivalo per nascondere sia il messaggio sia il pulsante **Accedi** dalla schermata Home. I visitatori possono comunque accedere dal menu dell'app.
- **Testo del messaggio di accesso** -- Sostituisci il testo predefinito con un tuo messaggio (fino a 150 caratteri). Lascia vuoto il campo per usare quello predefinito. Questo campo è disabilitato mentre il messaggio è disattivato.

Fai clic su **Salva** per applicare. Un messaggio **Salvato** conferma la modifica. Il salvataggio aggiorna le impostazioni memorizzate nella cache dell'app, quindi la modifica compare la prossima volta che si carica la schermata Home.

### Riquadri della schermata Home

Le schede che hanno una foto (vedi **Immagine** in [Aggiungere una nuova scheda](#adding-a-new-tab)) compaiono nella [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app come riquadri fotografici, in una sezione intitolata con il nome della tua chiesa. Questo include una scheda Versetto del giorno, se le assegni una foto. Le schede con foto compaiono comunque anche nella barra delle schede.

L'impostazione **Riquadri della schermata Home**, nella stessa pagina Portale membri (`/mobile/b1-mobile`), controlla la disposizione di questi riquadri. Scegli un **Layout**:

- **Griglia** -- Due riquadri per riga (l'impostazione predefinita). Quando il numero di riquadri è dispari, il primo riquadro occupa tutta la larghezza.
- **Riga scorrevole** -- Una sola riga di riquadri che i membri scorrono lateralmente.
- **Scorrimento automatico** -- La stessa riga scorrevole, ma si muove anche da sola, avanzando di un riquadro circa ogni quattro secondi e tornando al primo riquadro dopo l'ultimo. Si ferma quando un membro tocca, passa sopra o si sposta con il tabulatore sulla riga, e riprende dopo qualche secondo. Sui dispositivi impostati per ridurre il movimento, la riga resta ferma e funziona come **Riga scorrevole**.
- **Elenco** -- Un elenco con una piccola miniatura della foto accanto al nome di ogni scheda.

In entrambi i layout scorrevoli, quando ci sono più riquadri di quanti ne stiano in larghezza sullo schermo, sotto i riquadri compare una fila di puntini, uno per riquadro, con il puntino del riquadro corrente pieno. I membri possono toccare un puntino per passare a quel riquadro.

Fai clic su **Salva** per applicare.

### Sezioni della schermata Home

I membri che hanno effettuato l'accesso vedono sempre la propria cronologia delle presenze e i moduli inviati nella [pagina Me](/docs/b1-church/getting-started/me-page). Gli interruttori **Sezioni della schermata Home**, nella stessa pagina Portale membri (`/mobile/b1-mobile`), possono mostrarli anche nella schermata Home:

- **Mostra le mie presenze nella Home** -- Aggiunge una sezione **Le mie presenze** con il numero di volte in cui il membro ha partecipato negli ultimi 90 giorni, le sue due visite più recenti e un link **Cronologia** alla lista completa delle presenze.
- **Mostra i miei moduli nella Home** -- Aggiunge una sezione **I miei moduli** con le due ultime compilazioni di moduli del membro e un link **Tutti i moduli**.

Entrambe sono disattivate per impostazione predefinita. Una sezione compare solo per i membri che hanno effettuato l'accesso e hanno almeno un record da mostrare. Fai clic su **Salva** per applicare.

## Dove compaiono queste schede

Le schede che configuri qui vengono visualizzate nella **PWA B1.church** che i tuoi membri installano da qualsiasi pagina di `https://yourchurchname.b1.church`. Le modifiche apportate in questa pagina si riflettono la prossima volta che un membro apre l'app.

Su uno smartphone, la barra delle schede in basso mostra **Home**, fino a tre delle tue schede e **Altro**; su un computer, l'intestazione mostra fino a cinque schede. Le schermate integrate (come Predicazioni, Offerte o Gruppi) ricevono prima i loro spazi, e le schede **Pagina interna** riempiono gli spazi rimasti liberi. Le schede **URL esterno** e **Versetto del giorno** non ottengono mai uno spazio. Ogni scheda, incluse quelle che non trovano posto, è elencata nella pagina **Altro** dell'app.

Fanno eccezione le schede inserite in una scheda **Cartella**: compaiono solo nella schermata della cartella, che i membri aprono toccando la cartella. Quella schermata mostra le schede come riquadri fotografici se tutte hanno un'immagine, altrimenti come elenco. Una cartella che non contiene schede visibili a un membro è nascosta per quel membro. Vedi [Schede cartella](../../b1-church/getting-started/navigating.md#folder-tabs). Vedi [Navigare in B1App](../../b1-church/getting-started/navigating.md) per ciò che vedono i membri.

## Passaggi successivi

- [Impostazioni della chiesa](./church-settings.md) -- Configura le informazioni della chiesa e il branding
- [Ruoli e permessi](./roles-permissions.md) -- Gestisci l'accesso per il tuo team
