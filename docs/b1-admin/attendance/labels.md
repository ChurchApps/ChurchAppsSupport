---
title: "Check-In Label Designer"
---

# Check-In Label Designer

<div class="article-intro">

The Label Designer lets you create and customize the name tag and pickup slip templates that print when families check in their children. You can control exactly what information appears on each label, where it is positioned, and how it looks.

</div>

<div class="prereqs">
<h4>Before You Begin</h4>

- Set up [Attendance](setup) and configure at least one service time with check-in enabled
- Set up [Check-In](check-in) so labels are printing
- You need administrative access to the Attendance section

</div>

## Opening the Label Designer

In B1 Admin, go to **Attendance** in the left sidebar and select **Labels**. You will see a list of your saved label templates, separated by type: **Nametag** and **Pickup Slip**.

## Label Types

- **Nametag** — printed and attached to the child. Typically includes the child's name, their classroom/session, and a security code.
- **Pickup Slip** — given to the parent or guardian. Typically includes the security code and a list of the children they checked in.

B1 starts you with a default nametag and a default pickup slip template sized for standard 3.5 × 1.1 inch thermal labels.

## Creating a Label Template

1. Click **Add Nametag** or **Add Pickup Slip** (or use the dropdown to choose).
2. A new template opens in the label editor.

### Label Editor

The editor shows a scaled preview of the label at the configured size. Along the left panel you can configure:

- **Name** — the template name (for your reference only)
- **Label Type** — Nametag or Pickup Slip
- **Width / Height** — label size in inches

### Adding Blocks

A label is built from blocks — individual pieces of content positioned on the label canvas. Click **Add Block** to insert a new block and choose its type:

- **Field** — pulls a data value at print time:
  - `person.displayName` — the person's full name
  - `sessions` — the service/classroom they checked in to
  - `securityCode` — the randomly generated pickup security code
  - `children` — list of children (for pickup slips)
  - `person.nametagNotes` — any special notes on the person's record
  - `campus` — the campus name
- **Text** — static text you type in (for headings, labels, or instructions)
- **Barcode** — a barcode encoding the security code

### Positioning Blocks

Each block has **X**, **Y**, **Width**, and **Height** fields expressed as percentages of the label canvas (0–100). Adjust these to position content precisely. You can also set:

- **Font Size** — text size in points
- **Bold** — toggle bold text
- **Align** — left, center, or right text alignment
- **Condition** — optionally hide the block if a field is empty (for example, only show nametagNotes if it has a value)

### Saving

Click **Save** to save the template. The updated template will be used the next time labels are printed in B1 Checkin.

## Reordering Templates

If you have multiple nametag or pickup slip templates, B1 Checkin will use the first template in the list by default. Drag templates to reorder them.

## Deleting a Template

Click the delete icon on any template row and confirm. Deleting the last template of a type restores the default built-in template.

:::tip
Make a test print after editing a template to confirm the layout looks right before your next service.
:::

## Related Articles

- [Check-In Setup](setup) — configure services and groups for check-in
- [Completing Check-In](check-in) — the check-in flow for families
- [B1 Checkin Getting Started](../../b1-checkin/getting-started/) — the Checkin kiosk app
