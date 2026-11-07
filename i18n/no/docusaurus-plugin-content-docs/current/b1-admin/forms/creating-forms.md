---
title: "Opprette skjemaer"
description: "Lag egne skjema i B1 Admin for arrangementspåmelding, undersøkelser og besøkskort, og del dem via lenke, QR-kode eller utskrift."
---

# Opprette skjemaer

<div class="article-intro">

Lag egendefinerte skjemaer for å samle inn opplysninger fra menigheten. Du kan lage skjemaer for arrangementspåmeldinger, undersøkelser, besøkskort, medlemskapssøknader og mer. Skjemaer kan knyttes til personer i databasen din, eller brukes som frittstående sider med sin egen offentlige nettadresse.

</div>

## Opplæringsvideo

<YouTube id="sr9wxEj9ghQ" title="Opprette skjemaer og håndtere innsendinger i B1" />

<div class="prereqs">
<h4>Før du begynner</h4>

- For skjemaer for **personer** (knyttet til personposter) må du først ha [personer i databasen din](../people/adding-people.md).
- For skjemaer som tar imot **betalinger**, må [Stripe være konfigurert for nettbasert giving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer** og klikk **Skjemaer**.
2. Klikk **Legg til skjema**.
3. Skriv inn et **navn** for skjemaet.
4. Velg skjematype i nedtrekkslisten **Knytt til**:
   - **Personer** — Knytter innsendinger til [personposter](../people/adding-people.md) i databasen din. Skjemaer for personer fylles ut fra en persons post, så de får ingen lenke som kan deles.
   - **Frittstående** — Oppretter et uavhengig skjema med sin egen offentlige nettadresse, ideelt for eksterne påmeldinger. Bare frittstående skjemaer tilbyr et [overskriftsbilde](#adding-a-header-photo), en [QR-kode](#sharing-a-form-with-a-qr-code), en [koblet gruppe](#linking-a-form-to-a-group) og **Opprett personpost fra innsendinger**.
5. Klikk **Lagre** for å opprette skjemaet.

Det nye skjemaet vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema {#printing-a-blank-form}

Trenger du en papirkopi å dele ut -- for eksempel et besøkskort ved velkomstdisken, eller et skjema noen uten internettilgang kan fylle ut for hånd? Klikk **Skriv ut** ved siden av et skjema på hovedlisten over skjemaer for å åpne en forhåndsvisning, og klikk deretter **Skriv ut**. Tomme felt skrives ut med en understrek eller avkrysningsboks for hvert spørsmål, slik at folk kan fylle dem ut for hånd. Obligatoriske spørsmål er merket med en stjerne. Øverst på siden vises kirkens logo (**logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en), med kirkens navn under, og deretter skjemaets navn. Det finnes ingen andre utskriftsalternativer -- du skriver ut hele skjemaet eller ingenting.

## Dele et skjema med en QR-kode {#sharing-a-form-with-a-qr-code}

Frittstående skjemaer har en lenke **QR-kode** ved siden av seg på hovedlisten over skjemaer (arkiverte skjemaer har ikke dette). Klikk på den for å åpne en QR-kode for skjemaets offentlige nettadresse, med lenken vist under. Klikk **Last ned PNG** for å lagre koden som et bilde du kan skrive ut på kirkebladet eller vise på lysbilder. Den som skanner den, åpner skjemaet på telefonen sin.

## Legge til spørsmål {#adding-questions}

1. Åpne skjemaet ditt og gå til fanen **Spørsmål**.
2. Klikk **Legg til spørsmål**.
3. Velg en **feltype** i nedtrekkslisten Leverandør. Tilgjengelige typer inkluderer:
   - **Tekstboks** — For korte tekstsvar
   - **Dato** — For datovalg
   - **E-post** — For e-postadresser
   - **Telefonnummer** — For telefonnummer
   - **Flervalg** — For valg fra forhåndsdefinerte alternativer
   - **Betaling** — For å ta imot betalinger
4. Skriv inn en **tittel** og eventuelt en **beskrivelse** for spørsmålet. Beskrivelsen vises under spørsmålet når folk fyller ut skjemaet, så bruk den til hjelpetekst som «Ta med eventuelle allergier vi bør vite om».
5. Kryss av for **Krev svar** hvis feltet er obligatorisk.
6. Klikk **Lagre**.
7. Gjenta for å legge til flere spørsmål.

:::warning
Feltypen **Betaling** krever at Stripe er konfigurert. Hvis du ikke har satt opp nettbasert giving ennå, se [Oppsett for nettbasert giving](../donations/online-giving-setup.md) før du legger til betalingsfelt. Personer som betaler på et skjema uten å logge inn, må krysse av for **Jeg er ikke en robot** før kortet blir godtatt.
:::

## Administrere skjemamedlemmer {#managing-form-members}

1. Åpne skjemaet ditt og gå til fanen **Skjemamedlemmer**.
2. Søk etter en person og legg dem til med en rolle:
   - **Administrator** — Kan redigere skjemaet og se alle innsendinger.
   - **Kun visning** — Kan se innsendinger, men kan ikke redigere skjemaet.

## Koble et skjema til en gruppe {#linking-a-form-to-a-group}

Du kan koble et hvilket som helst frittstående skjema til en gruppe -- for eksempel et bønneskjema for en smågruppe, eller en medisinsk samtykkeerklæring for en ungdomstur:

1. Åpne skjemaets **Detaljer**.
2. Under **Koblet gruppe** velger du gruppen, eller lar den stå på **Ingen**.
3. Klikk **Lagre**.

Når et skjema er koblet:

- **Gruppemedlemmer** ser skjemaet i en seksjon for **Skjemaer** på gruppens side på B1.church mens skjemaet er åpent, med en knapp for **Fyll ut** som åpner det (se [Gruppedetaljer](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppeledere** ser også stengte skjemaer, og kan lese svarene på alle innsendinger og skrive dem ut (én innsending eller **Skriv ut alle**). Ledere kan bare se svarene -- de kan ikke redigere skjemaet med mindre de også er [skjemamedlemmer](#managing-form-members).
- **I B1 Admin** viser gruppens side en seksjon for **Koblede skjemaer** som lister opp hvert koblet skjema som **Åpent** eller **Stengt**. Den vises for gruppens ledere og for personer som kan administrere skjemaer. Se [Gruppemedlemmer](../groups/group-members.md#linked-forms).

Et skjema er stengt når det er utenfor tidsrommet det er tilgjengelig. Arkiverte skjemaer vises ikke på gruppesiden.

### Legge innsendere til en gruppe automatisk {#automatically-adding-submitters-to-a-group}

Å koble et skjema til en gruppe legger ikke til noen av seg selv. For å legge alle innsendere til gruppens medlemsliste, slår du også på **Opprett personpost fra innsendinger** i skjemaets detaljer og klikker **Lagre**.

Hver gang noen sender inn skjemaet, legges den matchede eller nyopprettede personen til i gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for ting som et leirpåmeldingsskjema som automatisk skal bygge opp leirens gruppe.

### Sende en oppfølgingse-post {#sending-a-follow-up-email}

Med **Opprett personpost fra innsendinger** slått på, kan du også sende e-post til hver person som sender inn skjemaet. Fyll ut **Emne for oppfølgings-e-post** og **Innhold i oppfølgings-e-post** i skjemaets detaljer. Du kan bruke merkene `{firstName}` og `{churchName}` i begge. E-posten sendes bare når begge feltene er fylt ut.

:::info
Oppfølgingse-poster sendes først når kirken din er godkjent til å sende gruppe-e-post, og de teller mot kirkens daglige e-postgrense. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisere et skjema

For å gjenbruke et skjema som utgangspunkt for et nytt, klikker du **Dupliser** ved siden av skjemaet på listen over skjemaer og bekrefter. B1 lager en nøyaktig kopi av skjemaet -- inkludert alle spørsmål -- som du deretter kan gi nytt navn og redigere uavhengig.

:::tip
Duplisering er nyttig for gjentakende arrangementer der påmeldingsspørsmålene er de samme fra år til år. Dupliser fjorårets skjema, oppdater navnet og datoene, så er du klar.
:::

## Konfigurere skjemaegenskaper

Du kan oppdatere skjemaets navn og innstillinger når som helst. For frittstående skjemaer ser du også en unik **offentlig nettadresse** som du kan dele med hvem som helst, sammen med et felt for **Beskrivelse** -- tekst som vises over spørsmålene på den offentlige skjemasiden, nyttig for å fortelle folk hva skjemaet er til for før de begynner å fylle det ut.

### Legge til et overskriftsbilde {#adding-a-header-photo}

Frittstående skjemaer kan vise et **overskriftsbilde** øverst på skjemaet. I skjemaets detaljer klikker du på bildeboksen eller **Legg til bilde**, og velger eller laster opp et bilde (det beskjæres til 16:9). Klikk **Lagre**. Bildet vises under skjemaets navn, over beskrivelsen, på skjemaets offentlige nettadresse og overalt skjemaet er innebygd med nettstedselementet **Skjema**. Bruk **Endre bilde** for å erstatte det, eller **Fjern** for å ta det bort.

Bruk feltet **Takkemelding** til å bestemme hva folk ser etter at de har sendt inn skjemaet, inkludert på skjemaets offentlige nettadresseside. Hvis du lar det stå tomt, ser de «Takk for at du sendte inn skjemaet!»

:::tip
Frittstående skjemaer er gode for arrangementspåmeldinger. Del den offentlige nettadressen via e-post eller sosiale medier, eller legg skjemaet direkte inn på kirkens nettsted.
:::

:::info
For å legge inn et skjema på B1-nettstedet ditt, gå til nettstedseditoren, legg til en ny seksjon og velg elementet **Skjema**. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om redigering av nettstedet ditt.
:::
