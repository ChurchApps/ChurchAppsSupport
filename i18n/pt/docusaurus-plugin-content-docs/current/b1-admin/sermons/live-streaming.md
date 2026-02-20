---
title: "Transmissão ao Vivo"
---

# Transmissão ao Vivo

<div class="article-intro">

A página de Horários de Transmissão ao Vivo permite configurar o cronograma de transmissão da sua igreja, gerenciar horários de culto e personalizar a experiência do espectador. Configure cultos semanais recorrentes ou eventos únicos, defina configurações de chat e vídeo, e controle quando sua transmissão vai ao ar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **contentApi.streamingServices.edit**. Veja [Funções e Permissões](../settings/roles-permissions.md) se você não tem acesso.
- Tenha o ID do seu Canal do YouTube pronto se planeja usar transmissão ao vivo automatizada
- Adicione pelo menos um [sermão](managing-sermons) ou URL permanente de transmissão ao vivo para usar como fonte da sua transmissão

</div>

A página tem duas abas principais: **Cultos** para gerenciar seu cronograma de transmissão ao vivo e **Configurações** para configurar sua página de transmissão.

## Gerenciando Cultos

### Adicionando um Culto

1. No B1 Admin, clique em **Sermões** na barra lateral esquerda, depois clique na aba **Horários de Transmissão ao Vivo**.
2. Clique no botão **Adicionar Culto** para criar um novo culto agendado.
3. Insira um **Nome do Culto** (por exemplo, "Culto de Domingo de Manhã").
4. Defina o **Horário do Culto** -- escolha o dia e horário de início do seu culto.
5. Defina **Repete Semanalmente** como **Sim** para cultos semanais regulares, ou **Não** para um evento único.

### Configurando Chat e Vídeo

6. Em **Configurações de Chat**, defina quantos minutos antes e depois do culto o chat deve ser habilitado. Isso permite que os visitantes comecem a conversar antes do início do culto e continuem depois.
7. Em **Configurações de Vídeo**, defina com que antecedência iniciar a transmissão de vídeo para contagem regressiva ou conteúdo pré-culto.
8. Selecione qual sermão reproduzir no menu suspenso:
   - **Último Sermão** -- Reproduz automaticamente o vídeo adicionado mais recentemente.
   - **Culto ao Vivo Atual** -- Reproduz sua transmissão ao vivo atual do YouTube usando o ID do seu Canal.
   - Você também pode escolher qualquer sermão específico que já tenha salvo.
9. Clique em **Salvar** para agendar seu culto.

:::info
Seu culto será atualizado automaticamente a cada semana se definido como recorrente. Você pode adicionar quantos cultos precisar. Os visitantes verão o próximo horário de culto agendado quando visitarem sua página de transmissão.
:::

## Configurações da Página de Transmissão

Clique na aba **Configurações** para personalizar as abas e links que aparecem junto à sua transmissão ao vivo.

### Adicionando Abas

1. Clique no botão **Adicionar** para adicionar uma nova aba à sua página de transmissão ao vivo.
2. Escolha entre abas pré-configuradas (**Chat** ou **Oração**) ou adicione uma aba personalizada com uma URL externa.
3. Para abas pré-configuradas, basta dar um nome na caixa **Texto da Aba** e a configuração está completa.
4. Para uma aba vinculada, insira o nome da aba, escolha um ícone clicando no botão de ícone e insira a URL.
5. Suas abas configuradas aparecerão na página de transmissão ao vivo para que os espectadores acessem recursos adicionais e funcionalidades interativas.

### Visualizando Sua Transmissão

Clique no botão **Ver Sua Transmissão** para ver exatamente como sua página de transmissão ao vivo aparecerá para os visitantes, incluindo seu logo, horários de culto e abas configuradas.

## Configurando Sua Transmissão ao Vivo do YouTube

Para conectar seu canal do YouTube para transmissão ao vivo automática:

