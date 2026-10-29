---
title: "Check-In"
---

# Check-In

<div class="article-intro">

O B1 Admin oferece suporte ao autoatendimento de check-in nos cultos por meio do aplicativo complementar **B1 Checkin**. Os membros podem fazer o check-in de si mesmos e de suas famílias em quiosques ou dispositivos dedicados ao chegar, tornando o processo rápido e reduzindo a carga de trabalho dos seus voluntários. Cada check-in é registrado automaticamente como presença.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Seus campi, horários de serviço e grupos devem estar configurados em [Configuração de Presença](setup.md).
- Você precisa de [pessoas cadastradas no seu banco de dados](../people/adding-people.md) com [famílias](../people/adding-people.md#managing-households) configuradas para que as famílias possam fazer check-in juntas.
- Você vai precisar de um tablet e, opcionalmente, de uma impressora de etiquetas Brother (veja as [recomendações de hardware](#recommended-hardware) abaixo).

</div>

## Como Funciona

O aplicativo B1 Checkin se conecta à sua configuração de presença no B1 Admin. Quando um membro faz check-in, sua presença é registrada automaticamente no campus, horário de serviço e grupo corretos. Você não precisa lançar a presença manualmente para quem usa o sistema de check-in.

## Configurando o Check-In

1. **Configure primeiro a estrutura de presença.** No B1 Admin, vá em **Pessoas > Presença** e clique em **Configuração** para garantir que seus campi, horários de serviço e grupos estejam no lugar. O aplicativo de check-in depende dessa configuração. Opcionalmente, defina para cada horário de serviço uma [programação de check-in](setup.md#setting-a-check-in-schedule), para que o check-in abra e feche automaticamente a cada semana. As programações usam o fuso horário do campus do serviço ou o fuso horário da sua igreja, caso o campus não tenha um definido; o quiosque lista como **Fechado** os horários de serviço cujo período está encerrado e informa às famílias quando o check-in será aberto. Consulte [Configuração de Presença](setup.md) para mais detalhes.
2. **Instale o aplicativo B1 Checkin** nos dispositivos que você pretende usar. O aplicativo está disponível nas seguintes plataformas:
   - **iPad/iOS:** [Apple App Store](https://apps.apple.com/us/app/b1-church-check-in/id6775081998)
   - **Tablets Android/Samsung:** [Google Play Store](https://play.google.com/store/apps/details?id=church.b1.checkin)
   - **Tablets Amazon Fire:** [Amazon App Store](https://www.amazon.com/Live-Church-Solutions-B1-Check-In/dp/B0FW5HKRB5/)
3. **Entre no aplicativo B1 Checkin** usando as credenciais da conta da sua igreja.
4. **Selecione o campus e o horário de serviço** do culto atual.
5. Os membros agora podem pesquisar seu nome no dispositivo e fazer check-in.

:::tip
Posicione os dispositivos de check-in em locais visíveis e de fácil acesso, como entradas do saguão ou balcões de boas-vindas. Um breve anúncio durante os cultos ajuda os membros a saberem que essa opção está disponível.
:::

:::tip
Se a sua igreja tem vários campi, você precisará repetir a configuração para cada campus em [Configuração de Presença](setup.md). Cada dispositivo de check-in pode ser configurado para um campus diferente.
:::

## Hardware Recomendado

**Tablets** — qualquer um destes funciona bem com o aplicativo:

- **Compacto:** Samsung Galaxy Tab A7 Lite 8.7"
- **Tela grande:** Samsung Galaxy Tab A8 10.5"
- **Econômico:** Amazon Fire HD 10

**Impressoras** — o check-in funciona com impressoras de etiquetas Brother para imprimir crachás:

- **Melhor opção:** Brother QL-1110NWB (suporta vários tablets via Bluetooth e Wi-Fi)
- **Boa opção:** Brother QL-810W (suporta vários tablets via Wi-Fi)
- **Econômica:** Brother QL-1100 (somente Wi-Fi)

**Etiquetas:** Brother DK-1201 (1-1/7" x 3-1/2")

:::warning
Somente impressoras de etiquetas Brother são compatíveis com o aplicativo B1 Checkin. Outras marcas de impressora não funcionarão para imprimir crachás.
:::

:::info
Siga as instruções de configuração da sua impressora para conectá-la à mesma rede Wi-Fi do seu tablet. Você pode encontrar drivers e guias de configuração das impressoras Brother no [site de suporte da Brother](https://support.brother.com).
:::

## Personalizando a Aparência do Quiosque

Você pode personalizar a aparência do aplicativo B1 Checkin para combinar com a identidade visual da sua igreja. No B1 Admin, vá em **Celular > B1 CheckIn** e use o cartão **Tema do Quiosque** para configurar:

### Cores

Personalize oito configurações de cor para combinar com a identidade visual da sua igreja:

- **Primária** e **Contraste Primário** -- Cor principal da marca e a cor do texto sobre ela.
- **Secundária** e **Contraste Secundário** -- Cor de destaque e a cor do texto sobre ela.
- **Fundo do Cabeçalho** e **Fundo do Subcabeçalho** -- Cores das áreas de cabeçalho do quiosque.
- **Fundo do Botão** e **Texto do Botão** -- Cores dos botões interativos.

### Imagem de Fundo

Envie uma imagem de fundo opcional para as telas de boas-vindas e de busca do quiosque. O tamanho recomendado é 1920x1080 pixels.

### Tela Inativa / Protetor de Tela

Configure um protetor de tela que é ativado após um período de inatividade:

1. Ative ou desative a tela inativa.
2. Defina o **tempo limite** (quantos segundos de inatividade antes de o protetor de tela começar, mínimo de 10 segundos).
3. Adicione um ou mais **slides** -- cada slide tem uma imagem e uma duração de exibição (mínimo de 3 segundos).

:::tip
Use a tela inativa para exibir anúncios, eventos futuros ou mensagens de boas-vindas quando o quiosque não estiver sendo usado.
:::

## Cadastro de Visitantes via QR Code

O quiosque de check-in pode exibir um QR code que os visitantes escaneiam para se cadastrar, junto com a família, no próprio celular. Isso agiliza o processo de check-in para visitantes de primeira vez.

Quando um visitante escaneia o QR code, ele é levado a uma [página de cadastro de visitantes](../../b1-church/checkin/guest-registration) onde informa os nomes da família e quaisquer outros dados que você decidir pedir. Um voluntário pode então localizá-lo no quiosque e fazer o check-in.

### Ativando o Cadastro de Visitantes via QR Code

Para ativar a exibição do QR code:

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo) e expanda **Celular**.
2. Clique em **B1 CheckIn**.
3. Ative **Cadastro de Visitantes via QR** e clique em **Salvar**.

:::note
Esta configuração fica em **Celular > B1 CheckIn** (na mesma página do cartão **Tema do Quiosque**), e não em Presença. A ação **Quiosque** na página de Presença tem um link para esta página.
:::

Assim que a opção estiver ativada, as demais opções abaixo aparecem no mesmo cartão **Cadastro de Visitantes via QR**. Clique em **Salvar** no cartão depois de alterar qualquer uma delas.

### Escolhendo os Campos do Cadastro

A lista **Campos do cadastro** controla o que o formulário de inscrição pede. **Nome** e **Sobrenome** sempre aparecem no formulário e são sempre obrigatórios para cada membro da família. Para cada um dos outros campos, ative **Incluir** para adicioná-lo ao formulário e, em seguida, ative **Obrigatório** se os visitantes precisarem preenchê-lo. **Obrigatório** só pode ser ativado para um campo incluído, e desativar **Incluir** limpa essa opção.

| Campo | Solicitado | Incluído por padrão |
|-------|-----------|---------------------|
| **E-mail** | Somente para o contato principal | Sim (opcional) |
| **Telefone** | Somente para o contato principal | Sim (opcional) |
| **Endereço residencial** | Uma vez para a família -- rua, complemento, cidade, estado e CEP. Quando obrigatório, tudo exceto o complemento deve ser preenchido. O endereço é salvo em todos os membros da família. | Não |
| **Data de nascimento** | Cada membro da família | Não |
| **Gênero** | Cada membro da família | Não |
| **Estado civil** | Somente para o contato principal | Não |
| **Série** | Cada membro da família (do Maternal ao 12º ano, ou Formado) | Não |
| **Comentários** | Uma vez, em uma caixa abaixo dos membros da família (até 1.000 caracteres) | Não |

Os campos desativados nunca são salvos, mesmo que alguém os envie para o cadastro por outro meio. Os comentários são salvos como uma anotação no registro do contato principal (publicada como "Cadastro de visitante"), para que você possa lê-los na seção **Anotações** do perfil dele.

### Adicionando Visitantes a um Grupo

Use **Adicionar novos visitantes ao grupo** para colocar automaticamente todas as pessoas que se cadastrarem em um dos seus grupos -- por exemplo, um grupo "Novos Visitantes" ou um grupo para o evento deste fim de semana. Escolha **Nenhum** (o padrão) para ignorar esta opção. Os visitantes nunca veem nem escolhem o grupo; ele é definido apenas aqui. Altere-o antes de cada evento para acompanhar os visitantes daquele evento em conjunto.

### Registrando a Presença

Quando um grupo é selecionado, aparece uma chave **Registrar presença também**. Ative-a para marcar os visitantes como presentes no momento em que se cadastram, assim você não precisa fazer o check-in deles separadamente.

A presença só é registrada quando o cadastro acontece durante um dos horários de serviço **programados** do grupo selecionado:

- O grupo precisa estar vinculado a um ou mais horários de serviço, e esses horários de serviço precisam ter uma [programação de check-in](setup.md#setting-a-check-in-schedule) (um **Dia** e um **Horário de início**).
- "Durante" significa dentro da janela de check-in daquele horário de serviço -- desde os minutos de **Abrir check-in** antes do início até os minutos de **Fechar check-in** após o término (ou após o início, caso nenhum horário de término esteja definido), no mesmo fuso horário usado pela programação de check-in.
- Cada membro da família é marcado como presente no grupo em cada um dos horários de serviço dele que esteja aberto naquele momento, na data de hoje.
- Cadastros feitos em outros horários, ou para um grupo cujos horários de serviço não têm programação, são adicionados ao grupo, mas não são contados como presença.

### Foto do Cabeçalho

Em **Foto do cabeçalho**, clique em **Alterar foto** para escolher ou enviar uma imagem (recortada no formato 16:9) que será exibida no topo da página de cadastro, no lugar do ícone padrão. Clique em **Remover** para voltar ao ícone.

### Compartilhando o Link de Cadastro

Assim que o Cadastro de Visitantes via QR estiver ativado, uma seção **Compartilhar QR code de cadastro** aparece na parte inferior do cartão. Ela oferece duas formas de levar os visitantes ao formulário de cadastro, além do QR code do quiosque:

- **Copiar link** — copia a URL de cadastro para que você possa colá-la no site da sua igreja, em e-mails ou em qualquer outro lugar online.
- **Baixar PNG** — baixa o QR code como uma imagem que você pode imprimir em panfletos, boletins ou placas de sinalização.

:::tip
Adicione o link de cadastro à página "Planeje Sua Visita" ou "Sou Novo" do site da sua igreja para que os visitantes possam se cadastrar antes mesmo de chegar.
:::

### O Que Acontece Depois que um Visitante se Cadastra

O B1 primeiro procura pessoas que já estão em **Pessoas**. Um membro da família é associado a uma pessoa existente quando exatamente uma pessoa tem o mesmo primeiro nome e o mesmo e-mail ou telefone. Uma criança cadastrada sem e-mail nem telefone é associada pelo primeiro nome dentro da família que foi associada. As pessoas associadas são reaproveitadas como estão -- o cadastro nunca altera os dados ou o status de membro delas -- e quem for novo entra na família associada.

Quando ninguém é associado, o cadastro cria uma nova família com o sobrenome do contato principal, com um registro de pessoa para cada membro da família. Todos os novos são adicionados a **Pessoas** com o status de membro **Visitante**, tendo o contato principal como chefe da família.

Pessoas associadas e novas são adicionadas ao grupo que você escolheu (se ainda não estiverem nele) e têm a presença registrada quando essa opção está ativada. Os comentários são salvos como uma anotação no contato principal.

Para fazer o acompanhamento automaticamente, adicione um [gatilho de fluxo de trabalho](../serving/workflows.md#triggers), como **Pessoa · Criada** com a condição *Status de membro é Visitante*, ou **Grupo · Membro entrou** para o grupo que você escolheu acima.

## O Que é Registrado

Cada check-in cria um registro de presença no B1 Admin. Você pode visualizar esses registros na página [Presença](tracking-attendance.md) e no [histórico de sessões](../groups/group-members.md) de cada grupo, da mesma forma que a presença lançada manualmente. Não há diferença na forma como os dados aparecem -- ambos os métodos alimentam os mesmos relatórios.
