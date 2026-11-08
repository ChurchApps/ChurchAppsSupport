---
title: "Navigering i B1App"
description: "Find rundt i B1.church-medlemsportalen på telefon eller computer: startsiden Hjem, bundens fanelinje, siden Mere og siden Mig."
---

# Navigering i B1App

<div class="article-intro">

Medlemsportalen i B1.church er en telefonorienteret webapp, der findes under `/mobile`. Den virker i enhver browser, og den kan installeres på din startskærm. Denne side forklarer startsiden Hjem, bundens fanelinje, siden Mere og siden Mig.

</div>

## Rundvisningsvideo

<YouTube id="8XKRZvvAbXg" title="En rundvisning i B1.church-medlemsappen" next="En rundvisning i B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Før du begynder</h4>

- Du skal være [logget ind](./logging-in.md) for at se dine personlige oplysninger. Besøgende, der ikke er logget ind, kan stadig gennemse offentligt indhold, og de får en knappen **Log ind**, hvor en funktion kræver en konto.

</div>

## Hjem {#home}

Når du åbner `https://yourchurchname.b1.church/mobile`, kommer du til startskærmen **Hjem** på `/mobile/dashboard`. Hjem er medlemsportalens forside. Den starter med en hilsen („God morgen", „God eftermiddag" eller „God aften" med dit fornavn) og dagens dato, efterfulgt af sektioner, der kun vises, når de er relevante:

- **Fotofliser** -- faner, som din kirke har tildelt et foto (herunder Dagens vers), vises som fotofliser under din kirkes navn. Afhængigt af din kirkes valg vises de i et todelt gitter, en række, du kan swipe sidelæns (som også kan bevæge sig af sig selv), eller en liste med et lille miniaturebillede ved siden af hvert navn -- se [Fliser på startskærmen](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Når rækken med sidelæns swipe har flere fliser, end der kan være på skærmen, viser en række prikker under den, hvor du er; tryk på en prik for at hoppe til den pågældende flise. Rækken fortsætter fremad og starter forfra med den første flise, når den sidste er nået. Alle fotofaner vises her, også en, der også har en plads i fanelinjen.
- **Seneste prædiken** -- din kirkes nyeste prædiken med et link til **Alle prædikener**
- **Dagens vers** -- dagens vers; tryk på det for at åbne hele siden [Dagens vers](../content/verse-of-the-day.md)
- **Du tjener** -- dine næste kommende tjenesteopgaver med et link til **Alle planer**. Hvis en opgave stadig venter på dit svar, vises de først med et mærke **Kræver svar** og knapperne **Accepter** / **Afvis**, så du kan svare direkte fra Hjem (**Afvis** beder dig om at bekræfte først). Ellers viser dine næste opgaver et mærke **Accepteret** eller **Bekræftet**. Tryk på en opgave for at åbne dens plan.
- **Dine grupper** -- op til tre af dine grupper med mødetidspunkt og sted samt et link til **Alle grupper**
- **Kommende begivenheder** -- når du er logget ind, vises dine næste tre kommende gruppebegivenheder og begivenhedstilmeldinger samlet i datorækkefølge, hver med dato og klokkeslæt (og et miniaturebillede, hvis begivenheden har et foto). Hver række er mærket **Begivenhed** (en begivenhed fra en gruppe, du er medlem af) eller **Tilmelding** (en begivenhed, du er [tilmeldt](../events/registering.md)); en begivenhed, du er tilmeldt, vises kun én gang, som en tilmelding. Tryk på en begivenhed for at åbne begivenhederne i dens gruppe, eller på en tilmelding for at åbne dine [tilmeldinger](../events/my-registrations.md). Tryk på **Alle kommende begivenheder** for at åbne hele listen over kommende begivenheder på din [side Mig](./me-page.md#upcoming), som også omfatter dine tjenesteopgaver og tilmeldinger.
- **Mit fremmøde** og **Mine formularer** -- hvis din kirke har slået dem til, vises hvor mange gange du har deltaget i de seneste 90 dage med dine to seneste besøg, og dine to seneste formularindsendelser, med links til de fulde lister. Disse vises altid på din [side Mig](./me-page.md), uanset hvad -- se [Sektioner på startskærmen](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Giving** -- hvor meget du har givet i år („Givet i" det aktuelle år), en knap **Giv** (kun vist, når din kirke tilbyder online-giving) og et link til **Historik** til din [donationshistorik](../giving/donation-history.md). Skjult, hvis din kirke har begrænset medlemmernes givehistorik til et tidligere år eller har skjult den. I så fald vises din kirkes givværktøj i stedet som en knap under **Mere fra**.
- **Mere fra** *din kirke* -- knapper til de øvrige værktøjer, din kirke har slået til, og som ikke allerede står i fanelinjen eller vises ovenfor. Dem du bruger mest, flytter sig forrest.

Sektionerne for tjenester, grupper, fremmøde, formularer og giving vises kun, når du er logget ind, din kirke har slået det pågældende værktøj til, og du har noget at vise -- for eksempel en kommende opgave eller mindst én gruppe. På en computer er Hjem opdelt i to kolonner.

Hvis du ikke er logget ind, viser Hjem overskriften **Velkommen** i stedet for hilsenen, med en kort opfordring („Log ind for at se dine grupper, giving og meget mere.") og knappen **Log ind**. Opfordringen vises, også selvom din kirke endnu ikke har sat noget andet op på Hjem. Din kirke kan omformulere denne opfordring eller skjule den -- se [Indstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du stadig logge ind fra siden **Mere** eller siden **Mig**.

## Bundens fanelinje

På en telefon er en fanelinje fastgjort til bunden af skærmen:

- **Hjem** -- altid den første fane
- Op til tre af de faner, din kirke har konfigureret
- **Mere** -- åbner siden Mere

Indbyggede skærme (som Grupper, Giving eller Planer) får fanepladserne først; eventuelle ledige pladser går til din kirkes egne sider. Kun links til eksterne websteder og Dagens vers får aldrig en fane. Hvis din kirke har konfigureret flere faner, end der er plads til, går de resterende ikke tabt: de vises på siden **Mere** og i afsnittet **Mere fra** på Hjem. Kirkeadministratorer angiver fanernes rækkefølge i B1 Admin under **Mobil → Navigation**.

### Mappefaner {#folder-tabs}

Din kirke kan gruppere flere faner i en **mappe**. En mappe vises ligesom enhver anden fane -- i fanelinjen, på siden **Mere** eller som en fotoflise på Hjem -- og når du trykker på den, åbnes en skærm med mappens navn, der lister de faner, den indeholder. Hvis alle faner i mappen har et foto, vises de som fotofliser; ellers vises de som en liste. Links til eksterne websteder i en mappe åbnes i en ny browserfane. Faner i en mappe vises kun på mappens skærm, ikke i fanelinjen eller på siden **Mere**. En mappe uden noget, du kan se, er skjult.

## På en computer

På en bredere skærm, som en computer eller en stor tablet, erstattes bundens fanelinje af en header øverst på skærmen i din kirkes farve. Den viser din kirkes logo, eller dens navn hvis der ikke er et logo (klik på det for at vende tilbage til Hjem), **Hjem**, op til fem af de faner, din kirke har konfigureret, og **Mere**, med klokken og dit profilbillede til højre. Når du åbner en detaljeskærm, vises et link **Tilbage** over sidens indhold.

## Siden Mere

Når du trykker på **Mere**, åbnes siden Mere på `/mobile/more`. Den indeholder:

- Dit navn og billede med et link til **Rediger profil** -- se [Redigering af din profil](./editing-your-profile.md)
- Alle de faner, din kirke har konfigureret, i rækkefølge under din kirkes navn. Links til eksterne websteder åbnes i en ny browserfane.
- Et afsnit **Konto** med:
  - **Mig** -- din personlige side (kun når du er logget ind)
  - **Udseende** -- skift mellem **Lys tilstand** og **Mørk tilstand**
  - **Administratorportal** -- vises kun, hvis du har administratorrettigheder i din kirke; det åbner B1 Admin i en ny fane
  - **Installer app** -- åbner [installationsvejledningen](./installing-pwa.md) på `/mobile/install` (skjult, når appen er installeret)
- **Log ud**, eller knappen **Log ind**, hvis du ikke er logget ind
- Din kirkes navn og et link til privatlivspolitikken

## App-bjælken

På en telefon viser bjælken øverst på hver skærm:

- Din kirkes logo (eller dens navn, hvis din kirke ikke har uploadet et logo) på Hjem og de øvrige hovedskærme, eller en tilbagepil, når du er gået ind i en detaljeskærm. Skærmens titel vises øverst på selve siden.
- Et **klokke**-ikon til notifikationer og beskeder med et mærke for ulæste elementer -- se [Notifikationer og beskeder](#notifications-and-messages) nedenfor
- Dit **profilbillede**, der åbner din profil på `/mobile/profileEdit` -- se [Redigering af din profil](./editing-your-profile.md)

Klokken og profilbilledet vises kun, når du er logget ind.

## Notifikationer og beskeder

Når du trykker på klokken, åbnes et panel med to afsnit:

- **Beskeder** -- dine seneste private samtaler med et link til **Ny besked** for at starte en ny
- **Notifikationer** -- dine seneste notifikationer med et mærke **Ny** på de ulæste. Tryk på en notifikation for at gå til gruppen, planen eller samtalen, den stammer fra.

Hvert afsnit viser, hvor mange ulæste elementer det har. Tryk på **Se alle** nederst for at åbne din fulde indbakke på `/mobile/notifications`.

## Sider med sektioner

Detaljesider -- en gruppe, en plan, din side Mig, skærmene Planer og Giving -- er opbygget som én side med sektioner i stedet for faner. Hver sektion viser en kort forhåndsvisning, og et link i sektionens overskrift (som **Alle medlemmer**, **Alle begivenheder** eller **Fuld gudstjenesteorden**) åbner den fulde liste. Et link **Tilbage til** øverst i visningen fører dig tilbage til den side, du kom fra.

## Siden Mig

**Mig** (`/mobile/me`) er dit personlige knudepunkt. Den viser dit navn og billede med knapperne **Rediger profil** og **Indstillinger** ([præferencer for notifikationer](./notification-preferences.md)). Derefter vises, hvad der venter dig -- tjenesteopgaver, begivenhedstilmeldinger og gruppebegivenheder -- efterfulgt af din husstand, dine grupper, dine [givninger](../giving/index.md) i år, de formularer, du har indsendt, din fremmødehistorik, dine [tilmeldinger](../events/my-registrations.md) og dine seneste notifikationer og beskeder. Se [Siden Mig](./me-page.md) for detaljer.

Hvis du ikke er logget ind, viser siden Mig i stedet en knap **Log ind**.

## Installation på din startskærm

Medlemsportalen er en progressiv webapp (PWA). Besøg `/mobile/install` (eller vælg **Installer app** på siden Mere) for trin-for-trin-vejledning til din enhed. Når den er installeret, åbnes den på fuld skærm fra din startskærm uden browserens værktøjslinjer. Se [Installation som app (PWA)](./installing-pwa.md).

## Din kirkes offentlige websted

Uden for medlemsportalen har din kirkes offentlige websted sin egen navigation i headeren med links, dine administratorer har konfigureret -- sider som [prædikener](../content/sermons.md), [Bibelen](../content/bible.md), [livestreaming](../content/live-streaming.md) og en offentlig gruppeliste. På en telefon findes disse links bag hamburgerikonet øverst til højre i headeren.

:::info
De faner og værktøjer, du ser, varierer fra kirke til kirke. Administratorer styrer, hvilke sektioner medlemmerne kan se, via B1 Admin, så hvis du ikke ser en funktion, der beskrives her, har din kirke muligvis ikke slået den til.
:::
