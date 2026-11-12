---
title: "Veiledning: Sett opp påmelding til arrangementer"
description: "Sett opp et påmeldingsskjema i B1 Admin for å samle inn opplysninger om deltakere og eventuelle betalinger, bygg det inn på menighetens nettsted, og følg påmeldingene."
---

# Sett opp påmelding til arrangementer

<div class="article-intro">

Opprett et påmeldingsskjema til arrangementer, samle inn opplysninger om deltakerne og eventuelle betalinger, bygg det inn på menighetens nettsted, og administrer innsendingene etter hvert som de kommer inn. Når du er ferdig, har du en påmeldingsside du kan dele for alle arrangementer i menigheten.

</div>

:::info
**To måter å håndtere påmelding til arrangementer på:** Denne veiledningen dekker **skjemabasert påmelding** – et frittstående skjema med sin egen offentlige lenke, egendefinerte spørsmål og et valgfritt betalingsfelt. For et arrangement i kalenderen din kan du i stedet bruke **påmelding til arrangementer** som er innebygd i kalenderen – se [Opprette kalendere](../calendars/creating-calendars.md#enabling-event-registration). Der kan medlemmer melde seg på direkte fra [B1.church eller B1-appen](../../b1-church/events/registering.md), med kapasitetsgrenser, åpnings- og stengingsdatoer, venteliste, valgfrie påmeldingsspørsmål fra et skjema og prissatte deltakertyper (se [Betalte påmeldinger](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administratortilgang
- For å ta imot betalinger: [Stripe må være konfigurert](../donations/online-giving-setup.md) først

</div>

## Steg 1: Opprett et frittstående skjema {#step-1-create-a-stand-alone-form}

Frittstående skjemaer har sin egen offentlige nettadresse som alle kan åpne – perfekt for påmelding til arrangementer.

Følg veiledningen [Opprette skjemaer](../forms/creating-forms.md) for å:

1. I [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) velger du **People > Forms** og klikker **Add Form**
2. Gi det navnet etter arrangementet (f.eks. «Menn-retreat påmelding», «VBS-påmelding»)
3. I **Associate With** velger du **Stand Alone** – dette gir skjemaet sin egen offentlige nettadresse
4. Klikk **Save**

## Steg 2: Legg til spørsmål {#step-2-add-questions}

Bygg opp feltene du trenger å samle inn fra deltakerne.

Følg veiledningen [Opprette skjemaer](../forms/creating-forms.md#adding-questions) for å legge til spørsmålene dine:

1. Åpne skjemaet, gå til fanen **Questions**, og klikk **Add Question** for hver opplysning du trenger: navn, e-post, telefon, kosthensyn, T-skjortestørrelse, nødkontakt osv.
2. Bruk **Multiple Choice** for alternativer som måltidsønsker eller valg av samlinger
3. For å ta inn et gebyr legger du til et **Payment**-spørsmål og velger **Fund** og **Amount**

:::warning
Feltypen Payment krever at Stripe er konfigurert. Hvis du ikke har satt opp nettbasert giving ennå, se [Oppsett av nettbasert giving](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Steg 3: Konfigurer skjemainnstillingene {#step-3-configure-form-settings}

Styr når og hvordan påmeldingsskjemaet er tilgjengelig. Følg avsnittet [Konfigurere skjemaegenskaper](../forms/creating-forms.md#configuring-form-properties) for å:

1. Klikk **Edit Form** og, hvis påmeldingen bare skal være åpen en begrenset tid, sett **Set Form Availability Timeframe** til **Yes** og velg start- og sluttdato
2. Kopier den **offentlige nettadressen** som vises på venstre side av skjemasiden – den kan du dele direkte. Klikk **QR Code** ved siden av skjemaet på listen over Forms for å laste ned en QR-kode til løpesedler og lysbilder
3. På fanen **Form Members** legger du til personer som **Admin** eller **View Only** for å hjelpe til med å administrere innsendingene, og slår på **Email Notification** for alle som skal få e-post om hver ny påmelding

## Steg 4: Bygg det inn på menighetens nettsted {#step-4-embed-on-your-website}

Gjør påmeldingsskjemaet lett å finne ved å legge det til på menighetens nettsted.

Følg veiledningen [Sidebygger](../website/page-editor.md) for å:

1. Åpne en side i B1-nettstedsredigeringen og klikk **Add Content**
2. Dra elementet **Form** inn i en seksjon og velg påmeldingsskjemaet ditt

:::tip
Del også den frittstående nettadressen via e-post, sosiale medier og menighetens bulletin – jo flere steder den er synlig, desto flere påmeldinger får du.
:::

## Steg 5: Administrer innsendinger {#step-5-manage-submissions}

Følg påmeldingene etter hvert som de kommer inn, og eksporter data når du trenger det.

Følg veiledningen [Administrere innsendinger](../forms/managing-submissions.md) for å:

1. Gå gjennom svarene etter hvert som de kommer inn på fanen **Form Submissions**
2. Klikk **Export** for å laste ned en CSV-fil til regneark, oppfølging av antall deltakere eller deling med arrangementskoordinatorer

## Ferdig! {#youre-done}

Påmeldingen til arrangementet ditt er åpen. Del lenken, bygg den inn på nettstedet ditt, og følg påmeldingene fra B1 Admin. Når arrangementet er over, eksporter den endelige listen til arkivet ditt.

## Relaterte artikler {#related-articles}

- [Opprette skjemaer](../forms/creating-forms.md) — bygg skjemaer med ulike feltyper
- [Administrere innsendinger](../forms/managing-submissions.md) — gjennomgå og eksporter svar på skjemaer
- [Sidebygger](../website/page-editor.md) — bygg inn skjemaer på nettstedet ditt
- [Oppsett av nettbasert giving](../donations/online-giving-setup.md) — kreves for betalingsfelt
