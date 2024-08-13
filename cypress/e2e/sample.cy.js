// cypress/integration/login_logout.spec.js
// const htTeachers = require('../../plugins/array');
describe('Test Page ', () => {
    const loginUrl = Cypress.env('loginUrl');
    const logoutUrl = Cypress.env('logoutUrl');
    const slipForm = 'https://ops.ipemis.qa.innovatorslab.net/submit-slip';
    const slipList = 'https://ops.ipemis.qa.innovatorslab.net/slip/application-list';
    const slipTeam = 'https://ops.ipemis.qa.innovatorslab.net/slip/my-team'
    const password = Cypress.env('password');
    const comment = Cypress.env('comment')
    const purpose = 'School General Information Objective Of';
    // Handle uncaught exceptions to prevent test failure
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });
    const htTeachers = []; // Declare outside before hook but initialize inside
    before(() => {
        cy.readFile('cypress/fixtures/db_data.json').then((data) => {
            data.forEach(item => {
                htTeachers.push(item);
                cy.log(item)
            })
        });
    });
    it('Start Apply for the HT', () => {
        htTeachers.forEach((htMobile) => {
            cy.log(`For the teacher: ${htMobile}`)
            // it(`SLIP HT Application for ${htMobile}`, () => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
 

            cy.visit(loginUrl);
            cy.get('input[type="text"]').type(htMobile);
            cy.get('input[type="password"]').type(password);
            cy.get('#login-submit').click();
            cy.visit()
            cy.visit(slipTeam);
            cy.wait(2500);
            cy.visit(slipList);
            cy.wait(2500);
            cy.visit(slipForm);

        })

    })
});
