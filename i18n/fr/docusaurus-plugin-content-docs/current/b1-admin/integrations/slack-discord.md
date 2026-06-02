---
title: "Slack & Discord"
---

# Slack & Discord

<div class="article-intro">

Postez les notifications directement de B1 vers un canal Slack ou Discord — nouvelles personnes, donations, inscriptions à un groupe, soumissions de formulaire, événements de calendrier, et plus. Aucun compte tiers, aucun Zap à maintenir : B1 reformate les événements en messages de chat et les POSTE lui-même à l'URL du webhook du canal.

</div>

<div class="prereqs">
<h4>Avant de commencer</h4>

- Vous avez besoin de la permission **Modifier les paramètres** dans B1Admin
- Un administrateur dans votre espace de travail Slack ou serveur Discord pour créer le webhook entrant du canal
- Décidez dans quel canal vous voulez les notifications (vous pouvez utiliser le même canal pour plusieurs types d'événements, ou les diviser entre les canaux)

</div>

## Comment ça fonctionne

B1 a un **Type de connecteur** intégré pour les plates-formes de chat. Quand vous créez un webhook avec le type **Slack** ou **Discord**, le moteur webhook fait toujours sa livraison habituelle + retry + danse d'en-tête signé, mais le corps qu'il envoie est remodelé de l'enveloppe B1 normale `{event,churchId,data}` en l'petit `{text}` (Slack) ou `{content}` (Discord) que ces services attendent.

Aucun serveur B1 ne se tourne vers Slack sur une base par église au-delà du flux webhook sortant existant — il n'y a rien de nouveau à héberger, rien d'extra à payer.

## Slack — Étape par étape

### 1. Obtenir une URL de webhook entrant Slack

1. Ouvrez [api.slack.com/apps](https://api.slack.com/apps) dans l'espace de travail Slack où vous voulez les notifications.
2. Cliquez sur **Créer une nouvelle application → À partir de zéro**, nommez-la quelque chose comme « Notifications B1 », et choisissez l'espace de travail.
3. Dans la nav gauche choisissez **Webhooks entrants** et basculez **Activer les webhooks entrants** sur *Activé*.
4. Cliquez sur **Ajouter un nouveau webhook à l'espace de travail**, choisissez le canal (par exemple `#donations`), puis **Permettre**.
5. Slack vous atterrit sur la page avec une frais **URL du webhook** qui ressemble à `https://hooks.slack.com/services/T0XXXXXXX/B0YYYYYYY/zzz…`. Copiez-la — c'est le seul morceau d'information dont B1 a besoin.

:::caution
Traitez l'URL du webhook Slack comme un secret. N'importe qui avec elle peut poster des messages arbitraires au canal. Si vous l'exposez accidentellement, régénérez-la à partir de la page de l'application Slack (la régénération fait juste tourner l'URL; mettez à jour B1 pour correspondre).
:::

### 2. Le connecter dans B1Admin

1. Dans B1Admin allez à **Paramètres → Développeur → Webhooks**.
2. Cliquez sur **Nouveau webhook**.
3. Remplissez :
   - **Nom** — quelque chose de lisible comme « Donations → #donations ». Seule votre équipe la voit.
   - **Type de connecteur** — choisissez **Slack**.
   - **URL de charge utile** — collez l'URL Slack à partir de l'étape 1.
   - **Événements** — cochez les événements que vous voulez comme messages. Pour un canal de donations, juste `donation.created`. Pour un canal #personnes, essayez `person.created` et `group.member.added`.
4. Cliquez sur **Enregistrer**. Un dialogue « Secret de signature » apparaît — vous pouvez l'ignorer pour Slack (Slack ne vérifie pas les signatures B1) et le fermer.

### 3. Le tester

Réouvrez le webhook de la liste et cliquez sur **Envoyer un événement de test**. En une seconde ou deux un message comme

> 💝 Nouveau don : 50,00 $

apparaît dans votre canal Slack, et une nouvelle ligne apparaît dans le tableau **Livraisons récentes** sur le même écran avec le statut `succès`. Vous avez terminé.

## Discord — Étape par étape

### 1. Obtenir une URL de webhook Discord

1. Dans votre serveur Discord, passez la souris sur le canal où vous voulez les notifications et cliquez sur la **⚙ roue dentée** (Modifier le canal).
2. Ouvrez **Intégrations → Webhooks → Nouveau webhook**.
3. Donnez-lui un nom et (optionnellement) un avatar, puis cliquez sur **Copier l'URL du webhook** — ressemble à `https://discord.com/api/webhooks/123…/abc…`.

### 2. Le connecter dans B1Admin

Identique au flux Slack ci-dessus, sauf définissez **Type de connecteur** à **Discord**. Collez l'URL Discord dans **URL de charge utile** et enregistrez.

:::tip
Vous **n'avez pas besoin** d'ajouter `/slack` à la fin de l'URL Discord — B1 envoie les payloads natifs Discord `{content}`, pas les compatibles Slack. Collez juste l'URL que Discord vous a donnée.
:::

### 3. Le tester

Même bouton **Envoyer un événement de test** — Discord affiche le message dans le canal choisi et le journal de livraison bascule à `succès`.

## À quoi ressemblent les messages

| Événement | Exemple de message |
|---|---|
| `person.created` | 👤 Nouvelle personne ajoutée : Jordan Rivera |
| `person.updated` | 👤 Personne mise à jour : Jordan Rivera |
| `group.created` | 👥 Nouveau groupe créé : Étude biblique du mardi |
| `group.member.added` | ➕ Quelqu'un a été ajouté à un groupe |
| `donation.created` | 💝 Nouveau don : 50,00 $ |
| `donation.updated` | 💝 Don mis à jour : 75,00 $ |
| `attendance.recorded` | ✅ Présence enregistrée |
| `form.submission.created` | 📝 Nouvelle soumission de formulaire reçue |
| `event.created` | 📅 Nouvel événement : Service de Pâques |

La liste complète vit dans le [catalogue d'événements webhook](/docs/developer/api/webhooks#event-catalog) — tout événement là peut être routé vers Slack/Discord.

## Un canal par sujet

Vous n'avez pas à mettre chaque événement au même endroit. La plupart des églises configurent une poignée de webhooks :

- Un canal **#donations** qui écoute uniquement `donation.created`
- Un canal **#new-people** pour `person.created` et `group.member.added`
- Un canal **#admin-alerts** pour les choses à faible volume comme `form.submission.created`

Il n'y a pas de limite au nombre de webhooks par église. Chacun est indépendant — supprimer ou désactiver l'un n'affecte pas les autres.

## Inspection des livraisons

Le tableau **Livraisons récentes** de l'éditeur de webhook affiche les 50 dernières tentatives. Cliquez sur une ligne pour voir la charge utile exacte qui a été envoyée et la réponse qui est revenue. Pour un connecteur Slack la charge utile est `{"text":"💝 Nouveau don : 50,00 $"}` — pas l'enveloppe brute `{event,churchId,...}` — car B1 la remodelé avant la livraison.

Si quelque chose a échoué (badge rouge `failed` ou `exhausted`), le dialogue affiche le statut HTTP et le corps de réponse pour que vous puissiez voir exactement ce que Slack ou Discord n'a pas aimé — généralement une erreur de copier-coller dans l'URL.

## Dépannage

- **Aucun message n'apparaît + statut de livraison `400`** — généralement le type de connecteur est défini sur **Standard** mais l'URL est une Slack/Discord. Slack/Discord rejettent l'enveloppe brute. Changez la liste déroulante sur **Slack** ou **Discord** et renvoyez le test.
- **Webhook désactivé automatiquement** — après 3 livraisons échouées consécutives, B1 désactive le webhook. Corrigez l'URL (ou tournez-la sur Slack/Discord) et basculez **Actif** arrière.
- **Le message est arrivé mais manque de détail** — chaque plate-forme de chat limite la taille des messages. Les messages B1 sont des lignes uniques par conception; pour les notifications plus riches utilisez [Zapier](./zapier) ou [Make](./make) pour composer un message Slack plus complet via leurs actions Slack.

## Basculer les types de connecteurs ultérieurement

Vous pouvez changer le type de connecteur sur un webhook existant — il prend effet à la prochaine livraison. Si vous basculez de Slack à Standard, pointez l'URL à votre propre point de terminaison HTTPS et le même secret de signature (il a été émis quand le webhook a été créé) commence à être vérifiable comme l'enveloppe brute.

## Voir aussi

- [Zapier](./zapier) — pour les workflows multi-étapes déclenchés par les événements B1
- [Make](./make) — constructeur de scénario visuel
- [Webhooks (référence développeur)](/docs/developer/api/webhooks) — le format de charge utile complète + signature si vous pointez jamais un webhook à votre propre serveur
