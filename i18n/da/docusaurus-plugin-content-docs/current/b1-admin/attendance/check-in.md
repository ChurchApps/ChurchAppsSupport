---
title: "Selvbetjent check-in med B1 Checkin og B1 Admin"
sidebar_label: "Check-in"
description: "Opsæt selvbetjent check-in til gudstjenester med appen B1 Checkin i B1 Admin, herunder enheder, kiosk-konti, tidsplaner, branding og QR-gæstetilmelding."
---

# Check-in

<div class="article-intro">

B1 Admin understøtter selvbetjent check-in til gudstjenester via den tilhørende app **B1 Checkin**. Medlemmer kan selv checke sig ind, og deres familie med, ved kiosker eller dedikerede enheder, når de ankommer. Det gør processen hurtig og reducerer arbejdsbyrden for dine frivillige. Hvert check-in registreres automatisk som fremmøde.

</div>

<div class="prereqs">
<h4>Før du går i gang</h4>

- Dine kampusser, gudstjenestetider og grupper skal være konfigureret i [Fremmødeopsætning](setup.md).
- Du skal have [personer i din database](../people/adding-people.md) med [husstande](../people/adding-people.md#managing-households) opsat, så familier kan checke sig ind sammen.
- Du skal bruge en tablet og eventuelt en Brother-labelprinter (se [anbefalinger til hardware](#recommended-hardware) nedenfor).

</div>

## Sådan fungerer det

Appen B1 Checkin forbinder til din fremmødeopsætning i B1 Admin. Når et medlem checker ind, registreres fremmødet automatisk på det rigtige kampus, den rigtige gudstjenestetid og den rigtige gruppe. Du behøver ikke indtaste fremmøde manuelt for personer, der bruger check-in-systemet.

## Opsætning af check-in

1. **Konfigurer først din fremmødestruktur.** Gå til **Personer > Fremmøde** i B1 Admin, og klik på **Opsætning** for at sikre, at dine kampusser, gudstjenestetider og grupper er på plads. Check-in-appen er afhængig af denne konfiguration. Du kan eventuelt give hver gudstjenestetid en [check-in-plan](setup.md#setting-a-check-in-schedule), så check-in åbner og lukker automatisk hver uge. Planer bruger tidszonen for gudstjenestens kampus, eller din kirkes tidszone, hvis kampussen ikke har en angivet. Kiosken viser gudstjenestetider, hvor tidsvinduet er lukket, som **Lukket**, og fortæller familier, hvornår check-in åbner. Se [Fremmødeopsætning](setup.md) for detaljer.
2. **Installer appen B1 Checkin** på de enheder, du planlægger at bruge. Appen er tilgængelig på følgende platforme:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Android/Samsung-tablets:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Amazon Fire-tablets:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Log ind i appen B1 Checkin** med en konto, der har tilladelsen **Checkin** under fremmøde (eller **Rediger fremmøde**). Se [Kiosk-konti til check-in](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Vælg kampus og gudstjenestetid** for den aktuelle samling.
5. Medlemmer kan nu søge efter deres navn på enheden og checke ind.

:::tip
Placer check-in-enheder på synlige og lettilgængelige steder, f.eks. ved indgangen i foyeren eller ved velkomstdisken. En kort meddelelse under gudstjenesten hjælper medlemmer med at vide, at muligheden findes.
:::

:::tip
Hvis din kirke har flere kampusser, skal du gentage opsætningen for hvert kampus i [Fremmødeopsætning](setup.md). Hver check-in-enhed kan konfigureres til et forskelligt kampus.
:::

## Anbefalet hardware

**Tablets** — alle disse fungerer godt med appen:

- **Kompakt:** Samsung Galaxy Tab A7 Lite 8,7"
- **Stor skærm:** Samsung Galaxy Tab A8 10,5"
- **Budgetvenlig:** Amazon Fire HD 10

**Printere** — check-in fungerer med Brother-labelprintere til udskrivning af navneskilte:

- **Bedst:** Brother QL-1110NWB (understøtter flere tablets via Bluetooth og WiFi)
- **God:** Brother QL-810W (understøtter flere tablets via WiFi)
- **Budgetvenlig:** Brother QL-1100 (kun WiFi)

**Etiketter:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Kun Brother-labelprintere er kompatible med appen B1 Checkin. Printere fra andre mærker virker ikke til udskrivning af navneskilte.
:::

:::info
Følg din printers opsætningsvejledning for at forbinde den til det samme WiFi-netværk som din tablet. Du kan finde Brother-printerdrivere og opsætningsguides på [Brothers supportside](https://support.brother.com).
:::

## Tilpasning af kioskens udseende

Du kan tilpasse udseendet på appen B1 Checkin, så det matcher din kirkes branding. Gå til **Mobil > B1 CheckIn** i B1 Admin, og brug kortet **Kiosktema** til at konfigurere:

### Farver

Tilpas otte farveindstillinger, så de matcher din kirkes branding:

- **Primær** og **Primær kontrast** -- Hovedfarve for brandet og dens tekstfarve.
- **Sekundær** og **Sekundær kontrast** -- Accentfarve og dens tekstfarve.
- **Baggrund for sidehoved** og **Baggrund for underoverskrift** -- Farver til kioskens sidehovedområder.
- **Knapbaggrund** og **Knaptekst** -- Farver til interaktive knapper.

### Baggrundsbillede

Upload et valgfrit baggrundsbillede til kioskens velkomst- og opslagsskærme. Anbefalet størrelse er 1920x1080 pixels.

### Inaktiv skærm / pauseskærm

Konfigurer en pauseskærm, der aktiveres efter en periode uden aktivitet:

1. Slå den inaktive skærm **til** eller **fra**.
2. Angiv **timeout** (hvor mange sekunder uden aktivitet, før pauseskærmen starter, minimum 10 sekunder).
3. Tilføj et eller flere **slides** -- hvert slide har et billede og en visningstid (minimum 3 sekunder).

:::tip
Brug den inaktive skærm til at vise meddelelser, kommende begivenheder eller velkomstbeskeder, når kiosken ikke aktivt bruges.
:::

## Gæstetilmelding via QR-kode

Check-in-kiosken kan vise en QR-kode, som besøgende scanner for at tilmelde sig selv og deres familie på deres egen telefon. Det fremskynder check-in-processen for førstegangsgæster.

Når en gæst scanner QR-koden, føres de til en [side for gæstetilmelding](../../b1-church/checkin/guest-registration.md), hvor de indtaster deres families navne og eventuelle andre oplysninger, du vælger at spørge om. En frivillig kan derefter slå dem op på kiosken og checke dem ind.

### Aktivering af QR-gæstetilmelding

Sådan slår du visningen af QR-koden til:

1. Åbn i B1 Admin [hurtigmenuen](../introduction.md#getting-around-with-the-jump-menu) (søgefeltet øverst til venstre) og udvid **Mobil**.
2. Klik på **B1 CheckIn**.
3. Slå **QR-gæstetilmelding** til, og klik på **Gem**.

:::note
Denne indstilling findes under **Mobil > B1 CheckIn** (samme side som kortet **Kiosktema**), ikke under Fremmøde. Handlingen **Kiosk** på siden Fremmøde har et link til denne side.
:::

Når kontakten er slået til, vises de øvrige muligheder nedenfor i samme kort, **QR-gæstetilmelding**. Klik på **Gem** på kortet, efter du har ændret en af dem.

### Valg af tilmeldingsfelter

Tjeklisten **Tilmeldingsfelter** styrer, hvad tilmeldingsformularen spørger om. **Fornavn** og **Efternavn** er altid med i formularen og altid påkrævet for alle familiemedlemmer. For hvert andet felt skal du slå **Medtag** til for at tilføje det til formularen og derefter slå **Påkrævet** til, hvis gæster skal udfylde det. **Påkrævet** kan kun slås til for et medtaget felt, og når du slår **Medtag** fra, fjernes også **Påkrævet**.

| Felt | Spørges efter | Medtaget som standard |
|-------|-----------|---------------------|
| **Titel** | For hvert familiemedlem, som en rullemenu foran navnet (Hr., Fru, Frk., Dr., Prof., Pastor) | Nej |
| **E-mail** | Kun hovedkontakten | Ja (valgfri) |
| **Telefon** | For hvert familiemedlem. Når feltet er påkrævet, skal kun hovedkontakten udfylde det. | Ja (valgfri) |
| **Rolle i husstanden** | For hvert familiemedlem efter hovedkontakten -- Ægtefælle, Barn eller Andet. Hovedkontakten er leder af en ny husstand. Den, der ikke har en rolle, gemmes som Andet. | Ja (valgfri) |
| **Hjemmeadresse** | Én gang for familien -- gade, adresselinje 2, by, region og postnummer. Når feltet er påkrævet, skal alt undtagen adresselinje 2 udfyldes. Adressen gemmes på alle familiemedlemmer. | Nej |
| **Fødselsdato** | For hvert familiemedlem | Nej |
| **Køn** | For hvert familiemedlem | Nej |
| **Civilstand** | Kun hovedkontakten | Nej |
| **Klassetrin** | For hvert familiemedlem (PreK til 12. klasse, eller Færdiguddannet) | Nej |
| **Kommentarer** | Én gang, i en boks under familiemedlemmerne (op til 1.000 tegn) | Nej |

Felter, du slår fra, gemmes aldrig, selv hvis nogen sender dem til tilmeldingen på anden vis. Kommentarer gemmes som en note på hovedkontaktens profil (angivet som "Gæstetilmelding"), så du kan læse dem i afsnittet **Noter** på deres profil.

### Tilføjelse af gæster til en gruppe

Brug **Tilføj nye gæster til gruppe** for automatisk at placere alle, der tilmelder sig, i en af dine grupper -- f.eks. en gruppe for "Nye" eller en gruppe for ugens begivenhed. Vælg **Ingen** (standard), hvis du vil springe dette over. Gæster ser aldrig og vælger aldrig gruppen; den angives kun her. Skift den før hver begivenhed, så du kan følge op på begivenhedens gæster samlet.

### Registrering af fremmøde

Når en gruppe er valgt, vises en kontakt **Registrer også fremmøde**. Slå den til for at markere gæster som til stede, i det øjeblik de tilmelder sig, så du ikke behøver at checke dem ind separat.

Fremmøde registreres kun, hvis tilmeldingen sker under et af den valgte gruppes **planlagte** gudstjenestetider:

- Gruppen skal være knyttet til en eller flere gudstjenestetider, og disse gudstjenestetider skal have en [check-in-plan](setup.md#setting-a-check-in-schedule) (en **Dag** og et **Starttidspunkt**).
- "Under" betyder inden for gudstjenestetidens check-in-vindue -- fra **Åbn check-in**-minutterne før starten til **Luk check-in**-minutterne efter slutningen (eller efter starten, hvis der ikke er angivet et sluttidspunkt; hvis hverken sluttidspunkt eller lukkeminutter er angivet, til slutningen af den pågældende dag), i samme tidszone som check-in-planen bruger.
- Hvert familiemedlem markeres som til stede i gruppen for hver af dens gudstjenestetider, der er åben på det pågældende tidspunkt, på dagens dato.
- Tilmeldinger på andre tidspunkter, eller for en gruppe, hvis gudstjenestetider ikke har en plan, tilføjes til gruppen, men tælles ikke som fremmøde.

### Forsidebillede

Under **Forsidebillede** klikker du på **Skift billede** for at vælge eller uploade et billede (beskåret til 16:9), der vises øverst på tilmeldingssiden i stedet for standardikonet. Klik på **Fjern** for at gå tilbage til ikonet.

### Deling af tilmeldingslinket

Når QR-gæstetilmelding er aktiveret, vises et afsnit **Del QR-kode til tilmelding** nederst på kortet. Det giver dig to måder at få gæster hen til tilmeldingsformularen ud over QR-koden på kiosken:

- **Kopier link** -- kopierer tilmeldings-URL'en, så du kan indsætte den på din kirkes hjemmeside, i e-mails eller hvor som helst online.
- **Download PNG** -- downloader QR-koden som et billede, du kan udskrive på flyers, kirkeblade eller skilte.

:::tip
Tilføj tilmeldingslinket til din kirkes hjemmeside under siden "Planlæg dit besøg" eller "Jeg er ny", så gæster kan tilmelde sig, inden de overhovedet ankommer.
:::

### Hvad sker der, når en gæst har tilmeldt sig

B1 leder først efter personer, der allerede findes under **Personer**. Et familiemedlem matches med en eksisterende person, når præcis én person har samme fornavn og samme e-mail eller telefonnummer. Et barn, der indtastes uden e-mail eller telefon, matches på fornavn inden for den husstand, der blev matchet. Matchede personer genbruges uændret -- tilmeldingen ændrer aldrig deres oplysninger eller medlemsstatus -- og alle nye personer tilføjes til den matchede husstand.

Hvis ingen matcher, opretter tilmeldingen en ny husstand, navngivet efter hovedkontaktens efternavn, med en personpost for hvert familiemedlem. Alle nye føjes til **Personer** med medlemsstatus **Gæst**, og hovedkontakten er husstandens leder.

Matchede og nye personer føjes begge til den gruppe, du valgte (hvis de ikke allerede er i den), og deres fremmøde registreres, når det er slået til. Kommentarer gemmes som en note på hovedkontakten.

For at følge op automatisk kan du tilføje en [arbejdsgangsudløser](../serving/workflows.md#triggers), f.eks. **Person · Oprettet** med betingelsen *Medlemsstatus er Gæst*, eller **Gruppe · Medlem tilføjet** for den gruppe, du valgte ovenfor.

## Hvad der registreres

Hvert check-in opretter en fremmødepost i B1 Admin. Du kan se disse poster på siden [Fremmøde](tracking-attendance.md) og i hver [gruppes](../groups/group-members.md) samlinger, ligesom med manuelt indtastet fremmøde. Der er ingen forskel på, hvordan dataene vises -- begge metoder føder ind i de samme rapporter.
