---
title: "Klíče API"
description: "Vytvářejte, omezujte a odvolávejte API klíče B1 v B1 Admin pro serverové skripty a konektory Zapier, Make nebo Google Sheets bez plného toku OAuth."
---

# Klíče API

<div class="article-intro">

Klíče API (osobní přístupové tokeny) jsou nejjednodušší způsob, jak se ověřit vůči API B1 ze serverového skriptu, z integrace třetí strany (Zapier, Make, Google Sheets) nebo kdekoli, kde je celý postup OAuth zbytečně složitý. Klíč je vázán na konkrétní osobu v konkrétním sboru a dědí její oprávnění, která lze volitelně omezit sadou rozsahů (scopes).

</div>

<div class="prereqs">
<h4>Než začnete</h4>

- Klíče vytváří a spravuje správce sboru s oprávněním **Úprava nastavení**
- Nezpracovaný klíč se zobrazí **pouze jednou** při vytvoření – ihned si ho uložte na bezpečné místo
- Všechny požadavky na API musí používat **HTTPS**

</div>

## Formát klíče

Klíč API B1 vypadá takto:

```
cak_<prefix>.<secret>
```

- `cak_` — pevný identifikátor (předpona klíče API, podle které vrstva ověřování klíče rozpoznává)
- `<prefix>` — 8znakový veřejný vyhledávací segment
- `<secret>` — 48znakové tajemství; na serveru se ukládá pouze hash SHA-256

Celý klíč se serveru předává ve standardní hlavičce Bearer:

```http
Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7
```

Vrstva ověřování API směruje každý token začínající na `cak_` na cestu pro klíče API, zahashuje tajemství, vyhledá klíč podle předpony a zjistí aktuální oprávnění osoby, ke které klíč patří. Odebrání oprávnění v B1Admin se tedy projeví už při dalším požadavku a klíč se nikdy neodchýlí od role.

## Vytvoření klíče (B1Admin)

1. Přihlaste se do B1Admin jako uživatel s oprávněním **Úprava nastavení**.
2. Otevřete **Nastavení → Vývojář → Klíče API**.
3. Klikněte na **Nový klíč API**, zadejte rozpoznatelný název (např. „Zapier — synchronizace darů“), vyberte rozsahy, které má klíč mít, a klikněte na **Uložit**.
4. Celý klíč `cak_…` se zobrazí **jen jednou** v dialogovém okně. Před zavřením jej zkopírujte do konfigurace své integrace – později ho už nelze získat. Vždy můžete vytvořit nový klíč.

## Rozsahy (scopes)

Rozsah klíč **omezuje** – nikdy nemůže udělit oprávnění, které podkladová osoba nemá. Prázdné nebo žádné rozsahy znamenají, že klíč nese celou sadu oprávnění osoby.

| Rozsah | Umožňuje |
|---|---|
| `people:read` / `people:write` | Zobrazit / upravit osoby, domácnosti, členy skupin |
| `groups:read` / `groups:write` | Zobrazit / upravit skupiny a jejich členství |
| `donations:read` / `donations:write` | Zobrazit / zaznamenat dary |
| `attendance:read` / `attendance:write` | Zobrazit / zaznamenat docházku, relace, odbavení |
| `forms:write` | Spravovat formuláře (přístup pro čtení je implicitně součástí zápisu) |
| `content:read` / `content:write` | Zobrazit / upravit obsah webu, registrace, streamování |
| `messaging:read` / `messaging:write` | Číst zprávy; zápis navíc umožňuje odesílat SMS |
| `roles:read` / `roles:write` | Zobrazit / upravit definice rolí |
| `settings:read` / `settings:write` | Zobrazit / upravit nastavení sboru (**nutné** pro programovou registraci webhooků) |
| `workflows:read` / `workflows:write` | Zobrazit pracovní postupy a úkoly / spouštět a upravovat pracovní postupy. Spuštění pracovního postupu může odesílat e-maily a textové zprávy, aktivovat webhooky a měnit členství ve skupinách |
| `offline_access` | Povoluje dlouhodobé obnovovací tokeny (pouze u postupů OAuth – u klíčů API nemá žádný účinek) |

