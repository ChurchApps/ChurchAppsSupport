---
title: "Hromadné úpravy osob"
---

# Hromadné úpravy osob

<div class="article-intro">
Hromadné úpravy vám umožňují aktualizovat více osob najednou, což šetří čas, když potřebujete stejnou změnu provést u mnoha lidí. V jediné operaci můžete změnit stav členství, rodinný stav, pohlaví, nastavení odhlášení z komunikace a členství ve skupinách.
</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění ke správě údajů o osobách. Podrobnosti najdete v článku [Role a oprávnění](./roles-permissions.md).
- Osoby, které chcete upravit, byste už měli mít přidané nebo naimportované. Pokud ne, podívejte se do článku [Přidávání osob](./adding-people.md).
</div>

## Výběr osob pro hromadnou úpravu

1. V aplikaci B1 Admin přejděte na **People**
2. Pomocí vyhledávání nebo filtrů najděte osoby, které chcete aktualizovat
3. Zaškrtněte políčka u osob, které chcete vybrat
   - V zobrazení **Households** se zaškrtnutím domácnosti vyberou všichni její členové
   - V zobrazení **Table** (přepínáte je přepínačem **View as**) můžete vybírat osoby jednotlivě
   - Nebo použijte zaškrtávací políčko nad seznamem a vyberte všechny viditelné osoby
4. Jakmile vyberete alespoň jednu osobu, lišta nad seznamem ukáže, kolik osob je vybráno, a zobrazí tlačítka **Clear Selection** a **Actions**

:::tip
Pokud potřebujete aktualizovat větší skupinu osob podle konkrétních kritérií, použijte funkci [AI Search](./ai-search.md) nebo filtry, abyste nejprve zúžili seznam, a poté vyberte všechny odpovídající osoby.
:::

## Dostupné hromadné akce

Nabídka **Actions** nabízí několik možností:

### Změna stavu členství

Aktualizujte stav členství u všech vybraných osob:

1. Klikněte na **Actions** → **Set Membership Status**
2. Vyberte nový stav:
   - **Visitor** -- Návštěvníci při první nebo příležitostné účasti
   - **Guest** -- Hosté, například rodiny registrované na check-in kiosku
   - **Regular Attendee** -- Pravidelní účastníci, kteří nejsou členy
   - **Member** -- Oficiální členové sboru
   - **Staff** -- Zaměstnanci sboru
   - **Inactive** -- Osoby, které již nenavštěvují sbor
   - **Deceased** -- Zesnulé osoby
3. Vyberte režim aktualizace:
   - **Overwrite all** -- Nahradí aktuální stav u všech vybraných osob
   - **Only update empty** -- Nastaví stav pouze osobám, které žádný nemají
4. Klikněte na **Update**

### Změna rodinného stavu

Hromadně aktualizujte rodinný stav:

1. Klikněte na **Actions** → **Set Marital Status**
2. Vyberte nový stav:
   - **Unknown**
   - **Single**
   - **Married**
   - **Divorced**
   - **Widowed**
3. Vyberte, zda přepsat stávající hodnoty, nebo aktualizovat pouze prázdná pole
4. Klikněte na **Update**

### Změna pohlaví

Aktualizujte údaje o pohlaví u více osob:

1. Klikněte na **Actions** → **Set Gender**
2. Vyberte hodnotu:
   - **Unspecified**
   - **Male**
   - **Female**
3. Zvolte režim aktualizace (přepsat vše, nebo pouze prázdné)
4. Klikněte na **Update**

### Změna nastavení odhlášení z komunikace

Určete, zda osoby odmítly komunikaci:

1. Klikněte na **Actions** → **Set Directory Opt-Out**
2. Vyberte:
   - **No** -- Povolit komunikaci (zrušit odhlášení)
   - **Yes** -- Zablokovat komunikaci (nastavit odhlášení)
3. Zvolte režim aktualizace
4. Klikněte na **Update**

:::warning
Při změně nastavení odhlášení buďte opatrní. Osoby, které se výslovně odhlásily, by neměly dostávat komunikaci, pokud k tomu znovu nedaly souhlas.
:::

### Nastavení vlastního pole

Nastavte hodnotu Ano/Ne u [vlastního pole](../settings/custom-fields.md) najednou pro všechny vybrané osoby:

1. Klikněte na **Actions** → **Set Custom Field**.
2. Vyberte vlastní pole typu Ano/Ne, které chcete nastavit.
3. Vyberte hodnotu (**Yes** nebo **No**), která se má použít.
4. Klikněte na **Update**.

