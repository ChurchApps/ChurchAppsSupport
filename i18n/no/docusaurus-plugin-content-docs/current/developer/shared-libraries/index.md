---
title: "Delte biblioteker"
---

# Delte biblioteker

<div class="article-intro">

Delt kode i ChurchApps publiseres til npm under `@churchapps/*`-omfanget. Alle de delte pakkene ligger i ett enkelt repositorium -- [Packages](https://github.com/ChurchApps/Packages) -- administrert som et Yarn (Berry) workspace og versjonert med [changesets](https://github.com/changesets/changesets).

</div>

## Pakker

| Pakke | Beskrivelse | Brukes av |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Grunnlagslag: rammeverkfrie hjelpefunksjoner og de delte TypeScript-grensesnittene som utgjør datakontrakten på tvers av appene | Alle prosjekter |
| [`@churchapps/apihelper`](./api-helper) | Serversideverktøy for Express: autentisering, basiskontrollere, databasetilgang, integrasjoner mot AWS og e-post | Alle API-er |
| [`@churchapps/apphelper`](./app-helper) | Delte React-komponenter og funksjonsmoduler (innlogging, donasjoner, skjemaer, markdown, nettsted) | Alle nettapper |
| `@churchapps/content-providers` | Abstraksjon over innholdsleverandører fra tredjeparter (Lessons.church, Planning Center, Dropbox og andre) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Verktøysett for å bygge B1.church-integrasjoner: webhook-verifisering, typet REST-klient, OAuth-hjelpere | Eksterne integrasjonsutviklere |
| `@churchapps/texting` | Abstraksjon over SMS-leverandører (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions) | Api |

Avhengighetsretningen er strengt nedover: appene avhenger av `apihelper` og `apphelper`, som deklarerer `@churchapps/helpers` som en **peer-avhengighet** slik at hver app løser nøyaktig én kopi av den.

## Oppsett av workspace

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repositoriet bruker Yarn Berry (feltet `packageManager` i roten er den gjeldende kilden) med én enkelt lockfil. `yarn build` bygger hver pakke i avhengighetsrekkefølge; `yarn test` kjører alle pakketestene.

## Utgivelse med Changesets

Hver endring i en pakke leveres med et changeset:

1. Kjør `yarn changeset` i roten av workspacet. Velg pakken(e) du har rørt, versjonstypen (patch = feilrettelse, minor = ny eksport eller funksjon, major = brytende endring), og skriv en oppsummering på én linje -- den blir oppføringen i CHANGELOG.
2. Commit den genererte `.changeset/*.md`-filen sammen med kodeendringen din. En pre-commit-hook blokkerer commits som endrer en pakkes kildekode uten et staget changeset.
3. Når du er klar til å publisere, kjør `yarn publish-all` i roten. Det bruker opp ventende changesets (øker versjoner, skriver CHANGELOG-er, synkroniserer interne avhengighetsområder), bygger alt i avhengighetsrekkefølge og publiserer de oppdaterte pakkene til npm. Commit og push deretter versjonsøkningene.

:::warning
Kjør aldri en rå `npm publish` inne i en enkelt pakke -- den hopper over byggerekkefølgen og versjonsbokføringen som utgivelsesskriptet tar seg av. Publisering krever en npm-konto med publiseringsrettigheter til `@churchapps`-omfanget.
:::

## Lokal utvikling mot en konsumerende app

Inne i workspacet bygges pakkene direkte mot søskenpakkene sine -- ingen lenking er nødvendig. For å teste et upublisert pakkebygg inne i en konsumerende app (B1Admin, B1App osv.), legg til en midlertidig Yarn-portal i konsumenten:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Bygg pakken først (`yarn build` i roten av workspacet) -- konsumenten leser den kompilerte `dist/`-utdataen, ikke kildekoden.

:::warning
`yarn link` skriver en portaloppløsning inn i konsumentens `package.json`. Commit den aldri -- kjør alltid `yarn unlink` og installer på nytt når du er ferdig.
:::
