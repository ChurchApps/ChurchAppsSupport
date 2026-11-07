---
title: "Nastavenie dochádzky"
---

# Nastavenie dochádzky

<div class="article-intro">

Skôr ako začnete sledovať dochádzku, musíte aplikácii B1 Admin oznámiť, kde sa vaša cirkev nachádza fyzicky, kedy sa konajú bohoslužby a ktoré skupiny sa stretávajú na každej z nich. Toto jednorazové nastavenie vytvorí štruktúru, na ktorej stojí sledovanie dochádzky a jej vykazovanie v celej cirkvi.

</div>

## Video na zaškolenie

<YouTube id="LQPc2gVlXvQ" title="Nastavenie bohoslužieb a dochádzky v B1" next="Nastavenie detského check-inu v B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete aktívny účet B1 Admin s oprávnením **Upraviť bohoslužby** pre dochádzku. Možnosť **Nastavenie** sa zobrazí len ľuďom, ktorí toto oprávnenie majú; samotné zobrazenie dochádzky nestačí. Ak si nie ste istí svojím prístupom, pozrite si [Roly a oprávnenia](../people/roles-permissions.md).
- Ak plánujete priradiť skupiny k časom bohoslužieb, najprv sa uistite, že [skupiny sú vytvorené](../groups/creating-groups.md).

</div>

## Základné pojmy

- **Kampus** -- fyzické miesto, kde sa vaša cirkev stretáva (napr. „Hlavný kampus“, „Severný kampus“). Kampusy spravujete v časti **Nastavenia**.
- **Bohoslužba** -- opakujúce sa stretnutie na kampuse (napr. „Nedeľná bohoslužba“, „Stredová“).
- **Čas bohoslužby** -- konkrétny čas, v ktorý sa bohoslužba koná (napr. „9:00“, „11:00“).
- **Plánovaná skupina** -- skupina priradená ku konkrétnemu času bohoslužby. Dochádzka sa eviduje v kontexte tejto bohoslužby.
- **Neplánovaná skupina** -- skupina, ktorá eviduje dochádzku samostatne, bez väzby na čas bohoslužby.

## Nastavenie štruktúry dochádzky

