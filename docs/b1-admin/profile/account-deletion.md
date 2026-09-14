---
title: "Reviewing Account Deletion Requests"
---

# Reviewing Account Deletion Requests

<div class="article-intro">

When a church has a Directory Approval Group configured, account deletion no longer happens instantly — a member's request becomes a task that your approval group reviews before anything is removed. This page explains how the request is made, how to approve or decline it, and what happens in each case.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- A **Directory Approval Group** must be configured under **Mobile &rarr; Member portal**. Without one, clicking **Delete my account** on the Profile page still deletes the account immediately, with no review step. See [Mobile App Settings](../settings/mobile-app.md).
- Approving or declining a request requires the **People &gt; Edit** permission.

</div>

## How a Member Requests Deletion

Account deletion is requested from the **My Profile** page — the same shared account page covered in [Managing Your Profile](./managing-profile.md) — under its **Account Deletion** section. When an approval group is configured, confirming the request does not delete anything right away. Instead it:

1. Creates an open task titled **"Account deletion request"**, assigned to the Directory Approval Group, under **Serving &rarr; Tasks**.
2. Disables the **Delete my account** button for that person and shows a notice that the request is awaiting review.

Submitting a second request while one is already open just reopens the same task — a person can only have one pending deletion request at a time.

## Reviewing a Request

1. Go to **Serving &rarr; Tasks** (or **Assigned to My Groups** on your dashboard, the same place [profile change requests](./approving-profile-changes.md) appear).
2. Open the task titled **"Account deletion request from *Name*"**.
3. You'll see two actions: **Approve deletion** and **Decline**.

### Approving

Confirm **"Permanently anonymize this person's record and remove their login? This cannot be undone."** This replaces the person's personal information with generic values (the same anonymization used by the **Data Management &gt; Anonymize** action on a person's record — see [Data Security](../settings/data-security.md)) and removes their login. The task closes automatically, and the member is notified that their request was approved.

### Declining

Declining requires a reason, because GDPR only allows refusing an erasure request for a legal exception:

- **Legal retention** (donations, tax, or employment records)
- **Needed for a legal claim**
- **Other** — explain in the text box (at least 10 characters)

The member is notified of the decision along with the reason you gave, and may resubmit their request or escalate to a supervisory authority if they disagree.

:::info
Churches have 30 days to respond to a deletion request. The task is due in 28 days, and the approval group gets automatic reminders if it's still open after 21 and 27 days.
:::

:::tip
Deletion and profile-change requests use the same Directory Approval Group and the same Tasks-based review flow — see [Approving Profile Changes](./approving-profile-changes.md) if you also need to review directory update requests.
:::

## Related Articles

- [Managing Your Profile](./managing-profile.md) — Where members request deletion of their own account
- [Approving Profile Changes](./approving-profile-changes.md) — The similar review flow for directory update requests
- [Data Security](../settings/data-security.md) — GDPR compliance and admin-initiated anonymization
- [Mobile App Settings](../settings/mobile-app.md) — Configuring the Directory Approval Group