:::info
Pro tuto hromadnou akci jsou dostupná pouze vlastní pole typu Ano/Ne. Pro nastavení jiných typů polí upravte každou osobu jednotlivě.
:::

### Přidání do skupiny

Přidejte všechny vybrané osoby do jedné nebo více skupin:

1. Klikněte na **Actions** → **Add to Group**
2. Vyhledejte a vyberte skupinu nebo skupiny, do kterých chcete osoby přidat
3. Můžete vybrat více skupin a přidat osoby do všech najednou
4. Klikněte na **Add to Groups**

Každá osoba bude přidána jako běžný člen vybrané skupiny. Později můžete jednotlivce v případě potřeby povýšit na vedoucí skupiny na stránce [Členové skupiny](../groups/group-members.md).

### Odebrání ze skupiny

Odeberte všechny vybrané osoby z jedné nebo více skupin:

1. Klikněte na **Actions** → **Remove from Group**
2. Vyhledejte a vyberte skupinu nebo skupiny, ze kterých chcete osoby odebrat
3. Můžete vybrat více skupin
4. Klikněte na **Remove from Groups**

:::info
Tato akce pouze odebere osoby z vybraných skupin. Jejich záznamy osob nesmaže.
:::

### Smazání osob

Trvale smažte vybrané osoby z databáze vašeho sboru:

1. Klikněte na **Actions** → **Delete**
2. Dialog **Delete Selected People** vás požádá o potvrzení počtu osob, které budou smazány
3. Klikněte na **Delete**

:::danger
Smazání osob je trvalé a nelze je vrátit zpět. Odstraní se všechny jejich údaje, včetně:
- Osobních údajů
- Členství ve skupinách
- Záznamů o účasti
- Historie darů
- Odeslaných formulářů

Tuto akci použijte pouze tehdy, pokud si jste naprosto jisti, že chcete tyto osoby z vašeho systému odstranit.
:::

## Výsledky hromadné úpravy

Po dokončení hromadné akce uvidíte souhrn, který zobrazuje:

- **Total selected** -- Kolik osob bylo do operace zahrnuto
- **Successfully updated** -- Kolik záznamů bylo změněno
- **Failed** -- Záznamy, které nebylo možné aktualizovat (pokud je to relevantní)
- **Unchanged** -- Záznamy, které nevyžadovaly změnu (například při režimu „only update empty“)

Pokud některé aktualizace selhaly, uvidíte podrobnosti o chybách s vysvětlením jejich příčiny.

## Doporučené postupy

- **Začněte v malém** -- Hromadné operace nejprve vyzkoušejte na několika záznamech, abyste se ujistili, že provádíte správné změny
- **Používejte filtry** -- Před výběrem osob seznam zúžte pomocí filtrů nebo AI vyhledávání, abyste aktualizovali jen správné lidi
- **Výběr si dvakrát zkontrolujte** -- Před použitím hromadných změn si prohlédněte vybrané osoby
- **Používejte režim „only update empty“** -- Pokud chcete doplnit chybějící údaje, aniž byste přepsali stávající informace
- **Zaznamenávejte důležité změny** -- Uchovávejte si poznámky o hromadných úpravách, abyste se k nim mohli později vrátit
- **Domluvte se s týmem** -- Dejte ostatním správcům vědět, když provádíte rozsáhlé hromadné změny

## Běžné případy použití

### Aktualizace nových členů

Po absolvování kurzu členství změňte stav všech účastníků na Member:

1. Vyhledejte osoby, které se kurzu zúčastnily
2. Vyberte je všechny
3. Použijte **Actions** → **Set Membership Status** → **Member**

### Organizace malých skupin

Přidejte více osob do nové malé skupiny:

1. Vyhledejte osoby, které chcete ve skupině mít
2. Vyberte je
3. Použijte **Actions** → **Add to Group** a vyberte malou skupinu

### Čištění dat

Doplňte chybějící rodinný stav u manželských párů:

1. Vyfiltrujte osoby, které jsou ženatí nebo vdané (podle informací o domácnosti)
2. Vyberte ty, u kterých je rodinný stav prázdný
3. Použijte **Actions** → **Set Marital Status** → **Married** → **Only update empty**

## Související články

- [Vyhledávání osob](./searching-people.md) -- Najděte osoby k úpravě
- [AI Search](./ai-search.md) -- Použijte přirozený jazyk k vyhledání konkrétních skupin osob
- [Členové skupiny](../groups/group-members.md) -- Správa členství ve skupinách
- [Export dat](./exporting-data.md) -- Před hromadnými změnami exportujte údaje o osobách
