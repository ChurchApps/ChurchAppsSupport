---
title: "Campi Personalizzati"
---

# Campi Personalizzati

<div class="article-intro">

I **Campi Personalizzati** ti permettono di tracciare informazioni proprie su ogni record di persona -- cose che B1 non ha un campo integrato per, come una data di scadenza di un controllo dei precedenti, una taglia di maglietta, o uno stato di classe di battesimo. Definisci un campo una volta nelle Impostazioni, quindi inserisci un valore nel profilo di ogni persona e cerca o costruisci elenchi su di esso. Questo sostituisce il vecchio workaround di creare un modulo Persone solo per memorizzare un singolo dato.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso **Modifica Persone** per definire i campi e inserire i valori, e accesso all'area **Impostazioni**. Chiunque abbia il permesso di visualizzazione Persone può vedere i valori. Vedi [Ruoli e Autorizzazioni](./roles-permissions.md).
- Decidi cosa vuoi tracciare e quale tipo si adatta meglio (testo, un numero, una data, una risposta sì/no, o un elenco a scelta) prima di iniziare.

</div>

## Apertura dei Campi Personalizzati

In B1 Admin, apri il **menu sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia), scegli **Impostazioni**, e seleziona la scheda **Campi Personalizzati**. Puoi anche andare direttamente a **/settings/custom-fields**. Vedrai un elenco di ogni campo che hai definito, mostrando il suo **Nome** e **Tipo di Campo**. Se non ne hai ancora creati, il pannello legge *"Nessun campo personalizzato è stato aggiunto ancora."*

## Aggiunta di un Campo

1. Fai clic su **Aggiungi Campo**.
2. Nell'editor che si apre a destra, inserisci un **Nome** -- questa è l'etichetta che il personale vedrà nei profili delle persone e nella ricerca (ad esempio, *La verifica dei precedenti scade*).
3. Scegli un **Tipo di Campo**:
   - **Casella di Testo** -- testo libero breve.
   - **Numero Intero** -- numeri senza decimali (ad esempio, un conteggio).
   - **Decimale** -- numeri che possono includere decimali.
   - **Data** -- una data del calendario.
   - **Sì/No** -- una semplice risposta sì o no.
   - **Scelta Multipla** -- un elenco a scelta. Quando scegli questo tipo, appare un **editor di scelte** in modo da poter aggiungere ogni opzione che le persone possono selezionare.
4. Fai clic su **Salva**.

Il campo è ora disponibile nel profilo di ogni persona.

:::info
I tipi di campo sono lo stesso set utilizzato per [domande di moduli](../forms/creating-forms.md), quindi i valori si comportano in modo coerente in B1.
:::

## Modifica di un Campo

Fai clic su qualsiasi riga di campo nell'elenco per riaprirlo nell'editor. Cambia il nome, il tipo o le scelte e fai clic su **Salva**.

:::warning
Cambiare il **Tipo di Campo** di un campo che ha già valori (ad esempio, da Casella di Testo a Data) può lasciare i valori precedentemente inseriti in un formato che non corrisponde più al nuovo tipo. Cambia i tipi con cautela una volta che il personale ha iniziato a compilare il campo.
:::

## Eliminazione di un Campo

Apri un campo per la modifica e fai clic su **Elimina**. Ti verrà chiesto di confermare: *"Sei sicuro di voler eliminare questo campo personalizzato? I suoi valori memorizzati verranno anche rimossi."* Eliminare un campo rimuove permanentemente esso **e ogni valore memorizzato per esso** su tutte le persone -- questo non può essere annullato.

## Inserimento dei Valori nel Profilo di una Persona

Una volta che almeno un campo personalizzato esiste, i suoi valori vivono direttamente accanto ai dettagli integrati nel record di ogni persona -- li visualizzi in **Dettagli Personali** e li modifichi nello stesso modulo che usi per il resto delle informazioni della persona. Niente di extra appare finché non hai definito il tuo primo campo.

1. Apri il record di una persona in **Persone**.
2. Nella sezione **Dettagli Personali**, fai clic sul pulsante **Modifica** (matita).
3. Scorri fino all'area **Campi Personalizzati** nella parte inferiore del modulo di modifica e inserisci un valore per ogni campo. Ogni campo mostra l'input che corrisponde al suo tipo -- un selettore di data per i campi Data, un menu a discesa sì/no per i campi Sì/No, un elenco a scelta per Scelta Multipla, e così via.
4. Fai clic su **Salva**. I tuoi valori di campo personalizzato vengono salvati insieme al resto dei dettagli della persona.

Nel profilo, qualsiasi campo che ha un valore ora mostra nella sezione **Dettagli Personali** (le risposte Sì/No leggono come *Sì* o *No*, e Scelta Multipla mostra l'etichetta dell'opzione). I campi lasciati vuoti sono semplicemente nascosti. Per rimuovere un valore, modifica la persona, cancella il campo e salva -- un valore vuoto viene eliminato dal record piuttosto che memorizzato come vuoto.

:::tip
Il caso d'uso classico è la sicurezza dei volontari: crea un campo **Data** chiamato *La verifica dei precedenti scade*, registra la data di ogni volontario, quindi costruisci un [Elenco Salvato](../people/lists.md) che contrassegna chiunque la cui data è passata.
:::

## Ricerca e Costruzione di Elenchi su Campi Personalizzati

I campi personalizzati sono completamente ricercabili:

1. Nella pagina **Persone**, apri la [Ricerca Avanzata](../people/searching-people.md).
2. Espandi la categoria **Campi Personalizzati**.
3. Spunta il campo su cui vuoi filtrare, scegli un operatore e inserisci un valore. Gli operatori offerti corrispondono al tipo del campo:
   - **Casella di Testo** -- contiene, è uguale a, inizia con, termina con.
   - **Numero Intero / Decimale** -- è uguale a, maggiore di, maggiore o uguale a, minore di, minore o uguale a.
   - **Data** -- è uguale a, dopo (maggiore di), prima (minore di).
   - **Sì/No** -- è uguale a Sì o No.
   - **Scelta Multipla** -- è uguale a o contiene una delle scelte.

Salva qualsiasi ricerca di campo personalizzato come [Elenco](../people/lists.md). Gli elenchi sono query live, quindi un elenco costruito su *La verifica dei precedenti scade prima di oggi* ricontrolla ogni persona ogni volta che lo apri -- nessuna manutenzione manuale.

## Cosa Succede in Caso di Unione

Quando [unisci due record di persona](../people/adding-people.md), i valori dei campi personalizzati vengono trasferiti automaticamente. La persona che mantieni tiene i tuoi stessi valori; per qualsiasi campo dove solo la persona rimossa aveva un valore, quel valore viene copiato in modo che nulla vada perso.

## Articoli Correlati

- [Ricerca Persone](../people/searching-people.md) -- ricerca avanzata, inclusa la categoria Campi Personalizzati
- [Elenchi Salvati](../people/lists.md) -- salva una ricerca di campo personalizzato e rieseguila live
- [Ruoli e Autorizzazioni](./roles-permissions.md) -- chi può definire i campi e modificare i valori
- [Creazione di Moduli](../forms/creating-forms.md) -- per la raccolta di dati multi-domanda dove un modulo completo si adatta meglio dei singoli campi
