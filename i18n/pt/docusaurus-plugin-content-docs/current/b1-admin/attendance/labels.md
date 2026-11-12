---
title: "Editor de Etiquetas do Check-In"
description: "Personalize os modelos de crachá e de comprovante de retirada impressos no check-in do B1 Admin, incluindo campos, posicionamento e condições de aniversário ou observações."
---

# Editor de Etiquetas do Check-In

<div class="article-intro">

O Editor de Etiquetas permite criar e personalizar os modelos de crachá e de comprovante de retirada impressos quando as famílias fazem o check-in de seus filhos. Você pode controlar exatamente quais informações aparecem em cada etiqueta, onde elas ficam posicionadas e como são exibidas.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Configure a [Presença](./setup.md) e defina pelo menos um horário de culto com check-in habilitado
- Configure o [Check-In](./check-in.md) para que as etiquetas sejam impressas
- Você precisa da permissão **Editar Presença**

</div>

## Abrindo o Editor de Etiquetas {#opening-the-label-designer}

No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo), expanda **Mobile** e clique em **Etiquetas**. Você também pode clicar em **B1 CheckIn** e, em seguida, em **Criar Etiquetas** no cartão **Etiquetas do Check-In**.

A página **Etiquetas do Check-In** lista seus modelos salvos com o **Nome**, o **Tipo** (**Crachá** ou **Comprovante de Retirada**) e o **Tamanho**. Se você ainda não criou nenhum, a página informa **Nenhum modelo de etiqueta**, e o B1 Checkin imprime seu crachá e comprovante de retirada padrão.

## Tipos de Etiqueta {#label-types}

- **Crachá** — impresso e preso à criança. Normalmente inclui o nome da criança, a turma ou sessão e um código de segurança.
- **Comprovante de Retirada** — entregue ao pai, mãe ou responsável. Normalmente inclui o código de segurança e a lista das crianças que fizeram check-in.

Ambos os modelos iniciais são dimensionados para etiquetas térmicas padrão de 3,5 × 1,1 polegadas (Brother DK-1201).

## Criando um Modelo de Etiqueta {#creating-a-label-template}

1. Clique em **Adicionar etiqueta** e escolha um ponto de partida: **Crachá 3,5" x 1,1"**, **Comprovante de Retirada 3,5" x 1,1"** ou **Em branco**.
2. O modelo abre no editor de etiquetas, com uma prévia da etiqueta preenchida com dados de exemplo.

### Editor de Etiquetas {#label-editor}

No topo do editor, você pode definir:

- **Nome** — o nome do modelo (apenas para sua referência; obrigatório)
- **Tipo** — Crachá ou Comprovante de Retirada
- **Largura (pol.)** / **Altura (pol.)** — tamanho da etiqueta em polegadas

### Adicionando Blocos {#adding-blocks}

Uma etiqueta é composta por blocos — peças individuais de conteúdo posicionadas na etiqueta. Clique em um botão no painel **Adicionar Bloco** para incluir um:

- **Campos** — trazem um valor no momento da impressão. Os crachás oferecem **Nome de Exibição**, **Primeiro Nome**, **Sobrenome**, **Apelido**, **Observações do Crachá** (as observações do registro da pessoa), **Aniversário Nesta Semana** (verdadeiro quando o aniversário da pessoa cai até 3 dias antes ou depois da data do check-in), **Sessões** (os horários de culto e as salas em que ela fez check-in), **Código de Segurança**, **Data** e **Nome da Igreja**. Os comprovantes de retirada oferecem **Crianças**, **Crianças e Alergias**, **Código de Segurança**, **Data** e **Nome da Igreja**.
- **Texto** — texto fixo que você digita (para títulos, rótulos ou instruções)
- **Código de barras** — um código de barras Code 128 ou Code 39 de um campo, como o código de segurança
- **QR Code** — um QR code de um campo
- **Caixa** — um retângulo com cor de preenchimento e borda opcionais

### Posicionando e Estilizando os Blocos {#positioning-and-styling-blocks}

Arraste um bloco na etiqueta para movê-lo, ou clique nele e use o painel **Propriedades**. **X**, **Y**, **L** e **A** são percentuais da etiqueta (0–100). Dependendo do bloco, você também pode definir:

- **Tamanho da fonte** — tamanho do texto, em relação à altura da etiqueta
- **Negrito** e **Itálico**
- **Alinhamento** — À esquerda, Centralizado ou À direita
- **Simbologia** e **Valor** — para códigos de barras e QR codes
- **Preenchimento** e **Borda** — para caixas
- **Condição** — **Sempre** exibe o bloco. Escolha um campo para exibir o bloco somente quando esse campo **Não está em branco**, **Está em branco**, **É igual a** ou **É diferente de** um valor. Por exemplo, exiba as observações do crachá somente quando estiverem preenchidas, ou exiba um elemento de aniversário somente quando **Aniversário Nesta Semana** for igual a `true`.

Clique em **Remover Bloco** para excluir o bloco selecionado.

### Salvando {#saving}

Clique em **Salvar** para gravar o modelo, ou em **Cancelar** para descartar suas alterações. O B1 Checkin usa o modelo atualizado na próxima vez que carregar suas configurações.

## Escolhendo o Modelo Padrão {#choosing-the-default-template}

Se você tiver mais de um modelo de um mesmo tipo, clique em **Definir como padrão** no modelo que o B1 Checkin deve imprimir. Ele exibirá um selo **Padrão**, e qualquer outro modelo desse tipo deixará de ser o padrão. Se nenhum modelo de um tipo estiver marcado como padrão, o quiosque usa o primeiro deles.

## Excluindo um Modelo {#deleting-a-template}

Clique em **Excluir** na linha do modelo e confirme. Se você excluir todos os modelos de um tipo, o B1 Checkin volta a usar a etiqueta padrão desse tipo.

:::tip
Faça uma impressão de teste depois de editar um modelo para confirmar que o layout está correto antes do seu próximo culto.
:::

## Artigos Relacionados {#related-articles}

- [Configuração de Presença](./setup.md) — configure os cultos e grupos para o check-in
- [Check-In](./check-in.md) — configure o quiosque do B1 Checkin
- [Primeiros Passos com o B1 Checkin](../../b1-checkin/getting-started/index.md) — o aplicativo de quiosque Checkin