1. Otvorte **B1 Admin**, otvorte [ponuku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávacie pole v ľavom hornom rohu) a rozbaľte **People**.
2. Kliknite na **Attendance** a potom na **Setup** v ľavom stĺpci. Otvorí sa tabuľka **Štruktúra bohoslužieb** s počtami vašich kampusov, časov bohoslužieb a plánovaných a neplánovaných skupín v hornej časti. Počty sa aktualizujú hneď, ako v tabuľke niečo pridáte, upravíte alebo odstránite.
3. Kliknite na **Manage Campuses** (vpravo hore v paneli **Štruktúra bohoslužieb**). Otvorí sa **Settings → Campuses**. Kliknite na **Add Campus**, zadajte názov vášho miesta (adresa a časové pásmo sú voliteľné) a kliknite na **Save**.
4. Vráťte sa do **People → Attendance** a kliknite na **Setup**. Váš kampus sa teraz zobrazí v tabuľke nastavenia.
5. Kliknite na tlačidlo **+** v stĺpci **Service** pod vaším kampusom. Zadajte názov bohoslužby, napríklad „Nedeľná bohoslužba“, a kliknite na **Save**.
6. Kliknite na tlačidlo **+** v stĺpci **Time** pod bohoslužbou. Zadajte názov **času bohoslužby**, napríklad „9:00“, voliteľne vyplňte [rozvrh check-inu](#nastavenie-rozvrhu-check-inu) a kliknite na **Save**. Zopakujte pre každý čas bohoslužby.
7. Ak chcete skupinu prepojiť s časom bohoslužby, otvorte skupinu v **People > Groups**, kliknite na **Edit** a použite **Add Service Time** -- pozrite nasledujúcu časť.

### Zapnutie sledovania dochádzky pre skupinu

Skôr než sa dá pre skupinu evidovať dochádzka, musí mať zapnuté **Track Attendance**.

1. V ponuke Jump vyberte **People > Groups** a vyberte skupinu.
2. Kliknite na tlačidlo **Edit** pod názvom skupiny.
3. Nastavte **Track Attendance** na **Yes**.
4. Kliknite na **Save**.

:::tip
Ak ste skupinu v predchádzajúcom kroku priradili k času bohoslužby, na obrazovke úprav skupiny použite aj možnosť **Add Service Time**, aby ste ju prepojili so správnou bohoslužbou. Tým sa zabezpečí, že relácie budú napojené na správny kampus a čas.
:::

:::tip
Ak sa skupina stretáva mimo pravidelnej bohoslužby -- napríklad stredová malá skupina, ktorá eviduje dochádzku samostatne -- môžete ju ponechať ako neplánovanú skupinu. Aj tak sa zobrazí v prehľade **Group Attendance** pri vykazovaní dochádzky.
:::

## Nastavenie rozvrhu check-inu

Každý čas bohoslužby môže mať voliteľný rozvrh check-inu, aby sa [samoobslužný check-in](check-in.md) každý týždeň otváral a zatváral automaticky. Bez rozvrhu zostáva check-in pre daný čas bohoslužby dostupný kedykoľvek (pokiaľ miestnosť nie je zatvorená z iných dôvodov, napríklad preto, že je plná).

1. V zobrazení **Setup** kliknite na názov času bohoslužby v stĺpci **Time** (alebo pridajte nový).
2. V časti **Check-in Schedule** vyberte **Day** -- deň v týždni, v ktorý sa čas bohoslužby koná.
3. Nastavte **Start Time** a voliteľne aj **End Time**.
4. Zadajte **Open check-in (minutes before start)** -- napríklad `30` otvorí check-in pol hodiny pred začiatkom bohoslužby.
5. Zadajte **Close check-in (minutes after end)** -- napríklad `15` ponechá check-in otvorený 15 minút po konci. Ak ste nenastavili čas konca, počíta sa od času začiatku. Ak necháte prázdne **End Time** aj **Close check-in**, check-in zostane otvorený až do konca daného dňa.
6. Kliknite na **Save**.

Rozvrh sa opakuje každý týždeň a meria sa v časovom pásme kampusu, ku ktorému bohoslužba patrí. Ak kampus nemá nastavené časové pásmo, použije sa [časové pásmo](../settings/church-settings.md#time-zone) vašej cirkvi, potom časové pásmo prvého kampusu, ktorý ho má, a nakoniec východoamerický čas (America/New_York). Ak sa check-in otvára v nesprávnu hodinu, skontrolujte **Time Zone** na kampuse v časti [Campuses](../settings/campuses.md). Ak chcete rozvrh odstrániť, nastavte **Day** späť na **No schedule** a kliknite na **Save**. Rozvrh sa uplatní, až keď sú nastavené obidve hodnoty -- **Day** aj **Start Time**.

Kým je check-in okno času bohoslužby zatvorené:

- **Samoobslužný check-in na B1.church** zobrazí tento čas bohoslužby ako **Closed** (alebo napríklad **Closed · opens Sun 9:30 AM**) a nedá sa vybrať. Ak sú všetky časy danej bohoslužby zatvorené, rodiny uvidia, kedy check-in otvoria, napríklad „Check-in opens Sun 9:30 AM.“
- **Kioskový režim aplikácie B1 Checkin** tiež zobrazí čas bohoslužby ako **Closed** spolu s údajom, kedy sa otvorí. Ak sú všetky časy danej bohoslužby zatvorené, kiosk zobrazí, kedy sa check-in pre túto bohoslužbu otvorí. Osoba, ktorá je už prihlásená na zatvorený čas bohoslužby, zobrazí svoju skupinu so stavom **Checked in**. Ak sa okno zatvorí počas check-inu, kiosk ho nedokončí a zobrazí obrazovku **Can't check in yet** so zoznamom dotknutej miestnosti, aby si rodina mohla vybrať inú.

Domácnosť, ktorá sa už prihlásila na skoršiu bohoslužbu, sa môže vrátiť a pridať neskorší čas bohoslužby, ktorý je otvorený, aj po zatvorení predchádzajúceho okna. Jej existujúce prihlásenia sa zachovajú.

:::tip
Nastavte dostatočne dlhé okno otvorenia (napríklad 45 minút pred začiatkom), aby sa mohli prihlásiť rodiny a dobrovoľníci, ktorí prídu skoro, a krátke okno zatvorenia, aby mohli neskorí účastníci prihlásiť, keď bohoslužba už začala.
:::

## Úprava nastavenia

Nastavenie môžete kedykoľvek aktualizovať. Vyberte kampus, čas bohoslužby alebo skupinu a kliknite na **Edit**, ak chcete zmeniť ich údaje, alebo na **Delete**, ak ich chcete odstrániť.

:::info
Odstránenie času bohoslužby nevymaže minulé záznamy dochádzky. Vaše historické údaje zostanú zachované, aj keď zmeníte rozvrh.
:::

## Čo nasleduje

Keď máte kampusy, časy bohoslužieb a skupiny na svojom mieste, môžete začať [zaznamenávať dochádzku](recording-attendance.md) ručne alebo nastaviť [samoobslužný check-in](check-in.md) pre vaše bohoslužby.
