// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const userIds = ['01711111111', '01911403111', '01754191151', '01711193187', '01547854996'];
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const bundleId = Cypress.env('bundleId');
    //const review = `https://ops.ipemis.qa.innovatorslab.net/slip/bundle-request/review/${bundleId}`;
    const appList = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests/pending';
    const password = 'Maski1#109';
    const comment = 'Done Comment';

    // Loop through each ID  
    const reject = 0;
    userIds.forEach((userId) => {
        it(`should display user information for ID: ${userId}`, () => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            // Visit the page with the user ID  
            const username = `${userId}`;
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

            //cy.visit(review);
            cy.visit(appList);
            cy.get('button').contains('Manage').click({force: true});
            cy.get('.dropdown-item.text-right').contains('Approve').click({force: true});

            if (username == '01547854996' && reject == 1) {
                cy.get('#bundle-request-reject').click();
                //cy.get('#modal-approve-bundle-request > .modal-dialog > .modal-content > :nth-child(2) > .modal-body > .mt-3 > :nth-child(2) > #remarks').type(comment);
                cy.get('input[type="checkbox"][value="64"]').check(); // Attempt to check the checkbox
              
                cy.get('#reject-acknowledged-checkbox').check({ force: true });
                cy.get('#confirm-reject-request').click();
            }
            else {
                cy.get('#bundle-request-approve').click();
                cy.get('#modal-approve-bundle-request > .modal-dialog > .modal-content > :nth-child(2) > .modal-body > .mt-3 > :nth-child(2) > #remarks').type(comment);
                cy.get('input[type="checkbox"]').check({ force: true }); // Force interaction
                cy.get('#confirm-approve-request').click();
            }

            //cy.get('#cancel-approve-request').click();
            if(username !='01547854996'){
                const logoutUrl = 'https://login.ipemis.qa.innovatorslab.net/login?action=sign-out';
                cy.visit(logoutUrl);
            }
            else{
                cy.get('.form-group > div > .btn').click();
            }
            

        });
    });
});