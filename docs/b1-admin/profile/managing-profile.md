---
title: "Managing Your Profile"
---

# Managing Your Profile

<div class="article-intro">

The Profile page lets you edit your personal account settings. Your profile is shared across all ChurchApps products, so any changes you make here will be reflected everywhere you use ChurchApps.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You must be logged in to your ChurchApps account
- Have your new email address or password ready if you plan to update them

</div>

## Profile Information

The Profile page shows your name and email address on the left, with an **Edit** button below them. Click **Edit** to open the **Edit Account** form, which contains your basic account details:

1. **Email** -- Your email address used for logging in and receiving notifications.
2. **First Name** and **Last Name** -- Your display name across ChurchApps.
3. **Password** -- Update your account password.

To update your information, edit the fields and click the **Save Changes** button. Click **Cancel** (or the **Back to** link with your name) to return to your profile without saving.

## Changing Your Password

1. On the Profile page, click **Edit**.
2. Enter your **Current password**.
3. Enter your new password in the **New password** field.
4. Re-enter it in the **Verify password** field.
5. Click **Save Changes**.

:::info
Your password must be at least 8 characters long. Make sure both the password and confirmation fields match exactly. You must confirm your current password to change it -- if you don't know it, use the **Forgot Password** link on the login page instead.
:::

## Linked Accounts

The **Linked Accounts** section shows any external services connected to your ChurchApps account. You can view which accounts are linked and manage those connections from this section.

## Two-Factor Sign-In

Two-factor sign-in adds a second step to logging in: after your password (or Google, Microsoft, or email sign-in link), you also enter a 6-digit code from an authenticator app on your phone, such as Google Authenticator, Microsoft Authenticator, 1Password, or Authy. It is optional and off by default. Once it is on, it applies to every ChurchApps login that uses your account -- B1 Admin, your church's B1.church site and app, B1 Church Checkin, Lessons.church, FreePlay, and the rest.

### Turning It On

1. On the Profile page, find the **Two-Factor Sign-In** section and click **Turn on**.
2. Scan the QR code with your authenticator app. If you can't scan it, type the key shown under **Can't scan? Enter this key:** into the app instead.
3. Enter the **6-digit code** your app shows and click **Verify**.
4. B1 Admin shows ten **backup codes**. Each one signs you in once if you lose your phone. Click **Copy** or write them down, store them somewhere safe, and click **I saved them**.

:::warning
The backup codes are shown only once. If you lose your phone and have no backup codes left, a ChurchApps server administrator will have to turn two-factor sign-in off for you after confirming who you are.
:::

When two-factor sign-in is on, the section reads **On** and shows how many backup codes you have left.

### Signing In With a Code

After you enter your password, the login screen asks for a code. Enter the 6-digit code from your authenticator app, or one of your backup codes, and submit it. Each backup code works only once. If the code is wrong, you'll see "That code didn't work. Please try again." After too many wrong codes, logins for your account are paused for a while.

Staying signed in on a device you have already logged in on does not ask for a code again; it only comes up when you log in fresh.

### Turning It Off

1. In the **Two-Factor Sign-In** section, click **Turn off**.
2. Enter a current code from your authenticator app, or a backup code.
3. Click **Verify**.

:::info
Two-factor sign-in can't be set up on demo accounts, so the section is hidden there.
:::

## Theme Preferences

B1 Admin lets you pick a color theme and a light or dark display mode:

1. Click your profile picture in the top right corner of B1 Admin to open your user menu.
2. Under **Theme Preferences**, choose a theme:
   - **Default** -- The current B1 Admin look: bordered panels on a clean canvas. New users see this theme until they pick another.
   - **Classic** -- The earlier B1 Admin look, with a colored page banner, shadowed cards, and a grey background. If you used B1 Admin on this device before the new look arrived and never picked a theme, you stay on Classic.
   - **Custom** -- The Default look built from your church's own color. It uses the light-mode primary color from **Mobile > App Theme**, or your website's primary color if no app color is set, so B1 Admin matches your member app.
3. Below the themes, choose **Light Mode** or **Dark Mode**.
4. The interface updates immediately to reflect your choice.

Your choices are remembered on that device and browser.

## Account Deletion

In the **Account Deletion** section of the Profile page, you will find the option to delete your account.

- If your church has **not** configured a Directory Approval Group, clicking **Delete my account** removes your account and associated data immediately, and this cannot be undone.
- If your church **has** configured a Directory Approval Group, your request is sent to that group for review instead. The button is disabled while the request is pending, and you'll be notified once your church approves or declines it. See [Reviewing Account Deletion Requests](./account-deletion.md) for what happens next.

:::warning
Account deletion — whether immediate or approved by your church — is permanent and cannot be reversed.
:::

:::info
If you are a **Domain Admin**, make sure to transfer administrative responsibilities to another user before deleting your account. See [Roles & Permissions](../settings/roles-permissions.md) for details on managing admin roles.
:::

:::info
Profile editing is disabled in demo mode. If you are using a demo account, you will not be able to make changes to your profile settings.
:::

## Next Steps

- [Managing Devices](./devices.md) -- View and manage your connected ChurchAppsPlayer devices
