---
title: "Plánování kalendáře"
---

# Plánování kalendáře

<div class="article-intro">

Stránka **Kalendář** ve FreePlay Admin určuje, co každá skupina obrazovek přehrává a kdy. Přidejte plán pro playlist, plán bohoslužby nebo složku poskytovatele a nastavte, zda se bude opakovat každý týden, nebo se přehraje jednou. Když nic naplánováno není, přehrává se výchozí smyčka skupiny.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Vytvořte alespoň jednu skupinu obrazovek. Viz [Správa obrazovek a skupin](./managing-screens#screen-groups)
- [Vytvořte playlist](./building-playlists), nebo mějte v B1 Admin nastavený typ plánu

</div>

## Čtení kalendáře

1. Přejděte na **Kalendář**.
2. Vyberte skupinu obrazovek na kartách v horní části. Každá karta ukazuje, kolik plánů skupina má.
3. Týdenní zobrazení běží od pondělí do neděle, od 6:00 do 22:00. Červená čára označuje aktuální čas.
4. Šipkami se přepínáte na předchozí nebo následující týden, nebo kliknutím na **Dnes** se vrátíte na tento týden.

Podnadpis stránky ukazuje časové pásmo, které kalendář používá. Plány se řídí časovým pásmem vaší církve, které nastavujete v B1 Admin v části [Informace o církvi](../../b1-admin/settings/church-settings.md#time-zone). Pokud církev nemá nastavené časové pásmo, FreePlay použije časové pásmo vašeho sboru. Kalendář a vaše televizory používají stejné časové pásmo, takže blok umístěný na kalendáři na 9:00 se přehraje na obrazovce také v 9:00, i když je váš počítač nastaven na jiné časové pásmo.

Plány jsou barevně rozlišeny podle typu. Legenda vysvětluje barvy:

- **Výchozí smyčka** - Šrafované pozadí, zobrazené pod vším ostatním, pokud má skupina výchozí smyčku
- **Playlist**
- **Plán bohoslužby**
- **Složka poskytovatele**

Každý blok zobrazuje svůj název a vyšší bloky navíc ukazují časy, zda se opakuje (**týdně** nebo **jednou**) a co se stane, když skončí dříve.

## Nastavení výchozí smyčky

Výchozí smyčka se přehrává na obrazovkách skupiny vždy, když není nic naplánováno.

1. Na stránce **Kalendář** klikněte v záhlaví na **Výchozí smyčka…**. Pokud je výchozí smyčka již nastavena, tlačítko zobrazuje **Výchozí smyčka:** a za ním název playlistu.
2. Vyberte **Playlist**, nebo zvolte **Žádná — obrazovka se ztmaví**.
3. Klikněte na **Uložit**.

## Přidání plánu

Nový plán lze začít třemi způsoby:

- Klikněte na prázdné místo v kalendáři. Formulář se otevře s předvyplněným dnem a půlhodinou.
- Klikněte na **Přidat plán** v záhlaví.
- Zvolte **Přidat plán** z paletového menu (**Ctrl+K** nebo **⌘K**).

Poté vyplňte formulář:

1. **Přehrát** - Vyberte, co se má přehrát:
   - **Playlisty** - Libovolný playlist, který jste vytvořili
   - **Plány bohoslužeb** - Typ plánu z B1 Admin, označený **(aktuální plán)**. Obrazovka každý týden přehraje aktuální plán pro daný typ plánu, včetně lekcí Go Curriculum (i přizpůsobených), které používají přihlášení Go propojené s ministerstvem typu plánu
   - **Složka poskytovatele…** - Otevře **Vyberte složku poskytovatele**. Procházejte, dokud nenajdete složku, a klikněte na **Použít tuto složku**. Chcete-li později vybrat jinou složku, klikněte na **Změnit**
2. **Opakuje se** - Vyberte dny v týdnu, kdy se plán přehrává. Pro jedno konkrétní datum místo toho zapněte **Jednorázově** a vyberte **Datum**.
3. **Začátek** a **Konec** - Časy, kdy plán začíná a končí.
4. **Pokud skončí dříve** - Co udělat, když obsah dojde před časem konce:
   - **Smyčka do času konce** - Začne znovu od začátku. Vhodné pro smyčky signalizace, oznámení a odpočítávání
   - **Tempo učitele** - Snímky čekají na dálkové ovládání učitele. Lekce zůstane zobrazena i po čase konce, dokud se nedostane k poslednímu snímku
   - **Přehrát jednou, poté návrat k výchozí smyčce**
5. U opakujících se plánů nastavte **Začíná** na první datum. V části **Končí** vyberte **Nikdy**, nebo zvolte **K datu** a zadejte **Datum konce**.
6. Klikněte na **Uložit**.

:::info
**Tempo učitele** nahradilo starší možnost „podržet poslední snímek“. Plány uložené s touto možností nyní běží jako tempo učitele.
:::

## Úprava nebo smazání plánu

1. Klikněte na blok plánu v kalendáři.
2. Změňte libovolné pole a klikněte na **Uložit**, nebo klikněte na **Smazat** a plán odstraňte.

## Překrývající se plány

Pokud se dva plány překrývají, formulář zobrazí upozornění: **Překrývá se s jiným plánem. Vyhrává ten, který začíná později.** Zatímco běží pozdější plán, obrazovky přehrávají jeho obsah. Když skončí, vrátí se k dřívějšímu plánu, pokud ještě běží.

## Jak obrazovky přebírají změny

Spárované obrazovky stahují vše naplánované na dalších 7 dní a samy kontrolují změny. Po úpravě kalendáře se k televizoru nemusíte vracet. Chcete-li zjistit, zda má obrazovka vše potřebné, podívejte se na **Připraveno do** na [stránce Obrazovky](./managing-screens).

## Související články

- **[Vytváření playlistů](./building-playlists)** - Vytvořte playlisty, které plánujete
- **[Plánované přehrávání na televizoru](./scheduled-playback)** - Jak na televizoru fungují lekce v tempu učitele a dálkové ovládání
- **[Správa obrazovek a skupin](./managing-screens)** - Přidávejte skupiny a kontrolujte stahování každé obrazovky
- **[Zachování jen části každé lekce](/docs/b1-admin/serving/scheduling-lessons#keeping-only-part-of-every-lesson)** - Zkraťte každou naplánovanou lekci typu plánu na části, které vaše místnost přehrává
