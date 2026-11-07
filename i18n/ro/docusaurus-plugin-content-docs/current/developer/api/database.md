---
title: "Baza de date"
description: "Aflați cum API-ul ChurchApps împarte datele între șase baze de date MySQL, câte una pentru fiecare modul, și cum să configurați și să inițializați conexiunile."
---

# Baza de date

<div class="article-intro">

API-ul ChurchApps folosește o arhitectură **o bază de date per modul**. Fiecare dintre cele șase module de date are propria bază de date MySQL, cu un pool de conexiuni independent, ceea ce oferă limite clare pentru date și păstrează totul într-o singură implementare.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Instalați **MySQL 8.0+** -- vezi [Cerințe preliminare](../setup/prerequisites.md)
- Configurați șirurile de conexiune la baza de date în fișierul `.env` -- vezi [Variabile de mediu](../setup/environment-variables.md)

</div>

## Prezentare generală a arhitecturii

```
Api
├── membership_db   ← Persoane, grupuri, permisiuni
├── attendance_db   ← Servicii, sesiuni, înregistrări
├── content_db      ← Pagini, secțiuni, elemente
├── giving_db       ← Donații, fonduri, plăți
├── messaging_db    ← Conversații, notificări
└── doing_db        ← Sarcini, planuri, atribuiri
```

### Decizii cheie de proiectare

- **O bază de date per modul** -- Fiecare modul își gestionează propria bază de date MySQL, cu un pool de conexiuni dedicat (administrat de `KyselyPool`). Acest lucru menține modulele decuplate și permite evoluția independentă a schemei.
- **Proprietate exclusivă** -- Tabelele unui modul sunt citite și scrise doar de codul acelui modul. Atunci când un alt modul are nevoie de date, apelează gateway-ul modulului proprietar, în loc să interogheze direct tabelele -- vezi [Comunicarea între module](./module-structure.md#cross-module-communication).
- **Modelul repository fără ORM** -- Tot accesul la date trece prin clase repository care construiesc interogări SQL tipizate, folosind constructorul de interogări Kysely, pe schema modulului. Acest lucru oferă control deplin asupra performanței și comportamentului interogărilor.
- **Multi-tenant prin design** -- Fiecare interogare este limitată la `churchId`. Toate tabelele includ o coloană `churchId`, iar stratul de repository impune automat izolarea între tenanți.

## Șiruri de conexiune

Conexiunea la baza de date a fiecărui modul este configurată în `.env`, folosind formatul standard MySQL pentru șiruri de conexiune:

```
mysql://user:password@host:port/database
```

De exemplu, o configurație locală de dezvoltare ar putea arăta astfel:

Fiecare modul își citește conexiunea dintr-o variabilă de mediu numită `<MODULE>_CONNECTION_STRING`:

```env
MEMBERSHIP_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_content
GIVING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_messaging
DOING_CONNECTION_STRING=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
În producție, șirurile de conexiune sunt stocate în AWS SSM Parameter Store și sunt citite de clasa `Environment` la pornire.
:::

## Scripturi pentru schemă

Schemele tabelelor sunt definite ca migrări Kysely în directorul `tools/migrations/`, organizate pe module:

```
tools/migrations/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Migrările definesc crearea tabelelor, indexurile și modificările de schemă. Directorul `tools/dbScripts/` conține date demonstrative și de inițializare care pot fi încărcate peste schemă.

## Inițializarea bazei de date

### Inițializarea tuturor bazelor de date

```bash
npm run initdb
```

Aceasta creează toate cele șase baze de date și rulează migrările pentru fiecare dintre ele.

### Inițializarea unui singur modul

```bash
npm run initdb -- --module=membership
```

:::tip
Atunci când lucrați la un anumit modul, puteți reinițializa doar baza de date a acelui modul, fără a afecta celelalte.
:::

## Modelul de acces la date

Repository-urile construiesc interogări cu constructorul de interogări Kysely, pe schema tipizată a bazei de date a modulului, obținută prin funcția `getDb()` a modulului. O metodă tipică de repository arată astfel:

```typescript
public async loadAll(churchId: string) {
  return getDb().selectFrom("people").selectAll()
    .where("churchId", "=", churchId)
    .execute();
}
```

Repository-urile se obțin prin `RepoManager`:

```typescript
const repos = await RepoManager.getRepos<Repos>("membership");
const people = await repos.person.loadAll(churchId);
```

:::warning
Includeți întotdeauna `churchId` în interogările dumneavoastră, pentru a menține izolarea multi-tenant. Nu interogați niciodată date din mai mulți tenanți, decât dacă aveți un motiv specific și autorizat pentru aceasta.
:::

## Referințe între module

Deoarece datele fiecărui modul se află într-o bază de date separată, nu există chei străine sau join-uri SQL între limitele modulelor. O înregistrare legată de datele unui alt modul stochează id-ul acelei înregistrări -- de exemplu, o donație din baza de date giving transportă `personId` unei persoane din baza de date membership -- iar compunerea datelor între module se realizează în codul aplicației.

Această constrângere face ca limitele modulelor să fie reale: fiecare schemă poate evolua independent, baza de date a unui modul poate fi mutată pe propriul server, iar un modul ar putea chiar fi extras într-un serviciu independent, fără a desface tabele partajate sau interogări între baze de date.

## Articole conexe

- **[Structura modulelor](./module-structure.md)** -- Cum sunt organizate controllerele și repository-urile în fiecare modul
- **[Configurarea locală a API-ului](./local-setup.md)** -- Ghid complet, pas cu pas, de configurare
