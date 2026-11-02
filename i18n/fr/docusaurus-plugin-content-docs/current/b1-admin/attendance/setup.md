---
title: "Configuration des présences"
---

# Configuration des présences

<div class="article-intro">

Avant de pouvoir suivre les présences, vous devez indiquer à B1 Admin les lieux physiques de votre église, les moments où les services ont lieu et les groupes qui se réunissent à chaque service. Cette configuration unique crée la structure qui alimente tout le suivi et les rapports de présence de votre église.

</div>

## Vidéo de formation

<YouTube id="LQPc2gVlXvQ" title="Configurer les services et les présences dans B1" next="Configurer le pointage des enfants dans B1" nextUrl="/docs/b1-admin/guides/childrens-checkin" />

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin d'un compte B1 Admin actif avec l'autorisation de présences **Modifier les services**. L'option **Configuration** n'apparaît que pour les personnes qui l'ont ; la simple consultation des présences ne suffit pas. Voir [Rôles et autorisations](../people/roles-permissions.md) si vous ne savez pas quel est votre niveau d'accès.
- Si vous prévoyez d'attribuer des groupes à des horaires de service, assurez-vous que vos [groupes sont créés](../groups/creating-groups.md) au préalable.

</div>

## Concepts clés

- **Campus** -- un lieu physique où votre église se réunit (par exemple « Campus principal », « Campus nord »). Les campus se gèrent sous **Paramètres**.
- **Service** -- un rassemblement récurrent dans un campus (par exemple « Service du dimanche », « Mi-semaine »).
- **Horaire de service** -- un moment précis où un service a lieu (par exemple « 9 h 00 », « 11 h 00 »).
- **Groupe planifié** -- un groupe associé à un horaire de service précis. Les présences sont suivies dans le contexte de ce service.
- **Groupe non planifié** -- un groupe qui suit ses propres présences, sans être lié à un horaire de service.

## Configurer la structure de vos présences

