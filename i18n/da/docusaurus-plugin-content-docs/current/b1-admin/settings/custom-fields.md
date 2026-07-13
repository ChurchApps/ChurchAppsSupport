---
title: "Brugerdefinerede felter"
---

# Brugerdefinerede felter

<div class="article-intro">

**Brugerdefinerede felter** lader dig registrere dine egne oplysninger på hver personregistrering — ting, som B1 ikke har et indbygget felt til, som en udløbsdato for et baggrundstjek, en T-shirt-størrelse eller en dåbsklassestatus. Du definerer et felt én gang i Indstillinger, udfylder derefter en værdi på hver persons profil og søger eller bygger lister på det. Dette erstatter den ældre løsning med at oprette en Folk-formular blot for at gemme et enkelt stykke brugerdefineret data.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Du har brug for redigeringstilladelse til **Folk** for at definere felter og udfylde værdier, samt adgang til området **Indstillinger**. Alle med visningstilladelse til Folk kan se værdierne. Se [Roller og tilladelser](./roles-permissions.md).
- Beslut, hvad du vil registrere, og hvilken type der passer bedst (tekst, et tal, en dato, et ja/nej-svar eller en valgliste), før du starter.

</div>

## Åbn brugerdefinerede felter

Gå til **Indstillinger** i venstre sidebar i B1 Admin, og vælg kortet **Brugerdefinerede felter**. Du kan også gå direkte dertil på **/settings/custom-fields**. Du vil se en liste over hvert felt, du har defineret, med dets **Navn** og **Felttype**. Hvis du ikke har oprettet nogen endnu, viser panelet *"Der er endnu ikke tilføjet nogen brugerdefinerede felter."*

## Tilføj et felt

1. Klik **Tilføj felt**.
2. I redigeringsvinduet, der åbnes til højre, skal du indtaste et **Navn** — dette er den etiket, personalet vil se på personprofiler og i søgning (for eksempel *Baggrundstjek udløber*).
3. Vælg en **Felttype**:
   - **Tekstfelt** — fritekst, kort.
   - **Helt tal** — tal uden decimaler (for eksempel et antal).
   - **Decimaltal** — tal, der kan indeholde decimaler.
   - **Dato** — en kalenderdato.
   - **Ja/Nej** — et simpelt ja- eller nej-svar.
   - **Multiple choice** — en valgliste. Når du vælger denne type, vises et valgredigeringsvindue, så du kan tilføje hver mulighed, folk kan vælge imellem.
4. Klik **Gem**.

Feltet er nu tilgængeligt på hver persons profil.

:::info
Felttyperne er det samme sæt, som bruges til [formularspørgsmål](../forms/creating-forms.md), så værdierne opfører sig konsistent på tværs af B1.
:::

## Rediger et felt

Klik på en vilkårlig feltrække i listen for at genåbne den i redigeringsvinduet. Ret navnet, typen eller mulighederne, og klik **Gem**.

:::warning
Ændring af **Felttype** for et felt, der allerede har værdier (for eksempel fra Tekstfelt til Dato), kan efterlade tidligere indtastede værdier i et format, der ikke længere matcher den nye type. Skift typer med forsigtighed, når personalet er begyndt at udfylde feltet.
:::

## Slet et felt

Åbn et felt til redigering, og klik **Slet**. Du bliver bedt om at bekræfte: *"Er du sikker på, at du vil slette dette brugerdefinerede felt? Dets gemte værdier vil også blive fjernet."* At slette et felt fjerner det permanent **og alle værdier, der er gemt for det**, hos alle personer — dette kan ikke fortrydes.

## Udfyld værdier på en person

Så snart mindst ét brugerdefineret felt findes, ligger dets værdier lige ved siden af de indbyggede detaljer på hver persons registrering — du ser dem i **Personlige oplysninger** og redigerer dem på den samme formular, du bruger til resten af personens oplysninger. Der vises ikke noget ekstra, før du har defineret dit første felt.

1. Åbn en persons registrering i **Folk**.
2. Klik på knappen **Rediger** (blyant) i sektionen **Personlige oplysninger**.
3. Rul ned til området **Brugerdefinerede felter** nederst i redigeringsformularen, og udfyld en værdi for hvert felt. Hvert felt viser det input, der matcher dets type — en datovælger for Dato-felter, en ja/nej-dropdown for Ja/Nej-felter, en valgliste for Multiple choice, og så videre.
4. Klik **Gem**. Dine værdier for brugerdefinerede felter gemmes sammen med resten af personens oplysninger.

Tilbage på profilen viser ethvert felt med en værdi sig nu i sektionen Personlige oplysninger (Ja/Nej-svar vises som Ja eller Nej, og Multiple choice viser mulighedens etiket). Felter, der er ladt tomme, er simpelthen skjult. For at fjerne en værdi skal du redigere personen, rydde feltet og gemme — en tom værdi slettes fra registreringen i stedet for at blive gemt som tom.

:::tip
Det klassiske anvendelsestilfælde er frivillig-sikkerhed: opret et **Dato**-felt kaldet *Baggrundstjek udløber*, registrer hver frivilligs dato, og byg derefter en [gemt liste](../people/lists.md), der markerer alle, hvis dato er overskredet.
:::

## Søgning og listeopbygning på brugerdefinerede felter

Brugerdefinerede felter kan søges fuldt ud:

1. Åbn [avanceret søgning](../people/searching-people.md) på siden **Folk**.
2. Udvid kategorien **Brugerdefinerede felter**.
3. Markér det felt, du vil filtrere på, vælg en operator, og indtast en værdi. De tilbudte operatorer matcher feltets type:
   - **Tekstfelt** — indeholder, er lig med, starter med, slutter med.
   - **Helt tal/decimaltal** — er lig med, større end, større end eller lig med, mindre end, mindre end eller lig med.
   - **Dato** — er lig med, efter (større end), før (mindre end).
   - **Ja/Nej** — er lig med Ja eller Nej.
   - **Multiple choice** — er lig med eller indeholder en af mulighederne.

Gem enhver brugerdefineret feltsøgning som en [liste](../people/lists.md). Lister er levende forespørgsler, så en liste bygget på *Baggrundstjek udløber er før i dag* tjekker hver person igen, hver gang du åbner den — ingen manuel vedligeholdelse.

## Hvad sker der ved sammenlægning

Når du [sammenlægger to personregistreringer](../people/adding-people.md), overføres værdier for brugerdefinerede felter automatisk. Personen, du beholder, bevarer sine egne værdier; for ethvert felt, hvor kun den fjernede person havde en værdi, kopieres den værdi over, så intet går tabt.

## Relaterede artikler

- [Søg folk](../people/searching-people.md) — avanceret søgning, inklusive kategorien Brugerdefinerede felter
- [Gemte lister](../people/lists.md) — gem en brugerdefineret feltsøgning og kør den igen live
- [Roller og tilladelser](./roles-permissions.md) — hvem der kan definere felter og redigere værdier
- [Opret formularer](../forms/creating-forms.md) — til dataindsamling med flere spørgsmål, hvor en fuld formular passer bedre end enkeltfelter
