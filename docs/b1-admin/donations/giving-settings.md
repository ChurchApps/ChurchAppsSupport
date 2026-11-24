---
title: "Giving Settings Reference"
description: "Every field in B1 Admin's Settings > Giving section explained: payment provider and keys, the Transaction Fee switch, currency, processing fee rates, statement options, and giving privacy."
---

# Giving Settings Reference

<div class="article-intro">

All of your church's giving configuration lives in one section of **Settings**. This page walks through every field in **Settings > Giving** and the related **Giving privacy** section, says what each one does, and points you to the article that covers it in depth. Use it when you are not sure what a setting changes before you touch it.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need the **Edit Settings** permission under **Donations**. The **Giving** section does not appear on the Settings page without it
- Have your provider's API keys to hand if you are connecting a gateway (see [Online Giving Setup](online-giving-setup.md))

</div>

## Opening the Section

Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu), click **Settings**, and click **Giving** in the left-hand list (the Giving Statements page's **Statement format** button brings you here too). The read-only view shows your provider and currency, for example "Stripe · USD". Click **Edit** to change anything. Every field below is saved together when you click **Save**, and **Cancel** discards the changes.

## Payment Gateway

### Provider

Which company processes your online gifts: **None**, **Stripe**, **Kingdom Funding**, or **Paystack**. **PayPal** only appears if your church was already connected to it; it is not offered for new setups. Choosing a provider shows that provider's set-up sentence with a link to its dashboard and the key fields below.

Choose **None** to turn online giving off. B1 removes the stored gateway (keys included), and the public giving page stops accepting gifts. Your recorded donations are not affected, and you can still pick a **Currency** for the gifts you type in by hand.

### Key Fields

The fields depend on the provider:

| Provider | Fields |
|----------|--------|
| Stripe | **Public Key**, **Secret Key** |
| Kingdom Funding | **Tokenization Key**, **Source Key**, **Webhook Key** |
| Paystack | **Public Key**, **Secret Key** |
| PayPal (existing churches) | **Client ID**, **Client Secret** |

Secret fields are never shown again after saving; they display as `********`. Leave a secret field blank to keep the saved value, or paste a new key to replace it. The first time you choose a provider, and whenever you switch from one provider to another, the secret key is required, and B1 refuses to save with "Please enter the secret/private key for this provider before saving."

For Kingdom Funding and Paystack a **webhook URL** is shown under the provider sentence with a copy button; paste it into your provider's dashboard so B1 is told about completed and recurring payments. Stripe needs no manual webhook step: B1 registers its own webhook with Stripe when you save, which is also why re-saving refreshes the events Stripe sends (see [Failed Recurring Gifts](failed-gifts.md)).

### Transaction Fee Switch {#transaction-fee-switch}

The **Transaction Fee** switch (its help icon reads "Automatically forces users to cover the transaction fees") controls whether covering the processing fee is the donor's choice or required:

- **Off** (the default) -- the giving form shows a checkbox, "I'll generously add ... to cover the transaction fees so you can keep 100% of my donation." Donors decide.
- **On** -- the fee is always added. The form shows "Transaction fees of ... are applied." with no checkbox, and the **Total Donation Amount** includes the fee.

Either way, the fee is worked out from the rates under [Fees & Statements](#fees-and-statements), the gift is recorded at the fund amount the donor chose, and the extra appears as **Transaction Fee** on the donor's thank-you email. B1 itself takes no cut.

### Currency

The currency your church gives and records in. With a provider chosen, the list holds the currencies that provider supports and a note reminds you to enable the same currency in the provider's dashboard. With **None**, every currency is listed with the note "The currency your church records gifts in." See [Choosing Your Currency](online-giving-setup.md#choosing-your-currency) and [Multi-Currency Support](multi-currency.md).

## Fees & Statements {#fees-and-statements}

### Processing Fee Rates

These rates are used to calculate the fee shown to donors (and to paid event registrations). The fields shown depend on the provider:

| Provider | Fields | Starting values |
|----------|--------|-----------------|
| Stripe | **Flat Rate [ Credit Card ]**, **Transaction Fee [ Credit Card ]** (percent) | Stripe's standard rate for your currency, for example 0.30 and 2.9 in USD |
| Stripe, USD only | **Flat Rate [ ACH ]** (percent), **Hard limit [ ACH ]** (amount) | 0.8 and 5 |
| PayPal | **Flat Rate [ PayPal ]**, **Transaction Fee [ PayPal ]** | 0.30 and 2.9 |
| Kingdom Funding | **Flat Rate [ Kingdom Funding ]**, **Transaction Fee [ Kingdom Funding ]** | 0.30 and 2.9 |

The card fee is calculated so your church receives the full gift after the processor takes its cut: `(gift + flat rate) / (1 − percent) − gift`. For a 100.00 card gift at 0.30 and 2.9%, the donor is asked for 3.30. The ACH fee is the percentage of the gift, capped at the **Hard limit**. If you have negotiated rates with your provider, enter them here so the amount you ask donors for matches what you are charged. Clearing a field puts the default back.

:::info
Changing the **Currency** re-fills the card fee fields with the provider's standard rates for that currency, but only if you have never saved your own values. Rates you have saved are kept.
:::

### Statement Fields

The rest of the section controls printed giving statements and what members see of their own history:

- **Statement Format** -- **Standard**, **Canada - CRA official receipt**, **Australia**, or **New Zealand**. See [Receipt Formats for Canada, Australia and New Zealand](giving-statements.md#receipt-formats-for-canada-australia-and-new-zealand).
- **Tax ID** (labelled **CRA Registration Number**, **ABN**, or **NZ Charity Registration Number** for those formats) and **Organization Address** -- see [Tax ID and Organization Address](giving-statements.md#tax-id-and-organization-address).
- **Authorized Signatory Name** and, for Canada, **City of Issue** -- only shown for the country formats.
- **Member Giving History** -- **All years**, **Through 2025** (or another year), or **Hidden**. See [What Members See in B1.church](giving-statements.md#what-members-see-in-b1church).
- **Statement Year Starts In** -- the first month of your statement year; **January** unless your tax year differs. See [Statement Year Start Month](giving-statements.md#statement-year-start-month).
- **Tax Disclaimer** -- your own wording in place of the "no goods or services" sentence. See [Tax Disclaimer](giving-statements.md#tax-disclaimer).
- **Giving Note** -- printed at the bottom of statements and shown on members' giving pages, for example your refund policy.

## Giving Privacy

**Giving privacy** is its own section in the Settings list, just below **Giving**. Its single switch, **Hide giving on person records until clicked**, keeps amounts off the person record until someone with giving access clicks **Show giving**. The section's summary row reads **Shown** or **Hidden until clicked**. See [Giving Privacy](../settings/church-settings.md#giving-privacy) for the walkthrough and [Giving on a Person's Record](person-giving.md) for what the card looks like either way.

## Related Articles

- [Online Giving Setup](online-giving-setup.md) -- step-by-step provider connection
- [Giving Statements](giving-statements.md) -- the statement settings in depth
- [Multi-Currency Support](multi-currency.md) -- how the currency setting affects totals
- [Church Settings](../settings/church-settings.md) -- the rest of the Settings page
