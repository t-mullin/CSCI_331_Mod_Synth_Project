describe('demo cypress', () => {
    beforeEach(() => {
      cy.visit('localhost:8000');
    })
  
    it('can add an oscillator module', () => {
      cy.get('#add_module_select').should('be.visible');
      cy.get('#remove_module').should('be.visible');
      cy.get('#add_module').click();
      cy.wait(2000)
      cy.get('#osc_core_1').should('be.visible');
      cy.get('#remove_module').click();
    })
})