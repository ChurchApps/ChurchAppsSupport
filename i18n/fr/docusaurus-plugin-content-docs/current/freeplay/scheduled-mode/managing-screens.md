---
title: "Gérer les écrans et les groupes"
---

# Gérer les écrans et les groupes

<div class="article-intro">

La page **Screens** (Écrans) de FreePlay Admin répertorie chaque téléviseur associé à votre église, avec ce qu'il diffuse actuellement et s'il est prêt pour le dimanche. Vous y gérez aussi les **screen groups** (groupes d'écrans). Les écrans d'un même groupe partagent un seul calendrier et une seule boucle par défaut.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Connectez-vous à FreePlay Admin sur [admin.freeplay.church](https://admin.freeplay.church)
- [Associez au moins un écran](./pairing-a-screen)

</div>

## La page Screens

En haut de la page, trois chiffres vous donnent un aperçu rapide de l'état :

- **Online now** (En ligne maintenant) — Écrans ayant envoyé un signal de présence au cours des 15 dernières minutes
- **Ready for Sunday** (Prêts pour dimanche) — Nombre d'écrans programmés dont tous les contenus sont téléchargés jusqu'à ce dimanche inclus
- **Needs attention** (Nécessite une attention) — Écrans hors ligne ou dont des fichiers sont manquants

Ci-dessous, utilisez **Search screens** (Rechercher des écrans) pour trouver un écran par son libellé, son groupe ou ce qu'il diffuse. Les puces de filtre limitent la liste à **All** (Tous), **Scheduled** (Programmés), **Manual** (Manuels), **Needs attention** (Nécessite une attention) ou à un seul groupe. Basculez entre les vues **Table** (Tableau) et **Grid** (Grille) grâce au commutateur à droite.

Chaque écran affiche :

- Son **Label** (Libellé) et son modèle d'appareil
- Son **Group** (Groupe)
- Son **Mode** — **Scheduled** (Programmé) ou **Manual** (Manuel)
- **Now playing** (En cours de lecture) — Ce qui est affiché à l'écran en ce moment. Les écrans manuels affichent **Classroom · teacher presses Start** (Salle de classe · l'enseignant appuie sur Démarrer)
- **Ready through** (Prêt jusqu'au) — La date jusqu'à laquelle l'écran a tout téléchargé. Si des fichiers n'ont pas été téléchargés, il affiche **N files missing** (N fichiers manquants) à la place. Un nouvel écran affiche **Waiting for first sync** (En attente de la première synchronisation)
- **Last seen** (Vu pour la dernière fois) — Dernière fois que l'écran a envoyé un signal de présence. Un écran qui ne s'est pas manifesté depuis un certain temps affiche **Offline** (Hors ligne), et un écran qui ne s'est jamais connecté affiche **Never seen** (Jamais vu)

Utilisez **Present** (Présenter) pour lire le calendrier de l'écran dans votre navigateur, ou **Edit** (Modifier) pour changer ses paramètres.

## Afficher un écran

Cliquez sur le libellé d'un écran pour ouvrir sa page. À gauche :

- **Present in browser** (Présenter dans le navigateur) — Lit le calendrier de cet écran en plein écran dans votre navigateur, comme il apparaîtrait sur le téléviseur. Voir [Présenter depuis un navigateur](./scheduled-playback#presenting-from-a-browser)
- **Edit** (Modifier) — Change le libellé, le groupe ou le mode
- **More** (Plus) > **Unpair** (Dissocier) — Déconnecte le téléviseur. Il revient alors à l'affichage d'un code d'association

Le reste de la page comporte ces sections :

- **Now and next** (Maintenant et ensuite) — Ce qui est diffusé maintenant et jusqu'à quand, suivi de tout ce qui est programmé pour les 7 prochains jours. Cliquez sur **Open calendar** (Ouvrir le calendrier) pour accéder au calendrier de ce groupe
- **Downloads** (Téléchargements) — **Ready through** (Prêt jusqu'au) une date où tout est téléchargé, ou une liste des fichiers manquants
- **Device** (Appareil) — ID de l'appareil, plateforme, modèle, version de l'application FreePlay, adresse IP, stockage utilisé et libre, dernière présence, et mode
- **Recent** (Récent) — Les dernières activités signalées par l'écran

:::tip
Si un écran affiche des fichiers manquants, assurez-vous qu'il est en ligne et dispose d'espace de stockage libre. Le téléviseur télécharge lui-même les fichiers manquants la prochaine fois qu'il envoie un signal de présence.
:::

## Modifier un écran

1. Cliquez sur **Edit** (Modifier) à côté de l'écran, ou sur sa page.
2. Modifiez le **Label** (Libellé), le **Group** (Groupe) ou le **Mode** (**Scheduled** (Programmé) ou **Manual** (Manuel)).
3. Cliquez sur **Save** (Enregistrer).

Déplacer un écran vers un autre groupe le fait passer au calendrier de ce groupe.

## Groupes d'écrans {#screen-groups}

Un groupe d'écrans est un ensemble d'écrans qui diffusent la même chose au même moment, comme « Hall » ou « Espace enfants ». Chaque groupe possède son propre calendrier et peut avoir une **default loop** (boucle par défaut) qui se lance lorsque rien n'est programmé.

Pour gérer les groupes, cliquez sur **Groups** (Groupes) en haut de la page **Screens**. La liste **Screen groups** (Groupes d'écrans) indique le nom de chaque groupe, le nombre d'écrans qu'il contient et sa boucle par défaut. Cliquez sur **Screens** (Écrans) pour revenir.

### Ajouter un groupe

1. Dans la vue **Screen groups**, cliquez sur **Add group** (Ajouter un groupe).
2. Saisissez un **Name** (Nom), par exemple « Hall ».
3. Choisissez une playlist pour la **Default loop** (Boucle par défaut), ou laissez **None — screen goes dark** (Aucune — l'écran s'éteint).
4. Cliquez sur **Save** (Enregistrer).

Vous pouvez aussi créer un groupe pendant l'association d'un écran en choisissant **＋ New group…** (Nouveau groupe…) dans le champ **Group** (Groupe).

### Modifier ou supprimer un groupe

1. Cliquez sur **Edit** (Modifier) à côté du groupe.
2. Modifiez le nom ou la boucle par défaut, puis cliquez sur **Save** (Enregistrer).
3. Pour supprimer le groupe, cliquez sur **Delete** (Supprimer) et confirmez.

:::warning
Supprimer un groupe supprime aussi son calendrier. Les écrans de ce groupe s'éteignent jusqu'à ce que vous les déplaciez vers un autre groupe.
:::

## Articles associés

- **[Associer un écran](./pairing-a-screen)** - Ajouter un nouveau téléviseur
- **[Programmer le calendrier](./scheduling-the-calendar)** - Définir ce que diffuse chaque groupe et sa boucle par défaut
- **[Lecture programmée sur le téléviseur](./scheduled-playback)** - Ce que signifie la date « Ready through » sur le téléviseur lui-même
