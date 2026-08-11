---
title: "Mga Customized na Field"
---

# Mga Customized na Field

<div class="article-intro">

Ang **Mga Customized na Field** ay nagbibigay-daan sa iyo na subaybayan ang iyong sariling impormasyon sa bawat record ng tao -- mga bagay na B1 ay walang built-in field para, tulad ng petsa ng pag-expire ng background check, isang sukat ng T-shirt, o isang katayuan ng klase ng baptism. Tinukoy mo ang field minsan sa Mga Ayos, pagkatapos ay puno ng halaga sa profile ng bawat tao at maghanap o bumuo ng mga listahan dito. Ito ay gumagana sa lugar ng mas lumang solusyon ng paglikha ng isang Mga Tao form na lamang upang mag-imbak ng isang piraso ng customized na data.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Kailangan mo ng **Mga Tao** na may pahintulot sa pag-edit upang tukuyin ang mga field at punan ng mga halaga, at access sa lugar ng **Mga Ayos**. Sinuman na may pahintulot sa pagtingin ng Mga Tao ay makikita ang mga halaga. Tingnan ang [Mga Rol at Pahintulot](./roles-permissions.md).
- Magdesisyon kung ano ang gusto mong subaybayan at aling uri ang umaangkop na mabuti (teksto, isang numero, isang petsa, isang oo/hindi na sagot, o isang listang mapipili) bago ka magsimula.

</div>

## Pagbubukas ng Mga Customized na Field

Sa B1 Admin, buksan ang **menu ng seksyon** sa sulok sa itaas-kaliwa (ang pangalan ng seksyon na may maliit na arrow), pumili ng **Mga Ayos**, at piliin ang card ng **Mga Customized na Field**. Maaari mo ring direktang pumunta doon sa **/settings/custom-fields**. Makikita mo ang isang listahan ng bawat field na iyong tinukoy, na nagpapakita ng kanyang **Pangalan** at **Uri ng Field**. Kung hindi ka pa nakagawa ng anumang, ang panel ay nagbabasa ng *"Walang customized fields na naidagdag pa."*

## Pagdaragdag ng Field

1. I-click ang **Add Field**.
2. Sa editor na bumubukas sa kanan, ipasok ang **Pangalan** -- ito ang label na makikita ng staff sa mga profile ng tao at sa paghahanap (halimbawa, *Pag-expire ng background check*).
3. Pumili ng **Uri ng Field**:
   - **Textbox** -- libreng-tuluran na maikling teksto.
   - **Buong Numero** -- mga numero nang walang decimal (halimbawa, isang numero).
   - **Decimal** -- mga numero na maaaring may kasamang decimal.
   - **Petsa** -- isang petsa ng kalendaryo.
   - **Oo/Hindi** -- isang simpleng oo-o-hindi na sagot.
   - **Maraming Pagpipilian** -- isang listang mapipili. Kapag pumili ka ng uri na ito, lumilitaw ang isang **editor ng mga pagpipilian** upang maaari kang magdagdag ng bawat opsyon na maaaring piliin ng mga tao.
4. I-click ang **Magsave**.

Ang field ay available na ngayon sa profile ng bawat tao.

:::info
Ang mga uri ng field ay pareho ng set na ginagamit para sa [mga tanong sa form](../forms/creating-forms.md), kaya ang mga halaga ay kumikilos nang pare-pareho sa buong B1.
:::

## Pag-edit ng Field

I-click ang anumang hanay ng field sa listahan upang muling buksan ito sa editor. Baguhin ang pangalan, uri, o mga pagpipilian at i-click ang **Magsave**.

:::warning
Ang pagbabago ng **Uri ng Field** ng field na mayroon na ng mga halaga (halimbawa, mula Textbox hanggang Petsa) ay maaaring maiwanan ang dati nang ipinasok na mga halaga sa format na hindi na tumutugma sa bagong uri. Baguhin ang mga uri nang mabuti kapag nagsimula na ang staff na pumupon sa field.
:::

## Pagtanggal ng Field

Buksan ang field para sa pag-edit at i-click ang **Delete**. Tatanungin ka na kumpirmahin: *"Sigurado ka ba na nais mong tanggalin ang customized field na ito? Ang mga nakaimbak na halaga nito ay aalis na rin."* Ang pagtanggal ng field ay permanenteng tinatanggal ito **at bawat halaga na nakaimbak nito** sa lahat ng mga tao -- hindi ito maaaring bawiin.

## Pagpuno ng Mga Halaga sa isang Tao

