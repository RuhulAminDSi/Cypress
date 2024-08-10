describe('Using the User Array from Cypress Env', () => {
    let user = [];
    console.log(Cypress.env('userArray'));
    before(() => {
      // Retrieve the user array from Cypress environment variables
      cy.log(Cypress.env('userArray'));
      user = Cypress.env('userArray');
    });
  
    it('Uses the user array', () => {
      if (user && user.length > 0) {
        user.forEach((mobileNumber) => {
          cy.log(`Using mobile number: ${mobileNumber}`);
          // Add more test steps here
        });
      } else {
        cy.log('User array is empty or not set');
      }
    });
  });
  