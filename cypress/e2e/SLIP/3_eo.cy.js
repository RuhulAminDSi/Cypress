// cypress/integration/login_logout.spec.js

describe('Test Page with EO bundle', () => {

    // Loop through each ID  
    const loginUrl = Cypress.env('loginUrl');
    const logoutUrl = Cypress.env('logoutUrl');
    const fundReleasenote = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests';
    const password = Cypress.env('password');
    const comment = Cypress.env('comment');
    const sessionId = 1; // 1 for mid term, 2 for annual plan
    const installmentnumber = 3;
    const percentage = 79.5;
    // Handle uncaught exceptions to prevent test failure
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });

    it('Bundle Creation', () => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit(loginUrl);
        cy.get('input[type="text"]').type('01521532789');
        cy.get('input[type="password"]').type(password);
        cy.get('#login-submit').click();
        // Click the login button
        {
            const otp = '8888';
            cy.get('.otp-input').each(($el, index) => {
                cy.wrap($el).type(otp[index]);
            });
            cy.get('#otp-submit').click({ force: true });
        }
        // Proceed to the next page
        cy.visit(fundReleasenote);
        //MODAL
        {
            cy.get('#bundle-request-create').click();
            // cy.get('#slip-session').select(sessionName);
            cy.get('#slip-session').then($select => {
                const options = $select.find('option');
                const optionToSelect = options.eq(sessionId).val(); // Select the third option (index 2)
                cy.wrap($select).select(optionToSelect);
            });
            cy.get('#slip-session-installment').select(installmentnumber);
            cy.get('#bundle-request-percentage').type(percentage);
            cy.get('#new-bundle-request-btn').click();
        }
            //FORM
        {
            cy.get(':nth-child(3) > .col-7 > .form-control').type('02.08.2024.12.11');
            cy.get('.input-group > .form-control').type('02/08/2024');
            cy.get(':nth-child(5) > .col-7 > .form-control').type('testauto');
            cy.get(':nth-child(6) > .col-7 > .form-control').select('5133');
            cy.get('#submit-slip-bundle-request').click();
            cy.get('#remarks').type(comment);
            cy.get('input[type="checkbox"]').check({ force: true });
            cy.get('#confirm-submit-request').click({ force: true });
        }

        //Delete
        // cy.get('button').contains('Manage').first().click({ force: true });
        // cy.contains('View Application Details').click({ force: true });
        // cy.get('#delete-slip-request').click();
        // cy.get('#draft-delete-confirm-btn').click();

        cy.get('.form-group > div > .btn').click();
    })

});
