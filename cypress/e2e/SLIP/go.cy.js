// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const userIds = ['01521532789', '01911403111'];
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const bundleId = Cypress.env('bundleId');
    //const goupload = `https://ops.ipemis.qa.innovatorslab.net/slip/bundle-request/upload-go/${bundleId}`;
    const appList = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests';
    //const goreview = `https://ops.ipemis.qa.innovatorslab.net/slip/bundle-request/review/${bundleId}`;
    const goReview = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests/pending';
    const password = 'Maski1#109';
    const comment = 'Done Comment';


    // Loop through each ID  
    const reject = 1;
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


            if (username == '01521532789') {
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
                cy.visit(appList);
                cy.get('button').contains('Manage').click({ force: true });
                cy.get('.dropdown-item.text-right').contains(' Upload G.O').click({ force: true });
                cy.get('#goGazetteNumber').type('02.08.2024.12.11');
                cy.get('#goGazetteDate').type('02/08/2024');
                cy.get('input[type="file"]').attachFile('image.jpg'); // Replace with the actual selector of your file input and the file name
                // cy.get('#upload-submit').click(); // Replace with the actual selector of your submit button
                cy.get('#upload-go').click();
                cy.get('#confirm-go-upload-request').click();

            }
            else {
                cy.visit(goReview);
                cy.get('button').contains('Manage').click({ force: true });
                cy.get('.dropdown-item.text-right').contains('Approve').click({ force: true });
                if (reject == 1) {
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
            }
            //cy.get('#cancel-approve-request').click();
            if (username != '01911403111') {
                const logoutUrl = 'https://login.ipemis.qa.innovatorslab.net/login?action=sign-out';
                cy.visit(logoutUrl);
            }
            else {
                cy.get('.form-group > div > .btn').click();
            }
        });
    });
});