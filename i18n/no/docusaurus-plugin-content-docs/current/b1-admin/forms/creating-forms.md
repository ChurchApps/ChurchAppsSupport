---
title: "Opprette skjemaer"
description: "Lag egendefinerte skjemaer i B1 Admin til påmeldinger, spørreundersøkelser og besøkskort, og del dem via lenke, QR-kode eller utskrift."
---

# Opprette skjemaer

<div class="article-intro">

Lag egendefinerte skjemaer for å samle inn informasjon fra menigheten. Du kan lage skjemaer for påmeldinger til arrangementer, spørreundersøkelser, besøkskort, medlemssøknader og mer. Skjemaer kan knyttes til personer i databasen din, eller brukes som frittstående sider med sin egen offentlige nettadresse.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="UZ4dGCNIFw4" title="Creating Forms and Managing Submissions in B1" next="Launching Your Church Website in B1" nextUrl="/docs/b1-admin/guides/launch-website" />

<div class="prereqs">
<h4>Før du begynner</h4>

- For skjemaer av typen **People** (knyttet til personposter) trenger du først [personer i databasen din](../people/adding-people.md).
- For skjemaer som tar imot **betalinger**, må du ha [Stripe satt opp for nettbasert giving](../donations/online-giving-setup.md).

</div>

## Opprette et nytt skjema {#creating-a-new-form}

