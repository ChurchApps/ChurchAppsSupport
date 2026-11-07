---
title: "Nastavení docházky"
---

# Nastavení docházky

<div class="article-intro">

Než budete moci sledovat docházku, musíte v B1 Admin nastavit fyzická místa vašeho sboru, časy bohoslužeb a to, které skupiny se scházejí na jednotlivých bohoslužbách. Toto jednorázové nastavení vytvoří strukturu, na které stojí veškeré sledování a vykazování docházky ve vašem sboru.

</div>

## Video k tréninku

<YouTube id="LQPc2gVlXvQ" title="Nastavení bohoslužeb a docházky v B1" next="Nastavení dětského check-inu v B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete aktivní účet B1 Admin s oprávněním **Upravovat bohoslužby** pro docházku. Možnost **Nastavení** se zobrazí jen lidem, kteří toto oprávnění mají; samotné zobrazení docházky nestačí. Pokud si nejste jisti svou úrovní přístupu, podívejte se na [Role a oprávnění](../people/roles-permissions.md).
- Pokud plánujete přiřazovat skupiny k časům bohoslužeb, nejprve se ujistěte, že jsou vaše [skupiny vytvořeny](../groups/creating-groups.md).

</div>

## Základní pojmy

- **Sbor (kampus)** – fyzické místo, kde se váš sbor schází (například „Hlavní kampus“, „Severní kampus“). Kampusy spravujete v sekci **Nastavení**.
- **Bohoslužba** – opakující se shromáždění na kampusu (například „Nedělní bohoslužba“, „Středeční setkání“).
- **Čas bohoslužby** – konkrétní čas, kdy se bohoslužba koná (například „9:00“, „11:00“).
- **Plánovaná skupina** – skupina přiřazená ke konkrétnímu času bohoslužby. Docházka se sleduje v kontextu této bohoslužby.
- **Neplánovaná skupina** – skupina, která sleduje docházku samostatně, bez vazby na čas bohoslužby.

## Nastavení struktury docházky

