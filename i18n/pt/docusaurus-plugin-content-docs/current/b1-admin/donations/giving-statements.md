---
title: "Extratos de doações"
description: "Crie extratos anuais de doações para cada doador no B1 Admin e depois baixe-os como arquivos CSV ou imprima-os para envio, com totais dedutíveis de impostos."
---

# Extratos de doações

<div class="article-intro">

No fim de cada ano, seus doadores precisam de um resumo das contribuições dedutíveis de impostos para seus registros. O B1 Admin facilita a geração desses extratos para todos os doadores de uma vez, economizando horas de trabalho manual.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Verifique se os seus [fundos](funds.md) estão marcados corretamente como **Dedutível em impostos** -- somente doações para fundos dedutíveis aparecem nos extratos
- Certifique-se de que todas as doações foram [registradas](recording-donations.md) e que as transações online foram [importadas do Stripe](stripe-import.md)

</div>

## Acessando os extratos de doações

1. No **B1 Admin**, abra o [menu de atalhos](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Doações**.
2. Clique em **Extratos de doações**. A página **Extratos de doações em lote** é aberta.

## Gerando os extratos

1. No painel **Selecionar ano**, escolha o **Ano** na lista suspensa. Você pode escolher o ano atual ou qualquer um dos cinco anos anteriores.
2. A página carrega somente as doações com data naquele ano (de 1º de janeiro a 31 de dezembro), por isso abre rapidamente, mesmo que a igreja tenha muitos anos de histórico de doações. Quando você escolhe outro ano, o resumo é atualizado com as doações desse ano. O painel **Resumo**, abaixo do ano, mostra estatísticas do período, incluindo:
   - **Total de doadores** -- o número de pessoas que contribuíram
   - **Total de doações** -- o número de registros individuais de doação
   - **Valor total** -- o valor combinado de todas as doações

## Baixando os extratos

O painel **Opções de download** oferece duas formas de entregar os extratos aos seus doadores:

### Baixar como arquivos CSV

Em **Arquivos CSV individuais**, clique em **Baixar ZIP** para baixar um arquivo ZIP com um CSV individual para cada doador. Isso é útil se você quiser enviar os extratos por e-mail, um a um, ou importá-los para outro sistema.

### Imprimir todos os extratos

Em **Extratos para impressão**, clique em **Imprimir todos** (o botão mostra o número de extratos) para abrir, no navegador, uma visualização imprimível do extrato de cada doador referente ao ano selecionado. A partir daí, use a função de impressão do navegador para enviá-los à impressora. Cada extrato começa em uma nova página, para que estejam prontos para serem dobrados e enviados pelo correio, e os extratos seguem a ordem do sobrenome do doador, depois do nome.

Se você tiver enviado um **Logotipo para fundo claro** em [Site > Aparência](../website/appearance.md), ele é impresso centralizado no topo de cada extrato, acima do título. Isso se aplica a **Imprimir todos**, ao extrato de um doador impresso a partir do registro dele e aos extratos que os próprios membros imprimem na página **Doações** do B1.church.

:::tip
Gere os extratos logo no início de janeiro, enquanto os registros ainda estão recentes. Confira novamente se os fundos estão marcados corretamente como dedutíveis em impostos antes de gerar os extratos -- somente doações para fundos dedutíveis são incluídas.
:::

:::info
Os extratos de doações incluem apenas doações atribuídas a fundos com a configuração **Dedutível em impostos** ativada. Se um fundo não estiver marcado como dedutível, as doações dele não aparecerão no extrato. Você pode gerenciar essa configuração na página de [Fundos](funds.md).
:::

## Formatos de recibo para Canadá, Austrália e Nova Zelândia

Igrejas fora dos Estados Unidos podem alterar o extrato para o layout oficial de recibo do seu país. Clique em **Formato do extrato** no topo da página de Extratos de doações (ou acesse **Configurações** e abra a seção **Doações**) e defina o **Formato do extrato** como **Canadá**, **Austrália** ou **Nova Zelândia**. Em seguida, preencha os campos que aparecem: o número de registro (número de registro na CRA, ABN ou número de registro de instituição de caridade na NZ), o endereço da organização, o nome da pessoa autorizada a assinar os recibos e, no caso do Canadá, a cidade onde os recibos são emitidos.

Os extratos passam então a conter o texto que a autoridade tributária espera (no Canadá, "Recibo oficial para fins de imposto de renda", com a referência da CRA), um número de recibo no formato `YEAR-DONORID`, o valor elegível contabilizado apenas a partir de fundos dedutíveis e uma linha separada para quaisquer doações a fundos não dedutíveis. Os doadores veem o mesmo bloco de recibo quando imprimem o próprio extrato pelo B1.church.

## O que os membros veem no B1.church {#what-members-see-in-b1church}

A mesma seção de configurações de **Doações** controla o que os membros veem na própria página de doações no B1.church:

- **Histórico de doações dos membros** define quais anos os membros podem ver. **Todos os anos** é o padrão. **Até 2025** (ou qualquer outro ano) interrompe a visualização nesse ano, de modo que os membros não podem ver nem imprimir um ano posterior até que você libere. Use isso para segurar o ano atual enquanto você finaliza correções e reembolsos. **Oculto** remove por completo o histórico de doações, os totais anuais e a impressão de extratos. Os membros ainda podem contribuir.
- **Observação sobre doações** é uma mensagem curta exibida na página de doações do membro e no histórico de doações, e impressa no rodapé de todos os extratos de doações, inclusive nos extratos que você imprime aqui. Use-a para informações como a sua política de reembolso.

Essas configurações alteram apenas o que os membros veem. Você ainda pode imprimir qualquer ano a partir desta página.

## Próximos passos

Se precisar revisar os detalhes das doações antes de gerar os extratos, visite a página de [Relatórios de doações](donation-reports.md) ou confira os [lotes](batches.md) individuais.
