---
title: "Razpoložljivostni koledar"
description: "Nastavite sobe in opremo za rezervacije v B1 Admin, dodajte zaloge za pripravo in počistitev ter upravljajte ponavljajoče se rezervacije."
---

# Razpoložljivostni koledar

<div class="article-intro">

Razpoložljivostni koledar vam ponuja pregled vseh rezervacij sob in virov v vaši cerkvi. Tukaj lahko vidite, kaj je načrtovano, pravočasno odkrijete morebitne konflikte in neposredno rezervirate sobo ali vir za poljuben dogodek.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- V razdelku Sobe in viri nastavite vsaj eno [sobo ali vir](./rooms-resources.md)
- Potrebujete dostop za urejanje razdelka Koledarji v aplikaciji B1 Admin

</div>

## Odpiranje razpoložljivostnega koledarja

V aplikaciji B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na vrhu levo), razširite **Koledarji** in kliknite **Razpoložljivost**.

## Branje koledarja

Koledar privzeto prikazuje tekoči mesec. Med meseci se premikate s puščicama na vrhu ali preklapljate med pogledi za mesec, teden in dan.

Vsak dogodek je obarvan glede na stanje rezervacije:

| Barva | Pomen |
|-------|-------|
| Zelena | Odobreno |
| Oranžna | Čaka na odobritev |
| Siva | Blokirano (ni na voljo) |

Če se z miško premaknete nad dogodek, se prikažeta naslov dogodka ter soba ali vir, na katerega je vezan.

## Filtriranje po sobi ali viru

Za prikaz koledarja samo za eno sobo ali vir uporabite spustni seznam **Soba / Vir** na vrhu levo. Če želite spet videti celoten pregled, izberite **Vse sobe in viri**.

## Rezervacija sobe ali vira

1. Na vrhu strani kliknite gumb **Rezerviraj**.
2. V oknu, ki se odpre, vnesite podrobnosti dogodka:
   - **Naslov** — ime dogodka
   - **Začetek** in **Konec** — datum in ura
   - **Vidnost** — Javno ali Zasebno
   - **Sobe** — izberite eno ali več sob, ki jih želite rezervirati
   - **Viri** — izberite enega ali več virov, ki jih želite rezervirati
3. Po želji nastavite čas **Priprave** in **Razgradnje** (v minutah). Ti časi podaljšajo rezervacijo na obeh straneh, tako da je prostor rezerviran tudi za pripravo in čiščenje, čas začetka in konca dogodka pa ostane enak.
4. Če želite rezervacijo ponavljati, označite **Ponavljanje** in nastavite pravila ponavljanja:
   - **Ponovi vsake** -- nastavite interval (na primer vsake 2 tedna).
   - **Pogostost** -- Dnevno, Tedensko ali Mesečno. Pri tedenskem ponavljanju izberete določen dan oz. dneve v tednu; pri mesečnem pa določen dan v mesecu ali relativni vzorec, na primer »drugi torek«.
   - **Konča se** -- Nikoli, na določen datum ali po določenem številu ponovitev.
5. Če želite določiti posebno časovno okno rezervacije (drugačno od začetka in konca dogodka), vklopite **Posebno časovno okno rezervacije** in vnesite začetek in konec okna. To uporabite, kadar mora biti soba dostopna tudi zunaj objavljenega časa dogodka.
6. Kliknite **Shrani**, da oddate rezervacijo.

:::info
Če je pri sobi ali viru nastavljena **Skupina za odobritev**, bo rezervacija prikazana kot **Čaka**, dokler je ne odobri vodja te skupine. Postopek odobritve je opisan v članku [Odobritve koledarja](./approvals.md).
:::

:::tip
Koledar bo pred shranjevanjem označil morebitne konflikte. Če se prikaže opozorilo o konfliktu, prilagodite čas ali izberite drugo sobo.
:::

## Sorodni članki

- [Sobe, viri in načrtovanje](./rooms-resources.md) — nastavitev prostorov in opreme, ki jih je mogoče rezervirati
- [Odobritve koledarja](./approvals.md) — odobritev ali zavrnitev zahtevkov za rezervacijo
- [Ustvarjanje koledarjev](./creating-calendars.md) — upravljanje koledarjev dogodkov
