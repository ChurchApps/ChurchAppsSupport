---
title: "Selecting a Service"
---

# Selecting a Service

<div class="article-intro">

The first step of every check-in is choosing which service you are attending. The services screen appears right after the app finishes loading and determines which service times and groups are available for the rest of the check-in flow.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- [Log in](../getting-started/logging-in) to the B1 Church Checkin app and select your church
- Ensure your church administrator has [configured services and service times](../../b1-admin/attendance/setup.md) in B1 Admin

</div>

## How It Works

1. After logging in (or after auto-login on return visits), the app displays the **services screen**.
2. You will see a list of all services that have been configured for your church. Each service appears as a card showing the service name (for example, "Sunday Morning" or "Wednesday Evening").
3. Tap the service you are attending.

The app loads the service times and groups associated with that service, then takes you to the [member lookup screen](./looking-up-members).

## When Check-In Isn't Open

If your administrator gave a service time a [check-in schedule](../../b1-admin/attendance/setup#setting-a-check-in-schedule), the app only offers that service time while its check-in window is open. Service times whose window is closed right now are hidden, so families can't pick them later in the flow.

If every service time for the service you tapped is closed, the app shows **"Check-in isn't open for this service right now."** Tap **Back** to return to the services list and choose a different service, or wait until the window opens and try again.

:::info
Check-in windows follow your church's time zone. If your church doesn't have a time zone set, the time zone of your campus is used instead. If a service time seems to open at the wrong hour, ask your administrator to check the time zone on your church or campus settings.
:::

:::info
Services are configured by your church administrator in B1 Admin under the Attendance section. If you do not see the service you expect, ask your admin to verify it has been created in the [attendance setup](../../b1-admin/attendance/setup.md).
:::

## What Happens Behind the Scenes

When you select a service, the app fetches three things from the server:

- The **service times** for that service (for example, a single service might have a 9:00 AM and an 11:00 AM time slot).
- The **groups** available at each service time (for example, Nursery, Preschool, Elementary).
- The **group-to-service-time links** that determine which groups are available at which times.

This data is cached locally so the rest of the check-in process is fast and responsive.

:::tip
If your church has only one service configured, you still need to tap it to proceed. The app does not auto-select a single service.
:::

## Next Step

After selecting a service, you will [look up your family](./looking-up-members) by phone number or name.
