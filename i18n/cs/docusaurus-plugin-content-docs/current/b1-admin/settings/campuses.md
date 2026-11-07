---
title: "Pobočky"
---

# Pobočky

<div class="article-intro">

Pokud se vaše církev schází na více než jednom místě, umožňují vám **pobočky** sledovat, ke které lokalitě patří každá osoba a každá skupina. Po nastavení se pobočky zobrazí jako volba v profilech osob, v nastavení docházky a v přehledu Demografie. Církve s více místy mohou v celé aplikaci B1 Admin filtrovat, vyhledávat a vytvářet přehledy podle poboček.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Ke správě poboček potřebujete oprávnění **Upravit nastavení církve**. Viz [Role a oprávnění](./roles-permissions.md).

</div>

## Otevření nastavení poboček

V aplikaci B1 Admin otevřete [nabídku Jump](../introduction.md#getting-around-with-the-jump-menu) (vyhledávací pole vlevo nahoře), zvolte **Nastavení > Nastavení** a v levém seznamu klikněte na **Pobočky**, čímž se posunete k sekci **Pobočky**. Můžete také přejít přímo na **/settings/campuses**. Uvidíte seznam všech nakonfigurovaných poboček s jejich názvem, umístěním a časovým pásmem.

## Přidání pobočky

1. Klikněte na **Přidat pobočku**.
2. Vyplňte údaje o pobočce:
   - **Název** *(povinné)* — zobrazovaný název, který se objevuje v celé aplikaci B1 Admin (například „Hlavní sbor“ nebo „Severní sbor“).
   - **Adresa** — ulice a číslo popisné pobočky (slouží pro informaci; nejde o hlavní adresu vaší církve z Nastavení církve).
   - **Město / Stát / PSČ** — umístění pobočky.
   - **Časové pásmo** — časové pásmo IANA pro tuto pobočku (například *Europe/Prague*). [Rozvrhy docházky](../attendance/setup.md#setting-a-check-in-schedule) pro bohoslužby na této pobočce se otevírají a zavírají v tomto časovém pásmu. Pokud je nastaveno na **Žádné**, použije se místo toho [časové pásmo](./church-settings.md#time-zone) vaší církve. Hodí se, když jsou pobočky v různých časových pásmech.
   - **Web** — volitelná adresa URL webových stránek této pobočky.
3. Klikněte na **Uložit**.

## Úprava pobočky

Klikněte na libovolný řádek pobočky v seznamu. Editor se otevře v panelu vpravo. Upravte pole a klikněte na **Uložit**.

## Smazání pobočky

Otevřete pobočku k úpravě a klikněte na **Smazat**. Budete požádáni o potvrzení. Smazáním pobočky neodstraníte osoby, které jsou k ní přiřazeny. Jejich pole pobočky se jen vyprázdní.

## Přiřazení osob k pobočce

Po vytvoření poboček může personál přiřadit osobu k pobočce z jejího profilu:

1. Otevřete záznam osoby v sekci **Lidé**.
2. Klikněte na **Upravit**.
3. V rozbalovacím seznamu **Pobočka** vyberte pobočku.
4. Klikněte na **Uložit**.

Pobočku můžete aktualizovat také hromadně ze stránky Lidé. Vyberte více osob, použijte **Hromadná úprava** a nastavte pole Pobočka všem najednou.

## Filtrování podle pobočky

Jakmile jsou pobočky nastavené, můžete v celé aplikaci B1 Admin filtrovat podle pobočky:

- **Vyhledávání osob** — přidejte podmínku Pobočka do rozšířeného vyhledávání, nebo načtěte [uložený seznam](../people/lists.md) omezený na určitou pobočku.
- **Demografie** — [přehled Demografie](../people/demographics.md) zobrazuje prstencový graf Pobočka, pokud má alespoň jedna osoba přiřazenou pobočku.
- **Nastavení docházky** — každý čas bohoslužby v Docházce lze přiřadit k pobočce.

:::tip
Církve s jediným místem konání nemusí pobočky nastavovat. Všechny funkce poboček jsou volitelné. Pokud žádné pobočky neexistují, pole a grafy týkající se poboček se jednoduše nezobrazí.
:::

## Související články

- [Nastavení církve](./church-settings.md) — hlavní adresa vaší církve a branding (odděleně od adres poboček)
- [Demografie](../people/demographics.md) — graf rozdělení podle poboček
- [Nastavení docházky](../attendance/setup.md) — propojení časů bohoslužeb s pobočkou
- [Hromadná úprava](../people/bulk-editing.md) — hromadné přiřazení pobočky více osobám
