---
title: "Configuração da Twilio para igrejas (rascunho)"
description: "Rascunho da configuração da Twilio de propriedade da igreja no B1, orientações públicas de inscrição, exemplos de campanha e lista de verificação de aprovação."
---

# Rascunho de configuração da Twilio pela igreja

:::caution Rascunho para a integração proposta
Este é um fluxo proposto. O B1 agora tem uma opção básica de **Twilio** em **Configurações > Mensagens de texto** (SID da conta, Token de autenticação, Número de origem e o webhook de STOP de entrada) -- veja [Configurações da igreja: Mensagens de texto](../../b1-admin/settings/church-settings.md#texting). Os controles adicionais de configuração do B1, o mapeamento de consentimento e as etapas de validação abaixo são requisitos para uma versão futura, não instruções para encontrar configurações existentes. Leia a [proposta técnica](./twilio-byok-proposal) para escopo e dependências. As fontes da Twilio foram verificadas em 22 de outubro de 2026; verifique os requisitos atuais antes de enviar uma campanha.
:::

## A disposição recomendada

A sua igreja é dona da conta paga da Twilio, do número de telefone, do Messaging Service, da cobrança e do registro da campanha. O B1 enviaria mensagens por meio desses recursos usando credenciais inseridas de forma privada nas configurações da igreja. Mantenha pelo menos dois administradores apropriados da igreja com acesso à conta da Twilio, ative a segurança da conta e designe uma pessoa responsável pelo consentimento, pelas respostas recebidas e pelos avisos de rejeição.

A primeira versão proposta aqui cobre um número local dos EUA e um programa de mensagens da igreja claramente descrito. Os exemplos abaixo usam o programa fictício **Grace Community Church**, chamado **Grace Church Updates**, para mudanças de culto, lembretes de eventos e escalas de voluntários. Substitua todo nome, domínio, frequência, contato e finalidade pela prática real da igreja. Estes são exemplos específicos de igreja das regras da Twilio, não uma campanha pré-aprovada nem uma promessa de aprovação.

## 1. Prepare a experiência pública de inscrição no B1

Publique uma página como `https://www.example.org/text-updates` no site B1 da igreja, com um formulário público do B1 incorporado ou um link evidente para o seu formulário público independente. Publique também `https://www.example.org/privacy` e `https://www.example.org/sms-terms`. Esses endereços são marcadores; envie as URLs reais e acessíveis.

Para o formulário proposto de inscrição por SMS:

| Configuração | Configuração recomendada |
|---|---|
| Acesso | Pública/irrestrita; ativa durante a análise e a inscrição contínua; disponível sem login |
| Modo do formulário | Modo padrão inicialmente; o modo conversacional precisa do suporte explícito a consentimento descrito na proposta técnica |
| Celular | Claramente identificado com código do país; obrigatório apenas ao escolher a inscrição por SMS, se usado dentro de um formulário geral de conexão/evento |
| Escolha de SMS | Caixa de seleção opcional e separada, desmarcada por padrão, vinculada ao programa específico e ao campo de celular |
| Avisos | Visíveis ao lado da escolha de SMS: igreja/programa, finalidade e frequência das mensagens, possíveis tarifas, STOP, HELP, contato de suporte e links clicáveis reais para a Política de Privacidade/Termos de SMS |
| Outras ações | Visitantes podem enviar o cartão de conexão, se inscrever em um evento ou solicitar informações sem aderir ao SMS |
| Evidências | Salve o programa, o telefone exato, o consentimento selecionado, a submissão de origem, a hora do servidor e a versão do aviso/política; uma resposta comum de formulário, sozinha, não inscreve ninguém hoje |
| Automação de pessoas/grupos | Mantenha desligada a criação automática de pessoas e a atribuição a grupos em um piloto inicial de inscrição, a menos que tenham sido revisadas conforme as regras de correspondência existentes da igreja. A atribuição a grupo nunca é a autorização para SMS. |
| Automações existentes | Não inscreva todo remetente de formulário ou membro de grupo em um fluxo de mensagens de texto. Somente o mapeamento de consentimento verificado proposto pode autorizar esse programa. |
| Mensagem de agradecimento | Confirme que o formulário foi recebido sem afirmar que houve inscrição em SMS quando a caixa foi recusada ou quando a confirmação/análise ainda está pendente. |

Uma caixa de seleção já existente pode ilustrar o formulário, mas o B1 ainda precisa do registro de consentimento e dos bloqueios de envio. O renderizador compartilhado atual mostra as descrições como texto simples; digitar Markdown ou uma URL ali não garante que os links de política sejam clicáveis. A implementação deve fornecer um controle de consentimento acessível com links reais. Veja [criando formulários do B1](../../b1-admin/forms/creating-forms) e a [proposta técnica](./twilio-byok-proposal#consent-and-suppression-are-required-release-work).

A Twilio exige um opt-in voluntário e verificável. Não agrupe o SMS com termos obrigatórios de membresia, permissões de e-mail/telefone, consentimento de doação ou inscrição em evento. Um número de celular em um cartão de visitante não é, por si só, consentimento para SMS. Veja os [requisitos de consentimento voluntário](https://www.twilio.com/docs/api/errors/30923) da Twilio e as [recomendações de campanha](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations).

### Texto de exemplo para a inscrição

Use isto somente depois que a igreja escolher as finalidades, o remetente e a frequência reais. A caixa é opcional e começa desmarcada; os nomes das políticas precisam ser links no formulário renderizado.

> Sim, quero que a Grace Community Church me envie mensagens de texto pelo Grace Church Updates sobre mudanças nos cultos, eventos da igreja e escalas de voluntários, a partir do [número de origem registrado da igreja]. Espere até 4 mensagens por mês. Podem ser aplicadas tarifas de mensagem e de dados. Responda STOP para cancelar ou HELP para obter ajuda. A inscrição por SMS é opcional e não é necessária para participar, se inscrever ou contribuir. Veja nossa Política de Privacidade e nossos Termos de SMS. Dúvidas: [e-mail ou telefone de suporte da igreja].

"Até 4" é um exemplo de compromisso, não um limite prescrito pela Twilio. Substitua-o por uma frequência que a igreja realmente consiga cumprir; se a frequência variar, informe isso com honestidade e descreva a cadência esperada. Mantenha apelos promocionais ou programas ministeriais adicionais fora desta caixa, a menos que as suas finalidades e o consentimento tenham sido avaliados separadamente.

Para um formulário geral de visitante/evento, enviar com esta caixa desmarcada ainda precisa funcionar. Um formulário exclusivo de SMS pode explicar que marcar a caixa solicita a inscrição, mas nunca deve fazer com que os cultos da igreja, não relacionados, dependam de inscrição. Confirme o comportamento real no celular e no computador.

### Conteúdo de política a preparar

A página de privacidade da igreja deve explicar quais informações ela coleta para mensagens de texto, como as usa e protege, e quais são as suas práticas de retenção e contato. Deve afirmar claramente que números de celular e consentimentos para mensagens não são vendidos nem compartilhados com terceiros ou afiliados para fins de marketing ou promoção. Explique com precisão o processamento necessário por provedores de serviço; não afirme que a igreja nunca usa um processador enquanto usa o B1 e a Twilio. As [orientações de política de privacidade](https://www.twilio.com/docs/api/errors/30908) e as [recomendações de campanha](https://help.twilio.com/hc/en-us/articles/26149060902555-A2P-10DLC-Campaign-Registration-Recommendations) da Twilio são a referência para essa distinção.

Os termos de SMS devem identificar a igreja e o programa, as finalidades, a frequência real, possíveis cobranças de mensagens, as instruções de STOP/HELP, o contato de suporte e o link de privacidade; inclua quaisquer avisos adicionais solicitados pela revisão atual da Twilio. Os links de política na página de opt-in devem corresponder exatamente às URLs enviadas na campanha. Desde 30 de junho de 2026, a Twilio exige URLs públicas dedicadas de privacidade e de termos para novos registros de campanha via API; o fluxo do Console também as coleta. [Exigência da Twilio](https://www.twilio.com/en-us/changelog/a2p-10dlc-campaign-registration-will-require-privacy-policy-and-)

Estes são requisitos de conteúdo a aplicar às políticas reais da igreja, não um substituto para as práticas de privacidade já existentes nem uma política genérica para colar sem conferência.

## 2. Registre a igreja e o seu programa de mensagens na Twilio

1. Crie ou use uma **conta paga de propriedade da igreja** e um número local dos EUA com capacidade de SMS. Use o nome jurídico da igreja, o EIN/registro empresarial, o endereço, o site e o representante autorizado de forma consistente. Não use a identidade da ChurchApps nem as informações de outra igreja.
2. Siga o fluxo de registro de Marca da Twilio para clientes diretos, conforme o tipo de entidade real da igreja. Para uma entidade sem fins lucrativos elegível, use as [orientações de registro para organizações sem fins lucrativos](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/onboarding-for-government-and-non-profit-agencies). Casos de uso de entidade beneficente/501(c)(3) dependem de elegibilidade; o nome da igreja, por si só, não estabelece aprovação ou isenção pela Twilio.
3. Crie um Messaging Service dedicado e envie a campanha A2P 10DLC pertinente. Escolha o caso de uso que corresponda com veracidade às mensagens reais e às opções disponíveis para aquela Marca aprovada; os exemplos aqui não prescrevem um código de caso de uso universal para igrejas.
4. Forneça a URL pública de inscrição, as URLs de política, a descrição completa do fluxo de opt-in e os exemplos de mensagens solicitados. Inclua todos os métodos reais de inscrição e alinhe as declarações de links incorporados e de números de telefone ao conteúdo real. Não liste inscrição por palavra-chave ou dupla confirmação (double opt-in) a menos que esse fluxo exista e tenha sido testado.
5. Associe o número de envio ao serviço e à campanha aprovada. Aguarde tanto a verificação da campanha quanto o **registro concluído do número** antes de enviar.

Mantenha essas etapas no Console da Twilio da própria igreja. A integração proposta com o B1 não envia registros por igrejas. As [orientações rápidas de registro](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/quickstart) e o [recurso de campanha](https://www.twilio.com/docs/messaging/api/usapptoperson-resource) da Twilio explicam os campos e o status do registro. Um número pendente ainda pode bloquear o envio depois que a campanha for aprovada. [Registro do número](https://www.twilio.com/docs/api/errors/30035)

### Exemplo de descrição da campanha

> A Grace Community Church usa o Grace Church Updates para enviar avisos de mudanças na programação dos cultos, lembretes de eventos da igreja e avisos de escalas de voluntários para pessoas que escolhem este programa em nosso site público. Enviamos no máximo quatro mensagens por mês neste programa. Os destinatários podem interromper essas mensagens a qualquer momento. Este programa não inclui contatos comprados, promoções de terceiros nem apelos de arrecadação.

Este exemplo se aplica apenas a uma igreja que de fato cumpra esses limites e exclusões. Se os lembretes de voluntários sozinhos excederem a frequência prometida, altere o desenho do programa e o aviso antes do envio.

### Exemplo de descrição do fluxo de mensagens

> Os visitantes abrem [URL real de inscrição da igreja], informam seu número de celular e selecionam de forma independente a caixa opcional do Grace Church Updates. Ela vem desmarcada quando o formulário abre. O aviso identifica a Grace Community Church, descreve mudanças nos cultos, lembretes de eventos e escalas de voluntários, informa o limite mensal e as possíveis tarifas, e explica STOP e HELP. A Política de Privacidade e os Termos de SMS exibidos levam a [URL real da privacidade] e a [URL real dos termos de SMS]. Recusar o SMS não impede a presença nos cultos, a inscrição em eventos, a contribuição ou o uso do formulário geral de conexão. O B1 registra a seleção afirmativa, o número de telefone, a hora do envio e a versão do aviso. Enviamos este programa somente para os assinantes documentados e suprimimos as desistências antes de qualquer envio posterior.

Adapte esse parágrafo ao fluxo implementado. Se for usada confirmação por telefone ou análise da equipe, descreva o estado pendente e a etapa exata de ativação. Se outros métodos forem usados, inclua cada método e sua evidência. Quando a inscrição estiver atrás de um login ou ocorrer em papel, a Twilio pede evidências públicas e redigidas da experiência real de opt-in; nunca exponha formulários preenchidos ou dados de membros. [Orientações sobre opt-in verificável](https://www.twilio.com/docs/api/errors/30923)

### Exemplos de mensagens enviadas

Estes são exemplos fictícios para adaptar; use URLs reais da igreja e substitua os valores entre colchetes antes do envio. A API de campanha da Twilio aceita de duas a cinco amostras. As amostras devem identificar a igreja, refletir a finalidade declarada e incluir uma instrução de cancelamento. [Campos de amostra de campanha](https://www.twilio.com/docs/messaging/api/usapptoperson-resource)

```text
Grace Community Church: Sunday's service will start at [time] due to [reason]. Details: [church website URL]. Reply STOP to end texts.
```

```text
Grace Community Church: A reminder that [church event] is on [date] at [time]. Information: [church event URL]. Reply STOP to end texts.
```

```text
Grace Community Church: You are scheduled to serve on [team] this [day]. Please review your plan: [B1 church portal URL]. Reply STOP to end texts.
```

Os URLs entre colchetes descrevem variáveis de exemplo; os exemplos enviados devem mostrar o domínio real da igreja e o estilo real do link. Um link para um plano pode exigir login, mas a página de inscrição e as políticas usadas para análise devem ser públicas e revisáveis. Não inclua notas privadas, informações de crianças ou detalhes identificáveis de membros nas amostras de aprovação. Mantenha o conteúdo de amostra consistente com o que os modelos do B1 realmente enviam; não prometa uma caixa de respostas nem um comportamento de lembrete indisponível.

### Respostas a STOP, START e HELP

Use o Advanced Opt-Out do Messaging Service da Twilio para essas confirmações e personalize a identidade da igreja/programa e os dados de suporte. Intenção de resposta de exemplo:

- **STOP:** Confirmar que o Grace Church Updates foi interrompido e explicar a forma suportada de retomar.
- **START:** Confirmar a retomada do mesmo programa, incluindo a sua identidade, a cadência/tarifas e as instruções de ajuda/cancelamento exigidas pelo fluxo configurado.
- **HELP:** Identificar a Grace Community Church e fornecer o contato real de suporte e as instruções de cancelamento.

Não envie uma segunda confirmação do B1 quando a Twilio já tiver respondido. Uma resposta HELP não é uma inscrição. START não deve inscrever alguém em programas adicionais da igreja nem revelá-los no diretório de membros. [Advanced Opt-Out da Twilio](https://www.twilio.com/docs/messaging/tutorials/advanced-opt-out)

## 3. Confira o pacote de aprovação antes do envio

- [ ] A razão social/informações da Marca, a identidade do site e a finalidade da campanha da igreja são coerentes entre si.
- [ ] A página de inscrição e o formulário ativo abrem sem login em um navegador privado, inclusive em dispositivo móvel.
- [ ] A caixa de SMS começa desmarcada e pode ser recusada enquanto se conclui a ação principal do visitante/evento.
- [ ] Finalidade do programa, remetente, frequência real, possíveis cobranças, STOP, HELP, contato de suporte e links clicáveis das políticas aparecem ao lado da escolha de SMS.
- [ ] As URLs exatas de privacidade/termos enviadas à Twilio são públicas, funcionam sem credenciais e identificam a mesma igreja/programa. O conteúdo das políticas condiz com o processamento real.
- [ ] Cada mensagem de exemplo corresponde ao programa, à identidade real do remetente e ao comportamento esperado de links/telefone. A campanha descreve todos os métodos reais de opt-in.
- [ ] Capturas de tela redigidas mostram o formulário em branco, a caixa e os avisos, e os links de política como os revisores os verão. As evidências não contêm registros de membros nem chaves.
- [ ] A igreja tem uma forma operacional de manter as evidências de consentimento e de atender às desistências antes do envio, inclusive pedidos recebidos por telefone ou e-mail.

Estas verificações reduzem incompatibilidades evitáveis; a Twilio e seus parceiros de análise tomam a decisão de aprovação. Mantenha disponíveis as URLs reais da página de inscrição e das políticas depois da aprovação, e não apenas durante a análise.

## 4. Conecte e valide a futura integração com o B1

Depois que a integração for lançada, a configuração proposta de Mensagens de texto deve coletar o SID da conta da igreja, a API Key SID/secret dedicada, o Auth Token separado do webhook, o SID do Messaging Service e o remetente selecionado. Crie as chaves somente no Console da igreja e insira os segredos somente nas configurações privadas do B1. [Orientações sobre chaves de API da Twilio](https://www.twilio.com/docs/iam/api-keys)

Copie as URLs de webhook de entrada e de status de entrega específicas da igreja, fornecidas pelo B1, para a configuração correspondente do serviço na Twilio. Ative o Advanced Opt-Out e confirme que as mensagens recebidas chegam ao webhook configurado. O B1 deve exibir verificações separadas para credenciais, propriedade do serviço e do remetente, campanha verificada, registro de número concluído, verificação de entrada e o teste de entrega. Uma credencial salva ou uma requisição de API aceita não é a entrega final.

Se o B1 não puder verificar programaticamente um sinal de registro, confirme diretamente no Console; a interface deve rotular o resultado datado como confirmado pelo administrador. Resolva o status pendente ou com falha antes de habilitar mensagens de produção. Use um teste separado, explicitamente solicitado, para um adulto destinatário de teste que consinta, e então:

1. Confirme que uma inscrição documentada correspondente cria o registro de consentimento correto de telefone e programa; recusar ou trocar de telefone não deve inscrever silenciosamente um destinatário.
2. Envie um teste, confirme o recebimento e compare o status no B1 com o SID da Mensagem da Twilio e o resultado da entrega.
3. Responda STOP e verifique se mensagens manuais, mensagens em grupo, fluxos de trabalho e lembretes ignoram aquele telefone. A visibilidade no diretório não deve mudar.
4. Execute o fluxo documentado de reinscrição no mesmo programa e a resposta HELP; verifique que não há confirmações duplicadas nem alterações de preferências não relacionadas.

## 5. Mantenha o programa

Designe um responsável da igreja para monitorar o status da campanha e da conta, os alertas de saldo e cobrança, as falhas de envio e as respostas recebidas na Twilio. A primeira versão proposta do B1 não tem caixa de entrada de SMS conversacional; por isso, publique e monitore um contato de ajuda real e verifique as respostas, em vez de presumir que a equipe as vê no B1.

Mantenha o histórico de consentimento e de desistências, as versões atuais de aviso e de política, os identificadores da campanha e as evidências de aprovação redigidas em registros controlados pela igreja. Nunca cole chaves ou listas de destinatários em chamados públicos de suporte. Quando um número, serviço, credencial, fluxo de inscrição, frequência ou finalidade mudar, revalide a integração e atualize o registro e o consentimento quando necessário antes de retomar. Revise com cuidado números de celular compartilhados por famílias e números alterados; a elegibilidade segue o telefone consentidor e o programa, não o registro de cada membro da família.

Em caso de rejeição, leia o erro real da Twilio, corrija a inconsistência específica tanto no site quanto no envio e reenvie pelo Console da igreja. Para remetentes não registrados ou pendentes, aguarde a conclusão do registro, em vez de trocar de número para contornar o problema. Use a [solução de problemas de registro da Twilio](https://www.twilio.com/docs/messaging/compliance/a2p-10dlc/troubleshooting-a2p-brands) e a referência de códigos de erro fornecida. Não prometa um prazo fixo de resposta.
