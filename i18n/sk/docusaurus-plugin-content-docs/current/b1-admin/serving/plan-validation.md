---
title: "Overenie plánu a upozornenia"
---

# Overenie plánu a upozornenia pre dobrovoľníkov

<div class="article-intro">

B1 Admin automaticky kontroluje vaše plány ešte pred nedeľou: neobsadené pozície, konflikty v rozvrhu a dobrovoľníkov, ktorí si označili daný dátum ako nedostupný. Keď je všetko v poriadku, môžete celý tím upozorniť jediným kliknutím.

</div>

<div class="prereqs">
<h4>Predtým, ako začnete</h4>

- Vytvorte [servisný plán](./plans.md) a priraďte dobrovoľníkov na pozície
- Pridajte do plánu [časy bohoslužieb](./plans.md), aby detekcia konfliktov mohla skontrolovať prekrytia
- Uistite sa, že dobrovoľníci majú nainštalovanú aplikáciu B1 Mobile, aby mohli prijímať push notifikácie

</div>

## Panel overenia

Každý plán má panel **Overenie**, ktorý beží automaticky počas jeho zostavovania. Kontroluje tri veci:

### Neobsadené pozície
Ak pozícia vyžaduje viac ľudí, než je aktuálne priradených, panel overenia presne uvedie, čo ešte chýba, napríklad *„Zvukový technik: chýba ešte 1 osoba.“* Ešte pred príchodom daného týždňa tak na prvý pohľad vidíte, či je plán plne obsadený.

### Konflikty v rozvrhu
Ak je dobrovoľník priradený na dve pozície, ktoré sa v rámci toho istého plánu časovo prekrývajú, panel overenia na to upozorní, napríklad *„Jana Nováková: časový konflikt medzi Vedúcim chvály a Detskou registráciou počas nedeľnej bohoslužby.“* Takto sa zachytia dvojité rezervácie skôr, než sa zmenia na problém v nedeľné ráno.

### Dátumy nedostupnosti
Dobrovoľníci môžu v aplikácii B1 Mobile nastaviť dátumy, kedy nie sú k dispozícii. Ak je niekto priradený k plánu, ktorý spadá do jeho dátumov nedostupnosti, panel overenia konflikt automaticky zobrazí, aby ste mohli nájsť náhradu.

### Konflikty naprieč plánmi
Overenie kontroluje aj všetky vaše plány naraz. Ak je ten istý dobrovoľník priradený v dvoch rôznych plánoch, ktoré sa časovo prekrývajú (napríklad deviata a desiata ranná bohoslužba, ktoré obe trvajú do 10:30), B1 Admin túto osobu označí ako dvojito rezervovanú naprieč plánmi.

:::tip
Nemusíte nič robiť, aby sa overenie spustilo. Aktualizuje sa automaticky pri každom pridaní alebo zmene priradenia. Stačí sledovať panel počas zostavovania plánu.
:::

## Upozorňovanie dobrovoľníkov

Keď je plán hotový, môžete všetkých priradených dobrovoľníkov upozorniť naraz priamo z panela overenia.

1. Otvorte plán a prejdite na panel **Overenie**
2. Ak existujú dobrovoľníci, ktorí ešte neboli upozornení, uvidíte odkaz s počtom osôb, ktoré treba upozorniť (napr. *„Upozorniť 8 dobrovoľníkov“*)
3. Kliknutím na odkaz odošlete push notifikácie všetkým, ktorí ešte neboli upozornení
4. Dobrovoľníci dostanú na telefón upozornenie, že boli naplánovaní, a výzvu, aby svoje priradenie potvrdili

:::info
Zahrnutí budú iba dobrovoľníci, ktorí ešte neboli upozornení. Ak neskôr pridáte do plánu ďalšiu osobu, odkaz sa znova zobrazí, takže môžete upozorniť novú osobu bez opätovného upozorňovania zvyšku tímu.
:::

### Plány so workflow potvrdzovania

Ak nastavenia plánu odkazujú na [workflow potvrdzovania](./workflows.md#serving-assignment-confirmations), panel zobrazí správu *„Nové žiadosti používajú workflow potvrdzovania. Aplikačné upozornenia zostanú zapnuté. Pripomienky sa zastavia, keď sa každá žiadosť prijme alebo odmietne.“* V takom prípade:

- Odkaz na upozornenie počíta iba dobrovoľníkov, ktorí ešte neboli upozornení a ešte neodpovedali.
- Po kliknutí sa odošle obvyklé upozornenie v aplikácii a na nástenke workflowu sa vytvorí jedna karta pre každú žiadosť. Workflow potom pošle e-mailové a textové pripomienky a v prípade potreby odovzdá žiadosť niekomu, kto dobrovoľníka zavolá.
- Plán musí byť publikovaný (nie iba predbežne naplánovaný) a workflow musí byť aktívny. V opačnom prípade panel zobrazí správu *„Žiadosti sa nepodarilo odoslať. Skontrolujte, či je vybraný workflow aktívny a plán publikovaný, a skúste to znova.“*

:::warning
Dobrovoľníci musia mať nainštalovanú mobilnú verziu B1.church (PWA na ploche domovskej obrazovky alebo zastaranú natívnu aplikáciu B1 Mobile pre používateľov, ktorí ju ešte majú) a musia mať zapnuté notifikácie, aby mohli prijímať push notifikácie. Pokyny na nastavenie nájdete v časti [Inštalácia ako aplikácia (PWA)](/docs/b1-church/getting-started/installing-pwa).
:::

## Súvisiace články

- [Servisné plány](./plans.md)
- [Workflowy](./workflows.md)
- [Inštalácia B1.church PWA](/docs/b1-church/getting-started/installing-pwa)
