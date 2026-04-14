---
title: "Pagsusuri ng Panganib sa Paglipat"
---

# Pagsusuri ng Panganib sa Paglipat

<div class="article-intro">

Ang dokumeng ito ay nagre-record ng pagsusuri ng ChurchApps sa mga panganib na nauugnay sa international transfers ng personal data mula sa UK/EEA sa United States, tulad ng kinakailangan sa UK GDPR at EU GDPR. Ito ay isang internal compliance record na pinapanatili ng ChurchApps bilang data processor.

</div>

**Huling sinuri:** April 2026

## 1. Mga Detalye ng Paglipat

| Item | Detalye |
|---|---|
| **Data Exporter** | Mga simbahan na gumagamit ng ChurchApps (Data Controllers) na naroroon sa UK/EEA |
| **Data Importer** | ChurchApps (Data Processor), nag-ooperate mula sa United States |
| **Mga Kategorya ng Data Subjects** | Mga miyembro ng simbahan, attendees, bisita, donors, volunteers, mga bata (pinamamahalaan ng mga magulang/administrators) |
| **Mga Kategorya ng Personal Data** | Mga pangalan, email addresses, phone numbers, postal addresses, dates of birth, gender, marital status, profile photos, donation records, attendance records, group memberships, volunteer assignments, messaging history |
| **Sensitive Data** | Walang intentional na nakolekta. Walang health data, biometric data, o criminal records na naka-store. Ang mga financial account details (credit cards, bank accounts) ay hindi kailanman naka-store ng ChurchApps — ang mga ito ay direktang pinangangasiwaan ng Stripe. |
| **Layunin ng Paglipat** | Nagbibigay ng church management software services (member management, donations, attendance tracking, communications, volunteer scheduling, event registration) |
| **Destination Country** | United States |
| **Transfer Mechanism** | EU Standard Contractual Clauses (SCCs) at UK International Data Transfer Addendum (IDTA), incorporated sa pamamagitan ng AWS Data Processing Addendum |

## 2. Sub-Processors

| Sub-Processor | Tungkulin | Lokasyon | Transfer Mechanism |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastructure hosting, data storage, content delivery (us-east-2 region) | United States | AWS DPA na may SCCs (awtomatikong kasama sa AWS Service Terms) |
| **Stripe** | Payment processing para sa donations | United States | Stripe DPA na may SCCs |

Ang credit card at bank account data ay direktang ipinagpapadala mula sa browser ng user sa Stripe at hindi kailanman naka-store o ipinadala sa pamamagitan ng ChurchApps servers.

## 3. Pagsusuri ng Panganib

### 3.1 Encryption

- **In transit:** Ang lahat ng data ay encrypted gamit ang TLS/HTTPS para sa lahat ng komunikasyon sa pagitan ng users at ChurchApps servers.
- **At rest:** Ang data na naka-store sa AWS ay encrypted at rest gamit ang AWS-managed encryption.

### 3.2 Access Controls

- Ang production server access ay limitado lamang sa dalawang indibidwal na miyembro ng ChurchApps board of directors.
- Ang mga developers, volunteers, at iba pang board members ay walang access sa production servers o databases.
- Ang mga database server ay nasa likod ng firewall at hindi direktang accessible mula sa internet.
- Ang church data ay logically separated — bawat simbahan ay maaaring mag-access lamang ng sariling data sa pamamagitan ng application-level access controls.

### 3.3 Data Segregation

Ang data ay distributed sa anim na independent na databases (Membership, Giving, Attendance, Messaging, Doing, Content). Ang compromise ng isang database ay hindi nag-expose ng data mula sa iba. Halimbawa, ang Giving database ay naglalaman ng donation amounts at dates ngunit hindi ang mga pangalan o contact information ng mga donors (na naka-store sa Membership).

### 3.4 Data Minimization

- Walang credit card o bank account information na naka-store (pinangangasiwaan ng Stripe).
- Ang mga password ay naka-store gamit ang one-way hashing at hindi maaaring i-retrieve.
- Ang mga simbahan ay kumokontrol sa kung anong data ang kanilang kinokolekta mula sa kanilang mga miyembro.

### 3.5 Data Subject Rights

Ang ChurchApps ay nagbibigay ng technical tools na nagbibigay-daan sa mga simbahan na tuparin ang data subject requests:

- **Access & Portability:** Full data export sa machine-readable JSON format.
- **Erasure:** Anonymization sa lahat ng anim na databases, pinapalitan ang personal data ng generic values habang nananatili ang aggregate records na kinakailangan para sa financial reporting.
- **Restriction:** Inactive membership status na nagbubukod sa mga indibidwal mula sa search, directory, reports, at messaging habang pinapanatili ang kanilang record.
- **Rectification:** Ang mga miyembro at administrators ay maaaring mag-edit ng personal information sa pamamagitan ng application.

### 3.6 Breach Notification

Ang ChurchApps ay naglalangkad na mag-notify ng mga apektadong simbahan sa loob ng 72 oras mula nang malaman ang isang personal data breach, tulad ng dokumentado sa [Terms of Service](https://churchapps.org/terms) (Section 11.6).

### 3.7 US Government Access Risk

Ang pangunahing panganib na nauugnay sa US-hosted data ay potensyal na access ng US government authorities sa ilalim ng FISA Section 702 o Executive Order 12333. Ang panganibang ito ay natatasa bilang **mababa** para sa mga sumusunod na dahilan:

- Ang ChurchApps ay nag-process ng church membership at attendance data, hindi data ng intelligence value.
- Ang data subjects ay mga miyembro ng simbahan at attendees — hindi mga kategoryang karaniwang target ng surveillance programs.
- Walang sensitive personal data (health, financial accounts, political opinions) na naka-store.
- Ang AWS's DPA ay naglalaman ng commitment tungkol sa government access requests at transparency reporting.
- Ang EU-US Data Privacy Framework (itinayo 2023) ay nagbibigay ng karagdagang safeguards para sa data transfers sa mga certified US organizations.

## 4. Overall Risk Conclusion

Ang panganib sa data subjects mula sa international transfer na ito ay natatasa bilang **mababa**. Ang kombinasyon ng:

- Standard Contractual Clauses bilang legal transfer mechanism
- Encryption in transit at at rest
- Strict access controls na may dalawang authorized individuals lamang
- Data segregation sa independent na databases
- Walang storage ng financial account details
- Mababang sensitivity at mababang intelligence value ng pinoprosesong data
- Mga technical tools para sa pagsasagawa ng lahat ng data subject rights

ay nagbibigay ng adequately supplementary measures upang masiguro na ang transferred data ay nakakatanggap ng level of protection na essentially equivalent sa guaranteed sa loob ng UK/EEA.

## 5. Review Schedule

Ang assessment na ito ay mire-review nang taunang o kapag may material change sa data processing, sub-processors, o legal framework na nangingibabaw sa international data transfers.
