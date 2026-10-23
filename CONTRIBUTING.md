# Contribuindo

Use Node.js 22 ou superior e execute `npm ci` e `npm run check` antes de abrir uma PR.

- Abra uma issue para discutir recursos e mudanças incompatíveis.
- Adicione testes que comprovem o comportamento alterado, sem credenciais reais.
- Não execute mutations em produção durante testes.
- Não edite `src/generated` manualmente. Atualize `schema.graphql`, execute `npm run generate` e revise o resultado.
- Preserve compatibilidade entre ESM/CommonJS e a ausência de dependências de execução.
- Não inclua tokens, dados pessoais, `.env` ou `.npmrc` no repositório ou pacote.

O contrato público está na [documentação do Branilist](https://docs.branilist.com/guide/graphql.html). Regras de domínio, autorização e privacidade permanecem no servidor. A contribuição é disponibilizada sob a licença MIT deste projeto.
