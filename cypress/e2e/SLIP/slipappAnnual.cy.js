// cypress/integration/login_logout.spec.js

describe('Test Page with EO bundle', () => {
    const htTeachers = [
        '01728935165',
        '01710628160',
        '01816293994',
        '01710382893',
        '01779391280',
        '01716169378',
        '01725077956',
        '01717385633',
        '01721191520',
        '01735474298',
        '01916564728'
    ];
    // Loop through each ID  
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const slipForm = 'https://ops.ipemis.qa.innovatorslab.net/submit-slip';
    const password = 'Maski1#109';
    const purpose = 'School General Information Objective Of Developing School Development Plan';
    // Handle uncaught exceptions to prevent test failure
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });
    htTeachers.forEach((htMobile) => {
        it(`SLIP HT Application for ${htMobile}`, () => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            cy.visit(loginUrl);
            cy.get('input[type="text"]').type(htMobile); // Adjust the selector if necessary
            cy.get('input[type="password"]').type(password); // Adjust the selector if necessary

            // Click the login button
            cy.get('#login-submit').click();

            cy.visit(slipForm);
            cy.get('#slipBasicInformation_purposeOfDevelopmentPlan').type(purpose);
            cy.get('#add-income-source').click();
            cy.get('#slipBasicInformation_slipSchoolAnnualIncomeSources_0_typeOfIncomeSource_masterDataEntryId')
                .select('5192');
            cy.get('#income-source-table > .info-row-container > .row > .col-3.pr-4 > .form-row > .form-control')
                .type(5192, { delay: 100 });
            cy.get('#slipBasicInformation_slipSchoolAnnualIncomeSources_0_remarks').type('Good');

            cy.get('#add-update-annual-activity').click();
            // cy.get('#slipBasicInformation_slipSchoolAnnualActivities_0_typeOfActivity_masterDataEntryId')
            // .select('5129');
            cy.get('#slipBasicInformation_slipSchoolAnnualActivities_0_typeOfActivity_masterDataEntryId')
                .then($select => {
                    const options = $select.find('option');
                    const optionToSelect = options.eq(1).val(); // Select the third option (index 2)
                    cy.wrap($select).select(optionToSelect);
                });

            cy.get('#update-annual-activity-table > .info-row-container > .row > :nth-child(2) > .form-row > .form-control')
                .type(100);
            cy.get('#update-annual-activity-table > .info-row-container > .row > :nth-child(3) > .form-row > .form-control')
                .type(200);
            cy.get('#update-annual-activity-table > .info-row-container > .row > :nth-child(4) > .form-row > .form-control')
                .type(5000);
            cy.get('#slipBasicInformation_slipSchoolAnnualActivities_0_responsiblePerson').type('Ruhul');
            // Proceed to the next page
            cy.get('#request-preview').click();
            cy.get('#submit-btn').click();
            cy.get('#remarks').type('Ok Done', { delay: 100 });
            cy.get('#confirm-submit-request').click({force: true});
            cy.get('.form-group > div > .btn').click();
            

            //DELETE Application
            // cy.get(':nth-child(1) > .last_column > div > .text-underline').click();
            // cy.get('#delete-slip-request').click();
            // cy.get('#draft-delete-confirm-btn').click();
            // cy.get('.row > :nth-child(1) > .btn').click();
        })
    })
});
