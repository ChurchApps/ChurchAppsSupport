---
title: "Guia: Configurar Registro de Evento"
---

# Configurar Registro de Evento

<div class="article-intro">

Crie um formulário de registro de evento, colete informações de participantes e pagamentos opcionais, incorpore-o em seu site de igreja e gerencie submissões conforme chegam. No final, você terá uma página de registro compartilhável para qualquer evento da igreja.

</div>

:::info
**Duas formas de lidar com registro de evento:** Este guia cobre **registro baseado em formulários**, que oferece controle total sobre campos personalizados e coleta de pagamento. Para eventos mais simples onde você só precisa rastrear quem está vindo, use **registro de evento nativo** incorporado no calendário -- veja [Criando Calendários](../calendars/creating-calendars.md#enabling-event-registration) para instruções de configuração. O registro nativo permite que membros se inscrevam diretamente do [site B1](../../b1-church/events/registering) e [aplicativo móvel](../../b1-mobile/events/registering) com rastreamento de capacidade, janelas de data e confirmações por email.
:::

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso de administrador
- Para coletar pagamentos: [Stripe deve estar configurado](../donations/online-giving-setup.md) primeiro

</div>

## Passo 1: Criar um Formulário Autônomo

Formulários Autônomos têm sua própria URL pública que qualquer pessoa pode acessar — perfeito para registro de evento.

Siga o guia de [Criando Formulários](../forms/creating-forms.md) para:

1. Navegue até Forms e clique em Add Form
2. Escolha o tipo "Stand Alone" — isso oferece ao seu formulário sua própria URL pública
3. Nomeie-o após o evento (ex., "Men's Retreat Registration", "VBS Sign-Up")

## Passo 2: Adicionar Perguntas

Construa os campos que você precisa coletar dos participantes.

Siga o guia de [Criando Formulários](../forms/creating-forms.md#adding-questions) para adicionar suas perguntas:

1. Vá para a aba Questions e adicione campos para a informação que você precisa: nome, email, telefone, restrições dietéticas, tamanho de camiseta, contato de emergência, etc.
2. Use Multiple Choice para opções como preferências de refeição ou seleções de sessão

:::warning
O tipo de campo Payment requer Stripe estar configurado. Se você ainda não configurou online giving, veja [Online Giving Setup](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Passo 3: Configurar Definições de Formulário

Controle quando e como seu formulário de registro está disponível.

1. Defina datas de disponibilidade se o registro deve estar aberto apenas por tempo limitado
2. Copie a URL pública — você pode compartilhá-la diretamente
3. Adicione membros de formulário com funções Admin ou View Only para ajudar a gerenciar submissões

## Passo 4: Incorporar no Seu Website

Torne o formulário de registro fácil de encontrar adicionando-o ao seu site de igreja.

Siga o guia de [Managing Pages](../website/managing-pages.md) para:

1. No editor de site B1, adicione uma nova seção a uma página e selecione o elemento Form
2. Escolha seu formulário de registro da lista

:::tip
Compartilhe a URL autônoma via email, mídia social e boletins da igreja também — quanto mais lugares estiver visível, mais inscrições você receberá.
:::

## Passo 5: Gerenciar Submissões

Rastreie registros conforme chegam e exporte dados quando precisar.

Siga o guia de [Managing Submissions](../forms/managing-submissions.md) para:

1. Revise respostas conforme chegam na aba Submissions
2. Exporte para CSV para planilhas, rastreamento de contagem ou compartilhamento com coordenadores de evento

## Pronto!

Seu registro de evento está ativo. Compartilhe o link, incorpore-o em seu website e rastreie inscrições do B1 Admin. Quando o evento terminar, exporte a lista final para seus registros.

## Artigos Relacionados

- [Creating Forms](../forms/creating-forms.md) — construa formulários com diferentes tipos de campo
- [Managing Submissions](../forms/managing-submissions.md) — revise e exporte respostas de formulário
- [Managing Pages](../website/managing-pages.md) — incorpore formulários em seu website
- [Online Giving Setup](../donations/online-giving-setup.md) — necessário para campos de pagamento
