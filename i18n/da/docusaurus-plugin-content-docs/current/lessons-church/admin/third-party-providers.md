---
title: "Tredjepartsudbydere"
description: "Tilføj et Open Lesson Format-læseplansfeed på siden Eksterne udbydere på Lessons.church, og rediger eller slet det bagefter, så din menighed kan planlægge dets lektioner."
---

# Tredjepartsudbydere

<div class="article-intro">

Lessons.church understøtter eksterne læseplansudbydere gennem Open Lesson Format. Det betyder, at din menighed kan forbinde læseplaner fra andre organisationer og planlægge dem til jeres klasselokaler lige ved siden af det indbyggede bibliotek, så dit team har læseplaner fra flere kilder samlet ét sted.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Log ind på Lessons.church med en konto, der kan administrere din menigheds klasseplaner
- Hent feed-URL'en fra den eksterne udbyder, du vil forbinde. Den skal returnere lektioner i [Open Lesson Format](./open-lesson-format.md)

</div>

## Tilføj en udbyder

1. Klik på **External Providers** i navigationen på Lessons.church. Siden **External Lesson Providers** åbner.
2. Klik på **Add Provider**. Hvis du endnu ikke har tilføjet en, skal du i stedet klikke på **Add First Provider**.
3. Indtast et **Provider Name**. Det er navnet, dit team ser, når de vælger udbyderen.
4. Indtast **API URL'en**. Det er adressen, hvor udbyderen udgiver deres læseplan i Open Lesson Format.
5. Klik på **Save**.

Udbyderen tilføjes kun for din menighed. Den vises derefter som et valg under **Provider**, når du [planlægger en lektion](../classrooms/scheduling-lessons.md) for et klasselokale, og under **Source**, når du opbygger en [årsplan](./managing-year-plans.md).

## Administrer udbydere

Siden **External Lesson Providers** viser alle de udbydere, din menighed har tilføjet. Sådan ændrer du en:

- **Rediger** -- Klik på ikonet **Edit provider** (blyant), ændr **Provider Name** eller **API URL**, og klik på **Save**.
- **Slet** -- Klik på ikonet **Edit provider**, klik derefter på sletningsikonet (papirkurv) og bekræft.

## Hvad er Open Lesson Format?

Open Lesson Format er et standardiseret skema, der beskriver læseplansindhold -- programmer, studier, lektioner, lokationer, sektioner og handlinger -- på en struktureret måde. Enhver organisation, der udgiver sit indhold i dette format, kan tilføjes som udbyder i Lessons.church.

Hvis du er indholdsudbyder og gerne vil gøre din læseplan tilgængelig via Lessons.church, kan du finde den fulde skemadokumentation i vejledningen [Open Lesson Format](./open-lesson-format.md).

## Hvorfor bruge tredjepartsudbydere?

- **Flere valgmuligheder for menigheder** -- Menigheder kan gennemse en bredere vifte af læseplaner uden at forlade platformen.
- **Ét sted til alt** -- Frivillige og koordinatorer behøver ikke besøge flere hjemmesider for at finde og planlægge lektioner.
- **Nem opsætning** -- Det kræver kun et navn og en feed-URL at tilføje en udbyder. Der er ingen manuel dataindtastning eller filupload involveret.

:::info
Tredjepartsindhold administreres af den eksterne udbyder. Hvis du bemærker manglende eller forældet indhold fra en udbyder, skal problemet muligvis løses hos dem.
:::

:::tip
Hvis du vil se, hvordan lektioner fra en ekstern udbyder ser ud, når de er planlagt, kan du læse [Eksterne udbydere](../browsing/external-providers.md) i afsnittet Browsing.
:::
