---
title: "Transmissão ao Vivo"
---

# Transmissão ao Vivo

<div class="article-intro">

A página Horários de Transmissão ao Vivo permite que você configure seu agendamento de transmissão da igreja, gerencie horários de serviço e personalize a experiência do visualizador. Configure serviços semanais recorrentes ou eventos únicos, configure chat e configurações de vídeo e controle quando sua transmissão fica ao vivo.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **contentApi.streamingServices.edit**. Consulte [Funções e Permissões](../settings/roles-permissions.md) se você não tiver acesso.
- Tenha seu ID de Canal YouTube pronto se você planeja usar transmissão ao vivo automatizada
- Adicione pelo menos um [sermão](managing-sermons) ou URL ao vivo permanente para usar como sua fonte de transmissão

</div>

A página tem duas abas principais: **Serviços** para gerenciar seu agendamento de transmissão ao vivo e **Configurações** para configurar sua página de transmissão.

## Gerenciando Serviços

### Adicionando um Serviço

1. No B1 Admin, abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta) e escolha **Sermões**, depois clique na aba **Horários de Transmissão ao Vivo**.
2. Clique no botão **Adicionar Serviço** para criar um novo serviço agendado.
3. Insira um **Nome de Serviço** (por exemplo, "Domingo de Manhã").
4. Defina o **Horário de Serviço** -- escolha o dia e a hora em que seu serviço começa.
5. Defina **Recorre Semanalmente** como **Sim** para serviços semanais regulares ou **Não** para um evento único.

### Configurando Chat e Configurações de Vídeo

6. Em **Configurações de Chat**, defina quantos minutos antes e depois do serviço o chat deve ser ativado. Isso permite que visitantes começem a conversar antes do serviço começar e continuem depois.
7. Em **Configurações de Vídeo**, defina o quanto antes começar o fluxo de vídeo para contagem regressiva ou conteúdo pré-serviço.
8. Selecione qual sermão reproduzir no menu suspenso:
   - **Sermão Mais Recente** -- Reproduz automaticamente seu vídeo adicionado mais recentemente.
   - **Serviço Ao Vivo Atual** -- Reproduz seu fluxo ao vivo atual do YouTube usando seu ID de Canal.
   - Você também pode escolher qualquer sermão específico que você já salvou.
9. Clique em **Salvar** para agendar seu serviço.

:::info
Seu serviço será atualizado automaticamente cada semana se definido como recorrente. Você pode adicionar quantos serviços forem necessários. Os visitantes verão o próximo horário de serviço agendado quando visitarem sua página de transmissão.
:::

## Configurações da Página de Transmissão

Clique na aba **Configurações** para personalizar as abas e links que aparecem ao lado de sua transmissão ao vivo.

### Adicionando Abas

1. Clique no botão **Adicionar** para adicionar uma nova aba à sua página de transmissão ao vivo.
2. Escolha a aba pré-projetada **Chat** ou adicione uma aba personalizada com uma URL externa.
3. Para a aba Chat, apenas dê um nome na caixa **Texto da Aba** e a configuração está concluída.
4. Para uma aba vinculada, insira o nome da aba, escolha um ícone clicando no botão de ícone e insira a URL.
5. Suas abas configuradas aparecerão na página de transmissão ao vivo para os visitantes acessarem recursos adicionais e recursos interativos.

### Visualizando Sua Transmissão

Clique no botão **Visualize Sua Transmissão** para ver exatamente como sua página de transmissão ao vivo parecerá para os visitantes, incluindo seu logotipo, horários de serviço e abas configuradas.

## Configurando Sua Transmissão ao Vivo do YouTube

Para conectar seu canal YouTube para transmissão ao vivo automática:

