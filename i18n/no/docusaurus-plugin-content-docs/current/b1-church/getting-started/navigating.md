---
title: "Navigere i B1App"
---

# Navigere i B1App {#navigating-b1app}

<div class="article-intro">

Medlemsportalen i B1.church er en telefonorientert nettapp som ligger under `/mobile`. Den fungerer i alle nettlesere og kan installeres på hjemskjermen din. Denne siden forklarer Hjem-dashbordet, fanelinjen nederst, Mer-siden og Meg-siden.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må være [logget inn](./logging-in.md) for å se din personlige informasjon. Besøkende som ikke er logget inn, kan fortsatt bla i offentlig innhold, og får en knapp **Logg inn** der en funksjon krever konto.

</div>

## Hjem {#home}

Når du åpner `https://yourchurchname.b1.church/mobile`, kommer du til dashbordet **Hjem** på `/mobile/dashboard`. Hjem er landingssiden i medlemsportalen. Den starter med en hilsen («God morgen», «God ettermiddag» eller «God kveld» med fornavnet ditt) og dagens dato, etterfulgt av seksjoner som bare vises når de er relevante:

- **Bildefliser** – faner kirken din har gitt et bilde (inkludert Dagens vers) vises som bildefliser under kirkens navn. Avhengig av kirkens valg vises de i et rutenett med to kolonner, som en rad du sveiper sideveis, eller som en liste med en liten miniatyr ved siden av hvert navn – se [Hjemskjermfliser](../../b1-admin/settings/mobile-app.md#home-screen-tiles). Hver bildefane vises her, selv om den også har en plass i fanelinjen.
- **Siste preken** – kirkens nyeste preken, med en lenke **Alle prekener**
- **Dagens vers** – dagens vers; trykk på det for å åpne hele siden [Dagens vers](../content/verse-of-the-day.md)
- **Du tjener** – de neste kommende tjenesteoppdragene dine, med en lenke **Alle planer**. Hvis et oppdrag fortsatt venter på svaret ditt, vises disse først med en badge **Trenger svar** og knappene **Aksepter** / **Avslå**, slik at du kan svare direkte fra Hjem (**Avslå** ber deg bekrefte først). Ellers viser de neste oppdragene dine en badge **Akseptert** eller **Bekreftet**. Trykk på et oppdrag for å åpne planen.
- **Dine grupper** – opptil tre av gruppene dine med møtetid og sted, og en lenke **Alle grupper**
- **Kommende arrangementer** – når du er logget inn, de neste tre kommende arrangementene fra gruppene du er med i, hver med dato og klokkeslett (og en miniatyr hvis arrangementet har et bilde). Trykk på et arrangement for å åpne gruppens arrangementer. Trykk på **Alle kommende arrangementer** for å åpne hele den kommende listen på [Meg-siden](./me-page.md#upcoming), som også inkluderer tjenesteoppdragene og påmeldingene dine.
- **Gaver** – hvor mye du har gitt i år («Gitt i» inneværende år), en knapp **Gi**, og en lenke **Historikk** til [gavehistorikken](../giving/donation-history.md). Skjult hvis kirken din har begrenset medlemmenes gavehistorikk til et tidligere år eller skjult den. I så fall vises kirkens gaveverktøy som en knapp under **Mer fra** i stedet.
- **Mer fra** *din kirke* – knapper for resten av verktøyene kirken din har slått på, og som ikke allerede er i fanelinjen eller vist over. De du bruker mest, flyttes først.

Seksjonene for tjeneste, grupper og gaver vises bare når du er logget inn, kirken din har slått på det verktøyet, og du har noe å vise – for eksempel et kommende oppdrag eller minst én gruppe. På en datamaskin vises Hjem i to kolonner.

Hvis du er logget ut, viser Hjem en overskrift **Velkommen** i stedet for hilsenen, med en kort melding («Logg inn for å se gruppene, gavene og mer.») og en knapp **Logg inn**. Meldingen vises selv om kirken din ikke har satt opp noe annet for Hjem ennå. Kirken din kan omformulere denne meldingen eller skjule den – se [Innstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du fortsatt logge inn fra **Mer**-siden eller **Meg**-siden.

## Fanelinjen nederst {#the-bottom-tab-bar}

På en telefon er en fanelinje festet nederst på skjermen:

- **Hjem** – alltid den første fanen
- Opptil tre av fanene kirken din har konfigurert
- **Mer** – åpner Mer-siden

Innebygde skjermer (som Grupper, Gaver eller Planer) får fanesplasser først. Ledige plasser går til kirkens egendefinerte sider. Bare lenker til eksterne nettsider og Dagens vers får aldri en fane. Hvis kirken din har konfigurert flere faner enn det er plass til, går ikke de andre tapt: de vises på **Mer**-siden og i seksjonen **Mer fra** på Hjem. Kirkeadministratorer setter rekkefølgen på fanene i B1 Admin under **Mobil → Navigasjon**.

## På en datamaskin {#on-a-computer}

På en bredere skjerm, som en datamaskin eller et stort nettbrett, erstattes fanelinjen nederst med en topptekst over skjermen i kirkens farge. Den viser kirkens logo, eller navnet hvis ingen logo er angitt (klikk på det for å komme tilbake til Hjem), **Hjem**, opptil fem av fanene kirken din har konfigurert, og **Mer**, med bjella og profilbildet ditt til høyre. Når du åpner en detaljskjerm, vises en lenke **Tilbake** over sideinnholdet.

## Mer-siden {#the-more-page}

Når du trykker på **Mer**, åpnes Mer-siden på `/mobile/more`. Den inneholder:

- Navnet og bildet ditt, med en lenke **Rediger profil** – se [Redigere profilen din](./editing-your-profile.md)
- Alle fanene kirken din har konfigurert, i rekkefølge, under kirkens navn. Lenker til eksterne nettsider åpnes i en ny nettleserfane.
- En seksjon **Konto** med:
  - **Meg** – din personlige side (kun for innloggede)
  - **Utseende** – bytt mellom **Lys modus** og **Mørk modus**
  - **Admin-portal** – vises bare hvis du har administratortilgang i kirken din; den åpner B1 Admin i en ny fane
  - **Installer appen** – åpner [installasjonsveiledningen](./installing-pwa.md) på `/mobile/install` (skjult når appen er installert)
- **Logg ut**, eller en knapp **Logg inn** hvis du er logget ut
- Kirkens navn og en lenke til personvernerklæringen

## Appbaren {#the-app-bar}

På en telefon viser linjen øverst på hver skjerm:

- Kirkens logo (eller navnet, hvis kirken ikke har lastet opp en logo) på Hjem og de andre hovedskjermene, eller en tilbakepil når du har gått inn i en detaljskjerm. Skjermens tittel vises øverst på selve siden.
- Et **bjelle**-ikon for varsler og meldinger, med en merkelapp for uleste elementer – se [Varsler og meldinger](#notifications-and-messages) nedenfor
- Profilbildet ditt, som åpner profilen din på `/mobile/profileEdit` – se [Redigere profilen din](./editing-your-profile.md)

Bjella og profilbildet vises bare når du er logget inn.

## Varsler og meldinger {#notifications-and-messages}

Når du trykker på bjella, åpnes et panel med to seksjoner:

- **Meldinger** – de nyeste private samtalene dine, med en lenke **Ny melding** for å starte en
- **Varsler** – de nyeste varslene dine, med en badge **Ny** på uleste. Trykk på et varsel for å gå til gruppen, planen eller samtalen det kom fra.

Hver seksjon viser hvor mange uleste elementer den har. Trykk på **Se alle** nederst for å åpne hele innboksen din på `/mobile/notifications`.

## Sider med seksjoner {#pages-with-sections}

Detaljsider – en gruppe, en plan, Meg-siden din, og skjermene Planer og Gaver – er bygget opp som én side med seksjoner i stedet for faner. Hver seksjon viser en kort forhåndsvisning, og en lenke i seksjonens topp (som **Alle medlemmer**, **Alle arrangementer** eller **Full gudstjenesteplan**) åpner hele listen. En lenke **Tilbake til** øverst i visningen tar deg tilbake til siden du kom fra.

## Meg-siden {#the-me-page}

**Meg** (`/mobile/me`) er din personlige hub. Den viser navnet og bildet ditt med knappene **Rediger profil** og **Innstillinger** ([varslingsinnstillinger](./notification-preferences.md)), og deretter hva som kommer for deg – tjenesteoppdrag, arrangementspåmeldinger og gruppearrangementer – etterfulgt av husstanden din, gruppene dine, [gavene dine](../giving/) i år, skjemaene du har sendt inn, oppmøtehistorikken din, [påmeldingene dine](../events/my-registrations.md), og de nyeste varslene og meldingene dine. Se [Meg-siden](./me-page) for detaljer.

Hvis du er logget ut, viser Meg-siden en knapp **Logg inn** i stedet.

## Installere på hjemskjermen {#installing-to-your-home-screen}

Medlemsportalen er en progressiv web-app (PWA). Gå til `/mobile/install` (eller velg **Installer appen** på Mer-siden) for trinn-for-trinn-veiledning for enheten din. Når den er installert, åpnes den i fullskjerm fra hjemskjermen uten nettleserelementer. Se [Installere som app (PWA)](./installing-pwa.md).

## Kirkens offentlige nettside {#your-churchs-public-website}

Utenfor medlemsportalen har kirkens offentlige nettside sin egen navigasjon i toppteksten, med lenker administratorene har konfigurert – sider som [prekener](../content/sermons.md), [Bibelen](../content/bible.md), [direktesending](../content/live-streaming.md) og en offentlig gruppeliste. På en telefon ligger disse lenkene bak hamburgerikonet øverst til høyre i toppteksten.

:::info
Fanene og verktøyene du ser, varierer fra kirke til kirke. Administratorer styrer hvilke seksjoner medlemmene kan se gjennom B1 Admin, så hvis du ikke ser en funksjon som beskrives her, har kirken din kanskje ikke slått den på.
:::