Kapag umiiral na ang hindi bababa sa isang customized field, ang mga halaga nito ay buhay na magkasama ng built-in na detalye sa bawat record ng tao -- tinitingnan mo ito sa **Mga Detalye ng Persen** at ine-edit ito sa parehong form na ginagamit mo para sa natitirang impormasyon ng tao. Walang dagdag na lilitaw hanggang sa iyong tinukoy ng iyong unang field.

1. Buksan ang record ng isang tao sa **Mga Tao**.
2. Sa seksyon ng **Mga Detalye ng Persen**, i-click ang pindutan ng **Edit** (lapis).
3. Mag-scroll sa lugar ng **Mga Customized na Field** sa ibaba ng form ng pag-edit at punan ng halaga para sa bawat field. Bawat field ay nagpapakita ng input na tumutugma sa kanyang uri -- isang date picker para sa Petsa fields, isang oo/hindi dropdown para sa Oo/Hindi fields, isang listang mapipili para sa Maraming Pagpipilian, at iba pa.
4. I-click ang **Magsave**. Ang mga customized na halaga ng field ay sinasave na magkasama sa natitirang detalye ng tao.

Bumalik sa profile, ang anumang field na may halaga ay nagpapakita na sa seksyon ng **Mga Detalye ng Persen** (Ang mga sagot ng Oo/Hindi ay nagbabasa bilang *Oo* o *Hindi*, at Maraming Pagpipilian ay nagpapakita ng label ng opsyon). Ang mga field na naiwan na blangko ay simpleng nakatagong. Upang alisin ang halaga, i-edit ang tao, i-clear ang field, at magsave -- isang walang laman na halaga ay tinatanggal mula sa record sa halip na itala bilang blank.

:::tip
Ang klasikong use case ay kaligtasan ng volunteer: lumikha ng **Petsa** field na tinatawag *Pag-expire ng background check*, itala ang petsa ng bawat volunteer, pagkatapos ay bumuo ng [Saved List](../people/lists.md) na nag-flag ng sinumang ang petsa ay lumampas na.
:::

## Paghahanap at Pagbuo ng Mga Listahan sa Mga Customized na Field

Ang mga customized field ay lubos na nahanap:

1. Sa pahina ng **Mga Tao**, buksan ang [Pag-advanced Search](../people/searching-people.md).
2. Palawakin ang kategorya ng **Mga Customized na Field**.
3. Suriin ang field na gusto mong salahin, pumili ng operator, at ipasok ang halaga. Ang mga operator na inaalok ay tumutugma sa uri ng field:
   - **Textbox** -- naglalaman, katumbas, nagsisimula sa, nagtatapos sa.
   - **Buong Numero / Decimal** -- katumbas, mas malaki kaysa, mas malaki o katumbas, mas kaunti kaysa, mas kaunti o katumbas.
   - **Petsa** -- katumbas, pagkatapos (mas malaki kaysa), bago (mas kaunti kaysa).
   - **Oo/Hindi** -- katumbas sa Oo o Hindi.
   - **Maraming Pagpipilian** -- katumbas o naglalaman ng isa sa mga pagpipilian.

I-save ang anumang customized-field search bilang isang [List](../people/lists.md). Ang mga listahan ay live queries, kaya ang isang listang itinayo sa *Pag-expire ng background check ay bago ang ngayon* ay muling sinusuri ang bawat tao bawat pagbubukas mo ito -- walang manu-manong pagpapanatili.

## Ano ang Nangyayari sa Pagsasama

Kapag [pinagsama mo ang dalawang record ng tao](../people/adding-people.md), ang mga customized na halaga ng field ay awtomatikong dadalhin. Ang taong iyong tinatanggap ay nanatiling may kanilang sariling mga halaga; para sa anumang field kung saan mayroon lamang ang tinatanggalang tao ng halaga, ang halaga ay kinokopya upang walang mawawala.

## Mga Kaugnay na Artikulo

- [Paghahanap ng Mga Tao](../people/searching-people.md) -- advanced search, kasama ang kategorya ng Mga Customized na Field
- [Mga Nakaligtas na Listahan](../people/lists.md) -- magsave ng customized-field search at muling tatakbo ito live
- [Mga Rol at Pahintulot](./roles-permissions.md) -- sino ang maaaring tukuyin ang mga field at i-edit ang mga halaga
- [Paglikha ng Mga Form](../forms/creating-forms.md) -- para sa multi-question data collection kung saan isang buong form ay umaangkop na higit sa iisang field
