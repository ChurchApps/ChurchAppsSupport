---
title: "Serviços conectados"
description: "Conecte o B1 Admin ao Mailchimp, Donorbox, Subsplash, VOMO, Clearstream e outras ferramentas usando receitas do Zapier ou do Make, com guias de configuração para cada uma."
---

# Serviços conectados

<div class="article-intro">

A forma mais rápida de conectar o B1 a outra ferramenta de tecnologia para igrejas costuma ser uma receita do Zapier ou do Make -- você não precisa de nova infraestrutura no B1, e o terceiro hospeda o fluxo de trabalho. Esta página é uma lista selecionada de serviços que confirmamos que podem ser conectados hoje, com um guia de configuração curto, para copiar e colar, para cada um.

</div>

## Visão geral {#at-a-glance}

| Serviço | Categoria | Ponte | O que você pode conectar |
|---|---|---|---|
| [Mailchimp](./mailchimp.md) | E-mail | Integrada ao B1 (aba Webhooks) | Manter um público do Mailchimp sincronizado com pessoas, grupos e listas salvas do B1 |
| [Donorbox](./donorbox.md) | Doações | Zapier | Enviar doações e doadores do Donorbox para o B1 |
| [Subsplash](./subsplash.md) | App / Doações | Zapier | Trazer doações e pessoas do Subsplash para o B1 |
| [VOMO](./vomo.md) | Voluntariado | Zapier | Sincronizar inscrições de voluntários entre grupos do B1 e projetos do VOMO |
| [Clearstream](./clearstream.md) | SMS | Zapier | Disparar uma mensagem de texto da Clearstream a partir de eventos do B1; receber respostas como registros do B1 |
| [Text In Church](./text-in-church.md) | SMS / Fluxos de trabalho | Zapier | Disparar fluxos de trabalho do Text In Church a partir do B1; receber dados do Connect Card |
| [Mobile Message](./mobile-message.md) | SMS (Austrália) | Webhooks by Zapier ou Make | Enviar SMS a partir de qualquer evento do B1 |
| [Checkr](./checkr.md) | Verificações de antecedentes | Make | Iniciar uma verificação de antecedentes quando alguém entra em uma equipe de serviço |

## O que todos têm em comum {#what-all-of-these-have-in-common}

1. **O lado do B1 da integração é idêntico** -- crie uma chave de API com os escopos certos em **B1Admin → Configurações → Desenvolvedor → Chaves de API** e, em seguida, deixe a ponte registrar um webhook para o gatilho (o Zapier / o Make fazem isso automaticamente e exigem `settings:write`) ou chame os endpoints REST do B1 a partir de uma ação posterior. O app do B1.church no Zapier exige `settings:write` em todas as chaves, porque verifica a chave contra a lista de webhooks do B1 quando você a conecta. (O Mailchimp é a exceção: a sincronização dele é integrada ao B1 e configurada na aba **Webhooks**, sem chave de API nem ponte.)
2. **Quem paga pela ponte é você, não nós.** A ChurchApps é gratuita; o Zapier e o Make têm planos gratuitos que cobrem algumas receitas.
3. **Você pode testar a integração sem entrar em produção.** O Zapier tem um botão "Test step" que busca dados de exemplo no B1 e mostra a estrutura dos dados antes de você ativar a receita.

## Como escolher uma ponte {#picking-a-bridge}

- O **Zapier** é mais amigável e tem o maior catálogo de apps -- use-o como padrão, a menos que o custo seja um problema.
- O **Make** é mais barato em grande escala e tem uma lógica de roteamento e filtros mais flexível -- use-o quando um único fluxo de trabalho tiver bifurcações, condições ou muitas etapas.
- O **Webhooks by Zapier** (usado no documento do Mobile Message) é um adaptador genérico que permite enviar POST a qualquer endpoint HTTP a partir de um Zap quando o destino não é um app oficial do Zapier.

Se você quiser algo que não está nesta lista, a [API REST](/docs/developer/api) e os [webhooks](/docs/developer/api/webhooks) do B1 estão abertos -- você pode criar uma ponte pontual com o [`@churchapps/integration-sdk`](https://www.npmjs.com/package/@churchapps/integration-sdk) em algumas horas.

## O que não está aqui (e por quê) {#whats-not-here-and-why}

Várias ferramentas populares de tecnologia para igrejas -- Tithe.ly, Pushpay, Vanco, PastorsLine, Gloo, Notebird, KidCheck, MinistrySafe -- não têm, hoje, um app publicado no Zapier nem um módulo no Make. Elas têm APIs próprias, mas conectá-las ao B1 é um trabalho de código personalizado, e não uma receita; por isso não se encaixam nesta lista. Se um fornecedor lançar um app no Zapier ou um módulo no Make, adicionaremos o documento.

Também deixamos de lado, de propósito, ferramentas específicas do Planning Center Services (música, apresentações), produtos concorrentes de ChMS, consultores de migração e ferramentas que apenas limpam dados específicos do PCO -- nenhuma delas tem um caminho de integração útil com o B1.

## Veja também {#see-also}

- [Zapier (visão geral)](../zapier.md) -- o lado do B1 de todas as receitas do Zapier é idêntico; este documento o explica uma única vez
- [Make (visão geral)](../make.md) -- o mesmo para cenários do Make
- [Slack e Discord](../slack-discord.md) -- notificações de chat sem nenhuma ponte
- [Google Sheets](../google-sheets.md) -- exportações sob demanda
- [Webhooks (referência para desenvolvedores)](/docs/developer/api/webhooks) -- o catálogo de eventos em que todas as receitas se baseiam
