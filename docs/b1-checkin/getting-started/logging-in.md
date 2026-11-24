---
title: "Logging In to B1 Church Checkin"
sidebar_label: "Logging In"
description: "Sign in to the B1 Church Checkin kiosk app with your ChurchApps account, enter a two-factor code if needed, pick your church, and understand auto-login on the check-in tablet."
---

# Logging In

<div class="article-intro">

Before the kiosk can be used for check-in, you need to sign in with a ChurchApps account that has access to your church. This page covers the first-time login process, two-factor codes, church selection, auto-login behavior, and the privacy policy link.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Install B1 Church Checkin on your iPad or Android tablet (see [Getting Started](./index.md))
- Have your ChurchApps account email and password ready
- The account needs the **Checkin** permission (or **Edit Attendance**) at your church. An admin adds it in B1 Admin under **Settings > Roles** -- see [Check-In Kiosk Accounts](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## First-Time Login

1. Open the B1 Church Checkin app. After the splash screen, you will see the **Welcome Back** login card with the B1 Church Checkin logo.
2. Enter your **email address** in the **Email** field.
3. Enter your **password** in the **Password** field. Tap the eye icon to show or hide what you typed.
4. Tap **Login**.

The app validates your credentials and signs you in. If a field is empty or the email is not valid, the field shows a message such as **Please enter your email address**. If the email or password is incorrect, a **Login failed.** banner appears and the card shakes.

### Two-Factor Codes

If the account has [two-factor sign-in](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) turned on, the card changes to **Enter the 6-digit code from your authenticator app, or one of your backup codes.** Type the code into the **Code or backup code** field and tap **Login** again. A wrong code shows **That code didn't work. Please try again.**; tap **Back** to return to the email and password fields.

You only need the code for this first login; after that the kiosk stays signed in.

:::info
This is the same email and password you use for B1 Admin or any other ChurchApps product. You do not need a separate account for the check-in kiosk, though many churches create a dedicated kiosk account with only the **Checkin** permission.
:::

### Privacy Policy

Below the **Login** button the card reads **By logging in, I confirm that I have read the privacy policy**. Tap **privacy policy** to open the ChurchApps privacy policy inside the app; tap the back arrow to return to the login screen. The app version number is shown under the card.

## Selecting Your Church

After a successful login, the **Select a Church** screen lists the churches where your account has the **Checkin** or **Edit Attendance** permission. Churches where you only have other permissions are left out. Each church is shown with its name and logo (if one has been configured in B1 Admin).

- If your account is linked to **only one church**, you will still see the selection screen. Tap your church to continue.
- If your account is linked to **multiple churches**, tap the church you want this kiosk to serve. With more than eight churches, a **Search** box appears above the list to filter by name.
- If **no church** qualifies, the screen shows **No check-in access** -- *Your account needs the Check-in permission to run this kiosk. Ask your church admin to add it to one of your roles.* Tap **Logout**, have the permission added, and sign in again.

Once you select a church, the app loads that church's logo and appearance settings and opens the [services screen](../check-in/selecting-service.md). Your church logo appears in the header on all subsequent screens; see [Kiosk Display, Idle Screen, and Language](./kiosk-display.md).

If loading the church fails, a **Couldn't load services.** message appears; check the connection and tap the church again.

## Auto-Login on Return Visits

After the first successful login, the app keeps a secure sign-in token and your selected church on the tablet. It does not store your password. On future launches the splash screen reports its progress -- **Checking for updates...**, **Logging in...**, **Loading church data...** -- and then:

- Signs you back in with the saved token.
- Restores the saved church and takes you directly to the **services screen**.
- Returns to the **church selection** screen if you signed in before but never picked a church.
- Returns to the **login screen** if the saved sign-in is no longer valid or the tablet has no connection. Once the connection is back, closing and reopening the app usually signs you in again without retyping anything.

:::tip
Because the kiosk auto-logs in, you only need to enter credentials once during initial setup. After that, the tablet can be powered on and it will be ready to go.
:::

## Admin Settings

Admin Settings are hidden behind the header logo: tap the **church logo seven times** in quick succession and enter the kiosk PIN if one is set. From there you can change the service or printer, set the PIN, switch to manned station mode, start on the scanner, send an emergency broadcast, or log out. See [Admin Settings and Kiosk PIN](./admin-settings.md) for every option.

:::warning
Logging out clears the saved sign-in, church selection, and kiosk PIN. You will need to re-enter your email and password to use the kiosk again. Only log out when you need to switch accounts or reconfigure the kiosk.
:::

## Next Steps

Once logged in, [set up a printer](./printer-setup.md), [set a kiosk PIN](./admin-settings.md#protecting-the-kiosk-with-a-pin), or go directly to the [check-in workflow](../check-in/index.md).

## Related Articles

- [Admin Settings and Kiosk PIN](./admin-settings.md)
- [Check-In Kiosk Accounts](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)
- [Troubleshooting and Offline Behavior](./troubleshooting.md)
