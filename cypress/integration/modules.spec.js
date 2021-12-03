

describe('demo cypress', () => {
    beforeEach(() => {
      cy.visit('localhost:3000');
    })
  
    it('can add and remove an oscillator module', () => {
      cy.get('#add_module_select').should('be.visible');
      cy.get('#remove_module').should('be.visible');
      cy.get('#add_module').click();
      cy.get('#osc_core_1').should('be.visible');
      cy.get('#remove_module').click();
    })

    it('can add several modules and connect them', () => {
        cy.get('#add_module_select').select('Oscillator Panel');
        cy.get('#add_module').click();
        cy.get('#add_module_select').select('LFO');
        cy.get('#add_module').click();
        cy.get('#add_module_select').select('Filter');
        cy.get('#add_module').click();
        cy.get('#sel_osc_1').select('Sine');
        cy.get('#lfo_out_1').select('Osc 1');
        cy.get('#filter_out_1').select('LFO 1');
    })

    it('can play and pause', () => {
        cy.get('#playButton').click();
        cy.get('#pauseButton').click();
    })
})