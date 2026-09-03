---
title: "Campi Personalizzati"
---

# Campi Personalizzati

<div class="article-intro">

I **Campi Personalizzati** ti permettono di tracciare le tue informazioni su ogni record di persona — cose che B1 non ha un campo integrato per, come una data di scadenza della verifica dei precedenti, una taglia di maglietta o uno stato della classe di battesimo. Definisci un campo una volta nelle Impostazioni, quindi compila un valore nel profilo di ogni persona e cerca o costruisci liste su di esso. Questo sostituisce il vecchio workaround di creare un modulo People solo per archiviare un singolo pezzo di dati personalizzati.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso **People** di modifica per definire campi e riempire i valori, e dell'accesso all'area **Settings**. Chiunque abbia il permesso di visualizzazione di People può vedere i valori. Vedi [Ruoli e Permessi](./roles-permissions.md).
- Decidi cosa desideri tracciare e quale tipo si adatta meglio (testo, numero, data, risposta sì/no o elenco pick-list) prima di iniziare.

</div>

## Apertura dei Campi Personalizzati

In B1 Admin, apri il **menu della sezione** nell'angolo in alto a sinistra (il nome della sezione con la piccola freccia), scegli **Settings** e seleziona la scheda **Custom Fields**. Puoi anche andare direttamente a **/settings/custom-fields**. Vedrai un elenco di ogni campo che hai definito, mostrando il suo **Name** e **Field Type**. Se non ne hai ancora creato nessuno, il pannello legge *"No custom fields have been added yet."*

## Aggiunta di un Campo

1. Fai clic su **Add Field**.
2. Nell'editor che si apre a destra, immetti un **Name** — questo è l'etichetta che lo staff vedrà nei profili di persona e nella ricerca (ad esempio, *Background check expires*).
3. Scegli un **Field Type**:
   - **Textbox** — testo libero a forma breve.
   - **Whole Number** — numeri senza decimali (ad esempio, un conteggio).
   - **Decimal** — numeri che possono includere decimali.
   - **Date** — una data di calendario.
   - **Yes/No** — una risposta semplice sì o no.
   - **Multiple Choice** — un elenco pick-list. Quando scegli questo tipo, appare un **editor delle scelte** in modo da poter aggiungere ogni opzione che le persone possono selezionare.
4. Fai clic su **Save**.

Il campo è ora disponibile nel profilo di ogni persona.

:::info
I tipi di campo sono lo stesso insieme utilizzato per [le domande del modulo](../forms/creating-forms.md), quindi i valori si comportano in modo coerente in B1.
:::

## Modifica di un Campo

Fai clic su qualsiasi riga di campo nell'elenco per riaprirla nell'editor. Cambia il nome, il tipo o le scelte e fai clic su **Save**.

:::warning
Cambiare il **Field Type** di un campo che ha già valori (ad esempio, da Textbox a Date) può lasciare i valori precedentemente inseriti in un formato che non corrisponde più al nuovo tipo. Cambia i tipi con attenzione una volta che lo staff ha iniziato a riempire il campo.
:::

## Eliminazione di un Campo

Apri un campo per la modifica e fai clic su **Delete**. Ti verrà chiesto di confermare: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* L'eliminazione di un campo rimuove permanentemente esso **e ogni valore archiviato per esso** su tutte le persone — questo non può essere annullato.

## Compilazione dei Valori su una Persona

Una volta che esiste almeno un campo personalizzato, i suoi valori vivono proprio accanto ai dettagli integrati nel record di ogni persona — li visualizzi in **Personal Details** e li modifichi nello stesso modulo che usi per il resto delle informazioni della persona. Nulla di extra appare finché non hai definito il tuo primo campo.

1. Apri il record di una persona in **People**.
2. Nella sezione **Personal Details**, fai clic sul pulsante **Edit** (matita).
3. Scorri fino all'area **Custom Fields** in fondo al modulo di modifica e riempi un valore per ogni campo. Ogni campo mostra l'input che corrisponde al suo tipo — un selezionatore di data per i campi Date, un dropdown sì/no per i campi Yes/No, un elenco pick-list per Multiple Choice e così via.
4. Fai clic su **Save**. I tuoi valori di campo personalizzato vengono salvati insieme al resto dei dettagli della persona.

Di nuovo nel profilo, qualsiasi campo che ha un valore ora viene visualizzato nella sezione **Personal Details** (le risposte Yes/No vengono lette come *Yes* o *No*, e Multiple Choice mostra l'etichetta dell'opzione). I campi lasciati vuoti sono semplicemente nascosti. Per rimuovere un valore, modifica la persona, svuota il campo e salva — un valore vuoto viene eliminato dal record anziché archiviato come vuoto.

:::tip
Il caso d'uso classico è la sicurezza dei volontari: crea un campo **Date** chiamato *Background check expires*, registra la data di ogni volontario, quindi crea una [Lista Salvata](../people/lists.md) che segnala chiunque la cui data è passata.
:::

## Ricerca e Costruzione di Liste su Campi Personalizzati

I campi personalizzati sono completamente cercabili:

1. Sulla pagina **People**, apri la [Ricerca Avanzata](../people/searching-people.md).
2. Espandi la categoria **Custom Fields**.
3. Seleziona il campo su cui desideri filtrare, scegli un operatore e immetti un valore. Gli operatori offerti corrispondono al tipo del campo:
   - **Textbox** — contains, equals, starts with, ends with.
   - **Whole Number / Decimal** — equals, greater than, greater than or equal, less than, less than or equal.
   - **Date** — equals, after (greater than), before (less than).
   - **Yes/No** — equals Yes o No.
   - **Multiple Choice** — equals o contains uno delle scelte.

Salva qualsiasi ricerca di campo personalizzato come [Lista](../people/lists.md). Le liste sono query dal vivo, quindi una lista costruita su *Background check expires is before today* ricontrolla ogni persona ogni volta che la apri — nessuna manutenzione manuale.

## Cosa Succede alla Fusione

Quando [unisci due record di persona](../people/adding-people.md), i valori dei campi personalizzati vengono trasferiti automaticamente. La persona che mantieni rimane con i loro propri valori; per qualsiasi campo in cui solo la persona rimossa aveva un valore, quel valore viene copiato in modo che nulla vada perso.

## Articoli Correlati

- [Ricerca di Persone](../people/searching-people.md) — ricerca avanzata, inclusa la categoria Custom Fields
- [Liste Salvate](../people/lists.md) — salva una ricerca di campo personalizzato e rieseguila dal vivo
- [Ruoli e Permessi](./roles-permissions.md) — chi può definire campi e modificare valori
- [Creazione di Moduli](../forms/creating-forms.md) — per la raccolta di dati a domande multiple in cui un modulo completo si adatta meglio ai singoli campi
