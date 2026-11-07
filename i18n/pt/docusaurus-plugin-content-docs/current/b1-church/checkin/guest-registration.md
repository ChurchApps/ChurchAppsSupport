---
title: "Cadastro de visitantes"
description: "Cadastre você e sua família como visitantes pela primeira vez com o formulário QR do B1 Checkin, para que os voluntários possam fazer seu check-in na chegada."
---

# Cadastro de visitantes

<div class="article-intro">

Se você está visitando uma igreja pela primeira vez, pode se cadastrar como visitante, junto com a sua família, usando a página de cadastro de visitantes. Isso cria um registro no sistema da igreja para que os voluntários possam fazer o seu check-in quando você chegar.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- A sua igreja precisa ter o cadastro de visitantes por QR code ativado. Se não estiver, a página mostra "O cadastro de visitantes não está ativado para esta igreja."
- Escaneie o QR code exibido no quiosque de check-in, toque em **Cadastrar aqui** no quiosque ou receba um link de um voluntário da igreja

</div>

## Como funciona o cadastro de visitantes

O cadastro de visitantes foi pensado para visitantes que ainda não têm uma conta. No quiosque de check-in da igreja, toque em **Cadastrar como visitante** para exibir um QR code que leva à página de cadastro. Você também pode receber o link de um voluntário ou recepcionista, ou encontrá-lo em um panfleto ou no site da igreja.

Não tem o celular à mão? Na mesma janela do QR code do quiosque, toque em **Cadastrar aqui** para preencher o formulário no próprio quiosque. Veja [Cadastrando-se como visitante](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest) para saber como isso funciona no quiosque.

A página abre com o título **Cadastro de visitantes**. Se a igreja tiver adicionado uma foto de cabeçalho, ela aparece no topo da página; caso contrário, você verá um pequeno ícone.

## Cadastrando a sua família

1. **Escaneie o QR code** no quiosque de check-in ou abra o link de cadastro de visitantes no seu celular. (Se você tocou em **Cadastrar aqui** no quiosque, o formulário já está aberto.)
2. Preencha o cartão do **Contato principal**. **Nome** e **Sobrenome** são sempre obrigatórios. Dependendo do que a sua igreja pede, você também pode ver:
   - **E-mail** e **Telefone**
   - **Estado civil**
   - **Endereço residencial** -- **Endereço**, **Complemento**, **Cidade**, **Estado** e **CEP**. Este dado é compartilhado por toda a família.
3. O formulário começa com um segundo cartão, para o **Membro da família 2**. Informe o nome e o sobrenome dele, ou toque no **X** no canto do cartão para removê-lo se estiver se cadastrando sozinho.
4. Para incluir mais pessoas, toque em **Adicionar membro da família**. O novo cartão preenche automaticamente o sobrenome do contato principal. Você pode cadastrar até 10 pessoas de uma vez.
5. Se a sua igreja pedir, o cartão de cada pessoa também pode incluir **Data de nascimento**, **Gênero** e **Série**.
6. Se a sua igreja incluir uma caixa de **Comentários** abaixo dos membros da família, use-a para compartilhar o que quiser que a igreja saiba (até 1.000 caracteres).
7. Toque em **Cadastrar** para enviar.

Os campos marcados com um asterisco (`*`) são obrigatórios. Se algum estiver em branco, o formulário mostra "Preencha todos os campos obrigatórios." e nada é enviado até que você os preencha.

## Depois do cadastro

Depois que você envia o formulário, aparece uma tela de confirmação com a mensagem: "Cadastro concluído -- Está tudo certo! Um membro da equipe fará o seu check-in em breve."

O seu cadastro cria registros no banco de dados da igreja:

- Um **domicílio** é criado com o sobrenome do contato principal, tendo o contato principal como chefe do domicílio.
- São criados **registros de pessoa** para cada membro da família, com a situação de membro "Visitante".
- Quaisquer comentários que você informou são salvos como uma nota no registro do contato principal, para que a equipe da igreja possa lê-los.
- Se a igreja tiver escolhido um grupo para os novos visitantes, a sua família é adicionada a ele. A igreja também pode registrar a sua presença automaticamente, caso você se cadastre durante um dos horários agendados desse grupo.
- Um voluntário ou administrador da igreja pode então fazer o check-in da sua família pelo quiosque do [B1 Checkin](../../b1-checkin/check-in/looking-up-members.md).

:::info
Se você se cadastrar novamente com o mesmo primeiro nome e o mesmo e-mail ou telefone, os registros da igreja reconhecem você e reutilizam o seu perfil existente, em vez de criar uma duplicata. Qualquer outra pessoa é adicionada como nova. Se você já se cadastrou, também pode simplesmente pesquisar o seu nome ou número de telefone no quiosque.
:::

:::tip
Se o formulário pedir o seu endereço de e-mail, informá-lo ajuda a igreja a fazer o acompanhamento depois da sua visita.
:::

## Artigos relacionados

- [Self check-in](./self-checkin.md) -- Faça o seu próprio check-in depois de se cadastrar
- [Adicionando visitantes (quiosque)](../../b1-checkin/check-in/adding-guests.md) -- Como os voluntários adicionam visitantes no quiosque
- [Check-in](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- Como os administradores da igreja configuram o cadastro de visitantes por QR code
