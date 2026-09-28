---
title: "Modelos de Email"
---

# Modelos de Email

<div class="article-intro">

Modelos de Email permitem que você salve conteúdo de email reutilizável -- uma mensagem de boas-vindas, um lembrete de evento, um agradecimento por doação -- para que você (ou um [fluxo de trabalho](../serving/workflows.md)) possa enviá-lo com um clique em vez de escrevê-lo do zero toda vez.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa ter acesso à área Configurações no B1 Admin.

</div>

## Acessando Modelos de Email

1. No B1 Admin, abra o **menu de seção** no canto superior esquerdo (nome da seção com a pequena seta) e escolha **Configurações**.
2. Clique em **Modelos de Email**.
3. Você verá uma lista de modelos existentes com seu assunto, categoria e data da última modificação.

## Criando um Modelo

1. Clique em **Novo Modelo**.
2. Digite um **Nome do Modelo** para identificá-lo na lista e escolha uma **Categoria** (Geral, Eventos, Grupos, Doações ou Boas-vindas) para ajudar a organizar seus modelos.
3. Digite a linha de **Assunto**.
4. Escreva o **Corpo** usando o editor de texto rico.
5. Clique em **Salvar**.

## Campos de Mesclagem

Clique em um chip de campo de mesclagem acima do Assunto ou Corpo para inseri-lo no seu cursor. Quando o email é enviado, cada campo de mesclagem é substituído pelas informações reais do destinatário:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- O nome do destinatário
- `{{email}}` -- O endereço de email do destinatário
- `{{churchName}}` -- O nome de sua igreja

## Visualizando um Modelo

Clique em **Visualizar** para ver como o assunto e o corpo se parecem com dados de exemplo preenchidos para os campos de mesclagem, antes de você salvar ou enviar.

## Usando um Modelo

Modelos salvos estão disponíveis para selecionar ao compor um email para pessoas ou um grupo, e como uma ação em [Fluxos de Trabalho](../serving/workflows.md). Antes de sua igreja poder enviá-los, a equipe ChurchApps precisa aprová-lo para email em grupo uma vez. Veja [Ativando Email em Grupo para Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editando e Deletando

Clique no ícone **Editar** ao lado de um modelo para atualizá-lo, ou no ícone **Deletar** para removê-lo permanentemente.

## Próximas Etapas

- [Fluxos de Trabalho](../serving/workflows.md) -- Dispare um email de modelo automaticamente com base em regras
