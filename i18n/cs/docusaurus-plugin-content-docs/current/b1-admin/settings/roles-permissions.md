---
title: "Role a oprávnění"
---

# Role a oprávnění

<div class="article-intro">

Role vám umožňují řídit, k čemu mají různí uživatelé přístup ve vašem účtu ChurchApps. Můžete vytvářet vlastní role pro zaměstnance, dobrovolníky a další členy týmu, každou s vlastní úrovní přístupu, aby vaše data zůstala v bezpečí.

</div>

## Video s návodem

<YouTube id="ZzCIkinVMnE" title="Role, oprávnění a pozvání týmu v B1" next="Nastavení bohoslužeb a docházky v B1" nextUrl="/docs/b1-admin/attendance/setup" />

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete přístup Domain Admin nebo roli s oprávněním spravovat role
- Mějte připravený seznam členů týmu a oblastí, ke kterým potřebují přístup
- Před začátkem si prohlédněte dostupné kategorie oprávnění níže a naplánujte své role

</div>

## Přístup k rolím

1. V B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře) a rozbalte **Nastavení**.
2. Klikněte na **Role**.
3. Stránka Role zobrazuje všechny aktuálně definované role pro váš sbor. Sloupec **Členové** ukazuje, kolik uživatelů je v jednotlivých rolích, a řádek **(Všichni)** zobrazuje **Všichni uživatelé**.

## Přehled stránky Role

Stránka Role je rozdělena na dva panely:

- **Levá strana** -- Zobrazuje seznam členů přiřazených k vybrané roli.
- **Pravá strana** -- Zobrazuje nastavení oprávnění, které můžete pro danou roli nakonfigurovat.

Klikněte na název libovolné role a zobrazte si její členy a oprávnění nebo je spravujte.

## Přidání uživatelů do role

1. Vyberte roli, do které chcete přidat členy.
2. Pomocí **vyhledávacího pole** vlevo najděte osobu, kterou chcete přidat.
3. Vyberte osobu z výsledků hledání.
4. Bude okamžitě přidána do role.

## Odebrání uživatelů z role

1. Vyberte roli, ve které je uživatel, kterého chcete odebrat.
2. V seznamu členů vlevo najděte danou osobu.
3. Klikněte na **tlačítko odebrat** vedle jejího jména.

## Nastavení oprávnění

Každá role může mít přístup ke konkrétním oblastem B1 Admin. V panelu **Upravit oprávnění** jsou oprávnění seskupena do sekcí, které můžete rozbalit, například **Docházka**, **Obsah**, **Dary**, **Formuláře a plány**, **Lekce**, **Zprávy**, **Lidé a skupiny** a **Úkoly**. Do pole **Filtrovat oprávnění** můžete psát a zobrazit tak pouze odpovídající oprávnění.

Zaškrtnutím nebo odškrtnutím oprávnění roli přidělíte nebo odeberete. Nadpis každé sekce ukazuje, kolik oprávnění z ní má role, například **2 z 5**, a počet se aktualizuje, jak zaškrtáváte a odškrtáváte políčka.

### Oprávnění pro dary

Sekce **Dary** obsahuje tato oprávnění:

