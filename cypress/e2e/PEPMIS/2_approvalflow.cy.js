
const now = new Date();
const DateTime = now.toLocaleString()
const date = '18/09/2024'
const password = Cypress.env('password');

import {PlanCreationApproveAndOrder} from "../../support/PEPMIS/PlanCreationApproveAndOrder";
const approvalFlow = new PlanCreationApproveAndOrder()
describe('PEPMIS End to End Testing', () => {
    before('',()=>{
        //login
        cy.login();
    })
    it(`Validate the whole PEPMIS for D-nothi`, () => {
        const username = [
            '01738957721',
            '01738957722',
            '01738957723',
            // '01547854996'
        ]
        username.forEach((user) => {
            cy.logIn(user, password);
            approvalFlow
                .findMenu()
            //advanced filter
                .advancedFilterDnothi('flow')
            //approval
                .ApprovalFlowDnothi(user)
            cy.logOut();
        })

    });

})
