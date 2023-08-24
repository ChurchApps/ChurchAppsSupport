## Connecting your B1 Website to your domain.

The process for configuring DNS records may differ depending on the registrar and DNS provider you are using. 
The options available for setting up the root domain (e.g., example.com) typically include CNAME or A - ALIAS records.

Modern registrars support either a CNAME or A - ALIAS record for the root domain. 
In this case, you should set the record to "proxy.b1.church." This allows you to easily point the root domain to the desired destination.

However, for older registrars that do not support CNAME or A - ALIAS records for the root domain, 
an A record must be used to point to the IP address instead. This requires specifying the IP address directly in the DNS settings.

It's important to note that the specific instructions may vary depending on your registrar's interface and the DNS provider you are using. 
It's recommended to refer to the documentation or support resources provided by your registrar and DNS provider for precise instructions 
tailored to your setup.

In this example, let's assume we are using GoDaddy.com as the registrar, which operates with the older type of DNS configuration. 
With GoDaddy, we need to set up an A record to point the root domain to the desired IP address.

###  Navigate to the b1 app to ensure your homepage path is left blank to load the website as the root.

<img width="1473" alt="Screen Shot 2023-07-08 at 8 05 03 PM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/fe610952-6889-4ab0-aab8-b03503ccbbbc">

### Navigate to Chums.org and log in once logged in click on setting then click the pencil icon to edit the church settings.

<img width="1497" alt="Screen Shot 2023-07-09 at 7 08 22 AM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/d9133b07-c217-441c-8073-a8d29488b8ab">

### Scroll down and add your domain ad it 2 times one with www and one without then click save.
<img width="1473" alt="Screen Shot 2023-07-08 at 8 00 52 PM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/fb5e4ce7-f57a-4287-8717-8c610b50ae33">

### Login to your go-daddy account and navigate to your domains once you find the domain you want to use click on DNS.
<img width="1469" alt="Screen Shot 2023-07-08 at 7 10 53 PM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/09d8ff68-e528-495c-81bc-645b882ce91c">

### Click on DNS Records then click on "Add new Record".
<img width="1462" alt="Screen Shot 2023-07-09 at 6 48 05 AM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/80705e90-981e-4ff2-af2b-8573bcc0eadb">

### First let's add the CNAME: proxy.b1.church
<img width="1473" alt="Screen Shot 2023-07-08 at 7 57 13 PM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/accb1372-051f-48a8-ad37-07224f1e1af2">

### Next the A Record 3.23.251.61.
<img width="1462" alt="Screen Shot 2023-07-09 at 6 50 59 AM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/886360b0-2ffc-4cf6-973f-e703a25ba11b">

### After adding both records, the page should resemble the following example, indicating that your site is now pointing to the website you created on b1.Church.
<img width="1473" alt="Screen Shot 2023-07-08 at 7 57 49 PM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/7b56fe27-10ca-486b-bf18-7f61b9fd8df7">

### If for some reason you can not change your DNS records click on Nameservers then "change name Serververs and make sure you are on GoDaddy nameServers.
<img width="1497" alt="Screen Shot 2023-07-09 at 7 23 57 AM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/54b97102-d09a-41e5-b88b-ea3b625fbd44">
<img width="1497" alt="Screen Shot 2023-07-09 at 7 25 12 AM" src="https://github.com/LiveChurchSolutions/ChurchAppsSupport/assets/65249159/2a1828b1-9c58-4d98-a573-d56992064bf6">


