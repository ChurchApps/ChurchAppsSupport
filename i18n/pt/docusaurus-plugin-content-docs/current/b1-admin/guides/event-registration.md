---
title: "Guia: Configurando a Inscrição em Eventos"
description: "Configure um formulário de inscrição em evento no B1 Admin para coletar os dados dos participantes e pagamentos opcionais, incorpore-o no site da sua igreja e acompanhe as inscrições."
---

# Configurando a Inscrição em Eventos

<div class="article-intro">

Crie um formulário de inscrição em evento, colete os dados dos participantes e pagamentos opcionais, incorpore-o no site da sua igreja e gerencie as respostas à medida que chegam. Ao final, você terá uma página de inscrição compartilhável para qualquer evento da igreja.

</div>

:::info
**Duas formas de tratar a inscrição em eventos:** este guia aborda a **inscrição por formulário** -- um formulário Independente com seu próprio link público, perguntas personalizadas e um campo de pagamento opcional. Para um evento no seu calendário, você pode usar, em vez disso, a **inscrição em evento** integrada ao calendário -- veja [Criando Calendários](../calendars/creating-calendars.md#enabling-event-registration). Ela permite que os membros se inscrevam diretamente pelo [B1.church ou pelo Aplicativo B1](../../b1-church/events/registering.md), com capacidade, datas de abertura e encerramento, lista de espera, perguntas de inscrição opcionais de um formulário e tipos de participante com preço (veja [Inscrições Pagas](../calendars/paid-registrations.md)).
:::

<div class="prereqs">
<h4>Antes de Começar</h4>

- Conta do B1 Admin com acesso de administrador
- Para receber pagamentos: [o Stripe precisa estar configurado](../donations/online-giving-setup.md) antes

</div>

## Passo 1: Crie um Formulário Independente {#step-1-create-a-stand-alone-form}

Os formulários Independentes têm seu próprio endereço público, que qualquer pessoa pode acessar -- perfeito para inscrições em eventos.

Siga o guia [Criando Formulários](../forms/creating-forms.md) para:

1. No [menu Jump](../introduction.md#getting-around-with-the-jump-menu), escolha **Pessoas > Formulários** e clique em **Adicionar Formulário**
2. Dê ao formulário o nome do evento (por exemplo, "Inscrição no Retiro dos Homens", "Inscrição no VBS")
3. Em **Associar a**, escolha **Independente** -- isso dá ao seu formulário um endereço público próprio
4. Clique em **Salvar**

## Passo 2: Adicione as Perguntas {#step-2-add-questions}

Monte os campos que você precisa coletar dos inscritos.

Siga o guia [Criando Formulários](../forms/creating-forms.md#adding-questions) para adicionar as suas perguntas:

1. Abra o formulário, vá até a aba **Perguntas** e clique em **Adicionar Pergunta** para cada informação de que você precisa: nome, e-mail, telefone, restrições alimentares, tamanho da camiseta, contato de emergência etc.
2. Use **Múltipla escolha** para opções como preferências de refeição ou seleção de sessões
3. Para cobrar uma taxa, adicione uma pergunta de **Pagamento** e escolha o seu **Fundo** e o **Valor**

:::warning
O tipo de campo Pagamento exige que o Stripe esteja configurado. Se você ainda não configurou as doações online, veja [Configuração de Doações Online](../donations/online-giving-setup.md) antes de adicionar campos de pagamento.
:::

## Passo 3: Configure as Opções do Formulário {#step-3-configure-form-settings}

Controle quando e como o seu formulário de inscrição fica disponível. Siga a seção [Configurando as Propriedades do Formulário](../forms/creating-forms.md#configuring-form-properties) para:

1. Clicar em **Editar formulário** e, se a inscrição deve ficar aberta apenas por um período limitado, definir **Definir período de disponibilidade do formulário** como **Sim** e escolher as datas de início e de término
2. Copiar o **endereço público** exibido no lado esquerdo da página do formulário -- você pode compartilhá-lo diretamente. Clique em **QR Code** ao lado do formulário na lista de Formulários para baixar um QR code para folhetos e slides
3. Na aba **Membros do formulário**, adicione pessoas como **Administrador** ou **Somente visualização** para ajudar a gerenciar as respostas, e ative **Notificação por e-mail** para quem deve receber um e-mail a cada nova inscrição

## Passo 4: Incorpore no Seu Site {#step-4-embed-on-your-website}

Facilite a localização do formulário de inscrição adicionando-o ao site da sua igreja.

Siga o guia [Editor de Páginas](../website/page-editor.md) para:

1. Abrir uma página no editor do seu site B1 e clicar em **Adicionar Conteúdo**
2. Arrastar o elemento **Formulário** para uma seção e escolher o seu formulário de inscrição

:::tip
Compartilhe também o endereço público do formulário por e-mail, redes sociais e boletins da igreja -- quanto mais lugares ele estiver visível, mais inscrições você receberá.
:::

## Passo 5: Gerencie as Respostas {#step-5-manage-submissions}

Acompanhe as inscrições à medida que chegam e exporte os dados quando precisar.

Siga o guia [Gerenciando Respostas](../forms/managing-submissions.md) para:

1. Revisar as respostas à medida que chegam, na aba **Respostas do formulário**
2. Clicar em **Exportar** para baixar um CSV para planilhas, controle de contagem de pessoas ou para compartilhar com os coordenadores do evento

## Pronto! {#youre-done}

A sua inscrição em evento está no ar. Compartilhe o link, incorpore-o no seu site e acompanhe as inscrições pelo B1 Admin. Quando o evento terminar, exporte a lista final para os seus registros.

## Artigos Relacionados {#related-articles}

- [Criando Formulários](../forms/creating-forms.md) — crie formulários com diferentes tipos de campo
- [Gerenciando Respostas](../forms/managing-submissions.md) — revise e exporte as respostas dos formulários
- [Editor de Páginas](../website/page-editor.md) — incorpore formulários no seu site
- [Configuração de Doações Online](../donations/online-giving-setup.md) — necessária para os campos de pagamento
