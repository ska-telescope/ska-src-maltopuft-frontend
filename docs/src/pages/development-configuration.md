# Development configuration

Project guidelines follow from the Javascript coding guidelines detailed on the [SKAO developer portal](https://developer.skao.int/en/latest/tools/codeguides/javascript-codeguide.html#ska-javascript-coding-guidelines).

The application is bootstrapped with [Vite](https://vitejs.dev/).

## Typescript

Typescript 5.2 is used throughout the project. For an introduction to Typescript, please see:

1. [Typescript documentation](https://www.typescriptlang.org/docs/)
2. [React Typescript cheatsheet](https://react-typescript-cheatsheet.netlify.app/)

## Code formatting with Prettier

```bash
# Report errors
npm run prettier

# Modify files to fix issues
npm run prettier:fix 
```

## Linting with ESLint

```bash
# Report errors
npm run lint

# Modify files to fix issues
npm run lint:fix
```

## Module aliasing

Modules located within the `src` directory are *aliased* to `@`. In practice this means that `foo` located at `src/bar.ts` can be imported throughout the application as follows:

```javascript
import { foo } from '@/bar';
```

To add further aliasing to modules, the base configuration found in `vite.config.ts` and `tsconfig.json` both need to be extended. For example, to alias the module the `./src/components` as `@components`, the configurations could look similar to those below:  

```javascript
// vite.config.json
export default defineConfig({
  base: '/',

  // Module aliasing.
  // Resolve @ to ./src and @components to @components
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@components': path.resolve(__dirname, './src/components')
    }
  },
```

```javascript
// tsconfig.json
"compilerOptions": {
    ...
    /* Module aliasing */
    "baseUrl": ".",
    "paths": {
      "@/*": ["src/*"],
      "@components": ["src/components"]
    },
    ...
  }
```
