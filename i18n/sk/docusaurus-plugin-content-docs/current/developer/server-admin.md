---
title: "Správa servera"
---

# Správa servera

<div class="article-intro">

Funkcie správy servera v ChurchApps sú dostupné iba používateľom s oprávnením **Server.Admin**. Tieto nástroje slúžia na prevádzku platformy, podporu a riešenie problémov vo všetkých cirkvách v systéme.

</div>

:::warning Prístup obmedzený
Funkcie opísané na tejto stránke vyžadujú oprávnenie **Server.Admin** a nie sú dostupné bežným správcom cirkví. Sú určené iba pre prevádzkovateľov platformy a pracovníkov podpory.
:::

## Prístup do správy servera

Používatelia s oprávnením Server.Admin môžu otvoriť panel správy servera v B1 Admin:

1. Prihláste sa na [admin.b1.church](https://admin.b1.church)
2. Otvorte [ponuku Jump](../b1-admin/introduction.md#getting-around-with-the-jump-menu), rozbaľte **Settings** a kliknite na **Server Admin**. (Môžete tiež prejsť priamo na `admin.b1.church/admin`.)
3. Panel Server Admin zobrazuje svoje sekcie v ľavom stĺpci v troch skupinách: **Directory** (Churches, Users, Impersonate User), **Operations** (Background Jobs, Commons, Usage Trends) a **System** (Translation Lookups, Server Health, Database Migrations)

## Obnovenie dvojfaktorového prihlásenia

Ak má používateľ zapnuté [dvojfaktorové prihlásenie](../b1-admin/profile/managing-profile.md#two-factor-sign-in) a stratil telefón aj záložné kódy, môže ho správca servera vypnúť:

1. Otvorte sekciu **Users** na paneli Server Admin a vyhľadajte používateľa.
2. Používatelia s dvojfaktorovým prihlásením majú odznak **Two-factor on**. Vedľa neho kliknite na **Reset 2FA**.
3. Potvrďte výzvu. Pred týmto krokom vždy overte, s kým komunikujete.

Používateľ sa potom môže prihlásiť iba heslom a znovu nastaviť dvojfaktorové prihlásenie vo svojom profile. Obnovenia sa zapisujú do auditného záznamu ako `mfa_reset`. Koncový bod je `POST /membership/users/mfa/reset/:userId` a vyžaduje oprávnenie Server.Admin.

## Prihlásenie ako iný používateľ

Funkcia impersonácie umožňuje správcom servera prihlásiť sa ako iný používateľ na účely podpory a riešenia problémov. Je to užitočné pri vyšetrovaní problémov nahlásených používateľmi alebo pri pomoci cirkvám s nastavením ich systémov.

### Ako prihlásiť sa ako používateľ

1. Otvorte sekciu **Impersonate User** na paneli Server Admin.
2. Do vyhľadávacieho poľa zadajte meno alebo e-mailovú adresu používateľa.
3. Kliknite na **Search** alebo stlačte Enter.
4. Vo výsledkoch vyhľadávania kliknite na používateľa, za ktorého sa chcete prihlásiť.
5. Potvrďte impersonáciu v dialógovom okne, ktoré sa zobrazí.
6. Budete prihlásený ako tento používateľ a presmerovaný do jeho účtu.

### Dôležité poznámky

- Impersonácia vytvorí novú reláciu s oprávneniami a prístupom k cirkvi cieľového používateľa.
- Vaša pôvodná správcovská relácia sa ukončí, keď sa prihlásite ako iný používateľ.
- Všetky akcie vykonané počas impersonácie sa zaznamenávajú do auditnej stopy.
- Ak sa chcete vrátiť k svojmu správcovskému účtu, odhláste sa a znovu sa prihláste svojimi prihlasovacími údajmi.
- Impersonáciu používajte iba v prípade potreby na účely podpory a vždy informujte používateľov, keď pristupujete k ich účtom kvôli podpore.

### Koncový bod API

Funkcia impersonácie je postavená na koncovom bode `/users/:userId/impersonate` v Membership API. Technické podrobnosti nájdete v časti [Membership Endpoints](/docs/developer/api/endpoints/membership#users).

### Bezpečnostné aspekty

- Impersonácia vyžaduje oprávnenie Server.Admin – toto oprávnenie by sa malo udeľovať len zriedka a iba dôveryhodným prevádzkovateľom platformy.
- Všetky udalosti impersonácie sa zaznamenávajú spolu s ID správcovského používateľa a ID cieľového používateľa.
- Cirkvi nie sú o impersonácii informované, preto si stanovte jasné zásady, kedy a ako sa táto funkcia má používať.
- Zvážte zaznamenávanie udalostí impersonácie vo vašom systéme podporných tiketov kvôli zodpovednosti.

## Moderovanie Commons

Commons je spoločný moderačný front pre obsah, ktorý používatelia odosielajú naprieč produktmi. Piesne WorshipCommons, lekcie Lessons.church, šablóny FreeShow a šablóny webového tvorcu B1 prechádzajú všetky tým istým frontom namiesto samostatných nástrojov na kontrolu pre jednotlivé produkty.

### Prístup do Commons

1. Prejdite na kartu **Commons** na paneli Server Admin.
2. Uvidíte tri podkarty: **Queue**, **Reports** a **Assets**.

Obmedzená rola **hudobného editora** môže tiež vidieť kartu Queue, no nemôže schvaľovať odoslania, ktoré menia práva alebo licencovanie piesne.

### Queue

Queue zobrazuje všetky čakajúce odoslania zo všetkých produktov, ktoré je možné filtrovať podľa produktu a typu položky. Každý riadok ukazuje, či ide o novú položku, úpravu jej pôvodného autora alebo úpravu od tretej strany. Zobrazuje tiež históriu schvaľovania odosielateľa a to, ako dlho odoslanie čaká (po 72 hodinách sa označí).

Kliknutím na **Review** otvoríte panel s rozdielmi na úrovni polí, náhľadmi súborov a vloženým náhľadom položky iba na čítanie. Klávesovými skratkami **a**/**r** odoslanie schválite alebo zamietnete a klávesami **j**/**k** prechádzate na ďalšie alebo predchádzajúce odoslanie bez opustenia panela. Pri zamietnutí je potrebné vybrať dôvod (napríklad quality, duplicate, licensing, ccli, ai alebo off-topic) a pridať poznámku.

### Reports

Karta Reports spracúva hlásenia o autorských právach a o zásadách či kvalite, ktoré boli podané voči už zverejneným položkám. Je rozdelená na samostatné fronty Copyright a Policy & Other a na históriu vyriešených hlásení (Resolved). Hlásenie si najprv prevezmite (Claim), aby ste ho mohli spracovávať, a potom ho vyriešte výsledkom (upheld, dismissed alebo duplicate) a akciou (none, unpublish alebo remove).

### Assets

Karta Assets je prehliadač zverejneného obsahu s možnosťou vyhľadávania. Obsahuje akcie **Feature** (zvýrazní položku na domovskej stránke produktu), **Unpublish**/**Republish** (zverejnenie zrušiť alebo obnoviť) a **Remove** (odstránenie s uvedením dôvodu z oblasti autorských práv alebo zásad).

Pre piesne je tu aj miesto, kde sa pieseň stáva **pripravenou na nedeľu** a môže sa zobraziť vo vyhľadávaní piesní v B1 Admin danej cirkvi. Recenzent otvorí položku a pri každej zverejnenej tónine označí **Listened**, keď si ju vypočuje a potvrdí, že sú prítomné noty, akordy a snímky. Pieseň sa stane pripravenou na nedeľu až vtedy, keď sú všetky tóniny označené.

:::info
Moderovanie Commons je vyhradené pre zamestnancov – jednotlivé cirkvi tento front nikdy nevidia. Jediné miesto, kde sa dáta Commons zobrazujú v B1 Admin jednotlivej cirkvi, je sekcia „WorshipCommons — free“ vo [vyhľadávaní piesní](/docs/b1-admin/serving/songs#free-songs-from-worshipcommons). Tá zobrazuje iba piesne, ktoré už prešli týmto procesom kontroly.
:::

Podrobnosti o dátovom modeli a životnom cykle odoslaní nájdete na stránke [Architektúra Content Commons](/docs/developer/architecture/commons).

## Schválenie e-mailov skupín

Cirkvi nemôžu odosielať e-maily, ktoré napísali (e-maily skupín, následné správy z formulárov, e-maily pracovných postupov a pozvánky do účtov), kým ich správca servera neschváli. Tým sa zabráni tomu, aby cirkvi registrované botmi používali spoločnú odosielaciu adresu ChurchApps na spam.

1. Otvorte kartu **Churches** na paneli Server Admin.
2. Každá cirkev zobrazuje štítok **Group Email**: **Approved** (zelený) alebo **Not approved** (obrysový).
3. Kliknutím na štítok a potvrdením schválite cirkev alebo schválenie zrušíte.

Zamestnanci cirkvi žiadajú o schválenie tlačidlom **Request review** v dialógu Send Email v B1 Admin. Žiadosť sa odošle e-mailom na adresu podpory a obsahuje názov cirkvi, ID, dátum registrácie, miesto a to, kto žiadosť podal. Cirkev môže odoslať jednu žiadosť za týždeň. Denný limit a automatické pozastavenie pri nedoručených správach a sťažnostiach nájdete v časti [Obmedzenia e-mailov písaných cirkvou](/docs/developer/architecture/notifications#church-authored-email-limits).

## Migrácie databázy

Pracovný postup **Deploy Prod** aplikuje čakajúce migrácie sám. Hostované databázy prijímajú pripojenia iba zvnútra siete Api, takže ich GitHub runner nedosiahne. Namiesto toho workflow hneď po `serverless deploy` zavolá Lambdu `migrate` z Api (`api-Prod-migrate`), ktorá spustí čakajúce migrácie každého modulu rovnakým runnerom, ako používa táto karta, a ak niektorý modul zlyhá alebo je odmietnutý, nasadenie zlyhá. **Rollback Prod** vracia iba kód Lambdy; aplikované migrácie zostávajú aplikované. Karta **Database Migrations** slúži na kontrolu stavu, na spustenie všetkého, čo nasadenie nespustilo (napríklad v demo prostredí, kde nasadenie migrácie nespúšťa), a na nastavenie východiskovej histórie pre moduly bez histórie. (Self-hosted inštalácie v Dockeri spúšťajú migrácie automaticky pri štarte kontajnera Api.)

Karta zobrazuje aktuálne prostredie a jeden riadok na každý modul (membership, attendance, giving a ďalšie) so stavom, počtom aplikovaných a čakajúcich migrácií a poslednou aplikovanou migráciou.

- **Run Pending Migrations** aplikuje všetky čakajúce migrácie, po jednom module v správnom poradí. Zastaví sa pri prvom zlyhaní a zobrazí, čo sa aplikovalo pre každý modul.
- Modul označený **No history** má databázu, ktorá predchádza sledovaniu migrácií. Nikdy sa nespúšťa automaticky, pretože by to znovu spustilo staré dátové migrácie nad živými tabuľkami. Namiesto toho kliknite na **Check Schema** pri tomto module. Api porovná tabuľky, stĺpce a indexy, ktoré každá migrácia vytvára, so živou databázou a každej migrácii priradí stav **Already applied**, **Missing**, **Partly applied** alebo **Data only**. Kontrola nič nemení.
- Vo výsledkoch kontroly **Record as Already Applied** zapíše zistené migrácie do histórie migrácií bez ich spustenia (po potvrdení). Zapíše sa všetko až po poslednú migráciu so stavom **Already applied** vrátane migrácií **Data only** v tomto rozsahu. Migrácie **Missing** zostávajú čakajúce a potom ich možno normálne spustiť cez **Run Pending Migrations**.
- Migrácia **Partly applied** blokuje zápis do histórie. Ak je bezpečné ju spustiť znovu (najprv si ju prečítajte), zaškrtnite **Re-run**, aby zostala čakajúca a spustila sa znovu od začiatku.

Panel Server Admin a CLI (`yarn migrate:up`) používajú ten istý migrátor Kysely a tabuľku `kysely_migration`, takže sa vždy zhodujú v tom, čo už bolo aplikované. Podporné koncové body sú `GET /membership/serverHealth/migrations`, `POST /membership/serverHealth/migrations/:module/run`, `GET .../:module/detect` a `POST .../:module/baseline`, všetky len pre Server.Admin.

## Súvisiace stránky

- [Autentifikácia a oprávnenia](/docs/developer/api/endpoints/authentication) — Model oprávnení a autentifikácia JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API na správu používateľov a cirkví
- [Audit Log](/docs/b1-admin/reports/audit-log) — Zobrazenie záznamov aktivity cirkvi
- [Architektúra Content Commons](/docs/developer/architecture/commons) — Model zdieľaných položiek a životný cyklus moderovania
