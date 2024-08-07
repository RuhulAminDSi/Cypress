// cypress/integration/login_logout.spec.js

// describe('Test Page with Multiple User IDs', () => {
//     // Array of user IDs to test  
//     const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';

//     it('Public Open Properties', ()=>{
//         cy.visit(loginUrl);
//         cy.get(':nth-child(2) > .nav-link').click();
//     })


// });

// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
    // Array of user IDs to test  
    const userIds = [
        //'01711111111', '01911403111', '01754191151', '01711193187',
        '01547854996'];
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const bundleId = Cypress.env('bundleId');
    //const review = `https://ops.ipemis.qa.innovatorslab.net/slip/bundle-request/review/${bundleId}`;
    const appList = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests/pending';
    const logoutUrl = 'https://login.ipemis.qa.innovatorslab.net/login?action=sign-out';
    const password = 'Maski1#109';
    const comment = 'Done Comment';

    // Loop through each ID  
    const reject = 0;
    // userIds.forEach(((userId)) => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
    });
    before(() => {
        // Log in once before all tests
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.login(userIds[0], password);
        // Ensure cookies are preserved for session continuity
        cy.getCookies().then((cookies) => {
            cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value, {log: false});
            });
        });
    });
    beforeEach(() => {
        // Restore cookies before each test
        cy.intercept({ resourceType: /xhr|fetch/ }, { log: false })
        cy.getCookies().then((cookies) => {
            cookies.forEach((cookie) => {
                cy.setCookie(cookie.name, cookie.value, {log: false});
            });
        });
    });
    it('Test Start', () => {
        cy.visit(appList);

        // Debugging output to verify the existence of the button
        cy.get('button').then(($buttons) => {
            // Log the number of buttons found
            console.log('Number of buttons:', $buttons.length);

            // Check if any button contains 'Manage'
            const $manageButton = $buttons.filter(':contains("Manage")');
            if ($manageButton.length > 0) {
                // Button exists, click on it
                cy.wrap($manageButton).click();
            } else {
                // Handle case where button does not exist
                cy.get('#checkboxInsideHeader').uncheck({ force: true, delay: 10000 });
                // Example: Click on another element
                //cy.visit(logoutUrl);
            }
        });
    });

    it(`Logout for User ID: ${userIds[0]}`, () => {
        cy.visit(appList);
    })






    //cy.get('#cancel-approve-request').click();


    // });
});