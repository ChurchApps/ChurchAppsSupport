---
title: "Legge til mennesker"
---

# Legge til mennesker

<div class="article-intro">

Menneskedelen er grunnlaget for B1 Admin -- det er kirkens medlemsdatabase. Alle andre funksjoner (grupper, frammøte, donasjoner, skjemaer) knyttes tilbake til personpostene. Denne veiledningen tar deg gjennom å legge til noen i databasen, redigere detaljene og knytte familiemedlemmer til husstander.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du trenger en aktiv B1 Admin-konto med tillatelse til å administrere mennesker. Se [Roller & Tillatelser](roles-permissions.md) hvis du er usikker på tilgangnivået ditt.
- Hvis du legger til mer enn en håndful mennesker, bør du vurdere å bruke [CSV-importverktøyet](importing-data.md) i stedet.

</div>

## Legge til en person

1. Naviger til B1.church Admin-instrumentbordet.
2. Klikk på **Mennesker** i venstre sidepanel.
3. Klikk **Legg til person**-knappen øverst til høyre.
4. Fyll inn personens fornavn, etternavn og e-postadresse, og klikk deretter **Legg til**.

Personens profilside åpnes, klar for deg å legge til flere detaljer.

:::tip
Hvis du migrerer fra et annet kirkestyringssystem, lar [Importdata](importing-data.md)-funksjonen deg bringe hele katalogen inn fra en CSV-fil -- mye raskere enn å legge til mennesker en av gangen.
:::

## Redigering av detaljer

1. På personens profilside, klikk **rediger blyant** ved siden av deres navn.
2. Fyll inn ytterligere informasjon som mellompnavn, medlemskapsStatus, datoer, adresse og telefonnumre.
3. Klikk **Lagre** for å lagre personlig informasjon.

Profilen inneholder også flere faner for relatert informasjon:

- **Merknader** — Legg til merknader om personen (pastoral omsorg, oppfølginger osv.)
- **Grupper** -- Vis og administrer [gruppemedlemskap](../groups/group-members.md)
- **Frammøte** -- Vis [frammøteposter](../attendance/tracking-attendance.md)
- **Donasjoner** -- Vis [donasjonhistorikk](../donations/recording-donations.md)

## Arbeid med skjemaer

Du kan fylle ut egendefinerte skjemaer direkte fra en persons profil. Dette er brukerdefinerte skjemaer som du kan bygge ved å følge [Opprett skjemaer](../forms/creating-forms.md) guide.

1. På personens profil, klikk **Skjemaer**-rullegardinmenyen for å velge et skjema.
2. Klikk **Legg til skjema** for å åpne det.
3. Fyll inn skjemadetaljer og klikk **Lagre**.

:::info
Skjemaer knyttet til en persons profil bruker **Mennesker**-skjematypen. Hvis du trenger et frittstående skjema (som en begivenhetersregistrering), se [alternativet Stand Alone form](../forms/creating-forms.md) i skjemaoppgaven.
:::

:::tip
Hvis du bare trenger å spore ett eller to ekstra stykker informasjon om mennesker -- en dato, et tall, et ja/nei-svar -- bruk [egendefinerte felt](../settings/custom-fields.md) i stedet for et skjema. De er raskere å fylle inn og er søkbare direkte i avansert søk.
:::

## Administrering av husstander

Husstander lar deg knytte familiemedlemmer sammen. Dette er spesielt nyttig for [innsjekking](../attendance/check-in.md), der en forelder kan sjekke inn alle barnas på en gang.

1. På en persons profil, klikk **rediger blyant** ved siden av husstandsnavnet.
2. Husstandsredigeringsprogrammet åpnes. Velg **husstandsrollen** for den gjeldende personen (f.eks. hode, ektefelle, barn).
3. Klikk **Legg til** for å legge til et annet husstandsmedlem.
4. Skriv inn personens navn i søkeboksen og klikk **Søk**.
5. Når personen vises i søkeresultatene, klikk **Velg**.
6. Velg deres husstandsrolle og klikk **Lagre** for å fullføre husstandsoppsettet.
