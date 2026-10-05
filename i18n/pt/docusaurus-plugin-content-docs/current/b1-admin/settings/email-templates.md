---
title: "Modelos de Email"
---

# Modelos de Email

<div class="article-intro">

Email Templates (Modelos de Email) permitem que você salve conteúdo de email reutilizável -- uma mensagem de boas-vindas, um lembrete de evento, um agradecimento de doação -- para que você (ou um [fluxo de trabalho](../serving/workflows.md)) possa enviá-lo em um clique em vez de escrever do zero a cada vez.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso à área Settings (Configurações) no B1 Admin.

</div>

## Acessando Modelos de Email

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Settings** (Configurações).
2. Clique em **Email Templates** (Modelos de Email).
3. Você verá uma lista de modelos existentes com seu assunto, categoria e data da última modificação.

## Criando um Modelo

1. Clique em **New Template** (Novo Modelo).
2. Digite um **Template Name** (Nome do Modelo) para identificá-lo na lista e escolha uma **Category** (Categoria) (General (Geral), Events (Eventos), Groups (Grupos), Giving (Doações) ou Welcome (Boas-vindas)) para ajudar a organizar seus modelos.
3. Digite a linha **Subject** (Assunto).
4. Escreva o **Body** (Corpo) usando o editor de texto rico.
5. Clique em **Save** (Salvar).

## Campos de Mesclagem

Clique em um crachá de campo de mesclagem acima do Assunto ou Corpo para inseri-lo em seu cursor -- clique no texto onde você deseja que o campo esteja primeiro, depois clique no crachá. Seu cursor permanece no lugar, para que você possa continuar digitando logo após o campo inserido. Se você clicar em um crachá de Corpo sem primeiro clicar no corpo, o campo é adicionado no final do corpo. Quando o email é enviado, cada campo de mesclagem é substituído pelas informações reais do destinatário:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- O nome do destinatário
- `{{email}}` -- O endereço de email do destinatário
- `{{churchName}}` -- O nome de sua igreja

## Visualizando um Modelo

Clique em **Preview** (Visualizar) para ver como o assunto e o corpo se parecerão com dados de amostra preenchidos para os campos de mesclagem, antes de você salvar ou enviar.

## Usando um Modelo

Os modelos salvos estão disponíveis para selecionar ao compor um email para pessoas ou um grupo, e como uma ação em [Fluxos de Trabalho](../serving/workflows.md). Antes que sua igreja possa enviá-los, a equipe ChurchApps precisa aprová-lo para email em grupo uma vez. Consulte [Ativando Email em Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editando e Deletando

Clique no ícone **Edit** (Editar) ao lado de um modelo para atualizá-lo, ou no ícone **Delete** (Deletar) para removê-lo permanentemente.

## Próximos Passos

- [Workflows](../serving/workflows.md) -- Acionadores de um email de modelo automaticamente com base em regras
