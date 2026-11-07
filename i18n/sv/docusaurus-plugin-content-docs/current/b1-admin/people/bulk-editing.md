---
title: "Massredigera personer"
---

# Massredigera personer

<div class="article-intro">
Med massredigering kan du uppdatera flera personer samtidigt, vilket sparar tid när samma ändring ska göras för många. Du kan uppdatera medlemsstatus, civilstatus, kön, avregistreringsinställningar för katalogen och gruppmedlemskap i en enda åtgärd.
</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Du behöver behörighet att hantera personuppgifter. Se [Roller och behörigheter](./roles-permissions.md) för mer information.
- Du bör redan ha lagt till eller importerat de personer du vill redigera. Se [Lägga till personer](./adding-people.md) vid behov.
</div>

## Välja personer för massredigering

1. Gå till **Personer** i B1 Admin
2. Använd sökningen eller filterverktygen för att hitta de personer du vill uppdatera
3. Markera kryssrutorna för att välja personer
   - I vyn **Hushåll** väljs alla i ett hushåll när du markerar hushållet
   - I vyn **Tabell** (byt med växlaren **Visa som**) kan du välja personer enskilt
   - Du kan också använda kryssrutan ovanför listan för att välja alla synliga personer
4. När du har valt minst en person visar fältet ovanför listan hur många som är valda, tillsammans med knapparna **Rensa val** och **Åtgärder**

:::tip
Om du behöver uppdatera en stor grupp personer utifrån särskilda kriterier kan du använda funktionen [AI-sökning](./ai-search.md) eller filter för att först begränsa listan och sedan välja alla personer som matchar.
:::

## Tillgängliga massåtgärder

Menyn **Åtgärder** innehåller flera alternativ:

### Uppdatera medlemsstatus

Uppdatera medlemsstatus för alla valda personer:

1. Klicka på **Åtgärder** → **Ange medlemsstatus**
2. Välj den nya statusen:
   - **Besökare** -- Förstagångsbesökare eller tillfälliga besökare
   - **Gäst** -- Gäster, till exempel familjer som registrerats vid en incheckningskiosk
   - **Regelbunden deltagare** -- Återkommande deltagare som inte är medlemmar
   - **Medlem** -- Officiella medlemmar i församlingen
   - **Personal** -- Anställda i församlingen
   - **Inaktiv** -- Personer som inte längre deltar
   - **Avliden** -- Personer som har avlidit
3. Välj uppdateringsläge:
   - **Skriv över alla** -- Ersätt den nuvarande statusen för alla valda personer
   - **Uppdatera endast tomma** -- Ange statusen endast för personer som inte har någon
4. Klicka på **Uppdatera**

### Uppdatera civilstatus

Uppdatera civilstatus i bulk:

1. Klicka på **Åtgärder** → **Ange civilstatus**
2. Välj den nya statusen:
   - **Okänd**
   - **Ogift**
   - **Gift**
   - **Skild**
   - **Änka/Änkling**
3. Välj om befintliga värden ska skrivas över eller om endast tomma fält ska uppdateras
4. Klicka på **Uppdatera**

### Uppdatera kön

Uppdatera könsinformation för flera personer:

1. Klicka på **Åtgärder** → **Ange kön**
2. Välj värdet:
   - **Ej angivet**
   - **Man**
   - **Kvinna**
3. Välj uppdateringsläge (skriv över alla eller endast tomma)
4. Klicka på **Uppdatera**

### Uppdatera avregistrering från katalogen

Styr om personer har avregistrerat sig från kommunikation:

1. Klicka på **Åtgärder** → **Ange avregistrering från katalog**
2. Välj:
   - **Nej** -- Tillåt kommunikation (ta bort avregistreringen)
   - **Ja** -- Blockera kommunikation (registrera avregistreringen)
3. Välj uppdateringsläge
4. Klicka på **Uppdatera**

:::warning
Var försiktig när du ändrar avregistreringsstatus. Personer som uttryckligen har avregistrerat sig bör inte få kommunikation om de inte har gett nytt samtycke.
:::

### Ange anpassat fält

Ange ett Ja/Nej-värde för ett [anpassat fält](../settings/custom-fields.md) för alla valda personer samtidigt:

