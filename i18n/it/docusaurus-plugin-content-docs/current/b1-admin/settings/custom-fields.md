---
title: "Campi Personalizzati"
---

# Campi Personalizzati

<div class="article-intro">

I **Campi Personalizzati** ti permettono di tracciare le tue informazioni su ogni record di persona — cose che B1 non ha un campo integrato, come una data di scadenza della verifica dei precedenti, una taglia di maglietta o lo stato di una classe di battesimo. Definisci un campo una volta in Impostazioni, quindi inserisci un valore nel profilo di ogni persona e cerca o costruisci elenchi su di esso. Questo sostituisce il vecchio workaround di creare un modulo Persone solo per memorizzare un singolo dato.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso di modifica **Persone** per definire campi e per inserire valori, e dell'accesso all'area **Impostazioni**. Chiunque abbia il permesso di visualizzazione Persone può vedere i valori. Vedi [Ruoli e Permessi](./roles-permissions.md).
- Decidi cosa vuoi tracciare e quale tipo si adatta meglio (testo, un numero, una data, una risposta sì/no o una lista di selezione) prima di iniziare.

</div>

## Apertura dei Campi Personalizzati

In B1 Admin, vai su **Impostazioni** nella barra laterale sinistra e seleziona il riquadro **Campi Personalizzati**. Puoi anche andare direttamente a **/settings/custom-fields**. Vedrai un elenco di ogni campo che hai definito, mostrando il suo **Nome** e **Tipo di Campo**. Se non ne hai creato nessuno ancora, il pannello legge *"Nessun campo personalizzato è stato aggiunto ancora."*

## Aggiunta di un Campo

1. Fai clic su **Aggiungi Campo**.
2. Nell'editor che si apre sulla destra, inserisci un **Nome** — questa è l'etichetta che lo staff vedrà nei profili delle persone e nella ricerca (ad esempio, *La verifica dei precedenti scade*).
3. Scegli un **Tipo di Campo**:
   - **Casella di Testo** — testo breve in forma libera.
   - **Numero Intero** — numeri senza decimali (ad esempio, un conteggio).
   - **Decimale** — numeri che possono includere decimali.
   - **Data** — una data del calendario.
   - **Sì/No** — una semplice risposta sì o no.
   - **Scelta Multipla** — una lista di selezione. Quando scegli questo tipo, appare un **editor di scelte** in modo che tu possa aggiungere ogni opzione che le persone possono selezionare.
4. Fai clic su **Salva**.

Il campo è ora disponibile nel profilo di ogni persona.

:::info
I tipi di campo sono lo stesso insieme utilizzato per le [domande del modulo](../forms/creating-forms.md), quindi i valori si comportano coerentemente in B1.
:::

## Modifica di un Campo

Fai clic su qualsiasi riga del campo nell'elenco per riaprirla nell'editor. Cambia il nome, il tipo o le scelte e fai clic su **Salva**.

:::warning
Cambiare il **Tipo di Campo** di un campo che ha già valori (ad esempio, da Casella di Testo a Data) può lasciare i valori inseriti in precedenza in un formato che non corrisponde più al nuovo tipo. Cambia i tipi con attenzione una volta che lo staff ha iniziato a compilare il campo.
:::

## Eliminazione di un Campo

Apri un campo per la modifica e fai clic su **Elimina**. Ti verrà chiesto di confermare: *"Sei sicuro di voler eliminare questo campo personalizzato? I suoi valori memorizzati verranno anche rimossi."* L'eliminazione di un campo rimuove permanentemente **ogni valore memorizzato per esso** su tutte le persone — questo non può essere annullato.

## Inserimento di Valori in una Persona

Una volta che esiste almeno un campo personalizzato, i suoi valori si trovano proprio accanto ai dettagli integrati nel record di ogni persona — li visualizzi in **Dettagli Personali** e li modifichi nello stesso modulo che usi per il resto delle informazioni della persona. Non appare nulla di più fino a quando non hai definito il tuo primo campo.

1. Apri il record di una persona in **Persone**.
2. Nella sezione **Dettagli Personali**, fai clic sul pulsante **Modifica** (matita).
3. Scorri fino all'area **Campi Personalizzati** in fondo al modulo di modifica e inserisci un valore per ogni campo. Ogni campo mostra l'input che corrisponde al suo tipo — un selettore di data per i campi Data, un elenco a discesa sì/no per i campi Sì/No, una lista di selezione per Scelta Multipla e così via.
4. Fai clic su **Salva**. I valori del campo personalizzato vengono salvati insieme al resto dei dettagli della persona.

Tornando al profilo, qualsiasi campo che ha un valore ora viene visualizzato nella sezione **Dettagli Personali** (le risposte Sì/No si leggono come *Sì* o *No*, e Scelta Multipla mostra l'etichetta dell'opzione). I campi lasciati vuoti vengono semplicemente nascosti. Per rimuovere un valore, modifica la persona, cancella il campo e salva — un valore vuoto viene eliminato dal record piuttosto che essere memorizzato come vuoto.

:::tip
Il caso d'uso classico è la sicurezza dei volontari: crea un campo **Data** chiamato *La verifica dei precedenti scade*, registra la data di ogni volontario, quindi costruisci un [Elenco Salvato](../people/lists.md) che contrassegna chiunque abbia superato la data.
:::

## Ricerca e Costruzione di Elenchi su Campi Personalizzati

I campi personalizzati sono completamente ricercabili:

1. Sulla pagina **Persone**, apri la [Ricerca Avanzata](../people/searching-people.md).
2. Espandi la categoria **Campi Personalizzati**.
3. Seleziona il campo su cui vuoi filtrare, scegli un operatore e inserisci un valore. Gli operatori offerti corrispondono al tipo di campo:
   - **Casella di Testo** — contiene, è uguale, inizia con, termina con.
   - **Numero Intero / Decimale** — è uguale, maggiore di, maggiore o uguale, minore di, minore o uguale.
   - **Data** — è uguale, dopo (maggiore di), prima (minore di).
   - **Sì/No** — è uguale a Sì o No.
   - **Scelta Multipla** — è uguale o contiene una delle scelte.

Salva qualsiasi ricerca su campo personalizzato come [Elenco](../people/lists.md). Gli elenchi sono query dal vivo, quindi un elenco costruito su *La verifica dei precedenti scade prima di oggi* ri-controlla ogni persona ogni volta che lo apri — nessuna manutenzione manuale.

## Cosa Accade al Merge

Quando [unisci due record di persona](../people/adding-people.md), i valori dei campi personalizzati vengono trasportati automaticamente. La persona che mantieni tiene i suoi valori; per qualsiasi campo in cui solo la persona rimossa aveva un valore, quel valore viene copiato in modo che nulla vada perso.

## Articoli Correlati

- [Ricerca Persone](../people/searching-people.md) — ricerca avanzata, inclusa la categoria Campi Personalizzati
- [Elenchi Salvati](../people/lists.md) — salva una ricerca su campo personalizzato e rieseguila dal vivo
- [Ruoli e Permessi](./roles-permissions.md) — chi può definire campi e modificare i valori
- [Creazione di Moduli](../forms/creating-forms.md) — per la raccolta di dati multi-domanda dove un modulo completo si adatta meglio di campi singoli