- **Zobrazit souhrny darů** -- vidět sekci Dary, včetně stránek Souhrn, Dávky, Fondy, Kampaně a Výpisy darů.
- **Zobrazit dary** -- vidět jednotlivé dary, například příspěvky uvnitř dávky.
- **Upravovat dary** -- plná kontrola: přidávat, upravovat a mazat dary a dávky a [uzavírat a znovu otevírat dávky](../donations/batches.md#closing-and-reopening-a-batch).
- **Zadávat dary** -- přidávat dávky a zadávat, upravovat nebo mazat dary, ale pouze v dávkách, které jsou stále otevřené. Lidé pouze s tímto oprávněním nemohou mazat dávky, uzavírat je nebo znovu otevírat ani měnit dary, které přišly prostřednictvím online darování.
- **Upravovat nastavení** -- spravovat nastavení darů.

Osoba s oprávněním **Zadávat dary**, ale bez oprávnění **Zobrazit souhrny darů**, vidí v sekci **Dary** pouze stránku **Dávky**. Počítací tým proto přiřaďte roli s oprávněními **Zadávat dary** i **Zobrazit dary**, aby mohl otevřít dávku a vidět dary, které zadal. Podrobnosti najdete v části [Kdo může měnit dávku](../donations/batches.md#who-can-change-a-batch).

### Pouze jména osob

Sekce **Lidé a skupiny** obsahuje oprávnění **Zobrazit pouze jména osob**. Použijte ho pro dobrovolníky, kteří potřebují vyhledávat lidi podle jména -- například když vybírají osobu ve vyhledávacím poli -- bez přístupu k úplnému adresáři. Samotné toto oprávnění znamená, že daná osoba:

- Může vyhledávat lidi podle jména a vidět seznam nedávno přidaných osob, ale vidí pouze jméno, fotografii a stav členství každé osoby
- Nemůže vyhledávat podle e-mailu, zobrazit kontaktní údaje ani otevřít adresář **Lidé**

Oprávnění **Zobrazit pouze jména osob** kombinujte s oprávněním **Zobrazit docházku** nebo **Upravovat docházku** u dobrovolníků, kteří vedou docházku ve třídách. Položka **Lidé** v jejich nabídce pak otevírá **Skupiny**, kde mohou otevřít seznam **Všechny skupiny** a vidět jména členů každé třídy a její schůzky. S oprávněním **Upravovat docházku** mohou také [zaznamenávat docházku](../attendance/recording-attendance.md) a přidávat návštěvníky vyhledáním jejich jmen. Jména nejsou odkazy na záznamy osob a utajené skupiny zůstávají skryté, pokud dobrovolník není členem.

B1 Admin skrývá odkazy a tlačítka, které vyžadují oprávnění, jež role nemá. Například seznam **Všechny skupiny** je dostupný pouze lidem, kteří mohou upravovat skupiny, zobrazovat členy skupin nebo zobrazovat lidi, nebo lidem s oprávněním **Zobrazit pouze jména osob** společně s **Zobrazit docházku** nebo **Upravovat docházku** (ostatní jsou přesměrováni na Přehled). Nastavení docházky se zobrazí pouze s oprávněním **Upravovat bohoslužby**. Tlačítko **E-mail** u skupiny se zobrazí jen osobám s oprávněním **Upravovat členy skupiny** (potřebným k odesílání e-mailů skupině). Tisk seznamu skupiny vyžaduje oprávnění **Zobrazit členy skupiny** nebo to, že vedete danou skupinu. Smazání události v kalendáři vyžaduje oprávnění **Upravovat obsah** (nebo stažení vlastní čekající žádosti).

### Účty pro kiosek příchodu

Účet, který se přihlašuje do kiosku [B1 Checkin](../../b1-checkin/getting-started/logging-in.md), potřebuje oprávnění **Checkin** v sekci **Docházka** (nebo **Upravovat docházku**). Samotné oprávnění **Checkin** umožňuje kiosku vyhledávat rodiny podle jména nebo telefonu, přihlašovat a odhlašovat je a zobrazovat, kdo smí dítě vyzvednout, aniž by měl přístup k adresáři lidí.

Oprávnění Checkin už není přiřazováno přes řádek **(Všichni)**. Členství v roli s jinými oprávněními neumožňuje někomu kiosek ovládat; přidejte oprávnění **Checkin** k roli, například „Dobrovolníci pro příchod“, a účty kiosku do ní zařaďte.

:::warning
**Domain Admins** mají plný přístup ke všem oblastem vašeho účtu ChurchApps. Jejich oprávnění nelze upravit ani omezit. Tuto roli používejte pouze pro své nejdůvěryhodnější správce.
:::

:::tip
Vytvářejte specifické role, například „Pokladník“ pouze s přístupem k **Dary**, „Počítací tým“ s oprávněními **Zadávat dary** a **Zobrazit dary**, nebo „Dobrovolník pro příchod“ pouze s přístupem k **Docházce**. Tím dodržíte zásadu nejmenších potřebných oprávnění a udržíte svá data v bezpečí. Více o tom, jak ChurchApps chrání vaše informace, najdete v části [Zabezpečení dat](./data-security.md).
:::
