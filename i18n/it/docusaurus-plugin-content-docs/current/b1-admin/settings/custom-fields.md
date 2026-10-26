---
title: "Campi personalizzati"
---

# Campi personalizzati

<div class="article-intro">

I **Campi personalizzati** ti permettono di tenere traccia di informazioni proprie su ogni scheda persona, come una data di scadenza della verifica dei precedenti penali, la taglia della maglietta o lo stato del corso di battesimo, ovvero tutto ciò per cui B1 non ha un campo predefinito. Definisci un campo una sola volta nelle Impostazioni, poi compili un valore nel profilo di ogni persona e puoi cercare o creare elenchi in base a quel campo. Questo sostituisce la vecchia soluzione alternativa di creare un modulo per le persone solo per memorizzare un singolo dato personalizzato.

</div>

## Video tutorial

<YouTube id="yUfDEbp2HQ4" title="Custom Fields, Bulk Editing, and Exporting in B1" next="Creating Groups and Adding Members in B1" nextUrl="/docs/b1-admin/groups/creating-groups" />

<div class="prereqs">
<h4>Prima di iniziare</h4>

- Ti servono l'autorizzazione di **modifica** per **Persone** per definire i campi e compilare i valori, oltre all'accesso all'area **Impostazioni**. Chiunque abbia l'autorizzazione di **visualizzazione** per Persone può vedere i valori. Vedi [Ruoli e permessi](./roles-permissions.md).
- Prima di iniziare, decidi cosa vuoi tracciare e quale tipo si adatta meglio (testo, un numero, una data, un sì/no o un elenco di scelte).

</div>

## Aprire i campi personalizzati

