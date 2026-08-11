---
title: "Impostazioni App Mobile"
---

# Impostazioni App Mobile

<div class="article-intro">

La pagina Impostazioni App Mobile ti permette di configurare le schede di navigazione che appaiono nell'**esperienza mobile B1.church (PWA)** per i membri della tua chiesa. Controlli quali schede sono visibili, a cosa si collegano e come vengono visualizzate.

</div>

:::info L'app nativa B1 Mobile è deprecata
Le schede configurate qui vengono consegnate attraverso l'[App Web Progressivo B1.church (PWA)](/docs/b1-church/getting-started/installing-pwa), che ha sostituito l'app nativa B1 Mobile. Condividi la tua pagina di installazione della chiesa -- `https://nomedeltuachiesa.b1.church/mobile/install` -- con i membri; li guida attraverso l'installazione dell'app sul loro dispositivo, senza alcun download necessario da App Store o Google Play.
:::

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso "Modifica Impostazioni Chiesa". Vedi [Ruoli e Autorizzazioni](./roles-permissions.md) se non hai accesso.
- Configura prima le tue [Impostazioni della Chiesa](./church-settings.md), incluso il nome della chiesa e il branding

</div>

## Accesso alle Impostazioni App Mobile

1. In B1 Admin, apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia) e scegli **Impostazioni**.
2. Fai clic sul pulsante **App Mobile** nell'intestazione.
3. La pagina Impostazioni App Mobile mostra le tue schede attuali dell'app.

## Aggiunta di una Nuova Scheda

1. Fai clic sul pulsante **Aggiungi Scheda** in cima alla pagina.
2. Compila i dettagli della scheda:
   - **Nome** -- L'etichetta che appare sulla scheda (ad esempio, "Sermoni" o "Dona").
   - **Icona** -- Fai clic sul selettore di icone per scegliere un'icona per la tua scheda. Puoi anche caricare un'immagine personalizzata.
   - **Tipo di Scheda** -- Seleziona da opzioni come Bibbia, Trasmissione in Diretta, Donazione, Sito Web, e altro.
   - **URL** -- Inserisci l'indirizzo web a cui la scheda dovrebbe collegarsi.
   - **Visibilità** -- Controlla chi può vedere questa scheda (tutti, solo membri, ecc.).
3. Fai clic su **Salva Scheda** per aggiungerla alla tua app.

## Modifica di una Scheda Esistente

1. Fai clic su qualsiasi scheda esistente nell'elenco **Schede App**.
2. Aggiorna il nome, l'icona, l'URL, il tipo o le impostazioni di visibilità della scheda.
3. Fai clic su **Salva Scheda** per applicare le modifiche.

## Riordino delle Schede

Puoi cambiare l'ordine in cui le schede appaiono nell'app mobile. Trascina e rilascia le schede nell'elenco per riordinarle. L'ordine mostrato in questa pagina corrisponde all'ordine che i tuoi membri vedranno nell'app.

:::info
Alcune schede possono apparire automaticamente quando vengono soddisfatte determinate condizioni -- ad esempio, una scheda di Trasmissione in Diretta potrebbe apparire quando una trasmissione è attiva. Le schede aggiunte manualmente ti danno il controllo completo su cosa vedono i tuoi membri in ogni momento.
:::

:::tip
Mantieni il conteggio delle schede gestibile. Da tre a cinque schede funziona bene per la maggior parte delle chiese. Troppe schede possono rendere confusa la navigazione per i tuoi membri.
:::

## Impostazioni Directory Membri e Messaggistica

La scheda **B1 Mobile** nella stessa sezione Mobile contiene le impostazioni che governano la directory dei membri e la messaggistica privata nell'esperienza B1.church:

- **Gruppo di Approvazione Directory** -- Il gruppo che rivede gli aggiornamenti della directory dei membri prima che vengano applicati.
- **Mostra nella Directory** -- Chi può apparire nella directory dei membri (Solo Staff a Tutti).
- **Preferenze di Visibilità** -- Visibilità predefinita per gli indirizzi dei membri, i numeri di telefono e gli indirizzi email.
- **Età Minima per Messaggi Privati** -- Un controllo di sicurezza infantile. B1 non aprirà una **nuova** conversazione di messaggio privato quando entrambe le persone hanno un'età inferiore a questa, in base alla loro data di nascita (il ruolo domestico viene utilizzato come alternativa quando non è presente una data di nascita). Le persone sotto l'età rimangono completamente visibili nella directory -- solo la messaggistica diretta è bloccata, in **entrambe le direzioni**, per tutti incluso il personale. Le conversazioni di gruppo e la messaggistica ai genitori di un bambino funzionano ancora. Le opzioni sono Off, 13, 16, o 18; il valore predefinito è **18**. Le conversazioni esistenti non sono interessate.

:::tip
Poiché il controllo dell'età minima si basa sulle date di nascita, assicurati che le date di nascita siano compilate per i bambini nella tua congregazione. Questa impostazione appartiene alla stessa famiglia di controlli di sicurezza infantile dei [controlli di sicurezza check-in](../attendance/checkin-safety.md).
:::

## Dove Appaiono Queste Schede

Le schede che configuri qui vengono visualizzate nel **PWA B1.church** che i tuoi membri installano da qualsiasi pagina su `https://nomedeltuachiesa.b1.church`. I cambiamenti che fai in questa pagina vengono riflessi la prossima volta che un membro apre l'app. (Le schede sono anche rese dall'app nativa [B1 Mobile](/docs/b1-mobile/) legacy per qualsiasi membro che la sta ancora utilizzando, ma quell'app è deprecata e non viene più aggiornata.)

## Passaggi Successivi

- [Impostazioni della Chiesa](./church-settings.md) -- Configura le informazioni e il branding della tua chiesa
- [Ruoli e Autorizzazioni](./roles-permissions.md) -- Gestisci l'accesso per il tuo team
