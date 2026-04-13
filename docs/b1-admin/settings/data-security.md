---
title: "Data Security"
---

# Data Security

<div class="article-intro">

While there is no such thing as a perfectly secure system, ChurchApps takes data security seriously. This page explains the measures taken to protect all data entered into B1.church Admin and other ChurchApps products.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Review this page to understand how your church's data is protected
- Set up [Roles & Permissions](./roles-permissions.md) to control who can access sensitive information
- Familiarize yourself with the [privacy policy](https://churchapps.org/privacy)

</div>

## Limiting Sensitive Data Stored

Our first approach is to not store any more sensitive data than necessary. This means never storing any credit card or bank account details used for making donations. When a user makes a donation using B1.church Admin or B1, the credit card data is never transmitted to any of our servers, only your payment gateway (Stripe). This means in the event of a data breach, no credit card or bank info would be compromised.

We also never store passwords in our system. All passwords are processed through a one-way hashing algorithm in which some of the data is destroyed, making it impossible for anyone to retrieve passwords from the database, even us. To verify passwords, the entered value must pass through the same one-way hash and produce the same result.

After removing these two sources the only sensitive data that remains is a list of names and contact info.

:::tip
Because ChurchApps never stores credit card or bank information, even a worst-case data breach would not expose financial account details. Only names and contact information would be at risk.
:::

## Using Standard Best Practices

We use the industry standard best practices for security, including encrypting all data in transit to and from our servers using HTTPS. All servers are hosted in a secure physical datacenter with Amazon Web Services. All database servers are stored behind a firewall and are inaccessible from the Internet.

## Data Segregation

Data is separated into different databases based on scope. Each of our APIs (Membership, Giving, Attendance, Messaging, Doing and Lessons) are independent silos of data with their own databases. If one of them is compromised, the usefulness of the data is limited without others also being compromised. For example, if the Giving API/database was to be compromised, a bad actor could potentially gain access to a list of donations and dates (but never card/bank data). However, they would not have access to which users made the donations or which churches they were for as that data is stored in the separate Membership database.

:::info
Data segregation means that compromising one system does not give access to all church data. Each API operates independently with its own database, limiting the impact of any potential breach.
:::

## Limited Access

Access to the production servers is strictly limited to the server administrators who require access. This is currently two individuals who are also members of the board. Developers, volunteers and other board members are not permitted access to the production servers.

## Privacy Policy

Your data is yours and will never be sold to third parties. You can read our full privacy policy [here](https://churchapps.org/privacy).

## GDPR Compliance

ChurchApps supports GDPR compliance for churches with members in the UK or European Union. Here's how we address the key requirements:

### Data Subject Rights

ChurchApps provides tools to help churches respond to data subject requests:

- **Right of Access (Article 15)** — Members can request a copy of their personal data by contacting their church. Administrators can export any person's data from the person detail page in B1.church Admin.
- **Right to Erasure (Article 17)** — Members can request account deletion by contacting their church. Administrators can anonymize a person's data across all modules from the person detail page. Anonymization replaces personal information with generic values while preserving aggregate records (donation totals, attendance counts) needed for church financial reporting.
- **Right to Restriction (Article 18)** — Members can request restriction of processing by contacting their church, including opting out of communications.
- **Right to Data Portability (Article 20)** — Administrators can export personal data in a structured, machine-readable JSON format on behalf of members who request it.

### Data Processing

ChurchApps acts as a **data processor** on behalf of your church (the **data controller**). Our [Data Processing Agreement](https://churchapps.org/terms) outlines the responsibilities of each party, including sub-processor usage, breach notification procedures, and data handling on termination.

### International Data Transfers

ChurchApps data is hosted on Amazon Web Services (AWS) in the United States. International data transfers from the UK/EU are covered by AWS's Standard Contractual Clauses (SCCs) under the [AWS Data Processing Addendum](https://aws.amazon.com/compliance/data-processing-addendum/). EU-based hosting is not required when appropriate transfer mechanisms like SCCs are in place.

### Sub-Processors

- **Amazon Web Services (AWS)** — Infrastructure hosting, data storage, and content delivery
- **Stripe** — Payment processing for donations (no card data is stored by ChurchApps)

:::info
For full details on how we handle personal data, see our [Privacy Policy](https://churchapps.org/privacy) and [Terms of Service](https://churchapps.org/terms). If you have questions about GDPR compliance, contact us at support@churchapps.org.
:::
