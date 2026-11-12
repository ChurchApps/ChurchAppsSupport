---
title: "Campi personalizzati"
description: "Definisci campi personalizzati in B1 Admin per registrare dettagli aggiuntivi sulle persone, come la scadenza del controllo dei precedenti o la taglia della maglietta, poi cerca e filtra per essi."
---

# Campi personalizzati

<div class="article-intro">

I **Campi personalizzati** ti permettono di registrare informazioni proprie su ogni scheda persona — cose per cui B1 non ha un campo integrato, come la data di scadenza del controllo dei precedenti, la taglia della maglietta o lo stato del corso di battesimo. Definisci un campo una sola volta nelle Impostazioni, poi compila un valore nel profilo di ogni persona e cerca o crea elenchi in base ad esso. Questo sostituisce la vecchia soluzione alternativa di creare un modulo per le persone solo per conservare un singolo dato personalizzato.

</div>

## Video di formazione {#training-video}

<YouTube id="yUfDEbp2HQ4" title="Campi personalizzati, modifica in blocco ed esportazione in B1" next="Creare gruppi e aggiungere membri in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti serve l'autorizzazione **Modifica impostazioni chiesa** per aprire la pagina Impostazioni (e per salvare l'elenco dei Titoli), oltre all'autorizzazione di modifica **Persone** per definire i campi e inserire i valori. Chi ha l'autorizzazione di visualizzazione Persone può vedere i valori. Vedi [Ruoli e autorizzazioni](./roles-permissions.md).
- Prima di iniziare, decidi cosa vuoi registrare e quale tipo si adatta meglio (testo, numero, data, sì/no o elenco di scelta).

</div>

## Aprire i campi personalizzati {#opening-custom-fields}

In B1 Admin, apri il [menu di salto](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Impostazioni > Impostazioni** e fai clic su **Campi personalizzati** nell'elenco a sinistra per scorrere fino alla sezione **Campi personalizzati**. Puoi anche andarci direttamente all'indirizzo **/settings/custom-fields**. Vedrai un elenco di tutti i campi definiti, con il loro **Nome** e il **Tipo di campo**. Se non ne hai ancora creato nessuno, il pannello riporta *"Non è ancora stato aggiunto alcun campo personalizzato."*

## Titoli {#titles}

La scheda **Titoli** in cima alla sezione Campi personalizzati elenca i titoli offerti nella casella **Titolo** quando si aggiunge o si modifica una persona, in B1 Admin e nell'app B1 (l'editor del profilo e il modulo di registrazione degli ospiti). L'elenco parte con Mr, Mrs, Miss, Ms, Dr, Prof, Rev e Pastor.

1. Digita un titolo in **Nuovo titolo** (fino a 10 caratteri), ad esempio *Diacono* o *Anziano*, e fai clic su **Aggiungi titolo**.
2. Per togliere un titolo dall'elenco, fai clic sulla **×** della sua etichetta.
3. Fai clic su **Salva**. Un messaggio *Titoli salvati.* conferma la modifica. Se aggiungi un titolo già presente nell'elenco, compare *Questo titolo è già nell'elenco.*

:::tip
La casella Titolo accetta ancora la digitazione libera, quindi lo staff e i membri possono inserire un titolo che non è nell'elenco. Rimuovere un titolo dall'elenco non modifica le persone che già lo hanno.
:::

## Aggiungere un campo {#adding-a-field}

1. Fai clic su **Aggiungi campo**.
2. Nell'editor che si apre a destra, inserisci un **Nome** — è l'etichetta che lo staff vedrà nei profili delle persone e nella ricerca (ad esempio, *Controllo precedenti in scadenza*).
3. Scegli un **Tipo di campo**:
   - **Casella di testo** — testo breve a formato libero.
   - **Numero intero** — numeri senza decimali (ad esempio, un conteggio).
   - **Decimale** — numeri che possono includere decimali.
   - **Data** — una data del calendario.
   - **Sì/No** — una semplice risposta sì o no.
   - **Scelta multipla** — un elenco di scelta. Quando selezioni questo tipo, compare un **editor delle scelte** in cui aggiungere ciascuna opzione selezionabile dalle persone.
4. Fai clic su **Salva**.

Il campo è ora disponibile nel profilo di ogni persona.

:::info
I tipi di campo sono gli stessi usati per le [domande dei moduli](../forms/creating-forms.md), quindi i valori si comportano in modo coerente in tutto B1.
:::

## Modificare un campo {#editing-a-field}

Fai clic su una riga qualsiasi dell'elenco per riaprire il campo nell'editor. Cambia il nome, il tipo o le scelte e fai clic su **Salva**.

:::warning
Cambiare il **Tipo di campo** di un campo che ha già dei valori (ad esempio, da Casella di testo a Data) può lasciare i valori inseriti in un formato che non corrisponde più al nuovo tipo. Cambia i tipi con cautela una volta che lo staff ha iniziato a compilare il campo.
:::

