---
title: "Zapojenie cirkvi do Twilio (návrh)"
description: "Návrh nastavenia Twilio vo vlastníctve cirkvi v B1, verejné prihlasovanie, príklady kampaní a kontrolný zoznam na schválenie."
---

# Návrh zapojenia cirkvi do Twilio

:::caution Návrh navrhovanej integrácie
Ide o navrhovaný postup. B1 teraz obsahuje základnú voľbu **Twilio** v časti **Settings > Texting** (Account SID, Auth Token, From Number a webhook pre prichádzajúce STOP správy) -- pozri [Church Settings: Texting](../../b1-admin/settings/church-settings.md#texting). Ďalšie nastavenia B1, mapovanie súhlasov a overovacie kroky uvedené nižšie sú požiadavky na budúce vydanie, nie pokyny na vyhľadanie existujúcich nastavení. Rozsah a závislosti si prečítajte v [technickom návrhu](./twilio-byok-proposal.md). Zdroje Twilio boli overené 22. októbra 2026; pred odoslaním kampane overte aktuálne požiadavky.
:::

## Odporúčané usporiadanie

Vaša cirkev vlastní svoj platený účet Twilio, telefónne číslo, Messaging Service, fakturáciu a registráciu kampane. B1 by cez tieto prostriedky odosielal správy s prihlasovacími údajmi, ktoré sa zadajú súkromne v nastaveniach cirkvi. Uistite sa, že aspoň dvaja vhodní správcovia cirkvi majú prístup k účtu Twilio, zapnite zabezpečenie účtu a určte osobu zodpovednú za súhlasy, prichádzajúce odpovede a oznámenia o zamietnutí.

Prvé vydanie, ktoré sa tu navrhuje, pokrýva jedno americké lokálne číslo a jeden jasne opísaný program správ cirkvi. Príklady nižšie používajú fiktívny program **Grace Community Church** s názvom **Grace Church Updates** pre zmeny bohoslužieb, pripomienky udalostí a plánovanie dobrovoľníkov. Každý názov, doménu, frekvenciu, kontakt a účel nahraďte skutočnou praxou vašej cirkvi. Ide o príklady pravidiel Twilio špecifické pre cirkev, nie o vopred schválenú kampaň ani o záruku schválenia.

## 1. Pripravte verejné prihlasovanie do B1

Na webe cirkvi zverejnite stránku, napríklad `https://www.example.org/text-updates`, s vloženým verejným formulárom B1 alebo jasným odkazom na samostatný verejný formulár. Zverejnite tiež `https://www.example.org/privacy` a `https://www.example.org/sms-terms`. Tieto adresy sú zástupné; odošlite skutočné dostupné URL adresy.

Pre navrhovaný SMS formulár platí:

| Nastavenie | Odporúčaná konfigurácia |
|---|---|
| Prístup | Verejný/neobmedzený; aktívny počas kontroly a trvalého zapisovania; dostupný bez prihlásenia |
| Režim formulára | Spočiatku štandardný režim; konverzačný režim vyžaduje výslovnú podporu súhlasu popísanú v technickom návrhu |
| Mobil | Jasne označený s predvoľbou krajiny; povinný len pri výbere SMS prihlásenia, ak sa používa vo všeobecnom formulári spojenia/udalosti |
| Voľba SMS | Samostatné voliteľné políčko, predvolene nezaškrtnuté, prepojené s konkrétnym programom a poľom mobilného telefónu |
| Upozornenia | Viditeľné vedľa voľby SMS: cirkev/program, účel a frekvencia správ, možné poplatky, STOP, HELP, kontakt na podporu a skutočné klikateľné odkazy na zásady ochrany osobných údajov a podmienky SMS |
| Ďalšie akcie | Hostia môžu odoslať kartu spojenia, prihlásiť sa na udalosť alebo požiadať o informácie bez prihlásenia sa na SMS |
| Dôkazy | Uložte program, presné telefónne číslo, zvolený súhlas, zdrojové odoslanie, čas na serveri a verziu upozornení/zásad; bežná odpoveď vo formulári sama dnes nikoho neprihlasuje |
| Automatizácia ľudí/skupín | Pri úvodnom pilotnom prihlasovaní vypnite automatické vytváranie osôb a priraďovanie do skupín, pokiaľ sa neskontrolujú existujúce pravidlá párovania cirkvi. Priradenie do skupiny nikdy nie je autorizáciou SMS. |
| Existujúce automatizácie | Neprihlasujte každého odosielateľa formulára ani člena skupiny do pracovného postupu textových správ. Iba navrhované overené mapovanie súhlasu môže oprávniť tento program. |
| Správa po odoslaní | Potvrďte, že formulár bol prijatý, bez tvrdenia, že ste prihlásení na SMS, ak bolo políčko odmietnuté alebo čaká na potvrdenie či kontrolu. |

Existujúce zaškrtávacie pole môže ilustrovať formulár, no B1 stále potrebuje register súhlasov a brány odosielania. Aktuálny spoločný renderer zobrazuje popisy ako čistý text; napísanie Markdownu alebo URL do neho nestačí na to, aby boli odkazy na zásady klikateľné. Implementácia musí poskytnúť prístupný ovládací prvok súhlasu so skutočnými odkazmi. Pozri [vytváranie formulárov v B1](../../b1-admin/forms/creating-forms.md) a [technický návrh](./twilio-byok-proposal.md#consent-and-suppression-are-required-release-work).

Twilio vyžaduje dobrovoľný, overiteľný súhlas. SMS nekombinujte s povinnými členskými podmienkami, súhlasmi s e-mailom alebo telefónom, súhlasom s darom ani registráciou na udalosť. Mobilné číslo na karte návštevníka samo osebe nie je SMS súhlasom. Pozri [požiadavky Twilio na dobrovoľný súhlas](https://www.twilio.com/docs/api/errors/30923) a [odporúčania ku kampaniam](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Príklad textu prihlásenia

Použite iba po tom, ako cirkev zvolí skutočné účely, odosielateľa a frekvenciu. Políčko je voliteľné a na začiatku nezaškrtnuté; názvy zásad uvedené nižšie musia byť v zobrazenom formulári odkazmi.

> Áno, chcem, aby mi Grace Community Church posielala správy cez Grace Church Updates o zmenách bohoslužieb, cirkevných udalostiach a rozpisoch dobrovoľníkov z [registrované telefónne číslo cirkvi]. Očakávajte až 4 správy mesačne. Môžu byť účtované štandardné poplatky za správy a dáta. Odhlásiť sa môžete odpoveďou STOP, pomoc získate odpoveďou HELP. Prihlásenie na SMS je voliteľné a nie je potrebné na účasť, registráciu ani dar. Pozrite si naše Zásady ochrany osobných údajov a Podmienky SMS. Otázky: [e-mail alebo telefón podpory cirkvi].

„Až 4“ je príklad záväzku, nie limit predpísaný Twilio. Nahraďte ho frekvenciou, ktorú cirkev skutočne dodrží; ak sa frekvencia mení, uveďte to pravdivo a opíšte očakávaný rytmus. Propagačné výzvy alebo ďalšie duchovné programy nechajte mimo tohto políčka, pokiaľ sa ich účely a súhlas nezhodnotili osobitne.

Pri všeobecnom formulári pre návštevníkov alebo udalosti musí odoslanie s nezaškrtnutým políčkom stále prejsť. Samostatný formulár len pre SMS môže vysvetliť, že zaškrtnutie žiada o prihlásenie, no nikdy nesmie podmieniť nesúvisiace bohoslužby prihlásením. Skutočné správanie overte na telefóne aj na počítači.

### Obsah zásad, ktorý treba pripraviť

Stránka ochrany osobných údajov cirkvi má vysvetliť, aké údaje na účely správ zbiera, ako ich používa a chráni, a aké má pravidlá uchovávania a kontaktu. Jasne má uviesť, že mobilné čísla a súhlasy s posielaním správ sa nepredávajú ani nezdieľajú tretím stranám ani pridruženým subjektom na ich marketingové alebo propagačné účely. Nevyhnutné spracovanie poskytovateľmi služieb opíšte presne; netvrďte, že cirkev nikdy nepoužíva sprostredkovateľa, ak používa B1 a Twilio. Referenciou pre toto rozlíšenie sú [usmernenia Twilio k zásadám ochrany osobných údajov](https://www.twilio.com/docs/api/errors/30908) a [odporúčania ku kampaniam](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

Stránka podmienok SMS má uvádzať cirkev a program, účely, skutočnú frekvenciu, možné poplatky za správy, pokyny STOP/HELP, kontakt na podporu a odkaz na zásady ochrany osobných údajov; zahrňte aj ďalšie upozornenia, ktoré vyžaduje aktuálna kontrola Twilio. Odkazy na zásady vo formulári prihlásenia musia presne zodpovedať URL adresám odoslaným v kampani. Od 30. júna 2026 Twilio pri nových registráciách kampaní cez API vyžaduje verejné URL adresy zásad ochrany osobných údajov a podmienok; ich konzola ich tiež vyžaduje. [Požiadavka Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Ide o požiadavky na obsah, ktoré treba uplatniť na skutočné zásady cirkvi, nie o náhradu jej existujúcich postupov ochrany údajov ani o všeobecný text, ktorý sa vloží bez kontroly.

## 2. Zaregistrujte cirkev a jej program správ v Twilio

1. Vytvorte alebo použite **platený účet vo vlastníctve cirkvi** a americké lokálne číslo s podporou SMS. Používajte konzistentne zákonný názov cirkvi, IČO alebo údaje o registrácii, adresu, webovú stránku a oprávneného zástupcu. Neuvádzajte údaje spoločnosti ChurchApps ani inej cirkvi.
2. Postupujte podľa registrácie značky pre priameho zákazníka Twilio pre skutočný typ subjektu cirkvi. Pre oprávnenú neziskovú organizáciu použite [usmernenie k registrácii neziskových organizácií](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Prípady použitia pre charitatívne organizácie/501(c)(3) závisia od oprávnenosti; samotný názov cirkvi neznamená schválenie ani výnimku od Twilio.
3. Vytvorte vyhradený Messaging Service a odošlite príslušnú kampaň A2P 10DLC. Zvoľte prípad použitia, ktorý pravdivo zodpovedá skutočným správam a možnostiam schválenej značky; príklady tu neurčujú univerzálny kód prípadu použitia pre cirkvi.
4. Uveďte verejnú URL adresu prihlásenia, URL adresy zásad, úplný opis toku prihlásenia a správ a požadované vzorové správy. Zahrňte každú skutočnú metódu prihlásenia a vyhlásenia o vloženom odkaze alebo telefónnom čísle nastavte podľa skutočného obsahu. Nepridávajte prihlásenie kľúčovým slovom ani dvojité potvrdenie, pokiaľ tento tok neexistuje a nie je otestovaný.
5. Priraďte odosielacie číslo k službe a schválenej kampani. Pred odoslaním počkajte na overenie kampane **aj na dokončenú registráciu čísla**.

Tieto kroky vykonávajte v konzole Twilio danej cirkvi. Navrhovaná integrácia B1 registrácie za cirkvi neodosiela. [Rýchly sprievodca registráciou](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) a [zdroj kampane](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) Twilio vysvetľujú registračné polia a stavy. Čakajúce číslo môže blokovať odosielanie aj po schválení kampane. [Registrácia čísla](https://www.twilio.com/docs/api/errors/30035)

### Príklad popisu kampane

> Grace Community Church používa Grace Church Updates na odosielanie oznámení o zmenách rozpisu bohoslužieb, pripomienok cirkevných udalostí a oznámení o plánovaní dobrovoľníkov ľuďom, ktorí si tento program zvolia na našej verejnej webovej stránke cirkvi. V rámci tohto programu posielame najviac štyri správy mesačne. Príjemcovia môžu tieto správy kedykoľvek zastaviť. Tento program nezahŕňa zakúpené kontakty, propagácie tretích strán ani výzvy na zbieranie finančných prostriedkov.

Tento príklad sa hodí len cirkvi, ktorá tieto limity a výnimky skutočne dodržiava. Ak samotné pripomienky dobrovoľníkom presahujú sľúbenú frekvenciu, pred odoslaním zmeňte návrh programu a upozornenie.

### Príklad popisu toku prihlásenia

> Návštevníci otvoria [skutočná URL adresa prihlásenia cirkvi], zadajú svoje mobilné číslo a samostatne vyberú voliteľné políčko Grace Church Updates. Pri otvorení formulára je nezaškrtnuté. Upozornenie uvádza Grace Community Church, opisuje zmeny bohoslužieb, pripomienky udalostí a rozpisy dobrovoľníkov, uvádza mesačný limit a možné poplatky a vysvetľuje STOP a HELP. Zobrazené odkazy na zásady ochrany osobných údajov a podmienky SMS vedú na [skutočná URL adresa zásad ochrany osobných údajov] a [skutočná URL adresa podmienok SMS]. Odmietnutie SMS nebráni účasti, registrácii na udalosť, darovaniu ani použitiu všeobecného formulára spojenia. B1 zaznamenáva aktívny výber, telefónne číslo, čas odoslania a verziu upozornenia. Tento program posielame iba zdokumentovaným odberateľom a pred ďalším odoslaním potláčame odhlásenia.

Tento odsek prispôsobte implementovanému toku. Ak sa používa potvrdenie telefónom alebo kontrola zamestnancom, opíšte čakajúci stav a presný krok aktivácie. Ak sa používajú iné metódy, uveďte každú z nich a jej dôkazy. Ak sa prihlásenie nachádza za prihlásením alebo prebieha na papieri, Twilio žiada verejné, anonymizované dôkazy skutočného zážitku z prihlásenia; nikdy nezverejňujte vyplnené formuláre ani údaje členov. [Usmernenie k overiteľnému súhlasu](https://www.twilio.com/docs/api/errors/30923)

### Príklady odchádzajúcich správ

Ide o fiktívne vzory na úpravu; pred odoslaním použite skutočné URL adresy cirkvi a nahraďte hranaté zátvorky. Kampaňové API Twilio prijíma dve až päť vzoriek. Vzorky majú identifikovať cirkev, zodpovedať deklarovanému účelu a obsahovať pokyn na odhlásenie. [Polia vzoriek kampane](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Nedeľná bohoslužba sa kvôli [dôvod] začne o [čas]. Podrobnosti: [URL webovej stránky cirkvi]. Na ukončenie správ odpovedzte STOP.
```

```text
Grace Community Church: Pripomíname, že [cirkevná udalosť] sa koná [dátum] o [čas]. Informácie: [URL cirkevnej udalosti]. Na ukončenie správ odpovedzte STOP.
```

```text
Grace Community Church: Ste naplánovaní slúžiť v tíme [tím] [deň]. Prosím, pozrite si svoj plán: [URL cirkevného portálu v B1]. Na ukončenie správ odpovedzte STOP.
```

Zátvorkové URL adresy predstavujú vzorové premenné; odoslané príklady majú ukazovať skutočnú doménu cirkvi a skutočný štýl odkazov. Odkaz na plán môže vyžadovať prihlásenie, no stránka prihlásenia a zásady použité na preverenie musia byť verejne dostupné. Do vzoriek na schválenie nezahŕňajte súkromné poznámky, údaje o deťoch ani identifikovateľné údaje členov. Obsah vzoriek nech zodpovedá tomu, čo B1 skutočne posiela v šablónach; nesľubujte doručenú schránku odpovedí ani konkrétne správanie pripomienok, ktoré nie je k dispozícii.

### Odpovede STOP, START a HELP

Na tieto potvrdenia použite Twilio Messaging Service Advanced Opt-Out a upravte identitu cirkvi/programu a údaje o podpore. Príklady zamerania odpovedí:

- **STOP:** Potvrďte, že Grace Church Updates bol zastavený, a vysvetlite podporovaný spôsob obnovenia odberu.
- **START:** Potvrďte obnovenie toho istého programu vrátane jeho identity, frekvencie/poplatkov a pokynov na pomoc a zastavenie, ako to vyžaduje nakonfigurovaný tok.
- **HELP:** Uveďte Grace Community Church a skutočný kontakt na podporu a pokyny na odhlásenie.

Ak Twilio už odpovedalo, neposielajte druhé potvrdenie z B1. Odpoveď HELP nie je prihlásenie. START nesmie nikoho prihlásiť do ďalších programov cirkvi ani ho odhaliť v adresári členov. [Twilio Advanced Opt-Out](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Skontrolujte balík na schválenie pred odoslaním

- [ ] Skutočné zákonné údaje cirkvi, identita na webe a účel kampane sa zhodujú.
- [ ] Stránka prihlásenia a aktívny formulár sa otvoria bez prihlásenia v súkromnom prehliadači, aj na mobilnom zariadení.
- [ ] Políčko SMS je na začiatku nezaškrtnuté a dá sa odmietnuť pri dokončovaní hlavnej akcie návštevníka alebo udalosti.
- [ ] Vedľa voľby SMS sa zobrazujú účel programu, odosielateľ, skutočná frekvencia, možné poplatky, STOP, HELP, kontakt na podporu a klikateľné odkazy na zásady.
- [ ] Presné URL adresy zásad ochrany osobných údajov a podmienok odoslané Twilio sú verejné, fungujú bez prihlasovacích údajov a identifikujú tú istú cirkev a program. Obsah zásad sa zhoduje so skutočným spracovaním.
- [ ] Každá vzorková správa zodpovedá programu, skutočnej identite odosielateľa a očakávanému správaniu odkazov alebo telefónnych čísel. Kampaň opisuje každú skutočnú metódu prihlásenia.
- [ ] Anonymizované snímky obrazovky ukazujú prázdny formulár, políčko/upozornenia a odkazy na zásady tak, ako ich uvidia recenzenti. Dôkazy neobsahujú záznamy členov ani kľúče.
- [ ] Cirkev má prevádzkový spôsob, ako uchovávať dôkazy o súhlase a rešpektovať odhlásenia ešte pred odoslaním, vrátane žiadostí prijatých telefonicky alebo e-mailom.

Tieto kontroly znižujú zbytočné nesúlady; o schválení rozhodujú Twilio a jeho kontrolní partneri. Skutočné URL adresy prihlásenia a zásad sprístupnite aj po schválení, nielen počas kontroly.

## 4. Pripojte a overte budúcu integráciu B1

Po vydaní integrácie by navrhované nastavenie Texting v B1 malo zbierať Account SID cirkvi, vyhradený API Key SID a tajný kľúč, samostatný Auth Token pre webhook, Messaging Service SID a zvoleného odosielateľa. Kľúče vytvárajte iba v konzole cirkvi a tajné údaje zadávajte iba do súkromných nastavení B1. [Usmernenie k API kľúčom Twilio](https://www.twilio.com/docs/iam/api-keys)

Skopírujte do zodpovedajúcej konfigurácie služby Twilio URL adresy webhookov pre prichádzajúce správy a stavy doručenia, ktoré poskytne B1 pre danú cirkev. Zapnite Advanced Opt-Out a overte, že prichádzajúce správy dorazia na nakonfigurovaný webhook. B1 by mal zobrazovať samostatné kontroly pre prihlasovacie údaje, vlastníctvo služby a odosielateľa, overenú kampaň, dokončenú registráciu čísla, overenie prichádzajúcich správ a doručenú testovaciu správu. Uložené prihlasovacie údaje ani prijatá požiadavka API nie sú konečným doručením.

Ak B1 nemôže programovo overiť signál registrácie, potvrďte ho priamo v konzole; rozhranie musí označiť dátovaný výsledok ako potvrdený správcom. Pred zapnutím produkčných správ vyriešte čakajúci alebo neúspešný stav. Použite samostatný, výslovne vyžiadaný test na skutočný súhlasiaci dospelý testovací príjemca, potom:

1. Overte, že zodpovedajúce zdokumentované prihlásenie vytvorí správny záznam súhlasu s telefónom a programom. Odmietnutie alebo zmena telefónu nesmie nikoho potichu prihlásiť.
2. Odošlite jednu testovaciu správu, potvrďte jej prijatie a porovnajte stav v B1 s Twilio Message SID a výsledkom doručenia.
3. Odpovedzte STOP a skontrolujte, že manuálne správy, skupinové správy, pracovné postupy a pripomienky tento telefón preskočia. Viditeľnosť v adresári sa nemá zmeniť.
4. Otestujte zdokumentovaný tok opätovného prihlásenia do toho istého programu a odpoveď HELP; overte, že neexistujú duplicitné potvrdenia ani nesúvisiace zmeny preferencií.

## 5. Spravujte program

Určte vlastníka v cirkvi, ktorý bude sledovať stav kampane a účtu, upozornenia o zostatku a fakturácii, zlyhania správ a prichádzajúce odpovede v Twilio. Navrhované prvé vydanie B1 nemá konverzačnú schránku SMS, preto zverejnite a sledujte skutočný kontakt na pomoc a kontrolujte odpovede, namiesto predpokladu, že ich zamestnanci vidia v B1.

Históriu súhlasov a odhlásení, aktuálne verzie upozornení a zásad, identifikátory kampaní a anonymizované dôkazy o schválení uchovávajte v záznamoch pod kontrolou cirkvi. Kľúče ani zoznamy príjemcov nikdy nevkladajte do verejných podporných lístkov. Keď sa zmení číslo, služba, prihlasovacie údaje, tok prihlásenia, frekvencia alebo účel, pred obnovením odosielania znovu skontrolujte integráciu a tam, kde je to potrebné, aktualizujte registráciu a súhlas. Zdieľané čísla domácnosti a zmenené čísla posudzujte starostlivo; oprávnenosť patrí súhlasiacemu telefónu a programu, nie každému záznamu člena rodiny.

Pri zamietnutí si prečítajte skutočnú chybu Twilio, opravte konkrétnu nezrovnalosť na webe aj v odoslaní a znovu odošlite cez konzolu cirkvi. Pri neregistrovaných alebo čakajúcich odosielateľoch počkajte na dokončenie registrácie a nemeňte čísla, aby ste to obišli. Použite [riešenie problémov s registráciou Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) a poskytnutý prehľad chybových kódov. Nesľubujte pevnú dobu spracovania.
