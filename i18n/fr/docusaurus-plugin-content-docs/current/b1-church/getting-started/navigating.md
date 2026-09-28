---
title: "Naviguer dans B1App"
---

# Naviguer dans B1App

<div class="article-intro">

Le portail des membres dans B1.church est une application web optimisée pour téléphone qui se trouve sous `/mobile`. Elle fonctionne dans n'importe quel navigateur et peut être installée sur votre écran d'accueil. Cette page explique le tableau de bord Accueil, la barre d'onglets inférieure, le menu Plus et la page Me.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](./logging-in.md) pour voir vos informations personnelles. Les visiteurs déconnectés peuvent toujours parcourir le contenu public et se voient proposer un bouton **Se connecter** où une fonctionnalité nécessite un compte.

</div>

## Accueil

L'ouverture de `https://yourchurchname.b1.church/mobile` vous amène au tableau de bord **Accueil** à `/mobile/dashboard`. L'accueil est la page d'accueil du portail des membres et affiche :

- Un message d'accueil avec votre nom
- Le verset du jour
- Une carte en vedette pour ce que votre église a mis en évidence
- Une grille **Explorer** des outils que votre église a activés -- groupes, dons, enregistrement, sermons, plans, et plus

Appuyer sur une carte dans Explorer ouvre cet outil. Si votre église a plus d'outils que ce qui tient sur le tableau de bord, la dernière carte est **Plus**, qui ouvre la liste complète à `/mobile/more`.

## La barre d'onglets inférieure

Sur un téléphone, une barre d'onglets est fixée en bas de l'écran :

- **Accueil** -- toujours le premier onglet
- Jusqu'à trois des onglets que votre église a configurés
- **Plus** -- ouvre le menu de navigation

Si votre église a configuré plus de trois onglets, les autres ne sont pas perdus : ils apparaissent dans le menu **Plus** et sur la grille Explorer du tableau de bord. Les administrateurs d'église définissent l'ordre des onglets dans B1 Admin sous **Mobile → Navigation**.

## Le menu

Appuyer sur **Plus** ouvre le menu de navigation. Sur une tablette ou un ordinateur, le même menu est toujours visible le long du côté gauche de l'écran. Il contient :

- Votre nom et photo, avec un raccourci **Modifier le profil** -- voir [Modification de votre profil](./editing-your-profile.md)
- **Accueil** et **Me**
- **Portail d'administration** -- affiché uniquement si vous avez les permissions d'administrateur à votre église ; il ouvre B1 Admin
- Chaque onglet que votre église a configuré, dans l'ordre
- **Installer l'application** -- ouvre les [instructions d'installation](./installing-pwa.md) à `/mobile/install`
- Un bouton bascule de mode clair/sombre
- **Se connecter** ou **Se déconnecter**
- Le nom de votre église et un lien vers la politique de confidentialité

## La barre d'application

La barre en haut de chaque écran affiche :

- Le titre de l'écran, ou le nom de votre église sur Accueil
- Une flèche arrière lorsque vous avez descendu dans un écran de détail
- Une icône **cloche** pour les notifications et les messages, avec un badge pour les éléments non lus
- Votre **photo de profil**, qui ouvre votre profil à `/mobile/profileEdit` -- voir [Modification de votre profil](./editing-your-profile.md)

## La page Me

**Me** (`/mobile/me`) est votre centre personnel. Il énumère les raccourcis vers votre profil, [préférences de notification](./notification-preferences.md), messages, [dons](../giving/), et [inscriptions](../events/my-registrations.md), suivis de ce qui vous attend -- assignments de service, inscriptions aux événements et événements de groupe -- et vos notifications les plus récentes. Voir [La page Me](./me-page) pour plus de détails.

Si vous êtes déconnecté, la page Me affiche à la place un bouton **Se connecter**.

## Installer sur votre écran d'accueil

Le portail des membres est une Progressive Web App. Visitez `/mobile/install` (ou choisissez **Installer l'application** dans le menu) pour obtenir des instructions étape par étape pour votre appareil. Une fois installée, elle s'ouvre en plein écran depuis votre écran d'accueil sans l'interface du navigateur. Voir [Installation en tant qu'application (PWA)](./installing-pwa.md).

## Le site Web public de votre église

En dehors du portail des membres, le site Web public de votre église a sa propre navigation d'en-tête avec des liens que vos administrateurs ont configurés -- des pages comme [sermons](../content/sermons.md), la [Bible](../content/bible.md), [diffusion en direct](../content/live-streaming.md), et une liste de groupes publique. Sur un téléphone, ces liens se trouvent derrière l'icône du menu hamburger dans le coin supérieur droit de l'en-tête.

:::info
Les onglets et les outils que vous voyez varient selon l'église. Les administrateurs contrôlent les sections visibles pour les membres via B1 Admin, donc si vous ne voyez pas une fonctionnalité décrite ici, votre église peut ne pas l'avoir activée.
:::
