---
title: "Legge til personer"
---

# Legge til personer

<div class="article-intro">

Personer-seksjonen er grunnlaget i B1 Admin — det er menighetens medlemsdatabase. Alle andre funksjoner (grupper, oppmøte, gaver, skjemaer) er knyttet til personposter. Denne veiledningen viser deg hvordan du legger til en person i databasen, redigerer detaljene deres og kobler familiemedlemmer sammen i husstander.

</div>

## Opplæringsvideo

<YouTube id="NTL1UDQpx8s" title="Adding People and Households in B1" next="Importing Your People Database in B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere personer. Se [Roller og tillatelser](roles-permissions.md) hvis du er usikker på hvilket tilgangsnivå du har.
- Hvis du legger til mer enn en håndfull personer, bør du vurdere å bruke [CSV-import](importing-data.md) i stedet.

</div>

## Legge til en person

1. Gå til B1.church Admin-dashbordet.
2. Åpne [Jump-menyen](../introduction.md#getting-around-with-the-jump-menu) (søkefeltet øverst til venstre), utvid **People**, og klikk på **People**.
3. Klikk på knappen **Add Person** i sidehodet. Siden ruller ned til skjemaet **Add New Person** under katalogen.
4. Fyll inn personens **First Name**, **Last Name** og **Email**, og klikk deretter på **Add**.

Personens profilside åpnes, klar for at du kan legge til flere detaljer.

:::tip
Hvis du flytter fra et annet system for menighetsadministrasjon, lar funksjonen [Import Data](importing-data.md) deg hente hele katalogen din fra en CSV-fil — det er mye raskere enn å legge til personer én etter én.
:::

### Advarsler om duplikater

Hvis e-postadressen (eller, når du oppretter en person fra det fullstendige redigeringsskjemaet, telefonnummeret eller samsvarende fornavn + etternavn + fødselsdato) samsvarer med noen som allerede finnes i databasen din, vises en dialog med **Possible Duplicate** før den nye posten lagres. Den viser hver samsvarende person sammen med e-post, telefon og fødselsdato, slik at du kan sammenligne.

- Klikk på **Use Existing** ved siden av en treff for å bruke den personens post i stedet for å opprette en ny.
- Klikk på **Create Anyway** for å legge til den nye personen selv om det ble funnet et mulig treff.

Dette sjekkes bare når du oppretter en helt ny person — redigering av en eksisterende post utløser aldri dialogen. Den forhindrer kun nye duplikater; den slår ikke sammen to poster som allerede finnes.

## Redigere detaljer

1. På personens profilside klikker du på knappen **Edit** under kontaktopplysningene på venstre side.
2. I skjemaet **Personal Details** fyller du inn tilleggsinformasjon som mellomnavn, medlemsstatus (**Visitor**, **Guest**, **Regular Attendee**, **Member**, **Staff**, **Inactive** eller **Deceased**), datoer, adresse, telefonnumre og (for barn og elever) klassetrinn og skole.
3. Klikk på **Save** for å lagre personopplysningene.

Venstre side av profilen viser personens bilde, navn, medlemsstatus, kontaktopplysninger, eventuelle verdier for [egendefinerte felt](../settings/custom-fields.md), og husstanden. Klikk på bildet for å endre det. Under knappen **Edit** finnes noen flere handlinger: **Workflow** (legg personen til i en [arbeidsflyt](../serving/workflows.md)), **Merge**, **Export** og **Export Data**.

Resten av profilen viser en oppsummeringsdel for hver type relatert informasjon:

- **Attendance** — Viser hvilke av de siste ukene personen var til stede, og de nyeste besøkene. Klikk på **All years** for hele besøkshistorikken, inkludert campus, gudstjeneste, gudstjenestetidspunkt, gruppe og en kolonne **Checked In** med tidspunktet for innsjekking i kiosken (vist som en strek for besøk som ikke er registrert med kioskinnsjekking), eller **Print** for å skrive det ut (utskriften har menighetens logo og navn sentrert øverst, over personens navn). For trender for hele menigheten i stedet for én persons historikk, se [Følge oppmøte](../attendance/tracking-attendance.md)
- **Donations** — Viser årets gaver, inkludert gaver til fond som ikke er fradragsberettigede. Klikk på **All years** for hele [gavehistorikken](../donations/recording-donations.md), eller **Log a gift** for å registrere en ny gave. Hvis menigheten din har slått på [Giving Privacy](../settings/church-settings.md#giving-privacy), forblir beløpene skjult til du klikker på **Show giving**
- **Groups** — Lister personens [gruppemedlemskap](../groups/group-members.md)
- **Notes** — Viser nylige notater om personen (sjelesorg, oppfølginger osv.). Klikk på **All notes** for å lese og legge til notater. Hvert notat viser hvem som skrev det, og datoen og klokkeslettet det ble lagt inn. For å se nylige notater for alle samtidig, bruk [Notes](./notes.md)-siden
- **Forms** — Lister personens skjemaer og om hvert av dem er sendt inn (se [Arbeide med skjemaer](#working-with-forms) nedenfor)

Når du åpner en av disse fullstendige visningene, klikker du på lenken **Back to** med personens navn øverst for å gå tilbake til profilen.

## Sende e-post til en person

Hvis personen har en e-postadresse registrert, vises en knapp **Email** under kontaktopplysningene på venstre side av profilen.

1. På personens profil klikker du på **Email**.
2. En dialog **Email** med personens navn i tittelen åpnes, og viser **Sending to** med personens adresse.
3. Velg eventuelt en lagret mal fra **Load Template (optional)**.
4. Skriv inn et **Subject** og skriv meldingen.
5. Klikk på **Send Email**.

For å skrive meldingen i ditt eget e-postprogram i stedet, klikk på **Open in my email app**.

:::info
Sending fra B1 bruker de samme godkjennings- og døgngrensene som gruppe-e-post. Hvis menigheten din ikke er godkjent ennå, ber dialogen deg om å be om en gjennomgang — du kan fortsatt klikke på **Open in my email app** i mellomtiden. Se [Slå på gruppe-e-post for menigheten din](../groups/group-members.md#turning-on-group-email-for-your-church). Brukere uten tillatelse til å redigere gruppemedlemmer går rett til e-postappen sin når de klikker på **Email**.
:::

## Arbeide med skjemaer

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan lage ved å følge veiledningen [Opprette skjemaer](../forms/creating-forms.md).

1. På personens profil finner du delen **Forms**. Den lister hvert skjema sammen med om det er **Submitted** eller **Not submitted**.
2. Klikk på et skjemas navn for å åpne det (eller klikk på **All forms** for å se hele listen).
3. Klikk på **redigeringsikonet** (blyant) på skjemaet, fyll inn detaljene, og klikk på **Save**.

Når et skjema er sendt inn, klikker du på **utskriftsikonet** ved siden av for å skrive ut personens utfylte svar.

Hvis en innsending havnet på feil person, klikker du på ikonet **Change person** (to piler) ved siden av den for å flytte den til noen andre eller koble den fra. Se [Endre personen på en innsending](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Skjemaer koblet til en persons profil bruker skjematypen **People**. Hvis du trenger et frittstående skjema (for eksempel en påmelding til et arrangement), se alternativet [Stand Alone form](../forms/creating-forms.md) i veiledningen for skjemaer.
:::

:::tip
Hvis du bare trenger å følge en eller to ekstra opplysninger om personer — en dato, et tall, et ja/nei-svar — bruk [Custom Fields](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle ut og kan søkes direkte i Advanced Search.
:::

## Administrere husstander {#managing-households}

Husstander lar deg koble familiemedlemmer sammen. Dette er spesielt nyttig for [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barna sine samtidig.

1. På en persons profil klikker du på **Edit** ved siden av overskriften **Household** på venstre side.
2. Redigeringsverktøyet for husstander åpnes. Velg **household role** for den gjeldende personen (f.eks. Head, Spouse, Child, Other).
3. Klikk på **Add**-ikonet for å legge til et annet husstandsmedlem.
4. Under **Add Household Member** skriver du personens navn i søkefeltet og trykker **Enter** eller klikker på søkeikonet. (Før du skriver, vises en kort liste over **Recent people**.)
5. Når personen dukker opp i resultatene, klikker du på navnet eller add-ikonet ved siden av.
6. Velg husstandsrollen deres og klikk på **Save** for å fullføre oppsettet av husstanden.
