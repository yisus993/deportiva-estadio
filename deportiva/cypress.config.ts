import { defineConfig } from 'cypress';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:4200', // Cambia al puerto donde corre tu aplicación Angular
    supportFile: 'cypress/support/index.ts',
    specPattern: 'cypress/e2e/**/*.cy.ts',
  },
});
