---
title: "Gennemgang af anmodninger om sletning af konto"
description: "Godkend eller afvis medlemmers anmodninger om kontosletning i B1 Admin, send dem via Directory Approval Group og overhold GDPR-fristen på 30 dage."
---

# Gennemgang af anmodninger om sletning af konto

<div class="article-intro">

Når en kirke har konfigureret en godkendelsesgruppe til medlemsfortegnelsen, sker kontosletning ikke længere med det samme. Et medlems anmodning bliver til en opgave, som din godkendelsesgruppe gennemgår, før noget bliver fjernet. Denne side forklarer, hvordan anmodningen laves, hvordan du godkender eller afslår den, og hvad der sker i hvert tilfælde.

</div>

<div class="prereqs">
<h4>Inden du begynder</h4>

- En **godkendelsesgruppe til medlemsfortegnelsen** skal være konfigureret under **Mobil &rarr; Medlemsportal**. Uden en sådan gruppe sletter et klik på **Slet min konto** på profilsiden stadig kontoen med det samme, uden et gennemgangstrin. Se [Indstillinger for mobilappen](../settings/mobile-app.md).
- For at godkende eller afslå en anmodning kræves tilladelsen **Personer &gt; Rediger**.

</div>

## Sådan anmoder et medlem om sletning

Kontosletning anmodes om fra siden **Min profil**, den fælles kontoside, der er beskrevet i [Administration af din profil](./managing-profile.md), under sektionen **Kontosletning**. Når en godkendelsesgruppe er konfigureret, sletter bekræftelse af anmodningen ikke noget med det samme. I stedet sker følgende:

1. Der oprettes en åben opgave med titlen **„Anmodning om kontosletning“**, tildelt godkendelsesgruppen til medlemsfortegnelsen, under **Tjeneste &rarr; Mit arbejde**.
2. Knappen **Slet min konto** deaktiveres for personen, og der vises en meddelelse om, at anmodningen afventer gennemgang.

Hvis der indsendes en ny anmodning, mens en tidligere stadig er åben, genåbnes den samme opgave. En person kan kun have én afventende anmodning om sletning ad gangen.

## Gennemgang af en anmodning

1. Gå til **Tjeneste &rarr; Mit arbejde** (eller **Tildelt til mine grupper** på dit dashboard, det samme sted hvor [anmodninger om profilændringer](./approving-profile-changes.md) vises).
2. Åbn opgaven med titlen **„Anmodning om kontosletning fra *Navn*“**.
3. Du ser to handlinger: **Godkend sletning** og **Afslå**.

### Godkendelse

Bekræft med **„Anonymisere denne persons oplysninger permanent og fjerne deres login? Dette kan ikke fortrydes.“** Dette erstatter personens personlige oplysninger med generiske værdier (den samme anonymisering, som bruges af handlingen **Datahåndtering &gt; Anonymisér** på en persons registrering, se [Datasikkerhed](../settings/data-security.md)), og fjerner deres login. Opgaven lukkes automatisk, og medlemmet får besked om, at deres anmodning er godkendt.

### Afslag

Ved afslag skal du angive en begrundelse, fordi GDPR kun tillader at afvise en anmodning om sletning på grundlag af en juridisk undtagelse:

- **Lovpligtig opbevaring** (donations-, skatte- eller ansættelsesregistreringer)
- **Nødvendig for et juridisk krav**
- **Andet**: forklar i tekstfeltet (mindst 10 tegn)

Medlemmet får besked om beslutningen sammen med den begrundelse, du har angivet, og kan indsende deres anmodning igen eller klage til en tilsynsmyndighed, hvis de er uenige.

:::info
Kirker har 30 dage til at besvare en anmodning om sletning. Opgaven har en frist på 28 dage, og godkendelsesgruppen modtager automatiske påmindelser, hvis opgaven stadig er åben efter 21 og 27 dage.
:::

:::tip
Anmodninger om sletning og anmodninger om profilændringer bruger den samme godkendelsesgruppe til medlemsfortegnelsen og den samme opgavebaserede gennemgangsproces. Se [Godkendelse af profilændringer](./approving-profile-changes.md), hvis du også skal gennemgå anmodninger om opdatering af medlemsfortegnelsen.
:::

## Relaterede artikler

- [Administration af din profil](./managing-profile.md): Hvor medlemmer anmoder om sletning af deres egen konto
- [Godkendelse af profilændringer](./approving-profile-changes.md): Den lignende gennemgangsproces for anmodninger om opdatering af medlemsfortegnelsen
- [Datasikkerhed](../settings/data-security.md): GDPR-overholdelse og anonymisering startet af administratorer
- [Indstillinger for mobilappen](../settings/mobile-app.md): Konfiguration af godkendelsesgruppen til medlemsfortegnelsen
