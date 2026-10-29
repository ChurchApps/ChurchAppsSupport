---
title: "Se connecter"
---

# Se connecter

<div class="article-intro">

Avant de pouvoir utiliser la borne pour l'enregistrement, vous devez vous connecter avec un compte ChurchApps qui a accès à votre église. Cette page couvre la première connexion, la sélection de l'église, le comportement de connexion automatique et la façon de vous déconnecter.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Installez B1 Church Checkin sur votre tablette Android (consultez [Premiers pas](./index.md))
- Ayez à portée de main l'e-mail et le mot de passe de votre compte ChurchApps

</div>

## Première connexion

1. Ouvrez l'application B1 Church Checkin. Après l'écran de démarrage, vous verrez l'écran de connexion avec le logo de B1 Church Checkin.
2. Saisissez votre **adresse e-mail** dans le premier champ.
3. Saisissez votre **mot de passe** dans le deuxième champ.
4. Appuyez sur le bouton **Connexion**.

L'application valide vos identifiants et vous connecte. Si l'e-mail ou le mot de passe est incorrect, un message d'erreur apparaît au bas de l'écran.

Si le compte a la [connexion en deux étapes](../../b1-admin/profile/managing-profile.md#two-factor-sign-in) activée, l'application demande ensuite un code. Saisissez le code à 6 chiffres de l'application d'authentification du titulaire du compte, ou l'un de ses codes de secours, puis appuyez de nouveau sur **Connexion**. Vous n'avez besoin du code que pour cette première connexion ; ensuite, la borne reste connectée.

:::info
Il s'agit du même e-mail et du même mot de passe que ceux que vous utilisez pour B1 Admin ou tout autre produit ChurchApps. Vous n'avez pas besoin d'un compte distinct pour la borne d'enregistrement.
:::

## Choisir votre église

Après une connexion réussie, l'application charge la liste des églises associées à votre compte. Chaque église s'affiche sous forme de carte avec le nom et le logo de l'église (si l'un a été configuré dans B1 Admin).

- Si votre compte n'est associé qu'à **une seule église**, vous verrez tout de même l'écran de sélection. Appuyez sur votre église pour continuer.
- Si votre compte est associé à **plusieurs églises**, appuyez sur l'église que cette borne doit servir.

Une fois l'église sélectionnée, l'application charge son image de marque et ses paramètres d'apparence. Le logo de votre église apparaîtra dans l'en-tête de tous les écrans suivants.

## Connexion automatique lors des visites suivantes

Après la première connexion réussie, l'application conserve un jeton de connexion sécurisé et votre église sélectionnée sur la tablette. Elle ne conserve pas votre mot de passe. Aux lancements suivants :

- L'application vous reconnecte automatiquement avec le jeton enregistré.
- Si vous aviez déjà sélectionné une église, elle restaure ce choix et vous mène directement à l'**écran des services**.
- Si la connexion enregistrée n'est plus valide, l'application revient à l'écran de connexion afin que vous puissiez vous reconnecter.

:::tip
Comme la borne se connecte automatiquement, vous n'avez besoin de saisir vos identifiants qu'une seule fois lors de la configuration initiale. Ensuite, il suffit d'allumer la tablette pour qu'elle soit prête.
:::

## Paramètres d'administration

Les paramètres d'administration sont volontairement masqués afin que les membres de l'église qui utilisent la borne ne puissent pas modifier la configuration par inadvertance. Pour y accéder :

1. Appuyez **sept fois** rapidement (en moins de deux secondes) sur le **logo de l'église** dans l'en-tête.
2. Si un NIP de borne est défini, saisissez-le lorsque vous y êtes invité.
3. L'écran **Paramètres d'administration** s'ouvre avec les options suivantes :
   - **Changer de service** — changer l'horaire de service sélectionné
   - **Changer d'imprimante** — ouvrir les [paramètres d'imprimante](./printer-setup) pour rechercher et sélectionner une imprimante
   - **Définir ou changer le NIP** — définir ou mettre à jour le NIP de la borne qui protège l'accès administrateur
   - **Déconnexion** — se déconnecter et revenir à l'écran de connexion

:::warning
La déconnexion efface toutes les identifiants enregistrés et la sélection d'église. Vous devrez ressaisir votre e-mail et votre mot de passe pour utiliser la borne à nouveau. Déconnectez-vous seulement lorsque vous devez changer de compte ou reconfigurer la borne.
:::

## Étapes suivantes

Une fois connecté, vous pouvez [configurer une imprimante](./printer-setup) ou aller directement au [flux d'enregistrement](../check-in/).
