---
title: "Transmissão ao vivo"
---

# Transmissão ao vivo

<div class="article-intro">

A página Horários da transmissão ao vivo permite configurar a programação de transmissões da sua igreja, gerenciar os horários dos cultos e personalizar a experiência do espectador. Configure cultos semanais recorrentes ou eventos pontuais, defina as configurações de chat e vídeo e controle quando a sua transmissão entra no ar.

</div>

## Vídeo de treinamento

<YouTube id="tpEY-sEYW6A" title="Setting Up Live Streaming in B1" next="Customizing Your Church's Member App in B1" nextUrl="/docs/b1-admin/settings/mobile-app" />

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **contentApi.streamingServices.edit**. Consulte [Funções e permissões](../settings/roles-permissions.md) se não tiver acesso.
- Tenha em mãos o ID do seu canal do YouTube se pretende usar a transmissão ao vivo automatizada
- Adicione pelo menos um [sermão](managing-sermons) ou uma URL ao vivo permanente para usar como fonte da transmissão

</div>

A transmissão ao vivo é gerenciada em duas páginas da seção **Sermões** do menu Jump: **Horários da transmissão ao vivo**, para gerenciar a programação, e **Configurações**, para configurar as abas da sua página de transmissão.

## Gerenciando cultos

### Adicionando um culto

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Sermões** e clique em **Horários da transmissão ao vivo**.
2. Clique no botão **Adicionar culto** no topo da página para criar um novo culto agendado. Os cultos existentes são listados em uma tabela que mostra o nome, o horário, o provedor e a duração de cada culto; clique no ícone de editar em uma linha para alterá-lo.
3. Digite um **Nome do culto** (por exemplo, "Culto da manhã de domingo").
4. Defina o **Horário do culto** -- escolha o dia e a hora em que o culto começa.
5. Defina **Repete semanalmente** como **Sim** para cultos semanais regulares, ou **Não** para um evento pontual.

### Configurando o chat e o vídeo

6. Em **Configurações de chat**, defina quantos minutos antes e depois do culto o chat deve estar habilitado. Isso permite que os visitantes comecem a conversar antes do início do culto e continuem depois.
7. Em **Configurações de vídeo**, defina com quantos minutos de antecedência a transmissão de vídeo deve começar, para contagem regressiva ou conteúdo pré-culto. O chat abre esse número de minutos *antes* do início antecipado do vídeo, então o horário exibido ao lado da configuração de minutos antes do chat soma os dois números. Por exemplo, um culto às 10h00 com 15 minutos de chat antes e início antecipado de 5 minutos abre o chat às 9h40.
8. Selecione qual sermão tocar na lista suspensa:
   - **Sermão mais recente** -- Toca automaticamente o vídeo adicionado por último.
   - **Culto ao vivo atual** -- Toca a sua transmissão ao vivo atual do YouTube usando o seu ID de canal.
   - Você também pode escolher qualquer sermão específico que já tenha salvo.
9. Clique em **Salvar** para agendar o seu culto.

:::info
O seu culto será atualizado automaticamente toda semana se estiver configurado como recorrente. Ele permanece no mesmo horário local quando o horário de verão começa ou termina. Você pode adicionar quantos cultos precisar. Os visitantes verão o próximo horário de culto agendado quando acessarem a sua página de transmissão.
:::

## Configurações da página de transmissão

Para personalizar as abas e os links que aparecem ao lado da sua transmissão ao vivo, abra o menu Jump, expanda **Sermões** e clique em **Configurações**. A página **Configurações da transmissão** mostra a sua lista de **Abas de conteúdo**.

### Adicionando abas

1. Clique no botão **Adicionar** para incluir uma nova aba na sua página de transmissão ao vivo.
2. Escolha um **Tipo de link**: **URL externa** para um link personalizado, ou uma das abas predefinidas **Chat** ou **Oração**.
3. Para a aba Chat, basta dar um nome no campo **Texto da aba** e a configuração estará concluída.
4. Para uma aba com link, digite o nome da aba, escolha um ícone clicando no botão de ícone e digite a URL.
5. As abas configuradas aparecerão na página de transmissão ao vivo para que os espectadores acessem recursos adicionais e funções interativas.

