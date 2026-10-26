---
title: "Cadastro de visitante"
---

# Cadastro de visitante

<div class="article-intro">

Se você está visitando uma igreja pela primeira vez, pode se cadastrar, junto com a sua família, como visitante usando a página de cadastro de visitantes. Isso cria um registro no sistema da igreja para que os voluntários possam fazer o check-in de vocês quando chegarem.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- A sua igreja precisa ter o cadastro de visitantes por QR code ativado. Se não estiver, a página exibe "O cadastro de visitantes não está ativado para esta igreja."
- Escaneie o QR code exibido no quiosque de check-in, toque em **Cadastrar aqui** no quiosque ou receba um link de um voluntário da igreja

</div>

## Como funciona o cadastro de visitantes

O cadastro de visitantes foi pensado para visitantes que ainda não têm uma conta. No quiosque de check-in da igreja, toque em **Cadastrar como visitante** para exibir um QR code que leva à página de cadastro. Você também pode receber o link de um voluntário ou recepcionista, ou encontrá-lo em um panfleto ou no site da igreja.

Não tem um celular por perto? Na mesma janela do QR code no quiosque, toque em **Cadastrar aqui** para preencher o formulário no próprio quiosque. Consulte [Cadastrando-se como visitante](../../b1-checkin/check-in/looking-up-members#registering-as-a-guest) para saber como isso funciona no quiosque.

A página abre com o título **Cadastro de visitante**. Se a igreja tiver adicionado uma foto de cabeçalho, ela aparece no topo da página; caso contrário, você verá um pequeno ícone.

## Cadastrando sua família

1. **Escaneie o QR code** no quiosque de check-in ou abra o link de cadastro de visitante no seu celular. (Se você tocou em **Cadastrar aqui** no quiosque, o formulário já estará aberto.)
2. Preencha o cartão **Contato principal**. **Nome** e **Sobrenome** são sempre obrigatórios. Dependendo do que a sua igreja solicita, você também pode ver:
   - **E-mail** e **Telefone**
   - **Estado civil**
   - **Endereço residencial**: **Logradouro**, **Complemento**, **Cidade**, **Estado** e **CEP**. Isso é compartilhado por toda a família.
3. O formulário começa com um segundo cartão para o **Membro da família 2**. Informe o nome e o sobrenome dele, ou toque no **X** no canto do cartão para removê-lo se você estiver se cadastrando sozinho.
4. Para adicionar mais pessoas, toque em **Adicionar membro da família**. O novo cartão preenche automaticamente o sobrenome do contato principal. Você pode cadastrar até 10 pessoas de uma vez.
5. Se a sua igreja solicitar, o cartão de cada pessoa também pode incluir **Data de nascimento**, **Sexo** e **Série**.
6. Se a sua igreja incluir uma caixa de **Comentários** abaixo dos membros da família, use-a para compartilhar o que você quiser que a igreja saiba (até 1.000 caracteres).
7. Toque em **Cadastrar** para enviar.

Os campos marcados com asterisco (`*`) são obrigatórios. Se algum deles estiver em branco, o formulário exibe "Preencha todos os campos obrigatórios." e nada é enviado até que você os preencha.

## Depois do cadastro

Depois de enviar o formulário, aparece uma tela de confirmação com a mensagem: "Cadastro concluído -- Está tudo certo! Um membro da equipe fará o seu check-in em breve."

O seu cadastro cria registros no banco de dados da igreja:

- Um **domicílio** é criado usando o sobrenome do contato principal, com o contato principal como chefe da família.
- **Registros de pessoa** são criados para cada membro da família, com o status de membresia "Visitante".
- Quaisquer comentários que você tiver feito são salvos como uma anotação no registro do contato principal, para que a equipe da igreja leia.
- Se a igreja tiver escolhido um grupo para novos visitantes, a sua família é adicionada a ele. A igreja também pode registrar automaticamente a sua presença se você se cadastrar durante um dos horários de culto desse grupo.
- Um voluntário ou administrador da igreja pode então fazer o check-in da sua família usando o quiosque do [B1 Checkin](../../b1-checkin/check-in/looking-up-members).

:::info
Cada cadastro cria um novo domicílio, então cadastre sua família apenas uma vez. Se você já se cadastrou, pesquise seu nome ou número de telefone no quiosque.
:::

:::tip
Se o formulário pedir o seu e-mail, informá-lo ajuda a igreja a entrar em contato depois da sua visita.
:::

## Artigos relacionados

- [Check-in próprio](./self-checkin): faça o seu próprio check-in depois de se cadastrar
- [Adicionando visitantes (quiosque)](../../b1-checkin/check-in/adding-guests): como os voluntários adicionam visitantes no quiosque
- [Check-in](../../b1-admin/attendance/check-in#guest-registration-via-qr-code): como os administradores da igreja configuram o cadastro de visitantes por QR code
