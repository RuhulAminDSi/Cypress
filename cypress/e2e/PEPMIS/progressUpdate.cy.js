
const username = []
const password = Cypress.env('password');
let reject = 0;
function DateTime() {
    const now = new Date();
    return  now.toISOString().replace(/[-:.TZ]/g, '') + Math.random().toString(36).substring(2, 10);
}
const date = '19/09/2024'
import {sqlQuery} from "../../support/sqlQuery";
const query = new sqlQuery()

describe('PEPMIS End to End Testing for UEO Progress Update', () => {
    before('',() =>{
        cy.task('executeDbStatement', {
            statement: query.getProgressUpdate()
        }).then((result) => {
            cy.writeFile('cypress/fixtures/ueo_info.json', result.rows);
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
    it(`Validate the Progress Update in PEPMIS for UEO`, () => {
        username.forEach((user) => {
            cy.logIn(user, password);
            //go to side menu Construction and Repair Management and submenu Construction Plan List
            cy.get('div ul li a span').contains('List of Schools Under Construction').click({force: true})
            cy.get('div a').contains('Add Progress').click().wait(2000);
            cy.get('#gazetteNo').type(DateTime());
            cy.get('#gazetteDate').type(new Date().toLocaleDateString('en-GB'));
            cy.get('div a').contains('Select').click().wait(2000);
            cy.get('.progress-percentage').type('100');
            cy.get('textarea.remarks').type('good passed')
            cy.get('#progress-update-report-add').click({force: true})
            cy.get('div a').contains('Go Back to List of Schools Under Construction').click();
            cy.logOut();
        })
    })

})
