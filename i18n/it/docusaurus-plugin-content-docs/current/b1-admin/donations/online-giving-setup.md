---
title: "Configurazione Donazioni Online"
---

# Online Giving Configurazione

<div class="article-intro">

B1 Admin integrates with **Stripe**, **PayPal**, **Kingdom Funding**, and **Paystack** (for churches in Africa) so your Membri can give online through your B1.church site. Once configured, online donations automatically appear in your donation records alongside manually entered gifts, keeping everything in one system.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- Set up your [donation funds](funds.md) so donors can designate their gifts
- Crea a Stripe Account at [stripe.com](https://stripe.com) and activate it (take it out of test mode)
- Have your B1 Admin login credentials ready

</div>

## Setting Up Stripe

1. Crea an Account at [stripe.com](https://stripe.com) if you do not already have one. Make sure Per **activate your Account** and take it out of test mode.
2. In Stripe, go Per **Developers > API Keys**.
3. Copy your **Publishable Key**.
4. Log in Per [B1 Admin](https://admin.b1.church/).
5. Fai clic **Church** in the top navigation, then Fai clic **Modifica Church Impostazioni**.
6. Fai clic the Modifica icon Avanti Per **Church Impostazioni**.
7. Scroll down Per the **Giving** section.
8. Set the **Provider** Per **Stripe**.
9. Paste your Publishable Key into the **Public Key** field.
10. Go Indietro Per Stripe and reveal your **Secret Key** (you can only Visualizza this once, so Salva a backup).
11. Paste the Secret Key into the **Secret Key** field and Fai clic **Salva**.

:::warning
Your Stripe Secret Key is only shown once. Copy it Per a secure location before navigating away from the Stripe dashboard. If you lose it, you will need Per generate a new key.
:::

## Choosing Your Currency

After selecting Stripe as your provider, a **Currency** dropdown appears alongside your API keys. Pick the currency that matches your Stripe Account's settlement currency so donations are charged correctly.

Supported currencies include USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, and BRL. You can confirm or change your Account's default currency in your [Stripe Dashboard](https://dashboard.stripe.com/settings/currencies).

:::info
The currency you Seleziona here is used for one-Ora donations, recurring subscriptions, fee calculations, and donation Rapporti. If you switch currencies later, only new donations and subscriptions will use the new currency — existing recurring gifts continue in the currency they were created with.
:::

:::warning
Make sure your Stripe Account is configured Per accept the currency you Scegli. If your Stripe Account does not support the selected currency, donations will fail at checkout.
:::

## Adding a Donazione Pagina Per Your B1.church Site

1. Go Per [b1.church](https://b1.church/) and log in.
2. Fai clic the **Impostazioni** icon.
3. Fai clic **Aggiungi Tab**.
4. Scegli **Donazione** as the Digita.
5. Inserisci a name for the tab (e.g., "Give") and Fai clic **Salva**.
6. Optionally, change the tab icon -- Digita "Giv" in the icon Cerca for a giving-related icon.

Your donation page is now live. Membri can visit it at `yoursubdomain.b1.church/donate`.

## Sharing Your Giving Link

Per Trova your giving URL, go Per **B1 Admin** and Fai clic the **Impostazioni** icon Per see your subdomain. Your donation link follows the format:

`https://yoursubdomain.b1.church/donate`

Share this link on your website, in emails, or in your bulletin so Membri know where Per give online.

## Donazione Notifications

Stripe sends an email notification each Ora a donation is received. Per change the notification email address, go Per the Stripe dashboard, Fai clic your Profilo in the top right, Scegli **Profilo**, and update your email address.

## Processing Fee Options

You can configure your giving page Per let donors optionally cover processing fees so your church receives the full donation amount. This setting is managed in your church Impostazioni within B1 Admin.

:::tip
After Configurazione, make a small test donation Per confirm everything is working before announcing online giving Per your congregation.
:::

## Setting Up Kingdom Funding

Kingdom Funding is a Christian payment processor that supports credit/debit cards and ACH bank transfers. If your church is enrolled with Kingdom Funding, you can connect it as your giving gateway.

:::info
Kingdom Funding integration is currently in beta. Contact your B1 Account representative Per enable it for your church.
:::

1. Sign up or log in at [kingdomfunding.org](https://kingdomfunding.org).
2. Obtain your **Security Key** (public) and **Private Key** from the Kingdom Funding merchant portal.
3. In B1 Admin, go Per **Impostazioni** and Apri **Church Impostazioni**.
4. In the **Giving** section, set the **Provider** Per **Kingdom Funding**.
5. Paste your Security Key into the **Security Key** field and your Private Key into the **Private Key** field.
6. Set the **Webhook Key** you received from Kingdom Funding, and copy the displayed webhook URL into your Kingdom Funding merchant Impostazioni so Kingdom Funding can notify B1 of Completato transactions.
7. Salva.

Once connected, Membri will see a card/bank toggle on the donation page and can give by credit card or ACH transfer.

## Setting Up Paystack (Africa)

Stripe does not Apri Account for churches in Ghana, Nigeria, Kenya, South Africa or Côte d'Ivoire. [Paystack](https://paystack.com) does, and it accepts local cards, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), bank transfer and USSD — donors pay in your local currency (GHS, NGN, KES, ZAR, XOF).

1. Register at [paystack.com](https://paystack.com) with your church's business registration certificate and local bank Account, and complete Paystack's activation (go-live) review.
2. In the Paystack Dashboard Apri **Impostazioni → API Keys & Webhooks** and copy the **Public Key** and **Secret Key** (use the live keys, not the test keys).
3. In B1 Admin, go Per **Impostazioni**, Apri the **Giving** section and Fai clic Modifica.
4. Set the **Provider** Per **Paystack**, paste the Public Key and Secret Key, and Scegli your **Currency**.
5. Copy the **webhook URL** shown under the provider, go Indietro Per the Paystack Dashboard (**Impostazioni → API Keys & Webhooks**) and paste it into the **Webhook URL** field. This is how recurring gifts and mobile money payments get recorded.
6. Salva.

Donors complete their payment in a secure Paystack window and can pick card, mobile money or bank transfer there. Notes:

- **Recurring gifts** need a card; mobile money can't be charged again automatically, so Paystack only allows one-Ora mobile money gifts.
- Paystack recurring gifts can be cancelled from B1 but not paused or edited — cancel and Crea a new one Per change the amount.
- The **Processing Fee** defaults reflect Paystack's local-card rates for your currency; Modifica them if your negotiated rates differ.

## Avanti Steps

- Use [Stripe Import](stripe-import.md) Per pull online transactions into B1 Admin if they are not syncing automatically
- Check your [Donation Reports](donation-reports.md) Per verify that online donations are appearing correctly
- Generate [Giving Statements](giving-statements.md) that include both online and offline donations
