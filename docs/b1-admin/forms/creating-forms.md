---
title: "Creating Forms"
---

# Creating Forms

<div class="article-intro">

Build custom forms to collect information from your congregation. You can create forms for event registrations, surveys, visitor cards, membership applications, and more. Forms can be linked to people in your database or used as standalone pages with their own public URL.

</div>

## Training Video

<YouTube id="sr9wxEj9ghQ" title="Creating Forms and Managing Submissions in B1" />

<div class="prereqs">
<h4>Before You Begin</h4>

- For **People** forms (linked to person records), you need [people in your database](../people/adding-people.md) first.
- For forms that collect **payments**, you must have [Stripe configured for online giving](../donations/online-giving-setup.md).

</div>

## Creating a New Form

1. Open the [Jump menu](../introduction.md#getting-around-with-the-jump-menu) (the search bar at the top-left of B1 Admin), expand **People**, and click **Forms**.
2. Click **Add Form**.
3. Enter a **name** for your form.
4. Choose the form type from the **Associate With** dropdown:
   - **People** — Associates submissions with [people records](../people/adding-people.md) in your database. People forms are filled in from a person's record, so they don't get a shareable link.
   - **Stand Alone** — Creates an independent form with its own public URL, ideal for external registrations. Only Stand Alone forms offer a [header photo](#adding-a-header-photo), a [QR code](#sharing-a-form-with-a-qr-code), a [linked group](#linking-a-form-to-a-group), and **Create a person record from submissions**.
5. Click **Save** to create the form.

Your new form will appear in the list. Click on it to start adding questions.

## Printing a Blank Form {#printing-a-blank-form}

Need a paper copy to hand out -- for a visitor card at the welcome desk, or a form someone without internet access can fill in by hand? Click **Print** next to a form on the main Forms list to open a preview, then click **Print**. Blank fields print with an underline or checkbox for each question so people can fill them in by hand; required questions are marked with an asterisk. The top of the page shows your church logo (the **Light Background Logo** from [Website > Appearance](../website/appearance.md), if you've uploaded one) with your church's name beneath it, then the form name. There are no other print options -- print the whole form or nothing.

## Sharing a Form with a QR Code {#sharing-a-form-with-a-qr-code}

Stand Alone forms have a **QR Code** link next to them on the main Forms list (archived forms don't). Click it to open a QR code for the form's public URL, with the link shown beneath it. Click **Download PNG** to save the code as an image you can print on bulletins or show on slides. Anyone who scans it opens the form on their phone.

## Adding Questions {#adding-questions}

1. Open your form and go to the **Questions** tab.
2. Click **Add Question**.
3. Select a **field type** from the Provider dropdown. Available types include:
   - **Textbox** — For short text answers
   - **Date** — For date selections
   - **Email** — For email addresses
   - **Phone Number** — For phone input
   - **Multiple Choice** — For selecting from predefined options
   - **Payment** — For collecting payments
4. Enter a **Title** and optional **Description** for the question. The description appears under the question when people fill out the form, so use it for hints like "Include any allergies we should know about."
5. Check **Require an answer** if the field is mandatory.
6. Click **Save**.
7. Repeat to add more questions.

:::warning
The **Payment** field type requires Stripe to be configured. If you haven't set up online giving yet, see [Online Giving Setup](../donations/online-giving-setup.md) before adding payment fields.
:::

## Managing Form Members {#managing-form-members}

1. Open your form and go to the **Form Members** tab.
2. Search for a person and add them with a role:
   - **Admin** — Can edit the form and view all submissions.
   - **View Only** — Can view submissions but cannot edit the form.

## Linking a Form to a Group {#linking-a-form-to-a-group}

You can link any Stand Alone form to a group -- for example, a prayer request form for a small group, or a medical release for a youth trip:

1. Open your form's **Details**.
2. Under **Linked group**, select the group, or leave it set to **None**.
3. Click **Save**.

Once a form is linked:

- **Group members** see the form in a **Forms** section on the group's page on B1.church while the form is open, with a **Fill out** button that opens it (see [Group Details](../../b1-church/groups/group-details.md#linked-forms)).
- **Group leaders** also see closed forms, and can read every submission's answers and print them (one submission or **Print all**). Leaders can only view answers -- they can't edit the form unless they are also [form members](#managing-form-members).
- **In B1 Admin**, the group's page shows a **Linked forms** section listing each linked form as **Open** or **Closed**. It appears for the group's leaders and for people who can administer forms. See [Group Members](../groups/group-members.md#linked-forms).

A form is closed when it is outside its availability timeframe. Archived forms are not shown on the group page.

### Automatically Adding Submitters to a Group {#automatically-adding-submitters-to-a-group}

Linking a form to a group doesn't add anyone to it on its own. To add every submitter to the linked group's roster, also turn on **Create a person record from submissions** in the form's details and click **Save**.

Each time someone submits the form, the matched or newly created person is added to the group (existing group members are skipped). This is useful for things like a camp sign-up form that should automatically build the camp's roster group.

### Sending a Follow-up Email

With **Create a person record from submissions** turned on, you can also email each person who submits the form. Fill in **Follow-up Email Subject** and **Follow-up Email Body** in the form's details. You can use the `{firstName}` and `{churchName}` tokens in both. The email is only sent when both fields are filled in.

:::info
Follow-up emails only go out after your church has been approved to send group email, and they count toward your church's daily email limit. See [Turning On Group Email for Your Church](../groups/group-members.md#turning-on-group-email-for-your-church).
:::

## Duplicating a Form

To reuse a form as a starting point for a new one, click **Duplicate** next to the form in the Forms list and confirm. B1 creates an exact copy of the form — including all questions — which you can then rename and edit independently.

:::tip
Duplication is handy for recurring events where the registration questions stay the same from year to year. Duplicate last year's form, update the name and dates, and you're ready to go.
:::

## Configuring Form Properties

You can update your form's name and settings at any time. For Stand Alone forms, you will also see a unique **public URL** that you can share with anyone, along with a **Description** field -- text shown above the questions on the public form page, useful for telling people what the form is for before they start filling it out.

### Adding a Header Photo {#adding-a-header-photo}

Stand Alone forms can show a **Header Photo** across the top of the form. In the form's details, click the photo box or **Add Photo**, then pick or upload an image (it is cropped to a 16:9 shape). Click **Save**. The photo appears under the form's name, above the description, on the form's public URL page and wherever the form is embedded with the website **Form** element. Use **Change Photo** to replace it or **Remove** to take it off.

Use the **Thank You Message** field to set what people see after they submit the form, including on the form's public URL page. If you leave it blank, they see "Thank you for submitting the form!"

:::tip
Stand Alone forms are great for event registrations. Share the public URL via email, social media, or embed the form directly on your church website.
:::

:::info
To embed a form on your B1 website, go to your website editor, add a new section, and select the **Form** element. Then choose the form you want to display. See [Managing Pages](../website/managing-pages.md) for details on editing your website.
:::
