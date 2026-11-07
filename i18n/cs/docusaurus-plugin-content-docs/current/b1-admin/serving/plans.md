---
title: "Plány služeb"
---

# Plány služeb

<div class="article-intro">

Plány služeb určují, kdo slouží a kdy. Každý plán je přiřazen ke konkrétnímu datu a službě, což usnadňuje koordinaci dobrovolnických týmů týden za týdnem a zajišťuje, že je každá služba plně obsazena.

</div>

## Video s návodem

<YouTube id="47DstBXKl74" title="Vytváření plánů a plánování dobrovolníků v B1" next="Sestavení pořadu služby a knihovny písní v B1" nextUrl="/docs/b1-admin/serving/service-order" />

<div class="prereqs">
<h4>Než začnete</h4>

- Nastavte své služby a týmy v oblasti Serving
- Ujistěte se, že dobrovolníci byli přidáni do vašeho [adresáře osob](../people/adding-people.md) a přiřazeni k týmům

</div>

## Přístup k plánům

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), rozbalte **Serving** a klikněte na **Plans**.
2. Vyberte **kartu služby** v horní části stránky.
3. Klikněte na **typ plánu**, abyste zobrazili seznam plánů pro daný typ. Pomocí **Upcoming** a **Past** nad seznamem přepínáte mezi budoucími a dřívějšími plány. **Upcoming** zobrazuje plány od dneška dál, od nejbližšího, a plány bez data jsou na konci. **Past** zobrazuje pouze dřívější plány, od nejnovějšího.
4. Klikněte na konkrétní plán a otevřete jej.

Každá stránka plánu obsahuje odkazy zpět na jeho typ plánu a na **Plans**, takže se můžete vrátit nahoru bez použití tlačítka zpět v prohlížeči.

:::info
Pro správu plánů není vyžadován plný administrátorský přístup. Každý, kdo je členem služby, se může dostat do oblasti Serving a vytvářet, upravovat a plánovat plány pro svou službu bez oprávnění Plans Edit. Editoři s rolí Plans Edit mohou spravovat plány ve všech službách.
:::

## Vytváření plánu

