---
title: "Správa serveru"
---

# Správa serveru

<div class="article-intro">

Funkce pro správu serveru v ChurchApps jsou dostupné pouze uživatelům s oprávněním **Server.Admin**. Tyto nástroje slouží k provozu platformy, podpoře a řešení problémů u všech kostelů v systému.

</div>

:::warning Přístup omezen
Funkce popsané na této stránce vyžadují oprávnění **Server.Admin** a nejsou dostupné běžným správcům kostelů. Jsou určeny pouze pro provozovatele platformy a pracovníky podpory.
:::

## Přístup do správy serveru

Uživatelé s oprávněním Server.Admin mohou otevřít panel správy serveru z B1 Admin:

1. Přihlaste se na [admin.b1.church](https://admin.b1.church)
2. Otevřete [nabídku Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), rozbalte **Settings** (Nastavení) a klikněte na **Server Admin**. (Můžete také přejít přímo na `admin.b1.church/admin`.)
3. Panel Server Admin zobrazuje své sekce v levém sloupci ve třech skupinách: **Directory** (Adresář: Churches, Users, Impersonate User), **Operations** (Provoz: Background Jobs, Commons, Usage Trends) a **System** (Systém: Translation Lookups, Server Health, Database Migrations)

## Obnovení dvoufázového přihlášení

Pokud má uživatel zapnuté [dvoufázové přihlášení](../b1-admin/profile/managing-profile.md#two-factor-sign-in) a ztratil jak telefon, tak záložní kódy, může správce serveru toto ověření vypnout:

1. Otevřete sekci **Users** v panelu Server Admin a vyhledejte uživatele.
2. U uživatelů s dvoufázovým přihlášením se zobrazuje štítek **Two-factor on** (Dvoufázové ověření zapnuto). Vedle něj klikněte na **Reset 2FA**.
3. Potvrďte dotaz. Před provedením se ujistěte, s kým komunikujete.

Uživatel se pak může přihlásit jen heslem a dvoufázové přihlášení si znovu nastavit ve svém profilu. Obnovení se zapisuje do auditního protokolu jako `mfa_reset`. Koncový bod je `POST /membership/users/mfa/reset/:userId` a vyžaduje oprávnění Server.Admin.

## Přihlášení jako jiný uživatel

Funkce impersonace umožňuje správcům serveru přihlásit se jako jiný uživatel pro účely podpory a řešení problémů. Hodí se při šetření problémů nahlášených uživateli nebo při pomoci kostelům s nastavením jejich systémů.

### Jak se přihlásit jako uživatel

1. Otevřete sekci **Impersonate User** v panelu Server Admin.
2. Do vyhledávacího pole zadejte jméno nebo e-mailovou adresu uživatele.
3. Klikněte na **Search** nebo stiskněte Enter.
4. Mezi výsledky hledání klikněte na uživatele, za kterého se chcete přihlásit.
5. Potvrďte přihlášení v dialogovém okně, které se zobrazí.
6. Budete přihlášeni jako tento uživatel a přesměrováni na jeho účet.

### Důležité poznámky

- Impersonace vytvoří novou relaci s oprávněními a přístupem ke kostelům cílového uživatele.
- Vaše původní správcovská relace se při přihlášení jako jiný uživatel ukončí.
- Všechny akce provedené v režimu impersonace se zaznamenávají do auditní stopy.
- Pro návrat ke svému správcovskému účtu se odhlaste a znovu přihlaste svými přihlašovacími údaji.
- Impersonaci používejte pouze tehdy, když je to pro podporu nezbytné, a vždy uživatele informujte, pokud k jeho účtu přistupujete kvůli podpoře.

### Koncový bod API

Funkce impersonace je založena na koncovém bodu `/users/:userId/impersonate` v Membership API. Technické podrobnosti najdete v části [Membership Endpoints](/docs/developer/api/endpoints/membership#users).

### Bezpečnostní aspekty

- Impersonace vyžaduje oprávnění Server.Admin. Toto oprávnění udělujte jen zřídka a pouze důvěryhodným provozovatelům platformy.
- Každá událost impersonace se zaznamenává s ID správcovského uživatele i ID cílového uživatele.
- Kostely o impersonaci nejsou informovány, proto si předem stanovte jasná pravidla, kdy a jak se tato funkce smí používat.
- Zvažte zaznamenávání událostí impersonace do vašeho systému pro správu podpůrných požadavků, aby byly dohledatelné.

## Moderování Commons

Commons je společná fronta pro moderování obsahu, který uživatelé odesílají napříč produkty. Písně WorshipCommons, lekce Lessons.church, šablony FreeShow i šablony webové stránky B1 procházejí stejnou frontou, namísto samostatných nástrojů pro kontrolu u jednotlivých produktů.

### Přístup ke Commons

1. Přejděte na kartu **Commons** v panelu Server Admin.
2. Uvidíte tři podkarty: **Queue** (Fronta), **Reports** (Hlášení) a **Assets** (Položky).

Omezená role **hudebního editora** může také vidět kartu Queue, ale nemůže schvalovat příspěvky, které mění práva nebo licenci písně.

### Fronta

Fronta obsahuje všechny čekající příspěvky ze všech produktů, které lze filtrovat podle produktu a typu položky. Každý řádek ukazuje, zda jde o novou položku, úpravu od původního autora, nebo úpravu od třetí strany. Dále zobrazuje historii schválení odesílatele a dobu čekání. Příspěvky čekající déle než 72 hodin jsou označeny.

Kliknutím na **Review** (Kontrola) otevřete panel s rozdíly na úrovni polí, náhledy souborů a vloženým náhledem položky určeným pouze pro čtení. Klávesovými zkratkami **a** / **r** můžete příspěvek schválit nebo zamítnout a klávesami **j** / **k** přecházet na další nebo předchozí příspěvek, aniž byste panel opustili. Při zamítnutí je nutné vybrat důvod (například kvalita, duplicita, licence, ccli, ai nebo nesouvisející obsah) a připsat poznámku.

### Hlášení

Karta Reports řeší hlášení porušení autorských práv a hlášení týkající se zásad nebo kvality u již publikovaných položek. Rozděluje je do samostatných front Copyright a Policy & Other a obsahuje také historii vyřešených položek Resolved. Hlášení si nejprve převezměte kliknutím na **Claim** (Převzít) a poté je vyřešte zvolením výsledku (upheld – potvrzeno, dismissed – zamítnuto nebo duplicate – duplicita) a akce (none – žádná, unpublish – zrušit zveřejnění, nebo remove – odstranit).

### Položky

Karta Assets je prohledávatelný přehled publikovaného obsahu s těmito akcemi: **Feature** (Doporučit) zvýrazní položku na domovské stránce produktu, **Unpublish** (Zrušit zveřejnění) a **Republish** (Znovu zveřejnit) slouží ke správě viditelnosti a **Remove** (Odstranit) položku odstraní s uvedením důvodu (autorská práva nebo zásady).

U písní se zde také rozhoduje, zda se píseň stane **Sunday-ready** (připravenou na nedělní bohoslužbu) a může se objevit ve vyhledávání písní v B1 Admin daného kostela. Recenzent otevře položku a u každé zveřejněné tóniny označí **Listened** (Poslechnuto) ve chvíli, kdy ji poslechl a ověřil, že jsou přítomny notový zápis, akordy i snímky. Píseň se stane připravenou na nedělní bohoslužbu až ve chvíli, kdy jsou všechny tóniny odškrtnuté.

:::info
Moderování Commons je určeno pouze pro zaměstnance. Jednotlivé kostely tuto frontu nikdy nevidí. Jediné místo, kde se B1 Admin jednotlivého kostela dotýká dat z Commons, je sekce „WorshipCommons — zdarma“ ve [vyhledávání písní](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons). Ta zobrazuje pouze písně, které již prošly tímto procesem kontroly.
:::

Podrobnosti o datovém modelu a životním cyklu příspěvků najdete na stránce [architektura Content Commons](/docs/developer/architecture/commons).

## Schvalování e-mailů ve skupinách

Kostely nemohou odesílat e-maily, které napsali sami (e-maily skupin, navazující zprávy z formulářů, e-maily z pracovních postupů a pozvánky k účtům), dokud je správce serveru neschválí. Díky tomu nemohou kostely registrované roboty využít sdílenou adresu odesílatele ChurchApps k rozesílání spamu.

1. Otevřete kartu **Churches** v panelu Server Admin.
2. U každého kostela je štítek **Group Email**: **Approved** (Schváleno, zeleně) nebo **Not approved** (Neschváleno, obrysový štítek).
3. Kliknutím na štítek a potvrzením schválíte kostel, nebo schválení zrušíte.

Zaměstnanci kostela žádají o schválení tlačítkem **Request review** (Požádat o kontrolu) v dialogu Send Email v B1 Admin. Žádost se odešle e-mailem na adresu podpory a obsahuje název kostela, jeho ID, datum registrace, umístění a to, kdo o schválení žádal. Kostel může odeslat jednu žádost za týden. Denní limit a automatické pozastavení při odrazených nebo reklamovaných zprávách najdete v části [omezení e-mailů psaných kostelem](/docs/developer/architecture/notifications#church-authored-email-limits).

## Migrace databáze

Workflow **Deploy Prod** aplikuje čekající migrace sám. Hostované databáze přijímají připojení pouze zevnitř sítě Api, takže GitHub runner se k nim nedostane. Workflow proto ihned po `serverless deploy` vyvolá Lambda funkci `migrate` z Api (`api-Prod-migrate`). Ta spustí čekající migrace všech modulů stejným runnerem jako tato karta a pokud některý modul selže nebo je odmítnut, nasazení selže. **Rollback Prod** vrací zpět pouze kód Lambda funkce. Již aplikované migrace zůstávají aplikované. Karta **Database Migrations** slouží ke kontrole stavu, ke spuštění migrací, které nasazení nespustilo (například v demo prostředí, jehož nasazení migrace nespouští), a k označení modulů bez historie jako výchozího stavu.

Karta zobrazuje aktuální prostředí a jeden řádek pro každý modul (membership, attendance, giving atd.) se stavem, počtem aplikovaných a čekajících migrací a poslední aplikovanou migrací.

- **Run Pending Migrations** (Spustit čekající migrace) aplikuje všechny čekající migrace, jeden modul po druhém a v daném pořadí. Při první chybě se zastaví a u každého modulu ukáže, co bylo aplikováno.
- Modul označený **No history** (Bez historie) má databázi, která vznikla před sledováním migrací. Nikdy se nespouští automaticky, protože by to znamenalo znovu přehrát staré datové migrace nad živými tabulkami. Místo toho klikněte na **Check Schema** (Zkontrolovat schéma). Api porovná tabulky, sloupce a indexy, které každá migrace vytváří, s živou databází. Každou migraci označí jako **Already applied** (Již aplikováno), **Missing** (Chybí), **Partly applied** (Částečně aplikováno) nebo **Data only** (Pouze data). Kontrola nic nemění.
- Ve výsledcích kontroly zapíše **Record as Already Applied** (Zaznamenat jako již aplikované) zjištěné migrace do historie migrací, aniž by je spustil (po potvrzení). Zaznamenány budou všechny migrace až po poslední označenou jako **Already applied**, včetně migrací typu **Data only** v tomto rozsahu. Migrace **Missing** zůstanou čekající a lze je poté normálně spustit tlačítkem **Run Pending Migrations**.
- Migrace **Partly applied** zaznamenání blokuje. Pokud je bezpečné ji spustit znovu (nejprve si ji přečtěte), zaškrtněte **Re-run** (Znovu spustit). Migrace tak zůstane čekající a poběží znovu od začátku.

Panel Server Admin i CLI (`yarn migrate:up`) používají stejný migrátor Kysely a tabulku `kysely_migration`, takže se vždy shodují v tom, co je aplikováno. Podpůrné koncové body jsou `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` a `POST .../:module/baseline`, všechny pouze pro Server.Admin.

## Související stránky

- [Autentizace a oprávnění](/docs/developer/api/endpoints/authentication): model oprávnění a autentizace JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership): API pro správu uživatelů a kostelů
- [Auditní protokol](/docs/b1-admin/reports/audit-log): zobrazení aktivity kostela
- [Architektura Content Commons](/docs/developer/architecture/commons): sdílený model položek a životní cyklus moderování
