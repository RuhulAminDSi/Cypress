
describe('Test Page with Multiple User IDs', () => {
    const userIds = [
        '01711111111', '01911403111', '01754191151', '01711193187',
        '01547854996'
    ];
    const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
    const appList = 'https://ops.ipemis.qa.innovatorslab.net/slip/bundle-requests/pending';
    const password = 'Maski1#109';

    userIds.forEach((userId) => {
        describe(`Testing for User ID: ${userId}`, () => {
            before(() => {
                Cypress.on('uncaught:exception', (err, runnable) => {
                    console.log('Caught an exception:', err);
                    return false;
                });
                cy.intercept({ resourceType: /xhr|fetch/ }, { log: false });
                // Ensure custom commands are loaded
                cy.visit(loginUrl);
                cy.get('input[type="text"]').type(userId);
                cy.get('input[type="password"]').type(password);
                cy.get('#login-submit').click();
                // Save cookies after logging in
                cy.getCookies().then((cookies) => {
                    cookies.forEach((cookie) => {
                        cy.setCookie(cookie.name, cookie.value, { log: false });
                    });
                });
            });
            beforeEach(() => {
                // Restore cookies before each test to maintain session
                cy.getCookies().then((cookies) => {
                    cookies.forEach((cookie) => {
                        cy.setCookie(cookie.name, cookie.value, { log: false });
                    });
                });
            });
            it('Test Start', () => {
                cy.visit(appList);

                cy.get('button').then(($buttons) => {
                    const $manageButton = $buttons.filter(':contains("Manage")');
                    if ($manageButton.length > 0) {
                        cy.wrap($manageButton).click();
                    } else {
                        cy.get('#checkboxInsideHeader').uncheck({ force: true, delay: 10000 });
                    }
                });
            });
        });
    });
});
