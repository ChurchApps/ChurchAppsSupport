---
title: "El. pašto šablonai"
description: "Nustatykite el. laiškų ir SMS šablonus B1 Admin su laukais, teksto parinktimis ir peržiūromis masinei komunikacijai."
---

# El. pašto šablonai

<div class="article-intro">

El. pašto šablonai leidžia išsaugoti pakartotinai naudojamą el. laiško turinį -- sveikinimo žinutę, renginio priminimą, padėkos už auką laišką -- kad galėtumėte jį (arba [darbo eigą](../serving/workflows.md)) išsiųsti vienu paspaudimu, o ne rašyti nuo nulio kiekvieną kartą. Tame pačiame sąraše taip pat saugomi teksto žinučių šablonai grupių ir asmenų teksto langams.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- Jums reikia prieigos prie nustatymų srities B1 Admin.

</div>

## Prieiga prie el. pašto šablonų

1. B1 Admin programoje atidarykite [Greitojo perėjimo meniu](../introduction.md#getting-around-with-the-jump-menu) (paieškos juosta viršuje kairėje) ir išskleiskite **Settings** (Nustatymai).
2. Spustelėkite **Email Templates** (El. pašto šablonai).
3. Pamatysite esamų šablonų sąrašą su jų tema, kategorija ir paskutinio keitimo data.

## Šablono kūrimas

1. Spustelėkite **New Template** (Naujas šablonas).
2. Įveskite **Template Name** (Šablono pavadinimą), kad galėtumėte jį atpažinti sąraše, ir pasirinkite **Category** (Kategoriją) (General, Events, Groups, Giving, Welcome arba Text), kad padėtumėte tvarkyti šablonus. Jei norite sukurti teksto žinutės šabloną, pasirinkite **Text** (žr. toliau [Teksto šablonai](#text-templates)).
3. Įveskite **Subject** (Temą).
4. Parašykite **Body** (Turinį) naudodami teksto redaktorių.
5. Spustelėkite **Save** (Išsaugoti).

## Laukų įterpimas

Spustelėkite laukelį su įterpiamu lauku virš temos ar turinio, kad jis būtų įterptas į žymeklio vietą -- pirmiausia spustelėkite tekste, kur norite lauko, tada spustelėkite laukelį. Žymeklis lieka vietoje, todėl galite iš karto toliau rašyti po įterpto lauko. Jei spustelėsite turinio laukelį nespustelėję turinio teksto, laukas bus pridėtas turinio pabaigoje. Išsiuntus el. laišką, kiekvienas laukas pakeičiamas tikrąja gavėjo informacija:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- Gavėjo vardas ir pavardė
- `{{email}}` -- Gavėjo el. pašto adresas
- `{{churchName}}` -- Jūsų bažnyčios pavadinimas

## Teksto šablonai

Šablonas su kategorija **Text** yra paprastos teksto žinutė, skirta siųsti SMS, o ne el. laišką:

- Jis neturi temos. Teksto redaktorių pakeičia paprastas laukas **Text Message** (Teksto žinutė), kuriame telpa iki 1 600 simbolių.
- Laukelių su įterpiamais laukais virš lauko įterpiami `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` arba `{{churchName}}` į žymeklio vietą.
- Teksto šablonai rodomi **Load Template (optional)** (Įkelti šabloną, neprivaloma) pasirinkime teksto lange, skirtame [grupei](../groups/group-members.md#texting-group-members) arba vienam asmeniui. Pasirinkus šabloną, žinutė užpildoma, o prieš siunčiant ją dar galite redaguoti.
- Jie neįtraukiami į el. pašto šablonų pasirinkimus, įskaitant darbo eigos veiksmą **Send email** (Siųsti el. laišką).

Teksto žinutes galima siųsti tik prijungus [teksto žinučių paslaugos teikėją](./church-settings.md#texting).

## Šablono peržiūra

Spustelėkite **Preview** (Peržiūra), kad prieš išsaugodami ar siųsdami pamatytumėte, kaip atrodys tema ir turinys, kai laukai bus užpildyti pavyzdiniais duomenimis.

## Šablono naudojimas

Išsaugotus šablonus galima pasirinkti rašant el. laišką asmenims ar grupei, taip pat kaip veiksmą [darbo eigose](../serving/workflows.md). Kad jūsų bažnyčia galėtų juos siųsti, ComunityChurchApps komanda vieną kartą turi patvirtinti grupinių el. laiškų naudojimą. Žr. [Grupinių el. laiškų įjungimas jūsų bažnyčiai](../groups/group-members.md#turning-on-group-email-for-your-church).

## Redagavimas ir trynimas

Spustelėkite šalia šablono esančią piktogramą **Edit** (Redaguoti), kad atnaujintumėte šabloną, arba piktogramą **Delete** (Ištrinti), kad jį visam laikui pašalintumėte.

## Kiti žingsniai

- [Darbo eigos](../serving/workflows.md) -- Automatiškai paleisti šablono el. laišką pagal taisykles
