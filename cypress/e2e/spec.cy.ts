describe('My First Test', () => {
  it('accessing url renders application', () => {
    cy.visit('http://localhost:3000');
    cy.contains('none').should('contains.text', 'none');
  });
});
