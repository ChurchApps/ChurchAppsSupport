---
title: "Completando o Check-In"
---

# Completando o Check-In

<div class="article-intro">

Depois de revisar sua família e fazer as atribuições de grupos necessárias, você está pronto para finalizar o check-in. Esta é a última etapa do fluxo de trabalho do quiosque -- o aplicativo envia presença, imprime rótulos e redefine para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Revise sua família](./household-review) na tela de revisão da família
- [Atribua grupos](./group-assignment) a qualquer membro da família que precise fazer check-in em uma classe ou programa específico
- Opcionalmente [adicione quaisquer hóspedes](./adding-guests) que estejam visitando com sua família

</div>

## Como Fazer Check-In

1. Na **tela de revisão da família**, toque no botão **Check-In** na parte inferior da tela.
2. O aplicativo envia os dados de presença para o servidor e mostra uma **tela de sucesso** com uma marca de seleção verde e uma mensagem de boas-vindas.

É tudo o que é necessário. A presença de sua família foi registrada.

## Salas Cheias e Proporções de Voluntários

Se sua igreja configurou [limites de segurança](../../b1-admin/attendance/checkin-safety) em suas salas, o servidor verifica antes de salvar:

- Se uma sala selecionada estiver **cheia ou fechada**, o check-in não passa e o aplicativo nomeia a sala para que você possa escolher outra.
- Se uma sala infantil estiver **com falta de voluntários** para sua proporção, o aplicativo mostra um aviso que um membro da equipe pode confirmar para prosseguir, ou bloqueia completamente o check-in -- dependendo de como sua igreja configurou a aplicação de proporção.

## Impressão de Rótulos

Se uma impressora de rede estiver configurada, o aplicativo imprime automaticamente rótulos após o check-in:

- **Rótulos de nome** são impressos para cada pessoa que é atribuída a um grupo que tem a configuração **Imprimir Crachá de Nome** ativada. Os rótulos de nome incluem o nome da pessoa, sua atribuição de grupo e informações de alergias/notas se houver algo registrado.
- **Recibos de retirada dos pais** são impressos quando qualquer pessoa verificada estiver em um grupo que tenha a configuração **Retirada pelos Pais** ativada. O recibo de retirada lista as crianças, suas atribuições de grupo e um **código de segurança de 4 caracteres** exclusivo.

:::info
O mesmo código de segurança aparece tanto no rótulo de nome da criança quanto no recibo de retirada dos pais. No momento da retirada, os voluntários combinam os códigos para verificar se o adulto certo está pegando cada criança.
:::

O código de segurança é gerado novo para cada check-in e usa apenas consoantes e dígitos (as vogais são excluídas para evitar formar palavras inapropriadas).

:::warning
Se os rótulos não forem impressos, abra as Configurações de Admin tocando no **logotipo da igreja** sete vezes, depois toque em **Alterar Impressora** para verificar a conexão da impressora. Veja [Configuração de Impressora](../getting-started/printer-setup) para etapas de solução de problemas.
:::

## O Que Acontece Após o Check-In

- Se uma impressora estiver configurada, o aplicativo imprime todos os rótulos e depois retorna automaticamente à **tela de busca**, pronto para a próxima família.
- Se nenhuma impressora estiver configurada, a tela de sucesso é exibida por alguns segundos e depois retorna automaticamente à **tela de busca**.

Você não precisa tocar em nada para voltar à tela de busca -- o aplicativo trata a transição automaticamente.

:::tip
O aplicativo é completamente redefinido após cada check-in, portanto não há risco de uma família ver as informações de outra família.
:::

## O Que É Registrado

Quando você toca em **Check-In**, o aplicativo envia o seguinte para o servidor para cada membro da família que tenha uma atribuição de grupo:

- A **pessoa** sendo verificada
- O **serviço** que está frequentando
- A **hora do serviço** e o **grupo** ao qual está atribuído

Esses dados aparecem no B1 Admin na seção Presença, onde os administradores da sua igreja podem ver e gerenciar registros de presença. Veja o [guia de administração de check-in](../../b1-admin/attendance/check-in.md) para detalhes.
