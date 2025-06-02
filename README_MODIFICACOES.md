# Modificações adicionadas

Este pacote foi gerado automaticamente em 2025-05-30 18:03:29 com as seguintes inclusões principais:

- **AdminPaginasComponent** — lista de páginas /admin/paginas
  - Interface melhorada com cartões para cada página
  - Navegação otimizada para o editor de páginas
- **PageEditorComponent** — editor de conteúdo por slug em /admin/paginas/:slug
  - Interface de usuário refinada com campo de busca para filtrar conteúdos
  - Feedback visual ao salvar alterações
  - Navegação de volta para a lista de páginas
- **AdminUsuariosComponent** — gestão de administradores em /admin/usuarios
- Rotas atualizadas em `src/app/app.routes.ts`
- Links de navegação adicionados em `admin.component.html`
- Variáveis de tema refinadas adicionadas a `src/styles/_variables.scss`
- Componentes usam **standalone** e seguem padrão Angular 17

> Atenção: a camada de persistência ainda utiliza `DataService` (localStorage).  
> Integre com seu backend conforme necessidade.

Obrigado e bons testes!
