
const username = []
const password = Cypress.env('password');
let reject = 0;
const now = new Date();
const date = new Date().toLocaleDateString('en-GB')
import {sqlQuery} from "../../support/sqlQuery";
const query = new sqlQuery()
import {ProgressUpdateHandoverCancelOrder} from "../../support/PEPMIS/ProgressUpdateHandoverCancelOrder";
const ueoprogresscancel =  new ProgressUpdateHandoverCancelOrder();
describe('PEPMIS End to End Testing for UEO Progress Update', () => {
    before('',() =>{
        // cy.login();
    })

    it(`Validate the Progress Update in PEPMIS for UEO`, () => {
        ueoprogresscancel.executePlanNoquery()
        cy.fixture(`plan_info.json`).then((item) =>{
            const planNo = item[0].PEPMIS_ROOM_CONSTRUCTION_PLAN_ID;
            cy.log(planNo)
            ueoprogresscancel.executeUeoFindQueryforHandover(planNo)
        })
        cy.fixture(`ueo_info_hand.json`).then((item) =>{
            item.forEach((user) => {
                const ueo = `${user.MOBILE_NUMBER}`;
                cy.logIn(ueo, password);
                ueoprogresscancel
                    .getSubMenu()
                    .advancedFilterHandOver()
                    .handOver()
                cy.logOut()
            })
        })
    })
})

