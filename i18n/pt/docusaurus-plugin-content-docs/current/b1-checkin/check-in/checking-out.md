---
title: "Saída e Segurança da Criança"
description: "Faça o check-out de crianças em uma estação do B1 Checkin com códigos de segurança, pessoas autorizadas verificadas, chamadas aos pais e reimpressão de etiquetas, além de transmissões de emergência."
---

# Saída e Segurança da Criança {#checking-out--child-safety}

<div class="article-intro">

O check-out fecha o ciclo do check-in infantil: um dos pais apresenta o código de segurança da etiqueta de retirada, o quiosque verifica quem está retirando e as crianças recebem o check-out. Estações gerenciadas também oferecem ferramentas de segurança -- verificação de pessoas autorizadas para retirada, mensagens de chamada aos pais, reimpressão de etiquetas de segurança e uma transmissão de emergência.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- O check-out está disponível em estações configuradas no modo **manned** nas configurações de administrador do quiosque
- As crianças devem ter feito o [check-in](./completing-checkin.md) com uma etiqueta de retirada impressa contendo o código de segurança
- A chamada aos pais e as transmissões de emergência exigem que a sua igreja tenha um provedor de mensagens de texto conectado no B1 Admin

</div>

## Iniciando um check-out {#starting-a-check-out}

1. Em uma estação gerenciada, toque em **Check Out** na tela de busca.
2. Digite o **security code** de 4 caracteres da etiqueta de retirada da família. Você pode digitá-lo, usar o teclado na tela ou escanear o código de barras da etiqueta com um leitor USB ou Bluetooth -- o código é enviado automaticamente assim que os 4 caracteres são digitados.
   - Sem leitor? Toque em **Scan** abaixo do campo do código para usar a câmera do tablet. Segure o QR code ou o código de barras da etiqueta de retirada em frente à câmera, na janela **Scan pickup code**, e o código será digitado para você. A câmera traseira é usada por padrão; toque no botão de inverter para trocar de câmera, ou toque em **Cancel** para voltar a digitar.
3. O quiosque mostra as crianças com check-in feito sob aquele código.

### Encontrando uma família sem o código {#finding-a-family-without-the-code}

Se o responsável perdeu a etiqueta de retirada, procure a família:

1. Na tela **Check Out**, toque em **Search by name** (ao lado de **Scan**).
2. Digite o sobrenome da família e toque em **Search**, ou toque em **Use phone number** para digitar um número de telefone (pelo menos os últimos 4 dígitos) no teclado.
3. Toque na pessoa nos resultados. O quiosque encontra todos da família que fizeram check-in hoje e ainda não receberam check-out, e os exibe exatamente como se o código tivesse sido digitado.

Se ninguém da família tiver check-in feito, o quiosque mostra "Ninguém desta família está com check-in feito no momento." Toque em **New search** para pesquisar novamente, ou em **Enter code instead** para voltar ao campo do código.

A verificação de retirada descrita abaixo continua valendo: as pessoas autorizadas para retirada e os adultos da família são listados, e nomes não autorizados continuam bloqueados.

## Verificando quem está retirando {#verifying-who-is-picking-up}

A tela de check-out pergunta quem está retirando as crianças:

- **Trusted pickup people** da família aparecem como cartões tocáveis, com foto e parentesco -- toque na pessoa que está na sua frente.
- **Household adults** também aparecem em uma grade de fotos.
- **Other** permite digitar o nome de alguém que não está na lista.

Se um nome digitado corresponder a alguém marcado como **Not Authorized** para aquela família, o quiosque bloqueia o check-out com um aviso. Um membro da equipe pode escolher **Override** para continuar mesmo assim -- a substituição fica registrada no registro de presença com o nome da pessoa.

Quando a pessoa que retira estiver confirmada, toque em check out. O nome dela fica armazenado junto ao registro de presença.

:::info
As pessoas autorizadas e as não autorizadas para retirada são gerenciadas pela equipe da igreja na página de cada pessoa no B1 Admin -- veja [Check-In Safety](../../b1-admin/attendance/checkin-safety.md#trusted-and-not-authorized-pickup-people).
:::

## Chamando um dos pais {#paging-a-parent}

Precisa de um dos pais durante o culto -- uma troca de fralda, uma criança chorando? Na tela de check-out de uma estação gerenciada, a equipe pode enviar uma **page**: uma mensagem de texto para os pais ou responsáveis da criança, pelo provedor de mensagens da igreja. Pais que optaram por não receber mensagens ou que não têm número de celular são ignorados, e o quiosque mostra quantas mensagens foram enviadas.

## Reimprimindo etiquetas {#reprinting-labels}

Se uma etiqueta de identificação ou de retirada for perdida ou danificada, a equipe de uma estação gerenciada pode **reprint** as etiquetas da família na tela de check-out, depois de digitar o código de segurança. A reimpressão usa a mesma impressora e os mesmos modelos de etiqueta do check-in original.

## Transmissão de emergência {#emergency-broadcast}

Em uma emergência, a equipe pode enviar uma mensagem de texto aos responsáveis de **every checked-in child** do culto atual de uma só vez:

1. Abra as **admin settings** do quiosque (7 toques rápidos no logo do cabeçalho, mais o PIN, se houver um definido).
2. Toque em **Emergency broadcast**.
3. Digite a mensagem e, em seguida, digite **EMERGENCY** no campo de confirmação -- o botão **Send broadcast** permanece desativado até que você faça isso.
4. O quiosque informa quantos telefones receberam a mensagem e quantas pessoas foram ignoradas (optaram por não receber ou não têm número de celular).

:::warning
A transmissão vai para todas as famílias com check-in feito no culto selecionado. Use-a apenas em emergências reais -- evacuações, bloqueios de segurança, tempo severo.
:::

## Artigos relacionados {#related-articles}

- [Concluindo o check-in](./completing-checkin.md) -- de onde vêm os códigos de segurança e as etiquetas de retirada
- [Check-In Safety](../../b1-admin/attendance/checkin-safety.md) -- configuração de capacidades, proporções, pessoas para retirada e o requisito do provedor de mensagens de texto
- [Printer Setup](../getting-started/printer-setup.md) -- configuração da impressora de etiquetas
