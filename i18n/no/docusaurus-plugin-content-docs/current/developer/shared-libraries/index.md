---
title: "Delte biblioteker"
---

# Delte biblioteker

<div class="article-intro">

ChurchApps' delte kode publiseres til npm under `@churchapps/*`-omfanget. Alle de delte pakkene bor i ett enkelt repositorium -- [Packages](https://github.com/ChurchApps/Packages) -- administrert som et Yarn (Berry)-arbeidsområde og versjonert med [changesets](https://github.com/changesets/changesets).

</div>

## Pakker

| Pakke | Beskrivelse | Brukt av |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Grunnlagsnivå: rammeverksfrie hjelpefunksjoner og de delte TypeScript-grensesnittene som utgjør datakontrakten på tvers av apper | Alle prosjekter |
| [`@churchapps/apihelper`](./api-helper) | Server-side Express-verktøy: autentisering, basiskontrollere, databasetilgang, AWS- og e-postintegrasjoner | Alle API-er |
| [`@churchapps/apphelper`](./app-helper) | Delte React-komponenter og funksjonsmoduler (innlogging, donasjoner, skjemaer, markdown, nettsted) | Alle nettapper |
| `@churchapps/content-providers` | Abstraksjon over tredjeparts innholdsleverandører (Lessons.church, Planning Center, Dropbox, og andre) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Verktøysett for å bygge B1.church-integrasjoner: webhook-verifisering, typet REST-klient, OAuth-hjelpere | Eksterne integrasjonsutviklere |
| `@churchapps/texting` | Abstraksjon for SMS-leverandør (Text In Church, Clearstream, Mutual Ministry) | Api |

Avhengighetsretningen er strengt nedadgående: apper avhenger av `apihelper` og `apphelper`, som erklærer `@churchapps/helpers` som en **peer-avhengighet** slik at hver app løser opp nøyaktig én kopi av den.

## Arbeidsområdeoppsett

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Repositoriet bruker Yarn Berry (rot-`packageManager`-feltet er autoritativt) med én enkelt lockfile. `yarn build` bygger hver pakke i avhengighetsrekkefølge; `yarn test` kjører alle pakketester.

## Utgivelse med changesets

Hver endring i en pakke sendes med en changeset:

1. Kjør `yarn changeset` ved roten av arbeidsområdet. Velg pakken(e) du endret, typen versjonsøkning (patch = feilretting, minor = ny eksport eller funksjon, major = brytende endring), og skriv et ett-linjes sammendrag -- det blir CHANGELOG-oppføringen.
2. Commit den genererte `.changeset/*.md`-filen sammen med kodeendringen din. En pre-commit-hook blokkerer commits som endrer en pakkes kildekode uten en iscenesatt changeset.
3. Når du er klar til å publisere, kjør `yarn publish-all` ved roten. Dette konsumerer ventende changesets (øker versjoner, skriver CHANGELOG-er, synkroniserer interne avhengighetsområder), bygger alt i avhengighetsrekkefølge, og publiserer de oppgraderte pakkene til npm. Commit og push deretter versjonsøkningene.

:::warning
Kjør aldri en rå `npm publish` inne i én enkelt pakke -- det hopper over byggerekkefølgen og versjonsbokføringen som utgivelses-scriptet håndterer. Publisering krever en npm-konto med publiseringsrettigheter til `@churchapps`-omfanget.
:::

## Lokal utvikling mot en konsumerende app

Inne i arbeidsområdet bygger pakker direkte mot sine søsken -- ingen lenking nødvendig. For å teste et upublisert pakkebygg inne i en konsumerende app (B1Admin, B1App, osv.), legg til en midlertidig Yarn-portal i konsumenten:

```bash
# in the consuming project
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Bygg pakken først (`yarn build` ved roten av arbeidsområdet) -- konsumenten leser den kompilerte `dist/`-utdataen, ikke kildekoden.

:::warning
`yarn link` skriver en portal-oppløsning inn i konsumentens `package.json`. Commit den aldri -- alltid `yarn unlink` og reinstaller når du er ferdig.
:::
