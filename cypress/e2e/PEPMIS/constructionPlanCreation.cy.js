const username = []
const user = '01738957729'
const password = Cypress.env('password');
let reject = 0;
const date = new Date().toLocaleDateString('en-GB')
import {PlanCreationApproveAndOrder} from "../../support/PEPMIS/PlanCreationApproveAndOrder";
const query =  new PlanCreationApproveAndOrder()
describe('PEPMIS End to End Testing', () => {
    before('',() =>{
        query.executeSchoolCodeQuery()
    })
    it(`Validate the whole PEPMIS for EO`, () => {
        //login
        cy.login();
        cy.logIn(user, password);
        // OTP submit
        query
            .otpOption()
        //go to side menu Construction and Repair Management and submenu Construction Plan List and click add new
            .findMenu()
        //select school from priority list
        //excluded school selection
        //submit plan and get back to the plan list
            .addSchoolandConfirm()
        // cy.logOut();
    })

})
