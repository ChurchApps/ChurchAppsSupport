---
title: "Campi personalizzati"
---

# Campi personalizzati

<div class="article-intro">

I **Campi personalizzati** ti permettono di tracciare le tue proprie informazioni su ogni record di persona, cose che B1 non ha un campo integrato per, come una data di scadenza del controllo del background, una taglia di maglietta, o uno stato della classe di battesimo. Definisci un campo una volta nelle Impostazioni, quindi compila un valore nel profilo di ogni persona e cerca o costruisci elenchi su di esso. Questo sostituisce il vecchio workaround di creare un modulo di Persone solo per archiviare un singolo pezzo di dati personalizzati.

</div>

<div class="prereqs">
<h4>Prima di iniziare</h4>

- È necessaria l'autorizzazione di modifica **People** per definire i campi e per compilare i valori, e l'accesso all'area **Settings**. Chiunque abbia autorizzazione di visualizzazione People può vedere i valori. Vedi [Roles & Permissions](./roles-permissions.md).
- Decidi cosa vuoi tracciare e quale tipo si adatta meglio (testo, un numero, una data, una risposta sì/no, o una lista di scelta) prima di iniziare.

</div>

## Apertura dei campi personalizzati

In B1 Admin, apri il [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Settings > Settings**, e seleziona la scheda **Custom Fields**. Puoi anche andare direttamente a **/settings/custom-fields**. Vedrai un elenco di ogni campo che hai definito, che mostra il suo **Nome** e **Tipo di campo**. Se non ne hai creato uno ancora, il pannello legge *"Nessun campo personalizzato è stato aggiunto ancora."*

## Aggiunta di un campo

1. Fai clic su **Add Field**.
2. Nell'editor che si apre a destra, immetti un **Nome** - questa è l'etichetta che lo staff vedrà sui profili delle persone e nella ricerca (ad esempio, *La verifica del background scade*).
3. Scegli un **Tipo di campo**:
   - **Textbox** — testo libero di breve lunghezza.
   - **Whole Number** — numeri senza decimali (ad esempio, un conteggio).
   - **Decimal** — numeri che possono includere decimali.
   - **Date** — una data del calendario.
   - **Yes/No** — una semplice risposta sì o no.
   - **Multiple Choice** — una lista di scelta. Quando scegli questo tipo, appare un **editor di scelte** in modo da poter aggiungere ogni opzione che le persone possono selezionare.
4. Fai clic su **Save**.

Il campo è ora disponibile nel profilo di ogni persona.

:::info
I tipi di campo sono lo stesso set utilizzato per le [domande del modulo](../forms/creating-forms.md), quindi i valori si comportano in modo coerente su B1.
:::

## Modifica di un campo

Fai clic su qualsiasi riga di campo nell'elenco per riaprirlo nell'editor. Cambia il nome, il tipo o le scelte e fai clic su **Save**.

:::warning
Cambiare il **Tipo di campo** di un campo che ha già valori (ad esempio, da Textbox a Date) può lasciare i valori precedentemente immessi in un formato che non corrisponde più al nuovo tipo. Cambia i tipi con attenzione una volta che lo staff ha iniziato a compilare il campo.
:::

## Eliminazione di un campo

Apri un campo per la modifica e fai clic su **Delete**. Ti verrà chiesto di confermare: *"Sei sicuro di voler eliminare questo campo personalizzato? I suoi valori archiviati verranno anche rimossi."* L'eliminazione di un campo rimuove permanentemente **ogni valore archiviato per esso** su tutte le persone, questo non può essere annullato.

## Compilazione di valori su una persona

Una volta che esiste almeno un campo personalizzato, i suoi valori risiedono proprio accanto ai dettagli integrati nel record di ogni persona, li visualizzi in **Personal Details** e li modifichi sulla stessa forma che usi per il resto delle informazioni della persona. Nulla di straordinario appare fino a quando non hai definito il tuo primo campo.

1. Apri il record di una persona in **People**.
2. Nella sezione **Personal Details**, fai clic sul pulsante **Edit** (matita).
3. Scorri fino all'area **Custom Fields** nella parte inferiore del modulo di modifica e compila un valore per ogni campo. Ogni campo mostra l'input che corrisponde al suo tipo, un selezionatore di data per i campi Date, un menu a discesa sì/no per i campi Yes/No, una lista di scelta per Multiple Choice, e così via.
4. Fai clic su **Save**. I tuoi valori di campi personalizzati vengono salvati insieme al resto dei dettagli della persona.

Tornando al profilo, qualsiasi campo che ha un valore ora mostra nella sezione **Personal Details** (le risposte Yes/No leggono come *Sì* o *No*, e Multiple Choice mostra l'etichetta dell'opzione). I campi lasciati vuoti sono semplicemente nascosti. Per rimuovere un valore, modifica la persona, cancella il campo, e salva, un valore vuoto viene eliminato dal record anziché archiviato come vuoto.

:::tip
Il caso di utilizzo classico è la sicurezza dei volontari: crea un campo **Date** chiamato *La verifica del background scade*, registra la data di ogni volontario, quindi costruisci un [Elenco salvato](../people/lists.md) che contrassegna chiunque la cui data sia passata.
:::

## Ricerca e costruzione di elenchi su campi personalizzati

I campi personalizzati sono completamente ricercabili:

1. Sulla pagina **People**, apri la [Ricerca avanzata](../people/searching-people.md).
2. Espandi la categoria **Custom Fields**.
3. Seleziona il campo su cui desideri filtrare, scegli un operatore e inserisci un valore. Gli operatori offerti corrispondono al tipo del campo:
   - **Textbox** — contiene, è uguale a, inizia con, termina con.
   - **Whole Number / Decimal** — è uguale a, maggiore di, maggiore o uguale, minore di, minore o uguale.
   - **Date** — è uguale a, dopo (maggiore di), prima (minore di).
   - **Yes/No** — è uguale a Sì o No.
   - **Multiple Choice** — è uguale a o contiene una delle scelte.

Salva qualsiasi ricerca di campo personalizzato come [Elenco](../people/lists.md). Gli elenchi sono query dal vivo, quindi un elenco costruito su *La verifica del background scade prima di oggi* controlla di nuovo ogni persona ogni volta che lo apri, nessuna manutenzione manuale.

## Visualizzazione di un campo personalizzato come colonna

Per vedere i valori di un campo per tutti in una volta, aggiungilo come colonna sulla pagina **People**. Apri il selezionatore di colonna, passa alla scheda **Custom**, e seleziona il campo. Il valore di ogni persona appare nella sua propria colonna accanto agli integrati. Vedi [Visualizzazione di campi personalizzati come colonne](../people/searching-people.md#showing-custom-fields-as-columns).

## Cosa succede al merge

Quando [unisci due record di persona](../people/adding-people.md), i valori dei campi personalizzati vengono trasportati automaticamente. La persona che mantieni tiene i loro stessi valori; per qualsiasi campo dove solo la persona rimossa aveva un valore, quel valore viene copiato in modo che nulla vada perso.

## Articoli correlati

- [Searching People](../people/searching-people.md) — ricerca avanzata, inclusa la categoria Custom Fields, e visualizzazione di campi personalizzati come colonne
- [Saved Lists](../people/lists.md) — salva una ricerca di campo personalizzato ed eseguila di nuovo dal vivo
- [Roles & Permissions](./roles-permissions.md) — chi può definire campi e modificare valori
- [Creating Forms](../forms/creating-forms.md) — per la raccolta di dati multi-domanda dove un modulo completo si adatta meglio di singoli campi
