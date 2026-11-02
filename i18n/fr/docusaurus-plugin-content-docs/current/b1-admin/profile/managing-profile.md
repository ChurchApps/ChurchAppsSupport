---
title: "Gérer votre profil"
---

# Gérer votre profil

<div class="article-intro">

La page Profil vous permet de modifier les paramètres de votre compte personnel. Votre profil est partagé par tous les produits ChurchApps, donc toute modification faite ici sera reflétée partout où vous utilisez ChurchApps.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez être connecté à votre compte ChurchApps
- Ayez à portée de main votre nouvelle adresse courriel ou votre nouveau mot de passe si vous prévoyez de les modifier

</div>

## Renseignements du profil

La page Profil affiche votre nom et votre adresse courriel à gauche, avec un bouton **Modifier** en dessous. Cliquez sur **Modifier** pour ouvrir le formulaire **Modifier le compte**, qui contient les détails de base de votre compte :

1. **Courriel** -- Votre adresse courriel, utilisée pour vous connecter et recevoir les notifications.
2. **Prénom** et **Nom** -- Votre nom d'affichage dans ChurchApps.
3. **Mot de passe** -- Mettez à jour le mot de passe de votre compte.

Pour mettre à jour vos renseignements, modifiez les champs puis cliquez sur le bouton **Enregistrer les modifications**. Cliquez sur **Annuler** (ou sur le lien **Retour à** avec votre nom) pour revenir à votre profil sans enregistrer.

## Changer votre mot de passe

1. Sur la page Profil, cliquez sur **Modifier**.
2. Saisissez votre **mot de passe actuel**.
3. Saisissez votre nouveau mot de passe dans le champ **Nouveau mot de passe**.
4. Ressaisissez-le dans le champ **Vérifier le mot de passe**.
5. Cliquez sur **Enregistrer les modifications**.

:::info
Votre mot de passe doit comporter au moins 8 caractères. Assurez-vous que les champs du mot de passe et de la confirmation correspondent exactement. Vous devez confirmer votre mot de passe actuel pour le changer -- si vous ne le connaissez plus, utilisez plutôt le lien **Mot de passe oublié** sur la page de connexion.
:::

## Comptes liés

La section **Comptes liés** affiche les services externes connectés à votre compte ChurchApps. Vous pouvez voir quels comptes sont liés et gérer ces connexions depuis cette section.

## Connexion à deux facteurs {#two-factor-sign-in}

La connexion à deux facteurs ajoute une deuxième étape à la connexion : après votre mot de passe (ou la connexion par Google, Microsoft ou lien courriel), vous saisissez aussi un code à 6 chiffres provenant d'une application d'authentification sur votre téléphone, comme Google Authenticator, Microsoft Authenticator, 1Password ou Authy. Elle est facultative et désactivée par défaut. Une fois activée, elle s'applique à toutes les connexions ChurchApps qui utilisent votre compte -- B1 Admin, le site et l'application B1.church de votre église, B1 Church Checkin, Lessons.church, FreePlay et les autres.

### L'activer

1. Sur la page Profil, repérez la section **Connexion à deux facteurs** et cliquez sur **Activer**.
2. Scannez le code QR avec votre application d'authentification. Si vous ne pouvez pas le scanner, saisissez plutôt dans l'application la clé affichée sous **Impossible de scanner ? Saisissez cette clé :**.
3. Saisissez le **code à 6 chiffres** affiché par votre application et cliquez sur **Vérifier**.
4. B1 Admin affiche dix **codes de secours**. Chacun vous permet de vous connecter une fois si vous perdez votre téléphone. Cliquez sur **Copier** ou notez-les, conservez-les en lieu sûr, puis cliquez sur **Je les ai enregistrés**.

:::warning
Les codes de secours ne sont affichés qu'une seule fois. Si vous perdez votre téléphone et n'avez plus de codes de secours, un administrateur de serveur ChurchApps devra désactiver la connexion à deux facteurs pour vous, après avoir confirmé votre identité.
:::

