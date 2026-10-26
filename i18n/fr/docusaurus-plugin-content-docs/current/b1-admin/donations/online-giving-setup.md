---
title: "Configuration des dons en ligne"
---

# Configuration des dons en ligne

<div class="article-intro">

B1 Admin s'intègre à **Stripe**, **PayPal**, **Kingdom Funding** et **Paystack** (pour les églises d'Afrique) afin que vos membres puissent donner en ligne sur votre site B1.church. Une fois configurés, les dons en ligne apparaissent automatiquement dans vos registres de dons, aux côtés des dons saisis manuellement, ce qui garde tout dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de dons](funds.md) pour que les donateurs puissent affecter leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez à portée de main vos identifiants de connexion à B1 Admin

</div>

## Configurer Stripe

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas déjà un. Pensez à **activer votre compte** et à le sortir du mode test.
2. Dans Stripe, accédez à **Développeurs > Clés API**.
3. Copiez votre **Clé publiable**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Allez dans **Paramètres** et ouvrez la section **Dons**.
6. Cliquez sur **Modifier** dans la section **Dons**.
7. Réglez le **Fournisseur** sur **Stripe**.
8. Collez votre Clé publiable dans le champ **Clé publique**.
9. Revenez à Stripe et affichez votre **Clé secrète** (vous ne pouvez la voir qu'une seule fois, faites donc une sauvegarde).
10. Collez la Clé secrète dans le champ **Clé secrète** et cliquez sur **Enregistrer**.

:::warning
Votre Clé secrète Stripe n'est affichée qu'une seule fois. Copiez-la dans un endroit sûr avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choisir votre devise

Après avoir sélectionné Stripe comme fournisseur, une liste déroulante **Devise** apparaît à côté de vos clés API. Choisissez la devise qui correspond à la devise de règlement de votre compte Stripe afin que les dons soient débités correctement.

Les devises prises en charge comprennent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN et BRL. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise sélectionnée ici est utilisée pour les dons ponctuels, les abonnements récurrents, le calcul des frais et les rapports de dons. Si vous changez de devise plus tard, seuls les nouveaux dons et abonnements utiliseront la nouvelle devise -- les dons récurrents existants continuent dans la devise avec laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise choisie. Si votre compte Stripe ne prend pas en charge la devise sélectionnée, les dons échoueront au moment du paiement.
:::

## Apple Pay et Google Pay

Les églises qui utilisent Stripe bénéficient automatiquement des boutons Apple Pay et Google Pay sur la page de dons publique. Les boutons apparaissent au-dessus des champs de carte pour les dons ponctuels, une fois que le donateur a choisi un fonds et un montant, et uniquement lorsque le navigateur ou l'appareil du donateur dispose d'un portefeuille configuré. Les dons récurrents utilisent toujours les champs de carte ou de compte bancaire.

Google Pay ne nécessite aucune configuration. Apple Pay exige que le domaine de votre page de dons soit enregistré auprès de Stripe ; B1 l'enregistre la première fois que la page de dons se charge sur votre domaine. Si le bouton Apple Pay n'apparaît pas sur un iPhone, consultez **Paramètres > Domaines de méthode de paiement** dans votre tableau de bord Stripe et vérifiez que votre domaine `yoursubdomain.b1.church` (ou personnalisé) figure dans la liste et est validé.

## Dons anonymes

Les donateurs de la page de dons publique peuvent cocher **Donner anonymement**. Un don anonyme est enregistré sans donateur associé, est tout de même affecté au fonds choisi par le donateur, et apparaît comme **Anonyme** dans vos lots et vos rapports. L'adresse courriel du donateur reste obligatoire afin que le reçu puisse être envoyé, mais aucune fiche personne n'est créée. Les dons anonymes sont uniquement ponctuels et n'apparaissent sur aucun relevé de dons.

## Dons récurrents échoués

Lorsqu'un don récurrent sur Stripe échoue (par exemple avec une carte expirée ou refusée), le prélèvement échoué apparaît sous **Dons > Dons échoués** avec le donateur, le montant, la date et la raison donnée par la passerelle. Cliquez sur **Réessayer** pour relancer le prélèvement une fois que le donateur a mis à jour son moyen de paiement.

B1 envoie aussi un courriel au donateur lorsque le prélèvement échoue, puis de nouveau trois et sept jours plus tard si le paiement n'a toujours pas abouti, avec un lien lui permettant de mettre à jour son moyen de paiement dans B1.church.

:::info
Si votre église a configuré Stripe avant l'existence de cette fonctionnalité, ouvrez **Paramètres** > **Dons**, cliquez sur modifier, puis cliquez une fois sur **Enregistrer**. Cela actualise le webhook Stripe afin que les prélèvements échoués soient signalés à B1.
:::

## Ajouter une page de dons à votre site B1.church

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Paramètres**.
3. Cliquez sur **Ajouter un onglet**.
4. Choisissez **Don** comme type.
5. Saisissez un nom pour l'onglet (par exemple « Donner ») et cliquez sur **Enregistrer**.
6. Vous pouvez éventuellement changer l'icône de l'onglet -- tapez « Don » dans la recherche d'icônes pour trouver une icône liée aux dons.

Votre page de dons est maintenant en ligne. Les membres peuvent la consulter à l'adresse `yoursubdomain.b1.church/donate`.

## Partager votre lien de don

Pour trouver l'URL de vos dons, allez dans **B1 Admin** et cliquez sur l'icône **Paramètres** pour voir votre sous-domaine. Le lien vers votre page de dons suit ce format :

`https://yoursubdomain.b1.church/donate`

Partagez ce lien sur votre site web, dans vos courriels ou dans votre bulletin afin que les membres sachent où donner en ligne.

### Liens avec un fonds et un montant préremplis

Pour diriger directement les donateurs vers un fonds précis, allez dans **Dons > Fonds** et cliquez sur **Lien de don** à côté du fonds. Saisissez éventuellement un montant, puis copiez le lien. Lorsqu'un donateur l'ouvre, le fonds et le montant sont déjà sélectionnés sur la page de dons. Le lien prend la forme suivante :

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Les mêmes paramètres fonctionnent dans l'élément **Lien de don** du constructeur de site web.

## Notifications de dons

Stripe envoie un courriel de notification à chaque don reçu. Pour modifier l'adresse courriel de notification, allez dans le tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profil** et mettez à jour votre adresse courriel.

## Options de frais de traitement

Vous pouvez configurer votre page de dons pour permettre aux donateurs de couvrir facultativement les frais de traitement afin que votre église reçoive le montant intégral du don. Ce paramètre se gère dans les paramètres de votre église, dans B1 Admin.

:::tip
Après la configuration, effectuez un petit don test pour vérifier que tout fonctionne avant d'annoncer les dons en ligne à votre communauté.
:::

## Configurer Kingdom Funding

Kingdom Funding est un processeur de paiement chrétien qui prend en charge les cartes de crédit et de débit ainsi que les virements bancaires ACH. Si votre église est inscrite auprès de Kingdom Funding, vous pouvez la connecter comme passerelle de dons.

:::info
L'intégration de Kingdom Funding est actuellement en bêta. Contactez votre représentant de compte B1 pour l'activer pour votre église.
:::

1. Inscrivez-vous ou connectez-vous sur [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenez votre **Clé de sécurité** (publique) et votre **Clé privée** depuis le portail marchand de Kingdom Funding.
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Réglez le **Fournisseur** sur **Kingdom Funding**.
5. Collez votre Clé de sécurité dans le champ **Clé de sécurité** et votre Clé privée dans le champ **Clé privée**.
6. Saisissez la **Clé du webhook** reçue de Kingdom Funding, et copiez l'URL du webhook affichée dans vos paramètres marchands Kingdom Funding afin que Kingdom Funding puisse notifier B1 des transactions effectuées.
7. Enregistrez.

Une fois connectés, les membres verront un bouton carte/compte bancaire sur la page de dons et pourront donner par carte de crédit ou par virement ACH.

## Boutons PayPal et Venmo

Les églises qui utilisent **PayPal** comme fournisseur disposent des boutons **PayPal** et **Venmo** au-dessus des champs de carte sur la page de dons, pour les dons ponctuels. Les donateurs qui cliquent sur l'un d'eux finalisent le paiement dans une fenêtre PayPal, et le don est enregistré comme n'importe quel autre don en ligne. Venmo n'apparaît que pour les donateurs situés aux États-Unis, sur des appareils que PayPal considère éligibles. Les dons récurrents utilisent toujours les champs de carte.

## Configurer Paystack (Afrique)

Stripe n'ouvre pas de comptes pour les églises du Ghana, du Nigeria, du Kenya, d'Afrique du Sud ou de Côte d'Ivoire. [Paystack](https://paystack.com) le fait, et accepte les cartes locales, le **mobile money** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), le virement bancaire et l'USSD -- les donateurs paient dans votre devise locale (GHS, NGN, KES, ZAR, XOF).

1. Inscrivez-vous sur [paystack.com](https://paystack.com) avec le certificat d'enregistrement de votre entreprise ou association et un compte bancaire local, puis finalisez l'examen d'activation (mise en production) de Paystack.
2. Dans le tableau de bord Paystack, ouvrez **Paramètres → Clés API et webhooks** et copiez la **Clé publique** et la **Clé secrète** (utilisez les clés de production, et non les clés de test).
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Réglez le **Fournisseur** sur **Paystack**, collez la Clé publique et la Clé secrète, puis choisissez votre **Devise**.
5. Copiez l'**URL du webhook** affichée sous le fournisseur, revenez au tableau de bord Paystack (**Paramètres → Clés API et webhooks**) et collez-la dans le champ **URL du webhook**. C'est ainsi que sont enregistrés les dons récurrents et les paiements par mobile money.
6. Enregistrez.

Les donateurs effectuent leur paiement dans une fenêtre Paystack sécurisée et peuvent y choisir la carte, le mobile money ou le virement bancaire. Remarques :

- **Les dons récurrents** nécessitent une carte ; le mobile money ne peut pas être débité automatiquement à nouveau, Paystack n'autorise donc que les dons ponctuels par mobile money.
- Les dons récurrents Paystack peuvent être annulés depuis B1, mais ni suspendus ni modifiés -- annulez-en un et créez-en un nouveau pour changer le montant.
- Les **frais de traitement** par défaut reflètent les tarifs de Paystack pour les cartes locales dans votre devise ; modifiez-les si vos tarifs négociés diffèrent.

## Et ensuite

- Utilisez [Importation Stripe](stripe-import.md) pour importer les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Consultez vos [Rapports de dons](donation-reports.md) pour vérifier que les dons en ligne apparaissent correctement
- Générez les [Relevés de dons](giving-statements.md) qui incluent à la fois les dons en ligne et les dons hors ligne