## Eliminare un campo {#deleting-a-field}

Apri un campo per modificarlo e fai clic su **Elimina**. Ti verrà chiesta conferma: *"Sei sicuro di voler eliminare questo campo personalizzato? Anche i suoi valori memorizzati verranno rimossi."* Eliminare un campo lo rimuove in modo permanente **insieme a tutti i valori memorizzati** per tutte le persone — l'operazione non può essere annullata.

## Compilare i valori di una persona {#filling-in-values-on-a-person}

Una volta che esiste almeno un campo personalizzato, i suoi valori si trovano accanto ai dati integrati nella scheda di ogni persona — li vedi insieme ai recapiti della persona, a sinistra del profilo, e li modifichi nello stesso modulo che usi per il resto delle informazioni della persona. Non compare nulla di nuovo finché non hai definito il primo campo.

1. Apri la scheda di una persona in **Persone**.
2. Fai clic sul pulsante **Modifica** a sinistra del profilo, sotto i recapiti della persona.
3. Scorri fino all'area **Campi personalizzati** in fondo al modulo di modifica e inserisci un valore per ciascun campo. Ogni campo mostra il controllo corrispondente al suo tipo — un selettore di date per i campi Data, un menu a discesa sì/no per i campi Sì/No, un elenco di scelta per la Scelta multipla, e così via.
4. Fai clic su **Salva**. I valori dei tuoi campi personalizzati vengono salvati insieme al resto dei dati della persona.

Tornando al profilo, ogni campo che ha un valore compare ora sotto i recapiti della persona nella forma *Nome campo: valore* (le risposte Sì/No appaiono come *Sì* o *No*, e la Scelta multipla mostra l'etichetta dell'opzione). I campi lasciati vuoti restano semplicemente nascosti. Per rimuovere un valore, modifica la persona, svuota il campo e salva — un valore vuoto viene eliminato dalla scheda invece di essere memorizzato come vuoto.

:::tip
Il caso d'uso classico è la sicurezza dei volontari: crea un campo **Data** chiamato *Controllo precedenti in scadenza*, registra la data di ciascun volontario, poi crea una [Lista salvata](../people/lists.md) che segnali chiunque abbia una data già superata.
:::

## Cercare e creare elenchi sui campi personalizzati {#searching-and-building-lists-on-custom-fields}

I campi personalizzati sono completamente ricercabili:

1. Nella pagina **Persone**, apri la [Ricerca avanzata](../people/searching-people.md).
2. Espandi la categoria **Campi personalizzati**.
3. Seleziona il campo su cui vuoi filtrare, scegli un operatore e inserisci un valore. Gli operatori proposti corrispondono al tipo del campo:
   - **Casella di testo** — contiene, è uguale a, inizia con, finisce con.
   - **Numero intero / Decimale** — è uguale a, maggiore di, maggiore o uguale a, minore di, minore o uguale a.
   - **Data** — è uguale a, successiva a (maggiore di), precedente a (minore di).
   - **Sì/No** — è uguale a Sì o No.
   - **Scelta multipla** — è uguale a una delle scelte o la contiene.

Puoi salvare qualsiasi ricerca su un campo personalizzato come [Elenco](../people/lists.md). Gli elenchi sono query in tempo reale, quindi un elenco creato su *Controllo precedenti in scadenza è prima di oggi* ricontrolla ogni persona ogni volta che lo apri — senza alcuna manutenzione manuale.

## Mostrare un campo personalizzato come colonna {#showing-a-custom-field-as-a-column}

Per vedere i valori di un campo per tutti insieme, aggiungilo come colonna nella pagina **Persone**. Imposta **Visualizza come** su **Tabella**, fai clic sull'icona **Seleziona colonne** nell'intestazione della pagina, passa alla scheda **Personalizzati** e seleziona il campo. Il valore di ogni persona compare nella propria colonna accanto a quelle integrate. Vedi [Mostrare i campi personalizzati come colonne](../people/searching-people.md#showing-custom-fields-as-columns).

## Cosa succede durante l'unione {#what-happens-on-merge}

Quando [unisci due schede persona](../people/adding-people.md), i valori dei campi personalizzati vengono riportati automaticamente. La persona che conservi mantiene i propri valori; per ogni campo in cui aveva un valore solo la persona eliminata, quel valore viene copiato, così nulla va perso.

## Articoli correlati {#related-articles}

- [Cercare persone](../people/searching-people.md) — ricerca avanzata, inclusa la categoria Campi personalizzati, e visualizzazione dei campi personalizzati come colonne
- [Elenchi salvati](../people/lists.md) — salva una ricerca su un campo personalizzato e rieseguila in tempo reale
- [Ruoli e autorizzazioni](./roles-permissions.md) — chi può definire i campi e modificare i valori
- [Creare moduli](../forms/creating-forms.md) — per la raccolta di dati con più domande, quando un intero modulo è più adatto di singoli campi
