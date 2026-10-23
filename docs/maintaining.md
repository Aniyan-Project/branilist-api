# Manutenção e publicação

A versão do SDK segue SemVer e é independente da versão do servidor Branilist. Enquanto estiver em 0.x, mudanças incompatíveis incrementam a versão minor; correções compatíveis incrementam patch.

## Atualizar o contrato

1. Execute `npm run schema:sync`. A origem padrão é o SDL público de `Aniyan-Project/Branilist-docs`.
2. Execute `npm run generate`, revise o SDL e os tipos gerados e atualize exemplos/documentação.
3. Execute `npm run check`, `npm pack --dry-run` e `npm run test:package`.
4. Verifique compatibilidade, atualize a versão em `package.json`/lockfile e registre o changelog.

Atualização do schema não deve publicar versões automaticamente. Mudanças de autorização, nulabilidade e argumentos precisam de revisão mesmo quando a geração compila.

## Primeira publicação no npm

O repositório GitHub e o registro npm são serviços separados. A primeira publicação requer uma conta npm autorizada para o nome `branilist-api` e o cumprimento das exigências de autenticação/2FA da conta.

```sh
npm login
npm whoami
npm run check
npm pack --dry-run
npm publish --access public
```

Use a autenticação interativa do npm; não coloque tokens no código nem em mensagens. Confirme o proprietário/organização desejado e a disponibilidade do nome antes de publicar. A versão inicial ainda não publicada pode ser instalada a partir do `.tgz` gerado por `npm pack`.

Depois da publicação, ajuste a observação de pré-publicação no README e crie uma tag/release GitHub correspondente à versão publicada. Não reutilize uma versão já publicada.

## Automação

O workflow CI valida Node.js 22/24, testes, geração e montagem do pacote. Também oferece execução manual, inclusive quando um commit inclui `[skip ci]`. A automação não tem credenciais de publicação e não publica no npm. Configure publicação confiável no registro em uma mudança específica antes de automatizar releases.
