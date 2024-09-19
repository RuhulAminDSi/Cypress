
const username = [
    '01711111111',
    '01911403111',
    '01754191151',
    '01547854996'
  ]
const password = Cypress.env('password');
let reject = 0;
const query = `SELECT s.SCHOOL_CODE FROM IPEMIS_PRODUCTION.PEPMIS_ROOM_CONSTRUCTION_PLAN_SCHOOL_INFO prcpsi
                                             INNER JOIN IPEMIS_PRODUCTION.SCHOOL s ON s.SCHOOL_ID = PRCPSI.SCHOOL_ID
               WHERE prcpsi.STATUS NOT IN ('ORDER_GENERATED', 'UNDER_CONSTRUCTION','APPROVED', 'PENDING') AND ROWNUM <= 12`;
describe('PEPMIS End to End Testing', () => {
    before('',() =>{
        const array = [];
        cy.task('executeDbStatement', {
            statement: query
        }).then((result) => {
            if (result && result.rows && Array.isArray(result.rows)) {
                result.rows.forEach(row => {
                    cy.log(JSON.stringify(row));
                    console.log(row.MOBILE_NUMBER)
                    array.push(row.MOBILE_NUMBER)
                    //Cypress.env('userArray').push(row.MOBILE_NUMBER);
                    cy.log(array);
                });
            } else {
                cy.log('No rows returned from the query');
            }
            cy.writeFile('cypress/fixtures/school_code.json', result.rows);
        });
    })

        username.forEach((user) => {
            // Hooks
            // before(() => {
            //     cy.login();
            //     cy.logIn(user, password);
            // });
            // afterEach(()=>{
            //     cy.logOut();
            // })
            it(`Validate the whole PEPMIS for ${user}`, () => {
                //login
                cy.login();
                cy.logIn(user, password);
                cy.get('div ul li a span').contains('Construction and Repair Management').click({force: true})
                cy.contains('Construction Plan List').click()
                //advanced filter
                cy.get('#showAdvancedFilter > span').click();
                cy.get('label').contains('Plan Creation Date(From)')
                    .parent().children().find('input').type('19/09/2024')
                cy.get('#applyFilter').contains('Apply Filters').click()
                cy.wait(2000)
                //approval
                cy.get('div table tbody tr').eq(0).invoke('text')
                    .then(text => {
                        let isPresent = /Approve/.test(text);
                        if (isPresent) {
                            cy.get('div table tbody tr').contains("Approve").click()
                            cy.get('#approve-btn').click().wait(2000);
                            cy.get('label').contains('Suggestion').click()
                            cy.get('#remarks').type('ok done', {force: true, delay: 100});
                            cy.get('#confirm-approve').click({force: true});
                            // cy.get('#cancel-confirmation').click();
                            // cy.get('#back-btn').click();
                            cy.get('role[type="button"]').contains('Back to Room Construction Plan List').click();
                        }
                        else {
                            cy.log('Stopped, Nothing for review');
                            cy.logOut();
                        }
                    })
                })
        });

})
