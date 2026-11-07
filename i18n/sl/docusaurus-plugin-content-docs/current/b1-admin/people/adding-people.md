---
title: "Dodajanje oseb"
---

# Dodajanje oseb

<div class="article-intro">

Razdelek Osebe je temelj programa B1 Admin in je baza podatkov o članih vaše cerkve. Vse druge funkcije (skupine, prisotnost, darovanja, obrazci) so povezane z zapisi oseb. Ta vodnik vas bo popeljal skozi dodajanje osebe v bazo podatkov, urejanje njenih podatkov in povezovanje družinskih članov v gospodinjstva.

</div>

## Video za usposabljanje

<YouTube id="NTL1UDQpx8s" title="Dodajanje oseb in gospodinjstev v B1" next="Uvoz vaše baze podatkov o osebah v B1" nextUrl="/docs/b1-admin/people/importing-data" />

<div class="prereqs">
<h4>Preden začnete</h4>

- Potrebujete aktiven račun B1 Admin s pravico upravljanja oseb. Če niste prepričani glede svoje ravni dostopa, si oglejte [Vloge in dovoljenja](roles-permissions.md).
- Če dodajate več kot nekaj oseb, razmislite o uporabi orodja [uvoz CSV](importing-data.md).

</div>

## Dodajanje osebe

1. Pojdite na nadzorno ploščo B1.church Admin.
2. Odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno polje na vrhu levo), razširite **Osebe** in kliknite **Osebe**.
3. Kliknite gumb **Dodaj osebo** v glavi strani. Stran se pomakne navzdol do obrazca **Dodaj novo osebo** pod imenikom.
4. Vnesite **Ime**, **Priimek** in **E-pošto** osebe ter kliknite **Dodaj**.

Odprla se bo stran s profilom osebe, kjer lahko dodate več podrobnosti.

:::tip
Če prehajate iz drugega sistema za upravljanje cerkve, vam funkcija [Uvoz podatkov](importing-data.md) omogoča uvoz celotnega imenika iz datoteke CSV. To je veliko hitreje kot dodajanje oseb eno za drugo.
:::

### Opozorila o podvojenih zapisih

Če e-poštni naslov (ali, pri ustvarjanju osebe iz celotnega obrazca Uredi, telefonska številka ali ujemajoče se ime, priimek in datum rojstva) ustreza osebi, ki je že v vaši bazi podatkov, se pred shranjevanjem novega zapisa prikaže pogovorno okno **Možen podvojen zapis**. Navaja vsako ujemajočo se osebo z njeno e-pošto, telefonom in datumom rojstva, da jih lahko primerjate.

- Kliknite **Uporabi obstoječega** poleg ujemanja, da uporabite zapis te osebe namesto ustvarjanja novega.
- Kliknite **Vseeno ustvari**, da dodate novo osebo kljub najdenemu možnemu ujemanju.

To preverjanje se izvede le pri ustvarjanju popolnoma nove osebe. Urejanje obstoječega zapisa nikoli ne sproži opozorila. Preprečuje le nove podvojene zapise; ne združuje dveh že obstoječih zapisov.

## Urejanje podrobnosti

1. Na profilu osebe kliknite gumb **Uredi** pod njenimi kontaktnimi podatki na levi.
2. V obrazcu **Osebni podatki** vnesite dodatne podatke, kot so **Naziv** (izberite Mr, Mrs, Miss, Ms, Dr, Prof, Rev ali Pastor s seznama ali vnesite svojega, do 10 znakov), srednje ime, status članstva (**Obiskovalec**, **Gost**, **Redni obiskovalec**, **Član**, **Zaposleni**, **Neaktiven** ali **Umrl**), datume, naslov, telefonske številke in (za otroke in študente) razred in šolo.
3. Kliknite **Shrani**, da shranite osebne podatke.

Na levi strani profila so prikazani fotografija osebe, ime, status članstva, kontaktni podatki, vrednosti morebitnih [polj po meri](../settings/custom-fields.md) in njeno gospodinjstvo. Pod gospodinjstvom je **Dodano** prikazan datum ustvarjanja zapisa (samo za osebe, dodane od konca oktobra 2026). Kliknite fotografijo, da jo spremenite. Pod gumbom **Uredi** so še nekatera dejanja: **Delovni tok** (dodaj osebo v [delovni tok](../serving/workflows.md)), **Združi**, **Izvozi** in **Izvozi podatke**.

Preostanek profila prikazuje povzetek za vsako vrsto povezanih podatkov:

