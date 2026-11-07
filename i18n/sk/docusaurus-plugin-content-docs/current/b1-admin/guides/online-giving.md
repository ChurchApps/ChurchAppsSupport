---
title: "Sprievodca: Nastavenie online darovaní"
---

# Nastavenie online darovaní

<div class="article-intro">

Prejdite si všetko, čo je potrebné na prijímanie online darov vo vašom kostole — od vytvorenia darovacích fondov, cez pripojenie služby Stripe na spracovanie platieb, až po zdieľanie stránky darovania so zborom. Keď budete hotoví, členovia budú môcť dávať online cez vašu webovú stránku a mobilnú aplikáciu.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet B1 Admin s administrátorským prístupom — pozrite si [Roly a oprávnenia](../people/roles-permissions.md)
- Účet Stripe (ak ho potrebujete, môžete si ho bezplatne vytvoriť na [stripe.com](https://stripe.com))

</div>

## Krok 1: Vytvorenie darovacích fondov

Fondy sú kategórie, do ktorých môžu darcovia prispievať. Predtým, ako budete môcť prijímať dary, potrebujete aspoň jeden fond.

Podľa sprievodcu [Fondy](../donations/funds.md) nastavte svoje kategórie darovania:

1. Vytvorte si najbežnejšie fondy (napr. „Všeobecný fond", „Fond na stavbu", „Misie")
2. Správne označte fondy, ktorých dary sú odpočítateľné z dane — to ovplyvňuje výpisy darov na konci roka

:::tip
Ďalšie fondy môžete pridať kedykoľvek. Začnite s kategóriami darovania, ktoré sa najčastejšie využívajú.
:::

## Krok 2: Pripojenie služby Stripe

Stripe zabezpečuje spracovanie všetkých platieb. Pripojíte svoj účet Stripe k aplikácii B1 Admin, aby dary smerovali na váš bankový účet.

Podľa sprievodcu [Nastavenie online darovania](../donations/online-giving-setup.md) pripojte Stripe:

1. Prihláste sa do svojho panela Stripe a získajte zverejnený kľúč (Publishable Key) a tajný kľúč (Secret Key)
2. V aplikácii B1 Admin prejdite do Nastavení a zadajte oba kľúče

:::warning
Stripe zobrazí váš tajný kľúč (Secret Key) iba raz. Pred opustením panela Stripe ho skopírujte a uložte. Ak ho stratíte, budete musieť vygenerovať nový.
:::

## Krok 3: Pridanie stránky darovania na váš web

Sprístupnite darovanie pridaním stránky na darovanie na svoj web B1.

Podľa sprievodcov [Nastavenie online darovania](../donations/online-giving-setup.md) a [Správa stránok](../website/managing-pages.md) postupujte takto:

1. Pridajte záložku „Darovať" na svoju stránku B1.church
2. Vaša adresa URL pre darovanie bude: `https://yoursubdomain.b1.church/donate`
3. Členovia môžu darovať bez prihlásenia (verejná stránka), alebo sa prihlásiť, aby mali uložené platobné metódy a históriu darov

## Krok 4: Testovací dar

Predtým, ako informujete svoj zbor, overte, že všetko funguje.

1. Urobte malý testovací dar, aby ste overili celý postup od začiatku do konca
2. Skontrolujte, či sa dar zobrazuje v aplikácii B1 Admin v časti Dary

:::tip
Ak chcete overiť funkčnosť bez skutočných platieb, najprv použite testovací režim služby Stripe a až potom prepnite na ostrý režim, keď budete informovať svoj zbor.
:::

## Krok 5: Oznámenie zboru

Dajte vedieť, aby členovia vedeli, že môžu darovať online.

1. Zdieľajte adresu URL pre darovanie na svojej webovej stránke, v e-mailových newsletteroch, vo farských ohlasoch a na sociálnych sieťach
2. Členovia môžu darovať aj cez [aplikáciu B1 Mobile](../../b1-mobile/giving/) — funkcia darovania je v nej zabudovaná

:::info
Prihlásení členovia si môžu uložiť platobné metódy, nastaviť opakované dary a zobraziť si históriu darov. Funguje aj anonymné darovanie — prihlásenie nie je potrebné.
:::

## Krok 6: Priebežná správa

Udržiavajte záznamy o daroch aktuálne a počas celého roka generujte prehľady.

1. [Importujte transakcie zo Stripe](../donations/stripe-import.md) pravidelne (týždenne alebo mesačne), aby boli vaše záznamy aktuálne
2. [Zobrazte prehľady darov](../donations/donation-reports.md), aby ste sledovali trendy darovania a súčty podľa fondov
3. [Vygenerujte výpisy darov na konci roka](../donations/giving-statements.md) pre daňové účely vašich darcov

:::tip
Importujte transakcie zo Stripe aspoň raz mesačne, aby boli vaše záznamy aktuálne. Úplný postup na konci roka nájdete v sprievodcovi [Výročné správy](./year-end-reports.md).
:::

## Hotovo!

Váš kostol teraz prijíma online dary. Členovia môžu darovať cez vašu webovú stránku, aplikáciu B1 Mobile alebo na akomkoľvek zariadení s webovým prehliadačom. Všetky dary sa automaticky evidujú v aplikácii B1 Admin.

## Súvisiace články

- [Fondy](../donations/funds.md) — vytváranie a správa kategórií darovania
- [Dávky](../donations/batches.md) — usporiadanie darov do skupín
- [Zaznamenávanie darov](../donations/recording-donations.md) — manuálne zadanie hotovostných darov a darov šekom
- [Import zo Stripe](../donations/stripe-import.md) — načítanie online transakcií do aplikácie B1 Admin
- [Prehľady darov](../donations/donation-reports.md) — zobrazenie trendov a súčtov darovania
- [Výpisy darov](../donations/giving-statements.md) — generovanie daňových výpisov na konci roka
- [Darovanie (web)](../../b1-church/giving/making-donations.md) — skúsenosť členov s darovaním
- [Darovanie (mobil)](../../b1-mobile/giving/making-donations.md) — darovanie z mobilnej aplikácie
