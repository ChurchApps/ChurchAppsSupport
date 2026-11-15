---
title: "Seguridad ng Datos"
description: "Alamin kung paano pinoprotektahan ng ChurchApps ang datos ng simbahan mo sa B1 Admin, mula sa mga hashed na password at HTTPS hanggang sa mga hiwalay na database at GDPR data tool."
---

# Seguridad ng Datos

<div class="article-intro">

Bagaman walang bagay na ganap na ligtas na sistema, seryosong tinitingnan ng ChurchApps ang seguridad ng datos. Ipinapaliwanag ng pahinang ito ang mga hakbang na ginagawa para protektahan ang lahat ng datos na inilalagay sa B1.church Admin at sa iba pang produkto ng ChurchApps.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Basahin ang pahinang ito para maunawaan kung paano pinoprotektahan ang datos ng simbahan mo
- I-set up ang [Roles & Permissions](./roles-permissions.md) para kontrolin kung sino ang may access sa sensitibong impormasyon
- Pamilyarisahin ang sarili mo sa [privacy policy](https://churchapps.org/privacy)

</div>

## Paglilimita sa Sensitibong Datos na Iniimbak {#limiting-sensitive-data-stored}

Ang unang paraan namin ay huwag mag-imbak ng mas maraming sensitibong datos kaysa sa kinakailangan. Ibig sabihin, hindi kailanman nag-iimbak ng mga detalye ng credit card o bank account na ginagamit sa pagbibigay ng donasyon. Kapag nagbigay ng donasyon ang isang user gamit ang B1.church Admin o B1, hindi kailanman naipapadala ang datos ng credit card sa aming mga server; ang payment gateway mo (Stripe) lamang ang nakakatanggap nito. Ibig sabihin nito, kung magkaroon ng data breach, walang credit card o impormasyon sa bangko ang mapapahamak.

Hindi rin kami kailanman nag-iimbak ng mga password sa aming sistema. Lahat ng password ay dumadaan sa isang one-way hashing algorithm kung saan may bahaging nasisira ang datos, kaya imposibleng makuha ng sinuman ang password mula sa database, kahit kami. Para ma-verify ang password, ang inilagay na halaga ay dapat dumaan sa parehong one-way hash at magbigay ng parehong resulta.

Pagkatapos alisin ang dalawang pinagmumulang ito, ang tanging sensitibong datos na natitira ay listahan ng mga pangalan at contact info.

:::tip
Dahil hindi kailanman nag-iimbak ang ChurchApps ng impormasyon ng credit card o bangko, kahit ang pinakamasamang data breach ay hindi maglalantad ng mga detalye ng financial account. Pangalan at contact information lamang ang nanganganib.
:::

## Paggamit ng Karaniwang Best Practice {#using-standard-best-practices}

Gumagamit kami ng mga industry-standard na best practice sa seguridad, kabilang ang pag-encrypt ng lahat ng datos na dumadaan papunta at mula sa aming mga server gamit ang HTTPS. Lahat ng server ay naka-host sa isang ligtas na pisikal na datacenter sa Amazon Web Services. Nasa likod ng firewall ang lahat ng database server at hindi ma-access mula sa Internet.

## Paghihiwalay ng Datos {#data-segregation}

Hinihiwalay ang datos sa iba't ibang database ayon sa saklaw. Ang bawat isa sa aming mga module (Membership, Giving, Attendance, Messaging, Doing, at Content) ay isang independenteng silo ng datos na may sarili nitong mga database. Kung makompromiso ang isa sa mga ito, limitado ang magagawa sa datos nang hindi rin nakokompromiso ang iba. Halimbawa, kung makompromiso ang Giving API/database, maaaring makakuha ang isang masamang aktor ng listahan ng mga donasyon at petsa (pero hindi kailanman ang datos ng card/bangko). Gayunpaman, wala silang access sa kung sinong user ang nagbigay ng donasyon o kung para sa aling simbahan ito, dahil nakaimbak ang datos na iyon sa hiwalay na Membership database.

:::info
Ang paghihiwalay ng datos ay nangangahulugang ang pagkompromiso sa isang sistema ay hindi nagbibigay ng access sa lahat ng datos ng simbahan. Independyenteng gumagana ang bawat API na may sariling database, kaya nililimitahan ang epekto ng anumang posibleng breach.
:::

## Limitadong Access {#limited-access}

Mahigpit na limitado ang access sa production server sa mga server administrator na kailangan talaga ng access. Sa kasalukuyan, dalawang indibidwal ito na miyembro rin ng board. Hindi pinapayagan ang mga developer, volunteer, at iba pang miyembro ng board na ma-access ang production server.

## Patakaran sa Privacy {#privacy-policy}

Pag-aari ninyo ang inyong datos at hindi ito kailanman ibebenta sa mga third party. Mababasa ninyo ang buong privacy policy namin [dito](https://churchapps.org/privacy).

## Pagsunod sa GDPR {#gdpr-compliance}

Sinusuportahan ng ChurchApps ang GDPR compliance para sa mga simbahang may miyembrong nasa UK o European Union. Narito kung paano namin tinutugunan ang mga pangunahing kinakailangan:

### Mga Karapatan ng Data Subject {#data-subject-rights}

Nagbibigay ang ChurchApps ng mga tool para matulungan ang mga simbahang tumugon sa mga data subject request:

- **Karapatan sa Access (Article 15)** -- Maaaring humiling ng kopya ng kanilang personal na datos ang mga miyembro sa pamamagitan ng pakikipag-ugnayan sa kanilang simbahan. Maaaring i-export ng mga administrator ang datos ng sinumang tao gamit ang **Export Data** sa talaan ng tao, o mula sa seksyong **Data Management** ng edit form ng tao, sa B1.church Admin.
- **Karapatang Burahin (Article 17)** -- Maaaring humiling ang mga miyembro ng pagbura ng account mismo mula sa kanilang Profile page (tingnan ang [Reviewing Account Deletion Requests](../profile/account-deletion.md)), o sa direktang pakikipag-ugnayan sa kanilang simbahan. Maaari ring i-anonymize ng mga administrator ang datos ng isang tao sa lahat ng module mula sa seksyong **Data Management** sa detail page ng tao. Pinapalitan ng anonymization ang personal na impormasyon ng generic na halaga habang pinananatili ang mga pinagsamang talaan (kabuuan ng donasyon, bilang ng attendance) na kailangan para sa financial reporting ng simbahan.
- **Karapatan sa Restriction (Article 18)** -- Maaaring humiling ang mga miyembro ng paghihigpit sa processing sa pamamagitan ng pakikipag-ugnayan sa kanilang simbahan, kabilang ang pag-opt out sa mga komunikasyon.
- **Karapatan sa Data Portability (Article 20)** -- Maaaring i-export ng mga administrator ang personal na datos sa structured at machine-readable na JSON format para sa mga miyembrong humihiling nito.

### Paggamit ng mga Data Management Tool {#using-the-data-management-tools}

Para ma-access ang mga GDPR data tool para sa isang indibidwal:

1. Pumunta sa **People** sa B1 Admin at buksan ang talaan ng tao.
2. I-click ang **Edit** para pumasok sa edit mode.
3. Mag-scroll pababa sa seksyong **Data Management** (nakatiklop bilang default) at i-click para palawakin ito.
4. Gamitin ang **Export Data** para i-download ang JSON file ng lahat ng datos na nakaimbak para sa taong iyon. (Ang parehong link na **Export Data** ay nasa mga aksyon sa ilalim ng pangalan ng tao, nang hindi binubuksan ang edit form.)
5. Gamitin ang **Anonymize** para palitan ang personal na impormasyon ng generic na halaga. Hihilingin sa iyong i-type ang `ANONYMIZE` para kumpirmahin -- hindi na maibabalik ang aksyong ito.

:::warning
Permanente ang anonymization. Pinananatili ang kabuuan ng donasyon at bilang ng attendance para sa layuning financial reporting, pero inaalis ang lahat ng personal na identifier (pangalan, email, address, atbp.) at hindi na ito mababawi.
:::

### Pagproseso ng Datos {#data-processing}

Kumikilos ang ChurchApps bilang **data processor** para sa simbahan mo (ang **data controller**). Inilalatag ng aming [Data Processing Agreement](https://churchapps.org/terms) ang mga responsibilidad ng bawat partido, kabilang ang paggamit ng sub-processor, mga pamamaraan sa pag-abiso ng breach, at paghawak ng datos sa pagwawakas.

### Internasyonal na Paglilipat ng Datos {#international-data-transfers}

Naka-host ang datos ng ChurchApps sa Amazon Web Services (AWS) sa United States. Ang mga internasyonal na paglilipat ng datos mula sa UK/EU ay saklaw ng Standard Contractual Clauses (SCCs) ng AWS sa ilalim ng [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). Awtomatikong kasama ang AWS DPA sa AWS Service Terms para sa lahat ng customer. Hindi kailangan ng EU-based na hosting kapag may angkop na transfer mechanism gaya ng SCCs.

Para sa mga detalye kung paano sinuri ang mga panganib sa paglilipat, tingnan ang [Transfer Risk Assessment](./transfer-risk-assessment.md).

### Mga Sub-Processor {#sub-processors}

- **Amazon Web Services (AWS)** -- Hosting ng imprastraktura, pag-iimbak ng datos, at content delivery
- **Stripe** -- Pagproseso ng pagbabayad para sa mga donasyon (walang datos ng card na iniimbak ng ChurchApps)

:::info
Para sa buong detalye kung paano namin hinahawakan ang personal na datos, tingnan ang aming [Privacy Policy](https://churchapps.org/privacy) at [Terms of Service](https://churchapps.org/terms). Kung may mga tanong ka tungkol sa GDPR compliance, makipag-ugnayan sa amin sa support@churchapps.org.
:::
