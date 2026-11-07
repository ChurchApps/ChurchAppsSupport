---
title: "Odobravanie zmian profilu"
description: "Przeglądaj i zatwierdzaj wnioski członków o zmianę profilu w B1 Admin oraz skonfiguruj Directory Approval Group, która je otrzymuje."
---

# Odobravanie zmian profilu

<div class="article-intro">

Ak vaša cirkev vyžaduje schválenie správcom pre aktualizácie profilu, členovia odosielajú svoje zmeny cez aplikáciu B1 Mobile a tieto žiadosti sa zobrazujú ako úlohy v B1 Admin. Tento návod vysvetľuje, ako ich skontrolovať a schváliť.

</div>

<div class="prereqs">
<h4>Pred začiatkom</h4>

- Musíte byť členom skupiny určenej ako **Skupina na schvaľovanie adresára** v sekcii **Mobile &rarr; Member portal**
- Ak nie je nakonfigurovaná žiadna skupina na schvaľovanie, zmeny profilu sa uplatnia okamžite bez kontroly

</div>

## Kde nájsť čakajúce žiadosti

Keď člen odošle zmenu profilu, zobrazí sa ako úloha priradená vašej schvaľovacej skupine. Nájdete ju na dvoch miestach:

**Z panela (vašej domovskej stránky):**
1. Prihláste sa do B1 Admin — panel sa načíta automaticky.
2. V sekcii **My tasks** kliknite na **All tasks**. (My tasks zobrazuje iba otvorené úlohy priradené priamo vám.)
3. Kliknite na záložku **Assigned to My Groups**. Všetky čakajúce žiadosti o zmenu profilu sa zobrazia tam.

**Zo sekcie Serving &rarr; My Work:**
1. Otvorte [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu B1 Admin) a rozbaľte **Serving**.
2. Kliknite na **My Work**.
3. V časti Tasks kliknite na záložku **Assigned to My Groups**.

## Kontrola a schválenie žiadosti

1. Kliknutím na úlohu **Profile Update** ju otvorte.
2. V časti **Requested Changes** uvidíte každé pole, ktoré člen chce aktualizovať, spolu s novou hodnotou, ktorú odoslal.
3. Skontrolujte zmeny.
4. Kliknutím na **Apply** schváľte a uložte zmeny do jeho profilu.

Úloha sa automaticky uzatvorí, akonáhle sa zmeny uplatnia.

## Nastavenie schvaľovacej skupiny

Ak vaša cirkev chce, aby zmeny profilu vyžadovali schválenie, najprv je potrebné nakonfigurovať skupinu na schvaľovanie adresára.

1. Otvorte Jump menu a rozbaľte **Mobile**.
2. Kliknite na **Member portal** (stránka „Portal settings“).
3. V časti **Directory Approval Group** vyberte skupinu, ktorej členovia majú kontrolovať žiadosti o zmenu profilu.
4. Kliknite na **Save**.

Každý člen tejto skupiny uvidí prichádzajúce žiadosti o zmenu profilu v časti **Assigned to My Groups** na svojom paneli.

Tá istá skupina na schvaľovanie adresára kontroluje aj **žiadosti o zrušenie účtu** — pozrite [Kontrola žiadostí o zrušenie účtu](./account-deletion.md).

:::tip
Uistite sa, že vaši schvaľovatelia sú skutočne členmi nakonfigurovanej skupiny — žiadosti uvidia iba členovia skupiny.
:::

## Súvisiace články

- [Správa vášho profilu](./managing-profile.md) — Úprava nastavení vášho vlastného účtu
- [Kontrola žiadostí o zrušenie účtu](./account-deletion.md) — Rovnaký postup kontroly v schvaľovacej skupine pre zrušenie účtu
- [Nastavenia B1 Mobile](../../b1-mobile/profile/editing-profile.md) — Čo členovia vidia pri odoslaní zmeny profilu
