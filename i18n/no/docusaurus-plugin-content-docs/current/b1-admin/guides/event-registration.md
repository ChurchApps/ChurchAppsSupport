---
title: "Guide: Sett opp arrangementspåmelding"
---

# Sett opp arrangementspåmelding

<div class="article-intro">

Lag et påmeldingsskjema for arrangementer, samle inn deltakerinformasjon og valgfrie betalinger, bygg det inn på menighetens nettside, og administrer innsendinger etter hvert som de kommer inn. Til slutt vil du ha en delbar påmeldingsside for ethvert menighetsarrangement.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administratortilgang
- For å samle inn betalinger: [Stripe må konfigureres](../donations/online-giving-setup.md) først

</div>

## Trinn 1: Lag et frittstående skjema

Frittstående skjemaer har sin egen offentlige URL som alle kan få tilgang til — perfekt for arrangementspåmelding.

Følg guiden [Lage skjemaer](../forms/creating-forms.md) for å:

1. Gå til Skjemaer og klikk Legg til skjema
2. Velg typen "Stand Alone" — dette gir skjemaet sin egen offentlige URL
3. Gi det navn etter arrangementet (f.eks. "Påmelding mannskap-retreat", "VBS-påmelding")

## Trinn 2: Legg til spørsmål

Bygg ut feltene du trenger for å samle inn informasjon fra deltakerne.

Følg guiden [Lage skjemaer](../forms/creating-forms.md#adding-questions) for å legge til spørsmålene dine:

1. Gå til Spørsmål-fanen og legg til felt for informasjonen du trenger: navn, e-post, telefon, kostholdsbehov, t-skjortestørrelse, nødkontakt, osv.
2. Bruk Flervalg for alternativer som måltidspreferanser eller sesjonsvalg

:::warning
Felttypen Betaling krever at Stripe er konfigurert. Hvis du ikke har satt opp nettgiving ennå, se [Oppsett av nettgiving](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Trinn 3: Konfigurer skjemainnstillinger

Kontroller når og hvordan påmeldingsskjemaet er tilgjengelig.

1. Sett tilgjengelighetsdatoer hvis påmeldingen bare skal være åpen i en begrenset periode
2. Kopier den offentlige URL-en — du kan dele denne direkte
3. Legg til skjemamedlemmer med Administrator- eller Kun visning-roller for å hjelpe med å håndtere innsendinger

## Trinn 4: Bygg inn på nettsiden din

Gjør påmeldingsskjemaet enkelt å finne ved å legge det til på menighetens nettside.

Følg guiden [Administrere sider](../website/managing-pages.md) for å:

1. I B1-nettstedsredigereren, legg til en ny seksjon på en side og velg Skjema-elementet
2. Velg påmeldingsskjemaet ditt fra listen

:::tip
Del den frittstående URL-en via e-post, sosiale medier og menighetsblader også — jo flere steder det er synlig, desto flere påmeldinger får du.
:::

## Trinn 5: Administrer innsendinger

Spor påmeldinger etter hvert som de kommer inn og eksporter data når du trenger det.

Følg guiden [Administrere innsendinger](../forms/managing-submissions.md) for å:

1. Gjennomgå svar etter hvert som de kommer inn i Innsendinger-fanen
2. Eksporter til CSV for regneark, deltakerregistrering eller deling med arrangementskoordinatorer

## Du er ferdig!

Arrangementspåmeldingen din er aktiv. Del lenken, bygg den inn på nettsiden din, og spor påmeldinger fra B1 Admin. Når arrangementet er over, eksporter den endelige listen for arkivene dine.

## Relaterte artikler

- [Lage skjemaer](../forms/creating-forms.md) — bygg skjemaer med ulike felttyper
- [Administrere innsendinger](../forms/managing-submissions.md) — gjennomgå og eksporter skjemasvar
- [Administrere sider](../website/managing-pages.md) — bygg inn skjemaer på nettsiden din
- [Oppsett av nettgiving](../donations/online-giving-setup.md) — nødvendig for betalingsfelt
