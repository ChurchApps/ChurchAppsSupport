---
title: "Cadastro de visitantes"
description: "Cadastre você e a sua família como visitantes de primeira vez pelo formulário de QR code do B1 Checkin, para que os voluntários possam fazer o seu check-in quando você chegar."
---

# Cadastro de visitantes {#guest-registration}

<div class="article-intro">

Se você está visitando uma igreja pela primeira vez, pode se cadastrar e cadastrar a sua família como visitantes usando a página de cadastro de visitantes. Isso cria um registro no sistema da igreja para que os voluntários possam fazer o seu check-in quando você chegar.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- A sua igreja precisa ter o cadastro de visitantes por QR code ativado. Se não estiver, a página exibe "O cadastro de visitantes não está ativado para esta igreja."
- Escaneie o QR code exibido no quiosque de check-in, toque em **Cadastrar aqui** no quiosque ou receba um link de um voluntário da igreja

</div>

## Como funciona o cadastro de visitantes {#how-guest-registration-works}

O cadastro de visitantes foi pensado para visitantes que ainda não têm uma conta. No quiosque de check-in da igreja, toque em **Cadastrar-se como visitante** para exibir um QR code que leva à página de cadastro. Você também pode receber o link de um voluntário ou recepcionista, ou encontrá-lo em um panfleto ou no site da igreja.

Sem celular por perto? Na mesma janela do QR code, no quiosque, toque em **Cadastrar aqui** para preencher o formulário no próprio quiosque. Veja [Cadastrando-se como visitante](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest) para saber como isso funciona no quiosque.

A página abre com o título **Cadastro de visitantes**. Se a igreja tiver adicionado uma foto de cabeçalho, ela aparece no topo da página; caso contrário, você verá um pequeno ícone.

## Cadastrando a sua família {#registering-your-family}

1. **Escaneie o QR code** no quiosque de check-in ou abra o link de cadastro de visitantes no seu celular. (Se você tocou em **Cadastrar aqui** no quiosque, o formulário já está aberto.)
2. Preencha o cartão **Contato principal**. **Nome** e **Sobrenome** são sempre obrigatórios. Dependendo do que a sua igreja solicita, você também pode ver:
   - **Título** (como Mr, Mrs, Dr ou Pastor), antes do nome
   - **E-mail** e **Telefone**
   - **Estado civil**
   - **Endereço residencial** -- **Endereço**, **Complemento**, **Cidade**, **Estado** e **CEP**. Este endereço é compartilhado por toda a família.
3. O formulário começa com um segundo cartão para o **Membro da família 2**. Informe o nome e o sobrenome dele, ou toque no **X** no canto do cartão para removê-lo, caso esteja se cadastrando sozinho.
4. Para adicionar mais pessoas, toque em **Adicionar membro da família**. O novo cartão preenche automaticamente o sobrenome do contato principal para você. Você pode cadastrar até 10 pessoas de uma vez.
5. Se a sua igreja solicitar, o cartão de cada pessoa também pode incluir **Título**, **E-mail**, **Telefone**, **Data de nascimento**, **Gênero** e **Série**. Todos os cartões depois do contato principal também podem pedir um **Papel na família** -- **Cônjuge**, **Filho(a)** ou **Outro** -- para que a igreja saiba qual é a relação de cada pessoa com o contato principal.
   Se a sua igreja pedir uma foto, cada cartão tem um botão **Adicionar foto**. Toque nele, escolha ou tire uma foto, recorte-a e salve; a foto aparece no cartão. Toque em **Alterar foto** para escolher outra ou em **Remover foto** para retirá-la. A foto é salva como a foto de perfil da pessoa quando o cadastro dela é criado.
6. Se a sua igreja incluir uma caixa de **Comentários** abaixo dos membros da família, use-a para compartilhar o que quiser que a igreja saiba (até 1.000 caracteres).
7. Toque em **Cadastrar** para enviar.

Os campos marcados com um asterisco (`*`) são obrigatórios. Cada cartão precisa de nome e sobrenome -- se algum estiver faltando, o formulário exibe "Nome e sobrenome são obrigatórios para cada membro." Se algum outro campo obrigatório ficar em branco, ele exibe "Preencha todos os campos obrigatórios." Nada é enviado até que você os preencha.

## Depois de se cadastrar {#after-registering}

Assim que você envia o formulário, uma tela de confirmação aparece com a mensagem: "Cadastro concluído -- Está tudo certo! Um membro da equipe fará o seu check-in em breve."

O seu cadastro cria registros no banco de dados da igreja:

- Uma **família** é criada usando o sobrenome do contato principal, com o contato principal como chefe da família.
- São criados **registros de pessoas** para cada membro da família, com a situação de membro "Visitante". Cada membro da família recebe o papel na família que você escolheu, ou **Outro**, se nenhum tiver sido solicitado.
- Quaisquer comentários que você informou são salvos como uma nota no cadastro do contato principal, para que a equipe da igreja leia.
- Se a igreja tiver escolhido um grupo para novos visitantes, a sua família é adicionada a ele. A igreja também pode registrar a sua presença automaticamente, caso você se cadastre durante um dos horários de culto desse grupo.
- Um voluntário ou administrador da igreja pode então fazer o check-in da sua família pelo quiosque do [B1 Checkin](../../b1-checkin/check-in/looking-up-members.md).

:::info
Se você se cadastrar novamente com o mesmo primeiro nome e o mesmo e-mail ou telefone, os registros da igreja reconhecem você e reutilizam o seu perfil existente, em vez de criar um duplicado. Qualquer outra pessoa é adicionada como nova. Se você já se cadastrou, também pode simplesmente pesquisar o seu nome ou o seu telefone no quiosque.
:::

:::tip
Se o formulário pedir o seu endereço de e-mail, informá-lo ajuda a igreja a fazer um acompanhamento depois da sua visita.
:::

## Artigos relacionados {#related-articles}

- [Autoatendimento de check-in](./self-checkin.md) -- Faça o seu próprio check-in depois de se cadastrar
- [Adicionando visitantes (quiosque)](../../b1-checkin/check-in/adding-guests.md) -- Como os voluntários adicionam visitantes no quiosque
- [Check-in](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- Como os administradores da igreja configuram o cadastro de visitantes por QR code
