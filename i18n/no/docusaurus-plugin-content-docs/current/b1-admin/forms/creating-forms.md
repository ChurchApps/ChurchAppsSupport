---
title: "Opprette skjemaer"
---

# Opprette skjemaer

<div class="article-intro">

Lag egendefinerte skjemaer for å samle inn informasjon fra menigheten din. Du kan lage skjemaer for arrangementspåmeldinger, undersøkelser, besøkskort, medlemssøknader og mer. Skjemaer kan knyttes til personer i databasen din, eller brukes som frittstående sider med egen offentlig nettadresse.

</div>

## Opplæringsvideo

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Før du begynner</h4>

- For **People**-skjemaer (knyttet til personprofiler) trenger du [personer i databasen din](../people/adding-people.md) først.
- For skjemaer som samler inn **betalinger**, må du ha [Stripe konfigurert for nettbasert giving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema

1. Åpne [Hopp til-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **People** og klikk på **Forms**.
2. Klikk på **Add Form**.
3. Skriv inn et **navn** for skjemaet.
4. Velg skjematype i nedtrekkslisten **Associate With**:
   - **People** — Knytter innsendinger til [personprofiler](../people/adding-people.md) i databasen din. People-skjemaer fylles ut fra en persons profil, så de får ingen delbar lenke.
   - **Stand Alone** — Oppretter et uavhengig skjema med egen offentlig nettadresse, ideelt for eksterne påmeldinger. Bare Stand Alone-skjemaer tilbyr et [overskriftsbilde](#adding-a-header-photo), en [QR-kode](#sharing-a-form-with-a-qr-code), en [tilknyttet gruppe](#linking-a-form-to-a-group) og **Create a person record from submissions**.
5. Klikk på **Save** for å opprette skjemaet.

Det nye skjemaet vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema {#printing-a-blank-form}

Trenger du en papirkopi å dele ut -- for et besøkskort ved velkomstdisken, eller et skjema som noen uten internettilgang kan fylle ut for hånd? Klikk på **Print** ved siden av et skjema i hovedlisten over Forms for å åpne en forhåndsvisning, og klikk deretter på **Print**. Tomme felt skrives ut med en understrek eller avkrysningsboks for hvert spørsmål, slik at folk kan fylle dem ut for hånd. Obligatoriske spørsmål er merket med en stjerne. Øverst på siden vises menighetens logo (**Light Background Logo** fra [Website > Appearance](../website/appearance.md), hvis du har lastet opp en), med menighetens navn under, og deretter skjemanavnet. Det finnes ingen andre utskriftsvalg -- du skriver ut hele skjemaet eller ingenting.

## Dele et skjema med en QR-kode {#sharing-a-form-with-a-qr-code}

Stand Alone-skjemaer har en **QR Code**-lenke ved siden av seg i hovedlisten over Forms (arkiverte skjemaer har ikke dette). Klikk på den for å åpne en QR-kode for skjemaets offentlige nettadresse, med lenken vist under. Klikk på **Download PNG** for å lagre koden som et bilde du kan skrive ut på menighetsbladet eller vise på lysbilder. Den som skanner koden, åpner skjemaet på telefonen sin.

## Legge til spørsmål {#adding-questions}

1. Åpne skjemaet ditt og gå til fanen **Questions**.
2. Klikk på **Add Question**.
3. Velg en **field type** fra nedtrekkslisten Provider. Tilgjengelige typer inkluderer:
   - **Textbox** — For korte tekstsvar
   - **Date** — For datovalg
   - **Email** — For e-postadresser
   - **Phone Number** — For telefonnummer
   - **Multiple Choice** — For valg blant forhåndsdefinerte alternativer
   - **Payment** — For innsamling av betalinger
4. Skriv inn en **Title** og valgfri **Description** for spørsmålet. Beskrivelsen vises under spørsmålet når folk fyller ut skjemaet, så bruk den til hint som "Oppgi eventuelle allergier vi bør vite om."
5. Kryss av for **Require an answer** hvis feltet er obligatorisk.
6. Klikk på **Save**.
7. Gjenta for å legge til flere spørsmål.

:::warning
Feltypen **Payment** krever at Stripe er konfigurert. Hvis du ikke har satt opp nettbasert giving ennå, se [Oppsett av nettbasert giving](../donations/online-giving-setup.md) før du legger til betalingsfelt.
:::

## Administrere skjemamedlemmer {#managing-form-members}

1. Åpne skjemaet ditt og gå til fanen **Form Members**.
2. Søk etter en person og legg vedkommende til med en rolle:
   - **Admin** — Kan redigere skjemaet og se alle innsendinger.
   - **View Only** — Kan se innsendinger, men kan ikke redigere skjemaet.

## Knytte et skjema til en gruppe {#linking-a-form-to-a-group}

Du kan knytte et hvilket som helst Stand Alone-skjema til en gruppe -- for eksempel et bønneskjema for en smågruppe, eller en medisinsk frigivelse for en ungdomstur:

1. Åpne skjemaets **Details**.
2. Under **Linked group** velger du gruppen, eller lar feltet stå på **None**.
3. Klikk på **Save**.

Når et skjema er knyttet til en gruppe:

- **Gruppemedlemmer** ser skjemaet i en seksjon **Forms** på gruppens side på B1.church, så lenge skjemaet er åpent, med en knapp **Fill out** som åpner det (se [Gruppedetaljer](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppeledere** ser også lukkede skjemaer, og kan lese alle innsendingenes svar og skrive dem ut (én innsending om gangen, eller **Print all**). Ledere kan bare se svarene -- de kan ikke redigere skjemaet med mindre de også er [skjemamedlemmer](#managing-form-members).
- **I B1 Admin** viser gruppens side en seksjon **Linked forms** som lister hvert knyttede skjema som **Open** eller **Closed**. Den vises for gruppens ledere og for personer som kan administrere skjemaer. Se [Gruppemedlemmer](../groups/group-members.md#linked-forms).

Et skjema er lukket når det er utenfor tidsrammen for tilgjengelighet. Arkiverte skjemaer vises ikke på gruppesiden.

### Legge til innsendere i en gruppe automatisk {#automatically-adding-submitters-to-a-group}

Å knytte et skjema til en gruppe legger ikke til noen i gruppen av seg selv. For å legge alle innsendere til i gruppens medlemsliste, slår du også på **Create a person record from submissions** i skjemaets detaljer og klikker på **Save**.

Hver gang noen sender inn skjemaet, legges den matchede eller nyopprettede personen til i gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for ting som en påmeldingsskjema til leir, som automatisk skal bygge leirens gruppe.

### Sende en oppfølgings-e-post

Med **Create a person record from submissions** slått på, kan du også sende e-post til hver person som sender inn skjemaet. Fyll ut **Follow-up Email Subject** og **Follow-up Email Body** i skjemaets detaljer. Du kan bruke tokenene `{firstName}` og `{churchName}` i begge. E-posten sendes bare når begge feltene er fylt ut.

:::info
Oppfølgingse-poster sendes først etter at menigheten din er godkjent for å sende gruppe-e-post, og de teller mot menighetens daglige e-postgrense. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisere et skjema

For å bruke et skjema som utgangspunkt for et nytt, klikker du på **Duplicate** ved siden av skjemaet i listen over Forms og bekrefter. B1 lager en nøyaktig kopi av skjemaet -- inkludert alle spørsmål -- som du deretter kan gi nytt navn og redigere uavhengig.

:::tip
Duplisering er nyttig for gjentakende arrangementer der påmeldingsspørsmålene er de samme år etter år. Dupliser fjorårets skjema, oppdater navnet og datoene, så er du klar.
:::

## Konfigurere skjemaegenskaper

Du kan når som helst oppdatere skjemaets navn og innstillinger. For Stand Alone-skjemaer ser du også en unik **public URL** som du kan dele med hvem som helst, sammen med et felt **Description** -- tekst som vises over spørsmålene på den offentlige skjemasiden, og som er nyttig for å forklare hva skjemaet er til før folk begynner å fylle det ut.

### Legge til et overskriftsbilde {#adding-a-header-photo}

Stand Alone-skjemaer kan vise et **Header Photo** øverst i skjemaet. I skjemaets detaljer klikker du på bildeboksen eller **Add Photo**, og velger eller laster opp et bilde (det beskjæres til 16:9-format). Klikk på **Save**. Bildet vises under skjemanavnet, over beskrivelsen, på skjemaets offentlige nettadresseside og overalt der skjemaet er innebygd med nettside-elementet **Form**. Bruk **Change Photo** for å erstatte det, eller **Remove** for å fjerne det.

Bruk feltet **Thank You Message** til å angi hva folk ser etter at de har sendt inn skjemaet, også på skjemaets offentlige nettadresseside. Hvis du lar det stå tomt, ser de "Thank you for submitting the form!"

:::tip
Stand Alone-skjemaer er perfekte for arrangementspåmeldinger. Del den offentlige nettadressen via e-post, sosiale medier, eller bygg skjemaet direkte inn på menighetens nettside.
:::

:::info
For å bygge inn et skjema på B1-nettsiden din, gå til nettsideredigeringen, legg til en ny seksjon og velg elementet **Form**. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om redigering av nettsiden.
:::
