// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const UEOphoneNumbers = [
        '01716411240',
        '01712035989',
        '01712084072','01716411240','01864128333', '01722505413',
        '01746183334',
        

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
    const reject = 0;
    UEOphoneNumbers.forEach((phoneNumber) => {
        it(`FOR THE UEO: ${phoneNumber}`, () => {
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
                                    cy.get('input[type="checkbox"][value="64"]').check(); 
                                    // cy.get('#reject-acknowledged-checkbox').check({ force: true });
                                    cy.get('#confirm-reject-request').click({ force: true }); 
                                    cy.visit(appList);
                                }
                                else {
                                    cy.get('#approve-btn').click();
                                    cy.get('#consentOfAdditionalAmount').select('false');
                                    cy.get(':nth-child(5) > :nth-child(2) > #remarks').type(comment, { delay: 100 });
                                    cy.get('#confirm-approve-request').click({ force: true });
                                    cy.visit(appList);
                                    cy.wait(2500)
                                    
                                }
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