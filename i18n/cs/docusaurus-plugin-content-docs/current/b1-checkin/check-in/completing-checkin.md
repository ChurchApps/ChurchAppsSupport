---
title: "Dokončení odbavení"
---

# Dokončení odbavení

<div class="article-intro">

Jakmile zkontrolujete svou domácnost a případně přiřadíte skupiny, jste připraveni odbavení dokončit. Toto je poslední krok v pracovním postupu kiosku: aplikace odešle docházku, vytiskne štítky a připraví se pro další rodinu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- [Zkontrolujte svou domácnost](./household-review) na obrazovce kontroly domácnosti
- [Přiřaďte skupiny](./group-assignment) všem členům rodiny, kteří se mají odbavit do konkrétní třídy nebo programu
- Volitelně [přidejte hosty](./adding-guests), kteří přicházejí s vaší rodinou

</div>

## Jak se odbavit

1. Na **obrazovce kontroly domácnosti** klepněte na tlačítko **Check-in** ve spodní části obrazovky.
2. Aplikace odešle data o docházce na server a zobrazí **obrazovku úspěchu** se zeleným fajfkou a uvítací zprávou.

To je vše. Docházka vaší rodiny byla zaznamenána.

## Plné místnosti a poměry dobrovolníků

Pokud váš sbor nastavil [bezpečnostní limity](../../b1-admin/attendance/checkin-safety) pro své místnosti, server je před uložením zkontroluje:

- Pokud je vybraná místnost **plná nebo uzavřená**, odbavení neproběhne a aplikace místnost pojmenuje, abyste mohli vybrat jinou.
- Pokud má časový termín bohoslužby [harmonogram odbavení](../../b1-admin/attendance/setup#setting-a-check-in-schedule) a jeho okno pro odbavení právě není otevřené, odbavení do místností tohoto časového termínu je také odmítnuto. Obrazovka **Can't check in yet** uvádí místnost s důvodem „odbavení právě není otevřeno“. Klepnutím na **Change Rooms** vyberete jiný časový termín nebo skupinu. (Časové termíny, které jsou již uzavřeny, se na [obrazovce domácnosti](./household-review) zobrazují jako **Closed** a nelze je vybrat, takže tuto situaci uvidíte obvykle jen tehdy, pokud okno skončí během odbavování.)
- Domácnost, která se odbavila na dřívější časový termín, se může vrátit později a přidat otevřený časový termín, i poté, co dřívější okno skončilo. Jejich stávající odbavení zůstanou zachována a nezpůsobí odmítnutí nového odbavení.
- Pokud dětská místnost **nemá dostatek dobrovolníků** podle svého poměru, aplikace buď zobrazí upozornění, které může člen personálu potvrdit a pokračovat, nebo odbavení zcela zablokuje. Záleží na tom, jak váš sbor nastavil vynucování poměrů.

## Tisk štítků

Pokud je nakonfigurována síťová tiskárna, aplikace po odbavení automaticky vytiskne štítky:

- **Jmenovky** se tisknou pro každou osobu, která je přiřazena do skupiny s povoleným nastavením **Print Nametag**. Jmenovky obsahují jméno osoby, její přiřazení ke skupině a informace o alergiích či poznámky, pokud jsou k dispozici.
- **Lístky pro vyzvednutí rodiči** (Parent pickup slips) se tisknou, pokud je některá odbavená osoba ve skupině s povoleným nastavením **Parent Pickup**. Osoby odbavené jako **Volunteer** se přeskakují, takže pracovník dětské péče, který slouží v místnosti pro vyzvedávání rodiči, lístek nedostane. Lístek uvádí děti, jejich přiřazení ke skupinám a jedinečný **4znakový bezpečnostní kód**.

:::info
Stejný bezpečnostní kód se objeví na jmenovce dítěte i na lístku pro vyzvednutí rodiče. Při vyzvedávání dobrovolníci kódy porovnají, aby ověřili, že dítě vyzvedává správný dospělý.
:::

Bezpečnostní kód se vygeneruje znovu pro každé odbavení a používá pouze souhlásky a číslice. Samohlásky jsou vynechány, aby nevznikala nevhodná slova.

:::warning
Pokud se štítky netisknou, otevřete nastavení správce klepnutím na **logo sboru** sedmkrát a poté klepněte na **Change Printer**, abyste ověřili připojení tiskárny. Postup při řešení problémů najdete v části [Nastavení tiskárny](../getting-started/printer-setup).
:::

## Co se stane po odbavení

- Pokud je tiskárna nakonfigurována, aplikace vytiskne všechny štítky a poté se automaticky vrátí na **obrazovku vyhledávání**, připravenou pro další rodinu.
- Pokud tiskárna nakonfigurována není, aplikace se rovněž automaticky vrátí na **obrazovku vyhledávání**.

V každém případě zůstane obrazovka úspěchu zobrazena alespoň 6 sekund od chvíle, kdy se objeví (8 sekund, pokud slaví něčí milník docházky), aby rodiny viděly, že odbavení proběhlo. Pokud tisk trvá déle, aplikace se vrátí přibližně o jeden a půl sekundy po dokončení tisku.

Nemusíte nic klepat, abyste se vrátili na obrazovku vyhledávání, aplikace přechod zvládne automaticky. Jakmile je obrazovka chvíli zobrazena, můžete na ni klepnout a vrátit se okamžitě. Klepnutí během prvních jedné a půl sekundy se ignoruje, takže rychlé dvojité klepnutí na **Check-in** obrazovku nepřeskočí.

:::tip
Aplikace se po každém odbavení kompletně resetuje, takže nehrozí, že by jedna rodina uviděla údaje jiné rodiny.
:::

## Co se zaznamenává

Když klepnete na **Check-in**, aplikace odešle serveru pro každého člena domácnosti, který má přiřazenou skupinu, následující údaje:

- **osobu**, která se odbavuje
- **službu**, kterou navštěvuje
- **časový termín** a **skupinu**, do kterých je přiřazena

Tyto údaje se zobrazí v B1 Admin v sekci **Attendance**, kde správci vašeho sboru mohou prohlížet a spravovat záznamy docházky. Podrobnosti najdete v [průvodci správou odbavení](../../b1-admin/attendance/check-in.md).
