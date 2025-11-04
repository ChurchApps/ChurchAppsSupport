---
layout: page
app: b1Admin
section: Donations
title: Giving Setup
---

## Start accepting Payments Online in B1.church Admin

[![How To Setup Online Giving](https://img.youtube.com/vi/M555wWLBEtg/0.jpg)](https://www.youtube.com/watch?v=M555wWLBEtg)

1. Setup an account for your church on [Stripe](https://stripe.com) (you will need to Activate your account and take it out of test mode)
2. Connect Your new Stripe account to B1.church Admin.

- On [Stripe](https://stripe.com) Login and Navigate to the Developers Section then on the left API Keys
- Copy the Publishable key
- Now Login to [Church Apps](https://churchapps.org/) You can use the same login as you used for setting up CHUMS
- Click on Church (Top center of the page)
- Then Edit Church Settings (Blue button on the Right side of the page)
- Click on the little green pencil to the Right of Church Settings
- Scrool Down to Giving
- Select the Provider as Stripe
- Paste the Publishable key in the Public Key spot
- Go back to Stripe and Reveal your Secrect Key you can only do this once. (make a backup)
- Return to Church apps and paste that key into the Secrect Key Spot Hit Save.
- Now we need to set up the page for the public to be able to start giving. Head over to [B1.Church](https://b1.church/) and login.
- Click On the Settings Icon
  <img width="1512" alt="Screen Shot 2023-03-14 at 9 35 37 AM" src="https://user-images.githubusercontent.com/65249159/225040257-1482a19b-79c1-4242-a398-8a55071f0369.png">
- Next we need to add a tab
  <img width="1512" alt="Screen Shot 2023-03-14 at 9 36 03 AM" src="https://user-images.githubusercontent.com/65249159/225040592-35750e6e-2508-40ad-9273-5ab57ccb4c2e.png">
- Choose Donation as the Type
  <img width="1512" alt="Screen Shot 2023-03-14 at 9 37 17 AM" src="https://user-images.githubusercontent.com/65249159/225040887-4d246d66-cff5-428e-86be-bd7071199439.png">
- Enter a name for the tab and click save
  <img width="1512" alt="Screen Shot 2023-03-14 at 9 39 15 AM" src="https://user-images.githubusercontent.com/65249159/225041271-f2e4b351-29b9-40b2-b32f-3fe212c43a08.png">
- You can also change the icon (Type Giv to get a great giving icon)
  <img width="1512" alt="Screen Shot 2023-03-14 at 9 41 41 AM" src="https://user-images.githubusercontent.com/65249159/225041560-b667e653-d04b-436e-85fa-528683834524.png">
- You are now ready to start taking donations.
- To find the domain to send those wanting to give go back to [B1.church Admin.org](https://b1Admin.org/) and login click on the settings icon to find your subdomain
  <img width="1512" alt="Screen Shot 2023-03-14 at 10 12 32 AM" src="https://user-images.githubusercontent.com/65249159/225047607-afde6b2f-9a26-4cbf-87b7-748e42bffb9a.png">
- (yoursubdomian).b1.church/donation-landing (example: https://cummingscc.b1.church/donation-landing). Now you can copy and paste or link your domain wherever you want to take donations.

## Admin work after payments start coming in.

- You will get a notification in your e-mail every time you get a donation on [Stripe](https://stripe.com).
- If you would like to change the email address that receives the notification of a donation go to the [Stripe](https://stripe.com) dashboard, click on the profile on the top right corner, in the pop-up choose "profile". Click on "edit" in profile and you can change the e-mail to whatever you choose.
  You can also follow [these](https://support.stripe.com/questions/change-the-email-address-where-stripe-emails-are-sent#:~:text=If%20you%20want%20account%2Drelated,Stripe%20to%20other%20email%20addresses) instructions to forward notifications to whoever you would like.

**Donation summary**

Gives a weekly summary of giving in graph form.
Download: Gives a csv with the total amount given, the week it was given and what fund it was given to.
This summary does not tell who gave.
You can filter the report by date. The top date should be the earlier date and the bottom date the most recent date.

**Batches**

This is a report of who gave, when they gave, how much they gave and to what fund.
Download: Gives a csv with the number of donations, the id, the name and the total amount given.
Click on “name” this opens a window with a breakdown of how many times the person donated and how much each time.
Click on “ID” and it opens a side window with a discription of that donation.
Download: Gives a csv with all the information in the data base about that donor and how much they gave.
