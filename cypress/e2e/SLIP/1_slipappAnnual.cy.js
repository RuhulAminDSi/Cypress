// cypress/integration/login_logout.spec.js
// const htTeachers = require('../../plugins/array');
describe('Test Page ', () => {
    const loginUrl = Cypress.env('loginUrl');
    const logoutUrl = Cypress.env('logoutUrl');
    const slipForm = 'https://ops.ipemis.qa.innovatorslab.net/submit-slip';
    const slipList = 'https://ops.ipemis.qa.innovatorslab.net/slip/application-list'
    const password = Cypress.env('password');
    const comment = Cypress.env('comment')
    const purpose = 'School General Information Objective Of';
    // Handle uncaught exceptions to prevent test failure
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });
    const htTeachers = ['01724629415', '01552349079', '01677129242', '01736163494', '01736163494',
        '01736163494', '01814704981', '01764248949', '01756421642','01819036808']; // Declare outside before hook but initialize inside
    // before(() => {
    //     cy.readFile('cypress/fixtures/db_data.json').then((data) => {
    //         data.forEach(item => {
    //             htTeachers.push(item);
    //             cy.log(item)
    //         })
    //     });
    // });
    it('Start Apply for the HT', () => {
        htTeachers.forEach((htMobile) => {
            cy.log(`For the teacher: ${htMobile}`)
            // it(`SLIP HT Application for ${htMobile}`, () => {
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
            // Cypress.on('fail', (error, runnable) => {
            //     // Log the error and continue
            //     cy.log('An error occurred:', error.message);
            //     // Returning false will prevent Cypress from failing the test
            //     return false;
            // });

            cy.visit(loginUrl);
            cy.get('input[type="text"]').type(htMobile);
            cy.get('input[type="password"]').type(password);
            cy.get('#login-submit').click();
            cy.visit(slipList);
            cy.wait(2500)
            //SLIP FORM
            {
                cy.visit(slipForm);
                cy.get('body').then($body => {
                    if ($body.find('#request-preview').length) {
                        cy.get('#slipBasicInformation_purposeOfDevelopmentPlan').then($input => {
                            if ($input.val()) {
                                cy.visit(logoutUrl);
                            }
                            else {
                                {
                                    cy.get('#slipBasicInformation_purposeOfDevelopmentPlan').type(purpose);
                                    cy.get('#add-income-source').click();
                                    cy.get('#slipBasicInformation_slipSchoolAnnualIncomeSources_0_typeOfIncomeSource_masterDataEntryId')
                                        .select('5192');
                                    cy.get('#income-source-table > .info-row-container > .row > .col-3.pr-4 > .form-row > .form-control')
                                        .type(5192, { delay: 100 });
                                    cy.get('#slipBasicInformation_slipSchoolAnnualIncomeSources_0_remarks').type('Good');
                                    cy.get('#add-update-annual-activity').click();

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
                                }
                                // Proceed to the next page
                                // SUBMIT
                                {
                                    cy.get('#request-preview').click();
                                    cy.get('#submit-btn').click();
                                    cy.get('#remarks').type(comment);
                                    cy.get('#confirm-submit-request').click({ force: true });
                                    cy.get('.form-group > div > .btn').click();
                                    cy.wait(2500);
                                    cy.visit(slipList)
                                    cy.wait(2500);
                                    cy.visit(logoutUrl)
                                }
                                //DELETE Application
                                // {
                                //     cy.visit(slipList)
                                //     cy.wait(1000)
                                //     cy.get(':nth-child(1) > .last_column > div > .text-underline').click();

                                //     // Check if the delete button exists before clicking
                                //     cy.get('body').then($body => {
                                //         if ($body.find('#delete-slip-request').length) {
                                //             cy.get('#delete-slip-request').click().then(() => {
                                //                 // Check if the confirm button exists before clicking
                                //                 cy.get('body').then($body => {
                                //                     if ($body.find('#draft-delete-confirm-btn').length) {
                                //                         cy.get('#draft-delete-confirm-btn').click().then(() => {
                                //                             cy.get('.row > :nth-child(1) > .btn').click();
                                //                         });
                                //                     } else {
                                //                         cy.log('Confirm delete button not found.');
                                //                     }
                                //                 });
                                //             });
                                //         } else {
                                //             cy.log('Delete button not found.');
                                //         }
                                //     });


                                //     // cy.get(':nth-child(1) > .last_column > div > .text-underline').click();
                                //     // cy.get('#delete-slip-request').click();
                                //     // cy.get('#draft-delete-confirm-btn').click();
                                //     // cy.get('.row > :nth-child(1) > .btn').click();
                                //     cy.visit(logoutUrl)
                                //     // })
                                //     // })
                                // }
                            }
                        })
                    }
                    else {
                        cy.visit(logoutUrl);
                    }
                })


            }


        })

    })
});
