---
title: "Declarações de Doações"
---

# Declarações de Doações

<div class="article-intro">

No final de cada ano, seus doadores precisam de um resumo de suas doações dedutíveis de impostos para seus registros. B1 Admin torna fácil gerar essas declarações para todos os doadores de uma vez, economizando horas de trabalho manual.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Verifique se seus [fundos](funds.md) estão corretamente marcados como **Dedutíveis de Impostos** -- apenas doações para fundos dedutíveis de impostos aparecem em declarações
- Certifique-se de que todas as doações foram [registradas](recording-donations.md) e quaisquer transações online foram [importadas do Stripe](stripe-import.md)

</div>

## Acessando Declarações de Doações

1. Em **B1 Admin**, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Doações**.
2. Clique em **Declarações de Doações**.

## Gerando Declarações

1. Selecione o **ano** no dropdown no topo da página. Você pode escolher o ano atual ou qualquer um dos cinco anos anteriores.
2. A página exibe estatísticas resumidas para esse ano, incluindo:
   - **Total de doadores** -- o número de pessoas que doaram
   - **Total de doações** -- o número de registros de doação individuais
   - **Valor total** -- o valor em dólares combinado de todas as doações

## Baixando Declarações

Você tem duas opções para obter declarações para seus doadores:

### Baixar como Arquivos CSV

Clique em **Baixar ZIP** para baixar um arquivo ZIP contendo um arquivo CSV individual para cada doador. Isso é útil se você quiser enviar declarações por email individualmente ou importá-las em outro sistema.

### Imprimir Todas as Declarações

Clique em **Imprimir Tudo** para abrir uma visualização imprimível de cada declaração de doador em seu navegador. De lá, use a função de impressão do seu navegador para enviá-las para uma impressora. Cada declaração começa em uma nova página para que estejam prontas para dobrar e enviar pelo correio.

:::tip
Execute suas declarações no início de janeiro enquanto seus registros estão frescos. Verifique duas vezes se seus fundos estão corretamente marcados como dedutíveis de impostos antes de gerar declarações -- apenas doações para fundos dedutíveis de impostos são incluídas.
:::

:::info
As declarações de doações incluem apenas doações atribuídas a fundos que têm a configuração **Dedutíveis de Impostos** habilitada. Se um fundo não está marcado como dedutível de impostos, suas doações não aparecerão na declaração. Você pode gerenciar essa configuração na página [Fundos](funds.md).
:::

## Formatos de Recibos para Canadá, Austrália e Nova Zelândia

Igrejas fora dos Estados Unidos podem mudar a declaração para o layout de recibo oficial de seu país. Vá para **Configurações**, abra a seção **Doações** e defina **Formato da Declaração** para **Canadá**, **Austrália** ou **Nova Zelândia**, depois preencha os campos que aparecem: seu número de registro (número de registro CRA, ABN ou número de registro de caridade da NZ), o endereço de sua organização, o nome da pessoa autorizada a assinar recibos, e para o Canadá a cidade onde os recibos são emitidos.

As declarações então trazem a redação que sua autoridade fiscal espera (para o Canadá, "Recibo Oficial para Fins de Imposto de Renda" com a referência do CRA), um número de recibo na forma `ANO-IDODOADOR`, o valor elegível contado apenas a partir de fundos dedutíveis de impostos, e uma linha separada para qualquer presente a fundos não dedutíveis. Os doadores veem o mesmo bloco de recibo quando imprimem sua própria declaração do B1.church.

## Próximas Etapas

Se você precisar revisar detalhes de doações antes de gerar declarações, visite a página [Relatórios de Doações](donation-reports.md) ou verifique [lotes](batches.md) individuais.
