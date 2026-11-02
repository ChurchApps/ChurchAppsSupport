---
title: "Transmissão ao vivo"
---

# Transmissão ao vivo

<div class="article-intro">

A página Horários da transmissão ao vivo permite configurar a agenda de transmissões da sua igreja, gerenciar os horários dos cultos e personalizar a experiência do espectador. Configure cultos semanais recorrentes ou eventos pontuais, defina as configurações de chat e vídeo e controle quando a sua transmissão entra no ar.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Você precisa da permissão **contentApi.streamingServices.edit**. Veja [Funções e permissões](../settings/roles-permissions.md) se você não tiver acesso.
- Tenha em mãos o ID do seu canal do YouTube caso pretenda usar a transmissão ao vivo automatizada
- Adicione pelo menos um [sermão](managing-sermons) ou uma URL de transmissão permanente para usar como fonte da sua transmissão

</div>

A transmissão ao vivo é gerenciada em duas páginas da seção **Sermões** do menu Jump: **Horários da transmissão** para gerenciar a sua agenda de transmissões e **Configurações** para configurar as abas da sua página de transmissão.

## Gerenciando cultos

### Adicionando um culto

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Sermões** e clique em **Horários da transmissão**.
2. Clique no botão **Adicionar culto** no topo da página para criar um novo culto agendado. Os cultos existentes são listados em uma tabela que mostra o nome, o horário, o provedor e a duração de cada culto; clique no ícone de edição de uma linha para alterá-la.
3. Digite um **Nome do culto** (por exemplo, "Culto de domingo de manhã").
4. Defina o **Horário do culto** — escolha o dia e a hora em que o culto começa.
5. Defina **Repete semanalmente** como **Sim** para cultos semanais regulares, ou **Não** para um evento pontual.

### Configurando as opções de chat e vídeo

6. Em **Configurações de chat**, defina quantos minutos antes e depois do culto o chat deve estar habilitado. Isso permite que os visitantes comecem a conversar antes do culto e continuem depois.
7. Em **Configurações de vídeo**, defina com quanta antecedência o vídeo deve começar para conteúdo de contagem regressiva ou pré-culto. O chat abre esse número de minutos *antes* do início antecipado do vídeo, então o horário exibido ao lado da configuração de minutos antes do chat soma os dois números. Por exemplo, um culto às 10:00 com 15 minutos de chat antes e um início antecipado de 5 minutos abre o chat às 9:40.
8. Selecione qual sermão será reproduzido na lista suspensa:
   - **Sermão mais recente** -- Reproduz automaticamente o vídeo adicionado mais recentemente.
   - **Culto ao vivo atual** -- Reproduz a sua transmissão ao vivo atual do YouTube usando o seu ID de canal.
   - Você também pode escolher qualquer sermão específico que já tenha salvado.
9. Clique em **Salvar** para agendar o seu culto.

:::info
O seu culto será atualizado automaticamente toda semana se estiver configurado como recorrente. Ele permanece no mesmo horário local quando o horário de verão começa ou termina. Você pode adicionar quantos cultos precisar. Os visitantes verão o próximo horário de culto agendado quando acessarem a sua página de transmissão.
:::

## Configurações da página de transmissão

Para personalizar as abas e os links que aparecem ao lado da sua transmissão ao vivo, abra o menu Jump, expanda **Sermões** e clique em **Configurações**. A página **Configurações da transmissão** mostra a lista de **Abas de conteúdo**.

### Adicionando abas

1. Clique no botão **Adicionar** para incluir uma nova aba na sua página de transmissão ao vivo.
2. Escolha um **Tipo de link**: **URL externa** para um link personalizado, ou uma das abas predefinidas de **Chat** ou **Oração**.
3. Para a aba de Chat, basta dar um nome no campo **Texto da aba** e a configuração estará concluída.
4. Para uma aba com link, informe o nome da aba, escolha um ícone clicando no botão de ícone e digite a URL.
5. As abas configuradas aparecerão na página de transmissão ao vivo para que os espectadores acessem recursos adicionais e funcionalidades interativas.

### Visualizando a sua transmissão

