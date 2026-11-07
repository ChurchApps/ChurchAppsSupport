---
title: "Šablóny e-mailov"
description: "Nastavte šablóny e-mailov a textových správ v B1 Admin so zlučovacími poľami, možnosťami SMS a náhľadmi pre hromadnú komunikáciu."
---

# Šablóny e-mailov

<div class="article-intro">

Šablóny e-mailov vám umožňujú uložiť opakovane použiteľný obsah e-mailu – uvítaciu správu, pripomienku udalosti, poďakovanie za dar – aby ste ho (alebo [pracovný postup](../serving/workflows.md)) mohli odoslať jedným kliknutím namiesto toho, aby ste ho zakaždým písali od začiatku. Rovnaký zoznam obsahuje aj šablóny textových správ pre okná Text pre skupiny a jednotlivé osoby.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Potrebujete prístup do oblasti Nastavenia v B1 Admin.

</div>

## Prístup k šablónam e-mailov

1. V B1 Admin otvorte [ponuku Skok](../introduction.md#getting-around-with-the-jump-menu) (vyhľadávací panel v ľavom hornom rohu) a rozbaľte **Nastavenia**.
2. Kliknite na **Šablóny e-mailov**.
3. Zobrazí sa zoznam existujúcich šablón s ich predmetom, kategóriou a dátumom poslednej úpravy.

## Vytvorenie šablóny

1. Kliknite na **Nová šablóna**.
2. Zadajte **Názov šablóny**, podľa ktorého ju nájdete v zozname, a vyberte **Kategóriu** (Všeobecné, Udalosti, Skupiny, Dary, Uvítanie alebo Text), ktorá pomôže usporiadať vaše šablóny. Ak chcete vytvoriť šablónu textovej správy, vyberte **Text** (pozri nižšie [Šablóny textových správ](#text-templates)).
3. Zadajte riadok **Predmet**.
4. Napíšte **Telo** správy pomocou editora formátovaného textu.
5. Kliknite na **Uložiť**.

## Polia na zlúčenie

Kliknutím na čip poľa na zlúčenie nad predmetom alebo telom vložíte pole na miesto kurzora – najprv kliknite do textu, kam chcete pole vložiť, a potom kliknite na čip. Kurzor zostane na mieste, takže môžete ihneď pokračovať v písaní za vloženým poľom. Ak kliknete na čip v tele bez toho, aby ste najprv kliknuli do tela, pole sa pridá na koniec tela. Pri odoslaní e-mailu sa každé pole na zlúčenie nahradí skutočnými údajmi príjemcu:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Meno príjemcu
- `{{email}}` -- E-mailová adresa príjemcu
- `{{churchName}}` -- Názov vašej cirkvi

## Šablóny textových správ

Šablóna v kategórii **Text** je jednoduchá textová správa na posielanie SMS, nie e-mail:

- Nemá predmet. Editor formátovaného textu je nahradený jednoduchým poľom **Textová správa**, ktoré pojme až 1 600 znakov.
- Čipy polí na zlúčenie nad poľom vložia `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` alebo `{{churchName}}` na miesto kurzora.
- Šablóny textových správ sa zobrazia vo výbere **Načítať šablónu (voliteľné)** v okne Text pre [skupinu](../groups/group-members.md#texting-group-members) alebo jednotlivú osobu. Výberom sa správa vyplní a pred odoslaním ju môžete ešte upraviť.
- Nezobrazujú sa vo výberoch šablón e-mailov, vrátane akcie **Odoslať e-mail** v pracovných postupoch.

Posielanie textových správ vyžaduje pripojenie k [poskytovateľovi textových správ](./church-settings.md#texting).

## Zobrazenie ukážky šablóny

Kliknutím na **Náhľad** si pred uložením alebo odoslaním pozriete, ako budú predmet a telo vyzerať s ukážkovými údajmi vyplnenými do polí na zlúčenie.

## Používanie šablóny

Uložené šablóny možno vybrať pri zostavovaní e-mailu pre osoby alebo skupinu a ako akciu v [pracovných postupoch](../serving/workflows.md). Predtým, ako ich vaša cirkev môže odosielať, musí tím ChurchApps raz schváliť hromadné e-maily pre skupiny. Pozri [Zapnutie hromadných e-mailov pre skupiny vašej cirkvi](../groups/group-members.md#turning-on-group-email-for-your-church).

## Úprava a mazanie

Kliknite na ikonu **Upraviť** vedľa šablóny, aby ste ju aktualizovali, alebo na ikonu **Odstrániť**, aby ste ju natrvalo odstránili.

## Ďalšie kroky

- [Pracovné postupy](../serving/workflows.md) -- Automaticky spustiť e-mail zo šablóny na základe pravidiel
