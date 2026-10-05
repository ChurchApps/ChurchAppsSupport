---
title: "Configuration des dons en ligne"
---

# Configuration des dons en ligne

<div class="article-intro">

B1 Admin s'intègre avec **Stripe**, **PayPal**, **Kingdom Funding** et **Paystack** (pour les églises en Afrique) pour que vos membres puissent faire des dons en ligne via votre site B1.church. Une fois configurés, les dons en ligne apparaissent automatiquement dans vos dossiers de dons aux côtés des cadeaux saisis manuellement, tout en restant dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de donation](funds.md) pour que les donateurs puissent désigner leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez vos identifiants de connexion B1 Admin prêts

</div>

## Configuration de Stripe

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas déjà un. Assurez-vous **d'activer votre compte** et de le sortir du mode test.
2. Dans Stripe, allez à **Developers > API Keys**.
3. Copiez votre **Publishable Key**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Allez à **Settings** et ouvrez la section **Giving**.
6. Cliquez sur l'icône d'édition dans la section **Giving**.
7. Définissez le **Provider** sur **Stripe**.
8. Collez votre Publishable Key dans le champ **Public Key**.
9. Retournez à Stripe et révélez votre **Secret Key** (vous ne pouvez voir cela qu'une seule fois, alors sauvegardez une copie).
10. Collez la Secret Key dans le champ **Secret Key** et cliquez sur **Save**.

:::warning
Votre Stripe Secret Key n'est affichée qu'une seule fois. Copiez-la dans un endroit sûr avant de naviguer loin du tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choisir votre devise

Après avoir sélectionné Stripe comme fournisseur, une liste déroulante **Currency** apparaît à côté de vos clés API. Choisissez la devise qui correspond à la devise de règlement de votre compte Stripe pour que les dons soient facturés correctement.

Les devises prises en charge incluent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN et BRL. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [Tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise que vous sélectionnez ici est utilisée pour les dons ponctuels, les abonnements récurrents, les calculs de frais et les rapports de dons. Si vous changez de devise plus tard, seuls les nouveaux dons et abonnements utiliseront la nouvelle devise — les dons récurrents existants continuent dans la devise dans laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise que vous choisissez. Si votre compte Stripe ne supporte pas la devise sélectionnée, les dons échoueront à la caisse.
:::

## Apple Pay et Google Pay

Les églises sur Stripe obtiennent les boutons Apple Pay et Google Pay sur la page de donation publique automatiquement. Les boutons apparaissent au-dessus des champs de carte pour les dons ponctuels une fois que le donateur a choisi un fonds et un montant, et uniquement lorsque le navigateur ou l'appareil du donateur dispose d'un portefeuille configuré. Les dons récurrents utilisent toujours les champs de carte ou bancaires.

Google Pay n'a besoin d'aucune configuration. Apple Pay nécessite que le domaine de votre page de donation soit enregistré auprès de Stripe ; B1 l'enregistre la première fois que la page de donation se charge sur votre domaine. Si le bouton Apple Pay n'apparaît pas sur un iPhone, vérifiez **Settings > Payment method domains** dans votre tableau de bord Stripe et confirmez que votre domaine `yoursubdomain.b1.church` (ou personnalisé) est répertorié et vérifié.

## Dons anonymes

Les donateurs sur la page de donation publique peuvent cocher **Give anonymously**. Un don anonyme est enregistré sans donateur attaché, va toujours au fonds que le donateur a choisi, et s'affiche comme **Anonymous** dans vos lots et rapports. L'email du donateur est toujours requis pour que le reçu puisse être envoyé, mais aucun enregistrement de personne n'est créé. Les dons anonymes sont ponctuels uniquement et n'apparaissent sur aucun relevé de dons.

## Dons récurrents échoués

Quand un don récurrent sur Stripe échoue (une carte expirée ou refusée, par exemple), la charge échouée apparaît sous **Donations > Failed Gifts** avec le donateur, le montant, la date et la raison que la passerelle a donnée. Cliquez sur **Retry** pour réessayer la charge une fois que le donateur a mis à jour sa méthode de paiement.

B1 envoie également un email au donateur quand la charge échoue, et à nouveau trois et sept jours plus tard si elle n'a toujours pas fonctionné, avec un lien pour mettre à jour sa méthode de paiement dans B1.church.

:::info
Si votre église a configuré Stripe avant que cette fonctionnalité n'existe, ouvrez **Settings** > **Giving**, cliquez sur éditer, et cliquez sur **Save** une fois. Cela actualise le webhook Stripe pour que les charges échouées soient signalées à B1.
:::

## Ajouter une page de donation à votre site B1.church

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Settings**.
3. Cliquez sur **Add Tab**.
4. Choisissez **Donation** comme type.
5. Entrez un nom pour l'onglet (par exemple, « Give ») et cliquez sur **Save**.
6. Optionnellement, changez l'icône de l'onglet -- tapez « Giv » dans la recherche d'icône pour une icône liée aux dons.

Votre page de donation est maintenant active. Les membres peuvent la visiter sur `yoursubdomain.b1.church/donate`.

## Partager votre lien de donation

Pour trouver votre URL de donation, allez à **B1 Admin** et cliquez sur l'icône **Settings** pour voir votre sous-domaine. Votre lien de donation suit le format :

`https://yoursubdomain.b1.church/donate`

Partagez ce lien sur votre site web, dans les emails ou dans votre bulletin pour que les membres sachent où faire des dons en ligne.

### Liens avec un fonds et un montant préétablis

Pour envoyer les donateurs directement à un fonds spécifique, allez à **Donations > Funds** et cliquez sur **Giving Link** sur le fonds. Entrez optionnellement un montant, puis copiez le lien. Quand un donateur l'ouvre, le fonds et le montant sont déjà sélectionnés sur la page de donation. Le lien prend la forme :

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Les mêmes paramètres fonctionnent dans l'élément **Donate Link** du générateur de site web.

## Notifications de donation

Stripe envoie une notification email à chaque fois qu'une donation est reçue. Pour modifier l'adresse email de notification, allez au tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profile**, et mettez à jour votre adresse email.

## Options de frais de traitement

Vous pouvez configurer votre page de donation pour permettre aux donateurs de couvrir optionnellement les frais de traitement pour que votre église reçoive le montant complet du don. Ce paramètre est géré dans les paramètres de votre église dans B1 Admin.

:::tip
Après la configuration, faites un petit don de test pour confirmer que tout fonctionne avant d'annoncer les dons en ligne à votre congrégation.
:::

## Configuration de Kingdom Funding

Kingdom Funding est un processeur de paiement chrétien qui supporte les cartes de crédit/débit et les virements bancaires ACH. Si votre église est inscrite auprès de Kingdom Funding, vous pouvez la connecter comme passerelle de donation.

:::info
L'intégration de Kingdom Funding est actuellement en bêta. Contactez votre représentant de compte B1 pour l'activer pour votre église.
:::

1. Inscrivez-vous ou connectez-vous sur [kingdomfunding.org](https://kingdomfunding.org).
2. Obtenez votre **Security Key** (publique) et votre **Private Key** depuis le portail marchand Kingdom Funding.
3. Dans B1 Admin, allez à **Settings**, ouvrez la section **Giving** et cliquez sur éditer.
4. Définissez le **Provider** sur **Kingdom Funding**.
5. Collez votre Security Key dans le champ **Security Key** et votre Private Key dans le champ **Private Key**.
6. Définissez la **Webhook Key** que vous avez reçue de Kingdom Funding, et copiez l'URL webhook affichée dans vos paramètres marchands Kingdom Funding pour que Kingdom Funding puisse notifier B1 des transactions complétées.
7. Enregistrez.

Une fois connectée, les membres verront une bascule carte/banque sur la page de donation et pourront donner par carte de crédit ou virement ACH.

## Boutons PayPal et Venmo

Les églises utilisant **PayPal** comme fournisseur obtiennent des boutons **PayPal** et **Venmo** au-dessus des champs de carte sur la page de donation pour les dons ponctuels. Les donateurs qui cliquent sur l'un d'eux complètent le paiement dans une fenêtre PayPal, et le don est enregistré comme n'importe quel autre don en ligne. Venmo n'apparaît que pour les donateurs aux États-Unis sur les appareils que PayPal considère comme éligibles. Les dons récurrents utilisent toujours les champs de carte.

## Configuration de Paystack (Afrique)

Stripe n'ouvre pas de comptes pour les églises au Ghana, Nigeria, Kenya, Afrique du Sud ou Côte d'Ivoire. [Paystack](https://paystack.com) le fait, et il accepte les cartes locales, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), virement bancaire et USSD — les donateurs paient dans votre devise locale (GHS, NGN, KES, ZAR, XOF).

1. Inscrivez-vous sur [paystack.com](https://paystack.com) avec le certificat d'enregistrement commercial de votre église et le compte bancaire local, et complétez l'examen d'activation (go-live) de Paystack.
2. Dans le tableau de bord Paystack, ouvrez **Settings → API Keys & Webhooks** et copiez la **Public Key** et la **Secret Key** (utilisez les clés en direct, pas les clés de test).
3. Dans B1 Admin, allez à **Settings**, ouvrez la section **Giving** et cliquez sur éditer.
4. Définissez le **Provider** sur **Paystack**, collez la Public Key et la Secret Key, et choisissez votre **Currency**.
5. Copiez l'**URL webhook** affichée sous le fournisseur, retournez au tableau de bord Paystack (**Settings → API Keys & Webhooks**) et collez-la dans le champ **Webhook URL**. C'est ainsi que les dons récurrents et les paiements par mobile money sont enregistrés.
6. Enregistrez.

Les donateurs complètent leur paiement dans une fenêtre sécurisée Paystack et peuvent y choisir carte, mobile money ou virement bancaire. Notes :

- Les **dons récurrents** nécessitent une carte ; le mobile money ne peut pas être facturé automatiquement, donc Paystack n'autorise que les dons ponctuels par mobile money.
- Les dons récurrents Paystack peuvent être annulés depuis B1 mais pas mis en pause ou modifiés — annulez et créez-en un nouveau pour modifier le montant.
- Les **frais de traitement** par défaut reflètent les taux de Paystack pour les cartes locales de votre devise ; modifiez-les si vos taux négociés diffèrent.

## Prochaines étapes

- Utilisez [Stripe Import](stripe-import.md) pour extraire les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Vérifiez vos [Donation Reports](donation-reports.md) pour vérifier que les dons en ligne apparaissent correctement
- Générez [Giving Statements](giving-statements.md) qui incluent à la fois les dons en ligne et hors ligne
