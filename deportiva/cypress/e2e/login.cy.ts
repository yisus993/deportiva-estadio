describe('Prueba de Login', () => {
  it('Debería cargar la página de login', () => {
    cy.visit('/login'); // Ajusta la ruta según tu proyecto
    cy.contains('Iniciar Sesión').should('be.visible'); // Cambia según el texto de tu página de login
  });
});
