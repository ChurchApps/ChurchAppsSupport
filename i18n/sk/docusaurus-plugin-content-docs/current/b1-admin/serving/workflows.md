---
title: "Pracovné postupy"
description: "Vytvárajte Kanban nástenky v B1 Admin pre nadväzujúcu starostlivosť s automatickými e-mailmi, SMS a spúšťačmi, ktoré pridávajú ľudí automaticky."
---

# Pracovné postupy

<div class="article-intro">

Pracovné postupy presúvajú ľudí cez sériu krokov na vizuálnej tabuli. Každá osoba sa stáva kartou, ktorá putuje z jedného kroku do ďalšieho -- od následnej starostlivosti o návštevníka, ktorý je tu prvýkrát, cez proces členstva až po poďakovanie darcovi, ktorý dáva prvýkrát, a po čokoľvek iné, kde potrebujete sledovať mnoho ľudí cez rovnaké fázy. Krok môže požiadať dobrovoľníka, aby niečo urobil (zavolal, porozprával sa), **a zároveň** môže sám spúšťať automatizované akcie -- poslať e-mail alebo textovú správu, počkať niekoľko dní, pridať osobu do skupiny -- takže pracovné postupy zvládnu ľudskú následnú starostlivosť aj rutinu okolo nej. Pracovné postupy rozširujú [Úlohy](./tasks.md) o tabuľu typu Kanban s presúvaním myšou, aby nikto a nič nezapadlo.

</div>

<div class="prereqs">
<h4>Skôr než začnete</h4>

