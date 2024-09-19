
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
                         WHERE PRCPSI.STATUS ='ORDER_GENERATED' AND PRCPSI.PEPMIS_ROOM_CONSTRUCTION_PLAN_ID = 288
                     )`;

describe('PEPMIS End to End Testing for UEO Progress Update', () => {
    before('',() =>{
        cy.task('executeDbStatement', {
            statement: query
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
            cy.get('#gazetteNo').type(DateTime);
            cy.get('#gazetteDate').type(date);
            cy.get('div a').contains('Select').click().wait(2000);
            cy.get('.progress-percentage').type('100');
            cy.get('textarea.remarks').type('good passed')
            cy.get('#progress-update-report-add').click()
            cy.get('div a').contains('Go Back to List of Schools Under Construction').click();
            cy.logOut();
        })
    })

})
