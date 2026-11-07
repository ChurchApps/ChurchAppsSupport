---
title: "Begivenhedspåmindelser"
description: "Opsæt begivenhedspåmindelser i B1 Admin via push, e-mail og sms med valg af tidspunkt, modtagere og egen besked, så folk får besked i tide."
---

# Begivenhedspåmindelser

<div class="article-intro">

Begivenhedspåmindelser sender automatisk besked til de rigtige personer, før en begivenhed finder sted -- for eksempel "Gå ikke glip af det! Sundhedsworkshoppen starter i morgen kl. 9:00." Du konfigurerer en påmindelse én gang på begivenheden, og B1 sender den afsted til tiden via pushnotifikationer, e-mail og, hvis din menighed har sms opsat, tekstbeskeder. Medlemmer kan selv styre, hvilke påmindelser de modtager, under deres egne [Notifikationsindstillinger](../../b1-church/getting-started/notification-preferences.md).

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Opret den begivenhed, du vil minde folk om (se [Oprettelse af kalendere](./creating-calendars.md))
- For at nå tilmeldte deltagere skal du [aktivere tilmelding](./creating-calendars.md) på begivenheden
- For at nå en hel gruppe skal du sikre, at begivenheden hører til en [gruppe](../groups/creating-groups.md) med medlemmer

</div>

## Opsætning af en påmindelse

Du konfigurerer påmindelser i afsnittet **Påmindelser** på begivenheden.

- Når du **opretter en ny begivenhed**, skal du udvide afsnittet **Påmindelser** i begivenhedseditoren, før du gemmer.
- For en **eksisterende begivenhed** skal du åbne begivenhedens side **Tilmeldingsdetaljer** (fra afsnittet **Tilmeldinger**) for at tilføje eller ændre påmindelsen.

