---
title: "Extrase de donații"
description: "Creați în B1 Admin extrase anuale de donații pentru fiecare donator, apoi descărcați-le ca CSV sau tipăriți-le pentru expediere, cu totaluri deductibile fiscal."
---

# Extrase de donații

<div class="article-intro">

La sfârșitul fiecărui an, donatorii au nevoie de un sumar al donațiilor deductibile fiscal, pentru evidența lor. B1 Admin face ușor generarea acestor extrase pentru toți donatorii deodată, economisind ore întregi de muncă manuală.

</div>

<div class="prereqs">
<h4>Înainte de a începe</h4>

- Verificați că [fondurile](funds.md) dvs. sunt marcate corect ca **Deductibile fiscal**. Pe extrase apar doar donațiile către fondurile deductibile fiscal.
- Asigurați-vă că toate donațiile au fost [înregistrate](recording-donations.md) și că orice tranzacții online au fost [importate din Stripe](stripe-import.md)

</div>

## Accesarea extraselor de donații

1. În **B1 Admin**, deschideți [meniul Jump](../introduction.md#getting-around-with-the-jump-menu) (bara de căutare din colțul din stânga sus) și extindeți **Donations**.
2. Faceți clic pe **Giving Statements**. Se deschide pagina **Batch Giving Statements**.

## Generarea extraselor

1. În panoul **Select Year**, alegeți **Year** din lista derulantă. Puteți alege anul curent sau oricare dintre cei cinci ani anteriori.
2. Pagina încarcă doar donațiile datate în acel an (de la 1 ianuarie până la 31 decembrie), astfel încât se deschide rapid, chiar dacă biserica dvs. are mulți ani de istoric al donațiilor. Când alegeți un alt an, sumarul se actualizează cu donațiile acelui an. Panoul **Summary** de sub an afișează statistici pentru anul respectiv, inclusiv:
   - **Total Donors** -- numărul de persoane care au donat
   - **Total Donations** -- numărul de înregistrări individuale de donații
   - **Total Amount** -- suma totală în dolari a tuturor donațiilor

## Descărcarea extraselor

Panoul **Download Options** vă oferă două variante pentru a trimite extrasele donatorilor:

### Descărcarea ca fișiere CSV

Sub **Individual CSV Files**, faceți clic pe **Download ZIP** pentru a descărca un fișier ZIP care conține câte un fișier CSV separat pentru fiecare donator. Este util dacă doriți să trimiteți extrasele individual prin e-mail sau să le importați într-un alt sistem.

### Tipărirea tuturor extraselor

Sub **Printable Statements**, faceți clic pe **Print All** (butonul afișează numărul de extrase) pentru a deschide în browser o versiune pentru tipărire a extrasului fiecărui donator, pentru anul selectat. De acolo, folosiți funcția de tipărire a browserului pentru a le trimite la imprimantă. Fiecare extras începe pe o pagină nouă, astfel încât sunt gata de pliat și expediat, iar extrasele sunt ordonate după numele de familie al donatorului, apoi după prenume.

Dacă ați încărcat un **Light Background Logo** la [Site web > Aspect](../website/appearance.md), acesta se tipărește centrat în partea de sus a fiecărui extras, deasupra titlului extrasului. Acest lucru se aplică atât la **Print All**, cât și la extrasul unui singur donator tipărit din fișa sa.

:::tip
Generați extrasele la începutul lunii ianuarie, cât timp înregistrările sunt încă proaspete. Verificați din nou că fondurile dvs. sunt marcate corect ca deductibile fiscal înainte de a genera extrasele. Sunt incluse doar donațiile către fondurile deductibile fiscal.
:::

:::info
Extrasele de donații includ doar donațiile atribuite fondurilor la care este activată setarea **Tax Deductible**. Dacă un fond nu este marcat ca deductibil fiscal, donațiile sale nu vor apărea pe extras. Puteți gestiona această setare pe pagina [Fonduri](funds.md).
:::

## Formate de chitanță pentru Canada, Australia și Noua Zeelandă

Bisericile din afara Statelor Unite pot schimba extrasul în formatul oficial de chitanță al țării lor. Faceți clic pe **Statement format** în partea de sus a paginii Giving Statements (sau mergeți la **Settings** și deschideți secțiunea **Giving**), apoi setați **Statement Format** la **Canada**, **Australia** sau **New Zealand**, și completați câmpurile care apar: numărul dvs. de înregistrare (numărul de înregistrare CRA, ABN sau numărul de înregistrare al organizației caritabile din NZ), adresa organizației, numele persoanei autorizate să semneze chitanțele și, pentru Canada, orașul în care se emit chitanțele.

Extrasele vor conține apoi formularea cerută de autoritatea fiscală (pentru Canada, „Official Receipt for Income Tax Purposes” cu referința CRA), un număr de chitanță sub forma `YEAR-DONORID`, suma eligibilă, calculată doar din fondurile deductibile fiscal, și un rând separat pentru orice donație către fonduri nedeductibile. Donatorii văd același bloc de chitanță atunci când își tipăresc propriul extras din B1.church.

## Ce văd membrii în B1.church

Aceeași secțiune **Giving** din setări controlează ce văd membrii pe pagina lor de donații din B1.church:

- **Member Giving History** stabilește ce ani pot vedea membrii. **All years** este opțiunea implicită. **Through 2025** (sau un alt an) oprește la acel an, astfel încât membrii nu pot vedea sau tipări un an ulterior până nu îl permiteți. Folosiți această opțiune pentru a reține anul curent cât timp finalizați corecturile și rambursările. **Hidden** elimină complet istoricul donațiilor, totalurile anuale și tipărirea extraselor. Membrii pot în continuare să doneze.
- **Giving Note** este un mesaj scurt afișat pe pagina de donații și în istoricul donațiilor membrului, și tipărit la finalul fiecărui extras de donații, inclusiv al extraselor pe care le tipăriți aici. Folosiți-l pentru lucruri precum politica de rambursare.

Aceste setări modifică doar ce văd membrii. Puteți tipări în continuare orice an din această pagină.

## Pașii următori

Dacă doriți să verificați detaliile donațiilor înainte de a genera extrasele, vizitați pagina [Rapoarte de donații](donation-reports.md) sau verificați [loturile](batches.md) individuale.
