---
title: "Transfer Risk Assessment"
---

# Transfer Risk Assessment

<div class="article-intro">

This document records ChurchApps' assessment of risks associated with international transfers of personal data from the UK/EEA to the United States, as required under UK GDPR and EU GDPR. This is an internal compliance record maintained by ChurchApps as data processor.

</div>

**Last reviewed:** April 2026

## 1. Transfer Details

| Item | Detail |
|---|---|
| **Data Exporter** | Churches using ChurchApps (Data Controllers) located in the UK/EEA |
| **Data Importer** | ChurchApps (Data Processor), operating from the United States |
| **Categories of Data Subjects** | Church members, attendees, visitors, donors, volunteers, children (managed by parents/administrators) |
| **Categories of Personal Data** | Names, email addresses, phone numbers, postal addresses, dates of birth, gender, marital status, profile photos, donation records, attendance records, group memberships, volunteer assignments, messaging history |
| **Sensitive Data** | None intentionally collected. No health data, biometric data, or criminal records are stored. Financial account details (credit cards, bank accounts) are never stored by ChurchApps — these are handled directly by Stripe. |
| **Purpose of Transfer** | Providing church management software services (member management, donations, attendance tracking, communications, volunteer scheduling, event registration) |
| **Destination Country** | United States |
| **Transfer Mechanism** | EU Standard Contractual Clauses (SCCs) and UK International Data Transfer Addendum (IDTA), incorporated via the AWS Data Processing Addendum |

## 2. Sub-Processors

| Sub-Processor | Role | Location | Transfer Mechanism |
|---|---|---|---|
| **Amazon Web Services (AWS)** | Infrastructure hosting, data storage, content delivery (us-east-2 region) | United States | AWS DPA with SCCs (automatically included in AWS Service Terms) |
| **Stripe** | Payment processing for donations | United States | Stripe DPA with SCCs |

Credit card and bank account data is transmitted directly from the user's browser to Stripe and is never stored on or transmitted through ChurchApps servers.

## 3. Risk Assessment

### 3.1 Encryption

- **In transit:** All data is encrypted using TLS/HTTPS for all communications between users and ChurchApps servers.
- **At rest:** Data stored on AWS is encrypted at rest using AWS-managed encryption.

### 3.2 Access Controls

- Production server access is limited to two individuals who are members of the ChurchApps board of directors.
- Developers, volunteers, and other board members do not have access to production servers or databases.
- Database servers are behind a firewall and are not directly accessible from the internet.
- Church data is logically separated — each church can only access its own data through application-level access controls.

### 3.3 Data Segregation

Data is distributed across six independent databases (Membership, Giving, Attendance, Messaging, Doing, Content). Compromise of one database does not expose data from the others. For example, the Giving database contains donation amounts and dates but not the names or contact information of donors (stored in Membership).

### 3.4 Data Minimization

- No credit card or bank account information is stored (handled by Stripe).
- Passwords are stored using one-way hashing and cannot be retrieved.
- Churches control what data they collect from their members.

### 3.5 Data Subject Rights

ChurchApps provides technical tools enabling churches to fulfill data subject requests:

- **Access & Portability:** Full data export in machine-readable JSON format.
- **Erasure:** Anonymization across all six databases, replacing personal data with generic values while preserving aggregate records required for financial reporting.
- **Restriction:** Inactive membership status excludes individuals from search, directory, reports, and messaging while retaining their record.
- **Rectification:** Members and administrators can edit personal information through the application.

### 3.6 Breach Notification

ChurchApps commits to notifying affected churches within 72 hours of becoming aware of a personal data breach, as documented in the [Terms of Service](https://churchapps.org/terms) (Section 11.6).

### 3.7 US Government Access Risk

The primary risk associated with US-hosted data is potential access by US government authorities under FISA Section 702 or Executive Order 12333. This risk is assessed as **low** for the following reasons:

- ChurchApps processes church membership and attendance data, not data of intelligence value.
- Data subjects are church members and attendees — not categories typically targeted by surveillance programs.
- No sensitive personal data (health, financial accounts, political opinions) is stored.
- AWS's DPA includes commitments regarding government access requests and transparency reporting.
- The EU-US Data Privacy Framework (established 2023) provides additional safeguards for data transfers to certified US organizations.

## 4. Overall Risk Conclusion

The risk to data subjects from this international transfer is assessed as **low**. The combination of:

- Standard Contractual Clauses as the legal transfer mechanism
- Encryption in transit and at rest
- Strict access controls with only two authorized individuals
- Data segregation across independent databases
- No storage of financial account details
- Low sensitivity and low intelligence value of the data processed
- Technical tools for exercising all data subject rights

provides adequate supplementary measures to ensure that the transferred data receives a level of protection essentially equivalent to that guaranteed within the UK/EEA.

## 5. Review Schedule

This assessment will be reviewed annually or when there is a material change to the data processing, sub-processors, or legal framework governing international data transfers.
