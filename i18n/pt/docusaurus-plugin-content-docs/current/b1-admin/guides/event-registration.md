---
title: "Guia: Configurar Inscrições em Eventos"
description: "Configure um formulário de inscrição de eventos no B1 Admin para coletar dados dos participantes e pagamentos opcionais, incorporá-lo ao site da sua igreja e acompanhar as inscrições."
---

# Configurar Inscrições em Eventos

<div class="article-intro">

Crie um formulário de inscrição de eventos, colete informações dos participantes e pagamentos opcionais, incorpore-o ao site da sua igreja e gerencie as inscrições conforme elas chegam. Ao final, você terá uma página de inscrição compartilhável para qualquer evento da igreja.

</div>

:::info
**Duas formas de lidar com inscrições em eventos:** este guia aborda a **inscrição por formulário**, que oferece controle total sobre campos personalizados e coleta de pagamentos. Para eventos mais simples, em que você só precisa acompanhar quem vai participar, use a **inscrição nativa de eventos** integrada ao calendário -- consulte [Creating Calendars](../calendars/creating-calendars.md#enabling-event-registration) para as instruções de configuração. A inscrição nativa permite que os membros se inscrevam diretamente pelo [B1.church ou pelo B1 App](../../b1-church/events/registering.md), com controle de vagas, janelas de datas e confirmações por e-mail.
:::

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso de administrador
- Para coletar pagamentos: o [Stripe precisa estar configurado](../donations/online-giving-setup.md) primeiro

</div>

## Passo 1: Criar um Formulário Stand Alone

Os formulários Stand Alone têm sua própria URL pública, que qualquer pessoa pode acessar -- perfeitos para inscrições em eventos.

Siga o guia [Creating Forms](../forms/creating-forms.md) para:

1. Acessar Forms e clicar em Add Form
2. Escolher o tipo "Stand Alone" -- isso dá ao seu formulário uma URL pública própria
3. Dar ao formulário o nome do evento (por exemplo, "Inscrição no Retiro dos Homens", "Inscrição para a VBS")

## Passo 2: Adicionar Perguntas

Monte os campos que você precisa coletar dos inscritos.

Siga o guia [Creating Forms](../forms/creating-forms.md#adding-questions) para adicionar suas perguntas:

1. Acesse a aba Questions e adicione campos para as informações de que você precisa: nome, e-mail, telefone, restrições alimentares, tamanho da camiseta, contato de emergência etc.
2. Use Multiple Choice para opções como preferências de refeições ou seleção de sessões

:::warning
O tipo de campo Payment exige que o Stripe esteja configurado. Se você ainda não configurou as contribuições online, consulte [Online Giving Setup](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Passo 3: Configurar as Opções do Formulário

Controle quando e como o formulário de inscrição fica disponível.

1. Defina datas de disponibilidade caso a inscrição deva ficar aberta apenas por um período limitado
2. Copie a URL pública -- você pode compartilhá-la diretamente
3. Adicione membros ao formulário com as funções Admin ou View Only para ajudar a gerenciar as inscrições

## Passo 4: Incorporar ao Seu Site

Facilite a localização do formulário de inscrição adicionando-o ao site da sua igreja.

Siga o guia [Managing Pages](../website/managing-pages.md) para:

1. No editor de sites do B1, adicione uma nova seção a uma página e selecione o elemento Form
2. Escolha o seu formulário de inscrição na lista

:::tip
Compartilhe também a URL standalone por e-mail, redes sociais e boletins da igreja -- quanto mais lugares ela estiver visível, mais inscrições você receberá.
:::

## Passo 5: Gerenciar as Inscrições

Acompanhe as inscrições conforme chegam e exporte os dados quando precisar.

Siga o guia [Managing Submissions](../forms/managing-submissions.md) para:

1. Revisar as respostas conforme chegam, na aba Submissions
2. Exportar para CSV para planilhas, controle de número de participantes ou para compartilhar com os coordenadores do evento

## Pronto!

Sua inscrição no evento está no ar. Compartilhe o link, incorpore-o ao seu site e acompanhe as inscrições pelo B1 Admin. Quando o evento terminar, exporte a lista final para os seus registros.

## Artigos Relacionados

- [Creating Forms](../forms/creating-forms.md) — crie formulários com diferentes tipos de campos
- [Managing Submissions](../forms/managing-submissions.md) — revise e exporte as respostas dos formulários
- [Managing Pages](../website/managing-pages.md) — incorpore formulários ao seu site
- [Online Giving Setup](../donations/online-giving-setup.md) — necessário para campos de pagamento
