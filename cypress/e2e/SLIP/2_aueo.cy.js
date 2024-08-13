// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const AUEOphoneNumbers = [
        '01716313734', '01832879710', '01716411240', '01716502653', '01717982656',
        '01718102988', '01766202334', '01715590326', '01746830692', '01717482256',
        '01674151764', '01757408480', '01716027639', '01720686547', '01752712875',
        '01729830890', '01779928484', '01710547016', '01757824985', '01716936184',
        '01716464563', '01712610722', '01716686274', '01681455447', '01864128333',
        '01725130074', '01718332689', '01739939185', '01725185804', '01762259321',
        '01718438017', '01718167570', '01816518098', '01712249767', '01722099988',
        '01712884759', '01712035989', '01759413141', '01719431776', '01741585090',
        '01306628285', '01743208096', '01757849994', '01723645023', '01716593163',
        '01711208070', '01722505413', '01718485252', '01922744915', '01916521801',
        '01718749992', '01712084072', '01717085864', '01712657011', '01712595559',
        '01756633256', '01867626560', '01851029956', '01746183334', '01959408319',
        '01710138126', '01816711734', '01815592826', '01311738322', '01955701458',
        '01920778872', '01679853476'
    ];
    
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
                                    cy.get('input[type="checkbox"][value="64"]').check({ force: true }); 
                                    cy.get('#confirm-reject-request').click({ force: true }); //for rejection
                                    cy.visit(appList);
                                    cy.wait(2500)
                                }
                                else {
                                    cy.get('#approve-btn').click({ force: true });
                                    cy.get('.modal-body > div.mt-3 > :nth-child(2) > #remarks').type(comment, { force: true, delay: 100 });
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