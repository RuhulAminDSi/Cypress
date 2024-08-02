// cypress/integration/login_logout.spec.js

describe('Test Page with EO bundle', () => {

    // Loop through each ID  
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const fundReleasenote = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests';
    const password = 'Maski1#109';
    const comment = 'Done Comment';
    const sessionId = '181';
    const installmentnumber = 7;
    const percentage = 1;
    // Handle uncaught exceptions to prevent test failure
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });

    it('Bundle Creation', () => {
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit(loginUrl);
        cy.get('input[type="text"]').type('01521532789'); // Adjust the selector if necessary
        cy.get('input[type="password"]').type(password); // Adjust the selector if necessary

        // Click the login button
        cy.get('#login-submit').click();
        const otp = '8888'; // The OTP to be entered
        // Get all OTP input fields and enter the digits one by one
        cy.get('.otp-input').each(($el, index) => {
            cy.wrap($el).type(otp[index]);
        });
        // Click the submit button for the OTP
        cy.get('#otp-submit').click();
        // Wait for the URL to change after OTP submission
        cy.url().should('not.include', 'login');
        // Proceed to the next page
        cy.visit(fundReleasenote);
        cy.get('#bundle-request-create').click();
        cy.get('#slip-session').select(sessionId);
        cy.get('#slip-session-installment').select(installmentnumber);
        cy.get('#bundle-request-percentage').type(percentage);
        cy.get('#new-bundle-request-btn').click();
        //cy.visit('https://ops.ipemis.qa.innovatorslab.net/slip/bundle-request/create');
        cy.get(':nth-child(3) > .col-7 > .form-control').type('02.08.2024.12.11');
        cy.get('.input-group > .form-control').type('02/08/2024');
        cy.get(':nth-child(5) > .col-7 > .form-control').type('testauto');
        cy.get(':nth-child(6) > .col-7 > .form-control').select('5133');
        cy.get('#submit-slip-bundle-request').click();
        cy.get('#remarks').type(comment);
        cy.get('input[type="checkbox"]').check({ force: true });
        cy.get('#confirm-submit-request').click();
        cy.get('.form-group > div > .btn').click();

        //  cy.get('button').contains('Manage').first().click({force: true});
        //  cy.contains('View Application Details').click({force: true});

        //  cy.get('#delete-slip-request').click();
        //  cy.get('#draft-delete-confirm-btn').click();
        //  cy.get('.form-group > div > .btn').click();
    })

});
