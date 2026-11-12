---
title: "Configuration des dons en ligne"
description: "Connectez Stripe, Kingdom Funding ou Paystack à B1 Admin afin que les membres puissent donner en ligne via votre site B1.church et que les dons soient synchronisés avec vos registres."
---

# Configuration des dons en ligne

<div class="article-intro">

B1 Admin s'intègre à **Stripe**, **Kingdom Funding** et **Paystack** (pour les églises d'Afrique) afin que vos membres puissent donner en ligne via votre site B1.church. Une fois configurés, les dons en ligne apparaissent automatiquement dans vos registres de dons, à côté des dons saisis manuellement, ce qui garde tout dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de dons](funds.md) afin que les donateurs puissent désigner leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez à portée de main vos identifiants de connexion à B1 Admin

</div>

## Configurer Stripe {#setting-up-stripe}

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas encore. Assurez-vous d'**activer votre compte** et de le sortir du mode test.
2. Dans Stripe, accédez à **Développeurs > Clés API**.
3. Copiez votre **Clé publiable**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Accédez à **Paramètres** et ouvrez la section **Dons**.
6. Cliquez sur **Modifier** dans la section **Dons**.
7. Définissez le **Fournisseur** sur **Stripe**.
8. Collez votre Clé publiable dans le champ **Clé publique**.
9. Revenez à Stripe et affichez votre **Clé secrète** (vous ne pouvez la consulter qu'une seule fois, enregistrez donc une copie de sauvegarde).
10. Collez la Clé secrète dans le champ **Clé secrète** et cliquez sur **Enregistrer**.

:::warning
Votre Clé secrète Stripe n'est affichée qu'une seule fois. Copiez-la dans un endroit sûr avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choisir votre devise {#choosing-your-currency}

Après avoir sélectionné Stripe comme fournisseur, une liste déroulante **Devise** apparaît à côté de vos clés API. Choisissez la devise qui correspond à la devise de règlement de votre compte Stripe afin que les dons soient débités correctement.

Si vous n'avez pas encore enregistré de devise, la liste déroulante commence sur la devise du pays de votre église indiqué lors de l'inscription, et non sur le dollar américain. Vérifiez qu'elle correspond à votre compte Stripe avant d'enregistrer.

Si votre église ne reçoit pas de dons en ligne, laissez le **Fournisseur** sur **Aucun**, mais choisissez tout de même une **Devise** -- la liste comprend alors toutes les devises, avec la mention « La devise dans laquelle votre église enregistre les dons. » Les dons que vous saisissez à la main dans les lots sont enregistrés dans cette devise, et les totaux de dons sont affichés dans cette devise.

Les devises prises en charge comprennent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN, BRL et PHP. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise que vous sélectionnez ici est utilisée pour les dons ponctuels, les abonnements récurrents, le calcul des frais et les rapports de dons. Si vous changez de devise plus tard, seuls les nouveaux dons et abonnements utiliseront la nouvelle devise -- les dons récurrents existants continuent dans la devise avec laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise choisie. Si votre compte Stripe ne prend pas en charge la devise sélectionnée, les dons échoueront au moment du paiement.
:::

## Apple Pay et Google Pay {#apple-pay-and-google-pay}

Les églises qui utilisent Stripe obtiennent automatiquement des boutons Apple Pay et Google Pay sur la page de dons publique. Les boutons apparaissent au-dessus des champs de carte pour les dons ponctuels, une fois que le donateur a choisi un fonds et un montant, et uniquement lorsque le navigateur ou l'appareil du donateur a un portefeuille configuré. Les dons récurrents utilisent toujours les champs de carte ou de compte bancaire.

Google Pay ne nécessite aucune configuration. Apple Pay exige que le domaine de votre page de dons soit enregistré auprès de Stripe ; B1 l'enregistre la première fois que la page de dons se charge sur votre domaine. Si le bouton Apple Pay n'apparaît pas sur un iPhone, consultez **Paramètres > Domaines de méthodes de paiement** dans votre tableau de bord Stripe et vérifiez que votre domaine `yoursubdomain.b1.church` (ou personnalisé) est listé et vérifié.

## Dons anonymes {#anonymous-gifts}

Les donateurs de la page de dons publique peuvent cocher **Donner anonymement**. Un don anonyme est enregistré sans donateur associé, est tout de même affecté au fonds choisi par le donateur, et apparaît comme **Anonyme** dans vos lots et rapports. Le courriel du donateur reste obligatoire afin que le reçu puisse être envoyé, mais aucune fiche personne n'est créée. Les dons anonymes sont uniquement ponctuels et n'apparaissent sur aucun relevé de dons.

## Dons récurrents échoués {#failed-recurring-gifts}

Lorsqu'un don récurrent sur Stripe échoue (par exemple, une carte expirée ou refusée), le débit échoué apparaît sous **Dons > Dons échoués** avec le donateur, le montant, la date et la raison donnée par la passerelle. Cliquez sur **Réessayer** pour relancer le débit une fois que le donateur a mis à jour son mode de paiement.

B1 envoie aussi un courriel au donateur lorsque le débit échoue, puis de nouveau trois et sept jours plus tard si le paiement n'a toujours pas abouti, avec un lien pour mettre à jour son mode de paiement dans B1.church.

:::info
Si votre église a configuré Stripe avant l'existence de cette fonctionnalité, ouvrez **Paramètres** > **Dons**, cliquez sur modifier, puis cliquez une fois sur **Enregistrer**. Cela actualise le webhook Stripe afin que les débits échoués soient signalés à B1.
:::

## Ajouter une page de dons à votre site B1.church {#adding-a-donation-page-to-your-b1church-site}

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Paramètres**.
3. Cliquez sur **Ajouter un onglet**.
4. Choisissez **Don** comme type.
5. Saisissez un nom pour l'onglet (par exemple « Donner ») et cliquez sur **Enregistrer**.
6. Vous pouvez éventuellement modifier l'icône de l'onglet -- saisissez « Don » dans la recherche d'icônes pour trouver une icône liée aux dons.

Votre page de dons est maintenant en ligne. Les membres peuvent la consulter à l'adresse `yoursubdomain.b1.church/donate`.

## Partager votre lien de dons {#sharing-your-giving-link}

Pour trouver l'URL de vos dons, allez dans **B1 Admin** et cliquez sur l'icône **Paramètres** pour voir votre sous-domaine. Votre lien de dons suit le format suivant :

`https://yoursubdomain.b1.church/donate`

Partagez ce lien sur votre site web, dans vos courriels ou dans votre feuillet dominical afin que les membres sachent où donner en ligne.

### Liens avec un fonds et un montant prédéfinis {#links-with-a-preset-fund-and-amount}

Pour diriger directement les donateurs vers un fonds précis, allez dans **Dons > Fonds** et cliquez sur **Lien de don** sur le fonds. Vous pouvez éventuellement saisir un montant, puis copier le lien. La boîte de dialogue affiche aussi un code QR pour ce même lien ; cliquez sur **Télécharger le PNG** pour l'enregistrer pour un feuillet, une diapositive ou une affiche. Lorsqu'un donateur ouvre le lien ou scanne le code, le fonds et le montant sont déjà sélectionnés sur la page de dons. Le lien prend la forme suivante :

`https://yoursubdomain.b1.church/donate?fundId=FUND_ID&amount=25`

Les mêmes paramètres fonctionnent dans l'élément **Lien de don** du générateur de site web.

## Notifications de dons {#donation-notifications}

Stripe envoie un courriel de notification à chaque don reçu. Pour modifier l'adresse courriel de notification, allez dans le tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profil**, puis mettez à jour votre adresse courriel.

## Options de frais de traitement {#processing-fee-options}

Vous pouvez permettre aux donateurs de couvrir facultativement les frais de traitement afin que votre église reçoive le montant total du don. Dans **Paramètres > Dons**, cliquez sur modifier et activez l'interrupteur **Frais de transaction** à côté de vos clés. Les taux utilisés pour calculer les frais se trouvent sous **Frais et relevés** : **Taux fixe** et **Frais de transaction** pour les cartes, et, pour les dons par virement bancaire (ACH) Stripe, un pourcentage et une **Limite maximale**. Ils commencent sur les taux standard de votre fournisseur ; modifiez-les si vos taux négociés diffèrent, puis cliquez sur **Enregistrer**.

:::tip
Après la configuration, effectuez un petit don test pour vérifier que tout fonctionne avant d'annoncer les dons en ligne à votre communauté.
:::

## Configurer Kingdom Funding {#setting-up-kingdom-funding}

Kingdom Funding est un processeur de paiement chrétien qui prend en charge les cartes de crédit et de débit ainsi que les virements bancaires ACH. Si votre église est inscrite auprès de Kingdom Funding, vous pouvez la connecter comme passerelle de dons.

:::info
L'intégration de Kingdom Funding est actuellement en bêta. Contactez votre représentant de compte B1 pour l'activer pour votre église.
:::

1. Inscrivez-vous ou connectez-vous sur [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenez votre **Clé de tokenisation** et votre **Clé source** depuis le tableau de bord de Kingdom Funding.
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Définissez le **Fournisseur** sur **Kingdom Funding**.
5. Collez les clés dans les champs **Clé de tokenisation** et **Clé source**.
6. Saisissez la **Clé du webhook** (le secret de signature du webhook depuis le panneau de contrôle de Kingdom Funding), et copiez l'URL du webhook affichée sous le fournisseur dans vos paramètres Kingdom Funding afin que Kingdom Funding puisse informer B1 des transactions terminées.
7. Cliquez sur **Enregistrer**.

Une fois connectés, les membres verront un interrupteur carte/compte bancaire sur la page de dons et pourront donner par carte de crédit ou virement ACH.

## Boutons PayPal et Venmo {#paypal-and-venmo-buttons}

PayPal n'est plus proposé dans la liste des **Fournisseurs** pour les nouvelles configurations. Les églises déjà connectées à **PayPal** obtiennent des boutons **PayPal** et **Venmo** au-dessus des champs de carte sur la page de dons pour les dons ponctuels. Les donateurs qui cliquent sur l'un de ces boutons finalisent le paiement dans une fenêtre PayPal, et le don est enregistré comme tout autre don en ligne. Venmo n'apparaît que pour les donateurs situés aux États-Unis, sur des appareils que PayPal considère éligibles. Les dons récurrents utilisent toujours les champs de carte.

## Configurer Paystack (Afrique) {#setting-up-paystack-africa}

Stripe n'ouvre pas de comptes pour les églises au Ghana, au Nigeria, au Kenya, en Afrique du Sud ou en Côte d'Ivoire. [Paystack](https://paystack.com) le fait, et accepte les cartes locales, l'**argent mobile** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), les virements bancaires et l'USSD -- les donateurs paient dans votre devise locale (GHS, NGN, KES, ZAR, XOF).

1. Inscrivez-vous sur [paystack.com](https://paystack.com) avec le certificat d'enregistrement de votre organisation et un compte bancaire local, puis terminez l'examen d'activation (mise en service) de Paystack.
2. Dans le tableau de bord Paystack, ouvrez **Paramètres → Clés API et webhooks**, puis copiez la **Clé publique** et la **Clé secrète** (utilisez les clés de production, et non les clés de test).
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Définissez le **Fournisseur** sur **Paystack**, collez la Clé publique et la Clé secrète, puis choisissez votre **Devise**.
5. Copiez l'**URL du webhook** affichée sous le fournisseur, retournez dans le tableau de bord Paystack (**Paramètres → Clés API et webhooks**) et collez-la dans le champ **URL du webhook**. C'est ainsi que les dons récurrents et les paiements par argent mobile sont enregistrés.
6. Enregistrez.

Les donateurs finalisent leur paiement dans une fenêtre Paystack sécurisée et peuvent y choisir la carte, l'argent mobile ou le virement bancaire. Remarques :

- **Les dons récurrents** nécessitent une carte ; l'argent mobile ne peut pas être débité automatiquement à nouveau, de sorte que Paystack n'autorise que les dons ponctuels par argent mobile.
- Les dons récurrents Paystack peuvent être annulés depuis B1, mais ni suspendus ni modifiés -- annulez-en un et créez-en un nouveau pour changer le montant.
- Les valeurs par défaut des **Frais de traitement** reflètent les taux Paystack pour les cartes locales dans votre devise ; modifiez-les si vos taux négociés diffèrent.

## Étapes suivantes {#next-steps}

- Utilisez [Importation Stripe](stripe-import.md) pour importer les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Consultez vos [Rapports sur les dons](donation-reports.md) pour vérifier que les dons en ligne apparaissent correctement
- Générez des [Relevés de dons](giving-statements.md) qui incluent à la fois les dons en ligne et les dons hors ligne
