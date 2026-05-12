---
title: "Suporte a Múltiplas Moedas"
---

# Suporte a Múltiplas Moedas

<div class="article-intro">

O recurso de múltiplas moedas do B1 permite que sua igreja aceite e rastreie doações em diferentes moedas. Isso é particularmente útil para igrejas com membros internacionais, missionários ou vários campus em diferentes países.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar doações. Consulte [Funções e Permissões](../people/roles-permissions.md) para detalhes.
- Configure suas [doações online](./online-giving-setup.md) com Stripe, que suporta transações em múltiplas moedas.
- Compreenda as necessidades contábeis da sua igreja para lidar com múltiplas moedas.

</div>

## Habilitando Múltiplas Moedas

O suporte a múltiplas moedas agora está habilitado por padrão no B1. Uma vez habilitado:

- Os membros podem doar em sua moeda local ao doar online
- Você pode registrar manualmente doações em qualquer moeda
- Os relatórios de doações mostram valores em sua moeda original
- O Stripe lida com a conversão de moedas automaticamente para doações online

## Moedas Suportadas

O sistema suporta todas as principais moedas mundiais, incluindo:

- **USD** -- Dólar Americano
- **EUR** -- Euro
- **GBP** -- Libra Esterlina
- **CAD** -- Dólar Canadense
- **AUD** -- Dólar Australiano
- **MXN** -- Peso Mexicano
- **BRL** -- Real Brasileiro
- **INR** -- Rupia Indiana
- **CNY** -- Yuan Chinês
- **JPY** -- Iene Japonês
- E muitas mais...

As moedas disponíveis para doações online dependem das moedas suportadas pela sua conta Stripe.

## Registrando Doações em Diferentes Moedas

### Doações Online

Quando um membro doa online através do Stripe:

1. Eles selecionam sua moeda preferida no checkout
2. O Stripe processa o pagamento nessa moeda
3. A doação é registrada no B1 com o valor da moeda original
4. O Stripe lida automaticamente com qualquer conversão de moeda necessária para a moeda padrão da sua conta

### Entrada Manual

Para registrar uma doação em dinheiro ou cheque em uma moeda diferente:

1. Navegue até **Doações** no B1 Admin
2. Clique em **Adicionar Doação**
3. Selecione a moeda no menu suspenso de moedas
4. Insira o valor nessa moeda
5. Complete o restante dos detalhes da doação
6. Clique em **Salvar**

## Visualizando Doações em Múltiplas Moedas

### Relatórios de Doações

Os relatórios de doações exibem valores em sua moeda original:

- Registros individuais de doações mostram o código da moeda (por exemplo, "$100,00 USD")
- Os totais são calculados por moeda
- Você pode filtrar por moedas específicas

### Extratos de Doações

Ao gerar extratos de doações:

- Cada doação aparece com sua moeda original
- Os totais são divididos por moeda
- Os membros veem exatamente o que doaram em cada moeda

## Integração com Stripe

Para doações online, o Stripe lida com transações em múltiplas moedas:

- **Conversão automática** -- O Stripe converte moedas para a moeda padrão da sua conta
- **Taxas de câmbio** -- O Stripe usa taxas de câmbio atuais do mercado
- **Taxas** -- A conversão de moeda pode incorrer em taxas adicionais do Stripe
- **Moeda de pagamento** -- Os fundos são depositados na moeda padrão da sua conta

:::info
Verifique seu painel do Stripe para ver as taxas de conversão atuais e quaisquer taxas associadas a transações em múltiplas moedas.
:::

## Considerações Contábeis

Ao trabalhar com múltiplas moedas:

- **Manutenção de registros** -- Mantenha registro dos valores originais de doações e moedas para relatórios precisos
- **Taxas de câmbio** -- Note que as taxas de conversão do Stripe podem diferir das taxas do seu banco
- **Recibos fiscais** -- Consulte seu contador sobre como relatar doações em diferentes moedas para fins fiscais
- **Alocação de fundos** -- Você pode alocar doações para fundos específicos independentemente da moeda

## Melhores Práticas

- **Moeda padrão** -- Defina sua moeda principal da igreja como padrão para a maioria das transações
- **Comunicação clara** -- Informe os doadores em qual moeda eles estão doando durante o processo de checkout
- **Relatórios consistentes** -- Decida se deve relatar em moedas originais ou converter para uma única moeda para resumos
- **Reconciliação regular** -- Reconcilie os pagamentos do Stripe com seus registros de doações, contabilizando conversões de moeda

## Limitações

- A conversão de moeda é tratada pelo Stripe apenas para doações online
- Doações manuais são registradas como inseridas sem conversão automática
- Relatórios históricos mostram doações em suas moedas originais
- Cálculos de total são feitos por moeda, não entre moedas

## Artigos Relacionados

- [Configuração de Doações Online](./online-giving-setup.md) -- Configure o Stripe para aceitar doações
- [Registrando Doações](./recording-donations.md) -- Insira registros de doações manualmente
- [Relatórios de Doações](./donation-reports.md) -- Gere e visualize resumos de doações
- [Extratos de Doações](./giving-statements.md) -- Crie extratos de doações de fim de ano
