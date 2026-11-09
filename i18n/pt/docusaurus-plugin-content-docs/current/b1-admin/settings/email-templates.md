---
title: "Modelos de e-mail"
description: "Configure modelos de e-mail e de mensagens de texto no B1 Admin, com campos de mesclagem, opções de SMS e visualizações para comunicação em massa."
---

# Modelos de e-mail

<div class="article-intro">

Os modelos de e-mail permitem salvar conteúdos reutilizáveis — uma mensagem de boas-vindas, um lembrete de evento, um agradecimento por doação — para que você (ou um [fluxo de trabalho](../serving/workflows.md)) possa enviá-los com um clique, em vez de escrevê-los do zero toda vez. A mesma lista também guarda os modelos de mensagem de texto usados nas janelas de Texto de grupos e pessoas e na ação **Enviar texto** dos fluxos de trabalho.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa de acesso à área de Configurações do B1 Admin.

</div>

## Acessando os modelos de e-mail

1. No B1 Admin, abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Modelos de e-mail**.
3. Você verá uma lista dos modelos existentes, com o assunto, a categoria e a data da última modificação.

## Criando um modelo

1. Clique em **Novo modelo**.
2. Digite um **Nome do modelo** para identificá-lo na lista e escolha uma **Categoria** (Geral, Eventos, Grupos, Doações, Boas-vindas ou Texto) para ajudar a organizar os seus modelos. Escolha **Texto** para criar um modelo de mensagem de texto (veja [Modelos de texto](#text-templates) abaixo).
3. Digite a linha de **Assunto**.
4. Escreva o **Corpo** usando o editor de texto formatado.
5. Clique em **Salvar**.

## Campos de mesclagem {#merge-fields}

Clique em um chip de campo de mesclagem acima do Assunto ou do Corpo para inseri-lo na posição do cursor — clique primeiro no ponto do texto onde o campo deve ficar e depois clique no chip. O cursor permanece no lugar, para que você possa continuar digitando logo após o campo inserido. Se você clicar em um chip do Corpo sem clicar antes no corpo, o campo é adicionado no fim do corpo. Quando o e-mail é enviado, cada campo de mesclagem é substituído pelas informações reais do destinatário:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- O nome do destinatário
- `{{email}}` -- O endereço de e-mail do destinatário
- `{{churchName}}` -- O nome da sua igreja

### Campos de mesclagem de doações {#gift-merge-fields}

Estes campos só são preenchidos quando o e-mail é enviado por um [fluxo de trabalho](../serving/workflows.md#sending-email) iniciado por um gatilho de **Doação · Criada**. Em qualquer outro e-mail, eles ficam em branco.

- `{{amount}}` -- O valor da doação, como R$ 50,00
- `{{giftDate}}` -- A data da doação
- `{{fund}}` -- O fundo ou os fundos para os quais a doação foi destinada
- `{{receipt}}` -- Um resumo da doação: a data e a forma de pagamento, uma linha para cada fundo com o respectivo valor e o total. Use-o para enviar ao doador um recibo no mesmo e-mail do seu agradecimento. Ele só é oferecido no corpo, e não no assunto.

## Modelos de texto {#text-templates}

Um modelo com a categoria **Texto** é uma mensagem de texto simples, para SMS, e não um e-mail:

- Não tem assunto. O editor de texto formatado é substituído por uma caixa simples de **Mensagem de texto**, que comporta até 1.600 caracteres.
- Os chips de campos de mesclagem acima da caixa inserem `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` ou os [campos de mesclagem de doações](#gift-merge-fields) na posição do cursor. Em um texto, `{{receipt}}` vira uma única linha, como *R$ 50,00 para Fundo Geral em 8 de nov. de 2026*.
- Os modelos de texto aparecem no seletor **Carregar modelo (opcional)** da janela de Texto de um [grupo](../groups/group-members.md#texting-group-members) ou de uma pessoa. Escolher um preenche a mensagem, e você ainda pode editá-la antes de enviar.
- Eles também aparecem na lista **Começar com um modelo** da ação [Enviar texto](../serving/workflows.md#sending-a-text) dos fluxos de trabalho.
- Ficam de fora dos seletores de modelos de e-mail, inclusive da ação **Enviar e-mail** dos fluxos de trabalho.

O envio de textos exige um [provedor de SMS](./church-settings.md#texting) conectado.

## Visualizando um modelo

Clique em **Visualizar** para ver como o assunto e o corpo ficarão com dados de exemplo preenchidos nos campos de mesclagem, antes de salvar ou enviar.

## Usando um modelo

Os modelos salvos podem ser selecionados ao compor um e-mail para pessoas ou grupos, e também como uma ação nos [fluxos de trabalho](../serving/workflows.md). Antes que a sua igreja possa enviá-los, a equipe da ChurchApps precisa aprová-la uma vez para o e-mail de grupo. Veja [Ativando o e-mail de grupo para sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editando e excluindo

Clique no ícone **Editar** ao lado de um modelo para atualizá-lo, ou no ícone **Excluir** para removê-lo permanentemente.

## Próximos passos

- [Fluxos de trabalho](../serving/workflows.md) -- Dispare automaticamente um e-mail com modelo com base em regras
