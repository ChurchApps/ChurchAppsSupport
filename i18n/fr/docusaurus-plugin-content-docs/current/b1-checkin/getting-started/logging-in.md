---
title: "Connexion à B1 Church Checkin"
sidebar_label: "Connexion"
description: "Connectez-vous à B1 Church Checkin, choisissez votre église, et découvrez la connexion automatique, les paramètres admin et la déconnexion."
---

# Connexion

<div class="article-intro">

Avant que la borne puisse servir au pointage, vous devez vous connecter avec un compte ChurchApps qui a accès à votre église. Cette page couvre la première connexion, le choix de l'église, la connexion automatique et la façon de vous déconnecter.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez B1 Church Checkin sur votre tablette Android (voir [Pour commencer](./index.md))
- Ayez à portée de main le courriel et le mot de passe de votre compte ChurchApps
- Le compte doit avoir l'autorisation **Pointage** (ou **Modifier les présences**) dans votre église. Un administrateur l'ajoute dans B1 Admin sous **Paramètres > Rôles** — voir [Comptes des bornes de pointage](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Première connexion

1. Ouvrez l'application B1 Church Checkin. Après l'écran de démarrage, vous verrez l'écran de connexion avec le logo de B1 Church Checkin.
2. Saisissez votre **adresse courriel** dans le premier champ.
3. Saisissez votre **mot de passe** dans le deuxième champ.
4. Appuyez sur le bouton **Connexion**.

L'application valide vos identifiants et vous connecte. Si le courriel ou le mot de passe est incorrect, un message d'erreur apparaît au bas de l'écran.

Si le compte a la [connexion à deux facteurs](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) activée, l'application demande ensuite un code. Saisissez le code à 6 chiffres de l'application d'authentification du titulaire du compte, ou l'un de ses codes de secours, puis appuyez de nouveau sur **Connexion**. Ce code n'est nécessaire que pour cette première connexion ; ensuite, la borne reste connectée.

:::info
Il s'agit du même courriel et du même mot de passe que ceux que vous utilisez pour B1 Admin ou tout autre produit ChurchApps. Vous n'avez pas besoin d'un compte distinct pour la borne de pointage.
:::

## Choisir votre église

Après une connexion réussie, l'application charge les églises pour lesquelles votre compte possède l'autorisation **Pointage** ou **Modifier les présences**. Les églises pour lesquelles vous n'avez que d'autres autorisations sont exclues. S'il n'en reste aucune, l'application affiche **Aucun accès au pointage** et vous demande de faire ajouter l'autorisation Pointage à l'un de vos rôles par l'administrateur de votre église. Chaque église est présentée sous forme de carte affichant son nom et son logo (s'il a été configuré dans B1 Admin).

- Si votre compte n'est lié qu'à **une seule église**, vous verrez tout de même l'écran de sélection. Appuyez sur votre église pour continuer.
- Si votre compte est lié à **plusieurs églises**, appuyez sur l'église que cette borne doit servir.

Une fois l'église sélectionnée, l'application charge son image de marque et ses paramètres d'apparence. Le logo de votre église apparaîtra dans l'en-tête de tous les écrans suivants.

## Connexion automatique lors des visites suivantes

Après la première connexion réussie, l'application conserve sur la tablette un jeton de connexion sécurisé et l'église choisie. Elle ne conserve pas votre mot de passe. Aux lancements suivants :

- L'application vous reconnecte avec le jeton enregistré.
- Si vous aviez déjà choisi une église, elle restaure ce choix et vous mène directement à l'**écran des services**.
- Si la connexion enregistrée n'est plus valide, l'application revient à l'écran de connexion pour que vous puissiez vous reconnecter.

:::tip
Comme la borne se connecte automatiquement, vous n'avez à saisir vos identifiants qu'une seule fois, lors de la configuration initiale. Ensuite, il suffit d'allumer la tablette pour qu'elle soit prête à servir.
:::

## Paramètres d'administration

Les paramètres d'administration sont volontairement masqués afin que les membres de l'église qui utilisent la borne ne modifient pas la configuration par accident. Pour y accéder :

1. Appuyez **sept fois** de suite, rapidement (en moins de deux secondes), sur le **logo de l'église** dans l'en-tête.
2. Si un NIP de borne est défini, saisissez-le lorsqu'il vous est demandé.
3. L'écran **Paramètres d'administration** s'ouvre avec les options suivantes :
   - **Changer de service** — changer l'horaire de service sélectionné
   - **Changer d'imprimante** — ouvrir les [paramètres de l'imprimante](./printer-setup.md) pour rechercher et sélectionner une imprimante
   - **Définir/Changer le NIP** — définir ou mettre à jour le NIP de la borne qui protège l'accès d'administration
   - **Déconnexion** — se déconnecter et revenir à l'écran de connexion

:::warning
La déconnexion efface tous les identifiants enregistrés et le choix de l'église. Vous devrez ressaisir votre courriel et votre mot de passe pour utiliser à nouveau la borne. Ne vous déconnectez que lorsque vous devez changer de compte ou reconfigurer la borne.
:::

## Et ensuite

Une fois connecté, vous pouvez [configurer une imprimante](./printer-setup.md) ou passer directement au [flux de pointage](../check-in/index.md).
