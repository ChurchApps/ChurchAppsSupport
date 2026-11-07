---
title: "Twilio BYOK (návrh)"
description: "Navrhovaná integrace Twilio ve vlastnictví církve, model souhlasu, rozsah implementace a kritéria pro vydání."
---

# Návrh integrace Twilio BYOK

:::caution Návrh, nejde o dostupnou integraci
Toto je návrh k posouzení maintainery, vycházející z veřejného zdrojového kódu a dokumentace Twilio, které byly prozkoumány 22. října 2026. Od té doby byl vydán základní poskytovatel Twilio (`@churchapps/texting` 0.6.0 a **Nastavení > Textové zprávy** v B1 Admin): církev zadá svůj Account SID, Auth Token a číslo odesílatele From (poskytovatel přijímá také Messaging Service SID začínající `MG`, ale sloupec `fromNumber` má stále typ `varchar(20)`, což je pro 34znakový SID příliš krátké). Zprávy se odesílají jedním požadavkem na každého příjemce přes Messages API Twilio a odpovědi STOP se dostanou do B1 přes stávající příchozí webhook. Viz [Nastavení církve: Textové zprávy](../../b1-admin/settings/church-settings.md#texting). Model souhlasu, zpracování Advanced Opt-Out, stav doručení a kontroly připravenosti nastavení níže jsou stále návrhy, nikoli nasazené chování. Doprovodný [návrh onboardingu církve](./twilio-byok-onboarding-draft) obsahuje navrhované pokyny k nastavení a příklady specifické pro církve.
:::

## Doporučený postup

Přidat Twilio do stávajícího systému poskytovatelů textových zpráv v B1 pomocí **účtu Twilio ve vlastnictví církve, přihlašovacích údajů API, Messaging Service a telefonního čísla s podporou SMS**. Církev si sama zaregistruje svou právnickou osobu a marketingovou kampaň pro zprávy, platí Twilio přímo, udržuje souhlas příjemců a spravuje schválení v Twilio Console. ChurchApps dodá integraci a dokumentaci.

Začít s jedním programem zpráv, jednou Messaging Service a jedním americkým místním odesílatelem 10DLC na každou církev v B1. Podporovat jednotlivé zprávy, skupinové zprávy, zprávy z pracovních postupů a připomenutí k přihlášení prostřednictvím stávajících obrazovek B1. Vhodný první program pokrývá změny bohoslužeb, připomenutí akcí a plánování dobrovolníků, pokud jsou všechny tři popsány v souhlasu a schválené kampani dané církve. Financování nebo propagační zprávy vyžadují samostatně posouzený rozsah a souhlas; nepřidávejte je tiše do tohoto programu.

| Odpovědnost | Církev | B1 / ChurchApps |
|---|---|---|
| Účet Twilio, fakturace, vlastnictví čísla | Vlastní je a spravuje je | Neposkytuje platformní účet ani neprodává kredity dál |
| Značka, kampaň, registrace čísla | Odesílá přesné údaje o církvi; řeší kontrolu a opravy | Vysvětluje předpoklady a čte dostupné informace o připravenosti |
| Stránka pro přihlášení, zásady, účel zpráv | Publikuje je a udržuje | Poskytuje kompatibilní prvky formulářů, příklady a záznamy o souhlasu |
| Způsobilost příjemců a zpracování STOP | Kontroluje důkazy o souhlasu a vyžaduje odvolání přijaté mimo SMS | Vynucuje souhlas, potlačení, oprávnění a podepsané webhooky |
| Doručování a podpora | Sleduje chyby Twilio, stav účtu a příchozí odpovědi | Zobrazuje stav odeslání a doručení bez slibu záruky schválení |

Odložit zřízení nadřazeného účtu Twilio spravovaného ChurchApps, podřízených účtů pro zákazníky, nákup čísel, odeslání do Trust Hub, fakturaci, konverzační schránku, MMS/WhatsApp, mezinárodní odesílání a onboarding bezplatných čísel (toll-free). Bezplatné číslo je samostatná cesta ověřeného odesílatele, nikoli obchvat registrace. Tyto hranice udržují první vydání v souladu se stávajícím modelem B1 „přineste si vlastního poskytovatele“.

## Stávající základ a mezery

Následující zjištění jsou vázána na konkrétní snímky zdrojového kódu a nejsou předpokladem o tom, co je aktuálně nasazeno:

| Komponenta | Stávající chování | Dopad |
|---|---|---|
| [Registr poskytovatelů a kontrakt](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` podporuje jednotlivé a hromadné odesílání, validaci, volitelné schopnosti odběratelů/seznamů a ID zprávy u poskytovatele ve výsledcích. Žádný adaptér Twilio není registrován. | Přidat Twilio do `@churchapps/texting`; nepotřebuje vytváření odběratelů ani seznamy spravované poskytovatelem. |
| [Nastavení textových zpráv](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church a Nalo lze vybrat; MinistryStuff je řízen funkcemi. Úprava a ukládání odesílatele je zatím specifické pro Nalo. | Přidat explicitní pole pro Twilio, validaci, ukládání odesílatele a nápovědu k nastavení. Samotná položka v rozbalovacím seznamu nestačí. |
| [Kontrolér](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) a [brána modulu](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Přihlašovací údaje jsou šifrované a maskované; ruční i automatizovaná odeslání určují poskytovatele církve. Skupinová odeslání deduplikují sdílená telefonní čísla. | Znovu použít tyto cesty a zachovat autorizaci. Nové brány souhlasu a připravenosti umístit do společné serverové cesty, aby je pracovní postupy nemohly obejít. |
| [Pomocník pro STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Zpracovává `From`/`Body` ve stylu Twilio; ověřuje token církevní URL; nastavuje `person.optedOut` a vypíná připomenutí SMS. Ostatní odpovědi se ignorují. | Je to užitečný výchozí bod, nikoli úplný webhook Twilio. Přidat podpisy Twilio a nezávislý stav odběru SMS. |
| [Schéma zpráv](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Ukládá `apiKey`, `apiSecret` a `fromNumber` o délce 20 znaků; záznamy o doručení ukládají okamžitý úspěch/chybu, nikoli ID poskytovatele nebo konečné stavy doručení. | Číslo odesílatele ve formátu E.164 se vejde; 34znakový SID Messaging Service potřebuje vlastní pole. Přidat trvalé ukládání ID zpráv a stavů u poskytovatele. |
| [Veřejná stránka formuláře](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [sdílený renderer formulářů](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) a [kontrolér odeslání formuláře](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Existují neomezené formuláře a volitelná zaškrtávací pole. Popisy jsou prostý text. Odeslání uchovávají odpovědi, ale cesta pro textové zprávy nemá evidenci souhlasu specifickou pro kampaň. | Přidat nakonfigurovaný prvek souhlasu se SMS s reálnými odkazy na zásady a zachycením důkazů na serveru; obecné zaškrtávací pole ani členství ve skupině nesmí automaticky udělit souhlas se SMS. |

Uživatelská [dokumentace nastavení církve](../../b1-admin/settings/church-settings#texting) také vysvětluje, že aktuální příznak odhlášení je sdílený se soromím adresáře. Toto propojení je záležitostí pro vydání: odpověď START nesmí nikdy změnit viditelnost v adresáři.

## Návrh konfigurace a přihlašovacích údajů

Používat explicitní, doplňková konfigurační pole namísto přetěžování `fromNumber` nebo ukládání strukturovaných dat do řetězce API klíče:

| Pole | Navrhovaný účel |
|---|---|
| `accountSid` | Identifikátor účtu/projektu Twilio ve vlastnictví církve (`AC…`) |
| `apiKey`, `apiSecret` | Vyhrazený SID klíče API Twilio (`SK…`) a jeho tajemství pro odchozí přístup k API; šifrované a maskované |
| `webhookAuthToken` | Auth Token účtu používaný SDK Twilio k ověření příchozích podpisů; samostatně šifrovaný/maskovaný |
| `messagingServiceSid` | Messaging Service církve (`MG…`, 34 znaků) |
| `fromNumber` | Vybrané číslo s podporou SMS ve formátu E.164, ověřené jako odesílatel v daném účtu/službě |
| Konfigurace programu | Stabilní ID programu, název, povolené účely, URL pro přihlášení/zásady a verze oznámení |

Twilio [upřednostňuje klíče API pro autentizaci REST](https://www.twilio.com/docs/iam/api-keys). Používat nejužší otestovaná oprávnění klíče, která pokrývají odesílání a požadované kontroly nastavení pouze pro čtení. Auth Token účtu je stále potřeba pro [standardní kontrolu podpisu webhooku Twilio](https://www.twilio.com/docs/usage/security). Tento rozdíl vysvětlit v uživatelském rozhraní; tajemství API není Auth Token webhooku. Přihlašovací údaje uchovávat výhradně v úložišti nastavení na straně serveru, nikdy na veřejných stránkách, v odpovědích formulářů, v požadavcích na odeslání z prohlížeče nebo v hlášeních podpory.

Církev tyto prostředky vytváří a spravuje v Console. Ověřovací akce B1 smí pouze číst nakonfigurovanou službu, odesílatele a údaje o registraci. Nesmí kupovat čísla, vytvářet kampaně, měnit nastavení Twilio ani odesílat zkušební zprávu jako vedlejší efekt. Samostatnou výslovnou akci pro zkušební odeslání poskytnout pouze pro způsobilého příjemce, který souhlasil.

Zachovat maskované přihlašovací údaje pouze při úpravě stejného uloženého poskytovatele. Přepnutí na Twilio musí vyžadovat vlastní přihlašovací údaje a vymazat zastaralé hodnoty specifické pro poskytovatele; maskovaný klíč Clearstream nebo Nalo nepřenášet do konfigurace Twilio.

Každé načtení a aktualizaci omezit na ověřenou církev v B1. Zpětná volání vázat na uloženou integraci a očekávaný účet/službu/odesílatele Twilio a odmítnout konfliktní přiřazení mezi církvemi. Rotace přihlašovacích údajů a odpojení poskytovatele musí zneplatnit připravenost a pozastavit čekající odesílání, aniž by smazaly souhlasy nebo historické záznamy o doručení.

## Souhlas a potlačení jsou povinná práce pro vydání

Zavést záznamy o odběru vázané na telefonní číslo pro program Twilio a doplňkové záznamy o souhlasu a potlačení, které nelze měnit ani mazat. Navrhované minimální důkazy jsou: ID církve, ID programu, normalizované telefonní číslo, volitelná ověřená vazba na osobu, potvrzená akce, ID zdrojového formuláře/odeslání nebo zkontrolovaný externí důkaz, časové razítko serveru, text a verze oznámení, zdrojová URL, URL zásad a události odvolání/obnovení. Přístup a dobu uchovávání omezit podle stávajících zásad zabezpečení dat církve.

Používat stavy jako `unknown`, `pending`, `active` a `suppressed`. Existující mobilní čísla, importované kontakty, docházka, dary, členství ve skupině, `person.optedOut = false` a `allowSms` nejsou výslovným souhlasem s programem. Import doloženého souhlasu musí být akce s oprávněním a auditem se zaznamenaným zdrojem; migrace nesmí zapsat do programu všechny.

Pro počáteční webový tok používat standardní režim veřejného formuláře v B1. Přidat explicitně nakonfigurovanou otázku s souhlasem se SMS, která je zpočátku nezaškrtnutá, zůstává volitelná, zobrazuje klikatelné odkazy na zásady a mapuje se na jeden program a jedno mobilní pole. Toto mapování ověřit na serveru a při ukládání kladné odpovědi zachytit zobrazené oznámení. Souhlas nikdy neodvozovat z libovolných popisků otázek, konverzační AI nebo členství v pracovním postupu. Ekvivalent v konverzaci povolit až po otestování výslovné kladné interakce a zaznamenání důkazů.

Nezaškrtnuté odeslání nevytváří odběr a nesmí odvolat existující souhlas někoho jiného. Vázat souhlas na odeslané telefonní číslo; zaměstnanci mohou vyřešit nejednoznačné vazby na osoby, aniž by slučovali domácnosti. Změněné mobilní číslo potřebuje vlastní souhlas. U anonymních formulářů použít ochranu proti zneužití a výslovně uvést jakékoli ověření vlastnictví čísla nebo krok dvojitého potvrzení; samotné zaškrtnutí políčka neprokazuje, kdo telefon vlastní. Pokud se používá potvrzení, ponechat odběr ve stavu čekání, dokud není dokončen, a tento přesný postup popsat v registračních materiálech.

Pro Twilio oddělit potlačení SMS od viditelnosti v adresáři. Zastaralé odhlášení konzervativně převést na záznam o potlačení; ostatní zastaralé příjemce ponechat jako `unknown`. Výslovná, zdokumentovaná nová registrace může založit souhlas se SMS, zatímco soukromí v adresáři zůstane beze změny. Chování ostatních poskytovatelů zachovat, dokud nebudou jejich migrace samostatně posouzeny.

Při každém skutečném odeslání vyžadovat, aby byla integrace církve povolena/připravena, aby existoval aktuální souhlas s programem pro přesné číslo, aby neexistovalo potlačení na úrovni telefonu a aby bylo splněno stávající oprávnění volajícího. Připomenutí navíc respektují `allowSms`, předvolby kategorií a tichou dobu. Po zařazení do fronty znovu kontrolovat, rozlišit pole pro sloučení, normalizovat a ověřit čísla a deduplikovat podle telefonu. STOP potlačí všechna odeslání pro službu/program, včetně ručních odeslání a pracovních postupů; musí se vztahovat také na každou osobu sdílející dané telefonní číslo.

Zobrazit identitu církve a pokyn STOP konzistentně ve společné cestě odesílání Twilio a zobrazit náhled konečného počtu SMS/segmentů. Rozvinutí polí pro sloučení a zpracování délky musí tyto prvky zachovat; pokyn k odhlášení nesmí být tiše zkrácen. Příklady a skutečné šablony připomenutí a pracovních postupů udržovat v souladu.

## Odeslání, odpovědi a stav doručení přes Twilio

Implementovat `TwilioProvider.sendMessage` přes Messages API s vybranou Messaging Service a odesílatelem. Vracet SID zprávy od poskytovatele a výsledek „přijato/odesláno“; přijetí přes HTTP není doručení na zařízení. Skupinové odeslání používá výsledky pro jednotlivé příjemce v pořadí vstupu.

Omezit souběžnost odchozích zpráv pro **obě** metody `sendBulk` i jednotlivá odeslání: aktuální větev s poli pro sloučení rozesílá volání `sendMessage` paralelně. Ukládat záměr odeslání a úkoly k převzetí pro skupiny, které se nevejdou do rozpočtu jednoho požadavku; znovu použít stávající model nasazení, aniž by církve musely provozovat další službu. Známé přechodné chyby nebo chyby limitu rychlosti opakovat s postupným prodlužováním prodlev. Nejednoznačné časové limity považovat za neznámé výsledky k dohledání, nikoli jako pokyn k slepému opakování, což by riskovalo duplicitní zprávy a poplatky.

Nakonfigurovat URL zpětných volání pro příchozí zprávy a stav pro konkrétní církev. Ověřovat `X-Twilio-Signature` pomocí SDK, přesné nakonfigurované externí URL, původních parametrů formuláře a odpovídajícího Auth Token účtu. Samotná tajná URL nestačí. Přiřazovat zpětná volání k uloženým záznamům církve/účtu/zprávy, zpracovávat duplicity a zpětná volání, která dorazí dříve, než je výsledek odeslání uložen, a zabránit tomu, aby starší události přepsaly konečný stav. Pro příchozí potvrzení vrátit prázdné TwiML a pro události stavu vhodnou odpověď o úspěchu. [Zabezpečení Twilio](https://www.twilio.com/docs/usage/security), [zpětná volání stavu](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Doporučit pro Messaging Service **Advanced Opt-Out**. Potvrzení STOP/START/HELP zajišťuje Twilio; B1 zpracovává ověřené události `OptOutType` a neodesílá duplicitní potvrzení. STOP okamžitě zaznamená potlačení. START obnoví pouze známý odběr pro tento stejný popsaný program, s novou událostí obnovení; nesmí zapsat nového telefona do nesouvisejících zpráv ani zapnout předvolby připomenutí. HELP nikoho nezapisuje. Ostatní příchozí odpovědi zůstávají mimo rozsah schránky B1; církve potřebují zdokumentovaný způsob, jak je sledovat v Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Uložit SID zprávy Twilio, vazbu na účet/službu, čas odeslání, konečný stav/kód chyby a čas zpětného volání spolu se záznamem o doručení. Zobrazovat přesně stavy „ve frontě/přijato“, „doručeno“, „selhalo“, „nedoručeno“ nebo „neznámé“. Zachovat stávající kontrakt odpovědi pro ostatní poskytovatele a definovat, zda souhrnné počty úspěchů představují odeslání, nebo doručení.

## Kontrola připravenosti nastavení a ověření schválení

Zobrazit samostatné kontrolní body pro přihlašovací údaje, vlastnictví služby/odesílatele, ověření kampaně, registraci čísla, kontroly webhooků a ověřenou zkušební zprávu. Nikdy nezobrazovat jediný zelený štítek „schváleno“ jen proto, že přihlašovací údaje fungují.

U amerických místních čísel přečíst [zdroj Usa2p kampaně](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) služby a vyžadovat, aby příslušná kampaň měla stav `VERIFIED`. Odděleně ověřit, že vybrané telefonní číslo je přiřazeno k dané službě a dokončilo registraci čísla: schválená kampaň může mít stále čekající číslo. Pokud podporované čtecí API nezveřejňuje potřebný signál, zobrazit **vyžaduje se ruční ověření v Console** a zaznamenat datované potvrzení správce církve jako takové; neoznačovat ho jako ověřené přes API. Automatizované události registrace čísel mohou být následným krokem. [Chyby registrace čísel](https://www.twilio.com/docs/api/errors/30035), [události registrace A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Před povolením odesílání vyžadovat aktuální kontroly; zaznamenat, kdy a jak byla připravenost ověřena, nechat zastaralé kontroly vypršet a pozastavit odesílání při odvolaných přihlašovacích údajích, změněných odesílatelích, selháních registrace nebo trvalých chybách účtu. Doručení zkušební zprávy potvrzuje pouze ověřenou cestu, nikoli všeobecné schválení operátorem ani souhlas příjemce. Doprovodný návrh specifikuje kontroly církve před odesláním žádosti, před spuštěním a průběžné provozní kontroly.

## Plán repozitáře a vydání

[Průvodce přispíváním do organizace](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) směruje požadavky na funkce B1 do ChurchAppsSupport a implementační PR do vlastnících repozitářů. Použít jeden centrální požadavek na funkci a propojit na něj zaměřené implementační PR:

1. **ChurchAppsSupport:** před prezentací Twilio jako dostupné funkce pro uživatele prověřit tento návrh a jeho návrh onboardingu.
2. **Packages:** přidat adaptér Twilio, explicitní sdílenou konfiguraci/rozhraní a vykreslování formulářů se souhlasem se SMS tam, kde je sdíleno mezi B1Admin/B1App. Zahrnout changesety a publikovat přes stávající vydávací workflow dříve, než se aktualizují spotřebitelé.
3. **Api:** přidat aditivní migrace pro metadata integrace, souhlas/potlačení a stavy doručení; implementovat validaci konfigurace, sdílené brány odeslání, zachycení důkazů z formulářů, zpracování webhooků a trvalé ukládání odesílání.
4. **B1Admin:** přidat uživatelské rozhraní pro konfiguraci a připravenost Twilio, správu programu a souhlasu, ukládání odesílatele podle poskytovatele a přesné hlášení doručení. Nezpřístupňovat přepsání souhlasu se SMS prostřednictvím běžných úprav osob.
5. **B1App:** ověřit veřejný formulář/stránku a zkušenost se odkazy na zásady oproti sdíleným prvkům, včetně anonymních návštěvníků a návštěvníků na mobilu. Samostatný prohlížečový klient Twilio není potřeba.
6. **ChurchAppsSupport:** po vydání přeměnit návrh onboardingu na podporované stránky s nastavením a nápovědou, doplnit skutečné snímky obrazovky, odkázat na něj z nastavení textových zpráv a zajistit překlady.

Nasazovat schéma a sdílené balíčky dříve než spotřebitele. Funkci Twilio omezit feature flagem pro malý pilot s dobrovolnou účastí; stávající poskytovatelé musí nadále fungovat. Vrácení zpět vypne odesílání přes Twilio a zruší nezaslané úlohy, přičemž zachová odhlášení a důkazy; nesmí automaticky přepnout příjemce na jiného poskytovatele nebo jiného odesílatele.

## Odhad úsilí

Plánovací odhad pro přispěvatele obeznámeného s ekosystémem; v tomto hodnocení nebyly použity žádné produkční přihlašovací údaje ani živé SMS:

| Práce | Vývojářské dny |
|---|---|
| Adaptér, rozšíření konfigurace a schématu, uživatelské rozhraní nastavení | 2–3 |
| Souhlas telefon/program, nezávislé potlačení, sdílené brány odeslání, integrace veřejného formuláře | 3–5 |
| Podepsaná zpětná volání, ukládání doručení, omezené/trvalé odesílání | 2–3 |
| Uživatelské rozhraní připravenosti, příručka pro církve, integrační a regresní testování, opravy pilotu | 3–4 |
| **Doporučený rozsah spuštění** | **10–15 celkem** |

Základní prototyp adaptéru/nastavení trvá zhruba 1–2 dny. Odhad pouze pro odesílatele nezahrnuje práci na souhlasu a onboardingu, která je pro toto doporučení nezbytná. Doba externího posouzení Twilio/operátory je samostatná a proměnlivá; projekt nesmí slibovat termín schválení ani jeho výsledek.

## Kritéria přijetí

- [ ] Církev vlastní a platí účet, službu, registrovaného odesílatele a kampaň; není vyžadován účet Twilio spravovaný ChurchApps.
- [ ] Přihlašovací údaje jsou šifrované/maskované, omezené na nájemce, rotovatelné a nejsou obsaženy v protokolech ani ve veřejném obsahu; ověření je pouze pro čtení.
- [ ] Nezaškrtnutý volitelný souhlas zobrazuje reálné odkazy na zásady a ukládá důkazy o programu/telefonu/oznámení na serveru; odmítnutí stále umožňuje primární akci formuláře.
- [ ] Všechny ruční cesty, skupinové, cesty s poli pro sloučení, pracovní postupy a připomenutí vynucují stejnou bránu způsobilosti Twilio. Nepotvrzení, chybějící souhlas, změněný telefon nebo potlačení vedou k přeskočení příjemce s užitečným důvodem; vykreslování zachovává identitu církve a pokyny STOP po rozvinutí a zpracování délky.
- [ ] Zastaralá viditelnost v adresáři nezapisuje příjemce; STOP/START nikdy nemění viditelnost v adresáři ani nesouvisející předvolby. Případy sdíleného telefonu a příkazy mezi církvemi jsou otestovány.
- [ ] Podepsané STOP/START/HELP, neplatné podpisy, nesprávné účty/služby, duplicitní události, opakovaná odeslání formulářů a padělané mapování souhlasu jsou pokryty testy.
- [ ] Velikost skupiny/časové limity, limity rychlosti, částečná selhání, nejednoznačné výsledky, souběhy zpětných volání a události doručení mimo pořadí jsou otestovány bez duplicitních odeslání.
- [ ] Schválení kampaně a dokončená registrace čísla jsou odlišené od ověření přihlašovacích údajů. Ruční důkazy jsou jasně označeny; zastaralá nebo odvolaná připravenost blokuje odesílání.
- [ ] Pilotní církev ověří svou stránku pro přihlášení, zamítnutou i přijatou cestu formuláře, přesné URL zásad a zkušebního příjemce, který souhlasil, a to od odeslání přes doručení a potlačení STOP až po povolené opětovné přihlášení.
- [ ] Stávající nastavení a chování odesílání pro Clearstream, Text In Church a Nalo projdou regresními kontrolami; texty nápovědy odlišují návrhy od vydaných funkcí.
