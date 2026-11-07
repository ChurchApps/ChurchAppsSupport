---
title: "Text In Church"
description: "Propojte B1 Admin a Text In Church přes Zapier: vytvořte API klíč, sestavte Zap z karty návštěvníka do B1 a zrcadlete členství ve skupinách."
---

# Text In Church

<div class="article-intro">

[Text In Church](https://textinchurch.com) nabízí SMS a postupné automatizované zprávy (drip workflows) a automatizace pro karty pro kontakt. Jeho aplikace pro Zapier umožňuje obě směry: události z B1 můžete poslat do workflow Text In Church a naopak spouštěče z karet pro kontakt nebo z nových kontaktů přenést zpět do B1.

</div>

<div class="prereqs">
<h4>Před začátkem</h4>

- Účet [Text In Church](https://textinchurch.com) s tarifem, který zahrnuje integraci se Zapier
- Účet [Zapier](https://zapier.com)
- Uživatel B1Admin s oprávněním **Edit Settings**

</div>

## Co můžete propojit

| Směr | Spouštěč | Akce |
|---|---|---|
| B1 → Text In Church | B1 `person.created` | Vytvořit/aktualizovat osobu + přidat do skupiny |
| B1 → Text In Church | B1 `form.submission.created` | Odeslat textovou zprávu příslušnému týmu |
| B1 → Text In Church | B1 `group.member.added` | Přidat do skupiny (zrcadlit členství ve skupině) |
| Text In Church → B1 | Connect Card Submitted | B1: Vytvořit osobu + přidat člena skupiny |
| Text In Church → B1 | Person Created | B1: Vytvořit osobu |
| Text In Church → B1 | Person Joined Group | B1: Přidat člena skupiny |

Mezi akce Text In Church patří také *Send Text Message*, *Send Voice Broadcast*, *Create Task*, *Find Person/Group* a přidání nebo odebrání člena skupiny.

## Nastavení

### 1. Vytvořte klíč API pro B1

**Settings → Developer → API Keys → New API Key**:

- `settings:write` — požadováno pro Zapy spouštěné z B1
- `people:read`, `people:write` — k vyhledání nebo vytvoření osoby
- `groups:write` — pro synchronizaci skupin
- (Volitelné) `donations:write`, pokud chcete do TIC posílat potvrzení darů

### 2. Propojte Text In Church se Zapier

Postupujte podle [návodu k integraci Text In Church se Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration). Token API vygenerujete přímo v ovládacím panelu TIC.

### 3. Vytvořte Zap z karty pro kontakt do B1

Nejčastější směr. Karty pro kontakt odeslané z TIC se automaticky změní na nové osoby v B1.

1. **Spouštěč** — Text In Church: Connect Card Submitted.
2. **Akce** — B1.church: Find Person (podle e-mailu).
3. **Větev** — rozdělení podle toho, zda byla osoba nalezena:
   - Nenalezena → B1.church: Create Person.
   - Nalezena → pokračovat.
4. **Akce** — B1.church: Add Group Member do skupiny „New Contact“.

Zap zapněte. Další karta pro kontakt odeslaná přes TIC se automaticky objeví v **B1Admin → People**.

## Časté postupy

### Spustit workflow ve stylu karty pro kontakt z formuláře B1

- **Spouštěč** — B1.church: New Form Submission (filtrujte podle ID formuláře „I'm new here“)
- **Akce** — Text In Church: Create/Update Person, s namapováním odpovědí na e-mail, telefon a jméno z formuláře
- **Akce** — Text In Church: Add to Group, u skupiny, ke které je připojený předem připravený uvítací workflow

### Zrcadlení členství ve skupině

- **Spouštěč** — B1.church: New Group Member, filtrováno podle konkrétního `groupId`
- **Akce** — Text In Church: Add to Group (stejná osoba, zrcadlená skupina). Pro úplnou synchronizaci přidejte Zap s `group.member.removed`.

### Upozornit vedoucího, když se někdo připojí

- **Spouštěč** — B1.church: New Group Member
- **Akce** — Text In Church: Send Text Message, příjemce = telefon vedoucího skupiny, text = `"{first} {last} se právě připojil(a) ke skupině {group}"`.

## Omezení a poznámky

- **Aplikace TIC pro Zapier je dostupná jen v některých tarifech.** Pokud je integrace Zapier v ovládacím panelu TIC neaktivní (šedá), obraťte se na podporu TIC, aby ji zpřístupnila pro váš tarif.
- **ID skupin jsou z TIC, ne z B1.** Při zrcadlení budete muset někde udržovat tabulku mapování (buď *Lookup Table* v Zapier, nebo pevně zadané hodnoty v jednotlivých Zapech).
- **Odeslání textové zprávy spotřebovává kredity.** Každý Zap, který spustí *Send Text*, čerpá z vašeho limitu SMS v TIC.

## Řešení problémů

- **Spouštěč Connect Card se nespouští** — v TIC musí být zapnutý přepínač integrace Zapier. Ověřte také, že formulář, který jste testovali, je nastaven jako „Connect Card“, a ne jako obecný dotazník.
- **Create Person v B1 selže s chybou 401** — klíč API je chybný, byl odvolán, nebo mu chybí `people:write`. Vytvořte nový klíč.
- **Duplicitní osoby v B1** — TIC odesílá pro stejnou událost jak *Person Created*, tak *Connect Card Submitted*. Vyberte jeden z nich jako zdroj pravdy a na druhý přidejte filtr Zapier (Filter).

## Viz také

- [Clearstream](./clearstream.md) — alternativní platforma pro SMS s podobným zapojením přes Zapier
- [Zapier (přehled)](../zapier.md) — strana B1 u všech receptů pro Zapier
- [Návod Text In Church pro Zapier](https://help.textinchurch.com/en/articles/3943363-text-in-church-s-zapier-integration) (dokumentace TIC)
