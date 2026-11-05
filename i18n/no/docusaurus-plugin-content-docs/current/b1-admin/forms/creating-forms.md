---
title: "Opprette skjemaer"
---

# Opprette skjemaer

<div class="article-intro">

Lag egendefinerte skjemaer for å samle inn informasjon fra menigheten. Du kan lage skjemaer for påmeldinger til arrangementer, undersøkelser, besøkskort, medlemssøknader og mer. Skjemaer kan knyttes til personer i databasen din, eller brukes som frittstående sider med egen offentlig nettadresse.

</div>

## Opplæringsvideo

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Før du begynner</h4>

- For skjemaer av typen **People** (knyttet til personposter) må du først ha [personer i databasen din](../people/adding-people.md).
- For skjemaer som tar imot **betalinger**, må du ha [Stripe konfigurert for online giving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **People** og klikk på **Forms**.
2. Klikk på **Add Form**.
3. Skriv inn et **navn** for skjemaet.
4. Velg skjematypen i nedtrekkslisten **Associate With**:
   - **People** -- Kobler innsendinger til [personposter](../people/adding-people.md) i databasen din. Skjemaer av typen People fylles ut fra en persons post, så de får ingen delbar lenke.
   - **Stand Alone** -- Lager et uavhengig skjema med egen offentlig nettadresse, ideelt for eksterne påmeldinger. Bare Stand Alone-skjemaer tilbyr et [overskriftsbilde](#adding-a-header-photo), en [QR-kode](#sharing-a-form-with-a-qr-code), en [koblet gruppe](#linking-a-form-to-a-group) og **Create a person record from submissions**.
5. Klikk på **Save** for å opprette skjemaet.

Det nye skjemaet vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema {#printing-a-blank-form}

Trenger du en papirkopi å dele ut -- for eksempel et besøkskort ved velkomstdisken, eller et skjema som noen uten internettilgang kan fylle ut for hånd? Klikk på **Print** ved siden av et skjema i hovedlisten over skjemaer for å åpne en forhåndsvisning, og klikk deretter på **Print**. Tomme felt skrives ut med en strek eller avkrysningsboks for hvert spørsmål, slik at folk kan fylle dem ut for hånd. Obligatoriske spørsmål er merket med en stjerne. Øverst på siden vises menighetens logo (**Light Background Logo** fra [Website > Appearance](../website/appearance.md), hvis du har lastet opp en), med menighetens navn under, og deretter skjemaets navn. Det finnes ingen andre utskriftsvalg -- du skriver ut hele skjemaet eller ingenting.

## Dele et skjema med en QR-kode {#sharing-a-form-with-a-qr-code}

Stand Alone-skjemaer har en lenke **QR Code** ved siden av seg i hovedlisten over skjemaer (arkiverte skjemaer har ikke dette). Klikk på den for å åpne en QR-kode for skjemaets offentlige nettadresse, med lenken vist under. Klikk på **Download PNG** for å lagre koden som et bilde du kan skrive ut på menighetsbladet eller vise på lysbilder. Den som skanner koden, åpner skjemaet på telefonen sin.

## Legge til spørsmål {#adding-questions}

1. Åpne skjemaet ditt og gå til fanen **Questions**.
2. Klikk på **Add Question**.
3. Velg en **field type** fra nedtrekkslisten Provider. Tilgjengelige typer inkluderer:
   - **Textbox** -- For korte tekstsvar
   - **Date** -- For datovalg
   - **Email** -- For e-postadresser
   - **Phone Number** -- For telefonnummer
   - **Multiple Choice** -- For å velge blant forhåndsdefinerte alternativer
   - **Payment** -- For å ta imot betalinger
4. Skriv inn en **Title** og en valgfri **Description** for spørsmålet. Beskrivelsen vises under spørsmålet når folk fyller ut skjemaet, så bruk den til hint som «Oppgi eventuelle allergier vi bør vite om.»
5. Kryss av for **Require an answer** hvis feltet er obligatorisk.
6. Klikk på **Save**.
7. Gjenta for å legge til flere spørsmål.

:::warning
Feltypen **Payment** krever at Stripe er konfigurert. Hvis du ikke har satt opp online giving ennå, se [Oppsett av online giving](../donations/online-giving-setup.md) før du legger til betalingsfelt. Personer som betaler på et skjema uten å logge inn, må krysse av for **I'm not a robot** før kortet godkjennes.
:::

## Administrere skjemamedlemmer {#managing-form-members}

1. Åpne skjemaet ditt og gå til fanen **Form Members**.
2. Søk etter en person og legg vedkommende til med en rolle:
   - **Admin** -- Kan redigere skjemaet og se alle innsendinger.
   - **View Only** -- Kan se innsendinger, men ikke redigere skjemaet.

## Koble et skjema til en gruppe {#linking-a-form-to-a-group}

Du kan koble et hvilket som helst Stand Alone-skjema til en gruppe -- for eksempel et bønneskjema for en smågruppe, eller et medisinsk samtykke for en ungdomstur:

1. Åpne skjemaets **Details**.
2. Under **Linked group** velger du gruppen, eller lar feltet stå på **None**.
3. Klikk på **Save**.

Når et skjema er koblet:

- **Gruppemedlemmer** ser skjemaet i en seksjon **Forms** på gruppens side på B1.church så lenge skjemaet er åpent, med en knapp **Fill out** som åpner det (se [Gruppedetaljer](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppeledere** ser også lukkede skjemaer, og kan lese alle svarene i innsendingene og skrive dem ut (én innsending eller **Print all**). Ledere kan bare se svarene -- de kan ikke redigere skjemaet, med mindre de også er [skjemamedlemmer](#managing-form-members).
- **I B1 Admin** viser gruppens side en seksjon **Linked forms** som lister hvert koblet skjema som **Open** eller **Closed**. Den vises for gruppens ledere og for personer som kan administrere skjemaer. Se [Gruppemedlemmer](../groups/group-members.md#linked-forms).

Et skjema er lukket når det er utenfor tidsrommet for tilgjengelighet. Arkiverte skjemaer vises ikke på gruppesiden.

### Legge til innsendere automatisk i en gruppe {#automatically-adding-submitters-to-a-group}

Å koble et skjema til en gruppe legger ikke til noen i gruppen av seg selv. For å legge alle som sender inn skjemaet til gruppens deltakerliste, slår du også på **Create a person record from submissions** i skjemaets detaljer og klikker på **Save**.

Hver gang noen sender inn skjemaet, legges den matchede eller nyopprettede personen til i gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for ting som et påmeldingsskjema til en leir, som skal bygge leirens deltakerliste automatisk.

### Sende en oppfølgings-e-post {#sending-a-follow-up-email}

Med **Create a person record from submissions** slått på kan du også sende en e-post til hver person som sender inn skjemaet. Fyll inn **Follow-up Email Subject** og **Follow-up Email Body** i skjemaets detaljer. Du kan bruke tokenene `{firstName}` og `{churchName}` i begge. E-posten sendes bare når begge feltene er fylt ut.

:::info
Oppfølgings-e-poster sendes først etter at menigheten din er godkjent for å sende gruppe-e-post, og de teller mot menighetens daglige grense for e-post. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisere et skjema

For å bruke et skjema som utgangspunkt for et nytt, klikker du på **Duplicate** ved siden av skjemaet i listen over skjemaer og bekrefter. B1 lager en nøyaktig kopi av skjemaet -- inkludert alle spørsmålene -- som du deretter kan gi nytt navn og redigere uavhengig.

:::tip
Duplisering er nyttig for gjentakende arrangementer der påmeldingsspørsmålene er de samme fra år til år. Dupliser fjorårets skjema, oppdater navn og datoer, så er du klar.
:::

## Konfigurere skjemaegenskaper

Du kan endre navn og innstillinger for skjemaet når som helst. For Stand Alone-skjemaer ser du også en unik **public URL** som du kan dele med hvem som helst, samt et felt **Description** -- tekst som vises over spørsmålene på den offentlige skjemasiden, og som er nyttig for å forklare hva skjemaet er til for før folk begynner å fylle det ut.

### Legge til et overskriftsbilde {#adding-a-header-photo}

Stand Alone-skjemaer kan vise et **Header Photo** øverst i skjemaet. Klikk på bildeboksen eller **Add Photo** i skjemaets detaljer, velg eller last opp et bilde (det beskjæres til et format på 16:9), og klikk på **Save**. Bildet vises under skjemaets navn, over beskrivelsen, på skjemaets offentlige nettadressesside og der skjemaet er innbygd med elementet **Form** på nettstedet. Bruk **Change Photo** for å bytte det ut, eller **Remove** for å fjerne det.

Bruk feltet **Thank You Message** for å bestemme hva folk ser etter at de har sendt inn skjemaet, også på skjemaets offentlige nettadressesside. Hvis du lar det stå tomt, ser de «Thank you for submitting the form!»

:::tip
Stand Alone-skjemaer er gode for påmeldinger til arrangementer. Del den offentlige nettadressen via e-post eller sosiale medier, eller bygg skjemaet direkte inn på menighetens nettsted.
:::

:::info
For å bygge inn et skjema på B1-nettstedet ditt går du til nettstedseditoren, legger til en ny seksjon og velger elementet **Form**. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om hvordan du redigerer nettstedet ditt.
:::