1. Na stránce typu plánu klikněte nahoře na **New Plan**.
2. Dejte plánu název, nebo použijte datum jako název. Vyberte **datum** služby.
3. Pokud vaše služba používá [šablony](./plan-templates.md), můžete v části **Start from template** vybrat šablonu, která jedním krokem vyplní pořad služby, pozice a poznámky.
4. Pokud chcete kopírovat z předchozího plánu, použijte **Copy from Previous Plan** a vyberte **Positions Only** nebo **Positions and Assignments**. Pokud nechcete kopírovat, vyberte **Nothing**. Můžete také zaškrtnout **Copy Order of Service**. Při kopírování z předchozího plánu si nový plán ponechá také jeho **Notes**, **Signup Deadline**, nastavení **Show volunteer names on signup page** a nastavení automatického nahrazování, takže je týden co týden nemusíte znovu zadávat. Všechny tyto hodnoty můžete v nastavení nového plánu změnit.
5. Chcete-li najednou vytvořit několik plánů při kopírování, vyberte **Repeat every** a **Frequency** (Day, Week nebo Month) a poté zadejte **Number of plans** (až 12). U možnosti Month volba **On** umožňuje zachovat stejný den v měsíci nebo stejný den v týdnu, například druhou sobotu. B1 zobrazí data před uložením a vytvoří jeden plán pro každé datum, přičemž každý bude zkopírován z předchozího. Pokud je plán pojmenován podle data, každý nový plán dostane název podle svého vlastního data.
6. Volitelně nastavte **Signup Deadline (hours before service)**. Nový plán převezme termín z předchozího plánu, který zde můžete změnit. Ponechte prázdné, pokud termín nemáte. Způsob počítání termínu najdete v části [Nastavení plánu](#plan-settings).
7. Uložte plán. Nyní můžete začít přiřazovat členy týmu a sestavovat [pořad služby](./service-order.md).

:::tip
Nastavení opakování je k dispozici pouze tehdy, když kopírujete něco z předchozího plánu (pozice, přiřazení nebo pořad služby).
:::

## Stránka podrobností plánu

Když otevřete plán, v horní části se zobrazí jeho název, služba, typ plánu a datum služby, spolu s tlačítky **Edit** a **Print**. Pod nimi je vše na jedné stránce:

- **[Order of Service](./service-order.md)** -- Sestavte pořad služby z prvků, jako jsou chvalozpěvy, modlitby, oznámení a kázání.
- **Serving Team Assignments** -- Spravujte, kteří členové týmu jsou přiřazeni k tomuto plánu. Můžete přidávat lidi z existujících týmů a vidět, kdo potvrdil účast a kdo ještě čeká. Odkazy nad pozicemi vám umožní otevřít **Notes** a **Times** plánu.

## Přiřazování členů týmu

1. Otevřete plán a přejděte k části **Serving Team Assignments**.
2. Klikněte na **Add Position**. Vyplňte informace ve formuláři pro přidání pozice. Jako název kategorie zadejte libovolnou kategorii. Chcete-li, aby pozici mohl zastávat kdokoli ve vašem sboru (ne pouze členové jednoho týmu), ponechte **Volunteer Group** nastavené na **None**.
3. Klikněte na **People Needed** a vyberte dobrovolníky, kteří mají danou pozici obsadit. Pokud má pozice **Volunteer Group**, vybíráte z členů této skupiny. Pokud je její Volunteer Group nastavena na **None**, můžete místo toho vyhledat kohokoli ve svém sboru.
4. Přidejte členy ze seznamu týmu kliknutím na **Add**.
5. Přiřazení členové se zobrazí pod svým týmem spolu se stavem přiřazení.
6. Klikněte na notify volunteers, abyste je upozornili v aplikaci B1 nebo e-mailem. Pokud plán používá [potvrzovací postup](#plan-settings), upozornění také spustí kartu postupu, která u každé žádosti sleduje odpověď dobrovolníka, dokud neodpoví.

Každá pozice zobrazuje štítek s počtem (například „2/3“), takže na první pohled vidíte, kolik míst je obsazeno. Pod nadpisem **Serving Team Assignments** se zobrazuje souhrn („X z Y pozic obsazeno“), který ukazuje celkové obsazení plánu, včetně počtu chybějících osob. Jakmile jsou všechny pozice obsazeny, změní se na **Fully staffed**.

:::tip
Před vytvářením plánů nastavte své týmy v nastavení služby. Budete tak mít připravenou skupinu dobrovolníků, ze které můžete přiřazovat.
:::

### Kopírování pozic do prázdného plánu

Pokud plán zatím nemá žádné pozice a existuje dřívější plán stejného typu, v části **Serving Team Assignments** se objeví odkaz **Copy from Previous Plan**. Vyberte **Positions Only** nebo **Positions and Assignments**, aby se do otevřeného plánu zkopírovaly pozice (a dobrovolníci) z předchozího plánu. Kopie se vloží do aktuálního plánu; nevytvoří druhý plán pro stejné datum.

## Nastavení plánu

Každý plán má další nastavení, které můžete upravit kliknutím na **Edit** vedle plánu v seznamu typu plánu, nebo na tlačítko **Edit** nahoře na stránce plánu. Chcete-li se vrátit k plánu, klikněte na **Done** (nebo na název plánu). Patří sem:

- **Signup Deadline (hours before service)** -- počet hodin před službou, kdy se uzavírají přihlášky dobrovolníků. Hodiny se počítají zpět od prvního času **Service** plánu (zkoušky a další časy se přeskakují, pokud plán nemá nic jiného). Termín 2 hodiny před službou v 10:00 tedy uzavře přihlášky v 8:00 ráno téhož dne. Pokud plán nemá časy, termín se počítá od 9:00 v den služby podle časového pásma vašeho sboru. Jakmile termín uplyne, dobrovolníci se nemohou ani přihlásit, ani odhlásit. Zadáním záporného čísla můžete přihlášky nechat otevřené i po začátku služby. Ponechte pole prázdné nebo je vymažte, pokud termín nemáte.
- **Confirmation workflow** -- vyberte [potvrzovací postup pro přiřazení služeb](./workflows.md#serving-assignment-confirmations), který bude e-mailem a textovou zprávou sledovat žádosti o službu v tomto plánu, dokud každý dobrovolník nepřijme nebo neodmítne. Když u zveřejněného plánu kliknete na **Notify**, každá nová žádost dostane vlastní kartu na nástěnce daného postupu a nad odkazem pro upozornění se zobrazí poznámka *„Nové žádosti používají potvrzovací postup.“* Ponechte nastavení **Use existing assignment notifications**, pokud chcete zachovat obvyklá upozornění. V seznamu se zobrazují pouze aktivní potvrzovací postupy; nejprve je vytvořte v části **Serving > Workflows**.
- **Show volunteer names on signup page** -- pokud je zaškrtnuto, přihlášení dobrovolníci vidí, kdo se už přihlásil na jednotlivé pozice na přihlašovací stránce B1.church. Jména se nikdy nezobrazují návštěvníkům, kteří nejsou přihlášeni.
- **Penciled in** -- skryje přiřazení před dobrovolníky, dokud nebudete připraveni rozpis zveřejnit.
- **Automatically schedule a replacement when a volunteer declines** -- pokud je zaškrtnuto, když přiřazený dobrovolník odmítne svou pozici, B1 automaticky osloví dalšího dostupného člena ze seznamu týmu a zeptá se, zda by mohl sloužit. Pokračuje to dolů seznamem, dokud někdo nepřijme, takže pozice zůstanou obsazené bez ruční práce.

:::tip
Na přihlašovací stránce pro členy jsou volné pozice každého plánu seřazeny podle kategorie a poté podle názvu. Členové vidí každý nadcházející týden s volnými pozicemi, pokud nezapnete možnost **Show only the next week of each plan type** v nastavení [Settings > Volunteer Signup](../settings/church-settings.md#volunteer-signup).
:::

## Připomínky pro dobrovolníky {#volunteer-reminders}

B1 může dobrovolníkům automaticky připomínat služby, na které jsou naplánováni, takže nemusíte každý týden obvolávat svůj tým. Připomínky se posílají **všem naplánovaným** -- jak těm, kteří potvrdili účast, tak těm, kteří ještě neodpověděli. Výjimkou je žádost odeslaná přes [potvrzovací postup](./workflows.md#serving-assignment-confirmations): tento dobrovolník dostane připomínky až poté, co žádost přijme, protože do té doby postup zajišťuje sledování. Každý e-mail s připomínkou obsahuje pozici (pozice) dobrovolníka, datum služby, poznámky k plánu a vaši vlastní zprávu.

Časování a obsah připomínek se nastavují pro každý **typ plánu**, takže každý druh služby může mít vlastní harmonogram.

1. V oblasti **Serving** vyberte službu, která obsahuje typ plánu.
2. V seznamu **Plan Types** klikněte u typu plánu na **Edit**.
3. Rozbalte sekci **Reminders** a zapněte **Send reminders for plans of this type**.
4. U položky **When should reminders go out?** vyberte až tři časy: **7 days before**, **3 days before**, **2 days before**, **1 day before** nebo **Day of**.
5. Nastavte **Time of Day**, kdy se připomínky odešlou.
6. Volitelně přidejte **Message**. Pokud ji ponecháte prázdnou, použije se výchozí znění připomínky.
7. U položky **Send By** vyberte **Push**, **Email** a případně **Text**, pokud je ke sboru připojen [poskytovatel textových zpráv](../settings/church-settings.md#texting).
8. Klikněte na **Save Reminders**.

Připomínky jsou pro typ plánu vypnuté, dokud je nezapnete.

:::tip
Dobrovolníci, kteří ještě nepotvrdili účast, dostanou v e-mailu s připomínkou tlačítka **Accept** a **Decline**, takže mohou odpovědět, aniž by se museli přihlašovat.
:::

### Textové připomínky

Možnost **Text** se zobrazí pouze tehdy, je-li ke sboru připojen poskytovatel textových zpráv. Zprávy se odesílají přes poskytovatele vašeho sboru a každá zpráva může sboru něco stát. Dobrovolník dostane textovou připomínku pouze tehdy, pokud má v [nastavení oznámení](../../b1-church/getting-started/notification-preferences.md) zapnuté **Text messages** a v profilu uvedené mobilní číslo. Každá zpráva začíná názvem vašeho sboru, je omezena na jednu textovou zprávu a končí větou „Odpovězte STOP pro odhlášení.“ Kdo odpoví STOP, přestane od vašeho sboru dostávat textové zprávy. Aby se odpovědi STOP dostaly do B1, vložte **Inbound (STOP) webhook URL** z [nastavení textových zpráv](../settings/church-settings.md#texting) do příchozího webhooku svého poskytovatele.

Chcete-li okamžitě poslat textovou zprávu všem naplánovaným lidem v určitém rozsahu dat, použijte **Text Volunteers** na [přehledu plánů](./plans-overview.md#texting-everyone-scheduled).

:::info
Každá připomínka se odešle jednou. Textové připomínky se posílají navíc k e-mailu a push oznámením, nikoli místo nich.
:::

## Přiřazení skupin k typu plánu

Pod seznamem plánů na stránce typu plánu umožňuje sekce **Associated Groups** určit, které skupiny mohou ve svém portálu členů vidět plány tohoto typu. Je to rychlý způsob, jak nadcházející služby zobrazit správným týmům, aniž by musely mít administrátorský přístup.

1. Na stránce typu plánu klikněte nahoře na **Associated Groups** (nebo přejděte dolů do této sekce).
2. Klikněte na **Add Group** a z rozbalovací nabídky vyberte skupinu.
3. Ve sloupci **Shows** zvolte, zda mají členové dané skupiny u tohoto typu plánu vidět **Past plans only**, **Upcoming plans only**, nebo **Past and upcoming plans**.
4. Opakováním přidáte další skupiny, nebo kliknutím na ikonu koše skupinu odeberete.

:::info
V výběru se zobrazují pouze skupiny označené jako **Standard**. Členové přiřazené skupiny automaticky vidí plány tohoto typu na stránce skupiny v portálu členů B1, a to pouze v časovém okně, které jste zvolili.
:::

Pokud jde o lekce Lessons.church, členové přiřazené skupiny také vidí na stránce skupiny kartu **This week's lesson** (hlavní myšlenka, verš a otázka pro rodiče). Přiřaďte sem nadřazenou skupinu a nastavte filtr na **Past plans only**, aby se započítala dnešní lekce. Týmy dobrovolníků obvykle používají **Upcoming plans only** nebo **Past and upcoming plans**.

## Tisk plánů

Plán můžete vytisknout a rozdat svému týmu. Otevřete plán a v horní části stránky klikněte na **Print**, čímž vytvoříte verzi k tisku, která obsahuje přiřazení a pořad služby. Nahoře na výtisku se zobrazí logo vašeho sboru (**Light Background Logo** z [Web > Vzhled](../website/appearance.md), pokud jste nějaké nahráli) a pod ním název sboru, dále název plánu, takže se volné stránky snadno rozpoznají. Je to užitečné pro rozdávání na zkouškách nebo vyvěšení ve společném prostoru.

Výtisk vynechá vše, co by bylo prázdné. Pokud nejsou přiřazeni žádní dobrovolníci, nezobrazí se políčko týmu a pořad služby využívá celou šířku stránky. Pokud žádné položky nemají délku, sloupec **Length** se vynechá, a pokud plán nemá časy služeb ani délky, vynechá se i sloupec **Time**. Chcete-li odstranit černou lištu nadpisu **Service Order** s datem služby, odškrtněte na stránce pro tisk možnost **Show Service Order heading**; B1 Admin si vaši volbu pro daný prohlížeč zapamatuje.

:::info
Plány jsou seřazeny podle služeb. Před vytvářením nebo prohlížením plánů se ujistěte, že jste na správné kartě služby.
:::

## Další kroky

- Použijte [přehled plánů](./plans-overview.md), kde uvidíte všechna nadcházející přiřazení na více týdnů v jedné mřížce, a najdete neobsazené pozice -- a dobrovolníky můžete přiřazovat přímo z mřížky
- Uložte strukturu plánu jako [šablonu plánu](./plan-templates.md), abyste ji mohli na budoucí plány použít jedním kliknutím
- Sestavte svůj [pořad služby](./service-order.md) s písněmi, čteními a dalšími prvky
- Přidejte [písně](./songs.md) ze své knihovny přímo do pořadu služby
- Použijte [Úkoly](./tasks.md) k přiřazení následných akčních položek členům týmu
- Zobrazte aktuální obsah lekcí na televizi v předsálí pomocí [digitální signalizace](./digital-signage.md)
