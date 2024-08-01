// cypress/integration/login_logout.spec.js

describe('Test Page with Multiple User IDs', () => {
  // Array of user IDs to test  
  const userIds = ['01711111111', '01911403111', '01754191151', '01711193187'];
  // Loop through each ID  

  userIds.forEach((userId) => {
    it(`should display user information for ID: ${userId}`, () => {
      // Visit the page with the user ID  
      const loginUrl = 'https://login.ipemis.qa.innovatorslab.net/login?lang=en_EN';
      const username = `${userId}`;
      const password = 'Maski1#109';
      const comment = 'Done Comment';
      // Perform assertions  
      const review = 'https://ops.ipemis.qa.innovatorslab.net/eie/bundle-request/review/362';
      // Handle uncaught exceptions to prevent test failure
      Cypress.on('uncaught:exception', (err, runnable) => {
        console.log('Caught an exception:', err);
        return false;
      });
      cy.visit(loginUrl);
      cy.get('input[type="text"]').type(username); // Adjust the selector if necessary
      cy.get('input[type="password"]').type(password); // Adjust the selector if necessary

      // Click the login button
      cy.get('#login-submit').click();

      cy.url().should('not.include', 'login');

      cy.visit(review);
      cy.get('#bundle-request-approve').click();
      cy.get('#modal-approve-bundle-request > .modal-dialog > .modal-content > :nth-child(2) > .modal-body > .mt-3 > :nth-child(2) > #remarks').
        type(comment);
      cy.get('input[type="checkbox"]').check();
      //cy.get('#confirm-approve-request').click();
      //cy.get('#cancel-approve-request').click();

      // const logoutUrl = 'https://login.ipemis.qa.innovatorslab.net/login?action=sign-out';
      // cy.visit(logoutUrl);

    });
  });
});
