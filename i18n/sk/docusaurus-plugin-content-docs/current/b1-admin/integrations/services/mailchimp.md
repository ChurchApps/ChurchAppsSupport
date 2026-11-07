---
title: "Mailchimp"
---

# Mailchimp

<div class="article-intro">

Udržiavajte publikum v Mailchimpe automaticky zosúladené s B1: ľudia sa do neho pridávajú so svojím menom, e-mailom a telefónnym číslom; členstvo v skupinách a zoznamoch sa premieta do štítkov v Mailchimpe; vymazané osoby sa archivujú. Synchronizácia je zabudovaná priamo v B1 — nepotrebujete žiadnu službu tretej strany, neplatí sa za jednotlivé úlohy a zmeny sa prenášajú takmer v reálnom čase, nie podľa nočného plánu.

</div>

<div class="prereqs">
<h4>Pred začatím</h4>

- Účet [Mailchimp](https://mailchimp.com) s publikom, ktoré má B1 spravovať
- **API kľúč** Mailchimp (Mailchimp: ikona profilu → **Account & billing → Extras → API keys**)
- Vaše **ID publika** (Mailchimp: **Audience → Settings → Audience name and defaults**)
- Používateľ B1Admin s oprávnením **Upraviť nastavenia**

</div>

## Čo sa synchronizuje

| Zmena v B1 | Účinok v Mailchimpe |
|---|---|
| Osoba pridaná alebo upravená | Odberateľ pridaný/aktualizovaný (krstné meno, priezvisko, telefón; noví odberatelia sa zapíšu ako `subscribed`) |
| Osoba vymazaná (alebo vymazaná podľa GDPR) | Odberateľ archivovaný |
| Osoba vstúpi do skupiny | Pridá sa štítok pomenovaný podľa skupiny |
| Osoba opustí skupinu | Tento štítok sa odstráni |
| Osoba vstúpi do uloženého zoznamu | Pridá sa štítok pomenovaný podľa zoznamu |
| Osoba opustí uložený zoznam | Tento štítok sa odstráni |

**Uložené zoznamy sú zvyčajne lepším zdrojom štítkov.** Uložený [zoznam](/docs/b1-admin/people/lists) v B1 je publikum založené na pravidlách, ktoré sa samo aktualizuje — napríklad „všetci na severnom campuse“ alebo „členovia, ktorí súhlasili s pastoračnými e-mailmi“. Ak vaše segmenty v Mailchimpe založíte na štítkoch zoznamov, synchronizácia ich bude udržiavať aktuálne; štítky skupín používajte na rozosielanie tímom jednotlivých služieb.

Synchronizácia je **jednosmerná** (B1 → Mailchimp) a mení len štandardné polia Mailchimpu, takže nemôže kolidovať so zlučovacími poľami ani segmentmi, ktoré spravujete priamo v Mailchimpe.

## Nastavenie

1. V B1Admin prejdite na **Nastavenia → Vývojár → Webhooky → Nový webhook**.
2. Ako **Typ konektora** nastavte **Mailchimp**.
3. Vložte svoj **API kľúč Mailchimp** a **ID publika**. Kľúč sa uloží zašifrovaný a už sa nikdy nezobrazí.
4. Relevantné udalosti sú predvolene označené; odznačte tie, ktoré nechcete (napr. ponechajte udalosti osôb, ale preskočte štítky skupín).
5. Uložte. B1 pred prijatím overí kľúč a publikum voči Mailchimpu — preklep zlyhá okamžite s uvedením dôvodu.

Kedykoľvek môžete použiť **Odoslať test** a znova overiť pripojenie. Každý pokus o synchronizáciu sa zaznamenáva v histórii doručení webhooku spolu so skutočnou odpoveďou Mailchimpu a neúspešné doručenia sa automaticky opakujú s postupným odstupom približne päť dní.

## Počiatočný import

Konektor synchronizuje *zmeny* od momentu, keď je zapnutý; existujúci adresár spätne nedoplní. Na deň nastavenia:

1. V B1Admin prejdite na **Osoby**, vyhľadajte osoby, ktoré chcete (alebo spustite uložený zoznam), a kliknutím na **Exportovať** stiahnite CSV súbor.
2. V Mailchimpe použite **Publikum → Importovať kontakty**, nahrajte CSV súbor a počas importu prípadne priraďte štítky.

Počiatočné načítanie cez importér Mailchimpu vám ponecháva kontrolu nad súhlasom — importujte len osoby, ktoré skutočne súhlasili s prijímaním vašich e-mailov. Hromadný import celého adresára ako odberateľov môže porušiť podmienky Mailchimpu a protispamové zákony (CAN-SPAM/GDPR).

## Obmedzenia a poznámky

- **Jednosmerná synchronizácia.** Odhlásenia, odmietnuté správy a úpravy vykonané v Mailchimpe sa do B1 nevracajú. Osoba, ktorá sa odhlási v Mailchimpe, môže stále dostávať e-maily odoslané priamo z B1 — súhlas s hromadnou poštou berte tak, že zdrojom pravdy je Mailchimp.
- **Osoby bez e-mailovej adresy sa preskočia** (v histórii doručení sa zaznamenajú ako preskočené), pretože odberatelia v Mailchimpe sú identifikovaní e-mailom.
- **Zmena e-mailovej adresy vytvorí nového odberateľa.** Mailchimp rozlišuje osoby podľa e-mailu, takže zmena e-mailu v B1 pridá osobu pod novou adresou; starý odberateľ zostane, kým ho nearchivujete v Mailchimpe.
- **Synchronizujú sa len štandardné polia** — krstné meno, priezvisko, telefón. Stav členstva, campus a vlastné polia B1 sa v tejto verzii nemapujú na zlučovacie polia Mailchimpu; na segmentáciu používajte štítky zoznamov.
- **Názvy štítkov sú názvy skupín alebo zoznamov.** Premenovanie skupiny alebo zoznamu spustí označovanie pod novým názvom; starý štítok zostane na existujúcich odberateľoch, kým ho neodstránite v Mailchimpe.
- **Limity kontaktov Mailchimpu stále platia** — ak synchronizácia posunie publikum bezplatného plánu nad limit, v histórii doručení sa zaznamenajú chyby `Member limit reached`.

## Ďalšie postupy (Zapier / Make)

Všetko nad rámec synchronizácie publika — označovanie darcov pri `donation.created`, obrátený smer Mailchimp → B1 alebo synchronizácia s iným e-mailovým systémom (Constant Contact, Brevo a pod.) — je stále dostupné cez [Zapier](../zapier) alebo [Make](../make), ktoré reagujú na tie isté udalosti webhooku:

- **Označovanie darcov:** B1 *New Donation* → B1 *Find Person* → Mailchimp *Add Subscriber to Tag* (`Gave-2026`)
- **Obojsmerne:** Mailchimp *New Subscriber* → B1 *Create Person*

Ak ste predtým synchronizáciu osôb a skupín nastavili cez Zapier, po zapnutí natívneho konektora tieto Zapy vypnite — ak bežia oba, každá udalosť sa spracuje dvakrát a úlohy v Zapieri sa zbytočne minú.

## Riešenie problémov

- **Uloženie zlyhá s hláškou „Mailchimp rejected the API key“** — kľúč bol zrušený alebo zle napísaný. Kľúče musia končiť príponou dátového centra, napríklad `-us21`.
- **Uloženie zlyhá s hláškou „audience not found“** — ID publika neexistuje pod týmto účtom. Skopírujte ho z **Publikum → Nastavenia → Názov publika a predvolené nastavenia** (nie názov publika).
- **Osoba sa nikdy neobjavila v Mailchimpe** — skontrolujte históriu doručení webhooku. Správa „Skipped: person has no email address“ znamená presne to, čo píše; odpoveď `4xx` od Mailchimpu uvádza dôvod v tele odpovede.
- **Doručovanie úplne ustalo** — po opakovaných neúspešných doručeniach sa webhook automaticky vypne. Odstráňte príčinu (zvyčajne zrušený kľúč), znova ho zapnite a pomocou **Odoslať test** overte funkčnosť.

## Pozri tiež

- [Webhooky (referencia pre vývojárov)](/docs/developer/api/webhooks) — motor pod tým, katalóg udalostí, sémantika doručovania a opakovania
- [Uložené zoznamy](/docs/b1-admin/people/lists) — publiká založené na pravidlách, ktoré sa prirodzene mapujú na štítky Mailchimpu
- [Zapier (prehľad)](../zapier) — postupy nad rámec synchronizácie publika
