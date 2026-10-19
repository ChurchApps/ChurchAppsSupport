---
title: "Extratos de Contribuição"
---

# Extratos de Contribuição

<div class="article-intro">

Ao final de cada ano, seus doadores precisam de um resumo das contribuições dedutíveis de impostos para os registros deles. O B1 Admin facilita a geração desses extratos para todos os doadores de uma só vez, economizando horas de trabalho manual.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Verifique se os seus [fundos](funds.md) estão corretamente marcados como **Dedutível de Impostos** -- apenas doações para fundos dedutíveis de impostos aparecem nos extratos
- Certifique-se de que todas as doações foram [registradas](recording-donations.md) e que as transações online foram [importadas do Stripe](stripe-import.md)

</div>

## Acessando os Extratos de Contribuição

1. No **B1 Admin**, abra o [Menu de atalho](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Doações**.
2. Clique em **Extratos de Contribuição**. A página **Extratos de Contribuição em Lote** é aberta.

## Gerando os Extratos

1. No painel **Selecionar Ano**, escolha o **Ano** na lista suspensa. Você pode escolher o ano atual ou qualquer um dos cinco anos anteriores.
2. A página carrega apenas as doações com data naquele ano (de 1º de janeiro a 31 de dezembro), por isso abre rapidamente, mesmo que a sua igreja tenha muitos anos de histórico de contribuições. Quando você escolhe outro ano, o resumo é atualizado com as doações desse ano. O painel **Resumo** abaixo do ano mostra as estatísticas desse período, incluindo:
   - **Total de Doadores** -- o número de pessoas que contribuíram
   - **Total de Doações** -- o número de registros individuais de doação
   - **Valor Total** -- o valor combinado de todas as contribuições

## Baixando os Extratos

O painel **Opções de Download** oferece duas formas de enviar os extratos aos seus doadores:

### Baixar como Arquivos CSV

Em **Arquivos CSV Individuais**, clique em **Baixar ZIP** para baixar um arquivo ZIP contendo um arquivo CSV individual para cada doador. Isso é útil se você quiser enviar os extratos por e-mail, um a um, ou importá-los para outro sistema.

### Imprimir Todos os Extratos

Em **Extratos para Impressão**, clique em **Imprimir Todos** (o botão mostra o número de extratos) para abrir uma visualização para impressão de todos os extratos de doadores do ano selecionado no seu navegador. A partir daí, use a função de impressão do navegador para enviá-los à impressora. Cada extrato começa em uma nova página, para que estejam prontos para dobrar e enviar pelo correio, e os extratos estão em ordem pelo sobrenome do doador e, depois, pelo nome.

Se você tiver enviado um **Logotipo para Fundo Claro** em [Site > Aparência](../website/appearance.md), ele é impresso centralizado no topo de cada extrato, acima do título do extrato. Isso vale tanto para **Imprimir Todos** quanto para o extrato de um único doador impresso a partir do registro dele.

:::tip
Gere os seus extratos no início de janeiro, enquanto os registros estão frescos. Verifique com atenção se os seus fundos estão corretamente marcados como dedutíveis de impostos antes de gerar os extratos -- apenas as doações para fundos dedutíveis são incluídas.
:::

:::info
Os extratos de contribuição incluem apenas as doações atribuídas a fundos com a configuração **Dedutível de Impostos** ativada. Se um fundo não estiver marcado como dedutível de impostos, as doações dele não aparecerão no extrato. Você pode gerenciar essa configuração na página de [Fundos](funds.md).
:::

## Formatos de Recibo para Canadá, Austrália e Nova Zelândia

Igrejas fora dos Estados Unidos podem mudar o extrato para o layout oficial de recibo do país. Clique em **Formato do extrato** no topo da página de Extratos de Contribuição (ou acesse **Configurações** e abra a seção **Contribuições**) e defina **Formato do Extrato** como **Canadá**, **Austrália** ou **Nova Zelândia**. Depois, preencha os campos que aparecem: o seu número de registro (número de registro na CRA, ABN ou número de registro de instituição de caridade da NZ), o endereço da sua organização, o nome da pessoa autorizada a assinar os recibos e, no caso do Canadá, a cidade onde os recibos são emitidos.

Os extratos passam então a conter a redação que a autoridade tributária espera (no caso do Canadá, "Official Receipt for Income Tax Purposes" com a referência da CRA), um número de recibo no formato `YEAR-DONORID`, o valor elegível contado apenas a partir de fundos dedutíveis de impostos e uma linha separada para quaisquer contribuições a fundos não dedutíveis. Os doadores veem o mesmo bloco de recibo quando imprimem o próprio extrato a partir do B1.church.

## Próximos Passos

Se precisar revisar os detalhes das doações antes de gerar os extratos, visite a página de [Relatórios de Doações](donation-reports.md) ou verifique cada [lote](batches.md) individualmente.
