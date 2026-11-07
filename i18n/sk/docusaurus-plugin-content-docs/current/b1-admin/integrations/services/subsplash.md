---
title: "Subsplash"
---

# Subsplash

<div class="article-intro">

Ak používate Subsplash pre cirkevnú aplikáciu, darovanie alebo formuláre, ale chcete, aby bol B1 hlavným systémom na evidenciu ľudí a darov, aplikácia Zapier od Subsplash dokáže v reálnom čase posielať donácie, nové profily a odpovede z formulárov do B1. Upozorňujeme, že aplikácia Zapier od Subsplash je momentálne **iba s triggermi** — prepojenie funguje len jedným smerom (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Účet Subsplash s plánom, ktorý zahŕňa prístup k **API + Zapier** (overte to u svojho Client Success Managera v Subsplash, pretože tieto funkcie závisia od úrovne plánu)
- Účet na [Zapier](https://zapier.com)
- Používateľ B1Admin s oprávnením **Upraviť nastavenia**

</div>

## Čo môžete prepojiť

Všetky triggery nižšie pochádzajú zo Subsplash. Akcie patria B1.

| Trigger v Subsplash | Akcia v B1 |
|---|---|
| Nová donácia | Nájsť osobu → Pridať donáciu (ak osoba neexistuje, vytvoriť ju) |
| Nový sľub daru | Pridať donáciu (s `notes` = "Pledge: …") |
| Nová osoba vytvorená | Vytvoriť osobu |
| Osoba aktualizovala profil | (žiadna priama akcia v B1 — zapísať do Google Sheet na ručnú kontrolu) |
| Nová odpoveď z formulára | Vytvoriť osobu + (voliteľne) Pridať člena skupiny podľa formulára |

Smer Subsplash → B1 je momentálne jediný, ktorý aplikácia Subsplash podporuje.

## Nastavenie

### 1. Vytvorte API kľúč v B1

V B1Admin prejdite na **Settings → Developer → API Keys → New API Key**. Rozsahy (scopes):

- `people:read` — na vyhľadanie darcu podľa e-mailu
- `people:write` — na vytvorenie darcu, ak ešte neexistuje
- `donations:write` — na zaznamenanie daru
- (Nie je potrebný `settings:write` — tento trigger spravuje Subsplash, nie B1.)

### 2. Prepojte Subsplash so Zapierom

Postupujte podľa [návodu na integráciu Subsplash so Zapierom](https://support.subsplash.com/en/articles/9825926-zapier-integration). Subsplash vydá API token z vnútra Subsplash Dashboard, ktorý Zapier používa na overenie triggeru na strane Subsplash.

### 3. Vytvorte Zap „zaznamenať donáciu"

1. **Trigger** — Subsplash: Nová donácia
2. **Akcia** — B1.church: Nájsť osobu (podľa e-mailu)
3. **Filter / Path** — vetvenie podľa toho, či sa osoba našla:
   - **Nájdená:** B1.church: Pridať donáciu. Namapujte sumu, dátum, fond, spôsob = „Online" a notes = ID transakcie zo Subsplash.
   - **Nenájdená:** B1.church: Vytvoriť osobu → B1.church: Pridať donáciu (s ID novovytvorenej osoby).

Zap zapnite. Ďalšie donácie zo Subsplash sa do **B1Admin → Donations** dostanú počas niekoľkých sekúnd.

## Bežné scenáre

### Poďakovať za prvý dar

- **Trigger** — Subsplash: Nová donácia
- **Akcia** — Filter by Zapier: pokračovať iba vtedy, ak ide o prvý dar darcu (použite *Lookup Table* s e-mailom darcu voči Google Sheet so zoznamom predchádzajúcich darcov, alebo krok Zapier *Paths* podľa dátumu vytvorenia darcu)
- **Akcia** — Mailchimp / SMTP / SendGrid: odoslať správu s poďakovaním za prvý dar
- **Akcia** — B1.church: Pridať donáciu (ako obvykle)

### Oddeliť sľuby darov od bežných darov

- **Trigger** — Subsplash: Nový sľub daru
- **Akcia** — B1.church: Pridať donáciu s `notes = "Pledge — Subsplash"` a fondom s názvom `Pledges` (oddeleným od vášho prevádzkového fondu), aby ste mohli sľuby sledovať samostatne v **B1Admin → Donations → Summary**.

### Synchronizovať nových používateľov aplikácie ako osoby v B1

- **Trigger** — Subsplash: Nová osoba vytvorená
- **Akcia** — B1.church: Vytvoriť osobu, vyplniť meno, e-mail a telefón. Označenie v B1 urobte pridaním novej osoby do skupiny ako „Používatelia aplikácie Subsplash".

## Obmedzenia a poznámky

- **Aplikácia Subsplash pre Zapier obsahuje iba triggery.** Ak chcete, aby sa zmeny v B1 (napríklad nová osoba v B1) prejavili aj v Subsplash, museli by ste vytvoriť toto prepojenie zo strany B1 triggerov v aplikácii Zapier, ktoré volajú REST API Subsplash cez vlastnú akciu *Webhooks by Zapier — POST*. Ide o vlastnú integráciu, nie o hotový recept.
- **Prístup k API závisí od plánu.** Ak sa pripojenie v Zapier nepodarí s chybou `403 Forbidden`, váš plán Subsplash pravdepodobne neobsahuje prístup k API — kontaktujte svojho Client Success Managera.
- **Mapovanie fondov je manuálne.** Subsplash posiela názov kampane alebo kategórie, zatiaľ čo B1 potrebuje číselné ID fondu. Buď fond napevno nastavte v Zape, alebo udržujte *Lookup Table* v Zapier, ktorá priradí kampane zo Subsplash k fondom v B1.

## Riešenie problémov

- **Po donácii sa nespustí žiadny trigger** — v dashboarde Zapier pre Subsplash overte, že pripojenie stále zobrazuje stav *Connected*. Ak bol API token na strane Subsplash zmenený, Zap sa potichu zastaví; pripojte ho znova.
- **Akcia B1 *Pridať donáciu* zlyháva s chybou 422** — najčastejšie chýba alebo nie je rozpoznané `fundId`. Zoznam fondov nájdete v **B1Admin → Donations → Funds** a presné ID skopírujte do kroku Zap.
- **Prvý dar sa spustí dvakrát** — Subsplash občas znovu odošle trigger, ak Zapier nedostal potvrdenie. Pridajte *Filter by Zapier* podľa ID donácie (Subsplash ho posiela v dátach), aby sa duplicitné záznamy odfiltrovali.

## Pozri tiež

- [Donorbox](./donorbox) — rovnaký princíp receptu, iná platforma na darovanie
- [Zapier (prehľad)](../zapier) — strana B1 pre každý recept v Zapier
- [Návod na integráciu Subsplash so Zapierom](https://support.subsplash.com/en/articles/9825926-zapier-integration) (dokumentácia Subsplash)
