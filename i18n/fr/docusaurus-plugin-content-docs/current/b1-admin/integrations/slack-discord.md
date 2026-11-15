---
title: "Slack et Discord"
description: "Publiez dans un canal Slack ou Discord les événements de B1 Admin, comme les nouvelles personnes, les dons et les soumissions de formulaires, grâce à un webhook entrant, sans Zapier."
---

# Slack et Discord

<div class="article-intro">

Publiez directement depuis B1 des notifications lisibles dans un canal Slack ou Discord : nouvelles personnes, dons, inscriptions aux groupes, soumissions de formulaires, événements du calendrier, et plus encore. Aucun compte tiers, aucun Zap à entretenir : B1 reformate les événements en messages de discussion et les envoie lui-même à l'URL webhook du canal.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous devez disposer de l'autorisation **Modifier les paramètres** dans B1Admin
- Un administrateur de votre espace de travail Slack ou de votre serveur Discord, pour créer le webhook entrant du canal
- Choisissez le canal dans lequel vous souhaitez recevoir les notifications (vous pouvez utiliser le même canal pour plusieurs types d'événements, ou les répartir sur plusieurs canaux)

</div>

## Fonctionnement {#how-it-works}

B1 dispose d'un **Type de connecteur** intégré pour les plateformes de discussion. Lorsque vous créez un webhook de type **Slack** ou **Discord**, le moteur de webhooks effectue toujours sa livraison, ses nouvelles tentatives et ses en-têtes signés habituels, mais le corps envoyé est remodelé : on passe de l'enveloppe habituelle de B1 `{event,churchId,data}` au message court `{text}` (Slack) ou `{content}` (Discord) attendu par ces services.

Aucun serveur de B1 ne contacte Slack pour chaque église, en dehors du flux de webhooks sortants existant : rien de nouveau à héberger, rien de supplémentaire à payer.

## Slack — étape par étape {#slack--step-by-step}

### 1. Obtenir une URL de webhook entrant Slack {#1-get-a-slack-incoming-webhook-url}

1. Ouvrez [api.slack.com/apps](https://api.slack.com/apps) dans l'espace de travail Slack où vous voulez recevoir les notifications.
2. Cliquez sur **Create New App → From scratch** (Créer une application → À partir de zéro), nommez-la par exemple « B1 Notifications », puis choisissez l'espace de travail.
3. Dans le menu de gauche, choisissez **Incoming Webhooks** et activez **Activate Incoming Webhooks** (passez-le sur *On*).
4. Cliquez sur **Add New Webhook to Workspace** (Ajouter un nouveau webhook à l'espace de travail), choisissez le canal (par exemple `#donations`), puis cliquez sur **Allow** (Autoriser).
5. Slack vous ramène sur la page avec une **Webhook URL** toute neuve qui ressemble à `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copiez-la : c'est la seule information dont B1 a besoin.

:::caution
Traitez l'URL du webhook Slack comme un secret. Quiconque la possède peut publier des messages arbitraires dans le canal. Si vous l'exposez par erreur, régénérez-la depuis la page de l'application Slack (la régénération ne fait que changer l'URL ; mettez ensuite B1 à jour en conséquence).
:::

### 2. Connecter le webhook dans B1Admin {#2-connect-it-in-b1admin}

1. Dans B1Admin, allez dans **Paramètres → Développeur → Webhooks**.
2. Cliquez sur **Nouveau webhook**.
3. Renseignez :
   - **Nom** — un libellé lisible, par exemple « Dons → #donations ». Seule votre équipe le verra.
   - **Type de connecteur** — choisissez **Slack**.
   - **URL de charge utile** — collez l'URL Slack de l'étape 1.
   - **Événements** — cochez les événements que vous voulez recevoir sous forme de messages. Pour un canal des dons, cochez uniquement `donation.created`. Pour un canal #people, essayez `person.created` et `group.member.added`.
4. Cliquez sur **Enregistrer**. Une boîte de dialogue « Clé de signature » apparaît : vous pouvez l'ignorer pour Slack (Slack ne vérifie pas les signatures de B1) et la fermer.

### 3. Tester {#3-test-it}

Rouvrez le webhook depuis la liste et cliquez sur **Envoyer un événement test**. B1 envoie un exemple du premier événement que vous avez coché : en une ou deux secondes, un message tel que celui-ci apparaît dans votre canal Slack, et une nouvelle ligne s'affiche dans le tableau **Livraisons récentes** du même écran avec le statut `succeeded`. C'est terminé.

> 💝 Nouveau don : 50,00 $

## Discord — étape par étape {#discord--step-by-step}

### 1. Obtenir une URL de webhook Discord {#1-get-a-discord-webhook-url}

1. Dans votre serveur Discord, placez le curseur sur le canal souhaité et cliquez sur l'**⚙ engrenage** (Modifier le canal).
2. Ouvrez **Intégrations → Webhooks → Nouveau webhook**.
3. Donnez-lui un nom et (facultatif) un avatar, puis cliquez sur **Copier l'URL du webhook** — elle ressemble à `https://discord.com/api/webhooks/123…/abc…`.

### 2. Connecter le webhook dans B1Admin {#2-connect-it-in-b1admin-1}

Identique à la procédure Slack ci-dessus, à ceci près que le **Type de connecteur** doit être **Discord**. Collez l'URL Discord dans **URL de charge utile** et enregistrez.

:::tip
Vous n'avez **pas** besoin d'ajouter `/slack` à la fin de l'URL Discord : B1 envoie des charges utiles `{content}` natives de Discord, et non compatibles Slack. Collez simplement l'URL fournie par Discord.
:::

### 3. Tester {#3-test-it-1}

Même bouton **Envoyer un événement test** : Discord affiche le message dans le canal choisi et le journal des livraisons passe à `succeeded`.

## À quoi ressemblent les messages {#what-the-messages-look-like}

| Événement | Exemple de message |
|---|---|
| `person.created` | 👤 Nouvelle personne ajoutée : Jordan Rivera |
| `person.updated` | 👤 Personne mise à jour : Jordan Rivera |
| `group.created` | 👥 Nouveau groupe créé : Étude biblique du mardi |
| `group.member.added` | ➕ Une personne a été ajoutée à un groupe |
| `donation.created` | 💝 Nouveau don : 50,00 $ |
| `donation.updated` | 💝 Don mis à jour : 75,00 $ |
| `attendance.recorded` | ✅ Présence enregistrée |
| `form.submission.created` | 📝 Nouvelle soumission de formulaire reçue |
| `event.created` | 📅 Nouvel événement : Culte de Pâques |

La liste complète figure dans le [catalogue des événements de webhooks](/docs/developer/api/webhooks#event-catalog) : tout événement qui y figure peut être acheminé vers Slack ou Discord.

## Un canal par sujet {#one-channel-per-topic}

Vous n'êtes pas obligé de tout regrouper au même endroit. La plupart des églises configurent quelques webhooks :

- Un canal **#donations** qui n'écoute que `donation.created`
- Un canal **#new-people** pour `person.created` et `group.member.added`
- Un canal **#admin-alerts** pour les événements peu fréquents comme `form.submission.created`

Il n'y a pas de limite au nombre de webhooks par église. Chacun est indépendant : supprimer ou désactiver l'un n'affecte pas les autres.

## Consulter les livraisons {#inspecting-deliveries}

Le tableau **Livraisons récentes** de l'éditeur de webhook affiche les 50 dernières tentatives. Cliquez sur une ligne pour voir la charge utile exacte envoyée et la réponse reçue. Pour un connecteur Slack, la charge utile est `{"text":"💝 New donation: $50.00"}` — et non l'enveloppe brute `{event,churchId,...}` — car B1 la remodèle avant l'envoi.

Si une livraison a échoué (un badge orange `failed` pendant que B1 réessaie encore, ou un badge rouge `exhausted` une fois qu'il a renoncé), la colonne **Réponse** affiche le code HTTP, et la boîte de dialogue de la ligne montre le corps de la réponse : vous voyez ainsi exactement ce que Slack ou Discord n'a pas accepté — généralement une erreur de copier-coller dans l'URL. Cliquez sur **Renvoyer** pour envoyer de nouveau cette livraison.

## Dépannage {#troubleshooting}

- **Aucun message n'apparaît et le statut de livraison est `400`** — généralement, le Type de connecteur est réglé sur **Standard** alors que l'URL est une URL Slack/Discord. Slack et Discord rejettent l'enveloppe brute. Passez la liste déroulante sur **Slack** ou **Discord**, puis renvoyez le test.
- **Webhook désactivé automatiquement** — B1 réessaie chaque livraison en échec pendant environ cinq jours. Si trois livraisons consécutives épuisent toutes leurs tentatives, B1 désactive le webhook (son statut affiche **Disabled**). Corrigez l'URL (ou régénérez-la dans Slack/Discord), réactivez **Active**, puis enregistrez.
- **Le message arrive mais il manque des détails** — chaque plateforme de discussion limite la taille des messages. Les messages de B1 sont volontairement courts ; pour des notifications plus riches, utilisez [Zapier](./zapier.md) ou [Make](./make.md) pour composer un message Slack plus complet via leurs actions Slack.

## Changer de type de connecteur plus tard {#switching-connector-types-later}

Vous pouvez modifier le Type de connecteur d'un webhook existant : le changement prend effet à la livraison suivante. Si vous passez de Slack à Standard, pointez l'URL vers votre propre point de terminaison HTTPS ; la même clé de signature (émise à la création du webhook) devient alors vérifiable sur l'enveloppe brute.

## Voir aussi {#see-also}

- [Zapier](./zapier.md) — pour les flux de travail en plusieurs étapes déclenchés par des événements B1
- [Make](./make.md) — constructeur de scénarios visuel
- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — le format complet des charges utiles et des signatures, si vous dirigez un jour un webhook vers votre propre serveur
