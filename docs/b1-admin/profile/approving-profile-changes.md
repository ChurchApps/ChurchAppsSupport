---
title: "Approving Profile Changes"
description: "Review and approve member profile change requests in B1 Admin, and set up the Directory Approval Group that receives them."
---

# Approving Profile Changes

<div class="article-intro">

When your church requires administrator approval for profile updates, members submit their changes through the B1 App and those requests appear as tasks in B1 Admin. This guide explains how to review and approve them.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- You must be a member of the group designated as the **Directory Approval Group** in **Mobile &rarr; Member portal**
- If no approval group has been configured, profile changes are applied immediately without review, and parents can't send changes for their children from the app

</div>

## Where to Find Pending Requests

When a member submits a profile change, it appears as a task assigned to your approval group. You can find it in two places:

**From the Dashboard (your home page):**
1. Log in to B1 Admin — the Dashboard loads automatically.
2. In the **My tasks** section, click **All tasks**. (My tasks lists only open tasks assigned to you personally.)
3. Click the **Assigned to My Groups** tab. Any pending profile change requests will be listed there.

**From Serving &rarr; My Work:**
1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin) and expand **Serving**.
2. Click **My Work**.
3. Click the **Assigned to My Groups** tab under Tasks.

## Reviewing and Approving a Request

1. Click the profile change task to open it. It is titled *Profile changes for* followed by the person's name.
2. Under **Requested Changes**, you will see each field the member wants to update along with the new value they submitted. If someone other than the person being changed sent the request, a line above the list reads **Submitted by** *requester* **for** *person* (for example, "Submitted by Jane Smith for Emma Smith").
3. Review the changes.
4. Click **Apply** to approve and save the changes to their profile.

A request to add a family member shows the new person's title, name, household role, and mobile phone on one line (for example, *Mr John Smith · Child · 555-0100*), along with the email address and photo the member supplied, if any. Applying it creates that person in the member's household with those details, including the email and photo.

A request can include the person's name, photo, birth date, anniversary, email, address, and home, mobile, or work phone. A few kinds of changes look different in the list:

- **New photo** shows the uploaded picture. Applying it replaces the person's photo.
- **Remove photo** appears when the member tapped **Remove photo** in the app. Applying it takes their photo down, so their record shows the default picture.
- **Anniversary** shows the new anniversary date. Applying it saves the date on the person's record.

The task will close automatically once the changes are applied.

## Requests From a Parent for a Child {#requests-for-a-child}

A parent can ask for changes to their child's profile from the B1 App (see [Editing a Child's Profile](../../b1-church/getting-started/editing-your-profile.md#editing-a-childs-profile)). These requests always come to your Directory Approval Group for review; they are never saved directly. The task title reads *Profile changes for* the child's name *(submitted by* the parent's name*)*, and the **Requested Changes** panel shows **Submitted by** *parent* **for** *child*. Applying the request updates the child's record.

B1 only accepts these requests when:

- the person sending it is the **Head** or **Spouse** of their household (and not known to be under 18),
- the person being changed is in the same household with the **Child** role (and not known to be 18 or older), and
- your church has a Directory Approval Group set up.

Parents can change a child's photo, name, and contact details this way, but can't add family members through a child's profile. To let a parent edit a child's profile, make sure their household roles are set correctly in the [household panel](../people/adding-people.md#managing-households).

## Setting Up the Approval Group

If your church wants profile changes to require approval, a Directory Approval Group must be configured first.

1. Open the Jump menu and expand **Mobile**.
2. Click **Member portal** (the "Portal settings" page).
3. Under **Directory Approval Group**, select the group whose members should review profile change requests.
4. Click **Save**.

Any member of that group will see incoming profile change requests under **Assigned to My Groups** on their Dashboard.

The same Directory Approval Group also reviews **account deletion requests** — see [Reviewing Account Deletion Requests](./account-deletion.md).

:::tip
Make sure your approvers are actually members of the configured group — only group members will see the requests.
:::

## Related Articles

- [Managing Your Profile](./managing-profile.md) — Edit your own account settings
- [Reviewing Account Deletion Requests](./account-deletion.md) — The same approval-group review flow for account deletion
- [Editing Your Profile](../../b1-church/getting-started/editing-your-profile.md) — What members see when they submit a profile change