1. Slå **Aktiver påmindelser** til.
2. Vælg **Hvornår** der skal sendes. Vælg op til tre tidspunkter: **7 dage før**, **3 dage før**, **1 dag før** og **På dagen**.
3. Angiv **Klokkeslæt** for, hvornår påmindelsen skal sendes (standard er **9:00**, i din menigheds [tidszone](../settings/church-settings.md#time-zone)).
4. Vælg **Hvem** der skal mindes (se [Hvem der får påmindelsen](#who-gets-reminded) nedenfor).
5. Tilføj eventuelt en **Besked**. Lad feltet være tomt for at bruge standardteksten, eller skriv din egen -- du kan bruge `{{eventTitle}}`, som bliver erstattet med begivenhedens navn.
6. Vælg **Kanaler**: **Push**-notifikation, **E-mail** og, hvis din menighed har en [sms-udbyder](../settings/church-settings.md#texting) tilsluttet, **Tekstbesked**.
7. Gem begivenheden.

Mens du foretager ændringer, viser en **live-forhåndsvisning** cirka, hvor mange der får en påmindelse, hvor mange deltagere der ikke kan nås, og de næste planlagte afsendelsestidspunkter -- så du kan kontrollere, at påmindelsen ser rigtig ud, før du gemmer.

## Hvem der får påmindelsen

Indstillingen **Hvem** styrer, hvem påmindelsen sendes til:

- **Kun tilmeldte** -- Alle, der er tilmeldt begivenheden, og som er knyttet til en personpost. Dette er standard, når begivenheden har tilmelding aktiveret, så en påmindelse til en lille tilmeldt begivenhed aldrig ved en fejl går til en hel gruppe.
- **Hovedtilmeldte / kun tilmeldte** -- Én påmindelse pr. tilmelding (den person, der tilmeldte sig), i stedet for til hver familiemedlem på tilmeldingen.
- **Gruppemedlemmer** -- Alle i begivenhedens gruppe. Dette er standard, når begivenheden ikke bruger tilmelding.
- **Automatisk** -- Bruger tilmeldte, når tilmelding er aktiveret, ellers gruppen.

:::info
Gæster, der kun er tilføjet med navn (uden tilknyttet personpost), kan ikke modtage en påmindelse, fordi der ikke findes en konto, enhed eller e-mailadresse at sende til. Forhåndsvisningen fortæller dig, hvor mange deltagere der falder i denne gruppe, så der ikke kommer overraskelser. Medlemmer, der har fravalgt kommunikation, springes også over.
:::

## Hvornår påmindelser sendes

- Påmindelser sendes på det **klokkeslæt, du har valgt**, i din menigheds lokale tidszone, for hvert af de forskudte tidspunkter, du har valgt.
- Hvis du **ændrer begivenhedens dato eller tidspunkt**, bliver de ventende påmindelser automatisk flyttet -- du behøver ikke redigere påmindelsen.
- Hvis du **sletter begivenheden** (eller annullerer en enkelt forekomst af en gentagende begivenhed), annulleres dens ventende påmindelser automatisk.
- Gentagne begivenheder håndteres automatisk: hver kommende forekomst får sin egen påmindelse.

:::tip
Påmindelser sendes **først som push, med e-mail som reserve**. Hvis et medlem har pushnotifikationer aktiveret, får de en push; ellers får de en e-mail i stedet. Medlemmer vælger selv, hvilke kanaler de vil have for hver notifikationstype, under deres [Notifikationsindstillinger](../../b1-church/getting-started/notification-preferences.md).
:::

## Tekstpåmindelser

Kanalen **Tekstbesked** vises kun, når din menighed har en sms-udbyder tilsluttet. Tekstbeskeder sendes via din menigheds sms-udbyder, og hver tekstbesked kan koste menigheden penge. De sendes ud over eventuelle push- eller e-mailpåmindelser, og kun til personer, der:

- Har slået **Tekstbeskeder** til i deres [Notifikationsindstillinger](../../b1-church/getting-started/notification-preferences.md), og
- Har et mobilnummer på deres profil.

Hver tekstbesked starter med din menigheds navn, holdes inden for én sms, og slutter med "Svar STOP for at framelde." Den, der svarer STOP, holder op med at modtage tekstbeskeder fra din menighed. For at STOP-svar kan nå B1, skal du indsætte **Inbound (STOP) webhook-URL'en** fra dine [sms-indstillinger](../settings/church-settings.md#texting) i din udbyders webhook for indkommende beskeder.

## Hvad medlemmer kan styre

Påmindelser respekterer altid hvert medlems [Notifikationsindstillinger](../../b1-church/getting-started/notification-preferences.md). Et medlem kan:

- Slå **Begivenhedspåmindelser** fra for push, e-mail eller tekst, mens andre notifikationer forbliver slået til.
- Slå tekstpåmindelser til eller fra med **Tekstbeskeder**.
- Angive **stille timer**, så ikke-hastende notifikationer venter til et passende tidspunkt.

Du kan ikke tilsidesætte et medlems valg om at framelde sig begivenhedspåmindelser -- dette sikrer, at B1 overholder antispam-regler, og at medlemmer har kontrol over deres indbakke.

## Tjenestepåmindelser

Frivillige, der er planlagt på en plan, modtager en separat **tjenestepåmindelse** med plandetaljerne og, hvis de endnu ikke har svaret, knapperne **Accepter / Afslå** direkte i e-mailen. Disse påmindelser konfigureres på plantypen i stedet for på en kalenderbegivenhed, og de kan også sendes som tekstbesked -- se [Frivilligpåmindelser](../serving/plans.md#volunteer-reminders) og [Søndagsfrivillige](../guides/sunday-volunteers.md) for, hvordan planlægning af frivillige og påmindelser fungerer.

## Næste skridt

- [Notifikationsindstillinger](../../b1-church/getting-started/notification-preferences.md) -- Hvad medlemmer kan styre
- [Guide til begivenhedstilmelding](../guides/event-registration.md) -- Opsæt tilmelding, så påmindelser kan nå deltagerne
- [Oprettelse af kalendere](./creating-calendars.md) -- Tilbage til kalenderopsætning
