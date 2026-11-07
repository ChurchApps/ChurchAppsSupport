---
title: "Sparade listor"
description: "Spara en sökning i People i B1 Admin som en namngiven lista och ladda den igen med ett klick. Listor uppdateras löpande, så nya matchande medlemmar visas automatiskt."
---

# Sparade listor

<div class="article-intro">

**Sparade listor** låter dig spara en sökfråga under ett namn och köra den igen med ett klick när som helst. Skapa en lista en gång, till exempel “Aktiva medlemmar i Campus Nord”, “Besökare under de senaste 90 dagarna” eller valfritt avancerat filter. Listan ligger sedan överst på sidan Personer, så du aldrig behöver bygga upp frågan igen.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Kör minst en sökning i avsnittet Personer så att du har resultat att spara. Se [Söka efter personer](./searching-people.md) eller [AI-sökning](./ai-search.md).

</div>

## Spara en sökning som lista

1. Kör en sökning på sidan **Personer**, antingen en snabbsökning, en AI-sökning eller en sökning med avancerat filter.
2. När resultaten visas syns knappen **Spara som lista** i sidhuvudet för Personer.
3. Klicka på **Spara som lista**.
4. Ange ett **Listnamn** (obligatoriskt).
5. Valfritt: ange en **Kategori** för att gruppera relaterade listor (till exempel “Uppsökande” eller “Medlemskap”).
6. Under **Vem kan se den här listan** väljer du **All personal** eller **Endast jag**.
7. Klicka på **Spara**.

Listan är nu sparad och visas som en knapp i raden med sparade listor överst på sidan Personer, bredvid **Alla**. Listor som är markerade med **Endast jag** visar en liten låsikon.

:::info
Listor som är inställda på **All personal** delas inom hela din församling. Alla med åtkomst till Personer kan se och läsa in dem. Endast personal med rätt behörighet kan ändra eller ta bort listor.
:::

## Läsa in en sparad lista

Klicka på valfritt listnamn överst på sidan Personer. Sökningen körs direkt igen med den sparade frågan och uppdaterar resultaten. Klicka på **Alla** för att gå tillbaka till hela katalogen.

Listor grupperas efter kategori (om du har tilldelat en), och listor utan kategori visas sist.

:::tip
Listor är **levande frågor**, inte ögonblicksbilder. Varje gång du läser in en lista körs sökningen på nytt mot dina aktuella data, så personer som nu uppfyller villkoren visas.
:::

## Byta namn på och ta bort listor

Personal med behörighet att hantera kan byta namn på eller ta bort vilken lista som helst från sidan Personer. Klicka först på listan för att läsa in den. Två ikoner visas då bredvid namnet:

- Klicka på ikonen **Listinställningar** (kugghjul) för att byta namn på listan eller ändra dess kategori, delning och andra inställningar.
- Klicka på ikonen **Ta bort** (papperskorg) för att ta bort listan. Du får då bekräfta.

## Användningsexempel

| Scenario | Så bygger du listan |
|---|---|
| Alla besökare | Avancerad sökning: Medlemsstatus = Besökare |
| Medlemmar på en viss campus | Avancerad sökning: Campus = [din campus] |
| Personer utan e-postadress | Avancerad sökning: E-post är tom |
| Volontärer med utgången bakgrundskontroll | Avancerad sökning: [Anpassat fält](../settings/custom-fields.md) “Bakgrundskontroll går ut” är före idag |
| Resultat från en AI-fråga | Ställ en fråga i AI-sökning och spara sedan |

## Relaterade artiklar

- [Söka efter personer](./searching-people.md) — snabbsökning och anpassning av kolumner
- [AI-sökning](./ai-search.md) — frågor på vanligt språk som du kan spara som listor
- [Anpassade fält](../settings/custom-fields.md) — definiera egna personfält och filtrera och spara listor utifrån dem
- [Demografi](./demographics.md) — gå från ett demografiskt diagram till ett Personer-filter och spara det som en lista
- [Massredigering](./bulk-editing.md) — när du har läst in en lista kan du uppdatera alla dess medlemmar samtidigt
