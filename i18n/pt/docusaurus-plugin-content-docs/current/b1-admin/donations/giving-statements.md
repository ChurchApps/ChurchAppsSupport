---
title: "Recibos de Doação"
description: "Crie os recibos de doação de fim de ano para cada doador no B1 Admin e, em seguida, baixe-os como arquivos CSV ou imprima-os para envio pelo correio, com os totais dedutíveis de impostos."
---

# Recibos de Doação {#giving-statements}

<div class="article-intro">

No fim de cada ano, os seus doadores precisam de um resumo das doações dedutíveis de impostos para os próprios registros. O B1 Admin facilita a geração desses recibos para todos os doadores de uma só vez, economizando horas de trabalho manual.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Verifique se os seus [fundos](funds.md) estão corretamente marcados como **Dedutível de impostos** -- somente as doações para fundos dedutíveis aparecem nos recibos
- Certifique-se de que todas as doações foram [registradas](recording-donations.md) e que as transações online foram [importadas do Stripe](stripe-import.md)

</div>

## Acessando os Recibos de Doação {#accessing-giving-statements}

1. No **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de busca no canto superior esquerdo) e expanda **Doações**.
2. Clique em **Recibos de Doação**. A página **Recibos de Doação em Lote** é aberta.

## Gerando os Recibos {#generating-statements}

1. No painel **Selecionar ano**, escolha o **Ano** no menu suspenso. Você pode escolher o ano atual ou qualquer um dos cinco anos anteriores.
2. A página carrega somente as doações com data desse ano (de 1º de janeiro a 31 de dezembro), por isso abre rapidamente, mesmo que a sua igreja tenha muitos anos de histórico de doações. Quando você escolhe outro ano, o resumo é atualizado com as doações desse ano. O painel **Resumo**, abaixo do ano, mostra estatísticas desse período, contando as mesmas contribuições que os recibos incluem (contribuições feitas somente a fundos não dedutíveis ficam de fora):
   - **Total de doadores** -- o número de pessoas que contribuíram
   - **Total de doações** -- o número de registros de doação individuais
   - **Valor total** -- o valor somado das contribuições delas

## Baixando os Recibos {#downloading-statements}

O painel **Opções de download** oferece duas formas de entregar os recibos aos seus doadores:

### Baixar como Arquivos CSV {#download-as-csv-files}

Em **Arquivos CSV individuais**, clique em **Baixar ZIP** (o botão mostra a quantidade de arquivos) para baixar um arquivo ZIP com um arquivo CSV individual para cada doador. Isso é útil se você quiser enviar os recibos por e-mail individualmente ou importá-los em outro sistema.

### Imprimir Todos os Recibos {#print-all-statements}

Em **Recibos para impressão**, clique em **Imprimir todos** (o botão mostra a quantidade de recibos) para abrir, no navegador, uma visualização para impressão do recibo de cada doador para o ano selecionado. A partir daí, use a função de impressão do navegador para enviá-los a uma impressora. Cada recibo começa em uma nova página, prontos para serem dobrados e enviados pelo correio, e os recibos seguem a ordem do sobrenome do doador e depois do nome.

Se você tiver enviado um **Logotipo para Fundo Claro** em [Site > Aparência](../website/appearance.md), ele é impresso centralizado no topo de cada recibo, acima do título do recibo. Isso vale para **Imprimir todos**, para o recibo de um único doador impresso a partir do registro dele e para os recibos que os próprios membros imprimem na página **Doações** do B1.church.

:::tip
Gere os seus recibos logo no início de janeiro, enquanto os registros estão recentes. Confira com atenção se os seus fundos estão corretamente marcados como dedutíveis de impostos antes de gerar os recibos -- somente as doações para fundos dedutíveis são incluídas.
:::

:::info
Os recibos de doação incluem apenas as doações atribuídas a fundos com a configuração **Dedutível de impostos** ativada. Se um fundo não estiver marcado como dedutível, as doações dele não aparecerão no recibo. Você pode gerenciar essa configuração na página de [Fundos](funds.md).
:::

## Memorandos das Doações nos Recibos {#gift-memos-on-statements}

Cada recibo lista todas as contribuições com a data, a forma, o fundo e o valor. Quando pelo menos uma contribuição de um recibo tem um **Memorando**, uma coluna **Memorando** é adicionada após o fundo, para que o doador veja a finalidade de cada contribuição. Recibos sem memorandos mantêm o layout de quatro colunas. As **Observações** de uma doação são internas e nunca aparecem em um recibo. Os arquivos CSV do ZIP incluem o memorando como última coluna.

Para incluir uma finalidade no recibo, informe-a como o **Memorando** da doação ao [registrar a doação](recording-donations.md), ou crie um [fundo](funds.md) próprio se quiser totalizá-la separadamente.

## Formatos de Recibo para Canadá, Austrália e Nova Zelândia {#receipt-formats-for-canada-australia-and-new-zealand}

Igrejas fora dos Estados Unidos podem alterar o recibo para o layout oficial de recibo do seu país. Clique em **Formato do recibo** no topo da página Recibos de Doação (ou acesse **Configurações** e abra a seção **Doações**) e defina **Formato do recibo** (que começa em **Padrão**) como **Canadá - recibo oficial da CRA**, **Austrália** ou **Nova Zelândia**. Em seguida, preencha os campos que aparecem: o número de registro (**Número de registro da CRA**, **ABN** ou **Número de registro de entidade de caridade da NZ**), o **Endereço da organização**, o **Nome do signatário autorizado**, e, para o Canadá, a **Cidade de emissão**. Clique em **Salvar**.

Os recibos passam então a conter o texto que a sua autoridade tributária espera (no caso do Canadá, "Recibo Oficial para Fins de Imposto de Renda", com a referência da CRA), um número de recibo no formato `YEAR-DONORID`, o valor elegível contado apenas a partir de fundos dedutíveis e uma linha separada para quaisquer contribuições a fundos não dedutíveis. Os doadores veem o mesmo bloco de recibo quando imprimem o próprio recibo pelo B1.church.

## O Que os Membros Veem no B1.church {#what-members-see-in-b1church}

A mesma seção de **Doações** das configurações controla o que os membros veem na própria página de doações do B1.church:

- **Histórico de doações do membro** define quais anos os membros podem ver. **Todos os anos** é o padrão. **Até 2025** (ou qualquer outro ano) para nesse ano, e os membros não podem visualizar nem imprimir um ano posterior até que você permita. Use essa opção para reter o ano atual enquanto você finaliza correções e reembolsos. **Oculto** remove completamente o histórico de doações, os totais anuais e a impressão de recibos. Os membros continuam podendo contribuir.
- **Observação de doação** é uma breve mensagem exibida na página de doações do membro e no histórico, e impressa no rodapé de cada recibo de doação, inclusive dos recibos que você imprime aqui. Use-a para informações como a sua política de reembolso.

Essas configurações só alteram o que os membros veem. Você ainda pode imprimir qualquer ano nesta página.

## Próximos Passos {#next-steps}

Se você precisar revisar os detalhes das doações antes de gerar os recibos, visite a página de [Relatórios de Doações](donation-reports.md) ou verifique os [lotes](batches.md) individuais.
