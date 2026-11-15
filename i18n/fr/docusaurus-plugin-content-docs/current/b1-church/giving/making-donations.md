---
title: "Faire un don dans le portail des membres B1.church"
sidebar_label: "Faire un don"
description: "Faites un don ponctuel ou récurrent à votre église via B1.church, avec ou sans compte, puis consultez votre historique de dons."
---

# Faire un don

<div class="article-intro">

Il existe deux façons de faire un don via le site B1.church de votre église : la page de dons publique (connexion non requise) et la page de dons pour les membres (connexion requise). Les deux utilisent un formulaire de don sécurisé fourni par le fournisseur de paiement de votre église (la plupart des églises utilisent Stripe).

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Pour les dons publics, aucun compte n'est nécessaire -- rendez-vous simplement sur la page **Donner** de votre église.
- Pour les dons de membres avec suivi de l'historique et modes de paiement enregistrés, [connectez-vous](../getting-started/logging-in.md) d'abord à votre compte.

</div>

## Page de dons publique (connexion non requise) {#public-donation-page-no-login-required}

Toute personne peut faire un don sans créer de compte :

1. Accédez à la page **Donner** de votre église.
2. Le formulaire de don s'affiche à gauche de la page. Choisissez **Faire un don** pour un don ponctuel, ou **Faire un don récurrent** pour donner selon un calendrier (choisissez la fréquence et la date de début).
3. Saisissez votre **prénom**, votre **nom** et votre **courriel**, puis les coordonnées de votre carte.
4. Sous **Fonds**, saisissez un **montant** et choisissez le **fonds**. Cliquez sur **Ajouter** pour répartir votre don entre plusieurs fonds.
5. Vous pouvez éventuellement ajouter une **note**. Si votre église le permet, vous pouvez cocher la case pour couvrir les frais de transaction.
6. Cliquez sur **Donner** pour finaliser votre don.

Pour donner sans que votre nom apparaisse sur le don, cochez **Donner anonymement (dons ponctuels seulement)**. Les champs de nom et l'option récurrente disparaissent alors.

À droite de la page, sous **Gérer les dons**, vous trouverez un lien **Instructions pour le paiement ACH** si vous préférez donner par virement bancaire. Un bouton **Connexion** est aussi disponible (ainsi qu'un lien **Connectez-vous pour gérer les dons existants** sous le formulaire) si vous souhaitez vous connecter pour accéder à des fonctionnalités supplémentaires, comme l'historique des dons.

L'écran **Dons** du portail des membres (`/mobile/donate`) affiche le même formulaire lorsque vous êtes déconnecté, avec un lien **Connectez-vous pour gérer les dons récurrents et consulter l'historique** en dessous.

:::tip
Si vous êtes déjà connecté lorsque vous visitez la page de dons publique, vous serez automatiquement redirigé vers la page de dons pour les membres, où vous avez accès à votre historique complet et à vos modes de paiement enregistrés.
:::

## Page de dons pour les membres (connecté) {#member-donation-page-logged-in}

Lorsque vous êtes connecté, la page **Dons** du portail des membres affiche un bouton **Donner** et un bouton **Imprimer le relevé** en haut, suivis des sections suivantes :

- **Cette année** (titrée de l'année en cours) -- Votre total de dons depuis le début de l'année et le nombre de dons, avec un lien **Tout l'historique**. Voir [Historique des dons](./donation-history.md) pour plus de détails.
- **Récurrents** -- Vos dons programmés, avec un lien **Gérer**.
- **Activité récente** -- Vos trois derniers dons, avec un lien **Répéter le dernier don** qui ouvre le formulaire de don.
- **Modes de paiement** -- Vos cartes et comptes bancaires enregistrés, avec un lien **Gérer** pour ajouter une carte ou un compte bancaire, et pour modifier ou retirer ceux qui sont enregistrés.
- Une carte de progression de campagne, si votre église a une campagne active.

Pour donner :

1. Ouvrez la page Dons depuis l'onglet **Donner** de votre église, depuis le bouton **Donner** dans la section **Dons** de votre [tableau de bord d'accueil](../getting-started/navigating.md#home), ou depuis **Historique** dans la section **Dons** de votre [page Moi](../getting-started/me-page.md). Sur la page Dons, appuyez sur **Donner** pour ouvrir le formulaire de don.
2. Choisissez **Faire un don** ou **Faire un don récurrent**.
3. Sélectionnez un mode de paiement enregistré ou saisissez les coordonnées d'une nouvelle carte. Lors de la saisie d'une nouvelle carte, cochez **Enregistrer cette carte pour de futurs dons** pour la conserver la prochaine fois (si le fournisseur de votre église prend en charge les cartes enregistrées).
4. Choisissez le **Fonds** auquel vous souhaitez donner et saisissez le **Montant** ; cliquez sur **Ajouter** pour donner à plusieurs fonds. La liste n'affiche que les fonds que votre église propose aux donateurs, même si vous êtes membre du personnel et pouvez voir d'autres fonds dans B1 Admin.
5. Cliquez sur **Aperçu du don** pour vérifier votre don, puis sur **Donner** pour le finaliser. **Annuler** vous ramène à la page Dons.

Une fois votre don traité, un message de confirmation apparaît et votre don s'affiche dans votre [historique des dons](./donation-history.md).

:::info
Si les dons que vous avez effectués ont été enregistrés dans plusieurs devises, votre total de l'année et le total de l'historique sont convertis dans la devise de votre église, avec une note **Converti aux taux de change actuels** dessous. Les dons individuels de votre historique affichent toujours leur devise d'origine.
:::

## Modes de paiement {#payment-methods}

Les dons sont traités en toute sécurité par le fournisseur de paiement que votre église a connecté. Les moyens de paiement disponibles dépendent de ce fournisseur :

- **Stripe** -- carte de crédit ou de débit, ou compte bancaire (ACH).
- **Kingdom Funding** -- carte de crédit ou de débit, ou compte bancaire (ACH).
- **Paystack** (églises en Afrique) -- cartes locales et argent mobile, dans votre devise locale.
- **PayPal et Venmo** -- les églises qui avaient déjà configuré PayPal affichent des boutons **PayPal** et **Venmo** au-dessus des champs de carte pour les dons ponctuels. Les dons récurrents utilisent les champs de carte.

Lorsque vous êtes connecté, vos modes de paiement peuvent être enregistrés pour une utilisation future, ce qui accélère vos prochains dons.

:::info Donner par compte bancaire sans se connecter
Si vous donnez en tant qu'invité (sans vous connecter) par compte bancaire, le compte doit être vérifié instantanément en vous connectant à votre banque. Si ce n'est pas possible, vous verrez le message « Ce compte bancaire n'a pas pu être vérifié instantanément. Veuillez donner par carte, ou connectez-vous et ajoutez le compte bancaire sous votre profil de dons. » Les comptes bancaires qui nécessitent quelques jours de vérification ne peuvent être ajoutés qu'après connexion.
:::

:::warning
Si votre don n'aboutit pas, vérifiez vos coordonnées de paiement et réessayez. Si le problème persiste, contactez le secrétariat de votre église pour obtenir de l'aide.
:::

## Étapes suivantes {#next-steps}

- [Historique des dons](./donation-history.md) -- Consultez vos dons passés et imprimez vos relevés de dons
