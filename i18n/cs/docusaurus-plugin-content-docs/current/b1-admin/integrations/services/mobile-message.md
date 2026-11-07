---
title: "Mobile Message"
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) je australské SMS API. Oblíbené je mezi australskými církvemi, protože nabízí místní čísla a konkurenceschopné australské ceny, zatímco Clearstream a Text In Church jsou zaměřené na USA. Mobile Message zatím nemá vlastní aplikaci pro Zapier, ale zveřejňuje veřejné REST API, takže můžete události B1 propojit s textovými zprávami Mobile Message pomocí **Webhooks by Zapier** (nebo modulu HTTP v Make) během několika minut.

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Účet [Mobile Message](https://mobilemessage.com.au) s registrovaným ID odesílatele a přihlašovacími údaji k API (uživatelské jméno a heslo API v *Účet → Nastavení API*)
- Účet [Zapier](https://zapier.com) (nebo [Make](https://www.make.com))
- Uživatel B1Admin s oprávněním **Úprava nastavení**

</div>

## Co lze propojit

API Mobile Message slouží k odesílání SMS. Nemá spouštěče, pouze odchozí zprávy. Všechny recepty tedy směřují z B1 do SMS:

| Směr | Spouštěč v B1 | Výsledek |
|---|---|---|
| B1 → Mobile Message | `person.created` | Uvítací zpráva nové osobě |
| B1 → Mobile Message | `donation.created` | Poděkování dárci |
| B1 → Mobile Message | `form.submission.created` | Upozornění pohotovostnímu týmu |
| B1 → Mobile Message | `event.created` | Připomínka hromadně odeslaná seznamu |

## Nastavení

### 1. Vytvořte API klíč B1

**Nastavení → Vývojář → API klíče → Nový API klíč**:

- `settings:write` — pro registraci webhooku spouštěče
- `people:read` — pro vyhledání telefonního čísla příjemce podle `personId`

### 2. Sestavte Zap pomocí Webhooks by Zapier

1. **Spouštěč** — B1.church: vyberte požadovanou událost (např. New Donation).
2. **Akce** — B1.church: Find Person (pomocí `data.personId`), abyste získali telefonní číslo a jméno.
3. **Akce** — Webhooks by Zapier: **POST**. Nakonfigurujte podle níže uvedeného.

Nastavení kroku POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Typ payloadu** — JSON
- **Data** —
  ```json
  {
    "messages": [
      {
        "to": "{{step2_phone}}",
        "message": "Thanks for your gift, {{step2_first_name}}!",
        "sender": "YourChurch"
      }
    ]
  }
  ```
- **Hlavičky** — `Content-Type: application/json` (Webhooks by Zapier to přidá automaticky)
- **Basic Auth** — do pole *Basic Auth* zadejte `<api_username>|<api_password>` (Zapier to převede na správnou hlavičku `Authorization: Basic …`)

Zap zapněte. V B1Admin odešlete testovací dar a ověřte, že dorazí textová zpráva.

## Běžné recepty

### Připomínky událostí ráno v den konání

- **Spouštěč** — Schedule by Zapier (denně v 7:00)
- **Akce** — B1.church: Find Events for today (nebo použijte krok Find s pevným filtrem data, případně uložte dnešní seznam událostí do Google Sheets)
- **Akce** — Webhooks by Zapier: POST do Mobile Message se seznamem událostí pro registrovanou skupinu odběratelů

### Použijte dávkový endpoint pro hromadné odeslání seznamu

Endpoint `/v1/messages` společnosti Mobile Message přijme v jednom volání až 10 000 zpráv. Pro odeslání skupině B1:

- **Spouštěč** — B1.church: New Form Submission (filtr na konkrétní formulář)
- **Akce** — B1.church: List Group Members pro cílovou skupinu (pomocí kroku *Webhooks by Zapier — GET* na `/membership/groupmembers?groupId=…`)
- **Akce** — Formatter by Zapier → Utilities → Line-itemize: převeďte odpověď na pole `messages`
- **Akce** — Webhooks by Zapier: odešlete celé pole na `/v1/messages` metodou POST

### Alternativa s Make

Pokud dáváte přednost Make, vložte modul **HTTP — Make a request** za spouštěč B1 Watch Events a nastavte jej stejně (POST, Basic Auth, tělo JSON). Část pro B1 najdete v [přehledu Make](../make).

## Omezení a poznámky

- **Basic Auth je jediná metoda ověřování.** Mobile Message vydá uživatelské jméno a heslo v administraci. Oba údaje považujte za tajné.
- **`sender` musí být registrované ID odesílatele** ve vašem účtu Mobile Message, jinak odeslání vrátí `400 Invalid sender`. Australské předpisy vyžadují registraci odesílatele.
- **Australská telefonní čísla** mohou mít tvar `0412345678` (místní) nebo `+61412345678` (mezinárodní). API přijme oba, ale pokud posíláte i do zahraničí, sjednoťte formát na `+61…`.
- **Až 10 000 zpráv na požadavek.** To je užitečné pro hromadné odesílání, ale jediné doručení webhooku z B1 obvykle nevytvoří tak velký seznam. Dávkový endpoint si vyhraďte pro plánované hromadné Zapy.

## Řešení potíží

- **POST vrátí `401 Unauthorized`** — přihlašovací údaje Basic Auth jsou špatně. Zkopírujte je znovu z administrace Mobile Message v části *Účet → Nastavení API*. Uživatelské jméno je ve výchozím stavu váš e-mail účtu, nikoli samostatný klíč API.
- **POST vrátí `400 Invalid sender`** — hodnota `sender` není registrované ID odesílatele ve vašem účtu. Nejprve jej zaregistrujte v administraci Mobile Message.
- **Zpráva dorazí, ale je zkrácená** — Mobile Message rozděluje zprávy delší než zhruba 160 znaků do více částí a účtuje se každá část zvlášť. Počet částí najdete v těle odpovědi.

## Viz také

- [Clearstream](./clearstream), [Text In Church](./text-in-church) — alternativní poskytovatelé SMS s nativními aplikacemi pro Zapier (krok Webhooks by Zapier není potřeba)
- [Zapier (přehled)](../zapier) — část Zapier pro B1 u každého receptu
- [Dokumentace API Mobile Message](https://mobilemessage.com.au/api-documentation)
