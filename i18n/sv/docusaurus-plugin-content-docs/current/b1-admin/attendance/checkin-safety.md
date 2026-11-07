---
title: "Säkerhet vid incheckning"
description: "Konfigurera barnsäkerhet i B1 Admin: rumskapacitet, volontärbemanning, listor över betrodda hämtare och sms som kallar på föräldrar vid incheckning."
---

# Säkerhet vid incheckning

<div class="article-intro">

B1 innehåller en uppsättning barnsäkerhetsfunktioner för incheckning: kapacitetsgränser för rum och förhållandet mellan volontärer och barn, ålders- och årskursvägledning vid kiosken, incheckningstyper som skiljer medlemmar, gäster och volontärer åt, samt en lista över betrodda upphämtningspersoner per hushåll som verifieras vid utcheckning. Den här sidan beskriver hur du konfigurerar varje säkerhetsfunktion i B1 Admin.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Konfigurera din [närvarostruktur](setup.md) och dina [incheckningskiosker](check-in.md)
- Rum är [grupper](../groups/creating-groups.md) kopplade till gudstjänsttider. Säkerhetsinställningarna nedan finns på gruppen.
- Att meddela en förälder och sändningar av nödmeddelanden kräver en ansluten leverantör för sms, till exempel [Text In Church](../integrations/services/text-in-church.md), [Clearstream](../integrations/services/clearstream.md) eller Mutual Ministry

</div>

## Rumskapacitet och att stänga ett rum

Varje rum för incheckning (grupp) kan tillämpa egna gränser. Öppna gruppen, klicka på **Redigera** för att ändra dess inställningar och hitta avsnittet **Kapacitet för incheckning**:

- **Kapacitet** -- Det största antal personer som kan vara incheckade i rummet samtidigt. När rummet är fullt blockeras incheckning dit, och kiosken anger vilket rum som är fullt.
- **Gästkapacitet** -- En valfri separat gräns för hur många gäster rummet kan ta emot.
- **Stängt för incheckning** -- Välj **Ja** för att omedelbart stoppa all incheckning till rummet, till exempel när en lektion ställs in eller ett rum inte är tillgängligt. Utcheckning fungerar fortfarande.

## Volontärsförhållanden

Samma avsnitt **Kapacitet för incheckning** på gruppen innehåller bemanningsregler:

- **Barn per volontär** -- Det största antal barn som varje incheckad volontär kan ansvara för (till exempel innebär 5 att en volontär har fem barn).
- **Minsta antal volontärer** -- Det lägsta antal volontärer som måste vara incheckade innan barn kan checka in i rummet.

Volontärer räknas in i dessa regler när de checkar in med typen **Volontär** vid kiosken (se [Incheckningstyper](#check-in-types) nedan).

### Välja varning eller blockering

Hur strikt förhållandena tillämpas är en inställning för hela församlingen:

1. I B1 Admin går du till **Inställningar** och öppnar avsnittet **Incheckning**.
2. Ställ in **Tillämpning av volontärförhållande**:
   - **Varna (tillåt med bekräftelse)** -- Kiosken visar en varning när ett rum har för högt förhållande eller understiger minsta antal volontärer, och en personal kan bekräfta för att ändå fortsätta. Detta är standardinställningen.
   - **Blockera (förhindra incheckning)** -- Incheckning till rummet nekas tills tillräckligt många volontärer är incheckade.

:::info
Kapacitet och Stängt för incheckning är alltid hårda gränser. Valet mellan varning och blockering gäller endast volontärförhållanden.
:::

## Incheckningstyper

Varje incheckning registrerar om personen är en **medlem**, **gäst** eller **volontär**. Typen väljs med knappar på kioskens hushållsskärm (medlem är standard). Typerna styr säkerhetsreglerna: volontärer ger täckning enligt förhållandet, och gäster räknas mot rummets gästkapacitet.

## Vägledning om ålder och årskurs för rum

Du kan ange ålders- eller årskursgränser för varje rum så att kiosken guidar familjer till lämpliga rum:

- Använd avsnittet **Ålder och årskurs** i gruppens inställningar för att ange lägsta och högsta ålder (år och månader) och/eller årskurs för rummet.
- Vid kiosken markeras de rum som barnet kvalificerar sig för, och de rum som barnet inte kvalificerar sig för tonas ned. Ett nedtonat rum kan ändå väljas efter bekräftelse från personal. Vägledningen blockerar aldrig helt.

Årskurser byts vid din församlings **datum för årskursflytt**:

1. I B1 Admin går du till **Inställningar** och öppnar avsnittet **Årskursflytt**.
2. Ange månad och dag när din församling flyttar elever upp en årskurs (till exempel 1 augusti). Ålder och årskurs vid kiosken beräknas från det senaste flyttdatumet.

## Betrodda och ej godkända upphämtningspersoner

Varje hushåll kan ha en lista över personer som får eller inte får hämta dess barn.

1. Öppna en persons sida under **Personer** och hitta kortet **Upphämtning**.
2. Klicka på **Lägg till**. Sök efter en befintlig person, eller lägg till någon som inte finns i systemet genom att ange **Namn**, **Relation** och ett foto.
3. Ange **Status**:
   - **Betrodd** -- Vid utcheckning visas den här personen som ett kort för upphämtning som kan tryckas på, med foto, vilket gör verifierad upphämtning snabb.
   - **Ej godkänd** -- Om någon försöker hämta barn under det här namnet blockerar kiosken utcheckningen med en varning. En personal kan åsidosätta blockeringen, och åsidosättandet registreras på närvarorapporten.

Klicka på en persons statusknapp på kortet för att växla mellan Betrodd och Ej godkänd.

:::tip
Lägg till foton för betrodda upphämtningspersoner när det är möjligt. Skärmen för utcheckning visar fotot, så volontärer kan visuellt verifiera personen som står framför dem.
:::

## Meddela förälder och nödsändning

Båda funktionerna skickar textmeddelanden via församlingens anslutna leverantör för sms. Det finns ingen inbyggd smstjänst, så en av de stödda leverantörerna måste konfigureras först.

- **Meddela en förälder** -- Från kioskens utcheckningsskärm, när den är bemannad, kan personal skicka ett sms till ett incheckat barns föräldrar eller vårdnadshavare (till exempel "Var snäll och kom till spädbarnsrummet").
- **Nödsändning** -- Från kioskens admininställningar kan personal skicka ett sms till vårdnadshavare i alla incheckade hushåll för den valda gudstjänsten samtidigt. För att skicka krävs att du skriver **NÖDLÄGE** för att bekräfta.

Personer som har avstått från sms, eller som saknar registrerat mobilnummer, hoppas över automatiskt. Kiosken visar hur många meddelanden som skickades och hur många som hoppades över.

Se genomgången från kioskens sida i [Utcheckning och barnsäkerhet](../../b1-checkin/check-in/checking-out.md).

## Relaterade artiklar

- [Incheckning](check-in.md) — konfiguration av kiosk och hårdvara
- [Utcheckning och barnsäkerhet](../../b1-checkin/check-in/checking-out.md) — utcheckning vid kiosken, verifiering av upphämtning och flöden för att meddela
- [Skapa grupper](../groups/creating-groups.md) — där rumsinställningarna finns
- [Installation av närvaro](setup.md) — gudstjänster, gudstjänsttider och rumstilldelning
- [Lägsta ålder för privata meddelanden](../settings/mobile-app.md#member-directory--messaging-settings) — blockerar nya privata meddelandekonversationer med barn samtidigt som de finns kvar i katalogen
