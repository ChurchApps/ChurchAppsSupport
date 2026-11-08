---
title: "Se connecter à B1 Church Checkin"
sidebar_label: "Connexion"
description: "Connectez-vous à l'application de borne B1 Church Checkin, choisissez votre église, et comprenez la connexion automatique, les paramètres administrateur et la déconnexion sur la tablette d'enregistrement."
---

# Connexion

<div class="article-intro">

Avant de pouvoir utiliser la borne pour l'enregistrement, vous devez vous connecter avec un compte ChurchApps ayant accès à votre église. Cette page explique la procédure de première connexion, la sélection de l'église, le comportement de la connexion automatique et la manière de vous déconnecter.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez B1 Church Checkin sur votre tablette Android (voir [Prise en main](./index.md))
- Ayez à portée de main l'adresse e-mail et le mot de passe de votre compte ChurchApps
- Le compte doit disposer de l'autorisation **Checkin** (ou **Edit Attendance**) pour votre église. Un administrateur l'ajoute dans B1 Admin, sous **Paramètres > Rôles** — voir [Comptes de borne d'enregistrement](../../b1-admin/settings/roles-permissions.md#check-in-kiosk-accounts)

</div>

## Première connexion

1. Ouvrez l'application B1 Church Checkin. Après l'écran de démarrage, l'écran de connexion avec le logo B1 Church Checkin s'affiche.
2. Saisissez votre **adresse e-mail** dans le premier champ.
3. Saisissez votre **mot de passe** dans le second champ.
4. Appuyez sur le bouton **Connexion**.

L'application vérifie vos identifiants et vous connecte. Si l'adresse e-mail ou le mot de passe est incorrect, un message d'erreur apparaît en bas de l'écran.

Si le compte a activé la [validation en deux étapes](../../b1-admin/profile/managing-profile.md#two-factor-sign-in), l'application demande ensuite un code. Saisissez le code à 6 chiffres de l'application d'authentification du titulaire du compte, ou l'un de ses codes de secours, puis appuyez de nouveau sur **Connexion**. Ce code n'est requis que pour cette première connexion ; ensuite, la borne reste connectée.

:::info
Il s'agit de la même adresse e-mail et du même mot de passe que ceux que vous utilisez pour B1 Admin ou tout autre produit ChurchApps. Vous n'avez pas besoin d'un compte distinct pour la borne d'enregistrement.
:::

## Sélectionner votre église

Après une connexion réussie, l'application charge les églises pour lesquelles votre compte dispose de l'autorisation **Checkin** ou **Edit Attendance**. Les églises pour lesquelles vous n'avez que d'autres autorisations sont exclues. Si aucune église ne reste, l'application affiche **Pas d'accès à l'enregistrement** et vous demande de faire ajouter l'autorisation Checkin à l'un de vos rôles par l'administrateur de votre église. Chaque église est présentée sous forme de carte affichant son nom et son logo (s'il a été configuré dans B1 Admin).

- Si votre compte est lié à **une seule église**, l'écran de sélection s'affiche tout de même. Appuyez sur votre église pour continuer.
- Si votre compte est lié à **plusieurs églises**, appuyez sur l'église que cette borne doit desservir.

Une fois l'église sélectionnée, l'application charge son image de marque et ses paramètres d'apparence. Le logo de votre église apparaîtra dans l'en-tête de tous les écrans suivants.

## Connexion automatique lors des visites suivantes

Après la première connexion réussie, l'application conserve sur la tablette un jeton de connexion sécurisé ainsi que l'église sélectionnée. Elle ne stocke pas votre mot de passe. Lors des lancements suivants :

- L'application vous reconnecte automatiquement grâce au jeton enregistré.
- Si vous aviez déjà sélectionné une église, elle restaure ce choix et vous mène directement à l'**écran des services**.
- Si la connexion enregistrée n'est plus valide, l'application revient à l'écran de connexion afin que vous puissiez vous reconnecter.

:::tip
Comme la borne se connecte automatiquement, vous n'avez besoin de saisir vos identifiants qu'une seule fois lors de la configuration initiale. Ensuite, il suffit d'allumer la tablette pour qu'elle soit prête à l'emploi.
:::

## Paramètres administrateur

Les paramètres administrateur sont volontairement masqués afin que les membres de l'église qui utilisent la borne ne puissent pas modifier la configuration par erreur. Pour y accéder :

1. Appuyez **sept fois** de suite, rapidement (en moins de deux secondes), sur le **logo de l'église** dans l'en-tête.
2. Si un code PIN de borne est défini, saisissez-le lorsque vous y êtes invité.
3. L'écran **Paramètres administrateur** s'ouvre avec les options suivantes :
   - **Changer de service** — modifier l'heure du service sélectionné
   - **Changer d'imprimante** — ouvrir les [paramètres de l'imprimante](./printer-setup.md) pour rechercher et sélectionner une imprimante
   - **Définir le code PIN administrateur** (ou **Modifier le code PIN administrateur** une fois défini) — définir ou mettre à jour le code PIN de la borne qui protège l'accès administrateur
   - **Diffusion d'urgence** — envoyer un SMS aux tuteurs de chaque foyer enregistré (voir [Diffusion d'urgence](../check-in/checking-out.md#emergency-broadcast))
   - **Mode poste tenu** — un interrupteur qui ajoute à ce poste le pointage de sortie, l'appel, la réimpression et la modification des profils (voir [Enregistrer la sortie](../check-in/checking-out.md))
   - **Déconnexion** — se déconnecter et revenir à l'écran de connexion

   Appuyez sur **Retour à la borne** pour revenir à l'enregistrement.

:::warning
La déconnexion efface tous les identifiants enregistrés ainsi que la sélection de l'église. Vous devrez ressaisir votre adresse e-mail et votre mot de passe pour utiliser de nouveau la borne. Ne vous déconnectez que lorsque vous devez changer de compte ou reconfigurer la borne.
:::

## Étapes suivantes

Une fois connecté, vous pouvez [configurer une imprimante](./printer-setup.md) ou passer directement au [flux d'enregistrement](../check-in/index.md).
