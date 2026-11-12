---
title: "Legge til personer"
description: "Legg til en person i kirkens database i B1 Admin, fyll ut detaljene deres, og koble familiemedlemmer til husstander for innsjekking og rapportering."
---

# Legge til personer

<div class="article-intro">

Seksjonen Personer er grunnlaget for B1 Admin. Den er kirkens medlemsdatabase. Alle andre funksjoner (grupper, oppmøte, gaver, skjemaer) er knyttet til personposter. Denne veiledningen viser deg hvordan du legger noen til i databasen, redigerer detaljene deres og kobler familiemedlemmer til husstander.

</div>

## Opplæringsvideo {#training-video}

<YouTube id="GtsczJ8JPio" title="Legge til personer og husstander i B1" next="Importere personregisteret ditt i B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Hvis du legger til mer enn en håndfull personer, bør du vurdere å bruke verktøyet [CSV-import](importing-data.md) i stedet.

</div>

## Legge til en person {#adding-a-person}

1. Gå til dashbordet i B1.church Admin.
2. Åpne [Hurtigmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer**, og klikk på **Personer**.
3. Klikk på knappen **Legg til person** i sidetoppen. Siden ruller ned til skjemaet **Legg til en ny person** under katalogen.
4. Fyll ut personens **Fornavn** og **Etternavn** (begge er påkrevd). Du kan valgfritt legge til **Tittel**, **E-post** og **Mobiltelefon**, og deretter klikke på **Legg til** (eller trykke **Enter**).

B1 oppretter en ny husstand for personen, med navnet etter etternavnet.

Personens profilside åpnes, klar for at du legger til flere detaljer.

:::tip
Hvis du flytter fra et annet system for kirkeadministrasjon, lar funksjonen [Importer data](importing-data.md) deg hente hele katalogen din fra en CSV-fil. Det er mye raskere enn å legge til personer én og én.
:::

### Advarsler om duplikater {#duplicate-warnings}

Når du skriver inn en e-postadresse i skjemaet **Legg til en ny person**, sjekker B1 for duplikater før lagring. Hvis e-postadressen (eller, når du oppretter en person fra det fulle redigeringsskjemaet, telefonnummeret eller samme fornavn + etternavn + fødselsdato) samsvarer med noen som allerede finnes i databasen din, vises dialogen **Mulig duplikat** før den nye posten lagres. Den viser hver samsvarende person sammen med e-post, telefon og fødselsdato, slik at du kan sammenligne.

- Klikk på **Bruk eksisterende** ved siden av et treff for å bruke den personens post i stedet for å opprette en ny.
- Klikk på **Opprett likevel** for å legge til den nye personen selv om det ble funnet et mulig treff.

Dette sjekker bare duplikater når du oppretter en helt ny person. Redigering av en eksisterende post utløser aldri sjekken. Den forhindrer bare nye duplikater. Den slår ikke sammen to poster som allerede finnes.

## Redigere detaljer {#editing-details}

1. På personens profilside klikker du på knappen **Rediger** til venstre, under seksjonen **Husstand**.
2. I skjemaet **Personlige detaljer** fyller du ut tilleggsinformasjon, for eksempel en **Tittel** (velg Mr, Mrs, Miss, Ms, Dr, Prof, Rev eller Pastor fra listen, eller skriv din egen, opptil 10 tegn), mellomnavn, kallenavn, **Merknader til navneskilt** (skrives ut på navneskilt ved innsjekking og vises som et advarselsmerke på profilen), **Givernummer**, medlemsstatus (**Besøkende**, **Gjest**, **Fast deltaker**, **Medlem**, **Ansatt**, **Inaktiv** eller **Død**), kjønn, sivilstatus, fødselsdato og bryllupsdag, kampus, adresse, telefonnumre med lokalnummer, og (for barn og elever) klassetrinn og skole. Kryss av for **Skjul meg fra medlemskatalogen** for å utelate personen fra [utskriftskatalogen](./print-directory.md) og appens medlemskatalog. Eventuelle [egendefinerte felt](../settings/custom-fields.md) vises under **Egendefinerte felt**.
3. Klikk på **Lagre** for å lagre personopplysningene, eller **Avbryt** for å lukke skjemaet uten å lagre.

Hvis du endrer adressen til noen som deler husstand med andre, spør B1 om du vil bruke den nye adressen for hele husstanden. Skjemaet har også en **Slett**-knapp (for å slette personen) og en seksjon **Datahåndtering** for å eksportere eller anonymisere personens data (se [Datasikkerhet](../settings/data-security.md#using-the-data-management-tools)).

Venstre side av profilen viser personens bilde, navn, alder, kjønn, sivilstatus, kampus, medlemsstatus, kontaktopplysninger, eventuelle verdier for [egendefinerte felt](../settings/custom-fields.md) og husstanden. Merkelapper under navnet viser når personen **Har innlogging** (en B1-konto), er **Skjult fra katalog**, eller har merknader til navneskilt. Over husstanden viser **Lagt til** datoen posten ble opprettet (bare for personer som er lagt til siden slutten av oktober 2026). Klikk på bildet for å endre det. Under husstanden finner du knappene **Rediger**, **E-post** og **Tekst** (se under), og noen flere handlinger: **Arbeidsflyt** (legg personen til i en [arbeidsflyt](../serving/workflows.md)), **Slå sammen**, **Eksporter** og **Eksporter data**. Hvis personen tilhører en husstand, viser seksjonen **Henting** hvem som har lov til å hente barn ved [innsjekking](../attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).

Resten av profilen viser en oppsummeringsseksjon for hver type relatert informasjon:

- **Oppmøte**: Viser hvilke av de siste ukene personen var til stede, og de nyeste besøkene. Klikk på **Alle år** for hele besøkshistorikken, inkludert kampus, gudstjeneste, gudstjenestetid, gruppe og en kolonne **Sjekket inn** med tidspunktet for innsjekking ved kiosk (vist som en strek for besøk som er registrert uten innsjekking ved kiosk). Eller klikk på **Skriv ut** for å skrive den ut (utskriften har kirkens logo og navn sentrert øverst, over personens navn). For trender for hele kirken i stedet for én persons historikk, se [Følge oppmøte](../attendance/tracking-attendance.md)
- **Gaver**: Viser årets gaver, inkludert gaver til fond som ikke er fradragsberettigede. Klikk på **Alle år** for hele [gavehistorikken](../donations/recording-donations.md), eller **Før en gave** for å registrere en ny. Hvis kirken din har slått på [personvern for gaver](../settings/church-settings.md#giving-privacy), forblir beløpene skjult til du klikker på **Vis gaver**
- **Grupper**: Lister personens [gruppemedlemskap](../groups/group-members.md), med **Ble med** og datoen de ble med i hver gruppe når den er registrert
- **Notater**: Viser nylige notater om personen (pastoral omsorg, oppfølging osv.). Klikk på **Alle notater** for å lese og legge til notater. Hvert notat viser hvem som skrev det, og datoen og klokkeslettet det ble lagt ut. For å formatere et notat markerer du tekst i notatfeltet og velger **Fet**, **Kursiv**, **Punktliste** eller **Nummerert liste** fra den lille popup-menyen (eller trykk **Ctrl+B** / **Ctrl+I**, **Cmd** på Mac). Notatet viser formateringen når det er lagt ut. Når du sletter et notat, må du bekrefte først, fordi det ikke kan angres. For å se nylige notater for alle samtidig, bruk siden [Notater](./notes.md)
- **Skjemaer**: Lister personens skjemaer og om hvert av dem er sendt inn (se [Arbeide med skjemaer](#working-with-forms) nedenfor)
- **Forespørsler og påmeldinger**: Lister personens forespørsler om rom og ressurser for [arrangementer](../calendars/approvals.md) (med rommene eller ressursene som er bedt om, og **Venter**, **Godkjent** eller **Avvist**) og personens [påmeldinger til arrangementer](../calendars/paid-registrations.md) (med hvor mange personer de meldte på, og **Påmeldt**, **Venter**, **På venteliste** eller **Kansellert**), nyeste først. De fem siste vises. Klikk på **Alle forespørsler** for hele listen. Du ser forespørsler om arrangementer hvis du kan bruke siden [Godkjenninger](../calendars/approvals.md), og påmeldinger hvis du kan se påmeldinger. Uten noe av dette er seksjonen skjult

Når du åpner en av disse fullstendige visningene, klikker du på lenken **Tilbake til** med personens navn øverst for å gå tilbake til profilen.

## Sende e-post til en person {#emailing-a-person}

Hvis personen har en e-postadresse registrert, vises en knapp **E-post** ved siden av **Rediger**, under husstanden til venstre på profilen.

1. På personens profil klikker du på **E-post**.
2. En dialog **E-post** med personens navn i tittelen åpnes. Den viser **Sendes til** med personens adresse.
3. Du kan valgfritt velge en lagret mal fra **Last inn mal (valgfritt)**.
4. Skriv inn et **Emne** og skriv meldingen.
5. Klikk på **Send e-post**.

For å skrive meldingen i ditt eget e-postprogram i stedet, klikk på **Åpne i e-postappen min**.

:::info
Sending fra B1 bruker de samme godkjennings- og døgngrensene som e-post til grupper. Hvis kirken din ikke er godkjent ennå, ber dialogen deg om å be om en gjennomgang. Du kan fortsatt klikke på **Åpne i e-postappen min** i mellomtiden. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere uten tillatelse til å redigere gruppemedlemmer går rett til e-postappen sin når de klikker på **E-post**.
:::

## Sende tekstmelding til en person {#texting-a-person}

Hvis kirken din har en [tekstmeldingsleverandør](../settings/church-settings.md#texting) koblet til, du har tillatelse til å sende tekstmeldinger, og personen har et mobilnummer, vises en knapp **Tekst** ved siden av **E-post**. Klikk på den, skriv inn **Melding**, og klikk på **Send**. Dialogen viser nummeret teksten går til. Se [Sende tekstmeldinger til gruppemedlemmer](../groups/group-members.md#texting-group-members) for hvordan tekstmeldinger fungerer.

## Arbeide med skjemaer {#working-with-forms}

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan bygge ved å følge veiledningen [Lage skjemaer](../forms/creating-forms.md).

1. På personens profil finner du seksjonen **Skjemaer**. Den lister hvert skjema, og om det er **Sendt inn** eller **Ikke sendt inn**.
2. Klikk på et skjemanavn for å åpne det (eller klikk på **Alle skjemaer** for å se hele listen).
3. Klikk på **redigeringsikonet** (blyant) for skjemaet, fyll ut detaljene, og klikk på **Lagre**.

Når et skjema er sendt inn, klikker du på **utskriftsikonet** ved siden av for å skrive ut personens utfylte svar. Når personen har én innsending av et skjema, viser skjemaet **Sendt inn** med datoen over svarene.

Hvis en innsending havnet på feil person, klikker du på ikonet **Bytt person** (to piler) ved siden av den for å flytte den til noen andre eller koble den fra. Se [Bytte personen på en innsending](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Skjemaer som er koblet til en persons profil bruker skjematypen **Personer**. Hvis du trenger et frittstående skjema (for eksempel en påmelding til et arrangement), se alternativet [Frittstående skjema](../forms/creating-forms.md) i veiledningen for skjemaer.
:::

:::tip
Hvis du bare trenger å spore en eller to ekstra opplysninger om personer, for eksempel en dato, et tall eller et ja/nei-svar, bruk [Egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle ut, og du kan søke i dem direkte i Avansert søk.
:::

## Administrere husstander {#managing-households}

Husstander lar deg koble familiemedlemmer sammen. Dette er særlig nyttig ved [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barna sine samtidig.

1. På en persons profil klikker du på **Rediger** ved siden av overskriften **Husstand** til venstre.
2. Redigeringsverktøyet for husstanden åpnes. Velg **husstandsrollen** for den nåværende personen (f.eks. Hode, Ektefelle, Barn eller Annen).
3. Klikk på **Legg til**-ikonet for å legge til et nytt husstandsmedlem.
4. Under **Legg til husstandsmedlem** skriver du personens navn i søkefeltet og trykker **Enter** eller klikker på søkeikonet. (Før du skriver, vises en kort liste over **Nylige personer**: de du valgte sist i et personsøk, og deretter de nyeste personene i B1.)
5. Når personen vises i resultatene, klikker du på navnet deres eller legg-til-ikonet ved siden av.
6. Velg husstandsrollen deres og klikk på **Lagre** for å fullføre oppsettet av husstanden.

Hvis personen ikke finnes i B1 ennå, klikker du på **Legg til ny person** under søket i stedet. I tillegg til navn, tittel, e-post og mobiltelefon ber dialogen om **husstandsrollen** deres (Hode, Ektefelle, Barn eller Annen). Den nye personen opprettes og plasseres i denne husstanden med den rollen. Klikk på **Lagre** for å fullføre.
