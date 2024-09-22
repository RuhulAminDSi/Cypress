const user = '01738957729'
const password = Cypress.env('password');
import {PlanCreationApproveAndOrder} from "../../support/PEPMIS/PlanCreationApproveAndOrder";
const planFlow =  new PlanCreationApproveAndOrder()
import {ProgressUpdateHandoverCancelOrder} from "../../support/PEPMIS/ProgressUpdateHandoverCancelOrder";
const ueoProgressHandoverCancel =  new ProgressUpdateHandoverCancelOrder();
describe('PEPMIS End to End Testing', () => {
    beforeEach('',() =>{
        cy.login();
    })
    afterEach(()=>{
        cy.logOut();
    })
    it(`Validate the whole PEPMIS for EO: 01738957729`, () => {
        cy.logIn(user, password);
        planFlow
            // OTP submit
            .otpOption()
            //go to side menu Construction and Repair Management and submenu Construction Plan List and click add new
            .findMenu()
            //search school code
            .executeSchoolCodeQuery()
            //select school from priority list, excluded school selection, submit plan and get back to the plan list
            .addSchoolandConfirm()
    })
    it(`Validate the whole PEPMIS for D-nothi`, () => {
        const username = [
            '01738957721',
            '01738957722',
            '01738957723',
            '01547854996'
        ]
        username.forEach((user) => {
            cy.logIn(user, password);
            planFlow
                .findMenu()
                //advanced filter
                .advancedFilterDnothi('flow')
                //approval
                .ApprovalFlowDnothi()
            if(user !== '01547854996')
                cy.logOut();
        })
    });
    it(`Validate the whole PEPMIS for EO - 01738957729`, () => {
        cy.logIn(user, password);
        // OTP submit
        planFlow
            .otpOption()
            .findMenu()
            //advanced filter
            .advancedFilterDnothi('order')
            //order generate
            .orderGenerate()
    })
    it(`Validate the Progress Update in PEPMIS for UEO`, () => {
        ueoProgressHandoverCancel
            .executeUeoFindQuery()
        cy.fixture(`ueo_info.json`).then((item) =>{
            item.forEach((user) => {
                const ueo = `${user.MOBILE_NUMBER}`;
                cy.logIn(ueo, password);
                ueoProgressHandoverCancel
                    .getSubMenu()
                    .addProgress()
                cy.logOut() // need to handle this for last ueo
            })
        })
    })
    it(`Validate the Progress Update in PEPMIS for UEO`, () => {
        ueoProgressHandoverCancel
            .executeUeoFindQueryforHandover()
        cy.fixture(`ueo_info_hand.json`).then((item) =>{
            item.forEach((user) => {
                const ueo = `${user.MOBILE_NUMBER}`;
                cy.logIn(ueo, password);
                ueoProgressHandoverCancel
                    .getSubMenu()
                    .advancedFilterHandOver()
                    .handOver()
                cy.logOut()//need to handle this for last ueo
            })
        })
    })

})
