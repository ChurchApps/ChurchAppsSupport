---
title: "Veiledning: Sett opp arrangementspåmelding"
description: "Sett opp et påmeldingsskjema for arrangementer i B1 Admin for å samle inn deltakeropplysninger og eventuelle betalinger, bygg det inn på menighetens nettside og følg med på påmeldingene."
---

# Sett opp arrangementspåmelding

<div class="article-intro">

Lag et påmeldingsskjema for arrangementer, samle inn deltakeropplysninger og eventuelle betalinger, bygg skjemaet inn på menighetens nettside, og håndter påmeldinger etter hvert som de kommer inn. Når du er ferdig, har du en delbar påmeldingsside for alle menighetens arrangementer.

</div>

:::info
**To måter å håndtere arrangementspåmelding på:** Denne veiledningen dekker **skjemabasert påmelding**, som gir deg full kontroll over egendefinerte felt og innsamling av betalinger. For enklere arrangementer der du bare trenger å holde oversikt over hvem som kommer, kan du bruke **innebygd arrangementspåmelding** i kalenderen. Se [Opprette kalendere](../calendars/creating-calendars.md#enabling-event-registration) for oppsettsinstruksjoner. Med innebygd påmelding kan medlemmer melde seg på direkte fra [B1.church eller B1 App](../../b1-church/events/registering.md), med kapasitetsoversikt, datovinduer og e-postbekreftelser.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administratortilgang
- For innsamling av betalinger: [Stripe må være konfigurert](../donations/online-giving-setup.md) først

</div>

## Steg 1: Lag et frittstående skjema

Frittstående skjemaer har sin egen offentlige nettadresse som alle kan åpne, og er derfor perfekte for arrangementspåmelding.

Følg veiledningen [Opprette skjemaer](../forms/creating-forms.md) for å:

1. Gå til Skjemaer og klikk på Legg til skjema
2. Velg typen «Frittstående». Da får skjemaet sin egen offentlige nettadresse
3. Gi skjemaet et navn etter arrangementet (for eksempel «Påmelding til menns retreat» eller «Påmelding til ferieskole»)

## Steg 2: Legg til spørsmål

Bygg opp feltene du trenger å samle inn fra deltakerne.

Følg veiledningen [Opprette skjemaer](../forms/creating-forms.md#adding-questions) for å legge til spørsmålene dine:

1. Gå til fanen Spørsmål og legg til felt for informasjonen du trenger: navn, e-post, telefon, kosthensyn, T-skjortestørrelse, nødkontakt osv.
2. Bruk Flervalg for alternativer som måltidspreferanser eller valg av økter

:::warning
Feltet for betaling krever at Stripe er konfigurert. Hvis du ikke har satt opp nettbasert giving ennå, se [Oppsett av nettbasert giving](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Steg 3: Konfigurer skjemainnstillinger

Bestem når og hvordan påmeldingsskjemaet skal være tilgjengelig.

1. Angi tilgjengelighetsdatoer hvis påmeldingen bare skal være åpen i en begrenset periode
2. Kopier den offentlige nettadressen. Du kan dele den direkte
3. Legg til skjemamedlemmer med rollen Admin eller Kun visning for å hjelpe til med å håndtere påmeldinger

## Steg 4: Bygg det inn på nettsiden din

Gjør det enkelt å finne påmeldingsskjemaet ved å legge det til på menighetens nettside.

Følg veiledningen [Administrere sider](../website/managing-pages.md) for å:

1. I redigeringsverktøyet for din B1-nettside legger du til en ny seksjon på en side og velger elementet Skjema
2. Velg påmeldingsskjemaet ditt fra listen

:::tip
Del også den frittstående nettadressen via e-post, sosiale medier og kirkeblader. Jo flere steder den er synlig, desto flere påmeldinger får du.
:::

## Steg 5: Håndter påmeldinger

Følg med på påmeldingene etter hvert som de kommer inn, og eksporter data når du trenger det.

Følg veiledningen [Håndtere innsendinger](../forms/managing-submissions.md) for å:

1. Gjennomgå svarene etter hvert som de kommer inn, på fanen Innsendinger
2. Eksporter til CSV for regneark, opptelling av deltakere eller deling med arrangementskoordinatorer

## Ferdig!

Påmeldingen til arrangementet er nå aktiv. Del lenken, bygg den inn på nettsiden din, og følg med på påmeldingene fra B1 Admin. Når arrangementet er over, eksporterer du den endelige listen for arkivet ditt.

## Relaterte artikler

- [Opprette skjemaer](../forms/creating-forms.md) — bygg skjemaer med ulike feltyper
- [Håndtere innsendinger](../forms/managing-submissions.md) — gjennomgå og eksporter skjemasvar
- [Administrere sider](../website/managing-pages.md) — bygg inn skjemaer på nettsiden din
- [Oppsett av nettbasert giving](../donations/online-giving-setup.md) — kreves for betalingsfelt
