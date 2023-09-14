
## How Data is Secured Within Chums ##

While there is no such thing as a perfectly secure system, we take data security seriously.  The following steps are taken to secure all data entered into Chums and other Live Church Solutions products.

#### Limiting Sensitive Data Stored ####
Our first approach is to not secure any more sensitive data than necessary.  This means never storing any credit card or bank account details used for making donations.  When a user makes a donation using Chums or B1, the credit card data is never transmitted to any of our servers, only your payment gateway (Stripe). This means in the event of a data breach, no credit card or bank info would be compromised.

We also never store passwords in our system.  All passwords are processed through a one-way hashing algorithm in which some of the data is destroyed, making it impossible for anyone to retrieve passwords from the database, even us.  To verify passwords, the entered value must pass through the same one-way hash and produce the same result.

After removing these two sources the only sensitive data that remains is a list of names and contact info.

#### Using Standard Best Practices ####

We use the industry standard best practices for security, including encrypting all data in transit to and from our servers using HTTPS.  All servers are hosted in a secure physical datacenter with Amazon Web Services.  All database servers are stored behind a firewall and are inaccessible from the Internet.

#### Data Segregation ####

Data is separated into different databases based on scope.  Each of our APIs (Membership, Giving, Attendance, Messaging, Doing and Lessons) are independent silos of data with their own databases.  If one of them is compromised, the usefulness of the data is limited without others also being compromised.  For example, if the Giving API/database was to be compromised, a bad actor could potentially gain access to a list of donations and dates (but never card/bank data).  However, they would not have access to which users made the donations or which churches they were for as that data is stored in the separate Membership database.

#### Limited Access ####

Access to the production servers is strictly limited to the server administrators who require access.  This is currently two individuals who are also members of the board.  Developers, volunteers and other board members are not permitted access to the production servers.

#### Privacy Policy ####

Your data is yours and will never be sold to third parties.  You can read our full privacy policy [here](https://chums.org/privacy).