1. Ouvrez **B1 Admin**, ouvrez le [menu de navigation rapide](../introduction.md#getting-around-with-the-jump-menu) (la barre de recherche en haut à gauche), et développez **Personnes**.
2. Cliquez sur **Présences**, puis cliquez sur **Configuration** dans la colonne de gauche. Le tableau **Structure des services** s'ouvre, avec en haut le nombre de campus, d'horaires de service, de groupes planifiés et non planifiés. Les totaux se mettent à jour dès que vous ajoutez, modifiez ou supprimez un élément dans le tableau.
3. Cliquez sur **Gérer les campus** (en haut à droite du panneau **Structure des services**). Vous accédez ainsi à **Paramètres → Campus**. Cliquez sur **Ajouter un campus**, saisissez le nom de votre lieu (l'adresse et le fuseau horaire sont facultatifs), puis cliquez sur **Enregistrer**.
4. Revenez à **Personnes → Présences** et cliquez sur **Configuration**. Votre campus apparaît maintenant dans le tableau de configuration.
5. Cliquez sur le bouton **+ dans la colonne Service** sous votre campus. Saisissez un nom de service tel que « Service du dimanche » et cliquez sur **Enregistrer**.
6. Cliquez sur le bouton **+ dans la colonne Heure** sous le service. Saisissez un nom d'**horaire de service** tel que « 9 h 00 », configurez éventuellement le [calendrier de pointage](#setting-a-check-in-schedule), puis cliquez sur **Enregistrer**. Répétez pour chaque horaire de service.
7. Pour relier un groupe à un horaire de service, ouvrez le groupe depuis **Personnes > Groupes**, cliquez sur **Modifier** et utilisez **Ajouter un horaire de service** -- voir la section suivante.

### Activer le suivi des présences sur un groupe

Avant qu'un groupe puisse avoir des présences enregistrées, le suivi des présences doit être activé pour ce groupe.

1. Dans le menu de navigation rapide, choisissez **Personnes > Groupes** et sélectionnez le groupe.
2. Cliquez sur le bouton **Modifier** sous le nom du groupe.
3. Réglez **Suivre les présences** sur **Oui**.
4. Cliquez sur **Enregistrer**.

:::tip
Si vous avez attribué le groupe à un horaire de service à l'étape précédente, utilisez aussi l'option **Ajouter un horaire de service** dans l'écran de modification du groupe pour le relier au bon service. Cela garantit que les séances sont rattachées au bon campus et au bon moment.
:::

:::tip
Si un groupe se réunit en dehors d'un service régulier -- comme un petit groupe de mi-semaine qui suit ses propres présences -- vous pouvez le laisser comme groupe non planifié. Il apparaîtra tout de même dans le rapport **Présences par groupe**.
:::

## Définir un calendrier de pointage {#setting-a-check-in-schedule}

Chaque horaire de service peut avoir un calendrier de pointage facultatif, afin que le [pointage autonome](check-in.md) s'ouvre et se ferme seul chaque semaine. Sans calendrier, le pointage pour cet horaire de service reste disponible en tout temps (tant que la salle n'est pas fermée pour d'autres raisons, comme d'être complète).

1. Dans la vue **Configuration**, cliquez sur le nom d'un horaire de service dans la colonne **Heure** (ou ajoutez-en un nouveau).
2. Sous **Calendrier de pointage**, choisissez le **jour** de la semaine où l'horaire de service se réunit.
3. Réglez l'**heure de début** et, facultativement, l'**heure de fin**.
4. Saisissez **Ouvrir le pointage (minutes avant le début)** -- par exemple, `30` ouvre le pointage une demi-heure avant le début du service.
5. Saisissez **Fermer le pointage (minutes après la fin)** -- par exemple, `15` garde le pointage ouvert 15 minutes après l'heure de fin. Si vous n'avez pas défini d'heure de fin, ce délai est compté à partir de l'heure de début.
6. Cliquez sur **Enregistrer**.

Le calendrier se répète chaque semaine et est mesuré dans le fuseau horaire du campus du service. Si ce campus n'a pas de fuseau horaire, le [fuseau horaire](../settings/church-settings.md#time-zone) de votre église est utilisé à la place, puis le fuseau horaire de votre premier campus qui en a un, et enfin l'heure de l'Est (America/New_York). Si le pointage s'ouvre à la mauvaise heure, vérifiez le **fuseau horaire** du campus dans [Campus](../settings/campuses.md). Pour supprimer un calendrier, remettez **Jour** sur **Aucun calendrier** et cliquez sur **Enregistrer**. Un calendrier n'entre en vigueur que lorsqu'un **jour** et une **heure de début** sont tous deux définis.

Lorsque la fenêtre de pointage d'un horaire de service est fermée :

- **Le pointage autonome sur B1.church** affiche cet horaire de service comme **Fermé** (ou, par exemple, **Fermé · ouvre dim. 9 h 30**) et il ne peut pas être sélectionné. Si aucun des horaires d'un service n'est ouvert, les familles voient quand le pointage ouvrira, par exemple « Le pointage ouvre dim. 9 h 30 ».
- **La borne de l'application B1 Checkin** affiche aussi l'horaire de service comme **Fermé**, avec l'heure d'ouverture. Si tous les horaires d'un service sont fermés, la borne indique quand le pointage de ce service ouvrira. Une personne déjà pointée à un horaire de service fermé voit plutôt son groupe avec la mention **Pointé**. Si une fenêtre se ferme en plein milieu d'un pointage, la borne ne termine pas l'opération et affiche un écran **Pointage impossible pour le moment** qui indique la salle concernée, afin que la famille puisse en choisir une autre.

Un foyer qui a déjà pointé pour un horaire de service antérieur peut revenir et ajouter un horaire de service ultérieur encore ouvert, même après la fermeture de la fenêtre précédente. Ses pointages existants sont conservés.

:::tip
Prévoyez une fenêtre d'ouverture généreuse (par exemple 45 minutes avant le début) afin que les familles et les bénévoles qui arrivent en avance puissent pointer, et une fenêtre de fermeture courte afin que les retardataires puissent tout de même pointer une fois le service commencé.
:::

## Modifier votre configuration

Vous pouvez mettre à jour votre configuration à tout moment. Sélectionnez un campus, un horaire de service ou un groupe et cliquez sur **Modifier** pour changer ses détails, ou sur **Supprimer** pour le retirer.

:::info
Supprimer un horaire de service ne supprime pas les enregistrements de présences passées. Vos données historiques sont conservées même si vous modifiez votre calendrier.
:::

## Et ensuite

Une fois vos campus, horaires de services et groupes en place, vous êtes prêt à commencer à [enregistrer les présences](recording-attendance.md) manuellement ou à configurer le [pointage autonome](check-in.md) pour vos services.
