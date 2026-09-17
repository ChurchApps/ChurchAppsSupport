---
title: "Gjennomgang av forespørsler om kontosletting"
---

# Gjennomgang av forespørsler om kontosletting

<div class="article-intro">

Når en kirke har en Directory Approval Group konfigurert, skjer kontosletting ikke lenger øyeblikkelig -- en medlems forespørsel blir en oppgave som godkjenningsgruppen din gjennomgår før noe blir fjernet. Denne siden forklarer hvordan forespørselen blir gjort, hvordan du godkjenner eller avslår den, og hva som skjer i hvert tilfelle.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En **Directory Approval Group** må være konfigurert under **Mobilapp &rarr; Medlemsportal**. Uten en, vil klikking på **Slett kontoen min** på profilsiden fortsatt slette kontoen umiddelbart, uten gjennomgangstrinn. Se [Innstillinger for mobilapp](../settings/mobile-app.md).
- Godkjenning eller avslag av en forespørsel krever tillatelsen **People &gt; Rediger**.

</div>

## Hvordan et medlem ber om sletting

Kontosletting er forespurt fra siden **Min profil** -- den samme delte kontosiden omtalt i [Administrering av profilen din](./managing-profile.md) -- under delen **Kontosletting**. Når en godkjenningsgruppe er konfigurert, sletter bekreftelse av forespørselen ikke noe umiddelbart. I stedet:

1. Opprettes en åpen oppgave med tittelen **«Forespørsel om kontosletting»**, tildelt Directory Approval Group, under **Serving &rarr; Oppgaver**.
2. Deaktiveres **Slett kontoen min**-knappen for denne personen og vises en melding om at forespørselen venter gjennomgang.

Innsending av en andre forespørsel mens en allerede er åpen, gjenåpner bare den samme oppgaven -- en person kan bare ha én ventende slettingsforespørsel av gangen.

## Gjennomgang av en forespørsel

1. Gå til **Serving &rarr; Oppgaver** (eller **Tildelt til mine grupper** på dashbordet ditt, samme sted som [forespørsler om profilendringer](./approving-profile-changes.md) vises).
2. Åpne oppgaven med tittelen **«Forespørsel om kontosletting fra *Navn*»**.
3. Du vil se to handlinger: **Godkjenn sletting** og **Avslå**.

### Godkjenning

Bekreft **«Anonymiser denne personens oppføring permanent og fjern påloggingen deres? Dette kan ikke angres.»** Dette erstatter personens personlige informasjon med generiske verdier (samme anonymisering brukt av handlingen **Datakontroll &gt; Anonymiser** på en persons oppføring -- se [Datasikkerhet](../settings/data-security.md)) og fjerner påloggingen deres. Oppgaven lukkes automatisk, og medlemmet varsles om at forespørselen deres ble godkjent.

### Avslag

Avslag krever en grunn, fordi GDPR tillater bare å nekte en slettingsforespørsel av juridiske grunner:

- **Juridisk oppbevaring** (donasjoner, skatter eller ansettelsesoppføringer)
- **Nødvendig for et rettslig krav**
- **Annet** -- forklar i tekstboksen (minst 10 tegn)

Medlemmet varsles om avgjørelsen sammen med grunnen du ga, og kan sende forespørselen på nytt eller eskalere til en tilsynsmyndighet hvis de er uenige.

:::info
Kirker har 30 dager til å svare på en slettingsforespørsel. Oppgaven forfaller om 28 dager, og godkjenningsgruppen får automatiske påminnelser hvis oppgaven fortsatt er åpen etter 21 og 27 dager.
:::

:::tip
Slettings- og profilendringer-forespørsler bruker samme Directory Approval Group og samme oppgavebaserte gjennomgangsflyt -- se [Godkjenning av profilendringer](./approving-profile-changes.md) hvis du også trenger å gjennomgå katalogoppdateringsforespørsler.
:::

## Relaterte artikler

- [Administrering av profilen din](./managing-profile.md) -- Der medlemmer ber om sletting av sin egen konto
- [Godkjenning av profilendringer](./approving-profile-changes.md) -- Den lignende gjennomgangsflytenen for katalogoppdateringsforespørsler
- [Datasikkerhet](../settings/data-security.md) -- GDPR-samsvar og admin-initiert anonymisering
- [Innstillinger for mobilapp](../settings/mobile-app.md) -- Konfigurering av Directory Approval Group
