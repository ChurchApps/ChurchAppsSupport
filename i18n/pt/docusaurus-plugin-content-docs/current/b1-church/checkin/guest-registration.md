---
title: "Cadastro de Visitantes"
---

# Cadastro de Visitantes

<div class="article-intro">

Se você está visitando uma igreja pela primeira vez, pode se cadastrar como visitante, junto com sua família, usando a página de cadastro de visitantes. Isso cria um registro no sistema da igreja para que os voluntários possam fazer seu check-in quando você chegar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- A sua igreja precisa ter o cadastro de visitantes por QR code ativado. Se não estiver, a página exibe "O cadastro de visitantes não está ativado para esta igreja."
- Leia o QR code exibido no quiosque de check-in, toque em **Cadastre-se aqui** no quiosque ou receba um link de um voluntário da igreja

</div>

## Como Funciona o Cadastro de Visitantes

O cadastro de visitantes foi pensado para visitantes que ainda não têm uma conta. No quiosque de check-in da igreja, toque em **Cadastrar-se como visitante** para exibir um QR code que leva à página de cadastro. Você também pode receber o link de um voluntário ou recepcionista, ou encontrá-lo em um panfleto ou no site da igreja.

Sem celular por perto? Na mesma janela do QR code no quiosque, toque em **Cadastre-se aqui** para preencher o formulário no próprio quiosque. Veja [Cadastrando-se como Visitante](../../b1-checkin/check-in/looking-up-members#registering-as-a-guest) para saber como isso funciona no quiosque.

A página abre com o título **Cadastro de Visitantes**. Se a igreja tiver adicionado uma foto de cabeçalho, ela aparecerá no topo da página; caso contrário, você verá um ícone pequeno.

## Cadastrando Sua Família

1. **Leia o QR code** no quiosque de check-in ou abra o link de cadastro de visitantes no seu celular. (Se você tocou em **Cadastre-se aqui** no quiosque, o formulário já estará aberto.)
2. Preencha o cartão de **Contato Principal**. **Nome** e **Sobrenome** são sempre obrigatórios. Dependendo do que a sua igreja pede, você também pode ver:
   - **E-mail** e **Telefone**
   - **Estado Civil**
   - **Endereço Residencial** -- **Logradouro**, **Complemento**, **Cidade**, **Estado** e **CEP**. Esse endereço é compartilhado por toda a família.
3. O formulário começa com um segundo cartão, para o **Membro da Família 2**. Digite o nome e o sobrenome dela, ou toque no **X** no canto do cartão para removê-lo, caso esteja se cadastrando sozinho.
4. Para adicionar mais pessoas, toque em **Adicionar Membro da Família**. O novo cartão preenche automaticamente o sobrenome do contato principal. Você pode cadastrar até 10 pessoas de uma vez.
5. Se a sua igreja pedir, o cartão de cada pessoa também pode incluir **Data de Nascimento**, **Gênero** e **Série**.
6. Se a sua igreja incluir uma caixa de **Comentários** abaixo dos membros da família, use-a para compartilhar o que quiser que a igreja saiba (até 1.000 caracteres).
7. Toque em **Cadastrar** para enviar.

Os campos marcados com asterisco (`*`) são obrigatórios. Se algum deles ficar em branco, o formulário exibe "Preencha todos os campos obrigatórios." e nada é enviado até que você os preencha.

## Após o Cadastro

Depois que você envia o formulário, uma tela de confirmação aparece com a mensagem: "Cadastro Concluído -- Tudo certo! Um membro da equipe fará seu check-in em breve."

Seu cadastro cria registros no banco de dados da igreja:

- Um **domicílio** é criado usando o sobrenome do contato principal, com o contato principal como chefe da família.
- São criados **registros de pessoa** para cada membro da família, com o status de membresia "Visitante".
- Os comentários que você digitou são salvos como uma nota no registro do contato principal, para que a equipe da igreja possa lê-los.
- Se a igreja tiver escolhido um grupo para novos visitantes, sua família é adicionada a ele. A igreja também pode registrar automaticamente sua presença se você se cadastrar durante um dos horários de culto desse grupo.
- Um voluntário ou administrador da igreja pode então fazer o check-in da sua família pelo quiosque do [B1 Checkin](../../b1-checkin/check-in/looking-up-members).

:::info
Se você se cadastrar novamente com o mesmo primeiro nome e o mesmo e-mail ou telefone, os registros da igreja reconhecerão você e reutilizarão seu perfil existente, em vez de criar um duplicado. Qualquer outra pessoa é adicionada como novo cadastro. Se você já se cadastrou, também pode simplesmente pesquisar seu nome ou telefone no quiosque.
:::

:::tip
Se o formulário pedir seu endereço de e-mail, informá-lo ajuda a igreja a fazer o acompanhamento depois da sua visita.
:::

## Artigos Relacionados

- [Check-in Próprio](./self-checkin) -- Faça seu próprio check-in depois de se cadastrar
- [Adicionando Visitantes (Quiosque)](../../b1-checkin/check-in/adding-guests) -- Como os voluntários adicionam visitantes no quiosque
- [Check-In](../../b1-admin/attendance/check-in#guest-registration-via-qr-code) -- Como os administradores da igreja configuram o cadastro de visitantes por QR code
