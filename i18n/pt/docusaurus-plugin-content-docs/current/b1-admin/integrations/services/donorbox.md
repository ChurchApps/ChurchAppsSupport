---
title: "Donorbox"
---

# Donorbox

<div class="article-intro">

Se sua igreja recebe doações através do Donorbox mas rastreia pessoas e extratos em B1, você pode ter os gatilhos instantâneos Zapier do Donorbox criar registros de doação correspondentes dentro de B1 — e criar o doador como uma pessoa B1 se ele não existir. Sem reconciliação manual, sem exportação mensal.

</div>

<div class="prereqs">
<h4>Antes de Começar</h4>

- Uma conta [Donorbox](https://donorbox.org) com pelo menos uma campanha
- Uma conta [Zapier](https://zapier.com)
- Um usuário B1Admin com permissão para **Editar Configurações**

</div>

## O Que Você Pode Conectar

| Direção | Gatilho Donorbox | Ação B1 |
|---|---|---|
| Donorbox → B1 | Doação Nova ou Atualizada (instantânea) | Procurar Pessoa → Adicionar Doação |
| Donorbox → B1 | Doador Novo ou Atualizado | Criar Pessoa |
| Donorbox → B1 | Plano Novo ou Atualizado (recorrente) | Procurar Pessoa → Adicionar Doação (use id Plano como nota) |

Donorbox publica seus gatilhos como **instantâneos** — eles disparam em segundos de uma doação real. Sem atraso de polling.

## Configuração

### 1. Cunhar uma chave de API B1

Em B1Admin: **Configurações → Desenvolvedor → Chaves de API → Nova Chave de API**. Escopos:

- `people:read` — para procurar o doador por email
- `people:write` — para criá-lo se for novo
- `donations:write` — para registrar o presente

Gatilhos nesta direção são do Donorbox, não B1, então você não precisa de `settings:write` aqui.

### 2. Construir o Zap "registrar uma doação"

1. **Gatilho** — Donorbox: Nova Doação. Conecte com a chave de API do Donorbox (em Donorbox: *Conta → Perfil → Configurações da API*).
2. **Ação** — B1.church: Procurar Pessoa. Mapeie o email do doador do gatilho para o campo de busca *Email*.
3. **Ação** — Filtro by Zapier (opcional): apenas continuar se o doador não foi encontrado, então…
4. **Ação** — B1.church: Criar Pessoa. Mapeie primeiro/último/email para que o doador apareça como membro, não apenas um registro de presente.
5. **Ação** — B1.church: Adicionar Doação. Mapeie:
   - Valor → `data.amount`
   - Data da Doação → data de doação do gatilho
   - Fundo → escolha o fundo B1 que espelha a campanha Donorbox (Zapier permite trocar fundos com base em um filtro ou passo formatter)
   - Método → "Online"
   - Notas → id de transação Donorbox (útil ao reconciliar)

Ative o Zap. A próxima doação ao vivo através do Donorbox aparece em **B1Admin → Doações** automaticamente.

## Receitas Comuns

### Um Zap por fundo

Se você executar múltiplas campanhas Donorbox que mapeiam para fundos B1 separados, o layout mais limpo é um Zap por campanha com um filtro *campanha* Donorbox no topo — dessa forma o mapeamento de fundo é codificado e você pula o passo de busca.

### Tratar doações atualizadas como correções

O *Nova ou Atualizada Doação* do Donorbox dispara em edições também. Use um passo *Caminho* Zapier em `event_type` para fazer fork: "nova" → Adicionar Doação, "atualizada" → Procurar Doação + Atualizar (nota: o aplicativo Zapier B1 não tem atualmente uma ação Atualizar Doação — por enquanto, registre eventos "atualizado" em um canal Slack para análise manual).

### Sincronizar alterações de plano recorrente para um canal Slack

- **Gatilho** — Donorbox: Plano Novo ou Atualizado
- **Ação** — Slack: Enviar Mensagem para `#donations` (por ex. "Plano alterado — doação mensal de Sarah agora é $200")

## Limites e Notas

- **Corresponder doadores por email.** Donorbox não compartilha o id de pessoa B1; a única chave de junção durável é email. Doadores que dão sob um email diferente criarão uma nova pessoa B1 — sua reconciliação mensal deve procurar por esses.
- **Reembolsos não são separadamente expostos** — Donorbox emite uma atualização de status na mesma doação. O aplicativo Zapier B1 atualmente não tem uma ação *Atualizar Doação*; o padrão seguro hoje é registrar eventos de reembolso fora-de-banda e ajustar a doação manualmente.
- **Teste primeiro em sandbox Donorbox** para evitar criar presentes falsos em B1 de produção. Donorbox fornece credenciais de modo de teste separadas de ao vivo.

## Solução de Problemas

- **"Pessoa não encontrada" aviso a cada execução** — tudo bem se você tiver ordenado os passos para que um *Criar Pessoa* funcione no ramo não-encontrado. Se o passo Criar Pessoa nunca funciona também, verifique duplo que a chave de API tem `people:write`.
- **Valor de doação parece 100× grande ou pequeno demais** — Donorbox envia centavos em algumas variantes de payload e dólares em outras. Use um passo *Formatter by Zapier — Números* para dividir por 100 se necessário.
- **Doações duplicadas de um único presente** — Donorbox dispara ambos *Doação Nova* e *Doação Atualizada*. Ou filtre para `event_type = "donation.succeeded"` ou construa dois Zaps com filtros não-sobrepostos.

## Veja Também

- [Zapier (visão geral)](../zapier) — o lado B1 de cada receita Zapier
- [Subsplash](./subsplash) — outra plataforma de doação com um aplicativo Zapier
- [Mailchimp](./mailchimp) — cadeia "novo presente" em uma tag de email
