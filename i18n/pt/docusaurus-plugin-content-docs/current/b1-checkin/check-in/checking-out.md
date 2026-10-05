---
title: "Saída e Segurança da Criança"
---

# Saída e Segurança da Criança

<div class="article-intro">

Check-out fecha o ciclo de check-in infantil: um pai apresenta o código de segurança de seu rótulo de retirada, o quiosque verifica quem está retirando, e as crianças são feitas check-out. Estações gerenciadas também obtêm ferramentas de segurança -- verificação de retirada confiável, textos de página de pai, reimpressões de rótulo de segurança e uma transmissão de emergência.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Check-out está disponível em estações definidas para modo **manned** nas configurações de admin do quiosque
- As crianças devem ter sido [checked in](./completing-checkin) com um rótulo de retirada impresso carregando o código de segurança
- Paging e transmissões de emergência requerem que sua igreja tenha um provedor de textos conectado no B1 Admin

</div>

## Iniciando um Check-Out

1. Em uma estação gerenciada, toque em **Check Out** na tela de busca.
2. Digite o **security code** de 4 caracteres do rótulo de retirada da família. Você pode digitá-lo, usar o teclado na tela ou escanear o código de barras do rótulo com um scanner USB ou Bluetooth -- o código é enviado automaticamente uma vez que todos os 4 caracteres são digitados.
   - Sem scanner? Toque em **Scan** abaixo do campo de código para usar a câmera do tablet em seu lugar. Segure o código QR ou código de barras do rótulo de retirada até a câmera na janela **Scan pickup code** e o código é digitado para você. A câmera traseira é usada por padrão; toque no botão de flip para trocar câmeras, ou toque em **Cancel** para voltar a digitar.
3. O quiosque mostra as crianças registradas sob aquele código.

## Verificando Quem Está Retirando

A tela de check-out pergunta quem está retirando as crianças:

- **Trusted pickup people** para a família aparecem como cartões tocáveis com sua foto e relacionamento -- toque a pessoa na sua frente.
- **Household adults** também aparecem em uma grade de fotos.
- **Other** permite que você digite um nome para alguém não na lista.

Se um nome digitado corresponder a alguém marcado como **Not Authorized** para aquela família, o quiosque bloqueia o check-out com um aviso. Um membro da equipe pode escolher **Override** para continuar mesmo assim -- o override é registrado no registro de comparecimento com o nome da pessoa.

Uma vez que o quem está retirando é confirmado, toque em check out. O nome da pessoa de retirada é armazenado com o registro de comparecimento.

:::info
Pessoas confiáveis de retirada e não autorizadas são gerenciadas pela equipe da igreja na página de cada pessoa no B1 Admin -- consulte [Check-In Safety](../../b1-admin/attendance/checkin-safety#trusted-and-not-authorized-pickup-people).
:::

## Paging de um Pai

Precisa de um pai durante o serviço -- uma mudança de fralda, uma criança chorando? Da tela de check-out em uma estação gerenciada, a equipe pode enviar um **page**: uma mensagem de texto para os pais ou guardiões da criança através do provedor de textos da igreja. Pais que optaram por sair de textos ou não têm número móvel são pulados, e o quiosque mostra quantas mensagens foram enviadas.

## Reimprimindo Rótulos

Se um nome ou rótulo de retirada for perdido ou danificado, a equipe em uma estação gerenciada pode **reprint** os rótulos da família da tela de check-out após digitar o código de segurança. A reimpressão usa a mesma impressora e modelos de rótulo como o check-in original.

## Transmissão de Emergência

Em uma emergência, a equipe pode enviar um texto aos guardiões de **every checked-in child** para o serviço atual de uma vez:

1. Abra as **admin settings** do quiosque (7 toques rápidos no logo do cabeçalho, mais o PIN se um for definido).
2. Toque em **Emergency broadcast**.
3. Digite a mensagem, depois digite **EMERGENCY** no campo de confirmação -- o botão **Send broadcast** permanece desativado até que você o faça.
4. O quiosque relata quantos telefones receberam a mensagem e quantas pessoas foram puladas (optaram por sair ou não têm número móvel).

:::warning
A transmissão vai para toda família de check-in para o serviço selecionado. Use para emergências genuínas -- evacuações, lockdowns, tempo severo.
:::

## Artigos Relacionados

- [Completing Check-In](./completing-checkin) — de onde códigos de segurança e rótulos de retirada vêm
- [Check-In Safety](../../b1-admin/attendance/checkin-safety) -- configurando capacidades, proporções, pessoas de retirada e o requisito de provedor de textos
- [Printer Setup](../getting-started/printer-setup) -- configuração de impressora de rótulo
