import {sqlQuery} from "../sqlQuery";
const query = new sqlQuery()
const datetime = new Date().toLocaleDateString('en-GB')
const date = '25/09/2024'
function DateTime() {
    const now = new Date();
    return  now.toISOString().replace(/[-:.TZ]/g, '') + Math.random().toString(36).substring(2, 10);
}
export class ProgressUpdateHandoverCancelOrder {
    constructor(){}
    executeUeoFindQuery(planNo){
        cy.task('executeDbStatement', {
            statement: query.getProgressUpdate(planNo)
        }).then((result) => {
            cy.writeFile('cypress/fixtures/ueo_info.json', result.rows);
            if (result && result.rows && Array.isArray(result.rows)) {
                result.rows.forEach(row => {
                    cy.log(row.MOBILE_NUMBER)
                });
            } else {
                cy.log('No rows returned from the query');
            }
        });
        return this
    }
    executePlanNoquery(){
        cy.task('executeDbStatement', {
            statement: query.getPlanNo()
        }).then((result) => {
            cy.writeFile('cypress/fixtures/plan_info.json', result.rows);
            if (result && result.rows && Array.isArray(result.rows)) {
                result.rows.forEach(row => {
                    cy.log(row.PLAN_NO)
                    //username.push(row.MOBILE_NUMBER)
                });
            } else {
                cy.log('No rows returned from the query');
            }
        });
        return this
    }
    getSubMenu(){
        cy.get('div ul li a span').contains('List of Schools Under Construction').click({force: true})
        cy.get('div a').contains('Add Progress').click().wait(2000);
        return this
    }
    addProgress(){
        cy.get('div a').contains('Add Progress').click().wait(2000);
        cy.get('#gazetteNo').type(DateTime());
        cy.get('#gazetteDate').type(new Date().toLocaleDateString('en-GB'));
        cy.get('div a').contains('Select').click().wait(2000);
        cy.get('.progress-percentage').type('100');
        cy.get('textarea.remarks').type('good passed')
        cy.get('#progress-update-report-add').click({force: true})
        cy.get('div a').contains('Go Back to List of Schools Under Construction').click();
        return this
    }
    executeUeoFindQueryforHandover(planNo){
        cy.task('executeDbStatement', {
            statement: query.getHandOverQuery(planNo)
        }).then((result) => {
            cy.writeFile('cypress/fixtures/ueo_info_hand.json', result.rows);
            if (result && result.rows && Array.isArray(result.rows)) {
                result.rows.forEach(row => {
                    cy.log(row.MOBILE_NUMBER)
                    // username.push(row.MOBILE_NUMBER)
                });
            } else {
                cy.log('No rows returned from the query');
            }
        });
    }
    advancedFilterHandOver(){
        cy.get('button[title = "Select Any..."]').click();
        cy.get('input[value = "COMPLETED"]').check({force:true});
        cy.get('#applyFilter').contains('Apply Filters').click()
        return this
    }
    handOver(){
        cy.get('button[type = "button"]').contains('Manage').click().wait(1000)
        cy.get('div a').contains(' Handover ').click()
        cy.get('input[type="file"]').attachFile('image.jpg').wait(2000)
        cy.get('#handoverDate').type(this.date).wait(2000)
        cy.get('#confirm-handover').click()
        cy.wait(2000)
        cy.get('div a[role = "button"]').contains('List of Schools Under Construction').click();
        return this
    }
}