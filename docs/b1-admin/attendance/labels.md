---
title: "Check-In Label Designer"
description: "Customize the nametag and pickup slip templates that print at check-in in B1 Admin, including fields, positioning, and birthday or notes conditions."
---

# Check-In Label Designer

<div class="article-intro">

The Label Designer lets you create and customize the name tag and pickup slip templates that print when families check in their children. You can control exactly what information appears on each label, where it is positioned, and how it looks.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up [Attendance](./setup.md) and configure at least one service time with check-in enabled
- Set up [Check-In](./check-in.md) so labels are printing
- You need the **Edit Attendance** permission

</div>

## Opening the Label Designer

In B1 Admin, open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left), expand **Mobile**, and click **Labels**. You can also click **B1 CheckIn** and then **Design Labels** on the **Check-in Labels** card.

The **Check-in Labels** page lists your saved templates with their **Name**, **Type** (**Nametag** or **Pickup Slip**), and **Size**. If you haven't made any yet, it says **No label templates**, and B1 Checkin prints its built-in nametag and pickup slip.

## Label Types

- **Nametag** — printed and attached to the child. Typically includes the child's name, their classroom/session, and a security code.
- **Pickup Slip** — given to the parent or guardian. Typically includes the security code and a list of the children they checked in.

Both starting templates are sized for standard 3.5 × 1.1 inch thermal labels (Brother DK-1201).

## Creating a Label Template

1. Click **Add label** and choose a starting point: **Nametag 3.5" x 1.1"**, **Pickup Slip 3.5" x 1.1"**, or **Blank**.
2. The template opens in the label editor, with a preview of the label filled in with sample data.

### Label Editor

Across the top of the editor you can set:

- **Name** — the template name (for your reference only; required)
- **Type** — Nametag or Pickup Slip
- **Width (in)** / **Height (in)** — label size in inches

### Adding Blocks

A label is built from blocks — individual pieces of content placed on the label. Click a button in the **Add Block** panel to add one:

- **Fields** — pull a value in at print time. Nametags and pickup slips offer different fields (see [Nametag and Pickup Slip Fields](#nametag-and-pickup-slip-fields) below).
- **Text** — static text you type in (for headings, labels, or instructions)
- **Barcode** — a Code 128 or Code 39 barcode of a field, such as the security code
- **QR Code** — a QR code of a field
- **Box** — a rectangle with an optional fill color and border

### Nametag and Pickup Slip Fields

Nametags offer these fields:

| Field | What prints |
|-------|-------------|
| **Display Name**, **First Name**, **Last Name**, **Nickname** | The person's name from their record |
| **Nametag Notes** | The **Name Tag Notes** on the person's record, such as allergies |
| **Birthday This Week** | `true` when the person's birthday falls within 3 days before or after the check-in date (useful in a condition) |
| **Age** | The person's age in whole years. Children under 2 print in months instead, for example `18 mo`. Blank when no birth date is on file. |
| **Grade** | The grade on the person's record, such as `PreK` or `3` |
| **Birth Date** | The person's birth date, in the date format of the kiosk tablet |
| **Check-in Type** | **Member**, **Guest**, or **Volunteer**, as chosen on the kiosk household screen |
| **Checked In By Name** | The name of the adult who checked the family in at the kiosk |
| **Checked In By Phone** | That adult's phone number (mobile, then home, then work) |
| **Sessions** | The service times and rooms the person checked in to |
| **Security Code**, **Date**, **Church Name** | The pickup security code, today's date, and your church's name |

Pickup slips offer **Children**, **Children & Allergies**, **Security Code**, **Date**, and **Church Name**.

The built-in nametag that prints when you have no templates doesn't include Age, Grade, Birth Date, Check-in Type, or Checked In By. To print them, add them to a template of your own.

**Checked In By** is the person whose name or phone number the family looked up on the kiosk, but only when that person is clearly an adult: not marked **Child** in the household, and either 18 or older by birth date or the household's **Head** or **Spouse** when no birth date is on file. If a child's name was searched, or nothing shows the person is an adult, these two fields print blank. Add a **Condition** of **Is not blank** so an empty "Checked in by" line doesn't print.

:::tip
Use **Check-in Type** to make volunteer badges look different. For example, add a box or a "VOLUNTEER" text block with the condition **Check-in Type** **Equals** **Volunteer**, or show a "Welcome!" block only for guests.
:::

### Positioning and Styling Blocks

Drag a block on the label to move it, or click it and use the **Properties** panel. **X**, **Y**, **W**, and **H** are percentages of the label (0–100). Depending on the block, you can also set:

- **Font Size** — text size, relative to the label's height
- **Bold** and **Italic**
- **Align** — Left, Center, or Right
- **Symbology** and **Value** — for barcodes and QR codes
- **Fill** and **Border** — for boxes
- **Condition** — **Always** shows the block. Pick a field to show the block only when that field **Is not blank**, **Is blank**, **Equals**, or **Does not equal** a value. For example, show nametag notes only when they are filled in, or show a birthday graphic only when **Birthday This Week** equals `true`. When the condition's field is **Check-in Type**, the **Value** is a list of **Member**, **Guest**, and **Volunteer** instead of a text box, and it matches no matter what language the kiosk uses.

Click **Remove Block** to delete the selected block.

### Saving

Click **Save** to save the template, or **Cancel** to discard your changes. B1 Checkin uses the updated template the next time it loads its settings.

## Choosing the Default Template

If you have more than one template of a type, click **Set Default** on the one B1 Checkin should print. It shows a **Default** badge, and any other template of that type stops being the default. If no template of a type is marked default, the kiosk uses the first one.

## Deleting a Template

Click **Delete** on the template's row and confirm. If you delete every template of a type, B1 Checkin goes back to its built-in label for that type.

:::tip
Make a test print after editing a template to confirm the layout looks right before your next service.
:::

## Related Articles

- [Attendance Setup](./setup.md) — configure services and groups for check-in
- [Check-In](./check-in.md) — set up the B1 Checkin kiosk
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/index.md) — the Checkin kiosk app
