---
title: "ApiHelper"
---

# ApiHelper

<div class="article-intro">

Pachetul `@churchapps/apihelper` oferă utilitare pentru server destinate tuturor API-urilor Express.js ale ChurchApps. Include clasa de bază pentru controlere, autentificarea JWT, utilitare pentru baza de date și integrările AWS de care depinde fiecare proiect API.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **Node.js** și **Git** -- vezi [Cerințe preliminare](../setup/prerequisites)
- Familiarizați-vă cu configurarea și fluxul de lansare al spațiului de lucru [Packages](./index.md)
- Acest pachet depinde de [`@churchapps/helpers`](./helpers) (ca dependență de tip peer) și îl reexportă

</div>

## Ce este inclus

- **CustomBaseController** -- clasă de bază pentru controlere API, construită pe `inversify-express-utils`
- **Auth** -- autentificare JWT prin `CustomAuthProvider`, `AuthenticatedUser` și `Principal`
- **Utilitare pentru baza de date** -- `DB.query` / `DB.queryOne` și clasa `Pool` pentru gestionarea conexiunilor MySQL, plus `MySqlHelper` și `DBCreator` pentru configurarea schemei
- **Integrări AWS** -- `AwsHelper` pentru stocarea fișierelor în S3 și citirea din SSM Parameter Store
- **E-mail** -- `EmailHelper` cu suport pentru transportul SES și SMTP
- **Încărcarea configurației** -- `EnvironmentBase` citește șirurile de conexiune și secretele din variabilele de mediu sau din Parameter Store
- **Diverse** -- `EncryptionHelper`, `FileStorageHelper`, `LoggingHelper`, `BasePermissions`, `SlugHelper`

## Configurarea pentru dezvoltare locală

Acest pachet se află în spațiul de lucru [Packages](https://github.com/ChurchApps/Packages), alături de celelalte biblioteci partajate:

1. Clonați spațiul de lucru:

   ```bash
   git clone https://github.com/ChurchApps/Packages.git
   ```

2. Instalați dependențele în rădăcina spațiului de lucru:

   ```bash
   cd Packages && yarn install
   ```

3. Compilați (transformă TypeScript în `dist/`):

   ```bash
   yarn workspace @churchapps/apihelper build
   ```

   Sau rulați `yarn build` în rădăcină pentru a compila toate pachetele în ordinea dependențelor.

Pentru a testa modificările într-o API care le folosește, utilizați un portal Yarn temporar -- vezi [Dezvoltare locală cu o aplicație consumatoare](./index.md#local-development-against-a-consuming-app).

## Publicarea

Lansările trec prin changesets: rulați `yarn changeset` în rădăcina spațiului de lucru pentru fiecare modificare, apoi `yarn publish-all` când sunteți gata să lansați. Consultați [Prezentarea generală a bibliotecilor partajate](./index.md#releasing-with-changesets) pentru fluxul complet.

:::info
Acest pachet este o dependență a fiecărei API-uri ChurchApps -- Api-ul principal, AskApi și LessonsApi. La modificări, testați pe o API locală înainte de publicare.
:::

## Articole conexe

- **[Helpers](./helpers)** -- Pachetul de utilitare de bază de care depinde acest pachet
- **[Structura modulelor](../api/module-structure)** -- Cum sunt folosite controlerele și middleware-ul de autentificare în modulele API
- **[Configurarea locală a API-ului](../api/local-setup)** -- Configurarea API-ului pentru dezvoltare locală
