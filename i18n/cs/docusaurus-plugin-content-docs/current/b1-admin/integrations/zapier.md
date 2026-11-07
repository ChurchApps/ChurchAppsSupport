---
title: "Zapier"
description: "Propojte B1 Admin se Zapier a spouštějte automatizace u nových lidí, darů a členů skupin a zapisujte záznamy zpět do B1 bez programování."
---

# Zapier

<div class="article-intro">

Oficiální aplikace B1.church v Zapieru umožňuje, aby Zap reagoval na události ve vašem sboru (nová osoba, nový dar, nový člen skupiny, …) a zapisoval záznamy zpět do B1. Nevyžaduje programování ani vlastní infrastrukturu. Nastavíte ji v editoru Zapieru metodou přetáhni a pusť, vložíte API klíč a Zap zapnete.

</div>

:::caution Čekání na schválení Zapierem
Aplikace B1.church je hotová a funguje, ale stále čeká na kontrolu ze strany Zapieru, než se veřejně objeví v adresáři aplikací editoru Zapů. Dokud nebude schválena, mohou ji používat pouze pozvané účty. Níže popsané postupy platí tak, jak bude fungovat po schválení.
:::

<div class="prereqs">
<h4>Než začnete</h4>

- Účet u [Zapier](https://zapier.com) (pro několik Zapů stačí bezplatná úroveň)
- Správce sboru s oprávněním **Upravit nastavení** v B1Admin (vytvoříte v něm API klíč)
- Představu o tom, co chcete udělat, např. „když je v B1 přidána osoba, přidej ji do mého seznamu v Mailchimpu“

</div>

## Spouštěče a akce

| Typ | Co | Událost B1 / endpoint |
|---|---|---|
| **Spouštěč** | Nová osoba | `person.created` |
| **Spouštěč** | Aktualizovaná osoba | `person.updated` |
| **Spouštěč** | Nový dar | `donation.created` |
| **Spouštěč** | Nový člen skupiny | `group.member.added` |
| **Spouštěč** | Nové odeslání formuláře | `form.submission.created` |
| **Akce** | Vytvořit osobu | přidá novou osobu |
| **Akce** | Přidat dar | zaznamená dar |
| **Akce** | Přidat člena skupiny | přidá osobu do skupiny |
| **Akce** | Najít osobu | vyhledá osobu podle ID, e-mailu nebo jména; pokud nikdo neodpovídá, úloha selže |

Tyto položky lze volně kombinovat s kteroukoli z více než 7 000 podporovaných aplikací Zapieru.

## Nastavení

### 1. Vytvořte API klíč B1

1. V B1Admin přejděte do **Nastavení → Vývojář → API klíče**.
2. Klikněte na **Nový API klíč**, pojmenujte ho například „Zapier“ a vyberte oprávnění (scopes), která Zap potřebuje.
3. **Důležité:** Spouštěče Zapieru při zapnutí Zapu za vás registrují webhook, což vyžaduje oprávnění **`settings:write`**. Pokud některý z vašich Zapů používá spouštěč B1, vždy zahrňte `settings:write`.
4. Udělte také oprávnění, která potřebují akce. Například akce „Přidat dar“ potřebuje `donations:write` a „Vytvořit osobu“ potřebuje `people:write`.
5. Uložte. Celý klíč `cak_…` se zobrazí **jednou**, proto ho zkopírujte.

### 2. Připojte Zapier k B1

1. V Zapieru vytvořte nový Zap.
2. Když poprvé vyberete spouštěč nebo akci B1, Zapier vás vyzve k **přihlášení do B1.church**.
3. Vložte API klíč z kroku 1 a klikněte na **Ano, pokračovat**. Zapier klíč ověří vůči vašemu sboru.

Připojení se uloží v Zapieru a použije ho každý Zap ve vašem účtu.

### 3. Sestavte Zap

Vyberte spouštěč a poté přidejte jeden nebo více kroků akce. Příklady jsou uvedeny níže.

## Běžné postupy

### Přidání nových osob z B1 do Mailchimpu

- **Spouštěč** — B1: Nová osoba
- **Akce** — Mailchimp: Přidat/aktualizovat odběratele. Namapujte pole `name__first`, `name__last` a `contactInfo__email` z B1 do polí Mailchimpu Jméno / Příjmení / E-mail.

### Odesílání darů do kanálu Slacku s bohatší kartou, než nabízí vestavěný konektor

- **Spouštěč** — B1: Nový dar
- **Akce** — Slack: Odeslat zprávu do kanálu. Sestavte libovolné rozvržení (tlačítka, přílohy apod.), které vestavěný [konektor Slack](./slack-discord.md) neumí.

### Přidání nových členů skupiny do Google Skupiny

- **Spouštěč** — B1: Nový člen skupiny (filtrováno podle konkrétního `groupId`)
- **Akce** — Filter by Zapier: pokračovat pouze tehdy, pokud je skupina v B1 ta, která vás zajímá
- **Akce** — B1: Najít osobu (pomocí `personId` ze spouštěče načtěte e-mail)
- **Akce** — Google Skupiny: Přidat člena

### Předávání odeslaných formulářů do nástroje pro správu projektů

- **Spouštěč** — B1: Nové odeslání formuláře
- **Akce** — Notion / Linear / Asana / Trello: Vytvořit stránku / úkol / položku

## Jak spouštěče fungují na pozadí

Spouštěče jsou **REST hooky**, nikoli dotazování (polling). Zapier se na B1 neptá každých 15 minut. Když Zap zapnete, Zapier požádá B1 o registraci webhooku směřujícího na soukromou adresu URL Zapieru. Když událost nastane, B1 odešle obálku s daty do Zapieru a váš Zap se spustí **během několika sekund**. Když Zap vypnete, Zapier požádá B1 o smazání webhooku, takže nezůstanou žádná osiřelá předplatná.

To znamená, že spouštěč se aktivuje pouze pro události, které nastanou **po** zapnutí Zapu. Neexistuje zpětné doplňování. Zapnutí Zapu nepřehraje včerejší dary.

## Omezení a poznámky

- **Více Zapů se stejným spouštěčem** si každý registruje vlastní webhook v B1. Nedochází ke konfliktu, ale je dobré to vědět, pokud procházíte **Nastavení → Vývojář → Webhooky** a divíte se, proč tam jsou tři stejné řádky `Zapier — donation.created`.
- **Testovací data při nastavení Zapu**: při sestavování Zapu Zapier žádá o ukázková data pro mapování polí. Pokud existuje, načte nejnovější odpovídající událost z B1. Jinak použije umělý vzorek z definice aplikace.
- **Selhání akcí se zobrazí jako chyby Zapu** v historii úloh Zapieru. Častou příčinou je API klíč bez správného oprávnění (např. akce „Přidat dar“ potřebuje `donations:write`). Vytvořte klíč znovu se správnými oprávněními a znovu jej připojte v Zapieru.
- **Kvóty odchozích volání API**: každé volání API B1 z akce se počítá do vaší kvóty úloh v Zapieru, nikoli do čehokoli na straně B1.

## Řešení problémů

- **„Authentication failed“** při připojení: API klíč je chybný, byl zrušen, nebo mu chybí oprávnění, která Zap potřebuje. Vytvořte ho v B1Admin znovu alespoň s `settings:write` a s oprávněními ke všem zdrojům, kterých se Zap dotýká. Poté aktualizujte připojení.
- **Spouštěč se nikdy neaktivuje**: ověřte, že se webhook skutečně zaregistroval. V B1Admin by se nyní v **Nastavení → Vývojář → Webhooky** měl zobrazit řádek s názvem „Zapier — &lt;event&gt;“. Pokud tam není, API klíč pravděpodobně při zapnutí Zapu neměl `settings:write`. Opravte klíč a Zap vypněte a znovu zapněte.
- **Spouštěč se aktivuje dvakrát**: Zapier občas doručí událost znovu, pokud se ztratilo jeho potvrzení. Pokud potřebujete přísnou deduplikaci, použijte krok „Filter by Zapier“ na jedinečném ID (např. `id` osoby).

## Viz také

- [Make](./make.md): stejný postup, jiná platforma
- [Slack & Discord](./slack-discord.md): jednodušší chatová oznámení bez Zapieru
- [Webhooky (referenční příručka pro vývojáře)](/docs/developer/api/webhooks)
