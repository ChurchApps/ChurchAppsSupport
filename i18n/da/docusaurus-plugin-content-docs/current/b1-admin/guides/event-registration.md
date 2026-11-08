---
title: "Guide: Opsæt tilmelding til begivenheder"
description: "Opsæt en tilmeldingsformular til begivenheder i B1 Admin for at indsamle deltageroplysninger og eventuelle betalinger, indlejre den på din kirkes hjemmeside og følge tilmeldinger."
---

# Opsæt tilmelding til begivenheder

<div class="article-intro">

Opret en tilmeldingsformular til begivenheder, indsaml deltageroplysninger og eventuelle betalinger, indlejr den på din kirkes hjemmeside, og håndter indsendelser, efterhånden som de kommer ind. Til sidst har du en delbar tilmeldingsside til enhver kirkebegivenhed.

</div>

:::info
**To måder at håndtere tilmelding til begivenheder på:** Denne vejledning dækker **formularbaseret tilmelding**, som giver dig fuld kontrol over tilpassede felter og indsamling af betalinger. Til enklere begivenheder, hvor du blot skal holde styr på, hvem der kommer, kan du bruge **indbygget tilmelding til begivenheder** i kalenderen -- se [Opret kalendere](../calendars/creating-calendars.md#enabling-event-registration) for opsætningsvejledning. Indbygget tilmelding gør det muligt for medlemmer at tilmelde sig direkte fra [B1.church eller B1 App](../../b1-church/events/registering.md) med kapacitetsopfølgning, datovinduer og e-mailbekræftelser.
:::

<div class="prereqs">
<h4>Før du begynder</h4>

- B1 Admin-konto med administratoradgang
- Til indsamling af betalinger: [Stripe skal være konfigureret](../donations/online-giving-setup.md) først

</div>

## Trin 1: Opret en selvstændig formular

Selvstændige formularer har deres egen offentlige URL, som alle kan tilgå. Det er perfekt til tilmelding til begivenheder.

Følg vejledningen [Opret formularer](../forms/creating-forms.md) for at:

1. Gå til Formularer og klik på Tilføj formular
2. Vælg typen "Stand Alone" -- det giver din formular sin egen offentlige URL
3. Giv den et navn efter begivenheden (f.eks. "Mændenes retræte-tilmelding", "VBS-tilmelding")

## Trin 2: Tilføj spørgsmål

Opbyg de felter, du skal indsamle fra deltagerne.

Følg vejledningen [Opret formularer](../forms/creating-forms.md#adding-questions) for at tilføje dine spørgsmål:

1. Gå til fanen Spørgsmål og tilføj felter til de oplysninger, du har brug for: navn, e-mail, telefon, kostrestriktioner, T-shirtstørrelse, nødkontakt osv.
2. Brug Flervalg til valgmuligheder som måltidspræferencer eller sessionsvalg

:::warning
Felttypen Betaling kræver, at Stripe er konfigureret. Hvis du endnu ikke har opsat online-giving, se [Opsætning af online-giving](../donations/online-giving-setup.md), før du tilføjer betalingsfelter.
:::

## Trin 3: Konfigurer formularindstillinger

Styr, hvornår og hvordan din tilmeldingsformular er tilgængelig.

1. Angiv tilgængelighedsdatoer, hvis tilmeldingen kun skal være åben i en begrænset periode
2. Kopiér den offentlige URL -- du kan dele den direkte
3. Tilføj formularmedlemmer med rollerne Admin eller Kun visning for at hjælpe med at håndtere indsendelser

## Trin 4: Indlejr på din hjemmeside

Gør det nemt at finde tilmeldingsformularen ved at tilføje den til din kirkes hjemmeside.

Følg vejledningen [Administrer sider](../website/managing-pages.md) for at:

1. Tilføj en ny sektion til en side i din B1-webstededitor, og vælg elementet Formular
2. Vælg din tilmeldingsformular fra listen

:::tip
Del også den selvstændige URL via e-mail, sociale medier og kirkens ugeblade -- jo flere steder den er synlig, desto flere tilmeldinger får du.
:::

## Trin 5: Håndter indsendelser

Følg tilmeldinger, efterhånden som de kommer ind, og eksportér data, når du har brug for det.

Følg vejledningen [Håndter indsendelser](../forms/managing-submissions.md) for at:

1. Gennemgå svar, efterhånden som de kommer ind, under fanen Indsendelser
2. Eksportér til CSV til regneark, optælling af deltagere eller deling med eventkoordinatorer

## Du er færdig!

Din tilmelding til begivenheden er nu aktiv. Del linket, indlejr det på din hjemmeside, og følg tilmeldinger fra B1 Admin. Når begivenheden er slut, eksportér den endelige liste til dine arkiver.

## Relaterede artikler

- [Opret formularer](../forms/creating-forms.md) — byg formularer med forskellige felttyper
- [Håndter indsendelser](../forms/managing-submissions.md) — gennemgå og eksportér formularsvar
- [Administrer sider](../website/managing-pages.md) — indlejr formularer på din hjemmeside
- [Opsætning af online-giving](../donations/online-giving-setup.md) — kræves for betalingsfelter
