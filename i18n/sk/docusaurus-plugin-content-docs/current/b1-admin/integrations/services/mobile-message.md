---
title: "Mobile Message"
description: "Pripojte udalosti B1 Admin k Mobile Message, austrálskemu SMS API, cez webhooky Zapier alebo Make a posielajte uvítacie, darcovské a pripomienkové texty."
---

# Mobile Message

<div class="article-intro">

[Mobile Message](https://mobilemessage.com.au) je austrálske SMS API, obľúbené medzi austrálskymi cirkvami, pretože ponúka miestne čísla a konkurencieschopné austrálske ceny, zatiaľ čo Clearstream a Text In Church sú orientované na USA. Mobile Message zatiaľ nemá vlastnú aplikáciu pre Zapier, ale zverejňuje verejné REST API, takže udalosti z B1 môžete prepojiť so správami Mobile Message pomocou **Webhooks by Zapier** (alebo modulu HTTP v Make) a stačí na to pár minút.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet [Mobile Message](https://mobilemessage.com.au) so zaregistrovaným Sender ID a prihlasovacími údajmi API (používateľské meno a heslo API v časti *Účet → Nastavenia API*)
- Účet [Zapier](https://zapier.com) (alebo [Make](https://www.make.com))
- Používateľ B1Admin s oprávnením **Edit Settings**

</div>

## Čo môžete prepojiť

API Mobile Message slúži na „odosielanie SMS“ — nemá spúšťače, iba odchádzajúce správy. Preto sú všetky recepty typu B1 → SMS:

| Smer | Spúšťač B1 | Výsledok |
|---|---|---|
| B1 → Mobile Message | `person.created` | Uvítacia SMS novej osobe |
| B1 → Mobile Message | `donation.created` | Poďakovacia SMS darcovi |
| B1 → Mobile Message | `form.submission.created` | Upozornenie dežúrneho tímu |
| B1 → Mobile Message | `event.created` | Pripomienka hromadnou správou pre zoznam príjemcov |

## Nastavenie

### 1. Vytvorte API kľúč B1

**Nastavenia → Vývojár → API kľúče → Nový API kľúč**:

- `settings:write` — na registráciu webhooku spúšťača
- `people:read` — na vyhľadanie telefónneho čísla príjemcu podľa `personId`

### 2. Vytvorte Zap pomocou Webhooks by Zapier

1. **Spúšťač** — B1.church: vyberte požadovanú udalosť (napr. New Donation).
2. **Akcia** — B1.church: Find Person (s použitím `data.personId`), aby ste získali telefónne číslo a meno.
3. **Akcia** — Webhooks by Zapier: **POST**. Nakonfigurujte podľa nižšie uvedeného.

Nastavenia kroku POST:

- **URL** — `https://api.mobilemessage.com.au/v1/messages`
- **Payload Type** — JSON
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
- **Headers** — `Content-Type: application/json` (Webhooks by Zapier to pridá automaticky)
- **Basic Auth** — do poľa *Basic Auth* zadajte `<api_username>|<api_password>` (Zapier to prevedie na správnu hlavičku `Authorization: Basic …`)

Zap zapnite. V B1Admin odošlite testovací dar a overte, že príde SMS.

## Bežné recepty

### Pripomienky udalostí ráno v daný deň

- **Spúšťač** — Schedule by Zapier (denne, o 7:00)
- **Akcia** — B1.church: Find Events pre dnešok (alebo použite krok Find s pevným filtrom dátumu, prípadne uložte dnešný zoznam udalostí do Google Sheet)
- **Akcia** — Webhooks by Zapier: POST na Mobile Message so zoznamom udalostí pre zaregistrovanú skupinu odberateľov

### Použitie dávkového endpointu na hromadnú správu zoznamu

Endpoint `/v1/messages` od Mobile Message prijme až 10 000 správ v jednom volaní. Ak chcete hromadne odoslať správu skupine z B1:

- **Spúšťač** — B1.church: New Form Submission (filtrované na konkrétny formulár)
- **Akcia** — B1.church: zoznam členov cieľovej skupiny (cez krok *Webhooks by Zapier — GET* na `/membership/groupmembers?groupId=…`)
- **Akcia** — Formatter by Zapier → Utilities → rozdeľte odpoveď na položky (Line-itemize) do poľa messages
- **Akcia** — Webhooks by Zapier: POST celého poľa na `/v1/messages`

### Alternatíva v Make

Ak používate Make, za spúšťač B1 Watch Events pridajte modul **HTTP — Make a request**, nakonfigurujte ho rovnako (POST, Basic Auth, JSON telo). Strana B1 je popísaná v [prehľade Make](../make.md).

## Obmedzenia a poznámky

- **Basic Auth je jediná autentifikačná metóda** — Mobile Message vydá používateľské meno a heslo z ovládacieho panela. S obomi zaobchádzajte ako s tajomstvom.
- **`sender` musí byť zaregistrované Sender ID** vo vašom účte Mobile Message, inak odoslanie vráti `400 Invalid sender`. Austrálske predpisy vyžadujú registráciu odosielateľa.
- **Austrálske telefónne čísla** môžu mať tvar `0412345678` (miestny) alebo `+61412345678` (medzinárodný). API prijme oba, ale ak posielate aj do zahraničia, normalizujte ich na tvar `+61…`.
- **Až 10 000 správ na požiadavku** — užitočné na hromadné správy, ale jedno doručenie webhooku z B1 len zriedka vygeneruje taký veľký zoznam. Dávkový endpoint si vyhraďte pre naplánované hromadné Zapy.

## Riešenie problémov

- **POST vracia `401 Unauthorized`** — prihlasovacie údaje Basic Auth sú nesprávne. Znova ich skopírujte z ovládacieho panela Mobile Message v časti *Účet → Nastavenia API*. Upozorňujeme, že predvolene je používateľským menom e-mail vášho účtu, nie samostatný API kľúč.
- **POST vracia `400 Invalid sender`** — hodnota `sender` nie je zaregistrované Sender ID vo vašom účte. Najprv ju zaregistrujte v ovládacom paneli Mobile Message.
- **Správa dorazí, ale je skrátená** — Mobile Message rozdeľuje správy dlhšie ako ~160 znakov na viacero častí a účtuje sa každá časť. Pozrite si telo odpovede, kde je uvedený počet častí.

## Pozri tiež

- [Clearstream](./clearstream.md), [Text In Church](./text-in-church.md) — alternatívni poskytovatelia SMS s natívnymi aplikáciami pre Zapier (nie je potrebný krok Webhooks by Zapier)
- [Zapier (prehľad)](../zapier.md) — strana B1 pre každý recept Zapier
- [Dokumentácia API Mobile Message](https://mobilemessage.com.au/api-documentation)
