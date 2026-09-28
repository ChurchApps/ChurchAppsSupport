---
title: "Declarações de Doações"
---

# Declarações de Doações

<div class="article-intro">

No final de cada ano, seus doadores precisam de um resumo de suas doações dedutíveis de impostos para seus registros. O B1 Admin facilita a geração dessas declarações para todos os doadores de uma vez, economizando horas de trabalho manual.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Verifique se seus [fundos](funds.md) estão corretamente marcados como **Dedutíveis de Impostos** -- apenas doações para fundos dedutíveis de impostos aparecem nas declarações
- Certifique-se de que todas as doações foram [registradas](recording-donations.md) e que todas as transações online foram [importadas do Stripe](stripe-import.md)

</div>

## Acessando Declarações de Doações

1. No **B1 Admin**, abra o **menu de seção** no canto superior esquerdo e escolha **Doações**.
2. Clique em **Declarações**.

## Gerando Declarações

1. Selecione o **ano** no menu suspenso no topo da página. Você pode escolher o ano atual ou qualquer um dos cinco anos anteriores.
2. A página exibe estatísticas de resumo para esse ano, incluindo:
   - **Total de doadores** -- o número de pessoas que doaram
   - **Total de doações** -- o número de registros de doações individuais
   - **Valor total** -- o valor em dólares combinado de todas as doações

## Baixando Declarações

Você tem duas opções para obter declarações para seus doadores:

### Baixar como Arquivos CSV

Clique em **Baixar ZIP** para baixar um arquivo ZIP contendo um arquivo CSV individual para cada doador. Isso é útil se você quiser enviar declarações por email individualmente ou importá-las em outro sistema.

### Imprimir Todas as Declarações

Clique em **Imprimir Tudo** para abrir uma visualização imprimível de declaração de cada doador em seu navegador. A partir daí, use a função de impressão de seu navegador para enviá-las para uma impressora. Cada declaração começa em uma nova página para que estejam prontas para dobrar e enviar.

:::tip
Execute suas declarações no início de janeiro enquanto seus registros estiverem frescos. Verifique se seus fundos estão corretamente marcados como dedutíveis de impostos antes de gerar declarações -- apenas doações para fundos dedutíveis de impostos estão incluídas.
:::

:::info
As declarações de doações incluem apenas doações atribuídas a fundos que têm a configuração **Dedutível de Impostos** ativada. Se um fundo não estiver marcado como dedutível de impostos, suas doações não aparecerão na declaração. Você pode gerenciar esta configuração na página [Fundos](funds.md).
:::

## Formatos de Recebimento para Canadá, Austrália e Nova Zelândia

Igrejas fora dos Estados Unidos podem alterar a declaração para o layout de recebimento oficial de seu país. Vá para **Configurações**, abra a seção **Doações** e defina **Formato de Declaração** como **Canadá**, **Austrália** ou **Nova Zelândia**, depois preencha os campos que aparecem: seu número de registro (número de registro CRA, ABN ou número de registro de caridade NZ), endereço da sua organização, nome da pessoa autorizada a assinar recebimentos e, para o Canadá, cidade onde os recebimentos são emitidos.

As declarações carregam a linguagem que sua autoridade fiscal espera (para o Canadá, "Recebimento Oficial para Fins de Imposto de Renda" com a referência CRA), um número de recebimento na forma `ANO-IDODOADOR`, o valor elegível contado apenas de fundos dedutíveis de impostos e uma linha separada para quaisquer presentes para fundos não dedutíveis. Os doadores veem o mesmo bloco de recebimento quando imprimem sua própria declaração no B1.church.

## Próximos Passos

Se você precisar revisar detalhes de doações antes de gerar declarações, visite a página [Relatórios de Doações](donation-reports.md) ou verifique [lotes](batches.md) individuais.