1. Klicka på **Åtgärder** → **Ange anpassat fält**.
2. Välj det anpassade Ja/Nej-fält du vill ange.
3. Välj värdet (**Ja** eller **Nej**) som ska tillämpas.
4. Klicka på **Uppdatera**.

:::info
Endast anpassade Ja/Nej-fält är tillgängliga för denna massåtgärd. Om du vill ange andra fälttyper redigerar du varje person enskilt.
:::

### Lägg till i grupp

Lägg till alla valda personer i en eller flera grupper:

1. Klicka på **Åtgärder** → **Lägg till i grupp**
2. Sök efter och välj de grupper du vill lägga till personerna i
3. Du kan välja flera grupper och lägga till personerna i alla
4. Klicka på **Lägg till i grupper**

Varje person läggs till som vanlig medlem i de valda grupperna. Du kan senare göra enskilda personer till gruppledare från sidan [Gruppmedlemmar](../groups/group-members.md).

### Ta bort från grupp

Ta bort alla valda personer från en eller flera grupper:

1. Klicka på **Åtgärder** → **Ta bort från grupp**
2. Sök efter och välj de grupper du vill ta bort personerna från
3. Du kan välja flera grupper
4. Klicka på **Ta bort från grupper**

:::info
Åtgärden tar bara bort personerna från de angivna grupperna. Den raderar inte deras personposter.
:::

### Radera personer

Radera de valda personerna permanent från din församlings databas:

1. Klicka på **Åtgärder** → **Radera**
2. Dialogrutan **Radera valda personer** ber dig bekräfta hur många personer som kommer att raderas
3. Klicka på **Radera**

:::danger
Att radera personer är permanent och kan inte ångras. Alla deras uppgifter tas bort, inklusive:
- Personuppgifter
- Gruppmedlemskap
- Närvaroregistreringar
- Gåvohistorik
- Formulärsvar

Använd endast denna åtgärd om du är helt säker på att du vill ta bort dessa personer från systemet.
:::

## Resultat av massredigering

När en massåtgärd är klar visas en sammanfattning med:

- **Totalt valda** -- Hur många personer som ingick i åtgärden
- **Uppdaterades** -- Hur många poster som ändrades
- **Misslyckades** -- Poster som inte kunde uppdateras (om tillämpligt)
- **Oförändrade** -- Poster som inte behövde ändras (till exempel när läget "uppdatera endast tomma" används)

Om några uppdateringar misslyckades visas felinformation som förklarar varför.

## Bästa praxis

- **Börja smått** -- Testa massåtgärder på några få poster först för att försäkra dig om att du gör rätt ändringar
- **Använd filter** -- Begränsa listan med filter eller AI-sökning innan du väljer personer, så att du bara uppdaterar rätt personer
- **Kontrollera urvalet två gånger** -- Gå igenom de valda personerna innan du tillämpar massändringar
- **Använd läget "uppdatera endast tomma"** -- När du vill fylla i saknade uppgifter utan att skriva över befintlig information
- **Dokumentera större ändringar** -- För anteckningar om massuppdateringar så att du kan titta tillbaka på dem senare
- **Samordna med ditt team** -- Låt övriga administratörer veta när du gör stora massändringar

## Vanliga användningsfall

### Uppdatera nya medlemmar

Efter en medlemskurs uppdaterar du alla deltagare till medlemsstatus:

1. Sök efter de personer som deltog i kursen
2. Välj alla
3. Använd **Åtgärder** → **Ange medlemsstatus** → **Medlem**

### Organisera smågrupper

Lägg till flera personer i en ny smågrupp:

1. Sök efter de personer du vill ha med i gruppen
2. Välj dem
3. Använd **Åtgärder** → **Lägg till i grupp** och välj smågruppen

### Städa upp data

Fyll i saknad civilstatus för gifta par:

1. Filtrera på personer som är gifta (med hjälp av hushållsinformation)
2. Välj de som har tom civilstatus
3. Använd **Åtgärder** → **Ange civilstatus** → **Gift** → **Uppdatera endast tomma**

## Relaterade artiklar

- [Söka efter personer](./searching-people.md) -- Hitta personer att redigera
- [AI-sökning](./ai-search.md) -- Använd naturligt språk för att hitta specifika grupper av personer
- [Gruppmedlemmar](../groups/group-members.md) -- Hantera gruppmedlemskap
- [Exportera data](./exporting-data.md) -- Exportera personuppgifter innan du gör massändringar
