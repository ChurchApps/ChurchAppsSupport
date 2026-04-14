---
title: "Veiledning: Sett opp hendelsesregistrering"
---

# Sett opp hendelsesregistrering

<div class="article-intro">

Opprett et registreringsskjema for hendelser, samle informasjon om deltakere og valgfrie betalinger, embed det på nettstedet ditt, og administrer innleveringer når de kommer inn. På slutten vil du ha en delbar registreringsside for enhver kirkehendelse.

</div>

:::info
**To måter å håndtere hendelsesregistrering:** Denne veiledningen dekker **skjemabasert registrering**, som gir deg full kontroll over egendefinerte felt og betalingsinnsamling. For enklere hendelser der du bare må spore hvem som kommer, bruk **innebygd hendelsesregistrering** som er innebygd i kalenderen -- se [Opprettelse av kalendere](../calendars/creating-calendars.md#enabling-event-registration) for oppsettsanvisninger. Innebygd registrering lar medlemmer melde seg på direkte fra [B1-nettstedet](../../b1-church/events/registering) og [mobilappen](../../b1-mobile/events/registering) med kapasitetssporing, datovinduet og e-postbekreftelser.
:::

<div class="prereqs">
<h4>Før du begynner</h4>

- B1 Admin-konto med administrasjonstilgang
- For å samle betalinger: [Stripe må være konfigurert](../donations/online-giving-setup.md) først

</div>

## Trinn 1: Opprett et frittstående skjema

Frittstående skjemaer har sin egen offentlige URL som alle kan få tilgang til -- perfekt for hendelsesregistrering.

Følg veiledningen [Opprettelse av skjemaer](../forms/creating-forms.md) for å:

1. Gå til Skjemaer og klikk Legg til skjema
2. Velg "Frittstående" type -- dette gir skjemaet ditt sin egen offentlige URL
3. Navngi det etter hendelsen (f.eks. "Registrering av mennenes retirett", "VBS-påmelding")

## Trinn 2: Legg til spørsmål

Bygg ut feltene du trenger for å samle inn fra deltakere.

Følg veiledningen [Opprettelse av skjemaer](../forms/creating-forms.md#adding-questions) for å legge til spørsmålene dine:

1. Gå til Spørsmål-fanen og legg til felt for informasjonen du trenger: navn, e-post, telefon, kostholdsrestriksjoner, T-skjortstørrelse, nødkontakt osv.
2. Bruk Flervalg for alternativer som måltidsvalg eller sesjonvalg

:::warning
Betalingsfelttypen krever at Stripe er konfigurert. Hvis du ikke har satt opp nettgiving ennå, se [Nettgivingsoppsett](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Trinn 3: Konfigurer skjemainnstillinger

Kontroller når og hvordan registreringsskjemaet ditt er tilgjengelig.

1. Angi tilgjengelighetsdatoer hvis registreringen bare skal være åpen for en begrenset tid
2. Kopier den offentlige URL-adressen -- du kan dele denne direkte
3. Legg til skjemamedlemmer med Admin- eller Bare visning-roller for å hjelpe til med å administrere innleveringer

## Trinn 4: Embed på nettstedet ditt

Gjør registreringsskjemaet enkelt å finne ved å legge det til på kirkens nettsted.

Følg veiledningen [Håndtering av sider](../website/managing-pages.md) for å:

1. I B1 nettstedsredigereren, legg til en ny del til en side og velg Form-elementet
2. Velg registreringsskjemaet fra listen

:::tip
Del den frittstående URL-adressen via e-post, sosiale medier og kirkebulletiner også -- jo flere steder den er synlig, jo flere påmeldinger får du.
:::

## Trinn 5: Administrer innleveringer

Spor registreringer når de kommer inn og eksporter data når du trenger det.

Følg veiledningen [Håndtering av innleveringer](../forms/managing-submissions.md) for å:

1. Gjennomgå svar når de kommer inn på Innleveringer-fanen
2. Eksporter til CSV for regneark, persontelling eller deling med hendelseskoordinatorer

## Du er ferdig!

Hendelsesregistreringen din er live. Del lenken, embed den på nettstedet ditt og spor påmeldinger fra B1 Admin. Når hendelsen er over, eksporter den endelige listen for posteriteten.

## Relaterte artikler

- [Opprettelse av skjemaer](../forms/creating-forms.md) -- bygg skjemaer med ulike felttyper
- [Håndtering av innleveringer](../forms/managing-submissions.md) -- gjennomgå og eksporter skjemaresponser
- [Håndtering av sider](../website/managing-pages.md) -- embed skjemaer på nettstedet
- [Nettgivingsoppsett](../donations/online-giving-setup.md) -- nødvendig for betalingsfelt
