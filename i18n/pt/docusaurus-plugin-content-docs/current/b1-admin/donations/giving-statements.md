---
title: "Recibos de doação"
---

# Recibos de doação

<div class="article-intro">

No fim de cada ano, seus doadores precisam de um resumo das contribuições dedutíveis de impostos para seus registros. O B1 Admin facilita a geração desses recibos para todos os doadores de uma vez, economizando horas de trabalho manual.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Verifique se os seus [fundos](funds.md) estão corretamente marcados como **Dedutível no imposto de renda** -- somente doações para fundos dedutíveis aparecem nos recibos
- Certifique-se de que todas as doações foram [registradas](recording-donations.md) e que quaisquer transações online foram [importadas do Stripe](stripe-import.md)

</div>

## Acessando os recibos de doação

1. No **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Doações**.
2. Clique em **Recibos de doação**. A página **Recibos de doação em lote** é aberta.

## Gerando os recibos

1. No painel **Selecionar ano**, escolha o **Ano** na lista suspensa. Você pode escolher o ano atual ou qualquer um dos cinco anos anteriores.
2. A página carrega somente as doações com data naquele ano (de 1º de janeiro a 31 de dezembro), para que abra rapidamente mesmo que sua igreja tenha muitos anos de histórico de contribuições. Quando você escolhe outro ano, o resumo é atualizado com as doações desse ano. O painel **Resumo** abaixo do ano mostra estatísticas do período, incluindo:
   - **Total de doadores** -- o número de pessoas que contribuíram
   - **Total de doações** -- o número de registros individuais de doação
   - **Valor total** -- o valor combinado de todas as contribuições

## Baixando os recibos

O painel **Opções de download** oferece duas opções para entregar os recibos aos seus doadores:

### Baixar como arquivos CSV

Em **Arquivos CSV individuais**, clique em **Baixar ZIP** para baixar um arquivo ZIP contendo um arquivo CSV individual para cada doador. Isso é útil se você quiser enviar os recibos por e-mail individualmente ou importá-los para outro sistema.

### Imprimir todos os recibos

Em **Recibos para impressão**, clique em **Imprimir todos** (o botão mostra o número de recibos) para abrir uma visualização imprimível do recibo de cada doador para o ano selecionado, no seu navegador. A partir daí, use a função de impressão do navegador para enviá-los à impressora. Cada recibo começa em uma nova página, para que estejam prontos para serem dobrados e enviados pelo correio, e os recibos estão em ordem pelo sobrenome do doador, depois pelo nome.

Se você tiver enviado um **Logotipo para fundo claro** em [Site > Aparência](../website/appearance.md), ele é impresso centralizado no topo de cada recibo, acima do título do recibo. Isso se aplica tanto a **Imprimir todos** quanto ao recibo de um único doador impresso a partir do registro dele.

:::tip
Gere seus recibos logo no início de janeiro, enquanto os registros estão frescos. Confira novamente se os seus fundos estão corretamente marcados como dedutíveis no imposto de renda antes de gerar os recibos -- somente doações para fundos dedutíveis são incluídas.
:::

:::info
Os recibos de doação incluem apenas doações atribuídas a fundos com a configuração **Dedutível no imposto de renda** ativada. Se um fundo não estiver marcado como dedutível, as doações dele não aparecerão no recibo. Você pode gerenciar essa configuração na página de [Fundos](funds.md).
:::

## Formatos de recibo para Canadá, Austrália e Nova Zelândia

Igrejas fora dos Estados Unidos podem alterar o recibo para o layout oficial de recibo do seu país. Clique em **Formato do recibo** no topo da página de Recibos de doação (ou acesse **Configurações** e abra a seção **Doações**) e defina o **Formato do recibo** como **Canadá**, **Austrália** ou **Nova Zelândia**, depois preencha os campos que aparecem: o número de registro (número de registro na CRA, ABN ou número de registro de instituição de caridade da NZ), o endereço da sua organização, o nome da pessoa autorizada a assinar os recibos e, no caso do Canadá, a cidade onde os recibos são emitidos.

Os recibos passam então a conter o texto que a sua autoridade tributária espera (no Canadá, "Recibo oficial para fins de imposto de renda" com a referência da CRA), um número de recibo no formato `YEAR-DONORID`, o valor elegível contabilizado apenas a partir de fundos dedutíveis e uma linha separada para quaisquer doações a fundos não dedutíveis. Os doadores veem o mesmo bloco de recibo quando imprimem o próprio recibo pelo B1.church.

## O que os membros veem no B1.church

A mesma seção de configurações de **Doações** controla o que os membros veem na própria página de doações no B1.church:

- **Histórico de doações do membro** define quais anos os membros podem ver. **Todos os anos** é o padrão. **Até 2025** (ou qualquer outro ano) para nesse ano, para que os membros não possam ver nem imprimir um ano posterior até que você libere. Use isso para segurar o ano atual enquanto você finaliza correções e reembolsos. **Oculto** remove completamente o histórico de doações, os totais anuais e a impressão de recibos. Os membros ainda podem contribuir.
- **Observação sobre doações** é uma mensagem curta exibida na página de doações do membro e no histórico de doações, e impressa no final de todos os recibos de doação, incluindo os recibos que você imprime aqui. Use-a para informações como a sua política de reembolso.

Essas configurações alteram apenas o que os membros veem. Você ainda pode imprimir qualquer ano a partir desta página.

## Próximos passos

Se precisar revisar os detalhes das doações antes de gerar os recibos, visite a página de [Relatórios de doações](donation-reports.md) ou confira os [lotes](batches.md) individuais.
