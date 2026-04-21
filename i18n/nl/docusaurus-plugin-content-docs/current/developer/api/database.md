---
title: "Database"
---

# Database

<div class="article-intro">

De ChurchApps API maakt gebruik van een **database-per-module** architectuur. Elk van de zes modules heeft zijn eigen MySQL-database met een onafhankelijke verbindingsgroep, wat duidelijke gegevensgrenzen biedt terwijl alles binnen één implementatie blijft.

</div>

<div class="prereqs">
<h4>Voordat je begint</h4>

- Installeer **MySQL 8.0+** -- zie [Vereisten](../setup/prerequisites)
- Configureer databaseverbindingsreeksen in je `.env` bestand -- zie [Omgevingsvariabelen](../setup/environment-variables)

</div>

## Architectuuroverzicht

```
Api
├── membership_db   ← Mensen, groepen, machtigingen
├── attendance_db   ← Diensten, sessies, verslagen
├── content_db      ← Pagina's, secties, elementen
├── giving_db       ← Donaties, fondsen, betalingen
├── messaging_db    ← Gesprekken, berichten
└── doing_db        ← Taken, plannen, toewijzingen
```

### Belangrijkste ontwerpbeslissingen

- **Één database per module** -- Elke module onderhoudt zijn eigen MySQL-database met een specifieke verbindingsgroep (`EnhancedPoolHelper`). Dit houdt modules ontkoppeld en stelt onafhankelijke schemaontwikkeling in staat.
- **Opslagpatroon met direct SQL** -- Er is geen ORM. Alle gegevenstoegang gaat door opslagklassen die direct SQL gebruiken met `DB.query()`. Dit geeft volledige controle over queryprestaties en gedrag.
- **Multi-tenant door ontwerp** -- Elke query wordt bereikt door `churchId`. Alle tabellen bevatten een `churchId` kolom, en de opslaglaag dwingst automatisch tennantencryptie af.

## Verbindingsreeksen

Elke databaseverbinding van de module wordt in `.env` geconfigureerd met het standaard MySQL-verbindingsreeksformaat:

```
mysql://user:password@host:port/database
```

Een lokale ontwikkelingsinstellingen kunnen er als volgt uitzien:

```env
MEMBERSHIP_DB=mysql://root:password@localhost:3306/churchapps_membership
ATTENDANCE_DB=mysql://root:password@localhost:3306/churchapps_attendance
CONTENT_DB=mysql://root:password@localhost:3306/churchapps_content
GIVING_DB=mysql://root:password@localhost:3306/churchapps_giving
MESSAGING_DB=mysql://root:password@localhost:3306/churchapps_messaging
DOING_DB=mysql://root:password@localhost:3306/churchapps_doing
```

:::info
In productie worden verbindingsreeksen opgeslagen in AWS SSM Parameterarchief en door de `Environment` klasse bij het opstarten gelezen.
:::

## Schemascripts

Databaseschemaafscriften bevinden zich in de `tools/dbScripts/` map, georganiseerd per module:

```
tools/dbScripts/
├── membership/
├── attendance/
├── content/
├── giving/
├── messaging/
└── doing/
```

Deze scripts definiëren tabelcreatie, indexen en alle noodzakelijke zaadgegevens.

## Database-initialisatie

### Alle databases initialiseren

```bash
npm run initdb
```

Dit maakt alle zes databases aan en voert de schemaafscriften voor elk uit.

### Één module initialiseren

```bash
npm run initdb:membership
npm run initdb:attendance
npm run initdb:content
npm run initdb:giving
npm run initdb:messaging
npm run initdb:doing
```

:::tip
Wanneer u aan een bepaalde module werkt, kunt u alleen de database van die module opnieuw initialiseren zonder de anderen te beïnvloeden.
:::

## Gegevenstoegangspatroon

Opslagplaatsen hebben toegang tot gegevens via de `DB.query()` methode. Een typische opslagmethode ziet er als volgt uit:

```typescript
public async loadByChurchId(churchId: string) {
  return DB.query("SELECT * FROM people WHERE churchId=?", [churchId]);
}
```

Opslagplaatsen worden verkregen via `RepositoryManager`:

```typescript
const repos = RepositoryManager.getRepositories<MembershipRepositories>("membership");
const people = await repos.person.loadByChurchId(churchId);
```

:::warning
Neem altijd `churchId` in uw vragen op om multi-tenant isolatie te behouden. Voer nooit query's uit op meerdere tennants tenzij je een specifieke, geautoriseerde reden hebt om dit te doen.
:::

## Gerelateerde artikelen

- **[Modulestructuur](./module-structure)** -- Hoe controllers en opslagplaatsen binnen elke module zijn georganiseerd
- **[Lokale API-setup](./local-setup)** -- Volledige stap-voor-stap instellingsgids
