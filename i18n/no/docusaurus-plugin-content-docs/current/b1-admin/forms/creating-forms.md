---
title: "Opprette skjemaer"
---

# Opprette skjemaer

<div class="article-intro">

Lag egne skjemaer for å samle inn informasjon fra menigheten. Du kan opprette skjemaer for arrangementspåmeldinger, spørreundersøkelser, besøkskort, medlemssøknader og mer. Skjemaer kan knyttes til personer i databasen din eller brukes som selvstendige sider med egen offentlig URL.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- For **Personer**-skjemaer (knyttet til personposter) må du først ha [personer i databasen din](../people/adding-people.md).
- For skjemaer som samler inn **betalinger** må du ha [satt opp Stripe for nettgiving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **Personer** og klikk på **Skjemaer**.
2. Klikk på **Legg til skjema**.
3. Skriv inn et **navn** på skjemaet.
4. Velg skjematype fra nedtrekksmenyen:
   - **Personer** — Knytter innsendinger til [personposter](../people/adding-people.md) i databasen din.
   - **Frittstående** — Oppretter et selvstendig skjema med egen offentlig URL, ideelt for eksterne påmeldinger.
5. Klikk på **Lagre** for å opprette skjemaet.

Det nye skjemaet vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema

Trenger du en papirkopi å dele ut, for eksempel et besøkskort i vestibylen eller et skjema som noen uten internett kan fylle ut for hånd? Klikk på **utskriftsikonet** ved siden av et skjema i hovedlisten over skjemaer for å åpne en forhåndsvisning, og klikk deretter på **Skriv ut**. Tomme felt skrives ut med en strek eller en avkrysningsboks for hvert spørsmål, slik at folk kan fylle dem ut for hånd. Obligatoriske spørsmål er merket med en stjerne. Menighetens navn skrives ut øverst, over skjemanavnet. Det finnes ingen andre utskriftsvalg. Du skriver ut hele skjemaet eller ingenting.

## Legge til spørsmål

1. Åpne skjemaet og gå til fanen **Spørsmål**.
2. Klikk på **Legg til spørsmål**.
3. Velg en **felttype** fra nedtrekksmenyen Leverandør. Tilgjengelige typer er blant annet:
   - **Tekstboks** — For korte tekstsvar
   - **Dato** — For valg av dato
   - **E-post** — For e-postadresser
   - **Telefonnummer** — For telefonnummer
   - **Flervalg** — For å velge blant forhåndsdefinerte alternativer
   - **Betaling** — For å samle inn betalinger
4. Skriv inn en **Tittel** og eventuelt en **Beskrivelse** for spørsmålet.
5. Kryss av for **Krev svar** hvis feltet er obligatorisk.
6. Klikk på **Lagre**.
7. Gjenta for å legge til flere spørsmål.

:::warning
Felttypen **Betaling** krever at Stripe er satt opp. Hvis du ikke har satt opp nettgiving ennå, se [Oppsett av nettgiving](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Administrere skjemamedlemmer

1. Åpne skjemaet og gå til fanen **Skjemamedlemmer**.
2. Søk etter en person og legg vedkommende til med en rolle:
   - **Administrator** — Kan redigere skjemaet og se alle innsendinger.
   - **Bare visning** — Kan se innsendinger, men ikke redigere skjemaet.

## Legge til innsendere automatisk i en gruppe

Når **Opprett en personpost fra innsendinger** er aktivert, kan du også knytte skjemaet til en gruppe, slik at hver innsender automatisk legges til i gruppens medlemsliste:

1. Åpne **Detaljer** for skjemaet og slå på **Opprett en personpost fra innsendinger**.
2. Under **Legg til innsendere i en gruppe** velger du gruppen innsenderne skal legges til i, eller lar den stå på **Ingen**.
3. Klikk på **Lagre**.

Hver gang noen sender inn skjemaet, legges den samsvarende eller nyopprettede personen til i gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for eksempel i et påmeldingsskjema til en leir som automatisk skal bygge opp leirens medlemsgruppe.

### Sende en oppfølgings-e-post

Når **Opprett en personpost fra innsendinger** er slått på, kan du også sende e-post til hver person som sender inn skjemaet. Fyll ut **Emne for oppfølgings-e-post** og **Innhold i oppfølgings-e-post** i skjemaets detaljer. Du kan bruke kodene `{firstName}` og `{churchName}` i begge feltene. E-posten sendes bare når begge feltene er utfylt.

:::info
Oppfølgings-e-poster sendes først etter at menigheten din er godkjent for å sende gruppe-e-post, og de teller med i menighetens daglige e-postgrense. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisere et skjema

For å bruke et skjema som utgangspunkt for et nytt klikker du på ikonet **Dupliser** (kopiikonet) ved siden av skjemaet i skjemalisten. B1 oppretter en eksakt kopi av skjemaet, inkludert alle spørsmål, som du deretter kan gi nytt navn og redigere uavhengig av originalen.

:::tip
Duplisering er praktisk for tilbakevendende arrangementer der påmeldingsspørsmålene er de samme fra år til år. Dupliser fjorårets skjema, oppdater navn og datoer, så er du klar.
:::

## Konfigurere skjemaegenskaper

Du kan når som helst oppdatere skjemaets navn og innstillinger. For frittstående skjemaer ser du også en unik **offentlig URL** som du kan dele med hvem som helst, sammen med et felt for **Beskrivelse**. Teksten vises over spørsmålene på skjemaets offentlige side, og er nyttig for å fortelle folk hva skjemaet gjelder før de begynner å fylle det ut.

Bruk feltet **Takkemelding** for å angi hva folk ser etter at de har sendt inn skjemaet, også på skjemaets offentlige URL-side. Hvis du lar det stå tomt, ser de «Takk for at du sendte inn skjemaet!»

:::tip
Frittstående skjemaer egner seg godt til arrangementspåmeldinger. Del den offentlige URL-en via e-post eller sosiale medier, eller bygg skjemaet rett inn på menighetens nettsted.
:::

:::info
For å bygge inn et skjema på B1-nettstedet ditt går du til nettstedsredigereren, legger til en ny seksjon og velger elementet **Skjema**. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for mer om hvordan du redigerer nettstedet.
:::
