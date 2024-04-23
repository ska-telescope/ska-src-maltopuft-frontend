import coverageTask from '@cypress/code-coverage/task';
import { defineConfig } from 'cypress';

export default defineConfig({
  env: {
    codeCoverage: {
      exclude: 'cypress/**/*.*'
    }
  },
  e2e: {
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    }
  },
  component: {
    devServer: {
      framework: 'react',
      bundler: 'vite'
    },
    setupNodeEvents(on, config) {
      coverageTask(on, config);
      return config;
    }
  }
});
