---
title: "Výběr služby"
description: "Vyberte bohoslužbu, které se účastníte, na obrazovce služeb v B1 Checkin. Určí časy a skupiny zobrazené v dalších krocích check-inu."
---

# Výběr služby

<div class="article-intro">

Prvním krokem každého odbavení je výběr bohoslužby, které se účastníte. Obrazovka služeb se zobrazí hned po dokončení načítání aplikace a určuje, které časy služeb a skupiny budou dostupné pro zbytek procesu odbavení.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- [Přihlaste se](../getting-started/logging-in.md) do aplikace B1 Church Checkin a vyberte svůj sbor
- Ujistěte se, že správce vašeho sboru [nastavil služby a časy služeb](../../b1-admin/attendance/setup.md) v aplikaci B1 Admin

</div>

## Jak to funguje

1. Po přihlášení (nebo po automatickém přihlášení při dalších návštěvách) aplikace zobrazí **obrazovku služeb**.
2. Uvidíte seznam všech služeb nastavených pro váš sbor. Každá služba je zobrazena jako karta s názvem služby (například „Nedělní dopoledne“ nebo „Středeční večer“).
3. Klepněte na službu, které se účastníte.

Aplikace načte časy služeb a skupiny přiřazené k dané službě a poté vás přesune na [obrazovku vyhledání člena](./looking-up-members.md).

## Když odbavení není otevřené

Pokud váš správce přiřadil času služby [rozvrh odbavení](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), aplikace umožní rodinám vybrat tento čas služby pouze tehdy, je-li jeho okno pro odbavení otevřené. Časy služeb, jejichž okno je právě zavřené, se stále zobrazují na [obrazovce domácnosti](./household-review.md), ale jsou označeny **Uzavřeno** (například **Uzavřeno · otevírá ne 9:30**) namísto nabídky tlačítka skupiny.

Pokud jsou všechny časy služby, kterou jste klepli, uzavřené, aplikace vám sdělí, kdy se odbavení otevře – například **„Odbavení pro tuto službu se otevírá ne 9:30.“** (Pokud nelze zobrazit čas otevření, zobrazí se **„Odbavení pro tuto službu se právě neotevírá.“**) Klepněte na **Zpět** a vraťte se na seznam služeb a vyberte jinou službu, nebo počkejte, až se okno otevře, a zkuste to znovu.

:::info
Okna pro odbavení se řídí časovým pásmem kampusu dané služby. Pokud kampus nemá nastavené časové pásmo, použije se časové pásmo vašeho sboru. Pokud se čas služby zdá otevírat v nesprávnou hodinu, požádejte správce, aby zkontroloval časové pásmo v nastavení kampusu nebo sboru. Na obrazovce domácnosti kiosek také používá hodiny tabletu k otevírání a zavírání časů služeb, proto se ujistěte, že je tablet nastaven na správný čas a časové pásmo.
:::

:::info
Služby nastavuje správce vašeho sboru v aplikaci B1 Admin v sekci Účast. Pokud nevidíte službu, kterou očekáváte, požádejte správce, aby ověřil, že byla vytvořena v [nastavení účasti](../../b1-admin/attendance/setup.md).
:::

## Co se děje na pozadí

Když vyberete službu, aplikace ze serveru načte tři věci:

- **Časy služeb** pro danou službu (například jedna služba může mít časový slot v 9:00 a 11:00).
- **Skupiny** dostupné v každém čase služby (například Nursery, Preschool, Elementary).
- **Propojení skupin s časy služeb**, které určuje, které skupiny jsou dostupné v kterých časech.

Tato data se ukládají lokálně, aby byl zbytek procesu odbavení rychlý a svižný.

:::tip
Pokud má váš sbor nastavenou pouze jednu službu, stále ji musíte klepnout, abyste mohli pokračovat. Aplikace jednu službu automaticky nevybere.
:::

## Další krok

Po výběru služby [vyhledáte svou rodinu](./looking-up-members.md) podle telefonního čísla nebo jména.
