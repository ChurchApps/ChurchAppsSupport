---
title: "Vejledning: Opsætning af begivenhedsregistrering"
---

# Opsætning af begivenhedsregistrering

<div class="article-intro">

Opret en begivenhedsregistreringsformular, saml deltageroplysninger og valgfri betalinger, integrer den på dit kirkewebsted, og administrer indsendelser, når de kommer ind. Til sidst vil du have en deleligt registreringsside for enhver kirkebgivenhed.

</div>

:::info
**To måder at håndtere begivenhedsregistrering:** Denne vejledning dækker **formularbaseret registrering**, som giver dig fuld kontrol over brugerdefinerede felter og betalingindsamling. For enklere begivenheder, hvor du kun skal spore, hvem der kommer, skal du bruge **indfødt begivenhedsregistrering** bygget ind i kalenderen -- se [Oprettelse af kalendere](../calendars/creating-calendars.md#enabling-event-registration) for opsætningsinstruktioner. Indfødt registrering lader medlemmer tilmelde sig direkte fra [B1-webstedet](../../b1-church/events/registering) og [mobilappen](../../b1-mobile/events/registering) med kapacitetssporing, datovindue og e-mailbekræftelser.
:::

<div class="prereqs">
<h4>Før du starter</h4>

- B1 Admin-konto med administratoradgang
- For at indsamle betalinger: [Stripe skal være konfigureret](../donations/online-giving-setup.md) først

</div>

## Trin 1: Opret en selvstændig formular

Selvstændige formularer har deres eget offentlige URL, som hvem som helst kan få adgang til -- perfekt til begivenhedsregistrering.

Følg vejledningen [Oprettelse af formularer](../forms/creating-forms.md) for at:

1. Gå til Formularer og klik Tilføj formular
2. Vælg "Selvstændig" type -- dette giver din formular sit eget offentlige URL
3. Navngiv det efter begivenheden (f.eks. "Mænds tilbagetrækning registrering", "VBS tilmeldelse")

## Trin 2: Tilføj spørgsmål

Byg de felter, du skal bruge for at indsamle fra tilmeldingsdeltagere.

Følg vejledningen [Oprettelse af formularer](../forms/creating-forms.md#adding-questions) for at tilføje dine spørgsmål:

1. Gå til fanen Spørgsmål og tilføj felter til de oplysninger, du skal bruge: navn, email, telefon, diætbegrænsninger, T-shirt-størrelse, nødsituationen kontakt osv.
2. Brug flere valg til muligheder som måltidspræferencer eller session-valg

:::warning
Betalingsfelttypeen kræver, at Stripe er konfigureret. Hvis du ikke har opsat online giving endnu, skal du se [Online Giving Setup](../donations/online-giving-setup.md), før du tilføjer betalingsfelter.
:::

## Trin 3: Konfigurer formularindstillinger

Kontroller, hvornår og hvordan din registreringsformular er tilgængelig.

1. Indstil tilgængelighedsdatoer, hvis registreringen kun skal være åben i en begrænset tid
2. Kopier det offentlige URL -- du kan dele dette direkte
3. Tilføj formularmedlemmer med Admin- eller Kun visning-roller for at hjælpe med at administrere indsendelser

## Trin 4: Integrer på dit websted

Gør registreringsformularen nemt at finde ved at tilføje den til dit kirkewebsted.

Følg vejledningen [Styring af sider](../website/managing-pages.md) for at:

1. I din B1-websteditor skal du tilføje en ny sektion til en side og vælge Form-elementet
2. Vælg din registreringsformular fra listen

:::tip
Del URL'et blandt også via e-mail, sociale medier og kirkebulleter -- jo flere steder det er synligt, desto flere tilmeldinger får du.
:::

## Trin 5: Administrer indsendelser

Spor registreringer, når de kommer ind, og eksportér data, når du har behov for det.

Følg vejledningen [Styring af indsendelser](../forms/managing-submissions.md) for at:

1. Gennemse svar, når de kommer ind på fanen Indsendelser
2. Eksportér til CSV for regneark, headcount-sporing eller deling med begivenhedkoordinatorer

## Du er færdig!

Din begivenhedsregistrering er live. Del linket, integrer det på dit websted, og spor tilmeldinger fra B1 Admin. Når begivenheden er slut, eksportér finallisten til dine records.

## Relaterede artikler

- [Oprettelse af formularer](../forms/creating-forms.md) -- byg formularer med forskellige felttyper
- [Styring af indsendelser](../forms/managing-submissions.md) -- gennemgå og eksportér formularresponser
- [Styring af sider](../website/managing-pages.md) -- integrer formularer på dit websted
- [Online Giving Setup](../donations/online-giving-setup.md) -- påkrævet for betalingsfelter
