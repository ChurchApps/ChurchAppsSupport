---
title: "Donorbox"
description: "Conecte o Donorbox ao B1 Admin com o Zapier para que as doações online criem registros de doação e perfis de pessoas dos doadores automaticamente, sem exportação manual."
---

# Donorbox

<div class="article-intro">

Se a sua igreja recebe doações pelo Donorbox, mas acompanha pessoas e extratos no B1, você pode fazer com que os gatilhos instantâneos do Zapier do Donorbox criem registros de doação correspondentes dentro do B1 -- e cadastrem o doador como pessoa no B1, caso ela ainda não exista. Sem conciliação manual e sem exportação mensal.

</div>

<div class="prereqs">
<h4>Antes de começar</h4>

- Uma conta no [Donorbox](https://donorbox.org) com pelo menos uma campanha
- Uma conta no [Zapier](https://zapier.com)
- Um usuário do B1Admin com a permissão **Editar configurações**

</div>

## O que você pode conectar {#what-you-can-wire-up}

| Direção | Gatilho do Donorbox | Ação no B1 |
|---|---|---|
| Donorbox → B1 | Doação nova ou atualizada (instantâneo) | Encontrar pessoa → Adicionar doação |
| Donorbox → B1 | Doador novo ou atualizado | Criar pessoa |
| Donorbox → B1 | Plano novo ou atualizado (recorrente) | Encontrar pessoa → Adicionar doação (use o ID do plano como observação) |

O Donorbox publica os gatilhos como **instantâneos** -- eles disparam em poucos segundos após uma doação real. Não há atraso de consulta.

## Configuração {#setup}

### 1. Crie uma chave de API do B1 {#1-mint-a-b1-api-key}

No B1Admin: **Configurações → Desenvolvedor → Chaves de API → Nova chave de API**. Escopos:

- `people:read` -- para localizar o doador pelo e-mail
- `people:write` -- para criá-lo, caso seja novo
- `donations:write` -- para registrar a contribuição

- `settings:write` -- o Zapier verifica cada chave do B1 contra a lista de webhooks do B1 quando você a conecta, então a conexão falha sem ele (mesmo que o gatilho pertença ao Donorbox, e não ao B1, neste caso)

### 2. Monte o Zap "registrar uma doação" {#2-build-the-record-a-donation-zap}

1. **Gatilho** -- Donorbox: Nova doação. Conecte com a chave de API do Donorbox (no Donorbox: *Conta → Perfil → Configurações de API*).
2. **Ação** -- B1.church: Encontrar pessoa. Mapeie o e-mail do doador, vindo do gatilho, para o campo *E-mail*.
3. **Ação** -- B1.church: Adicionar doação. Mapeie:
   - Pessoa → o ID da etapa 2
   - Valor → o valor da doação do gatilho
   - Data da doação → a data da doação do gatilho
   - Fundo → escolha o fundo do B1 que espelha a campanha do Donorbox (o Zapier permite trocar de fundo com base em um filtro ou em uma etapa de formatação)
   - Método → "Online"
   - Observações → ID da transação do Donorbox (útil na conciliação)

Ative o Zap. A próxima doação online recebida pelo Donorbox aparecerá automaticamente em **B1Admin → Doações**.

O *Encontrar pessoa* do B1 interrompe o Zap com o erro "No person found" quando ninguém tem aquele e-mail, então um passo de Filtro não consegue ramificar por isso. Para tratar doadores de primeira vez, ative o tratamento de erros do Zapier na etapa Encontrar pessoa e, no caminho de erro, execute B1.church: Criar pessoa (mapeie nome, sobrenome e e-mail) e depois Adicionar doação com o ID da nova pessoa. Ou execute o Zap *Doador novo* → *Criar pessoa* da tabela acima, para que os doadores existam no B1 antes de a contribuição chegar.

## Receitas comuns {#common-recipes}

### Um Zap por fundo {#one-zap-per-fund}

Se você tiver várias campanhas do Donorbox associadas a fundos separados do B1, a forma mais limpa é ter um Zap por campanha, com um filtro de *campanha* do Donorbox no início -- assim o mapeamento do fundo fica fixo e você dispensa a etapa de busca.

### Tratar doações atualizadas como correções {#treat-updated-donations-as-corrections}

O gatilho *Doação nova ou atualizada* do Donorbox também dispara em edições. Use uma etapa *Path* do Zapier sobre `event_type` para bifurcar: "new" → Adicionar doação; "updated" → Encontrar doação + Atualizar (observação: o app do B1 no Zapier não tem, no momento, uma ação de Atualizar doação -- por enquanto, registre os eventos "updated" em um canal do Slack para revisão manual).

### Sincronizar alterações de planos recorrentes com um canal do Slack {#sync-recurring-plan-changes-to-a-slack-channel}

- **Gatilho** -- Donorbox: Plano novo ou atualizado
- **Ação** -- Slack: Enviar mensagem para `#donations` (por exemplo, "Plano alterado -- a contribuição mensal da Sarah agora é de $200")

## Limites e observações {#limits--notes}

- **Associe os doadores pelo e-mail.** O Donorbox não compartilha o ID de pessoa do B1; a única chave de ligação duradoura é o e-mail. Doadores que contribuem com outro e-mail criarão uma nova pessoa no B1 -- a sua conciliação mensal deve procurar esses casos.
- **Estornos não são expostos separadamente** -- o Donorbox emite uma atualização de status na mesma doação. O app do B1 no Zapier não tem, no momento, uma ação *Atualizar doação*; o padrão seguro hoje é registrar os eventos de estorno fora do sistema e ajustar a doação manualmente.
- **Teste primeiro no sandbox do Donorbox** para não criar contribuições falsas no B1 de produção. O Donorbox fornece credenciais de modo de teste separadas das de produção.

## Solução de problemas {#troubleshooting}

- **Erros "No person found"** -- o doador ainda não está no B1 (ou contribuiu com outro e-mail). Adicione o caminho de erro descrito acima e confirme que a chave de API tem `people:write`, para que Criar pessoa possa ser executada.
- **O valor da doação parece 100 vezes maior ou menor** -- o Donorbox envia centavos em algumas variantes de payload e reais em outras. Use uma etapa *Formatter by Zapier -- Numbers* para dividir por 100, se necessário.
- **Doações duplicadas de uma mesma contribuição** -- o Donorbox dispara *Doação nova* e *Doação atualizada*. Filtre por `event_type = "donation.succeeded"` ou crie dois Zaps com filtros sem sobreposição.

## Veja também {#see-also}

- [Zapier (visão geral)](../zapier.md) -- o lado do B1 de todas as receitas do Zapier
- [Subsplash](./subsplash.md) -- outra plataforma de doações com app no Zapier
- [Mailchimp](./mailchimp.md) -- encadeie "nova contribuição" com uma marcação de e-mail
