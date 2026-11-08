---
title: "Navigere i B1App"
description: "Finn frem i B1.church-medlemsportalen på telefon eller datamaskin: Hjem-oversikten, nedre fanelinje, Mer-siden og Meg-siden."
---

# Navigere i B1App

<div class="article-intro">

Medlemsportalen i B1.church er en telefonvennlig nettapp som ligger under `/mobile`. Den fungerer i alle nettlesere og kan installeres på startskjermen. Denne siden forklarer Hjem-oversikten, den nedre fanelinjen, Mer-siden og Meg-siden.

</div>

## Omvisningsvideo

<YouTube id="8XKRZvvAbXg" title="En omvisning i B1.church-medlemsappen" next="En omvisning i B1 Check-In" nextUrl="/docs/b1-checkin" />

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må være [logget inn](./logging-in.md) for å se din personlige informasjon. Besøkende som ikke er logget inn, kan fortsatt bla i offentlig innhold, og får en **Logg inn**-knapp der en funksjon krever konto.

</div>

## Hjem {#home}

Når du åpner `https://yourchurchname.b1.church/mobile`, kommer du til **Hjem**-oversikten på `/mobile/dashboard`. Hjem er startsiden i medlemsportalen. Den begynner med en hilsen («God morgen», «God ettermiddag» eller «God kveld» med fornavnet ditt) og dagens dato, etterfulgt av seksjoner som bare vises når de er relevante:

