// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const userIds = [
        '01738957721',
       '01738957722',

        ];
    const user = [
        '01738957723',
        '01954584575',
        '01547854996'
        //01682868721
    ]
    const password = Cypress.env('password');
    const comment = Cypress.env('comment');

    // Loop through each ID  
    const reject = 0;
    before('', ()=>{
        cy.login()
    })
    it(`User ID: `, () =>
    {
        userIds.forEach((userId) => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            // Visit the page with the user ID
            const username = `${userId}`;
            cy.logIn(username, password);
            cy.visit('https://ops.ipemis.qa.innovatorslab.net/eie/bundle-requests')
            cy.get('button[type= "button"]').contains('Manage').click();
            cy.get('div a ').contains('Approve').click();
            cy.get('div a span').contains('Approve').click();
            cy.get('#remarks').type(comment);
            cy.get('#acknowledged-checkbox').check({force: true})
            cy.get('#confirm-approve-request').click();
            cy.wait(1000)
            cy.logOut()

        });
    });


    it(`User ID: `, () =>
    {
        user.forEach((userId) => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            // Visit the page with the user ID
            const username = `${userId}`;
            cy.logIn(username, password);
            cy.visit('https://ops.ipemis.qa.innovatorslab.net/eie/pending/bundle-requests')
            cy.get('button[type= "button"]').contains('Manage').click();
            cy.get('div a ').contains('Approve').click();
            cy.get('div a span').contains('Approve').click();
            cy.get('#remarks').type(comment);
            cy.get('#acknowledged-checkbox').check({force: true})
            cy.get('#confirm-approve-request').click();
            cy.wait(1000)
            cy.logOut()

        });
    });
});