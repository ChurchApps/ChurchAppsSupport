---
title: "Configuration de la donation en ligne"
---

# Configuration de la donation en ligne

<div class="article-intro">

B1 Admin s'intègre à **Stripe**, **PayPal**, **Kingdom Funding** et **Paystack** (pour les églises en Afrique) afin que vos membres puissent faire des donations en ligne via votre site B1.church. Une fois configuré, les donations en ligne apparaissent automatiquement dans vos dossiers de donation aux côtés des cadeaux entrés manuellement, ce qui maintient tout dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de donation](funds.md) afin que les donateurs puissent désigner leurs cadeaux
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez vos identifiants de connexion B1 Admin prêts

</div>

## Configuration de Stripe

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas déjà un. Assurez-vous de **activer votre compte** et de le sortir du mode test.
2. Dans Stripe, allez à **Développeurs > Clés API**.
3. Copiez votre **Clé publiable**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Cliquez sur **Église** dans la navigation en haut, puis cliquez sur **Modifier les paramètres de l'église**.
6. Cliquez sur l'icône d'édition en regard de **Paramètres de l'église**.
7. Faites défiler jusqu'à la section **Donation**.
8. Définissez le **Fournisseur** sur **Stripe**.
9. Collez votre clé publiable dans le champ **Clé publique**.
10. Retournez à Stripe et affichez votre **Clé secrète** (vous ne pouvez la voir qu'une seule fois, alors enregistrez une sauvegarde).
11. Collez la clé secrète dans le champ **Clé secrète** et cliquez sur **Enregistrer**.

:::warning
Votre clé secrète Stripe n'est affichée qu'une seule fois. Copiez-la à un emplacement sécurisé avant de naviguer ailleurs sur le tableau de bord de Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choix de votre devise

Après avoir sélectionné Stripe comme fournisseur, une liste déroulante **Devise** apparaît à côté de vos clés API. Choisissez la devise qui correspond à la devise de règlement de votre compte Stripe afin que les donations soient facturées correctement.

Les devises prises en charge incluent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN et BRL. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [Tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise que vous sélectionnez ici est utilisée pour les donations ponctuelles, les abonnements récurrents, les calculs de frais et les rapports de donation. Si vous changez les devises plus tard, seules les nouvelles donations et les abonnements utiliseront la nouvelle devise -- les cadeaux récurrents existants continuent dans la devise dans laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise que vous choisissez. Si votre compte Stripe ne supporte pas la devise sélectionnée, les donations échoueront à la caisse.
:::

## Ajout d'une page de donation à votre site B1.church

1. Allez à [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Paramètres**.
3. Cliquez sur **Ajouter un onglet**.
4. Choisissez **Donation** comme type.
5. Entrez un nom pour l'onglet (par exemple, « Donner ») et cliquez sur **Enregistrer**.
6. Éventuellement, modifiez l'icône de l'onglet -- tapez « Don » dans la recherche d'icônes pour une icône liée à la donation.

Votre page de donation est maintenant active. Les membres peuvent la visiter à otresubdomaine.b1.church/donate.

## Partage de votre lien de donation

Pour trouver votre URL de donation, allez à **B1 Admin** et cliquez sur l'icône **Paramètres** pour voir votre sous-domaine. Votre lien de donation suit le format :

\https://votresubdomaine.b1.church/donate\

Partagez ce lien sur votre site web, dans les e-mails ou dans votre bulletin afin que les membres sachent où faire une donation en ligne.

## Notifications de donation

Stripe envoie une notification par e-mail chaque fois qu'une donation est reçue. Pour modifier l'adresse e-mail de notification, allez au tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profil** et mettez à jour votre adresse e-mail.

## Options de frais de traitement

Vous pouvez configurer votre page de donation pour permettre aux donateurs de couvrir éventuellement les frais de traitement afin que votre église reçoive le montant complet du don. Ce paramètre est géré dans vos paramètres d'église dans B1 Admin.

:::tip
Après la configuration, effectuez un petit don de test pour confirmer que tout fonctionne avant d'annoncer la donation en ligne à votre congrégation.
:::

## Configuration de Kingdom Funding

Kingdom Funding est un processeur de paiement chrétien qui prend en charge les cartes de crédit/débit et les transferts bancaires ACH. Si votre église est inscrite auprès de Kingdom Funding, vous pouvez le connecter comme votre passerelle de donation.

:::info
L'intégration de Kingdom Funding est actuellement en version bêta. Contactez votre représentant de compte B1 pour l'activer pour votre église.
:::

1. Inscrivez-vous ou connectez-vous sur [kingdomfunding.org](https://kingdomfunding.org).
2. Obtenez votre **Clé de sécurité** (publique) et votre **Clé privée** à partir du portail marchand de Kingdom Funding.
3. Dans B1 Admin, allez à **Paramètres** et ouvrez **Paramètres de l'église**.
4. Dans la section **Donation**, définissez le **Fournisseur** sur **Kingdom Funding**.
5. Collez votre clé de sécurité dans le champ **Clé de sécurité** et votre clé privée dans le champ **Clé privée**.
6. Définissez la **Clé Webhook** que vous avez reçue de Kingdom Funding, et copiez l'URL webhook affichée dans vos paramètres marchand de Kingdom Funding afin que Kingdom Funding puisse notifier B1 des transactions complétées.
7. Enregistrez.

Une fois connecté, les membres verront un bouton de basculement carte/banque sur la page de donation et peuvent faire un don par carte de crédit ou transfert ACH.

## Configuration de Paystack (Afrique)

Stripe n'ouvre pas de comptes pour les églises au Ghana, Nigéria, Kenya, Afrique du Sud ou Côte d'Ivoire. [Paystack](https://paystack.com) l'est, et il accepte les cartes locales, **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), transfert bancaire et USSD -- les donateurs paient dans votre devise locale (GHS, NGN, KES, ZAR, XOF).

1. Enregistrez-vous sur [paystack.com](https://paystack.com) avec le certificat d'enregistrement commercial de votre église et votre compte bancaire local, et complétez l'activation de Paystack (examen go-live).
2. Dans le tableau de bord Paystack, ouvrez **Paramètres → Clés API et Webhooks** et copiez la **Clé publique** et la **Clé secrète** (utilisez les clés en direct, pas les clés de test).
3. Dans B1 Admin, allez à **Paramètres**, ouvrez la section **Donation** et cliquez sur modifier.
4. Définissez le **Fournisseur** sur **Paystack**, collez la clé publique et la clé secrète, et choisissez votre **Devise**.
5. Copiez l'**URL webhook** affichée sous le fournisseur, retournez au tableau de bord Paystack (**Paramètres → Clés API et Webhooks**) et collez-la dans le champ **URL webhook**. C'est ainsi que les cadeaux récurrents et les paiements mobile money sont enregistrés.
6. Enregistrez.

Les donateurs complètent leur paiement dans une fenêtre Paystack sécurisée et peuvent choisir la carte, mobile money ou transfert bancaire là. Notes :

- **Les cadeaux récurrents** ont besoin d'une carte ; le mobile money ne peut pas être rechargé automatiquement, donc Paystack ne permet que les cadeaux mobile money ponctuels.
- Les cadeaux Paystack récurrents peuvent être annulés à partir de B1 mais pas mis en pause ou modifiés -- annulez et créez-en un nouveau pour modifier le montant.
- Les **Frais de traitement** reflètent par défaut les tarifs de carte locale de Paystack pour votre devise ; modifiez-les si vos tarifs négociés diffèrent.

## Étapes suivantes

- Utilisez [Import Stripe](stripe-import.md) pour extraire les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Consultez vos [Rapports de donation](donation-reports.md) pour vérifier que les donations en ligne apparaissent correctement
- Générez des [Relevés de donation](giving-statements.md) qui incluent les donations en ligne et hors ligne
