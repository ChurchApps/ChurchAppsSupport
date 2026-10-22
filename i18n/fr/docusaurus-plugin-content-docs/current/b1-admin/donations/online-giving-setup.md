---
title: "Configuration des dons en ligne"
---

# Configuration des dons en ligne {#online-giving-setup}

<div class="article-intro">

B1 Admin s'intègre à **Stripe**, **PayPal**, **Kingdom Funding** et **Paystack** (pour les églises en Afrique) afin que vos membres puissent donner en ligne depuis votre site B1.church. Une fois configurés, les dons en ligne apparaissent automatiquement dans vos registres de dons, à côté des dons saisis manuellement, ce qui garde tout dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de dons](funds.md) afin que les donateurs puissent affecter leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez à portée de main vos identifiants de connexion à B1 Admin

</div>

## Configurer Stripe {#setting-up-stripe}

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas encore. Assurez-vous d'**activer votre compte** et de le sortir du mode test.
2. Dans Stripe, allez dans **Développeurs > Clés API**.
3. Copiez votre **clé publiable**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Allez dans **Paramètres** et ouvrez la section **Dons**.
6. Cliquez sur **Modifier** dans la section **Dons**.
7. Réglez le **Fournisseur** sur **Stripe**.
8. Collez votre clé publiable dans le champ **Clé publique**.
9. Retournez dans Stripe et affichez votre **clé secrète** (vous ne pouvez la voir qu'une seule fois, enregistrez donc une copie de sauvegarde).
10. Collez la clé secrète dans le champ **Clé secrète** et cliquez sur **Enregistrer**.

:::warning
Votre clé secrète Stripe n'est affichée qu'une seule fois. Copiez-la dans un endroit sûr avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choisir votre devise {#choosing-your-currency}

Après avoir sélectionné Stripe comme fournisseur, une liste déroulante **Devise** apparaît à côté de vos clés API. Choisissez la devise correspondant à la devise de règlement de votre compte Stripe afin que les dons soient débités correctement.

Les devises prises en charge comprennent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN et BRL. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise sélectionnée ici est utilisée pour les dons ponctuels, les abonnements récurrents, le calcul des frais et les rapports de dons. Si vous changez de devise plus tard, seuls les nouveaux dons et abonnements utiliseront la nouvelle devise -- les dons récurrents existants continuent dans la devise avec laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise choisie. Si votre compte Stripe ne prend pas en charge la devise sélectionnée, les dons échoueront au moment du paiement.
:::

## Apple Pay et Google Pay {#apple-pay-and-google-pay}

Les églises qui utilisent Stripe obtiennent automatiquement les boutons Apple Pay et Google Pay sur la page de dons publique. Les boutons apparaissent au-dessus des champs de carte pour les dons ponctuels, une fois que le donateur a choisi un fonds et un montant, et seulement lorsque le navigateur ou l'appareil du donateur a un portefeuille configuré. Les dons récurrents utilisent toujours les champs de carte ou de compte bancaire.

Google Pay ne nécessite aucune configuration. Apple Pay exige que le domaine de votre page de dons soit enregistré auprès de Stripe ; B1 l'enregistre la première fois que la page de dons se charge sur votre domaine. Si le bouton Apple Pay n'apparaît pas sur un iPhone, consultez **Paramètres > Domaines de méthodes de paiement** dans votre tableau de bord Stripe et vérifiez que votre domaine `votresousdomaine.b1.church` (ou personnalisé) figure dans la liste et est vérifié.

## Dons anonymes {#anonymous-gifts}

Les donateurs sur la page de dons publique peuvent cocher **Donner anonymement**. Un don anonyme est enregistré sans donateur associé, il est toujours versé au fonds choisi par le donateur, et apparaît comme **Anonyme** dans vos lots et rapports. L'adresse courriel du donateur reste requise pour que le reçu puisse être envoyé, mais aucune fiche de personne n'est créée. Les dons anonymes sont uniquement ponctuels et n'apparaissent sur aucun relevé de dons.

## Dons récurrents en échec {#failed-recurring-gifts}

Lorsqu'un don récurrent sur Stripe échoue (une carte expirée ou refusée, par exemple), le paiement échoué apparaît sous **Dons > Dons en échec** avec le donateur, le montant, la date et la raison donnée par la passerelle. Cliquez sur **Réessayer** pour relancer le paiement une fois que le donateur a mis à jour son mode de paiement.

B1 envoie aussi un courriel au donateur lorsque le paiement échoue, puis de nouveau trois et sept jours plus tard si le paiement n'est toujours pas passé, avec un lien pour mettre à jour son mode de paiement dans B1.church.

:::info
Si votre église a configuré Stripe avant l'existence de cette fonctionnalité, ouvrez **Paramètres** > **Dons**, cliquez sur modifier, puis cliquez une fois sur **Enregistrer**. Cela actualise le webhook Stripe afin que les paiements échoués soient signalés à B1.
:::

## Ajouter une page de dons à votre site B1.church {#adding-a-donation-page-to-your-b1church-site}

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Paramètres**.
3. Cliquez sur **Ajouter un onglet**.
4. Choisissez **Don** comme type.
5. Saisissez un nom pour l'onglet (par exemple « Donner ») et cliquez sur **Enregistrer**.
6. Facultativement, modifiez l'icône de l'onglet -- saisissez « Don » dans la recherche d'icônes pour trouver une icône liée aux dons.

Votre page de dons est maintenant en ligne. Les membres peuvent la consulter à l'adresse `votresousdomaine.b1.church/donate`.

## Partager votre lien de don {#sharing-your-giving-link}

Pour trouver l'adresse de votre page de dons, allez dans **B1 Admin** et cliquez sur l'icône **Paramètres** pour voir votre sous-domaine. Votre lien de don suit ce format :

`https://votresousdomaine.b1.church/donate`

Partagez ce lien sur votre site web, dans vos courriels ou dans votre bulletin pour que les membres sachent où donner en ligne.

### Liens avec un fonds et un montant prédéfinis {#links-with-a-preset-fund-and-amount}

Pour diriger directement les donateurs vers un fonds précis, allez dans **Dons > Fonds** et cliquez sur **Lien de don** pour le fonds. Vous pouvez facultativement saisir un montant, puis copier le lien. Lorsqu'un donateur l'ouvre, le fonds et le montant sont déjà sélectionnés sur la page de dons. Le lien prend la forme suivante :

`https://votresousdomaine.b1.church/donate?fundId=FUND_ID&amount=25`

Les mêmes paramètres fonctionnent dans l'élément **Lien de don** du générateur de site web.

## Notifications de dons {#donation-notifications}

Stripe envoie un avis par courriel à chaque don reçu. Pour modifier l'adresse courriel de notification, allez dans le tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profil**, puis mettez à jour votre adresse courriel.

## Options de frais de traitement {#processing-fee-options}

Vous pouvez configurer votre page de dons pour permettre aux donateurs de couvrir facultativement les frais de traitement afin que votre église reçoive le montant complet du don. Ce paramètre se gère dans les paramètres de votre église, dans B1 Admin.

:::tip
Après la configuration, effectuez un petit don test pour vous assurer que tout fonctionne avant d'annoncer les dons en ligne à votre communauté.
:::

## Configurer Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding est un processeur de paiement chrétien qui prend en charge les cartes de crédit et de débit ainsi que les virements bancaires ACH. Si votre église est inscrite auprès de Kingdom Funding, vous pouvez la connecter comme passerelle de dons.

:::info
L'intégration Kingdom Funding est actuellement en bêta. Communiquez avec votre représentant de compte B1 pour l'activer pour votre église.
:::

1. Inscrivez-vous ou connectez-vous sur [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenez votre **clé de sécurité** (publique) et votre **clé privée** depuis le portail marchand de Kingdom Funding.
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Réglez le **Fournisseur** sur **Kingdom Funding**.
5. Collez votre clé de sécurité dans le champ **Clé de sécurité** et votre clé privée dans le champ **Clé privée**.
6. Saisissez la **clé de webhook** reçue de Kingdom Funding, et copiez l'URL de webhook affichée dans vos paramètres marchands Kingdom Funding afin que Kingdom Funding puisse notifier B1 des transactions effectuées.
7. Enregistrez.

Une fois connecté, les membres verront un bouton carte/compte bancaire sur la page de dons et pourront donner par carte de crédit ou virement ACH.

## Boutons PayPal et Venmo {#paypal-and-venmo-buttons}

Les églises qui utilisent **PayPal** comme fournisseur obtiennent les boutons **PayPal** et **Venmo** au-dessus des champs de carte sur la page de dons pour les dons ponctuels. Les donateurs qui cliquent sur l'un d'eux finalisent le paiement dans une fenêtre PayPal, et le don est enregistré comme tout autre don en ligne. Le bouton Venmo n'apparaît que pour les donateurs situés aux États-Unis, sur des appareils que PayPal considère admissibles. Les dons récurrents utilisent toujours les champs de carte.

## Configurer Paystack (Afrique) {#setting-up-paystack-africa}

Stripe n'ouvre pas de comptes pour les églises au Ghana, au Nigeria, au Kenya, en Afrique du Sud ou en Côte d'Ivoire. [Paystack](https://paystack.com) le fait, et accepte les cartes locales, l'**argent mobile** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), les virements bancaires et l'USSD -- les donateurs paient dans votre devise locale (GHS, NGN, KES, ZAR, XOF).

1. Inscrivez-vous sur [paystack.com](https://paystack.com) avec le certificat d'enregistrement de votre entreprise et le compte bancaire local de votre église, puis complétez l'examen d'activation (mise en production) de Paystack.
2. Dans le tableau de bord Paystack, ouvrez **Paramètres → Clés API et webhooks** et copiez la **clé publique** et la **clé secrète** (utilisez les clés de production, et non les clés de test).
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Réglez le **Fournisseur** sur **Paystack**, collez la clé publique et la clé secrète, puis choisissez votre **devise**.
5. Copiez l'**URL du webhook** affichée sous le fournisseur, retournez dans le tableau de bord Paystack (**Paramètres → Clés API et webhooks**) et collez-la dans le champ **URL du webhook**. C'est ainsi que les dons récurrents et les paiements par argent mobile sont enregistrés.
6. Enregistrez.

Les donateurs finalisent leur paiement dans une fenêtre Paystack sécurisée et peuvent y choisir la carte, l'argent mobile ou le virement bancaire. Remarques :

- **Les dons récurrents** exigent une carte ; l'argent mobile ne peut pas être débité à nouveau automatiquement, donc Paystack n'autorise que les dons ponctuels par argent mobile.
- Les dons récurrents Paystack peuvent être annulés depuis B1, mais ni suspendus ni modifiés -- annulez-en un et créez-en un nouveau pour changer le montant.
- Les **frais de traitement** par défaut reflètent les tarifs Paystack pour les cartes locales dans votre devise ; modifiez-les si vos tarifs négociés sont différents.

## Étapes suivantes {#next-steps}

- Utilisez l'[importation Stripe](stripe-import.md) pour importer les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Consultez vos [rapports de dons](donation-reports.md) pour vérifier que les dons en ligne apparaissent correctement
- Générez des [relevés de dons](giving-statements.md) qui incluent à la fois les dons en ligne et hors ligne
