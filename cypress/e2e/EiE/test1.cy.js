

describe('', ()=>{

    it('google search', () => {
        cy.visit('https://www.google.com')
        cy.get('#APjFqb', ).type("Ruhul Amin");
        cy.contains('Google Search').click();
        cy.wait(2000)
        cy.contains('Wikipedia').click()
        
    })
})
