---
title: "Seguridad ng Data"
---

# Seguridad ng Data

<div class="article-intro">

Bagaman walang perpektong ligtas na sistema, sineseryoso ng ChurchApps ang seguridad ng data. Ipinapaliwanag ng pahinang ito ang mga hakbang na ginawa upang protektahan ang lahat ng data na inilagay sa B1.church Admin at iba pang mga produkto ng ChurchApps.

</div>

<div class="prereqs">
<h4>Bago Ka Magsimula</h4>

- Suriin ang pahinang ito upang maunawaan kung paano protektado ang data ng iyong simbahan
- I-set up ang [Mga Tungkulin at Pahintulot](./roles-permissions.md) upang kontrolin kung sino ang maaaring mag-access ng sensitibong impormasyon
- Pamilyarihin ang iyong sarili sa [patakaran sa privacy](https://churchapps.org/privacy)

</div>

## Paglilimita ng Sensitibong Data na Naka-store

Ang aming unang diskarte ay hindi mag-store ng mas maraming sensitibong data kaysa sa kinakailangan. Nangangahulugan ito na hindi kailanman mag-store ng anumang mga detalye ng credit card o bank account na ginagamit para sa pagdo-donate. Kapag ang isang user ay nagdo-donate gamit ang B1.church Admin o B1, ang data ng credit card ay hindi kailanman ipinapadala sa alinman sa aming mga server, tanging sa iyong payment gateway (Stripe) lamang. Nangangahulugan ito na sa kaganapan ng isang data breach, walang credit card o bank info ang makokompromiso.

Hindi rin namin kailanman sino-store ang mga password sa aming sistema. Lahat ng password ay pinoproseso sa pamamagitan ng isang one-way hashing algorithm kung saan ang ilan sa data ay nasisira, na ginagawang imposible para sa sinuman na kunin ang mga password mula sa database, kahit para sa amin. Upang ma-verify ang mga password, ang inilagay na value ay kailangang dumaan sa parehong one-way hash at mag-produce ng parehong resulta.

Pagkatapos alisin ang dalawang source na ito, ang tanging sensitibong data na natitira ay isang listahan ng mga pangalan at impormasyon sa pakikipag-ugnayan.

:::tip
Dahil hindi kailanman nag-i-store ang ChurchApps ng impormasyon ng credit card o bangko, kahit sa pinakamasamang sitwasyon ng data breach ay hindi mailalantad ang mga detalye ng financial account. Ang mga pangalan at impormasyon sa pakikipag-ugnayan lamang ang malalagay sa panganib.
:::

## Paggamit ng Mga Standard na Pinakamahusay na Kasanayan

Gumagamit kami ng mga standard na pinakamahusay na kasanayan sa industriya para sa seguridad, kabilang ang pag-encrypt ng lahat ng data habang ipinapadala sa at mula sa aming mga server gamit ang HTTPS. Lahat ng server ay naka-host sa isang ligtas na pisikal na datacenter kasama ang Amazon Web Services. Lahat ng database server ay naka-store sa likod ng firewall at hindi maa-access mula sa Internet.

## Paghihiwalay ng Data

Ang data ay pinaghihiwalay sa iba't ibang mga database batay sa saklaw. Ang bawat isa sa aming mga API (Membership, Giving, Attendance, Messaging, Doing at Lessons) ay mga independiyenteng silo ng data na may kani-kanilang mga database. Kung ang isa sa kanila ay nakompromiso, limitado ang pagiging kapaki-pakinabang ng data nang hindi nakokompromiso ang iba. Halimbawa, kung ang Giving API/database ay nakompromiso, ang isang masamang aktor ay maaaring potensyal na makakuha ng access sa isang listahan ng mga donasyon at petsa (ngunit hindi kailanman card/bank data). Gayunpaman, hindi sila magkakaroon ng access sa kung aling mga user ang gumawa ng mga donasyon o para sa kung aling mga simbahan dahil ang data na iyon ay naka-store sa hiwalay na Membership database.

:::info
Ang paghihiwalay ng data ay nangangahulugan na ang pagkompromiso sa isang sistema ay hindi nagbibigay ng access sa lahat ng data ng simbahan. Ang bawat API ay gumagana nang independiyente na may sariling database, na naglilimita sa epekto ng anumang potensyal na breach.
:::

## Limitadong Access

Ang access sa mga production server ay mahigpit na limitado sa mga server administrator na nangangailangan ng access. Kasalukuyang dalawang indibidwal ito na mga miyembro rin ng board. Ang mga developer, volunteer at iba pang mga miyembro ng board ay hindi pinapayagang mag-access ng mga production server.

## Patakaran sa Privacy

Ang iyong data ay sa iyo at hindi kailanman ibebenta sa mga third party. Maaari mong basahin ang aming buong patakaran sa privacy [dito](https://churchapps.org/privacy).

## Pagsunod sa GDPR

Ang ChurchApps ay kasalukuyang hindi sumusuporta sa pagsunod sa GDPR dahil sa mga makabuluhang teknikal at pinansyal na kinakailangan na kasama. Ang GDPR ay mangangailangan sa amin na mag-host ng data sa mga server na naka-base sa EU at bumuo ng isang hiwalay na imprastraktura upang i-route at i-store ang data sa rehiyon, na epektibong nagdodoble ng aming mga gastos sa hosting at development. Bilang isang nonprofit na nag-aalok ng mga libreng tool sa mga simbahan, wala kaming mga mapagkukunan upang suportahan ito sa ngayon.

:::warning
Kung ang iyong simbahan ay may mga miyembro sa European Union, tandaan na ang ChurchApps ay kasalukuyang hindi nakakatugon sa mga kinakailangan ng GDPR. Kumonsulta sa iyong legal na tagapayo tungkol sa mga obligasyon sa pagsunod bago mag-store ng data ng mga miyembro mula sa EU.
:::
