---
title: "Navigere i B1App"
---

# Navigere i B1App

<div class="article-intro">

Medlemsportalen i B1.church er en telefonorientert webapp som ligger under `/mobile`. Den fungerer i alle nettlesere og kan installeres på startskjermen. Denne siden forklarer Hjem-oversikten, den nederste fanelinjen, Mer-siden og Meg-siden.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må være [logget inn](./logging-in.md) for å se din personlige informasjon. Besøkende som ikke er logget inn kan fortsatt bla i offentlig innhold, og får tilbud om en knapp **Logg inn** der en funksjon krever konto.

</div>

## Hjem {#home}

Når du åpner `https://yourchurchname.b1.church/mobile`, kommer du til oversikten **Hjem** på `/mobile/dashboard`. Hjem er landingssiden i medlemsportalen. Den starter med en hilsen («God morgen», «God ettermiddag» eller «God kveld» med fornavnet ditt) og dagens dato, etterfulgt av seksjoner som bare vises når de er relevante:

- **Siste preken** — menighetens nyeste preken, med en lenke **Alle prekener**
- **Dagens vers** — dagens vers; trykk på det for å åpne hele siden [Dagens vers](../content/verse-of-the-day.md)
- **Du tjenestegjør** — dine neste kommende tjenesteoppdrag, med en lenke **Alle plan** (planer). Hvis et oppdrag fortsatt venter på svaret ditt, vises disse først med et merke **Trenger svar** og knappene **Godta** / **Avslå**, slik at du kan svare direkte fra Hjem (**Avslå** ber deg bekrefte først); ellers viser dine neste oppdrag et merke **Akseptert** eller **Bekreftet**. Trykk på et oppdrag for å åpne planen.
- **Dine grupper** — opptil tre av gruppene dine med møtetid og sted, og en lenke **Alle grupper**
- **Givertjeneste** — hvor mye du har gitt i år («Gitt i» inneværende år), en knapp **Gi**, og en lenke **Historikk** til [gavehistorikken din](../giving/donation-history.md)
- **Mer fra** *din menighet* — knapper for resten av verktøyene menigheten din har slått på, og som ikke allerede er i fanelinjen eller vist ovenfor. Dem du bruker mest, flyttes først.

Seksjonene for tjeneste, grupper og gaver vises bare når du er logget inn, menigheten din har slått på verktøyet, og du har noe å vise — for eksempel et kommende oppdrag eller minst én gruppe. På en datamaskin er Hjem delt i to kolonner.

