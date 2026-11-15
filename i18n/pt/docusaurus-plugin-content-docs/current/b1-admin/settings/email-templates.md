---
title: "Modelos de e-mail"
description: "Configure modelos de e-mail e de mensagens de texto no B1 Admin, com campos de mesclagem, opções de SMS e visualizações prévias para comunicação em massa."
---

# Modelos de e-mail

<div class="article-intro">

Os Modelos de e-mail permitem salvar conteúdos de e-mail reutilizáveis — uma mensagem de boas-vindas, um lembrete de evento, um agradecimento por doação —, para que você (ou um [fluxo de trabalho](../serving/workflows.md)) possa enviá-los com um clique, em vez de escrevê-los do zero toda vez. A mesma lista também guarda modelos de mensagens de texto para as janelas de SMS de grupos e de pessoas, e para a ação **Enviar SMS** dos fluxos de trabalho.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **Editar configurações da igreja** (o item de menu **Modelos de e-mail** só aparece com ela). Pessoas com **Editar membros do grupo** também podem abrir a página diretamente em **/settings/email-templates**.

</div>

## Acessando os modelos de e-mail {#accessing-email-templates}

1. No B1 Admin, abra o [Menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Configurações**.
2. Clique em **Modelos de e-mail**.
3. Você verá uma lista dos modelos existentes, com o **Nome**, o **Assunto**, a **Categoria** e a data de **Modificado**.

## Criando um modelo {#creating-a-template}

1. Clique em **Novo modelo**.
2. Digite um **Nome do modelo** para identificá-lo na lista e escolha uma **Categoria** (Geral, Eventos, Grupos, Doações, Boas-vindas ou SMS) para organizar seus modelos. Escolha **SMS** para criar um modelo de mensagem de texto (veja [Modelos de SMS](#text-templates) abaixo).
3. Digite a linha de **Assunto**.
4. Escreva o **Corpo** usando o editor de texto formatado.
5. Clique em **Salvar**.

## Campos de mesclagem {#merge-fields}

Clique em um botão de campo de mesclagem acima do Assunto ou do Corpo para inseri-lo na posição do cursor — primeiro clique no ponto do texto onde deseja o campo e depois no botão. O cursor permanece no lugar, então você pode continuar digitando logo após o campo inserido. Se clicar em um botão do Corpo sem antes clicar dentro do corpo, o campo é adicionado ao final do corpo. Quando o e-mail é enviado, cada campo de mesclagem é substituído pelas informações reais do destinatário:

- `{{firstName}}`, `{{lastName}}`, `{{displayName}}` -- O nome do destinatário
- `{{email}}` -- O endereço de e-mail do destinatário
- `{{churchName}}` -- O nome da sua igreja

### Campos de mesclagem de doações {#gift-merge-fields}

Estes campos só são preenchidos quando o e-mail é enviado por um [fluxo de trabalho](../serving/workflows.md#sending-email) iniciado por um gatilho **Doação · Criada**. Em qualquer outro e-mail, eles ficam em branco.

- `{{amount}}` -- O valor da doação, como $50.00
- `{{giftDate}}` -- A data da doação
- `{{fund}}` -- O fundo ou os fundos para os quais a doação foi destinada
- `{{receipt}}` -- Um resumo da doação: a data e a forma de pagamento, uma linha para cada fundo com seu valor e o total. Use-o para enviar ao doador um recibo no mesmo e-mail do seu agradecimento. Ele só é oferecido para o corpo, e não para o assunto.

## Modelos de SMS {#text-templates}

Um modelo da categoria **SMS** é uma mensagem de texto simples, para envio por SMS em vez de e-mail:

- Ele não tem assunto. O editor de texto formatado é substituído por uma caixa simples de **Mensagem de texto**, que comporta até 1.600 caracteres.
- Os botões de campos de mesclagem acima da caixa inserem `{{firstName}}`, `{{lastName}}`, `{{displayName}}`, `{{churchName}}` ou os [campos de mesclagem de doações](#gift-merge-fields) na posição do cursor. Em um SMS, `{{receipt}}` vira uma única linha, como *$50.00 to General Fund on Nov 8, 2026*.
- Os modelos de SMS aparecem no seletor **Carregar modelo (opcional)** da janela de SMS de um [grupo](../groups/group-members.md#texting-group-members) ou de uma pessoa. Ao escolher um, a mensagem é preenchida, e você ainda pode editá-la antes de enviar.
- Eles também aparecem na lista **Começar a partir de um modelo** da ação [Enviar SMS](../serving/workflows.md#sending-a-text) dos fluxos de trabalho.
- Eles ficam fora dos seletores de modelos de e-mail, inclusive da ação **Enviar e-mail** dos fluxos de trabalho.

O envio de SMS exige um [provedor de SMS](./church-settings.md#texting) conectado.

## Visualizando um modelo {#previewing-a-template}

Clique em **Visualizar** para ver como o assunto e o corpo ficarão com dados de exemplo preenchidos nos campos de mesclagem, antes de salvar ou enviar.

## Usando um modelo {#using-a-template}

Os modelos salvos podem ser selecionados ao compor um e-mail para pessoas ou grupos, e como uma ação dos [Fluxos de trabalho](../serving/workflows.md). Antes que a sua igreja possa enviá-los, a equipe da ChurchApps precisa aprovar o envio de e-mails de grupo uma única vez. Veja [Ativando o e-mail de grupo para a sua igreja](../groups/group-members.md#turning-on-group-email-for-your-church).

## Editando e excluindo {#editing-and-deleting}

Clique em **Editar** na linha de um modelo para atualizá-lo, ou em **Excluir** para removê-lo permanentemente. O B1 pede confirmação antes de excluir.

## Próximos passos {#next-steps}

- [Fluxos de trabalho](../serving/workflows.md) -- Dispare automaticamente o e-mail de um modelo com base em regras
