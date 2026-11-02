---
title: "Check-In"
---

# Check-In

<div class="article-intro">

O B1 Admin oferece suporte ao auto check-in nos cultos por meio do aplicativo complementar **B1 Checkin**. Os membros podem fazer check-in para si mesmos e para suas famílias em quiosques ou dispositivos dedicados ao chegar, tornando o processo rápido e reduzindo a carga de trabalho dos seus voluntários. Cada check-in é registrado automaticamente como presença.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Seus campi, horários de culto e grupos devem estar configurados em [Configuração de Presença](setup.md).
- Você precisa de [pessoas cadastradas no banco de dados](../people/adding-people.md) com [domicílios](../people/adding-people.md#managing-households) configurados para que as famílias possam fazer check-in juntas.
- Você vai precisar de um tablet e, opcionalmente, de uma impressora de etiquetas Brother (veja as [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença no B1 Admin. Quando um membro faz check-in, a presença é registrada automaticamente no campus, no horário de culto e no grupo corretos. Você não precisa lançar presença manualmente para quem usa o sistema de check-in.

## Configurando o check-in

1. **Configure primeiro a estrutura de presença.** No B1 Admin, acesse **Pessoas > Presença** e clique em **Configuração** para garantir que seus campi, horários de culto e grupos estejam definidos. O aplicativo de check-in depende dessa configuração. Opcionalmente, defina um [cronograma de check-in](setup.md#setting-a-check-in-schedule) para cada horário de culto, para que o check-in abra e feche automaticamente toda semana. Os cronogramas usam o fuso horário do campus do culto ou, se o campus não tiver um definido, o fuso horário da sua igreja; o quiosque mostra os horários cuja janela está encerrada como **Fechado** e informa às famílias quando o check-in será aberto. Veja [Configuração de Presença](setup.md) para mais detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você pretende usar. O aplicativo está disponível nas seguintes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Entre no aplicativo B1 Checkin** usando uma conta que tenha a permissão de presença **Checkin** (ou **Editar Presença**). Veja [Contas de Quiosque de Check-In](../settings/roles-permissions.md#check-in-kiosk-accounts).
4. **Selecione o campus e o horário de culto** da reunião atual.
5. Os membros agora podem pesquisar o próprio nome no dispositivo e fazer check-in.

:::tip
Posicione os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou mesas de recepção. Um breve anúncio durante os cultos ajuda os membros a saber que essa opção está disponível.
:::

:::tip
Se a sua igreja tiver vários campi, você precisará repetir a configuração para cada campus em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para um campus diferente.
:::

## Hardware recomendado {#recommended-hardware}

**Tablets** — qualquer um destes funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Tela grande:** Samsung Galaxy Tab A8 10.5"
- **Econômico:** Amazon Fire HD 10

**Impressoras** — o check-in funciona com impressoras de etiquetas Brother para imprimir crachás:

- **Melhor opção:** Brother QL-1110NWB (oferece suporte a vários tablets via Bluetooth e Wi-Fi)
- **Boa opção:** Brother QL-810W (oferece suporte a vários tablets via Wi-Fi)
- **Econômica:** Brother QL-1100 (somente Wi-Fi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Impressoras de outras marcas não funcionarão para imprimir crachás.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede Wi-Fi do seu tablet. Você pode encontrar drivers e guias de configuração das impressoras Brother no [site de suporte da Brother](https://support.brother.com).
:::

## Personalizando a aparência do quiosque

Você pode personalizar a aparência do aplicativo B1 Checkin para combinar com a identidade visual da sua igreja. No B1 Admin, acesse **Mobile > B1 CheckIn** e use o cartão **Tema do Quiosque** para configurar:

### Cores

Personalize oito configurações de cor para combinar com a identidade visual da sua igreja:

- **Primária** e **Contraste Primário** -- Cor principal da marca e a cor do seu texto.
- **Secundária** e **Contraste Secundário** -- Cor de destaque e a cor do seu texto.
- **Fundo do Cabeçalho** e **Fundo do Subcabeçalho** -- Cores das áreas de cabeçalho do quiosque.
- **Fundo do Botão** e **Texto do Botão** -- Cores dos botões interativos.

### Imagem de fundo

Envie uma imagem de fundo opcional para as telas de boas-vindas e de busca do quiosque. O tamanho recomendado é 1920x1080 pixels.

### Tela ociosa / Protetor de tela

Configure um protetor de tela que seja ativado após um período de inatividade:

1. Ative ou desative a tela ociosa.
2. Defina o **tempo limite** (quantos segundos de inatividade antes que o protetor de tela comece; mínimo de 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo de 3 segundos).

:::tip
Use a tela ociosa para exibir anúncios, eventos próximos ou mensagens de boas-vindas quando o quiosque não estiver sendo usado.
:::

## Cadastro de visitantes por QR Code {#guest-registration-via-qr-code}

O quiosque de check-in pode exibir um QR code que os visitantes escaneiam para se cadastrar, junto com a família, no próprio celular. Isso agiliza o check-in de visitantes que estão na primeira vez.

Quando um visitante escaneia o QR code, ele é levado a uma [página de cadastro de visitantes](../../b1-church/checkin/guest-registration), onde informa os nomes da família e quaisquer outros dados que você decidir pedir. Em seguida, um voluntário pode procurá-lo no quiosque e fazer o check-in.

### Ativando o cadastro de visitantes por QR Code

Para ativar a exibição do QR code:

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Mobile**.
2. Clique em **B1 CheckIn**.
3. Ative **Cadastro de Visitantes por QR** e clique em **Salvar**.

:::note
Esta configuração fica em **Mobile > B1 CheckIn** (na mesma página do cartão **Tema do Quiosque**), e não em Presença. A ação **Quiosque** na página de Presença tem um link para esta página.
:::

Assim que a opção estiver ativada, as demais opções abaixo aparecem no mesmo cartão **Cadastro de Visitantes por QR**. Clique em **Salvar** no cartão depois de alterar qualquer uma delas.

### Escolhendo os campos do cadastro

A lista **Campos do cadastro** controla o que o formulário de cadastro pede. **Nome** e **Sobrenome** estão sempre no formulário e são sempre obrigatórios para todos os membros da família. Para cada um dos outros campos, ative **Incluir** para adicioná-lo ao formulário e, em seguida, ative **Obrigatório** se os visitantes precisarem preenchê-lo. **Obrigatório** só pode ser ativado para um campo incluído, e desativar **Incluir** limpa essa opção.

| Campo | Solicitado para | Incluído por padrão |
|-------|-----------------|---------------------|
| **E-mail** | Somente o contato principal | Sim (opcional) |
| **Telefone** | Somente o contato principal | Sim (opcional) |
| **Endereço residencial** | Uma vez para a família -- rua, complemento, cidade, estado e CEP. Quando obrigatório, tudo exceto o complemento deve ser preenchido. O endereço é salvo em todos os membros da família. | Não |
| **Data de nascimento** | Cada membro da família | Não |
| **Gênero** | Cada membro da família | Não |
| **Estado civil** | Somente o contato principal | Não |
| **Série** | Cada membro da família (do Pré-escolar ao 12º ano, ou Formado) | Não |
| **Comentários** | Uma vez, em uma caixa abaixo dos membros da família (até 1.000 caracteres) | Não |

Os campos desativados nunca são salvos, mesmo que alguém os envie para o cadastro por outro meio. Os comentários são salvos como uma nota no registro do contato principal (publicada como "Cadastro de visitante"), para que você possa lê-los na seção **Notas** do perfil dele.

### Adicionando visitantes a um grupo

Use **Adicionar novos visitantes ao grupo** para colocar automaticamente todos que se cadastram em um dos seus grupos -- por exemplo, um grupo de "Recém-chegados" ou um grupo para o evento deste fim de semana. Escolha **Nenhum** (o padrão) para pular esta etapa. Os visitantes nunca veem nem escolhem o grupo; ele é definido somente aqui. Altere-o antes de cada evento para que você possa acompanhar os visitantes daquele evento em conjunto.

### Registrando presença

Quando um grupo é selecionado, aparece uma chave **Registrar também a presença**. Ative-a para marcar os visitantes como presentes no momento em que se cadastram, para que você não precise fazer o check-in deles separadamente.

A presença só é registrada quando o cadastro acontece durante um dos horários **agendados** do grupo selecionado:

- O grupo deve estar vinculado a um ou mais horários de culto, e esses horários devem ter um [cronograma de check-in](setup.md#setting-a-check-in-schedule) (um **Dia** e um **Horário de início**).
- "Durante" significa dentro da janela de check-in daquele horário de culto -- desde os minutos de **Abrir check-in** antes do início até os minutos de **Fechar check-in** depois do término (ou depois do início, se não houver horário de término), no mesmo fuso horário usado pelo cronograma de check-in.
- Cada membro da família é marcado como presente no grupo em cada um dos horários de culto que estiver aberto naquele momento, na data de hoje.
- Cadastros feitos em qualquer outro momento, ou para um grupo cujos horários de culto não têm cronograma, são adicionados ao grupo, mas não são contabilizados como presença.

### Foto do cabeçalho

Em **Foto do cabeçalho**, clique em **Alterar foto** para escolher ou enviar uma imagem (recortada no formato 16:9) que será exibida no topo da página de cadastro, no lugar do ícone padrão. Clique em **Remover** para voltar ao ícone.

### Compartilhando o link de cadastro

Depois que o Cadastro de Visitantes por QR for ativado, a seção **Compartilhar QR code de cadastro** aparece na parte inferior do cartão. Ela oferece duas formas de levar os visitantes ao formulário de cadastro, além do QR code do quiosque:

- **Copiar link** — copia a URL de cadastro para que você possa colá-la no site da igreja, em e-mails ou em qualquer lugar online.
- **Baixar PNG** — baixa o QR code como uma imagem que você pode imprimir em panfletos, boletins ou placas de sinalização.

:::tip
Adicione o link de cadastro à página "Planeje sua visita" ou "Sou novo" do site da sua igreja para que os visitantes possam se cadastrar antes mesmo de chegar.
:::

### O que acontece depois que um visitante se cadastra

O B1 procura primeiro pessoas que já estão em **Pessoas**. Um membro da família é associado a uma pessoa existente quando exatamente uma pessoa tem o mesmo primeiro nome e o mesmo e-mail ou telefone. Uma criança cadastrada sem e-mail ou telefone é associada pelo primeiro nome dentro do domicílio que foi encontrado. As pessoas encontradas são reaproveitadas exatamente como estão -- o cadastro nunca altera seus dados nem seu status de membro -- e quem for novo entra no domicílio encontrado.

Quando ninguém é encontrado, o cadastro cria um novo domicílio com o sobrenome do contato principal, com um registro de pessoa para cada membro da família. Todos os novos são adicionados a **Pessoas** com o status de membro **Visitante**, tendo o contato principal como chefe do domicílio.

Tanto as pessoas encontradas quanto as novas são adicionadas ao grupo escolhido (se ainda não estiverem nele) e têm a presença registrada quando essa opção está ativada. Os comentários são salvos como uma nota no contato principal.

Para fazer um acompanhamento automático, adicione um [gatilho de fluxo de trabalho](../serving/workflows.md#triggers), como **Pessoa · Criada** com a condição *Status de membro é Visitante*, ou **Grupo · Membro entrou** para o grupo que você escolheu acima.

## O que é registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode ver esses registros na página [Presença](tracking-attendance.md) e nas sessões de cada [grupo](../groups/group-members.md), assim como a presença lançada manualmente. Não há diferença na forma como os dados aparecem -- os dois métodos alimentam os mesmos relatórios.