1. Åpne [hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre i B1 Admin), utvid **People** og klikk **Forms**.
2. Klikk **Add Form**.
3. Skriv inn et **name** for skjemaet.
4. Velg skjematype i nedtrekkslisten **Associate With**:
   - **People** – knytter innsendinger til [personposter](../people/adding-people.md) i databasen din. Skjemaer av typen People fylles ut fra en persons post, og får derfor ingen lenke som kan deles.
   - **Stand Alone** – lager et uavhengig skjema med sin egen offentlige nettadresse, ideelt for eksterne påmeldinger. Bare frittstående skjemaer tilbyr et [bannerbilde](#adding-a-header-photo), en [QR-kode](#sharing-a-form-with-a-qr-code), en [tilknyttet gruppe](#linking-a-form-to-a-group) og **Create a person record from submissions**.
5. For et frittstående skjema kan du fylle inn resten av [egenskapene](#configuring-form-properties) nå eller senere.
6. Klikk **Save** for å opprette skjemaet.

Det nye skjemaet vises i listen. Klikk på det for å begynne å legge til spørsmål.

## Skrive ut et tomt skjema {#printing-a-blank-form}

Trenger du en papirkopi å dele ut – for et besøkskort ved velkomstdisken, eller et skjema noen uten internettilgang kan fylle ut for hånd? Klikk **Print** ved siden av et skjema på hovedlisten over Forms for å åpne en forhåndsvisning, og klikk deretter **Print**. Tomme felt skrives ut med en understrek eller en avkrysningsboks for hvert spørsmål, slik at folk kan fylle dem ut for hånd; påkrevde spørsmål er merket med en stjerne. Øverst på siden vises menighetens logo (**Light Background Logo** fra [Nettside > Utseende](../website/appearance.md), hvis du har lastet opp en) med menighetens navn under, deretter skjemaets navn. Det finnes ingen andre utskriftsvalg – du skriver ut hele skjemaet eller ingenting.

## Dele et skjema med en QR-kode {#sharing-a-form-with-a-qr-code}

Frittstående skjemaer har en lenke **QR Code** ved siden av seg på hovedlisten over Forms (arkiverte skjemaer har ikke denne). Klikk på den for å åpne en QR-kode for skjemaets offentlige nettadresse, med lenken vist under. Klikk **Download PNG** for å lagre koden som et bilde du kan skrive ut på menighetsbladet eller vise på lysbilder. Den som skanner koden, åpner skjemaet på telefonen sin.

## Legge til spørsmål {#adding-questions}

1. Åpne skjemaet ditt og gå til fanen **Questions**.
2. Klikk **Add Question**.
3. Velg en **Field Type**:
   - **Textbox** – for korte tekstsvar
   - **Whole Number** og **Decimal** – for tall
   - **Date** – for datovalg
   - **Yes/No** – for et ja- eller nei-svar
   - **Email** – for e-postadresser
   - **Phone Number** – for telefonnummer
   - **Text Area** – for lengre svar
   - **Multiple Choice** – for å velge ett av flere alternativer
   - **Checkbox** – for å krysse av for et hvilket som helst antall alternativer
   - **Payment** – for å ta imot betalinger
4. Skriv inn en **Title** og en valgfri **Description** for spørsmålet. Beskrivelsen vises under spørsmålet når folk fyller ut skjemaet, så bruk den til hint som «Ta med eventuelle allergier vi bør vite om.»
5. Fyll inn de ekstra feltene for typen du valgte:
   - For spørsmål om tekst, tall, dato, e-post og telefon kan du angi en valgfri **Placeholder**, som viser eksempeltekst inne i den tomme boksen.
   - For **Multiple Choice** og **Checkbox** legger du til hvert alternativ under **Choices**: skriv inn en **Value** (det som lagres) og **Text** (det folk ser), og klikk deretter på legg-til-knappen. Klikk på fjern-ikonet for å ta bort et alternativ.
   - For **Payment** velger du **Fund** pengene skal gå til, og **Amount**.
6. Kryss av for **Require an answer for this question** hvis feltet er obligatorisk. (Betalingsspørsmål har ikke dette alternativet.)
7. Klikk **Save**.
8. Gjenta for å legge til flere spørsmål.

Fanen **Questions** lister hvert spørsmål med type og om det er påkrevd. Klikk på tittelen til et spørsmål for å redigere det, eller klikk **Delete** i spørsmålets skjema og bekreft for å fjerne det. Bruk pilene **Move up** og **Move down** på en rad for å endre rekkefølgen spørsmålene vises i.

:::warning
Feltypen **Payment** krever at Stripe er satt opp. Hvis du ikke har satt opp nettbasert giving ennå, se [Oppsett av nettbasert giving](../donations/online-giving-setup.md) før du legger til betalingsfelt. Personer som betaler på et skjema uten å logge inn, må krysse av for **I'm not a robot** før kortet godtas.
:::

## Administrere skjemamedlemmer {#managing-form-members}

Frittstående skjemaer har en fane **Form Members** for å gi personer tilgang til akkurat dette skjemaet.

1. Åpne skjemaet ditt og gå til fanen **Form Members**.
2. Under **Add Person** søker du etter en person og klikker legg-til-ikonet ved siden av navnet. Nye medlemmer starter som **View Only**.
3. I kolonnen **Permission** klikker du på rollen du vil ha:
   - **Admin** – kan redigere skjemaet og se alle innsendinger.
   - **View Only** – kan se innsendinger, men ikke redigere skjemaet.
4. Slå på **Email Notification** for alle som skal få en e-post hver gang skjemaet sendes inn.

For å fjerne noen fra skjemaet klikker du **Remove** på raden deres og bekrefter.

## Knytte et skjema til en gruppe {#linking-a-form-to-a-group}

Du kan knytte et hvilket som helst frittstående skjema til en gruppe – for eksempel et bønneskjema for en smågruppe, eller en medisinsk samtykkeerklæring for en ungdomstur:

1. Åpne skjemaet og klikk **Edit Form** (eller klikk **Edit** ved siden av skjemaet på listen over Forms).
2. Under **Linked group** velger du gruppen, eller lar feltet stå på **None**.
3. Klikk **Save**.

Når et skjema er knyttet til en gruppe:

- **Gruppemedlemmer** ser skjemaet i en seksjon **Forms** på gruppens side på B1.church så lenge skjemaet er åpent, med en knapp **Fill out** som åpner det (se [Gruppedetaljer](../../b1-church/groups/group-details.md#linked-forms)).
- **Gruppeledere** ser også lukkede skjemaer, og kan lese svarene på hver innsending og skrive dem ut (én innsending, eller **Print all**). Ledere kan bare se svarene – de kan ikke redigere skjemaet med mindre de også er [skjemamedlemmer](#managing-form-members).
- **I B1 Admin** viser gruppens side en seksjon **Linked forms** som lister hvert tilknyttet skjema som **Open** eller **Closed**. Den vises for gruppens ledere og for personer som kan administrere skjemaer. Se [Gruppemedlemmer](../groups/group-members.md#linked-forms).

Et skjema er lukket når det er utenfor tilgjengelighetsperioden. Arkiverte skjemaer vises ikke på gruppesiden.

### Legge til innsendere i en gruppe automatisk {#automatically-adding-submitters-to-a-group}

Å knytte et skjema til en gruppe legger ikke til noen i den av seg selv. For å legge til alle innsendere i gruppens liste, kryss også av for **Create a person record from submissions** i skjemaets innstillinger og klikk **Save**.

Hver gang noen sender inn skjemaet, legges den matchede eller nyopprettede personen til i gruppen (eksisterende gruppemedlemmer hoppes over). Dette er nyttig for ting som en påmeldingsskjema til en leir som automatisk skal bygge opp leirgruppens liste.

### Sende en oppfølgings-e-post {#sending-a-follow-up-email}

Når **Create a person record from submissions** er avkrysset, kan du også sende en e-post til hver person som sender inn skjemaet. Fyll inn **Follow-up Email Subject** og **Follow-up Email Body** i skjemaets innstillinger. Du kan bruke tokenene `{firstName}` og `{churchName}` i begge. E-posten sendes bare når begge feltene er fylt ut.

:::info
Oppfølgings-e-poster sendes først når menigheten din er godkjent for å sende gruppe-e-post, og de teller mot menighetens daglige e-postgrense. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplisere et skjema {#duplicating-a-form}

For å bruke et skjema som utgangspunkt for et nytt, klikk **Duplicate** ved siden av skjemaet på listen over Forms og bekreft. Meldingen **Form duplicated** vises, og B1 lager en eksakt kopi av skjemaet – inkludert alle spørsmål – som du deretter kan gi nytt navn og redigere uavhengig.

:::tip
Duplisering er nyttig for gjentakende arrangementer der påmeldingsspørsmålene er de samme fra år til år. Dupliser fjorårets skjema, oppdater navnet og datoene, så er du klar.
:::

## Konfigurere skjemaegenskaper {#configuring-form-properties}

Du kan oppdatere skjemaets navn og innstillinger når som helst: åpne skjemaet og klikk **Edit Form** på venstre side av siden, eller klikk **Edit** ved siden av skjemaet på listen over Forms. Venstre side av skjemasiden viser skjematypen (**People** eller **Stand Alone**) og, for frittstående skjemaer, om det er **Public** eller **Restricted**, og den unike **public URL** som du kan dele med hvem som helst.

Innstillingene under **Edit Form** er:

- **Form Name** – navnet som vises i B1 Admin og øverst i skjemaet.
- **Description** *(Stand Alone)* – tekst som vises over spørsmålene på den offentlige skjemasiden, nyttig for å fortelle folk hva skjemaet er til før de begynner å fylle det ut.
- **Header Photo** *(Stand Alone)* – se [Legge til et bannerbilde](#adding-a-header-photo).
- **Form Access** *(Stand Alone)* – **Public** lar hvem som helst med lenken fylle ut skjemaet; **Restricted** krever at folk logger inn på menighetens nettside før de kan åpne det.
- **Set Form Availability Timeframe** *(Stand Alone)* – velg **Yes** og angi en **Availability Start Date** og **Availability End Date** for å ta imot innsendinger bare mellom disse datoene. Utenfor dem er skjemaet lukket.
- **Thank You Message** – det folk ser etter at de har sendt inn (se nedenfor).
- **Display Mode** – **Standard** viser alle spørsmål på én side; **Conversational (one question at a time)** går gjennom spørsmålene ett om gangen.
- **Create a person record from submissions** *(Stand Alone)*, **Linked group** og feltene for oppfølgings-e-post – se [Knytte et skjema til en gruppe](#linking-a-form-to-a-group) og [Sende en oppfølgings-e-post](#sending-a-follow-up-email).

Klikk **Save** for å beholde endringene. For å fjerne et skjema permanent klikker du **Delete** i skjemaets innstillinger og bekrefter; for å beholde det, men skjule det fra listen, [arkiverer](./index.md#what-you-can-do) du det i stedet.

### Legge til et bannerbilde {#adding-a-header-photo}

Frittstående skjemaer kan vise et **Header Photo** øverst i skjemaet. I skjemaets detaljer klikker du på bildeboksen eller **Add Photo**, og velger eller laster opp et bilde (det beskjæres til et format på 16:9). Klikk **Save**. Bildet vises under skjemaets navn, over beskrivelsen, på skjemaets offentlige nettadresse, og overalt der skjemaet er innebygd med elementet **Form** på nettstedet. Bruk **Change Photo** for å erstatte det, eller **Remove** for å fjerne det.

Bruk feltet **Thank You Message** til å angi hva folk ser etter at de har sendt inn skjemaet, også på skjemaets offentlige nettadresse. Hvis du lar det stå tomt, ser de «Thank you for submitting the form!»

:::tip
Frittstående skjemaer er gode for påmeldinger til arrangementer. Del den offentlige nettadressen via e-post eller sosiale medier, eller bygg skjemaet direkte inn på menighetens nettside.
:::

:::info
For å bygge inn et skjema på B1-nettstedet ditt, gå til nettstedsredigeringen, legg til en ny seksjon og velg elementet **Form**. Velg deretter skjemaet du vil vise. Se [Administrere sider](../website/managing-pages.md) for detaljer om redigering av nettstedet ditt.
:::
