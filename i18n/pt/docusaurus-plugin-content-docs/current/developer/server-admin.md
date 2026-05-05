---
title: "Administração de Servidor"
---

# Administração de Servidor

<div class="article-intro">

Os recursos de administração de servidor no ChurchApps estão disponíveis apenas para usuários com a permissão **Server.Admin**. Essas ferramentas são usadas para operações de plataforma, suporte e solução de problemas em todas as igrejas no sistema.

</div>

:::warning Acesso Restrito
Os recursos descritos nesta página requerem permissão **Server.Admin** e não estão disponíveis para administradores de igreja regulares. Eles são destinados apenas para operadores de plataforma e equipe de suporte.
:::

## Acessando Server Admin

Usuários com permissão Server.Admin podem acessar o painel de administração de servidor do B1 Admin:

1. Faça login em [admin.b1.church](https://admin.b1.church)
2. Clique na aba **Admin** na navegação principal
3. O painel Server Admin inclui abas para gerenciar igrejas, usuários e operações do sistema

## Personificação de Usuário

O recurso de personificação permite que administradores de servidor façam login como outro usuário para fins de suporte e solução de problemas. Isso é útil ao investigar problemas relatados por usuários ou ajudar igrejas a configurar seus sistemas.

### Como Personificar um Usuário

1. Navegue até a aba **Impersonate** no painel Server Admin
2. Insira o nome ou endereço de email do usuário no campo de pesquisa
3. Clique em **Search** ou pressione Enter
4. Nos resultados da pesquisa, clique no usuário que deseja personificar
5. Confirme a personificação no diálogo que aparece
6. Você será conectado como esse usuário e redirecionado para a conta dele

### Notas Importantes

- A personificação cria uma nova sessão com as permissões do usuário alvo e acesso à igreja
- Sua sessão de admin original termina quando você personifica outro usuário
- Todas as ações tomadas enquanto personificado são registradas na trilha de auditoria
- Para retornar à sua conta de admin, faça logout e faça login novamente com suas credenciais
- Use a personificação apenas quando necessário para fins de suporte e sempre informe os usuários ao acessar suas contas para suporte

### Endpoint da API

O recurso de personificação é apoiado pelo endpoint `/users/:userId/impersonate` na API Membership. Consulte [Membership Endpoints](/docs/developer/api/endpoints/membership#users) para detalhes técnicos.

### Considerações de Segurança

- A personificação requer permissão Server.Admin - esta permissão deve ser concedida com moderação e apenas para operadores de plataforma confiáveis
- Todos os eventos de personificação são registrados com o ID do usuário admin e o ID do usuário alvo
- As igrejas não são notificadas quando a personificação ocorre, então estabeleça políticas claras sobre quando e como esse recurso deve ser usado
- Considere documentar eventos de personificação no seu sistema de tickets de suporte para responsabilidade

## Páginas Relacionadas

- [Authentication & Permissions](/docs/developer/api/endpoints/authentication) — Modelo de permissão e autenticação JWT
- [Membership Endpoints](/docs/developer/api/endpoints/membership) — API de gerenciamento de usuários e igrejas
- [Audit Log](/docs/b1-admin/reports/audit-log) — Ver logs de atividade para uma igreja
