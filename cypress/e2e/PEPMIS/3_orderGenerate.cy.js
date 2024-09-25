
const username = []
const user = '01738957729'
const password = Cypress.env('password');
import {PlanCreationApproveAndOrder} from "../../support/PEPMIS/PlanCreationApproveAndOrder";
const planFlow =  new PlanCreationApproveAndOrder()


function DateTime() {
    const now = new Date();
    return  now.toISOString().replace(/[-:.TZ]/g, '') + Math.random().toString(36).substring(2, 10);
}
console.log(DateTime);
const date = '18/09/2024'
describe('PEPMIS End to End Testing', () => {
    it(`Validate the whole PEPMIS for ${user}`, () => {
        //login
        cy.login();
        cy.logIn(user, password);
        // OTP submit
        planFlow
            .otpOption()
            .findMenu()
        //advanced filter
            .advancedFilterDnothi('order')
        //order generate
            .orderGenerate()
        // cy.logOut();
    })

})
