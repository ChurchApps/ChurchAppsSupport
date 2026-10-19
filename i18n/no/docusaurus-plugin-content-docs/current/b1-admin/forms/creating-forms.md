---
title: "Opprette skjemaer"
---

# Opprette skjemaer

<div class="article-intro">

Lag egendefinerte skjemaer for å samle inn informasjon fra menigheten din. Du kan lage skjemaer for påmeldinger til arrangementer, spørreundersøkelser, besøkskort, medlemskapssøknader og mer. Skjemaer kan kobles til personer i databasen din eller brukes som frittstående sider med en egen offentlig nettadresse.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- For skjemaer av typen **Personer** (koblet til personregistreringer) må du ha [personer i databasen din](../people/adding-people.md) først.
- For skjemaer som samler inn **betalinger**, må du ha [Stripe konfigurert for nettbasert giving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer**, og klikk på **Skjemaer**.
2. Klikk på **Legg til skjema**.
3. Skriv inn et **navn** for skjemaet ditt.
4. Velg skjematypen fra rullegardinmenyen:
   - **Personer** – Knytter innsendinger til [personregistreringer](../people/adding-people.md) i databasen din.
   - **Frittstående** – Lager et uavhengig skjema med en egen offentlig nettadresse, ideelt for eksterne påmeldinger.
5. Klikk på **Lagre** for å opprette skjemaet.

Det nye skjemaet vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema

Trenger du en papirkopi å dele ut – for et besøkskort ved velkomstdisken, eller et skjema som noen uten internettilgang kan fylle ut for hånd? Klikk på **Skriv ut** ved siden av et skjema i hovedlisten over skjemaer for å åpne en forhåndsvisning, og klikk deretter på **Skriv ut**. Tomme felt skrives ut med en understrek eller avkrysningsboks for hvert spørsmål, slik at folk kan fylle dem ut for hånd. Obligatoriske spørsmål er merket med en stjerne. Øverst på siden vises kirkens logo (**logo for lys bakgrunn** fra [Nettsted > Utseende](../website/appearance.md), hvis du har lastet opp en) med kirkens navn under, og deretter skjemanavnet. Det finnes ingen andre utskriftsalternativer – du skriver ut hele skjemaet eller ingenting.

## Legge til spørsmål

1. Åpne skjemaet ditt og gå til fanen **Spørsmål**.
2. Klikk på **Legg til spørsmål**.
3. Velg en **feltype** fra rullegardinmenyen Leverandør. Tilgjengelige typer inkluderer:
   - **Tekstboks** – For korte tekstsvar
   - **Dato** – For datovalg
   - **E-post** – For e-postadresser
   - **Telefonnummer** – For telefonnummer
   - **Flervalg** – For valg fra forhåndsdefinerte alternativer
   - **Betaling** – For innsamling av betalinger
4. Skriv inn en **tittel** og en valgfri **beskrivelse** for spørsmålet. Beskrivelsen vises under spørsmålet når folk fyller ut skjemaet, så bruk den til hint som «Oppgi eventuelle allergier vi bør vite om».
5. Kryss av for **Krev svar** hvis feltet er obligatorisk.
6. Klikk på **Lagre**.
7. Gjenta for å legge til flere spørsmål.

:::warning
Feltypen **Betaling** krever at Stripe er konfigurert. Hvis du ikke har satt opp nettbasert giving ennå, se [Oppsett av nettbasert giving](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Administrere skjemamedlemmer

1. Åpne skjemaet ditt og gå til fanen **Skjemamedlemmer**.
2. Søk etter en person og legg dem til med en rolle:
   - **Administrator** – Kan redigere skjemaet og se alle innsendinger.
   - **Kun visning** – Kan se innsendinger, men kan ikke redigere skjemaet.

## Legge til innsendere i en gruppe automatisk

Når **Opprett en personregistrering fra innsendinger** er aktivert, kan du også koble skjemaet til en gruppe, slik at alle som sender inn, legges til i gruppens medlemsliste automatisk:

1. Åpne skjemaets **Detaljer**, og slå på **Opprett en personregistrering fra innsendinger**.
2. Under **Legg innsendere til i en gruppe**, velg gruppen du vil legge innsendere til i, eller la den være satt til **Ingen**.
3. Klikk på **Lagre**.

Hver gang noen sender inn skjemaet, legges den matchede eller nyopprettede personen til i gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for ting som et påmeldingsskjema til en leir, som automatisk bør bygge leirens medlemsliste.

### Sende en oppfølgings-e-post {#sending-a-follow-up-email}

Med **Opprett en personregistrering fra innsendinger** slått på, kan du også sende e-post til hver person som sender inn skjemaet. Fyll ut **Emne for oppfølgings-e-post** og **Innhold i oppfølgings-e-post** i skjemaets detaljer. Du kan bruke symbolene `{firstName}` og `{churchName}` i begge. E-posten sendes bare når begge feltene er fylt ut.

:::info
Oppfølgings-e-poster sendes først etter at kirken din er godkjent for å sende gruppe-e-post, og de teller mot kirkens daglige e-postgrense. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisere et skjema

For å bruke et skjema som utgangspunkt for et nytt, klikk på **Dupliser** ved siden av skjemaet i listen over skjemaer og bekreft. B1 lager en eksakt kopi av skjemaet – inkludert alle spørsmål – som du deretter kan gi nytt navn og redigere uavhengig.

:::tip
Duplisering er praktisk for gjentakende arrangementer der påmeldingsspørsmålene er de samme fra år til år. Dupliser fjorårets skjema, oppdater navnet og datoene, så er du klar.
:::

## Konfigurere skjemaegenskaper

Du kan oppdatere skjemaets navn og innstillinger når som helst. For frittstående skjemaer ser du også en unik **offentlig nettadresse** som du kan dele med hvem som helst, sammen med et **Beskrivelse**-felt – tekst som vises over spørsmålene på den offentlige skjemasiden, nyttig for å fortelle folk hva skjemaet er for før de begynner å fylle det ut.

Bruk feltet **Takkemelding** for å bestemme hva folk ser etter at de har sendt inn skjemaet, også på skjemaets offentlige nettadresse. Hvis du lar det stå tomt, ser de «Takk for at du sendte inn skjemaet!»

:::tip
Frittstående skjemaer er gode for påmeldinger til arrangementer. Del den offentlige nettadressen via e-post eller sosiale medier, eller bygg skjemaet direkte inn på kirkens nettsted.
:::

:::info
For å bygge inn et skjema på B1-nettstedet ditt, gå til nettstedsredigeringen, legg til en ny seksjon og velg elementet **Skjema**. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om redigering av nettstedet ditt.
:::