Rozsahy `write` implicitně zahrnují odpovídající `read`. Oprávnění na úrovni serveru a správce domény nejsou záměrně zpřístupněna jako rozsahy – pověření s omezeným rozsahem nikdy nemůže získat správcovská oprávnění celé stránky.

:::tip
Pokud klíč budete používat k registraci webhooků (například pro integraci Zapier nebo Make), potřebuje rozsah `settings:write`. Klíč pouze s `people:read` tiše vrátí chybu 403 na `POST /membership/webhooks`.
:::

## Použití klíče

Stejně jako jakýkoli jiný token Bearer – každý ověřený koncový bod přijímá klíče API přesně stejně jako JWT:

```bash
curl https://api.churchapps.org/membership/people \
  -H "Authorization: Bearer cak_a1b2c3d4.f0e1d2c3b4a5968778695a4b3c2d1e0f1a2b3c4d5e6f7"
```

Požadavek, jehož klíč nemá dostatečné rozsahy, vrátí **403 Forbidden** se stejnou strukturou jako jakákoli jiná chyba odepření oprávnění.

## Správa klíčů přes API

Všechny koncové body jsou pod cestou `/membership/apiKeys` modulu Membership a vyžadují JWT (nikoli klíč API) od správce sboru s oprávněním **Úprava nastavení**.

| Metoda a cesta | Účel |
|---|---|
| `GET /membership/apiKeys` | Výpis klíčů sboru (bez tajemství – pouze `id`, `name`, `prefix`, `scopes`, `lastUsedAt`, `expiresAt`, `createdAt`) |
| `GET /membership/apiKeys/scopes` | Seznam všech dostupných názvů rozsahů – pro uživatelské rozhraní pro vytváření klíčů |
| `POST /membership/apiKeys` | Vytvoření nového klíče. Tělo požadavku: `{ "name": "...", "scopes": ["people:read"] }`. Odpověď obsahuje nezpracovaný klíč `cak_…` **pouze jednou**. |
| `DELETE /membership/apiKeys/:id` | Zrušení klíče – projeví se při dalším požadavku |

Zrušený klíč přestane fungovat okamžitě – neexistuje žádná lhůta pro dokončení.

## Osvědčené postupy

- **Jeden klíč pro jednu integraci.** Pokud dojde ke kompromitaci, zrušíte pouze jeden klíč, aniž byste narušili ostatní.
- **Vytvářejte nejužší rozsahy, které stačí.** Export do Google Sheets potřebuje pouze `people:read`, nikoli `settings:write`.
- **Vážte klíč na servisní účet, nikoli na skutečného zaměstnance.** Pokud zaměstnanec odejde, skončí jeho přístup k B1 – a s ním i všechny klíče vytvořené pod jeho identitou.
- **Ukládejte klíče do správce tajemství** (proměnné prostředí vašeho hostingu, AWS Secrets Manager apod.) – nikdy ne do správy zdrojového kódu.
- **Při podezření na únik klíče jej obměňte:** vytvořte nový klíč, aktualizujte integraci a poté smažte starý.

## Rozdíl oproti OAuth

Klíče API se hodí, když je **vaše církev jediná, která integraci používá**. Pro konektor, který potřebuje přístup k mnoha sborům, a to vždy s výslovným souhlasem každého z nich – například aplikace SaaS sdílená v komunitě B1 – použijte raději [OAuth a propojené aplikace](./connected-apps.md).

| | Klíč API | OAuth |
|---|---|---|
| Kdo ji nainstaluje | Jeden správce sboru | Každý správce sboru aplikaci autorizuje |
| Hlavička autorizace | `Authorization: Bearer cak_…` | `Authorization: Bearer <jwt>` |
| Platnost tokenu | Do zrušení | Přístup ≈ 7 dní, obnovovací token ≈ 90 dní |
| Nejvhodnější pro | Interní skripty, konektory Zapier/Make/Sheets | Vícenájemné aplikace třetích stran |
