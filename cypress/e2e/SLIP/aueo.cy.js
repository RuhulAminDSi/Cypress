// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const AUEOphoneNumbers = [
        '01729830890', '01720686547', '01306628285', '01710547016',
        '01725185804', '01717085864', '01759413141',
        '01718102988', '01718528450',
        '01752712875', '01716464563', '01716936184', '01916521801',
        '01716593163', '01725130074', '01718749992', '01789968691',

    ]
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
            processPages()

            //cy.get('#cancel-approve-request').click();
            // if (username != '01547854996') {
            //     
            //     cy.visit(logoutUrl);

        });
    });
    function processPages() {
        cy.log("asche");

        for (let i = 0; i < 10; i++) {
            cy.get(':nth-child(1) > .last_column > div > .text-underline').click();

            cy.log('ok continue');
            if (reject == 1) {
                cy.get('#reject-btn').click();
                cy.get('input[type="checkbox"][value="64"]').check(); // Attempt to check the checkbox
                // cy.get('#reject-acknowledged-checkbox').check({ force: true });
                cy.get('#confirm-reject-request').click(); //for rejection
            }
            else {
                cy.get('#approve-btn').click();
                cy.get('.modal-body > div.mt-3 > :nth-child(2) > #remarks').type(comment, { delay: 100 });
                cy.get('#confirm-approve-request').click();
            }
            //cy.visit(appList);
            // cy.get('.form-group > div > .btn').click();if (flag) {
            // Recursive call to process the next iteration
            cy.get('.form-group > div > .btn').click().then($elem => {
                if ($elem > 0) {
                    processPages();
                } else {
                    cy.log('Stopping recursion as we are no longer on the application list page.');
                }
            });
        }


    }
});