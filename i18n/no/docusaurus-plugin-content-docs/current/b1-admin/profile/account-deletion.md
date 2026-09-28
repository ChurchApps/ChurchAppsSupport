---
title: "Gjennomgang av slettingsforespørsler for konto"
---

# Gjennomgang av slettingsforespørsler for konto

<div class="article-intro">

Når en kirke har en Directory Approval Group konfigurert, skjer kontoslettingen ikke lenger umiddelbart — en medlems forespørsel blir en oppgave som godkjenningsgruppen din gjennomgår før noe blir fjernet. Denne siden forklarer hvordan forespørselen gjøres, hvordan du godkjenner eller avslår den, og hva som skjer i hvert tilfelle.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- En **Directory Approval Group** må være konfigurert under **Mobil &rarr; Medlemsportal**. Uten en vil klikking på **Slett kontoen min** på profilsiden fortsatt slette kontoen umiddelbart, uten gjennomgangstrinn. Se [Innstillinger for mobilapp](../settings/mobile-app.md).
- Å godkjenne eller avslå en forespørsel krever **Folk &gt; Rediger**-tillatelse.

</div>

## Hvordan et medlem ber om sletting

Kontosletting bes om fra siden **Min profil** — samme delte kontosiden som er omtalt i [Administrering av profilen din](./managing-profile.md) — under delen **Kontosletting**. Når en godkjenningsgruppe er konfigurert, bekrefter forespørselen ikke sletter noe med en gang. I stedet gjør det:

1. Oppretter en åpen oppgave med tittelen **"Slettingsforespørsel for konto"**, tildelt Directory Approval Group, under **Serving &rarr; Min arbeidsliste**.
2. Deaktiverer **Slett kontoen min**-knappen for denne personen og viser en beskjed om at forespørselen venter på gjennomgang.

Hvis du sender en ny forespørsel mens en allerede er åpen, åpner det bare samme oppgave på nytt — en person kan bare ha én ventende slettingsforespørsel om gangen.

## Gjennomgang av en forespørsel

1. Gå til **Serving &rarr; Min arbeidsliste** (eller **Tildelt mine grupper** på instrumentbordet ditt, samme sted som [profilendringer-forespørsler](./approving-profile-changes.md) vises).
2. Åpne oppgaven med tittelen **"Slettingsforespørsel for konto fra *Navn*"**.
3. Du vil se to handlinger: **Godkjenn sletting** og **Avslå**.

### Godkjenning

Bekreft **"Anonymiser denne personens oppføring permanent og fjern påloggingen? Dette kan ikke angres."** Dette erstatter personens personlige informasjon med generiske verdier (samme anonymisering som brukes av handlingen **Datahåndtering &gt; Anonymiser** på en persons oppføring — se [Datasikkerhet](../settings/data-security.md)) og fjerner påloggingen. Oppgaven lukkes automatisk, og medlemmet varsles om at forespørselen ble godkjent.

### Avslåing

Å avslå krever en grunn, fordi GDPR tillater bare å nekte en slettingsforespørsel av juridiske grunner:

- **Juridisk oppbevaring** (donasjoner, skatter eller ansettelsesoppføringer)
- **Nødvendig for et juridisk krav**
- **Annet** — forklar i tekstboksen (minst 10 tegn)

Medlemmet varsles om avgjørelsen sammen med grunnen du oppga, og kan sende inn forespørselen på nytt eller eskalere til en tilsynsmyndighet hvis de er uenige.

:::info
Kirker har 30 dager på seg til å svare på en slettingsforespørsel. Oppgaven forfaller om 28 dager, og godkjenningsgruppen får automatiske påminnelser hvis den fremdeles er åpen etter 21 og 27 dager.
:::

:::tip
Slettings- og profilendringer-forespørsler bruker samme Directory Approval Group og samme oppgavebaserte gjennomgangsflyt — se [Godkjenning av profilendringer](./approving-profile-changes.md) hvis du også må gjennomgå oppdateringsforespørsler for katalogen.
:::

## Relaterte artikler

- [Administrering av profilen din](./managing-profile.md) — Hvor medlemmer ber om sletting av egen konto
- [Godkjenning av profilendringer](./approving-profile-changes.md) — Lignende gjennomgangsflyt for oppdateringsforespørsler i katalogen
- [Datasikkerhet](../settings/data-security.md) — GDPR-samsvar og anonymisering initiert av administrator
- [Innstillinger for mobilapp](../settings/mobile-app.md) — Konfigurering av Directory Approval Group
