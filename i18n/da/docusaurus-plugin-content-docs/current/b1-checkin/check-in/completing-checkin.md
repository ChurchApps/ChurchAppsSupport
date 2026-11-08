---
title: "Afslutning af check-in"
description: "Fuldfør en families kiosk-check-in i B1 Checkin, herunder rumgrænser, udskrivning af etiketter, sikkerhedskoder til afhentning, og hvad appen gør derefter."
---

# Afslutning af check-in

<div class="article-intro">

Når du har gennemgået din husstand og foretaget eventuelle nødvendige gruppetildelinger, er du klar til at afslutte check-in. Dette er det sidste trin i kiosk-arbejdsgangen -- appen indsender fremmøde, udskriver etiketter og nulstiller til næste familie.

</div>

<div class="prereqs">
<h4>Før du begynder</h4>

- [Gennemgå din husstand](./household-review.md) på skærmen for gennemgang af husstanden
- [Tildel grupper](./group-assignment.md) til familiemedlemmer, der skal checke ind i en bestemt klasse eller et bestemt program
- Tilvalg: [Tilføj eventuelle gæster](./adding-guests.md), der besøger sammen med din familie

</div>

## Sådan checker du ind

1. Tryk på knappen **Check-in** nederst på skærmen for **gennemgang af husstanden**.
2. Appen indsender fremmødedataene til serveren og viser en **successkærm** med et grønt flueben og en velkomstbesked.

Det er alt, der skal til. Din families fremmøde er nu registreret.

Hvis en af de personer, du har valgt, allerede er checket ind til denne gudstjeneste i dag, vises først et vindue med titlen **Allerede checket ind**, der nævner dem. Tryk på **Check ind igen** for at gemme deres nye gruppevalg, eller på **Annuller** for at vende tilbage til husstandsskærmen.

## Fulde rum og frivilligrationer

Hvis din kirke har konfigureret [sikkerhedsgrænser](../../b1-admin/attendance/checkin-safety.md) for sine rum, kontrollerer serveren dem, før data gemmes:

- Hvis et valgt rum er **fuldt eller lukket**, gennemføres check-in ikke, og appen angiver rummet, så du kan vælge et andet.
- Hvis gudstjenestetidspunktet har en [check-in-plan](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), og dets check-in-vindue ikke er åbent i øjeblikket, afvises check-in til rummene for dette gudstjenestetidspunkt også. Skærmen **Kan ikke checke ind endnu** viser rummet med årsagen "check-in er ikke åben lige nu". Tryk på **Skift rum** for at vælge et andet gudstjenestetidspunkt eller en anden gruppe. (Gudstjenestetidspunkter, der allerede er lukket, vises som **Lukket** på [husstandsskærmen](./household-review.md) og kan ikke vælges, så du vil normalt kun se denne besked, hvis et vindue lukker, mens en check-in er i gang.)
- En husstand, der har checket ind til et tidligere gudstjenestetidspunkt, kan senere vende tilbage og tilføje et åbent gudstjenestetidspunkt, også selvom det tidligere vindue er lukket. Deres eksisterende check-ins bevares og forhindrer ikke den nye check-in i at blive afvist.
- Hvis et børnerum har **for få frivillige** i forhold til sin normering, viser appen enten en advarsel, som en medarbejder kan bekræfte for at fortsætte, eller blokerer check-in helt -- afhængigt af hvordan din kirke har konfigureret håndhævelse af normeringen.

## Udskrivning af etiketter

Hvis en netværksprinter er konfigureret, udskriver appen automatisk etiketter efter check-in:

- **Navneetiketter** udskrives for hver person, der er tildelt en gruppe, hvor indstillingen **Udskriv navneskilt** er aktiveret. Navneetiketter indeholder personens navn, deres gruppetildeling og eventuelle allergi- eller bemærkningsoplysninger, hvis der er registreret nogen.
- **Afhentningsslips til forældre** udskrives, når en af de checkede personer er i en gruppe, hvor indstillingen **Afhentning af forældre** er aktiveret. Personer, der er checket ind som **frivillig**, springes over, så en børnepasser, der tjener i et rum med afhentning af forældre, ikke får et afhentningsslip. Afhentningsslippet viser børnene, deres gruppetildelinger og en unik **sikkerhedskode på 4 tegn**.

:::info
Den samme sikkerhedskode står både på barnets navneetiket og på forælderens afhentningsslip. Ved afhentning bruger frivillige koderne til at kontrollere, at den rigtige voksne henter hvert barn.
:::

Sikkerhedskoden genereres på ny for hver check-in og bruger kun konsonanter og cifre (vokaler er udelukket for at undgå, at der dannes upassende ord).

:::warning
Hvis etiketter ikke udskrives, skal du åbne Administratorindstillinger ved at trykke på **kirkens logo** syv gange og derefter trykke på **Skift printer** for at kontrollere forbindelsen til printeren. Se [Opsætning af printer](../getting-started/printer-setup.md) for fejlfindingstrin.
:::

## Hvad sker der efter check-in

- Hvis en printer er konfigureret, udskriver appen alle etiketter og vender derefter automatisk tilbage til **opslagsskærmen**, klar til næste familie.
- Hvis ingen printer er konfigureret, vender appen også automatisk tilbage til **opslagsskærmen**.

I begge tilfælde forbliver successkærmen synlig i mindst 6 sekunder fra det øjeblik, den vises (8 sekunder, når den fejrer en persons fremmødemilepæl), så familier kan se, at check-in lykkedes. Hvis udskrivningen tager længere tid end det, vender appen tilbage cirka halvandet sekund efter, at udskrivningen er færdig.

Du behøver ikke at trykke på noget for at vende tilbage til opslagsskærmen -- appen håndterer overgangen automatisk. Når skærmen har været synlig et øjeblik, kan du trykke på den for at vende tilbage med det samme; et tryk i de første halvandet sekund ignoreres, så et hurtigt dobbeltklik på **Check-in** ikke springer skærmen over.

:::tip
Appen nulstilles fuldstændigt efter hver check-in, så der er ingen risiko for, at én familie ser en anden families oplysninger.
:::

## Hvad der registreres

Når du trykker på **Check-in**, sender appen følgende til serveren for hvert husstandsmedlem, der har en gruppetildeling:

- Den **person**, der checkes ind
- Den **gudstjeneste**, de deltager i
- Det **gudstjenestetidspunkt** og den **gruppe**, de er tildelt

Disse data vises i B1 Admin under afsnittet Fremmøde, hvor kirkens administratorer kan se og administrere fremmederegistreringer. Se [vejledningen til administration af check-in](../../b1-admin/attendance/check-in.md) for detaljer.
