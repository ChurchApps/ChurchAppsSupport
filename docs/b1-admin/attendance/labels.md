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

- **Fields** — pull a value in at print time. Nametags offer **Display Name**, **First Name**, **Last Name**, **Nickname**, **Nametag Notes** (the notes on the person's record), **Birthday This Week** (true when the person's birthday falls within 3 days before or after the check-in date), **Sessions** (the service times and rooms they checked in to), **Security Code**, **Date**, and **Church Name**. Pickup slips offer **Children**, **Children & Allergies**, **Security Code**, **Date**, and **Church Name**.
- **Text** — static text you type in (for headings, labels, or instructions)
- **Barcode** — a Code 128 or Code 39 barcode of a field, such as the security code
- **QR Code** — a QR code of a field
- **Box** — a rectangle with an optional fill color and border

### Positioning and Styling Blocks

Drag a block on the label to move it, or click it and use the **Properties** panel. **X**, **Y**, **W**, and **H** are percentages of the label (0–100). Depending on the block, you can also set:

- **Font Size** — text size, relative to the label's height
- **Bold** and **Italic**
- **Align** — Left, Center, or Right
- **Symbology** and **Value** — for barcodes and QR codes
- **Fill** and **Border** — for boxes
- **Condition** — **Always** shows the block. Pick a field to show the block only when that field **Is not blank**, **Is blank**, **Equals**, or **Does not equal** a value. For example, show nametag notes only when they are filled in, or show a birthday graphic only when **Birthday This Week** equals `true`.

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