1. Otevřete **B1 Admin**, otevřete [rychlou nabídku](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře) a rozbalte **Lidé**.
2. Klikněte na **Docházka** a poté v levém sloupci na **Nastavení**. Otevře se tabulka **Struktura bohoslužeb**, v jejímž horním pruhu jsou počty vašich kampusů, časů bohoslužeb a plánovaných a neplánovaných skupin. Počty se aktualizují hned, jakmile v tabulce cokoli přidáte, upravíte nebo odstraníte.
3. Klikněte na **Spravovat kampusy** (vpravo nahoře v panelu **Struktura bohoslužeb**). Přejdete do **Nastavení → Kampusy**. Klikněte na **Přidat kampus**, zadejte název svého místa (adresa a časové pásmo jsou volitelné) a klikněte na **Uložit**.
4. Vraťte se do **Lidé → Docházka** a klikněte na **Nastavení**. Váš kampus se nyní zobrazí v tabulce nastavení.
5. Klikněte na tlačítko **+** ve sloupci **Bohoslužba** pod svým kampusem. Zadejte název bohoslužby, například „Nedělní bohoslužba“, a klikněte na **Uložit**.
6. Klikněte na tlačítko **+** ve sloupci **Čas** pod bohoslužbou. Zadejte název **času bohoslužby**, například „9:00“, případně vyplňte [rozvrh check-inu](#setting-a-check-in-schedule) a klikněte na **Uložit**. Zopakujte pro každý čas bohoslužby.
7. Chcete-li propojit skupinu s časem bohoslužby, otevřete skupinu z **Lidé > Skupiny**, klikněte na **Upravit** a použijte **Přidat čas bohoslužby**. Viz následující oddíl.

### Zapnutí sledování docházky u skupiny

Než u skupiny půjde zaznamenávat docházka, musí být pro ni zapnuto sledování docházky.

1. V rychlé nabídce zvolte **Lidé > Skupiny** a vyberte skupinu.
2. Klikněte na tlačítko **Upravit** pod názvem skupiny.
3. Nastavte **Sledovat docházku** na **Ano**.
4. Klikněte na **Uložit**.

:::tip
Pokud jste skupinu přiřadili k času bohoslužby v předchozím kroku, použijte na obrazovce úprav skupiny také možnost **Přidat čas bohoslužby** a propojte ji se správnou bohoslužbou. Tím zajistíte, že jsou setkání navázána na správný kampus a čas.
:::

:::tip
Pokud se skupina schází mimo běžnou bohoslužbu – například středeční malá skupina, která si vede vlastní docházku – můžete ji ponechat jako neplánovanou skupinu. I tak se bude zobrazovat v přehledu **Docházka skupin**.
:::

## Nastavení rozvrhu check-inu

Každý čas bohoslužby může mít volitelný rozvrh check-inu, aby se [samoobslužný check-in](check-in.md) každý týden otevíral a zavíral automaticky. Bez rozvrhu zůstává check-in pro daný čas bohoslužby dostupný kdykoli (pokud místnost není uzavřena z jiného důvodu, například kvůli naplnění).

1. V zobrazení **Nastavení** klikněte na název času bohoslužby ve sloupci **Čas** (nebo přidejte nový).
2. V části **Rozvrh check-inu** vyberte **den** v týdnu, kdy se čas bohoslužby koná.
3. Nastavte **Čas začátku** a případně **Čas konce**.
4. Zadejte **Otevřít check-in (minut před začátkem)** – například `30` otevře check-in půl hodiny před začátkem bohoslužby.
5. Zadejte **Zavřít check-in (minut po konci)** – například `15` ponechá check-in otevřený 15 minut po čase konce. Pokud čas konce nenastavíte, počítá se od času začátku. Pokud necháte prázdné **Čas konce** i **Zavřít check-in**, zůstane check-in otevřený až do konce daného dne.
6. Klikněte na **Uložit**.

Rozvrh se opakuje každý týden a počítá se v časovém pásmu kampusu, ke kterému bohoslužba patří. Pokud kampus nemá časové pásmo, použije se místo něj [časové pásmo](../settings/church-settings.md#time-zone) vašeho sboru, potom časové pásmo prvního kampusu, který ho má, a nakonec východní čas (America/New_York). Pokud se check-in otevírá v nesprávnou hodinu, zkontrolujte **Časové pásmo** u kampusu v sekci [Kampusy](../settings/campuses.md). Chcete-li rozvrh odebrat, nastavte **Den** zpět na **Bez rozvrhu** a klikněte na **Uložit**. Rozvrh se uplatní jen tehdy, když jsou nastaveny **den** i **čas začátku**.

Dokud je okno check-inu pro čas bohoslužby zavřené:

- **Samoobslužný check-in na B1.church** uvádí daný čas bohoslužby jako **Zavřeno** (nebo například **Zavřeno · otevírá se ne 9:30**) a nelze jej vybrat. Pokud jsou všechny časy bohoslužby zavřené, rodiny vidí, kdy se check-in otevře, například „Check-in se otevře v neděli v 9:30.“
- **Aplikace B1 Checkin pro kiosek** také zobrazuje čas bohoslužby jako **Zavřeno** spolu s tím, kdy se otevře. Pokud jsou všechny časy dané bohoslužby zavřené, kiosek sdělí, kdy se check-in pro tuto bohoslužbu otevře. Někdo, kdo je už přihlášen na zavřený čas bohoslužby, se zobrazí se skupinou označenou jako **Přihlášeno**. Pokud se okno zavře uprostřed přihlašování, kiosek jej nedokončí a zobrazí obrazovku **Zatím nelze přihlásit** se seznamem dotčené místnosti, aby si rodina mohla vybrat jinou.

Domácnost, která se již přihlásila na dřívější čas bohoslužby, se může vrátit a přidat pozdější čas bohoslužby, který je otevřený, i poté, co se okno pro dřívější čas zavřelo. Jejich stávající přihlášení zůstanou zachována.

:::tip
Nastavte dostatečně dlouhé okno pro otevření (například 45 minut před začátkem), aby se mohly přihlásit rodiny i dobrovolníci, kteří přijdou brzy, a krátké okno pro zavření, aby mohli pozdní příchozí přihlásit i po začátku bohoslužby.
:::

## Úprava nastavení

Nastavení můžete kdykoli aktualizovat. Vyberte kampus, čas bohoslužby nebo skupinu a kliknutím na **Upravit** změníte jejich podrobnosti, nebo kliknutím na **Smazat** je odstraníte.

:::info
Odstranění času bohoslužby nesmaže minulé záznamy docházky. Vaše historická data zůstanou zachována, i když změníte rozvrh.
:::

## Co dál

Jakmile máte nastavené kampusy, časy bohoslužeb a skupiny, můžete začít [zaznamenávat docházku](recording-attendance.md) ručně, nebo nastavit [samoobslužný check-in](check-in.md) pro vaše bohoslužby.
