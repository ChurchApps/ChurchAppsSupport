---
title: "Paramètres de l'application mobile"
description: "Configurez les onglets de navigation, les vignettes de l'écran d'accueil, l'invite de connexion et les paramètres de confidentialité de l'annuaire des membres pour l'application membre B1.church dans B1 Admin."
---

# Paramètres de l'application mobile

<div class="article-intro">

La page Paramètres de l'application mobile vous permet de configurer les onglets de navigation qui apparaissent dans l'**expérience mobile B1.church (PWA)** pour les membres de votre église. Vous contrôlez quels onglets sont visibles, vers quoi ils mènent et leur mode d'affichage.

</div>

## Vidéo de formation

<YouTube id="ydY7WGK16fE" title="Personnaliser l'application membre de votre église dans B1" />

:::info
Les onglets configurés ici apparaissent dans l'application B1, que les membres peuvent [installer en tant qu'application web progressive (PWA)](../../b1-church/getting-started/installing-pwa.md). Partagez la page d'installation de votre église — `https://yourchurchname.b1.church/mobile/install` — avec les membres ; elle les guide pas à pas dans l'installation de l'application sur leur appareil, sans téléchargement depuis l'App Store ou Google Play.
:::

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation « Modifier les paramètres de l'église ». Consultez [Rôles et autorisations](./roles-permissions.md) si vous n'y avez pas accès.
- Configurez d'abord vos [Paramètres de l'église](./church-settings.md), y compris le nom de votre église et son image de marque

</div>

## Accéder aux paramètres de navigation

1. Dans B1 Admin, ouvrez le [menu Accès rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche) et développez **Mobile**.
2. Cliquez sur **Navigation** (`/mobile/navigation`).
3. La page Navigation affiche les onglets actuels de votre application.

## Ajouter un nouvel onglet

