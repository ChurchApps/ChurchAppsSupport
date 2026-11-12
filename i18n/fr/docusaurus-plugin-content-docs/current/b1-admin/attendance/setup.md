---
title: "Configuration des présences"
description: "Configurez les campus, les services, les horaires de service et les affectations de groupes dans B1 Admin afin que le suivi des présences et les calendriers d'enregistrement fonctionnent dans toute votre église."
---

# Configuration des présences

<div class="article-intro">

Avant de pouvoir suivre les présences, vous devez indiquer à B1 Admin où se trouvent les lieux physiques de votre église, à quels moments les services ont lieu et quels groupes se réunissent à chaque service. Cette configuration unique crée la structure qui alimente l'ensemble du suivi et des rapports de présences de votre église.

</div>

## Vidéo de formation {#training-video}

<YouTube id="LQPc2gVlXvQ" title="Configurer les services et les présences dans B1" next="Configurer l'enregistrement des enfants dans B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer d'un compte B1 Admin actif avec l'autorisation de présence **Modifier les services**. L'option **Configuration** n'apparaît que pour les personnes qui la possèdent ; la simple consultation des présences ne suffit pas. Voir [Rôles et autorisations](../people/roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous prévoyez d'affecter des groupes à des horaires de service, assurez-vous d'abord que vos [groupes sont créés](../groups/creating-groups.md).

</div>

## Concepts clés {#key-concepts}

- **Campus** -- un lieu physique où votre église se réunit (par exemple « Campus principal », « Campus Nord »). Les campus se gèrent dans **Paramètres**.
- **Service** -- un rassemblement récurrent sur un campus (par exemple « Service du dimanche », « Mi-semaine »).
- **Horaire de service** -- un moment précis où un service a lieu (par exemple « 9 h 00 », « 11 h 00 »).
- **Groupe programmé** -- un groupe affecté à un horaire de service précis. Les présences sont suivies dans le contexte de ce service.
- **Groupe non programmé** -- un groupe qui suit ses présences de manière autonome, sans être lié à un horaire de service.

## Configurer la structure de vos présences {#setting-up-your-attendance-structure}

