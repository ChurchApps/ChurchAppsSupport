---
title: "Lagrede lister"
---

# Lagrede lister

<div class="article-intro">

**Lagrede lister** lar deg lagre en søkeforespørsel under et navn og kjøre det igjen med ett klikk når som helst. Bygg en liste en gang -- "Aktive medlemmer i avdeling Nord," "Besøkende de siste 90 dagene," eller en hvilken som helst avansert filter -- og det forblir i sidepanelet ditt slik at du aldri må bygge forespørselen igjen.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Kjør minst ett søk på menneskedelen slik at du har resultater å lagre. Se [Søk mennesker](./searching-people.md) eller [AI-søk](./ai-search.md).

</div>

## Lagre et søk som en liste

1. Kjør et søk på **mennesker**-siden -- et raskt søk, et AI-søk eller et avansert filtersøk.
2. Når resultater vises, vises en **Lagre som liste**-knapp (bokmerke-ikon) i mennesker-sidehoppteksten.
3. Klikk **Lagre som liste**.
4. Skriv inn et **navn** for listen (påkrevd).
5. Velg eventuelt en **kategori** for å gruppere relaterte lister sammen i sidepanelet (for eksempel "Oppsøk" eller "Medlemskap").
6. Klikk **Lagre**.

Listen er nå lagret på kirkens konto og vil vises på **Lagrede lister**-panelet på venstre side av mennesker-siden.

:::info
Lister deles på tvers av kirken -- alle med menneskestilgang kan se og laste dem. Bare personale med passende tillatelse kan gi nytt navn eller slette lister.
:::

## Lasting av en lagret liste

I **Lagrede lister**-panelet på venstre side av mennesker-siden, klikk et listenavn. Søket kjøres umiddelbart på nytt med den lagrede forespørselen, og oppdaterer resultat tabellen.

Lister er gruppert etter kategori (hvis du tildelte en), med kategoriserte lister som vises sist.

:::tip
Lister er **liveforespørsler**, ikke øyeblikksbilder. Hver gang du laster inn en liste, kjøres søket frisk mot de gjeldende dataene, så nye mennesker som nå samsvarer kriteriene vil vises.
:::

## Givng nytt navn og sletting av lister

Personale med administrerskortillelse kan gi nytt navn eller slette en hvilken som helst liste direkte fra Lagrede lister-panelet.

- Klikk **pennsymbolet** ved siden av et listenavn for å gi det nytt navn.
- Klikk **søppelbøtte-ikonet** for å slette det (du vil bli bedt om å bekrefte).

## Brukssaker

| Scenario | Slik bygger du listen |
|---|---|
| Alle besøkende | Avansert søk: MedlemskapsStatus = Besøkende |
| Medlemmer på en bestemt avdeling | Avansert søk: Avdeling = [din avdeling] |
| Mennesker uten en e-postadresse | Avansert søk: E-post er tom |
| Frivillige med en utgått bakgrunnssjekk | Avansert søk: [egendefinert felt](../settings/custom-fields.md) "Bakgrunnssjekk utløper" er før i dag |
| Resultater fra et AI-spørsmål | Still et spørsmål i AI-søk, deretter lagre |

## Relaterte artikler

- [Søk mennesker](./searching-people.md) -- raskt søk og kolonnene tilpasning
- [AI-søk](./ai-search.md) -- naturlige språkforespørsler du kan lagre som lister
- [Egendefinerte felt](../settings/custom-fields.md) -- definer dine egne menneskefelt, filtrer og lagre lister på dem
- [Demografika](./demographics.md) -- boring av et demografisk diagram til et menneskesfilter, deretter lagre det som en liste
- [Bulk redigering](./bulk-editing.md) -- etter lasting av en liste, masseredigering av alle medlemmene på en gang
