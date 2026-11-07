---
title: "Planlægning af kalenderen"
description: "Opsæt en ugentlig eller engangsplan i FreePlay Admins kalender til at afspille playlister, gudstjenesteplaner eller udbydermapper på dine skærmgrupper, med standardløkker som reserve."
---

# Planlægning af kalenderen

<div class="article-intro">

Siden **Kalender** i FreePlay Admin styrer, hvad hver skærmgruppe afspiller, og hvornår. Tilføj en plan for en afspilningsliste, en gudstjenesteplan eller en udbydermappe, og indstil den til at gentage sig ugentligt eller afspille én gang. Når intet er planlagt, afspilles gruppens standardloop.

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- Opret mindst én skærmgruppe. Se [Administration af skærme og grupper](./managing-screens.md#screen-groups)
- [Byg en afspilningsliste](./building-playlists.md), eller sørg for, at en plantype er oprettet i B1 Admin

</div>

## Sådan læser du kalenderen

1. Gå til **Kalender**.
2. Vælg en skærmgruppe fra fanerne øverst. Hver fane viser, hvor mange planlagte elementer gruppen har.
3. Ugevisningen går fra mandag til søndag, kl. 6 til kl. 22. En rød linje markerer det aktuelle tidspunkt.
4. Brug pilene til at gå til forrige eller næste uge, eller klik på **I dag** for at vende tilbage til denne uge.

Undertitlen på siden viser den tidszone, kalenderen bruger. Planlagte elementer følger din kirkes tidszone, som du angiver i B1 Admin under [Kirkeoplysninger](../../b1-admin/settings/church-settings.md#time-zone). Hvis din kirke ikke har en tidszone angivet, bruger FreePlay din campus' tidszone. Kalenderen og dine tv'er bruger samme tidszone, så et tidsrum, der er placeret kl. 9:00 i kalenderen, afspilles kl. 9:00 på skærmen, selv hvis din computer er indstillet til en anden tidszone.

Planlagte elementer er farvekodet efter type. En forklaring af farverne findes i en signaturforklaring:

- **Standardloop** - Skraveret baggrund, vist bag alt andet, når gruppen har et standardloop
- **Afspilningsliste**
- **Gudstjenesteplan**
- **Udbydermappe**

Hver blok viser sit navn, og højere blokke viser også tidspunkterne, om den gentages (**ugentligt** eller **én gang**), og hvad der sker, når den slutter tidligt.

## Indstilling af standardloopet

Standardloopet afspilles på gruppens skærme, når intet er planlagt.

1. Klik på **Standardloop…** i headeren på siden **Kalender**. Hvis et standardloop allerede er angivet, viser knappen **Standardloop:** efterfulgt af navnet på afspilningslisten.
2. Vælg en **Afspilningsliste**, eller vælg **Ingen — skærmen bliver mørk**.
3. Klik på **Gem**.

## Tilføjelse af en plan

Der er tre måder at starte en ny plan på:

- Klik på et tomt felt i kalenderen. Formularen åbner med den pågældende dag og halvtime allerede udfyldt.
- Klik på **Tilføj plan** i headeren.
- Vælg **Tilføj plan** fra kommandopaletten (**Ctrl+K** eller **⌘K**).

Udfyld derefter formularen:

1. **Afspil** - Vælg, hvad der skal afspilles:
   - **Afspilningslister** - Alle afspilningslister, du har bygget
   - **Gudstjenesteplaner** - En plantype fra B1 Admin, markeret med **(aktuel plan)**. Skærmen afspiller den plan, der er aktuel for plantypen hver uge, inklusive Go Curriculum-lektioner (også tilpassede), som bruger det Go-login, der er knyttet til plantypens menighed
   - **Udbydermappe…** - Åbner **Vælg en udbydermappe**. Gennemse til en mappe og klik på **Brug denne mappe**. For at vælge en anden mappe senere, klik på **Skift**
2. **Gentages** - Vælg de ugedage, hvor planen skal afspilles. For en enkelt dato i stedet, slå **Én gang** til og vælg **Dato**.
3. **Start** og **Slut** - De tidspunkter, planen starter og stopper.
4. **Hvis den slutter tidligt** - Hvad der skal ske, når indholdet er brugt op før sluttidspunktet:
   - **Gentag indtil sluttidspunktet** - Starter forfra. Godt til skiltningsloops, meddelelser og nedtællinger
   - **Lærerstyret** - Slides venter på lærerens fjernbetjening. Lektionen bliver stående efter sluttidspunktet, indtil den sidste slide
   - **Afspil én gang, og gå derefter tilbage til standardloopet**
5. For gentagne planer skal du indstille **Starter** til den første dato. Under **Slutter** vælger du **Aldrig** eller **På dato** og indtaster en **Slutdato**.
6. Klik på **Gem**.

:::info
**Lærerstyret** erstattede den ældre indstilling "fasthold sidste slide". Planer, der er gemt med den indstilling, afspilles nu som lærerstyret.
:::

## Redigering eller sletning af en plan

1. Klik på planens blok i kalenderen.
2. Ændr et felt og klik på **Gem**, eller klik på **Slet** for at fjerne planen.

## Overlappende planer

Hvis to planer overlapper hinanden, viser formularen en advarsel: **Overlapper med en anden plan. Den, der starter senere, vinder.** Mens den senere plan kører, afspiller skærmene den. Når den slutter, vender de tilbage til den tidligere plan, hvis den stadig kører.

## Sådan henter skærme ændringer

Parrede skærme downloader alt, der er planlagt for de næste 7 dage, og de tjekker selv for ændringer. Du behøver ikke røre ved tv'et, efter du har redigeret kalenderen. For at se, hvornår en skærm har alt, den behøver, tjek **Klar til og med** på [Skærme-siden](./managing-screens.md).

## Relaterede artikler

- **[Byg afspilningslister](./building-playlists.md)** - Opret de afspilningslister, du planlægger
- **[Planlagt afspilning på tv'et](./scheduled-playback.md)** - Sådan fungerer lærerstyrede lektioner og fjernbetjeningen på tv'et
- **[Administration af skærme og grupper](./managing-screens.md)** - Tilføj grupper og tjek hver skærms downloads
- **[Behold kun en del af hver lektion](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Beskær alle planlagte lektioner i en plantype til de dele, dit lokale afspiller
