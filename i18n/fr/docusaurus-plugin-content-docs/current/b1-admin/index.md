---
title: "Vue d'ensemble de B1 Admin"
---

# Vue d'ensemble de B1 Admin

<div class="article-intro">

B1 Admin est le tableau de bord de gestion de votre église. Il fournit les outils pour gérer tous les aspects des opérations de votre église -- des répertoires de membres et des dons à la création de sites web et à la diffusion en direct -- le tout au même endroit.

</div>

## Premiers pas

1. Ouvrez votre navigateur et rendez-vous à [admin.b1.church](https://admin.b1.church)
2. Connectez-vous avec votre nom d'utilisateur et votre mot de passe
3. Vous arriverez sur le **Tableau de bord**, votre page d'accueil. Il affiche l'ordre du service de cette semaine, qui est présent et qui sert en temps réel, ce qui requiert votre attention (comme les approbations en attente ou les demandes d'adhésion), vos tâches ouvertes et vos groupes

:::tip
Vous découvrez B1 Admin ? Commencez par l'[Introduction](./introduction) pour une visite vidéo, puis rendez-vous dans [Paramètres](./settings/) pour configurer les renseignements de votre église et inviter votre équipe.
:::

## Votre tableau de bord

Le Tableau de bord est la page d'accueil de B1 Admin (`/`). Il est conçu autour du service hebdomadaire de votre église :

- **Le service de cette semaine** -- le nom et l'ordre du service du plan actuel ou à venir, avec un lien vers le plan complet
- **État en direct** -- une fois que les gens commencent à s'enregistrer le dimanche, la page affiche combien de personnes sont dans la salle, qui sert à cette heure, les visiteurs de première fois, et une répartition salle par salle avec des barres de capacité
- **Requiert votre attention** -- les approbations en attente et les demandes d'adhésion aux groupes qui exigent une action
- **Mes tâches** et **Mes groupes** -- vos tâches ouvertes (ajoutez-en une avec **Ajouter une tâche**, ou cliquez sur **Toutes les tâches** pour la liste complète) et les groupes dont vous faites partie

Ce que le tableau de bord affiche dépend de votre [rôle](./settings/roles-permissions.md). Par exemple, le lien vers le plan complet n'apparaît que si vous pouvez ouvrir ce plan (vous modifiez les plans, vous faites partie du ministère du plan ou vous y servez), et le lien **Tous les groupes** n'apparaît que si vous pouvez gérer les groupes, voir les membres des groupes ou voir les personnes.

:::tip
Chaque section, y compris Sermons, Calendriers, Mobile et Paramètres, se trouve dans le [menu Accès rapide](./introduction.md#getting-around-with-the-jump-menu) en haut à gauche de B1 Admin. Cliquez dessus ou appuyez sur **Ctrl+K** (ou **Cmd+K**), puis parcourez la liste ou commencez à taper.
:::

## Fonctionnalités principales

- **[Personnes](./people/)** - Gérez le répertoire de votre église, ajoutez des membres, modifiez les données en lot, et parcourez-les par foyer ou sous forme de tableau triable. Chaque personne s'ouvre sur une seule fiche, avec ses détails à gauche et les résumés de présence, de dons, de groupes, de notes et de formulaires à côté. Trouvez les personnes ajoutées récemment grâce à la recherche **Date d'ajout**. La page [Notes](./people/notes) répertorie les notes récentes concernant les personnes, les groupes, les événements et les cartes de flux de travail
- **[Groupes](./groups/)** - Créez et organisez les groupes de l'église avec des demandes d'adhésion, la gestion des membres, l'e-mail de groupe, des textos personnalisés avec des modèles de texto réutilisables et un champ Nom du groupe, ainsi que des listes de contacts imprimables. Chaque groupe s'ouvre sur une page unique, avec ses actions à gauche et les résumés des membres, des séances, du calendrier et de la santé à côté
- **[Présence](./attendance/)** - Configurez les campus et les horaires de services, suivez la présence nominative avec des feuilles d'appel imprimables, voyez quelles classes ont encore besoin que leur présence soit saisie, enregistrez des décomptes simples avec des rapports de tendance, donnez à chaque horaire de service un calendrier d'enregistrement pour que l'enregistrement autonome s'ouvre et se ferme seul, dans le fuseau horaire de chaque campus, et permettez aux visiteurs de première fois de s'inscrire depuis un [code QR](./attendance/check-in#guest-registration-via-qr-code) avec les champs que vous choisissez
- **[Dons](./donations/)** - Enregistrez les dons dans plusieurs devises, gérez les fonds, consignez un seul don depuis la fiche d'une personne, imprimez les lots (un à la fois ou tous les lots d'une plage de dates) sur l'en-tête de votre église avec les sous-totaux par fonds, fermez les lots une fois comptés, importez un lot depuis un fichier CSV, permettez aux équipes de comptage de saisir les dons avec l'autorisation **Saisir les dons**, et générez des relevés imprimés avec le logo de votre église
- **[Service](./serving/)** - Coordonnez les bénévoles, créez des plans de service (ou copiez-en un chaque semaine pour un maximum de 12 semaines), envoyez des rappels par notification push, e-mail ou texto, envoyez un texto à tous les personnes planifiées avec **Textos aux bénévoles**, gérez les tâches et faites progresser les personnes dans des flux de travail étape par étape qui peuvent envoyer des e-mails et des textos, notifier un membre du personnel, enregistrer la présence et suivre si les bénévoles ont confirmé leurs affectations. Les règles de flux de travail planifiées peuvent repérer les donateurs réguliers qui ont cessé de donner, et les plans imprimés omettent les colonnes vides
- **[Formulaires](./forms/)** - Créez des formulaires personnalisés pour les inscriptions et la collecte de données, ajoutez une photo d'en-tête, partagez des formulaires autonomes avec un code QR, et liez un formulaire à un groupe pour que ses responsables puissent lire et imprimer les réponses
- **[Rapports](./reports/)** - Consultez les rapports d'anniversaires, de présence et de dons
- **[Site web](./website/)** - Créez et gérez le site web de votre église avec des styles de navigation personnalisés, suivez les visites de votre site et de votre application B1 avec votre identifiant GA4, ou désactivez le site public et ne conservez que le portail membre
- **[Sermons](./sermons/)** - Gérez votre bibliothèque de sermons, la diffusion en direct et un flux de balados automatique
- **[Calendriers](./calendars/)** - Créez des calendriers organisés, gérez les réservations de salles et de ressources, et consultez les disponibilités
- **[Paramètres](./settings/)** - Configurez tout depuis une seule page défilante avec une liste de navigation rapide : renseignements de l'église, région, format de date et de numéro de téléphone, messagerie texte (y compris votre propre compte Twilio), rôles avec le nombre de membres, autorisations et champs personnalisés des personnes

:::info
Cliquez sur l'icône du point d'interrogation dans le coin supérieur droit de n'importe quelle page pour accéder rapidement à l'aide et à la documentation. Pour changer le thème de couleurs (**Par défaut**, **Classique** ou **Personnalisé**) ou passer du mode clair au mode sombre, ouvrez votre menu d'utilisateur et utilisez **Préférences de thème**. Pour protéger votre compte avec un code d'une application d'authentification, activez la [Connexion en deux étapes](./profile/managing-profile#two-factor-sign-in) sur votre profil.
:::

Pour obtenir de l'aide, écrivez à [support@churchapps.org](mailto:support@churchapps.org).
