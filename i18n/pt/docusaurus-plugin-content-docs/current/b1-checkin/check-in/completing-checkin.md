---
title: "Concluindo o Check-In"
---

# Concluindo o Check-In

<div class="article-intro">

Depois de revisar sua família e fazer as designações de grupo necessárias, você está pronto para finalizar o check-in. Esta é a última etapa do fluxo do quiosque -- o aplicativo envia a presença, imprime as etiquetas e reinicia para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Revise sua família](./household-review) na tela de revisão da família
- [Designe grupos](./group-assignment) para quaisquer membros da família que precisem fazer check-in em uma classe ou programa específico
- Opcionalmente, [adicione qualquer convidado](./adding-guests) que esteja visitando com sua família

</div>

## Como Fazer o Check-In

1. Na **tela de revisão da família**, toque no botão **Check-in** na parte inferior da tela.
2. O aplicativo envia os dados de presença ao servidor e exibe uma **tela de sucesso** com uma marca de verificação verde e uma mensagem de boas-vindas.

É só isso que é preciso. A presença da sua família foi registrada.

## Salas Cheias e Proporções de Voluntários

Se sua igreja configurou [limites de segurança](../../b1-admin/attendance/checkin-safety) para suas salas, o servidor os verifica antes de salvar:

- Se uma sala selecionada estiver **cheia ou fechada**, o check-in não é concluído e o aplicativo indica o nome da sala para que você possa escolher outra.
- Se uma sala infantil estiver **com poucos voluntários** para sua proporção, o aplicativo exibe um aviso que um membro da equipe pode confirmar para prosseguir, ou bloqueia o check-in completamente — dependendo de como sua igreja configurou a aplicação da proporção.

## Impressão de Etiquetas

Se uma impressora de rede estiver configurada, o aplicativo imprime automaticamente as etiquetas após o check-in:

- **Etiquetas de nome** são impressas para cada pessoa que é designada a um grupo que tenha a configuração **Imprimir Etiqueta de Nome** ativada. As etiquetas de nome incluem o nome da pessoa, sua designação de grupo e informações de alergia/observações, se houver registro.
- **Comprovantes de retirada dos pais** são impressos quando qualquer pessoa com check-in feito está em um grupo que tenha a configuração **Retirada pelos Pais** ativada. O comprovante de retirada lista as crianças, suas designações de grupo e um **código de segurança exclusivo de 4 caracteres**.

:::info
O mesmo código de segurança aparece tanto na etiqueta de nome da criança quanto no comprovante de retirada dos pais. No momento da retirada, os voluntários comparam os códigos para verificar se o adulto correto está buscando cada criança.
:::

O código de segurança é gerado de forma exclusiva para cada check-in e usa apenas consoantes e dígitos (as vogais são excluídas para evitar a formação de palavras inadequadas).

:::warning
Se as etiquetas não forem impressas, abra as Configurações de Administrador tocando no **logotipo da igreja** sete vezes, depois toque em **Alterar Impressora** para verificar a conexão da impressora. Veja [Configuração da Impressora](../getting-started/printer-setup) para etapas de solução de problemas.
:::

## O Que Acontece Depois do Check-In

- Se uma impressora estiver configurada, o aplicativo imprime todas as etiquetas e depois retorna automaticamente à **tela de busca**, pronto para a próxima família.
- Se nenhuma impressora estiver configurada, a tela de sucesso é exibida por alguns segundos e depois retorna automaticamente à **tela de busca**.

Você não precisa tocar em nada para voltar à tela de busca -- o aplicativo faz a transição automaticamente.

:::tip
O aplicativo é reiniciado completamente após cada check-in, então não há risco de uma família ver as informações de outra família.
:::

## O Que É Registrado

Ao tocar em **Check-in**, o aplicativo envia o seguinte ao servidor para cada membro da família que possui uma designação de grupo:

- A **pessoa** que está fazendo check-in
- O **culto** que está frequentando
- O **horário de culto** e o **grupo** aos quais está designada

Esses dados aparecem no B1 Admin, na seção Presença, onde os administradores da sua igreja podem visualizar e gerenciar os registros de presença. Veja o [guia de administração de check-in](../../b1-admin/attendance/check-in.md) para mais detalhes.
