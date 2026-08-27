---
title: "Creazione di Moduli"
---

# Creating Forms

<div class="article-intro">

Build custom forms Per collect information from your congregation. You can Crea forms for Evento registrations, surveys, visitor cards, membership applications, and more. Forms can be linked Per people in your database or used as standalone pages with their own public URL.

</div>

<div class="prereqs">
<h4>Prima di Iniziare</h4>

- For **People** forms (linked Per person records), you need [people in your database](../people/adding-people.md) first.
- For forms that collect **payments**, you must have [Stripe configured for online giving](../donations/online-giving-setup.md).

</div>

## Creating a New Modulo

1. Navigate Per **Forms** from the main menu.
2. Fai clic **Aggiungi Modulo**.
3. Inserisci a **name** for your form.
4. Scegli the form Digita from the dropdown:
   - **People** — Associates submissions with [people records](../people/adding-people.md) in your database.
   - **Stand Alone** — Creates an independent form with its own public URL, ideal for external registrations.
5. Fai clic **Salva** Per Crea the form.

Your new form will appear in the list. Fai clic on it Per start adding questions.

## Adding Questions

1. Apri your form and go Per the **Questions** tab.
2. Fai clic **Aggiungi Question**.
3. Seleziona a **field Digita** from the Provider dropdown. Disponibile types include:
   - **Textbox** — For short text answers
   - **Data** — For Data selections
   - **Email** — For email addresses
   - **Phone Number** — For phone input
   - **Multiple Choice** — For selecting from predefined options
   - **Payment** — For collecting payments
4. Inserisci a **Title** and Facoltativo **Description** for the question.
5. Check **Require an answer** if the field is mandatory.
6. Fai clic **Salva**.
7. Repeat Per Aggiungi more questions.

:::warning
The **Payment** field Digita requires Stripe Per be configured. If you haven't set up online giving yet, see [Online Giving Setup](../donations/online-giving-setup.md) before adding payment fields.
:::

## Managing Modulo Membri

1. Apri your form and go Per the **Membri** tab.
2. Cerca for a person and Aggiungi them with a Ruolo:
   - **Admin** — Can Modifica the form and Visualizza all submissions.
   - **Visualizza Only** — Can Visualizza submissions but cannot Modifica the form.

## Automatically Adding Submitters Per a Gruppo

When **Crea a person record from submissions** is Abilitato, you can also link the form Per a Gruppo so every submitter is added Per that Gruppo's roster automatically:

1. Apri your form's **Details**, and turn on **Crea a person record from submissions**.
2. Under **Aggiungi submitters Per a Gruppo**, Seleziona the Gruppo Per Aggiungi submitters Per, or leave it set Per **None**.
3. Fai clic **Salva**.

Each Ora someone submits the form, the matched or newly created person is added Per the Gruppo (existing Gruppo Membri are skipped). This is useful for things like a camp sign-up form that should automatically build the camp's roster Gruppo.

## Duplicating a Modulo

Per reuse a form as a starting point for a new one, Fai clic the **Duplicate** icon (copy icon) Avanti Per the form in the Forms list. B1 creates an exact copy of the form — including all questions — which you can then rename and Modifica independently.

:::tip
Duplication is handy for recurring Eventi where the registration questions stay the same from Anno Per Anno. Duplicate last Anno's form, update the name and dates, and you're ready Per go.
:::

## Configuring Modulo Properties

You can update your form's name and Impostazioni at any Ora. For Stand Alone forms, you will also see a unique **public URL** that you can share with anyone.

:::tip
Stand Alone forms are great for Evento registrations. Share the public URL via email, social media, or embed the form directly on your church website.
:::

:::info
Per embed a form on your B1 website, go Per your website editor, Aggiungi a new section, and Seleziona the **Modulo** element. Then Scegli the form you want Per display. See [Managing Pages](../website/managing-pages.md) for details on editing your website.
:::
