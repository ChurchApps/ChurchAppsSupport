---
title: "Delte biblioteker"
---

# Delte biblioteker

<div class="article-intro">

ChurchApps delt kode publiseres til npm under `@churchapps/*`-omfanget. Alle delte pakker bor i ett enkelt repository -- [Packages](https://github.com/ChurchApps/Packages) -- administrert som Yarn (Berry)-arbeidsområde og versjonert med [changesets](https://github.com/changesets/changesets).

</div>

## Pakker

| Pakke | Beskrivelse | Brukt av |
|---------|-------------|---------|
| [`@churchapps/helpers`](./helpers) | Grunnlagslag: rammeverk-fri hjelperfunksjoner og de delte TypeScript-grensesnittene som danner tverrapp-datakontrakten | Alle prosjekter |
| [`@churchapps/apihelper`](./api-helper) | Server-side Express-verktøy: auth, basisontroller, databaseadgang, AWS og e-post-integrasjoner | Alle APIer |
| [`@churchapps/apphelper`](./app-helper) | Delte React-komponenter og funksjonmoduler (pålogging, donasjoner, skjemaer, markdown, nettsted) | Alle nettapper |
| `@churchapps/content-providers` | Abstrahering over tredjeparts innholdsleverandører (Lessons.church, Planning Center, Dropbox og andre) | Api, B1Admin, B1App, FreePlay |
| `@churchapps/integration-sdk` | Verktøy for bygging av B1.church-integrasjoner: webhook-verifisering, typifisert REST-klient, OAuth-hjelpere | Eksterne integrasjonsutviklere |
| `@churchapps/texting` | SMS-leverandørabstrahering (Text In Church, Clearstream, Mutual Ministry) | Api |

Avhengighetsretningen er strengt nedover: apper avhenger av `apihelper` og `apphelper`, som erklærer `@churchapps/helpers` som en **peer-avhengighet** slik at hver app løser nøyaktig en kopi av det.

## Arbeidsområdeoppsett

```bash
git clone https://github.com/ChurchApps/Packages.git
cd Packages
yarn install
yarn build
```

Depoet bruker Yarn Berry (root `packageManager`-feltet er autoritativt) med en enkelt lockfile. `yarn build` bygger hver pakke i avhengighetsrekkefølge; `yarn test` kjører alle pakketester.

## Frigjøring med Changesets

Hver endring i en pakke sendes med en changeset:

1. Kjør `yarn changeset` ved arbeidsområderoten. Velg pakke(ne) du rørt, bump-typen (patch = fix, minor = ny eksport eller funksjon, major = breaking), og skriv et en-linje sammendrag -- det blir CHANGELOG-oppføringen.
2. Commit den genererte `.changeset/*.md`-filen sammen med kodendringen din. En pre-commit hook blokkerer commits som endrer pakkekilde uten en iscenesatt changeset.
3. Når du er klar til å publisere, kjør `yarn publish-all` ved roten. Dette forbruker ventende changesets (bumper versjoner, skriver CHANGELOGs, synkroniserer interne avhengighetsrekker), bygger alt i avhengighetsrekkefølge og publiserer de bumsede pakkene til npm. Deretter committer og pusher versjonsbumpene.

:::warning
Kjør aldri en rå `npm publish` inne i en enkelt pakke -- det hoppes over byggeordering og versjonsbokføringen frigjørings-scriptet håndterer. Publisering krever en npm-konto med publikasjonrettigheter til `@churchapps`-omfanget.
:::

## Lokal utvikling mot en forbrukerapp

Inne i arbeidsområdet bygger pakker direkte mot sine søsken -- ingen linking nødvendig. For å teste en upublisert pakkeavbygging inne i en forbrukerapp (B1Admin, B1App, osv.), legg til en midlertidig Yarn-portal i forbrukeren:

```bash
# i det forbrukende prosjektet
yarn link ../Packages/helpers
# ... test ...
yarn unlink ../Packages/helpers && yarn install
```

Bygg pakken først (`yarn build` ved arbeidsområderoten) -- forbrukeren leser den kompilerte `dist/`-utdataen, ikke kilden.

:::warning
`yarn link` skriver en portal-oppløsning til forbrukerens `package.json`. Commit det aldri -- alltid `yarn unlink` og reinstall når du er ferdig.
:::
