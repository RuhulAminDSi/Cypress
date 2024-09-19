
const username = []
const password = Cypress.env('password');
let reject = 0;
const now = new Date();
const DateTime = now.toLocaleString()
const date = '19/09/2024'
const query = `SELECT iu.NAME , iu.NAME_LOCAL , iu.MOBILE_NUMBER , iu.EMAIL , eo.NAME_LOCAL
               FROM IPEMIS_PRODUCTION.OFFICER o
                        INNER JOIN IPEMIS_PRODUCTION.EDUCATION_OFFICE eo ON eo.EDUCATION_OFFICE_ID = o.POSTED_EDUCATION_OFFICE_ID
                        INNER JOIN IPEMIS_PRODUCTION.IEIMS_USER iu ON iu.IEIMS_USER_ID = o.OFFICER_ID
               WHERE POSTED_DESIGNATION_ID = 4250 AND o.ROLE_TYPE = 'MAIN' AND iu.STATUS = 'ACTIVE'
                 AND eo.UPAZILA_ID IN
                     (
                         SELECT s.UPAZILA_ID
                         FROM IPEMIS_PRODUCTION.PEPMIS_ROOM_CONSTRUCTION_PLAN_SCHOOL_INFO prcpsi
                                  INNER JOIN IPEMIS_PRODUCTION.SCHOOL s ON s.SCHOOL_ID = PRCPSI.SCHOOL_ID
                         WHERE PRCPSI.STATUS ='COMPLETED' AND PRCPSI.PEPMIS_ROOM_CONSTRUCTION_PLAN_ID = 288
                     )`;

describe('PEPMIS End to End Testing for UEO Progress Update', () => {
    before('',() =>{
        cy.task('executeDbStatement', {
            statement: query
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
            // cy.logOut();
        })
    })
})
