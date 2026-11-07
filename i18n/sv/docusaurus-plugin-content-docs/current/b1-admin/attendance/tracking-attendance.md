---
title: "Spåra närvaro"
description: "Granska närvarotrender, filtrera rapporter efter campus, gudstjänst eller grupp och exportera gruppnärvaro från sidan Närvaro i B1 Admin."
---

# Spåra närvaro

<div class="article-intro">

När dina campus, gudstjänsttider och grupper är konfigurerade gör B1 Admin det enkelt att granska närvarodata och upptäcka trender. Sidan Attendance öppnas med en sammanfattning av denna veckas närvaro, och dess **All years**-rapporter erbjuder två huvudvyer: fliken **Attendance Trend** för kyrkoövergripande trender och fliken **Group Attendance** för detaljer på gruppnivå. Använd dessa verktyg för att förstå tillväxtmönster, identifiera minskat engagemang och fatta datadrivna beslut för din kyrka.

</div>

<div class="prereqs">
<h4>Innan du börjar</h4>

- Din närvarostruktur måste vara konfigurerad med minst ett campus och en gudstjänsttid. Se [Närvarokonfiguration](setup.md) om du inte har gjort detta än.
- Närvarodata måste registreras innan rapporterna visar några resultat. Data kan komma från [manuell inmatning](recording-attendance.md) eller [självincheckning](check-in.md).

</div>

## Visa närvarotrender

1. Öppna **B1 Admin**, öppna [Hoppmenyn](../introduction.md#getting-around-with-the-jump-menu) (sökfältet överst till vänster), expandera **People** och klicka på **Attendance**.
2. Klicka på **All years** i vänster kolumn. Fliken **Attendance Trend** är vald som standard.
3. Rapporten körs automatiskt när fliken öppnas och visar totalt antal närvarande för varje vecka.

:::tip
För en snabb överblick över innevarande vecka visar huvudsidan Attendance hur många personer som är i lokalen denna vecka, en uppdelning per rum (grupp), eventuella gäster samt ett stapeldiagram över incheckningar för de senaste 13 veckorna. Ingen rapport behövs.
:::

## Filtrera dina data

Använd filtren i rutan **Filter Report** för att avgränsa resultaten och klicka sedan på **Run Report**:

- **Campus** – välj ett campus för att se närvaron endast på den platsen.
- **Service** – begränsa rapporten till en gudstjänst.
- **Service Time** – välj en gudstjänsttid för att fördjupa dig i en viss samling.
- **Group** – visa närvaron för en enskild grupp.
- **Start Date** och **End Date** – datumintervallet som ska inkluderas. Som standard täcker rapporten det senaste året, från ett år sedan till idag, och slutdatumet inkluderas helt.

Rapporten visar ett stapeldiagram och en tabell med totala besök per vecka. Varje vecka märks med datumet för den veckans söndag. Tabellen har också en kolumn **Session Dates** som listar de faktiska datumen i veckan då det fanns närvaro (till exempel "9/27, 9/30"), så att du kan se när en sammankomst mitt i veckan räknas till samma vecka som söndagen.

:::info
Rapporterna körs automatiskt varje gång du öppnar fliken Attendance Trend, så du ser alltid aktuella siffror utan att behöva klicka på någon uppdateringsknapp.
:::

## Gruppnärvaro

Fliken **Group Attendance** visar vem som deltog i varje gruppsession. Detta är användbart när du vill följa upp en viss klass, ett ministerieteam eller en smågrupp i stället för de övergripande gudstjänstsiffrorna.

1. På rapporterna under **All years** väljer du fliken **Group Attendance**.
2. Välj eventuellt ett **Campus** och en **Service**.
3. Ange **Start Date** och **End Date**. Som standard täcker rapporten från förra söndagen till idag.
4. Klicka på **Run Report**.

Resultaten grupperas efter sessionsdatum, sedan efter gudstjänsttid och grupp, med de personer som deltog listade under varje grupp. Gudstjänsttider, grupper och namn sorteras alfabetiskt så att varje rubrik bara visas en gång. Varje persons rad visar dessutom en kolumn **Checked In** med tidpunkten då närvaron registrerades (tom om ingen tid finns sparad) och en kolumn **Membership Status** (till exempel Member eller Visitor), så att du lätt ser gäster.

För att ladda ner data klickar du på **Download Options** och väljer **Summary**. CSV-filen har en rad per gruppmedlem, sorterad efter grupp och sedan namn, och en kolumn för varje daterad session i intervallet (till exempel "Sunday - 9:00 AM (2026-09-27)") märkt **present** eller **absent**.

:::tip
Gruppnärvaro är särskilt värdefull för [smågruppsledare](../groups/creating-groups.md) som vill följa engagemanget i sin grupp över tid.
:::

## Tips för att använda närvarodata

- Granska trender varje månad för att fånga säsongsmönster tidigt.
- Jämför data på campusnivå för att förstå vilka platser som växer.
- Använd rapporter på gruppnivå för att följa upp [grupper](../groups/group-members.md) med minskande närvaro.
- Kombinera närvaroinsikter med verktyget [AI Search](../people/ai-search.md) för att hitta personer som inte har närvarat nyligen.

## Relaterade sidor

- [Registrera närvaro](recording-attendance.md) – registrera närvaro manuellt för en gruppsession
- [Headcount Entry & Trend](headcount-entry.md) – ett enklare alternativ med endast totalantal och en egen veckotrendgraf
- [Incheckning](check-in.md) – ställ in självincheckning så att närvaron registreras automatiskt
