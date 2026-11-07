---
title: "Vytváření skupin"
---

# Vytváření skupin

<div class="article-intro">

Vytvoření skupiny v B1 Admin je jednoduché. Nastavíte kategorii, pojmenujete skupinu a poté nakonfigurujete její nastavení. Skupiny vám pomohou uspořádat sbor do smysluplných celků, jako jsou malé skupiny, výbory a třídy.

</div>

## Školicí video

<YouTube id="uG93pXVreNo" title="Vytváření skupin a přidávání členů v B1" next="Žádosti o připojení ke skupině a kalendáře skupin v B1" nextUrl="/docs/b1-admin/groups/group-join-requests" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete aktivní účet B1 Admin s oprávněním spravovat skupiny. Pokud si nejste jisti svou úrovní přístupu, podívejte se na [Role a oprávnění](../people/roles-permissions.md).
- Rozhodněte se o struktuře kategorií pro své skupiny (například „Malé skupiny“, „Služby“, „Výbory“). Kategorie pomáhají udržet související skupiny uspořádané.

</div>

## Přidání nové skupiny

1. Otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu B1 Admin), rozbalte **People** a klikněte na **Groups**.
2. V záhlaví stránky klikněte na **Add Group**. Pod seznamem se otevře formulář **New Group**. Zadejte **Category Name**. Kategorie vám pomohou uspořádat související skupiny (například „Malé skupiny“, „Služby“ nebo „Výbory“). Pokud kategorie již existuje, můžete ji vybrat ze seznamu.
3. Zadejte **Name** skupiny.
4. Klikněte na **Add**. Vaše nová skupina se objeví v seznamu a její kategorie bude zobrazena pod jejím názvem.

## Nastavení skupiny

Jakmile je skupina vytvořena, můžete doplnit další podrobnosti:

1. Klikněte na **název skupiny** v seznamu, abyste ji otevřeli.
2. Klikněte na tlačítko **Edit** na levé straně stránky skupiny, pod podrobnostmi skupiny.
3. Nakonfigurujte následující možnosti:
   - **Description** -- Stručné shrnutí toho, čemu se skupina věnuje. Je viditelné pro členy.
   - **Meeting Times** -- Kdy se skupina obvykle schází (například „Středy v 19:00“).
   - **Join Policy** -- Vyberte, kdo se může k této skupině připojit:
     - **Open** -- Kdokoli se může připojit okamžitě bez schválení
     - **Request** -- Lidé musí odeslat žádost o připojení, která vyžaduje schválení (viz [Žádosti o připojení ke skupině](./group-join-requests.md))
     - **Closed** -- Členy musí ručně přidat vedoucí nebo administrátoři
   - **Labels** -- Přiřaďte skupině jeden nebo více popisných štítků (například „Osobně“, „Online“, „Noví členové vítáni“). Štítky jsou volné značky, které si definujete; zaškrtněte všechny, které platí. Štítky lze použít k filtrování skupin v prvku webu Groups Browser.
   - **Confidential group** -- Skryje tuto skupinu a její seznam členů před veřejnými stránkami, vyhledávačem skupin a osobami, které nejsou členy. Použijte to u citlivých skupin, jako jsou skupiny podpory při závislostech nebo poradenství; skupinu uvidí pouze její členové a zaměstnanci sboru.
   - **Discussions** -- Zapíná nebo vypíná chatový kanál skupiny, do kterého může přispívat kterýkoli člen. Ve výchozím nastavení zapnuto.
   - **Announcements** -- Zapíná druhý chatový kanál určený pouze pro vedoucí – členové jej mohou číst a reagovat na něj, ale příspěvky může psát pouze vedení. Ve výchozím nastavení zapnuto.
   - **Attendance Tracking** -- Zapněte, pokud chcete pro tuto skupinu zaznamenávat [docházku](../attendance/tracking-attendance.md).
   - **Service Times** -- Pokud je to relevantní, přiřaďte skupinu ke konkrétním časům bohoslužeb sboru. Podrobnosti o časech bohoslužeb najdete v části [Nastavení docházky](../attendance/setup.md).
4. Kliknutím na **Save** uložte změny.

:::tip
Jasný popis a čas schůzky pomohou členům vědět, co mohou očekávat, když se připojí ke skupině.
:::

:::info
Vypnutí obou možností Discussions a Announcements odstraní kartu Messages ze skupiny v portálu pro členy úplně. Vypnutí pouze jedné z nich skryje její kartu; členové budou přesunuti do kanálu, který zůstane zapnutý. Stávající zprávy se v obou případech zachovají -- přepínače řídí pouze odesílání nových příspěvků.
:::

## Duplikování skupiny

Začínáte novou sérii opakující se třídy nebo služby? Namísto opětovného zadávání všech nastavení duplikujte existující skupinu:

1. Otevřete skupinu a klikněte na **Duplicate** (pod tlačítkem **Edit** na levé straně stránky skupiny).
2. Potvrďte duplikování.

Kopie převezme nastavení původní skupiny -- kategorii, popis, čas a místo schůzky, způsob připojení, štítky a kampus -- ale **nikoli** její členy. Nová skupina dostane název původní skupiny s připojenou příponou „ (Copy)“; přejmenujte ji v nastavení skupiny.

## Archivace skupiny

Pokud skupina již není aktivní, ale chcete zachovat její historii namísto smazání:

1. Otevřete skupinu a klikněte na **Edit**, abyste upravili její nastavení.
2. Klikněte na **Archive** a potvrďte.

Archivované skupiny zmizí z hlavního seznamu skupin. Chcete-li ji znovu najít, klikněte na tlačítko **Show archived** vedle tlačítek kategorií v horní části stránky Groups a poté klikněte na **Restore** vedle skupiny, abyste ji obnovili.

:::info
Archivace skupiny neodstraní její členy, historii docházky ani události v kalendáři -- pouze skryje skupinu ze výchozího seznamu, dokud ji neobnovíte.
:::

## Další kroky

Po vytvoření a nastavení skupiny jste připraveni:

- **Přidat členy** -- Vyhledejte osoby a přidejte je do skupiny. Pomocí ikony hvězdičky (**Make Leader**) označte vedoucí skupiny. Viz [Členové skupiny](./group-members.md).
- **Nastavit kalendář** -- Vytvořte události a opakující se schůzky pro skupinu. Viz [Kalendář skupiny](./group-calendar.md).
- **Komunikovat** -- Posílejte zprávy všem členům skupiny přímo ze stránky skupiny.
- **Exportovat data** -- Kliknutím na **Export** nad seznamem členů skupiny jej stáhnete.

:::info
Každá skupina patří do kategorie a na hlavní stránce Groups můžete seznam filtrovat podle kategorie. Kategorie můžete kdykoli přeuspořádat nebo přejmenovat, jak váš sbor roste.
:::