Hvis du ikke er logget inn, viser Hjem overskriften **Velkommen** i stedet for hilsenen, med en kort melding («Logg inn for å se gruppene, gavene og mer.») og en knapp **Logg inn**. Meldingen vises selv om menigheten din ikke har satt opp noe annet for Hjem ennå. Menigheten din kan formulere denne meldingen på nytt eller skjule den — se [Innstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du fortsatt logge inn fra siden **Mer** eller siden **Meg**.

## Den nederste fanelinjen

På en telefon er en fanelinje festet nederst på skjermen:

- **Hjem** — alltid første fane
- Opptil tre av fanene menigheten din har konfigurert
- **Mer** — åpner Mer-siden

Lenker til eksterne nettsider, egendefinerte sider og Dagens vers får aldri en egen fane. Hvis menigheten din har konfigurert flere faner enn det er plass til, går ikke de andre tapt: de vises på siden **Mer** og i seksjonen **Mer fra** på Hjem. Administratorer i menigheten setter rekkefølgen på fanene i B1 Admin under **Mobil → Navigasjon**.

## På en datamaskin

På en større skjerm, som en datamaskin eller et stort nettbrett, erstattes den nederste fanelinjen av en topptekst i menighetens farge. Den viser menighetens navn (klikk på det for å gå tilbake til Hjem), **Hjem**, opptil fem av fanene menigheten har konfigurert, og **Mer**, med klokken og profilbildet ditt til høyre. Når du åpner en detaljside, vises en lenke **Tilbake** over sideinnholdet.

## Mer-siden {#the-more-page}

Når du trykker på **Mer**, åpnes Mer-siden på `/mobile/more`. Den inneholder:

- Navnet og bildet ditt, med en lenke **Rediger profil** — se [Redigere profilen din](./editing-your-profile.md)
- Alle fanene menigheten din har konfigurert, i rekkefølge, under menighetens navn. Lenker til eksterne nettsider åpnes i en ny nettleserfane.
- En seksjon **Konto** med:
  - **Meg** — din personlige side (kun for innloggede)
  - **Utseende** — bytt mellom **Lys modus** og **Mørk modus**
  - **Administrasjonsportal** — vises bare hvis du har administratorrettigheter i menigheten din; den åpner B1 Admin i en ny fane
  - **Installer appen** — åpner [installasjonsveiledningen](./installing-pwa.md) på `/mobile/install` (skjult når appen er installert)
- **Logg ut**, eller en knapp **Logg inn** hvis du ikke er logget inn
- Menighetens navn og en lenke til personvernerklæringen

## Appens topplinje

På en telefon viser linjen øverst på hver skjerm:

- Menighetens navn på Hjem og de andre hovedskjermene, eller en tilbakepil når du har gått inn i en detaljskjerm. Skjermens tittel vises øverst på selve siden.
- Et **klokkeikon** for varsler og meldinger, med et merke for uleste elementer — se [Varsler og meldinger](#notifications-and-messages) nedenfor
- Ditt **profilbilde**, som åpner profilen din på `/mobile/profileEdit` — se [Redigere profilen din](./editing-your-profile.md)

Klokken og profilbildet vises bare når du er logget inn.

## Varsler og meldinger {#notifications-and-messages}

Når du trykker på klokken, åpnes et panel med to seksjoner:

- **Meldinger** — dine siste private samtaler, med en lenke **Ny melding** for å starte en ny
- **Varsler** — dine siste varsler, med et merke **Ny** på uleste. Trykk på et varsel for å gå til gruppen, planen eller samtalen det kom fra.

Hver seksjon viser hvor mange uleste elementer den har. Trykk på **Se alle** nederst for å åpne hele innboksen din på `/mobile/notifications`.

## Sider med seksjoner

Detaljsider — en gruppe, en plan, siden din Meg, og skjermene Planer og Gi — er bygget opp som én side med seksjoner i stedet for faner. Hver seksjon viser en kort forhåndsvisning, og en lenke i seksjonens overskrift (for eksempel **Alle medlemmer**, **Alle arrangementer** eller **Full gudstjenesteplan**) åpner hele listen. En lenke **Tilbake til** øverst i visningen fører deg tilbake til siden du kom fra.

## Siden Meg

**Meg** (`/mobile/me`) er din personlige knutepunkt. Den viser navnet og bildet ditt med knappene **Rediger profil** og **Innstillinger** ([varslingsinnstillinger](./notification-preferences.md)), deretter det som er på vei for deg — tjenesteoppdrag, arrangementspåmeldinger og gruppearrangementer — etterfulgt av husstanden din, gruppene dine, [gavene dine](../giving/) i år, dine [påmeldinger](../events/my-registrations.md), og dine siste varsler og meldinger. Se [Siden Meg](./me-page) for detaljer.

Hvis du ikke er logget inn, viser siden Meg en knapp **Logg inn** i stedet.

## Installere på startskjermen

Medlemsportalen er en Progressive Web App. Gå til `/mobile/install` (eller velg **Installer appen** på siden Mer) for trinn-for-trinn-veiledning for enheten din. Når den er installert, åpnes den i fullskjerm fra startskjermen uten nettleserrammer. Se [Installere som app (PWA)](./installing-pwa.md).

## Din menighets offentlige nettside

Utenfor medlemsportalen har menighetens offentlige nettside sin egen topptekstnavigasjon med lenker som administratorene dine har satt opp — sider som [prekener](../content/sermons.md), [Bibelen](../content/bible.md), [direktesending](../content/live-streaming.md), og en offentlig gruppeliste. På en telefon ligger disse lenkene bak hamburgerikonet øverst til høyre i toppteksten.

:::info
Fanene og verktøyene du ser varierer fra menighet til menighet. Administratorene styrer hvilke seksjoner medlemmene kan se gjennom B1 Admin, så hvis du ikke ser en funksjon som beskrives her, har ikke menigheten din kanskje slått den på.
:::
