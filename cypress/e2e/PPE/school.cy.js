

describe('Update School Information', () => {
    // Loop through each ID  
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const logoutUrl = 'https://login.ipemis.qa.innovatorslab.net/login?action=sign-out';
    const password = 'Maski1#109';
    const comment = 'Done Comment';
    const htMobilenumber = ["01542859658",
        "01700000014",
        "01527292629",
        "01111111191",
        "01797321997",
        "01658445540",
        "01912695782",
        "01629809123",
        "01841323751",
        "01816872520",
        "01816872519"];//'01236987456', '01247859635',
    //const mobileNumber = '01236987456';
    const schoolInfo = 'https://ops.ipemis.qa.innovatorslab.net/my-school';

    htMobilenumber.forEach((mobileNumber) => {
        it(`School Update by ${mobileNumber}`, () => {
            const username = `${mobileNumber}`;
            // Handle uncaught exceptions to prevent test failure
            Cypress.on('uncaught:exception', (err, runnable) => {
                console.log('Caught an exception:', err);
                return false;
            });
            cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
            cy.visit(loginUrl);
            cy.get('input[type="text"]').type(username); // Adjust the selector if necessary
            cy.get('input[type="password"]').type(password); // Adjust the selector if necessary

            // Click the login button
            cy.get('#login-submit').click();
            cy.visit(schoolInfo);
            cy.get('.row > :nth-child(1) > .form-check-label').click();;
            cy.get('#preview-update-school-form-btn').click({ force: true });
            cy.get('#modal-submit-update-school-form-btn').click({ force: true });
            cy.get('#submit-update-form-btn').click({ force: true });

            cy.visit(logoutUrl);
        })
    })

    const superuser = 'super.admin.ieims@gmail.com';
    const reviwLink = 'https://ops.ipemis.qa.innovatorslab.net/pending-request';
    it(`Review pending requests from ${superuser}`, () => {
        const username = `${superuser}`;
        // Handle uncaught exceptions to prevent test failure
        Cypress.on('uncaught:exception', (err, runnable) => {
            console.log('Caught an exception:', err);
            return false;
        });
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.visit(loginUrl);
        cy.get('input[type="text"]').type(username); // Adjust the selector if necessary
        cy.get('input[type="password"]').type(password); // Adjust the selector if necessary

        // Click the login button
        cy.get('#login-submit').click();
        for (let i = 0; i < htMobilenumber.length; i++) {
            cy.visit(reviwLink);
            cy.get('#checkboxInsideHeader').uncheck({ force: true, delay: 10000 });
            cy.get(':nth-child(1) > td > .py-1 > .col-xl-4 > .justify-content-end > .col-6 > .float-right > .btn')
                .click({ force: true, delay: 10000 })

            cy.get('.col-5 > .pt-2 > .btn').click({ force: true, delay: 10000 });
            cy.get('#request_approve_btn').click({ force: true, delay: 10000 });
            cy.get('#comment-area').type(comment, { force: true });
            cy.get('#modal-confirm-btn').click({ force: true, delay: 10000 });
        }

    })



})