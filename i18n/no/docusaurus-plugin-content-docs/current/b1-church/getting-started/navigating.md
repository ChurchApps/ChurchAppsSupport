---
title: "Navigere i B1App"
---

# Navigere i B1App

<div class="article-intro">

Medlemsportalen i B1.church er en nettapp laget først og fremst for mobil, og den ligger under `/mobile`. Den fungerer i alle nettlesere og kan installeres på hjemskjermen. Denne siden forklarer Hjem-oversikten, fanelinjen nederst, Mer-menyen og Meg-siden.

</div>

<div class="prereqs">
<h4>Før du begynner</h4>

- Du må være [logget inn](./logging-in.md) for å se din personlige informasjon. Besøkende som ikke er logget inn, kan fortsatt bla i offentlig innhold, og får en **Logg inn**-knapp der en funksjon krever konto.

</div>

## Hjem

Når du åpner `https://yourchurchname.b1.church/mobile`, kommer du til **Hjem**-oversikten på `/mobile/dashboard`. Hjem er startsiden i medlemsportalen og viser:

- En hilsen med navnet ditt
- Dagens vers
- Et fremhevet kort for det menigheten har valgt å trekke fram
- Et **Utforsk**-rutenett med verktøyene menigheten har slått på -- grupper, givertjeneste, innsjekking, prekener, planer og mer

Når du trykker på et kort i Utforsk, åpnes det verktøyet. Hvis menigheten har flere verktøy enn det er plass til på oversikten, er det siste kortet **Mer**, som åpner hele listen på `/mobile/more`.

Hvis du er utlogget, viser Hjem overskriften **Velkommen** i stedet for hilsenen, med en kort oppfordring («Logg inn for å se gruppene dine, givertjenesten og mer.») og en **Logg inn**-knapp. Menigheten kan endre ordlyden i oppfordringen eller skjule den -- se [Innstillinger for mobilappen](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Når den er skjult, kan du fortsatt logge inn fra menyen eller Meg-fanen.

## Fanelinjen nederst

På mobil er en fanelinje festet nederst på skjermen:

- **Hjem** -- alltid den første fanen
- Opptil tre av fanene menigheten har satt opp
- **Mer** -- åpner navigasjonsmenyen

Hvis menigheten har satt opp mer enn tre faner, går ikke resten tapt: De vises i **Mer**-menyen og i Utforsk-rutenettet på oversikten. Administratorer i menigheten bestemmer rekkefølgen på fanene i B1 Admin under **Mobil → Navigasjon**.

## Menyen

Når du trykker på **Mer**, åpnes navigasjonsmenyen. På et nettbrett eller en datamaskin er den samme menyen alltid synlig langs venstre side av skjermen. Den inneholder:

- Navnet og bildet ditt, med en snarvei til **Rediger profil** — se [Redigere profilen din](./editing-your-profile.md)
- **Hjem** og **Meg**
- **Adminportal** -- vises bare hvis du har administratorrettigheter i menigheten, og åpner B1 Admin
- Alle fanene menigheten har satt opp, i rekkefølge
- **Installer app** -- åpner [installasjonsveiledningen](./installing-pwa.md) på `/mobile/install`
- En bryter for lys/mørk modus
- **Logg inn** eller **Logg ut**
- Menighetens navn og en lenke til personvernerklæringen

## Appfeltet

Feltet øverst på hver skjerm viser:

- Skjermtittelen, eller menighetens navn på Hjem
- En tilbakepil når du har gått inn på en detaljskjerm
- Et **bjelle**-ikon for varsler og meldinger, med et merke for uleste elementer
- **Profilbildet** ditt, som åpner profilen din på `/mobile/profileEdit` — se [Redigere profilen din](./editing-your-profile.md)

## Meg-siden

**Meg** (`/mobile/me`) er ditt personlige knutepunkt. Den har snarveier til profilen din, [varslingsinnstillinger](./notification-preferences.md), meldinger, [givertjeneste](../giving/) og [påmeldinger](../events/my-registrations.md), etterfulgt av det som venter deg -- tjenesteoppgaver, arrangementspåmeldinger og gruppearrangementer -- og de siste varslene dine. Se [Meg-siden](./me-page) for detaljer.

Hvis du er utlogget, viser Meg-siden en **Logg inn**-knapp i stedet.

## Installere på hjemskjermen

Medlemsportalen er en Progressive Web App. Gå til `/mobile/install` (eller velg **Installer app** i menyen) for trinnvise instruksjoner for enheten din. Når den er installert, åpnes den i fullskjerm fra hjemskjermen, uten nettleserens grensesnitt. Se [Installere som app (PWA)](./installing-pwa.md).

## Menighetens offentlige nettsted

Utenfor medlemsportalen har menighetens offentlige nettsted sin egen toppnavigasjon med lenker som administratorene har satt opp -- sider som [prekener](../content/sermons.md), [Bibelen](../content/bible.md), [direktesending](../content/live-streaming.md) og en offentlig gruppeliste. På mobil ligger disse lenkene bak hamburgerikonet øverst til høyre i toppfeltet.

:::info
Fanene og verktøyene du ser, varierer fra menighet til menighet. Administratorene styrer hvilke deler som er synlige for medlemmene via B1 Admin, så hvis du ikke ser en funksjon som er beskrevet her, har kanskje ikke menigheten slått den på.
:::
