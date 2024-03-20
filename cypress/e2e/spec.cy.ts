describe('My First Test', () => {
  it('clicking "type" navigates to a new url', () => {
    cy.visit('http://localhost:3000');
    cy.contains('count').should('contains.text', '0');
    cy.contains('count').click();
    cy.contains('count').should('contains.text', '1');
  });
});
