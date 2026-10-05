---
title: "Navigation B1App"
---

# Navigation B1App

<div class="article-intro">

Le portail des membres en B1.church est une application web orientée téléphone qui vit sous `/mobile`. Elle fonctionne dans n'importe quel navigateur et peut être installée sur votre écran d'accueil. Cette page explique le tableau de bord Accueil, la barre d'onglets inférieure, le menu Plus et la page À propos de moi.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être [connecté](./logging-in.md) pour voir vos informations personnelles. Les visiteurs déconnectés peuvent toujours consulter le contenu public et se voient proposer un bouton **Se connecter** lorsqu'une fonction nécessite un compte.

</div>

## Accueil

Ouverture de `https://yourchurchname.b1.church/mobile` vous amène au tableau de bord **Accueil** à `/mobile/dashboard`. Accueil est la page d'accueil du portail des membres et affiche :

- Un accueil avec votre nom
- Le verset du jour
- Une carte présentée pour tout ce que votre église a mis en évidence
- Une grille **Explorer** des outils que votre église a activés -- groupes, dons, enregistrement, sermons, plans, et plus

En appuyant sur une carte d'Exploration, vous ouvrez cet outil. Si votre église a plus d'outils que ce qui tient sur le tableau de bord, la dernière carte est **Plus**, qui ouvre la liste complète sur `/mobile/more`.

Si vous êtes déconnecté, Accueil affiche un en-tête **Bienvenue** à la place de l'accueil, avec une courte invite (« Connectez-vous pour voir vos groupes, dons, et plus ») et un bouton **Se connecter**. Votre église peut reformuler cette invite ou la masquer -- voir [Paramètres de l'application mobile](../../b1-admin/settings/mobile-app.md#home-screen-sign-in-prompt). Lorsqu'elle est masquée, vous pouvez toujours vous connecter à partir du menu ou de l'onglet À propos de moi.

## La barre d'onglets inférieure

Sur un téléphone, une barre d'onglets est fixée au bas de l'écran :

- **Accueil** -- toujours le premier onglet
- Jusqu'à trois des onglets que votre église a configurés
- **Plus** -- ouvre le menu de navigation

Si votre église a configuré plus de trois onglets, le reste n'est pas perdu : ils apparaissent dans le menu **Plus** et sur la grille Explore du tableau de bord. Les administrateurs d'église définissent l'ordre des onglets dans B1 Admin sous **Mobile → Navigation**.

## Le menu

En appuyant sur **Plus**, vous ouvrez le menu de navigation. Sur une tablette ou un ordinateur de bureau, le même menu est toujours visible le long du côté gauche de l'écran. Il contient :

- Votre nom et votre photo, avec un raccourci **Modifier le profil** -- voir [Modification de votre profil](./editing-your-profile.md)
- **Accueil** et **À propos de moi**
- **Portail administrateur** -- s'affiche uniquement si vous avez des autorisations d'administrateur à votre église ; il ouvre B1 Admin
- Chaque onglet que votre église a configuré, dans l'ordre
- **Installer l'application** -- ouvre les [instructions d'installation](./installing-pwa.md) sur `/mobile/install`
- Un bouton bascule mode clair/foncé
- **Se connecter** ou **Déconnexion**
- Le nom de votre église et un lien vers la politique de confidentialité

## La barre d'application

La barre en haut de chaque écran affiche :

- Le titre de l'écran ou le nom de votre église sur Accueil
- Une flèche retour lorsque vous avez accédé à un écran de détails
- Une icône **cloche** pour les notifications et les messages, avec un badge pour les éléments non lus
- Votre **photo de profil**, qui ouvre votre profil sur `/mobile/profileEdit` -- voir [Modification de votre profil](./editing-your-profile.md)

## La page À propos de moi

**À propos de moi** (`/mobile/me`) est votre hub personnel. Elle répertorie les raccourcis vers votre profil, les [préférences de notification](./notification-preferences.md), les messages, les [dons](../giving/), et les [inscriptions](../events/my-registrations.md), suivi de ce qui vous attend -- affectations de service, inscriptions à des événements et événements de groupe -- et vos notifications les plus récentes. Consultez [La page À propos de moi](./me-page) pour plus de détails.

Si vous êtes déconnecté, la page À propos de moi affiche un bouton **Se connecter** à la place.

## Installation sur votre écran d'accueil

Le portail des membres est une Progressive Web App. Visitez `/mobile/install` (ou choisissez **Installer l'application** dans le menu) pour obtenir des instructions étape par étape pour votre appareil. Une fois installé, il s'ouvre en plein écran à partir de votre écran d'accueil sans chrome du navigateur. Consultez [Installation en tant qu'application (PWA)](./installing-pwa.md).

## Site web public de votre église

En dehors du portail des membres, le site web public de votre église a sa propre navigation d'en-tête avec les liens que vos administrateurs ont configurés -- des pages comme [sermons](../content/sermons.md), la [Bible](../content/bible.md), la [diffusion en direct](../content/live-streaming.md), et une liste de groupes publique. Sur un téléphone, ces liens vivent derrière l'icône de menu hamburger dans le coin supérieur droit de l'en-tête.

:::info
Les onglets et outils que vous voyez varient selon l'église. Les administrateurs contrôlent quelles sections sont visibles pour les membres via B1 Admin, donc si vous ne voyez pas une fonction décrite ici, votre église n'a peut-être pas l'activé.
:::
