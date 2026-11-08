---
title: "Concluindo o Check-in"
description: "Finalize o check-in de uma família no quiosque do B1 Checkin, incluindo limites de salas, impressão de etiquetas, códigos de segurança para retirada e o que o aplicativo faz em seguida."
---

# Concluindo o Check-in

<div class="article-intro">

Depois de revisar sua família e fazer as atribuições de grupo necessárias, você está pronto para finalizar o check-in. Esta é a última etapa fluxo do quiosque: o aplicativo envia a presença, imprime as etiquetas e se reinicia para a próxima família.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- [Revise sua família](./household-review.md) na tela de revisão da família
- [Atribua grupos](./group-assignment.md) a qualquer membro da família que precise fazer check-in em uma turma ou programa específico
- Opcionalmente, [adicione visitantes](./adding-guests.md) que estejam acompanhando sua família

</div>

## Como Fazer o Check-in

1. Na **tela de revisão da família**, toque no botão **Check-in** na parte inferior da tela.
2. O aplicativo envia os dados de presença ao servidor e exibe uma **tela de sucesso** com uma marca de verificação verde e uma mensagem de boas-vindas.

É só isso. A presença da sua família foi registrada.

Se alguma pessoa selecionada já tiver feito check-in neste culto hoje, uma janela **Já Fez Check-in** aparece primeiro e indica quem são essas pessoas. Toque em **Fazer Check-in Novamente** para salvar as novas escolhas de grupo, ou em **Cancelar** para voltar à tela da família.

## Salas Lotadas e Proporção de Voluntários

Se sua igreja tiver configurado [limites de segurança](../../b1-admin/attendance/checkin-safety.md) nas salas, o servidor os verifica antes de salvar:

- Se uma sala selecionada estiver **lotada ou fechada**, o check-in não é concluído e o aplicativo indica o nome da sala para que você possa escolher outra.
- Se o horário do culto tiver um [cronograma de check-in](../../b1-admin/attendance/setup.md#setting-a-check-in-schedule) e a janela de check-in não estiver aberta no momento, o check-in nas salas desse horário também é recusado. A tela **Ainda não é possível fazer check-in** lista a sala com o motivo "o check-in não está aberto no momento"; toque em **Alterar Salas** para escolher outro horário ou grupo. (Horários de culto já encerrados aparecem como **Fechado** na [tela da família](./household-review.md) e não podem ser selecionados; por isso, você normalmente só verá isso se uma janela for encerrada durante um check-in.)
- Uma família que fez check-in para um horário de culto anterior pode voltar mais tarde e adicionar um horário de culto aberto, mesmo depois que a janela anterior tiver sido encerrada. Os check-ins existentes são mantidos e não fazem com que o novo check-in seja recusado.
- Se uma sala infantil estiver **com falta de voluntários** para cumprir a proporção, o aplicativo exibe um aviso que um membro da equipe pode confirmar para prosseguir, ou bloqueia o check-in por completo, dependendo de como sua igreja configurou a aplicação da proporção.

## Impressão de Etiquetas

Se houver uma impressora de rede configurada, o aplicativo imprime as etiquetas automaticamente após o check-in:

- **Etiquetas com nome** são impressas para cada pessoa atribuída a um grupo que tenha a opção **Imprimir Crachá** ativada. As etiquetas incluem o nome da pessoa, a atribuição de grupo e as informações de alergias ou observações, se houver algum registro.
- **Comprovantes de retirada pelos pais** são impressos quando qualquer pessoa com check-in estiver em um grupo que tenha a opção **Retirada pelos Pais** ativada. Pessoas com check-in como **Voluntário** são ignoradas; assim, um cuidador que atua em uma sala com Retirada pelos Pais não recebe um comprovante. O comprovante lista as crianças, suas atribuições de grupo e um **código de segurança de 4 caracteres** exclusivo.

:::info
O mesmo código de segurança aparece na etiqueta com nome da criança e no comprovante de retirada dos pais. No momento da retirada, os voluntários comparam os códigos para confirmar que o adulto correto está buscando cada criança.
:::

O código de segurança é gerado novo a cada check-in e usa apenas consoantes e dígitos (as vogais são excluídas para evitar a formação de palavras inadequadas).

:::warning
Se as etiquetas não forem impressas, abra as Configurações de Administrador tocando no **logotipo da igreja** sete vezes e, em seguida, toque em **Alterar Impressora** para verificar a conexão com a impressora. Consulte [Configuração da Impressora](../getting-started/printer-setup.md) para ver as etapas de solução de problemas.
:::

## O Que Acontece Depois do Check-in

- Se uma impressora estiver configurada, o aplicativo imprime todas as etiquetas e depois retorna automaticamente à **tela de busca**, pronto para a próxima família.
- Se nenhuma impressora estiver configurada, o aplicativo também retorna automaticamente à **tela de busca**.

Em ambos os casos, a tela de sucesso permanece visível por pelo menos 6 segundos a partir do momento em que aparece (8 segundos quando estiver comemorando o marco de presença de alguém), para que as famílias vejam que o check-in funcionou. Se a impressão demorar mais do que isso, o aplicativo retorna cerca de um segundo e meio após o término da impressão.

Você não precisa tocar em nada para voltar à tela de busca; o aplicativo faz a transição automaticamente. Quando a tela estiver visível por um momento, você pode tocá-la para retornar imediatamente; um toque no primeiro segundo e meio é ignorado, portanto um toque duplo rápido em **Check-in** não pula essa tela.

:::tip
O aplicativo se reinicia completamente após cada check-in, portanto não há risco de uma família ver as informações de outra.
:::

## O Que É Registrado

Quando você toca em **Check-in**, o aplicativo envia ao servidor, para cada membro da família que tenha uma atribuição de grupo:

- A **pessoa** que está fazendo check-in
- O **culto** do qual ela participa
- O **horário do culto** e o **grupo** aos quais ela está atribuída

Esses dados aparecem no B1 Admin, na seção de Presença, onde os administradores da igreja podem visualizar e gerenciar os registros de presença. Consulte o [guia de administração do check-in](../../b1-admin/attendance/check-in.md) para mais detalhes.
