---
title: "Gestire schermi e gruppi"
---

# Gestire schermi e gruppi

<div class="article-intro">

La pagina **Schermi** di FreePlay Admin elenca ogni TV abbinata alla vostra chiesa, con ciò che sta riproducendo in questo momento e se è pronta per la domenica. Qui gestite anche i **gruppi di schermi**. Gli schermi dello stesso gruppo condividono un unico calendario e un'unica playlist predefinita.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Accedete a FreePlay Admin all'indirizzo [admin.freeplay.church](https://admin.freeplay.church)
- [Abbinate almeno uno schermo](./pairing-a-screen)

</div>

## La pagina Schermi

In alto, tre numeri vi danno un rapido quadro della situazione:

- **Online ora** -- Schermi che hanno effettuato l'accesso negli ultimi 15 minuti
- **Pronti per la domenica** -- Quanti schermi programmati hanno scaricato tutto fino alla prossima domenica
- **Richiede attenzione** -- Schermi offline o con file mancanti

Più sotto, usate **Cerca schermi** per trovare uno schermo per etichetta, gruppo o contenuto in riproduzione. I filtri a chip restringono l'elenco a **Tutti**, **Programmati**, **Manuali**, **Richiede attenzione** oppure a un singolo gruppo. Passate dalla vista **Tabella** alla vista **Griglia** con il selettore a destra.

Ogni schermo mostra:

- **Etichetta** e modello del dispositivo
- **Gruppo**
- **Modalità** -- **Programmato** oppure **Manuale**
- **In riproduzione ora** -- Ciò che è sullo schermo in questo momento. Gli schermi manuali mostrano **Aula · l'insegnante preme Avvia**
- **Pronto fino a** -- La data fino alla quale lo schermo ha scaricato i contenuti. Se alcuni file non sono stati scaricati, mostra invece **N file mancanti**. Un nuovo schermo mostra **In attesa della prima sincronizzazione**
- **Ultimo accesso** -- Quando lo schermo ha effettuato l'accesso l'ultima volta. Uno schermo che non si connette da un po' di tempo mostra **Offline**, e uno che non si è mai connesso mostra **Mai visto**

Usate **Presenta** per riprodurre il calendario dello schermo nel vostro browser, oppure **Modifica** per cambiarne le impostazioni.

## Visualizzare uno schermo

Fate clic sull'etichetta di uno schermo per aprire la sua pagina. Sulla sinistra:

- **Presenta nel browser** -- Riproduce a schermo intero il calendario di questo schermo nel browser, come apparirebbe sulla TV. Vedere [Presentare da un browser](./scheduled-playback#presenting-from-a-browser)
- **Modifica** -- Cambia l'etichetta, il gruppo o la modalità
- **Altro** > **Rimuovi abbinamento** -- Disconnette la TV, che torna a mostrare un codice di abbinamento

Il resto della pagina contiene queste sezioni:

- **Ora e prossimi** -- Ciò che è in riproduzione ora e fino a quando, seguito da tutto ciò che è programmato nei prossimi 7 giorni. Fate clic su **Apri calendario** per passare al calendario di questo gruppo
- **Download** -- **Pronto fino a** una data in cui tutto è stato scaricato, oppure un elenco dei file mancanti
- **Dispositivo** -- ID del dispositivo, piattaforma, modello, versione dell'app FreePlay, indirizzo IP, spazio di archiviazione usato e libero, ultimo accesso e modalità
- **Recenti** -- L'attività più recente segnalata dallo schermo

:::tip
Se uno schermo mostra file mancanti, assicuratevi che sia online e che abbia spazio di archiviazione libero. La TV scarica i file mancanti da sola la prossima volta che effettua l'accesso.
:::

## Modificare uno schermo

1. Fate clic su **Modifica** accanto allo schermo, oppure nella sua pagina.
2. Cambiate l'**Etichetta**, il **Gruppo** o la **Modalità** (**Programmato** o **Manuale**).
3. Fate clic su **Salva**.

Spostare uno schermo in un altro gruppo lo fa passare al calendario di quel gruppo.

## Gruppi di schermi {#screen-groups}

Un gruppo di schermi è un insieme di schermi che riproducono la stessa cosa nello stesso momento, come "Atrio" o "Ala bambini". Ogni gruppo ha il proprio calendario e può avere una **playlist predefinita** che viene riprodotta quando non c'è nulla in programma.

Per gestire i gruppi, fate clic su **Gruppi** in cima alla pagina **Schermi**. L'elenco **Gruppi di schermi** mostra il nome di ciascun gruppo, quanti schermi contiene e la sua playlist predefinita. Fate clic su **Schermi** per tornare indietro.

### Aggiungere un gruppo

1. Nella vista **Gruppi di schermi**, fate clic su **Aggiungi gruppo**.
2. Inserite un **Nome**, per esempio "Atrio".
3. Scegliete una playlist come **Playlist predefinita**, oppure lasciate **Nessuna -- lo schermo resta spento**.
4. Fate clic su **Salva**.

Potete anche creare un gruppo mentre abbinate uno schermo, scegliendo **＋ Nuovo gruppo…** nel campo **Gruppo**.

### Modificare o eliminare un gruppo

1. Fate clic su **Modifica** accanto al gruppo.
2. Cambiate il nome o la playlist predefinita, poi fate clic su **Salva**.
3. Per rimuovere il gruppo, fate clic su **Elimina** e confermate.

:::warning
Eliminare un gruppo elimina anche la sua programmazione. Gli schermi di quel gruppo restano spenti finché non li spostate in un altro gruppo.
:::

## Articoli correlati

- **[Abbinare uno schermo](./pairing-a-screen)** -- Aggiungere una nuova TV
- **[Programmare il calendario](./scheduling-the-calendar)** -- Stabilire cosa riproduce ogni gruppo e la sua playlist predefinita
- **[Riproduzione programmata sulla TV](./scheduled-playback)** -- Cosa significa la data "Pronto fino a" sulla TV stessa
