---
title: "Zavedení církve do Twilio (koncept)"
description: "Návrh nastavení Twilio ve vlastnictví církve v B1, pokyny pro veřejnou registraci, příklady kampaní a kontrolní seznam pro schválení."
---

# Zavedení církve do Twilio (koncept)

:::caution Návrh pro plánovanou integraci
Toto je navrhovaný postup. B1 nyní nabízí základní volbu **Twilio** v části **Nastavení > Textové zprávy** (Account SID, Auth Token, From Number a webhook pro příchozí STOP) – viz [Nastavení církve: Textové zprávy](../../b1-admin/settings/church-settings.md#texting). Další nastavení B1, mapování souhlasu a kroky ověření níže jsou požadavky pro budoucí verzi, nikoli pokyny, jak najít existující nastavení. Rozsah a závislosti si přečtěte v [technickém návrhu](./twilio-byok-proposal.md). Zdroje Twilio byly ověřeny 22. října 2026; před odesláním kampaně ověřte aktuální požadavky.
:::

## Doporučené uspořádání

Vaše církev vlastní svůj placený účet Twilio, telefonní číslo, Messaging Service, fakturaci a registraci kampaně. B1 by odesílal zprávy přes tyto prostředky pomocí přihlašovacích údajů zadaných soukromě v nastavení církve. Zajistěte, aby k účtu Twilio měli přístup alespoň dva příslušní správci církve, zapněte zabezpečení účtu a určete osobu odpovědnou za souhlasy, příchozí odpovědi a oznámení o zamítnutí.

První navrhovaná verze podporuje jedno americké místní číslo a jeden jasně popsaný program církevních zpráv. Níže uvedené příklady používají fiktivní církev **Grace Community Church** a program **Grace Church Updates** pro změny bohoslužeb, připomenutí akcí a plánování dobrovolníků. Každé jméno, doménu, frekvenci, kontakt a účel nahraďte skutečnou praxí vaší církve. Jde o příklady pravidel Twilio specifické pro církev, nikoli o předem schválenou kampaň ani o slib schválení.

## 1. Připravte veřejný registrační postup v B1

Na webu vaší církve, který je postaven na B1, zveřejněte stránku, například `https://www.example.org/text-updates`, s vloženým veřejným formulářem B1 nebo s výrazným odkazem na samostatný veřejný formulář. Zveřejněte také `https://www.example.org/privacy` a `https://www.example.org/sms-terms`. Tyto adresy jsou pouze zástupné; do registrace uveďte skutečné dostupné URL.

Pro navrhovaný registrační formulář SMS:

| Nastavení | Doporučená konfigurace |
|---|---|
| Přístup | Veřejný bez omezení; aktivní během kontroly i při průběžném zapisování; dostupný bez přihlášení |
| Režim formuláře | Zpočátku standardní režim; konverzační režim vyžaduje výslovnou podporu souhlasu popsanou v technickém návrhu |
| Mobil | Jasně označený s předvolbou země; vyžadován pouze při volbě zápisu do SMS, pokud se používá v obecném formuláři pro spojení nebo akce |
| Volba SMS | Samostatné nepovinné zaškrtávací políčko, ve výchozím stavu nezaškrtnuté, propojené s konkrétním programem a polem pro mobil |
| Upozornění | Viditelná vedle volby SMS: církev/program, účel a frekvence zpráv, možné poplatky, STOP, HELP, kontakt na podporu a skutečné klikatelné odkazy na zásady ochrany osobních údajů a podmínky SMS |
| Další akce | Hosté mohou odeslat kartu spojení, registrovat se na akci nebo požádat o informace, aniž by se přihlásili k SMS |
| Důkazy | Uložte program, přesné telefonní číslo, zvolený souhlas, zdrojové odeslání, čas serveru a verzi upozornění nebo zásad; běžná odpověď ve formuláři sama o sobě dnes někoho nezapíše |
| Automatizace osob a skupin | Při počátečním pilotním provozu registrace vypněte automatické vytváření osob a přiřazování do skupin, pokud nebyla zkontrolována podle stávajících pravidel párování v církvi. Přiřazení do skupiny nikdy není autorizací k SMS. |
| Stávající automatizace | Nezapisujte každého odesílatele formuláře nebo člena skupiny do pracovního postupu s textovými zprávami. Pouze navrhované ověřené mapování souhlasu může takový program autorizovat. |
| Poděkování v textové zprávě | Potvrďte, že byl formulář přijat, a nepište, že došlo k zápisu do SMS, pokud bylo políčko odmítnuto nebo potvrzení či kontrola ještě probíhá. |

Stávající zaškrtávací otázka může sloužit jako ilustrace formuláře, B1 však stále potřebuje evidenci souhlasů a kontrolní brány pro odesílání. Sdílený vykreslovač formulářů dnes zobrazuje popisy jako prostý text; zápis Markdownu nebo adresy URL tam nezaručí, že odkazy na zásady budou klikatelné. Implementace musí poskytnout přístupný ovládací prvek souhlasu se skutečnými odkazy. Viz [vytváření formulářů v B1](../../b1-admin/forms/creating-forms.md) a [technický návrh](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio vyžaduje dobrovolný a ověřitelný souhlas (opt-in). Nespojujte SMS s povinnými členskými podmínkami, souhlasy s e-mailem nebo telefonem, souhlasem s darováním ani registrací na akci. Mobilní číslo na návštěvnické kartě samo o sobě není souhlasem s SMS. Viz Twilio [požadavky na dobrovolný souhlas](https://www.twilio.com/docs/api/errors/30923) a [doporučení pro kampaně](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Příklad textu registrace

Použijte jej, až církev zvolí skutečné účely, odesílatele a frekvenci. Zaškrtávací políčko je nepovinné a na začátku nezaškrtnuté; názvy zásad musí být v zobrazeném formuláři odkazy.

> Ano, chci, aby mi církev Grace Community Church psala prostřednictvím programu Grace Church Updates o změnách bohoslužeb, církevních akcích a rozpisech dobrovolníků z čísla [registrované číslo církve]. Očekávejte nejvýše 4 zprávy měsíčně. Mohou být účtovány standardní poplatky operátora za zprávy a data. Odhlásíte se odpovědí STOP, nápovědu získáte odpovědí HELP. Přihlášení k SMS je nepovinné a není potřebné k účasti, registraci ani darování. Viz naše Zásady ochrany osobních údajů a Podmínky SMS. Dotazy: [e-mail nebo telefon podpory církve].

„Nejvýše 4“ je příklad závazku, nikoli limit předepsaný Twilio. Nahraďte jej frekvencí, kterou církev skutečně dodrží; pokud frekvence kolísá, řekněte to pravdivě a popište očekávaný rytmus. Propagační nabídky nebo další programy služeb nedávejte do tohoto políčka, pokud nebyly samostatně posouzeny jejich účely a souhlas.

U obecného formuláře pro návštěvníky nebo akce musí odeslání se zaškrtávacím políčkem nezaškrtnutým stále proběhnout úspěšně. Formulář výhradně pro SMS může vysvětlit, že zaškrtnutí žádá o zápis, ale nikdy nesmí způsobit, že nesouvisející bohoslužby budou závislé na zápisu. Ověřte skutečné chování na telefonu i na počítači.

### Obsah zásad, který je třeba připravit

Stránka o ochraně osobních údajů církve má vysvětlit, jaké údaje pro textové zprávy shromažďuje, jak je používá a chrání, a jaké jsou její pravidla uchovávání a kontaktní postupy. Má jasně uvádět, že mobilní čísla a souhlasy se zprávami nejsou prodávány ani sdíleny se třetími stranami nebo přidruženými subjekty pro jejich marketingové nebo propagační účely. Nezbytné zpracování u poskytovatelů služeb vysvětlete přesně; netvrďte, že církev žádného zpracovatele nepoužívá, pokud používá B1 a Twilio. Referencí pro toto rozlišení jsou [pokyny k zásadám ochrany osobních údajů](https://www.twilio.com/docs/api/errors/30908) a [doporučení pro kampaně](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) od Twilio.

Podmínky SMS mají uvádět církev a program, účely, skutečnou frekvenci, možné poplatky za zprávy, pokyny STOP/HELP, kontakt na podporu a odkaz na ochranu osobních údajů; zahrňte i další upozornění, která vyžaduje aktuální kontrola Twilio. Odkazy na zásady na stránce s registrací musí přesně odpovídat adresám URL odeslaným v kampani. Od 30. června 2026 Twilio u nových registrací kampaní přes API vyžaduje veřejné URL stránek s ochranou osobních údajů a podmínkami; jeho konzolový postup je také shromažďuje. [Požadavek Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Jde o požadavky na obsah, které je třeba uplatnit na skutečné zásady církve. Nenahrazují její stávající postupy ochrany osobních údajů a nejsou obecnou šablonou, kterou lze vložit bez kontroly.

## 2. Zaregistrujte církev a její program zpráv v Twilio

1. Vytvořte nebo použijte **placený účet ve vlastnictví církve** a americké místní číslo podporující SMS. Používejte důsledně oficiální název církve, identifikační číslo (EIN) nebo údaje o registraci, adresu, web a oprávněného zástupce. Neuvádějte identitu ChurchApps ani údaje jiné církve.
2. Postupujte podle registrace značky Twilio pro přímé zákazníky pro skutečný typ subjektu církve. U způsobilé neziskové organizace použijte [pokyny k registraci neziskových organizací](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Případy použití pro charity nebo organizace podle 501(c)(3) závisí na způsobilosti; samotný název církve neznamená schválení ani výjimku od Twilio.
3. Vytvořte samostatnou službu Messaging Service a odešlete příslušnou kampaň A2P 10DLC. Zvolte případ použití, který pravdivě odpovídá skutečným zprávám a možnostem schválené značky; příklady zde neurčují žádný univerzální kód případu použití pro církve.
4. Uveďte veřejnou URL registrace, URL zásad, úplný popis souhlasu a toku zpráv a požadované ukázkové zprávy. Zahrňte každý skutečný způsob registrace; prohlášení o vloženém odkazu a telefonním čísle nastavte podle skutečného obsahu. Neuvádějte registraci klíčovým slovem ani dvojitý souhlas (double opt-in), pokud takový postup neexistuje a nebyl otestován.
5. Přiřaďte odesílající číslo ke službě a schválené kampani. Před odesláním počkejte na ověření kampaně **i na dokončenou registraci čísla**.

Tyto kroky provádějte v konzoli Twilio vaší církve. Navrhovaná integrace B1 registrace pro církve neodesílá. Pokyny Twilio [rychlý start registrace](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) a [zdroj kampaně](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) vysvětlují pole registrace a stavy. Čekající číslo může blokovat odesílání i poté, co je kampaň schválena. [Registrace čísla](https://www.twilio.com/docs/api/errors/30035)

### Příklad popisu kampaně

> Církev Grace Community Church používá program Grace Church Updates k odesílání změn v rozpisu bohoslužeb, připomenutí církevních akcí a oznámení o plánování dobrovolníků lidem, kteří se k tomuto programu přihlásili na našem veřejném webu. V rámci tohoto programu odesíláme nejvýše čtyři zprávy měsíčně. Příjemci mohou tyto zprávy kdykoli odhlásit. Tento program nezahrnuje zakoupené kontakty, propagace třetích stran ani výzvy k financování.

Tento příklad se hodí pouze pro církev, která tato omezení a vyloučení skutečně dodržuje. Pokud samotná připomenutí dobrovolníků překračují slíbenou frekvenci, před odesláním upravte návrh programu i upozornění.

### Příklad popisu toku zpráv

> Návštěvníci otevřou [skutečnou URL registrace církve], zadají mobilní číslo a samostatně zvolí nepovinné zaškrtávací políčko Grace Church Updates. Při otevření formuláře je nezaškrtnuté. Upozornění uvádí církev Grace Community Church, popisuje změny bohoslužeb, připomenutí akcí a rozpisy dobrovolníků, uvádí měsíční limit a možné poplatky a vysvětluje STOP a HELP. Zobrazené zásady ochrany osobních údajů a podmínky SMS vedou na [skutečnou URL ochrany osobních údajů] a [skutečnou URL podmínek SMS]. Odmítnutí SMS nebrání účasti, registraci na akci, darování ani použití obecného formuláře pro spojení. B1 zaznamenává kladný výběr, telefonní číslo, čas odeslání a verzi upozornění. Tento program posíláme pouze zdokumentovaným odběratelům a před dalším odesláním potlačujeme odvolané souhlasy.

Tento odstavec upravte podle skutečně implementovaného postupu. Pokud se používá potvrzení telefonem nebo kontrola zaměstnancem, popište čekající stav a přesný krok aktivace. Pokud se používají další způsoby, uveďte každý z nich a jeho důkaz. Pokud je zápis za přihlášením nebo probíhá na papíře, Twilio žádá veřejný, anonymizovaný důkaz skutečného postupu souhlasu; nikdy nezveřejňujte vyplněné formuláře ani údaje o členech. [Pokyny k ověřitelnému souhlasu](https://www.twilio.com/docs/api/errors/30923)

### Příklady odchozích zpráv

Jsou to fiktivní ukázky k přizpůsobení; před odesláním použijte skutečné URL církve a nahraďte hranatými závorkami uvedené hodnoty. API kampaní Twilio přijímá dva až pět vzorků. Vzorky mají identifikovat církev, odpovídat deklarovanému účelu a obsahovat pokyn k odhlášení. [Pole ukázek kampaně](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Nedělní bohoslužba začne v [čas] kvůli [důvod]. Podrobnosti: [URL webu církve]. Odhlásíte se odpovědí STOP.
```

```text
Grace Community Church: Připomínáme, že [církevní akce] se koná [datum] v [čas]. Informace: [URL akce církve]. Odhlásíte se odpovědí STOP.
```

```text
Grace Community Church: Jste naplánováni ve službě týmu [tým] tento [den]. Zkontrolujte prosím svůj rozpis: [URL církevního portálu B1]. Odhlásíte se odpovědí STOP.
```

Hranatě uzavřené URL popisují ukázkové proměnné; odeslané příklady mají ukazovat skutečnou doménu církve a skutečný způsob odkazování. Odkaz na rozpis může vyžadovat přihlášení, ale stránka registrace a zásady použité při posuzování mají být veřejně dostupné. Do ukázek pro schválení nezahrnujte soukromé poznámky, údaje o dětech ani identifikovatelné údaje o členech. Obsah ukázek udržujte v souladu s tím, co skutečně odesílají šablony B1; neslibujte schránku pro odpovědi ani konkrétní chování připomenutí, které není k dispozici.

### Odpovědi na STOP, START a HELP

Pro tato potvrzení použijte Twilio Messaging Service Advanced Opt-Out a přizpůsobte identitu církve nebo programu a údaje o podpoře. Příklad zamýšlených odpovědí:

- **STOP:** Potvrďte, že program Grace Church Updates byl zastaven, a vysvětlete podporovaný způsob obnovení odběru.
- **START:** Potvrďte obnovení tohoto stejného programu, včetně jeho identity, frekvence a poplatků a pokynů pro nápovědu a odhlášení, jak to vyžaduje nakonfigurovaný postup.
- **HELP:** Uveďte církev Grace Community Church a skutečný kontakt na podporu a pokyny k odhlášení.

Pokud Twilio odpověď již odeslalo, neposílejte druhé potvrzení z B1. Odpověď HELP není zápis. START nesmí přihlásit člověka k dalším církevním programům ani ho zveřejnit v adresáři členů. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Před odesláním zkontrolujte balíček pro schválení

- [ ] Skutečné právní údaje církve o značce, identita webu a účel kampaně si navzájem odpovídají.
- [ ] Stránka registrace a aktivní formulář se otevřou bez přihlášení v soukromém prohlížeči, včetně mobilního zařízení.
- [ ] Zaškrtávací políčko SMS je na začátku nezaškrtnuté a lze je odmítnout při dokončení hlavní akce pro návštěvníka nebo akci.
- [ ] Účel programu, odesílatel, skutečná frekvence, možné poplatky, STOP, HELP, kontakt na podporu a klikatelné odkazy na zásady se zobrazují vedle volby SMS.
- [ ] Přesné URL zásad ochrany osobních údajů a podmínek, které jsou uvedeny u Twilio, jsou veřejné, fungují bez přihlašovacích údajů a identifikují stejnou církev a program. Obsah zásad odpovídá skutečnému zpracování.
- [ ] Každá ukázková zpráva odpovídá programu, skutečné identitě odesílatele a očekávanému chování odkazů a telefonních čísel. Kampaň popisuje každý skutečný způsob registrace.
- [ ] Anonymizované snímky obrazovky ukazují prázdný formulář, zaškrtávací políčko s upozorněními a odkazy na zásady tak, jak je uvidí kontroloři. Důkazy neobsahují záznamy členů ani klíče.
- [ ] Církev má provozní způsob, jak uchovávat důkazy o souhlasu a před odesláním respektovat odvolání, včetně žádostí přijatých telefonicky nebo e-mailem.

Tyto kontroly pomáhají předejít zbytečným neshodám; o schválení rozhodují Twilio a jeho kontrolní partneři. Skutečnou stránku registrace a URL zásad udržujte dostupné i po schválení, nejen během kontroly.

## 4. Připojte a ověřte budoucí integraci B1

Po vydání integrace by se v navrhovaném nastavení Textových zpráv měly shromáždit Account SID církve, vyhrazený API Key SID a tajný klíč, samostatný Auth Token pro webhook, SID služby Messaging a vybraný odesílatel. Klíče vytvářejte pouze v konzoli církve a tajné údaje zadávejte pouze do soukromého nastavení B1. [Pokyny k API klíčům Twilio](https://www.twilio.com/docs/iam/api-keys)

Specifické URL webhooků pro příchozí zprávy a stavy doručení, které poskytne B1, zkopírujte do odpovídající konfigurace služby Twilio. Zapněte Advanced Opt-Out a ověřte, že příchozí zprávy dorazí na nakonfigurovaný webhook. B1 by měl zobrazit samostatné kontroly pro přihlašovací údaje, vlastnictví služby a odesílatele, ověřenou kampaň, dokončenou registraci čísla, ověření příchozích zpráv a doručení testovací zprávy. Uložené přihlašovací údaje ani přijatý požadavek API nejsou konečným doručením.

Pokud B1 nemůže programově zkontrolovat signál registrace, potvrďte jej přímo v konzoli; uživatelské rozhraní musí označit datovaný výsledek jako potvrzený správcem. Před zapnutím produkčních zpráv vyřešte stav čekající nebo neúspěšné registrace. Pro samostatný, výslovně vyžádaný test použijte skutečného souhlasícího dospělého příjemce testu, a poté:

1. Ověřte, že odpovídající zdokumentovaná registrace vytvoří správný záznam souhlasu s telefonním číslem a programem; odmítnutí nebo změna telefonu nesmí tiše zapsat příjemce.
2. Odešlete jednu zkušební zprávu, potvrďte její přijetí a porovnejte stav v B1 s SID zprávy Twilio a výsledkem doručení.
3. Odpovězte STOP a ověřte, že ruční zprávy, skupinové zprávy, pracovní postupy a připomenutí tento telefon přeskočí. Viditelnost v adresáři se nemá změnit.
4. Vyzkoušejte zdokumentovaný postup opětovného přihlášení ke stejnému programu a odpověď HELP; ověřte, že nedochází ke zdvojeným potvrzením ani k nesouvisejícím změnám předvoleb.

## 5. Udržujte program

Určete vlastníka za církev, který bude sledovat stav kampaně a účtu, zůstatek a upozornění na fakturaci, selhání zpráv a příchozí odpovědi v Twilio. Navrhované první vydání B1 nemá konverzační schránku SMS, proto zveřejněte a sledujte skutečný kontakt na podporu a kontrolujte odpovědi, místo abyste předpokládali, že je zaměstnanci uvidí v B1.

Záznamy o souhlasech a odvoláních, aktuální verze upozornění a zásad, identifikátory kampaně a anonymizované důkazy o schválení uchovávejte ve službách pod kontrolou církve. Klíče ani seznamy příjemců nikdy nevkládejte do veřejných podpůrných požadavků. Když se změní číslo, služba, přihlašovací údaje, postup registrace, frekvence nebo účel, před obnovením provozu znovu zkontrolujte integraci a tam, kde je to nutné, aktualizujte registraci i souhlas. Sdílená čísla domácností a změněná čísla pečlivě kontrolujte; způsobilost závisí na souhlasícím telefonu a programu, nikoli na záznamu každého člena rodiny.

Při zamítnutí přečtěte skutečnou chybu Twilio, opravte konkrétní nesrovnalost jak na webu, tak v odeslané žádosti a znovu ji odešlete přes konzoli církve. U neregistrovaných nebo čekajících odesílatelů počkejte na dokončení registrace a nepřepínejte čísla, abyste to obešli. Použijte [řešení potíží s registrací Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) a dodaný přehled chybových kódů. Neslibujte pevnou dobu vyřízení.
