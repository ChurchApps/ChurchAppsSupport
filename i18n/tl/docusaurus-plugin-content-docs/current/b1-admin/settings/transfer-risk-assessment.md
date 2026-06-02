---
title: "Transfer Risk Assessment"
---

# Transfer Risk Assessment

<div class="article-intro">

Ang dokumentong ito ay nag-record ng pagtatasa ng ChurchApps ng mga panganib na nauugnay sa international transfers ng personal na data mula sa UK/EEA patungo sa United States, kung kinakailangan ng UK GDPR at EU GDPR. Ito ay isang internal na record ng pagsunod na pinapanatili ng ChurchApps bilang data processor.

</div>

**Huling sinuri:** April 2026

## 1. Transfer Details

| Item | Detail |
|---|---|
| **Data Exporter** | Mga parokya na gumagamit ng ChurchApps (Data Controllers) na matatagpuan sa UK/EEA |
| **Data Importer** | ChurchApps (Data Processor), na gumagana mula sa United States |
| **Categories of Data Subjects** | Mga miyembro ng parokya, mga dumalo, mga bisita, mga donors, mga volunteer, mga bata (pinamamahalaan ng mga magulang/administrators) |
| **Categories of Personal Data** | Mga pangalan, email addresses, mga numero ng telepono, mga postal address, mga petsa ng pagsilang, kasarian, marital status, mga larawan ng profile, mga record ng donasyon, mga record ng dumalo, mga miyembro ng grupo, mga paglalaan ng volunteer, messaging history |
| **Sensitive Data** | Walang layunin na nakolekta. Walang health data, biometric data, o criminal records ang nakaimbak. Ang mga detalye ng financial account (credit cards, bank accounts) ay hindi kailanman nakaimbak ng ChurchApps — ang mga ito ay hinahawakan direkta ng Stripe. |
| **Purpose of Transfer** | Pagbibigay ng mga serbisyo ng software ng pamamahala ng parokya (management ng miyembro, mga donasyon, pagsubaybay ng dumalo, mga komunikasyon, pag-schedule ng volunteer, pagpaparehistro ng kaganapan) |
| **Destination Country** | United States |
| **Transfer Mechanism** | EU Standard Contractual Clauses (SCCs) at UK International Data Transfer Addendum (IDTA), na isinasama sa pamamagit ng AWS Data Processing Addendum |

## 2. Sub-Processors

| Sub-Processor | Role | Location | Transfer Mechanism |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastructure hosting, data storage, content delivery (us-east-2 region) | United States | AWS DPA na may SCCs (awtomatikong kasama sa AWS Service Terms) |
| **Stripe** | Payment processing para sa mga donasyon | United States | Stripe DPA na may SCCs |

Ang credit card at bank account data ay direktang ipinapadala mula sa browser ng user sa Stripe at hindi kailanman nakaimbak o ipinadala sa pamamagit ng mga server ng ChurchApps.

## 3. Risk Assessment

### 3.1 Encryption

- **In transit:** Ang lahat ng data ay naka-encrypt gamit ang TLS/HTTPS para sa lahat ng komunikasyon sa pagitan ng mga user at mga server ng ChurchApps.
- **At rest:** Ang data na nakaimbak sa AWS ay naka-encrypt sa rest gamit ang AWS-managed encryption.

### 3.2 Access Controls

- Ang produksyon ng access sa server ay limitado sa dalawang indibidwal na mga miyembro ng board ng directors ng ChurchApps.
- Ang mga developers, volunteers, at iba pang mga miyembro ng board ay walang access sa production servers o databases.
- Ang mga database servers ay nasa likod ng isang firewall at hindi direktang accessible mula sa internet.
- Ang data ng parokya ay logically separated — bawat parokya ay maaari lamang mag-access ng sariling data nito sa pamamagit ng application-level access controls.

### 3.3 Data Segregation

Ang data ay ibinahagi sa anim na independent databases (Membership, Giving, Attendance, Messaging, Doing, Content). Ang compromise ng isang database ay hindi nagsasawalat ng data mula sa iba. Halimbawa, ang Giving database ay naglalaman ng donation amounts at dates ngunit hindi ang mga pangalan o contact information ng mga donors (nakaimbak sa Membership).

### 3.4 Data Minimization

- Walang credit card o bank account information na nakaimbak (hinahawakan ng Stripe).
- Ang mga password ay nakaimbak gamit ang one-way hashing at hindi maaaring makuha.
- Ang mga parokya ay nag-kontrol kung anong data ang kanilang kinokolekta mula sa kanilang mga miyembro.

### 3.5 Data Subject Rights

Ang ChurchApps ay nagbibigay ng mga technical tools na nagpapahintulot sa mga parokya na tuparin ang mga kahilingan ng data subject:

- **Access & Portability:** Kabuuang data export sa machine-readable JSON format.
- **Erasure:** Anonymization sa lahat ng anim na databases, na pinapalitan ang personal data ng generic values habang pinapanatili ang aggregate records na kinakailangan para sa financial reporting.
- **Restriction:** Ang inactive membership status ay nagsasawalat sa mga indibidwal mula sa search, directory, reports, at messaging habang pinapanatili ang kanilang record.
- **Rectification:** Ang mga miyembro at administrators ay maaaring mag-edit ng personal information sa pamamagit ng application.

### 3.6 Breach Notification

Ang ChurchApps ay nagsasangkot upang notisahin ang mga apektadong parokya sa loob ng 72 oras pagkatapos maging alerto ng isang breach ng personal data, tulad ng inilalarawan sa [Terms of Service](https://churchapps.org/terms) (Section 11.6).

### 3.7 US Government Access Risk

Ang pangunahing panganib na nauugnay sa US-hosted data ay ang potensyal na access ng mga US government authorities sa ilalim ng FISA Section 702 o Executive Order 12333. Ang panganib na ito ay sinuri bilang **low** para sa mga susunod na dahilan:

- Ang ChurchApps ay nagpoproseso ng membership at attendance data ng parokya, hindi data ng intelligence value.
- Ang mga data subjects ay mga miyembro at dumalo ng parokya — hindi mga kategorya na karaniwang target ng surveillance programs.
- Walang sensitive na personal data (kalusugan, financial accounts, political opinions) ang nakaimbak.
- Ang AWS's DPA ay may commitments tungkol sa mga government access requests at transparency reporting.
- Ang EU-US Data Privacy Framework (na itatag sa 2023) ay nagbibigay ng karagdagang safeguards para sa data transfers sa certified US organizations.

## 4. Overall Risk Conclusion

Ang panganib sa mga data subjects mula sa international transfer na ito ay sinuri bilang **low**. Ang kombinasyon ng:

- Standard Contractual Clauses bilang legal transfer mechanism
- Encryption in transit at at rest
- Mahigpit na access controls na may dalawang lamang na authorized individuals
- Data segregation sa independent databases
- Walang pag-iimbak ng financial account details
- Mababang sensitivity at mababang intelligence value ng data na napoproseso
- Mga technical tools para sa pagsasagawa ng lahat ng data subject rights

nagbibigay ng sapat na karagdagang measures upang masiguro na ang transferred data ay nakakatanggap ng isang antas ng proteksyon na karaniwang katulad ng garantisado sa loob ng UK/EEA.

## 5. Review Schedule

Ang pagsusuring ito ay isasaalang-alang nang taun-taon o kapag may material na pagbabago sa data processing, sub-processors, o legal framework na namamaghari sa international data transfers.
