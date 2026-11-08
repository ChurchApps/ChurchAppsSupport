---
title: "Overenie plánu a upozornenia"
description: "Skontrolujte servisné plány v B1 Admin, či nemajú neobsadené pozície, časové konflikty alebo dobrovoľníkov s blokovanými dátumami, a potom jedným kliknutím upozornite celý tím push notifikáciou."
---

# Overenie plánu a upozornenia dobrovoľníkov

<div class="article-intro">

B1 Admin automaticky kontroluje vaše plány ešte pred nedeľou: neobsadené pozície, časové konflikty a dobrovoľníkov, ktorí si na daný dátum zablokovali čas. Keď je všetko v poriadku, môžete jediným kliknutím upozorniť celý tím.

</div>

<div class="prereqs">
<h4>Pred začiatkom</h4>

- Vytvorte [servisný plán](./plans.md) a priraďte dobrovoľníkov k pozíciám
- Pridajte do plánu [časy bohoslužieb](./plans.md), aby detekcia konfliktov mohla kontrolovať prekrytia
- Uistite sa, že majú dobrovoľníci nainštalovanú [aplikáciu B1 App](../../b1-church/getting-started/installing-pwa.md), aby mohli prijímať push notifikácie

</div>

## Panel overenia

Každý plán má panel **Overenie**, ktorý sa spúšťa automaticky počas jeho vytvárania. Kontroluje tri veci:

### Neobsadené pozície
Ak pozícia vyžaduje viac ľudí, než je aktuálne priradených, panel overenia presne vypíše, čo ešte chýba, napríklad *„Zvukový technik: chýba ešte 1 človek.“* Na prvý pohľad tak vidíte, či je plán pred príchodom týždňa úplne obsadený.

### Časové konflikty
Ak je dobrovoľník priradený na dve pozície, ktoré sa v rámci toho istého plánu časovo prekrývajú, panel overenia na to upozorní, napríklad *„Jana Nováková: časový konflikt medzi Vedúcim chvály a Detskou prezenciou počas nedeľnej bohoslužby.“* Takto sa zachytia dvojité rezervácie skôr, než sa z nich stane problém v nedeľné ráno.

### Blokované dátumy
Dobrovoľníci môžu v aplikácii B1 App nastaviť dátumy, kedy nemajú čas. Ak je niekto priradený k plánu, ktorý pripadá do jedného z jeho blokovaných dátumov, panel overenia tento konflikt automaticky zobrazí, aby ste mohli nájsť náhradu.

### Konflikty naprieč plánmi
Overenie kontroluje aj všetky vaše plány naraz. Ak je ten istý dobrovoľník priradený v dvoch rôznych plánoch, ktoré sa časovo prekrývajú, napríklad deviata a desiata bohoslužba, ktoré obe trvajú do 10:30, B1 Admin označí túto osobu ako dvojito rezervovanú naprieč plánmi.

:::tip
Overenie nemusíte nijako spúšťať. Aktualizuje sa automaticky pri každom pridaní alebo zmene priradenia. Stačí počas tvorby plánu sledovať panel.
:::

## Upozornenie dobrovoľníkov

Keď je plán hotový, môžete všetkých priradených dobrovoľníkov upozorniť naraz priamo z panela overenia.

1. Otvorte plán a prejdite na panel **Overenie**
2. Ak existujú dobrovoľníci, ktorí ešte neboli upozornení, uvidíte odkaz s ich počtom (napr. *„Upozorniť 8 dobrovoľníkov“*)
3. Kliknutím na odkaz odošlete push notifikácie všetkým, ktorí ešte nedostali upozornenie
4. Dobrovoľníci dostanú na telefóne oznámenie, že boli naplánovaní, a výzvu potvrdiť svoje priradenie

:::info
Zahrnutí budú iba dobrovoľníci, ktorí ešte neboli upozornení. Ak neskôr do plánu pridáte ďalšiu osobu, odkaz sa znovu zobrazí, aby ste mohli upozorniť len nového člena bez opätovného upozorňovania zvyšku tímu.
:::

### Plány s potvrdzovacím pracovným postupom

Ak nastavenia plánu určujú [potvrdzovací pracovný postup](./workflows.md#serving-assignment-confirmations), panel zobrazí: *„Nové žiadosti používajú potvrdzovací pracovný postup. Upozornenia v aplikácii zostávajú zapnuté. Pripomienky sa zastavia, keď sa každá žiadosť prijme alebo zamietne.“* V takom prípade platí:

- Odkaz na upozornenie počíta iba dobrovoľníkov, ktorí ešte neboli upozornení a ešte neodpovedali.
- Po kliknutí sa odošle obvyklé upozornenie v aplikácii a na nástenke pracovného postupu sa vytvorí jedna karta pre každú žiadosť. Pracovný postup potom odošle pripomienky e-mailom a textovou správou a v prípade potreby priradí žiadosť niekomu, kto zavolá.
- Plán musí byť zverejnený (nie len predbežný) a pracovný postup musí byť aktívny. Inak panel zobrazí: *„Žiadosti sa nepodarilo odoslať. Skontrolujte, či je vybraný pracovný postup aktívny a plán zverejnený, a potom to skúste znova.“*

:::warning
Aby mohli dobrovoľníci prijímať push notifikácie, musia mať aplikáciu B1 App nainštalovanú na domovskej obrazovke a zapnuté notifikácie. Pokyny na nastavenie nájdete v článku [Inštalácia ako aplikácia (PWA)](../../b1-church/getting-started/installing-pwa.md).
:::

## Súvisiace články

- [Servisné plány](./plans.md)
- [Pracovné postupy](./workflows.md)
- [Inštalácia PWA aplikácie B1.church](/docs/b1-church/getting-started/installing-pwa)