1. Vá em **Sermões** e clique em **Adicionar Sermão**, depois selecione **Adicionar URL Permanente de Transmissão ao Vivo**.
2. O provedor de vídeo padrão é **Transmissão ao Vivo Atual do YouTube**. Insira o **ID do seu Canal do YouTube**.
3. Adicione um título e descrição, depois clique em **Salvar**.
4. Em **Horários de Transmissão ao Vivo**, crie um culto e selecione sua URL permanente de transmissão ao vivo no menu suspenso de sermões.

:::tip
Para encontrar o ID do seu Canal do YouTube, vá às configurações avançadas do seu canal no YouTube e copie o valor do ID do Canal.
:::

## Personalizando Cores e Logo

Sua página de transmissão ao vivo usa as configurações de [Aparência](../website/appearance) do seu site:

- A **cor de destaque clara** com texto escuro é usada no cabeçalho.
- A **cor de destaque escura** com texto claro é usada na barra lateral.
- Seu **Logo de Fundo Claro** aparece na página de transmissão. Use uma imagem com fundo transparente e proporção 4:1.

Para alterar, vá em **Site** depois **Aparência** e atualize suas configurações de [Paleta de Cores](../website/appearance#color-palette) e [Logo](../website/appearance#logo-and-branding).

## Adicionando Apresentadores de Transmissão

Para dar a membros da equipe capacidades de apresentador (moderação de chat, respostas a pedidos de oração):

1. Vá em **Configurações** na barra lateral esquerda e clique em **Funções**.
2. Clique no botão de mais e selecione **Adicionar Função Personalizada**.
3. Nomeie a função como "Apresentador de Transmissão" e clique em **Salvar**.
4. Clique na nova função, depois clique em **Adicionar** na seção Membros para adicionar pessoas.
5. Role para baixo até **Editar Permissões**, expanda a seção **Conteúdo** e marque **Apresentador de Chat**.

Quando os apresentadores fizerem login na página de transmissão ao vivo, eles terão capacidades especiais incluindo moderação de chat e gerenciamento de pedidos de oração.

:::info
Para mais detalhes sobre criação de funções e gerenciamento de permissões, veja [Funções e Permissões](../settings/roles-permissions.md).
:::

## Solução de Problemas

Se sua transmissão ao vivo automatizada do YouTube não está sendo exibida corretamente ao usar a opção "Transmissão ao Vivo Atual do YouTube" com o ID do seu Canal, tente o seguinte:

**Sintomas:**
- O embed da transmissão ao vivo mostra "Vídeo indisponível"
- A página carrega mas nenhum vídeo aparece
- Embeds diretos do YouTube funcionam, mas a transmissão ao vivo automatizada do canal não funciona

**Solução:**
Verifique seu canal do YouTube para transmissões ao vivo antigas ou agendadas e exclua-as:

1. Vá ao seu YouTube Studio.
2. Navegue até **Conteúdo** e depois **Ao Vivo**.
3. Procure por transmissões ao vivo antigas ou transmissões agendadas futuras.
4. Exclua essas entradas de transmissão ao vivo antigas ou agendadas.
5. Teste sua página de transmissão ao vivo novamente.

:::warning
O embed de transmissão ao vivo automatizada do canal do YouTube pode ser bloqueado quando há múltiplas entradas de transmissão ao vivo agendadas ou passadas no seu canal. Removê-las permite que o YouTube identifique e sirva corretamente sua transmissão ao vivo atual.
:::

**Requisitos adicionais:**
- Sua transmissão ao vivo deve estar definida como **Pública** (não Não Listada ou Privada).
- O embedding deve ser permitido nas configurações da sua transmissão no YouTube.
- Certifique-se de que está usando o provedor **Transmissão ao Vivo Atual do YouTube** (com ID do Canal), não o provedor **YouTube** (com ID do Vídeo).

## Próximos Passos

- [Gerenciamento de Sermões](managing-sermons) -- Adicionar sermões à sua biblioteca
- [Playlists](playlists) -- Organizar sermões em séries
