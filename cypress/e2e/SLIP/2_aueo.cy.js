// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const AUEOphoneNumbers = [
        '01725185804',
        '01729830890', '01916521801', '01720686547', '01306628285', '01710547016',
        '01725185804', '01717085864', '01759413141',
        '01718102988', '01718528450',
        '01752712875', '01716464563', '01716936184',
        '01716593163', '01725130074', '01718749992', '01789968691',


    ]
    const loginUrl = Cypress.env('loginUrl');
    const logoutUrl = Cypress.env('logoutUrl');
    const appList = 'https://ops.ipemis.qa.innovatorslab.net/slip/application-list';
    const password = Cypress.env('password');
    const comment = Cypress.env('comment');
    // const phoneNumber = '01729830890'; //'01306628285';
    // Loop through each ID  
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });
    const reject = 1;
    AUEOphoneNumbers.forEach((phoneNumber) => {
        it(`FOR THE AUEO: ${phoneNumber}`, () => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            const username = `${phoneNumber}`;
            cy.visit(loginUrl);
            cy.get('input[type="text"]').type(username);
            cy.get('input[type="password"]').type(password);
            cy.get('#login-submit').click({ force: true });
            cy.visit(appList);
            cy.wait(2500)
            function process() {
                cy.get('body').then($body => {
                    if ($body.find(':nth-child(1) > .last_column > div > .text-underline').length) {
                        cy.get(':nth-child(1) > .last_column > div > .text-underline').click();
                        cy.get('body').then($body => {
                            if ($body.find('#approve-btn').length) {
                                if (reject == 1) {
                                    cy.get('#reject-btn').click();
                                    cy.get('input[type="checkbox"][value="64"]').check({ force: true }); // Attempt to check the checkbox
                                    // cy.get('#reject-acknowledged-checkbox').check({ force: true });
                                    cy.get('#confirm-reject-request').click({ force: true }); //for rejection
                                }
                                else {
                                    cy.get('#approve-btn').click({ force: true });
                                    cy.get('.modal-body > div.mt-3 > :nth-child(2) > #remarks').type(comment, { force: true, delay: 100 });
                                    cy.get('#confirm-approve-request').click({ force: true });
                                    cy.visit(appList);
                                    cy.wait(2500)
                                    
                                    
                                }
                                // cy.get('.form-group > div > .btn').click()
                                //     .then($elem => {
                                //         if ($elem > 0) {
                                //             processPages();
                                //         } else {
                                //             cy.log('Stopped, Nothing for review');
                                //             i = i + 12;
                                //             cy.visit(logoutUrl);
                                //         }
                                //     });
                            } else {
                                cy.log(' No Valid application found.');
                                cy.visit(logoutUrl);
                                return;
                            }
                        });
                    }
                    else {
                        cy.log('Stopped, Nothing for review');
                        cy.visit(logoutUrl);
                        return;
                    }
                })
            } process();

        });
    });


});