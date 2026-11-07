---
title: "Spletne aplikacije"
---

# Spletne aplikacije

<div class="article-intro">

ChurchApps vključuje tri spletne aplikacije, od katerih ima vsaka drugo občinstvo in namen. Delijo skupno tehnološko osnovo React 19, TypeScript in Material-UI 7, vendar se razlikujejo po orodjih za gradnjo in ciljih namestitve.

</div>

## Aplikacije na kratko

| Aplikacija | Namen | Ogrodje | Razvojna vrata |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Nadzorna plošča za upravljanje cerkve | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Javna aplikacija za člane cerkve | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Upravljanje vsebine lekcij | Next.js 16 + React 19 | 3501 |

## Skupni tehnološki sklad

Vse tri spletne aplikacije so zgrajene z:

- **TypeScript** -- varnost tipov od začetka do konca
- **React 19** -- knjižnica UI komponent
- **Material-UI 7** -- sistem oblikovanja in orodje za komponente
- **React Query 5** -- upravljanje stanja strežnika

## Skupne komponente

Aplikacije delijo UI komponente in pripomočke prek družine paketov `@churchapps/apphelper*`:

| Paket | Namen |
|---------|---------|
| `@churchapps/apphelper` | Osnovne skupne komponente React |
| `@churchapps/apphelper-login` | UI komponente za prijavo |
| `@churchapps/apphelper-donations` | Obrazci za donacije in darovanje |
| `@churchapps/apphelper-forms` | Komponente graditelja obrazcev |
| `@churchapps/apphelper-markdown` | Prikaz vsebine v Markdown formatu |
| `@churchapps/apphelper-website` | Komponente spletne strani/CMS |

:::tip
Za podrobnosti o lokalnem razvoju teh skupnih paketov glejte dokumentacijo [AppHelper](../shared-libraries/app-helper).
:::

## Skript postinstall

Vsaka spletna aplikacija ima skript postinstall, ki kopira jezikovne datoteke in CSS sredstva iz `@churchapps/apphelper` v projekt. Ta se izvede samodejno po `npm install`.

:::info
Če so komponente po namestitvi odvisnosti brez sloga, se skript postinstall morda ni pravilno izvedel. Ročno ga lahko zaženete z ukazom `npm run postinstall`.
:::

## Orodja za gradnjo

Aplikacije uporabljajo dve različni orodji za gradnjo:

- **B1Admin** uporablja **Vite** -- hiter, sodoben paketnik, primeren za enostranske aplikacije
- **B1App** in **LessonsApp** uporabljata **Next.js** -- ponujata upodabljanje na strani strežnika, usmerjanje na podlagi datotek in optimizirane produkcijske gradnje
