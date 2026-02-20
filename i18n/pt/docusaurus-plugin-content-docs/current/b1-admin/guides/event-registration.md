---
title: "Guia: Configurar Inscrição em Eventos"
---

# Configurar Inscrição em Eventos

<div class="article-intro">

Crie um formulário de inscrição para eventos, colete informações dos participantes e pagamentos opcionais, incorpore-o no site da sua igreja e gerencie as inscrições conforme chegam. No final, você terá uma página de inscrição compartilhável para qualquer evento da igreja.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta B1 Admin com acesso de administrador
- Para coletar pagamentos: [Stripe deve estar configurado](../donations/online-giving-setup.md) primeiro

</div>

## Passo 1: Crie um Formulário Independente

Formulários Independentes possuem sua própria URL pública que qualquer pessoa pode acessar — perfeito para inscrição em eventos.

Siga o guia [Criando Formulários](../forms/creating-forms.md) para:

1. Navegue até Formulários e clique em Adicionar Formulário
2. Escolha o tipo "Stand Alone" — isso dá ao seu formulário sua própria URL pública
3. Nomeie-o com o nome do evento (ex.: "Inscrição Retiro Masculino", "Inscrição EBF")

## Passo 2: Adicione Perguntas

Monte os campos necessários para coletar informações dos inscritos.

Siga o guia [Criando Formulários](../forms/creating-forms.md#adding-questions) para adicionar suas perguntas:

1. Vá para a aba Perguntas e adicione campos para as informações necessárias: nome, e-mail, telefone, restrições alimentares, tamanho de camiseta, contato de emergência, etc.
2. Use Múltipla Escolha para opções como preferências de refeição ou seleção de sessões

:::warning
O tipo de campo Pagamento requer que o Stripe esteja configurado. Se você ainda não configurou as doações online, consulte [Configuração de Doações Online](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Passo 3: Configure as Definições do Formulário

Controle quando e como seu formulário de inscrição está disponível.

1. Defina datas de disponibilidade se a inscrição deve estar aberta apenas por tempo limitado
2. Copie a URL pública — você pode compartilhá-la diretamente
3. Adicione membros do formulário com funções de Admin ou Somente Visualização para ajudar a gerenciar as inscrições

## Passo 4: Incorpore no Seu Site

Torne o formulário de inscrição fácil de encontrar adicionando-o ao site da sua igreja.

Siga o guia [Gerenciando Páginas](../website/managing-pages.md) para:

1. No editor do seu site B1, adicione uma nova seção a uma página e selecione o elemento Formulário
2. Escolha seu formulário de inscrição da lista

:::tip
Compartilhe a URL independente também por e-mail, redes sociais e boletins da igreja — quanto mais lugares for visível, mais inscrições você receberá.
:::

## Passo 5: Gerencie as Inscrições

Acompanhe as inscrições conforme chegam e exporte os dados quando precisar.

Siga o guia [Gerenciando Inscrições](../forms/managing-submissions.md) para:

1. Revise as respostas conforme chegam na aba Inscrições
2. Exporte para CSV para planilhas, contagem de participantes ou compartilhamento com coordenadores do evento

## Pronto!

Sua inscrição para o evento está ativa. Compartilhe o link, incorpore-o no seu site e acompanhe as inscrições pelo B1 Admin. Quando o evento terminar, exporte a lista final para seus registros.

## Artigos Relacionados

- [Criando Formulários](../forms/creating-forms.md) — crie formulários com diferentes tipos de campo
- [Gerenciando Inscrições](../forms/managing-submissions.md) — revise e exporte respostas de formulários
- [Gerenciando Páginas](../website/managing-pages.md) — incorpore formulários no seu site
- [Configuração de Doações Online](../donations/online-giving-setup.md) — necessário para campos de pagamento
