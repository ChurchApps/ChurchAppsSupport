---
title: "Delte biblioteker"
---

# Delte biblioteker

<div class="article-intro">

ChurchApps' delte kode publiseres til npm under `@churchapps/*`-omfanget. Alle de delte pakkene ligger i ett enkelt repositorium – [Packages](https://github.com/ChurchApps/Packages) – som administreres som et Yarn (Berry)-arbeidsområde og versjoneres med [changesets](https://github.com/changesets/changesets).

</div>

## Pakker

| Pakke | Beskrivelse | Brukes av |
|---------|-------------|-----------|
| [`@churchapps/helpers`](./helpers) | Fundamentlaget: rammeuavhengige hjelpefunksjoner og de delte TypeScript-grensesnittene som utgjør den tverrgående dataavtalen mellom appene | Alle prosjekter |
| [`@churchapps/apihelper`](./api-helper) | Serverside Express-verktøy: autentisering, basiskontrollere, databasetilgang, AWS- og e-postintegrasjoner | Alle API-er |
| [`@churchapps/apphelper`](./app-helper) | Delte React-komponenter og funksjonsmoduler (innlogging, gaver, skjemaer, markdown, nettsted) | Alle webapper |
| `@churchapps/content-providers` | Abstraksjon over tredjeparts innholdsleverandører (Lessons.church, Planning Center, Dropbox og flere) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Verktøysett for å bygge B1.church-integrasjoner: verifisering av webhooks, typet REST-klient, OAuth-hjelpere | Eksterne integrasjonsutviklere |
| `@churchapps/texting` | SMS-leverandørabstraksjon (Text In Church, Clearstream, Mutual Ministry, MinistryStuff, Nalo Solutions, Twilio) | Api |

Avhengighetsretningen går strengt nedover: apper er avhengige av `apihelper` og `apphelper`, som deklarerer `@churchapps/helpers` som en **peer dependency**, slik at hver app bruker nøyaktig én kopi av den.

## Oppsett av arbeidsområdet

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repoet bruker Yarn Berry (feltet `packageManager` i roten er avgjørende) med én lockfile. `yarn build` bygger alle pakker i avhengighetsrekkefølge; `yarn test` kjører alle pakketestene.

## Utgivelse med Changesets

Hver endring i en pakke sendes med en changeset:

1. Kjør `yarn changeset` i arbeidsområdets rot. Velg pakken(e) du har endret, type versjonsøkning (patch = rettelse, minor = ny eksport eller funksjon, major = brytende endring), og skriv et sammendrag på én linje – det blir CHANGELOG-oppføringen.
2. Commit den genererte `.changeset/*.md`-filen sammen med kodeendringen din. En pre-commit-hook blokkerer commits som endrer en pakkes kildekode uten en stagert changeset.
3. Når du er klar til å publisere, kjør `yarn publish-all` i roten. Dette tar de ventende changesetene (øker versjonene, skriver CHANGELOG-er, synkroniserer interne avhengighetsintervaller), bygger alt i avhengighetsrekkefølge, og publiserer de oppdaterte pakkene til npm. Commit og push deretter versjonsøkningene.

:::warning
Kjør aldri en rå `npm publish` inne i en enkelt pakke – det hopper over byggerekkefølgen og versjonsbokføringen som utgivelsesskriptet håndterer. Publisering krever en npm-konto med publiseringsrettigheter til `@churchapps`-omfanget.
:::

## Lokal utvikling mot en forbrukende app

Inne i arbeidsområdet bygges pakker direkte mot sine søsken – ingen kobling er nødvendig. For å teste en upublisert pakkebygging inne i en forbrukende app (B1Admin, B1App osv.), legg til en midlertidig Yarn-portal i forbrukeren:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Bygg pakken først (`yarn build` i arbeidsområdets rot) – forbrukeren leser den kompilerte `dist/`-utdata, ikke kildekoden.

:::warning
`yarn link` skriver en portalresolusjon inn i forbrukerens `package.json`. Commit den aldri – kjør alltid `yarn unlink` og installer på nytt når du er ferdig.
:::
