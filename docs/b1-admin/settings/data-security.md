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

ChurchApps does not currently support GDPR compliance due to the significant technical and financial requirements involved. GDPR would require us to host data on EU-based servers and build a separate infrastructure to route and store data regionally, effectively doubling our hosting and development costs. As a nonprofit offering free tools to churches, we do not have the resources to support this at this time.

:::warning
If your church has members in the European Union, be aware that ChurchApps does not currently meet GDPR requirements. Consult with your legal advisor about compliance obligations before storing EU member data.
:::
