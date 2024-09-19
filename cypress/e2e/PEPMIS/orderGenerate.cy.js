
const username = []
const user = '01738957729'
const password = Cypress.env('password');

const DateTime = Date.now().toString();
const date = '18/09/2024'
describe('PEPMIS End to End Testing', () => {
    it(`Validate the whole PEPMIS for ${user}`, () => {
        //login
        cy.login();
        cy.logIn(user, password);
        // OTP submit
        {
            const otp = '8888';
            cy.get('.otp-input').each(($el, index) => {
                cy.wrap($el).type(otp[index]);
            });
            cy.get('#otp-submit').click({ force: true });
        }
        //go to side menu Construction and Repair Management and submenu Construction Plan List
        cy.get('div ul li a span').contains('Construction and Repair Management').click({force: true})
        cy.contains('Construction Plan List').click().wait(1000)
        //advanced filter
        cy.get('#showAdvancedFilter > span').click();
        cy.get('select#status').select('APPROVED');
        cy.get('label').contains('Plan Creation Date(From)')
            .parent().children().find('input').type(date)
        cy.get('#applyFilter').contains('Apply Filters').click()
        cy.wait(2000)

        cy.get('button[type = "button"]').contains('Manage').click()
        cy.get('div a').contains('Details').click()
        cy.get('#order-generate-btn').click()
        cy.get('#orderGazetteNo').type(DateTime, {force: true}).wait(1500);
        cy.get('#orderGazetteDate').type(date).wait(1000)
        cy.get('#confirm-order-generate').click();

        // cy.get('#cancel-confirmation').click();
        // cy.get('#back-btn').click();
        cy.get('a[role="button"]').contains('Back to Room Construction Plan List').click();


        // cy.logOut();
    })

})
