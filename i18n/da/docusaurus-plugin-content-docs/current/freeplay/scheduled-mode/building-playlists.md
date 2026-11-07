---
title: "Tilslutning af udbydere og opbygning af afspilningslister"
description: "Opsæt forbundne indholdsudbydere i FreePlay Admin, og byg, arrangér og forhåndsvis playlister til planlagte tv-skærme."
---

# Tilslutning af udbydere og opbygning af afspilningslister

<div class="article-intro">

En afspilningsliste er en løkke af billeder og videoer, som du lægger i kalenderen. I FreePlay Admin forbinder du dine indholdsudbydere én gang for hele kirken. Derefter opbygger du afspilningslister ved at vælge filer fra de udbydere.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- Log ind på FreePlay Admin på [admin.freeplay.church](https://admin.freeplay.church)
- Have loginoplysningerne til de udbyderkonti, du vil forbinde, f.eks. Dropbox eller OneDrive

</div>

## Tilslutning af udbydere

Siden **Udbydere** viser dine indholdskilder i to afsnit:

- **Tilsluttet** - Udbydere, du kan bruge med det samme. Offentlige udbydere, der ikke kræver login, såsom Lessons.church og Bible Project, vises altid her som **Offentlig · kræver ikke login**. Forbundne konti viser **Konto forbundet** og hvornår forbindelsen udløber.
- **Tilgængelig** - Udbydere, der kræver, at du logger ind, før du kan bruge dem.

Sådan tilslutter du en udbyder:

1. Gå til **Udbydere**.
2. Find udbyderen under **Tilgængelig**, og klik på **Forbind**.
3. Log ind på din konto hos den udbyder:
   - Nogle udbydere, såsom Dropbox, Google Drev og OneDrive, åbner et loginvindue. Hvis intet vises, skal du tillade pop-ups for admin.freeplay.church.
   - Andre udbydere viser et link og en kode. Besøg linket, indtast koden, og godkend adgangen. Dialogen opdateres automatisk, når du er færdig.
4. Når du ser **Konto forbundet**, flytter udbyderen til **Tilsluttet**.

Tilsluttede udbydere har tre handlinger:

- **Gennemse** - Gennemgå udbyderens mapper
- **Opdater** - Forny udbyderens login
- **Frakobl** - Afbryd forbindelsen til kontoen

:::info
Udbyderforbindelser i FreePlay Admin tilhører hele kirken, ikke en enkelt person eller ét tv. Planlagte skærme henter deres filer gennem disse forbindelser, så du behøver ikke logge ind hos hver udbyder på hvert tv.
:::

**FreeShow** vises som **På dit kirkenetværk · hvert tv finder det selv**. Der er intet at forbinde for den i FreePlay Admin.

## Siden Afspilningslister

Siden **Afspilningslister** viser hver afspilningsliste med antal elementer, samlet varighed, hvor den bruges (**Standardløkke** for en gruppe, eller antal planlægninger) og hvornår den sidst blev opdateret. Hver række har disse handlinger:

- **Præsenter** - Afspil afspilningslisten på fuld skærm i din browser
- **Rediger** - Åbn afspilningslisteredigeringen
- **Dupliker** - Lav en kopi med navnet "(kopi)"

## Oprettelse af en afspilningsliste

1. Gå til **Afspilningslister**, og klik på **Tilføj afspilningsliste**.
2. Indtast et **Navn**, f.eks. "Velkomstløkke".
3. Klik på **Tilføj afspilningsliste**. Redigeringen af afspilningslisten åbnes.

## Tilføjelse af elementer

Redigeringen af afspilningslisten viser din afspilningslistes **Elementer** til venstre og **Tilføj fra udbyder** til højre.

1. Vælg en udbyderfane til højre. For at tilføje en anden kilde skal du klikke på **Forbind en anden**, som åbner siden **Udbydere**.
2. Klik på mapper for at gå ind i dem. Brug brødkrummestien til at gå tilbage op.
3. Klik på en fil for at tilføje den til slutningen af afspilningslisten. Filer, der allerede er på afspilningslisten, er markeret som valgt.
4. For at tilføje alt i den aktuelle mappe på én gang skal du klikke på **Tilføj alle**. Knappen viser, hvor mange filer der endnu ikke er på afspilningslisten.
5. Klik på **Gem** øverst i redigeringen.

:::warning
Ændringer gemmes først, når du klikker på **Gem**. Klik på **Annuller** for at forlade uden at gemme.
:::

## Ordning af elementer

På listen **Elementer** til venstre:

- **Omarranger** - Træk et element i det håndtag, der står til venstre
- **Billedtidspunkt** - Billeder vises i 10 sekunder som standard. Ændr antallet af sekunder ved siden af et billede
- **Videoer** - Videoer viser **Spiller til slut** og kører hele deres længde
- **Fjern** - Tag et element ud af afspilningslisten

Oversigten øverst viser antallet af elementer og afspilningslistens samlede længde.

## Omdøbning, duplikering og sletning

Panelet til venstre i redigeringen viser, hvor afspilningslisten bruges. Det har også disse handlinger:

- **Præsenter** - Afspil afspilningslisten i din browser
- **Omdøb** - Ændr afspilningslistens navn
- **Dupliker** - Lav en kopi, der kan redigeres separat
- **Slet** - Fjern afspilningslisten. Planlægninger, der afspiller den, falder tilbage til gruppens standardløkke

## Præsentation af en afspilningsliste i din browser

Klik på **Præsenter** for at afspille afspilningslisten på fuld skærm i din browser. Det er nyttigt til at forhåndsvise en afspilningsliste eller til at køre den fra en bærbar computer, der er tilsluttet en projektor. Flyt musen for at vise kontrollinjen, og brug derefter disse taster:

| Tast | Handling |
|---|---|
| **Mellemrum** | Pause eller genoptag |
| **←** / **→** | Forrige eller næste element |
| **F** | Skift fuld skærm |
| **Esc** | Afslut |

## Relaterede artikler

- **[Planlægning af kalenderen](./scheduling-the-calendar.md)** - Sæt din afspilningsliste i kalenderen for en skærmgruppe
- **[Administration af skærme og grupper](./managing-screens.md)** - Sæt en afspilningsliste som en gruppes standardløkke
- **[Indholdsudbydere](../content-providers/index.md)** - Udbydere, du kan forbinde direkte på tv'et
