---
title: "Opprette skjemaer"
---

# Opprette skjemaer

<div class="article-intro">

Lag egendefinerte skjemaer for å samle inn informasjon fra menigheten din. Du kan lage skjemaer for arrangementspåmeldinger, undersøkelser, besøkskort, medlemssøknader og mer. Skjemaer kan knyttes til personer i databasen din, eller brukes som frittstående sider med sin egen offentlige URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- For **Personer**-skjemaer (knyttet til personposter) trenger du [personer i databasen din](../people/adding-people.md) først.
- For skjemaer som samler inn **betalinger**, må du ha [Stripe konfigurert for online giving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer**, og klikk **Skjemaer**.
2. Klikk **Legg til skjema**.
3. Skriv inn et **navn** for skjemaet.
4. Velg skjematype fra rullegardinmenyen:
   - **Personer** — Knytter innsendinger til [personposter](../people/adding-people.md) i databasen din.
   - **Frittstående** — Lager et uavhengig skjema med sin egen offentlige URL, ideelt for eksterne påmeldinger.
5. Klikk **Lagre** for å opprette skjemaet.

Det nye skjemaet vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema

Trenger du en papirkopi å dele ut – for et besøkskort ved velkomstdisken, eller et skjema som noen uten internettilgang kan fylle ut for hånd? Klikk **Skriv ut** ved siden av et skjema i hovedlisten over skjemaer for å åpne en forhåndsvisning, og klikk deretter **Skriv ut**. Tomme felt skrives ut med en understrek eller avkrysningsboks for hvert spørsmål, slik at folk kan fylle dem ut for hånd; obligatoriske spørsmål er merket med en stjerne. Øverst på siden vises menighetens logo (**logoen for lys bakgrunn** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) med menighetens navn under, deretter skjemaets navn. Det finnes ingen andre utskriftsalternativer – du skriver ut hele skjemaet eller ingenting.

## Legge til spørsmål

1. Åpne skjemaet og gå til fanen **Spørsmål**.
2. Klikk **Legg til spørsmål**.
3. Velg en **feltype** fra rullegardinmenyen **Provider**. Tilgjengelige typer inkluderer:
   - **Tekstfelt** — For korte tekstsvar
   - **Dato** — For datovalg
   - **E-post** — For e-postadresser
   - **Telefonnummer** — For telefonnummer
   - **Flervalg** — For valg fra forhåndsdefinerte alternativer
   - **Betaling** — For innsamling av betalinger
4. Skriv inn en **tittel** og eventuelt en **beskrivelse** for spørsmålet.
5. Kryss av for **Krev svar** hvis feltet er obligatorisk.
6. Klikk **Lagre**.
7. Gjenta for å legge til flere spørsmål.

:::warning
Feltypen **Betaling** krever at Stripe er konfigurert. Hvis du ikke har satt opp online giving ennå, se [Oppsett av online giving](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Administrere skjemamedlemmer

1. Åpne skjemaet og gå til fanen **Skjemamedlemmer**.
2. Søk etter en person og legg vedkommende til med en rolle:
   - **Admin** — Kan redigere skjemaet og se alle innsendinger.
   - **Kun visning** — Kan se innsendinger, men kan ikke redigere skjemaet.

## Legge til innsendere automatisk i en gruppe

Når **Opprett personpost fra innsendinger** er slått på, kan du også koble skjemaet til en gruppe, slik at alle som sender inn, legges til i gruppens medlemsliste automatisk:

1. Åpne skjemaets **Detaljer**, og slå på **Opprett personpost fra innsendinger**.
2. Under **Legg til innsendere i en gruppe** velger du gruppen innsendere skal legges til i, eller lar den stå på **Ingen**.
3. Klikk **Lagre**.

Hver gang noen sender inn skjemaet, legges den matchede eller nyopprettede personen til i gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for ting som en leirpåmelding som automatisk skal bygge leirens deltakerliste.

### Sende en oppfølgings-e-post

Med **Opprett personpost fra innsendinger** slått på, kan du også sende en e-post til hver person som sender inn skjemaet. Fyll inn **Emne for oppfølgings-e-post** og **Innhold i oppfølgings-e-post** i skjemaets detaljer. Du kan bruke tokenene `{firstName}` og `{churchName}` i begge. E-posten sendes bare når begge feltene er fylt ut.

:::info
Oppfølgings-e-poster sendes først når menigheten din er godkjent for å sende gruppe-e-post, og de teller mot menighetens daglige e-postgrense. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisere et skjema

For å bruke et skjema som utgangspunkt for et nytt, klikk **Dupliser** ved siden av skjemaet i skjemalisten og bekreft. B1 lager en nøyaktig kopi av skjemaet – inkludert alle spørsmål – som du deretter kan gi nytt navn og redigere uavhengig.

:::tip
Duplisering er nyttig for gjentakende arrangementer der påmeldingsspørsmålene er de samme år etter år. Dupliser fjorårets skjema, oppdater navn og datoer, så er du klar.
:::

## Konfigurere skjemaegenskaper

Du kan oppdatere skjemaets navn og innstillinger når som helst. For frittstående skjemaer ser du også en unik **offentlig URL** som du kan dele med hvem som helst, samt et felt for **Beskrivelse** – tekst som vises over spørsmålene på den offentlige skjemasiden, nyttig for å fortelle folk hva skjemaet er for før de begynner å fylle det ut.

Bruk feltet **Takkemelding** for å bestemme hva folk ser etter at de har sendt inn skjemaet, også på skjemaets offentlige URL-side. Hvis du lar det stå tomt, ser de «Takk for at du sendte inn skjemaet!»

:::tip
Frittstående skjemaer er flotte for arrangementspåmeldinger. Del den offentlige URL-en via e-post eller sosiale medier, eller bygg inn skjemaet direkte på menighetens nettside.
:::

:::info
For å bygge inn et skjema på B1-nettsiden din, gå til nettsideredigeringen, legg til en ny seksjon og velg elementet **Skjema**. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om redigering av nettsiden din.
:::
