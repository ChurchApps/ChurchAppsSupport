---
title: "Modelos de E-mail"
---

# Modelos de E-mail

<div class="article-intro">

Os Modelos de E-mail permitem que você salve conteúdo de e-mail reutilizável -- uma mensagem de boas-vindas, um lembrete de evento, um agradecimento por doação -- para que você (ou um [fluxo de trabalho](../serving/workflows.md)) possa enviá-lo com um clique, em vez de escrevê-lo do zero toda vez.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso à área Settings no B1 Admin.

</div>

## Acessando os Modelos de E-mail

1. Navegue até **Settings** na barra lateral esquerda.
2. Clique em **Email Templates**.
3. Você verá uma lista dos modelos existentes com seu assunto, categoria e data da última modificação.

## Criando um Modelo

1. Clique em **New Template**.
2. Digite um **Template Name** para identificá-lo na lista e escolha uma **Category** (General, Events, Groups, Giving ou Welcome) para ajudar a organizar seus modelos.
3. Digite a linha de **Subject**.
4. Escreva o **Body** usando o editor de texto avançado.
5. Clique em **Save**.

## Campos de Mesclagem

Clique em um chip de campo de mesclagem acima do Subject ou do Body para inseri-lo na posição do cursor. Quando o e-mail é enviado, cada campo de mesclagem é substituído pelas informações reais do destinatário:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- O nome do destinatário
- `{{email}}` -- O endereço de e-mail do destinatário
- `{{churchName}}` -- O nome da sua igreja

## Pré-visualizando um Modelo

Clique em **Preview** para ver como o assunto e o corpo ficarão com dados de exemplo preenchidos nos campos de mesclagem, antes de salvar ou enviar.

## Usando um Modelo

Os modelos salvos ficam disponíveis para seleção ao redigir um e-mail para pessoas ou um grupo, e como uma ação em [Fluxos de Trabalho](../serving/workflows.md).

## Editando e Excluindo

Clique no ícone **Edit** ao lado de um modelo para atualizá-lo, ou no ícone **Delete** para removê-lo permanentemente.

## Próximos Passos

- [Fluxos de Trabalho](../serving/workflows.md) -- Dispare um e-mail de modelo automaticamente com base em regras
