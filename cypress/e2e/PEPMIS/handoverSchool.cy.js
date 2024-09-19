
const username = []
const password = Cypress.env('password');
let reject = 0;
const now = new Date();
const date = new Date().toLocaleDateString('en-GB')
import {sqlQuery} from "../../support/sqlQuery";
const query = new sqlQuery()

describe('PEPMIS End to End Testing for UEO Progress Update', () => {
    before('',() =>{
        cy.task('executeDbStatement', {
            statement: query.getHandOverQuery()
        }).then((result) => {
            cy.writeFile('cypress/fixtures/ueo_info_hand.json', result.rows);
            if (result && result.rows && Array.isArray(result.rows)) {
                result.rows.forEach(row => {
                    cy.log(row.MOBILE_NUMBER)
                    username.push(row.MOBILE_NUMBER)
                });
            } else {
                cy.log('No rows returned from the query');
            }
        });
        cy.login();
    })
    it(`Validate the handover completion on UEO end`, () => {
        username.forEach((user) => {
            cy.logIn(user, password);
            //go to side menu List of Schools Under Construction
            cy.get('div ul li a span').contains('List of Schools Under Construction').click({force: true})
            cy.get('#showAdvancedFilter > span').click();
            cy.get('button[title = "Select Any..."]').click();
            cy.get('input[value = "COMPLETED"]').check({force:true});
            cy.get('#applyFilter').contains('Apply Filters').click()
            cy.get('button[type = "button"]').contains('Manage').click().wait(1000)
            cy.get('div a').contains(' Handover ').click()
            cy.get('input[type="file"]').attachFile('image.jpg').wait(2000)
            cy.get('#handoverDate').type(date).wait(2000)
            cy.get('#confirm-handover').click()

            cy.wait(2000)
           cy.get('div a[role = "button"]').contains('List of Schools Under Construction').click();
            cy.logOut();
        })
    })
})
