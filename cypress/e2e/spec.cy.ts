describe('My First Test', () => {
  it('accessing url renders application', () => {
    cy.visit('http://localhost:3000');
  });
});
