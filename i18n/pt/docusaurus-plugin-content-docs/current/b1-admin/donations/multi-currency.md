---
title: "Suporte a Múltiplas Moedas"
---

# Suporte a Múltiplas Moedas

<div class="article-intro">

O recurso de múltiplas moedas da B1 permite que sua igreja aceite e rastreie doações em diferentes moedas. Isso é particularmente útil para igrejas com membros internacionais, missionários ou múltiplos campi em diferentes países.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa de permissão para gerenciar doações. Consulte [Papéis e Permissões](../people/roles-permissions.md) para obter detalhes.
- Configure seu [doação online](./online-giving-setup.md) com Stripe, que suporta transações em múltiplas moedas.
- Compreenda as necessidades contábeis de sua igreja para lidar com múltiplas moedas.

</div>

## Habilitando Múltiplas Moedas

O suporte a múltiplas moedas agora está habilitado por padrão na B1. Uma vez habilitado:

- Os membros podem contribuir em sua moeda local ao fazer doações online
- Você pode registrar manualmente doações em qualquer moeda
- Os relatórios de doações mostram valores em sua moeda original
- Stripe lida automaticamente com a conversão de moeda para doações online

## Moedas Suportadas

O sistema suporta todas as principais moedas do mundo, incluindo:

- **USD** -- Dólar dos Estados Unidos
- **EUR** -- Euro
- **GBP** -- Libra Esterlina
- **CAD** -- Dólar Canadense
- **AUD** -- Dólar Australiano
- **MXN** -- Peso Mexicano
- **BRL** -- Real Brasileiro
- **INR** -- Rupia Indiana
- **CNY** -- Yuan Chinês
- **JPY** -- Iene Japonês
- E muitos outros...

As moedas disponíveis para doação online dependem das moedas suportadas pela sua conta Stripe.

## Registrando Doações em Diferentes Moedas

### Doações Online

Quando um membro faz uma doação online através do Stripe:

1. Ele seleciona sua moeda preferida no checkout
2. Stripe processa o pagamento nessa moeda
3. A doação é registrada na B1 com o valor em moeda original
4. Stripe trata automaticamente qualquer conversão de moeda necessária para a moeda padrão da sua conta

### Entrada Manual

Para registrar uma doação em dinheiro ou cheque em uma moeda diferente:

1. Navegue até **Doações** na B1 Admin
2. Clique em **Adicionar Doação**
3. Selecione a moeda no menu suspenso de moeda
4. Digite o valor nessa moeda
5. Complete o resto dos detalhes da doação
6. Clique em **Salvar**

## Visualizando Doações em Múltiplas Moedas

### Relatórios de Doações

Os relatórios de doações exibem valores em sua moeda original:

- Os registros de doações individuais mostram o código de moeda (por exemplo, "$100.00 USD")
- Os totais são calculados por moeda
- Você pode filtrar por moedas específicas

### Extratos de Doações

Ao gerar extratos de doações:

- Cada doação aparece com sua moeda original
- Os totais são divididos por moeda
- Os membros veem exatamente quanto doaram em cada moeda

## Integração Stripe

Para doações online, o Stripe lida com transações em múltiplas moedas:

- **Conversão automática** -- Stripe converte moedas para a moeda padrão da sua conta
- **Taxas de câmbio** -- Stripe usa as taxas de câmbio de mercado atual
- **Taxas** -- A conversão de moeda pode incorrer em taxas adicionais do Stripe
- **Moeda de depósito** -- Os fundos são depositados na moeda padrão da sua conta

:::info
Verifique seu painel do Stripe para ver as taxas de câmbio atuais e qualquer taxa associada a transações em múltiplas moedas.
:::

## Considerações Contábeis

Ao trabalhar com múltiplas moedas:

- **Manutenção de registros** -- Mantenha o controle dos valores de doações originais e moedas para relatórios precisos
- **Taxas de câmbio** -- Observe que as taxas de conversão do Stripe podem diferir das taxas do seu banco
- **Recibos fiscais** -- Consulte seu contador sobre como informar doações em diferentes moedas para fins fiscais
- **Alocação de fundos** -- Você pode alocar doações a fundos específicos independentemente da moeda

## Melhores Práticas

- **Moeda padrão** -- Defina sua moeda primária de igreja como padrão para a maioria das transações
- **Comunicação clara** -- Informe aos doadores qual moeda eles estão usando durante o processo de checkout
- **Relatórios consistentes** -- Decida se deseja relatar em moedas originais ou converter para uma única moeda para resumos
- **Reconciliação regular** -- Reconcilie os pagamentos do Stripe com seus registros de doações, contabilizando conversões de moeda

## Limitações

- A conversão de moeda é tratada apenas pelo Stripe para doações online
- As doações manuais são registradas conforme inseridas sem conversão automática
- Os relatórios históricos mostram doações em suas moedas originais
- Os cálculos de totais são feitos por moeda, não entre moedas

## Artigos Relacionados

- [Configuração de Doação Online](./online-giving-setup.md) -- Configure o Stripe para aceitar doações
- [Registrando Doações](./recording-donations.md) -- Insira manualmente registros de doações
- [Relatórios de Doações](./donation-reports.md) -- Gere e visualize resumos de doações
- [Extratos de Doações](./giving-statements.md) -- Crie extratos anuais de doações
