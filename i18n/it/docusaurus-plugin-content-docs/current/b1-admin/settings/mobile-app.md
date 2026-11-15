---
title: "Impostazioni dell'app mobile"
description: "Configura le schede di navigazione, i riquadri della schermata Home, il messaggio di accesso e le impostazioni di privacy dell'elenco membri per l'app dei membri B1.church in B1 Admin."
---

# Impostazioni dell'app mobile

<div class="article-intro">

La pagina Impostazioni dell'app mobile ti permette di configurare le schede di navigazione che compaiono nell'**esperienza mobile B1.church (PWA)** per i membri della tua chiesa. Controlli quali schede sono visibili, a cosa rimandano e come vengono mostrate.

</div>

## Video di formazione {#training-video}

<YouTube id="ydY7WGK16fE" title="Personalizzare l'app dei membri della tua chiesa in B1" />

:::info
Le schede configurate qui compaiono nell'app B1, che i membri possono [installare come Progressive Web App (PWA)](../../b1-church/getting-started/installing-pwa.md). Condividi con i membri la pagina di installazione della tua chiesa — `https://yourchurchname.b1.church/mobile/install` — che li guida nell'installazione dell'app sul loro dispositivo, senza bisogno di scaricarla da App Store o Google Play.
:::

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione "Modifica impostazioni chiesa". Vedi [Ruoli e autorizzazioni](./roles-permissions.md) se non hai accesso.
- Configura prima le [Impostazioni della chiesa](./church-settings.md), incluso il nome della chiesa e l'identità visiva

</div>

## Accedere alle impostazioni di navigazione {#accessing-navigation-settings}

1. In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra) ed espandi **Mobile**.
2. Fai clic su **Navigazione** (`/mobile/navigation`). Per vederla ti serve l'autorizzazione **Modifica contenuti**.
3. L'elenco **Schede dell'app** mostra le schede attuali in ordine, ciascuna con la sua visibilità. Le schede contenute in una cartella sono rientrate sotto di essa.

