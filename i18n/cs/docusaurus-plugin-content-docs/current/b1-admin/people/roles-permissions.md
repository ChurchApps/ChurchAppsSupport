---
title: "Přiřazování rolí"
description: "Přiřaďte v B1 Admin role, aby zaměstnanci a dobrovolníci měli přístup jen k oblastem lidí, darů, docházky a skupin, které potřebují."
---

# Přiřazování rolí

<div class="article-intro">

B1 Admin používá systém oprávnění založený na rolích, který řídí, co může každý uživatel ve vašem týmu vidět a dělat. Přiřazováním rolí můžete zaměstnancům a dobrovolníkům dát přístup přesně k oblastem, které potřebují, a nic víc. Správná správa rolí chrání údaje vaší církve a zároveň umožňuje vašemu týmu pracovat efektivně.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete přístup **Domain Admin** nebo roli s oprávněním spravovat **Nastavení** v B1 Admin.
- Lidé, kterým chcete přiřadit role, už musí být ve vašem adresáři. Pokud je nejprve potřebujete přidat, podívejte se na [Přidávání osob](adding-people.md).

</div>

## Pochopení rolí

Role je sada oprávnění, kterou přiřadíte jednomu nebo více uživatelům. Můžete například vytvořit roli „Finanční tým“, která poskytuje přístup k [záznamům darů](../donations/recording-donations.md), nebo roli „Dobrovolník u odbavení“, která umožňuje pouze přístup k [funkcím docházky](../attendance/check-in.md).

Každá role řídí přístup ke konkrétním oblastem B1 Admin, včetně:

- **Osoby** – prohlížení a úpravy profilů členů. Sekce Poznámky u záznamu osoby vyžaduje oprávnění **Upravit osoby**. Samostatné oprávnění **Zobrazit důvěrné poznámky** řídí přístup k sekci Důvěrné poznámky (pro pastorační péči, osobní historii a podobné citlivé poznámky). Oprávnění **Zobrazit pouze jména osob** umožňuje někomu vyhledávat osoby podle jména (vidí pouze jméno, fotografii a stav členství), bez přístupu k úplnému adresáři. V kombinaci s oprávněním **Zobrazit docházku** nebo **Upravit docházku** může dobrovolník otevřít **Skupiny** a zobrazit seznamy tříd podle jmen. S oprávněním **Upravit docházku** může také [zaznamenávat docházku](../attendance/recording-attendance.md). Viz [Osoby – pouze jména](../settings/roles-permissions.md#people-names-only).
- **Dary** – správa příspěvků a finančních přehledů. **Zadávat dary** je užší možnost pro počítací týmy: umožňuje zadávat dary, ale pouze do [dávek](../donations/batches.md#who-can-change-a-batch), které jsou stále otevřené.
- **Docházka** – zaznamenávání a prohlížení údajů o docházce
- **Formuláře** – vytváření a správa [vlastních formulářů](../forms/creating-forms.md)
- **Skupiny** – správa [členství ve skupinách](../groups/group-members.md) a kalendářů
- **Nastavení** – konfigurace nastavení pro celou církev

:::warning
**Domain Admin** má plný přístup ke každé oblasti B1 Admin. Jeho oprávnění nelze upravit ani omezit. Tuto roli používejte pouze pro své hlavní administrátory.
:::

## Zobrazení a správa rolí

1. Otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole v levém horním rohu B1 Admin) a rozbalte **Nastavení**.
2. Klikněte na **Role**.
3. Zobrazí se seznam všech rolí nastavených pro vaši církev se sloupcem **Členové**, který ukazuje, kolik uživatelů je v každé roli.
4. Kliknutím na libovolnou roli zobrazíte její členy a oprávnění.

## Přidávání uživatelů do role

1. V nabídce Jump zvolte **Nastavení > Role**.
2. Klikněte na roli, do které chcete uživatele přidat.
3. V sekci **Členové** vyhledejte osobu podle jména.
4. Kliknutím na **Přidat** ji přiřadíte k roli.

Uživatel bude mít všechna oprávnění spojená s touto rolí při dalším přihlášení.

## Úprava oprávnění role

1. V nabídce Jump zvolte **Nastavení > Role**.
2. Klikněte na roli, kterou chcete upravit.
3. V sekci **Oprávnění** zaškrtněte nebo odškrtněte oblasti, ke kterým má mít role přístup. Každá skupina oprávnění ukazuje, kolik jejích oprávnění je zaškrtnuto (například **2 z 5**).
4. Každá změna se uloží, jakmile zaškrtnete nebo odškrtnete políčko.

:::tip
Řiďte se zásadou nejmenších potřebných oprávnění. Každé roli dejte pouze taková oprávnění, která skutečně potřebuje. Tím udržíte údaje v bezpečí a snížíte riziko náhodných změn.
:::

## Běžné příklady rolí

- **Kancelářští zaměstnanci** – přístup k Osobám, Darům, Docházce a Formulářům
- **Vedoucí skupin** – přístup pouze ke [Skupinám](../groups/creating-groups.md)
- **Dobrovolníci u odbavení** – oprávnění docházky **Checkin**, které potřebuje účet přihlášený na [kiosek pro odbavení](../attendance/check-in.md)
- **Finanční tým** – přístup k [Darům](../donations/recording-donations.md) a reportingu
- **Počítací tým** – **Zadávat dary** a **Zobrazit dary**, aby mohli dobrovolníci zapisovat sbírku do otevřených dávek, aniž by viděli přehledy darů

Podrobnější přehled oprávnění pro dary a osoby najdete v části [Role a oprávnění](../settings/roles-permissions.md).