In B1 Admin, apri il [menu di accesso rapido](../introduction.md#getting-around-with-the-jump-menu) (la barra di ricerca in alto a sinistra), scegli **Impostazioni > Impostazioni** e fai clic su **Campi personalizzati** nell'elenco a sinistra per scorrere fino alla sezione **Campi personalizzati**. Puoi anche andare direttamente a **/settings/custom-fields**. Vedrai un elenco di tutti i campi che hai definito, con il loro **Nome** e il **Tipo di campo**. Se non ne hai ancora creato nessuno, il pannello riporta la scritta *"Nessun campo personalizzato è stato ancora aggiunto."*

## Aggiungere un campo

1. Fai clic su **Aggiungi campo**.
2. Nell'editor che si apre a destra, inserisci un **Nome**: è l'etichetta che il personale vedrà nei profili delle persone e nella ricerca (ad esempio, *Verifica precedenti penali scade*).
3. Scegli un **Tipo di campo**:
   - **Casella di testo**: testo breve e libero.
   - **Numero intero**: numeri senza decimali (ad esempio, un conteggio).
   - **Decimale**: numeri che possono includere decimali.
   - **Data**: una data del calendario.
   - **Sì/No**: una semplice risposta sì o no.
   - **Scelta multipla**: un elenco di opzioni. Quando scegli questo tipo, compare un **editor delle scelte** che ti permette di aggiungere ogni opzione selezionabile dalle persone.
4. Fai clic su **Salva**.

Il campo è ora disponibile nel profilo di ogni persona.

:::info
I tipi di campo sono gli stessi usati per le [domande dei moduli](../forms/creating-forms.md), quindi i valori si comportano in modo coerente in tutta B1.
:::

## Modificare un campo

Fai clic su una riga qualsiasi dell'elenco per riaprire il campo nell'editor. Modifica il nome, il tipo o le scelte e fai clic su **Salva**.

:::warning
Cambiare il **Tipo di campo** di un campo che contiene già dei valori (ad esempio, da Casella di testo a Data) può lasciare i valori inseriti in precedenza in un formato che non corrisponde più al nuovo tipo. Cambia i tipi con attenzione quando il personale ha già iniziato a compilare il campo.
:::

## Eliminare un campo

Apri un campo per modificarlo e fai clic su **Elimina**. Ti verrà chiesto di confermare: *"Sei sicuro di voler eliminare questo campo personalizzato? Anche i valori memorizzati verranno rimossi."* Eliminare un campo lo rimuove in modo permanente **insieme a tutti i valori memorizzati** per esso, per tutte le persone. Questa operazione non può essere annullata.

## Compilare i valori per una persona

Una volta che esiste almeno un campo personalizzato, i suoi valori si trovano accanto ai dati predefiniti nella scheda di ogni persona: li visualizzi insieme ai dati di contatto della persona, sul lato sinistro del suo profilo, e li modifichi nello stesso modulo che usi per il resto delle informazioni della persona. Non compare nulla di aggiuntivo finché non hai definito il primo campo.

1. Apri la scheda di una persona in **Persone**.
2. Fai clic sul pulsante **Modifica** a sinistra del profilo, sotto i dati di contatto della persona.
3. Scorri fino all'area **Campi personalizzati** in fondo al modulo di modifica e inserisci un valore per ogni campo. Ogni campo mostra il controllo corrispondente al suo tipo: un selettore di date per i campi Data, un menu a tendina sì/no per i campi Sì/No, un elenco di scelte per la Scelta multipla e così via.
4. Fai clic su **Salva**. I valori dei tuoi campi personalizzati vengono salvati insieme al resto dei dati della persona.

Tornando al profilo, ogni campo che ha un valore compare sotto i dati di contatto della persona nel formato *Nome campo: valore* (le risposte Sì/No vengono mostrate come *Sì* o *No*, e la Scelta multipla mostra l'etichetta dell'opzione). I campi lasciati vuoti restano semplicemente nascosti. Per rimuovere un valore, modifica la persona, svuota il campo e salva: un valore vuoto viene eliminato dalla scheda invece di essere memorizzato come vuoto.

:::tip
Il caso d'uso classico riguarda la sicurezza dei volontari: crea un campo **Data** chiamato *Verifica precedenti penali scade*, registra la data di ogni volontario, poi crea un [Elenco salvato](../people/lists.md) che segnali chiunque abbia una data già superata.
:::

## Cercare e creare elenchi in base ai campi personalizzati

I campi personalizzati sono completamente ricercabili:

1. Nella pagina **Persone**, apri la [Ricerca avanzata](../people/searching-people.md).
2. Espandi la categoria **Campi personalizzati**.
3. Seleziona il campo su cui vuoi filtrare, scegli un operatore e inserisci un valore. Gli operatori disponibili corrispondono al tipo del campo:
   - **Casella di testo**: contiene, è uguale a, inizia con, finisce con.
   - **Numero intero / Decimale**: è uguale a, maggiore di, maggiore o uguale a, minore di, minore o uguale a.
   - **Data**: è uguale a, successiva a (maggiore di), precedente a (minore di).
   - **Sì/No**: è uguale a Sì o No.
   - **Scelta multipla**: è uguale a o contiene una delle scelte.

Puoi salvare qualsiasi ricerca su campi personalizzati come [Elenco](../people/lists.md). Gli elenchi sono query dinamiche, quindi un elenco creato su *Verifica precedenti penali scade è precedente a oggi* verifica di nuovo ogni persona ogni volta che lo apri, senza bisogno di aggiornamenti manuali.

## Mostrare un campo personalizzato come colonna

Per vedere i valori di un campo per tutti insieme, aggiungilo come colonna nella pagina **Persone**. Imposta **Visualizza come** su **Tabella**, fai clic sull'icona **Seleziona colonne** nell'intestazione della pagina, passa alla scheda **Personalizzati** e seleziona il campo. Il valore di ogni persona compare in una propria colonna accanto a quelle predefinite. Vedi [Mostrare i campi personalizzati come colonne](../people/searching-people.md#showing-custom-fields-as-columns).

## Cosa succede durante l'unione

Quando [unisci due schede persona](../people/adding-people.md), i valori dei campi personalizzati vengono trasferiti automaticamente. La persona che conservi mantiene i propri valori; per ogni campo in cui solo la persona rimossa aveva un valore, quel valore viene copiato, così che nulla vada perso.

## Articoli correlati

- [Cercare persone](../people/searching-people.md): ricerca avanzata, inclusa la categoria Campi personalizzati, e visualizzazione dei campi personalizzati come colonne
- [Elenchi salvati](../people/lists.md): salva una ricerca su campi personalizzati e rieseguila in tempo reale
- [Ruoli e permessi](./roles-permissions.md): chi può definire i campi e modificare i valori
- [Creare moduli](../forms/creating-forms.md): per la raccolta di dati con più domande, quando un intero modulo è più adatto di singoli campi