### Visualizando a sua transmissão

Na página **Horários da transmissão ao vivo**, clique em **Ver sua transmissão** no topo da página para ver exatamente como a sua página de transmissão aparecerá para os visitantes, incluindo o seu logotipo, os horários dos cultos e as abas configuradas.

## Configurando a sua transmissão ao vivo no YouTube

Para conectar o seu canal do YouTube para transmissão ao vivo automática:

1. Acesse **Sermões** e clique em **Adicionar sermão**, depois selecione **Adicionar URL ao vivo permanente**.
2. O provedor de vídeo vem definido como **Transmissão ao vivo atual do YouTube**. Digite o seu **ID do canal do YouTube**.
3. Adicione um título e uma descrição, depois clique em **Salvar**.
4. Em **Horários da transmissão ao vivo**, crie um culto e selecione a sua URL ao vivo permanente na lista suspensa de sermões.

:::tip
Para encontrar o ID do seu canal do YouTube, acesse as configurações avançadas do seu canal e copie o valor de ID do canal.
:::

## Personalizando cores e logotipo

A sua página de transmissão ao vivo usa as configurações de [Aparência](../website/appearance) do seu site:

- A **cor de destaque clara** com texto escuro é usada no cabeçalho.
- A **cor de destaque escura** com texto claro é usada na barra lateral.
- O seu **Logotipo para fundo claro** aparece na página de transmissão. Use uma imagem com fundo transparente e proporção 4:1.

Para alterar essas opções, acesse **Site** e depois **Aparência**, e atualize as suas configurações de [Paleta de cores](../website/appearance#color-palette) e [Logotipo](../website/appearance#logo-and-branding).

## Adicionando anfitriões de transmissão

Para dar acesso a membros da equipe ao chat exclusivo para anfitriões, junto com o chat público:

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique no botão de mais e selecione **Adicionar função personalizada**.
3. Dê o nome "Anfitrião de transmissão" à função e clique em **Salvar**.
4. Clique na nova função e depois em **Adicionar** na seção Membros para incluir pessoas.
5. Role até **Editar permissões**, expanda a seção **Conteúdo** e marque **Chat do anfitrião**.

Quando os anfitriões entrarem na página de transmissão ao vivo, uma aba privada **Chat do anfitrião** aparece ao lado do chat público, para conversas exclusivas da equipe durante a transmissão.

:::info
Para mais detalhes sobre como criar funções e gerenciar permissões, consulte [Funções e permissões](../settings/roles-permissions.md).
:::

## Solução de problemas

Se a sua transmissão automatizada do YouTube não estiver aparecendo corretamente ao usar a opção "Transmissão ao vivo atual do YouTube" com o seu ID de canal, tente o seguinte:

**Sintomas:**
- O player mostra "Vídeo indisponível"
- A página carrega, mas nenhum vídeo aparece
- Incorporações diretas do YouTube funcionam, mas a transmissão automatizada do canal não

**Solução:**
Verifique no seu canal do YouTube se há transmissões ao vivo antigas ou agendadas e exclua-as:

1. Acesse o YouTube Studio.
2. Vá em **Conteúdo** e depois em **Ao vivo**.
3. Procure transmissões antigas agendadas ou transmissões futuras agendadas.
4. Exclua essas entradas antigas ou agendadas.
5. Teste novamente a página da sua transmissão ao vivo.

:::warning
A incorporação automática de transmissão do canal do YouTube pode ser bloqueada quando há várias entradas de transmissão agendadas ou passadas no canal. Removê-las permite que o YouTube identifique e exiba corretamente a sua transmissão atual.
:::

**Requisitos adicionais:**
- Sua transmissão ao vivo deve estar configurada como **Pública** (não Não listada nem Privada).
- A incorporação precisa estar permitida nas configurações de transmissão do YouTube.
- Certifique-se de estar usando o provedor **Transmissão ao vivo atual do YouTube** (com ID do canal), e não o provedor **YouTube** (com ID do vídeo).

## Próximos passos

- [Gerenciando sermões](managing-sermons) -- Adicione sermões à sua biblioteca
- [Playlists](playlists) -- Organize os sermões em séries
