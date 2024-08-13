// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const userIds = [
        '01711111111', '01911403111', 
        '01754191151', '01711193187', 
        '01547854996'];
    const loginUrl = Cypress.env('loginUrl');
    const logoutUrl = Cypress.env('logoutUrl');
    const appList = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests/pending';
    const password = Cypress.env('password');
    const comment = Cypress.env('comment');

    // Loop through each ID  
    const reject = 0;
    userIds.forEach((userId) => {
        it(`User ID: ${userId}`, () => {
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
            cy.get('#login-submit').click({ force: true });

            cy.visit(appList);
            cy.wait(2500)
            cy.get('button').contains('Manage').click({force: true});
            cy.get('.dropdown-item.text-right').contains('Approve').click({force: true});

            if (username == '01547854996' && reject == 1) {
                cy.get('#bundle-request-reject').click();
                cy.get('input[type="checkbox"][value="64"]').check(); // Attempt to check the checkbox
                cy.get('#reject-acknowledged-checkbox').check({ force: true });
                cy.get('#confirm-reject-request').click({ force: true });
            }
            else {
                cy.get('#bundle-request-approve').click();
                cy.wait(2000);
                cy.get('#modal-approve-bundle-request > .modal-dialog > .modal-content > :nth-child(2) > .modal-body > .mt-3 > :nth-child(2) > #remarks')
                .type(comment)
                cy.get('#approve-acknowledged-checkbox').check({force:true})
                //cy.get('input[type="checkbox"]').check({ force: true }); 
                cy.wait(2000);
                cy.get('#confirm-approve-request').click({ force: true });
            }
            if(username !='01547854996'){
                cy.visit(logoutUrl);
            }
            else{
                cy.get('.form-group > div > .btn').click();
            }
            

        });
    });
});