Il menu Mobile contiene anche **Tema dell'app**, **Portale membri**, **Check-in B1**, **Etichette** e **Notifiche push**. Tema dell'app e Portale membri sono trattati di seguito; vedi [Notifiche push](#push-notifications) per programmare le notifiche.

## Aggiungere una nuova scheda {#adding-a-new-tab}

1. Fai clic sul pulsante **Aggiungi scheda** in cima alla pagina.
2. Compila i dettagli della scheda:
   - **Nome scheda** -- L'etichetta che compare sulla scheda (ad esempio, "Prediche" oppure "Dona").
   - **Icona** -- Fai clic sul selettore dell'icona per scegliere un'icona per la scheda.
   - **Immagine** -- Fai clic su **Seleziona immagine** (oppure **Cambia immagine**) per assegnare alla scheda una foto. Le schede con una foto compaiono come riquadri fotografici nella schermata Home dell'app -- vedi [Riquadri della schermata Home](#home-screen-tiles). Per togliere la foto, fai clic su **Rimuovi immagine** e salva; la scheda compare allora come scheda semplice, non come riquadro della Home.
   - **Tipo di scheda** -- **Bibbia**, **Diretta**, **Versetto del giorno**, **Prediche**, **Check-in**, **Donazione**, **Elenco membri**, **I miei gruppi**, **Opportunità di volontariato**, **Piani di servizio**, **Iscrizioni**, **Richieste**, **URL esterno**, **Pagina interna** oppure **Cartella**. **Iscrizioni** apre le iscrizioni agli eventi del membro; **Richieste** apre Le mie richieste, dove un membro può richiedere un evento e vedere lo stato delle richieste passate. Per queste schede imposta la Visibilità su Utenti con accesso o Membri e personale, perché richiedono un membro che ha effettuato l'accesso.
   - **URL** -- Mostrato per le schede **URL esterno**: l'indirizzo web che la scheda apre.
   - **Pagina** -- Mostrato per le schede **Pagina interna**: scegli una delle pagine del tuo sito web.
   - **Scheda padre** -- Inserisci la scheda in una scheda **Cartella**, oppure lasciala su **Nessuna (primo livello)**. Vedi [Dove compaiono queste schede](#where-these-tabs-appear).
   - **Visibilità** -- Chi può vedere questa scheda: **Tutti (anche anonimi)**, **Utenti con accesso**, **Membri e personale**, **Solo personale**, **Membri del team di servizio** oppure **Gruppi specifici...** (poi seleziona i gruppi). Per una scheda **Elenco membri**, questo controlla solo chi vede la scheda; chi può aprire l'elenco è impostato da **Mostra nell'elenco** nella pagina Portale membri (vedi [Impostazioni dell'elenco membri e dei messaggi](#member-directory--messaging-settings)).
3. Fai clic su **Salva scheda** per aggiungerla alla tua app.

## Modificare una scheda esistente {#editing-an-existing-tab}

1. Fai clic sull'icona di modifica (matita) di una scheda nell'elenco **Schede dell'app**.
2. Aggiorna il nome, l'icona, l'immagine, il tipo o le impostazioni di visibilità della scheda.
3. Fai clic su **Salva scheda** per applicare le modifiche. Per rimuovere la scheda, fai invece clic su **Elimina scheda**. Eliminare una cartella riporta le sue schede al primo livello.

## Riordinare le schede {#reordering-tabs}

Puoi cambiare l'ordine in cui le schede compaiono nell'app mobile. Usa le frecce **Sposta su** e **Sposta giù** di ciascuna scheda per riordinarle. Le schede contenute in una cartella si spostano all'interno di quella cartella. L'ordine mostrato in questa pagina corrisponde all'ordine che i membri vedranno nell'app.

:::info
Alcune schede possono comparire automaticamente quando si verificano determinate condizioni -- ad esempio, la scheda Diretta può comparire quando una trasmissione è attiva. Le schede aggiunte manualmente ti danno il pieno controllo su ciò che i membri vedono in ogni momento.
:::

:::tip
Mantieni gestibile il numero di schede. Da tre a cinque schede funzionano bene per la maggior parte delle chiese. Troppe schede possono rendere confusa la navigazione per i membri.
:::

## Tema dell'app {#app-theme}

**Mobile > Tema dell'app** (`/mobile/theme`) imposta i colori usati dall'app B1, dal portale membri e dal chiosco di check-in. Ti serve l'autorizzazione **Modifica impostazioni chiesa**.

1. Espandi **Modalità chiara** oppure **Modalità scura**.
2. Per ciascun colore -- **Sfondo**, **Superficie**, **Primario**, **Contrasto primario** (testo sui pulsanti e sulle intestazioni a colore primario), **Secondario** e **Colore del testo** -- fai clic sul campione per scegliere un colore, oppure digita il codice nella casella **Esadecimale**. L'**Anteprima** sotto mostra un'intestazione, una scheda e un pulsante con i tuoi colori.
3. Fai clic su **Salva**.

Fai clic su **Ripristina valori predefiniti** per tornare ai colori standard. Anche il tema **Personalizzato** di B1 Admin usa il colore **Primario** della modalità chiara -- vedi [Gestire il tuo profilo](../profile/managing-profile.md).

## Impostazioni dell'elenco membri e dei messaggi {#member-directory--messaging-settings}

La voce **Portale membri** nella stessa sezione Mobile (`/mobile/b1-mobile`, intitolata **Impostazioni del portale**) contiene le impostazioni che regolano l'elenco membri e i messaggi privati nell'esperienza B1.church. Ti serve l'autorizzazione **Modifica impostazioni chiesa**. Modifica una qualsiasi delle impostazioni qui sotto e fai clic su **Salva** in fondo alla pagina:

- **Gruppo di approvazione dell'elenco** -- Il gruppo che esamina gli aggiornamenti dell'elenco membri e le [richieste di eliminazione dell'account](../profile/account-deletion.md) prima che abbiano effetto.
- **Mostra nell'elenco** -- Chi può aprire l'elenco membri e chi vi compare: **Solo amministratori**, **Membri e superiori** (predefinito), **Frequentatori abituali e superiori** oppure **Visitatori e superiori**. Le persone il cui stato di appartenenza è inferiore al livello scelto non vedono l'elenco e non vi compaiono. **Solo amministratori** chiude l'elenco a tutti tranne al personale con l'autorizzazione Persone &gt; Visualizza (lo stato di appartenenza Personale da solo non basta), che può sempre aprire l'elenco e vedere tutti, qualunque sia questa impostazione. Gli ospiti non vengono mai inclusi, perché chiunque si registri online parte come ospite.
- **Preferenza di visibilità** -- Imposta il valore predefinito per tutta la chiesa, per i membri che non hanno ancora scelto la propria impostazione. **Indirizzo**, **Numero di telefono** ed **Email** hanno ciascuno un proprio menu a discesa (ognuno parte da **Membri**), con gli stessi cinque livelli disponibili ovunque si configuri la visibilità:
  - **Tutti** -- visibile a chiunque, inclusi i visitatori anonimi
  - **Membri** -- visibile solo alle persone con una scheda Membro o Personale
  - **Solo gruppi** -- visibile solo alle persone che condividono un gruppo con questa persona, più il personale
  - **I miei responsabili di gruppo e personale** -- visibile solo ai responsabili di un gruppo a cui questa persona appartiene, più il personale
  - **Solo personale** -- visibile solo al personale (chiunque abbia lo stato di appartenenza Personale oppure l'autorizzazione Persone &gt; Visualizza), e alla persona stessa

  "Personale" in questi livelli indica chiunque abbia lo stato di appartenenza Personale oppure l'autorizzazione Persone &gt; Visualizza. Le modifiche ai gruppi hanno effetto subito: chi entra in un gruppo, o viene nominato responsabile di un gruppo, può vedere i dettagli dei membri di quel gruppo previsti dai livelli **Solo gruppi** o **I miei responsabili di gruppo e personale**, senza uscire e rientrare.

  I membri possono modificare queste impostazioni predefinite per la propria scheda dalla scheda **Privacy** del loro profilo nella PWA di B1.church -- vedi [Modificare il tuo profilo](/docs/b1-church/getting-started/me-page).
- **Età minima per i messaggi privati** -- Un controllo per la sicurezza dei minori. B1 non apre una **nuova** conversazione di messaggi privati quando una delle due persone è sotto questa età, in base alla data di nascita (il ruolo nel nucleo familiare viene usato come riserva quando non c'è una data di nascita registrata). Le persone sotto questa età restano completamente visibili nell'elenco -- viene bloccata solo la messaggistica diretta, in **entrambe le direzioni**, per tutti, personale compreso. Le conversazioni di gruppo e la messaggistica con i genitori di un minore continuano a funzionare. Le opzioni sono Disattivato, 13, 16 o 18; il predefinito è **18**. Le conversazioni esistenti non sono interessate.

:::tip
Poiché il controllo dell'età minima si basa sulle date di nascita, assicurati che siano inserite per i bambini della tua comunità. Questa impostazione appartiene alla stessa famiglia di controlli per la sicurezza dei minori dei [controlli di sicurezza del check-in](../attendance/checkin-safety.md).
:::

### Messaggio di accesso nella schermata Home {#home-screen-sign-in-prompt}

I visitatori che aprono la [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app senza aver effettuato l'accesso vedono un breve messaggio -- per impostazione predefinita, *"Accedi per vedere i tuoi gruppi, le donazioni e altro."* -- accanto a un pulsante **Accedi**. Le impostazioni **Messaggio di accesso nella schermata Home**, nella stessa pagina Portale membri (`/mobile/b1-mobile`), ti permettono di cambiarlo:

- **Mostra il messaggio di accesso nella schermata Home dell'app** -- Disattiva questa opzione per nascondere sia il messaggio sia il pulsante **Accedi** dalla schermata Home. I visitatori possono comunque accedere dal menu dell'app.
- **Testo del messaggio di accesso** -- Sostituisci il testo predefinito con un tuo messaggio (fino a 150 caratteri). Lascialo vuoto per usare il testo predefinito. Questa casella è disattivata finché il messaggio è spento.

Fai clic su **Salva** per applicare. Un messaggio **Salvato** conferma la modifica. Salvare aggiorna le impostazioni memorizzate nella cache dell'app, quindi la modifica compare la prossima volta che si carica la schermata Home.

### Riquadri della schermata Home {#home-screen-tiles}

Le schede con una foto (vedi **Immagine** in [Aggiungere una nuova scheda](#adding-a-new-tab)) compaiono nella [schermata Home](/docs/b1-church/getting-started/navigating#home) dell'app come riquadri fotografici, in una sezione intitolata con il nome della tua chiesa. Questo include anche la scheda Versetto del giorno, se le assegni una foto. Le schede con foto compaiono comunque anche nella barra delle schede.

L'impostazione **Riquadri della schermata Home** nella stessa pagina Portale membri (`/mobile/b1-mobile`) controlla come sono disposti questi riquadri. Scegli un **Layout**:

- **Griglia** -- Due riquadri per riga (predefinito). Quando il numero dei riquadri è dispari, il primo occupa tutta la larghezza.
- **Riga scorrevole** -- Una riga di riquadri che i membri scorrono lateralmente.
- **Scorrimento (automatico)** -- La stessa riga laterale, che però si sposta da sola, avanzando di un riquadro circa ogni quattro secondi e tornando al primo riquadro dopo l'ultimo. Si ferma mentre un membro la tocca, ci passa sopra o vi naviga con la tastiera, e riprende qualche secondo dopo. Sui dispositivi impostati per ridurre le animazioni, la riga resta ferma e funziona come **Riga scorrevole**.
- **Elenco** -- Un elenco con una piccola miniatura della foto accanto al nome di ciascuna scheda.
- **Griglia ed elenco** -- Le prime tre schede con foto in una griglia, con il primo riquadro che occupa tutta la larghezza, e le successive tre elencate sotto con una piccola miniatura accanto a ogni nome. Quando sono più di tre, l'intestazione della sezione mostra un collegamento **Tutte** che apre la pagina **Altro** dell'app, con l'elenco di tutte le schede.
- **Scorrimento (automatico) ed elenco** -- Tutte le schede con foto nella riga auto-scorrevole descritta sopra, con le prime tre elencate anche sotto, e lo stesso collegamento **Tutte** quando sono più di tre.

In entrambi i layout a scorrimento, quando i riquadri sono più di quelli che stanno nella larghezza dello schermo, sotto i riquadri compare una fila di puntini, uno per riquadro, con il puntino del riquadro corrente pieno. I membri possono toccare un puntino per saltare a quel riquadro.

Fai clic su **Salva** per applicare.

### Sezioni della schermata Home {#home-screen-sections}

I membri che hanno effettuato l'accesso vedono sempre la propria cronologia delle presenze e i moduli inviati nella [pagina Io](/docs/b1-church/getting-started/me-page). Gli interruttori **Sezioni della schermata Home**, nella stessa pagina Portale membri (`/mobile/b1-mobile`), possono mostrare anche queste informazioni nella schermata Home:

- **Mostra Le mie presenze nella Home** -- Aggiunge una sezione **Le mie presenze** con quante volte il membro è stato presente negli ultimi 90 giorni, le sue due visite più recenti e un collegamento **Cronologia** alla sua lista completa delle presenze.
- **Mostra I miei moduli nella Home** -- Aggiunge una sezione **I miei moduli** con le due invii di moduli più recenti del membro e un collegamento **Tutti i moduli**.

Entrambe sono disattivate per impostazione predefinita. Una sezione compare solo per i membri che hanno effettuato l'accesso e hanno almeno un dato da mostrare.

- **Mostra Notizie nella Home** -- Aggiunge una sezione **Notizie** subito sotto il saluto, che mostra i cinque articoli del [blog](../website/blog.md) pubblicati più recenti come schede fotografiche in una riga che si sposta da sola. Toccando una scheda si apre l'articolo completo dentro l'app, e un collegamento **Tutte le notizie** elenca gli articoli recenti. Una volta attivata, **Solo questa categoria** ti permette di scegliere una categoria del blog (ad esempio, *Annunci*) così compaiono solo quegli articoli; lascia su **Tutti gli articoli** per mostrarli tutti. Le notizie sono visibili a chiunque apra l'app, con o senza accesso, perché gli articoli del blog sono pubblici sul tuo sito web. È disattivata per impostazione predefinita e compare solo quando hai almeno un articolo pubblicato.

Fai clic su **Salva** per applicare.

## Notifiche push {#push-notifications}

**Mobile > Notifiche push** (`/mobile/notifications`) invia o programma una notifica push alle persone che hanno installato l'app B1 con le notifiche attive. Per inviare a tutti ti serve l'autorizzazione **Modifica contenuti**; per inviare a un gruppo, l'autorizzazione **Modifica membri del gruppo**.

1. Fai clic su **Invia notifica**.
2. Scegli il **Destinatario**: **Tutti con l'app**, oppure uno dei tuoi gruppi. B1 mostra quante persone raggiungerà la notifica e quante hanno disattivato le push; tu sei escluso dalle tue stesse notifiche push.
3. Inserisci un **Titolo** (fino a 80 caratteri) e un **Messaggio** (fino a 240 caratteri), e se vuoi un **URL del collegamento o del volantino** e un **URL dell'immagine** (gli stessi campi di una [notifica di gruppo](../groups/group-members.md#sending-push-notifications-to-group-members)).
4. Alla voce **Quando**, lascia **Invia ora**, oppure scegli **Programma per dopo** e seleziona un orario futuro in **Invia alle**.
5. Fai clic su **Invia notifica** (oppure **Programma notifica**).

La pagina elenca le notifiche **Programmate** (con **Modifica**, **Invia ora** e **Annulla** su ciascuna) e quelle **Recenti** con il loro stato, come *Inviata: 12 su 15*, *Annullata* oppure *Mancata (l'orario di invio è passato)*. Fai clic su **Rimuovi** per togliere dall'elenco una notifica conclusa, oppure su **Cancella tutto** per rimuovere tutte quelle inviate, non riuscite e annullate. Gli orari vengono mostrati nel [fuso orario](./church-settings.md#time-zone) della tua chiesa, oppure in quello del tuo computer se la chiesa non ne ha impostato uno. I destinatari di una notifica programmata vengono ricalcolati nel momento in cui viene inviata.

Una notifica inviata più di 30 minuti dopo l'orario previsto viene contrassegnata come *Mancata* e non inviata; una che fallisce tre volte compare come *Non riuscita* con l'errore. Rimuovere una notifica dall'elenco non la ritira da chi l'ha già ricevuta. Quando una push non ha un collegamento, toccandola si apre l'elenco delle notifiche dell'app per una push a tutta la chiesa, oppure la pagina del gruppo per una push di gruppo. I membri che hanno disattivato **Comunicazioni della chiesa** nelle loro [preferenze di notifica](../../b1-church/getting-started/notification-preferences.md) non ricevono queste push, che siano dirette a tutti oppure a un gruppo.

## Dove compaiono queste schede {#where-these-tabs-appear}

Le schede che configuri qui vengono mostrate nella **PWA B1.church** che i tuoi membri installano da qualsiasi pagina di `https://yourchurchname.b1.church`. Le modifiche fatte in questa pagina si riflettono la prossima volta che un membro apre l'app.

Su telefono, la barra delle schede in basso mostra **Home**, fino a tre delle tue schede e **Altro**; su computer, l'intestazione mostra fino a cinque schede. Le schermate integrate (come Prediche, Donazioni o Gruppi) occupano per prime gli spazi disponibili, e le schede **Pagina interna** riempiono quelli rimasti liberi. Le schede **URL esterno** e **Versetto del giorno** non ottengono mai uno spazio. Ogni scheda, comprese quelle che non entrano, è elencata nella pagina **Altro** dell'app.

Fanno eccezione le schede inserite in una scheda **Cartella**: compaiono solo nella schermata della cartella stessa, che i membri aprono toccando la cartella. Quella schermata mostra le schede come riquadri fotografici quando ognuna ha un'immagine, oppure come elenco in caso contrario. Una cartella che non contiene schede visibili a un membro è nascosta a quel membro. Vedi [Schede cartella](../../b1-church/getting-started/navigating.md#folder-tabs). Vedi [Navigare nella B1App](../../b1-church/getting-started/navigating.md) per ciò che vedono i membri.

## Passaggi successivi {#next-steps}

- [Impostazioni della chiesa](./church-settings.md) -- Configura le informazioni della chiesa e l'identità visiva
- [Ruoli e autorizzazioni](./roles-permissions.md) -- Gestisci gli accessi per il tuo team