1. Ouvrez **B1 Admin**, ouvrez le [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), et développez **Personnes**.
2. Cliquez sur **Présences**, puis sur **Configuration** dans la colonne de gauche. Le tableau **Structure des services** s'ouvre, avec en haut le nombre de vos campus, horaires de service, groupes programmés et non programmés, ainsi que le total des groupes. Les compteurs se mettent à jour dès que vous ajoutez, modifiez ou supprimez un élément dans le tableau. Chaque campus affiche ses services, leurs horaires et les groupes affectés à chaque horaire, regroupés par catégorie (une équipe de service apparaît sous le nom de son ministère). Les groupes qui suivent les présences mais n'ont pas d'horaire de service sont listés en bas, sous **Non affectés**.
3. Cliquez sur **Gérer les campus** (en haut à droite du panneau **Structure des services**). Vous serez dirigé vers **Paramètres → Campus**. Cliquez sur **Ajouter un campus**, saisissez le nom de votre lieu (l'adresse et le fuseau horaire sont facultatifs), puis cliquez sur **Enregistrer**.
4. Revenez à **Personnes → Présences** et cliquez sur **Configuration**. Votre campus apparaît maintenant dans le tableau de configuration.
5. Cliquez sur le **bouton + de la colonne Service** sous votre campus. Saisissez un nom de service, comme « Service du dimanche », puis cliquez sur **Enregistrer**.
6. Cliquez sur le **bouton + de la colonne Horaire** sous le service. Saisissez un nom d'**Horaire de service**, comme « 9 h 00 », remplissez éventuellement le [calendrier d'enregistrement](#setting-a-check-in-schedule), puis cliquez sur **Enregistrer**. Répétez l'opération pour chaque horaire de service.
7. Pour relier un groupe à un horaire de service, ouvrez le groupe depuis **Personnes > Groupes**, cliquez sur **Modifier**, puis utilisez **Ajouter un horaire de service** — voir la section suivante.

### Activer le suivi des présences pour un groupe {#enabling-track-attendance-on-a-group}

Avant qu'un groupe puisse avoir ses présences enregistrées, le suivi des présences doit être activé pour ce groupe.

1. Dans le menu Jump, choisissez **Personnes > Groupes** et sélectionnez le groupe.
2. Cliquez sur le bouton **Modifier** sous le nom du groupe.
3. Réglez **Suivre les présences** sur **Oui**.
4. Cliquez sur **Enregistrer**.

:::tip
Si vous avez affecté le groupe à un horaire de service à l'étape précédente, utilisez aussi l'option **Ajouter un horaire de service** sur l'écran de modification du groupe pour le relier au bon service. Cela garantit que les séances sont rattachées au bon campus et au bon horaire.
:::

:::tip
Si un groupe se réunit en dehors d'un service régulier — comme un petit groupe de mi-semaine qui suit ses propres présences —, vous pouvez le laisser comme groupe non programmé. Il apparaîtra tout de même dans le rapport **Présences par groupe**.
:::

## Définir un calendrier d'enregistrement {#setting-a-check-in-schedule}

Chaque horaire de service peut avoir un calendrier d'enregistrement facultatif, afin que l'[enregistrement en libre-service](check-in.md) s'ouvre et se ferme automatiquement chaque semaine. Sans calendrier, l'enregistrement pour cet horaire de service reste disponible à tout moment (tant que la salle n'est pas fermée pour d'autres raisons, par exemple si elle est complète).

1. Dans la vue **Configuration**, cliquez sur le nom d'un horaire de service dans la colonne **Horaire** (ou ajoutez-en un nouveau).
2. Sous **Calendrier d'enregistrement**, choisissez le **Jour** de la semaine où l'horaire de service a lieu.
3. Définissez l'**Heure de début** et, facultativement, l'**Heure de fin**.
4. Saisissez **Ouvrir l'enregistrement (minutes avant le début)** -- par exemple, `30` ouvre l'enregistrement une demi-heure avant le début du service.
5. Saisissez **Fermer l'enregistrement (minutes après la fin)** -- par exemple, `15` maintient l'enregistrement ouvert pendant 15 minutes après l'heure de fin. Si vous n'avez pas défini d'heure de fin, ce délai est compté à partir de l'heure de début. Si vous laissez vides à la fois **Heure de fin** et **Fermer l'enregistrement**, l'enregistrement reste ouvert jusqu'à la fin de la journée.
6. Cliquez sur **Enregistrer**.

Le calendrier se répète chaque semaine et est mesuré dans le fuseau horaire du campus du service. Si ce campus n'a pas de fuseau horaire, c'est le [fuseau horaire](../settings/church-settings.md#time-zone) de votre église qui est utilisé, puis le fuseau horaire de votre premier campus qui en possède un, et enfin l'heure de l'Est (America/New_York). Si l'enregistrement s'ouvre à la mauvaise heure, vérifiez le **Fuseau horaire** du campus dans [Campus](../settings/campuses.md). Pour supprimer un calendrier, remettez **Jour** sur **Aucun calendrier** et cliquez sur **Enregistrer**. Un calendrier ne prend effet que lorsque **Jour** et **Heure de début** sont tous deux définis.

Lorsque la fenêtre d'enregistrement d'un horaire de service est fermée :

- **Enregistrement en libre-service sur B1.church** affiche cet horaire de service comme **Fermé** (ou, par exemple, **Fermé · ouvre dim. 9 h 30**) et il ne peut pas être sélectionné. Si aucun des horaires d'un service n'est ouvert, les familles voient à quelle heure l'enregistrement ouvre, par exemple « L'enregistrement ouvre dim. 9 h 30 ».
- **L'application de borne B1 Checkin** affiche aussi l'horaire de service comme **Fermé**, avec l'heure d'ouverture. Si tous les horaires d'un service sont fermés, la borne indique à quelle heure l'enregistrement de ce service ouvre. Une personne déjà enregistrée à un horaire fermé voit son groupe marqué **Enregistré** à la place. Si une fenêtre se ferme en cours d'enregistrement, la borne ne peut pas le terminer et affiche un écran **Enregistrement impossible pour le moment** qui indique la salle concernée, afin que la famille puisse en choisir une autre.

Un foyer déjà enregistré pour un horaire de service antérieur peut revenir et ajouter un horaire de service ultérieur encore ouvert, même après la fermeture de la fenêtre précédente. Ses enregistrements existants sont conservés.

:::tip
Prévoyez une fenêtre d'ouverture généreuse (par exemple 45 minutes avant le début) afin que les familles et les bénévoles arrivés en avance puissent s'enregistrer, et une fenêtre de fermeture courte pour que les retardataires puissent encore s'enregistrer une fois le service commencé.
:::

## Modifier votre configuration {#editing-your-setup}

Vous pouvez mettre à jour votre configuration à tout moment :

- **Services et horaires de service** -- cliquez sur le nom d'un service ou d'un horaire de service dans le tableau pour ouvrir son formulaire. Modifiez les détails et cliquez sur **Enregistrer**, ou cliquez sur **Supprimer** pour le retirer.
- **Campus** -- cliquez sur **Gérer les campus** pour ajouter, renommer ou supprimer des campus dans **Paramètres**.
- **Groupes** -- cliquez sur le nom d'un groupe pour l'ouvrir, puis cliquez sur **Modifier** pour changer ses horaires de service ou activer ou désactiver **Suivre les présences**.

Le bouton **Borne d'enregistrement, code QR et étiquettes** en haut du tableau vous mène aux [paramètres de B1 CheckIn](check-in.md).

:::info
Supprimer un horaire de service ne supprime pas les anciens enregistrements de présences. Vos données historiques sont conservées même si vous modifiez votre calendrier.
:::

## La suite {#whats-next}

Une fois vos campus, horaires de service et groupes en place, vous êtes prêt à commencer à [enregistrer les présences](recording-attendance.md) manuellement ou à configurer l'[enregistrement en libre-service](check-in.md) pour vos services.
