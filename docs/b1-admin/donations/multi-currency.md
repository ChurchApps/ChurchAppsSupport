---
title: "Multi-Currency Support"
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

## Enabling Multi-Currency

Multi-currency support is now enabled by default in B1. Once enabled:

- Members can give in their local currency when donating online
- You can manually record donations in any currency
- Donation reports show amounts in their original currency
- Stripe handles currency conversion automatically for online giving

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

1. They select their preferred currency at checkout
2. Stripe processes the payment in that currency
3. The donation is recorded in B1 with the original currency amount
4. Stripe automatically handles any necessary currency conversion to your account's default currency

### Manual Entry

To record a cash or check donation in a different currency:

1. Navigate to **Donations** in B1 Admin
2. Click **Add Donation**
3. Select the currency from the currency dropdown
4. Enter the amount in that currency
5. Complete the rest of the donation details
6. Click **Save**

## Viewing Multi-Currency Donations

### Donation Reports

Donation reports display amounts in their original currency:

- Individual donation records show the currency code (e.g., "$100.00 USD")
- Totals are calculated per currency
- You can filter by specific currencies

### Giving Statements

When generating giving statements:

- Each donation appears with its original currency
- Totals are broken down by currency
- Members see exactly what they gave in each currency

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
- **Consistent reporting** -- Decide whether to report in original currencies or convert to a single currency for summaries
- **Regular reconciliation** -- Reconcile Stripe payouts with your donation records, accounting for currency conversions

## Limitations

- Currency conversion is handled by Stripe for online giving only
- Manual donations are recorded as-entered with no automatic conversion
- Historical reports show donations in their original currencies
- Total calculations are done per-currency, not across currencies

## Related Articles

- [Online Giving Setup](./online-giving-setup.md) -- Configure Stripe for accepting donations
- [Recording Donations](./recording-donations.md) -- Manually enter donation records
- [Donation Reports](./donation-reports.md) -- Generate and view donation summaries
- [Giving Statements](./giving-statements.md) -- Create year-end giving statements
