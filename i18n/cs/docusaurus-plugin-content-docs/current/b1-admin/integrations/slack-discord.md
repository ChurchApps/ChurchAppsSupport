---
title: "Slack a Discord"
description: "Posílejte události B1 Admin, například nové lidi, dary a odeslané formuláře, do kanálu Slack nebo Discord přes příchozí webhook, bez Zapier."
---

# Slack a Discord

<div class="article-intro">

Posílejte přehledná oznámení z B1 přímo do kanálu Slack nebo Discord: nové osoby, dary, přihlášky do skupin, odeslané formuláře, události v kalendáři a další. Nepotřebujete účet třetí strany ani Zap, který byste museli udržovat. B1 přetvoří události na zprávy do chatu a odešle je přímo na webhook URL kanálu.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Potřebujete oprávnění **Upravit nastavení** v B1Admin
- Potřebujete správce ve vašem pracovním prostoru Slack nebo na serveru Discord, který vytvoří příchozí webhook pro kanál
- Rozhodněte, do kterého kanálu chcete oznámení posílat (pro více typů událostí můžete použít jeden kanál, nebo je rozdělit do více kanálů)

</div>

## Jak to funguje

B1 má vestavěný **typ konektoru** pro chatové platformy. Když vytvoříte webhook s typem **Slack** nebo **Discord**, webhook engine dál zajišťuje obvyklé doručení, opakování pokusů a podepisování hlaviček. Tělo odesílané zprávy ale přetvoří z běžné obálky B1 `{event,churchId,data}` na jednoduchou zprávu `{text}` (Slack) nebo `{content}` (Discord), kterou tyto služby očekávají.

Kromě stávajícího toku odchozích webhooků nekontaktují servery B1 Slack pro jednotlivé církve. Nic nového se tedy nehostuje a nic dalšího se neplatí.

## Slack krok za krokem

### 1. Získejte příchozí webhook URL pro Slack

