---
title: "Vue d'ensemble de B1 Admin"
---

# Vue d'ensemble de B1 Admin

<div class="article-intro">

B1 Admin est votre tableau de bord de gestion d'église. Il fournit des outils pour gérer tous les aspects des activités de votre église -- des répertoires de membres aux dons, de la création de site web à la diffusion en direct -- le tout depuis un seul endroit.

</div>

## Premiers pas

1. Ouvrez votre navigateur et rendez-vous sur [admin.b1.church](https://admin.b1.church)
2. Connectez-vous avec votre nom d'utilisateur et votre mot de passe
3. Vous arriverez sur le **Dashboard**, votre page d'accueil. Elle affiche l'ordre du culte de la semaine, les personnes enregistrées à l'arrivée et les bénévoles en service en temps réel, les éléments qui nécessitent votre attention (comme les approbations en attente ou les demandes d'adhésion), vos tâches en cours et vos groupes

:::tip
Vous découvrez B1 Admin ? Commencez par l'[Introduction](./introduction) pour une présentation vidéo, puis rendez-vous dans [Paramètres](./settings/) pour configurer les informations de votre église et inviter votre équipe.
:::

## Votre tableau de bord

Le Dashboard est la page d'accueil de B1 Admin (`/`). Il s'organise autour du culte hebdomadaire de votre église :

- **This week's service** -- le nom du plan en cours ou à venir et l'ordre du culte, avec un lien vers le plan complet
- **Live status** -- dès que les personnes commencent à s'enregistrer le dimanche, la page affiche le nombre de personnes présentes dans la salle, qui sert à cette heure, les visiteurs qui viennent pour la première fois, ainsi qu'une répartition par salle avec des barres de capacité
- **Needs Attention** -- les approbations en attente et les demandes d'adhésion aux groupes qui nécessitent une action
- **My tasks** et **My Groups** -- vos tâches en cours (ajoutez-en une avec **Add Task**, ou cliquez sur **All tasks** pour la liste complète) et les groupes auxquels vous appartenez

Ce qu'affiche le tableau de bord dépend de votre [rôle](./settings/roles-permissions.md). Par exemple, le lien vers le plan complet n'apparaît que si vous pouvez ouvrir ce plan (vous le modifiez, vous appartenez au ministère du plan ou vous y participez), et le lien **All groups** n'apparaît que si vous pouvez gérer les groupes, consulter les membres des groupes ou consulter les personnes.

:::tip
Chaque section, y compris Sermons, Calendars, Mobile et Settings, figure dans le [menu Jump](./introduction.md#getting-around-with-the-jump-menu) en haut à gauche de B1 Admin. Cliquez dessus ou appuyez sur **Ctrl+K** (ou **Cmd+K**), puis parcourez la liste ou commencez à taper.
:::

## Fonctionnalités principales

- **[People](./people/)** - Gérez le répertoire de votre église, ajoutez des membres, modifiez les données en masse et consultez la liste par foyer ou sous forme de tableau triable. Chaque personne dispose d'une fiche unique, avec ses informations à gauche et les résumés de présence, de dons, de groupes, de notes et de formulaires à côté. La page [Notes](./people/notes) répertorie les notes récentes concernant les personnes, les groupes, les événements et les cartes de flux de travail
- **[Groups](./groups/)** - Créez et organisez les groupes de votre église avec des demandes d'adhésion, la gestion des membres, les courriels de groupe, les messages texte personnalisés pour les groupes et les listes de contacts imprimables. Chaque groupe s'ouvre sur une page unique, avec ses actions à gauche et les résumés des membres, des sessions, du calendrier et de la santé du groupe à côté
- **[Attendance](./attendance/)** - Configurez les campus et les horaires de culte, suivez la présence nominative avec des feuilles d'appel imprimables pour les classes, consultez les classes qui attendent encore la saisie de leur présence, enregistrez des comptages simples avec des rapports de tendance, attribuez à chaque horaire de culte un calendrier d'enregistrement afin que l'enregistrement autonome s'ouvre et se ferme automatiquement, dans le fuseau horaire de chaque campus, et permettez aux visiteurs qui viennent pour la première fois de s'inscrire via un [code QR](./attendance/check-in#guest-registration-via-qr-code) avec les champs que vous choisissez
- **[Donations](./donations/)** - Enregistrez les dons en plusieurs devises, gérez les fonds, saisissez un don unique depuis la fiche d'une personne, imprimez les lots (un par un ou tous les lots d'une période) avec les sous-totaux par fonds, fermez les lots une fois comptés, importez un lot depuis un fichier CSV, permettez aux équipes de comptage de saisir les dons avec l'autorisation **Enter Donations**, et générez des relevés imprimés avec le logo de votre église
- **[Serving](./serving/)** - Coordonnez les bénévoles, créez des plans de culte (ou reprenez un plan chaque semaine pour jusqu'à 12 semaines), envoyez des rappels par notification push, courriel ou message texte, écrivez à tous les bénévoles planifiés avec **Text Volunteers**, gérez les tâches et faites progresser les personnes dans des flux de travail étape par étape pouvant envoyer des courriels et des messages texte, notifier un membre du personnel, enregistrer la présence et vérifier si les bénévoles ont confirmé leurs affectations
- **[Forms](./forms/)** - Créez des formulaires personnalisés pour les inscriptions et la collecte de données, ajoutez une photo d'en-tête, partagez les formulaires autonomes avec un code QR et liez un formulaire à un groupe afin que ses responsables puissent lire et imprimer les réponses
- **[Reports](./reports/)** - Consultez les rapports sur les anniversaires, la présence et les dons
- **[Website](./website/)** - Créez et gérez le site web de votre église avec des styles de navigation personnalisés, suivez les visites de votre site et de votre application B1 grâce à votre identifiant GA4, ou désactivez le site public pour ne conserver que le portail des membres
- **[Sermons](./sermons/)** - Gérez votre bibliothèque de sermons, la diffusion en direct et un flux de podcast automatique
- **[Calendars](./calendars/)** - Créez des calendriers sélectionnés, gérez les réservations de salles et de ressources, et consultez les disponibilités
- **[Settings](./settings/)** - Configurez tout depuis une seule page défilante avec une liste de navigation rapide : informations de l'église, région, format de la date et du numéro de téléphone, messages texte (y compris votre propre compte Twilio), rôles avec le nombre de membres, autorisations et champs personnalisés pour les personnes

:::info
Cliquez sur l'icône du point d'interrogation dans le coin supérieur droit de n'importe quelle page pour accéder rapidement à l'aide et à la documentation. Pour changer le thème de couleurs (**Default**, **Classic** ou **Custom**) ou passer du mode clair au mode sombre, ouvrez votre menu utilisateur et utilisez **Theme Preferences**.
:::

Pour obtenir de l'aide, écrivez à [support@churchapps.org](mailto:support@churchapps.org).
