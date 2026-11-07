---
title: "Dokončování check-inu"
description: "Zakończ zameldowanie rodziny na kiosku w B1 Checkin: limity sal, drukowanie etykiet, kody bezpieczeństwa przy odbiorze i to, co aplikacja robi dalej."
---

# Dokončování check-inu

<div class="article-intro">

Jakmile zkontrolujete svou domácnost a provedete případná přiřazení ke skupinám, jste připraveni check-in dokončit. Toto je poslední krok v pracovním postupu kiosku -- aplikace odešle docházku, vytiskne štítky a resetuje se pro další rodinu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- [Zkontrolujte svou domácnost](./household-review.md) na obrazovce kontroly domácnosti
- [Přiřaďte skupiny](./group-assignment.md) všem členům rodiny, kteří se mají přihlásit do konkrétní třídy nebo programu
- Volitelně [přidejte hosty](./adding-guests.md), kteří jsou s vaší rodinou na návštěvě

</div>

## Jak se přihlásit

1. Na **obrazovce kontroly domácnosti** klepněte na tlačítko **Check-in** ve spodní části obrazovky.
2. Aplikace odešle údaje o docházce na server a zobrazí **obrazovku úspěchu** se zeleným zaškrtnutím a uvítací zprávou.

To je vše. Docházka vaší rodiny byla zaznamenána.

## Plné místnosti a poměry dobrovolníků

Pokud má váš sbor na místnostech nastavené [bezpečnostní limity](../../b1-admin/attendance/checkin-safety.md), server je před uložením zkontroluje:

- Pokud je vybraná místnost **plná nebo uzavřená**, check-in neproběhne a aplikace název místnosti zobrazí, abyste mohli vybrat jinou.
- Pokud má termín bohoslužby [rozvrh check-inu](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) a jeho okno pro check-in právě není otevřené, check-in do místností tohoto termínu bohoslužby je rovněž odmítnut. Obrazovka **Zatím nelze přihlásit** uvádí místnost s důvodem „check-in právě není otevřený“; klepnutím na **Změnit místnosti** vyberte jiný termín bohoslužby nebo skupinu. (Termíny bohoslužeb, které jsou již uzavřené, jsou na [obrazovce domácnosti](./household-review.md) zobrazeny jako **Uzavřeno** a nelze je vybrat, takže tuto zprávu uvidíte obvykle jen tehdy, pokud okno skončí během přihlašování.)
- Domácnost, která se přihlásila na dřívější termín bohoslužby, se může vrátit později a přidat otevřený termín bohoslužby, a to i poté, co dřívější okno uzavřelo. Jejich stávající přihlášení zůstanou zachována a nebrání novému check-inu.
- Pokud je v dětské místnosti **nedostatek dobrovolníků** oproti stanovenému poměru, aplikace buď zobrazí upozornění, které může člen personálu potvrdit a pokračovat, nebo check-in zcela zablokuje -- podle toho, jak váš sbor nastavil vynucování poměrů.

## Tisk štítků

Pokud je nakonfigurována síťová tiskárna, aplikace po check-inu automaticky vytiskne štítky:

- **Jmenovky** se tisknou pro každou osobu přiřazenou do skupiny, u které je zapnuto nastavení **Tisknout jmenovku**. Jmenovka obsahuje jméno osoby, její přiřazení ke skupině a případné informace o alergiích nebo poznámky, pokud jsou k dispozici.
- **Lístky pro vyzvednutí rodiči** se tisknou, pokud je některá přihlášená osoba ve skupině s nastavením **Vyzvednutí rodiči**. Osoby přihlášené jako **Dobrovolník** se přeskakují, takže pečovatel, který slouží v místnosti pro vyzvednutí rodiči, lístek nedostane. Lístek pro vyzvednutí uvádí děti, jejich přiřazení ke skupinám a jedinečný **bezpečnostní kód o 4 znacích**.

:::info
Stejný bezpečnostní kód se objeví jak na jmenovce dítěte, tak na lístku pro vyzvednutí rodiče. Při vyzvedávání dobrovolníci kódy porovnají, aby ověřili, že každé dítě vyzvedává správný dospělý.
:::

Bezpečnostní kód se pro každý check-in generuje znovu a používá pouze souhlásky a číslice (samohlásky jsou vynechány, aby nevznikala nevhodná slova).

:::warning
Pokud se štítky netisknou, otevřete nastavení správce klepnutím na **logo sboru** sedmkrát a poté klepněte na **Změnit tiskárnu**, abyste ověřili připojení tiskárny. Kroky pro řešení potíží najdete v části [Nastavení tiskárny](../getting-started/printer-setup.md).
:::

## Co se děje po check-inu

- Pokud je tiskárna nakonfigurována, aplikace vytiskne všechny štítky a poté se automaticky vrátí na **obrazovku vyhledávání**, připravenou pro další rodinu.
- Pokud tiskárna nakonfigurována není, aplikace se rovněž automaticky vrátí na **obrazovku vyhledávání**.

V každém případě zůstane obrazovka úspěchu zobrazena alespoň 6 sekund od chvíle, kdy se objeví (8 sekund, pokud oslavuje milník docházky některé osoby), aby rodiny viděly, že check-in proběhl. Pokud tisk trvá déle, aplikace se vrátí přibližně o jeden a půl sekundy po dokončení tisku.

Nemusíte klepat na nic, abyste se vrátili na obrazovku vyhledávání -- aplikace přechod zvládne automaticky. Jakmile je obrazovka chvíli zobrazena, můžete na ni klepnout a vrátit se okamžitě; klepnutí v prvních jeden a půl sekundy je ignorováno, takže rychlé dvojité klepnutí na **Check-in** obrazovku nepřeskočí.

:::tip
Aplikace se po každém check-inu zcela resetuje, takže nehrozí, že by jedna rodina uviděla údaje jiné rodiny.
:::

## Co se zaznamenává

Když klepnete na **Check-in**, aplikace odešle na server pro každého člena domácnosti, který má přiřazenou skupinu, následující údaje:

- **osobu**, která se přihlašuje
- **bohoslužbu**, které se účastní
- **termín bohoslužby** a **skupinu**, ke kterým je přiřazena

Tyto údaje se zobrazují v aplikaci B1 Admin v sekci Docházka, kde správci vašeho sboru mohou docházkové záznamy prohlížet a spravovat. Podrobnosti najdete v [průvodci správou check-inu](../../b1-admin/attendance/check-in.md).
