---
title: "Suporte a Múltiplas Moedas"
description: "Registre e gere relatórios de doações em diferentes moedas no B1 Admin, incluindo lançamento manual, doações online pelo Stripe e a forma como os totais combinados são convertidos."
---

# Suporte a Múltiplas Moedas

<div class="article-intro">

O recurso de múltiplas moedas do B1 permite que a sua igreja aceite e acompanhe doações em diferentes moedas. Isso é especialmente útil para igrejas com membros internacionais, missionários ou várias unidades em países diferentes.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar doações. Veja [Funções e Permissões](../people/roles-permissions.md) para detalhes.
- Configure as suas [doações online](./online-giving-setup.md) com o Stripe, que oferece suporte a transações em várias moedas. Uma igreja sem doações online ainda pode escolher a moeda em que as doações lançadas manualmente são registradas.
- Entenda as necessidades contábeis da sua igreja para lidar com várias moedas.

</div>

A moeda da sua igreja começa com a moeda do país informado no cadastro da igreja (por exemplo, xelins quenianos para uma igreja no Quênia), e é usada caso nenhuma moeda tenha sido salva ainda. Você pode alterá-la a qualquer momento em **Configurações → Doações** (o menu suspenso **Moeda**). Se o seu país não for reconhecido, o padrão será dólares americanos.

## Ativando as Múltiplas Moedas {#enabling-multi-currency}

O suporte a múltiplas moedas já vem ativado por padrão no B1:

- As doações online são cobradas na moeda escolhida nas suas configurações de **Doações**
- Cada doação mantém a moeda em que foi registrada, e as linhas individuais de doação mostram essa moeda
- Os totais combinados são convertidos para a moeda da sua igreja (veja [Totais Convertidos](#converted-totals))
- O Stripe cuida da conversão para a moeda de repasse da sua conta nas doações online

## Moedas Suportadas {#supported-currencies}

O sistema oferece suporte a todas as principais moedas do mundo, incluindo:

- **USD** -- Dólar americano
- **EUR** -- Euro
- **GBP** -- Libra esterlina
- **CAD** -- Dólar canadense
- **AUD** -- Dólar australiano
- **MXN** -- Peso mexicano
- **BRL** -- Real brasileiro
- **INR** -- Rupia indiana
- **CNY** -- Yuan chinês
- **JPY** -- Iene japonês
- E muitas outras...

As moedas disponíveis para doações online dependem das moedas suportadas pela sua conta do Stripe.

## Registrando Doações em Diferentes Moedas {#recording-donations-in-different-currencies}

### Doações Online {#online-donations}

Quando um membro contribui online pelo Stripe:

1. A doação é cobrada na moeda definida em **Configurações → Doações**; os doadores não escolhem a moeda no checkout
2. O Stripe processa o pagamento nessa moeda
3. A doação é registrada no B1 com essa moeda e esse valor
4. O Stripe faz automaticamente qualquer conversão necessária para a moeda de repasse da sua conta

Se você alterar depois a configuração de **Moeda**, as novas doações usarão a nova moeda, enquanto as doações já registradas mantêm a moeda original. Por isso, os seus registros podem conter mais de uma moeda.

### Lançamento Manual {#manual-entry}

As doações lançadas à mão -- em um lote, com **Importar CSV** ou com **Registrar uma doação** no registro de uma pessoa -- são sempre registradas na moeda da sua igreja, que aparece ao lado do campo **Valor**. Não há menu de moedas para o lançamento manual; por isso, converta para a moeda da sua igreja uma doação feita em outra moeda antes de lançá-la, e registre o valor original em **Observações**, caso precise dele.

## Visualizando Doações em Múltiplas Moedas {#viewing-multi-currency-donations}

### Relatórios de Doações {#donation-reports}

As linhas individuais de doação -- em um lote, na página de um fundo e no histórico de doações de uma pessoa -- mostram cada contribuição na moeda em que foi registrada. Os totais combinados são convertidos, como descrito abaixo.

### Totais Convertidos {#converted-totals}

Sempre que o B1 exibir um único total combinado -- os cartões de indicadores do resumo de doações, o total de um lote de doações e o total de um fundo -- as doações registradas em uma moeda diferente da padrão da sua igreja são convertidas para a moeda da sua igreja, usando as taxas de câmbio atuais. Assim, o total é um número único e significativo, em vez de somar moedas diferentes. Uma nota **Convertido pelas taxas de câmbio atuais** aparece abaixo do total sempre que uma conversão tiver sido aplicada. Os itens individuais de doação continuam exibidos na moeda original.

### Recibos de Doação {#giving-statements}

Os recibos de doação listam o valor de cada contribuição como foi registrado e somam os valores sem conversão. Por isso, um recibo só é preciso quando todas as contribuições daquele doador no ano estão na moeda da sua igreja. Se um doador contribuiu em mais de uma moeda, confira o recibo antes de enviá-lo.

## Integração com o Stripe {#stripe-integration}

Nas doações online, o Stripe cuida das transações em múltiplas moedas:

- **Conversão automática** -- o Stripe converte as moedas para a moeda padrão da sua conta
- **Taxas de câmbio** -- o Stripe usa as taxas de câmbio de mercado atuais
- **Taxas** -- a conversão de moeda pode gerar taxas adicionais do Stripe
- **Moeda de repasse** -- os valores são depositados na moeda padrão da sua conta

:::info
Confira o seu painel do Stripe para ver as taxas de conversão atuais e as taxas associadas às transações em múltiplas moedas.
:::

## Considerações Contábeis {#accounting-considerations}

Ao trabalhar com várias moedas:

- **Registros** -- mantenha o controle dos valores e das moedas originais das doações para relatórios precisos
- **Taxas de câmbio** -- lembre-se de que as taxas de conversão do Stripe podem ser diferentes das taxas do seu banco
- **Recibos fiscais** -- consulte o seu contador sobre como informar doações em diferentes moedas para fins fiscais
- **Alocação em fundos** -- você pode alocar doações a fundos específicos independentemente da moeda

## Boas Práticas {#best-practices}

- **Moeda padrão** -- defina a moeda principal da sua igreja em **Configurações > Doações**, para que as doações lançadas à mão e os totais de doações usem essa moeda
- **Comunicação clara** -- informe aos doadores em qual moeda estão contribuindo durante o checkout
- **Relatórios consistentes** -- os totais combinados são sempre convertidos automaticamente para a moeda da sua igreja; abra um lote ou um fundo para ver o valor e a moeda originais de cada contribuição
- **Conciliação regular** -- concilie os repasses do Stripe com os seus registros de doações, considerando as conversões de moeda

## Limitações {#limitations}

- A conversão de moeda no processamento de pagamentos é feita pelo Stripe, somente para doações online; as doações manuais são registradas na moeda da sua igreja conforme foram lançadas
- Os relatórios históricos e os itens individuais de doação sempre mostram a moeda original em que a contribuição foi registrada
- Os totais combinados (cartões de indicadores, totais de lotes e totais de fundos) são convertidos para a moeda da sua igreja usando as taxas de câmbio atuais -- essas taxas podem diferir um pouco das taxas do seu banco ou do Stripe no momento da liquidação dos valores

## Artigos Relacionados {#related-articles}

- [Configuração de Doações Online](./online-giving-setup.md) -- configure o Stripe para receber doações
- [Registrando Doações](./recording-donations.md) -- lance manualmente os registros de doações
- [Relatórios de Doações](./donation-reports.md) -- gere e visualize os resumos de doações
- [Recibos de Doação](./giving-statements.md) -- crie os recibos de doação de fim de ano
