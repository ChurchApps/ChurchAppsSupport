---
title: "Multi-Currency Support"
description: "Record and report donations in different currencies in B1 Admin, including manual entry, Stripe online giving, and how combined totals are converted."
---

# Multi-Currency Support

<div class="article-intro">

B1's multi-currency feature allows your church to accept and track donations in different currencies. This is particularly useful for churches with international members, missionaries, or multiple campuses in different countries.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You need permission to manage donations. See [Roles & Permissions](../people/roles-permissions.md) for details.
- Set up your [online giving](./online-giving-setup.md) with Stripe, which supports multi-currency transactions.
- Understand your church's accounting needs for handling multiple currencies.

</div>

Your church's currency starts on the currency of the country entered when the church signed up (for example, Kenyan shillings for a church in Kenya), and it is used if no currency has been saved yet. You can change it any time under **Settings → Giving** (the **Currency** dropdown). If your country isn't recognized, it starts on US dollars.

## Enabling Multi-Currency

Multi-currency support is enabled by default in B1:

- Online gifts are charged in the currency chosen in your **Giving** settings
- Each donation keeps the currency it was recorded in, and individual donation lines show that currency
- Combined totals are converted to your church currency (see [Converted Totals](#converted-totals))
- Stripe handles currency conversion to your payout currency for online giving

## Supported Currencies

The system supports all major world currencies, including:

- **USD** -- United States Dollar
- **EUR** -- Euro
- **GBP** -- British Pound
- **CAD** -- Canadian Dollar
- **AUD** -- Australian Dollar
- **MXN** -- Mexican Peso
- **BRL** -- Brazilian Real
- **INR** -- Indian Rupee
- **CNY** -- Chinese Yuan
- **JPY** -- Japanese Yen
- And many more...

The available currencies for online giving depend on your Stripe account's supported currencies.

## Recording Donations in Different Currencies

### Online Donations

When a member gives online through Stripe:

1. The gift is charged in the currency set under **Settings → Giving**; donors don't pick a currency at checkout
2. Stripe processes the payment in that currency
3. The donation is recorded in B1 with that currency and amount
4. Stripe automatically handles any necessary currency conversion to your account's payout currency

If you change the **Currency** setting later, new gifts use the new currency while gifts already recorded keep theirs, so your records can hold more than one currency.

### Manual Entry

Gifts you enter by hand -- in a batch, with **Import CSV**, or with **Log a gift** on a person's record -- are always recorded in your church currency, which is shown beside the **Amount** field. There is no currency dropdown for manual entry, so convert a gift made in another currency to your church currency before you enter it, and note the original amount in **Notes** if you need it.

## Viewing Multi-Currency Donations

### Donation Reports

Individual donation lines -- in a batch, on a fund's page, and on a person's giving history -- show each gift in the currency it was recorded in. Combined totals are converted, as described below.

### Converted Totals

Wherever B1 shows a single combined total -- the giving summary KPI cards, a donation batch total, and a fund's total -- donations recorded in a currency other than your church's default are converted to your church currency using current exchange rates, so the total is a single meaningful number instead of adding unlike currencies together. A **Converted at current exchange rates** note appears under the total whenever a conversion was applied. Individual donation line items still display in their original currency.

### Giving Statements

Giving statements list each gift's amount as it was recorded and add the amounts up without converting them, so a statement is only accurate when all of that donor's gifts for the year are in your church currency. If a donor gave in more than one currency, check their statement before you send it.

## Stripe Integration

For online giving, Stripe handles multi-currency transactions:

- **Automatic conversion** -- Stripe converts currencies to your account's default currency
- **Exchange rates** -- Stripe uses current market exchange rates
- **Fees** -- Currency conversion may incur additional Stripe fees
- **Payout currency** -- Funds are deposited in your account's default currency

:::info
Check your Stripe dashboard to see current conversion rates and any fees associated with multi-currency transactions.
:::

## Accounting Considerations

When working with multiple currencies:

- **Record-keeping** -- Keep track of original donation amounts and currencies for accurate reporting
- **Exchange rates** -- Note that Stripe's conversion rates may differ from your bank's rates
- **Tax receipts** -- Consult your accountant about how to report donations in different currencies for tax purposes
- **Fund allocation** -- You can allocate donations to specific funds regardless of currency

## Best Practices

- **Default currency** -- Set your primary church currency as the default for most transactions
- **Clear communication** -- Tell donors what currency they're giving in during the checkout process
- **Consistent reporting** -- Combined totals are always converted to your church currency automatically; open a batch or fund to see each gift's original amount and currency
- **Regular reconciliation** -- Reconcile Stripe payouts with your donation records, accounting for currency conversions

## Limitations

- Currency conversion for payment processing is handled by Stripe for online giving only; manual donations are recorded in your church currency as entered
- Historical reports and individual donation line items always show the original currency the gift was recorded in
- Combined totals (KPI cards, batch totals, fund totals) are converted to your church currency using current exchange rates -- these rates may differ slightly from your bank's or Stripe's rates at the time funds settle

## Related Articles

- [Online Giving Setup](./online-giving-setup.md) -- Configure Stripe for accepting donations
- [Recording Donations](./recording-donations.md) -- Manually enter donation records
- [Donation Reports](./donation-reports.md) -- Generate and view donation summaries
- [Giving Statements](./giving-statements.md) -- Create year-end giving statements
