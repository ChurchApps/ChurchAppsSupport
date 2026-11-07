---
title: "Oznámení"
description: "Přehrávání složky snímků na FreePlay TV jako smyčky pro oznámení v hale nebo před hodinou: vyberte složku poskytovatele a po skončení ji vypněte."
---

# Oznámení

<div class="article-intro">

FreePlay dokáže v cyklu přehrávat složku snímků s oznámeními na vaší televizi, například v předsálí nebo před začátkem hodiny. Vyberete složku z jednoho z připojených poskytovatelů obsahu, FreePlay stáhne její snímky do zařízení a v postranním panelu se objeví položka **Oznámení**, takže můžete cyklus spustit kdykoli.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- [Připojte poskytovatele obsahu](./connecting-providers.md), který obsahuje vaše snímky s oznámeními, například Dropbox nebo OneDrive
- Umístěte obrázky nebo videa, která chcete přehrávat v cyklu, do jedné složky u tohoto poskytovatele

</div>

## Výběr složky pro oznámení

1. Otevřete **Nastavení** dole v postranním panelu a vyberte **Poskytovatelé**
2. Vyberte připojeného poskytovatele, který obsahuje vaše snímky (má odznak **Připojeno**), a otevřete jeho **Nastavení poskytovatele**
3. Vyberte **Použít pro oznámení**
4. Otevře se procházeč **Vyberte složku oznámení**. Procházejte složky, dokud nenarazíte na tu se snímky, a pak vyberte tuto složku (nebo libovolný soubor uvnitř ní)
5. FreePlay stáhne snímky a vrátí vás do **Nastavení poskytovatele**, kde řádek nyní zní **Přehrávání v cyklu „*název složky*“ – staženo *počet* snímků**

Pro oznámení se najednou používá jen jedna složka. Výběr složky od jiného poskytovatele nahradí předchozí.

## Přehrávání oznámení

Jakmile jsou snímky staženy, objeví se položka **Oznámení** blízko horní části postranního panelu (pod položkou **Dnešní plán**, pokud ji vaše televize zobrazuje). Vyberte ji a cyklus se spustí.

- Obrázky zůstávají na obrazovce 15 sekund, pokud poskytovatel souboru nepřiřadil vlastní délku
- Videa se přehrají až do konce, než se přejde na další snímek
- Po posledním snímku cyklus začne znovu od prvního
- Pokud složka obsahuje jediné video, opakuje se na místě

Cyklus se přehrává ze souborů uložených v zařízení, takže běží i bez připojení k internetu. Můžete použít stejné ovládání dálkovým ovladačem jako u jakéhokoli jiného obsahu – viz [Přehrávání obsahu](./playing-content.md).

## Aktualizace snímků

FreePlay zkontroluje složku oznámení při každém spuštění aplikace, stáhne nové snímky a odstraní snímky, které byly ze složky smazány.

Chcete-li zkontrolovat ihned, otevřete **Nastavení poskytovatele** a vyberte **Zkontrolovat aktualizace oznámení**. Po dokončení se u řádku zobrazí **Aktuální** spolu s počtem snímků.

:::info
Pokud FreePlay nemůže poskytovatele kontaktovat nebo je složka prázdná, dál přehrává snímky, které již má. Chcete-li oznámení zcela vypnout, postupujte podle kroků níže.
:::

:::warning
Snímek, který byl nahrazen novou verzí pod stejným názvem souboru, se znovu nestahuje. Chcete-li snímek změnit, přidejte ho jako nový soubor a starý smažte.
:::

## Vypnutí oznámení

Otevřete **Nastavení poskytovatele** a znovu vyberte **Použít pro oznámení**. FreePlay přestane složku používat, smaže stažené snímky ze zařízení a odstraní položku **Oznámení** z postranního panelu.

Odpojení poskytovatele také vypne oznámení, která od něj pocházela.

## Související články

- **[Připojení k poskytovatelům](./connecting-providers.md)** – Připojte poskytovatele, který obsahuje vaše snímky
- **[Procházení a stahování obsahu](./browsing-content.md)** – Procházejte složky poskytovatele a přehrávejte obsah na vyžádání
- **[Přehrávání obsahu](./playing-content.md)** – Ovládání přehrávače pomocí dálkového ovladače televize
