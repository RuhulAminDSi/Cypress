
const username = [
    '01738957721',
    '01738957722',
    '01738957723',
    '01547854996'
  ]
const now = new Date();
const DateTime = now.toLocaleString()
const date = '18/09/2024'
const password = Cypress.env('password');
describe('PEPMIS End to End Testing', () => {
    before('',()=>{
        //login
        cy.login();
    })
    it(`Validate the whole PEPMIS for D-nothi`, () => {
        username.forEach((user) => {
            cy.logIn(user, password);
            cy.get('div ul li a span').contains('Construction and Repair Management').click({force: true})
            cy.contains('Construction Plan List').click()
            //advanced filter
            cy.get('#showAdvancedFilter > span').click();
            cy.get('label').contains('Plan Creation Date(From)')
                .parent().children().find('input').type(date)
            cy.get('#applyFilter').contains('Apply Filters').click()
            cy.wait(2000)
            //approval
            cy.get('div table tbody tr').eq(0).invoke('text')
                .then(text => {
                    let isPresent = /Approve/.test(text);
                    if (isPresent) {
                        cy.get('div table tbody tr').contains("Approve").click()
                        cy.get('#approve-btn').click().wait(2000);
                        if(user !== '01547854996') cy.get('label').contains('Suggestion').click()
                        cy.get('#remarks').type('ok done', {force: true, delay: 100});
                        cy.get('#confirm-approve').click({force: true});
                        // cy.get('#cancel-confirmation').click();
                        // cy.get('#back-btn').click();
                        cy.get('a[role="button"]').contains('Back to Room Construction Plan List').click();
                    }
                    else {
                        cy.log('Stopped, Nothing for review');
                    }
                })
            cy.logOut();
        })

    });

})
