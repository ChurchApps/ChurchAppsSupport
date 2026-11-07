---
title: "Pregled načrtov"
---

# Pregled načrtov

<div class="article-intro">

Pregled načrtov vam omogoča pogled z ptičje perspektive na vse dodelitve prostovoljcev za več datumov bogoslužij hkrati. Namesto da bi odpirali vsak načrt posebej, lahko v eni mreži vidite, kdo služi na vsakem položaju v prihodnjih tednih, in hitro opazite vrzeli, ki jih je še treba zapolniti.

</div>

<div class="prereqs">
<h4>Preden začnete</h4>

- Ustvarite vsaj eno službo (Ministry) in vrsto načrta v območju Služenje
- Ustvarite [servisne načrte](./plans.md) z datumi in dodelitvami prostovoljcem
- Poskrbite, da so vaši prostovoljci dodani v [imenik oseb](../people/adding-people.md)

</div>

## Dostop do pregleda

1. V programu B1 Admin odprite [meni Jump](../introduction.md#getting-around-with-the-jump-menu) (iskalno vrstico v zgornjem levem kotu), razširite **Služenje** in kliknite **Načrti**.
2. Na vrhu strani izberite **zavihek službe**.
3. Kliknite **Pregled** poleg vrste načrta na seznamu **Vrste načrtov** ali odprite vrsto načrta in kliknite **Pregled** na vrhu strani.

Pregled zajema vrsto načrta, iz katere ste ga odprli. Kliknite ime vrste načrta na vrhu pregleda, da se vrnete na njen seznam načrtov.

## Branje mreže pregleda

Pregled prikazuje mrežo, kjer:

- **Vrstice** predstavljajo vsak položaj (npr. "Glasba: Kitara", "Tehnika: Projekcija"), razvrščen po kategorijah
- **Stolpci** predstavljajo prihodnje datume bogoslužij (npr. "14. apr", "21. apr")
- **Celice** prikazujejo ime prostovoljca, dodeljenega temu položaju na tem datumu

Celice, označene z **rdečo**, so nezapolnjene, kar pomeni, da prostovoljec še ni dodeljen. Tako lahko na prvi pogled vidite vrzeli v zasedenosti, ne da bi odpirali vsak načrt posebej.

:::tip
Imena prostovoljcev so prikazana v skrajšani obliki (ime in prva črka priimka, npr. "Janez K."), da mreža ostane pregledna, ko imate veliko položajev.
:::

## Neposredno dodeljevanje prostovoljcev iz pregleda

Za zapolnjevanje praznih mest ni treba odpirati posameznih načrtov. Kliknite katero koli celico v mreži, da odprete panel za dodelitev za ta položaj in datum. Tam lahko:

- Izberete osebo iz vaše ekipe, ki jo želite dodeliti na položaj
- Kliknete **Odstrani** poleg osebe, ki je že dodeljena, da jo odstranite s tega mesta
- Shranite spremembo, ne da bi zapustili pregled

Tako lahko zasedete celoten urnik v enem prehodu: delate čez tedne in položaje, ne da bi se premikali v posamezne načrte in iz njih.

## Samodejno razporejanje iz pregleda

Kliknite **Samodejno razporedi**, da B1 zapolni vsa odprta, nezapolnjena mesta v trenutni mreži naenkrat. Za vsak prikazani načrt poišče kandidate iz skupine, povezane z vsakim položajem, samodejno zapolni prazna mesta in poroča, koliko prikazanih načrtov je uspel zapolniti. Načrti se zapolnjujejo enega za drugim, da isti prostovoljec v istem prehodu ne bi bil dvojno rezerviran za dva datuma.

:::info
Samodejno razporejanje zapolni samo že prazna mesta. Nikoli ne nadomesti obstoječe dodelitve.
:::

## Pošiljanje e-pošte vsem razporejenim

Kliknite **Pošlji e-pošto prostovoljcem**, da v enem dejanju pošljete obvestilo vsakemu prostovoljcu, dodeljenemu kjerkoli v trenutno filtriranem datumskem obdobju in službi, namesto da bi pošiljali po načrtih. B1 poroča, koliko e-poštnih sporočil je bilo poslanih in koliko jih ni uspelo.

## Pošiljanje SMS-sporočil vsem razporejenim

Če je vaša cerkev povezana s [ponudnikom SMS-sporočil](../settings/church-settings.md#texting) in lahko urejate načrte ter pošiljate sporočila, se na vrhu pregleda prikaže gumb **Pošlji SMS prostovoljcem**.

1. Kliknite **Pošlji SMS prostovoljcem**.
2. Pogovorno okno prikaže, koliko prostovoljcev bo prejelo sporočilo (npr. "12 od 14 prostovoljcev bo prejelo to sporočilo"), ter koliko se jih je odjavilo od sporočil in koliko nima vpisane telefonske številke.
3. Vpišite **Sporočilo**. Kliknete lahko na nadomestno mesto, da vstavite ime posameznega prostovoljca ali ime vaše cerkve.
4. Kliknite **Pošlji**. B1 poroča, koliko sporočil je bilo poslanih.

Vsak prostovoljec, dodeljen v datumskem obdobju, prejme eno sporočilo na mobilno številko v svojem profilu, tudi če služi na več datumih. Osebe, ki si delijo telefonsko številko (na primer družinski telefon), prejmejo samo eno sporočilo. Prostovoljci, ki so na prejšnje sporočilo odgovorili STOP, so preskočeni.

:::info
Sporočila so poslana prek SMS-ponudnika vaše cerkve, zato veljajo njegove cene. Če vaši cerkvi zmanjka kreditov za SMS, se pošiljanje ustavi in pogovorno okno vas o tem obvesti. Ena pošiljka doseže največ 200 prostovoljcev; če jih imate več, zožite datumsko obdobje.
:::

## Označevanje urnika prostovoljca

S spustnim seznamom **Označi** izberite osebo iz vaše ekipe. Vsaka celica, kjer je ta oseba dodeljena, bo označena v mreži, tako da lahko pred dodelitvijo na drug položaj vidite, kje že služi. Izberite **Vsi**, da označevanje izklopite.

## Filtriranje pregleda

Prikaz pregleda lahko prilagodite z nastavitvami nad mrežo. Mreža se posodobi takoj, ko jih spremenite.

- **Vsi položaji / Samo nezapolnjeni**: Izberite **Samo nezapolnjeni**, da skrijete vrstice, kjer so vsi datumi že zapolnjeni, in se tako osredotočite le na položaje, ki še potrebujejo prostovoljca.
- **Datum začetka / Datum konca**: Privzeto pregled prikazuje 12 tednov v prihodnost. Vnesite lastne datume, da razširite ali zožite obdobje.

## Izvoz v CSV

Kliknite **Izvozi CSV**, da prenesete trenutno mrežo kot preglednico. Izvoz vključuje vse položaje in dodelitve prostovoljcev za filtrirano datumsko obdobje, kar omogoča enostavno deljenje z vodji služb ali tiskanje za načrtovalne sestanke.

:::info
Izvoz CSV upošteva filtre, ki so trenutno uporabljeni. V prenos so vključeni le datumi in vrsta načrta, prikazani v mreži.
:::

## Sorodni članki

- [Servisni načrti](./plans.md): ustvarjanje in upravljanje posameznih servisnih načrtov
- [Vrstni red bogoslužja](./service-order.md): sestavljanje vrstnega reda bogoslužja v načrtu
- [Načrtovanje lekcij](./scheduling-lessons.md): načrtovanje lekcij skupaj s servisnimi načrti
