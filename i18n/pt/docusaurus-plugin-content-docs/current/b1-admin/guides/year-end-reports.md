---
title: "Guia: Gerar relatórios de doações de fim de ano"
description: "No B1 Admin, finalize os registros de doações do ano, verifique as configurações fiscais dos fundos e gere extratos de doações dedutíveis de impostos para cada doador."
---

# Gerar relatórios de doações de fim de ano

<div class="article-intro">

Veja o processo de fim de ano para finalizar os registros de doações, verificar as configurações dos fundos e gerar extratos de doações dedutíveis de impostos para cada doador. Normalmente, isso é feito no início de janeiro, referente ao ano civil anterior.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Conta do B1 Admin com acesso financeiro
- Doações registradas ao longo do ano (online pelo Stripe e/ou inseridas manualmente)
- Acesso à sua conta do Stripe, caso você aceite doações online

</div>

## Passo 1: Importar as transações finais do Stripe

Certifique-se de que todas as doações online do fim do ano estejam no seu sistema.

Siga o guia [Importação do Stripe](../donations/stripe-import.md) para:

1. Acessar Doações > Importação do Stripe
2. Selecionar um intervalo de datas que cubra o fim do ano (por exemplo, de 1º a 31 de dezembro)
3. Clicar em Pré-visualizar para revisar e, em seguida, em Importar ausentes para finalizar

:::warning
Execute esta importação antes de gerar os extratos. Transações que você não tiver importado não aparecerão nos extratos dos doadores.
:::

## Passo 2: Revisar os relatórios de doações

Verifique se os seus registros estão corretos antes de gerar os extratos.

Siga o guia [Relatórios de doações](../donations/donation-reports.md) para:

1. Conferir a página de resumo de doações do ano inteiro
2. Revisar os totais por fundo e compará-los com os seus extratos bancários para identificar eventuais divergências
3. Abrir lotes individuais para verificar os detalhes por doador, se necessário

## Passo 3: Verificar a situação fiscal dos fundos

Certifique-se de que a configuração de dedutibilidade fiscal de cada fundo esteja correta, para que os extratos sejam precisos.

Siga o guia [Fundos](../donations/funds.md) para:

1. Abrir cada fundo e confirmar se a configuração de dedutibilidade fiscal está correta

:::info
Somente doações para fundos marcados como dedutíveis de impostos aparecerão nos extratos de doações. Se um fundo deveria ser dedutível, mas não está marcado dessa forma, atualize-o antes de gerar os extratos.
:::

## Passo 4: Gerar os extratos de doações

Crie os extratos oficiais de doações para os seus doadores.

Siga o guia [Extratos de doações](../donations/giving-statements.md) para:

1. Acessar **Doações > Extratos de doações**
2. Selecionar o ano na lista suspensa e revisar as estatísticas de resumo
3. Escolher o método de download:
   - **Baixar ZIP**: arquivos CSV individuais, um por doador
   - **Imprimir tudo**: visualização para impressão, com cada extrato em uma nova página e o logotipo da sua igreja no topo (caso você tenha enviado um)

:::tip
Gere os extratos no início de janeiro, enquanto os registros ainda estão recentes. Isso dá tempo para corrigir eventuais problemas antes do envio.
:::

## Passo 5: Enviar aos doadores

Faça com que os extratos cheguem às mãos dos seus doadores.

1. Imprima e envie os extratos pelo correio ou envie por e-mail os arquivos CSV individuais aos doadores
2. Os membros também podem consultar o próprio histórico de doações e imprimir extratos no [B1.church ou no B1 App](../../b1-church/giving/donation-history.md)

## Pronto!

Seus relatórios de doações de fim de ano estão concluídos. Os doadores têm seus extratos dedutíveis de impostos, e os registros financeiros do ano estão finalizados.

## Artigos relacionados

- [Importação do Stripe](../donations/stripe-import.md): importar transações online
- [Relatórios de doações](../donations/donation-reports.md): ver tendências e totais de doações
- [Fundos](../donations/funds.md): gerenciar fundos e configurações de dedutibilidade fiscal
- [Extratos de doações](../donations/giving-statements.md): gerar extratos de fim de ano
- [Registrar doações](../donations/recording-donations.md): inserir manualmente doações em dinheiro ou cheque
- [Histórico de doações (Web)](../../b1-church/giving/donation-history.md): visualização de autoatendimento para membros
- [Guia de configuração de doações online](./online-giving.md): configuração inicial do Stripe e das doações
