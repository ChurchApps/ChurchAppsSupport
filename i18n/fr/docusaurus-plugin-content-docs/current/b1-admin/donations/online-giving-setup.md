---
title: "Configuration des dons en ligne"
---

# Configuration des dons en ligne

<div class="article-intro">

B1 Admin s'intègre à **Stripe** et **PayPal** pour permettre à vos membres de faire des dons en ligne via votre site B1.church. Une fois configuré, les dons en ligne apparaissent automatiquement dans vos registres de dons aux côtés des dons entrés manuellement, en gardant tout dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de dons](funds.md) pour que les donateurs puissent désigner leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Préparez vos identifiants de connexion à B1 Admin

</div>

## Configuration de Stripe

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas déjà un. Assurez-vous **d'activer votre compte** et de le sortir du mode test.
2. Dans Stripe, allez à **Developers > API Keys**.
3. Copiez votre **Clé publique (Publishable Key)**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Cliquez sur **Church** dans la navigation supérieure, puis cliquez sur **Edit Church Settings**.
6. Cliquez sur l'icône de modification à côté de **Church Settings**.
7. Faites défiler jusqu'à la section **Giving**.
8. Définissez le **Provider** sur **Stripe**.
9. Collez votre Clé publique dans le champ **Public Key**.
10. Retournez à Stripe et révélez votre **Secret Key** (vous ne pouvez le voir qu'une seule fois, alors enregistrez une sauvegarde).
11. Collez la Secret Key dans le champ **Secret Key** et cliquez sur **Save**.

:::warning
Votre Stripe Secret Key n'est affichée qu'une seule fois. Copiez-la dans un endroit sûr avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choix de votre devise

Après avoir sélectionné Stripe comme fournisseur, une liste déroulante **Currency** apparaît à côté de vos clés API. Choisissez la devise qui correspond à la devise de règlement de votre compte Stripe pour que les dons soient facturés correctement.

Les devises prises en charge incluent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN et BRL. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [Tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise que vous sélectionnez ici est utilisée pour les dons ponctuels, les abonnements récurrents, les calculs de frais et les rapports de dons. Si vous changez de devise ultérieurement, seuls les nouveaux dons et abonnements utiliseront la nouvelle devise — les dons récurrents existants restent dans la devise avec laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise que vous choisissez. Si votre compte Stripe ne supporte pas la devise sélectionnée, les dons échoueront au moment du paiement.
:::

## Ajout d'une page de dons à votre site B1.church

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Settings**.
3. Cliquez sur **Add Tab**.
4. Choisissez **Donation** comme type.
5. Entrez un nom pour l'onglet (par exemple, "Give") et cliquez sur **Save**.
6. Optionnellement, changez l'icône de l'onglet -- tapez "Giv" dans la recherche d'icône pour une icône liée au don.

Votre page de don est maintenant en ligne. Les membres peuvent la visiter à `yoursubdomain.b1.church/donate`.

## Partage de votre lien de dons

Pour trouver votre URL de dons, allez à **B1 Admin** et cliquez sur l'icône **Settings** pour voir votre sous-domaine. Votre lien de don suit le format :

`https://yoursubdomain.b1.church/donate`

Partagez ce lien sur votre site Web, dans les e-mails ou dans votre bulletin pour que les membres sachent où faire des dons en ligne.

## Notifications de dons

Stripe envoie une notification par e-mail chaque fois qu'un don est reçu. Pour modifier l'adresse e-mail de notification, allez au tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profile**, et mettez à jour votre adresse e-mail.

## Options de frais de traitement

Vous pouvez configurer votre page de dons pour permettre aux donateurs de couvrir optionnellement les frais de traitement afin que votre église reçoive le montant complet du don. Ce paramètre est géré dans les paramètres de votre église au sein de B1 Admin.

:::tip
Après la configuration, effectuez un petit don de test pour confirmer que tout fonctionne avant d'annoncer les dons en ligne à votre congrégation.
:::

## Étapes suivantes

- Utilisez [Stripe Import](stripe-import.md) pour extraire les transactions en ligne dans B1 Admin s'ils ne se synchronisent pas automatiquement
- Vérifiez vos [Rapports de dons](donation-reports.md) pour vérifier que les dons en ligne apparaissent correctement
- Générez des [Relevés de dons](giving-statements.md) qui incluent les dons en ligne et hors ligne
