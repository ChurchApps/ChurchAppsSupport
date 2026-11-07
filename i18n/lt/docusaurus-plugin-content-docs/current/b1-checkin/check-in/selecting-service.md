---
title: "Vyriausiųjų paslaugų pasirinkimas"
description: "Pasirinkite pamaldas, kuriose dalyvaujate, B1 Checkin paslaugų ekrane; tai nustato pamaldų laikus ir grupes visai tolesnei registracijai."
---

# Paslaugos pasirinkimas

<div class="article-intro">

Pirmasis kiekvieno registracijos žingsnis – pasirinkti, kurią pamaldų paslaugą lankote. Paslaugų ekranas atsiranda iškart po to, kai programa baigia įsikrauti, ir nustato, kokie paslaugų laikai ir grupės bus prieinami visam tolesniam registracijos procesui.

</div>

<div class="prereqs">
<h4>Prieš pradedant</h4>

- [Prisijunkite](../getting-started/logging-in.md) prie B1 Church Checkin programos ir pasirinkite savo bažnyčią
- Įsitikinkite, kad jūsų bažnyčios administratorius B1 Admin sistemoje yra [sukonfigūravęs paslaugas ir paslaugų laikus](../../b1-admin/attendance/setup.md)

</div>

## Kaip tai veikia

1. Prisijungus (arba po automatinio prisijungimo kitų apsilankymų metu), programa rodo **paslaugų ekraną**.
2. Pamatysite visų jūsų bažnyčiai sukonfigūruotų paslaugų sąrašą. Kiekviena paslauga rodoma kaip kortelė, kurioje nurodomas paslaugos pavadinimas (pavyzdžiui, „Sekmadienio rytas“ arba „Trečiadienio vakaras“).
3. Palieskite paslaugą, kurioje dalyvausite.

Programa įkelia su ta paslauga susijusius paslaugų laikus ir grupes, o tada perkelia jus į [narių paieškos ekraną](./looking-up-members.md).

## Kai registracija neatidaryta

Jei jūsų administratorius paslaugos laikui nustatė [registracijos tvarkaraštį](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule), programa leidžia šeimoms pasirinkti tą paslaugos laiką tik tada, kai jo registracijos langas yra atviras. Paslaugų laikai, kurių langas šiuo metu uždarytas, vis dar rodomi [namų ūkio ekrane](./household-review.md), tačiau jie pažymėti **Uždaryta** (pavyzdžiui, **Uždaryta · atsidaro sekm. 9:30**), o ne rodomas grupės mygtukas.

Jei visi paslaugos, kurią palietėte, laikai yra uždaryti, programa praneša, kada registracija atsidarys – pavyzdžiui, **„Registracija šiai paslaugai atsidaro sekm. 9:30“.** (Jei atidarymo laiko parodyti negalima, rodoma žinutė **„Šiai paslaugai registracija šiuo metu neatidaryta.“**) Palieskite **Atgal**, kad grįžtumėte į paslaugų sąrašą ir pasirinktumėte kitą paslaugą, arba palaukite, kol langas atsidarys, ir bandykite dar kartą.

:::info
Registracijos langai seka paslaugos kampuso laiko juostą. Jei tam kampusui laiko juosta nenustatyta, naudojama jūsų bažnyčios laiko juosta. Jei paslaugos laikas, rodosi, atsidaro ne tuo valandos metu, paprašykite administratoriaus patikrinti laiko juostą kampuso arba bažnyčios nustatymuose. Namų ūkio ekrane kioskas paslaugų laikus atidarymui ir uždarymui taip pat naudoja planšetinio kompiuterio laikrodį, todėl įsitikinkite, kad planšetė nustatyta teisingu laiku ir laiko juosta.
:::

:::info
Paslaugas jūsų bažnyčios administratorius konfigūruoja B1 Admin sistemoje, skyriuje Lankomumas. Jei nematote paslaugos, kurios tikitės, paprašykite administratoriaus patikrinti, ar ji sukurta, [lankomumo sąrankoje](../../b1-admin/attendance/setup.md).
:::

## Kas vyksta užkulisiuose

Pasirinkus paslaugą, programa iš serverio gauna tris dalykus:

- Tos paslaugos **paslaugų laikus** (pavyzdžiui, viena paslauga gali turėti 9:00 ir 11:00 laiko intervalus).
- **Grupes**, prieinamas kiekvienu paslaugos laiku (pavyzdžiui, Kūdikių kambarys, Ikimokyklinė, Pradinukai).
- **Grupių ir paslaugos laikų ryšius**, nustatančius, kurios grupės prieinamos kuriuo laiku.

Šie duomenys saugomi vietoje, todėl likęs registracijos procesas veikia greitai ir reaguoja į veiksmus.

:::tip
Jei jūsų bažnyčioje sukonfigūruota tik viena paslauga, vis tiek turite ją palieti, kad tęstumėte. Programa automatiškai nepasirenka vienintelės paslaugos.
:::

## Kitas žingsnis

Pasirinkę paslaugą, [surasite savo šeimą](./looking-up-members.md) pagal telefono numerį arba vardą.