- **Bildefliser** -- faner som menigheten din har gitt et bilde (inkludert Dagens vers), vises som bildefliser under menighetens navn. Avhengig av menighetens valg er de ordnet i et tokolonnerutenett, en rad du sveiper sideveis (som også kan bevege seg av seg selv), eller en liste med en liten miniatyr ved siden av hvert navn. Se [Fliser på startskjermen](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Når den sideveis raden har flere fliser enn det får plass på skjermen, viser en rad med prikker under den hvor du er; trykk på en prikk for å hoppe til den flisen. Raden fortsetter å gå fremover og begynner på nytt med første flis etter den siste. Alle bildefaner vises her, også en som i tillegg har en plass i fanelinjen.
- **Siste preken** -- menighetens nyeste preken, med en lenke til **Alle prekener**
- **Dagens vers** -- dagens vers; trykk på det for å åpne hele siden [Dagens vers](../content/verse-of-the-day.md)
- **Du tjener** -- dine neste kommende tjenesteoppdrag, med en lenke til **Alle planer**. Hvis et oppdrag fortsatt venter på svar fra deg, vises disse først med et merke for **Venter på svar** og knappene **Godta** og **Avslå**, slik at du kan svare direkte fra Hjem (**Avslå** ber deg først om å bekrefte). Ellers viser dine neste oppdrag et merke for **Godtatt** eller **Bekreftet**. Trykk på et oppdrag for å åpne planen.
- **Dine grupper** -- opptil tre av gruppene dine med møtetid og sted, og en lenke til **Alle grupper**
- **Kommende arrangementer** -- når du er logget inn, vises dine tre neste kommende gruppearrangementer og arrangementspåmeldinger samlet, i datorekkefølge, hver med dato og klokkeslett (og en miniatyr hvis arrangementet har et bilde). Hver rad er merket **Arrangement** (et arrangement fra en gruppe du er med i) eller **Påmelding** (et arrangement du er [påmeldt](../events/registering.md)). Et arrangement du er påmeldt vises bare én gang, som en påmelding. Trykk på et arrangement for å åpne gruppens arrangementer, eller på en påmelding for å åpne [påmeldingene dine](../events/my-registrations.md). Trykk på **Alle kommende arrangementer** for å åpne hele listen på [Meg-siden](./me-page.md#upcoming), som også inkluderer tjenesteoppdragene og påmeldingene dine.
- **Min oppmøte** og **Mine skjemaer** -- hvis menigheten din slår dem på, hvor mange ganger du har deltatt de siste 90 dagene med dine to siste besøk, og dine to siste skjemainnsendinger, med lenker til de fullstendige listene. Disse vises alltid på [Meg-siden](./me-page.md) uansett -- se [Seksjoner på startskjermen](../../b1-admin/settings/mobile-app.md#home-screen-sections).
- **Gaver** -- hvor mye du har gitt i år («Gitt i» inneværende år), en **Gi**-knapp (vises bare når menigheten din tilbyr netthbaserte gaver) og en lenke til **Historikk** over [gavehistorikken din](../giving/donation-history.md). Skjult hvis menigheten har begrenset medlemmenes gavehistorikk til et tidligere år eller skjult den. I så fall vises menighetens gaveverktøy som en knapp under **Mer fra** i stedet.
- **Mer fra** *menighetens navn* -- knapper for resten av verktøyene menigheten har slått på, og som ikke allerede står i fanelinjen eller vises ovenfor. De du bruker mest, flyttes først.

Seksjonene for tjeneste, grupper, oppmøte, skjemaer og gaver vises bare når du er logget inn, menigheten har slått på verktøyet, og du har noe å vise -- for eksempel et kommende oppdrag eller minst én gruppe. På datamaskin er Hjem delt i to kolonner.

Hvis du ikke er logget inn, viser Hjem en overskrift **Velkommen** i stedet for hilsenen, med en kort melding («Logg inn for å se gruppene, gavene dine og mer.») og en **Logg inn**-knapp. Meldingen vises selv om menigheten ennå ikke har satt opp noe annet for Hjem. Menigheten din kan omformulere eller skjule denne meldingen -- se [Innstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du fortsatt logge inn fra **Mer**-siden eller **Meg**-siden.

## Den nederste fanelinjen

På telefon er en fanelinje festet nederst på skjermen:

- **Hjem** -- alltid den første fanen
- Opptil tre av fanene menigheten din har satt opp
- **Mer** -- åpner Mer-siden

Innebygde skjermer (som Grupper, Gaver eller Planer) får fanepluss først. Eventuelle ledige plasser går til menighetens egne sider. Bare lenker til eksterne nettsider og Dagens vers får aldri en fane. Hvis menigheten har satt opp flere faner enn det får plass til, går de ikke tapt: de vises på **Mer**-siden og i seksjonen **Mer fra** på Hjem. Menighetsadministratorer setter rekkefølgen på fanene i B1 Admin under **Mobil → Navigasjon**.

### Mappefaner {#folder-tabs}

Menigheten din kan samle flere faner i en **mappe**. En mappe vises som hvilken som helst annen fane -- i fanelinjen, på **Mer**-siden eller som en bildeflis på Hjem. Når du trykker på den, åpnes en skjerm med mappens navn, som viser fanene inni. Hvis alle fanene i mappen har et bilde, vises de som bildefliser; ellers vises de som en liste. Lenker til eksterne nettsider i en mappe åpnes i en ny nettleserfane. Faner inne i en mappe vises bare på mappens skjerm, ikke i fanelinjen eller på **Mer**-siden. En mappe uten noe du kan se, er skjult.

## På datamaskin

På en bredere skjerm, som en datamaskin eller et stort nettbrett, erstattes den nederste fanelinjen av en topptekst i menighetens farge. Den viser menighetens logo, eller navnet hvis ingen logo er angitt (klikk på det for å gå tilbake til Hjem), **Hjem**, opptil fem av fanene menigheten har satt opp, og **Mer**. Til høyre vises klokken og profilbildet ditt. Når du åpner en detaljskjerm, vises en lenke **Tilbake** over sideinnholdet.

## Mer-siden

Når du trykker på **Mer**, åpnes Mer-siden på `/mobile/more`. Den inneholder:

- Navnet og bildet ditt, med en lenke til **Rediger profil** -- se [Redigere profilen din](./editing-your-profile.md)
- Alle fanene menigheten har satt opp, i rekkefølge, under menighetens navn. Lenker til eksterne nettsider åpnes i en ny nettleserfane.
- En seksjon **Konto** med:
  - **Meg** -- din personlige side (bare for innloggede)
  - **Utseende** -- bytt mellom **Lyst modus** og **Mørkt modus**
  - **Administrasjonsportal** -- vises bare hvis du har administratortilgang i menigheten din; den åpner B1 Admin i en ny fane
  - **Installer appen** -- åpner [installasjonsveiledningen](./installing-pwa.md) på `/mobile/install` (skjules når appen er installert)
- **Logg ut**, eller en **Logg inn**-knapp hvis du ikke er logget inn
- Menighetens navn og en lenke til personvernerklæringen

## Appens toppfelt

På telefon viser feltet øverst på hver skjerm:

- Menighetens logo (eller navnet, hvis menigheten ikke har lastet opp en logo) på Hjem og de andre hovedskjermene, eller en tilbakepil når du har gått inn i en detaljskjerm. Skjermens tittel vises øverst på selve siden.
- Et **klokke**-ikon for varsler og meldinger, med et merke for uleste elementer -- se [Varsler og meldinger](#notifications-and-messages) nedenfor
- **Profilbildet** ditt, som åpner profilen din på `/mobile/profileEdit` -- se [Redigere profilen din](./editing-your-profile.md)

Klokken og profilbildet vises bare når du er logget inn.

## Varsler og meldinger

Når du trykker på klokken, åpnes et panel med to seksjoner:

- **Meldinger** -- dine siste private samtaler, med en lenke til **Ny melding** for å starte en ny
- **Varsler** -- dine siste varsler, med et merke for **Ny** på uleste. Trykk på et varsel for å gå til gruppen, planen eller samtalen det kommer fra.

Hver seksjon viser hvor mange uleste elementer den har. Trykk på **Se alle** nederst for å åpne hele innboksen din på `/mobile/notifications`.

## Sider med seksjoner

Detaljsider -- en gruppe, en plan, Meg-siden din, skjermene for Planer og Gaver -- er bygget opp som én side med seksjoner i stedet for faner. Hver seksjon viser en kort forhåndsvisning, og en lenke i seksjonens overskrift (som **Alle medlemmer**, **Alle arrangementer** eller **Hele gudstjenesteoppsettet**) åpner hele listen. En lenke **Tilbake til** øverst i visningen fører deg tilbake til siden du kom fra.

## Meg-siden

**Meg** (`/mobile/me`) er din personlige hub. Den viser navnet og bildet ditt med knappene **Rediger profil** og **Innstillinger** ([varslingsinnstillinger](./notification-preferences.md)). Deretter vises det som kommer for deg -- tjenesteoppdrag, arrangementspåmeldinger og gruppearrangementer -- etterfulgt av husstanden din, gruppene dine, [gavene dine](../giving/index.md) i år, skjemaene du har sendt inn, oppmøtehistorikken din, [påmeldingene dine](../events/my-registrations.md) og de siste varslene og meldingene dine. Se [Meg-siden](./me-page.md) for detaljer.

Hvis du ikke er logget inn, viser Meg-siden en **Logg inn**-knapp i stedet.

## Installere på startskjermen

Medlemsportalen er en progressiv nettapp (PWA). Gå til `/mobile/install` (eller velg **Installer appen** på Mer-siden) for trinnvise instruksjoner for enheten din. Når den er installert, åpnes den i fullskjerm fra startskjermen uten nettleserens verktøylinjer. Se [Installere som app (PWA)](./installing-pwa.md).

## Menighetens offentlige nettside

Utenfor medlemsportalen har menighetens offentlige nettside sin egen navigasjon i toppen, med lenker administratorene har satt opp -- sider som [preker](../content/sermons.md), [Bibelen](../content/bible.md), [direktesending](../content/live-streaming.md) og en offentlig gruppeliste. På telefon ligger disse lenkene bak hamburgerikonet øverst til høyre i toppteksten.

:::info
Fanene og verktøyene du ser, varierer fra menighet til menighet. Administratorer styrer hvilke seksjoner medlemmene kan se, gjennom B1 Admin. Hvis du ikke ser en funksjon som beskrives her, har menigheten din kanskje ikke slått den på.
:::
