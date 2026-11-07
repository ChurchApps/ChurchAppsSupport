---
title: "Configuration des dons en ligne"
description: "Reliez Stripe, PayPal, Kingdom Funding ou Paystack à B1 Admin pour que les membres puissent donner en ligne via votre site B1.church et que les dons se synchronisent avec vos dossiers."
---

# Configuration des dons en ligne

<div class="article-intro">

B1 Admin s'intègre à **Stripe**, **PayPal**, **Kingdom Funding** et **Paystack** (pour les églises d'Afrique) afin que vos membres puissent donner en ligne via votre site B1.church. Une fois configurés, les dons en ligne apparaissent automatiquement dans vos registres de dons, à côté des dons saisis manuellement, ce qui garde tout dans un seul système.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Configurez vos [fonds de dons](funds.md) afin que les donateurs puissent désigner leurs dons
- Créez un compte Stripe sur [stripe.com](https://stripe.com) et activez-le (sortez-le du mode test)
- Ayez à portée de main vos identifiants de connexion à B1 Admin

</div>

## Configurer Stripe

1. Créez un compte sur [stripe.com](https://stripe.com) si vous n'en avez pas encore. Assurez-vous de **activer votre compte** et de le sortir du mode test.
2. Dans Stripe, allez dans **Développeurs > Clés API**.
3. Copiez votre **clé publiable**.
4. Connectez-vous à [B1 Admin](https://admin.b1.church/).
5. Allez dans **Paramètres** et ouvrez la section **Dons**.
6. Cliquez sur **Modifier** dans la section **Dons**.
7. Définissez le **fournisseur** sur **Stripe**.
8. Collez votre clé publiable dans le champ **Clé publique**.
9. Revenez à Stripe et affichez votre **clé secrète** (vous ne pouvez la voir qu'une seule fois, enregistrez donc une copie de sauvegarde).
10. Collez la clé secrète dans le champ **Clé secrète** et cliquez sur **Enregistrer**.

:::warning
Votre clé secrète Stripe n'est affichée qu'une seule fois. Copiez-la dans un endroit sûr avant de quitter le tableau de bord Stripe. Si vous la perdez, vous devrez générer une nouvelle clé.
:::

## Choisir votre devise

Après avoir sélectionné Stripe comme fournisseur, une liste déroulante **Devise** apparaît à côté de vos clés API. Choisissez la devise qui correspond à la devise de règlement de votre compte Stripe afin que les dons soient débités correctement.

Les devises prises en charge comprennent USD, EUR, GBP, CAD, AUD, INR, JPY, SGD, HKD, SEK, NOK, DKK, CHF, MXN et BRL. Vous pouvez confirmer ou modifier la devise par défaut de votre compte dans votre [tableau de bord Stripe](https://dashboard.stripe.com/settings/currencies).

:::info
La devise sélectionnée ici est utilisée pour les dons ponctuels, les abonnements récurrents, le calcul des frais et les rapports de dons. Si vous changez de devise plus tard, seuls les nouveaux dons et abonnements utiliseront la nouvelle devise ; les dons récurrents existants continuent dans la devise dans laquelle ils ont été créés.
:::

:::warning
Assurez-vous que votre compte Stripe est configuré pour accepter la devise choisie. Si votre compte Stripe ne prend pas en charge la devise sélectionnée, les dons échoueront lors du paiement.
:::

## Apple Pay et Google Pay

Les églises qui utilisent Stripe obtiennent automatiquement les boutons Apple Pay et Google Pay sur la page de dons publique. Les boutons apparaissent au-dessus des champs de carte pour les dons ponctuels, une fois que le donateur a choisi un fonds et un montant, et uniquement lorsque le navigateur ou l'appareil du donateur a un portefeuille configuré. Les dons récurrents utilisent toujours les champs de carte ou de compte bancaire.

Google Pay ne nécessite aucune configuration. Apple Pay exige que le domaine de votre page de dons soit enregistré auprès de Stripe ; B1 l'enregistre la première fois que la page de dons se charge sur votre domaine. Si le bouton Apple Pay n'apparaît pas sur un iPhone, consultez **Paramètres > Domaines de méthodes de paiement** dans votre tableau de bord Stripe et vérifiez que votre sous-domaine `votresousdomaine.b1.church` (ou personnalisé) figure dans la liste et est vérifié.

## Dons anonymes

Les donateurs de la page de dons publique peuvent cocher **Donner anonymement**. Un don anonyme est enregistré sans donateur rattaché, est tout de même versé au fonds choisi par le donateur, et apparaît comme **Anonyme** dans vos lots et rapports. Le courriel du donateur reste requis pour que le reçu puisse être envoyé, mais aucune fiche de personne n'est créée. Les dons anonymes sont uniquement ponctuels et n'apparaissent sur aucun reçu de dons.

## Dons récurrents en échec

Lorsqu'un don récurrent sur Stripe échoue (une carte expirée ou refusée, par exemple), le débit en échec apparaît sous **Dons > Dons en échec** avec le donateur, le montant, la date et la raison donnée par la passerelle. Cliquez sur **Réessayer** pour tenter à nouveau le débit une fois que le donateur a mis à jour son mode de paiement.

B1 envoie aussi un courriel au donateur lorsque le débit échoue, puis de nouveau trois et sept jours plus tard si le paiement n'a toujours pas abouti, avec un lien pour mettre à jour son mode de paiement sur B1.church.

:::info
Si votre église a configuré Stripe avant l'existence de cette fonctionnalité, ouvrez **Paramètres** > **Dons**, cliquez sur modifier, puis cliquez sur **Enregistrer** une fois. Cela actualise le webhook Stripe afin que les débits en échec soient signalés à B1.
:::

## Ajouter une page de dons à votre site B1.church

1. Allez sur [b1.church](https://b1.church/) et connectez-vous.
2. Cliquez sur l'icône **Paramètres**.
3. Cliquez sur **Ajouter un onglet**.
4. Choisissez **Don** comme type.
5. Saisissez un nom pour l'onglet (par exemple « Donner ») et cliquez sur **Enregistrer**.
6. Vous pouvez facultativement changer l'icône de l'onglet -- saisissez « Don » dans la recherche d'icônes pour trouver une icône liée aux dons.

Votre page de dons est maintenant en ligne. Les membres peuvent la consulter à l'adresse `votresousdomaine.b1.church/donate`.

## Partager votre lien de dons

Pour trouver l'adresse de vos dons en ligne, allez dans **B1 Admin** et cliquez sur l'icône **Paramètres** pour voir votre sous-domaine. Votre lien de dons suit ce format :

`https://votresousdomaine.b1.church/donate`

Partagez ce lien sur votre site web, dans vos courriels ou dans votre bulletin afin que les membres sachent où donner en ligne.

### Liens avec un fonds et un montant préremplis

Pour diriger les donateurs directement vers un fonds précis, allez dans **Dons > Fonds** et cliquez sur **Lien de dons** pour ce fonds. Vous pouvez facultativement saisir un montant, puis copier le lien. La boîte de dialogue affiche aussi un code QR pour le même lien ; cliquez sur **Télécharger le PNG** pour l'enregistrer pour un bulletin, une diapositive ou une affiche. Lorsqu'un donateur ouvre le lien ou scanne le code, le fonds et le montant sont déjà sélectionnés sur la page de dons. Le lien prend la forme suivante :

`https://votresousdomaine.b1.church/donate?fundId=FUND_ID&amount=25`

Les mêmes paramètres fonctionnent dans l'élément **Lien de dons** du générateur de site web.

## Notifications de dons

Stripe envoie un courriel de notification à chaque don reçu. Pour modifier l'adresse courriel de notification, allez dans le tableau de bord Stripe, cliquez sur votre profil en haut à droite, choisissez **Profil** et mettez à jour votre adresse courriel.

## Options de frais de traitement

Vous pouvez configurer votre page de dons pour permettre aux donateurs de couvrir facultativement les frais de traitement afin que votre église reçoive le montant intégral du don. Ce paramètre se gère dans les paramètres de votre église, dans B1 Admin.

:::tip
Après la configuration, faites un petit don test pour vérifier que tout fonctionne avant d'annoncer les dons en ligne à votre congrégation.
:::

## Configurer Kingdom Funding

Kingdom Funding est un processeur de paiement chrétien qui prend en charge les cartes de crédit et de débit ainsi que les virements bancaires ACH. Si votre église est inscrite auprès de Kingdom Funding, vous pouvez la connecter comme passerelle de dons.

:::info
L'intégration de Kingdom Funding est actuellement en bêta. Contactez votre représentant de compte B1 pour l'activer pour votre église.
:::

1. Inscrivez-vous ou connectez-vous sur [kingdomfundinginternational.com](https://kingdomfundinginternational.com/churches/apply).
2. Obtenez votre **clé de sécurité** (publique) et votre **clé privée** depuis le portail marchand de Kingdom Funding.
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Définissez le **fournisseur** sur **Kingdom Funding**.
5. Collez votre clé de sécurité dans le champ **Clé de sécurité** et votre clé privée dans le champ **Clé privée**.
6. Définissez la **clé de webhook** que vous avez reçue de Kingdom Funding, et copiez l'URL de webhook affichée dans vos paramètres marchands Kingdom Funding afin que Kingdom Funding puisse signaler à B1 les transactions effectuées.
7. Enregistrez.

Une fois connectés, les membres verront un bouton carte/compte bancaire sur la page de dons et pourront donner par carte de crédit ou par virement ACH.

## Boutons PayPal et Venmo

Les églises qui utilisent **PayPal** comme fournisseur ont des boutons **PayPal** et **Venmo** au-dessus des champs de carte sur la page de dons pour les dons ponctuels. Les donateurs qui cliquent sur l'un d'eux finalisent le paiement dans une fenêtre PayPal, et le don est enregistré comme tout autre don en ligne. Venmo n'apparaît que pour les donateurs situés aux États-Unis, sur des appareils que PayPal juge admissibles. Les dons récurrents utilisent toujours les champs de carte.

## Configurer Paystack (Afrique)

Stripe n'ouvre pas de comptes pour les églises du Ghana, du Nigeria, du Kenya, d'Afrique du Sud ou de Côte d'Ivoire. [Paystack](https://paystack.com) le fait, et accepte les cartes locales, l'**argent mobile** (MTN MoMo, Vodafone Cash, AirtelTigo, M-PESA), les virements bancaires et l'USSD -- les donateurs paient dans votre devise locale (GHS, NGN, KES, ZAR, XOF).

1. Inscrivez-vous sur [paystack.com](https://paystack.com) avec le certificat d'enregistrement commercial de votre église et un compte bancaire local, puis complétez l'examen d'activation (mise en production) de Paystack.
2. Dans le tableau de bord Paystack, ouvrez **Paramètres → Clés API et webhooks** et copiez la **clé publique** et la **clé secrète** (utilisez les clés de production, pas les clés de test).
3. Dans B1 Admin, allez dans **Paramètres**, ouvrez la section **Dons** et cliquez sur modifier.
4. Définissez le **fournisseur** sur **Paystack**, collez la clé publique et la clé secrète, et choisissez votre **devise**.
5. Copiez l'**URL de webhook** affichée sous le fournisseur, retournez dans le tableau de bord Paystack (**Paramètres → Clés API et webhooks**) et collez-la dans le champ **URL de webhook**. C'est ainsi que sont enregistrés les dons récurrents et les paiements par argent mobile.
6. Enregistrez.

Les donateurs effectuent leur paiement dans une fenêtre Paystack sécurisée et peuvent y choisir carte, argent mobile ou virement bancaire. Remarques :

- **Les dons récurrents** exigent une carte ; l'argent mobile ne peut pas être débité automatiquement à nouveau, donc Paystack n'autorise que les dons ponctuels par argent mobile.
- Les dons récurrents Paystack peuvent être annulés depuis B1, mais ni suspendus ni modifiés -- annulez-en un et créez-en un nouveau pour changer le montant.
- Les **frais de traitement** par défaut reflètent les tarifs de Paystack pour les cartes locales dans votre devise ; modifiez-les si vos tarifs négociés diffèrent.

## Et ensuite

- Utilisez [Importation Stripe](stripe-import.md) pour importer les transactions en ligne dans B1 Admin si elles ne se synchronisent pas automatiquement
- Consultez vos [Rapports de dons](donation-reports.md) pour vérifier que les dons en ligne apparaissent correctement
- Générez des [Reçus de dons](giving-statements.md) qui incluent les dons en ligne et hors ligne
