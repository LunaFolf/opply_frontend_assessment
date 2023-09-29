# opply_frontend_assessment

For information on the goal, see the [prompt readme file](PROMPT.md).

---
## Still want to do:
- [ ] Figure out how tests work (use `src/components/__tests__/HelloWorld.spec.ts` to learn)
- [ ] Implement test(s) for what I've created
- [ ] Create utilities for repeating code
- [ ] Move any/all fetch requests to an api folder, to simplify code.

---

## Project Setup

Install packages
```zsh
bun i
```

### Compile and Hot-Reload for Development

```zsh
bun dev
```

### Type-Check, Compile and Minify for Production

```zsh
bun run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```zsh
bun test:unit
```

### Run End-to-End Tests with [Cypress](https://www.cypress.io/)

```zsh
bun test:e2e:dev
```

This runs the end-to-end tests against the Vite development server.
It is much faster than the production build.

But it's still recommended to test the production build with `test:e2e` before deploying (e.g. in CI environments):

```zsh
bun run build
bun test:e2e
```

### Lint with [ESLint](https://eslint.org/)

```zsh
bun lint
```
