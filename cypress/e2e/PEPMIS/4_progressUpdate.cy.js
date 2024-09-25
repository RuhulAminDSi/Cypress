
const date = '19/09/2024'
import {sqlQuery} from "../../support/sqlQuery";
const query = new sqlQuery()
const password = Cypress.env('password')
import {ProgressUpdateHandoverCancelOrder} from "../../support/PEPMIS/ProgressUpdateHandoverCancelOrder";
const ueoprogresscancel =  new ProgressUpdateHandoverCancelOrder();
describe('PEPMIS End to End Testing for UEO Progress Update', () => {
    before('',() =>{
        ueoprogresscancel.executePlanNoquery()
        cy.fixture(`plan_info.json`).then((item) =>{
            const planNo = item[0].PEPMIS_ROOM_CONSTRUCTION_PLAN_ID;
            cy.log(planNo)
            ueoprogresscancel.executeUeoFindQuery(planNo)
        })
        cy.login();
        cy.log('complete')
    })
    it(`Validate the Progress Update in PEPMIS for UEO`, () => {
        cy.log('start')
        cy.fixture(`ueo_info.json`).then((item) =>{
            item.forEach((user) => {
                const ueo = `${user.MOBILE_NUMBER}`;
                cy.logIn(ueo, password);
                ueoprogresscancel
                    .getSubMenu()
                    .addProgress()
                cy.logOut()
            })
        })
    })

})
