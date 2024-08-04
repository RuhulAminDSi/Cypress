// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';

    it('Public Open Properties', ()=>{
        cy.visit(loginUrl);
        cy.get(':nth-child(2) > .nav-link').click();
    })
    

});