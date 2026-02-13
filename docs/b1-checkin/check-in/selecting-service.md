---
title: "Selecting a Service"
---

# Selecting a Service

The first step of every check-in is choosing which service you are attending. The services screen appears right after the app finishes loading.

## How It Works

1. After logging in (or after auto-login on return visits), the app displays the **services screen**.
2. You will see a list of all services that have been configured for your church. Each service appears as a card showing the service name (for example, "Sunday Morning" or "Wednesday Evening").
3. Tap the service you are attending.

The app loads the service times and groups associated with that service, then takes you to the member lookup screen.

:::info
Services are configured by your church administrator in B1 Admin under the Attendance section. If you do not see the service you expect, ask your admin to verify it has been created.
:::

## What Happens Behind the Scenes

When you select a service, the app fetches three things from the server:

- The **service times** for that service (for example, a single service might have a 9:00 AM and an 11:00 AM time slot).
- The **groups** available at each service time (for example, Nursery, Preschool, Elementary).
- The **group-to-service-time links** that determine which groups are available at which times.

This data is cached locally so the rest of the check-in process is fast and responsive.

:::note
If your church has only one service configured, you still need to tap it to proceed. The app does not auto-select a single service.
:::
