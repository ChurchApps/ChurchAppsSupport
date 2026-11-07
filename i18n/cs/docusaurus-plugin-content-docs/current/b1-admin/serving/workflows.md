---
title: "Pracovní postupy"
---

# Pracovní postupy

<div class="article-intro">

Pracovní postupy provádějí lidi řadou kroků na vizuální nástěnce. Každý člověk je karta, která putuje od jednoho kroku k dalšímu: od následné péče o návštěvníka, který přišel poprvé, přes proces členství až po poděkování dárci, který dal poprvé, a po cokoli dalšího, kde potřebujete sledovat mnoho lidí procházejících stejnými fázemi. Krok může požádat dobrovolníka, aby něco udělal (zavolal, vedl rozhovor), **a zároveň** může sám spouštět automatické akce, například odeslat e-mail nebo textovou zprávu, počkat několik dní nebo přidat člověka do skupiny. Pracovní postupy tak zvládnou jak lidskou následnou péči, tak rutinní práci kolem ní. Pracovní postupy rozšiřují [Úkoly](./tasks.md) o nástěnku typu Kanban s přetahováním, aby nikdo a nic nezapadlo.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Ujistěte se, že lidé, které chcete sledovat, existují v B1 Admin
- Seznamte se s tím, jak fungují [Úkoly](./tasks.md), protože každá karta na nástěnce je úkol
- Chcete-li použít akci **Odeslat e-mail**, nejprve vytvořte e-mailové šablony, které chcete odesílat (spravují se v **Nastavení → E-mailové šablony**)
- Chcete-li použít akci **Odeslat textovou zprávu**, nejprve připojte [poskytovatele SMS](../settings/church-settings.md#texting)
- Potřebujete příslušné oprávnění pro Úkoly. Zobrazení, úpravy karet a správa pracovních postupů jsou samostatné úrovně oprávnění (viz [Role a oprávnění](../settings/roles-permissions.md))

</div>

## Zobrazení pracovních postupů

Otevřete [nabídku Jump menu](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře v B1 Admin), rozbalte položku **Služba** a klikněte na **Pracovní postupy**. Vaše pracovní postupy jsou uvedeny v tabulce, která u každého zobrazuje **Kategorii** a **Stav** (**Aktivní** nebo **Neaktivní**). Pokud používáte kategorie, záložky nad seznamem jej umožňují filtrovat podle kategorie. Kliknutím na libovolný pracovní postup otevřete jeho nástěnku.

## Vytvoření pracovního postupu

1. Na stránce Pracovní postupy klikněte na **Přidat pracovní postup**.
2. Zvolte, jak začít:
   - **Prázdný pracovní postup** -- začněte od nuly a vytvořte si vlastní kroky.
   - **Ze šablony** -- začněte s hotovou sadou kroků, které můžete upravit. Mezi vestavěné šablony patří:
     - **Následná péče o nového návštěvníka** -- Odeslat uvítací e-mail → Osobní telefonát → Pozvání na další krok → Zapojen
     - **Kurz členství** -- Vyjádřený zájem → Registrace do kurzu → Účast na kurzu → Dokončení členství
     - **Poděkování dárci poprvé** -- Odeslat poděkování → Sdílet dopad daru → Spravován
     - **Potvrzení služebního úkolu** -- Požádat a čekat na odpověď → Zavolat dobrovolníkovi kvůli nezodpovězené žádosti (viz [Potvrzení služebních úkolů](#serving-assignment-confirmations))

   Vytváření kroků podle šablony chvíli trvá. Dokud probíhá, tlačítko **Přidat pracovní postup** zobrazuje **Vytváření...** a nelze na něj znovu kliknout, takže nevznikne duplicita. Pokud se něco pokazí, stránka zobrazí hlášení *„Pracovní postup se nepodařilo vytvořit. Zkuste to prosím znovu.“*
3. Zadejte **Název** pracovního postupu.
4. Volitelně přiřaďte **Kategorii**, aby se související pracovní postupy seskupily. Novou kategorii můžete vytvořit přímo z rozbalovací nabídky.
   U prázdného pracovního postupu také zvolte jeho **Účel**: **Následná péče o lidi** (obvyklý typ) nebo **Potvrzení služebního úkolu**. Účel nelze změnit poté, co je pracovní postup vytvořen.
5. Ponechte pracovní postup **Aktivní**, aby do něj bylo možné přidávat lidi, nebo ho nastavte na **Neaktivní**, aby se skryl v seznamech pro přidání do pracovního postupu.
6. Klikněte na **Uložit**.

:::tip
Tlačítkem **Duplikovat** v seznamu pracovních postupů zkopírujte existující pracovní postup -- včetně jeho kroků, automatických akcí a směrování -- jako výchozí bod pro nový.
:::

## Sestavení nástěnky pomocí kroků

Každá nástěnka pracovního postupu se skládá z **kroků**, zobrazených jako sloupce zleva doprava. Otevřete pracovní postup a pomocí **Přidat krok** vytvořte každou fázi svého procesu.

Při přidávání nebo úpravě kroku můžete nastavit:

- **Název kroku** -- nadpis sloupce (například „Uvítací hovor“ nebo „Čeká na registraci“).
- **Termín (dny)** -- automaticky nastaví termín, když karta vstoupí do tohoto kroku. Karty po termínu jsou označeny jako **Po termínu**.
- **Výchozí řešitel** -- osoba nebo skupina, které se nové karty v tomto kroku automaticky přiřadí. Pokud je výchozím řešitelem osoba, dostane oznámení, že jí byla přiřazena karta.
- **Automatické akce** -- věci, které systém sám provede, když karta dorazí (viz níže).
- **Směrování** -- kam karta půjde, když krok opustí (viz [Směrování](#routing-cards-with-outcomes-and-conditions)).

Sloupce kroků přetáhněte do pořadí, které odpovídá vašemu procesu. Pořadí také určuje výchozí cestu, kterou karta půjde, když se neuplatní žádné jiné směrování.

:::info
Nejprve uložte nový krok. Automatické akce a směrování se připojují ke kroku, takže editor tyto sekce odemkne až poté, co krok existuje.
:::

## Automatické akce

Každý krok může obsahovat seznam **automatických akcí**, které se spustí samy ve chvíli, kdy karta **vstoupí** do kroku -- dříve, než se jí kdokoli věnuje. Díky tomu krok zároveň vyzve dobrovolníka *a* zajistí rutinní práci kolem následné péče.

V editoru kroku otevřete **Automatické akce**, klikněte na **Přidat akci**, zvolte typ a vyplňte jeho nastavení. Přidejte jich, kolik potřebujete; běží **shora dolů v pořadí**. Kliknutím na **Uložit** u kroku uložíte krok i všechny jeho akce najednou. Odebrání akce pomocí ikony koše se projeví okamžitě.

| Akce | Co dělá |
|---|---|
| **Odeslat e-mail** | Pošle osobě e-mailovou šablonu, kterou zvolíte. Můžete přepsat předmět. |
| **Odeslat textovou zprávu** | Pošle osobě zprávu, kterou napíšete, prostřednictvím [poskytovatele SMS](../settings/church-settings.md#texting) vaší církve. |
| **Čekat** | Pozastaví kartu na zadaný počet dní, než bude pokračovat (viz níže). |
| **Přidat do skupiny** | Přidá osobu do vybrané [skupiny](../groups/index.md). |
| **Odebrat ze skupiny** | Odebere osobu z vybrané skupiny. |
| **Zaznamenat účast** | Označí osobu jako přítomnou na probíhajícím termínu služby skupiny (viz níže). |
| **Přidat do pracovního postupu** | Zapojí osobu do jiného pracovního postupu -- užitečné pro předávání mezi procesy. |
| **Přidat poznámku** | Zaznamená poznámku do historie karty. |
| **Nastavit pole** | Aktualizuje pole v záznamu osoby: Stav členství, Rodinný stav, Pohlaví, Město, Stát nebo PSČ. |
| **Webhook** | Odešle údaje o kartě na externí webovou adresu (URL), kterou zadáte, pro propojení s jinými systémy. |
| **Vytvořit úkol** | Vytvoří [úkol](./tasks.md) se zadaným názvem a popisem, přiřazený vybrané osobě. |
| **Upozornit osobu** | Odešle zaměstnanci nebo dobrovolníkovi, kterého vyberete, e-mail a upozornění B1 o kartě (viz níže). |

Po dokončení všech akcí kroku karta **zůstane v tomto kroku**, aby se jí mohla věnovat osoba -- pokud krok nemá automatické směrování, které ji posune dál (viz [Plně automatické kroky](#fully-automated-steps)).

:::info
Automatické akce běží pouze tehdy, když karta dorazí běžným postupem -- když je poprvé přidána, když ji přivede výsledek nebo automatické směrování, nebo když skončí čekání. **znovu se nespustí**, když zaměstnanec kartu ručně přetáhne do kroku nebo ji vrátí zpět, takže osoba nedostane stejný e-mail dvakrát.
:::

### Odesílání e-mailů

Zvolte **Odeslat e-mail**, vyberte jednu z vašich e-mailových šablon a volitelně napište vlastní předmět. Když karta vstoupí do kroku, osoba e-mail dostane automaticky. (Pokud osoba nemá uvedenou e-mailovou adresu, krok tuto akci jednoduše přeskočí.) [Slučovací pole](../settings/email-templates.md#merge-fields) v šabloně, například `{{firstName}}`, se doplní údaji dané osoby.

Když e-mail odejde, historie karty zaznamená **E-mail odeslán**. Pokud odeslat nelze -- například proto, že e-mail vaší církve ještě nebyl schválen nebo byl dosažen denní limit -- žádný záznam „E-mail odeslán“ se nepřidá.

:::info
E-maily pracovních postupů se odesílají až poté, co byla vaše církev schválena pro odesílání skupinových e-mailů, a počítají se do denního limitu e-mailů vaší církve. Viz [Zapnutí skupinových e-mailů pro vaši církev](../groups/group-members.md#turning-on-group-email-for-your-church). Akce **Odeslat e-mail** vás v editoru kroku upozorní, pokud se tyto e-maily neodešlou: *„E-mail vaší církve ještě nebyl schválen...“*, pokud schválení stále čeká, nebo *„E-mail vaší církve je pozastaven...“*, pokud se nedávné zprávy vrátily nebo byly označeny jako spam.
:::

### Zaznamenávání účasti

Zvolte **Zaznamenat účast** a klikněte na **Vybrat skupinu**, abyste zvolili skupinu, jejíž účast se má zaznamenat. Když akce proběhne, osoba se označí jako přítomná na probíhajícím termínu služby této skupiny -- stejně, jako kdyby se přihlásila. To je užitečné ve spojení se spouštěčem, který přidává lidi do pracovního postupu ve chvíli, kdy přicházejí, takže se počítají bez samostatného přihlášení.

- Účast se měří v okamžiku, kdy byla karta **vytvořena**, takže **Čekání** dříve v pracovním postupu ji neposune za konec služby.
- Počítají se pouze termíny služby, které mají den a čas začátku. Pokud v tom okamžiku neprobíhá žádný termín služby skupiny, nic se nezaznamená a historie karty uvede **Žádná naplánovaná služba neprobíhá -- účast nebyla zaznamenána**.
- Když se účast zaznamená, historie karty zobrazí **Účast zaznamenána** a za ní název skupiny. Opětovné spuštění akce pro stejnou službu osobu nepočítá dvakrát.

### Upozornění osoby

Zvolte **Upozornit osobu**, klikněte na **Vybrat osobu** a volitelně napište **Zprávu**. Když karta vstoupí do kroku, tato osoba dostane e-mail a upozornění B1 se jménem člověka na kartě, názvy pracovního postupu a kroku, vaší zprávou a odkazem na otevření karty. Použijte to, když chcete zaměstnance nebo vedoucího služby včas upozornit -- například *„Upozorni pastora, když někdo dosáhne kroku Pohovor o členství.“* Historie karty zaznamená **Upozorněn** a za ním jméno osoby.

### Odesílání textové zprávy

Zvolte **Odeslat textovou zprávu** a napište **Text zprávy** (až 1 600 znaků). Když karta vstoupí do kroku, osoba dostane tuto zprávu na svůj mobilní telefon. Chcete-li zprávu personalizovat, klikněte na štítek pod polem zprávy -- **Jméno**, **Příjmení**, **Zobrazované jméno** nebo **Název církve** -- a vložíte tak na místo kurzoru `{{firstName}}`, `{{lastName}}`, `{{displayName}}` nebo `{{churchName}}`. Každé z těchto polí se při odeslání zprávy doplní údaji dané osoby.

- Pokud osoba nemá uložené mobilní číslo, zpráva se neodešle a historie karty zaznamená **Text přeskočen: chybí mobilní telefon**.
- Pokud se osoba odhlásila, zpráva se neodešle a historie karty zaznamená **Text přeskočen: odhlášen**.
- Když se text odešle, historie karty zaznamená **Text odeslán**. Pokud odeslání selže -- například proto, že není připojen žádný poskytovatel SMS nebo vaší církvi došly kredity na SMS -- selhání se zapíše do historie karty a zbývající akce kroku se přesto provedou.

:::warning
Texty se odesílají prostřednictvím [poskytovatele SMS](../settings/church-settings.md#texting) vaší církve. Pokud není připojen žádný poskytovatel, editor akce upozorní *„Není nastaven žádný poskytovatel SMS“* a texty se neodešlou.
:::

### Čekání několik dní (postupné sekvence)

Akce **Čekat** podrží kartu po zadaný počet dní. Během čekání se karta zobrazuje jako **Odložená**. B1 kontroluje ukončená čekání každých 30 minut, takže se karta vrátí do hry nejpozději půl hodiny po skončení čekání. Až čekání skončí:

1. Proběhnou všechny **zbývající akce ve stejném kroku** -- takže můžete vytvořit postupnou sekvenci jako **Odeslat e-mail → Počkat 3 dny → Odeslat e-mail s připomenutím**.
2. Pokud má krok automatické směrování, karta pokračuje dál; jinak zůstane v kroku, aby ji osoba převzala.

:::tip
**Čekání** na samém začátku kroku je jednoduchý způsob, jak kartu „podržet“, než se objeví dobrovolníkovi -- například *Počkat 7 dní, pak se ozve koučink*.
:::

## Přidávání lidí jako karet

Lidi na nástěnku můžete dostat několika způsoby:

- **Z nástěnky** -- Klikněte na **Přidat kartu** ve spodní části sloupce kroku a vyberte osobu. Můžete také vybrat skupinu a každý člen této skupiny se přidá jako karta.
- **Z záznamu osoby** -- Na stránce osoby použijte **Přidat do pracovního postupu** a zařaďte ji do pracovního postupu.
- **Z vyhledávání lidí** -- Vyberte více osob a hromadnou akcí **Přidat do pracovního postupu** je přidejte všechny najednou.
- **Automaticky pomocí spouštěče** -- Přidávejte lidi, když se něco stane, například při odeslání formuláře nebo prvním daru (viz [Spouštěče](#triggers) níže).

Přidání člověka ručně nebo akcí kroku **Přidat do pracovního postupu** mu nikdy nedá druhou otevřenou kartu ve stejném pracovním postupu. Pokud už otevřenou kartu má, je přeskočen (při hromadném přidání dostanou nové karty jen lidé, kteří žádnou nemají). Jakmile je jeho karta uzavřena, můžete ho přidat znovu. Spouštěče se místo toho řídí vlastním nastavením **Pouze jednou na osobu**.

## Práce s nástěnkou

Otevřete pracovní postup a zobrazíte jeho nástěnku. Každá karta ukazuje jméno osoby, komu je přiřazena, a štítek termínu nebo stavu (**Po termínu** nebo **Odložená**). Sloupec kroku také zobrazuje malé odznaky pro automatické akce, které spouští, a poznámky k jeho směrování, takže máte přehled o tom, jak karty proudí.

- **Přesunutí karty** -- Přetáhněte kartu z jednoho sloupce do dalšího, jakmile osoba postoupí.
- **Otevření karty** -- Dvojklikem na kartu (nebo kliknutím na ni) otevřete její podrobný panel, kde můžete změnit krok, přiřadit ji jinak, přidat poznámky a projít si, co se již stalo.

Z panelu karty můžete:

- **Přiřadit** kartu jiné osobě nebo skupině.
- **Odložit** kartu na 1 den, 3 dny nebo 1 týden, aby se dočasně skryl její termín.
- **Vrátit** na předchozí krok nebo **Přeskočit** na další krok.
- **Připnout přiřazení** -- zachovat stejného vlastníka karty i při jejím přesunu mezi kroky. Ve výchozím nastavení se karta při přesunu do nového kroku přiřadí výchozímu řešiteli tohoto kroku; připnutím zůstane odpovědná současná osoba po celou dobu.
- **Dokončit** kartu, nebo zvolit tlačítko **Výsledek**, pokud je u kroku nastaven (viz [Směrování](#routing-cards-with-outcomes-and-conditions)).
- **Odebrat kartu** -- Odstraňte kartu z nástěnky bez jejího dokončení, například když byl někdo přidán omylem. Po potvrzení se karta uzavře a zmizí ze seznamů všech. Žádné výsledky, směrování ani akce kroku se nespustí a její historie se zachová se záznamem **Odebráno**. U [karty potvrzení služebního úkolu](#serving-assignment-confirmations) odebráním karty uzavřete žádost stejným způsobem.
- **Přidat poznámky** a prohlédnout si **Aktivitu** karty -- záznam automatických akcí, které proběhly (odeslané e-maily, čekání apod.), každá s datem a časem.

U karty týkající se osoby panel také zobrazuje mobilní telefon a e-mail této osoby jako odkazy, na které lze klepnout a zavolat či napsat, a odkaz **Zobrazit profil**, pokud máte oprávnění k zobrazení lidí. Osoba, které je karta přiřazena, vidí telefon a e-mail i bez přístupu k Lidem.

Poznámky se ukládají spolu s kartou. Každý, kdo může kartu otevřít -- včetně osoby nebo skupiny, které je přiřazena -- může poznámky číst a přidávat vlastní. Lidé, kteří kartu otevřít nemohou, jejich poznámky nevidí.

### Hromadné akce

Zaškrtněte políčka u více karet a jednejte s nimi společně. Chcete-li vybrat všechny karty v kroku najednou, zaškrtněte políčko **Vybrat vše** v záhlaví sloupce kroku; dalším zaškrtnutím výběr zrušíte. Objeví se panel nástrojů, který umožňuje pro všechny vybrané karty najednou **Dokončit**, **Odložit**, **Přiřadit** (změnit řešitele) nebo **Přesunout do…** jiného kroku.

## Směrování karet pomocí výsledků a podmínek

Směrování určuje, kam karta půjde, když krok opustí. Chcete-li nastavit dva druhy směrování, otevřete editor kroku.

### Tlačítka výsledků

Výsledky jsou tlačítka zobrazená v panelu karty, když kartu na daném kroku dokončujete. Místo jediného tlačítka **Dokončit** můžete nabídnout volby jako „Připojil se ke skupině“ nebo „Nemá zájem“. Každý výsledek může:

- Poslat kartu na **jiný krok** v tomto pracovním postupu,
- **Předat kartu** úplně jinému pracovnímu postupu, nebo
- **Uzavřít** kartu.

Díky tomu jedno rozhodnutí může osobu rozvětvit na různé cesty.

### Automatické směrování (podmíněné)

Automatické trasy posunou kartu dál **ve chvíli, kdy vstoupí do kroku** (a po dokončení jeho automatických akcí), aniž by na něco kdokoli klikl, pokud osoba splňuje sadu podmínek. Přidejte trasu, zvolte cílový krok a určete jednu nebo více **podmínek** (například kampus osoby, věk nebo stav členství). Textová pole lze porovnávat přesně nebo pomocí **obsahuje**, **začíná na** nebo **končí na**. Trasa bez podmínek platí pro všechny.

Podmínky s datem (Dnešní datum, Datum narození nebo Výročí) mohou porovnávat celé datum nebo jen jeho část -- den v týdnu, **Den v měsíci**, **Měsíc** nebo uplynulé roky. U data narození nebo výročí osoby nabízí **Den v měsíci** relativní volbu **Dnes**, takže podmínka jako *Datum narození · Den v měsíci = Dnes* odpovídá lidem, jejichž narozeniny připadají na dnešní den v měsíci. **Měsíc** nabízí **Předchozí měsíc**, **Aktuální měsíc** a **Příští měsíc**. Relativní hodnoty tohoto typu se počítají podle časového pásma vaší církve, takže odpovídají kalendářnímu dni vaší církve, a ne serveru.

Skupina podmínek **Dary** obsahuje **Ukončený pravidelný dárce**, který najde lidi, kteří dříve dávali pravidelně a pak přestali. Nastavte tři čísla: *Dal alespoň* **3** *z posledních* **12** *týdnů, pak nic v posledních* **3** *týdnech* (to jsou výchozí hodnoty). Týdny se počítají zpět od dneška podle časového pásma vaší církve a vrácený dar se nepočítá. Nejužitečnější je u [plánovaného spouštěče](#schedule-triggers) -- například týdenní pravidlo, které přidává dárce s ukončenými dary na nástěnku následné pastorační péče. Podmínka se dívá pouze na data darů, nikdy na částky, a karty ani upozornění částky nikdy nezobrazují. Protože tato volba odhaluje, kdo přestal dávat, zobrazí ji a může ji přidat, změnit nebo odebrat pouze ti, kdo mohou zobrazovat dary.

Pokud podmínky trasy z nějakého důvodu nelze vyhodnotit, trasa se považuje za neodpovídající. Karta zůstane v kroku (nebo se řídí jinou trasou, která odpovídá), místo aby uvízla.

:::info
Na nástěnce každý sloupec kroku zobrazuje malé poznámky popisující jeho směrování -- například popisek výsledku nebo „pokud odpovídá“ a za ním šipku k cílovému kroku nebo pracovnímu postupu.
:::

## Plně automatické kroky

Můžete nastavit, aby krok běžel zcela sám, bez něčí práce. Přiřaďte kroku jeho **automatické akce** a přidejte **automatickou trasu** (bez podmínek) směřující na další krok. Když karta vstoupí, akce proběhnou a trasa ji hned posune dál -- karta projde krokem přímo.

:::tip
Kombinujte to s **Čekáním**: *Odeslat uvítací e-mail → Počkat 3 dny → automaticky přejít na krok „Osobní hovor“.* E-mail i načasování se zvládnou za vás a dobrovolník kartu uvidí až ve chvíli, kdy je čas na osobní kontakt.
:::

## Spouštěče

Spouštěče přidávají lidi do pracovního postupu automaticky, když se něco stane, takže karty nikdy nemusíte přidávat ručně. Na nástěnce pracovního postupu klikněte na záložku **Spouštěče** a poté na **Přidat spouštěč**. Existují dva druhy:

### Události jako spouštěče

Spustí se, jakmile se záznam v B1 změní. Zvolte událost a volitelně přidejte **podmínky**, aby se přidali jen odpovídající lidé:

- **Osoba · Vytvořena / Aktualizována** -- např. přidat každého, jehož stav se změní na *Návštěvník* nebo *Host* (stav, který dostávají lidé, kteří se sami zaregistrují).
- **Dar · Vytvořen** -- např. přidat dar poprvé darující nebo vysoký dar do pracovního postupu poděkování (porovnat podle částky, fondu nebo způsobu platby).
- **Skupina · Člen se připojil** / **Skupina · Vytvořena**.
- **Formulář · Odeslán** -- přidat každého, kdo odešle vybraný formulář (skvělé pro kartu „Jsem nový“ nebo „Spojit se“).

### Plánované spouštěče

Běží pravidelně -- denně, týdně, měsíčně nebo ročně -- podle sady podmínek. Používejte je pro oslovování založené na čase, například *každého, kdo má dnes narozeniny* (Datum narození · Den v měsíci = **Dnes**, s měsícem odpovídajícím **Aktuálnímu měsíci**), nebo *měsíční* kontrolu. I bez volby **Pouze jednou na osobu** plánovaný spouštěč nepřidá stejného člověka znovu během jednoho opakovacího období (den, týden, měsíc nebo rok podle toho, jak často běží).

U libovolného spouštěče můžete také nastavit:

- **Počáteční krok**, na který nová karta dorazí (výchozí je první krok).
- **Pouze jednou na osobu** -- aby stejný člověk nebyl spouštěčem do pracovního postupu přidán dvakrát. Když je tato volba zapnutá, každý, kdo už na tomto pracovním postupu má kartu, je přeskočen.
  - **Přidat znovu po uzavření karty** -- zobrazí se, když je zapnuta volba **Pouze jednou na osobu**. Zaškrtněte ji, aby spouštěč mohl člověka přidat znovu, jakmile je jeho dřívější karta v tomto pracovním postupu uzavřena. Osoba nikdy nemá dvě otevřené karty v pracovním postupu současně. Použijte to pro věci, které se mohou stát opakovaně, například pro vracejícího se návštěvníka nebo roční proces.
- **Aktivní** -- zapnutí nebo vypnutí spouštěče bez jeho smazání.

:::tip
Spouštěč **Formulář · Odeslán** spojte se šablonou **Následná péče o nového návštěvníka** a vaše formulář „Karta spojení“ nebo „Jsem nový“ se promění v automatický postup následné péče.
:::

## Potvrzení služebních úkolů

Zvláštní druh pracovního postupu může sledovat [žádosti o službu](./plans.md#assigning-team-members), dokud každý dobrovolník nepřijme nebo neodmítne. Místo lidí každá karta na této nástěnce sleduje **jeden úkol** -- jednu osobu na jedné pozici v jednom plánu. Dvě role nebo dvě služby pro stejnou osobu mají oddělené karty. Jde o volitelnou funkci: u plánu se nic nemění, dokud v jeho nastavení nevyberete pracovní postup pro potvrzení.

### Nastavení

1. Na stránce Pracovní postupy klikněte na **Přidat pracovní postup** a zvolte šablonu **Potvrzení služebního úkolu**. (Nebo začněte s **Prázdným pracovním postupem** a nastavte jeho **Účel** na **Potvrzení služebního úkolu**.) Vytvoření ze šablony vyžaduje oprávnění k odesílání textových zpráv, protože obsahuje krok s textovou zprávou.
2. Projděte kroky. Šablona začíná takto:
   - **Odeslat žádost a čekat na odpověď** -- pošle žádost o službu e-mailem i textovou zprávou, počká 2 dny, pošle e-mail s připomenutím, počká ještě 1 den a poté kartu automaticky posune dál.
   - **Zavolat dobrovolníkovi kvůli nezodpovězené žádosti** -- krok, při kterém osoba zavolá dobrovolníkovi, s termínem za 1 den. U tohoto kroku nastavte **Výchozího řešitele**. Pokud žádný nemá, karta připadne vedoucímu služby, nebo týmu služby, pokud vedoucí není.
3. Upravte čekání, zprávy a kroky tak, aby odpovídaly vaší církvi.
4. Otevřete [nastavení plánu](./plans.md#plan-settings) a v části **Pracovní postup pro potvrzení** vyberte tento pracovní postup.

Tyto pracovní postupy místo akcí **Odeslat e-mail** a **Odeslat textovou zprávu** používají akci **Odeslat žádost o službu**. Zvolte **E-mail** nebo **Textová zpráva** a volitelně napište **Zprávu žádosti**. Žádost vždy obsahuje roli, plán, datum služby a odkaz pro odpověď; ve své zprávě můžete použít `{{planName}}`, `{{positionName}}` a `{{serviceDate}}`. Pokud zprávu necháte prázdnou, použije se výchozí žádost. Uplatní se nastavení upozornění dobrovolníků, jejich souhlas s textovými zprávami, váš poskytovatel SMS i schválení e-mailu vaší církve a každý přeskočený nebo zablokovaný pokus se zaznamená na kartě. Akce **Odeslat e-mail**, **Odeslat textovou zprávu** a **Přidat do pracovního postupu** na těchto nástěnkách nejsou dostupné.

Záložka **Spouštěče** u pracovního postupu pro potvrzení vysvětluje, jak se karty spouštějí, místo aby nabízela spouštěče, a tyto pracovní postupy se neobjevují v seznamech **Přidat do pracovního postupu** u lidí.

### Jak se karty spouštějí a uzavírají

- Karty začnou vznikat, když u zveřejněného plánu **upozorníte** dobrovolníky (viz [Upozornění dobrovolníků](./plan-validation.md#notifying-volunteers)). Každé nové, nezodpovězené přiřazení dostane jednu kartu. Uložení, zveřejnění, kopírování nebo automatické vyplnění plánu samo o sobě nikoho nekontaktuje a plány označené jako předběžné neodesílají nic.
- Dobrovolníci stále dostanou obvyklé upozornění v aplikaci. E-mailovou a textovou následnou péči zajišťuje pracovní postup.
- Když dobrovolník **přijme nebo odmítne**, jeho karta se automaticky uzavře spolu se všemi úkoly následné péče, které k ní patří.
- Panel karty zobrazuje pozici, datum služby a odkaz na plán. Místo **Dokončit** tlačítko zní **Zaznamenat provedenou následnou péči**. Kliknutím na něj zaznamenáte, že někdo provedl následnou péči, ale karta zůstane otevřená a přiřazená (zobrazeno jako **Čeká na odpověď**), dokud dobrovolník neodpoví nebo nevyprší termín pro odpověď.
- Termín pro odpověď je konec posledního termínu služby, ve kterém tým dané pozice slouží. Pokud plán žádné odpovídající časy nemá, je to konec dne služby. Pokud do té doby nikdo neodpověděl, karta se uzavře se stavem **Termín pro odpověď uplynul** a úkol **Zkontrolovat nezodpovězenou žádost o službu** připadne aktuálnímu vlastníkovi karty nebo vedoucímu služby, aby mohl někdo rozhodnout, jak místo obsadit. Přiřazení zůstane **Nepotvrzeno**.
- Odebrání přiřazení, změna jeho osoby, pozice nebo data plánu, vrácení plánu do předběžného stavu nebo přepnutí plánu na jiný pracovní postup pro potvrzení karta uzavře. Uzavřená karta se jiným **Upozorněním** nikdy neotevře znovu; pro odeslání nové žádosti přidejte nové přiřazení.

:::info
U žádostí odeslaných pracovním postupem pro potvrzení jdou [připomenutí dobrovolníkům](./plans.md#volunteer-reminders) pouze dobrovolníkům, kteří **přijali**, takže lidé čekající na odpověď nedostávají připomenutí navíc k následným krokům pracovního postupu.
:::

## Moje karty

Dobrovolníci a zaměstnanci nemusejí procházet všechny nástěnky, aby našli svou práci. Seznam **Moje karty** na stránce **Moje práce** zobrazuje všechny karty přiřazené aktuálnímu uživateli napříč všemi pracovními postupy. Dostanete se tam kliknutím na **Moje karty** nahoře na stránce Pracovní postupy nebo otevřením **Služba > Moje práce** v nabídce Jump menu. Kliknutím na kartu se její podrobný panel otevře přímo na stránce Moje práce, kde můžete s kartou pracovat nebo ji odebrat, aniž byste stránku opustili. Pokud můžete zobrazovat pracovní postupy, panel obsahuje také odkaz **Otevřít nástěnku pracovního postupu** na nástěnku, do které karta patří.

## Přehledy

Otevřete pracovní postup a kliknutím na **Přehledy** zobrazíte jeho analýzy:

- **Po termínu** -- počet karet, které překročily termín.
- **Karty podle kroku** -- kolik karet aktuálně leží v každém kroku, zobrazeno jako sloupcový graf.
- **Dokončeno (30 dní)** -- propustnost za posledních 30 dní, zobrazená jako spojnicový graf.

Používejte je k odhalení úzkých míst -- například kroku, kde se karty hromadí a nikdy nepostoupí.

## Související články

- [Úkoly](./tasks.md) -- jednotlivé akční položky, na kterých jsou karty pracovních postupů postaveny
- [Formuláře](../forms/index.md) -- vytvořte formuláře, které mohou spouštět pracovní postupy
- [Skupiny](../groups/index.md) -- skupiny, do kterých mohou akce „Přidat do skupiny“ umístit lidi
- [Plány služeb](./plans.md) -- vyberte pracovní postup pro potvrzení žádostí o službu v plánu
- [Role a oprávnění](../settings/roles-permissions.md) -- určete, kdo může pracovní postupy zobrazovat, upravovat a spravovat
