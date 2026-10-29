---
title: "Modelos de E-mail"
---

# Modelos de E-mail

<div class="article-intro">

Os Modelos de E-mail permitem salvar conteúdos de e-mail reutilizáveis -- uma mensagem de boas-vindas, um lembrete de evento, um agradecimento por doação -- para que você (ou um [fluxo de trabalho](../serving/workflows.md)) possa enviá-los com um clique, em vez de escrever tudo do zero a cada vez. A mesma lista também guarda os modelos de mensagens de texto para as janelas de Texto de grupos e pessoas.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de acesso à área de Configurações no B1 Admin.

</div>

## Acessando os Modelos de E-mail

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Modelos de E-mail**.
3. Você verá uma lista dos modelos existentes, com o assunto, a categoria e a data da última modificação.

## Criando um Modelo

1. Clique em **Novo Modelo**.
2. Digite um **Nome do Modelo** para identificá-lo na lista e escolha uma **Categoria** (Geral, Eventos, Grupos, Doações, Boas-vindas ou Texto) para ajudar a organizar seus modelos. Escolha **Texto** para criar um modelo de mensagem de texto (veja [Modelos de Texto](#text-templates) abaixo).
3. Digite a linha de **Assunto**.
4. Escreva o **Corpo** usando o editor de texto formatado.
5. Clique em **Salvar**.

## Campos de Mesclagem

Clique em um chip de campo de mesclagem acima do Assunto ou do Corpo para inseri-lo na posição do cursor -- primeiro clique no texto onde deseja o campo e depois clique no chip. Seu cursor permanece no lugar, então você pode continuar digitando logo após o campo inserido. Se você clicar em um chip do Corpo sem antes clicar no corpo do texto, o campo será adicionado no final do corpo. Quando o e-mail é enviado, cada campo de mesclagem é substituído pelas informações reais do destinatário:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- O nome do destinatário
- `{{email}}` -- O endereço de e-mail do destinatário
- `{{churchName}}` -- O nome da sua igreja

## Modelos de Texto {#text-templates}

Um modelo com a categoria **Texto** é uma mensagem de texto simples para envio por SMS, e não um e-mail:

- Ele não tem assunto. O editor de texto formatado é substituído por uma caixa simples de **Mensagem de Texto**, que comporta até 1.600 caracteres.
- Os chips de campos de mesclagem acima da caixa inserem `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{email}}` ou `{{churchName}}` na posição do cursor.
- Os modelos de texto aparecem no seletor **Carregar Modelo (opcional)** da janela de Texto de um [grupo](../groups/group-members.md#texting-group-members) ou de uma pessoa. Ao escolher um, a mensagem é preenchida, e você ainda pode editá-la antes de enviar.
- Eles ficam de fora dos seletores de modelos de e-mail, inclusive da ação **Enviar e-mail** dos fluxos de trabalho.

O envio de mensagens de texto exige um [provedor de mensagens de texto](./church-settings.md#texting) conectado.

## Visualizando um Modelo

Clique em **Pré-visualizar** para ver como o assunto e o corpo ficarão com dados de exemplo preenchidos nos campos de mesclagem, antes de salvar ou enviar.

## Usando um Modelo

Os modelos salvos podem ser selecionados ao compor um e-mail para pessoas ou grupos, e também como uma ação nos [Fluxos de Trabalho](../serving/workflows.md). Antes que sua igreja possa enviá-los, a equipe do ChurchApps precisa aprovar a ativação do e-mail para grupos, uma única vez. Consulte [Ativando o E-mail para Grupos na Sua Igreja](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editando e Excluindo

Clique no ícone **Editar** ao lado de um modelo para atualizá-lo, ou no ícone **Excluir** para removê-lo permanentemente.

## Próximos Passos

- [Fluxos de Trabalho](../serving/workflows.md) -- Acione automaticamente um e-mail com base em modelo, de acordo com regras
