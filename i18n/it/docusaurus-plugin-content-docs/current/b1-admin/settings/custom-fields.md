---
title: "Campi Personalizzati"
---

# Campi Personalizzati

<div class="article-intro">

I **Campi Personalizzati** ti permettono di tracciare le tue informazioni su ogni scheda persona -- cose per cui B1 non ha un campo integrato, come una data di scadenza del controllo dei precedenti, una taglia di maglietta o lo stato di un corso di battesimo. Definisci un campo una sola volta in Settings, poi compili un valore sul profilo di ogni persona e puoi cercarlo o costruire elenchi basati su di esso. Questo sostituisce il vecchio metodo di creare un modulo People solo per memorizzare un singolo dato personalizzato.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Hai bisogno del permesso di modifica su **People** per definire i campi e compilare i valori, oltre all'accesso all'area **Settings**. Chiunque abbia il permesso di visualizzazione su People può vedere i valori. Vedi [Ruoli e Permessi](./roles-permissions.md).
- Decidi cosa vuoi tracciare e quale tipo si adatta meglio (testo, numero, data, risposta sì/no o elenco a scelta) prima di iniziare.

</div>

## Apertura di Custom Fields

In B1 Admin, vai su **Settings** nella barra laterale sinistra e seleziona il riquadro **Custom Fields**. Puoi anche andarci direttamente su **/settings/custom-fields**. Vedrai un elenco di ogni campo che hai definito, con il suo **Name** e **Field Type**. Se non ne hai ancora creato nessuno, il pannello mostra *"No custom fields have been added yet."*

## Aggiungere un Campo

1. Clicca su **Add Field**.
2. Nell'editor che si apre a destra, inserisci un **Name** -- questa è l'etichetta che lo staff vedrà sui profili delle persone e nella ricerca (ad esempio, *Background check expires*).
3. Scegli un **Field Type**:
   - **Textbox** — testo breve libero.
   - **Whole Number** — numeri senza decimali (ad esempio, un conteggio).
   - **Decimal** — numeri che possono includere decimali.
   - **Date** — una data del calendario.
   - **Yes/No** — una semplice risposta sì o no.
   - **Multiple Choice** — un elenco a scelta. Quando scegli questo tipo, appare un **editor delle scelte** in modo da poter aggiungere ogni opzione tra cui le persone possono selezionare.
4. Clicca su **Save**.

Il campo è ora disponibile sul profilo di ogni persona.

:::info
I tipi di campo sono lo stesso insieme utilizzato per le [domande dei moduli](../forms/creating-forms.md), quindi i valori si comportano in modo coerente in tutto B1.
:::

## Modificare un Campo

Clicca su una qualsiasi riga di campo nell'elenco per riaprirla nell'editor. Cambia il nome, il tipo o le scelte e clicca su **Save**.

:::warning
Cambiare il **Field Type** di un campo che ha già valori (ad esempio, da Textbox a Date) può lasciare i valori precedentemente inseriti in un formato che non corrisponde più al nuovo tipo. Cambia i tipi con attenzione una volta che lo staff ha iniziato a compilare il campo.
:::

## Eliminare un Campo

Apri un campo per la modifica e clicca su **Delete**. Ti verrà chiesto di confermare: *"Are you sure you wish to delete this custom field? Its stored values will also be removed."* L'eliminazione di un campo lo rimuove definitivamente **insieme a ogni valore memorizzato per esso** su tutte le persone -- questa azione non può essere annullata.

## Compilare i Valori su una Persona

Una volta che esiste almeno un campo personalizzato, i suoi valori vivono proprio accanto ai dettagli integrati sulla scheda di ogni persona -- li visualizzi in **Personal Details** e li modifichi sullo stesso modulo che usi per il resto delle informazioni della persona. Non appare nulla di aggiuntivo finché non hai definito il tuo primo campo.

1. Apri la scheda di una persona in **People**.
2. Nella sezione **Personal Details**, clicca sul pulsante **Edit** (matita).
3. Scorri fino all'area **Custom Fields** in fondo al modulo di modifica e compila un valore per ogni campo. Ogni campo mostra l'input corrispondente al suo tipo -- un selettore di data per i campi Date, un menu a discesa sì/no per i campi Yes/No, un elenco a scelta per Multiple Choice, e così via.
4. Clicca su **Save**. I valori dei tuoi campi personalizzati vengono salvati insieme al resto dei dettagli della persona.

Tornati sul profilo, ogni campo che ha un valore ora appare nella sezione **Personal Details** (le risposte Yes/No si leggono come *Sì* o *No*, e Multiple Choice mostra l'etichetta dell'opzione). I campi lasciati vuoti sono semplicemente nascosti. Per rimuovere un valore, modifica la persona, svuota il campo e salva -- un valore vuoto viene eliminato dalla scheda invece di essere memorizzato come vuoto.

:::tip
Il caso d'uso classico è la sicurezza dei volontari: crea un campo **Date** chiamato *Background check expires*, registra la data di ciascun volontario, poi costruisci una [Lista Salvata](../people/lists.md) che segnala chiunque abbia una data già passata.
:::

## Cercare e Costruire Elenchi sui Campi Personalizzati

I campi personalizzati sono completamente ricercabili:

1. Sulla pagina **People**, apri la [Ricerca Avanzata](../people/searching-people.md).
2. Espandi la categoria **Custom Fields**.
3. Seleziona il campo su cui vuoi filtrare, scegli un operatore e inserisci un valore. Gli operatori offerti corrispondono al tipo del campo:
   - **Textbox** — contiene, è uguale a, inizia con, finisce con.
   - **Whole Number / Decimal** — è uguale a, maggiore di, maggiore o uguale a, minore di, minore o uguale a.
   - **Date** — è uguale a, dopo (maggiore di), prima (minore di).
   - **Yes/No** — è uguale a Sì o No.
   - **Multiple Choice** — è uguale a o contiene una delle scelte.

Salva qualsiasi ricerca su campo personalizzato come [Lista](../people/lists.md). Le liste sono query dal vivo, quindi una lista costruita su *Background check expires is before today* riverifica ogni persona ogni volta che la apri -- senza alcuna manutenzione manuale.

## Cosa Succede in Caso di Unione

Quando [unisci due schede persona](../people/adding-people.md), i valori dei campi personalizzati vengono trasferiti automaticamente. La persona che mantieni conserva i propri valori; per qualsiasi campo in cui solo la persona rimossa aveva un valore, quel valore viene copiato in modo che nulla vada perso.

## Articoli Correlati

- [Ricerca delle Persone](../people/searching-people.md) — ricerca avanzata, inclusa la categoria Custom Fields
- [Liste Salvate](../people/lists.md) — salva una ricerca su campo personalizzato ed eseguila di nuovo dal vivo
- [Ruoli e Permessi](./roles-permissions.md) — chi può definire i campi e modificare i valori
- [Creare Moduli](../forms/creating-forms.md) — per la raccolta dati con più domande dove un modulo completo si adatta meglio di singoli campi
