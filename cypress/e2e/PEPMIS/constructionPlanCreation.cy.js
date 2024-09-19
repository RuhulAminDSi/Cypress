
const username = []
const user = '01521532789'
const password = Cypress.env('password');
let reject = 0;
const query = `SELECT s.SCHOOL_CODE FROM IPEMIS_PRODUCTION.PEPMIS_ROOM_CONSTRUCTION_PRIORITY_LIST prcpl
                                             INNER JOIN IPEMIS_PRODUCTION.PEPMIS_ROOM_CONSTRUCTION_PLAN_SCHOOL_INFO prcpsi ON PRCPSI.SCHOOL_ID = PRCPL.SCHOOL_ID
                                             INNER JOIN IPEMIS_PRODUCTION.SCHOOL s ON s.SCHOOL_ID = prcpl.SCHOOL_ID
               WHERE PRCPSI.STATUS  NOT IN ('ORDER_GENERATED', 'UNDER_CONSTRUCTION','APPROVED', 'PENDING', 'DRAFT') AND ROWNUM <= 50`;

describe('PEPMIS End to End Testing', () => {
    before('',() =>{
        cy.task('executeDbStatement', {
            statement: query
        }).then((result) => {
            if (result && result.rows && Array.isArray(result.rows)) {
                result.rows.forEach(row => {
                    // cy.log(JSON.stringify(row));
                    console.log(row.SCHOOL_CODE)
                    username.push(row.SCHOOL_CODE)
                });
            } else {
                cy.log('No rows returned from the query');
            }
            cy.writeFile('cypress/fixtures/school_code.json', result.rows);
        });
    })
    it(`Validate the whole PEPMIS for 01521532789`, () => {
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

        //click add new plan
        cy.get('div a').contains('Add new Construction Plan').click()
        //select school from priority list
        username.forEach((user) =>{
            cy.log(user)
            cy.get('#omniSearch').type(user+'{enter}').clear();
            cy.get('div a').contains('Add').click();
        })
        // cy.get('div a').contains('Add').click();
        cy.get('div a span').contains('Save and Proceed').click();
        cy.get('select#project\\.masterDataEntryId').select('3079');
        cy.get('label').contains('Plan Creation Date').parent().siblings()
            .find('input[type = "text"]').type('18/09/2024');
        //excluded school selection
        cy.get('button[type = "button"]').contains('Add Schools Outside Priority List').click().wait(1500)
        cy.get('input[value = "588"]').first().click({force: true});
        cy.get('button[type = "button"]').contains('Select').click();
        cy.get('#noOfClassroomConstructionSuggested').clear().type('1{enter}');
        cy.get('#confirm-add-edit-school-room-count').contains('Confirm').click();
        //update draft
        cy.get('input[value = "Update Draft"]').click()
        cy.get('a[role = "button"]').contains('Back to Room Construction Plan List').click()
        //submit plan
        // cy.get('#submit-btn').click()


        // cy.logOut();
    })

})
