---
title: "Configuration des dons en ligne"
---

# Configuration des dons en ligne

<div class="article-intro">

B1 Admin s'intègre à **Stripe**, **PayPal** et **Kingdom Funding** pour permettre à vos membres de faire des dons en ligne via votre site B1.church. Une fois configuré, les dons en ligne apparaissent automatiquement dans vos registres de dons aux côtés des dons saisis manuellement, tout dans un même système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de donation](funds.md) pour que les donateurs puissent désigner leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez vos identifiants de connexion B1 Admin à portée de main

</div>

## Configuration de Stripe

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas déjà un. Assurez-vous **d'activer votre compte** et de le sortir du mode test.
2. Dans Stripe, accédez à **Developers > API Keys**.
3. Copiez votre **Clé publique**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Cliquez sur **Church** dans la navigation supérieure, puis cliquez sur **Modifier les paramètres de l'église**.
6. Cliquez sur l'icône de modification à côté de **Paramètres de l'église**.
7. Faites défiler jusqu'à la section **Giving**.
8. Définissez le **Provider** sur **Stripe**.
9. Collez votre clé publique dans le champ **Public Key**.
10. Retournez à Stripe et révélez votre **Secret Key** (vous ne pouvez voir cela qu'une seule fois, alors sauvegardez une copie).
11. Collez la clé secrète dans le champ **Secret Key** et cliquez sur **Save**.

:::warning
Votre clé secrète Stripe n'est affichée qu'une seule fois. Copiez-la dans un endroit sécurisé avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choix de votre devise

Après avoir sélectionné Stripe comme fournisseur, un menu déroulant **Currency** apparaît à côté de vos clés API. Choisissez la devise qui correspond à la devise de règlement de votre compte Stripe pour que les dons soient facturés correctement.

Les devises prises en charge incluent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN et BRL. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [Tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise que vous sélectionnez ici est utilisée pour les dons uniques, les abonnements récurrents, les calculs de frais et les rapports de dons. Si vous changez de devise ultérieurement, seuls les nouveaux dons et abonnements utiliseront la nouvelle devise - les dons récurrents existants conservent la devise dans laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise que vous choisissez. Si votre compte Stripe ne prend pas en charge la devise sélectionnée, les dons échoueront au moment du paiement.
:::

## Ajouter une page de dons à votre site B1.church

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Settings**.
3. Cliquez sur **Add Tab**.
4. Choisissez **Donation** comme type.
5. Entrez un nom pour l'onglet (par exemple, « Give ») et cliquez sur **Save**.
6. Vous pouvez éventuellement modifier l'icône de l'onglet - tapez « Giv » dans la recherche d'icônes pour trouver une icône liée aux dons.

Votre page de donation est maintenant en direct. Les membres peuvent la visiter à `yoursubdomain.b1.church/donate`.

## Partage de votre lien de dons

Pour trouver votre URL de dons, allez à **B1 Admin** et cliquez sur l'icône **Settings** pour voir votre sous-domaine. Votre lien de dons suit le format:

`https://yoursubdomain.b1.church/donate`

Partagez ce lien sur votre site Web, dans les e-mails ou dans votre bulletin d'église pour que les membres sachent où faire des dons en ligne.

## Notifications de dons

Stripe envoie une notification par e-mail chaque fois qu'un don est reçu. Pour modifier l'adresse e-mail de notification, accédez au tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profile** et mettez à jour votre adresse e-mail.

## Options de frais de traitement

Vous pouvez configurer votre page de dons pour permettre aux donateurs de couvrir optionnellement les frais de traitement afin que votre église reçoive le montant complet du don. Ce paramètre est géré dans les paramètres de votre église dans B1 Admin.

:::tip
Après la configuration, effectuez un petit don de test pour confirmer que tout fonctionne avant d'annoncer les dons en ligne à votre congrégation.
:::

## Configuration de Kingdom Funding

Kingdom Funding est un processeur de paiement chrétien qui prend en charge les cartes de crédit/débit et les virements bancaires ACH. Si votre église est inscrite auprès de Kingdom Funding, vous pouvez la connecter en tant que passerelle de dons.

:::info
L'intégration de Kingdom Funding est actuellement en phase bêta. Contactez votre représentant de compte B1 pour l'activer pour votre église.
:::

1. Inscrivez-vous ou connectez-vous sur [kingdomfunding.org](https://kingdomfunding.org).
2. Obtenez votre **Security Key** (publique) et **Private Key** à partir du portail marchand de Kingdom Funding.
3. Dans B1 Admin, allez à **Settings** et ouvrez **Church Settings**.
4. Dans la section **Giving**, définissez le **Provider** sur **Kingdom Funding**.
5. Collez votre Security Key dans le champ **Security Key** et votre Private Key dans le champ **Private Key**.
6. Définissez la **Webhook Key** que vous avez reçue de Kingdom Funding, et copiez l'URL du webhook affichée dans vos paramètres marchands de Kingdom Funding afin que Kingdom Funding puisse notifier B1 des transactions effectuées.
7. Enregistrez.

Une fois connectés, les membres verront un bouton de basculement carte/banque sur la page de donation et pourront faire des dons par carte de crédit ou virement ACH.

## Étapes suivantes

- Utilisez [Stripe Import](stripe-import.md) pour importer les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Vérifiez vos [Donation Reports](donation-reports.md) pour vous assurer que les dons en ligne apparaissent correctement
- Générez des [Giving Statements](giving-statements.md) qui incluent à la fois les dons en ligne et hors ligne