- **Prisotnost**: prikazuje, na katerih od zadnjih nekaj tednov je oseba bila prisotna, in njene zadnje obiske. Kliknite **Vsa leta** za celotno zgodovino obiskov, vključno s kampusom, bogoslužjem, časom bogoslužja, skupino in stolpcem **Prijavljen** s časom prijave na kiosku (za obiske brez prijave na kiosku je prikazana črtica), ali **Natisni**, da jo natisnete (na izpisu sta logotip in ime vaše cerkve centrirana na vrhu, nad imenom osebe). Za trende prisotnosti za celotno cerkev, ne pa za zgodovino ene osebe, glejte [Spremljanje prisotnosti](../attendance/tracking-attendance.md).
- **Darovanja**: prikazuje letošnje darove, vključno z darovi za nerazpoznavne sklade. Kliknite **Vsa leta** za celotno [zgodovino darovanj](../donations/recording-donations.md) ali **Zabeleži dar**, da zabeležite novega. Če je vaša cerkev vklopila [Zasebnost darovanj](../settings/church-settings.md#giving-privacy), so zneski skriti, dokler ne kliknete **Pokaži darovanja**.
- **Skupine**: našteva [članstva v skupinah](../groups/group-members.md) osebe, z datumom **Pridružil(a) se** pri vsaki skupini, kadar je evidentiran.
- **Opombe**: prikazuje nedavne opombe o osebi (pastoralna skrb, sledenja itd.). Kliknite **Vse opombe**, da preberete in dodate opombe. Vsaka opomba prikazuje, kdo jo je napisal, ter datum in čas objave. Za nedavne opombe vseh oseb hkrati uporabite stran [Opombe](./notes.md).
- **Obrazci**: našteva obrazce osebe in ali je bil vsak oddan (glejte [Delo z obrazci](#working-with-forms) spodaj).

Ko odprete enega od teh celotnih pogledov, kliknite povezavo **Nazaj na** z imenom osebe na vrhu, da se vrnete na profil.

## Pošiljanje e-pošte osebi

Če ima oseba v evidenci naveden e-poštni naslov, se pod njenimi kontaktnimi podatki na levi strani profila prikaže gumb **E-pošta**.

1. Na profilu osebe kliknite **E-pošta**.
2. Odpre se pogovorno okno **E-pošta** z imenom osebe v naslovu, ki prikazuje **Pošiljanje za** z naslovom osebe.
3. Po želji izberite shranjeno predlogo iz **Naloži predlogo (neobvezno)**.
4. Vnesite **Zadevo** in sestavite sporočilo.
5. Kliknite **Pošlji e-pošto**.

Če želite sporočilo napisati v svojem poštnem programu, kliknite **Odpri v moji e-poštni aplikaciji**.

:::info
Pošiljanje iz B1 uporablja iste postopke odobritve in dnevne omejitve kot e-pošta skupin. Če vaša cerkev še ni odobrena, vas pogovorno okno pozove k zahtevi za pregled. Medtem lahko kliknete **Odpri v moji e-poštni aplikaciji**. Glejte [Vklop e-pošte skupin za vašo cerkev](../groups/group-members.md#turning-on-group-email-for-your-church). Uporabniki brez dovoljenja za urejanje članov skupin ob kliku na **E-pošta** neposredno odprejo svojo e-poštno aplikacijo.
:::

## Delo z obrazci

Obrazce po meri lahko izpolnite neposredno iz profila osebe. To so obrazci, ki jih določi uporabnik in jih lahko oblikujete po navodilih v vodniku [Ustvarjanje obrazcev](../forms/creating-forms.md).

1. Na profilu osebe poiščite razdelek **Obrazci**. Navaja vsak obrazec ter ali je bil **Oddan** ali **Ni oddan**.
2. Kliknite ime obrazca, da ga odprete (ali kliknite **Vsi obrazci**, da si ogledate celoten seznam).
3. Kliknite **ikono urejanja** (svinčnik) na obrazcu, izpolnite podrobnosti in kliknite **Shrani**.

Ko je obrazec oddan, kliknite **ikono tiskanja** poleg njega, da natisnete osebne odgovore. Če ima oseba en sam oddan obrazec, je nad odgovori prikazano **Oddano** z datumom.

Če je oddaja pristala pri napačni osebi, kliknite ikono **Spremeni osebo** (dve puščici) poleg nje, da jo premaknete na drugo osebo ali jo odklopite. Glejte [Spreminjanje osebe pri oddaji](../forms/managing-submissions.md#changing-the-person-on-a-submission).

:::info
Obrazci, povezani s profilom osebe, uporabljajo vrsto obrazca **Osebe**. Če potrebujete samostojni obrazec (na primer prijavo na dogodek), glejte [možnost samostojnega obrazca](../forms/creating-forms.md) v vodniku za obrazce.
:::

:::tip
Če morate spremljati le eno ali dve dodatni informaciji o osebah (datum, število ali odgovor da/ne), namesto obrazca uporabite [Polja po meri](../settings/custom-fields.md). Hitreje se izpolnjujejo in jih lahko iščete neposredno v Naprednem iskanju.
:::

## Upravljanje gospodinjstev {#managing-households}

Gospodinjstva omogočajo povezovanje družinskih članov. To je še posebej uporabno za [prijavo na kiosku](../attendance/check-in.md), kjer lahko starš prijavi vse svoje otroke hkrati.

1. Na profilu osebe kliknite **Uredi** poleg naslova **Gospodinjstvo** na levi.
2. Odpre se urejevalnik gospodinjstva. Izberite **vlogo v gospodinjstvu** za trenutno osebo (npr. Glava, Zakonec, Otrok, Drugo).
3. Kliknite ikono **Dodaj**, da dodate drugega člana gospodinjstva.
4. Pod **Dodaj člana gospodinjstva** vnesite ime osebe v iskalno polje in pritisnite **Enter** ali kliknite ikono iskanja. (Preden začnete tipkati, je prikazan kratek seznam **Nedavnih oseb**.)
5. Ko se oseba prikaže med rezultati, kliknite njeno ime ali ikono dodajanja poleg nje.
6. Izberite njeno vlogo v gospodinjstvu in kliknite **Shrani**, da dokončate nastavitev gospodinjstva.
