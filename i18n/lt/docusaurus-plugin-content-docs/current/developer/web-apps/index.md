---
title: "Žiniatinklio programos"
---

# Žiniatinklio programos

<div class="article-intro">

ChurchApps apima tris žiniatinklio programas, kiekviena skirta skirtingai auditorijai ir paskirčiai. Jos turi bendrą technologinį pagrindą – React 19, TypeScript ir Material-UI 7 – tačiau skiriasi kūrimo įrankiais ir diegimo tikslais.

</div>

## Programos vienu žvilgsniu

| Programa | Paskirtis | Karkasas | Kūrimo prievadas |
|-----|---------|-----------|----------|
| [**B1Admin**](./b1-admin.md) | Bažnyčios administravimo skydelis | React 19 + Vite + MUI 7 | 5173 |
| [**B1App**](./b1-app.md) | Viešoji bažnyčios narių programa | Next.js 16 + React 19 + MUI 7 | 3301 |
| [**LessonsApp**](./lessons-app.md) | Pamokų turinio valdymas | Next.js 16 + React 19 | 3501 |

## Bendras technologijų rinkinys

Visos trys žiniatinklio programos sukurtos naudojant:

- **TypeScript** -- tipų saugumas visame kelyje nuo pradžios iki pabaigos
- **React 19** -- vartotojo sąsajos komponentų biblioteka
- **Material-UI 7** -- dizaino sistema ir komponentų įrankinė
- **React Query 5** -- serverio būsenos valdymas

## Bendri komponentai

Programos dalijasi vartotojo sąsajos komponentais ir pagalbinėmis funkcijomis per `@churchapps/apphelper*` paketų šeimą:

| Paketas | Paskirtis |
|---------|---------|
| `@churchapps/apphelper` | Pagrindiniai bendri React komponentai |
| `@churchapps/apphelper-login` | Autentifikavimo vartotojo sąsajos komponentai |
| `@churchapps/apphelper-donations` | Aukojimo ir aukų formos |
| `@churchapps/apphelper-forms` | Formų kūrimo komponentai |
| `@churchapps/apphelper-markdown` | Markdown atvaizdavimas |
| `@churchapps/apphelper-website` | Svetainės / turinio valdymo sistemos komponentai |

:::tip
Norėdami sužinoti, kaip lokaliai kurti šiuos bendrinamus paketus, žr. [AppHelper](../shared-libraries/app-helper) dokumentaciją.
:::

## Postinstall skriptas

Kiekviena žiniatinklio programa turi `postinstall` skriptą, kuris nukopijuoja lokalizacijos failus ir CSS išteklius iš `@churchapps/apphelper` į projektą. Jis paleidžiamas automatiškai po `npm install`.

:::info
Jei komponentai atrodo be stiliaus įdiegus priklausomybes, `postinstall` skriptas galbūt nebuvo tinkamai paleistas. Jį galite paleisti rankiniu būdu komanda `npm run postinstall`.
:::

## Kūrimo įrankiai

Programos naudoja du skirtingus kūrimo įrankius:

- **B1Admin** naudoja **Vite** -- greitą, modernų paketuotoją, tinkamą vieno puslapio programoms
- **B1App** ir **LessonsApp** naudoja **Next.js** -- suteikiantį serverio pusės atvaizdavimą, failais pagrįstą maršrutizavimą ir optimizuotas produkcines versijas
