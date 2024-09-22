
const date = '19/09/2024'
import {sqlQuery} from "../../support/sqlQuery";
const query = new sqlQuery()
import {ProgressUpdateHandoverCancelOrder} from "../../support/PEPMIS/ProgressUpdateHandoverCancelOrder";
const ueoprogresscancel =  new ProgressUpdateHandoverCancelOrder();
describe('PEPMIS End to End Testing for UEO Progress Update', () => {
    before('',() =>{
        cy.login();
    })
    it(`Validate the Progress Update in PEPMIS for UEO`, () => {
        ueoprogresscancel
            .executeUeoFindQuery()
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
