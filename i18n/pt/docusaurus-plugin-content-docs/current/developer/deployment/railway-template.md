---
title: "Auto-Hospedagem no Railway"
---

# Auto-Hospedagem no Railway

<div class="article-intro">

ChurchApps publica um template de um clique para [Railway](https://railway.com) que oferece à sua igreja sua própria instância privada do B1 Admin, o portal de membros B1, a API e um banco de dados MySQL -- tudo rodando em infraestrutura que você possui e paga diretamente. Este guia leva você à produção em cerca de 15 minutos e depois percorre a configuração pós-implantação que a maioria das igrejas eventualmente deseja.

</div>

## Início Rápido

[![Deploy on Railway](https://railway.com/button.svg)](https://railway.com/deploy/b1-template)

1. Clique no botão **Deploy on Railway** acima.
2. Entre no Railway (ou crie uma conta gratuita) e adicione um método de pagamento.
3. Clique em **Deploy** sem alterar nada -- cada variável tem um padrão sensato.
4. Aguarde 5-10 minutos para os quatro serviços ficarem verdes.
5. Abra a URL do serviço **B1Admin**, clique em **Register** e crie sua conta. A primeira conta é automaticamente um administrador de servidor.
6. Siga os prompts do aplicativo para criar sua primeira igreja.

É isso. Agora você tem uma instância ChurchApps totalmente funcional. Tudo abaixo é polimento opcional.

:::tip
A implantação está atualmente em **beta**. Se você encontrar algo que os docs não cobrem, abra um issue em [github.com/ChurchApps/Api/issues](https://github.com/ChurchApps/Api/issues) com logs de implantação anexados.
:::

<div class="prereqs">
<h4>O Que Você Precisa</h4>

- Uma conta gratuita no [Railway](https://railway.com)
- Um cartão de crédito registrado no Railway (~$15-25/mês para uma congregação pequena; veja Custos)
- Cerca de 15 minutos para a implantação inicial
- *Opcional mas fortemente recomendado depois:* Credenciais SMTP e um domínio personalizado

</div>

## O Que É Implantado

O template provisiona quatro serviços em um único projeto Railway:

| Serviço | Propósito | URL após implantação |
|---------|---------|------------------|
| **MySQL** | Armazena todos os dados (uma instância, múltiplos esquemas) | apenas interno |
| **Api** | Backend para membership, content, giving, attendance, etc. | `https://api-<id>.up.railway.app` |
| **B1Admin** | Aplicativo web de equipe/admin | `https://b1admin-<id>.up.railway.app` |
| **B1App** | Aplicativo web voltado para membros e site da igreja | `https://b1app-<id>.up.railway.app` |

Os esquemas do banco de dados são criados automaticamente na primeira inicialização pela migração de inicialização da API.

:::info
Para mais detalhes sobre Configuração Inicial, Email, Domínios Personalizados, Multi-Site, Custos e Solução de Problemas, consulte a [documentação completa em inglês](https://docs.churchapps.org/docs/developer/deployment/railway-template).
:::
