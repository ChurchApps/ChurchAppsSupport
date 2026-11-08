---
title: "Registro de Visitantes"
description: "Registre-se e sua família como visitantes pela primeira vez com o formulário QR no B1 Checkin para que os voluntários possam fazer seu check-in ao chegar."
---

# Registro de Visitantes

<div class="article-intro">

Se você está visitando uma igreja pela primeira vez, pode se registrar e registrar sua família como visitantes usando a página de registro de visitantes. Isso cria um registro no sistema da igreja para que os voluntários possam fazer seu check-in ao chegar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- A igreja precisa ter o registro de visitantes por QR code ativado. Se não estiver, a página exibe "O registro de visitantes não está ativado para esta igreja."
- Escaneie o QR code exibido no totem de check-in, toque em **Registre-se aqui** no totem ou receba um link de um voluntário da igreja

</div>

## Como Funciona o Registro de Visitantes

O registro de visitantes foi pensado para visitantes que ainda não possuem uma conta. No totem de check-in da igreja, toque em **Registrar como visitante** para exibir um QR code que leva à página de registro. Você também pode receber o link de um voluntário ou recepcionista, ou encontrá-lo em um panfleto ou no site da igreja.

Não tem o celular à mão? Na mesma janela do QR code no totem, toque em **Registre-se aqui** para preencher o formulário no próprio totem. Veja [Registrando-se como Visitante](../../b1-checkin/check-in/looking-up-members.md#registering-as-a-guest) para saber como isso funciona no totem.

A página abre com o título **Registro de Visitantes**. Se a igreja tiver adicionado uma foto de cabeçalho, ela aparecerá no topo da página; caso contrário, você verá um pequeno ícone.

## Registrando Sua Família

1. **Escaneie o QR code** no totem de check-in ou abra o link de registro de visitantes no seu celular. (Se você tocou em **Registre-se aqui** no totem, o formulário já estará aberto.)
2. Preencha o cartão **Contato Principal**. **Nome** e **Sobrenome** são sempre obrigatórios. Dependendo do que sua igreja solicita, você também pode ver:
   - **Título** (como Sr., Sra., Dr. ou Pastor), antes do nome
   - **E-mail** e **Telefone**
   - **Estado Civil**
   - **Endereço Residencial** -- **Logradouro**, **Complemento**, **Cidade**, **Estado** e **CEP**. Este endereço é compartilhado por toda a família.
3. O formulário começa com um segundo cartão para o **Membro da Família 2**. Informe o nome e o sobrenome dela, ou toque no **X** no canto do cartão para removê-lo caso esteja se registrando sozinho.
4. Para adicionar mais pessoas, toque em **Adicionar Membro da Família**. O novo cartão preenche automaticamente o sobrenome do contato principal. Você pode registrar até 10 pessoas de uma só vez.
5. Se sua igreja solicitar, o cartão de cada pessoa também pode incluir **Título**, **Telefone**, **Data de Nascimento**, **Gênero** e **Série**. Todo cartão após o contato principal também pode pedir um **Papel na Família** -- **Cônjuge**, **Filho(a)** ou **Outro** -- para que a igreja saiba como cada pessoa se relaciona com o contato principal.
6. Se sua igreja incluir uma caixa de **Comentários** abaixo dos membros da família, use-a para compartilhar o que quiser que a igreja saiba (até 1.000 caracteres).
7. Toque em **Registrar** para enviar.

Os campos marcados com um asterisco (`*`) são obrigatórios. Se algum deles estiver em branco, o formulário exibe "Por favor, preencha todos os campos obrigatórios." e nada será enviado até que você os preencha.

## Após o Registro

Depois de enviar o formulário, uma tela de confirmação aparece com a mensagem: "Registro Concluído -- Tudo certo! Um membro da equipe fará o seu check-in em breve."

Seu registro cria registros no banco de dados da igreja:

- Um **domicílio** é criado usando o sobrenome do contato principal, com o contato principal como chefe da família.
- **Registros de pessoas** são criados para cada membro da família com o status de membership "Visitante". Cada membro recebe o papel familiar que você escolheu, ou **Outro** caso nenhum tenha sido solicitado.
- Quaisquer comentários que você inserir são salvos como uma nota no registro do contato principal para que a equipe da igreja possa lê-la.
- Se a igreja tiver escolhido um grupo para novos visitantes, sua família será adicionada a ele. A igreja também pode registrar automaticamente sua presença se você se registrar durante um dos horários de culto programados desse grupo.
- Um voluntário ou administrador da igreja pode então fazer o check-in da sua família pelo totem do [B1 Checkin](../../b1-checkin/check-in/looking-up-members.md).

:::info
Se você se registrar novamente com o mesmo primeiro nome e o mesmo e-mail ou telefone, os registros da igreja o reconhecerão e reutilizarão seu perfil existente em vez de criar um duplicado. Outras pessoas são adicionadas como novas. Se você já se registrou, também pode simplesmente pesquisar seu nome ou telefone no totem.
:::

:::tip
Se o formulário pedir seu endereço de e-mail, informá-lo ajuda a igreja a acompanhar você após sua visita.
:::

## Artigos Relacionados

- [Check-in Próprio](./self-checkin.md) -- Faça seu próprio check-in após o registro
- [Adicionando Visitantes (Totem)](../../b1-checkin/check-in/adding-guests.md) -- Como os voluntários adicionam visitantes no totem
- [Check-in](../../b1-admin/attendance/check-in.md#guest-registration-via-qr-code) -- Como os administradores da igreja configuram o registro de visitantes por QR code
