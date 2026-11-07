---
title: "Izbira storitve"
---

# Izbira storitve

<div class="article-intro">

Prvi korak vsake prijave je izbira storitve, ki jo obiskujete. Zaslon s storitvami se prikaže takoj po naložitvi aplikacije in določa, kateri časi storitev in skupine so na voljo za preostanek postopka prijave.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- [Prijavite se](../getting-started/logging-in) v aplikacijo B1 Church Checkin in izberite svojo cerkev
- Preverite, ali je vaš cerkveni skrbnik [nastavil storitve in čase storitev](../../b1-admin/attendance/setup.md) v aplikaciji B1 Admin

</div>

## Kako deluje

1. Po prijavi (ali po samodejni prijavi pri ponovnih obiskih) aplikacija prikaže **zaslon storitev**.
2. Prikaže se seznam vseh storitev, ki so nastavljene za vašo cerkev. Vsaka storitev je prikazana kot kartica z imenom storitve (na primer „Nedeljsko jutro“ ali „Sredinski večer“).
3. Tapnite storitev, ki jo obiskujete.

Aplikacija naloži čase storitev in skupine, povezane s to storitvijo, nato pa vas preusmeri na [zaslon iskanja članov](./looking-up-members).

## Ko prijava ni odprta

Če je vaš skrbnik času storitve dodelil [urnik prijave](../../b1-admin/attendance/setup#setting-a-check-in-schedule), aplikacija družinam dovoli izbrati ta čas storitve samo, ko je njegovo okno za prijavo odprto. Časi storitev, katerih okno je trenutno zaprto, se še vedno prikažejo na [zaslonu gospodinjstva](./household-review), vendar so označeni z **Zaprto** (na primer **Zaprto · odpre se ned 9:30**) in ne ponujajo gumba za skupino.

Če so vsi časi za storitev, ki ste jo tapnili, zaprti, vas aplikacija obvesti, kdaj se prijava odpre – na primer **„Prijava za to storitev se odpre ned 9:30.“** (Če časa odprtja ni mogoče prikazati, piše **„Prijava za to storitev trenutno ni odprta.“**) Tapnite **Nazaj**, da se vrnete na seznam storitev in izberete drugo storitev, ali počakajte, da se okno odpre, in poskusite znova.

:::info
Okna za prijavo sledijo časovnemu pasu kampusa storitve. Če kampus nima nastavljenega časovnega pasu, se uporabi časovni pas vaše cerkve. Če se zdi, da se čas storitve odpre ob napačni uri, prosite skrbnika, naj preveri časovni pas v nastavitvah kampusa ali cerkve. Na zaslonu gospodinjstva kiosk za odpiranje in zapiranje časov storitev uporablja tudi uro tablične naprave, zato poskrbite, da bo tablica nastavljena na pravilen čas in časovni pas.
:::

:::info
Storitve nastavi skrbnik vaše cerkve v aplikaciji B1 Admin v razdelku Udeležba. Če storitve, ki jo pričakujete, ne vidite, prosite skrbnika, naj preveri, ali je bila ustvarjena v [nastavitvah udeležbe](../../b1-admin/attendance/setup.md).
:::

## Kaj se dogaja v ozadju

Ko izberete storitev, aplikacija s strežnika pridobi tri stvari:

- **Časi storitev** za to storitev (na primer ima lahko ena storitev termin ob 9:00 in termin ob 11:00).
- **Skupine**, ki so na voljo ob vsakem času storitve (na primer Vrtec, Predšolski otroci, Osnovnošolski otroci).
- **Povezave med skupinami in časi storitev**, ki določajo, katere skupine so na voljo ob katerih časih.

Ti podatki se shranijo lokalno, da je preostanek postopka prijave hitrejši in odziven.

:::tip
Če vaša cerkev nima nastavljene nobene druge storitve, morate še vedno tapniti storitev, da nadaljujete. Aplikacija ne izbere samodejno edine storitve.
:::

## Naslednji korak

Ko izberete storitev, boste [poiskali svojo družino](./looking-up-members) po telefonski številki ali imenu.
