---
title: "Subsplash"
description: "Povežite darove, nove osebe in odgovore obrazcev Subsplash z B1 prek Zapier, da se darila in profili samodejno prenesejo v B1 Admin."
---

# Subsplash

<div class="article-intro">

Če za aplikacijo za cerkev, darovanja ali obrazce uporabljate Subsplash, za evidenco ljudi in donacij pa želite uporabljati B1, lahko Subsplashova aplikacija za Zapier donacije, nove profile in odgovore na obrazce v realnem času prenaša v B1. Upoštevajte, da Subsplashova aplikacija za Zapier trenutno podpira **samo sprožilce** — povezava deluje le v eno smer (Subsplash → B1).

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Račun Subsplash z načrtom, ki vključuje dostop do **API + Zapier** (pri svojem upravitelju uspeha strank pri Subsplashu preverite, saj je to odvisno od ravni načrta)
- Račun [Zapier](https://zapier.com)
- Uporabnik B1Admin z dovoljenjem **Edit Settings**

</div>

## Kaj lahko povežete

Vsi spodnji sprožilci so iz Subsplasha. Dejanja so iz B1.

| Sprožilec v Subsplash | Dejanje v B1 |
|---|---|
| Novo darilo | Poišči osebo → Dodaj donacijo (Ustvari osebo, če manjka) |
| Nova obljuba | Dodaj donacijo (z `notes` = "Pledge: …") |
| Ustvarjena nova oseba | Ustvari osebo |
| Oseba posodobila profil | (ni neposrednega dejanja v B1 — zabeležite v Google Sheet za ročni pregled) |
| Nov odgovor na obrazec | Ustvari osebo + (po želji) Dodaj člana skupine glede na obrazec |

Smer Subsplash → B1 je trenutno edina, ki jo Subsplashova aplikacija podpira.

## Nastavitev

### 1. Ustvarite API ključ za B1

V B1Admin: **Nastavitve → Razvijalec → API ključi → Nov API ključ**. Dovoljenja:

- `people:read` — za iskanje darovalca po e-poštnem naslovu
- `people:write` — za ustvarjanje, če darovalec še ne obstaja
- `donations:write` — za beleženje darila
- (`settings:write` ni potreben — sprožilec tukaj upravlja Subsplash, ne B1.)

### 2. Povežite Subsplash z Zapier

Sledite [Subsplashovemu vodniku za integracijo z Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration). Žeton API vam izda Subsplash v nadzorni plošči Subsplash; Zapier ga uporablja za overjanje strani sprožilca.

### 3. Ustvarite Zap za »beleženje darila«

1. **Sprožilec** — Subsplash: Novo darilo
2. **Dejanje** — B1.church: Poišči osebo (po e-pošti)
3. **Filter / pot** — razvejite glede na »oseba najdena«:
   - **Najdena:** B1.church: Dodaj donacijo. Preslikajte znesek, datum, sklad, način = "Online" in opombe = ID transakcije Subsplash.
   - **Ni najdena:** B1.church: Ustvari osebo → B1.church: Dodaj donacijo (z ID-jem pravkar ustvarjene osebe).

Vklopite Zap. Prihodnje donacije iz Subsplasha se bodo v nekaj sekundah prikazale v **B1Admin → Donacije**.

## Pogosti recepti

### Pošljite zahvalo ob prvem daru

- **Sprožilec** — Subsplash: Novo darilo
- **Dejanje** — Filter v Zapierju: nadaljuj samo, če gre za prvo darilo darovalca (uporabite *Lookup Table* za e-poštni naslov darovalca v Google Sheet s seznamom prejšnjih darovalcev ali korak Zapier *Paths* glede na datum ustvaritve darovalca)
- **Dejanje** — Mailchimp / SMTP / SendGrid: pošljite zahvalno sporočilo za prvo darilo
- **Dejanje** — B1.church: Dodaj donacijo (kot običajno)

### Ločite obljube od rednega darovanja

- **Sprožilec** — Subsplash: Nova obljuba
- **Dejanje** — B1.church: Dodaj donacijo z `notes = "Pledge — Subsplash"` in skladom z imenom `Pledges` (ločenim od vašega operativnega sklada), da lahko obljube ločeno poročate v **B1Admin → Donacije → Povzetek**.

### Sinhronizirajte nove uporabnike aplikacije kot osebe v B1

- **Sprožilec** — Subsplash: Ustvarjena nova oseba
- **Dejanje** — B1.church: Ustvari osebo, z vnosom imena, e-pošte in telefona. Označite jo v B1 tako, da novo osebo dodate v skupino, na primer »Uporabniki aplikacije Subsplash«.

## Omejitve in opombe

- **Subsplashova aplikacija za Zapier podpira samo sprožilce.** Če želite, da se spremembe iz B1 prenesejo tudi v Subsplash (na primer, da se nova oseba iz B1 pojavi tudi v Subsplashu), boste morali zgraditi to povezavo prek sprožilcev v Zapierjevi aplikaciji za B1, ki kličejo REST API Subsplasha prek dejanja *Webhooks by Zapier — POST*. Gre za prilagojeno integracijo, ne za pripravljen recept.
- **API dostop je odvisen od načrta.** Če povezava z Zapier ne uspe z `403 Forbidden`, vaš načrt Subsplash verjetno ne vključuje dostopa do API-ja — obrnite se na upravitelja uspeha strank.
- **Preslikava skladov je ročna.** Subsplash posreduje ime kampanje ali kategorije, B1 pa potrebuje številski ID sklada. Sklad lahko fiksno vnesete v Zap ali pa vzdržujete *Lookup Table* v Zapierju, ki kampanje Subsplash preslika v sklade B1.

## Odpravljanje težav

- **Po donaciji se ne sproži noben sprožilec** — v nadzorni plošči Subsplash za Zapier preverite, ali povezava še vedno kaže *Connected*. Če je bil žeton API na strani Subsplasha zamenjan, se Zap tiho ustavi; ponovno ga povežite.
- **B1 *Dodaj donacijo* ne uspe z 422** — najpogosteje manjka `fundId` ali pa ni prepoznan. Seznam skladov poiščite v **B1Admin → Donacije → Skladi** in točen ID vnesite v korak Zap.
- **Prvo darilo sproži dvakrat** — Subsplash včasih ponovno pošlje sprožilec, če Zapier ni potrdil prejema. Dodajte *Filter by Zapier* za ID donacije (Subsplash ga pošilja v podatkih), da odstranite podvojene zapise.

## Glejte tudi

- [Donorbox](./donorbox.md) — enak način receptov, drugačna platforma za donacije
- [Zapier (pregled)](../zapier.md) — stran B1 za vse recepte Zapier
- [Subsplashov vodnik za integracijo z Zapier](https://support.subsplash.com/en/articles/9825926-zapier-integration) (dokumentacija Subsplash)