- Uistite sa, že ľudia, ktorých chcete sledovať, existujú v B1 Admin
- Oboznámte sa s tým, ako fungujú [Úlohy](./tasks.md), pretože každá karta na tabuli je úloha
- Ak chcete použiť akciu **Odoslať e-mail**, najskôr vytvorte e-mailové šablóny, ktoré chcete odosielať (spravujú sa v časti **Nastavenia → E-mailové šablóny**)
- Ak chcete použiť akciu **Odoslať textovú správu**, najskôr pripojte [poskytovateľa textových správ](../settings/church-settings.md#texting)
- Potrebujete príslušné oprávnenie pre Úlohy. Zobrazovanie, úprava kariet a správa pracovných postupov sú oddelené úrovne oprávnení (pozrite [Roly a oprávnenia](../settings/roles-permissions.md))

</div>

## Zobrazenie pracovných postupov

Otvorte [ponuku Skok](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu B1 Admin), rozbaľte **Služby** a kliknite na **Pracovné postupy**. Vaše pracovné postupy sú uvedené v tabuľke, ktorá zobrazuje ich **Kategóriu** a **Stav** (**Aktívny** alebo **Neaktívny**). Ak používate kategórie, karty nad zoznamom vám umožnia filtrovať ho podľa kategórie. Kliknutím na ľubovoľný pracovný postup otvoríte jeho tabuľu.

## Vytvorenie pracovného postupu

1. Na stránke Pracovné postupy kliknite na **Pridať pracovný postup**.
2. Vyberte, ako začať:
   - **Prázdny pracovný postup** -- začnite od nuly a vytvorte vlastné kroky.
   - **Zo šablóny** -- začnite s hotovou sadou krokov, ktoré môžete upraviť. Vstavané šablóny zahŕňajú:
     - **Následná starostlivosť o novú návštevu** -- Odoslať uvítací e-mail → Osobný telefonát → Pozvanie na ďalší krok → Pripojený
     - **Kurz členstva** -- Vyjadrenie záujmu → Registrácia na kurz → Účasť na kurze → Dokončenie členstva
     - **Poďakovanie prvému darcovi** -- Odoslať poďakovaný list → Zdieľanie vplyvu darov → Spravovaný
     - **Potvrdenie služobnej úlohy** -- Požiadať a čakať na odpoveď → Zavolať dobrovoľníkovi ohľadom nezodpovedanej žiadosti (pozrite [Potvrdenia služobných úloh](#serving-assignment-confirmations))

   Vytváranie krokov šablóny môže chvíľu trvať. Kým to prebieha, tlačidlo **Pridať pracovný postup** zobrazuje **Vytváranie...** a nedá sa znova kliknúť, takže nevznikne duplikát. Ak sa niečo pokazí, stránka zobrazí hlásenie *„Pracovný postup sa nepodarilo vytvoriť. Skúste to prosím znova.“*
3. Zadajte **Názov** pracovného postupu.
4. Voliteľne priraďte **Kategóriu**, aby ste súvisiace pracovné postupy zoskupili. Novú kategóriu môžete vytvoriť priamo z rozbaľovacieho zoznamu.
   Pri prázdnom pracovnom postupe tiež vyberiete jeho **Účel pracovného postupu**: **Následná starostlivosť o ľudí** (bežný typ) alebo **Potvrdenie služobnej úlohy**. Účel sa po vytvorení pracovného postupu nedá zmeniť.
5. Ponechajte pracovný postup **Aktívny**, aby doň bolo možné pridávať ľudí, alebo ho nastavte na **Neaktívny**, aby sa skryl zo zoznamov na pridávanie do pracovného postupu.
6. Kliknite na **Uložiť**.

:::tip
Tlačidlom **Duplikovať** v zozname pracovných postupov skopírujte existujúci pracovný postup -- vrátane jeho krokov, automatizovaných akcií a smerovania -- ako východiskový bod pre nový.
:::

## Budovanie tabule pomocou krokov

Každá tabuľa pracovného postupu sa skladá z **krokov**, zobrazených ako stĺpce zľava doprava. Otvorte pracovný postup a pomocou **Pridať krok** vytvorte každú fázu vášho procesu.

Pri pridávaní alebo úprave kroku môžete nastaviť:

- **Názov kroku** -- nadpis stĺpca (napríklad „Uvítací telefonát“ alebo „Čaká sa na registráciu“).
- **Termín (dni)** -- automaticky nastaví termín, keď karta vstúpi do tohto kroku. Karty po termíne sú označené ako **Po termíne**.
- **Predvolený zodpovedný** -- osoba alebo skupina, ktorej sa nové karty v tomto kroku automaticky priradia. Ak je predvoleným zodpovedným osoba, dostane upozornenie, že jej bola priradená karta.
- **Automatizované akcie** -- veci, ktoré systém vykonáva sám, keď karta dorazí (pozrite nižšie).
- **Smerovanie** -- kam karta putuje, keď krok opustí (pozrite [Smerovanie](#routing-cards-with-outcomes-and-conditions)).

Stĺpce krokov presuňte do poradia, ktoré zodpovedá vášmu procesu. Poradie zároveň určuje predvolenú cestu, ktorou karta prechádza, keď sa neuplatňuje žiadne iné smerovanie.

:::info
Najskôr uložte nový krok. Automatizované akcie a smerovanie sa viažu ku kroku, takže editor tieto časti sprístupní, až keď krok existuje.
:::

## Automatizované akcie

Každý krok môže obsahovať zoznam **automatizovaných akcií**, ktoré sa spustia samy v momente, keď karta **vstúpi** do kroku -- skôr než sa jej ktokoľvek dotkne. Vďaka tomu krok zároveň vyzýva dobrovoľníka *a* zabezpečuje rutinnú prácu okolo následnej starostlivosti.

V editore kroku otvorte **Automatizované akcie**, kliknite na **Pridať akciu**, vyberte typ a vyplňte jeho nastavenia. Pridajte toľko akcií, koľko potrebujete; spúšťajú sa **zhora nadol v poradí**. Kliknutím na **Uložiť** pri kroku uložíte krok aj všetky jeho akcie spoločne. Odstránenie akcie cez ikonu koša sa prejaví okamžite.

| Akcia | Čo robí |
|---|---|
| **Odoslať e-mail** | Pošle osobe e-mailovú šablónu, ktorú vyberiete. Predmet správy môžete prepísať. |
| **Odoslať textovú správu** | Pošle osobe správu, ktorú napíšete, cez [poskytovateľa textových správ](../settings/church-settings.md#texting) vašej cirkvi. |
| **Čakať** | Pozastaví kartu na počet dní pred pokračovaním (pozrite nižšie). |
| **Pridať do skupiny** | Pridá osobu do [skupiny](../groups/index.md), ktorú vyberiete. |
| **Odstrániť zo skupiny** | Odstráni osobu zo skupiny, ktorú vyberiete. |
| **Zaznamenať účasť** | Označí osobu ako prítomnú na prebiehajúcej službe skupiny (pozrite nižšie). |
| **Pridať do pracovného postupu** | Spustí pre osobu iný pracovný postup -- užitočné na odovzdávanie medzi procesmi. |
| **Pridať poznámku** | Zaznamená poznámku do histórie karty. |
| **Nastaviť pole** | Aktualizuje pole v osobnom zázname: Stav členstva, Rodinný stav, Pohlavie, Mesto, Štát alebo PSČ. |
| **Webhook** | Odošle podrobnosti karty na externú webovú adresu (URL), ktorú zadáte, na prepojenie s inými systémami. |
| **Vytvoriť úlohu** | Vytvorí [úlohu](./tasks.md) so zadaným názvom a popisom, priradenú komukoľvek, koho vyberiete. |
| **Upozorniť osobu** | Pošle členovi personálu alebo dobrovoľníkovi, ktorého vyberiete, e-mail a upozornenie B1 o karte (pozrite nižšie). |

Po dokončení všetkých akcií kroku karta **zostane v tomto kroku**, aby sa jej mohla osoba venovať -- pokiaľ krok nemá automatické smerovanie, ktoré ju posunie ďalej (pozrite [Plne automatizované kroky](#fully-automated-steps)).

:::info
Automatizované akcie sa spúšťajú len vtedy, keď karta prichádza bežným tokom -- keď je prvýkrát pridaná, keď ju privedie výsledok alebo automatické smerovanie, alebo po dokončení čakania. Tieto akcie sa **nespúšťajú znova**, keď člen personálu karту ručne presunie do kroku alebo ju vráti späť, takže osoba nedostane ten istý e-mail dvakrát.
:::

### Odosielanie e-mailov

Vyberte **Odoslať e-mail**, zvoľte jednu z vašich e-mailových šablón a voliteľne napíšte vlastný predmet. Keď karta vstúpi do kroku, osoba dostane tento e-mail automaticky. (Ak osoba nemá uloženú e-mailovú adresu, krok túto akciu jednoducho preskočí.) [Zlučovacie polia](../settings/email-templates.md#merge-fields) v šablóne, napríklad `{{firstName}}`, sa vyplnia osobnými údajmi danej osoby.

Keď sa e-mail odošle, história karty zaznamená **E-mail odoslaný**. Ak sa nedá odoslať -- napríklad preto, že e-mail vašej cirkvi ešte nebol schválený alebo bol dosiahnutý denný limit -- žiadny záznam „E-mail odoslaný“ sa nepridá.

:::info
E-maily pracovného postupu sa odosielajú až potom, ako vaša cirkev získa schválenie na odosielanie skupinových e-mailov, a započítavajú sa do denného limitu e-mailov vašej cirkvi. Pozrite [Zapnutie skupinových e-mailov pre vašu cirkev](../groups/group-members.md#turning-on-group-email-for-your-church). Akcia **Odoslať e-mail** vás v editore kroku upozorní, keď sa tieto e-maily nebudú odosielať: *„E-mail vašej cirkvi ešte nebol schválený...“*, ak schválenie čaká, alebo *„E-mail vašej cirkvi je pozastavený...“*, ak sa nedávne správy vrátili alebo boli nahlásené ako spam.
:::

### Zaznamenávanie účasti

Vyberte **Zaznamenať účasť** a kliknite na **Vybrať skupinu**, aby ste zvolili skupinu, ktorej účasť sa má zaznamenať. Keď sa akcia spustí, osoba sa označí ako prítomná na prebiehajúcej službe danej skupiny -- rovnako, ako keby sa prihlásila na check-in. Je to užitočné v spojení s spúšťačom, ktorý pridáva ľudí do pracovného postupu, keď prichádzajú, takže sa započítajú bez samostatného check-inu.

- Účasť sa meria v momente, keď bola karta **vytvorená**, takže **Čakať** skôr v pracovnom postupe ju neposunie za službu.
- Počítajú sa len časy služieb, ktoré majú deň a začiatok. Ak v danom momente nebeží žiadna služba skupiny, nič sa nezaznamená a história karty uvedie **Žiadna naplánovaná služba neprebieha -- účasť nebola zaznamenaná**.
- Keď sa účasť zaznamená, história karty zobrazí **Účasť zaznamenaná** a za ňou názov skupiny. Opätovné spustenie akcie pre tú istú službu osobu nepočíta dvakrát.

### Upozorňovanie osoby

Vyberte **Upozorniť osobu**, kliknite na **Vybrať osobu** a voliteľne napíšte **Správu**. Keď karta vstúpi do kroku, daná osoba dostane e-mail a upozornenie B1 s menom osoby na karte, názvami pracovného postupu a kroku, vašou správou a odkazom na otvorenie karty. Použite to na to, aby ste člena personálu alebo vedúceho služby upozornili vopred -- napríklad *„Upozorni pastora, keď sa niekto dostane do kroku Pohovor o členstve.“* História karty zaznamená **Upozornený** a za ním meno danej osoby.

### Odosielanie textovej správy

Vyberte **Odoslať textovú správu** a napíšte **Textovú správu** (až 1 600 znakov). Keď karta vstúpi do kroku, osoba dostane túto správu na svoj mobilný telefón. Ak chcete správu personalizovať, kliknite na štítok pod poľom správy -- **Meno**, **Priezvisko**, **Zobrazované meno** alebo **Názov cirkvi** -- a vložte `{{firstName}}`, `{{lastName}}`, `{{displayName}}` alebo `{{churchName}}` na miesto kurzora. Každé z nich sa pri odoslaní správy vyplní údajmi danej osoby.

- Ak osoba nemá uložené mobilné číslo, správa sa neodošle a história karty zaznamená **Textová správa preskočená: chýba mobilné číslo**.
- Ak sa osoba odhlásila, správa sa neodošle a história karty zaznamená **Textová správa preskočená: odhlásený**.
- Keď sa textová správa odošle, história karty zaznamená **Textová správa odoslaná**. Ak odoslanie zlyhá -- napríklad preto, že nie je pripojený žiadny poskytovateľ textových správ alebo vašej cirkvi došli kredity na textové správy -- zlyhanie sa zaznamená v histórii karty a zvyšné akcie kroku sa aj tak vykonajú.

:::warning
Textové správy sa odosielajú cez vlastného [poskytovateľa textových správ](../settings/church-settings.md#texting) vašej cirkvi. Ak nie je pripojený žiadny poskytovateľ, editor akcií upozorní *„Nie je nastavený žiadny poskytovateľ textových správ“* a správy sa neodošlú.
:::

### Čakanie niekoľko dní (postupnosti kvapkania)

Akcia **Čakať** podrží kartu na počet dní, ktorý nastavíte. Počas čakania je karta zobrazená ako **Odložená**. B1 kontroluje skončené čakania každých 30 minút, takže karta pokračuje približne do pol hodiny po skončení čakania. Keď čakanie skončí:

1. Spustia sa všetky **zostávajúce akcie v tom istom kroku** -- takže môžete vytvoriť kvapkaciu postupnosť ako **Odoslať e-mail → Čakať 3 dni → Odoslať e-mail s pripomienkou**.
2. Potom, ak má krok automatické smerovanie, karta sa posunie ďalej; inak zostane v kroku, aby si ju osoba mohla prevziať.

:::tip
**Čakať** hneď na začiatku kroku je jednoduchý spôsob, ako kartu „podržať“, kým sa dostane k dobrovoľníkovi -- napríklad *Čakať 7 dní, potom sa ozve tréner*.
:::

## Pridávanie ľudí ako kariet

Ľudí na tabuľu môžete pridať viacerými spôsobmi:

- **Z tabule** -- Kliknite na **Pridať kartu** na konci stĺpca kroku a vyberte osobu. Môžete tiež vybrať skupinu a každý jej člen sa pridá ako karta.
- **Z osobného záznamu** -- Na stránke osoby použite **Pridať do pracovného postupu** a umiestnite ju do pracovného postupu.
- **Z vyhľadávania ľudí** -- Vyberte viacero osôb a hromadnou akciou **Pridať do pracovného postupu** ich pridajte naraz.
- **Automaticky pomocou spúšťača** -- Pridávajte ľudí, keď sa niečo stane, napríklad po odoslaní formulára alebo prvom dare (pozrite [Spúšťače](#triggers) nižšie).

Ak niekoho pridáte ručne alebo akciou kroku **Pridať do pracovného postupu**, nikdy mu nevznikne druhá otvorená karta v tom istom pracovnom postupe. Ak už otvorenú kartu má, preskočí sa (pri hromadnom pridávaní dostanú nové karty len ľudia, ktorí ju nemajú). Keď sa jeho karta uzavrie, môžete ho pridať znova. Spúšťače sa riadia vlastným nastavením **Len raz pre každú osobu**.

## Práca s tabuľou

Otvorte pracovný postup a uvidíte jeho tabuľu. Každá karta zobrazuje meno osoby, komu je priradená, a štítok termínu alebo stavu (**Po termíne** alebo **Odložená**). Stĺpec kroku zobrazuje aj malé odznaky pre automatizované akcie, ktoré spúšťa, a poznámky k jeho smerovaniu, čo vám dáva prehľad o tom, ako karty prechádzajú.

- **Presunúť kartu** -- Presuňte kartu z jedného stĺpca do ďalšieho, keď osoba postupuje.
- **Otvoriť kartu** -- Dvakrát kliknite na kartu (alebo na ňu kliknite) a otvorí sa jej panel podrobností, kde môžete zmeniť krok, priradiť ju inak, pridať poznámky a prezrieť si, čo sa už udialo.

Z panela karty môžete:

- **Priradiť** kartu inej osobe alebo skupine.
- **Odložiť** kartu na 1 deň, 3 dni alebo 1 týždeň, aby sa dočasne skryl jej termín.
- **Vrátiť** ju do predchádzajúceho kroku alebo **Preskočiť** do ďalšieho kroku.
- **Pripnúť priradenie** -- zachovať tú istú zodpovednú osobu na karte aj pri presúvaní medzi krokmi. Predvolene sa pri presune karty do nového kroku priradí predvolenému zodpovednému tohto kroku; pripnutie zachová aktuálnu zodpovednú osobu počas celého procesu.
- **Dokončiť** kartu, alebo kliknúť na tlačidlo **Výsledok**, ak má krok nastavené výsledky (pozrite [Smerovanie](#routing-cards-with-outcomes-and-conditions)).
- **Odstrániť kartu** -- Odstráňte kartu z tabule bez jej dokončenia, napríklad keď bol niekto pridaný omylom. Po potvrdení sa karta uzavrie a zmizne zo zoznamu všetkých. Nespúšťajú sa žiadne výsledky, trasy ani akcie kroku a jej história sa zachová so záznamom **Odstránené**. Pri karte [potvrdenia služobnej úlohy](#serving-assignment-confirmations) sa jej odstránením žiadosť uzavrie rovnakým spôsobom.
- **Pridať poznámky** a prezerať **Aktivitu** karty -- záznam automatizovaných akcií, ktoré sa spustili (odoslané e-maily, čakania a pod.), každá s dátumom a časom, kedy sa udiala.

Pri karte týkajúcej sa osoby panel tiež zobrazuje mobilné telefónne číslo a e-mail danej osoby ako odkazy, na ktoré môžete klepnúť a zavolať im alebo napísať e-mail, a odkaz **Zobraziť profil**, ak máte oprávnenie zobraziť ľudí. Osoba, ktorej je karta priradená, vidí telefónne číslo a e-mail aj bez prístupu k časti Ľudia.

Poznámky sa ukladajú spolu s kartou. Každý, kto môže kartu otvoriť -- vrátane osoby alebo skupiny, ktorej je priradená --, môže poznámky čítať a pridávať vlastné. Ľudia, ktorí kartu otvoriť nemôžu, jej poznámky nevidia.

### Hromadné akcie

Označte začiarkavacie políčka na viacerých kartách, aby ste s nimi mohli pracovať spoločne. Ak chcete naraz vybrať všetky karty v kroku, zaškrtnite políčko **Vybrať všetko** v hlavičke stĺpca daného kroku; zaškrtnutím znova výber zrušíte. Objaví sa panel nástrojov, v ktorom môžete pre všetky vybrané karty naraz **Dokončiť**, **Odložiť**, **Priradiť** (preradiť) alebo **Presunúť do…** iného kroku.

## Smerovanie kariet pomocou výsledkov a podmienok

Smerovanie určuje, kam karta putuje, keď krok opustí. Otvorte editor kroku, ak chcete nastaviť dva druhy smerovania.

### Tlačidlá výsledkov

Výsledky sú tlačidlá zobrazené na paneli karty, keď kartu dokončujete v danom kroku. Namiesto jediného tlačidla **Dokončiť** môžete ponúknuť voľby ako „Pripojil sa ku skupine“ alebo „Nemá záujem“. Každý výsledok môže:

- Poslať kartu do **iného kroku** v tomto pracovnom postupe,
- **Odovzdať kartu** úplne inému pracovnému postupu, alebo
- **Uzavrieť** kartu.

Vďaka tomu jedno rozhodnutie môže osobu nasmerovať rôznymi cestami.

### Automatické smerovanie (podmienené)

Automatické trasy posunú kartu ďalej **v momente, keď vstúpi do kroku** (a po dokončení jeho automatizovaných akcií), bez kliknutia ktoréhokoľvek člena tímu, ak osoba spĺňa sadu podmienok. Pridajte trasu, vyberte cieľový krok a určte jednu alebo viac **podmienok** (napríklad kampus osoby, vek alebo stav členstva). Textové polia možno porovnávať presne alebo pomocou **obsahuje**, **začína na** alebo **končí na**. Trasa bez podmienok zodpovedá každému.

Podmienky s dátumom (Dnešný dátum, Dátum narodenia alebo Výročie) môžu porovnávať celý dátum alebo len jeho časť -- deň v týždni, **Deň v mesiaci**, **Mesiac** alebo uplynuté roky. Pri dátume narodenia alebo výročí osoby ponúka **Deň v mesiaci** relatívnu možnosť **Dnes**, takže podmienka *Dátum narodenia · Deň v mesiaci = Dnes* zodpovedá ľuďom, ktorých narodeniny pripadajú na dnešný deň v mesiaci. **Mesiac** ponúka **Predchádzajúci mesiac**, **Aktuálny mesiac** a **Nasledujúci mesiac**. Takéto relatívne hodnoty sa počítajú podľa časového pásma vašej cirkvi, takže zodpovedajú kalendárnemu dňu vašej cirkvi, a nie dňu na serveri.

Skupina podmienok **Dary** obsahuje možnosť **Pravidelný darca, ktorý prestal**, ktorá nájde ľudí, ktorí kedysi darovali pravidelne a potom prestali. Nastavte tri čísla: *Daroval aspoň v* **3** *z posledných* **12** *týždňov, potom nič v posledných* **3** *týždňoch* (to sú predvolené hodnoty). Týždne sa počítajú spätne od dnešného dňa v časovom pásme vašej cirkvi a vrátený dar sa nepočíta. Je najužitočnejšia pri [plánovanom spúšťači](#schedule-triggers) -- napríklad týždenné pravidlo, ktoré pridá pravidelných darcov, ktorí prestali, na tabuľu pastoračnej starostlivosti. Podmienka sleduje len dátumy darov, nikdy sumy, a karty ani upozornenia sumy nikdy nezobrazujú. Keďže odhaľuje, kto prestal darovať, túto možnosť vidia a môžu ju pridať, zmeniť alebo odstrániť len ľudia, ktorí môžu zobrazovať dary.

Ak sa podmienky trasy z nejakého dôvodu nedajú overiť, táto trasa sa považuje za nezodpovedajúcu. Karta zostane v kroku (alebo sa riadi inou trasou, ktorá zodpovedá), namiesto toho, aby uviazla.

:::info
Na tabuli každý stĺpec kroku zobrazuje malé poznámky popisujúce jeho smerovanie -- napríklad štítok výsledku alebo „ak zodpovedá“ a za ním šípku k cieľovému kroku či pracovnému postupu.
:::

## Plne automatizované kroky

Krok môžete nastaviť tak, aby bežal úplne samostatne, bez toho, aby ho niekto spracúval. Dajte kroku jeho **automatizované akcie** a pridajte **automatickú trasu** (bez podmienok) smerujúcu na ďalší krok. Keď karta vstúpi, akcie sa spustia a trasa ju hneď posunie ďalej -- karta prejde priamo cez krok.

:::tip
Skombinujte to s **Čakať**: *Odoslať uvítací e-mail → Čakať 3 dni → automaticky posunúť do kroku „Osobný telefonát“.* E-mail a načasovanie sa zvládnu za vás a dobrovoľník uvidí kartu až vtedy, keď je čas na osobný kontakt.
:::

## Spúšťače

Spúšťače automaticky pridávajú ľudí do pracovného postupu, keď sa niečo stane, takže karty nikdy nemusíte pridávať ručne. Na tabuli pracovného postupu kliknite na záložku **Spúšťače** a potom na **Pridať spúšťač**. Existujú dva druhy:

### Udalostné spúšťače

Spustia sa hneď, ako sa záznam v B1 zmení. Vyberte udalosť a potom môžete voliteľne pridať **podmienky**, aby sa pridali len zodpovedajúci ľudia:

- **Osoba · Vytvorená / Aktualizovaná** -- napríklad pridať každého, koho stav sa zmení na *Návštevník* alebo *Hosť* (stav, ktorý dostávajú ľudia, čo sa sami zaregistrujú).
- **Dar · Vytvorený** -- napríklad pridať prvý alebo vysoký dar do pracovného postupu s poďakovaním (filtrujte podľa sumy, fondu alebo spôsobu platby).
- **Skupina · Člen sa pripojil** / **Skupina · Vytvorená**.
- **Formulár · Odoslaný** -- pridať každého, kto odošle vybraný formulár (výborné pre kartu „Som tu nový“ alebo „Spojte sa“).

### Plánované spúšťače

Spúšťajú sa pravidelne -- denne, týždenne, mesačne alebo ročne -- podľa sady podmienok. Používajte ich na oslovenie viazané na čas, napríklad *všetkých, ktorí majú dnes narodeniny* (Dátum narodenia · Deň v mesiaci = **Dnes**, s mesiacom zhodným s **Aktuálnym mesiacom**) alebo *mesačné* stretnutie. Aj bez **Len raz pre každú osobu** plánovaný spúšťač nepridá tú istú osobu znova v rámci jedného opakovacieho obdobia (dňa, týždňa, mesiaca alebo roka, podľa toho, ako často beží).

Pri ľubovoľnom spúšťači môžete tiež nastaviť:

- **Počiatočný krok**, na ktorý nová karta pristane (predvolene prvý krok).
- **Len raz pre každú osobu** -- aby spúšťač tú istú osobu do pracovného postupu nepridal dvakrát. Keď je to zapnuté, každý, kto už má v tomto pracovnom postupe kartu, sa preskočí.
  - **Pridať znova po uzavretí karty** -- zobrazí sa, keď je zapnuté **Len raz pre každú osobu**. Zaškrtnutím umožníte spúšťaču pridať osobu znova, keď jej predchádzajúca karta v tomto pracovnom postupe bude uzavretá. Osoba stále nikdy nemá v pracovnom postupe dve otvorené karty naraz. Použite to pri veciach, ktoré sa môžu stať viackrát, napríklad pri vracajúcom sa hosťovi alebo ročnom procese.
- **Aktívny** -- zapnutie alebo vypnutie spúšťača bez jeho odstránenia.

:::tip
Spojte spúšťač **Formulár · Odoslaný** so šablónou **Následná starostlivosť o novú návštevu** a váš formulár „Connect Card“ alebo „Som tu nový“ sa stane automatickým postupom následnej starostlivosti.
:::

## Potvrdenia služobných úloh

Špeciálny druh pracovného postupu môže sledovať [žiadosti o službu](./plans.md#assigning-team-members), kým každý dobrovoľník úlohu neprijme alebo neodmietne. Namiesto osôb každá karta na tejto tabuli sleduje **jednu úlohu** -- jednu osobu na jednej pozícii v jednom pláne. Dve roly alebo dve služby pre tú istú osobu dostanú samostatné karty. Ide o voliteľnú funkciu: pre plán sa nič nemení, kým v jeho nastaveniach nevyberiete pracovný postup na potvrdenie.

### Nastavenie

1. Na stránke Pracovné postupy kliknite na **Pridať pracovný postup** a vyberte šablónu **Potvrdenie služobnej úlohy**. (Alebo začnite **Prázdnym pracovným postupom** a nastavte jeho **Účel pracovného postupu** na **Potvrdenie služobnej úlohy**.) Vytvorenie zo šablóny vyžaduje oprávnenie na odosielanie textových správ, pretože obsahuje krok s textovou správou.
2. Skontrolujte kroky. Šablóna začína s:
   - **Požiadať a čakať na odpoveď** -- pošle žiadosť o službu e-mailom aj textovou správou, počká 2 dni, odošle pripomienkový e-mail, počká ďalší deň a potom kartu automaticky posunie ďalej.
   - **Zavolať dobrovoľníkovi ohľadom nezodpovedanej žiadosti** -- krok, v ktorom osoba zavolá dobrovoľníkovi, s termínom za 1 deň. Nastavte na tomto kroku **Predvoleného zodpovedného**. Ak ho nemá, karta pôjde vedúcemu služby, alebo tímu služby, ak vedúci neexistuje.
3. Upravte čakania, správy a kroky tak, aby vyhovovali vašej cirkvi.
4. Otvorte [nastavenia plánu](./plans.md#plan-settings) a v časti **Pracovný postup na potvrdenie** vyberte tento pracovný postup.

Tieto pracovné postupy používajú akciu **Odoslať žiadosť o službu** namiesto akcií **Odoslať e-mail** a **Odoslať textovú správu**. Vyberte **E-mail** alebo **Textová správa** a voliteľne napíšte **Správu žiadosti**. Žiadosť vždy obsahuje rolu, plán, dátum služby a odkaz na odpoveď; vo svojej správe môžete použiť `{{planName}}`, `{{positionName}}` a `{{serviceDate}}`. Ak správu necháte prázdnu, použije sa predvolená žiadosť. Uplatňujú sa nastavenia upozornení dobrovoľníkov, ich súhlas s textovými správami, váš poskytovateľ textových správ a schválenie e-mailu vašej cirkvi a každý preskočený alebo zablokovaný pokus sa zaznamená na karte. Akcie **Odoslať e-mail**, **Odoslať textovú správu** a **Pridať do pracovného postupu** na týchto tabuliach nie sú k dispozícii.

Záložka **Spúšťače** na pracovnom postupe potvrdenia vysvetľuje, ako sa karty spúšťajú, namiesto toho, aby ponúkala spúšťače, a tieto pracovné postupy sa nezobrazujú v zoznamoch **Pridať do pracovného postupu** pre ľudí.

### Ako sa karty spúšťajú a uzatvárajú

- Karty sa spúšťajú, keď na publikovanom pláne **upozorníte** dobrovoľníkov (pozrite [Upozornenie dobrovoľníkov](./plan-validation.md#notifying-volunteers)). Každé nové, nezodpovedané priradenie dostane jednu kartu. Ukladanie, publikovanie, kopírovanie alebo automatické vyplnenie plánu nikoho sám od seba nekontaktuje, a plány označené ako predbežné neodosielajú nič.
- Dobrovoľníci stále dostanú obvyklé upozornenie v aplikácii. E-mailovú a textovú následnú starostlivosť zabezpečuje pracovný postup.
- Keď dobrovoľník **prijme alebo odmietne**, jeho karta sa automaticky uzavrie spolu s prepojenými následnými úlohami.
- Panel karty zobrazuje pozíciu, dátum služby a odkaz na plán. Namiesto **Dokončiť** tlačidlo znie **Zaznamenať vykonanú následnú starostlivosť**. Kliknutím na ňu sa zaznamená, že niekto nadviazal kontakt, ale karta zostane otvorená a priradená (zobrazuje sa ako **Čaká sa na odpoveď**), kým dobrovoľník neodpovie alebo kým neuplynie termín na odpoveď.
- Termín na odpoveď je koniec poslednej služby, v ktorej tím danej pozície slúži. Ak plán nemá zodpovedajúce časy, je to koniec dňa služby. Ak do tohto času nikto neodpovie, karta sa uzavrie s hlásením **Termín na odpoveď uplynul** a úloha **Skontrolovať nezodpovedanú žiadosť o službu** sa pošle aktuálnemu zodpovednému na karte alebo vedúcemu služby, aby niekto mohol rozhodnúť, ako miesto obsadiť. Priradenie zostane **Nepotvrdené**.
- Odstránenie priradenia, zmena jeho osoby, pozície alebo dátumu plánu, vrátenie plánu na predbežný stav alebo prepnutie plánu na iný pracovný postup na potvrdenie uzavrie kartu. Uzavretá karta sa nikdy neotvorí znova ďalším **Upozornením**; ak chcete poslať novú žiadosť, pridajte nové priradenie.

:::info
Pri žiadostiach odoslaných cez pracovný postup na potvrdenie chodia [pripomienky dobrovoľníkom](./plans.md#volunteer-reminders) len dobrovoľníkom, ktorí **prijali** úlohu, takže ľudia, ktorí čakajú na odpoveď, nedostávajú pripomienky navyše k následným krokom pracovného postupu.
:::

## Moje karty

Dobrovoľníci a personál nemusia prehľadávať každú tabuľu, aby našli svoju prácu. Zoznam **Moje karty** na stránke **Moja práca** zobrazuje každú kartu priradenú aktuálnemu používateľovi vo všetkých pracovných postupoch. Dostanete sa tam kliknutím na **Moje karty** v hornej časti stránky Pracovné postupy alebo otvorením **Služby > Moja práca** v ponuke Skok. Kliknutím na kartu sa jej panel podrobností otvorí priamo na stránke Moja práca, kde môžete s kartou pracovať alebo ju odstrániť bez opustenia stránky. Ak môžete zobrazovať pracovné postupy, panel má aj odkaz **Otvoriť tabuľu pracovného postupu** na tabuľu, do ktorej karta patrí.

## Prehľady

Otvorte pracovný postup a kliknutím na **Prehľady** zobrazíte jeho analytiku:

- **Po termíne** -- počet kariet, ktoré prekročili termín.
- **Karty podľa kroku** -- koľko kariet je aktuálne v každom kroku, zobrazené ako stĺpcový graf.
- **Dokončené (30 dní)** -- priepustnosť za posledných 30 dní, zobrazená ako čiarový graf.

Tieto údaje použite na odhalenie úzkych miest -- napríklad kroku, kde sa karty hromadia a nikdy nepostúpia ďalej.

## Súvisiace články

- [Úlohy](./tasks.md) -- jednotlivé akčné položky, na ktorých sú karty pracovných postupov postavené
- [Formuláre](../forms/index.md) -- vytvorte formuláre, ktoré môžu spúšťať pracovné postupy
- [Skupiny](../groups/index.md) -- skupiny, do ktorých môže akcia „Pridať do skupiny“ umiestniť ľudí
- [Plány služieb](./plans.md) -- vyberte pracovný postup na potvrdenie pre žiadosti o službu v pláne
- [Roly a oprávnenia](../settings/roles-permissions.md) -- určite, kto môže zobrazovať, upravovať a spravovať pracovné postupy