1. Vá para **Sermões** e clique em **Adicionar Sermão**, depois selecione **Adicionar URL ao Vivo Permanente**.
2. O provedor de vídeo padrão é **Transmissão ao Vivo Atual do YouTube**. Insira seu **ID de Canal YouTube**.
3. Adicione um título e descrição, depois clique em **Salvar**.
4. Em **Horários de Transmissão ao Vivo**, crie um serviço e selecione seu URL ao vivo permanente no menu suspenso de sermão.

:::tip
Para encontrar seu ID de Canal YouTube, vá para as configurações avançadas do canal YouTube e copie o valor do ID do Canal.
:::

## Personalizando Cores e Logotipo

Sua página de transmissão ao vivo usa as configurações [Aparência](../website/appearance) do seu site:

- A **cor de sotaque clara** com texto escuro é usada para o cabeçalho.
- A **cor de sotaque escura** com texto claro é usada para a barra lateral.
- Seu **Logotipo de Fundo Claro** aparece na página de transmissão. Use uma imagem com fundo transparente e proporção de aspecto de 4:1.

Para alterar isso, vá para **Site** depois **Aparência** e atualize suas configurações [Paleta de Cores](../website/appearance#color-palette) e [Logotipo e Marca](../website/appearance#logo-and-branding).

## Adicionando Anfitriões de Transmissão

Para dar a membros da equipe acesso ao chat apenas para anfitriões ao lado do chat público:

1. Abra o **menu de seção** no canto superior esquerdo (o nome da seção com a pequena seta), escolha **Configurações** e clique em **Funções**.
2. Clique no botão de adição e selecione **Adicionar Função Personalizada**.
3. Nomeie a função "Anfitrião de Transmissão" e clique em **Salvar**.
4. Clique na nova função, depois clique em **Adicionar** na seção Membros para adicionar pessoas.
5. Desça para **Editar Permissões**, expanda a seção **Conteúdo** e marque **Chat de Anfitrião**.

Quando anfitriões fazem login na página de transmissão ao vivo, uma aba **Chat de Anfitrião** privada aparece ao lado do chat público para conversação apenas da equipe durante a transmissão.

:::info
Para mais detalhes sobre criação de funções e gerenciamento de permissões, consulte [Funções e Permissões](../settings/roles-permissions.md).
:::

## Solução de Problemas

Se sua transmissão ao vivo YouTube automatizada não está exibindo corretamente ao usar a opção "Transmissão ao Vivo Atual do YouTube" com seu ID de Canal, tente o seguinte:

**Sintomas:**
- O embed de transmissão ao vivo mostra "Vídeo indisponível"
- A página carrega mas nenhum vídeo aparece
- Embeds YouTube diretos funcionam, mas a transmissão ao vivo do canal automatizada não

**Solução:**
Verifique seu canal YouTube para transmissões ao vivo antigas ou futuras agendadas e delete-as:

1. Vá para seu YouTube Studio.
2. Navegue para **Conteúdo** depois **Ao Vivo**.
3. Procure por quaisquer vidas agendadas antigas ou futuras.
4. Delete essas entradas de transmissão ao vivo antigas ou agendadas.
5. Teste sua página de transmissão ao vivo novamente.

:::warning
O embed de transmissão ao vivo automatizada do YouTube pode ser bloqueado quando há múltiplas entradas de transmissão ao vivo agendadas ou anteriores em seu canal. Remover isso permite que o YouTube identifique e sirva adequadamente sua transmissão ao vivo atual.
:::

**Requisitos adicionais:**
- Sua transmissão ao vivo deve ser definida como **Pública** (não Não Listada ou Privada).
- Embedding deve ser permitido em suas configurações de transmissão YouTube.
- Certifique-se de que você está usando o provedor **Transmissão ao Vivo Atual do YouTube** (com ID de Canal), não o provedor **YouTube** (com ID de Vídeo).

## Próximos Passos

- [Gerenciando Sermões](managing-sermons) -- Adicione sermões à sua biblioteca
- [Playlists](playlists) -- Organize sermões em séries
