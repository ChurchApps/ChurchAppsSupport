---
title: "Pagsusuri ng Iyong Household"
---

# Pagsusuri ng Iyong Household

<div class="article-intro">

Pagkatapos mong pumili ng tao mula sa mga resulta ng paghahanap, ilo-load ng app ang buong household mo at ipapakita ito sa household review screen. Ito ang sentro ng proseso ng check-in kung saan makikita mo ang lahat ng kasama sa pamilya at maipamamahala ang kanilang mga pagtatalaga sa grupo bago mag-check in.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- [Pumili ng serbisyo](./selecting-service) mula sa services screen
- [Hanapin ang miyembro](./looking-up-members) at piliin siya mula sa mga resulta ng paghahanap

</div>

## Pagtingin sa Mga Miyembro ng Household

Bawat miyembro ng household ay lumalabas bilang isang card na may:

- Kanilang **larawan** (o placeholder icon kung walang larawang nakatala)
- Kanilang **display name**
- Isang **buod ng kasalukuyang pagtatalaga nila sa grupo** (ipinapakita bilang maliliit na chip sa ilalim ng pangalan kapag nakatiklop ang card)
- Isang **expand/collapse arrow** sa kanang bahagi

## Pagbubukas ng Miyembro

I-tap ang card ng miyembro para buksan ito. Kapag nakabukas, makikita mo ang isang row para sa bawat **service time** sa loob ng napiling serbisyo, mula sa pinakamaaga. Inaayos ang mga service time ayon sa nakatakdang araw at oras ng simula kapag may naitakda, kung hindi ay ayon sa oras na nasa kanilang pangalan (kaya nauuna ang "9:00 AM" sa "10:30 AM"); ang mga service time na walang oras sa pangalan ay nasa dulo, ayon sa alpabeto. Ipinapakita ng bawat row ang:

- Ang **pangalan ng service time** (halimbawa, "9:00 AM" o "11:00 AM")
- Ang **mga grupong inaalok** sa service time na iyon, nakalista sa ilalim ng pangalan (halimbawa, "Nursery, Preschool, Adult Bible Class"), para makita mo kung aling mga klase ang available bago ka pumili
- Isang **button** na nagpapakita ng kasalukuyang nakatalagang grupo, o "Select Group" kung wala pang naitalagang grupo

Kung may [check-in schedule](../../b1-admin/attendance/setup#setting-a-check-in-schedule) ang service time at sarado ang window nito sa ngayon, ang row ay magpapakita ng **Closed** sa halip na button -- kasama ang susunod na oras ng pagbubukas kapag may ganoon, gaya ng **Closed · opens Sun 9:30 AM**. Kung naka-check in na ang tao sa service time na iyon, ipinapakita ng row ang kanyang grupo na may check mark (halimbawa, **Kids Room 1 · Checked in**), para malaman mo kung nasaan siya kahit sarado na ang window.

I-tap ang group button para pumunta sa [group selection screen](./group-assignment) kung saan maaari mong piliin o palitan ang grupo ng taong iyon para sa service time na iyon.

Ipinapakita rin ng pinalawak na card ang mga chip na **Member**, **Guest**, at **Volunteer**. I-tap ang isa para itakda kung paano nagche-check in ang taong ito -- ang Member ang default. Mahalaga ang uri para sa mga kuwarto ng mga bata: binibilang ang mga volunteer sa volunteer-to-child ratio ng kuwarto, at binibilang naman ang mga guest sa anumang guest capacity na itinakda ng iyong simbahan.

I-tap muli ang card ng miyembro para itiklop ito.

:::tip
Hindi mo kailangang bigyan ng grupo ang bawat miyembro ng pamilya. Maaaring walang pagtatalaga ng grupo ang mga adultong dumadalo sa pangunahing worship service. Magtalaga lamang ng grupo para sa mga miyembrong kailangang ma-check in sa isang partikular na klase o programa.
:::

## Pag-navigate Mula sa Screen na Ito

Mula sa household review screen, may tatlong opsyon ka:

- **Buksan ang isang miyembro** at i-tap ang service time button para [magtalaga o magpalit ng grupo](./group-assignment).
- **I-tap ang Add Guest button** sa ilalim ng listahan ng miyembro para [magdagdag ng bisita](./adding-guests) sa iyong household.
- **I-tap ang Check-in button** sa ibaba ng screen para [tapusin ang check-in](./completing-checkin) para sa lahat ng nasa household.

:::info
Awtomatikong na-pre-load ang anumang pagtatalaga ng grupo mula sa nakaraang check-in sa parehong serbisyo. Kung palagi nang dumadalo sa parehong grupo ang iyong mga anak tuwing linggo, maaaring wala kang kailangang palitan -- suriin lamang at mag-check in.
:::

## Mga Susunod na Hakbang

- [Magtalaga ng grupo](./group-assignment) sa mga miyembro ng pamilyang kailangang mag-check in sa isang partikular na klase o programa.
- [Magdagdag ng bisita](./adding-guests) kung may kasama ang iyong pamilyang bisita.
- [Tapusin ang check-in](./completing-checkin) kapag tama na ang lahat ng pagtatalaga.
