---
title: "Transmissão ao Vivo"
---

# Transmissão ao Vivo

<div class="article-intro">

A página Horários de Transmissão ao Vivo permite que você configure o cronograma de transmissão de sua igreja, gerencie horários de serviço e personalize a experiência do espectador. Configure serviços semanais recorrentes ou eventos únicos, configure as configurações de chat e vídeo e controle quando sua transmissão entra no ar.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Você precisa da permissão **contentApi.streamingServices.edit**. Consulte [Funções e Permissões](../settings/roles-permissions.md) se não tiver acesso.
- Tenha seu ID de Canal do YouTube pronto se planejar usar transmissão ao vivo automatizada
- Adicione pelo menos um [sermão](managing-sermons) ou URL de transmissão ao vivo permanente para usar como sua fonte de transmissão

</div>

A página tem duas abas principais: **Serviços** para gerenciar seu cronograma de transmissão ao vivo e **Configurações** para configurar sua página de transmissão.

## Gerenciando Serviços

### Adicionando um Serviço

1. No B1 Admin, abra o [menu Jump](../introduction.md#getting-around-with-the-jump-menu) (a barra de pesquisa no canto superior esquerdo), expanda **Sermões** e clique em **Horários de Transmissão ao Vivo**.
2. Clique no botão **Adicionar Serviço** para criar um novo serviço agendado.
3. Insira um **Nome do Serviço** (por exemplo, "Domingo de Manhã").
4. Defina o **Horário do Serviço** -- escolha o dia e a hora em que seu serviço começa.
5. Defina **Recorre Semanalmente** como **Sim** para serviços semanais regulares, ou **Não** para um evento único.

### Configurando as Configurações de Chat e Vídeo

6. Em **Configurações de Chat**, defina quantos minutos antes e depois do serviço o chat deve estar habilitado. Isso permite que os visitantes comecem a conversar antes do serviço começar e continuem depois.
7. Em **Configurações de Vídeo**, defina com que antecedência iniciar a transmissão de vídeo para contagem regressiva ou conteúdo pré-serviço.
8. Selecione qual sermão reproduzir no dropdown:
   - **Último Sermão** -- Reproduz automaticamente seu vídeo adicionado mais recentemente.
   - **Serviço ao Vivo Atual** -- Reproduz sua transmissão ao vivo atual do YouTube usando seu ID de Canal.
   - Você também pode escolher qualquer sermão específico que já tenha salvo.
9. Clique em **Salvar** para agendar seu serviço.

:::info
Seu serviço será atualizado automaticamente a cada semana se definido como recorrente. Você pode adicionar quantos serviços precisar. Os visitantes verão o próximo horário de serviço agendado quando visitarem sua página de transmissão.
:::

## Configurações de Página de Transmissão

Clique na aba **Configurações** para personalizar as abas e links que aparecem ao lado de sua transmissão ao vivo.

### Adicionando Abas

1. Clique no botão **Adicionar** para adicionar uma nova aba à sua página de transmissão ao vivo.
2. Escolha a aba **Chat** pré-projetada ou adicione uma aba personalizada com uma URL externa.
3. Para a aba Chat, apenas dê a ela um nome na caixa **Texto da Aba** e a configuração estará concluída.
4. Para uma aba vinculada, insira o nome da aba, escolha um ícone clicando no botão de ícone e insira a URL.
5. Suas abas configuradas aparecerão na página de transmissão ao vivo para os espectadores acessarem recursos adicionais e recursos interativos.

### Visualizando Sua Transmissão

Clique no botão **Visualizar Sua Transmissão** para ver exatamente como sua página de transmissão ao vivo parecerá aos visitantes, incluindo seu logotipo, horários de serviço e abas configuradas.

## Configurando Sua Transmissão ao Vivo do YouTube

Para conectar seu canal do YouTube para transmissão ao vivo automática:

1. Vá para **Sermões** e clique em **Adicionar Sermão**, em seguida selecione **Adicionar URL de Transmissão ao Vivo Permanente**.
2. O provedor de vídeo usa como padrão **Transmissão ao Vivo Atual do YouTube**. Insira seu **ID de Canal do YouTube**.
3. Adicione um título e descrição, em seguida clique em **Salvar**.
4. Em **Horários de Transmissão ao Vivo**, crie um serviço e selecione sua URL de transmissão ao vivo permanente no dropdown de sermão.

:::tip
Para encontrar seu ID de Canal do YouTube, vá para as configurações avançadas de seu canal do YouTube e copie o valor de ID de Canal.
:::

## Personalizando Cores e Logotipo

Sua página de transmissão ao vivo usa as configurações de [Aparência](../website/appearance) de seu website:

- A **cor de destaque clara** com texto escuro é usada no cabeçalho.
- A **cor de destaque escura** com texto claro é usada na barra lateral.
- Seu **Logotipo de Fundo Claro** aparece na página de transmissão. Use uma imagem com fundo transparente e proporção de aspecto 4:1.

Para alterar estes, vá para **Website** e depois **Aparência** e atualize suas configurações de [Paleta de Cores](../website/appearance#color-palette) e [Logotipo](../website/appearance#logo-and-branding).

## Adicionando Hosts de Transmissão

Para dar aos membros da equipe acesso ao chat apenas para hosts ao lado do chat público:

1. No menu Jump, escolha **Configurações > Funções**.
2. Clique no botão de mais e selecione **Adicionar Função Personalizada**.
3. Nomeie a função "Host de Transmissão" e clique em **Salvar**.
4. Clique na nova função e clique em **Adicionar** na seção Membros para adicionar pessoas.
5. Role para baixo até **Editar Permissões**, expanda a seção **Conteúdo** e marque **Chat do Host**.

Quando os hosts fazem login na página de transmissão ao vivo, uma aba **Chat do Host** privada aparece ao lado do chat público para conversa apenas de pessoal durante a transmissão.

:::info
Para mais detalhes sobre criação de funções e gerenciamento de permissões, consulte [Funções e Permissões](../settings/roles-permissions.md).
:::

## Solução de Problemas

Se sua transmissão ao vivo do YouTube automatizada não está exibindo corretamente ao usar a opção "Transmissão ao Vivo Atual do YouTube" com seu ID de Canal, tente o seguinte:

**Sintomas:**
- O embed de transmissão ao vivo mostra "Vídeo indisponível"
- A página carrega mas nenhum vídeo aparece
- Embeds diretos do YouTube funcionam, mas a transmissão ao vivo do canal automatizada não funciona

**Solução:**
Verifique seu canal do YouTube para transmissões ao vivo antigas ou agendadas e delete-as:

1. Vá para seu YouTube Studio.
2. Navegue até **Conteúdo** e depois **Ao Vivo**.
3. Procure por lives antigas agendadas ou fluxos agendados próximos.
4. Delete essas entradas de transmissão ao vivo antigas ou agendadas.
5. Teste sua página de transmissão ao vivo novamente.

:::warning
O embed de transmissão ao vivo de canal automatizado do YouTube pode ser bloqueado quando há várias entradas de transmissão ao vivo agendadas ou passadas em seu canal. Remover estas permite que o YouTube identifique e sirva adequadamente sua transmissão ao vivo atual.
:::

**Requisitos adicionais:**
- Sua transmissão ao vivo deve estar definida como **Pública** (não Não listada ou Privada).
- A incorporação deve ser permitida nas configurações de sua transmissão do YouTube.
- Certifique-se de que está usando o provedor **Transmissão ao Vivo Atual do YouTube** (com ID de Canal), não o provedor **YouTube** (com ID de Vídeo).

## Próximas Etapas

- [Gerenciando Sermões](managing-sermons) -- Adicionar sermões à sua biblioteca
- [Playlists](playlists) -- Organizar sermões em séries
