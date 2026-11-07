---
title: "Twilio BYOK (návrh)"
description: "Navrhovaná integrácia Twilio vo vlastníctve cirkvi, model súhlasu, rozsah implementácie a kritériá vydania."
---

# Návrh integrácie Twilio BYOK

:::caution Návrh — nie je dostupná integrácia
Tento dokument je návrh na posúdenie správcami. Vychádza z verejného zdrojového kódu a dokumentácie Twilio, ktoré sme preskúmali 22. októbra 2026. Odvtedy bol vydaný základný poskytovateľ Twilio (`@churchapps/texting` 0.6.0 a **Settings > Texting** v B1 Admin): cirkev zadá svoj Account SID, Auth Token a číslo odosielateľa. Poskytovateľ síce akceptuje aj Messaging Service SID začínajúci na `MG`, ale stĺpec `fromNumber` má stále `varchar(20)`, čo je pre 34-znakový SID príliš málo. Správy sa odosielajú jednou požiadavkou na každého príjemcu cez Messages API Twilio a odpovede STOP sa do B1 dostávajú cez existujúci webhook pre prichádzajúce správy. Pozri [Nastavenia cirkvi: Texting](../../b1-admin/settings/church-settings.md#texting). Model súhlasu, spracovanie rozšíreného odhlásenia (Advanced Opt-Out), stav doručenia a kontroly pripravenosti nastavenia uvedené nižšie sú stále návrhy, nie vydané správanie. [Návrh pokynov na zavedenie cirkvi](./twilio-byok-onboarding-draft.md) obsahuje navrhované postupy nastavenia a príklady špecifické pre cirkev.
:::

## Odporúčaný postup

Pridajte Twilio do existujúceho systému poskytovateľov textových správ v B1 s použitím **účtu Twilio vo vlastníctve cirkvi, API poverení, Messaging Service a telefónneho čísla s podporou SMS**. Cirkev zaregistruje vlastnú právnickú osobu a marketingovú kampaň pre správy, platí Twilio priamo, spravuje súhlas príjemcov a schvaľovanie v Twilio Console. ChurchApps poskytuje integráciu a dokumentáciu.

Začnite s jedným programom správ, jednou službou Messaging Service a jedným lokálnym americkým odosielateľom 10DLC na každú cirkev v B1. Podporte jednotlivé správy, skupinové správy, správy z pracovných postupov a pripomienky na prihlásenie cez existujúce obrazovky B1. Prvý program môže pokrývať zmeny bohoslužieb, pripomienky k udalostiam a plánovanie dobrovoľníkov, ak sú všetky tri popísané v súhlase danej cirkvi a schválenej kampani. Propagačné alebo fundraisingové správy vyžadujú samostatné posúdenie rozsahu a súhlasu, preto ich nepridávajte potichu do tohto programu.

| Zodpovednosť | Cirkev | B1 / ChurchApps |
|---|---|---|
| Účet Twilio, fakturácia, vlastníctvo čísel | Vlastní ich a spravuje | Neposkytuje platformový účet ani neperspredáva kredity |
| Značka, kampaň, registrácia čísla | Predkladá presné údaje o cirkvi; rieši kontrolu a opravy | Vysvetľuje predpoklady a číta dostupné informácie o pripravenosti |
| Stránka na prihlásenie, zásady, účel správ | Publikuje a udržiava ich | Poskytuje kompatibilné ovládacie prvky formulárov, príklady a záznamy o súhlase |
| Oprávnenosť príjemcov a spracovanie STOP | Kontroluje dôkazy o súhlase a žiada o prijatie mimo SMS | Vynucuje súhlas, potlačenie, oprávnenia a podpisované webhooky |
| Doručovanie a podpora | Sleduje chyby Twilio, stav účtu a prichádzajúce odpovede | Zobrazuje stav odoslania a doručenia bez sľubov o schválení |

Odložte vlastný rodičovský účet Twilio vytvorený ChurchApps, podúčty pre zákazníkov, nákup čísel, odoslanie údajov do Trust Hub, fakturáciu, konverzačnú schránku, MMS/WhatsApp, medzinárodné odosielanie a onboarding bezplatných čísel. Bezplatné číslo je samostatná cesta overeného odosielateľa, nie obchádzka registrácie. Tieto hranice zaisťujú, že prvé vydanie zostane v súlade s existujúcim modelom B1, v ktorom si každá cirkev prináša vlastného poskytovateľa.

## Existujúci základ a medzery

Nasledujúce zistenia sa vzťahujú na snímky zdrojového kódu a nepredpokladajú, čo je v súčasnosti nasadené:

| Komponent | Existujúce správanie | Dôsledok |
|---|---|---|
| [Register poskytovateľov a kontrakt](https://github.com/ChurchApps/Packages/tree/68c93d610031d3ed56d3582055413e851c5cb2ee/texting/src) | `ITextingProvider` obsahuje jednotlivé a hromadné odoslanie, validáciu, voliteľné schopnosti odberateľa/zoznamu a ID správy od poskytovateľa vo výsledkoch. Adaptér Twilio nie je registrovaný. | Pridajte Twilio do `@churchapps/texting`; nepotrebuje vytváranie odberateľov ani zoznamy spravované poskytovateľom. |
| [Nastavenia textových správ](https://github.com/ChurchApps/B1Admin/blob/e33cc2386d96e2e3cb24e760d458a72b699c71c3/src/settings/components/TextingSettingsEdit.tsx) | Clearstream, Text In Church a Nalo sa dajú vybrať; MinistryStuff je obmedzený funkciou. Úprava a ukladanie odosielateľa je momentálne špecifické pre Nalo. | Pridajte explicitné polia pre Twilio, validáciu, ukladanie odosielateľa a pomoc pri zavedení. Samotná položka v rozbaľovacom zozname nestačí. |
| [Kontroler](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/controllers/TextingController.ts) a [brána modulu](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/shared/modules/MessagingModuleGateway.ts) | Poverenia sú šifrované a maskované; manuálne aj automatizované odosielanie určuje poskytovateľa cirkvi. Skupinové odoslanie odstraňuje duplicitné telefónne čísla. | Využite tieto cesty a zachovajte autorizáciu. Nové brány súhlasu a pripravenosti umiestnite do spoločnej serverovej cesty, aby ich pracovné postupy nemohli obísť. |
| [Pomocník pre STOP](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/messaging/helpers/SmsOptOutHelper.ts) | Spracúva `From`/`Body` v štýle Twilio; overuje token URL cirkvi; nastavuje `person.optedOut` a vypína pripomienky SMS. Ostatné odpovede sa ignorujú. | Je to užitočný východiskový bod, nie úplný webhook Twilio. Pridajte podpisy Twilio a samostatný stav odberu SMS. |
| [Schéma správ](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/tools/migrations/messaging/2026-04-03_initial_schema.ts) | Ukladá `apiKey`, `apiSecret` a `fromNumber` s dĺžkou 20 znakov; logy doručenia ukladajú okamžitý úspech/chybu, nie ID poskytovateľa ani konečné stavy doručenia. | Číslo E.164 sa hodí; 34-znakový SID služby Messaging Service potrebuje vlastné pole. Pridajte trvalé ukladanie ID správ a stavov od poskytovateľa. |
| [Verejná stránka formulára](https://github.com/ChurchApps/B1App/blob/5ca19ee4ef947235b8ffba9fbb35af42d0dcb41d/src/app/%5BsdSlug%5D/%28public%29/%5BpageSlug%5D/%5Bid%5D/components/FormPage.tsx), [spoločný renderer formulárov](https://github.com/ChurchApps/Packages/blob/68c93d610031d3ed56d3582055413e851c5cb2ee/apphelper/src/forms/components/QuestionEdit.tsx) a [kontroler odoslaní formulárov](https://github.com/ChurchApps/Api/blob/82eda28b6803754548ce007bd52177a21700f118/src/modules/membership/controllers/FormSubmissionController.ts) | Existujú formuláre bez obmedzení a voliteľné zaškrtávacie polia. Popisy sú čistý text. Odoslania uchovávajú odpovede, ale cesta pre textové správy nemá evidenciu súhlasu špecifickú pre kampaň. | Pridajte nakonfigurovaný ovládací prvok súhlasu so SMS s reálnymi odkazmi na zásady a serverovým zachytávaním dôkazov. Všeobecné zaškrtávacie pole ani členstvo v skupine automaticky nesmie povoliť SMS. |

[Používateľská dokumentácia k nastaveniam cirkvi](../../b1-admin/settings/church-settings.md#texting) tiež vysvetľuje, že aktuálny príznak odhlásenia je zdieľaný s ochranou súkromia v adresári. Toto prepojenie je dôležité pre vydanie: odpoveď START nesmie nikdy zmeniť viditeľnosť v adresári.

## Návrh konfigurácie a poverení

Použite explicitné, doplnkové konfiguračné polia namiesto preťažovania `fromNumber` alebo ukladania štruktúrovaných údajov do reťazca API kľúča:

| Pole | Navrhovaný účel |
|---|---|
| `accountSid` | Identifikátor účtu/projektu Twilio vo vlastníctve cirkvi (`AC…`) |
| `apiKey`, `apiSecret` | SID API kľúča Twilio (`SK…`) a tajomstvo pre odchádzajúci prístup k API; šifrované a maskované |
| `webhookAuthToken` | Auth Token účtu použitý SDK Twilio na overenie podpisov prichádzajúcich správ; samostatne šifrovaný a maskovaný |
| `messagingServiceSid` | Messaging Service cirkvi (`MG…`, 34 znakov) |
| `fromNumber` | Vybrané číslo s podporou SMS vo formáte E.164, overené ako odosielateľ v danom účte/službe |
| Konfigurácia programu | Stabilné ID programu, názov, povolené účely, URL na prihlásenie a zásady a verzia upozornenia |

Twilio [uprednostňuje API kľúče pre autentifikáciu REST](https://www.twilio.com/docs/iam/api-keys). Používajte najužšie otestované oprávnenia kľúča, ktoré pokrývajú odosielanie a potrebné kontroly nastavenia len na čítanie. Auth Token účtu je stále potrebný na [štandardnú kontrolu podpisu webhooku Twilio](https://www.twilio.com/docs/usage/security). Tento rozdiel vysvetlite v používateľskom rozhraní: tajomstvo API nie je Auth Token pre webhook. Poverenia uchovávajte výhradne v serverovom úložisku nastavení, nikdy na verejných stránkach, v odpovediach formulárov, v požiadavkách na odoslanie z prehliadača ani v tiketoch podpory.

Cirkev tieto zdroje vytvára a spravuje v Console. Overovacia akcia v B1 smie iba čítať nakonfigurovanú službu, odosielateľov a údaje o registrácii. Nesmie kupovať čísla, vytvárať kampane, meniť nastavenia Twilio ani odosielať testovaciu správu ako vedľajší efekt. Samostatná výslovne spustená akcia testovacieho odoslania má byť obmedzená na oprávneného a súhlasiaceho príjemcu.

Maskované poverenia zachovajte len pri úprave toho istého uloženého poskytovateľa. Prepnutie na Twilio musí vyžadovať vlastné poverenia a vymazať zastarané hodnoty špecifické pre poskytovateľa. Maskovaný kľúč od Clearstream alebo Nalo nesmie prejsť do konfigurácie Twilio.

Každé načítanie a aktualizácia musí byť obmedzené na overenú cirkev v B1. Spätné volania viažte na uložené integrácie a očakávaný účet, službu alebo odosielateľa v Twilio a odmietnite konfliktné priradenia medzi cirkvami. Rotácia poverení a odpojenie poskytovateľa majú zneplatniť pripravenosť a pozastaviť čakajúce odoslania bez vymazania súhlasov alebo historických záznamov o doručení.

## Súhlas a potlačenie sú povinnou súčasťou vydania

Zaveďte záznamy o odbere viazané na telefón pre program Twilio a pridajte len-pripojiteľné (append-only) udalosti súhlasu a potlačenia. Navrhované minimum dôkazov: ID cirkvi, ID programu, normalizované telefónne číslo, voliteľné overené priradenie k osobe, výslovná akcia súhlasu, ID zdrojového formulára/odoslania alebo skontrolovaný externý dôkaz, časová pečiatka servera, text a verzia upozornenia, zdrojová URL, URL zásad a udalosti odvolania alebo obnovenia. Prístup a dobu uchovávania obmedzte podľa existujúcich zásad ochrany údajov cirkvi.

Používajte stavy ako `unknown`, `pending`, `active` a `suppressed`. Existujúce mobilné čísla, importované kontakty, účasť na bohoslužbách, dary, členstvo v skupine, `person.optedOut = false` a `allowSms` nie sú výslovným súhlasom s programom. Import zdokumentovaného súhlasu má byť akcia s oprávnením, auditom a zaznamenaným zdrojom. Migrácia nesmie zapísať do programu každého.

Pre prvý webový tok použite štandardný režim verejného formulára v B1. Pridajte výslovne nakonfigurovanú otázku o súhlase so SMS, ktorá je na začiatku nezaškrtnutá, zostáva voliteľná, zobrazuje klikateľné odkazy na zásady a mapuje sa na jeden program a jedno mobilné pole. Mapovanie overte na serveri a pri ukladaní kladnej odpovede uložte snímku zobrazeného upozornenia. Súhlas nikdy neodvodzujte z ľubovoľných označení otázok, konverzačnej AI ani členstva v pracovnom postupe. Konverzačný ekvivalent povoľte až po otestovaní výslovnej kladnej interakcie a zaznamenávania dôkazov.

Odoslanie bez zaškrtnutia nevytvára odber a nesmie odvolať existujúci súhlas niekoho iného. Súhlas viažte na odoslané telefónne číslo; zodpovední zamestnanci môžu riešiť nejednoznačné priradenia k osobám bez zlúčenia domácností. Zmenené mobilné číslo potrebuje vlastný súhlas. Pri anonymných formulároch uplatnite ochranu proti zneužitiu a výslovne uveďte akékoľvek overenie vlastníctva čísla alebo dvojité potvrdenie. Samotné zaškrtnutie políčka nedokazuje, kto je vlastníkom telefónu. Ak sa použije potvrdenie, nechajte odber v stave pending, kým sa nedokončí, a presne opíšte tento postup v registračných materiáloch.

Pri Twilio oddeľte potlačenie SMS od viditeľnosti v adresári. Staré odhlásenie konzervatívne prevedte na záznam o potlačení; ostatných starých príjemcov nechajte ako `unknown`. Výslovne zdokumentované nové prihlásenie môže vytvoriť súhlas so SMS, pričom ochrana súkromia v adresári zostane nezmenená. Správanie ostatných poskytovateľov zachovajte, kým sa ich migrácie samostatne neposúdia.

Pri každom skutočnom odoslaní vyžadujte, aby bola integrácia cirkvi povolená/pripravená, aby existoval aktuálny súhlas s programom pre presné telefónne číslo, aby nebolo potlačenie na úrovni telefónu a aby bolo splnené existujúce oprávnenie volajúceho. Pripomienky navyše rešpektujú `allowSms`, predvoľby kategórií a tiché hodiny. Po zaradení do fronty znova overte, rozbaľte polia zlúčenia, normalizujte a overte čísla a odstráňte duplicity podľa telefónu. STOP potlačí všetky odoslania pre službu/program vrátane manuálnych odoslaní a pracovných postupov; musí sa vzťahovať aj na každú osobu, ktorá zdieľa dané telefónne číslo.

Identitu cirkvi a pokyn STOP zobrazujte jednotne v spoločnej ceste odosielania Twilio a zobrazte konečný počet SMS/segmentov pred odoslaním. Rozbalenie polí zlúčenia a spracovanie dĺžky musia zachovať tieto prvky; pokyn na odhlásenie nesmie byť potichu skrátený. Príklady a skutočné šablóny pripomienok a pracovných postupov udržiavajte v súlade.

## Odosielanie, odpovede a stav doručenia v Twilio

Implementujte `TwilioProvider.sendMessage` cez Messages API s vybranou službou Messaging Service a odosielateľom. Vráťte SID správy od poskytovateľa a výsledok accepted/submitted; HTTP potvrdenie nie je doručenie na zariadenie. Skupinové odoslanie používa výsledky pre jednotlivých príjemcov v poradí vstupu.

Obmedzte súbežnosť odchádzajúcich správ pre **aj** `sendBulk`, aj jednotlivé odoslania: aktuálna vetva so zlúčením polí spúšťa paralelné volania `sendMessage`. Pre skupiny, ktoré sa nezmestia do rozpočtu jednej požiadavky, uchovávajte zámer odoslania a úlohy, ktoré možno prevziať. Znovu použite existujúci model nasadenia, aby cirkvi nemuseli prevádzkovať ďalšiu službu. Pri známych dočasných chybách alebo chybách limitu rýchlosti opakujte pokus s odstupňovaným čakaním. Nejasné časové limity považujte za neznámy výsledok, ktorý treba zosúladiť, a nie za pokyn na slepé opätovné odoslanie, ktoré by mohlo spôsobiť duplicitné správy a poplatky.

Nakonfigurujte URL pre prichádzajúce správy a spätné volania stavu pre konkrétnu cirkev. Overujte `X-Twilio-Signature` pomocou SDK, presnej nakonfigurovanej externej URL, pôvodných parametrov formulára a zodpovedajúceho Auth Tokenu účtu. Samotná tajná URL nestačí. Spätné volania priraďte k uloženým záznamom cirkvi/účtu/správy, spracujte duplicity a spätné volania, ktoré prídu skôr, než sa výsledok odoslania uloží, a zabráňte tomu, aby staršie udalosti prepísali konečný stav. Pre prichádzajúce potvrdenie vráťte prázdny TwiML a pre udalosti stavu primeranú úspešnú odpoveď. [Zabezpečenie Twilio](https://www.twilio.com/docs/usage/security), [spätné volania stavu](https://www.twilio.com/docs/messaging/guides/track-outbound-message-status)

Odporúčame **Advanced Opt-Out** v Messaging Service. Twilio zabezpečuje potvrdenia pre STOP/START/HELP; B1 spracúva overené udalosti `OptOutType` bez odosielania duplicitných potvrdení. STOP okamžite zaznamená potlačenie. START obnoví len známy odber pre tento rovnaký zverejnený program a vytvorí novú udalosť obnovenia; nesmie zapísať nový telefón do nesúvisiacej komunikácie ani zapnúť predvoľby pripomienok. HELP nikoho nezapisuje. Ostatné prichádzajúce odpovede zostávajú mimo rozsahu schránky B1; cirkvi potrebujú zdokumentovaný spôsob, ako ich sledovať v Twilio. [Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

Ukladajte SID správy Twilio, väzbu na účet a službu, čas odoslania, konečný stav/kód chyby a čas spätného volania spolu so záznamom o doručení. Zobrazujte presne stavy zaradené/prijaté, doručené, zlyhané, nedoručené alebo neznáme. Zachovajte existujúcu odpoveď pre ostatných poskytovateľov a určite, či súhrnné úspešné počty predstavujú odoslanie alebo doručenie.

## Pripravenosť nastavenia a overenie schválenia

Zobrazte samostatné kontrolné body pre poverenia, vlastníctvo služby a odosielateľa, overenie kampane, registráciu čísla, kontroly webhookov a overené testovacie doručenie. Nikdy nezobrazujte jediný zelený odznak „schválené“ len preto, že poverenia fungujú.

Pri lokálnych amerických číslach prečítajte [zdroj Usa2p campaign](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) danej služby a vyžadujte, aby príslušná kampaň mala stav `VERIFIED`. Samostatne overte, že vybrané telefónne číslo je priradené k tejto službe a dokončilo registráciu čísla: schválená kampaň môže mať stále čakajúce číslo. Ak podporované API na čítanie nezverejňuje potrebný signál, zobrazte **vyžaduje sa manuálne overenie v Console** a zaznamenajte datované potvrdenie správcu cirkvi s touto poznámkou; neoznačujte ho ako overené cez API. Automatizované udalosti registrácie čísel môžu byť ďalším krokom. [Chyby registrácie čísla](https://www.twilio.com/docs/api/errors/30035), [udalosti registrácie A2P](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/event-streams-setup)

Pred povolením odoslaní vyžadujte aktuálne kontroly; zaznamenajte, kedy a ako sa pripravenosť kontrolovala, zneplatňujte zastarané kontroly a pozastavte odosielanie pri zrušených poverení, zmenených odosielateľoch, zlyhaniach registrácie alebo pretrvávajúcich chybách účtu. Úspešné testovacie doručenie potvrdzuje len otestovaný postup, nie všeobecné schválenie operátorom ani súhlas príjemcu. Sprievodný návrh špecifikuje kontroly cirkvi pred podaním, pred spustením a priebežné prevádzkové kontroly.

## Plán repozitára a vydania

[Pokyny organizácie na prispievanie](https://github.com/ChurchApps/.github/blob/main/CONTRIBUTING.md) smerujú požiadavky na funkcie B1 do ChurchAppsSupport a implementačné PR do repozitárov, ktoré ich spravujú. Použite jednu centrálnu požiadavku na funkciu a na ňu odkazujte zamerané implementačné PR:

1. **ChurchAppsSupport:** pred prezentovaním Twilio ako dostupnej funkcie pre používateľov preskúmajte tento návrh a jeho návrh pokynov na zavedenie.
2. **Packages:** pridajte adaptér Twilio, výslovnú zdieľanú konfiguráciu a rozhrania a vykresľovanie formulára súhlasu so SMS tam, kde ho zdieľajú B1Admin/B1App. Zahrňte changesets a publikujte cez existujúci pracovný postup vydania pred aktualizáciou spotrebiteľov.
3. **Api:** pridajte doplnkové migrácie pre metadáta integrácie, súhlas/potlačenie a stavy doručenia; implementujte overenie konfigurácie, spoločné brány odosielania, zachytávanie dôkazov z formulárov, spracovanie webhookov a perzistenciu odosielania.
4. **B1Admin:** pridajte používateľské rozhranie pre konfiguráciu a pripravenosť Twilio, správu programu a súhlasu, ukladanie odosielateľa podľa poskytovateľa a presné hlásenie doručenia. Neposkytujte prepísanie súhlasu so SMS cez bežné úpravy osoby.
5. **B1App:** overte skúsenosť s verejným formulárom/stránkou a odkazmi na zásady oproti spoločným ovládacím prvkom vrátane anonymných návštevníkov a návštevníkov na mobile. Samostatný webový klient Twilio nie je potrebný.
6. **ChurchAppsSupport:** po vydaní premeňte návrh pokynov na podporované stránky nastavení a pomoci, pridajte skutočné snímky obrazovky, odkážte na ne z nastavení Texting a zabezpečte preklady.

Najskôr nasadzujte schému a zdieľané balíky, až potom spotrebiteľov. Twilio nechajte za prepínačom funkcií pre malé pilotné nasadenie s dobrovoľným zapojením; existujúci poskytovatelia musia naďalej fungovať. Návrat k predchádzajúcemu stavu vypne odosielanie cez Twilio a zruší neodoslané úlohy, pričom zachová odhlásenia a dôkazy. Nesmie automaticky prepnúť príjemcov na iného poskytovateľa alebo odosielateľa.

## Odhad úsilia

Plánovací odhad pre prispievateľa oboznámeného s ekosystémom; v tomto posúdení sa nepoužili žiadne produkčné poverenia ani živé SMS:

| Práca | Vývojárske dni |
|---|---|
| Adaptér, rozšírenia konfigurácie a schémy, používateľské rozhranie nastavení | 2–3 |
| Súhlas s telefónom/programom, samostatné potlačenie, spoločné brány odosielania, integrácia verejného formulára | 3–5 |
| Podpísané spätné volania, perzistencia doručenia, obmedzené a trvalé odosielanie | 2–3 |
| Používateľské rozhranie pripravenosti, sprievodca pre cirkvi, integračné a regresné testovanie, opravy pilotu | 3–4 |
| **Odporúčaný rozsah spustenia** | **10–15 celkom** |

Základný proof of concept adaptéra a nastavení trvá zhruba 1–2 dni. Odhad len pre odosielateľa nezahŕňa prácu na súhlase a zavedení, ktorá je nevyhnutná pre toto odporúčanie. Čas externého preskúmania zo strany Twilio a operátorov je samostatný a premenlivý; projekt nesmie sľubovať dátum schválenia ani výsledok schválenia.

## Kritériá akceptácie

- [ ] Cirkev vlastní a platí účet, službu, registrovaného odosielateľa a kampaň; nie je potrebný účet Twilio spravovaný ChurchApps.
- [ ] Poverenia sú šifrované/maskované, viazané na nájomníka, rotovateľné a nie sú v logoch ani vo verejnom obsahu; overovanie je len na čítanie.
- [ ] Nezaškrtnutý voliteľný súhlas zobrazuje reálne odkazy na zásady a ukladá dôkazy o programe/telefóne/upozornení na serveri; odmietnutie stále umožňuje primárnu akciu formulára.
- [ ] Všetky manuálne, skupinové, polia zlúčenia, pracovné postupy a pripomienky cesty vynucujú rovnakú bránu oprávnenosti Twilio. Neznámi, nesúhlasiaci, príjemcovia so zmeneným telefónom alebo potlačení sú preskočení s užitočným dôvodom; vykresľovanie zachováva identitu cirkvi a pokyny STOP aj po rozbalení a spracovaní dĺžky.
- [ ] Starý súkromný režim adresára nezapisuje príjemcov; STOP/START nikdy nemení viditeľnosť v adresári ani nesúvisiace predvoľby. Prípady zdieľaného telefónu a medzi cirkvami sú otestované.
- [ ] Podpísané STOP/START/HELP, neplatné podpisy, nesprávne účty/služby, duplicitné udalosti, opätovne prehrané odoslania formulárov a sfalšované mapovania súhlasu sú pokryté.
- [ ] Veľkosť skupiny/časové limity, limity rýchlosti, čiastočné zlyhania, nejednoznačné výsledky, súbehy spätných volaní a doručovacie udalosti mimo poradia sú otestované bez duplicitných odoslaní.
- [ ] Schválenie kampane a dokončená registrácia čísla sú odlíšené od overenia poverení. Manuálne dôkazy sú jasne označené; zastarená alebo zrušená pripravenosť blokuje odosielanie.
- [ ] Pilotná cirkev skontroluje svoju stránku na prihlásenie, odmietnutú a prijatú cestu formulára, presné URL zásad a súhlasiaceho testovacieho príjemcu cez odoslanie, doručenie, potlačenie STOP a povolené opätovné prihlásenie.
- [ ] Existujúce nastavenia a správanie odosielania pre Clearstream, Text In Church a Nalo prejdú regresnými kontrolami; texty pomocníka odlišujú návrhy od vydaných funkcií.
