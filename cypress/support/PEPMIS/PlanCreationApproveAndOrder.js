import {sqlQuery} from "../sqlQuery";
const query = new sqlQuery()
const datetime = new Date().toLocaleDateString('en-GB')
const date = '25/09/2024'
function DateTime() {
    const now = new Date();
    return  now.toISOString().replace(/[-:.TZ]/g, '') + Math.random().toString(36).substring(2, 10);
}
export class PlanCreationApproveAndOrder{
    constructor() {
    }
    executeSchoolCodeQuery(){
        cy.task('executeDbStatement', {
            statement: query.getSchoolCodeQuery()
        }).then((result) => {
            if (result && result.rows && Array.isArray(result.rows)) {
                result.rows.forEach(row => {
                    // cy.log(JSON.stringify(row));
                    console.log(row.SCHOOL_CODE)
                });
            } else {
                cy.log('No rows returned from the query');
            }
            cy.writeFile('cypress/fixtures/school_code.json', result.rows);
        });
        return this
    }
    otpOption(){
        const otp = '8888';
        cy.get('.otp-input').each(($el, index) => {
            cy.wrap($el).type(otp[index]);
        });
        cy.get('#otp-submit').click({ force: true });
        return this
    }
    findMenu(){
        cy.get('div ul li a span').contains('Construction and Repair Management').click({force: true})
        cy.contains('Construction Plan List').click().wait(1000)
        return this
    }
    addSchoolandConfirm(){
        //click add new plan
        cy.get('div a').contains('Add new Construction Plan').click()
        cy.fixture(`school_code.json`).then((item) =>{
            item.forEach((school) => {
                const code = `${school.SCHOOL_CODE}`;
                cy.get('#omniSearch').type(code+'{enter}').wait(1000).clear();
                cy.get('div button').contains('Add').click();
            })
        })
        // cy.get('div a').contains('Add').click();
        cy.get('div a span').contains('Save and Proceed').click();
        cy.get('select#project\\.masterDataEntryId').select('3082');
        cy.get('label').contains('Plan Creation Date').parent().siblings()
            .find('input[type = "text"]').type(date);
        cy.get('#isDnothiFlowApplicable2').check({force: true});
        //excluded school selection
        cy.get('button[type = "button"]').contains('Add Schools Outside Priority List').click().wait(1500)
        cy.get('input[value = "588"]').first().click({force: true});
        cy.get('button[type = "button"]').contains('Select').click();
        cy.get('#noOfClassroomConstructionSuggested').type('1{enter}').wait(2000);
        cy.get('#confirm-add-edit-school-room-count').contains('Confirm').click();
        //update draft
        // cy.get('input[value = "Update Draft"]').click()
        // cy.get('a[role = "button"]').contains('Back to Room Construction Plan List').click()
        //submit plan
        cy.get('#submit-btn').click().wait(2000);
        cy.get('label').contains('Suggestion').click()
        cy.get('#remarks').type('ok done', {force: true, delay: 100});
        cy.get('#confirm-submit').click({force: true});

        cy.get('a[role="button"]').contains('Back to Room Construction Plan List').click();

        return this
    }
    advancedFilterDnothi(isIt){
        cy.get('#showAdvancedFilter > span').click();
        if(isIt === 'order') cy.get('select#status').select('APPROVED');
        cy.get('label').contains('Plan Creation Date(From)')
            .parent().children().find('input').type(date)

        cy.get('#applyFilter').contains('Apply Filters').click()
        cy.wait(2000)
        return this
    }
    omniSearch(planNo){
        cy.get('#omniSearch').type(planNo+'{enter}').wait(1000).clear();
        return this
    }
    ApprovalFlowDnothi(user){
        cy.get('div table tbody tr').eq(0).invoke('text')
            .then(text => {
                let isPresent = /Approve/.test(text);
                if (isPresent) {

                    cy.get('div table tbody tr').contains("Approve").click()
                    cy.get('#approve-btn').click().wait(2000);
                    if(user !== '01547854996') cy.get('label').contains('Suggestion').click()
                    cy.get('#remarks').type('ok done', {force: true, delay: 100});
                    cy.get('#confirm-approve').click({force: true});
                    // cy.get('#cancel-confirmation').click();
                    // cy.get('#back-btn').click();
                    cy.get('a[role="button"]').contains('Back to Room Construction Plan List').click();
                }
                else {
                    cy.log('Stopped, Nothing for review');
                }
            })
    }
    orderGenerate(){
        cy.get('button[type = "button"]').contains('Manage').click()
        cy.get('div a').contains('Details').click()
        cy.get('#order-generate-btn').click()
        cy.get('#orderGazetteNo').type(DateTime(), {force: true}).wait(1500);
        cy.get('#orderGazetteDate').type(datetime).wait(1000)
        cy.get('#confirm-order-generate').click();

        cy.get('a[role="button"]').contains('Back to Room Construction Plan List').click();
    }


}