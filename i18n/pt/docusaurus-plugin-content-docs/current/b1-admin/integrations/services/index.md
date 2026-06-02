---
title: "Serviços Conectados"
---

# Serviços Conectados

<div class="article-intro">

A forma mais rápida de conectar B1 a outra ferramenta de tecnologia da igreja é geralmente uma receita Zapier ou Make — você não precisa de nova infraestrutura B1, e o terceiro hospeda o fluxo de trabalho. Esta página é uma lista selecionada de serviços que confirmamos serem conectáveis hoje, com um guia de configuração curto e pronto para colar para cada um.

</div>

## À Primeira Vista

| Serviço | Categoria | Bridge | O que você pode conectar |
|---|---|---|---|
| [Mailchimp](./mailchimp) | Email | Zapier ou Make | Sincronizar novas pessoas B1 / doadores em uma audiência Mailchimp |
| [Donorbox](./donorbox) | Doações | Zapier | Empurrar doações Donorbox e doadores de volta em B1 |
| [Subsplash](./subsplash) | Aplicativo / Doações | Zapier | Puxar doações e pessoas Subsplash em B1 |
| [VOMO](./vomo) | Voluntariado | Zapier | Sincronizar inscrições de voluntários entre grupos B1 e projetos VOMO |
| [Clearstream](./clearstream) | SMS | Zapier | Disparar um texto Clearstream de eventos B1; ingerir respostas como registros B1 |
| [Text In Church](./text-in-church) | SMS / Fluxos de Trabalho | Zapier | Disparar fluxos de trabalho Text In Church de B1; receber dados Connect Card |
| [Mobile Message](./mobile-message) | SMS (AU) | Webhooks by Zapier ou Make | Enviar SMS de qualquer evento B1 |
| [Checkr](./checkr) | Verificação de Antecedentes | Make | Iniciar uma verificação de antecedentes quando alguém adere a um time de serviço |

## O Que Todos Esses Têm em Comum

1. **O lado B1 da fiação é idêntico** — crie uma chave de API com os escopos corretos em **B1Admin → Configurações → Desenvolvedor → Chaves de API**, então deixe o bridge registrar um webhook para o gatilho (Zapier / Make fazem isso automaticamente, requer `settings:write`) ou chame endpoints REST B1 de uma ação a jusante.
2. **O bridge cobra você, não nós.** ChurchApps é gratuito; Zapier e Make ambos têm níveis gratuitos que cobrem um punhado de receitas.
3. **Você pode testar a fiação sem entrar em produção.** Ambos os bridges têm um botão "Testar passo" que dispara o gatilho uma vez contra B1 e mostra a forma de dados antes de ativar a receita.

## Escolher um Bridge

- **Zapier** é mais amigável e tem catálogo de aplicativo maior — use como padrão a menos que custo seja um problema.
- **Make** é mais barato em escala e tem roteamento mais flexível/lógica de filtro — use quando um fluxo de trabalho único tem fan-out, condicionais, ou muitos passos.
- **Webhooks by Zapier** (usado para o doc Mobile Message) é um adaptador genérico que permite fazer POST para qualquer endpoint HTTP de um Zap quando o destino não é um aplicativo Zapier de primeira classe.

Se você quer algo não nesta lista, a [API REST](/docs/developer/api) e [webhooks](/docs/developer/api/webhooks) B1 estão abertos — você pode construir um bridge único com o [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) em algumas horas.

## O Que Não Está Aqui (e Por Quê)

Várias ferramentas populares de tecnologia da igreja — Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe — não têm um aplicativo Zapier publicado ou módulo Make hoje. Elas têm suas próprias APIs mas conectá-las a B1 é um trabalho de código personalizado, não uma receita, então não se encaixam nesta lista. Se um fornecedor adicionar um aplicativo Zapier ou módulo Make, adicionaremos o doc.

Também deliberadamente pulamos ferramentas específicas de Serviços do Planning Center (música, apresentação), produtos ChMS concorrentes, consultores de migração, e ferramentas que apenas limpam dados específicos do PCO — nenhuma delas tem um caminho de fiação útil em B1.

## Veja Também

- [Zapier (visão geral)](../zapier) — o lado B1 de cada receita Zapier é idêntico; este doc cobre uma vez
- [Make (visão geral)](../make) — mesmo para cenários Make
- [Slack & Discord](../slack-discord) — notificações de chat sem bridge
- [Google Sheets](../google-sheets) — exportações sob demanda
- [Webhooks (referência de desenvolvedor)](/docs/developer/api/webhooks) — catálogo de eventos que toda receita depende
