---
title: "Intégrations"
---

# Intégrations

<div class="article-intro">

B1 se connecte aux outils que votre équipe utilise déjà. Connectez Slack ou Discord pour les notifications du personnel, automatisez les workflows dans Zapier ou Make, ou exportez les données à la demande vers Google Sheets — sans payer pour une plate-forme d'intégration séparée et sans que ChurchApps héberge quoi que ce soit de supplémentaire. Chaque intégration s'exécute sur l'infrastructure propre du tiers et parle à votre église via les webhooks ou l'API REST de B1.

</div>

## Ce qui est disponible

| Intégration | Ce qu'elle fait | Direction | Effort de configuration |
|---|---|---|---|
| **[Slack](./slack-discord)** | Poster des notifications lisibles (nouvelles personnes, donations, inscriptions, …) dans un canal Slack | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord)** | Idem, dans un canal Discord | B1 → Discord | 2 minutes |
| **[Zapier](./zapier)** | Utiliser les événements B1 comme déclencheurs et les actions B1 dans n'importe laquelle des 7 000+ applications de Zapier | Les deux | 5–10 min par Zap |
| **[Make](./make)** | Même idée que Zapier, dans le constructeur de scénarios visuels de Make | Les deux | 5–10 min par scénario |
| **[Google Sheets](./google-sheets)** | Exporter Personnes / Donations / Groupes / Présences vers un tableur à la demande | B1 → Feuille | 5 minutes |
| **[Claude](./claude)** | Poser des questions à Claude d'Anthropic sur les données de votre église, limitées à vos permissions | Les deux | 5 minutes |
| **[ChatGPT](./chatgpt)** | Même idée avec ChatGPT d'OpenAI, via un GPT personnalisé ou un outillage OpenAI compatible MCP | Les deux | 10 minutes |
| **[Services connectés](./services/)** | Recettes organisées pour Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Varies | 5–10 min chacun |

## Comment choisir

- **Vous voulez juste une notification dans le chat?** Utilisez **Slack** ou **Discord** — aucun compte tiers, aucun Zap à maintenir. Configuré entièrement dans B1Admin.
- **Vous voulez automatiser quelque chose entre les applications** (par exemple « quand quelqu'un donne, l'ajouter à ma liste Mailchimp et à #donations »)? Utilisez **Zapier** ou **Make**. Zapier est plus convivial; Make est moins cher à grande échelle et a une logique plus flexible.
- **Vous avez besoin d'une extraction de données unique ou d'un rapport programmé?** Utilisez **Google Sheets** — collez une clé API dans la barre latérale du module complémentaire et cliquez sur Exporter.
- **Vous voulez poser des questions en anglais naturel** (« combien de nouveaux visitants dimanche dernier? », « résumer les donations ce mois »)? Utilisez **[Claude](./claude)** ou **[ChatGPT](./chatgpt)** — tous deux se connectent à B1 avec une seule clé API.
- **Vous créez votre propre intégration personnalisée?** Aucun des éléments ci-dessus — parlez directement à l'[API REST](/docs/developer/api) avec une [clé API](/docs/developer/api/api-keys), ou abonnez-vous un serveur que vous contrôlez aux [webhooks](/docs/developer/api/webhooks).

## Ce qu'ils ont en commun

Chaque intégration s'authentifie avec une **clé API B1**, créée dans B1Admin sous **Paramètres → Développeur → Clés API**. La clé :

- Est liée à une personne spécifique dans votre église et hérite des permissions de cette personne
- Peut être réduite avec des **scopes** — par exemple un export Google Sheets a uniquement besoin de `people:read`, pas `settings:write`
- Peut être révoquée à tout moment, coupant instantanément l'accès de l'intégration sans affecter quoi que ce soit d'autre

Quelques connecteurs (Zapier, Make) enregistrent également un [webhook](/docs/developer/api/webhooks) en votre nom quand le Zap ou le scénario est activé, et le suppriment quand vous le désactivez — vous ne gérez pas vous-même l'URL du webhook.

:::tip
Pour que Zapier et Make enregistrent les webhooks automatiquement, la clé API a besoin du scope **`settings:write`** (plus les scopes de ressources pour tout ce que l'intégration touche). Une clé en lecture seule fonctionne pour les actions et les exports mais pas pour les déclencheurs.
:::

## Coût

ChurchApps est gratuit et open-source. Slack/Discord, le [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), et les connecteurs officiels Zapier / Make / Google Sheets sont également gratuits de notre côté. Les tiers peuvent facturer pour leurs propres plates-formes (Zapier et Make ont tous deux des niveaux gratuits généreux; Slack, Discord, et Google Sheets sont gratuits à cet effet).

## Créer le vôtre

Si aucun des éléments ci-dessus ne convient, chaque surface B1 est ouverte :

- **[API REST](/docs/developer/api)** — appellez B1 depuis n'importe quel langage avec un en-tête `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** — abonnez un point de terminaison HTTPS public à un ou plusieurs types d'événements et recevez des payloads JSON signés
- **[OAuth + Applications connectées](/docs/developer/api/connected-apps)** — si vous créez un produit SaaS utilisé par de nombreuses églises

## Prochaines étapes

- [Slack & Discord](./slack-discord) — poster des notifications de chat
- [Zapier](./zapier) — connecter à 7 000+ applications
- [Make](./make) — automatisation des workflows visuels
- [Google Sheets](./google-sheets) — exporter vers les tableurs
- [Claude](./claude) — poser à Claude d'Anthropic des questions sur les données de votre église
- [ChatGPT](./chatgpt) — poser à ChatGPT d'OpenAI des questions sur les données de votre église
- [Services connectés](./services/) — recettes par service (Mailchimp, Donorbox, Clearstream, …)
