---
title: "Lokacije"
---

# Lokacije

<div class="article-intro">

Če se vaša cerkev zbira na več kot eni lokaciji, vam **Lokacije** omogočajo, da spremljate, h kateremu mestu pripada vsaka oseba in skupina. Ko so lokacije nastavljene, se prikažejo kot možnost v profilih oseb, pri nastavitvah obiskov in na nadzorni plošči Demografija. Cerkve z več lokacijami lahko v celotnem B1 Admin filtrirajo, iščejo in ustvarjajo poročila po lokaciji.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Za upravljanje lokacij potrebujete dovoljenje **Uredi nastavitve cerkve**. Glejte [Vloge in dovoljenja](./roles-permissions.md).

</div>

## Odpiranje nastavitev lokacij

V B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje v zgornjem levem kotu), izberite **Settings > Settings** in v seznamu na levi kliknite **Campuses**, da se pomaknete do razdelka **Campuses**. Do njega lahko pridete tudi neposredno na **/settings/campuses**. Prikazan bo seznam vseh nastavljenih lokacij z imenom, naslovom in časovnim pasom.

## Dodajanje lokacije

1. Kliknite **Add Campus**.
2. Vnesite podrobnosti o lokaciji:
   - **Name** *(obvezno)* — prikazno ime, ki se pojavlja v celotnem B1 Admin (na primer „Glavna lokacija“ ali „Severna lokacija“).
   - **Address** — ulični naslov lokacije (uporablja se za informativni prikaz; ni enak glavnemu naslovu cerkve v Nastavitvah cerkve).
   - **City / State / Zip** — kraj lokacije.
   - **Time Zone** — časovni pas IANA za to lokacijo (na primer *America/Chicago*). [Urniki prijave](../attendance/setup.md#setting-a-check-in-schedule) za bogoslužja na tej lokaciji se odpirajo in zapirajo v tem časovnem pasu. Če je nastavljeno na **None**, se namesto tega uporabi [časovni pas](./church-settings.md#time-zone) vaše cerkve. Uporabno, kadar so lokacije v različnih časovnih pasovih.
   - **Website** — neobvezen URL spletne predstavitve te lokacije.
3. Kliknite **Save**.

## Urejanje lokacije

Kliknite katerokoli vrstico lokacije v seznamu, da odprete urejevalnik v desnem podoknu. Posodobite polja in kliknite **Save**.

## Brisanje lokacije

Odprite lokacijo za urejanje in kliknite **Delete**. Potrdite lahko zahtevate. Brisanje lokacije ne odstrani oseb, ki so ji dodeljene; njihovo polje za lokacijo se preprosto izprazni.

## Dodeljevanje oseb lokaciji

Ko ustvarite lokacije, lahko sodelavci osebo dodelijo lokaciji iz njenega profila:

1. Odprite zapis osebe v **People**.
2. Kliknite **Edit**.
3. V spustnem meniju **Campus** izberite lokacijo.
4. Kliknite **Save**.

Lokacijo lahko posodobite tudi hkrati za več oseb na strani People. Izberite več oseb, uporabite **Bulk Edit** in nastavite polje Campus za vse naenkrat.

## Filtriranje po lokaciji

Ko so lokacije nastavljene, lahko v celotnem B1 Admin filtrirate po lokaciji:

- **Iskanje oseb** — dodajte pogoj Campus v napredno iskanje ali naložite [shranjen seznam](../people/lists.md), omejen na določeno lokacijo.
- **Demografija** — [nadzorna plošča Demografija](../people/demographics.md) prikaže krožni grafikon Campus, ko je vsaj eni osebi dodeljena lokacija.
- **Nastavitve obiskov** — vsak termin bogoslužja v razdelku Attendance je lahko povezan z lokacijo.

:::tip
Cerkve z eno lokacijo ni treba nastavljati lokacij. Vse funkcije lokacij so neobvezne — če lokacije ne obstajajo, se polja in grafikoni za lokacije preprosto ne prikažejo.
:::

## Sorodni članki

- [Nastavitve cerkve](./church-settings.md) — glavni naslov vaše cerkve in blagovna znamka (ločeno od naslovov lokacij)
- [Demografija](../people/demographics.md) — grafikon razčlenitve po lokacijah
- [Nastavitve obiskov](../attendance/setup.md) — povežite termine bogoslužij z lokacijo
- [Množično urejanje](../people/bulk-editing.md) — hkratno dodeljevanje lokacije več osebam
