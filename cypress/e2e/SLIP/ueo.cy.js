// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const AUEOphoneNumbers = [
        '01864128333',
        '01746183334',
        '01716411240',
        '01712035989',
        '01712084072',
        '01722505413'
    ];
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const logoutUrl = 'https://login.ipemis.qa.innovatorslab.net/login?action=sign-out';
    const bundleId = Cypress.env('bundleId');
    //const review = `https://ops.ipemis.qa.innovatorslab.net/slip/bundle-request/review/${bundleId}`;
    const appList = 'https://ops.ipemis.qa.innovatorslab.net/slip/application-list';
    const password = 'Maski1#109';
    const comment = 'Done Comment';
    // const phoneNumber = '01729830890'; //'01306628285';
    // Loop through each ID  

    const reject = 0;
    AUEOphoneNumbers.forEach((phoneNumber) => {
        it(`should display user information for ID: ${phoneNumber}`, () => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            // Visit the page with the user ID  
            const username = `${phoneNumber}`;
            // Perform assertions  
            // Handle uncaught exceptions to prevent test failure
            Cypress.on('uncaught:exception', (err, runnable) => {
                console.log('Caught an exception:', err);
                return false;
            });

            cy.visit(loginUrl);
            cy.get('input[type="text"]').type(username);
            cy.get('input[type="password"]').type(password);

            // Click the login button
            cy.get('#login-submit').click();

            cy.url().should('not.include', 'login');

            cy.visit(appList);
            cy.contains('No matching records found').then($element => {
                if ($element.length > 0) {
                    // Stop further processing
                    cy.log('No matching records found');
                    cy.visit(logoutUrl);
                }
                else {
                    processPages();
                }
            })



            //cy.get('#cancel-approve-request').click();
            // if (username != '01547854996') {
            //     
            //     cy.visit(logoutUrl);

        });
    });
    function processPages() {
        cy.log("asche");
        cy.get(':nth-child(1) > .last_column > div > .text-underline').click();
        cy.contains('session is not active for this application').then($element => {
            if ($element.length > 0) {
                // Stop further processing
                cy.log('Session is not active, stopping loop and redirecting.');

                cy.visit(appList);
                return;
            } else {
                cy.log('ok continue');
                if (reject == 1) {
                    cy.get('#reject-btn').click();
                    cy.get('input[type="checkbox"][value="64"]').check(); // Attempt to check the checkbox
                    // cy.get('#reject-acknowledged-checkbox').check({ force: true });
                    // cy.get('#confirm-reject-request').click(); //for rejection
                }
                else {
                    cy.get('#approve-btn').click();
                    cy.get('.modal-body > div.mt-3 > :nth-child(2) > #remarks').type(comment, { delay: 100 });
                    // cy.get('#confirm-approve-request').click();
                }
                //cy.visit(appList);
                // cy.get('.form-group > div > .btn').click();if (flag) {
                // Recursive call to process the next iteration
                processPages();
            }


        });

    }
});