---
title: "Legge til personer"
---

# Legge til personer

<div class="article-intro">

Personer-seksjonen er grunnlaget for B1 Admin -- kirkens medlemsdatabase. Alle andre funksjoner (grupper, oppmøte, gaver, skjemaer) er knyttet til personposter. Denne veiledningen viser deg hvordan du legger til noen i databasen, redigerer detaljene deres og knytter familiemedlemmer sammen i husholdninger.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på tilgangsnivået ditt.
- Hvis du legger til mer enn en håndfull personer, bør du vurdere å bruke verktøyet [CSV-import](importing-data.md) i stedet.

</div>

## Legge til en person

1. Gå til administrasjonsdashbordet til B1.church.
2. Åpne [hoppmenyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **Personer** og klikk **Personer**.
3. Klikk knappen **Legg til person** i sidetoppen. Siden ruller ned til skjemaet **Legg til ny person** under katalogen.
4. Fyll inn personens **Fornavn**, **Etternavn** og **E-post**, og klikk deretter **Legg til**.

Personens profilside åpnes, klar for at du kan legge til flere detaljer.

:::tip
Hvis du flytter fra et annet system for medlemsadministrasjon, lar funksjonen [Importer data](importing-data.md) deg hente hele katalogen din fra en CSV-fil -- det er mye raskere enn å legge til personer én om gangen.
:::

### Advarsler om duplikater

Hvis e-postadressen (eller, når du oppretter en person fra det fullstendige redigeringsskjemaet, telefonnummeret eller samme fornavn + etternavn + fødselsdato) samsvarer med noen som allerede finnes i databasen din, vises en dialog for **Mulig duplikat** før den nye posten lagres. Den lister opp hver samsvarende person med e-post, telefon og fødselsdato, slik at du kan sammenligne.

- Klikk **Bruk eksisterende** ved siden av et treff for å bruke den personens post i stedet for å opprette en ny.
- Klikk **Opprett likevel** for å legge til den nye personen selv om det ble funnet et mulig treff.

Dette sjekkes bare for duplikater når du oppretter en helt ny person -- redigering av en eksisterende post utløser den aldri. Den forhindrer bare nye duplikater; den slår ikke sammen to poster som allerede finnes.

## Redigere detaljer {#editing-details}

1. På personens profilside klikker du knappen **Rediger** under kontaktopplysningene på venstre side.
2. I skjemaet **Personlige detaljer** fyller du inn tilleggsinformasjon, for eksempel mellomnavn, medlemsstatus (**Besøkende**, **Gjest**, **Fast deltaker**, **Medlem**, **Ansatt**, **Inaktiv** eller **Avdød**), datoer, adresse, telefonnumre og (for barn og elever) klassetrinn og skole.
3. Klikk **Lagre** for å lagre personopplysningene.

Venstre side av profilen viser personens bilde, navn, medlemsstatus, kontaktopplysninger, eventuelle verdier for [egendefinerte felt](../settings/custom-fields.md) og husholdningen. Klikk på bildet for å endre det. Under knappen **Rediger** finnes noen flere handlinger: **Arbeidsflyt** (legg personen til en [arbeidsflyt](../serving/workflows.md)), **Slå sammen**, **Eksporter** og **Eksporter data**.

Resten av profilen viser en oppsummeringsseksjon for hver type relatert informasjon:

- **Oppmøte** -- Viser hvilke av de siste ukene personen deltok, og de siste besøkene deres. Klikk **Alle år** for hele besøkshistorikken, inkludert campus, gudstjeneste, gudstjenestetid, gruppe og en kolonne **Sjekket inn** med tidspunkt for innsjekking på kiosk (vist som en strek for besøk som ble registrert uten innsjekking på kiosk), eller **Skriv ut** for å skrive den ut. For trender for hele kirken i stedet for en persons historikk, se [Følge oppmøte](../attendance/tracking-attendance.md)
- **Gaver** -- Viser årets gaver, inkludert gaver til fond som ikke er fradragsberettigede. Klikk **Alle år** for hele [gavehistorikken](../donations/recording-donations.md), eller **Før en gave** for å registrere en ny. Hvis kirken din har slått på [givingsprivat](../settings/church-settings.md#giving-privacy), forblir beløpene skjult til du klikker **Vis giving**
- **Grupper** -- Lister personens [gruppemedlemskap](../groups/group-members.md)
- **Notater** -- Viser nylige notater om personen (sjelesorg, oppfølging osv.). Klikk **Alle notater** for å lese og legge til notater
- **Skjemaer** -- Lister personens skjemaer og om hvert av dem er sendt inn (se [Arbeide med skjemaer](#working-with-forms) nedenfor)

Når du åpner en av de fullstendige visningene, klikker du lenken **Tilbake til** med personens navn øverst for å gå tilbake til profilen.

## Sende e-post til en person

Hvis personen har en e-postadresse registrert, vises en knapp **E-post** under kontaktopplysningene på venstre side av profilen.

1. På personens profil klikker du **E-post**.
2. En dialog **E-post** med personens navn i tittelen åpnes, og viser **Sendes til** med personens adresse.
3. Velg eventuelt en lagret mal fra **Last inn mal (valgfritt)**.
4. Skriv inn et **Emne** og skriv meldingen.
5. Klikk **Send e-post**.

For å skrive meldingen i ditt eget e-postprogram i stedet, klikker du **Åpne i e-postappen min**.

:::info
Sending fra B1 bruker de samme godkjennings- og dagsgrensene som gruppe-e-post. Hvis kirken din ikke er godkjent ennå, ber dialogen deg om å be om en gjennomgang -- du kan fortsatt klikke **Åpne i e-postappen min** i mellomtiden. Se [Slå på gruppe-e-post for kirken din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere uten tillatelse til å redigere gruppemedlemmer går rett til e-postappen sin når de klikker **E-post**.
:::

## Arbeide med skjemaer {#working-with-forms}

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan lage ved å følge veiledningen [Opprette skjemaer](../forms/creating-forms.md).

1. På personens profil finner du seksjonen **Skjemaer**. Den lister hvert skjema sammen med om det er **Sendt inn** eller **Ikke sendt inn**.
2. Klikk på et skjemas navn for å åpne det (eller klikk **Alle skjemaer** for å se hele listen).
3. Klikk **redigeringsikonet** (blyant) på skjemaet, fyll inn detaljene og klikk **Lagre**.

Når et skjema er sendt inn, klikker du **utskriftsikonet** ved siden av for å skrive ut personens utfylte svar.

Hvis en innsending havnet på feil person, klikker du ikonet **Endre person** (to piler) ved siden av den for å flytte den til noen andre eller koble den fra. Se [Endre personen på en innsending](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Skjemaer koblet til en persons profil bruker skjematypen **Personer**. Hvis du trenger et frittstående skjema (for eksempel en arrangementspåmelding), se alternativet [Frittstående skjema](../forms/creating-forms.md) i veiledningen for skjemaer.
:::

:::tip
Hvis du bare trenger å følge en eller to ekstra opplysninger om personer -- en dato, et tall eller et ja/nei-svar -- bruk [egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle ut og kan søkes direkte i Avansert søk.
:::

## Administrere husholdninger {#managing-households}

Husholdninger lar deg knytte familiemedlemmer sammen. Dette er særlig nyttig for [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barna sine samtidig.

1. På en persons profil klikker du **Rediger** ved siden av overskriften **Husholdning** på venstre side.
2. Husholdningseditoren åpnes. Velg **husholdningsrollen** for den aktuelle personen (f.eks. Hovedperson, Ektefelle, Barn, Annen).
3. Klikk **Legg til**-ikonet for å legge til et nytt husholdningsmedlem.
4. Under **Legg til husholdningsmedlem** skriver du personens navn i søkefeltet og trykker **Enter** eller klikker søkeikonet. (Før du skriver, vises en kort liste over **Nylige personer**.)
5. Når personen vises i resultatene, klikker du på navnet deres eller Legg til-ikonet ved siden av.
6. Velg husholdningsrollen deres og klikk **Lagre** for å fullføre oppsettet av husholdningen.