1. Cliquez sur le bouton **Ajouter un onglet** en haut de la page.
2. Renseignez les détails de l'onglet :
   - **Nom** -- Le libellé qui apparaît sur l'onglet (par exemple « Sermons » ou « Dons »).
   - **Icône** -- Cliquez sur le sélecteur d'icônes pour choisir une icône pour votre onglet.
   - **Image** -- Cliquez sur **Sélectionner une image** (ou **Changer l'image**) pour attribuer une photo à l'onglet. Les onglets avec une photo apparaissent sous forme de vignettes photo sur l'écran d'accueil de l'application -- voir [Vignettes de l'écran d'accueil](#home-screen-tiles).
   - **Type d'onglet** -- Choisissez parmi des options telles que Bible, Diffusion en direct, Don, Site web, et d'autres.
   - **URL** -- Saisissez l'adresse web vers laquelle l'onglet doit renvoyer.
   - **Visibilité** -- Définissez qui peut voir cet onglet (tout le monde, membres uniquement, etc.). Pour un onglet **Annuaire des membres**, cela ne contrôle que qui voit l'onglet lui-même ; qui peut ouvrir l'annuaire se règle avec **Afficher dans l'annuaire** sur la page Portail membre (voir [Paramètres de l'annuaire des membres et de la messagerie](#member-directory--messaging-settings)).
3. Cliquez sur **Enregistrer l'onglet** pour l'ajouter à votre application.

## Modifier un onglet existant

1. Cliquez sur n'importe quel onglet existant dans la liste **Onglets de l'application**.
2. Mettez à jour le nom, l'icône, l'URL, le type ou les paramètres de visibilité de l'onglet.
3. Cliquez sur **Enregistrer l'onglet** pour appliquer vos modifications.

## Réorganiser les onglets

Vous pouvez modifier l'ordre d'affichage des onglets dans l'application mobile. Faites glisser et déposer les onglets dans la liste pour les réorganiser. L'ordre affiché sur cette page correspond à l'ordre que verront vos membres dans l'application.

:::info
Certains onglets peuvent apparaître automatiquement lorsque certaines conditions sont remplies -- par exemple, un onglet Diffusion en direct peut s'afficher lorsqu'un flux est actif. Les onglets ajoutés manuellement vous donnent un contrôle total sur ce que voient vos membres à tout moment.
:::

:::tip
Limitez le nombre d'onglets. Entre trois et cinq onglets conviennent à la plupart des églises. Trop d'onglets peuvent rendre la navigation déroutante pour vos membres.
:::

## Paramètres de l'annuaire des membres et de la messagerie

L'élément **Portail membre**, dans la même section Mobile, regroupe les paramètres qui régissent l'annuaire des membres et la messagerie privée dans l'expérience B1.church :

- **Groupe d'approbation de l'annuaire** -- Le groupe qui examine les mises à jour de l'annuaire des membres ainsi que les [demandes de suppression de compte](../profile/account-deletion.md) avant qu'elles ne prennent effet.
- **Afficher dans l'annuaire** -- Qui peut ouvrir l'annuaire des membres et qui y figure : **Administrateurs uniquement**, **Membres et au-dessus** (valeur par défaut), **Participants réguliers et au-dessus**, ou **Visiteurs et au-dessus**. Les personnes dont le statut de membre est inférieur au niveau choisi ne voient pas l'annuaire et n'y figurent pas. **Administrateurs uniquement** ferme l'annuaire à toute personne autre que le personnel disposant de l'autorisation Personnes > Voir (un statut de membre Personnel ne suffit pas), qui peut toujours ouvrir l'annuaire et voir tout le monde, quel que soit ce réglage. Les invités ne sont jamais inclus, car toute personne qui s'inscrit en ligne par elle-même commence en tant qu'invité.
- **Préférence de visibilité** -- Définit la valeur par défaut à l'échelle de l'église pour les membres qui n'ont pas encore choisi leur propre paramètre. **Adresse**, **Numéro de téléphone** et **Courriel** disposent chacun de leur propre liste déroulante, avec les mêmes cinq niveaux disponibles partout où la visibilité est configurée :
  - **Tout le monde** -- visible par n'importe qui, y compris les visiteurs anonymes
  - **Membres** -- visible uniquement par les personnes ayant une fiche Membre ou Personnel
  - **Groupes uniquement** -- visible uniquement par les personnes partageant un groupe avec cette personne, ainsi que le personnel
  - **Mes responsables de groupe et le personnel** -- visible uniquement par les responsables d'un groupe auquel cette personne appartient, ainsi que le personnel
  - **Personnel uniquement** -- visible uniquement par le personnel (toute personne dont le statut de membre est Personnel, ou qui dispose de l'autorisation Personnes > Voir), ainsi que par la personne elle-même

  Le « personnel » dans ces niveaux désigne toute personne dont le statut de membre est Personnel ou qui dispose de l'autorisation Personnes > Voir. Les changements de groupe prennent effet immédiatement : une personne qui rejoint un groupe, ou qui est nommée responsable de groupe, peut voir les coordonnées **Groupes uniquement** ou **Mes responsables de groupe et le personnel** des membres de ce groupe, sans avoir à se déconnecter puis se reconnecter.

  Les membres peuvent remplacer ces valeurs par défaut pour leur propre fiche depuis l'onglet **Confidentialité** de leur profil dans la PWA B1.church -- voir [Modifier votre profil](/docs/b1-church/getting-started/me-page).
- **Âge minimum pour les messages privés** -- Une mesure de protection des enfants. B1 n'ouvrira **pas** de **nouvelle** conversation par messages privés si l'une des deux personnes est âgée de moins que cet âge, selon sa date de naissance (le rôle au sein du foyer sert de solution de repli lorsqu'aucune date de naissance n'est enregistrée). Les personnes mineures restent entièrement visibles dans l'annuaire -- seule la messagerie directe est bloquée, **dans les deux sens**, pour tout le monde, y compris le personnel. Les conversations de groupe et la messagerie avec les parents d'un enfant continuent de fonctionner. Les options sont Désactivé, 13, 16 ou 18 ; la valeur par défaut est **18**. Les conversations existantes ne sont pas affectées.

:::tip
La vérification de l'âge minimum reposant sur les dates de naissance, assurez-vous que les dates de naissance sont renseignées pour les enfants de votre communauté. Ce paramètre fait partie de la même famille de mesures de protection des enfants que les [contrôles de sécurité de l'enregistrement](../attendance/checkin-safety.md).
:::

### Invite de connexion sur l'écran d'accueil

Les visiteurs qui ouvrent l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sans se connecter voient une courte invite -- par défaut, *« Connectez-vous pour voir vos groupes, vos dons et plus encore. »* -- à côté d'un bouton **Se connecter**. Les paramètres **Invite de connexion sur l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), vous permettent de la modifier :

- **Afficher l'invite de connexion sur l'écran d'accueil de l'application** -- Désactivez cette option pour masquer à la fois l'invite et le bouton **Se connecter** de l'écran d'accueil. Les visiteurs peuvent toujours se connecter depuis le menu de l'application.
- **Texte de l'invite de connexion** -- Remplacez le texte par défaut par votre propre message (150 caractères maximum). Laissez ce champ vide pour utiliser le texte par défaut. Cette zone est désactivée lorsque l'invite est masquée.

Cliquez sur **Enregistrer** pour appliquer. Un message **Enregistré** confirme la modification. L'enregistrement actualise les paramètres mis en cache de l'application, de sorte que le changement apparaît la prochaine fois que l'écran d'accueil se charge.

### Vignettes de l'écran d'accueil

Les onglets pourvus d'une photo (voir **Image** sous [Ajouter un nouvel onglet](#adding-a-new-tab)) apparaissent sur l'[écran d'accueil](/docs/b1-church/getting-started/navigating#home) de l'application sous forme de vignettes photo, dans une section portant le nom de votre église. Cela inclut un onglet Verset du jour, si vous lui attribuez une photo. Les onglets avec photo apparaissent aussi dans la barre d'onglets.

Le paramètre **Vignettes de l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), contrôle la mise en page de ces vignettes. Choisissez une **Disposition** :

- **Grille** -- Deux vignettes par ligne (valeur par défaut). Lorsque le nombre de vignettes est impair, la première occupe toute la largeur.
- **Ligne défilante** -- Une seule ligne de vignettes que les membres font défiler latéralement.
- **Défilement (automatique)** -- La même ligne défilante latérale, mais qui se déplace également seule, en avançant d'une vignette environ toutes les quatre secondes et en revenant à la première vignette après la dernière. Le défilement se met en pause lorsqu'un membre touche, survole ou parcourt la ligne au clavier, puis reprend quelques secondes plus tard. Sur les appareils configurés pour réduire les animations, la ligne reste immobile et fonctionne comme **Ligne défilante**.
- **Liste** -- Une liste avec une petite miniature photo à côté du nom de chaque onglet.

Dans les deux dispositions défilantes, lorsqu'il y a plus de vignettes qu'il n'en tient à l'écran, une rangée de points apparaît sous les vignettes, un point par vignette, le point de la vignette actuelle étant plein. Les membres peuvent appuyer sur un point pour accéder directement à la vignette correspondante.

Cliquez sur **Enregistrer** pour appliquer.

### Sections de l'écran d'accueil

Les membres connectés voient toujours leur historique de présence et les formulaires qu'ils ont soumis sur la [page Moi](/docs/b1-church/getting-started/me-page). Les commutateurs **Sections de l'écran d'accueil**, sur la même page Portail membre (`/mobile/b1-mobile`), permettent de les afficher également sur l'écran d'accueil :

- **Afficher Ma présence sur l'accueil** -- Ajoute une section **Ma présence** indiquant le nombre de fois où le membre a participé au cours des 90 derniers jours, ses deux visites les plus récentes, et un lien **Historique** vers sa liste complète de présences.
- **Afficher Mes formulaires sur l'accueil** -- Ajoute une section **Mes formulaires** avec les deux soumissions de formulaires les plus récentes du membre et un lien **Tous les formulaires**.

Ces deux options sont désactivées par défaut. Une section n'apparaît que pour les membres connectés qui ont au moins un élément à afficher. Cliquez sur **Enregistrer** pour appliquer.

## Où apparaissent ces onglets

Les onglets que vous configurez ici sont affichés dans la **PWA B1.church** que vos membres installent depuis n'importe quelle page de `https://yourchurchname.b1.church`. Les modifications effectuées sur cette page sont prises en compte la prochaine fois qu'un membre ouvre l'application.

Sur un téléphone, la barre d'onglets inférieure affiche **Accueil**, jusqu'à trois de vos onglets, et **Plus** ; sur un ordinateur, l'en-tête affiche jusqu'à cinq onglets. Les écrans intégrés (comme Sermons, Dons ou Groupes) occupent d'abord leurs emplacements, et les onglets **Page interne** remplissent les emplacements restants. Les onglets **URL externe** et **Verset du jour** n'occupent jamais d'emplacement. Tous les onglets, y compris ceux qui ne tiennent pas dans la barre, sont listés sur la page **Plus** de l'application.

Les onglets placés dans un onglet **Dossier** font exception : ils n'apparaissent que sur l'écran propre au dossier, que les membres ouvrent en appuyant sur le dossier. Cet écran affiche les onglets sous forme de vignettes photo lorsque chacun d'eux possède une image, ou sous forme de liste dans le cas contraire. Un dossier qui ne contient aucun onglet visible par un membre lui est masqué. Voir [Onglets de dossier](../../b1-church/getting-started/navigating.md#folder-tabs). Consultez [Navigation dans B1App](../../b1-church/getting-started/navigating.md) pour savoir ce que voient les membres.

## Étapes suivantes

- [Paramètres de l'église](./church-settings.md) -- Configurer les informations et l'image de marque de votre église
- [Rôles et autorisations](./roles-permissions.md) -- Gérer l'accès de votre équipe