Lorsque la connexion à deux facteurs est activée, la section affiche **Activée** et indique combien de codes de secours il vous reste.

### Se connecter avec un code

Après avoir saisi votre mot de passe, l'écran de connexion demande un code. Saisissez le code à 6 chiffres de votre application d'authentification, ou l'un de vos codes de secours, puis soumettez-le. Chaque code de secours ne fonctionne qu'une fois. Si le code est erroné, vous verrez le message « Ce code n'a pas fonctionné. Veuillez réessayer. » Après trop de codes erronés, les connexions à votre compte sont suspendues pendant un certain temps.

Rester connecté sur un appareil où vous vous êtes déjà connecté ne demande pas de nouveau code ; celui-ci n'apparaît que lorsque vous vous connectez à nouveau.

### La désactiver

1. Dans la section **Connexion à deux facteurs**, cliquez sur **Désactiver**.
2. Saisissez un code actuel de votre application d'authentification, ou un code de secours.
3. Cliquez sur **Vérifier**.

:::info
La connexion à deux facteurs ne peut pas être configurée sur les comptes de démonstration ; la section y est donc masquée.
:::

## Préférences de thème

B1 Admin vous permet de choisir un thème de couleurs et un mode d'affichage clair ou sombre :

1. Cliquez sur votre photo de profil dans le coin supérieur droit de B1 Admin pour ouvrir votre menu utilisateur.
2. Sous **Préférences de thème**, choisissez un thème :
   - **Par défaut** -- L'apparence actuelle de B1 Admin : panneaux à bordure sur un fond épuré. Les nouveaux utilisateurs voient ce thème jusqu'à ce qu'ils en choisissent un autre.
   - **Classique** -- L'apparence précédente de B1 Admin, avec une bannière de page colorée, des cartes ombrées et un fond gris. Si vous utilisiez B1 Admin sur cet appareil avant l'arrivée de la nouvelle apparence et n'avez jamais choisi de thème, vous restez sur Classique.
   - **Personnalisé** -- L'apparence Par défaut construite à partir de la couleur propre à votre église. Il utilise la couleur principale du mode clair de **Mobile > Thème de l'application**, ou la couleur principale de votre site web si aucune couleur d'application n'est définie, afin que B1 Admin corresponde à l'application de vos membres.
3. Sous les thèmes, choisissez **Mode clair** ou **Mode sombre**.
4. L'interface se met à jour immédiatement pour refléter votre choix.

Vos choix sont mémorisés sur cet appareil et ce navigateur.

## Suppression du compte

Dans la section **Suppression du compte** de la page Profil, vous trouverez l'option permettant de supprimer votre compte.

- Si votre église n'a **pas** configuré de groupe d'approbation de l'annuaire, cliquer sur **Supprimer mon compte** supprime immédiatement votre compte et les données associées, et cette action est irréversible.
- Si votre église **a** configuré un groupe d'approbation de l'annuaire, votre demande est envoyée à ce groupe pour examen. Le bouton est désactivé pendant que la demande est en attente, et vous serez averti dès que votre église l'approuve ou la refuse. Voir [Examiner les demandes de suppression de compte](./account-deletion.md) pour la suite du processus.

:::warning
La suppression du compte -- qu'elle soit immédiate ou approuvée par votre église -- est définitive et ne peut pas être annulée.
:::

:::info
Si vous êtes **administrateur de domaine**, veillez à transférer les responsabilités d'administration à un autre utilisateur avant de supprimer votre compte. Voir [Rôles et autorisations](../settings/roles-permissions.md) pour plus de détails sur la gestion des rôles d'administration.
:::

:::info
La modification du profil est désactivée en mode démonstration. Si vous utilisez un compte de démonstration, vous ne pourrez pas modifier les paramètres de votre profil.
:::

## Et ensuite

- [Gérer les appareils](./devices.md) -- Consulter et gérer vos appareils ChurchAppsPlayer connectés
