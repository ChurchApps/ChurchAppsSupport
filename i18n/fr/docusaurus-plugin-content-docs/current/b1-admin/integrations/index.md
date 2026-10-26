---
title: "Intégrations"
---

# Intégrations

<div class="article-intro">

B1 s'intègre aux outils que votre équipe utilise déjà. Connectez Slack ou Discord pour les notifications du personnel, automatisez vos flux de travail avec Zapier ou Make, ou exportez les données à la demande vers Google Sheets, sans payer une plateforme d'intégration distincte et sans que ChurchApps héberge quoi que ce soit de plus. Chaque intégration fonctionne sur l'infrastructure du tiers et communique avec votre église par les webhooks ou l'API REST de B1.

</div>

## Ce qui est disponible

| Intégration | Ce qu'elle fait | Sens | Effort de configuration |
|---|---|---|---|
| **[Slack](./slack-discord)** | Publie des notifications lisibles (nouvelles personnes, dons, inscriptions, …) dans un canal Slack | B1 → Slack | 2 minutes |
| **[Discord](./slack-discord)** | Identique, dans un canal Discord | B1 → Discord | 2 minutes |
| **[Zapier](./zapier)** | Utilise les événements de B1 comme déclencheurs et les actions de B1 dans l'une des plus de 7 000 applications de Zapier | Les deux | 5 à 10 min par Zap |
| **[Make](./make)** | Même principe que Zapier, dans le générateur de scénarios visuel de Make | Les deux | 5 à 10 min par scénario |
| **[Google Sheets](./google-sheets)** | Exporte les personnes, les dons, les groupes et la présence vers un tableur à la demande | B1 → Feuille | 5 minutes |
| **[Claude](./claude)** | Posez à Claude d'Anthropic des questions sur les données de votre église, limitées à vos autorisations. Gratuit à essayer, recommandé | Les deux | Moins de 3 minutes |
| **[ChatGPT](./chatgpt)** | Même principe avec ChatGPT d'OpenAI (nécessite un forfait ChatGPT payant) | Les deux | 10 minutes |
| **[Services connectés](./services/)** | Recettes sélectionnées pour Mailchimp, Donorbox, Subsplash, VOMO, Clearstream, Text In Church, Mobile Message, Checkr | Variable | 5 à 10 min chacun |

## Comment choisir

- **Vous voulez simplement une notification dans une messagerie ?** Utilisez **Slack** ou **Discord** : pas de compte tiers, pas de Zap à maintenir. Tout se configure directement dans B1Admin.
- **Vous voulez automatiser une tâche entre plusieurs applications** (par exemple « quand quelqu'un fait un don, l'ajouter à ma liste Mailchimp et publier dans le canal Slack #dons ») ? Utilisez **Zapier** ou **Make**. Zapier est plus convivial ; Make est moins coûteux à grande échelle et offre une logique plus flexible.
- **Vous avez besoin d'une extraction ponctuelle de données ou d'un rapport planifié ?** Utilisez **Google Sheets** : collez une clé API dans le panneau latéral de l'extension et cliquez sur Exporter.
- **Vous voulez poser des questions en langage courant** (« combien de visiteurs de première fois sont venus dimanche dernier ? », « résume les dons de ce mois-ci ») ? Commencez par **[Claude](./claude)** : il est gratuit à essayer et se configure en moins de 3 minutes. **[ChatGPT](./chatgpt)** fonctionne également avec un forfait payant. Claude se connecte en utilisant votre compte B1, tandis que ChatGPT utilise une clé API B1.
- **Vous créez votre propre intégration sur mesure ?** Aucune des options ci-dessus ne convient : utilisez directement l'[API REST](/docs/developer/api) avec une [clé API](/docs/developer/api/api-keys), ou abonnez un serveur que vous contrôlez aux [webhooks](/docs/developer/api/webhooks).

## Points communs

Chaque intégration s'authentifie avec une **clé API B1**, créée dans B1Admin sous **Paramètres → Développeur → Clés API**. Cette clé :

- Est liée à une personne précise de votre église et hérite des autorisations de cette personne
- Peut être restreinte à l'aide de **portées** : par exemple, un export Google Sheets n'a besoin que de `people:read`, et non de `settings:write`
- Peut être révoquée à tout moment, ce qui coupe immédiatement l'accès de l'intégration sans affecter le reste

Quelques connecteurs (Zapier, Make) enregistrent également un [webhook](/docs/developer/api/webhooks) en votre nom lorsque le Zap ou le scénario est activé, et le suppriment lorsque vous le désactivez. Vous n'avez pas à gérer vous-même l'URL du webhook.

:::tip
Pour que Zapier et Make enregistrent automatiquement les webhooks, la clé API doit avoir la portée **`settings:write`** (ainsi que les portées de ressources nécessaires à l'intégration). Une clé en lecture seule fonctionne pour les actions et les exports, mais pas pour les déclencheurs.
:::

## Coût

ChurchApps est gratuit et open source. Slack/Discord, le [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk), ainsi que les connecteurs officiels Zapier, Make et Google Sheets sont également gratuits de notre côté. Les tiers peuvent facturer leurs propres plateformes (Zapier et Make proposent tous deux des formules gratuites généreuses ; Slack, Discord et Google Sheets sont gratuits pour cet usage).

## Créer votre propre intégration

Si aucune des options ci-dessus ne convient, toutes les fonctionnalités de B1 sont ouvertes :

- **[API REST](/docs/developer/api)** : appelez B1 depuis n'importe quel langage avec un en-tête `Authorization: Bearer cak_…`
- **[Webhooks](/docs/developer/api/webhooks)** : abonnez un point de terminaison HTTPS public à un ou plusieurs types d'événements et recevez des charges utiles JSON signées
- **[OAuth + Applications connectées](/docs/developer/api/connected-apps)** : si vous développez un produit SaaS utilisé par de nombreuses églises

## Étapes suivantes

- [Slack et Discord](./slack-discord) : publier des notifications de discussion
- [Zapier](./zapier) : se connecter à plus de 7 000 applications
- [Make](./make) : automatisation visuelle des flux de travail
- [Google Sheets](./google-sheets) : exporter vers des tableurs
- [Claude](./claude) : poser à Claude des questions sur les données de votre église
- [ChatGPT](./chatgpt) : poser à ChatGPT d'OpenAI des questions sur les données de votre église
- [Services connectés](./services/) : recettes par service (Mailchimp, Donorbox, Clearstream, …)