Na página **Horários da transmissão**, clique em **Ver sua transmissão** no topo da página para ver exatamente como a sua página de transmissão ao vivo aparecerá para os visitantes, incluindo o seu logotipo, os horários dos cultos e as abas configuradas.

## Configurando a sua transmissão ao vivo no YouTube

Para conectar o seu canal do YouTube para transmissão ao vivo automática:

1. Acesse **Sermões** e clique em **Adicionar sermão**, depois selecione **Adicionar URL de transmissão permanente**.
2. O provedor de vídeo vem como **Transmissão ao vivo atual do YouTube** por padrão. Digite o seu **ID do canal do YouTube**.
3. Adicione um título e uma descrição, depois clique em **Salvar**.
4. Em **Horários da transmissão**, crie um culto e selecione a sua URL de transmissão permanente na lista suspensa de sermões.

:::tip
Para encontrar o ID do seu canal do YouTube, acesse as configurações avançadas do seu canal e copie o valor do ID do canal.
:::

## Personalizando cores e logotipo

A sua página de transmissão ao vivo usa as configurações de [Aparência](../website/appearance) do seu site:

- A **cor de destaque clara** com texto escuro é usada no cabeçalho.
- A **cor de destaque escura** com texto claro é usada na barra lateral.
- O seu **Logotipo para fundo claro** aparece na página de transmissão. Use uma imagem com fundo transparente e proporção de 4:1.

Para alterar essas configurações, acesse **Site** e depois **Aparência** e atualize as configurações de [Paleta de cores](../website/appearance#color-palette) e [Logotipo](../website/appearance#logo-and-branding).

## Adicionando apresentadores da transmissão

Para dar acesso aos membros da equipe ao chat exclusivo dos apresentadores, junto com o chat público:

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique no botão de mais e selecione **Adicionar função personalizada**.
3. Dê o nome "Apresentador da transmissão" à função e clique em **Salvar**.
4. Clique na nova função e depois em **Adicionar** na seção Membros para incluir pessoas.
5. Role até **Editar permissões**, expanda a seção **Conteúdo** e marque **Chat dos apresentadores**.

Quando os apresentadores entram na página de transmissão ao vivo, uma aba privada de **Chat dos apresentadores** aparece junto com o chat público, para conversas restritas à equipe durante a transmissão.

:::info
Para mais detalhes sobre como criar funções e gerenciar permissões, veja [Funções e permissões](../settings/roles-permissions.md).
:::

## Solução de problemas

Se a sua transmissão automatizada do YouTube não estiver sendo exibida corretamente ao usar a opção "Transmissão ao vivo atual do YouTube" com o seu ID de canal, tente o seguinte:

**Sintomas:**
- O player da transmissão mostra "Vídeo indisponível"
- A página carrega, mas nenhum vídeo aparece
- Os players diretos do YouTube funcionam, mas a transmissão automatizada do canal não

**Solução:**
Verifique no seu canal do YouTube se há transmissões antigas ou agendadas e exclua-as:

1. Acesse o seu YouTube Studio.
2. Navegue até **Conteúdo** e depois **Ao vivo**.
3. Procure por transmissões antigas agendadas ou transmissões futuras agendadas.
4. Exclua essas transmissões antigas ou agendadas.
5. Teste a sua página de transmissão novamente.

:::warning
O player automatizado da transmissão do canal no YouTube pode ser bloqueado quando há várias entradas de transmissões agendadas ou passadas no seu canal. Removê-las permite que o YouTube identifique e exiba corretamente a sua transmissão atual.
:::

**Requisitos adicionais:**
- Sua transmissão ao vivo deve estar definida como **Pública** (não Não listada nem Privada).
- A incorporação precisa estar permitida nas configurações de transmissão do seu YouTube.
- Certifique-se de estar usando o provedor **Transmissão ao vivo atual do YouTube** (com ID de canal), e não o provedor **YouTube** (com ID de vídeo).

## Próximos passos

- [Gerenciando sermões](managing-sermons) -- Adicione sermões à sua biblioteca
- [Listas de reprodução](playlists) -- Organize os sermões em séries
