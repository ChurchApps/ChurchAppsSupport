---
title: "Configuration de la présence"
---

# Configuration de la présence

<div class="article-intro">

Avant de pouvoir suivre la présence, vous devez indiquer à B1 Admin les emplacements physiques de votre église, le moment où les services ont lieu et quels groupes se réunissent à chaque service. Cette configuration ponctuelle crée la structure qui alimente le suivi et la génération de rapports de présence dans toute votre église.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez avoir un compte B1 Admin actif avec la permission de gérer la présence. Consultez [Rôles et autorisations](../people/roles-permissions.md) si vous n'êtes pas certain de votre niveau d'accès.
- Si vous prévoyez d'assigner des groupes à des heures de service, assurez-vous que vos [groupes sont créés](../groups/creating-groups.md) en premier.

</div>

## Concepts clés

- **Campus** -- un emplacement physique où votre église se réunit (par exemple, « Campus principal », « Campus nord »). Les campus sont gérés sous **Paramètres**.
- **Service** -- un rassemblement récurrent à un campus (par exemple, « Service du dimanche », « Entre-semaine »).
- **Heure de service** -- une heure spécifique à laquelle un service a lieu (par exemple, « 9h00 », « 11h00 »).
- **Groupe programmé** -- un groupe assigné à une heure de service spécifique. La présence est suivie dans le contexte de ce service.
- **Groupe non programmé** -- un groupe qui suit sa propre présence, sans être lié à une heure de service.

## Configuration de votre structure de présence

1. Ouvrez **B1 Admin**, ouvrez le [menu Sauter](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), et développez **Personnes**.
2. Cliquez sur **Présence**, puis cliquez sur **Configuration** dans la colonne de gauche. Le tableau **Structure du service** s'ouvre, avec, en haut, le nombre de vos campus, heures de service, et groupes programmés et non programmés.
3. Cliquez sur **Gérer les campus** (en haut à droite du panneau **Structure du service**). Cela vous mène à **Paramètres → Campus**. Cliquez sur **Ajouter un campus**, entrez le nom de votre emplacement (l'adresse et le fuseau horaire sont optionnels), et cliquez sur **Enregistrer**.
4. Retournez à **Personnes → Présence** et cliquez sur **Configuration**. Votre campus apparaît maintenant dans la table de configuration.
5. Cliquez sur le **+ bouton dans la colonne Service** sous votre campus. Entrez un nom de service tel que « Service du dimanche » et cliquez sur **Enregistrer**.
6. Cliquez sur le **+ bouton dans la colonne Heure** sous le service. Entrez un nom d'**heure de service** comme « 9h00 », remplissez éventuellement le [calendrier d'enregistrement](#setting-a-check-in-schedule), et cliquez sur **Enregistrer**. Répétez pour chaque heure de service.
7. Pour connecter un groupe à une heure de service, ouvrez le groupe à partir de **Personnes > Groupes**, cliquez sur **Modifier**, et utilisez **Ajouter l'heure de service** — voir la section suivante.

### Activation du suivi de la présence sur un groupe

Avant qu'un groupe puisse avoir sa présence enregistrée, le suivi de la présence doit être activé pour ce groupe.

1. Dans le menu Sauter, choisissez **Personnes > Groupes** et sélectionnez le groupe.
2. Cliquez sur le bouton **Modifier** sous le nom du groupe.
3. Définissez **Suivre la présence** sur **Oui**.
4. Cliquez sur **Enregistrer**.

:::tip
Si vous avez assigné le groupe à une heure de service à l'étape précédente, utilisez également l'option **Ajouter l'heure de service** sur l'écran d'édition du groupe pour le lier au service correct. Cela garantit que les sessions sont connectées au bon campus et à la bonne heure.
:::

:::tip
Si un groupe se réunit en dehors d'un service régulier -- comme un petit groupe entre-semaine qui suit sa propre présence -- vous pouvez le laisser comme groupe non programmé. Il apparaîtra toujours dans le rapport **Présence des groupes** pour la génération de rapports de présence.
:::

## Configurer un calendrier d'enregistrement {#setting-a-check-in-schedule}

Chaque heure de service peut avoir un calendrier d'enregistrement facultatif afin que [l'enregistrement en libre-service](check-in.md) s'ouvre et se ferme automatiquement chaque semaine. Sans calendrier, l'enregistrement pour cette heure de service reste disponible à tout moment (tant que la salle n'est pas fermée pour d'autres raisons, par exemple parce qu'elle est pleine).

1. Dans la vue **Configuration**, cliquez sur le nom d'une heure de service dans la colonne **Heure** (ou ajoutez-en une nouvelle).
2. Sous **Calendrier d'enregistrement**, choisissez le **Jour** de la semaine où l'heure de service a lieu.
3. Réglez l'**Heure de début** et, éventuellement, l'**Heure de fin**.
4. Saisissez **Ouvrir l'enregistrement (minutes avant le début)** -- par exemple, `30` ouvre l'enregistrement une demi-heure avant le début du service.
5. Saisissez **Fermer l'enregistrement (minutes après la fin)** -- par exemple, `15` maintient l'enregistrement ouvert pendant 15 minutes après l'heure de fin. Si vous n'avez pas défini d'heure de fin, le calcul part de l'heure de début.
6. Cliquez sur **Enregistrer**.

Le calendrier utilise l'heure locale de votre église et se répète chaque semaine. Pour supprimer un calendrier, remettez le **Jour** sur **Aucun calendrier** et cliquez sur **Enregistrer**. Un calendrier ne prend effet que lorsque le **Jour** et l'**Heure de début** sont tous deux définis.

Lorsque la fenêtre d'enregistrement d'une heure de service est fermée :

- **L'enregistrement en libre-service sur B1.church** masque cette heure de service. Si aucune heure d'un service n'est ouverte, les familles voient « L'enregistrement n'est pas ouvert pour ce service pour le moment. »
- **L'application de borne B1 Checkin** ne finalise pas un enregistrement dans les groupes de cette heure de service ; la borne affiche un écran **Impossible d'enregistrer pour le moment** qui indique la salle concernée, afin que la famille puisse en choisir une autre.

:::tip
Prévoyez une large fenêtre d'ouverture (par exemple, 45 minutes avant le début) pour que les familles et les bénévoles arrivant en avance puissent s'enregistrer, et une courte fenêtre de fermeture pour que les retardataires puissent encore s'enregistrer une fois le service commencé.
:::

## Modification de votre configuration

Vous pouvez mettre à jour votre configuration à tout moment. Sélectionnez un campus, une heure de service ou un groupe et cliquez sur **Modifier** pour changer ses détails, ou **Supprimer** pour le supprimer.

:::info
La suppression d'une heure de service ne supprime pas les dossiers de présence passés. Vos données historiques sont préservées même si vous modifiez votre horaire.
:::

## Étapes suivantes

Une fois vos campus, heures de service et groupes en place, vous êtes prêt à commencer à [enregistrer la présence](recording-attendance.md) manuellement ou à configurer l'[enregistrement automatique](check-in.md) pour vos services.
