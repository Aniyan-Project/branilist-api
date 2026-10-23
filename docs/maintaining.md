# Manutenção e publicação

A versão do SDK segue SemVer e é independente da versão do servidor Branilist. Enquanto estiver em 0.x, mudanças incompatíveis incrementam a versão minor; correções compatíveis incrementam patch.

## Atualizar o contrato

1. Execute `npm run schema:sync`. A origem padrão é o SDL público de `Aniyan-Project/Branilist-docs`.
2. Execute `npm run generate`, revise o SDL e os tipos gerados e atualize exemplos/documentação.
3. Execute `npm run check`, `npm pack --dry-run` e `npm run test:package`.
4. Verifique compatibilidade, atualize a versão em `package.json`/lockfile e registre o changelog.

Atualização do schema não deve publicar versões automaticamente. Mudanças de autorização, nulabilidade e argumentos precisam de revisão mesmo quando a geração compila.

## Primeira publicação no npm

O repositório GitHub e o registro npm são serviços separados. A primeira publicação requer uma conta npm autorizada na organização `aniyan-project` para o pacote `@aniyan-project/branilist-api` e o cumprimento das exigências de autenticação/2FA da conta.

```sh
npm login
npm whoami
npm run check
npm pack --dry-run
npm publish --access public
```

Use a autenticação interativa do npm; não coloque tokens no código nem em mensagens. Confirme o proprietário/organização desejado e a disponibilidade do nome antes de publicar. Para validar uma versão antes da publicação, instale o `.tgz` gerado por `npm pack`.

Depois da publicação, crie uma tag/release GitHub correspondente à versão publicada. Não reutilize uma versão já publicada.

## Automação

O workflow CI valida Node.js 22/24, testes, geração e montagem do pacote. Também oferece execução manual, inclusive quando um commit inclui `[skip ci]`.

### Publicação pelo GitHub Actions

O workflow [Publish to npm](https://github.com/Aniyan-Project/branilist-api/actions/workflows/publish.yml) usa OIDC Trusted Publishing, sem `NPM_TOKEN` ou outros tokens npm permanentes no GitHub. A confiança no npm deve apontar para:

| Campo | Valor |
| --- | --- |
| Organização GitHub | `Aniyan-Project` |
| Repositório | `branilist-api` |
| Workflow | `publish.yml` |
| Ambiente | `npm-publish` |
| Permissão | `npm publish` |

O ambiente `npm-publish` aceita somente a branch `main`. Apenas o job de publicação pode solicitar uma identidade OIDC. As actions são fixadas por SHA e o pacote é construído e testado em um job separado, sem permissão OIDC. O job de publicação recebe o mesmo `.tgz` validado e verifica seu checksum, sem executar scripts do pacote. O npm gera a comprovação de origem (provenance) na publicação via OIDC.

A verificação de identidade usa o formato de subject imutável do GitHub, com os IDs da organização (`110223729`) e do repositório (`1430609300`). Renomeações, transferências ou alterações na configuração OIDC precisam de revisão dessa verificação e da relação de confiança no npm.

Para lançar uma versão estável:

1. Atualize `package.json`, `package-lock.json` e `CHANGELOG.md`, valide e envie as alterações para `main`.
2. Abra **Actions → Publish to npm → Run workflow**, selecionando `main`.
3. Informe a versão exata no formato `x.y.z`, sem o prefixo `v`.
4. Deixe **Publish to npm after validation** desmarcado para uma prévia. Ela executa os testes, instala o pacote em consumidores ESM/CommonJS e valida a identidade OIDC do GitHub; não publica nem troca essa identidade por uma credencial npm.
5. Para publicar, execute novamente com a mesma versão e marque essa opção. O workflow rejeita versões já publicadas. Depois, registre a tag/release correspondente no GitHub.

O processo não incrementa versões nem publica a cada push. O modo de prévia não testa uma publicação real no npm; a primeira nova versão pelo workflow confirma também a troca de credenciais OIDC com o registro.

Para recriar a configuração de confiança, um proprietário do pacote pode usar:

```sh
npm trust github @aniyan-project/branilist-api --repo Aniyan-Project/branilist-api --file publish.yml --environment npm-publish --allow-publish --yes
```

O npm pode exigir confirmação de 2FA para alterar essa configuração. A publicação manual local continua disponível com a autenticação exigida pelo npm. Consulte a [documentação oficial de Trusted Publishing](https://docs.npmjs.com/trusted-publishers/) ao alterar a relação de confiança.