1. Otevřete [api.slack.com/apps](https://api.slack.com/apps) v pracovním prostoru Slack, do kterého chcete oznámení posílat.
2. Klikněte na **Create New App → From scratch**, pojmenujte aplikaci něco jako „B1 Notifications“ a vyberte pracovní prostor.
3. V levé navigaci zvolte **Incoming Webhooks** a přepněte **Activate Incoming Webhooks** na *On*.
4. Klikněte na **Add New Webhook to Workspace**, vyberte kanál (např. `#donations`) a potvrďte tlačítkem **Allow**.
5. Slack vás vrátí na stránku s novou **Webhook URL**, která vypadá například takto: `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Zkopírujte ji. Je to jediný údaj, který B1 potřebuje.

:::caution
Zacházejte s webhook URL pro Slack jako s tajným údajem. Kdokoli, kdo ji má, může do kanálu posílat libovolné zprávy. Pokud ji náhodou prozradíte, vygenerujte ji znovu na stránce aplikace Slack. Regenerace pouze změní URL, takže ji pak musíte aktualizovat i v B1.
:::

### 2. Připojte ji v B1Admin

1. V B1Admin přejděte do **Nastavení → Vývojář → Webhooky**.
2. Klikněte na **Nový webhook**.
3. Vyplňte:
   - **Název**: něco srozumitelného, například „Dary → #donations“. Uvidí to jen váš tým.
   - **Typ konektoru**: zvolte **Slack**.
   - **URL datového přenosu** (Payload URL): vložte Slack URL z kroku 1.
   - **Události**: zaškrtněte události, které chcete posílat jako zprávy. Pro kanál darů stačí `donation.created`. Pro kanál #people zkuste `person.created` a `group.member.added`.
4. Klikněte na **Uložit**. Objeví se dialog „Podepisovací tajemství“ (Signing Secret). Pro Slack ho můžete ignorovat, protože Slack podpisy B1 neověřuje. Zavřete ho.

### 3. Otestujte to

Otevřete webhook znovu ze seznamu a klikněte na **Odeslat testovací událost**. Během jedné nebo dvou sekund se ve vašem kanálu Slack objeví zpráva podobná této:

> 💝 Nový dar: 50,00 $

Na stejné obrazovce se v tabulce **Nedávná doručení** objeví nový řádek se stavem `succeeded`. Hotovo.

## Discord krok za krokem

### 1. Získejte webhook URL pro Discord

1. Na svém serveru Discord najeďte myší na kanál, do kterého chcete oznámení posílat, a klikněte na **⚙ ozubené kolečko** (Edit Channel).
2. Otevřete **Integrations → Webhooks → New Webhook**.
3. Dejte mu název a případně avatar, pak klikněte na **Copy Webhook URL**. URL vypadá například takto: `https://discord.com/api/webhooks/123…/abc…`.

### 2. Připojte ji v B1Admin

Postup je stejný jako u Slacku výše, až na to, že **Typ konektoru** nastavíte na **Discord**. URL z Discordu vložte do pole **URL datového přenosu** a uložte.

:::tip
Na konec URL Discordu **nemusíte** přidávat `/slack`. B1 posílá nativní `{content}` payloady Discordu, nikoli payloady kompatibilní se Slackem. Stačí vložit URL, kterou vám Discord poskytl.
:::

### 3. Otestujte to

Použijte stejné tlačítko **Odeslat testovací událost**. Discord zobrazí zprávu ve zvoleném kanálu a v protokolu doručení se stav změní na `succeeded`.

## Jak vypadají zprávy

| Událost | Příklad zprávy |
|---|---|
| `person.created` | 👤 Přidána nová osoba: Jordan Rivera |
| `person.updated` | 👤 Osoba aktualizována: Jordan Rivera |
| `group.created` | 👥 Vytvořena nová skupina: Úterní biblická studie |
| `group.member.added` | ➕ Někdo byl přidán do skupiny |
| `donation.created` | 💝 Nový dar: 50,00 $ |
| `donation.updated` | 💝 Dar aktualizován: 75,00 $ |
| `attendance.recorded` | ✅ Docházka zaznamenána |
| `form.submission.created` | 📝 Přijato nové odeslání formuláře |
| `event.created` | 📅 Nová událost: Velikonoční bohoslužba |

Úplný seznam najdete v [katalogu událostí webhooků](/docs/developer/api/webhooks#event-catalog). Kteroukoli událost z něj lze směrovat do Slacku nebo Discordu.

## Jeden kanál pro každé téma

Nemusíte všechny události posílat na jedno místo. Většina církví nastaví několik webhooků:

- Kanál **#donations**, který poslouchá pouze `donation.created`
- Kanál **#new-people** pro `person.created` a `group.member.added`
- Kanál **#admin-alerts** pro méně časté události, například `form.submission.created`

Počet webhooků pro jednu církev není omezen. Každý z nich je nezávislý. Smazání nebo deaktivace jednoho neovlivní ostatní.

## Kontrola doručení

Tabulka **Nedávná doručení** v editoru webhooku zobrazuje posledních 50 pokusů. Kliknutím na řádek zobrazíte přesný odeslaný payload a odpověď, která přišla zpět. U konektoru Slack je payload `{"text":"💝 Nový dar: 50,00 $"}`, a ne běžná obálka `{event,churchId,...}`, protože ji B1 před odesláním přetvoří.

Pokud něco selhalo (červený odznak `failed` nebo `exhausted`), dialog zobrazí stavový kód HTTP a tělo odpovědi. Uvidíte tak přesně, co Slack nebo Discord odmítl. Obvykle je příčinou chyba při kopírování URL.

## Řešení potíží

- **Zpráva se neobjeví a stav doručení je `400`**: obvykle je typ konektoru nastaven na **Standard**, ale URL patří Slacku nebo Discordu. Slack a Discord surovou obálku odmítnou. Přepněte rozbalovací nabídku na **Slack** nebo **Discord** a odešlete testovací událost znovu.
- **Webhook se sám vypnul**: po třech po sobě jdoucích neúspěšných doručeních B1 webhook vypne. Opravte URL (nebo ji na Slacku či Discordu znovu vygenerujte) a znovu zapněte přepínač **Aktivní**.
- **Zpráva dorazila, ale chybí v ní podrobnosti**: každá chatová platforma omezuje velikost zprávy. Zprávy z B1 jsou záměrně jednořádkové. Pro bohatší oznámení použijte [Zapier](./zapier.md) nebo [Make](./make.md), které pomocí svých akcí pro Slack sestaví úplnější zprávu.

## Pozdější změna typu konektoru

Typ konektoru u existujícího webhooku můžete kdykoli změnit. Projeví se při dalším doručení. Pokud přepnete ze Slacku na Standard, nasměrujte URL na svůj vlastní HTTPS endpoint. Stejné podepisovací tajemství (vydané při vytvoření webhooku) pak půjde ověřovat na surové obálce.

## Viz také

- [Zapier](./zapier.md): pro vícekrokové pracovní postupy spouštěné událostmi z B1
- [Make](./make.md): vizuální tvorba scénářů
- [Webhooky (referenční příručka pro vývojáře)](/docs/developer/api/webhooks): úplný formát payloadu a podpisu, pokud někdy budete chtít webhook směrovat na vlastní server
