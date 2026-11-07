---
title: "Ghid: Generarea rapoartelor de donații pentru sfârșitul anului"
---

# Generarea rapoartelor de donații pentru sfârșitul anului

<div class="article-intro">

Parcurgeți procesul de sfârșit de an: finalizarea înregistrărilor de donații, verificarea setărilor fondurilor și generarea extraselor de donații deductibile fiscal pentru fiecare donator. Această operațiune se face, de obicei, la începutul lunii ianuarie, pentru anul calendaristic precedent.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Cont B1 Admin cu acces la modulul financiar
- Donații înregistrate pe parcursul anului (online prin Stripe și/sau introduse manual)
- Acces la contul dvs. Stripe, dacă acceptați donații online

</div>

## Pasul 1: Importați tranzacțiile finale Stripe

Asigurați-vă că toate donațiile online din sfârșitul anului se află în sistemul dvs.

Urmați ghidul [Import Stripe](../donations/stripe-import.md) pentru a:

1. Accesa Donations > Stripe Import
2. Selecta un interval de date care acoperă sfârșitul anului (de exemplu, 1 decembrie - 31 decembrie)
3. Face clic pe Preview pentru a verifica mai întâi, apoi pe Import Missing pentru a finaliza

:::warning
Rulați acest import înainte de a genera extrasele. Tranzacțiile pe care nu le-ați importat nu vor apărea pe extrasele donatorilor.
:::

## Pasul 2: Verificați rapoartele de donații

Verificați dacă înregistrările sunt corecte înainte de a genera extrasele.

Urmați ghidul [Rapoarte de donații](../donations/donation-reports.md) pentru a:

1. Verifica pagina de sumar a donațiilor pentru întregul an
2. Analiza totalurile pe fond și a le compara cu extrasele bancare, pentru a identifica eventualele neconcordanțe
3. Face clic pe loturile individuale pentru a verifica detaliile donatorilor, dacă este necesar

## Pasul 3: Verificați statutul fiscal al fondurilor

Asigurați-vă că setarea de deductibilitate fiscală a fiecărui fond este corectă, pentru ca extrasele să fie exacte.

Urmați ghidul [Fonduri](../donations/funds.md) pentru a:

1. Deschide fiecare fond și confirma că setarea de deductibilitate fiscală este corectă

:::info
Pe extrasele de donații vor apărea doar donațiile făcute către fonduri marcate ca deductibile fiscal. Dacă un fond ar trebui să fie deductibil fiscal, dar nu este marcat astfel, actualizați-l înainte de a genera extrasele.
:::

## Pasul 4: Generați extrasele de donații

Creați extrasele oficiale de donații pentru donatorii dvs.

Urmați ghidul [Extrase de donații](../donations/giving-statements.md) pentru a:

1. Accesa **Donations > Giving Statements**
2. Selecta anul din lista derulantă și analiza statisticile sumare
3. Alegeți metoda de descărcare:
   - **Download ZIP** — fișiere CSV individuale, câte unul pentru fiecare donator
   - **Print All** — vizualizare pentru imprimare, cu fiecare extras pe o pagină nouă și cu sigla bisericii dvs. în partea de sus (dacă ați încărcat una)

:::tip
Generați extrasele la începutul lunii ianuarie, cât timp înregistrările sunt proaspete. Astfel, aveți timp să rezolvați eventualele probleme înainte de a le trimite prin poștă.
:::

## Pasul 5: Distribuiți extrasele donatorilor

Asigurați-vă că extrasele ajung la donatorii dvs.

1. Imprimați și trimiteți extrasele prin poștă sau trimiteți prin e-mail fișierele CSV individuale către donatori
2. Membrii își pot vedea și ei istoricul donațiilor și pot imprima extrasele din [B1.church](../../b1-church/giving/donation-history.md) și din [aplicația B1 Mobile](../../b1-mobile/giving/donation-history.md)

## Ați terminat!

Rapoartele de donații pentru sfârșitul anului sunt finalizate. Donatorii au primit extrasele deductibile fiscal, iar evidențele financiare ale anului sunt închise.

## Articole conexe

- [Import Stripe](../donations/stripe-import.md) — importați tranzacțiile online
- [Rapoarte de donații](../donations/donation-reports.md) — vizualizați tendințele și totalurile donațiilor
- [Fonduri](../donations/funds.md) — gestionați fondurile și setările de deductibilitate fiscală
- [Extrase de donații](../donations/giving-statements.md) — generați extrasele de sfârșit de an
- [Înregistrarea donațiilor](../donations/recording-donations.md) — introduceți manual donațiile în numerar sau prin cec
- [Istoricul donațiilor (web)](../../b1-church/giving/donation-history.md) — vizualizarea de către membri, în regim de autoservire
- [Ghid de configurare a donațiilor online](./online-giving.md) — configurarea inițială a Stripe și a donațiilor
